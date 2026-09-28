import { chromium } from 'playwright';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const DB_PATH = path.resolve('data/liga-landskab.db');
const OUT_DB = path.resolve('data/national-spillere.db');
const RESULTS = path.resolve('results/120-national-spiller-scraper');
const RUN_TAG = process.env.RUN_TAG || '';
const PROFILE_DIR = process.env.PROFILE_DIR || '.browser-state';
const START_INDEX = Number(process.env.START_INDEX || 0);
const END_INDEX_ENV = process.env.END_INDEX ? Number(process.env.END_INDEX) : null;
const MAX_RUNTIME_MS = Number(process.env.MAX_RUNTIME_MS || 60 * 60 * 1000);
const RENDER_TIMEOUT_MS = Number(process.env.RENDER_TIMEOUT_MS || 15000);
const RETRY_RENDER_GATE = process.env.RETRY_RENDER_GATE === '1';
const PAUSE_MS = Number(process.env.PAGE_PAUSE_MS || 1000);
fs.mkdirSync(RESULTS, { recursive: true });
const startedAt = Date.now();

function metadata() {
  const db = new DatabaseSync(DB_PATH, { readOnly: true });
  const rows = db.prepare(`SELECT external_match_id, MIN(season_id) season_id, MIN(age_group_id) age_group_id,
    MIN(league_group_id) league_group_id, MIN(region_id) region_id
    FROM league_match_groups GROUP BY external_match_id ORDER BY external_match_id`).all();
  db.close();
  return rows;
}
function initDb() {
  const db = new DatabaseSync(OUT_DB);
  db.exec(`PRAGMA foreign_keys=ON; PRAGMA busy_timeout=60000;
    CREATE TABLE IF NOT EXISTS matches (external_match_id TEXT PRIMARY KEY, season_id INTEGER, age_group_id INTEGER,
      league_group_id TEXT, region_id INTEGER, source_url TEXT NOT NULL, render_gate INTEGER NOT NULL,
      result_raw TEXT, round_raw TEXT, home_team_raw TEXT, away_team_raw TEXT, context_raw TEXT,
      fetched_at TEXT NOT NULL, error_type TEXT, error_message TEXT);
    CREATE TABLE IF NOT EXISTS players (external_player_id TEXT PRIMARY KEY, name_raw TEXT NOT NULL,
      gender_status TEXT NOT NULL CHECK(gender_status IN ('mand','kvinde','ikke afklaret','aldrig spillet')),
      first_seen_at TEXT NOT NULL, last_seen_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS player_matches (external_player_id TEXT NOT NULL, external_match_id TEXT NOT NULL,
      name_raw TEXT NOT NULL, team_side TEXT, discipline_code TEXT, partner_player_id TEXT,
      opponent_player_id TEXT, set_scores_raw TEXT, walkover_raw TEXT, round_raw TEXT, context_raw TEXT,
      PRIMARY KEY(external_player_id, external_match_id, discipline_code, team_side),
      FOREIGN KEY(external_player_id) REFERENCES players(external_player_id), FOREIGN KEY(external_match_id) REFERENCES matches(external_match_id));
    CREATE TABLE IF NOT EXISTS scrape_errors (external_match_id TEXT PRIMARY KEY, error_type TEXT NOT NULL,
      error_message TEXT NOT NULL, occurred_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS scrape_progress (external_match_id TEXT PRIMARY KEY, status TEXT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0, last_error TEXT, updated_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS scrape_checkpoints (checkpoint_id INTEGER PRIMARY KEY AUTOINCREMENT,
      attempted INTEGER NOT NULL, ok INTEGER NOT NULL, no_player_links INTEGER NOT NULL,
      render_gate_failed INTEGER NOT NULL, fetch_error INTEGER NOT NULL, players_found INTEGER NOT NULL,
      updated_at TEXT NOT NULL);
  `);
  // Seed progress for the 119 sample so resume never re-fetches those IDs.
  db.exec(`INSERT OR IGNORE INTO scrape_progress(external_match_id,status,attempts,last_error,updated_at)
    SELECT m.external_match_id, CASE WHEN m.render_gate=1 THEN 'ok' ELSE 'render_gate_failed' END,
      1, m.error_message, m.fetched_at FROM matches m`);
  return db;
}
function parsePage(payload, meta) {
  const text = payload.text || '';
  const lines = text.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  const result = lines.find(x => x.startsWith('Resultat')) || null;
  const gate = text.includes(String(meta.external_match_id)) && Boolean(result);
  const unique = new Map();
  for (const link of payload.links || []) if (link.id && !unique.has(link.id)) unique.set(link.id, link);
  const cats = lines.map(label => { const m = label.match(/^(\d+)\.\s*(HS|DS|HD|DD|MD|S|D)\b/); return m ? { label, code: m[2] } : null; }).filter(Boolean);
  const codeById = new Map();
  for (const c of cats) {
    const block = (payload.blocks || []).find(x => x.label === c.label)?.text || '';
    for (const [id, link] of unique) if (block.includes(link.name)) {
      if (!codeById.has(id)) codeById.set(id, new Set());
      codeById.get(id).add(c.code);
    }
  }
  const players = [...unique.entries()].map(([id, link]) => {
    const codes = [...(codeById.get(id) || [])];
    let gender = 'ikke afklaret';
    if (codes.some(c => ['HS', 'HD'].includes(c))) gender = 'mand';
    if (codes.some(c => ['DS', 'DD'].includes(c))) gender = 'kvinde';
    return { id, name: link.name, codes, gender };
  });
  const hi = lines.findIndex(x => x.startsWith('Hjemmehold'));
  const ai = lines.findIndex(x => x.startsWith('Udehold'));
  return { gate, notFound: /kampnummer findes ikke/i.test(text), result, players, categories: cats.map(x => x.code), round: lines.find(x => x.startsWith('Runde')) || null,
    home: hi >= 0 ? lines[hi].replace(/^Hjemmehold\s*/, '') : null,
    away: ai >= 0 ? lines[ai].replace(/^Udehold\s*/, '') : null, raw: text };
}
async function readPage(page, meta, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  try { await page.waitForFunction((id) => { const t = document.body?.innerText || ''; return /kampnummer findes ikke/i.test(t) || (t.includes(String(id)) && t.split(/\r?\n/).some(x => x.trim().startsWith('Resultat'))); }, meta.external_match_id, { timeout: RENDER_TIMEOUT_MS, polling: 100 }); } catch {}
  return page.locator('body').evaluate(body => {
    const text = body.innerText || '';
    const links = [...body.querySelectorAll('a[href*="/DBF/Spiller/VisSpiller/"]')].map(a => ({
      name: (a.textContent || '').trim(), href: a.href, id: (a.href.match(/#(\d+)/) || [])[1] || null
    }));
    const lines = text.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
    const blocks = [];
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(\d+)\.\s*(HS|DS|HD|DD|MD|S|D)\b/);
      if (!m) continue;
      let j = i + 1;
      while (j < lines.length && !/^\d+\.\s*(HS|DS|HD|DD|MD|S|D)\b/.test(lines[j]) && !/^Golden Set/.test(lines[j])) j++;
      blocks.push({ label: lines[i], code: m[2], text: lines.slice(i, j).join('\n') });
    }
    return { text, links, blocks };
  });
}
const metas = metadata();
const db = initDb();
const context = await chromium.launchPersistentContext(PROFILE_DIR, { headless: false });
const page = await context.newPage();
const progressPath = path.join(RESULTS, RUN_TAG ? `progress-${RUN_TAG}.json` : 'progress.json');
const stats = { attempted: 0, ok: 0, no_player_links: 0, render_gate_failed: 0, fetch_error: 0, players_found: 0, startedAt: new Date(startedAt).toISOString(), stoppedBy: null };
function checkpoint() {
  const stamp = new Date().toISOString();
  db.prepare(`INSERT INTO scrape_checkpoints(attempted,ok,no_player_links,render_gate_failed,fetch_error,players_found,updated_at) VALUES(?,?,?,?,?,?,?)`)
    .run(stats.attempted, stats.ok, stats.no_player_links, stats.render_gate_failed, stats.fetch_error, stats.players_found, stamp);
  fs.writeFileSync(progressPath, JSON.stringify({ ...stats, lastCheckpointAt: stamp, totalPopulation: metas.length, selectedRange: [START_INDEX, END_INDEX_ENV ?? metas.length], remaining: metas.length - stats.attempted }, null, 2) + '\n');
}
const matchStmt = db.prepare(`INSERT OR REPLACE INTO matches VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
const playerStmt = db.prepare(`INSERT INTO players VALUES(?,?,?,?,?) ON CONFLICT(external_player_id) DO UPDATE SET name_raw=excluded.name_raw,
  gender_status=CASE WHEN players.gender_status='mand' OR excluded.gender_status='mand' THEN 'mand' WHEN players.gender_status='kvinde' OR excluded.gender_status='kvinde' THEN 'kvinde' ELSE 'ikke afklaret' END,
  last_seen_at=excluded.last_seen_at`);
const pmStmt = db.prepare(`INSERT OR REPLACE INTO player_matches VALUES(?,?,?,?,?,?,?,?,?,?,?)`);
const selectedMetas = metas.slice(START_INDEX, END_INDEX_ENV ?? metas.length);
for (const meta of selectedMetas) {
  if (Date.now() - startedAt >= MAX_RUNTIME_MS) { stats.stoppedBy = 'time_limit'; break; }
  const id = String(meta.external_match_id);
  const existing = db.prepare('SELECT status FROM scrape_progress WHERE external_match_id=?').get(id);
  if (existing && !(RETRY_RENDER_GATE && existing.status === 'render_gate_failed')) continue;
  const url = `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,${meta.season_id},${meta.league_group_id},1,8,,${id},1093,`;
  stats.attempted++;
  let status = 'fetch_error'; let error = null;
  try {
    const payload = await readPage(page, meta, url);
    const parsed = parsePage(payload, meta);
    status = parsed.notFound ? 'match_not_found' : (parsed.gate ? (parsed.players.length ? 'ok' : 'no_player_links') : 'render_gate_failed');
    if (status === 'ok') stats.ok++; else if (status === 'no_player_links') stats.no_player_links++; else if (status === 'render_gate_failed') stats.render_gate_failed++;
    matchStmt.run(id, meta.season_id, meta.age_group_id, meta.league_group_id, meta.region_id, url, parsed.gate ? 1 : 0,
      parsed.result, parsed.round, parsed.home, parsed.away, parsed.raw.slice(0, 10000), new Date().toISOString(), parsed.gate ? null : status,
      parsed.gate ? null : (parsed.notFound ? 'Kampnummer findes ikke' : 'Expected match ID or Resultat line missing'));
    if (parsed.gate) {
      for (const p of parsed.players) {
        playerStmt.run(p.id, p.name, p.gender, new Date().toISOString(), new Date().toISOString()); stats.players_found++;
        for (const code of (p.codes.length ? p.codes : [null])) pmStmt.run(p.id, id, p.name, null, code, null, null, null, null, parsed.round, parsed.raw.slice(0, 2000));
      }
    }
  } catch (e) {
    error = String(e); stats.fetch_error++;
    matchStmt.run(id, meta.season_id, meta.age_group_id, meta.league_group_id, meta.region_id, url, 0, null, null, null, null, null, new Date().toISOString(), 'fetch_error', error);
    db.prepare('INSERT OR REPLACE INTO scrape_errors VALUES(?,?,?,?)').run(id, 'fetch_error', error, new Date().toISOString());
  }
  db.prepare('INSERT OR REPLACE INTO scrape_progress VALUES(?,?,?,?,?)').run(id, status, 1, error, new Date().toISOString());
  if (stats.attempted % 25 === 0) checkpoint();
  console.log(JSON.stringify({id,status,attempted:stats.attempted,elapsedMs:Date.now()-startedAt}));
  await new Promise(resolve => setTimeout(resolve, PAUSE_MS));
}
if (!stats.stoppedBy) stats.stoppedBy = (stats.attempted >= metas.length ? 'population_exhausted' : 'loop_finished');
checkpoint();
await context.close();
const summary = { ...stats, totalPopulation: metas.length, selectedRange: [START_INDEX, END_INDEX_ENV ?? metas.length], remaining: metas.length - stats.attempted, completedAt: new Date().toISOString(), renderTimeoutMs: RENDER_TIMEOUT_MS, pauseMs: PAUSE_MS,
  estimatedHoursFullPopulation: ((metas.length / Math.max(1, stats.attempted)) * ((Date.now()-startedAt)/3600000)).toFixed(2),
  resumeCommand: 'node scripts/120-national-spiller-scraper.mjs' };
fs.writeFileSync(path.join(RESULTS, RUN_TAG ? `run-summary-${RUN_TAG}.json` : 'run-summary.json'), JSON.stringify(summary, null, 2) + '\n');
db.close();
console.log(JSON.stringify(summary));
