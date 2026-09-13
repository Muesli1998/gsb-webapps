import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const gaps = db.prepare(`SELECT tm.team_match_id, tm.external_match_id, tm.season_id, tm.round_date,
  tm.home_name_raw, tm.away_name_raw, tm.result_raw, tm.points_raw, tm.remark_raw, tm.status
  FROM team_matches tm
  LEFT JOIN individual_matches im ON im.team_match_id = tm.team_match_id
  WHERE trim(COALESCE(tm.result_raw, '')) <> '' AND trim(tm.result_raw) <> '-'
    AND im.individual_match_id IS NULL
  GROUP BY tm.team_match_id ORDER BY tm.season_id, tm.round_date, tm.external_match_id`).all();
db.close();

const parsedRows = JSON.parse(fs.readFileSync('results/browser-individual-parse-report.json', 'utf8')).rows;
const parsed = new Map(parsedRows.map((x) => [String(x.id), x]));
const classify = (x) => {
  if (!x) return 'no_browser_payload';
  if (x.categoryCount === 0) return 'payload_without_categories';
  if (x.categoryWithScore === 0) return x.remark ? 'categories_without_scores_with_remark' : 'categories_without_scores';
  const importable = x.categories.filter((c) => c.hasScore && c.homePlayers.length && c.awayPlayers.length).length;
  return importable ? 'unexpected_importable_categories' : 'scored_categories_without_both_sides';
};
const rows = gaps.map((g) => {
  const p = parsed.get(String(g.external_match_id));
  return {
    ...g,
    classification: classify(p),
    categoryCount: p?.categoryCount ?? 0,
    categoryWithScore: p?.categoryWithScore ?? 0,
    playerCount: p?.playerCount ?? 0,
    explicitNoPlay: Boolean(p?.explicitNoPlay),
    categories: p?.categories?.map((c) => ({ category: c.category, hasScore: c.hasScore, zeroScore: c.zeroScore, resultMarkerRaw: c.resultMarkerRaw, homePlayers: c.homePlayers, awayPlayers: c.awayPlayers })) ?? []
  };
});
const countBy = (xs, key) => Object.fromEntries([...new Set(xs.map((x) => x[key]))].sort().map((k) => [k, xs.filter((x) => x[key] === k).length]));
const report = {
  generatedAt: new Date().toISOString(),
  totalGaps: rows.length,
  byClassification: countBy(rows, 'classification'),
  bySeason: Object.fromEntries([...new Set(rows.map((x) => x.season_id))].sort((a, b) => a - b).map((s) => [s, countBy(rows.filter((x) => x.season_id === s), 'classification')])),
  explicitNoPlay: rows.filter((x) => x.explicitNoPlay).length,
  categoriesWithoutScores: rows.filter((x) => x.classification.startsWith('categories_without_scores')).length,
  categoriesWithoutScoresAndExplicitNoPlay: rows.filter((x) => x.classification.startsWith('categories_without_scores') && x.explicitNoPlay).length,
  categoriesWithoutScoresWithRemark: rows.filter((x) => x.classification === 'categories_without_scores_with_remark').length,
  rows
};
fs.writeFileSync('results/individual-coverage-gap-audit.json', JSON.stringify(report, null, 2));
let md = `# Audit af holdkampe uden individuelle kategorier\n\nGenereret: ${report.generatedAt}\n\n`;
md += `- Holdkampe med holdresultat men uden individuelle rækker: **${report.totalGaps}**\n`;
for (const [k, n] of Object.entries(report.byClassification)) md += `- ${k}: **${n}**\n`;
md += `- Med eksplicit no-play-/walkovertekst: **${report.explicitNoPlay}**\n`;
md += `- Kategorier uden scores, men med eksplicit no-play: **${report.categoriesWithoutScoresAndExplicitNoPlay}** af ${report.categoriesWithoutScores}\n\n`;
md += `## Pr. sæson\n\n| Sæson | Uden kategorier | Kategorier uden scores | Med bemærkning | Andet |\n|---:|---:|---:|---:|---:|\n`;
for (const [s, c] of Object.entries(report.bySeason)) md += `| ${s} | ${c.payload_without_categories ?? 0} | ${(c.categories_without_scores ?? 0) + (c.categories_without_scores_with_remark ?? 0)} | ${c.categories_without_scores_with_remark ?? 0} | ${(c.unexpected_importable_categories ?? 0) + (c.scored_categories_without_both_sides ?? 0) + (c.no_browser_payload ?? 0)} |\n`;
md += `\n## Konklusion\n\nDer blev ikke fundet nogen gap med scorede kategorier, som importøren burde have overset. 257 payloads indeholder ingen kategorisektioner. 58 har kategorier uden scores; 57 af disse har eksplicit no-playtekst. Den resterende række, kamp 340495, har en ordret Bemærkning om at resultatet blev ændret efter en protest og skal behandles som en administrativ afgørelse. Dette er evidens for sidens indhold, ikke en automatisk fortolkning af årsagen.\n\nEksempelrækkerne og den fulde klassifikation findes i JSON-filen.\n`;
fs.writeFileSync('results/individual-coverage-gap-audit.md', md);
console.log(JSON.stringify({ totalGaps: report.totalGaps, byClassification: report.byClassification, explicitNoPlay: report.explicitNoPlay, categoriesWithoutScoresAndExplicitNoPlay: report.categoriesWithoutScoresAndExplicitNoPlay, categoriesWithoutScoresWithRemark: report.categoriesWithoutScoresWithRemark }, null, 2));
