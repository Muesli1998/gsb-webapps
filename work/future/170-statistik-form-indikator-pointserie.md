# Opgave 170 — formindikator ud fra pointtidsserien (30 og 90 dage) — design og måling

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 3 · **Afhænger af:** 169 · **Netværk:** ingen

**Trin:** Kun læsning af den nye database fra 169 og af `rangliste-point.db`.

## Gren
`arbejde/170-statistik-form-indikator-pointserie`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Form = udvikling i en spillers point. Pointserien (169) er spillerens stand FØR hvert event; den aktuelle stand kommer fra seneste ranglisteversion i `rangliste-point.db`. Det betyder: den sidste events effekt er ikke i serien før næste event.
- 158b: ca. 10 % af ugerne havde pointændring uden event. Serien kan altså tabe ændringer; det skal måles, ikke antages væk.

## Mål
1. Definér to kandidat-indikatorer: ændring over 30 og over 90 dage (point nu minus point på dato−N dage, med regel for manglende datapunkter). Dokumentér reglen.
2. Mål dækning: for hvor stor en andel af spillerne og datoerne kan indikatoren beregnes, og med hvilken usikkerhed.
3. Test, om indikatoren siger noget: korrelér form ved kampstart med resultat/pointændring i den følgende kamp (2025/26, hvor data findes; ellers skriv, hvad der mangler). Sammenlign med at bruge point alene.
4. Anbefal definition og visning (fx op/ned/flad med tærskel) og hvilke spillere der er for få data til at vises.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only), `apps/netlify-prod/`.

## Output
- `statistik/scripts/170-formindikator.mjs`
- `statistik/results/170-formindikator.md/.json`

## Kontrol
- **Målet:** Definition og dækning målt med tal; testen har et antal kampe og en effektstørrelse (eller "for lidt data").
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). Nul netværkskald. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om formindikatoren er værd at vise til trænere.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Er stikprøven for lille til at konkludere, så skriv det, med antal. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
