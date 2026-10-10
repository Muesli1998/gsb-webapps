# Opgave 172 — rækkegrænser som afledt JSON og test af historiske versioner af liste 287 (højst 10 kald)

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10 (plan: `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** 162 (til kaldene) · **Netværk:** højst 10 kald

**Trin:** Gør 160/161's fund til en maskinlæsbar tabel og afklarer, om grænserne kan følges bagud i tid.

## Gren
`arbejde/172-statistik-raekkegraenser-afledt-og-historik-test`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 160 og 161 målte rækkegrænserne: voksne = kønsplaceringen i reglementets intervaller; U13, U15, U17 har placeringsrækker (U13 M 1–24, M-A 25–48, A fra 49; U15/U17 E 1–24, E-M 25–36, M fra 37 over en pointtærskel) og ellers pointrækker. 550 af 562 passer. Afvigere ligger 1–3 pladser fra en grænse. Hypotese (ikke målt): rækken vurderes kvartalsvis, placeringen opdateres tre gange om ugen.
- Tallene står i prosa i `statistik/AGENTS.md` og i rapporterne. Intet program kan i dag slå en rækkegrænse op.

## Mål
1. Afled `statistik/results/172-raekkegraenser.json` fra 160/161's gemte data: pr. aldersgruppe, køn og række: type (placering/point), nedre/øvre grænse, kilde (kort og fil), og hvor mange spillere der testede den.
2. Test med højst 10 kald, om liste 287 har historiske versioner, der kan hentes (`GetRankingListVersions` gav HTTP 200 i 149): hvor langt tilbage går listen af versioner, og giver en ældre version en placeringsliste? Mål, om grænserne var de samme tidligere.
3. Skriv, hvad der skal til for at teste kvartalshypotesen (hvilke datoer, hvor mange kald), uden at køre den.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only), 160/161-filerne (kun læsning), `statistik/AGENTS.md`.

## Output
- `statistik/scripts/172-raekkegraenser.mjs`
- `statistik/results/172-raekkegraenser.json`
- `statistik/results/172-raekkegraenser.md`
- `statistik/results/172-raa-svar/`

## Kontrol
- **Målet:** JSON'en validerer mod 160/161's tal (550/562 og 322/323 reproduceres). Højst 10 kald. Historik-testen har et klart ja/nej med evidens.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om JSON-formatet kan bruges direkte af en senere webapp.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Reproduceres tallene ikke, så stop og skriv forskellen. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
