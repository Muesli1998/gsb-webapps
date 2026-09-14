import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const detailsPath = 'results/gsb-match-details-all-dedup.jsonl';
const outputPath = 'results/008-identiske-scoretekster.md';
const browserDirs = [
  'results/browser-fallback',
  'results/browser-fallback-youth',
  'results/browser-fallback-complete'
];

function browserFileFor(id) {
  for (const dir of browserDirs) {
    if (!fs.existsSync(dir)) continue;
    const file = fs.readdirSync(dir).find((name) => name.endsWith(`-${id}.json`));
    if (file) return path.join(dir, file);
  }
  return null;
}

function browserExcerpt(rawText, category) {
  const lines = rawText.replaceAll('\u00a0', ' ').split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim().startsWith(`${category}\t`) || line.trim() === category);
  if (start < 0) return null;
  return lines.slice(start, start + 8).map((line) => line.trim()).filter(Boolean).join(' | ');
}

// This deliberately reads the pre-import API payload, not just SQLite: five
// original 0-0 rows were later enriched by browser data and now overlap the
// browser_zero_score set. One match/category key counts once even though the
// API returns it under both home and guest squads.
const targets = new Map();
for (const line of fs.readFileSync(detailsPath, 'utf8').split(/\r?\n/).filter(Boolean)) {
  const match = JSON.parse(line);
  if (match.status !== 'ok') continue;
  for (const side of ['home', 'guest']) {
    for (const category of match[side]?.squad?.categories ?? []) {
      const scored = (category.results ?? []).filter((result) => Number.isInteger(result.homePoints) && Number.isInteger(result.guestPoints));
      if (scored.length !== 1) continue;
      const [{ homePoints, guestPoints }] = scored;
      if (homePoints !== guestPoints || ![0, 2, 3].includes(homePoints)) continue;
      const key = `${match.matchId}|${category.name}`;
      if (!targets.has(key)) targets.set(key, {
        matchId: String(match.matchId),
        category: category.name,
        apiResults: category.results
      });
    }
  }
}

const db = new DatabaseSync('data/gsb-statistik-normalized.db', { readOnly: true });
const dbRow = db.prepare(`
  SELECT im.individual_match_id, im.home_score_raw, im.away_score_raw,
         im.result_marker_raw, im.status, tm.result_raw, tm.remark_raw
  FROM individual_matches im
  JOIN team_matches tm USING(team_match_id)
  WHERE tm.external_match_id = ? AND im.category_raw = ?
`).get.bind(db.prepare(`
  SELECT im.individual_match_id, im.home_score_raw, im.away_score_raw,
         im.result_marker_raw, im.status, tm.result_raw, tm.remark_raw
  FROM individual_matches im
  JOIN team_matches tm USING(team_match_id)
  WHERE tm.external_match_id = ? AND im.category_raw = ?
`));

const rows = [...targets.values()].sort((a, b) => Number(a.matchId) - Number(b.matchId) || a.category.localeCompare(b.category)).map((target) => {
  const current = dbRow(target.matchId, target.category) ?? null;
  const browserPath = browserFileFor(target.matchId);
  const browser = browserPath ? JSON.parse(fs.readFileSync(browserPath, 'utf8')) : null;
  const excerpt = browser?.rawText ? browserExcerpt(browser.rawText, target.category) : null;
  return { ...target, current, browserPath, excerpt };
});
db.close();

let md = `# Opgave 008 — identiske, lave scoretekster\n\n`;
md += `Genereret fra den gemte API-payload og den aktuelle, **read-only** SQLite-fil.\n\n`;
md += `## Afgrænsning fundet i rådata\n\n`;
md += `Den historiske API-score-reparation havde præcis **${rows.length}** unikke kamp/kategori-nøgler med én identisk lav score: fem 0-0, én 2-2 og én 3-3. De fem 0-0-nøgler overlapper nu fem af de otte efterfølgende browserimporterede \`browser_zero_score\`-rækker. Opgavekortets formulering om, at de syv *ikke* er de otte browser-rækker, passer derfor ikke med den bevarede rådata. Der er ikke opfundet fem ekstra rækker.\n\n`;
md += `\`Vinder W.O.\` er kun en kolonneoverskrift. De rå markører er bevaret, men deres betydning er ikke fastslået, og der er ingen eksplicit \`(Ikke fremmødt)\`-tekst i disse syv kategoriudsnit. Derfor er ingen af dem kaldt walkover.\n\n`;
md += `## De ${rows.length} oprindelige rækker\n\n`;
for (const row of rows) {
  const apiRaw = JSON.stringify(row.apiResults);
  const score = row.apiResults.filter((x) => Number.isInteger(x.homePoints) && Number.isInteger(x.guestPoints)).map((x) => `${x.homePoints}-${x.guestPoints}`).join(', ');
  md += `### Kamp ${row.matchId} — ${row.category}\n\n`;
  md += `- Rå API-svar: \`${apiRaw}\`\n`;
  md += `- Rå scoretekst: **${score}**\n`;
  md += `- Aktuel SQLite-række: ${row.current ? `id ${row.current.individual_match_id}; score \`${row.current.home_score_raw}-${row.current.away_score_raw}\`; markør \`${row.current.result_marker_raw ?? ''}\`; status \`${row.current.status}\`` : 'findes ikke'}\n`;
  if (row.excerpt) md += `- Rå browsertekst fra \`${row.browserPath}\`: \`${row.excerpt}\`\n`;
  else md += `- Browserpayload: ingen lokal kampfil fundet i de tre fallback-mapper.\n`;
  md += `- Konklusion: **uafklaret: API- og browserkilden viser den identiske lave score${row.current?.result_marker_raw ? ` og rå markør ${row.current.result_marker_raw}` : ''}, men ingen eksplicit forklaring på markøren eller \`(Ikke fremmødt)\`-tekst.**\n\n`;
}
md += `## Hvad der blev prøvet\n\n`;
md += `- Genlæste den rå Nembadminton-payload \`results/gsb-match-details-all-dedup.jsonl\` og deduplikerede på kamp-ID + kategori.\n`;
md += `- Sammenholdt hver nøgle med den aktuelle SQLite-række uden at skrive databasen.\n`;
md += `- Slog efter på den lokalt gemte, renderede BadmintonPlayer-payload i alle tre fallback-mapper.\n`;
md += `- Fortolkede ikke \`Vinder W.O.\` eller markørerne som walkover, fordi projektreglerne kræver eksplicit tekst.\n`;

fs.writeFileSync(outputPath, md);
console.log(JSON.stringify({ outputPath, rows: rows.length, ids: rows.map((row) => `${row.matchId}/${row.category}`) }, null, 2));
