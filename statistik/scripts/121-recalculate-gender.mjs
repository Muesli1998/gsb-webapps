import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const dbPath = path.resolve(process.env.NATIONAL_PLAYERS_DB || 'statistik/data/national-spillere.db');
const overridesPath = path.resolve(process.env.GENDER_OVERRIDES || 'statistik/results/121-koensrettelse/manuelle-overstyringer.csv');
const reportPath = path.resolve(process.env.GENDER_REPORT || 'statistik/results/121-koensrettelse/recalculation.json');
const allowed = new Set(['mand','kvinde','ikke afklaret','aldrig spillet','modstridende data']);
const db = new DatabaseSync(dbPath);
db.exec('PRAGMA busy_timeout=60000;');
const before = Object.fromEntries(db.prepare('SELECT gender_status, COUNT(*) n FROM players GROUP BY gender_status').all().map(r => [r.gender_status, Number(r.n)]));
const schema = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='players'").get().sql;
if (!schema.includes("'modstridende data'")) {
  db.exec(`PRAGMA foreign_keys=OFF; BEGIN;
    CREATE TABLE players_new (external_player_id TEXT PRIMARY KEY, name_raw TEXT NOT NULL,
      gender_status TEXT NOT NULL CHECK(gender_status IN ('mand','kvinde','ikke afklaret','aldrig spillet','modstridende data')),
      first_seen_at TEXT NOT NULL, last_seen_at TEXT NOT NULL);
    INSERT INTO players_new SELECT external_player_id,name_raw,gender_status,first_seen_at,last_seen_at FROM players;
    DROP TABLE players;
    ALTER TABLE players_new RENAME TO players;
    COMMIT; PRAGMA foreign_keys=ON;`);
}
const overrides = fs.readFileSync(overridesPath, 'utf8').trim().split(/\r?\n/).slice(1).filter(Boolean).map(line => {
  const [external_player_id, gender_status] = line.split(',').map(x => x.trim());
  if (!external_player_id || !allowed.has(gender_status)) throw new Error(`Invalid override: ${line}`);
  return { external_player_id, gender_status };
});
const aggregate = db.prepare(`SELECT p.external_player_id, p.gender_status current_status,
  SUM(CASE WHEN pm.discipline_code IN ('HS','HD') THEN 1 ELSE 0 END) male_count,
  SUM(CASE WHEN pm.discipline_code IN ('DS','DD') THEN 1 ELSE 0 END) female_count
  FROM players p LEFT JOIN player_matches pm ON pm.external_player_id=p.external_player_id
  GROUP BY p.external_player_id, p.gender_status`);
const update = db.prepare('UPDATE players SET gender_status=? WHERE external_player_id=?');
let autoChanged = 0; const autoDistribution = {}; const samples = [];
db.exec('BEGIN');
for (const row of aggregate.all()) {
  const male = Number(row.male_count || 0), female = Number(row.female_count || 0), total = male + female;
  let status;
  if (row.current_status === 'aldrig spillet' && total === 0) status = 'aldrig spillet';
  else if (total === 0) status = 'ikke afklaret';
  else if (male / total >= 0.8) status = 'mand';
  else if (female / total >= 0.8) status = 'kvinde';
  else status = 'modstridende data';
  autoDistribution[status] = (autoDistribution[status] || 0) + 1;
  if (status !== row.current_status) autoChanged++;
  update.run(status, row.external_player_id);
  if (samples.length < 10 && total > 0 && (male === 1 || female === 1 || male === female || total >= 10)) samples.push({ external_player_id: row.external_player_id, male, female, automatic_status: status });
}
db.exec('COMMIT');
let applied = 0; const missing = []; const overrideChecks = [];
db.exec('BEGIN');
for (const o of overrides) {
  const found = db.prepare('SELECT external_player_id,name_raw,gender_status FROM players WHERE external_player_id=?').get(o.external_player_id);
  if (!found) { missing.push(o.external_player_id); continue; }
  update.run(o.gender_status, o.external_player_id); applied++;
  if (overrideChecks.length < 10) overrideChecks.push({ ...found, requested: o.gender_status });
}
db.exec('COMMIT');
const final = Object.fromEntries(db.prepare('SELECT gender_status, COUNT(*) n FROM players GROUP BY gender_status').all().map(r => [r.gender_status, Number(r.n)]));
const special = db.prepare("SELECT external_player_id,name_raw,gender_status FROM players WHERE external_player_id='234617'").get();
const result = { totalPlayers: Number(db.prepare('SELECT COUNT(*) n FROM players').get().n), before, automaticDistribution: autoDistribution, automaticChanged: autoChanged, overrideRows: overrides.length, overridesApplied: applied, missingOverrideIds: missing, overrideChecks, specialPlayer234617: special, samples, generatedAt: new Date().toISOString(), final };
if (result.totalPlayers !== 76169) throw new Error(`Expected 76169 players, got ${result.totalPlayers}`);
if (overrides.length !== 62 || applied !== 62 || missing.length) throw new Error(`Override check failed rows=${overrides.length} applied=${applied} missing=${missing.length}`);
if (!special || special.gender_status !== 'modstridende data') throw new Error(`234617 status is ${special?.gender_status}`);
fs.mkdirSync(path.dirname(reportPath), { recursive: true }); fs.writeFileSync(reportPath, JSON.stringify(result, null, 2) + '\n');
db.close(); console.log(JSON.stringify(result, null, 2));
