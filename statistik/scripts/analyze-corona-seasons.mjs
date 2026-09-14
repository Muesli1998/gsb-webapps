import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db', { readOnly: true });
const seasonRows = db.prepare(`
  SELECT season_id AS season, COUNT(*) AS teamMatches,
    SUM(status = 'corona_suspended') AS coronaSuspended
  FROM team_matches
  GROUP BY season_id ORDER BY season_id
`).all();
db.close();

const gaps = JSON.parse(fs.readFileSync('results/individual-coverage-gap-audit.json', 'utf8'));
const audit = JSON.parse(fs.readFileSync('results/team-vs-individual-result-audit.json', 'utf8'));
const noScore = (category) => category.winner == null && category.homeScore === '- - -' && category.awayScore === '- - -';
const classify = (row) => {
  const categories = row.categories ?? [];
  const golden = categories.some((category) => /^Golden Set/i.test(category.category ?? ''));
  const markers = categories.some((category) => category.resultMarker);
  if (row.remark_raw) return 'administrativ bemærkning eller protest';
  if (golden) return 'Golden Set';
  if (markers) return 'rå resultatmarkør';
  if (row.noWinnerCategories > 0) {
    const missing = categories.filter((category) => category.winner == null);
    if (categories.length > 0 && missing.length === categories.length && missing.every(noScore)) return 'complete_match_all_categories_without_score';
    if (missing.length > 0 && missing.length < categories.length && missing.every(noScore)) return 'partial_match_missing_category_result';
    return 'category_present_no_score';
  }
  return 'reel uoverensstemmelse';
};
const categoryOrder = ['administrativ bemærkning eller protest', 'Golden Set', 'rå resultatmarkør', 'reel uoverensstemmelse', 'category_present_no_score', 'complete_match_all_categories_without_score', 'partial_match_missing_category_result'];
const gapBySeason = new Map();
for (const row of gaps.rows) gapBySeason.set(row.season_id, (gapBySeason.get(row.season_id) ?? 0) + 1);
const discrepancyBySeason = new Map();
for (const row of audit.rows.filter((row) => row.discrepancy)) {
  const season = row.season_id;
  const values = discrepancyBySeason.get(season) ?? { total: 0, categories: Object.fromEntries(categoryOrder.map((category) => [category, 0])) };
  values.total += 1;
  values.categories[classify(row)] += 1;
  discrepancyBySeason.set(season, values);
}
const seasons = seasonRows.map((row) => ({
  ...row,
  gaps: gapBySeason.get(row.season) ?? 0,
  discrepancies: discrepancyBySeason.get(row.season)?.total ?? 0,
  discrepancyCategories: discrepancyBySeason.get(row.season)?.categories ?? Object.fromEntries(categoryOrder.map((category) => [category, 0]))
}));
const coronaSeasons = seasons.filter((row) => row.season === 2019 || row.season === 2020);
const nonCoronaSeasons = seasons.filter((row) => row.season !== 2019 && row.season !== 2020);
const sum = (items, field) => items.reduce((total, item) => total + item[field], 0);
const report = {
  generatedAt: new Date().toISOString(),
  definition: 'Sæson 2019 er 2019/20; sæson 2020 er 2020/21. Tallene måler kun allerede registrerede holdkampe.',
  expectedMatchCountLimitation: 'Der findes ingen lokal officiel kampplan eller stillingskilde, som kan tælle planlagte kampe der aldrig kom ind i team_matches. En skjult yderligere coronaaflysning kan derfor ikke kvantificeres.',
  categoryOrder,
  seasons,
  comparison: {
    coronaSeasons: { teamMatches: sum(coronaSeasons, 'teamMatches'), coronaSuspended: sum(coronaSeasons, 'coronaSuspended'), gaps: sum(coronaSeasons, 'gaps'), discrepancies: sum(coronaSeasons, 'discrepancies') },
    otherSeasons: { teamMatches: sum(nonCoronaSeasons, 'teamMatches'), coronaSuspended: sum(nonCoronaSeasons, 'coronaSuspended'), gaps: sum(nonCoronaSeasons, 'gaps'), discrepancies: sum(nonCoronaSeasons, 'discrepancies') }
  }
};
fs.writeFileSync('results/012-corona-saeson-taelling.json', JSON.stringify(report, null, 2));
let md = `# Corona-sæsontælling\n\n- Definition: ${report.definition}\n- Afgrænsning: ${report.expectedMatchCountLimitation}\n\n## Pr. sæson\n\n| Sæson | Registrerede holdkampe | Corona-suspenderede | Dækningshuller | Hold/individ-afvigelser |\n|---:|---:|---:|---:|---:|\n`;
for (const row of seasons) md += `| ${row.season} | ${row.teamMatches} | ${row.coronaSuspended} | ${row.gaps} | ${row.discrepancies} |\n`;
md += `\n## Corona-sæsonerne 2019/20 og 2020/21\n\n| Sæson | Afvigelser | ${categoryOrder.join(' | ')} |\n|---:|---:${'|---:'.repeat(categoryOrder.length)}|\n`;
for (const row of coronaSeasons) md += `| ${row.season} | ${row.discrepancies} | ${categoryOrder.map((category) => row.discrepancyCategories[category]).join(' | ')} |\n`;
md += `\n## Sammenligning\n\n| Periode | Holdkampe | Corona-suspenderede | Dækningshuller | Afvigelser |\n|---|---:|---:|---:|---:|\n`;
for (const [label, values] of Object.entries(report.comparison)) md += `| ${label} | ${values.teamMatches} | ${values.coronaSuspended} | ${values.gaps} | ${values.discrepancies} |\n`;
md += `\n## Konklusion\n\nDe 47 allerede markerede corona-suspenderede kampe ligger alle i sæson 2019 og 2020. Rapporten kan måle deres overlap med kendte huller og afvigelser, men kan ikke afgøre hvor mange planlagte kampe der aldrig blev registreret overhovedet. Det kræver en officiel historisk kampplan eller stillingskilde med forventede kampantal.\n`;
fs.writeFileSync('results/012-corona-saeson-taelling.md', md);
console.log(JSON.stringify(report, null, 2));
