import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gsb-shell-'));
const repo = path.join(tmp, 'repo');
fs.mkdirSync(path.join(repo, 'tools'), { recursive: true });
const git = (...a) => execFileSync('git', a, { cwd: repo, encoding: 'utf8' });
git('init', '-q', '-b', 'main');
git('config', 'user.email', 't@t.t');
git('config', 'user.name', 'T');
fs.writeFileSync(path.join(repo, 'a.txt'), 'a\n');
git('add', 'a.txt');
git('commit', '-q', '-m', 'start');

const cfg = JSON.parse(fs.readFileSync(path.join(HERE, 'tilladelser.json'), 'utf8'));
cfg.repo = repo;
cfg.tools.sletter = { beskrivelse: 'x', trin: [{ cmd: 'git', args: ['push'] }] };
cfg.tools.skal = { beskrivelse: 'x', trin: [{ cmd: 'bash', args: ['-c', 'echo hej'] }] };
cfg.tools.laast = { beskrivelse: 'x', laas: ['tools/s.mjs'], trin: [{ cmd: 'node', args: ['tools/s.mjs'] }] };
cfg.tools.bg = { beskrivelse: 'x', baggrund: true, trin: [{ cmd: 'node', args: ['tools/s.mjs'] }] };
fs.mkdirSync(path.join(repo, 'tools', 'tjek'), { recursive: true });
fs.writeFileSync(path.join(repo, 'tools', 'tjek', 'db-hashes.mjs'), '//');
fs.writeFileSync(path.join(repo, 'tools', 'koer-kort.ps1'), '#');
fs.writeFileSync(path.join(repo, 'tools', 's.mjs'), 'console.log("ok-fra-script")\n');
const cfgFil = path.join(tmp, 'tilladelser.json');
fs.writeFileSync(cfgFil, JSON.stringify(cfg));

const env = { ...process.env, GSB_SHELL_CONFIG: cfgFil, GSB_SHELL_LAAS: path.join(tmp, 'laas.json'), GSB_SHELL_JOBS: path.join(tmp, 'jobs') };
const server = spawn('node', [path.join(HERE, 'server.mjs')], { env });
let buf = '';
const venter = new Map();
server.stdout.on('data', d => {
  buf += d;
  let i;
  while ((i = buf.indexOf('\n')) >= 0) {
    const linje = buf.slice(0, i); buf = buf.slice(i + 1);
    const m = JSON.parse(linje);
    venter.get(m.id)?.(m); venter.delete(m.id);
  }
});
let nr = 0;
const rpc = (method, params) => new Promise(res => { const id = ++nr; venter.set(id, res); server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n'); });
const kald = async (navn, args = {}) => { const r = await rpc('tools/call', { name: navn, arguments: args }); return { fejl: !!r.result.isError, tekst: r.result.content[0].text }; };
const vent = ms => new Promise(r => setTimeout(r, ms));
test.after(() => { server.kill(); fs.rmSync(tmp, { recursive: true, force: true }); });

test('initialize og tools/list', async () => {
  const i = await rpc('initialize', { protocolVersion: '2025-03-26' });
  assert.equal(i.result.protocolVersion, '2025-03-26');
  const l = await rpc('tools/list', {});
  const navne = l.result.tools.map(t => t.name);
  for (const n of ['git_status', 'git_add', 'kort_koer', 'job_status']) assert.ok(navne.includes(n), n);
});

test('git_status og git_log virker', async () => {
  assert.match((await kald('git_status')).tekst, /\[exit 0\]/);
  assert.match((await kald('git_log', { antal: '3' })).tekst, /start/);
});

test('stier: .., absolut, .git, startende - og jokertegn afvises', async () => {
  for (const s of ['../x', '/etc/passwd', '.git/config', '-A', 'a*.txt', 'C:/x']) {
    const r = await kald('git_add', { stier: [s] });
    assert.ok(r.fejl, s);
  }
});

test('add + commit med eksplicit sti; Co-Authored-By afvises', async () => {
  fs.writeFileSync(path.join(repo, 'b.txt'), 'b\n');
  assert.ok(!(await kald('git_add', { stier: ['b.txt'] })).fejl);
  assert.ok((await kald('git_commit', { besked: 'Tilføj b\nCo-Authored-By: x' })).fejl);
  assert.ok((await kald('git_commit', { besked: 'Tilføj b. Co-Authored-By: x' })).fejl);
  const ok = await kald('git_commit', { besked: 'Tilføj b' });
  assert.ok(!ok.fejl, ok.tekst);
  assert.match((await kald('git_log', { antal: '1' })).tekst, /Tilføj b/);
});

test('gulvet: git push og ukendt kommando afvises selv hvis config tillader dem', async () => {
  assert.match((await kald('sletter')).tekst, /ikke tilladt/);
  assert.match((await kald('skal')).tekst, /ikke tilladt/);
});

test('ukendt værktøj og ukendt parameter afvises', async () => {
  assert.ok((await kald('findes_ikke')).fejl);
  assert.ok((await kald('git_status', { x: 1 })).fejl);
});

test('git_flet_gren afviser grene uden arbejde/ og kræver ff', async () => {
  assert.ok((await kald('git_flet_gren', { gren: 'main' })).fejl);
  assert.ok((await kald('git_flet_gren', { gren: 'arbejde/x; rm -rf' })).fejl);
});

test('låste filer: afvises uden lås, virker med lås, afvises ved ændring', async () => {
  assert.match((await kald('laast')).tekst, /ikke låst/);
  execFileSync('node', [path.join(HERE, 'server.mjs'), '--laas'], { env });
  const ok = await kald('laast');
  assert.match(ok.tekst, /ok-fra-script/);
  fs.appendFileSync(path.join(repo, 'tools', 's.mjs'), '// ændret\n');
  assert.match((await kald('laast')).tekst, /ændret siden/);
});

test('baggrundsjob: start, status, færdig', async () => {
  const s = await kald('bg');
  const id = /Job-id: (\S+)/.exec(s.tekst)[1];
  let st = '';
  for (let i = 0; i < 20 && !/FÆRDIG/.test(st); i++) { await vent(200); st = (await kald('job_status', { id })).tekst; }
  assert.match(st, /FÆRDIG, exit 0/);
  assert.match(st, /ok-fra-script/);
  assert.ok((await kald('job_status', { id: '../x' })).fejl);
});
