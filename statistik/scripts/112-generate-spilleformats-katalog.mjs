import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

// Extends the field extraction from 046 and the sorted category signature from
// 103.  It deliberately keeps unknown text in freetext_raw instead of treating
// a best-effort token as a classification.
const dbPath = path.resolve('statistik/data/liga-landskab.db');
const outputJson = 'statistik/results/112-spilleformats-katalog-alle-aargange-v2.json';
const outputMd = 'statistik/results/112-spilleformats-katalog-alle-aargange-v2.md';
const noCategories = 'ingen gemte kategorier';
const categoryTypes = ['MD', 'DS', 'DD', 'HS', 'HD', 'S', 'D'];

function profileKey(counts) {
  return categoryTypes.filter((type) => counts[type] > 0).map((type) => `${type}${counts[type]}`).join('/');
}

function profileFromSignature(signature) {
  if (!signature || signature === noCategories) return null;
  const counts = Object.fromEntries(categoryTypes.map((type) => [type, 0]));
  for (const category of signature.split(' · ')) {
    const match = category.match(/^\d+\.\s*(MD|DS|DD|HS|HD|S|D)$/u);
    if (!match) return null;
    counts[match[1]] += 1;
  }
  return counts;
}

const canonicalProfiles = [
  ['4+3', { MD: 2, DS: 2, DD: 1, HS: 2, HD: 2 }],
  ['3 spillere', { S: 4, D: 1 }],
  ['4 spillere', { S: 4, D: 2 }],
  ['2+2', { MD: 2, DS: 2, DD: 1, HS: 2, HD: 1 }],
  ['4+2', { MD: 1, DS: 1, DD: 1, HS: 3, HD: 2 }],
  ['4 piger', { DS: 4, DD: 2 }],
  ['5 spillere', { S: 4, D: 3 }],
];
const familyByProfile = new Map(canonicalProfiles.map(([family, counts]) => [profileKey({ ...Object.fromEntries(categoryTypes.map((type) => [type, 0])), ...counts }), family]));
const unisexProfileByFamily = new Map();
for (const [family, counts] of canonicalProfiles) {
  if (family === '3 spillere' || family === '4 spillere' || family === '5 spillere') continue;
  const unisex = Object.fromEntries(categoryTypes.map((type) => [type, 0]));
  for (const type of ['MD', 'DS', 'DD']) unisex[type] = counts[type] ?? 0;
  unisex.S = counts.HS ?? 0;
  unisex.D = counts.HD ?? 0;
  if (family === '4 piger') {
    unisex.DS = 0;
    unisex.DD = 0;
    unisex.S = 4;
    unisex.D = 2;
  }
  unisexProfileByFamily.set(profileKey(unisex), family);
}

const db = new DatabaseSync(dbPath, { readOnly: true });
const rows = db.prepare(`
  SELECT g.season_id, g.age_group_id, ag.name AS age_group_name,
         r.region_id, COALESCE(reg.name, 'ukendt region') AS region_name,
         g.league_group_id, COALESCE(g.division_name_raw, '') AS division_name_raw,
         COALESCE(g.group_name_raw, '') AS group_name_raw,
         COALESCE(g.page_title_raw, '') AS page_title_raw,
         COALESCE(k.group_type, 'andet/ukendt') AS group_type
  FROM league_groups g
  JOIN league_group_regions r
    ON r.season_id = g.season_id
   AND r.age_group_id = g.age_group_id
   AND r.league_group_id = g.league_group_id
  LEFT JOIN age_groups ag ON ag.age_group_id = g.age_group_id
  LEFT JOIN regions reg ON reg.region_id = r.region_id
  LEFT JOIN group_type_katalog k
    ON k.division_name_raw = COALESCE(g.division_name_raw, '')
   AND k.group_name_raw = COALESCE(g.group_name_raw, '')
  ORDER BY g.season_id, g.age_group_id, r.region_id, g.league_group_id
`).all();
const categoryRows = db.prepare(`
  SELECT mg.season_id, mg.age_group_id, mg.league_group_id, mc.category_raw
  FROM league_match_groups mg
  JOIN match_categories mc ON mc.external_match_id = mg.external_match_id
  WHERE mc.category_raw IS NOT NULL AND trim(mc.category_raw) <> ''
`).all();
db.close();

const categoriesByGroup = new Map();
for (const row of categoryRows) {
  const key = `${row.season_id}|${row.age_group_id}|${row.league_group_id}`;
  if (!categoriesByGroup.has(key)) categoriesByGroup.set(key, new Set());
  categoriesByGroup.get(key).add(row.category_raw.trim());
}
const categorySignature = (row) => {
  const key = `${row.season_id}|${row.age_group_id}|${row.league_group_id}`;
  const values = [...(categoriesByGroup.get(key) ?? [])].sort((a, b) => a.localeCompare(b, 'da'));
  return values.length ? values.join(' · ') : noCategories;
};

// Same token families as 046, with the forms 052/053 established as valid.
function parse046(text) {
  const lower = String(text).toLowerCase().normalize('NFC');
  let holdtype = null;
  let holdtypeMatch = null;
  const patterns = [
    [/\bx[12]\b/iu, (match) => match[0].toUpperCase()],
    [/\b2\s*\+\s*2\b/iu, () => '2+2'],
    [/\b4\s*\+\s*3\b/iu, () => '4+3'],
    [/\b4\s*\+\s*2\b/iu, () => '4+2'],
    [/\b3\s*spillere\b/iu, () => '3 spillere'],
    [/\b4\s*piger\b/iu, () => '4 piger'],
    [/\b4\s*spillere\b/iu, () => '4 spillere'],
  ];
  for (const [pattern, render] of patterns) {
    const match = lower.match(pattern);
    if (match) { holdtype = render(match); holdtypeMatch = match[0]; break; }
  }
  const levelMatch = lower.match(/u\d+\s*([abcd])\b|\b([abcd](?:\s*[-/]\s*[abcd])?|m)\b/iu);
  const niveau = levelMatch ? (levelMatch[1] ?? levelMatch[2]).replace(/\s+/gu, '').toUpperCase() : null;
  // A bare 3–5 digit number is commonly a pool number or year.  Keep a
  // threshold only where the raw syntax itself marks it as one: 5.800 / 5800
  // immediately before a format parenthesis, or a number followed by p/point.
  const formattedPoint = String(text).match(/\b(\d{1,2}[.\s]\d{3})\b/u);
  const unformattedPoint = String(text).match(/\b([1-9]\d{3,4})\s*\(\s*\d+\s*\+/u);
  const pointRaw = formattedPoint?.[1] ?? unformattedPoint?.[1] ?? null;
  return { holdtype, holdtypeMatch, niveau, pointgraense: pointRaw ? Number(pointRaw.replace(/[.\s]/gu, '')) : null, pointMatch: pointRaw };
}

const knownGroupWords = /\b(grundspil|slutspil|oprykningsspil|nedrykningsspil|kvalifikation(?:skamp)?|kvalkamp|kvalpulje|spilletider)\b/giu;
function freetextFor(row, parsed) {
  let value = [row.division_name_raw, row.group_name_raw, row.page_title_raw].filter(Boolean).join(' | ');
  value = value.normalize('NFC');
  if (row.age_group_name) value = value.replaceAll(row.age_group_name, '');
  if (parsed.holdtypeMatch) value = value.replace(new RegExp(parsed.holdtypeMatch.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'), 'giu'), '');
  if (parsed.niveau) value = value.replace(new RegExp(`\\b${parsed.niveau.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}\\b`, 'giu'), '');
  if (parsed.pointMatch) value = value.replace(new RegExp(`\\b${parsed.pointMatch}\\b`, 'gu'), '');
  value = value.replace(knownGroupWords, '').replace(/[|,;:()\-–]+/gu, ' ').replace(/\s+/gu, ' ').trim();
  return value || null;
}

const records = rows.map((row) => {
  // 046 parses league/competition text. page_title_raw adds only the season
  // label here, which otherwise makes e.g. 2010 look like a point threshold.
  const parseText = [row.division_name_raw, row.group_name_raw].filter(Boolean).join(' | ');
  const parsed = parse046(parseText);
  const signature = categorySignature(row);
  const profile = profileFromSignature(signature);
  const unisexEquivalent = profile ? unisexProfileByFamily.get(profileKey(profile)) ?? null : null;
  const signatureFamily = profile ? familyByProfile.get(profileKey(profile)) ?? null : null;
  const textHasGenderedAuthority = Boolean(parsed.holdtype && unisexEquivalent === parsed.holdtype);
  const spillefamilie = signatureFamily
    ? (textHasGenderedAuthority ? parsed.holdtype : signatureFamily)
    : parsed.holdtype;
  const conflict = Boolean(parsed.holdtype && signatureFamily && parsed.holdtype !== signatureFamily);
  const familySource = signatureFamily && !textHasGenderedAuthority
    ? 'kategorisignatur'
    : signatureFamily && textHasGenderedAuthority && signatureFamily === parsed.holdtype
      ? 'kategorisignatur+tekstregel'
    : spillefamilie ? 'tekstsignal' : 'ukendt';
  return {
    season_id: row.season_id,
    season: `${row.season_id}/${row.season_id + 1}`,
    region_id: row.region_id,
    region_name: row.region_name,
    age_group_id: row.age_group_id,
    age_group_name: row.age_group_name ?? `age_group_id ${row.age_group_id}`,
    level: parsed.niveau,
    spillefamilie,
    spillefamilie_source: familySource,
    spillefamilie_tekst: parsed.holdtype,
    spillefamilie_signatur: signatureFamily,
    spillefamilie_konflikt: conflict,
    pointgraense: parsed.pointgraense,
    group_type: row.group_type,
    category_signature: signature,
    freetext_raw: freetextFor(row, parsed),
    source: {
      league_group_id: row.league_group_id,
      division_name_raw: row.division_name_raw,
      group_name_raw: row.group_name_raw,
      page_title_raw: row.page_title_raw,
    },
  };
});

const combinationMap = new Map();
for (const record of records) {
  // The eight requested fields define a catalogue row. Freetext is attached
  // as a residual collection, not made into a pseudo-format of its own.
  const key = [record.season_id, record.region_id, record.age_group_id, record.level ?? '', record.spillefamilie ?? '', record.pointgraense ?? '', record.group_type, record.category_signature, record.spillefamilie_source].join('|');
  const existing = combinationMap.get(key) ?? {
    season_id: record.season_id, season: record.season, region_id: record.region_id, region_name: record.region_name,
    age_group_id: record.age_group_id, age_group_name: record.age_group_name, level: record.level,
    spillefamilie: record.spillefamilie, spillefamilie_source: record.spillefamilie_source,
    pointgraense: record.pointgraense, group_type: record.group_type, category_signature: record.category_signature,
    occurrences: 0, unique_groups: new Set(), freetext_values: new Set(),
  };
  existing.occurrences += 1;
  existing.unique_groups.add(`${record.season_id}|${record.age_group_id}|${record.source.league_group_id}`);
  if (record.freetext_raw) existing.freetext_values.add(record.freetext_raw);
  combinationMap.set(key, existing);
}
const combinations = [...combinationMap.values()].map((item) => ({
  ...item,
  unique_groups: item.unique_groups.size,
  freetext_distinct_count: item.freetext_values.size,
  freetext_samples: [...item.freetext_values].sort((a, b) => a.localeCompare(b, 'da')).slice(0, 10),
  freetext_values: undefined,
  _unused: undefined,
}))
  .sort((a, b) => b.occurrences - a.occurrences || a.season_id - b.season_id);
const rawCategories = [...new Set(categoryRows.map((row) => row.category_raw.trim()))].sort((a, b) => a.localeCompare(b, 'da'));
const veteranPattern = /(?:sen\s*\+\s*|\b)(?:30|35|40|45|50|55|60|65|70|75|80)\+?/iu;
const veteranInSignatures = [...new Set(records.filter((record) => veteranPattern.test(record.category_signature)).map((record) => record.category_signature))];
const veteranInFamily = records.filter((record) => veteranPattern.test(record.spillefamilie ?? '')).length;
const freetextRecords = records.filter((record) => record.freetext_raw);
const summary = {
  occurrences: records.length,
  unique_groups: new Set(records.map((record) => `${record.season_id}|${record.age_group_id}|${record.source.league_group_id}`)).size,
  seasons: [...new Set(records.map((record) => record.season_id))].sort((a, b) => a - b),
  age_groups: [...new Set(records.map((record) => `${record.age_group_id}|${record.age_group_name}`))].sort(),
  regions: [...new Set(records.map((record) => `${record.region_id}|${record.region_name}`))].sort(),
  category_codes: rawCategories,
  category_code_count: rawCategories.length,
  family_source_counts: Object.fromEntries([...new Set(records.map((record) => record.spillefamilie_source))].sort().map((source) => [source, records.filter((record) => record.spillefamilie_source === source).length])),
  family_conflict_count: records.filter((record) => record.spillefamilie_konflikt).length,
  freetext_occurrences: freetextRecords.length,
  freetext_distinct: new Set(freetextRecords.map((record) => record.freetext_raw)).size,
  veteran_age_code_check: { signatures_with_veteran_code: veteranInSignatures, family_field_leak_count: veteranInFamily },
};
const output = { generated_at: new Date().toISOString(), method: { parser: '046 token extraction copied without changing 046', category_signature: '103 sorted distinct category_raw codes per season/age_group/league_group', freetext: 'raw source remainder after only evidenced fields are removed' }, summary, combinations };
const signatureCorrectionSamples = new Map();
const youthSampleAgeIds = new Set([2, 3, 4, 5, 6, 7, 18]);
for (const record of records) {
  if (!youthSampleAgeIds.has(record.age_group_id)) continue;
  if (record.spillefamilie_source !== 'kategorisignatur' || record.spillefamilie === record.spillefamilie_tekst) continue;
  const poolKey = `${record.season_id}|${record.age_group_id}|${record.source.league_group_id}`;
  if (signatureCorrectionSamples.has(poolKey)) continue;
  signatureCorrectionSamples.set(poolKey, {
    pool_key: poolKey,
    season_id: record.season_id,
    age_group_id: record.age_group_id,
    age_group_name: record.age_group_name,
    old_text_family: record.spillefamilie_tekst,
    corrected_spillefamilie: record.spillefamilie,
    category_signature: record.category_signature,
    source_text: [record.source.division_name_raw, record.source.group_name_raw, record.source.page_title_raw].filter(Boolean).join(' | '),
  });
  if (signatureCorrectionSamples.size === 5) break;
}
output.signature_correction_samples = [...signatureCorrectionSamples.values()];
output.family_conflicts = records.filter((record) => record.spillefamilie_konflikt).map((record) => ({
  season: record.season,
  region_id: record.region_id,
  age_group_id: record.age_group_id,
  league_group_id: record.source.league_group_id,
  text_family: record.spillefamilie_tekst,
  signature_family: record.spillefamilie_signatur,
  selected_family: record.spillefamilie,
  category_signature: record.category_signature,
  resolution: unisexProfileByFamily.get(profileKey(profileFromSignature(record.category_signature) ?? {})) === record.spillefamilie_tekst
    ? '115-regel: tekstens kønnede familie vinder over tilsvarende ukønnet signatur'
    : 'kanonisk kategorisignatur valgt; tekst/signatur-konflikt bevaret',
}));
fs.writeFileSync(outputJson, `${JSON.stringify(output, null, 2)}\n`);

const sourceTable = Object.entries(summary.family_source_counts).map(([key, value]) => `| ${key} | ${value} |`).join('\n');
const topCombinations = combinations.slice(0, 80).map((row) => `| ${row.season} | ${row.region_id} ${row.region_name} | ${row.age_group_name} | ${row.level ?? 'ukendt'} | ${row.spillefamilie ?? 'ukendt'} | ${row.pointgraense ?? 'ukendt'} | ${row.group_type} | ${row.category_signature} | ${row.occurrences} | ${row.freetext_distinct_count} |`).join('\n');
const markdown = `# Opgave 112 — spilleformats-katalog for alle årgange\n\n## Dækning\n\n| Felt | Tal |\n|---|---:|\n| Pulje-region-forekomster | ${summary.occurrences} |\n| Unikke puljer (sæson, aldersgruppe, pulje-id) | ${summary.unique_groups} |\n| Sæsoner | ${summary.seasons.length} (${summary.seasons[0]}/${summary.seasons.at(-1) + 1}) |\n| Aldersgrupper | ${summary.age_groups.length} |\n| Regioner | ${summary.regions.length} |\n| Distinkte category_raw-koder | ${summary.category_code_count} |\n| Feltkombinationer | ${combinations.length} |\n| Forekomster med synlig fritekst-rest | ${summary.freetext_occurrences} |\n| Distinkte fritekst-rester | ${summary.freetext_distinct} |\n\nFritekst er den rå resterende række-/pulje-/sidetekst efter kun dokumenterede felter er fjernet. Den indgår ikke i kombinationsnøglen; hvert katalogfelt viser i JSON antal og eksempler på sine rester.\n\n## Sikkerhed for spillefamilie\n\n| Kilde | Forekomster |\n|---|---:|\n${sourceTable}\n\nKategorisignaturen er den sorterede rå mængde af category_raw-koder og er den stærkeste evidens. Tekstsignal er 046-parserens genkendte holdtype. Ukendt betyder, at hverken kategorier eller et tekstsignal foreligger.\n\n## Veteran-kontrol\n\n${summary.veteran_age_code_check.signatures_with_veteran_code.length === 0 ? 'Ingen veteran-aldersgrænsekode forekommer i nogen kategorisignatur.' : `Veteran-koder i kategorisignaturer: ${summary.veteran_age_code_check.signatures_with_veteran_code.join('; ')}.`} Læk til Spillefamilie-feltet: **${summary.veteran_age_code_check.family_field_leak_count}**. Aldersgrænser bevares derfor kun i rå kildetekst/aldersgruppe, ikke som spillefamilie.\n\n## Mest brugte feltkombinationer\n\n| Sæson | Region | Aldersgruppe | Niveau | Spillefamilie | Point | Gruppetype | Kategorisignatur | Forekomster | Friteksttyper |\n|---|---|---|---|---|---:|---|---|---:|---:|\n${topCombinations}\n\nDet maskinlæsbare katalog indeholder alle ${combinations.length} kombinationer med antal, antal unikke puljer og fritekst-eksempler. De ${records.length} rå kilderekorder duplikeres ikke i git-artefaktet: [112-spilleformats-katalog-alle-aargange.json](112-spilleformats-katalog-alle-aargange.json).\n`;
fs.writeFileSync(outputMd, `${markdown.trimEnd()}\n`);
console.log(JSON.stringify(summary, null, 2));
