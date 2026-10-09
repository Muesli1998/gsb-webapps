# Opgave 175 — ugentlig, genoptagelig opdatering af GSB-kampe i 2026/27

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 3 · **Afhænger af:** 163 · **Netværk:** ca. 20–60 kald pr. kørsel (regnes i planen)

**Trin:** Gør 163 til en rutine, Christoffer selv kan køre efter hver spilleuge.

## Gren
`arbejde/175-statistik-ugentlig-opdatering-2026-27`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 155 beskrev en idempotent rutine: sæson + kamp-ID som nøgle; nye og ændrede kampe findes ved at sammenligne kampliste med databasen; fejl og kendte undtagelser bevares.
- Efter hver import: de fem kontrolscripts og Dropbox-kopi (`statistik/AGENTS.md`).

## Mål
1. Byg `tools/opdater-kampe.mjs`: finder GSB-kampe med dato i fortiden uden resultat i databasen, henter kun dem plus kampe, hvis kamplisten viser ændret resultat, og skriver dem. Tør-kørsel (`--dry`) viser, hvad der ville ske, uden skrivning og uden detaljekald.
2. Sikkerhedskopi før hver skrivende kørsel (rullende, de seneste 5).
3. Kører kontrolscripts, kopierer til Dropbox, skriver en linje i `TEST_RUN_LOG.md` og opdaterer normalized-linjen i `HASHES.txt`.
4. Prøvekør én gang efter en rigtig spilleuge med Christoffer til stede; rapportér kald, nye/ændrede kampe og tid.

## Afgrænsning
- **Må røres:** `tools/opdater-kampe.mjs`, `statistik/data/gsb-statistik-normalized.db` (kun rækker for sæson 2026), `statistik/TEST_RUN_LOG.md` (kun tilføjelse), `statistik/HASHES.txt` (kun normalized-linjen), Dropbox-kopien.
- **Må ikke røres:** de fire andre databaser, rækker for ældre sæsoner, `apps/netlify-prod/`.

## Output
- `tools/opdater-kampe.mjs`
- `statistik/results/175-opdateringsrutine.md`

## Kontrol
- **Målet:** To kørsler i træk: den anden giver 0 nye og 0 ændrede. `--dry` skriver intet (hash uændret). Undtagelserne uændrede.
- **Værnet:** Rækker for sæson ≤2025 uændret. De fire andre databasers hash uændret. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om rutinen er enkel nok til, at Christoffer kan køre den uden Codex.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Kamp-ID'er der pludselig ændrer sig mellem uger: stop og skriv det. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Gendan fra den sidste rullende sikkerhedskopi.

## Resultat
(Udfyldes af Codex.)
