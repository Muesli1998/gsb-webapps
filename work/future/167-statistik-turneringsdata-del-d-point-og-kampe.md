# Opgave 167 — turneringsdata Del D: hænger pointændringen sammen med kampene? (højst 20 kald)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 2 · **Afhænger af:** 165, gerne 166 · **Netværk:** højst 20 kald

**Trin:** Bygger bro mellem 158b (pointændring uden/med event) og kampresultater: hvad betyder en sejr eller et nederlag for en spillers point?

## Gren
`arbejde/167-statistik-turneringsdata-del-d-point-og-kampe`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 158b (8 ungdomsspillere, 2025/26) viste: eventtabellen er en tidsserie af spillerens egne point (første tal = stand FØR eventet). 103 uger med ændring og event, 12 med ændring uden event, 4 med event uden ændring, 237 uden begge. Stikprøven er lille og ung; voksne er ikke undersøgt.
- Rå data fra 158b ligger i `statistik/results/158b-raa-svar/` (392 ugentlige stande + 49 mandagsversioner pr. spiller).
- Pointskalaen er et åbent spørgsmål (kort 097, 137). Skriv "ukendt" for alt, der ikke kan læses direkte af data.

## Mål
1. Vælg højst 5 af 158b's spillere og højst 5 turneringer fra 171/165, hvor de optræder. Hent kampene (højst 20 kald i alt).
2. For hver spiller og turnering: kampene (modstander, resultat, runde) mod ændringen i spillerens point fra ugen før til ugen efter eventet (offline fra 158b-data).
3. Beskriv mønstre: ændring ved sejr/nederlag, afhængig af modstanderens point? Rundens betydning? Hvor ændringen er 0 trods kampe. Kun observationer; ingen formel presses ud af 5 turneringer.
4. Forklar de 12 uger med ændring uden event ud fra de nye data, hvis muligt; ellers "ukendt".
5. Konklusion: hvad kan vi sige med den evidens, og hvilken stikprøve ville være nødvendig for at fastlægge en regel (størrelse og kaldpris).

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only), `158*`-filerne (kun læsning), `apps/netlify-prod/`.

## Output
- `statistik/scripts/167-turneringsdata-del-d.mjs`
- `statistik/results/167-turneringsdata-del-d.md/.json`
- `statistik/results/167-raa-svar/`

## Kontrol
- **Målet:** Højst 20 kald. Pr. spiller/turnering en tabel med kampe og pointændring. Hver påstand er mærket "observeret" eller "ukendt".
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om en formel pointregel kan udledes. Forventet svar: nej ud fra så få data, men kortet skal sige det med tal.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Afviger pointændringen markant fra kampene, så gæt ikke på årsagen; list alternativerne. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
