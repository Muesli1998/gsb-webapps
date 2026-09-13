import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const queuePath = 'results/browser-fallback-queue.json';
const outDir = 'results/browser-fallback';
const stateDir = '.browser-state';
const delayMs = Number(process.env.DELAY_MS || 1600);
fs.mkdirSync(outDir, { recursive: true });
const q = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const candidates = q.results.filter((x) => x.status === 'verified' && !x.reverifiedAt);
const browser = await chromium.launchPersistentContext(stateDir, { headless: false });
const page = await browser.newPage();
let done = 0;
for (const x of candidates) {
  const started = new Date().toISOString();
  const url = `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,${x.season},${x.leagueGroupId},1,8,,${x.matchId},1093,`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(delayMs);
    const rawText = await page.locator('body').innerText();
    x.reverifiedAt = started;
    x.reverifySource = 'playwright_persistent_browser';
    x.reverifyStatus = rawText.includes(String(x.matchId)) && /^Resultat\b/m.test(rawText) ? 'dynamic_detail' : 'no_dynamic_detail';
    fs.writeFileSync(path.join(outDir, `${x.season}-${x.matchId}.json`), JSON.stringify({ ...x, sourceUrl: url, rawText }, null, 2));
  } catch (e) {
    x.reverifiedAt = started;
    x.reverifyStatus = 'browser_error';
    x.reverifyError = String(e);
  }
  done++;
  fs.writeFileSync(queuePath, JSON.stringify(q, null, 2));
  if (done % 20 === 0) console.log(`Feltgenkørsel ${done}/${candidates.length}`);
}
await browser.close();
console.log(JSON.stringify({ candidates: candidates.length, done }, null, 2));
