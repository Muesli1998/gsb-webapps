# Opgave 179 — tests der fastholder nuværende adfærd i navne.js, hent-resultater.js og analyse.js (uden at ændre dem)

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10 (plan: `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** generelt · **Bølge:** 1 · **Afhænger af:** — (kan køres nu) · **Netværk:** ingen

**Trin:** Sikkerhedsnet før 029 (F1/F2), 026 (admin-gate) og enhver ny feature: ændres adfærd, ser vi det.

## Gren
`arbejde/179-generelt-snapshot-tests-netlify-funktioner`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Ingen af Netlify-funktionerne har automatiske tests. Roadmap og kode review (2026-09-06) beskriver kendte fejl (F1: walkover kollapses til udesejr; F2: `seenMatches.add` for tidligt; F7: cap på 199 spillere).
- `erWalkover(navne)` blev shippet 2026-09-07 og testet isoleret; testen findes ikke i repoet. `navne.js` indeholder 44-navns facit-listen som aliasopslag.

## Mål
1. Lav `tools/tjek/netlify-funktioner/*.test.mjs` (`node --test`), som indlæser funktionernes kildetekst (uden at ændre dem) i en `vm` med stubs, så filerne ikke skal eksportere noget. Kan en funktion ikke indlæses uden ændring, så skriv det i Spørgsmål.
2. Test `navne.js`: alle 44 facit-navne giver sig selv; hver alias i listen giver det officielle navn; ukendt navn passerer uændret; case/whitespace.
3. Test `erWalkover`: de seks scenarier fra 2026-09-07 (kun den ene side, begge sider, parentes, mellemrum, versaler, ingen).
4. Test `analyse.js`' aggregering på en lille konstrueret `Resultater`-matrix: normale kampe, walkover, vinder '?'. Fastlås F1 og F2 som tests mærket `KENDT FEJL — forventet at fejle indtil 029`; de må ikke gøre testkørslen rød (brug `todo`).

## Afgrænsning
- **Må røres:** nye filer under `tools/tjek/netlify-funktioner/`.
- **Må ikke røres:** alt i `apps/netlify-prod/` (kun læsning), alle databaser.

## Kontrol
- **Målet:** `node --test tools/tjek/netlify-funktioner/` består; antal tests og antal `todo` står i Resultat.
- **Værnet:** `git status --short apps/` er tom. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om F1/F2-testene vil vende til grønne, når 029 er løst.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Kræver en funktion netværk eller Google-nøgler for at køre, så stub dem; hent aldrig rigtige data. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet `tools/tjek/netlify-funktioner/`.

## Resultat
(Udfyldes af Codex.)
