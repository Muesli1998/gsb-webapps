import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const queuePath = path.join(root, 'results', 'browser-fallback-queue.json');
const outDir = path.join(root, 'results', 'browser-fallback');
const stateDir = path.join(root, '.browser-state');
const batchSize = Number(process.env.BATCH_SIZE || 20);
const delayMs = Number(process.env.DELAY_MS || 900);
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(stateDir, { recursive: true });

function load() { return JSON.parse(fs.readFileSync(queuePath, 'utf8')); }
function save(x) { fs.writeFileSync(queuePath, JSON.stringify(x, null, 2)); }
function urlFor(x) { return `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,${x.season},${x.leagueGroupId},1,8,,${x.matchId},1093,`; }

const browser = await chromium.launchPersistentContext(stateDir, { headless: false });
const page = await browser.newPage();
console.log('Browseren er åbnet. Log ind manuelt hvis siden viser login; runneren fortsætter derefter.');
await page.goto('https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);

while (true) {
  const data = load();
  const pending = data.results.filter(x => x.status === 'pending').slice(0, batchSize);
  if (!pending.length) break;
  for (const x of pending) {
    const started = new Date().toISOString();
    try {
      await page.goto(urlFor(x), { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(delayMs);
      const body = await page.locator('body').innerText();
      const rendered = body.includes(String(x.matchId));
      x.status = rendered ? 'verified' : 'browser_no_match_id';
      x.verifiedAt = started;
      x.resultSource = 'playwright_persistent_browser';
      x.verification = rendered ? 'Dynamic BadmintonPlayer page rendered successfully' : 'Page loaded but match id was not visible';
      fs.writeFileSync(path.join(outDir, `${x.season}-${x.matchId}.json`), JSON.stringify({ ...x, sourceUrl: urlFor(x) }, null, 2));
    } catch (err) {
      x.status = 'browser_error'; x.lastError = String(err); x.lastAttemptAt = started;
    }
    save(data);
  }
  console.log(`Pulje færdig: ${pending.length}. Tilbage: ${load().results.filter(x => x.status === 'pending').length}`);
}
await browser.close();
console.log('Runner færdig.');
