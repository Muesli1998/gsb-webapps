import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import {DatabaseSync} from 'node:sqlite';

const output='statistik/results/153-historisk-raekkevidde.json';
const markdown='statistik/results/153-historisk-raekkevidde.md';
const rawDir='statistik/results/153-raa-svar';
const source=fs.readFileSync('statistik/scripts/152-snapshot-hentning.mjs','utf8');
const prior=fs.readFileSync('statistik/scripts/151-pointlister.mjs','utf8');
const helpers=prior.slice(prior.indexOf('function decodeEntities('),prior.indexOf('async function request('));
const {parseRows,baseBody,versionList}=new Function(helpers+';return {parseRows,baseBody,versionList};')();
const expected=new Function(source.slice(source.indexOf('const expected ='),source.indexOf('const source151 ='))+'return expected;')();
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const iso=v=>{const m=String(v).match(/^(\d{2})\/(\d{2})\/(\d{4})$/u);return m?`${m[3]}-${m[1]}-${m[2]}`:null;};
const unwrap=t=>{let v=JSON.parse(t);for(let i=0;i<4;i++){if(v&&typeof v==='object'&&'d'in v)v=v.d;else if(typeof v==='string'){try{v=JSON.parse(v);}catch{break;}}else break;}return v;};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const state=process.argv.includes('--analyze')?JSON.parse(fs.readFileSync(output,'utf8')):{task:153,request_limit:35,requests:[],calendars:[],oldest_points:[],questions:[],status:'running'};
const persist=()=>fs.writeFileSync(output,JSON.stringify(state,null,2)+'\n');
const pageUrl='https://badmintonplayer.dk/DBF/Ranglister/';
const service='https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/';
// Reuse 152's transport, redaction, guards and rate limiter without executing
// its entry point or opening its writable database. Only the budget changes.
const transport=source.slice(source.indexOf('function guard('),source.indexOf('const body ='))
  .replaceAll('470','35');
const api=new Function('fs','path','zlib','hash','pause','state','persist','rawDir','pageUrl','service','unwrap','parseRows','baseBody',
  'let context=null,errors=0,lastStart=0;'+transport+';return {request,fresh,body:(season,list=288,changes={})=>baseBody(context,String(list),"M",{seasonid:String(season),rankinglistversiondate:"",getversions:true,...changes})};')
  (fs,path,zlib,hash,pause,state,persist,rawDir,pageUrl,service,unwrap,parseRows,baseBody);
async function hashes(){const out={};for(const name of [...Object.keys(expected),'rangliste-point.db']){const h=crypto.createHash('sha256');for await(const chunk of fs.createReadStream('statistik/data/'+name))h.update(chunk);out[name]=h.digest('hex').toUpperCase();}return out;}
function summarize(season,list,versions,entry){
  const dates=[...new Set(versions.map(v=>iso(v.value)).filter(Boolean))].sort();
  const weekdays=Object.fromEntries(['søndag','mandag','tirsdag','onsdag','torsdag','fredag','lørdag'].map(k=>[k,0]));
  for(const date of dates)weekdays[Object.keys(weekdays)[new Date(date+'T00:00:00Z').getUTCDay()]]++;
  const gaps={};for(let i=1;i<dates.length;i++){const d=(Date.parse(dates[i])-Date.parse(dates[i-1]))/86400000;gaps[d]=(gaps[d]??0)+1;}
  return{season,list,request:entry?.number??null,http_status:entry?.status??null,status:entry?.error?'error':versions.length?'versions':'empty',version_entries:versions.length,dated_entries:versions.filter(v=>iso(v.value)).length,unique_dates:dates.length,earliest:dates[0]??null,latest:dates.at(-1)??null,versions,dates,weekdays,gaps,max_gap:Math.max(0,...Object.keys(gaps).map(Number))};
}
async function calendar(season,list=288){const rec=await api.request('POST',service+'GetRankingListPlayers',api.body(season,list),`versions ${season} ${list} M`,1);const c=summarize(season,list,rec.data?versionList(rec.data):[],rec.entry);state.calendars.push(c);persist();return c;}
async function run(){
  await api.fresh(1);let empty=0,withVersions=0;
  for(const season of [2018,2017,2016,2015,2014,2013,2012]){
    const c=await calendar(season);empty=c.status==='empty'?empty+1:0;
    if(c.dated_entries&&withVersions<6){withVersions++;const v=c.versions.filter(v=>iso(v.value)).sort((a,b)=>iso(a.value).localeCompare(iso(b.value)))[0];
      const rec=await api.request('POST',service+'GetRankingListPlayers',api.body(season,288,{rankinglistversiondate:v.value,clubid:'1093'}),`GSB ældste ${season} ${v.value}`,1);
      const rows=rec.rows,classes={};for(const r of rows)classes[r.class??'tom']=(classes[r.class??'tom']??0)+1;
      const selected=rec.data?versionList(rec.data).filter(v=>v.selected):[];
      state.oldest_points.push({season,value:v.value,date:iso(v.value),request:rec.entry.number,http_status:rec.entry.status,error:rec.entry.error??null,rows:rows.length,with_points:rows.filter(r=>r.points!==null).length,with_ID:rows.filter(r=>r.player_id).length,classes,selected_versions:selected,version_binding_confirmed:selected.length>0&&selected.every(x=>x.value===v.value),players:rows});persist();
    }
    if(empty===2){state.backward_stop={reason:'to tomme sæsoner i træk',season};break;}
  }
  for(const season of [2023,2024])await calendar(season);
  for(const list of [289,292])await calendar(2025,list);
  state.status='complete';
}
function report(){
  state.questions=[];
  const old=unwrap(fs.readFileSync('statistik/results/150-raa-svar/14-q14-seasonid-2025-getversions.txt','utf8'));
  const reference=summarize(2025,288,versionList(old));
  state.reference_2025=reference;
  state.calendar_comparison=state.calendars.filter(c=>c.season===2025).map(c=>({list:c.list,common:c.dates.filter(d=>reference.dates.includes(d)).length,only_288:reference.dates.filter(d=>!c.dates.includes(d)),only_this_list:c.dates.filter(d=>!reference.dates.includes(d)),identical:JSON.stringify(reference.dates)===JSON.stringify(c.dates)}));
  const nat=new DatabaseSync('statistik/data/national-spillere.db',{readOnly:true});
  const clean=v=>String(v??'').normalize('NFKC').toLowerCase().trim().replace(/\s+/gu,' ');
  for(const p of state.oldest_points){
    const participants=nat.prepare('SELECT DISTINCT e.external_player_id,n.name_raw,m.external_match_id,m.age_group_id,m.home_team_raw,m.away_team_raw,e.team_side FROM player_match_extras e JOIN players n USING(external_player_id) JOIN matches m USING(external_match_id) WHERE m.season_id=? AND m.age_group_id IN(2,3,4,5,6,7,18)').all(p.season);
    p.youth_ID_evidence=p.players.filter(r=>r.points!==null&&r.player_id&&clean(r.club)==='gladsaxe søborg').map(r=>({ranking:r,matches:participants.filter(m=>m.external_player_id===r.player_id&&clean(m.name_raw)===clean(r.name)&&/^gladsaxe søborg\b/u.test(clean(m.team_side==='hjemme'?m.home_team_raw:m.team_side==='ude'?m.away_team_raw:'')))})).filter(e=>e.matches.length);
  }nat.close();
  const oldest=state.oldest_points.filter(p=>p.version_binding_confirmed&&p.youth_ID_evidence.length).sort((a,b)=>a.season-b.season)[0];
  state.oldest_proven_youth=oldest?{season:oldest.season,date:oldest.date,evidence:'ID, identisk navn og GSB-side i samme sæsons nationale ungdomskampe; klassefeltet alene viser ikke ungdom',matched_IDs:oldest.youth_ID_evidence.length,examples:oldest.youth_ID_evidence.slice(0,3)}:null;
  state.minimum_interval_ms=state.requests.length>1?Math.min(...state.requests.slice(1).map((r,i)=>Date.parse(r.started_at)-Date.parse(state.requests[i].started_at))):null;
  state.questions.push('Ingen dateret kalender er ikke bevis for, at ungdom historisk aldrig havde point. Før 2012 er ikke undersøgt. 2012–2017 mærkes ikke som bevist "ingen rangliste".');
  state.questions.push('2012–2017 har hver én udateret "Seneste"-post og nul ranglisterækker. Derfor er stopreglen med to helt tomme versionslister ikke udløst: alle syv sæsoner blev prøvet. Brug "ingen dateret rangliste fundet via denne rute", ikke historisk bevist fravær.');
  state.questions.push('Klasseetiketterne i 2018-prøven er SEN eller tomme. Ungdomsbeviset bruger derfor eksisterende kampdata på ID, navn, sæson og GSB-klubside, ikke navne-/aldersgæt.');
  if(!oldest)state.questions.push('Ældste ungdomssæson kunne ikke bevises ved GSB-prøven; gemte 151-fund fra 2019 er et separat eksisterende bevis.');
  const lines=['# 153 — historisk rækkevidde','',`Status: ${state.status}; ${state.requests.length}/35 kald. Kortets oprindelige budget: 25. Ingen bulkhentning eller databaseskrivning.`,'','## Versionslister','', '| Sæson-ID | Liste | HTTP / status | Poster / daterede | Ældste | Nyeste |','|---:|---:|---|---:|---|---|',...state.calendars.map(c=>`| ${c.season} | ${c.list} | ${c.http_status} / ${c.status} | ${c.version_entries}/${c.dated_entries} | ${c.earliest??'ingen'} | ${c.latest??'ingen'} |`),'','Stopregel: '+JSON.stringify(state.backward_stop??'ingen to tomme i træk'),'','## Pointprøver og tre ungdomseksempler','',JSON.stringify(state.oldest_points,null,2),'',JSON.stringify(state.oldest_proven_youth,null,2),'','## Kalenderfællesskab','',JSON.stringify({reference:reference.dated_entries,comparison:state.calendar_comparison},null,2),'','## Ugedage og huller','',JSON.stringify([...state.calendars,reference].map(({season,list,weekdays,gaps,max_gap})=>({season,list,weekdays,gaps,max_gap})),null,2),'','## Anbefaling og spørgsmål','',...(oldest?[`Ungdomspoint er konkret bevist på ${oldest.date} i sæson-ID ${oldest.season}. Dette er ældste positive prøve, ikke et bevis for starttidspunktet.`]:[]),...state.questions,'','## Værn','',JSON.stringify({before:state.hashes_before,after:state.hashes_after,unchanged:state.hashes_unchanged,readonly:true,minimum_interval_ms:state.minimum_interval_ms},null,2),'','## Forespørgselslog','',...state.requests.map(r=>JSON.stringify(r)),''];
  const failures=[];for(const r of state.requests){const bytes=zlib.gunzipSync(fs.readFileSync(r.saved_response));if(hash(bytes)!==r.saved_response_sha256)failures.push('råsvar '+r.number);if(r.status!==200)failures.push('HTTP '+r.number);}
  if(state.requests.length>35||state.minimum_interval_ms<2000||!state.hashes_unchanged)failures.push('værn');
  state.verification={raw_hashes_checked:state.requests.length,failures,passed:!failures.length};
  lines.push('','## Kort resumé','', 'Daterede kalendere: 2018/19 = 141, 2023/24 = 129, 2024/25 = 159. 2012–2017 har kun udateret Seneste og nul point-rækker i versionssvarene. 2018-listen indeholder også 2019-07-01; datoen bevares som faktisk returneret, ikke flyttet til en anden sæson.','', 'Mandag/onsdag/fredag dominerer, men versioner forekommer også på andre ugedage. Typiske huller er 2–3 dage. Maksimum: 2018 = 11, 2023 = 31, 2024 = 12, 2025 = 19 dage. En fast ugedagsregel kan ikke erstatte de faktiske kalendere.','', 'Før 2018/19 anbefales status "ingen dateret rangliste fundet via denne rute" med kilde og ukendt årsag, ikke opdigtede point og ikke et historisk bevis for at ranglisten ikke fandtes. Kalenderfællesskab er kun verificeret for 2025/26 M; andre sæsoner og K må ikke automatisk antages ens.','',JSON.stringify(state.verification,null,2),'');
  fs.writeFileSync(markdown,lines.join('\n'));persist();
}
if(!process.argv.includes('--run')&&!process.argv.includes('--analyze'))throw Error('Brug --run eller --analyze (offline)');
if(process.argv.includes('--run')&&fs.existsSync(output))throw Error('Eksisterende 153-kørsel: stop før nye kald');
state.hashes_before??=await hashes();
for(const [n,h]of Object.entries(expected))if(state.hashes_before[n]!==h)throw Error('STOP: databasehash '+n);
for(const n of Object.keys(state.hashes_before)){const db=new DatabaseSync('statistik/data/'+n,{readOnly:true});db.close();}
persist();
try{if(process.argv.includes('--run'))await run();}catch(e){state.status='stopped';state.stop_reason=e.message;state.questions.push(e.message);process.exitCode=1;}
finally{state.hashes_after=await hashes();state.hashes_unchanged=JSON.stringify(state.hashes_before)===JSON.stringify(state.hashes_after);if(!state.hashes_unchanged){state.questions.push('STOP: databasehash ændret');process.exitCode=1;}report();console.log(JSON.stringify({status:state.status,kald:state.requests.length,hashes:state.hashes_unchanged,oldest:state.oldest_proven_youth?.date??null}));}
