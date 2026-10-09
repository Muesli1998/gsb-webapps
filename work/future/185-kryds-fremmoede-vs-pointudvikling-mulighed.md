# Opgave 185 — kan fremmøde kobles til pointudvikling? (undersøg hvilke data der findes)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 5 · **Afhænger af:** 164, 169; Christoffers svar om fremmødedata · **Netværk:** ingen

**Trin:** Små undersøgelse af muligheden før nogen bygger noget.

## Gren
`arbejde/185-kryds-fremmoede-vs-pointudvikling-mulighed`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Idé: spillere der træner mere, udvikler sig mere? Ukendt, om der findes fremmødedata overhovedet: Kampsystemet har sessioner, Søndagstræning (preview) har måske tilstedeværelse, Dream Team har tilmeldinger. Hvad der gemmes og hvor længe er ikke undersøgt.

## Mål
1. Find og beskriv, hvilke steder i repo og Sheets-skemaer der gemmer tilstedeværelse (kode og dokumenter; ingen læsning af rigtige Sheets). Spørg Christoffer, hvis et ark skal kigges i.
2. For hver kilde: periode, antal spillere, om navne matcher stamdata (164), om data bevares over sæsoner.
3. Konklusion: gør/gør ikke det muligt at måle sammenhængen i 2026/27, og hvad der skal begynde at blive gemt nu, hvis ikke.

## Afgrænsning
- **Må røres:** nye filer: `docs/185-fremmoede-mulighed.md`.
- **Må ikke røres:** al kode, alle databaser, Sheets.

## Kontrol
- **Målet:** Kilde-tabel med periode/antal; tydeligt ja/nej til målbarhed.
- **Værnet:** `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om en beslutning om at begynde at gemme fremmøde er nødvendig nu.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Alt der ikke kan ses i repoet, er 'ukendt'. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet dokumentet.

## Resultat
(Udfyldes af Codex.)
