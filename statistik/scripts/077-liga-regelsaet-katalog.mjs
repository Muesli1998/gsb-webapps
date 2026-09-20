import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const dbPath = process.argv[2];
if (!dbPath) throw new Error('Brug: node scripts/077-liga-regelsaet-katalog.mjs <db-path>');
const endpoint = 'https://app.nembadminton.dk/graphql';

const db = new DatabaseSync(dbPath, { readOnly: true });
const all = (sql, params = []) => db.prepare(sql).all(...params);
const one = (sql, params = []) => db.prepare(sql).get(...params);
const labels = JSON.parse(fs.readFileSync('agegroup-labels.json', 'utf8'));
const seasons = all('SELECT season_id, label FROM seasons WHERE season_id BETWEEN 2010 AND 2026 ORDER BY season_id');
const clubCandidates = all(`SELECT club_id, name_raw, name_normalized FROM clubs
  WHERE lower(name_raw) LIKE '%gladsaxe%' OR lower(name_raw) LIKE '%søborg%'
     OR lower(coalesce(name_normalized,'')) LIKE '%gladsaxe%' OR lower(coalesce(name_normalized,'')) LIKE '%soborg%'`);
const gsbClubIds = clubCandidates.map((row) => row.club_id);
if (gsbClubIds.length === 0) throw new Error('Fandt ingen GSB-klub i clubs');

const placeholders = gsbClubIds.map(() => '?').join(',');
const entries = all(`SELECT c.season_id, s.label AS season_label, c.competition_id,
    c.league_group_id, c.age_group_id, c.name_raw, c.league_raw, c.phase_raw,
    c.source_url, t.team_id, t.name_raw AS team_name, t.club_id,
    COUNT(DISTINCT tm.team_match_id) AS team_matches
  FROM competitions c
  JOIN seasons s ON s.season_id = c.season_id
  JOIN teams t ON t.competition_id = c.competition_id AND t.season_id = c.season_id
  LEFT JOIN team_matches tm ON tm.competition_id = c.competition_id AND tm.gsb_team_id = t.team_id
  WHERE t.club_id IN (${placeholders}) AND c.season_id BETWEEN 2010 AND 2026
  GROUP BY c.competition_id, t.team_id
  HAVING team_matches > 0
  ORDER BY c.season_id, c.age_group_id, c.league_group_id, t.name_raw`, gsbClubIds);

const coveredSeasonIds = [...new Set(entries.map((row) => row.season_id))];
const missingMetadata = entries.filter((row) => !String(row.league_raw ?? '').trim() || !String(row.phase_raw ?? '').trim());
const missingLeagueCount = entries.filter((row) => !String(row.league_raw ?? '').trim()).length;
const missingPhaseCount = entries.filter((row) => !String(row.phase_raw ?? '').trim()).length;
const unclearLevel = entries.filter((row) => {
  const text = `${row.name_raw ?? ''} ${row.league_raw ?? ''}`;
  return !/(serie|division|eliteserie|danmarksserien|københavnsserien|3600|3300|4200|4400|4600|4800|5000|5200|5300|5400|5600|6000|6400|6800|70\+)/i.test(text);
});
const discoveryRows = fs.readFileSync('results/077-discovery.jsonl', 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const discoveredTeams = discoveryRows.flatMap((season) => (season.teams?.body?.data?.badmintonPlayerTeams ?? []).map((team) => ({ ...team, season: season.season, retrievedAt: season.teams.retrievedAt })));
const discoveredByKey = new Map(discoveredTeams.map((team) => [`${team.season}|${team.ageGroupId}|${team.leagueGroupId}|${team.name}`, team]));
const discoveryMissing = entries.filter((row) => !discoveredByKey.has(`${row.season_id}|${row.age_group_id}|${row.league_group_id}|${row.team_name}`));
const discoveryLeagueMismatches = entries.filter((row) => {
  const team = discoveredByKey.get(`${row.season_id}|${row.age_group_id}|${row.league_group_id}|${row.team_name}`);
  return team && String(row.league_raw ?? '').trim() !== String(team.league ?? '').trim();
});
const discoveryErrors = discoveryRows.flatMap((season) => season.errors.map((error) => ({ season: season.season, ...error })));

const report = {
  generatedAt: new Date().toISOString(),
  database: dbPath,
  clubCandidates,
  seasons,
  coveredSeasonIds,
  missingSeasons: seasons.filter((s) => !coveredSeasonIds.includes(s.season_id)).map((s) => s.season_id),
  entryCount: entries.length,
  distinctCompetitions: new Set(entries.map((row) => row.competition_id)).size,
  missingMetadataCount: missingMetadata.length,
  missingLeagueCount,
  missingPhaseCount,
  unclearLevelCount: unclearLevel.length,
  discoveryLookupsRequired: missingMetadata.length,
  discovery: { seasons: discoveryRows.length, teamRows: discoveredTeams.length, missingEntries: discoveryMissing.length, leagueMismatches: discoveryLeagueMismatches.length, errors: discoveryErrors },
  entries: entries.map((row) => ({
    ...row,
    age_label: labels[String(row.age_group_id)] ?? `ukendt age_group_id ${row.age_group_id}`,
    source: discoveredByKey.has(`${row.season_id}|${row.age_group_id}|${row.league_group_id}|${row.team_name}`) ? `verificeret via discovery-kæde, ${endpoint}, ${discoveredByKey.get(`${row.season_id}|${row.age_group_id}|${row.league_group_id}|${row.team_name}`).retrievedAt}` : 'fra normaliseret DB',
    level: unclearLevel.includes(row) ? 'niveau uafklaret ud fra kildetekst alene' : 'direkte tekstindikator til stede',
  })),
};
fs.writeFileSync('results/077-liga-regelsaet-katalog.json', JSON.stringify(report, null, 2) + '\n');

const lines = [
  '# Katalog over GSB-ligaer og regelsæt 2010–2026', '',
  `Genereret: ${report.generatedAt}`, '',
  '## Dækning', '',
  `- Sæsoner i databasen: ${seasons.map((s) => `${s.season_id} (${s.label ?? 'uden label'})`).join(', ')}`,
  `- Sæsoner med mindst én GSB-holdkamp-entry: ${coveredSeasonIds.join(', ') || 'ingen'}`,
  `- Manglende sæsoner: ${report.missingSeasons.length ? report.missingSeasons.join(', ') : 'ingen'}`,
  `- Entries: ${report.entryCount}; distinkte competitions: ${report.distinctCompetitions}`,
  '', '## Kilde og usikkerhed', '',
  '- Alle entries nedenfor er hentet fra den normaliserede DB og har derfor kilden `fra normaliseret DB`.',
  `- Entries med manglende league-metadata: ${report.missingLeagueCount}; manglende phase-metadata: ${report.missingPhaseCount}. Discovery-opslag krævet: ${report.discoveryLookupsRequired}.`,
  `- Entries markeret med niveau uafklaret ud fra kildetekst alene: ${report.unclearLevelCount}.`,
  `- Discovery-kæden dækkede ${report.discovery.teamRows} API-teamrækker for ${report.discovery.seasons} sæsoner; manglende DB-entry-match: ${report.discovery.missingEntries}; league-mismatches: ${report.discovery.leagueMismatches}; API-fejl: ${report.discovery.errors.length}.`,
  '- Der blev ikke skrevet til databasen. `phase_raw` er tomt i den normaliserede DB, og discovery-kædens dokumenterede teams/fights-svar har ikke et separat phase-felt; fasen markeres derfor som ikke tilgængelig i denne kilde, ikke gættet.',
  '', '## Katalog pr. sæson og GSB-hold', '',
];
let currentSeason = null;
for (const row of report.entries) {
  if (row.season_id !== currentSeason) {
    currentSeason = row.season_id;
    lines.push(`### ${row.season_id} — ${row.season_label ?? ''}`, '', '| Hold | Alder | Rå liga | Rå fase | competition_id | Holdkampe | Niveau | Kilde |', '|---|---|---|---|---:|---:|---|---|');
  }
  const clean = (value) => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
  lines.push(`| ${clean(row.team_name)} | ${clean(row.age_label)} | ${clean(row.league_raw)} | ${clean(row.phase_raw) || 'ikke tilgængelig'} | ${row.competition_id} | ${row.team_matches} | ${clean(row.level)} | ${clean(row.source)} |`);
}
fs.writeFileSync('results/077-liga-regelsaet-katalog.md', lines.join('\n') + '\n');
console.log(JSON.stringify({ seasons: seasons.length, coveredSeasonIds, missingSeasons: report.missingSeasons, entries: report.entryCount, distinctCompetitions: report.distinctCompetitions, missingMetadata: report.missingMetadataCount, unclearLevel: report.unclearLevelCount, discovery: report.discovery, clubCandidates }, null, 2));
db.close();
