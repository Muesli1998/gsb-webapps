import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const nationalSourcePath = 'statistik/results/089-liga-1div-revisionstabel.json';
const nationalBaselinePath = 'statistik/results/092-traadmatching-forslag.json';
const outputPath = 'statistik/results/101-koebenhavn-traadmatching.json';
const reportPath = 'statistik/results/101-koebenhavn-traadmatching.md';
const nationalSourceText = fs.readFileSync(nationalSourcePath, 'utf8');
const nationalSource = JSON.parse(nationalSourceText);
const nationalBaseline = JSON.parse(fs.readFileSync(nationalBaselinePath, 'utf8'));
const db = new DatabaseSync(path.resolve('statistik/data/liga-landskab.db'), { readOnly: true });

const seasonStart = season => Number(String(season).slice(0, 4));
const seasonLabel = season => `${season}/${season + 1}`;
const normalizeText = text => String(text ?? '')
  .replace(/&#216;/giu, 'Ø').replace(/&#248;/giu, 'ø')
  .replace(/\s+/gu, ' ').trim().toLocaleLowerCase('da-DK');
const normalizedIdentity = teamName => {
  const name = String(teamName ?? '').trim()
    .replace(/\s*\((?:O|N|M)\)\s*$/iu, '')
    .replace(/\s+(?:udgået|trukket)\s*$/iu, '')
    .replace(/\s+/gu, ' ').trim();
  const match = name.match(/^(.*?)(?:\s+(\d+))?$/u);
  return `${match[1].trim().toLocaleLowerCase('da-DK')} | ${match[2] ?? '1'}`;
};

// Versioneret og bevidst kun for region 8. "Serie"-rækker kortlægges
// mekanisk efter deres rå nummer; deres indbyrdes styrke fortolkes ikke.
const copenhagenMapping = [
  { from: 2011, to: 2017, family: 'KS-familien', pattern: '^ks-(pulje|serie) <nummer> eller ks-p<number>', level: 'København topserie' },
  { from: 2018, to: 2021, family: 'KBH Serien', pattern: '^kbh serien(?:\\s+p\\d+)?$', level: 'København topserie' },
  { from: 2022, to: 2026, family: 'Københavnsserien', pattern: '^københavnsserien$', level: 'København topserie' },
  { from: 2011, to: 2026, family: 'nummereret Serie', pattern: 'nummer før eller efter Serie, evt. SEN- eller P-suffix', level: 'København Serie {nummer}' },
];

function regionalLevel(season, divisionName) {
  const division = normalizeText(divisionName);
  if (season >= 2011 && season <= 2017 && /^ks(?:[-\s]*(?:pulje|serie)(?:\s+p?\d+)?|[-\s]*p\d+)$/u.test(division)) return 'København topserie';
  if (season >= 2018 && season <= 2021 && /^kbh serien(?:\s+p\d+)?$/u.test(division)) return 'København topserie';
  if (season >= 2022 && season <= 2026 && /^københavnsserien$/u.test(division)) return 'København topserie';
  const series = division.match(/^(?:sen\s+)?(?:(\d+)\.?\s*serie|serie\s*(\d+))(?:\s+p\d+)?$/u);
  const number = series?.[1] ?? series?.[2];
  return number ? `København Serie ${Number(number)}` : null;
}

const regionalRawRows = db.prepare(`
  SELECT DISTINCT g.season_id, g.league_group_id, g.division_name_raw, g.group_name_raw,
         t.team_name_raw, t.standing_position, k.group_type
  FROM league_groups g
  JOIN league_group_regions r
    ON r.season_id = g.season_id AND r.league_group_id = g.league_group_id
  JOIN league_group_teams t
    ON t.season_id = g.season_id AND t.league_group_id = g.league_group_id
  LEFT JOIN group_type_katalog k
    ON k.division_name_raw = COALESCE(g.division_name_raw, '')
   AND k.group_name_raw = COALESCE(g.group_name_raw, '')
  WHERE g.age_group_id = 1
    AND r.region_id = 8
    AND COALESCE(k.group_type, 'andet/ukendt') = 'grundspil'
  ORDER BY g.season_id, g.league_group_id, t.team_name_raw
`).all();
db.close();

const excludedRegionalRows = [];
const regionalRows = [];
for (const row of regionalRawRows) {
  const division = normalizeText(row.division_name_raw);
  if (/slutspil/u.test(division)) {
    excludedRegionalRows.push({ ...row, reason: 'division_name_angiver_slutspil' });
    continue;
  }
  const level = regionalLevel(row.season_id, row.division_name_raw);
  if (!level) continue;
  regionalRows.push({
    season: seasonLabel(row.season_id), season_start: row.season_id, team: row.team_name_raw,
    level, position: row.standing_position ?? 'ikke fundet', event: '', normalized_identity: normalizedIdentity(row.team_name_raw),
    source_scope: 'København', source_group_id: row.league_group_id, source_group_type: row.group_type,
    source_division_name_raw: row.division_name_raw, source_group_name_raw: row.group_name_raw,
    source_key: `København|${row.season_id}|${row.league_group_id}|${row.team_name_raw}`,
  });
}

const nationalRows = nationalSource.rows.map((row, index) => ({
  season: row['sæson'], season_start: seasonStart(row['sæson']), team: row.hold,
  level: row.niveau_denne_sæson, position: row.placering, event: row.hændelse,
  normalized_identity: normalizedIdentity(row.hold), source_scope: 'DH', source_group_id: row.source_league_group_id,
  source_group_type: row.source_group_type, source_division_name_raw: null, source_group_name_raw: row.source_group_name_raw,
  source_key: `DH|${index}|${row.source_league_group_id}|${row.hold}`,
}));

const sourceRows = [...nationalRows, ...regionalRows];
const bySeasonIdentity = new Map();
for (const row of sourceRows) {
  const key = `${row.season_start}|${row.normalized_identity}`;
  if (!bySeasonIdentity.has(key)) bySeasonIdentity.set(key, []);
  bySeasonIdentity.get(key).push(row);
}
const context = row => ({
  source_scope: row.source_scope, source_group_id: row.source_group_id, source_group_type: row.source_group_type,
  source_division_name_raw: row.source_division_name_raw, source_group_name_raw: row.source_group_name_raw,
  level: row.level, team: row.team, position: row.position, event: row.event,
});

const canonicalNodes = [];
const ambiguityReviews = [];
for (const candidates of bySeasonIdentity.values()) {
  if (candidates.length !== 1) {
    ambiguityReviews.push({ season: candidates[0].season, season_start: candidates[0].season_start,
      normalized_identity: candidates[0].normalized_identity, reason: 'flere_grundspilskilder_i_samme_sæson',
      source_rows: candidates.map(context) });
    continue;
  }
  const row = candidates[0];
  canonicalNodes.push({ id: `${row.season}|${row.normalized_identity}`, ...row, source_context: [context(row)] });
}

const nodeBySeasonIdentity = new Map(canonicalNodes.map(node => [`${node.season_start}|${node.normalized_identity}`, node]));
const unresolved = new Set(ambiguityReviews.map(review => `${review.season_start}|${review.normalized_identity}`));
const automaticEdges = [];
for (const node of canonicalNodes) {
  const next = nodeBySeasonIdentity.get(`${node.season_start + 1}|${node.normalized_identity}`);
  if (next && !unresolved.has(`${node.season_start}|${node.normalized_identity}`) && !unresolved.has(`${next.season_start}|${next.normalized_identity}`)) {
    automaticEdges.push({ from_id: node.id, to_id: next.id, normalized_identity: node.normalized_identity,
      from: { season: node.season, team: node.team, level: node.level, scope: node.source_scope },
      to: { season: next.season, team: next.team, level: next.level, scope: next.source_scope },
      method: 'eksakt_normaliseret_klub_og_holdnummer_efter_grundspil_filter' });
  }
}

const gsbIdentities = new Map();
for (const node of canonicalNodes.filter(node => /^gladsaxe søborg(?:\s|$)/iu.test(node.team))) {
  if (!gsbIdentities.has(node.normalized_identity)) gsbIdentities.set(node.normalized_identity, []);
  gsbIdentities.get(node.normalized_identity).push(node);
}
const confirmedGsbPauses = new Map([
  ['gladsaxe søborg | 4|2015|2023', {
    status: 'bekræftet_ægte_pause_ikke_matchingfejl',
    source: 'Chris via Claude, 2026-09-26: hold 4 eksisterede ikke i 2016/17–2022/23',
  }],
]);
const gsbThreads = [];
for (const [identity, nodes] of gsbIdentities) {
  nodes.sort((left, right) => left.season_start - right.season_start);
  const gaps = [];
  for (let index = 0; index < nodes.length - 1; index += 1) {
    const from = nodes[index], to = nodes[index + 1];
    const missing = to.season_start - from.season_start - 1;
    if (missing > 0) {
      const confirmation = confirmedGsbPauses.get(`${identity}|${from.season_start}|${to.season_start}`);
      gaps.push({ from: { season: from.season, team: from.team, level: from.level, scope: from.source_scope },
      to: { season: to.season, team: to.team, level: to.level, scope: to.source_scope }, missing_seasons: missing,
      status: confirmation?.status ?? 'kræver_Christoffers_gennemgang_ingen_kildeevidens_for_årsag',
      source: confirmation?.source ?? 'ingen kildeevidens for årsag' });
    }
  }
  gsbThreads.push({ normalized_identity: identity, observed_team_names: [...new Set(nodes.map(node => node.team))],
    season_count: nodes.length, first_season: nodes[0].season, last_season: nodes.at(-1).season,
    nodes: nodes.map(node => ({ season: node.season, team: node.team, level: node.level, scope: node.source_scope })),
    gaps, status: gaps.length ? (gaps.every(gap => gap.status === 'bekræftet_ægte_pause_ikke_matchingfejl')
      ? 'sammenhængende_med_bekræftet_ægte_pause' : 'brud_flagget_uden_gæt') : 'sammenhængende_mellem_observerede_sæsoner' });
}
gsbThreads.sort((left, right) => left.normalized_identity.localeCompare(right.normalized_identity, 'da'));

const gsbTransitions = automaticEdges.filter(edge => /^gladsaxe søborg(?:\s|$)/iu.test(edge.from.team)
  && edge.from.scope !== edge.to.scope);
const gsbAmbiguities = ambiguityReviews.filter(review => /^gladsaxe søborg(?:\s|$)/iu.test(review.normalized_identity));
const nationalValidation = nationalBaseline.validation_against_confirmed_threads;
const output = {
  source: { national_089_sha256: crypto.createHash('sha256').update(nationalSourceText).digest('hex'), national_row_count: nationalRows.length,
    regional_raw_ground_rows: regionalRawRows.length, regional_mapped_rows: regionalRows.length },
  mapping: { region_id: 8, version: '2026-09-26', entries: copenhagenMapping,
    excluded_scope: ['Kredsserien Vest', 'Bornholmsserien', 'region_id != 8'], excluded_regional_rows: excludedRegionalRows },
  summary: { combined_source_rows: sourceRows.length, canonical_nodes: canonicalNodes.length,
    regional_canonical_nodes: canonicalNodes.filter(node => node.source_scope === 'København').length,
    automatic_edges: automaticEdges.length, ambiguity_reviews: ambiguityReviews.length,
    national_baseline_092: { proposed_automatically: nationalValidation.proposed_automatically, reference_edge_count: nationalValidation.reference_edge_count,
      national_row_count: nationalBaseline.summary.source_rows } },
  gsb_senior_control: { name: 'GSB seniorhold: DH + København, kontinuitet mellem observerede sæsoner',
    total_threads: gsbThreads.length, continuous_threads: gsbThreads.filter(thread => thread.gaps.length === 0).length,
    threads_with_breaks: gsbThreads.filter(thread => thread.gaps.length > 0).length,
    confirmed_true_pauses: gsbThreads.flatMap(thread => thread.gaps).filter(gap => gap.status === 'bekræftet_ægte_pause_ikke_matchingfejl').length,
    unexplained_breaks: gsbThreads.flatMap(thread => thread.gaps).filter(gap => gap.status !== 'bekræftet_ægte_pause_ikke_matchingfejl').length,
    flagged_breaks: gsbThreads.flatMap(thread => thread.gaps.map(gap => ({ normalized_identity: thread.normalized_identity, ...gap }))),
    same_season_ambiguities: gsbAmbiguities, dh_københavn_transitions: gsbTransitions, threads: gsbThreads },
  nodes: canonicalNodes, automatic_edges: automaticEdges, ambiguity_reviews: ambiguityReviews,
};
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);

const gsb = output.gsb_senior_control;
const line = value => `| ${value.join(' | ')} |`;
const report = [
  '# Opgave 101 — København-trådmatching med GSB-kontrol', '',
  '## Metode', '',
  'Kun `region_id=8` og `age_group_id=1` læses fra de regionale data. 089s eksisterende DH-rækker læses uændret og kombineres med København-rækker, der både er `grundspil` i kataloget og passer en eksplicit periode-mapping. Kvalifikation, oprykning og nedrykning bliver dermed kontekst, ikke selvstændige hjemmeniveauer.', '',
  '## Versioneret København-mapping', '',
  line(['Sæsoner', 'Rå familie', 'Niveau']),
  line(['---', '---', '---']),
  ...copenhagenMapping.map(entry => line([`${entry.from}/${entry.to + 1}`, entry.family, entry.level])), '',
  'Nummererede `Serie`-navne beholdes som deres rå nummer (fx `København Serie 30`); der udledes ingen uprøvet styrkerækkefølge af tallet.', '',
  '## Samlet resultat', '',
  line(['Mål', 'Antal']), line(['---', '---:']),
  line(['DH-kilder fra 089', nationalRows.length]), line(['København-kilder efter mapping', regionalRows.length]),
  line(['Kanoniske sæsonknuder', canonicalNodes.length]), line(['Automatiske nabosæson-kanter', automaticEdges.length]),
  line(['Samme-sæson ambiguity reviews', ambiguityReviews.length]),
  line(['København-rækker fravalgt som eksplicit slutspil', excludedRegionalRows.length]), '',
  '## Navngiven accepttest — GSB seniorhold: DH + København', '',
  line(['Kontrol', 'Antal']), line(['---', '---:']),
  line(['GSB-holdtråde', gsb.total_threads]), line(['Sammenhængende mellem observerede sæsoner', gsb.continuous_threads]),
  line(['Tråde med internt sæsonbrud', gsb.threads_with_breaks]), line(['Bekræftede ægte pauser', gsb.confirmed_true_pauses]),
  line(['Uforklarede brud', gsb.unexplained_breaks]),
  line(['GSB same-season ambiguity reviews', gsb.same_season_ambiguities.length]), line(['Automatiske DH↔København-overgange', gsb.dh_københavn_transitions.length]), '',
  gsb.flagged_breaks.length === 0
    ? 'Alle GSB-tråde er sammenhængende mellem deres første og sidste observerede sæson i den kombinerede DH- og København-population. Endepunkter vurderes ikke som brud, fordi datakilden alene ikke viser, om et hold ophørte eller blot endnu ikke var oprettet.'
    : 'GSB hold 4s eneste interne brud er bekræftet som en ægte pause, ikke en matchingfejl, af Chris via Claude 2026-09-26. Endepunkter vurderes ikke som brud, fordi datakilden alene ikke viser, om et hold ophørte eller blot endnu ikke var oprettet.', '',
  '## GSB-tråde', '',
  line(['Normaliseret identitet', 'Observerede sæsoner', 'Første–sidste', 'Status']), line(['---', '---:', '---', '---']),
  ...gsb.threads.map(thread => line([thread.normalized_identity.replace(' | ', ' hold '), thread.season_count, `${thread.first_season}–${thread.last_season}`, thread.status])), '',
  '## GSB-flaggede brud', '',
  line(['Hold', 'Fra', 'Til', 'Manglende sæsoner', 'Klassifikation', 'Kilde']), line(['---', '---', '---', '---:', '---', '---']),
  ...(gsb.flagged_breaks.length ? gsb.flagged_breaks.map(gap => line([
    gap.normalized_identity.replace(' | ', ' hold '), `${gap.from.season} (${gap.from.level})`, `${gap.to.season} (${gap.to.level})`, gap.missing_seasons,
    gap.status, gap.source,
  ])) : [line(['Ingen', '', '', '0', '', ''])]), '',
  '## GSB same-season-uklarheder', '',
  line(['Sæson', 'Hold', 'Gemte grundspilskilder']), line(['---', '---', '---']),
  ...(gsb.same_season_ambiguities.length ? gsb.same_season_ambiguities.map(review => line([
    review.season, review.normalized_identity.replace(' | ', ' hold '),
    review.source_rows.map(row => `${row.team}: ${row.source_division_name_raw} (${row.source_group_id})`).join('; '),
  ])) : [line(['Ingen', '', ''])]), '',
  '## Værn', '',
  `- 092s eksisterende DH-facit er læst, ikke regenereret: ${nationalValidation.proposed_automatically}/${nationalValidation.reference_edge_count} automatiske kanter og ${nationalBaseline.summary.source_rows} kilder i baseline.`,
  '- Mappingen indeholder kun `region_id=8`; den indeholder ingen Kredsserie Vest- eller Bornholmsserie-rækker.',
  '- Databaserne åbnes read-only. Hash-kontrol før/efter dokumenteres i opgavekortet.', '',
].join('\n');
fs.writeFileSync(reportPath, `${report}\n`);
console.log(JSON.stringify({ summary: output.summary, gsb_senior_control: {
  total_threads: gsb.total_threads, continuous_threads: gsb.continuous_threads,
  threads_with_breaks: gsb.threads_with_breaks, confirmed_true_pauses: gsb.confirmed_true_pauses,
  unexplained_breaks: gsb.unexplained_breaks, flagged_breaks: gsb.flagged_breaks.length,
  same_season_ambiguities: gsb.same_season_ambiguities, dh_københavn_transitions: gsb.dh_københavn_transitions.length,
} }, null, 2));
