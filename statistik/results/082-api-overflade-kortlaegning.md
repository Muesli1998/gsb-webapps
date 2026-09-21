# Opgave 082 — API-overflade på badmintonplayer.dk

Undersøgelsen er read-only. De enkelte REST-testkald, HTTP-status, svarlængde,
SHA-256 og svarprefix er gemt i
`statistik/results/082-api-overflade-probe.json`; probe-scriptet er
`statistik/scripts/082-api-overflade-probe.mjs`.

## Sidetyper og indlæste klienter

De fem sider blev hentet direkte og deres scriptreferencer registreret:

| Sidetype | Side-HTML | `WebService1.asmx/js` | `v2-app.js` |
|---|---:|---:|---:|
| Holdturnering/Stilling | 18.188 bytes | ja | ja |
| Turnering/VisResultater | 23.289 bytes | ja | ja |
| Spiller/VisSpiller | 29.488 bytes | ja | ja |
| Ranglister | 21.842 bytes | ja | ja |
| Turnering/SaesonPlan | 19.547 bytes | ja | ja |

Det betyder ikke, at hver klient kalder alle metoder ved sidens første load;
det dokumenterer hvilke klientoverflader siderne faktisk indlæser. Den
eksisterende ASMX-proxy indeholder 43 metoder:

```text
CheckLicense, AddLicense, ChangePaymentMethod, AddRegistration,
AddRegistrationOptions, GetRegistrationPlayerOptionsRequired,
AddRegistrationFromList, DeleteRegistrationFromList,
GetOrderRegistrationList, RemoveOrderItem, CompleteOrder, CancelOrder,
SearchPlayer, SearchPlayerDuplicate, SearchClub, SearchClubInfo, CreatePlayer,
AssignPlayer, GetPlayerProfile, GetPlayerRankingListPoints, UnassignPlayer,
UnassignPlayerMulti, MoveAssignPlayerMulti, CheckAssignPlayer,
SearchTournamentClass, GetTournamentClassInfo, GetTournamentEvents,
SearchRegistrations, DeleteRegistration, DeleteRegistrationClub,
ChangeRegistrationPartner, ConfirmRegistrationClub, SearchRegistrationsByClass,
SearchTournamentResults, SearchTournamentMatches, SearchTournamentInvitation,
GetLeagueStanding, GetRankingListPlayers, GetRankingListPlayersSenior,
GetRankingListPlayersHide, GetRankingListVersions, GetSeasonPlan, GetWeekNo
```

Den nye REST-klient `v2-app.js` eksponerede **141 unikke route-mønstre**.
Den komplette maskinlæsbare liste med de tilhørende klientmetoder ligger i
JSON-resultatet. Route-familierne er:

```text
AgeGroup, AgeGroupClass, Assets, BlockMatch, BotToken, CalendarEvent,
ClassGroup, Club, CoachGroup, CompleteOrderSuccess, Course, CourseEnrollment,
CourseInvitation, CourseOrder, CourseParticipants, CoursePrivileges,
CourseTemplate, CourseType, Court, Disciplines, GeoRegion, LeagueMatch,
LeagueMatchLog, Localization, MatchiiClub, MatchiiCourt, MatchiiTestImage,
Menu, PaymentGateway, Players, PoolPosition, PublicApiUser,
RankingReplacementClub, RangkingListVersion, Region, Routing, Seasons,
Share, SharedEventUserPlayer, Tournament, TournamentClass,
TournamentEventMatch, TournamentLinks, TournamentTreeMatch, Users,
versionDate og reset.
```

## Nye REST-kald og hvad de faktisk viste

| Endpoint | Status | Svar | Enumeration-vurdering |
|---|---:|---|---|
| `/api/Seasons` | 200 | 18 sæsonobjekter, ID 2010–2027 | **Ja**: direkte sæsonliste |
| `/api/Seasons/current` | 401 | tomt svar | Kan ikke bruges uden auth i denne kontekst |
| `/api/AgeGroup/Get` | 200 | 29 aldersgruppeobjekter | **Ja**: direkte katalog |
| `/api/Region` | 200 | 33 regionobjekter | **Ja**: direkte katalog |
| `/api/GeoRegion/Get` | 200 | 4 objekter: NORD, SYD, ØST, UDLAND | **Ja**: direkte katalog |
| `/api/RangkingListVersion?seasonId=2026` | 401 | tomt svar | Sæsonens versionsliste er auth-beskyttet her |
| `/api/RangkingListVersion/id?rankingListVersionId=264866` | 200 | én version med datointerval | Kun opslag på kendt ID |
| `/api/versionDate?date=2026-09-01...` | 200 | én version-ID og datointerval | **Delvist**: dato → version, ikke enumeration |
| `/api/versionDate?date=2025-09-01...` | 200 | én version-ID og datointerval | **Delvist**: samme opslag for anden dato |
| `/api/Tournament` | 200 | `[]` uden request-body | Ingen offentlig enumeration dokumenteret |
| `/api/TournamentClass?tournamentClassId=115342` | 200 | 33.118 bytes, klasser for kendt turnering | Kun kendt turnerings-ID |
| `/api/Tournament/id?tournamentClassId=115342` | 200 | turneringsmetadata | Kun kendt klasse-ID |
| `/api/Tournament/info?tournamentClassId=115342` | 200 | metadata og links | Kun kendt klasse-ID |
| `/api/Tournament?tournamentClass=115342&tournamentEventId=490920` | 200 | 75.801 bytes eventdata | Detaljeopslag på kendte IDs |
| `/api/TournamentEventMatch/metadata` | 200 | metadata med `pageType` | Ikke en turneringsliste |
| `/api/TournamentEventMatch?...` | 200 | tom `unifiedTournamentMatches` | Ingen enumeration bevist |
| `/api/TournamentLinks?tournamentClassId=115342` | 401 | tomt svar | Auth-beskyttet i denne kontekst |
| `/api/Players/84737` | 200 | spillerprofilmetadata | Kun opslag på kendt spiller-ID |

Kald til `/api/TournamentClass` og `/api/Tournament` med kendte IDs beviser
ikke en billig sæsonenumeration. De leverer detaljer, når et
`tournamentClassId`/event allerede er kendt. Den eneste direkte, offentlige
turneringsliste-rute fundet i denne runde er derfor ikke dokumenteret.

## Rangliste-proberne

- `ranking-points-2026.json`: ASMX-profilrespons for spiller 84737 med
  aktuelle 2026/27-point og tre `ShowRankingListPoints`-links (single,
  double, mix). Den viser pointbegivenheder, men kun for den aktuelle sæson.
- `ranking-mix-2026.json`: samme profilrute for mixdouble; viser aktuelle
  point og modspillere/makkere med spillerlinks.
- `ranking-versions-2026.json`: ASMX-respons med 29 versionsdatoer i 2026,
  inklusive august-/septemberranglister. Det er en brugbar datoliste for
  den kendte sæson.
- `player-ranking-links-2026.html`: profilsiden eksponerer rangliste-ID'er
  287, 288, 289 og 292 samt point-/kamp-links for 2026.
- `historical-ranking-call.txt`: et historisk ranglistekald returnerede
  HTTP 500.
- `historical-ranking-ids.txt`: ingen ranking calls blev fundet for de
  testede sæsoner 2025, 2024, 2023, 2020 og 2010.
- `historical-test-summary.json`: er en samlet hold-/kamp-test (26 sæsoner,
  16 sæsoner med hold, 2.818 GSB-kampe og 855 Badmintonliga-kampe); den
  indeholder ikke historiske ranglistepoint og er derfor ikke evidens for en
  rangliste-enumeration.

Samlet vurdering: der findes en offentlig ASMX-rute, som kan levere en
versionsliste for en kendt sæson, og REST-ruten `versionDate` kan oversætte en
kendt dato til én version. Den nye REST-versionsliste er auth-beskyttet uden
login. De gemte historiske forsøg viser ikke en fungerende vej til at
enumerere ranglistepoint på tværs af ældre sæsoner.

## Konklusion og afgrænsning

Der er fundet og testet en væsentligt større REST-overflade end de to tidligere
katalogruter. De nyttigste offentlige enumeratorer er sæsoner, aldersgrupper,
regioner og georegioner. Turneringsruterne er dokumenterede detaljeopslag på
kendte IDs; en billig tværgående turneringsenumerator er ikke bevist. For
ranglister er versionsdatoer tilgængelige via den eksisterende ASMX-rute for
en kendt sæson, men historisk pointenumeration er fortsat uafklaret.

Der blev ikke udført masseindsamling, og ingen database blev skrevet til.

## Autentificeret browser-session

Med Christoffers aktive login viste `/DBF/Ranglister/` en versionsvælger med
34 muligheder: `Seneste` plus 33 datoversioner. En historisk version blev
valgt i UI'et (`01-09-2026`), hvorefter siden viste perioden `01-07-2026 til
30-08-2026` og opdateringstidspunkt `18-09-2026 09:44:20`. Det beviser, at
den autentificerede ranglisteside kan navigere dato-for-dato i den tilgængelige
sæson. Den direkte REST-rute `/api/RangkingListVersion?seasonId=2026` kunne
ikke åbnes som selvstændig JSON-navigation i browserklienten, så den konkrete
liste er dokumenteret som den autentificerede UI-respons (den underliggende
side er fortsat den eksisterende ASMX-baserede ranglisteside).

Den autentificerede `/DBF/Turnering/SaesonPlan/` kunne søge og vise aktuelle
turneringer. For 2026/2027 viste de tre udvidede måneder 23 turneringer i
august, 48 i september og 29 i oktober. Resultat-, deltager- og
programinfo-links indeholdt konkrete turnerings-ID'er, fx 118392, 115649,
115477, 117972 og 119128. Det er dermed en brugbar turneringsenumerator for
den valgte sæson via UI'et. Sæsonfilteret viste kun 2026/2027 i denne
session, så historisk enumeration via samme UI er ikke bevist.

De autentificerede observationer ligger også struktureret i
`statistik/results/082-auth-session-probe.json`.

## Direkte JavaScript-test med login

Den aktive login-session blev kontrolleret på BadmintonPlayer-siden, men
browserens DOM-evaluering er isoleret og eksponerer hverken `window.fetch` eller
`window.XMLHttpRequest`. Det var derfor ikke muligt at afvikle den ønskede
devtools-kommando direkte fra denne automation eller at udlevere session-
cookien til et separat kald. Den direkte REST-rute er derfor ikke markeret
som bevist fungerende med login.

Den autentificerede UI-respons bekræftede dog 34 versionsvalg og et historisk
valg med `Version: 01-09-2026`, perioden `01-07-2026 til 30-08-2026` og
opdatering `18-09-2026 09:44:20`. Det beviser login-adgang til historikken via
den eksisterende ranglisteside/ASMX-rute, men ikke direkte REST-enumeration på
tværs af sæsoner.
