# Opgave 177 — B3 'effektivitet': sammenlign rangeringsmetoder på rigtige data (kun læsning)

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10 (plan: `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** dreamteam · **Bølge:** 1 · **Afhænger af:** — (kan køres nu) · **Netværk:** ingen

**Trin:** Klargør Christoffers metodevalg (roadmap punkt 7): Bayes, Wilson, minimumsgrænse eller ELO.

## Gren
`arbejde/177-dreamteam-b3-effektivitet-metodesammenligning`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Roadmap punkt 7: 'værdi' (total fantasy-point) og 'effektivitet' (Bayesiansk justeret vindprocent) er valideret, men metodevalget for effektivitet er ikke låst.
- BESLUTNINGER 2026-09-15: B3's backend bliver `statistik/`-SQLite i stedet for Sheets `AlleResultater`; B3's frontend-design står uændret.
- Data: individuelle GSB-kampe 2025/26 i `gsb-statistik-normalized.db` (1.582 ungdomsrækker; find antal for alle aldre med en forespørgsel).

## Mål
1. For spillere med ≥N kampe (prøv N = 5, 10, 20): rangér efter (a) rå vindprocent, (b) Bayes-justeret, (c) Wilson nedre grænse (95 %), (d) minimumsgrænse + rå vindprocent, (e) en simpel ELO over kampene i datoorden.
2. Mål stabilitet: del kampene i to halvdele (lige/ulige, og første/anden halvdel af sæsonen) og beregn rangkorrelation mellem halvdelene pr. metode; hvem skifter mest.
3. Mål følsomhed: walkovers ind/ud, dobbelt/single, modstanderstyrke (hvis point kendes), hvor mange spillere en metode udelukker.
4. Vis top-10 pr. metode for én sæson, og peg på spillere der skifter mere end 5 pladser mellem metoder.
5. Beslutningsark til Christoffer: 1 side med anbefaling (vurdering) og hvad hver metode gør forkert.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only), `apps/netlify-prod/`, analyse.js.

## Output
- `statistik/scripts/177-effektivitet-metoder.mjs`
- `statistik/results/177-effektivitet-metoder.md/.json`

## Kontrol
- **Målet:** Fem metoder × tre N-værdier med rangkorrelation og tal. Walkover-håndtering dokumenteret.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). Nul netværkskald. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) hvilken metode der er mest stabil og forklarlig for spillere.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Er en kamps udfald ukendt (ikke vindermarkør), så udeluk den og tæl den. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
