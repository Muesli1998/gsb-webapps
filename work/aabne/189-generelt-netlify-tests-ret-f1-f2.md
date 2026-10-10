# Opgave 189 — ret testene fra kort 179: F1-testen finder ikke F1, F2 ser ud til at være rettet

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10.  
**Kategori:** generelt · **Bølge:** 1 · **Afhænger af:** 179 (er kørt) · **Netværk:** ingen

**Trin:** Opfølgning på 179. Rører kun testfilen og (kun tekst) kort 029.

## Gren
`arbejde/189-generelt-netlify-tests-ret-f1-f2`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 179 leverede `tools/tjek/netlify-funktioner/netlify-funktioner.test.mjs`: 12 tests, 10 består, 2 er `todo` (F1 og F2). Begge todo-tests består, hvilket betyder, at de ikke fanger fejlene.
- F1 (`hjemmeWon = vinder === 'Hjemme'` i `analyse.js`) er stadig i koden: en række med GSB som hjemmehold og vinder `?` tælles som tab. Testen bruger i stedet en række med `Ikke fremmødt` som hjemmeside og vinder `Ude`, hvilket giver et korrekt udfald.
- F2 (`seenMatches.add` før tjek af kendt spiller): `analyse.js` har nu et separat `countedMatches`, og tællingen sker kun, når en side er en kendt spiller. Hver singlerække er sit eget board. F2 ser derfor ud til at være rettet siden kortet 029 blev skrevet. Det er ikke bevist; det skal testen afgøre.
- Testen `analyse aggregation: ordinary home and away wins plus unknown winner` forventer 1 sejr og 2 nederlag, hvor rækken med vinder `?` tælles som tab. Den fastholder altså F1 som nuværende adfærd. Det er meningen med en snapshot-test, men det skal stå i navnet.

## Mål
1. F1-testen: brug en række med en kendt GSB-spiller som hjemmehold og vinder `?`, og kræv at den hverken tælles som sejr eller tab (`wins` og `losses` begge 0 for holdet). Behold `todo` med teksten `Forventet at fejle indtil 029`. Kør og bekræft, at den nu FEJLER som todo (output skal vise `not ok ... # TODO`).
2. F2-testen: byg to fixtures, der svarer til F2's beskrivelse i `docs/analyse-js-code-review-2026-09-06.md` (afsnit F2): (a) en singlerække hvor begge sider er ukendte og en række bagefter på samme board; (b) en doubleblok (`HD`, to rækker pr. board), hvor første række er ukendt på begge sider og anden række har en kendt spiller. Vis for begge, om boardet tælles. Er F2 rettet i begge, så gør testen til en almindelig test (ikke todo) med forventning om, at boardet tælles. Fejler (a) eller (b), så behold `todo`. Skriv resultatet pr. fixture i Spørgsmål.
3. Omdøb den første analyse-test, så navnet fortæller, at den fastholder nuværende (fejlbehæftede) opførsel for vinder `?` (fx `snapshot: vinder '?' tælles i dag som tab (F1)`).
4. Fjern den ubrugte konstant `analyse` (første `load(...analyse.js...)` før `runAnalyse`).
5. Kør `node --test tools/tjek/netlify-funktioner/*.test.mjs` og vis antal tests, bestået, fejlet og todo.
6. Hvis F2 er rettet i begge fixtures: tilføj under `## Baggrund` i `work/future/029-dreamteam-analyse-js-f1-f2-fix.md` én linje: `Opdatering 2026-10-10 (kort 189): F2 er rettet i analyse.js (countedMatches); kun F1 mangler.` Rør ikke resten af 029.

## Afgrænsning
- **Må røres:** `tools/tjek/netlify-funktioner/netlify-funktioner.test.mjs`, `work/future/029-dreamteam-analyse-js-f1-f2-fix.md` (kun den ene linje), dette korts Spørgsmål og Resultat.
- **Må ikke røres:** alt i `apps/netlify-prod/` (kun læsning), alle databaser, andre kort.

## Kontrol
- **Målet:** Testkørslen viser 0 fejlede. F1-testen er todo og FEJLER som todo. F2-testen er enten almindelig og består, eller todo og fejler som todo, med dokumenteret fixture. Ingen ubrugt `analyse`-konstant.
- **Værnet:** `git status --short apps/` er tom. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om de nye fixtures faktisk svarer til fejlbeskrivelserne i code review-rapporten.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Kan F2 ikke afgøres ud fra koden, så skriv det og lad testen stå som todo. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
`git checkout` på testfilen og 029.

## Resultat
(Udfyldes af Codex.)
