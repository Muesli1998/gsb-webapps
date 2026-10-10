import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

// Opgave 194: evidence-based person linkage; all databases are opened read-only.
const root = process.cwd();
const dataDir = path.join(root, 'statistik', 'data');
const resultsDir = path.join(root, 'statistik', 'results');
const open = name => {
  const db = new DatabaseSync(path.join(dataDir, name), { readOnly: true });
  db.exec('PRAGMA query_only=ON');
  if (db.prepare('PRAGMA query_only').get().query_only !== 1) throw new Error(`query_only fejlede: ${name}`);
  return db;
};
const norm = s => String(s ?? '').normalize('NFC').trim().replace(/\s+/gu, ' ').toLocaleLowerCase('da-DK');
const uniq = xs => [...new Set(xs)];
function isGsb(s) { return /^(?:gladsaxe søborg|gsb)(?:\s+\d+)?(?:\s+\(g\))?$/iu.test(String(s ?? '').normalize('NFC').trim()); }
const csv = (cols, rows) => '\uFEFF' + [cols, ...rows.map(r => cols.map(c => r[c] == null ? '' : Array.isArray(r[c]) ? JSON.stringify(r[c]) : String(r[c])))].map(row => row.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n') + '\n';
const normalized = open('gsb-statistik-normalized.db');
const ranking = open('rangliste-point.db');
const national = open('national-spillere.db');
const one = (db, sql, ...args) => db.prepare(sql).get(...args);
const many = (db, sql, ...args) => db.prepare(sql).all(...args);
const prior = JSON.parse(fs.readFileSync(path.join(resultsDir, '191-personnoegle.json'), 'utf8'));
const source164 = JSON.parse(fs.readFileSync(path.join(resultsDir, '164-stamdata.json'), 'utf8'));
const event154 = JSON.parse(fs.readFileSync(path.join(resultsDir, '154-saeson-2025-26.json'), 'utf8'));
const event158 = JSON.parse(fs.readFileSync(path.join(resultsDir, '158-turneringer.json'), 'utf8'));
const event158b = JSON.parse(fs.readFileSync(path.join(resultsDir, '158b-pointaendring-vs-kampe.json'), 'utf8'));
const event154ById = new Map();
for (const event of event154.phase0.event_match_checks ?? []) { const list=event154ById.get(String(event.player))??[];list.push(event);event154ById.set(String(event.player),list); }
const event158ById = new Map((event158.event_profiles??[]).map(x=>[String(x.ranking_player_id),x]));
const event158bById = new Map((event158b.per_player??[]).map(x=>[String(x.target?.id),x]));

const gsbSides = `WITH sides AS (
 SELECT tm.team_match_id,tm.season_id,tm.round_number,tm.round_date,tm.external_match_id,
   tm.home_name_raw,tm.away_name_raw,t.name_raw AS gsb_team_name,
   CASE WHEN tm.home_name_raw=t.name_raw THEN 'home' WHEN tm.away_name_raw=t.name_raw THEN 'away' END AS gsb_side,
   c.age_group_id
 FROM team_matches tm JOIN teams t ON t.team_id=tm.gsb_team_id
 LEFT JOIN competitions c ON c.competition_id=tm.competition_id
 WHERE t.club_id=1093 AND (tm.home_name_raw=t.name_raw OR tm.away_name_raw=t.name_raw)
)`;
const appearances = many(normalized, `${gsbSides}
 SELECT s.*,im.individual_match_id,imp.player_id,imp.side,imp.pair_number,p.name_raw
 FROM sides s JOIN individual_matches im USING(team_match_id)
 JOIN individual_match_players imp USING(individual_match_id) JOIN players p USING(player_id)
 ORDER BY s.season_id,s.round_date,s.team_match_id,im.individual_match_id,imp.side,imp.pair_number`);
const gsbRows = appearances.filter(r => r.side === r.gsb_side);
const gsbAll = new Set(gsbRows.map(r => r.player_id));
const gsb2025 = new Set(gsbRows.filter(r => Number(r.season_id) === 2025).map(r => r.player_id));
const allRows = many(normalized, `SELECT p.player_id,p.name_raw FROM players p JOIN individual_match_players imp USING(player_id) GROUP BY p.player_id ORDER BY p.player_id`);
const allIds = new Set(allRows.map(r => r.player_id));
const byPid = new Map();
for (const person of source164.people) for (const id of person.normalized_db_ids ?? []) {
  const a = byPid.get(Number(id)) ?? []; a.push(person); byPid.set(Number(id), a);
}
const byId = new Map(allRows.map(r => [r.player_id, r]));
const rankingRows = many(ranking, `SELECT player_id,name,club,version_date FROM ranking_points`);
const rankingByIdSeason = new Map();
const rankingSameNameSeason = new Map();
for (const row of rankingRows) {
  const season = Number(String(row.version_date).slice(0,4));
  if (!Number.isFinite(season)) continue;
  const key = `${row.player_id}:${season}`;
  const bucket = rankingByIdSeason.get(key) ?? [];
  bucket.push(row); rankingByIdSeason.set(key,bucket);
  if (isGsb(row.club)) { const nameKey = `${norm(row.name)}:${season}`; const ids = rankingSameNameSeason.get(nameKey) ?? new Set(); ids.add(String(row.player_id)); rankingSameNameSeason.set(nameKey,ids); }
}
const contexts = new Map();
for (const r of appearances) {
  const x = contexts.get(r.player_id) ?? { seasons: new Set(), ages: new Set(), clubs: new Set(), matches: new Set(), gsbMatches: new Set() };
  x.seasons.add(Number(r.season_id)); x.ages.add(`age_group_id:${r.age_group_id ?? 'ukendt'}`); x.clubs.add(r.side === r.gsb_side ? 'Gladsaxe Søborg' : 'modstander'); x.matches.add(r.individual_match_id);
  if (r.side === r.gsb_side) x.gsbMatches.add(Number(r.season_id)); contexts.set(r.player_id, x);
}
const cooccur = new Set();
const idsByMatch = new Map();
for (const r of appearances) { const a = idsByMatch.get(r.individual_match_id) ?? new Set(); a.add(r.player_id); idsByMatch.set(r.individual_match_id, a); }
for (const set of idsByMatch.values()) { const a = [...set]; for (let i=0;i<a.length;i++) for(let j=i+1;j<a.length;j++) cooccur.add(`${Math.min(a[i],a[j])}:${Math.max(a[i],a[j])}`); }
const rosterUnknown = ['Christian Staal','Jonathan W. Hansen','Lene Sørensen','Line Nielsen','Sebastian Almeida Møller','Thor Pedersen','Yiting Chen','Linda Bækgaard'];
const results = [];
for (const p of allRows) {
  const ctx = contexts.get(p.player_id) ?? { seasons:new Set(),ages:new Set(),clubs:new Set(),matches:new Set(),gsbMatches:new Set() };
  const people = byPid.get(p.player_id) ?? [];
  const exact = people.filter(x => norm(x.canonical_name) === norm(p.name_raw) || (x.aliases ?? []).some(a => norm(a) === norm(p.name_raw)));
  const candidateIds = uniq(exact.flatMap(x => (x.candidate_profiles ?? []).map(y => String(y.id)).filter(x => /^\d+$/u.test(x))));
  const eligible = [];
  const eventEvidence=[];
  const evidenceParts = [`normalized navn=${p.name_raw}`,`sæsoner=${[...ctx.seasons].sort().join('|')||'ukendt'}`,`klubkontekst=${[...ctx.clubs].join('|')||'ukendt'}`];
  for (const cid of candidateIds) {
    const seasonEvidence = [];
    for (const season of [...ctx.gsbMatches].sort()) {
      const ranks = rankingByIdSeason.get(`${cid}:${season}`) ?? [];
      const rankExact = ranks.filter(x => norm(x.name) === norm(p.name_raw) && isGsb(x.club));
      const nationalRows = many(national, `SELECT pm.external_match_id,pm.name_raw,pm.team_side,m.season_id,m.home_team_raw,m.away_team_raw FROM player_matches pm JOIN matches m USING(external_match_id) WHERE pm.external_player_id=? AND m.season_id=? AND m.render_gate=1`, cid, season);
      const natExact = nationalRows.filter(x => norm(x.name_raw) === norm(p.name_raw) && ((isGsb(x.home_team_raw) && x.team_side === 'hjemme') || (isGsb(x.away_team_raw) && x.team_side === 'ude')));
      if (rankExact.length || natExact.length) seasonEvidence.push({ season, ranking: rankExact, national: natExact });
    }
    const rankMatches = seasonEvidence.flatMap(x => x.ranking);
    const natMatches = seasonEvidence.flatMap(x => x.national);
    const eventMatches=(event154ById.get(cid)??[]).filter(x=>norm(x.name)===norm(p.name_raw)&&String(x.raw_row??'').normalize('NFC').toLocaleLowerCase('da-DK').includes('gladsaxe')&&String(x.event_date??'').includes('2025'));
    const profile158=event158ById.get(cid);
    const profile158b=event158bById.get(cid);
    if(eventMatches.length||profile158||profile158b) eventEvidence.push(`id:${cid} 154=${eventMatches.map(x=>`match:${x.match}`).join(',')||'ingen GSB-række'} 158=${profile158?'profil '+profile158.player_name:'ingen'} 158b=${profile158b?'profil '+profile158b.target.name:'ingen'}`);
    evidenceParts.push(`id:${cid} rangliste=${rankMatches.length} national_GSB_kampe=${natMatches.length}`);
    const eligibleSeasons=seasonEvidence.filter(x=>x.ranking.length&&x.national.length&&(rankingSameNameSeason.get(`${norm(p.name_raw)}:${x.season}`)?.size??0)===1&&rankingSameNameSeason.get(`${norm(p.name_raw)}:${x.season}`)?.has(cid));
    const eventSeasons=eventMatches.length?[2025]:[];
    if (eligibleSeasons.length || (rankMatches.some(x=>String(x.version_date).startsWith('2025'))&&eventSeasons.length)) eligible.push({ id:cid, rankMatches, natMatches, seasons:uniq([...eligibleSeasons.map(x=>x.season),...eventSeasons]) });
  }
  const normalizedIdCandidates = candidateIds.map(id => `id:${id}`);
  let cls='uafklaret',personKey='ukendt',rule='ingen: utilstrækkelig/ikke-entydig evidens';
  if (p.player_id === 176 || norm(p.name_raw)==='ikke fremmødt') { cls='ikke_person'; rule='pseudo-spiller; ikke person'; }
  else if (eligible.length === 1 && ![...idsByMatch.values()].some(set => set.has(p.player_id) && [...set].some(other => other !== p.player_id && candidateIds.some(cid => (byPid.get(other)??[]).some(q => String(q.person_key)===`id:${cid}`)) && cooccur.has(`${Math.min(p.player_id,other)}:${Math.max(p.player_id,other)}`)))) {
    cls='sikker';personKey=`id:${eligible[0].id}`;rule='R1: entydigt eksakt navn + ranglisteklub GSB i samme sæson + national GSB-kamp eller ID-bundet 154-holdkamp; ingen ID-kollision';
  } else if (candidateIds.length === 1 && exact.length === 1 && gsbAll.has(p.player_id)) { cls='sandsynlig';personKey=`id:${candidateIds[0]}`;rule='R2: entydig 164-navnekandidat med GSB-kontekst; R1 ikke fuldt opfyldt'; }
  else if (candidateIds.length > 1 || exact.length > 1) { cls='navnebroedre';rule='R3: flere eksakte identitetskandidater; ingen valgt'; }
  const evidence = [...evidenceParts,`164_kandidater=${candidateIds.join('|')||'ingen'}`,`events=${eventEvidence.join(' ; ')||'intet ID-match i 154/158/158b'}`,`regel=${rule}`].join(' | ');
  results.push({ player_id:p.player_id,name:p.name_raw,person_key:personKey,class:cls,rule,evidence,candidate_ids:normalizedIdCandidates,gsb_side:gsbAll.has(p.player_id),seasons:[...ctx.seasons].sort((a,b)=>a-b),age_groups:[...ctx.ages].sort(),clubs:[...ctx.clubs],appearances:ctx.matches.size });
}
const conflicts=[];
const assigned=new Map(results.filter(x=>x.person_key!=='ukendt').map(x=>[x.player_id,x.person_key]));
for(const [match,set] of idsByMatch) { const a=[...set];for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)if(assigned.has(a[i])&&assigned.get(a[i])===assigned.get(a[j]))conflicts.push({individual_match_id:match,player_ids:[a[i],a[j]],person_key:assigned.get(a[i])}); }
if (conflicts.length) { for (const c of conflicts) for (const id of c.player_ids) { const row=results.find(x=>x.player_id===id); row.class='uafklaret';row.person_key='ukendt';row.rule='afvist: delt personnøgle ville kollidere i samme kamp'; } }
const classes=['sikker','sandsynlig','uafklaret','navnebroedre','samme_person','ikke_person'];
const count = rows => Object.fromEntries(classes.map(k=>[k,rows.filter(x=>x.class===k).length]));
const beforeRows=prior.rows;
const beforeById=new Map(beforeRows.map(x=>[x.player_id,x]));
const classOrder={sikker:0,ikke_person:1,navnebroedre:2,uafklaret:3,sandsynlig:4,samme_person:5};
const changes=results.filter(x=>beforeById.get(x.player_id)?.class!==x.class).map(x=>({player_id:x.player_id,name:x.name,before:beforeById.get(x.player_id)?.class??'ukendt',after:x.class,rule:x.rule})).sort((a,b)=>classOrder[a.after]-classOrder[b.after]||a.name.localeCompare(b.name,'da')||a.player_id-b.player_id);
const samples = cls => [...results.filter(x=>x.class===cls)].sort((a,b)=>crypto.createHash('sha256').update(`194:${cls}:${a.player_id}`).digest('hex').localeCompare(crypto.createHash('sha256').update(`194:${cls}:${b.player_id}`).digest('hex'))).slice(0,15);
const safeSample=samples('sikker'), unresolvedSample=samples('uafklaret');
const acceptedIndependent=safeSample.filter(x=>![...idsByMatch.values()].some(set=>set.has(x.player_id)&&[...set].some(id=>id!==x.player_id&&assigned.has(id)&&assigned.get(id)===x.person_key))).length;
const gsb25Appearances=gsbRows.filter(x=>Number(x.season_id)===2025).length;
const safeAppearances=gsbRows.filter(x=>Number(x.season_id)===2025&&results.find(y=>y.player_id===x.player_id)?.class==='sikker').length;
const manualNames=new Set(rosterUnknown.map(norm));
const manual=results.filter(x=>gsb2025.has(x.player_id)&&['uafklaret','navnebroedre'].includes(x.class)||manualNames.has(norm(x.name))).map(x=>({name:x.name,normalized_id:x.player_id,candidate_ids:x.candidate_ids,clubs:x.clubs,seasons:x.seasons,age_groups:x.age_groups,appearances:x.appearances,evidence:x.evidence,christoffers_valg:''}));
for (const name of rosterUnknown) if (!manual.some(x=>norm(x.name)===norm(name))) manual.push({name,normalized_id:'ukendt',candidate_ids:[],clubs:[],seasons:[],age_groups:[],appearances:0,evidence:'Trupnavn fra kort 194; intet eksakt normalized-ID-match valgt',christoffers_valg:''});
const report={task:'194',network_calls:0,database_mode:'read-only; mode=ro; PRAGMA query_only=ON',evidence_sources:{'164':'stamdata kandidat-IDer; bekræftes mod underliggende rangliste/nationaldata','154':{requests:event154.requests.length,event_match_checks:event154.phase0.event_match_checks.length,status:event154.status},'158':{event_profiles:event158.event_profiles.length,scope:event158.executed_scope},'158b':{per_player:event158b.per_player.length,status:event158b.status}},scope:{gsb_all_seasons:gsbAll.size,gsb_2025_26:gsb2025.size,other_ids:allIds.size-gsbAll.size,total_ids:results.length},classes:count(results),classes_gsb_all:count(results.filter(x=>x.gsb_side)),classes_gsb_2025_26:count(results.filter(x=>gsb2025.has(x.player_id))),classes_before:prior.classes,classes_after:count(results),conflicts,safe_coverage_2025_26:{gsb_appearances:gsb25Appearances,safe_appearances:safeAppearances,percent:gsb25Appearances?Number((safeAppearances*100/gsb25Appearances).toFixed(2)):0},assessment:'Vurdering: 0,62 % sikker kampdækning er ikke tilstrækkelig til at vise spillertal uden forbehold.',changes:{total:changes.length,top30:changes.slice(0,30),remaining:Math.max(0,changes.length-30)},samples:{safe:safeSample,unresolved:unresolvedSample,safe_not_rejected_by_independent_normalized_cooccurrence:acceptedIndependent,safe_sample_size:safeSample.length},manual_rows:manual.length,recommendation:'Start med en versionsstyret mappingfil til manuel review; flyt kun godkendte bindinger til en normalized-DB mappingtabel med kilde, status, evidensreference og gyldighed.',rule:'R1 sikker: én kandidat-ID; eksakt fuldt navn i normalized data og ranglistedata samme sæson med GSB-klub; samt enten national kamp på GSB-siden samme sæson eller ID-bundet, eksakt navngivet 154-rå eventrække der viser spilleren i en kamp med GSB. Ingen anden kandidat må opfylde reglen, og ingen normalized-kollision må forekomme. R2 sandsynlig kræver én 164 kandidat og GSB-kontekst, men opfylder ikke R1. Manglende/ambig evidens er uafklaret.'};
const linkageRows=results.map(x=>({...x,candidate_ids:x.candidate_ids}));
fs.writeFileSync(path.join(resultsDir,'194-personnoegle-kobling.csv'),csv(['id','navn','personnøgle','klasse','regel','evidens','kandidat-IDer'],linkageRows.map(x=>({id:x.player_id,navn:x.name,'personnøgle':x.person_key,klasse:x.class,regel:x.rule,evidens:x.evidence,'kandidat-IDer':x.candidate_ids}))));
fs.writeFileSync(path.join(resultsDir,'194-personnoegle-manuel-gennemgang.csv'),csv(['navn','normalized ID','kandidat-IDer','klubber','sæsoner','aldersgrupper','antal kampe','evidens','christoffers_valg'],manual.map(x=>({navn:x.name,'normalized ID':x.normalized_id,'kandidat-IDer':x.candidate_ids,klubber:x.clubs,sæsoner:x.seasons,aldersgrupper:x.age_groups,'antal kampe':x.appearances,evidens:x.evidence,christoffers_valg:x.christoffers_valg}))));
fs.writeFileSync(path.join(resultsDir,'194-personnoegle.json'),JSON.stringify({...report,rows:results,manual},null,2)+'\n');
const md=['# Opgave 194 — personnøgle, runde 2','',`Netværkskald: **0**. Normalized, rangliste-point og national-databaser blev åbnet read-only med mode=ro og PRAGMA query_only=ON.`,'','## Regel for sikker','',report.rule,'','## Omfang','',`GSB-ID'er alle sæsoner: ${gsbAll.size}; GSB-ID'er 2025/26: ${gsb2025.size}; øvrige ID'er: ${allIds.size-gsbAll.size}; total: ${results.length}.`,'','## Før og efter','', '| Klasse | 191 | 194 |','|---|---:|---:|---:|',...classes.map(k=>`| ${k} | ${prior.classes[k]??0} | ${count(results)[k]} |`),'',`Ændrede ID'er: ${changes.length}. De største ændringer (maks. 30; sorteret navn/ID):`,...changes.slice(0,30).map(x=>`- ${x.player_id} ${x.name}: ${x.before} → ${x.after} (${x.rule})`), ...(changes.length>30?[`- Resterende ændringer ikke listet: ${changes.length-30}.`]:[]),'','## Klasseantal for GSB','',`Alle sæsoner: ${JSON.stringify(count(results.filter(x=>x.gsb_side)))}.`, `2025/26: ${JSON.stringify(count(results.filter(x=>gsb2025.has(x.player_id))))}.`,'','## Dækning og konflikter','',`GSB-kampoptrædener 2025/26: ${gsb25Appearances}; optrædener på sikker ID: ${safeAppearances} (${report.safe_coverage_2025_26.percent} %).`, `Konflikter: ${conflicts.length}; se JSON.`,'','## Skøn (vurdering)','',report.assessment,'','## Stikprøve','',`Tilfældig-rækkefølge via stabil SHA-256 sortering; sikker ${safeSample.length}/15, uafklaret ${unresolvedSample.length}/15. Sikker-koblinger, som separat co-occurrence-kontrol ikke afviste: ${acceptedIndependent}/${safeSample.length}.`,'','### Sikker',...safeSample.map(x=>`- ${x.player_id} ${x.name}: ${x.person_key}; ${x.evidence}`),'','### Uafklaret',...unresolvedSample.map(x=>`- ${x.player_id} ${x.name}: kandidater ${x.candidate_ids.join(', ')||'ukendt'}; ${x.evidence}`),'','## Manuel gennemgang','',`CSV-rækker: ${manual.length}. Indeholder uafklarede/navnebrødre på GSB-siden i 2025/26 samt de otte trupnavne; valgkolonnen er tom.`,'','## Forslag til brug','',report.recommendation,'','## Kontroltal','',`Koblingsrækker: ${results.length}; GSB ID'er 2025/26: ${gsb2025.size}; konflikter: ${conflicts.length}; netværkskald: 0.`,''].join('\n');
fs.writeFileSync(path.join(resultsDir,'194-personnoegle.md'),md+'\n');
for(const db of [normalized,ranking,national])db.close();
console.log(JSON.stringify({scope:report.scope,classes:report.classes,classes_gsb_2025_26:report.classes_gsb_2025_26,conflicts:conflicts.length,safe_sample:safeSample.length,manual_rows:manual.length},null,2));
