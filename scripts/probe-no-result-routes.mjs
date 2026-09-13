import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { chromium } from 'playwright';

const ids = ['384292', '365220', '387380', '395109', '395200', '395153'];
const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const rows = ids.map((id) => db.prepare(`SELECT tm.external_match_id, tm.season_id, tm.round_date, c.league_group_id
  FROM team_matches tm LEFT JOIN competitions c ON c.competition_id=tm.competition_id
  WHERE tm.external_match_id=?`).get(id)).filter(Boolean);
db.close();
const variants = [
  (x) => `#5,${x.season_id},${x.league_group_id ?? ''},1,8,,${x.external_match_id},1093,`,
  (x) => `#5,${x.season_id},${x.league_group_id ?? ''},1,1,,${x.external_match_id},1093,`,
  (x) => `#4,${x.season_id},${x.league_group_id ?? ''},1,1,,${x.external_match_id},1093,`,
  (x) => `#6,${x.season_id},${x.league_group_id ?? ''},1,1,,${x.external_match_id},1093,`,
  (x) => `#2,${x.season_id},${x.league_group_id ?? ''},1,1,,${x.external_match_id},1093,`
];
const outDir = 'results/no-result-route-probe';
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launchPersistentContext('.browser-state', { headless: false });
const page = await browser.newPage();
const out = [];
for (const row of rows) for (const make of variants) {
  const fragment = make(row); const url = `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/${fragment}`;
  let rawText = '', error = null;
  try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); await page.waitForTimeout(1800); rawText = await page.locator('body').innerText(); } catch (e) { error = String(e); }
  const resultLine = rawText.split(/\r?\n/).find((x) => /^Resultat\b/.test(x)) ?? null;
  const categoryCount = (rawText.match(/^\d+\.\s*[A-ZÆØÅæøå]+/gm) ?? []).length;
  const scoreCount = ((rawText.slice(rawText.search(/\nResultat\b/i)).match(/\b\d{1,2}\s*[-–]\s*\d{1,2}\b/g)) ?? []).length;
  const item = { ...row, url, resultLine, categoryCount, scoreCount, hasMatch: rawText.includes(String(row.external_match_id)), hasNoPlayText: /Afgjort uden kamp|Ikke fremmødt/i.test(rawText), error };
  out.push(item); fs.writeFileSync(path.join(outDir, `${row.season_id}-${row.external_match_id}-${out.length}.json`), JSON.stringify(item, null, 2));
}
await browser.close();
fs.writeFileSync('results/no-result-route-probe.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.map(({ external_match_id, season_id, url, resultLine, categoryCount, scoreCount, hasMatch, hasNoPlayText, error }) => ({ external_match_id, season_id, url, resultLine, categoryCount, scoreCount, hasMatch, hasNoPlayText, error })), null, 2));
