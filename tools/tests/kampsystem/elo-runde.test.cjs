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
  'dannHold', 'holdRating', 'effektivRating',
];
const exportStatement = `globalThis.__tested = { ${exportNames.map((name) => `${name}: ${name}`).join(', ')} };`;
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
