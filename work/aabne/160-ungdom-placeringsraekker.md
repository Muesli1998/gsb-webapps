# Opgave 160 — ungdomsrækker efter placering (E, E-M, M, M-A): passer reglementets faste antal?

**Trin:** Bygger på 159 (`statistik/results/159-tilmeldingsniveau.md`). Lille hentning, mest offline. Ingen skrivning til databaser.

## Hvad vi ved
- Reglement for Rangliste 2026-09-10, Appendiks A (udtrukket af Claude, ikke ordret kopieret). Ungdomsrækker er **point** undtagen disse, som er **placering på tilmeldingsniveau pr. køn og aldersgruppe**:
  - **U15 og U17:** E = nr. 1–24 (eller nr. 1–8 i single, double eller mix). E-M = nr. 25–36. M = fra nr. 37 og nedefter, men kun over et pointtal (U15 herrer >1850, damer >1500; U17 herrer >2150, damer >1700). Overgår til U17 hhv. ældre ved >2900 (herrer) / >2500 (damer) i U15.
  - **U13:** M = nr. 1–24, M-A = nr. 25–48, A = nr. 49 og nedefter over et pointtal (herrer >1525, damer >1350). Overgår til U15 ved >2400 (herrer) / >2100 (damer).
  - U9, U11 og U19: ingen placeringsrækker, kun point.
- Christoffer mener, at der hvert år er et fast antal E og E-M i ungdom. Reglementet bekræfter det for U15, U17 og U13.
- 159 viste: voksenrækker er placering i den **kønsfiltrerede** 287-liste. Ufiltreret kønsliste = `gender` K eller M uden klub, og første kolonne er placeringen. 100 rækker pr. side. Placeringsrækkerne for ungdom ligger alle i de første ca. 50 placeringer, altså på **side 0**.
- Ungdomsrækker med point passede i 93 % med højeste disciplinpoint og 2026/27-tabellen. Spillere med placeringsrække var holdt ude.
- Kendt: `agegroupid` på 287 virker (se `statistik/scripts/151-pointlister.mjs`). Find selv de gyldige id'er for U13, U15 og U17 (og U9) i 150/151-filerne og de gemte svar. Gæt ikke.

## Mål
1. **Hent side 0 af liste 287** uden klubfilter for hver kombination af aldersgruppe (U13, U15, U17) og køn (M, K) = 6 kald. For hver liste: sidetal, antal rækker på side 0, og pr. række (`Række`-kolonnen) antal spillere og laveste/højeste placering. Brug 159's script `statistik/scripts/159-hent287.py` (funktionerne `get_ctx`, `post`, `parse_rows`, `pages`) eller skriv tilsvarende, men skriv hvad der blev brugt.
2. **Test de faste antal.** For hver liste: ligger E på placering 1–24, E-M på 25–36, M fra 37 (U15/U17), og M på 1–24, M-A på 25–48, A fra 49 (U13)? Skriv antal, der passer, og alle afvigere med navn, placering og række. Se særligt på delte placeringer ved 24/25, 36/37 og 48/49: hvor mange deler placering, og hvilken række får de?
3. **Pointtærsklen på M (U15/U17) og A (U13).** For spillere fra placering 37 (hhv. 49) og nedefter: hvilke rækker står der? Er det M når punktet er over tærsklen og ellers A (hhv. B)? Brug disciplinpoint fra `rangliste-point.db` (version 2026-10-07, `ranking_points`, liste 288/289/292, `param` M/K, højeste disciplin). Skriv antal, der passer, og afvigere.
4. **"Nr. 1–8 i single, double eller mix".** Findes der spillere med E, som ikke står på placering 1–24 i 287? Kan de være de 8 bedste i en disciplin? Test offline: tag de 8 bedste pr. disciplin og aldersgruppe/køn i `rangliste-point.db`, hvis aldersgruppen kan udledes. Kan den ikke, så skriv "ukendt" og forklar hvorfor, i stedet for at gætte.
5. **Reservepunkter.** U09 på 287 (1 kald: `agegroupid` for U09, `gender` M, side 0). `playerid` på 287 (2 kald: én GSB-kvinde og én GSB-mand fra 159's GSB-lister; skriv om svaret giver kønsplacering, fælles placering eller lokal placering, og om det passer med listens egen). Hvis du ikke kan finde et gyldigt id, så skriv det.
6. **Anbefaling.** Kan en ungdomsspillers række forudsiges fuldt ud (placeringsrækker + pointrækker)? Hvor mange point eller hvilken placering skal man bruge for at nå næste række? Hvad mangler?

## Regler
- Alle databaser åbnes read-only (`mode=ro`, `PRAGMA query_only=ON`). Ingen skrivning, ingen import.
- Netværk: kun `badmintonplayer.dk`. Højst **20 kald i alt** (6 + 1 + 2 + friske GET af kontekstnøgle + reserve). Ingen kald til `badminton.dk`. Sekventielt, mindst 2,1 sekunder, backoff ved 429/5xx, stop ved 3 fejl i træk eller botværn. Ingen login, cookies, CAPTCHA eller samtykkeklik. Kontekstnøglen redigeres ud af alle gemte svar.
- Gæt ikke på formler, id'er eller feltbetydning. Skriv "ukendt", hvor noget ikke kan afgøres.
- **Starter din shell ikke** (fejl med "setup refresh had errors"), så stop, skriv fejlen i `Spørgsmål`, og forsøg ikke omveje. Fejler `apply_patch`, så brug metoden i guiden til Codex (søg i repoet efter `codex-run-as-apply-patch`).

## Output
- `statistik/scripts/160-ungdom-placeringsraekker.py` (eller `.mjs`)
- `statistik/results/160-ungdom-placeringsraekker.md` (punkt 1–6, tabeller, forespørgselslog med nr., felter ændret, status, bytes og svarhash)
- `statistik/results/160-ungdom-placeringsraekker.json`
- `statistik/results/160-raa-svar/`

## Kontrol
- **Målet:** Punkt 1–6 besvaret. For hver af de seks lister står antal pr. række, og hvor mange der ligger i reglementets placeringsinterval.
- **Værnet:** Kaldtal (højst 20) i loggen med hash. Alle databasers SHA-256 uændrede: `gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E, `rangliste-point.db` DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9. (Hash af `national-spillere.db` tager tid; spring den over og skriv det, hvis hashen ikke er nødvendig for at åbne den.) `git diff --check` uden fejl.
- **Skøn:** Tre spillere (navn, aldersgruppe, række, placering) som Christoffer kan slå op på den offentlige side.

## Afgrænsning
- Kun aktuel version for 287. Ingen historiske versioner, ingen bulkhentning.
- Ret ikke 136-parseren, 143–159-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/160-ungdom-placeringsraekker`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive `160-raa-svar/`. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
