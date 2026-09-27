import fs from 'node:fs';

const base = JSON.parse(fs.readFileSync('statistik/results/104-national-styrke-dag.json', 'utf8'));
const dag = JSON.parse(fs.readFileSync('statistik/results/105-national-styrke-dag.json', 'utf8'));
const outputPath = 'statistik/results/106-national-styrke-dag-visuel.html';

const byId = new Map(dag.nodes.map((node) => [node.id, node]));
const baseEdgeKeys = new Set(base.edges.map((edge) => `${edge.stronger_node_id}>${edge.weaker_node_id}>${edge.edge_type}`));
const retained = dag.edges.filter((edge) => baseEdgeKeys.has(`${edge.stronger_node_id}>${edge.weaker_node_id}>${edge.edge_type}`));
if (retained.length !== base.edges.length) throw new Error('105 does not retain every 104 edge');

const kinds = {
  familieren_regeltekst: {
    label: 'Familieren regeltekst (familieren_regeltekst)',
    className: 'family-edge',
    explanation: 'Samme gemte spilleform-familie. Dette er det eneste spor, der udtrykker et familierent niveauforhold.',
  },
  strukturel_regeltekst: {
    label: 'Strukturel DH-regeltekst (strukturel_regeltekst)',
    className: 'dh-edge',
    explanation: 'Kun Badminton Danmarks navngivne DH-stige. Organisatorisk struktur, ikke sportslig tværfamilie-sammenligning.',
  },
  strukturel_regeltekst_regional: {
    label: 'Regional strukturel regeltekst (strukturel_regeltekst_regional)',
    className: 'regional-edge',
    explanation: 'Fast regional oprykningsvej til Danmarksserien. Organisatorisk struktur, ikke sportslig tværfamilie-sammenligning.',
  },
};

const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const levelIds = new Map();
for (const node of dag.nodes.filter((node) => node.scope === 'national_dh_structural_exception')) levelIds.set(node.label, node.id);
const order = ['Badmintonligaen', '1. division', '2. division', '3. division', 'Danmarksserien'];
if (order.some((label) => !levelIds.has(label))) throw new Error('DH structural level missing');
const regionalEdges = dag.edges.filter((edge) => edge.edge_type === 'strukturel_regeltekst_regional');
if (regionalEdges.length !== 5) throw new Error(`Expected 5 regional edges, got ${regionalEdges.length}`);
const allKnownEdges = dag.edges.filter((edge) => kinds[edge.edge_type]);
const unknownEdges = dag.edges.filter((edge) => !kinds[edge.edge_type]);
if (unknownEdges.length) throw new Error(`Unknown edge type(s): ${unknownEdges.map((edge) => edge.edge_type).join(', ')}`);

const familyEdges = dag.edges.filter((edge) => edge.edge_type === 'familieren_regeltekst');
const dhEdges = dag.edges.filter((edge) => edge.edge_type === 'strukturel_regeltekst');
const unconnected = dag.unconnected_nodes.length;
const sourceCoverage = dag.source_coverage;

const detailRows = allKnownEdges.map((edge, index) => {
  const from = byId.get(edge.stronger_node_id);
  const to = byId.get(edge.weaker_node_id);
  const kind = kinds[edge.edge_type];
  const urls = (edge.citation_urls ?? []).map((url) => `<a href="${escape(url)}" target="_blank" rel="noreferrer">kilde ${escape(new URL(url).hostname)}</a>`).join(' · ');
  const coverage = edge.edge_type === 'strukturel_regeltekst_regional'
    ? 'Dækningshuller: 2010/11–2019/20 og 2021/22. Se 105-kildetabellen; ingen nutidsregel er projiceret bagud.'
    : 'Kildeangivelsen dokumenterer selve DH-niveauforholdet; den identificerer ikke konkrete hold på tværs af sæsoner.';
  return `<details class="edge-detail ${kind.className}" id="edge-${index}">
    <summary><span class="swatch"></span><strong>${escape(from.label)} → ${escape(to.label)}</strong><span>${escape(kind.label)}</span></summary>
    <p>${escape(kind.explanation)}</p>
    <p><strong>Belæg:</strong> ${escape(edge.source)}</p>
    <p><strong>Dækning:</strong> ${escape(coverage)}</p>
    ${urls ? `<p><strong>Links:</strong> ${urls}</p>` : ''}
  </details>`;
}).join('\n');

const structuralCards = order.map((label, index) => `<div class="dh-node ${label === 'Danmarksserien' ? 'danmarksserien' : ''}" style="--row:${index}">
  <strong>${escape(label)}</strong>
  <span>${label === 'Danmarksserien' ? 'Fælles knudepunkt for dokumenterede regionale veje' : 'National DH-stige'}</span>
</div>`).join('\n');
const regionCards = regionalEdges.map((edge) => {
  const node = byId.get(edge.weaker_node_id);
  return `<div class="region-node"><strong>${escape(node.label)}</strong><span>${escape(node.coverage)}</span></div>`;
}).join('\n');

const html = `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>National styrke-DAG — 104 + 105</title>
<style>
  :root { --ink:#172338; --muted:#52647b; --paper:#f4f7fb; --card:#fff; --line:#cbd7e8; --family:#2866aa; --dh:#b36b00; --regional:#7939ad; }
  * { box-sizing:border-box; } body { margin:0; background:var(--paper); color:var(--ink); font:16px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif; }
  main { max-width:1280px; margin:auto; padding:28px 22px 48px; } h1 { margin:0; font-size:clamp(1.7rem,4vw,2.55rem); } h2 { margin:30px 0 12px; font-size:1.25rem; } .lede { max-width:88ch; color:var(--muted); margin:8px 0 20px; }
  .notice { border-left:6px solid var(--regional); background:#f6effd; padding:13px 16px; border-radius:6px; max-width:1000px; } .metrics { display:flex; flex-wrap:wrap; gap:10px; margin:20px 0; } .metric { background:var(--card); border:1px solid var(--line); border-radius:8px; padding:10px 13px; min-width:145px; } .metric b { display:block; font-size:1.45rem; }
  .legend { display:flex; flex-wrap:wrap; gap:12px; background:#fff; border:1px solid var(--line); border-radius:9px; padding:12px; } .legend span { display:flex; align-items:center; gap:7px; } .sample { width:38px; border-top:4px solid var(--family); } .sample.dh { border-top-color:var(--dh); border-top-style:dashed; } .sample.regional { border-top-color:var(--regional); border-top-style:dotted; }
  .diagram { overflow-x:auto; background:#fff; border:1px solid var(--line); border-radius:12px; padding:20px; margin-top:15px; } .diagram-inner { min-width:960px; position:relative; min-height:745px; }
  .dh-column { position:absolute; left:50%; top:18px; transform:translateX(-50%); width:270px; display:grid; gap:24px; z-index:2; } .dh-node { background:#fffaf0; border:2px dashed var(--dh); border-radius:9px; text-align:center; padding:11px; box-shadow:0 2px 6px #17233814; } .dh-node strong,.region-node strong { display:block; } .dh-node span,.region-node span { font-size:.78rem; color:var(--muted); } .dh-node.danmarksserien { background:#fff4d9; border-style:solid; }
  .dh-arrow { position:absolute; left:50%; width:0; top:81px; height:417px; border-left:4px dashed var(--dh); transform:translateX(-50%); z-index:1; } .dh-arrow::after { content:"DH: strukturel regeltekst"; position:absolute; left:12px; top:180px; color:#895000; font-size:.77rem; white-space:nowrap; background:#fff; padding:2px 5px; }
  .family-track { position:absolute; left:calc(50% - 164px); top:122px; height:335px; border-left:4px solid var(--family); z-index:1; } .family-track::after { content:"familieren regeltekst"; position:absolute; right:10px; top:126px; color:#174c84; font-size:.77rem; white-space:nowrap; background:#fff; padding:2px 5px; }
  .regional-zone { position:absolute; left:0; right:0; top:526px; border-top:4px dotted var(--regional); padding-top:30px; } .regional-zone::before { content:"Regionale, strukturelle oprykningsveje — ikke sportslige tværfamilie-sammenligninger"; position:absolute; top:4px; left:50%; transform:translateX(-50%); color:#622b90; font-size:.82rem; white-space:nowrap; background:#fff; padding:0 8px; } .region-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; } .region-node { border:2px dotted var(--regional); background:#fbf7ff; border-radius:9px; padding:12px; min-height:95px; } .regional-stems { position:absolute; top:-46px; left:50%; right:0; height:46px; border-top:0; } .regional-stems::before { content:""; position:absolute; height:46px; left:50%; border-left:4px dotted var(--regional); }
  .edge-detail { background:#fff; border:1px solid var(--line); border-left:5px solid var(--family); border-radius:7px; padding:0 13px; margin:8px 0; } .edge-detail.dh-edge { border-left-color:var(--dh); } .edge-detail.regional-edge { border-left-color:var(--regional); } summary { cursor:pointer; display:flex; gap:9px; align-items:center; padding:10px 0; } summary span:last-child { color:var(--muted); font-size:.83rem; margin-left:auto; } .edge-detail .swatch { width:25px; border-top:4px solid var(--family); } .dh-edge .swatch { border-top-color:var(--dh); border-top-style:dashed; } .regional-edge .swatch { border-top-color:var(--regional); border-top-style:dotted; } .edge-detail p { margin:8px 0 12px; } a { color:#145aa0; }
  @media (max-width:700px) { main { padding:20px 12px; } .region-grid { gap:8px; } .region-node { padding:8px; font-size:.82rem; } }
</style>
</head>
<body><main>
<h1>National styrke-DAG</h1>
<p class="lede">En læsbar gengivelse af den dokumenterede struktur fra opgave 104 og 105. Den viser organisatoriske veje, ikke én samlet sportslig rangliste.</p>
<div class="notice"><strong>Vigtigt:</strong> Farver og linjestil angiver belægstype. De lilla regionale og orange DH-strukturlinjer må ikke læses som sportslige sammenligninger af forskellige spilleform-familier.</div>
<div class="metrics"><div class="metric"><b>${dag.nodes.length}</b>DAG-noder</div><div class="metric"><b>${dag.edges.length}</b>dokumenterede kanter</div><div class="metric"><b>${unconnected}</b>foldede, uforbundne noder</div><div class="metric"><b>${sourceCoverage.regions_catalogued}</b>regioner i kildedatasættet</div></div>
<h2>Legend</h2><div class="legend"><span><i class="sample"></i>Familieren regeltekst</span><span><i class="sample dh"></i>Strukturel DH-regeltekst</span><span><i class="sample regional"></i>Regional strukturel regeltekst</span></div>
<h2>Den dokumenterede struktur</h2>
<section class="diagram" aria-label="National styrke-DAG"><div class="diagram-inner"><div class="family-track"></div><div class="dh-arrow"></div><div class="dh-column">${structuralCards}</div><div class="regional-zone"><div class="regional-stems"></div><div class="region-grid">${regionCards}</div></div></div></section>
<h2>Kanter, kilder og sæsondækning</h2>
<p class="lede">Åbn en kant for dens konkrete regeltekst og afgrænsning. De regionale kanter gør eksplicit opmærksom på, at 2010/11–2019/20 og 2021/22 ikke er dækket af en fundet §29-version.</p>
${detailRows}
<h2>Hvad der er foldet væk</h2><p>${unconnected} noder har ingen dokumenteret forbindelse i 104/105 og er bevidst ikke tegnet enkeltvis. Det omfatter regionale rækker, ungdom og andre spilleform-familier, som ikke kan placeres uden nyt belæg.</p>
<p><small>Genereret fra uændrede <code>104-national-styrke-dag.json</code> og <code>105-national-styrke-dag.json</code>. 104's ${base.nodes.length} noder og ${base.edges.length} kanter blev kontrolleret som bevaret i 105 før rendering.</small></p>
</main></body></html>`;

fs.writeFileSync(outputPath, html);
console.log(JSON.stringify({ baseNodes: base.nodes.length, baseEdges: base.edges.length, retainedBaseEdges: retained.length, renderedNodes: dag.nodes.length, renderedEdges: allKnownEdges.length, regionalEdges: regionalEdges.length, unconnected }, null, 2));
