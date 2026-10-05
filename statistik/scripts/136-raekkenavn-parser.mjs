import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const dbPath = path.resolve('statistik/data/liga-landskab.db');
const normalizedPath = path.resolve('statistik/data/gsb-statistik-normalized.db');
const rulesRoot = path.resolve('statistik/kilder/reglementer');
const effectJsonPath = path.resolve('statistik/results/136-parser-effekt.json');
const effectMdPath = path.resolve('statistik/results/136-parser-effekt.md');
const xReportPath = path.resolve('statistik/results/136-x-dx-bd-undersoegelse.md');
const expectedHash = '9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c';
const expectedNormalizedHash = '49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e';
const youthIds = [2, 3, 4, 5, 6, 7, 18];
const levels = { E: 0, M: 1, A: 2, B: 3, C: 4, 'C-D': 5, D: 6 };
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function rowCounts(file) {
  const db = new DatabaseSync(file, { readOnly: true });
  const names = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const counts = Object.fromEntries(names.map(({ name }) => [name, db.prepare(`SELECT COUNT(*) AS n FROM "${name.replaceAll('"', '""')}"`).get().n]));
  db.close();
  return counts;
}
const before = { sha256: sha256(dbPath), row_counts: rowCounts(dbPath) };
if (before.sha256 !== expectedHash) throw new Error(`liga-landskab.db hash mismatch: ${before.sha256}`);
const normalizedBefore = { sha256: sha256(normalizedPath), row_counts: rowCounts(normalizedPath) };
if (normalizedBefore.sha256 !== expectedNormalizedHash) throw new Error(`gsb-statistik-normalized.db hash mismatch: ${normalizedBefore.sha256}`);

const db = new DatabaseSync(dbPath, { readOnly: true });
const rows = db.prepare(`
  SELECT g.season_id,g.age_group_id,a.name AS age_group_name,g.league_group_id,
         g.division_name_raw,g.group_name_raw
  FROM league_groups g
  LEFT JOIN age_groups a USING(age_group_id)
  WHERE g.age_group_id IN (${youthIds.join(',')})
  ORDER BY g.season_id,g.age_group_id,g.league_group_id
`).all();
const regionRows = db.prepare(`
  SELECT g.season_id,g.age_group_id,a.name AS age_group_name,g.league_group_id,
         g.division_name_raw,g.group_name_raw,r.region_id,COALESCE(reg.name,'ukendt region') AS region_name
  FROM league_groups g JOIN league_group_regions r USING(season_id,age_group_id,league_group_id)
  LEFT JOIN age_groups a USING(age_group_id) LEFT JOIN regions reg USING(region_id)
  WHERE g.age_group_id IN (${youthIds.join(',')})
  ORDER BY g.season_id,g.age_group_id,g.league_group_id,r.region_id
`).all();
db.close();

function decodeEntities(value) {
  return String(value ?? '').replace(/&(#(?:x[\da-f]+|\d+)|[a-z][a-z\d]+);/giu, (raw, token) => {
    if (token[0] === '#') {
      const code = token[1]?.toLowerCase() === 'x' ? Number.parseInt(token.slice(2), 16) : Number.parseInt(token.slice(1), 10);
      try { return Number.isInteger(code) ? String.fromCodePoint(code) : raw; } catch { return raw; }
    }
    return ({ amp: '&', apos: "'", quot: '"', nbsp: ' ', Aring: 'Å', aring: 'å', Oslash: 'Ø', oslash: 'ø', AElig: 'Æ', aelig: 'æ' })[token] ?? raw;
  }).normalize('NFC');
}
function legacyParse(name) {
  const value = String(name ?? '');
  const match = value.match(/\bU\d+(?:\s*\/\s*(?:U)?\d+)?\s*([EMABCD](?:\s*[-/]\s*[EMABCD])?)(?=[^A-Za-z]|$)/iu);
  if (!match) return null;
  const raw = match[1].replaceAll(' ', '').toUpperCase();
  const parts = raw.split(/[/-]/u);
  const top = raw === 'C-D' ? null : parts.sort((a, b) => levels[a] - levels[b])[0];
  const numeric = value.slice(match.index + match[0].length).match(/\b(\d{3,5})\b/u);
  return { level_type: 'letter', raw_level: raw, level_letter: top, level_order: top ? levels[top] : levels['C-D'], numeric_value: numeric ? Number(numeric[1]) : null, rule: 'eksisterende 129-parser' };
}
function parse(name) {
  const raw = String(name ?? '');
  const value = decodeEntities(raw).trim();
  if (/\bbegynder/iu.test(value) || /årets\s+u11\s+hold/iu.test(value)) {
    return { status: 'separat_liste', level_type: null, raw_level: null, level_letter: null, numeric_value: null, tolkning_regel: 'forslag-6' };
  }
  const existing = legacyParse(raw);
  if (existing) return { status: 'tolket', ...existing, tolkning_regel: null };
  if (/^\d+$/u.test(value)) return { status: 'tolket', level_type: 'numeric_only', raw_level: value, level_letter: null, level_order: Number(value), numeric_value: Number(value), tolkning_regel: 'forslag-1' };
  const compact = value.match(/\b(CD|MA|AB)\b/iu);
  if (compact) {
    const rawPair = compact[1].toUpperCase();
    const parts = [...rawPair];
    const top = parts.sort((a, b) => levels[a] - levels[b])[0];
    const suffix = value.slice(compact.index + compact[0].length).match(/\b(\d{3,5})\b/u);
    return { status: 'tolket', level_type: 'letter_combination', raw_level: `${parts.length === 2 ? compact[1][0].toUpperCase() + '/' + compact[1][1].toUpperCase() : rawPair}`, level_letter: top, level_order: levels[top], numeric_value: suffix ? Number(suffix[1]) : null, tolkning_regel: 'forslag-2' };
  }
  const series = value.match(/\b([1-3])\s*\.?\s*serie\b/iu);
  if (series) return { status: 'tolket', level_type: 'series_number', raw_level: `${series[1]}. serie`, level_letter: null, level_order: Number(series[1]), numeric_value: Number(series[1]), tolkning_regel: 'forslag-3' };
  return { status: 'uafklaret', level_type: null, raw_level: null, level_letter: null, level_order: null, numeric_value: null, tolkning_regel: null };
}
const distinct = new Map();
for (const row of rows) {
  const name = row.division_name_raw ?? '';
  if (!distinct.has(name)) distinct.set(name, { name, posts: 0, groupRows: [] });
  const item = distinct.get(name); item.posts += 1; item.groupRows.push(row);
}
const names = [...distinct.values()].map((item) => ({ ...item, parsed: parse(item.name) }));
const baselineNames = names.filter((item) => legacyParse(item.name));
if (names.length !== 1986 || baselineNames.length !== 941 || names.filter((item) => !legacyParse(item.name)).reduce((n, x) => n + x.posts, 0) !== 3536) {
  throw new Error(`129 baseline changed: ${names.length} names, ${baselineNames.length} old-parser matches; expected 1986/941/3536`);
}
const proposalStats = {};
for (const rule of ['forslag-1', 'forslag-2', 'forslag-3', 'forslag-6']) {
  const matched = names.filter((item) => item.parsed.tolkning_regel === rule);
  proposalStats[rule] = { distinct_names: matched.length, physical_group_rows: matched.reduce((n, item) => n + item.posts, 0), examples: matched.slice(0, 20).map((item) => item.name) };
}
const current = names.filter((x) => x.parsed.status === 'tolket' && x.parsed.tolkning_regel === null);
const separate = names.filter((x) => x.parsed.status === 'separat_liste');
const unresolved = names.filter((x) => x.parsed.status === 'uafklaret');

const tests = [
  ...[['3800','forslag-1'],['4400','forslag-1'],['5600','forslag-1'],['6800','forslag-1']],
  ...[['U11 CD 4 Piger','forslag-2'],['U11 CD 4 Spillere','forslag-2'],['U15 MA 4+2','forslag-2'],['U15 AB 4+2','forslag-2'],['U13 CD 4 spillere','forslag-2'],['DMU Hold U13 CD 4 Sp.','forslag-2']],
  ...[['U11 1. Serie','forslag-3'],['U11 2. Serie','forslag-3'],['U11 3. Serie','forslag-3'],['U13 1. Serie','forslag-3'],['U13 2. Serie','forslag-3'],['U13 3. Serie','forslag-3']],
  ...[['Begynderholdturnering U11','forslag-6'],['U09 Begynderturnering','forslag-6'],['U11 Begynderrække','forslag-6'],['&#197;rets U11 hold 4+3','forslag-6'],['U11 - Begynderholdturnering','forslag-6'],['U13 - Begynder - Opstartsturnering - 20.sep','forslag-6']],
  ...[['DBU U13 A 4 spillere',null],['U11 C-D 3400 (4 spillere).',null],['DMU Hold - U17/U19 M 4+2 (15000)',null]],
];
for (const [name, rule] of tests) {
  if (!distinct.has(name)) throw new Error(`Parser test input not in database: ${name}`);
  const output = parse(name);
  if (output.tolkning_regel !== rule) throw new Error(`Parser test failed for ${name}: expected ${rule}, got ${output.tolkning_regel}`);
}
if (tests.length !== 25) throw new Error(`Expected 25 test cases; got ${tests.length}`);

const patternDefs = [
  ['X1-X3', /\bX\s*[1-3]\b/iu],
  ['Dx (bogstavelig)', /\bDx\b/iu],
  ['BD (bogstavelig)', /\bBD\b/iu],
];
const patternDetails = patternDefs.map(([pattern, regex]) => {
  const selected = regionRows.filter((row) => regex.test(decodeEntities(row.division_name_raw)));
  const unique = new Set(selected.map((row) => row.division_name_raw));
  const perCell = new Map();
  for (const row of selected) {
    const key = `${row.season_id}|${row.region_id}|${row.age_group_id}|${pattern}`;
    if (!perCell.has(key)) perCell.set(key, { season_id: row.season_id, season: `${row.season_id}/${String(row.season_id + 1).slice(-2)}`, region_id: row.region_id, region_name: row.region_name, age_group_id: row.age_group_id, age_group_name: row.age_group_name, pattern, physical_region_posts: 0, raw_names: new Set() });
    const cell = perCell.get(key); cell.physical_region_posts += 1; cell.raw_names.add(row.division_name_raw);
  }
  return { pattern, distinct_names: unique.size, physical_group_rows: new Set(selected.map((row) => `${row.season_id}|${row.age_group_id}|${row.league_group_id}`)).size,
    region_linked_occurrences: selected.length,
    season_region_age: [...perCell.values()].map((x) => ({ ...x, raw_names: [...x.raw_names].sort() })).sort((a, b) => a.season_id - b.season_id || a.region_id - b.region_id || a.age_group_id - b.age_group_id),
    examples: [...new Map(selected.map((row) => [`${row.season_id}|${row.age_group_id}|${row.league_group_id}`, row])).values()].slice(0, 10).map((row) => ({ season_id: row.season_id, season: `${row.season_id}/${String(row.season_id + 1).slice(-2)}`, age_group_id: row.age_group_id, age_group_name: row.age_group_name, region_id: row.region_id, region_name: row.region_name, league_group_id: row.league_group_id, division_name_raw: row.division_name_raw })) };
});

const fourPlusThree = rows.filter((row) => /4\s*\+\s*3/iu.test(decodeEntities(row.division_name_raw)));
const u11FourPlusTwo = rows.filter((row) => /U\s*11(?=\b|[A-Z])/iu.test(decodeEntities(row.division_name_raw)) && /4\s*\+\s*2/iu.test(decodeEntities(row.division_name_raw)));

const dbAfter = new DatabaseSync(dbPath, { readOnly: true });
const after = { sha256: sha256(dbPath), row_counts: Object.fromEntries(dbAfter.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all().map(({ name }) => [name, dbAfter.prepare(`SELECT COUNT(*) AS n FROM "${name.replaceAll('"', '""')}"`).get().n])) };
dbAfter.close();
if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error('Database hash or row counts changed');
const normalizedAfter = { sha256: sha256(normalizedPath), row_counts: rowCounts(normalizedPath) };
if (JSON.stringify(normalizedBefore) !== JSON.stringify(normalizedAfter)) throw new Error('gsb-statistik-normalized.db hash or row counts changed');

const result = {
  generated_at: new Date().toISOString(), source: 'liga-landskab.db; readOnly: true; age_group_id 2,3,4,5,6,7,18',
  baseline_129: { distinct_names: names.length, interpreted_by_legacy_parser: baselineNames.length, legacy_uninterpreted_names: names.length - baselineNames.length, legacy_uninterpreted_physical_rows: names.filter((item) => !legacyParse(item.name)).reduce((n, item) => n + item.posts, 0) },
  totals: { physical_group_rows: rows.length, distinct_names: names.length, legacy_interpretable_physical_rows: current.reduce((n, item) => n + item.posts, 0), newly_interpreted_by_approved_rules: names.filter((x) => ['forslag-1','forslag-2','forslag-3'].includes(x.parsed.tolkning_regel)).reduce((n, x) => n + x.posts, 0), separate_list_names: separate.length, separate_list_physical_rows: separate.reduce((n, item) => n + item.posts, 0), still_uninterpreted_names: unresolved.length, still_uninterpreted_physical_rows: unresolved.reduce((n, item) => n + item.posts, 0) },
  per_approved_proposal: proposalStats,
  four_plus_three_investigation: { distinct_raw_names: new Set(fourPlusThree.map((r) => r.division_name_raw)).size, physical_group_rows: new Set(fourPlusThree.map((r) => `${r.season_id}|${r.age_group_id}|${r.league_group_id}`)).size, examples: fourPlusThree.slice(0, 20).map((r) => ({ season_id: r.season_id, age_group_id: r.age_group_id, age_group_name: r.age_group_name, league_group_id: r.league_group_id, division_name_raw: r.division_name_raw })) },
  u11_four_plus_two_investigation: { distinct_raw_names: new Set(u11FourPlusTwo.map((r) => r.division_name_raw)).size, physical_group_rows: new Set(u11FourPlusTwo.map((r) => `${r.season_id}|${r.age_group_id}|${r.league_group_id}`)).size, examples: u11FourPlusTwo.slice(0, 20).map((r) => ({ season_id: r.season_id, age_group_id: r.age_group_id, age_group_name: r.age_group_name, league_group_id: r.league_group_id, division_name_raw: r.division_name_raw })) },
  x_dx_bd_patterns: patternDetails,
  parser_tests: { passed: tests.length, total: tests.length, examples: tests.map(([name, expectedRule]) => ({ name, expected_rule: expectedRule, actual_rule: parse(name).tolkning_regel, actual: parse(name) })) },
  parser_results_by_distinct_row_name: names.map((item) => ({ division_name_raw: item.name, physical_group_rows: item.posts, ...item.parsed })),
  databases_before: { normalized: normalizedBefore, landscape: before }, databases_after: { normalized: normalizedAfter, landscape: after },
  note: 'Hver gammel parsermatch har tolkning_regel=null (eksisterende parseradfærd); nyfortolkninger mærkes med forslag-1/2/3. Forslag 4 og 5 implementeres ikke. X1-X3, Dx og BD får ingen niveaufortolkning her.'
};
fs.writeFileSync(effectJsonPath, `${JSON.stringify(result, null, 2)}\n`);
const lines = [
  '# Opgave 136 — parserens effekt', '',
  `Kilde: ungdomsgrupper age_group_id ${youthIds.join(', ')}. Baseline genskabt fra eksisterende 129-parser: ${names.length} distinkte rækkenavne, ${baselineNames.length} tolkede, ${names.length - baselineNames.length} ufortolkede; de ufortolkede forekommer i ${result.baseline_129.legacy_uninterpreted_physical_rows} fysiske league_groups-rækker.`, '',
  '## Effekt pr. godkendt forslag', '',
  '| Forslag | Distinkte rækkenavne | Fysiske rækker | Eksempler |', '|---|---:|---:|---|',
  ...Object.entries(proposalStats).map(([rule, stat]) => `| ${rule} | ${stat.distinct_names} | ${stat.physical_group_rows} | ${stat.examples.slice(0, 5).join('; ')} |`), '',
  `Forslag 4 forbliver kun optælling: 4+3 har ${result.four_plus_three_investigation.distinct_raw_names} rå navne/${result.four_plus_three_investigation.physical_group_rows} fysiske rækker; U11 4+2 har ${result.u11_four_plus_two_investigation.distinct_raw_names} rå navne/${result.u11_four_plus_two_investigation.physical_group_rows} fysiske rækker. De to lister og op til 20 eksempler pr. format står i JSON.`, '',
  `Samlet: ${result.totals.legacy_interpretable_physical_rows} tidligere tolkede poster; ${result.totals.newly_interpreted_by_approved_rules} fysiske rækker nyligt tolkede efter forslag 1–3; ${result.totals.separate_list_physical_rows} poster sendt til forslag 6's separate liste; ${result.totals.still_uninterpreted_names} navne/${result.totals.still_uninterpreted_physical_rows} rækker forbliver ufortolkede. Parserens 25 konkrete testeksempler bestod (${tests.length}/${tests.length}).`, '',
  'JSON-filen indeholder parserresultat for hvert distinkt rækkenavn; alle nye fortolkninger har `tolkning_regel` = forslag-1, forslag-2 eller forslag-3. Separate poster har forslag-6; gamle parserfund har null, da de ikke er nyfortolkninger. Ingen database skrivning.', '',
];
fs.writeFileSync(effectMdPath, lines.join('\n'));
const pattLines = ['# Opgave 136 — undersøgelse af X1–X3, Dx og BD', '', 'Mønstrene tælles hver for sig og kan overlappe; en fysisk league_group kan forekomme i mere end én mønsteroptælling. “Region-linked occurrences” tæller én gang pr. league_group_regions-kobling; “physical_group_rows” deduplikerer fysisk pulje. Eksempler er rå kildetekst, ikke fortolkning.', ''];
for (const p of patternDetails) {
  pattLines.push(`## ${p.pattern}`, '', `Distinkte rå rækkenavne: ${p.distinct_names}; fysiske puljer: ${p.physical_group_rows}; områdekoblinger: ${p.region_linked_occurrences}.`, '', '| Sæson | Region | Alder | Områdekoblinger | Rå rækkenavne |', '|---|---|---|---:|---:|');
  for (const cell of p.season_region_age) pattLines.push(`| ${cell.season} | ${cell.region_name} (${cell.region_id}) | ${cell.age_group_name} (${cell.age_group_id}) | ${cell.physical_region_posts} | ${cell.raw_names.length} |`);
  pattLines.push('', '### Eksempler (maks. 10)', '', '| Sæson | Alder | Region | Pulje-ID | Rå rækkenavn |', '|---|---|---|---:|---|');
  for (const row of p.examples) pattLines.push(`| ${row.season} | ${row.age_group_name} | ${row.region_name} (${row.region_id}) | ${row.league_group_id} | ${row.division_name_raw} |`);
  pattLines.push('');
}
pattLines.push(
  'Fuld sæson×region×alder-opdeling og 10-eksempeludtræk ligger også i `136-parser-effekt.json` under `x_dx_bd_patterns`. Ingen af disse mønstre ændres til et hierarkiniveau af parseren.', '',
  '## Søgning i det lokale reglementsarkiv', '',
  'Alle 53 PDF’er i register.json blev tekstudtrukket lokalt (ingen netværkskald). Token-match på hele ord gav 0 linjer med X1, X2 eller X3; 8 Dx-linjer; 111 BD-linjer. BD-tallene omfatter almindelige henvisninger til Badminton Danmark og er ikke antal forklaringer på rækkenavnssuffikset.', '',
  '**Dx — belagt, men ikke implementeret:**', '',
  '- `bd-youth-2026-27`, *Fælles reglement for ungdomsholdturneringen 2026/27*, PDF s. 5 siger, at Dx-hold består af spillere på startpoint eller lavere for årgangen; s. 6 siger, at Dx er en række med 3/4 spillere på begynderniveau.',
  '- `bd-dgi-youth-2016-17-manual`, *Reglement for den pointgivende ungdomsholdturnering 2016/2017*, PDF s. 2 nævner M-, A-, B-, C-, D-, Cx- og Dx-rækker for fire spillere; PDF s. 3 har Dx som særskilt række, og s. 5 indeholder U11/U13/U15 Dx-tabellinjer.',
  '- Det dokumenterer brugen af Dx i de nævnte udgaver, men parseren udleder ikke niveau af Dx.', '',
  '**X1–X3 — ikke forklaret i de fundne reglementer:** 0 tokenforekomster i de 53 registrerede PDF’er. Data viser 19 rå rækkenavne/33 fysiske puljer, især “U11/U13/U15/U17 Serie X1/X2/X3”; nummerets betydning og X-seriens hierarki er ikke fastlagt.', '',
  '**BD — forkortelse belagt, rækkenavnssuffiks uafklaret:** fællesreglementet 2026/27 PDF s. 2 definerer Badminton Danmark (BD). Ingen fundet kilde forklarer, om suffixet BD på rækkenavne (43 rå navne/64 fysiske puljer) markerer sæson, udbyder eller noget andet.', '',
  '## Uafklaret til Chris', '',
  'Kilderne fastlægger ikke betydningen/hierarkiet for X1–X3 eller suffixet BD. Dx er forklaret i de angivne reglementer, men parseren lader alle tre mønstre stå uden niveaufortolkning som kortet kræver. Mønsteroptællinger overlapper ikke nødvendigvis og må ikke summeres til et samlet antal.', ''
);
fs.writeFileSync(xReportPath, pattLines.join('\n'));
console.log(JSON.stringify({ baseline: result.baseline_129, totals: result.totals, proposals: proposalStats, format4: [result.four_plus_three_investigation, result.u11_four_plus_two_investigation], patterns: patternDetails.map(({ pattern, distinct_names, physical_group_rows, region_linked_occurrences }) => ({ pattern, distinct_names, physical_group_rows, region_linked_occurrences })), tests: `${tests.length}/${tests.length}`, output: [effectJsonPath,effectMdPath,xReportPath] }, null, 2));
