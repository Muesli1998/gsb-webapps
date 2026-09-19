const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repoRoot = path.resolve(__dirname, '../../..');
const sourcePath = path.join(repoRoot, 'apps/netlify-prod/public/kampsystem.html');
const source = fs.readFileSync(sourcePath, 'utf8');
const script = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .find((text) => text.includes('function expectedScore'));

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
  'expectedScore', 'pairSingles', 'formTeams', 'matchTeams', 'fallbackRating',
  'lavUdskiftningskampe', 'opdaterRating', 'teamAvg',
];
const exportStatement = `globalThis.__tested = { ${exportNames.map((name) => `${name}: ${name}`).join(', ')} };`;
vm.runInContext(`${script}\n${exportStatement}`, context, { filename: sourcePath });
const tested = context.__tested;

const constants = {
  divisor: Number(source.match(/const ELO_DIVISOR\s*=\s*(\d+)/)?.[1]),
  k: Number(source.match(/const K\s*=\s*(\d+)/)?.[1]),
};
assert.ok(Number.isFinite(constants.divisor), 'ELO_DIVISOR skal kunne læses fra prod-koden');
assert.ok(Number.isFinite(constants.k), 'K skal kunne læses fra prod-koden');

function player(name, rating = 1500) {
  return { navn: name, single: rating, _real: null, _hasRating: true };
}

const equalExpected = tested.expectedScore(1500, 1500);
assert.equal(equalExpected, 0.5, 'samme rating skal give 50/50');

const formulaExpected = 1 / (1 + 10 ** ((1700 - 1500) / constants.divisor));
assert.ok(Math.abs(tested.expectedScore(1500, 1700) - formulaExpected) < 1e-12,
  'forventet score skal følge ELO-formlen');

const a = player('A');
const b = player('B');
const equalMatch = { a: [a], b: [b] };
tested.opdaterRating(equalMatch, 'a', 'single', 1500, 1500);
assert.equal(equalMatch.delta, Math.round(constants.k * (1 - 0.5)));
assert.equal(a.single, 1500 + equalMatch.delta);
assert.equal(b.single, 1500 - equalMatch.delta);

const favourite = { a: [player('F', 1700)], b: [player('U', 1500)] };
tested.opdaterRating(favourite, 'a', 'single', 1700, 1500);
const upset = { a: [player('F2', 1700)], b: [player('U2', 1500)] };
tested.opdaterRating(upset, 'b', 'single', 1700, 1500);
assert.ok(favourite.delta < Math.abs(upset.delta), 'favoritsejr skal give mindre ændring end overraskende sejr');

const noRatingA = { navn: 'NR-A', single: null, _hasRating: false };
const noRatingB = player('NR-B');
const noRatingMatch = { a: [noRatingA], b: [noRatingB] };
tested.opdaterRating(noRatingMatch, 'a', 'single', 1500, 1500);
assert.equal(noRatingMatch.ratingOpdateret, false);
assert.equal(noRatingB.single, 1500, 'manglende rating må ikke ændre modstanderens rating');

const singles = tested.pairSingles([1, 2, 3, 4, 5]);
assert.equal(singles.matches.length, 2);
assert.equal(Array.from(singles.sidder).join(','), '5', 'ulige antal singler skal give én bye');
assert.equal(new Set(singles.matches.flatMap((m) => [...m.a, ...m.b])).size, 4);

const sameTeams = tested.formTeams([1, 2, 3, 4, 5], 'ens');
assert.equal(sameTeams.teams.length, 2);
assert.equal(Array.from(sameTeams.sidder).join(','), '5');
const mixedTeams = tested.formTeams([1, 2, 3, 4, 5], 'blandet');
assert.equal(mixedTeams.teams.length, 2);
assert.equal(Array.from(mixedTeams.sidder).join(','), '3');

const teams = [[player('T1', 1800), player('T2', 1800)], [player('T3', 1700), player('T4', 1700)], [player('T5', 1600), player('T6', 1600)]];
const teamMatches = tested.matchTeams(teams, 'double', 'single');
assert.equal(teamMatches.matches.length, 1);
assert.equal(teamMatches.sidder.length, 2, 'ulige antal hold skal efterlade ét oversiddende hold');

const replacement = tested.lavUdskiftningskampe([player('R1', 1800), player('R2', 1700), player('R3', 1600)]);
assert.equal(replacement.length, 1);
assert.equal(replacement[0].udskiftning, true);
assert.equal(replacement[0].ratingOpdateret, undefined, 'udskiftningskampen skal først markeres ved klik');

console.log(`ELO_DIVISOR=${constants.divisor}, K=${constants.k}`);
console.log('13 tests passed, 0 failed');
