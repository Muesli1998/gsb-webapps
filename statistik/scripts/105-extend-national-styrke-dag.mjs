import fs from 'node:fs';

const inputPath = 'statistik/results/104-national-styrke-dag.json';
const htmlPath = 'statistik/results/086c-udvidet-visuelt-kort.html';
const outputJsonPath = 'statistik/results/105-national-styrke-dag.json';
const outputMarkdownPath = 'statistik/results/105-regionale-oprykningspladser-og-reglementer.md';

const dag = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const html = fs.readFileSync(htmlPath, 'utf8');
const start = html.indexOf('const D=') + 'const D='.length;
const end = html.indexOf(';const $=', start);
if (start === 'const D='.length - 1 || end < start) throw new Error('086c embedded data missing');
const source = JSON.parse(html.slice(start, end));

const regionalNodes = [
  { id: 'regional_strukturel|Kredsserie Vest', label: 'Kredsserie Vest', regions: [4, 5, 6, 7], patterns: [/^kredsserien? vest$/i], coverage: '2017/18–2025/26 (direkte intern regeltekst); national §29 dækker pladstallet i 2020, 2022–2026' },
  { id: 'regional_strukturel|Sjællandsserien', label: 'Sjællandsserien', regions: [10], patterns: [/^sjællandsserien$/i], coverage: 'National §29 dokumenteret 2020, 2022–2026; ingen fundet offentlig regional version for 2010–2019/2021' },
  { id: 'regional_strukturel|LF-Serien', label: 'LF-Serien', regions: [9], patterns: [/^lf[ -]?serien$/i], coverage: 'National §29 dokumenteret 2020, 2022–2026; ingen fundet offentlig regional version for 2010–2019/2021' },
  { id: 'regional_strukturel|Københavnsserien', label: 'Københavnsserien', regions: [8], patterns: [/^(københavnsserien|kbh serien|ks[- ]?pulje|ks serie)$/i], coverage: 'National §29 dokumenteret 2020, 2022–2026; rækkenavn ændrer sig over tid og er strukturelt samlet her' },
  { id: 'regional_strukturel|Bornholmsserien', label: 'Bornholmsserien', regions: [3], patterns: [/^bornholmsserien$/i], coverage: 'National §29 dokumenteret 2020, 2022–2026; rå Bornholmsserie forekommer kun 2011/12–2015/16' },
];

const clean = (value) => String(value ?? '').trim();
for (const regional of regionalNodes) {
  const rows = source.x.filter((row) => row.a === 1 && regional.regions.includes(row.r)
    && regional.patterns.some((pattern) => pattern.test(clean(row.d))));
  const idSet = new Set(rows.map((row) => `${row.s}|${row.a}|${row.g}`));
  dag.nodes.push({
    id: regional.id,
    label: regional.label,
    family: null,
    age_group_id: 1,
    region_id: regional.regions.length === 1 ? regional.regions[0] : null,
    region_ids: regional.regions,
    scope: 'regional_structural_exception',
    node_type: 'regionalt_øverste_niveau',
    source_rows: rows.length,
    unique_groups: idSet.size,
    divisions: [...new Set(rows.map((row) => clean(row.d)))].sort(),
    source_families: [...new Set(rows.map((row) => row.f))].sort(),
    coverage: regional.coverage,
    caveat: 'Strukturel oprykningsplads til Danmarksserien; ikke en sportslig sammenligning af spilleform-familier.',
  });
}

const dsId = 'dh_strukturel|Danmarksserien';
if (!dag.nodes.some((node) => node.id === dsId)) throw new Error('104 structural Danmarksserien node missing');

const edgeEvidence = [
  {
    to: 'regional_strukturel|Kredsserie Vest',
    source: 'Badminton Danmarks Holdturneringsreglement 2024 §29 (s. 12): Nordjylland, Midtjylland, Sønderjylland og Fyn har samlet 6 pladser. Reglement for Kredsserien Vest og Serie 1 Vest 2021 §16: nr. 1-2 i to oprykningspuljer direkte; 3/4 krydsspiller om to yderligere pladser.',
    citation_urls: [
      'https://badminton.dk/wp-content/uploads/2024/08/2024-08-14-Holdturneringsreglement-for-badminton-i-Danmark-010724-Marked.pdf',
      'https://badmintoninordjylland.dk/wp-content/uploads/2022/08/Reglement-for-Kredsserien-Vest-og-Serie-1-Vest-2021.pdf',
    ],
    status: 'reglement_bekræftet',
  },
  {
    to: 'regional_strukturel|Sjællandsserien',
    source: 'Badminton Danmarks Holdturneringsreglement 2024 §29 (s. 12): Sjælland har 2 pladser til Danmarksserien.',
    citation_urls: ['https://badminton.dk/wp-content/uploads/2024/08/2024-08-14-Holdturneringsreglement-for-badminton-i-Danmark-010724-Marked.pdf'],
    status: 'reglement_bekræftet',
  },
  {
    to: 'regional_strukturel|LF-Serien',
    source: 'Badminton Danmarks Holdturneringsreglement 2024 §29 (s. 12): Lolland-Falster har 1 plads; hvis den ikke benyttes, går den til Sjælland.',
    citation_urls: ['https://badminton.dk/wp-content/uploads/2024/08/2024-08-14-Holdturneringsreglement-for-badminton-i-Danmark-010724-Marked.pdf'],
    status: 'reglement_bekræftet',
  },
  {
    to: 'regional_strukturel|Københavnsserien',
    source: 'Badminton Danmarks Holdturneringsreglement 2024 §29 (s. 12): København har 2 pladser til Danmarksserien.',
    citation_urls: ['https://badminton.dk/wp-content/uploads/2024/08/2024-08-14-Holdturneringsreglement-for-badminton-i-Danmark-010724-Marked.pdf'],
    status: 'reglement_bekræftet',
  },
  {
    to: 'regional_strukturel|Bornholmsserien',
    source: 'Badminton Danmarks Holdturneringsreglement 2024 §29 (s. 12): Bornholm har 1 plads; hvis den ikke benyttes, går den til København.',
    citation_urls: ['https://badminton.dk/wp-content/uploads/2024/08/2024-08-14-Holdturneringsreglement-for-badminton-i-Danmark-010724-Marked.pdf'],
    status: 'reglement_bekræftet',
  },
];

for (const evidence of edgeEvidence) {
  dag.edges.push({
    stronger_node_id: dsId,
    weaker_node_id: evidence.to,
    family: null,
    relation: 'regional_promotion_place_to_danmarksserien',
    edge_type: 'strukturel_regeltekst_regional',
    evidence: 'regeltekst',
    source: evidence.source,
    citation_urls: evidence.citation_urls,
    status: evidence.status,
    caveat: 'Kun organisatorisk oprykningsvej. Den sammenligner ikke spilleform-familier sportsligt og siger ikke, hvilket konkret hold rykker op.',
  });
}

const nodeById = new Map(dag.nodes.map((node) => [node.id, node]));
const structuralErrors = dag.edges.filter((edge) => edge.edge_type === 'strukturel_regeltekst_regional'
  && (nodeById.get(edge.stronger_node_id)?.scope !== 'national_dh_structural_exception'
    || nodeById.get(edge.weaker_node_id)?.scope !== 'regional_structural_exception'));
if (structuralErrors.length) throw new Error(`Regional structural edge escaped its permitted scopes: ${structuralErrors.length}`);

dag.generated_at = new Date().toISOString();
dag.extends = '104-national-styrke-dag.json';
dag.regional_structural_edges_added = edgeEvidence.length;
dag.unconnected_nodes = dag.nodes.filter((node) => !dag.edges.some((edge) => edge.stronger_node_id === node.id || edge.weaker_node_id === node.id)).map((node) => node.id);
fs.writeFileSync(outputJsonPath, JSON.stringify(dag, null, 2) + '\n');

const sourceTable = `| Reglement/version | Sæson(er), som dokumentet kan bruges for | Regional pladsfordeling | Status |
|---|---|---|---|
| [DH-reglement 2020](https://badminton.dk/wp-content/uploads/2020/08/Holdturneringsreglement-for-badminton-i-Danmark-opdateret-15082020.pdf), §29 s. 13 | 2020/21 | Vest 6; Sjælland 2 + LF 1; København 2 + Bornholm 1 | Direkte regeltekst |
| Ingen fundet selvstændig version | 2021/22 | Ikke interpoleret | Hul |
| [DH-reglement 2022](https://badminton.dk/wp-content/uploads/2022/08/Holdturneringsreglement-for-badminton-i-Danmark-opdateret-120822.pdf), §29 s. 13 | 2022/23 | Samme otte regionale pladser | Direkte regeltekst |
| [DH-reglement 2023](https://badminton.dk/wp-content/uploads/2023/11/Holdturneringsreglement-for-badminton-i-Danmark-091123.pdf), §29 | 2023/24 | Samme otte regionale pladser | Direkte regeltekst |
| [DH-reglement 2024](https://badminton.dk/wp-content/uploads/2024/08/2024-08-14-Holdturneringsreglement-for-badminton-i-Danmark-010724-Marked.pdf), §29 s. 12 | 2024/25 | Samme otte regionale pladser | Direkte regeltekst |
| [DH-reglement 2025](https://badminton.dk/wp-content/uploads/2025/07/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-inkl.-bilag-2025-06-30.pdf), §29 | 2025/26 | Samme otte regionale pladser | Direkte regeltekst |
| [DH-reglement 2026](https://badminton.dk/wp-content/uploads/2026/02/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-02-25.pdf), §29 s. 12 | 2026/27 | Samme otte regionale pladser | Direkte regeltekst |
| Ingen offentlig version fundet i denne gennemgang | 2010/11–2019/20 | Ikke interpoleret | Hul |
| [Kredsserie Vest-reglement 2017](https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=77663), §20 | 2017/18 | Variabelt 4–8 pladser efter vestlige nedrykninger fra 3. division | Direkte regeltekst |
| [Kredsserie Vest-reglement 2021](https://badmintoninordjylland.dk/wp-content/uploads/2022/08/Reglement-for-Kredsserien-Vest-og-Serie-1-Vest-2021.pdf), §16 | Dokumentets egen udgave/ændringsangivelse skal læses forsigtigt; minimum bevis for modellen omkring 2020/21–2021/22 | 4 direkte + 2 kryds-playoff = 6 | Direkte regeltekst |
| [Kredsserie Vest-reglement 2025](https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=99519), §16 | 2024/25–2025/26 | 4 direkte + 2 kryds-playoff = 6 | Direkte regeltekst |`;

const nodeRows = regionalNodes.map((regional) => {
  const node = nodeById.get(regional.id);
  return `| ${node.label} | ${node.region_ids.join(', ')} | ${node.source_rows} | ${node.unique_groups} | ${node.source_families.length} | ${node.coverage} |`;
}).join('\n');

const markdown = `# Opgave 105 — regionale oprykningspladser og reglementer

## Konklusion

Den officielle **DH-regeltekst §29** dokumenterer i de fundne 2020- og 2022–2026-udgaver otte regionale oprykningspladser til Danmarksserien: Vest-kredsene samlet 6, Sjælland 2, Lolland-Falster 1 (til Sjælland ved manglende brug), København 2 og Bornholm 1 (til København ved manglende brug). Det bekræfter Christoffers tre hovedgrupperinger. Der er ikke fundet bevis for en fjerde selvstændig gruppe i de dækkede udgaver.

Kredsserie Vest er **ikke tidsstabil**: 2017/18-reglementet har 4–8 pladser afhængigt af nedrykning fra 3. division, mens de senere dokumenterede udgaver har den bekræftede seks-pladsmodel. Den præcise organisations-/sammenlægningssæson er stadig ikke fundet: en Midtjylland-årsberetning fra 2015 omtaler allerede Kredsserie Vest for de fire kredse vest for Storebælt.

## Kildedækning 2010–2026

${sourceTable}

De ufyldte år er markeret som huller. Nutidige regler er ikke projiceret bagud.

## Regler og belæg

| Regel | Fund | Belæg |
|---|---|---|
| Vestlige pladser | Fire regioner deler 6 DS-pladser i §29. | National DH-regeltekst 2020 og 2022–2026 |
| Kredsserie Vest, nuværende model | To nr. 1 og to nr. 2 rykker direkte; 3/4 krydsspiller om to pladser. | Vest-reglement §16 (2021/2025) |
| Kredsserie Vest, 2017/18 | 4–8 pladser afhængigt af antal vestlige nedrykkere fra 3. division. | 2017-reglement §20 |
| LF-plads | 1 plads; går til Sjælland ved manglende brug. | DH §29 |
| Bornholm-plads | 1 plads; går til København ved manglende brug. | DH §29 |
| Sjælland/København | 2 faste pladser hver. | DH §29 |
| Før-vestlig sammenlægning | Den præcise Fyn/Jylland-fordeling er ikke fundet i en offentlig kilde. | Uafklaret, ikke gættet |

## Kredsserie Vest: sammenlægning

[Badminton Midtjyllands årsberetning 2015](https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=77746) omtaler allerede “Kredsserie Vest” og fire kredse vest for Storebælt. Den dokumenterer derfor navn/aktivitet før den første komplette 2016/17-observation i landskabsdata, men **ikke** etableringsdato eller beslutning. Sammenlægningssæsonen er fortsat ikke afgørbar med den fundne dokumentation.

## DAG-udvidelse

105 bygger oven på 104's 20.145 noder og 8 kanter uden at ændre dem. Fem særskilte regionale strukturnoder og fem strukturelle regeltekst-kanter er tilføjet fra Danmarksserien. De betyder kun en organisatorisk oprykningsvej; de er ikke tværfamilie-styrkerangeringer.

| Regional struktur-node | Region-id'er | Rå forekomster | Unikke puljer | Familiesignaturer | Dokumentdækning |
|---|---|---:|---:|---:|---|
${nodeRows}

## Spilleforms-standard: stikprøvekontrol

105 ændrer ikke standarden. 103/104's metode bruger de faktiske gemte kategorisignaturer og giver derfor ikke automatisk en familie blot ud fra antal holdkampe. De regionale DS-pladser ligger som særskilte strukturkanter netop for ikke at gøre Lolland-Falster/Bornholm eller andre regionale varianter sportsligt sammenlignelige med 13-kategori-rækker. Det er den eksisterende standards korrekte, forsigtige adfærd; ingen mangel blev fundet.

## Fravalgt

- Bornholms konkrete historiske brug af pladsen og detaljerede historiske op-/nedrykningstal er uden for scope.
- Ingen præcis før-sammenlægningsfordeling for Fyn/Jylland indføres uden en offentlig kilde.
- Ingen database er ændret, og ingen kamp-/resultat-API er kaldt.

Maskinlæsbar udvidelse: [105-national-styrke-dag.json](105-national-styrke-dag.json).
`;
fs.writeFileSync(outputMarkdownPath, markdown);
console.log(JSON.stringify({ baseNodes: 20145, baseEdges: 8, nodes: dag.nodes.length, edges: dag.edges.length, regionalEdges: edgeEvidence.length, invalidRegionalStructuralEdges: structuralErrors.length }, null, 2));
