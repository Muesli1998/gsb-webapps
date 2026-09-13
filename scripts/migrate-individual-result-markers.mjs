import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const cols = db.prepare('PRAGMA table_info(individual_matches)').all().map((x) => x.name);
if (!cols.includes('result_marker_raw')) db.exec('ALTER TABLE individual_matches ADD COLUMN result_marker_raw TEXT');
const parsed = JSON.parse(fs.readFileSync('results/browser-individual-parse-report.json', 'utf8')).rows;
const matchByExternal = new Map(db.prepare('SELECT team_match_id, external_match_id FROM team_matches').all().map((x) => [String(x.external_match_id), x.team_match_id]));
const rows = db.prepare('SELECT individual_match_id, team_match_id, category_raw FROM individual_matches').all();
const byKey = new Map(rows.map((x) => [`${x.team_match_id}|${x.category_raw}`, x]));
const update = db.prepare('UPDATE individual_matches SET result_marker_raw = ?, status = CASE WHEN ? = 1 THEN \'browser_zero_score\' ELSE status END WHERE individual_match_id = ?');
let matched = 0, marked = 0, zeroScore = 0;
db.exec('BEGIN');
try {
  for (const match of parsed) {
    const teamMatchId = matchByExternal.get(String(match.id)); if (!teamMatchId) continue;
    for (const c of match.categories ?? []) {
      const row = byKey.get(`${teamMatchId}|${c.category}`); if (!row) continue;
      if (c.resultMarkerRaw || c.zeroScore) { update.run(c.resultMarkerRaw, c.zeroScore ? 1 : 0, row.individual_match_id); matched++; if (c.resultMarkerRaw) marked++; if (c.zeroScore) zeroScore++; }
    }
  }
  db.exec('COMMIT');
} catch (e) { db.exec('ROLLBACK'); throw e; }
const report = { generatedAt: new Date().toISOString(), matched, marked, zeroScore };
fs.writeFileSync('results/individual-result-marker-migration.json', JSON.stringify(report, null, 2));
fs.writeFileSync('results/individual-result-marker-migration.md', `# Individuelle resultatmarkører\n\n- Rækker med opdateret markør/0-0-status: **${matched}**\n- Rækker med rå markør (fx K/V/G/D): **${marked}**\n- Rækker med 0-0-sæt: **${zeroScore}**\n\nMarkørteksten gemmes ordret. 0-0 behandles som særstatus og bruges ikke som normal sætscore.\n`);
db.close();
console.log(report);
