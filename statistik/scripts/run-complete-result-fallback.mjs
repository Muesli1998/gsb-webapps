import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { chromium } from 'playwright';

const outDir = 'results/browser-fallback-complete';
const stateDir = '.browser-state';
const delayMs = Number(process.env.DELAY_MS || 1600);
fs.mkdirSync(outDir, { recursive: true });
const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const rows = db.prepare(`SELECT tm.external_match_id, tm.season_id, tm.round_date, c.league_group_id
  FROM team_matches tm LEFT JOIN competitions c ON c.competition_id=tm.competition_id
  WHERE tm.status='complete' AND (tm.result_raw IS NULL OR trim(tm.result_raw)='')
  ORDER BY tm.season_id, tm.external_match_id`).all();
db.close();
const pending = rows.filter((x) => !fs.existsSync(path.join(outDir, `${x.season_id}-${x.external_match_id}.json`)));
const browser = await chromium.launchPersistentContext(stateDir, { headless: false });
const page = await browser.newPage();
let done = 0, dynamic = 0, noDetail = 0, errors = 0;
for (const x of pending) {
  const url = `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,${x.season_id},${x.league_group_id ?? ''},1,8,,${x.external_match_id},1093,`;
  let rawText = '', error = null;
  try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); await page.waitForTimeout(delayMs); rawText = await page.locator('body').innerText(); } catch (e) { error = String(e); errors++; }
  const ok = rawText.includes(String(x.external_match_id)) && /^Resultat\b/m.test(rawText);
  if (ok) dynamic++; else noDetail++;
  fs.writeFileSync(path.join(outDir, `${x.season_id}-${x.external_match_id}.json`), JSON.stringify({ ...x, url, status: ok ? 'dynamic_detail' : 'no_dynamic_detail', error, retrievedAt: new Date().toISOString(), rawText }, null, 2));
  done++;
  if (done % 20 === 0) console.log(`Complete-resultat ${done}/${pending.length} (dynamisk ${dynamic}, uden detalje ${noDetail}, fejl ${errors})`);
}
await browser.close();
console.log(JSON.stringify({ selected: rows.length, pending: pending.length, done, dynamic, noDetail, errors }, null, 2));
