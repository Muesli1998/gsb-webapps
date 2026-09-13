import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const apply = process.env.APPLY === '1';
const detailFile = 'results/gsb-match-details-all-dedup.jsonl';
const details = new Map();
for (const line of fs.readFileSync(detailFile, 'utf8').split(/\r?\n/).filter(Boolean)) {
  const row = JSON.parse(line);
  if (row.status === 'ok' && row.home?.squad?.categories) details.set(String(row.matchId), row);
}

function scorePair(category) {
  const home = [], away = [];
  for (const r of category?.results ?? []) {
    if (Number.isInteger(r.homePoints) && Number.isInteger(r.guestPoints)) {
      home.push(String(r.homePoints)); away.push(String(r.guestPoints));
    }
  }
  if (!home.length) return { home: null, away: null, winner: null, scoredSets: 0 };
  let hw = 0, aw = 0;
  for (let i = 0; i < home.length; i++) { if (Number(home[i]) > Number(away[i])) hw++; else if (Number(away[i]) > Number(home[i])) aw++; }
  return { home: home.join('-'), away: away.join('-'), winner: hw === aw ? null : hw > aw ? 'home' : 'away', scoredSets: home.length };
}

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const rows = db.prepare(`SELECT im.individual_match_id, tm.external_match_id, im.category_raw, im.home_score_raw, im.away_score_raw
  FROM individual_matches im JOIN team_matches tm ON tm.team_match_id=im.team_match_id ORDER BY tm.external_match_id, im.individual_match_id`).all();
const update = db.prepare(`UPDATE individual_matches SET home_score_raw=?, away_score_raw=?, winner_side=?, status='api_repaired' WHERE individual_match_id=?`);
const changes = [], unmatched = [], duplicateKeys = [];
let skippedNoScore = 0;
const seen = new Set();
for (const row of rows) {
  const detail = details.get(String(row.external_match_id));
  if (!detail) continue;
  const key = `${row.external_match_id}|${row.category_raw}`;
  if (seen.has(key)) duplicateKeys.push(key); else seen.add(key);
  const category = (detail.home?.squad?.categories ?? []).find((c) => c.name === row.category_raw)
    ?? (detail.guest?.squad?.categories ?? []).find((c) => c.name === row.category_raw);
  if (!category) { unmatched.push({ id: row.external_match_id, category: row.category_raw }); continue; }
  const next = scorePair(category);
  if (next.home === null) { skippedNoScore++; continue; }
  if (row.home_score_raw !== next.home || row.away_score_raw !== next.away || row.winner_side !== next.winner) {
    changes.push({ id: row.individual_match_id, external_match_id: row.external_match_id, category: row.category_raw, before: { home: row.home_score_raw, away: row.away_score_raw, winner: row.winner_side }, after: next });
    if (apply) update.run(next.home, next.away, next.winner, row.individual_match_id);
  }
}
if (apply) db.exec('');
db.close();
const report = { generatedAt: new Date().toISOString(), apply, apiOkMatches: details.size, dbIndividualRows: rows.length, changes: changes.length, skippedNoScore, unmatched: unmatched.length, duplicateKeys: [...new Set(duplicateKeys)], sampleChanges: changes.slice(0, 20), unmatchedRows: unmatched.slice(0, 50) };
fs.writeFileSync('results/api-individual-score-repair.json', JSON.stringify(report, null, 2));
let md = `# API-individuel-score-reparation\n\nGenereret: ${report.generatedAt}\n\n- Kørselstype: **${apply ? 'APPLY' : 'DRY-RUN'}**\n- API-kampe med OK-detail: **${report.apiOkMatches}**\n- Individuelle SQLite-rækker gennemgået: **${report.dbIndividualRows}**\n- Rækker der kan rettes: **${report.changes}**\n- Kategorier uden match i payload: **${report.unmatched}**\n- Dubbeltolkede kamp/kategori-nøgler: **${report.duplicateKeys.length}**\n\n`;
md += 'Reparationen bruger kun gemte API-resultater. Hjemme- og ude-scores bygges fra hvert sæts homePoints/guestPoints, og vinderfeltet beregnes som side med flest vundne sæt. Kategorier uden scores ændres ikke.\n';
if (changes.length) md += `\nFørste ${Math.min(changes.length, 20)} ændringer:\n\n| Kamp | Kategori | Før hjemme | Før ude | Efter hjemme | Efter ude | Vinder |\n|---|---|---|---|---|---|---|\n` + changes.slice(0, 20).map((x) => `| ${x.external_match_id} | ${x.category} | ${x.before.home} | ${x.before.away} | ${x.after.home} | ${x.after.away} | ${x.after.winner ?? ''} |`).join('\n') + '\n';
fs.writeFileSync('results/api-individual-score-repair.md', md);
console.log(JSON.stringify(report, null, 2));
