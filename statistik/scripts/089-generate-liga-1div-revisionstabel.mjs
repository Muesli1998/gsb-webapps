import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('file:C:/Users/chril/Code/gsb-webapps/statistik/data/liga-landskab.db?immutable=1', { readOnly: true });
const all=(sql,...params)=>db.prepare(sql).all(...params);
const norm=s=>String(s??'').toLowerCase().replace(/\s+/g,' ').replace(/\s*\([^)]*\)\s*$/,'').trim();
const seasons=all(`SELECT DISTINCT season_id FROM league_groups WHERE age_group_id=1 ORDER BY season_id`).map(r=>r.season_id);
const groups=all(`SELECT g.season_id,g.age_group_id,g.league_group_id,g.division_name_raw,g.group_name_raw, COALESCE(k.group_type,'andet/ukendt') group_type
 FROM league_groups g LEFT JOIN group_type_katalog k ON k.division_name_raw=COALESCE(g.division_name_raw,'') AND k.group_name_raw=COALESCE(g.group_name_raw,'')
 WHERE g.age_group_id=1`);
const teams=all(`SELECT season_id,age_group_id,league_group_id,team_name_raw,standing_position,matches,wins,score_raw,sets_raw,points FROM league_group_teams WHERE age_group_id=1`);
const matches=all(`SELECT external_match_id,season_id,age_group_id,league_group_id,match_date,home_name_raw,away_name_raw,team_score_raw FROM league_matches WHERE age_group_id=1`);
const alg=JSON.parse(fs.readFileSync('statistik/results/087-holdidentitet-paa-tvaers-af-saesoner.json','utf8')).rows;

const gBySeason=new Map(); for(const g of groups){if(!gBySeason.has(g.season_id))gBySeason.set(g.season_id,[]);gBySeason.get(g.season_id).push(g)};
const tByGroup=new Map(); for(const t of teams){const k=`${t.season_id}|${t.league_group_id}`;if(!tByGroup.has(k))tByGroup.set(k,[]);tByGroup.get(k).push(t)};
const mByGroup=new Map(); for(const m of matches){const k=`${m.season_id}|${m.league_group_id}`;if(!mByGroup.has(k))mByGroup.set(k,[]);mByGroup.get(k).push(m)};
const knownTeamNamesBySeason=new Map();
for(const t of teams){
 if(!knownTeamNamesBySeason.has(t.season_id)) knownTeamNamesBySeason.set(t.season_id,new Set());
 knownTeamNamesBySeason.get(t.season_id).add(t.team_name_raw);
}
const sourceTypes=(g)=>`${g.division_name_raw} ${g.group_name_raw}`.toLowerCase();
function pickGroups(season){
 const s=gBySeason.get(season)??[];
 const liga=s.filter(g=>norm(g.division_name_raw)==='badmintonligaen' && (norm(g.group_name_raw)==='grundspil' || norm(g.group_name_raw)==='badmintonligaen'));
 const oneQual=s.filter(g=>/ligakvalifikation|kvalifikation.*badmintonliga|kvalifikation.*ligaen/.test(sourceTypes(g)) && !(/kvalifikationskamp/.test(sourceTypes(g)) && /badmintonligaen/.test(norm(g.division_name_raw))));
 const oneDown=s.filter(g=>/1\. division/.test(norm(g.division_name_raw)) && (g.group_type==='nedrykningsspil' || /nedrykning/.test(sourceTypes(g))));
 const twoUp=s.filter(g=>{
  const division=norm(g.division_name_raw), type=sourceTypes(g), group=norm(g.group_name_raw);
  const isTwoDivisionQualification=/2\. division/.test(division) && /kvalifikation.*1\. div|kval\.\s*til 1\. div/.test(type);
  const isDedicatedQualification=/kval(?:ifikation|\.)\s*til\s*1\.\s*division/.test(division) && /slutspil|kval(?:ifikation|\.)/.test(group);
  return (isTwoDivisionQualification||isDedicatedQualification) && !/kvalifikationsevent kamp/.test(type);
 });
 const ligaQual=s.filter(g=>norm(g.division_name_raw)==='badmintonligaen' && /kvalifikation/.test(sourceTypes(g)));
 return {liga,oneQual,oneDown,twoUp,ligaQual};
}
function nextLevel(season,name){
 const n=norm(name), next=gBySeason.get(season+1)??[];
 const matches=next.filter(g=>(tByGroup.get(`${g.season_id}|${g.league_group_id}`)??[]).some(t=>norm(t.team_name_raw)===n));
 const levels=new Set(matches.map(g=>{
  const d=norm(g.division_name_raw); if(d.includes('badmintonligaen'))return 'Ligaen'; if(d.includes('1. division'))return '1. division'; if(d.includes('2. division'))return '2. division'; return null;
 }).filter(Boolean));
 return levels.size===1?[...levels][0]:'ikke fundet';
}
function algorithmLevel(season,level,name){
 const r=alg.find(x=>x.seasonFrom===season && x.level===level && norm(x.rawCurrent)===norm(name));
 if(!r) return 'ikke fundet';
 const found=['methodA','methodB','methodC'].filter(k=>r[k]?.found);
 return found.length?`${r.confidence}: ${found.join('+')}`:'ikke fundet';
}
function eventFor(kind,pos){
 if(kind==='liga') return pos===10?'automatisk nedrykning':pos===9?'kvalifikationskamp mod 1.divisions nr. 2':(pos===7||pos===8?'forbliver i Ligaen (nr. 7-8)':'Liga-grundspil');
 if(kind==='oneQual') return '1. divisions kvalifikationsgruppe mod Ligaen';
 if(kind==='oneDown') return '1. divisions nedrykningsspil mod 2. division';
 return '2. divisions oprykningsspil/kvalifikation mod 1. division';
}
function sourceTeamName(season,raw){
 const rawNorm=norm(raw);
 const candidates=[...(knownTeamNamesBySeason.get(season)??[])].sort((a,b)=>b.length-a.length);
 return candidates.find(candidate=>rawNorm.startsWith(norm(candidate)))??'';
}
function qualFor(season,name,kind){
 const s=gBySeason.get(season)??[];
 const candidateGroups=kind==='liga'?s.filter(g=>norm(g.division_name_raw)==='badmintonligaen'&&/kvalifikation/.test(sourceTypes(g))):[];
 for(const g of candidateGroups){ const ms=mByGroup.get(`${season}|${g.league_group_id}`)??[]; for(const m of ms){ const h=sourceTeamName(season,m.home_name_raw),a=sourceTeamName(season,m.away_name_raw);if(norm(h)===norm(name)||norm(a)===norm(name)) return {opponent:norm(h)===norm(name)?a:h,result:m.team_score_raw||'',match_id:m.external_match_id}; }}
 return {opponent:'',result:'',match_id:''};
}
const rows=[]; const omitted=[];
for(const season of seasons){
 const selected=pickGroups(season);
 for(const [kind,gs] of Object.entries(selected)){
  if(kind==='ligaQual') continue;
  if(gs.length!==1){ omitted.push({season,kind,count:gs.length,groups:gs.map(g=>({id:g.league_group_id,division:g.division_name_raw,group:g.group_name_raw,type:g.group_type}))}); continue; }
  const g=gs[0]; const level=kind==='liga'?'Ligaen':kind.startsWith('one')?'1. division':'2. division';
  for(const t of (tByGroup.get(`${season}|${g.league_group_id}`)??[]).sort((a,b)=>(a.standing_position??99)-(b.standing_position??99))){
   const q=kind==='liga'&&t.standing_position===9?qualFor(season,t.team_name_raw,kind):{opponent:'',result:'',match_id:''};
   rows.push({'sæson':`${season}/${season+1}`,'hold':t.team_name_raw,'niveau_denne_sæson':level,'placering':t.standing_position??'ikke fundet','hændelse':eventFor(kind,t.standing_position),'kval_modstander':q.opponent,'kval_resultat':q.result,'niveau_næste_sæson_algoritme':algorithmLevel(season,level,t.team_name_raw),'niveau_næste_sæson_faktisk':nextLevel(season,t.team_name_raw),'christoffer_bekræftet':'','source_league_group_id':g.league_group_id,'source_group_name_raw':g.group_name_raw,'source_group_type':g.group_type,'source_match_id':q.match_id});
  }
 }
}
const cols=['sæson','hold','niveau_denne_sæson','placering','hændelse','kval_modstander','kval_resultat','niveau_næste_sæson_algoritme','niveau_næste_sæson_faktisk','christoffer_bekræftet','source_league_group_id','source_group_name_raw','source_group_type','source_match_id'];
const csvValue=v=>`"${String(v??'').replaceAll('"','""')}"`;
fs.writeFileSync('statistik/results/089-liga-1div-revisionstabel.csv',[cols.map(csvValue).join(','),...rows.map(r=>cols.map(c=>csvValue(r[c])).join(','))].join('\n')+'\n');
fs.writeFileSync('statistik/results/089-liga-1div-revisionstabel.json',JSON.stringify({generated_at:new Date().toISOString(),columns:cols,rows,omitted_season_structures:omitted,selection_method:'Groups are selected from group_type_katalog plus explicit level/structure labels documented in 086b; ambiguous or absent structures are omitted rather than inferred.'},null,2));
console.log(JSON.stringify({seasons,rows:rows.length,omitted,byLevel:Object.fromEntries(['Ligaen','1. division','2. division'].map(l=>[l,rows.filter(r=>r.niveau_denne_sæson===l).length]))},null,2));
