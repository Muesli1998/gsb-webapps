import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { chromium } from 'playwright';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const rows = db.prepare(`SELECT external_match_id, season_id, round_date FROM team_matches WHERE status='complete' AND (result_raw IS NULL OR trim(result_raw)='') ORDER BY season_id, external_match_id LIMIT 32`).all();
db.close();
fs.mkdirSync('results/complete-result-sample', { recursive: true });
const browser = await chromium.launchPersistentContext('.browser-state', { headless: false });
const page = await browser.newPage();
let dynamic = 0, noDetail = 0;
for (const x of rows) {
  const url = `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,${x.season_id},,1,8,,${x.external_match_id},1093,`;
  let rawText = '', error = null;
  try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); await page.waitForTimeout(1600); rawText = await page.locator('body').innerText(); } catch (e) { error = String(e); }
  const ok = rawText.includes(String(x.external_match_id)) && /^Resultat\b/m.test(rawText);
  if (ok) dynamic++; else noDetail++;
  fs.writeFileSync(`results/complete-result-sample/${x.season_id}-${x.external_match_id}.json`, JSON.stringify({ ...x, url, status: ok ? 'dynamic_detail' : 'no_dynamic_detail', error, rawText }, null, 2));
}
await browser.close();
console.log(JSON.stringify({ sampled: rows.length, dynamic, noDetail }, null, 2));
