import fs from 'node:fs';

const audit = JSON.parse(fs.readFileSync('results/team-vs-individual-result-audit.json', 'utf8'));
const rows = audit.rows.filter((row) => row.discrepancy);
const noScore = (category) => category.winner == null
  && category.homeScore === '- - -'
  && category.awayScore === '- - -';

function classifyMissingCategories(categories) {
  const missing = categories.filter((category) => category.winner == null);
  const allWithoutScore = categories.length > 0 && missing.length === categories.length && missing.every(noScore);
  const partialWithoutScore = missing.length > 0 && missing.length < categories.length && missing.every(noScore);
  if (allWithoutScore) return ['complete_match_all_categories_without_score', { missingCategories: missing, reason: 'Alle kategorier mangler vinder, og alle rå scorefelter er - - -.' }];
  if (partialWithoutScore) return ['partial_match_missing_category_result', { missingCategories: missing, winningCategories: categories.filter((category) => category.winner != null), reason: 'Nogle kategorier mangler rå score/vinder, mens andre kategorier har en udledelig vinder.' }];
  return ['category_present_no_score', { missingCategories: missing, winningCategories: categories.filter((category) => category.winner != null), reason: 'Kategorien findes, men evidensen passer ikke entydigt i en komplet eller delvis - - -- kamp.' }];
}

function classify(row) {
  const categories = row.categories ?? [];
  const golden = categories.filter((x) => /^Golden Set/i.test(x.category ?? ''));
  const markers = categories.filter((x) => x.resultMarker);
  if (row.remark_raw) return ['administrativ bemærkning eller protest', { remark: row.remark_raw }];
  if (golden.length) return ['Golden Set', { golden }];
  if (markers.length) return ['rå resultatmarkør', { markers }];
  if (row.noWinnerCategories > 0) return classifyMissingCategories(categories);
  return ['reel uoverensstemmelse', { observed: row.observed, expected: row.expected }];
}

const classified = rows.map((row) => {
  const [category, evidence] = classify(row);
  return { matchId: row.external_match_id, season: row.season_id, category, evidence, resultRaw: row.result_raw, categories: row.categories };
});
const categoryOrder = ['administrativ bemærkning eller protest', 'Golden Set', 'rå resultatmarkør', 'reel uoverensstemmelse', 'category_present_no_score', 'complete_match_all_categories_without_score', 'partial_match_missing_category_result'];
const counts = Object.fromEntries(categoryOrder.map((key) => [key, classified.filter((x) => x.category === key).length]));
const sum = Object.values(counts).reduce((total, value) => total + value, 0);
const report = { generatedAt: new Date().toISOString(), total: classified.length, counts, rows: classified };
fs.writeFileSync('results/006-afvigelse-klassifikation.json', JSON.stringify(report, null, 2));
let md = `# Klassifikation af hold-/individafvigelser\n\n- Afvigelser: **${report.total}**\n- Sum af de syv kategorier: **${sum}**\n\n| Kategori | Antal |\n|---|---:|\n`;
for (const [key, value] of Object.entries(counts)) md += `| ${key} | ${value} |\n`;
md += `\nDe fire eksisterende kategorier bevares. De tidligere 222 \`manglende kategori\`-rækker er delt efter rå score- og vinderfelter. Hver række med rå evidens findes i JSON-rapporten. Klassifikationen forklarer ikke markørers semantik.\n`;
fs.writeFileSync('results/006-afvigelse-klassifikation.md', md);
console.log(JSON.stringify({ total: classified.length, sum, counts }, null, 2));
