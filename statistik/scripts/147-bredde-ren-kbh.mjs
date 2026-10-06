import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = path.resolve('statistik');
const dbPath = path.join(root, 'data/liga-landskab.db');
const normalizedPath = path.join(root, 'data/gsb-statistik-normalized.db');
const source143Path = path.join(root, 'results/143-ungdom-i-tal.json');
const source145Path = path.join(root, 'results/145-ungdom-i-tal.json');
const source146Path = path.join(root, 'results/146-region-bredde.json');
const outputJson = path.join(root, 'results/147-bredde-ren-kbh.json');
const outputMd = path.join(root, 'results/147-bredde-ren-kbh.md');
const expectedHashes = {
  landscape: '9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c',
  normalized: '49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e',
};
const ageIds = [2, 3, 4, 5, 6, 7, 18];
const formatOrder = new Map([['4+3', 1], ['4+2', 2], ['2+2', 3], ['4 spillere', 4], ['4 piger', 5], ['3 spillere', 6]]);
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function snapshot(file) {
  const hash = sha256(file);
  const db = new DatabaseSync(file, { readOnly: true });
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const rowCounts = Object.fromEntries(tables.map(({ name }) => [name, Number(db.prepare(`SELECT count(*) AS n FROM "${name.replaceAll('"', '""')}"`).get().n)]));
  db.close();
  return { sha256: hash, row_counts: rowCounts };
}
const before = { landscape: snapshot(dbPath), normalized: snapshot(normalizedPath) };
for (const [key, hash] of Object.entries(expectedHashes)) {
  if (before[key].sha256 !== hash) throw new Error(`${key} SHA-256 mismatch before run: ${before[key].sha256}`);
}
const data143 = JSON.parse(fs.readFileSync(source143Path, 'utf8'));
const data145 = JSON.parse(fs.readFileSync(source145Path, 'utf8'));
const data146 = JSON.parse(fs.readFileSync(source146Path, 'utf8'));
const key = (season, age) => `${season}|${age}`;
const rowKey = (season, age, division) => `${season}|${age}|${division}`;
const regionDb = new DatabaseSync(dbPath, { readOnly: true });
const regionNames = new Map(regionDb.prepare('SELECT region_id,name FROM regions').all().map((r) => [r.region_id, r.name]));
const rawRows = regionDb.prepare(`
  SELECT g.season_id,g.age_group_id,a.name AS age_group_name,g.league_group_id,g.division_name_raw,
         r.region_id,t.league_group_team_id,t.team_name_raw
  FROM league_groups g JOIN age_groups a USING(age_group_id)
  LEFT JOIN league_group_regions r USING(season_id,age_group_id,league_group_id)
  LEFT JOIN league_group_teams t USING(season_id,age_group_id,league_group_id)
  WHERE g.age_group_id IN (${ageIds.join(',')}) AND g.season_id BETWEEN 2011 AND 2026
  ORDER BY g.season_id,g.age_group_id,g.league_group_id,t.league_group_team_id
`).all();
regionDb.close();

const divisionMap = new Map();
const all143Combos = new Map(data143.placement_by_season_age.map((c) => [key(c.season_id, c.age_group_id), c]));
for (const raw of rawRows) {
  if (!all143Combos.has(key(raw.season_id, raw.age_group_id))) continue;
  const k = rowKey(raw.season_id, raw.age_group_id, raw.division_name_raw ?? '');
  if (!divisionMap.has(k)) divisionMap.set(k, { season_id: raw.season_id, age_group_id: raw.age_group_id, age_group_name: raw.age_group_name, division_name_raw: raw.division_name_raw, region_ids: new Set(), league_group_ids: new Set(), team_names: new Set() });
  const division = divisionMap.get(k);
  if (raw.region_id !== null) division.region_ids.add(Number(raw.region_id));
  division.league_group_ids.add(String(raw.league_group_id));
  if (raw.team_name_raw) division.team_names.add(raw.team_name_raw);
}
const all145Combos = new Map(data145.placement_and_width_by_season_age.map((c) => [key(c.season_id, c.age_group_id), c]));
const all146Combos = new Map(data146.region8_pool_scope_by_season_age.map((c) => [key(c.season_id, c.age_group_id), c]));
const sourceRows = new Map();
const provisionalFormats = new Map((data145.provisional_rows ?? []).map((r) => [rowKey(r.season_id, r.age_group_id, r.division_name_raw), r.format]));
for (const combo of data143.placement_by_season_age) {
  for (const row of combo.kbh_width?.all_rows ?? []) sourceRows.set(rowKey(combo.season_id, combo.age_group_id, row.division_name_raw), row);
}
const partnershipRows = new Map((data145.holdfaellesskab ?? []).map((r) => [rowKey(r.season_id, r.age_group_id, r.row), r]));
const isWithdrawn = (name) => /\b(?:udgået|udgaet|trukket)\b|\*\s*(?:udgået|udgaet|trukket)\s*\*/iu.test(String(name ?? ''));
function canonicalFormat(raw) {
  const value = String(raw ?? '').replace(/^Uplaceret:\s*/u, '').trim();
  if (formatOrder.has(value)) return value;
  return null;
}
function rowFormat(division, source) {
  const k = rowKey(division.season_id, division.age_group_id, division.division_name_raw);
  if (provisionalFormats.has(k)) return provisionalFormats.get(k);
  const partnership = partnershipRows.get(k);
  if (partnership) {
    const m = String(division.division_name_raw ?? '').match(/\b(4\s*\+\s*3|4\s*\+\s*2|2\s*\+\s*2)\b/u);
    if (m) return m[1].replace(/\s+/gu, '');
  }
  return canonicalFormat(source?.format);
}
const divisions = [...divisionMap.values()].filter((d) => d.region_ids.has(8));
const rowRecordsByCombo = new Map();
for (const division of divisions) {
  const comboKey = key(division.season_id, division.age_group_id);
  const source = sourceRows.get(rowKey(division.season_id, division.age_group_id, division.division_name_raw));
  if (!source) throw new Error(`No 143 row evidence for region-8 division: ${comboKey} ${division.division_name_raw}`);
  const partnership = partnershipRows.get(rowKey(division.season_id, division.age_group_id, division.division_name_raw));
  const gsbNames = new Set((source.gsb_teams ?? []).filter((name) => !isWithdrawn(name)));
  if (partnership) gsbNames.add(partnership.raw_team_name);
  const regions = [...division.region_ids].sort((a, b) => a - b).map((id) => ({ region_id: id, name: regionNames.get(id) ?? 'ukendt region' }));
  const raekkeType = division.region_ids.size === 1 && division.region_ids.has(8) ? 'ren_kbh' : 'blandet';
  const record = {
    division_name_raw: division.division_name_raw,
    raekke_type: raekkeType,
    regioner: regions,
    included_in_width: Boolean(source.included_in_width),
    gsb_med: gsbNames.size > 0,
    format: rowFormat(division, source),
    gsb_hold: [...gsbNames],
    league_group_ids: [...division.league_group_ids].sort(),
  };
  if (!rowRecordsByCombo.has(comboKey)) rowRecordsByCombo.set(comboKey, []);
  rowRecordsByCombo.get(comboKey).push(record);
}

const seasonAge = data143.placement_by_season_age.map((base) => {
  const comboKey = key(base.season_id, base.age_group_id);
  const rows = rowRecordsByCombo.get(comboKey) ?? [];
  const included = rows.filter((r) => r.included_in_width);
  const pureIncluded = included.filter((r) => r.raekke_type === 'ren_kbh');
  const recognizedFormats = (sourceRows) => [...new Set(sourceRows.map((r) => r.format).map(canonicalFormat).filter(Boolean))].sort((a, b) => formatOrder.get(a) - formatOrder.get(b));
  const bFormatNames = recognizedFormats(pureIncluded);
  const aFormatNames = recognizedFormats(included);
  const a145 = all145Combos.get(comboKey)?.inkl_holdfaellesskab?.bredde;
  const b146 = all146Combos.get(comboKey)?.widths?.B;
  if (!a145 || !b146) throw new Error(`Missing 145/146 baseline for ${comboKey}`);
  const aRowsGsb = a145.rows;
  const aFormatsGsb = a145.formats;
  const bRowsGsb = b146.rows;
  const bFormatsGsb = b146.formats;
  const actualAGsbRows = included.filter((r) => r.gsb_med).length;
  const actualAGsbFormats = [...new Set(included.filter((r) => r.gsb_med).map((r) => r.format).filter((f) => formatOrder.has(f)))].sort((a, b) => formatOrder.get(a) - formatOrder.get(b));
  if (actualAGsbRows !== aRowsGsb || actualAGsbFormats.length !== aFormatsGsb) {
    throw new Error(`A row-level GSB evidence mismatch vs 145 for ${comboKey}: computed ${actualAGsbRows}/${actualAGsbFormats.join(',')} vs ${aRowsGsb}/${a145.format_names?.join(',')}`);
  }
  const bFormatSetForGsb = b146.format_names ?? [];
  const actualBGsbRows = pureIncluded.filter((r) => r.gsb_med).length;
  const actualBGsbFormats = [...new Set(pureIncluded.filter((r) => r.gsb_med).map((r) => r.format).filter((f) => formatOrder.has(f)))].sort((a, b) => formatOrder.get(a) - formatOrder.get(b));
  if (actualBGsbRows !== bRowsGsb || actualBGsbFormats.length !== bFormatsGsb || JSON.stringify(actualBGsbFormats) !== JSON.stringify(bFormatSetForGsb)) {
    throw new Error(`B mismatch vs 146 for ${comboKey}: computed ${actualBGsbRows}/${actualBGsbFormats.join(',')} vs ${bRowsGsb}/${bFormatSetForGsb.join(',')}`);
  }
  const aRowsDenominatorFrom143 = base.kbh_width?.league_rows?.total;
  const aFormatsDenominatorFromRows = aFormatNames.length;
  if (aRowsDenominatorFrom143 !== included.length) throw new Error(`A row denominator mismatch vs 143 for ${comboKey}: ${aRowsDenominatorFrom143} vs ${included.length}`);
  return {
    season_id: base.season_id, season: base.season, age_group_id: base.age_group_id, age_group_name: base.age_group_name,
    a_rows_total: included.length, a_formats_total: aFormatsDenominatorFromRows, a_format_names: aFormatNames,
    a_rows_gsb: aRowsGsb, a_formats_gsb: aFormatsGsb,
    b_rows_total: pureIncluded.length, b_formats_total: bFormatNames.length, b_format_names: bFormatNames,
    b_rows_gsb: bRowsGsb, b_formats_gsb: bFormatsGsb,
    b_gsb_format_names: bFormatSetForGsb,
    rows: rows.sort((a, b) => String(a.division_name_raw).localeCompare(String(b.division_name_raw), 'da')),
  };
});

const samples = [
  { season_id: 2026, age_group_id: 5 },
  { season_id: 2024, age_group_id: 4 },
  { season_id: 2012, age_group_id: 5 },
].map(({ season_id, age_group_id }) => {
  const c = seasonAge.find((x) => x.season_id === season_id && x.age_group_id === age_group_id);
  return { season_id, age_group_id, season: c?.season, age_group_name: c?.age_group_name, b_rows_total: c?.b_rows_total, b_formats_total: c?.b_formats_total, b_format_names: c?.b_format_names };
});
const after = { landscape: snapshot(dbPath), normalized: snapshot(normalizedPath) };
if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error('Database hash or row counts changed');
const check = {
  combinations: seasonAge.length,
  a_rows_and_formats_match_145: seasonAge.filter((c) => c.a_rows_gsb === all145Combos.get(key(c.season_id, c.age_group_id)).inkl_holdfaellesskab.bredde.rows && c.a_formats_gsb === all145Combos.get(key(c.season_id, c.age_group_id)).inkl_holdfaellesskab.bredde.formats).length,
  b_rows_and_formats_match_146: seasonAge.filter((c) => c.b_rows_gsb === all146Combos.get(key(c.season_id, c.age_group_id)).widths.B.rows && c.b_formats_gsb === all146Combos.get(key(c.season_id, c.age_group_id)).widths.B.formats).length,
  b_numerators_within_denominators: seasonAge.filter((c) => c.b_rows_gsb <= c.b_rows_total && c.b_formats_gsb <= c.b_formats_total).length,
  unknown_region_rows: seasonAge.flatMap((c) => c.rows.filter((r) => !r.regioner.length).map((r) => ({ season: c.season, age_group: c.age_group_name, row: r.division_name_raw }))),
  database_hashes_unchanged: JSON.stringify(before) === JSON.stringify(after),
  databases_before: before,
  databases_after: after,
};
if (check.combinations !== 69 || check.a_rows_and_formats_match_145 !== 69 || check.b_rows_and_formats_match_146 !== 69 || check.b_numerators_within_denominators !== 69 || check.unknown_region_rows.length) throw new Error(`Control failed: ${JSON.stringify(check)}`);

const result = {
  title: 'Opgave 147 — bredde med ren København-nævner',
  source: 'liga-landskab.db (readOnly: true), 143/145/146 outputfiler; ingen netværk',
  method: 'Rækken aggregeres på sæson, årgang og division_name_raw; regioner forenes over alle puljer. ren_kbh præcis når mængden er {8}; ellers blandet. included_in_width følger 143 (UGE 38/Kredsmatch m.m. ekskluderet). GSB-medlemskab følger 143 all_rows plus GSB-samarbejder i 145.',
  denominator_note: '145 gemmer A-bredde som GSB-tællere, ikke nævnere. A-nævnerne er derfor genberegnet fra 143-rækkelisten; A-tællerne sammenlignes med 145. B-tællerne sammenlignes med 146.',
  combinations: seasonAge,
  samples,
  controls: check,
};
const markdown = [
  '# Opgave 147 — ren København-nævner og rækkemærke', '',
  'En række er ren_kbh, hvis unionen af region-id’er på tværs af dens puljer er præcis {8}; ellers er den blandet. Included følger 143: UGE 38 og Kredsmatch er udelukket fra bredden. GSB-medlemskab inkluderer 145’s to godkendte holdfællesskaber.', '',
  '145’s A-bredde indeholder GSB-tællere, ikke samlede nævnere. Derfor er A-nævnerne beregnet fra 143’s region-8-rækkeliste, mens A-tællerne kontrolleres mod 145. B-tællere kontrolleres mod 146.', '',
  '| Sæson | Årgang | A rækker GSB/total | A formater GSB/total | B rækker GSB/total | B formater GSB/total | B-formater i alt |',
  '|---|---|---:|---:|---:|---:|---|',
  ...seasonAge.map((c) => `| ${c.season} | ${c.age_group_name} | ${c.a_rows_gsb}/${c.a_rows_total} | ${c.a_formats_gsb}/${c.a_formats_total} | ${c.b_rows_gsb}/${c.b_rows_total} | ${c.b_formats_gsb}/${c.b_formats_total} | ${c.b_format_names.join(', ') || '—'} |`),
  '', '## Stikprøver', '', '| Sæson | Årgang | B rækker i alt | B formater i alt | Formater |', '|---|---|---:|---:|---|',
  ...samples.map((s) => `| ${s.season} | ${s.age_group_name} | ${s.b_rows_total} | ${s.b_formats_total} | ${s.b_format_names.join(', ') || '—'} |`),
  '', '## Kontrol', '', `- Kombinationsrækker: ${check.combinations}/69. A-GSB-rækker/-formater mod 145: ${check.a_rows_and_formats_match_145}/69. B-GSB-rækker/-formater mod 146: ${check.b_rows_and_formats_match_146}/69. B-tællere inden for nævnere: ${check.b_numerators_within_denominators}/69.`,
  '- Alle regionmængder kunne fastslås; ingen rækker med ukendt region.',
  '- Parserens registrerede testpakke køres særskilt med outputskrivning undertrykt; se kortets resultatnote.',
  '', 'Databaser åbnet readOnly: true. SHA-256 og tabelrækketal før/efter ligger i JSON og er uændrede.', '',
].join('\n');
fs.writeFileSync(outputJson, `${JSON.stringify(result, null, 2)}\n`);
fs.writeFileSync(outputMd, `${markdown}\n`);
console.log(JSON.stringify({ outputs: [outputJson, outputMd], combinations: check.combinations, a_match_145: check.a_rows_and_formats_match_145, b_match_146: check.b_rows_and_formats_match_146, numerators_within_denominators: check.b_numerators_within_denominators, samples, db_hashes_unchanged: check.database_hashes_unchanged }, null, 2));
