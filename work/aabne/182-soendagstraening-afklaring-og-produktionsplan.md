# Opgave 182 — Søndagstræning: afklar grundspørgsmålene og lav en produktionsplan (ingen kode)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** soendagstraening · **Bølge:** 5 · **Afhænger af:** helst 164 (spillerliste fra stamdata) · **Netværk:** ingen

**Trin:** Gør en færdig preview til en app, der kan sættes i produktion.

## Gren
`arbejde/182-soendagstraening-afklaring-og-produktionsplan`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Roadmap: hele appen er bygget i preview med en genbrugelig kodeords-gate og er bevidst udeladt af produktions-nav'en. Tre grundspørgsmål er ubesvarede: hvor kommer den rigtige spillerliste fra, skal der være historik, og skal adgangen være ét fælles kodeord eller personlige.
- Christoffer skal selv skaffe klubbens holdliste (blokerer B4 Fase 4, trænings-skabeloner).

## Mål
1. Læs preview-koden for Søndagstræning (find filen) og beskriv, hvad appen i dag gør, hvad den gemmer, og hvor.
2. For hvert af de tre spørgsmål: 2–3 løsninger med fordele/ulemper (fx spillerliste fra stamdata 164 vs. Spillerpoint-arket; historik i Sheets vs. SQLite; ét kodeord vs. personlige).
3. Skriv en produktionsplan i trin (hvad skal kopieres til `apps/netlify-prod/`, hvad testes, hvordan rulles tilbage), og stil Christoffer højst fire spørgsmål.

## Afgrænsning
- **Må røres:** nye filer: `docs/182-soendagstraening-plan.md`.
- **Må ikke røres:** al kode, `apps/netlify-prod/`.

## Kontrol
- **Målet:** Appens nuværende funktion er beskrevet med filnavne; tre spørgsmål × løsninger; produktionsplan med tilbagerulning.
- **Værnet:** `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om planen kan udføres af én Codex-kørsel pr. trin.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Findes preview-koden ikke i repoet, så stop og skriv det. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet dokumentet.

## Resultat
(Udfyldes af Codex.)
