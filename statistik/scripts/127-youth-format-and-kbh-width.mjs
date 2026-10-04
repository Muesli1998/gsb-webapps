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
  const available = [...new Set(pools.filter((p) => p.tier !== null).map((p) => p.format))]
    .sort((a, b) => rankByFormat.get(a).global_126_position - rankByFormat.get(b).global_126_position);
  return available.map((format, index) => ({
    format,
    tier: rankByFormat.get(format).tier,
    global_126_position: rankByFormat.get(format).global_126_position,
    place_in_season_age: index + 1,
    formats_present: available.length,
  }));
}

const allComboKeys = new Set(teamsByCombo.keys());
const placements = [...allComboKeys].map((key) => {
  const [seasonText, ageText] = key.split('|');
  const seasonId = Number(seasonText);
  const ageId = Number(ageText);
  const pools = [...poolFormats.values()].filter((p) => p.season_id === seasonId && p.age_group_id === ageId);
  const formatRanks = rankFormatsForCombo(pools);
  const formatPlaceByName = new Map(formatRanks.map((x) => [x.format, x]));
  const allGsb = teamsByCombo.get(key);
  const activePlaced = allGsb.filter((team) => !team.withdrawal_reason && team.tier !== null);
  const activeUnplaced = allGsb.filter((team) => !team.withdrawal_reason && team.tier === null);
  const withdrawn = allGsb.filter((team) => team.withdrawal_reason);
  const bestGsb = activePlaced.toSorted((a, b) => a.global_126_position - b.global_126_position)[0] ?? null;
  const highestFormat = formatRanks[0] ?? null;
  const highestPools = highestFormat ? pools.filter((p) => p.format === highestFormat.format) : [];
  const topPoolKeys = new Set(highestPools.map((p) => p.physical_pool_key));
  const highestTeams = [...topPoolKeys].flatMap((pool) => teamsByPool.get(pool) ?? []);
  const clubVariants = new Map();
  const excludedWithdrawn = [];
  for (const team of highestTeams) {
    if (team.withdrawal_reason) {
      excludedWithdrawn.push({ raw_team_name: team.team_name_raw, reason: team.withdrawal_reason, physical_pool_key: poolKey(team) });
      continue;
    }
    const normalized = normalizeClub(team.team_name_raw);
    if (!clubVariants.has(normalized)) clubVariants.set(normalized, new Set());
    clubVariants.get(normalized).add(team.team_name_raw);
  }
  const regionGroupsForCombo = regionGroupsByCombo.get(key) ?? [];
  const regionPools = new Set(regionGroupsForCombo.map(poolKey));
  const regionRows = new Set(regionGroupsForCombo.map(divisionKey));
  const regionGsbActive = allGsb.filter((team) => regionPools.has(team.physical_pool_key) && !team.withdrawal_reason);
  const regionGsbPools = new Set(regionGsbActive.map((team) => team.physical_pool_key));
  const regionGsbRows = new Set(regionGsbActive.map(divisionKey));
  const regionGsbWithdrawn = allGsb.filter((team) => regionPools.has(team.physical_pool_key) && team.withdrawal_reason);
  const status = bestGsb
    ? (formatRanks.length === 1 ? 'kun ét format findes' : bestGsb.format === highestFormat?.format ? 'i højeste format' : 'under højeste format')
    : activeUnplaced.length ? 'aktivt GSB-hold, format uplaceret' : 'ingen aktivt GSB-hold (kun udgået/trukket)';
  return {
    season_id: seasonId,
    season: seasonLabel(seasonId),
    age_group_id: ageId,
    age_group_name: allGsb[0].age_group_name,
    gsb_team_pool_records_found: allGsb.length,
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
      place_in_season_age: formatPlaceByName.get(bestGsb.format)?.place_in_season_age ?? null,
      formats_present: formatPlaceByName.get(bestGsb.format)?.formats_present ?? null,
      global_126_position: bestGsb.global_126_position,
    } : null,
    highest_format: highestFormat,
    highest_format_pools: highestPools.map((p) => p.physical_pool_key),
    highest_format_clubs: [...clubVariants].sort(([a], [b]) => a.localeCompare(b, 'da')).map(([normalized, raws]) => ({
      normalized_club_name: normalized,
      raw_team_names: [...raws].sort((a, b) => a.localeCompare(b, 'da')),
    })),
    highest_format_club_name_normalization: {
      raw_team_name_records: highestTeams.length,
      changed_records: highestTeams.filter((team) => normalizeClub(team.team_name_raw) !== team.team_name_raw.normalize('NFC')).length,
      distinct_raw_names: new Set(highestTeams.map((team) => team.team_name_raw.normalize('NFC'))).size,
      distinct_raw_names_changed: new Set(highestTeams
        .filter((team) => normalizeClub(team.team_name_raw) !== team.team_name_raw.normalize('NFC'))
        .map((team) => team.team_name_raw.normalize('NFC'))).size,
    },
    withdrawn_teams_in_highest_format_excluded: excludedWithdrawn,
    gsb_team_pool_records: allGsb.map((team) => ({
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
    })),
    kbh_width: regionGroupsForCombo.length ? {
      region_id: copenhagenRegionId,
      league_rows: { gsb_in: regionGsbRows.size, total: regionRows.size, percent: regionRows.size ? 100 * regionGsbRows.size / regionRows.size : 0 },
      physical_pools: { gsb_in: regionGsbPools.size, total: regionPools.size, percent: regionPools.size ? 100 * regionGsbPools.size / regionPools.size : 0 },
      gsb_active_records: regionGsbActive.length,
      gsb_withdrawn_records_excluded: regionGsbWithdrawn.length,
      withdrawn_by_reason: Object.fromEntries(['udgået', 'trukket'].map((reason) => [reason, regionGsbWithdrawn.filter((r) => r.withdrawal_reason === reason).length])),
      gsb_rows: [...regionGsbRows].sort(),
      all_rows: [...regionRows].sort(),
      gsb_pools: [...regionGsbPools].sort(),
      all_pools: [...regionPools].sort(),
    } : null,
  };
}).sort((a, b) => a.season_id - b.season_id || a.age_group_id - b.age_group_id);

const gsbTotal = {
  found: gsbTeams.length,
  placed_active: gsbTeams.filter((r) => !r.withdrawal_reason && r.tier !== null).length,
  unplaced_active: gsbTeams.filter((r) => !r.withdrawal_reason && r.tier === null).length,
  withdrawn: gsbTeams.filter((r) => r.withdrawal_reason).length,
  withdrawn_by_reason: Object.fromEntries(['udgået', 'trukket'].map((reason) => [reason, gsbTeams.filter((r) => r.withdrawal_reason === reason).length])),
  collaboration_records_separate_not_counted_as_gsb: collaborationTeams.length,
};
if (gsbTotal.found !== gsbTotal.placed_active + gsbTotal.unplaced_active + gsbTotal.withdrawn) {
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
    source: '126-rangering-final.json rankings.deduplicated_physical_pools order, with per-pool format assigned using 126 method and 125 per-pool adjudications.',
    local_place: 'Position among distinct ranked formats present in the same age_group_id and season_id; global 126 position and tier are also retained.',
    unplaced: 'No usable category signature/format rank in 126; kept separate and never guessed.',
  },
  gsb_totals: gsbTotal,
  placement_by_season_age: placements,
  width_overall_by_age_group: overallWidthByAge,
  club_name_normalization_totals: normalizationTotals,
  collaborations_separate: collaborationOutput,
  controls: {
    manual_samples: sampleChecks,
    gsb_balance: gsbTotal.found === gsbTotal.placed_active + gsbTotal.unplaced_active + gsbTotal.withdrawn,
    region_id_8_exact_name: regionCopenhagen.name === 'Badminton København',
    region_8_missing_division_rows: rowStructure.missing_division_rows,
    all_region_8_pools_have_details: detailsCoverage.pools === detailsCoverage.detailed_pools,
    current_season_excluded_from_overall: overallWidthByAge.every((row) => !row.season_ids_included.includes(2026)),
    club_normalization_examples: normalizationExamples,
    database_hashes_and_row_counts_unchanged: before.normalized.sha256 === after.normalized.sha256
      && before.landscape.sha256 === after.landscape.sha256
      && JSON.stringify(before.normalized.row_counts) === JSON.stringify(after.normalized.row_counts)
      && JSON.stringify(before.landscape.row_counts) === JSON.stringify(after.landscape.row_counts),
  },
  databases: { before, after },
};
if (report.controls.region_8_missing_division_rows !== 0) throw new Error('Cannot group all Region 8 league rows: missing division_name_raw');
if (!report.controls.all_region_8_pools_have_details) throw new Error('Region 8 physical pools lack league_group_details records');
if (!report.controls.database_hashes_and_row_counts_unchanged) throw new Error('A read-only database baseline changed');

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
  r.gsb_best_format ? `${r.gsb_best_format.format} (Tier ${r.gsb_best_format.tier}; ${r.gsb_best_format.place_in_season_age}/${r.gsb_best_format.formats_present}; 126 #${r.gsb_best_format.global_126_position}${r.placement_completeness_note ? `; ${r.placement_completeness_note}` : ''})` : (r.placement_completeness_note ?? '—'),
  r.highest_format ? `${r.highest_format.format} (Tier ${r.highest_format.tier})` : 'ingen placerbart format',
  r.gsb_active_unplaced_records,
  r.gsb_withdrawn_records,
]);
const widthRows = placements.filter((r) => r.kbh_width).map((r) => [
  seasonReportLabel(r), `${r.age_group_name} (ID ${r.age_group_id})`,
  `${r.kbh_width.league_rows.gsb_in} af ${r.kbh_width.league_rows.total} (${pct(r.kbh_width.league_rows.percent)})`,
  `${r.kbh_width.physical_pools.gsb_in} af ${r.kbh_width.physical_pools.total} (${pct(r.kbh_width.physical_pools.percent)})`,
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
  t.tier === null ? 'Uplaceret' : `Tier ${t.tier}; 126 #${t.global_126_position}`, t.withdrawal_reason ?? '',
]));
const clubDetailRows = placements.flatMap((period) => (period.highest_format_clubs ?? []).map((club) => [
  seasonReportLabel(period), `${period.age_group_name} (${period.age_group_id})`,
  period.highest_format?.format, club.normalized_club_name, club.raw_team_names.join('; '),
]));
const collaborationRows = collaborationOutput.map((item) => [
  item.season, `${item.age_group_name} (${item.age_group_id})`, item.raw_team_name,
  item.physical_pool_key, item.format ?? 'Uplaceret', item.tier === null ? '—' : `Tier ${item.tier}`,
]);
const normalizationRows = normalizationChanges.map((item) => [
  item.raw_team_name, item.normalized_club_name, item.season_age_occurrences,
]);
const sampleRows = sampleChecks.map((s) => [
  s.season_status === 'i gang, ufuldstændig' ? `${s.season} (i gang, ufuldstændig)` : s.season, `${s.age_group_name} (${s.age_group_id})`, s.source_pool_list.length,
  s.highest_format ? `${s.highest_format.format} (Tier ${s.highest_format.tier})` : '—',
  `${s.width_rows.gsb_in}/${s.width_rows.total}`, `${s.width_physical_pools.gsb_in}/${s.width_physical_pools.total}`,
  `${s.per_pool_125_matches}/${s.per_pool_125_available} 125-format match; ${s.source_pool_list.length - s.per_pool_125_available} fallback/other`,
  s.source_pool_list.map((p) => `${p.pool_key}: ${p.raw_team_name} → ${p.format}${p.withdrawal_reason ? ` (${p.withdrawal_reason})` : ''}`).join('<br>'),
]);
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

Poolenes format følger 126's per-pool metode: 125's afgørelser for S4/D2-puljer, ellers kategorisignatur/formattekst som i 126. Tier og global placering følger rækkefølgen i \`126-rangering-final.json\`. “x/n” er plads blandt de forskellige placerbare formater, der findes nationalt i samme sæson og aldersgruppe; uplacerede formater indgår ikke i n. **2026/2027 er i gang og ufuldstændig**; sæsonens viste placering gælder kun de endnu spillede/kategoriserede puljer. Når n=1, står der “kun ét format findes” frem for “i højeste format”.

${mdTable(['Sæson', 'Aldersgruppe', 'GSB hold-puljeposter', 'GSB-status', 'Bedste GSB-format', 'Højeste nationalt', 'Aktive uplacerede', 'Udgået/trukket'], placementRows)}

### Alle GSB-hold/puljer

${mdTable(['Sæson', 'Alder', 'Råt holdnavn', 'Fysisk pulje', 'Række', 'Pulje/fase', 'Format', 'Rang', 'Status'], poolDetailRows)}

### Klubber i højeste format — normaliseret navn og rå holdnavne

${mdTable(['Sæson', 'Alder', 'Højeste format', 'Normaliseret klubenhed', 'Rå holdnavne'], clubDetailRows)}

Samarbejder med slash bevares som én normaliseret enhed. Udgåede/trukne hold er udeladt fra klublisten og vises separat i JSON pr. sæson/aldersgruppe.

### Klubnavnenormalisering — ændrede rå navne

HTML-entiteter er dekodet før normalisering; parentestekst, stjernemarkerede noter, statusmarkører (fx UDGÅET/trukket) og trailing holdnummer fjernes. Normaliseringen ændrede ${normalizationTotals.changed_team_records} af ${normalizationTotals.highest_format_team_records} holdnavneforekomster i højeste-format-klublisterne, fordelt på ${normalizationTotals.distinct_raw_name_variants_changed} forskellige rå navne (${normalizationTotals.raw_name_variant_season_age_occurrences} rå-navn/sæson-alder-forekomster). Tabellen viser alle ændrede rå-varianter:

${mdTable(['Råt holdnavn', 'Normaliseret klubnavn', 'Sæson/aldersgruppe-forekomster'], normalizationRows)}

### Samarbejdshold rapporteret separat (ikke GSB)

${mdTable(['Sæson', 'Alder', 'Råt holdnavn', 'Fysisk pulje', 'Format', 'Tier'], collaborationRows)}

## Deltagelsesbredde B — Badminton København

\`GSB i x af n\` viser både antal og procent. Udgåede/trukne hold tæller ikke i x; de vises særskilt. 2026/2027 er markeret **i gang, ufuldstændig** og indgår ikke i “Samlet over tid”. Samlet over tid summeres afsluttede sæsoner kun inden for samme aldersgruppe.

${mdTable(['Sæson', 'Aldersgruppe', 'Rækker/ligaer', 'Fysiske puljer', 'GSB-hold udeladt'], widthRows)}

### Samlet over tid pr. aldersgruppe (sæsonoptællinger summeret)

${mdTable(['Aldersgruppe', 'Sæsoner', 'Rækker/ligaer', 'Fysiske puljer'], overallRows)}

## Optælling

- GSB-hold-puljeposter fundet: **${gsbTotal.found}** = aktive placerede **${gsbTotal.placed_active}** + aktive uplacerede **${gsbTotal.unplaced_active}** + udgået/trukket **${gsbTotal.withdrawn}**.
- Udgået: **${gsbTotal.withdrawn_by_reason.udgået}**; trukket: **${gsbTotal.withdrawn_by_reason.trukket}**.
- Samarbejdshold rapporteret separat, ikke GSB: **${gsbTotal.collaboration_records_separate_not_counted_as_gsb}**.

## Fem stikprøver — puljeliste, placering og bredde

${mdTable(['Sæson', 'Alder', 'GSB-puljer', 'Højeste format', 'Rækker GSB/total', 'Puljer GSB/total', '125-katalog formatkontrol', 'Pulje-/formatkontrol'], sampleRows)}

Stikprøverne blev sammenholdt med de rå \`league_groups\`, \`league_group_regions\`, \`league_group_teams\`-rækker og 126's fysiske puljeformatkilder. Hver liste viser pool-nøgle, holdnavn, række/pulje og format; 125-formatet blev også sammenholdt direkte for alle sample-puljer der findes i 125-kataloget. Bredde kontrolleres på division- og puljenøgler.

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
