# Opgave 178 — Netlify ↔ GitHub-deploy og et /version-endpoint (Del A: undersøgelse og forslag)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** generelt · **Bølge:** 5 · **Afhænger af:** — · **Netværk:** ingen

**Trin:** Del A er kun læsning og forslag. Del B (ændring i `apps/netlify-prod/`) kræver Christoffers eksplicitte godkendelse af den konkrete ændring (BESLUTNINGER 2026-09-19).

## Gren
`arbejde/178-generelt-netlify-github-deploy-og-version`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- I dag deployes `apps/netlify-prod/` ved at Christoffer trækker mappen ind i Netlify (roadmap: 'manuel Netlify-upload'). Det giver intet link mellem en commit og det, der kører, og gør 'er fixet live?' til et spørgsmål, vi kun kan besvare ved Christoffers ord.
- Christoffer har udskudt Netlify-træk-og-slip-deploy indtil videre (2026-10-09). Dette kort rører ikke produktionen.

## Mål
1. Læs `apps/netlify-prod/` (netlify.toml, mappestruktur, functions) og beskriv, hvad en GitHub-forbindelse ville kræve: publish directory, functions directory, build command, miljøvariabler der skal ligge i Netlify (ingen værdier i repoet), og hvad der sker med den eksisterende manuelle deploy.
2. Beskriv to muligheder med fordele og risici: (1) behold manuel deploy, men tilføj en `version.json`/function, der returnerer commit-hash og dato; (2) Netlify bygger fra GitHub-grenen `main` (deploy-preview pr. gren).
3. Lav forslaget til det konkrete diff til Del B som en patchfil `work/future/178-forslag.patch` (ikke anvendt). Christoffer godkender, før den anvendes.
4. Skriv en tjekliste for Christoffer: hvad han skal gøre i Netlify-dashboardet (kun han kan), og hvordan man ruller tilbage.

## Afgrænsning
- **Må røres:** nye filer: `work/future/178-forslag.patch` (ikke anvendt), kortets egen resultatsektion.
- **Må ikke røres:** alt i `apps/netlify-prod/` (Del A), Netlify-indstillinger, miljøvariabler, `docs/BESLUTNINGER.md`.

## Kontrol
- **Målet:** Forslag og patchfil findes og er ikke anvendt (`git status --short apps/` er tom).
- **Værnet:** `git diff --stat` viser ingen ændring i `apps/`. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om mulighed 1 er nok til formålet.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Del B må ikke begynde uden skriftlig godkendelse i kortets Spørgsmål. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet patchfilen.

## Resultat
(Udfyldes af Codex.)
