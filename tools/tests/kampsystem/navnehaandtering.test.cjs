const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repoRoot = path.resolve(__dirname, '../../..');
const sourcePath = path.join(repoRoot, 'kampsystem/kampsystem_source.html');
const source = fs.readFileSync(sourcePath, 'utf8');
const script = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .find((text) => text.includes('function renderSoegning'));
assert.ok(script, 'preview-kilden skal indeholde søgefunktionen');

const elements = new Map();
function element() {
  return { value: '', checked: false, innerHTML: '', className: '', style: {}, dataset: {},
    classList: { add() {}, remove() {}, toggle() {} }, addEventListener() {}, appendChild() {},
    querySelector() { return element(); }, querySelectorAll() { return []; } };
}
const context = {
  console,
  document: {
    getElementById(id) { if (!elements.has(id)) elements.set(id, element()); return elements.get(id); },
    querySelector() { return { value: 'ens' }; }, querySelectorAll() { return []; },
    createElement() { return element(); }, addEventListener() {},
  },
  window: {}, localStorage: { getItem() { return null; }, setItem() {} },
  fetch: async () => ({ json: async () => ({}) }), URLSearchParams, setTimeout() {},
  alert() {}, confirm() { return true; },
};
vm.createContext(context);
const iifeEnd = script.lastIndexOf('})();');
assert.notEqual(iifeEnd, -1, 'preview-kilden skal have en afsluttende IIFE');
const exportStatement = `globalThis.__tested = {
  byNavn, renderSoegning,
  setData: (players, allPlayers) => {
    roster.splice(0, roster.length, ...players);
    GSB_ALLE_SPILLERE = allPlayers;
  },
  search: (query) => {
    document.getElementById('soege-input').value = query;
    renderSoegning();
    return document.getElementById('soege-resultat').innerHTML;
  },
};`;
vm.runInContext(`${script.slice(0, iifeEnd)}\n${exportStatement}\n${script.slice(iifeEnd)}`, context, { filename: sourcePath });
const tested = context.__tested;

const aliases = JSON.parse(fs.readFileSync(path.join(repoRoot, 'data/navne-alias.json'), 'utf8'));
const knownAliases = [
  ['Anja Gunna Thomsen', 'Anja Thomsen'],
  ['Jonathan Hansen', 'Jonathan W. Hansen'],
  ['Louise Korsby Kofoed', 'Louise Kofoed'],
];

let passed = 0;
let failed = 0;
const failures = [];
function scenario(name, fn) {
  try { fn(); passed += 1; }
  catch (error) { failed += 1; failures.push(`${name}: ${error.message}`); }
}
function setRoster(names) {
  tested.setData(names.map((navn) => ({ navn, gruppe: 'Motionist' })), names.map((navn) => ({ navn })));
}
function setSearchData(names) {
  tested.setData([], names.map((navn) => ({ navn })));
}

scenario('1 danske tegn i søgning og opslag', () => {
  setSearchData(['Søren Østergaard', 'Mette Åkær']);
  assert.match(tested.search('øster'), /Søren Østergaard/);
  assert.match(tested.search('åkær'), /Mette Åkær/);
  setRoster(['Søren Østergaard']);
  assert.equal(tested.byNavn('Søren Østergaard').navn, 'Søren Østergaard');
});

scenario('2 stort/småt bogstav er uafhængigt i søgning', () => {
  setSearchData(['Christoffer Müller']);
  assert.match(tested.search('CHRISTOFFER'), /Christoffer Müller/);
  setRoster(['Christoffer Müller']);
  assert.equal(tested.byNavn('christoffer müller'), undefined);
});

scenario('3 ekstra og dobbelte mellemrum håndteres', () => {
  setSearchData(['Anna Hansen']);
  assert.match(tested.search('Anna'), /Anna Hansen/);
  assert.match(tested.search(' Anna '), /Anna Hansen/);
  assert.match(tested.search('Anna  Hansen'), /Anna Hansen/);
});

scenario('4 tre kendte aliaser fra data/navne-alias.json virker', () => {
  assert.equal(aliases.alias_2526['Anja Gunna Thomsen'], 'Anja Thomsen');
  assert.equal(aliases.alias_2526['Jonathan Hansen'], 'Jonathan W. Hansen');
  const all = knownAliases.map(([alias, officiel]) => ({ navn: officiel }));
  tested.setData([], all);
  for (const [alias, officiel] of knownAliases) assert.match(tested.search(alias), new RegExp(officiel));
});

scenario('5 ukendt navn giver tomt resultat og kontrolleret opslag', () => {
  setRoster(['Eksisterende Navn']);
  assert.doesNotThrow(() => tested.search('Findes Ikke'));
  assert.equal(tested.search('Findes Ikke'), '');
  assert.equal(tested.byNavn('Findes Ikke'), undefined);
});

console.log(`Navnehåndtering: ${passed} bestået, ${failed} fejlet`);
if (failed) { console.error(failures.join('\n')); process.exitCode = 1; }
