# Opgave 168 — turneringsdata Del E: skema, pris og anbefaling (kun læsning, ingen kald)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 3 · **Afhænger af:** 165, 166, 167 · **Netværk:** ingen

**Trin:** Beslutningsgrundlag til Christoffer: skal vi bygge en turneringsdatabase, og hvordan?

## Gren
`arbejde/168-statistik-turneringsdata-del-e-skema-og-anbefaling`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Beslutning 2026-10-09: en ny database til events/turneringer er tilladt.
- Rutens egenskaber, id-model, felter og kaldpris er fundet i 165–167; dette kort samler dem til én anbefaling.

## Mål
1. Skriv et databaseskema (tabeller, nøgler, kolonner) til turneringsdata: `turnering`, `klasse`, `event`, `kamp`, `kamp_spiller`, `hentelog`, med kobling til stamdata (164).
2. Regn pris: kald og tid for (A) turneringer med GSB-spillere, (B) region, (C) land; plus ugentlig opdatering.
3. Gevinsten: hvad turneringskampe giver, som eventtabellerne ikke giver (modstander, resultat, runde), og hvilke kort (fx 173) der kræver dem.
4. Anbefaling med begrundelse: ja/nej/senere og hvilket omfang. Mærk anbefalingen som vurdering. Listen over, hvad Christoffer skal beslutte.

## Afgrænsning
- **Må røres:** nye filer under `statistik/results/`.
- **Må ikke røres:** alle databaser, alle scripts.

## Output
- `statistik/results/168-turneringsdata-anbefaling.md`

## Kontrol
- **Målet:** Skema, prisregnskab og anbefaling findes; hvert tal i prisregnskabet kan spores til 165–167.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). Nul netværkskald. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om anbefalingen er et beslutningsgrundlag, Christoffer kan sige ja/nej til i ét svar.

## Ved tvivl
Er et tal fra 165–167 ikke efterprøvet, så skriv det som ukendt, ikke som skøn. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet den nye fil.

## Resultat
(Udfyldes af Codex.)
