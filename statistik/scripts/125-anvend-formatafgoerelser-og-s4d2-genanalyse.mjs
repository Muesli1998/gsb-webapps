import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const LIGA_DB = 'statistik/data/liga-landskab.db';
const NATIONAL_DB = 'statistik/data/national-spillere.db';
const GSB_DB = 'statistik/data/gsb-statistik-normalized.db';
const OUT_DIR = 'statistik/results/125-format-afgoerelser';
const YOUTH_AGE_IDS = new Set([2, 3, 4, 5, 6, 7, 18]);
const S4D2_SIGNATURE = '1. D · 1. S · 2. D · 2. S · 3. S · 4. S';

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function dbCounts(db) {
  return Object.fromEntries(['players', 'matches', 'player_matches', 'player_match_extras']
    .map((table) => [table, db.prepare(`SELECT COUNT(1) AS n FROM ${table}`).get().n]));
}

function categorySignature(values) {
  return [...values].sort((a, b) => a.localeCompare(b, 'da')).join(' · ') || 'ingen gemte kategorier';
}

function structuralFamily(values) {
  const counts = {};
  for (const value of values) {
    const match = value.match(/^\d+\.\s*([A-Z]+)$/iu);
    if (match) counts[match[1]] = (counts[match[1]] ?? 0) + 1;
  }
  const same = (expected) => Object.keys(counts).length === Object.keys(expected).length
    && Object.entries(expected).every(([key, count]) => counts[key] === count);
  if (same({ S: 4, D: 2 })) return '4 spillere-struktur';
  if (same({ S: 4, D: 1 })) return '3 spillere-struktur';
  if (same({ S: 4, D: 3 })) return '5 spillere-struktur';
  if (same({ MD: 2, DS: 2, DD: 1, HS: 2, HD: 2 })) return '4+3-struktur';
  if (same({ MD: 2, DS: 2, DD: 1, HS: 2, HD: 1 })) return '2+2-struktur';
  if (same({ MD: 1, DS: 1, DD: 1, HS: 3, HD: 2 })) return '4+2-struktur';
  if (same({ DS: 4, DD: 2 })) return '4 piger-struktur';
  return null;
}

function textVariant(rawText) {
  const text = rawText.toLowerCase().normalize('NFC');
  const patterns = [
    [/\b4\s*[-–]\s*8\s*spillere\b/iu, '4-8 spillere'],
    [/\b4\s*m\s*\/\s*k\b/iu, '4 m/k'],
    [/\b4\s*dr\s*hold\b/iu, '4 dr hold'],
    [/\b4\s*[bc]\s*spillere\b/iu, '4B/4C Spillere'],
    [/\b4\s*(?:spillere|sp\.)\b/iu, '4 spillere / 4 Sp.'],
    [/\b4\s*piger\b/iu, '4 piger'],
    [/\b3\s*spillere\b/iu, '3 spillere'],
    [/\b2\s*\+\s*2\b/iu, '2+2'],
    [/\b4\s*\+\s*3\b/iu, '4+3'],
    [/\b4\s*\+\s*2\b/iu, '4+2'],
    [/\bx1\b/iu, 'X1'],
    [/\bx2\b/iu, 'X2'],
    [/\([^)]*\b4\s*\)/iu, '(4)'],
  ];
  for (const [pattern, variant] of patterns) if (pattern.test(text)) return variant;
  return null;
}

function decisionFor(variant) {
  const decisions = {
    '(4)': { format: '4 spillere', source: 'Christoffers afgørelse' },
    '4 m/k': { format: '4 spillere', source: 'Christoffers afgørelse' },
    '4 spillere / 4 Sp.': { format: '4 spillere', source: 'utvetydig tekst' },
    '4B/4C Spillere': { format: '4 spillere', source: 'utvetydig tekst' },
    '4-8 spillere': { format: '4-8 spillere', source: 'Christoffers afgørelse' },
    '3 spillere': { format: '3 spillere', source: 'utvetydig tekst' },
    '2+2': { format: '2+2', source: 'utvetydig tekst' },
    '4+3': { format: '4+3', source: 'utvetydig tekst' },
    '4+2': { format: '4+2', source: 'utvetydig tekst' },
    X1: { format: 'X1', source: 'utvetydig tekst' },
    X2: { format: 'X2', source: 'utvetydig tekst' },
  };
  if (!variant) return { format: '4 spillere', source: 'Christoffers afgørelse: ingen formattekst, S4/D2-struktur' };
  if (variant === '4 piger') return { format: '4 piger', source: 'tekstsignal — kræver holdsidekontrol', requiresGenderEvidence: true };
  return decisions[variant] ?? { format: variant, source: 'egen tekstkategori', pending: true };
}

function classifySide(genders, unassignedRows) {
  if (unassignedRows > 0 || genders.length === 0) return 'ukendt køn';
  if (genders.some((gender) => gender !== 'mand' && gender !== 'kvinde')) return 'ukendt køn';
  if (genders.every((gender) => gender === 'kvinde')) return 'kun kvinder';
  if (genders.every((gender) => gender === 'mand')) return 'kun mænd';
  return 'blandet';
}

const beforeHashes = { liga_landsskabet: sha256(LIGA_DB), gsb_normaliseret: sha256(GSB_DB) };
const liga = new DatabaseSync(LIGA_DB, { readOnly: true });
const national = new DatabaseSync(NATIONAL_DB, { readOnly: true });
const nationalBefore = dbCounts(national);

const groups = liga.prepare(`
  SELECT season_id, age_group_id, league_group_id,
         COALESCE(division_name_raw, '') AS division_name_raw,
         COALESCE(group_name_raw, '') AS group_name_raw,
         COALESCE(page_title_raw, '') AS page_title_raw
  FROM league_groups
`).all();
const categoryRows = liga.prepare(`
  SELECT mg.season_id, mg.age_group_id, mg.league_group_id, trim(mc.category_raw) AS category_raw
  FROM league_match_groups mg
  JOIN match_categories mc ON mc.external_match_id = mg.external_match_id
  WHERE mc.category_raw IS NOT NULL AND trim(mc.category_raw) <> ''
`).all();
const categoriesByPool = new Map();
for (const row of categoryRows) {
  const key = `${row.season_id}|${row.age_group_id}|${row.league_group_id}`;
  const values = categoriesByPool.get(key) ?? new Set();
  values.add(row.category_raw);
  categoriesByPool.set(key, values);
}

const records = groups.map((group) => {
  const physical_pool_key = `${group.season_id}|${group.age_group_id}|${group.league_group_id}`;
  const categories = categoriesByPool.get(physical_pool_key) ?? new Set();
  const raw_text = [group.division_name_raw, group.group_name_raw, group.page_title_raw].filter(Boolean).join(' | ');
  const tekstvariant = textVariant(raw_text);
  const structural = structuralFamily(categories);
  const isS4D2 = YOUTH_AGE_IDS.has(group.age_group_id) && categorySignature(categories) === S4D2_SIGNATURE;
  const decision = isS4D2 ? decisionFor(tekstvariant) : null;
  const was_123_rest = isS4D2 && !/\b(?:4\s*spillere|4\s*piger|3\s*spillere|2\s*\+\s*2|4\s*\+\s*[23]|x[12])\b/iu.test(raw_text);
  return {
    ...group,
    physical_pool_key,
    raw_text,
    category_signature: categorySignature(categories),
    strukturfamilie: structural,
    tekstvariant,
    format: decision?.format ?? null,
    format_kilde: decision?.source ?? null,
    requires_gender_evidence: Boolean(decision?.requiresGenderEvidence),
    is_s4d2_youth: isS4D2,
    was_123_rest,
  };
});

const s4d2 = records.filter((record) => record.is_s4d2_youth);
const s4d2Keys = new Set(s4d2.map((record) => record.physical_pool_key));
const poolKeyByMatch = new Map();
for (const row of liga.prepare(`
  SELECT season_id, age_group_id, league_group_id, external_match_id
  FROM league_match_groups
`).all()) {
  const key = `${row.season_id}|${row.age_group_id}|${row.league_group_id}`;
  if (s4d2Keys.has(key)) poolKeyByMatch.set(String(row.external_match_id), key);
}
const matches = national.prepare(`
  SELECT external_match_id, context_raw, home_team_raw, away_team_raw
  FROM matches
`).all().filter((match) => poolKeyByMatch.has(String(match.external_match_id)));
const matchMeta = new Map(matches.map((match) => [String(match.external_match_id), match]));

const extras = national.prepare(`
  SELECT e.external_match_id, e.external_player_id, e.discipline_code, e.team_side, e.parse_status,
         p.gender_status
  FROM player_match_extras e
  JOIN players p ON p.external_player_id = e.external_player_id
  WHERE e.team_side IS NOT NULL
`).all().filter((row) => poolKeyByMatch.has(String(row.external_match_id)));
const playerRows = national.prepare(`
  SELECT external_match_id, external_player_id, discipline_code
  FROM player_matches
`).all().filter((row) => poolKeyByMatch.has(String(row.external_match_id)));

const assignedByMatchPlayerDiscipline = new Map();
const playersByMatchSide = new Map();
for (const row of extras) {
  const matchId = String(row.external_match_id);
  const playerKey = `${matchId}|${row.external_player_id}|${row.discipline_code ?? ''}`;
  assignedByMatchPlayerDiscipline.set(playerKey, row.team_side);
  const key = `${matchId}|${row.team_side}`;
  const players = playersByMatchSide.get(key) ?? new Map();
  if (!players.has(String(row.external_player_id))) players.set(String(row.external_player_id), row.gender_status);
  playersByMatchSide.set(key, players);
}
const unassignedByMatch = new Map();
for (const row of playerRows) {
  const key = `${row.external_match_id}|${row.external_player_id}|${row.discipline_code ?? ''}`;
  if (!assignedByMatchPlayerDiscipline.has(key)) {
    const matchId = String(row.external_match_id);
    unassignedByMatch.set(matchId, (unassignedByMatch.get(matchId) ?? 0) + 1);
  }
}

const byPool = new Map(s4d2.map((pool) => [pool.physical_pool_key, {
  pool,
  matches: new Map(),
  sides: { 'kun kvinder': 0, 'kun mænd': 0, blandet: 0, 'ukendt køn': 0 },
  knownGenderPlayers: 0,
  totalAssignedPlayers: 0,
  missingSidePlayerRows: 0,
}]));
for (const [matchId, poolKey] of poolKeyByMatch) {
  const bucket = byPool.get(poolKey);
  if (!bucket || !matchMeta.has(matchId)) continue;
  const missingSideRows = unassignedByMatch.get(matchId) ?? 0;
  const matchResult = { external_match_id: matchId, missing_team_side_player_rows: missingSideRows, sides: {} };
  for (const side of ['hjemme', 'ude']) {
    const players = playersByMatchSide.get(`${matchId}|${side}`) ?? new Map();
    const genders = [...players.values()];
    // An unassigned row is retained as explicit missing coverage, but not attached to a
    // particular home/away side because the source no longer supplies that relation.
    const classification = classifySide(genders, players.size === 0 ? missingSideRows : 0);
    bucket.sides[classification]++;
    bucket.totalAssignedPlayers += genders.length;
    bucket.knownGenderPlayers += genders.filter((gender) => gender === 'mand' || gender === 'kvinde').length;
    matchResult.sides[side] = { classification, player_count: genders.length, genders };
  }
  bucket.missingSidePlayerRows += missingSideRows;
  bucket.matches.set(matchId, matchResult);
}

function proposedGenderClass(bucket) {
  const total = Object.values(bucket.sides).reduce((sum, count) => sum + count, 0);
  const knownSides = total - bucket.sides['ukendt køn'];
  const coverage = total ? knownSides / total : 0;
  const womenShare = knownSides ? bucket.sides['kun kvinder'] / knownSides : 0;
  if (coverage >= 0.8 && womenShare >= 0.95) return 'overvejende piger (forslag)';
  if (coverage >= 0.8 && bucket.sides['kun mænd'] / knownSides >= 0.95) return 'overvejende drenge (forslag)';
  if (coverage >= 0.8 && bucket.sides.blandet / knownSides >= 0.5) return 'overvejende blandet (forslag)';
  return 'ikke afgørbar';
}

const poolAnalysis = [...byPool.values()].map((bucket) => {
  const totalSides = Object.values(bucket.sides).reduce((sum, count) => sum + count, 0);
  const knownSides = totalSides - bucket.sides['ukendt køn'];
  const knownGenderCoverage = bucket.totalAssignedPlayers
    ? bucket.knownGenderPlayers / bucket.totalAssignedPlayers
    : 0;
  const genderProposal = proposedGenderClass(bucket);
  const formatConfirmed = bucket.pool.format !== '4 piger' || genderProposal === 'overvejende piger (forslag)';
  return {
    ...bucket.pool,
    format_data_bekraeftet: formatConfirmed,
    foreslaaet_koensklassifikation: genderProposal,
    match_count: bucket.matches.size,
    side_counts: bucket.sides,
    side_shares: Object.fromEntries(Object.entries(bucket.sides).map(([key, count]) => [key, totalSides ? count / totalSides : null])),
    total_holdsider: totalSides,
    holdsider_med_bestemt_koen: knownSides,
    holdside_daekning: totalSides ? knownSides / totalSides : 0,
    assigned_player_rows: bucket.totalAssignedPlayers,
    known_gender_player_rows: bucket.knownGenderPlayers,
    known_gender_player_coverage: knownGenderCoverage,
    player_rows_without_team_side: bucket.missingSidePlayerRows,
    sample_matches: [...bucket.matches.values()].slice(0, 2),
  };
});

const formatCounts = Object.fromEntries([...new Set(poolAnalysis.map((row) => row.format))].sort()
  .map((format) => [format, poolAnalysis.filter((row) => row.format === format).length]));
const originalRest = poolAnalysis.filter((row) => row.was_123_rest);
const unresolvedAfter = originalRest.filter((row) => !row.format).length;
const ownCategoryCount = originalRest.filter((row) => row.format === '4-8 spillere'
  || (row.format && !['4 spillere'].includes(row.format))).length;
const determinedCount = originalRest.length - unresolvedAfter;
const fourGirls = poolAnalysis.filter((row) => row.format === '4 piger');
const fourGirlsDataSupported = fourGirls.filter((row) => row.format_data_bekraeftet).length;
const sortedPools = [...poolAnalysis].sort((a, b) => a.physical_pool_key.localeCompare(b.physical_pool_key));
const sampleVariants = ['(4)', '4 m/k', null, '4-8 spillere', '4 piger', 'X1', 'X2'];
const sampleRows = [];
for (const variant of sampleVariants) {
  const candidate = sortedPools.find((row) => row.tekstvariant === variant);
  if (candidate && !sampleRows.includes(candidate)) sampleRows.push(candidate);
}
for (const row of sortedPools) {
  if (sampleRows.length >= 10) break;
  if (!sampleRows.includes(row)) sampleRows.push(row);
}
const samples = sampleRows
  .map((row) => ({
    physical_pool_key: row.physical_pool_key,
    format: row.format,
    foreslaaet_koensklassifikation: row.foreslaaet_koensklassifikation,
    side_counts: row.side_counts,
    raw_text: row.raw_text,
    context_raw: row.sample_matches.map((sample) => matchMeta.get(sample.external_match_id)?.context_raw ?? null),
    player_match_extras: row.sample_matches,
  }));

const variantCounts = new Map();
for (const row of poolAnalysis) {
  const key = row.tekstvariant ?? 'ingen formattekst';
  variantCounts.set(key, (variantCounts.get(key) ?? 0) + 1);
}
const mapping = [
  { tekstvariant: '(4)', afgørelse: '4 spillere', kilde: 'Christoffers afgørelse', antal_puljer: variantCounts.get('(4)') ?? 0 },
  { tekstvariant: '4 m/k', afgørelse: '4 spillere', kilde: 'Christoffers afgørelse', antal_puljer: variantCounts.get('4 m/k') ?? 0 },
  { tekstvariant: 'ingen formattekst', afgørelse: '4 spillere', kilde: 'Christoffers afgørelse: S4/D2-struktur', antal_puljer: variantCounts.get('ingen formattekst') ?? 0 },
  { tekstvariant: '4-8 spillere', afgørelse: '4-8 spillere', kilde: 'Christoffers afgørelse: egen kategori', antal_puljer: variantCounts.get('4-8 spillere') ?? 0 },
  { tekstvariant: '4 piger', afgørelse: '4 piger kun med holdsideevidens', kilde: 'tekstsignal + dataregel', antal_puljer: variantCounts.get('4 piger') ?? 0 },
  { tekstvariant: 'anden variant', afgørelse: 'egen tekstkategori', kilde: 'opgavekortets regel', note: 'Ingen øvrige afventende tekstvarianter forekom i S4/D2-populationen.' },
  { tekstvariant: 'ukendt køn', afgørelse: 'ikke spilleform', kilde: 'holdsideanalyse', note: 'Bruges kun ved holdsideanalyse og aldrig som formatkategori.' },
];
const overallSides = { 'kun kvinder': 0, 'kun mænd': 0, blandet: 0, 'ukendt køn': 0 };
for (const row of poolAnalysis) for (const [key, count] of Object.entries(row.side_counts)) overallSides[key] += count;
const totalSides = Object.values(overallSides).reduce((sum, count) => sum + count, 0);
const output = {
  generated_at: new Date().toISOString(),
  method: {
    databases: 'liga-landskab.db og national-spillere.db, begge åbnet read-only',
    physical_pool_key: '(season_id, age_group_id, league_group_id)',
    s4d2: 'ungdoms-puljer med kategorisignaturen 1.D, 1.S, 2.D, 2.S, 3.S, 4.S',
    side_rule: 'En hjem-/udeside er kun kvinder, kun mænd eller blandet når alle tildelte spillere har gender_status mand/kvinde. En tom side eller side med ikke-afklaret/modstridende køn er ukendt. Rækker uden team_side bevares som manglende side-dækning og tildeles ikke vilkårligt til hjemme eller ude.',
    proposal_rule: 'Overvejende piger/drenge kræver mindst 80 % afgørbare holdsider og mindst 95 % af dem i den pågældende rene kønskategori.',
  },
  summary: {
    s4d2_pools: poolAnalysis.length,
    format_counts: formatCounts,
    categories_sum_to_s4d2: Object.values(formatCounts).reduce((sum, count) => sum + count, 0) === poolAnalysis.length,
    rest_before_123: 775,
    afgjort_efter_125: determinedCount,
    egen_kategori: ownCategoryCount,
    stadig_uafklaret: unresolvedAfter,
    four_piger_textsignal: fourGirls.length,
    four_piger_dataunderstoettet: fourGirlsDataSupported,
    four_piger_uden_tilstraekkelig_daekning: fourGirls.length - fourGirlsDataSupported,
    holdside_counts: overallSides,
    total_holdsider: totalSides,
    holdsider_med_bestemt_koen: totalSides - overallSides['ukendt køn'],
    holdsides_daekning: totalSides ? (totalSides - overallSides['ukendt køn']) / totalSides : 0,
    pools_ikke_afgoerbare_koen: poolAnalysis.filter((row) => row.foreslaaet_koensklassifikation === 'ikke afgørbar').length,
  },
  pool_analysis: poolAnalysis,
  manual_samples: samples,
};

const nationalAfter = dbCounts(national);
liga.close();
national.close();
const afterHashes = { liga_landsskabet: sha256(LIGA_DB), gsb_normaliseret: sha256(GSB_DB) };
output.control = {
  protected_db_sha256_before: beforeHashes,
  protected_db_sha256_after: afterHashes,
  protected_db_hashes_unchanged: JSON.stringify(beforeHashes) === JSON.stringify(afterHashes),
  national_existing_table_counts_before: nationalBefore,
  national_existing_table_counts_after: nationalAfter,
  national_existing_table_counts_unchanged: JSON.stringify(nationalBefore) === JSON.stringify(nationalAfter),
  manual_sample_count: samples.length,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'format-mapping.json'), `${JSON.stringify(mapping, null, 2)}\n`);
fs.writeFileSync(path.join(OUT_DIR, 'katalog.json'), `${JSON.stringify(output, null, 2)}\n`);
const pct = (value) => `${(value * 100).toFixed(1)} %`;
const rows = Object.entries(formatCounts).map(([format, count]) => `| ${format} | ${count} |`).join('\n');
const report = `# Opgave 125 — formatafgørelser og S4/D2-genanalyse\n\n## Formatafgørelser\n\n| Format | Puljer |\n|---|---:|\n${rows}\n\nKategorierne summerer til **${poolAnalysis.length}** ungdoms-S4/D2-puljer. \`(4)\`, \`4 m/k\` og puljer uden tekst er sat til **4 spillere** efter Christoffers afgørelse. \`4-8 spillere\` er bevaret som selvstændig kategori. \`4 piger\` er kun dataunderstøttet, når holdsidekriteriet nedenfor er opfyldt.\n\n## Holdside og køn\n\n| Holdsider | Antal | Andel |\n|---|---:|---:|\n| Kun kvinder | ${overallSides['kun kvinder']} | ${pct(overallSides['kun kvinder'] / totalSides)} |\n| Kun mænd | ${overallSides['kun mænd']} | ${pct(overallSides['kun mænd'] / totalSides)} |\n| Blandet | ${overallSides.blandet} | ${pct(overallSides.blandet / totalSides)} |\n| Ukendt køn | ${overallSides['ukendt køn']} | ${pct(overallSides['ukendt køn'] / totalSides)} |\n| **I alt** | **${totalSides}** | **100,0 %** |\n\nHoldsidedækning (ikke \`ukendt køn\`): **${totalSides - overallSides['ukendt køn']} / ${totalSides} (${pct((totalSides - overallSides['ukendt køn']) / totalSides)})**. \`${output.summary.pools_ikke_afgoerbare_koen}\` puljer kan ikke få en kønsbaseret foreslået klassifikation. Forslaget \`overvejende piger\`/\`drenge\` kræver mindst 80 % afgørbare holdsider og mindst 95 % rene kendte sider af det pågældende køn; det er et forslag til Christoffers godkendelse, ikke en regel der omskriver tekst.\n\n## Resten fra 123\n\n- Rest før 123: **775** puljer.\n- Afgjort efter 125: **${determinedCount}** puljer.\n- Egne kategorier: **${ownCategoryCount}** puljer.\n- Stadig uafklaret: **${unresolvedAfter}** puljer (tekstsignalet \`4 piger\` uden tilstrækkelig holdsideevidens).\n\n## Kontrol\n\n- SHA-256 for \`liga-landskab.db\` og \`gsb-statistik-normalized.db\`: uændret før/efter.\n- Tællingerne for \`players\`, \`matches\`, \`player_matches\` og \`player_match_extras\` i \`national-spillere.db\`: uændrede før/efter.\n- Ti deterministiske pulje-stikprøver med \`context_raw\` og de anvendte \`player_match_extras\` ligger i \`katalog.json\` under \`manual_samples\`.\n`;
const reportWithCorrectedRest = report
  .replace(
    'det er et forslag til Christoffers godkendelse, ikke en regel der omskriver tekst.',
    `det er et forslag til Christoffers godkendelse, ikke en regel der omskriver tekst. Af de **${fourGirls.length}** tekstmarkerede \`4 piger\`-puljer opfylder **${fourGirlsDataSupported}** kriteriet; **${fourGirls.length - fourGirlsDataSupported}** har ikke tilstrækkelig dækning og er derfor ikke datastøttet som pigeformat.`,
  )
  .replace(
    /## Resten fra 123\n\n[\s\S]*?\n\n## Kontrol/u,
    `## Resten fra 123\n\n- Rest før 123: **${originalRest.length}** puljer.\n- Afgjort efter 125: **${determinedCount}** puljer.\n- Egne kategorier: **${ownCategoryCount}** puljer (\`4-8 spillere\`).\n- Stadig uafklaret: **${unresolvedAfter}** puljer.\n\n## Kontrol`,
  );
fs.writeFileSync(path.join(OUT_DIR, 'rapport.md'), `${reportWithCorrectedRest.trimEnd()}\n`);
console.log(JSON.stringify(output.summary, null, 2));
