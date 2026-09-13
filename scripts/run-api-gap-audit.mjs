import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const status = db.prepare('SELECT status, COUNT(*) AS n FROM team_matches GROUP BY status ORDER BY status').all();
const bySeason = db.prepare(`
  SELECT season_id, COUNT(*) AS total,
    SUM(CASE WHEN result_raw IS NULL OR trim(result_raw) = '' THEN 1 ELSE 0 END) AS missing_result,
    SUM(CASE WHEN home_name_raw IS NULL OR trim(home_name_raw) = '' THEN 1 ELSE 0 END) AS missing_home,
    SUM(CASE WHEN away_name_raw IS NULL OR trim(away_name_raw) = '' THEN 1 ELSE 0 END) AS missing_away,
    SUM(CASE WHEN status = 'api_error' THEN 1 ELSE 0 END) AS api_errors
  FROM team_matches GROUP BY season_id ORDER BY season_id
`).all();
const totals = db.prepare(`SELECT COUNT(*) AS total,
  SUM(CASE WHEN result_raw IS NULL OR trim(result_raw) = '' THEN 1 ELSE 0 END) AS missing_result,
  SUM(CASE WHEN home_name_raw IS NULL OR trim(home_name_raw) = '' OR away_name_raw IS NULL OR trim(away_name_raw) = '' THEN 1 ELSE 0 END) AS missing_sides,
  SUM(CASE WHEN status = 'api_error' THEN 1 ELSE 0 END) AS api_errors,
  SUM(CASE WHEN status = 'missing_players' THEN 1 ELSE 0 END) AS missing_players
  FROM team_matches`).get();
const report = { generatedAt: new Date().toISOString(), totals, status, bySeason,
  interpretation: [
    'Status og faktisk felt-dækning rapporteres separat.',
    'En række med status complete kan stadig mangle resultatfelter; status er derfor ikke et bevis på komplet række.',
    'Manglende felter betyder ikke, at data ikke findes online; gemte dynamiske browserpayloads er den dokumenterede fallback.'
  ] };
fs.writeFileSync('results/api-gap-audit-data.json', JSON.stringify(report, null, 2));
let md = `# API- og felt-dækning: aktuel audit\n\nDato: ${report.generatedAt}\n\n## Samlet\n\n- Teamkampe: **${totals.total}**\n- API-fejl: **${totals.api_errors}**\n- Manglende spillerdata-status: **${totals.missing_players}**\n- Manglende resultatfelt: **${totals.missing_result}**\n- Manglende hjemme/ude: **${totals.missing_sides}**\n\n## Status\n\n| Status | Antal |\n|---|---:|\n`;
for (const r of status) md += `| ${r.status} | ${r.n} |\n`;
md += `\n## Pr. sæson\n\n| Sæson | Kampe | API-fejl | Mangler resultat | Mangler hjemme/ude |\n|---:|---:|---:|---:|---:|\n`;
for (const r of bySeason) md += `| ${r.season_id} | ${r.total} | ${r.api_errors} | ${r.missing_result} | ${Number(r.missing_home) + Number(r.missing_away)} |\n`;
md += `\n## Fortolkning\n\n- Browserverificerede rækker er synkroniseret med de felter, der faktisk stod på den dynamiske side.\n- To ungdomskampe mangler stadig dynamisk kampdetalje og står som særskilte huller i køen.\n- De resterende mangler prioriteres efter sæson og felt: først hjemme/ude og resultat, derefter individuelle spillere og detaljer.\n`;
fs.writeFileSync('results/api-gap-audit.md', md);
db.close();
console.log(JSON.stringify({ totals, status }, null, 2));
