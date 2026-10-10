// Begrænset shell-MCP for gsb-webapps. Ingen afhængigheder. Kør: node server.mjs
// Kun de værktøjer, der står i tilladelser.json, kan køres. Filen læses igen ved hvert kald,
// så rettelser i tilladelser.json virker uden genstart (nye værktøjsnavne kræver genstart af Claude Desktop).
//
// NETVÆRKSKORT (kort_koer_net): TILLIDSBASERET UDLØSER, IKKE EN SIKKERHEDSBARRIERE.
// Serveren sikrer kun, at præcis det kort (bytes, SHA-256), som Christoffer har godkendt i net-kort.json,
// kan startes med -TillavNetvaerk, og at -TillavDbAendring aldrig sendes fra noget værktøj. Serveren kontakter
// aldrig netværket selv (intet git pull): hashen sendes til runneren som -ForventetKortHash, og RUNNEREN
// verificerer den EFTER sit eget git pull og bygger først derefter prompten af de verificerede bytes.
// Tørkørsel (-Toer) kontakter derfor hverken GitHub eller ændrer main.
// Runneren starter Codex med danger-full-access. Netværksbudget, domænebegrænsning og databaseforbud i kortene
// er REGLER FOR CODEX, ikke tekniske grænser. Hashkontrol efter kørslen kan opdage databaseændringer, men
// ikke forhindre dem. En rigtig grænse kræver en egress-proxy med tæller og værtsbegrænsning samt reelle
// skriverettigheder på databaserne. net-kort.json og laas.json ligger i denne mappe; forbindes mappen til en
// Claude-session, kan sessionen ændre dem, og garantien er brudt. KØR ALDRIG netværkskort fra en session, der har
// fået adgang til denne mappe. Mappen er ikke en del af de forbundne mapper som standard.
//
// V1.5 (fjernstyring fra telefon): apps/netlify-prod/ kan ALDRIG ændres via værktøjerne: stier dér afvises (git add,
// restore, mv, node_test), staged ændringer, grene der skal flettes og commits der skal pushes tjekkes for netlify-prod,
// kort der er blokeret i tilladelser.json (blokeredeKort) kan ikke køres, og en ændring i netlify-prod efter et job
// opdages og meldes. net_godkend/net_traek skriver net-kort.json og genlåser den (kræver at hashen først er vist).
// Det er stadig TILLIDSBASERET: sessionen kalder dem kun efter Christoffers ord i chatten. DB-skrivende kort (blokeredeKort)
// kan ikke godkendes eller køres via værktøjerne.
// Kortets faste del (alt undtagen ## Spørgsmål og ## Resultat) overvåges hvert sekund under kørslen; ændres den,
// dræbes jobbet (ændringen opdages først ved næste kontrol, op til ca. 1 sek senere).
// Det beviser ikke, at Codex kun påvirkes af den godkendte tekst (den kan nå at læse en ændring), men det opdager
// og afbryder.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONFIG = process.env.GSB_SHELL_CONFIG || path.join(HERE, 'tilladelser.json');
const LAAS = process.env.GSB_SHELL_LAAS || path.join(HERE, 'laas.json');
const JOBS = process.env.GSB_SHELL_JOBS || path.join(HERE, 'jobs');
const MAX_UD = 20000;
const NETFIL = path.join(HERE, 'net-kort.json');
const NETLOG = path.join(JOBS, 'net-log.jsonl');
const KOERLAAS = path.join(JOBS, 'koer.lock');

// GULV: gælder uanset hvad tilladelser.json siger.
// Git: kun disse underkommandoer, og kun de angivne flag (alt andet der starter med - afvises).
const GIT_FLAG = {
  status: ['--short', '--untracked-files=all'],
  diff: ['--check', '--stat', '--name-only', '--cached', '--no-renames'],
  log: ['--oneline', '-n'],
  show: ['--stat', '--oneline'],
  add: ['--'],
  commit: ['-m'],
  switch: [],
  merge: ['--ff-only'],
  branch: ['-d', '--show-current'],
  pull: ['--ff-only'],
  restore: ['--'],
  mv: ['--'],
  push: [],
};
const TEST_FIL = /^(tools|statistik\/scripts)\/[A-Za-z0-9_.\/-]+\.test\.mjs$/;
const PS_START = ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File'];

const sha = buf => crypto.createHash('sha256').update(buf).digest('hex');
const laesJson = fil => JSON.parse(fs.readFileSync(fil, 'utf8').replace(/^\uFEFF/, ''));
const laesConfig = () => laesJson(CONFIG);

// Netlify prod: aldrig via værktøjer. Sammenligningen er case-insensitiv og tåler skråstreger i begge retninger.
export const erNetlify = x => { const t = String(x).replace(/\\/g, '/').replace(/^\.\//, '').toLowerCase(); return t === 'apps/netlify-prod' || t.startsWith('apps/netlify-prod/'); };
// Til git-output (stier, evt. citerede eller i "a -> b"): rammer apps/netlify-prod som mappe, ikke apps/netlify-prod-v2.
const NETLIFY_RE = /(?:^|["\s>])apps[\\/]+netlify-prod(?=[\\/"\s]|$)/im;
const kortNr = x => String(parseInt(x, 10));
const blokeret = (cfg, kort) => (cfg.blokeredeKort || []).some(k => kortNr(k) === kortNr(kort));
const kaldtal = v => (v.match(/\d{1,3}(?:\.\d{3})+|\d+/g) || []).map(x => parseInt(x.replace(/\./g, ''), 10));
// Netværk-linjen i et kort. Kaster, hvis den mangler eller siger ingen.
function netLinje(bytes) {
  const tekst = bytes.toString('utf8').replace(/^\uFEFF/, '');
  const m = /^.*?Netværk:(?:\*\*)?\s*([^\r\n·]+)/im.exec(tekst);
  if (!m) throw new Error('Kortet har ingen Netværk-linje');
  const v = m[1].trim().replace(/[. ]+$/, '');
  if (/^(ingen|nej|no)(\s|$)/i.test(v)) throw new Error(`Kortets Netværk-linje er '${v}'; det er ikke et netværkskort`);
  return v;
}

export function gulv(cmd, args, laas = [], net = false) {
  if (!['git', 'node', 'powershell'].includes(cmd)) throw new Error(`Kommandoen ${cmd} er ikke tilladt`);
  if (cmd === 'git') {
    const tilladt = GIT_FLAG[args[0]];
    if (!tilladt) throw new Error(`git ${args[0]} er ikke tilladt`);
    for (const a of args.slice(1)) {
      if (a === '--') break; // efter -- er alt stier
      if (a.startsWith('-') && !tilladt.includes(a)) throw new Error(`git ${args[0]}: argumentet ${a} er ikke tilladt`);
    }
    if (args[0] === 'push' && args.join(' ') !== 'push origin main') throw new Error('git push: kun præcis "git push origin main" er tilladt');
    if (args[0] === 'restore' && (args[1] !== '--' || args.length < 3)) throw new Error('git restore: kun "git restore -- <stier>" er tilladt');
    if (args[0] === 'mv' && !(args.length === 4 && args[1] === '--' && args[2].startsWith('work/') && args[3].startsWith('work/'))) throw new Error('git mv: kun "git mv -- work/... work/..." er tilladt');
    if (args[0] === 'switch' && !(args.length === 2 && (args[1] === 'main' || /^arbejde\/[A-Za-z0-9._-]+$/.test(args[1])))) throw new Error('git switch: kun main eller arbejde/... er tilladt');
    if (['add', 'restore', 'mv'].includes(args[0])) {
      for (const a of args.slice(Math.max(args.indexOf('--'), 0))) if (erNetlify(a)) throw new Error(`apps/netlify-prod/ kan ikke ændres via værktøjer: ${a}`);
    }
  }
  if (cmd === 'powershell') {
    if (PS_START.some((x, i) => args[i] !== x)) throw new Error(`powershell skal starte med ${PS_START.join(' ')}`);
    if (!laas.includes(args[4])) throw new Error(`powershell-scriptet ${args[4]} er ikke på værktøjets låste liste`);
    if (args.some(a => String(a).toLowerCase() === '-tillavdbaendring')) throw new Error('-TillavDbAendring må aldrig sendes fra et værktøj');
    if (!net && args.some(a => String(a).toLowerCase() === '-tillavnetvaerk')) throw new Error('-TillavNetvaerk er kun tilladt for værktøjer med net: true');
  }
  if (cmd === 'node') {
    if (args[0] === '--test') {
      if (!TEST_FIL.test(args[1] || '') || args[1].includes('..') || args.length !== 2) throw new Error('node --test: kun én testfil under tools/ eller statistik/scripts/');
    } else if (!laas.includes(args[0])) throw new Error(`node-scriptet ${args[0]} er ikke på værktøjets låste liste`);
  }
}

// Sti-tjek med symlinks/junctions: sammenlign de rigtige stier.
const norm = s => (process.platform === 'win32' ? s.toLowerCase() : s);
function aegte(p) {
  const rest = [];
  let cur = p;
  while (!fs.existsSync(cur)) {
    const op = path.dirname(cur);
    if (op === cur) break;
    rest.unshift(path.basename(cur));
    cur = op;
  }
  return path.join(fs.realpathSync.native(cur), ...rest);
}

// Fælles stitjek: relativ sti i repoet, ingen '.', '..', tomme segmenter eller .git, ingen mapper,
// og den rigtige sti (efter symlinks/junctions) skal ligge i repoet.
export function tjekRepoSti(s, repo, { kraevFil = false } = {}) {
  if (typeof s !== 'string' || !/^[\p{L}\p{N}_.\/ -]+$/u.test(s)) throw new Error(`Ugyldig sti: ${s}`);
  const dele = s.split('/');
  if (s.startsWith('-') || s.startsWith('/') || dele.some(d => d === '' || d === '.' || d === '..') || dele[0] === '.git') throw new Error(`Ugyldig sti: ${s}`);
  if (erNetlify(s)) throw new Error(`apps/netlify-prod/ kan ikke ændres via værktøjer: ${s}`);
  const fuld = path.resolve(repo, s);
  if (!fuld.startsWith(repo + path.sep)) throw new Error(`Stien ligger uden for repoet: ${s}`);
  const ar = norm(fs.realpathSync.native(repo));
  const af = norm(aegte(fuld));
  if (!af.startsWith(ar + path.sep)) throw new Error(`Stien peger uden for repoet (symlink/junction): ${s}`);
  if (erNetlify(af.slice(ar.length + 1).split(path.sep).join('/'))) throw new Error(`Stien peger ind i apps/netlify-prod/ (symlink/junction): ${s}`);
  if (fs.existsSync(fuld)) {
    if (fs.statSync(fuld).isDirectory()) throw new Error(`Stien er en mappe; angiv filer: ${s}`);
  } else if (kraevFil) throw new Error(`Filen findes ikke: ${s}`);
}

export function tjekParametre(def = {}, given = {}, repo) {
  const ud = {};
  for (const k of Object.keys(given)) if (!(k in def)) throw new Error(`Ukendt parameter: ${k}`);
  for (const [navn, d] of Object.entries(def)) {
    const v = given[navn];
    if (v === undefined || v === null || v === '' || v === false) {
      if (d.paakraevet) throw new Error(`Mangler parameter: ${navn}`);
      continue;
    }
    if (d.type === 'boolean') {
      if (v !== true) throw new Error(`${navn} skal være true eller udeladt`);
      ud[navn] = true;
    } else if (d.type === 'stier') {
      if (!Array.isArray(v) || v.length < 1 || v.length > 50) throw new Error(`${navn} skal være 1-50 stier`);
      for (const s of v) tjekRepoSti(s, repo, {});
      ud[navn] = v;
    } else {
      if (!d.moenster) throw new Error(`Konfigurationsfejl: ${navn} mangler "moenster"`);
      const t = String(v);
      if (!new RegExp(d.moenster, 'u').test(t)) throw new Error(`${navn} har ugyldig værdi`);
      if (d.forbyd && new RegExp(d.forbyd, 'iu').test(t)) throw new Error(`${navn} indeholder noget forbudt`);
      if (d.tilladte && !d.tilladte.includes(t)) throw new Error(`${navn}: kun ${d.tilladte.join(', ')} er tilladt`);
      if (d.repoSti) tjekRepoSti(t, repo, { kraevFil: true });
      ud[navn] = t;
    }
  }
  return ud;
}

export function udvid(args, p) {
  const sub = s => s.replace(/\{(\w+)\}/g, (_, n) => {
    if (p[n] === undefined) throw new Error(`Mangler parameter ${n}`);
    return String(p[n]);
  });
  const ud = [];
  for (const a of args) {
    if (typeof a === 'string') {
      const m = /^\{(\w+)\*\}$/.exec(a);
      if (m) {
        if (!Array.isArray(p[m[1]])) throw new Error(`Mangler parameter ${m[1]}`);
        ud.push(...p[m[1]]);
      } else ud.push(sub(a));
    } else if (a && a.naar) {
      if (p[a.naar]) ud.push(...a.vaerdi.map(sub));
    } else throw new Error('Ugyldigt argument i konfigurationen');
  }
  return ud;
}

// Nøgler der starter med @ ligger i serverens egen mappe (fx @net-kort.json); alle andre er relative til repoet.
const laasSti = (f, repo) => (f.startsWith('@') ? path.join(HERE, f.slice(1)) : path.join(repo, f));

function tjekLaas(laas, repo) {
  if (!laas || !laas.length) return;
  let pins = {};
  try { pins = laesJson(LAAS); } catch {}
  for (const f of laas) {
    const h = sha(fs.readFileSync(laasSti(f, repo)));
    if (!pins[f]) throw new Error(`${f} er ikke låst. Gennemlæs filen og kør: node server.mjs --laas`);
    if (pins[f] !== h) throw new Error(`${f} er ændret siden den blev låst (nu ${h}). Gennemlæs ændringen og kør: node server.mjs --laas`);
  }
}

const HEAD = 10000;
const TAIL = 10000;
// Dræber en proces (og på Windows hele træet med taskkill /T /F). Resultatet VENTES på og logges via lg:
// taskkill's exit-kode og output, og en advarsel hvis processen stadig lever 5 sek efter. Returnerer true, hvis den er væk.
function draebPid(pid, barn, lg = () => {}) {
  return new Promise(resolve => {
    const vent = () => {
      let n = 0;
      const t = setInterval(() => {
        const live = levende(pid);
        if (!live || ++n >= 25) {
          clearInterval(t);
          if (live) lg(`\n[ADVARSEL: PID ${pid} lever stadig 5 sek efter afbrydelsen]\n`);
          resolve(!live);
        }
      }, 200);
    };
    try {
      if (process.platform === 'win32' && pid) {
        const k = spawn('taskkill', ['/PID', String(pid), '/T', '/F'], { windowsHide: true, shell: false });
        let ud = '';
        k.stdout.on('data', d => { ud += d; });
        k.stderr.on('data', d => { ud += d; });
        k.on('error', e => { lg(`\n[taskkill kunne ikke startes: ${e.message}]\n`); vent(); });
        k.on('close', kode => { lg(`\n[taskkill exit ${kode}: ${ud.trim().slice(0, 300)}]\n`); vent(); });
      } else {
        try { process.kill(-pid, 'SIGKILL'); } catch { if (barn) barn.kill(); else if (pid) process.kill(pid); }
        vent();
      }
    } catch (e) { lg(`\n[afbrydelse fejlede: ${e.message}]\n`); resolve(false); }
  });
}

function koerTrin(cmd, args, cwd, tidSek, onData, onSpawn) {
  return new Promise(resolve => {
    let head = '', tail = '', total = 0;
    const saml = () => (total <= HEAD + TAIL ? head + tail : head + '\n[...klippet...]\n' + tail);
    const give = d => {
      const tekst = d.toString('utf8');
      total += tekst.length;
      if (onData) onData(tekst);
      if (head.length < HEAD) {
        const plads = HEAD - head.length;
        head += tekst.slice(0, plads);
        tail = (tail + tekst.slice(plads)).slice(-TAIL);
      } else tail = (tail + tekst).slice(-TAIL);
    };
    const hooks = path.join(JOBS, 'tomme-hooks');
    fs.mkdirSync(hooks, { recursive: true });
    const env = { ...process.env, GIT_TERMINAL_PROMPT: '0', GIT_CONFIG_COUNT: '1', GIT_CONFIG_KEY_0: 'core.hooksPath', GIT_CONFIG_VALUE_0: hooks };
    let barn;
    try {
      // POSIX: egen proces-gruppe, så hele træet kan dræbes; Windows bruger taskkill /T og må ikke have detached.
      barn = spawn(cmd, args, { cwd, shell: false, windowsHide: true, env, detached: process.platform !== 'win32' });
    } catch (e) { return resolve({ kode: -1, ud: String(e.message) }); }
    if (onSpawn && barn.pid) onSpawn(barn.pid);
    const ur = setTimeout(() => { give(Buffer.from(`\n[afbrudt efter ${tidSek} sek]`)); draebPid(barn.pid, barn, m => give(Buffer.from(m))); }, tidSek * 1000);
    barn.stdout.on('data', give);
    barn.stderr.on('data', give);
    barn.on('error', e => { clearTimeout(ur); give(Buffer.from(String(e.message))); resolve({ kode: -1, ud: saml() }); });
    barn.on('close', kode => { clearTimeout(ur); resolve({ kode, ud: saml() }); });
  });
}

const klip = t => (t.length > MAX_UD ? t.slice(0, MAX_UD / 2) + '\n[...klippet...]\n' + t.slice(-MAX_UD / 2) : t);
const koerer = new Map();
const LOG_MAX = 5 * 1024 * 1024;
let koe = Promise.resolve();
const iKoe = f => { const p = koe.then(f, f); koe = p.catch(() => {}); return p; };

const levende = pid => { if (!pid) return false; try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } };
// Revisionsloggen: strikt=true stopper jobbet, hvis loggen ikke kan skrives.
const logNet = (o, strikt = false) => {
  try { fs.mkdirSync(JOBS, { recursive: true }); fs.appendFileSync(NETLOG, JSON.stringify({ tid: new Date().toISOString(), ...o }) + '\n'); return true; }
  catch (e) { if (strikt) throw new Error(`Kunne ikke skrive revisionsloggen ${NETLOG}: ${e.message}`); return false; }
};

// Fælles lås på tværs af værktøjer, serverprocesser og servergenstart: serverens PID og barnets PID.
// Oprettelsen er atomisk: et mutex-bibliotek (mkdir er atomisk) beskytter tjek-og-skriv, og selve låsefilen
// oprettes med flaget wx (fejler, hvis den findes). En ulæselig eller ugyldig låsefil BLOKERER nye kørsler.
const MUTEX = KOERLAAS + '.mutex';
const sov = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
function medMutex(f) {
  fs.mkdirSync(JOBS, { recursive: true });
  const start = Date.now();
  for (;;) {
    try { fs.mkdirSync(MUTEX); try { fs.writeFileSync(path.join(MUTEX, 'pid'), String(process.pid)); } catch {} break; } catch (e) {
      if (e.code !== 'EEXIST') throw e;
      let alder = 0, ejer = 0;
      try { alder = Date.now() - fs.statSync(MUTEX).mtimeMs; } catch {}
      try { ejer = parseInt(fs.readFileSync(path.join(MUTEX, 'pid'), 'utf8'), 10); } catch {}
      // Mutex'en brydes kun, hvis den er gammel OG ejeren er død (eller ukendt).
      if (alder > 10000 && !levende(ejer)) { try { fs.rmSync(MUTEX, { recursive: true, force: true }); } catch {} continue; }
      if (Date.now() - start > 3000) throw new Error('Låsens mutex er optaget; prøv igen om lidt');
      sov(25);
    }
  }
  try { return f(); } finally { try { fs.rmSync(MUTEX, { recursive: true, force: true }); } catch {} }
}
function laesLaas() {
  let l;
  try { l = JSON.parse(fs.readFileSync(KOERLAAS, 'utf8')); } catch { return { ugyldig: true }; }
  if (!l || typeof l !== 'object' || typeof l.serverPid !== 'number') return { ugyldig: true };
  return l;
}
function laasAktiv() {
  if (!fs.existsSync(KOERLAAS)) return null;
  const l = laesLaas();
  if (l.ugyldig) return { id: '?', navn: 'koer.lock er ugyldig (slet den manuelt, når du har tjekket at intet job kører)' };
  const andenServer = l.serverPid !== process.pid && levende(l.serverPid);
  return andenServer || levende(l.barnPid) ? l : null;
}
function tagLaas(id, navn) {
  return medMutex(() => {
    const a = laasAktiv();
    if (a) throw new Error(`Et job kører allerede (${a.navn || '?'} ${a.id || ''}, PID ${a.barnPid || a.serverPid || '?'}); nye kørsler afvises`);
    let overtaget = false;
    if (fs.existsSync(KOERLAAS)) { logNet({ haendelse: 'laas_overtaget_fra_doed_proces' }); fs.rmSync(KOERLAAS); overtaget = true; }
    fs.writeFileSync(KOERLAAS, JSON.stringify({ id, navn, serverPid: process.pid, barnPid: null, start: Date.now() }), { flag: 'wx' });
    return overtaget;
  });
}
let aktivtBarn = null;
function sætBarn(pid) {
  aktivtBarn = pid;
  try {
    const l = laesLaas();
    if (l.ugyldig) return;
    l.barnPid = pid;
    const tmp = `${KOERLAAS}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(l));
    fs.renameSync(tmp, KOERLAAS);
  } catch {}
}
const slipLaas = () => { try { fs.rmSync(KOERLAAS, { force: true }); } catch {} };

// Hash af kortets FASTE del: alt undtagen indholdet af afsnittene ## Spørgsmål og ## Resultat, som Codex må skrive i.
// Bruges til at opdage (og afbryde ved) ændringer af opgaven under kørslen.
function fastDel(bytes) {
  const linjer = bytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').split('\n');
  const ud = [];
  let spring = false;
  for (const l of linjer) {
    if (/^##\s/.test(l)) { spring = /^##\s+(Spørgsmål|Resultat)\b/i.test(l); ud.push(l); continue; }
    if (!spring) ud.push(l);
  }
  return sha(Buffer.from(ud.join('\n'), 'utf8'));
}
const fastHash = fil => { try { return fastDel(fs.readFileSync(fil)); } catch { return null; } };

const kortFil = (repo, kort) => {
  const dir = path.join(repo, 'work', 'aabne');
  const fund = fs.readdirSync(dir).filter(f => f.startsWith(`${kort}-`) && f.endsWith('.md'));
  if (fund.length !== 1) throw new Error(`Kort ${kort} findes ikke entydigt i work/aabne/ (${fund.length} fund)`);
  return path.join(dir, fund[0]);
};

// Forkontrol for netværkskort. Alt skal bestå, ellers startes intet. INGEN git pull og intet netværk her:
// serveren hasher det lokale kort og sender hashen til runneren (-ForventetKortHash), som verificerer den
// efter sit eget pull og bygger prompten af de verificerede bytes.
async function netForkontrol(p, repo) {
  const kor = (cmd, args) => { gulv(cmd, args, [], false); return koerTrin(cmd, args, repo, 120); };
  let r = await kor('git', ['status', '--short']);
  if (r.kode !== 0 || r.ud.trim()) throw new Error(`Arbejdstræet er ikke rent:\n${r.ud.trim()}`);
  r = await kor('git', ['branch', '--show-current']);
  if (r.ud.trim() !== 'main') throw new Error(`Står på '${r.ud.trim()}', forventede 'main'`);
  const fil = kortFil(repo, p.kort);
  const bytes = fs.readFileSync(fil);
  const h = sha(bytes);
  const godkendt = laesJson(NETFIL).godkendt?.[p.kort];
  if (!godkendt || typeof godkendt.sha256 !== 'string') throw new Error(`Kort ${p.kort} er ikke godkendt til netværk i net-kort.json`);
  if (godkendt.sha256.toLowerCase() !== h) throw new Error(`Kort ${p.kort} er ændret siden godkendelsen (nu ${h}). Godkend den nye version ved at opdatere net-kort.json og køre --laas.`);
  const v = netLinje(bytes);
  return { fil, h, fast: fastDel(bytes), netvaerk: v };
}

async function koerVaerktoej(navn, given) {
  const cfg = laesConfig();
  const repo = path.resolve(cfg.repo);
  const v = cfg.tools?.[navn];
  if (!v) throw new Error(`Ukendt værktøj: ${navn}`);
  const p = tjekParametre(v.parametre, given, repo);
  if (p.kort !== undefined && !p.toer && blokeret(cfg, p.kort)) throw new Error(`Kort ${p.kort} er blokeret for værktøjer (skriver database eller rører apps/netlify-prod/). Kør det selv på PC en.`);
  let trin = v.trin.map(t => ({ cmd: t.cmd, args: udvid(t.args, p) }));
  for (const t of trin) gulv(t.cmd, t.args, v.laas || [], !!v.net);
  if (v.net && !(v.laas || []).includes('@net-kort.json')) throw new Error('Netværksværktøjer skal have @net-kort.json på den låste liste');
  tjekLaas(v.laas, repo);
  if (v.skriver && (koerer.size > 0 || laasAktiv())) throw new Error(`Et job kører (${[...koerer.keys()].join(', ') || 'se koer.lock'}); ${navn} ændrer arbejdstræet og afvises indtil det er færdigt`);
  const tid = v.tidsgraenseSek || 120;

  if (v.baggrund) {
    if (koerer.size > 0) throw new Error(`Et job kører allerede: ${[...koerer.keys()].join(', ')}`);
    fs.mkdirSync(JOBS, { recursive: true });
    const id = `${Date.now().toString(36)}-${navn}`;
    const logFil = path.join(JOBS, `${id}.log`);
    const start = Date.now();
    const overtaget = tagLaas(id, navn);
    let net = null;
    if (v.net) {
      try {
        net = await netForkontrol(p, repo);
        logNet({ vaerktoej: navn, kort: p.kort, afgoerelse: 'godkendt', sha256: net.h, netvaerk: net.netvaerk, toer: !!p.toer }, true);
        p.netHash = net.h; // sættes af serveren, kan ikke angives af kalderen (ukendt parameter afvises)
        trin = v.trin.map(t => ({ cmd: t.cmd, args: udvid(t.args, p) }));
        for (const t of trin) gulv(t.cmd, t.args, v.laas || [], true);
        const harHash = t => { const i = t.args.indexOf('-ForventetKortHash'); return i >= 0 && t.args[i + 1] === net.h; };
        if (!trin.filter(t => t.cmd === 'powershell').every(harHash)) throw new Error('Netværksværktøjets kørsel skal sende -ForventetKortHash med den godkendte hash');
      } catch (e) { slipLaas(); logNet({ vaerktoej: navn, kort: p.kort, afgoerelse: 'afvist', aarsag: e.message }); throw e; }
      fs.appendFileSync(logFil, `[net] kort ${p.kort} godkendt, sha256 ${net.h}, Netværk: ${net.netvaerk}\n`);
    }
    koerer.set(id, { start, navn });
    let vagt = null;
    let kortAendret = false;
    if (net) {
      // Overvågning: er kortets faste del ændret under kørslen, dræbes jobbet (hele procestræet) og markeres afbrudt.
      vagt = setInterval(() => {
        if (kortAendret) return;
        if (fastHash(net.fil) !== net.fast) {
          kortAendret = true;
          fs.appendFileSync(logFil, '\n[AFBRUDT: kortets faste del er ændret under kørslen]\n');
          draebPid(aktivtBarn, null, m => { try { fs.appendFileSync(logFil, m); } catch {} });
        }
      }, 1000);
    }
    (async () => {
      let sidste = 0;
      try {
        for (const t of trin) {
          if (kortAendret) { sidste = -3; break; }
          if (net && fastHash(net.fil) !== net.fast) { fs.appendFileSync(logFil, '\n[AFBRUDT: kortets faste del er ændret efter godkendelsen]\n'); sidste = -2; kortAendret = true; break; }
          fs.appendFileSync(logFil, `$ ${t.cmd} ${t.args.join(' ')}\n`);
          let skrevet = 0;
          const r = await koerTrin(t.cmd, t.args, repo, tid, d => {
            skrevet += d.length;
            if (skrevet <= LOG_MAX) fs.appendFileSync(logFil, d);
            else if (skrevet - d.length <= LOG_MAX) fs.appendFileSync(logFil, '\n[log afkortet ved 5 MB]\n');
          }, sætBarn);
          sidste = r.kode;
          fs.appendFileSync(logFil, `\n[exit ${r.kode}]\n`);
          if (r.kode !== 0) break;
        }
        if (net && !kortAendret) {
          kortAendret = fastHash(net.fil) !== net.fast;
          if (kortAendret) fs.appendFileSync(logFil, '\n[ADVARSEL: kortets faste del er ændret under eller efter kørslen]\n');
        }
        if (kortAendret) sidste = -3; // afbrudt eller ændret: aldrig 0
      } finally {
        if (vagt) clearInterval(vagt);
        aktivtBarn = null;
        let netlifyAendret = false;
        try {
          const r = await gitKor(repo, ['status', '--short', '--untracked-files=all'], 60);
          netlifyAendret = r.kode === 0 && NETLIFY_RE.test(r.ud);
          if (netlifyAendret) {
            fs.appendFileSync(logFil, '\n[ADVARSEL: apps/netlify-prod/ er ændret i arbejdstræet efter kørslen. Værktøjerne stager, committer, fletter og pusher det aldrig. Gendan det på PC en.]\n');
            logNet({ haendelse: 'netlify_aendret_efter_job', vaerktoej: navn, kort: p.kort });
          }
        } catch {}
        const logOk = net ? logNet({ vaerktoej: navn, kort: p.kort, afsluttet: true, kode: sidste, kortAendret }) : true;
        fs.writeFileSync(path.join(JOBS, `${id}.json`), JSON.stringify({ id, navn, start, slut: Date.now(), kode: sidste, ...(netlifyAendret ? { netlifyAendret: true } : {}), ...(net ? { kort: p.kort, sha256: net.h, kortAendret, ...(logOk ? {} : { revisionslogFejl: true }) } : {}) }));
        koerer.delete(id);
        slipLaas();
      }
    })();
    return `Startet i baggrunden. Job-id: ${id}\nBrug job_status med dette id.${overtaget ? '\nOBS: forrige job døde uden at frigive låsen. Tjek Jobliste/Task Manager for forældreløse codex.exe-processer.' : ''}`;
  }

  let tekst = '';
  // Skrivende værktøjer tager samme fælles lås, så de heller ikke kan starte samtidig med et job fra en anden serverproces.
  if (v.skriver) tagLaas(`${Date.now().toString(36)}-${navn}`, navn);
  try {
    if (v.forkontrol?.length) await forkontrol(v.forkontrol, p, repo);
    for (const t of trin) {
      const r = await koerTrin(t.cmd, t.args, repo, tid, undefined, v.skriver ? sætBarn : undefined);
      tekst += `$ ${t.cmd} ${t.args.join(' ')}\n${r.ud.trim()}\n[exit ${r.kode}]\n`;
      if (r.kode !== 0) { tekst += '(stoppet)\n'; break; }
    }
  } finally { if (v.skriver) slipLaas(); }
  return klip(tekst);
}

// ---- v1.5: forkontroller og indbyggede værktøjer ----
const gitKor = (repo, args, tid = 120) => { gulv('git', args, [], false); return koerTrin('git', args, repo, tid); };

async function netlifyIDiff(repo, diffArgs, hvad) {
  const r = await gitKor(repo, ['diff', '--name-only', '--no-renames', ...diffArgs]);
  if (r.kode !== 0) throw new Error(`Kunne ikke kontrollere ${hvad} for ændringer i apps/netlify-prod/:\n${r.ud.trim()}`);
  if (NETLIFY_RE.test(r.ud)) throw new Error(`Afvist: ${hvad} indeholder ændringer i apps/netlify-prod/. Netlify prod kan kun ændres på PC en, aldrig via værktøjerne.`);
}

async function forkontrol(navne, p, repo) {
  for (const n of navne) {
    if (n === 'rent_trae') {
      const r = await gitKor(repo, ['status', '--short', '--untracked-files=all']);
      if (r.kode !== 0 || r.ud.trim()) throw new Error(`Arbejdstræet er ikke rent:\n${r.ud.trim()}`);
    } else if (n === 'paa_main') {
      const r = await gitKor(repo, ['branch', '--show-current']);
      if (r.ud.trim() !== 'main') throw new Error(`Står på '${r.ud.trim()}', forventede 'main'`);
    } else if (n === 'ingen_netlify_staged') await netlifyIDiff(repo, ['--cached'], 'de staged ændringer');
    else if (n === 'ingen_netlify_gren') await netlifyIDiff(repo, [`main...${p.gren}`], `grenen ${p.gren}`);
    else if (n === 'ingen_netlify_push') await netlifyIDiff(repo, ['origin/main...main'], 'det der skal pushes');
    else throw new Error(`Ukendt forkontrol: ${n}`);
  }
}

// Skriver net-kort.json atomisk og genlåser den (opdaterer kun dens egen pin i laas.json).
// Afviser, hvis filen ikke matcher sin pin: så er den ændret uden for værktøjet, og den skal gennemlæses først.
function skrivNetFil(repo, mut) {
  tjekLaas(['@net-kort.json'], repo);
  return medMutex(() => {
    const d = laesJson(NETFIL);
    d.godkendt = d.godkendt || {};
    mut(d.godkendt);
    const tmp = `${NETFIL}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(d, null, 2) + '\n');
    fs.renameSync(tmp, NETFIL);
    const pins = laesJson(LAAS);
    pins['@net-kort.json'] = sha(fs.readFileSync(NETFIL));
    const tmp2 = `${LAAS}.${process.pid}.tmp`;
    fs.writeFileSync(tmp2, JSON.stringify(pins, null, 2) + '\n');
    fs.renameSync(tmp2, LAAS);
  });
}

// Godkend et netværkskort. Uden sha256: kun forhåndsvisning. Med sha256 (mindst 12 tegn af kortets hash): godkend præcis den version.
// manuel=true (kun fra --godkend på PC en) springer kaldtal-reglen over, men aldrig blokeredeKort.
async function netGodkend(p, repo, cfg, { manuel = false } = {}) {
  if (blokeret(cfg, p.kort)) throw new Error(`Kort ${p.kort} kan ikke godkendes via værktøjer (skriver database eller rører apps/netlify-prod/)`);
  const gren = (await gitKor(repo, ['branch', '--show-current'])).ud.trim();
  if (gren !== 'main') throw new Error(`Står på '${gren}', forventede 'main'. Godkendelsen skal gælde kortet, som det står på main.`);
  const fil = kortFil(repo, p.kort);
  const bytes = fs.readFileSync(fil);
  const h = sha(bytes);
  const v = netLinje(bytes);
  const max = cfg.maxNetKald ?? 400;
  const tal = kaldtal(v);
  if (!manuel) {
    if (!tal.length) throw new Error(`Netværk-linjen '${v}' angiver intet kaldtal; kortet kan ikke godkendes via værktøjer. På PC en: node server.mjs --godkend ${p.kort} <hash>`);
    if (Math.max(...tal) > max) throw new Error(`Netværk-linjen '${v}' nævner ${Math.max(...tal)}, over loftet på ${max} kald; kortet kan ikke godkendes via værktøjer. På PC en: node server.mjs --godkend ${p.kort} <hash>`);
  }
  const rel = path.relative(repo, fil).split(path.sep).join('/');
  const info = `Kort ${p.kort} (${rel})\nSHA-256: ${h}\nNetværk: ${v}\nLoft: ${max} kald${manuel ? ' (sprunget over, manuel)' : ''}`;
  if (!p.sha256) return `FORHÅNDSVISNING, intet er godkendt.\n${info}\nVis dette til Christoffer. Siger han ja i chatten, kald net_godkend igen med kort og sha256 (mindst de første 12 tegn af hashen).`;
  if (!h.startsWith(p.sha256.toLowerCase())) throw new Error(`Hashen ${p.sha256} passer ikke til kortets nuværende indhold (${h}). Kortet er ændret siden forhåndsvisningen. Vis det igen.`);
  tjekLaas(['@net-kort.json'], repo);
  logNet({ haendelse: 'godkendt_via_vaerktoej', kort: p.kort, sha256: h, netvaerk: v, manuel }, true);
  skrivNetFil(repo, g => { g[p.kort] = { sha256: h, tid: new Date().toISOString() }; });
  return `GODKENDT til netværk.\n${info}\nnet-kort.json er opdateret og genlåst.`;
}

async function netTraek(p, repo) {
  const nu = laesJson(NETFIL).godkendt?.[p.kort];
  if (!nu) return `Kort ${p.kort} var ikke godkendt; intet ændret.`;
  tjekLaas(['@net-kort.json'], repo);
  logNet({ haendelse: 'godkendelse_traekket', kort: p.kort, sha256: nu.sha256 }, true);
  skrivNetFil(repo, g => { delete g[p.kort]; });
  return `Godkendelsen af kort ${p.kort} er trukket tilbage; net-kort.json er genlåst.`;
}

async function flytKort(p, repo) {
  const nr = p.kort;
  const find = mappe => { const d = path.join(repo, 'work', mappe); return fs.existsSync(d) ? fs.readdirSync(d).filter(f => f.startsWith(`${nr}-`) && f.endsWith('.md')) : []; };
  const fra = find('future');
  if (fra.length !== 1) throw new Error(`Kort ${nr} findes ikke entydigt i work/future/ (${fra.length} fund)`);
  if (find('aabne').length) throw new Error(`Kort ${nr} findes allerede i work/aabne/`);
  const src = `work/future/${fra[0]}`, dst = `work/aabne/${fra[0]}`;
  tagLaas(`${Date.now().toString(36)}-git_flyt_kort`, 'git_flyt_kort');
  try {
    await forkontrol(['rent_trae', 'paa_main'], p, repo);
    const r = await gitKor(repo, ['mv', '--', src, dst]);
    if (r.kode !== 0) throw new Error(`git mv fejlede:\n${r.ud.trim()}`);
  } finally { slipLaas(); }
  return `Flyttet (staged): ${src} -> ${dst}\nKør git_commit for at gemme flytningen.`;
}

const INDBYGGET = { net_godkend: netGodkend, net_traek: netTraek, git_flyt_kort: flytKort };
const erIndbygget = n => { try { return !!INDBYGGET[n] && !!laesConfig().indbyggede?.[n]; } catch { return false; } };
async function koerIndbygget(navn, given) {
  const cfg = laesConfig();
  const repo = path.resolve(cfg.repo);
  const d = cfg.indbyggede?.[navn];
  if (!d || !INDBYGGET[navn]) throw new Error(`Ukendt værktøj: ${navn}`);
  return klip(await INDBYGGET[navn](tjekParametre(d.parametre, given, repo), repo, cfg));
}

function jobStatus(id) {
  if (!/^[a-z0-9_-]+$/.test(id || '')) throw new Error('Ugyldigt job-id');
  const logFil = path.join(JOBS, `${id}.log`);
  const jsonFil = path.join(JOBS, `${id}.json`);
  const hale = fs.existsSync(logFil) ? fs.readFileSync(logFil, 'utf8').slice(-4000) : '(ingen log endnu)';
  if (fs.existsSync(jsonFil)) {
    const j = JSON.parse(fs.readFileSync(jsonFil, 'utf8'));
    return `FÆRDIG, exit ${j.kode}, ${Math.round((j.slut - j.start) / 1000)} sek.${j.netlifyAendret ? '\nADVARSEL: apps/netlify-prod/ er ændret i arbejdstræet. Ret det på PC en; værktøjerne rører det ikke.' : ''}\n--- log (sidste del) ---\n${hale}`;
  }
  const k = koerer.get(id);
  if (k) return `KØRER, ${Math.round((Date.now() - k.start) / 1000)} sek.\n--- log (sidste del) ---\n${hale}`;
  return `UKENDT status (serveren er måske genstartet midt i jobbet).\n--- log ---\n${hale}`;
}

function jobListe() {
  if (!fs.existsSync(JOBS)) return 'Ingen jobs.';
  const ids = fs.readdirSync(JOBS).filter(f => f.endsWith('.log')).map(f => f.slice(0, -4)).sort().slice(-10);
  return ids.length ? ids.join('\n') : 'Ingen jobs.';
}

function skema(d) {
  const props = {};
  const krav = [];
  for (const [n, p] of Object.entries(d || {})) {
    props[n] = p.type === 'boolean' ? { type: 'boolean' } : p.type === 'stier' ? { type: 'array', items: { type: 'string' } } : { type: 'string' };
    if (p.beskrivelse) props[n].description = p.beskrivelse;
    if (p.paakraevet) krav.push(n);
  }
  return { type: 'object', properties: props, required: krav, additionalProperties: false };
}

function vaerktoejer() {
  const cfg = laesConfig();
  const liste = Object.entries(cfg.tools || {}).map(([navn, v]) => ({ name: navn, description: v.beskrivelse || navn, inputSchema: skema(v.parametre) }));
  for (const [navn, d] of Object.entries(cfg.indbyggede || {})) if (INDBYGGET[navn]) liste.push({ name: navn, description: d.beskrivelse || navn, inputSchema: skema(d.parametre) });
  liste.push({ name: 'job_status', description: 'Status og log for et baggrundsjob', inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } });
  liste.push({ name: 'job_liste', description: 'De 10 seneste baggrundsjobs', inputSchema: { type: 'object', properties: {} } });
  return liste;
}

async function haandter(msg) {
  const { id, method, params } = msg;
  if (id === undefined) return null; // notifikation
  const svar = result => ({ jsonrpc: '2.0', id, result });
  const fejl = (code, message) => ({ jsonrpc: '2.0', id, error: { code, message } });
  try {
    if (method === 'initialize') return svar({ protocolVersion: params?.protocolVersion || '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'gsb-shell', version: '1.5.0' } });
    if (method === 'ping') return svar({});
    if (method === 'tools/list') return svar({ tools: vaerktoejer() });
    if (method === 'tools/call') {
      const n = params?.name;
      const a = params?.arguments || {};
      try {
        const tekst = n === 'job_status' ? jobStatus(a.id) : n === 'job_liste' ? jobListe() : await iKoe(() => (erIndbygget(n) ? koerIndbygget(n, a) : koerVaerktoej(n, a)));
        return svar({ content: [{ type: 'text', text: tekst }] });
      } catch (e) {
        return svar({ content: [{ type: 'text', text: `FEJL: ${e.message}` }], isError: true });
      }
    }
    return fejl(-32601, `Ukendt metode: ${method}`);
  } catch (e) { return fejl(-32603, e.message); }
}

function laas() {
  const cfg = laesConfig();
  const repo = path.resolve(cfg.repo);
  const filer = [...new Set(Object.values(cfg.tools || {}).flatMap(v => v.laas || []))];
  const pins = {};
  for (const f of filer) {
    const fil = laasSti(f, repo);
    if (!fs.existsSync(fil)) { console.error(`Filen findes ikke: ${fil}`); process.exit(1); }
    pins[f] = sha(fs.readFileSync(fil));
  }
  fs.writeFileSync(LAAS, JSON.stringify(pins, null, 2) + '\n');
  console.log(`Låste ${filer.length} filer i ${LAAS}`);
  for (const [f, h] of Object.entries(pins)) console.log(`  ${f}  ${h}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--laas')) laas();
  else if (process.argv.includes('--godkend')) {
    const i = process.argv.indexOf('--godkend');
    const nr = process.argv[i + 1] || '', h = process.argv[i + 2];
    if (!/^\d{1,3}$/.test(nr)) { console.error('Brug: node server.mjs --godkend <kortnummer> [hash]  (uden hash vises kun kortet)'); process.exit(1); }
    const cfg = laesConfig();
    netGodkend({ kort: nr, ...(h ? { sha256: h } : {}) }, path.resolve(cfg.repo), cfg, { manuel: true }).then(t => console.log(t), e => { console.error(e.message); process.exit(1); });
  } else if (process.argv.includes('--hash-kort')) {
    const nr = process.argv[process.argv.indexOf('--hash-kort') + 1] || '';
    if (!/^\d{1,3}$/.test(nr)) { console.error('Brug: node server.mjs --hash-kort <nummer>'); process.exit(1); }
    const fil = kortFil(path.resolve(laesConfig().repo), nr);
    console.log(`${sha(fs.readFileSync(fil))}  ${path.relative(path.resolve(laesConfig().repo), fil)}`);
  } else {
    const rl = readline.createInterface({ input: process.stdin });
    rl.on('line', async linje => {
      if (!linje.trim()) return;
      let msg;
      try { msg = JSON.parse(linje); } catch { return; }
      const svar = await haandter(msg);
      if (svar) process.stdout.write(JSON.stringify(svar) + '\n');
    });
  }
}
