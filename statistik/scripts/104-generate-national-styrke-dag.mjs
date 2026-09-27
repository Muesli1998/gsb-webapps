import fs from 'node:fs';

const htmlPath = 'statistik/results/086c-udvidet-visuelt-kort.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const start = html.indexOf('const D=') + 'const D='.length;
const end = html.indexOf(';const $=', start);
if (start === 'const D='.length - 1 || end < start) throw new Error('086c embedded data missing');
const source = JSON.parse(html.slice(start, end));
const key = (row) => `${row.s}|${row.a}|${row.g}`;
const norm = (value) => String(value ?? '').toLowerCase().replace(/\s+/g, ' ').trim();

// Only these five senior levels have a retained, national rule chain in
// 086e/088b.  Everything else stays a node without a strength edge unless a
// later task adds its own cited evidence.
function nationalLevel(division) {
  const value = norm(division);
  if (value.startsWith('badmintonligaen') && !/(kval|slutspil|kvart|semi|bronze|guld|oversidder)/.test(value)) return 'Badmintonligaen';
  const match = value.match(/^(1|2|3)\.?\s*division\b/);
  if (match && !/(kval|nedrykning|slutspil|oversidder)/.test(value)) return `${match[1]}. division`;
  if (value.startsWith('danmarksserien') && !/(kval|nedrykning|oversidder)/.test(value)) return 'Danmarksserien';
  return null;
}

function phaseType(row) {
  const value = norm(`${row.d} ${row.n}`);
  if (/(kval|slutspil|kvart|semi|final|bronze|guld|nedrykning|oprykning)/.test(value)) return 'fase';
  if (/(spilletid|oversidder)/.test(value)) return 'spilletid';
  return 'række';
}

const nodeMap = new Map();
for (const row of source.x) {
  const level = nationalLevel(row.d);
  const phase = phaseType(row);
  const nodeId = level
    ? `dh|${row.f}|senior|${level}`
    : `række|${row.f}|${row.a}|${row.r}|${norm(row.d) || 'uden-navn'}|${phase}`;
  if (!nodeMap.has(nodeId)) {
    nodeMap.set(nodeId, {
      id: nodeId,
      label: level ?? row.d ?? 'Uden divisionsnavn',
      family: row.f,
      age_group_id: level ? 1 : row.a,
      region_id: level ? 1 : row.r,
      scope: level ? 'national_dh_senior' : 'regional_or_unconnected',
      node_type: level ? 'niveau' : phase,
      source_rows: 0,
      unique_groups: new Set(),
      divisions: new Set(),
    });
  }
  const node = nodeMap.get(nodeId);
  node.source_rows += 1;
  node.unique_groups.add(key(row));
  node.divisions.add(row.d ?? '');
}

const nodes = [...nodeMap.values()].map((node) => ({
  ...node,
  unique_groups: node.unique_groups.size,
  divisions: [...node.divisions].sort(),
}));

const dhOrder = ['Badmintonligaen', '1. division', '2. division', '3. division', 'Danmarksserien'];
const byFamily = new Map();
for (const node of nodes.filter((node) => node.scope === 'national_dh_senior')) {
  if (!byFamily.has(node.family)) byFamily.set(node.family, new Map());
  byFamily.get(node.family).set(node.label, node);
}

const edges = [];
for (const [family, levels] of byFamily) {
  for (let index = 0; index < dhOrder.length - 1; index += 1) {
    const stronger = levels.get(dhOrder[index]);
    const weaker = levels.get(dhOrder[index + 1]);
    if (!stronger || !weaker) continue;
    edges.push({
      stronger_node_id: stronger.id,
      weaker_node_id: weaker.id,
      family,
      relation: 'documented_dh_level_pair',
      edge_type: 'familieren_regeltekst',
      evidence: 'regeltekst',
      source: '086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25',
      caveat: 'Reglen dokumenterer niveauparret. Den identificerer ikke automatisk konkrete hold på tværs af sæsoner.',
    });
  }
}

// This is deliberately a separate, structural representation of Badminton
// Denmark's named DH ladder. It does not make the category-count families
// sportswise comparable. Chris approved this narrow exception on 2026-09-27:
// the different category counts here are a level-specific match-format
// artefact, while formats such as 4+3 and 2+2 remain absolutely separate.
const structuralNodeIds = new Map();
for (const level of dhOrder) {
  const sourceNodes = nodes.filter((node) => node.scope === 'national_dh_senior' && node.label === level);
  if (!sourceNodes.length) continue;
  const id = `dh_strukturel|${level}`;
  structuralNodeIds.set(level, id);
  nodes.push({
    id,
    label: level,
    family: null,
    age_group_id: 1,
    region_id: 1,
    scope: 'national_dh_structural_exception',
    node_type: 'strukturelt_niveau',
    source_rows: sourceNodes.reduce((sum, node) => sum + node.source_rows, 0),
    unique_groups: sourceNodes.reduce((sum, node) => sum + node.unique_groups, 0),
    divisions: [...new Set(sourceNodes.flatMap((node) => node.divisions))].sort(),
    source_family_nodes: sourceNodes.map((node) => node.id),
    source_families: [...new Set(sourceNodes.map((node) => node.family))].sort(),
    caveat: 'Kun organisatorisk DH-niveau. Noden er ikke en sportslig sammenligning mellem spilleform-familier.',
  });
}
for (let index = 0; index < dhOrder.length - 1; index += 1) {
  const stronger = structuralNodeIds.get(dhOrder[index]);
  const weaker = structuralNodeIds.get(dhOrder[index + 1]);
  if (!stronger || !weaker) continue;
  edges.push({
    stronger_node_id: stronger,
    weaker_node_id: weaker,
    family: null,
    relation: 'official_dh_ladder_structural_link',
    edge_type: 'strukturel_regeltekst',
    evidence: 'regeltekst',
    source: 'Chris-bekræftet afgrænset undtagelse 2026-09-27; 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25',
    caveat: 'Kun DH-hovedturneringen. Ikke en generel tilladelse til at sammenligne eller rangere andre spilleform-familier.',
  });
}

const nodeById = new Map(nodes.map((node) => [node.id, node]));
for (const edge of edges) {
  const stronger = nodeById.get(edge.stronger_node_id);
  const weaker = nodeById.get(edge.weaker_node_id);
  if (edge.edge_type === 'familieren_regeltekst' && stronger.family !== weaker.family) {
    throw new Error(`Family-pure edge crosses families: ${edge.stronger_node_id} -> ${edge.weaker_node_id}`);
  }
  if (edge.edge_type === 'strukturel_regeltekst'
    && (stronger.scope !== 'national_dh_structural_exception' || weaker.scope !== 'national_dh_structural_exception')) {
    throw new Error(`Structural exception escaped DH ladder: ${edge.stronger_node_id} -> ${edge.weaker_node_id}`);
  }
}

const output = {
  generated_at: new Date().toISOString(),
  model: 'directed_acyclic_graph_partial_order',
  source: 'approved_086c_embedded_classification',
  source_coverage: {
    regions_catalogued: source.r.length,
    region_group_occurrences: source.x.length,
    unique_groups: new Set(source.x.map(key)).size,
  },
  ordering_rule: 'Only nodes joined by an edge are ordered. No edge means explicitly incomparable/sideordnet.',
  family_rule: 'Family-pure edges are created only within one identical spilleform-family. Four separately marked structural DH edges are the sole approved exception and are not sportswise cross-family comparisons.',
  nodes,
  edges,
  unconnected_nodes: nodes.filter((node) => !edges.some((edge) => edge.stronger_node_id === node.id || edge.weaker_node_id === node.id)).map((node) => node.id),
};

fs.writeFileSync('statistik/results/104-national-styrke-dag.json', JSON.stringify(output, null, 2) + '\n');
const rows = edges.map((edge) => `| ${nodeById.get(edge.stronger_node_id).label} | ${nodeById.get(edge.weaker_node_id).label} | ${edge.edge_type} | ${edge.evidence} | ${edge.source} |`).join('\n') || '| Ingen | Ingen | — | — | — |';
const markdown = `# Opgave 104 — national styrke-DAG\n\n## Model\n\nDette er en **delvis ordning**, ikke en samlet placeringstabel. En pil betyder kun et dokumenteret niveauforhold. Uden pil er noderne sideordnede/uafgjorte.\n\nAlmindelige kanter er familierene: de sammenligner kun én identisk spilleform-familie. Fire kanter af typen **\`strukturel_regeltekst\`** udgør den eneste godkendte undtagelse: Badminton Danmarks officielt navngivne DH-stige. De er særskilte, strukturelle noder og er **ikke** sportslige sammenligninger mellem kategorisignaturer. Undtagelsen gælder kun Ligaen ↔ 1. division ↔ 2. division ↔ 3. division ↔ Danmarksserien; alle andre familiegrænser er fortsat absolutte.\n\n## Dækning\n\n- Regioner i kataloget: **${output.source_coverage.regions_catalogued}**.\n- Pulje-region-forekomster: **${output.source_coverage.region_group_occurrences}**.\n- Unikke puljer: **${output.source_coverage.unique_groups}**.\n- DAG-noder: **${nodes.length}**; dokumenterede kanter: **${edges.length}**; eksplicit uforbundne noder: **${output.unconnected_nodes.length}**.\n\n## Dokumenterede niveauforhold\n\n| Stærkere niveau | Svagere niveau | Kanttype | Belæg | Kilde |\n|---|---|---|---|---|\n${rows}\n\n## Hvad DAG'en bevidst ikke gør\n\n- Den sammenligner ikke spilleform-familier sportsligt. DH-undtagelsen er en separat organisatorisk struktur.\n- Den placerer ikke regionale serier indbyrdes eller under Danmarksserien uden en særskilt citeret overgang.\n- Den bruger ikke 087's lave hold-kæde-rate til at opfinde flere kanter; 087 er kun støtte for, at konkrete holdspor er begrænsede.\n- Fase-/spilletidssider er beholdt som noder, men er ikke styrkeniveauer.\n\nMaskinlæsbar struktur: [104-national-styrke-dag.json](104-national-styrke-dag.json).\n`;
fs.writeFileSync('statistik/results/104-national-styrke-dag.md', markdown);
console.log(JSON.stringify({ nodes: nodes.length, edges: edges.length, unconnected: output.unconnected_nodes.length, coverage: output.source_coverage }, null, 2));
