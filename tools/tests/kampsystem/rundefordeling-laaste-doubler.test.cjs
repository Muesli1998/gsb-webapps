const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repoRoot = path.resolve(__dirname, '../../..');
const sourcePath = path.join(repoRoot, 'kampsystem/kampsystem_source.html');
const source = fs.readFileSync(sourcePath, 'utf8');
const script = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .find((text) => text.includes('function pairSingles'));
assert.ok(script, 'preview-kilden skal indeholde rundefordelingsfunktionerne');

const element = () => ({
  value: '', checked: false, innerHTML: '', className: '', style: {}, dataset: {},
  classList: { add() {}, remove() {}, toggle() {} }, addEventListener() {},
  appendChild() {}, querySelector() { return element(); }, querySelectorAll() { return []; },
});
const context = {
  console,
  document: {
    getElementById() { return element(); }, querySelector() { return { value: 'ens' }; },
    querySelectorAll() { return []; }, createElement() { return element(); }, addEventListener() {},
  },
  window: {}, localStorage: { getItem() { return null; }, setItem() {} },
  fetch: async () => ({ json: async () => ({}) }), URLSearchParams, setTimeout() {},
  alert() {}, confirm() { return true; },
};
vm.createContext(context);

const exportStatement = `globalThis.__tested = {
  pairSingles, formTeams, formTeamsMixed, effektivRating,
  reducerGentagelse, omkostning, kaonsbevidstFordeling, fordelTilDoubleOgMixed,
  tilfoejLaastKamp, genererRunde,
  setState: (players, locks, history = []) => {
    roster.splice(0, roster.length, ...players);
    lockedMatches.splice(0, lockedMatches.length, ...locks);
    matchHistory = history;
    aktivGrupper.clear(); aktivGrupper.add('Motionist');
    settings.baner = 5; settings.filosofi = 'ens'; settings.teknikLoft = 0;
    settings.tillUdskifSingle = false; settings.tillUdskifDouble = false;
    rundeTaeller = 1; rundeAlleMatches = []; pendingOversiddereForRunde = [];
    pendingUdskiftningForRunde = []; rundeErBekraeftet = false;
  },
  matches: () => rundeAlleMatches,
  locks: () => lockedMatches,
};`;
const iifeEnd = script.lastIndexOf('})();');
assert.notEqual(iifeEnd, -1, 'preview-kilden skal have en afsluttende IIFE');
vm.runInContext(`${script.slice(0, iifeEnd)}\n${exportStatement}\n${script.slice(iifeEnd)}`, context, { filename: sourcePath });
const tested = context.__tested;

function player(name, rating = 1500, modes = { single: true, double: true, mixed: true }, koen = 'H', tilstede = true) {
  return { navn: name, gruppe: 'Motionist', tilstede, modes, koen,
    single: rating, double: rating, mix: rating, tvungenSpil: false, tvingTilTeknik: false,
    oversidderTaeller: 0 };
}
function doubleLock(a1, a2, b1, b2) {
  return { kategori: 'double', a: [a1, a2], b: [b1, b2] };
}
function allNames(matches) { return matches.flatMap((match) => [...match.a, ...match.b]).map((p) => p.navn); }

let passed = 0;
let failed = 0;
const failures = [];
function scenario(name, fn) {
  try { fn(); passed += 1; }
  catch (error) { failed += 1; failures.push(`${name}: ${error.message}`); }
}

scenario('1 lige og ulige antal spillere', () => {
  const even = tested.pairSingles([player('S1'), player('S2'), player('S3'), player('S4')]);
  const odd = tested.pairSingles([player('S1'), player('S2'), player('S3')]);
  assert.equal(even.kampe.length, 2); assert.equal(even.oversiddere.length, 0);
  assert.equal(odd.kampe.length, 1); assert.equal(odd.oversiddere.length, 1);
});

scenario('2 nul og én spiller', () => {
  const empty = tested.pairSingles([]);
  assert.equal(empty.kampe.length, 0); assert.equal(empty.oversiddere.length, 0);
  const one = tested.pairSingles([player('S1')]);
  assert.equal(one.kampe.length, 0); assert.equal(one.oversiddere.length, 1);
  assert.equal(tested.effektivRating({ double: null }, 'double'), 2000);
});

scenario('3 stort felt uden dubletter eller udeladelser', () => {
  const players = Array.from({ length: 44 }, (_, i) => player(`S${i}`));
  const result = tested.pairSingles(players);
  const names = result.kampe.flatMap((m) => [...m.a, ...m.b]).concat(result.oversiddere).map((p) => p.navn);
  assert.equal(result.kampe.length, 22); assert.equal(new Set(names).size, 44);
});

scenario('4 ens og blandet filosofi er internt konsistente', () => {
  const players = [player('M1', 1800, { double: true }, 'H'), player('M2', 1700, { double: true }, 'H'),
    player('K1', 1600, { double: true }, 'D'), player('K2', 1500, { double: true }, 'D')];
  for (const philosophy of ['ens', 'staerksvag']) {
    const result = tested.formTeams(players, philosophy, false);
    const names = result.kampe.flatMap((m) => [...m.a, ...m.b]).concat(result.oversiddere).map((p) => p.navn);
    assert.equal(new Set(names).size, 4); assert.equal(result.kampe.every((m) => m.type === 'double'), true);
  }
  const mixed = tested.formTeamsMixed(players, 'ens');
  assert.equal(mixed.kampe[0].type, 'mixed');
  assert.equal(mixed.kampe[0].a[0].koen !== mixed.kampe[0].a[1].koen, true);
});

scenario('5 gentagelses-undgåelse og dokumenteret begrænsning', () => {
  const a = player('A'), b = player('B'), c = player('C'), d = player('D');
  const history = [{ runde: 1, type: 'single', a: ['A'], b: ['C'] }, { runde: 1, type: 'single', a: ['B'], b: ['D'] }];
  tested.setState([], [], history);
  const original = [{ type: 'single', a: [a], b: [c] }, { type: 'single', a: [b], b: [d] }];
  const before = original.reduce((sum, match) => sum + tested.omkostning(match), 0);
  const result = tested.reducerGentagelse(original);
  const swapped = tested.reducerGentagelse(result);
  assert.equal(swapped.length, 2);
  const after = swapped.reduce((sum, match) => sum + tested.omkostning(match), 0);
  assert.ok(after < before, `swappet gentagelsesomkostning skal falde (${before} -> ${after})`);
  assert.equal(new Set(swapped.flatMap((m) => [...m.a, ...m.b]).map((p) => p.navn)).size, 4);
  assert.ok(tested.reducerGentagelse, 'gentagelses-API skal være kortlagt');
});

scenario('6 multi-kategorispillere fordeles med mindst mulig rest', () => {
  const dob = [player('D1', 1500, { double: true }, 'H'), player('D2', 1500, { double: true }, 'H')];
  const mix = [player('M1', 1500, { mixed: true }, 'H'), player('M2', 1500, { mixed: true }, 'D')];
  const begge = [player('B1', 1500, { double: true, mixed: true }, 'H'), player('B2', 1500, { double: true, mixed: true }, 'D')];
  const plan = tested.kaonsbevidstFordeling(dob, mix, begge);
  const pools = tested.fordelTilDoubleOgMixed(dob, mix, begge, 'ens');
  assert.equal(plan.oversiddere, 0); assert.equal(pools.mixedPool.length % 2, 0); assert.equal(pools.doublePool.length % 4, 0);
});

scenario('7 låst double kommer uændret med i runden', () => {
  const names = ['A1', 'A2', 'B1', 'B2'];
  tested.setState(names.map((name) => player(name)), [doubleLock(...names)]);
  tested.genererRunde();
  const matches = tested.matches();
  assert.equal(matches[0].laast, true);
  assert.deepEqual(allNames([matches[0]]), names);
});

scenario('8 låst double med fraværende spiller afvises', () => {
  const players = ['A1', 'A2', 'B1'].map((name) => player(name));
  players.push(player('B2', 1500, { single: true, double: true, mixed: true }, 'H', false));
  tested.setState(players, [doubleLock('A1', 'A2', 'B1', 'B2')]);
  tested.genererRunde();
  assert.equal(allNames(tested.matches()).includes('B2'), false);
});

scenario('9 overlappende låste doubler afvises ved oprettelse', () => {
  tested.setState(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1'].map((name) => player(name)), []);
  tested.tilfoejLaastKamp('double', 'A1', 'A2', 'B1', 'B2');
  tested.tilfoejLaastKamp('double', 'B1', 'C1', 'C2', 'D1');
  assert.equal(tested.locks().length, 1);
});

scenario('10 tyndt felt omkring låst double giver ikke crash', () => {
  tested.setState(['A1', 'A2', 'B1', 'B2', 'C1'].map((name) => player(name)), [doubleLock('A1', 'A2', 'B1', 'B2')]);
  assert.doesNotThrow(() => tested.genererRunde());
  assert.equal(tested.matches()[0].laast, true);
});

console.log(`Rundefordeling/låste doubler: ${passed} bestået, ${failed} fejlet`);
if (failed) { console.error(failures.join('\n')); process.exitCode = 1; }
