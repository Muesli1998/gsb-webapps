# Opgave 173 — forventet vinder og performance mod ranglistepoint (højst 150 kald)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 4 · **Afhænger af:** 163 (kampe), 164 (stamdata), 168 (anbefaling); bygger på 156 · **Netværk:** højst 150 kald

**Trin:** Det oprindelige mål: hvem forventes at vinde, og hvem over-/underpræsterer? Trænerværktøjets A4-idé.

## Gren
`arbejde/173-statistik-forventet-vinder-og-performance-mod-ranglistepoint`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 156 lavede en backtest af forventet vinder på ranglistepoint (`statistik/results/156-*`). Læs den og hold resultatet som udgangspunkt.
- 2026/27-kampe er ikke i den normaliserede DB før 163; 2025/26 har 1.582 individuelle rækker for GSB-ungdom.
- Ranglistepoint ved kampdatoen: `points_at_match` er tomt overalt (148). Point ved dato kan hentes via ugentlige versioner (158b) eller eventtabellens serie (169).

## Mål
1. **Plan først:** hvilke kampe (2025/26 og 2026/27), hvor mange modstandere mangler point ved dato, kaldloft.
2. Beregn for hver individuel kamp en forventet vinder efter (a) pointforskel, (b) tilmeldingsniveau/række (157–161), (c) pointforskel med formindikator (170), hvis den findes.
3. Mål træfsikkerhed og kalibrering pr. metode, opdelt på disciplin, aldersgruppe og pointforskel. Sammenlign med 156.
4. Per spiller: præstation over/under forventet (sum af faktisk minus forventet), med usikkerhed, og minimumsantal kampe. Ingen rangering af spillere med for få kampe.
5. Anbefal, hvad der kan vises for trænere, og hvad der ikke tåler offentliggørelse (små tal, børn).

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only), `apps/netlify-prod/`, 156-filerne (kun læsning).

## Output
- `statistik/scripts/173-forventet-vinder.mjs`
- `statistik/results/173-forventet-vinder.md/.json`

## Kontrol
- **Målet:** Træfsikkerhed pr. metode med antal kampe; kalibreringstabel; spillerliste med konfidensinterval. Højst 150 kald.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om den bedste metode slår "højeste point vinder" tydeligt, og med hvor meget.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Mangler modstanders point ved dato for mere end 20 % af kampene, så stop og skriv, hvad der skal hentes først. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
