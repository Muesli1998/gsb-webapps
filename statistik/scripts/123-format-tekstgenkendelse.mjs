import crypto from 'node:crypto';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const DB_PATH = 'statistik/data/liga-landskab.db';
const OUT_DIR = 'statistik/results/123-format-tekstgenkendelse';
const YOUTH_AGE_IDS = new Set([2, 3, 4, 5, 6, 7, 18]);

const db = new DatabaseSync(DB_PATH, { readOnly: true });
const groupRows = db.prepare(`
  SELECT g.season_id, g.age_group_id, g.league_group_id,
         COALESCE(g.division_name_raw, '') division_name_raw,
         COALESCE(g.group_name_raw, '') group_name_raw,
         COALESCE(g.page_title_raw, '') page_title_raw
  FROM league_groups g
`).all();
const categoryRows = db.prepare(`
  SELECT mg.season_id, mg.age_group_id, mg.league_group_id, trim(mc.category_raw) category_raw
  FROM league_match_groups mg
  JOIN match_categories mc ON mc.external_match_id = mg.external_match_id
  WHERE mc.category_raw IS NOT NULL AND trim(mc.category_raw) <> ''
`).all();
db.close();

const categories = new Map();
for (const row of categoryRows) {
  const key = `${row.season_id}|${row.age_group_id}|${row.league_group_id}`;
  if (!categories.has(key)) categories.set(key, new Set());
  categories.get(key).add(row.category_raw);
}

function categoryCounts(values) {
  const counts = {};
  for (const value of values) {
    const match = value.match(/^\d+\.\s*([A-Z]+)$/iu);
    if (match) counts[match[1]] = (counts[match[1]] ?? 0) + 1;
  }
  return counts;
}

function structurFamily(values) {
  const counts = categoryCounts(values);
  const signature = [...values].sort((a, b) => a.localeCompare(b, 'da')).join(' · ') || 'ingen gemte kategorier';
  const is = (expected) => Object.keys(counts).length === Object.keys(expected).length
    && Object.entries(expected).every(([key, value]) => counts[key] === value);
  if (is({ S: 4, D: 1 })) return { value: '3 spillere-struktur', signature };
  if (is({ S: 4, D: 2 })) return { value: '4 spillere-struktur', signature };
  if (is({ S: 4, D: 3 })) return { value: '5 spillere-struktur', signature };
  if (is({ MD: 2, DS: 2, DD: 1, HS: 2, HD: 2 })) return { value: '4+3-struktur', signature };
  if (is({ MD: 2, DS: 2, DD: 1, HS: 2, HD: 1 })) return { value: '2+2-struktur', signature };
  if (is({ MD: 1, DS: 1, DD: 1, HS: 3, HD: 2 })) return { value: '4+2-struktur', signature };
  if (is({ DS: 4, DD: 2 })) return { value: '4 piger-struktur', signature };
  return { value: null, signature };
}

function parseText(text) {
  const lower = text.toLowerCase().normalize('NFC');
  const applied = [
    [/\b4\s*(?:spillere|sp\.)\b/iu, '4 spillere', '4 spillere / 4 Sp.'],
    [/\b4\s*[bc]\s*spillere\b/iu, '4 spillere', '4B/4C Spillere'],
    [/\b4\s*piger\b/iu, '4 piger', '4 piger'],
    [/\b3\s*spillere\b/iu, '3 spillere', '3 spillere'],
    [/\b2\s*\+\s*2\b/iu, '2+2', '2+2'],
    [/\b4\s*\+\s*3\b/iu, '4+3', '4+3'],
    [/\b4\s*\+\s*2\b/iu, '4+2', '4+2'],
    [/\bx[12]\b/iu, null, null],
  ];
  for (const [pattern, format, variant] of applied) {
    const match = lower.match(pattern);
    if (match) {
      const literal = match[0].toUpperCase();
      return { format: format ?? literal, variant: variant ?? literal, status: 'anvendt', matched: match[0] };
    }
  }
  const pending = [
    [/\b4\s*[-–]\s*8\s*spillere\b/iu, '4-8 spillere', 'ukendt'],
    [/\b4\s*m\s*\/\s*k\b/iu, '4 m/k', '4 spillere?'],
    [/\b4\s*dr\s*hold\b/iu, '4 dr hold', '4 spillere?'],
    [/\([^)]*\b4\s*\)/iu, '(4)', 'ukendt'],
  ];
  for (const [pattern, variant, suggested] of pending) {
    const match = lower.match(pattern);
    if (match) return { format: null, variant, status: 'afventer', suggested, matched: match[0] };
  }
  return { format: null, variant: null, status: null, matched: null };
}

function norm(format) {
  if (!format) return null;
  return format.replace(/-struktur$/u, '');
}

const records = groupRows.map((row) => {
  const key = `${row.season_id}|${row.age_group_id}|${row.league_group_id}`;
  const values = categories.get(key) ?? new Set();
  const text = [row.division_name_raw, row.group_name_raw, row.page_title_raw].filter(Boolean).join(' | ');
  const parsed = parseText(text);
  const structural = structurFamily(values);
  const conflict = Boolean(parsed.format && structural.value && norm(parsed.format) !== norm(structural.value));
  return { ...row, physical_pool_key: key, category_signature: structural.signature,
    spillefamilie_tekst: parsed.format, tekstvariant: parsed.variant, tekstvariant_status: parsed.status,
    strukturfamilie: structural.value, konflikt: conflict, raw_text: text };
});

const mapping = new Map();
for (const row of records) {
  if (!YOUTH_AGE_IDS.has(row.age_group_id) || row.category_signature !== '1. D · 1. S · 2. D · 2. S · 3. S · 4. S') continue;
  if (!row.tekstvariant) continue;
  const key = `${row.tekstvariant_status}|${row.tekstvariant}`;
  const item = mapping.get(key) ?? { variant: row.tekstvariant, antal_puljer: 0, eksempler: [], foreslaaet_format: row.tekstvariant_status === 'anvendt' ? row.spillefamilie_tekst : (parseText(row.raw_text).suggested ?? 'ukendt'), status: row.tekstvariant_status };
  item.antal_puljer++;
  if (item.eksempler.length < 3) item.eksempler.push(row.raw_text);
  mapping.set(key, item);
}

const youthS4D2 = records.filter((r) => YOUTH_AGE_IDS.has(r.age_group_id) && r.strukturfamilie === '4 spillere-struktur');
const restBefore = youthS4D2.filter((r) => !/\b(?:4\s*spillere|4\s*piger|3\s*spillere|2\s*\+\s*2|4\s*\+\s*[23]|x[12])\b/iu.test(r.raw_text));
const restApplied = restBefore.filter((r) => r.tekstvariant_status === 'anvendt');
const restPending = restBefore.filter((r) => r.tekstvariant_status === 'afventer');
const restUnstated = restBefore.filter((r) => !r.tekstvariant_status);
const conflicts = records.filter((r) => r.konflikt);
const conflictCounts = {
  ungdom: conflicts.filter((r) => YOUTH_AGE_IDS.has(r.age_group_id)).length,
  senior_eller_andet: conflicts.filter((r) => !YOUTH_AGE_IDS.has(r.age_group_id)).length,
};
const appliedSamples = restApplied.slice(0, 20).map((r) => ({ season_id: r.season_id, age_group_id: r.age_group_id, league_group_id: r.league_group_id, tekstvariant: r.tekstvariant, strukturfamilie: r.strukturfamilie, raw_text: r.raw_text }));
const output = {
  generated_at: new Date().toISOString(),
  method: { physical_pool_key: '(season_id, age_group_id, league_group_id)', database: 'liga-landskab.db read-only', text_policy: 'only literal, unambiguous variants are applied; uncertain variants are mapping status afventer' },
  summary: { total_pools: records.length, youth_s4d2: youthS4D2.length, s4d2_rest_before_extended_text: restBefore.length, rest_new_text_format: restApplied.length, rest_pending_decision: restPending.length, rest_without_format_statement: restUnstated.length, conflicts_total: conflicts.length, conflicts: conflictCounts },
  records,
  applied_samples: appliedSamples,
};
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(`${OUT_DIR}/format-mapping.json`, `${JSON.stringify([...mapping.values()].sort((a, b) => b.antal_puljer - a.antal_puljer), null, 2)}\n`);
fs.writeFileSync(`${OUT_DIR}/katalog.json`, `${JSON.stringify(output, null, 2)}\n`);
const md = `# Opgave 123 — formattekst og strukturfamilie\n\n| Måling | Antal |\n|---|---:|\n| Fysiske puljer | ${records.length} |\n| Ungdoms-S4/D2-struktur | ${youthS4D2.length} |\n| Rest før udvidet tekstgenkendelse | ${restBefore.length} |\n| Rest med nyt, utvetydigt tekstformat | ${restApplied.length} |\n| Rest der afventer afgørelse | ${restPending.length} |\n| Rest uden formatudsagn | ${restUnstated.length} |\n| Konflikter, ungdom | ${conflictCounts.ungdom} |\n| Konflikter, senior/andet | ${conflictCounts.senior_eller_andet} |\n\n` +
`Tekstformat og strukturfamilie er separate felter. S4/D2 hedder kun **4 spillere-struktur**; den bliver aldrig gjort til 4 spillere eller 4 piger alene ud fra strukturen. Tvetydige varianter er kun lagt i mapping-filen med status \`afventer\`.\n\n` +
`## Stikprøve af nye anvendte varianter\n\n| Sæson | Alder | Pulje | Variant | Struktur |\n|---:|---:|---|---|---|\n${appliedSamples.map((r) => `| ${r.season_id} | ${r.age_group_id} | ${r.league_group_id} | ${r.tekstvariant} | ${r.strukturfamilie} |`).join('\n')}\n`;
fs.writeFileSync(`${OUT_DIR}/rapport.md`, `${md}\n`);
console.log(JSON.stringify(output.summary, null, 2));
