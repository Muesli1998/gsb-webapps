import fs from 'node:fs';
import path from 'node:path';

const dirs = ['results/browser-fallback', 'results/browser-fallback-youth', 'results/browser-fallback-complete'];
const payloads = new Map();
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((x) => x.endsWith('.json') && !x.endsWith('.retry.json'))) {
    const full = path.join(dir, file); const o = JSON.parse(fs.readFileSync(full, 'utf8')); const id = String(o.matchId ?? o.external_match_id ?? '');
    if (!id || !o.rawText) continue;
    if (!payloads.has(id) || String(o.rawText).length > String(payloads.get(id).rawText).length) payloads.set(id, { id, source: dir, meta: o, rawText: o.rawText });
  }
}

const categoryRe = /^\d+\.\s*(?:MD|DS|HS|DD|HD|S|D)\s*$/i;
const goldenSetRe = /^Golden Set\s*$/i;
const scoreRe = /\b(\d{1,2})\s*[-–]\s*(\d{1,2})\b/g;
// Scores live in tab/NBSP-delimited result cells. Requiring that delimiter
// prevents date-like text in player names (for example `27/04-62`) from
// being mistaken for a set score.
const scoreLineRe = /(?:^|\t|\u00a0)\d{1,2}\s*[-–]\s*\d{1,2}(?=\t|\u00a0|$)/;
const scoreTokenRe = /^\d{1,2}\s*[-–]\s*\d{1,2}$/;
const resultField = (raw, label) => {
  const lines = raw.split(/\r?\n/); const index = lines.findIndex((x) => x.trim().startsWith(label));
  if (index < 0) return null; const same = lines[index].trim().slice(label.length).replace(/^[:\t ]+/, '').trim(); return same || (lines[index + 1] ?? '').trim() || null;
};
function parseCategories(raw) {
  const lines = raw.split(/\r?\n/); const starts = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (categoryRe.test(trimmed) || goldenSetRe.test(trimmed)) starts.push(i);
  }
  const categories = [];
  for (let s = 0; s < starts.length; s++) {
    const start = starts[s], end = starts[s + 1] ?? lines.findIndex((x, i) => i > start && /^Reserver\b/i.test(x.trim()));
    const block = lines.slice(start, end > start ? end : lines.length);
    const isGoldenSet = goldenSetRe.test(block[0].trim());
    const typeLine = isGoldenSet && /^(?:MD|DS|HS|DD|HD|S|D)$/i.test((block[1] ?? '').trim()) ? 1 : 0;
    const category = isGoldenSet ? `Golden Set${typeLine ? ` ${(block[1] ?? '').trim()}` : ''}` : block[0].trim();
    const scoreIndex = block.findIndex((x, i) => i > 0 && scoreLineRe.test(x));
    const pre = scoreIndex >= 0 ? block.slice(1 + typeLine, scoreIndex) : block.slice(1 + typeLine);
    const separator = pre.findIndex((x) => /^\s*$/.test(x));
    const split = separator >= 0 ? separator : Math.ceil(pre.length / 2);
    const homePlayers = pre.slice(0, split).map((x) => x.trim()).filter(Boolean);
    const awayPlayers = pre.slice(separator >= 0 ? separator + 1 : split).map((x) => x.trim()).filter(Boolean);
    const scoreLine = scoreIndex >= 0 ? block[scoreIndex] : '';
    scoreRe.lastIndex = 0; const sets = [...scoreLine.matchAll(scoreRe)].map((m) => ({ home: Number(m[1]), away: Number(m[2]) }));
    const lineTokens = scoreLine.split(/\t+/).map((x) => x.replace(/\u00a0/g, ' ').trim()).filter(Boolean);
    const resultMarkerRaw = lineTokens.filter((x) => !scoreTokenRe.test(x)).join(' | ') || null;
    const zeroScore = sets.length > 0 && sets.every((x) => x.home === 0 && x.away === 0);
    categories.push({ category, homePlayers, awayPlayers, sets, hasScore: sets.length > 0, zeroScore, resultMarkerRaw });
  }
  return categories;
}

function parse(raw) {
  const categories = parseCategories(raw);
  const result = resultField(raw, 'Resultat'); const points = resultField(raw, 'Point');
  const home = resultField(raw, 'Hjemmehold'); const away = resultField(raw, 'Udehold'); const remark = resultField(raw, 'Bemærkning');
  const explicitNoPlay = /Afgjort uden kamp|Ikke fremmødt/i.test(raw);
  const categoryWithScore = categories.filter((x) => x.hasScore).length;
  const playerCount = categories.reduce((n, x) => n + x.homePlayers.length + x.awayPlayers.length, 0);
  return { result, points, home, away, remark, categories, categoryCount: categories.length, categoryWithScore, playerCount, explicitNoPlay };
}

const parsed = [...payloads.values()].map((p) => ({ id: p.id, source: p.source, ...parse(p.rawText) }));
const report = {
  generatedAt: new Date().toISOString(),
  payloads: payloads.size,
  parsed: parsed.length,
  withResult: parsed.filter((x) => x.result && x.result !== '-').length,
  withCategories: parsed.filter((x) => x.categoryCount > 0).length,
  withScoredCategories: parsed.filter((x) => x.categoryWithScore > 0).length,
  withPlayers: parsed.filter((x) => x.playerCount > 0).length,
  explicitNoPlay: parsed.filter((x) => x.explicitNoPlay).length,
  noResultButCategories: parsed.filter((x) => (!x.result || x.result === '-') && x.categoryCount > 0).length,
  noResultNoCategories: parsed.filter((x) => (!x.result || x.result === '-') && x.categoryCount === 0).length,
  zeroScoreCategories: parsed.reduce((n, x) => n + x.categories.filter((c) => c.zeroScore).length, 0),
  markedCategories: parsed.reduce((n, x) => n + x.categories.filter((c) => c.resultMarkerRaw).length, 0),
  goldenSetCategories: parsed.reduce((n, x) => n + x.categories.filter((c) => c.category.startsWith('Golden Set')).length, 0),
  rows: parsed
};
fs.writeFileSync('results/browser-individual-parse-report.json', JSON.stringify(report, null, 2));
let md = `# Browser-individuelparser – dækningsaudit\n\nGenereret: ${report.generatedAt}\n\n- Unikke payloads: **${report.payloads}**\n- Med holdresultat: **${report.withResult}**\n- Med kategorisektioner: **${report.withCategories}**\n- Med mindst én scoret kategori: **${report.withScoredCategories}**\n- Med mindst ét spillerfelt: **${report.withPlayers}**\n- Med eksplicit no-play-/walkovertekst: **${report.explicitNoPlay}**\n- No-result men kategorier: **${report.noResultButCategories}**\n- No-result uden kategorier: **${report.noResultNoCategories}**\n\n`;
md += `Parseren arbejder kun på gemt dynamisk browsertekst. Den bruger kategorioverskrifter, blank/tab-separatoren mellem hjemme- og udeholdets spillere og scorelinjer efter kategorien. En kategori uden scores bevares som spilleropstilling uden kampresultat. Rapporten er en dry-run; ingen SQLite-rækker ændres.\n`;
md += `\n- Kategorier med 0-0-sæt: **${report.zeroScoreCategories}**\n- Kategorier med rå resultatmarkør (fx K/V/G/D): **${report.markedCategories}**\n- Golden Set-kategorier: **${report.goldenSetCategories}**\n`;
fs.writeFileSync('results/browser-individual-parse-report.md', md);
console.log(JSON.stringify({ payloads: report.payloads, withResult: report.withResult, withCategories: report.withCategories, withScoredCategories: report.withScoredCategories, withPlayers: report.withPlayers, explicitNoPlay: report.explicitNoPlay, noResultButCategories: report.noResultButCategories, noResultNoCategories: report.noResultNoCategories, zeroScoreCategories: report.zeroScoreCategories, markedCategories: report.markedCategories, goldenSetCategories: report.goldenSetCategories }, null, 2));
