import fs from 'node:fs'; import path from 'node:path'; import { spawnSync, spawn } from 'node:child_process'; import os from 'node:os'; import { fileURLToPath } from 'node:url';
const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'skriv-kort-afsnit.mjs');
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'skrivkort-'));
const lavRepo = navn => { const r = path.join(base, navn); fs.mkdirSync(path.join(r, 'tools'), { recursive: true }); fs.mkdirSync(path.join(r, 'work', 'aabne'), { recursive: true }); fs.copyFileSync(SRC, path.join(r, 'tools', 'skriv-kort-afsnit.mjs')); return r; };
const repo = lavRepo('repo'); const wd = path.join(repo, 'work', 'aabne');
let n = 0, ok = 0; const t = (navn, c) => { n++; try { if (c()) { ok++; console.log('OK   ' + navn); } else console.log('FEJL ' + navn); } catch (e) { console.log('FEJL ' + navn + ' ' + e.message); } };
const BOM = '﻿';
const kort = (eol, bom = true, slutEol = true) => (bom ? BOM : '') + ['# Opgave 1 — æøå ÆØÅ', '', '**Status:** hø', '', '## Spørgsmål', '(Tomt.)', '', '## Tilbagefald', 'Slet filerne.', '', '## Resultat', '(Udfyldes af Codex.)'].join(eol) + (slutEol ? eol + eol : '');
fs.mkdirSync(path.join(repo, 'work', 'koersler'), { recursive: true }); const tf = path.join(repo, 'work', 'koersler', 'ny.txt');
const run = (r, relSti, afs, tekst, ...e) => { fs.mkdirSync(path.dirname(tf), { recursive: true }); fs.writeFileSync(tf, tekst); return spawnSync('node', [path.join(r, 'tools', 'skriv-kort-afsnit.mjs'), relSti, afs, tf, ...e], { encoding: 'utf8', cwd: r }); };
const skriv = (navn, indhold) => { fs.writeFileSync(path.join(wd, navn), indhold); return 'work/aabne/' + navn; };
const bytes = rel => fs.readFileSync(path.join(repo, ...rel.split('/')));
const tempRest = d => fs.readdirSync(d).some(x => x.includes('.tmp'));

for (const [navn, eol] of [['LF', '\n'], ['CRLF', '\r\n']]) for (const afs of ['Spørgsmål', 'Resultat']) {
  const f = skriv(`1-${navn}-${afs}.md`, kort(eol)); const orig = bytes(f);
  const r = run(repo, f, afs, 'Første linje æøå\nAnden linje — ok'); const nu = bytes(f).toString('utf8');
  t(`${navn} ${afs}: exit 0`, () => r.status === 0);
  t(`${navn} ${afs}: BOM bevaret`, () => bytes(f)[0] === 0xef);
  t(`${navn} ${afs}: ny tekst + korrekt eol`, () => nu.includes('Første linje æøå' + eol + 'Anden linje — ok'));
  t(`${navn} ${afs}: andre afsnit uændrede`, () => nu.includes(afs === 'Spørgsmål' ? '(Udfyldes af Codex.)' : '(Tomt.)') && nu.includes('Slet filerne.'));
  const o = orig.toString('utf8'); const hs = o.indexOf('## ' + afs); const hl = o.indexOf(eol, hs) + eol.length; const nxt = o.indexOf('## ', hl); const slut = nxt < 0 ? o.length : nxt;
  t(`${navn} ${afs}: bytes udenfor identiske`, () => Buffer.from(o.slice(0, hl)).equals(Buffer.from(nu.slice(0, hl))) && Buffer.from(o.slice(slut)).equals(Buffer.from(nu.slice(nu.length - (o.length - slut)))));
  t(`${navn} ${afs}: ingen tempfil`, () => !tempRest(wd));
}
{ const f = skriv('2-tilfoej.md', kort('\n')); run(repo, f, 'Spørgsmål', 'Spm 1'); const r = run(repo, f, 'Spørgsmål', 'Spm 2', '--tilfoej'); t('--tilfoej', () => r.status === 0 && /Spm 1\nSpm 2\n\n## Tilbagefald/.test(bytes(f).toString('utf8'))); }
{ const f = skriv('3-intet-eol.md', kort('\n', false, false)); const r = run(repo, f, 'Resultat', 'Færdig'); const b = bytes(f); t('uden BOM / afsnit sidst uden slut-eol', () => r.status === 0 && b[0] !== 0xef && b.toString('utf8').endsWith('## Resultat\nFærdig\n')); }
{ const f = skriv('4-bland.md', BOM + '# T — æ\r\n\n## Spørgsmål\n(Tomt.)\n\r\n## Resultat\r\n(x)\n'); const r = run(repo, f, 'Spørgsmål', 'Q'); t('blandede eol uden for afsnit bevares', () => r.status === 0 && bytes(f).toString('utf8').startsWith(BOM + '# T — æ\r\n\n## Spørgsmål\nQ\n\n## Resultat\r\n(x)\n')); }
{ const f = skriv('6-moj.md', BOM + '# Opgave â€” rÃ¦kke\n\n## Spørgsmål\n(Tomt.)\n\n## Resultat\n(x)\n'); run(repo, f, 'Resultat', 'Y'); t('mojibake i resten røres ikke', () => bytes(f).toString('utf8').startsWith(BOM + '# Opgave â€” rÃ¦kke\n\n## Spørgsmål\n(Tomt.)\n\n## Resultat\nY\n')); }

// --- Fejl lukket: kortet skal være byte-identisk bagefter, og ingen tempfil.
const fejlTest = (navn, f, afs, tekst, ...e) => { const o = fs.readFileSync(path.join(repo, ...f.split('/'))); const r = run(repo, f, afs, tekst, ...e); t(navn, () => r.status === 1 && fs.readFileSync(path.join(repo, ...f.split('/'))).equals(o) && !tempRest(wd)); };
const orig = kort('\n');
fejlTest('forbudt afsnit afvises', skriv('5-a.md', orig), 'Tilbagefald', 'x');
fejlTest('afsnit findes ikke', skriv('5-b.md', orig.replace('## Resultat', '## Andet')), 'Resultat', 'x');
fejlTest('dobbelt overskrift', skriv('5-c.md', orig + '## Resultat\nmere\n'), 'Resultat', 'x');
fejlTest('ny tekst med ## afvises', skriv('5-d.md', orig), 'Resultat', 'ok\n## Nyt');
fejlTest('tom tekst afvises', skriv('5-e.md', orig), 'Resultat', '  \n');
fs.writeFileSync(path.join(wd, '5-f.md'), Buffer.concat([Buffer.from(orig), Buffer.from([0xff, 0xfe, 0x41])])); fejlTest('ugyldig UTF-8 afvises', 'work/aabne/5-f.md', 'Resultat', 'x');
t('sti med .. afvises', () => run(repo, 'work/aabne/../aabne/5-a.md', 'Resultat', 'x').status === 1);
t('sti uden for work/ afvises', () => { fs.writeFileSync(path.join(repo, '7-rod.md'), orig); return run(repo, '7-rod.md', 'Resultat', 'x').status === 1; });

// --- Stier uden for repoet (Codex' fund).
const ekstern = path.join(base, 'andet'); const eWd = path.join(ekstern, 'work', 'aabne'); fs.mkdirSync(eWd, { recursive: true });
const eFil = path.join(eWd, '172-test.md'); fs.writeFileSync(eFil, orig); const eOrig = fs.readFileSync(eFil);
t('absolut ekstern sti med work/aabne i navnet afvises', () => run(repo, eFil, 'Resultat', 'x').status === 1 && fs.readFileSync(eFil).equals(eOrig));
t('relativ sti ud af repoet afvises', () => run(repo, path.relative(repo, eFil), 'Resultat', 'x').status === 1 && fs.readFileSync(eFil).equals(eOrig));
let symlinkOk = true;
try { fs.symlinkSync(eFil, path.join(wd, '8-link.md')); } catch { symlinkOk = false; console.log('(springer symlink-filtest over: ingen rettighed)'); }
if (symlinkOk) t('symlink til fil uden for repoet afvises', () => run(repo, 'work/aabne/8-link.md', 'Resultat', 'x').status === 1 && fs.readFileSync(eFil).equals(eOrig));
{ // hele work/aabne er en junction/symlink ud af repoet
  const r2 = lavRepo('repo2'); fs.rmSync(path.join(r2, 'work', 'aabne'), { recursive: true });
  let lav = true; try { fs.symlinkSync(eWd, path.join(r2, 'work', 'aabne'), 'junction'); } catch { lav = false; console.log('(springer junction-test over: ingen rettighed)'); }
  if (lav) t('junction work/aabne -> uden for repoet afvises', () => run(r2, 'work/aabne/172-test.md', 'Resultat', 'x').status === 1 && fs.readFileSync(eFil).equals(eOrig));
}
{ // undermappe-junction: work/aabne/under -> ud
  const r3 = lavRepo('repo3'); let lav = true; try { fs.symlinkSync(path.join(ekstern, 'work', 'aabne'), path.join(r3, 'work', 'aabne', 'under'), 'junction'); } catch { lav = false; }
  if (lav) t('junction i undermappe afvises', () => run(r3, 'work/aabne/under/172-test.md', 'Resultat', 'x').status === 1);
}
{ // tekstfil uden for repoet afvises; fejlbeskeden forbyder helfil-fallback
  const udenfor = path.join(base, 'udenfor.txt'); fs.writeFileSync(udenfor, 'hemmelig tekst'); const f = skriv('10-kilde.md', orig); const o = bytes(f);
  const r = spawnSync('node', [path.join(repo, 'tools', 'skriv-kort-afsnit.mjs'), f, 'Resultat', udenfor], { encoding: 'utf8', cwd: repo });
  t('tekstfil uden for repoet afvises, kortet urørt', () => r.status === 1 && bytes(f).equals(o));
  t('fejlbesked forbyder helfil-fallback', () => /Skriv ikke hele kortfilen som fallback/.test(r.stderr));
  const r2 = spawnSync('node', [path.join(repo, 'tools', 'skriv-kort-afsnit.mjs'), f, 'Resultat', 'work/koersler/findes-ikke.txt'], { encoding: 'utf8', cwd: repo });
  t('manglende tekstfil afvises', () => r2.status === 1 && bytes(f).equals(o));
  const r3 = spawnSync('node', [path.join(repo, 'tools', 'skriv-kort-afsnit.mjs'), f, 'Tilbagefald', tf], { encoding: 'utf8', cwd: repo });
  t('forbudt afsnit giver også fallback-forbud', () => r3.status === 1 && /ikke hele kortfilen/.test(r3.stderr));
}
// --- Samtidig ændring: kortet ændres, mens scriptet venter på sin tekst fra stdin.
await new Promise(res => {
  const f = skriv('9-samtidig.md', orig); const fp = path.join(repo, ...f.split('/'));
  const c = spawn('node', [path.join(repo, 'tools', 'skriv-kort-afsnit.mjs'), f, 'Resultat', '-'], { cwd: repo }); let err = '';
  c.stderr.on('data', d => err += d); c.stdin.write('x');
  setTimeout(() => { fs.appendFileSync(fp, 'ændret af andre\n'); const efterAndre = fs.readFileSync(fp); c.stdin.end(); c.on('close', code => {
    t('samtidig ændring: afbrudt, andres ændring bevaret, ingen tempfil', () => code === 1 && fs.readFileSync(fp).equals(efterAndre) && !tempRest(wd)); res(); }); }, 2000);
});
fs.rmSync(base, { recursive: true, force: true });
console.log(`\n${ok}/${n} bestået`); process.exit(ok === n ? 0 : 1);
