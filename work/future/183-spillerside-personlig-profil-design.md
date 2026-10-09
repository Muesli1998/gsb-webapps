# Opgave 183 — personlig spillerside for trænere og spillere: design (ingen kode)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** spillerside · **Bølge:** 5 · **Afhænger af:** 169, 170, 173 · **Netværk:** ingen

**Trin:** Samler data fra flere emner i én side pr. spiller. Bygger på trænerværktøjet 'performance vs. ranglistepoint' (roadmap A4).

## Gren
`arbejde/183-spillerside-personlig-profil-design`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Datakilder, som findes eller bliver til: ranglistepoint og placering (`rangliste-point.db`), pointserie (169), form (170), kampe og resultater (normalized DB), forventet vinder/performance (173), ELO fra kampsystemet (Sheets `ELO_Spillere`), Dream Team-point.
- Det meste er børn. Alt er offentligt tilgængeligt (Christoffer 2026-10-09), men en side med navngivne børn og 'underperformer' er et designvalg, ikke et dataspørgsmål.

## Mål
1. Skitsér siden som tekst + en simpel HTML-skitse i `docs/183-spillerside-skitse.html` (statiske eksempeldata, ingen netværkskald): øverst nu-stand og række, midt pointkurve + form, kampe med forventet/faktisk, nederst sammenligning med jævnaldrende.
2. Beslut ikke visning af børn: beskriv tre visninger (kun trænere bag kode, spilleren selv, offentlig) og hvilke felter hver må vise.
3. Datakrav pr. element og hvilket kort (163/169/170/173) der leverer det.

## Afgrænsning
- **Må røres:** nye filer: `docs/183-spillerside-design.md` og `docs/183-spillerside-skitse.html`.
- **Må ikke røres:** al kode i `apps/`, alle databaser.

## Kontrol
- **Målet:** Design og skitse findes; hvert element har en navngiven datakilde.
- **Værnet:** `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre. Skitsen åbner uden netværk.
- **Skøn:** (vurdering) om en træner ville kunne bruge skitsen til at sige, hvad der mangler.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Brug ingen rigtige børnenavne i skitsen; brug opdigtede. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de to filer.

## Resultat
(Udfyldes af Codex.)
