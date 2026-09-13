import fs from 'node:fs';

const queuePath = 'results/browser-fallback-queue.json';
const q = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const byId = new Map(q.results.map((r) => [String(r.matchId), r]));
let marked = 0;
for (const name of fs.readdirSync('results/browser-fallback-youth').filter((x) => x.endsWith('.json'))) {
  const o = JSON.parse(fs.readFileSync(`results/browser-fallback-youth/${name}`, 'utf8'));
  const raw = String(o.rawText ?? '');
  const text = raw.match(/\(\s*Ikke fremmødt\s*\)/i)?.[0];
  if (!text) continue;
  const row = byId.get(String(o.matchId));
  if (!row) continue;
  const lines = raw.split(/\r?\n/).map((x) => x.trim());
  const val = (label) => { const i = lines.findIndex((x) => x.startsWith(label)); if (i < 0) return ''; const same = lines[i].slice(label.length).replace(/^[:\t ]+/, '').trim(); return same || (lines[i + 1] ?? '').trim(); };
  const home = val('Hjemmehold');
  const away = val('Udehold');
  const result = val('Resultat');
  const score = result.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
  row.walkoverObserved = true;
  row.walkoverText = text;
  if (score && home && away && Number(score[1]) !== Number(score[2])) row.walkoverWinner = Number(score[1]) > Number(score[2]) ? home : away;
  marked++;
}
q.generatedAt = new Date().toISOString();
fs.writeFileSync(queuePath, JSON.stringify(q, null, 2));
console.log(JSON.stringify({ marked }, null, 2));
