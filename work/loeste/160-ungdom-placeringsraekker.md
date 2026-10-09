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
- `agegroupid=2` er U09 i `liga-landskab.db`/AgeGroup-kataloget, men det korrekte 287-kald returnerede 23 rækker, alle med U11-rækkeetiketter (13 U11 B, 7 U11 C, 2 U11 A, 1 U11 A-B). Er dette forventet for ranglistens aldersgruppefilter, eller skal “U09 på 287” forstås som en særskilt rækkeetiket? Data alene afgør det ikke.
- Tærskelafvigelse: Josefine Bille-Ahmt, U15/K, 287-rang 37, står U15 E-M, mens højeste disciplinpoint i 2026-10-07-databasen er 1835 (>1500), hvilket efter den afprøvede regel peger på U15 M. Listen er 09-10-2026; snapshotforskellen på to dage eller anden regeltilstand kan ikke afgøres her.
- Fire E-spillere stod uden for top-24 (U15/M: 1; U15/K: 2; U17/M: 1). Ingen var top-8 på 288/289/292 i det gemte pointdatasæt. Top-8-undtagelsen forklarer derfor ikke disse fire ud fra den tilgængelige evidens. Skal grænsen behandles som ren 287-placering, eller undersøges der senere flere disciplin-/aldersplaceringer?

## Tilbagefald
Slet de nye filer, inklusive `160-raa-svar/`. Ingen database er berørt.

## Resultat
Udført med `statistik/scripts/160-ungdom-placeringsraekker.py`. Alle detaljer, råsvar, fulde request-hashes, skemaer og række-for-række afvigere står i `statistik/results/160-ungdom-placeringsraekker.md/.json` og `statistik/results/160-raa-svar/`.

- **Kald:** 20/20 til badmintonplayer.dk (2 GET af ranglistesiden + 18 POST); 0 til badminton.dk. Kald 1–10 var en fejlprobe: M/K blev sendt i `param` i stedet for `gender`, og M/K-svar blev identiske. De rå svar er bevaret under `attempt-1-param-only/`, markeret kasseret. Kald 11–20 satte `gender` korrekt og er analysegrundlaget. Ingen fejlstatus eller botværn.
- **Aldersgruppe-ID’er, bekræftet i read-only `age_groups`:** U13=4, U15=5, U17=6, U09=2. Alle seks korrekte lister havde 100 rækker på side 0. Sidetal: U13 M/K 19/8; U15 M/K 20/8; U17 M/K 16/7.
- **Rækkefordeling og intervaltest:** U13 M 24 M / 21 M-A / 55 A, 97/100 inden for intervallerne; U13 K 24/22/54, 98/100. U15 M 25 E / 11 E-M / 64 M, 99/100 af de 100 rækker tilhørte de testede placeringsklasser og lå rigtigt. U15 K: 25 E / 11 E-M / 53 M / 10 A samt 1 U17 E; 86/89 placeringsklasse-rækker bestod. U17 M: 25 E / 11 E-M / 58 M / 6 A, 93/94 bestod. U17 K: 23 E / 12 E-M / 44 M / 21 A, 77/79 bestod. Alle afvigende navne, placeringer og rækker er listet i rapporten.
- **Tærskler:** Højeste disciplinpoint fra `rangliste-point.db` (version 2026-10-07, 288/289/292) blev matchet på profile-ID til alle 323 rækker fra U13 rang 49 og U15/U17 rang 37 og ned. 322 passede; én afveg: Josefine Bille-Ahmt (U15 K, rang 37, E-M, 1835 point mod tærsklen >1500). Ranglistepunkt-snapshot er to dage ældre end 287-versionen 09-10-2026.
- **E/top-8:** Fire E-rækker stod uden for top-24 (U15 M én, U15 K to, U17 M én). Ingen havde top-8-placering i singler/double/mix blandt de tilgængelige ID-match i 288/289/292.
- **Reserve:** U09-ID 2 gav 23 rækker på én side, men etiketterne var U11 A/B/C/A-B; se åbent spørgsmål. `playerid=325460` (Anja Thomsen) gav rang 1669, som matcher parentesplaceringen i den gemte 159 GSB-liste, ikke lokal rang 1. `playerid=293765` (Nikolaj Thorslund Hindsbo) gav rang 5437, som matcher parentesplaceringen, ikke lokal rang 47. Begge svar gav dermed den fælles placering, ikke lokal rang eller kønsrang. Rækkerne kan slås op på den offentlige side.
- **Tre opslagseksempler:** Conrad Lercke — U13 M, rang 1; Liva Dunfeldt Heckmann — U15 E, rang 2; Marvin Jakob Galan Mogensen — U17 E, rang 1.
- **Hashværn:** Alle fem databaser blev åbnet `mode=ro` med `PRAGMA query_only=ON`; SHA-256 før/efter matcher kortets forventede hash (alle fem fuldt gengivet i rapporten). Ingen databaseskrivning.
- `git diff --check` og afsluttende `git status --short` skal fremgå af afleveringsbeskeden; rapporten og scriptet står ustaged.
