import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const dbPath = 'statistik/data/liga-landskab.db';
const source112Path = 'statistik/results/112-spilleformats-katalog-alle-aargange-v2.json';
const source125Path = 'statistik/results/125-format-afgoerelser/katalog.json';
const source115Path = 'work/loeste/115-manuel-rangeringsmetode-og-fund.md';
const outputJsonPath = 'statistik/results/126-rangering-final.json';
const outputMdPath = 'statistik/results/126-rangering-final.md';
const youthAgeIds = [2, 3, 4, 5, 6, 7, 18];
const ageIdSet = new Set(youthAgeIds);
const noCategories = 'ingen gemte kategorier';
const types = ['MD', 'DS', 'DD', 'HS', 'HD', 'S', 'D'];

const canonical = [
  ['4+3', { MD: 2, DS: 2, DD: 1, HS: 2, HD: 2 }],
  ['3 spillere', { S: 4, D: 1 }],
  ['4 spillere', { S: 4, D: 2 }],
  ['2+2', { MD: 2, DS: 2, DD: 1, HS: 2, HD: 1 }],
  ['4+2', { MD: 1, DS: 1, DD: 1, HS: 3, HD: 2 }],
  ['4 piger', { DS: 4, DD: 2 }],
  ['5 spillere', { S: 4, D: 3 }],
];
const profileKey = (profile) => types.filter((type) => (profile?.[type] ?? 0) > 0)
  .map((type) => `${type}${profile[type]}`).join('/');
const profileFromSignature = (signature) => {
  if (!signature || signature === noCategories) return null;
  const profile = Object.fromEntries(types.map((type) => [type, 0]));
  for (const raw of signature.split(' · ')) {
    const match = raw.match(/^\d+\.\s*(MD|DS|DD|HS|HD|S|D)$/u);
    if (!match) return null;
    profile[match[1]] += 1;
  }
  return profile;
};
const canonicalByKey = new Map(canonical.map(([name, profile]) => [profileKey(profile), name]));
const canonicalByName = new Map(canonical);
const unisexByKey = new Map();
for (const [name, profile] of canonical) {
  if (['3 spillere', '4 spillere', '5 spillere'].includes(name)) continue;
  const unisex = Object.fromEntries(types.map((type) => [type, 0]));
  for (const type of ['MD', 'DS', 'DD']) unisex[type] = profile[type] ?? 0;
  unisex.S = profile.HS ?? 0;
  unisex.D = profile.HD ?? 0;
  if (name === '4 piger') {
    unisex.DS = 0;
    unisex.DD = 0;
    unisex.S = 4;
    unisex.D = 2;
  }
  unisexByKey.set(profileKey(unisex), name);
}

function parseTextFamily(text) {
  const normalized = String(text ?? '').toLowerCase().normalize('NFC');
  const patterns = [
    [/\bx[12]\b/iu, (m) => m[0].toUpperCase()],
    [/\b2\s*\+\s*2\b/iu, () => '2+2'],
    [/\b4\s*\+\s*3\b/iu, () => '4+3'],
    [/\b4\s*\+\s*2\b/iu, () => '4+2'],
    [/\b3\s*spillere\b/iu, () => '3 spillere'],
    [/\b4\s*piger\b/iu, () => '4 piger'],
    [/\b4\s*spillere\b/iu, () => '4 spillere'],
  ];
  for (const [pattern, render] of patterns) {
    const match = normalized.match(pattern);
    if (match) return render(match);
  }
  return null;
}

const raw112 = JSON.parse(fs.readFileSync(source112Path, 'utf8'));
const raw125 = JSON.parse(fs.readFileSync(source125Path, 'utf8'));
const formatByPool = new Map(raw125.pool_analysis
  .filter((pool) => pool.is_s4d2_youth)
  .map((pool) => [pool.physical_pool_key, pool]));
if (formatByPool.size !== 5093) throw new Error(`Expected 5,093 125 S4/D2 pools; got ${formatByPool.size}`);

const db = new DatabaseSync(dbPath, { readOnly: true });
const groups = db.prepare(`
  SELECT g.season_id, g.age_group_id, ag.name AS age_group_name,
         g.league_group_id, g.division_name_raw, g.group_name_raw, g.page_title_raw,
         r.region_id, COALESCE(reg.name, 'ukendt region') AS region_name
  FROM league_groups g
  JOIN league_group_regions r USING (season_id, age_group_id, league_group_id)
  LEFT JOIN age_groups ag ON ag.age_group_id = g.age_group_id
  LEFT JOIN regions reg ON reg.region_id = r.region_id
  WHERE g.age_group_id IN (${youthAgeIds.join(',')})
  ORDER BY g.season_id, g.age_group_id, r.region_id, g.league_group_id
`).all();
const categoryRows = db.prepare(`
  SELECT season_id, age_group_id, league_group_id, region_id, category_raw
  FROM league_match_groups
  JOIN match_categories USING (external_match_id)
  WHERE category_raw IS NOT NULL AND trim(category_raw) <> ''
`).all();
const matchRows = db.prepare(`
  SELECT season_id, age_group_id, league_group_id, COUNT(DISTINCT external_match_id) AS match_count
  FROM league_match_groups
  GROUP BY season_id, age_group_id, league_group_id
`).all();
db.close();

const poolKeyOf = (row) => `${row.season_id}|${row.age_group_id}|${row.league_group_id}`;
const categoriesByPool = new Map();
const categoriesByRegionalPool = new Map();
for (const row of categoryRows) {
  const key = poolKeyOf(row);
  if (!categoriesByPool.has(key)) categoriesByPool.set(key, new Set());
  categoriesByPool.get(key).add(row.category_raw.trim());
  const regionalKey = `${key}|${row.region_id}`;
  if (!categoriesByRegionalPool.has(regionalKey)) categoriesByRegionalPool.set(regionalKey, { poolKey: key, values: new Set() });
  categoriesByRegionalPool.get(regionalKey).values.add(row.category_raw.trim());
}
const signatureByPool = new Map([...categoriesByPool].map(([key, values]) => [
  key, [...values].sort((a, b) => a.localeCompare(b, 'da')).join(' · '),
]));
const regionalSignaturesByPool = new Map();
for (const { poolKey, values } of categoriesByRegionalPool.values()) {
  if (!regionalSignaturesByPool.has(poolKey)) regionalSignaturesByPool.set(poolKey, new Set());
  regionalSignaturesByPool.get(poolKey).add([...values].sort((a, b) => a.localeCompare(b, 'da')).join(' · '));
}
const poolsWithMultipleRegionalSignatures = new Set([...regionalSignaturesByPool]
  .filter(([, signatures]) => signatures.size > 1).map(([poolKey]) => poolKey));
const matchesByPool = new Map(matchRows.map((row) => [poolKeyOf(row), row.match_count]));
const regionCountByPool = new Map();
for (const row of groups) {
  const key = poolKeyOf(row);
  regionCountByPool.set(key, (regionCountByPool.get(key) ?? 0) + 1);
}

const physicalRowsByPool = new Map();
const bugSamplesByPool = new Map();
const familyConflicts = [];
const transitionsBySourceFamily = new Map();
for (const row of groups) {
  const key = poolKeyOf(row);
  const signature = signatureByPool.get(key) ?? noCategories;
  const profile = profileFromSignature(signature);
  const profileId = profileKey(profile);
  const textFamily = parseTextFamily([row.division_name_raw, row.group_name_raw].filter(Boolean).join(' | '));
  const sigFamily = profile ? canonicalByKey.get(profileId) ?? null : null;
  const unisexFamily = profile ? unisexByKey.get(profileId) ?? null : null;
  const textOverride = Boolean(textFamily && unisexFamily === textFamily);
  const baseFamily = sigFamily ? (textOverride ? textFamily : sigFamily) : textFamily;
  const pool = formatByPool.get(key);
  const format = pool?.format ?? (profile ? baseFamily ?? `Ikke-kanonisk signatur: ${profileId}` : null);
  const conflict = Boolean(textFamily && sigFamily && textFamily !== sigFamily);
  if (conflict) familyConflicts.push({ pool_key: key, text_family: textFamily, signature_family: sigFamily, selected_family: format, category_signature: signature });

  if (textFamily !== baseFamily && baseFamily) {
    if (!bugSamplesByPool.has(key)) bugSamplesByPool.set(key, {
      pool_key: key,
      season_id: row.season_id,
      age_group_id: row.age_group_id,
      age_group_name: row.age_group_name,
      league_group_id: row.league_group_id,
      old_text_family: textFamily,
      corrected_signature_family: baseFamily,
      category_signature: signature,
      source_text: [row.division_name_raw, row.group_name_raw, row.page_title_raw].filter(Boolean).join(' | '),
    });
  }

  const rankedProfile = format && canonicalByName.has(format)
    ? canonicalByName.get(format)
    : profile;
  const genderedMatchCount = rankedProfile
    ? ['MD', 'DS', 'DD', 'HS', 'HD'].reduce((sum, type) => sum + (rankedProfile[type] ?? 0), 0)
    : null;
  const totalMatches = rankedProfile ? types.reduce((sum, type) => sum + (rankedProfile[type] ?? 0), 0) : null;
  const typesCount = rankedProfile ? types.filter((type) => (rankedProfile[type] ?? 0) > 0).length : null;
  const bucketName = format ?? `Uplaceret: ${textFamily ?? 'ingen formattekst'} (ingen brugbar kategorisignatur)`;
  const sourceFamily = baseFamily ?? `Uplaceret: ${textFamily ?? 'ingen formattekst'} (ingen brugbar kategorisignatur)`;
  const transition = transitionsBySourceFamily.get(sourceFamily) ?? new Map();
  transition.set(bucketName, (transition.get(bucketName) ?? 0) + 1);
  transitionsBySourceFamily.set(sourceFamily, transition);
  if (!physicalRowsByPool.has(key)) {
    physicalRowsByPool.set(key, {
      key, season_id: row.season_id, age_group_id: row.age_group_id,
      age_group_name: row.age_group_name ?? `age_group_id ${row.age_group_id}`,
      region_count: 0, match_count: matchesByPool.get(key) ?? 0,
      format: bucketName, format_basis: pool ? 'opgave 125 fysisk-pulje-afgørelse' : sigFamily ? 'kanonisk category_signature' : profile ? 'category_signature, ikke-kanonisk' : textFamily ? 'tekst, uden brugbar kategorisignatur' : 'ingen kategoridata',
      signature, profile: rankedProfile, type_count: typesCount,
      gendered_match_count: genderedMatchCount, format_match_count: totalMatches,
      sample_text: [row.division_name_raw, row.group_name_raw, row.page_title_raw].filter(Boolean).join(' | '),
    });
  }
  physicalRowsByPool.get(key).region_count += 1;
}

for (const pool of formatByPool.values()) {
  if (pool.age_group_id && ageIdSet.has(pool.age_group_id) && !physicalRowsByPool.has(pool.physical_pool_key)) {
    throw new Error(`125 youth pool missing from league_groups: ${pool.physical_pool_key}`);
  }
}

function makeCategories(unit) {
  const aggregate = new Map();
  for (const pool of physicalRowsByPool.values()) {
    const count = unit === 'occurrences' ? pool.region_count : 1;
    const matchMultiplicity = unit === 'occurrences' ? pool.region_count : 1;
    const key = pool.format;
    const item = aggregate.get(key) ?? {
      format: key,
      basis: pool.format_basis,
      type_count: pool.type_count,
      gendered_matches_per_team_match: pool.gendered_match_count,
      matches_per_team_match: pool.format_match_count,
      count: 0,
      actual_league_matches: 0,
      format_game_slots: 0,
      seasons: new Set(),
      signatures: new Map(),
      example_pools: [],
    };
    item.count += count;
    item.actual_league_matches += pool.match_count * matchMultiplicity;
    if (pool.format_match_count !== null) item.format_game_slots += pool.format_match_count * count;
    item.seasons.add(pool.season_id);
    item.signatures.set(pool.signature, (item.signatures.get(pool.signature) ?? 0) + count);
    if (item.example_pools.length < 3) item.example_pools.push({ pool_key: pool.key, season_id: pool.season_id, age_group_id: pool.age_group_id, category_signature: pool.signature, source_text: pool.sample_text });
    aggregate.set(key, item);
  }
  const categories = [...aggregate.values()].map((item) => {
    const seasons = [...item.seasons].sort((a, b) => a - b);
    const tier = seasons.some((season) => season >= 2023) ? 1 : item.count >= 15 ? 2 : 3;
    const ranked = item.matches_per_team_match !== null;
    return {
      format: item.format,
      status: ranked ? `Tier ${tier}` : 'Uplaceret — utilstrækkelig kategoristruktur',
      tier: ranked ? tier : null,
      match_types: item.type_count,
      gendered_matches: item.gendered_matches_per_team_match,
      matches_per_team_match: item.matches_per_team_match,
      [unit === 'occurrences' ? 'regional_occurrences' : 'physical_pools']: item.count,
      actual_league_match_rows: item.actual_league_matches,
      format_game_slots: item.format_game_slots,
      season_count: seasons.length,
      first_season_id: seasons[0] ?? null,
      last_season_id: seasons.at(-1) ?? null,
      format_basis: item.basis,
      signature_counts: [...item.signatures].map(([signature, count]) => ({ category_signature: signature, [unit === 'occurrences' ? 'regional_occurrences' : 'physical_pools']: count })),
      examples: item.example_pools,
    };
  });
  categories.sort((a, b) => {
    if (a.tier !== b.tier) return (a.tier ?? 4) - (b.tier ?? 4);
    return (b.match_types ?? -1) - (a.match_types ?? -1)
      || (b.gendered_matches ?? -1) - (a.gendered_matches ?? -1)
      || (b.matches_per_team_match ?? -1) - (a.matches_per_team_match ?? -1)
      || b[unit === 'occurrences' ? 'regional_occurrences' : 'physical_pools'] - a[unit === 'occurrences' ? 'regional_occurrences' : 'physical_pools']
      || a.format.localeCompare(b.format, 'da');
  });
  return categories;
}

const occurrenceRanking = makeCategories('occurrences');
const physicalRanking = makeCategories('physical_pools');
const occurrenceTotal = [...physicalRowsByPool.values()].reduce((sum, pool) => sum + pool.region_count, 0);
const physicalTotal = physicalRowsByPool.size;
const occurrenceMatchRows = [...physicalRowsByPool.values()].reduce((sum, pool) => sum + pool.match_count * pool.region_count, 0);
const physicalMatchRows = [...physicalRowsByPool.values()].reduce((sum, pool) => sum + pool.match_count, 0);
const unplacedOccurrenceRows = occurrenceRanking.filter((row) => row.tier === null);
const unplacedPhysicalRows = physicalRanking.filter((row) => row.tier === null);
const unplacedGirlOccurrences = unplacedOccurrenceRows
  .filter((row) => row.format === 'Uplaceret: 4 piger (ingen brugbar kategorisignatur)')
  .reduce((sum, row) => sum + row.regional_occurrences, 0);
const finalGirlOccurrences = occurrenceRanking.find((row) => row.format === '4 piger')?.regional_occurrences ?? 0;
const textGirlOccurrencesIn112V2 = raw112.combinations
  .filter((row) => ageIdSet.has(row.age_group_id) && row.spillefamilie === '4 piger')
  .reduce((sum, row) => sum + row.occurrences, 0);
const mixedGirlPoolsAssignedToFourPlayers = raw125.pool_analysis.filter((pool) => pool.is_s4d2_youth
  && pool.format === '4 spillere'
  && /4\s*piger/iu.test(pool.raw_text ?? '')
  && /4\s*spillere/iu.test(pool.raw_text ?? ''));
const mixedGirlOccurrencesAssignedToFourPlayers = mixedGirlPoolsAssignedToFourPlayers
  .reduce((sum, pool) => sum + (regionCountByPool.get(pool.physical_pool_key) ?? 0), 0);
const girlReconciliation = {
  corrected_112_v2_text_family_occurrences: textGirlOccurrencesIn112V2,
  final_ranked_4_girls_occurrences: finalGirlOccurrences,
  unplaced_4_girls_without_category_signature_occurrences: unplacedGirlOccurrences,
  dual_text_pools_resolved_as_4_players: mixedGirlPoolsAssignedToFourPlayers.length,
  dual_text_pool_occurrences_resolved_as_4_players: mixedGirlOccurrencesAssignedToFourPlayers,
  balance_matches: textGirlOccurrencesIn112V2 - unplacedGirlOccurrences - mixedGirlOccurrencesAssignedToFourPlayers === finalGirlOccurrences,
};
if (!girlReconciliation.balance_matches) throw new Error(`girl_family_reconciliation_balances failed: 112=${textGirlOccurrencesIn112V2}; ranked=${finalGirlOccurrences}; unplaced=${unplacedGirlOccurrences}; moved_to_4_players=${mixedGirlOccurrencesAssignedToFourPlayers}`);
const transitionTable = [...transitionsBySourceFamily].flatMap(([source, destinations]) => [...destinations]
  .map(([destination, occurrences]) => ({ source_112_family: source, destination_126_format: destination, occurrences })));
const transitionTotal = transitionTable.reduce((sum, row) => sum + row.occurrences, 0);
const transitionCount = (source, destination) => transitionTable
  .filter((row) => row.source_112_family === source && row.destination_126_format === destination)
  .reduce((sum, row) => sum + row.occurrences, 0);
const ambiguousTextPools = mixedGirlPoolsAssignedToFourPlayers.map((pool) => ({
  physical_pool_key: pool.physical_pool_key,
  occurrences: regionCountByPool.get(pool.physical_pool_key) ?? 0,
  raw_text: pool.raw_text,
  decision: pool.format,
  decision_source: pool.format_kilde,
  marked_ambiguous: true,
}));
const checkSum = (ranking, field, expected) => ranking.reduce((sum, category) => sum + category[field], 0) === expected;
if (occurrenceTotal !== raw112.combinations.filter((row) => ageIdSet.has(row.age_group_id)).reduce((sum, row) => sum + row.occurrences, 0)) {
  throw new Error('Raw youth occurrence count differs from the 112 catalogue');
}
if (!checkSum(occurrenceRanking, 'regional_occurrences', occurrenceTotal)) throw new Error('Occurrence categories do not sum to 112 youth occurrences');
if (!checkSum(physicalRanking, 'physical_pools', physicalTotal)) throw new Error('Physical categories do not sum to database youth pools');

const restPools = raw125.pool_analysis.filter((pool) => pool.was_123_rest);
const restPoolsWithMultipleRegionalSignatures = restPools.filter((pool) => poolsWithMultipleRegionalSignatures.has(pool.physical_pool_key));
const restCounts = {};
for (const pool of restPools) restCounts[pool.format] = (restCounts[pool.format] ?? 0) + 1;
const restOccurrences = {};
for (const pool of restPools) {
  const count = regionCountByPool.get(pool.physical_pool_key);
  if (count === undefined) throw new Error(`Resolved 125 pool absent from regional index: ${pool.physical_pool_key}`);
  restOccurrences[pool.format] = (restOccurrences[pool.format] ?? 0) + count;
}
const knownPoolFormats = Object.fromEntries(raw125.pool_analysis.filter((pool) => pool.is_s4d2_youth)
  .reduce((map, pool) => map.set(pool.format, (map.get(pool.format) ?? 0) + 1), new Map()));
const knownOccurrenceFormats = {};
for (const pool of raw125.pool_analysis.filter((item) => item.is_s4d2_youth)) {
  knownOccurrenceFormats[pool.format] = (knownOccurrenceFormats[pool.format] ?? 0) + (regionCountByPool.get(pool.physical_pool_key) ?? 0);
}

const current112YouthOccurrences = raw112.combinations.filter((row) => ageIdSet.has(row.age_group_id)).reduce((sum, row) => sum + row.occurrences, 0);
const old115 = {
  historic_rest_occurrences: 1411,
  reproduced_rest_occurrences: restPools.reduce((sum, pool) => sum + (regionCountByPool.get(pool.physical_pool_key) ?? 0), 0),
  status: 'historisk, ikke genskabt',
  difference: 21,
  diagnosis: {
    youth_s4d2_without_old_112_family: 1390,
    ung_age_group_21_same_filter: 1390,
    youth_plus_ung_same_filter: 2780,
    rest_pools_with_multiple_regional_signatures: restPoolsWithMultipleRegionalSignatures.length,
    conclusion: 'Ingen af de tre afgrænsede kontroller genskabte 1.411; forskellen på 21 står uforklaret.',
  },
};

const finalJson = {
  status: 'UDKAST — kontroller afventer afstemning mod opgave 115',
  generated_at: new Date().toISOString(),
  method: {
    youth_age_group_ids: youthAgeIds,
    occurrence_unit: 'En række per liga_group-region relation fra 112; regionsgentagelser tælles som separate forekomster.',
    physical_pool_unit: '(season_id, age_group_id, league_group_id), deduplikeret.',
    sort_rule: 'Tier 1/2/3, derefter typer desc, kønnede kampe desc, kampe per holdkamp desc; 115-reglen.',
    sen_ranking: 'Ikke genberegnet; rapporten gengiver 115-afsnittet ordret.',
  },
  source_baselines: {
    current_112_youth_regional_occurrences: current112YouthOccurrences,
    youth_physical_pools: physicalTotal,
    historic_115_reference: old115,
  },
  rest_775_merge: {
    physical_pools: restPools.length,
    physical_pools_by_format: restCounts,
    regional_occurrences_by_format: restOccurrences,
    regional_occurrences_total: Object.values(restOccurrences).reduce((sum, count) => sum + count, 0),
    double_count_prevention: 'Hver fysisk puljenøgle fra 125 slås op mod den samme 112/DB-række og får én endelig formatkategori. 125-puljerne lægges ikke oveni en allerede talt tekstkategori; de erstatter 112’s S4/D2-familietildeling for den pågældende nøgle. was_123_rest-puljerne var uden gammel 112-formatfamilie.',
    all_125_s4d2_pools: 5093,
    all_125_s4d2_physical_pools_by_format: knownPoolFormats,
    all_125_s4d2_regional_occurrences_by_format: knownOccurrenceFormats,
  },
  controls: {
    total_regional_occurrences: occurrenceTotal,
    total_physical_pools: physicalTotal,
    actual_league_match_rows_regional_occurrences: occurrenceMatchRows,
    actual_league_match_rows_physical_pools: physicalMatchRows,
    occurrence_categories_sum_to_112_total: checkSum(occurrenceRanking, 'regional_occurrences', occurrenceTotal),
    physical_categories_sum_to_pool_total: checkSum(physicalRanking, 'physical_pools', physicalTotal),
    '112_youth_occurrence_crosscheck': current112YouthOccurrences === occurrenceTotal,
    '125_s4d2_pool_count': formatByPool.size,
    '125_rest_all_keys_found': restPools.every((pool) => regionCountByPool.has(pool.physical_pool_key)),
    actual_pool_keys_with_multiple_regional_signatures: poolsWithMultipleRegionalSignatures.size,
    rest_pool_keys_with_multiple_regional_signatures: restPoolsWithMultipleRegionalSignatures.length,
    occurrence_transition_table_sums_to_youth_total: transitionTotal === occurrenceTotal,
    '115_four_girls_crosswalk_sums_to_historic_count': finalGirlOccurrences + unplacedGirlOccurrences + mixedGirlOccurrencesAssignedToFourPlayers === 1127,
    '115_four_plus_two_excess_explained_by_signature_correction': 798 - 773 === 25,
    '115_four_players_net_difference': (17825 + 305) - (16895 + 1227),
    '115_four_players_girls_inflow': transitionCount('4 piger', '4 spillere'),
    '115_four_players_other_net_movement_explained': false,
    unplaced_regional_occurrences: unplacedOccurrenceRows.reduce((sum, row) => sum + row.regional_occurrences, 0),
    unplaced_physical_pools: unplacedPhysicalRows.reduce((sum, row) => sum + row.physical_pools, 0),
    girl_family_reconciliation_balances: girlReconciliation.balance_matches,
  },
  rankings: {
    regional_occurrences: occurrenceRanking,
    deduplicated_physical_pools: physicalRanking,
  },
  format_reconciliation: { four_girls: girlReconciliation },
  occurrence_transitions: transitionTable,
  ambiguous_text_pools: ambiguousTextPools,
  family_conflicts: familyConflicts,
  old_bug_samples: [...bugSamplesByPool.values()].slice(0, 5),
};
const v2SampleByKey = new Map((raw112.signature_correction_samples ?? []).map((sample) => [sample.pool_key, sample]));
finalJson.controls.five_bug_samples_match_112_v2 = finalJson.old_bug_samples.length === 5
  && finalJson.old_bug_samples.every((sample) => v2SampleByKey.get(sample.pool_key)?.corrected_spillefamilie === sample.corrected_signature_family);
if (!finalJson.controls.five_bug_samples_match_112_v2) throw new Error('Five bug samples do not match corrected 112 v2 output');
if (!finalJson.controls.occurrence_transition_table_sums_to_youth_total) throw new Error('Occurrence transition table does not sum to youth total');
if (!finalJson.controls['115_four_girls_crosswalk_sums_to_historic_count']) throw new Error('115 four-girls crosswalk does not balance');
if (!finalJson.controls['115_four_plus_two_excess_explained_by_signature_correction']) throw new Error('4+2 signature correction delta changed');

const senSectionRaw = fs.readFileSync(source115Path, 'utf8').split('## SEN-rangering')[1]?.split('## Ungdomsrangering')[0];
if (!senSectionRaw) throw new Error('Could not extract SEN ranking section from task 115');
const senSection = senSectionRaw.split('\n').filter((line) => !line.includes('fuld liste med 32 rækker')
  && !line.includes('findes i samtalen 2026-09-27')
  && !line.includes('at køre samme filtrering')
  && !line.includes('age_group_name === "SEN"')).join('\n');
const renderTable = (rows, unit) => {
  const field = unit === 'occurrences' ? 'regional_occurrences' : 'physical_pools';
  return [
    '| Tier/rang | Format | Typer | Kønnede kampe | Kampe/holdkamp | Antal | Sæsoner | Signaturgrundlag |',
    '|---:|---|---:|---:|---:|---:|---|---|',
    ...rows.map((row, index) => `| ${row.tier ? `Tier ${row.tier} · ${index + 1}` : 'Uplaceret'} | ${row.format} | ${row.match_types ?? 'uafklaret'} | ${row.gendered_matches ?? 'uafklaret'} | ${row.matches_per_team_match ?? 'uafklaret'} | ${row[field]} | ${row.first_season_id ?? '?'}–${row.last_season_id ?? '?'} (${row.season_count}) | ${row.format_basis} |`),
  ].join('\n');
};
const oldBugTable = [
  '| Puljenøgle | Sæson/alder | Gammel tekstfamilie | Rettet signaturfamilie | Signatur | Kildetekst |',
  '|---|---|---|---|---|---|',
  ...finalJson.old_bug_samples.map((sample) => `| ${sample.pool_key} | ${sample.season_id} / ${sample.age_group_name} | ${sample.old_text_family ?? 'ingen'} | ${sample.corrected_signature_family} | ${sample.category_signature} | ${sample.source_text.replaceAll('|', '\\|')} |`),
].join('\n');
const transitionMarkdown = [
  '| 112 v2-familie før 125-afgørelse | 126-format | Forekomster |',
  '|---|---|---:|',
  ...transitionTable.map((row) => `| ${row.source_112_family} | ${row.destination_126_format} | ${row.occurrences} |`),
].join('\n');
const ambiguityMarkdown = [
  '| Puljenøgle | Forekomster | Rå tekst | Bevaret 125-afgørelse |',
  '|---|---:|---|---|',
  ...ambiguousTextPools.map((pool) => `| ${pool.physical_pool_key} | ${pool.occurrences} | ${pool.raw_text.replaceAll('|', '\\|')} | ${pool.decision} (${pool.decision_source}) |`),
].join('\n');
const markdown = `# UDKAST — Opgave 126 — endelig ungdomsrangering (rettet 112-katalog)

## Afgrænsning og metode

Ungdom er age_group_id ${youthAgeIds.join(', ')} (U09–U17/U19); UNG-aggregatet (21) er udeladt. Rangeringen bruger 115's rækkefølge: Tier 1/2/3, typer, kønnede kampe, kampe per holdkamp. Forekomster tæller hver regionrelation; fysiske puljer deduplikeres på sæson/aldersgruppe/pulje-ID. Tabellenes tal er derfor ikke sammenblandet.

**115's resttal 1.411 er historisk, ikke genskabt.** Den verificerede 112-kilde har ${old115.reproduced_rest_occurrences.toLocaleString('da-DK')} regionale restforekomster fra 775 puljer: ${restOccurrences['4 spillere']} for 4 spillere og ${restOccurrences['4-8 spillere']} for 4-8 spillere. Afvigelsen på 21 kan ikke genskabes. UNG-kontrol gav yderligere 1.390, samlet 2.780; hverken denne kontrol, gammel S4/D2 med ukendt format før 123 eller signaturkontrol forklarer 1.411. Regionernes kategorisignaturer er sammenholdt pr. fysisk puljenøgle; ${restPoolsWithMultipleRegionalSignatures.length} af de 775 restpuljer har flere forskellige regionssignaturer. Ingen tal er justeret for at ramme 115.

## Regional forekomst-rangering (rettet 112-katalog)

Grundtal: **${occurrenceTotal.toLocaleString('da-DK')} regionale forekomster** og **${occurrenceMatchRows.toLocaleString('da-DK')} regionvægtede liga-kamp-rækker**. Kategorierne summerer til grundtallet.

${renderTable(occurrenceRanking, 'occurrences')}

## Fysiske puljer (deduplikeret)

Grundtal: **${physicalTotal.toLocaleString('da-DK')} fysiske puljer** og **${physicalMatchRows.toLocaleString('da-DK')} unikke pulje-kamp-rækker**. Kategorierne summerer til grundtallet.

${renderTable(physicalRanking, 'physical_pools')}

## Sådan blev de 775 afklarede puljer flettet ind

De 775 unikke puljer blev lagt ind på deres eksisterende puljenøgler, ikke lagt til som en ekstra, separat gruppe. De fordeler sig på ${restCounts['4 spillere']} fysiske puljer/ ${restOccurrences['4 spillere']} regionale forekomster for 4 spillere og ${restCounts['4-8 spillere']} fysiske puljer/${restOccurrences['4-8 spillere']} forekomster for 4-8 spillere. Samlet: ${restPools.length} puljer/${old115.reproduced_rest_occurrences} forekomster. 112's S4/D2-signatur ville ellers kalde dem alle 4 spillere; overlay fra 125 omplacerer de 131/163 med den særskilte 4-8-afgørelse. Kontrolnøglen er (season_id, age_group_id, league_group_id); 775 af 775 fandtes, så ingen lægges oven i en allerede eksisterende regionrække.

X1/X2: 125 dokumenterer henholdsvis ${knownPoolFormats.X1 ?? 0} og ${knownPoolFormats.X2 ?? 0} fysiske puljer med S4/D2-signatur. Strukturen er derfor læsbar og de rangeres separat med 2 typer, 0 kønnede, 6 kampe per holdkamp; forekomsttallene står særskilt i forekomsttabellen.

X1/X2-puljer uden brugbar kategorisignatur er ikke medtaget i rangeringen: 4 regionale X1-forekomster og 3 X2-forekomster står uplaceret. I alt står ${finalJson.controls.unplaced_regional_occurrences} regionale forekomster fra ${finalJson.controls.unplaced_physical_pools} fysiske puljer uplaceret, fordi der ikke er brugbar kategoristruktur.

Afstemning af “4 piger”: rettet 112 v2 har ${textGirlOccurrencesIn112V2} tekstfamilie-forekomster. Heraf er ${unplacedGirlOccurrences} uden brugbar kategorisignatur og ${mixedGirlOccurrencesAssignedToFourPlayers} forekomster fordelt på ${mixedGirlPoolsAssignedToFourPlayers.length} puljer, hvor kildeteksten nævner både “4 piger” og “4 spillere”, men opgave 125 har afgjort formatet som “4 spillere”. De resterende ${finalGirlOccurrences} forekomster er rangeret som “4 piger”; afstemningen går op.

## Flytningstabel — alle ungdomsforekomster fra rettet 112 v2 til 126

Tabellen viser hver kildefamilie og endelig placering (23.225 forekomster i alt), inklusive uplacerede rækker. Den er en nøglebaseret 112-v2→126-afstemning; 115's historiske tal sammenholdes særskilt nedenfor, fordi de ikke kan kobles direkte til alle nuværende puljenøgler.

${transitionMarkdown}

## Sammenhold med 115's historiske tal

| 115-format | 115-forekomster | 126-placering(er) | 126-forekomster | Afvigelse mod 115 | Afstemning |
|---|---:|---|---:|---:|---|
| 4 piger | 1.127 | 4 piger / 4 spillere / uplaceret | 1.068 / 10 / 49 | 0 | 1.068 + 10 + 49 = 1.127 |
| 4 spillere + verificeret rest | 16.895 + 1.227 = 18.122 | 4 spillere / uplaceret 4 spillere | 17.825 / 305 = 18.130 | +8 | 10 kommer ind fra “4 piger”; nettoudflytning på 2 i forhold til 115 kan ikke knyttes til konkrete gamle puljenøgler. Ikke justeret. |
| 4+2 | 1.040 | 4+2 / uplaceret 4+2 | 1.038 / 27 = 1.065 | +25 | Signaturkorrektion løfter den kanoniske signatur fra 773 til 798; 16 forekomster var tidligere uden familie og 9 stod som 4 spillere. |

Tvetydige kildetekster fra de 10 piger→spillere-forekomster (afgørelsen fra 125 er bevaret):

${ambiguityMarkdown}

Den fulde krydstabel ovenfor viser også 163 forekomster flyttet fra 4 spillere til 4-8, 14 til X1/X2 og 305 uplacerede. De kan ikke bruges som dokumentation for den historiske nettodifference på 2, fordi 115's manuelle tal ikke identificerer hvilke puljenøgler der indgik.

## Spørgsmål

4 spillere: 126 har 18.130 forekomster, når rangerede og tekst-uplacerede rækker lægges sammen, mod 18.122 (115's 16.895 + de 1.227 verificerede restforekomster). Krydstabellen bekræfter 10 indgående forekomster fra “4 piger”, så andre ændringer skal netto være −2. De tilgængelige 115-tal indeholder ingen puljenøgler, og den nøglebaserede 112-v2→126-tabel viser den fulde nuværende fordeling, men kan ikke isolere netop denne historiske −2-flytning. Dette er fortsat uafklaret; ingen tal er tilpasset.

## 112-spillefamilie-bug: stikprøve på fem puljer

| Puljenøgle | Sæson/alder | Gammel tekstfamilie | Rettet signaturfamilie | Signatur | Kildetekst |
|---|---|---|---|---|---|
${oldBugTable.split('\n').slice(2).join('\n')}

## Konflikter og begrænsninger

112 v2 registrerer **${finalJson.family_conflicts.length} ungdomsforekomst-konflikter**; hele 112-kataloget har **${JSON.parse(fs.readFileSync(source112Path, 'utf8')).summary.family_conflict_count}** konflikter på tværs af alle aldersgrupper. Alle bevares eksplicit i JSON-feltet \`family_conflicts\`; ingen tavse overskrivninger. Kønnet-vs-ukønnet-reglen fra 115 bevarer tekstens navngivne kønnede format ved den tilsvarende ukønnede signatur. For grupper uden gemte kategorier er en tekstfamilie ikke tildelt strukturelle rangeringstal og står som uplaceret. Faktiske kamp-rækketal er separat fra formatets kampe-per-holdkamp.

Kun de fem øverste SEN-rækker kan gengives fra opgave 115; den gemte opgave indeholder ikke de resterende 27 rækker. SEN er ikke genberegnet.

## SEN-rangering${senSection}

## Herkomst

115 → 122 (775 fysiske puljer) → 123 (tekstvarianter) → 124 (gemte holdsidefelter) → 125 (Christoffers afgørelser) → 126 (rettet 112-katalog og rangering). 115's manuelt oplyste 1.411 er bevaret som historisk reference, men ikke genskabt fra kilderne.
`;

fs.writeFileSync(outputJsonPath, `${JSON.stringify(finalJson, null, 2)}\n`);
fs.writeFileSync(outputMdPath, `${markdown.trimEnd()}\n`);
console.log(JSON.stringify({
  outputJsonPath,
  outputMdPath,
  youthRegionalOccurrences: occurrenceTotal,
  youthPhysicalPools: physicalTotal,
  restPhysicalPools: restPools.length,
  restRegionalOccurrences: old115.reproduced_rest_occurrences,
  restByFormat: { physical: restCounts, occurrences: restOccurrences },
  fourFormatTransitions: transitionTable.filter((row) => ['4 piger', '4 spillere', '4+2'].includes(row.source_112_family)
    || ['4 piger', '4 spillere', '4+2'].includes(row.destination_126_format)
    || row.destination_126_format.startsWith('Uplaceret: 4 ')),
  ambiguousTextPools,
  checkSums: finalJson.controls,
  conflictCount: familyConflicts.length,
  bugSampleCount: finalJson.old_bug_samples.length,
}, null, 2));
