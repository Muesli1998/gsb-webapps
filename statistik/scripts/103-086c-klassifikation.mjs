import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

// Reconstruction of the generator used for 086c.  The original transient
// command was not committed; this recreates its data classification and
// verifies it against the already approved embedded HTML dataset.
const db = new DatabaseSync('statistik/data/liga-landskab.db', { readOnly: true });
const all = (sql) => db.prepare(sql).all();
const key = (season, age, group, region) => `${season}|${age}|${group}|${region}`;
const noCategories = 'ingen gemte kategorier';

function readEmbeddedRows() {
  const html = fs.readFileSync('statistik/results/086c-udvidet-visuelt-kort.html', 'utf8');
  const start = html.indexOf('const D=') + 'const D='.length;
  const end = html.indexOf(';const $=', start);
  if (start === 'const D='.length - 1 || end < start) {
    throw new Error('Kunne ikke finde det indlejrede 086c-datasæt.');
  }
  return JSON.parse(html.slice(start, end)).x;
}

function baseDivision(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s*[-–]\s*(spilletider.*|slutspil.*|kvalifikation.*)$/, '')
    .replace(/\s+(slutspil|kvalifikation)$/, '')
    .trim();
}

function formatFromText(value) {
  const text = String(value ?? '').toLowerCase().normalize('NFC');
  const plus = text.match(/\(?\s*(\d+)\s*\+\s*(\d+)\s*\)?/);
  if (plus) return `${plus[1]}+${plus[2]}`;
  const players = text.match(/\b(\d+)\s*spillere?\b/);
  if (players) return `${players[1]} spillere`;
  const girls = text.match(/\b(\d+)\s*piger\b/);
  if (girls) return `${girls[1]} piger`;
  return null;
}

const categorySignatures = new Map(all(`
  SELECT mg.season_id, mg.age_group_id, mg.league_group_id,
         GROUP_CONCAT(DISTINCT mc.category_raw) AS categories
  FROM league_match_groups mg
  JOIN match_categories mc ON mc.external_match_id = mg.external_match_id
  GROUP BY mg.season_id, mg.age_group_id, mg.league_group_id
`).map((row) => [
  `${row.season_id}|${row.age_group_id}|${row.league_group_id}`,
  String(row.categories ?? '').split(',').filter(Boolean).sort().join(' · ') || noCategories,
]));

const rawRows = all(`
  SELECT g.season_id, g.age_group_id, g.league_group_id,
         g.division_name_raw, r.region_id
  FROM league_groups g
  JOIN league_group_regions r
    ON r.season_id = g.season_id
   AND r.age_group_id = g.age_group_id
   AND r.league_group_id = g.league_group_id
`).map((row) => ({
  season: row.season_id,
  age: row.age_group_id,
  group: String(row.league_group_id),
  region: row.region_id,
  division: row.division_name_raw ?? '',
  family: categorySignatures.get(`${row.season_id}|${row.age_group_id}|${row.league_group_id}`) ?? noCategories,
}));

// Only actual categories qualify as a source for inheritance.  A text signal
// never feeds another row, which prevents accidental transitive inference.
const knownByBase = new Map();
for (const row of rawRows.filter((row) => row.family !== noCategories)) {
  const lookup = `${row.season}|${row.age}|${row.region}|${baseDivision(row.division)}`;
  if (!knownByBase.has(lookup)) knownByBase.set(lookup, new Set());
  knownByBase.get(lookup).add(row.family);
}

const summary = { inherited: 0, textSignal: 0, unknown: 0 };
for (const row of rawRows.filter((row) => row.family === noCategories)) {
  const lookup = `${row.season}|${row.age}|${row.region}|${baseDivision(row.division)}`;
  const candidates = [...(knownByBase.get(lookup) ?? [])];
  if (candidates.length === 1) {
    row.family = candidates[0];
    row.fallback = 'arvet fra grundspil med samme række-navn';
    summary.inherited += 1;
  } else {
    const format = formatFromText(row.division);
    if (format) {
      row.family = `Format via rækkenavn: ${format}`;
      row.fallback = 'tekstsignal';
      summary.textSignal += 1;
    } else {
      row.family = 'Ukendt format — ingen kategorier eller formatsignal';
      row.fallback = 'ukendt';
      summary.unknown += 1;
    }
  }
}

const embedded = new Map(readEmbeddedRows().map((row) => [key(row.s, row.a, row.g, row.r), row]));
const discrepancies = [];
for (const row of rawRows) {
  const actual = embedded.get(key(row.season, row.age, row.group, row.region));
  if (!actual || actual.f !== row.family || (actual.fallback ?? null) !== (row.fallback ?? null)) {
    discrepancies.push({
      key: key(row.season, row.age, row.group, row.region),
      expected_family: row.family,
      actual_family: actual?.f ?? null,
      expected_fallback: row.fallback ?? null,
      actual_fallback: actual?.fallback ?? null,
    });
  }
}

const uniqueGroups = new Set(rawRows.map((row) => `${row.season}|${row.age}|${row.group}`)).size;
const result = {
  source: 'reconstruction_from_approved_086c_html_and_documented_rules',
  occurrences: rawRows.length,
  unique_groups: uniqueGroups,
  classification: summary,
  embedded_rows: embedded.size,
  discrepancies: discrepancies.length,
  samples: {
    u15_4_plus_3: rawRows.find((row) => row.group === '18978')?.family,
    u15_2_plus_2: rawRows.find((row) => row.group === '18980')?.family,
    copenhagen_playoff: rawRows.find((row) => row.group === '18902')?.family,
  },
};

console.log(JSON.stringify(result, null, 2));
if (summary.inherited !== 686 || summary.textSignal !== 839 || summary.unknown !== 856 ||
    uniqueGroups !== 18546 || rawRows.length !== 59127 || discrepancies.length !== 0) {
  process.exitCode = 1;
}
