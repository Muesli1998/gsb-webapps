# Opgave 148 — ranglistepoint: inventar og hentningsplan

Genereret 2026-10-06T15:55:04.937Z. Alle fire SQLite-filer blev åbnet read-only; ingen netværkskald.

## 1. Ranglistehistorik

ranking_snapshots: 40.364 rækker; 349 medlems-ID’er; 10 disciplinværdier; 49 versiondatoer (2022-08-01–2026-09-02). fetch_errors: 0.

player_link: 679 rækker og 677 distinkte GSB-player-ID’er; 345 entydige, 2 tvetydige og 330 uden entydigt medlems-ID.

| Sæson (afledt juli–juni) | Versioner | Medlems-ID’er | Snapshots | Første–sidste |
|---|---:|---:|---:|---|
| 2022/23 | 9 | 212 | 5.807 | 2022-08-01–2023-06-01 |
| 2023/24 | 12 | 165 | 6.971 | 2023-07-01–2024-06-01 |
| 2024/25 | 13 | 207 | 5.789 | 2024-07-01–2025-06-02 |
| 2025/26 | 12 | 306 | 16.519 | 2025-07-02–2026-06-02 |
| 2026/27 | 3 | 349 | 5.278 | 2026-07-02–2026-09-02 |

Disciplin-/sæsondækningen, rå værdier og manglende spillerkoblinger står i JSON. Ingen rå disciplinbetegnelse er omfortolket.

### GSB-sæson/årgang

| Sæson | Årgang | Spillere med GSB-sidekampe | Entydig medlemskobling | Tvetydig | Ingen medlems-ID | Med snapshot i sæson |
| 2012/13 | U11 | 8 | 1 | 0 | 7 | 0 |
| 2012/13 | U13 | 11 | 3 | 0 | 8 | 0 |
| 2012/13 | U15 | 16 | 3 | 0 | 13 | 0 |
| 2012/13 | U17 | 9 | 0 | 0 | 9 | 0 |
| 2013/14 | U11 | 13 | 1 | 0 | 12 | 0 |
| 2013/14 | U13 | 11 | 1 | 0 | 10 | 0 |
| 2013/14 | U15 | 16 | 3 | 0 | 13 | 0 |
| 2013/14 | U17 | 12 | 2 | 0 | 10 | 0 |
| 2014/15 | U11 | 9 | 0 | 0 | 9 | 0 |
| 2014/15 | U13 | 13 | 1 | 0 | 12 | 0 |
| 2014/15 | U15 | 11 | 3 | 0 | 8 | 0 |
| 2014/15 | U17 | 4 | 1 | 0 | 3 | 0 |
| 2015/16 | U11 | 6 | 0 | 0 | 6 | 0 |
| 2015/16 | U13 | 12 | 0 | 0 | 12 | 0 |
| 2015/16 | U15 | 9 | 2 | 0 | 7 | 0 |
| 2016/17 | U11 | 5 | 2 | 0 | 3 | 0 |
| 2016/17 | U13 | 8 | 0 | 0 | 8 | 0 |
| 2016/17 | U15 | 11 | 1 | 0 | 10 | 0 |
| 2016/17 | U17 | 7 | 3 | 0 | 4 | 0 |
| 2016/17 | U17/U19 | 4 | 2 | 0 | 2 | 0 |
| 2017/18 | U11 | 7 | 6 | 0 | 1 | 0 |
| 2017/18 | U13 | 10 | 4 | 0 | 6 | 0 |
| 2017/18 | U15 | 8 | 1 | 0 | 7 | 0 |
| 2017/18 | U17/U19 | 10 | 4 | 0 | 6 | 0 |
| 2018/19 | U11 | 9 | 8 | 0 | 1 | 0 |
| 2018/19 | U13 | 6 | 6 | 0 | 0 | 0 |
| 2018/19 | U17/U19 | 9 | 3 | 0 | 6 | 0 |
| 2019/20 | U11 | 7 | 5 | 0 | 2 | 0 |
| 2019/20 | U13 | 6 | 6 | 0 | 0 | 0 |
| 2019/20 | U15 | 5 | 4 | 0 | 1 | 0 |
| 2020/21 | U09 | 5 | 5 | 0 | 0 | 0 |
| 2020/21 | U11 | 9 | 9 | 0 | 0 | 0 |
| 2020/21 | U13 | 11 | 9 | 0 | 2 | 0 |
| 2020/21 | U15 | 17 | 15 | 0 | 2 | 0 |
| 2021/22 | U09 | 9 | 7 | 0 | 2 | 0 |
| 2021/22 | U11 | 20 | 20 | 0 | 0 | 0 |
| 2021/22 | U13 | 21 | 19 | 0 | 2 | 0 |
| 2021/22 | U15 | 25 | 23 | 0 | 2 | 0 |
| 2022/23 | U09 | 8 | 0 | 0 | 8 | 0 |
| 2022/23 | U11 | 27 | 24 | 0 | 3 | 24 |
| 2022/23 | U13 | 19 | 18 | 0 | 1 | 18 |
| 2022/23 | U15 | 26 | 24 | 0 | 2 | 24 |
| 2022/23 | U17/U19 | 8 | 7 | 0 | 1 | 7 |
| 2023/24 | U09 | 9 | 0 | 0 | 9 | 0 |
| 2023/24 | U11 | 29 | 20 | 1 | 8 | 0 |
| 2023/24 | U13 | 28 | 26 | 0 | 2 | 0 |
| 2023/24 | U15 | 33 | 30 | 0 | 3 | 6 |
| 2023/24 | U17/U19 | 8 | 8 | 0 | 0 | 6 |
| 2024/25 | U09 | 12 | 0 | 0 | 12 | 0 |
| 2024/25 | U11 | 27 | 3 | 0 | 24 | 0 |
| 2024/25 | U13 | 51 | 47 | 0 | 4 | 0 |
| 2024/25 | U15 | 25 | 24 | 0 | 1 | 4 |
| 2024/25 | U17/U19 | 7 | 6 | 0 | 1 | 5 |
| 2025/26 | U09 | 24 | 0 | 0 | 24 | 0 |
| 2025/26 | U11 | 29 | 0 | 0 | 29 | 0 |
| 2025/26 | U13 | 52 | 31 | 0 | 21 | 3 |
| 2025/26 | U15 | 44 | 41 | 0 | 3 | 37 |
| 2025/26 | U17/U19 | 17 | 16 | 0 | 1 | 16 |

Udeladte sæson×disciplin snapshots for entydigt koblede GSB-spillere er listet i JSON; fravær i dette arkiv beviser ikke fravær på kildens rangliste.

## 2. points_at_match

Samtlige 67.196 rækker: 0 ikke-blanke, 67196 blanke/NULL, 0 ikke-blanke nulværdier. Kolonnen er NULL overalt; ingen lagrede værdier kan afstemmes. Kolonnenavnet beviser ikke den tilsigtede provenance. API_RESEARCH.md beskriver Point i GetPlayerRankingListPoints, men det dokumenterer ikke, at denne DB-kolonne blev udfyldt fra API’et. Sæson×årgangstællinger findes i JSON.

## 3. national-spillere.db

Filstørrelse: 9.81 GB. Tabelrækketal: matches 203.012, players 76.169, player_matches 3.400.576, player_match_extras 3.779.792. Alle tabeller/skemaer står i JSON. Der findes hverken pointkolonne, verificeret Nembadminton-medlems-ID eller spillerens klub i skemaet.

## 4. Modstandere

| Sæson | GSB-ungdomsholdkampe i normaliseret DB |
|---|---:|
| 2025/26 U09 | 48 |
| 2025/26 U11 | 36 |
| 2025/26 U13 | 88 |
| 2025/26 U15 | 79 |
| 2025/26 U17/U19 | 20 |

Der er 271 GSB-rækker for sæsonerne 2025/26 og 2026/27; 271 findes i nationaldatabasen, 0 mangler matchrecord, 0 har uafklaret side, og 4 mangler hjemme-/udeholdnavn. Distinkte sidebestemte modstandere: 805; spiller×kamp-forekomster: 2108. Bekræftede ranglistepointlinks: 0. Navnelighedskandidater er ikke bekræftede koblinger.

Stikprøven på 10 GSB-spillere og 10 modstandere står i JSON. GSB-rækkerne viser dato, disciplin, medlemskobling og seneste snapshot på/inden kampdato; points_at_match er NULL. Modstanderrækkerne viser BadmintonPlayer-ID/navn og matchhold, men ingen sikker tværkilde-ID-kobling.

## 5. API/hash-parametre

Lokale scripts og gemte svar støtter liste-ID’erne 287 (tilmeldingsniveau), 288 (single), 289 (double), 292 (mixdouble). GetRankingListVersions returnerede gemt HTTP 200; GetPlayerRankingListPoints virker i profilkontekst, mens historisk direkte forespørgsel gav HTTP 500; GetRankingListPlayers’ afprøvede body gav HTTP 500. Hash-eksemplerne er ikke en bevist API-kontrakt: felter 1/2 har bedst støtte som liste-ID/sæson; flere andre positioner forbliver ukendte, især 4, 8 og 10–21. Ingen af de 12 listeeksempler er dokumenteret som komplet direkte hentning uden sidekontekst.

## 6. Hentningsplan

1. Pilotér offentligt én historisk version pr. liste 288/289/292; bekræft hash→API-parametre og en succesfuld GetRankingListPlayers-side før fuld indsamling.
2. Foreløbigt overslag: 5 sæsoner × 3 lister = 15 versionsopslag; 49 observerede datoer × 3 lister = 147 første-sider-kald, pagination ukendt. Det er estimater, ikke en fungerende hentningsrute.
3. Gem rå svar og normaliserede værdier i en ny separat database med spiller/liste/version, kilde, requestparametre, hentetid, response-hash, pagination og coverage-status. Checkpoint, sekventiel trafik og backoff på 429/5xx.
4. Ved kampkobling vælges seneste snapshotdato ≤ kampdato; ingen fremadfyldning. Historik før 2022/23 mangler i det lokale snapshotarkiv; om kilden kan levere den, er uafklaret.

## Databasekontrol

| Database | SHA-256 før | SHA-256 efter | Uændret |
|---|---|---|---|
| gsb-statistik-normalized.db | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E | ja |
| liga-landskab.db | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C | ja |
| rangliste-historik.db | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F | ja |
| national-spillere.db | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E | ja |

Nationaldatabasens rækketal før/efter er uændrede; alle tabeltal fremgår af JSON. Ingen database blev skrevet.

