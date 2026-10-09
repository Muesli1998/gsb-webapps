# Opgave 169 — hent eventtabeller for alle GSB-spillere ind i en ny database (rangliste-events.db)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 3 · **Afhænger af:** 162, 164; gerne 168 (afklaret omfang) · **Netværk:** loft sættes i planen (forventet ≤400)

**Trin:** Skriver en NY database; rører ingen eksisterende. Giver pointtidsserier pr. spiller, grundlag for form (170) og kamp-/rangliste-analyser (173).

## Gren
`arbejde/169-statistik-eventtabeller-alle-gsb-spillere`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 158 og 158b viste: eventtabellen på en spillers profil er en tidsserie af spillerens egne point (pointværdien er standen før eventet), med et link pr. række til turnering eller holdkamp. Ca. 10 % af ugerne havde pointændring uden event (158b, lille ungdomsstikprøve).
- Webservicekaldet er `GetRankingListPlayers` med `playerid` og `getplayerdata`; 158's script `statistik/scripts/158-turneringer.mjs` har den fungerende parser; genbrug den (kopiér, ret ikke originalen).
- Ukendt: hvor mange sæsoner én eventtabel dækker, og om `seasonid` skal itereres. Afprøves på 5 spillere først.

## Mål
1. **Plan først:** udtræk spillerlisten fra stamdata (164): alle GSB-spillere med rangliste-`playerid`, aktive siden 2023/24. Regn kaldloftet (forventet ≤400) og skriv det i rapporten.
2. **Pilot:** 5 spillere, sæson 2025/26 og 2024/25 (10 kald). Afgør, om én eventtabel dækker flere sæsoner. Stop og skriv i Spørgsmål, hvis planen skal ændres.
3. **Fuld hentning** efter piloten, med genoptagelse (`genoptag`), rå svar som gz, og én log.
4. **Database `statistik/data/rangliste-events.db`** (NY, git-ignoreret, kopieres til Dropbox): `spiller`, `event` (spiller, dato, type, link-id, navn, egne point før eventet, rå rækkehash), `pointserie` (spiller, dato, point, kilde), `hentelog`. Notér sæsonskifte- og "Afbud"-rækker som egne typer, ikke kampe.
5. Kontroller: antal spillere/rækker, dubletter 0, rækker uden dato 0, for 5 stikprøver sammenlignes mod den offentlige side. Skriv databasens SHA-256 og opdatér `statistik/HASHES.txt` med en ny linje.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`, den NYE `statistik/data/rangliste-events.db`, en ny linje i `statistik/HASHES.txt`, Dropbox-kopien.
- **Må ikke røres:** de fem eksisterende databaser, `158*`-filerne, `apps/netlify-prod/`.

## Output
- `statistik/scripts/169-eventtabeller-gsb.mjs`
- `statistik/results/169-eventtabeller-gsb.md/.json`
- `statistik/results/169-raa-svar/`

## Kontrol
- **Målet:** Databasen findes og består kontrollerne. Pilotens resultat og kaldloftet står i rapporten. Kaldantal ≤ loft.
- **Værnet:** De fem eksisterende databasers SHA-256 uændrede (`node tools/tjek/db-hashes.mjs`). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) fem tilfældige spillere: rækker i databasen mod den offentlige profil (Christoffer tjekker, hvis han vil).

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Mere end 10 % af kaldene fejler, eller svaret ændrer format: stop og skriv det. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet `rangliste-events.db`, de nye filer og linjen i `HASHES.txt`. Eksisterende databaser er ikke berørt.

## Resultat
(Udfyldes af Codex.)
