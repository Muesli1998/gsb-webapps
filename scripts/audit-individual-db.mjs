import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const scalar = (sql) => db.prepare(sql).get();
const all = (sql) => db.prepare(sql).all();
const report = {
  generatedAt: new Date().toISOString(),
  database: {
    teamMatches: scalar('SELECT COUNT(*) AS n FROM team_matches').n,
    teamMatchesWithIndividualRows: scalar('SELECT COUNT(DISTINCT team_match_id) AS n FROM individual_matches').n,
    individualMatches: scalar('SELECT COUNT(*) AS n FROM individual_matches').n,
    playerRelations: scalar('SELECT COUNT(*) AS n FROM individual_match_players').n,
    players: scalar('SELECT COUNT(*) AS n FROM players').n,
    individualRowsWithWinnerSide: scalar("SELECT COUNT(*) AS n FROM individual_matches WHERE winner_side IS NOT NULL AND trim(winner_side)<>''").n,
    individualRowsWithAnyScore: scalar("SELECT COUNT(*) AS n FROM individual_matches WHERE (trim(home_score_raw)<>'') OR (trim(away_score_raw)<>'')").n,
    individualRowsWithSameHomeAwayScore: scalar("SELECT COUNT(*) AS n FROM individual_matches WHERE home_score_raw IS NOT NULL AND trim(home_score_raw)<>'' AND home_score_raw=away_score_raw").n,
    teamMatchesWithResultAndNoIndividualRows: scalar("SELECT COUNT(*) AS n FROM team_matches tm LEFT JOIN individual_matches im ON im.team_match_id=tm.team_match_id WHERE trim(COALESCE(tm.result_raw,''))<>'' AND trim(tm.result_raw)<>'-' AND im.individual_match_id IS NULL").n
  },
  bySeason: all(`SELECT tm.season_id AS season,
    COUNT(DISTINCT tm.team_match_id) AS team_matches,
    COUNT(DISTINCT im.team_match_id) AS with_individual_rows,
    COUNT(im.individual_match_id) AS individual_rows,
    COUNT(DISTINCT CASE WHEN trim(COALESCE(tm.result_raw,''))<>'' AND trim(tm.result_raw)<>'-' THEN tm.team_match_id END) AS with_team_result,
    COUNT(DISTINCT CASE WHEN im.individual_match_id IS NULL AND trim(COALESCE(tm.result_raw,''))<>'' AND trim(tm.result_raw)<>'-' THEN tm.team_match_id END) AS result_without_individual_rows
    FROM team_matches tm LEFT JOIN individual_matches im ON im.team_match_id=tm.team_match_id
    GROUP BY tm.season_id ORDER BY tm.season_id`)
};
db.close();

const payloadStats = [];
const payloadDirs = ['results/browser-fallback', 'results/browser-fallback-youth', 'results/browser-fallback-complete'];
const seen = new Map();
for (const dir of payloadDirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((x) => x.endsWith('.json') && !x.endsWith('.retry.json'))) {
    const full = path.join(dir, file); const o = JSON.parse(fs.readFileSync(full, 'utf8')); const id = String(o.matchId ?? o.external_match_id ?? '');
    if (!id || !o.rawText) continue;
    if (!seen.has(id) || String(o.rawText).length > String(seen.get(id).rawText).length) seen.set(id, { id, source: dir, rawText: o.rawText });
  }
}
for (const x of seen.values()) {
  const resultIndex = x.rawText.search(/\nResultat\b/i);
  const detail = resultIndex >= 0 ? x.rawText.slice(resultIndex) : x.rawText;
  const categories = [...new Set((x.rawText.match(/^\d+\.\s*[^\t\r\n]+/gm) ?? []).map((v) => v.trim()))];
  const scores = detail.match(/\b\d{1,2}\s*[-–]\s*\d{1,2}\b/g) ?? [];
  payloadStats.push({ id: x.id, source: x.source, categoryCount: categories.length, scoreCount: scores.length, hasResultLabel: /^Resultat\b/m.test(x.rawText), hasNoPlayText: /Afgjort uden kamp|Ikke fremmødt/i.test(x.rawText) });
}
report.browserPayloads = {
  uniqueWithRawText: payloadStats.length,
  withCategories: payloadStats.filter((x) => x.categoryCount > 0).length,
  withScores: payloadStats.filter((x) => x.scoreCount > 0).length,
  withNoPlayText: payloadStats.filter((x) => x.hasNoPlayText).length
};
fs.writeFileSync('results/individual-db-audit.json', JSON.stringify(report, null, 2));
let md = `# Audit af individuelle holdkampdata\n\nGenereret: ${report.generatedAt}\n\n`;
md += `- Holdkampe i SQLite: **${report.database.teamMatches}**\n- Holdkampe med individuelle rækker: **${report.database.teamMatchesWithIndividualRows}**\n- Individuelle rækker: **${report.database.individualMatches}**\n- Spillerrelationer: **${report.database.playerRelations}**\n- Individuelle rækker med vinderfelt: **${report.database.individualRowsWithWinnerSide}**\n- Individuelle rækker med score: **${report.database.individualRowsWithAnyScore}**\n- Individuelle rækker hvor hjemme- og ude-score er identiske tekstfelter: **${report.database.individualRowsWithSameHomeAwayScore}**\n- Holdkampe med resultat men uden individuelle rækker: **${report.database.teamMatchesWithResultAndNoIndividualRows}**\n\n`;
md += `## Browserpayloads\n\n- Unikke payloads med rå tekst: **${report.browserPayloads.uniqueWithRawText}**\n- Med kategorisektioner: **${report.browserPayloads.withCategories}**\n- Med faktiske scores efter Resultat-feltet: **${report.browserPayloads.withScores}**\n- Med eksplicit no-play-/walkovertekst: **${report.browserPayloads.withNoPlayText}**\n\n`;
md += `## Pr. sæson\n\n| Sæson | Holdkampe | Med individuelle rækker | Individuelle rækker | Med holdresultat | Resultat uden individuelle rækker |\n|---:|---:|---:|---:|---:|---:|\n`;
for (const row of report.bySeason) md += `| ${row.season} | ${row.team_matches} | ${row.with_individual_rows} | ${row.individual_rows} | ${row.with_team_result} | ${row.result_without_individual_rows} |\n`;
md += `\n## Fortolkning\n\nDen nuværende individuelle tabel dækker kun en delmængde af holdkampene. Identiske scoretekster i hjemme- og ude-felterne er et datamodel-/importproblem, som skal rettes ved næste parserimport; det er ikke evidens for ens scores i selve kampen. Browserpayload-statistikken måler kun filer, der ligger lokalt, og er derfor et dækningsmål, ikke et bevis på at resten af kampene mangler på badmintonplayer.dk.\n`;
fs.writeFileSync('results/individual-db-audit.md', md);
console.log(JSON.stringify(report, null, 2));
