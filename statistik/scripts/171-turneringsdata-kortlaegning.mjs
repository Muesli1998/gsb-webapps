import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve(import.meta.dirname, '..', '..');
const resultDir = path.join(root, 'statistik', 'results');
const sources = [
  path.join(resultDir, '154-raa-svar'),
  path.join(resultDir, '158-raa-svar'),
  path.join(resultDir, '158b-raa-svar'),
];

function filesUnder(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });
}

function decodeHtml(value = '') {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|aelig|oslash|aring|AElig|Oslash|Aring);/gi, (whole, ent) => {
    if (ent[0] === '#') {
      const code = ent[1].toLowerCase() === 'x' ? parseInt(ent.slice(2), 16) : Number(ent.slice(1));
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', aelig: 'æ', oslash: 'ø', aring: 'å', AElig: 'Æ', Oslash: 'Ø', Aring: 'Å' })[ent] ?? whole;
  });
}

function plain(html = '') {
  return decodeHtml(html.replace(/<br\s*\/?\s*>/gi, ' / ').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(['"])(.*?)\\1`, 'i'));
  return match?.[2] ?? '';
}

function parseProfile(file) {
  let raw;
  try { raw = zlib.gunzipSync(fs.readFileSync(file)).toString('utf8'); } catch { return null; }
  let payload;
  try { payload = JSON.parse(raw)?.d; } catch { return null; }
  const html = payload?.Html;
  if (typeof html !== 'string' || !html.includes('playerprofilerankingpointstable')) return null;
  const identity = {
    id: String(payload.playerid ?? ''),
    name: decodeHtml(payload.playername ?? ''),
    club: decodeHtml(payload.clubname ?? ''),
  };
  const table = html.match(/<table\b[^>]*class=['"][^'"]*playerprofilerankingpointstable[^'"]*['"][\s\S]*?<\/table>/i)?.[0];
  if (!table) return { identity, rows: [] };
  const rows = [];
  let inheritedDate = '';
  for (const tr of table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...tr[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
    if (cells.length < 3) continue;
    const dateRaw = plain(cells[0]);
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateRaw)) inheritedDate = dateRaw;
    const eventCell = cells[1];
    const link = eventCell.match(/<a\b[^>]*href\s*=\s*(['"])(.*?)\1[^>]*>([\s\S]*?)<\/a>/i);
    if (!link) continue;
    const href = decodeHtml(link[2]);
    const hash = href.indexOf('#');
    if (hash < 0) continue;
    const linkId = href.slice(hash + 1);
    const linkType = /VisResultater/i.test(href) ? 'VisResultater' : /HoldTurnering/i.test(href) ? 'HoldTurnering' : '';
    if (!linkType) continue;
    const playerCell = cells[2];
    const playerIds = [...playerCell.matchAll(/VisSpiller\/#(\d+)/gi)].map((m) => m[1]);
    rows.push({
      profileId: identity.id,
      profileName: identity.name,
      date: inheritedDate,
      dateRaw: dateRaw || null,
      linkId,
      linkType,
      name: plain(link[3]),
      linkedPlayerIds: [...new Set(playerIds)],
      playersText: plain(playerCell),
      source: path.relative(root, file).replaceAll('\\', '/'),
    });
  }
  return { identity, rows };
}

const parsed = [];
let gzipSeen = 0;
for (const dir of sources) {
  for (const file of filesUnder(dir).filter((f) => f.endsWith('.gz'))) {
    gzipSeen++;
    const profile = parseProfile(file);
    if (profile) parsed.push(profile);
  }
}

// Cache copies and season snapshots can repeat the same event row. Count each
// player's row once by its exact date, link, title and linked opponent IDs.
const dedup = new Map();
const identities = new Map();
for (const profile of parsed) {
  if (profile.identity.id) identities.set(profile.identity.id, profile.identity);
  for (const row of profile.rows) {
    const key = [row.profileId, row.date, row.linkType, row.linkId, row.name, row.linkedPlayerIds.join(',')].join('|');
    if (!dedup.has(key)) dedup.set(key, row);
  }
}

const aggregate = new Map();
for (const row of dedup.values()) {
  const key = `${row.linkType}|${row.linkId}`;
  if (!aggregate.has(key)) aggregate.set(key, { linkId: row.linkId, linkType: row.linkType, names: new Map(), dates: [], profiles: new Set(), rows: [], sources: new Set() });
  const item = aggregate.get(key);
  item.names.set(row.name, (item.names.get(row.name) ?? 0) + 1);
  if (row.date) item.dates.push(row.date);
  item.profiles.add(row.profileId);
  item.rows.push(row);
  item.sources.add(row.source.split('/')[2] ?? row.source);
}

const dateValue = (d) => {
  const [day, month, year] = (d || '').split('-').map(Number);
  return new Date(Date.UTC(year || 0, (month || 1) - 1, day || 1));
};
const records = [...aggregate.values()].map((x) => {
  const dates = [...new Set(x.dates)].sort((a, b) => dateValue(a) - dateValue(b));
  const counts = [...x.names.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'da'));
  return {
    linkId: x.linkId,
    linkType: x.linkType,
    name: counts[0]?.[0] ?? '',
    firstDate: dates[0] ?? '',
    lastDate: dates.at(-1) ?? '',
    profileCount: x.profiles.size,
    rowCount: x.rows.length,
    sources: [...x.sources].sort(),
    rows: x.rows,
  };
}).sort((a, b) => a.linkType.localeCompare(b.linkType) || dateValue(a.firstDate) - dateValue(b.firstDate) || a.linkId.localeCompare(b.linkId));

function walkJsonFiles(dir) {
  return filesUnder(dir).filter((f) => /\.(?:html|json|jsonl|txt)$/i.test(f));
}
const htmlFiles = [...new Set([
  path.join(resultDir, '149-raa-svar', '01-rangliste-page-redacted.html'),
  ...walkJsonFiles(resultDir).filter((f) => /\.html$/i.test(f)),
  ...sources.flatMap((dir) => filesUnder(dir).filter((f) => f.endsWith('.gz'))),
])].filter(fs.existsSync);
const scripts = new Map();
for (const file of htmlFiles) {
  let html;
  try {
    const bytes = fs.readFileSync(file);
    html = file.endsWith('.gz') ? zlib.gunzipSync(bytes).toString('utf8') : bytes.toString('utf8');
  } catch { continue; }
  for (const m of html.matchAll(/<script\b[^>]*\bsrc\s*=\s*(['"])(.*?)\1/gi)) {
    const src = decodeHtml(m[2]);
    if (!scripts.has(src)) scripts.set(src, new Set());
    scripts.get(src).add(path.relative(root, file).replaceAll('\\', '/'));
  }
}

const catalogPath = path.join(resultDir, '081-webservice-catalog-probe.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const methods = catalog.proxy.methods.filter((m) => /tournament|registration.*class/i.test(m.name));
const urls = methods.map((m) => ({
  method: m.name,
  url: `${catalog.service}${m.name}`,
  params: m.signature.split(',').map((p) => p.trim()).filter((p) => !/callbackcontextkey|succeededCallback|failedCallback|userContext/i.test(p)),
  signature: m.signature,
}));
const visIds = records.filter((r) => r.linkType === 'VisResultater').map((r) => r.linkId.replace(/,$/, '')).filter((x) => /^\d+$/.test(x)).map(Number);
const storedTournamentAnswerIds = ['17558', '115342', '115343', '115344', '115345', '490920', '490921', '490922', '490923', '490924'];
const storedMatchClassIds = ['115342']; // reproduce-tournament-matches.txt and 004-udtraeksvej.md
const visIdSet = new Set(visIds.map(String));

const outputs = {
  sourceGzipFiles: gzipSeen,
  parsedProfileResponses: parsed.length,
  uniqueProfileIds: identities.size,
  uniqueRowsAfterDedup: dedup.size,
  uniqueLinkCount: records.length,
  uniqueByType: Object.fromEntries(['VisResultater', 'HoldTurnering'].map((type) => [type, records.filter((r) => r.linkType === type).length])),
  uniqueByMonth: Object.fromEntries([...new Set([...dedup.values()].map((r) => r.date).filter(Boolean).map((d) => d.slice(3)))].sort().map((month) => [month, new Set([...dedup.values()].filter((r) => r.date.slice(3) === month).map((r) => `${r.linkType}|${r.linkId}`)).size])),
  visResultaterClassIdRange: { min: Math.min(...visIds), max: Math.max(...visIds) },
  overlapWithStoredTournamentAnswers: { storedTournamentAnswerIds, overlapIds: storedTournamentAnswerIds.filter((id) => visIdSet.has(id)), count: storedTournamentAnswerIds.filter((id) => visIdSet.has(id)).length },
  overlapWithStoredTournamentMatchAnswers: { storedMatchClassIds, overlapIds: storedMatchClassIds.filter((id) => visIdSet.has(id)), count: storedMatchClassIds.filter((id) => visIdSet.has(id)).length },
  records,
  gsbProfiles: [...identities.values()].filter((x) => /gladsaxe\s+s[øo]borg/i.test(x.club)),
  methods: urls,
  scripts: [...scripts.entries()].map(([src, seenIn]) => ({ src, seenIn: [...seenIn].sort() })).sort((a, b) => a.src.localeCompare(b.src)),
};

const jsonPath = path.join(resultDir, '171-turneringsdata-kortlaegning.json');
fs.writeFileSync(jsonPath, `${JSON.stringify(outputs, null, 2)}\n`, 'utf8');
const csvCell = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
const csv = [
  ['link-id', 'linktype', 'navn', 'første dato', 'sidste dato', 'antal profiler', 'antal rækker'].map(csvCell).join(','),
  ...records.map((r) => [r.linkId, r.linkType, r.name, r.firstDate, r.lastDate, r.profileCount, r.rowCount].map(csvCell).join(',')),
].join('\r\n') + '\r\n';
fs.writeFileSync(path.join(resultDir, '171-turneringer-fra-eventtabeller.csv'), `\uFEFF${csv}`, 'utf8');
console.log(JSON.stringify({
  gzipFiles: gzipSeen,
  profilesParsed: parsed.length,
  uniqueProfiles: identities.size,
  uniqueRows: dedup.size,
  links: outputs.uniqueLinkCount,
  byType: outputs.uniqueByType,
  gsbProfiles: outputs.gsbProfiles.length,
}, null, 2));
