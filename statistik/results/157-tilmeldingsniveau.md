# Opgave 157 — tilmeldingsniveau

Genereret 2026-10-09. Script: statistik/scripts/157-tilmeldingsniveau.py (offline). Status: trin 2 stoppet efter kortets stopregel. Ingen nye BadmintonPlayer-kald.

## 1. Officielle regler

Fundet: [Fællesreglement for Ranglisten 2023/24, PDF dateret 07-02-2024](https://badminton.dk/wp-content/uploads/2024/02/Reglement-for-Rangliste-2023-2024-070224.pdf), 13 sider.

- §5 stk. 1, s. 3: tilmeldingsniveau reguleres med en matematisk formel som et “vægtet gennemsnit af alle kategorier man er aktiv i”; kategorien med flest point “vægte[r] højst”. Koefficienter og den fulde formel står ikke i dokumentet.
- Appendiks A, s. 9: ungdomsrækker bruger pointintervaller efter køn og aldersgruppe; skemaet vurderes kvartalsvis. Skemaet nedenfor er kun 2023/24-udgaven, opdateret 29-01-2024.
- Appendiks A, s. 11: voksenrækker bruger separate placeringsintervaller for herrer og damer. Også disse vurderes kvartalsvis.
- Appendiks A, s. 11: samlet tilmeldingsniveau bygger på alle spillerens kampe. Appendiks B, s. 12 definerer kampantal som enkeltkampe i kategorien fra sæsonstart til seneste gældende resultat.
- Badminton Danmarks artikel fra 22-06-2020 siger: “Ranglisten kigger én sæson tilbage i forhold til antal spillede kampe.” Artiklen beskriver den nye NIVEAU-formel indført til 2020/21, men ikke koefficienterne.
- 2023-artiklen siger, at ungdommens rækkeintervaller blev opdateret 01-11-2023; 2024-artiklen beskriver ændringer for U11 A-B og U13 drenge med virkning 29-01-2024. Det dokumenterer, at skalaer kan ændres inden for en sæson.
- Badminton.dk/rangliste linker til en 2026/27-version på https://badminton.dk/wp-content/uploads/2026/09/Reglement-for-Rangliste-2026-09-10.pdf. Den blev ikke hentet, da loftet på 10 GET-kald var nået. Komplet sæsonhistorik kunne ikke findes.

### Ungdommens punktintervaller i den fundne 2023/24-version

Værdierne er gengivet fra Appendiks A, s. 9. “—” betyder, at tabellen ikke angiver et interval for den kombination; E/E-M bruger rangeringsplaceringer for de angivne aldersgrupper. Dette er ikke en påstand om senere sæsoner.

| Køn/række | U09 | U11 | U13 | U15 | U17 | U19 |
|---|---|---|---|---|---|---|
| Drenge E | — | — | — | nr. 1–36 + top 12 i hver kategori | nr. 1–36 + top 12 i hver kategori | >3001 |
| Drenge E-M | — | — | — | nr. 37–42 | nr. 37–42 | — |
| Drenge M | — | — | 2250–1751 | nr. 43–1851 | nr. 43–2251 | 3000–2251 |
| Drenge M-A | — | — | 1750–1601 | 1850–1801 | 2250–2101 | 2250–2151 |
| Drenge A | — | 1500–1201 | 1600–1251 | 1800–1551 | 2100–1851 | 2150–1851 |
| Drenge A-B | — | 1200–1151 | 1250–1201 | 1550–1501 | 1850–1801 | 1850–1801 |
| Drenge B | — | 1150–951 | 1200–1051 | 1500–1251 | 1800–1551 | 1800–1551 |
| Drenge B-C | — | 950–901 | 1050–1001 | 1250–1201 | 1550–1501 | 1550–1501 |
| Drenge C | 1000–801 | 900–801 | 1000–901 | 1200–1051 | 1500–1201 | 1500–1201 |
| Drenge C-D | 800–701 | 800–751 | 900–851 | 1050–1001 | 1200–1151 | 1200–1151 |
| Drenge D | <701 | <751 | <851 | <1001 | <1151 | <1151 |
| Piger E | — | — | — | nr. 1–36 + top 12 i hver kategori | nr. 1–36 + top 12 i hver kategori | >2501 |
| Piger E-M | — | — | — | nr. 37–42 | nr. 37–42 | — |
| Piger M | — | — | 2100–1451 | nr. 43–1451 | nr. 43–1851 | 2500–1851 |
| Piger M-A | — | — | 1450–1251 | 1450–1401 | 1850–1751 | 1850–1751 |
| Piger A | — | 1400–1101 | 1250–1151 | 1400–1251 | 1750–1500 | 1750–1500 |
| Piger A-B | — | 1100–1051 | 1100–1051 | 1250–1201 | 1500–1451 | 1500–1451 |
| Piger B | — | 1050–851 | 1050–951 | 1200–1101 | 1450–1251 | 1450–1251 |
| Piger B-C | — | 850–801 | 950–901 | 1100–1051 | 1250–1201 | 1250–1201 |
| Piger C | 900–701 | 800–701 | 900–801 | 1050–951 | 1200–1051 | 1200–1051 |
| Piger C-D | 700–601 | 700–651 | 800–751 | 950–901 | 1050–1001 | 1050–1001 |
| Piger D | <601 | <651 | <751 | <901 | <1001 | <1001 |

### Voksenplaceringer i 2023/24

| Række | Herrer: placering | Damer: placering |
|---|---:|---:|
| E | 1–40 | 1–40 |
| E-M | 41–200 | 41–150 |
| M | 201–400 | 151–300 |
| M-A | 401–700 | 301–500 |
| A | 701–2000 | 501–1000 |
| A-B | 2001–2500 | 1001–1200 |
| B | 2501–3500 | 1201–1700 |
| B-C | 3501–4000 | 1701–1900 |
| C | 4001–5000 | 1901–2400 |
| C-D | 5001–6000 | 2401–2600 |
| D | >6000 | >2600 |

## 2. 287-datasæt og versionsdækning

rangliste-point.db har 236.762 ranking_points-rækker og 0 rækker med list_id=287. Den har 13 punktversioner: 11 for 2025/26 og 2 for 2026/27. Datoerne står i JSON.

| Sæson | Punktversioner | 287-rækker i DB | Eksisterende gemt 287-materiale |
|---|---:|---:|---|
| 2025/26 | 11 | 0 | ingen |
| 2026/27 | 2 | 0 | 3 af 4 GSB-sider for “Seneste” (menuen viser 07-10-2026), samt global side 0 |

De fem genbrugte svar stammer fra opgave 150; ingen 157-forespørgsel gik til badmintonplayer.dk. De tre GSB-sider indeholder 300 rækker, men pagineringen viser fire sider, så side 3 mangler. Det globale svar er kun side 0 af 212. Filtreret listes første placering er lokal i filteret; placeringen i parentes er samlet (156 Del A). Pointkolonnen i 287-svaret er tom.

### Hvorfor analysen stoppede

Hvis alle 13 punktversioner skal have komplet GSB-filtreret 287-rang, er estimatet 13 × 4 = 52 POST-sider; tre aktuelle sider er allerede gemt, så der mangler 49 POST-kald plus 1 frisk GET = **50 kald**. Det overskrider grænsen 40. Historiske sidetal er ikke verificeret; estimatet fastholder det observerede aktuelle sidetal på fire.

Til sammenligning kræver komplet, global 287-liste cirka 13 × 212 = 2.756 kald i alt inkl. ét GET; én aktuel global side er gemt, så der mangler anslået 2.755 POST-sider. Historiske sidetal kan variere.

Derfor blev trin 2 stoppet. Ingen manglende ranglister blev hentet, og der er ikke lavet et spiller/version-datasæt med påstået fuld dækning.

### Hvad de eksisterende 287-svar viser

- **playerid:** requesten med playerid blev ikke afprøvet for liste 287. Rå HTML har profil-ID'er i spillerlinks, men det beviser ikke, hvordan requestfilteret playerid påvirker rangplaceringen.
- **U09:** 0 U09-rækker blandt de 300 GSB-resultater på sider 0–2. Der er heller ingen U09 i den gemte agegroupid=5, gender=K-prøve. U09 blev ikke særskilt forespurgt; om U09 findes på hele liste 287 er ukendt.
- **Damer mod herrer:** der er kun et gemt K-filter (100 rækker), ikke en tilsvarende M-prøve. En sammenligning er derfor ukendt.
- Den gemte K-prøve indeholder blandt andet U17 E sammen med U15-klasser. Aldersparameterens præcise semantik udledes ikke af dette.

Tre opslagseksempler fra den offentlige side, gemt 07-10-2026:

| Spiller | Række | Lokal GSB-rang | Samlet rang | Profil-ID |
|---|---|---:|---:|---:|
| Jonas Trusell-Jensen, Gladsaxe Søborg | SEN M-A | 1 | 497 | 92509 |
| Morten Aarøe, Gladsaxe Søborg | SEN M-A | 2 | 507 | 13216 |
| Jonathan W. Hansen, Gladsaxe Søborg | SEN M-A | 3 | 599 | 93216 |

## 3. Kandidatformler og korrelation

**Ikke beregnet**, fordi trin 2 stoppede. Ingen versionsmatchet 287-rang findes i databasen; 2025/26 har slet ingen 287-snapshot. Derfor findes ingen gyldig M/K-gruppe at måle mod. Spearman, Kendall, parrækkefølge, gruppestørrelser og delte placeringskontroller er ikke tilgængelige — ikke nul.

Kandidaterne, der mangler test, er bedste disciplins point, sum, gennemsnit, kampvægtet sum efter seneste sæsons kampantal samt gulv/loft pr. disciplin. Der rapporteres ingen “bedste” kandidat uden måling.

## 4. Rækkegrænser

2023/24-reglementet dokumenterer ungdommens køns-/aldersspecifikke pointintervaller og voksnes kønsspecifikke placeringsintervaller ovenfor. At intervallerne vurderes kvartalsvis betyder, at de ikke må antages stabile. De gemte 287-svar og pointversioner dækker ikke nok til at måle aktuelle eller historiske 287-grænser pr. version.

## 5. “Hvor mange point skal jeg bruge?”

Ingen opslagstabel. Ingen formel bestod Spearman ≥ 0,95 (formlerne blev ikke testet), og reglementsteksten giver ikke koefficienterne for det vægtede gennemsnit.

## 6. Anbefaling

Det kan siges, at tilmeldingsniveau er et vægtet gennemsnit af aktive kategorier, at kategorien med flest point vægter mest, og at kampaktivitet tæller ind. Den konkrete vægtning er ukendt. Før næste måling bør Chris vælge mellem én repræsentativ, seneste ranglisteversion pr. sæson (foreløbigt ca. 6 kald inkl. frisk GET, hvis fire GSB-sider gælder) eller komplet dækning af alle 13 punktversioner (estimat 50 GSB-filtrerede kald, over loftet 40). Historiske sidetal er ikke verificeret.

## Forespørgselslog

Badminton.dk: 10 anonyme, sekventielle GET-kald; mindst 2,2 sekunder mellem kald. Første, allerede kendte PDF-URL gav 404 HTML og er ikke behandlet som et dokument. De øvrige ni gav HTTP 200. BadmintonPlayer.dk i opgave 157: 0 nye kald. Fem gemte POST-svar fra opgave 150 er genbrugt med callbackcontextkey udeladt. Se JSON for alle URL'er, præcise ændrede requestfelter, status, bytes, svarhash og gemmesti.

Råsvar ligger i statistik/results/157-raa-svar/: ti officielle svar og fem genbrugte 287-svar. 404-svaret har HTML-signatur, ikke PDF-signatur.

## Faktiske skemaer

Alle databaser blev åbnet readOnly og med PRAGMA query_only=ON. JSON indeholder de fulde faktiske tabeller og kolonner fra hver database. Centrale tabeller:

| Database | Tabel | Kolonner |
|---|---|---|
| rangliste-point.db | ranking_points | list_id, param, version_date, player_id, member_number, name, club, class, rank, points, page_index, fetched_at, response_sha256 |
| rangliste-point.db | ranking_needs | season_id, external_match_id, game_date, external_player_id, player_name, team_side, discipline, list_id, param, version_date, status, points, details |
| gsb-statistik-normalized.db | individual_matches | individual_match_id, team_match_id, discipline_raw, game_number_raw, category_raw, home_score_raw, away_score_raw, winner_side, status, result_marker_raw |
| gsb-statistik-normalized.db | individual_match_players | individual_match_id, player_id, side, pair_number, role, points_at_match |
| gsb-statistik-normalized.db | players | player_id, external_player_id, name_raw, name_normalized |
| gsb-statistik-normalized.db | team_matches | team_match_id, external_match_id, season_id, competition_id, gsb_team_id, round_number, round_date, game_time, home_name_raw, away_name_raw, result_raw, points_raw, status, walkover_text_raw, source_status, raw_payload_id, walkover_winner_raw, remark_raw |
| national-spillere.db | player_matches | external_player_id, external_match_id, name_raw, team_side, discipline_code, partner_player_id, opponent_player_id, set_scores_raw, walkover_raw, round_raw, context_raw |
| rangliste-historik.db | ranking_snapshots | nembadminton_member_id, discipline, version_date, points, source_query, fetched_at, raw_response_sha256 |
| liga-landskab.db | age_groups | age_group_id, name, years_from, years_to, years_from_tournament, years_to_tournament, source_endpoint, first_seen_at, last_seen_at |

## Databasehashes før/efter

| Database | Før | Efter | Uændret |
|---|---|---|---|
| gsb-statistik-normalized.db | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E | ja |
| liga-landskab.db | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C | ja |
| rangliste-historik.db | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F | ja |
| national-spillere.db | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E | ja |
| rangliste-point.db | DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9 | DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9 | ja |

## Kontrolstatus

- Trin 1: regelbogens vægtede gennemsnit og 2023/24 grænser dokumenteret; fuld koefficient og sæsonhistorik ikke fundet.
- Trin 2: udført; stopregel aktiveret på manglende 287-dækning og 50-kaldsestimat.
- Trin 3–5: ikke udført; afhænger af versionsmatchede ranglister.
- Trin 6: anbefaling givet med dækningsvalg til Chris.
- Databaser: fem hashes uændrede; readOnly/query_only verificeret.
- Kald: 10 badminton.dk, 0 nye badmintonplayer.dk; ingen CAPTCHA/botværn set.

