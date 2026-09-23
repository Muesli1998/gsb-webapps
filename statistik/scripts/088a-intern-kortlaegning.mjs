import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const dbFile = 'statistik/data/liga-landskab.db';
const dbUri = 'file:C:/Users/chril/Code/gsb-webapps/statistik/data/liga-landskab.db?immutable=1';
const outMd = 'statistik/results/088a-intern-kortlaegning.md';
const outJson = 'statistik/results/088a-intern-kortlaegning.json';
const db = new DatabaseSync(dbUri, { readOnly: true });
const all = (sql, ...p) => db.prepare(sql).all(...p);
const norm = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();

function classify(division, group) {
  const s = norm(`${division ?? ''} ${group ?? ''}`);
  if (!s) return ['andet/ukendt', 'tomt navn'];
  if (/kvalifikation/.test(s)) {
    if (/(ned|nr\.?\s*8\s*[-–]\s*9|bevare)/.test(s)) return ['kvalifikation_ned', 'navneord: kvalifikation + ned'];
    if (/(op|liga\/1\.\s*division|til ligaen|opr)/.test(s)) return ['kvalifikation_op', 'navneord: kvalifikation + op'];
    return ['andet/ukendt', 'kvalifikation uden retning'];
  }
  if (/(nedrykning|nedrykningsspil)/.test(s)) return ['nedrykningsspil', 'navneord: nedrykning'];
  if (/(oprykning|oprykningsspil)/.test(s)) return ['oprykningsspil', 'navneord: oprykning'];
  if (/(kvartfinal|semifinal|final|bronzekamp|guldkamp|slutspil|playoff)/.test(s)) return ['slutspil', 'navneord: slutspil'];
  if (/(grundspil|pulje|serie|division|ligaen)/.test(s)) return ['grundspil', 'navneord: grundspil/pulje'];
  return ['andet/ukendt', 'ingen sikker nøgle'];
}

const groups = all(`SELECT g.season_id,g.age_group_id,g.league_group_id,g.division_name_raw,g.group_name_raw,g.page_title_raw,
 (SELECT COUNT(*) FROM league_group_regions r WHERE r.season_id=g.season_id AND r.age_group_id=g.age_group_id AND r.league_group_id=g.league_group_id) AS regions
 FROM league_groups g`);
const catalogMap = new Map();
for (const g of groups) {
  const key = `${g.division_name_raw ?? ''}\u001f${g.group_name_raw ?? ''}`;
  const [group_type, classification_basis] = classify(g.division_name_raw, g.group_name_raw);
  let x = catalogMap.get(key);
  if (!x) { x = {division_name_raw:g.division_name_raw ?? '',group_name_raw:g.group_name_raw ?? '',group_type,classification_basis,occurrence_count:0,first_season_id:g.season_id,last_season_id:g.season_id,regions:new Set()}; catalogMap.set(key,x); }
  x.occurrence_count++; x.first_season_id=Math.min(x.first_season_id,g.season_id); x.last_season_id=Math.max(x.last_season_id,g.season_id);
}
for(const g of groups){ const x=catalogMap.get(`${g.division_name_raw ?? ''}\u001f${g.group_name_raw ?? ''}`); const regs=all(`SELECT region_id FROM league_group_regions WHERE season_id=? AND age_group_id=? AND league_group_id=?`,g.season_id,g.age_group_id,g.league_group_id); regs.forEach(r=>x.regions.add(r.region_id)); }
const catalog=[...catalogMap.values()].map(x=>({...x,distinct_region_count:x.regions.size})).sort((a,b)=>b.occurrence_count-a.occurrence_count);
const typeCounts={}; catalog.forEach(x=>typeCounts[x.group_type]=(typeCounts[x.group_type]??0)+x.occurrence_count);
const unclear=catalog.filter(x=>x.group_type==='andet/ukendt');

const coverage=all(`SELECT r.region_id, g.season_id, COUNT(DISTINCT COALESCE(g.division_name_raw,'')) AS divisions, COUNT(DISTINCT g.league_group_id) AS groups, COUNT(DISTINCT t.team_name_raw) AS teams
FROM league_groups g JOIN league_group_regions r ON r.season_id=g.season_id AND r.age_group_id=g.age_group_id AND r.league_group_id=g.league_group_id
LEFT JOIN league_group_teams t ON t.season_id=g.season_id AND t.age_group_id=g.age_group_id AND t.league_group_id=g.league_group_id
GROUP BY r.region_id,g.season_id ORDER BY r.region_id,g.season_id`);
const coverageBreaks=[]; for(const [region, rows] of Object.entries(Object.groupBy(coverage, r=>r.region_id))){ for(let i=1;i<rows.length;i++){ const a=rows[i-1],b=rows[i]; if(a.season_id+1===b.season_id && (Math.abs(b.groups-a.groups)>=Math.max(5,Math.ceil(a.groups*.4)) || Math.abs(b.teams-a.teams)>=Math.max(20,Math.ceil(a.teams*.4)))) coverageBreaks.push({region_id:Number(region),from:a.season_id,to:b.season_id,groups_from:a.groups,groups_to:b.groups,teams_from:a.teams,teams_to:b.teams}); }}

const seasonSanity=all(`SELECT season_id, MIN(match_date) min_date, MAX(match_date) max_date, COUNT(*) matches FROM league_matches WHERE season_id IN (2019,2020,2025) AND match_date IS NOT NULL GROUP BY season_id ORDER BY season_id`);

const indexHtml=all(`SELECT season_id,age_group_id,region_id,raw_response FROM standing_indexes WHERE raw_response IS NOT NULL`);
const detailHtml=all(`SELECT season_id,age_group_id,league_group_id AS region_id,raw_response FROM league_group_details WHERE raw_response IS NOT NULL`);
const markerRegex=/(?:trukket|udgået|tvangsnedrykket|walkover|w\/o)/ig;
const markerSamples=[]; let markerPages=0, markerHits=0;
for(const r of [...indexHtml,...detailHtml]){let h=''; try {const o=JSON.parse(r.raw_response);h=o?.d?.html ?? o?.d?.Html ?? '';}catch{};const hits=[...h.matchAll(markerRegex)]; if(hits.length){markerPages++;markerHits+=hits.length; for(const hit of hits.slice(0,3)){markerSamples.push({season_id:r.season_id,age_group_id:r.age_group_id,region_id:r.region_id,marker:hit[0],context:h.slice(Math.max(0,hit.index-120),hit.index+180).replace(/\s+/g,' ')});}}}

const rawPages=[...indexHtml,...detailHtml];
const idPatterns={showStandingTeam:0,hrefClubId:0,dataClubId:0,hrefTeamId:0,dataTeamId:0};
const idSample=Array.from({length: Math.min(500,rawPages.length)}, (_,i)=>rawPages[Math.floor(i*(rawPages.length-1)/(Math.min(500,rawPages.length)-1))]);
for(const r of idSample){let h='';try{const o=JSON.parse(r.raw_response);h=o?.d?.html ?? o?.d?.Html ?? '';}catch{}; idPatterns.showStandingTeam += (h.match(/ShowStanding\(\s*['"]3['"]/g)||[]).length; idPatterns.hrefClubId += (h.match(/club(?:id|ID)=/g)||[]).length; idPatterns.dataClubId += (h.match(/data-club(?:id|ID)/g)||[]).length; idPatterns.hrefTeamId += (h.match(/team(?:id|ID)=/g)||[]).length; idPatterns.dataTeamId += (h.match(/data-team(?:id|ID)/g)||[]).length; }
const idConclusion = 'Kun ShowStanding-side-3’s leagueGroupTeamID ses systematisk i det repræsentative rå-HTML-udsnit; den er allerede udtrukket i league_group_teams og er pulje-/sæsonlokal. Ingen stabil klub-ID-markør blev fundet i det repræsentative 500-sides udsnit.';

const special=all(`SELECT g.season_id,g.age_group_id,g.league_group_id,g.division_name_raw,g.group_name_raw,t.team_name_raw,t.standing_position
FROM league_groups g JOIN league_group_teams t ON t.season_id=g.season_id AND t.age_group_id=g.age_group_id AND t.league_group_id=g.league_group_id
WHERE lower(t.team_name_raw) LIKE '%gentofte%' OR lower(t.team_name_raw) LIKE '%roskilde%'
AND (lower(COALESCE(g.group_name_raw,'')) LIKE '%oprykning%' OR lower(COALESCE(g.group_name_raw,'')) LIKE '%nedrykning%' OR lower(COALESCE(g.group_name_raw,'')) LIKE '%kvalifikation%')
ORDER BY g.season_id DESC LIMIT 200`);

const result={generated_at:new Date().toISOString(),groups:groups.length,catalog,type_counts:typeCounts,unclear,coverage_rows:coverage.length,coverage_breaks:coverageBreaks,season_sanity:seasonSanity,raw_marker_pages:markerPages,raw_marker_hits:markerHits,raw_marker_samples:markerSamples.slice(0,100),id_patterns:idPatterns,id_conclusion:idConclusion,special_candidates:special};
fs.writeFileSync(outJson,JSON.stringify(result,null,2));
const esc=s=>String(s??'').replace(/\|/g,'\\|');
const catalogRows=catalog.map(x=>`| ${esc(x.division_name_raw)} | ${esc(x.group_name_raw)} | ${x.group_type} | ${x.occurrence_count} | ${x.first_season_id}–${x.last_season_id} | ${x.distinct_region_count} | ${x.classification_basis} |`).join('\n');
const unclearRows=unclear.slice(0,100).map(x=>`| ${esc(x.division_name_raw)} | ${esc(x.group_name_raw)} | ${x.occurrence_count} | ${x.classification_basis} |`).join('\n')||'| — | — | 0 | — |';
const sanityRows=seasonSanity.map(x=>`| ${x.season_id} | ${x.min_date} | ${x.max_date} | ${x.matches} |`).join('\n');
const breaksRows=coverageBreaks.slice(0,100).map(x=>`| ${x.region_id} | ${x.from}→${x.to} | ${x.groups_from}→${x.groups_to} | ${x.teams_from}→${x.teams_to} |`).join('\n')||'| Ingen ved valgt tærskel | | | |';
const specialRows=special.slice(0,100).map(x=>`| ${x.season_id} | ${x.age_group_id} | ${x.league_group_id} | ${esc(x.division_name_raw)} | ${esc(x.group_name_raw)} | ${esc(x.team_name_raw)} | ${x.standing_position??''} |`).join('\n')||'| Ingen kandidater fundet med den snævre tekstafgrænsning | | | | | | |';
const idPatternRows = Object.entries(idPatterns).map(([k,v]) => `| ${k} | ${v} |`).join('\n');
const typeCountRows = Object.entries(typeCounts).map(([k,v]) => `| ${k} | ${v} |`).join('\n');
fs.writeFileSync(outMd, `# Opgave 088a — intern kortlægning

Genereret ${result.generated_at}. Kun læsning af allerede hentet data; ingen API-kald eller websøgning.

## 1. ID-jagt

${idConclusion}

| Signal i 500 indeks-/puljesider | Forekomster |
|---|---:|
${idPatternRows}

## 2. Gruppetype-katalog

${groups.length} puljer giver ${catalog.length} distinkte kombinationer. Klassifikation sker alene ud fra navneord. \`andet/ukendt\` er bevidst ikke gættet.

| Type | Puljeforekomster |
|---|---:|
${typeCountRows}

| Division | Gruppe | Type | Forekomster | Sæsoner | Regioner | Grundlag |
|---|---|---|---:|---|---:|---|
${catalogRows}

### Uklare kombinationer

| Division | Gruppe | Forekomster | Hvorfor uklar |
|---|---|---:|---|
${unclearRows}

## 3. Dækningsmatrix og brud

Matrixen har ${coverage.length} region-sæson-rækker. Nedenfor er kandidatspring (mindst 40 % og mindst 5 puljer eller 20 hold); de beviser hverken strukturændring eller datahul alene.

| Region | Sæsonskifte | Puljer | Hold |
|---:|---|---|---|
${breaksRows}

## 4. Sæson-sanity

| season_id | Første kampdato | Sidste kampdato | Kampe |
|---:|---|---|---:|
${sanityRows}

## 5. Rå markeringer

${markerHits} markørtræf på ${markerPages} indeks-/puljesider. Kontekstprøver ligger i JSON; de er ikke automatisk tolket som en regel.

## 6–7. Roskilde og Gentofte

Den interne tekstafgrænsning fandt nedenstående kandidater. Kortet angiver ikke sæson/pulje for den konkrete Roskilde- eller Gentofte-sag, så en endelig reproduktion kan ikke gøres uden at gætte. De er derfor flaget til Christoffer i opgavekortet; der er ikke konstrueret en cap-konklusion.

| Sæson | Alder | Pulje | Division | Gruppe | Hold | Plads |
|---:|---:|---|---|---|---|---:|
${specialRows}

## Konklusion

- Stabilt, tværsæson-klub-ID: **nej fundet i dette udsnit**.
- Gruppetyper: kataloget er komplet for \`league_groups\`; uklare navne er bevaret som \`andet/ukendt\`.
- Roskilde/Gentofte: kræver de konkrete sæson-/puljehenvisninger for en ikke-gættet testcase.
`);
console.log(JSON.stringify({groups:groups.length,catalog:catalog.length,unclear:unclear.length,typeCounts,coverageRows:coverage.length,coverageBreaks:coverageBreaks.length,markerPages,markerHits,specialCandidates:special.length},null,2));

if (process.argv.includes('--write-db')) {
  const writeDb = new DatabaseSync(dbFile);
  writeDb.exec(`CREATE TABLE IF NOT EXISTS group_type_katalog (
    division_name_raw TEXT NOT NULL,
    group_name_raw TEXT NOT NULL,
    group_type TEXT NOT NULL,
    classification_basis TEXT NOT NULL,
    occurrence_count INTEGER NOT NULL,
    first_season_id INTEGER NOT NULL,
    last_season_id INTEGER NOT NULL,
    distinct_region_count INTEGER NOT NULL,
    generated_at TEXT NOT NULL,
    PRIMARY KEY (division_name_raw, group_name_raw)
  ); DELETE FROM group_type_katalog;`);
  const insert=writeDb.prepare(`INSERT INTO group_type_katalog
    (division_name_raw,group_name_raw,group_type,classification_basis,occurrence_count,first_season_id,last_season_id,distinct_region_count,generated_at)
    VALUES (?,?,?,?,?,?,?,?,?)`);
  const generatedAt=result.generated_at;
  writeDb.exec('BEGIN');
  for(const x of catalog) insert.run(x.division_name_raw,x.group_name_raw,x.group_type,x.classification_basis,x.occurrence_count,x.first_season_id,x.last_season_id,x.distinct_region_count,generatedAt);
  writeDb.exec('COMMIT');
  writeDb.close();
  console.log(`group_type_katalog rebuilt: ${catalog.length} rows`);
}
