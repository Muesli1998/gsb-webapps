import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const root = process.cwd();
const dbPath = process.argv[2] ?? 'statistik/data/liga-landskab.db';
const normalizedPath = process.argv[3] ?? 'statistik/data/gsb-statistik-normalized.db';
const rankingPath = process.argv[4] ?? 'statistik/data/rangliste-historik.db';
const outDir = 'statistik/results';
fs.mkdirSync(outDir, { recursive: true });

const db = new DatabaseSync(dbPath, { readOnly: true });
const ndb = new DatabaseSync(normalizedPath, { readOnly: true });
const rdb = new DatabaseSync(rankingPath, { readOnly: true });
const all = (handle, sql, params = []) => handle.prepare(sql).all(...params);

const groups = all(db, `
  SELECT lg.season_id, lg.age_group_id, lg.league_group_id,
         lg.division_name_raw, lg.group_name_raw, lg.page_title_raw,
         GROUP_CONCAT(DISTINCT lgr.region_id) AS region_ids
  FROM league_groups lg
  LEFT JOIN league_group_regions lgr USING (season_id, age_group_id, league_group_id)
  GROUP BY lg.season_id, lg.age_group_id, lg.league_group_id
  ORDER BY lg.season_id, lg.age_group_id, lg.league_group_id
`);

const rawCatalogue = (column) => {
  const byValue = new Map();
  for (const row of groups) {
    const value = row[column];
    const key = value == null ? null : String(value);
    if (!byValue.has(key)) byValue.set(key, { value, occurrences: 0, seasons: {}, regions: {}, season_regions: {} });
    const item = byValue.get(key);
    item.occurrences += 1;
    const season = String(row.season_id);
    const regions = row.region_ids ? String(row.region_ids).split(',') : ['null'];
    item.seasons[season] = (item.seasons[season] ?? 0) + 1;
    for (const region of regions) {
      item.regions[region] = (item.regions[region] ?? 0) + 1;
      if (!item.season_regions[season]) item.season_regions[season] = {};
      item.season_regions[season][region] = (item.season_regions[season][region] ?? 0) + 1;
    }
  }
  return [...byValue.values()].sort((a, b) => b.occurrences - a.occurrences || String(a.value).localeCompare(String(b.value)));
};

const catalogues = {
  division_name_raw: rawCatalogue('division_name_raw'),
  group_name_raw: rawCatalogue('group_name_raw'),
  page_title_raw: rawCatalogue('page_title_raw'),
};

const gsbRows = all(ndb, `
  SELECT c.season_id, c.competition_id, c.league_group_id, c.age_group_id,
         c.name_raw AS competition_name_raw, c.league_raw, c.phase_raw,
         c.source_url, t.team_id, t.name_raw AS team_name_raw,
         COUNT(DISTINCT tm.team_match_id) AS team_match_count
  FROM competitions c
  JOIN teams t ON t.competition_id = c.competition_id AND t.season_id = c.season_id
  LEFT JOIN team_matches tm ON tm.competition_id = c.competition_id AND tm.gsb_team_id = t.team_id
  JOIN clubs cl ON cl.club_id = t.club_id
  WHERE lower(cl.name_raw) LIKE '%gladsaxe%' OR lower(cl.name_raw) LIKE '%søborg%'
  GROUP BY c.competition_id, t.team_id
  HAVING team_match_count > 0
  ORDER BY c.season_id, c.age_group_id, c.league_group_id, t.name_raw
`);

const gsbSenior = gsbRows.filter((r) => [1, 9].includes(Number(r.age_group_id)));
const groupKey = (r) => `${r.season_id}|${r.age_group_id}|${r.league_group_id}`;
const groupRows = new Map();
for (const row of groups) {
  const key = groupKey(row);
  if (!groupRows.has(key)) groupRows.set(key, []);
  groupRows.get(key).push(row);
}
const gsbWithRaw = gsbRows.map((row) => ({
  ...row,
  landscape: groupRows.get(groupKey(row)) ?? [],
}));

const seniorMovement = gsbSenior.map((row) => ({
  season_id: row.season_id,
  team_id: row.team_id,
  team_name_raw: row.team_name_raw,
  age_group_id: row.age_group_id,
  league_group_id: row.league_group_id,
  league_raw: row.league_raw,
  phase_raw: row.phase_raw,
  competition_name_raw: row.competition_name_raw,
  team_match_count: row.team_match_count,
  source_url: row.source_url,
  explicit_movement_token: /oprykning|nedrykning|kvalifikation/i.test(`${row.league_raw ?? ''} ${row.phase_raw ?? ''} ${row.competition_name_raw ?? ''}`),
}));

const movementCounts = {
  gsbSeniorRows: seniorMovement.length,
  rowsWithPromotionOrRelegationToken: seniorMovement.filter((r) => /oprykning|nedrykning/i.test(`${r.league_raw ?? ''} ${r.phase_raw ?? ''} ${r.competition_name_raw ?? ''}`)).length,
  rowsWithQualificationToken: seniorMovement.filter((r) => /kvalifikation/i.test(`${r.league_raw ?? ''} ${r.phase_raw ?? ''} ${r.competition_name_raw ?? ''}`)).length,
};
const rankingTables = all(rdb, "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").map((row) => row.name);

const output = {
  generatedAt: new Date().toISOString(),
  databases: { landscape: dbPath, normalized: normalizedPath, ranking: rankingPath },
  rankingTables,
  groupCount: groups.length,
  distinctValueCounts: Object.fromEntries(Object.entries(catalogues).map(([key, rows]) => [key, rows.length])),
  catalogues,
  gsb: {
    allRows: gsbWithRaw,
    seniorMovement,
    movementCounts,
    methodology: 'GSB rows are linked by the normalized club relation. Cross-season team identity is treated as uncertain unless the raw name/age/competition context is explicit; no inferred identity is created.',
  },
};
fs.writeFileSync(`${outDir}/084-liga-landskab-rangering.json`, JSON.stringify(output, null, 2) + '\n');

const top = (column, count = 25) => catalogues[column].slice(0, count).map((r) => ({ value: r.value, occurrences: r.occurrences, seasons: Object.keys(r.seasons).length, regions: Object.keys(r.regions).length }));
const lines = [
  '# Opgave 084 — række- og rangeringsoverblik', '',
  `Genereret: ${output.generatedAt}`, '',
  '## Datasæt', '',
  `- \`league_groups\`-rækker: **${groups.length}**`,
  `- Distinkte division_name_raw-værdier: **${catalogues.division_name_raw.length}**`,
  `- Distinkte group_name_raw-værdier: **${catalogues.group_name_raw.length}**`,
  `- Distinkte page_title_raw-værdier: **${catalogues.page_title_raw.length}**`,
  '- Den komplette katalogisering med forekomster pr. sæson og region ligger i `084-liga-landskab-rangering.json`.', '',
  '## Faktiske rå navnemønstre', '',
  'Råfelterne er ikke et entydigt hierarki: de blander divisionsnavne, regionale serier, alders-/pointformater og playoff/finaler. Regionerne findes i data som numeriske `region_id`-værdier; der er ikke et regionsnavn i `league_groups`-skemaet.', '',
  '### Hyppigste division_name_raw', '',
  '| Rå værdi | Forekomster | Sæsoner | Regioner |', '|---|---:|---:|---:|',
  ...top('division_name_raw').map((r) => `| ${String(r.value ?? '(NULL)').replaceAll('|', '\\|')} | ${r.occurrences} | ${r.seasons} | ${r.regions} |`), '',
  '### Hyppigste group_name_raw', '',
  '| Rå værdi | Forekomster | Sæsoner | Regioner |', '|---|---:|---:|---:|',
  ...top('group_name_raw', 20).map((r) => `| ${String(r.value ?? '(NULL)').replaceAll('|', '\\|')} | ${r.occurrences} | ${r.seasons} | ${r.regions} |`), '',
  '### Hyppigste page_title_raw', '',
  '| Rå værdi | Forekomster | Sæsoner | Regioner |', '|---|---:|---:|---:|',
  ...top('page_title_raw', 20).map((r) => `| ${String(r.value ?? '(NULL)').replaceAll('|', '\\|')} | ${r.occurrences} | ${r.seasons} | ${r.regions} |`), '',
  '## GSB-udsigt og empirisk bevægelse', '',
  `- GSB-koblede holdrækker med mindst én kamp: **${gsbRows.length}**; senior/veteran age_group_id 1 eller 9: **${movementCounts.gsbSeniorRows}**.`,
  `- Senior/veteran-rækker hvor råteksten eksplicit indeholder oprykning/nedrykning: **${movementCounts.rowsWithPromotionOrRelegationToken}**.`,
  `- Senior/veteran-rækker hvor råteksten indeholder kvalifikation: **${movementCounts.rowsWithQualificationToken}**.`,
  '- Dette er evidens for at op-/nedryknings- og kvalifikationsfaser kan identificeres som tekstlige hændelser. Det er ikke i sig selv et bevis på en stabil holdidentitet på tværs af sæsoner.',
  '- GSB’s førstehold har i flere sæsoner en unummereret/varierende `team_name_raw` og flere rækker i samme sæson (hovedpulje plus kvalifikation eller nedrykning). Derfor behandles tværsæsonskobling som usikker, medmindre en særskilt identitetsnøgle eller manuel facitliste foreligger.', '',
  '### Eksempel på kendt GSB-forløb (rå data)', '',
  '| Sæson | Holdnavn | Rå række | Pulje-ID | Kampe |', '|---:|---|---|---:|---:|',
  ...seniorMovement.filter((r) => r.season_id >= 2010 && r.season_id <= 2015 && /danmarksserien/i.test(r.league_raw ?? '')).slice(0, 12).map((r) => `| ${r.season_id} | ${r.team_name_raw ?? ''} | ${r.league_raw ?? ''} | ${r.league_group_id} | ${r.team_match_count} |`), '',
  '## Officiel dokumentation', '',
  '- Badminton Danmarks holdturneringsreglement beskriver divisionsstrukturen og geografiske grupper, herunder 3. division og Danmarksserien, samt oprykning/nedrykning: [Holdturneringsreglement for badminton i Danmark](https://badminton.dk/wp-content/uploads/2023/10/Holdturneringsreglement-for-badminton-i-Danmark-051023.pdf).',
  '- De officielle DH-regler beskriver seniorstrukturen fra Badmintonligaen gennem 1.-3. division og Danmarksserien og har særskilte opryknings-/nedrykningsregler: [DH-reglement 2026](https://badminton.dk/wp-content/uploads/2026/02/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-02-25.pdf).',
  '- Kilderne dokumenterer regler og bevægelsesmekanismer, men de giver ikke en maskinlæsbar historisk mapping af hvert råt `division_name_raw`/`page_title_raw`-token til ét globalt niveau. Den del må derfor kombineres af officielle regler, kildeårgang og empirisk validering.', '',
  '## Foreslået model (ikke bygget)', '',
  '1. Behold rå `league_groups` urørt og tilføj senere en separat afledt tabel `league_level_assignments` med `season_id`, `age_group_id`, `region_id`, `league_group_id`, normaliseret niveau, holdtype, confidence, evidence_type og source_ref.',
  '2. Brug en separat `team_identity_links`-tabel til tværsæsonskoblinger med `identity_method` (eksplicit ID, alias, manuel), confidence og konfliktflag. Et råt holdnavn alene må ikke være en stabil identitetsnøgle.',
  '3. Beregn rangerede lister i en materialiseret/afledt visning pr. sæson + aldersgruppe: først officielt niveau (hvis dokumenteret), derefter pulje/region, derefter kampresultat/sætdifference. Vis datadækning og usikkerhed sammen med rangeringen.',
  '4. Hold kampdata adskilt fra fortolkningen, så regler eller navnealias kan forbedres uden at genindhente råkampe.', '',
  '## Konklusion', '',
  'Opgaven er gennemført som analyse. Rånavnene viser et reelt, heterogent landskab; officielle regler bekræfter en overordnet seniorstruktur, men ikke en komplet historisk tokenmapping. Oprykning/nedrykning kan bruges som valideringsevidens i et afgrænset, manuelt kontrolleret udsnit, men ikke som automatisk identitets- eller niveaualgoritme endnu.',
];
fs.writeFileSync(`${outDir}/084-liga-landskab-rangering.md`, lines.join('\n') + '\n');

console.log(JSON.stringify({
  groupCount: groups.length,
  distinctValueCounts: output.distinctValueCounts,
  gsbRows: gsbRows.length,
  movementCounts,
}, null, 2));
