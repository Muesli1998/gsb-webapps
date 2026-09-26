import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const sourcePath = 'statistik/results/089-liga-1div-revisionstabel.json';
const referencePath = 'work/aabne/referencer/092-bekraeftede-traade.json';
const outputPath = 'statistik/results/092-traadmatching-forslag.json';
const sourceText = fs.readFileSync(sourcePath, 'utf8');
const source = JSON.parse(sourceText);
const reference = JSON.parse(fs.readFileSync(referencePath, 'utf8'));
const db = new DatabaseSync(path.resolve('statistik/data/liga-landskab.db'), { readOnly: true });

const seasonStart = season => Number(String(season).slice(0, 4));
const sourceKey = row => `${row['sæson']}|${row.hold}|${row.niveau_denne_sæson}`;
const nodeId = (season, identity) => `${season}|${identity}`;

function normalizedIdentity(teamName) {
  const name = String(teamName ?? '').trim().replace(/\s*\([ONM]\)\s*$/iu, '').replace(/\s+/gu, ' ').trim();
  const match = name.match(/^(.*?)(?:\s+(\d+))?$/u);
  return `${match[1].trim().toLocaleLowerCase('da-DK')} | ${match[2] ?? '1'}`;
}

// 089 is senior-only, but season remains part of the key so reused group IDs
// cannot cross-contaminate data from another season.
const groupTypes = new Map(db.prepare(`
  SELECT g.season_id, g.league_group_id, g.division_name_raw, g.group_name_raw,
         COALESCE(k.group_type, 'andet/ukendt') AS group_type
  FROM league_groups g
  LEFT JOIN group_type_katalog k
    ON k.division_name_raw = COALESCE(g.division_name_raw, '')
   AND k.group_name_raw = COALESCE(g.group_name_raw, '')
  WHERE g.age_group_id = 1
`).all().map(row => [`${row.season_id}|${row.league_group_id}`, row]));
db.close();

const sourceRows = source.rows.map((row, sourceRowIndex) => {
  const start = seasonStart(row['sæson']);
  const group = groupTypes.get(`${start}|${row.source_league_group_id}`);
  return {
    source_row_index: sourceRowIndex, source_key: sourceKey(row), source_group_id: row.source_league_group_id,
    source_group_type: group?.group_type ?? 'andet/ukendt', source_division_name_raw: group?.division_name_raw ?? null,
    source_group_name_raw: group?.group_name_raw ?? null, season: row['sæson'], season_start: start,
    team: row.hold, level: row.niveau_denne_sæson, position: row.placering, event: row.hændelse,
    normalized_identity: normalizedIdentity(row.hold),
  };
});
const bySeasonAndIdentity = new Map();
for (const row of sourceRows) {
  const key = `${row.season_start}|${row.normalized_identity}`;
  if (!bySeasonAndIdentity.has(key)) bySeasonAndIdentity.set(key, []);
  bySeasonAndIdentity.get(key).push(row);
}
const contextFrom = row => ({ source_row_index: row.source_row_index, source_key: row.source_key,
  source_group_id: row.source_group_id, source_group_type: row.source_group_type,
  source_division_name_raw: row.source_division_name_raw, source_group_name_raw: row.source_group_name_raw,
  level: row.level, position: row.position, event: row.event });

const canonicalNodes = [];
const sameSeasonReviews = [];
for (const candidates of bySeasonAndIdentity.values()) {
  const ground = candidates.filter(row => row.source_group_type === 'grundspil');
  const seed = ground.length === 1 ? ground[0] : candidates.length === 1 ? candidates[0] : null;
  const reviewReason = ground.length > 1 ? 'flere_grundspilskilder'
    : ground.length === 0 && candidates.length > 1 ? 'flere_ikke_grundspilskilder' : null;
  if (!seed) {
    sameSeasonReviews.push({ season: candidates[0].season, season_start: candidates[0].season_start,
      normalized_identity: candidates[0].normalized_identity, reason: reviewReason, source_rows: candidates.map(contextFrom) });
    continue;
  }
  canonicalNodes.push({
    id: nodeId(seed.season, seed.normalized_identity), season: seed.season, season_start: seed.season_start,
    team: seed.team, level: seed.level, position: seed.position, normalized_identity: seed.normalized_identity,
    canonical_source: ground.length === 1 ? 'grundspil' : 'ikke_grundspil', canonical_source_row_index: seed.source_row_index,
    source_keys: candidates.map(row => row.source_key), source_context: candidates.map(contextFrom),
    additional_context: candidates.filter(row => row !== seed).map(contextFrom),
  });
}

const canonicalBySeasonAndIdentity = new Map(canonicalNodes.map(node => [`${node.season_start}|${node.normalized_identity}`, node]));
const unresolvedKeys = new Set(sameSeasonReviews.map(review => `${review.season_start}|${review.normalized_identity}`));
const automaticEdges = [];
const ambiguityReviews = [...sameSeasonReviews];
for (const node of canonicalNodes) {
  const currentKey = `${node.season_start}|${node.normalized_identity}`;
  const nextKey = `${node.season_start + 1}|${node.normalized_identity}`;
  const next = canonicalBySeasonAndIdentity.get(nextKey);
  if (next && !unresolvedKeys.has(currentKey) && !unresolvedKeys.has(nextKey)) {
    automaticEdges.push({ from_id: node.id, to_id: next.id, from_source_keys: node.source_keys, to_source_keys: next.source_keys,
      normalized_identity: node.normalized_identity, method: 'exact_normalized_club_and_team_number_after_same_season_collapse' });
  } else if (unresolvedKeys.has(nextKey)) {
    ambiguityReviews.push({ season: node.season, normalized_identity: node.normalized_identity,
      reason: 'næste_sæson_har_ikke_entydig_kanonisk_kilde', source_rows: node.source_context });
  }
}

const outgoing = new Map(automaticEdges.map(edge => [edge.from_id, edge.to_id]));
const incoming = new Set(automaticEdges.map(edge => edge.to_id));
const nodeById = new Map(canonicalNodes.map(node => [node.id, node]));
const threads = [];
const visited = new Set();
for (const node of canonicalNodes) {
  if (incoming.has(node.id) || visited.has(node.id)) continue;
  const members = []; let current = node;
  while (current && !visited.has(current.id)) { visited.add(current.id); members.push(current); current = nodeById.get(outgoing.get(current.id)); }
  threads.push({ thread_id: `auto-${String(threads.length + 1).padStart(4, '0')}`,
    match_method: members.length > 1 ? 'exact_normalized_club_and_team_number_after_same_season_collapse' : 'ingen_entydig_nabo_match', members });
}
for (const node of canonicalNodes) if (!visited.has(node.id)) threads.push({ thread_id: `auto-${String(threads.length + 1).padStart(4, '0')}`,
  match_method: 'cycle_or_unexpected_input_review', members: [node] });

const referenceEdges = [];
for (const chain of reference.kaeder ?? []) for (let i = 0; i < chain.length - 1; i += 1) {
  const from = chain[i], to = chain[i + 1];
  referenceEdges.push({ from: { season: from.saeson, team: from.hold, level: from.niveau }, to: { season: to.saeson, team: to.hold, level: to.niveau } });
}
const automaticEdgeSourceKeys = new Set(automaticEdges.flatMap(edge => edge.from_source_keys.flatMap(from => edge.to_source_keys.map(to => `${from}=>${to}`))));
const validation = referenceEdges.map(edge => {
  const from = `${edge.from.season}|${edge.from.team}|${edge.from.level}`;
  const to = `${edge.to.season}|${edge.to.team}|${edge.to.level}`;
  return { normalized_match: normalizedIdentity(edge.from.team) === normalizedIdentity(edge.to.team), proposed_automatically: automaticEdgeSourceKeys.has(`${from}=>${to}`) };
});
const collapsedGroups = canonicalNodes.filter(node => node.source_context.length > 1);
const nationalLevels = ['Ligaen', '1. division', '2. division', '3. division', 'Danmarksserien'];
const higherTierLevels = new Set(['Ligaen', '1. division', '2. division', '3. division']);
const ambiguityReviewsByLevel = Object.fromEntries(nationalLevels.map(level => [level, 0]));
for (const review of ambiguityReviews) {
  for (const level of new Set((review.source_rows ?? []).map(row => row.level).filter(Boolean))) {
    if (Object.hasOwn(ambiguityReviewsByLevel, level)) ambiguityReviewsByLevel[level] += 1;
  }
}

// A break is deliberately measured on the exact normalized identity, without
// alias inference: this makes one missing season auditable rather than guessed.
const nodesByIdentity = new Map();
for (const node of canonicalNodes) {
  if (!nodesByIdentity.has(node.normalized_identity)) nodesByIdentity.set(node.normalized_identity, []);
  nodesByIdentity.get(node.normalized_identity).push(node);
}
const allDhTableBreaks = [];
const higherTierGaps = [];
for (const [identity, nodes] of nodesByIdentity) {
  nodes.sort((a, b) => a.season_start - b.season_start);
  if (!nodes.some(node => higherTierLevels.has(node.level))) continue;
  for (let index = 0; index < nodes.length - 1; index += 1) {
    const from = nodes[index], to = nodes[index + 1];
    const missingSeasons = to.season_start - from.season_start - 1;
    if (missingSeasons > 0) allDhTableBreaks.push({ normalized_identity: identity,
      from: { season: from.season, team: from.team, level: from.level },
      to: { season: to.season, team: to.team, level: to.level }, missing_seasons: missingSeasons,
      gap_type: missingSeasons === 1 ? 'et_saeson_hul' : 'laengere_hul' });
  }
  const higherNodes = nodes.filter(node => higherTierLevels.has(node.level));
  for (let index = 0; index < higherNodes.length - 1; index += 1) {
    const from = higherNodes[index], to = higherNodes[index + 1];
    const missingHigherSeasons = to.season_start - from.season_start - 1;
    if (missingHigherSeasons <= 0) continue;
    const intervening = nodes.filter(node => node.season_start > from.season_start && node.season_start < to.season_start);
    const onlyDanmarksserien = intervening.length === missingHigherSeasons && intervening.every(node => node.level === 'Danmarksserien');
    higherTierGaps.push({ normalized_identity: identity,
      from: { season: from.season, team: from.team, level: from.level },
      to: { season: to.season, team: to.team, level: to.level }, missing_higher_seasons: missingHigherSeasons,
      explanation_from_expanded_table: onlyDanmarksserien ? 'danmarksserien_udflugt' : 'ikke_synlig_i_nationalt_dh_datasæt',
      intervening_nodes: intervening.map(node => ({ season: node.season, team: node.team, level: node.level })) });
  }
}
const breakSummary = breaks => ({ total: breaks.length,
  one_season_gap: breaks.filter(item => (item.missing_seasons ?? item.missing_higher_seasons) === 1).length,
  longer_gap: breaks.filter(item => (item.missing_seasons ?? item.missing_higher_seasons) > 1).length });
const output = {
  generated_at: new Date().toISOString(),
  source: { path: sourcePath, sha256: crypto.createHash('sha256').update(sourceText).digest('hex'), row_count: sourceRows.length, season_range: ['2010/2011', '2026/2027'] },
  matching_rule: { description: 'Normalisér til klub + holdnummer; intet tal betyder 1. Fjern kun (O)/(N)/(M)-suffix. Kollapsér kilder i samme sæson til én knude ved at foretrække group_type_katalog=grundspil. Forbind derefter kun entydige identiteter i direkte efterfølgende sæsoner.', sponsor_aliases_applied: false, ambiguous_matches_are_automatic: false },
  validation_against_confirmed_threads: { reference_thread_count: reference.antal_traade, reference_edge_count: referenceEdges.length,
    normalized_rule_matches: validation.filter(result => result.normalized_match).length,
    proposed_automatically: validation.filter(result => result.proposed_automatically).length,
    unmatched_reference_edges: validation.filter(result => !result.proposed_automatically).length },
  summary: { source_rows: sourceRows.length, canonical_season_nodes: canonicalNodes.length,
    same_season_duplicate_collapses: collapsedGroups.length, collapsed_source_rows: collapsedGroups.reduce((count, node) => count + node.additional_context.length, 0),
    same_season_ambiguity_count: sameSeasonReviews.length, cross_season_ambiguity_count: ambiguityReviews.length - sameSeasonReviews.length,
    ambiguity_reviews_by_level: ambiguityReviewsByLevel,
    automatic_edge_count: automaticEdges.length, thread_count: threads.length,
    multi_member_thread_count: threads.filter(thread => thread.members.length > 1).length,
    standalone_node_count: threads.filter(thread => thread.members.length === 1).length,
    exact_identity_breaks_for_teams_seen_in_3div_or_higher: breakSummary(allDhTableBreaks),
    higher_tier_only_gaps_for_teams_seen_in_3div_or_higher: breakSummary(higherTierGaps) },
  threads, automatic_edges: automaticEdges, ambiguity_reviews: ambiguityReviews,
  exact_identity_breaks_for_teams_seen_in_3div_or_higher: allDhTableBreaks,
  higher_tier_only_gaps_for_teams_seen_in_3div_or_higher: higherTierGaps,
};
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ source_rows: output.summary.source_rows, canonical_season_nodes: output.summary.canonical_season_nodes,
  same_season_duplicate_collapses: output.summary.same_season_duplicate_collapses, collapsed_source_rows: output.summary.collapsed_source_rows,
  same_season_ambiguities: output.summary.same_season_ambiguity_count, cross_season_ambiguities: output.summary.cross_season_ambiguity_count,
  ambiguity_reviews_by_level: output.summary.ambiguity_reviews_by_level,
  exact_identity_breaks: output.summary.exact_identity_breaks_for_teams_seen_in_3div_or_higher,
  higher_tier_only_gaps: output.summary.higher_tier_only_gaps_for_teams_seen_in_3div_or_higher,
  automatic_edges: output.summary.automatic_edge_count, threads: output.summary.thread_count, validation: output.validation_against_confirmed_threads }, null, 2));
