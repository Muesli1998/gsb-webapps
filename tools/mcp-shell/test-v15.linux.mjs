// KUN Linux/macOS. Tester v1.5 (netlify-værn, git-værktøjer, net_godkend/net_traek, git_flyt_kort, blokerede kort) på et midlertidigt repo + bare origin.
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs'; import crypto from 'node:crypto';
const T=process.env.TESTDIR||'/tmp/claude-0/t5'; const sh=(c,o={})=>execSync(c,{stdio:'pipe',...o}).toString();
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
sh(`rm -rf ${T} && mkdir -p ${T}/srv`);
sh(`git init -q --bare ${T}/o && git clone -q ${T}/o ${T}/r 2>&1; true`);
const R=T+'/r';
sh(`cd ${R} && git checkout -q -b main && mkdir -p work/aabne work/future tools apps/netlify-prod && git config user.email a@b && git config user.name t`);
const kort=(h)=>`# Opgave\n\n**Netværk:** ${h}\n\n## Mål\nOpgave.\n\n## Resultat\n(Udfyldes af Codex.)\n`;
const w=(f,t)=>fs.writeFileSync(R+'/'+f,t);
w('work/aabne/172-test.md',kort('≤10 kald')); w('work/aabne/165-test.md',kort('ingen')); w('work/aabne/166-test.md',kort('ca. 900 kald'));
w('work/aabne/167-test.md',kort('ja')); w('work/aabne/163-test.md',kort('≤20 kald')); w('work/aabne/168-test.md',kort('≤20 kald'));
w('work/future/190-test.md',kort('ingen')); w('work/future/172-dup.md',kort('ingen')); w('work/future/191-test.md',kort('ingen'));
w('apps/netlify-prod/index.html','<html>prod</html>');
w('tools/dummy.mjs',"console.log('dummy kørt');");
w('tools/skrivnl.mjs',"import fs from 'node:fs'; fs.writeFileSync('apps/netlify-prod/ny.txt','x'); console.log('skrev netlify');");
w('tools/a.mjs','a'); w('tools/b.mjs','b');
sh(`cd ${R} && git add -A && git commit -q -m init && git push -q -u origin main 2>&1; true`);
fs.copyFileSync(new URL('./server.mjs',import.meta.url),T+'/srv/server.mjs');
const real=JSON.parse(fs.readFileSync(new URL('./tilladelser.json',import.meta.url),'utf8'));
const tools={}; for(const n of ['git_status','git_add','git_commit','git_gendan_fil','git_flet_gren','git_skift_main','git_push','git_diff_stat']) if(real.tools[n]) tools[n]=real.tools[n];
tools.git_diff_stat={beskrivelse:'x',trin:[{cmd:'git',args:['diff','--stat']}]};
const kp={kort:{moenster:'^\\d{1,3}$',paakraevet:true},toer:{type:'boolean'}};
tools.net_dummy={beskrivelse:'x',baggrund:true,net:true,tidsgraenseSek:60,laas:['tools/dummy.mjs','@net-kort.json'],parametre:kp,trin:[{cmd:'node',args:['tools/dummy.mjs',{naar:'netHash',vaerdi:['-ForventetKortHash','{netHash}']}]}]};
tools.kort_dummy={beskrivelse:'x',baggrund:true,tidsgraenseSek:60,laas:['tools/dummy.mjs'],parametre:kp,trin:[{cmd:'node',args:['tools/dummy.mjs']}]};
tools.netlify_job={beskrivelse:'x',baggrund:true,tidsgraenseSek:60,laas:['tools/skrivnl.mjs'],trin:[{cmd:'node',args:['tools/skrivnl.mjs']}]};
const cfg={repo:R,tools,indbyggede:real.indbyggede,blokeredeKort:['163','029'],maxNetKald:400};
const cfgFil=T+'/srv/tilladelser.json'; fs.writeFileSync(cfgFil,JSON.stringify(cfg));
const netFil=T+'/srv/net-kort.json'; fs.writeFileSync(netFil,'{"godkendt":{}}\n');
const env={...process.env,GSB_SHELL_CONFIG:cfgFil,GSB_SHELL_LAAS:T+'/srv/laas.json',GSB_SHELL_JOBS:T+'/srv/jobs'};
Object.assign(process.env,env);
const laas=()=>sh(`cd ${T}/srv && node server.mjs --laas`,{env});
const res=[]; const srv=spawn('node',[T+'/srv/server.mjs'],{env}); let sbuf=''; const venter=new Map(); let nid=0;
srv.stdout.on('data',d=>{sbuf+=d;let i;while((i=sbuf.indexOf('\n'))>=0){const l=sbuf.slice(0,i);sbuf=sbuf.slice(i+1);try{const j=JSON.parse(l);venter.get(j.id)?.(j);}catch{}}});
const rpc=(method,params)=>new Promise(r=>{const id=++nid;venter.set(id,r);srv.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});
const kald=async(navn,args={})=>{const j=await rpc('tools/call',{name:navn,arguments:args});return j.result?.content?.[0]?.text||JSON.stringify(j);};
const ok=(navn,cond,info='')=>{res.push([cond?'BESTÅET':'FEJLET',navn,String(info).slice(0,160).replace(/\n/g,' | ')]);};
const vent=ms=>new Promise(r=>setTimeout(r,ms));
const g=c=>sh(`cd ${R} && ${c}`).trim(); const kh=n=>sha(fs.readFileSync(`${R}/work/aabne/${n}`));
laas();

// ---- gulv direkte
const { gulv, erNetlify } = await import(T+'/srv/server.mjs');
const afvist=(cmd,args,laasL=[])=>{try{gulv(cmd,args,laasL,false);return false;}catch{return true;}};
const tilladt=(cmd,args)=>!afvist(cmd,args);
ok('gulv: push origin main tilladt',tilladt('git',['push','origin','main']));
ok('gulv: push med flag, anden gren, force afvises',afvist('git',['push','--force','origin','main'])&&afvist('git',['push','origin','arbejde/x'])&&afvist('git',['push','origin','+main'])&&afvist('git',['push'])&&afvist('git',['push','origin','main','--delete']));
ok('gulv: restore kun med -- og stier',tilladt('git',['restore','--','tools/a.mjs'])&&afvist('git',['restore','--source=HEAD','--','x'])&&afvist('git',['restore','tools/a.mjs'])&&afvist('git',['restore','--staged','--','x'])&&afvist('git',['restore','--']));
ok('gulv: mv kun work/ til work/',tilladt('git',['mv','--','work/future/a.md','work/aabne/a.md'])&&afvist('git',['mv','--','work/future/a.md','tools/a.md'])&&afvist('git',['mv','-f','--','work/a','work/b']));
ok('gulv: switch kun main/arbejde',tilladt('git',['switch','main'])&&tilladt('git',['switch','arbejde/x'])&&afvist('git',['switch','-c','x'])&&afvist('git',['switch','andet'])&&afvist('git',['switch','--detach','main']));
ok('gulv: netlify-stier afvises for add/restore/mv (også stort)',afvist('git',['add','--','apps/netlify-prod/x'])&&afvist('git',['restore','--','Apps/Netlify-Prod/x'])&&afvist('git',['mv','--','work/a','apps/netlify-prod/x']));
ok('gulv: diff --name-only/--cached/--no-renames tilladt, andre flag ikke',tilladt('git',['diff','--name-only','--no-renames','main...arbejde/x'])&&tilladt('git',['diff','--cached','--name-only'])&&afvist('git',['diff','--output=x']));
ok('erNetlify: varianter',erNetlify('apps/netlify-prod/a')&&erNetlify('APPS\\Netlify-Prod\\a')&&erNetlify('./apps/netlify-prod')&&!erNetlify('apps/netlify-prod-v2/a')&&!erNetlify('docs/apps/netlify-prod/a'));

// ---- tools/list
let L=await rpc('tools/list',{}); let navne=L.result.tools.map(t=>t.name);
ok('tools/list har indbyggede og nye git-værktøjer',['net_godkend','net_traek','git_flyt_kort','git_push','git_gendan_fil','git_skift_main'].every(n=>navne.includes(n)),navne.join(','));
const cfgUden={...cfg,indbyggede:{}}; fs.writeFileSync(cfgFil,JSON.stringify(cfgUden));
L=await rpc('tools/list',{}); let t=await kald('net_godkend',{kort:'168'});
ok('Indbyggede findes kun når config nævner dem',!L.result.tools.some(x=>x.name==='net_godkend')&&/Ukendt værktøj/.test(t),t);
fs.writeFileSync(cfgFil,JSON.stringify(cfg));

// ---- netlify-værn: git_add / gendan / commit
w('apps/netlify-prod/index.html','<html>ændret</html>');
t=await kald('git_add',{stier:['apps/netlify-prod/index.html']}); ok('git_add afviser netlify-prod',/netlify-prod/.test(t)&&/FEJL/.test(t),t);
t=await kald('git_add',{stier:['Apps/Netlify-Prod/index.html']}); ok('git_add afviser netlify-prod med andre store/små bogstaver',/FEJL/.test(t),t);
t=await kald('git_add',{stier:['tools/a.mjs','apps/netlify-prod/index.html']}); ok('git_add afviser hele kaldet, hvis én sti er netlify',/FEJL/.test(t)&&g('git diff --cached --name-only')==='',t);
t=await kald('git_gendan_fil',{stier:['apps/netlify-prod/index.html']}); ok('git_gendan_fil afviser netlify-prod',/FEJL/.test(t)&&fs.readFileSync(R+'/apps/netlify-prod/index.html','utf8').includes('ændret'),t);
t=await kald('git_gendan_fil',{stier:['.']}); ok('git_gendan_fil afviser .',/FEJL/.test(t),t);
g('git checkout -- apps/netlify-prod/index.html');
w('tools/a.mjs','ændret a'); t=await kald('git_gendan_fil',{stier:['tools/a.mjs']}); ok('git_gendan_fil gendanner en almindelig fil',!/FEJL/.test(t)&&fs.readFileSync(R+'/tools/a.mjs','utf8')==='a'&&!fs.existsSync(T+'/srv/jobs/koer.lock'),t);
// staged netlify direkte i git (som Codex kunne gøre) -> commit afvises
w('apps/netlify-prod/index.html','<html>staged</html>'); g('git add apps/netlify-prod/index.html');
t=await kald('git_commit',{besked:'forsøg med netlify'}); ok('git_commit afviser når netlify-prod er staged',/netlify-prod/.test(t)&&/FEJL/.test(t)&&g('git log --oneline').split('\n').length===1,t);
g('git reset -q && git checkout -- apps/netlify-prod/index.html');
w('tools/a.mjs','a2'); t=await kald('git_add',{stier:['tools/a.mjs']}); t=await kald('git_commit',{besked:'ok commit a2'});
ok('git_commit virker normalt',!/FEJL/.test(t)&&/ok commit a2/.test(g('git log --oneline')),t);

// ---- flet-gren
g('git switch -q -c arbejde/n1'); w('apps/netlify-prod/index.html','<html>n1</html>'); g('git add -A && git commit -q -m n1'); g('git switch -q main');
t=await kald('git_flet_gren',{gren:'arbejde/n1'}); ok('git_flet_gren afviser gren med netlify-prod-ændring',/netlify-prod/.test(t)&&/FEJL/.test(t)&&!/n1/.test(g('git log --oneline')),t);
g('git branch -q -D arbejde/n1');
g('git switch -q -c arbejde/n2'); w('tools/b.mjs','b2'); g('git add -A && git commit -q -m n2'); g('git switch -q main');
t=await kald('git_flet_gren',{gren:'arbejde/n2'}); ok('git_flet_gren fletter ren gren og sletter den',!/FEJL/.test(t)&&/n2/.test(g('git log --oneline'))&&g('git branch --list arbejde/n2')==='',t);

// ---- push
t=await kald('git_push'); ok('git_push pusher main',!/FEJL/.test(t)&&g('git rev-parse main')===g(`git --git-dir=${T}/o rev-parse main`),t);
g('git switch -q -c arbejde/x');
t=await kald('git_push'); ok('git_push afvises uden for main',/forventede 'main'/.test(t),t);
t=await kald('git_skift_main'); ok('git_skift_main virker på ren gren',!/FEJL/.test(t)&&g('git branch --show-current')==='main',t);
g('git branch -q -d arbejde/x');
w('apps/netlify-prod/index.html','<html>unpushed</html>'); g('git add -A && git commit -q -m netlify-lokalt');
t=await kald('git_push'); ok('git_push afvises når commits rører netlify-prod',/netlify-prod/.test(t)&&g('git rev-parse origin/main')!==g('git rev-parse main'),t);
g('git reset -q --hard origin/main');
g('git switch -q -c arbejde/y'); w('tools/a.mjs','dirty');
t=await kald('git_skift_main'); ok('git_skift_main afvises ved urent træ',/ikke rent/.test(t)&&g('git branch --show-current')==='arbejde/y',t);
g('git checkout -- tools/a.mjs && git switch -q main && git branch -q -d arbejde/y');

// ---- flyt kort
t=await kald('git_flyt_kort',{kort:'190'}); ok('git_flyt_kort flytter future -> aabne (staged)',!/FEJL/.test(t)&&fs.existsSync(R+'/work/aabne/190-test.md')&&!fs.existsSync(R+'/work/future/190-test.md')&&/^R/m.test(g('git status --short')),t+g('git status --short'));
t=await kald('git_flyt_kort',{kort:'191'}); ok('git_flyt_kort afvises ved urent træ (den staged flytning)',/ikke rent/.test(t)&&fs.existsSync(R+'/work/future/191-test.md'),t);
t=await kald('git_commit',{besked:'flyt kort 190'}); ok('flytning kan committes',!/FEJL/.test(t)&&g('git status --short')==='',t);
t=await kald('git_flyt_kort',{kort:'172'}); ok('git_flyt_kort afvises hvis kortnummer findes i aabne',/findes allerede/.test(t),t);
t=await kald('git_flyt_kort',{kort:'999'}); ok('git_flyt_kort afvises for ukendt kort',/entydigt/.test(t),t);
g('git switch -q -c arbejde/z'); t=await kald('git_flyt_kort',{kort:'191'}); ok('git_flyt_kort afvises uden for main',/forventede 'main'/.test(t)&&fs.existsSync(R+'/work/future/191-test.md'),t); g('git switch -q main && git branch -q -d arbejde/z');
g('git push -q 2>&1; true');

// ---- net_godkend
const nk=()=>JSON.parse(fs.readFileSync(netFil,'utf8')).godkendt; const pin=()=>JSON.parse(fs.readFileSync(T+'/srv/laas.json','utf8'))['@net-kort.json'];
const h168=kh('168-test.md');
t=await kald('net_godkend',{kort:'168'}); ok('net_godkend uden hash: kun forhåndsvisning, intet skrevet',/FORHÅNDSVISNING/.test(t)&&t.includes(h168)&&t.includes('≤20 kald')&&!nk()['168'],t);
t=await kald('net_godkend',{kort:'168',sha256:'0'.repeat(12)}); ok('net_godkend afviser forkert hash',/passer ikke/.test(t)&&!nk()['168'],t);
t=await kald('net_godkend',{kort:'165'}); ok('net_godkend afviser Netværk: ingen',/ikke et netværkskort/.test(t),t);
t=await kald('net_godkend',{kort:'166'}); ok('net_godkend afviser over kaldloft',/over loftet/.test(t),t);
t=await kald('net_godkend',{kort:'167'}); ok('net_godkend afviser linje uden kaldtal',/intet kaldtal/.test(t),t);
t=await kald('net_godkend',{kort:'163',sha256:kh('163-test.md').slice(0,16)}); ok('net_godkend afviser blokeret kort',/kan ikke godkendes via værktøjer/.test(t)&&!nk()['163'],t);
g('git switch -q -c arbejde/q'); t=await kald('net_godkend',{kort:'168'}); ok('net_godkend afviser uden for main',/forventede 'main'/.test(t),t); g('git switch -q main && git branch -q -d arbejde/q');
fs.writeFileSync(netFil,'{"godkendt":{"999":{"sha256":"'+'1'.repeat(64)+'"}}}\n');
t=await kald('net_godkend',{kort:'168',sha256:h168.slice(0,12)}); ok('net_godkend afviser når net-kort.json er ændret uden for værktøjet',/er ændret siden den blev låst/.test(t)&&!nk()['168'],t);
fs.writeFileSync(netFil,'{"godkendt":{}}\n'); laas();
t=await kald('net_godkend',{kort:'168',sha256:h168.slice(0,12)});
ok('net_godkend med hash godkender, skriver net-kort.json og genlåser',/GODKENDT/.test(t)&&nk()['168']?.sha256===h168&&pin()===sha(fs.readFileSync(netFil)),t);
t=await kald('net_dummy',{kort:'168'}); await vent(1300); ok('Det godkendte kort kan køres (ingen --laas imellem)',/Startet i baggrunden/.test(t),t);
const logl=fs.readFileSync(T+'/srv/jobs/net-log.jsonl','utf8'); ok('Revisionsloggen har godkendelsen',/godkendt_via_vaerktoej/.test(logl)&&logl.includes(h168),logl.slice(-200));
t=await kald('net_godkend',{kort:'172',sha256:kh('172-test.md')}); ok('Godkend et kort mere med fuld hash',/GODKENDT/.test(t)&&nk()['172']&&nk()['168'],t);
// kortet ændres -> kører ikke
w('work/aabne/168-test.md',kort('≤20 kald')+'\nny linje\n'); g('git add -A && git commit -q -m "ret 168"');
t=await kald('net_dummy',{kort:'168'}); ok('Ændret kort efter godkendelse afvises',/ændret siden godkendelsen/.test(t),t);
// træk tilbage
t=await kald('net_traek',{kort:'172'}); ok('net_traek fjerner godkendelsen og genlåser',/trukket tilbage/.test(t)&&!nk()['172']&&nk()['168']&&pin()===sha(fs.readFileSync(netFil)),t);
t=await kald('net_dummy',{kort:'172'}); ok('Tilbagetrukket kort afvises som ikke godkendt (ikke som låsefejl)',/ikke godkendt/.test(t),t);
t=await kald('net_traek',{kort:'172'}); ok('net_traek på ikke-godkendt kort ændrer intet',/var ikke godkendt/.test(t),t);

// ---- CLI
const cli=a=>{try{return sh(`cd ${T}/srv && node server.mjs ${a} 2>&1`,{env});}catch(e){return (e.stdout||'')+''+(e.stderr||'');}};
let c=cli('--godkend 172'); ok('CLI --godkend uden hash viser kortet',/FORHÅNDSVISNING/.test(c)&&c.includes(kh('172-test.md')),c);
c=cli(`--godkend 166 ${kh('166-test.md').slice(0,12)}`); ok('CLI --godkend springer kaldloftet over (manuel)',/GODKENDT/.test(c)&&nk()['166'],c);
c=cli(`--godkend 163 ${kh('163-test.md').slice(0,12)}`); ok('CLI --godkend kan heller ikke godkende blokerede kort',/kan ikke godkendes/.test(c)&&!nk()['163'],c);
ok('Pin passer stadig efter CLI',pin()===sha(fs.readFileSync(netFil)));

// ---- blokerede kort + netlify efter job
t=await kald('kort_dummy',{kort:'163'}); ok('Blokeret kort afvises i kort_dummy',/blokeret/.test(t),t);
t=await kald('kort_dummy',{kort:'163',toer:true}); await vent(1200); ok('Tørkørsel af blokeret kort er tilladt',/Startet i baggrunden/.test(t),t);
t=await kald('kort_dummy',{kort:'168'}); await vent(1200); ok('Ikke-blokeret kort kører',/Startet i baggrunden/.test(t),t);
t=await kald('netlify_job'); const idN=/Job-id: (\S+)/.exec(t)?.[1]; await vent(1800);
const st=await kald('job_status',{id:idN}); const jn=JSON.parse(fs.readFileSync(`${T}/srv/jobs/${idN}.json`,'utf8'));
ok('Ændring i apps/netlify-prod efter job opdages og meldes (log, json, job_status, revisionslog)',jn.netlifyAendret===true&&/ADVARSEL: apps\/netlify-prod/.test(st)&&/netlify_aendret_efter_job/.test(fs.readFileSync(T+'/srv/jobs/net-log.jsonl','utf8')),st.slice(0,160));
t=await kald('git_add',{stier:['apps/netlify-prod/ny.txt']}); ok('Den nye netlify-fil kan heller ikke staged',/FEJL/.test(t),t);
t=await kald('git_skift_main'); ok('git_skift_main afvises mens netlify-prod er urent',/ikke rent/.test(t),t);
fs.rmSync(R+'/apps/netlify-prod/ny.txt');
t=await kald('kort_dummy',{kort:'168'}); await vent(1200); const idC=/Job-id: (\S+)/.exec(t)?.[1]; ok('Et rent job melder ikke netlify',!JSON.parse(fs.readFileSync(`${T}/srv/jobs/${idC}.json`,'utf8')).netlifyAendret,t);

srv.kill();
const f=res.filter(r=>r[0]==='FEJLET').length;
for(const r of res) console.log(r.join(' | '));
console.log(`\n${res.length-f}/${res.length} bestået`); process.exit(f?1:0);
