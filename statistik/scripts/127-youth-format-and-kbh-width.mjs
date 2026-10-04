import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const dbPath = path.resolve('statistik/data/liga-landskab.db');
const normalizedDbPath = path.resolve('statistik/data/gsb-statistik-normalized.db');
const rankPath = path.resolve('statistik/results/126-rangering-final.json');
const catalog125Path = path.resolve('statistik/results/125-format-afgoerelser/katalog.json');
const jsonPath = path.resolve('statistik/results/127-gsb-ungdom-formatplacering.json');
const mdPath = path.resolve('statistik/results/127-gsb-ungdom-formatplacering.md');
const youthAgeIds = [2, 3, 4, 5, 6, 7, 18];
const copenhagenRegionId = 8;
const sampleCombos = [[2011, 3], [2016, 3], [2020, 5], [2025, 3], [2026, 4]];
const types = ['MD', 'DS', 'DD', 'HS', 'HD', 'S', 'D'];
const noCategories = 'ingen gemte kategorier';

const canonical = [
  ['4+3', { MD: 2, DS: 2, DD: 1, HS: 2, HD: 2 }],
  ['3 spillere', { S: 4, D: 1 }],
  ['4 spillere', { S: 4, D: 2 }],
  ['2+2', { MD: 2, DS: 2, DD: 1, HS: 2, HD: 1 }],
  ['4+2', { MD: 1, DS: 1, DD: 1, HS: 3, HD: 2 }],
  ['4 piger', { DS: 4, DD: 2 }],
  ['5 spillere', { S: 4, D: 3 }],
];

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function rowCounts(file) {
  const db = new DatabaseSync(file, { readOnly: true });
  const tables = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`).all();
  const counts = Object.fromEntries(tables.map(({ name }) => {
    const tableName = `"${name.replaceAll('"', '""')}"`;
    return [name, db.prepare(`SELECT COUNT(*) AS n FROM ${tableName}`).get().n];
  }));
  db.close();
  return counts;
}
const dbBaseline = () => ({
  normalized: { sha256: sha256(normalizedDbPath), row_counts: rowCounts(normalizedDbPath) },
  landscape: { sha256: sha256(dbPath), row_counts: rowCounts(dbPath) },
});
const before = dbBaseline();
const expectedDatabaseHashes = {
  normalized: '49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e',
  landscape: '9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c',
};

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
const isGsb = (name) => /^Gladsaxe Søborg(?:\s|$)/iu.test(String(name ?? '').normalize('NFC'));
const isGsbCollaboration = (name) => /gladsaxe\s+søborg/iu.test(name) && String(name).includes('/');
const withdrawalReason = (name) => {
  const value = String(name ?? '').normalize('NFC');
  if (/udgået/iu.test(value)) return 'udgået';
  if (/trukket/iu.test(value)) return 'trukket';
  return null;
};
const namedHtmlEntities = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  Aring: 'Å', aring: 'å', Oslash: 'Ø', oslash: 'ø', AElig: 'Æ', aelig: 'æ',
  Auml: 'Ä', auml: 'ä', Ouml: 'Ö', ouml: 'ö', Uuml: 'Ü', uuml: 'ü',
  Aacute: 'Á', aacute: 'á', Eacute: 'É', eacute: 'é', Oacute: 'Ó', oacute: 'ó',
};
const decodeHtmlEntities = (value) => String(value ?? '').replace(/&(#(?:x[\da-f]+|\d+)|[a-z][a-z\d]+);/giu, (entity, code) => {
  if (code[0] === '#') {
    const point = code[1]?.toLowerCase() === 'x' ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
    try { return Number.isInteger(point) ? String.fromCodePoint(point) : entity; } catch { return entity; }
  }
  return namedHtmlEntities[code] ?? entity;
});
const normalizeClub = (name) => decodeHtmlEntities(name).normalize('NFC')
  .replace(/\([^)]*\)/gu, ' ')
  .replace(/\*/gu, ' ')
  .replace(/\b(?:alders?\s+disp(?:ensation)?\.?|udgået|udgaet|trukket)/giu, ' ')
  .replace(/\s+\d+\s*$/u, '')
  .replace(/\s+/gu, ' ')
  .trim();
const poolKey = (r) => `${r.season_id}|${r.age_group_id}|${r.league_group_id}`;
const comboKey = (season, age) => `${season}|${age}`;
const divisionKey = (r) => `${r.season_id}|${r.age_group_id}|${r.division_name_raw}`;
const seasonLabel = (season) => `${season}/${season + 1}`;
const dmuRow = (name) => /^\s*DMU\b/iu.test(String(name ?? ''));
const kredsmatchRow = (name) => /\bKredsmatch\b/iu.test(String(name ?? ''));
const fixedFormatOrder = new Map([['4+3', 1], ['4+2', 2], ['2+2', 3], ['4 spillere', 4], ['4 piger', 5]]);
const parseLevel = (name) => {
  const value = String(name ?? '');
  const match = value.match(/\bU\d+(?:\s*\/\s*(?:U)?\d+)?\s*([A-D](?:\s*[-/]\s*[A-D])?)(?=[^A-Za-z]|$)/iu);
  if (!match) return { raw_level: null, letter: null, numeric_value: null, interpretable: false };
  const rawLevel = match[1].replaceAll(' ', '').toUpperCase();
  const singleLetter = /^[A-D]$/u.test(rawLevel);
  const numeric = value.slice(match.index + match[0].length).match(/\b(\d{3,5})\b/u);
  return {
    raw_level: rawLevel,
    letter: singleLetter ? rawLevel : null,
    numeric_value: numeric ? Number(numeric[1]) : null,
    interpretable: true,
  };
};
const levelSort = (a, b) => {
  const order = { A: 0, B: 1, C: 2, D: 3 };
  if (a.level.letter !== b.level.letter) return (order[a.level.letter] ?? 9) - (order[b.level.letter] ?? 9);
  return (b.level.numeric_value ?? -1) - (a.level.numeric_value ?? -1);
};

const final126 = JSON.parse(fs.readFileSync(rankPath, 'utf8'));
const catalog125 = JSON.parse(fs.readFileSync(catalog125Path, 'utf8'));
const rankByFormat = new Map(final126.rankings.deduplicated_physical_pools.map((row, index) => [row.format, {
  format: row.format,
  tier: row.tier,
  status: row.status,
  global_126_position: row.tier === null ? null : index + 1,
}]));
const formatByPool125 = new Map(catalog125.pool_analysis
  .filter((pool) => pool.is_s4d2_youth)
  .map((pool) => [pool.physical_pool_key, pool]));
if (formatByPool125.size !== 5093) throw new Error(`Expected 5,093 125 S4/D2 pools; got ${formatByPool125.size}`);

const db = new DatabaseSync(dbPath, { readOnly: true });
const regionRows = db.prepare('SELECT region_id, name, short_name, parent_id FROM regions ORDER BY region_id').all();
const groups = db.prepare(`
  SELECT g.season_id, g.age_group_id, ag.name AS age_group_name,
         g.league_group_id, g.division_name_raw, g.group_name_raw, g.page_title_raw,
         r.region_id, COALESCE(reg.name, 'ukendt region') AS region_name
  FROM league_groups g
  JOIN league_group_regions r
    ON r.season_id=g.season_id AND r.age_group_id=g.age_group_id AND r.league_group_id=g.league_group_id
  LEFT JOIN age_groups ag ON ag.age_group_id=g.age_group_id
  LEFT JOIN regions reg ON reg.region_id=r.region_id
  WHERE g.age_group_id IN (${youthAgeIds.join(',')})
  ORDER BY g.season_id,g.age_group_id,r.region_id,g.league_group_id
`).all();
const physicalGroupRows = db.prepare(`
  SELECT g.season_id,g.age_group_id,ag.name AS age_group_name,g.league_group_id,
         g.division_name_raw,g.group_name_raw,g.page_title_raw
  FROM league_groups g LEFT JOIN age_groups ag ON ag.age_group_id=g.age_group_id
  WHERE g.age_group_id IN (${youthAgeIds.join(',')})
`).all();
const teamRows = db.prepare(`
  SELECT t.season_id,t.age_group_id,t.league_group_id,t.league_group_team_id,t.team_name_raw,
         t.standing_position
  FROM league_group_teams t
  WHERE t.age_group_id IN (${youthAgeIds.join(',')})
  ORDER BY t.season_id,t.age_group_id,t.league_group_id,t.team_name_raw
`).all();
const uge38Rows = db.prepare(`
  SELECT g.season_id,g.age_group_id,ag.name AS age_group_name,g.league_group_id,
         g.division_name_raw,g.group_name_raw,d.raw_response
  FROM league_groups g
  LEFT JOIN age_groups ag ON ag.age_group_id=g.age_group_id
  LEFT JOIN league_group_details d USING(season_id,age_group_id,league_group_id)
  WHERE g.age_group_id IN (${youthAgeIds.join(',')}) AND upper(g.division_name_raw) LIKE '%UGE 38%'
  ORDER BY g.season_id,g.age_group_id,g.division_name_raw,g.group_name_raw,g.league_group_id
`).all();
const categories = db.prepare(`
  SELECT lg.season_id,lg.age_group_id,lg.league_group_id,mc.category_raw
  FROM league_match_groups lg JOIN match_categories mc USING(external_match_id)
  WHERE lg.age_group_id IN (${youthAgeIds.join(',')})
    AND mc.category_raw IS NOT NULL AND trim(mc.category_raw)<>''
`).all();
const rowStructure = db.prepare(`
  SELECT COUNT(*) AS pool_region_rows,
         COUNT(DISTINCT g.season_id||'|'||g.age_group_id||'|'||g.league_group_id) AS physical_pools,
         COUNT(DISTINCT g.season_id||'|'||g.age_group_id||'|'||g.division_name_raw) AS division_rows,
         SUM(CASE WHEN g.division_name_raw IS NULL OR trim(g.division_name_raw)='' THEN 1 ELSE 0 END) AS missing_division_rows
  FROM league_groups g JOIN league_group_regions r
    ON r.season_id=g.season_id AND r.age_group_id=g.age_group_id AND r.league_group_id=g.league_group_id
  WHERE r.region_id=? AND g.age_group_id IN (${youthAgeIds.join(',')})
`).get(copenhagenRegionId);
const detailsCoverage = db.prepare(`
  SELECT COUNT(DISTINCT g.season_id||'|'||g.age_group_id||'|'||g.league_group_id) AS pools,
         COUNT(DISTINCT d.season_id||'|'||d.age_group_id||'|'||d.league_group_id) AS detailed_pools,
         COUNT(DISTINCT g.season_id||'|'||g.age_group_id||'|'||g.division_name_raw) AS division_rows
  FROM league_groups g JOIN league_group_regions r
    ON r.season_id=g.season_id AND r.age_group_id=g.age_group_id AND r.league_group_id=g.league_group_id
  LEFT JOIN league_group_details d
    ON d.season_id=g.season_id AND d.age_group_id=g.age_group_id AND d.league_group_id=g.league_group_id
  WHERE r.region_id=? AND g.age_group_id IN (${youthAgeIds.join(',')})
`).get(copenhagenRegionId);
const multiRegionPools = db.prepare(`
  SELECT COUNT(*) AS n FROM (
    SELECT g.season_id,g.age_group_id,g.league_group_id
    FROM league_groups g JOIN league_group_regions r
      ON r.season_id=g.season_id AND r.age_group_id=g.age_group_id AND r.league_group_id=g.league_group_id
    WHERE g.age_group_id IN (${youthAgeIds.join(',')})
    GROUP BY g.season_id,g.age_group_id,g.league_group_id
    HAVING COUNT(DISTINCT r.region_id)>1
  )
`).get().n;
db.close();

const regionById = new Map(regionRows.map((r) => [r.region_id, r]));
const regionCopenhagen = regionById.get(copenhagenRegionId);
const regionIdentityNames = new Set(regionRows.flatMap((r) => [r.name, r.short_name].filter(Boolean).map((name) => normalizeClub(name).toLocaleLowerCase('da'))));
const classifyEntity = (name) => {
  const normalized = normalizeClub(name);
  if (String(name).includes('/')) return 'slash-samarbejde';
  if (regionIdentityNames.has(normalized.toLocaleLowerCase('da'))) return 'regions-/kredshold';
  return 'klubnavn';
};
if (!regionCopenhagen || regionCopenhagen.name !== 'Badminton København') throw new Error('Region 8 no longer resolves exactly to Badminton København');
const rowPoolCounts = new Map();
for (const row of groups.filter((r) => r.region_id === copenhagenRegionId)) {
  const key = divisionKey(row);
  if (!rowPoolCounts.has(key)) rowPoolCounts.set(key, new Set());
  rowPoolCounts.get(key).add(poolKey(row));
}
const rowPoolDistribution = [...rowPoolCounts.values()].reduce((distribution, pools) => {
  distribution[pools.size] = (distribution[pools.size] ?? 0) + 1;
  return distribution;
}, {});
const groupsByPool = new Map(physicalGroupRows.map((r) => [poolKey(r), r]));
const categoriesByPool = new Map();
for (const row of categories) {
  const key = poolKey(row);
  if (!categoriesByPool.has(key)) categoriesByPool.set(key, new Set());
  categoriesByPool.get(key).add(row.category_raw.trim());
}
const signatureByPool = new Map([...categoriesByPool].map(([key, values]) => [
  key, [...values].sort((a, b) => a.localeCompare(b, 'da')).join(' · '),
]));

const poolFormats = new Map();
for (const [key, row] of groupsByPool) {
  const signature = signatureByPool.get(key) ?? noCategories;
  const profile = profileFromSignature(signature);
  const profileId = profileKey(profile);
  const textFamily = parseTextFamily([row.division_name_raw, row.group_name_raw].filter(Boolean).join(' | '));
  const sigFamily = profile ? canonicalByKey.get(profileId) ?? null : null;
  const unisexFamily = profile ? unisexByKey.get(profileId) ?? null : null;
  const textOverride = Boolean(textFamily && unisexFamily === textFamily);
  const baseFamily = sigFamily ? (textOverride ? textFamily : sigFamily) : textFamily;
  const adjudicated = formatByPool125.get(key);
  const format = adjudicated?.format ?? (profile ? baseFamily ?? `Ikke-kanonisk signatur: ${profileId}` : null);
  const displayFormat = format ?? `Uplaceret: ${textFamily ?? 'ingen formattekst'} (ingen brugbar kategorisignatur)`;
  const rank = rankByFormat.get(displayFormat);
  if (!rank) throw new Error(`Pool format absent from 126 ranking: ${key}: ${displayFormat}`);
  poolFormats.set(key, {
    physical_pool_key: key,
    season_id: row.season_id,
    age_group_id: row.age_group_id,
    age_group_name: row.age_group_name ?? `age_group_id ${row.age_group_id}`,
    league_group_id: row.league_group_id,
    division_name_raw: row.division_name_raw,
    group_name_raw: row.group_name_raw,
    page_title_raw: row.page_title_raw,
    level: parseLevel(row.division_name_raw),
    category_signature: signature,
    format: displayFormat,
    format_basis: adjudicated ? '125 fysisk-pulje-afgørelse' : sigFamily ? '126 kanonisk kategorisignatur' : profile ? '126 ikke-kanonisk kategorisignatur' : textFamily ? '126 formattekst uden kategorisignatur' : '126 uden kategoridata',
    tier: rank.tier,
    format_status: rank.status,
    global_126_position: rank.global_126_position,
  });
}

const gsbTeams = teamRows.filter((r) => isGsb(r.team_name_raw)).map((r) => {
  const pool = poolFormats.get(poolKey(r));
  if (!pool) throw new Error(`GSB team references missing pool: ${poolKey(r)}`);
  return {
    ...pool,
    league_group_team_id: r.league_group_team_id,
    raw_team_name: r.team_name_raw,
    standing_position: r.standing_position,
    withdrawal_reason: withdrawalReason(r.team_name_raw),
  };
});
const collaborationTeams = teamRows.filter((r) => isGsbCollaboration(r.team_name_raw)).map((r) => ({
  ...poolFormats.get(poolKey(r)),
  league_group_team_id: r.league_group_team_id,
  raw_team_name: r.team_name_raw,
  withdrawal_reason: withdrawalReason(r.team_name_raw),
}));

const teamsByPool = new Map();
for (const row of teamRows) {
  const key = poolKey(row);
  if (!teamsByPool.has(key)) teamsByPool.set(key, []);
  teamsByPool.get(key).push({ ...row, withdrawal_reason: withdrawalReason(row.team_name_raw) });
}
const groupsByCombo = new Map();
for (const row of physicalGroupRows) {
  const key = comboKey(row.season_id, row.age_group_id);
  if (!groupsByCombo.has(key)) groupsByCombo.set(key, []);
  groupsByCombo.get(key).push(row);
}
const regionGroupsByCombo = new Map();
for (const row of groups.filter((r) => r.region_id === copenhagenRegionId)) {
  const key = comboKey(row.season_id, row.age_group_id);
  if (!regionGroupsByCombo.has(key)) regionGroupsByCombo.set(key, []);
  regionGroupsByCombo.get(key).push(row);
}
const teamsByCombo = new Map();
for (const row of gsbTeams) {
  const key = comboKey(row.season_id, row.age_group_id);
  if (!teamsByCombo.has(key)) teamsByCombo.set(key, []);
  teamsByCombo.get(key).push(row);
}

function rankFormatsForCombo(pools) {
  const present = [...new Set(pools.filter((p) => p.tier !== null && !dmuRow(p.division_name_raw)).map((p) => p.format))];
  const available = present.toSorted((a, b) => {
    const ar = fixedFormatOrder.get(a);
    const br = fixedFormatOrder.get(b);
    if (ar !== undefined || br !== undefined) return (ar ?? 99) - (br ?? 99);
    return a.localeCompare(b, 'da');
  });
  return available.map((format, index) => ({
    format,
    tier: rankByFormat.get(format).tier,
    global_126_position: rankByFormat.get(format).global_126_position,
    place_in_season_age: fixedFormatOrder.has(format) ? index + 1 : null,
    formats_present: available.length,
    hierarchy_status: fixedFormatOrder.has(format) ? 'fastlagt af Christoffer' : 'foreløbig, ikke godkendt',
  }));
}

const allComboKeys = new Set(teamsByCombo.keys());
const placements = [...allComboKeys].map((key) => {
  const [seasonText, ageText] = key.split('|');
  const seasonId = Number(seasonText);
  const ageId = Number(ageText);
  const allComboPools = [...poolFormats.values()].filter((p) => p.season_id === seasonId && p.age_group_id === ageId);
  const pools = allComboPools.filter((p) => !dmuRow(p.division_name_raw));
  const formatRanks = rankFormatsForCombo(pools);
  const formatPlaceByName = new Map(formatRanks.map((x) => [x.format, x]));
  const rankedRows = [...new Map(pools.map((p) => [divisionKey(p), p])).values()].toSorted((a, b) => {
    const ar = fixedFormatOrder.get(a.format);
    const br = fixedFormatOrder.get(b.format);
    if (ar !== undefined || br !== undefined) return (ar ?? 99) - (br ?? 99) || levelSort(a, b) || a.division_name_raw.localeCompare(b.division_name_raw, 'da');
    return a.format.localeCompare(b.format, 'da') || levelSort(a, b) || a.division_name_raw.localeCompare(b.division_name_raw, 'da');
  }).map((row, index) => ({
    division_name_raw: row.division_name_raw,
    format: row.format,
    level: row.level,
    format_place: formatPlaceByName.get(row.format)?.place_in_season_age ?? null,
    row_order_within_format: null,
    provisional: !fixedFormatOrder.has(row.format),
    temporary_rank: !fixedFormatOrder.has(row.format),
    _sort_index: index + 1,
  }));
  const rowOrderByName = new Map();
  for (const row of rankedRows) {
    if (row.level.letter) {
      const n = (rowOrderByName.get(row.format) ?? 0) + 1;
      rowOrderByName.set(row.format, n);
      row.row_order_within_format = n;
    }
    delete row._sort_index;
  }
  const allGsb = teamsByCombo.get(key);
  const localGsb = allGsb.filter((team) => !dmuRow(team.division_name_raw));
  const dmuGsb = allGsb.filter((team) => dmuRow(team.division_name_raw));
  const activePlaced = localGsb.filter((team) => !team.withdrawal_reason && team.tier !== null);
  const activeUnplaced = localGsb.filter((team) => !team.withdrawal_reason && team.tier === null);
  const withdrawn = localGsb.filter((team) => team.withdrawal_reason);
  const bestGsb = activePlaced.toSorted((a, b) => {
    const ar = fixedFormatOrder.get(a.format);
    const br = fixedFormatOrder.get(b.format);
    if (ar !== undefined || br !== undefined) return (ar ?? 99) - (br ?? 99) || levelSort(a, b);
    return a.format.localeCompare(b.format, 'da') || levelSort(a, b);
  })[0] ?? null;
  const highestFormat = formatRanks[0] ?? null;
  const highestPools = highestFormat ? pools.filter((p) => p.format === highestFormat.format) : [];
  const topPoolKeys = new Set(highestPools.map((p) => p.physical_pool_key));
  const highestTeams = [...topPoolKeys].flatMap((pool) => teamsByPool.get(pool) ?? []);
  const clubVariants = new Map();
  const otherHighestEntities = new Map();
  const excludedWithdrawn = [];
  for (const team of highestTeams) {
    if (team.withdrawal_reason) {
      excludedWithdrawn.push({ raw_team_name: team.team_name_raw, reason: team.withdrawal_reason, physical_pool_key: poolKey(team) });
      continue;
    }
    const normalized = normalizeClub(team.team_name_raw);
    const entityType = classifyEntity(team.team_name_raw);
    if (entityType !== 'klubnavn') {
      const key = `${entityType}|${normalized}`;
      if (!otherHighestEntities.has(key)) otherHighestEntities.set(key, { entity_type: entityType, normalized_name: normalized, raw_team_names: new Set() });
      otherHighestEntities.get(key).raw_team_names.add(team.team_name_raw);
      continue;
    }
    if (!clubVariants.has(normalized)) clubVariants.set(normalized, new Set());
    clubVariants.get(normalized).add(team.team_name_raw);
  }
  const regionGroupsForCombo = regionGroupsByCombo.get(key) ?? [];
  const regionPoolsAll = new Set(regionGroupsForCombo.map(poolKey));
  const regionRowsAll = new Set(regionGroupsForCombo.map(divisionKey));
  const widthEligibleGroups = regionGroupsForCombo.filter((r) => !dmuRow(r.division_name_raw) && !kredsmatchRow(r.division_name_raw));
  const regionPools = new Set(widthEligibleGroups.map(poolKey));
  const regionRows = new Set(widthEligibleGroups.map(divisionKey));
  const regionGroupsWithoutDmu = regionGroupsForCombo.filter((r) => !dmuRow(r.division_name_raw));
  const regionRowsWithoutKredsmatch = new Set(regionGroupsWithoutDmu.map(divisionKey));
  const regionGsbActive = localGsb.filter((team) => regionPools.has(team.physical_pool_key) && !team.withdrawal_reason);
  const regionGsbPools = new Set(regionGsbActive.map((team) => team.physical_pool_key));
  const regionGsbRows = new Set(regionGsbActive.filter((team) => !kredsmatchRow(team.division_name_raw) && !dmuRow(team.division_name_raw)).map(divisionKey));
  const regionGsbRowsIncludingKredsmatch = new Set(localGsb.filter((team) => regionGroupsWithoutDmu.some((group) => poolKey(group) === team.physical_pool_key) && !team.withdrawal_reason).map(divisionKey));
  const regionGsbPoolsIncludingKredsmatch = new Set(localGsb.filter((team) => regionGroupsWithoutDmu.some((group) => poolKey(group) === team.physical_pool_key) && !team.withdrawal_reason).map((team) => team.physical_pool_key));
  const regionGsbWithdrawn = localGsb.filter((team) => regionPools.has(team.physical_pool_key) && team.withdrawal_reason);
  const status = bestGsb
    ? (formatRanks.length === 1 ? 'kun ét format findes' : bestGsb.format === highestFormat?.format ? 'i højeste format' : 'under højeste format')
    : activeUnplaced.length ? 'aktivt GSB-hold, format uplaceret' : 'ingen aktivt GSB-hold (kun udgået/trukket)';
  return {
    season_id: seasonId,
    season: seasonLabel(seasonId),
    age_group_id: ageId,
    age_group_name: allGsb[0].age_group_name,
    gsb_team_pool_records_found: localGsb.length,
    gsb_dmu_records: dmuGsb.length,
    gsb_active_placed_records: activePlaced.length,
    gsb_active_unplaced_records: activeUnplaced.length,
    gsb_withdrawn_records: withdrawn.length,
    gsb_withdrawn_by_reason: Object.fromEntries(['udgået', 'trukket'].map((reason) => [reason, withdrawn.filter((r) => r.withdrawal_reason === reason).length])),
    gsb_placement_status: status,
    season_status: seasonId === 2026 ? 'i gang, ufuldstændig' : 'afsluttet',
    placement_completeness_note: seasonId === 2026 ? 'kun de endnu spillede/kategoriserede puljer' : null,
    gsb_best_format: bestGsb ? {
      format: bestGsb.format,
      tier: bestGsb.tier,
      division_name_raw: bestGsb.division_name_raw,
      level: bestGsb.level,
      place_in_season_age: formatPlaceByName.get(bestGsb.format)?.place_in_season_age ?? null,
      formats_present: formatPlaceByName.get(bestGsb.format)?.formats_present ?? null,
      global_126_position: bestGsb.global_126_position,
      hierarchy_status: fixedFormatOrder.has(bestGsb.format) ? 'fastlagt af Christoffer' : 'foreløbig, ikke godkendt',
    } : null,
    highest_format: highestFormat,
    format_hierarchy: formatRanks,
    ranked_division_rows: rankedRows,
    format_level_crossings: {
      girls_c_and_players_d_present: pools.some((p) => p.format === '4 piger' && p.level.letter === 'C')
        && pools.some((p) => p.format === '4 spillere' && p.level.letter === 'D'),
      rule: 'formatrækkefølgen afgør; bogstav sammenlignes ikke på tværs af formater',
    },
    highest_format_pools: highestPools.map((p) => p.physical_pool_key),
    highest_format_clubs: [...clubVariants].sort(([a], [b]) => a.localeCompare(b, 'da')).map(([normalized, raws]) => ({
      normalized_club_name: normalized,
      raw_team_names: [...raws].sort((a, b) => a.localeCompare(b, 'da')),
    })),
    highest_format_nonclub_entities: [...otherHighestEntities.values()].map((entity) => ({
      entity_type: entity.entity_type,
      normalized_name: entity.normalized_name,
      raw_team_names: [...entity.raw_team_names].sort((a, b) => a.localeCompare(b, 'da')),
    })).sort((a, b) => a.entity_type.localeCompare(b.entity_type, 'da') || a.normalized_name.localeCompare(b.normalized_name, 'da')),
    highest_format_club_name_normalization: {
      raw_team_name_records: highestTeams.length,
      changed_records: highestTeams.filter((team) => normalizeClub(team.team_name_raw) !== team.team_name_raw.normalize('NFC')).length,
      distinct_raw_names: new Set(highestTeams.map((team) => team.team_name_raw.normalize('NFC'))).size,
      distinct_raw_names_changed: new Set(highestTeams
        .filter((team) => normalizeClub(team.team_name_raw) !== team.team_name_raw.normalize('NFC'))
        .map((team) => team.team_name_raw.normalize('NFC'))).size,
    },
    withdrawn_teams_in_highest_format_excluded: excludedWithdrawn,
    gsb_team_pool_records: localGsb.map((team) => ({
      raw_team_name: team.raw_team_name,
      physical_pool_key: team.physical_pool_key,
      division_name_raw: team.division_name_raw,
      group_name_raw: team.group_name_raw,
      format: team.format,
      tier: team.tier,
      global_126_position: team.global_126_position,
      local_format_place: formatPlaceByName.get(team.format)?.place_in_season_age ?? null,
      withdrawal_reason: team.withdrawal_reason,
      unplaced_reason: team.tier === null ? team.format_status : null,
      level: team.level,
      hierarchy_status: fixedFormatOrder.has(team.format) ? 'fastlagt af Christoffer' : 'foreløbig, ikke godkendt',
      row_order_within_format: rankedRows.find((row) => row.division_name_raw === team.division_name_raw)?.row_order_within_format ?? null,
    })),
    dmu_gsb_teams: dmuGsb.map((team) => ({
      raw_team_name: team.raw_team_name,
      physical_pool_key: team.physical_pool_key,
      division_name_raw: team.division_name_raw,
      group_name_raw: team.group_name_raw,
      format: team.format,
      level: team.level,
      withdrawal_reason: team.withdrawal_reason,
    })),
    kbh_width: regionGroupsForCombo.length ? {
      region_id: copenhagenRegionId,
      league_rows: { gsb_in: regionGsbRows.size, total: regionRows.size, percent: regionRows.size ? 100 * regionGsbRows.size / regionRows.size : 0 },
      league_rows_including_kredsmatch: { gsb_in: regionGsbRowsIncludingKredsmatch.size, total: regionRowsWithoutKredsmatch.size, percent: regionRowsWithoutKredsmatch.size ? 100 * regionGsbRowsIncludingKredsmatch.size / regionRowsWithoutKredsmatch.size : 0 },
      league_rows_including_dmu_and_kredsmatch: { gsb_in: regionGsbRows.size, total: regionRowsAll.size, percent: regionRowsAll.size ? 100 * regionGsbRows.size / regionRowsAll.size : 0 },
      physical_pools: { gsb_in: regionGsbPools.size, total: regionPools.size, percent: regionPools.size ? 100 * regionGsbPools.size / regionPools.size : 0 },
      physical_pools_including_kredsmatch: { gsb_in: regionGsbPoolsIncludingKredsmatch.size, total: new Set(regionGroupsWithoutDmu.map(poolKey)).size },
      gsb_active_records: regionGsbActive.length,
      gsb_withdrawn_records_excluded: regionGsbWithdrawn.length,
      withdrawn_by_reason: Object.fromEntries(['udgået', 'trukket'].map((reason) => [reason, regionGsbWithdrawn.filter((r) => r.withdrawal_reason === reason).length])),
      gsb_rows: [...regionGsbRows].sort(),
      all_rows: [...regionRowsAll].sort().map((rowKey) => {
        const rowGroups = regionGroupsForCombo.filter((r) => divisionKey(r) === rowKey);
        const row = rowGroups[0];
        const teams = rowGroups.flatMap((group) => teamsByPool.get(poolKey(group)) ?? []);
        return { row_key: rowKey, division_name_raw: row?.division_name_raw ?? null,
          included_in_width: !dmuRow(row?.division_name_raw) && !kredsmatchRow(row?.division_name_raw),
          excluded_reason: dmuRow(row?.division_name_raw) ? 'DMU' : kredsmatchRow(row?.division_name_raw) ? 'Kredsmatch' : null,
          gsb_teams: [...new Set(teams.filter((t) => isGsb(t.team_name_raw) && !withdrawalReason(t.team_name_raw)).map((t) => t.team_name_raw))].sort() };
      }),
      gsb_pools: [...regionGsbPools].sort(),
      all_pools: [...regionPools].sort(),
    } : null,
  };
}).sort((a, b) => a.season_id - b.season_id || a.age_group_id - b.age_group_id);

const gsbTotal = {
  found: gsbTeams.length,
  local_records: gsbTeams.filter((r) => !dmuRow(r.division_name_raw)).length,
  dmu_records: gsbTeams.filter((r) => dmuRow(r.division_name_raw)).length,
  placed_active: gsbTeams.filter((r) => !dmuRow(r.division_name_raw) && !r.withdrawal_reason && r.tier !== null).length,
  unplaced_active: gsbTeams.filter((r) => !dmuRow(r.division_name_raw) && !r.withdrawal_reason && r.tier === null).length,
  withdrawn: gsbTeams.filter((r) => !dmuRow(r.division_name_raw) && r.withdrawal_reason).length,
  withdrawn_by_reason: Object.fromEntries(['udgået', 'trukket'].map((reason) => [reason, gsbTeams.filter((r) => !dmuRow(r.division_name_raw) && r.withdrawal_reason === reason).length])),
  dmu_unique_team_names: new Set(gsbTeams.filter((r) => dmuRow(r.division_name_raw)).map((r) => `${r.season_id}|${r.age_group_id}|${r.raw_team_name}`)).size,
  dmu_unique_season_age_team_names: new Set(gsbTeams.filter((r) => dmuRow(r.division_name_raw)).map((r) => `${r.season_id}|${r.age_group_id}|${r.raw_team_name}`)).size,
  collaboration_records_separate_not_counted_as_gsb: collaborationTeams.length,
};
if (gsbTotal.found !== gsbTotal.placed_active + gsbTotal.unplaced_active + gsbTotal.withdrawn + gsbTotal.dmu_records) {
  throw new Error(`GSB totals do not balance: ${JSON.stringify(gsbTotal)}`);
}

const overallWidthByAge = [...new Set(placements.filter((p) => p.kbh_width && p.season_id !== 2026).map((p) => p.age_group_id))].map((ageId) => {
  const periods = placements.filter((p) => p.age_group_id === ageId && p.kbh_width && p.season_id !== 2026);
  const rowIn = periods.reduce((s, p) => s + p.kbh_width.league_rows.gsb_in, 0);
  const rowTotal = periods.reduce((s, p) => s + p.kbh_width.league_rows.total, 0);
  const poolIn = periods.reduce((s, p) => s + p.kbh_width.physical_pools.gsb_in, 0);
  const poolTotal = periods.reduce((s, p) => s + p.kbh_width.physical_pools.total, 0);
  return {
    age_group_id: ageId,
    age_group_name: periods[0].age_group_name,
    seasons: periods.length,
    season_ids_included: periods.map((period) => period.season_id),
    league_rows: { gsb_in: rowIn, total: rowTotal, percent: rowTotal ? 100 * rowIn / rowTotal : 0 },
    physical_pools: { gsb_in: poolIn, total: poolTotal, percent: poolTotal ? 100 * poolIn / poolTotal : 0 },
    interpretation: 'sum over seasons within this age group only; not compared or combined with other age groups',
  };
}).sort((a, b) => a.age_group_id - b.age_group_id);

const provisionalFormatCounts = [...new Set([...poolFormats.values()].filter((p) => !dmuRow(p.division_name_raw)).map((p) => p.format))]
  .filter((format) => !fixedFormatOrder.has(format))
  .map((format) => ({ format, physical_pools: [...poolFormats.values()].filter((p) => !dmuRow(p.division_name_raw) && p.format === format).length,
    proposal_status: 'foreløbig, ikke godkendt',
    candidate_basis: format === '3 spillere' ? 'forslag: efter 4 spillere og før 4 piger; 4 piger fastholdes som laveste faste format'
      : format === '5 spillere' ? 'forslag: over 4 spillere; præcis relation til 2+2 afventer godkendelse'
        : format === '4-8 spillere' ? 'spænder over flere holdstørrelser; én plads kan ikke udledes af intervallet'
          : 'signaturen/etiketten fastslår ikke entydigt antal spillere; ingen bestemt plads foreslås' }))
  .sort((a, b) => a.format.localeCompare(b.format, 'da'));
const uninterpretableDivisionNames = [...new Set(physicalGroupRows.filter((r) => !parseLevel(r.division_name_raw).interpretable).map((r) => r.division_name_raw ?? '(mangler)'))].sort((a, b) => a.localeCompare(b, 'da'));
const dmuRowsOutput = [];
for (const period of placements) {
  const seen = new Set();
  for (const team of period.dmu_gsb_teams) {
    const key = `${period.season_id}|${period.age_group_id}|${team.raw_team_name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const hasLocal = gsbTeams.some((candidate) => candidate.season_id === period.season_id && candidate.age_group_id === period.age_group_id
      && candidate.raw_team_name === team.raw_team_name && !dmuRow(candidate.division_name_raw));
    const sameNamePosts = period.dmu_gsb_teams.filter((candidate) => candidate.raw_team_name === team.raw_team_name);
    dmuRowsOutput.push({ season_id: period.season_id, season: period.season, age_group_id: period.age_group_id,
      age_group_name: period.age_group_name, raw_team_name: team.raw_team_name, format: team.format,
      level: team.level, dmu_post_count: sameNamePosts.length,
      dmu_physical_pools: sameNamePosts.map((item) => item.physical_pool_key),
      dmu_rows: [...new Set(sameNamePosts.map((item) => item.division_name_raw))],
      also_in_local_row: hasLocal, local_unique_identity_key: `${period.season_id}|${period.age_group_id}|${team.raw_team_name}` });
  }
}
const uge38Report = uge38Rows.map((row) => {
  const pool = poolFormats.get(poolKey(row));
  const rawTeams = teamsByPool.get(poolKey(row)) ?? [];
  const gsbNames = rawTeams.filter((t) => isGsb(t.team_name_raw)).map((t) => t.team_name_raw);
  const responseText = String(row.raw_response ?? '').replace(/<[^>]*>/gu, ' ').replace(/\s+/gu, ' ').trim();
  return { season: seasonLabel(row.season_id), season_id: row.season_id, age_group_id: row.age_group_id,
    age_group_name: row.age_group_name, format: pool?.format ?? null, level: pool?.level ?? parseLevel(row.division_name_raw),
    physical_pool_key: poolKey(row), division_name_raw: row.division_name_raw, group_name_raw: row.group_name_raw,
    team_count: rawTeams.length, team_names: rawTeams.map((t) => t.team_name_raw), gsb_team_names: gsbNames,
    gsb_also_in_other_row_same_season_age: gsbNames.map((teamName) => ({ team_name: teamName,
      also_in_other_row: gsbTeams.some((t) => t.season_id === row.season_id && t.age_group_id === row.age_group_id
        && t.raw_team_name === teamName && t.physical_pool_key !== poolKey(row)) })),
    detail_response_present: Boolean(row.raw_response), detail_repeats_uge38_text: /UGE\s*38/iu.test(responseText),
    detail_text_excerpt: responseText.slice(0, 500) };
});
const formatLevelCrossings = placements.filter((period) => period.format_level_crossings.girls_c_and_players_d_present)
  .map((period) => ({ season: period.season, age_group_id: period.age_group_id, age_group_name: period.age_group_name,
    note: '4 piger C og 4 spillere D findes samtidig; formatrækkefølgen styrer, niveau sammenlignes ikke på tværs.' }));
const u13Control = placements.find((p) => p.season_id === 2024 && p.age_group_id === 4);
const u13Rows = u13Control?.kbh_width?.all_rows ?? [];
const u13GsbRows = u13Rows.filter((row) => row.gsb_teams.length > 0);
const u13RowsWithoutKredsmatch = u13Rows.filter((row) => !kredsmatchRow(row.division_name_raw));
const u13GsbRowsWithoutKredsmatch = u13RowsWithoutKredsmatch.filter((row) => row.gsb_teams.length > 0);
const formatHierarchyCheck = [
  ['2+2', 'U13 A, 5600 (2+2)', 'A', 5600], ['4 spillere', 'U13 B, 5000 (4 spillere)', 'B', 5000],
  ['4 spillere', 'U13 C, 4200 (4 spillere)', 'C', 4200], ['4 spillere', 'U13 D 3600 (4 spillere).', 'D', 3600],
  ['4 piger', 'U13 D, 3200 (4 piger)', 'D', 3200],
].map(([format, name]) => {
  const row = (u13Control?.ranked_division_rows ?? []).find((candidate) => candidate.format === format && candidate.division_name_raw === name);
  return { format, division_name_raw: name, found: Boolean(row), level: row?.level ?? null,
    format_place: row?.format_place ?? null, row_order_within_format: row?.row_order_within_format ?? null,
    hierarchy_index: row ? u13Control.ranked_division_rows.indexOf(row) + 1 : null };
});
const u13FormatOrderPass = formatHierarchyCheck.every((row) => row.found)
  && formatHierarchyCheck[0].hierarchy_index < formatHierarchyCheck[1].hierarchy_index
  && formatHierarchyCheck[1].hierarchy_index < formatHierarchyCheck[2].hierarchy_index
  && formatHierarchyCheck[2].hierarchy_index < formatHierarchyCheck[3].hierarchy_index
  && formatHierarchyCheck[3].hierarchy_index < formatHierarchyCheck[4].hierarchy_index
  && formatHierarchyCheck.map((row) => row.level.raw_level).join(',') === 'A,B,C,D,D'
  && formatHierarchyCheck.map((row) => row.level.numeric_value).join(',') === '5600,5000,4200,3600,3200';

const normalizedNameMap = new Map();
for (const period of placements) {
  for (const club of period.highest_format_clubs ?? []) {
    for (const raw of club.raw_team_names) {
      if (normalizeClub(raw) === raw.normalize('NFC')) continue;
      const previous = normalizedNameMap.get(raw) ?? { raw_team_name: raw, normalized_club_name: normalizeClub(raw), season_age_occurrences: 0 };
      previous.season_age_occurrences += 1;
      normalizedNameMap.set(raw, previous);
    }
  }
}
const normalizationChanges = [...normalizedNameMap.values()].sort((a, b) => a.raw_team_name.localeCompare(b.raw_team_name, 'da'));
const normalizationTotals = {
  highest_format_team_records: placements.reduce((sum, period) => sum + (period.highest_format_club_name_normalization?.raw_team_name_records ?? 0), 0),
  changed_team_records: placements.reduce((sum, period) => sum + (period.highest_format_club_name_normalization?.changed_records ?? 0), 0),
  distinct_raw_name_variants_changed: normalizationChanges.length,
  raw_name_variant_season_age_occurrences: normalizationChanges.reduce((sum, item) => sum + item.season_age_occurrences, 0),
  changes: normalizationChanges,
};
const normalizationExamples = {
  asterisk_age_note: normalizeClub('Greve 1 *alders disp.') === 'Greve',
  numericEntity: normalizeClub('&#197;lborg 1') === 'Ålborg',
  encodedStatus: normalizeClub('abc Aalborg UDG&#197;ET') === 'abc Aalborg',
};
if (Object.values(normalizationExamples).some((passed) => !passed)) throw new Error(`Club normalization example failed: ${JSON.stringify(normalizationExamples)}`);

const sampleChecks = sampleCombos.map(([seasonId, ageId]) => {
  const item = placements.find((p) => p.season_id === seasonId && p.age_group_id === ageId);
  if (!item?.kbh_width) throw new Error(`Missing selected control combination ${seasonId}/${ageId}`);
  const poolSourceChecks = item.gsb_team_pool_records.map((team) => {
    const source125 = formatByPool125.get(team.physical_pool_key);
    const matches125 = source125 ? source125.format === team.format : null;
    if (source125 && !matches125) throw new Error(`125 per-pool format mismatch: ${team.physical_pool_key}`);
    return {
      pool_key: team.physical_pool_key,
      from_125_catalog: Boolean(source125),
      format_125: source125?.format ?? null,
      assigned_format: team.format,
      matches_125: matches125,
    };
  });
  return {
    season_id: seasonId,
    season: seasonLabel(seasonId),
    age_group_id: ageId,
    age_group_name: item.age_group_name,
    gsb_pool_rows: item.gsb_team_pool_records,
    season_status: item.season_status,
    placement_completeness_note: item.placement_completeness_note,
    highest_format: item.highest_format,
    gsb_best_format: item.gsb_best_format,
    highest_format_clubs: item.highest_format_clubs,
    width_rows: item.kbh_width.league_rows,
    width_physical_pools: item.kbh_width.physical_pools,
    per_pool_125_checks: poolSourceChecks,
    per_pool_125_matches: poolSourceChecks.filter((x) => x.matches_125 === true).length,
    per_pool_125_available: poolSourceChecks.filter((x) => x.from_125_catalog).length,
    source_pool_list: item.gsb_team_pool_records.map((r) => ({
      pool_key: r.physical_pool_key,
      raw_team_name: r.raw_team_name,
      division_name_raw: r.division_name_raw,
      group_name_raw: r.group_name_raw,
      format: r.format,
      tier: r.tier,
      withdrawal_reason: r.withdrawal_reason,
    })),
  };
});

const collaborationOutput = collaborationTeams.map((r) => ({
  raw_team_name: r.raw_team_name,
  physical_pool_key: r.physical_pool_key,
  season: seasonLabel(r.season_id),
  age_group_id: r.age_group_id,
  age_group_name: r.age_group_name,
  division_name_raw: r.division_name_raw,
  group_name_raw: r.group_name_raw,
  format: r.format,
  level: r.level,
  tier: r.tier,
  global_126_position: r.global_126_position,
  withdrawal_reason: r.withdrawal_reason,
  counted_as_gsb: false,
}));

const after = dbBaseline();
const report = {
  title: 'Opgave 127 — GSB ungdom: formatplacering og deltagelsesbredde',
  scope: {
    age_group_ids_from_126: youthAgeIds,
    physical_pool_key: '(season_id, age_group_id, league_group_id)',
    only_youth: true,
    no_senior: true,
    format_warning: 'Formatplacering er ikke sportslig styrkesammenligning på tværs af spillefamilier.',
  },
  approved_identity_rules: {
    gsb_prefix: 'Gladsaxe Søborg',
    gsb_pool_records_from_del1_audit: 279,
    direct_gsb_name_variants: 21,
    collaboration_rule: 'BC37/Gladsaxe Søborg 1 separately listed, not counted as pure GSB.',
    excluded_clubs: ['BC37 variants', 'club_registry 1087', 'club_registry 1232'],
    withdrawn_rule: 'udgået/trukket markers excluded from placement and width, counted separately.',
    other_club_normalization: 'Remove parenthetical text, trailing udgået/trukket (with optional asterisks), and trailing team number; slash partnerships remain one entity.',
  },
  data_model: {
    copenhagen_regions_considered: regionRows.filter((r) => /københavn|kobenhavn|storkøbenhavn|storkobenhavn/iu.test(`${r.name} ${r.short_name ?? ''}`)),
    selected_region: regionCopenhagen,
    excluded_region_note: 'DGI Storkøbenhavn is region_id 24 and is not Badminton København; the width measure uses only region_id 8 memberships in league_group_regions.',
    row_key: '(season_id, age_group_id, exact division_name_raw) within region_id 8; all group_name_raw phases belonging to that division are merged to one league/row.',
    pool_key: '(season_id, age_group_id, league_group_id), counted once for region_id 8 even where the physical pool is shared with other regions.',
    row_pool_distribution: rowPoolDistribution,
    league_group_details: detailsCoverage,
    region_8_structure: rowStructure,
    youth_physical_pools_linked_to_multiple_regions: multiRegionPools,
    interpretation: 'league_groups holds division_name_raw (row) and group_name_raw (pool/phase); league_group_details has one raw detail record per pool; league_group_regions maps a group to its region(s). All region-8 youth groups have a nonempty division name, so the stated row key is populated.',
  },
  rank_method: {
    source: 'Pool format assignment still uses 126 procedure and 125 per-pool adjudications; order is replaced here by Christoffers fixed youth hierarchy.',
    fixed_hierarchy: ['4+3', '4+2', '2+2', '4 spillere', '4 piger'],
    hierarchy_caveat: 'Christoffers rangering, ikke reglementsbestemt; not a sports-strength comparison across formats.',
    provisional_formats: provisionalFormatCounts,
    local_place: 'Position among formats present in the same age_group_id and season_id. Fixed formats use the agreed hierarchy; other formats are shown as provisional/unapproved and never silently treated as approved.',
    level_order: 'Within same format only: A > B > C > D, then numeric value descending. C-D/range and missing level are not forced into a single letter rank. No cross-format level comparison.',
    regulation_source: 'Badminton Danmark/DGI Badminton, Fælles reglement for ungdomsholdturneringen 2025/2026, §9 and §12: https://badminton.dk/wp-content/uploads/2025/10/Faelles-reglement-for-ungdomsholdturneringen-2025-10-08.pdf',
    level_parse_counts: { distinct_youth_division_names: new Set(physicalGroupRows.map((r) => r.division_name_raw ?? '(mangler)')).size,
      interpretable_level_labels: new Set(physicalGroupRows.filter((r) => parseLevel(r.division_name_raw).interpretable).map((r) => r.division_name_raw)).size,
      range_level_names_not_ordered: new Set(physicalGroupRows.filter((r) => parseLevel(r.division_name_raw).raw_level?.includes('-')).map((r) => r.division_name_raw)).size,
      uninterpretable_distinct_names: uninterpretableDivisionNames.length, uninterpretable_names: uninterpretableDivisionNames },
    numeric_interpretation: 'The cited 2025/26 §9 says team composition uses season-start ranking classification by letter or point value, and its tables state max combined classification points for named formats. Extracted row numbers are retained as raw numeric values; this edition does not prove every historic row suffix was governed by the same thresholds.',
    unplaced: 'No usable category signature/format rank in 126; kept separate and never guessed.',
  },
  gsb_totals: gsbTotal,
  dmu_gsb_unique_rows: dmuRowsOutput,
  uge_38_rows: uge38Report,
  format_level_crossings: formatLevelCrossings,
  controls_129: {
    u13_2024_25_region8: { total_division_rows: u13Rows.length, gsb_rows: u13GsbRows.length,
      division_rows_without_kredsmatch: u13RowsWithoutKredsmatch.length, gsb_rows_without_kredsmatch: u13GsbRowsWithoutKredsmatch.length,
      expected_values_match: u13Rows.length === 13 && u13GsbRows.length === 6 && u13RowsWithoutKredsmatch.length === 12 && u13GsbRowsWithoutKredsmatch.length === 6,
      rows: u13Rows, rows_without_kredsmatch: u13RowsWithoutKredsmatch },
    u13_format_sample: formatHierarchyCheck,
    u13_format_order_pass: u13FormatOrderPass,
    u13_all_posts_crosscheck: (() => {
      const allAgeRecords = gsbTeams.filter((team) => team.season_id === 2024 && team.age_group_id === 4);
      const localRecords = allAgeRecords.filter((team) => !dmuRow(team.division_name_raw));
      const dmuRecords = allAgeRecords.filter((team) => dmuRow(team.division_name_raw));
      return { total_posts: allAgeRecords.length, local_posts: localRecords.length, dmu_posts: dmuRecords.length,
        unique_raw_team_names_all: new Set(allAgeRecords.map((team) => team.raw_team_name)).size,
        unique_dmu_raw_team_names: new Set(dmuRecords.map((team) => team.raw_team_name)).size,
        unique_dmu_teams_also_local: new Set(dmuRecords.filter((dmu) => localRecords.some((local) => local.raw_team_name === dmu.raw_team_name)).map((team) => team.raw_team_name)).size };
    })(),
    gsb_balance: gsbTotal.found === gsbTotal.placed_active + gsbTotal.unplaced_active + gsbTotal.withdrawn + gsbTotal.dmu_records,
    dmu_unique_teams_deduplicated: gsbTotal.dmu_unique_season_age_team_names === dmuRowsOutput.length,
  },
  placement_by_season_age: placements,
  width_overall_by_age_group: overallWidthByAge,
  club_name_normalization_totals: normalizationTotals,
  collaborations_separate: collaborationOutput,
  controls: {
    manual_samples: sampleChecks,
    gsb_balance: gsbTotal.found === gsbTotal.placed_active + gsbTotal.unplaced_active + gsbTotal.withdrawn + gsbTotal.dmu_records,
    region_id_8_exact_name: regionCopenhagen.name === 'Badminton København',
    region_8_missing_division_rows: rowStructure.missing_division_rows,
    all_region_8_pools_have_details: detailsCoverage.pools === detailsCoverage.detailed_pools,
    current_season_excluded_from_overall: overallWidthByAge.every((row) => !row.season_ids_included.includes(2026)),
    club_normalization_examples: normalizationExamples,
    database_hashes_and_row_counts_unchanged: before.normalized.sha256 === after.normalized.sha256
      && before.landscape.sha256 === after.landscape.sha256
      && JSON.stringify(before.normalized.row_counts) === JSON.stringify(after.normalized.row_counts)
      && JSON.stringify(before.landscape.row_counts) === JSON.stringify(after.landscape.row_counts),
    database_hashes_match_known_baseline: before.normalized.sha256 === expectedDatabaseHashes.normalized
      && before.landscape.sha256 === expectedDatabaseHashes.landscape,
  },
  databases: { before, after },
};
if (report.controls.region_8_missing_division_rows !== 0) throw new Error('Cannot group all Region 8 league rows: missing division_name_raw');
if (!report.controls.all_region_8_pools_have_details) throw new Error('Region 8 physical pools lack league_group_details records');
if (!report.controls.database_hashes_and_row_counts_unchanged) throw new Error('A read-only database baseline changed');
if (!report.controls.database_hashes_match_known_baseline) throw new Error(`Database hashes differ from the task's known baseline: ${JSON.stringify(before)}`);
if (!report.controls_129.u13_2024_25_region8.expected_values_match) throw new Error(`U13 width control failed: ${JSON.stringify(report.controls_129.u13_2024_25_region8)}`);
if (!report.controls_129.u13_format_order_pass) throw new Error(`U13 format/level sample failed: ${JSON.stringify(report.controls_129.u13_format_sample)}`);
if (!report.controls_129.gsb_balance || !report.controls_129.dmu_unique_teams_deduplicated) throw new Error(`GSB/DMU reconciliation failed: ${JSON.stringify(report.controls_129)}`);
const u13AllPosts = report.controls_129.u13_all_posts_crosscheck;
if (u13AllPosts.total_posts !== 14 || u13AllPosts.local_posts !== 9 || u13AllPosts.dmu_posts !== 5
  || u13AllPosts.unique_raw_team_names_all !== 9 || u13AllPosts.unique_dmu_raw_team_names !== 3
  || u13AllPosts.unique_dmu_teams_also_local !== 3) throw new Error(`U13 local/DMU reconciliation failed: ${JSON.stringify(u13AllPosts)}`);

const fmt = (n) => Number(n).toLocaleString('da-DK', { maximumFractionDigits: 1 });
const pct = (n) => `${fmt(n)}%`;
const seasonReportLabel = (period) => period.season_status === 'i gang, ufuldstændig'
  ? `${period.season} (i gang, ufuldstændig)` : period.season;
const mdTable = (headers, rows) => [
  `| ${headers.join(' | ')} |`,
  `| ${headers.map(() => '---').join(' | ')} |`,
  ...rows.map((row) => `| ${row.map((x) => String(x ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ')).join(' | ')} |`),
].join('\n');
const placementRows = placements.map((r) => [
  seasonReportLabel(r), `${r.age_group_name} (ID ${r.age_group_id})`, r.gsb_team_pool_records_found,
  `${r.gsb_placement_status}${r.placement_completeness_note ? ` (${r.placement_completeness_note})` : ''}`,
  r.gsb_best_format ? `${r.gsb_best_format.format} (${r.gsb_best_format.level?.raw_level ?? 'niveau uafklaret'}; format ${r.gsb_best_format.place_in_season_age ?? 'foreløbig'}/${r.gsb_best_format.formats_present}; ${r.gsb_best_format.hierarchy_status}${r.placement_completeness_note ? `; ${r.placement_completeness_note}` : ''})` : (r.placement_completeness_note ?? '—'),
  r.highest_format ? `${r.highest_format.format} (${r.highest_format.hierarchy_status})` : 'ingen placerbart format',
  r.gsb_active_unplaced_records,
  r.gsb_withdrawn_records,
]);
const widthRows = placements.filter((r) => r.kbh_width).map((r) => [
  seasonReportLabel(r), `${r.age_group_name} (ID ${r.age_group_id})`,
  `${r.kbh_width.league_rows.gsb_in} af ${r.kbh_width.league_rows.total} (${pct(r.kbh_width.league_rows.percent)})`,
  `${r.kbh_width.league_rows_including_kredsmatch.gsb_in} af ${r.kbh_width.league_rows_including_kredsmatch.total} inkl. Kredsmatch`,
  `${r.kbh_width.physical_pools.gsb_in} af ${r.kbh_width.physical_pools.total} (${pct(r.kbh_width.physical_pools.percent)})`,
  `${r.kbh_width.physical_pools_including_kredsmatch.gsb_in} af ${r.kbh_width.physical_pools_including_kredsmatch.total} inkl. Kredsmatch`,
  `${r.kbh_width.gsb_withdrawn_records_excluded} (${JSON.stringify(r.kbh_width.withdrawn_by_reason)})`,
]);
const overallRows = overallWidthByAge.map((r) => [
  `${r.age_group_name} (ID ${r.age_group_id})`, r.seasons,
  `${r.league_rows.gsb_in} af ${r.league_rows.total} (${pct(r.league_rows.percent)})`,
  `${r.physical_pools.gsb_in} af ${r.physical_pools.total} (${pct(r.physical_pools.percent)})`,
]);
const poolDetailRows = placements.flatMap((season) => season.gsb_team_pool_records.map((t) => [
  seasonReportLabel(season), `${season.age_group_name} (${season.age_group_id})`, t.raw_team_name,
  t.physical_pool_key, t.division_name_raw, t.group_name_raw, t.format,
  t.tier === null ? 'Uplaceret' : `${t.hierarchy_status}; niveau ${t.level?.raw_level ?? 'ikke tolket'}${t.level?.numeric_value ? ` / ${t.level.numeric_value}` : ''}; plads ${t.row_order_within_format ?? '—'} inden for format`, t.withdrawal_reason ?? '',
]));
const clubDetailRows = placements.flatMap((period) => (period.highest_format_clubs ?? []).map((club) => [
  seasonReportLabel(period), `${period.age_group_name} (${period.age_group_id})`,
  period.highest_format?.format, club.normalized_club_name, club.raw_team_names.join('; '),
]));
const nonClubDetailRows = placements.flatMap((period) => (period.highest_format_nonclub_entities ?? []).map((item) => [
  seasonReportLabel(period), `${period.age_group_name} (${period.age_group_id})`, period.highest_format?.format,
  item.entity_type, item.normalized_name, item.raw_team_names.join('; '),
]));
const collaborationRows = collaborationOutput.map((item) => [
  item.season, `${item.age_group_name} (${item.age_group_id})`, item.raw_team_name,
  item.physical_pool_key, item.format ?? 'Uplaceret', item.level?.raw_level ?? 'niveau ikke tolket', item.level?.numeric_value ?? '—',
]);
const normalizationRows = normalizationChanges.map((item) => [
  item.raw_team_name, item.normalized_club_name, item.season_age_occurrences,
]);
const sampleRows = sampleChecks.map((s) => [
  s.season_status === 'i gang, ufuldstændig' ? `${s.season} (i gang, ufuldstændig)` : s.season, `${s.age_group_name} (${s.age_group_id})`, s.source_pool_list.length,
  s.gsb_best_format ? `${s.gsb_best_format.format} ${s.gsb_best_format.level?.raw_level ?? ''} ${s.gsb_best_format.level?.numeric_value ?? ''}` : '—',
  s.highest_format ? `${s.highest_format.format} (${s.highest_format.hierarchy_status})` : '—',
  `${s.width_rows.gsb_in}/${s.width_rows.total}`, `${s.width_physical_pools.gsb_in}/${s.width_physical_pools.total}`,
  `${s.per_pool_125_matches}/${s.per_pool_125_available} 125-format match; ${s.source_pool_list.length - s.per_pool_125_available} fallback/other`,
  s.source_pool_list.map((p) => `${p.pool_key}: ${p.raw_team_name} → ${p.format}${p.withdrawal_reason ? ` (${p.withdrawal_reason})` : ''}`).join('<br>'),
]);
const widthEvidenceRows = placements.flatMap((period) => (period.kbh_width?.all_rows ?? []).map((row) => [
  seasonReportLabel(period), `${period.age_group_name} (${period.age_group_id})`, row.division_name_raw,
  row.included_in_width ? 'ja' : `nej — ${row.excluded_reason}`, row.gsb_teams.join('; ') || '—',
]));
const dmuMarkdownRows = dmuRowsOutput.map((row) => [row.season, `${row.age_group_name} (${row.age_group_id})`, row.raw_team_name,
  row.format, `${row.level?.raw_level ?? 'niveau ikke tolket'}${row.level?.numeric_value ? ` / ${row.level.numeric_value}` : ''}`,
  row.dmu_post_count, row.dmu_physical_pools.join('; '),
  row.also_in_local_row ? 'ja (samme rånavn lokal række)' : 'nej']);
const uge38MarkdownRows = uge38Report.map((row) => [row.season, `${row.age_group_name} (${row.age_group_id})`, row.format,
  row.division_name_raw, row.group_name_raw, row.team_count, row.gsb_team_names.join('; ') || '—',
  row.gsb_also_in_other_row_same_season_age.map((x) => `${x.team_name}: ${x.also_in_other_row ? 'ja' : 'nej'}`).join('; ') || '—',
  row.detail_repeats_uge38_text ? 'ja; HTML gentager navnet' : 'nej/ingen respons']);
const normalizedHashLines = [
  `- gsb-statistik-normalized.db SHA-256: \`${before.normalized.sha256}\` → \`${after.normalized.sha256}\``,
  `  Rækketal før/efter: \`${JSON.stringify(before.normalized.row_counts)}\` / \`${JSON.stringify(after.normalized.row_counts)}\``,
  `- liga-landskab.db SHA-256: \`${before.landscape.sha256}\` → \`${after.landscape.sha256}\``,
  `  Rækketal før/efter: \`${JSON.stringify(before.landscape.row_counts)}\` / \`${JSON.stringify(after.landscape.row_counts)}\``,
];
const markdown = `# Opgave 127 — formatplacering og deltagelsesbredde for GSB's ungdom

## Metode og godkendte regler

- GSB er kun råt holdnavn der starter med “Gladsaxe Søborg”; auditens 279 poster/21 varianter.
- “BC37/Gladsaxe Søborg 1” behandles som samarbejdshold separat og tæller ikke som rent GSB.
- BC37-varianter og registry 1087/1232 er ikke GSB.
- Navne med “udgået” eller “trukket” (inkl. stjernemarkering) vises særskilt og tæller ikke som placeret/deltagende.
- Alle rene GSB-hold vises. Sæsonens GSB-placering er bedste aktive format; bredden tæller alle aktive GSB-hold i de deltagende puljer/rækker.
- Andre holdnavne normaliseres ved at fjerne trailing holdnummer, trailing statusmarkeringer og parentestekst. Slash-samarbejder forbliver én klubenhed.
- Kun ungdoms-ID'erne ${youthAgeIds.join(', ')}; ingen senior. Formatrangering er ikke styrkesammenligning på tværs af spillefamilier.

## Datamodel: pulje og række

Region ${copenhagenRegionId} er **${regionCopenhagen.name}** (${regionCopenhagen.short_name}); region 24 er DGI Storkøbenhavn og er ikke medtaget. Regiontilhørsforhold afgøres af \`league_group_regions\`, ikke sidens titel. En fysisk pulje er \`(season_id, age_group_id, league_group_id)\`. \`league_groups.division_name_raw\` er række-/liganavnet; grupper i samme sæson/aldersgruppe med samme nøjagtige værdi samles til én række. \`group_name_raw\` er puljen/fasen (fx Pulje 1, Pulje 2 eller finale). \`league_group_details\` indeholder rå detailrespons per fysisk pulje.

Region 8: ${rowStructure.physical_pools} fysiske puljer fordelt på ${rowStructure.division_rows} rækker; manglende rækkenavn: ${rowStructure.missing_division_rows}. Antal puljer pr. række fordeler sig sådan: ${Object.entries(rowPoolDistribution).sort(([a],[b]) => Number(a)-Number(b)).map(([pools, rows]) => `${rows} rækker med ${pools} pulje(r)`).join('; ')}. Detaildata dækker ${detailsCoverage.detailed_pools}/${detailsCoverage.pools} puljer. ${multiRegionPools} ungdomspuljer er knyttet til flere regioner; fysisk-puljeoptællingen i København tæller hver nøgle én gang. Række-bredde er hovedtallet, fordi flere puljer under samme divisionsrække ellers ville få bredere deltagelse til at se større ud; fysisk puljebredde vises som supplerende mål.

## Formatplacering A pr. sæson og aldersgruppe

Puljenes format fortsætter med 126's per-pulje-metode (125-afgørelser for S4/D2, ellers kategorisignatur/formattekst). Formatordenen her er **Christoffers rangering, ikke reglementsbestemt**: 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger. Den bruges ikke som sportslig styrkesammenligning på tværs af formater. x/n er formatplacering blandt formater i samme nationale sæson/aldersgruppe. Ved n=1 står “kun ét format findes”. 2026/2027 er **i gang, ufuldstændig**; kun endnu spillede/kategoriserede puljer indgår.

Niveaukilde: Badminton Danmark/DGI Badminton, *Fælles reglement for ungdomsholdturneringen 2025/2026*, §9 og §12 ([officiel PDF](https://badminton.dk/wp-content/uploads/2025/10/Faelles-reglement-for-ungdomsholdturneringen-2025-10-08.pdf)). §9 omtaler klassifikation ved sæsonstart (bogstav eller pointtal) og pointlofter for bestemte holdtyper; §12 beskriver holdtypen før niveau i nummereringsrækkefølgen. Kilden er 2025/26, og historiske thresholds er ikke interpoleret.

Formater uden godkendt plads står som **foreløbig, ikke godkendt**. Tabellen tæller distinkte fysiske puljer nationalt; den er ikke et godkendt hierarki:

${mdTable(['Foreløbigt format', 'Fysiske puljer', 'Grundlag/forbehold'], provisionalFormatCounts.map((row) => [row.format, row.physical_pools, row.candidate_basis]))}

Niveau udtrækkes fra rækkenavnet. Reglementets 2025/26 §9 siger at holdopstilling tager udgangspunkt i sæsonstartens niveauklassifikation (bogstav eller pointtal) og omtaler maksimale samlede klassifikationspoint i skemaerne; §12 beskriver klubbernes nummerering med holdtyper før niveauorden. Dette dokument bruger A>B>C>D og derefter numerisk værdi faldende **kun inden for samme format**. C-D intervaller og manglende etiketter får ingen opfundet enkeltplads. I ${report.rank_method.level_parse_counts.distinct_youth_division_names} forskellige ungdomsrækkenavne blev ${report.rank_method.level_parse_counts.interpretable_level_labels} etiketter udtrukket; ${report.rank_method.level_parse_counts.range_level_names_not_ordered} rækkeetiketter har et intervalniveau og ${report.rank_method.level_parse_counts.uninterpretable_distinct_names} kunne ikke tolkes. Den fulde liste ligger i JSON.

${mdTable(['Sæson', 'Aldersgruppe', 'GSB hold-puljeposter', 'GSB-status', 'Bedste GSB-format', 'Højeste nationalt', 'Aktive uplacerede', 'Udgået/trukket'], placementRows)}

### Alle GSB-hold/puljer

${mdTable(['Sæson', 'Alder', 'Råt holdnavn', 'Fysisk pulje', 'Række', 'Pulje/fase', 'Format', 'Rang', 'Status'], poolDetailRows)}

### DMU separat

DMU-poster tæller ikke i lokal formatplacering eller region 8-bredde. Unikke GSB-hold deduplikeres inden for sæson/aldersgruppe på råt holdnavn; et hold der også optræder lokalt tælles én gang som hold, men hver DMU-puljepost står stadig på denne separate liste. I alt: **${gsbTotal.dmu_records} DMU-poster**, **${gsbTotal.dmu_unique_season_age_team_names} unikke sæson/aldersgruppe/hold-identiteter**.

${mdTable(['Sæson', 'Alder', 'GSB-hold', 'Format', 'Niveau', 'DMU-poster', 'DMU-puljenøgler', 'Også lokal række'], dmuMarkdownRows)}

### Klubber i højeste format — normaliseret navn og rå holdnavne

${mdTable(['Sæson', 'Alder', 'Højeste format', 'Normaliseret klubenhed', 'Rå holdnavne'], clubDetailRows)}

Regions-/kredshold og slash-samarbejder i øverste format vises særskilt, ikke som klubber:

${mdTable(['Sæson', 'Alder', 'Format', 'Type', 'Enhedsnavn', 'Rå holdnavne'], nonClubDetailRows)}

Samarbejder med slash bevares som én normaliseret enhed. Udgåede/trukne hold er udeladt fra klublisten og vises separat i JSON pr. sæson/aldersgruppe.

### Klubnavnenormalisering — ændrede rå navne

HTML-entiteter er dekodet før normalisering; parentestekst, stjernemarkerede noter, statusmarkører (fx UDGÅET/trukket) og trailing holdnummer fjernes. Normaliseringen ændrede ${normalizationTotals.changed_team_records} af ${normalizationTotals.highest_format_team_records} holdnavneforekomster i højeste-format-klublisterne, fordelt på ${normalizationTotals.distinct_raw_name_variants_changed} forskellige rå navne (${normalizationTotals.raw_name_variant_season_age_occurrences} rå-navn/sæson-alder-forekomster). Tabellen viser alle ændrede rå-varianter:

${mdTable(['Råt holdnavn', 'Normaliseret klubnavn', 'Sæson/aldersgruppe-forekomster'], normalizationRows)}

### Samarbejdshold rapporteret separat (ikke GSB)

${mdTable(['Sæson', 'Alder', 'Råt holdnavn', 'Fysisk pulje', 'Format', 'Bogstav/række', 'Numerisk værdi'], collaborationRows)}

## Deltagelsesbredde B — Badminton København

\`GSB i x af n\` viser både antal og procent. Udgåede/trukne hold tæller ikke i x; de vises særskilt. 2026/2027 er markeret **i gang, ufuldstændig** og indgår ikke i “Samlet over tid”. Samlet over tid summeres afsluttede sæsoner kun inden for samme aldersgruppe.

${mdTable(['Sæson', 'Aldersgruppe', 'Rækker uden Kredsmatch', 'Rækker inkl. Kredsmatch', 'Puljer uden Kredsmatch', 'Puljer inkl. Kredsmatch', 'Udeladte GSB-hold'], widthRows)}

### Række-for-række bevis (region 8)

Alle division-rækker vises, også rækker udeladt fra tælleren; GSB-hold er navngivet.

${mdTable(['Sæson', 'Alder', 'division_name_raw', 'Med i bredde?', 'Aktive GSB-hold'], widthEvidenceRows)}

### Samlet over tid pr. aldersgruppe (sæsonoptællinger summeret)

${mdTable(['Aldersgruppe', 'Sæsoner', 'Rækker/ligaer', 'Fysiske puljer'], overallRows)}

## Optælling

- GSB-hold-puljeposter fundet: **${gsbTotal.found}** = lokalt placerede **${gsbTotal.placed_active}** + lokalt uplacerede **${gsbTotal.unplaced_active}** + lokalt udgået/trukket **${gsbTotal.withdrawn}** + DMU-poster **${gsbTotal.dmu_records}**.
- Udgået: **${gsbTotal.withdrawn_by_reason.udgået}**; trukket: **${gsbTotal.withdrawn_by_reason.trukket}**.
- Samarbejdshold rapporteret separat, ikke GSB: **${gsbTotal.collaboration_records_separate_not_counted_as_gsb}**.

## Fem stikprøver — puljeliste, placering og bredde

${mdTable(['Sæson', 'Alder', 'GSB-puljer', 'Bedste GSB-format/niveau', 'Højeste nationalt', 'Rækker GSB/total', 'Puljer GSB/total', '125-katalog formatkontrol', 'Pulje-/formatkontrol'], sampleRows)}

Stikprøverne blev sammenholdt med de rå \`league_groups\`, \`league_group_regions\`, \`league_group_teams\`-rækker og 126's fysiske puljeformatkilder. Hver liste viser pool-nøgle, holdnavn, række/pulje og format; 125-formatet blev også sammenholdt direkte for alle sample-puljer der findes i 125-kataloget. Bredde kontrolleres på division- og puljenøgler.

### Særskilt kontrol: U13 2024/25

Format-/niveauprøven forventes i denne rækkefølge: 2+2 A 5600 > 4 spillere B 5000 > C 4200 > D 3600 > 4 piger D 3200. Region 8 har ${report.controls_129.u13_2024_25_region8.total_division_rows} rækker og ${report.controls_129.u13_2024_25_region8.gsb_rows} GSB-rækker; uden Kredsmatch ${report.controls_129.u13_2024_25_region8.division_rows_without_kredsmatch} rækker og ${report.controls_129.u13_2024_25_region8.gsb_rows_without_kredsmatch} GSB-rækker. Alle fem format-/niveauprøver bestod: ${report.controls_129.u13_format_order_pass}.

Samlet U13-puljepostafstemning: ${u13AllPosts.total_posts} = ${u13AllPosts.local_posts} lokalrække-poster + ${u13AllPosts.dmu_posts} DMU-poster; ${u13AllPosts.unique_raw_team_names_all} unikke rå holdnavne i alt, hvor DMU omfatter ${u13AllPosts.unique_dmu_raw_team_names} hold, og alle ${u13AllPosts.unique_dmu_teams_also_local} også optræder i lokal række. Kortets tidligere “14 poster for 9 hold” var en fejl: 14 er samlet lokal+DMU-poster, ikke DMU alene.

## UGE 38 — kildedata og uafklaret betydning

Databasen indeholder ${uge38Report.length} ungdoms-puljeposter med “UGE 38” i rækkenavnet; tabellen viser sæson, alder, format, række, puljenavn, holdantal, GSB-hold og om de også optræder i anden række. ${uge38Report.filter((row) => row.detail_repeats_uge38_text).length} rå detailresponser gentager “UGE 38” i den viste HTML-tekst. Det beviser rækkenavnet og at der findes pulje-/holddata; det fastslår ikke hvad “UGE 38” organisatorisk betyder eller om det giver adgang til DMU.

${mdTable(['Sæson', 'Alder', 'Format', 'Rækkenavn', 'Pulje/fase', 'Hold', 'GSB', 'GSB også anden række?', 'Detalje gentager UGE 38'], uge38MarkdownRows)}

Samtidige “4 piger C” og “4 spillere D”-rækker forekommer i ${formatLevelCrossings.length} sæson/aldersgruppe-kombinationer. Hvor de forekommer, anvendes formatrækkefølgen; bogstaver sammenlignes ikke på tværs af formater. Se JSON-feltet \`format_level_crossings\`.

## Databaseværn

${normalizedHashLines.join('\n')}

Alle SHA-256 og tabelrækketal er ens før/efter; databaser åbnet \`readOnly: true\`.
`;

fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(mdPath, markdown, 'utf8');
console.log(JSON.stringify({
  gsb: gsbTotal,
  placement_periods: placements.length,
  width_periods: placements.filter((p) => p.kbh_width).length,
  row_structure: rowStructure,
  sample_combos: sampleChecks.map((s) => `${s.season}/${s.age_group_id}`),
  db_unchanged: report.controls.database_hashes_and_row_counts_unchanged,
}, null, 2));
console.log(`Wrote ${mdPath}`);
console.log(`Wrote ${jsonPath}`);
