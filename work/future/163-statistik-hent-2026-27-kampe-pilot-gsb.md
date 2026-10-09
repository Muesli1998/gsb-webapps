# Opgave 163 — hent GSB's holdkampe i sæson 2026/27 ind i den normaliserede database (scope A)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 2 · **Afhænger af:** 162 (hente-bibliotek), helst 164 (stamdata) · **Netværk:** ca. 330 kald (loft sættes i Trin 1)

**Trin:** Skrivende import. Første af to kort om 2026/27-kampe; 175 er den ugentlige opdatering bagefter.

## Gren
`arbejde/163-statistik-hent-2026-27-kampe-pilot-gsb`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 155 viste: `gsb-statistik-normalized.db` har 0 competitions, 0 teams og 0 team_matches for 2026/27 (2025/26: 73, 77 og 400). `national-spillere.db` har 253 GSB-ungdomskamprækker for 2026/27, men det er ikke en import til den normaliserede DB.
- 155's kaldestimat for scope A (kun GSB-holdkampe) er 326 kald (Teams + Fights + én detalje pr. kamp), scope B (hele GSB-puljer) 865, scope C mindst 8.235 plus discovery. 155 anbefalede A som pilot.
- API-kæden `badmintonPlayerTeams` → `TeamFights` → `TeamMatch` gav for kamp 509892 kategorier med sætpoint og spillernavne, men ikke spiller-ID'er i det afprøvede feltvalg. Detaljekaldet for en fremtidig kamp (516360) gav GraphQL-fejlen `Could not find any players on match`: kampe uden resultat får ingen detalje.
- Kendte blivende undtagelser skal bevares uændret: fire U09-kampe (505217, 505219, 506407, 506413), to corona-suspenderede (387862, 387864) og protestkampen 340495 (`statistik/AGENTS.md`).
- Efter enhver import skal de fem kontrolscripts køre og den opdaterede database kopieres til `gsbData` (Dropbox) fra `config.local.json` (`statistik/AGENTS.md`, afsnittet `Databasen`).

## Mål
1. **Plan først (ingen kald):** læs `statistik/results/155-kampe-2026-27.md/.json`, `statistik/scripts/155-undersoegelse.mjs` og de importscripts, 155 peger på. Skriv i rapporten hvilke tabeller og kolonner der skrives, hvordan sæson 2026 og kamp-ID'er bliver nøgler (idempotent: kør to gange giver samme database), og regn kaldloftet ud (Teams + Fights + én detalje pr. kamp med resultat) med 10 % margin.
2. **Sikkerhedskopi:** kopier `gsb-statistik-normalized.db` til en navngiven kopi uden for git (Dropbox-undermappen `_backup-163`, sti fra `config.local.json`) og skriv kopiens SHA-256 i rapporten, før noget skrives.
3. **Hent og importér** GSB-holdkampe for 2026/27 (scope A): pulje, hold, holdkamp, dato, holdresultat, og for spillede kampe kategorier, sæt og spillernavne. Kampe uden resultat importeres som kampe uden resultat (ingen detaljekald, ingen fortolkning).
4. **Spiller-ID:** findes en stamdata-kobling fra kort 164, så brug den og markér kilden. Ellers gemmes navne uden ID, og de kampe tælles som "uden ID-kobling" i rapporten (det er et gap, ikke en fejl).
5. Kør de fem efter-import-kontroller og kopiér databasen til Dropbox. Opdatér kun linjen for `gsb-statistik-normalized.db` i `statistik/HASHES.txt`.
6. Rapportér tal: kampe pr. runde, antal med resultat, antal med individuelle rækker, antal uden ID-kobling, kald brugt/loft, de tre undtagelser uændrede.

## Afgrænsning
- **Må røres:** `statistik/data/gsb-statistik-normalized.db` (eneste tilladte skrivning i dette kort, kun til 2026/27-rækker), nye filer under `statistik/scripts/` og `statistik/results/`, linjen for normalized i `statistik/HASHES.txt`, Dropbox-kopien.
- **Må ikke røres:** De andre fire databaser, 136-parseren, regelbogen, gamle importscripts (kopiér ideer, kør dem ikke), `apps/netlify-prod/`, rækker for sæson 2025 og tidligere (uændret antal, se Værnet).

## Output
- `statistik/scripts/163-import-2026-27-gsb.mjs`
- `statistik/results/163-import-2026-27-gsb.md/.json`
- `statistik/results/163-raa-svar/`

## Kontrol
- **Målet:** Planen i rapporten er læst og godkendt af Christoffer FØR det første kald (Codex stopper efter punkt 1–2 og skriver i Spørgsmål, hvis ikke der står "godkendt" i kortets Spørgsmål). Derefter: 2026/27 har >0 competitions/teams/team_matches; ny kørsel giver 0 nye og 0 ændrede rækker; de fem kontrolscripts bestået (resultat kopieret ind).
- **Værnet:** Rækker for sæson ≤2025 har samme antal før og efter (73 competitions, 77 teams, 400 team_matches for 2025/26 som reference). De fire andre databasers hash uændret (`node tools/tjek/db-hashes.mjs`, ignorér linjen for normalized). De tre kendte undtagelser uændrede. Kaldantal ≤ loft. `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) fem tilfældige importerede kampe sammenholdt med den offentlige side (dato, hold, resultat), som Christoffer kan slå op.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Scope B eller en anden afgrænsning end A kræver Christoffers ord. Mangler et felt, eller afviger skemaet fra 155's beskrivelse, så stop før skrivning. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Gendan `gsb-statistik-normalized.db` fra `_backup-163`-kopien (hash i rapporten). Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
