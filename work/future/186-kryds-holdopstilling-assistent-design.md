# Opgave 186 — holdopstillings-assistent: design og backtest på 2025/26 (ingen webapp)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 5 · **Afhænger af:** 164, 169, 170, 172; helst 173 · **Netværk:** ingen

**Trin:** Samler række-regler, ranglistepoint, form og tilgængelighed til et forslag til opstilling.

## Gren
`arbejde/186-kryds-holdopstilling-assistent-design`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Rækkereglerne (tilmeldingsniveau, placeringsrækker, pointrækker) er målt i 157–161 og kan blive en JSON (172). Pointserie og form: 169, 170.
- Spørgsmålet fra trænere er: 'hvem skal spille hvilken kategori i næste kamp?' Reglement for opstilling: se regelbogen (131) og kort 114 (opstillingskrav).

## Mål
1. Beskriv inddata (spillerliste, hvem er tilgængelig, kampens række), regler (ranglisterækkefølge, kønskrav, maks. forskel), og det foreslåede output.
2. Backtest uden webapp: for 2025/26 GSB-kampe, sammenlign den reelle opstilling med assistentens forslag. Hvor ofte er de ens, hvor afviger de, og overtræder de reelle opstillinger reglerne (kan være tegn på en regelfejl hos os)?
3. Skriv en kravspecifikation til en lille webapp og en liste over spørgsmål til trænerne.

## Afgrænsning
- **Må røres:** nye filer: `docs/186-holdopstilling-design.md`, `statistik/scripts/186-backtest.mjs`, `statistik/results/186-backtest.md/.json`.
- **Må ikke røres:** alle databaser (read-only), `apps/`.

## Kontrol
- **Målet:** Backtest-tal (antal kampe, andel ens, antal regelafvigelser) og specifikation.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). Nul netværkskald. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om assistenten ville have givet trænerne nyttige forslag.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Er et reglement uklart, så skriv det som spørgsmål; gæt ikke. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
