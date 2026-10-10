import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

// Opgave 191: read-only extract and conservative candidate linkage.
const root = process.cwd();
const dataDir = path.join(root, 'statistik', 'data');
const resultsDir = path.join(root, 'statistik', 'results');
const db = new DatabaseSync(path.join(dataDir, 'gsb-statistik-normalized.db'), { readOnly: true });
db.exec('PRAGMA query_only = ON');
if (db.prepare('PRAGMA query_only').get().query_only !== 1) throw new Error('PRAGMA query_only kunne ikke aktiveres');
const one = (sql, ...args) => db.prepare(sql).get(...args);
const many = (sql, ...args) => db.prepare(sql).all(...args);
const norm = (s) => String(s ?? '').normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('da-DK');
const uniq = (xs) => [...new Set(xs)];
const json = JSON.parse(fs.readFileSync(path.join(resultsDir, '164-stamdata.json'), 'utf8'));
const people = json.people;
const byPlayerId = new Map();
for (const person of people) {
  for (const id of person.normalized_db_ids ?? []) {
    const links = byPlayerId.get(Number(id)) ?? [];
    links.push(person);
    byPlayerId.set(Number(id), links);
  }
}

// GSB side follows card 187: team club_id and exact team-name match to side.
const gsbSides = `WITH sides AS (
 SELECT tm.team_match_id, tm.season_id, tm.round_number, tm.round_date, tm.external_match_id,
   tm.home_name_raw, tm.away_name_raw, t.name_raw AS gsb_team_name,
   CASE WHEN tm.home_name_raw=t.name_raw THEN 'home' WHEN tm.away_name_raw=t.name_raw THEN 'away' END AS gsb_side,
   c.age_group_id, ('age_group_id:' || COALESCE(c.age_group_id,'ukendt')) AS age_group
 FROM team_matches tm JOIN teams t ON t.team_id=tm.gsb_team_id
 LEFT JOIN competitions c ON c.competition_id=tm.competition_id
 WHERE t.club_id=1093 AND (tm.home_name_raw=t.name_raw OR tm.away_name_raw=t.name_raw)
)`;
const allAppearances = many(`${gsbSides}
 SELECT s.*, im.individual_match_id, imp.player_id, imp.side, imp.pair_number, p.name_raw, p.external_player_id
 FROM sides s JOIN individual_matches im USING(team_match_id)
 JOIN individual_match_players imp USING(individual_match_id)
 JOIN players p USING(player_id) ORDER BY s.season_id,s.round_date,s.team_match_id,im.individual_match_id,imp.side,imp.pair_number`);
const gsbRows = allAppearances.filter(r => r.side === r.gsb_side);
const gsbIds = new Set(gsbRows.map(r => r.player_id));
const allIds = new Set(allAppearances.map(r => r.player_id));
const seasonsById = new Map(), agesById = new Map(), clubsById = new Map(), matchIdsById = new Map(), samplesById = new Map();
for (const r of allAppearances) {
  const add = (m, k, v) => { const s=m.get(k)??new Set(); if (v != null && v !== '') s.add(v); m.set(k,s); };
  add(seasonsById,r.player_id,r.season_id); add(agesById,r.player_id,r.age_group ?? `age_group_id:${r.age_group_id ?? 'ukendt'}`);
  add(clubsById,r.player_id,r.side===r.gsb_side?'Gladsaxe Søborg':'modstander'); add(matchIdsById,r.player_id,r.individual_match_id);
  if(!samplesById.has(r.player_id)) samplesById.set(r.player_id,{...r});
}
const ids = many(`SELECT p.player_id,p.name_raw,p.external_player_id FROM players p JOIN individual_match_players imp USING(player_id) GROUP BY p.player_id ORDER BY p.player_id`);

// Candidate-to-candidate collision evidence: distinct normalized IDs in one individual match.
const cooccurrence = new Map();
for (const r of allAppearances) {
  const s=cooccurrence.get(r.individual_match_id)??new Set(); s.add(r.player_id); cooccurrence.set(r.individual_match_id,s);
}
const conflictPairs = new Set();
for (const set of cooccurrence.values()) {
  const values=[...set];
  for(let i=0;i<values.length;i++) for(let j=i+1;j<values.length;j++) conflictPairs.add(`${Math.min(values[i],values[j])}:${Math.max(values[i],values[j])}`);
}

const output = [];
for (const p of ids) {
  const candidatePeople = byPlayerId.get(p.player_id) ?? [];
  const candidateIds = uniq(candidatePeople.map(x=>x.person_key).filter(Boolean));
  const nameExact = candidatePeople.filter(x => norm(x.canonical_name)===norm(p.name_raw) || (x.aliases??[]).some(a=>norm(a)===norm(p.name_raw)));
  const chosenCandidates = uniq(nameExact.map(x=>x.person_key));
  const numericChosenCandidates = chosenCandidates.filter(key=>/^id:\d+$/u.test(key));
  const candidateDetails = nameExact.flatMap(person => (person.candidate_profiles??[])
    .filter(profile => person.person_key===`id:${profile.id}`)
    .map(profile => ({id:profile.id,name:profile.names?.join('; ')||person.canonical_name,ranking_clubs:profile.ranking_clubs??[],gsb_match_seasons:profile.gsb_match_seasons??[],age_groups:person.age_groups??[],national_player_id:person.national_player_id??'ukendt',gender:person.gender??'ukendt',ranking_observations:profile.ranking_observations??[],link_status:'164 markerer normalized-ID-forbindelsen uafklaret'})));
  const evidence = [];
  if (gsbIds.has(p.player_id)) evidence.push('GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187)');
  else evidence.push('GSB-side: nej; ID forekommer kun uden for GSB-siden');
  evidence.push(`normaliseret navn: ${p.name_raw}`);
  evidence.push(`sæsoner: ${[...(seasonsById.get(p.player_id)??[])].sort().join(', ')||'ukendt'}`);
  evidence.push(`aldersgrupper: ${[...(agesById.get(p.player_id)??[])].sort().join(', ')||'ukendt'}`);
  evidence.push(`klubkontekst: ${[...(clubsById.get(p.player_id)??[])].join(', ')||'ukendt'}`);
  if(candidateIds.length) evidence.push(`164 normalized_db_ids kandidat(er): ${candidateIds.join(', ')}; 164 angiver navn+klub-koblinger som uafklarede kandidater`);
  else evidence.push('164: ingen normalized_db_ids-kandidat');
  const hasConflictingCandidates = numericChosenCandidates.some(key => {
    const siblingIds = ids.filter(other => other.player_id!==p.player_id && (byPlayerId.get(other.player_id)??[]).some(person=>person.person_key===key)).map(x=>x.player_id);
    return siblingIds.some(id=>conflictPairs.has(`${Math.min(id,p.player_id)}:${Math.max(id,p.player_id)}`));
  });
  let klass='uafklaret', personKey='ukendt';
  if (numericChosenCandidates.length===1 && !hasConflictingCandidates) {
    // 164 explicitly leaves its normalized ID -> profile mapping unconfirmed.
    klass='sandsynlig'; personKey=chosenCandidates[0];
    evidence.push('klassegrundlag: ét eksakt navnekandidat-ID med GSB-side/klub- og sæsonkontekst; 164-forbindelsen er fortsat kandidat, derfor sandsynlig');
  } else if (numericChosenCandidates.length>1) {
    klass='uafklaret'; evidence.push('klassegrundlag: flere mulige person-IDer; ingen valgt');
  } else if (hasConflictingCandidates) {
    klass='uafklaret'; evidence.push('klassegrundlag: kandidat-ID har kolliderende normalized ID i samme individuelle kamp; ingen valgt');
  } else if (chosenCandidates.some(key=>key.startsWith('name:'))) {
    evidence.push('klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt');
  } else if (candidateIds.length>0) {
    evidence.push('klassegrundlag: 164-kandidaternes navn matcher ikke entydigt normalized navn; ingen valgt');
  } else evidence.push('klassegrundlag: ingen person-ID-kandidat; ingen valgt');
  const pkey=klass==='sandsynlig'?personKey:null;
  output.push({player_id:p.player_id,name:p.name_raw,person_key:pkey??'ukendt',class:klass,evidence:evidence.join(' | '),candidate_ids:chosenCandidates.length?chosenCandidates:candidateIds,candidate_details:candidateDetails,gsb_side:gsbIds.has(p.player_id),seasons:[...(seasonsById.get(p.player_id)??[])].sort(),age_groups:[...(agesById.get(p.player_id)??[])].sort(),clubs:[...(clubsById.get(p.player_id)??[])],appearances:(matchIdsById.get(p.player_id)??new Set()).size});
}

// Conflict check on assigned person keys, across all appearances in the same individual match.
const assigned = new Map(output.filter(x=>x.person_key!=='ukendt').map(x=>[x.player_id,x.person_key]));
const conflictList=[];
for(const [match,set] of cooccurrence){const idsHere=[...set];for(let i=0;i<idsHere.length;i++)for(let j=i+1;j<idsHere.length;j++){
 const a=idsHere[i],b=idsHere[j]; if(assigned.has(a)&&assigned.get(a)===assigned.get(b)) conflictList.push({individual_match_id:match,player_ids:[a,b],person_key:assigned.get(a)});
}}
const rosterNames=people.filter(x=>x.active?.['2026/27']?.roster_member==='ja').map(x=>x.canonical_name);
const statedUnknown=['Christian Staal','Jonathan W. Hansen','Lene Sørensen','Line Nielsen','Sebastian Almeida Møller','Thor Pedersen','Yiting Chen'];
const roster=rosterNames.map(name=>{
 const matching=output.filter(x=>norm(x.name)===norm(name));
 const known=people.find(x=>norm(x.canonical_name)===norm(name));
 const unresolved=statedUnknown.includes(name)||name==='Linda Bækgaard';
 return {name,class:unresolved?'uafklaret':matching.length===1?matching[0].class:'uafklaret',person_key:unresolved?'ukendt':matching.length===1?matching[0].person_key:'ukendt',normalized_player_ids:matching.map(x=>x.player_id),candidates:matching.flatMap(x=>x.candidate_ids),clubs:uniq(matching.flatMap(x=>x.clubs)),seasons:uniq(matching.flatMap(x=>x.seasons)),age_groups:uniq(matching.flatMap(x=>x.age_groups)),evidence:unresolved?'Kort 164 markerer identiteten som uafklaret; intet valg foretaget':matching.map(x=>x.evidence).join(' || ')||'Ingen direkte kampdata med eksakt navn'};
});
const classes=Object.fromEntries(['sikker','sandsynlig','uafklaret','navnebroedre','samme_person'].map(k=>[k,output.filter(x=>x.class===k).length]));
const gsb2025=new Set(gsbRows.filter(x=>x.season_id===2025).map(x=>x.player_id));
const classesGsbAll=Object.fromEntries(['sikker','sandsynlig','uafklaret','navnebroedre','samme_person'].map(k=>[k,output.filter(x=>x.gsb_side&&x.class===k).length]));
const classesGsb2025=Object.fromEntries(['sikker','sandsynlig','uafklaret','navnebroedre','samme_person'].map(k=>[k,output.filter(x=>gsb2025.has(x.player_id)&&x.class===k).length]));
const gsbRows2025=gsbRows.filter(x=>x.season_id===2025);
const gsbAppearances=gsbRows.length, resolvedAppearances=gsbRows.filter(x=>assigned.has(x.player_id)).length;
const resolvedAppearances2025=gsbRows2025.filter(x=>assigned.has(x.player_id)).length;
const randomSample=(rows,n)=>[...rows].sort((a,b)=>crypto.createHash('sha256').update(`191-review-sample:${a.player_id}`).digest('hex').localeCompare(crypto.createHash('sha256').update(`191-review-sample:${b.player_id}`).digest('hex'))).slice(0,n);
const report={task:'191',network_calls:0,databases:{normalized:'read-only; mode=ro; PRAGMA query_only=ON'},method:{side:'club_id=1093; exact team.name_raw match to home_name_raw/away_name_raw, as task 187',coverage:'all normalized player IDs occurring in individual match data; GSB-side IDs across all available seasons first, plus all other appearing IDs',identity:'164 normalized_db_ids plus exact normalized name/alias and GSB club/season/age-group context; unresolved 164 links remain candidates; name:-keys are never treated as person IDs',conflict_definition:'assigned personnøgle shared by distinct normalized IDs appearing in the same individual_match_id'},scope:{all_gsb_ids:gsbIds.size,gsb_ids_2025_26:gsb2025.size,all_other_ids:allIds.size-gsbIds.size,total_ids:output.length},classes,classes_gsb_all:classesGsbAll,classes_gsb_2025_26:classesGsb2025,conflicts:conflictList,roster,assessment:{gsb_appearances:gsbAppearances,appearances_linked_to_candidate:resolvedAppearances,coverage_percent:gsbAppearances?Number((resolvedAppearances*100/gsbAppearances).toFixed(2)):0,gsb_appearances_2025_26:gsbRows2025.length,appearances_linked_to_candidate_2025_26:resolvedAppearances2025,coverage_percent_2025_26:gsbRows2025.length?Number((resolvedAppearances2025*100/gsbRows2025.length).toFixed(2)):0,person_count_claim:'ukendt',assessment:'Koblingen er ikke tilstrækkelig til spillertal uden forbehold: sandsynlige koblinger bygger fortsat på navn/klub-kandidater, mens uafklarede IDs ikke tildeles person.'},sample:{safe:randomSample(output.filter(x=>x.class==='sikker'),10),unresolved_with_evidence:randomSample(output.filter(x=>x.class==='uafklaret'&&x.candidate_ids.length),10)},recommendation:'Foreslå en særskilt, versionsstyret mappingfil som review-kilde i første omgang. Senere kan godkendte bindinger indlæses i en normalized DB mappingtabel med source namespace, candidate/confirmed/rejected status, evidensreference, reviewed_by og validitet. Uafklarede rækker må aldrig tælles som personer.',troupe_count:roster.length};

const csv=(cols,rows)=>'\uFEFF'+[cols,...rows.map(r=>cols.map(c=>r[c]===undefined||r[c]===null?'ukendt':Array.isArray(r[c])?JSON.stringify(r[c]):String(r[c])))].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
fs.writeFileSync(path.join(resultsDir,'191-personnoegle-kobling.csv'),csv(['player_id','name','person_key','class','evidence','candidate_ids'],output));
fs.writeFileSync(path.join(resultsDir,'191-personnoegle-uafklaret.csv'),csv(['player_id','name','class','candidate_ids','candidate_details','clubs','seasons','age_groups','evidence'],output.filter(x=>['uafklaret','navnebroedre'].includes(x.class))));
fs.writeFileSync(path.join(resultsDir,'191-personnoegle.json'),JSON.stringify({...report,rows:output},null,2)+'\n');
const md=['# 191 — personnøgle for kampdata','',`Netværkskald: **0**. Normalized database åbnede read-only (mode=ro, PRAGMA query_only=ON).`,'',
'## Omfang','',`| Mængde | Player-ID’er |`,`|---|---:|`,`| GSB-side, alle sæsoner | ${gsbIds.size} |`,`| GSB-side, 2025/26 | ${gsb2025.size} |`,`| Andre ID’er i kampdata | ${allIds.size-gsbIds.size} |`,`| Alle ID’er med kampdata | ${output.length} |`,'',
'## Klasser','',`| Klasse | Alle kampdata | GSB alle sæsoner | GSB 2025/26 |`,`|---|---:|---:|---:|`,...Object.keys(classes).map(k=>`| ${k} | ${classes[k]} | ${classesGsbAll[k]} | ${classesGsb2025[k]} |`),'',
'Klassifikationen er konservativ. Kort 164s normalized-ID-koblinger er udtrykkeligt kandidatkoblinger; de bliver ikke ophøjet til sikre på baggrund af navn alene. `sandsynlig` betyder her ét eksakt navnekandidat-ID med GSB-klub-/sæsonkontekst, men stadig uafklaret kildekobling. `sikker`, `samme_person` og `navnebroedre` er 0, når evidensen ikke kan afgøre det.','',
'## Konflikttjek','',`Tildelte personnøgler, som dækker to IDs i samme individuelle kamp: **${conflictList.length}**.`,...(conflictList.length?conflictList.map(x=>`- kamp ${x.individual_match_id}: IDs ${x.player_ids.join(', ')} → ${x.person_key}`):['Ingen konflikter.']),'',
'## Trup (44 navne)','',`Trupkilder: 164s 2026/27 roster-felt. Rækker markeret uafklaret følger 164 eller har ingen eksakt kampnavnematch.`, '', '| Navn | Klasse | Normalized ID | Kandidater | Klub | Sæson | Aldersgruppe |','|---|---|---|---|---|---|---|',...roster.map(x=>`| ${x.name} | ${x.class} | ${x.normalized_player_ids.join(', ')||'ukendt'} | ${x.candidates.join(', ')||'ukendt'} | ${x.clubs.join(', ')||'ukendt'} | ${x.seasons.join(', ')||'ukendt'} | ${x.age_groups.join(', ')||'ukendt'} |`),'',
'## Skøn (vurdering)','',`GSB-side kampoptrædener: ${gsbAppearances}; med sandsynlig personkandidat: ${resolvedAppearances} (${report.assessment.coverage_percent} %). I 2025/26 var ${gsbRows2025.length} optrædener, hvoraf ${resolvedAppearances2025} (${report.assessment.coverage_percent_2025_26} %) har en sandsynlig kandidat. Det er ikke en persondækning: kandidaterne fra 164 er ikke godkendte identiteter. Grundlaget er derfor ikke stort nok til spillertal uden forbehold.`, '',
'Stikprøve på 10 `sikker`-koblinger: **0 tilgængelige**, fordi ingen kobling opfylder den krævede uafhængige evidensstandard i dette udtræk. Stikprøve på uafklarede med evidens:', '',...report.sample.unresolved_with_evidence.map(x=>`- ${x.player_id} ${x.name}: kandidat ${x.candidate_ids.join(', ')||'ukendt'}; ${x.evidence}`),'',
'## Forslag til senere brug','',report.recommendation,'',
'## Kontroltal','',`Antal CSV-rækker i kobling: ${output.length}; antal GSB IDs 2025/26: ${gsb2025.size}; netværkskald: 0; konfliktantal: ${conflictList.length}.`,''];
fs.writeFileSync(path.join(resultsDir,'191-personnoegle.md'),md.join('\n')+'\n');
db.close();
console.log(JSON.stringify({scope:report.scope,classes,conflicts:conflictList.length,troupe:roster.length,network_calls:0},null,2));
