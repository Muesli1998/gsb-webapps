import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const nationalSourcePath = 'statistik/results/089-liga-1div-revisionstabel.json';
const dagPath = 'statistik/results/105-national-styrke-dag.json';
const baselinePath = 'statistik/results/092-traadmatching-forslag.json';
const outputJsonPath = 'statistik/results/107-holdtracking-over-regionsgraenser.json';
const outputMarkdownPath = 'statistik/results/107-holdtracking-over-regionsgraenser.md';
const nationalText = fs.readFileSync(nationalSourcePath, 'utf8');
const nationalSource = JSON.parse(nationalText);
const dag = JSON.parse(fs.readFileSync(dagPath, 'utf8'));
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));

const seasonStart = (value) => Number(String(value).slice(0, 4));
const seasonLabel = (value) => `${value}/${value + 1}`;
const normalizedName = (value) => String(value ?? '').normalize('NFC').replace(/\s+/gu, ' ').trim();
const withoutMarker = (value) => normalizedName(value).replace(/\s*\((?:O|N|M)\)\s*$/iu, '').replace(/\s+(?:udgået|trukket)\s*$/iu, '').trim();
const splitTeam = (value) => {
  const match = withoutMarker(value).match(/^(.*?)(?:\s+(\d+))?$/u);
  return { club: match?.[1]?.trim() ?? '', teamNumber: Number(match?.[2] ?? 1) };
};
const normalizeIdentity = (value) => {
  const team = splitTeam(value);
  return `${team.club.toLocaleLowerCase('da-DK')} | ${team.teamNumber}`;
};
// 087 method B: no invented aliases; punctuation/BK spelling only.
const canonicalIdentity = (value) => {
  const team = splitTeam(value);
  const club = team.club.toLocaleLowerCase('da-DK').replace(/[.]+/gu, '').replace(/\b(bk|b k)\b/giu, 'bk').replace(/\s+/gu, ' ').trim();
  return `${club} | ${team.teamNumber}`;
};
const canonicalClub = (value) => canonicalIdentity(value).replace(/\s+\|\s+\d+$/u, '');

const mappings = [
  { key: 'Sjælland', regionIds: [10], from: 2011, to: 2026, patterns: [/^sjællandsserien$/iu], level: 'Sjælland topserie', dagNode: 'regional_strukturel|Sjællandsserien' },
  { key: 'Lolland-Falster', regionIds: [9], from: 2011, to: 2026, patterns: [/^lf[ -]?serien$/iu], level: 'LF topserie', dagNode: 'regional_strukturel|LF-Serien' },
  { key: 'Bornholm', regionIds: [3], from: 2011, to: 2015, patterns: [/^bornholmsserien$/iu], level: 'Bornholm topserie', dagNode: 'regional_strukturel|Bornholmsserien' },
  { key: 'Kredsserie Vest', regionIds: [4, 5, 6, 7], from: 2016, to: 2026, patterns: [/^kredsserien? vest$/iu], level: 'Kredsserie Vest topserie', dagNode: 'regional_strukturel|Kredsserie Vest' },
];

const dagNodes = new Map(dag.nodes.map((node) => [node.id, node]));
const regionalDagEdges = dag.edges.filter((edge) => edge.edge_type === 'strukturel_regeltekst_regional');
for (const mapping of mappings) {
  if (!dagNodes.has(mapping.dagNode) || !regionalDagEdges.some((edge) => edge.weaker_node_id === mapping.dagNode)) {
    throw new Error(`105 structural edge missing for ${mapping.key}`);
  }
}

const db = new DatabaseSync(path.resolve('statistik/data/liga-landskab.db'), { readOnly: true });
const regionalRaw = db.prepare(`
  SELECT DISTINCT g.season_id, g.league_group_id, g.division_name_raw, g.group_name_raw,
         t.team_name_raw, t.standing_position, COALESCE(k.group_type, 'andet/ukendt') AS group_type,
         r.region_id
  FROM league_groups g
  JOIN league_group_regions r
    ON r.season_id = g.season_id AND r.league_group_id = g.league_group_id
  JOIN league_group_teams t
    ON t.season_id = g.season_id AND t.league_group_id = g.league_group_id
  LEFT JOIN group_type_katalog k
    ON k.division_name_raw = COALESCE(g.division_name_raw, '')
   AND k.group_name_raw = COALESCE(g.group_name_raw, '')
  WHERE g.age_group_id = 1 AND COALESCE(k.group_type, 'andet/ukendt') = 'grundspil'
`).all();
db.close();

// Kredsserie Vest har samme pulje knyttet til alle fire vestlige region-id'er.
// En sæson/pulje/hold-node skal derfor kun tælles én gang i dens fælles række.
const regionalRowsBySource = new Map();
for (const row of regionalRaw) {
  const mapping = mappings.find((candidate) => candidate.regionIds.includes(row.region_id)
    && row.season_id >= candidate.from && row.season_id <= candidate.to
    && candidate.patterns.some((pattern) => pattern.test(normalizedName(row.division_name_raw))));
  if (!mapping) continue;
  const sourceKey = `${mapping.key}|${row.season_id}|${row.league_group_id}|${row.team_name_raw}`;
  const existing = regionalRowsBySource.get(sourceKey);
  if (existing) {
    if (!existing.region_ids.includes(row.region_id)) existing.region_ids.push(row.region_id);
    continue;
  }
  regionalRowsBySource.set(sourceKey, {
    scope: mapping.key, season_start: row.season_id, season: seasonLabel(row.season_id), team: row.team_name_raw,
    level: mapping.level, source_group_id: row.league_group_id, source_division_name_raw: row.division_name_raw,
    source_group_name_raw: row.group_name_raw, region_id: row.region_id, region_ids: [row.region_id], position: row.standing_position ?? null,
    normalized_identity: normalizeIdentity(row.team_name_raw), canonical_identity: canonicalIdentity(row.team_name_raw),
    canonical_club: canonicalClub(row.team_name_raw), team_number: splitTeam(row.team_name_raw).teamNumber,
    structural_edge: mapping.dagNode,
  });
}
const regionalRows = [...regionalRowsBySource.values()];

const nationalRows = nationalSource.rows.map((row, index) => ({
  scope: 'DH', season_start: seasonStart(row['sæson']), season: row['sæson'], team: row.hold,
  level: row.niveau_denne_sæson, source_group_id: row.source_league_group_id,
  source_division_name_raw: null, source_group_name_raw: row.source_group_name_raw ?? null, region_id: 1,
  position: row.placering ?? null, normalized_identity: normalizeIdentity(row.hold), canonical_identity: canonicalIdentity(row.hold),
  canonical_club: canonicalClub(row.hold), team_number: splitTeam(row.hold).teamNumber, source_index: index,
})).filter((row) => row.level === 'Danmarksserien' || row.level === '3. division');

const regionSummaries = {};
const transitions = [];
const ambiguityReviews = [];
for (const mapping of mappings) {
  const regional = regionalRows.filter((row) => row.scope === mapping.key);
  const relevantNational = nationalRows.filter((row) => row.level === 'Danmarksserien' || row.level === '3. division');
  const found = [];
  const unresolved = [];
  const seen = new Set();
  const addTransition = (from, to, direction) => {
    const key = `${mapping.key}|${from.season_start}|${from.team}|${to.season_start}|${to.team}`;
    if (seen.has(key)) return;
    seen.add(key);
    const exact = from.normalized_identity === to.normalized_identity;
    const canonical = from.canonical_identity === to.canonical_identity;
    // 087's cautious C signal: same canonical club and old n+1 becomes n.
    const numberShift = from.canonical_club === to.canonical_club && from.team_number === to.team_number + 1;
    const candidates = exact ? [to] : canonical ? [to] : numberShift ? [to] : [];
    const method = exact ? 'A_eksakt_klub_og_holdnummer' : canonical ? 'B_canonicaliseret_navn' : numberShift ? 'C_n_til_n_minus_1_holdnummer' : 'ingen';
    if (!candidates.length) return;
    const record = { region: mapping.key, direction, from: { season: from.season, team: from.team, level: from.level, scope: from.scope }, to: { season: to.season, team: to.team, level: to.level, scope: to.scope }, method, structural_edge: mapping.dagNode,
      family_transition_allowed: ['Lolland-Falster', 'Bornholm'].includes(mapping.key), confidence: method === 'A_eksakt_klub_og_holdnummer' ? 'entydig' : 'signal_kræver_manuel_gennemgang' };
    if (record.confidence === 'entydig') found.push(record); else ambiguityReviews.push({ ...record, reason: 'metode_B_eller_C_er_ikke_alene_entydig_identitet' });
  };
  for (const regionalNode of regional) {
    const targets = relevantNational.filter((node) => node.season_start === regionalNode.season_start + 1);
    const candidates = targets.filter((node) => node.normalized_identity === regionalNode.normalized_identity
      || node.canonical_identity === regionalNode.canonical_identity
      || (node.canonical_club === regionalNode.canonical_club && regionalNode.team_number === node.team_number + 1));
    if (candidates.length === 1) addTransition(regionalNode, candidates[0], 'regional_til_DH');
    else if (candidates.length > 1) ambiguityReviews.push({ region: mapping.key, direction: 'regional_til_DH', from: regionalNode, candidates, reason: 'flere_metodekandidater' });
    else unresolved.push({ season: regionalNode.season, team: regionalNode.team, direction: 'regional_til_DH', reason: 'ingen_entydig_DH_kandidat_i_naeste_saeson' });
  }
  for (const nationalNode of relevantNational) {
    const targets = regional.filter((node) => node.season_start === nationalNode.season_start + 1);
    const candidates = targets.filter((node) => node.normalized_identity === nationalNode.normalized_identity
      || node.canonical_identity === nationalNode.canonical_identity
      || (node.canonical_club === nationalNode.canonical_club && nationalNode.team_number === node.team_number + 1));
    if (candidates.length === 1) addTransition(nationalNode, candidates[0], 'DH_til_regional');
    else if (candidates.length > 1) ambiguityReviews.push({ region: mapping.key, direction: 'DH_til_regional', from: nationalNode, candidates, reason: 'flere_metodekandidater' });
  }
  transitions.push(...found);
  regionSummaries[mapping.key] = {
    mapping: { region_ids: mapping.regionIds, season_interval: `${mapping.from}/${mapping.to + 1}`, raw_family_patterns: mapping.patterns.map(String), dag_node: mapping.dagNode },
    regional_source_nodes: regional.length,
    exact_found: found.length,
    exact_by_direction: Object.fromEntries(['regional_til_DH', 'DH_til_regional'].map((direction) => [direction, found.filter((item) => item.direction === direction).length])),
    by_method: { A: found.filter((item) => item.method.startsWith('A_')).length, B: ambiguityReviews.filter((item) => item.region === mapping.key && item.method?.startsWith('B_')).length, C: ambiguityReviews.filter((item) => item.region === mapping.key && item.method?.startsWith('C_')).length },
    ambiguous_or_signal_only: ambiguityReviews.filter((item) => item.region === mapping.key).length,
    unconfirmed_regional_to_DH: unresolved.length,
  };
}

const output = {
  generated_at: new Date().toISOString(),
  sources: {
    national_089_sha256: crypto.createHash('sha256').update(nationalText).digest('hex'),
    regional_structural_edges: regionalDagEdges.length,
    baseline_092: { reference_edges: baseline.validation_against_confirmed_threads.reference_edge_count, proposed_automatically: baseline.validation_against_confirmed_threads.proposed_automatically },
  },
  method: {
    A: 'Eksakt normaliseret klubnavn + samme holdnummer i direkte efterfølgende sæson.',
    B: '087-canonicalisering (NFC, whitespace, case og BK/punktuation), uden opfundne aliaser. Signal alene markeres til gennemgang.',
    C: '087-holdnummersignal: samme canonical klub og tidligere n+1 bliver n. Signal alene markeres til gennemgang.',
    family_rule: 'LF/Bornholm kan krydse familiegrænse kun via 105s regionale strukturelle regeltekst-kant; det er ikke en sportslig sammenligning.',
  },
  region_summaries: regionSummaries,
  confirmed_transitions: transitions,
  ambiguity_reviews: ambiguityReviews,
};
fs.writeFileSync(outputJsonPath, `${JSON.stringify(output, null, 2)}\n`);

const table = Object.entries(regionSummaries).map(([region, summary]) => `| ${region} | ${summary.regional_source_nodes} | ${summary.exact_found} | ${summary.by_method.A} | ${summary.by_method.B} | ${summary.by_method.C} | ${summary.ambiguous_or_signal_only} | ${summary.unconfirmed_regional_to_DH} |`).join('\n');
const sampleRows = transitions.length
  ? transitions.slice(0, 30).map((item) => `| ${item.region} | ${item.from.season} ${item.from.team} (${item.from.level}) | ${item.to.season} ${item.to.team} (${item.to.level}) | ${item.method} | ${item.direction} |`).join('\n')
  : '| Ingen entydige fund |  |  |  |  |';
const report = `# Opgave 107 — holdtracking over regionsgrænser

## Metode og afgrænsning

Hver region har en eksplicit, versioneret mapping fra (region_id, sæsoninterval, rå rækkenavn) til topniveau. Kun grundspilsrækker indgår. Der søges kun mellem to på hinanden følgende sæsoner, og kun hvor den ene side er regionens topserie og den anden Danmarksserien eller 3. division. Ingen alias er opfundet.

Metode A anvendes her som et strengt grænseanker: eksakt normaliseret klubnavn og samme holdnummer i den direkte næste sæson. Den fulde 087-kaskade bruges ikke til at udfylde ukendte lokale led, fordi denne opgave kun må bekræfte den konkrete dokumenterede regionsgrænse. Metode B og C registreres som signaler til manuel gennemgang, fordi 087 allerede viste, at de ikke alene er tilstrækkelige i den brede population. Ingen kandidat betyder ubekræftet, ikke at holdet beviseligt ophørte.

## Versionerede region-mappinger

| Region | region_id | Sæsoninterval | Rå række-familie | 105-strukturkant |
|---|---|---|---|---|
${Object.entries(regionSummaries).map(([region, summary]) => `| ${region} | ${summary.mapping.region_ids.join(', ')} | ${summary.mapping.season_interval} | ${summary.mapping.raw_family_patterns.join(', ')} | ${summary.mapping.dag_node} |`).join('\n')}

## Resultat pr. region

| Region | Regionale grundspilsknuder | Entydige fund | A | B-signal | C-signal | Flertydig/signal | Ubekræftet regional→DH |
|---|---:|---:|---:|---:|---:|---:|---:|
${table}

## Entydige overgange

| Region | Fra | Til | Metode | Retning |
|---|---|---|---|---|
${sampleRows}

## Spilleform og Bornholm/Lolland-Falster

Lolland-Falster og Bornholm behandles ikke som fejl, hvis en ellers entydig A-identitet går til/fra Danmarksserien med anden kategori-/spilleform-familie. Overgangen er kun tilladt i analysen, fordi 105's strukturel_regeltekst_regional-kant dokumenterer den organisatoriske oprykningsvej. Den bruges ikke til at sammenligne familier sportsligt.

Bornholms konkrete pladsbrug er ikke genstand for en særskilt historisk optælling her. Rapporten viser alene eventuelle konkrete nabosæson-spor på samme måde som de øvrige regioner.

## Begrænsning

087's kendte identitetsbegrænsning gælder fortsat. Denne rapport udvider ikke hold-ID-historik eller navnealiaser; ubekræftede og flertydige rækker bliver bevaret i JSON i stedet for tvunget til en tråd.

Maskinlæsbar rapport: [107-holdtracking-over-regionsgraenser.json](107-holdtracking-over-regionsgraenser.json).
`;
fs.writeFileSync(outputMarkdownPath, `${report}\n`);
console.log(JSON.stringify({ region_summaries: regionSummaries, confirmed_transitions: transitions.length, ambiguity_reviews: ambiguityReviews.length }, null, 2));
