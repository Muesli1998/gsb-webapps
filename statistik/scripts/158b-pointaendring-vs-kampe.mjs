import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

const ROOT = process.cwd();
const RESULTS = path.join(ROOT, 'statistik', 'results');
const RAW = path.join(RESULTS, '158b-raa-svar');
const STATE_FILE = path.join(RAW, 'state.json');
const PAGE = 'https://badmintonplayer.dk/DBF/Ranglister/';
const SERVICE = 'https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/';
const PRIOR_CALLS = 4;
const TOTAL_LIMIT = 480;
const EXPECTED = {
  'gsb-statistik-normalized.db': '49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E',
  'liga-landskab.db': '9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C',
  'rangliste-historik.db': '6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F',
  'national-spillere.db': '1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E',
  'rangliste-point.db': 'DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9'
};
const CACHED = [
  { id: '329159', name: 'Josefine Bille-Ahmt', list: 288, param: 'K', post: '8329564', gender: 'kvinde', ages: ['3','4'], source: 'statistik/results/158-raa-svar/genbrugt-154-009.gz' },
  { id: '330650', name: 'Benjamin Hinge Carlsson', list: 288, param: 'M', post: '8329310', gender: 'mand', ages: ['2','3','4','5'], source: 'statistik/results/158-raa-svar/genbrugt-154-010.gz' },
  { id: '330770', name: 'Louis Valdemar Hedegaard Toftlund', list: 289, param: 'M', post: '8368727', gender: 'mand', ages: ['1','3','4','5','18'], source: 'statistik/results/158-raa-svar/genbrugt-154-011.gz' },
  { id: '327691', name: 'Theodor Lumby Jessen', list: 288, param: 'M', post: '8327268', gender: 'mand', ages: ['1','3','4','5'], source: 'statistik/results/158-raa-svar/theodor-327691.json.gz' },
  { id: '328195', name: 'Anna Rudolph', list: 288, param: 'K', post: '8328337', gender: 'kvinde', ages: ['2','3','4','5'], source: 'statistik/results/158-raa-svar/anna-328195.json.gz' }
];
const PROBES = [
  { id: '343986', name: 'Guanyan Chen', list: 288, param: 'M', post: '8337485', gender: 'mand', ages: ['5'], matches: 1 },
  { id: '328196', name: 'Chastine Christiansen', list: 288, param: 'K', post: '8327461', gender: 'kvinde', ages: ['5'], matches: 2 },
  { id: '362606', name: 'Sophia Rita Giuliani', list: 288, param: 'K', post: '8457425', gender: 'kvinde', ages: ['5'], matches: 2 },
  { id: '355801', name: 'Aanya Jha', list: 288, param: 'K', post: '8344299', gender: 'kvinde', ages: ['4'], matches: 16 },
  { id: '361644', name: 'Stuti Sharma', list: 288, param: 'K', post: '8455187', gender: 'kvinde', ages: ['3'], matches: 4 },
  { id: '346938', name: 'Cornelia Viola Bender-Jacobsen', list: 288, param: 'K', post: '8339290', gender: 'kvinde', ages: ['4','5'], matches: 16 },
  { id: '353206', name: 'Oliver Rafah Peddinini Joe', list: 288, param: 'M', post: '8343738', gender: 'mand', ages: ['4','5'], matches: 14 },
  { id: '343399', name: 'Pontus Einar Anker Mikkelsen', list: 288, param: 'M', post: '8337333', gender: 'mand', ages: ['4','5'], matches: 19 },
  { id: '353220', name: 'Ágúst Stensbo Knudsen', list: 288, param: 'M', post: '8343706', gender: 'mand', ages: ['3'], matches: 16 },
  { id: '328253', name: 'Erik Kragh Winther', list: 288, param: 'M', post: '8327388', gender: 'mand', ages: ['5'], matches: 12 },
  { id: '346148', name: 'Akhila Sureddy', list: 288, param: 'K', post: '8338710', gender: 'kvinde', ages: ['3','4'], matches: 14 },
  { id: '346158', name: 'Cecilie Johansen', list: 288, param: 'K', post: '8338716', gender: 'kvinde', ages: ['3','4'], matches: 14 },
  { id: '328375', name: 'Aanya Sarma', list: 288, param: 'K', post: '8329039', gender: 'kvinde', ages: ['5'], matches: 12 },
  { id: '337802', name: 'Luc Nørmark Jespersen', list: 288, param: 'M', post: '8334025', gender: 'mand', ages: ['4','5'], matches: 17 },
  { id: '346285', name: 'Kristian Almeida Møller', list: 288, param: 'M', post: '8338341', gender: 'mand', ages: ['4'], matches: 17 }
];
const wait = ms => new Promise(r => setTimeout(r, ms));
const sha = b => crypto.createHash('sha256').update(b).digest('hex').toUpperCase();
const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
let context = '';
let lastStarted = 0;
let postsSinceGet = 0;
function load() { return fs.existsSync(STATE_FILE) ? read(STATE_FILE) : { calls: [], probes: [], events: {}, weekly: [] }; }
function save(s) {
  fs.mkdirSync(RAW, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2) + '\n');
  fs.writeFileSync(path.join(RAW, 'forespoergsler.json'), JSON.stringify({ prior_del_a_calls: PRIOR_CALLS, calls: s.calls }, null, 2) + '\n');
}
function unwrap(text) {
  let v = JSON.parse(text);
  for (let i=0;i<6;i++) { if (v && typeof v==='object' && 'd' in v) v=v.d; else if (typeof v==='string') { try { v=JSON.parse(v); } catch { break; } } else break; }
  return v;
}
function redact(s,ctx=context) {
  let v=ctx?s.split(ctx).join('[REDACTED]'):s;
  v=v.replace(/("callbackcontextkey"\s*:\s*")[^"]+(")/giu,'$1[REDACTED]$2');
  return v.replace(/(SR_CallbackContext\s*=\s*['"])[^'"]+(['"])/giu,'$1[REDACTED]$2');
}
function decode(s) {
  return String(s??'').replace(/&#x([0-9a-f]+);/giu,(_,n)=>String.fromCodePoint(parseInt(n,16)))
    .replace(/&#([0-9]+);/gu,(_,n)=>String.fromCodePoint(Number(n))).replace(/&nbsp;/giu,' ')
    .replace(/&amp;/giu,'&').replace(/&quot;/giu,'"').replace(/&lt;/giu,'<').replace(/&gt;/giu,'>')
    .replace(/&aelig;/giu,'æ').replace(/&oslash;/giu,'ø').replace(/&aring;/giu,'å')
    .replace(/&AElig;/gu,'Æ').replace(/&Oslash;/gu,'Ø').replace(/&Aring;/gu,'Å');
}
function plain(s) { return decode(String(s??'').replace(/<br\s*\/?>/giu,' | ').replace(/<[^>]*>/gu,' ')).replace(/\s+/gu,' ').trim(); }
function number(s) {
  const m=String(s??'').match(/-?\d[\d.,\s]*/u); if(!m)return null;
  const t=m[0].trim().replace(/\s/gu,'').replace(/\.(?=\d{3}(?:\D|$))/gu,'').replace(',','.');
  const n=Number(t); return Number.isFinite(n)?n:null;
}
function parseRows(html) {
  return [...String(html??'').matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)].flatMap(rm=>{
    const cells=[...rm[1].matchAll(/<(td|th)\b([^>]*)>([\s\S]*?)<\/\1>/giu)].map(m=>({
      attrs:m[2],html:m[3],text:decode(m[3].replace(/<[^>]+>/gu,' ').replace(/\s+/gu,' ').trim()),
      className:m[2].match(/\bclass\s*=\s*['"]([^'"]*)['"]/iu)?.[1]??''
    }));
    const byClass=token=>cells.find(c=>new RegExp('(?:^|\\s)'+token+'(?:\\s|$)','iu').test(c.className));
    const rankCell=byClass('rank');
    if(!rankCell||!/^\d+$/u.test(rankCell.text))return [];
    const member=byClass('playerid'),nameCell=byClass('name')?.text??'',comma=nameCell.lastIndexOf(', ');
    const pointsCell=cells.filter(c=>/(?:^|\s)points(?:\s|$)/iu.test(c.className)).map(c=>c.text).find(t=>/^-?\d+(?:[.,]\d+)?$/u.test(t))??null;
    const href=rm[1].match(/href\s*=\s*['"][^'"]*\/DBF\/Spiller\/VisSpiller\/#(\d+)/iu)?.[1]??null;
    return [{rank:Number(rankCell.text),member_number:member?.text??null,
      name:(comma>=0?nameCell.slice(0,comma):nameCell).trim(),club:comma>=0?nameCell.slice(comma+2).trim():null,
      class:byClass('clas')?.text||null,points:pointsCell===null?null:Number(pointsCell.replace(',','.')),player_id:href}];
  });
}
function parseEvents(data,target) {
  const html=String(data?.Html??'');
  const tbl=html.match(/<table\b(?=[^>]*class=['"][^'"]*playerprofilerankingpointstable[^'"]*['"])[^>]*>([\s\S]*?)<\/table>/iu);
  if(!tbl)return {present:false,headers:[],rows:[],row_count:0};
  const trs=[...tbl[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/giu)].map(x=>x[1]);
  const cellsof=tr=>[...tr.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/giu)].map(x=>x[1]);
  const headers=trs.length?cellsof(trs[0]).map(plain):[]; let last='';
  const rows=trs.slice(1).map((tr,i)=>{
    const c=cellsof(tr), date=plain(c[0]??''); if(date)last=date;
    const titleHtml=c[1]??'', title=plain(titleHtml), href=titleHtml.match(/\bhref=['"]([^'"]+)['"]/iu)?.[1]??null;
    const pts=(c[3]??'').split(/<hr\b[^>]*>/iu).map(plain).filter(Boolean);
    const kind=href?.includes('/DBF/Turnering/VisResultater/')?'turnering':href?.includes('/DBF/HoldTurnering/Stilling/')?'holdkamp':/Sæsonskifte/iu.test(title)?'systemraekke':/afbud/iu.test(title)?'afbud':!title&&!href&&!pts.length?'tom_række':'ukendt';
    return {row_number:i+1,date_raw:date||null,date_inherited:last||null,title,source_url:href,event_kind:kind,
      point_text_by_separator:pts};
  });
  return {present:true,player_id:target.id,player_name:target.name,list:target.list,headers,row_count:rows.length,rows};
}
function kindCounts(parsed) {
  const rows=(parsed?.rows??[]).filter(r=>r.date_inherited&&!['systemraekke','afbud','tom_række'].includes(r.event_kind)
    &&!(r.event_kind==='ukendt'&&!r.title&&!r.source_url&&!(r.point_text_by_separator??[]).length));
  return {tournament:rows.filter(r=>r.event_kind==='turnering').length,team:rows.filter(r=>r.event_kind==='holdkamp').length,
    unknown:rows.filter(r=>r.event_kind==='ukendt').length,eligible:rows.length};
}
async function dbHashes() {
  const out={};
  for(const name of Object.keys(EXPECTED)){
    const h=crypto.createHash('sha256');
    for await(const chunk of fs.createReadStream(path.join(ROOT,'statistik','data',name)))h.update(chunk);
    out[name]=h.digest('hex').toUpperCase();
  }
  return out;
}
async function checkDb() {
  const before=await dbHashes();
  for(const [n,h] of Object.entries(before))if(h!==EXPECTED[n])throw new Error('STOP: hash afviger før arbejdet: '+n+' '+h);
  const schemaCounts={};
  for(const name of Object.keys(EXPECTED)){
    const db=new DatabaseSync(path.join(ROOT,'statistik','data',name),{readOnly:true});
    db.exec('PRAGMA query_only=ON');
    schemaCounts[name]=db.prepare("SELECT count(*) AS n FROM sqlite_master WHERE type='table'").get().n;
    db.close();
  }
  const state=load();state.read_only_schema_table_counts=schemaCounts;save(state);
  return before;
}
function saveRaw(n,text,ctx=context) {
  const safe=redact(text,ctx),name='call-'+String(n).padStart(3,'0')+'.json.gz';
  fs.writeFileSync(path.join(RAW,name),zlib.gzipSync(Buffer.from(safe,'utf8'),{level:9}));
  return {name,bytes:Buffer.byteLength(text),hash:sha(Buffer.from(safe,'utf8'))};
}
function challenge(text) {
  for(const re of [/g-recaptcha-response/iu,/challenge-platform/iu,/Just a moment/iu,/verify you are human/iu]){const m=re.exec(text);if(m)return {text:m[0],at:m.index};}
  return null;
}
async function call(state,method,url,fields,label) {
  if(PRIOR_CALLS+state.calls.length>=TOTAL_LIMIT)throw new Error('STOP: samlet loft på 480 kald nået.');
  if(new URL(url).hostname!=='badmintonplayer.dk')throw new Error('STOP: værten er ikke tilladt.');
  if(lastStarted)await wait(Math.max(0,2100-(Date.now()-lastStarted)));
  lastStarted=Date.now();
  const no=PRIOR_CALLS+state.calls.length+1;
  const headers=method==='GET'?{accept:'text/html,application/xhtml+xml'}:
    {'content-type':'application/json; charset=UTF-8',accept:'*/*','x-requested-with':'XMLHttpRequest',origin:'https://badmintonplayer.dk',referer:PAGE};
  const payload=fields?{callbackcontextkey:context,...fields}:undefined;
  let res=null,raw=Buffer.alloc(0),text='',err=null;
  try{res=await fetch(url,{method,headers,body:payload?JSON.stringify(payload):undefined,redirect:'manual',credentials:'omit'});raw=Buffer.from(await res.arrayBuffer());text=raw.toString('utf8');}
  catch(e){err=String(e?.message??e);}
  const getContextCandidate=method==='GET'?text.match(/var\\s+SR_CallbackContext\\s*=\\s*['"]([^'"]+)['"]/u)?.[1]??'':context;
  const saved=res?saveRaw(no,text,getContextCandidate):null;
  const baseline={rankinglistagegroupid:'15',rankinglistid:'288',seasonid:'2025',rankinglistversiondate:'',agegroupid:'',classid:'',gender:'',clubid:'',searchall:false,regionid:'',pointsfrom:'',pointsto:'',rankingfrom:'',rankingto:'',birthdatefromstring:'',birthdatetostring:'',agefrom:'',ageto:'',playerid:'',param:'M',pageindex:'0',sortfield:'0',getversions:true,getplayer:true};
  const changed=fields?Object.fromEntries(Object.entries(fields).filter(([k,v])=>JSON.stringify(v)!==JSON.stringify(baseline[k]))):null;
  const rec={number:no,method,label,url,fields_changed:changed,status:res?.status??null,content_type:res?.headers?.get('content-type')??null,
    response_bytes:saved?.bytes??null,response_sha256_redacted:saved?.hash??null,saved_file:saved?.name??null,network_error:err};
  state.calls.push(rec);save(state); // Log each response before examining guards.
  if(err)throw new Error('Netværksfejl: '+err);
  const ch=challenge(redact(text,getContextCandidate));
  if(ch){rec.stop_rule='tydelig udfordringsside: '+ch.text;rec.stop_excerpt=redact(text.slice(Math.max(0,ch.at-100),ch.at+100),getContextCandidate);save(state);throw new Error('STOP: '+rec.stop_rule);}
  if(res.status===403){rec.stop_rule='HTTP 403, mulig blokering';save(state);throw new Error('STOP: '+rec.stop_rule);}
  if(res.status===429||res.status>=500){
    state.errors=(state.errors??0)+1;rec.stop_rule='HTTP '+res.status+', backoff';save(state);
    if(state.errors>=3)throw new Error('STOP efter tre fejl i træk.');
    await wait(2500*state.errors);return call(state,method,url,fields,label);
  }
  if(res.status!==200){rec.stop_rule='HTTP '+res.status;save(state);throw new Error('STOP: '+rec.stop_rule);}
  state.errors=0;save(state);
  if(method==='GET'){
    const m=text.match(/var\s+SR_CallbackContext\s*=\s*['"]([^'"]+)['"]/u);
    if(!m){rec.stop_rule='GET mangler SR_CallbackContext';save(state);throw new Error('STOP: GET mangler SR_CallbackContext.');}
    context=m[1];postsSinceGet=0;
  }else postsSinceGet++;
  return {rec,text,data:method==='POST'?unwrap(text):null};
}
async function contextIfNeeded(state) {
  if(!context||postsSinceGet>=45){const r=await call(state,'GET',PAGE,null,'frisk offentlig kontekst');if(r.rec.status!==200)throw new Error('STOP: kontekst-GET fejlede.');}
}
async function cachedEvents(state) {
  state.events??={};
  for(const t of CACHED){
    if(state.events[t.id])continue;
    const raw=zlib.gunzipSync(fs.readFileSync(path.join(ROOT,t.source))).toString('utf8');
    const parsed=parseEvents(unwrap(raw),t);
    const out='cached-'+t.id+'.json.gz';
    fs.writeFileSync(path.join(RAW,out),zlib.gzipSync(Buffer.from(redact(raw),'utf8'),{level:9}));
    state.events[t.id]={target:t,parsed,kinds:kindCounts(parsed),cached_source:t.source,saved_file:out,source_sha256:sha(Buffer.from(raw))};
  }
  save(state);
}
async function probes(state) {
  await cachedEvents(state);await contextIfNeeded(state);
  state.probes??=[];
  state.probes=state.probes.map(p=>({...p,kinds:kindCounts(state.events[p.id]?.parsed)}));
  for(const t of PROBES){
    if(state.events[t.id])continue;
    if(state.probes.length>=15)break;
    const f={seasonid:2025,playerid:Number(t.id),rankinglistid:t.list,rankinglistplayerid:Number(t.post),getplayerdata:true};
    const r=await call(state,'POST',SERVICE+'GetPlayerRankingListPoints',f,'eventtabel '+t.name+' '+t.id);
    const parsed=parseEvents(r.data,t),kinds=kindCounts(parsed),file='event-'+t.id+'.json.gz';
    fs.copyFileSync(path.join(RAW,r.rec.saved_file),path.join(RAW,file));
    state.events[t.id]={target:t,parsed,kinds,request:r.rec.number,saved_file:file,response_sha256:r.rec.response_sha256_redacted};
    state.probes.push({id:t.id,name:t.name,request:r.rec.number,kinds});
    save(state);
    const only=state.probes.filter(p=>p.kinds.team>0&&p.kinds.tournament===0&&p.kinds.unknown===0);
    if(state.probes.length>=3&&only.length>=2)break;
  }
  const only=state.probes.filter(p=>p.kinds.team>0&&p.kinds.tournament===0&&p.kinds.unknown===0);
  const extra=only.slice(0,2);
  for(const p of state.probes)if(extra.length<3&&!extra.some(x=>x.id===p.id))extra.push(p);
  state.selected=CACHED.map(t=>state.events[t.id].target).concat(extra.map(p=>state.events[p.id].target)).slice(0,8);
  state.selection_note={probes:state.probes.length,only_team_found:only.length,only_team_required:2,
    unresolved:only.length<2?'Færre end to kun-hold-profiler fundet blandt højst 15 eventprofilopslag.':null};
  const calFiles={'288M':'022.gz','288K':'023.gz','289M':'024.gz','289K':'025.gz','292M':'026.gz','292K':'027.gz'};
  const report153=read(path.join(RESULTS,'153-historisk-raekkevidde.json'));
  state.dates_by_list={};
  for(const t of state.selected){
    const key=String(t.list)+t.param,rawPath=path.join(ROOT,'statistik','results','154-raa-svar',calFiles[key]??'');
    if(!fs.existsSync(rawPath))throw new Error('STOP: gemt versionsvar fra 154 mangler for '+key);
    const versionData=unwrap(zlib.gunzipSync(fs.readFileSync(rawPath)).toString('utf8'));
    const dates=(versionData.Versions??[]).map(v=>v.Value).filter(Boolean).map(v=>{
      const a=v.split('/');return a.length===3?a[2]+'-'+a[0].padStart(2,'0')+'-'+a[1].padStart(2,'0'):null;
    }).filter(d=>d&&d>='2025-07-01'&&d<='2026-06-30'&&new Date(d+'T00:00:00Z').getUTCDay()===1);
    state.dates_by_list[key]=[...new Set(dates)].sort();
    const c153=report153.calendars.find(x=>x.season===2025&&x.list===Number(t.list));
    if(c153){const s153=new Set((c153.versions??[]).map(v=>v.value).filter(Boolean).map(v=>{const a=v.split('/');return a[2]+'-'+a[0].padStart(2,'0')+'-'+a[1].padStart(2,'0');}));
      if(!state.dates_by_list[key].every(d=>s153.has(d)))throw new Error('STOP: mandagsversioner afviger mellem 153 og 154 for '+key);}
  }
  state.calendar_sources={'154_response_files':calFiles,'153_crosscheck_lists':[...new Set(state.selected.map(t=>t.list).filter(n=>[289,292].includes(n)))]};
  state.date_counts=Object.fromEntries(Object.entries(state.dates_by_list).map(([k,v])=>[k,v.length]));
  save(state);
  console.log(JSON.stringify({probes:state.probes,selected:state.selected,selection_note:state.selection_note,date_counts:state.date_counts,total_with_prior:PRIOR_CALLS+state.calls.length},null,2));
}
async function weekly(state) {
  if(!state.selected?.length)throw new Error('Kør --probe-events først.');
  const hashesBefore=await checkDb();
  for(const [name,hash] of Object.entries(state.hashes_before??{}))if(hashesBefore[name]!==hash)throw new Error('STOP: databasehash ændret siden profiludvalget: '+name);
  const cal153=read(path.join(RESULTS,'153-historisk-raekkevidde.json'));
  const source=cal153.calendars.filter(x=>x.season===2025&&[288,289,292].includes(x.list));
  if(!source.length)throw new Error('STOP: ingen kalenderdata fra 153 season=2025.');
  await contextIfNeeded(state);
  const first=state.selected[0],firstHashes=[];
  for(const t of state.selected){
    const key=String(t.list)+t.param,dates=state.dates_by_list[key]??[];
    if(dates.length!==49)throw new Error('STOP: '+key+' har '+dates.length+' mandagsversioner, ikke 49.');
    for(const d of dates){
      const k=t.id+'|'+key+'|'+d;if(state.weekly.some(x=>x.key===k))continue;
      await contextIfNeeded(state);
      const a=d.split('-'),body={rankinglistagegroupid:'15',rankinglistid:String(t.list),seasonid:'2025',
        rankinglistversiondate:a[1]+'/'+a[2]+'/'+a[0],agegroupid:'',classid:'',gender:'',clubid:'',searchall:false,
        regionid:'',pointsfrom:'',pointsto:'',rankingfrom:'',rankingto:'',birthdatefromstring:'',birthdatetostring:'',
        agefrom:'',ageto:'',playerid:t.id,param:t.param,pageindex:'0',sortfield:'0',getversions:true,getplayer:true};
      const r=await call(state,'POST',SERVICE+'GetRankingListPlayers',body,'ugeversion '+t.name+' '+d);
      const rows=parseRows(r.data?.Html),matches=rows.filter(x=>x.player_id===t.id);
      state.weekly.push({key:k,id:t.id,name:t.name,list:t.list,param:t.param,date:d,request:r.rec.number,
        sha256:r.rec.response_sha256_redacted,status:r.rec.status,bytes:r.rec.response_bytes,row_count:rows.length,
        match_count:matches.length,row:matches[0]??null,saved_file:r.rec.saved_file});
      save(state);
      if(t.id===first.id&&firstHashes.length<2){firstHashes.push(r.rec.response_sha256_redacted);
        if(firstHashes.length===2&&firstHashes[0]===firstHashes[1])throw new Error('STOP: de første to versionshashes for samme spiller er ens.');}
    }
  }
  state.weekly_complete=true;state.weekly_first_two_hashes=firstHashes;
  state.hashes_after=await dbHashes();
  state.hashes_unchanged=Object.keys(EXPECTED).every(n=>state.hashes_before[n]===state.hashes_after[n]&&state.hashes_after[n]===EXPECTED[n]);
  save(state);
  console.log('Ugeopslag færdige: '+state.weekly.length+'; kald inkl. Del A: '+(PRIOR_CALLS+state.calls.length));
}
function prepare(state) {
  const futureGets=1+Math.ceil((state.selected.length*49)/45);
  const planned=PRIOR_CALLS+state.calls.length+state.selected.length*49+futureGets;
  const lines=['# Opgave 158B — pointændring vs. kampe','',
    '## Udvalg og budget før ugeopslag','',
    'Udvalget er fastlagt efter lokal DB-screening og 15 eventprofilopslag. De fem første eventtabeller genbruges fra 158/154. To nye profiler klassificeres som kun holdkampe på baggrund af eventtabellen; Guanyan Chen har både turneringer og holdkampe.',
    '', '| Spiller | Profil-ID | Liste/parameter | Køn i national-spillere.db | Aldersgruppe-ID’er i holdkampdata | Begrundelse |',
    '|---|---:|---|---|---|'];
  for(const t of state.selected){
    const e=state.events[t.id],k=e.kinds;
    const why=e.cached_source?'Genbrugt Del A-eventtabel':k.tournament===0&&k.team>0&&k.unknown===0?'Kun holdkamprække i eventtabellen':k.tournament>0&&k.team>0?'Både turneringer og holdkampe':'Eventtabel; profiludvalg';
    lines.push('| '+t.name+' | '+t.id+' | '+t.list+'/'+t.param+' | '+t.gender+' | '+t.ages.join(', ')+' | '+why+' |');
  }
  lines.push('', 'Profilkontrol: fem genbrugte profiler havde både turnerings- og holdkamprækker i Del A. Blandt 15 nye profiler fandtes 2 kun-holdprofiler (hver 1 holdkamprække, 0 turneringsrækker, 0 ukendte eventrækker); Guanyan Chen havde 50 turnerings- og 13 holdkamprækker. Tomme layout-rækker er ikke events.',
    '', 'Budget før større kald: kalenderen fra 154 (GETVERSIONS-råsvar 022–027) har 49 mandagsversioner for hver valgt liste/parameter; 153 krydstjekker datoerne for lister 289/292. Ugeopslag: '+state.selected.length+' × 49 = '+(state.selected.length*49)+'. Planlagte GET-kald: 1 nyt kontekstkald og ca. '+(futureGets-1)+' genopfriskninger. Kandidatprofilopslag: '+state.probes.length+'; kontekstkald i kandidatrunden: '+state.calls.filter(c=>c.method==='GET').length+'; tidligere Del A: '+PRIOR_CALLS+'. Planlagt samlet: '+planned+' af loft '+TOTAL_LIMIT+'; der er plads til '+(TOTAL_LIMIT-planned)+' ekstra forsøg/retries.',
    '', 'Ugeopslagene starter først efter dette forhåndsudvalg. Den endelige rapport erstatter denne forberedelsesnote.');
  const json={task:'158B',status:'udvalg_fastlagt_før_ugeopslag',selected:state.selected,probe_results:state.probes,
    selection_note:state.selection_note,weekly_date_counts:state.date_counts,weekly_lookup_budget:state.selected.length*49,
    planned_context_gets:futureGets,prior_del_a_calls:PRIOR_CALLS,candidate_event_calls:state.probes.length,
    planned_total:planned,total_limit:TOTAL_LIMIT,hashes_before:state.hashes_before,calls:state.calls};
  fs.writeFileSync(path.join(RESULTS,'158b-pointaendring-vs-kampe.md'),lines.join('\n')+'\n');
  fs.writeFileSync(path.join(RESULTS,'158b-pointaendring-vs-kampe.json'),JSON.stringify(json,null,2)+'\n');
  console.log('Forhåndsrapport skrevet. Planlagt total inkl. Del A: '+planned+' kald.');
}
async function partial(state) {
  const after=await dbHashes();
  const same=Object.keys(EXPECTED).every(n=>state.hashes_before?.[n]===after[n]&&after[n]===EXPECTED[n]);
  const selected=state.selected??[],weekly=state.weekly??[];
  const unloggedFile=path.join(RAW,'call-207.json.gz');
  const unloggedText=fs.existsSync(unloggedFile)?zlib.gunzipSync(fs.readFileSync(unloggedFile)) : Buffer.alloc(0);
  const unlogged={number:207,method:'GET',label:'frisk offentlig kontekst (checkpoint write fejlede)',url:PAGE,
    fields_changed:{},status:null,status_note:'ukendt: metadata blev ikke gemt før fejlen',response_bytes:unloggedText.length,
    response_sha256_redacted:unloggedText.length?sha(unloggedText):null,saved_file:fs.existsSync(unloggedFile)?'call-207.json.gz':null};
  const perPlayer=selected.map(t=>({target:t,weekly_count:weekly.filter(w=>w.id===t.id).length,
    first:weekly.find(w=>w.id===t.id)?.date??null,last:weekly.filter(w=>w.id===t.id).at(-1)?.date??null,
    event_kinds:state.events[t.id]?.parsed?kindCounts(state.events[t.id].parsed):state.events[t.id]?.kinds??null}));
  const report={task:'158B pointændring vs kampe',status:'afbrudt_checkpointfejl',prior_del_a_calls:PRIOR_CALLS,
    registered_calls:state.calls.length,unlogged_call:unlogged,total_attempts:PRIOR_CALLS+state.calls.length+1,
    call_limit:TOTAL_LIMIT,weekly_requested:selected.length*49,weekly_saved:weekly.length,
    weekly_remaining:selected.length*49-weekly.length,selection:selected,profile_progress:perPlayer,
    probes:state.probes,selection_note:state.selection_note,calls:state.calls.concat([unlogged]),
    hashes_before:state.hashes_before,hashes_after:after,hashes_unchanged:same,
    stop_reason:'Node-fejl ved skrivning af state.json efter kontekst-GET; status for det sidste svar kunne ikke persisteres. Ingen flere netværkskald blev sendt.'};
  fs.writeFileSync(path.join(RESULTS,'158b-pointaendring-vs-kampe.json'),JSON.stringify(report,null,2)+'\n');
  const lines=['# Opgave 158B — pointændring vs. kampe','',
    '**Status: delvist udført; stoppet ved checkpoint-fejl.** Sammenligningen før/efter, ugeklassifikation, falsk positive/negative og Del C er ikke beregnet.',
    '', '## Udvalg og profilkontrol','',
    '| Spiller | Profil-ID | Liste/parameter | Køn | Aldersgruppe-ID’er i holdkampdata | Eventtabel |',
    '|---|---:|---|---|---|---|'];
  for(const p of perPlayer){const t=p.target,k=p.event_kinds;const kindText=k?String(k.tournament)+' turnering, '+String(k.team)+' holdkamp, '+String(k.unknown)+' ukendt':'ukendt';
    lines.push('| '+t.name+' | '+t.id+' | '+t.list+'/'+t.param+' | '+t.gender+' | '+t.ages.join(', ')+' | '+kindText+' |');}
  lines.push('', '15 nye eventprofilopslag gav to profiler med én holdkamprække, nul turneringsrækker og nul ukendte eventrækker (Chastine Christiansen og Sophia Rita Giuliani). Guanyan Chen havde både turnerings- og holdkamprækker. De fem Del A-profiler genbrugtes og havde begge typer. Udvalget dækker fire kvinder og fire mænd.',
    '', '## Kalender og budget','',
    'Ugekalenderen blev læst fra 154’s gemte versionssvar 022–027 og krydstjekket mod 153 for 289/292. Der er 49 mandagsversioner pr. valgt liste/parameter. Planen var 392 ugeopslag; 180 blev gemt med HTTP 200, og 212 mangler. Del A brugte 4 kald. I denne kørsel er 202 kald registreret, og ét ekstra GET-svar (kald 207 samlet) blev gemt råt, men status nåede ikke loggen. Forsøg i alt: 207/480. Budgettet er fortsat tilstrækkeligt til genoptagelse.',
    '', '## Ugeopslag indtil stop','',
    '| Spiller | Gemte ugeopslag | Første dato | Sidste dato |','|---|---:|---|---|');
  for(const p of perPlayer)lines.push('| '+p.target.name+' | '+p.weekly_count+' | '+(p.first??'—')+' | '+(p.last??'—')+' |');
  lines.push('', 'Pointændring/event-sammenligning og falsk positive/negative er ikke kørt, fordi ugekalenderen er ufuldstændig. Ingen nulpoint er udledt for fravær.',
    '', '## Databaseværn','',
    '| Database | SHA-256 før | SHA-256 efter |','|---|---|---|');
  for(const n of Object.keys(EXPECTED))lines.push('| '+n+' | '+(state.hashes_before?.[n]??'ukendt')+' | '+after[n]+' |');
  lines.push('', 'Alle fem hashes er uændrede og svarer til de forventede værdier: '+same+'. Databaser åbnet readOnly og PRAGMA query_only=ON. git diff --check bestod.',
    '', '## Forespørgselslog','',
    'For kald 1–4 se loggen i statistik/results/158-turneringer.json. De resterende registrerede kald og det ufuldstændige sidste GET ligger i JSON’en og statistik/results/158b-raa-svar/forespoergsler.json. Kald 207: svarbytes '+unlogged.response_bytes+', redigeret SHA-256 '+(unlogged.response_sha256_redacted??'ukendt')+'; HTTP-status ukendt, fordi checkpointskrivningen fejlede.',
    '', '## Spørgsmål / blokering','',
    'Node fejlede med UNKNOWN: unknown error, open .../158b-raa-svar/state.json under persist efter et kontekst-GET. Råsvar call-207.json.gz findes og indeholder redigeret SR_CallbackContext, men HTTP-status kunne ikke genskabes. Skal checkpointskrivningen gøres atomisk, hvorefter kørslen genoptages med de 212 manglende ugeopslag?');
  fs.writeFileSync(path.join(RESULTS,'158b-pointaendring-vs-kampe.md'),lines.join('\n')+'\n');
  console.log(JSON.stringify({status:report.status,total_attempts:report.total_attempts,weekly_saved:report.weekly_saved,
    hashes_unchanged:same,report:path.join(RESULTS,'158b-pointaendring-vs-kampe.md')},null,2));
}
if(process.argv[2]==='--probe-events'){
  const s=load();s.hashes_before??=await checkDb();await probes(s);
}else if(process.argv[2]==='--prepare'){
  prepare(load());
}else if(process.argv[2]==='--partial'){
  await partial(load());
}else if(process.argv[2]==='--weekly'){
  const s=load();s.hashes_before??=await checkDb();await weekly(s);
}else if(process.argv[2]==='--analyze'){
  console.log('Analyse genereres efter kontrol af de gemte event- og uge-svar.');
}else{
  console.log('Brug --probe-events, --weekly eller --analyze.');
}
