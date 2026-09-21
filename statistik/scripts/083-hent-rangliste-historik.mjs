import fs from 'node:fs';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

const api = 'https://app.nembadminton.dk/graphql';
const normalizedDbPath = 'statistik/data/gsb-statistik-normalized.db';
const historyDbPath = 'statistik/data/rangliste-historik.db';
const rawPath = 'statistik/results/083-nembadminton-raw.json';
const now = new Date().toISOString();
const categories = ['HS', 'DS', 'HD', 'DD', 'MxH', 'MxD'];
const vintages = ['SEN', 'U17', 'U19', 'U15', 'U13', 'U11', 'U9'];

const gql = async (query, variables) => {
  try {
    const response = await fetch(api, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ query, variables }) });
    const text = await response.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }
    return { status: response.status, text, json, sha256: crypto.createHash('sha256').update(text).digest('hex') };
  } catch (error) {
    return { status: 0, text: String(error), json: { errors: [{ message: String(error) }] }, sha256: crypto.createHash('sha256').update(String(error)).digest('hex') };
  }
};

const gainQuery = `query($clubhouseId:ID!,$category:Category!,$limit:Int!,$orderBy:SortOrder!,$vintages:[Vintage!]!){highestPointGain(clubhouseId:$clubhouseId,category:$category,limit:$limit,orderBy:$orderBy,vintages:$vintages){member{id name refId vintage} earliestPoints latestPoints totalIncrease}}`;
const statsQuery = `query($ids:[ID!]!){membersStats(ids:$ids){member{id name refId vintage points{points position category vintage version}} single{points version} double{points version} mix{points version}}}`;
const norm = (value) => String(value ?? '').toLocaleLowerCase('da').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '');

const sourceDb = new DatabaseSync(normalizedDbPath, { readOnly: true });
const gsbPlayers = sourceDb.prepare(`
  SELECT DISTINCT p.player_id, p.name_raw
  FROM players p
  JOIN individual_match_players imp USING (player_id)
  JOIN individual_matches im USING (individual_match_id)
  JOIN team_matches tm USING (team_match_id)
  JOIN teams t ON t.team_id = tm.gsb_team_id
  WHERE (lower(trim(t.name_raw)) = lower(trim(tm.home_name_raw)) AND imp.side = 'home')
     OR (lower(trim(t.name_raw)) = lower(trim(tm.away_name_raw)) AND imp.side = 'away')
`).all();
sourceDb.close();

const rosterResponses = [];
const rosterById = new Map();
for (const category of categories) {
  const result = await gql(gainQuery, { clubhouseId: '331', category, limit: 1000, orderBy: 'DESC', vintages });
  rosterResponses.push({ category, status: result.status, sha256: result.sha256, body: result.json });
  for (const row of result.json.data?.highestPointGain ?? []) rosterById.set(String(row.member.id), row.member);
}

const byName = new Map();
for (const player of gsbPlayers) {
  const key = norm(player.name_raw);
  if (!byName.has(key)) byName.set(key, []);
  byName.get(key).push(player);
}
const membersByName = new Map();
for (const member of rosterById.values()) {
  const key = norm(member.name);
  if (!membersByName.has(key)) membersByName.set(key, []);
  membersByName.get(key).push(member);
}
const links = [];
const matchedMemberIds = new Set();
const linkedGsbIds = new Set();
const ambiguousGsbIds = new Set();
for (const member of rosterById.values()) {
  const candidates = byName.get(norm(member.name)) ?? [];
  const sameNameMembers = membersByName.get(norm(member.name)) ?? [];
  if (candidates.length === 1 && sameNameMembers.length === 1) {
    const player = candidates[0];
    matchedMemberIds.add(String(member.id));
    linkedGsbIds.add(player.player_id);
    links.push({ gsb_player_id: player.player_id, nembadminton_member_id: String(member.id), match_confidence: 'exact_name', match_method: 'normalized_exact_name', matched_name_raw: member.name });
  } else if (candidates.length > 0) {
    for (const player of candidates) {
      matchedMemberIds.add(String(member.id));
      linkedGsbIds.add(player.player_id);
      ambiguousGsbIds.add(player.player_id);
      links.push({ gsb_player_id: player.player_id, nembadminton_member_id: String(member.id), match_confidence: 'ambiguous_name_collision', match_method: candidates.length > 1 ? 'multiple_gsb_rows_same_normalized_name' : 'multiple_nembadminton_ids_same_normalized_name', matched_name_raw: member.name });
    }
  }
}
for (const player of gsbPlayers) {
  if (!linkedGsbIds.has(player.player_id)) {
    links.push({ gsb_player_id: player.player_id, nembadminton_member_id: null, match_confidence: 'unmatched', match_method: 'no_unique_roster_name_match', matched_name_raw: null });
  }
}

const db = new DatabaseSync(historyDbPath);
db.exec(`PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS player_link (
  gsb_player_id INTEGER NOT NULL,
  nembadminton_member_id TEXT,
  match_confidence TEXT NOT NULL,
  match_method TEXT NOT NULL,
  matched_name_raw TEXT,
  first_seen_at TEXT NOT NULL,
  PRIMARY KEY (gsb_player_id, nembadminton_member_id)
);
CREATE TABLE IF NOT EXISTS ranking_snapshots (
  nembadminton_member_id TEXT NOT NULL,
  discipline TEXT NOT NULL,
  version_date TEXT NOT NULL,
  points INTEGER,
  source_query TEXT NOT NULL,
  fetched_at TEXT NOT NULL,
  raw_response_sha256 TEXT NOT NULL,
  PRIMARY KEY (nembadminton_member_id, discipline, version_date)
);
CREATE TABLE IF NOT EXISTS fetch_errors (
  nembadminton_member_id TEXT,
  requested_at TEXT NOT NULL,
  http_status INTEGER,
  error_kind TEXT NOT NULL,
  response_text TEXT,
  attempts INTEGER NOT NULL
);`);
const insertLink = db.prepare(`INSERT INTO player_link VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(gsb_player_id, nembadminton_member_id) DO UPDATE SET match_confidence=excluded.match_confidence, match_method=excluded.match_method, matched_name_raw=excluded.matched_name_raw`);
for (const link of links) insertLink.run(link.gsb_player_id, link.nembadminton_member_id, link.match_confidence, link.match_method, link.matched_name_raw, now);

const rawResponses = [];
const insertSnapshot = db.prepare(`INSERT OR REPLACE INTO ranking_snapshots VALUES (?, ?, ?, ?, ?, ?, ?)`);
const insertError = db.prepare(`INSERT INTO fetch_errors VALUES (?, ?, ?, ?, ?, ?)`);
const matchedIds = [...matchedMemberIds];
for (let offset = 0; offset < matchedIds.length; offset += 50) {
  const ids = matchedIds.slice(offset, offset + 50);
  const result = await gql(statsQuery, { ids });
  console.error(`memberStats batch ${offset / 50 + 1}/${Math.ceil(matchedIds.length / 50)} HTTP ${result.status}`);
  rawResponses.push({ batch: offset / 50 + 1, ids, status: result.status, sha256: result.sha256, body: result.json });
  if (result.status !== 200 || result.json.errors) {
    for (const id of ids) insertError.run(id, now, result.status, result.json.errors ? 'graphql_error' : 'http_error', result.text, 1);
    continue;
  }
  for (const memberStats of result.json.data?.membersStats ?? []) {
    const id = String(memberStats.member.id);
    for (const point of memberStats.member.points ?? []) insertSnapshot.run(id, `raw:${point.category ?? 'LEVEL'}`, point.version ?? '', point.points, 'memberStats.member.points', now, result.sha256);
    for (const discipline of ['single', 'double', 'mix']) for (const point of memberStats[discipline] ?? []) insertSnapshot.run(id, discipline, point.version ?? '', point.points, `membersStats.${discipline}`, now, result.sha256);
  }
}
db.close();
fs.writeFileSync(rawPath, JSON.stringify({ generatedAt: now, endpoint: api, rosterResponses, memberStatsResponses: rawResponses }, null, 2));

const summary = {
  generatedAt: now,
  gsbPlayers: gsbPlayers.length,
  nembadmintonRosterRows: rosterResponses.reduce((sum, response) => sum + (response.body.data?.highestPointGain?.length ?? 0), 0),
  nembadmintonUniqueMembers: rosterById.size,
  exactNameMatches: links.filter((link) => link.match_confidence === 'exact_name').length,
  ambiguousNameMatches: links.filter((link) => link.match_confidence === 'ambiguous_name_collision').length,
  unmatchedGsbPlayers: links.filter((link) => link.match_confidence === 'unmatched').length,
  nembadmintonMembersWithoutGsbNameMatch: [...rosterById.keys()].filter((id) => !matchedMemberIds.has(id)).length,
  memberStatsBatches: rawResponses.length,
  rawResponseFile: rawPath,
  historyDb: historyDbPath
};
fs.writeFileSync('statistik/results/083-rangliste-historik-summary.json', JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
