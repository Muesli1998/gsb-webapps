# Opgave 166 — turneringsdata Del C: oversigt over turneringer i en sæson (højst 20 kald)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 2 · **Afhænger af:** 165 · **Netværk:** højst 20 kald

**Trin:** Afgør, om vi kan få en komplet liste over turneringer og klasser, og hvad en hel sæson koster i kald.

## Gren
`arbejde/166-statistik-turneringsdata-del-c-saesonoversigt`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 165 viser, hvordan en klasses kampe hentes. Mangler: hvordan finder man alle turneringer og klasser i en sæson (eller for en klub), i stedet for kun dem vi ser i spillernes eventtabeller?
- 171 har udtrukket alle turnerings- og holdkamp-link set i eventtabellerne (`171-turneringer-fra-eventtabeller.csv`). Det er en nedre grænse: kun turneringer, hvor de scannede spillere deltog.

## Mål
1. Brug ruten fra 165 (og `SearchTournamentClass`, hvis 165 fandt de rigtige parametre) til at hente turnerings- og klasseoversigten for én afgrænset del af 2025/26 (fx én måned eller én region; vælg ud fra 165 og skriv valget).
2. Sammenlign med 171's liste: hvor mange af de turneringer, GSB-spillerne er set i, findes i oversigten, og hvor mange findes kun den ene vej?
3. Beskriv strukturen: turnering → klasse → event → kamp, med talområder, og hvad der skiller ungdom fra senior.
4. Estimér kald for en hel sæson (A: kun turneringer med GSB-spillere, B: alle i Sjælland/Region, C: hele landet) og anbefal en afgrænsning.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only), gamle scripts, `apps/netlify-prod/`.

## Output
- `statistik/scripts/166-turneringsdata-del-c.mjs`
- `statistik/results/166-turneringsdata-del-c.md/.json`
- `statistik/results/166-raa-svar/`

## Kontrol
- **Målet:** Højst 20 kald. Overlap-tallene mellem oversigten og 171-listen står i rapporten. Kaldestimatet for A/B/C er regnet med tal fra kørslen, ikke gættet.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om oversigten er komplet nok til, at 168 kan anbefale ja/nej til en fuld sæsonhentning.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Findes ruten ikke (HTTP 500 for alle varianter), så skriv det som resultat og foreslå alternativet (kun turneringer set i eventtabeller). Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
