# Opgave 147 — nævnere og rækkemærke til "ren København" i bredden

**Trin:** Bygger på 146 (merget). Lille opfølger, der gør B-målingen brugbar på siden.

## Baggrund
146 giver bredde B (kun rækker, der udelukkende ligger under region 8) som antal GSB-rækker og GSB-formater pr. sæson og årgang. Men siden viser bredde som "GSB i X af Y rækker" og "GSB i X af Y formater", og for B mangler Y: hvor mange rene København-rækker og hvilke formater der findes i alt. Rækkemærke (ren/blandet) findes kun for U15 2026/27 og fem stikprøver. Christoffer har besluttet (2026-10-05): siden viser både A (alle rækker, som nu) og B (kun rene København-rækker).

## Mål
For hver af de 69 kombinationer af sæson og årgang:
1. **Pr. række** (alle region 8-rækker, som i 145): `division_name_raw`, `raekke_type`: `"ren_kbh"` eller `"blandet"`, `regioner` (navne), `included_in_width` (som i 145: UGE 38 og Kredsmatch falder fra), `gsb_med` (om GSB har hold i rækken, som i 145 inkl. holdfællesskab).
2. **Nævnere for B:**
   - `b_rows_total`: antal rene København-rækker, der tæller med i bredden (included_in_width = true).
   - `b_formats_total` og `b_format_names`: de formater, der findes i de rene København-rækker.
   - `b_rows_gsb` og `b_formats_gsb`: skal være identiske med 146 B (rækker og formater).
3. **A-nævnere uændrede:** `a_rows_total` og `a_formats_total` som i 145 (skal matche 145-JSON'en).
4. Regel for "blandet" og "ren_kbh" er 146's: en række er ren, hvis dens samlede regionmængde på tværs af puljer er præcis {8}.

## Output (nye filer, 143–146 står urørte)
- `statistik/scripts/147-bredde-ren-kbh.mjs`
- `statistik/results/147-bredde-ren-kbh.json` (pr. kombination: A-tal, B-tal og nævnere, samt rækkelisten med `raekke_type`)
- `statistik/results/147-bredde-ren-kbh.md` (kort: tabel pr. sæson og årgang med A rækker/formater af totalt og B rækker/formater af totalt)

## Kontrol
- **Målet:** Alle 69 kombinationer har `b_rows_total`, `b_formats_total` og rækkemærke på hver række.
- **Værnet:** A-tal identiske med 145 inkl. holdfællesskab i 69/69. B-tal (GSB-rækker og -formater) identiske med 146 i 69/69. `b_rows_gsb` ≤ `b_rows_total`, og `b_formats_gsb` ≤ `b_formats_total` overalt. Databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `readOnly: true`, `git status --short statistik/data/` tom, `git diff --check` uden fejl. 136-parserens 28 tests består. Rør ikke parserens `.json`- og `.md`-rapporter; kør testen, så de ikke ændres i git (tjek `git status` bagefter, og sig til, hvis de er ændret).
- **Skøn:** U15 2026/27: 3 rene København-rækker (B 6200, C-D 5100, D 4800, alle 4 spillere) og resten blandet, som i 146 afsnit 5. Dertil 2024/25 U13 (B = 1 række, 1 format) og 2012/13 U15 (alle rækker rene).

## Afgrænsning
- Ingen netværk, ingen downloads, ingen databaseændringer.
- Ret ikke 136-parseren, 143–146-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.
- Ingen artifact.

## Ved tvivl
Skriv i "Spørgsmål". Kan en rækkes regionmængde ikke fastslås, så markér den `ukendt` og list den.

## Gren
`arbejde/147-bredde-ren-kbh`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
Resultaterne ligger i `statistik/results/147-bredde-ren-kbh.json` og `.md`; optællingen kan genkøres med `statistik/scripts/147-bredde-ren-kbh.mjs`.

- Alle 69 sæson/årgang-kombinationer har hver region-8-række mærket `ren_kbh` eller `blandet`, med den samlede regionliste, `included_in_width` og `gsb_med`. Klassifikationen bruger unionen af region-id’er på tværs af række-puljerne; `ren_kbh` betyder præcis `{8}`. Ingen af de omfattede rækker havde uafklaret regionmængde.
- B-nævnerne er opgjort pr. kombination: antal rene København-rækker og antal forskellige genkendte formater i disse rækker, efter UGE 38/Kredsmatch-eksklusioner fra 143. Hele rækkelisten og nævnernes formatnavne er i JSON.
- A’s GSB-række-/formattællere matcher 145 inkl. holdfællesskaber i 69/69; B’s GSB-række-/formattællere matcher 146 i 69/69. B-tællere er inden for nævnerne i 69/69. Rækkeniveauets GSB-markeringer blev også summeret og afstemt mod de respektive tællere.
- Stikprøver: U15 2026/27 har B = 3 rækker, 1 format (`4 spillere`); U13 2024/25 har B = 1 række, 1 format (`4 spillere`); U15 2012/13 har B = 5 rækker, 1 genkendt format (`4+3`).
- Afklaring af A-nævner: 145’s JSON indeholder A-bredde som GSB-tællere, ikke totalnævnere. A-nævnerne er derfor beregnet fra 143’s `kbh_width.all_rows`; A-tællerne er kontrolleret direkte mod 145. Det står også i resultatrapporten.
- Parserens 28/28 tests bestod. Testscriptets tre genererede 136-rapporter blev under kørslen undertrykt; de eksisterende 136-rapporter og parserkilden er uændrede. `git status` blev kontrolleret efter testen.
- Begge databaser blev åbnet med `readOnly: true`. SHA-256 og tabelrækketal før/efter er identiske og ligger i JSON; `git status --short statistik/data/` er tom.
- `git diff --check` bestod uden whitespace-fejl. Dets eneste output var Git-advarsler om mulig LF→CRLF-konvertering for allerede statusmarkerede 136-rapportfiler; indholdsdiff for disse filer er tom.
