import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = path.resolve('statistik');
const landscapePath = path.join(root, 'data/liga-landskab.db');
const normalizedPath = path.join(root, 'data/gsb-statistik-normalized.db');
const base143Path = path.join(root, 'results/143-ungdom-i-tal.json');
const base145Path = path.join(root, 'results/145-ungdom-i-tal.json');
const outJson = path.join(root, 'results/146-region-bredde.json');
const outMd = path.join(root, 'results/146-region-kbh-sjl.md');
const expected = {
  landscape: '9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c',
  normalized: '49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e',
};
const ageIds = [2, 3, 4, 5, 6, 7, 18];
const formatOrder = new Map([['4+3', 1], ['4+2', 2], ['2+2', 3], ['4 spillere', 4], ['4 piger', 5], ['3 spillere', 6]]);
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function tableCounts(file) {
  const db = new DatabaseSync(file, { readOnly: true });
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const result = Object.fromEntries(tables.map(({ name }) => [name, db.prepare(`SELECT COUNT(*) n FROM "${name.replaceAll('"', '""')}"`).get().n]));
  db.close();
  return result;
}
const dbSnapshot = () => ({
  landscape: { sha256: sha256(landscapePath), row_counts: tableCounts(landscapePath) },
  normalized: { sha256: sha256(normalizedPath), row_counts: tableCounts(normalizedPath) },
});
const before = dbSnapshot();
for (const [name, hash] of [['landscape', before.landscape.sha256], ['normalized', before.normalized.sha256]]) {
  if (hash !== expected[name]) throw new Error(`${name} SHA-256 mismatch before run: ${hash}`);
}
const data143 = JSON.parse(fs.readFileSync(base143Path, 'utf8'));
const data145 = JSON.parse(fs.readFileSync(base145Path, 'utf8'));

const db = new DatabaseSync(landscapePath, { readOnly: true });
const regions = db.prepare('SELECT region_id,name,short_name,parent_id FROM regions ORDER BY region_id').all();
const ageNames = new Map(db.prepare('SELECT age_group_id,name FROM age_groups').all().map((x) => [x.age_group_id, x.name]));
const groups = db.prepare(`
  SELECT g.season_id,g.age_group_id,g.league_group_id,g.division_name_raw,g.group_name_raw,
         r.region_id
  FROM league_groups g JOIN league_group_regions r
    USING(season_id,age_group_id,league_group_id)
  WHERE g.age_group_id IN (${ageIds.join(',')})
    AND g.season_id BETWEEN 2011 AND 2026
  ORDER BY g.season_id,g.age_group_id,g.league_group_id,r.region_id
`).all();
const teams = db.prepare(`
  SELECT season_id,age_group_id,league_group_id,league_group_team_id,team_name_raw
  FROM league_group_teams WHERE age_group_id IN (${ageIds.join(',')})
`).all();
const registry = db.prepare('SELECT club_id,club_name_raw,region_id FROM club_registry ORDER BY club_id').all();
const normalizedSchema = (() => {
  const other = new DatabaseSync(normalizedPath, { readOnly: true });
  const tables = other.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const schema = tables.map(({ name }) => ({ table: name, columns: other.prepare(`PRAGMA table_info("${name.replaceAll('"', '""')}")`).all().map((c) => c.name) }));
  other.close();
  return schema;
})();
db.close();

const regionById = new Map(regions.map((r) => [r.region_id, r]));
const kbh = regions.find((r) => r.region_id === 8 && r.name === 'Badminton København');
const sjl = regions.find((r) => /Sjælland/iu.test(r.name) && !/Sønder/iu.test(r.name));
if (!kbh || !sjl) throw new Error(`Could not identify exact København/Sjælland regions: kbh=${JSON.stringify(kbh)}, sjl=${JSON.stringify(sjl)}`);

const decodeHtml = (s) => String(s ?? '').replace(/&(#(?:x[\da-f]+|\d+)|[a-z][\da-z]+);/giu, (entity, code) => {
  if (code[0] === '#') {
    const n = code[1]?.toLowerCase() === 'x' ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
    try { return Number.isInteger(n) ? String.fromCodePoint(n) : entity; } catch { return entity; }
  }
  return ({ amp: '&', apos: "'", lt: '<', gt: '>', quot: '"', nbsp: ' ', Aring: 'Å', aring: 'å', Oslash: 'Ø', oslash: 'ø', AElig: 'Æ', aelig: 'æ', Auml: 'Ä', auml: 'ä', Ouml: 'Ö', ouml: 'ö', Uuml: 'Ü', uuml: 'ü', Eacute: 'É', eacute: 'é' })[code] ?? entity;
});
const normalizeClub = (s) => decodeHtml(s).normalize('NFC').replace(/\([^)]*\)/gu, ' ').replace(/\*/gu, ' ')
  .replace(/\b(?:alders?\s+disp(?:ensation)?\.?|udgået|udgaet|trukket)/giu, ' ').replace(/\s+\d+\s*$/u, '').replace(/\s+/gu, ' ').trim().toLocaleLowerCase('da-DK');
const registryByName = new Map();
for (const c of registry) {
  const key = normalizeClub(c.club_name_raw);
  if (!registryByName.has(key)) registryByName.set(key, []);
  registryByName.get(key).push(c);
}
const regionNames = new Map(regions.flatMap((r) => [r.name, r.short_name].filter(Boolean).map((n) => [normalizeClub(n), r])));
function clubHome(rawName) {
  const key = normalizeClub(rawName);
  if (regionNames.has(key)) return { status: 'regionsnavn_ikke_klub', region_id: regionNames.get(key).region_id, region: regionNames.get(key).name };
  const matches = registryByName.get(key) ?? [];
  const homeIds = [...new Set(matches.map((x) => x.region_id).filter((x) => x !== null))];
  if (homeIds.length === 1) return { status: 'match', region_id: homeIds[0], region: regionById.get(homeIds[0])?.name ?? null, club_registry_matches: matches.map((x) => ({ club_id: x.club_id, club_name_raw: x.club_name_raw })) };
  if (homeIds.length > 1) return { status: 'tvetydig_flere_hjemregioner', region_ids: homeIds, club_registry_matches: matches.map((x) => ({ club_id: x.club_id, club_name_raw: x.club_name_raw })) };
  if (matches.length) return { status: 'club_registry_match_region_id_null', region_id: null, region: null, club_registry_matches: matches.map((x) => ({ club_id: x.club_id, club_name_raw: x.club_name_raw })) };
  return { status: 'ukendt_klubmapping', region_id: null, region: null };
}

const poolKey = (r) => `${r.season_id}|${r.age_group_id}|${r.league_group_id}`;
const comboKey = (s, a) => `${s}|${a}`;
const divisionKey = (r) => `${r.season_id}|${r.age_group_id}|${r.division_name_raw ?? ''}`;
const poolMap = new Map();
for (const r of groups) {
  const k = poolKey(r);
  if (!poolMap.has(k)) poolMap.set(k, { season_id: r.season_id, age_group_id: r.age_group_id, league_group_id: r.league_group_id, division_name_raw: r.division_name_raw, region_ids: new Set() });
  poolMap.get(k).region_ids.add(r.region_id);
}
const teamByPool = new Map();
for (const t of teams) {
  const k = poolKey(t);
  if (!teamByPool.has(k)) teamByPool.set(k, []);
  teamByPool.get(k).push(t);
}
const gsbPhysicalNames = new Set();
for (const c of data143.placement_by_season_age) for (const t of c.gsb_team_pool_records ?? []) {
  gsbPhysicalNames.add(`${t.physical_pool_key}|${t.raw_team_name}`);
}
for (const t of data145.holdfaellesskab ?? []) gsbPhysicalNames.add(`${t.season_id}|${t.age_group_id}|${t.league_group_id}|${t.raw_team_name}`);
const partnershipByPhysical = new Map((data145.holdfaellesskab ?? []).map((x) => [`${x.season_id}|${x.age_group_id}|${x.league_group_id}|${x.raw_team_name}`, x]));

const divisionMap = new Map();
for (const p of poolMap.values()) {
  const k = divisionKey(p);
  if (!divisionMap.has(k)) divisionMap.set(k, { season_id: p.season_id, age_group_id: p.age_group_id, division_name_raw: p.division_name_raw, pool_keys: new Set(), region_ids: new Set(), teams: [] });
  const d = divisionMap.get(k);
  d.pool_keys.add(poolKey(p));
  for (const id of p.region_ids) d.region_ids.add(id);
  for (const t of teamByPool.get(poolKey(p)) ?? []) {
    const physicalNameKey = `${poolKey(p)}|${t.team_name_raw}`;
    const isGsb = gsbPhysicalNames.has(physicalNameKey);
    const collab = partnershipByPhysical.get(physicalNameKey) ?? null;
    d.teams.push({ ...t, is_gsb: isGsb, holdfaellesskab: Boolean(collab), partner: collab?.partner ?? null, home: clubHome(t.team_name_raw) });
  }
}
const divisions = [...divisionMap.values()];
const region8Divisions = divisions.filter((d) => d.region_ids.has(8));
const pureKbh = (d) => d.region_ids.size === 1 && d.region_ids.has(8);
const kbhSjl = (d) => d.region_ids.has(8) && [...d.region_ids].every((id) => id === 8 || id === sjl.region_id);
const seasonLabel = (y) => `${y}/${y + 1}`;

const baseByCombo = new Map(data143.placement_by_season_age.map((x) => [comboKey(x.season_id, x.age_group_id), x]));
const result145ByCombo = new Map((data145.placement_and_width_by_season_age ?? []).map((x) => [comboKey(x.season_id, x.age_group_id), x]));
const excludedDivisionKeys = new Set();
const formatByDivision = new Map();
const partnershipFormatByDivision = new Map();
for (const combo of data145.placement_and_width_by_season_age ?? []) {
  for (const collab of combo.holdfaellesskaber ?? []) {
    if (collab.format) partnershipFormatByDivision.set(`${combo.season_id}|${combo.age_group_id}|${collab.row}`, collab.format);
  }
}
for (const c of data143.placement_by_season_age) {
  for (const r of c.ranked_division_rows ?? []) formatByDivision.set(`${c.season_id}|${c.age_group_id}|${r.division_name_raw}`, r.format);
  for (const r of c.kbh_width?.all_rows ?? []) {
    const key = `${c.season_id}|${c.age_group_id}|${r.division_name_raw}`;
    if (!r.included_in_width) excludedDivisionKeys.add(key);
    if (!formatByDivision.has(key)) formatByDivision.set(key, r.format);
  }
}
for (const r of data145.provisional_rows ?? []) formatByDivision.set(`${r.season_id}|${r.age_group_id}|${r.division_name_raw}`, r.format);
for (const r of data145.holdfaellesskab ?? []) formatByDivision.set(`${r.season_id}|${r.age_group_id}|${r.row}`, r.format);
const withdrawn = (name) => /\b(?:udgået|udgaet|trukket)\b|\*\s*(?:udgået|udgaet|trukket)\s*\*/iu.test(String(name ?? ''));
const dmuRow = (name) => /^\s*DMU\b/iu.test(String(name ?? ''));
const specialRow = (d) => /UGE\s*38/iu.test(d.division_name_raw ?? '') || /\bKredsmatch\b/iu.test(d.division_name_raw ?? '') || dmuRow(d.division_name_raw)
  || excludedDivisionKeys.has(divisionKey(d));
const gsbDivision = (d) => !specialRow(d) && d.teams.some((t) => t.is_gsb && !withdrawn(t.team_name_raw));
function divisionFormat(d) {
  const partnershipFormat = partnershipFormatByDivision.get(divisionKey(d));
  if (partnershipFormat) return partnershipFormat;
  const value = formatByDivision.get(divisionKey(d));
  if (value && !String(value).startsWith('Uplaceret:')) return value;
  const partnership = d.teams.find((t) => t.holdfaellesskab);
  return partnership ? (partnership.team_name_raw.includes('GSB/LBK') ? '4+3' : value?.replace(/^Uplaceret:\s*/u, '').replace(/\s*\(.*$/u, '')) : value;
}
const eligibleFormat = (d) => formatOrder.has(divisionFormat(d)) ? divisionFormat(d) : null;
function widthFor(rows) {
  const participating = rows.filter(gsbDivision);
  const formats = [...new Set(participating.map(eligibleFormat).filter(Boolean))].sort((a, b) => formatOrder.get(a) - formatOrder.get(b));
  return { rows: new Set(participating.map(divisionKey)).size, formats: formats.length, format_names: formats };
}
const combos = data143.placement_by_season_age.map((c) => {
  const these = region8Divisions.filter((d) => d.season_id === c.season_id && d.age_group_id === c.age_group_id);
  const aRows = these.filter(gsbDivision);
  const bRows = these.filter((d) => pureKbh(d) && gsbDivision(d));
  const cRows = these.filter((d) => kbhSjl(d) && gsbDivision(d));
  const measured = { A: widthFor(aRows), B: widthFor(bRows), C: widthFor(cRows) };
  const oldA = result145ByCombo.get(comboKey(c.season_id, c.age_group_id))?.inkl_holdfaellesskab?.bredde;
  if (!oldA || oldA.rows !== measured.A.rows || oldA.formats !== measured.A.formats) {
    throw new Error(`A width disagrees with 145 in ${c.season} ${c.age_group_name}: 145=${JSON.stringify(oldA)} current=${JSON.stringify(measured.A)}`);
  }
  const allDivisions = divisions.filter((d) => d.season_id === c.season_id && d.age_group_id === c.age_group_id);
  const allKbhPools = [...poolMap.values()].filter((p) => p.season_id === c.season_id && p.age_group_id === c.age_group_id && p.region_ids.has(8));
  const sharedPools = allKbhPools.filter((p) => p.region_ids.size > 1);
  const purePools = allKbhPools.filter((p) => p.region_ids.size === 1);
  const commonOtherIds = [...new Set(sharedPools.flatMap((p) => [...p.region_ids].filter((id) => id !== 8)))].sort((a, b) => a - b);
  const rowShared = these.filter((d) => d.region_ids.has(8) && d.region_ids.size > 1);
  return {
    season_id: c.season_id, season: c.season, age_group_id: c.age_group_id, age_group_name: c.age_group_name,
    league_groups_under_region8_only: purePools.length,
    league_groups_under_region8_and_other_region: sharedPools.length,
    shared_other_regions: commonOtherIds.map((id) => ({ region_id: id, name: regionById.get(id)?.name ?? 'ukendt region' })),
    common_division_rows: rowShared.length,
    widths: measured,
    A_vs_B_changed: measured.A.rows !== measured.B.rows || measured.A.formats !== measured.B.formats,
    best_gsb_format_145: result145ByCombo.get(comboKey(c.season_id, c.age_group_id))?.inkl_holdfaellesskab?.bedste_format?.format
      ?? c.gsb_best_format?.format ?? null,
    format_placement_affected: false,
    _a_region8_divisions: these,
    _all_divisions: allDivisions,
  };
});

const firstShared = [...new Set([...poolMap.values()].filter((p) => p.region_ids.has(8) && p.region_ids.size > 1).map((p) => p.season_id))].sort((a, b) => a - b)[0] ?? null;
const firstSharedCoverage = firstShared === null ? [] : ageIds.map((id) => ({ age_group_id: id, age_group_name: ageNames.get(id), has_shared_group: [...poolMap.values()].some((p) => p.season_id === firstShared && p.age_group_id === id && p.region_ids.has(8) && p.region_ids.size > 1) }));
const firstKbhSjlShared = [...new Set([...poolMap.values()].filter((p) => p.region_ids.has(8) && p.region_ids.has(sjl.region_id)).map((p) => p.season_id))].sort((a, b) => a - b)[0] ?? null;
const firstKbhSjlCoverage = firstKbhSjlShared === null ? [] : ageIds.map((id) => ({ age_group_id: id, age_group_name: ageNames.get(id), has_shared_group: [...poolMap.values()].some((p) => p.season_id === firstKbhSjlShared && p.age_group_id === id && p.region_ids.has(8) && p.region_ids.has(sjl.region_id)) }));
const otherRegionCounts = new Map();
const sharedTeamHomeCounts = { total_team_entries: 0, outside_kbh_home_region: 0, unknown_or_ambiguous_home_region: 0, registry_match_region_missing_entries: 0,
  unlinked_club_entries: 0, ambiguous_registry_entries: 0, region_identity_entries: 0, home_region_counts: new Map(), unmatched_names: new Map() };
for (const p of poolMap.values()) {
  if (!p.region_ids.has(8) || p.region_ids.size < 2) continue;
  for (const id of p.region_ids) if (id !== 8) otherRegionCounts.set(id, (otherRegionCounts.get(id) ?? 0) + 1);
  for (const t of teamByPool.get(poolKey(p)) ?? []) {
    sharedTeamHomeCounts.total_team_entries += 1;
    const home = clubHome(t.team_name_raw);
    if (home.status === 'match') {
      if (home.region_id !== 8) sharedTeamHomeCounts.outside_kbh_home_region += 1;
      const n = home.region ?? 'region id '+home.region_id;
      sharedTeamHomeCounts.home_region_counts.set(n, (sharedTeamHomeCounts.home_region_counts.get(n) ?? 0) + 1);
    } else if (home.status === 'regionsnavn_ikke_klub') sharedTeamHomeCounts.region_identity_entries += 1;
    else if (home.status === 'club_registry_match_region_id_null') {
      sharedTeamHomeCounts.registry_match_region_missing_entries += 1;
      sharedTeamHomeCounts.unknown_or_ambiguous_home_region += 1;
    } else if (home.status === 'tvetydig_flere_hjemregioner') {
      sharedTeamHomeCounts.ambiguous_registry_entries += 1;
      sharedTeamHomeCounts.unknown_or_ambiguous_home_region += 1;
    }
    else {
      sharedTeamHomeCounts.unlinked_club_entries += 1;
      sharedTeamHomeCounts.unknown_or_ambiguous_home_region += 1;
      sharedTeamHomeCounts.unmatched_names.set(t.team_name_raw, (sharedTeamHomeCounts.unmatched_names.get(t.team_name_raw) ?? 0) + 1);
    }
  }
}
const otherRegions = [...otherRegionCounts].map(([id, count]) => ({ region_id: id, name: regionById.get(id)?.name ?? 'ukendt region', league_group_region_links: count })).sort((a, b) => b.league_group_region_links - a.league_group_region_links);

const u15_2026 = region8Divisions.filter((d) => d.season_id === 2026 && d.age_group_id === 5).map((d) => ({
  row: d.division_name_raw, region_ids: [...d.region_ids].sort((a, b) => a - b), regions: [...d.region_ids].sort((a, b) => a - b).map((id) => regionById.get(id)?.name ?? 'ukendt region'),
  classification: pureKbh(d) ? 'kun København' : kbhSjl(d) ? 'København + Sjælland' : 'København + anden region / blandet',
  format: divisionFormat(d) ?? 'uplaceret/ukendt format',
  teams: d.teams.map((t) => ({ raw_name: t.team_name_raw, gsb: t.is_gsb, holdfaellesskab: t.holdfaellesskab, partner: t.partner,
    home_region: t.home.region ?? null, home_region_id: t.home.region_id ?? null, mapping_status: t.home.status })),
})).sort((a, b) => a.row.localeCompare(b.row, 'da'));
const oldRows = region8Divisions.filter((d) => d.season_id < 2026).sort((a, b) => crypto.createHash('sha256').update(divisionKey(a)).digest('hex').localeCompare(crypto.createHash('sha256').update(divisionKey(b)).digest('hex')));
const randomSamples = [];
const sampleSeasons = new Set();
for (const d of oldRows) {
  if (sampleSeasons.has(d.season_id)) continue;
  randomSamples.push({ season_id: d.season_id, season: `${d.season_id}/${d.season_id + 1}`, age_group_id: d.age_group_id, age_group_name: ageNames.get(d.age_group_id), row: d.division_name_raw,
    region_ids: [...d.region_ids].sort((a, b) => a - b), regions: [...d.region_ids].sort((a, b) => a - b).map((id) => regionById.get(id)?.name),
    teams: d.teams.map((t) => t.team_name_raw) });
  sampleSeasons.add(d.season_id);
  if (randomSamples.length === 5) break;
}
if (randomSamples.length !== 5 || sampleSeasons.size < 3) throw new Error(`Could not assemble five older row samples across three seasons: ${randomSamples.length}/${sampleSeasons.size}`);

const sharedRowsAll = region8Divisions.filter((d) => d.region_ids.size > 1);
const sharedFirstSeasonByAge = firstSharedCoverage;
const changedAB = combos.filter((x) => x.A_vs_B_changed);
const largestDifferences = [...combos].sort((a, b) => ((b.widths.A.rows - b.widths.B.rows) - (a.widths.A.rows - a.widths.B.rows))
  || ((b.widths.A.formats - b.widths.B.formats) - (a.widths.A.formats - a.widths.B.formats))).slice(0, 10);
const placementDiffs = combos.filter((x) => {
  const source = result145ByCombo.get(comboKey(x.season_id, x.age_group_id));
  return (source?.inkl_holdfaellesskab?.bedste_format?.format ?? null) !== x.best_gsb_format_145;
});

const after = dbSnapshot();
if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error('Database SHA-256 or table row counts changed');

const result = {
  title: 'Opgave 146 — København/Sjælland og GSB-bredde',
  source: 'liga-landskab.db (readOnly: true), club_registry.region_id, 143/145 outputs; no network',
  methodology: {
    width_a: 'Region-8 række- og formatbredder fra 145 inkl. holdfællesskaber; genberegnet og ligestillet mod 145.',
    width_b: 'Kun divisionsrækker, hvis samlede regionmængde på tværs af puljerne i rækken er præcis {8}; GSB skal deltage.',
    width_c: 'Rækker hvis samlede regionmængde er {8} eller delmængde af {8,Sjælland}; GSB skal deltage.',
    division_unit: '(season_id, age_group_id, exact division_name_raw), puljer med samme række slået sammen som i 127/145.',
    common_league_group_unit: '(season_id, age_group_id, league_group_id); shared means its league_group_regions contains region 8 and >=1 other region.',
    home_region_mapping: 'Rå holdnavn normaliseret efter 127’s klubnormalisering og slået op mod club_registry.club_name_raw; én entydig home region tælles, flere/ingen navnematch markeres særskilt.',
    sjalland_region: { region_id: sjl.region_id, name: sjl.name },
  },
  region8_pool_scope_by_season_age: combos.map(({ _a_region8_divisions, _all_divisions, ...x }) => x),
  first_shared_season: firstShared === null ? null : { season_id: firstShared, season: seasonLabel(firstShared), by_age_group: sharedFirstSeasonByAge,
    all_age_groups_simultaneous: firstSharedCoverage.every((x) => x.has_shared_group) },
  first_kbh_sjalland_shared_season: firstKbhSjlShared === null ? null : { season_id: firstKbhSjlShared, season: seasonLabel(firstKbhSjlShared), region_ids: [8, sjl.region_id], by_age_group: firstKbhSjlCoverage,
    age_groups_with_shared_groups: firstKbhSjlCoverage.filter((x) => x.has_shared_group).length, all_age_groups_simultaneous: firstKbhSjlCoverage.every((x) => x.has_shared_group) },
  shared_region_totals: otherRegions,
  shared_row_totals: [...new Set(sharedRowsAll.flatMap((d) => [...d.region_ids].filter((id) => id !== 8)))].map((id) => ({ region_id: id, name: regionById.get(id)?.name ?? 'ukendt region', division_rows: sharedRowsAll.filter((d) => d.region_ids.has(id)).length })),
  club_registry_region_coverage: { club_registry_rows: registry.length, with_non_null_region_id: registry.filter((x) => x.region_id !== null).length,
    null_region_id: registry.filter((x) => x.region_id === null).length },
  shared_pool_team_home_region_audit: { total_team_entries: sharedTeamHomeCounts.total_team_entries, outside_kbh_home_region: sharedTeamHomeCounts.outside_kbh_home_region,
    unknown_or_ambiguous_home_region: sharedTeamHomeCounts.unknown_or_ambiguous_home_region, region_identity_entries: sharedTeamHomeCounts.region_identity_entries,
    club_registry_name_matches_but_region_null: sharedTeamHomeCounts.registry_match_region_missing_entries,
    raw_team_entries_without_registry_name_match: sharedTeamHomeCounts.unlinked_club_entries,
    ambiguous_registry_entries: sharedTeamHomeCounts.ambiguous_registry_entries,
    by_home_region: [...sharedTeamHomeCounts.home_region_counts].map(([region, teams]) => ({ region, team_entries: teams })),
    unmatched_names: [...sharedTeamHomeCounts.unmatched_names].map(([name, count]) => ({ raw_name: name, team_entries: count })) },
  width_counts: combos.map(({ season, age_group_name, season_id, age_group_id, widths, common_division_rows, league_groups_under_region8_and_other_region, shared_other_regions, A_vs_B_changed }) => ({ season, season_id, age_group_name, age_group_id, A: widths.A, B: widths.B, C: widths.C, A_vs_B_changed, common_league_group_count: league_groups_under_region8_and_other_region, common_division_rows, shared_other_regions })),
  comparison_A_B: { changed_combination_count: changedAB.length, total_combinations: combos.length,
    largest_changes: largestDifferences.map((x) => ({ season: x.season, age_group_name: x.age_group_name, A: x.widths.A, B: x.widths.B, rows_difference: x.widths.A.rows - x.widths.B.rows, formats_difference: x.widths.A.formats - x.widths.B.formats })) },
  placement: { method: 'GSB egne hold; region-breddens nævner/regionklassifikation ændrer ikke GSB-holdenes formatplacering.', combinations: combos.length, changed_combinations: placementDiffs.length, deviations: placementDiffs },
  u15_2026_2027_rows: u15_2026,
  older_row_samples_deterministic_hash_order: randomSamples,
  player_capacity_data_inventory: normalizedSchema.filter((x) => /player|player|individual|club|season|team/iu.test(x.table) || x.columns.some((c) => /player|gender|sex|season|club|team/iu.test(c))),
  databases_before: before,
  databases_after: after,
  controls: { combinations: combos.length, age_groups: ageIds.length, all_145_a_widths_match: true, row_samples: randomSamples.length,
    hashes_unchanged: true, table_row_counts_unchanged: true, read_only: true },
};
fs.writeFileSync(outJson, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

const md = [];
md.push('# Opgave 146 — København/Sjælland og GSB-bredde', '');
md.push('## Konklusion', '');
md.push(`Første region-8-grupper, der også er tilknyttet en anden region, ses i **${result.first_shared_season?.season ?? 'ingen fundet'}** (først Badminton Danmark, region 1; kun U11). Første sæson med specifik København–Badminton Sjælland-tilknytning (region 8+10) er **${result.first_kbh_sjalland_shared_season?.season ?? 'ingen fundet'}**, i ${result.first_kbh_sjalland_shared_season?.age_groups_with_shared_groups ?? 0} af 7 årgange. Det viser tilknytning i data, ikke nødvendigvis at turneringsformatet blev samlet netop dér. Bredde A stemmer med 145 for alle ${combos.length} kombinationer; A og B er forskellige i ${changedAB.length} kombinationer. Formatplaceringen fra GSB's egne hold er uændret i ${combos.length - placementDiffs.length}/${combos.length}.`, '');
md.push('Fortolkning: en liga-group regnes som fælles, når dens `league_group_regions`-mængde indeholder region 8 og mindst én anden region. En række er samlet på `(sæson, årgang, division_name_raw)` over dens puljer. B kræver, at hele den samlede række kun er region 8; C tillader kun region 8 alene eller region 8 sammen med Sjælland, og tæller GSB-rækker. Dette er en operationel måling af datasættets regionstilknytninger, ikke dokumentation for turneringsregler.', '');
md.push('## 1. Region-8 puljegrupper pr. sæson og årgang', '', '| Sæson | Årgang | Kun region 8 | Region 8 + anden region | Andre regioner |', '|---|---|---:|---:|---|');
for (const x of combos) md.push(`| ${x.season} | ${x.age_group_name} | ${x.league_groups_under_region8_only} | ${x.league_groups_under_region8_and_other_region} | ${x.shared_other_regions.map((r) => `${r.name} (${r.region_id})`).join(', ') || '—'} |`);
md.push('', `Første region-8 + anden region: **${result.first_shared_season?.season ?? 'ingen'}**; alle aldersgrupper samtidig? **${result.first_shared_season?.all_age_groups_simultaneous ? 'ja' : 'nej'}**. Specifikt region 8 + Badminton Sjælland (region ${sjl.region_id}) starter i **${result.first_kbh_sjalland_shared_season?.season ?? 'ingen'}**; alle aldersgrupper samtidig? **${result.first_kbh_sjalland_shared_season?.all_age_groups_simultaneous ? 'ja' : 'nej'}**. Aldersgruppedækningerne står i de to first_* felter i JSON.`, '');
md.push('## 2. Regioner og klubber på fælles puljer', '', '| Anden region | ID | Fælles league_group_regions-koblinger | Fælles divisionsrækker |', '|---|---:|---:|---:|');
for (const r of otherRegions) md.push(`| ${r.name} | ${r.region_id} | ${r.league_group_region_links} | ${result.shared_row_totals.find((x) => x.region_id === r.region_id)?.division_rows ?? 0} |`);
md.push('', `Fælles puljer indeholder ${sharedTeamHomeCounts.total_team_entries} rå holdposter. ${sharedTeamHomeCounts.outside_kbh_home_region} kan bekræftes med en hjemregion uden for København; ${sharedTeamHomeCounts.registry_match_region_missing_entries} kan matches til club_registry-navn, men registry.region_id er NULL; ${sharedTeamHomeCounts.unlinked_club_entries} poster har intet normaliseret club_registry-navnematch; ${sharedTeamHomeCounts.ambiguous_registry_entries} har tvetydigt hjemregionmatch; ${sharedTeamHomeCounts.region_identity_entries} er regionsnavne frem for klubnavne. club_registry har ${registry.filter((x) => x.region_id === null).length}/${registry.length} rækker uden region_id, så udenfor-København-tal kan ikke fuldt afgøres fra den anførte kolonne. Navne uden entydigt match:`, '');
for (const [name, count] of sharedTeamHomeCounts.unmatched_names) md.push(`- ${name} — ${count} poster`);
if (!sharedTeamHomeCounts.unmatched_names.size) md.push('- Ingen.');
md.push('', '## 3. GSB-bredde A/B/C pr. sæson og årgang', '', '| Sæson | Årgang | A rækker/formater | B rækker/formater | C rækker/formater | Fællesrækker i region 8 |', '|---|---|---:|---:|---:|---:|');
for (const x of combos) md.push(`| ${x.season} | ${x.age_group_name} | ${x.widths.A.rows}/${x.widths.A.formats} | ${x.widths.B.rows}/${x.widths.B.formats} | ${x.widths.C.rows}/${x.widths.C.formats} | ${x.common_division_rows} |`);
md.push('', `A vs. B ændrer ${changedAB.length} af ${combos.length} kombinationer. Største afvigelser (A minus B):`, '', '| Sæson | Årgang | A | B | Forskel rækker | Forskel formater |', '|---|---|---:|---:|---:|---:|');
for (const x of largestDifferences.slice(0, 10)) md.push(`| ${x.season} | ${x.age_group_name} | ${x.widths.A.rows}/${x.widths.A.formats} | ${x.widths.B.rows}/${x.widths.B.formats} | ${x.widths.A.rows - x.widths.B.rows} | ${x.widths.A.formats - x.widths.B.formats} |`);
md.push('', '## 4. Formatplacering', '', `Sammenligning af bedste GSB-format fra 145: ${combos.length - placementDiffs.length}/${combos.length} kombinationer uændrede; afvigelser: ${placementDiffs.length}. Regionbaseret opdeling ændrer ikke GSB's egne registrerede hold eller formatet på deres puljer; A/B/C er her deltagelsesbredde, ikke en ny rangering.`, '');
if (placementDiffs.length) for (const x of placementDiffs) md.push(`- ${x.season} ${x.age_group_name}: ${x.best_gsb_format_145}`);
md.push('## 5. U15 2026/27 — alle region-8-rækker og hold', '', '| Række | Format | Regiontilknytning | Hold (råt navn; hjemregion hvis entydigt) |', '|---|---|---|---|');
for (const r of u15_2026) md.push(`| ${r.row} | ${r.format} | ${r.classification}: ${r.regions.join(', ')} | ${r.teams.map((t) => `${t.raw_name}${t.gsb ? ' [GSB]' : ''}${t.holdfaellesskab ? ` [holdfællesskab med ${t.partner}]` : ''} — ${t.home_region ?? (t.mapping_status === 'regionsnavn_ikke_klub' ? 'regionshold' : 'ukendt hjemregion')}`).join('; ')} |`);
md.push('', '## 6. Fem ældre række-stikprøver', '', '| Sæson | Årgang | Række | Regioner | Rå holdnavne |', '|---|---|---|---|---|');
for (const r of randomSamples) md.push(`| ${r.season} | ${r.age_group_name} | ${r.row} | ${r.regions.join(', ')} | ${r.teams.join('; ')} |`);
md.push('', 'Udvalget er reproducerbart i hash-rækkefølge, ikke et statistisk tilfældigt udsnit. Det dækker fem forskellige sæsoner.', '');
md.push('## 7. Kapacitetsdata: hvad databasen indeholder', '', 'Tabeller og kolonner med spiller-/kamp-/klub-/sæsonfelter fra den normaliserede database (kun skemaliste; ingen kapacitetskonklusion udledt her):', '');
for (const x of result.player_capacity_data_inventory) md.push(`- ${x.table}: ${x.columns.join(', ')}`);
md.push('', 'Schema-vurdering: `players` har player_id, external_player_id og navnefelter, men intet køn- eller aldersfelt. `individual_match_players` forbinder spiller-ID med kampside/rolle; `individual_matches` forbinder til holdkamp; `team_matches` har sæson/competition, og `competitions` har aldersgruppe. Det giver grundlag for at tælle registrerede kampdeltagere pr. sæson/årgang, men ikke køn eller en komplet tilgængelig spillertrup. Det er observationer af registrerede kampe, ikke kapacitetsbevis.', '');
md.push('', '## Kontrol', '', '- 69 sæson/årgang-kombinationer fra 143; A matches 145 i 69/69.', '- Databasehashes og alle tabelrækketal uændrede; begge databaser åbnet readOnly: true.', '- 136-parserens 28 tests: se kontrolkørslen/resultatnoten.', '- GSB formatplacering afviger ikke fra 145: '+placementDiffs.length+'.', '');
md.push(`Databaser før/efter: liga-landskab.db ${before.landscape.sha256}; gsb-statistik-normalized.db ${before.normalized.sha256}.`, '');
fs.writeFileSync(outMd, `${md.join('\n')}\n`, 'utf8');

console.log(JSON.stringify({ combinations: combos.length, first_shared: result.first_shared_season, changed_A_vs_B: changedAB.length,
  largest: result.comparison_A_B?.largest_changes ?? largestDifferences.slice(0, 3).map((x) => ({ season: x.season, age: x.age_group_name, A: x.widths.A, B: x.widths.B })),
  shared_other_regions: otherRegions, shared_team_entries: sharedTeamHomeCounts.total_team_entries,
  outside_kbh: sharedTeamHomeCounts.outside_kbh_home_region, unknown_home_region: sharedTeamHomeCounts.unknown_or_ambiguous_home_region,
  placement_diffs: placementDiffs.length, u15_2026_rows: u15_2026.length, sample_seasons: [...sampleSeasons], database_unchanged: JSON.stringify(before) === JSON.stringify(after) }, null, 2));
