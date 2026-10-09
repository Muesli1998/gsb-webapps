# Opgave 180 — Dream Team forsiden: ny rækkefølge nu hvor tilmeldingen er slut (Del A forslag, Del B anvendelse)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** dreamteam · **Bølge:** 5 · **Afhænger af:** — · **Netværk:** ingen

**Trin:** Rører `apps/netlify-prod/` kun i Del B og kun efter Christoffers eksplicitte godkendelse.

## Gren
`arbejde/180-dreamteam-forside-raekkefoelge`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Roadmap: forsidens siderækkefølge er principielt godkendt men sat på pause. 2026-10-09 (BESLUTNINGER): tilmelding er slut, så rækkefølgen må ændres, når Christoffer siger det. Ønsket rækkefølge nævnt i samtalen: Historisk stilling, Statistik, Tilmelding, Admin.
- Ukendt: hvilken fil styrer forsidens rækkefølge (roadmap nævner `index.html` som Admin-siden).

## Mål
1. Del A: find filen og stedet, der styrer rækkefølgen. Skriv linjerne, og lav en patchfil `work/future/180-forslag.patch` (ikke anvendt) med rækkefølgen Historisk stilling → Statistik → Tilmelding → Admin. Tilføj en 'tilmelding lukket'-markering kun hvis siden allerede har tekst til det; opfind ikke tekst.
2. Skriv hvad der ændres på siden (tekst, links), og hvad der ikke gør.
3. Del B (kun efter 'godkendt' fra Christoffer i Spørgsmål): anvend patchen, kør `node --check` og `tools/tjek/netlify-funktioner/` (kort 179, hvis den findes), og beskriv deploytrinnet for Christoffer.

## Afgrænsning
- **Må røres:** Del A: kun patchfilen. Del B: kun de linjer patchen viser i `apps/netlify-prod/`.
- **Må ikke røres:** alle andre filer i `apps/netlify-prod/`, tilmeldingslogik, Google Sheets.

## Kontrol
- **Målet:** Patchen er læsbar og ændrer kun rækkefølge (og evt. eksisterende tekst). Efter Del B: `git diff --stat apps/` viser kun den ene fil.
- **Værnet:** `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om siden stadig er forståelig for en spiller, der besøger den.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Del B kræver skriftlig godkendelse. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
`git checkout` på filen.

## Resultat
(Udfyldes af Codex.)
