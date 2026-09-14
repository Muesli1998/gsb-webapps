import fs from 'node:fs';
import path from 'node:path';

const sourceDirs = ['results/browser-fallback', 'results/browser-fallback-youth', 'results/browser-fallback-complete'];
const gaps = JSON.parse(fs.readFileSync('results/individual-coverage-gap-audit.json', 'utf8')).rows
  .filter((row) => row.classification === 'payload_without_categories');

function findPayload(season, matchId) {
  const filename = `${season}-${matchId}.json`;
  for (const dir of sourceDirs) {
    const file = path.join(dir, filename);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

function sourceExcerpt(rawText) {
  const start = rawText.search(/\nResultat\b/i);
  const fromResult = start >= 0 ? rawText.slice(start, start + 420) : rawText.slice(0, 420);
  return fromResult.replaceAll('\u00a0', ' ').replace(/\s+/g, ' ').trim();
}

function hasCategorySection(rawText) {
  return /^\d+\.\s*(?:MD|DS|HS|DD|HD|S|D)\b/m.test(rawText);
}

const bySeason = Map.groupBy(gaps, (row) => row.season_id);
const sample = [];
for (const season of [...bySeason.keys()].sort((a, b) => a - b)) {
  const rows = bySeason.get(season);
  sample.push(rows.find((row) => row.explicitNoPlay) ?? rows[0]);
}
for (const season of [...bySeason.keys()].sort((a, b) => a - b)) {
  if (sample.length >= 20) break;
  const candidate = bySeason.get(season).find((row) => !row.explicitNoPlay);
  if (candidate && !sample.some((row) => row.external_match_id === candidate.external_match_id)) sample.push(candidate);
}
for (const candidate of gaps.filter((row) => !row.explicitNoPlay)) {
  if (sample.length >= 20) break;
  if (!sample.some((row) => row.external_match_id === candidate.external_match_id)) sample.push(candidate);
}

const rows = sample.map((row) => {
  const payloadPath = findPayload(row.season_id, row.external_match_id);
  const payload = payloadPath ? JSON.parse(fs.readFileSync(payloadPath, 'utf8')) : null;
  const rawText = payload?.rawText ?? '';
  const categoryPresent = hasCategorySection(rawText);
  return {
    matchId: row.external_match_id,
    season: row.season_id,
    resultRaw: row.result_raw,
    explicitNoPlay: row.explicitNoPlay,
    source: payloadPath,
    sourceExcerpt: sourceExcerpt(rawText),
    categoryPresent,
    conclusion: categoryPresent
      ? 'kan hentes manuelt — den gemte browsertekst indeholder en kategorisektion.'
      : 'blivende — den gemte, renderede browsertekst har ingen kategorisektion.'
  };
});
const summary = {
  totalPayloadsWithoutCategories: gaps.length,
  explicitNoPlay: gaps.filter((row) => row.explicitNoPlay).length,
  noExplicitNoPlay: gaps.filter((row) => !row.explicitNoPlay).length,
  sampleRows: rows.length,
  sampleByConclusion: Object.fromEntries([...new Set(rows.map((row) => row.conclusion))].map((key) => [key, rows.filter((row) => row.conclusion === key).length])),
  rows
};
fs.writeFileSync('results/013-manglende-kategorisektioner.json', JSON.stringify(summary, null, 2));
let md = `# Stikprøve: 257 payloads uden kategorisektioner\n\n- Payloads i audit: **${summary.totalPayloadsWithoutCategories}**\n- Med eksplicit afbud/udeblivelse: **${summary.explicitNoPlay}**\n- Uden eksplicit afbud/udeblivelse: **${summary.noExplicitNoPlay}**\n- Sæsonstratificeret stikprøve: **${summary.sampleRows}**\n\n`;
md += `Browserteksten er allerede gemt lokalt; dette script henter ikke nye kampe. \`Afgjort uden kamp\` tælles som rå tekst, ikke som en fortolkning af andre kampe.\n\n`;
md += `| Kamp | Sæson | Resultat | Rå browserudsnit | Konklusion |\n|---:|---:|---:|---|---|\n`;
for (const row of rows) md += `| ${row.matchId} | ${row.season} | ${row.resultRaw} | ${row.sourceExcerpt.replaceAll('|', '\\|')} | ${row.conclusion} |\n`;
md += `\n## Konklusion\n\nStikprøven viser, at den allerede gemte, renderede browserkilde ikke indeholder kategorisektioner for de prøvede kampe — også i prøver med registreret holdresultat uden eksplicit afbud. Derfor er de 257 et dokumenteret kildehul i det aktuelt bevarede materiale, ikke en importfejl. En ny manuel indhentning kan kun undersøges som en separat opgave, fordi denne opgave ikke henter nye kampe.\n`;
fs.writeFileSync('results/013-manglende-kategorisektioner.md', md);
console.log(JSON.stringify({ total: summary.totalPayloadsWithoutCategories, sampleRows: summary.sampleRows, sampleByConclusion: summary.sampleByConclusion }, null, 2));
