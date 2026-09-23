import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('statistik/data/liga-landskab.db', { readOnly: true });
const all = (sql) => db.prepare(sql).all();
const norm = (value) => String(value ?? '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
const canonical = (value) => norm(value).replace(/[.]+/g, '').replace(/\b(bk|b\.k\.)\b/g, 'bk');
const suffix = (value) => { const m = String(value ?? '').match(/(?:^|\s)(\d+)$/); return m ? Number(m[1]) : null; };

const majorLevels = ['Badmintonligaen', '1. division', '2. division', '3. division', 'Danmarksserien'];
const excludedLocal = /(slutspil|nedrykning|oprykning|kvalifikation|spilletid|oversidder|runde)/i;
function classify(raw) {
  const x = norm(raw);
  if (x.includes('badmintonligaen')) return 'Badmintonligaen';
  for (const n of [1, 2, 3]) if (new RegExp(`(^|\\s)${n}\\.?\\s*division`).test(x)) return `${n}. division`;
  if (x.includes('danmarksserien')) return 'Danmarksserien';
  if (excludedLocal.test(x)) return null;
  if (/kredsserien|kredsserie|sjællandsserien|københavnsserien|jyllandsserien|fynsserien|bornholmsserien|lf[- ]?serien/i.test(x)) return 'regional-local';
  return null;
}

const groups = all('select season_id, age_group_id, league_group_id, division_name_raw from league_groups');
const teamRows = all('select season_id, age_group_id, league_group_id, team_name_raw from league_group_teams');
const groupLevel = new Map();
for (const g of groups) {
  if (Number(g.age_group_id) !== 1) continue;
  const level = classify(g.division_name_raw);
  if (level) groupLevel.set(`${g.season_id}|${g.league_group_id}`, level);
}
const teamsBy = new Map();
for (const t of teamRows) {
  if (Number(t.age_group_id) !== 1) continue;
  const level = groupLevel.get(`${t.season_id}|${t.league_group_id}`);
  if (!level) continue;
  const row = {
    season: Number(t.season_id), level, raw: t.team_name_raw,
    club: canonical(t.team_name_raw), suffix: suffix(t.team_name_raw),
    group: String(t.league_group_id)
  };
  const key = `${row.season}|${level}`;
  if (!teamsBy.has(key)) teamsBy.set(key, []);
  teamsBy.get(key).push(row);
}
for (const [key, rows] of teamsBy) {
  const seen = new Set();
  teamsBy.set(key, rows.filter((r) => {
    // Index/detail snapshots can expose the same team through more than one
    // pulje page. For the cross-season identity graph the stable node is
    // season + level + canonical club + numeric holdnummer; group is not part
    // of the identity and would create duplicate chains.
    const k = `${r.club}|${r.suffix ?? ''}`;
    if (seen.has(k)) return false;
    seen.add(k); return true;
  }));
}
const years = [...new Set([...teamsBy.values()].flat().map((x) => x.season))].sort((a, b) => a - b);
const levelOrder = [...majorLevels, 'regional-local'];
const candidates = (season, level, club) => (teamsBy.get(`${season}|${level}`) ?? []).filter((x) => x.club === club);

const edges = [];
const ambiguities = [];
const edgeBySource = new Map();
const successByPair = {};
for (let i = 0; i < years.length - 1; i++) {
  const fromSeason = years[i], toSeason = years[i + 1];
  for (let li = 0; li < levelOrder.length - 1; li++) {
    const sourceLevel = levelOrder[li];
    const nextLevel = levelOrder[li + 1];
    const sources = teamsBy.get(`${fromSeason}|${sourceLevel}`) ?? [];
    const stats = successByPair[`${sourceLevel}->${nextLevel}`] ??= { attempted: 0, sameLevel: 0, forcedDown: 0, noMatch: 0, ambiguous: 0 };
    for (const source of sources) {
      const sourceKey = `${fromSeason}|${sourceLevel}|${source.group}|${source.raw}`;
      const same = candidates(toSeason, sourceLevel, source.club);
      let chosen = null, type = null;
      if (same.length === 1) { chosen = same[0]; type = 'same_level'; stats.sameLevel++; }
      else if (same.length > 1) { stats.ambiguous++; ambiguities.push({ fromSeason, toSeason, sourceLevel, source, candidateLevel: sourceLevel, candidates: same }); }
      else {
        const lower = candidates(toSeason, nextLevel, source.club);
        if (lower.length === 1) { chosen = lower[0]; type = 'forced_down'; stats.forcedDown++; }
        else if (lower.length > 1) { stats.ambiguous++; ambiguities.push({ fromSeason, toSeason, sourceLevel, source, candidateLevel: nextLevel, candidates: lower }); }
        else stats.noMatch++;
      }
      stats.attempted++;
      if (chosen) {
        const edge = { fromSeason, toSeason, sourceLevel, targetLevel: chosen.level, type, source, target: chosen };
        edges.push(edge); edgeBySource.set(sourceKey, edge);
      }
    }
  }
}

// A chain starts at a Ligaen team-season and follows unique edges forward.
// We report only chains with at least one forced downward transition, plus all starts.
const chains = [];
for (const season of years.slice(0, -1)) {
    for (const start of teamsBy.get(`${season}|Badmintonligaen`) ?? []) {
    const path = [{ season, level: start.level, raw: start.raw, group: start.group }];
    let current = start, currentSeason = season;
    let forcedDownCount = 0;
    const seen = new Set();
    while (currentSeason < years.at(-1)) {
      const key = `${currentSeason}|${current.level}|${current.group}|${current.raw}`;
      if (seen.has(key)) break;
      seen.add(key);
      const edge = edgeBySource.get(key);
      if (!edge) break;
      current = edge.target; currentSeason = edge.toSeason;
      if (edge.type === 'forced_down') forcedDownCount++;
      path.push({ season: currentSeason, level: current.level, raw: current.raw, group: current.group, transition: edge.type });
    }
    chains.push({ startSeason: season, start: start.raw, path, forcedDownCount, completeToLowest: path.at(-1)?.level === 'Danmarksserien' || path.at(-1)?.level === 'regional-local' });
  }
}
const chainsWithDownward = chains.filter((x) => x.forcedDownCount > 0);
const uniqueChainSignatures = new Set(chainsWithDownward.map((x) => x.path.map((p) => `${p.season}:${p.level}:${p.raw}`).join('>')));
const round2 = JSON.parse(fs.readFileSync('statistik/results/087-holdidentitet-paa-tvaers-af-saesoner.json', 'utf8'));
const unresolvedRound2 = round2.rows.filter((x) => !x.wholeHierarchyCanonical?.found);
const cascadeTargetMatches = unresolvedRound2.filter((row) => edges.some((edge) => edge.type === 'forced_down' && edge.toSeason === Number(row.seasonTo) && edge.targetLevel === row.level && edge.target.club === canonical(row.club)));
const result = {
  generatedAt: new Date().toISOString(),
  scope: { ageGroupId: 1, seasons: years, levels: levelOrder, source: 'liga-landskab.db', databaseWrite: false },
  transitionStats: successByPair,
  chains: { starts: chains.length, uniqueForcedDownChains: uniqueChainSignatures.size, reachingDanmarksserienOrLocal: chains.filter((x) => x.completeToLowest).length, records: chains },
  ambiguities: { count: ambiguities.length, examples: ambiguities.slice(0, 100) },
  comparison: { round2WholeHierarchyCanonicalTraces: 68, round2StillNoWholeHierarchyCanonical: unresolvedRound2.length, resolvedByRound3Cascade: cascadeTargetMatches.length, note: 'En runde-2-række tælles som ramt, når en entydig tvungen overgang ender i samme sæson, niveau og canonicaliserede klub.' }
};
const outPath = 'statistik/results/087-round3-cascade.json';
fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n');
const statLines = Object.entries(successByPair).map(([k, v]) => `| ${k} | ${v.attempted} | ${v.sameLevel} | ${v.forcedDown} | ${(100 * v.forcedDown / v.attempted).toFixed(2)}% | ${v.ambiguous} | ${v.noMatch} |`).join('\n');
const md = `# Opgave 087 — Metode A-kaskade, runde 3\n\nGenereret: ${result.generatedAt}\n\nKørsel på age_group_id=1 fra den read-only \`liga-landskab.db\`. En overgang bruger først entydigt canonicaliseret match på samme niveau; hvis der ikke findes et sådant match, forsøges entydigt match på næste niveau ned. Flere kandidater markeres som flertydige og bruges ikke som tvunget identitet.\n\n## Niveau-for-niveau\n\n| Niveaupar | Forsøg | Samme niveau | Tvang nedad | Tvang nedad / forsøg | Flertydige | Intet entydigt match |\n|---|---:|---:|---:|---:|---:|---:|\n${statLines}\n\n## Kæder\n\n- Liga-startpunkter: **${chains.length}**\n- Unikke kæder med mindst én tvungen nedadgående overgang: **${uniqueChainSignatures.size}**\n- Kæder der nåede Danmarksserien eller regional-local: **${chains.filter((x) => x.completeToLowest).length}**\n- Flertydige overgange: **${ambiguities.length}**\n- Rå kæder og flertydige eksempler findes i \`087-round3-cascade.json\`.\n\n## Sammenligning med runde 2\n\nRunde 2 fandt 68 ekstra hele-hierarki-canonical-spor og ${unresolvedRound2.length} rækker uden sådant match. Den fulde kaskade rammer ${cascadeTargetMatches.length} af disse på samme sæson, niveau og canonicaliserede klub; tallet er et overlapstal, ikke en påstand om at alle identiteter er bevist.\n\nIngen database blev ændret, og der blev ikke foretaget API-kald.\n`;
fs.writeFileSync('statistik/results/087-round3-cascade.md', md);
console.log(JSON.stringify({starts: chains.length, uniqueForcedDownChains: uniqueChainSignatures.size, reachingLowest: chains.filter((x) => x.completeToLowest).length, ambiguities: ambiguities.length, transitionStats: successByPair}, null, 2));
