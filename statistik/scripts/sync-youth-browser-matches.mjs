import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const dir = 'results/browser-fallback-youth';

function field(rawText, label) {
  const lines = String(rawText ?? '').split(/\r?\n/).map((x) => x.trim());
  const i = lines.findIndex((x) => x.startsWith(label));
  if (i < 0) return null;
  const same = lines[i].slice(label.length).replace(/^[:\t ]+/, '').trim();
  return same || (lines[i + 1] ?? '').trim() || null;
}

const update = db.prepare(`
  UPDATE team_matches
  SET home_name_raw = COALESCE(?, home_name_raw),
      away_name_raw = COALESCE(?, away_name_raw),
      result_raw = COALESCE(?, result_raw),
      points_raw = COALESCE(?, points_raw),
      walkover_text_raw = COALESCE(?, walkover_text_raw),
      walkover_winner_raw = COALESCE(?, walkover_winner_raw),
      status = CASE WHEN ? IS NULL OR ? = '' THEN status ELSE ? END,
      source_status = 'browser_youth_fallback'
  WHERE external_match_id = ?
`);

let files = 0;
let updated = 0;
let notFound = 0;
let accepted = 0;
for (const name of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const o = JSON.parse(fs.readFileSync(`${dir}/${name}`, 'utf8'));
  if (o.status !== 'youth_verified') continue;
  const raw = String(o.rawText ?? '');
  const hasGate = raw.includes(String(o.matchId)) && /^Resultat\b/m.test(raw);
  if (!hasGate) continue;
  accepted++;
  const home = field(raw, 'Hjemmehold');
  const away = field(raw, 'Udehold');
  const result = field(raw, 'Resultat');
  const points = field(raw, 'Point');
  const walkover = raw.match(/\(\s*Ikke fremmødt\s*\)/i)?.[0] ?? null;
  const score = result?.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
  const winner = walkover && score && home && away
    ? (Number(score[1]) > Number(score[2]) ? home : Number(score[2]) > Number(score[1]) ? away : null)
    : null;
  const resultStatus = result && result !== '-' ? 'browser_verified' : 'browser_verified_no_result';
  const row = update.run(home, away, result, points, walkover, winner, result, resultStatus, resultStatus, String(o.matchId));
  files++;
  if (row.changes) updated++;
  else notFound++;
}
db.close();
console.log(JSON.stringify({ files, accepted, updated, notFound }, null, 2));
