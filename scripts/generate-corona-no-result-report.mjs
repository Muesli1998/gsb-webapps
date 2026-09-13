import fs from 'node:fs';

const audit = JSON.parse(fs.readFileSync('results/no-result-match-audit.json', 'utf8'));
const rows = audit.rows;

// This is an evidence window for the affected seasons, not a legal or
// historical reclassification of every fixture. It covers the observed
// no-result runs in 2019/20 and 2020/21.
function pandemicSeasonWindow(row) {
  return row.season_id === 2019
    ? row.round_date >= '2020-03-15' && row.round_date <= '2020-06-30'
    : row.season_id === 2020
      ? row.round_date >= '2020-11-01' && row.round_date <= '2021-06-30'
      : false;
}

const classify = (row) => {
  if (!row.payloadFound) return 'no_payload_available';
  if (row.interpretation === 'explicit_no_play') return 'explicit_no_play_text';
  if (row.categoryCount > 0 && row.scoreTokenCount === 0) return 'player_roster_without_scores';
  if (row.interpretation === 'page_has_individual_content') return 'individual_content_without_team_result';
  return 'no_individual_content_evidence';
};

const pandemicRows = rows.filter(pandemicSeasonWindow).map((row) => ({ ...row, classification: classify(row) }));
const allRows = rows.map((row) => ({ ...row, classification: classify(row) }));
const countBy = (items, key) => Object.fromEntries([...new Set(items.map((x) => x[key]))].map((k) => [k, items.filter((x) => x[key] === k).length]));
const byDate = Object.values(pandemicRows.reduce((acc, row) => {
  const key = row.round_date || 'NULL';
  acc[key] ??= { date: key, total: 0, ids: [], classifications: {} };
  acc[key].total++;
  acc[key].ids.push(String(row.external_match_id));
  acc[key].classifications[row.classification] = (acc[key].classifications[row.classification] ?? 0) + 1;
  return acc;
}, {})).sort((a, b) => a.date.localeCompare(b.date));

const report = {
  generatedAt: new Date().toISOString(),
  source: 'results/no-result-match-audit.json',
  definition: {
    noResultRows: "result_raw is NULL, empty, '-', '0-0' or '0 – 0'",
    pandemicSeasonWindow: ['season 2019: 2020-03-15..2020-06-30', 'season 2020: 2020-11-01..2021-06-30'],
    interpretation: 'Absence of individual detail is evidence about what the retrieved page contains, not proof of why the fixture has no result.'
  },
  allNoResult: { total: allRows.length, byClassification: countBy(allRows, 'classification') },
  affectedSeasonWindow: { total: pandemicRows.length, bySeason: countBy(pandemicRows, 'season_id'), byStatus: countBy(pandemicRows, 'status'), byClassification: countBy(pandemicRows, 'classification'), dates: byDate },
  rows: allRows
};
fs.writeFileSync('results/corona-no-result-audit.json', JSON.stringify(report, null, 2));

let md = `# Corona- og no-result-audit\n\nGenereret: ${report.generatedAt}\n\n`;
md += `Denne rapport undersøger rækker hvor resultatet er NULL, tomt, \`-\` eller \`0-0\`. Den bruger et separat analysevindue for de to berørte sæsoner: 2019/20 fra 15. marts til 30. juni 2020 og 2020/21 fra 1. november 2020 til 30. juni 2021. Vinduet er et evidensfilter og ændrer ikke automatisk status.\n\n`;
md += `## Fund\n\n`;
md += `- Alle no-result-rækker: **${allRows.length}**.\n`;
md += `- I det udvidede sæsonvindue: **${pandemicRows.length}** (${report.affectedSeasonWindow.bySeason['2019'] ?? 0} i sæson 2019 og ${report.affectedSeasonWindow.bySeason['2020'] ?? 0} i sæson 2020).\n`;
md += `- Sider med direkte teksten \`Afgjort uden kamp (afbud/udeblivelse)\` eller \`(Ikke fremmødt)\`: **${report.affectedSeasonWindow.byClassification.explicit_no_play_text ?? 0}** i vinduet.\n`;
md += `- Sider uden individuelle kategorier eller scores: **${report.affectedSeasonWindow.byClassification.no_individual_content_evidence ?? 0}** i vinduet.\n`;
md += `- Sider med spilleropstilling men ingen scores: **${report.affectedSeasonWindow.byClassification.player_roster_without_scores ?? 0}** i vinduet.\n`;
md += `- Rækker uden gemt browserpayload: **${report.affectedSeasonWindow.byClassification.no_payload_available ?? 0}** i vinduet.\n\n`;
md += `## Hvad det betyder\n\n`;
md += `De ${report.affectedSeasonWindow.byClassification.no_individual_content_evidence ?? 0} sider uden individuel evidens viser kun holdoplysninger og \`Resultat -\`/\`Point -\` i den hentede HTML. Det er stærk evidens for, at siden ikke indeholder registrerede spillede delkampe, men kilden angiver ikke i alle tilfælde årsagen. De skal derfor gemmes som \`no_result\`/\`unresolved\`, indtil en eksplicit bemærkning eller anden kilde dokumenterer afbud, suspension eller walkover.\n\n`;
md += `Kampen **452835** er det tydelige ikke-spillede eksempel: siden indeholder \`0-0\`, \`Point 0-0\` og teksten \`Afgjort uden kamp (afbud/udeblivelse)\`. Kampen **395200** har navngivne ungdomsspillere, men ingen scores og intet holdresultat; den er derfor ikke automatisk tællelig som spillet.\n\n`;
md += `## No-result pr. dato i det udvidede vindue\n\n| Dato | Antal | Klassifikationer | Kamp-ID'er |\n|---|---:|---|---|\n`;
for (const d of byDate) md += `| ${d.date} | ${d.total} | ${Object.entries(d.classifications).map(([k, v]) => `${k}: ${v}`).join(', ')} | ${d.ids.join(', ')} |\n`;
md += `\n## Begrænsning og næste validering\n\n`;
md += `Et \`-\`-resultat alene kan ikke skelne mellem aflyst, suspenderet, manglende indtastning og teknisk fejl. Næste validering er derfor at sammenholde disse IDs med puljens stilling/kalender og eventuelle bemærkninger. Ingen status i databasen er ændret af denne audit.\n`;
fs.writeFileSync('results/corona-no-result-audit.md', md);
console.log(JSON.stringify({ allNoResult: report.allNoResult, affectedSeasonWindow: report.affectedSeasonWindow }, null, 2));
