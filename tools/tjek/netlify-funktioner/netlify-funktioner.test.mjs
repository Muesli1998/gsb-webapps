import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const lib = path.join(root, 'apps/netlify-prod/netlify/lib');
const functions = path.join(root, 'apps/netlify-prod/netlify/functions');
function load(file, modules = {}) {
  const context = { module: { exports: {} }, exports: {}, require: (id) => modules[id] ?? {}, process: { env: {} }, fetch: async () => { throw new Error('fetch stub called'); } };
  context.exports = context.module.exports;
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return context;
}
const names = load(path.join(lib, 'navne.js'));
const aliases = vm.runInNewContext(`(${fs.readFileSync(path.join(lib, 'navne.js'), 'utf8').match(/const ALIAS_RAA = (\{[\s\S]*?\n\};)/)[1].slice(0,-1)})`);

// HERRER_2627 + DAMER_2627 are the 44-name canonical roster in spillere.js.
const rosterSource = fs.readFileSync(path.join(functions, 'spillere.js'), 'utf8');
const rosterContext = { exports: {}, require: () => ({}) };
vm.runInNewContext(rosterSource.slice(0, rosterSource.indexOf('exports.handler')), rosterContext);
const roster = vm.runInNewContext('HERRER_2627.concat(DAMER_2627)', rosterContext);

test('navne.js: all 44 canonical roster names map to themselves', () => {
  assert.equal(roster.length, 44);
  for (const name of roster) assert.equal(names.module.exports.officieltNavn(name), name);
});
test('navne.js: every listed alias maps to its official name', () => {
  for (const [alias, official] of Object.entries(aliases)) assert.equal(names.module.exports.officieltNavn(alias), official, alias);
});
test('navne.js: unknown names pass through trimmed; matching ignores case and whitespace', () => {
  assert.equal(names.module.exports.officieltNavn('  helt ukendt navn  '), 'helt ukendt navn');
  assert.equal(names.module.exports.officieltNavn('  hAnNaH   phoebejada   clAuSen '), 'Hannah Clausen');
});

const fetcher = load(path.join(functions, 'hent-resultater.js'), { googleapis: { google: {} }, '../lib/navne': names.module.exports });
const erWalkover = vm.runInNewContext('erWalkover', fetcher);
for (const [label, input, expected] of [
  ['only one side', ['Ikke fremmødt'], true],
  ['both sides', ['Ikke fremmødt', 'Ikke fremmødt'], true],
  ['parentheses', ['(Ikke fremmødt)'], true],
  ['spacing', ['Ikke   fremmødt'], true],
  ['uppercase', ['IKKE FREMMØDT'], true],
  ['none', ['Ada Spiller'], false],
]) test(`erWalkover: ${label}`, () => assert.equal(erWalkover(input), expected));

const runAnalyse = async (rows, players = ['Alice', 'Bob', 'Cara']) => {
  const google = { auth: { GoogleAuth: class {} }, sheets: () => ({ spreadsheets: { values: { get: async ({ range }) => ({ data: { values: range.startsWith('Resultater') ? rows : players.map((n) => [n]) } }) } } }) };
  const ctx = load(path.join(functions, 'analyse.js'), { googleapis: { google }, '../lib/navne': names.module.exports, '../lib/statistik-spillere': { STATISTIK_SPILLERE: [] } });
  ctx.process.env.GOOGLE_SERVICE_ACCOUNT_JSON = '{}';
  const response = await ctx.exports.handler({ httpMethod: 'GET', queryStringParameters: { spreadsheetId: 'stub' } });
  return JSON.parse(response.body);
};
const row = (home, away, winner, set1 = '21-10') => ['1', 'GSB 1', 'HS', home, away, ...set1.split('-'), '', winner];
test("analyse snapshot: vinder '?' tælles i dag som tab (F1)", async () => {
  const out = await runAnalyse([row('Alice', 'X', 'Hjemme'), row('Bob', 'X', 'Ude'), row('Cara', 'X', '?')]);
  assert.deepEqual(JSON.parse(JSON.stringify(out.teams)), [{ hold: 'GSB 1', wins: 1, losses: 2, total: 3, winPct: 33.3 }]);
  assert.equal(out.totalRows, 3);
});
test('KENDT FEJL — F1: walkover must not collapse to away win', { todo: 'Forventet at fejle indtil 029' }, async () => {
  const out = await runAnalyse([row('Alice', 'Rival', '?')]);
  assert.equal(out.teams[0].wins, 0);
  assert.equal(out.teams[0].losses, 0);
});
test('F2: later known singles board and second row of doubles board are counted', async () => {
  // Singles: each row is its own board; the later known-player row must count.
  const singles = await runAnalyse([row('Unknown', 'Rival', 'Hjemme'), row('Alice', 'Rival', 'Hjemme')]);
  assert.equal(singles.teams[0].wins, 1);
  // Doubles: rows 1 and 2 share board 1; recognition on row 2 must count it.
  const doubles = await runAnalyse([
    ['1', 'GSB 1', 'HD', 'Unknown', 'Rival', '21', '10', '', 'Hjemme'],
    ['1', 'GSB 1', 'HD', 'Alice', 'Rival', '21', '10', '', 'Hjemme'],
  ]);
  assert.equal(doubles.teams[0].wins, 1);
});


