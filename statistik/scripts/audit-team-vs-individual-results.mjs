import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const matches = db.prepare(`SELECT tm.team_match_id, tm.external_match_id, tm.season_id, tm.result_raw,
  tm.home_name_raw, tm.away_name_raw, tm.remark_raw, COUNT(im.individual_match_id) AS individual_rows
  FROM team_matches tm JOIN individual_matches im ON im.team_match_id = tm.team_match_id
  WHERE trim(COALESCE(tm.result_raw,'')) GLOB '[0-9]*-[0-9]*'
  GROUP BY tm.team_match_id`).all();
const rows = db.prepare(`SELECT team_match_id, category_raw, winner_side, home_score_raw, away_score_raw, status, result_marker_raw
  FROM individual_matches`).all();
db.close();
const byMatch = new Map(); for (const r of rows) { const a = byMatch.get(r.team_match_id) ?? []; a.push(r); byMatch.set(r.team_match_id, a); }
const parseResult = (x) => { const m = String(x ?? '').match(/^(\d+)\s*-\s*(\d+)$/); return m ? { home: Number(m[1]), away: Number(m[2]) } : null; };
const parsed = [];
for (const m of matches) {
  const expected = parseResult(m.result_raw); const all = byMatch.get(m.team_match_id) ?? [];
  const regular = all.filter((r) => !/^Golden Set/i.test(r.category_raw ?? '') && r.status !== 'browser_zero_score' && r.winner_side);
  const golden = all.filter((r) => /^Golden Set/i.test(r.category_raw ?? '') && r.status !== 'browser_zero_score' && r.winner_side);
  const regularObserved = { home: regular.filter((r) => r.winner_side === 'home').length, away: regular.filter((r) => r.winner_side === 'away').length };
  const goldenObserved = { home: golden.filter((r) => r.winner_side === 'home').length, away: golden.filter((r) => r.winner_side === 'away').length };
  const includeGoldenSet = golden.length > 0 && regular.length + golden.length === expected.home + expected.away;
  const observed = includeGoldenSet ? { home: regularObserved.home + goldenObserved.home, away: regularObserved.away + goldenObserved.away } : regularObserved;
  const noWinner = all.filter((r) => !/^Golden Set/i.test(r.category_raw ?? '') && r.status !== 'browser_zero_score' && !r.winner_side).length;
  const discrepancy = observed.home !== expected.home || observed.away !== expected.away;
  parsed.push({ ...m, expected, observed, regularObserved, goldenObserved, includeGoldenSet, countedCategories: regular.length + (includeGoldenSet ? golden.length : 0), noWinnerCategories: noWinner, discrepancy, categories: all.map((r) => ({ category: r.category_raw, winner: r.winner_side, status: r.status, resultMarker: r.result_marker_raw, homeScore: r.home_score_raw, awayScore: r.away_score_raw })) });
}
const report = {
  generatedAt: new Date().toISOString(), matchesCompared: parsed.length,
  exactMatches: parsed.filter((x) => !x.discrepancy).length,
  discrepancies: parsed.filter((x) => x.discrepancy).length,
  withUnresolvedCategories: parsed.filter((x) => x.noWinnerCategories > 0).length,
  goldenSetsIncluded: parsed.filter((x) => x.includeGoldenSet).length,
  discrepanciesWithRemarks: parsed.filter((x) => x.discrepancy && x.remark_raw).length,
  resolvedDiscrepanciesWithRemarks: parsed.filter((x) => x.discrepancy && x.noWinnerCategories === 0 && x.remark_raw).length,
  discrepancyBySeason: Object.fromEntries([...new Set(parsed.map((x) => x.season_id))].sort((a, b) => a - b).map((s) => [s, parsed.filter((x) => x.season_id === s && x.discrepancy).length])),
  rows: parsed
};
fs.writeFileSync('results/team-vs-individual-result-audit.json', JSON.stringify(report, null, 2));
let md = `# Holdresultat mod individuelle resultater\n\nGenereret: ${report.generatedAt}\n\n- Holdkampe sammenlignet: **${report.matchesCompared}**\n- Eksakt samsvar på vinderantal: **${report.exactMatches}**\n- Afvigelser: **${report.discrepancies}**\n- Kampe med mindst én uafklaret kategori: **${report.withUnresolvedCategories}**\n- Golden Set inkluderet, når det passer med holdresultatets kampantal: **${report.goldenSetsIncluded}**\n\nEt Golden Set inkluderes kun, når det udfylder holdresultatets samlede antal kampe. Eksplicit markerede 0-0-kategorier tælles ikke som spillede sæt. En afvigelse er et signal til gennemgang, ikke automatisk bevis på parserfejl.\n\n## Afvigelser pr. sæson\n\n| Sæson | Afvigelser |\n|---:|---:|\n`;
md += `Afvigelser med ordret Bemærkning: **${report.discrepanciesWithRemarks}**, heraf **${report.resolvedDiscrepanciesWithRemarks}** uden uafklarede kategorier.\n\n`;
for (const [s, n] of Object.entries(report.discrepancyBySeason)) md += `| ${s} | ${n} |\n`;
md += `\n## Eksempler\n\n| Kamp | Sæson | Holdresultat | Observeret | Uafklarede kategorier |\n|---|---:|---|---|---:|\n`;
for (const x of parsed.filter((r) => r.discrepancy).slice(0, 50)) md += `| ${x.external_match_id} | ${x.season_id} | ${x.result_raw} | ${x.observed.home}-${x.observed.away} (${x.countedCategories} kategorier) | ${x.noWinnerCategories} |\n`;
fs.writeFileSync('results/team-vs-individual-result-audit.md', md);
console.log(JSON.stringify({ matchesCompared: report.matchesCompared, exactMatches: report.exactMatches, discrepancies: report.discrepancies, withUnresolvedCategories: report.withUnresolvedCategories, goldenSetsIncluded: report.goldenSetsIncluded, discrepanciesWithRemarks: report.discrepanciesWithRemarks, resolvedDiscrepanciesWithRemarks: report.resolvedDiscrepanciesWithRemarks }, null, 2));
