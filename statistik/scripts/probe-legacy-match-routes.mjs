import fs from 'node:fs';
import { chromium } from 'playwright';

const cases = [
  { season: 2011, group: '71', matchId: '1884' },
  { season: 2011, group: '71', matchId: '1888' },
];
const variants = [
  (x) => `#5,${x.season},${x.group},1,8,,${x.matchId},1093,`,
  (x) => `#4,${x.season},${x.group},1,1,,${x.matchId},1093,`,
  (x) => `#6,${x.season},${x.group},1,1,,${x.matchId},1093,`,
  (x) => `#2,${x.season},${x.group},1,1,,${x.matchId},1093,`,
  (x) => `#5,${x.season},${x.group},1,1,,${x.matchId},1093,`,
];
fs.mkdirSync('results/legacy-route-probe', { recursive: true });
const browser = await chromium.launchPersistentContext('.browser-state', { headless: false });
const page = await browser.newPage();
const out = [];
for (const x of cases) for (const make of variants) {
  const fragment = make(x); const url = `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/${fragment}`;
  let rawText = ''; let error = null;
  try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); await page.waitForTimeout(1800); rawText = await page.locator('body').innerText(); } catch (e) { error = String(e); }
  const row = { ...x, url, matchIdFound: rawText.includes(x.matchId), resultFound: /^Resultat\b/m.test(rawText), rawText, error };
  out.push(row);
  fs.writeFileSync(`results/legacy-route-probe/${x.matchId}-${out.length}.json`, JSON.stringify(row, null, 2));
}
await browser.close();
fs.writeFileSync('results/legacy-route-probe.json', JSON.stringify(out, null, 2));
console.log(out.map((x) => ({ matchId: x.matchId, url: x.url, matchIdFound: x.matchIdFound, resultFound: x.resultFound })));
