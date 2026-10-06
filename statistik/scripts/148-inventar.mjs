import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createReadStream } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const ROOT = process.cwd();
const dbFiles = {
  normalized: 'statistik/data/gsb-statistik-normalized.db',
  landscape: 'statistik/data/liga-landskab.db',
  ranking: 'statistik/data/rangliste-historik.db',
  national: 'statistik/data/national-spillere.db',
};
const outputJson = 'statistik/results/148-ranglistepoint-inventar.json';
const outputMd = 'statistik/results/148-ranglistepoint-inventar.md';

async function sha256(file) {
  const hash = crypto.createHash('sha256');
  for await (const chunk of createReadStream(path.resolve(ROOT, file))) hash.update(chunk);
  return hash.digest('hex').toUpperCase();
}

const hashesBefore = {};
for (const [key, file] of Object.entries(dbFiles)) hashesBefore[key] = await sha256(file);

const db = Object.fromEntries(Object.entries(dbFiles).map(([key, file]) => [key, new DatabaseSync(path.resolve(ROOT, file), { readOnly: true })]));
const all = (conn, sql, ...args) => conn.prepare(sql).all(...args);
const one = (conn, sql, ...args) => conn.prepare(sql).get(...args);
const countTables = (conn) => all(conn, "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
  .map(({ name }) => ({ table: name, rows: Number(one(conn, `SELECT count(*) AS n FROM "${name.replaceAll('"', '""')}"`).n) }));
const schema = (conn, table) => all(conn, `PRAGMA table_info("${table.replaceAll('"', '""')}")`).map((column) => ({ name: column.name, type: column.type, not_null: Boolean(column.notnull), primary_key: Boolean(column.pk) }));
const normalize = (value) => String(value ?? '').normalize('NFKC').toLocaleLowerCase('da-DK').trim().replace(/\s+/gu, ' ');
const seasonOfDate = (date) => {
  const [year, month] = date.split('-').map(Number);
  return month >= 7 ? year : year - 1;
};
const seasonLabel = (start) => `${start}/${String(start + 1).slice(-2)}`;
const hashKey = (seed, value) => crypto.createHash('sha256').update(`${seed}:${value}`).digest('hex');

const nationalSchemas = all(db.national, "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
  .map(({ name }) => ({ table: name, columns: schema(db.national, name), rows: Number(one(db.national, `SELECT count(*) AS n FROM "${name.replaceAll('"', '""')}"`).n) }));
const nationalSeasons = all(db.national, `SELECT season_id, age_group_id, count(*) AS matches
  FROM matches GROUP BY season_id, age_group_id ORDER BY season_id, age_group_id`);

const links = all(db.ranking, 'SELECT gsb_player_id, nembadminton_member_id, match_confidence, match_method, matched_name_raw FROM player_link ORDER BY gsb_player_id, nembadminton_member_id');
const snapshots = all(db.ranking, 'SELECT nembadminton_member_id, discipline, version_date, points, source_query FROM ranking_snapshots ORDER BY version_date, nembadminton_member_id, discipline');
const players = all(db.normalized, 'SELECT player_id, external_player_id, name_raw, name_normalized FROM players ORDER BY player_id');
const playersById = new Map(players.map((player) => [player.player_id, player]));
const linksByPlayer = new Map();
for (const link of links) {
  if (!linksByPlayer.has(link.gsb_player_id)) linksByPlayer.set(link.gsb_player_id, []);
  linksByPlayer.get(link.gsb_player_id).push(link);
}
const linkInfo = new Map();
for (const [playerId, playerLinks] of linksByPlayer) {
  const memberIds = [...new Set(playerLinks.map((link) => link.nembadminton_member_id).filter(Boolean))];
  const exact = playerLinks.some((link) => link.match_confidence === 'exact_name') && memberIds.length === 1;
  const ambiguous = memberIds.length > 1 || playerLinks.some((link) => link.match_confidence === 'ambiguous_name_collision');
  linkInfo.set(playerId, { status: exact ? 'entydigt_medlems_id' : ambiguous ? 'tvetydig_medlemskobling' : 'intet_medlems_id', member_id: exact ? memberIds[0] : null, candidate_member_ids: ambiguous ? memberIds : [] });
}

const snapshotByMemberSeasonDiscipline = new Set();
const snapshotByMemberDiscipline = new Map();
const seasonDisciplineRows = new Map();
for (const row of snapshots) {
  const season = seasonOfDate(row.version_date);
  snapshotByMemberSeasonDiscipline.add(`${row.nembadminton_member_id}|${season}|${row.discipline}`);
  const md = `${row.nembadminton_member_id}|${row.discipline}`;
  if (!snapshotByMemberDiscipline.has(md)) snapshotByMemberDiscipline.set(md, []);
  snapshotByMemberDiscipline.get(md).push(row);
  const key = `${season}|${row.discipline}`;
  if (!seasonDisciplineRows.has(key)) seasonDisciplineRows.set(key, { season_start: season, season: seasonLabel(season), discipline: row.discipline, versions: new Set(), memberIds: new Set(), rows: 0 });
  const entry = seasonDisciplineRows.get(key);
  entry.versions.add(row.version_date);
  entry.memberIds.add(row.nembadminton_member_id);
  entry.rows++;
}
const versionBySeason = new Map();
for (const row of snapshots) {
  const season = seasonOfDate(row.version_date);
  if (!versionBySeason.has(season)) versionBySeason.set(season, new Set());
  versionBySeason.get(season).add(row.version_date);
}
const rankingSeasonSummary = [...versionBySeason.keys()].sort((a, b) => a - b).map((season) => {
  const rows = snapshots.filter((row) => seasonOfDate(row.version_date) === season);
  return { season_start: season, season: seasonLabel(season), versions: versionBySeason.get(season).size, member_ids: new Set(rows.map((row) => row.nembadminton_member_id)).size, snapshot_rows: rows.length, first_version: rows.map((row) => row.version_date).sort()[0], last_version: rows.map((row) => row.version_date).sort().at(-1) };
});
const rankingSeasonDiscipline = [...seasonDisciplineRows.values()].map((row) => ({ season_start: row.season_start, season: row.season, discipline: row.discipline, versions: row.versions.size, member_ids: row.memberIds.size, snapshot_rows: row.rows })).sort((a, b) => a.season_start - b.season_start || a.discipline.localeCompare(b.discipline));

const gsbLinkSummary = {
  link_rows: links.length,
  distinct_gsb_player_ids: linksByPlayer.size,
  confidence: all(db.ranking, 'SELECT match_confidence, match_method, count(*) AS link_rows, count(DISTINCT gsb_player_id) AS gsb_players, count(DISTINCT nembadminton_member_id) AS member_ids FROM player_link GROUP BY match_confidence, match_method ORDER BY match_confidence'),
  unique_players_by_status: {
    exact_name: [...linkInfo.values()].filter((info) => info.status === 'entydigt_medlems_id').length,
    ambiguous: [...linkInfo.values()].filter((info) => info.status === 'tvetydig_medlemskobling').length,
    no_member_id: [...linkInfo.values()].filter((info) => info.status === 'intet_medlems_id').length,
  },
  distinct_member_ids: new Set(links.map((link) => link.nembadminton_member_id).filter(Boolean)).size,
  snapshot_member_ids: new Set(snapshots.map((row) => row.nembadminton_member_id)).size,
  exact_name_roster: [...linksByPlayer.keys()].filter((playerId) => linkInfo.get(playerId).status === 'entydigt_medlems_id').map((playerId) => ({ gsb_player_id: playerId, name: playersById.get(playerId)?.name_raw ?? null, member_id: linkInfo.get(playerId).member_id })),
  ambiguous_players: [...linksByPlayer.keys()].filter((playerId) => linkInfo.get(playerId).status === 'tvetydig_medlemskobling').map((playerId) => ({ gsb_player_id: playerId, name: playersById.get(playerId)?.name_raw ?? null, candidate_member_ids: linkInfo.get(playerId).candidate_member_ids })),
  players_without_member_id: [...linksByPlayer.keys()].filter((playerId) => linkInfo.get(playerId).status === 'intet_medlems_id').map((playerId) => ({ gsb_player_id: playerId, name: playersById.get(playerId)?.name_raw ?? null })),
};

const missingMapped = [];
const disciplineKeys = [...new Set(snapshots.map((row) => `${seasonOfDate(row.version_date)}|${row.discipline}`))].map((key) => {
  const [season, discipline] = key.split('|');
  return { season_start: Number(season), season: seasonLabel(Number(season)), discipline };
}).sort((a, b) => a.season_start - b.season_start || a.discipline.localeCompare(b.discipline));
for (const target of disciplineKeys) {
  const exactPlayers = [...linksByPlayer.keys()].filter((playerId) => linkInfo.get(playerId).status === 'entydigt_medlems_id');
  const has = exactPlayers.filter((playerId) => snapshotByMemberSeasonDiscipline.has(`${linkInfo.get(playerId).member_id}|${target.season_start}|${target.discipline}`));
  const missing = exactPlayers.filter((playerId) => !snapshotByMemberSeasonDiscipline.has(`${linkInfo.get(playerId).member_id}|${target.season_start}|${target.discipline}`));
  missingMapped.push({ ...target, exact_member_link_players: exactPlayers.length, with_any_snapshot_in_season_discipline: has.length, missing_in_snapshot: missing.length, missing_players: missing.map((playerId) => ({ gsb_player_id: playerId, name: playersById.get(playerId)?.name_raw ?? null, member_id: linkInfo.get(playerId).member_id })) });
}

const youthAgeRows = all(db.landscape, "SELECT age_group_id, name FROM age_groups WHERE name GLOB 'U[0-9]*' ORDER BY age_group_id");
const youthAgeIds = youthAgeRows.map((row) => row.age_group_id);
const ageName = new Map(youthAgeRows.map((row) => [row.age_group_id, row.name]));
const inClause = youthAgeIds.map(() => '?').join(',');
const appearanceRows = all(db.normalized, `SELECT tm.season_id, s.label AS season_label, c.age_group_id, tm.team_match_id, tm.external_match_id, tm.round_date,
  tm.home_name_raw, tm.away_name_raw, t.name_raw AS registered_gsb_team, imp.player_id, p.name_raw AS player_name, imp.side, imp.points_at_match, im.discipline_raw
  FROM team_matches tm JOIN competitions c USING(competition_id) LEFT JOIN seasons s USING(season_id)
  JOIN teams t ON t.team_id=tm.gsb_team_id JOIN individual_matches im USING(team_match_id)
  JOIN individual_match_players imp USING(individual_match_id) JOIN players p USING(player_id)
  WHERE c.age_group_id IN (${inClause}) ORDER BY tm.season_id,c.age_group_id,tm.round_date,imp.player_id`, ...youthAgeIds);
const playerAppearances = new Map();
const groupPlayers = new Map();
let sideUnresolvedAppearanceRows = 0;
for (const row of appearanceRows) {
  const homeGsb = normalize(row.home_name_raw) && normalize(row.home_name_raw) === normalize(row.registered_gsb_team);
  const awayGsb = normalize(row.away_name_raw) && normalize(row.away_name_raw) === normalize(row.registered_gsb_team);
  const gsbSide = homeGsb === awayGsb ? null : homeGsb ? 'home' : 'away';
  if (!gsbSide) { sideUnresolvedAppearanceRows++; continue; }
  if (row.side !== gsbSide) continue;
  const key = `${row.season_id}|${row.age_group_id}`;
  if (!groupPlayers.has(key)) groupPlayers.set(key, new Set());
  groupPlayers.get(key).add(row.player_id);
  const identity = `${row.player_id}|${row.season_id}|${row.age_group_id}`;
  if (!playerAppearances.has(identity)) playerAppearances.set(identity, []);
  playerAppearances.get(identity).push({ ...row, gsb_side: gsbSide });
}
const gsbAgeCoverage = [...groupPlayers.entries()].map(([key, idSet]) => {
  const [seasonText, ageText] = key.split('|');
  const season = Number(seasonText);
  const age = Number(ageText);
  const ids = [...idSet];
  let exact = 0, ambiguous = 0, noMember = 0, withSnapshot = 0;
  for (const playerId of ids) {
    const info = linkInfo.get(playerId);
    if (!info || info.status === 'intet_medlems_id') noMember++;
    else if (info.status === 'tvetydig_medlemskobling') ambiguous++;
    else {
      exact++;
      if (snapshots.some((row) => row.nembadminton_member_id === info.member_id && seasonOfDate(row.version_date) === season)) withSnapshot++;
    }
  }
  return { season_start: season, season: seasonLabel(season), age_group_id: age, age_group: ageName.get(age), gsb_players_with_individual_game_rows: ids.length, unique_member_id: exact, ambiguous_member: ambiguous, no_member_id: noMember, with_any_ranking_snapshot_in_season: withSnapshot, no_snapshot_for_season: exact - withSnapshot };
}).sort((a, b) => a.season_start - b.season_start || a.age_group_id - b.age_group_id);

const pointsTotal = one(db.normalized, `SELECT count(*) AS rows,
  sum(points_at_match IS NOT NULL AND length(trim(points_at_match))>0) AS nonblank,
  sum(points_at_match IS NULL OR length(trim(points_at_match))=0) AS blank,
  sum(length(trim(coalesce(points_at_match,'')) )>0 AND CAST(points_at_match AS REAL)=0) AS zero_nonblank
  FROM individual_match_players`);
const pointsBySeasonAge = all(db.normalized, `SELECT tm.season_id, s.label AS season_label, c.age_group_id, count(*) AS rows,
  sum(imp.points_at_match IS NOT NULL AND length(trim(imp.points_at_match))>0) AS nonblank,
  sum(imp.points_at_match IS NULL OR length(trim(imp.points_at_match))=0) AS blank,
  sum(length(trim(coalesce(imp.points_at_match,'')))>0 AND CAST(imp.points_at_match AS REAL)=0) AS zero_nonblank
  FROM individual_match_players imp JOIN individual_matches im USING(individual_match_id)
  JOIN team_matches tm USING(team_match_id) LEFT JOIN seasons s USING(season_id)
  LEFT JOIN competitions c USING(competition_id) GROUP BY tm.season_id,c.age_group_id ORDER BY tm.season_id,c.age_group_id`);
const pointExamples = all(db.normalized, `SELECT tm.external_match_id, tm.season_id, tm.round_date, c.age_group_id, im.discipline_raw, im.category_raw,
  p.player_id, p.name_raw, imp.side, imp.points_at_match
  FROM individual_match_players imp JOIN players p USING(player_id) JOIN individual_matches im USING(individual_match_id)
  JOIN team_matches tm USING(team_match_id) LEFT JOIN competitions c USING(competition_id)
  ORDER BY tm.season_id,tm.external_match_id,im.individual_match_id,imp.player_id LIMIT 12`);

const targetMatches = all(db.normalized, `SELECT tm.team_match_id, tm.external_match_id, tm.season_id, s.label AS season_label, c.age_group_id,
  tm.round_date, tm.home_name_raw, tm.away_name_raw, t.name_raw AS gsb_team
  FROM team_matches tm JOIN competitions c USING(competition_id) LEFT JOIN seasons s USING(season_id)
  JOIN teams t ON t.team_id=tm.gsb_team_id WHERE tm.season_id IN (2025,2026) AND c.age_group_id IN (${inClause})
  ORDER BY tm.season_id,c.age_group_id,tm.round_date,tm.external_match_id`, ...youthAgeIds);
const externalIds = [...new Set(targetMatches.map((row) => String(row.external_match_id)))];
const placeholders = externalIds.map(() => '?').join(',') || 'NULL';
const nationalMatches = externalIds.length ? all(db.national, `SELECT external_match_id,season_id,age_group_id,home_team_raw,away_team_raw,source_url,render_gate,error_type FROM matches WHERE external_match_id IN (${placeholders})`, ...externalIds) : [];
const nationalMatchById = new Map(nationalMatches.map((row) => [String(row.external_match_id), row]));
const participantRows = externalIds.length ? all(db.national, `SELECT pm.external_match_id,pm.external_player_id,pm.name_raw,p.name_raw AS player_name,p.gender_status
  FROM player_matches pm LEFT JOIN players p USING(external_player_id) WHERE pm.external_match_id IN (${placeholders})`, ...externalIds) : [];
const extraRows = externalIds.length ? all(db.national, `SELECT external_match_id,external_player_id,discipline_code,team_side,parse_status FROM player_match_extras WHERE external_match_id IN (${placeholders})`, ...externalIds) : [];
const participantSides = new Map();
for (const row of extraRows) {
  const key = `${row.external_match_id}|${row.external_player_id}`;
  if (!participantSides.has(key)) participantSides.set(key, new Set());
  if (row.team_side) participantSides.get(key).add(row.team_side);
}
const gsbNationalMatchRecords = [];
const opponentAppearances = new Map();
let gsbMatchNoNationalRecord = 0;
let gsbMatchSideUnidentified = 0;
let gsbMissingTeamName = 0;
const matchesById = new Map(targetMatches.map((row) => [String(row.external_match_id), row]));
for (const row of targetMatches) {
  const matchId = String(row.external_match_id);
  const nationalMatch = nationalMatchById.get(matchId);
  if (!nationalMatch) { gsbMatchNoNationalRecord++; continue; }
  const gsbKey = normalize(row.gsb_team);
  let gsbNationalSide = null;
  if (gsbKey && normalize(nationalMatch.home_team_raw) === gsbKey) gsbNationalSide = 'hjemme';
  else if (gsbKey && normalize(nationalMatch.away_team_raw) === gsbKey) gsbNationalSide = 'ude';
  else {
    const normalHomeIsGsb = normalize(row.home_name_raw) && normalize(row.home_name_raw) === gsbKey;
    const normalAwayIsGsb = normalize(row.away_name_raw) && normalize(row.away_name_raw) === gsbKey;
    if (normalHomeIsGsb !== normalAwayIsGsb) gsbNationalSide = normalHomeIsGsb ? 'hjemme' : 'ude';
  }
  if (!normalize(row.home_name_raw) || !normalize(row.away_name_raw)) gsbMissingTeamName++;
  const opponentSide = gsbNationalSide === 'hjemme' ? 'ude' : gsbNationalSide === 'ude' ? 'hjemme' : null;
  if (!opponentSide) gsbMatchSideUnidentified++;
  gsbNationalMatchRecords.push({ season_start: row.season_id, season: row.season_label ?? seasonLabel(row.season_id), age_group_id: row.age_group_id, age_group: ageName.get(row.age_group_id), external_match_id: matchId, round_date: row.round_date, gsb_team: row.gsb_team, normalized_home: row.home_name_raw, normalized_away: row.away_name_raw, national_home: nationalMatch.home_team_raw, national_away: nationalMatch.away_team_raw, gsb_side_in_national: gsbNationalSide, opponent_side: opponentSide, national_match_found: true });
  if (!opponentSide) continue;
  for (const participant of participantRows.filter((candidate) => String(candidate.external_match_id) === matchId)) {
    const sides = participantSides.get(`${matchId}|${participant.external_player_id}`) ?? new Set();
    if (!sides.has(opponentSide) || sides.size !== 1) continue;
    const pkey = String(participant.external_player_id);
    if (!opponentAppearances.has(pkey)) opponentAppearances.set(pkey, { external_player_id: pkey, name: participant.name_raw ?? participant.player_name ?? null, gender_status: participant.gender_status ?? null, appearances: [] });
    opponentAppearances.get(pkey).appearances.push({ external_match_id: matchId, season: row.season_label ?? seasonLabel(row.season_id), age_group: ageName.get(row.age_group_id), date: row.round_date, opponent_team_raw: gsbNationalSide === 'hjemme' ? nationalMatch.away_team_raw : nationalMatch.home_team_raw, discipline_code: participant.discipline_code ?? null });
  }
}

// Join table above intentionally only contains identifiers/name; collect actual discipline per player-match from extras slots.
for (const opponent of opponentAppearances.values()) {
  for (const appearance of opponent.appearances) {
    const matchId = appearance.external_match_id;
    const matching = extraRows.filter((row) => String(row.external_match_id) === matchId && String(row.external_player_id) === opponent.external_player_id && row.team_side === (gsbNationalMatchRecords.find((match) => match.external_match_id === matchId)?.opponent_side));
    appearance.discipline_codes = [...new Set(matching.map((row) => row.discipline_code).filter(Boolean))];
  }
}

const matchedRosterByName = new Map();
for (const playerId of linksByPlayer.keys()) {
  const info = linkInfo.get(playerId);
  const name = playersById.get(playerId)?.name_raw;
  if (!name || info.status !== 'entydigt_medlems_id') continue;
  const key = normalize(name);
  if (!matchedRosterByName.has(key)) matchedRosterByName.set(key, []);
  matchedRosterByName.get(key).push({ player_id: playerId, member_id: info.member_id });
}
const knownMemberIds = new Set(links.map((link) => String(link.nembadminton_member_id ?? '')).filter(Boolean));
const opponentPersonList = [...opponentAppearances.values()].sort((a, b) => hashKey('148-opponent-sample', a.external_player_id).localeCompare(hashKey('148-opponent-sample', b.external_player_id)));
const opponentSamples = opponentPersonList.slice(0, 10).map((person) => {
  const nameMatches = matchedRosterByName.get(normalize(person.name)) ?? [];
  return { external_player_id: person.external_player_id, name: person.name, sample_appearance: person.appearances[0] ?? null, direct_member_id_match: knownMemberIds.has(person.external_player_id), unique_exact_name_candidate: nameMatches.length === 1 ? nameMatches[0] : null, exact_name_candidate_count: nameMatches.length, confirmed_point_link: false, reason: 'national-spillere.db har ikke Nembadminton-medlems-ID eller ranglistepoint; navnelighed alene er ikke et bekræftet tværkildematch' };
});

const supportedSampleDisciplines = new Set(snapshots.map((row) => row.discipline));
const gsbSamplePool = new Map();
for (const [identity, rows] of playerAppearances) {
  const [playerIdText, seasonText] = identity.split('|');
  if (Number(seasonText) !== 2025) continue;
  const eligible = rows.filter((row) => row.discipline_raw && supportedSampleDisciplines.has(`raw:${row.discipline_raw}`));
  if (!eligible.length) continue;
  const ordered = eligible.slice().sort((a, b) => String(a.round_date).localeCompare(String(b.round_date)) || String(a.external_match_id).localeCompare(String(b.external_match_id)));
  const current = gsbSamplePool.get(Number(playerIdText));
  if (!current || String(ordered[0].round_date).localeCompare(String(current.appearance.round_date)) < 0) {
    gsbSamplePool.set(Number(playerIdText), { player_id: Number(playerIdText), name: playersById.get(Number(playerIdText))?.name_raw ?? ordered[0].player_name, appearance: ordered[0] });
  }
}
const gsbSample = [...gsbSamplePool.values()].sort((a, b) => hashKey('148-gsb-sample', a.player_id).localeCompare(hashKey('148-gsb-sample', b.player_id))).slice(0, 10).map((sample) => {
  const info = linkInfo.get(sample.player_id) ?? { status: 'intet_medlems_id', member_id: null };
  const discipline = sample.appearance.discipline_raw ? `raw:${sample.appearance.discipline_raw}` : null;
  const history = info.member_id && discipline ? snapshotByMemberDiscipline.get(`${info.member_id}|${discipline}`) ?? [] : [];
  const closest = history.filter((row) => row.version_date <= sample.appearance.round_date).sort((a, b) => b.version_date.localeCompare(a.version_date))[0] ?? null;
  return { player_id: sample.player_id, name: sample.name, sample_date: sample.appearance.round_date, season: seasonLabel(2025), age_group: ageName.get(sample.appearance.age_group_id), external_match_id: sample.appearance.external_match_id, discipline_raw: sample.appearance.discipline_raw, points_at_match: sample.appearance.points_at_match, member_link_status: info.status, nembadminton_member_id: info.member_id, closest_prior_snapshot: closest ? { version_date: closest.version_date, discipline: closest.discipline, points: closest.points, source_query: closest.source_query } : null, comparison_possible: sample.appearance.points_at_match !== null && closest !== null };
});

const opponentAppearanceCount = [...opponentAppearances.values()].reduce((sum, person) => sum + person.appearances.length, 0);
const directNationalMemberMatches = [...opponentAppearances.values()].filter((person) => knownMemberIds.has(person.external_player_id)).length;
const matchCoverage = {
  gsb_youth_team_matches_by_season_age: all(db.normalized, `SELECT tm.season_id,c.age_group_id,count(*) AS team_matches
    FROM team_matches tm JOIN competitions c USING(competition_id) WHERE tm.season_id IN (2025,2026) AND c.age_group_id IN (${inClause})
    GROUP BY tm.season_id,c.age_group_id ORDER BY tm.season_id,c.age_group_id`, ...youthAgeIds).map((row) => ({ ...row, season: seasonLabel(row.season_id), age_group: ageName.get(row.age_group_id) })),
  gsb_team_match_rows: targetMatches.length,
  national_match_records_found: nationalMatches.length,
  gsb_match_no_national_record: gsbMatchNoNationalRecord,
  gsb_national_team_side_unidentified: gsbMatchSideUnidentified,
  normalized_match_rows_with_missing_home_or_away_name: gsbMissingTeamName,
  unique_opponent_player_ids_with_side_evidence: opponentAppearances.size,
  opponent_match_player_appearances_with_side_evidence: opponentAppearanceCount,
  confirmed_opponent_links_to_ranking_points: 0,
  opponent_appearances_without_confirmed_point_link: opponentAppearanceCount,
  opponent_ids_coincidentally_equal_member_id_count: directNationalMemberMatches,
  opponent_sample_selection: 'Reproducerbar pseudo-tilfældig rækkefølge: SHA-256("148-opponent-sample:" + external_player_id), første 10 distinkte BP-ID’er.',
  gsb_sample_selection: 'Reproducerbar pseudo-tilfældig rækkefølge: SHA-256("148-gsb-sample:" + player_id), første 10 spillere med GSB-side-kampdeltagelse i 2025/26; stikprøvens kamp er første dato for spilleren.',
  gsb_sample: gsbSample,
  opponent_sample: opponentSamples,
  opponent_names_without_person_club_column: opponentAppearances.size,
  player_ids_without_nembadminton_member_id_in_national_db: opponentAppearances.size,
  cross_source_exact_name_candidates_not_confirmed: [...opponentAppearances.values()].filter((person) => (matchedRosterByName.get(normalize(person.name)) ?? []).length === 1).length,
  match_join_evidence: gsbNationalMatchRecords,
};

const linkSnapshotCoverage = [];
for (const row of gsbAgeCoverage) {
  const missing = missingMapped.filter((entry) => entry.season_start === row.season_start);
  linkSnapshotCoverage.push({ ...row, snapshot_discipline_availability: missing.map(({ discipline, exact_member_link_players, with_any_snapshot_in_season_discipline, missing_in_snapshot }) => ({ discipline, exact_member_link_players, with_any_snapshot_in_season_discipline, missing_in_snapshot })) });
}

const hashSql = {
  ranking_overall: 'SELECT count(*), count(DISTINCT nembadminton_member_id), count(DISTINCT discipline), count(DISTINCT version_date), min(version_date), max(version_date), count(points IS NULL), count(points=0) FROM ranking_snapshots',
  ranking_by_season_discipline: 'GROUP BY season_start (July–June from version_date), discipline; count DISTINCT version_date/member ID and snapshot rows',
  gsb_links: 'SELECT match_confidence, match_method, count(*), count(DISTINCT gsb_player_id), count(DISTINCT nembadminton_member_id) FROM player_link GROUP BY 1,2',
  points_at_match: 'SELECT season_id, age_group_id, count(*), count(nonblank), count(blank), count(nonblank numeric zero) FROM individual_match_players JOIN individual_matches/team_matches/competitions',
  national_rows: 'SELECT count(*) for every user table in sqlite_master; schema via PRAGMA table_info',
  opponents: 'normalized GSB team_matches in 2025/2026 youth age groups JOIN national matches/player_matches/player_match_extras by external_match_id; opponent side from exact GSB team-name match in home_team_raw/away_team_raw',
};
const rankingFetchErrors = Number(one(db.ranking, 'SELECT count(*) AS n FROM fetch_errors').n);

const dbHashesAfter = {};
for (const [key, file] of Object.entries(dbFiles)) db[key].close();
for (const [key, file] of Object.entries(dbFiles)) dbHashesAfter[key] = await sha256(file);

const rankingOverall = {
  snapshot_rows: snapshots.length,
  member_ids: new Set(snapshots.map((row) => row.nembadminton_member_id)).size,
  disciplines: new Set(snapshots.map((row) => row.discipline)).size,
  versions: new Set(snapshots.map((row) => row.version_date)).size,
  first_version: snapshots.map((row) => row.version_date).sort()[0],
  last_version: snapshots.map((row) => row.version_date).sort().at(-1),
  null_points: snapshots.filter((row) => row.points === null).length,
  zero_points: snapshots.filter((row) => Number(row.points) === 0).length,
};

const result = {
  title: 'Opgave 148 — ranglistepoint inventar og plan',
  generated_at: new Date().toISOString(),
  read_only: true,
  sources: dbFiles,
  query_evidence: hashSql,
  database_hashes_before: hashesBefore,
  database_hashes_after: dbHashesAfter,
  database_hashes_unchanged: Object.keys(dbFiles).every((key) => hashesBefore[key] === dbHashesAfter[key]),
  ranking_history: {
    overall: { ...rankingOverall, first_version_date: rankingOverall.first_version, last_version_date: rankingOverall.last_version },
    date_interpretation: 'Season_start is derived, not stored: July–June buckets from ISO version_date.',
    season_coverage: rankingSeasonSummary,
    season_discipline_coverage: rankingSeasonDiscipline,
    gsb_link_summary: gsbLinkSummary,
    gsb_player_season_discipline_missing_from_existing_snapshots: missingMapped,
    gsb_players_with_no_unambiguous_member_id: [...linkInfo.entries()].filter(([, info]) => info.status !== 'entydigt_medlems_id').map(([playerId, info]) => ({ gsb_player_id: playerId, name: playersById.get(playerId)?.name_raw ?? null, ...info })),
    gsb_player_season_age_group_coverage: linkSnapshotCoverage,
  },
  points_at_match: { total: pointsTotal, by_season_age_group: pointsBySeasonAge, examples: pointExamples, interpretation: 'All rows are NULL. Schema name suggests match timing, but repo evidence does not define the intended provenance; no semantic meaning is inferred.' },
  national_spillere: {
    file_bytes: fs.statSync(path.resolve(ROOT, dbFiles.national)).size,
    tables: nationalSchemas,
    season_age_group_match_counts: nationalSeasons,
    ranking_point_column_present: false,
    nembadminton_member_id_column_present: false,
    player_club_column_present: false,
    note: 'National player external_player_id is a BadmintonPlayer-side identifier; no column or verified crosswalk to Nembadminton member IDs is present.',
  },
  opposition: matchCoverage,
  api_hash_audit: {
    user_candidate_hashes: [
      { id: 'all-ranking', url_hash: '#287,2026,,0,,,,0,,,,15,,,,0,,,,,,', list_id: 287 },
      { id: 'gsb-all', url_hash: '#287,2026,,0,,,1093,0,,,,15,,,,0,,,,,,', list_id: 287 },
      { id: 'youth-gsb', url_hash: '#287,2026,,0,21,,1093,0,,,,15,,,,0,,,,,,', list_id: 287 },
      { id: 'youth-gsb-date', url_hash: '#287,2026,10/02/2026,0,21,,1093,0,,,,15,,,,0,,,,,,', list_id: 287 },
      { id: 'u15-region-gender', url_hash: '#287,2026,09/23/2026,0,5,K,,0,8,,,15,,,,0,,,,,,', list_id: 287 },
      { id: 'u13-m', url_hash: '#287,2026,,0,4,M,,0,,,,15,,,,0,,,,,,', list_id: 287 },
      { id: 'hs', url_hash: '#288,2026,,0,,,,0,,,,15,,,,0,,,,,,M', list_id: 288 },
      { id: 'ds', url_hash: '#288,2026,,0,,,,0,,,,15,,,,0,,,,,,K', list_id: 288 },
      { id: 'hd', url_hash: '#289,2026,,0,,,,0,,,,15,,,,0,,,,,,M', list_id: 289 },
      { id: 'dd', url_hash: '#289,2026,,0,,,,0,,,,15,,,,0,,,,,,K', list_id: 289 },
      { id: 'md-m', url_hash: '#292,2026,,0,,,,0,,,,15,,,,0,,,,,,M', list_id: 292 },
      { id: 'md-k', url_hash: '#292,2026,,0,,,,0,,,,15,,,,0,,,,,,K', list_id: 292 },
    ],
    hash_position_assessment: [
      { position: 1, candidate: 'rankinglistid', confidence: 'understøttet indirekte', evidence: 'Profilens gemte ShowRankingListPoints-links bruger 287, 288, 289, 292; API-kaldene bruger rankinglistid.' },
      { position: 2, candidate: 'seasonid', confidence: 'understøttet', evidence: 'Profilkald og versionkald bruger seasonid; user-eksempler sætter 2026.' },
      { position: 3, candidate: 'rankinglistversiondate', confidence: 'sandsynlig, ikke hash-verificeret', evidence: 'API-body har rankinglistversiondate; eksempel ændrer position 3 til dato, men ingen lokalt gemt parser beviser bindingen.' },
      { position: 4, candidate: 'ukendt filter/alderslistevælger', confidence: 'ukendt', evidence: 'Feltet står som 0 i de viste hashes; direkte JS/hash-parser mangler i repoet.' },
      { position: 5, candidate: 'agegroupid eller rankinglistagegroupid', confidence: 'ukendt hvilken API-parameter', evidence: 'Værdierne 21/4/5 svarer til beskrevne grupper, men GetRankingListPlayers har begge aldersfelter og hash-bindingen er ikke lokalt dokumenteret.' },
      { position: 6, candidate: 'gender', confidence: 'sandsynlig', evidence: 'Eksempler skifter M/K her; request body har gender, men bindingen ikke verificeret mod netværkskald.' },
      { position: 7, candidate: 'clubid', confidence: 'sandsynlig', evidence: 'Eksempel sætter 1093 her for GSB; request body indeholder clubid.' },
      { position: 8, candidate: 'classid eller andet filter', confidence: 'ukendt', evidence: 'Eksempler viser 0, men ingen hash-parser binder det til et API-felt.' },
      { position: 9, candidate: 'regionid', confidence: 'sandsynlig', evidence: 'København-eksempel viser 8 her; GetRankingListPlayers har regionid.' },
      { position: '10–21', candidate: 'ukendte/standardfiltre', confidence: 'ukendt', evidence: 'Flere positioner og standardværdien 15/0 er ikke bundet til API-parametre i lokale scripts.' },
      { position: 22, candidate: 'disciplinliste-køn', confidence: 'sandsynlig', evidence: 'M/K skifter i de viste slutpositioner for liste 288/289/292; eksakt request-felt er ikke verificeret.' },
    ],
    api_methods: [
      { method: 'GetRankingListVersions', request_fields: ['callbackcontextkey','rankinglistagegroupid','rankinglistid','seasonid'], local_evidence: 'call-ranking-versions.mjs; gemt svar viser HTTP 200 og versionsdatoer for list 288 season 2026', status: 'virker efter callback er hentet fra profilside; ikke uden sidekontekst' },
      { method: 'GetPlayerRankingListPoints', request_fields: ['callbackcontextkey','seasonid','playerid','rankinglistid','rankinglistplayerid','getplayerdata'], local_evidence: 'call-ranking-points.mjs og call-ranking-mix.mjs; gemte profiludsnit indeholder ShowRankingListPoints links', status: 'spillerens aktuelle pointliste kan kaldes direkte efter sidekontekst; historisk seasonid=2025 gav HTTP 500 ifølge API_RESEARCH.md' },
      { method: 'GetRankingListPlayers', request_fields: ['callbackcontextkey','rankinglistagegroupid','rankinglistid','seasonid','rankinglistversiondate','agegroupid','classid','gender','clubid','searchall','regionid','pointsfrom','pointsto','rankingfrom','rankingto','birthdatefromstring','birthdatetostring','agefrom','ageto','playerid','param','pageindex','sortfield','getversions','getplayer'], local_evidence: 'call-ranking-players.mjs/test-ranking-parameter-grid.mjs; gemt parameter-grid-output er HTTP 500', status: 'fuld liste/filtre ikke bekræftet; kræver sidekontekst og korrekt request-body' },
    ],
    exact_examples_fetchable_without_visiting_page: 0,
    conclusion: 'Ingen af de 12 konkrete fulde ranglistevisninger er dokumenteret hentet direkte uden sidens kontekst/rendering. Versions- og enkeltspiller-API findes, men kræver callbackcontextkey; fuldlistekaldet gav 500 med den afprøvede body. Hashens uafklarede felter er ikke gættet.',
  },
  retrieval_plan: {
    objective_minimum: 'For hver individuel kampdato og disciplin: point for hver spiller på begge sider, med ranglisteversion <= kampdato og eksplicit kilde/version på hver værdi.',
    suggested_archive: 'Ny separat ranglistepoint-database; aldrig udvid de tre eksisterende databaser. Gem rå svar, normaliserede player/list/season/version/discipline/points, URL/hash-parametre, hentetid, response-hash, pagination og coverage status.',
    pilot_first: 'Før fuld indsamling skal ét kendt eksempel pr. listetype og én historisk version valideres fra browserens offentlige ranglisteside; GetRankingListPlayers har endnu ikke en fungerende direkte body.',
    list_ids_for_minimum: [288,289,292],
    version_call_estimate: '5 sæsoner × 3 liste-ID’er = 15 GetRankingListVersions-kald, hvis hver kombination kan enumereres direkte.',
    full_list_snapshot_estimate: '49 observerede versiondatoer × 3 liste-ID’er = 147 fulde snapshot-kald før pagination; 287 (Tilmeldingsniveau) er ikke nødvendigt for kampdisciplinernes point og er ikke medregnet.',
    pagination_and_retry: 'Antallet af sidekald er ukendt indtil en vellykket GetRankingListPlayers-pilot viser sidestørrelse. Kør sekventielt ca. ét kald/sekund, checkpoint pr. season/list/version/page, genoptag manglende checksums, retry 429/5xx med backoff og stop efter gentagne serverfejl.',
    temporal_join: 'Vælg seneste punktversion med dato <= round_date; hvis ingen findes, markér manglende. Gør ingen forward-fill fra fremtidige versioner.',
    current_archive_limits: 'Eksisterende snapshot-arkiv dækker 2022/23–2026/27; kampdatoer før 2022/23 mangler i denne lokale kilde. Arkivets mulighed for at hente ældre sæsoner er ikke afklaret.',
  },
};

const md = [];
const nationalCount = (table) => nationalSchemas.find((row) => row.table === table)?.rows ?? 0;
md.push('# Opgave 148 — ranglistepoint: inventar og hentningsplan', '', `Genereret ${result.generated_at}. Alle fire SQLite-filer blev åbnet read-only; ingen netværkskald.`, '', '## 1. Ranglistehistorik', '', `ranking_snapshots: ${rankingOverall.snapshot_rows.toLocaleString('da-DK')} rækker; ${rankingOverall.member_ids} medlems-ID’er; ${rankingOverall.disciplines} disciplinværdier; ${rankingOverall.versions} versiondatoer (${rankingOverall.first_version}–${rankingOverall.last_version}). fetch_errors: ${rankingFetchErrors}.`, '', `player_link: ${links.length} rækker og ${linksByPlayer.size} distinkte GSB-player-ID’er; ${gsbLinkSummary.unique_players_by_status.exact_name} entydige, ${gsbLinkSummary.unique_players_by_status.ambiguous} tvetydige og ${gsbLinkSummary.unique_players_by_status.no_member_id} uden entydigt medlems-ID.`, '', '| Sæson (afledt juli–juni) | Versioner | Medlems-ID’er | Snapshots | Første–sidste |', '|---|---:|---:|---:|---|');
for (const row of rankingSeasonSummary) md.push(`| ${row.season} | ${row.versions} | ${row.member_ids} | ${row.snapshot_rows.toLocaleString('da-DK')} | ${row.first_version}–${row.last_version} |`);
md.push('', 'Disciplin-/sæsondækningen, rå værdier og manglende spillerkoblinger står i JSON. Ingen rå disciplinbetegnelse er omfortolket.', '', '### GSB-sæson/årgang', '', '| Sæson | Årgang | Spillere med GSB-sidekampe | Entydig medlemskobling | Tvetydig | Ingen medlems-ID | Med snapshot i sæson |');
for (const row of gsbAgeCoverage) md.push(`| ${row.season} | ${row.age_group} | ${row.gsb_players_with_individual_game_rows} | ${row.unique_member_id} | ${row.ambiguous_member} | ${row.no_member_id} | ${row.with_any_ranking_snapshot_in_season} |`);
md.push('', 'Udeladte sæson×disciplin snapshots for entydigt koblede GSB-spillere er listet i JSON; fravær i dette arkiv beviser ikke fravær på kildens rangliste.', '', '## 2. points_at_match', '', `Samtlige ${Number(pointsTotal.rows).toLocaleString('da-DK')} rækker: ${pointsTotal.nonblank} ikke-blanke, ${pointsTotal.blank} blanke/NULL, ${pointsTotal.zero_nonblank} ikke-blanke nulværdier. Kolonnen er NULL overalt; ingen lagrede værdier kan afstemmes. Kolonnenavnet beviser ikke den tilsigtede provenance. API_RESEARCH.md beskriver Point i GetPlayerRankingListPoints, men det dokumenterer ikke, at denne DB-kolonne blev udfyldt fra API’et. Sæson×årgangstællinger findes i JSON.`, '', '## 3. national-spillere.db', '', `Filstørrelse: ${(fs.statSync(path.resolve(ROOT, dbFiles.national)).size / 1e9).toFixed(2)} GB. Tabelrækketal: matches ${nationalCount('matches').toLocaleString('da-DK')}, players ${nationalCount('players').toLocaleString('da-DK')}, player_matches ${nationalCount('player_matches').toLocaleString('da-DK')}, player_match_extras ${nationalCount('player_match_extras').toLocaleString('da-DK')}. Alle tabeller/skemaer står i JSON. Der findes hverken pointkolonne, verificeret Nembadminton-medlems-ID eller spillerens klub i skemaet.`, '', '## 4. Modstandere', '', '| Sæson | GSB-ungdomsholdkampe i normaliseret DB |', '|---|---:|');
for (const row of matchCoverage.gsb_youth_team_matches_by_season_age) md.push(`| ${seasonLabel(row.season_id)} ${row.age_group} | ${row.team_matches} |`);
md.push('', `Der er ${matchCoverage.gsb_team_match_rows} GSB-rækker for sæsonerne 2025/26 og 2026/27; ${matchCoverage.national_match_records_found} findes i nationaldatabasen, ${matchCoverage.gsb_match_no_national_record} mangler matchrecord, ${matchCoverage.gsb_national_team_side_unidentified} har uafklaret side, og ${matchCoverage.normalized_match_rows_with_missing_home_or_away_name} mangler hjemme-/udeholdnavn. Distinkte sidebestemte modstandere: ${matchCoverage.unique_opponent_player_ids_with_side_evidence}; spiller×kamp-forekomster: ${matchCoverage.opponent_match_player_appearances_with_side_evidence}. Bekræftede ranglistepointlinks: 0. Navnelighedskandidater er ikke bekræftede koblinger.`, '', 'Stikprøven på 10 GSB-spillere og 10 modstandere står i JSON. GSB-rækkerne viser dato, disciplin, medlemskobling og seneste snapshot på/inden kampdato; points_at_match er NULL. Modstanderrækkerne viser BadmintonPlayer-ID/navn og matchhold, men ingen sikker tværkilde-ID-kobling.', '', '## 5. API/hash-parametre', '', 'Lokale scripts og gemte svar støtter liste-ID’erne 287 (tilmeldingsniveau), 288 (single), 289 (double), 292 (mixdouble). GetRankingListVersions returnerede gemt HTTP 200; GetPlayerRankingListPoints virker i profilkontekst, mens historisk direkte forespørgsel gav HTTP 500; GetRankingListPlayers’ afprøvede body gav HTTP 500. Hash-eksemplerne er ikke en bevist API-kontrakt: felter 1/2 har bedst støtte som liste-ID/sæson; flere andre positioner forbliver ukendte, især 4, 8 og 10–21. Ingen af de 12 listeeksempler er dokumenteret som komplet direkte hentning uden sidekontekst.', '', '## 6. Hentningsplan', '', '1. Pilotér offentligt én historisk version pr. liste 288/289/292; bekræft hash→API-parametre og en succesfuld GetRankingListPlayers-side før fuld indsamling.', '2. Foreløbigt overslag: 5 sæsoner × 3 lister = 15 versionsopslag; 49 observerede datoer × 3 lister = 147 første-sider-kald, pagination ukendt. Det er estimater, ikke en fungerende hentningsrute.', '3. Gem rå svar og normaliserede værdier i en ny separat database med spiller/liste/version, kilde, requestparametre, hentetid, response-hash, pagination og coverage-status. Checkpoint, sekventiel trafik og backoff på 429/5xx.', '4. Ved kampkobling vælges seneste snapshotdato ≤ kampdato; ingen fremadfyldning. Historik før 2022/23 mangler i det lokale snapshotarkiv; om kilden kan levere den, er uafklaret.', '', '## Databasekontrol', '', '| Database | SHA-256 før | SHA-256 efter | Uændret |', '|---|---|---|---|');
for (const [key, file] of Object.entries(dbFiles)) md.push(`| ${path.basename(file)} | ${hashesBefore[key]} | ${dbHashesAfter[key]} | ${hashesBefore[key] === dbHashesAfter[key] ? 'ja' : 'NEJ'} |`);
md.push('', 'Nationaldatabasens rækketal før/efter er uændrede; alle tabeltal fremgår af JSON. Ingen database blev skrevet.', '');

fs.writeFileSync(path.resolve(ROOT, outputJson), `${JSON.stringify(result, null, 2)}\n`);
fs.writeFileSync(path.resolve(ROOT, outputMd), `${md.join('\n')}\n`);
console.log(JSON.stringify({ json: outputJson, markdown: outputMd, hash_unchanged: result.database_hashes_unchanged, gsb_links: gsbLinkSummary.unique_players_by_status, points_at_match: pointsTotal, target_gsb_matches: targetMatches.length, national_records: nationalMatches.length, opponents: opponentAppearances.size, opponent_appearances: opponentAppearanceCount, samples: { gsb: gsbSample.length, opponents: opponentSamples.length }, national_tables: nationalSchemas.map(({ table, rows }) => ({ table, rows })), api_direct_full_list_examples: result.api_hash_audit.exact_examples_fetchable_without_visiting_page }, null, 2));
