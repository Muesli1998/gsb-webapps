import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const apply = process.env.APPLY === '1';
const parsed = JSON.parse(fs.readFileSync('results/browser-individual-parse-report.json', 'utf8')).rows;
const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const matchByExternal = new Map(db.prepare('SELECT team_match_id, external_match_id FROM team_matches').all().map((x) => [String(x.external_match_id), x.team_match_id]));
const existing = db.prepare('SELECT individual_match_id, team_match_id, category_raw, home_score_raw, away_score_raw FROM individual_matches').all();
const existingKeys = new Set(existing.map((x) => `${x.team_match_id}|${x.category_raw}`));
const playerRows = db.prepare('SELECT player_id, name_raw, name_normalized FROM players').all();
const normalizeName = (x) => String(x ?? '').replace(/\s+/g, ' ').trim().toLocaleLowerCase('da-DK');
const playerByName = new Map();
for (const p of playerRows) if (!playerByName.has(p.name_normalized || normalizeName(p.name_raw))) playerByName.set(p.name_normalized || normalizeName(p.name_raw), p);

const candidates = [], conflicts = [];
const knownKeys = new Set(existingKeys);
const dbByKey = new Map(existing.map((x) => [`${x.team_match_id}|${x.category_raw}`, x]));
const scoreText = (sets, side) => sets.map((x) => String(x[side])).join('-');
const winner = (sets) => {
  let home = 0, away = 0;
  for (const s of sets) { if (s.home > s.away) home++; else if (s.away > s.home) away++; }
  return home > away ? 'home' : away > home ? 'away' : null;
};
for (const match of parsed) {
  const teamMatchId = matchByExternal.get(String(match.id));
  if (!teamMatchId) continue;
  for (const c of match.categories ?? []) {
    if (!c.hasScore || !c.homePlayers.length || !c.awayPlayers.length) continue;
    const key = `${teamMatchId}|${c.category}`;
    if (dbByKey.has(key)) {
      const old = dbByKey.get(key);
      const hs = scoreText(c.sets, 'home'), as = scoreText(c.sets, 'away');
      if (old.home_score_raw !== hs || old.away_score_raw !== as) conflicts.push({ matchId: match.id, category: c.category, reason: 'score_mismatch', database: [old.home_score_raw, old.away_score_raw], browser: [hs, as] });
      continue;
    }
    if (knownKeys.has(key)) continue;
    knownKeys.add(key);
    const golden = /^Golden Set/i.test(c.category);
    const m = c.category.match(/^(\d+)\.\s*(.+)$/);
    candidates.push({
      external_match_id: String(match.id), team_match_id: teamMatchId, category: c.category,
      game_number: golden ? 'Golden Set' : (m?.[1] ?? null), discipline: golden ? (c.category.replace(/^Golden Set\s*/i, '').trim() || null) : (m?.[2] ?? null),
      homePlayers: c.homePlayers, awayPlayers: c.awayPlayers,
      homeScore: scoreText(c.sets, 'home'), awayScore: scoreText(c.sets, 'away'), winnerSide: c.zeroScore ? null : winner(c.sets),
      zeroScore: c.zeroScore, resultMarkerRaw: c.resultMarkerRaw
    });
  }
}

let insertedMatches = 0, insertedPlayers = 0, insertedLinks = 0;
if (apply) {
  db.exec('BEGIN');
  try {
    const findPlayer = db.prepare('SELECT player_id, name_raw, name_normalized FROM players WHERE name_normalized = ? LIMIT 1');
    const addPlayer = db.prepare('INSERT INTO players (external_player_id, name_raw, name_normalized) VALUES (NULL, ?, ?)');
    const addMatch = db.prepare('INSERT INTO individual_matches (team_match_id, discipline_raw, game_number_raw, category_raw, home_score_raw, away_score_raw, winner_side, status, result_marker_raw) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const addLink = db.prepare('INSERT INTO individual_match_players (individual_match_id, player_id, side, pair_number, role, points_at_match) VALUES (?, ?, ?, ?, ?, NULL)');
    for (const c of candidates) {
      const result = addMatch.run(c.team_match_id, c.discipline, c.game_number, c.category, c.homeScore, c.awayScore, c.winnerSide, c.zeroScore ? 'browser_zero_score' : 'browser_parsed', c.resultMarkerRaw);
      const individualId = Number(result.lastInsertRowid); insertedMatches++;
      for (const [side, names] of [['home', c.homePlayers], ['away', c.awayPlayers]]) {
        for (let i = 0; i < names.length; i++) {
          const raw = names[i], norm = normalizeName(raw);
          let p = findPlayer.get(norm);
          if (!p) { const created = addPlayer.run(raw, norm); p = { player_id: Number(created.lastInsertRowid) }; insertedPlayers++; }
          addLink.run(individualId, p.player_id, side, i + 1, 'player'); insertedLinks++;
        }
      }
    }
    db.exec('COMMIT');
  } catch (e) { db.exec('ROLLBACK'); throw e; }
}
const report = { generatedAt: new Date().toISOString(), apply, existingIndividualRows: existing.length, candidates: candidates.length, conflicts: conflicts.length, insertedMatches, insertedPlayers, insertedLinks, goldenSetCandidates: candidates.filter((x) => x.game_number === 'Golden Set').length, conflictsDetail: conflicts.slice(0, 200) };
fs.writeFileSync('results/browser-individual-import-run.json', JSON.stringify(report, null, 2));
fs.writeFileSync('results/browser-individual-import-run.md', `# Browserindividuel import – ${apply ? 'apply' : 'dry-run'}\n\n- Eksisterende individuelle rækker: **${existing.length}**\n- Importkandidater: **${candidates.length}**\n- Heraf Golden Set: **${report.goldenSetCandidates}**\n- Scorekonflikter mod eksisterende rækker: **${conflicts.length}**\n- Indsatte individuelle kampe: **${insertedMatches}**\n- Indsatte spillere: **${insertedPlayers}**\n- Indsatte spillerrelationer: **${insertedLinks}**\n\nKun kategorier med scores og spillere på begge sider er med. Eksisterende API-rækker overskrives ikke, og scorekonflikter importeres ikke automatisk.\n`);
db.close();
console.log(JSON.stringify(report, null, 2));
