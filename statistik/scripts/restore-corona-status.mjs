import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const qPath = 'results/browser-fallback-queue.json';
const q = JSON.parse(fs.readFileSync(qPath, 'utf8'));
const update = db.prepare("UPDATE team_matches SET status='corona_suspended', source_status='corona_suspended' WHERE external_match_id=?");
let restored = 0;
for (const name of fs.readdirSync('results/browser-fallback').filter((x) => x.endsWith('.retry.json'))) {
  const o = JSON.parse(fs.readFileSync(`results/browser-fallback/${name}`, 'utf8'));
  if (o.classification !== 'corona_suspended') continue;
  const id = String(o.matchId);
  const row = q.results.find((x) => String(x.matchId) === id);
  if (row) { row.status = 'corona_suspended'; row.classification = 'corona_suspended'; }
  if (update.run(id).changes) restored++;
}
fs.writeFileSync(qPath, JSON.stringify(q, null, 2));
db.close();
console.log(JSON.stringify({ restored }, null, 2));
