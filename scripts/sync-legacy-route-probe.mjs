import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
function field(raw, label) { const lines = String(raw ?? '').split(/\r?\n/).map((x) => x.trim()); const i = lines.findIndex((x) => x.startsWith(label)); if (i < 0) return null; const same = lines[i].slice(label.length).replace(/^[:\t ]+/, '').trim(); return same || (lines[i + 1] ?? '').trim() || null; }
const up = db.prepare(`UPDATE team_matches SET home_name_raw=COALESCE(?,home_name_raw),away_name_raw=COALESCE(?,away_name_raw),result_raw=COALESCE(?,result_raw),points_raw=COALESCE(?,points_raw),status='browser_verified',source_status='browser_legacy_route' WHERE external_match_id=?`);
let updated = 0;
for (const name of fs.readdirSync('results/legacy-route-probe').filter((x) => x.endsWith('.json'))) {
  const o = JSON.parse(fs.readFileSync(`results/legacy-route-probe/${name}`, 'utf8'));
  if (!o.resultFound) continue;
  const h = field(o.rawText, 'Hjemmehold'), a = field(o.rawText, 'Udehold'), r = field(o.rawText, 'Resultat'), p = field(o.rawText, 'Point');
  const row = up.run(h, a, r, p, o.matchId);
  if (row.changes) updated++;
}
db.close();
console.log(JSON.stringify({ updated }, null, 2));
