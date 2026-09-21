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
const esc = value => String(value ?? '').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ').replaceAll('&#248;', 'ø').replaceAll('&#230;', 'æ').replaceAll('&#229;', 'å').replaceAll('&quot;', '"');
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
CREATE TABLE IF NOT EXISTS league_match_requests (request_key TEXT PRIMARY KEY, phase TEXT NOT NULL, external_match_id TEXT NOT NULL, season_id INTEGER, age_group_id INTEGER, league_group_id TEXT, attempts INTEGER NOT NULL DEFAULT 0, http_status INTEGER, status TEXT NOT NULL, error_kind TEXT, fetched_at TEXT);
CREATE TABLE IF NOT EXISTS league_matches (external_match_id TEXT PRIMARY KEY, season_id INTEGER, age_group_id INTEGER, league_group_id TEXT, region_id INTEGER, round_raw TEXT, match_datetime_raw TEXT, match_date TEXT, venue_raw TEXT, organizer_raw TEXT, home_team_id TEXT, home_name_raw TEXT, away_team_id TEXT, away_name_raw TEXT, team_score_raw TEXT, point_score_raw TEXT, raw_sha256 TEXT, raw_source_file TEXT, source_url TEXT, fetched_at TEXT);
CREATE TABLE IF NOT EXISTS league_match_groups (external_match_id TEXT, season_id INTEGER, age_group_id INTEGER, league_group_id TEXT, region_id INTEGER, PRIMARY KEY(external_match_id,season_id,age_group_id,league_group_id));
CREATE TABLE IF NOT EXISTS match_categories (external_match_id TEXT, category_order INTEGER, category_raw TEXT, home_player_1_id TEXT, home_player_1_name_raw TEXT, home_player_2_id TEXT, home_player_2_name_raw TEXT, away_player_1_id TEXT, away_player_1_name_raw TEXT, away_player_2_id TEXT, away_player_2_name_raw TEXT, winner_side TEXT, walkover_marker TEXT, PRIMARY KEY(external_match_id,category_order));
CREATE TABLE IF NOT EXISTS match_games (external_match_id TEXT, category_order INTEGER, game_number INTEGER, home_points INTEGER, away_points INTEGER, raw_score TEXT, PRIMARY KEY(external_match_id,category_order,game_number));
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

const teamLink = value => { const m=String(value||'').match(/ShowStanding\(\s*['"]3['"]\s*,\s*['"]\d+['"]\s*,\s*['"]\d+['"]\s*,\s*['"]\d+['"]\s*,\s*['"]\d+['"]\s*,\s*['"](\d+)['"]/i); return m?.[1] ?? ''; };
function parseMatchList(html, season, age, group, region) {
  const rows=[]; const re=/<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  for(const m of html.matchAll(re)){ const b=m[1]; if(!/class=['"]matchno['"]/.test(b)) continue; const id=(b.match(/ShowStanding\(\s*['"]5['"]\s*,(?:\s*['"][^'"]*['"]\s*,){5}\s*['"](\d+)['"]/i)||[])[1]; if(!id) continue; const cells=[...b.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(x=>text(x[1])); const links=[...b.matchAll(/<td[^>]*class=['"]team['"][^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/gi)].map(x=>text(x[1])); const teamIds=[...b.matchAll(/ShowStanding\(\s*['"]3['"][\s\S]*?['"](\d+)['"]\s*,\s*['"]['"]\s*,/gi)].map(x=>x[1]); rows.push({id,season_id:season,age_group_id:age,league_group_id:String(group),region_id:region,match_datetime_raw:cells[0]||'',home_name_raw:links[0]||'',away_name_raw:links[1]||'',home_team_id:teamIds[0]||'',away_team_id:teamIds[1]||'',venue_raw:cells[4]||'',team_score_raw:cells[6]||'',point_score_raw:cells[7]||''}); }
  return rows;
}
function parseMatchDetail(html, id) {
  const info={}; for(const m of html.matchAll(/<tr>\s*<td[^>]*class=['"]lbl['"][^>]*>([\s\S]*?)<\/td>\s*<td[^>]*class=['"]val['"][^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi)) info[text(m[1])]=text(m[2]);
  const side = b => { const tm=text((b.match(/class=['"]teamhdr['"][^>]*>([\s\S]*?)<\/div>/i)||[,''])[1]); const ps=[...b.matchAll(/VisSpiller\/#(\d+)[^>]*>[\s\S]*?>([^<]+)</gi)].map(x=>({id:x[1],name:text(x[2])})); return {team:tm,players:ps}; };
  const cats=[]; const games=[]; const table=(html.match(/<table[^>]*class=['"]matchresultschema[^>]*>([\s\S]*?)<\/table>/i)||[,''])[1]; let order=0;
  for(const m of table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)){ const b=m[1]; if(!/class=['"]discipline['"]/.test(b)) continue; const discipline=text((b.match(/class=['"]discipline['"][^>]*>([\s\S]*?)(?:<input|<\/td>)/i)||[,''])[1]); const cells=[...b.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(x=>x[1]); const h=side(cells[1]||''); const a=side(cells[2]||''); const winner=/class=['"]playerwinner['"]/.test(cells[1]||'')?'home':/class=['"]playerwinner['"]/.test(cells[2]||'')?'away':null; const wo=text((b.match(/<td[^>]*class=['"]wo['"][^>]*>([\s\S]*?)<\/td>/i)||[,''])[1]); cats.push({external_match_id:String(id),category_order:order,category_raw:discipline,home:h,away:a,winner_side:winner,walkover_marker:wo}); let gameNo=0; for(const cell of b.matchAll(/<td[^>]*class=['"]result['"][^>]*>([\s\S]*?)<\/td>/gi)){ const raw=text(cell[1]); const p=raw.match(/(\d+)\s*-\s*(\d+)/); if(p) games.push({external_match_id:String(id),category_order:order,game_number:gameNo++,home_points:Number(p[1]),away_points:Number(p[2]),raw_score:raw}); } order++; }
  return {info,categories:cats,games};
}
const rawQueues=new Map();
async function writeRaw(file,line){ const prev=rawQueues.get(file)||Promise.resolve(); const next=prev.then(()=>import('node:fs/promises').then(fs=>fs.appendFile(file,line+'\n'))); rawQueues.set(file,next); await next; }
function rawFile(dir,bucket){ return `${dir}/batch-${String(bucket).padStart(4,'0')}.jsonl`; }

if (MODE === 'collect-list') {
  const { mkdir, appendFile } = await import('node:fs/promises'); await mkdir('statistik/data/liga-landskab-raw/matchlists',{recursive:true});
  const groups=db.prepare('SELECT g.season_id,g.age_group_id,g.league_group_id,COALESCE(MIN(r.region_id),1) region_id FROM league_groups g LEFT JOIN league_group_regions r USING(season_id,age_group_id,league_group_id) GROUP BY 1,2,3 ORDER BY 1,2,3').all(); const pending=groups.filter(g=>!db.prepare('SELECT 1 FROM league_match_requests WHERE phase=\'list\' AND external_match_id=?').get(`${g.season_id}:${g.age_group_id}:${g.league_group_id}`));
  console.log(`COLLECT_LIST_START pending=${pending.length} total=${groups.length}`); let done=0,ok=0,empty=0,error=0,newMatches=0; await worker(pending,async g=>{const req=`${g.season_id}:${g.age_group_id}:${g.league_group_id}`; const url=requestUrl(g.season_id,g.age_group_id,g.region_id,g.league_group_id).replace('#1,','#4,'); try{const r=await call({subPage:4,seasonID:g.season_id,leagueGroupID:g.league_group_id,ageGroupID:g.age_group_id,regionID:g.region_id,leagueGroupTeamID:null,leagueMatchID:null,clubID:null,playerID:null}); const rows=parseMatchList(r.html,g.season_id,g.age_group_id,g.league_group_id,g.region_id); const file=rawFile('statistik/data/liga-landskab-raw/matchlists',Math.floor(done/250)); await writeRaw(file,JSON.stringify({request:req,http:r.http,raw:r.raw})); db.prepare(`INSERT OR REPLACE INTO league_match_requests VALUES(?,?,?,?,?,?,?,?,?,?,?)`).run(req,'list',req,g.season_id,g.age_group_id,g.league_group_id, r.attempt,r.http,rows.length?'ok':'empty',null,now()); const mi=db.prepare(`INSERT OR IGNORE INTO league_matches(external_match_id,season_id,age_group_id,league_group_id,region_id,match_datetime_raw,home_team_id,home_name_raw,away_team_id,away_name_raw,venue_raw,team_score_raw,point_score_raw,raw_sha256,raw_source_file,source_url,fetched_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`); const mg=db.prepare(`INSERT OR IGNORE INTO league_match_groups VALUES(?,?,?,?,?)`); for(const x of rows){const ch=mi.run(x.id,x.season_id,x.age_group_id,x.league_group_id,x.region_id,x.match_datetime_raw,x.home_team_id,x.home_name_raw,x.away_team_id,x.away_name_raw,x.venue_raw,x.team_score_raw,x.point_score_raw,hash(r.raw),file,url,now()).changes; newMatches+=Number(ch); mg.run(x.id,x.season_id,x.age_group_id,x.league_group_id,x.region_id);} if(rows.length) ok++; else empty++;}catch(e){error++; db.prepare(`INSERT OR REPLACE INTO league_match_requests VALUES(?,?,?,?,?,?,?,?,?,?,?)`).run(req,'list',req,g.season_id,g.age_group_id,g.league_group_id,1,null,'error',e.message,now());} done++; if(done%250===0) console.log(`COLLECT_LIST_PROGRESS done=${done}/${pending.length} ok=${ok} empty=${empty} error=${error} newMatches=${newMatches}`); }); console.log(`COLLECT_LIST_DONE ok=${ok} empty=${empty} error=${error} newMatches=${newMatches} totalMatches=${db.prepare('SELECT COUNT(*) n FROM league_matches').get().n}`);
}

if (MODE === 'collect-detail') {
  const { mkdir } = await import('node:fs/promises'); await mkdir('statistik/data/liga-landskab-raw/matches',{recursive:true}); const rows=db.prepare('SELECT external_match_id,season_id,age_group_id,league_group_id,region_id FROM league_matches ORDER BY external_match_id').all(); const pending=rows.filter(x=>!db.prepare('SELECT 1 FROM league_match_requests WHERE phase=\'detail\' AND external_match_id=?').get(x.external_match_id)); console.log(`COLLECT_DETAIL_START pending=${pending.length} total=${rows.length}`); let done=0,ok=0,empty=0,error=0,cats=0,games=0; await worker(pending,async x=>{const req=`detail:${x.external_match_id}`; const url=requestUrl(x.season_id,x.age_group_id,x.region_id ?? 1,x.league_group_id).replace('#1,','#5,')+x.external_match_id; try{const r=await call({subPage:5,seasonID:x.season_id,leagueGroupID:x.league_group_id,ageGroupID:x.age_group_id,regionID:x.region_id ?? 1,leagueGroupTeamID:null,leagueMatchID:Number(x.external_match_id),clubID:null,playerID:null}); const parsed=parseMatchDetail(r.html,x.external_match_id); const file=rawFile('statistik/data/liga-landskab-raw/matches',Math.floor(done/250)); await writeRaw(file,JSON.stringify({request:req,http:r.http,raw:r.raw})); const status=r.html.trim()?'ok':'empty'; db.prepare(`INSERT OR REPLACE INTO league_match_requests VALUES(?,?,?,?,?,?,?,?,?,?,?)`).run(req,'detail',x.external_match_id,x.season_id,x.age_group_id,x.league_group_id,r.attempt,r.http,status,null,now()); const up=db.prepare(`UPDATE league_matches SET round_raw=?,match_datetime_raw=?,match_date=?,venue_raw=?,home_name_raw=?,away_name_raw=?,team_score_raw=?,point_score_raw=?,raw_sha256=?,raw_source_file=?,fetched_at=? WHERE external_match_id=?`); const i=parsed.info; up.run(i.Runde||null,i.Tid||null,(i.Tid||'').match(/(\d{2}[-.]\d{2}[-.]\d{4})/)?.[1]||null,i.Spillested||null,i.Hjemmehold||null,i.Udehold||null,i.Resultat||null,i.Point||null,hash(r.raw),file,now(),x.external_match_id); const ci=db.prepare(`INSERT OR REPLACE INTO match_categories VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`); const gi=db.prepare(`INSERT OR REPLACE INTO match_games VALUES(?,?,?,?,?,?)`); for(const c of parsed.categories){const hp=c.home.players;const ap=c.away.players;ci.run(x.external_match_id,c.category_order,c.category_raw,hp[0]?.id||null,hp[0]?.name||null,hp[1]?.id||null,hp[1]?.name||null,ap[0]?.id||null,ap[0]?.name||null,ap[1]?.id||null,ap[1]?.name||null,c.winner_side,c.walkover_marker||null); cats++;} for(const g of parsed.games){gi.run(g.external_match_id,g.category_order,g.game_number,g.home_points,g.away_points,g.raw_score);games++;} if(status==='ok')ok++;else empty++;}catch(e){error++;db.prepare(`INSERT OR REPLACE INTO league_match_requests VALUES(?,?,?,?,?,?,?,?,?,?,?)`).run(req,'detail',x.external_match_id,x.season_id,x.age_group_id,x.league_group_id,1,null,'error',e.message,now());} done++; if(done%1000===0) console.log(`COLLECT_DETAIL_PROGRESS done=${done}/${pending.length} ok=${ok} empty=${empty} error=${error} categories=${cats} games=${games}`); }); console.log(`COLLECT_DETAIL_DONE ok=${ok} empty=${empty} error=${error} categories=${cats} games=${games}`);
}
