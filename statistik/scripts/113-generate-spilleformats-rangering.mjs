import fs from 'node:fs';

const input = JSON.parse(fs.readFileSync('statistik/results/112-spilleformats-katalog-alle-aargange.json', 'utf8'));
const sourceRows = input.combinations;
const sourceCitations = [{
  source: 'Badminton Danmark, Reglement-DMU HOLD tillæg 2025-05-30',
  url: 'https://badminton.dk/wp-content/uploads/2025/08/Reglement-DMU-HOLD-tillaeg-2025-05-30.pdf',
  accessed: '2026-09-27',
  evidence: 'Formålet nævner U11/U13/U15/U17 og holdtyperne 4+3, 4+2, 2+2, 4 spillere/4 piger; dokumenterer formatfamilier, ikke en samlet numerisk styrkeorden.',
}, {
  source: 'Badminton Danmark, Praktisk info DMU Hold U15 2023',
  url: 'https://badminton.dk/wp-content/uploads/2023/04/Praktisk-info-2023-U15.pdf',
  accessed: '2026-09-27',
  evidence: 'Viser kampsekvenser for 4 spillere, 4+2 og 4+3; bruges som format-/visningsbelæg, ikke som sportslig rangering.',
}];

const formatKey = row => row.spillefamilie || (row.category_signature === 'ingen gemte kategorier' ? 'Ukendt format' : `kategorisignatur:${row.category_signature}`);
const score = format => {
  const f = format.toLowerCase();
  const plus = f.match(/(\d+)\s*\+\s*(\d+)/);
  if (plus) return Number(plus[1]) * 10 + Number(plus[2]);
  if (f.includes('4 piger')) return 34;
  if (f.includes('4 spillere')) return 30;
  if (f.includes('3 spillere')) return 23;
  if (f.includes('x1')) return 22;
  if (f.includes('x2')) return 21;
  if (f.includes('kategorisignatur')) return 1;
  return 0;
};
const byFormat = new Map();
for (const row of sourceRows) {
  const format = formatKey(row);
  const key = `${row.age_group_id}|${format}`;
  const entry = byFormat.get(key) ?? { age_group_id: row.age_group_id, age_group_name: row.age_group_name, format, occurrences: 0, seasons: new Set(), regions: new Set(), levels: new Set() };
  entry.occurrences += row.occurrences;
  entry.seasons.add(row.season_id); entry.regions.add(row.region_id); if (row.level) entry.levels.add(row.level);
  byFormat.set(key, entry);
}
const rows = [...byFormat.values()].map(row => ({ ...row, seasons: [...row.seasons].sort(), regions: [...row.regions].sort(), levels: [...row.levels].sort(), rank_basis: 'Christoffers klubkendskab, ikke reglements-bekræftet', heuristic_score: score(row.format) }));
for (const age of new Set(rows.map(row => row.age_group_id))) {
  const group = rows.filter(row => row.age_group_id === age).sort((a, b) => b.heuristic_score - a.heuristic_score || a.format.localeCompare(b.format, 'da'));
  group.forEach((row, index) => { row.rank = index + 1; });
}
rows.sort((a, b) => a.age_group_id - b.age_group_id || a.rank - b.rank);
const output = { generated_at: new Date().toISOString(), limitation: 'Rangeringen måler krav til opstillingsformat. Den må ikke bruges som sportslig sammenligning mellem spilleform-familier.', source_citations: sourceCitations, heuristic: 'Flere spillerposter og flere pige/dameposter giver højere placering; ties er alfabetiske. Dette er Christoffers klubkendskab, ikke reglements-bekræftet.', rows };
fs.writeFileSync('statistik/results/113-spilleformats-rangering.json', `${JSON.stringify(output, null, 2)}\n`);
const md = ['# Opgave 113 — rangering af holdopstillingsformater', '', 'Rangeringen beskriver hvor krævende et format generelt er at stille, ikke sportslig styrke.', '', '## Fast begrænsning', '', '**Må ikke bruges til sportslig sammenligning på tværs af spilleform-familier.** Familie er et regelsæt; denne tabel er et separat opstillingskrav-lag.', '', '## Kilder', '', ...sourceCitations.map(c => `- [${c.source}](${c.url}), tilgået ${c.accessed}: ${c.evidence}`), '', '## Numerisk rangering', '', 'Alle placeringer nedenfor er **Christoffers klubkendskab, ikke reglements-bekræftet**, fordi de officielle kilder dokumenterer formatfamilier og kampsekvenser, men ikke en samlet styrkeorden. Plads 1 er højest inden for den enkelte aldersgruppe; nye formater kan indsættes senere.', '', '| Aldersgruppe | Plads | Format | Forekomster | Sæsoner | Regioner | Niveauer |', '|---|---:|---|---:|---:|---:|---|', ...rows.map(r => `| ${r.age_group_name} | ${r.rank} | ${r.format} | ${r.occurrences} | ${r.seasons.length} | ${r.regions.length} | ${r.levels.join(', ') || 'ukendt'} |`), '', `Katalogkilde: 112 (${sourceRows.length} kombinationer).`].join('\n');
fs.writeFileSync('statistik/results/113-spilleformats-rangering.md', `${md}\n`);
console.log(JSON.stringify({ input_combinations: sourceRows.length, output_rows: rows.length, age_groups: new Set(rows.map(r => r.age_group_id)).size, source_citations: sourceCitations.length }, null, 2));
