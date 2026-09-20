const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repoRoot = path.resolve(__dirname, '../../..');
const sourcePath = path.join(repoRoot, 'kampsystem/kampsystem_source.html');
const source = fs.readFileSync(sourcePath, 'utf8');
const script = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .find((text) => text.includes('function kaonsbevidstFordeling'));
assert.ok(script, 'preview-kilden skal indeholde kønsfordelingslogikken');

const element = () => ({ value: '', checked: false, innerHTML: '', className: '', style: {}, dataset: {},
  classList: { add() {}, remove() {}, toggle() {} }, addEventListener() {}, appendChild() {},
  querySelector() { return element(); }, querySelectorAll() { return []; } });
const context = {
  console,
  document: { getElementById() { return element(); }, querySelector() { return { value: 'ens' }; },
    querySelectorAll() { return []; }, createElement() { return element(); }, addEventListener() {} },
  window: {}, localStorage: { getItem() { return null; }, setItem() {} },
  fetch: async () => ({ json: async () => ({}) }), URLSearchParams, setTimeout() {}, alert() {}, confirm() { return true; },
};
vm.createContext(context);
const iifeEnd = script.lastIndexOf('})();');
assert.notEqual(iifeEnd, -1, 'preview-kilden skal have en afsluttende IIFE');
const exportStatement = `globalThis.__tested = {
  kaonsbevidstFordeling, fordelTilDoubleOgMixed, formTeams, formTeamsMixed,
};`;
vm.runInContext(`${script.slice(0, iifeEnd)}\n${exportStatement}\n${script.slice(iifeEnd)}`, context, { filename: sourcePath });
const tested = context.__tested;

function player(name, rating, koen, modes = { double: true, mixed: true }) {
  return { navn: name, koen, single: rating, double: rating, mix: rating, modes };
}
function teamsFor(doublePool, mixedPool) {
  return tested.formTeams(doublePool, 'ens', true).kampe.concat(tested.formTeamsMixed(mixedPool, 'ens').kampe);
}

let passed = 0;
let failed = 0;
const failures = [];
function scenario(name, fn) {
  try { fn(); passed += 1; }
  catch (error) { failed += 1; failures.push(`${name}: ${error.message}`); }
}

scenario('1 blandet alternativ foretrækkes', () => {
  const players = [player('H1', 1500, 'H'), player('H2', 1490, 'H'), player('D1', 1500, 'D'), player('D2', 1490, 'D')];
  const plan = tested.kaonsbevidstFordeling([], [], players);
  const pools = tested.fordelTilDoubleOgMixed([], [], players, 'ens');
  const matches = teamsFor(pools.doublePool, pools.mixedPool);
  assert.equal(plan.t, 2);
  assert.equal(pools.doublePool.length, 0);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].type, 'mixed');
});

scenario('2 kun ét køn accepteres uden hang eller udeladelse', () => {
  const players = [player('H1', 1500, 'H'), player('H2', 1490, 'H'), player('H3', 1480, 'H'), player('H4', 1470, 'H')];
  const plan = tested.kaonsbevidstFordeling([], [], players);
  const pools = tested.fordelTilDoubleOgMixed([], [], players, 'ens');
  const matches = teamsFor(pools.doublePool, pools.mixedPool);
  assert.equal(plan.t, 0);
  assert.equal(matches.length, 1);
  assert.equal(new Set(matches.flatMap((m) => [...m.a, ...m.b]).map((p) => p.navn)).size, 4);
});

scenario('3 blødhed: ekstremt skævt blandet alternativ dokumenteres', () => {
  const players = [player('H1', 3000, 'H'), player('H2', 2990, 'H'), player('D1', 1000, 'D'), player('D2', 990, 'D')];
  const pools = tested.fordelTilDoubleOgMixed([], [], players, 'ens');
  const mixedPairs = tested.formTeamsMixed(pools.mixedPool, 'ens').kampe[0];
  const mixedPartnerGaps = [
    Math.abs(mixedPairs.a[0].mix - mixedPairs.a[1].mix),
    Math.abs(mixedPairs.b[0].mix - mixedPairs.b[1].mix),
  ];
  const pureMatches = tested.formTeams(players, 'ens', true).kampe;
  const purePartnerGaps = pureMatches.flatMap((match) => [
    Math.abs(match.a[0].double - match.a[1].double),
    Math.abs(match.b[0].double - match.b[1].double),
  ]);
  assert.equal(mixedPairs.type, 'mixed');
  assert.equal(mixedPartnerGaps.length, 2);
  assert.equal(mixedPartnerGaps[0], 2000); assert.equal(mixedPartnerGaps[1], 2000);
  assert.equal(purePartnerGaps.length, 2);
  assert.equal(purePartnerGaps[0], 10); assert.equal(purePartnerGaps[1], 10);
  assert.equal(pools.doublePool.length, 0);
});

scenario('4 ingen niveau-tærskel eller net-skævhedsregel i koden', () => {
  assert.equal(/(?:threshold|tærsk|niveau.{0,30}(?:grænse|tærsk)|1\s*dame\s*3\s*herre)/i.test(source), false);
  assert.equal(source.toLowerCase().includes('kun ved et reelt ulige antal i begge rene kønsgrupper'), true);
  assert.match(source, /formTeams: danner double-hold RENT EFTER KØN/);
});

console.log(`Kønsbalanceret parring: ${passed} bestået, ${failed} fejlet`);
if (failed) { console.error(failures.join('\n')); process.exitCode = 1; }
