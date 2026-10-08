# Opgave 154 — version/dato-regel og hentning af ranglistepoint for sæson 2025/26 (og aktuelt snapshot for 2026/27)

**Trin:** Bygger på 152 (kontrolsnapshot 2026-04-10), 152a (metodeforslag) og 153 (historisk rækkevidde). Første rigtige hentning ud over ét snapshot. Gør det i to faser, og afrapportér fase 0, før fase 1 starter.

## Hvad vi ved
- Ungdomspoint findes fra sæson 2018/19. 2012–2017 har ingen daterede versioner via denne rute. Kalenderne for 288/289/292 M er ens i 2025/26 (158 datoer); versionsdatoer lå mest mandag, onsdag og fredag, og huller er op til 19 dage.
- `playerid` på den fungerende request giver én isoleret række med point og ID. Et ID uden for listen giver nul rækker. Rang i et `playerid`-svar er ikke den samme som på den fulde liste (K-spiller 154: rang 1 mod 83, samme point); brug **point**, ikke rang.
- **Ikke bevist:** at et `playerid`-opslag bruger en anden `rankinglistversiondate` (eneste test gav samme point), og om versionsdatoen er datagrænsen eller først gælder efter kampen.
- 152 hentede hele snapshottet 2026-04-10 i 393 sider. Dets 41 kampe fik 43 af 47 GSB-spillere og 144 af 166 modstandere fundet; alle de "ikke fundne" var spillere uden point i den disciplin (fri S/D, MD).

## Fase 0 — to afklaringer (højst 20 kald, tæller med i budgettet)

### 0a. Bruger `playerid` versionen?
1. Find i `statistik/data/rangliste-historik.db` (readOnly) og i `statistik/data/rangliste-point.db` (readOnly, snapshot 2026-04-10) tre spillere på liste 288 eller 289, hvis point afviger mellem to versioner i 2025/26 (forskel på mindst 20 point, begge versioner findes i den officielle kalender). Brug eksisterende data; ingen nye kald til at finde dem.
2. Kør `playerid`-opslag for hver spiller på begge versioner (op til 6 kald) og sammenlign med den forventede værdi. Skriv resultatet: følger svaret versionen, ja/nej/uafklaret. Er nogen forskel ikke forklaret af versionen, så skriv det og stop 0a.

### 0b. Er versionsdatoen datagrænsen? (op til 8 kald)
Den historiske event-/kamptabel (se `statistik/API_RESEARCH.md` og 152 punkt "event_test") viser point ved spilletidspunktet. Find op til 3 spillere med en konkret kamp (kendt dato D, fx lørdag/søndag) og et post-link i et `playerid`-svar (`detail_links`). Åbn eventtabellen og aflæs spillerens point ved kampen. Sammenlign med deres point i versionen **før** D (fredag) og **efter** D (mandag), via `playerid`-opslag, hvis 0a viser, at de følger versionen, ellers via kendte snapshots. Skriv, hvilken version eventpointet svarer til, og dermed om reglen "seneste version **strengt før** kampdagen" er rigtig. Er prøven for lille eller uklar, så skriv "uafklaret" og brug reglen "strengt før".

## Fase 1 — behovsregister og hentning for sæson 2025/26

1. **Behov (offline).** Byg `ranking_needs` i `statistik/data/rangliste-point.db` (den findes fra 152 og må udvides; andre databaser readOnly): for alle ungdomsholdkampe i `season_id` 2025 med spillere i `national-spillere.db`, én række pr. (spiller-ID, liste 288/289/292, køn-param, version). Version = seneste officielle versionsdato **strengt før** kampdagen (eller den regel, 0b begrunder). Ukendt køn i S/D/MD prøves i begge køn-lister uden navnegæt. `name:ikke fremmødt` udelades. Statusser: `found`, `confirmed_absent`, `incomplete_search`, `identity_review`, `missing_date`, `missing_id`, `missing_discipline`. Kampe uden dato, uden ID eller uden disciplin skal stå med deres status, ikke skjules.
2. **Metodevalg pr. (liste, køn, version).** Efter 152a: vælg `playerid`-opslag, hvis 0a viser, at de følger versionen og (antal efterspurgte spillere) er mindre end listens sidetal; ellers hent alle sider. Læs sidetallet fra første svar for den konkrete version, ikke fra de aktuelle lister. Gem valget og begrundelsen pr. gruppe.
3. **Hentning.** Sekventielt, mindst 2 sekunders pause, checkpoint efter hvert svar, genoptagelse uden at hente færdige svar igen, backoff ved 429/5xx, stop ved 3 fejl i træk eller botværn. Skriv til `ranking_points` og `harvest_pages` i `rangliste-point.db` med de felter, 152 brugte (liste, param, version, `player_id`, `member_number`, navn, klub, klasse, point, `rank` som den står i svaret, `fetched_at`, `response_sha256`). Dæk alle efterspurgte ID'er i hvert svar, også dem, der ikke var målet for kaldet.
4. **Genoptagelse over flere kørsler.** Scriptet skal kunne køres i flere omgange (`--max-calls N`), og rapporten skal opsummere status pr. version: komplet, delvis, fejlet. Et snapshot kaldes kun komplet, når alle valgte opslag/sider for alle seks lister er hentet.
5. **Negative fund.** `confirmed_absent` kræver fuld liste i versionen eller et `playerid`-opslag, som 0a har valideret mod en fuld liste. Manglende point er aldrig 0 eller et startpoint.
6. **Kobling og kontrol.** For alle kampe: antal spillere pr. status, pr. disciplin og pr. version. Tæl navn-/klubafvigelser (som 152's samarbejdsklubber) som `identity_review`, ikke fejl, hvis ID og personnavn er ens. Sammenlign 15 tilfældige GSB-spillere mod `rangliste-historik.db` for samme eller nærmeste version, og skriv forskellene.
7. **Rapport.** Antal kald brugt, pr. fase og pr. version; antal kampe med fuld dækning, delvis og ingen; de mest almindelige årsager til `incomplete_search` og `confirmed_absent`; og et forslag til, hvordan 2024/25 og ældre sæsoner skal hentes (kalender fra 153, forventet kaldtal).

## Fase 2 — sæson 2026/27: aktuelt snapshot og evt. kampbehov
Kør først efter fase 1 er færdig, eller når fase 1 har brugt sit budget og det er afrapporteret, hvorfor.
1. **Kampbehov 2026/27.** Hvis `gsb-statistik-normalized.db` eller `national-spillere.db` indeholder daterede ungdomskampe i 2026/27, byg `ranking_needs` for dem på samme måde som i fase 1 (version strengt før kampdagen). Findes ingen, så skriv det i rapporten.
2. **Aktuelt snapshot.** Hent den nyeste version i `seasonid` 2026 helt og ufiltreret for alle seks lister (288/289/292 × M/K), på samme måde som 152 (alle sider, sidetal fra første svar, resumé, `harvest_pages`). Det er nuværende point for alle spillere, også de modstandere GSB skal møde. Gem hentetid og versionsdato. Hent ikke de øvrige 40 versioner siden 1. juli; det er et senere kort.
3. Rapportér kald brugt, antal rækker og unikke spillere, og hvor mange af de aktive GSB-ungdomsspillere (fra kampdata og tidligere sæsoner) der findes i snapshottet.

## Netværksregler
- Maks. **6.000 forespørgsler i alt** (20 i fase 0, op til ca. 5.200 i fase 1, ca. 400–600 i fase 2). Kør i så mange omgange, det tager. Stop og rapportér, hvis budgettet nås, før alle behov er dækket.
- Sekventielt, mindst 2 sekunder mellem kald, ingen parallelle kald. Kun `badmintonplayer.dk`: GET af `/DBF/Ranglister/` for kontekstnøglen og POST til `GetRankingListPlayers`. Hent ny nøgle, når den udløber.
- Ingen login, ingen cookies, ingen CAPTCHA, ingen samtykkeklik. Ved botværn: stop og skriv det i "Spørgsmål".
- Rå svar må gemmes komprimeret i `statistik/results/154-raa-svar/` (kontekstnøgle redigeret ud), men hold mappen under ca. 100 MB; ellers gem kun hash og de første tre sider pr. liste og version.

## Output
- `statistik/scripts/154-saeson-hentning.mjs`
- `statistik/data/rangliste-point.db` (udvidet, ustaged; `*.db` er ignoreret i git)
- `statistik/results/154-saeson-2025-26.md` og `.json`
- `statistik/results/154-raa-svar/`

## Kontrol
- **Målet:** Fase 0 er afrapporteret, og for alle daterede 2025/26-ungdomskampe har hver deltager en status. Alle valgte opslag er hentet, eller budgettet er nået, og rapporten siger hvilke versioner der mangler.
- **Værnet:** Højst 6.000 forespørgsler (tallet står i loggen, hver med hash). De fire eksisterende databasers hashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E), alle åbnet readOnly; kun `rangliste-point.db` skrives til, og dens `integrity_check` skal være `ok`. `git status --short statistik/data/` tom (databasen er ignoreret). `git diff --check` uden fejl.
- **Skøn:** 5 GSB-spillere og 5 modstandere med point for en konkret kamp fra sæsonen (navn, version, point), som Christoffer kan slå op på den offentlige side for samme dato.

## Afgrænsning
- Sæson 2025/26 (fase 0–1) og ét aktuelt snapshot for 2026/27 (fase 2). Ingen andre sæsoner, ingen forventet-vinder-beregning, ingen artifact.
- Ret ikke 136-parseren, 143–153-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke på felters betydning. Spillere uden point markeres som "ikke på listen", aldrig med et opdigtet startpoint.

## Gren
`arbejde/154-saeson-2025-26`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
- Fase 0a bestod (6/6 opslag). I fase 0b blev eventrækker fra GetPlayerRankingListPoints sammenholdt med snapshots 19. og 22. september. To af tre eventværdier matchede den 19.; én matchede ingen af datoerne. Eventtabellens dato var 20. september, mens kampdata for holdkamp 487676 siger 21. september. Derfor er datogrænsen uafklaret; fase 1 bruger kortets fallback, seneste officielle version strengt før kampdagen.
- Kortets opsummering af 152 er for stærk: 152 beviste ikke, at alle ikke-fundne spillere nødvendigvis var uden point. Den dokumenterede 37 identiske dubletforekomster og uafklaret stabil paginering ved ties. Negative fund skal fortsat bære denne begrænsning; ingen point må opfindes.
- Forespørgsel #189 mangler et afsluttet HTTP-svar i loggen efter en lokal checkpoint-fejl. Den tælles konservativt som brugt kald; det kan ikke afgøres, om serveren nåede at modtage den.
- Den eksplicit ønskede `.bak`-backup ligger i `statistik/data/` og er ikke dækket af gitignore, så `git status --short statistik/data/` viser mappen som untracked. Den må ikke stages; gitignore er ikke ændret. Selve `rangliste-point.db` blev opdateret som opgaven tillader.

## Tilbagefald
Slet de nye filer, inklusive `154-raa-svar/`, og gendan `rangliste-point.db` fra en kopi (tag en kopi før kørslen: `Copy-Item statistik/data/rangliste-point.db statistik/data/rangliste-point.db.bak`). Ingen af de fire eksisterende databaser er berørt.

## Resultat
Fase 0, 1 og 2 er gennemført. Scriptets offline slutkørsel viste `snapshot_complete`; 3.903 af loftets 6.000 kald blev brugt. Der blev ikke mødt CAPTCHA eller botværn. De to første forsøg på at hente frisk kontekst fejlede (`fetch failed`), hvorefter kørslen fortsatte. Ét kald (#189) mangler et afsluttet svar i loggen efter lokal checkpoint-fejl og tælles konservativt som brugt. Samlet: 3.900 HTTP 200, 2 transportfejl, 1 ufuldstændig logpost.

Fase 0a: seks af seks versionsbundne `playerid`-opslag stemte med de valgte versioner:

| Spiller | 10. april 2026 | 2. juni 2026 | Forskel |
|---|---:|---:|---:|
| Theodor Lumby Jessen (327691) | 1.808 | 1.841 | +33 |
| Marius Steenstrup Leth-Espensen (328191) | 2.041 | 2.100 | +59 |
| Anna Rudolph (328195) | 1.745 | 1.793 | +48 |

Fase 0b afklarede ikke entydigt versionsgrænsen for point på kampdagen. Holdkamp 487676 er 21.09.2025 i kampdata, mens eventhistorikken viser 20.09.2025. Af tre eventpoint matchede to snapshot 19.09.; ét matchede ingen af snapshots 19.09./22.09. Fase 1 bruger derfor den foreskrevne fallback: seneste officielle version strengt før kampdagen.

Fase 1 byggede behov for 271 kampe og 4.393 spiller-/kampdeltagelser. 6.589 inputrækker blev deduplikeret med 83 gentagelser til 6.506 unikke behov. Statusser for 2025/26:

| Status | Antal |
|---|---:|
| Fundet (`found`) | 3.477 |
| Ikke på listen, verificeret med fulde lister (`confirmed_absent`) | 2.223 |
| Søgning ufuldstændig (`incomplete_search`) | 422 |
| Identitet kræver kontrol (`identity_review`) | 256 |
| Kampdato mangler (`missing_date`) | 126 |
| Disciplin mangler (`missing_discipline`) | 2 |

Kampdækning: 123 fulde, 136 delvise og 12 uden dækningsstatus som `full`. 2.223 negative fund blev først markeret bekræftet efter fuld listehentning; 422 tomme spilleropslag uden fuld liste er fortsat ufuldstændige, ikke fravær. 15 stikprøver blev sammenlignet med ranglistehistorikken; alle 15 havde et navnematch, men enkelte sammenligninger er mod nærmeste tilgængelige dato og ikke identisk snapshot.

Kontrolstikprøve fra kampdata (holdkamp, versionsdato, point):

| GSB-spiller | Kamp | Disciplin | Version | Point |
|---|---:|---|---|---:|
| Benjamin Hinge Carlsson | 487676 | HD | 2025-09-19 | 1.565 |
| Louis Valdemar Hedegaard Toftlund | 487676 | HD | 2025-09-19 | 1.515 |
| Emilie Reinholdt Amelung | 487676 | DD | 2025-09-19 | 1.270 |
| Qingyi Marie Han | 487676 | DD | 2025-09-19 | 1.230 |
| Katia Lundby Bresemann | 487676 | DS | 2025-09-19 | 1.346 |

| Modstander | Kamp | Disciplin | Version | Point |
|---|---:|---|---|---:|
| Josefine Bille-Ahmt | 487676 | DD | 2025-09-19 | 1.279 |
| William Denning Larsen | 487676 | HD | 2025-09-19 | 1.411 |
| Clara Reinhold Pedersen | 487676 | DD | 2025-09-19 | 1.272 |
| Sebastian Lundberg | 487676 | HD | 2025-09-19 | 1.445 |
| Alisha Sadiq Zhang | 487679 | DD | 2025-09-19 | 1.350 |

Fase 2: for 2026/27 blev alle seks lister hentet på version 07.10.2026: 288 M/K = 99/37 sider, 289 M/K = 136/53, 292 M/K = 41/33; i alt 399 sider og 39.623 rækker. Snapshot indeholder 20.432 unikke spillere. Af 152 aktive GSB-ungdomsspillere i kampdata fandtes 139 i snapshot. 338 behovsrækker blev registreret: 328 fundet og 10 ufuldstændige spilleropslag; de sidste er ikke erklæret fraværende.

Efter begge faser indeholder `rangliste-point.db` 6.844 behov, 236.762 pointposter og 2.382 hentningsposter. Status på tværs af databasen: 3.805 fundet, 2.223 bekræftet fravær, 432 ufuldstændige søgninger, 256 identiteter til kontrol, 126 manglende datoer og 2 manglende discipliner. `PRAGMA integrity_check` gav `ok`.

Kontroller: `node --check statistik/scripts/154-saeson-hentning.mjs` bestod. Målt mindste afstand mellem forespørgsler var 2.099 ms i fase 0 (én millisekund under kravet), 2.199 ms i fase 1 og 2.199 ms i fase 2. Ingen parallelle kald, cookies eller CAPTCHA-omgåelse. `git diff --check` bestod. De fire kilde-databaser beholdt deres forventede SHA-256: gsb-statistik-normalized.db `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; liga-landskab.db `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; national-spillere.db `1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E`; rangliste-historik.db `6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F`. Backupen er byte-identisk med pointdatabasen før hentningen (SHA-256 `54F2FE25C82C188D5E6412A131081BF341A37AFF17DFF51B5F68A884B6591BC9`).

Rapportfilerne er `statistik/results/154-saeson-2025-26.md` og `.json`; råsvar ligger i `statistik/results/154-raa-svar/`. Databasen og backupen er lokale datafiler. Alt er ustaged; ingen commit eller push. Kortet forbliver i `work/aabne/`.
