import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const dbPath = path.resolve('statistik/data/liga-landskab.db');
const normalizedDbPath = path.resolve('statistik/data/gsb-statistik-normalized.db');
const jsonPath = path.resolve('statistik/results/127-gsb-ungdom-holdnavne-audit.json');
const mdPath = path.resolve('statistik/results/127-gsb-ungdom-holdnavne-audit.md');
const youthAgeIds = [2, 3, 4, 5, 6, 7, 18];
const candidatePattern = /gladsaxe|søborg|soborg|soeborg|bc\s*37/iu;
const similarPattern = /søborg|soborg|soeborg/iu;

function snapshot(filePath) {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
  const db = new DatabaseSync(filePath, { readOnly: true });
  const tableNames = db.prepare(`
    SELECT name FROM sqlite_master
    WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `).all().map((row) => row.name);
  const rowCounts = Object.fromEntries(tableNames.map((name) => {
    const quoted = `"${name.replaceAll('"', '""')}"`;
    return [name, db.prepare(`SELECT COUNT(*) AS count FROM ${quoted}`).get().count];
  }));
  db.close();
  return { sha256: hash, row_counts: rowCounts };
}

const before = {
  liga_landscape: snapshot(dbPath),
  normalized: snapshot(normalizedDbPath),
};

const db = new DatabaseSync(dbPath, { readOnly: true });
const tableColumns = (table) => db.prepare(`PRAGMA table_info("${table}")`).all().map((row) => row.name);
const registryColumns = tableColumns('club_registry');
const teamColumns = tableColumns('league_group_teams');
const registryHasClubId = registryColumns.includes('club_id');
const teamHasClubId = teamColumns.includes('club_id');
const registryHasTeamId = registryColumns.includes('league_group_team_id');
const teamHasRegistryId = teamColumns.includes('club_registry_id') || teamColumns.includes('club_id');
const foreignKeys = db.prepare('PRAGMA foreign_key_list(league_group_teams)').all();

const registryRows = db.prepare('SELECT * FROM club_registry ORDER BY club_name_raw').all();
const registryVariants = registryRows
  .filter((row) => candidatePattern.test(row.club_name_raw))
  .map((row) => ({
    club_id: row.club_id,
    club_name_raw: row.club_name_raw,
    region_id: row.region_id,
    postal_code: row.postal_code,
    classification: /gladsaxe/iu.test(row.club_name_raw) ? 'GSB-navnekandidat' : 'tvetydig-lignende-klub',
  }));

const youthRows = db.prepare(`
  SELECT g.season_id, g.age_group_id, g.league_group_id,
         t.league_group_team_id, t.team_name_raw
  FROM league_groups g
  JOIN league_group_teams t
    ON t.season_id = g.season_id
   AND t.age_group_id = g.age_group_id
   AND t.league_group_id = g.league_group_id
  WHERE g.age_group_id IN (${youthAgeIds.join(', ')})
  ORDER BY g.age_group_id, g.season_id, g.league_group_id, t.team_name_raw
`).all();
db.close();

const matchingRows = youthRows.filter((row) => candidatePattern.test(row.team_name_raw));
const aggregateNames = (rows) => {
  const byName = new Map();
  for (const row of rows) {
    const entry = byName.get(row.team_name_raw) ?? {
      raw_team_name: row.team_name_raw,
      post_count: 0,
      distinct_physical_pools: new Set(),
      seasons: new Set(),
    };
    entry.post_count += 1;
    entry.distinct_physical_pools.add(`${row.season_id}|${row.age_group_id}|${row.league_group_id}`);
    entry.seasons.add(row.season_id);
    byName.set(row.team_name_raw, entry);
  }
  return [...byName.values()].map((entry) => {
    const seasons = [...entry.seasons].sort((a, b) => a - b);
    return {
      raw_team_name: entry.raw_team_name,
      post_count: entry.post_count,
      distinct_physical_pool_count: entry.distinct_physical_pools.size,
      season_from: seasons[0],
      season_to: seasons.at(-1),
      classification: /bc\s*37/iu.test(entry.raw_team_name) && /gladsaxe/iu.test(entry.raw_team_name)
        ? 'tvetydig-flere-klubreferencer'
        : /gladsaxe/iu.test(entry.raw_team_name) ? 'GSB-navnekandidat-ikke-verificeret' : 'tvetydig-lignende-holdvariant',
    };
  }).sort((a, b) => a.raw_team_name.localeCompare(b.raw_team_name, 'da'));
};

const teamNameVariants = aggregateNames(matchingRows);
const likelyGsbTeamVariants = teamNameVariants.filter((row) => /gladsaxe/iu.test(row.raw_team_name) && !/bc\s*37/iu.test(row.raw_team_name));
const ambiguousTeamVariants = teamNameVariants.filter((row) => /bc\s*37/iu.test(row.raw_team_name)
  || (!/gladsaxe/iu.test(row.raw_team_name) && similarPattern.test(row.raw_team_name)));
const ambiguousClubVariants = registryVariants.filter((row) => row.classification === 'tvetydig-lignende-klub');

const after = {
  liga_landscape: snapshot(dbPath),
  normalized: snapshot(normalizedDbPath),
};

const report = {
  title: 'Opgave 127 — audit af mulige GSB-ungdomsholdnavne',
  scope: { age_group_ids_from_126: youthAgeIds, unit: 'rå league_group_teams-poster; fysisk-puljeantal vises særskilt' },
  method: {
    tables: ['club_registry', 'league_groups', 'league_group_teams'],
    club_registry_columns: registryColumns,
    league_group_teams_columns: teamColumns,
    club_registry_has_club_id: registryHasClubId,
    league_group_teams_has_club_id: teamHasClubId,
    registry_has_league_group_team_id: registryHasTeamId,
    team_has_registry_id: teamHasRegistryId,
    league_group_teams_foreign_keys: foreignKeys,
    linkage_conclusion: 'No direct club_id/club_registry_id or foreign-key link exists from league_group_teams to club_registry; raw-name matching is candidate discovery only, not verified identity.',
    candidate_pattern: 'Case-insensitive raw-text search for Gladsaxe, Søborg/Soborg/Soeborg, or BC37 in youth team/club names.',
  },
  club_registry_name_variants: registryVariants,
  likely_gsb_raw_team_name_variants: likelyGsbTeamVariants,
  ambiguous_similar_team_name_variants: ambiguousTeamVariants,
  ambiguous_similar_club_registry_variants: ambiguousClubVariants,
  totals: {
    youth_team_pool_rows_matching_candidate_pattern: matchingRows.length,
    rows_with_gladsaxe_token: matchingRows.filter((row) => /gladsaxe/iu.test(row.team_name_raw)).length,
    rows_with_both_bc37_and_gladsaxe_tokens: matchingRows.filter((row) => /bc\s*37/iu.test(row.team_name_raw) && /gladsaxe/iu.test(row.team_name_raw)).length,
    rows_with_bc37_but_without_gladsaxe_token: matchingRows.filter((row) => /bc\s*37/iu.test(row.team_name_raw) && !/gladsaxe/iu.test(row.team_name_raw)).length,
    likely_gsb_raw_name_variants_not_verified: likelyGsbTeamVariants.length,
  ambiguous_similar_or_multi_club_team_variants: ambiguousTeamVariants.length,
    ambiguous_similar_registry_variants: ambiguousClubVariants.length,
    all_youth_team_pool_rows_scanned: youthRows.length,
  },
  other_club_mapping_for_top_format: {
    same_mapping_available: false,
    evidence: 'club_registry is not linked to league_group_teams by ID/FK. Scripts 092/101 normalize/name-match senior-only inputs (age_group_id=1); they do not provide verified youth club identity for every team in a pool.',
  },
  databases: { before, after },
};

const mdTable = (headers, rows) => [
  `| ${headers.join(' | ')} |`,
  `| ${headers.map(() => '---').join(' | ')} |`,
  ...rows.map((row) => `| ${row.map((cell) => String(cell ?? '').replaceAll('|', '\\|')).join(' | ')} |`),
].join('\n');
const teamRows = (rows) => rows.map((row) => [row.raw_team_name, row.post_count, row.distinct_physical_pool_count, `${row.season_from}–${row.season_to}`, row.classification]);
const clubRows = (rows) => rows.map((row) => [row.club_id, row.club_name_raw, row.region_id, row.postal_code, row.classification]);
const dbLines = (label, value) => [
  `- ${label}: SHA-256 \`${value.before.sha256}\` → \`${value.after.sha256}\` (${value.before.sha256 === value.after.sha256 ? 'uændret' : 'ÆNDRET'})`,
  `  Rækketal før/efter: \`${JSON.stringify(value.before.row_counts)}\` / \`${JSON.stringify(value.after.row_counts)}\``,
];

const markdown = `# Opgave 127 — Del 1: audit af mulige GSB-ungdomsholdnavne

## Metode og dækningsgrad

Scannet alle ${report.totals.all_youth_team_pool_rows_scanned} hold-puljeposter for 126's ungdomsaldersgruppe-ID'er (${youthAgeIds.join(', ')}). Holdnavne kommer fra \`league_group_teams.team_name_raw\`; puljekontekst fra \`league_groups\` via den sammensatte nøgle \`season_id + age_group_id + league_group_id\`. Kandidatsøgningen ser efter Gladsaxe, Søborg/Soborg/Soeborg eller BC37. Den er kun en navneaudit.

\`club_registry\` har \`club_id\` og \`club_name_raw\`, men \`league_group_teams\` har hverken klub-ID eller registry-ID, og har ingen FK til registry. Der findes derfor ingen direkte identitetskobling; tekstlig lighed beviser ikke, at et hold tilhører registry-klubben. Navnene nedenfor er kandidater, ikke bekræftede identiteter.

## Club registry-varianter

${mdTable(['club_id', 'club_name_raw', 'region_id', 'postal_code', 'auditstatus'], clubRows(registryVariants))}

${mdTable(['Rå holdnavn', 'Poster', 'Fysiske puljer', 'Sæsonspænd', 'Auditstatus'], teamRows(likelyGsbTeamVariants))}

## Tvetydige lignende varianter — kræver Christoffers afgørelse

Disse forekommer i kildens navnerum, men kan ikke knyttes sikkert til GSB ud fra de tilgængelige ID'er:

### Holdnavne

${ambiguousTeamVariants.length ? mdTable(['Rå holdnavn', 'Poster', 'Fysiske puljer', 'Sæsonspænd', 'Auditstatus'], teamRows(ambiguousTeamVariants)) : 'Ingen lignende ungdomsholdnavne fundet med auditmønstret.'}

### Registry-klubber

${ambiguousClubVariants.length ? mdTable(['club_id', 'club_name_raw', 'region_id', 'postal_code', 'Auditstatus'], clubRows(ambiguousClubVariants)) : 'Ingen lignende registry-klubber fundet med auditmønstret.'}

## Andre klubber i puljer med højeste format

**Samme verificerede klubmapping kan ikke genbruges for alle klubber.** Registry-id kan ikke føres over til holdrækker via databasekolonner/FK. 092/101's tekstbaserede identitetslogik bruger senior-only data (\`age_group_id=1\`), ikke en verificeret ungdomsmapping for samtlige klubber. Trin 1 giver derfor ikke grundlag for at vise klubber i højeste format; det kræver en godkendt ungdoms- og klubkobling.

## Databaseværn

${[...dbLines('liga-landskab.db', { before: before.liga_landscape, after: after.liga_landscape }), ...dbLines('gsb-statistik-normalized.db', { before: before.normalized, after: after.normalized })].join('\n')}

Ingen database blev skrevet. Hashes og alle tabelrækketal er identiske før og efter.
`;

fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(mdPath, markdown, 'utf8');
console.log(JSON.stringify(report.totals, null, 2));
console.log(`Wrote ${mdPath}`);
console.log(`Wrote ${jsonPath}`);
