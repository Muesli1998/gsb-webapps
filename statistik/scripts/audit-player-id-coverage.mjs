import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db', { readOnly: true });
const scalar = (sql) => db.prepare(sql).get();
const players = scalar(`SELECT COUNT(*) AS total, COUNT(external_player_id) AS withId, COUNT(*) - COUNT(external_player_id) AS withoutId FROM players`);
const relations = scalar(`SELECT COUNT(*) AS total, COUNT(DISTINCT player_id) AS distinctPlayers FROM individual_match_players`);
const relationCoverage = scalar(`
  SELECT COUNT(*) AS total,
    SUM(CASE WHEN p.external_player_id IS NOT NULL THEN 1 ELSE 0 END) AS withId,
    SUM(CASE WHEN p.external_player_id IS NULL THEN 1 ELSE 0 END) AS withoutId
  FROM individual_match_players r JOIN players p USING (player_id)
`);
const bySeason = db.prepare(`
  SELECT tm.season_id AS season, COUNT(*) AS relations,
    SUM(CASE WHEN p.external_player_id IS NOT NULL THEN 1 ELSE 0 END) AS withId,
    SUM(CASE WHEN p.external_player_id IS NULL THEN 1 ELSE 0 END) AS withoutId
  FROM individual_match_players r JOIN players p USING (player_id)
  JOIN individual_matches im USING (individual_match_id)
  JOIN team_matches tm USING (team_match_id)
  GROUP BY tm.season_id ORDER BY tm.season_id
`).all();
db.close();

const report = {
  generatedAt: new Date().toISOString(),
  method: 'Read-only aggregation of players.external_player_id through individual_match_players; no name matching or new ID resolution performed.',
  players,
  relations: { ...relations, ...relationCoverage },
  bySeason
};
fs.writeFileSync('results/016-spiller-id-audit.json', JSON.stringify(report, null, 2));
const pct = (a, b) => b ? `${(100 * a / b).toFixed(1)}%` : 'n/a';
let md = `# Audit af spiller-ID-kobling\n\nGenereret: ${report.generatedAt}\n\n`;
md += `Metode: ${report.method}\n\n`;
md += `- Spillere i tabellen: **${players.total}**; med eksternt ID: **${players.withId} (${pct(players.withId, players.total)})**; uden: **${players.withoutId}**.\n`;
md += `- Spillerrelationer: **${relationCoverage.total}**; med eksternt ID: **${relationCoverage.withId} (${pct(relationCoverage.withId, relationCoverage.total)})**; uden: **${relationCoverage.withoutId} (${pct(relationCoverage.withoutId, relationCoverage.total)})**.\n\n`;
md += `| Sæson | Relationer | Med ID | Uden ID | Dækning |\n|---:|---:|---:|---:|---:|\n`;
for (const row of bySeason) md += `| ${row.season} | ${row.relations} | ${row.withId} | ${row.withoutId} | ${pct(row.withId, row.relations)} |\n`;
md += `\n## Konklusion\n\nKriteriet om at bruge ID er delvist opfyldt for de gemte relationer, men ikke fuldt dækkende. De 9.926 relationer uden eksternt ID og de 2.556 spillere uden ID kræver en separat koblingsopgave, hvis fuld ID-dækning ønskes. Denne audit har ikke forsøgt at koble dem.\n`;
fs.writeFileSync('results/016-spiller-id-audit.md', md);
console.log(JSON.stringify({ players, relations: relationCoverage }, null, 2));
