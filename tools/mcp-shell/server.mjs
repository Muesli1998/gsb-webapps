// Begrænset shell-MCP for gsb-webapps. Ingen afhængigheder. Kør: node server.mjs
// Kun de værktøjer, der står i tilladelser.json, kan køres. Filen læses igen ved hvert kald,
// så rettelser i tilladelser.json virker uden genstart (nye værktøjsnavne kræver genstart af Claude Desktop).
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

// GULV: gælder uanset hvad tilladelser.json siger.
// Git: kun disse underkommandoer, og kun de angivne flag (alt andet der starter med - afvises).
const GIT_FLAG = {
  status: ['--short', '--untracked-files=all'],
  diff: ['--check', '--stat'],
  log: ['--oneline', '-n'],
  show: ['--stat', '--oneline'],
  add: ['--'],
  commit: ['-m'],
  switch: [],
  merge: ['--ff-only'],
  branch: ['-d', '--show-current'],
  pull: ['--ff-only'],
};
const TEST_FIL = /^(tools|statistik\/scripts)\/[A-Za-z0-9_.\/-]+\.test\.mjs$/;
const PS_START = ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File'];

const sha = buf => crypto.createHash('sha256').update(buf).digest('hex');
const laesJson = fil => JSON.parse(fs.readFileSync(fil, 'utf8').replace(/^\uFEFF/, ''));
const laesConfig = () => laesJson(CONFIG);

export function gulv(cmd, args, laas = []) {
  if (!['git', 'node', 'powershell'].includes(cmd)) throw new Error(`Kommandoen ${cmd} er ikke tilladt`);
  if (cmd === 'git') {
    const tilladt = GIT_FLAG[args[0]];
    if (!tilladt) throw new Error(`git ${args[0]} er ikke tilladt`);
    for (const a of args.slice(1)) {
      if (a === '--') break; // efter -- er alt stier
      if (a.startsWith('-') && !tilladt.includes(a)) throw new Error(`git ${args[0]}: argumentet ${a} er ikke tilladt`);
    }
  }
  if (cmd === 'powershell') {
    if (PS_START.some((x, i) => args[i] !== x)) throw new Error(`powershell skal starte med ${PS_START.join(' ')}`);
    if (!laas.includes(args[4])) throw new Error(`powershell-scriptet ${args[4]} er ikke på værktøjets låste liste`);
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
  const fuld = path.resolve(repo, s);
  if (!fuld.startsWith(repo + path.sep)) throw new Error(`Stien ligger uden for repoet: ${s}`);
  const ar = norm(fs.realpathSync.native(repo));
  const af = norm(aegte(fuld));
  if (!af.startsWith(ar + path.sep)) throw new Error(`Stien peger uden for repoet (symlink/junction): ${s}`);
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

function tjekLaas(laas, repo) {
  if (!laas || !laas.length) return;
  let pins = {};
  try { pins = laesJson(LAAS); } catch {}
  for (const f of laas) {
    const h = sha(fs.readFileSync(path.join(repo, f)));
    if (!pins[f]) throw new Error(`${f} er ikke låst. Gennemlæs filen og kør: node server.mjs --laas`);
    if (pins[f] !== h) throw new Error(`${f} er ændret siden den blev låst (nu ${h}). Gennemlæs ændringen og kør: node server.mjs --laas`);
  }
}

const HEAD = 10000;
const TAIL = 10000;
function koerTrin(cmd, args, cwd, tidSek, onData) {
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
      barn = spawn(cmd, args, { cwd, shell: false, windowsHide: true, env });
    } catch (e) { return resolve({ kode: -1, ud: String(e.message) }); }
    const ur = setTimeout(() => { give(Buffer.from(`\n[afbrudt efter ${tidSek} sek]`)); try { barn.kill(); } catch {} }, tidSek * 1000);
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

async function koerVaerktoej(navn, given) {
  const cfg = laesConfig();
  const repo = path.resolve(cfg.repo);
  const v = cfg.tools?.[navn];
  if (!v) throw new Error(`Ukendt værktøj: ${navn}`);
  const p = tjekParametre(v.parametre, given, repo);
  const trin = v.trin.map(t => ({ cmd: t.cmd, args: udvid(t.args, p) }));
  for (const t of trin) gulv(t.cmd, t.args, v.laas || []);
  tjekLaas(v.laas, repo);
  if (v.skriver && koerer.size > 0) throw new Error(`Et job kører (${[...koerer.keys()].join(', ')}); ${navn} ændrer arbejdstræet og afvises indtil det er færdigt`);
  const tid = v.tidsgraenseSek || 120;

  if (v.baggrund) {
    if (koerer.size > 0) throw new Error(`Et job kører allerede: ${[...koerer.keys()].join(', ')}`);
    fs.mkdirSync(JOBS, { recursive: true });
    const id = `${Date.now().toString(36)}-${navn}`;
    const logFil = path.join(JOBS, `${id}.log`);
    const start = Date.now();
    koerer.set(id, { start, navn });
    (async () => {
      let sidste = 0;
      for (const t of trin) {
        fs.appendFileSync(logFil, `$ ${t.cmd} ${t.args.join(' ')}\n`);
        let skrevet = 0;
        const r = await koerTrin(t.cmd, t.args, repo, tid, d => {
          skrevet += d.length;
          if (skrevet <= LOG_MAX) fs.appendFileSync(logFil, d);
          else if (skrevet - d.length <= LOG_MAX) fs.appendFileSync(logFil, '\n[log afkortet ved 5 MB]\n');
        });
        sidste = r.kode;
        fs.appendFileSync(logFil, `\n[exit ${r.kode}]\n`);
        if (r.kode !== 0) break;
      }
      fs.writeFileSync(path.join(JOBS, `${id}.json`), JSON.stringify({ id, navn, start, slut: Date.now(), kode: sidste }));
      koerer.delete(id);
    })();
    return `Startet i baggrunden. Job-id: ${id}\nBrug job_status med dette id.`;
  }

  let tekst = '';
  for (const t of trin) {
    const r = await koerTrin(t.cmd, t.args, repo, tid);
    tekst += `$ ${t.cmd} ${t.args.join(' ')}\n${r.ud.trim()}\n[exit ${r.kode}]\n`;
    if (r.kode !== 0) { tekst += '(stoppet)\n'; break; }
  }
  return klip(tekst);
}

function jobStatus(id) {
  if (!/^[a-z0-9_-]+$/.test(id || '')) throw new Error('Ugyldigt job-id');
  const logFil = path.join(JOBS, `${id}.log`);
  const jsonFil = path.join(JOBS, `${id}.json`);
  const hale = fs.existsSync(logFil) ? fs.readFileSync(logFil, 'utf8').slice(-4000) : '(ingen log endnu)';
  if (fs.existsSync(jsonFil)) {
    const j = JSON.parse(fs.readFileSync(jsonFil, 'utf8'));
    return `FÆRDIG, exit ${j.kode}, ${Math.round((j.slut - j.start) / 1000)} sek.\n--- log (sidste del) ---\n${hale}`;
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
    if (method === 'initialize') return svar({ protocolVersion: params?.protocolVersion || '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'gsb-shell', version: '1.0.0' } });
    if (method === 'ping') return svar({});
    if (method === 'tools/list') return svar({ tools: vaerktoejer() });
    if (method === 'tools/call') {
      const n = params?.name;
      const a = params?.arguments || {};
      try {
        const tekst = n === 'job_status' ? jobStatus(a.id) : n === 'job_liste' ? jobListe() : await iKoe(() => koerVaerktoej(n, a));
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
    const fil = path.join(repo, f);
    if (!fs.existsSync(fil)) { console.error(`Filen findes ikke: ${fil}`); process.exit(1); }
    pins[f] = sha(fs.readFileSync(fil));
  }
  fs.writeFileSync(LAAS, JSON.stringify(pins, null, 2) + '\n');
  console.log(`Låste ${filer.length} filer i ${LAAS}`);
  for (const [f, h] of Object.entries(pins)) console.log(`  ${f}  ${h}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--laas')) laas();
  else {
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
