import fs from 'node:fs';

const audit = JSON.parse(fs.readFileSync('results/team-vs-individual-result-audit.json', 'utf8'));
const rows = audit.rows.filter((row) => row.discrepancy);
const classify = (row) => {
  const categories = row.categories ?? [];
  const golden = categories.filter((x) => /^Golden Set/i.test(x.category ?? ''));
  const markers = categories.filter((x) => x.resultMarker);
  if (row.remark_raw) return ['administrativ bemærkning eller protest', { remark: row.remark_raw }];
  if (golden.length) return ['Golden Set', { golden }];
  if (markers.length) return ['rå resultatmarkør', { markers }];
  if (row.noWinnerCategories > 0) return ['manglende kategori', { noWinnerCategories: row.noWinnerCategories }];
  return ['reel uoverensstemmelse', { observed: row.observed, expected: row.expected }];
};
const classified = rows.map((row) => { const [category, evidence] = classify(row); return { matchId: row.external_match_id, season: row.season_id, category, evidence, resultRaw: row.result_raw, categories: row.categories }; });
const counts = Object.fromEntries(['administrativ bemærkning eller protest', 'Golden Set', 'manglende kategori', 'rå resultatmarkør', 'reel uoverensstemmelse'].map((key) => [key, classified.filter((x) => x.category === key).length]));
const report = { generatedAt: new Date().toISOString(), total: classified.length, counts, rows: classified };
fs.writeFileSync('results/006-afvigelse-klassifikation.json', JSON.stringify(report, null, 2));
let md = `# Klassifikation af hold-/individafvigelser\n\n- Afvigelser: **${report.total}**\n\n| Kategori | Antal |\n|---|---:|\n`;
for (const [key, value] of Object.entries(counts)) md += `| ${key} | ${value} |\n`;
md += `\nHver række med rå evidens findes i JSON-rapporten. Klassifikationen forklarer ikke markørers semantik.\n`;
fs.writeFileSync('results/006-afvigelse-klassifikation.md', md);
console.log(JSON.stringify({ total: report.total, counts }, null, 2));
