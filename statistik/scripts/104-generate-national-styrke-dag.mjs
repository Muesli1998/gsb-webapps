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
      evidence: 'regeltekst',
      source: '086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25',
      caveat: 'Reglen dokumenterer niveauparret. Den identificerer ikke automatisk konkrete hold på tværs af sæsoner.',
    });
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
  family_rule: 'Edges are created only within one identical spilleform-family.',
  nodes,
  edges,
  unconnected_nodes: nodes.filter((node) => !edges.some((edge) => edge.stronger_node_id === node.id || edge.weaker_node_id === node.id)).map((node) => node.id),
};

fs.writeFileSync('statistik/results/104-national-styrke-dag.json', JSON.stringify(output, null, 2) + '\n');
const rows = edges.map((edge) => `| ${nodes.find((n) => n.id === edge.stronger_node_id).label} | ${nodes.find((n) => n.id === edge.weaker_node_id).label} | ${edge.evidence} | ${edge.source} |`).join('\n') || '| Ingen | Ingen | — | — |';
const markdown = `# Opgave 104 — national styrke-DAG\n\n## Model\n\nDette er en **delvis ordning**, ikke en samlet placeringstabel. En pil betyder kun, at dokumenteret regeltekst forbinder de to niveauer inden for samme spilleform-familie. Uden pil er noderne sideordnede/uafgjorte. Det gælder især regionale serier, ungdom og alle familier uden dokumenteret overgang.\n\n## Dækning\n\n- Regioner i kataloget: **${output.source_coverage.regions_catalogued}**.\n- Pulje-region-forekomster: **${output.source_coverage.region_group_occurrences}**.\n- Unikke puljer: **${output.source_coverage.unique_groups}**.\n- DAG-noder: **${nodes.length}**; dokumenterede kanter: **${edges.length}**; eksplicit uforbundne noder: **${output.unconnected_nodes.length}**.\n\n## Dokumenterede styrkeforhold\n\n| Stærkere niveau | Svagere niveau | Belæg | Kilde |\n|---|---|---|---|\n${rows}\n\n## Hvad DAG'en bevidst ikke gør\n\n- Den sammenligner aldrig forskellige spilleform-familier.\n- Den placerer ikke regionale serier indbyrdes eller under Danmarksserien uden en særskilt citeret overgang.\n- Den bruger ikke 087's lave hold-kæde-rate til at opfinde flere kanter; 087 er kun støtte for, at konkrete holdspor er begrænsede.\n- Fase-/spilletidssider er beholdt som noder, men er ikke styrkeniveauer.\n\nMaskinlæsbar struktur: [104-national-styrke-dag.json](104-national-styrke-dag.json).\n`;
fs.writeFileSync('statistik/results/104-national-styrke-dag.md', markdown);
console.log(JSON.stringify({ nodes: nodes.length, edges: edges.length, unconnected: output.unconnected_nodes.length, coverage: output.source_coverage }, null, 2));
