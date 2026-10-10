// KUN Linux/macOS (bruger sleep, pgrep og POSIX-shell). Til Windows: brug test-windows-timeout.mjs, som er platformuafhængig.
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs'; import crypto from 'node:crypto';
const T=process.env.TESTDIR||'/tmp/claude-0/t4'; const sh=(c,o={})=>execSync(c,{stdio:'pipe',...o}).toString();
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
sh(`mkdir -p ${T}/srv`);
sh(`git init -q --bare ${T}/o && git clone -q ${T}/o ${T}/r 2>&1; true`);
const R=T+'/r';
sh(`cd ${R} && git checkout -q -b main && mkdir -p work/aabne tools && git config user.email a@b && git config user.name t`);
const kort=(h)=>`# Opgave 172\n\n**Netværk:** ${h}\n\n## Mål\nOprindelig opgave.\n\n## Gren\n\`arbejde/172-x\`\n\n## Resultat\n(Udfyldes af Codex.)\n`;
fs.writeFileSync(R+'/work/aabne/172-test.md',kort('≤10 kald'));
fs.writeFileSync(R+'/work/aabne/165-test.md',kort('ingen'));
fs.writeFileSync(R+'/tools/dummy.mjs',"console.log('dummy kørt', process.argv.slice(2).join(' '));");
fs.writeFileSync(R+'/tools/sov10.mjs',"setTimeout(()=>console.log('sov10 færdig'),10000);");
fs.writeFileSync(R+'/tools/sov.mjs',"setTimeout(()=>console.log('sov færdig'),2000);");
fs.writeFileSync(R+'/tools/lang.mjs',"console.log('start');setTimeout(()=>{},60000);");
sh(`cd ${R} && git add -A && git commit -q -m init && git push -q -u origin main 2>&1; true`);
fs.copyFileSync(new URL('./server.mjs',import.meta.url),T+'/srv/server.mjs');
const cfg={repo:R,tools:{
 net_dummy:{beskrivelse:'x',baggrund:true,net:true,tidsgraenseSek:60,laas:['tools/dummy.mjs','@net-kort.json'],
  parametre:{kort:{moenster:'^\\d{1,3}$',paakraevet:true},toer:{type:'boolean'},model:{moenster:'^[A-Za-z0-9._-]+$',tilladte:['gpt-6-luna']}},
  trin:[{cmd:'node',args:['tools/dummy.mjs',{naar:'netHash',vaerdi:['-ForventetKortHash','{netHash}']}]}]},
 net_lang10:{beskrivelse:'x',baggrund:true,net:true,tidsgraenseSek:30,laas:['tools/sov10.mjs','@net-kort.json'],
  parametre:{kort:{moenster:'^\\d{1,3}$',paakraevet:true}},trin:[{cmd:'node',args:['tools/sov10.mjs']}]},
 net_sov:{beskrivelse:'x',baggrund:true,net:true,tidsgraenseSek:30,laas:['tools/sov.mjs','@net-kort.json'],
  parametre:{kort:{moenster:'^\\d{1,3}$',paakraevet:true}},trin:[{cmd:'node',args:['tools/sov.mjs']}]},
 net_lang:{beskrivelse:'x',baggrund:true,net:true,tidsgraenseSek:2,laas:['tools/lang.mjs','@net-kort.json'],
  parametre:{kort:{moenster:'^\\d{1,3}$',paakraevet:true}},trin:[{cmd:'node',args:['tools/lang.mjs']}]},
 git_add:{beskrivelse:'x',parametre:{stier:{type:'stier',paakraevet:true}},trin:[{cmd:'git',args:['add','--','{stier*}']}],skriver:true}}};
fs.writeFileSync(T+'/srv/tilladelser.json',JSON.stringify(cfg));
const net=(g)=>fs.writeFileSync(T+'/srv/net-kort.json',JSON.stringify({godkendt:g}));
const kh=n=>sha(fs.readFileSync(`${R}/work/aabne/${n}`));
const env={...process.env,GSB_SHELL_CONFIG:T+'/srv/tilladelser.json',GSB_SHELL_LAAS:T+'/srv/laas.json',GSB_SHELL_JOBS:T+'/srv/jobs'};
const laas=()=>sh(`cd ${T}/srv && node server.mjs --laas`,{env});
const res=[];
const srv=spawn('node',[T+'/srv/server.mjs'],{env}); let sbuf=''; const venter=new Map(); let nid=0;
srv.stdout.on('data',d=>{sbuf+=d;let i;while((i=sbuf.indexOf('\n'))>=0){const l=sbuf.slice(0,i);sbuf=sbuf.slice(i+1);try{const j=JSON.parse(l);venter.get(j.id)?.(j.result?.content?.[0]?.text||JSON.stringify(j));}catch{}}});
function kald(navn,args){return new Promise(res=>{const id=++nid;venter.set(id,res);srv.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method:'tools/call',params:{name:navn,arguments:args}})+'\n');});}
const ok=(navn,cond,info='')=>{res.push([cond?'BESTÅET':'FEJLET',navn,String(info).slice(0,140).replace(/\n/g,' | ')]);};
const vent=ms=>new Promise(r=>setTimeout(r,ms));
net({}); laas();
let t=await kald('net_dummy',{kort:'172'}); ok('Afvis: kort ikke på listen',/ikke godkendt/.test(t),t);
net({172:{sha256:kh('172-test.md')},165:{sha256:kh('165-test.md')}}); laas();
t=await kald('net_dummy',{kort:'172'}); ok('Godkendt kort starter',/Startet i baggrunden/.test(t),t);
await vent(1500); const id=/Job-id: (\S+)/.exec(t)?.[1]; const log=fs.readFileSync(`${T}/srv/jobs/${id}.log`,'utf8'); ok('Log har [net] og dummy-output, lås frigivet',/\[net\] kort 172 godkendt/.test(log)&&/dummy kørt/.test(log)&&!fs.existsSync(T+'/srv/jobs/koer.lock'),log);
t=await kald('net_dummy',{kort:'172',model:'gpt-9'}); ok('Afvis: model ikke på listen',/kun gpt-6-luna/.test(t),t);
t=await kald('net_dummy',{kort:'165'}); ok('Afvis: Netværk = ingen',/ikke et netværkskort/.test(t),t);
fs.writeFileSync(R+'/work/aabne/172-test.md',kort('≤500 kald'));
t=await kald('net_dummy',{kort:'172'}); ok('Afvis: uren arbejdsmappe',/ikke rent/.test(t),t);
sh(`cd ${R} && git add -A && git commit -q -m ændret && git push -q 2>&1; true`);
t=await kald('net_dummy',{kort:'172'}); ok('Afvis: kort ændret efter godkendelse (committet)',/ændret siden godkendelsen/.test(t),t);
const lv=spawn('sleep',['30']);
net({172:{sha256:kh('172-test.md')}}); laas();
fs.mkdirSync(T+'/srv/jobs',{recursive:true});
fs.writeFileSync(T+'/srv/jobs/koer.lock',JSON.stringify({id:'x',navn:'andet',serverPid:lv.pid,barnPid:lv.pid,start:Date.now()}));
t=await kald('net_dummy',{kort:'172'}); ok('Afvis: levende lås (anden proces)',/kører allerede/.test(t),t);
t=await kald('git_add',{stier:['tools/dummy.mjs']}); ok('Skriver-værktøj afvises under levende lås',/ændrer arbejdstræet/.test(t),t);
lv.kill(); await vent(300);
fs.writeFileSync(T+'/srv/jobs/koer.lock',JSON.stringify({id:'x',navn:'doed',serverPid:999999,barnPid:999998,start:Date.now()}));
t=await kald('net_dummy',{kort:'172'}); await vent(1200); ok('Overtag lås fra død proces',/Startet i baggrunden/.test(t)&&/laas_overtaget/.test(fs.readFileSync(T+'/srv/jobs/net-log.jsonl','utf8')),t);
net({172:{sha256:'0'.repeat(64)}});
t=await kald('net_dummy',{kort:'172'}); ok('Afvis: net-kort.json ændret efter --laas',/er ændret siden den blev låst/.test(t),t);
net({172:{sha256:kh('172-test.md')}}); laas();
t=await kald('net_lang',{kort:'172'}); await vent(3500); const id2=/Job-id: (\S+)/.exec(t)?.[1]; const l2=fs.readFileSync(`${T}/srv/jobs/${id2}.log`,'utf8'); ok('Timeout afbryder jobbet og frigiver lås',/afbrudt efter 2 sek/.test(l2)&&!fs.existsSync(T+'/srv/jobs/koer.lock'),l2);

// ---- Nye tests efter Codex' review ----
net({172:{sha256:kh('172-test.md')}}); laas();
// 16. Ingen netværk i forkontrollen: ødelæg remote, forkontrollen skal stadig bestå (intet git pull)
sh(`cd ${R} && git remote set-url origin /findes/ikke`);
t=await kald('net_dummy',{kort:'172',toer:true}); await vent(1200); const idT=/Job-id: (\S+)/.exec(t)?.[1];
ok('Forkontrol og -toer kontakter ikke netværket (remote ødelagt, alligevel godkendt)',/Startet i baggrunden/.test(t),t);
// 17. Hash sendes til runneren som -ForventetKortHash
const lT=idT?fs.readFileSync(`${T}/srv/jobs/${idT}.log`,'utf8'):''; ok('Godkendt hash sendes som -ForventetKortHash',lT.includes('-ForventetKortHash '+kh('172-test.md')),lT);
// 18. Kalderen kan ikke selv angive netHash
t=await kald('net_dummy',{kort:'172',netHash:'0'.repeat(64)}); ok('Afvis: kalder angiver selv netHash',/Ukendt parameter: netHash/.test(t),t);
// 19. Kapløb mellem to separate serverprocesser: præcis én starter (5 gentagelser)
async function ekstraServer(){const p=spawn('node',[T+'/srv/server.mjs'],{env});let b='';const w=new Map();p.stdout.on('data',d=>{b+=d;let i;while((i=b.indexOf('\n'))>=0){const l=b.slice(0,i);b=b.slice(i+1);try{const j=JSON.parse(l);w.get(j.id)?.(j.result?.content?.[0]?.text||JSON.stringify(j));}catch{}}});return {p,kald:(navn,args)=>new Promise(res=>{w.set(9,res);p.stdin.write(JSON.stringify({jsonrpc:'2.0',id:9,method:'tools/call',params:{name:navn,arguments:args}})+'\n');})};}
const s1=await ekstraServer(), s2=await ekstraServer(); let alleEn=true; const udfald=[];
for(let i=0;i<5;i++){
  const [a,b]=await Promise.all([s1.kald('net_sov',{kort:'172'}),s2.kald('net_sov',{kort:'172'})]);
  const starter=[a,b].filter(x=>/Startet i baggrunden/.test(x)).length; udfald.push(starter); if(starter!==1) alleEn=false;
  await vent(3000);
}
s1.p.kill(); s2.p.kill();
ok('Kapløb mellem to serverprocesser: præcis ét job starter, 5 gentagelser',alleEn,udfald.join(','));
// 20. Ødelagt låsefil blokerer
fs.writeFileSync(T+'/srv/jobs/koer.lock','ikke json');
t=await kald('net_dummy',{kort:'172'}); ok('Ødelagt koer.lock blokerer nye kørsler',/ugyldig/.test(t),t);
t=await kald('git_add',{stier:['tools/dummy.mjs']}); ok('Ødelagt koer.lock blokerer også skriver-værktøj',/ugyldig|ændrer arbejdstræet/.test(t),t);
fs.rmSync(T+'/srv/jobs/koer.lock');
// 21. Revisionslog der ikke kan skrives stopper jobbet og frigiver lås
fs.rmSync(T+'/srv/jobs/net-log.jsonl',{force:true}); fs.mkdirSync(T+'/srv/jobs/net-log.jsonl');
t=await kald('net_dummy',{kort:'172'}); ok('Skrivefejl i revisionslog stopper jobbet og frigiver låsen',/revisionsloggen/.test(t)&&!fs.existsSync(T+'/srv/jobs/koer.lock'),t);
fs.rmdirSync(T+'/srv/jobs/net-log.jsonl');

// ---- Runde 3 (efter Codex' anden review) ----
net({172:{sha256:kh('172-test.md')}}); laas();
sh(`cd ${R} && git remote set-url origin ${T}/o`);
const kortFilSti=R+'/work/aabne/172-test.md'; const orig=fs.readFileSync(kortFilSti,'utf8');
// 22. Codex må skrive i ## Resultat uden at jobbet afbrydes
t=await kald('net_lang10',{kort:'172'}); const idR=/Job-id: (\S+)/.exec(t)?.[1]; await vent(1500);
fs.writeFileSync(kortFilSti,orig.replace('(Udfyldes af Codex.)','Codex har skrevet et resultat her.'));
await vent(11500); const jR=JSON.parse(fs.readFileSync(`${T}/srv/jobs/${idR}.json`,'utf8'));
ok('Ændring i ## Resultat afbryder ikke jobbet (exit 0, kortAendret false)',jR.kode===0&&jR.kortAendret===false,JSON.stringify(jR));
sh(`cd ${R} && git checkout -- work/aabne/172-test.md`);
// 23. Ændring i kortets faste del under kørslen afbryder jobbet
t=await kald('net_lang10',{kort:'172'}); const idA=/Job-id: (\S+)/.exec(t)?.[1]; await vent(1500);
fs.writeFileSync(kortFilSti,orig.replace('Oprindelig opgave.','Ændret opgave: hent alt.'));
await vent(4500); const lA=fs.readFileSync(`${T}/srv/jobs/${idA}.log`,'utf8'); const jA=fs.existsSync(`${T}/srv/jobs/${idA}.json`)?JSON.parse(fs.readFileSync(`${T}/srv/jobs/${idA}.json`,'utf8')):{};
ok('Ændring i kortets faste del under kørsel dræber jobbet, kode -3, lås frigivet',/AFBRUDT: kortets faste del/.test(lA)&&jA.kode===-3&&jA.kortAendret===true&&!fs.existsSync(T+'/srv/jobs/koer.lock'),lA.slice(-120)+JSON.stringify(jA));
sh(`cd ${R} && git checkout -- work/aabne/172-test.md`);
// 24. Skriver-værktøj tager og frigiver låsen
t=await kald('git_add',{stier:['tools/dummy.mjs']}); ok('Skriver-værktøj kører normalt og efterlader ingen lås',!/FEJL/.test(t)&&!fs.existsSync(T+'/srv/jobs/koer.lock'),t);
// 25. Mutex: død ejer og gammel -> brydes
fs.mkdirSync(T+'/srv/jobs/koer.lock.mutex'); fs.writeFileSync(T+'/srv/jobs/koer.lock.mutex/pid','999999'); const gammel=new Date(Date.now()-60000); fs.utimesSync(T+'/srv/jobs/koer.lock.mutex',gammel,gammel);
t=await kald('net_dummy',{kort:'172'}); await vent(1200); ok('Gammel mutex med død ejer brydes',/Startet i baggrunden/.test(t),t);
// 26. Mutex: levende ejer og gammel -> brydes IKKE
const lv2=spawn('sleep',['30']); fs.mkdirSync(T+'/srv/jobs/koer.lock.mutex'); fs.writeFileSync(T+'/srv/jobs/koer.lock.mutex/pid',String(lv2.pid)); fs.utimesSync(T+'/srv/jobs/koer.lock.mutex',gammel,gammel);
t=await kald('net_dummy',{kort:'172'}); ok('Gammel mutex med levende ejer brydes IKKE',/mutex er optaget/.test(t),t);
lv2.kill(); fs.rmSync(T+'/srv/jobs/koer.lock.mutex',{recursive:true,force:true});
// 27. Advarsel ved overtagelse af lås fra død proces
fs.writeFileSync(T+'/srv/jobs/koer.lock',JSON.stringify({id:'x',navn:'doed',serverPid:999999,barnPid:999998,start:Date.now()}));
t=await kald('net_dummy',{kort:'172'}); await vent(1200); ok('Overtagelse af død lås giver OBS-advarsel',/OBS: forrige job døde/.test(t),t);
const g=(await import(T+'/srv/server.mjs')).gulv;
const psBase=['-NoProfile','-ExecutionPolicy','Bypass','-File','tools/koer-kort.ps1','-Kort','172'];
const thr=(f)=>{try{f();return false}catch(e){return e.message}};
ok('Gulv: -TillavDbAendring afvises altid',/aldrig/.test(thr(()=>g('powershell',[...psBase,'-TillavNetvaerk','-TillavDbAendring'],['tools/koer-kort.ps1'],true))));
ok('Gulv: -TillavNetvaerk afvises uden net:true',/kun tilladt for/.test(thr(()=>g('powershell',[...psBase,'-TillavNetvaerk'],['tools/koer-kort.ps1'],false))));
ok('Gulv: -TillavNetvaerk tilladt med net:true',thr(()=>g('powershell',[...psBase,'-TillavNetvaerk'],['tools/koer-kort.ps1'],true))===false);
const h=sh(`cd ${T}/srv && node server.mjs --hash-kort 172`,{env}).trim(); ok('--hash-kort printer SHA-256',h.startsWith(kh('172-test.md')),h);
for(const r of res) console.log(r.join(' | '));
srv.kill();
process.exit(0);
