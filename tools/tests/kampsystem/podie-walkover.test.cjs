const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repoRoot = path.resolve(__dirname, '../../..');
const prodRoot = path.join(repoRoot, 'apps/netlify-prod/netlify/functions');
const stillingSource = fs.readFileSync(path.join(prodRoot, 'stilling.js'), 'utf8');
const resultsSource = fs.readFileSync(path.join(prodRoot, 'hent-resultater.js'), 'utf8');

const podiumFunction = stillingSource.match(/function erPodieBerettiget\(betalingRaw\) \{[\s\S]*?\n\}/);
const walkoverFunction = resultsSource.match(/function erWalkover\(navne\) \{[\s\S]*?\n\}/);
assert.ok(podiumFunction, 'stilling.js skal indeholde erPodieBerettiget');
assert.ok(walkoverFunction, 'hent-resultater.js skal indeholde erWalkover');
const context = {};
vm.createContext(context);
vm.runInContext(`${podiumFunction[0]}\n${walkoverFunction[0]}`, context, { filename: 'production-functions.js' });

function csvFields(line) {
  return [...line.matchAll(/"((?:[^"]|"")*)"/g)].map((match) => match[1].replace(/""/g, '"'));
}
const csvLines = fs.readFileSync(path.join(repoRoot, 'kampsystem/resultater_2526.csv'), 'utf8')
  .split(/\r?\n/).filter(Boolean).slice(1).map(csvFields);
const jsonRows = JSON.parse(fs.readFileSync(path.join(repoRoot, 'kampsystem/resultater_2425.json'), 'utf8'));
const actualWalkoverTexts = [...new Set([
  ...csvLines.flatMap((row) => [row[3], row[4]]),
  ...jsonRows.flatMap((row) => [row[3], row[4]]),
].filter((value) => /ikke\s*fremm[øo]dt/i.test(value || '')))];
const actualOrdinaryNames = [...new Set([
  ...csvLines.flatMap((row) => [row[3], row[4]]),
  ...jsonRows.flatMap((row) => [row[3], row[4]]),
].filter((value) => value && !/ikke\s*fremm[øo]dt/i.test(value)))].slice(0, 5);
assert.ok(actualWalkoverTexts.length > 0, 'rå kampdata skal indeholde mindst én faktisk walkover-tekst');
assert.ok(actualOrdinaryNames.length > 0, 'rå kampdata skal indeholde mindst ét almindeligt navn');

const paymentCases = [
  ['', true], [' ', true], ['Ja', true], ['ja', true], ['Betalt', true], ['BETALT', true],
  ['Gratis', false], ['Nej', false], ['Afventer', false],
];
let podiumPassed = 0;
const podiumFailures = [];
for (const [value, expected] of paymentCases) {
  try { assert.equal(context.erPodieBerettiget(value), expected); podiumPassed += 1; }
  catch (error) { podiumFailures.push(`${JSON.stringify(value)}: ${error.message}`); }
}

let walkoverPassed = 0;
const walkoverFailures = [];
for (const value of actualWalkoverTexts) {
  try { assert.equal(context.erWalkover([value]), true); walkoverPassed += 1; }
  catch (error) { walkoverFailures.push(`walkover ${JSON.stringify(value)}: ${error.message}`); }
}
for (const value of actualOrdinaryNames) {
  try { assert.equal(context.erWalkover([value]), false); walkoverPassed += 1; }
  catch (error) { walkoverFailures.push(`ordinary ${JSON.stringify(value)}: ${error.message}`); }
}

console.log(`Podie: ${podiumPassed}/${paymentCases.length} bestået, ${podiumFailures.length} fejlet`);
console.log(`Walkover: ${walkoverPassed}/${actualWalkoverTexts.length + actualOrdinaryNames.length} bestået, ${walkoverFailures.length} fejlet`);
if (podiumFailures.length || walkoverFailures.length) {
  console.error([...podiumFailures, ...walkoverFailures].join('\n'));
  process.exitCode = 1;
}
