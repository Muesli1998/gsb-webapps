# Opgave 187 — bestyrelsesoverblik: kandidatnøgletal fra de eksisterende data (kun aggregater)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 5 · **Afhænger af:** 164; 163 for aktuel sæson · **Netværk:** ingen

**Trin:** Giver Christoffer og bestyrelsen et overblik over klubbens spillere og udvikling, uden at pege på enkeltpersoner.

## Gren
`arbejde/187-kryds-bestyrelsesoverblik-design`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Data i dag: ranglistepoint for alle GSB-spillere (`rangliste-point.db`), 2025/26-kampe (normalized DB), liga-landskab (alle puljer), nationale spillere. Aggregater er ikke personhenførbare.

## Mål
1. Lav 10–15 kandidatnøgletal, fx spillere pr. aldersgruppe og køn, fordeling over rækker, antal hold pr. række og sæson, udvikling i klubbens placering i ligaer, andel nye spillere pr. sæson, antal kampe pr. spiller.
2. Pr. nøgletal: SQL (read-only), tal for 2025/26, og om det kan opdateres automatisk.
3. Foreslå en side med 6–8 tal og begrund dem. Tal under 5 personer vises ikke enkeltvis.

## Afgrænsning
- **Må røres:** nye filer: `statistik/scripts/187-nogletal.mjs`, `statistik/results/187-nogletal.md/.json`.
- **Må ikke røres:** alle databaser (read-only), `apps/`.

## Kontrol
- **Målet:** Hvert nøgletal har en forespørgsel og et tal; små celler (<5) er skjult i alle tabeller.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). Nul netværkskald. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om tallene besvarer spørgsmål en bestyrelse faktisk stiller.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Er en definition uklar (fx 'aktiv spiller'), så vælg ikke; skriv de mulige definitioner. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
