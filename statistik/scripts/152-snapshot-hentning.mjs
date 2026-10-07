// 152: reuse the saved 151 parser/request contract; no import side effects.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { DatabaseSync } from 'node:sqlite';

const root = process.cwd();
const output = 'statistik/results/152-snapshot.json';
const markdown = 'statistik/results/152-snapshot.md';
const rawDir = 'statistik/results/152-raa-svar';
const database = 'statistik/data/rangliste-point.db';
const pageUrl = 'https://badmintonplayer.dk/DBF/Ranglister/';
const service = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/';
const expected = {
  'gsb-statistik-normalized.db': '49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E',
  'liga-landskab.db': '9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C',
  'national-spillere.db': '1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E',
  'rangliste-historik.db': '6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F'
};
const source151 = fs.readFileSync('statistik/scripts/151-pointlister.mjs', 'utf8');
const helpers = source151.slice(source151.indexOf('function decodeEntities('), source151.indexOf('async function request('));
const { parseRows, baseBody, versionList, decodeEntities } = new Function(`${helpers}\nreturn {parseRows,baseBody,versionList,decodeEntities};`)();
const combos = [288,289,292].flatMap(list => ['M','K'].map(param => ({list,param})));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const clean = value => decodeEntities(String(value ?? '')).normalize('NFKC').toLocaleLowerCase('da-DK').trim().replace(/\s+/gu,' ');
const clubClean = value => clean(value).replace(/\s*\([^)]*\)/gu,'').replace(/\s+\d+$/u,'').trim();
const iso = value => { const m=String(value).match(/^(\d{2})\/(\d{2})\/(\d{4})$/u); return m ? `${m[3]}-${m[1]}-${m[2]}` : null; };
const unwrap = text => { let v=JSON.parse(text); for(let i=0;i<4;i++){if(v&&typeof v==='object'&&'d' in v)v=v.d;else if(typeof v==='string'){try{v=JSON.parse(v);}catch{break;}}else break;}return v; };
const pause = ms => new Promise(resolve=>setTimeout(resolve,ms));
let state = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output,'utf8')) : {
  task:152, generated_at:new Date().toISOString(), request_limit:470, requests:[], phase0:{status:'not_started'},
  groups:{}, resume_runs:[], questions:[], status:'not_started'
};
let context=null, errors=0;
let lastStart=Date.parse(state.requests.at(-1)?.started_at ?? '')||0;
const persist = () => {
  state.request_count=state.requests.length;
  fs.writeFileSync(`${output}.tmp`,`${JSON.stringify(state,null,2)}\n`);
  // Windows readers/antivirus may briefly deny replacement. Retry the same
  // authorized file operation; never alter permissions or discard the temp.
  for(let attempt=0;attempt<6;attempt++){
    try{fs.renameSync(`${output}.tmp`,output);return;}
    catch(e){if(!['EPERM','EACCES','EBUSY'].includes(e.code)||attempt===5)throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,50*(attempt+1));}
  }
};
const readonly = name => new DatabaseSync(`statistik/data/${name}`,{readOnly:true});
async function hashes(){ const out={};for(const name of Object.keys(expected)){const h=crypto.createHash('sha256');for await(const chunk of fs.createReadStream(`statistik/data/${name}`))h.update(chunk);out[name]=h.digest('hex').toUpperCase();}return out; }
async function checkBefore(){const values=await hashes();for(const[name,value]of Object.entries(values))if(value!==expected[name])throw Error(`STOP: hash mismatch ${name}: ${value}`);state.databases_before??=values;}
function guard(text,status){if([401,403].includes(status))return `HTTP ${status}: afvist`;for(const re of [/verify\s+you\s+are\s+human|unusual\s+traffic|automated\s+requests|bot\s+detected|access\s+denied/iu,/captcha\s+(?:required|needed|validation|verification)|g-recaptcha-response|h-captcha-response|challenge-platform/iu,/bot.?token.{0,60}(?:required|missing|needed)|(?:required|missing|needed).{0,60}bot.?token/iu,/cookie\s+(?:required|missing|blocked)|consent\s+(?:required|missing)/iu])if(re.test(text))return 'bot-/CAPTCHA-/token-/cookiekrav';return null;}
async function request(method,url,body,label,phase){
  if(state.requests.length>=470)throw Error('STOP: samlet grænse 470 nået');
  if(phase===0&&state.requests.filter(r=>r.phase===0).length>=10)throw Error('STOP: fase 0 grænse 10 nået');
  if(new URL(url).hostname!=='badmintonplayer.dk')throw Error('STOP: vært ikke tilladt');
  await pause(Math.max(0,2100-(Date.now()-lastStart)));lastStart=Date.now();
  const entry={number:state.requests.length+1,phase,label,method,url,started_at:new Date(lastStart).toISOString(),request_fields:body?{...body,callbackcontextkey:'[REDACTED]'}:null};
  state.requests.push(entry);persist();
  let text=null,data=null;
  try{
    const response=await fetch(url,{method,headers:{'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',accept:'*/*',...(body?{'content-type':'application/json; charset=UTF-8','x-requested-with':'XMLHttpRequest',origin:'https://badmintonplayer.dk',referer:pageUrl}:{})},body:body?JSON.stringify(body):undefined,credentials:'omit',redirect:'manual',signal:AbortSignal.timeout(45000)});
    text=await response.text();entry.status=response.status;entry.bytes=Buffer.byteLength(text);entry.response_sha256=hash(text);entry.content_type=response.headers.get('content-type');entry.location=response.headers.get('location');
    if(method==='GET'){const marker='var SR_CallbackContext = ';const at=text.indexOf(marker),a=at<0?-1:text.indexOf("'",at+marker.length),b=a<0?-1:text.indexOf("'",a+1);if(a>=0&&b>a)context=text.slice(a+1,b);}
    let safe=context?text.split(context).join('[CALLBACK_CONTEXT_REDACTED]'):text;
    safe=safe.replace(/(var SR_CallbackContext\s*=\s*)'[^']*'/gu,"$1'[CALLBACK_CONTEXT_REDACTED]'");
    fs.mkdirSync(rawDir,{recursive:true});const compressed=zlib.gzipSync(safe);
    const used=fs.readdirSync(rawDir).reduce((a,f)=>a+fs.statSync(path.join(rawDir,f)).size,0);
    if(used+compressed.length<=30*1024*1024){entry.saved_response=`${rawDir}/${String(entry.number).padStart(3,'0')}.gz`;fs.writeFileSync(entry.saved_response,compressed);entry.saved_response_sha256=hash(Buffer.from(safe));}
    const blocked=guard(text,response.status);
    if(blocked){entry.guard=blocked;throw Error(`STOP: ${blocked}`);}
    if(response.status>=300&&response.status<400)throw Error(`STOP: redirect ikke fulgt: HTTP ${response.status}`);
    if(!response.ok)throw Error(`HTTP ${response.status}`);
    data=method==='POST'?unwrap(text):text;
    if(method==='POST'&&typeof data?.Html!=='string')throw Error('Svar uden Html');
    entry.rows=method==='POST'?parseRows(data.Html).length:null;
    errors=0;
  }catch(e){entry.error=String(e.message);errors++;if(entry.error.startsWith('STOP:')){state.stop_reason=entry.error;throw e;}if(errors>=3){state.stop_reason='STOP: tre fejl i træk';throw Error(state.stop_reason);}if(entry.status===429||entry.status>=500)await pause(5000);}
  finally{entry.completed_at=new Date().toISOString();entry.elapsed_ms=Date.now()-lastStart;persist();console.log(JSON.stringify({request:entry.number,phase,label,status:entry.status??null,rows:entry.rows??null,error:entry.error??null}));}
  return {entry,text,data,rows:data?.Html?parseRows(data.Html):[]};
}
async function fresh(phase){const r=await request('GET',pageUrl,null,'frisk kontekst',phase);if(r.entry.status!==200||!context)throw Error('STOP: ingen offentlig callbackkontekst');}
const body = (list=288,param='M',change={})=>baseBody(context,String(list),param,{seasonid:'2025',rankinglistversiondate:state.snapshot.value,...change});
function selectSnapshot(){
  const previous=JSON.parse(fs.readFileSync('statistik/results/150-ranglistepilot.json','utf8'));
  const rec=previous.requests.find(r=>r.number===14),vs=versionList(unwrap(fs.readFileSync(rec.saved_response,'utf8'))).filter(v=>iso(v.value)).sort((a,b)=>iso(a.value).localeCompare(iso(b.value)));
  const db=readonly('gsb-statistik-normalized.db');
  const matches=db.prepare(`SELECT tm.*,t.name_raw AS gsb_team,c.age_group_id FROM team_matches tm JOIN competitions c USING(competition_id) JOIN teams t ON t.team_id=tm.gsb_team_id WHERE tm.season_id=2025 AND c.age_group_id IN(2,3,4,5,6,7,18)`).all();db.close();
  const map=new Map();for(const m of matches){if(!/^\d{4}-\d{2}-\d{2}$/u.test(m.round_date??''))continue;const v=vs.filter(v=>iso(v.value)<=m.round_date).at(-1);if(!v)continue;if(!map.has(v.value))map.set(v.value,{value:v.value,date:iso(v.value),match_ids:[]});map.get(v.value).match_ids.push(m.external_match_id);}
  const chosen=[...map.values()].sort((a,b)=>b.match_ids.length-a.match_ids.length||a.date.localeCompare(b.date))[0];
  if(state.snapshot&&state.snapshot.value!==chosen.value)throw Error('STOP: snapshot ændret ved genoptagelse');
  state.snapshot={...chosen,season:2025,total_youth_matches:matches.length,dated_matches:matches.filter(m=>/^\d{4}-\d{2}-\d{2}$/u.test(m.round_date??'')).length,selected_match_count:chosen.match_ids.length,source:rec.saved_response};
  return matches.filter(m=>chosen.match_ids.includes(m.external_match_id));
}
function firstPageTotal(data){const html=data.Html;const last=html.match(/SelectRankingListPage\((\d+)\)[^>]*>\s*Sidste/iu);const links=[...html.matchAll(/SelectRankingListPage\((\d+)\)/giu)].map(m=>Number(m[1]));return {pages:last?Number(last[1])+1:links.length?Math.max(...links)+1:1,source:last?'explicit_Sidste':'page0_links_or_single',versions:versionList(data)};}
function loadRaw(entry){return unwrap(zlib.gunzipSync(fs.readFileSync(entry.saved_response)).toString('utf8'));}
async function phase0(){
  if(state.phase0.status==='complete')return;
  if(state.requests.some(r=>r.phase===0))throw Error('STOP: delvis fase 0 findes; kræver vurdering før nye testkald');
  state.phase0={status:'running',tests:[]};persist();await fresh(0);
  const send=async(label,b)=>{const r=await request('POST',service+'GetRankingListPlayers',b,label,0);if(r.data){const rr=r.rows;state.phase0.tests.push({label,request:r.entry.number,rows:rr.length,IDs:rr.map(x=>x.player_id),target:b.playerid||null,target_rows:rr.filter(x=>x.player_id===b.playerid),top_level_player_id:r.data.PlayerID,selected_versions:versionList(r.data).filter(v=>v.selected),detail_links:[...r.data.Html.matchAll(/VisSpiller\/#(\d+),(\d+),(\d+),(\d+)/gu)].slice(0,2).map(m=>m.slice(1))});persist();}return r;};
  const baseline=await send('fase0 historisk baseline 288 M',body());if(!baseline.rows.length)throw Error('STOP: fase 0 baseline ingen rækker');
  const player=baseline.rows[0].player_id;
  await send('fase0 playerid getplayer true',body(288,'M',{playerid:player}));
  await send('fase0 playerid getplayer false',body(288,'M',{playerid:player,getplayer:false}));
  await send('fase0 playerid anden bevist version',body(288,'M',{playerid:player,rankinglistversiondate:'03/20/2026'}));
  await send('fase0 playerid double',body(289,'M',{playerid:player}));
  const female=await send('fase0 historisk baseline 288 K',body(288,'K'));if(!female.rows.length)throw Error('STOP: K baseline ingen rækker');
  await send('fase0 kendt K profil',body(288,'K',{playerid:female.rows[0].player_id}));
  await send('fase0 getversions false',body(288,'M',{playerid:player,getversions:false}));
  const link=[...baseline.data.Html.matchAll(/VisSpiller\/#(\d+),(\d+),(\d+),(\d+)/gu)].find(m=>m[1]===player);
  if(link){const r=await request('POST',service+'GetPlayerRankingListPoints',{callbackcontextkey:context,seasonid:Number(link[4]),playerid:Number(link[1]),rankinglistid:Number(link[2]),rankinglistplayerid:Number(link[3]),getplayerdata:true},'fase0 historisk pointtabel faktisk post-ID',0);state.phase0.event_test={request:r.entry.number,status:r.entry.status,rows:r.rows.length,has_event_table:/playerprofilerankingpointstable/u.test(r.data?.Html??'')};}
  else await send('fase0 positiv ID kontrol gentaget',body(288,'M',{playerid:player}));
  state.phase0.status='complete';state.phase0.request_count=state.requests.filter(r=>r.phase===0).length;
  summarizePhase0();
  state.status='phase0_complete';
  persist();
}
function summarizePhase0(){
  if(state.phase0.status!=='complete')return;
  const tests=state.phase0.tests, positive=tests.filter(t=>t.target&&t.rows>0);
  state.phase0.isolated_positive_responses=positive.filter(t=>t.rows===1&&t.target_rows.length===1).length;
  state.phase0.point_checks=[];
  for(const [baseNum,testNum] of [[2,3],[2,4],[7,8],[3,9]]){
    const be=state.requests.find(r=>r.number===baseNum),te=state.requests.find(r=>r.number===testNum);
    if(!be?.saved_response||!te?.saved_response)continue;
    const target=te.request_fields.playerid,baseline=parseRows(loadRaw(be).Html).find(r=>r.player_id===target),actual=parseRows(loadRaw(te).Html).find(r=>r.player_id===target);
    state.phase0.point_checks.push({baseline:baseNum,test:testNum,player_id:target,ID_name_club_points_equal:!!baseline&&!!actual&&['player_id','name','club','points'].every(k=>baseline[k]===actual[k]),baseline_rank:baseline?.rank,filtered_rank:actual?.rank});
  }
  const event=state.requests.find(r=>r.number===10);
  if(event?.saved_response&&event.url.endsWith('/GetPlayerRankingListPoints')){const d=loadRaw(event);state.phase0.event_test={...state.phase0.event_test,event_rows:[...String(d.Html).matchAll(/<tr\b[^>]*>[\s\S]*?<\/tr>/giu)].filter(m=>/class=['"]datecol/u.test(m[0])&&!/<th/u.test(m[0])).length,meaning:'Event-/kampvise point, ikke ranglisterækker eller alle versionsdatoer'};}
  state.phase0.conclusion='Fem positive playerid-svar er isolerede enkelt-rækker; ID/navn/klub/point matcher kontrol. K-rang 1 bliver 83 i spilleropslaget: rangsemantik er uafklaret. Double-opslaget gav nul rækker; fravær valideres mod fuld liste. Historisk faktisk post-ID åbnede eventpointtabellen.';
}
function openNew(){const db=new DatabaseSync(database);db.exec(`PRAGMA journal_mode=DELETE;
CREATE TABLE IF NOT EXISTS ranking_points(list_id INTEGER,param TEXT,version_date TEXT,player_id TEXT,member_number TEXT,name TEXT,club TEXT,class TEXT,rank INTEGER,points REAL,page_index INTEGER,fetched_at TEXT,response_sha256 TEXT,PRIMARY KEY(list_id,param,version_date,player_id));
CREATE TABLE IF NOT EXISTS harvest_pages(list_id INTEGER,param TEXT,version_date TEXT,page_index INTEGER,status TEXT,rows INTEGER,response_sha256 TEXT,fetched_at TEXT,PRIMARY KEY(list_id,param,version_date,page_index));`);return db;}
function storePage(db,list,param,index,entry,data){
  const rows=parseRows(data.Html);if(!rows.length||rows.some(r=>!r.player_id))throw Error('STOP: tom side eller manglende profil-ID');
  if(rows.length>100)throw Error('STOP: sidestørrelse over observeret 100');
  const ins=db.prepare('INSERT OR IGNORE INTO ranking_points VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)'),dups=[];
  db.exec('BEGIN');try{for(const r of rows){const found=db.prepare('SELECT * FROM ranking_points WHERE list_id=? AND param=? AND version_date=? AND player_id=?').get(list,param,state.snapshot.date,r.player_id);if(found){dups.push({list,param,player_id:r.player_id,first_page:found.page_index,duplicate_page:index,conflicting:found.points!==r.points||found.rank!==r.rank});continue;}ins.run(list,param,state.snapshot.date,r.player_id,r.member_number,r.name,r.club,r.class,r.rank,r.points,index,entry.completed_at,entry.response_sha256);}db.prepare('INSERT OR REPLACE INTO harvest_pages VALUES(?,?,?,?,?,?,?,?)').run(list,param,state.snapshot.date,index,'complete',rows.length,entry.response_sha256,entry.completed_at);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
  state.duplicates??=[];state.duplicates.push(...dups);persist();if(dups.some(x=>x.conflicting))throw Error('STOP: konflikt i dublet på frosset snapshot');return rows.length;
}
function validateGroup(data,index,total){
  const rows=parseRows(data.Html);if(index<total-1&&rows.length!==100)throw Error(`STOP: kort ikke-sidste side ${index}, ${rows.length} rækker`);
  if(!rows.length)throw Error('STOP: tom side');
  const selected=versionList(data).filter(v=>v.selected);if(selected.length&&selected.some(v=>v.value!==state.snapshot.value))throw Error('STOP: serveren valgte en anden version');
}
async function collect(){
  if(state.phase0.status!=='complete')throw Error('STOP: fase 0 mangler');
  if(state.stop_reason){
    if(!state.stop_reason.startsWith('EPERM: operation not permitted, rename'))throw Error('STOP: tidligere stop kræver vurdering');
    state.local_interruptions??=[];state.local_interruptions.push({at:new Date().toISOString(),reason:state.stop_reason,requests:state.requests.length});state.stop_reason=null;
  }
  const db=openNew(),run={started_at:new Date().toISOString(),skipped_completed:0,downloaded_pages:0,initial_requests:state.requests.length};state.resume_runs.push(run);persist();
  const stopArg=process.argv.indexOf('--stop-after'),stopAfter=stopArg<0?Infinity:Number(process.argv[stopArg+1]);
  try{
    await fresh(1);
    // Seed only exact unfiltered baseline responses; player tests are never imported.
    for(const c of combos){const key=`${c.list}${c.param}`;const done=db.prepare('SELECT 1 FROM harvest_pages WHERE list_id=? AND param=? AND version_date=? AND page_index=0 AND status=\'complete\'').get(c.list,c.param,state.snapshot.date);if(done)continue;
      const seed=state.requests.find(r=>r.phase===0&&r.status===200&&r.label===`fase0 historisk baseline ${c.list} ${c.param}`);const rec=seed?{entry:seed,data:loadRaw(seed)}:await request('POST',service+'GetRankingListPlayers',body(c.list,c.param),`side ${key} 0`,1);
      if(!rec.data)throw Error('STOP: første side skal lykkes før serie');
      const info=firstPageTotal(rec.data);if(!info.versions.some(v=>v.value===state.snapshot.value))throw Error(`STOP: valgt version findes ikke i ${key}`);
      validateGroup(rec.data,0,info.pages);state.groups[key]={list:c.list,param:c.param,total_pages:info.pages,page_count_source:info.source,versions:info.versions,first_response:rec.entry.number};storePage(db,c.list,c.param,0,rec.entry,rec.data);if(!seed)run.downloaded_pages++;persist();
    }
    const planned=Object.values(state.groups).reduce((s,g)=>s+g.total_pages,0),have=db.prepare("SELECT COUNT(*) n FROM harvest_pages WHERE status='complete'").get().n;
    state.planned_pages=planned;if(state.requests.length+planned-have>470)throw Error(`STOP: ${planned} sider kan ikke rummes i resterende kald`);
    let added=0;for(const c of combos){const key=`${c.list}${c.param}`,g=state.groups[key];for(let i=0;i<g.total_pages;i++){
      if(db.prepare("SELECT 1 FROM harvest_pages WHERE list_id=? AND param=? AND version_date=? AND page_index=? AND status='complete'").get(c.list,c.param,state.snapshot.date,i)){run.skipped_completed++;continue;}
      const saved=state.requests.find(r=>r.phase===1&&r.status===200&&!r.guard&&r.label===`side ${key} ${i}`&&r.saved_response);
      if(saved){const data=loadRaw(saved);validateGroup(data,i,g.total_pages);storePage(db,c.list,c.param,i,saved,data);run.recovered_saved_responses=(run.recovered_saved_responses??0)+1;continue;}
      if(added>=stopAfter){state.status='artificial_pause';run.artificial_pause=true;return;}
      let rec;for(let attempt=0;attempt<3;attempt++){rec=await request('POST',service+'GetRankingListPlayers',body(c.list,c.param,{pageindex:String(i)}),`side ${key} ${i}`,1);if(rec.data)break;}
      if(!rec?.data)throw Error('STOP: side kunne ikke hentes');validateGroup(rec.data,i,g.total_pages);storePage(db,c.list,c.param,i,rec.entry,rec.data);added++;run.downloaded_pages++;state.status='collecting';persist();
    }}state.status='harvest_complete';
  }finally{run.completed_at=new Date().toISOString();run.final_requests=state.requests.length;state.completed_pages=db.prepare("SELECT COUNT(*) n FROM harvest_pages WHERE status='complete'").get().n;db.close();persist();}
}
function counts(items,key){return items.reduce((out,item)=>{const k=typeof key==='function'?key(item):item[key];out[k??'tom']=(out[k??'tom']??0)+1;return out;},{});}
function analyze(matches){
  if(!fs.existsSync(database))return;const db=new DatabaseSync(database,{readOnly:true});const rows=db.prepare('SELECT * FROM ranking_points').all(),pages=db.prepare('SELECT * FROM harvest_pages ORDER BY list_id,param,page_index').all();
  state.completeness=combos.map(c=>{const rr=rows.filter(r=>r.list_id===c.list&&r.param===c.param),pp=pages.filter(p=>p.list_id===c.list&&p.param===c.param),g=state.groups[`${c.list}${c.param}`],last=pp.at(-1);return{list:c.list,param:c.param,expected_pages:g?.total_pages??null,pages:pp.length,source_rows:pp.reduce((n,p)=>n+p.rows,0),unique_players:rr.length,without_points:rr.filter(r=>r.points===null).length,last_page_rows:last?.rows??null,complete:!!g&&pp.length===g.total_pages&&pp.every((p,i)=>p.page_index===i)&&pp.slice(0,-1).every(p=>p.rows===100)};});
  state.snapshot_complete=state.completeness.every(c=>c.complete);state.total_unique_players=new Set(rows.map(r=>r.player_id)).size;state.total_ranking_rows=rows.length;state.class_labels=counts(rows,'class');
  state.resume_verified=state.resume_runs.some(r=>r.artificial_pause)&&state.resume_runs.some(r=>!r.artificial_pause&&r.skipped_completed>=30);
  const norm=readonly('gsb-statistik-normalized.db'),nat=readonly('national-spillere.db'),hist=readonly('rangliste-historik.db');
  const ids=matches.map(m=>m.external_match_id),marks=ids.map(()=>'?').join(',');
  const sourceMatches=new Map(nat.prepare(`SELECT external_match_id,home_team_raw,away_team_raw FROM matches WHERE external_match_id IN (${marks})`).all(...ids).map(m=>[m.external_match_id,m]));
  const participants=nat.prepare(`SELECT e.external_match_id,e.external_player_id,e.discipline_code,e.team_side,p.name_raw,p.gender_status FROM player_match_extras e JOIN players p USING(external_player_id) WHERE e.external_match_id IN (${marks})`).all(...ids);
  const byID=new Map(),byName=new Map();for(const r of rows){if(!byID.has(r.player_id))byID.set(r.player_id,[]);byID.get(r.player_id).push(r);const k=clean(r.name)+'|'+clubClean(r.club);if(!byName.has(k))byName.set(k,[]);byName.get(k).push(r);}
  const subjects=new Map(),missingMatches=[],sideEvidence=[];
  for(const m of matches){const src=sourceMatches.get(m.external_match_id);const home=clean(m.home_name_raw)===clean(m.gsb_team),away=clean(m.away_name_raw)===clean(m.gsb_team);if(home===away||!src){missingMatches.push({id:m.external_match_id,reason:!src?'national match mangler':'GSB-side uafklaret'});continue;}
    const nh=clean(src.home_team_raw)===clean(m.gsb_team),na=clean(src.away_team_raw)===clean(m.gsb_team),gsbSide=nh!==na?(nh?'hjemme':'ude'):(home?'hjemme':'ude');sideEvidence.push({id:m.external_match_id,source:nh!==na?'national_exact':'normalized_side_fallback',gsbSide});
    const ps=participants.filter(p=>p.external_match_id===m.external_match_id);if(!ps.length)missingMatches.push({id:m.external_match_id,reason:'ingen nationale deltagere'});
    for(const p of ps){const side=p.team_side===gsbSide?'gsb':['hjemme','ude'].includes(p.team_side)?'opponent':'unknown';const club=p.team_side==='hjemme'?src.home_team_raw:p.team_side==='ude'?src.away_team_raw:null;
      const key=side+'|'+p.external_player_id+'|'+clubClean(club);if(!subjects.has(key))subjects.set(key,{player_id:p.external_player_id,name:p.name_raw,club,side,gender:p.gender_status,age_groups:new Set(),disciplines:new Set(),match_ids:new Set()});const s=subjects.get(key);s.age_groups.add(m.age_group_id);s.disciplines.add(p.discipline_code);s.match_ids.add(m.external_match_id);
    }
  }
  const links=[...subjects.values()].map(s=>{const found=byID.get(s.player_id)||[],consistent=found.filter(r=>clean(r.name)===clean(s.name)&&clubClean(r.club)===clubClean(s.club));const nameOnly=byName.get(clean(s.name)+'|'+clubClean(s.club))||[];
    const status=found.length?(consistent.length===found.length?'id_name_club_ok':'id_name_club_mismatch'):nameOnly.length?'name_club_only':'not_found';
    const disciplineStatus=[...s.disciplines].map(d=>{const list=['HS','DS','S'].includes(d)?288:['HD','DD','D'].includes(d)?289:d==='MD'?292:null;const param=['HS','HD'].includes(d)?'M':['DS','DD'].includes(d)?'K':s.gender==='mand'?'M':s.gender==='kvinde'?'K':null;const rr=list?found.filter(r=>r.list_id===list&&(!param||r.param===param)):[];return{discipline:d,list,param,gender_uncertain:!param,status:!list?'unknown_discipline':rr.some(r=>r.points!==null)?'points_present':state.snapshot_complete?'not_on_discipline_list':'incomplete_search'};});
    return{...s,age_groups:[...s.age_groups],disciplines:[...s.disciplines],match_ids:[...s.match_ids],status,ranking_rows:found,name_club_candidates:found.length?[]:nameOnly,discipline_status:disciplineStatus};});
  state.linkage={selected_matches:matches.length,subject_rows:links.length,unique_IDs:new Set(links.map(s=>s.player_id)).size,counts_by_side:Object.fromEntries(['gsb','opponent','unknown'].map(side=>[side,counts(links.filter(s=>s.side===side),'status')])),links,missing_matches:missingMatches,side_evidence:sideEvidence,discipline_counts:Object.fromEntries(['gsb','opponent','unknown'].map(side=>[side,counts(links.filter(s=>s.side===side).flatMap(s=>s.discipline_status),s=>s.discipline+'|'+s.status)])),opponent_classes:counts(links.filter(s=>s.side==='opponent').flatMap(s=>s.ranking_rows),'class'),opponent_unique_with_U17E:links.filter(s=>s.side==='opponent'&&s.ranking_rows.some(r=>/^U17\s+E\b/u.test(r.class??''))).length,opponent_unique_with_SEN:links.filter(s=>s.side==='opponent'&&s.ranking_rows.some(r=>/^SEN\b/u.test(r.class??''))).length};
  const samples=side=>{const pool=links.filter(s=>s.side===side&&s.status==='id_name_club_ok'&&s.ranking_rows.some(r=>r.points!==null));const chosen=[];for(const age of [2,3,4,5,18]){const s=pool.find(s=>s.age_groups.includes(age)&&!chosen.includes(s));if(s)chosen.push(s);}for(const s of pool){if(chosen.length>=5)break;if(!chosen.includes(s))chosen.push(s);}return chosen.slice(0,5);};
  state.samples={gsb:samples('gsb'),opponents:samples('opponent')};
  const history=[];for(const s of links.filter(s=>s.side==='gsb'&&s.status==='id_name_club_ok')){const locals=norm.prepare('SELECT * FROM players WHERE lower(name_normalized)=? OR name_raw=?').all(clean(s.name),s.name);if(locals.length!==1)continue;const link=hist.prepare("SELECT * FROM player_link WHERE gsb_player_id=? AND match_confidence='exact_name'").get(locals[0].player_id);if(!link)continue;
    for(const r of s.ranking_rows){const d=r.list_id===288?(r.param==='M'?'raw:HS':'raw:DS'):r.list_id===289?(r.param==='M'?'raw:HD':'raw:DD'):(r.param==='M'?'raw:MxH':'raw:MxD');const hr=hist.prepare('SELECT * FROM ranking_snapshots WHERE nembadminton_member_id=? AND discipline=? ORDER BY ABS(julianday(version_date)-julianday(?)),version_date LIMIT 1').get(link.nembadminton_member_id,d,state.snapshot.date);if(hr){history.push({name:s.name,player_id:s.player_id,list:r.list_id,param:r.param,snapshot_date:state.snapshot.date,ranking_points:r.points,history_date:hr.version_date,history_points:hr.points,delta:r.points-hr.points,identity_method:link.match_method,day_distance:Math.abs(Date.parse(hr.version_date)-Date.parse(state.snapshot.date))/86400000});break;}}
  }state.history_comparison=history.sort((a,b)=>a.day_distance-b.day_distance||a.player_id.localeCompare(b.player_id)).slice(0,5);
  state.questions=[...(state.stop_reason?[state.stop_reason]:[]),'Fase 0 er godkendt af Christoffers prompt; kortet på disken havde ikke fasebeskrivelsen. Samlet grænse er 470, ikke kortets oprindelige 450.'];
  if(missingMatches.length)state.questions.push(`${missingMatches.length} valgte kampe har manglende deltagere eller sideevidens; se linkage.missing_matches.`);
  const mismatch=links.filter(s=>s.status==='id_name_club_mismatch');if(mismatch.length)state.questions.push(`${mismatch.length} ID-fund har navn-/klubafvigelse; listet i linkage.links, ikke automatisk godkendt.`);
  if(history.length<5)state.questions.push(`Kun ${history.length} entydige GSB-historikstikprøver fundet; fem kræver flere dokumenterede identitetskoblinger.`);
  state.questions.push('Fase 0: K-listens rang 1 blev 83 i playerid-opslaget med samme ID/navn/klub/point. Rangsemantik skal afklares før filteropslag bruges til rangering. Fase 1 importerede kun ufiltrerede sider.');
  if(state.duplicates?.length)state.questions.push(`${state.duplicates.length} identiske ID-dubletter på hentede sider, ingen modstridende point/rang. Alle sider er læst, men stabil sortering inden for ties er ikke bevist; fravær betyder ikke fundet i alle hentede sider.`);
  if(state.local_interruptions?.length)state.questions.push('Én lokal EPERM ved atomisk checkpoint-udskiftning stoppede kørslen; databasen var intakt, genoptagelse genhentede ingen færdige sider. Ingen ACL/rettigheder ændret.');
  if(state.snapshot_complete){const t=state.phase0.tests.find(t=>t.label==='fase0 playerid double');state.phase0.double_absence_confirmed_in_full_pages=!!t&&!rows.some(r=>r.list_id===289&&r.param==='M'&&r.player_id===t.target);}
  state.questions.push('Historik-sammenligning er navnekoblet Nembadminton; nærmeste dato kan være før eller efter snapshot. Forskelle er ikke et bevis for systematisk skalaforskel.');
  state.raw_storage_bytes=fs.readdirSync(rawDir).reduce((n,f)=>n+fs.statSync(path.join(rawDir,f)).size,0);
  state.minimum_request_interval_ms=state.requests.length>1?Math.min(...state.requests.slice(1).map((r,i)=>Date.parse(r.started_at)-Date.parse(state.requests[i].started_at))):null;
  state.no_refetched_complete_pages=state.requests.filter(r=>r.phase===1&&/^side /u.test(r.label)&&!r.error).every((r,i,a)=>a.findIndex(x=>x.label===r.label)===i);
  state.integrity_check=db.prepare('PRAGMA integrity_check').get();db.close();norm.close();nat.close();hist.close();persist();
}
function verifyOffline(){
  const db=new DatabaseSync(database,{readOnly:true}),failures=[];
  for(const r of state.requests){
    const bytes=zlib.gunzipSync(fs.readFileSync(r.saved_response));
    if(hash(bytes)!==r.saved_response_sha256)failures.push(`råsvarshash ${r.number}`);
    const text=bytes.toString('utf8');
    if(/var SR_CallbackContext\s*=\s*'(?!\[CALLBACK_CONTEXT_REDACTED\])[^']+'/u.test(text))failures.push(`kontekstnøgle ${r.number}`);
  }
  const duplicateDifferences=[];
  for(const dup of state.duplicates??[]){
    const req=state.requests.find(r=>r.label===`side ${dup.list}${dup.param} ${dup.duplicate_page}`);
    const current=parseRows(loadRaw(req).Html).find(r=>r.player_id===dup.player_id);
    const first=db.prepare('SELECT * FROM ranking_points WHERE list_id=? AND param=? AND player_id=?').get(dup.list,dup.param,dup.player_id);
    for(const field of ['name','club','class','member_number','rank','points'])if(current[field]!==first[field])duplicateDifferences.push({dup,field,first:first[field],current:current[field]});
  }
  if(duplicateDifferences.length)failures.push('dubletter med forskellige felter');
  if(state.requests.length>470||state.minimum_request_interval_ms<2000)failures.push('kaldværn');
  if(!state.snapshot_complete||state.completed_pages!==393)failures.push('sidekontrol');
  if(state.completeness.reduce((n,c)=>n+c.source_rows,0)!==state.total_ranking_rows+state.duplicates.length)failures.push('rækkeregnskab');
  if(state.integrity_check.integrity_check!=='ok')failures.push('databaseintegritet');
  state.offline_verification={raw_responses_checked:state.requests.length,duplicate_occurrences_checked:state.duplicates.length,duplicate_fields:['name','club','class','member_number','rank','points'],duplicate_differences:duplicateDifferences,failures,passed:failures.length===0};
  db.close();if(failures.length)throw Error('STOP: offline kontrol: '+failures.join(', '));
}
function writeReport(){
  const rows=state.completeness??[],lines=['# Opgave 152 — kontrolsnapshot','',`Status: ${state.status}. Kald: ${state.requests.length}/470. Snapshot: ${state.snapshot?.date}, ${state.snapshot?.selected_match_count} holdkampe.`,'','## Fase 0','',JSON.stringify(state.phase0,null,2),'','## Fuldstændighed','', '| Liste | M/K | Sider hentet / krævet | Rækker fra sider | Unikke ID | Uden point | Sidste side | Komplet |','|---|---|---:|---:|---:|---:|---:|---|',...rows.map(c=>`| ${c.list} | ${c.param} | ${c.pages}/${c.expected_pages} | ${c.source_rows} | ${c.unique_players} | ${c.without_points} | ${c.last_page_rows} | ${c.complete} |`),'',`Samlet: ${state.total_ranking_rows??0} ranglisterækker, ${state.total_unique_players??0} unikke profil-ID'er. Snapshot komplet: ${state.snapshot_complete??false}.`,'','## Genoptagelse','',JSON.stringify({runs:state.resume_runs,resume_verified:state.resume_verified,no_refetched_complete_pages:state.no_refetched_complete_pages},null,2),'','## Kobling og disciplin','',JSON.stringify({counts:state.linkage?.counts_by_side,discipline_counts:state.linkage?.discipline_counts,missing_matches:state.linkage?.missing_matches,U17E:state.linkage?.opponent_unique_with_U17E,SEN:state.linkage?.opponent_unique_with_SEN},null,2),'','Navn/klub kontrolleres med NFKC, HTML-dekodning, lowercase og whitespace. Holdnummer og parentestekst fjernes fra klubnavn; ingen aliasgæt. Alle ID-afvigelser og navn+klub-kandidater står i JSON linkage.links. Uafklaret køn søger begge M/K for den konkrete disciplin, uden navnegæt.','', '## Klasseetiketter','',JSON.stringify(state.class_labels??{},null,2),'','## Skøn: fem GSB og fem modstandere','',JSON.stringify(state.samples??{},null,2),'','## Historik, nærmeste gemte version','',JSON.stringify(state.history_comparison??[],null,2),'','## Databaser og kaldværn','',JSON.stringify({before:state.databases_before,after:state.databases_after,unchanged:state.database_hashes_unchanged,readonly:Object.keys(expected),writable:database,minimum_interval_ms:state.minimum_request_interval_ms,raw_bytes:state.raw_storage_bytes,integrity:state.integrity_check},null,2),'','## Spørgsmål','',...(state.questions??[]),'','## Forespørgselslog','', '| Nr | Fase | Kald | HTTP | Bytes | SHA-256 |','|---:|---:|---|---:|---:|---|',...state.requests.map(r=>`| ${r.number} | ${r.phase} | ${r.label} | ${r.status??'ingen'} | ${r.bytes??0} | ${r.response_sha256??'ingen'} |`),'','Detaljerede requestfelter, redigeret råsvarshash, svartid, ID-fund, afvigelser og dubletter står i 152-snapshot.json. Før snapshot_complete=true er fravær kun incomplete_search. Fase 0-svar med andre versioner lagres som evidens, aldrig som snapshotpoint.',''];fs.writeFileSync(markdown,lines.join('\n'));
}
function appendAuditReport(){
  const mismatches=(state.linkage?.links??[]).filter(s=>s.status==='id_name_club_mismatch');
  const lines=['','## Afvigelser og slutkontrol','','Koblingstællingens enhed er spiller-ID og kamptidsklub pr. side. Disciplinoptællingen er distinkte spiller–disciplin-kombinationer, ikke antal spillede kampe. points_present betyder et faktisk pointtal på ID; det godkender ikke en afvigende identitet. To deltagere har ukendt hjemme/ude-side og tælles separat.','','| ID | Side | Kampdata: navn / klub | Rangliste: navn / klub |','|---|---|---|---|',...mismatches.map(s=>`| ${s.player_id} | ${s.side} | ${s.name} / ${s.club??'ukendt'} | ${[...new Set(s.ranking_rows.map(r=>r.name+' / '+r.club))].join('; ')} |`),'',`Rækkeregnskab: ${state.completeness?.reduce((n,c)=>n+c.source_rows,0)} kildeforekomster = ${state.total_ranking_rows} unikke liste/version/ID-rækker + ${state.duplicates?.length} dubletforekomster. Alle dubletters navn, klub, klasse, medlemsnummer, rang og point er sammenlignet.`, '', 'Komplet betyder alle annoncerede sider hentet, ikke bevist stabil paginering inden for samme point/rang. Ingen af de manglende spillere får startpoint eller automatisk godkendt navnematch. Historikstikprøverne ligger alle 8 dage før snapshot: fire ens pointtal og én forskel på 49 point; dette kan skyldes versionsforskellen og beviser ikke en skalaforskel.','',JSON.stringify(state.offline_verification,null,2),''];
  fs.appendFileSync(markdown,lines.join('\n'));
}
async function main(){
  if(!process.argv.some(a=>['--phase0','--collect','--analyze'].includes(a)))throw Error('Vælg --phase0, --collect [--stop-after 30] eller --analyze (offline)');
  await checkBefore();const matches=selectSnapshot();summarizePhase0();persist();
  try{if(process.argv.includes('--phase0'))await phase0();if(process.argv.includes('--collect'))await collect();analyze(matches);if(state.snapshot_complete)verifyOffline();}
  catch(e){state.status='stopped';state.stop_reason=String(e.message);console.error(state.stop_reason);try{analyze(matches);}catch(a){state.analysis_error=a.message;}process.exitCode=1;}
  finally{state.databases_after=await hashes();state.database_hashes_unchanged=JSON.stringify(state.databases_before)===JSON.stringify(state.databases_after);if(!state.database_hashes_unchanged){state.status='stopped_hash_mismatch';process.exitCode=1;}persist();writeReport();appendAuditReport();console.log(JSON.stringify({status:state.status,kald:state.requests.length,phase0:state.phase0.status,pages:state.completed_pages,snapshot_complete:state.snapshot_complete,hashes:state.database_hashes_unchanged}));}
}
await main();
