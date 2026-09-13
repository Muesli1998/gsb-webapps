import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const cols = db.prepare('PRAGMA table_info(team_matches)').all().map((x) => x.name);
if (!cols.includes('remark_raw')) db.exec('ALTER TABLE team_matches ADD COLUMN remark_raw TEXT');
const parsed = JSON.parse(fs.readFileSync('results/browser-individual-parse-report.json', 'utf8')).rows;
const update = db.prepare('UPDATE team_matches SET remark_raw = ? WHERE external_match_id = ?');
let updated = 0, withRemark = 0;
db.exec('BEGIN');
try {
  for (const row of parsed) {
    if (!row.remark) continue;
    update.run(row.remark, String(row.id)); updated++; withRemark++;
  }
  db.exec('COMMIT');
} catch (e) { db.exec('ROLLBACK'); throw e; }
const rows = db.prepare("SELECT external_match_id, season_id, round_date, home_name_raw, away_name_raw, result_raw, points_raw, remark_raw FROM team_matches WHERE trim(COALESCE(remark_raw,''))<>'' ORDER BY season_id, round_date, external_match_id").all();
const keywordCounts = {};
for (const r of rows) for (const k of ['protest', 'kendelse', 'afbud', 'udebliv', 'corona', 'trukket', 'ændret', 'ændring']) if (new RegExp(k, 'i').test(r.remark_raw)) keywordCounts[k] = (keywordCounts[k] ?? 0) + 1;
const report = { generatedAt: new Date().toISOString(), updated, rowsWithRemarks: rows.length, keywordCounts, rows };
fs.writeFileSync('results/team-match-remarks-audit.json', JSON.stringify(report, null, 2));
let md = `# Bemærkninger på holdkampe\n\n- Payloads med gemt Bemærkning: **${rows.length}**\n- Opdaterede rækker: **${updated}**\n\n## Nøgleord\n\n`;
for (const [k, n] of Object.entries(keywordCounts)) md += `- ${k}: **${n}**\n`;
md += `\nBemærkningerne gemmes ordret i team_matches.remark_raw. Ingen betydning eller årsag udledes automatisk.\n\n## Eksempler\n\n| Kamp | Sæson | Dato | Resultat | Bemærkning |\n|---|---:|---|---|---|\n`;
for (const r of rows.slice(0, 30)) md += `| ${r.external_match_id} | ${r.season_id} | ${r.round_date ?? ''} | ${r.result_raw ?? ''} | ${String(r.remark_raw).replace(/\|/g, '\\|')} |\n`;
fs.writeFileSync('results/team-match-remarks-audit.md', md);
db.close();
console.log(JSON.stringify({ updated, rowsWithRemarks: rows.length, keywordCounts }, null, 2));
