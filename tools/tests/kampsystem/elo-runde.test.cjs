const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repoRoot = path.resolve(__dirname, '../../..');
const sourcePath = path.join(repoRoot, 'kampsystem/kampsystem_source.html');
const source = fs.readFileSync(sourcePath, 'utf8');
const script = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .find((text) => text.includes('function forventetVind'));

assert.ok(script, 'kampsystem.html skal indeholde den inline beregningskode, der testes');

const element = () => ({
  value: '',
  checked: false,
  innerHTML: '',
  className: '',
  style: {},
  dataset: {},
  classList: { add() {}, remove() {} },
  addEventListener() {},
  appendChild() {},
  querySelector() { return element(); },
  querySelectorAll() { return []; },
});

const context = {
  console,
  document: {
    getElementById() { return element(); },
    querySelector() { return { value: 'ens' }; },
    querySelectorAll() { return []; },
    createElement() { return element(); },
    addEventListener() {},
  },
  window: {},
  localStorage: { getItem() { return null; }, setItem() {} },
  fetch: async () => ({ json: async () => ({}) }),
  URLSearchParams,
  setTimeout() {},
  alert() {},
  confirm() { return true; },
};
vm.createContext(context);

const exportNames = [
  'forventetVind', 'eloAendring', 'pairSingles', 'formTeams', 'formTeamsMixed',
  'dannHold', 'holdRating', 'effektivRating', 'registerVinder', 'holdRatingSafe',
];
const exportStatement = `globalThis.__tested = { ${exportNames.map((name) => `${name}: ${name}`).join(', ')}, setState: (matches) => { rundeAlleMatches = matches; rundeErBekraeftet = true; rundeTaeller = 1; } };`;
const iifeEnd = script.lastIndexOf('})();');
assert.notEqual(iifeEnd, -1, 'preview-kilden skal have en afsluttende IIFE');
const executable = `${script.slice(0, iifeEnd)}\n${exportStatement}\n${script.slice(iifeEnd)}`;
vm.runInContext(executable, context, { filename: sourcePath });
const tested = context.__tested;

const constants = {
  divisor: Number(source.match(/(?:ELO_DIVISOR|DIVISOR)\s*=\s*(\d+)/)?.[1]),
  k: Number(source.match(/(?:K|K_FAKTOR)\s*=\s*(\d+)/)?.[1]),
};
assert.ok(Number.isFinite(constants.divisor), 'ELO_DIVISOR skal kunne læses fra prod-koden');
assert.ok(Number.isFinite(constants.k), 'K skal kunne læses fra prod-koden');

function player(name, rating = 1500, koen) {
  return { navn: name, single: rating, double: rating, mix: rating, koen };
}

const equalExpected = tested.forventetVind(1500, 1500);
assert.equal(equalExpected, 0.5, 'samme rating skal give 50/50');

const formulaExpected = 1 / (1 + 10 ** ((1700 - 1500) / constants.divisor));
assert.ok(Math.abs(tested.forventetVind(1500, 1700) - formulaExpected) < 1e-12,
  'forventet score skal følge ELO-formlen');

assert.equal(tested.eloAendring(1500, 1500, true), Math.round(constants.k * 0.5));
assert.equal(tested.eloAendring(1500, 1500, false), -Math.round(constants.k * 0.5));

const favouriteDelta = tested.eloAendring(1700, 1500, true);
const upsetDelta = tested.eloAendring(1700, 1500, false);
assert.ok(favouriteDelta < Math.abs(upsetDelta), 'favoritsejr skal give mindre ændring end overraskende sejr');

assert.equal(tested.effektivRating({ single: null }, 'single'), 2000,
  'urated spiller skal bruge preview-kildens fallback-rating 2000');

const singles = tested.pairSingles([player('S1', 1800), player('S2', 1700), player('S3', 1600), player('S4', 1500), player('S5', 1400)]);
assert.equal(singles.kampe.length, 2);
assert.equal(singles.oversiddere.length, 1, 'ulige antal singler skal give én bye');
assert.equal(new Set(singles.kampe.flatMap((m) => [...m.a, ...m.b])).size, 4);

const sameTeams = tested.formTeams([player('M1', 1800, 'H'), player('M2', 1700, 'H'), player('K1', 1600, 'D'), player('K2', 1500, 'D')], 'staerksvag', false);
assert.equal(sameTeams.kampe.length, 1);
assert.equal(sameTeams.oversiddere.length, 0);
const mixedTeams = tested.formTeamsMixed([player('MM1', 1800, 'H'), player('MM2', 1700, 'H'), player('MK1', 1600, 'D'), player('MK2', 1500, 'D')], 'staerksvag');
assert.equal(mixedTeams.kampe.length, 1);
assert.equal(mixedTeams.oversiddere.length, 0);

const teams = tested.dannHold([player('T1', 1800), player('T2', 1700), player('T3', 1600), player('T4', 1500)], 'staerksvag');
assert.equal(teams.length, 2);
assert.equal(new Set(teams.flat()).size, 4, 'dannHold må ikke udelade eller gentage spillere');

console.log(`ELO_DIVISOR=${constants.divisor}, K=${constants.k}`);
console.log('13 tests passed, 0 failed');

const categoryFailures = [];
function categoryScenario(name, fn) {
  try { fn(); } catch (error) { categoryFailures.push(`${name}: ${error.message}`); }
}
function rated(name, value, mixValue = value) {
  return { navn: name, single: value, double: value, mix: mixValue };
}
function runRegistered(type, a, b, side = 'a', extra = {}) {
  const match = { type, a, b, ...extra };
  tested.setState([match]);
  tested.registerVinder(0, side);
  return match;
}

categoryScenario('1 lige ratings', () => {
  const a = [rated('C1A', 1500), rated('C1B', 1500)];
  const b = [rated('C1C', 1500), rated('C1D', 1500)];
  runRegistered('mixed', a, b);
  assert.equal(a[0].mix, 1535);
  assert.equal(b[0].mix, 1465);
});

categoryScenario('2 klar favorit vinder', () => {
  const a = [rated('C2A', 1700), rated('C2B', 1700)];
  const b = [rated('C2C', 1500), rated('C2D', 1500)];
  runRegistered('double', a, b);
  assert.ok(a[0].double > 1700 && a[0].double < 1770);
});

categoryScenario('3 underdog vinder', () => {
  const a = [rated('C3A', 1700), rated('C3B', 1700)];
  const b = [rated('C3C', 1500), rated('C3D', 1500)];
  runRegistered('double', a, b, 'b');
  assert.ok(b[0].double > 1500);
});

categoryScenario('4 ekstreme ratings', () => {
  const delta = tested.eloAendring(1000, 2500, true);
  assert.ok(Number.isFinite(delta));
  assert.ok(delta >= 0 && delta <= constants.k);
});

categoryScenario('5 udskiftningskamp ingen ændring', () => {
  const a = [rated('C5A', 1500)];
  const b = [rated('C5B', 1500)];
  runRegistered('single', a, b, 'a', { udskiftning: true });
  assert.equal(a[0].single, 1500);
  assert.equal(b[0].single, 1500);
});

categoryScenario('6 manglende rating ingen ændring', () => {
  const a = [rated('C6A', 1500, null), rated('C6B', 1500, 1500)];
  const b = [rated('C6C', 1500), rated('C6D', 1500)];
  runRegistered('mixed', a, b);
  assert.equal(a[0].mix, null);
  assert.equal(b[0].mix, 1500);
});

categoryScenario('7 nulsum for alle ratingKeys', () => {
  for (const type of ['single', 'double', 'mixed']) {
    const key = type === 'mixed' ? 'mix' : type;
    const a = [rated(`C7A-${type}`, 1600)];
    const b = [rated(`C7B-${type}`, 1400)];
    const beforeA = a[0][key];
    const beforeB = b[0][key];
    runRegistered(type, a, b);
    assert.equal((a[0][key] - beforeA) + (b[0][key] - beforeB), 0);
  }
});

categoryScenario('8 mixed ændrer kun mix', () => {
  const a = [rated('C8A', 1600, 1800), rated('C8B', 1600, 1800)];
  const b = [rated('C8C', 1400, 1400), rated('C8D', 1400, 1400)];
  runRegistered('mixed', a, b);
  assert.equal(a[0].double, 1600);
  assert.equal(b[0].double, 1400);
  assert.notEqual(a[0].mix, 1800);
});

categoryScenario('9 double ændrer kun double', () => {
  const a = [rated('C9A', 1800, 1600), rated('C9B', 1800, 1600)];
  const b = [rated('C9C', 1400, 1400), rated('C9D', 1400, 1400)];
  runRegistered('double', a, b);
  assert.notEqual(a[0].double, 1800);
  assert.equal(a[0].mix, 1600);
  assert.equal(b[0].mix, 1400);
});

categoryScenario('10 fallback lækker ikke double til mix', () => {
  const a = [rated('C10A', 98765, null), rated('C10B', 1500, 1500)];
  const b = [rated('C10C', 1500, 1500), rated('C10D', 1500, 1500)];
  runRegistered('mixed', a, b);
  assert.equal(a[0].mix, null);
  assert.notEqual(a[0].mix, 98765);
  assert.equal(a[0].double, 98765);
});

categoryScenario('11 ratingKey-opslag', () => {
  assert.ok(source.includes("k.type === 'single' ? 'single' : (k.type === 'double' ? 'double' : 'mix')"));
  assert.ok(source.includes("k.type === 'single' || k.type === 'double' || k.type === 'mixed'"));
});

console.log(`Kategoriintegritet: ${11 - categoryFailures.length} bestået, ${categoryFailures.length} fejlet`);
if (categoryFailures.length) {
  console.error(categoryFailures.join('\n'));
  process.exitCode = 1;
}
