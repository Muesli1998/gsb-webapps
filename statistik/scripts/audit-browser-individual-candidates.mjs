import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const parsed = JSON.parse(fs.readFileSync('results/browser-individual-parse-report.json', 'utf8')).rows;
const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const matchByExternal = new Map(db.prepare('SELECT team_match_id, external_match_id FROM team_matches').all().map((x) => [String(x.external_match_id), x.team_match_id]));
const rows = db.prepare('SELECT individual_match_id, team_match_id, category_raw, home_score_raw, away_score_raw FROM individual_matches').all();
const byKey = new Map(rows.map((x) => [`${x.team_match_id}|${x.category_raw}`, x]));
const playerRows = db.prepare(`SELECT imp.individual_match_id, imp.side, p.name_raw FROM individual_match_players imp JOIN players p ON p.player_id=imp.player_id`).all();
const playersById = new Map(); for (const x of playerRows) { const k = String(x.individual_match_id); playersById.set(k, playersById.get(k) ?? { home: [], away: [] }); playersById.get(k)[x.side]?.push(x.name_raw); }
db.close();

const candidates = [], conflicts = [], missingMatches = [];
const normPlayers = (xs) => xs.map((x) => x.trim().toLocaleLowerCase('da-DK')).sort();
for (const match of parsed) {
  const teamMatchId = matchByExternal.get(String(match.id));
  if (!teamMatchId) { missingMatches.push(match.id); continue; }
  for (const c of match.categories ?? []) {
    if (!c.hasScore || !c.homePlayers.length || !c.awayPlayers.length) continue;
    const key = `${teamMatchId}|${c.category}`; const existing = byKey.get(key);
    const browserHome = c.sets.map((x) => String(x.home)).join('-'); const browserAway = c.sets.map((x) => String(x.away)).join('-');
    if (!existing) { candidates.push({ external_match_id: match.id, team_match_id: teamMatchId, category: c.category, homePlayers: c.homePlayers, awayPlayers: c.awayPlayers, homeScore: browserHome, awayScore: browserAway }); continue; }
    const sameScore = existing.home_score_raw === browserHome && existing.away_score_raw === browserAway;
    const dbPlayers = playersById.get(String(existing.individual_match_id)) ?? { home: [], away: [] };
    const samePlayers = JSON.stringify(normPlayers(c.homePlayers)) === JSON.stringify(normPlayers(dbPlayers.home)) && JSON.stringify(normPlayers(c.awayPlayers)) === JSON.stringify(normPlayers(dbPlayers.away));
    if (!sameScore || !samePlayers) conflicts.push({ external_match_id: match.id, category: c.category, sameScore, samePlayers, browser: { homeScore: browserHome, awayScore: browserAway, homePlayers: c.homePlayers, awayPlayers: c.awayPlayers }, database: { homeScore: existing.home_score_raw, awayScore: existing.away_score_raw, homePlayers: dbPlayers.home, awayPlayers: dbPlayers.away } });
  }
}
const report = { generatedAt: new Date().toISOString(), parsedPayloads: parsed.length, existingIndividualRows: rows.length, candidateCategories: candidates.length, conflicts: conflicts.length, missingMatches: [...new Set(missingMatches)], candidates: candidates.slice(0, 200), conflictRows: conflicts.slice(0, 200) };
fs.writeFileSync('results/browser-individual-import-audit.json', JSON.stringify(report, null, 2));
let md = `# Audit af browserbaserede individuelle importkandidater\n\nGenereret: ${report.generatedAt}\n\n- Parserede browserpayloads: **${report.parsedPayloads}**\n- Eksisterende individuelle SQLite-rækker: **${report.existingIndividualRows}**\n- Nye scorede kategorier med spillere: **${report.candidateCategories}**\n- Konflikter mod eksisterende API-data: **${report.conflicts}**\n- Payloads uden match i SQLite: **${report.missingMatches.length}**\n\n`;
md += `Kandidaterne er kun kategorier med mindst én score og spillere på begge sider. No-result-sider og rækker uden scores holdes ude. Konflikter importeres ikke automatisk; de skal gennemgås med begge kilder bevaret.\n`;
if (candidates.length) md += `\n## Eksempler på kandidater\n\n| Kamp | Kategori | Hjemmescore | Udescore | Hjemmespillere | Udespillere |\n|---|---|---|---|---|---|\n` + candidates.slice(0, 20).map((x) => `| ${x.external_match_id} | ${x.category} | ${x.homeScore} | ${x.awayScore} | ${x.homePlayers.join(', ')} | ${x.awayPlayers.join(', ')} |`).join('\n') + '\n';
fs.writeFileSync('results/browser-individual-import-audit.md', md);
console.log(JSON.stringify({ parsedPayloads: report.parsedPayloads, existingIndividualRows: report.existingIndividualRows, candidateCategories: report.candidateCategories, conflicts: report.conflicts, missingMatches: report.missingMatches.length }, null, 2));
