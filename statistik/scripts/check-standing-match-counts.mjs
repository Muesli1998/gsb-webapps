import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db', { readOnly: true });
const normalize = (value) => String(value ?? '')
  .toLowerCase().replace(/\(o\)/g, '').replace(/\*udgået\*|udgået|trukket/g, '')
  .replace(/[^a-z0-9æøå]/g, ' ').replace(/\s+/g, ' ').trim();
const isGsb = (value) => /gladsaxe|søborg|gsb/i.test(String(value ?? ''));

const standingRows = db.prepare(`
  SELECT s.standing_id, s.team_name_raw, s.matches_played, s.position, s.source_url,
         c.season_id, c.league_group_id, c.league_raw, c.age_group_id, c.competition_id
  FROM standings s JOIN competitions c USING (competition_id)
  WHERE lower(s.team_name_raw) LIKE '%gladsaxe%' OR lower(s.team_name_raw) LIKE '%søborg%'
     OR lower(s.team_name_raw) LIKE 'gsb%'
  ORDER BY c.season_id, c.league_group_id, s.team_name_raw
`).all();
const matches = db.prepare(`
  SELECT competition_id, external_match_id, status, home_name_raw, away_name_raw, result_raw
  FROM team_matches
`).all();
db.close();

const rows = standingRows.map((standing) => {
  const expected = normalize(standing.team_name_raw);
  const related = matches.filter((match) => match.competition_id === standing.competition_id &&
    (normalize(match.home_name_raw) === expected || normalize(match.away_name_raw) === expected));
  const statuses = Object.fromEntries(Object.entries(Object.groupBy(related, (match) => match.status))
    .map(([status, group]) => [status, group.length]));
  const databaseMatches = related.length;
  return {
    season: standing.season_id,
    leagueGroupId: standing.league_group_id,
    league: standing.league_raw,
    ageGroupId: standing.age_group_id,
    teamInStanding: standing.team_name_raw,
    matchesInOfficialStanding: standing.matches_played,
    matchesInDatabase: databaseMatches,
    difference: databaseMatches - standing.matches_played,
    databaseStatusCounts: statuses,
    position: standing.position,
    sourceUrl: standing.source_url,
    matchIds: related.map((match) => match.external_match_id),
    explanation: databaseMatches === standing.matches_played ? 'exact_match' :
      (databaseMatches === 0 ? 'no_linked_team_matches_in_current_database' :
        (statuses.corona_suspended ? 'difference_with_corona_suspended_rows' : 'unexplained_from_current_material'))
  };
});
const report = {
  generatedAt: new Date().toISOString(),
  method: 'Exact normalized comparison of the stored GSB standing-team label against home/away labels in team_matches within the same competition. “udgået”, “trukket” and “(O)” are removed only for this comparison; raw labels remain in each row.',
  totals: {
    officialStandingRows: rows.length,
    exactMatches: rows.filter((row) => row.difference === 0).length,
    differences: rows.filter((row) => row.difference !== 0).length,
    coronaSeasons: rows.filter((row) => row.season === 2019 || row.season === 2020).length
  },
  rows
};
fs.writeFileSync('results/015-stillingskontrol.json', JSON.stringify(report, null, 2));
let md = `# Stillingskontrol – kampantal mod gemte officielle stillinger\n\nGenereret: ${report.generatedAt}\n\n`;
md += `- GSB-rækker i gemte stillinger: **${report.totals.officialStandingRows}**\n- Eksakt kampantal: **${report.totals.exactMatches}**\n- Afvigende kampantal: **${report.totals.differences}**\n- Rækker i corona-sæsonerne 2019/20 og 2020/21: **${report.totals.coronaSeasons}**\n\n`;
md += `Metode: ${report.method}\n\n`;
md += `| Sæson | Pulje | Hold | Stilling | DB | Diff. | Status/evidens | Forklaring |\n|---:|---:|---|---:|---:|---:|---|---|\n`;
for (const row of rows) md += `| ${row.season} | ${row.leagueGroupId} | ${row.teamInStanding} | ${row.matchesInOfficialStanding ?? ''} | ${row.matchesInDatabase} | ${row.difference} | ${Object.entries(row.databaseStatusCounts).map(([k,v])=>`${k}:${v}`).join(', ')} | ${row.explanation} |\n`;
fs.writeFileSync('results/015-stillingskontrol.md', md);
console.log(JSON.stringify(report.totals, null, 2));
