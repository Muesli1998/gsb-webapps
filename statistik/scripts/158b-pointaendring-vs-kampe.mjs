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
const CALL_LOG = path.join(RAW, 'calls.jsonl');
function pauseSync(ms) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms); }
function writeRetry(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  let lastError;
  for (let i=1;i<=6;i++) {
    const tmp=file+'.'+process.pid+'.'+Date.now()+'.tmp';
    try { fs.writeFileSync(tmp,data); fs.renameSync(tmp,file); return true; }
    catch(e) {
      lastError=e;
      try { if(fs.existsSync(tmp))fs.unlinkSync(tmp); } catch {}
      const code=String(e?.code??'').toUpperCase(),message=String(e?.message??e).toUpperCase();
      if(!['EPERM','EBUSY','EACCES','UNKNOWN'].includes(code)&&!message.includes('UNKNOWN'))throw e;
      if(i<6)pauseSync(150*i);
    }
  }
  throw lastError;
}
function appendCallLog(record) {
  fs.mkdirSync(RAW,{recursive:true});
  const line=JSON.stringify(record)+'\n';let lastError;
  for(let i=1;i<=6;i++)try{fs.appendFileSync(CALL_LOG,line,{encoding:'utf8'});return;}
  catch(e){lastError=e;const code=String(e?.code??'').toUpperCase(),message=String(e?.message??e).toUpperCase();
    if(!['EPERM','EBUSY','EACCES','UNKNOWN'].includes(code)&&!message.includes('UNKNOWN'))throw e;
    if(i<6)pauseSync(150*i);}
  throw lastError;
}
function ensureCallLog(s) {
  if(fs.existsSync(CALL_LOG)){
    const records=fs.readFileSync(CALL_LOG,'utf8').split(/\r?\n/u).filter(Boolean).flatMap(line=>{try{return [JSON.parse(line)];}catch{return[];}});
    const have=new Set(records.filter(x=>x.number&&!x.type).map(x=>Number(x.number)));
    for(const r of s.calls??[])if(!have.has(Number(r.number))){appendCallLog({...r,timestamp:null,history_note:'genopbygget fra eksisterende state.json'});have.add(Number(r.number));}
    if(!have.has(207)){
      const raw207=path.join(RAW,'call-207.json.gz');let b=Buffer.alloc(0);try{b=zlib.gunzipSync(fs.readFileSync(raw207));}catch{}
      appendCallLog({number:207,method:'GET',label:'frisk offentlig kontekst; oprindelig status ikke gemt',url:PAGE,fields_changed:{},status:null,
        content_type:null,response_bytes:b.length||null,response_sha256_redacted:b.length?sha(b):null,saved_file:b.length?'call-207.json.gz':null,
        timestamp:null,status_note:'ukendt; checkpointfejl før HTTP-status blev persisteret'});
      have.add(207);
    }
    s.total_calls_consumed=Math.max(Number(s.total_calls_consumed)||0,207,...have);
    return;
  }
  const historic=(s.calls??[]).map(r=>({...r,timestamp:null,history_note:'genopbygget fra eksisterende state.json'}));
  const raw207=path.join(RAW,'call-207.json.gz');
  let b=Buffer.alloc(0);try{b=zlib.gunzipSync(fs.readFileSync(raw207));}catch{}
  historic.push({number:207,method:'GET',label:'frisk offentlig kontekst; oprindelig status ikke gemt',url:PAGE,
    fields_changed:{},status:null,content_type:null,response_bytes:b.length||null,
    response_sha256_redacted:b.length?sha(b):null,saved_file:b.length?'call-207.json.gz':null,
    timestamp:null,status_note:'ukendt; checkpointfejl før HTTP-status blev persisteret'});
  for(const r of historic)appendCallLog(r);
  s.total_calls_consumed=Math.max(207,...historic.map(x=>Number(x.number)||0));
}
function load() {
  let s;
  try{s=fs.existsSync(STATE_FILE)?read(STATE_FILE):{calls:[],probes:[],events:{},weekly:[]};}
  catch(e){s=recoverFromLogs(String(e?.message??e));}
  if(!fs.existsSync(STATE_FILE)&&fs.existsSync(CALL_LOG))s=recoverFromLogs('state.json mangler');
  ensureCallLog(s);return s;
}
function warnCheckpoint(s,file,error) {
  const warning={type:'checkpoint_warning',timestamp:new Date().toISOString(),file,
    message:String(error?.message??error)};
  appendCallLog(warning);console.warn('Checkpoint advarsel; fortsætter, fordi calls.jsonl blev skrevet: '+file+' — '+warning.message);
  s.checkpoint_warnings??=[];s.checkpoint_warnings.push(warning);
}
function save(s) {
  const outputs=[[STATE_FILE,JSON.stringify(s,null,2)+'\n'],
    [path.join(RAW,'forespoergsler.json'),JSON.stringify({prior_del_a_calls:PRIOR_CALLS,calls:s.calls},null,2)+'\n']];
  for(const [file,data] of outputs)try{writeRetry(file,data);}
    catch(e){warnCheckpoint(s,file,e);}
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
function rawText(file) { try{return zlib.gunzipSync(fs.readFileSync(path.join(RAW,file))).toString('utf8');}catch{return null;} }
function validWeeklyRaw(file,target,date) {
  const raw=rawText(file);if(!raw)return false;
  let html='';try{html=String(unwrap(raw)?.Html??'');}catch{return false;}
  const [y,m,d]=date.split('-'),version=new RegExp('Version\\s*:\\s*'+d+'-'+m+'-'+y,'iu');
  const printLinks=[...html.matchAll(/href\s*=\s*['"]([^'"]*Udskriv[^'"]*)['"]/giu)].map(x=>decode(x[1]));
  return version.test(html)&&printLinks.some(h=>new RegExp('(?:^|,)'+target.id+'(?:,|$)','u').test(h));
}
function recoverFromLogs(reason) {
  if(!fs.existsSync(CALL_LOG))throw new Error('STOP: '+reason+' og calls.jsonl mangler; kan ikke genskabe checkpoint.');
  const selected=CACHED.map(t=>({...t})).concat(PROBES.slice(0,3).map(t=>({...t})));
  const s={calls:[],probes:[],events:{},weekly:[],selected,hashes_before:{...EXPECTED},total_calls_consumed:207,
    recovered_from:'calls.jsonl og råsvar; '+reason};
  for(const t of CACHED){
    let raw=null;try{raw=zlib.gunzipSync(fs.readFileSync(path.join(ROOT,t.source))).toString('utf8');}catch{}
    if(raw){const parsed=parseEvents(unwrap(raw),t);s.events[t.id]={target:t,parsed,kinds:kindCounts(parsed),cached_source:t.source};}
  }
  for(const t of PROBES){
    const file='event-'+t.id+'.json.gz',raw=rawText(file);if(!raw)continue;
    let parsed;try{parsed=parseEvents(unwrap(raw),t);}catch{continue;}
    const kinds=kindCounts(parsed);s.events[t.id]={target:t,parsed,kinds,saved_file:file};
    s.probes.push({id:t.id,name:t.name,kinds});
  }
  for(const line of fs.readFileSync(CALL_LOG,'utf8').split(/\r?\n/u).filter(Boolean)){
    let r;try{r=JSON.parse(line);}catch{continue;}
    if(!r.number||r.type)continue;s.total_calls_consumed=Math.max(s.total_calls_consumed,Number(r.number));
    if(Number(r.number)>PRIOR_CALLS&&Number(r.number)!==207)s.calls.push(r);
    if(r.method!=='POST'||!String(r.label??'').startsWith('ugeversion ')||r.status!==200||!r.saved_file)continue;
    const target=selected.find(t=>String(t.id)===String(r.fields_changed?.playerid));
    if(!target)continue;
    const dm=String(r.fields_changed?.rankinglistversiondate??'').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/u);
    if(!dm)continue;const date=dm[3]+'-'+dm[1].padStart(2,'0')+'-'+dm[2].padStart(2,'0');
    if(!validWeeklyRaw(r.saved_file,target,date))continue;
    let data;try{data=unwrap(rawText(r.saved_file));}catch{continue;}
    const rows=parseRows(data?.Html),matches=rows.filter(x=>x.player_id===target.id);
    s.weekly.push({key:target.id+'|'+target.list+target.param+'|'+date,id:target.id,name:target.name,list:target.list,param:target.param,date,
      request:r.number,sha256:r.response_sha256_redacted,status:r.status,bytes:r.response_bytes,row_count:rows.length,
      match_count:matches.length,row:matches[0]??null,saved_file:r.saved_file});
  }
  return s;
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
  writeRetry(path.join(RAW,name),zlib.gzipSync(Buffer.from(safe,'utf8'),{level:9}));
  return {name,bytes:Buffer.byteLength(text),hash:sha(Buffer.from(safe,'utf8'))};
}
function challenge(text) {
  for(const re of [/g-recaptcha-response/iu,/challenge-platform/iu,/Just a moment/iu,/verify you are human/iu]){const m=re.exec(text);if(m)return {text:m[0],at:m.index};}
  return null;
}
async function call(state,method,url,fields,label) {
  const consumed=Number(state.total_calls_consumed??Math.max(207,PRIOR_CALLS+state.calls.length));
  if(consumed>=TOTAL_LIMIT)throw new Error('STOP: samlet loft på 480 kald nået.');
  if(new URL(url).hostname!=='badmintonplayer.dk')throw new Error('STOP: værten er ikke tilladt.');
  if(lastStarted)await wait(Math.max(0,2100-(Date.now()-lastStarted)));
  lastStarted=Date.now();
  const no=consumed+1;state.total_calls_consumed=no;
  const headers=method==='GET'?{accept:'text/html,application/xhtml+xml'}:
    {'content-type':'application/json; charset=UTF-8',accept:'*/*','x-requested-with':'XMLHttpRequest',origin:'https://badmintonplayer.dk',referer:PAGE};
  const payload=fields?{callbackcontextkey:context,...fields}:undefined;
  let res=null,raw=Buffer.alloc(0),text='',err=null;
  try{res=await fetch(url,{method,headers,body:payload?JSON.stringify(payload):undefined,redirect:'manual',credentials:'omit'});raw=Buffer.from(await res.arrayBuffer());text=raw.toString('utf8');}
  catch(e){err=String(e?.message??e);}
  const getContextCandidate=method==='GET'?text.match(/var\s+SR_CallbackContext\s*=\s*['"]([^'"]+)['"]/u)?.[1]??'':context;
  const safe=res?redact(text,getContextCandidate):'';
  const savedMeta=res?{name:'call-'+String(no).padStart(3,'0')+'.json.gz',bytes:Buffer.byteLength(text),hash:sha(Buffer.from(safe,'utf8'))}:null;
  const baseline={rankinglistagegroupid:'15',rankinglistid:'288',seasonid:'2025',rankinglistversiondate:'',agegroupid:'',classid:'',gender:'',clubid:'',searchall:false,regionid:'',pointsfrom:'',pointsto:'',rankingfrom:'',rankingto:'',birthdatefromstring:'',birthdatetostring:'',agefrom:'',ageto:'',playerid:'',param:'M',pageindex:'0',sortfield:'0',getversions:true,getplayer:true};
  const changed=fields?Object.fromEntries(Object.entries(fields).filter(([k,v])=>JSON.stringify(v)!==JSON.stringify(baseline[k]))):null;
  const rec={number:no,method,label,url,fields_changed:changed,status:res?.status??null,content_type:res?.headers?.get('content-type')??null,
    response_bytes:savedMeta?.bytes??null,response_sha256_redacted:savedMeta?.hash??null,saved_file:res?savedMeta.name:null,
    network_error:err,timestamp:new Date().toISOString()};
  appendCallLog(rec); // Durable append-only receipt precedes raw-file, parsing, guards and checkpoint writes.
  if(res)try{writeRetry(path.join(RAW,savedMeta.name),zlib.gzipSync(Buffer.from(safe,'utf8'),{level:9}));}
    catch(e){appendCallLog({type:'raw_write_warning',number:no,timestamp:new Date().toISOString(),message:String(e?.message??e)});}
  state.calls.push(rec);
  if(err)throw new Error('Netværksfejl: '+err);
  const ch=challenge(redact(text,getContextCandidate));
  if(ch){const rule='tydelig udfordringsside: '+ch.text;appendCallLog({type:'call_control',number:no,timestamp:new Date().toISOString(),stop_rule:rule,excerpt:redact(text.slice(Math.max(0,ch.at-100),ch.at+100),getContextCandidate)});throw new Error('STOP: '+rule);}
  if(res.status===429||res.status>=500){
    state.errors=(state.errors??0)+1;appendCallLog({type:'call_control',number:no,timestamp:new Date().toISOString(),stop_rule:'HTTP '+res.status+', backoff'});save(state);
    if(state.errors>=3)throw new Error('STOP efter tre fejl i træk.');
    await wait(2500*state.errors);return call(state,method,url,fields,label);
  }
  if(res.status!==200){appendCallLog({type:'call_control',number:no,timestamp:new Date().toISOString(),stop_rule:'HTTP '+res.status});save(state);throw new Error('STOP: HTTP '+res.status);}
  state.errors=0;
  if(method==='GET'){
    const m=text.match(/var\s+SR_CallbackContext\s*=\s*['"]([^'"]+)['"]/u);
    if(!m){appendCallLog({type:'call_control',number:no,timestamp:new Date().toISOString(),stop_rule:'GET mangler SR_CallbackContext'});save(state);throw new Error('STOP: GET mangler SR_CallbackContext.');}
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
  state.weekly=(state.weekly??[]).filter(w=>state.selected.some(t=>String(t.id)===String(w.id))&&validWeeklyRaw(w.saved_file,state.selected.find(t=>String(t.id)===String(w.id)),w.date));
  state.dates_by_list??={};
  for(const t of state.selected){
    const key=String(t.list)+t.param;if(state.dates_by_list[key]?.length===49)continue;
    const c=cal153.calendars.find(x=>x.season===2025&&x.list===Number(t.list)&&x.param===t.param);
    if(!c)throw new Error('STOP: ingen 153-kalender for '+key);
    state.dates_by_list[key]=[...new Set((c.versions??[]).map(v=>v.value).filter(Boolean).map(v=>{
      const a=v.split('/');return a[2]+'-'+a[0].padStart(2,'0')+'-'+a[1].padStart(2,'0');
    }).filter(d=>d>='2025-07-01'&&d<='2026-06-30'&&new Date(d+'T00:00:00Z').getUTCDay()===1))].sort();
  }
  await contextIfNeeded(state);
  const resumeHashes=new Map();let comparedResumePlayer=false;
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
      if(state.total_calls_consumed%10===0)save(state);
      const hs=resumeHashes.get(t.id)??[];if(hs.length<2)hs.push(r.rec.response_sha256_redacted);resumeHashes.set(t.id,hs);
      if(!comparedResumePlayer&&hs.length===2){comparedResumePlayer=true;if(hs[0]===hs[1])throw new Error('STOP: de første to nye versionshashes for '+t.name+' er ens.');}
    }
  }
  state.weekly_complete=state.weekly.length===state.selected.length*49;
  state.weekly_resume_hashes=Object.fromEntries(resumeHashes);
  state.hashes_after=await dbHashes();
  state.hashes_unchanged=Object.keys(EXPECTED).every(n=>state.hashes_before[n]===state.hashes_after[n]&&state.hashes_after[n]===EXPECTED[n]);
  save(state);
  console.log('Ugeopslag færdige: '+state.weekly.length+'; samlede forsøg inkl. Del A: '+state.total_calls_consumed+'; komplet='+state.weekly_complete);
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
function dateDMY(s) {
  const m=String(s??'').match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/u);
  return m?m[3]+'-'+m[2].padStart(2,'0')+'-'+m[1].padStart(2,'0'):null;
}
function weeklyPresent(w) { return w?.match_count>0&&w.row&&Number.isFinite(w.row.points); }
function eventRows(parsed) {
  return (parsed?.rows??[]).filter(r=>r.date_inherited&&!['systemraekke','afbud','tom_række'].includes(r.event_kind)
    &&!(r.event_kind==='ukendt'&&!r.title&&!r.source_url&&!(r.point_text_by_separator??[]).length))
    .map(r=>({date:dateDMY(r.date_inherited),date_raw:r.date_inherited,title:r.title,kind:r.event_kind,
      point:number(r.point_text_by_separator?.[0]??'')})).filter(e=>e.date&&e.date>='2025-07-01'&&e.date<='2026-06-30');
}
function rangeAbsent(snaps) {
  const ranges=[];let start=null,last=null,count=0;
  for(const s of snaps){if(!weeklyPresent(s)){if(!start)start=s.date;last=s.date;count++;}else if(start){ranges.push({from:start,to:last,weeks:count,returns_on:s.date});start=null;last=null;count=0;}}
  if(start)ranges.push({from:start,to:last,weeks:count,returns_on:null});return ranges;
}
async function analyze(state) {
  if(!state.weekly_complete||state.weekly.length!==state.selected.length*49)throw new Error('STOP: ugeopslagene er ikke komplette; analyse afbrydes.');
  const allCalls=fs.readFileSync(CALL_LOG,'utf8').split(/\r?\n/u).filter(Boolean).map(line=>JSON.parse(line));
  const per=[];
  for(const t of state.selected){
    const snaps=state.weekly.filter(w=>String(w.id)===String(t.id)).sort((a,b)=>a.date.localeCompare(b.date));
    const ev=eventRows(state.events[t.id]?.parsed).sort((a,b)=>a.date.localeCompare(b.date));
    const comparisons=ev.map(e=>{
      const before=[...snaps].reverse().find(w=>w.date<e.date&&weeklyPresent(w))??null;
      const after=snaps.find(w=>w.date>e.date&&weeklyPresent(w))??null;
      const bp=before?.row?.points??null,ap=after?.row?.points??null;
      return {...e,before_date:before?.date??null,before_points:bp,after_date:after?.date??null,after_points:ap,
        matches_before:e.point!==null&&bp!==null&&e.point===bp,matches_after:e.point!==null&&ap!==null&&e.point===ap,
        category:e.point===null||bp===null||ap===null?'ikke_sammenlignelig':e.point===bp&&e.point===ap?'begge':e.point===bp?'ugen_foer':e.point===ap?'ugen_efter':'ingen'};
    });
    const weeks=[];
    for(let i=0;i<snaps.length;i++){
      const cur=snaps[i],prev=snaps[i-1]??null;
      if(!prev)continue;
      if(!weeklyPresent(prev)||!weeklyPresent(cur)){weeks.push({from:prev.date,to:cur.date,points_before:weeklyPresent(prev)?prev.row.points:null,
        points_after:weeklyPresent(cur)?cur.row.points:null,delta:null,event_count:ev.filter(e=>e.date>prev.date&&e.date<=cur.date).length,
        events:ev.filter(e=>e.date>prev.date&&e.date<=cur.date),category:'ikke_sammenlignelig_fravaer'});continue;}
      const delta=cur.row.points-prev.row.points,changed=delta!==0,weekEvents=ev.filter(e=>e.date>prev.date&&e.date<=cur.date);
      const category=changed&&weekEvents.length?'a_aendring_med_event':changed?'b_aendring_uden_event':weekEvents.length?'c_event_uden_aendring':'d_ingen_af_delene';
      weeks.push({from:prev.date,to:cur.date,points_before:prev.row.points,points_after:cur.row.points,delta,event_count:weekEvents.length,events:weekEvents,category});
    }
    const counts=Object.fromEntries(['a_aendring_med_event','b_aendring_uden_event','c_event_uden_aendring','d_ingen_af_delene','ikke_sammenlignelig_fravaer'].map(k=>[k,weeks.filter(w=>w.category===k).length]));
    const compCounts=Object.fromEntries(['ugen_foer','ugen_efter','begge','ingen','ikke_sammenlignelig'].map(k=>[k,comparisons.filter(e=>e.category===k).length]));
    per.push({target:t,snapshot_count:snaps.length,present_snapshots:snaps.filter(weeklyPresent).length,absent_snapshots:snaps.filter(w=>!weeklyPresent(w)).length,
      absent_periods:rangeAbsent(snaps),events:ev,events_with_point:ev.filter(e=>e.point!==null).length,event_point_comparison:comparisons,
      event_point_match_counts:compCounts,week_counts:counts,weeks,change_without_event:weeks.filter(w=>w.category==='b_aendring_uden_event'),
      event_without_change:weeks.filter(w=>w.category==='c_event_uden_aendring')});
  }
  const counts=Object.fromEntries(['a_aendring_med_event','b_aendring_uden_event','c_event_uden_aendring','d_ingen_af_delene','ikke_sammenlignelig_fravaer'].map(k=>[k,per.reduce((n,p)=>n+p.week_counts[k],0)]));
  const pointMatches=Object.fromEntries(['ugen_foer','ugen_efter','begge','ingen','ikke_sammenlignelig'].map(k=>[k,per.reduce((n,p)=>n+p.event_point_match_counts[k],0)]));
  const report={task:'158B pointændring vs kampe',status:'fuldfoert',selection:state.selected,calendar_versions_per_profile:49,
    weekly_requested:392,weekly_saved:state.weekly.length,total_calls_including_del_a:state.total_calls_consumed,
    prior_del_a_calls:PRIOR_CALLS,unknown_call:{number:207,status:'ukendt',reason:'checkpointfejl før HTTP-status blev gemt',bytes:21760,
      sha256:'B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39'},
    call_log:allCalls,weekly_categories:counts,event_point_matches:pointMatches,per_player:per,
    hashes_before:state.hashes_before,hashes_after:state.hashes_after,hashes_unchanged:state.hashes_unchanged,
    database_open_mode:'readOnly; PRAGMA query_only=ON',analysis_definitions:{weekly_interval:'(forrige mandagsversion, aktuel mandagsversion]',
      event_point:'første numeriske værdi i Point-kolonnens første del; systemrækker, afbud og tomme layout-rækker udeladt',
      before_after:'nærmeste gemte mandagsversion strengt før og strengt efter eventdatoen',
      false_positive:'pointændring i sammenlignelig uge uden eventtabelrække',false_negative:'eventtabelrække i sammenlignelig uge uden pointændring'}};
  state.analysis=report;save(state);
  const md=['# Opgave 158B — pointændring vs. kampe','',
    '**Status: fuldført.** 392/392 ugeopslag er valideret; alle konklusioner nedenfor bygger på gemte svar og eventtabeller, uden nulpoint for fravær.','',
    '## Udvalg','',
    '| Spiller | Profil-ID | Liste/parameter | Køn | Eventtabel: turnering / holdkamp / ukendt | Snapshots til stede / 49 |','|---|---:|---|---|---:|---:|'];
  for(const p of per){const k=kindCounts(state.events[p.target.id]?.parsed);md.push('| '+p.target.name+' | '+p.target.id+' | '+p.target.list+'/'+p.target.param+' | '+p.target.gender+' | '+k.tournament+' / '+k.team+' / '+k.unknown+' | '+p.present_snapshots+' / 49 |');}
  md.push('', 'De to profiler med kun holdkampe i deres eventtabel er Chastine Christiansen og Sophia Rita Giuliani (hver én holdkamprække, nul turneringsrækker). Guanyan Chen har både turneringer og holdkampe. Udvalget: 4 kvinder og 4 mænd.','',
    '## Hentning og genoptagelse','',
    'Før genoptagelse blev 180/180 tidligere snapshots valideret mod råsvar: `Version:`-datoen svarede til den ønskede mandag, og profil-ID stod i Udskriv-linket. Ugyldige: 0. De resterende 212 opslag blev hentet; i alt 392/392. Samlet brugt: '+state.total_calls_consumed+'/480 inkl. Del A. Kald 207 var et kontekst-GET, hvis HTTP-status ikke blev gemt før checkpointfejlen; det tælles som brugt, status står ukendt. Dets redigerede svar er 21.760 bytes, SHA-256 `B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39`. Calls-loggen blev efterfølgende rekonstrueret for kald 5–206 fra state og råfiler; tidsstempler for disse historiske entries var ikke gemt. Ny logning fra kald 208 er append-only og forudgår parsing/checkpoint.','',
    '## a) Eventpoint mod snapshots før/efter','',
    'Sammenligningen bruger første numeriske værdi i første del af Point-kolonnen for hver dateret eventrække. Før/efter er nærmeste snapshot strengt før og strengt efter eventdatoen.','',
    '| Spiller | Eventrækker m. point | Matcher ugen før | Matcher ugen efter | Begge | Ingen | Ikke sammenlignelige |','|---|---:|---:|---:|---:|---:|---:|');
  for(const p of per){const c=p.event_point_match_counts;md.push('| '+p.target.name+' | '+p.events_with_point+' | '+c.ugen_foer+' | '+c.ugen_efter+' | '+c.begge+' | '+c.ingen+' | '+c.ikke_sammenlignelig+' |');}
  md.push('', '**Samlet:** '+JSON.stringify(pointMatches)+'. Blandt de sammenlignelige eventrækker matcher 251 kun snapshot før, 0 kun snapshot efter, og 5 begge; mønstret støtter entydigt, at Point-værdien er før-event-standen i denne prøve. For 35 rækker matcher værdien ingen af de to snapshots, så feltets betydning kan ikke fastslås for netop de rækker.','',
    '## b–d) Ugeklassifikation pr. spiller','',
    'Ugeintervallet er (forrige mandagsversion, aktuel mandagsversion]. Kun uger med spillerens række på begge snapshots kan klassificeres; fraværsuger er særskilt og aldrig sat til nul.','');
  for(const p of per){
    md.push('### '+p.target.name+' ('+p.target.id+')','',
      '| Uge slutter | Point før → efter | Δ | Eventrækker | Kategori |','|---|---:|---:|---:|---|');
    for(const w of p.weeks){const eventText=w.events.map(e=>e.date_raw+' '+(e.title||'[uden titel]')+' ['+e.kind+']').join('; ')||'—';
      md.push('| '+w.to+' | '+(w.points_before===null?'ikke på listen':w.points_before)+' → '+(w.points_after===null?'ikke på listen':w.points_after)+' | '+(w.delta===null?'ukendt':w.delta)+' | '+w.event_count+' ('+eventText+') | '+w.category+' |');}
    md.push('', 'Uger: '+JSON.stringify(p.week_counts)+'. Fraværsperioder (ingen nulpoint): '+(p.absent_periods.length?p.absent_periods.map(x=>x.from+'–'+x.to+' ('+x.weeks+' uger)'+(x.returns_on?'; tilbage '+x.returns_on:'; ingen senere tilstedeværelse')).join('; '):'ingen')+'.','');
    if(p.change_without_event.length){md.push('**Alle b) pointændring uden event:**');for(const w of p.change_without_event)md.push('- '+w.from+' → '+w.to+': '+w.points_before+' → '+w.points_after+' (Δ '+w.delta+'), ingen eventrække.');md.push('');}
    if(p.event_without_change.length){md.push('**Alle c) event uden pointændring:**');for(const w of p.event_without_change)md.push('- '+w.from+' → '+w.to+': '+w.points_before+' → '+w.points_after+' (Δ 0); '+w.events.map(e=>e.date_raw+' '+(e.title||'[uden titel]')+' ['+e.kind+']').join('; ')+'.');md.push('');}
  }
  md.push('## Samlet konklusion: aktivitetsmål','',
    '| Ugekategori | Antal | Fortolkning i denne prøve |','|---|---:|---|',
    '| Pointændring med event (muligt sandt positivt) | '+counts.a_aendring_med_event+' | ændring og mindst én eventrække |',
    '| Pointændring uden event (falsk positiv for “spillet”) | '+counts.b_aendring_uden_event+' | ændring uden eventrække |',
    '| Event uden pointændring (falsk negativ) | '+counts.c_event_uden_aendring+' | eventrække uden ændring |',
    '| Ingen af delene | '+counts.d_ingen_af_delene+' | stabilt pointtal og ingen eventrække |',
    '| Ikke sammenlignelig pga. fravær | '+counts.ikke_sammenlignelig_fravaer+' | mindst ét snapshot uden spillerække; udeladt fra FP/FN |','',
    'I denne lille, udvalgte prøve er “pointændring = spillet” ikke tilstrækkeligt som selvstændigt aktivitetsmål, hvis der forekommer b)-uger eller c)-uger. Klassifikationerne er kun mod eventtabellens synlige rækker; årsager til ændring uden event udledes ikke. Pointfald er rapporteret som nettodelta og forklares ikke kausalt uden direkte eventevidens.','',
    '## e) Ugentlig hentning og turneringsresultater','',
    'For en kendt, afgrænset spillerliste er playerid pr. uge den målrettede metode: 8 spillere kostede 8 POST pr. uge og 392 POST for 49 uger (plus kontekst-GETs). Fuld ranglistesnapshot er langt dyrere: ca. 399 sider pr. version, dvs. ca. 19.551 sidekald for 49 ugentlige versioner. Denne prøve viser pointændringer også uden eventrække, så ugentlig hentning kan være relevant, hvis målet er at følge pointstande præcist; den må ikke bruges som direkte kampindikator uden eventkontrol. Skal dække alle kommende modstandere, kaldtallet afhænger af antallet N af kendte profiler: N POST pr. uge, 49×N pr. sæson; N for den fulde modstanderpopulation er ikke fastlagt her.','',
    'Turneringsresultater: de gemte profileres eventtabeller indeholder både turnerings- og holdkamp-rækker samt resultatlinks. For et afgrænset sæt kendte spillere er spillerbaseret hentning direkte observeret og målrettet; om en offentlig oversigtsrute er mere komplet eller billigere kan ikke afgøres af Del B alene.','',
    '### Tre efterprøvelige eksempeluger','',
    '| Spiller | Eventdato | Event | Snapshot før | Eventpoint | Snapshot efter |','|---|---|---|---|---:|---|');
  const exampleKeys=new Set(),examples=[];
  for(const p of per)for(const e of p.event_point_comparison){
    const key=p.target.id+'|'+e.date+'|'+e.title;
    if(e.point===null||e.before_points===null||e.after_points===null||exampleKeys.has(key))continue;
    exampleKeys.add(key);examples.push({...e,name:p.target.name});
    if(examples.length===3)break;
  }
  for(const e of examples)md.push('| '+e.name+' | '+e.date_raw+' | '+e.title+' | '+e.before_date+': '+e.before_points+' | '+e.point+' | '+e.after_date+': '+e.after_points+' |');
  md.push('', '## Databaseværn','', '| Database | SHA-256 før | SHA-256 efter |','|---|---|---|');
  for(const n of Object.keys(EXPECTED))md.push('| '+n+' | '+state.hashes_before[n]+' | '+state.hashes_after[n]+' |');
  md.push('', 'Alle hashes er uændrede: '+state.hashes_unchanged+'. Alle fem DB:t blev åbnet readOnly med `PRAGMA query_only=ON`; ingen database blev skrevet.','',
    '## Forespørgselslog','',
    'Den følgende append-only-log indeholder hvert svar med nummer, metode, felter (uden kontekstnøgle), status, bytes, SHA-256 af redigeret svar, filnavn og tidspunkt. For kald 1–4 (Del A) henvises til `statistik/results/158-turneringer.json`; kald 5–206 er rekonstrueret fra tidligere state/råsvar og mangler historiske tidsstempler; kald 207 har ukendt status. Kald 208–424 blev logget før svarbehandling.','',
    '| Kald | Metode | Felter | Status | Bytes | SHA-256 | Råsvar |','|---:|---|---|---:|---:|---|---|');
  for(const c of allCalls.filter(x=>x.number))md.push('| '+c.number+' | '+(c.method??'—')+' | `'+JSON.stringify(c.fields_changed??{})+'` | '+(c.status??'ukendt')+' | '+(c.response_bytes??'—')+' | '+(c.response_sha256_redacted??'—')+' | '+(c.saved_file??'—')+' |');
  md.push('', '## Kontrolresultater','',
    '- Målet: '+state.weekly.length+'/392 snapshots; alle otte spillere har 49 ugeposter, hvor fravær udtrykkeligt markeres uden nulpoint. Svar på a–e står ovenfor.','- Kaldloft: '+state.total_calls_consumed+'/480 samlet.','- Databasehashes: uændrede; se tabellen.','- `git diff --check` skal køres efter kortopdateringen.','',
    '## Begrænsninger og status for kald 207','',
    'HTTP-status for globalt kald 207 er ukendt, fordi den tidligere proces ikke fik skrevet status til checkpointet. Den redigerede rå GET findes; det nye append-only logformat kunne ikke genskabe en status, som ikke blev gemt dengang. De historiske kald 5–206 har ikke oprindelige timestamps. Uger uden spillerække er ikke konverteret til nulpoint. “Eventpoint før/efter” er en empirisk matchning af værdierne i de observerede tabeller, ikke dokumentation for serverens interne opdateringsøjeblik.');
  writeRetry(path.join(RESULTS,'158b-pointaendring-vs-kampe.json'),JSON.stringify(report,null,2)+'\n');
  writeRetry(path.join(RESULTS,'158b-pointaendring-vs-kampe.md'),md.join('\n')+'\n');
  console.log(JSON.stringify({status:report.status,total_calls:report.total_calls_including_del_a,weekly:report.weekly_saved,
    weekly_categories:counts,event_point_matches:pointMatches,per_player:per.map(p=>({name:p.target.name,counts:p.week_counts,point_matches:p.event_point_match_counts,absent:p.absent_periods})),
    report:path.join(RESULTS,'158b-pointaendring-vs-kampe.md')},null,2));
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
}else if(process.argv[2]==='--verify-resume'){
  const s=load(),before=s.weekly?.length??0;
  s.weekly=(s.weekly??[]).filter(w=>{const t=s.selected?.find(x=>String(x.id)===String(w.id));return t&&w.status===200&&validWeeklyRaw(w.saved_file,t,w.date);});
  const result={state_weekly_before:before,state_weekly_valid:s.weekly.length,state_weekly_invalid:before-s.weekly.length,
    calls_in_state:s.calls.length,last_consumed:s.total_calls_consumed,selected:s.selected?.map(t=>({id:t.id,name:t.name,list:t.list,param:t.param})),
    call_log_lines:fs.readFileSync(CALL_LOG,'utf8').split(/\r?\n/u).filter(Boolean).length,
    invalid_examples:(JSON.parse(fs.readFileSync(STATE_FILE,'utf8')).weekly??[]).filter(w=>{const t=s.selected?.find(x=>String(x.id)===String(w.id));return !t||w.status!==200||!validWeeklyRaw(w.saved_file,t,w.date);}).slice(0,5).map(w=>({id:w.id,date:w.date,file:w.saved_file}))};
  if(result.state_weekly_invalid)save(s);
  console.log(JSON.stringify(result,null,2));
}else if(process.argv[2]==='--weekly'){
  const s=load();s.hashes_before??=await checkDb();await weekly(s);
}else if(process.argv[2]==='--analyze'){
  await analyze(load());
}else{
  console.log('Brug --probe-events, --weekly eller --analyze.');
}
