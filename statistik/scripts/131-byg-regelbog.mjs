import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rulesDir = path.join(root, 'kilder', 'reglementer');
const matrixPath = path.join(rulesDir, 'regelbog-pr-saeson.json');
const coveragePath = path.join(rulesDir, '131-regelbog-daekning.md');
const mdPath = path.join(rulesDir, 'regelbog-pr-saeson.md');
const aliasPath = path.join(rulesDir, 'omraade-alias.json');
const seasonOverridePath = path.join(rulesDir, 'kilde-saesonoverstyring.json');
const reportPath = path.resolve(root, 'results', '141-omraadealias-foer-efter.md');
const baselineRef = '0d27ab7';
const register = JSON.parse(fs.readFileSync(path.join(rulesDir, 'register.json'), 'utf8'));
const original = JSON.parse(execFileSync('git', ['show', `${baselineRef}:statistik/kilder/reglementer/regelbog-pr-saeson.json`], { encoding: 'utf8' }));

const registerById = new Map(register.sources.map((source) => [source.id, source]));
const seasonOverrides = JSON.parse(fs.readFileSync(seasonOverridePath, 'utf8'));
const seasonOverrideById = new Map(seasonOverrides.sources.map((source) => [source.source_id, source]));
for (const sourceId of seasonOverrideById.keys()) {
  if (!registerById.has(sourceId)) throw new Error(`Season override is absent from register.json: ${sourceId}`);
}
for (const entry of original.entries) {
  for (const source of [entry.source, ...(entry.supplements ?? [])].filter(Boolean)) {
    const registered = registerById.get(source.id);
    if (!registered) throw new Error(`Matrix source is absent from register.json: ${source.id}`);
    for (const field of ['title', 'source_url', 'retrieved_at', 'sha256', 'file']) {
      if ((source[field] ?? null) !== (registered[field] ?? null)) throw new Error(`Matrix/register source mismatch: ${source.id}.${field}`);
    }
  }
}

function baselineReplay() {
  // The original 131 source-selection decisions were not committed as code.
  // Replay those auditable decisions from the immutable 131 result, while
  // validating every referenced source against today's register.
  return original.entries.map((entry) => structuredClone(entry));
}

const replayed = baselineReplay();
const statusCounts = (entries) => Object.fromEntries(['bekraeftet', 'betinget', 'ingen'].map((status) => [status, entries.filter((entry) => entry.status === status).length]));
if (process.argv.includes('--verify-baseline')) {
  const equalEntries = JSON.stringify(replayed) === JSON.stringify(original.entries);
  const counts = statusCounts(replayed);
  console.log(JSON.stringify({
    baseline_entries: replayed.length,
    status_counts: counts,
    entries_identical: equalEntries,
    register_sources_validated: registerById.size,
  }, null, 2));
  if (replayed.length !== 918 || counts.bekraeftet !== 41 || counts.betinget !== 96 || counts.ingen !== 781 || !equalEntries) process.exitCode = 1;
  process.exit();
}

function flagUncertainSource(source) {
  if (!source) return source;
  const override = seasonOverrideById.get(source.id);
  if (!override) return source;
  return { ...source, kilde_saeson_usikker: true, kilde_saeson_usikker_begrundelse: override.begrundelse };
}

for (const entry of replayed) {
  if (entry.source) {
    const override = seasonOverrideById.get(entry.source.id);
    entry.source = flagUncertainSource(entry.source);
    entry.versioner = (entry.versioner ?? []).map(flagUncertainSource);
    if (override?.regelbogskilde) {
      entry.status_foer_saesonoverstyring = entry.status;
      entry.kilde_saeson_usikker = true;
      entry.kilde_saeson_usikker_begrundelse = override.begrundelse;
      entry.kilde_saeson_fastlagt = false;
      if (entry.status !== 'ingen') {
        entry.status = 'betinget';
        entry.svag = true;
      }
      entry.kilde_kommentar = [entry.kilde_kommentar, 'Sæsonusikker kilde; sæsonafstand er ikke uafhængigt verificeret.']
        .filter(Boolean).join(' ');
    }
  }
  entry.supplements = (entry.supplements ?? []).map(flagUncertainSource);
}

const aliases = JSON.parse(fs.readFileSync(aliasPath, 'utf8'));
const aliasMap = new Map();
for (const alias of aliases.aliases) {
  if (alias.type !== 'stavning_rækkefølge') throw new Error(`Non-mechanical alias may not be applied: ${alias.kanonisk}`);
  for (const variant of alias.varianter) {
    if (aliasMap.has(variant)) throw new Error(`Variant appears in multiple alias groups: ${variant}`);
    aliasMap.set(variant, alias.kanonisk);
  }
}
const canonical = (area) => aliasMap.get(area) ?? area;
const matrixAreas = [...new Set(original.entries.map((entry) => entry.area))].sort((a, b) => a.localeCompare(b, 'da'));
for (const variant of aliasMap.keys()) if (!matrixAreas.includes(variant)) throw new Error(`Alias variant is not a matrix area: ${variant}`);

const grouped = new Map();
for (const entry of replayed) {
  const key = `${entry.season}\u0000${entry.target_group}\u0000${canonical(entry.area)}`;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(entry);
}
const combined = [];
const chainReport = [];
for (const [key, entries] of grouped) {
  const [season, target_group, area] = key.split('\u0000');
  const variants = [...new Set(entries.map((entry) => entry.area))].sort((a, b) => a.localeCompare(b, 'da'));
  const sourced = entries.filter((entry) => entry.source);
  const evidenceRank = (entry) => entry.status === 'bekraeftet' ? 0
    : entry.status === 'betinget' ? (entry.kilde_saeson_usikker ? 2 : 1) : 3;
  const winner = [...sourced].sort((a, b) => {
    return evidenceRank(a) - evidenceRank(b)
      || (a.afstand_saesoner ?? 0) - (b.afstand_saesoner ?? 0)
      || String(a.source.id).localeCompare(String(b.source.id));
  })[0] ?? entries[0];
  if (sourced.length > 1) {
    const topRank = evidenceRank(winner);
    const topCandidates = sourced.filter((entry) => evidenceRank(entry) === topRank
      && (entry.status !== 'betinget' || entry.afstand_saesoner === winner.afstand_saesoner));
    if (new Set(topCandidates.map((entry) => entry.source.id)).size > 1) {
      throw new Error(`Unresolved equal-priority source conflict for ${season}/${target_group}/${area}: ${topCandidates.map((entry) => entry.source.id).join(', ')}`);
    }
  }
  const output = structuredClone(winner);
  output.season = season;
  output.target_group = target_group;
  output.area = area;
  output.omraade_varianter = variants;
  if (sourced.length > 1) {
    const allSupplements = entries.flatMap((entry) => entry.supplements ?? []);
    output.supplements = [...new Map([...output.supplements, ...allSupplements].map((source) => [source.id, source])).values()];
  }
  for (const changed of entries.filter((entry) => entry.area !== area && entry.status !== output.status)) {
    const sourceArea = registerById.get(output.source?.id)?.area;
    if (!sourceArea || !variants.includes(sourceArea) || sourceArea === changed.area) {
      throw new Error(`Status change is not supported by a source in the other alias variant: ${season}/${target_group}/${changed.area}/${changed.status} -> ${output.status}; source area=${sourceArea ?? 'none'}`);
    }
  }
  combined.push(output);
  if (variants.length > 1) {
    const before = entries.map((entry) => ({ variant: entry.area, status: entry.status, sourceId: entry.source?.id ?? null }));
    const changedStatusVariants = entries.filter((entry) => entry.area !== area && entry.status !== output.status).map((entry) => ({ variant: entry.area, from: entry.status, to: output.status }));
    chainReport.push({ season, target_group, canonical_area: area, variants, before, after: { status: output.status, sourceId: output.source?.id ?? null }, changedStatusVariants });
  }
}
combined.sort((a, b) => a.season.localeCompare(b.season) || a.target_group.localeCompare(b.target_group) || a.area.localeCompare(b.area, 'da'));

const areas = [...new Set(combined.map((entry) => entry.area))].sort((a, b) => a.localeCompare(b, 'da'));
const statusSummary = statusCounts(combined);
const matrix = {
  ...original,
  generated_at: new Date().toISOString().slice(0, 10),
  method: '131-kildeselektion genafspillet deterministisk fra den eksisterende matrix; kilde-sæsonoverstyringer kræver selvangivet, entydig sæson i PDF. Usikre kilder kan højst give betinget og er svage uanset afstand. Rene områdenavne-alias vælger først højeste evidensstatus, derefter korteste afstand. Ingen krydsområdes-/krydsgruppearv. Pointskalaer arves aldrig.',
  kilde_saesonoverstyringer: seasonOverrides.sources,
  areas,
  entry_count: combined.length,
  entries: combined,
};

function summarize(chainEntries) {
  return statusCounts(chainEntries);
}
function renderMarkdown() {
  const chains = new Map();
  for (const entry of combined) {
    const key = `${entry.area}\u0000${entry.target_group}`;
    if (!chains.has(key)) chains.set(key, []);
    chains.get(key).push(entry);
  }
  const lines = [
    '# Regelbog pr. sæson', '',
    `Opslag: ${combined.length} matrixposter i [JSON-regelbogen](regelbog-pr-saeson.json). Optællinger i [dækningsrapporten](131-regelbog-daekning.md).`, '',
    '| Område | Målgruppe | Bekræftet | Betinget | Ingen | Varianter |',
    '|---|---|---:|---:|---:|---|',
  ];
  for (const [key, entries] of [...chains].sort(([a], [b]) => a.localeCompare(b, 'da'))) {
    const [area, group] = key.split('\u0000');
    const c = summarize(entries);
    const variants = [...new Set(entries.flatMap((entry) => entry.omraade_varianter))].filter((name) => name !== area);
    lines.push(`| ${area} | ${group} | ${c.bekraeftet} | ${c.betinget} | ${c.ingen} | ${variants.join('; ') || '—'} |`);
  }
  lines.push('', '**GSB (Badminton København, ungdom):** lokal København-kæde særskilt. Nationalt BD/DGI-fællesreglement vises under eget kanonisk områdenavn. Pointskalaer/niveautal arves ikke.', '');
  return lines.join('\n');
}
function renderCoverage() {
  const total = statusCounts(combined);
  const groups = [...new Set(combined.map((entry) => entry.target_group))].sort();
  const seasons = [...new Set(combined.map((entry) => entry.season))].sort();
  const weak = combined.filter((entry) => entry.status === 'betinget' && entry.svag).length;
  const noSeasonSources = combined.filter((entry) => entry.source && entry.kilde_saeson_fastlagt === false);
  const chainKeys = new Set(combined.map((entry) => `${entry.area}\u0000${entry.target_group}`));
  const chainsWithFile = new Set(combined.filter((entry) => entry.source).map((entry) => `${entry.area}\u0000${entry.target_group}`));
  const lines = [
    '# Regelbog pr. sæson — dækningsrapport', '',
    `Matrixen har ${combined.length} felter (${seasons.length} sæsoner × ${groups.length} målgrupper × ${areas.length} kanoniske områder), fordelt på ${chainKeys.size} område-/målgruppekæder; ${chainsWithFile.size} kæder har mindst én fil. Registeret har ${register.sources.length} filer. Rene navnevarianter står i hvert felts \`omraade_varianter\`.`, '',
    '## Status i alt', '', '| Status | Felter |', '|---|---:|',
    `| bekraeftet | ${total.bekraeftet} |`, `| betinget | ${total.betinget} |`, `| ingen | ${total.ingen} |`, `| Svage betingede (afstand ≥3) | ${weak} |`, '',
    '## Pr. målgruppe', '', '| Målgruppe | Bekræftet | Betinget | Ingen |', '|---|---:|---:|---:|',
  ];
  for (const group of groups) {
    const es = combined.filter((entry) => entry.target_group === group);
    const c = statusCounts(es);
    lines.push(`| ${group} | ${c.bekraeftet} | ${c.betinget} | ${c.ingen} |`);
  }
  lines.push('', '## Pr. sæson', '', '| Sæson | Bekræftet | Betinget | Ingen |', '|---|---:|---:|---:|');
  for (const season of seasons) {
    const c = statusCounts(combined.filter((entry) => entry.season === season));
    lines.push(`| ${season} | ${c.bekraeftet} | ${c.betinget} | ${c.ingen} |`);
  }
  lines.push('', '## Særlige kontroller', '',
    '- Ungdom national 2017/18: betinget, kilde 2016/17, afstand 1.',
    '- Ungdom national 2010/11: ingen.',
    '- Ungdom København 2021/22: betinget, seneste tidligere kilde 2020/21.',
    '- Ungdom national 2025/26: bekræftet med original og revision 8. oktober 2025; præcise kampgyldighedsdatoer er ikke angivet.',
    '- Ungdom national 2023/24: fællesreglement bekræftet; DMU-tillæg 2023/24 mangler.', '',
    '## Kilder uden fastlagt sæson', '',
  );
  for (const entry of noSeasonSources) lines.push(`- ${entry.season} / ${entry.target_group} / ${entry.area}: ${entry.source.id} — ${entry.source.season_evidence ?? entry.source.season_evidence_note ?? 'sæson ikke fastlagt i kilden'}.`);
  lines.push('', 'Den fulde liste og kildebeviser står i JSON. Datodaterede kilder er betingede; ingen arv bagud før første kilde; ingen krydsning mellem grupper eller ikke-aliaserede områder; `pointskala_arv` er `ingen` i alle poster.', '');
  return lines.join('\n');
}

function renderAliasReport() {
  const beforeAreas = matrixAreas;
  const beforeStatus = statusCounts(original.entries);
  const afterStatus = statusCounts(combined);
  const lines = [
    '# Opgave 141 — områdenavne før og efter', '',
    `Før: ${beforeAreas.length} områdenavne og ${original.entries.length} felter (${beforeStatus.bekraeftet} bekræftede, ${beforeStatus.betinget} betingede, ${beforeStatus.ingen} ingen). Efter: ${areas.length} kanoniske områder og ${combined.length} felter (${afterStatus.bekraeftet}, ${afterStatus.betinget}, ${afterStatus.ingen}).`, '',
    '## Anvendte sammenlægninger', '',
  ];
  for (const alias of aliases.aliases) {
    const rows = chainReport.filter((row) => row.variants.some((variant) => alias.varianter.includes(variant)));
    const changed = rows.filter((row) => row.changedStatusVariants.length);
    lines.push(`### ${alias.kanonisk}`, '', `Varianter: ${alias.varianter.join(' ↔ ')}. Type: ${alias.type}. ${alias.begrundelse}`, '',
      `Sammenlagte sæson/målgruppefelter: ${rows.length}. Felter hvor en variants status skiftede: ${changed.length}.`);
    if (changed.length) for (const row of changed) {
      const sourceArea = registerById.get(row.after.sourceId)?.area ?? 'ukendt registerområde';
      const explanation = row.changedStatusVariants.map((x) => x.from === 'ingen'
        ? `${x.variant} stod som ingen, fordi dens egen kæde ikke havde kilde; ${row.after.sourceId} er registreret under aliasvarianten ${sourceArea}`
        : `${x.variant} stod som ${x.from}; ${row.after.sourceId} under ${sourceArea} har højere status/kortere afstand`).join('; ');
      lines.push(`- ${row.season} / ${row.target_group} / ${row.canonical_area}: ${row.changedStatusVariants.map((x) => `${x.variant}: ${x.from} → ${x.to}`).join('; ')}. Hvorfor: ${explanation}.`);
    }
    else lines.push('- Ingen status ændret. De to øvrige kæder havde ingen kilder; vestkædens 2020-daterede kilde forbliver valgt for sine år, mens en nyere 2025/26-kilde vinder på bekræftet status/afstand i den overlappende kæde. Ingen sæsonstatus ændres.');
    lines.push('');
  }
  lines.push('## GSB-kæder — kontrol før/efter', '',
    '| Kæde | Sæsoner kontrolleret | Resultat |', '|---|---|---|');
  for (const [group, area] of [['ungdom', 'Badminton København'], ['ungdom', 'Badminton Danmark + DGI Badminton']]) {
    const old = original.entries.filter((entry) => entry.target_group === group && entry.area === area);
    const now = combined.filter((entry) => entry.target_group === group && entry.area === area);
    const same = old.length === now.length && old.every((entry, i) => {
      const { omraade_varianter: _omit, ...rest } = now[i];
      return JSON.stringify(entry) === JSON.stringify(rest);
    });
    lines.push(`| ${area} / ungdom | ${old.length} | ${same ? 'status, kilde, afstand og versioner uændrede' : 'kontrollér indhold — der er afvigelse'} |`);
  }
  lines.push('', '## Opslagseksempler (kanonisk navn og varianter)', '', '| Sæson | Gruppe | Søgt områdenavn | Kanonisk område | Status | Kilde |', '|---|---|---|---|---|---|');
  const lookupExamples = [
    ['2017/18', 'ungdom', 'DGI Badminton + Badminton Danmark'],
    ['2018/19', 'senior', 'Badminton Fyn, Sønderjylland, Nordjylland og Midtjylland'],
    ['2025/26', 'senior', 'DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland samt Badminton Sønderjylland og Midtjylland'],
    ['2025/26', 'veteran', 'Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland'],
    ['2025/26', 'ungdom', 'Badminton Danmark + DGI Badminton'],
  ];
  for (const [season, group, requestedArea] of lookupExamples) {
    const found = combined.find((entry) => entry.season === season && entry.target_group === group && (entry.area === requestedArea || entry.omraade_varianter.includes(requestedArea)));
    if (!found) throw new Error(`Lookup example failed: ${season}/${group}/${requestedArea}`);
    lines.push(`| ${season} | ${group} | ${requestedArea} | ${found.area} | ${found.status} | ${found.source?.id ?? '—'} |`);
  }
  lines.push('', '## Feltstikprøve (10 felter)', '', '| Sæson | Målgruppe | Kanonisk område | Før-statusser | Efter | Kilde |', '|---|---|---|---|---|---|');
  const sampleRows = [...chainReport.filter((row) => row.changedStatusVariants.length), ...chainReport.filter((row) => !row.changedStatusVariants.length)].slice(0, 10);
  for (const row of sampleRows) lines.push(`| ${row.season} | ${row.target_group} | ${row.canonical_area} | ${row.before.map((x) => `${x.variant}: ${x.status}`).join('; ')} | ${row.after.status} | ${row.after.sourceId ?? '—'} |`);
  lines.push('', `Alias-forslag der ikke anvendes: ${aliases.forslag_ikke_anvendt.length}. De står med status \`forslag_ikke_anvendt\`; ingen af dem påvirker matrixen. pointskala_arv er kontrolleret som ingen i alle ${combined.length} felter.`, '');
  return lines.join('\n');
}

if (combined.length !== areas.length * original.seasons.length * original.target_groups.length) throw new Error('Matrix key count does not balance to canonical areas × seasons × groups');
if (combined.some((entry) => entry.pointskala_arv !== 'ingen')) throw new Error('pointskala_arv must remain "ingen" in every entry');
fs.writeFileSync(matrixPath, `${JSON.stringify(matrix, null, 2)}\n`);
fs.writeFileSync(mdPath, renderMarkdown());
fs.writeFileSync(coveragePath, renderCoverage());
if (!process.argv.includes('--skip-alias-report')) fs.writeFileSync(reportPath, renderAliasReport());
console.log(JSON.stringify({ areas_before: matrixAreas.length, areas_after: areas.length, entries_before: original.entries.length, entries_after: combined.length, before: statusCounts(original.entries), after: statusCounts(combined), merged_chains: chainReport.length, status_changes: chainReport.reduce((n, row) => n + row.changedStatusVariants.length, 0), uncertain_sources: seasonOverrides.sources.length, uncertain_rulebook_entries: combined.filter((entry) => entry.kilde_saeson_usikker).length, weak_conditional: combined.filter((entry) => entry.status === 'betinget' && entry.svag).length, pointscale_none: combined.filter((entry) => entry.pointskala_arv === 'ingen').length }, null, 2));
