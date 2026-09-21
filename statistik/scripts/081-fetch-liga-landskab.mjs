import { mkdir, readFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

const DB_PATH = process.env.LIGA_LANDSKAB_DB ?? 'statistik/data/liga-landskab.db';
const MODE = process.argv[2] ?? 'index';
const SERVICE = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/GetLeagueStanding';
const PAGE = 'https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/#1,2026,,1,1,,,,';
const RATE_MS = Number(process.env.LIGA_RATE_MS ?? 120);
const CONCURRENCY = Number(process.env.LIGA_CONCURRENCY ?? 4);
const MAX_RETRIES = 3;

const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const esc = value => String(value ?? '').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&#39;', "'").replaceAll('&#248;', 'ø').replaceAll('&#230;', 'æ').replaceAll('&#229;', 'å').replaceAll('&quot;', '"');
const text = value => esc(String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
const integer = value => /^\d+$/.test(String(value ?? '').trim()) ? Number(value) : null;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

await mkdir('statistik/data', { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(`PRAGMA journal_mode=WAL;
CREATE TABLE IF NOT EXISTS regions (region_id INTEGER PRIMARY KEY, name TEXT, short_name TEXT, parent_id INTEGER, source_endpoint TEXT, first_seen_at TEXT, last_seen_at TEXT);
CREATE TABLE IF NOT EXISTS age_groups (age_group_id INTEGER PRIMARY KEY, name TEXT, years_from INTEGER, years_to INTEGER, years_from_tournament INTEGER, years_to_tournament INTEGER, source_endpoint TEXT, first_seen_at TEXT, last_seen_at TEXT);
CREATE TABLE IF NOT EXISTS standing_indexes (standing_index_id INTEGER PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, season_id INTEGER NOT NULL, age_group_id INTEGER NOT NULL, region_id INTEGER NOT NULL, requested_url TEXT NOT NULL, fetched_at TEXT NOT NULL, http_status INTEGER, raw_sha256 TEXT, raw_response TEXT, parse_status TEXT NOT NULL, parser_version TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS league_groups (season_id INTEGER NOT NULL, age_group_id INTEGER NOT NULL, league_group_id TEXT NOT NULL, division_name_raw TEXT, group_name_raw TEXT, page_title_raw TEXT, first_seen_index_id INTEGER, fetched_at TEXT, PRIMARY KEY (season_id, age_group_id, league_group_id));
CREATE TABLE IF NOT EXISTS league_group_regions (season_id INTEGER NOT NULL, age_group_id INTEGER NOT NULL, league_group_id TEXT NOT NULL, region_id INTEGER NOT NULL, PRIMARY KEY (season_id, age_group_id, league_group_id, region_id));
CREATE TABLE IF NOT EXISTS league_group_teams (season_id INTEGER NOT NULL, age_group_id INTEGER NOT NULL, league_group_id TEXT NOT NULL, league_group_team_id TEXT NOT NULL DEFAULT '', team_name_raw TEXT NOT NULL, standing_position INTEGER, matches INTEGER, wins INTEGER, score_raw TEXT, sets_raw TEXT, points INTEGER, set_points INTEGER, source_url TEXT, fetched_at TEXT, PRIMARY KEY (season_id, age_group_id, league_group_id, league_group_team_id));
CREATE TABLE IF NOT EXISTS fetch_errors (request_key TEXT PRIMARY KEY, season_id INTEGER, age_group_id INTEGER, region_id INTEGER, league_group_id TEXT, requested_url TEXT, http_status INTEGER, error_kind TEXT, response_sha256 TEXT, response_text TEXT, first_seen_at TEXT, last_seen_at TEXT, attempts INTEGER);
CREATE TABLE IF NOT EXISTS league_group_details (season_id INTEGER NOT NULL, age_group_id INTEGER NOT NULL, league_group_id TEXT NOT NULL, requested_url TEXT NOT NULL, fetched_at TEXT NOT NULL, http_status INTEGER, raw_sha256 TEXT, raw_response TEXT, parse_status TEXT NOT NULL, parser_version TEXT NOT NULL, PRIMARY KEY (season_id, age_group_id, league_group_id));
CREATE TABLE IF NOT EXISTS league_group_match_counts (season_id INTEGER NOT NULL, age_group_id INTEGER NOT NULL, league_group_id TEXT NOT NULL, region_id INTEGER NOT NULL, requested_url TEXT NOT NULL, fetched_at TEXT NOT NULL, http_status INTEGER, match_count INTEGER, parse_status TEXT NOT NULL, PRIMARY KEY (season_id, age_group_id, league_group_id));
CREATE INDEX IF NOT EXISTS idx_standing_lookup ON standing_indexes(season_id, age_group_id, region_id);
CREATE INDEX IF NOT EXISTS idx_groups_id ON league_groups(league_group_id);`);

// The first run used team_name_raw in the key while the schema question was open.
// All imported rows have a non-empty team ID and no same-group ID/name collision,
// so migrate to the smaller evidence-backed key on subsequent runs.
const teamSql = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='league_group_teams'").get()?.sql ?? '';
if (teamSql.includes('league_group_team_id, team_name_raw')) {
  db.exec(`BEGIN;
  CREATE TABLE league_group_teams_new (season_id INTEGER NOT NULL, age_group_id INTEGER NOT NULL, league_group_id TEXT NOT NULL, league_group_team_id TEXT NOT NULL DEFAULT '', team_name_raw TEXT NOT NULL, standing_position INTEGER, matches INTEGER, wins INTEGER, score_raw TEXT, sets_raw TEXT, points INTEGER, set_points INTEGER, source_url TEXT, fetched_at TEXT, PRIMARY KEY (season_id, age_group_id, league_group_id, league_group_team_id));
  INSERT OR REPLACE INTO league_group_teams_new SELECT season_id,age_group_id,league_group_id,league_group_team_id,team_name_raw,standing_position,matches,wins,score_raw,sets_raw,points,set_points,source_url,fetched_at FROM league_group_teams;
  DROP TABLE league_group_teams;
  ALTER TABLE league_group_teams_new RENAME TO league_group_teams;
  COMMIT;`);
}

async function callbackContext() {
  const res = await fetch(PAGE);
  const html = await res.text();
  const m = html.match(/var SR_CallbackContext = '([^']+)'/);
  if (!m) throw new Error(`SR_CallbackContext mangler (HTTP ${res.status})`);
  return m[1];
}

const context = await callbackContext();
const now = () => new Date().toISOString();
const requestUrl = (season, age, region, group = '') => `https://badmintonplayer.dk/DBF/HoldTurnering/Stilling/#1,${season},${group},${age},${region},,,,`;
const requestKey = (season, age, region, group = '') => `${season}:${age}:${region}:${group || 'index'}`;

function parseIndex(html, season, age, region, indexId) {
  const groups = [];
  const divisions = [...html.matchAll(/<tr[^>]*class=['"]divisionrow['"][^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/gi)];
  const divisionAt = pos => {
    let found = '';
    for (const d of divisions) if (d.index <= pos) found = text(d[1]);
    return found;
  };
  const re = /<a[^>]*onclick=["']return\s+ShowStanding\(['"]2['"],\s*['"](\d+)['"],\s*['"](\d+)['"],\s*['"](\d+)['"],\s*['"](\d+)['"],/gi;
  for (const m of html.matchAll(re)) {
    const pos = m.index ?? 0;
    const close = html.indexOf('</a>', pos);
    const label = text(html.slice(pos, close > 0 ? close : pos + 300));
    groups.push({ season_id: Number(m[1]) || season, league_group_id: m[2], age_group_id: Number(m[3]) || age, region_id: Number(m[4]) || region, division_name_raw: divisionAt(pos), group_name_raw: label });
  }
  const title = text((html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) ?? [,''])[1]);
  return { groups, title };
}

function parseDetail(html, season, age, group) {
  const title = text((html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) ?? [,''])[1]);
  const teams = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  for (const row of html.matchAll(rowRe)) {
    const block = row[1];
    if (!/class=['"]team1['"]/.test(block)) continue;
    const link = block.match(/href=["']([^"']+)["'][^>]*>/i);
    const onclick = block.match(/ShowStanding\([^)]*['"](\d+)['"]\s*,\s*['"]['"]\s*,\s*['"]['"]\s*\)/i);
    const id = (onclick?.[1] ?? (block.match(/ShowStanding\([^)]*['"](\d+)['"]\s*,\s*['"]['"]/)?.[1] ?? ''));
    const cells = [...block.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => text(m[1]));
    if (!cells.length) continue;
    const name = text((block.match(/<a[^>]*class=['"]team['"][^>]*>([\s\S]*?)<\/a>/i) ?? [,''])[1]);
    teams.push({ league_group_team_id: id, team_name_raw: name || cells[1] || cells[0], standing_position: integer(cells[0]), matches: integer(cells[2]), wins: integer(cells[3]), score_raw: cells[4] || null, sets_raw: cells[5] || null, points: integer(cells[6]), set_points: integer(cells[7]), cells });
  }
  return { title, teams };
}

async function call(payload) {
  let last;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(SERVICE, { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify({ callbackcontextkey: context, ...payload }) });
      const raw = await res.text();
      let data = null; try { data = JSON.parse(raw); } catch {}
      const html = data?.d?.html ?? '';
      return { http: res.status, raw, html, attempt };
    } catch (error) { last = error; await sleep(500 * attempt); }
  }
  throw last;
}

function indexOne(season, age, region, result) {
  const key = requestKey(season, age, region);
  const fetched = now();
  const rawHash = hash(result.raw);
  const status = result.http >= 200 && result.http < 300 ? (result.html.trim() ? 'ok' : 'empty') : 'error';
  const parsed = status === 'ok' ? parseIndex(result.html, season, age, region, null) : { groups: [], title: '' };
  const ins = db.prepare(`INSERT INTO standing_indexes(request_key,season_id,age_group_id,region_id,requested_url,fetched_at,http_status,raw_sha256,raw_response,parse_status,parser_version) VALUES(?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(request_key) DO UPDATE SET fetched_at=excluded.fetched_at,http_status=excluded.http_status,raw_sha256=excluded.raw_sha256,raw_response=excluded.raw_response,parse_status=excluded.parse_status`);
  ins.run(key, season, age, region, requestUrl(season, age, region), fetched, result.http, rawHash, result.raw, status, '081-v1');
  if (status === 'ok') {
    const groupIns = db.prepare(`INSERT INTO league_groups(season_id,age_group_id,league_group_id,division_name_raw,group_name_raw,page_title_raw,first_seen_index_id,fetched_at) VALUES(?,?,?,?,?,?,(SELECT standing_index_id FROM standing_indexes WHERE request_key=?),?) ON CONFLICT(season_id,age_group_id,league_group_id) DO UPDATE SET division_name_raw=COALESCE(excluded.division_name_raw,league_groups.division_name_raw),group_name_raw=COALESCE(excluded.group_name_raw,league_groups.group_name_raw),page_title_raw=COALESCE(excluded.page_title_raw,league_groups.page_title_raw)`);
    const regionIns = db.prepare(`INSERT OR IGNORE INTO league_group_regions VALUES(?,?,?,?)`);
    for (const g of parsed.groups) { groupIns.run(g.season_id, g.age_group_id, g.league_group_id, g.division_name_raw, g.group_name_raw, parsed.title, key, fetched); regionIns.run(g.season_id, g.age_group_id, g.league_group_id, region); }
  } else db.prepare(`INSERT INTO fetch_errors(request_key,season_id,age_group_id,region_id,requested_url,http_status,error_kind,response_sha256,response_text,first_seen_at,last_seen_at,attempts) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(request_key) DO UPDATE SET last_seen_at=excluded.last_seen_at,attempts=excluded.attempts,response_text=excluded.response_text`).run(key, season, age, region, requestUrl(season, age, region), result.http, 'http_or_empty', rawHash, result.raw.slice(0, 10000), fetched, fetched, result.attempt);
  return { status, groups: parsed.groups.length };
}

async function worker(items, fn) {
  let cursor = 0;
  const next = async () => { while (true) { const i = cursor++; if (i >= items.length) return; await fn(items[i], i); await sleep(RATE_MS); } };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, next));
}

if (MODE === 'index' || MODE === 'all') {
  const ages = JSON.parse(await readFile('statistik/results/081-parameter-map-probe.json', 'utf8')).sources.ageGroups.body;
  const regions = JSON.parse(await readFile('statistik/results/081-parameter-map-probe.json', 'utf8')).sources.regions.body;
  for (const a of ages) db.prepare(`INSERT INTO age_groups VALUES(?,?,?,?,?,?,?,?,?) ON CONFLICT(age_group_id) DO UPDATE SET name=excluded.name,last_seen_at=excluded.last_seen_at`).run(a.ageGroupId, a.ageGroupName, a.yearsFrom, a.yearsTo, a.yearsFromTournament, a.yearsToTournament, 'https://badmintonplayer.dk/api/AgeGroup/Get', now(), now());
  for (const r of regions) db.prepare(`INSERT INTO regions VALUES(?,?,?,?,?,?,?) ON CONFLICT(region_id) DO UPDATE SET name=excluded.name,short_name=excluded.short_name,parent_id=excluded.parent_id,last_seen_at=excluded.last_seen_at`).run(r.regionId, r.name, r.shortName, r.parentId, 'https://badmintonplayer.dk/api/Region', now(), now());
  const items = [];
  for (let season = 2010; season <= 2026; season++) for (const a of ages) for (const r of regions) if (!db.prepare('SELECT 1 FROM standing_indexes WHERE request_key=?').get(requestKey(season, a.ageGroupId, r.regionId))) items.push({ season, age: a.ageGroupId, region: r.regionId });
  const counts = { requested: items.length, ok: 0, empty: 0, error: 0, groups: 0 };
  console.log(`INDEX_START pending=${items.length} rateMs=${RATE_MS} concurrency=${CONCURRENCY}`);
  await worker(items, async item => { try { const result = await call({ subPage: 1, seasonID: item.season, leagueGroupID: null, ageGroupID: item.age, regionID: item.region, leagueGroupTeamID: null, leagueMatchID: null, clubID: null, playerID: null }); const out = indexOne(item.season, item.age, item.region, result); counts[out.status]++; counts.groups += out.groups; if ((counts.ok + counts.empty + counts.error) % 250 === 0) console.log(`INDEX_PROGRESS done=${counts.ok + counts.empty + counts.error}/${counts.requested} ok=${counts.ok} empty=${counts.empty} error=${counts.error} groups_seen=${counts.groups}`); } catch (error) { counts.error++; console.error('INDEX_ERROR', item, error.message); } });
  const unique = db.prepare('SELECT COUNT(*) AS n FROM league_groups').get().n;
  console.log(`INDEX_DONE requested=${counts.requested} ok=${counts.ok} empty=${counts.empty} error=${counts.error} groups_seen=${counts.groups} unique_groups=${unique}`);
  if (MODE !== 'all') process.exit(0);
}

if (MODE === 'detail' || MODE === 'all') {
  const groups = db.prepare('SELECT g.season_id,g.age_group_id,g.league_group_id,COALESCE(MIN(r.region_id),1) AS region_id FROM league_groups g LEFT JOIN league_group_regions r USING(season_id,age_group_id,league_group_id) GROUP BY g.season_id,g.age_group_id,g.league_group_id ORDER BY g.season_id,g.age_group_id,g.league_group_id').all();
  const pending = groups.filter(g => !db.prepare('SELECT 1 FROM league_group_details WHERE season_id=? AND age_group_id=? AND league_group_id=?').get(g.season_id, g.age_group_id, g.league_group_id));
  console.log(`DETAIL_START pending=${pending.length} total_groups=${groups.length}`);
  let done = 0, ok = 0, empty = 0, error = 0, teams = 0;
  await worker(pending, async g => {
    const key = requestKey(g.season_id, g.age_group_id, g.region_id, g.league_group_id);
    const url = requestUrl(g.season_id, g.age_group_id, g.region_id, g.league_group_id).replace('#1,', '#2,');
    try {
      const result = await call({ subPage: 2, seasonID: g.season_id, leagueGroupID: g.league_group_id, ageGroupID: g.age_group_id, regionID: g.region_id, leagueGroupTeamID: null, leagueMatchID: null, clubID: null, playerID: null });
      const status = result.http >= 200 && result.http < 300 ? (result.html.trim() ? 'ok' : 'empty') : 'error';
      const parsed = status === 'ok' ? parseDetail(result.html, g.season_id, g.age_group_id, g.league_group_id) : { teams: [] };
      db.prepare(`INSERT INTO league_group_details VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(season_id,age_group_id,league_group_id) DO UPDATE SET fetched_at=excluded.fetched_at,http_status=excluded.http_status,raw_sha256=excluded.raw_sha256,raw_response=excluded.raw_response,parse_status=excluded.parse_status`).run(g.season_id, g.age_group_id, g.league_group_id, url, now(), result.http, hash(result.raw), result.raw, status, '081-v1');
      const teamIns = db.prepare(`INSERT OR REPLACE INTO league_group_teams(season_id,age_group_id,league_group_id,league_group_team_id,team_name_raw,standing_position,source_url,fetched_at) VALUES(?,?,?,?,?,?,?,?)`);
      for (const t of parsed.teams) { teamIns.run(g.season_id, g.age_group_id, g.league_group_id, t.league_group_team_id, t.team_name_raw, t.standing_position, url, now()); teams++; }
      if (status === 'ok') ok++; else if (status === 'empty') empty++; else error++;
    } catch (e) { error++; db.prepare(`INSERT INTO fetch_errors(request_key,season_id,age_group_id,region_id,league_group_id,requested_url,http_status,error_kind,response_sha256,response_text,first_seen_at,last_seen_at,attempts) VALUES(?,?,?,?,?,?,?,?,?,?,?, ?,?) ON CONFLICT(request_key) DO UPDATE SET last_seen_at=excluded.last_seen_at,attempts=excluded.attempts`).run(key,g.season_id,g.age_group_id,g.region_id,g.league_group_id,url,null,'exception',null,e.message,now(),now(),1); }
    done++; if (done % 250 === 0) console.log(`DETAIL_PROGRESS done=${done}/${pending.length} ok=${ok} empty=${empty} error=${error} teams=${teams}`);
  });
  console.log(`DETAIL_DONE requested=${pending.length} ok=${ok} empty=${empty} error=${error} teams=${teams}`);
}

if (MODE === 'parse') {
  const rows = db.prepare('SELECT season_id,age_group_id,league_group_id,raw_response,requested_url FROM league_group_details ORDER BY season_id,age_group_id,league_group_id').all();
  const update = db.prepare(`UPDATE league_group_teams SET matches=?,wins=?,score_raw=?,sets_raw=?,points=?,set_points=? WHERE season_id=? AND age_group_id=? AND league_group_id=? AND league_group_team_id=? AND team_name_raw=?`);
  let updated = 0;
  for (const row of rows) {
    let raw; try { raw = JSON.parse(row.raw_response); } catch { continue; }
    const html = raw?.d?.html ?? '';
    for (const t of parseDetail(html, row.season_id, row.age_group_id, row.league_group_id).teams) {
      updated += Number(update.run(t.matches,t.wins,t.score_raw,t.sets_raw,t.points,t.set_points,row.season_id,row.age_group_id,row.league_group_id,t.league_group_team_id,t.team_name_raw).changes || 0);
    }
  }
  console.log(`PARSE_DONE details=${rows.length} rows_updated=${updated}`);
}

if (MODE === 'count-matches') {
  const groups = db.prepare('SELECT g.season_id,g.age_group_id,g.league_group_id,COALESCE(MIN(r.region_id),1) AS region_id FROM league_groups g LEFT JOIN league_group_regions r USING(season_id,age_group_id,league_group_id) GROUP BY g.season_id,g.age_group_id,g.league_group_id ORDER BY g.season_id,g.age_group_id,g.league_group_id').all();
  const pending = groups.filter(g => !db.prepare('SELECT 1 FROM league_group_match_counts WHERE season_id=? AND age_group_id=? AND league_group_id=?').get(g.season_id,g.age_group_id,g.league_group_id));
  console.log(`MATCH_COUNT_START pending=${pending.length} total_groups=${groups.length}`);
  let done=0, ok=0, empty=0, error=0, total=0;
  await worker(pending, async g => {
    const url = requestUrl(g.season_id,g.age_group_id,g.region_id,g.league_group_id).replace('#1,','#4,');
    try {
      const result = await call({subPage:4,seasonID:g.season_id,leagueGroupID:g.league_group_id,ageGroupID:g.age_group_id,regionID:g.region_id,leagueGroupTeamID:null,leagueMatchID:null,clubID:null,playerID:null});
      const ids = new Set([...result.html.matchAll(/ShowStanding\(\s*['"]5['"]\s*,\s*['"]\d+['"]\s*,\s*['"]\d+['"]\s*,\s*['"]\d+['"]\s*,\s*['"]\d+['"]\s*,\s*['"]['"]\s*,\s*['"](\d+)['"]/gi)].map(m=>m[1]));
      const status = result.http>=200 && result.http<300 ? (result.html.trim() ? 'ok' : 'empty') : 'error';
      db.prepare(`INSERT INTO league_group_match_counts VALUES(?,?,?,?,?,?,?,?,?) ON CONFLICT(season_id,age_group_id,league_group_id) DO UPDATE SET fetched_at=excluded.fetched_at,http_status=excluded.http_status,match_count=excluded.match_count,parse_status=excluded.parse_status`).run(g.season_id,g.age_group_id,g.league_group_id,g.region_id,url,now(),result.http,ids.size,status);
      if(status==='ok'){ok++;total+=ids.size;} else if(status==='empty') empty++; else error++;
    } catch(e){error++; db.prepare(`INSERT INTO fetch_errors(request_key,season_id,age_group_id,region_id,league_group_id,requested_url,error_kind,response_text,first_seen_at,last_seen_at,attempts) VALUES(?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(request_key) DO UPDATE SET last_seen_at=excluded.last_seen_at,attempts=excluded.attempts`).run(`match-count:${g.season_id}:${g.age_group_id}:${g.league_group_id}`,g.season_id,g.age_group_id,g.region_id,g.league_group_id,url,'exception',e.message,now(),now(),1);}
    done++; if(done%250===0) console.log(`MATCH_COUNT_PROGRESS done=${done}/${pending.length} ok=${ok} empty=${empty} error=${error} total_matches=${total}`);
  });
  const dist=db.prepare('SELECT match_count,count(*) AS groups FROM league_group_match_counts GROUP BY match_count ORDER BY match_count').all();
  console.log(`MATCH_COUNT_DONE requested=${pending.length} ok=${ok} empty=${empty} error=${error} total_matches=${db.prepare('SELECT COALESCE(SUM(match_count),0) AS n FROM league_group_match_counts').get().n}`);
  console.log(JSON.stringify(dist));
}
