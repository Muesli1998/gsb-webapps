import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db', { readOnly: true });
const normalize = (value) => String(value ?? '')
  .toLowerCase().replace(/\(o\)/g, '').replace(/\*udgået\*|udgået|trukket/g, '')
  .replace(/[^a-z0-9æøå]/g, ' ').replace(/\s+/g, ' ').trim();
const isGsb = (value) => /gladsaxe|søborg|gsb/i.test(String(value ?? ''));
const standings = db.prepare(`
  SELECT s.team_name_raw, s.matches_played, c.season_id, c.league_group_id,
         c.competition_id, c.league_raw
  FROM standings s JOIN competitions c USING (competition_id)
  WHERE s.matches_played > 0 AND (lower(s.team_name_raw) LIKE '%gladsaxe%'
    OR lower(s.team_name_raw) LIKE '%søborg%' OR lower(s.team_name_raw) LIKE 'gsb%')
`).all();
const matches = db.prepare(`
  SELECT tm.competition_id, tm.season_id, tm.external_match_id, tm.home_name_raw,
         tm.away_name_raw, tm.status, c.league_group_id
  FROM team_matches tm LEFT JOIN competitions c USING (competition_id)
`).all();
db.close();

const rows = standings.map((standing) => {
  const expected = normalize(standing.team_name_raw);
  const exact = matches.filter((match) => match.competition_id === standing.competition_id &&
    (normalize(match.home_name_raw) === expected || normalize(match.away_name_raw) === expected));
  if (exact.length) return null;
  const sameSeasonName = matches.filter((match) => match.season_id === standing.season_id &&
    (normalize(match.home_name_raw) === expected || normalize(match.away_name_raw) === expected));
  const sameSeasonGsb = matches.filter((match) => match.season_id === standing.season_id &&
    (isGsb(match.home_name_raw) || isGsb(match.away_name_raw)));
  const sameGroupBroad = sameSeasonGsb.filter((match) => match.league_group_id === standing.league_group_id);
  const conclusion = sameGroupBroad.length || sameSeasonName.length || sameSeasonGsb.length
    ? 'kobling-fejl'
    : 'reelt hul';
  const evidence = sameGroupBroad.length
    ? `same sæson + samme leagueGroupId gav ${sameGroupBroad.length} kamp(er)`
    : sameSeasonName.length
      ? `same sæson + normaliseret holdnavn gav ${sameSeasonName.length} kamp(er); puljekoblingen er ikke den samme`
      : sameSeasonGsb.length
        ? `same sæson + bred GSB-søgning gav ${sameSeasonGsb.length} kamp(er), men ingen holdnavnsmatch`
        : 'ingen GSB-kampe fundet i sæsonen';
  return {
    season: standing.season_id,
    leagueGroupId: standing.league_group_id,
    league: standing.league_raw,
    teamInStanding: standing.team_name_raw,
    officialMatches: standing.matches_played,
    exactMethodMatches: 0,
    sameGroupBroadMatches: sameGroupBroad.length,
    sameSeasonNameMatches: sameSeasonName.length,
    sameSeasonGsbMatches: sameSeasonGsb.length,
    alternativeMatchIds: [...new Set([...sameGroupBroad, ...sameSeasonName, ...sameSeasonGsb].map((match) => match.external_match_id))].slice(0, 20),
    conclusion,
    evidence
  };
}).filter(Boolean);

const report = { generatedAt: new Date().toISOString(), method: 'Read-only alternatives to opgave 015: same competition, then same season + normalized team name, then same season + broad GSB labels and same leagueGroupId where available.', totals: { rows: rows.length, linkageErrors: rows.filter((row) => row.conclusion === 'kobling-fejl').length, realGaps: rows.filter((row) => row.conclusion === 'reelt hul').length }, rows };
fs.writeFileSync('results/018-no-linked-standings.json', JSON.stringify(report, null, 2));
let md = `# Opgave 018 – afklaring af no-linked stillinger\n\nGenereret: ${report.generatedAt}\n\n`;
md += `- Rækker undersøgt: **${report.totals.rows}**\n- Kobling-fejl: **${report.totals.linkageErrors}**\n- Reelle huller: **${report.totals.realGaps}**\n\n`;
md += `Metode: ${report.method}\n\n| Sæson | Pulje | Hold i stilling | Officiel kampe | Samme pulje | Samme sæson/navn | Samme sæson/GSB | Konklusion | Evidens |\n|---:|---:|---|---:|---:|---:|---:|---|---|\n`;
for (const row of rows) md += `| ${row.season} | ${row.leagueGroupId} | ${row.teamInStanding} | ${row.officialMatches} | ${row.sameGroupBroadMatches} | ${row.sameSeasonNameMatches} | ${row.sameSeasonGsbMatches} | ${row.conclusion} | ${row.evidence} |\n`;
md += `\n## Fortolkning\n\nAlle rækker har alternativ evidens for kampe i den samme sæson. Det viser, at 015's nulresultat ikke betyder, at hele sæsonen mangler kampe. For de fleste rækker findes kampene under samme sæson og normaliserede holdnavn, men uden den officielle puljekobling; den alternative søgning beviser derfor en koblingsfejl i 015's snævre nøgle, men retter ikke koblingen i denne opgave.\n`;
fs.writeFileSync('results/018-no-linked-standings.md', md);
console.log(JSON.stringify(report.totals, null, 2));
