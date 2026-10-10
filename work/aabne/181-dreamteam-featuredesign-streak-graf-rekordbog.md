# Opgave 181 — Dream Team-features: design af hot streak, runde-graf, rekordbog og forventede point (ingen kode)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** dreamteam · **Bølge:** 5 · **Afhænger af:** helst 173/177 til data og metode · **Netværk:** ingen

**Trin:** Konverterer idébankerne til et beslutningsgrundlag; bygger ingenting.

## Gren
`arbejde/181-dreamteam-featuredesign-streak-graf-rekordbog`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- `docs/idebank-feature.md` og `docs/planlagte-features-spec.md` samler idéerne. Statistik-backend er besluttet til SQLite (BESLUTNINGER 2026-09-15). Deres indhold er ikke gentaget her; læs dem før du skriver.
- Kandidater: hot streak (spillere på stime), runde-for-runde-graf af holdets og spillernes point, rekordbog (flest point i en runde osv.), forventede point pr. spiller (fra ranglistepoint og form).

## Mål
1. Pr. kandidat: formål, hvem bruger det, datakilde (Sheets i dag / SQLite), hvilke felter der findes, hvilke der mangler, beregning i ord og med eksempel på rigtige tal fra 2025/26, indsats (lav/mellem/høj), risiko (fx små tal for børn).
2. Markér afhængigheder: hvilke kræver 163/169/170/173, hvilke kan bygges på eksisterende data i dag.
3. Foreslå en rækkefølge med begrundelse, og hvad Christoffer skal beslutte (inkl. visning af navngivne børn).

## Afgrænsning
- **Må røres:** nye filer: `docs/181-dreamteam-featuredesign.md`.
- **Må ikke røres:** al kode, alle databaser (read-only), idébankerne (læs kun).

## Kontrol
- **Målet:** Alle fire kandidater er beskrevet med datakilde og eksempeltal; afhængighedstabel findes.
- **Værnet:** `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre. Nul netværkskald.
- **Skøn:** (vurdering) om Christoffer kan vælge to features at bygge først ud fra dokumentet alene.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Mangler et felt i dagens data, så skriv 'findes ikke' og hvor det i så fald skulle komme fra. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet dokumentet.

## Resultat
(Udfyldes af Codex.)
