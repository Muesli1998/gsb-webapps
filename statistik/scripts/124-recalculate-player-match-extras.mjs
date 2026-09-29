import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

// The two input databases may live in another checkout because they are ignored
// generated data.  Keep the paths runtime-configurable and never attach either
// protected database for writing.
const nationalPath = path.resolve(process.env.NATIONAL_DB || 'statistik/data/national-spillere.db');
const gsbPath = path.resolve(process.env.GSB_DB || 'statistik/data/gsb-statistik-normalized.db');
const reportPath = path.resolve(process.env.REPORT_JSON || 'statistik/results/124-player-match-extras.json');
const batchSize = Number(process.env.BATCH_SIZE || 100);
const inspectOnly = process.argv.includes('--inspect');
const dryRun = process.argv.includes('--dry-run');
const selectedMatchIds = new Set((process.env.MATCH_IDS || '').split(',').map(id => id.trim()).filter(Boolean));
const debugMatchId = process.env.DEBUG_MATCH_ID || null;

const normalise = value => String(value ?? '')
  .normalize('NFKC')
  .replace(/\s+/g, ' ')
  .trim()
  .toLocaleLowerCase('da-DK');
const canonicalSide = value => {
  const side = normalise(value);
  if (side === 'home' || side === 'hjemme') return 'hjemme';
  if (side === 'away' || side === 'ude') return 'ude';
  return side;
};

const categoryPattern = /^(\d+)\.\s*(HS|DS|HD|DD|MD|S|D)\b/i;
const scoreTokenPattern = /\d+\s*-\s*\d+(?:\s*\([^)]*\))?/g;

function schema(db, sql) { db.exec(sql); }

function ensureExtrasTable(db) {
  schema(db, `
    CREATE TABLE IF NOT EXISTS player_match_extras (
      external_match_id TEXT NOT NULL,
      external_player_id TEXT NOT NULL,
      discipline_code TEXT NOT NULL DEFAULT '',
      slot TEXT NOT NULL,
      team_side TEXT,
      partner_player_id TEXT,
      opponent_player_id TEXT,
      set_scores_raw TEXT,
      walkover_raw TEXT,
      parse_status TEXT NOT NULL CHECK(parse_status IN ('ok','uklar_navnekobling','kamptekst_mangler_blokke','afkortet')),
      parser_version TEXT NOT NULL,
      parsed_at TEXT NOT NULL,
      PRIMARY KEY (external_match_id, external_player_id, discipline_code, slot)
    );
    CREATE INDEX IF NOT EXISTS idx_player_match_extras_match
      ON player_match_extras(external_match_id);
  `);
}

function readCategories(text) {
  const lines = String(text ?? '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const categories = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(categoryPattern);
    if (!match) continue;
    let end = index + 1;
    while (end < lines.length
      && !categoryPattern.test(lines[end])
      && !/^golden set\b/i.test(lines[end])
      && !/^reserver$/i.test(lines[end])
      && !/^udskriv\b/i.test(lines[end])) end += 1;
    categories.push({ number: match[1], code: match[2].toUpperCase(), lines: lines.slice(index + 1, end) });
  }
  return categories;
}

function parseCategory(category, expectedPlayers) {
  // Exact normalised text equality is deliberate: a suffix mismatch (EU, udl.)
  // is an ambiguity, not evidence for an automatic identity link.
  const byName = new Map();
  for (const player of expectedPlayers) {
    const key = normalise(player.name_raw);
    if (!key) continue;
    const list = byName.get(key) || [];
    list.push(player);
    byName.set(key, list);
  }
  const names = [];
  const unrecognised = [];
  let scoresAt = category.lines.length;
  for (let i = 0; i < category.lines.length; i += 1) {
    if (scoreTokenPattern.test(category.lines[i])) { scoresAt = i; break; }
  }
  const candidateLines = category.lines.slice(0, scoresAt);
  for (const rawName of candidateLines) {
    const candidates = byName.get(normalise(rawName)) || [];
    if (candidates.length === 1) names.push({ rawName, player: candidates[0] });
    else if (rawName && !/^(vinder w\.o\.|resultat)$/i.test(rawName)) unrecognised.push(rawName);
  }
  const expectedIds = new Set(expectedPlayers.map(player => String(player.external_player_id)));
  const foundIds = names.map(entry => String(entry.player.external_player_id));
  const uniqueFound = new Set(foundIds);
  const ambiguity = unrecognised.length > 0 || uniqueFound.size !== expectedIds.size || foundIds.length !== expectedIds.size;
  const scores = category.lines.slice(scoresAt)
    .flatMap(line => [...line.matchAll(scoreTokenPattern)].map(match => match[0].replace(/\s+/g, ' ').trim()));
  const explicitWalkover = category.lines.filter(line => /\(ikke fremmødt\)/i.test(line));
  return {
    ambiguity,
    names,
    scores: scores.length ? scores.join(' | ') : null,
    walkover: explicitWalkover.length ? explicitWalkover.join(' | ') : null,
    unrecognised
  };
}

function rowsForMatch(match, matchPlayers) {
  const categories = readCategories(match.context_raw);
  const byCode = new Map();
  for (const player of matchPlayers) {
    const code = String(player.discipline_code ?? '').toUpperCase();
    const list = byCode.get(code) || [];
    list.push(player);
    byCode.set(code, list);
  }
  const output = [];
  for (const [code, players] of byCode) {
    const codeCategories = categories.filter(category => category.code === code);
    if (!codeCategories.length) {
      for (const player of players) output.push({
        external_match_id: match.external_match_id, external_player_id: player.external_player_id,
        name_raw: player.name_raw,
        discipline_code: code, slot: 'ukendt', team_side: null, partner_player_id: null,
        opponent_player_id: null, set_scores_raw: null, walkover_raw: null,
        parse_status: categories.length ? 'kamptekst_mangler_blokke' : 'afkortet'
      });
      continue;
    }
    const occurrences = new Map();
    for (const category of codeCategories) {
      const body = category.lines.join('\n');
      for (const player of players) {
        const needle = normalise(player.name_raw);
        if (!needle) continue;
        const exactCount = category.lines.filter(line => normalise(line) === needle).length;
        if (exactCount) {
          const list = occurrences.get(String(player.external_player_id)) || [];
          for (let index = 0; index < exactCount; index += 1) list.push(category);
          occurrences.set(String(player.external_player_id), list);
        }
      }
    }
    const emitted = new Set();
    for (const category of codeCategories) {
      const categoryPlayers = players.filter(player => (occurrences.get(String(player.external_player_id)) || []).filter(item => item === category).length === 1);
      const parsed = parseCategory(category, categoryPlayers);
      const doubles = ['HD', 'DD', 'MD', 'D'].includes(code);
      const expectedPerSide = doubles ? 2 : 1;
      for (const player of categoryPlayers) {
        emitted.add(String(player.external_player_id));
        const countAcrossCategories = (occurrences.get(String(player.external_player_id)) || []).length;
        const foundIndex = parsed.names.findIndex(entry => String(entry.player.external_player_id) === String(player.external_player_id));
        const ambiguous = parsed.ambiguity || countAcrossCategories !== 1 || foundIndex < 0;
        const side = ambiguous ? null : (foundIndex < expectedPerSide ? 'hjemme' : 'ude');
        const sideMembers = side ? parsed.names.filter((_, i) => side === 'hjemme' ? i < expectedPerSide : i >= expectedPerSide) : [];
        const opponents = side ? parsed.names.filter((_, i) => side === 'hjemme' ? i >= expectedPerSide : i < expectedPerSide) : [];
        const partner = sideMembers.length === 2 ? sideMembers.find(entry => String(entry.player.external_player_id) !== String(player.external_player_id)) : null;
        output.push({
          external_match_id: match.external_match_id, external_player_id: player.external_player_id,
          name_raw: player.name_raw,
          discipline_code: code, slot: side ? `${category.number}_${side}_${sideMembers.findIndex(entry => String(entry.player.external_player_id) === String(player.external_player_id)) + 1}` : `${category.number}_ukendt`,
          team_side: side,
          partner_player_id: partner ? partner.player.external_player_id : null,
          opponent_player_id: opponents.length === 1 ? opponents[0].player.external_player_id : null,
          set_scores_raw: parsed.scores, walkover_raw: parsed.walkover,
          parse_status: ambiguous ? 'uklar_navnekobling' : 'ok'
        });
      }
    }
    for (const player of players) {
      if (emitted.has(String(player.external_player_id))) continue;
      output.push({
        external_match_id: match.external_match_id, external_player_id: player.external_player_id,
        name_raw: player.name_raw,
        discipline_code: code, slot: 'ukendt', team_side: null, partner_player_id: null,
        opponent_player_id: null, set_scores_raw: null, walkover_raw: null,
        parse_status: 'uklar_navnekobling'
      });
    }
  }
  return output;
}

function gsbComparison(nationalRows, gsb) {
  const gsbRows = gsb.prepare(`
    SELECT tm.external_match_id, p.name_raw, im.discipline_raw AS discipline_code,
      im.individual_match_id, im.game_number_raw, imp.side, imp.pair_number, imp.role
    FROM team_matches tm
    JOIN individual_matches im ON im.team_match_id = tm.team_match_id
    JOIN individual_match_players imp ON imp.individual_match_id = im.individual_match_id
    JOIN players p ON p.player_id = imp.player_id
    WHERE im.game_number_raw <> 'Golden Set'
  `).all();
  const gsbByKey = new Map();
  const gsbByIndividualSide = new Map();
  for (const row of gsbRows) {
    const key = `${row.external_match_id}|${normalise(row.name_raw)}|${String(row.discipline_code ?? '').toUpperCase()}`;
    const list = gsbByKey.get(key) || [];
    list.push(row);
    gsbByKey.set(key, list);
    const individualKey = `${row.individual_match_id}|${row.side}`;
    const sideList = gsbByIndividualSide.get(individualKey) || [];
    sideList.push(row);
    gsbByIndividualSide.set(individualKey, sideList);
  }
  let compared = 0, sideMatch = 0, partnerComparable = 0, partnerMatch = 0;
  const deviations = [];
  for (const row of nationalRows) {
    const key = `${row.external_match_id}|${normalise(row.name_raw)}|${row.discipline_code}`;
    const refs = gsbByKey.get(key) || [];
    if (refs.length !== 1) continue;
    compared += 1;
    const ref = refs[0];
    const sameSide = canonicalSide(ref.side) === canonicalSide(row.team_side);
    if (sameSide) sideMatch += 1;
    const sameSideRows = (gsbByIndividualSide.get(`${ref.individual_match_id}|${ref.side}`) || [])
      .filter(candidate => normalise(candidate.name_raw) !== normalise(ref.name_raw));
    if (sameSideRows.length === 1 && row.partner_name_raw) {
      partnerComparable += 1;
      if (normalise(sameSideRows[0].name_raw) === normalise(row.partner_name_raw)) partnerMatch += 1;
    }
    if (!sameSide || (sameSideRows.length === 1 && row.partner_name_raw && normalise(sameSideRows[0].name_raw) !== normalise(row.partner_name_raw))) {
      if (deviations.length < 100) deviations.push({
        external_match_id: row.external_match_id, external_player_id: row.external_player_id,
        discipline_code: row.discipline_code, national_side: row.team_side, gsb_side: ref.side,
        national_partner: row.partner_name_raw, gsb_partner: sameSideRows[0]?.name_raw ?? null
      });
    }
  }
  return { compared, sideMatch, sideMismatch: compared - sideMatch, partnerComparable, partnerMatch, partnerMismatch: partnerComparable - partnerMatch, deviations };
}

function rowsForGsbValidation(national, gsb) {
  const matchIds = gsb.prepare(`SELECT DISTINCT external_match_id FROM team_matches`).all()
    .map(row => String(row.external_match_id));
  const statement = national.prepare(`
    SELECT e.external_match_id, e.external_player_id, e.discipline_code, e.team_side,
      e.partner_player_id, e.parse_status, p.name_raw, partner.name_raw AS partner_name_raw
    FROM player_match_extras e
    JOIN players p ON p.external_player_id=e.external_player_id
    LEFT JOIN players partner ON partner.external_player_id=e.partner_player_id
    WHERE e.external_match_id=? AND e.team_side IS NOT NULL
  `);
  const rows = [];
  for (const matchId of matchIds) rows.push(...statement.all(matchId));
  return rows;
}

if (inspectOnly) {
  const db = new DatabaseSync(nationalPath, { readOnly: true });
  const inspectMatchId = process.env.INSPECT_MATCH_ID || null;
  console.log(JSON.stringify({
    nationalPath,
    counts: Object.fromEntries(['matches', 'players', 'player_matches', 'player_match_extras'].map(table => {
      try { return [table, db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n]; } catch { return [table, null]; }
    })),
    samples: inspectMatchId
      ? [{ match: db.prepare(`SELECT external_match_id, context_raw FROM matches WHERE external_match_id=?`).get(inspectMatchId), players: db.prepare(`SELECT external_player_id, name_raw, discipline_code FROM player_matches WHERE external_match_id=?`).all(inspectMatchId) }]
      : db.prepare(`SELECT external_match_id, context_raw FROM matches WHERE render_gate=1 AND context_raw IS NOT NULL LIMIT 3`).all()
  }, null, 2));
  db.close();
  process.exit(0);
}

const national = new DatabaseSync(nationalPath, dryRun ? { readOnly: true } : {});
if (!dryRun) {
  national.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=60000;');
  ensureExtrasTable(national);
}
const gsb = new DatabaseSync(gsbPath, { readOnly: true });
const before = Object.fromEntries(['players', 'matches', 'player_matches', 'scrape_progress'].map(table => [table, national.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n]));
const selectedIds = [...selectedMatchIds];
const selectedWhere = selectedIds.length
  ? `AND m.external_match_id IN (${selectedIds.map(() => '?').join(',')})`
  : '';
const pendingIds = national.prepare(`
  SELECT m.external_match_id
  FROM matches m
  WHERE m.render_gate=1 AND m.context_raw IS NOT NULL
    AND EXISTS (SELECT 1 FROM player_matches pm WHERE pm.external_match_id=m.external_match_id)
    ${dryRun ? '' : 'AND NOT EXISTS (SELECT 1 FROM player_match_extras e WHERE e.external_match_id=m.external_match_id)'}
    ${selectedWhere}
  ORDER BY CAST(m.external_match_id AS INTEGER)
`).all(...selectedIds);
const pending = pendingIds.map(row => String(row.external_match_id));
// player_matches has no external_match_id index.  Scan it once and retain only
// rows belonging to the pending population rather than doing 164k table scans.
const pendingSet = new Set(pending);
const playersByMatch = new Map();
if (pendingSet.size) {
  for (const player of national.prepare(`SELECT external_player_id, external_match_id, name_raw, discipline_code FROM player_matches`).iterate()) {
    const matchId = String(player.external_match_id);
    if (!pendingSet.has(matchId)) continue;
    const list = playersByMatch.get(matchId) || [];
    list.push(player);
    playersByMatch.set(matchId, list);
  }
}
const matchById = national.prepare(`SELECT external_match_id, context_raw FROM matches WHERE external_match_id=?`);
const insert = dryRun ? null : national.prepare(`INSERT OR REPLACE INTO player_match_extras
  (external_match_id,external_player_id,discipline_code,slot,team_side,partner_player_id,opponent_player_id,set_scores_raw,walkover_raw,parse_status,parser_version,parsed_at)
  VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`);
const statuses = new Map();
let parsedMatches = 0;
const dryRows = [];
const debug = [];
for (let start = 0; start < pending.length; start += batchSize) {
  const chunk = pending.slice(start, start + batchSize);
  if (!dryRun) national.exec('BEGIN');
  try {
    for (const externalMatchId of chunk) {
      const match = matchById.get(externalMatchId);
      const matchPlayers = playersByMatch.get(String(externalMatchId)) || [];
      const rows = rowsForMatch(match, matchPlayers);
      if (debugMatchId === String(externalMatchId)) debug.push({
        external_match_id: externalMatchId,
        categories: readCategories(match.context_raw),
        players: matchPlayers,
        rows
      });
      for (const row of rows) {
        if (dryRun) dryRows.push(row);
        else insert.run(row.external_match_id, row.external_player_id, row.discipline_code, row.slot, row.team_side,
          row.partner_player_id, row.opponent_player_id, row.set_scores_raw, row.walkover_raw,
          row.parse_status, '124-v1', new Date().toISOString());
        statuses.set(row.parse_status, (statuses.get(row.parse_status) || 0) + 1);
      }
      parsedMatches += 1;
    }
    if (!dryRun) national.exec('COMMIT');
  } catch (error) {
    if (!dryRun) national.exec('ROLLBACK');
    throw error;
  }
  console.log(JSON.stringify({ parsedMatches, totalPending: pending.length, insertedRows: [...statuses.values()].reduce((a, b) => a + b, 0) }));
}
const after = Object.fromEntries(['players', 'matches', 'player_matches', 'scrape_progress'].map(table => [table, national.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n]));
const extras = dryRun
  ? { rows: dryRows.length, with_team_side: dryRows.filter(row => row.team_side).length, with_partner: dryRows.filter(row => row.partner_player_id).length, with_sets: dryRows.filter(row => row.set_scores_raw).length, with_walkover: dryRows.filter(row => row.walkover_raw).length }
  : national.prepare(`SELECT COUNT(*) AS rows, COUNT(team_side) AS with_team_side, COUNT(partner_player_id) AS with_partner, COUNT(set_scores_raw) AS with_sets, COUNT(walkover_raw) AS with_walkover FROM player_match_extras`).get();
const statusDistribution = dryRun
  ? [...statuses.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([parse_status, n]) => ({ parse_status, n }))
  : national.prepare(`SELECT parse_status, COUNT(*) AS n FROM player_match_extras GROUP BY parse_status ORDER BY parse_status`).all();
const compareRows = dryRun
  ? dryRows.filter(row => row.team_side).map(row => ({
      ...row,
      partner_name_raw: row.partner_player_id
        ? (playersByMatch.get(String(row.external_match_id)) || []).find(player => String(player.external_player_id) === String(row.partner_player_id))?.name_raw ?? null
        : null
    }))
  : rowsForGsbValidation(national, gsb);
const gsbResult = gsbComparison(compareRows, gsb);
const report = { parser: '124-v1', nationalPath: process.env.NATIONAL_DB ? 'NATIONAL_DB (runtime path)' : 'statistik/data/national-spillere.db', generatedAt: new Date().toISOString(), pendingMatchesAtStart: pending.length,
  selectedMatchIds: selectedMatchIds.size ? [...selectedMatchIds] : null,
  parsedMatches, dryRun, existingTableRows: dryRun ? 0 : extras.rows - [...statuses.values()].reduce((a, b) => a + b, 0), before, after, unchangedExistingTables: JSON.stringify(before) === JSON.stringify(after), extras,
  statusDistribution, gsbComparison: gsbResult };
if (debug.length) report.debug = debug;
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
gsb.close();
national.close();
console.log(JSON.stringify(report, null, 2));
