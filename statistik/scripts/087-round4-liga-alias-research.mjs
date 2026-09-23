import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('statistik/data/liga-landskab.db', { readOnly: true });
const norm = (value) => String(value ?? '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
// `textualKey` reproduces runde 3's strict textual matching exactly.
// `clubCanonical` is deliberately broader and only shown to Chris as context
// for a possible later club-level alias table; it is never used to auto-match.
const textualKey = (value) => norm(value)
  .replace(/[.]+/g, '')
  .replace(/\b(bk|b\.k\.)\b/g, 'bk');
const clubCanonical = (value) => norm(value)
  .replace(/\s+\([^)]*\)/g, '')
  .replace(/\s+(?:\d+|[a-z])$/i, '')
  .replace(/[.]+/g, '')
  .replace(/\b(bk|b\.k\.)\b/g, 'bk');
const level = (raw) => {
  const x = norm(raw);
  if (x.includes('badmintonligaen')) return 'Badmintonligaen';
  if (/(^|\s)1\.?\s*division/.test(x)) return '1. division';
  return null;
};
const tokenSimilarity = (a, b) => {
  const left = new Set(clubCanonical(a).split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  const right = new Set(clubCanonical(b).split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  const intersection = [...left].filter((x) => right.has(x)).length;
  return left.size + right.size ? intersection / (left.size + right.size - intersection) : 0;
};

const groups = db.prepare('select season_id, age_group_id, league_group_id, division_name_raw from league_groups').all();
const teams = db.prepare('select season_id, age_group_id, league_group_id, team_name_raw from league_group_teams').all();
const groupLevel = new Map();
for (const row of groups) {
  if (Number(row.age_group_id) !== 1) continue;
  const classified = level(row.division_name_raw);
  if (classified) groupLevel.set(`${row.season_id}|${row.league_group_id}`, classified);
}
const bySeasonLevel = new Map();
for (const row of teams) {
  if (Number(row.age_group_id) !== 1) continue;
  const classified = groupLevel.get(`${row.season_id}|${row.league_group_id}`);
  if (!classified) continue;
  const entry = { season: Number(row.season_id), raw: row.team_name_raw, textualKey: textualKey(row.team_name_raw), clubCanonical: clubCanonical(row.team_name_raw), group: String(row.league_group_id) };
  const key = `${entry.season}|${classified}`;
  if (!bySeasonLevel.has(key)) bySeasonLevel.set(key, []);
  bySeasonLevel.get(key).push(entry);
}
for (const [key, rows] of bySeasonLevel) {
  const seen = new Set();
  bySeasonLevel.set(key, rows.filter((row) => {
    const node = row.textualKey;
    if (seen.has(node)) return false;
    seen.add(node);
    return true;
  }));
}
const get = (season, namedLevel) => bySeasonLevel.get(`${season}|${namedLevel}`) ?? [];
const seasons = [...new Set([...bySeasonLevel.values()].flat().map((x) => x.season))].sort((a, b) => a - b);

const overview = seasons.map((season) => ({ season, teams: get(season, 'Badmintonligaen').map((x) => x.raw).sort((a, b) => a.localeCompare(b, 'da')) }));
const transitions = [];
for (const season of seasons.slice(0, -1)) {
  const liga = get(season, 'Badmintonligaen');
  const nextLiga = get(season + 1, 'Badmintonligaen');
  const firstDivision = get(season + 1, '1. division');
  for (const current of liga) {
    const sameLevel = nextLiga.filter((x) => x.textualKey === current.textualKey);
    const firstDivisionMatches = firstDivision.filter((x) => x.textualKey === current.textualKey);
    const nearCandidates = firstDivision
      .map((x) => ({ name: x.raw, score: Number(tokenSimilarity(current.raw, x.raw).toFixed(2)) }))
      .filter((x) => x.score > 0 && !firstDivisionMatches.some((match) => match.raw === x.name))
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'da'))
      .slice(0, 3);
    transitions.push({
      seasonFrom: season,
      seasonTo: season + 1,
      ligaTeam: current.raw,
      runde3TextualKey: current.textualKey,
      clubCanonical: current.clubCanonical,
      classification: sameLevel.length === 1 ? 'fortsætter_i_Ligaen' : firstDivisionMatches.length === 1 ? 'entydig_1_division' : sameLevel.length > 1 || firstDivisionMatches.length > 1 ? 'flertydig' : 'ingen_tekstlig_efterfølger',
      sameLevel: sameLevel.map((x) => x.raw),
      firstDivisionMatches: firstDivisionMatches.map((x) => x.raw),
      nearCandidates,
      allFirstDivisionTeams: firstDivision.map((x) => x.raw).sort((a, b) => a.localeCompare(b, 'da'))
    });
  }
}
const counts = Object.fromEntries(Object.entries(Object.groupBy(transitions, (x) => x.classification)).map(([key, rows]) => [key, rows.length]));
const output = { generatedAt: new Date().toISOString(), scope: { ageGroupId: 1, seasons, databaseWrite: false }, overview, transitionCounts: counts, transitions };
fs.writeFileSync('statistik/results/087-round4-liga-navne.json', JSON.stringify(output, null, 2) + '\n');

const compactOverview = overview.map(({ season, teams }) => `| ${season}/${String(season + 1).slice(-2)} | ${teams.join(', ')} |`).join('\n');
const grouped = Object.groupBy(transitions, (x) => `${x.seasonFrom}/${String(x.seasonTo).slice(-2)}`);
const transitionMd = Object.entries(grouped).map(([season, rows]) => {
  const firstDivision = rows[0].allFirstDivisionTeams.join(', ');
  const items = rows.map((x) => `- ${x.ligaTeam}: ${x.classification}; Ligaen næste sæson: ${x.sameLevel.join(', ') || '—'}; 1. div-match: ${x.firstDivisionMatches.join(', ') || '—'}; tekstligt nærmeste øvrige 1. div-navne: ${x.nearCandidates.map((n) => `${n.name} (${n.score})`).join(', ') || '—'}`).join('\n');
  return `### ${season}\n\n**Alle reelle 1. divisionshold i ${season}:** ${firstDivision || 'ingen gemte'}\n\n${items}`;
}).join('\n\n');
const md = `# Opgave 087 — runde 4: Liga-navne og alias-forberedelse\n\nGenereret: ${output.generatedAt}\n\nDette er kun forberedelse til manuel alias-bekræftelse. Ingen aliaser er oprettet, og ingen database er ændret. \`tekstligt nærmeste\` er kun token-overlap og er **ikke** en identitetsvurdering.\n\n## Badmintonligaen sæson for sæson\n\n| Sæson | Holdnavne |\n|---|---|\n${compactOverview}\n\n## Ligaen → 1. division: alle overgange\n\n| Klassifikation | Antal |\n|---|---:|\n${Object.entries(counts).map(([k, v]) => `| ${k} | ${v} |`).join('\n')}\n\nDe ${counts.ingen_tekstlig_efterfølger ?? 0} \`ingen_tekstlig_efterfølger\` er de relevante mulige navneskift/fusioner. Runde 3's rå 57-tal indeholdt to ekstra 2020-noder, fordi en afsluttende punktumvariant af semifinalefelterne blev behandlet som et særskilt hold. Denne visningsrapport samler hver sådan placeholder. De resterende ikke-nedadgående overgange er vist for fuld sporbarhed, men omfatter hold der fortsætter i Ligaen.\n\n${transitionMd}\n`;
fs.writeFileSync('statistik/results/087-round4-liga-navne.md', md);
console.log(JSON.stringify({ seasons: overview.length, counts, noTextualSuccessor: counts.ingen_tekstlig_efterfølger ?? 0 }, null, 2));
