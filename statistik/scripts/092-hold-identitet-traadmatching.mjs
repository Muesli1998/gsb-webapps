import crypto from 'node:crypto';
import fs from 'node:fs';

const sourcePath = 'statistik/results/089-liga-1div-revisionstabel.json';
const referencePath = 'work/aabne/referencer/092-bekraeftede-traade.json';
const outputPath = 'statistik/results/092-traadmatching-forslag.json';

const sourceText = fs.readFileSync(sourcePath, 'utf8');
const source = JSON.parse(sourceText);
const reference = JSON.parse(fs.readFileSync(referencePath, 'utf8'));

const seasonStart = season => Number(String(season).slice(0, 4));
const sourceKey = row => `${row['sæson']}|${row.hold}|${row.niveau_denne_sæson}`;
// The 089 table can contain the same team/level twice when a qualification
// group is represented beside its source group.  Keep every source row in the
// review output rather than silently overwriting one of them.
const nodeId = (row, index) => `${sourceKey(row)}|${row.source_league_group_id}|${index}`;

/**
 * The validated rule: only historical suffixes are removed.  A missing
 * numeric suffix means first team; all other final numeric suffixes remain
 * significant.  Sponsor/name changes are deliberately not aliased here.
 */
function normalizedIdentity(teamName) {
  const withoutMarker = String(teamName ?? '')
    .trim()
    .replace(/\s*\([ONM]\)\s*$/iu, '')
    .replace(/\s+/gu, ' ')
    .trim();
  const match = withoutMarker.match(/^(.*?)(?:\s+(\d+))?$/u);
  const club = match[1].trim().toLocaleLowerCase('da-DK');
  const teamNumber = match[2] ?? '1';
  return `${club} | ${teamNumber}`;
}

const rows = source.rows.map((row, index) => ({
  id: nodeId(row, index),
  source_key: sourceKey(row),
  source_group_id: row.source_league_group_id,
  season: row['sæson'],
  season_start: seasonStart(row['sæson']),
  team: row.hold,
  level: row.niveau_denne_sæson,
  position: row.placering,
  normalized_identity: normalizedIdentity(row.hold),
}));

const bySeasonAndIdentity = new Map();
for (const row of rows) {
  const key = `${row.season_start}|${row.normalized_identity}`;
  if (!bySeasonAndIdentity.has(key)) bySeasonAndIdentity.set(key, []);
  bySeasonAndIdentity.get(key).push(row);
}

const automaticEdges = [];
const ambiguityReviews = [];
for (const row of rows) {
  const next = bySeasonAndIdentity.get(`${row.season_start + 1}|${row.normalized_identity}`) ?? [];
  const current = bySeasonAndIdentity.get(`${row.season_start}|${row.normalized_identity}`) ?? [];
  if (next.length === 1 && current.length === 1) {
    automaticEdges.push({
      from_id: row.id,
      to_id: next[0].id,
      from_source_key: row.source_key,
      to_source_key: next[0].source_key,
      normalized_identity: row.normalized_identity,
      method: 'exact_normalized_club_and_team_number',
    });
  } else if (next.length || current.length > 1) {
    ambiguityReviews.push({
      from_id: row.id,
      season: row.season,
      team: row.team,
      normalized_identity: row.normalized_identity,
      current_candidates: current.map(candidate => candidate.id),
      next_season_candidates: next.map(candidate => candidate.id),
      reason: next.length > 1 || current.length > 1
        ? 'normaliseret identitet er ikke entydig i mindst én sæson'
        : 'ingen kandidat i næste sæson',
    });
  }
}

const outgoing = new Map(automaticEdges.map(edge => [edge.from_id, edge.to_id]));
const incoming = new Set(automaticEdges.map(edge => edge.to_id));
const rowById = new Map(rows.map(row => [row.id, row]));
const threads = [];
const visited = new Set();
for (const row of rows) {
  if (incoming.has(row.id) || visited.has(row.id)) continue;
  const members = [];
  let current = row;
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    members.push(current);
    current = rowById.get(outgoing.get(current.id));
  }
  threads.push({
    thread_id: `auto-${String(threads.length + 1).padStart(4, '0')}`,
    match_method: members.length > 1 ? 'exact_normalized_club_and_team_number' : 'ingen_entydig_nabo_match',
    members,
  });
}
// This should only occur if malformed cycles somehow entered the input.
for (const row of rows) if (!visited.has(row.id)) threads.push({
  thread_id: `auto-${String(threads.length + 1).padStart(4, '0')}`,
  match_method: 'cycle_or_unexpected_input_review',
  members: [row],
});

const referenceEdges = [];
for (const chain of reference.kaeder ?? []) {
  for (let i = 0; i < chain.length - 1; i += 1) {
    const from = chain[i];
    const to = chain[i + 1];
    referenceEdges.push({
      from: { season: from.saeson, team: from.hold, level: from.niveau },
      to: { season: to.saeson, team: to.hold, level: to.niveau },
    });
  }
}
const automaticEdgeSourceKeys = new Set(automaticEdges.map(edge => `${edge.from_source_key}=>${edge.to_source_key}`));
const validation = referenceEdges.map(edge => {
  const fromId = `${edge.from.season}|${edge.from.team}|${edge.from.level}`;
  const toId = `${edge.to.season}|${edge.to.team}|${edge.to.level}`;
  return {
    normalized_match: normalizedIdentity(edge.from.team) === normalizedIdentity(edge.to.team),
    proposed_automatically: automaticEdgeSourceKeys.has(`${fromId}=>${toId}`),
  };
});

const output = {
  generated_at: new Date().toISOString(),
  source: {
    path: sourcePath,
    sha256: crypto.createHash('sha256').update(sourceText).digest('hex'),
    row_count: rows.length,
    season_range: ['2010/2011', '2026/2027'],
  },
  matching_rule: {
    description: 'Normalisér til klub + holdnummer; intet tal betyder 1. Fjern kun (O)/(N)/(M)-suffix. Forbind kun entydige identiteter i direkte efterfølgende sæsoner.',
    sponsor_aliases_applied: false,
    ambiguous_matches_are_automatic: false,
  },
  validation_against_confirmed_threads: {
    reference_thread_count: reference.antal_traade,
    reference_edge_count: referenceEdges.length,
    normalized_rule_matches: validation.filter(result => result.normalized_match).length,
    proposed_automatically: validation.filter(result => result.proposed_automatically).length,
    unmatched_reference_edges: validation.filter(result => !result.proposed_automatically).length,
  },
  summary: {
    source_rows: rows.length,
    automatic_edge_count: automaticEdges.length,
    thread_count: threads.length,
    multi_member_thread_count: threads.filter(thread => thread.members.length > 1).length,
    standalone_row_count: threads.filter(thread => thread.members.length === 1).length,
    ambiguity_review_count: ambiguityReviews.length,
  },
  threads,
  automatic_edges: automaticEdges,
  ambiguity_reviews: ambiguityReviews,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({
  source_rows: output.summary.source_rows,
  automatic_edges: output.summary.automatic_edge_count,
  threads: output.summary.thread_count,
  multi_member_threads: output.summary.multi_member_thread_count,
  standalone_rows: output.summary.standalone_row_count,
  ambiguity_reviews: output.summary.ambiguity_review_count,
  validation: output.validation_against_confirmed_threads,
}, null, 2));
