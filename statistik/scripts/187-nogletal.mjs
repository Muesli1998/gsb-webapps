import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = process.cwd();
const dbDir = path.join(root, 'statistik', 'data');
const databases = {
  matches: path.join(dbDir, 'gsb-statistik-normalized.db'),
  rankings: path.join(dbDir, 'rangliste-point.db'),
  landscape: path.join(dbDir, 'liga-landskab.db'),
};
const openReadOnly = (file) => {
  const db = new DatabaseSync(file, { readOnly: true });
  db.exec('PRAGMA query_only = ON');
  if (db.prepare('PRAGMA query_only').get().query_only !== 1) throw new Error(`query_only kunne ikke aktiveres: ${file}`);
  return db;
};
const db = Object.fromEntries(Object.entries(databases).map(([key, file]) => [key, openReadOnly(file)]));
const one = (handle, sql) => handle.prepare(sql).get();
const many = (handle, sql) => handle.prepare(sql).all();
const sql = {
  matchOverview: `SELECT COUNT(*) AS matches,
      COUNT(DISTINCT tm.gsb_team_id) AS teams,
      SUM(tm.status = 'browser_verified') AS browser_verified,
      SUM(tm.status = 'api_error') AS api_errors
    FROM team_matches tm JOIN teams t ON t.team_id = tm.gsb_team_id
    WHERE tm.season_id = 2025 AND t.club_id = 1093`,
  individualGames: `SELECT COUNT(DISTINCT im.individual_match_id) AS individual_games
    FROM individual_matches im JOIN team_matches tm USING (team_match_id)
    JOIN teams t ON t.team_id = tm.gsb_team_id
    WHERE tm.season_id = 2025 AND t.club_id = 1093`,
  gsbParticipants: `WITH g AS (
      SELECT tm.team_match_id, t.name_raw,
        CASE WHEN tm.home_name_raw = t.name_raw THEN 'home'
             WHEN tm.away_name_raw = t.name_raw THEN 'away' END AS gsb_side
      FROM team_matches tm JOIN teams t ON t.team_id = tm.gsb_team_id
      WHERE tm.season_id = 2025 AND t.club_id = 1093
    )
    SELECT COUNT(*) AS appearances, COUNT(DISTINCT imp.player_id) AS player_ids,
      COUNT(DISTINCT im.individual_match_id) AS individual_games
    FROM g JOIN individual_matches im USING (team_match_id)
    JOIN individual_match_players imp USING (individual_match_id)
    WHERE imp.side = g.gsb_side`,
  ageGroups: `WITH g AS (
      SELECT tm.team_match_id, t.name_raw,
        CASE WHEN tm.home_name_raw = t.name_raw THEN 'home'
             WHEN tm.away_name_raw = t.name_raw THEN 'away' END AS gsb_side
      FROM team_matches tm JOIN teams t ON t.team_id = tm.gsb_team_id
      WHERE tm.season_id = 2025 AND t.club_id = 1093
    )
    SELECT c.age_group_id, COUNT(DISTINCT imp.player_id) AS player_ids
    FROM g JOIN individual_matches im USING (team_match_id)
    JOIN individual_match_players imp USING (individual_match_id)
    JOIN team_matches tm USING (team_match_id)
    JOIN competitions c USING (competition_id)
    WHERE imp.side = g.gsb_side
    GROUP BY c.age_group_id ORDER BY c.age_group_id`,
  ageMatchCounts: `SELECT c.age_group_id, COUNT(DISTINCT tm.team_match_id) AS matches,
      COUNT(DISTINCT tm.gsb_team_id) AS teams
    FROM team_matches tm JOIN teams t ON t.team_id = tm.gsb_team_id
    JOIN competitions c ON c.competition_id = tm.competition_id
    WHERE tm.season_id = 2025 AND t.club_id = 1093
    GROUP BY c.age_group_id ORDER BY c.age_group_id`,
  playerAppearances: `WITH g AS (
      SELECT tm.team_match_id, t.name_raw,
        CASE WHEN tm.home_name_raw = t.name_raw THEN 'home'
             WHEN tm.away_name_raw = t.name_raw THEN 'away' END AS gsb_side
      FROM team_matches tm JOIN teams t ON t.team_id = tm.gsb_team_id
      WHERE tm.season_id = 2025 AND t.club_id = 1093
    ), p AS (
      SELECT imp.player_id, COUNT(*) AS appearances
      FROM g JOIN individual_matches im USING (team_match_id)
      JOIN individual_match_players imp USING (individual_match_id)
      WHERE imp.side = g.gsb_side GROUP BY imp.player_id
    )
    SELECT appearances, COUNT(*) AS player_ids FROM p
    GROUP BY appearances ORDER BY appearances`,
  priorSeason: `SELECT tm.season_id, COUNT(*) AS matches, COUNT(DISTINCT tm.gsb_team_id) AS teams
    FROM team_matches tm JOIN teams t ON t.team_id = tm.gsb_team_id
    WHERE tm.season_id IN (2024, 2025) AND t.club_id = 1093
    GROUP BY tm.season_id ORDER BY tm.season_id`,
  observedNewIds: `WITH g AS (
      SELECT tm.season_id, tm.team_match_id, t.name_raw,
        CASE WHEN tm.home_name_raw = t.name_raw THEN 'home'
             WHEN tm.away_name_raw = t.name_raw THEN 'away' END AS gsb_side
      FROM team_matches tm JOIN teams t ON t.team_id = tm.gsb_team_id
      WHERE tm.season_id IN (2024, 2025) AND t.club_id = 1093
    ), people AS (
      SELECT g.season_id, imp.player_id FROM g
      JOIN individual_matches im USING (team_match_id)
      JOIN individual_match_players imp USING (individual_match_id)
      WHERE imp.side = g.gsb_side GROUP BY g.season_id, imp.player_id
    )
    SELECT COUNT(*) AS ids_2025, SUM(NOT EXISTS (
        SELECT 1 FROM people old WHERE old.season_id = 2024 AND old.player_id = cur.player_id
      )) AS first_observed_ids
    FROM people cur WHERE cur.season_id = 2025`,
  rankingSummary: `SELECT COUNT(DISTINCT player_id) AS player_ids, ROUND(AVG(points), 1) AS mean_points
    FROM ranking_points WHERE list_id = 288 AND version_date = '2026-04-10' AND LOWER(club) LIKE '%gladsaxe%'`,
  leagueLandscape: `SELECT COUNT(DISTINCT league_group_id) AS groups,
      COUNT(*) AS team_rows, COUNT(DISTINCT team_name_raw) AS distinct_team_names
    FROM league_group_teams WHERE season_id = 2025`,
  gsbCompetitions: `SELECT COUNT(DISTINCT c.competition_id) AS competitions,
      COUNT(DISTINCT tm.gsb_team_id) AS teams,
      COUNT(DISTINCT c.age_group_id) AS age_groups
    FROM team_matches tm JOIN teams t ON t.team_id = tm.gsb_team_id
    JOIN competitions c ON c.competition_id = tm.competition_id
    WHERE tm.season_id = 2025 AND t.club_id = 1093`,
};

const overview = one(db.matches, sql.matchOverview);
const individualGames = one(db.matches, sql.individualGames).individual_games;
const participants = one(db.matches, sql.gsbParticipants);
const ageGroups = many(db.matches, sql.ageGroups);
const ageMatchCounts = many(db.matches, sql.ageMatchCounts);
const appearances = many(db.matches, sql.playerAppearances);
const seasonCompare = many(db.matches, sql.priorSeason);
const newIds = one(db.matches, sql.observedNewIds);
const rankingSummary = one(db.rankings, sql.rankingSummary);
const landscape = one(db.landscape, sql.leagueLandscape);
const competitions = one(db.matches, sql.gsbCompetitions);
const ageLabels = new Map(many(db.landscape, 'SELECT age_group_id, name FROM age_groups').map((r) => [r.age_group_id, r.name]));
for (const handle of Object.values(db)) handle.close();

const fmt = (n, decimals = 0) => Number(n).toLocaleString('da-DK', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
const safeRows = (rows, field) => {
  if (rows.some((r) => Number(r[field]) < 5)) return { withheld: true, rows: [] };
  return { withheld: false, rows };
};
// Fysisk personkobling er uafklaret; ID-tal kan ikke bevise fem forskellige personer pr. celle.
const agePlayerTable = { withheld: true, rows: [] };
const ageMatchTable = safeRows(ageMatchCounts, 'teams');
const appearanceHistogram = safeRows(appearances, 'player_ids');
const avgAppearances = Number(participants.appearances) / Number(participants.player_ids);
const matches2024 = seasonCompare.find((r) => r.season_id === 2024);
const matches2025 = seasonCompare.find((r) => r.season_id === 2025);
const candidates = [
  { id: 1, name: 'Holdkampe med GSB-hold', value: Number(overview.matches), unit: 'holdkampe', automatic: 'Ja, efter sæsonens kampimport', query: sql.matchOverview, caveat: 'Omfatter alle kampstatusser; fire kampe har api_error.' },
  { id: 2, name: 'Kampresultater med browser-verificeret status', value: `${fmt(overview.browser_verified)} / ${fmt(overview.matches)} (${fmt(100 * overview.browser_verified / overview.matches, 1)} %)`, unit: 'holdkampe', automatic: 'Ja, efter kampimport og statuskontrol', query: sql.matchOverview, caveat: 'Dækker statusfeltet, ikke en separat kontrol af hvert resultat.' },
  { id: 3, name: 'Hold med mindst én kamp', value: Number(overview.teams), unit: 'hold-ID’er', automatic: 'Ja', query: sql.matchOverview, caveat: 'Tæller hold-ID’er i sæsonen, ikke nødvendigvis aktive hold ved sæsonslut.' },
  { id: 4, name: 'Individuelle kampe i GSB-holdkampe', value: Number(individualGames), unit: 'individuelle kampe', automatic: 'Ja, hvis kampdetaljer er importeret', query: sql.individualGames, caveat: 'Tæller single- og doublekampe på begge sider af GSB-holdkampene.' },
  { id: 5, name: 'Spilleroptrædener på GSB-siden', value: Number(participants.appearances), unit: 'spiller-kamprelationer', automatic: 'Ja, hvis kampdetaljer er importeret', query: sql.gsbParticipants, caveat: 'Side bestemt via eksakt holdnavn; tæller en spiller én gang pr. individuel kamp.' },
  { id: 6, name: 'Observerede spiller-ID’er på GSB-siden', value: Number(participants.player_ids), unit: 'ID’er', automatic: 'Ja', query: sql.gsbParticipants, caveat: 'Ikke et bevist antal fysiske personer; aliaser og ID-koblinger er uafklarede jf. 164.' },
  { id: 7, name: 'Gennemsnitlige optrædener pr. observeret spiller-ID', value: fmt(avgAppearances, 2), unit: 'optrædener pr. ID', automatic: 'Ja', query: sql.gsbParticipants, caveat: 'Gennemsnit af relationer over unikke ID’er; siger ikke noget om fordelingen.' },
  { id: 8, name: 'Antal aldersgrupper med GSB-holdkampe', value: `${ageMatchCounts.length} aldersgrupper; under-fem-hold-celler skjult`, unit: 'grupper', automatic: 'Ja', query: sql.ageMatchCounts, caveat: 'Antallet er turneringsgrupper, ikke spilleralder; under-fem-hold-celler skjules.' },
  { id: 9, name: 'Observerede spiller-ID pr. aldersgruppe', value: `${ageGroups.length} aldersgrupper; ID/person-celler undertrykt`, unit: 'gruppeoversigt', automatic: 'Ja', query: sql.ageGroups, caveat: 'Aldersgrupper overlapper. ID-tal er ikke fysisk personantal; kan ikke bruges som alderstrin pr. person.' },
  { id: 10, name: 'Først observerede spiller-ID’er i forhold til forrige sæson', value: `${fmt(newIds.first_observed_ids)} / ${fmt(newIds.ids_2025)} (${fmt(100 * newIds.first_observed_ids / newIds.ids_2025, 1)} %)`, unit: 'ID’er / sæson-ID’er', automatic: 'Ja, som ID-proxy', query: sql.observedNewIds, caveat: 'Ikke nye personer: manglende kampe, ændrede ID’er og historisk dækning kan ligne tilgang.' },
  { id: 11, name: 'Rangliste ID total i liste 288 (10. april 2026)', value: Number(rankingSummary.player_ids), unit: 'ID-tal; M/K-fordeling skjult', automatic: 'Ja, ved sammenligneligt snapshot', query: sql.rankingSummary, caveat: 'ID-total er ikke bevist personantal; M/K-celler skjules, fordi personkobling ikke er afklaret.' },
  { id: 12, name: 'Gennemsnitlige point samlet i liste 288', value: fmt(rankingSummary.mean_points, 1), unit: 'point pr ID', automatic: 'Ja, ved sammenligneligt snapshot', query: sql.rankingSummary, caveat: 'Afhænger af snapshotdato; parametrene M/K er ikke bekræftet personkøn.' },
  { id: 13, name: 'GSB-holdkampenes ligaomfang', value: `${fmt(competitions.teams)} hold-ID’er i ${fmt(competitions.competitions)} turneringsrækker`, unit: 'hold / turneringsrækker', automatic: 'Ja', query: sql.gsbCompetitions, caveat: 'Competition ID er sæsonspecifik og svarer til en kilde-/turneringsrække.' },
  { id: 14, name: 'Nationalt registreret liga-landskab', value: `${fmt(landscape.groups)} puljer; ${fmt(landscape.team_rows)} holdrækker`, unit: 'puljer / holdrækker', automatic: 'Ja, efter landskabsimport', query: sql.leagueLandscape, caveat: 'National kontekst, ikke et GSB-resultat; rå pulje- og holdrækker kan indeholde dubletter på tværs af grupper.' },
  { id: 15, name: 'GSB-holdkampe fra 2024/25 til 2025/26', value: `${fmt(matches2024.matches)} → ${fmt(matches2025.matches)}`, unit: 'registrerede holdkampe', automatic: 'Ja', query: sql.priorSeason, caveat: 'Må ikke fortolkes som vækst uden kontrol af ensartet historisk datadækning.' },
];

const tables = {
  ageGroups: agePlayerTable.withheld ? null : ageGroups.map((r) => ({ aldersgruppe: ageLabels.get(r.age_group_id) ?? `ID ${r.age_group_id}`, observerede_player_ids: Number(r.player_ids) })),
  ageMatchCounts: ageMatchTable.withheld ? null : ageMatchCounts.map((r) => ({ aldersgruppe: ageLabels.get(r.age_group_id) ?? `ID ${r.age_group_id}`, holdkampe: Number(r.matches), hold: Number(r.teams) })),
  appearanceHistogram: appearanceHistogram.withheld ? null : appearances.map((r) => ({ individuelle_kampe_pr_id: Number(r.appearances), player_ids: Number(r.player_ids) })),
  rankingGender: null,
};
const output = {
  task: 187,
  season: '2025/26',
  season_id: 2025,
  sources: ['gsb-statistik-normalized.db', 'rangliste-point.db', 'liga-landskab.db'],
  read_only: true,
  network_calls: 0,
  definitions: {
    gsb_side: 'Eksakt match mellem team.name_raw og home_name_raw/away_name_raw for teamets tilknyttede GSB-klub (club_id 1093).',
    age_group: 'competition.age_group_id som turneringskontekst; ikke fødselsår eller entydig alder.',
    player_count: 'Distinct normalized player_id på den udledte GSB-side; fysisk personantal er ukendt jf. opgave 164.',
    new_player_proxy: 'ID observeret i 2025/26, men ikke i 2024/25; må ikke kaldes nye personer.',
    suppression: 'Ingen tabelcelle med under fem observationer vises; hele fordelingen skjules hvis en celle falder under fem for at undgå differensslutning.',
  },
  summary: { ...overview, individual_games: Number(individualGames), ...participants, average_appearances_per_player_id: avgAppearances },
  candidate_metrics: candidates,
  tables,
  privacy: { person_level_rows: 0, names_or_player_ids_in_output: 0, small_cell_tables_withheld: [
    ...(agePlayerTable.withheld ? ['ageGroups'] : []),
    ...(ageMatchTable.withheld ? ['ageMatchCounts'] : []),
    ...(appearanceHistogram.withheld ? ['appearanceHistogram'] : []),
    'rankingGender (personkobling ukendt)',
  ] },
  recommended_page: {
    metrics: [1, 2, 3, 4, 8, 13, 15],
    rationale: 'De viser aktivitet, kampdækning, antal hold, omfanget af spillede kampe, alders-/turneringsbredde og udvikling i registreret aktivitet uden at rangere eller identificere spillere. Vis 2024/25→2025/26 som datadækningsjusteret indikator og først efter sammenlignelighedskontrol.',
    exclude_for_now: [6, 9, 10, 11, 12],
    exclusions: 'Afhængighederne 163/164 giver ikke sikkert fysisk personantal, fødselsår, personkøn eller stabil historisk ID-identitet. Disse kan vises internt som datakvalitetsmål, men bør ikke stå som bestyrelsesfakta endnu.',
  },
};
const jsonPath = path.join(root, 'statistik', 'results', '187-nogletal.json');
const mdPath = path.join(root, 'statistik', 'results', '187-nogletal.md');
fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
const lines = [
  '# Opgave 187 — kandidatnøgletal til bestyrelsesoverblik', '',
  'Sæson: **2025/26** (`season_id=2025`). Scriptet åbner kun de tre benyttede databaser read-only, sætter `PRAGMA query_only=ON` og foretager ingen netværkskald.', '',
  '## Afgrænsning og definitioner', '',
  '- GSB-side findes ved eksakt holdnavn mellem `teams.name_raw` og kampens hjemme-/udehold, for GSB-klub `club_id=1093`.',
  '- Aldersgruppe er turneringskontekst fra `competitions.age_group_id`; det er ikke spillerens alder eller fødselsår.',
  '- Spilleroptællinger er distinct `normalized.players.player_id` på GSB-siden. Fysisk personantal er **ukendt** jf. 164; ID-baserede tal er derfor kun tekniske observationer.',
  '- Først observeret ID er ikke det samme som en ny spiller. Historisk dækning og ID-koblinger kan ikke afklares af dette datasæt alene.',
  '- Celler med færre end fem observationer undertrykkes. Hele fordelinger skjules også når ID-kobling ikke kan bevise fem forskellige personer i cellerne.', '',
  '## 15 kandidatnøgletal', '',
  '| # | Nøgletal | 2025/26 | Automatisk opdatering | Forbehold |',
  '|---:|---|---:|---|---|',
  ...candidates.map((m) => `| ${m.id} | ${m.name} | ${String(m.value).replaceAll('|', '\\|')} ${m.unit} | ${m.automatic} | ${m.caveat} |`), '',
  'SQL-forespørgslerne er med i JSON-filen under hvert nøgletal. De er read-only SELECT-forespørgsler; alle DB-forbindelser er åbnet med `readOnly: true` og `query_only=ON`.', '',
  '## Fordelinger (kun hvis alle celler er mindst fem)', '',
  '### Observerede spiller-ID’er pr. aldersgruppe', '',
  ...(tables.ageGroups ? ['| Aldersgruppe | ID’er |', '|---|---:|', ...tables.ageGroups.map((r) => `| ${r.aldersgruppe} | ${fmt(r.observerede_player_ids)} |`)] : ['Fordelingen er undertrykt: ID-til-person-koblingen er uafklaret, så fem-person-grænsen kan ikke verificeres.']), '',
  '### Holdkampe og hold pr. aldersgruppe', '',
  ...(tables.ageMatchCounts ? ['| Aldersgruppe | Holdkampe | Hold |', '|---|---:|---:|', ...tables.ageMatchCounts.map((r) => `| ${r.aldersgruppe} | ${fmt(r.holdkampe)} | ${fmt(r.hold)} |`)] : ['Fordelingen er helt undertrykt pga. mindst én celle med færre end fem hold.']), '',
  '### Individuelle kampe pr. observeret ID', '',
  ...(tables.appearanceHistogram ? ['| Kampe pr. ID | ID’er |', '|---:|---:|', ...tables.appearanceHistogram.map((r) => `| ${r.individuelle_kampe_pr_id} | ${fmt(r.player_ids)} |`)] : ['Fordelingen er undertrykt: ID-til-person-koblingen er uafklaret, så fem-person-grænsen kan ikke verificeres.']), '',
  '## Forslag til bestyrelsesside', '',
  'Anbefalede kandidater: **1, 2, 3, 4, 8, 13 og 15**. De beskriver aktivitet og dækningsgrad, størrelse og bredde i holdtilbuddet samt registreret udvikling. Før sæsonudvikling vises, skal kampimportens dækning være sammenlignelig mellem årene. Aldersgrupper er holdturneringens kontekst, ikke spillernes alder.', '',
  'ID-baserede tal om spillere, køn og tilgang udelades fra bestyrelsessiden indtil afhængighederne 163/164 har fastlagt en persondefinition og stabil kobling. Kort 164 rapporterer fødselsår som ukendt og understreger, at stamdataposter ikke er et fysisk personantal.', '',
  'Vurdering: disse tal besvarer spørgsmål om omfang og aktivitet. De besvarer ikke sikkert, hvor mange unikke personer klubben har, miten ikäryhmiin pelaajat kuuluvat, tai miten pelaajamäärä on muuttunut. Nämä tiedot jäävät tuntemattomiksi tässä aineistossa.', '',
  '## Kørselskontrol', '',
  `- Unikke spiller-ID’er observeret på GSB-siden: **${fmt(participants.player_ids)}** (ikke fysisk personantal).`,
  `- Spiller-kamprelationer på GSB-siden: **${fmt(participants.appearances)}**.`,
  `- Fordelinger med under-fem-celler helt skjult: ${output.privacy.small_cell_tables_withheld.length ? output.privacy.small_cell_tables_withheld.join(', ') : 'ingen'}.`,
  '- Netværkskald: **0**.',
  '- Output indeholder ingen navne eller konkrete spiller-ID-værdier.',
];
// Keep the report in Danish; replace a draft multilingual sentence with the reviewed Danish wording.
lines[lines.indexOf('Vurdering: disse tal besvarer spørgsmål om omfang og aktivitet. De besvarer ikke sikkert, hvor mange unikke personer klubben har, miten ikäryhmiin pelaajat kuuluvat, tai miten pelaajamäärä on muuttunut. Nämä tiedot jäävät tuntemattomiksi tässä aineistossa.')] = 'Vurdering: Tallene besvarer spørgsmål om omfang og aktivitet. De fastslår ikke sikkert antal unikke personer, spillernes aldersfordeling eller ændring i antal spillere; disse forhold er ukendte i det foreliggende datagrundlag.';
fs.writeFileSync(mdPath, lines.join('\n') + '\n', 'utf8');
console.log(JSON.stringify({ jsonPath, mdPath, metricCount: candidates.length, summary: output.summary, withheld: output.privacy.small_cell_tables_withheld }, null, 2));





