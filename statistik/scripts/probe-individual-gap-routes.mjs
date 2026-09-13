import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { chromium } from 'playwright';

const db = new DatabaseSync('data/gsb-statistik-normalized.db');
const candidates = db.prepare(`SELECT tm.season_id, tm.external_match_id, c.league_group_id
  FROM team_matches tm JOIN competitions c ON c.competition_id = tm.competition_id
  LEFT JOIN individual_matches im ON im.team_match_id = tm.team_match_id
  WHERE trim(COALESCE(tm.result_raw,''))<>'' AND trim(tm.result_raw)<>'-' AND im.individual_match_id IS NULL
  GROUP BY tm.team_match_id ORDER BY tm.season_id, tm.external_match_id`).all();
db.close();
const picked = [];
for (const season of [...new Set(candidates.map((x) => x.season_id))]) picked.push(candidates.find((x) => x.season_id === season));
for (const id of ['1636', '340495']) { const x = candidates.find((r) => String(r.external_match_id) === id); if (x && !picked.some((r) => String(r.external_match_id) === id)) picked.push(x); }
const variants = [
  (x) => `#5,${x.season_id},${x.league_group_id},1,8,,${x.external_match_id},1093,`,
  (x) => `#5,${x.season_id},${x.league_group_id},1,1,,${x.external_match_id},1093,`,
  (x) => `#4,${x.season_id},${x.league_group_id},1,1,,${x.external_match_id},1093,`,
  (x) => `#6,${x.season_id},${x.league_group_id},1,1,,${x.external_match_id},1093,`,
  (x) => `#2,${x.season_id},${x.league_group_id},1,1,,${x.external_match_id},1093,`
];
let browser;
try { browser = await chromium.launchPersistentContext('.browser-state', { headless: false }); }
catch (e) {
  const report = { generatedAt: new Date().toISOString(), sampledMatches: picked, variants: variants.length, rows: [], launchError: String(e) };
  fs.writeFileSync('results/individual-gap-route-probe.json', JSON.stringify(report, null, 2));
  fs.writeFileSync('results/individual-gap-route-probe.md', `# Ruteprøve for manglende individuelle data\n\nBrowseren kunne ikke startes i denne kørsel: ${String(e).replace(/\r?\n/g, ' ')}\n\nIngen databaseændring blev foretaget.\n`);
  console.log(JSON.stringify({ sampledMatches: picked.map((x) => x.external_match_id), attempts: 0, withCategories: 0, launchError: String(e) }, null, 2));
  process.exit(0);
}
const page = await browser.newPage(); const rows = [];
for (const x of picked) for (const make of variants) {
  const url = `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/${make(x)}`; let rawText = '', error = null;
  try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); await page.waitForTimeout(2200); rawText = await page.locator('body').innerText(); } catch (e) { error = String(e); }
  rows.push({ ...x, url, matchIdFound: rawText.includes(String(x.external_match_id)), resultFound: /^Resultat\b/m.test(rawText), categoryCount: (rawText.match(/^\d+\.\s*(?:MD|DS|HS|DD|HD|S|D)\s*$/gim) ?? []).length, hasIndividualMarkers: /Vinder W\.O\.|\bGolden Set\b/i.test(rawText), error });
}
await browser.close();
const report = { generatedAt: new Date().toISOString(), sampledMatches: picked, variants: variants.length, rows, detailByMatch: Object.fromEntries(picked.map((x) => [x.external_match_id, rows.filter((r) => r.external_match_id === x.external_match_id)])) };
fs.writeFileSync('results/individual-gap-route-probe.json', JSON.stringify(report, null, 2));
fs.writeFileSync('results/individual-gap-route-probe.md', `# Ruteprøve for manglende individuelle data\n\n- Prøvekampe: **${picked.length}**\n- Rutevarianter pr. kamp: **${variants.length}**\n- Fund med kategorisektioner: **${rows.filter((x) => x.categoryCount > 0).length}** af ${rows.length}\n- Fejl: **${rows.filter((x) => x.error).length}**\n\nAlle ruter blev ventet på dynamisk rendering. Rapporten ændrer ikke databasen.\n`);
console.log(JSON.stringify({ sampledMatches: picked.map((x) => x.external_match_id), attempts: rows.length, withCategories: rows.filter((x) => x.categoryCount > 0).length, errors: rows.filter((x) => x.error).length }, null, 2));
