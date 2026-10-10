# 191 — personnøgle for kampdata

Netværkskald: **0**. Normalized database åbnede read-only (mode=ro, PRAGMA query_only=ON).

## Omfang

| Mængde | Player-ID’er |
|---|---:|
| GSB-side, alle sæsoner | 677 |
| GSB-side, 2025/26 | 289 |
| Andre ID’er i kampdata | 6910 |
| Alle ID’er med kampdata | 7599 |

## Klasser

| Klasse | Alle kampdata | GSB alle sæsoner | GSB 2025/26 |
|---|---:|---:|---:|
| sikker | 0 | 0 | 0 |
| sandsynlig | 617 | 617 | 262 |
| uafklaret | 6982 | 60 | 27 |
| navnebroedre | 0 | 0 | 0 |
| samme_person | 0 | 0 | 0 |

Klassifikationen er konservativ. Kort 164s normalized-ID-koblinger er udtrykkeligt kandidatkoblinger; de bliver ikke ophøjet til sikre på baggrund af navn alene. `sandsynlig` betyder her ét eksakt navnekandidat-ID med GSB-klub-/sæsonkontekst, men stadig uafklaret kildekobling. `sikker`, `samme_person` og `navnebroedre` er 0, når evidensen ikke kan afgøre det.

## Konflikttjek

Tildelte personnøgler, som dækker to IDs i samme individuelle kamp: **0**.
Ingen konflikter.

## Trup (44 navne)

Trupkilder: 164s 2026/27 roster-felt. Rækker markeret uafklaret følger 164 eller har ingen eksakt kampnavnematch.

| Navn | Klasse | Normalized ID | Kandidater | Klub | Sæson | Aldersgruppe |
|---|---|---|---|---|---|---|
| Adnan Bacic | sandsynlig | 501 | id:83626 | Gladsaxe Søborg, modstander | 2023, 2024, 2025 | age_group_id:1 |
| Andreas Ryun Drasbek | uafklaret | ukendt | ukendt | ukendt | ukendt | ukendt |
| Anja Thomsen | sandsynlig | 214 | id:325460 | Gladsaxe Søborg, modstander | 2023, 2024, 2025 | age_group_id:1, age_group_id:11, age_group_id:9 |
| Brian Oddershede | sandsynlig | 366 | id:15489 | Gladsaxe Søborg | 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |
| Camilla Steinmetz Bagge | uafklaret | ukendt | ukendt | ukendt | ukendt | ukendt |
| Christian Staal | uafklaret | 466 | name:christian staal | Gladsaxe Søborg | 2021, 2022, 2023, 2024, 2025 | age_group_id:1 |
| Christoffer Müller | sandsynlig | 341 | id:84737 | Gladsaxe Søborg | 2023, 2024, 2025 | age_group_id:1 |
| Erik Juul | sandsynlig | 510 | id:84256 | Gladsaxe Søborg | 2012, 2013, 2015, 2016, 2018, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:18, age_group_id:5, age_group_id:6 |
| Gitte Mathiasen | sandsynlig | 393 | id:337358 | modstander, Gladsaxe Søborg | 2022, 2024, 2025 | age_group_id:1, age_group_id:11, age_group_id:9 |
| Hannah Clausen | sandsynlig | 222 | id:1700 | modstander, Gladsaxe Søborg | 2013, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:5 |
| Helle Mathiasen | sandsynlig | 363 | id:212836 | modstander, Gladsaxe Søborg | 2015, 2016, 2018, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:11, age_group_id:9 |
| Jonas Trusell-Jensen | sandsynlig | 228 | id:92509 | Gladsaxe Søborg | 2012, 2013, 2014, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:5, age_group_id:6 |
| Jonathan W. Hansen | uafklaret | 226 | name:jonathan w. hansen | Gladsaxe Søborg | 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:18, age_group_id:4, age_group_id:5 |
| Kenn Blæsbjerg Christensen | sandsynlig | 296 | id:319834 | Gladsaxe Søborg | 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |
| Kenneth Hasselby | sandsynlig | 219 | id:11171 | Gladsaxe Søborg | 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |
| Lene Sørensen | uafklaret | 461 | name:lene sørensen | Gladsaxe Søborg, modstander | 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2025 | age_group_id:1, age_group_id:9 |
| Linda Bækgaard | uafklaret | 471 | id:16498 | Gladsaxe Søborg | 2012, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1 |
| Line Nielsen | uafklaret | 218 | name:line nielsen | modstander, Gladsaxe Søborg | 2012, 2015, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |
| Linus Bergström Hesselballe | uafklaret | ukendt | ukendt | ukendt | ukendt | ukendt |
| Louis Valdemar Hedegaard Toftlund | sandsynlig | 66 | id:330770 | Gladsaxe Søborg | 2021, 2022, 2023, 2024, 2025 | age_group_id:3, age_group_id:4, age_group_id:5 |
| Louise Korsby Kofoed | uafklaret | ukendt | ukendt | ukendt | ukendt | ukendt |
| Malthe Baltzer | sandsynlig | 354 | id:277770 | Gladsaxe Søborg | 2016, 2017, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:3, age_group_id:4, age_group_id:5 |
| Marie Gotfred Johansen | sandsynlig | 348 | id:276042 | Gladsaxe Søborg | 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |
| Michelle Christensen | sandsynlig | 260 | id:55454 | modstander, Gladsaxe Søborg | 2017, 2022, 2023, 2024, 2025 | age_group_id:1 |
| Mina Lorin Özden | sandsynlig | 398 | id:327186 | Gladsaxe Søborg | 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:3, age_group_id:4, age_group_id:5 |
| Morten Aarøe | sandsynlig | 215 | id:13216 | Gladsaxe Søborg | 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |
| Nadia Mortensen | uafklaret | ukendt | ukendt | ukendt | ukendt | ukendt |
| Oliver Frei | sandsynlig | 230 | id:229287 | Gladsaxe Søborg | 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:18, age_group_id:5, age_group_id:6 |
| Oliver Guldbæk | sandsynlig | 345 | id:155870 | Gladsaxe Søborg | 2012, 2013, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:18, age_group_id:5 |
| Oscar Donovan | sandsynlig | 422 | id:169458 | Gladsaxe Søborg | 2025 | age_group_id:1 |
| Oskar Isbosethsen | sandsynlig | 644 | id:365036 | Gladsaxe Søborg | 2025 | age_group_id:1 |
| Rasmus Holmslykke Andersen | sandsynlig | 339 | id:45550 | Gladsaxe Søborg | 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1 |
| Rosa Hinge Carlsson | sandsynlig | 92 | id:337784 | Gladsaxe Søborg | 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:4, age_group_id:5 |
| Sebastian Almeida Møller | uafklaret | 460 | name:sebastian almeida møller | Gladsaxe Søborg | 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:18, age_group_id:3, age_group_id:4, age_group_id:5 |
| Shenai Antony | uafklaret | ukendt | ukendt | ukendt | ukendt | ukendt |
| Signe Aarøe Jørgensen | sandsynlig | 465 | id:10987 | Gladsaxe Søborg | 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |
| Stine Louise Knudsen | sandsynlig | 344 | id:14568 | Gladsaxe Søborg | 2012, 2013, 2014, 2015, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |
| Sverre Stütz | sandsynlig | 724 | id:52578 | Gladsaxe Søborg | 2025 | age_group_id:1 |
| Sylvester Østberg | sandsynlig | 1355 | id:337789 | Gladsaxe Søborg | 2022, 2023, 2024, 2025 | age_group_id:3, age_group_id:4, age_group_id:5 |
| Theodor Lumby Jessen | sandsynlig | 162 | id:327691 | modstander, Gladsaxe Søborg | 2021, 2024, 2025 | age_group_id:3, age_group_id:5 |
| Thor Pedersen | uafklaret | 356 | name:thor pedersen | Gladsaxe Søborg | 2025 | age_group_id:1 |
| Thøger Jakobsen | uafklaret | ukendt | ukendt | ukendt | ukendt | ukendt |
| Tobias Weinreich Hansen | sandsynlig | 387 | id:156249 | Gladsaxe Søborg | 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:18, age_group_id:3, age_group_id:4, age_group_id:5 |
| Yiting Chen | uafklaret | 558 | name:yiting chen | Gladsaxe Søborg | 2019, 2020, 2021, 2022, 2023, 2024, 2025 | age_group_id:1, age_group_id:9 |

## Skøn (vurdering)

GSB-side kampoptrædener: 33544; med sandsynlig personkandidat: 29640 (88.36 %). I 2025/26 var 4537 optrædener, hvoraf 4092 (90.19 %) har en sandsynlig kandidat. Det er ikke en persondækning: kandidaterne fra 164 er ikke godkendte identiteter. Grundlaget er derfor ikke stort nok til spillertal uden forbehold.

Stikprøve på 10 `sikker`-koblinger: **0 tilgængelige**, fordi ingen kobling opfylder den krævede uafhængige evidensstandard i dette udtræk. Stikprøve på uafklarede med evidens:

- 763 Daniel Borgen: kandidat name:daniel borgen; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Daniel Borgen | sæsoner: 2015, 2016, 2023, 2025 | aldersgrupper: age_group_id:1 | klubkontekst: Gladsaxe Søborg, modstander | 164 normalized_db_ids kandidat(er): name:daniel borgen; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 176 Ikke fremmødt: kandidat name:ikke fremmødt; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Ikke fremmødt | sæsoner: 2013, 2015, 2016, 2017, 2020, 2021, 2022, 2023, 2024, 2025 | aldersgrupper: age_group_id:1, age_group_id:11, age_group_id:18, age_group_id:3, age_group_id:4, age_group_id:5, age_group_id:9 | klubkontekst: Gladsaxe Søborg, modstander | 164 normalized_db_ids kandidat(er): name:ikke fremmødt; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 3329 Katrine Dehn: kandidat name:katrine dehn; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Katrine Dehn | sæsoner: 2016, 2017, 2018 | aldersgrupper: age_group_id:1 | klubkontekst: Gladsaxe Søborg | 164 normalized_db_ids kandidat(er): name:katrine dehn; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 74 Cecilie Johansen: kandidat name:cecilie johansen; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Cecilie Johansen | sæsoner: 2023, 2024, 2025 | aldersgrupper: age_group_id:2, age_group_id:3, age_group_id:4 | klubkontekst: Gladsaxe Søborg, modstander | 164 normalized_db_ids kandidat(er): name:cecilie johansen; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 1602 Kenneth Jørgensen: kandidat name:kenneth jørgensen; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Kenneth Jørgensen | sæsoner: 2024 | aldersgrupper: age_group_id:1 | klubkontekst: Gladsaxe Søborg | 164 normalized_db_ids kandidat(er): name:kenneth jørgensen; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 740 Jan Pedersen: kandidat name:jan pedersen; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Jan Pedersen | sæsoner: 2025 | aldersgrupper: age_group_id:1, age_group_id:9 | klubkontekst: Gladsaxe Søborg | 164 normalized_db_ids kandidat(er): name:jan pedersen; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 752 Chiori Nagatsuka: kandidat name:chiori nagatsuka; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Chiori Nagatsuka | sæsoner: 2015, 2025 | aldersgrupper: age_group_id:1, age_group_id:9 | klubkontekst: modstander, Gladsaxe Søborg | 164 normalized_db_ids kandidat(er): name:chiori nagatsuka; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 3673 Sofie Jensen: kandidat name:sofie jensen; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Sofie Jensen | sæsoner: 2012, 2013, 2014, 2015, 2016, 2017 | aldersgrupper: age_group_id:11, age_group_id:9 | klubkontekst: Gladsaxe Søborg | 164 normalized_db_ids kandidat(er): name:sofie jensen; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 3327 Jonas Møller: kandidat name:jonas møller; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Jonas Møller | sæsoner: 2018 | aldersgrupper: age_group_id:1 | klubkontekst: Gladsaxe Søborg | 164 normalized_db_ids kandidat(er): name:jonas møller; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt
- 1023 Henrik Vilhelmsen: kandidat name:henrik vilhelmsen; GSB-side: ja; bestemt via club_id=1093 og eksakt team.name_raw/home_name_raw/away_name_raw (kort 187) | normaliseret navn: Henrik Vilhelmsen | sæsoner: 2016, 2017, 2022, 2024, 2025 | aldersgrupper: age_group_id:1, age_group_id:11, age_group_id:9 | klubkontekst: modstander, Gladsaxe Søborg | 164 normalized_db_ids kandidat(er): name:henrik vilhelmsen; 164 angiver navn+klub-koblinger som uafklarede kandidater | klassegrundlag: kun name:-personnøgle fra 164; den er ikke et person-ID, ingen valgt

## Forslag til senere brug

Foreslå en særskilt, versionsstyret mappingfil som review-kilde i første omgang. Senere kan godkendte bindinger indlæses i en normalized DB mappingtabel med source namespace, candidate/confirmed/rejected status, evidensreference, reviewed_by og validitet. Uafklarede rækker må aldrig tælles som personer.

## Kontroltal

Antal CSV-rækker i kobling: 7599; antal GSB IDs 2025/26: 289; netværkskald: 0; konfliktantal: 0.

