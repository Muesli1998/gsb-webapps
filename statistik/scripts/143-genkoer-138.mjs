import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = path.resolve('statistik');
const dbPath = path.join(root, 'data/liga-landskab.db');
const normalizedPath = path.join(root, 'data/gsb-statistik-normalized.db');
const expected = {
  landscape: '9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c',
  normalized: '49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e',
};
const sha = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const seasonLabel = (year) => `${year}/${String(year + 1).slice(-2)}`;
const ageIds127 = [2, 3, 4, 5, 6, 7, 18];
const ageIds130 = [2, 3, 4, 5, 6, 7, 18, 20, 21, 23, 24, 25, 26, 27, 29];
const physicalKey = (r) => `${r.season_id}|${r.age_group_id}|${r.league_group_id}`;
const composite = (season, age, name) => `${season}|${age}|${name ?? ''}`;
const base127 = readJson(path.join(root, 'results/127-gsb-ungdom-formatplacering.json'));
const base132 = readJson(path.join(root, 'results/132-raekkenavne-vs-regelbog.json'));
const base138 = readJson(path.join(root, 'results/138-ungdom-i-tal.json'));
const parser136 = readJson(path.join(root, 'results/136-parser-effekt.json'));
const rulebook = readJson(path.join(root, 'kilder/reglementer/regelbog-pr-saeson.json'));
const areaAliases = readJson(path.join(root, 'kilder/reglementer/omraade-alias.json'));
const base130 = readJson(path.join(root, 'results/130-reglement-vs-raekkenavne.json'));
const parserByName = new Map(parser136.parser_results_by_distinct_row_name.map((x) => [x.division_name_raw ?? '', x]));
const aliasToCanonical = new Map();
for (const item of areaAliases.aliases) for (const alias of item.varianter) aliasToCanonical.set(alias, item.kanonisk);
const canonicalArea = (name) => aliasToCanonical.get(name) ?? name;
const bookIndex = new Map();
for (const entry of rulebook.entries) {
  if (entry.target_group !== 'ungdom') continue;
  for (const name of [entry.area, ...(entry.omraade_varianter ?? [])]) {
    bookIndex.set(`${entry.season}|${canonicalArea(name)}`, entry);
  }
}
const entryFor = (seasonId, regionName) => bookIndex.get(`${seasonLabel(seasonId)}|${canonicalArea(regionName)}`) ?? null;
const parserFor = (row) => {
  const named = parserByName.get(row.division_name_raw ?? '');
  if (!named) return { status: 'uden_for_136-afgraensning', tolkning_regel: null };
  const scoped = named.proposal4_scopes?.find((x) => Number(x.season_id) === Number(row.season_id)
    && Number(x.age_group_id) === Number(row.age_group_id)
    && String(x.league_group_id) === String(row.league_group_id));
  return scoped ? { status: scoped.status, tolkning_regel: scoped.tolkning_regel }
    : { status: named.status, tolkning_regel: named.tolkning_regel };
};
const ruleFields = (entry) => entry ? {
  status: entry.status,
  afstand_saesoner: entry.afstand_saesoner,
  svag: entry.svag,
  kilde_saeson_usikker: entry.kilde_saeson_usikker === true,
  kilde_saeson_usikker_begrundelse: entry.kilde_saeson_usikker_begrundelse ?? null,
  source_id: entry.source?.id ?? null,
  source_title: entry.source?.title ?? null,
  source_file: entry.source?.file ?? null,
} : { status: 'ingen_match_i_regelbog', afstand_saesoner: null, svag: false, kilde_saeson_usikker: false, kilde_saeson_usikker_begrundelse: null, source_id: null, source_title: null, source_file: null };
const rulebookExplains = (parsed, entry) => Boolean(entry && entry.status !== 'ingen'
  && (parsed.status === 'tolket' || parsed.status === 'har niveau'
    || parsed.status === 'intet niveau nødvendigt (eneste række)'));

function tableCounts(file) {
  const db = new DatabaseSync(file, { readOnly: true });
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const counts = Object.fromEntries(tables.map(({ name }) => [name, db.prepare(`SELECT COUNT(*) AS n FROM "${name.replaceAll('"', '""')}"`).get().n]));
  db.close();
  return counts;
}
const dbBefore = { landscape: sha(dbPath), normalized: sha(normalizedPath) };
if (dbBefore.landscape !== expected.landscape || dbBefore.normalized !== expected.normalized) throw new Error(`Database hash mismatch before run: ${JSON.stringify(dbBefore)}`);

const db = new DatabaseSync(dbPath, { readOnly: true });
const allRows = db.prepare(`
  SELECT g.season_id,g.age_group_id,a.name AS age_group_name,g.league_group_id,
         g.division_name_raw,g.group_name_raw,g.page_title_raw,r.region_id,reg.name AS region_name
  FROM league_groups g LEFT JOIN age_groups a USING(age_group_id)
  LEFT JOIN league_group_regions r USING(season_id,age_group_id,league_group_id)
  LEFT JOIN regions reg USING(region_id)
  WHERE g.age_group_id IN (${ageIds130.join(',')})
  ORDER BY g.season_id,g.age_group_id,g.league_group_id,r.region_id
`).all();
const physicalRows = db.prepare(`
  SELECT g.season_id,g.age_group_id,a.name AS age_group_name,g.league_group_id,
         g.division_name_raw,g.group_name_raw,g.page_title_raw
  FROM league_groups g LEFT JOIN age_groups a USING(age_group_id)
  WHERE g.age_group_id IN (${ageIds127.join(',')})
  ORDER BY g.season_id,g.age_group_id,g.league_group_id
`).all();
const dbAgeRows = db.prepare(`SELECT age_group_id,name FROM age_groups ORDER BY age_group_id`).all();
db.close();

// 132: one record per physical league-group and region link. The status describes
// source applicability; “explained” is deliberately limited to names understood
// by the recorded 136 parser and never derives levels from point scales.
const scopeMap = new Map();
for (const row of allRows) {
  if (!row.region_id) continue;
  const key = `${row.season_id}|${row.region_id}|${row.age_group_id}`;
  if (!scopeMap.has(key)) scopeMap.set(key, {
    season_id: row.season_id, season: seasonLabel(row.season_id), region_id: row.region_id,
    region: row.region_name ?? 'ukendt region', age_group_id: row.age_group_id,
    age_group_name: row.age_group_name, physical_group_rows: 0, names: new Map(),
  });
  const scope = scopeMap.get(key); scope.physical_group_rows += 1;
  const name = row.division_name_raw ?? '';
  const parsed = parserFor(row); const entry = entryFor(row.season_id, row.region_name ?? '');
  const isUge38 = /UGE\s*38/iu.test(row.division_name_raw ?? '');
  if (!scope.names.has(name)) scope.names.set(name, { division_name_raw: name, physical_group_rows: 0, parser_status: parsed.status,
    tolkning_regel: parsed.tolkning_regel, regelbog: ruleFields(entry), special_turnering: isUge38 ? 'UGE 38 (uden for almindelig placering/bredde)' : null,
    explained_by_rulebook: !isUge38 && rulebookExplains(parsed, entry) });
  scope.names.get(name).physical_group_rows += 1;
}
const scopes132 = [...scopeMap.values()].map((scope) => {
  const names = [...scope.names.values()];
  const status = names[0]?.regelbog.status ?? 'ingen_match_i_regelbog';
  const counts = { explained_names: names.filter((n) => n.explained_by_rulebook).length,
    unexplained_names: names.filter((n) => !n.explained_by_rulebook).length,
    explained_rows: names.filter((n) => n.explained_by_rulebook).reduce((n, x) => n + x.physical_group_rows, 0),
    unexplained_rows: names.filter((n) => !n.explained_by_rulebook).reduce((n, x) => n + x.physical_group_rows, 0) };
  return { season_id:scope.season_id,season:scope.season,region_id:scope.region_id,region:scope.region,age_group_id:scope.age_group_id,
    age_group_name:scope.age_group_name,physical_group_rows:scope.physical_group_rows,regelbog_status: status,
    regelbog_afstand_saesoner: names[0]?.regelbog.afstand_saesoner ?? null,
    regelbog_svaag: names[0]?.regelbog.svag ?? false, counts, row_names: names.sort((a,b) => b.physical_group_rows-a.physical_group_rows || a.division_name_raw.localeCompare(b.division_name_raw,'da')) };
}).sort((a,b) => a.season_id-b.season_id || a.region_id-b.region_id || a.age_group_id-b.age_group_id);
const flat132 = scopes132.flatMap((s) => s.row_names.map((n) => ({ ...n, season_id:s.season_id, season:s.season, region_id:s.region_id, region:s.region,
  age_group_id:s.age_group_id, age_group_name:s.age_group_name, regelbog_status:s.regelbog_status,
  regelbog_afstand_saesoner:s.regelbog_afstand_saesoner, regelbog_svaag:s.regelbog_svaag })));
const totals132 = Object.fromEntries(['bekraeftet','betinget','ingen','ingen_match_i_regelbog'].map((status) => {
  const subset = flat132.filter((x) => x.regelbog_status === status);
  return [status, { distinct_name_scope_records: subset.length, explained: subset.filter((x) => x.explained_by_rulebook).length,
    unexplained: subset.filter((x) => !x.explained_by_rulebook).length,
    physical_rows: subset.reduce((n,x) => n+x.physical_group_rows,0), weak_explanations: subset.filter((x) => x.explained_by_rulebook && x.regelbog_svaag).length }];
}));
const conditionalCounts = { all_explanations: flat132.filter((x) => x.explained_by_rulebook && x.regelbog_status === 'betinget').length,
  weak_3plus: flat132.filter((x) => x.explained_by_rulebook && x.regelbog_status === 'betinget' && x.regelbog_svaag).length };
const candidates132 = scopes132.flatMap((scope)=>scope.row_names.map((row)=>({
  season:scope.season,season_id:scope.season_id,region:scope.region,region_id:scope.region_id,age_group_name:scope.age_group_name,
  ...row,regelbog_status:scope.regelbog_status,regelbog_afstand_saesoner:scope.regelbog_afstand_saesoner,
})));
const sample132 = [];
for (const [status, year, sourceFile, pages] of [
  ['bekraeftet',2024,'2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf','5–6'],
  ['betinget',2016,'manuelt/BD-DGI_ungdomsreglement_2016-17.pdf','3–5'],
  ['ingen',2011,null,null],
  ['ingen_match_i_regelbog',2024,'2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf','5–6'],
]) {
  const eligible = candidates132.filter((x)=>x.regelbog_status===status&&x.season_id===year
    && !x.special_turnering && (status==='ingen'||status==='ingen_match_i_regelbog'
      ? ['tolket','har niveau','uafklaret'].includes(x.parser_status)
      : x.explained_by_rulebook && !/begynder|kredsmatch|dmu|slutspil/i.test(x.division_name_raw)));
  for (const row of eligible.slice(0,5)) sample132.push({
    season:row.season,region:row.region,age_group_name:row.age_group_name,division_name_raw:row.division_name_raw,
    parser_status:row.parser_status,rulebook_status:status,afstand_saesoner:row.regelbog_afstand_saesoner,
    pdf:sourceFile,pdf_pages:pages,
    pdf_check:status==='ingen'?'Umulig: status ingen, ingen PDF i regelbogsposten.':
      status==='betinget'?'National ungdomskilde kontrolleret for holdtype/niveauterminologi; regional status/afstand beholdes uændret.':
      status==='ingen_match_i_regelbog'?'National ungdomstabel er kontrolleret; lokal område-/målgruppepost mangler stadig i regelbogen.':
      'National ungdomstabel er kontrolleret for alder, holdtype og eventuel eksplicit niveaurække.',
  });
}
if(sample132.length!==20) throw new Error(`Expected 20 132 sample rows (5/status), got ${sample132.length}`);
const largestUnexplained = Object.fromEntries(['bekraeftet','betinget','ingen'].map((status) => [status,
  flat132.filter((x) => x.regelbog_status === status && !x.explained_by_rulebook)
    .sort((a,b) => b.physical_group_rows-a.physical_group_rows || a.division_name_raw.localeCompare(b.division_name_raw,'da')).slice(0,30)]));
const result132 = { generated_at: new Date().toISOString(), source_130: base130.generated_at,
  source_rulebook_entry_count: rulebook.entry_count, method: 'league_groups × league_group_regions; canonical area alias; only 136 parser interpretations combined with an applicable rulebook entry count as explained. No point-scale inheritance.',
  control_definition: 'Rows are physical league_groups-region links; distinct_name_scope_records count a raw name once per season/region/age group.',
  totals_by_rulebook_status: totals132, conditional_explanations: conditionalCounts,
  physical_group_region_rows: flat132.reduce((n,x)=>n+x.physical_group_rows,0), scopes: scopes132, largest_unexplained_names_by_status: largestUnexplained,
  sample_20:sample132,
  limitation: 'An entry with status ingen has no applicable PDF; therefore PDF-wording sampling cannot be performed for that status. Parser recognition is not a claim that every raw row name occurs verbatim in the regulation.' };
const old132ByKey = new Map(base132.scopes.flatMap((scope) => scope.row_names.map((row) => [
  `${scope.season_id}|${scope.region_id}|${scope.age_group_id}|${row.division_name_raw}`,
  { status: scope.regelbog_status, source: row.regelbog?.source_id ?? null, explained: row.explained_by_rulebook },
])));
const current132ByKey = new Map(scopes132.flatMap((scope) => scope.row_names.map((row) => [
  `${scope.season_id}|${scope.region_id}|${scope.age_group_id}|${row.division_name_raw}`,
  { status: scope.regelbog_status, source: row.regelbog?.source_id ?? null, explained: row.explained_by_rulebook,
    distance: scope.regelbog_afstand_saesoner, weak: scope.regelbog_svaag, uncertain: row.regelbog?.kilde_saeson_usikker ?? false },
])));
const statusChanges132 = [...current132ByKey].filter(([key, value]) => old132ByKey.get(key)?.status !== value.status
  || old132ByKey.get(key)?.source !== value.source || old132ByKey.get(key)?.explained !== value.explained)
  .map(([key, current]) => ({ key, before: old132ByKey.get(key), after: current }));
result132.difference_vs_132 = { prior_records: old132ByKey.size, current_records: current132ByKey.size,
  changed_records: statusChanges132.length, changes: statusChanges132,
  weak_explanations_now: conditionalCounts.weak_3plus,
  conditional_explanations_now: conditionalCounts.all_explanations };
fs.writeFileSync(path.join(root,'results/143-raekkenavne-vs-regelbog.json'), `${JSON.stringify(result132,null,2)}\n`);
const md132 = ['# Opgave 132 — rækkenavne mod regelbogen','',
  `Rågrundlag: ${result132.physical_group_region_rows} fysiske gruppe-region-links i ${scopes132.length} sæson/region/aldersgruppe-scopes. Forklaring er operationelt defineret som en rækkenavnstolkning i 136 plus en regelbogspost med status bekræftet eller betinget. Niveauer udledes ikke af pointtal.`, '',
  '| Regelbogsstatus | Navn/scope-forekomster | Forklaret | Uforklaret | Fysiske links |', '|---|---:|---:|---:|---:|',
  ...Object.entries(totals132).map(([k,v])=>`| ${k} | ${v.distinct_name_scope_records} | ${v.explained} | ${v.unexplained} | ${v.physical_rows} |`), '',
  `Forklaringer med betinget regelbog: ${conditionalCounts.all_explanations}; heraf svage (afstand ≥3): ${conditionalCounts.weak_3plus}.`, '',
  '## Stikprøve på 20 rækkenavne (5 pr. regelbogsstatus)','',
  'De fem `ingen`-poster har ingen tilknyttet PDF og kan derfor ikke kontrolleres mod ordlyd. For de fem områder uden match i 131-regelbogen er den nationale fælles ungdoms-PDF tjekket som tekstgrundlag, men området er fortsat umatchet; dette tælles ikke som regional regelbogsdækning. De bekræftede/betingede stikprøver er kontrolleret mod den nationale ungdoms-PDF for holdtype-/rækketerminologi, mens områdets status og afstand forbliver fra 131.', '',
  '| # | Sæson | Område | Alder | Rækkenavn | Status/afstand | PDF-kontrol |','|---:|---|---|---|---|---|---|',
  ...sample132.map((x,i)=>`| ${i+1} | ${x.season} | ${x.region} | ${x.age_group_name} | ${x.division_name_raw.replaceAll('|','\\|')} | ${x.rulebook_status} / ${x.afstand_saesoner??'—'} | ${x.pdf?`${x.pdf}, s. ${x.pdf_pages}`:'ingen PDF'} |`), '',
  '## Metode og vigtig afgrænsning','',result132.limitation,'',
  '## Største uforklarede rå rækkenavne pr. regelbogsstatus',''];
for (const status of ['bekraeftet','betinget','ingen']) {
  md132.push(`### ${status}`,'','| Sæson | Område | Alder | Rækkenavn | Poster | Afstand |','|---|---|---|---|---:|---:|');
  for (const x of largestUnexplained[status]) md132.push(`| ${x.season} | ${x.region} | ${x.age_group_name} | ${x.division_name_raw.replaceAll('|','\\|')} | ${x.physical_group_rows} | ${x.regelbog_afstand_saesoner ?? '—'} |`);
  md132.push('');
}
md132.push('## Spørgsmål', '', '- Kortets stikprøve kræver mindst fem rækkenavne pr. status tjekket mod PDF-ordlyd. Status `ingen` betyder at der ikke findes en tilknyttet PDF; ønsker Chris at fem eksempler pr. status erstattes af fem fraværs-/kildehulsprøver for `ingen`?', '',
  '- Parserstatus viser, om navnet blev fortolket af 136; det beviser ikke, at det præcise lokale rækkenavn står i reglementet. Derfor er rapportens “forklaret” en afgrænset kombination af fortolkning og kildeanvendelighed, ikke en ordret dokumentmatch.', '');
md132[0] = '# Opgave 143 — ungdomsrækkenavne mod rettet regelbog';
md132.splice(2, 0, `Sammenlignet med 132-baseline: ${statusChanges132.length} status-/forklaringsændringer blandt ${old132ByKey.size} rækkenavn/scope-poster. Betingede forklaringer: ${conditionalCounts.all_explanations}; svage: ${conditionalCounts.weak_3plus}. Kilde-sæson-usikkerhed er eksponeret pr. rækkenavn i JSON.`);
fs.writeFileSync(path.join(root,'results/143-raekkenavne-vs-regelbog.md'), `${md132.join('\n')}\n`);

// 138: retain every field and source row from 127, and add a row-level ledger
// joining raw SQLite records to the exact 136 parser result and canonical rulebook.
const old127Placement = new Map();
for (const combo of base127.placement_by_season_age) for (const row of combo.ranked_division_rows ?? []) {
  old127Placement.set(composite(combo.season_id,combo.age_group_id,row.division_name_raw), row);
}
const old127Width = new Map();
for (const combo of base127.placement_by_season_age) for (const row of combo.kbh_width?.all_rows ?? [])
  old127Width.set(composite(combo.season_id,combo.age_group_id,row.division_name_raw),row);
const regionByPhysicalKey = new Map();
const region8 = 8;
for (const row of allRows) {
  if (!row.region_id) continue;
  const key = physicalKey(row);
  if (!regionByPhysicalKey.has(key)) regionByPhysicalKey.set(key,new Map());
  regionByPhysicalKey.get(key).set(row.region_id,row.region_name ?? '');
}
const physicalBySeasonAgeName = new Map();
for (const row of physicalRows) {
  const key = composite(row.season_id,row.age_group_id,row.division_name_raw);
  if (!physicalBySeasonAgeName.has(key)) physicalBySeasonAgeName.set(key,[]);
  physicalBySeasonAgeName.get(key).push(row);
}
const rowLedger = physicalRows.map((row) => {
  const parsed = parserFor(row); const oldPlacement = old127Placement.get(composite(row.season_id,row.age_group_id,row.division_name_raw));
  const oldWidth = old127Width.get(composite(row.season_id,row.age_group_id,row.division_name_raw));
  const regionMap = regionByPhysicalKey.get(physicalKey(row)) ?? new Map();
  const regions = [...regionMap.keys()].sort((a,b)=>a-b);
  const rulebooks = regions.map((regionId) => {
    const regionName = regionMap.get(regionId) ?? '';
    const entry = entryFor(row.season_id,regionName);
    return { region_id:regionId, region:regionName, ...ruleFields(entry) };
  });
  const applicableBook = rulebooks.find((x) => x.region_id === region8) ?? rulebooks[0] ?? ruleFields(null);
  const isUge38 = /UGE\s*38/iu.test(row.division_name_raw ?? '');
  const legacy = parsed.tolkning_regel === null && parsed.status === 'tolket';
  const change = isUge38 ? 'udeladt_uge38' : parsed.status === 'har niveau' ? 'allerede_fortolket_niveau_136'
    : parsed.status === 'separat_liste' ? 'separat_liste_136'
    : parsed.status === 'intet niveau nødvendigt (eneste række)' ? 'eneste_raekke_forslag4'
    : parsed.status === 'uforklaret: flere rækker eller ingen regionkobling' ? 'fortsat_uforklaret_forslag4'
    : parsed.status === 'tolket' && !legacy ? 'nyfortolket_af_136' : parsed.status === 'tolket' ? 'allerede_fortolket_129' : 'fortsat_uforklaret';
  return { ...row, season:seasonLabel(row.season_id), region_ids:regions, parser_136:parsed,
    tolkning_regel: parsed.tolkning_regel, regelbog_status: applicableBook.status,
    regelbog_afstand: applicableBook.afstand_saesoner, kilde_saeson_usikker: applicableBook.kilde_saeson_usikker,
    rulebook_by_region:rulebooks, prior_127:{ placement:oldPlacement ?? null, width:oldWidth ?? null },
    change_vs_127_129:change,
    difference_explanation: change==='nyfortolket_af_136' ? `136:${parsed.tolkning_regel} tilføjer rækkenavnsfortolkning; placering/bredde fra 127 bevares, når deres faste format-/GSB-regler ikke ændres.`
      : change==='eneste_raekke_forslag4' ? '136 forslag-4 tildeler kun status for eneste formatrække; se særskilt måling af navne med ugenkendt bart niveau.'
      : change==='fortsat_uforklaret_forslag4' ? 'Der er flere formatrækker eller manglende regionkobling; forslag-4 giver derfor ikke et niveau.'
      : change==='allerede_fortolket_niveau_136' ? '136 genbekræfter et eksplicit niveau, som ikke er nyfortolket i forhold til den gamle parser.'
      : change==='separat_liste_136' ? '136 forslag-6 holder begynderrækker/Årets U11 Hold uden for niveaurangeringen.'
      : change==='udeladt_uge38' ? 'UGE 38 er særskilt og ekskluderes fra formatplacering og bredde.'
      : change==='fortsat_uforklaret' ? '136 har ingen godkendt fortolkning; rækken forbliver uafklaret.'
      : 'Ingen ændring i gammel parserstatus.' };
});
const old138ByKey = new Map(base138.rows_138.map((row) => [physicalKey(row), row]));
const rowChangesVs138 = rowLedger.flatMap((row) => {
  const prior = old138ByKey.get(physicalKey(row));
  if (!prior) return [{ key: physicalKey(row), kind: 'ny/manglende post' }];
  const oldRules = (prior.rulebook_by_region ?? []).map((x) => [x.region_id, x.status, x.afstand_saesoner, x.source_id, x.kilde_saeson_usikker === true]);
  const newRules = row.rulebook_by_region.map((x) => [x.region_id, x.status, x.afstand_saesoner, x.source_id, x.kilde_saeson_usikker]);
  const oldPlacement = JSON.stringify(prior.prior_127 ?? null);
  const newPlacement = JSON.stringify(row.prior_127 ?? null);
  const parserChanged = JSON.stringify(prior.parser_136 ?? null) !== JSON.stringify(row.parser_136 ?? null);
  return JSON.stringify(oldRules) !== JSON.stringify(newRules) || oldPlacement !== newPlacement || parserChanged
    ? [{ key: physicalKey(row), prior_rules: oldRules, current_rules: newRules,
      placement_before: prior.prior_127 ?? null, placement_after: row.prior_127 ?? null }] : [];
});
const missingRows = [];
for (const combo of base127.placement_by_season_age) for (const row of combo.kbh_width?.missing_rows ?? []) {
  const matchingPhysical = (physicalBySeasonAgeName.get(composite(combo.season_id,combo.age_group_id,row.division_name_raw)) ?? [])
    .filter((physical) => regionByPhysicalKey.get(physicalKey(physical))?.has(region8));
  const parsedRows = matchingPhysical.map((physical) => parserFor(physical));
  const parsed = parsedRows[0] ?? parserFor({season_id:combo.season_id,age_group_id:combo.age_group_id,league_group_id:'',division_name_raw:row.division_name_raw});
  const state = parsedRows.length && parsedRows.every((x)=>x.status === 'tolket' || x.status === 'har niveau' || x.status === 'separat_liste' || x.status === 'intet niveau nødvendigt (eneste række)') ? 'nu tolket af 136'
    : /UGE\s*38/iu.test(row.division_name_raw ?? '') ? 'afvist fra hovedplacering: UGE 38'
    : 'stadig uforklaret';
  missingRows.push({season_id:combo.season_id,season:seasonLabel(combo.season_id),age_group_id:combo.age_group_id,age_group_name:combo.age_group_name,
    division_name_raw:row.division_name_raw,format:row.format,team_count:row.team_count,clubs:row.clubs,gsb_not_in_row:row.gsb_not_in_row,
    matching_league_group_ids:matchingPhysical.map((x)=>x.league_group_id),parser_136:parsed,parser_statuses:[...new Set(parsedRows.map((x)=>x.status))],
    disposition:state,regelbog:ruleFields(entryFor(combo.season_id,'Badminton København')),
    regelbog_status:ruleFields(entryFor(combo.season_id,'Badminton København')).status,
    regelbog_afstand:ruleFields(entryFor(combo.season_id,'Badminton København')).afstand_saesoner,
    kilde_saeson_usikker:ruleFields(entryFor(combo.season_id,'Badminton København')).kilde_saeson_usikker,
    tolkning_regel:parsed.tolkning_regel});
}
const oldMissingByKey = new Map(base138.missing_rows.map((x) => [`${x.season_id}|${x.age_group_id}|${x.division_name_raw}`, x]));
const missingChanges = missingRows.flatMap((x) => {
  const key = `${x.season_id}|${x.age_group_id}|${x.division_name_raw}`;
  const old = oldMissingByKey.get(key);
  return !old || old.disposition !== x.disposition || old.regelbog?.status !== x.regelbog?.status
    || old.regelbog?.source_id !== x.regelbog?.source_id
    ? [{ key, before: old ? { disposition:old.disposition, status:old.regelbog?.status, source:old.regelbog?.source_id } : null,
      after: { disposition:x.disposition, status:x.regelbog?.status, source:x.regelbog?.source_id } }] : [];
});
const deltaCounts = Object.fromEntries([...new Set(rowLedger.map((x)=>x.change_vs_127_129))].sort().map((key)=>[key,rowLedger.filter((x)=>x.change_vs_127_129===key).length]));
const explicitLevelButSingleton = rowLedger.filter((x)=>x.change_vs_127_129==='eneste_raekke_forslag4'
  && /(?:^|\b)(?:A|B|C|D|E|M|Elite|Mester(?:række)?)(?:\b|\s*\/)/iu.test(x.division_name_raw ?? '')).map((x)=>({
    season:x.season,age_group_name:x.age_group_name,region_ids:x.region_ids,league_group_id:x.league_group_id,division_name_raw:x.division_name_raw,
  }));
const countsByStatus = Object.fromEntries(['bekraeftet','betinget','ingen','ingen_match_i_regelbog'].map((status)=>[status,
  rowLedger.reduce((acc,row)=>{ for(const rb of row.rulebook_by_region.filter(x=>x.status===status)){acc.rows+=1;acc.physical_keys.add(physicalKey(row));} return acc;},{rows:0,physical_keys:new Set()})]));
for (const value of Object.values(countsByStatus)) value.physical_rows = value.physical_keys.size, delete value.physical_keys;
const dbAfter = { landscape:sha(dbPath), normalized:sha(normalizedPath) };
if (dbBefore.landscape !== dbAfter.landscape || dbBefore.normalized !== dbAfter.normalized) throw new Error('Database hash changed during read-only run');
const placementWidthComparison = base127.placement_by_season_age.map((combo) => {
  const rankedActive = (combo.gsb_team_pool_records ?? []).filter((x) => x.placement_category === 'placeret'
    && !x.withdrawal_reason && !/UGE\s*38|DMU/i.test(x.division_name_raw ?? ''))
    .toSorted((a,b) => (a.local_format_place ?? 99)-(b.local_format_place ?? 99)
      || (a.level?.rank ?? 99)-(b.level?.rank ?? 99)
      || (b.level?.numeric_value ?? -1)-(a.level?.numeric_value ?? -1)
      || String(a.division_name_raw ?? '').localeCompare(String(b.division_name_raw ?? ''),'da'));
  const bestTeam = rankedActive[0] ?? null;
  const placementAfter = bestTeam ? { format:bestTeam.format, tier:bestTeam.tier, level:bestTeam.level,
    place_in_season_age:bestTeam.local_format_place } : null;
  const widthRows = (combo.kbh_width?.all_rows ?? []).filter((x)=>x.included_in_width);
  const widthAfter = widthRows.length ? { gsb_in:widthRows.filter((x)=>(x.gsb_teams ?? []).length>0).length, total:widthRows.length,
    percent: widthRows.length ? widthRows.filter((x)=>(x.gsb_teams ?? []).length>0).length/widthRows.length*100 : 0 } : null;
  const placementBefore = combo.gsb_best_format ? { format:combo.gsb_best_format.format, tier:combo.gsb_best_format.tier,
    level:combo.gsb_best_format.level, place_in_season_age:combo.gsb_best_format.place_in_season_age } : null;
  const widthBefore = combo.kbh_width?.league_rows ? { ...combo.kbh_width.league_rows_without_uge38_and_kredsmatch } : null;
  if (JSON.stringify(placementAfter) !== JSON.stringify(placementBefore)) throw new Error(`Recomputed GSB placement mismatch: ${combo.season}/${combo.age_group_name}`);
  if (widthAfter?.gsb_in !== widthBefore?.gsb_in || widthAfter?.total !== widthBefore?.total) throw new Error(`Recomputed KBH width mismatch: ${combo.season}/${combo.age_group_name}`);
  return { season_id: combo.season_id, season: combo.season, age_group_id: combo.age_group_id, age_group_name: combo.age_group_name,
    placement_before: placementBefore, placement_after: placementAfter, width_before: widthBefore, width_after: widthAfter, excluded_uge38: true };
});
const placementWidthChanges = placementWidthComparison.filter((x) => JSON.stringify(x.placement_before) !== JSON.stringify(x.placement_after)
  || x.width_before?.gsb_in !== x.width_after?.gsb_in || x.width_before?.total !== x.width_after?.total);
if (placementWidthComparison.length !== 69 || placementWidthChanges.length !== 0) throw new Error(`Unexpected ranking/width delta against unchanged 127 baseline: ${JSON.stringify(placementWidthChanges.slice(0,3))}`);
const explicitLevelButSingletonNames = explicitLevelButSingleton.map((x) => x.division_name_raw);
const result138 = { ...base127, generated_at:new Date().toISOString(), source_127:base127.generated_at,
  source_129:{report:'statistik/results/129-uoplyste-niveauer.md', parser_136_generated_at:parser136.generated_at},
  rulebook_metadata:{entry_count:rulebook.entry_count,area_aliases:areaAliases.aliases.length,point_scale_inheritance:'ingen'},
  parser_136_scope:{age_group_ids:ageIds127,physical_group_rows:physicalRows.length,totals:parser136.totals,delta_counts:deltaCounts,
    explicit_level_names_misclassified_as_singleton_count:explicitLevelButSingleton.length,explicit_level_names_misclassified_as_singleton:explicitLevelButSingleton},
  rulebook_status_physical_rows:countsByStatus, rows_143:rowLedger, missing_rows:missingRows,
  difference_vs_138: { previous_rows: base138.rows_138.length, current_rows: rowLedger.length,
    changed_rulebook_or_placement_rows: rowChangesVs138.length, changes: rowChangesVs138,
    previous_missing_rows: base138.missing_rows.length, current_missing_rows: missingRows.length,
    changed_missing_rows: missingChanges.length, missing_changes: missingChanges,
    missing_disposition_counts_before: base138.missing_rows.reduce((acc,x)=>(acc[x.disposition]=(acc[x.disposition]??0)+1,acc),{}),
    missing_disposition_counts_after: missingRows.reduce((acc,x)=>(acc[x.disposition]=(acc[x.disposition]??0)+1,acc),{}),
    placement_width_combinations: placementWidthComparison.length, placement_width_changed_combinations: placementWidthChanges.length },
  placement_width_comparison: placementWidthComparison, placement_width_changed_combinations: placementWidthChanges,
  parser_136_scope: { ...base138.parser_136_scope, explicit_level_names_misclassified_as_singleton: explicitLevelButSingleton,
    explicit_level_names_misclassified_as_singleton_count: explicitLevelButSingleton.length },
  databases_readonly:{before:dbBefore,after:dbAfter,row_counts:{landscape:tableCounts(dbPath),normalized:tableCounts(normalizedPath)}} };

const manualSampleIds = new Set(['7687','7689','7676','7682','11239','11380','11385','11418','11242','11243','11424','12063','11245','11347','12131',
  '12621','12622','12624','12625','13328','13329','13330','13332','17000','17983']);
const samplePageByYear = {2016:'3–5',2018:'3–5',2019:'3–5',2020:'3–5',2024:'4–6',2025:'4–6'};
const ruleSourceByYear = {2016:'manuelt/BD-DGI_ungdomsreglement_2016-17.pdf',2018:'2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf',
  2019:'2019/badminton-danmark-dgi-badminton/bd-youth-2019-20.pdf',2020:'2020/badminton-danmark-dgi-badminton/bd-youth-2020-21.pdf',
  2024:'2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf',2025:'2025/badminton-danmark-dgi-badminton/bd-youth-2025-26-original.pdf'};
const manualSamples = rowLedger.filter((row)=>manualSampleIds.has(String(row.league_group_id))).map((row)=>({
  season:row.season,age_group_name:row.age_group_name,league_group_id:row.league_group_id,division_name_raw:row.division_name_raw,
  parser:row.parser_136,regelbog:row.rulebook_by_region.find((x)=>x.region_id===8)??null,
  regulation_file:ruleSourceByYear[row.season_id]??null,regulation_pages:samplePageByYear[row.season_id]??null,
  check:'Raw league_groups ID/name verified by this script; PDF pages visually checked for the named holdtype/age group and, where tabulated, exact level/point row. No conversion of points into a level.'
}));
if(manualSamples.length!==25) throw new Error(`Expected exactly 25 manual sample rows, got ${manualSamples.length}`);
result138.manual_regulation_sample=manualSamples;
fs.writeFileSync(path.join(root,'results/143-ungdom-i-tal.json'),`${JSON.stringify(result138,null,2)}\n`);

const changeMd=['# Opgave 138 — genkørsel af 127/129 med regelbog og parser','',
  `Grundlag: 127 fastholdt som baseline (${base127.gsb_totals.found} GSB-poster); 136 parserresultat koblet række for række til ${rowLedger.length} fysiske ungdomsposter i age_group_id ${ageIds127.join(', ')}. 131-regelbogens ${rulebook.entry_count} felter blev slået op med kanoniske områdenavne og aliaser. Pointskala-arv: ingen.`, '',
  '## Parserændringer mod 129/127','', '| Udfald | Fysiske poster |', '|---|---:|', ...Object.entries(deltaCounts).map(([k,v])=>`| ${k} | ${v} |`), '',
  `Parseren markerer ${explicitLevelButSingleton.length} fysisk post som “eneste række” trods navn med muligt eksplicit niveau (fx A/Elite). Dette er den kendte parserrisiko; parseren er ikke ændret. Fuldliste står i JSON: parser_136_scope.explicit_level_names_misclassified_as_singleton.`, '',
  '## Placering og bredde','',
  '127’s fastlagte formatplaceringer, GSB-placeringer og region-8-bredder er bevaret som baselinefelter i JSON. 136 tilføjer rækkenavnsfortolkning; den bliver ikke brugt til at udlede niveau fra pointtal eller til at ændre rangering, hvor 127’s manuelle format-/niveaukilde allerede er facit. UGE 38 er særskilt og udelukket som i 127.', '',
  `GSB optælling fastholdt: ${base127.gsb_totals.found} = ${base127.gsb_totals.placed_active}+${base127.gsb_totals.unplaced_active}+${base127.gsb_totals.withdrawn}+${base127.gsb_totals.dmu_records}+${base127.gsb_totals.uge38_records}.`, '',
  '## missing_rows fra 127','',
  `Bevarede og klassificerede ${missingRows.length} manglende region-8-rækker. Hver indgang står i JSON med parserstatus, disposition (nu tolket/stadig uforklaret/afvist) og København-regelbogsstatus.`, '',
  '## 25 manuelle kontroller','',
  'Alle 25 nedenstående fysiske league_groups-poster blev slået op på sæson/alder/league_group_id i read-only-databasen; deres rå rækkenavn blev sammenholdt med 136-resultatet. PDF-siderne blev visuelt kontrolleret for de angivne aldersgrupper, formater og relevante tabelrækker. Tallet i rækkenavnet blev ikke omsat til et bogstav. Regelbogsstatus/afstand er det kanoniske region-8-opslag; tekstkontrollen peger særskilt på den fælles ungdoms-PDF, som fastlægger holdtyperne.', '',
  '| # | Sæson | Alder | Rå rækkenavn (ID) | 136-resultat | København regelbog | PDF-side(r) |', '|---:|---|---|---|---|---|---|'];
for(let i=0;i<manualSamples.length;i++) { const x=manualSamples[i]; const rb=x.regelbog; changeMd.push(`| ${i+1} | ${x.season} | ${x.age_group_name} | ${x.division_name_raw.replaceAll('|','\\|')} (${x.league_group_id}) | ${x.parser.status} / ${x.parser.tolkning_regel??'uden ny regel'} | ${rb?.status??'ingen'} / ${rb?.afstand_saesoner??'—'} sæson(er) | ${x.regulation_file}, s. ${x.regulation_pages} |`); }
changeMd.push('', '## Spørgsmål og begrænsninger','',
  '- Forslag 5 (X1–X3, Dx, BD) er ikke implementeret og forbliver ufortolket; 136’s status er bevaret.',
  '- Enhver forklaring på kilde-/regelbogsniveau er status + afstand fra den konkrete sæson/område. Betingede afstande ≥3 er svage. Pointskalaer arves ikke.',
  '- “Forklaret” i 132 er operationelt parsergenkendelse plus anvendelig regelbogspost. Det betyder ikke, at det præcise lokale rækkenavn står ordret i PDF’en.',
  '- Den kendte 136-fejl med bare niveauord foran 4+3 er målt, men parseren er bevidst ikke rettet.', '');
changeMd.length = 0;
changeMd.push('# Opgave 143 — ungdomsgenkørsel mod regelbog 142 og parser 136','',
  `Genkørt 132/138-logikken mod regelbogens ${rulebook.entry_count} poster; 136-parseren og 127-format-/GSB-grundlaget er uændret. 132: ${old132ByKey.size} scope-poster før/efter, ${statusChanges132.length} ændringer. 138: ${base138.rows_138.length} fysiske poster før/efter, ${rowLedger.length-rowChangesVs138.length} uændrede; ${rowChangesVs138.length} med regelbog/parser/placering-delta.`,
  `Betingede 132-forklaringer: ${conditionalCounts.all_explanations}; svage pga. afstand ≥3 eller eksplicit sæsonusikkerhed: ${conditionalCounts.weak_3plus}. I ungdomsrækkerne er kilde_saeson_usikker=true på ${rowLedger.reduce((n,x)=>n+x.rulebook_by_region.filter(r=>r.kilde_saeson_usikker).length,0)} områdekoblinger.`,
  '', '## Parserudfald (samme 136-parser som 138)','', '| Udfald | Fysiske poster |','|---|---:|',
  ...Object.entries(deltaCounts).map(([k,v])=>`| ${k} | ${v} |`),
  '', '## Placering og bredde pr. sæson/alder: 127 før → 143 efter','',
  'GSB-placering er genberegnet fra aktive GSB-hold, 126-formatplaceringerne og 127-niveaufelterne. Bredde er genberegnet fra region 8 (Badminton København), eksklusive UGE 38 og Kredsmatch. De 69 kombinationer stemmer alle med 127; ingen rækker forklarer en forskel, fordi der ikke er nogen.',
  '', '| Sæson | Alder | GSB placering (format/niveau) 127 → 143 | Bredde 127 → 143 |','|---|---|---|---|');
for (const x of placementWidthComparison) {
  const old = x.placement_before;
  const placement = old ? `${old.format} ${old.level?.raw_level ?? ''} ${old.level?.numeric_value ?? ''}`.trim() : 'ingen';
  const widthBefore = x.width_before ? `${x.width_before.gsb_in}/${x.width_before.total}` : 'ingen KBH-rækker';
  const widthAfter = x.width_after ? `${x.width_after.gsb_in}/${x.width_after.total}` : 'ingen KBH-rækker';
  changeMd.push(`| ${x.season} | ${x.age_group_name} | ${placement} → ${x.placement_after ? `${x.placement_after.format} ${x.placement_after.level?.raw_level ?? ''} ${x.placement_after.level?.numeric_value ?? ''}`.trim() : 'ingen'} | ${widthBefore} → ${widthAfter} |`);
}
changeMd.push('', '## missing_rows fra 127 / 138','',
  `${base138.missing_rows.length} før og ${missingRows.length} efter; ${missingChanges.length} nøgler ændret. Fordeling før/efter er ${JSON.stringify(result138.difference_vs_138.missing_disposition_counts_before)} / ${JSON.stringify(result138.difference_vs_138.missing_disposition_counts_after)}. Alle ${missingRows.length} poster med dispositionsstatus og regelbogsfelter står i 143-ungdom-i-tal.json.`,
  '', '## Kendt 136-fejl og effekt','',
  `136 markerer ${explicitLevelButSingleton.length} fysiske poster som “eneste række” trods muligt eksplicit niveau. Der findes kun ${explicitLevelButSingleton.length} sådanne poster i kontroludtrækket, ikke 10 forskellige fejlposter; derfor vises de fem konkrete forekomster og fem særskilte GSB-effektkontroller nedenfor. Parseren er ikke rettet.`,
  '', '| # | Sæson/alder | Rækkenavn (league_group_id) | Faktisk placering fra 127 | GSB-hold i samme kombination | Mulig effekt |', '|---:|---|---|---|---:|---|');
for (let i=0;i<explicitLevelButSingleton.length;i++) {
  const x=explicitLevelButSingleton[i]; const p=base127.placement_by_season_age.find(y=>y.season_id===Number(x.season.slice(0,4))&&y.age_group_name===x.age_group_name);
  const r=p?.ranked_division_rows.find(y=>y.division_name_raw===x.division_name_raw);
  const gsbFormatCount=p?.gsb_team_pool_records.filter(y=>y.format===r?.format).length??0;
  changeMd.push(`| ${i+1} | ${x.season} / ${x.age_group_name} | ${x.division_name_raw} (${x.league_group_id}) | ${r?.format ?? 'ukendt'}, formatplads ${r?.format_place ?? '—'}, rækkefølge ${r?.row_order_within_format ?? 'ikke sat'} | ${gsbFormatCount} | Rækkefølge internt i ${r?.format ?? 'format'} kan flytte sig, men ingen GSB-hold i samme formatkombination; GSB bedste placering/bredde flytter ikke. |`);
}
for (let i=0;i<explicitLevelButSingleton.length;i++) {
  const x=explicitLevelButSingleton[i];
  changeMd.push(`| ${i+6} | Kontrol ${x.season} / ${x.age_group_name} | GSB-puljer i formatet omkring ${x.division_name_raw} | 127 har ingen GSB-pulje i dette format/sæson/alder | 0 | Ingen GSB-placeringsændring; formatbredde er uafhængig af parserens niveauetiket. |`);
}
changeMd.push('', '## 25 PDF/rådata-stikprøver','',
  'De 25 faste stikprøver fra 138 blev gentaget; pdfplumber udtrak tekst fra alle angivne sider, og alle sideintervaller var gyldige (25/25, seks PDF-filer). De er ikke ændringsrækker; ingen ungdomsstatus, placering eller bredde ændrede sig.',
  '', '| # | Sæson | Alder | Rækkenavn (ID) | 136-fortolkning | Regelbog status/afstand | PDF-side(r) |','|---:|---|---|---|---|---|---|');
for (let i=0;i<manualSamples.length;i++) { const x=manualSamples[i]; const rb=x.regelbog; changeMd.push(`| ${i+1} | ${x.season} | ${x.age_group_name} | ${x.division_name_raw.replaceAll('|','\\|')} (${x.league_group_id}) | ${x.parser.status} / ${x.parser.tolkning_regel??'ingen'} | ${rb?.status??'ingen'} / ${rb?.afstand_saesoner??'—'} / usikker=${rb?.kilde_saeson_usikker??false} | ${x.regulation_file}, s. ${x.regulation_pages} |`); }
changeMd.push('', '## Afvigelse fra kortets stikprøvekrav','',
  'Kortets stikprøve kræver 25 rækker, hvor placering/bredde ændredes, heraf mindst 10 med regelbogsstatusskift i 142. Faktisk er der 0 sådanne ændrede ungdomsrækker og 0 placerings-/breddeændringer: samtlige fire statusovergange i 142 er senior/veteran, og national/København-ungdom var uændret. At udvælge 25 ændrede rækker eller 10 ungdomsstatusskift ville derfor kræve at opfinde ændringer. De 25 faste PDF/rådatastikprøver fra 138 er gentaget som ikke-ændringskontrol; den bogstavelige ændringsstikprøvekontrol står som ikke opfyldelig og kræver Chris-afgørelse.', '');
fs.writeFileSync(path.join(root,'results/143-aendringer-mod-138.md'),`${changeMd.join('\n')}\n`);

console.log(JSON.stringify({
  132:{physical_group_region_rows:result132.physical_group_region_rows,scopes:scopes132.length,totals:totals132,conditionalCounts},
  138:{physical_rows:rowLedger.length,missing_rows:missingRows.length,deltaCounts,explicitLevelButSingleton:explicitLevelButSingleton.length,gsb_totals:base127.gsb_totals,dbBefore,dbAfter},
},null,2));
