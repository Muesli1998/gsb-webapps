# Opgave 088a — intern kortlægning

Genereret 2026-09-25T17:01:06.010Z. Kun læsning af allerede hentet data; ingen API-kald eller websøgning.

## 1. ID-jagt

Kun ShowStanding-side-3’s leagueGroupTeamID ses systematisk i det repræsentative rå-HTML-udsnit; den er allerede udtrukket i league_group_teams og er pulje-/sæsonlokal. Ingen stabil klub-ID-markør blev fundet i det repræsentative 500-sides udsnit.

| Signal i 500 indeks-/puljesider | Forekomster |
|---|---:|
| showStandingTeam | 1409 |
| hrefClubId | 0 |
| dataClubId | 0 |
| hrefTeamId | 0 |
| dataTeamId | 0 |

## 2. Gruppetype-katalog

18546 puljer giver 8928 distinkte kombinationer. Klassifikation sker alene ud fra navneord. `andet/ukendt` er bevidst ikke gættet.

| Type | Puljeforekomster |
|---|---:|
| grundspil | 13305 |
| andet/ukendt | 1793 |
| nedrykningsspil | 306 |
| slutspil | 2920 |
| oprykningsspil | 160 |
| kvalifikation_ned | 47 |
| kvalifikation_op | 15 |

| Division | Gruppe | Type | Forekomster | Sæsoner | Regioner | Grundlag |
|---|---|---|---:|---|---:|---|
| Serie 3 | Pulje 1 | grundspil | 53 | 2011–2026 | 16 | navneord: grundspil/pulje |
| Serie 2 | Pulje 1 | grundspil | 51 | 2011–2026 | 16 | navneord: grundspil/pulje |
| Serie 1 | Pulje 1 | grundspil | 39 | 2011–2026 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 1 | grundspil | 32 | 2013–2018 | 11 | navneord: grundspil/pulje |
| Veteran A | Pulje 1 | grundspil | 31 | 2011–2026 | 5 | navneord: grundspil/pulje |
| Veteran B | Pulje 1 | grundspil | 31 | 2011–2026 | 5 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1 | grundspil | 30 | 2013–2018 | 11 | navneord: grundspil/pulje |
| Serie 2 | Pulje 2 | grundspil | 29 | 2011–2026 | 12 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 1 | grundspil | 28 | 2013–2018 | 11 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 1 | grundspil | 28 | 2013–2018 | 11 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1 | grundspil | 26 | 2013–2018 | 10 | navneord: grundspil/pulje |
| Serie 3 | Pulje 2 | grundspil | 24 | 2011–2026 | 11 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 2 | grundspil | 24 | 2013–2018 | 10 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 1 | grundspil | 22 | 2013–2017 | 10 | navneord: grundspil/pulje |
| Serie 1 | Pulje 2 | grundspil | 21 | 2011–2026 | 4 | navneord: grundspil/pulje |
| Veteran C | Pulje 1 | grundspil | 18 | 2011–2026 | 3 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 2 | grundspil | 18 | 2013–2018 | 9 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 1 | grundspil | 18 | 2014–2018 | 10 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 1 | grundspil | 18 | 2014–2018 | 11 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 1 | grundspil | 18 | 2015–2018 | 7 | navneord: grundspil/pulje |
| Badmintonligaen | Grundspil | grundspil | 16 | 2011–2026 | 1 | navneord: grundspil/pulje |
| 3. division | Pulje 1 | grundspil | 16 | 2011–2026 | 1 | navneord: grundspil/pulje |
| 3. division | Pulje 2 | grundspil | 16 | 2011–2026 | 1 | navneord: grundspil/pulje |
| 3. division | Pulje 3 | grundspil | 16 | 2011–2026 | 1 | navneord: grundspil/pulje |
| 3. division | Pulje 4 | grundspil | 16 | 2011–2026 | 1 | navneord: grundspil/pulje |
| Serie 4 | Pulje 1 | grundspil | 16 | 2011–2026 | 12 | navneord: grundspil/pulje |
| Sjællandsserien | Pulje 1 | grundspil | 16 | 2011–2026 | 1 | navneord: grundspil/pulje |
| Sjællandsserien | Pulje 2 | grundspil | 16 | 2011–2026 | 1 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 2 | grundspil | 16 | 2013–2018 | 8 | navneord: grundspil/pulje |
| 2. division | Pulje 1 | grundspil | 15 | 2011–2026 | 1 | navneord: grundspil/pulje |
| 2. division | Pulje 2 | grundspil | 15 | 2011–2026 | 1 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 2 | grundspil | 14 | 2013–2018 | 7 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 2 | grundspil | 14 | 2013–2017 | 7 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 1 | grundspil | 14 | 2014–2018 | 7 | navneord: grundspil/pulje |
| Veteran B | Pulje 2 | grundspil | 13 | 2011–2022 | 3 | navneord: grundspil/pulje |
| MOT 4+4 Elite/Mester | Pulje 1 | grundspil | 13 | 2014–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+4 Serie 5 | Pulje 1 | grundspil | 13 | 2014–2024 | 2 | navneord: grundspil/pulje |
| 1. Serie | Pulje 1 | grundspil | 13 | 2023–2026 | 1 | navneord: grundspil/pulje |
| Serie 1 | Pulje 3 | grundspil | 12 | 2011–2023 | 1 | navneord: grundspil/pulje |
| Serie 1 | Pulje 4 | grundspil | 12 | 2011–2023 | 1 | navneord: grundspil/pulje |
| U15 4+3 | Pulje 1 | grundspil | 12 | 2013–2018 | 8 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 1 | grundspil | 12 | 2014–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 2 | grundspil | 12 | 2014–2017 | 7 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 3 | grundspil | 12 | 2015–2018 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3 | grundspil | 12 | 2015–2018 | 6 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1 | grundspil | 12 | 2020–2023 | 7 | navneord: grundspil/pulje |
| 2. Serie | Pulje 1 | grundspil | 12 | 2023–2026 | 1 | navneord: grundspil/pulje |
| Motion | Pulje 1 | grundspil | 11 | 2011–2021 | 3 | navneord: grundspil/pulje |
| 3. Serie | Pulje 1 | grundspil | 11 | 2023–2026 | 1 | navneord: grundspil/pulje |
| Hold DM | Pulje 1 | grundspil | 10 | 2013–2014 | 4 | navneord: grundspil/pulje |
| Hold DM | Pulje 2 | grundspil | 10 | 2013–2014 | 4 | navneord: grundspil/pulje |
| U11 B 4-8 spillere | Pulje 1 | grundspil | 10 | 2013–2014 | 4 | navneord: grundspil/pulje |
| U11 C 4-8 spillere | Pulje 1 | grundspil | 10 | 2013–2014 | 4 | navneord: grundspil/pulje |
| U11 D 4-8 spillere | Pulje 1 | grundspil | 10 | 2013–2014 | 4 | navneord: grundspil/pulje |
| U11 B 4 spillere | Pulje 1 | grundspil | 10 | 2013–2017 | 8 | navneord: grundspil/pulje |
| U13 4+3 | Pulje 1 | grundspil | 10 | 2013–2018 | 6 | navneord: grundspil/pulje |
| U15 B 4-8 spillere | Pulje 1 | grundspil | 10 | 2013–2014 | 5 | navneord: grundspil/pulje |
| U15B 4 spillere | Pulje 1 | grundspil | 10 | 2013–2018 | 6 | navneord: grundspil/pulje |
| U15C 4 spillere | Pulje 1 | grundspil | 10 | 2013–2017 | 4 | navneord: grundspil/pulje |
| U15D 4 spillere | Pulje 1 | grundspil | 10 | 2013–2017 | 4 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 4 | grundspil | 10 | 2014–2018 | 7 | navneord: grundspil/pulje |
| U13 A 4 spillere | Pulje 1 | grundspil | 10 | 2014–2017 | 8 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 2 | grundspil | 10 | 2015–2017 | 7 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 4 | grundspil | 10 | 2015–2018 | 6 | navneord: grundspil/pulje |
| U17/U19 M 4 spillere | Pulje 1 | grundspil | 10 | 2015–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 2 | grundspil | 10 | 2015–2017 | 6 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 1 | grundspil | 10 | 2015–2018 | 6 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 1 | grundspil | 10 | 2015–2017 | 7 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1 | grundspil | 10 | 2020–2023 | 7 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1 | grundspil | 10 | 2020–2023 | 7 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1 | grundspil | 10 | 2020–2023 | 6 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 2 | grundspil | 10 | 2020–2023 | 6 | navneord: grundspil/pulje |
| U11 Kredsmatch | Pulje 1 | grundspil | 10 | 2021–2025 | 6 | navneord: grundspil/pulje |
| Danmarksserien | Vest pulje 1 | grundspil | 9 | 2010–2018 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Vest pulje 2 | grundspil | 9 | 2010–2018 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Vest pulje 3 | grundspil | 9 | 2010–2018 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Vest pulje 4 | grundspil | 9 | 2010–2018 | 1 | navneord: grundspil/pulje |
| Danmarksserien | &#216;st pulje 2 | grundspil | 9 | 2010–2018 | 1 | navneord: grundspil/pulje |
| Danmarksserien | &#216;st pulje 3 | grundspil | 9 | 2010–2018 | 1 | navneord: grundspil/pulje |
| Danmarksserien | &#216;st pulje 4 | grundspil | 9 | 2010–2018 | 1 | navneord: grundspil/pulje |
| LF-Serien | Pulje 1 | grundspil | 9 | 2013–2024 | 1 | navneord: grundspil/pulje |
| MOT 4+4 Serie 1 | Pulje 1 | grundspil | 9 | 2014–2021 | 2 | navneord: grundspil/pulje |
| MOT 4+2 Serie 2 | Pulje 1 | grundspil | 9 | 2017–2025 | 2 | navneord: grundspil/pulje |
| MOT 4+2 Serie 1 | Pulje 1 | grundspil | 9 | 2017–2025 | 2 | navneord: grundspil/pulje |
| 50+ 4+2 B | Pulje 1 | grundspil | 9 | 2018–2026 | 2 | navneord: grundspil/pulje |
| 1. division | Grundspil | grundspil | 8 | 2010–2018 | 1 | navneord: grundspil/pulje |
| Danmarksserien | &#216;st pulje 1 | grundspil | 8 | 2010–2018 | 1 | navneord: grundspil/pulje |
| A (4+3) | Pulje 1 | grundspil | 8 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Hold DM | Pulje 3 | grundspil | 8 | 2013–2014 | 4 | navneord: grundspil/pulje |
| U11C 4 spillere | Pulje 1 | grundspil | 8 | 2013–2015 | 4 | navneord: grundspil/pulje |
| U11D 4 spillere | Pulje 1 | grundspil | 8 | 2013–2015 | 4 | navneord: grundspil/pulje |
| U13 B 4-8 spillere | Pulje 1 | grundspil | 8 | 2013–2014 | 5 | navneord: grundspil/pulje |
| U13 C 4-8 spillere | Pulje 1 | grundspil | 8 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U13 D 4-8 spillere | Pulje 1 | grundspil | 8 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U13C 4 spillere | Pulje 1 | grundspil | 8 | 2013–2015 | 4 | navneord: grundspil/pulje |
| U15 A 4-8 spillere | Pulje 1 | grundspil | 8 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U15 D 4-8 spillere | Pulje 1 | grundspil | 8 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U15 C 4-8 spillere | Pulje 1 | grundspil | 8 | 2013–2014 | 4 | navneord: grundspil/pulje |
| U15D 4 spillere | Pulje 2 | grundspil | 8 | 2013–2017 | 3 | navneord: grundspil/pulje |
| U15C 4 spillere | Pulje 2 | grundspil | 8 | 2013–2017 | 4 | navneord: grundspil/pulje |
| U17 4+3 | Pulje 1 | grundspil | 8 | 2013–2018 | 6 | navneord: grundspil/pulje |
| U17/U19C 4 spillere | Pulje 1 | grundspil | 8 | 2013–2017 | 4 | navneord: grundspil/pulje |
| U17/U19B 4 spillere | Pulje 1 | grundspil | 8 | 2013–2018 | 4 | navneord: grundspil/pulje |
| U11 Begynder | Pulje 1 | grundspil | 8 | 2014–2018 | 5 | navneord: grundspil/pulje |
| U11D - 4 spillere | Pulje 1 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| U11D - 4 spillere | Pulje 2 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| U13B - 4 spillere | Pulje 1 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| U13C - 4 spillere | Pulje 1 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| U13D - 4 spillere | Pulje 1 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| U13D - 4 spillere | Pulje 2 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| U15B - 4 spillere | Pulje 1 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| U15C - 4 spillere | Pulje 1 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| U15D - 4 spillere | Pulje 1 | grundspil | 8 | 2014–2025 | 3 | navneord: grundspil/pulje |
| MOT 4+4 Serie 2 | Pulje 1 | grundspil | 8 | 2014–2020 | 2 | navneord: grundspil/pulje |
| MOT 4+4 Serie 4 | Pulje 1 | grundspil | 8 | 2014–2021 | 2 | navneord: grundspil/pulje |
| MOT 4 herrer Mester | Pulje 1 | grundspil | 8 | 2014–2021 | 1 | navneord: grundspil/pulje |
| U09 D 4 spillere | Pulje 1 | grundspil | 8 | 2015–2018 | 9 | navneord: grundspil/pulje |
| Kredsmatch | Pulje 1 | grundspil | 8 | 2015–2018 | 5 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U11D | Pulje 1 | grundspil | 8 | 2015–2018 | 2 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U13C | Pulje 1 | grundspil | 8 | 2015–2018 | 2 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U15C | Pulje 1 | grundspil | 8 | 2015–2018 | 2 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 3 | grundspil | 8 | 2015–2018 | 6 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 3 | grundspil | 8 | 2015–2017 | 6 | navneord: grundspil/pulje |
| U13 (4+3) | Pulje 1 | grundspil | 8 | 2016–2025 | 5 | navneord: grundspil/pulje |
| U15 (4+3) | Pulje 1 | grundspil | 8 | 2016–2025 | 5 | navneord: grundspil/pulje |
| U17 (4+3) | Pulje 1 | grundspil | 8 | 2016–2025 | 5 | navneord: grundspil/pulje |
| 2. division | Kvalifikation til 1. division | andet/ukendt | 8 | 2016–2025 | 1 | kvalifikation uden retning |
| 2. division | Nedrykning fra 2. division | nedrykningsspil | 8 | 2016–2025 | 1 | navneord: nedrykning |
| MOT 4+2 Elite/Mester | Pulje 1 | grundspil | 8 | 2016–2023 | 2 | navneord: grundspil/pulje |
| MOT 4+2 Serie 1-2 | Pulje 1 | grundspil | 8 | 2016–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+2 Serie 3-4 | Pulje 1 | grundspil | 8 | 2016–2026 | 1 | navneord: grundspil/pulje |
| DMU Hold U11 4+2 | Pulje 1 | grundspil | 8 | 2017–2025 | 2 | navneord: grundspil/pulje |
| B 4 spillere | Pulje 1 | grundspil | 8 | 2017–2017 | 2 | navneord: grundspil/pulje |
| C 4 spillere | Pulje 1 | grundspil | 8 | 2017–2017 | 2 | navneord: grundspil/pulje |
| SEN Hr - A | Pulje 1 | grundspil | 8 | 2017–2024 | 2 | navneord: grundspil/pulje |
| SEN Hr - B | Pulje 1 | grundspil | 8 | 2017–2024 | 2 | navneord: grundspil/pulje |
| 40+ 4+2 A | Pulje 1 | grundspil | 8 | 2018–2025 | 2 | navneord: grundspil/pulje |
| 40+ Hr - A | Pulje 1 | grundspil | 8 | 2018–2025 | 2 | navneord: grundspil/pulje |
| 40+ Hr - B | Pulje 1 | grundspil | 8 | 2018–2025 | 2 | navneord: grundspil/pulje |
| Kredsmatch BADSJ&#198; - BADKBH | Pulje 1 | grundspil | 8 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 - 4+3 | Pulje 1 | grundspil | 8 | 2019–2023 | 5 | navneord: grundspil/pulje |
| U15 - 4+3 | Pulje 1 | grundspil | 8 | 2019–2023 | 5 | navneord: grundspil/pulje |
| U17 - 4+3 | Pulje 1 | grundspil | 8 | 2019–2023 | 5 | navneord: grundspil/pulje |
| Danmarksserien | Pulje 1 | grundspil | 8 | 2019–2026 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Pulje 2 | grundspil | 8 | 2019–2026 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Pulje 3 | grundspil | 8 | 2019–2026 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Pulje 4 | grundspil | 8 | 2019–2026 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Pulje 5 | grundspil | 8 | 2019–2026 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Pulje 6 | grundspil | 8 | 2019–2026 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Pulje 7 | grundspil | 8 | 2019–2026 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Pulje 8 | grundspil | 8 | 2019–2026 | 1 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1 | grundspil | 8 | 2020–2022 | 7 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1 | grundspil | 8 | 2020–2022 | 7 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 2 | grundspil | 8 | 2020–2023 | 6 | navneord: grundspil/pulje |
| U13 Kredsmatch | Pulje 1 | grundspil | 8 | 2021–2024 | 6 | navneord: grundspil/pulje |
| Badmintonligaen | Kvartfinaler | slutspil | 7 | 2011–2025 | 1 | navneord: slutspil |
| Badmintonligaen | Semifinaler | slutspil | 7 | 2011–2025 | 1 | navneord: slutspil |
| Veteran M | Pulje 1 | grundspil | 7 | 2011–2017 | 1 | navneord: grundspil/pulje |
| Serie 2 | Pulje 3 | grundspil | 7 | 2011–2018 | 9 | navneord: grundspil/pulje |
| Badmintonligaen | Bronzekamp | slutspil | 7 | 2012–2025 | 1 | navneord: slutspil |
| MOT 4 herrer Elite | Pulje 1 | grundspil | 7 | 2014–2021 | 1 | navneord: grundspil/pulje |
| 3. division | Nedrykning fra 3. division pulje A | nedrykningsspil | 7 | 2016–2025 | 1 | navneord: nedrykning |
| 3. division | Nedrykning fra 3. division pulje B | nedrykningsspil | 7 | 2016–2025 | 1 | navneord: nedrykning |
| 4. Serie | Pulje 1 | grundspil | 7 | 2017–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+4 Serie 3-4 | Pulje 1 | grundspil | 7 | 2017–2026 | 1 | navneord: grundspil/pulje |
| 40+ 4+2 M | Pulje 1 | grundspil | 7 | 2018–2024 | 2 | navneord: grundspil/pulje |
| 1. division | Pulje 1 | grundspil | 7 | 2019–2026 | 1 | navneord: grundspil/pulje |
| 1. division | Pulje 2 | grundspil | 7 | 2019–2026 | 1 | navneord: grundspil/pulje |
| 40+ 4+2 B | Pulje 1 | grundspil | 7 | 2019–2025 | 2 | navneord: grundspil/pulje |
| 4+2 B-række | Pulje 1 | grundspil | 7 | 2022–2026 | 5 | navneord: grundspil/pulje |
| Eliteserien | Pulje 1 | grundspil | 7 | 2023–2026 | 2 | navneord: grundspil/pulje |
| 4+2 A-række | Pulje 1 | grundspil | 7 | 2024–2026 | 1 | navneord: grundspil/pulje |
| U11 | Pulje 1 | grundspil | 6 | 2011–2015 | 1 | navneord: grundspil/pulje |
| U11A | Pulje 1 | grundspil | 6 | 2011–2012 | 2 | navneord: grundspil/pulje |
| B (4+2) | Pulje 1 | grundspil | 6 | 2011–2011 | 2 | navneord: grundspil/pulje |
| B (4dr.) | Pulje 1 | grundspil | 6 | 2011–2011 | 1 | navneord: grundspil/pulje |
| C (4dr.) | Pulje 1 | grundspil | 6 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B (4+2) | Pulje 2 | grundspil | 6 | 2011–2011 | 2 | navneord: grundspil/pulje |
| C (4dr.) | Pulje 2 | grundspil | 6 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U17 | Pulje 1 | grundspil | 6 | 2011–2015 | 1 | navneord: grundspil/pulje |
| SM Finale | Pulje 1 | slutspil | 6 | 2012–2012 | 1 | navneord: slutspil |
| Sjællandsserien Slutspil - nedrykning | Pulje 1 | nedrykningsspil | 6 | 2012–2021 | 1 | navneord: nedrykning |
| U11 4+3 | Pulje 1 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U11 D 4-8 spillere | Pulje 2 | grundspil | 6 | 2013–2014 | 3 | navneord: grundspil/pulje |
| C - 4 spillere | Pulje 1 | grundspil | 6 | 2013–2013 | 2 | navneord: grundspil/pulje |
| B - 4 Spillere | Pulje 1 | grundspil | 6 | 2013–2013 | 2 | navneord: grundspil/pulje |
| D - 4 spillere | Pulje 2 | grundspil | 6 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U13 A 4-8 spillere | Pulje 1 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U13 D 4-8 spillere | Pulje 2 | grundspil | 6 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U13 C 4-8 spillere | Pulje 2 | grundspil | 6 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U13 D 4-8 spillere | Pulje 3 | grundspil | 6 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U13 D - 4 spillere | Pulje 1 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U13 D - 4 spillere | Pulje 2 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U13 C - 4 spillere | Pulje 1 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U13D 4 spillere | Pulje 1 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U13D 4 spillere | Pulje 2 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U15 C 4-8 spillere | Pulje 2 | grundspil | 6 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U15 D 4-8 spillere | Pulje 2 | grundspil | 6 | 2013–2014 | 3 | navneord: grundspil/pulje |
| U15 B - 4 spillere | Pulje 1 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U15 C - 4 spillere | Pulje 1 | grundspil | 6 | 2013–2014 | 2 | navneord: grundspil/pulje |
| Veteran D | Pulje 1 | grundspil | 6 | 2013–2026 | 3 | navneord: grundspil/pulje |
| U13 Begynder | Pulje 1 | grundspil | 6 | 2014–2017 | 2 | navneord: grundspil/pulje |
| U17-19 B 4-8 spillere | Pulje 1 | grundspil | 6 | 2014–2014 | 4 | navneord: grundspil/pulje |
| U17/19 B 4 spillere | Pulje 1 | grundspil | 6 | 2014–2015 | 3 | navneord: grundspil/pulje |
| U17/19 C 4 spillere | Pulje 1 | grundspil | 6 | 2014–2015 | 3 | navneord: grundspil/pulje |
| Kredsserien Vest | Pulje 1 | grundspil | 6 | 2014–2026 | 5 | navneord: grundspil/pulje |
| Kredsserien Vest | Pulje 2 | grundspil | 6 | 2014–2026 | 5 | navneord: grundspil/pulje |
| Kredsserien Vest | Pulje 3 | grundspil | 6 | 2014–2026 | 5 | navneord: grundspil/pulje |
| Kredsserien Vest | Pulje 4 | grundspil | 6 | 2014–2026 | 5 | navneord: grundspil/pulje |
| MOT 4+4 Serie 3 | Pulje 1 | grundspil | 6 | 2014–2020 | 2 | navneord: grundspil/pulje |
| MOT 4 herrer Serie 2 | Pulje 1 | grundspil | 6 | 2014–2021 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer Serie 3 | Pulje 1 | grundspil | 6 | 2014–2021 | 2 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 2 | grundspil | 6 | 2015–2016 | 6 | navneord: grundspil/pulje |
| U13 M 4 spillere | Pulje 1 | grundspil | 6 | 2015–2017 | 6 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U13D | Pulje 1 | grundspil | 6 | 2015–2018 | 2 | navneord: grundspil/pulje |
| U13D -4 spillere | Pulje 1 | grundspil | 6 | 2015–2017 | 2 | navneord: grundspil/pulje |
| U13D -4 spillere | Pulje 2 | grundspil | 6 | 2015–2017 | 2 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U15B | Pulje 1 | grundspil | 6 | 2015–2017 | 2 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U15D | Pulje 1 | grundspil | 6 | 2015–2017 | 2 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 2 | grundspil | 6 | 2015–2017 | 5 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 4 | grundspil | 6 | 2015–2017 | 4 | navneord: grundspil/pulje |
| U15 B 4+2 | Pulje 1 | grundspil | 6 | 2015–2017 | 5 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 2 | grundspil | 6 | 2015–2017 | 4 | navneord: grundspil/pulje |
| Kredsserie Vest | Pulje 1 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Kredsserie Vest | Pulje 2 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Kredsserie Vest | Pulje 3 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Kredsserie Vest | Pulje 4 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 1 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 2 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 3 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 4 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 5 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 6 | grundspil | 6 | 2015–2021 | 5 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 2 | grundspil | 6 | 2016–2017 | 6 | navneord: grundspil/pulje |
| 17+ 4H - Serie 1 (A) | Pulje 1 | grundspil | 6 | 2016–2021 | 1 | navneord: grundspil/pulje |
| D 4 spillere | Pulje 1 | grundspil | 6 | 2017–2017 | 2 | navneord: grundspil/pulje |
| D 4 spillere | Pulje 2 | grundspil | 6 | 2017–2017 | 2 | navneord: grundspil/pulje |
| D 4 spillere | Pulje 3 | grundspil | 6 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U11 4+2 | Pulje 1 | grundspil | 6 | 2017–2020 | 5 | navneord: grundspil/pulje |
| C 4 spillere | Pulje 2 | grundspil | 6 | 2017–2017 | 2 | navneord: grundspil/pulje |
| C 4 spillere | Pulje 3 | grundspil | 6 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 1. division | Nedrykning fra 1. division | nedrykningsspil | 6 | 2017–2025 | 1 | navneord: nedrykning |
| 4+2 A-rækken | Pulje 1 | grundspil | 6 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 4+2 B-rækken | Pulje 1 | grundspil | 6 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 4 Herrer B-rækken | Pulje 1 | grundspil | 6 | 2017–2019 | 4 | navneord: grundspil/pulje |
| DMU Hold U11 4+2 | Pulje 2 | grundspil | 6 | 2018–2025 | 2 | navneord: grundspil/pulje |
| SEN Hr - B | Pulje 2 | grundspil | 6 | 2018–2024 | 2 | navneord: grundspil/pulje |
| 40+ Dame - A | Pulje 1 | grundspil | 6 | 2018–2023 | 2 | navneord: grundspil/pulje |
| 60+ 4+2 A | Pulje 1 | grundspil | 6 | 2018–2023 | 2 | navneord: grundspil/pulje |
| U9 - 2500 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 7 | navneord: grundspil/pulje |
| U11 - 4400 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U11 - 3800 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 2 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 3 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U13 - 5200 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 2 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 2 | grundspil | 6 | 2019–2020 | 5 | navneord: grundspil/pulje |
| DMU H 4+3 | Pulje 1 | grundspil | 6 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 4+3 | Pulje 2 | grundspil | 6 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 4+3 | Slutspil | slutspil | 6 | 2020–2020 | 2 | navneord: slutspil |
| U13 - 3400 (4 spillere) | Pulje 2 | grundspil | 6 | 2020–2022 | 6 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 3 | grundspil | 6 | 2020–2022 | 6 | navneord: grundspil/pulje |
| U13 5200 4 Spillere | Pulje 1 | grundspil | 6 | 2020–2022 | 5 | navneord: grundspil/pulje |
| U13 4400 4 Spillere | Pulje 1 | grundspil | 6 | 2020–2022 | 1 | navneord: grundspil/pulje |
| U13 3800 4 Spillere | Pulje 1 | grundspil | 6 | 2020–2022 | 1 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1 | grundspil | 6 | 2020–2022 | 7 | navneord: grundspil/pulje |
| U15 4800 4 Spillere | Pulje 1 | grundspil | 6 | 2020–2022 | 1 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 2 | grundspil | 6 | 2021–2023 | 5 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 2 | grundspil | 6 | 2021–2023 | 7 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 3 | grundspil | 6 | 2021–2022 | 6 | navneord: grundspil/pulje |
| U17/U19 - 15000 (4+2) | Pulje 1 | grundspil | 6 | 2021–2023 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6000 (4 spillere) | Pulje 1 | grundspil | 6 | 2021–2022 | 7 | navneord: grundspil/pulje |
| VoksenFjer | Pulje 1 | grundspil | 6 | 2021–2026 | 2 | navneord: grundspil/pulje |
| Serie D - Double | Pulje 1 | grundspil | 6 | 2021–2026 | 2 | navneord: grundspil/pulje |
| Serie C - Double | Pulje 1 | grundspil | 6 | 2021–2026 | 2 | navneord: grundspil/pulje |
| Serie B - Double | Pulje 1 | grundspil | 6 | 2021–2026 | 2 | navneord: grundspil/pulje |
| Serie A - Double | Pulje 1 | grundspil | 6 | 2021–2026 | 2 | navneord: grundspil/pulje |
| Serie B - Double | Pulje 2 | grundspil | 6 | 2021–2026 | 2 | navneord: grundspil/pulje |
| U11C - 4 spillere | Pulje 1 | grundspil | 6 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U11D - 4 spillere | Pulje 3 | grundspil | 6 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1 | grundspil | 6 | 2022–2023 | 6 | navneord: grundspil/pulje |
| U13D - 4 spillere | Pulje 3 | grundspil | 6 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U13D - 4 spillere | Pulje 4 | grundspil | 6 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U15D - 4 spillere | Pulje 2 | grundspil | 6 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 1 | grundspil | 6 | 2022–2022 | 7 | navneord: grundspil/pulje |
| U15 - 4000 (4 piger) | Pulje 1 | grundspil | 6 | 2022–2023 | 7 | navneord: grundspil/pulje |
| U15 - 3400 (4 piger) | Pulje 1 | grundspil | 6 | 2022–2023 | 6 | navneord: grundspil/pulje |
| U17/U19C - 4 spillere | Pulje 1 | grundspil | 6 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U17/U19B - 4 spillere | Pulje 1 | grundspil | 6 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U17/U19C - 4 spillere | Pulje 2 | grundspil | 6 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - Januar | Pulje 1 | grundspil | 6 | 2023–2025 | 2 | navneord: grundspil/pulje |
| U15 M, 7800 (2+2) | Pulje 1 | grundspil | 6 | 2024–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 B, 7200 (4 spillere) | Pulje 1 | grundspil | 6 | 2024–2026 | 4 | navneord: grundspil/pulje |
| 1. division | Nedrykning | nedrykningsspil | 5 | 2011–2016 | 1 | navneord: nedrykning |
| Kvalifikation til 2. division | Pulje A | andet/ukendt | 5 | 2011–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til 2. division | Pulje B | andet/ukendt | 5 | 2011–2015 | 1 | kvalifikation uden retning |
| Bornholmsserien | Pulje 1 | grundspil | 5 | 2011–2015 | 1 | navneord: grundspil/pulje |
| Serie 2 grundspil | Pulje 1 | grundspil | 5 | 2011–2018 | 1 | navneord: grundspil/pulje |
| Veteran A | Pulje 2 | grundspil | 5 | 2011–2014 | 2 | navneord: grundspil/pulje |
| Serie 2 grundspil | Pulje 2 | grundspil | 5 | 2011–2018 | 1 | navneord: grundspil/pulje |
| Sjællandsserien Slutspil - oprykning | Pulje 1 | oprykningsspil | 5 | 2012–2019 | 1 | navneord: oprykning |
| Serie 1 Slutspil - nedrykning | Pulje 1 | nedrykningsspil | 5 | 2012–2019 | 1 | navneord: nedrykning |
| Serie 1 Slutspil - nedrykning | Pulje 2 | nedrykningsspil | 5 | 2012–2019 | 1 | navneord: nedrykning |
| 40+ Eliterækken, Medaljeslutspil | Pulje 1 | slutspil | 5 | 2012–2016 | 4 | navneord: slutspil |
| 40+ Mesterrækken, Nedrykningsspil | Pulje 1 | nedrykningsspil | 5 | 2012–2016 | 4 | navneord: nedrykning |
| Kvalifikation til 2. division (runde 12) | Kvalifikationsevent kamp 1 | andet/ukendt | 5 | 2013–2018 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 11 | kvalifikation_ned | 5 | 2013–2018 | 1 | navneord: kvalifikation + ned |
| Badmintonligaen | Ligakvalifikation | andet/ukendt | 5 | 2014–2018 | 1 | kvalifikation uden retning |
| Motion A | Pulje 1 | grundspil | 5 | 2014–2018 | 2 | navneord: grundspil/pulje |
| 17+ 2+2 - Serie 1/2 (A/B) | Pulje 1 | grundspil | 5 | 2016–2021 | 1 | navneord: grundspil/pulje |
| 40+ 1. Serie | Pulje 1 | grundspil | 5 | 2017–2024 | 1 | navneord: grundspil/pulje |
| 40+ 2. Serie | Pulje 1 | grundspil | 5 | 2017–2024 | 1 | navneord: grundspil/pulje |
| 40+ 3. Serie | Pulje 1 | grundspil | 5 | 2017–2024 | 1 | navneord: grundspil/pulje |
| 40+ 4. Serie | Pulje 1 | grundspil | 5 | 2017–2024 | 1 | navneord: grundspil/pulje |
| 50+ 2. Serie | Pulje 1 | grundspil | 5 | 2017–2024 | 1 | navneord: grundspil/pulje |
| 50+ 3. Serie | Pulje 1 | grundspil | 5 | 2017–2024 | 1 | navneord: grundspil/pulje |
| 50+ 4. Serie | Pulje 1 | grundspil | 5 | 2017–2024 | 1 | navneord: grundspil/pulje |
| MOT 4H Serie 1 | Pulje 1 | grundspil | 5 | 2017–2021 | 2 | navneord: grundspil/pulje |
| MOT 4H Serie 2 | Pulje 1 | grundspil | 5 | 2017–2021 | 1 | navneord: grundspil/pulje |
| MOT 4H Serie 3 | Pulje 1 | grundspil | 5 | 2017–2021 | 1 | navneord: grundspil/pulje |
| MOT 4H Serie 4 | Pulje 1 | grundspil | 5 | 2017–2021 | 1 | navneord: grundspil/pulje |
| 40+ 20. Serie | Pulje 1 | grundspil | 5 | 2018–2025 | 1 | navneord: grundspil/pulje |
| 1. division | Kvalifikation til Badmintonligaen | andet/ukendt | 5 | 2019–2025 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje A | andet/ukendt | 5 | 2019–2025 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje B | andet/ukendt | 5 | 2019–2025 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje C | andet/ukendt | 5 | 2019–2025 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje D | andet/ukendt | 5 | 2019–2025 | 1 | kvalifikation uden retning |
| Danmarksserien | Nedrykning fra Danmarksserien pulje A | nedrykningsspil | 5 | 2019–2025 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien pulje B | nedrykningsspil | 5 | 2019–2025 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien pulje C | nedrykningsspil | 5 | 2019–2025 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien pulje D | nedrykningsspil | 5 | 2019–2025 | 1 | navneord: nedrykning |
| Københavnsserien | Pulje 1 | grundspil | 5 | 2022–2026 | 1 | navneord: grundspil/pulje |
| Københavnsserien | Pulje 2 | grundspil | 5 | 2022–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Mester | Pulje 1 | grundspil | 5 | 2022–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 1 | Pulje 1 | grundspil | 5 | 2022–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 2 | Pulje 1 | grundspil | 5 | 2022–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 3 | Pulje 1 | grundspil | 5 | 2022–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 4 | Pulje 1 | grundspil | 5 | 2022–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 5 | Pulje 1 | grundspil | 5 | 2022–2026 | 1 | navneord: grundspil/pulje |
| U11B4 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11C4 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11D | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11C | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11B | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11D | Pulje 2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11D | Pulje 3 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11 2. Serie | U11 2. Serie | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11 3. Serie | U11 3. Serie | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11 Serie X1 | U11 Serie X1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U11 Serie X2 | U11 Serie X2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| VS U13 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13A4+2 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13B4+2 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13B4+2 | Pulje 2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13B | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13C | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13D | Pulje 2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13C | Pulje 2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13B | Pulje 2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13C | Pulje 3 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13 3. Serie | U13 3. Serie | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13 Serie X1 | U13 Serie X1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U13 Serie X2 | U13 Serie X2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| C (4m/k) | Pulje 1 | grundspil | 4 | 2011–2011 | 1 | navneord: grundspil/pulje |
| C (4m/k) | Pulje 2 | grundspil | 4 | 2011–2011 | 1 | navneord: grundspil/pulje |
| C (4m/k) | Pulje 3 | grundspil | 4 | 2011–2011 | 1 | navneord: grundspil/pulje |
| C (4m/k) | Pulje 4 | grundspil | 4 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15A4+2 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15B4+2 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15A4 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15B | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15C | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15D | Pulje 2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15C | Pulje 2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15B | U15B | andet/ukendt | 4 | 2011–2012 | 1 | ingen sikker nøgle |
| U15C | U15C | andet/ukendt | 4 | 2011–2012 | 1 | ingen sikker nøgle |
| U15 1. Serie | U15 1. Serie | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15 3. Serie | U15 3. Serie | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15 Serie X1 | U15 Serie X1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U15 Serie X2 | U15 Serie X2 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U17A4+2 | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U17C | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U17D | Pulje 1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U17C | U17C | andet/ukendt | 4 | 2011–2012 | 1 | ingen sikker nøgle |
| U17 2. Serie | U17 2. Serie | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U17 Serie X1 | U17 Serie X1 | grundspil | 4 | 2011–2012 | 1 | navneord: grundspil/pulje |
| Serie 4 | Pulje 2 | grundspil | 4 | 2011–2017 | 9 | navneord: grundspil/pulje |
| KS-Oprykning | KS-Oprykning | oprykningsspil | 4 | 2011–2019 | 1 | navneord: oprykning |
| Serie 2 | Pulje 4 | grundspil | 4 | 2011–2018 | 9 | navneord: grundspil/pulje |
| U13 | Pulje 1 | grundspil | 4 | 2012–2015 | 1 | navneord: grundspil/pulje |
| U15 | Pulje 1 | grundspil | 4 | 2012–2015 | 1 | navneord: grundspil/pulje |
| U17 Elite/Mesterrække | Pulje 1 | grundspil | 4 | 2012–2013 | 1 | navneord: grundspil/pulje |
| Nedrykning fra 3. division | Pulje A | nedrykningsspil | 4 | 2012–2015 | 1 | navneord: nedrykning |
| Nedrykning fra 3. division | Pulje B | nedrykningsspil | 4 | 2012–2015 | 1 | navneord: nedrykning |
| Serie 1 Slutspil - oprykning | Pulje 1 | oprykningsspil | 4 | 2012–2019 | 1 | navneord: oprykning |
| Serie 1 Slutspil - oprykning | Pulje 2 | oprykningsspil | 4 | 2012–2019 | 1 | navneord: oprykning |
| Serie 3, 6+4 | Pulje 1 | grundspil | 4 | 2012–2015 | 1 | navneord: grundspil/pulje |
| Serie 3, 6+4 | Pulje 2 | grundspil | 4 | 2012–2015 | 1 | navneord: grundspil/pulje |
| U11 D 4-8 spillere | Pulje 3 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U11C, 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U11D, 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| D - 4 spillere | Pulje 1 | grundspil | 4 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U11 C - 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U11 D - 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U 11 C - 4 Spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U 11 D - 4 Spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| Hold DM | Pulje 4 | grundspil | 4 | 2013–2013 | 3 | navneord: grundspil/pulje |
| U13 A 4-8+2-4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U13 D 4-8 spillere | Pulje 4 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U13D, 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U13 C - 4 spillere | Pulje 2 | grundspil | 4 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U 13 D - 4 Spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U 13 D - 4 Spillere | Pulje 2 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U 13 B - 4 Spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U 13 C - 4 Spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U13B 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U15 4+3 | Pulje 2 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U15 D 4-8 spillere | Jammerbugt | andet/ukendt | 4 | 2013–2014 | 2 | ingen sikker nøgle |
| U15 D 4-8 spillere | Pulje 3 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U15B, 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| U15C, 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U15 C - 4 spillere | Pulje 2 | grundspil | 4 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U15 D - 4 spillere | Pulje 1 | grundspil | 4 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U15 D - 4 spillere | Pulje 2 | grundspil | 4 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U 15 B - 4 Spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U 15 C - 4 Spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U 15 D - 4 Spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U17/U19 C - 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 1 | navneord: grundspil/pulje |
| U17/U19A 4 spillere | Pulje 1 | grundspil | 4 | 2013–2017 | 3 | navneord: grundspil/pulje |
| U17/U19C 4 spillere | Pulje 2 | grundspil | 4 | 2013–2017 | 3 | navneord: grundspil/pulje |
| U17-19 B 4 spillere | Pulje 1 | grundspil | 4 | 2013–2014 | 2 | navneord: grundspil/pulje |
| Kvalifikation til 2. division (runde 12) | Kvalifikationsevent kamp 2 | andet/ukendt | 4 | 2013–2017 | 1 | kvalifikation uden retning |
| Nedrykning fra 3. division (runde 12) | Kvalifikationsevent kamp 3 | kvalifikation_ned | 4 | 2013–2017 | 1 | navneord: kvalifikation + ned |
| Nedrykning fra 3. division (runde 12) | Kvalifikationsevent kamp 4 | kvalifikation_ned | 4 | 2013–2017 | 1 | navneord: kvalifikation + ned |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 5 | andet/ukendt | 4 | 2013–2017 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 6 | andet/ukendt | 4 | 2013–2017 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 12 | kvalifikation_ned | 4 | 2013–2017 | 1 | navneord: kvalifikation + ned |
| U9 Begynder | Pulje 1 | grundspil | 4 | 2014–2016 | 2 | navneord: grundspil/pulje |
| DBU U11 C 4 spillere | Pulje 1 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere | Pulje 1 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U11 C 4 spillere | Pulje 2 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere | Pulje 2 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere | Pulje 3 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere | Pulje 4 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| U11 B 4-8 spillere | Pulje 2 | grundspil | 4 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U11D 4 spillere | Pulje 2 | grundspil | 4 | 2014–2015 | 3 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 5 | grundspil | 4 | 2014–2017 | 5 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 6 | grundspil | 4 | 2014–2017 | 5 | navneord: grundspil/pulje |
| DBU U13 B 4 spillere | Pulje 1 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere | Pulje 1 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere | Pulje 1 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 B 4 spillere | Pulje 2 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere | Pulje 2 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere | Pulje 2 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere | Pulje 3 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere | Pulje 3 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 B 4 spillere | Pulje 3 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere | Pulje 4 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere | Pulje 4 | grundspil | 4 | 2014–2015 | 2 | navneord: grundspil/pulje |
| U15 A 4-8+2-4 spillere | Pulje 1 | grundspil | 4 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U15 B 4-8 spillere | Pulje 2 | grundspil | 4 | 2014–2014 | 3 | navneord: grundspil/pulje |
| U15 C 4-8 spillere | Pulje 3 | grundspil | 4 | 2014–2014 | 3 | navneord: grundspil/pulje |
| U17-19 A 4-8 spillere | Pulje 1 | grundspil | 4 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U17-19 A 4-8+2-4 spillere | Pulje 1 | grundspil | 4 | 2014–2014 | 2 | navneord: grundspil/pulje |
| 50+ 1.serie | Pulje 1 | grundspil | 4 | 2014–2017 | 1 | navneord: grundspil/pulje |
| Motion C | Pulje 1 | grundspil | 4 | 2014–2018 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer Serie 1 | Pulje 1 | grundspil | 4 | 2014–2017 | 1 | navneord: grundspil/pulje |
| U11 D 4 spillere | Jammerbugt | andet/ukendt | 4 | 2015–2016 | 2 | ingen sikker nøgle |
| U13 D 4 spillere | Jammerbugt | andet/ukendt | 4 | 2015–2016 | 2 | ingen sikker nøgle |
| Nordjysk holdmesterskab U13B | Pulje 1 | grundspil | 4 | 2015–2016 | 2 | navneord: grundspil/pulje |
| U13 D 4 piger | Pulje 1 | grundspil | 4 | 2015–2017 | 4 | navneord: grundspil/pulje |
| U15 C 4 spillere | Jammerbugt | andet/ukendt | 4 | 2015–2016 | 2 | ingen sikker nøgle |
| U15 C 4 piger | Pulje 1 | grundspil | 4 | 2015–2017 | 4 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 2 | grundspil | 4 | 2015–2016 | 5 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 7 | grundspil | 4 | 2015–2018 | 5 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 8 | grundspil | 4 | 2015–2018 | 5 | navneord: grundspil/pulje |
| U11D -4 spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 2 | navneord: grundspil/pulje |
| U11 B (4) | Pulje 1 | grundspil | 4 | 2016–2017 | 1 | navneord: grundspil/pulje |
| U11 D (4) P1 | Pulje 1 | grundspil | 4 | 2016–2017 | 1 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 4 | navneord: grundspil/pulje |
| U13A -4 spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 2 | navneord: grundspil/pulje |
| U13C -4 spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 2 | navneord: grundspil/pulje |
| U13 B (4) | Pulje 1 | grundspil | 4 | 2016–2017 | 1 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 3 | grundspil | 4 | 2016–2017 | 4 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 4 | navneord: grundspil/pulje |
| DMU-Hold U15 M 4 Spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 2 | navneord: grundspil/pulje |
| U15 B (4) | Pulje 1 | grundspil | 4 | 2016–2017 | 1 | navneord: grundspil/pulje |
| U15 C (4) | Pulje 1 | grundspil | 4 | 2016–2017 | 1 | navneord: grundspil/pulje |
| U15 D (4) | Pulje 1 | grundspil | 4 | 2016–2017 | 1 | navneord: grundspil/pulje |
| U15 M 4 spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 5 | navneord: grundspil/pulje |
| U15 D 4 piger | Pulje 1 | grundspil | 4 | 2016–2017 | 4 | navneord: grundspil/pulje |
| U15 Dx 4 spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 4 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 Elite | 4+2 Elite | andet/ukendt | 4 | 2016–2017 | 1 | ingen sikker nøgle |
| U17/U19 Cx 4 spillere | Pulje 1 | grundspil | 4 | 2016–2017 | 4 | navneord: grundspil/pulje |
| 3. division | Kvalifikation til 2. division pulje A | andet/ukendt | 4 | 2016–2021 | 1 | kvalifikation uden retning |
| 3. division | Kvalifikation til 2. division pulje B | andet/ukendt | 4 | 2016–2021 | 1 | kvalifikation uden retning |
| Sjællandsserien slutspil - oprykning | Pulje 1 | oprykningsspil | 4 | 2016–2025 | 1 | navneord: oprykning |
| Sjællandsserien slutspil - nedrykning | Pulje 1 | nedrykningsspil | 4 | 2016–2025 | 1 | navneord: nedrykning |
| Serie 1 slutspil - oprykning | Pulje 1 | oprykningsspil | 4 | 2016–2025 | 1 | navneord: oprykning |
| Serie 1 slutspil - nedrykning | Pulje 1 | nedrykningsspil | 4 | 2016–2025 | 1 | navneord: nedrykning |
| 40+ Elite | Pulje 1 | grundspil | 4 | 2016–2019 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer Serie 4 | Pulje 1 | grundspil | 4 | 2016–2021 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer Serie 5 | Pulje 1 | grundspil | 4 | 2016–2021 | 1 | navneord: grundspil/pulje |
| 50+ 4+2 - Serie 2/3 (B/C) | Pulje 1 | grundspil | 4 | 2016–2020 | 1 | navneord: grundspil/pulje |
| D 4 spillere | Pulje 4 | grundspil | 4 | 2017–2017 | 2 | navneord: grundspil/pulje |
| D 4 spillere | Pulje 5 | grundspil | 4 | 2017–2017 | 2 | navneord: grundspil/pulje |
| Holdturneringsdage for begyndere Hillerød 18/3-18 | Pulje 1 | grundspil | 4 | 2017–2017 | 7 | navneord: grundspil/pulje |
| DMU Hold A 4 Spillere | 3. - 4. plads | andet/ukendt | 4 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold A 4 Spillere | Finale | slutspil | 4 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold A 4 Spillere | Pulje 1 | grundspil | 4 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold A 4 Spillere | Pulje 2 | grundspil | 4 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold B 4 Spillere | 5. - 8. plads | andet/ukendt | 4 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold B 4 Spillere | 9. - 12. plads | andet/ukendt | 4 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold B 4 Spillere | Finale slutspil | slutspil | 4 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold B 4 Spillere | Pulje 1 | grundspil | 4 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold B 4 Spillere | Pulje 2 | grundspil | 4 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold B 4 Spillere | Pulje 3 | grundspil | 4 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold B 4 Spillere | Pulje 4 | grundspil | 4 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 4+3 | Pulje 1 | grundspil | 4 | 2017–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 4+3 | Pulje 2 | grundspil | 4 | 2017–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Piger | Pulje 1 | grundspil | 4 | 2017–2018 | 2 | navneord: grundspil/pulje |
| U15A 4 spillere | Pulje 1 | grundspil | 4 | 2017–2018 | 4 | navneord: grundspil/pulje |
| DMU Hold U17 4+3 | 5. - 6. plads | andet/ukendt | 4 | 2017–2018 | 2 | ingen sikker nøgle |
| DMU Hold U17 4+3 | 7. - 8. plads | andet/ukendt | 4 | 2017–2018 | 2 | ingen sikker nøgle |
| DMU Hold U17 4+3 | Finale | slutspil | 4 | 2017–2018 | 2 | navneord: slutspil |
| DMU Hold U17 4+3 | Pulje 1 | grundspil | 4 | 2017–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17 4+3 | Pulje 2 | grundspil | 4 | 2017–2018 | 2 | navneord: grundspil/pulje |
| Kredsmatch BADKBH-BADSJ&#198; U17 | Pulje 1 | grundspil | 4 | 2017–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere B | Finale | slutspil | 4 | 2017–2018 | 2 | navneord: slutspil |
| Kval - 5+3 | Pulje 1 | andet/ukendt | 4 | 2017–2020 | 2 | kvalifikation uden retning |
| 40+ 5. Serie | Pulje 1 | grundspil | 4 | 2017–2020 | 1 | navneord: grundspil/pulje |
| 50+ 6. Serie | Pulje 1 | grundspil | 4 | 2017–2020 | 1 | navneord: grundspil/pulje |
| 50+ 5. Serie | Pulje 1 | grundspil | 4 | 2017–2020 | 1 | navneord: grundspil/pulje |
| 60+ 3. Serie | Pulje 1 | grundspil | 4 | 2017–2020 | 1 | navneord: grundspil/pulje |
| DMU Hold U11 4+2 | 5. - 6. plads | andet/ukendt | 4 | 2018–2025 | 2 | ingen sikker nøgle |
| U11 Begynderrække | Pulje 1 | grundspil | 4 | 2018–2019 | 2 | navneord: grundspil/pulje |
| U11 C 4 Spillere | Pulje 1 | grundspil | 4 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U11 B 4 Spillere | Pulje 1 | grundspil | 4 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U13 Begynderrække | Pulje 1 | grundspil | 4 | 2018–2019 | 2 | navneord: grundspil/pulje |
| U13 B 4 Spillere | Pulje 1 | grundspil | 4 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U13 C 4 Spillere | Pulje 1 | grundspil | 4 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U13 CD 4 Spillere | Pulje 1 | grundspil | 4 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U15 B 4 Spillere | Pulje 1 | grundspil | 4 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U15 CD 4 Spillere | Pulje 1 | grundspil | 4 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U15 C 4 Spillere | Pulje 1 | grundspil | 4 | 2018–2018 | 5 | navneord: grundspil/pulje |
| SEN 1. Serie P1 | Pulje 1 | grundspil | 4 | 2018–2021 | 1 | navneord: grundspil/pulje |
| SEN 3. Serie P1 | Pulje 1 | grundspil | 4 | 2018–2021 | 1 | navneord: grundspil/pulje |
| SEN 2. Serie P2 | Pulje 2 | grundspil | 4 | 2018–2021 | 1 | navneord: grundspil/pulje |
| SEN 3. Serie P2 | Pulje 2 | grundspil | 4 | 2018–2021 | 1 | navneord: grundspil/pulje |
| SEN 1. Serie P2 | Pulje 2 | grundspil | 4 | 2018–2021 | 1 | navneord: grundspil/pulje |
| KBH Serien P1 | Pulje 1 | grundspil | 4 | 2018–2021 | 1 | navneord: grundspil/pulje |
| KBH Serien P2 | Pulje 2 | grundspil | 4 | 2018–2021 | 1 | navneord: grundspil/pulje |
| 50+ 4+2 A | Pulje 1 | grundspil | 4 | 2018–2026 | 2 | navneord: grundspil/pulje |
| 50+ Hr - B | Pulje 1 | grundspil | 4 | 2018–2021 | 2 | navneord: grundspil/pulje |
| 50+ 1. Serie | Pulje 1 | grundspil | 4 | 2018–2024 | 1 | navneord: grundspil/pulje |
| 60+ 2. Serie | Pulje 1 | grundspil | 4 | 2018–2024 | 1 | navneord: grundspil/pulje |
| 60+ 1. Serie | Pulje 1 | grundspil | 4 | 2018–2024 | 1 | navneord: grundspil/pulje |
| MOT 4+4 Serie 1-2 | Pulje 1 | grundspil | 4 | 2018–2024 | 1 | navneord: grundspil/pulje |
| MOT 4H Serie 4 | Pulje 2 | grundspil | 4 | 2018–2021 | 1 | navneord: grundspil/pulje |
| U11 3000 4 spillere | Pulje 1 | grundspil | 4 | 2019–2020 | 3 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 2 | grundspil | 4 | 2019–2020 | 4 | navneord: grundspil/pulje |
| U13 - 3800 - 4 piger | Pulje 1 | grundspil | 4 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U13 4400 4 spillere | Pulje 1 | grundspil | 4 | 2019–2020 | 3 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 3 | grundspil | 4 | 2019–2020 | 4 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 4 | grundspil | 4 | 2019–2020 | 4 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 5 | grundspil | 4 | 2019–2020 | 4 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 3 | grundspil | 4 | 2019–2020 | 4 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 2 | grundspil | 4 | 2019–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1 | grundspil | 4 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 - 4400 - 4 piger | Pulje 1 | grundspil | 4 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 2 | grundspil | 4 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 - 7200 - 4 spillere | Pulje 1 | grundspil | 4 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 1 | grundspil | 4 | 2019–2019 | 5 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1 | grundspil | 4 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 4400 4 spillere | Pulje 1 | grundspil | 4 | 2019–2020 | 3 | navneord: grundspil/pulje |
| U17/U19 - 5200 - 4 spillere | Pulje 1 | grundspil | 4 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 5200 - 4 spillere | Pulje 2 | grundspil | 4 | 2019–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6200 - 4 spillere | Pulje 1 | grundspil | 4 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Badmintonligaen | Final 4 | slutspil | 4 | 2019–2022 | 1 | navneord: slutspil |
| DMU H 4400 - 4 spillere | Pulje 1 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 3800 - 4 spillere | Bronzekamp | slutspil | 4 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 3800 - 4 spillere | Finale | slutspil | 4 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 3800 - 4 spillere | Pulje 1 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 3800 - 4 spillere | Pulje 2 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 3400 - 4 spillere | Bronzekamp | slutspil | 4 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 3400 - 4 spillere | Finale | slutspil | 4 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 3400 - 4 spillere | Pulje 1 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 3400 - 4 spillere | Pulje 2 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1113 - BL | grundspil | 4 | 2020–2022 | 11 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1 | grundspil | 4 | 2020–2021 | 6 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 2 | grundspil | 4 | 2020–2022 | 6 | navneord: grundspil/pulje |
| U11 3400 4 Spillere | Pulje 1 | grundspil | 4 | 2020–2021 | 1 | navneord: grundspil/pulje |
| U11 3000 4 Spillere | Pulje 1 | grundspil | 4 | 2020–2022 | 1 | navneord: grundspil/pulje |
| U11 3000 4 Spillere | Pulje 2 | grundspil | 4 | 2020–2022 | 1 | navneord: grundspil/pulje |
| DMU H 4+3 | Pulje 3 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 6000 - 4 spillere | Pulje 1 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 5200 - 4 spillere | Bronzekamp | slutspil | 4 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 5200 - 4 spillere | Finale | slutspil | 4 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 5200 - 4 spillere | Pulje 1 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 5200 - 4 spillere | Pulje 2 | grundspil | 4 | 2020–2020 | 2 | navneord: grundspil/pulje |
| U13 - 5200 (4 spillere) | Pulje 1 | grundspil | 4 | 2020–2021 | 6 | navneord: grundspil/pulje |
| U13 3400 4 Spillere | Pulje 1 | grundspil | 4 | 2020–2022 | 1 | navneord: grundspil/pulje |
| U13 3400 4 Spillere | Pulje 2 | grundspil | 4 | 2020–2022 | 1 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1523 - CV | grundspil | 4 | 2020–2021 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1524 - CV | grundspil | 4 | 2020–2021 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1526 - JT | grundspil | 4 | 2020–2021 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1527 - JT | grundspil | 4 | 2020–2021 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1 | grundspil | 4 | 2020–2023 | 5 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 2 | grundspil | 4 | 2020–2023 | 5 | navneord: grundspil/pulje |
| U15 6400 4 Spillere | Pulje 1 | grundspil | 4 | 2020–2022 | 1 | navneord: grundspil/pulje |
| U17 (4+3) | Pulje 1701-BL | grundspil | 4 | 2020–2022 | 13 | navneord: grundspil/pulje |
| 4+2 B-Række | Pulje 1 | grundspil | 4 | 2020–2021 | 6 | navneord: grundspil/pulje |
| DMU H - U11 2+2 | Pulje 1 | grundspil | 4 | 2021–2022 | 2 | navneord: grundspil/pulje |
| U13 4400 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 2 | navneord: grundspil/pulje |
| U13 3800 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 2 | navneord: grundspil/pulje |
| U13 3500 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 2 | navneord: grundspil/pulje |
| U13 3500 (4 spillere) | Pulje 2 | grundspil | 4 | 2021–2023 | 2 | navneord: grundspil/pulje |
| U13 - 6000 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 5 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 4 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 2 | grundspil | 4 | 2021–2023 | 4 | navneord: grundspil/pulje |
| U15 5600 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 2 | navneord: grundspil/pulje |
| U15 4800 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 2 | navneord: grundspil/pulje |
| U15 5600 (4 spillere) | Pulje 2 | grundspil | 4 | 2021–2023 | 2 | navneord: grundspil/pulje |
| U15 5600 4 Spillere | Pulje 1 | grundspil | 4 | 2021–2022 | 1 | navneord: grundspil/pulje |
| U15 4800 4 Spillere | Pulje 2 | grundspil | 4 | 2021–2022 | 1 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 4 | grundspil | 4 | 2021–2022 | 4 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Piger | Pulje 1 | grundspil | 4 | 2021–2023 | 1 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 6 | navneord: grundspil/pulje |
| U17/19 5600 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 2 | navneord: grundspil/pulje |
| U17/U19 - 5600 (4 spillere) | Pulje 1 | grundspil | 4 | 2021–2023 | 5 | navneord: grundspil/pulje |
| U17/U19 - 5600 (4 spillere) | Pulje 2 | grundspil | 4 | 2021–2023 | 5 | navneord: grundspil/pulje |
| SEN 4 + 2 B | Pulje 1 | grundspil | 4 | 2021–2024 | 2 | navneord: grundspil/pulje |
| U09 2800 4 Spillere | Pulje 1 | grundspil | 4 | 2022–2023 | 1 | navneord: grundspil/pulje |
| U09 2400 4 Spillere | Pulje 1 | grundspil | 4 | 2022–2023 | 5 | navneord: grundspil/pulje |
| U9 - 2800 (4 spillere) | Pulje 1 | grundspil | 4 | 2022–2023 | 4 | navneord: grundspil/pulje |
| U11C - 4 spillere | Pulje 2 | grundspil | 4 | 2022–2023 | 2 | navneord: grundspil/pulje |
| U11 - 2+2 | Pulje 1 | grundspil | 4 | 2022–2023 | 5 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 2 | grundspil | 4 | 2022–2023 | 4 | navneord: grundspil/pulje |
| U13C - 4 spillere | Pulje 2 | grundspil | 4 | 2022–2025 | 2 | navneord: grundspil/pulje |
| U13 - 3000 (4 piger) | Pulje 1 | grundspil | 4 | 2022–2023 | 4 | navneord: grundspil/pulje |
| U15 (4+3) | Pulje 1501 slutspil A | slutspil | 4 | 2022–2024 | 13 | navneord: slutspil |
| U15 (4+3) | Pulje 1501 slutspil B | slutspil | 4 | 2022–2024 | 13 | navneord: slutspil |
| U15 - 4800 (4 spillere) | Pulje 1511 - BL | grundspil | 4 | 2022–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1512 - BL | grundspil | 4 | 2022–2023 | 9 | navneord: grundspil/pulje |
| U15C - 4 spillere | Pulje 2 | grundspil | 4 | 2022–2023 | 2 | navneord: grundspil/pulje |
| U15B - 4 spillere | Pulje 2 | grundspil | 4 | 2022–2023 | 2 | navneord: grundspil/pulje |
| U15D - 4 spillere | Pulje 3 | grundspil | 4 | 2022–2023 | 2 | navneord: grundspil/pulje |
| U15D - 4 spillere | Pulje 4 | grundspil | 4 | 2022–2023 | 2 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 2 | grundspil | 4 | 2022–2022 | 6 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 3 | grundspil | 4 | 2022–2022 | 6 | navneord: grundspil/pulje |
| U15 - 5600 (2+2) | Pulje 1 | grundspil | 4 | 2022–2023 | 5 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere 6.000 | Pulje 1 | grundspil | 4 | 2022–2023 | 1 | navneord: grundspil/pulje |
| U17/U19 - 7200 (4 spillere) | Pulje 1 | grundspil | 4 | 2022–2022 | 6 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 1 | grundspil | 4 | 2022–2022 | 6 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 2 | grundspil | 4 | 2022–2022 | 6 | navneord: grundspil/pulje |
| Badmintonligaen (oversidder-runder) | Oversidder-runder/papirhold | grundspil | 4 | 2022–2025 | 1 | navneord: grundspil/pulje |
| Københavnsserien | Oprykning til Danmarksserien | oprykningsspil | 4 | 2022–2025 | 1 | navneord: oprykning |
| MOT 4 Spillere Serie 1 | Pulje 1 | grundspil | 4 | 2022–2025 | 2 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 3 | Pulje 1 | grundspil | 4 | 2022–2025 | 2 | navneord: grundspil/pulje |
| 17+ 4 spillere - Serie 1 (A) | Pulje 1 | grundspil | 4 | 2022–2026 | 1 | navneord: grundspil/pulje |
| 17+ 4 spillere - Serie 3 (C) | Pulje 1 | grundspil | 4 | 2022–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 2 | Pulje 1 | grundspil | 4 | 2022–2025 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 4 | Pulje 1 | grundspil | 4 | 2022–2025 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 4 | Pulje 2 | grundspil | 4 | 2022–2025 | 1 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering - Januar | Pulje 1 | grundspil | 4 | 2023–2025 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - Marts | Pulje 1 | grundspil | 4 | 2023–2025 | 2 | navneord: grundspil/pulje |
| U11 - 2800 (4 piger) | Pulje 1 | grundspil | 4 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U15 Kredsmatch | Pulje 1 | grundspil | 4 | 2023–2024 | 6 | navneord: grundspil/pulje |
| Kredsserien Vest - slutspilstider | Pulje 1 og pulje 3 | slutspil | 4 | 2023–2026 | 4 | navneord: slutspil |
| Serie C - Double | Pulje 2 | grundspil | 4 | 2023–2026 | 2 | navneord: grundspil/pulje |
| 1. Serie | Pulje 2 | grundspil | 4 | 2023–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Elite | Pulje 1 | grundspil | 4 | 2023–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 6 | Pulje 1 | grundspil | 4 | 2023–2026 | 1 | navneord: grundspil/pulje |
| U11 (4+2) | Pulje 1 | grundspil | 4 | 2024–2025 | 4 | navneord: grundspil/pulje |
| U13 (4+3) | SM-Finale | slutspil | 4 | 2024–2025 | 4 | navneord: slutspil |
| UGE 38 - U15 M, 7800 (2+2) | Pulje 1 | grundspil | 4 | 2024–2026 | 4 | navneord: grundspil/pulje |
| U15 (4+3) | SM-Finale | slutspil | 4 | 2024–2025 | 4 | navneord: slutspil |
| U15 M, 7800 (2+2) | SM-Finale | slutspil | 4 | 2024–2025 | 4 | navneord: slutspil |
| U15 A, 7200 (4 spillere) | SM-Finale | slutspil | 4 | 2024–2025 | 4 | navneord: slutspil |
| U17 (4+3) | SM-Finale | slutspil | 4 | 2024–2025 | 4 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4+2 A | Pulje 1 | grundspil | 4 | 2024–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 B | Pulje 1 | grundspil | 4 | 2024–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 C | Pulje 1 | grundspil | 4 | 2024–2025 | 2 | navneord: grundspil/pulje |
| U17/U19 M, 10000 (4 spillere) | Pulje 1 | grundspil | 4 | 2024–2025 | 4 | navneord: grundspil/pulje |
| U17/U19 B, 7200 (4 spillere) | SM-Finale | slutspil | 4 | 2024–2025 | 4 | navneord: slutspil |
| U09 D 3300 (3 spillere) BD | Pulje 1 | grundspil | 4 | 2025–2026 | 1 | navneord: grundspil/pulje |
| U9 D, 3300 (3 spillere) | Pulje 1 | grundspil | 4 | 2025–2026 | 3 | navneord: grundspil/pulje |
| U11 C-D, 4800 (4 spillere) | Pulje 1 | grundspil | 4 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U11 D, 4200 (4 piger) | Pulje 1 | grundspil | 4 | 2025–2026 | 3 | navneord: grundspil/pulje |
| U13 C-D, 5000 (4 spillere) | Pulje 1 | grundspil | 4 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U13 D, 4400 (4 piger) | Pulje 1 | grundspil | 4 | 2025–2026 | 3 | navneord: grundspil/pulje |
| U15 A, 6800 (2+2) | Pulje 1 | grundspil | 4 | 2025–2026 | 4 | navneord: grundspil/pulje |
| U15 A, 7200 (4 spillere) | Pulje 1 | grundspil | 4 | 2025–2026 | 5 | navneord: grundspil/pulje |
| U15 C-D, 5200 (4 spillere) | Pulje 1 | grundspil | 4 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U17/U19 B, 6800 (2+2) | Pulje 1 | grundspil | 4 | 2025–2026 | 6 | navneord: grundspil/pulje |
| U17/U19 C, 5800 (2+2) | Pulje 1 | grundspil | 4 | 2025–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 D, 5000 (2+2) | Pulje 1 | grundspil | 4 | 2025–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 C, 6400 (4 spillere) | Pulje 1 | grundspil | 4 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Badmintonligaen | Bronzematchen | grundspil | 3 | 2011–2017 | 1 | navneord: grundspil/pulje |
| Badmintonligaen | Guldmatchen | grundspil | 3 | 2011–2017 | 1 | navneord: grundspil/pulje |
| Herre senior A | Pulje 1 | grundspil | 3 | 2011–2013 | 1 | navneord: grundspil/pulje |
| Herrerækken | Pulje 1 | grundspil | 3 | 2011–2015 | 1 | navneord: grundspil/pulje |
| Herrerækken | Pulje 2 | grundspil | 3 | 2011–2015 | 1 | navneord: grundspil/pulje |
| Serie 3 | Pulje 3 | grundspil | 3 | 2011–2014 | 2 | navneord: grundspil/pulje |
| Veteran A | Veteran A | andet/ukendt | 3 | 2011–2012 | 2 | ingen sikker nøgle |
| Badmintonligaen | Finale | slutspil | 3 | 2012–2014 | 1 | navneord: slutspil |
| 2. division | Nedrykning | nedrykningsspil | 3 | 2012–2018 | 1 | navneord: nedrykning |
| Kvalifikation til 3. division | Pulje A vest | andet/ukendt | 3 | 2012–2014 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje A øst | andet/ukendt | 3 | 2012–2014 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje B vest | andet/ukendt | 3 | 2012–2014 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje B øst | andet/ukendt | 3 | 2012–2014 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien | Pulje A vest | nedrykningsspil | 3 | 2012–2014 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien | Pulje A øst | nedrykningsspil | 3 | 2012–2014 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien | Pulje B vest | nedrykningsspil | 3 | 2012–2014 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien | Pulje B øst | nedrykningsspil | 3 | 2012–2014 | 1 | navneord: nedrykning |
| 40+ Mesterrækken, Oprykningsspil | Pulje 1 | oprykningsspil | 3 | 2012–2016 | 4 | navneord: oprykning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 7 | andet/ukendt | 3 | 2013–2016 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 8 | andet/ukendt | 3 | 2013–2016 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 10 | kvalifikation_ned | 3 | 2013–2016 | 1 | navneord: kvalifikation + ned |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 9 | kvalifikation_ned | 3 | 2013–2016 | 1 | navneord: kvalifikation + ned |
| 3. Serie P1 | Pulje 1 | grundspil | 3 | 2013–2017 | 1 | navneord: grundspil/pulje |
| 2. Serie P1 | Pulje 1 | grundspil | 3 | 2013–2017 | 1 | navneord: grundspil/pulje |
| Senior A+B 4+2 | Pulje 1 | grundspil | 3 | 2013–2015 | 1 | navneord: grundspil/pulje |
| Veteran (2+4) Nylon | Pulje 1 | grundspil | 3 | 2013–2015 | 1 | navneord: grundspil/pulje |
| 40+, 6+2 rækken | Pulje 1 | grundspil | 3 | 2013–2015 | 1 | navneord: grundspil/pulje |
| 50+, 6+2 rækken | Pulje 1 | grundspil | 3 | 2013–2015 | 1 | navneord: grundspil/pulje |
| 50+, 6+2 rækken | Pulje 2 | grundspil | 3 | 2013–2015 | 1 | navneord: grundspil/pulje |
| 40+ 3.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 40+ 4.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 40+ 5.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 40+ 6.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 40+ 20.serie | Pulje 1 | grundspil | 3 | 2014–2017 | 1 | navneord: grundspil/pulje |
| 40+ 1.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 50+ 2.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 50+ 3.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 50+ 4.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 50+ 5.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 50+ 6.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 50+ 7.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 60+ 1.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 60+ 2.serie | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| Motion 4+4 Serie 1 | Pulje 1 | grundspil | 3 | 2014–2016 | 2 | navneord: grundspil/pulje |
| Motion 4+4 Serie 4 | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| Motion 4+4 Serie 5 | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| Motion 4+4 Serie 6 | Pulje 1 | grundspil | 3 | 2014–2016 | 1 | navneord: grundspil/pulje |
| Motion 4+4 Serie 7 | Pulje 1 | grundspil | 3 | 2014–2016 | 2 | navneord: grundspil/pulje |
| Serie 1 slutspil - oprykning | Pulje 2 | oprykningsspil | 3 | 2016–2021 | 1 | navneord: oprykning |
| Serie 1 slutspil - nedrykning | Pulje 2 | nedrykningsspil | 3 | 2016–2021 | 1 | navneord: nedrykning |
| 17+ 4H - Serie 2/3 (B/C) | Pulje 1 | grundspil | 3 | 2016–2021 | 1 | navneord: grundspil/pulje |
| SEN Hr - C | Pulje 1 | grundspil | 3 | 2017–2024 | 2 | navneord: grundspil/pulje |
| KS-Nedrykning | KS-Nedrykning | nedrykningsspil | 3 | 2017–2019 | 1 | navneord: nedrykning |
| Veteran B - Slutspil | Nedrykning | nedrykningsspil | 3 | 2017–2019 | 1 | navneord: nedrykning |
| Veteran B - Slutspil | Oprykning | oprykningsspil | 3 | 2017–2019 | 1 | navneord: oprykning |
| 40+ 6. Serie | Pulje 1 | grundspil | 3 | 2017–2019 | 1 | navneord: grundspil/pulje |
| 6+4 Eliterækken | Pulje 1 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 6+4 Eliterækken | Pulje 2 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 6+4 Eliterækken - medaljeslutspil | Pulje 1 | slutspil | 3 | 2017–2019 | 4 | navneord: slutspil |
| 6+4 Eliterækken - nedrykningsspil | Pulje 1 | nedrykningsspil | 3 | 2017–2019 | 4 | navneord: nedrykning |
| 6+4 Mesterrækken | Pulje 1 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 6+4 Mesterrækken | Pulje 2 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 6+4 Mesterrækken - oprykningsspil | Pulje 1 | oprykningsspil | 3 | 2017–2019 | 5 | navneord: oprykning |
| 6+4 Mesterrækken - nedrykningsspil | Pulje 1 | nedrykningsspil | 3 | 2017–2019 | 4 | navneord: nedrykning |
| 6+4 A-rækken | Pulje 1 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 6+4 A-rækken | Pulje 2 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 4+2 C-rækken | Pulje 1 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 50+ 7. Serie | Pulje 1 | grundspil | 3 | 2017–2019 | 1 | navneord: grundspil/pulje |
| 4+2 B-rækken | Pulje 2 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 2+2 B-rækken | Pulje 1 | grundspil | 3 | 2017–2019 | 4 | navneord: grundspil/pulje |
| 50+ 4H - Serie 3 (C) | Pulje 1 | grundspil | 3 | 2017–2021 | 1 | navneord: grundspil/pulje |
| Badmintonligaen | Guldkamp | slutspil | 3 | 2018–2025 | 1 | navneord: slutspil |
| SEN 4+2 B | Pulje 1 | grundspil | 3 | 2018–2020 | 2 | navneord: grundspil/pulje |
| SEN 2. Serie P1 | Pulje 1 | grundspil | 3 | 2018–2020 | 1 | navneord: grundspil/pulje |
| Serie 5 | Pulje 1 | grundspil | 3 | 2018–2020 | 2 | navneord: grundspil/pulje |
| SEN 30. Serie P1 | Pulje 1 | grundspil | 3 | 2019–2021 | 1 | navneord: grundspil/pulje |
| SEN 30. Serie P2 | Pulje 2 | grundspil | 3 | 2019–2021 | 1 | navneord: grundspil/pulje |
| MOT 4+2 serie 1-2 | Pulje 1 | grundspil | 3 | 2019–2021 | 1 | navneord: grundspil/pulje |
| MOT 4+2 serie 3-4 | Pulje 1 | grundspil | 3 | 2019–2021 | 1 | navneord: grundspil/pulje |
| MOT 4+4 serie 1-2 | Pulje 1 | grundspil | 3 | 2019–2021 | 1 | navneord: grundspil/pulje |
| MOT 4+4 serie 3-4 | Pulje 1 | grundspil | 3 | 2019–2021 | 1 | navneord: grundspil/pulje |
| LF-serien | Pulje 1 | grundspil | 3 | 2021–2025 | 1 | navneord: grundspil/pulje |
| 6+4 Mesterrække | Pulje 1 | grundspil | 3 | 2021–2026 | 5 | navneord: grundspil/pulje |
| 6+4 A-række | Pulje 1 | grundspil | 3 | 2021–2026 | 5 | navneord: grundspil/pulje |
| Serie C - Single + Double | Pulje 1 | grundspil | 3 | 2022–2026 | 2 | navneord: grundspil/pulje |
| Københavnsserien | Nedrykning fra Københavnsserien | nedrykningsspil | 3 | 2022–2024 | 1 | navneord: nedrykning |
| Serie 2 slutspil - oprykning | Pulje 1 | oprykningsspil | 3 | 2022–2025 | 1 | navneord: oprykning |
| Serie 2 slutspil - nedrykning | Pulje 1 | nedrykningsspil | 3 | 2022–2025 | 1 | navneord: nedrykning |
| Serie 3 slutspil - oprykning | Pulje 1 | oprykningsspil | 3 | 2022–2025 | 1 | navneord: oprykning |
| Serie 3 slutspil - nederste slutspil | Pulje 1 | slutspil | 3 | 2022–2025 | 1 | navneord: slutspil |
| 4 Herrer B-række | Pulje 1 | grundspil | 3 | 2022–2024 | 5 | navneord: grundspil/pulje |
| MOT 4+4 Serie 1/2 | Pulje 1 | grundspil | 3 | 2022–2024 | 1 | navneord: grundspil/pulje |
| MOT 4+4 Serie 3/4 | Pulje 1 | grundspil | 3 | 2022–2024 | 1 | navneord: grundspil/pulje |
| 1. division | Kvalifikationskampe til 1. division | andet/ukendt | 3 | 2023–2025 | 1 | kvalifikation uden retning |
| 1. division (oversidder-runder) | Oversidder-runder/papirhold | grundspil | 3 | 2023–2025 | 1 | navneord: grundspil/pulje |
| 2. division (oversidder-runder) | Oversidder-runder/papirhold | grundspil | 3 | 2023–2025 | 1 | navneord: grundspil/pulje |
| 3. division | Kvalifikation til 2.division pulje A | andet/ukendt | 3 | 2023–2025 | 1 | kvalifikation uden retning |
| 3. division | Kvalifikation til 2.division pulje B | andet/ukendt | 3 | 2023–2025 | 1 | kvalifikation uden retning |
| 3. division | Kvalkampe: Nedrykning til DS | kvalifikation_ned | 3 | 2023–2025 | 1 | navneord: kvalifikation + ned |
| 3. division | Kvalkampe: Oprykning til 2. division | kvalifikation_op | 3 | 2023–2025 | 1 | navneord: kvalifikation + op |
| 3. division (oversidder-runde) | Oversidder-runder/papirhold | grundspil | 3 | 2023–2025 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Kvalkampe: Nedrykning til KS | kvalifikation_ned | 3 | 2023–2025 | 1 | navneord: kvalifikation + ned |
| Danmarksserien | Kvalkampe: Oprykning til 3. division | kvalifikation_op | 3 | 2023–2025 | 1 | navneord: kvalifikation + op |
| Motion 2+2 uden singler | Pulje 1 | grundspil | 3 | 2023–2025 | 2 | navneord: grundspil/pulje |
| Mot 4 herrer uden singler | Pulje 1 | grundspil | 3 | 2023–2025 | 2 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 3 | Pulje 2 | grundspil | 3 | 2023–2025 | 1 | navneord: grundspil/pulje |
| Serie D - Double | Pulje 2 | grundspil | 3 | 2024–2026 | 2 | navneord: grundspil/pulje |
| Serie C - Double | Pulje 3 | grundspil | 3 | 2024–2026 | 2 | navneord: grundspil/pulje |
| Kredsserien Vest - slutspilstider | Pulje 2 og pulje 4 | slutspil | 3 | 2024–2026 | 4 | navneord: slutspil |
| Serie 1 Vest (5+3) | Pulje 1 | grundspil | 3 | 2024–2026 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest (5+3) | Pulje 2 | grundspil | 3 | 2024–2026 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest (5+3) | Pulje 3 | grundspil | 3 | 2024–2026 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest (5+3) | Pulje 4 | grundspil | 3 | 2024–2026 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest (5+3) | Pulje 5 | grundspil | 3 | 2024–2026 | 4 | navneord: grundspil/pulje |
| 2. Serie | Pulje 2 | grundspil | 3 | 2024–2026 | 1 | navneord: grundspil/pulje |
| 3. Serie | Pulje 2 | grundspil | 3 | 2024–2026 | 1 | navneord: grundspil/pulje |
| 31. Serie | Pulje 1 | grundspil | 3 | 2024–2026 | 1 | navneord: grundspil/pulje |
| 32. Serie | Pulje 1 | grundspil | 3 | 2024–2026 | 1 | navneord: grundspil/pulje |
| 60+ Double | Pulje 1 | grundspil | 3 | 2024–2026 | 2 | navneord: grundspil/pulje |
| MOT 4+2 Elite | Pulje 1 | grundspil | 3 | 2024–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+2 Mester | Pulje 1 | grundspil | 3 | 2024–2026 | 1 | navneord: grundspil/pulje |
| U9 | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U09 Finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| (4 spillere) | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| (4 spillere) | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U11C4 | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U11B | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U11C | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U11D | Pulje 4 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U11 H1 | U11 H1 | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U11 H2 | U11 H2 | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U11 S1 | U11 S1 | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U11 S2 | U11 S2 | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U11 SA | U11 SA | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U11 SB | U11 SB | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U11 1.Serie | U11 1. Serie | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U11 "4 på stribe" | "4 på stribe" | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U11 - Mikset | Mikset | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U11A finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U11D (4spillere) finaler | finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U11B (4spillere) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U11B (4 spillere) kvartfinaler | Kvartfinale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| D (4 spillere) | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B (4 spillere) | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B (4 spillere) | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B (4 spillere) | Pulje 3 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B (4 spillere) | Pulje 4 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B (4 spillere) | Pulje 5 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B (4 spillere) | Pulje 6 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U11B (4spillere) semifinaler | semifinale 2 | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U11B (4spillere) semifinaler | semifinale 1 | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U13 Pulje 1 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13 Pulje 2 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| VS U13 | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| VSU13 slutspil | Slutspil A | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| VSU13 slutspil | Slutspil B | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U13C4 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13D4 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13A | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13D | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13D | Pulje 4 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13D | Pulje 5 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13D | Pulje 6 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13 B | U13 B | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U13 C | U13 C | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U13 H | U13H | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U13 S | U13 S | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U13 1.Serie | U13 1. Serie | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13 2. Serie | U13 2. erie | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Mikset | Mikset | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U13A Finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U13B (4+2) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U13B (4dr.) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U13C (4dr.) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U13C (4m/k) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U13C (4m/k) kvartfinaler | Kvartfinaler | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| C (4m/k) | Pulje 5 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| C (4m/k) | Pulje 6 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13C (4m/k) semifinaler | semifinale 2 | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U13C (4m/k) semifinaler | semifinale 1 | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U15 Pulje 1 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15 Pulje 2 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| VS U15 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| VS U15 | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| VSU15 slutspil | Slutspil A | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| VSU15 slutspil | Slutspil B | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U15B/C4 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15B/C4 | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15D4 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15A | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15D | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15B | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15B | Pulje 3 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15C | Pulje 3 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15D | Pulje 3 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15B | Pulje 4 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15C | Pulje 4 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15A | U15A | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U15 P | U15 P | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U15H | U15H | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U15 S | U15 S | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U15 2. Serie | U15 2. serie | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U13/U15 - "4 på stribe" | "4 på stribe" | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U15B (4+2) finale | Finale | slutspil | 2 | 2011–2011 | 2 | navneord: slutspil |
| U15 - Mikset | Mikset | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| B (4+2) | Pulje 3 | grundspil | 2 | 2011–2011 | 2 | navneord: grundspil/pulje |
| U15B (4+2) semifinale | semifinale | slutspil | 2 | 2011–2011 | 2 | navneord: slutspil |
| U15A Finale | Bronzekamp | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U15B (4dr.) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U15C (4dr.) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U15C (m/k) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U15A Finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| A (4+3) | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U15C (4m/k) semifinaler | Semifinaler | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| VS U17 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| VS U17 | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| VSU17 slutspil | Slutspilspulje A | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| VSU17 slutspil | Slutspilspulje B | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U17A4 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U17B/C4 | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U17A | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U17BNy | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U17C | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U17B | Pulje 2 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U17H | U17H | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| U17 1. Serie | U17 1. serie | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| U17A Finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U17B (4+2) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U17B (4dr.) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U17C (4dr.) finale | Finale | slutspil | 2 | 2011–2011 | 1 | navneord: slutspil |
| U15/17 - Drenge | Drenge | andet/ukendt | 2 | 2011–2011 | 1 | ingen sikker nøgle |
| Kvalifikation til 3. division | Pulje A Vest | andet/ukendt | 2 | 2011–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje A &#216;st | andet/ukendt | 2 | 2011–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje B Vest | andet/ukendt | 2 | 2011–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje B &#216;st | andet/ukendt | 2 | 2011–2015 | 1 | kvalifikation uden retning |
| Serie 1 slutspil | Nedrykning til serie 2 | nedrykningsspil | 2 | 2011–2012 | 1 | navneord: nedrykning |
| Serie 1 slutspil | Oprykning til Jyllandsserien | oprykningsspil | 2 | 2011–2012 | 1 | navneord: oprykning |
| Fynsserien | Fynsserien | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| Serie 1 | Serie 1 | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| Serie 2 | Serie 2 | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| Serie 3 | Serie 3 | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| KS-Pulje 1 | KS-Pulje 1 | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| KS-Pulje 2 | KS-Pulje 2 | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| Holdturnering Serie 1 | Pulje 1 | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| Holdturnering Serie 2 | Pulje 2 | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| Holdturnering Serie 3 | Pulje 3 | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| LF-Serien | LF-Serien | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| Veteran C | Veteran C | andet/ukendt | 2 | 2011–2012 | 1 | ingen sikker nøgle |
| Veteran B | Veteran B | andet/ukendt | 2 | 2011–2012 | 2 | ingen sikker nøgle |
| Eliterækken | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| (6+2) række | Pulje 1 | grundspil | 2 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 50+ 1. Serie | 50+ 1. Serie | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| 50+ 3. Serie | 50+ 3. Serie | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| 50+ 4. Serie | 50+ 4. Serie | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| 50+ 5. Serie | 50+ 5. Serie | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| 50+ 6. Serie | 50+ 6. Serie | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| 60+ 1. Serie | 60+ 1. Serie | grundspil | 2 | 2011–2012 | 1 | navneord: grundspil/pulje |
| U9 | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U9S | U9S | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U9SA | U9SA | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U9SB | U9SB | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U9 (4 m/k valgfrit køn) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U9 (4 m/k valgfrit køn) | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Jammerbugt U11D | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Jammerbugt U11D | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U11H | U11H | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U11S | U11S | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U11SA | U11SA | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U11SB | U11SB | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U11 1. Serie | U11 Serie 1. | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| "4 på Stribe" | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| "4 på Stribe" | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Finale U11B 4m/k | Finale | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finale U11B 4+2 | Finale | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finale U11D 4m/k | Finale | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| U11 D (4 m/k, valgfrit køn) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| SM Finale U11A | Pulje 1 | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| U11 D (4 m/k, valgfrit køn) | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U11 D (4 m/k, valgfrit køn) | Pulje 3 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Semifinale U11B 4m/k | Semifinale | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Semifinale U11D 4m/k | Semifinale | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| U11 A-række (4+3) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U11 B-række (4+2) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U11 B-række (4 m/k, valgfrit køn) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U11 B-række (4 m/k, valgfrit køn) | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U11 B-række (4 m/k, valgfrit køn) | Pulje 3 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Jammerbugt U13D | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13Dny | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13D | Pulje 3 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13A/B4 | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13C/D4 | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13C/D4 | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13B | U13B | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U13C | U13C | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U13H | U13H | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U13P | U13P | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U13 1. Serie | U13 1. Serie | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 2. Serie | U13 2. Serie | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 "4 på stribe" | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 Drenge | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 "4 på stribe" | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Finaler U13 - 4+2 hold A og B række | Finale - U13A 4+2 | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Semi- og Finaler - 4 m/k og 4 dr hold - A, B, C, D | Finale - U13A 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finaler U13 - 4+2 hold A og B række | Finale - U13B 4+2 | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Semi- og Finaler - 4 m/k og 4 dr hold - A, B, C, D | Finale - U13B 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Semi- og Finaler - 4 m/k og 4 dr hold - A, B, C, D | Finale - U13C 4dr. | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Semi- og Finaler - 4 m/k og 4 dr hold - A, B, C, D | Finale - U13C 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Semi- og Finaler - 4 m/k og 4 dr hold - A, B, C, D | Finale - U13D 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| SM Finale U13 E/M | Pulje 1 | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Semi- og Finaler - 4 m/k og 4 dr hold - A, B, C, D | Semifinale - U13D 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Semi- og Finaler - 4 m/k og 4 dr hold - A, B, C, D | Semifinale U13C 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| U13 Elite/Mesterrække (4+3) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 A-række (4+2) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 A-række (4 m/k, valgfrit køn) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 B-række (4+2) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 B-række (4 m/k, valgfrit køn) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 C-række (4 drenge) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 C-række (4 m/k, min. 1 pige) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 C-række (4 m/k, min. 1 pige) | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 C-række (4 m/k, min. 1 pige) | Pulje 3 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 D-række (4 m/k, valgfrit køn) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 D-række (4 m/k, valgfrit køn) | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U13 D-række (4 m/k, valgfrit køn) | Pulje 3 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15 | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15B4 | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15C4 | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| VSU15 | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| VSU15 | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15C4 | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15B4 | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| VSU15 SLUTSPIL | Slutspil Pulje A | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| VSU15 SLUTSPIL | Slutspil Pulje B | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Jammerbugt U15C | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Jammerbugt U15D | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15D Ny | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15P | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15H | U15 H | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U15 2. Serie | U15 2. Serie | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Finaler - U15A og B 4+2 | Finale - U15A 4+2 | slutspil | 2 | 2012–2012 | 2 | navneord: slutspil |
| Finaler - U15A og B 4+2 | Finale - U15B 4+2 | slutspil | 2 | 2012–2012 | 2 | navneord: slutspil |
| U15 A-række (4+2) | Pulje 1 | grundspil | 2 | 2012–2012 | 2 | navneord: grundspil/pulje |
| U15 A-række (4+2) | Pulje 2 | grundspil | 2 | 2012–2012 | 2 | navneord: grundspil/pulje |
| U15 B-række (4+2) | Pulje 1 | grundspil | 2 | 2012–2012 | 2 | navneord: grundspil/pulje |
| U15 B-række (4+2) | Pulje 2 | grundspil | 2 | 2012–2012 | 2 | navneord: grundspil/pulje |
| Finaler - U15 4m/k og 4 dr B, C og D | Finale - U15B 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finaler - U15 4m/k og 4 dr B, C og D | Finale - U15B/C 4 dr. | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finaler - U15 4m/k og 4 dr B, C og D | Finale - U15C 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finaler - U15 4m/k og 4 dr B, C og D | Finale - U15D 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| U15 Elite/Mesterrække (4+3) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15 B-række (4 m/k - min.1 pige) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15 B/C-række (4 drenge) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15 C-række (4 m/k - min.1pige) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15 C-række (4 m/k - min.1pige) | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15 D-række (4 m/k, valgfrit køn) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15 D-række (4 m/k, valgfrit køn) | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U17B4 | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| VSU17 | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| VSU17 | Pulje 2 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| VSU17 SLUTSPIL | Slutspil Pulje A | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| VSU17 SLUTSPIL | Slutspil Pulje B | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| U17B | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Jammerbugt U17C | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U17B | Pulje 3 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U17B | U17B | andet/ukendt | 2 | 2012–2012 | 1 | ingen sikker nøgle |
| U17 1. Serie | U17 1. Serie | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15/U17 MIX | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U15/U17 Drenge | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U17 B-række (4 m/k - min.1 pige) | Pulje 1 | grundspil | 2 | 2012–2012 | 2 | navneord: grundspil/pulje |
| Finaler - U17 4 dr. og 4 m/k | Finale - U17A 4 dr | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finaler - U17 4 dr. og 4 m/k | Finale - U17B 4 dr. | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finaler - U17 4 dr. og 4 m/k | Finale - U17B 4m/k | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| Finale - U17B 4+2 | Finale U17B 4+2 | slutspil | 2 | 2012–2012 | 1 | navneord: slutspil |
| U17 A-række (4 drenge) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U17 B-række (4+2) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| U17 B-række (4 drenge) | Pulje 1 | grundspil | 2 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Badmintonligaen | Semifinale 1 | slutspil | 2 | 2012–2013 | 1 | navneord: slutspil |
| Badmintonligaen | Semifinale 2 | slutspil | 2 | 2012–2013 | 1 | navneord: slutspil |
| Badmintonligaen | Kvartfinale 1 | slutspil | 2 | 2012–2013 | 1 | navneord: slutspil |
| Badmintonligaen | Kvartfinale 2 | slutspil | 2 | 2012–2013 | 1 | navneord: slutspil |
| Badmintonligaen | Medaljeslutspil A | slutspil | 2 | 2012–2013 | 1 | navneord: slutspil |
| Badmintonligaen | Medaljeslutspil B | slutspil | 2 | 2012–2013 | 1 | navneord: slutspil |
| Badmintonligaen | Ligakvalifikationsspillet | andet/ukendt | 2 | 2012–2013 | 1 | kvalifikation uden retning |
| 2. division | Kval. til 1. div. | andet/ukendt | 2 | 2012–2013 | 1 | kvalifikation uden retning |
| Jyllandsserien | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| Jyllandsserien | Pulje 2 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| Jyllandsserien | Pulje 3 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| Jyllandsserien | Pulje 4 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| Serie 2 slutspil | Nedrykning til serie 3 | nedrykningsspil | 2 | 2012–2017 | 1 | navneord: nedrykning |
| Serie 2 slutspil | Oprykning til serie 1 | oprykningsspil | 2 | 2012–2017 | 1 | navneord: oprykning |
| Herre senior B | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| Herre senior B | Pulje 2 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| Serie 2, 6+4 | Pulje 1 | grundspil | 2 | 2012–2015 | 1 | navneord: grundspil/pulje |
| Serie 2, 6+4 | Pulje 2 | grundspil | 2 | 2012–2015 | 1 | navneord: grundspil/pulje |
| Serie 2, 6+4 | Pulje 3 | grundspil | 2 | 2012–2015 | 1 | navneord: grundspil/pulje |
| Serie 4, Herrerække | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| Serie 4, 4+2 | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ Eliterækken | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ Eliterækken | Pulje 2 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ Mesterrækken | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ Mesterrækken | Pulje 2 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ A-rækken | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ A-rækken | Pulje 2 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ A-rækken | Pulje 3 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ A-rækken | Pulje 4 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 40+ B-rækken | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| 50+ Eliterækken | Pulje 1 | grundspil | 2 | 2012–2013 | 1 | navneord: grundspil/pulje |
| U09 B 4-8 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U09 B -4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U9 B 4 m/k | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U09 Finale | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U9 B 4 m/k | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U9, Begyndere ikke pointgivende, 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U9 B - 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U9 B 4 Spiller | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U09B 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U9B 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Hold DM Slutspil | 1'er pulje | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM Slutspil | 2'er pulje | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM Slutspil | 3'er pulje | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| LM U11 A SLUTSPIL | Bronzekamp 3. - 4. plads | slutspil | 2 | 2013–2013 | 3 | navneord: slutspil |
| LM U11 A SLUTSPIL | Finale 1. - 2. plads | slutspil | 2 | 2013–2013 | 3 | navneord: slutspil |
| LM U11 4 SPILLERE | U 11 A | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 B 1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 B 2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 C 1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 C 2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 D 1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 D 2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 D 3 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| U11 A | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 D 4-8 spillere | Jammerbugt | andet/ukendt | 2 | 2013–2013 | 1 | ingen sikker nøgle |
| U11 C 4-8 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 B 2+2 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11A 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11S | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 1. Serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 2. Serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 3. Serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 Serie X1 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 Serie X2 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 Serie X3 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11D 4 m/k | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11B 4 m/k | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 B 4+2 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 A 4+3 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11A 4+3 Finale | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U11B 4+2 Finale | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U11B 4m/k Finale | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U11D 4m/k Finalespil | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U11B 4 m/k | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11D 4 m/k | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11D 4 m/k | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U 11, Begyndere ikke pointgivende, 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U 11, Begyndere ikke pointgivende, 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 D - 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 D - 4 spillere | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U 11 C - 4 Spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 C+D - 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 C+D - 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11 C+D - 4 spillere | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| &#216;M U11 D 4 SP. | Puljevinderkampe | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11B 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11C 4 spillere | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11D 4 spillere | Pulje 4 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11D 4 spillere | Pulje 5 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11D 4 spillere | Pulje 6 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U11D 4 piger/mk | Pulje 7 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Hold DM, Slutspil | 11/12. pladsen | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM, Slutspil | 3/4. pladsen | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM, Slutspil | 5/6. pladsen | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM, Slutspil | 7/8. pladsen | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM, Slutspil | 9/10. pladsen | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM, Slutspil | Finalen | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM, Mellemspil | Nr. 1 i puljen | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| Hold DM, Mellemspil | Nr. 2 i puljen | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| Hold DM, Mellemspil | Nr. 3 i puljen | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U13 M | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 M | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| LM U13 4 SPILLERE | A1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | A2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | B1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | B2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | B3 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | C1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | C2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | C3 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | D1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | D2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 SPILLERE | M | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U13 4 PIGER | P | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| U13 4+3 | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U134+3 slutspil | Pulje A | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U134+3 slutspil | Pulje B | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13 B 4-8 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 D 4-8 spillere | Pulje 5 Jammerbugt | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 D 4-8 spillere | Pulje 6 Jammerbugt | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13C Finale | Finale | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13C Semifinaler | Semifinale 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13C Semifinaler | Semifinale 2 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13 1. serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 2. serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 3. serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 Serie X1 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 Serie X2 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 Serie X3 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 B 2-4+2-4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Finaler - 4 m/k A, B, C og D | Finale - U13A 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - 4 m/k A, B, C og D | Finale - U13B 4+2 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - 4 m/k A, B, C og D | Finale - U13B 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - 4 m/k A, B, C og D | Finale - U13C 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - 4 m/k A, B, C og D | Finalespil - U13D 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13C 4 m/k | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 E/M Finale | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finale - U13B 4+2 | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13 E/M-række | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 A-række 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 B-række 4 Spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 B-række 4+2 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 D 4 m/k | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 D 4 m/k | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 B-række 4 Spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 A-række 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13C 4 m/k | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 D 4 m/k | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U 13, Begyndere ikke pointgivende, 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13B, 2+2 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13A 4 spillere | Pulje 8 | grundspil | 2 | 2013–2013 | 5 | navneord: grundspil/pulje |
| U13A 4 spillere | Pulje 9 | grundspil | 2 | 2013–2013 | 5 | navneord: grundspil/pulje |
| U13A 4 spillere slutspil | Pulje A | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| U13A 4 spillere slutspil | Pulje B | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| U13 A - 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13D 4 Piger | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13 D 4 spillere finalerunde | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13 D 4 spillere finalerunde | Pulje 2 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13 D - 4 spillere | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13D 4 piger slutspil | Pulje A | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U13D 4 piger slutspil | Pulje B | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| &#216;M U13 B 4 SP. | Puljevinderkampe | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| &#216;M U13 D 4 SP. | Puljevinderkampe | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| &#216;M U13 C 4 SP. | Puljevinderkampe | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13B 4 spillere | Pulje 10 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13B 4 spillere | Pulje 11 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13C 4 spillere | Pulje 12 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13C 4 spillere | Pulje 13 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13D 4 spillere | Pulje 14 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13D 4 spillere | Pulje 15 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13D 4 spillere | Pulje 16 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13D 4 spillere | Pulje 17 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13D 4 piger | Pulje 18 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U13D 4 piger | Pulje 19 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Hold DM mellemspil | 1. Semi for 1'ere | andet/ukendt | 2 | 2013–2013 | 2 | ingen sikker nøgle |
| Hold DM mellemspil | 1. semi for 2'ere | andet/ukendt | 2 | 2013–2013 | 2 | ingen sikker nøgle |
| Hold DM mellemspil | 1. semi for 3'ere | andet/ukendt | 2 | 2013–2013 | 2 | ingen sikker nøgle |
| Hold DM Slutspil | 11-12 plads | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| Hold DM mellemspil | 2. semi for 1'ere | andet/ukendt | 2 | 2013–2013 | 2 | ingen sikker nøgle |
| Hold DM mellemspil | 2. semi for 2'ere | andet/ukendt | 2 | 2013–2013 | 2 | ingen sikker nøgle |
| Hold DM mellemspil | 2. semi for 3'ere | andet/ukendt | 2 | 2013–2013 | 2 | ingen sikker nøgle |
| Hold DM Slutspil | 3-4 plads | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| 8-Nations | 3rd place | andet/ukendt | 2 | 2013–2013 | 1 | ingen sikker nøgle |
| Hold DM Slutspil | 5-6 plads | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| 8-Nations | 5th place | andet/ukendt | 2 | 2013–2013 | 1 | ingen sikker nøgle |
| Hold DM Slutspil | 7-8 plads | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| 8-Nations | 7th place | andet/ukendt | 2 | 2013–2013 | 1 | ingen sikker nøgle |
| Hold DM Slutspil | 9-10 plads | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| 8-Nations | Final | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Hold DM Slutspil | Finale | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| 8-Nations | Group 1 | andet/ukendt | 2 | 2013–2013 | 1 | ingen sikker nøgle |
| 8-Nations | Group 2 | andet/ukendt | 2 | 2013–2013 | 1 | ingen sikker nøgle |
| LM SLUTSPIL U15 A2 | BRONZE 3. - 4. PLADS | slutspil | 2 | 2013–2013 | 14 | navneord: slutspil |
| LM SLUTSPIL U15 A2 | FINALE | slutspil | 2 | 2013–2013 | 14 | navneord: slutspil |
| LM U15 2+2 | U15 2+2 M | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 2+2 | U15 2+2 A | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 PIGER | U15 4 piger B | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 PIGER | U15 4 piger C | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 PIGER | U15 4 piger D | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere A1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere A2 pulje 1 | grundspil | 2 | 2013–2013 | 14 | navneord: grundspil/pulje |
| LM U15 4 SPILLERE | U15 4 spillere A2 pulje 2 | grundspil | 2 | 2013–2013 | 14 | navneord: grundspil/pulje |
| LM U15 4 SPILLERE | U15 4 spillere B1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere B2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere B3 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere B4 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere B5 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere C1 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere C2 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere C3 | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere D | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| LM U15 4 SPILLERE | U15 4 spillere M | andet/ukendt | 2 | 2013–2013 | 14 | ingen sikker nøgle |
| U15 M | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 M | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 A 4-8+2-4 spillere ny | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U154+3 slutspil | Pulje A | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U154+3 slutspil | Pulje B | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U15 B-række 4+2 | Pulje 1 | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U15 1. serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 2. serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 3. serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 Serie X1 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 Serie X2 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 Serie X3 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 3. serie | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Finaler U15 4+2 A og B | Finale - U15B 4+2 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler U15 4+2 A og B | Finale U15A 4+2 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - U15 4m/k A, B, C og D | Finale U15A 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - U15 4m/k A, B, C og D | Finale U15B 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - U15 4m/k A, B, C og D | Finale U15C 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - U15 4m/k A, B, C og D | Finale U15D 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U15 E/M Finale | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U15 C 4 m/k | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 Elite- / Mesterrække | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 A-række 4+2 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 A-række 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 B-række 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 D 4 m/k | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 D 4 m/k | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 C 4 m/k | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 D 4 m/k | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| C - 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U15A 4 spillere | Pulje 20 | grundspil | 2 | 2013–2013 | 5 | navneord: grundspil/pulje |
| U15A 4 spillere | Pulje 21 | grundspil | 2 | 2013–2013 | 5 | navneord: grundspil/pulje |
| U15A 4 spillere slutspil | Pulje A | slutspil | 2 | 2013–2013 | 5 | navneord: slutspil |
| U15A 4 spillere slutspil | Pulje B | slutspil | 2 | 2013–2013 | 5 | navneord: slutspil |
| U15 D - 4 spillere | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15D 4 spillere | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 A 2+2 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 B 4 spillere slutrunde | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15 B 4 spillere slutrunde | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| &#216;M U15 B 4 SP. | Puljevinderkampe | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| &#216;M U15 D 4 SP. | Puljevinderkampe | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| &#216;M U15 C 4 SP. | Puljevinderkampe | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15B 4 spillere | Pulje 22 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15B 4 spillere | Pulje 23 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15C 4 spillere | Pulje 24 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15C 4 spillere | Pulje 25 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15C 4 spillere | Pulje 26 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15C 4 spillere | Pulje 27 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15D 4 spillere | Pulje 28 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15D 4 spillere | Pulje 29 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15D 4 spillere | Pulje 30 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U15D 4 piger/mk | Pulje 31 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| DM HOLD slutspil | Nr. 1 i puljen 1 CUP | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| DM HOLD slutspil | Nr. 2 i puljen 2 CUP | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| DM HOLD slutspil | Nr. 3 i puljen 3 CUP | slutspil | 2 | 2013–2013 | 2 | navneord: slutspil |
| DM HOLD | Pulje 1 | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| DM HOLD | Pulje 2 | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| DM HOLD | Pulje 3 | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| DM HOLD | Pulje 4 | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| LM EFTSK. SLUTSPIL 4+2 B | 3. - 4 plads 4+2 B | slutspil | 2 | 2013–2013 | 7 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4+2 E/M | 3. - 4. pl. Mester | slutspil | 2 | 2013–2013 | 4 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4 PI. C | 3. - 4. plads 4 PI. C | slutspil | 2 | 2013–2013 | 6 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4 SP. B | 3. - 4. plads 4 SP. B | slutspil | 2 | 2013–2013 | 8 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4 SP. C | 3. - 4. plads 4 SP. C | slutspil | 2 | 2013–2013 | 9 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4+2 C | 3. - 4. plads 4+2 C | slutspil | 2 | 2013–2013 | 8 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4 PI. C | 5. - 6. plads 4 PI. C | slutspil | 2 | 2013–2013 | 6 | navneord: slutspil |
| LM U17/U19 4 SPILLERE | A1 | andet/ukendt | 2 | 2013–2013 | 12 | ingen sikker nøgle |
| LM U17/U19 4 SPILLERE | A2 | andet/ukendt | 2 | 2013–2013 | 12 | ingen sikker nøgle |
| LM U17/U19 4 SPILLERE | B1 | andet/ukendt | 2 | 2013–2013 | 12 | ingen sikker nøgle |
| LM U17/U19 4 SPILLERE | B2 | andet/ukendt | 2 | 2013–2013 | 12 | ingen sikker nøgle |
| LM U17/U19 4 SPILLERE | B3 | andet/ukendt | 2 | 2013–2013 | 12 | ingen sikker nøgle |
| LM U17/U19 4 SPILLERE | C | andet/ukendt | 2 | 2013–2013 | 12 | ingen sikker nøgle |
| LM EFTSK. SLUTSPIL 4 PI. C | Finale 4 PI. C | slutspil | 2 | 2013–2013 | 6 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4 SP. B | Finale 4 SP. B | slutspil | 2 | 2013–2013 | 8 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4 SP. C | Finale 4 SP. C | slutspil | 2 | 2013–2013 | 9 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4+2 B | Finale 4+2 B | slutspil | 2 | 2013–2013 | 7 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4+2 C | Finale 4+2 C | slutspil | 2 | 2013–2013 | 8 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4+2 E/M | Finale Eliterækken | slutspil | 2 | 2013–2013 | 4 | navneord: slutspil |
| LM EFTSK. SLUTSPIL 4+2 E/M | Finale Mesterrækken | slutspil | 2 | 2013–2013 | 4 | navneord: slutspil |
| LM EFTSK. 4+2 ELITE/MESTER | Pulje 1 | grundspil | 2 | 2013–2013 | 4 | navneord: grundspil/pulje |
| LM EFTSK. 4 SP. B | Pulje 10 | grundspil | 2 | 2013–2013 | 8 | navneord: grundspil/pulje |
| LM EFTSK. 4 SP. C | Pulje 11 | grundspil | 2 | 2013–2013 | 9 | navneord: grundspil/pulje |
| LM EFTSK. 4 SP. C | Pulje 12 | grundspil | 2 | 2013–2013 | 9 | navneord: grundspil/pulje |
| LM EFTSK. 4 PI. C | Pulje 13 | grundspil | 2 | 2013–2013 | 6 | navneord: grundspil/pulje |
| LM EFTSK. 4 PI. C | Pulje 14 | grundspil | 2 | 2013–2013 | 6 | navneord: grundspil/pulje |
| LM EFTSK. 4+2 ELITE/MESTER | Pulje 2 | grundspil | 2 | 2013–2013 | 4 | navneord: grundspil/pulje |
| LM EFTSK. 4+2 A | Pulje 3 | grundspil | 2 | 2013–2013 | 6 | navneord: grundspil/pulje |
| LM EFTSK. 4+2 B | Pulje 4 | grundspil | 2 | 2013–2013 | 7 | navneord: grundspil/pulje |
| LM EFTSK. 4+2 B | Pulje 5 | grundspil | 2 | 2013–2013 | 7 | navneord: grundspil/pulje |
| LM EFTSK. 4+2 C | Pulje 6 | grundspil | 2 | 2013–2013 | 8 | navneord: grundspil/pulje |
| LM EFTSK. 4+2 C | Pulje 7 | grundspil | 2 | 2013–2013 | 8 | navneord: grundspil/pulje |
| LM EFTSK. 4 SP. A | Pulje 8 | grundspil | 2 | 2013–2013 | 7 | navneord: grundspil/pulje |
| LM EFTSK. 4 SP. B | Pulje 9 | grundspil | 2 | 2013–2013 | 8 | navneord: grundspil/pulje |
| LM U17 ELITE/MESTER 4 SP. | Pulje 1 | grundspil | 2 | 2013–2013 | 4 | navneord: grundspil/pulje |
| LM U17 ELITE/MESTER 4 SP. | Pulje 2 | grundspil | 2 | 2013–2013 | 4 | navneord: grundspil/pulje |
| LM U17/U19 SLUTSPIL M/E 4 SP. | Slutspil A | slutspil | 2 | 2013–2013 | 13 | navneord: slutspil |
| LM U17/U19 SLUTSPIL M/E 4 SP. | Slutspil B | slutspil | 2 | 2013–2013 | 13 | navneord: slutspil |
| U17 M | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17+U19 A 4-8 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17+U19 M 4-8+2-4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17 4+3 | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U174+3 slutspil | Pulje A | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U174+3 slutspil | Pulje B | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U17+U19 C 4-8 spillere | Jammerbugt | andet/ukendt | 2 | 2013–2013 | 1 | ingen sikker nøgle |
| U17+U19 M 4-8 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17+U19 B 4-8 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17+U19 C 4-8 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17+U19 C 4-8 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17+U19 C 4-8 spillere | Pulje 3 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17+U19 B 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17 1. serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17 2. serie | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17 Serie X1 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17 C 4-8 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Finale U17B 4 drenge | Finale - U17B 4 drenge | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - U17A og B 4 m/k | Finale U17A 4m/k | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finaler - U17A og B 4 m/k | Finale U17B 4m/k (min. 1 pige) | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U17 A-række 4+2 | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17 B-række 4 drenge | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17 B-række 4 spillere (min. 1 pige) | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U-17 A-række 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17 E/M Finale | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| Finale U17A 4+2 | Pulje 1 | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| EFTSK. U17A 4 SP. | Pulje 51 | grundspil | 2 | 2013–2013 | 4 | navneord: grundspil/pulje |
| EFTSK. U17B 4 SP. | Pulje 52 | grundspil | 2 | 2013–2013 | 4 | navneord: grundspil/pulje |
| EFTSK. U17C 4 SP. | Pulje 53 | grundspil | 2 | 2013–2013 | 4 | navneord: grundspil/pulje |
| EFTSK. U17C 4 PI. | Pulje 54 | grundspil | 2 | 2013–2013 | 4 | navneord: grundspil/pulje |
| U17-19C, 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17/19 C - 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U17/19 B - 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 2 | navneord: grundspil/pulje |
| U17/U19M 4 spillere | Pulje 32 | grundspil | 2 | 2013–2013 | 5 | navneord: grundspil/pulje |
| U17/U19A 4 spillere | Pulje 33 | grundspil | 2 | 2013–2013 | 5 | navneord: grundspil/pulje |
| U17/U19A 4 spillere slutspil | Pulje A | slutspil | 2 | 2013–2013 | 5 | navneord: slutspil |
| U17/U19A 4 spillere slutspil | Pulje B | slutspil | 2 | 2013–2013 | 5 | navneord: slutspil |
| U17/U19 B - 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17/U19 C - 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17/U19 C - 4 Spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17-19 C 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17-U19 C - 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17-U19 B - 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17-U19 A - 4 spillere | Pulje 1 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17-U19 C - 4 spillere | Pulje 2 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17B 4 spillere slutspil | Pulje A | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| U17B 4 spillere slutspil | Pulje B | slutspil | 2 | 2013–2013 | 1 | navneord: slutspil |
| &#216;M U17 C 4 SP. | Puljevinderkampe | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17/U19B 4 spillere | Pulje 35 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17/U19B 4 spillere | Pulje 36 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17/U19C 4 spillere | Pulje 37 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| U17/U19C 4 spillere | Pulje 38 | grundspil | 2 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Slutspil serie 2 | Nedrykning til serie 3 | nedrykningsspil | 2 | 2013–2018 | 1 | navneord: nedrykning |
| Slutspil serie 2 | Oprykning til serie 1 | oprykningsspil | 2 | 2013–2018 | 1 | navneord: oprykning |
| 30. Serie | Pulje 1 | grundspil | 2 | 2013–2017 | 1 | navneord: grundspil/pulje |
| KS-Pulje 1 | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| KS-Pulje 2 | Pulje 2 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| 1. Serie P1 | Pulje 1 | grundspil | 2 | 2013–2017 | 1 | navneord: grundspil/pulje |
| 2. Serie P2 | Pulje 2 | grundspil | 2 | 2013–2017 | 1 | navneord: grundspil/pulje |
| 3. Serie P2 | Pulje 2 | grundspil | 2 | 2013–2017 | 1 | navneord: grundspil/pulje |
| 1. Serie P2 | Pulje 2 | grundspil | 2 | 2013–2017 | 1 | navneord: grundspil/pulje |
| 4. Serie P1 | Pulje 1 | grundspil | 2 | 2013–2016 | 1 | navneord: grundspil/pulje |
| Serie 2, 6+4 Nord | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| Serie 2, 6+4 Nord | Pulje 2 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| Serie 2, 6+4, Slutspil Nord - oprykning | Pulje 1 | oprykningsspil | 2 | 2013–2014 | 1 | navneord: oprykning |
| Serie 2, 6+4, Slutspil Nord - nedrykning | Pulje 1 | nedrykningsspil | 2 | 2013–2014 | 1 | navneord: nedrykning |
| Senior B | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| Serie 3 4 Herrer | Pulje 1 | grundspil | 2 | 2013–2015 | 1 | navneord: grundspil/pulje |
| Senior Bx 4H | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| Senior Cx 4H | Pulje 1 | grundspil | 2 | 2013–2015 | 1 | navneord: grundspil/pulje |
| Senior 4+2 (7 kampe) | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| Serie 1 + 2 | Pulje 1 | grundspil | 2 | 2013–2022 | 2 | navneord: grundspil/pulje |
| Motionist C | Pulje 1 | grundspil | 2 | 2013–2016 | 1 | navneord: grundspil/pulje |
| 40+ Eliterækken, Nedrykningsspil | Pulje 1 | nedrykningsspil | 2 | 2013–2016 | 4 | navneord: nedrykning |
| 40+ A-rækken, Nedrykningsspil | Pulje 1 | nedrykningsspil | 2 | 2013–2015 | 1 | navneord: nedrykning |
| Veteran - 4+2 | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| Veteran +40+50 4+2 9D | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| 50+, 4+4 rækken | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| Veteran +55+60 4H 6D | Pulje 1 | grundspil | 2 | 2013–2014 | 1 | navneord: grundspil/pulje |
| DBU U09 D 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U9 D 4-8 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U9 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U09 D 4-8 spillere | Finale - U9 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U09 D 4-8 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U9 D - 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U9 4 Spiller | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#197;rets U11 Hold - Semifinaler | 1. Semifinale for 1'ere | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Semifinaler | 1. Semifinale for 2'ere | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Semifinaler | 1. Semifinale for 3'ere | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere SLUTSPIL | 11.-12. pladsen | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Finaler & Placeringskampe | 11-12. Plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere SLUTSPIL | 13.-14. pladsen | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere Puljevinderkampe | 13.-16.pladsen | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere SLUTSPIL | 15.-16. pladsen | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Semifinaler | 2. semifinale for 1'ere | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Semifinaler | 2. Semifinale for 2'ere | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Semifinaler | 2. Semifinale for 3'ere | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Finaler & Placeringskampe | 3-4. Plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 B 4 spillere Puljevinderkampe | 5.-6. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 C 4 spillere Puljevinderkampe | 5.-6. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere SLUTSPIL | 5.-6. pladsen | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere Puljevinderkampe | 5.-8. pladsen | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#197;rets U11 Hold - Finaler & Placeringskampe | 5-6. Plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 B 4 spillere Puljevinderkampe | 7.-8. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 C 4 spillere Puljevinderkampe | 7.-8. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere SLUTSPIL | 7.-8. pladsen | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Finaler & Placeringskampe | 7-8. Plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 C 4 spillere Puljevinderkampe | 9.-10. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere SLUTSPIL | 9.-10. pladsen | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere Puljevinderkampe | 9.-12. pladsen | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#197;rets U11 Hold - Finaler & Placeringskampe | 9-10. Plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere SLUTSPIL | Bronzekamp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 B 4 spillere Puljevinderkampe | Bronzekamp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 C 4 spillere Puljevinderkampe | Bronzekamp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 piger Finale/Bronze kamp | Bronzekamp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 B 4 spillere Puljevinderkampe | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 C 4 spillere Puljevinderkampe | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 piger Finale/Bronze kamp | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere SLUTSPIL | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Finaler & Placeringskampe | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| &#197;rets U11 Hold - Indledende Puljer | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 piger | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 B 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 B 4 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#197;rets U11 Hold - Indledende Puljer | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#197;rets U11 Hold - Indledende Puljer | Pulje 3 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#197;rets U11 Hold - Indledende Puljer | Pulje 4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere Puljevinderkampe | Semifinaler | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U11M | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 D 4-8 spillere | Pulje 4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U11 B 4 spillere SLUTSPIL | Pulje 2A | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U11 B 4 spillere SLUTSPIL | Pulje 2B | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U11D, 4 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U11 D 4 spillere, kredskamp grundspil | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U11D Finale Fynsmester | Pulje 1 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U11 1.serie (4+3) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U 11 2.serie (4+2 A) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 serie X1 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 serie X2 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 serie X3 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 B 4-8 spillere | Finalekamp U11B 4-8 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U11 C 4-8 spillere | Finalekamp U11C 4-8 sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U11 D 4-8 spillere | Finalekamp U11D 4-8 sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U11D, piger | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 D - 4 Spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U11 D - 4 Spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U11 A+B 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 C - 4 Spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 B 4 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 3 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U11 D 4 spillere | Puljevinder kampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U11 D 4 piger | Pulje 9 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 11.-12. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 13.-14. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere puljevinderkampe | 13.-16. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 13.-16.plads pulje 1 og 4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 13-16. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 15.-16. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 17.-18. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere puljevinderkampe | 17.-20. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| Hold DM U13 Slutspil | 2'er Cup | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 A 4 spillere Puljevinderkampe | 3.-4. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| Hold DM U13 Slutspil | 3'er Cup | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| Hold DM U13 Slutspil | 4'er Cup | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 C 4 spillere puljevinderkampe | 5.-6. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 A 4 spillere Puljevinderkampe | 5.-6. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 5.-8. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere puljevinderkampe | 5.-8. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 5.-8. plads pulje 1 og 4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 7.-8. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 A 4 spillere Puljevinderkampe | 7.-8. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 A 4 spillere Puljevinderkampe | 9.-10. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 9.-10. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere puljevinderkampe | 9.-12. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 9.-12. plads | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | 9.-12.plads pulje 1 og 4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere Finale/Bronzekamp | Bronzekamp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 C 4 spillere Finale/Bronzekamp | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 A 4 spillere Puljevinderkampe | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| Hold DM U13 Slutspil | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 D 4 piger | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 A 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 A 4 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 spillere puljevinderkampe | Semifinaler | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 D 4 spillere puljevinderkampe | Semifinaler | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 B 4 spillere puljevinderkampe | Slutspil 1 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 B 4 spillere puljevinderkampe | Slutspil 2 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 B 4 spillere puljevinderkampe | Slutspil 3 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U13 B 4 spillere puljevinderkampe | Slutspil 4 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U13M | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| DBU U13 D piger | Bronzekamp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| DBU U13 D piger | Finale | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 M 4 spillere | Pulje 10 | grundspil | 2 | 2014–2014 | 3 | navneord: grundspil/pulje |
| U13 D 4-8 spillere | Jammerbugt | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| U13 C 4-8 spillere | Jammerbugt | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| U13 D 4-8 spillere | Mariager Fjord | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| U13 C 4-8 spillere | Pulje 3 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U13 D 4-8 spillere | Pulje 5 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U13 A 4 spillere | Pulje 11 | grundspil | 2 | 2014–2014 | 3 | navneord: grundspil/pulje |
| U13C -semifinaler | Semifinaler | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13C -3. - 4. plads | U13C 3.-4. plads | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| U13C -Finale | U13C Finale | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 1.serie (4+3) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 2.serie (4+2 M) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 3.serie (4+2 M) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 serie X1 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 serie X2 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 serie X3 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 B 4-8 spillere | Finalekamp U13B 4-8 sp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U13 D 4-8 spillere | Slutspil | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 A 4-8+2-4 spillere | Finalekamp U13A 4+2 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 A 4-8 spillere | Finalekamp U13A 4-8 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 C 4-8 spillere | Finalekamp U13C 4-8 sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 M 4-8 spillere | Finalekamp U13M 4-8 sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 D 4-8 spillere | Finalekampe U13D 4-8 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 M 4-8 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13D, piger | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 B - 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 D - 4 Spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U13 D - 4 Spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U13 D - 4 Spillere | Pulje 3 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U13B ombrydning | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U13B ombrydning | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U13D 4 spillere | Pulje 3 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 A+B 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 C 4 spillere slutspil | Pulje 1 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U13 B - 4 Spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 C - 4 Spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 12 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 13 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U13 B 4 spillere | Puljevinderkampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 14 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 15 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U13 C 4 spillere | Puljevinderkampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 16 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 17 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 18 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 19 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U13 D 4 spillere | Puljevinder kampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13 D 4 piger | Pulje 20 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| SLUTSPIL U15 A 4+2 | Broncekamp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 A 4+2 | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 A 4 spillere | Pulje 3 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 A 4 spillere | Pulje A1 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 A 4 spillere | Pulje A2 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 B 4 spillere | Pulje B Broncekamp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 B 4 spillere | Pulje B Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 B 4 spillere | Pulje B1 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 B 4 spillere | Pulje B2 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 B 4 spillere | Pulje B3 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 B 4 spillere | Pulje B4 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C 4 spillere Broncekanp | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C1 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C2 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C3 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C4 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C4 spillere Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C5 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C6 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C7 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 C 4 spillere | Pulje C8 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 D 4 spillere | Pulje D 1 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 D 4 spillere | Pulje D 2 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 D 4 spillere | Pulje D 3 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 D 4 spillere | Pulje D 4 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U15 D 4 spillere | Pulje D 5 | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DM U15 Hold | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| DM U15 Hold | Pulje 2 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| DM U15 Hold | Pulje 3 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| DM U15 Hold | Pulje 4 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| DM U15 Hold Slutspil | Samlet stilling | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| DBU U15 A 4+2 | Pulje 4+2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 A 4 spillere | Pulje A1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 A 4 spillere | Pulje A2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 B 4 spillere | Pulje B1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 B 4 spillere | Pulje B2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 B 4 spillere | Pulje B3 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 B 4 spillere | Pulje B4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje C1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje C2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje C3 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje C4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje C5 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje C6 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 D 4 spillere | Pulje D1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 D 4 spillere | Pulje D2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U15 D 4 spillere | Pulje D3 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U15M | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U13/U15 | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 M 4-8+2-4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| SLUTSPIL 4+3 | SLUTSPIL Pulje A | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL 4+3 | SLUTSPIL Pulje B | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 D 4-8 spillere | Pulje 4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U15 1.serie (4+3) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 2.serie (4+2 M) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 3.serie (4+2 M) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 serie X1 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 serie X2 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 4+3 | Finale U15 4+3 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 A 4-8+2-4 spillere | Finalekamp U15A 4+2 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 A 4-8 spillere | Finalekamp U15A 4-8 sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 B 4-8 spillere | Finalekamp U15B 4-8 sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 D 4-8 spillere | Finalekamp U15D 4-8sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 C 4-8 spillere | Finalekampe | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 A 4-8 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15D, 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15D, 4 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15D 4 spillere kredskamp grundspil | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15D Finale Fynsmester | Pulje 1 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 A 4 spillere | Pulje 21 | grundspil | 2 | 2014–2014 | 3 | navneord: grundspil/pulje |
| U15 A 4 spillere SLUTSPIL | Pulje 21 A | slutspil | 2 | 2014–2014 | 3 | navneord: slutspil |
| U15 A 4 spillere SLUTSPIL | Pulje 21 B | slutspil | 2 | 2014–2014 | 3 | navneord: slutspil |
| U15 D - 4 Spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U15 D - 4 Spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| slutspil U15 B 4 spillere | Pulje 1 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 C - 4 Spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 22 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 23 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U 15 B 4 spillere | Puljevinder kampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 24 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 25 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 26 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U15 C 4 spillere | Puljevinder kampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 27 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 28 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 29 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U15 D 4 spillere | Puljevinder kampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U15 D 4 spillere SLUTSPIL | Pulje 29 A | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U15 D 4 piger SLUTSPIL | Pulje 29 B | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U17 DM Slutspil | 1'er Pulje | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U17 DM Slutspil | 2'er Pulje | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U17 B 4 spillere | 3. - 4. plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U17/U19 A 4+2 | 3. - 4. plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U17 DM Slutspil | 3'er Pulje | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U17 B 4 spillere | Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U17/U19 A 4+2 | Finale 4+2 A | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U17 C 4 spillere | Pulje C 13. - 17. plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U17 C 4 spillere | Pulje C 5. - 8. plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U17 C 4 spillere | Pulje C 9. - 12. plads | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| SLUTSPIL U17 C 4 spillere | Pulje C Finale | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| DBU U17/U19 A 4+2 | Pulje 4+2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U17/U19 A 4 spillere | Pulje A | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U17/U19 B 4 spillere | Pulje B1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U17/U19 B 4 spillere | Pulje B2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U17/U19 C 4 spillere | Pulje C1 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U17/U19 C 4 spillere | Pulje C2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U17/U19 C 4 spillere | Pulje C3 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| DBU U17/U19 C 4 spillere | Pulje C4 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U17M | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 A 4 SP. | Pulje A | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 B 4 SP. | Pulje B | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 C 4 SP. | Pulje C | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 C 4 PIGER | Pulje C piger | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 Mester/Elite | 4+2 Mester/Elite | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| SLUTSPIL DM EFTSK. 4+2 A | 4+2 A 3. - 4. plads | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL DM EFTSK. 4+2 A | 4+2 A 5. - 6. plads | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL DM EFTSK. 4+2 A | 4+2 A Finale | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 A | 4+2 A1 | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4+2 A | 4+2 A2 | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| SLUTSPIL DM EFTSK. 4+2 B | 4+2 B 3. - 4. plads | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL DM EFTSK. 4+2 B | 4+2 B 5. - 6. plads | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL DM EFTSK. 4+2 B | 4+2 B Finale | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 B | 4+2 B1 | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4+2 B | 4+2 B2 | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| SLUTSPIL DM EFTSK. 4+2 C | 4+2 C 3. - 4. plads | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL DM EFTSK. 4+2 C | 4+2 C Finale | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 C | 4+2 C1 | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4+2 C | 4+2 C2 | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| DM EFTERSLOLER 4 PIGER C | 4 PIGER C | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4 SP. A | 4 SP. A | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4 SP. B | 4 SP. B | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| SLUTSPIL DM EFTSK. 4 SP. C | 4 SP. C 3. - 4. plads | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL DM EFTSK. 4 SP. C | 4 SP. C Finale | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4 SP. C | 4 SP. C1 | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4 SP. C | 4 SP. C2 | andet/ukendt | 2 | 2014–2014 | 1 | ingen sikker nøgle |
| U17-19 4+3 | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17-19 4+3 | Pulje 2 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| SLUTSPIL U17 | SLUTSPIL Pulje A | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL U17 | SLUTSPIL Pulje B | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U17/U19 M 4 spillere | Pulje 30 | grundspil | 2 | 2014–2014 | 4 | navneord: grundspil/pulje |
| U17-19 C 4-8 spillere | Jammerbugt | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| U17-19 C 4-8 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U17-19 C 4-8 spillere | Pulje 3 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| Nordjysk Mesterskab for hold | U11D | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| Nordjysk Mesterskab for hold | U13C | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| Nordjysk Mesterskab for hold | U13D | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| Nordjysk Mesterskab for hold | U15B | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| Nordjysk Mesterskab for hold | U15C | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| Nordjysk Mesterskab for hold | U15D | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| Nordjysk Mesterskab for hold | U17C | andet/ukendt | 2 | 2014–2014 | 2 | ingen sikker nøgle |
| U17 1.serie (4+3) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17 2.serie (4+2 M) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17 serie X1 (4 spillere C) | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17 4+3 | Finale U17 4+3 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U17-19 A 4-8+2-4 spillere | Finalekamp U17-19A 4+2 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U17-19 A 4-8 spillere | Finalekamp U17-19A 4-8 sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U17-19 B 4-8 spillere | Finalekamp U17-19B 4-8 sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U17-19 C 4-8 spillere | Finalekamp U17-19C 4-8sp | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U17-19 C 4-8 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17-19 B 4-8 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 31 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere SLUTSPIL | Pulje 31A | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U17/U19 A 4 spillere SLUTSPIL | Pulje 31B | slutspil | 2 | 2014–2014 | 2 | navneord: slutspil |
| U17/U19 C - 4 Spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 2 | navneord: grundspil/pulje |
| U 17 / U 19 C - 4 Spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U 17 / U 19 C efter jul 4 spiller | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/19 B 4 spillere slutspil | Pulje 1 | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| U17/19 B 4 spillere | Pulje 2 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/19 - 4 spillere | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 32 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 33 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 34 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U17/U19 B 4 spillere | Puljevinder kampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M U17/U19 C 4 spillere | Puljevinderkampe | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 35 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 36 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| U17/U19 C 4 piger | Pulje 39 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 B 4+2 | Pulje 1 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 C 4+2 | Pulje 2 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 B 4 SP. | Pulje 3 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 C 4 SP. | Pulje 4 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 C 4 SP. | Pulje 5 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 C 4 SP. SLUTSPIL | Finale | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| &#216;M EFTSK. U17 C 4 PIGER | Pulje 8 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 C 4 PIGER | Pulje 9 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 C 4 PIGER SLUTSPIL | 3. - 4. plads: | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| &#216;M EFTSK. U17 C 4 PIGER SLUTSPIL | 5. - 6. plads: | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| &#216;M EFTSK. U17 C 4 PIGER SLUTSPIL | Finale: | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| &#216;M EFTSK. U17 X 4 SP. | Pulje 6 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 X 4 SP. | Pulje 7 | grundspil | 2 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. U17 X 4 SP. SLUTSPIL | Finale | slutspil | 2 | 2014–2014 | 1 | navneord: slutspil |
| Sjællandsserien slutspil - Nedrykning | Pulje 1 | nedrykningsspil | 2 | 2014–2023 | 1 | navneord: nedrykning |
| Serie 1 Slutspil - Oprykning | Pulje 1 | oprykningsspil | 2 | 2014–2015 | 1 | navneord: oprykning |
| Serie 1 Slutspil - Oprykning | Pulje 2 | oprykningsspil | 2 | 2014–2015 | 1 | navneord: oprykning |
| 4+2 rækken | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Senior B-række | Pulje 1 | grundspil | 2 | 2014–2016 | 4 | navneord: grundspil/pulje |
| Serie 1 + 2 (4+2) | Pulje 1 | grundspil | 2 | 2014–2015 | 2 | navneord: grundspil/pulje |
| 17+ - 4H A | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 50+ - 4+2 B | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 17+ - 4H B/C | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 17+ - 2+2 A | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 17+ - 2+2 B/C | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Herre 1.+ 2. Division (4+0) | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Herre 3. + 4.Division (4+0) | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Serie 3 + 4 + 5 (4+2) | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran 4 Herrer A | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Old +35 4H | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+ 2.serie | Pulje 1 | grundspil | 2 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 40+ 7.serie | Pulje 1 | grundspil | 2 | 2014–2016 | 1 | navneord: grundspil/pulje |
| 40+ 8.serie | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+ elite | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+, Eliterækken | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+, Eliterækken | Pulje 2 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+ Eliterækken, Nedrykningsslutspil | Pulje 1 | nedrykningsspil | 2 | 2014–2015 | 1 | navneord: nedrykning |
| 40+, Mesterrækken | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+, Mesterrækken | Pulje 2 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+ Mesterrækken, Oprykningsslutspil | Pulje 1 | oprykningsspil | 2 | 2014–2015 | 1 | navneord: oprykning |
| 40+, A-rækken | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+, A-rækken | Pulje 2 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| 40+, B-rækken | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran C (4+2) | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran D (4+2) | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran 40+ A HD (4+0) 6 Vendedoubler | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran 40+ B HD (4+0) 6 Vendedoubler | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran 40+ B HD (4+0) 6 Vendedoubler | Pulje 2 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran 45+ - 50+ HD (4+0) 6 Vendedoubler | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran 50 + - 55+ - 60+ (2+2) 6 doubler | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran 50+ HD (4+0) 6 Vendedoubler | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Veteran 55+ - 60+ HD (4+0) 6 Vendedoubler | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| MOT 4+2 u/s Elite/Mester | Pulje 1 | grundspil | 2 | 2014–2015 | 2 | navneord: grundspil/pulje |
| MOT 4+2 u/s Serie 1-2 | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| MOT 4+2 u/s Serie 3-4 | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| MOT 8 herrer Elite/Mester | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer Serie 4-5 | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| MOT 4 damer | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Motion 4+4 Serie 2 | Pulje 1 | grundspil | 2 | 2014–2015 | 2 | navneord: grundspil/pulje |
| Motion 4H A HD (4+0) Vendedoubler | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Motion 4+4 Serie 3 | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Motion 4H B HD (4+0) Vendedoubler | Pulje 1 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Motion 4H B HD (4+0) Vendedoubler | Pulje 2 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| Motion 4H B HD (4+0) Vendedoubler | Pulje 3 | grundspil | 2 | 2014–2015 | 1 | navneord: grundspil/pulje |
| DBU U9 D 4 spillere | Pulje U9 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U09 D 4 spillere | Pulje 301 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U09 D 4 spillere | Pulje 401 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U9D -4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Finalekamp | Pulje 1 | slutspil | 2 | 2015–2015 | 4 | navneord: slutspil |
| U09 D 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 4 | navneord: grundspil/pulje |
| &#197;rets U11 hold 4+3 | 1'er Pujle | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| &#197;rets U11 hold 4+3 | 2'er Pujle | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| &#197;rets U11 hold 4+3 | 3'er Pujle | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| DBU U11 D MIX | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| &#197;rets U11 hold 4+3 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#197;rets U11 hold 4+3 | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#197;rets U11 hold 4+3 | Pulje 3 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DBU U11 D 4 piger | Pulje 4 piger | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U11 B 4 spillere | Pulje U11 B1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U11 B 4 spillere | Pulje U11 B2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U11 D 4 spillere | slutspil 1 - 4 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U11 B 4 spillere | slutspil 1 - 4 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U11 C 4 spillere | Slutspil 1. - 4. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere | slutspil 13 - 16 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere | slutspil 5 - 8 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U11 B 4 spillere | slutspil 5. - 7. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U11 C 4 spillere | Slutspil 5. - 8. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U11 D 4 spillere | slutspil 9 - 12 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U11 D 4 spillere | Pulje 111 - MIDT (DGI-VES) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 211 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 212 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 213 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 B 4 spillere | Pulje 311 A - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 B 4 spillere | Pulje 311 B - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 312 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 313 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 314 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 315 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 411 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 412 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 413 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 511 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 512 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 mix | Pulje 214 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11 D 4 piger | Pulje 316 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U11D Finale | Pulje 1 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U11D 3.- 4. plads | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U11D Semifinaler | Semifinaler | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U11 A Række 4+3 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U11 B Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U11 C Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U11 D Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Finalekampe SM | Finale U11B 4sp. | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finalekampe SM | Finale U11C 4sp. | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finalekampe SM | Finale U11D 4 piger | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finalekampe SM | Finale U11D 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finalekampe SM | Finale U11D mix | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finalekampe SM | Semifinaler U11D 4 sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| U11 D 4 mix | Pulje 1 | grundspil | 2 | 2015–2015 | 4 | navneord: grundspil/pulje |
| U11 D 4 piger | Pulje 1 | grundspil | 2 | 2015–2015 | 4 | navneord: grundspil/pulje |
| U13 uDM 4+3 | 2'er Semi-1 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U13 uDM 4+3 | 2'er Semi-2 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U13 uDM 4+3 | 3'er Semi-1 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U13 uDM 4+3 | 3'er Semi-2 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U13 uDM 4+3 | Bronzekamp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DBU U13 A 4 spillere | Bronzekamp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 M 4 spillere | Bronzekamp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 D 4 Piger | Bronzekamp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 D 4 Piger | Finale | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 M 4 spillere | Finale | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 A 4 spillere | Finale | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13 uDM 4+3 | Finale | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| U13 uDM 4+3 | Placering 11-12 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U13 uDM 4+3 | Placering 5-6 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U13 uDM 4+3 | Placering 7-8 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U13 uDM 4+3 | Placering 9-10 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| DBU U13 M 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 C 4 Piger | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13 uDM 4+3 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DBU U13 C MIX | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 D MIX | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 Piger | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13 uDM 4+3 | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U13 uDM 4+3 | Pulje 3 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U13 uDM 4+3 | Pulje 4 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere | Pulje 5 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 D 4 spillere | Pulje 6 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 A 4 spillere | Pulje A1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U13 A 4 spillere | Pulje A2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13 uDM 4+3 | Semifinale 1 | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| U13 uDM 4+3 | Semifinale 2 | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DBU U13 C 4 spillere | Slutspil 1. -4. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 B 4 spillere | Slutspil 1.-3. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 D 4 spillere | Slutspil 1.-6. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 B 4 spillere | Slutspil 10.-12. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 C 4 spillere | Slutspil 13. - 15. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 D 4 spillere | Slutspil 13.-18. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 D 4 spillere | Slutspil 19.-24. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 B 4 spillere | Slutspil 4.-6. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 C 4 spillere | Slutspil 5. - 8. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 B 4 spillere | Slutspil 7.-9. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 C 4 spillere | Slutspil 9. - 12. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U13 D 4 spillere | Sultspil 7.-12. plads | andet/ukendt | 2 | 2015–2015 | 2 | ingen sikker nøgle |
| U13 C/D | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 131 - MIDT (DGI-VES) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 132 - MIDT (DGI-VES) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 231 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 232 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 233 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 234 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 331 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 332 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 333 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 334 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 335 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 336 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 337 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 A 4 spillere | Pulje 35 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 A 4 spillere | Pulje 36 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 431 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 432 . MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 433 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 531 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 532 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 533 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 534 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 mix | Pulje 338 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 piger | Pulje 235 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 D 4 piger | Pulje 434 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 3 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13 D 4 spillere slutspil | Pulje 1 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13D 4 spillere Piger | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13A 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13D 3. - 4. plads | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13D Finale | Pulje 1 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13C 3.- 4. plads | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13C Finale | Pulje 1 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13A 3. - 4. plads | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13A Finale | Pulje 1 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13C Semifinaler | Pulje 1 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13C 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13A 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U13D Semifinaler | Semifinaler | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13A Semifinaler | Semifinaler | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13 E Række 4+3 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U13 M Række 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U13 A Række 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U13 B Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U13 C Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U13 D Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Finaler SM | Finale U13A 4sp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| Finaler SM | Finale U13B 4sp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| Finaler SM | Finale U13C 4mix | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| Finaler SM | Finale U13C 4sp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| Finaler SM | Finale U13D 4 piger | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| Finaler SM | Finale U13D 4mix | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| Finaler SM | Finale U13D 4sp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| Finaler SM | Finale U13M 4sp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| Finaler SM | Semifinaler U13D 4sp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U13 D 4 mix | Pulje 1 | grundspil | 2 | 2015–2015 | 4 | navneord: grundspil/pulje |
| U13 C 4 mix | Pulje 1 | grundspil | 2 | 2015–2015 | 4 | navneord: grundspil/pulje |
| U15 uDM hold 4+3 | 2'er Semi-1 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U15 uDM hold 4+3 | 2'er Semi-2 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U15 uDM hold 4+3 | 3'er Semi-1 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U15 uDM hold 4+3 | 3'er Semi-2 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| DBU U15 C MIX | Broncekamp | andet/ukendt | 2 | 2015–2015 | 2 | ingen sikker nøgle |
| DBU U15 A 4 spillere | Broncekamp | andet/ukendt | 2 | 2015–2015 | 2 | ingen sikker nøgle |
| DBU U15 D 4 spillere | Broncekamp | andet/ukendt | 2 | 2015–2015 | 2 | ingen sikker nøgle |
| U15 uDM hold 4+3 | Bronzekamp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DBU U15 A 4 spillere | Finale | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 D 4 spillere | Finale | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 C MIX | Finale | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U15 uDM hold 4+3 | Finale | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| U15 uDM hold 4+3 | Placering 11-12 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U15 uDM hold 4+3 | Placering 5-6 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U15 uDM hold 4+3 | Placering 7-8 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U15 uDM hold 4+3 | Placering 9-10 | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| DBU U15 C MIX | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U15 uDM hold 4+3 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 D MIX | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 A 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 A 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 B 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 D 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 A 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 B 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U15 uDM hold 4+3 | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DBU U15 D 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U15 uDM hold 4+3 | Pulje 3 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje 3 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 B 4 spillere | Pulje 3 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 B 4 spillere | Pulje 4 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U15 C 4 spillere | Pulje 4 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U15 uDM hold 4+3 | Pulje 4 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U15 uDM hold 4+3 | Semifinale 1 | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| U15 uDM hold 4+3 | Semifinale 2 | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DBU U15 C 4 spillere | Slutspil 13-14 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 B 4 spillere | Slutspil 13-15 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 B 4 spillere | Slutspil 1-4 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 C 4 spillere | Slutspil 1-4 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 B 4 spillere | Slutspil 5-8 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 C 4 spillere | Slutspil 5-8 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 B 4 spillere | Slutspil 9-12 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U15 C 4 spillere | Slutspil 9-12 plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U15 B 4 spillere | Pulje 151 - MIDT (DGI-VES) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 152 - MIDT (DGI-VES) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 153 - MIDT (DGI-VES) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 251 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 252 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 253 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 351 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 352 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 353 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 354 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 356 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 451 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 452 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 453 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 454 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 551 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 552 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 554 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 56 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 57 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 58 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 59 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 C 4 mix | Pulje 355 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 D 4 mix | Pulje 357 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 C 4 mix | Pulje 553 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 A 4+2 | Pulje 54 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15 A 4+2 | Pulje 55 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U15D 3.-4. plads | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U15D Finale | Pulje 1 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U15C Finale | Pulje 1 | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U15D Semifinaler | Semifinaler | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U15C Semifinaler | Semifinaler | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| U15 E Række 4+3 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U15 M Række 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U15 A Række 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U15 B Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U15 C Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U15 D Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U15 C-D 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Finaler SM U15 4 spillere | Finale U15A 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM 4+2 | Finale U15B 4+2 | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U15 4 spillere | Finale U15B 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U15 4 spillere | Finale U15C 4 piger | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U15 4 spillere | Finale U15C 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U15 4 spillere | Finale U15D 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM 4+2 | Finaler U15A 4+2 | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U15 4 spillere | Semifinale U15C 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U15 4 spillere | Semifinaler U15D 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| U15 A 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 4 | navneord: grundspil/pulje |
| U17 uDM 4+3 | 1'er Pujle | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U17 uDM 4+3 | 2'er Pujle | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| U17 uDM 4+3 | 3'er Pujle | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| DBU U17/19 A 4+2 | Bronzekamp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U17/19 A 4+2 | Finale | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U17/19 A 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U17 uDM 4+3 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U17 uDM 4+3 | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U17 uDM 4+3 | Pulje 3 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DBU U17/19 A 4 spillere | Bronzekamp | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U17/19 A 4 spillere | Finale | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U17/19 C 4 spillere | Placeringskampe | andet/ukendt | 2 | 2015–2015 | 2 | ingen sikker nøgle |
| DBU U17/19 A 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 C 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 B 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 B 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 C 4 spillere | Pulje 2 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 C 4 spillere | Pulje 3 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 B 4 spillere | Pulje 3 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 B 4 spillere | Pulje 4 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 C 4 spillere | Pulje 4 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| DBU U17/19 C 4 spillere | Slutspil 1. - 4. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U17/19 B 4 spillere | Slutspil 1. - 4. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U17/19 B 4 spillere | Slutspil 13. - 15. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U17/19 B 4 spillere | Slutspil 5. - 8. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DBU U17/19 B 4 spillere | Slutspil 9. - 12. plads | slutspil | 2 | 2015–2015 | 2 | navneord: slutspil |
| DM efterskoler - 4+2 elite | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4+2 mester | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4+2 mester | Slutspil | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DM efterskoler - 4+2 A | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4+2 B | Bronzekamp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DM efterskoler - 4+2 B | Finale | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DM efterskoler - 4+2 B | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4+2 B | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4+2 C | 5. - 6. plads | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| DM efterskoler - 4+2 C | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4+2 C | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4+2 C | Slutspil 1. - 4. plads | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DM efterskoler - 4 spillere A | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4 spillere B | 5. - 6. plads | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| DM efterskoler - 4 spillere B | Bronzekamp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DM efterskoler - 4 spillere B | Finale | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DM efterskoler - 4 spillere B | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4 spillere B | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4 spillere C | Bronzekamp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DM efterskoler - 4 spillere C | Finale | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| DM efterskoler - 4 spillere C | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4 spillere C | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4 piger C | 5. - 6. plads | andet/ukendt | 2 | 2015–2015 | 1 | ingen sikker nøgle |
| DM efterskoler - 4 piger C | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4 piger C | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| DM efterskoler - 4 piger C | Slutspil 1. - 4. plads | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| EFTERSKOLER U17/U19 A 4 spillere | Pulje A | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 B 4 spillere | Pulje B | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 C 4 spillere | Pulje C nord | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 C 4 spillere | Pulje C syd | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 C 4 mix | Pulje C mix | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 4+2 A | Pulje 4+2 A | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U17/U19 M 4 spillere | Pulje 370 | grundspil | 2 | 2015–2015 | 9 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 271 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 272 - MIDT (DGI-MID) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 371 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 372 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 373 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 374 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 375 - MIDT (DGI-&#216;ST) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 471 - MIDT (DGI-SYV) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 571 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 572 - MIDT (DGI-SY&#216;) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 76 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 77 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| U17/U19 A 4+2 | Pulje 75 - MIDT (BADMIDJ) | grundspil | 2 | 2015–2015 | 6 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U17C | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U17/19 A 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U17/19B 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U17/19C 4 spillere | Pulje 1 | grundspil | 2 | 2015–2015 | 2 | navneord: grundspil/pulje |
| U17 E Række 4+3 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U17 A Række 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U17 B Række 4 | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Finaler SM U17/19 4sp | Finale U17/19A 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U17/19 4sp | Finale U17/19B 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U17/19 4sp | Finale U17/19C 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| Finaler SM U17/19 4sp | Finale U17/19M 4sp | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| U17/U19 A 4+2 | Finale SM U17/19A 4+2 | slutspil | 2 | 2015–2015 | 4 | navneord: slutspil |
| U17/U19 A 4+2 | Pulje 1 | grundspil | 2 | 2015–2015 | 4 | navneord: grundspil/pulje |
| &#216;M efterskoler 4+2 C slutspil | 3. - 4. plads | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4+2 C slutspil | 5. - 6. plads | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4+2 C slutspil | Finale | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4+2 A | Pulje 1 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4+2 B | Pulje 2 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4+2 C | Pulje 3 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4+2 C | Pulje 4 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4 sp. C | Pulje 5 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4 piger C slutspil | 3. - 4. plads | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4 piger C slutspil | 5. - 6. plads | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4 sp. X slutspil | 5. - 8. plads | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4 sp. X slutspil | 9 - 12. plads | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4 piger C slutspil | Finale | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4 sp. X slutspil | Finalerunde | slutspil | 2 | 2015–2015 | 1 | navneord: slutspil |
| &#216;M efterskoler 4 piger C | Pulje 10 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4 piger C | Pulje 11 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4 sp. X | Pulje 6 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4 sp. X | Pulje 7 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4 sp. X | Pulje 8 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler 4 sp. X | Pulje 9 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 3 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 4 | grundspil | 2 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 2 | andet/ukendt | 2 | 2015–2018 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 3 | kvalifikation_ned | 2 | 2015–2018 | 1 | navneord: kvalifikation + ned |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 4 | kvalifikation_ned | 2 | 2015–2018 | 1 | navneord: kvalifikation + ned |
| Kvalifikations-række | Pulje 1 | andet/ukendt | 2 | 2015–2016 | 2 | kvalifikation uden retning |
| Senior Hr. B-række | Pulje 1 | grundspil | 2 | 2015–2016 | 2 | navneord: grundspil/pulje |
| 60+ 3.serie | Pulje 1 | grundspil | 2 | 2015–2016 | 1 | navneord: grundspil/pulje |
| DMU-Hold U9 D 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 3091 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 4091 MIDT-S&#216;N (DGI -SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 6091 MIDT-S&#216;N | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U9 D 4 spillere | Jammerbugt | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| Nordjysk holdmesterskab U9 | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Holdturneringsdage for begyndere U9-Herlev | Pulje 1 | grundspil | 2 | 2016–2016 | 6 | navneord: grundspil/pulje |
| U9 D 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| DMU-Hold U11 D 4 Spillere | 15. - 22. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U11 D 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U11 C 4 Spillere | 5. - 9. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U11 D 4 Spillere | 9. - 14. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U11 D 4 Piger | Bronzekamp 3. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U11 D 4 Piger | Finale | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U11 C 4 Spillere | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U11 D 4 Spillere | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U11 D 4 Spillere | Kvartfinaler | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U11 D 4 Piger | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 Dx 4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 4+3 | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 C 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 D 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 D 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 C 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 D 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 D 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 D 4 Spillere | Pulje 5 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 D 4 Spillere | Pulje 6 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U11 D 4 Spillere | Pulje 7 (C pi.) | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U11 4+3 | Pulje 111 MIDT-S&#216;N-FYN (BADMIDJ) | grundspil | 2 | 2016–2016 | 10 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 1111 MIDT-S&#216;N (DGI-VES) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 2111 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 2112 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 2113 MIDT(DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 3111 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 3112 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 3113 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 3114 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 3115 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 4111 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 4112 MIDT-S&#216;N (DGI -SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 5111 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 5112 MIDT-SYD (DGI SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 5114 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 6013 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 6111 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U9/U11 BEG. HOLD | Pulje 1 | grundspil | 2 | 2016–2016 | 6 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Jammerbugt | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| U11C -4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U11 -Begynder | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Slutspil U11 D (4) | Pulje 1 | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| U11 C (4) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U11 D (4) P2 | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U11 (4+3) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U11 A (4) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Holdturneringsdage for begyndere U11-Herlev | Pulje 1 | grundspil | 2 | 2016–2016 | 6 | navneord: grundspil/pulje |
| Holdturneringsdage for begyndere U11-Herlev | Pulje 2 | grundspil | 2 | 2016–2016 | 6 | navneord: grundspil/pulje |
| U11, 4+3 rækken | Finale | slutspil | 2 | 2016–2016 | 5 | navneord: slutspil |
| U11, 4+3 rækken | Pulje 1 | grundspil | 2 | 2016–2016 | 5 | navneord: grundspil/pulje |
| U11 C 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U11 D 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U11 D 4 spillere | Semifinale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U11 Dx 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U11 Dx 4 spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 4 | navneord: grundspil/pulje |
| DMU-Hold U13 4+3 | 10. - 11. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U13 A 4 Spillere | 3. - 4. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U13 4+3 | 4. - 6. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U13 A 4 Spillere | 5. - 6. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U13 B 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U13 A 4 Spillere | 7. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U13 4+3 | 7. - 9. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U13 B 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U13 C 4 Spillere | Finale (1. - 4. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 A 4 Spillere | Finale 1. - 2. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 4+3 | Finale 1. - 3. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 B 4 Spillere | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 D 4 Spillere | Mellemspil 1 (puljevindere) | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Mellemspil 2 (nr. i puljen) | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Mellemspil 3 (nr. 3 i puljen) | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 A 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 Dx 4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 M 4+2 | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 B 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 C 4 Piger | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 C 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 4+3 | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 4+3 | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 C 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 B 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 A 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 B 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 C 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 4+3 | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 C 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 B 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Pulje 5 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Pulje 6 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Pulje 7 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 D 4 Spillere | Pulje 8 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U13 C 4 Spillere | Slutspil (13. - 16. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 C 4 Spillere | Slutspil (5. - 8. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 C 4 Spillere | Slutspil (9. - 12. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 D 4 Spillere | Slutspil 1 - 1 (1. - 4. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 D 4 Spillere | Slutspil 1 - 2 (5. - 8. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 D 4 Spillere | Slutspil 2 - 1 (9. - 12. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 D 4 Spillere | Slutspil 2 - 2 (13. - 16. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 D 4 Spillere | Slutspil 3 - 1 (17. - 20. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U13 D 4 Spillere | Slutspil 3 - 2 (21. - 24. plads) | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| Nordjysk holdmesterskab U13 D | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U13 C 4 spillere | Jammerbugt | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| U13 4+3 | Pulje 131 JYLLAND-FYN (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 4+3 | Pulje 132 JYLLAND-FYN (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 4+3 | Pulje 133 JYLLAND-FYN SLUTSPIL A (BADMIDJ) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U13 4+3 | Pulje 134 JYLLAND-FYN SLUTSPIL B | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U13 C 4 spillere | Pulje 1131 MIDT-S&#216;N (DGI-VES) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1132 MIDT-S&#216;N (DGI-VES) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1133 MIDT-S&#216;N (DGI-VES) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 A 4 spillere | Pulje 135 MIDT-S&#216;N (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 2131 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 2132 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 2133 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 2134 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 2135 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 3131 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 3132 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 3133 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 3134 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 3135 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3136 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3137 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3138 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3139 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 3140 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 3140 SLUTSPIL A (DGI-&#216;ST) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U13 Dx 4 spillere | Pulje 3140 SLUTSPIL B (DGI-&#216;ST) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U13 B 4 spillere | Pulje 4131 MIDT-S&#216;N (DGI -SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 4131 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 4132 MIDT-S&#216;N (DGI -SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 4132 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 4133 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 5131 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 5132 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 5133 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 5134 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 6131 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 6132 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 4+2 M | Pulje 136 JYLLAND (BAD-MIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U13 BEG. HOLD | Pulje 1 | grundspil | 2 | 2016–2016 | 6 | navneord: grundspil/pulje |
| U13B -4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U13C + U15C -4 piger | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U13 -Begynder | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U13 C (4) P1 | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U13 D (4) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U13 A (4) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U13 C (4) P2 | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| slutspil U13 C (4) | Pulje 1 | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| Holdturneringsdage for begyndere U13-Herlev | Pulje 1 | grundspil | 2 | 2016–2016 | 6 | navneord: grundspil/pulje |
| U 13, 4+3 | Finale | slutspil | 2 | 2016–2016 | 5 | navneord: slutspil |
| U 13, 4+3 | Pulje 1 | grundspil | 2 | 2016–2016 | 5 | navneord: grundspil/pulje |
| U13 B 4+2 | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U13 B 4+2 | Pulje 1 | grundspil | 2 | 2016–2016 | 4 | navneord: grundspil/pulje |
| U13 A 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U13 A 4 spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 4 | navneord: grundspil/pulje |
| U13 B 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U13 C 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U13 C 4 spillere | Semifinale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U13 D 4 spillere | Semifinaler og Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U13 D piger | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U13 D piger | Pulje 1 | grundspil | 2 | 2016–2016 | 4 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U13 Dx 4 spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 4 | navneord: grundspil/pulje |
| DMU-Hold U15 B 4 Spillere | 13. - 15. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 C 4 Spillere | 13. - 16. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 D 4 Spillere | 13. - 17. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 D 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 C 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 B 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 4+3 | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 4+3 | 9. - 12. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 B 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 C 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 D 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U15 A 4 Spillere | Bronzekamp | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U15 A 4 Spillere | Finale | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U15 4+3 | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U15 D 4 Spillere | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U15 C 4 Spillere | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U15 B 4 Spillere | Finalerunde 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U15 D 4 Piger | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 A 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 A 4+2 | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 B 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 4+3 | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 C 4 Piger | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 C 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 D 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 D 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 C 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 4+3 | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 B 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 A 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 B 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 4+3 | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 C 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 D 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 D 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 C 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 4+3 | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 B 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Slutspil U15 4+3 | SLUTSPIL Pulje A | slutspil | 2 | 2016–2016 | 10 | navneord: slutspil |
| Slutspil U15 4+3 | SLUTSPIL Pulje B | slutspil | 2 | 2016–2016 | 10 | navneord: slutspil |
| U15 4+3 | Pulje 151 MIDT-SYD-NORD (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 M 4 spillere | Pulje 153 JYLLAND-FYN (BAD-MIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 1151 MIDT-S&#216;N (DGI-VES) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 1152 MIDT-S&#216;N (DGI-VES) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1154 MIDT-S&#216;N (DGI-VES) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 155 MIDT-S&#216;N-FYN (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 156 MIDT (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 2151 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 2152 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 2153 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 2154 MIDT-S&#216;N(DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 2155 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 3151 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 3152 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 3153 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 3154 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 3155 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 4151 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 4152 MIDT-S&#216;N SLUTSPIL B (DGI-SYV) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U15 C 4 spillere | Pulje 4153 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 4154 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 4155 MIDT-S&#216;N SLUTSPIL A (DGI-SYV) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U15 C 4 spillere | Pulje 4156 MIDT-S&#216;N SLUTSPIL B (DGI-SYV) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U15 D 4 spillere | Pulje 4157 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 4158 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 5151 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 5152 MIDT-S&#216;N SLUTSPIL A (DGI-SY&#216;) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U15 C 4 spillere | Pulje 5153 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 5154 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 5155 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 5156 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 6151 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 6153 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 6153 MIDT-S&#216;N SLUTSPIL A (DGI-S&#216;N) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U15 C 4 spillere | Pulje 6153 MIDT-S&#216;N SLUTSPIL B (DGI-S&#216;N) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U15 D 4 spillere | Pulje 6154 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 C/D 4 piger | Pulje 3156 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15 4+2 A | Pulje 154 MIDT-S&#216;N-FYN (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U15D -4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U15B -4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U15C -4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U15C -4 spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U15D -4 spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U15 A (4+2) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U15 A (4) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U15, 4+3 | Finale | slutspil | 2 | 2016–2016 | 5 | navneord: slutspil |
| U15, 4+3 | Pulje 1 | grundspil | 2 | 2016–2016 | 5 | navneord: grundspil/pulje |
| U15 B 4+2 | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U15 M 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U15 A 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U15 B 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U15 C 4 spillere | Semi- og finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U15 D 4 spillere | Semifinaler og finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U15 D 4 piger | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U15 Dx 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| DMU-Hold U17 4+3 | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17 4+3 | 9. - 11. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17 4+3 | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U17 4+3 | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17 4+3 | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17 4+3 | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17 4+3 | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U17 4+3 | Pulje 171 JYLLAND-FYN (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/19A 4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U17/19B -4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U17/19C -4 spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U17/U19 A (4+2) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U17/U19 B (4) P1 | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U17/U19 B (4) P2 | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U17/U19 C (4) | Pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U 17, 4+3 | Finale | slutspil | 2 | 2016–2016 | 5 | navneord: slutspil |
| U 17, 4+3 | Pulje 1 | grundspil | 2 | 2016–2016 | 5 | navneord: grundspil/pulje |
| &#216;M efterskoler B 4 spillere | Pulje B | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler C 4 spillere | Pulje C Finalerunde | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| &#216;M efterskoler C 4 spillere | Pulje C Placeringskampe | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler C 4 spillere | Pulje C-1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler C 4 spillere | Pulje C-2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler C 4 spillere | Pulje C-3 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler C 4 piger | Pulje C-piger | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler Cx 4 spillere | Finale | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| &#216;M efterskoler Cx 4 spillere | Pulje Cx-1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler Cx 4 spillere | Pulje Cx-2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler Dx 4 spillere | Finale | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| &#216;M efterskoler Dx 4 spillere | Pulje Dx-1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| &#216;M efterskoler Dx 4 spillere | Pulje Dx-2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DMU-Hold U17/19 B 4 Spillere | 13. - 14. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17/19 C 4 Spillere | 13. - 15. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17/19 M 4 Spillere | 3. - 4. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17/19 C 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17/19 B 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17/19 B 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17/19 C 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| DMU-Hold U17/19 A 4 Spillere | Bronzekamp | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U17/19 A 4 Spillere | Finale | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U17/19 M 4 Spillere | Finale | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U17/19 C 4 Spillere | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U17/19 B 4 Spillere | Finale 1. - 4. plads | slutspil | 2 | 2016–2016 | 2 | navneord: slutspil |
| DMU-Hold U17/19 M 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 A 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 A 4+2 | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 B 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 C 4 Spillere | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 C 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 B 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 A 4 Spillere | Pulje 2 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 B 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 C 4 Spillere | Pulje 3 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 C 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DMU-Hold U17/19 B 4 Spillere | Pulje 4 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 A | 4+2 A 5. - 6. plads | andet/ukendt | 2 | 2016–2016 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4+2 A | 4+2 A Bronzekamp | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 A | 4+2 A Finale | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 A | 4+2 A pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 A | 4+2 A pulje 2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 B | 4+2 B | andet/ukendt | 2 | 2016–2016 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4+2 C | 4+2 C Bronzekamp | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 C | 4+2 C Finale | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 C | 4+2 C pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 C | 4+2 C pulje 2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER A 4 spillere | 4 spillere A | andet/ukendt | 2 | 2016–2016 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER B 4 spillere | 4 spillere B pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER B 4 spillere | 4 spillere B pulje 2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER B 4 spillere | 5. - 6. plads 4 spillere B | andet/ukendt | 2 | 2016–2016 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER B 4 spillere | Bronzekamp 4 spillere B | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER B 4 spillere | Finale 4 spillere B | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER C 4 spillere | 4 spillere C 5. - 6. plads | andet/ukendt | 2 | 2016–2016 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER C 4 spillere | 4 spillere C 8. - 9. plads | andet/ukendt | 2 | 2016–2016 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER C 4 spillere | 4 spillere C Finalerunde | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER C 4 spillere | 4 spillere C pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER C 4 spillere | 4 spillere C pulje 2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER C 4 spillere | 4 spillere C pulje 3 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER Cx 4 spillere | 4 spillere Cx 5. - 6. plads | andet/ukendt | 2 | 2016–2016 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER Cx 4 spillere | 4 spillere Cx Bronzekamp | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER Cx 4 spillere | 4 spillere Cx Finale | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| DM EFTERSKOLER Cx 4 spillere | 4 spillere Cx pulje 1 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER Cx 4 spillere | 4 spillere Cx pulje 2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER C 4 piger | 4 piger C | andet/ukendt | 2 | 2016–2016 | 1 | ingen sikker nøgle |
| EFTERSKOLER U17/U19 B 4 spillere | Pulje B 4 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 C 4 spillere | Pulje C 4 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 Cx 4 spillere | Pulje Cx 4 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 4+2 A | Pulje A 4+2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 4+2 A | Pulje A 4+2 SLUTSPIL A | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| EFTERSKOLER U17/U19 4+2 A | Pulje A 4+2 SLUTSPIL B | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| EFTERSKOLER U17/U19 4+2 B | Pulje B 4+2 | grundspil | 2 | 2016–2016 | 1 | navneord: grundspil/pulje |
| U17/U19 M 4 spillere | Pulje 175 MIDT-S&#216;N (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 1171 MIDT-S&#216;N (DGI-VES) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 173 MIDT-S&#216;N (BADMIDJ) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 174 | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 2171 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 2172 MIDT-S&#216;N (DGI-MID) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 2173 MIDT-S&#216;N SLUTSPIL A (DGI-MID) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U17/U19 C 4 spillere | Pulje 2174 MIDT-S&#216;N SLUTSPIL B (DGI-MID) | slutspil | 2 | 2016–2016 | 8 | navneord: slutspil |
| U17/U19 B 4 spillere | Pulje 3171 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 3172 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 3173 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 Cx 4 spillere | Pulje 3174 MIDT-S&#216;N (DGI-&#216;ST) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 4171 MIDT-S&#216;N (DGI-SYV) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 5171 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 5172 MIDT-S&#216;N (DGI-SY&#216;) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 6171 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 6171 MIDT-S&#216;N (DGI-S&#216;N) | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| U17/U19 4+2 A | Pulje 172 | grundspil | 2 | 2016–2016 | 8 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U17/U19 C | Pulje 1 | grundspil | 2 | 2016–2016 | 2 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Jammerbugt | andet/ukendt | 2 | 2016–2016 | 2 | ingen sikker nøgle |
| Slutspil U17/U19 B (4) | Pulje 1 | slutspil | 2 | 2016–2016 | 1 | navneord: slutspil |
| U17/U19 M 4 spillere | Finale | slutspil | 2 | 2016–2016 | 5 | navneord: slutspil |
| U17/U19 A 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U17/U19 B 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U17/U19 C 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| U17/U19 Cx 4 spillere | Finale | slutspil | 2 | 2016–2016 | 4 | navneord: slutspil |
| Danmarksserien | Kvalifikation til 3. division pulje A Vest | andet/ukendt | 2 | 2016–2017 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje A &#216;st | andet/ukendt | 2 | 2016–2017 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje B Vest | andet/ukendt | 2 | 2016–2017 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje B &#216;st | andet/ukendt | 2 | 2016–2017 | 1 | kvalifikation uden retning |
| Danmarksserien | Nedrykning fra Danmarksserien Vest pulje A | nedrykningsspil | 2 | 2016–2017 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien Vest pulje B | nedrykningsspil | 2 | 2016–2017 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien &#216;st pulje A | nedrykningsspil | 2 | 2016–2017 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien &#216;st pulje B | nedrykningsspil | 2 | 2016–2017 | 1 | navneord: nedrykning |
| Kvalifikation til DS Vest (runde 12) | Kvalifikationsevent kamp 13 | andet/ukendt | 2 | 2016–2017 | 4 | kvalifikation uden retning |
| Kvalifikation til DS Vest (runde 12) | Kvalifikationsevent kamp 14 | andet/ukendt | 2 | 2016–2017 | 4 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest (runde 12) | Kvalifikationsevent kamp 15 | andet/ukendt | 2 | 2016–2017 | 5 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest (runde 12) | Kvalifikationsevent kamp 16 | andet/ukendt | 2 | 2016–2017 | 5 | kvalifikation uden retning |
| 4 spillere single B | Pulje 1 | grundspil | 2 | 2016–2017 | 1 | navneord: grundspil/pulje |
| LF-Serien - Slutspil | Nedrykning | nedrykningsspil | 2 | 2016–2017 | 1 | navneord: nedrykning |
| LF-Serien - Slutspil | Oprykning | oprykningsspil | 2 | 2016–2017 | 1 | navneord: oprykning |
| 40+ VET 4+2 M | Pulje 1 | grundspil | 2 | 2016–2017 | 2 | navneord: grundspil/pulje |
| Motion 4 herrer uden singler | Pulje 1 | grundspil | 2 | 2016–2017 | 2 | navneord: grundspil/pulje |
| Motion - 4 + 2 | Pulje 1 | grundspil | 2 | 2016–2017 | 1 | navneord: grundspil/pulje |
| 50+ 4H - Serie 1 (A) | Pulje 1 | grundspil | 2 | 2016–2017 | 1 | navneord: grundspil/pulje |
| DMU Hold U9 D 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U9 D 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U9 D 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U9 D 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 3091 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 4091 (DGI-SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 6091 (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U9D 4 spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U9 D 4 spillere | Finale SM for Hold U9 | slutspil | 2 | 2017–2017 | 4 | navneord: slutspil |
| DMU Hold U11 B 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U11 B 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U11 B 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 B 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 C 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | 13. - 18. plads (3'ere i puljen) | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | 19. - 21. plads (4'ere i puljen) | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | 5. - 6. plads (tabere af kvartfinaler) | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U11 Dx 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U11 D 4 Spillere | 7. - 12. plads (2'ere i puljerne) | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 Dx 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U11 D 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U11 D 4 Spillere | Kvartfinaler puljevindere | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U11 Dx 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 Dx 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | Pulje 5 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Spillere | Pulje 6 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U11 B 4 spillere | Pulje 3111 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 2111 (DGI-MID) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 4111 (DGI-SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 1111 (DGI-VES) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 2112 (DGI-MID) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 3112 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 3113 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 3114 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 4111 (DGI -SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 4112 (DGI -SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 4113 SLUTSPIL A (DGI-SY&#216;) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U11 D 4 spillere | Pulje 4113 SLUTSPIL B (DGI-SY&#216;) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U11 D 4 spillere | Pulje 5111 (DGI-SY&#216;) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 6111 (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 3115 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 3116 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 3116 SLUTSPIL A (DGI-&#216;ST) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U11 Dx 4 spillere | Pulje 3116 SLUTSPIL B (DGI-&#216;ST) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U11 Dx 4 spillere | Pulje 5112 (DGI-SY&#216;) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 Dx 4 spillere | Pulje 6112 (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U11 6+4 | Pulje 1 | grundspil | 2 | 2017–2017 | 9 | navneord: grundspil/pulje |
| U11 X (Begynder) | Pulje U11 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U11 X (Begynder) | U11 Slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| Dx 4 spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U11B -4 spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U11D -4 piger | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U11D -4 spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| Kredsmatch BADKBH-BADSJ&#198; U11 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U11 4+2 | Finale SM for hold U11A 4+2 | slutspil | 2 | 2017–2017 | 5 | navneord: slutspil |
| U11 D (4) P2 | Pulje 2 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U11 D (4) P3 | Pulje 3 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| Slutkampe SM for hold | Slutkampe | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| Begynderholdturnering U11 | Begynderhold | andet/ukendt | 2 | 2017–2017 | 3 | ingen sikker nøgle |
| DMU Hold 4+3 | 4. - 6. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold 4+3 | 7. - 9. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold 4+3 | Finalepulje | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold 4+3 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold 4+3 | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold 4+3 | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold M/A 4+2 | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold M/A 4+2 | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold M/A 4+2 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold M 4 Spillere | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold M 4 Spillere | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold M 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold C 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold C 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold C 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold C 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold C 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold C 4 Spillere | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold C 4 Spillere | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | 13. - 18. plads (3'ere i puljen) | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | 19. - 24. plads (4'ere i puljen) | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | 5. - 6. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold D 4 Spillere | 7. - 12. plads (2'ere i puljerne) | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold D 4 Spillere | Kvartfinaler puljevindere | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold D 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | Pulje 5 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Spillere | Pulje 6 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold Dx 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold Dx 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold Dx 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold Dx 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold C 4 Piger | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold D 4 Piger | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U13 4+3 | Pulje 0131 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 4+3 | Pulje 0132 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| SLUTSPIL U13 4+3 | Slutspil Pulje 0131A | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| SLUTSPIL U13 4+3 | Slutspil Pulje 0132B | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U13 A 4 spillere | Pulje 0133 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 A 4 spillere | Pulje 0134 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 3131 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 3131 A (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 3131 B (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 5131 (DGI-SY&#216;) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 1131 (DGI-VES) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 2131 (DGI-MID) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 2134 SLUTSPIL A (DGI-MID) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U13 C 4 spillere | Pulje 2134 SLUTSPIL B (DGI-MID) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U13 C 4 spillere | Pulje 3132 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 3133 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 4135 (DGI -SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 6131 (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1132 (DGI-VES) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1133 (DGI-VES) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 2132 (DGI-MID) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3135 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3136 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3137 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 3138 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 4132 (DGI -SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 5132 (DGI-SY&#216;) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 5133 (DGI-SY&#216;) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 5134 (DGI-SY&#216;) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 6133 (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 6133 SLUTSPIL A (DGI-S&#216;N) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U13 D 4 spillere | Pulje 6133 SLUTSPIL B (DGI-S&#216;N) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U13 Dx 4 spillere | Pulje 2133 (DGI-MID) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 3139 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 3140 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 5135 (DGI-SY&#216;) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 5136 (DGI-SY&#216;) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 Dx 4 spillere | Pulje 5137 SLUTSPIL A (DGI-SY&#216;) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U13 Dx 4 spillere | Pulje 5137 SLUTSPIL B (DGI-SY&#216;) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U13 Dx 4 spillere | Pulje 6134 (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 C 4 piger | Pulje 3134 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U13 D 4 piger | Pulje 3141 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| D 4 spillere | Pulje 6 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U3D -4 piger | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U13C -4 spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U13D -4 spillere | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U13 X (Begynder) | Pulje U13 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| Kredsmatch BADKBH-BADSJ&#198; U13 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U13 4+3 | Finale SM for hold U13 4+3 | slutspil | 2 | 2017–2017 | 5 | navneord: slutspil |
| U13 C (4) | Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U13 D (4) P1 | Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U13 D (4 piger) | Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U13 D (4) P2 | Pulje 2 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U13 D (4) P3 | Pulje 3 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U13 M/A 4+2 | Pulje 1 | grundspil | 2 | 2017–2017 | 5 | navneord: grundspil/pulje |
| Slutkampe SM for hold | Slutkampe SM for hold | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| U13 C 4 piger | Pulje 1 | grundspil | 2 | 2017–2017 | 4 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 5 | grundspil | 2 | 2017–2017 | 4 | navneord: grundspil/pulje |
| DMU Hold U15 4+3 | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 4+3 | 9. - 11. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 4+3 | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 4+3 | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 4+3 | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 M/A 4+2 | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 M/A 4+2 | 5. - 6. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 M/A 4+2 | 7. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 M/A 4+2 | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 M/A 4+2 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 M/A 4+2 | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4+2 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU-Hold U15 M 4 Spillere | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU-Hold U15 M 4 Spillere | 5. - 6. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU-Hold U15 M 4 Spillere | 7. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU-Hold U15 M 4 Spillere | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU-Hold U15 M 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 A 4 Spillere | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 A 4 Spillere | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 A 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 A 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4 Spillere | 13. - 15. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 B 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 B 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 B 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 B 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4 Spillere | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4 Spillere | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Spillere | 13. - 18. plads (3'ere i puljen) | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Spillere | 5. - 6. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 C 4 Spillere | 7. - 12. plads (2'ere i puljen) | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 C 4 Spillere | Kvartfinaler puljevindere | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 C 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Spillere | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Spillere | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Spillere | Pulje 5 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Spillere | Pulje 6 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Spillere | 17. - 24. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 D 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 D 4 Spillere | 9. - 16. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 D 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 D 4 Spillere | Kvartfinaler puljevindere | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 D 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Spillere | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Spillere | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Spillere | Pulje 5 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Spillere | Pulje 6 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Spillere | Pulje 7 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Spillere | Pulje 8 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Piger | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 C 4 Piger | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 D 4 Piger | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U15 D 4 Piger | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U15 D 4 Piger | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Piger | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U15 4+3 | Pulje 0151 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| SLUTSPIL U15M/A U17/19B 4+2 | Slutspil pulje 0152A | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| SLUTSPIL U15M/A U17/19B 4+2 | Slutspil Pulje 0153B | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U15 M/A 4+2-U17/19 B 4+2 | Pulje 0152 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 M/A 4+2-U17/19 B 4+2 | Pulje 0153 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 B 4+2 | Pulje 0154 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 M 4 spillere | Pulje 0155 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 M 4 spillere | Pulje 0156 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 0157 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 0158 (BADMIDJ) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 2151 U15B 4 sp.(DGI Midt) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 2152 U15B slutspil 1(DGI Midt) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U15 B 4 spillere | Pulje 2153 U15B slutspil 2(DGI Midt) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U15 B 4 spillere | Pulje 3151 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 3151 A (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 3151 B (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 5151 U15B 4 sp (DGI Sydøst) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 6151 U15B 4 spillere (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 1151 MIDT C4 (DGI Vest) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 2154 U15C 4 sp. (DGI Midt) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 3152 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 3153 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 4155 MIDT (DGI -SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 5152 U15C 4 sp (DGI Sydøst) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 5153 U15C 4 sp (DGI Sydøst) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 5154 U15C slutspil A (DGI Sydøst) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U15 C 4 spillere | Pulje 5155 U15C slutspil B (DGI Sydøst) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U15 C 4 spillere | Pulje 6152 U15C 4 spillere ( DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1152 MIDT D4 (DGI Vest) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 2155 U15D 4 sp. (DGI Midt) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 2156 U15D slutspil 1(DGI Midt) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U15 D 4 spillere | Pulje 2157 U15D slutspil 2(DGI Midt) | slutspil | 2 | 2017–2017 | 8 | navneord: slutspil |
| U15 D 4 spillere | Pulje 3154 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 3155 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 3156 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 4151 MIDT (DGI -SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 4152 MIDT (DGI -SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 5156 U15D 4 sp (DGI Sydøst) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 5157 U15D 4 sp (DGI Sydøst) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 6153 U15 D 4 spillere (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 6154 U15D 4 spillere (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 Dx 4 spillere | Pulje 5155 U15Dx 4 sp (DGI Sydøst) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U15 D 4 piger | Pulje 3157 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| A 4 spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| B 4 spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| C 4 spillere | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U15D 4 piger | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| Kredsmatch BADKBH-BADSJ&#198; U15 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U15 4+3 | Finale SM for hold | slutspil | 2 | 2017–2017 | 5 | navneord: slutspil |
| U15 D (4 piger) | Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U15 M/A 4+2 | Finale SM for hold | slutspil | 2 | 2017–2017 | 5 | navneord: slutspil |
| U15 M/A 4+2 | Pulje 1 | grundspil | 2 | 2017–2017 | 5 | navneord: grundspil/pulje |
| U15 B 4+2 | Finale SM for hold | slutspil | 2 | 2017–2017 | 5 | navneord: slutspil |
| Slutkampe SM for hold U15 | Slutkampe SM for hold | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| DMU Hold U17 4+3 | Bronzekamp | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| U17 4+3 | Pulje 0171 | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17 4+3 | Finale SM for Hold U17 4+3 | slutspil | 2 | 2017–2017 | 5 | navneord: slutspil |
| DMU-Hold M/A 4+2 | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU-Hold M/A 4+2 | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU-Hold M/A 4+2 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU-Hold M/A 4+2 | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU-Hold M 4 Spillere | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU-Hold M 4 Spillere | 5. - 6. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU-Hold M 4 Spillere | 7. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU-Hold M 4 Spillere | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU-Hold M 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU-Hold M 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19 C 4 Spillere | 13. - 14. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold B 4 Spillere | 13. - 14. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19 Cx 4 spillere | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19 C 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19 C 4 Spillere | 9. - 12. plads | andet/ukendt | 2 | 2017–2017 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19 Cx 4 spillere | Finale | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U17/U19 C 4 Spillere | Finale slutspil | slutspil | 2 | 2017–2017 | 2 | navneord: slutspil |
| DMU Hold U17/U19 Cx 4 spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19 C 4 Spillere | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19 C 4 Spillere | Pulje 2 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19 C 4 Spillere | Pulje 3 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19 C 4 Spillere | Pulje 4 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 M | 4+2 M | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4+2 A/B | 4+2 A Finale | slutspil | 2 | 2017–2017 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 A/B | 4+2 B bronzekamp | slutspil | 2 | 2017–2017 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 A/B | 4+2 B Finale | slutspil | 2 | 2017–2017 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4+2 A/B | Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 A/B | Pulje 2 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4+2 C | 4+2 C | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4 Spillere B | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4 Spillere C | 3. - 4. plads | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4 Spillere A | 4A | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| DM EFTERSKOLER 4 Spillere B | 4B pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere B | 4B Pulje 2 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere C | 4C Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere C | 4C Pulje 2 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere C | Finale | slutspil | 2 | 2017–2017 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4 Spillere Cx | 4 Cx Pulje 3 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere Cx | 4Cx Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere Cx | 4Cx Pulje 2 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere Cx | Finale slutspil | slutspil | 2 | 2017–2017 | 1 | navneord: slutspil |
| DM EFTERSKOLER 4 Piger C | 4C piger | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| EFTERSKOLER 4+2 M/A | EFTERSKOLER 4+2 M/A | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| EFTERSKOLER A 4 Spillerre | EFTERSKOLER 4A | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| EFTERSKOLER B 4 Spillere | EFTERSKOLER 4B | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| EFTERSKOLER C 4 Spillere | EFTERSKOLER 4C | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| EFTERSKOLER Cx 4 Spillere | EFTERSKOLER 4Cx | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| Nordjysk holdmesterskab U17/U19C | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| U17/U19 M/A 4+2 | Pulje 0172 | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 M/A 4+2 | Pulje 0173 | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 M 4 spillere | Pulje 0174 | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 M 4 spillere | Pulje 0175 | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 0176 | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 A 4 spillere | Pulje 0177 | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 3171 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 3172 (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 B 4 spillere | Pulje 6171 U17/19B 4 spillere (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 1171 MIDT C4 (DGI Vest) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 2171 U17/19C 4 sp. (DGI Midt) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 3173 (DGI &#216;st) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 3173A (DGI-&#216;ST) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 3173B | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 4175 MIDT (DGI -SYV) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 5171 U17/19C 4 sp (DGI Sydøst) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 5172 U17/19C 4 sp (DGI Sydøst) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 C 4 spillere | Pulje 6172 U17/19C 4 spillere (DGI-S&#216;N) | grundspil | 2 | 2017–2017 | 8 | navneord: grundspil/pulje |
| U17/U19 M/A 4+2 | Finale SM for hold | slutspil | 2 | 2017–2017 | 5 | navneord: slutspil |
| U17/19 C (4) | Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U17/19 B (4) | Pulje 1 | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| U17/U19 M/A 4+2 | Pulje 1 | grundspil | 2 | 2017–2017 | 5 | navneord: grundspil/pulje |
| Slutkampe SM for hold U17/19 | Finaler SM for hold U17/19 | slutspil | 2 | 2017–2017 | 1 | navneord: slutspil |
| &#216;M EFTERSK. 4 B | Pulje 4 B | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. 4 C | Finalerunde | slutspil | 2 | 2017–2017 | 1 | navneord: slutspil |
| &#216;M EFTSK. 4 C | Pulje 1 - 4 C | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. 4 C | Pulje 2 - 4 C | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. 4 Cx / X | Finalerunde - 4 Cx/X | slutspil | 2 | 2017–2017 | 1 | navneord: slutspil |
| &#216;M EFTSK. 4 Cx / X | Placeringskampe - 4 Cx/X | andet/ukendt | 2 | 2017–2017 | 1 | ingen sikker nøgle |
| &#216;M EFTSK. 4 Cx / X | Pulje 1 - 4 Cx/X | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. 4 Cx / X | Pulje 2 - 4 Cx/X | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. 4 Cx / X | Pulje 3 - 4 Cx/X | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. 4 Cx / X | Pulje 4 - 4 Cx/X | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| &#216;M EFTSK. 4 C piger | Pulje 4 C piger | grundspil | 2 | 2017–2017 | 1 | navneord: grundspil/pulje |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 10 | andet/ukendt | 2 | 2017–2018 | 1 | kvalifikation uden retning |
| Kredsserie Vest | Kvalifikation til Danmarksserien Vest Pulje 1 | andet/ukendt | 2 | 2017–2018 | 4 | kvalifikation uden retning |
| Kredsserie Vest | Kvalifikation til Danmarksserien Vest Pulje 2 | andet/ukendt | 2 | 2017–2018 | 4 | kvalifikation uden retning |
| Kredsserie Vest | Nedrykningsspil fra Kredsserien Vest Pulje 1 | nedrykningsspil | 2 | 2017–2018 | 4 | navneord: nedrykning |
| Kredsserie Vest | Nedrykningsspil fra Kredsserien Vest Pulje 2 | nedrykningsspil | 2 | 2017–2018 | 4 | navneord: nedrykning |
| Serie 1 Vest | Kvalifikation til Kredsserien Vest Pulje 1 | andet/ukendt | 2 | 2017–2018 | 4 | kvalifikation uden retning |
| Serie 1 Vest | Kvalifikation til Kredsserien Vest Pulje 2 | andet/ukendt | 2 | 2017–2018 | 4 | kvalifikation uden retning |
| Serie 1 Vest | Kvalifikation til Kredsserien Vest Pulje 3 | andet/ukendt | 2 | 2017–2018 | 4 | kvalifikation uden retning |
| Serie 1 Vest | Kvalifikation til Kredsserien Vest Pulje 4 | andet/ukendt | 2 | 2017–2018 | 4 | kvalifikation uden retning |
| Serie 1 Vest | Nedrykningsspil fra serie 1 Pulje 1 | nedrykningsspil | 2 | 2017–2018 | 4 | navneord: nedrykning |
| Serie 1 Vest | Nedrykningsspil fra serie 1 Pulje 2 | nedrykningsspil | 2 | 2017–2018 | 4 | navneord: nedrykning |
| Serie 1 Vest | Nedrykningsspil fra serie 1 Pulje 3 | nedrykningsspil | 2 | 2017–2018 | 4 | navneord: nedrykning |
| Serie 1 Vest | Nedrykningsspil fra serie 1 Pulje 4 | nedrykningsspil | 2 | 2017–2018 | 4 | navneord: nedrykning |
| 4 spillere single A | Pulje 1 | grundspil | 2 | 2017–2018 | 1 | navneord: grundspil/pulje |
| 4 spillere double A | Pulje 1 | grundspil | 2 | 2017–2018 | 1 | navneord: grundspil/pulje |
| 4 spillere double B | Pulje 1 | grundspil | 2 | 2017–2018 | 1 | navneord: grundspil/pulje |
| Seniorholdturneringsdag A-række | Pulje 1 | grundspil | 2 | 2017–2018 | 1 | navneord: grundspil/pulje |
| Seniorholdturneringsdag B-række | Pulje 1 | grundspil | 2 | 2017–2018 | 1 | navneord: grundspil/pulje |
| DM-Hold Veteran 4+2 | Pulje 1 | grundspil | 2 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 4 Herrer A-rækken | Pulje 1 | grundspil | 2 | 2017–2017 | 4 | navneord: grundspil/pulje |
| 4+2 Eliterække | Pulje 1 | grundspil | 2 | 2017–2018 | 4 | navneord: grundspil/pulje |
| 2+2 B DOUBLE - 6 kampe | Pulje 311 ( 2+2 A-B DGI-&#216;st ) | grundspil | 2 | 2017–2018 | 8 | navneord: grundspil/pulje |
| DMU Hold U9 D 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U9 D 4 Sp. | Finale slutspil | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U9 D 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U9 D 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 091 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U9 D 4 spillere | Pulje 092 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U9 C 4 spillere | U9C/D 4 spillere pulje 6091 (DGI S&#216;N) | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U09 Begynderturnering | Pulje 1 | grundspil | 2 | 2018–2018 | 3 | navneord: grundspil/pulje |
| U9 Begynderrække | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U9 D 4 spillere | SM finale for U9 | slutspil | 2 | 2018–2018 | 4 | navneord: slutspil |
| DMU Hold U11 4+2 | Finale slutspil | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U11 B 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U11 B 4 Sp. | Finale slutspil | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U11 B 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 B 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 C 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U11 C 4 Sp. | Finale slutspil 1. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U11 C 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 C 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 CD 4 Sp. | Bronzekamp 3. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U11 CD 4 Sp. | Finale | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U11 CD 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 CD 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Sp. | 16. - 22. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U11 D 4 Sp. | 23. - 29 plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U11 D 4 Sp. | 5. - 7. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U11 D 4 Sp. | 8. - 15. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U11 D 4 Sp. | Kvartfinaler puljevindere | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U11 D 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Sp. | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Sp. | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Sp. | Pulje 5 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Sp. | Pulje 6 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 D 4 Sp. | Pulje 7 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U11 CD 4 Piger | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U11 4+2 | Pulje 111 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 1110 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 1111 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 1112 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 1113 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 112 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 113 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 C 4 spillere | Pulje 114 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 CD 4 spillere | Pulje 115 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 116 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 117 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 118 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | Pulje 119 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 C 4 spillere | U11C/CD 4 spillere pulje 6111 (DGI S&#216;N) | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 D 4 spillere | U11D 4 spillere pulje 6112 (DGI S&#216;N) | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U11 CD 4 spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U11CD -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U11D -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U11D -4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U11CD -4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| Kredsmatch BADKBH-BADSJ U11 | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U11 D 4 Spillere P1 | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U11 D 4 Spillere P2 | Pulje 2 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U11 D 4 Spillere P3 | Pulje 3 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U11 D 4 Spillere P4 | Pulje 4 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U11 CD 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U11 CD 4 Piger | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| SM for hold finalekampe U11 | Finalekampe SM U11 | slutspil | 2 | 2018–2018 | 1 | navneord: slutspil |
| Slutkampe SM for Hold | Slutkampe SM for hold U11 | andet/ukendt | 2 | 2018–2018 | 1 | ingen sikker nøgle |
| Slutkampe SM for Hold 4+2 | SM finale for U11 4+2 | slutspil | 2 | 2018–2018 | 1 | navneord: slutspil |
| U11 C 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U11 D 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U11 D 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U11 D 4 Spillere | Pulje 3 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U11 D 4 Spillere | Pulje 4 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U11 D 4 Spillere | Pulje 5 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| DMU Hold U13 4+3 | 5. - 7. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 4+3 | Finale slutspil 1. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U13 4+3 | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 4+3 | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 A 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 A 4 Sp. | Finale slutspil 1. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U13 A 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 A 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 B 4 Sp. | 3. - 4. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 B 4 Sp. | 5. - 6. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 B 4 Sp. | 7. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 B 4 Sp. | 9. - 10. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 B 4 Sp. | Finale | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U13 B 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 B 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 C 4 Sp. | Bronzekamp 3. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U13 C 4 Sp. | Finale | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U13 C 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 C 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 CD 4 Sp. | 13. - 16. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 CD 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 CD 4 Sp. | 9. - 12. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 CD 4 Sp. | Finale slutspil 1. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U13 CD 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 CD 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 CD 4 Sp. | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 CD 4 Sp. | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 D 4 Sp. | 15. - 21. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 D 4 Sp. | 22. -28. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 D 4 Sp. | 5. - 7. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 D 4 Sp. | 8. - 14. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U13 D 4 Sp. | Kvartfinaler puljevindere | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U13 D 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 D 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 D 4 Sp. | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 D 4 Sp. | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 D 4 Sp. | Pulje 5 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 D 4 Sp. | Pulje 6 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 D 4 Sp. | Pulje 7 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 C/CD 4 Piger | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13 4+3 | Pulje 131 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 CD 4 spillere | Pulje 1310 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 CD 4 spillere | Pulje 1311 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 CD 4 spillere | Pulje 1312 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 CD 4 spillere | Pulje 1313 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 CD 4 spillere | Pulje 1314 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1315 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1316 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1317 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1318 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1319 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 132 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1320 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1321 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1322 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | Pulje 1323 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 M 4 spillere | Pulje 1325 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 B 4 spillere | Pulje 133 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 134 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 135 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 136 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 C 4 spillere | Pulje 137 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 C 4 Piger | Pulje 138 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 CD 4 spillere | Pulje 139 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 C 4 spillere | U13C/U13CD/U11B 4 spillere pulje 6131 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | U13D 4 spillere pulje 6133 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 D 4 spillere | U13D 4 spillere/U13CD 4 piger/U13C 4 piger pulje 6132 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U13 CD 4 spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13 CD 4 spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U13CD | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13 Begynderturnering | Pulje 1 | grundspil | 2 | 2018–2018 | 3 | navneord: grundspil/pulje |
| U13B -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13C -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13CD -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13D -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13D -4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13D -4 Spillere | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| Kredsmatch BADKBH-BADSJ U13 | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U13 D 4 Spillere P3 | Pulje 3 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U13 D 4 Spillere P1 | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U13 D 4 Spillere P2 | Pulje 2 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U13 4+3 | SM finale for U13 4+3 | slutspil | 2 | 2018–2018 | 5 | navneord: slutspil |
| U13 A 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U13 A 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| Slutkampe SM for Hold | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| SM for Hold finalekampe U13 | SM for Hold finalekampe U13 | slutspil | 2 | 2018–2018 | 1 | navneord: slutspil |
| U13 B 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 C 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 CD 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 CD 4 Spillere | Pulje 3 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 D 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 D 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 D 4 Spillere | Pulje 3 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 D 4 Spillere | Pulje 4 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 D 4 Spillere | Pulje 5 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U13 CD 4 Piger | Pulje 1 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| DMU Hold U15 4+3 | 5. - 6. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 4+3 | 7. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 4+3 | Bronzekamp 3. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 4+3 | Finale | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 MA 4+2 | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 AB 4+2 | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 M 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 A 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 A 4 Sp. | Finale slutspil 1. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 A 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 A 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 B 4 Sp. | 7. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 B 4 Sp. | 9. - 12. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 B 4 Sp. | Finale slutspil | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 B 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4 Sp. | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 B 4 Sp. | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Sp. (NY PLAN) | 11. - 12 plads (tabere i kvartfinale NY) | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 C 4 Sp. (NY PLAN) | 17. - 20. plads NY | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 C 4 Sp. (NY PLAN) | 5. - 6. plads (tabere i kvartfinale- NY) | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Kvartfinaler (2'ere i puljen) | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Kvartfinaler (3'ere i puljen) | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Pulje 5 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Pulje 6 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 C 4 Sp. (NY PLAN) | Slutspil puljevindere 1. - 6. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 CD 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 CD 4 Sp. | 9. - 13. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 CD 4 Sp. | Finale slutspil 1. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 CD 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 CD 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 CD 4 Sp. | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 CD 4 Sp. | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Sp. (NY PLAN) | 11. - 12. plads (tabere kvart 2'ere NY) | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 D 4 Sp. (NY PLAN) | 13. - 18. plads (3'ere i puljerne) | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Sp. (NY PLAN) | 17. - 20. plads NY | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U15 D 4 Sp. (NY PLAN) | 5. - 6. plads (tabere kvartfinale NY) | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 D 4 Sp. (NY PLAN) | 7. - 12. plads (2'ere i puljerne) | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Sp. (NY PLAN) | Finale slutspil puljevindere 1. - 6. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U15 D 4 Sp. (NY PLAN) | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Sp. (NY PLAN) | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Sp. (NY PLAN) | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Sp. (NY PLAN) | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Sp. (NY PLAN) | Pulje 5 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 D 4 Sp. (NY PLAN) | Pulje 6 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 CD 4 Piger | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| Nordjysk holdmesterskab U15CD | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15 4+3 | Pulje 151 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 1510 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 1511 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 1512 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 1513 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 C 4 Piger | Pulje 1514 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 CD 4 Piger | Pulje 1515 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 1516 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 1517 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 1518 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 1519 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 MA 4+2 | Pulje 152 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 CD 4 spillere | Pulje 1520 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1521 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1522 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1523 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1524 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1525 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1526 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 D 4 spillere | Pulje 1527 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 AB 4+2 | Pulje 153 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 154 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 A 4 spillere | Pulje 155 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 156 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 157 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 B 4 spillere | Pulje 158 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 C 4 spillere | Pulje 159 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 B 4 spillere | U15B/U13A 4 spillere Pulje 6151 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 C 4 spillere | U15C/U13B 4 spillere Pulje 6152 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 CD 4 spillere | U15CD 4 spillere pulje 6153 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 D 4 spillere | U15D 4 spillere pulje 6154 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15 M 4 spillere | U15M-U17/19A 4 pulje 1528 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U15C -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15CD -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15B -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15M -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15D -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15D -4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| Kredsmatch BADKBH-BADSJ U15 | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U15 D 4 Spillere P1 | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U15 D 4 Spillere P2 | Pulje 2 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U15 4+3 | SM finale for U15 4+3 | slutspil | 2 | 2018–2018 | 5 | navneord: slutspil |
| U15 MA 4+2 | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U15 AB 4+2 | Finale SM for hold | slutspil | 2 | 2018–2018 | 5 | navneord: slutspil |
| U15 AB 4+2 | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U15 M 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U15 A 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U15 A 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U15 A 4 Spillere | Pulje 3 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| SM for hold finalekampe U15 | SM finalekampe U15 | slutspil | 2 | 2018–2018 | 1 | navneord: slutspil |
| SM for hold finalekampe U15 4+2 | SM finalekampe U15 4+2 | slutspil | 2 | 2018–2018 | 1 | navneord: slutspil |
| SM for hold U15 4 sp | SM for hold | andet/ukendt | 2 | 2018–2018 | 1 | ingen sikker nøgle |
| U15 B 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 C 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 C 4 Spillere | Pulje 3 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 CD 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 D 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 D 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 D 4 Spillere | Pulje 3 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 D 4 Spillere | Pulje 4 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 D 4 Spillere | Pulje 5 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 D 4 Spillere | Pulje 6 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 CD 4 Piger | Pulje 1 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U15 CD 4 Piger | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| DMU Hold U17 4+3 | Bronzekamp 3. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| U17 4+3 | Pulje 171 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17 4+3 | SM for hold U 17 4+3 | andet/ukendt | 2 | 2018–2018 | 5 | ingen sikker nøgle |
| DM EFTERSKOLER 4 + 2 Elite | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 + 2 Mester | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 + 2 B | Bronzekamp | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DM EFTERSKOLER 4 + 2 B | Finale | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DM EFTERSKOLER 4 + 2 C | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 + 2 A | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 + 2 B | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 + 2 B | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere A | 5. - 6. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DM EFTERSKOLER 4 Spillere A | Bronzekamp | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DM EFTERSKOLER 4 Spillere B | Bronzekamp | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DM EFTERSKOLER 4 Spillere A | Finale | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DM EFTERSKOLER 4 Spillere C | Finale slutspil | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DM EFTERSKOLER 4 Spillere C | Placeringskampe pulje 2 og 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere D | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere B | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere C | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere A | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere A | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere C | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere B | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Spillere C | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM EFTERSKOLER 4 Piger D | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 MA 4+2 | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 M 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 A 4 Sp. | Bronzekamp | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U17/19 A 4 Sp. | Finale | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U17/19 A 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 A 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 B 4 Sp. | 13. - 14. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U17/19 B 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U17/19 B 4 Sp. | 9. - 12. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U17/19 B 4 Sp. | Finale slutspil | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U17/19 B 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 B 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 B 4 Sp. | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 B 4 Sp. | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 C 4 Sp. | 13. - 15. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U17/19 C 4 Sp. | 5. - 8. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U17/19 C 4 Sp. | 9. - 12. plads | andet/ukendt | 2 | 2018–2018 | 2 | ingen sikker nøgle |
| DMU Hold U17/19 C 4 Sp. | Finale slutspil | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U17/19 C 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 C 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 C 4 Sp. | Pulje 3 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 C 4 Sp. | Pulje 4 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 CD/D 4 Sp. | Bronzekamp 3. - 4. plads | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U17/19 CD/D 4 Sp. | Finale | slutspil | 2 | 2018–2018 | 2 | navneord: slutspil |
| DMU Hold U17/19 CD/D 4 Sp. | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/19 CD/D 4 Sp. | Pulje 2 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER U17/U19 4+2 M/A | 4+2 A | andet/ukendt | 2 | 2018–2018 | 1 | ingen sikker nøgle |
| EFTERSKOLER U17/U19 A 4 spillere | 4 SPILLERE A | andet/ukendt | 2 | 2018–2018 | 1 | ingen sikker nøgle |
| EFTERSKOLER U17/U19 B 4 spillere | 4 SPILLERE B | andet/ukendt | 2 | 2018–2018 | 1 | ingen sikker nøgle |
| EFTERSKOLER U17/U19 C 4 spillere | 4 SPILLERE C | andet/ukendt | 2 | 2018–2018 | 1 | ingen sikker nøgle |
| EFTERSKOLER U17/U19 CD 4 Spillere | 4 SPILLERE CD | andet/ukendt | 2 | 2018–2018 | 1 | ingen sikker nøgle |
| U17/19 CD 4 spillere | Pulje 1710 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 CD 4 spillere | Pulje 1711 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 CD 4 spillere | Pulje 1712 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 D 4 spillere | Pulje 1713 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 M 4 spillere | Pulje 1714 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 MA 4+2 | Pulje 172 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 AB 4+2 | Pulje 173 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 A 4 spillere | Pulje 174 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 A 4 spillere | Pulje 174A | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 B 4 spillere | Pulje 175 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 B 4 spillere | Pulje 176 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 B 4 spillere | Pulje 177 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 C 4 spillere | Pulje 178 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 C 4 spillere | Pulje 179 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 C 4 spillere | U17/19 C/CD 4 spillere Pulje 6172 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/19 B 4 spillere | U17/19B 4 spillere pulje 6171 | grundspil | 2 | 2018–2018 | 9 | navneord: grundspil/pulje |
| U17/U19 CD 4 spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U17/19CD -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U17/19B -4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 2 | navneord: grundspil/pulje |
| U17/U19 C 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| U17/19 MA 4+2 | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U17/19 MA 4+2 | SM for hold finale | slutspil | 2 | 2018–2018 | 5 | navneord: slutspil |
| U17/19 M 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U17/19 B 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U17/19 B 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| U17/19 CD 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 5 | navneord: grundspil/pulje |
| SM for hold finalekampe U17/19 | SM finalekampe U17/19 | slutspil | 2 | 2018–2018 | 1 | navneord: slutspil |
| U17/19 A 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U17/19 A 4 Spillere | Pulje 2 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U17/19 C 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| U17/19 D 4 Spillere | Pulje 1 | grundspil | 2 | 2018–2018 | 4 | navneord: grundspil/pulje |
| &#216;M 4+2 A/B | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| &#216;M 4 C (4 SP.) | Finale | slutspil | 2 | 2018–2018 | 1 | navneord: slutspil |
| &#216;M 4 D (4 SP.) | Finale slutspil | slutspil | 2 | 2018–2018 | 1 | navneord: slutspil |
| &#216;M 4 D (4 SP.) | Placeringskampe | andet/ukendt | 2 | 2018–2018 | 1 | ingen sikker nøgle |
| &#216;M 4 D (4 SP.) | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| &#216;M 4 C (4 SP.) | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| &#216;M 4 C (4 SP.) | Pulje 2 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| &#216;M 4 D (4 SP.) | Pulje 2 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| &#216;M 4 D (4 SP.) | Pulje 3 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| &#216;M 4 CD piger | Pulje 1 | grundspil | 2 | 2018–2018 | 1 | navneord: grundspil/pulje |
| 3. division | Kvalifikation til 2. division, pulje A | andet/ukendt | 2 | 2018–2022 | 1 | kvalifikation uden retning |
| 3. division | Kvalifikation til 2. division, pulje B | andet/ukendt | 2 | 2018–2022 | 1 | kvalifikation uden retning |
| 3. division | Nedrykning fra 3. division, pulje B | nedrykningsspil | 2 | 2018–2022 | 1 | navneord: nedrykning |
| 4 Herrer C-rækken | Pulje 1 | grundspil | 2 | 2018–2019 | 4 | navneord: grundspil/pulje |
| 4 herrer B-rækken | Pulje 1 | grundspil | 2 | 2018–2019 | 4 | navneord: grundspil/pulje |
| 4 herrer B-rækken | Pulje 2 | grundspil | 2 | 2018–2019 | 4 | navneord: grundspil/pulje |
| DGI Nordjylland - Motionsturnering | Pulje 1 | grundspil | 2 | 2018–2019 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer serie 1 | Pulje 1 | grundspil | 2 | 2018–2019 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer serie 2 | Pulje 1 | grundspil | 2 | 2018–2019 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer serie 3 | Pulje 1 | grundspil | 2 | 2018–2019 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer serie 4 | Pulje 1 | grundspil | 2 | 2018–2019 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer serie 5 | Pulje 1 | grundspil | 2 | 2018–2019 | 1 | navneord: grundspil/pulje |
| U9 - 2500 - 4 spillere | Pulje 0901-CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U9 - 2500 - 4 spillere | Pulje 0902-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U9 - 2500 - 4 spillere | Pulje 0903-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U9 3000 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U9 - 3000 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Kredsmatch 19/20 | Pulje 1 | grundspil | 2 | 2019–2019 | 5 | navneord: grundspil/pulje |
| U11 (4 + 2) | Pulje 1101-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U11 - 3000 - 4 piger | Pulje 1120-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 5200 - 4 spillere | Pulje 1102-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U11 - 4400 - 4 spillere | Pulje 1103 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3800 - 4 spillere | Pulje 1104 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3800 - 4 spillere | Pulje 1105-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3800 - 4 spillere | Pulje 1106-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3800 - 4 spillere | Pulje 1107-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1108-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1109- CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1110 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1111-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1112-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1113 - CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1114-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 1115 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 1116- CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 1117-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 1118-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 1119-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 1121-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 1122-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U11 - 3400 - 4 spillere | Pulje 1123 S&#216;N-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Begynderholdturnering I Vamdrup U11 | Pulje 1 | grundspil | 2 | 2019–2019 | 6 | navneord: grundspil/pulje |
| U11 3800 - 4 spillere | 3.-4. plads | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| U11 3800 - 4 spillere | Finale | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| U11 3000 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U11 3800 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U11 3800 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U11 3000 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U11 3800 - 4 spillere | Semifinaler | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| U11 3800 - 4 spillere | Slutspil 2 | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| U11 - 5200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U11 - 4+2 | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U11 3800 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 (4 + 3) | Pulje 1301 | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U13 - 3400 - 4 piger | Pulje 1337-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 piger | Pulje 1342-CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 6200 - 4 spillere | Pulje 1302 - CT | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U13 - 6200 - 4 spillere | Pulje 1303-CV | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U13 - 6200 - 4 spillere | Pulje 1304-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U13 - 5200 - 4 spillere | Pulje 1305 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 5200 - 4 spillere | Pulje 1306-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 5200 - 4 spillere | Pulje 1307-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 5200 - 4 spillere | Pulje 1308-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 5200 - 4 spillere | Pulje 1308-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1310 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1311 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1312-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1314-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1315-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1316-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1317-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 4400 - 4 spillere | Pulje 1318-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1319 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1320 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1321 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1322-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1323-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1324-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1325-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1326-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1327-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 1328-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1329-CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1330 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1331 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1332-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1333-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1334-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1335-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1336-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1338-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1339-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1340-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 1341-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U13 - 3400 - 4 piger | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U13 - 6200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U13 - 6200 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U13 3800 - 4 spillere | 3. - 4. plads | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| U13 3800 - 4 spillere | Finale | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| U13 3400 - 4 piger | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 3400 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 5200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 4400 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 3800 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 3800 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 3400 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 3400 - 4 spillere | Pulje 3 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U13 3800 - 4 spillere | Semifinaler | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| U13 3800 - 4 spillere | Slutspil 2 | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| Begynderholdturnering i Vamdrup U13 | Pulje 1 | grundspil | 2 | 2019–2019 | 6 | navneord: grundspil/pulje |
| U13 - 3800 - 4 spillere | Pulje 4 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U13 - 5200 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U15 (4 + 3) | Pulje 1501-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U15 - 12t (4 + 2) | Pulje 1502-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U15 - 10t (4 + 2) | Pulje 1503-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U15 - 5200 - 4 piger | Pulje 1526-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 piger | Pulje 1540-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 piger | Pulje 1541-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 piger | Pulje 1542-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 8400 - 4 spillere | Pulje 1504-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U15 - 7200 - 4 spillere | Pulje 1505 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 7200 - 4 spillere | Pulje 1506-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 7200 - 4 spillere | Pulje 1507-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 1508 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 1509 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 1510-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 1511-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 1513-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 1514-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1515 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1516 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1517 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1518 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1519 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1520-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1521-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1522-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1523-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1524-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1525 A-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1525 B-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1527 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1528 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1529 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1530-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1531-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1532-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1533-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1534-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1535-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1536-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1537-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1538-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1539-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 1543-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 1544-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U15 7200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 6200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 5200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 4400 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 4400 - 4 piger | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 4400 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 5200 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 - 8400 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 - 12000 - 4+2 | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 4400 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 6200 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U15 - 4400 - 4 spillere | Pulje 3 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U15 - 4400 - 4 piger | Pulje 2 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 3 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U15 - 5200 - 4 spillere | Pulje 4 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U15 - 5200 - 4 piger | Pulje 1 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 - 6200 - 4 spillere | Pulje 3 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U15 - 7200 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U17 (4 + 3) | Pulje 1701-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| EFTERSKOLER 4 + 2 (12t) | Efterskoler 4 + 2 (12t) | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4 + 2 (15t) | Efterskoler 4 + 2 (15t) | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| EFTERSKOLER 10.000 - 4 spillere | Efterskoler 4 spiller (10.000) | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| EFTERSKOLER 8.800 - 4 spillere | Efterskoler 4 spillere (8.800) | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| EFTERSKOLER 7.200 - 4 spillere | Efterskoler 4 spillere (7.200) | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| EFTERSKOLER 6.200 - 4 spillere | Efterskoler 4 spillere (6.200) | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| EFTERSKOLER 5.200 - 4 spillere | Efterskoler 4 spillere (5.200) | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| &#216;M 5 + 3 A | Pulje 5 + 3 A | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| &#216;M 6 A/B | 6 A/B | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| &#216;M 4 C | 4 C | andet/ukendt | 2 | 2019–2019 | 2 | ingen sikker nøgle |
| &#216;M 4 D-1 | 4 D-1 finale | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| &#216;M 4 D-1 | 4 D-1 Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| &#216;M 4 D-1 | 4 D-1 Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| &#216;M 4 D-2 | 4 D-2 finale | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| &#216;M 4 D-2 | 4 D-2 Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| &#216;M 4 D-2 | 4 D-2 Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| &#216;M 4 D-3 | 4 D-3 finale | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| &#216;M 4 D-3 | 4 D-3 Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| &#216;M 4 D-3 | 4 D-3 Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| &#216;M 4 D piger | 4 D piger finale | slutspil | 2 | 2019–2019 | 2 | navneord: slutspil |
| &#216;M 4 D piger | 4 D piger Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| &#216;M 4 D piger | 4 D piger Pulje 2 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U17/U19 - 12t (4 + 2) | Pulje 1705-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U17/U19 - 8400 - 4 spillere | Pulje 1708 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 8400 - 4 spillere | Pulje 1709-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 8400 - 4 spillere | Pulje 1710-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 7200 - 4 spillere | Pulje 1711 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 7200 - 4 spillere | Pulje 1712 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 7200 - 4 spillere | Pulje 1713-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 7200 - 4 spillere | Pulje 1714-JT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 7200 - 4 spillere | Pulje 1715-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 5200 - 4 spillere | Pulje 1716 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 5200 - 4 spillere | Pulje 1717 - CT | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 6200 - 4 spillere | Pulje 1718-CV | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 6200 - 4 spillere | Pulje 1720-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 5200 - 4 spillere | Pulje 1721-BL | grundspil | 2 | 2019–2019 | 11 | navneord: grundspil/pulje |
| U17/U19 - 12.000 - 4 spillere | Pulje 1706-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U17/U19 - 10.000 - 4 spillere | Pulje 1707-BL | grundspil | 2 | 2019–2019 | 13 | navneord: grundspil/pulje |
| U17/U19 - 7200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U17/U19 - 7200 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U17/U19 - 8400 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U17/U19 - 8400 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U17/U19 - 10000 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U17/U19 - 10000 - 4 spillere | Pulje 2 | grundspil | 2 | 2019–2019 | 4 | navneord: grundspil/pulje |
| U17/U19 - 12000 - 4+2 | Pulje 1 | grundspil | 2 | 2019–2019 | 5 | navneord: grundspil/pulje |
| U17/U19 - 15000 - 4+2 | Pulje 1 | grundspil | 2 | 2019–2019 | 5 | navneord: grundspil/pulje |
| U17/19 7200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U17/19 6200 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U17/19 6200 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 2 | navneord: grundspil/pulje |
| U17/U19 - 5200 - piger | Pulje 1 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| U17/U19 - 12000 - 4 spillere | Pulje 1 | grundspil | 2 | 2019–2019 | 3 | navneord: grundspil/pulje |
| Serie 3/4 (4 + 2) | Pulje 2 - HG | grundspil | 2 | 2019–2020 | 11 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 3 - HG | grundspil | 2 | 2019–2020 | 11 | navneord: grundspil/pulje |
| SEN Hr - B | Slutspil | slutspil | 2 | 2019–2020 | 2 | navneord: slutspil |
| 70+ 1. Serie | Pulje 1 | grundspil | 2 | 2019–2020 | 1 | navneord: grundspil/pulje |
| U9 - 2500 (4 spillere) | Pulje 901 - CE | grundspil | 2 | 2020–2020 | 12 | navneord: grundspil/pulje |
| U9 - 2500 (4 spillere) | Pulje 902 - CV | grundspil | 2 | 2020–2020 | 12 | navneord: grundspil/pulje |
| U9 - 2500 (4 spillere) | Pulje 902 slutspil A - CV | slutspil | 2 | 2020–2020 | 12 | navneord: slutspil |
| U9 - 2500 (4 spillere) | Pulje 903 - JT | grundspil | 2 | 2020–2020 | 12 | navneord: grundspil/pulje |
| U9 - 2500 (4 spillere) | Pulje 904 - BL | grundspil | 2 | 2020–2020 | 12 | navneord: grundspil/pulje |
| U09 2500 4 Spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| DMU H 4+2 | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 3800 - 4 spillere | 5. - 6. plads | andet/ukendt | 2 | 2020–2020 | 2 | ingen sikker nøgle |
| DMU H 3400 - 4 spillere | 5. - 6. plads | andet/ukendt | 2 | 2020–2020 | 2 | ingen sikker nøgle |
| DMU H 3000 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 2800 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| Kredsmatch 20-21 | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U11 - 2800 (4 piger) | Pulje 1101 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1102 - CE U11-3000 & U11-2800 piger | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1103 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1104 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1105 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1106 - JT 3000/3400 | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1106 slutspil A - JT 3000/3400 | slutspil | 2 | 2020–2020 | 11 | navneord: slutspil |
| U11 - 3000 (4 spillere) | Pulje 1106 slutspil B - JT 3000/3400 | slutspil | 2 | 2020–2020 | 11 | navneord: slutspil |
| U11 - 3000 (4 spillere) | Pulje 1106 slutspil C - JT 3000/3400 | slutspil | 2 | 2020–2020 | 11 | navneord: slutspil |
| U11 - 3000 (4 spillere) | Pulje 1107 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1108 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1109 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1110 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1111 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1112 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1114 - CE U11-3400 & U11-3800 | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1115 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1116 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1117 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1118 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U11 - 3800 (4 spillere) | Pulje 1119 - BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U11 - 3800 (4 spillere) | Pulje 1119 A - BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U11 - 3800 (4 spillere) | Pulje 1120 - BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U11 - 3800 (4 spillere) | Pulje 1120 A - BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U11 - 4400 (4 spillere) | Pulje 1122 - BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U11 (4+2) | Pulje 1123-BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U11 3000 4 Spillere | Pulje 3 | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| U11 - 2800 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 4 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U11 - 3000 - 4 spillere | Pulje 5 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| DMU H 6000 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 6000 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 6000 - 4 spillere | Kvalpulje A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 6000 - 4 spillere | Kvalpulje B | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 6000 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 5200 - 4 spillere | Kvalpulje A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 5200 - 4 spillere | Kvalpulje B | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 5200 - 4 spillere | Kvalpulje C | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4400 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 4400 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 4400 - 4 spillere | Kvalkamp A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4400 - 4 spillere | Kvalkamp B | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4400 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 3800 - 4 spillere | Kvalkamp A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 3800 - 4 spillere | Kvalkamp B | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 3800 - 4 spillere | Kvalkamp C | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 3800 - 4 spillere | Kvalkamp D | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 3800 - 4 spillere | Kvalkamp E | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 3400 - 4 spillere | Kvalkamp A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 3200 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| U13 - 3200 (4 piger) | Pulje 1301 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3200 (4 piger) | Pulje 1302 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 piger) | Pulje 1317 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1303 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1304 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1305 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1306 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1307 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1308 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1309 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1310 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1311 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1312 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1313 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1314 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1315 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1316 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1318 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1319 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1320 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1321 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1322 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1323 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1324 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1325 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1326 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1327 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1328 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1329 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1330 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1331 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1332 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1333 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1334 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1335 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1336 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 5200 | Pulje 1337 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 5200 | Pulje 1338 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 6000 | Pulje 1339 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 - 6000 | Pulje 1340 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U13 (4+3) | Pulje 1341 - BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U13 3400 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| U13 3200 4 Piger | Pulje 1 | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| U13 3400 4 Spillere | Pulje 3 | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| U13 3400 4 Spillere | Pulje 4 | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| U13 - 6000 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 6 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U13 - 3400 - 4 spillere | Pulje 7 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U13 - 3200 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| DMU H 4+2 12t | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 7600 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 7600 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 7600 - 4 spillere | Kvalpulje A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 7600 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 7600 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 6400 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 6400 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 6400 - 4 spillere | Kvalpulje A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 6400 - 4 spillere | Kvalpulje B | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 6400 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 6400 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 5600 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 5600 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 5600 - 4 spillere | Kvalkamp B | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 5600 - 4 spillere | Kvalkamp C | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 5600 - 4 spillere | Kvalkamp D | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 5600 - 4 spillere | Kvalkamp E | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 5600 - 4 spillere | Kvalpulje A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 5600 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 5600 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 4800 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 4800 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 4800 - 4 spillere | Kvalkamp C | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4800 - 4 spillere | Kvalkamp D | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4800 - 4 spillere | Kvalkamp E | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4800 - 4 spillere | Kvalkamp F | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4800 - 4 spillere | Kvalpulje A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4800 - 4 spillere | Kvalpulje G | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4800 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 4800 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 4200 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 4200 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 4200 - 4 spillere | Kvalkamp A | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4200 - 4 spillere | Kvalkamp B | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4200 - 4 spillere | Kvalkamp C | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4200 - 4 spillere | Kvalpulje D | andet/ukendt | 2 | 2020–2020 | 2 | kvalifikation uden retning |
| DMU H 4200 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 4200 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 4200 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| U15 - 3800 (4 piger) | Pulje 1501 U15 3800/4200 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 3800 (4 piger) | Pulje 1502 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 piger) | Pulje 1518 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1503 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1504 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1505 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1506 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1507 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1508 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1509 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1510 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1511 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1512 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1513 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1514 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1515 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1516 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1517 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1519 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1520 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1521 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1522 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1525 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1528 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1529 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1530 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1531 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1532 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1532 A - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1532 B - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1533 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1534 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1535 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1536 - CE U15 6400 & U17/19 6800 | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1537 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1538-BL U15 6400 & U17/19 6000 | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U15 - 7600 (4 spillere) | Pulje 1539 - CE | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U15 - 7600 (4 spillere) | Pulje 1540 - BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U15 (4+3) | Pulje 1541-BL | grundspil | 2 | 2020–2020 | 12 | navneord: grundspil/pulje |
| U15/U17/U19 - 12t (4+2) | Pulje 1542 U15 10t/12t & U17/19 12t-BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U15 4200 4 Spillere P1 | Pulje 1 | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| U15 3800 4 Piger | Pulje 1 | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| U15 4200 4 Spillere P2 | Pulje 2 | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| U15 - 4200 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U15 - 4800 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U15 - 5600 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U15 - 5600 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U15 - 7600 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U15 - 10t - 4+2 | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U15 - 12t - 4+2 | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U15 6400 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| U15 - 3800 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4200 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4200 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4200 - 4 spillere | Pulje 3 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4200 - 4 spillere | Pulje 4 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4200 - 4 spillere | Pulje 5 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4200 - 4 spillere | Pulje 6 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4800 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4800 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 4800 - 4 spillere | Pulje 3 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 6400 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| U15 - 6400 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 4 | navneord: grundspil/pulje |
| DMU H 4+2 15t | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 4+2 15t | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 4+2 15t | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 4+2 15t | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 9600 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 8000 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 8000 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 8000 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 8000 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 6800 - 4 spillere | 5. - 6. plads | andet/ukendt | 2 | 2020–2020 | 2 | ingen sikker nøgle |
| DMU H 6800 - 4 spillere | Bronzekamp | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 6800 - 4 spillere | Finale | slutspil | 2 | 2020–2020 | 2 | navneord: slutspil |
| DMU H 6800 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 6800 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| DMU H 5200 - 4 spillere | 5. - 6. plads | andet/ukendt | 2 | 2020–2020 | 2 | ingen sikker nøgle |
| &#216;M EFTERSKOLER B 4 spillere | &#216;M Pulje B | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER C 4 spillere | &#216;M Pulje C | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER D 4 spillere | &#216;M Pulje D | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER X 4 spillere | &#216;M Pulje X | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER X 4 piger | &#216;M Pulje Y | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER - 12t (4+2) | 12t (4+2) | andet/ukendt | 2 | 2020–2020 | 1 | ingen sikker nøgle |
| EFTERSKOLER - 15t (4+2) | 15t (4+2) | andet/ukendt | 2 | 2020–2020 | 1 | ingen sikker nøgle |
| EFTERSKOLER - 5200 (4 spillere) | 5200 | andet/ukendt | 2 | 2020–2020 | 1 | ingen sikker nøgle |
| EFTERSKOLER - 6000 (4 spillere) | 6000 | andet/ukendt | 2 | 2020–2020 | 1 | ingen sikker nøgle |
| EFTERSKOLER - 6800 (4 spillere) | 6800 | andet/ukendt | 2 | 2020–2020 | 1 | ingen sikker nøgle |
| EFTERSKOLER - 8000 (4 spillere) | 8000 | andet/ukendt | 2 | 2020–2020 | 1 | ingen sikker nøgle |
| EFTERSKOLER - 9600 (4 spillere) | 9600 | andet/ukendt | 2 | 2020–2020 | 1 | ingen sikker nøgle |
| EFTERSKOLER - 8000 (4 spillere) | Pulje 2 (ekstra kampe) | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER - 12t (4+2) | Pulje A | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER - 12t (4+2) | Pulje B | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| EFTERSKOLER - 15t (4+2) | Pulje M | grundspil | 2 | 2020–2020 | 1 | navneord: grundspil/pulje |
| U17/U19 - 4400 (4 piger) | Pulje 1703 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 1704 - JT 6000/5200 | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 1705 - JT 6000/5200 | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 1706 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 6000 (4 spillere) | Pulje 1707 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 6000 (4 spillere) | Pulje 1708 - CV | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 6800 (4 spillere) | Pulje 1709 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 6800 (4 spillere) | Pulje 1710 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 1711 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 1712 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 1713 - BL | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 9600 (4 spillere) | Pulje 1714 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 9600 (4 spillere) | Pulje 1715 - JT | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 1716 - CE | grundspil | 2 | 2020–2020 | 11 | navneord: grundspil/pulje |
| U17/U19 - 15t (4+2) | Pulje 1716-BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U17/U19 - 15t (4+2) | Pulje 1717-BL | grundspil | 2 | 2020–2020 | 13 | navneord: grundspil/pulje |
| U17/19 - 6800 (4 spillere) | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| U17/19 - 5200 (4 spillere) | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| U17/U19 - 4400 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 5200 - 4 spillere | Pulje 3 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 5200 - 4 piger | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6000 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6800 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6800 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6000 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 8000 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 8000 - 4 spillere | Pulje 2 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 9600 - 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 12t - 4+2 | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/U19 - 15t - 4+2 | Pulje 1 | grundspil | 2 | 2020–2020 | 5 | navneord: grundspil/pulje |
| U17/19 7200 4 spillere | Pulje 1 | grundspil | 2 | 2020–2020 | 2 | navneord: grundspil/pulje |
| 4 Herre B-Række | Pulje 1 | grundspil | 2 | 2020–2021 | 5 | navneord: grundspil/pulje |
| Motionsrækken | Pulje 1 | grundspil | 2 | 2020–2021 | 2 | navneord: grundspil/pulje |
| MOT 4 herrrer Serie 1 | Pulje 1 | grundspil | 2 | 2020–2021 | 1 | navneord: grundspil/pulje |
| DMU H - U9 2700 - 4 spillere | 3 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U9 2700 - 4 spillere | 5 - 6 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U9 2700 - 4 spillere | 7 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U9 2700 - 4 spillere | 9 - 10 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U9 2700 - 4 spillere | Finale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U9 2700 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U9 2700 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U09 - 2700 (4 spillere) | Pulje 901 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U09 - 2700 (4 spillere) | Pulje 902 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U09 - 2700 (4 spillere) | Pulje 903 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U09 - 2700 (4 spillere) | Pulje 904 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U09 - 2700 (4 spillere) | Pulje 905 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U09 2700 4 Spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U9 Nye spillere (2700 - 4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| SM for Hold 2700 | Finale | slutspil | 2 | 2021–2021 | 1 | navneord: slutspil |
| U09 - 2700 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| DMU H - U11 4400 - 4 spillere | 3 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U11 4400 - 4 spillere | Finale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U11 4400 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3800 - 4 spillere | 5. - 8. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U11 3800 - 4 spillere | Finale slutspil | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U11 3800 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3800 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3400 - 4 spillere | 5. - 8. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U11 3400 - 4 spillere | 9. - 12. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U11 3400 - 4 spillere | Finale slutspil 1. - 4. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U11 3400 - 4 spillere | Kvartfinaler pulje 1+2 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U11 3400 - 4 spillere | Kvartfinaler pulje 3+4 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U11 3400 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3400 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3400 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3400 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3100 - 4 spillere | 13 - 16 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U11 3100 - 4 spillere | 17 - 20 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U11 3100 - 4 spillere | 5 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U11 3100 - 4 spillere | 9 - 12 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U11 3100 - 4 spillere | Finale slutspil 1. - 4. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U11 3100 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3100 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3100 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3100 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2700 - 4 piger | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U11 (2 + 2) | Pulje 1101 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U11 - 3800 (4 spillere) | Pulje 1102 - JS | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U11 - 3800 (4 spillere) | Pulje 1103 - CV | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1104 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1105 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3400 (4 spillere) | Pulje 1106 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1107 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1108 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1109 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1110 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1111 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1112 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1113 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1114 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1115 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1116 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1117 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1118 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1119 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U11 begynder | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U11 3100 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U11 3100 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U11 3100 4 Spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U11 3100 4 Spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U11 3100 4 Spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U11 (2+2) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U11 - 4400 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U11 - 3800 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U11 Nye spillere - 3100 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U11 Nye spillere - 3100 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U11 Nye spillere - 3100 (4 spillere) | Pulje 3 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U11 - 2700 (4 piger) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| 3800 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U11 - 2700 SM for hold Piger | Finale | slutspil | 2 | 2021–2021 | 1 | navneord: slutspil |
| U11 3100 SM for hold | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for Hold - 3800 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold - 3400 (4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold - 4400 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| U11 - 3100 (4 spillere) | Pulje 3 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| DMU H - U13 - 4+3 | 3 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 - 4+3 | 5 - 6 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 - 4+3 | 7 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 - 4+3 | Finale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 - 4+3 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 - 4+3 | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 6000 - 4 spillere | 1 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 6000 - 4 spillere | 5 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 6000 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 6000 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5200 - 4 spillere | 5. - 8. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 5200 - 4 spillere | 9. - 12 plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 5200 - 4 spillere | Finale slutspil 1. - 4. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 5200 - 4 spillere | Kvartfinale 1 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 5200 - 4 spillere | Kvartfinale 2 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 5200 - 4 spillere | Kvartfinale 3 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 5200 - 4 spillere | Kvartfinale 4 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 5200 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5200 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5200 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5200 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 - 4 spillere | Finale slutspil 1. - 4. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 4400 - 4 spillere | Kvartfinale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 4400 - 4 spillere | Placeringskampe 11. - 15. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 - 4 spillere | Placeringskampe 16. - 19. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 - 4 spillere | Placeringskampe 5. - 10. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 - 4 spillere | Pulje 5 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 - 4 spillere | Finale slutspil 1. - 3. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 3800 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 - 4 spillere | Slutspil 10. - 13 plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 3800 - 4 spillere | Slutspil 4. - 6. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 3800 - 4 spillere | Slutspil 7. - 9. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 3500 - 4 spillere | Finale slutspil 1. - 4. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 3500 - 4 spillere | Kvartfinale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U13 3500 - 4 spillere | Placeringskampe 11.- 15. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 3500 - 4 spillere | Placeringskampe 16. - 19. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 3500 - 4 spillere | Placeringskampe 5. - 10 plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U13 3500 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 - 4 spillere | Pulje 5 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 - 4 piger | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3100 - 4 piger | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U13 (4 + 3) | Pulje 1301 - JT | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U13 - 6000 (4 spillere) | Pulje 1302 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U13 - 5200 (4 spillere) | Pulje 1303 - JS | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U13 - 5200 (4 spillere) | Pulje 1304 - CV | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1307 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1308 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1309 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1310 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1311 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1312 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1313 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1314 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1315 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1316 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1317 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1318 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1319 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1320 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1321 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1322 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1323 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1324 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1325 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1326 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1327 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1328 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1329 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1330 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1331 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1332 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1333 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1334 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1335 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3100/3500 (4 piger) | Pulje 1336 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 - 3100/3500 (4 piger) | Pulje 1337 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U13 3500 (4 piger) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U13 3800 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U13 3500 (4 spillere) | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U13 5200 (4 spillere) | FYN | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| 4400 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U13 3100 4 Piger | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U13 3500 4 Spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 3 | navneord: grundspil/pulje |
| U13 3500 4 Spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 3 | navneord: grundspil/pulje |
| U13 3500 4 Spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 3 | navneord: grundspil/pulje |
| U13 Nye spillere - 3500 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U13 Nye spillere - 3500 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U13 - 3500 (4 piger) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| SM for 4+3 hold | Finale | slutspil | 2 | 2021–2021 | 1 | navneord: slutspil |
| U13 - 3500 4 spillere SM finalestævne | Pulje 1 | slutspil | 2 | 2021–2021 | 1 | navneord: slutspil |
| SM for hold - 3500 (4 piger) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Sm for hold 3100 (4 piger) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for Hold 3800 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold 4400 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold U13 5200 | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold - U13 6000 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 3 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 4 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| DMU H - U15 - 4+3 | 3 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 - 4+3 | 5 - 6 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 - 4+3 | 7 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 - 4+3 | Finale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 - 4+3 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 - 4+3 | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 7800 - 2+2 | 5. - 6. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 7800 - 2+2 | Finale slutspil 1. - 4. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 7800 - 2+2 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 7800 - 2+2 | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6900 - 2+2 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 7600 - 4 spillere | 1 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 7600 - 4 spillere | 5 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 7600 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 7600 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6400 - 4 spillere | 1 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 6400 - 4 spillere | 5 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 6400 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6400 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 - 4 spillere | 12. - 14. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 5600 - 4 spillere | 15. - 18. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 5600 - 4 spillere | 19. - 22. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 5600 - 4 spillere | 5. - 7. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 5600 - 4 spillere | 8. - 11. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 5600 - 4 spillere | Finaleslutspil 1.- 4. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 5600 - 4 spillere | Kvartfinale 1'ere pulje 5+6 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 5600 - 4 spillere | Kvartfinaler 2'ere pulje 1+2+3+4 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 5600 - 4 spillere | Kvartfinaler 2'ere pulje 5+6 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 5600 - 4 spillere | Kvartfinaler 3'ere pulje 1+2+3+4 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 5600 - 4 spillere | Kvartfinaler 3'ere pulje 5+6 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 5600 - 4 spillere | Kvatfinaler 1'ere pulje 1+2+3+4 | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 5600 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 - 4 spillere | Pulje 5 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 - 4 spillere | Pulje 6 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 - 4 spillere | Pulje 7 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 - 4 spillere | Finale slutspil | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 4800 - 4 spillere | Placeringskampe 11. - 15. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4800 - 4 spillere | Placeringskampe 16. - 20. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4800 - 4 spillere | Placeringskampe 5. - 10. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4800 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 - 4 spillere | Pulje 5 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4300 - 4 spillere | 1 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4300 - 4 spillere | 13 - 16 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4300 - 4 spillere | 5 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4300 - 4 spillere | 9 - 12 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4300 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4300 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4300 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4300 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4300 - 4 piger | 3 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4300 - 4 piger | 5 - 6 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4300 - 4 piger | 7 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4300 - 4 piger | 9 - 10 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U15 4300 - 4 piger | Finale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U15 4300 - 4 piger | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4300 - 4 piger | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U15 (4 + 3) | Pulje 1501 - JT | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 7800 (2 + 2) | Pulje 1502 - JT | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 7600 (4 spillere) | Pulje 1503 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 7600 (4 spillere) | Pulje 1504 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 7600 (4 spillere) | Pulje 1505 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1506 - JS | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1507 - CV | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1508 - CV | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1509 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1510 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1511 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1512 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1513 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1514 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1515 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1516 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1517 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1518 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1519 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1520 JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1521 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1522 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1525 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1528 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1529 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1530 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1531 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1532 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1533 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1534 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1535 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1536 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1537 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1538 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1539 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1540 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1541 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 - 3500/4300 (4 piger) | Pulje 1542 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U15 4300 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U15 4300 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U15 4800 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U15 4300 4 Piger | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U15 7600 4 Spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U15 4300 4 Spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U15 5600 4 Spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U15 4300 4 Spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U15 - 7800 (2+2) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U15 - 6900 (2+2) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U15 - 3500 (4 piger) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| 5600 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| 4+3 SM for hold | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM Finale stævne 4800 (4 spillere) | Pulje 1 | slutspil | 2 | 2021–2021 | 1 | navneord: slutspil |
| U15 - 4300 4 spillere SM finalestævne | Pulje 1 | slutspil | 2 | 2021–2021 | 1 | navneord: slutspil |
| Sm for hold U15 3500 (4 piger) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold - 4300 (4 piger) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold U15 -5600 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Sm for hold U15 - 6400 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold - U15 - 7600 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold - 7800 - 2+2 | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for Hold U15 - 6900 (2+2) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| U15 - 4300 (4 spillere) | Pulje 3 | grundspil | 2 | 2021–2021 | 4 | navneord: grundspil/pulje |
| DMU H - U17 - 4+3 | 3 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17 - 4+3 | 5 - 6 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17 - 4+3 | 7 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17 - 4+3 | Finale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U17 - 4+3 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17 - 4+3 | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U17 (4 + 3) | DM kvalifikation | andet/ukendt | 2 | 2021–2021 | 12 | kvalifikation uden retning |
| U17 (4 + 3) | Final 4 | slutspil | 2 | 2021–2021 | 12 | navneord: slutspil |
| U17 (4 + 3) | Pulje 1 | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| 4+3 SM for hold | Finale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| DMU H - U17/19 15t - 4+2 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 9600 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 8000 - 4 spillere | 1 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 8000 - 4 spillere | 5 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 8000 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 8000 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 6800 - 4 spillere | 1 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 6800 - 4 spillere | 5 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 6800 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 6800 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 6000 - 4 spillere | 1 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 6000 - 4 spillere | 5 - 7 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 6000 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 6000 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 5600 - 4 spillere | 1 - 4 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 5600 - 4 spillere | 13 - 15 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 5600 - 4 spillere | 5 - 8 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 5600 - 4 spillere | 9 - 12 Plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| DMU H - U17/19 5600 - 4 spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 5600 - 4 spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 5600 - 4 spillere | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DMU H - U17/19 5600 - 4 spillere | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4+2 E | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4+2 M (15.000) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4+2 B (11.000) | 3. - 4. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| Efterskolemesterskaber 4+2 B (11.000) | 5. - 6. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| Efterskolemesterskaber 4+2 B (11.000) | Finale | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| Efterskolemesterskaber 4+2 C (9.000) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4+2 A (13.000) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4+2 B (11.000) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4+2 B (11.000) | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. D (5.600) | Finale slutspil 1. - 4. plads (puljevindere) | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| Efterskolemesterskaber 4 Sp. C (6.800) | Finaleslutspil 1. - 4. plads | slutspil | 2 | 2021–2021 | 2 | navneord: slutspil |
| Efterskolemesterskaber 4 Sp. C (6.800) | Placeringskamp 5. - 8. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| Efterskolemesterskaber 4 Sp. C (6.800) | Placeringskampe 9. - 12. plads | andet/ukendt | 2 | 2021–2021 | 2 | ingen sikker nøgle |
| Efterskolemesterskaber 4 Sp. D (5.600) | Placeringskampe pulje 1 - 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Pi. C-D (4400) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. C (6.800) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. D (5.600) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. D (5.600) | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. C (6.800) | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. C (6.800) | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. D (5.600) | Pulje 3 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. D (5.600) | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| Efterskolemesterskaber 4 Sp. C (6.800) | Pulje 4 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER - 10.000 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER - 8.400 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER - 6.800 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER - 5.600 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER - 4.800 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 2 + 2 M | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 2 + 2 A | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 2 + 2 B | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 2 + 2 C | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 2 + 2 D | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4+2 B | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4+2 C | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 C | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 D | Finale | slutspil | 2 | 2021–2021 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 D | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 D | Pulje 2 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER Valgfag 4 Spillere | Finale | slutspil | 2 | 2021–2021 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER Valgfag 4 Spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER Valgfag 4 Spillere | Pulje 2 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U17/U19 - 15000 (4 + 2) | Pulje 1702 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U17/U19 - 9600 (4 spillere) | Pulje 1704 - CV | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U17/U19 - 9600 (4 spillere) | Pulje 1705 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 1706 - JS | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 1707 - CV | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 1708 - BL | grundspil | 2 | 2021–2021 | 12 | navneord: grundspil/pulje |
| U17/U19 - 6800 (4 spillere) | Pulje 1709 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 - 6800 (4 spillere) | Pulje 1710 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 - 6000 (4 spillere) | Pulje 1711 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 - 5600/6000 (4 spillere) | Pulje 1712 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 - 5600/6000 (4 spillere) | Pulje 1713 - JS | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 - 5600/6000 (4 spillere) | Pulje 1714 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 - 5600/6000 (4 spillere) | Pulje 1715 - JT | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 5600 (4 spillere) | Pulje 1716 - BL | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 5600 (4 spillere) | Pulje 1717 - CV | grundspil | 2 | 2021–2021 | 10 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 6 | navneord: grundspil/pulje |
| U17/19 6800 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U17/19 5600 (4 spillere) | Pulje 2 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| U17/U19 6000 4 Spillere | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| U17/U19 - 8600 (2+2) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U17/U19 - 9600 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6800 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| U17/U19 - 5600 (4 spillere) | Pulje 3 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| 6800 | Pulje 1 | grundspil | 2 | 2021–2021 | 2 | navneord: grundspil/pulje |
| SM for Hold U17/19 - 5600 (4spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold U17/19 - 6000 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold U17/19 - 6800 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold U17/19 - 8000 (4spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for hold U17/19 - 9600 (4 spillere) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Sm for hold U17/19 - 15000 (4+2) | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SM for Hold U17/19 - 8600 - 2+2 | Pulje 1 | grundspil | 2 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Badmintonligaen | Kvalifikationskamp mod 1. division | andet/ukendt | 2 | 2021–2022 | 1 | kvalifikation uden retning |
| 3. division | Kvalifikationskampe | andet/ukendt | 2 | 2021–2022 | 1 | kvalifikation uden retning |
| Serie 3 | Slutspil | slutspil | 2 | 2021–2022 | 2 | navneord: slutspil |
| Senior motion A doubler (4 spillere) | Pulje 601 (S&#216;N - BL) | grundspil | 2 | 2021–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 602 (S&#216;N - BL) | grundspil | 2 | 2021–2022 | 9 | navneord: grundspil/pulje |
| Senior motion D doubler (4 spillere) | Pulje 604 (S&#216;N - BL) | grundspil | 2 | 2021–2022 | 9 | navneord: grundspil/pulje |
| Kval-rækken 5+3 | Pulje 1 | andet/ukendt | 2 | 2021–2025 | 2 | kvalifikation uden retning |
| SEN+40 1. Serie | Pulje 1 | grundspil | 2 | 2021–2022 | 1 | navneord: grundspil/pulje |
| SEN+40 4. Serie | Pulje 1 | grundspil | 2 | 2021–2022 | 1 | navneord: grundspil/pulje |
| SEN+40 20. Serie | Pulje 1 | grundspil | 2 | 2021–2022 | 1 | navneord: grundspil/pulje |
| SEN+40 2. Serie | Pulje 1 | grundspil | 2 | 2021–2022 | 1 | navneord: grundspil/pulje |
| SEN+40 3. Serie | Pulje 1 | grundspil | 2 | 2021–2022 | 1 | navneord: grundspil/pulje |
| 4+2 A-Række | Pulje 1 | grundspil | 2 | 2021–2021 | 5 | navneord: grundspil/pulje |
| 4 Herrer A-Række | Pulje 1 | grundspil | 2 | 2021–2024 | 5 | navneord: grundspil/pulje |
| DMU H - U09 2400 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U09 2800 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U09 2800 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U09 2800 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U09 2800 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U09 - 2800 (4 spillere) | Pulje 901 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U9 4 spillere Begynder 12-mar. | Pulje 1 | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U9 4 spillere Begynder 12-mar. | Pulje 2 | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U09 - 2400 (4 spillere) | Pulje 902 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U09 - 2400 (4 spillere) | Pulje 903 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U9D - 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering (Dec) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering (Jan) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering (Feb) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering (Marts) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering (Marts) | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U9D - 4 spillere | U9 - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U9 - 2800 (4 spillere) | Pulje 2 | grundspil | 2 | 2022–2022 | 4 | navneord: grundspil/pulje |
| DMU H - U11 4400 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3600 4 spillere | Bronzekamp (3.- 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U11 3600 4 spillere | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U11 3600 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3600 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U11 3200 4 spillere | Placeringskampe (13. - 16. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U11 3200 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U11 3200 4 spillere | Placeringskampe (9. - 12. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U11 3200 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3000 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U11 3000 4 spillere | Placeringskampe (13. - 15. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U11 3000 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U11 3000 4 spillere | Placeringskampe (9. - 12. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U11 3000 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3000 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3000 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3000 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2800 4 piger | 5. - 7. plads | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U11 2800 4 piger | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U11 2800 4 piger | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2800 4 piger | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11 - 4400 (4 spillere) | Pulje 1101 - CSV | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U11 - 3600 (4 spillere) | Pulje 1102 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3600 (4 spillere) | Pulje 1103 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1104 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1105 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1106 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1107 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1108 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1109 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1110 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1111 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | Pulje 1112 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - 2800 (4 piger) | Pulje 1114 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 4 spillere Begynder 12-mar. | Pulje 1 | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 4 spillere Begynder 12-mar. | Pulje 2 | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering (Dec) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering (Jan) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11B - 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering (Feb) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering (Marts) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering (Marts) | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering (Jan) | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11B - 4 spillere | U11B - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U11C - 4 spillere | U11C - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U11D - 4 spillere | U11D - Nordjysk Mesterskab for hold - Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| U11D - 4 spillere | U11D - Nordjysk Mesterskab for hold - Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11D - 4 spillere | U11D - Nordjysk Mesterskab for hold - Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U11 4400 4 Spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U11 4400 4 Spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U11 3600 4 Spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U11 3200 4 Spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U11 3200 4 Spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U11 2800 4 Piger | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U11 - 2+2 | Pulje 2 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U11 - 3600 (4 spillere) | Pulje 1 | grundspil | 2 | 2022–2022 | 4 | navneord: grundspil/pulje |
| U11 - 3600 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U11 - 3200 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U11 - 3000 (4 spillere) | Pulje 3 | grundspil | 2 | 2022–2022 | 4 | navneord: grundspil/pulje |
| U11 - 3000 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| DMU H - U13 6000 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5200 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 5200 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 5200 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5200 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 1 (nr. 1 pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 10 (nr. 3 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 11 (nr. 3 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 12 (nr. 3 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 2 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 3 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 4 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 5 (nr. 2 pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 6 (nr. 2 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 7 (nr. 2 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 8 (nr. 2 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Kvartfinale 9 (nr. 3 pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4400 4 spillere | Placeringskampe (13. - 16. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 4 spillere | Placeringskampe (17. - 20. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 4 spillere | Placeringskampe (21. - 24. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 4 spillere | Placeringskampe (9. - 12. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 4 spillere | Pulje 5 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 4 spillere | Pulje 6 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 4 spillere | Pulje 7 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 4 spillere | Pulje 8 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 1 (nr. 1 pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 10 (nr. 3 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 11 (nr. 3 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 12 (nr. 3 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 2 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 3 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 4 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 5 (nr. 2 pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 6 (nr. 2 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 7 (nr. 2 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 8 (nr. 2 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Kvartfinale 9 (nr. 3 pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3800 4 spillere | Placeringskampe (13. - 16. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3800 4 spillere | Placeringskampe (nr. 21 - 25) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3800 4 spillere | Placeringskampe (nr. 5 - 8) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3800 4 spillere | Placeringskampe (nr. 9 - 12) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3800 4 spillere | Pllaceringskampe (17. - 20. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3800 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 4 spillere | Pulje 5 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 4 spillere | Pulje 6 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 4 spillere | Pulje 7 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 4 spillere | Pulje 8 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3400 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 1 (nr. 1 i pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 10 (nr. 3 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 11 (nr. 3 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 12 (nr. 3 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 2 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 3 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 4 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 5 (nr. 2 pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 6 (nr. 2 pulje 3 og 4) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 7 (nr. 2 pulje 5 og 6) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | kvartfinale 8 (nr. 2 pulje 7 og 8) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Kvartfinale 9 (nr. 3 pulje 1 og 2) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3400 4 spillere | Placeringskamp (13. - 16. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3400 4 spillere | Placeringskamp (17. - 20. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3400 4 spillere | Placeringskamp (21. - 24. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3400 4 spillere | Placeringskamp (25. - 26. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3400 4 spillere | Placeringskamp (9. - 12. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3400 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3400 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3600 4 piger | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3400 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3400 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3400 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3400 4 spillere | Pulje 5 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3400 4 spillere | Pulje 6 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3400 4 spillere | Pulje 7 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3400 4 spillere | Pulje 8 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3000 4 piger | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3000 4 piger | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 3000 4 piger | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3000 4 piger | Placeringskamp (7. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 3000 4 piger | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3000 4 piger | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5600 2+2 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4+3 | 5. - 6. kamp | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 4+3 | 7. - 8. plads | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U13 4+3 | Bronzekamp | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4+3 | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U13 4+3 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4+3 | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering (Dec) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering (Jan) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering (Feb) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering (Marts) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering (Jan) | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13C - 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13B - 4 spillere | U13B - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U13C - 4 spillere | U13C - Nordjysk Mesterskab for hold - Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| U13C - 4 spillere | U13C - Nordjysk Mesterskab for hold - Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13C - 4 spillere | U13C - Nordjysk Mesterskab for hold - Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U13D - 4 spillere | U13D - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U13 (4+3) | Pulje 1301 - BL | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U13 - 5600 (2+2) | Pulje 1303 - CSV | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U13 - 6000 (4 spillere) | Pulje 1302 - CSV | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U13 - 5200 (4 spillere) | Pulje 1304 - CSV | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U13 - 5200 (4 spillere) | Pulje 1305 - CSV | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U13 - 5200 (4 spillere) | Pulje 1306-BL | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1307 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1308 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1309 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1310 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1311 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1312 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1313 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1314 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1315 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1316 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1317 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1318 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1319 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1320 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1321 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1322 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1323 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1324 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1325 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1326 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1327 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | Pulje 1328 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3600 (4 piger) | Pulje 1329 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3000 (4 piger) | Pulje 1330 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 - 3000 (4 piger) | Pulje 1331 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 4 spillere Begynder 12-mar. | Pulje 1 | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 4 spillere Begynder 12-mar. | Pulje 2 | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U13 5200 4 Spillere | SM for hold | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U13 4400 4 Spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U13 3800 4 Spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U13 3000 4 Piger | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U13 - 4+3 | Pulje 2 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U13 - 5600 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U13 - 3600 (4 piger) | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U13 - 3600 (4 piger) | Pulje 2 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | SM for Hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U13 - 3800 (4 spillere) | Pulje 3 | grundspil | 2 | 2022–2022 | 4 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U13 - 3400 (4 spillere) | Pulje 4 | grundspil | 2 | 2022–2022 | 4 | navneord: grundspil/pulje |
| U13 - 3400 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U13 - 3000 (4 piger) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| DMU H - U15 8000 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6400 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 6400 4 spillere | Placeringskampe (5. - 7. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 6400 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6400 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 5600 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 5600 4 spillere | Placeringskampe (9. - 14. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 5600 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 4 spillere | Finale slutspil (1. - 7. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 4800 4 spillere | Placeringskampe (15. - 21. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4800 4 spillere | Placeringskampe (22. - 28. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4800 4 spillere | Placeringskampe (8. - 14. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4800 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 4 spillere | Pulje 5 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 4 spillere | Pulje 6 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 4 spillere | Pulje 7 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 4 spillere | Finale slutspil (1. - 3. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 4000 4 spillere | Placeringskampe (10. - 12. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4000 4 spillere | Placeringskampe (4. - 6. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4000 4 spillere | Placeringskampe (7. - 9. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4000 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 4 piger | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 4000 4 piger | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4000 4 piger | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 4 piger | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3400 4 piger | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6800 2+2 | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 6800 2+2 | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 6800 2+2 | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 6800 2+2 | Placeringskamp (7. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 6800 2+2 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6800 2+2 | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 2+2 | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 5600 2+2 | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 5600 2+2 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 2+2 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 2+2 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4+3 | 5. - 6. plads | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4+3 | 7. - 8. plads | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U15 4+3 | Bronzekamp | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 4+3 | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U15 4+3 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4+3 | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U15 (4+3) | Pulje 1501 - BL | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U15 - 8000 (4 spillere) | Pulje 1502 - CSV | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U15 - 8000 (4 spillere) | Pulje 1503 - CSV | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1504 - CSV | grundspil | 2 | 2022–2022 | 11 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1505 -BL | grundspil | 2 | 2022–2022 | 11 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1506 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1507 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1508 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1509 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1510 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1513 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1514 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1515 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1516 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1517 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1518 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1519 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1520 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1521 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1522 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 1523 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 1524 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 1525 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 1526 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 1527 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 1528 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | Pulje 1529 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15 - 3400 (4 piger) | Pulje 1530 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U15C - 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U15B - 4 spillere | U15B - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U15C - 4 spillere | U15C - Nordjysk Mesterskab for hold - Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| U15C - 4 spillere | U15C - Nordjysk Mesterskab for hold - Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U15C - 4 spillere | U15C - Nordjysk Mesterskab for hold - Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U15D - 4 spillere | U15D - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U15 4000 4 Spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U15 4000 4 Spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U15 3400 4 Piger | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U15 - 4+3 | Pulje 2 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U15 - 6800 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U15 - 6800 (2+2) | SM for hold | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U15 - 5600 (2+2) | SM for hold | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U15 - 4800 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U15 - 4800 (2+2) | SM for hold | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U15 - 4000 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U15 - 4000 (4 piger) | SM for hold | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U15 - 6400 (4 spillere) | SM for Hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U15 - 5600 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U15 - 4800 (4 spillere) | Pulje 5 | grundspil | 2 | 2022–2022 | 4 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | SM for Hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U15 - 4000 (4 spillere) | Pulje 4 | grundspil | 2 | 2022–2022 | 4 | navneord: grundspil/pulje |
| U15 - 4000 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U15 - 3400 (4 piger) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| DMU H - U17 4+3 | 5. - 6. plads | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17 4+3 | 7. - 8. plads | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17 4+3 | Bronzekamp | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17 4+3 | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17 4+3 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17 4+3 | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U17 - 4+3 | Pulje 2 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| DMU H - U17/U19 10000 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 8400 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17/U19 8400 4 spillere | Placeringskampe | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 8400 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 8400 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 7200 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17/U19 7200 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 7200 4 spillere | Placeringskampe (9. - 12. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 7200 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 7200 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 7200 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 7200 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6000 4 spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17/U19 6000 4 spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 6000 4 spillere | Placeringskampe (9. - 14. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 6000 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6000 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6000 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6000 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5200 4 spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17/U19 5200 4 spillere | Kvartfinale 1 | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17/U19 5200 4 spillere | Kvartfinale 2 | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17/U19 5200 4 spillere | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 5200 4 spillere | Placeringskampe (13. - 19. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 5200 4 spillere | Placeringskampe (7. - 12. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 5200 4 spillere | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5200 4 spillere | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5200 4 spillere | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5200 4 spillere | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5200 4 spillere | Pulje 5 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5200 4 spillere | Pulje 6 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 8000 2+2 | Finale slutspil (1. - 3. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| DMU H - U17/U19 8000 2+2 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6800 2+2 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 15000 4+2 | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4+2 E (fri) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4+2 M (14.000) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4+2 A (11.800) | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKABER 4+2 A (11.800) | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKABER 4+2 A (11.800) | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKABER 4+2 A (11.800) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4+2 A (11.800) | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4+2 B (10.000) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4+2 C (8.400) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE B (7.300) | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKABER 4 SPILLERE B (7.300) | Finale | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKABER 4 SPILLERE C (6.000) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKABER 4 SPILLERE B (7.300) | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKABER 4 SPILLERE B (7.300) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE C (6.000) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE C (6.000) | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE B (7.300) | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE C (6.000) | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE C (6.000) | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE D (4.800) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2022–2022 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKABER 4 SPILLERE D (4.800) | placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKABER 4 SPILLERE D (4.800) | Placeringskampe (9. - 12. plads) | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKABER 4 SPILLERE D (4.800) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE D (4.800) | Pulje 2 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE D (4.800) | Pulje 3 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 SPILLERE D (4.800) | Pulje 4 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKABER 4 PIGER C-D (4.400) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 9.600 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 6.800 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 5.600 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 8.400 (4 spillere) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 7.200 (4 spillere) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 6.000 (4 spillere) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 5.200 (4 spillere) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere 5.200 | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere D1 | Finale | slutspil | 2 | 2022–2022 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 Spillere D2 | Finale | slutspil | 2 | 2022–2022 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 Spillere D3 | Finale | slutspil | 2 | 2022–2022 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 Spillere D3 | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere D2 | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere D1 | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere D1 | Pulje 2 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere D2 | Pulje 2 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere D3 | Pulje 2 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Piger D2 | Finale | slutspil | 2 | 2022–2022 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 Piger D1 | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Piger D2 | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Piger D2 | Pulje 2 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 2+2 D | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U17/U19B - 4 spillere | U17/U19B - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U17/U19C - 4 spillere | U17/U19C - Nordjysk Mesterskab for hold | andet/ukendt | 2 | 2022–2022 | 2 | ingen sikker nøgle |
| U17/U19 - 15000 (4+2) | Pulje 1702 - BL | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U17/U19 - 10000 (4 spillere) | Pulje 1703 - CSV | grundspil | 2 | 2022–2022 | 13 | navneord: grundspil/pulje |
| U17/U19 - 8400 (4 spillere) | Pulje 1704 - CSV | grundspil | 2 | 2022–2022 | 11 | navneord: grundspil/pulje |
| U17/U19 - 7200 (4 spillere) | Pulje 1705 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U17/U19 - 7200 (4 spillere) | Pulje 1706 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U17/U19 - 6000 (4 spillere) | Pulje 1707 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U17/U19 - 6000 (4 spillere) | Pulje 1708 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 1709 - BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 1710 - CSV | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U17/U19 - 5200 (4 spillere) | Pulje 1711-BL | grundspil | 2 | 2022–2022 | 9 | navneord: grundspil/pulje |
| U17/U19 - 15000 (4+2) | SM for hol | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U17/U19 - 8000 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U17/U19 - 8000 (2+2) | SM for hold | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U17/U19 - 6800 (2+2) | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6800 (2+2) | SM for hold | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U17/U19 - 10000 (4 spillere) | Pulje 1 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6000 (4 spillere) | Pulje 2 | grundspil | 2 | 2022–2022 | 5 | navneord: grundspil/pulje |
| U17/U19 - 6000 (4 spillere) | Sm for hold | andet/ukendt | 2 | 2022–2022 | 5 | ingen sikker nøgle |
| U17/U19 7200 4 Spillere Pulje 1 Ny | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U17/U19 5200 4 Spillere pulje 1 - Ny | Pulje 1 | grundspil | 2 | 2022–2022 | 1 | navneord: grundspil/pulje |
| U15 4800 + U17/U19 - 6000 (4 spillere) | Pulje 1 | grundspil | 2 | 2022–2022 | 2 | navneord: grundspil/pulje |
| U17/U19 - 8400 (4 spillere) | Pulje 1 | grundspil | 2 | 2022–2022 | 4 | navneord: grundspil/pulje |
| U17/U19 - 8400 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U17/U19 - 7200 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| U17/U19 - 5200 (4 spillere) | SM for hold | andet/ukendt | 2 | 2022–2022 | 4 | ingen sikker nøgle |
| Serie 1, vest | Pulje 1 | grundspil | 2 | 2022–2023 | 4 | navneord: grundspil/pulje |
| Serie 1, vest | Pulje 2 | grundspil | 2 | 2022–2023 | 4 | navneord: grundspil/pulje |
| Serie 1, vest | Pulje 3 | grundspil | 2 | 2022–2023 | 4 | navneord: grundspil/pulje |
| Serie 1, vest | Pulje 4 | grundspil | 2 | 2022–2023 | 4 | navneord: grundspil/pulje |
| Serie 1, vest | Pulje 5 | grundspil | 2 | 2022–2023 | 4 | navneord: grundspil/pulje |
| Serie 1, vest | Pulje 6 | grundspil | 2 | 2022–2023 | 4 | navneord: grundspil/pulje |
| Serie 2 | Final 4 - Serie 2 - Nedrykning til Serie 3 | nedrykningsspil | 2 | 2022–2023 | 1 | navneord: nedrykning |
| Serie 2 | Final 4 - Serie 2 - Oprykning til Serie 1 | oprykningsspil | 2 | 2022–2023 | 1 | navneord: oprykning |
| Serie 2 | Final 4 - Serie 2 - Oprykning til Serie 1 - Finale | oprykningsspil | 2 | 2022–2023 | 1 | navneord: oprykning |
| Serie 3 | Final 4 - Serie 3 - Oprykning til Serie 2 | oprykningsspil | 2 | 2022–2023 | 1 | navneord: oprykning |
| Serie 3 | Final 4 - Serie 3 - Oprykning til Serie 2 - Finale | oprykningsspil | 2 | 2022–2023 | 1 | navneord: oprykning |
| Serie A - Double | Final 4 - Serie A double - Nordjysk Mesterskab | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| Serie A - Double | Final 4 - Serie A double - Nordjysk Mesterskab - Finale | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| Serie B - Double | Final 4 - Serie B double - Nordjysk Mesterskab | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| Serie B - Double | Final 4 - Serie B double - Nordjysk Mesterskab - Finale | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| Serie C - Double | Final 4 - Serie C double - Nordjysk Mesterskab - Finale | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| Serie D - Double | Final 4 - Serie D double - Nordjysk Mesterskab - Finale | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| VoksenFjer | Final 4 - VoksenFjer - Nordjysk Mesterskab | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| 4 Herrer A-række | Pulje 1 | grundspil | 2 | 2022–2024 | 5 | navneord: grundspil/pulje |
| Veteran A | Final 4 - Veteran A - Nordjysk Mesterskab | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| Veteran A | Final 4 - Veteran A - Nordjysk Mesterskab - Finale | slutspil | 2 | 2022–2023 | 1 | navneord: slutspil |
| SEN +40 6+4 (5+3) A-række | Pulje 1 | grundspil | 2 | 2022–2023 | 5 | navneord: grundspil/pulje |
| SEN +40 4+2 A-række | Pulje 1 | grundspil | 2 | 2022–2023 | 5 | navneord: grundspil/pulje |
| SEN +40 4+2 B-række | Pulje 1 | grundspil | 2 | 2022–2023 | 5 | navneord: grundspil/pulje |
| SEN +40 4 Herrer A-række | Pulje 1 | grundspil | 2 | 2022–2023 | 5 | navneord: grundspil/pulje |
| SEN +40 4 Herrer B-række | Pulje 1 | grundspil | 2 | 2022–2023 | 5 | navneord: grundspil/pulje |
| SEN +50 4+2 A-række | Pulje 1 | grundspil | 2 | 2022–2023 | 5 | navneord: grundspil/pulje |
| 60+ - A-række | Pulje 1 | grundspil | 2 | 2022–2023 | 1 | navneord: grundspil/pulje |
| 60+ - B-række | Pulje 1 | grundspil | 2 | 2022–2023 | 1 | navneord: grundspil/pulje |
| 60+ - A-række | Pulje 2 | grundspil | 2 | 2022–2023 | 1 | navneord: grundspil/pulje |
| 17+ 4 spillere - Serie 2 (B) | Pulje 1 | grundspil | 2 | 2022–2023 | 1 | navneord: grundspil/pulje |
| DMU H - U09 2800 (4 spillere) | 5. - 6. plads | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U09 2800 (4 spillere) | 7. - 8. plads | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U09 2800 (4 spillere) | 9. - 10. plads | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U09 2800 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U09 2800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U09 2800 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U09 2400 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U09 2400 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U09 2400 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U09 2400 (4 spillere) | Slutspil 5. - 8. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| U9 - 2800/(2400) (4 spillere) | Pulje 901 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U9 - 2800/(2400) (4 spillere) | Pulje 902 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U9 - 2800/(2400) (4 spillere) | Pulje 903 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U9 - 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U9/U11 - Begynderholdturnering - Marts | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U9 - 2800 (4 spillere) | SM Finale U9 2800 | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U9 - 2400 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U9 - 2400 (4 spillere) | SM Finale U9 - 2400 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| DMU H U11 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 4400 (4 spillere) | Finale (1.-2. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 3600 (4 spillere) | Finale slutspil (1.-4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 4400 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3600 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3600 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 4400 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 4400 (4 spillere) | Slutspil 3.-4. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 4400 (4 spillere) | Slutspil 5.-6. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 3600 (4 spillere) | Slutspil 5.-8. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 4400 (4 spillere) | Slutspil 7.-8. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 3200 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 3200 (4 spillere) | Kvartfinale 1 (nr. 1 pulje 1 og 2) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 3200 (4 spillere) | Kvartfinale 2 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 3200 (4 spillere) | Kvartfinale 3 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 3200 (4 spillere) | Kvartfinale 4 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 3200 (4 spillere) | Placeringskamp (5. - 8. plads) | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U11 3200 (4 spillere) | Placeringskampe (nr. 2 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Placeringskampe (nr. 3 puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Pulje 6 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Pulje 7 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 3200 (4 spillere) | Pulje 8 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 2900 (4 spillere) | Kvartfinale 1 (nr. 1 pulje 1 og 2) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 2900 (4 spillere) | Kvartfinale 2 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 2900 (4 spillere) | Kvartfinale 3 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 2900 (4 spillere) | Kvartfinale 4 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U11 2900 (4 spillere) | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U11 2900 (4 spillere) | Placeringskampe (nr. 2 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Placeringskampe (nr. 3 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Pulje 6 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Pulje 7 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2900 (4 spillere) | Pulje 8 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U11 2800 (4 piger) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U11 - 4400 (4 spillere) | Pulje 1114 - CSV | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U11 - 4400 (4 spillere) | Pulje 1114 slutspil A | slutspil | 2 | 2023–2023 | 13 | navneord: slutspil |
| U11 - 4400 (4 spillere) | Pulje 1114 slutspil B | slutspil | 2 | 2023–2023 | 13 | navneord: slutspil |
| U11 - 3600 (4 spillere) | Pulje 1112 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 3600 (4 spillere) | Pulje 1113 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1107 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1108 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1109 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1110 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | Pulje 1111 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 2900 (4 spillere) | Pulje 1102 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 2900 (4 spillere) | Pulje 1103 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 2900 (4 spillere) | Pulje 1104 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 2900 (4 spillere) | Pulje 1105 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 2900 (4 spillere) | Pulje 1106 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - 2800 (4 piger) | Pulje 1101 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - December | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U11C - 4 spillere | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U11 3200 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U11 2900 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U11 2900 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U11 - 4400 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U11 - 4400 4 spillere | SM finale U11 - 4400 4 spillere | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U11 - 3600 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U11 - 3200 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U11 - 3200 4 spillere | Pulje 2 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U11 - 2900 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U11 - 2900 4 spillere | Pulje 2 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U11 - 3200 (4 spillere) | SM finale U11 - 3200 4 spillere | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U11 - 2900 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U11 - 2900 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U11 - 2900 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U11 - 2900 (4 spillere) | SM semifinaler og finale - U11 - 2900 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U11 - 2800 (4 piger) | SM finale U11 - 2800 (4 piger) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| DMU H - U13 (4+3) | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 (4+3) | Finale | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 (4+3) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 (4+3) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 6000 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5000 (4 spillere) | Finale slutspil (1.-4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 5000 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5000 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 5000 (4 spillere) | Slutspil 5.-8. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 4400 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 4400 (4 spillere) | Kvartfinale 1 (nr. 1 pulje 2 og 3) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 4400 (4 spillere) | Kvartfinale 2 (nr. 1 pulje 4 og 5) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 4400 (4 spillere) | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U13 4400 (4 spillere) | Placeringskampe (nr. 2 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 (4 spillere) | Placeringskampe (nr. 3 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 (4 spillere) | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 4400 (4 spillere) | Pulje 6 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 (4 spillere) | Finale slutspil (1.-4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3800 (4 spillere) | Slutspil 13.-16. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3800 (4 spillere) | Slutspil 5.-8. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3800 (4 spillere) | Slutspil 9.-12. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3500 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3500 (4 spillere) | Kvartfinale 1 (nr. 1 pulje 2 og 3) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3500 (4 spillere) | Kvartfinale 2 (nr. pulje 4 og 5) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3500 (4 spillere) | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U13 3500 (4 spillere) | Placeringskampe (nr. 2 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 (4 spillere) | Placeringskampe (nr. 3 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 (4 spillere) | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3500 (4 spillere) | Pulje 6 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3300 (4 spillere) | Kvartfinale 1 (nr. 1 pulje 2 og 3) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3300 (4 spillere) | Kvartfinale 2 (nr. 1 pulje 4 og 5) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3300 (4 spillere) | Kvartfinale 3 (nr. 1 pulje 6 og 7) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3300 (4 spillere) | Placeringskampe (nr. 2 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Placeringskampe (nr. 3 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Placeringskampe 5. - 7. plads | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U13 3300 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Pulje 6 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3300 (4 spillere) | Pulje 7 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3600 (4 piger) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3000 (4 piger) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U13 3000 (4 piger) | Placeringskampe (5. - 7. plads) | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U13 3000 (4 piger) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U13 3000 (4 piger) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U13/U15 - Begynderholdturnering - Marts | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U11B/U13C - 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U13D - 4 spillere | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U13 - 4+3 | Pulje 1301 - BL | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U13 - 5600 (2+2) | Pulje 1302 - TSS | grundspil | 2 | 2023–2023 | 12 | navneord: grundspil/pulje |
| U13 - 6000 (4 spillere) | Pulje 1303 - TSS | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U13 - 5000 (4 spillere) | Pulje 1304 - TSS | grundspil | 2 | 2023–2023 | 11 | navneord: grundspil/pulje |
| U13 - 5000 (4 spillere) | Pulje 1305 - BL | grundspil | 2 | 2023–2023 | 11 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1306 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1307 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1308 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | Pulje 1309 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1310 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1311 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1312 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3800 (4 spillere) | Pulje 1313 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1314 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1315 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1316 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1317 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1318 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1319 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3500 (4 spillere) | Pulje 1320 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3300 (4 spillere) | Pulje 1321 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3300 (4 spillere) | Pulje 1322 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3300 (4 spillere) | Pulje 1323 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3300 (4 spillere) | Pulje 1324 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3300 (4 spillere) | Pulje 1325 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3000 (4 piger) | Pulje 1326 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 - 3000 (4 piger) | Pulje 1327 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U13 3300 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U13 3300 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| BADLF U13 3500 | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U13 - 4+3 | SM Finale U13 4+3 | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U13 - 4800 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U13 - 4800 (2+2) | SM finale U13 - 4800 (2+2) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U13 - 5000 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U13 - 4400 (4 spillere) | SM finale U13 - 4400 (4 spillere) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U13 - 3800 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U13 - 3500 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U13 - 3300 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U13 - 3300 4 spillere | Pulje 2 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U13 - 3600 4 piger | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U13 - 3600 4 piger | SM finale U13 - 3600 4 piger | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U13 - 3000 4 piger | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U13 - 5000 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U13 - 5000 (4 spillere) | SM finale U13 - 5000 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U13 - 3800 (4 spillere) | SM finale U13 - 3800 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U13 - 3500 (4 spillere) | SM finale U13 - 3500 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U13 - 3300 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U13 - 3300 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U13 - 3300 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U13 - 3300 (4 spillere) | SM semifinaler og finale U13 - 3300 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U13 - 3000 (4 piger) | SM finale U13 - 3000 (4 piger) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| DMU H - U15 (4+3) | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 (4+3) | Finale | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 (4+3) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 (4+3) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6600 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 8000 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6400 (4 spillere) | Finale slutspil (1.-4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 6400 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6400 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 6400 (4 spillere) | Slutspil 5.-6. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 6400 (4 spillere) | Slutspil 7.-8. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 5600 (4 spillere) | Finale slutspil (1.-4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 5600 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 5600 (4 spillere) | Slutspil 13.-16. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 5600 (4 spillere) | Slutspil 5.-8. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 5600 (4 spillere) | Slutspil 9.-12. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4800 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4800 (4 spillere) | Kvartfinale 1 (nr. 1 i pulje 1 og 2) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4800 (4 spillere) | Kvartfinale 2 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4800 (4 spillere) | Kvartfinale 3 (nr. 1 i pulje 5 og 6) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4800 (4 spillere) | Kvartfinale 4 (nr. 1 i pulje 7 og 8) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4800 (4 spillere) | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U15 4800 (4 spillere) | Placeringskampe (nr. 2 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Placeringskampe (nr. 3 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Pulje 6 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Pulje 7 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4800 (4 spillere) | Pulje 8 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4200 (4 spillere) | Kvartfinale 1 (Nr. 1 pulje 1 og 2) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4200 (4 spillere) | Kvartfinale 2 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4200 (4 spillere) | Kvartfinale 3 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4200 (4 spillere) | Kvartfinale 4 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4200 (4 spillere) | Placeringskamp (nr. 4 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U15 4200 (4 spillere) | Placeringskampe (nr. 2 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Placeringskampe (nr. 3 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Pulje 6 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Pulje 7 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4200 (4 spillere) | Pulje 8 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3800 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 3800 (4 spillere) | Kvartfinale 1 (nr. 1 pulje 2 og 3) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 3800 (4 spillere) | Kvartfinale 2 (nr. 1 pulje 4 og 5) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 3800 (4 spillere) | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U15 3800 (4 spillere) | Placeringskampe (nr. 2 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3800 (4 spillere) | Placeringskampe (nr. 3 og 4 i puljerne) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3800 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3800 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3800 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3800 (4 spillere) | Pulje 5 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 3800 (4 spillere) | Pulje 6 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 (4 piger) | Finale slutspil (1.-4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 4000 (4 piger) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 (4 piger) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U15 4000 (4 piger) | Slutspil | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U15 3400 (4 piger) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15A - 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15D - 4 piger | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U13/U15 - Begynderholdturnering - December | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15 - Begynderholdturnering - Januar | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15 - 4+3 | Pulje 1501 - BL | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U15 - 8000 (4 spillere) | Pulje 1502 - BL | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1503 - TSS | grundspil | 2 | 2023–2023 | 11 | navneord: grundspil/pulje |
| U15 - 6400 (4 spillere) | Pulje 1504 - BL | grundspil | 2 | 2023–2023 | 11 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1505 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1506 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 5600 (4 spillere) | Pulje 1507 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1508 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1509 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | Pulje 1510 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1513 TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1514 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1515 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1516 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1517 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1518 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1519 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | Pulje 1520 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | Pulje 1521 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | Pulje 1522 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | Pulje 1523 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | Pulje 1524 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | Pulje 1525 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 - 4000 (4 piger) | Pulje 1526 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U15 4200 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15 4200 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15 3800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15 3800 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15 3400 (4 piger) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15 - 4+3 | SM Finale U15 - 4+3 | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U15 - 6600 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U15 - 5600 (2+2) | SM finale U15 - 5600 (2+2) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U13-U15 - 4000 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U15 - 8000 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U15 - 8000 (4 spillere) | SM finale U15 - 8000 (4 spillere) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U15 - 6400 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U15 - 6400 4 spillere | SM finale U15 - 6400 4 spillere | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U15 - 5600 (4 spillere) | SM finale U15 - 5600 (4 spillere) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U15 - 4800 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U15 - 4200 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U15 - 4200 4 spillere | Pulje 2 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U15 - 3800 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U15 - 3800 4 spillere | Pulje 2 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U15 - 4000 4 piger | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U15 - 3400 4 piger | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| BADLF U15 4200 | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U15 - 4800 (4 spillere) | SM finale U15 - 4800 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U15 - 4200 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U15 - 4200 (4 spillere) | SM semifinale og finale U15 - 4200 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U15 - 3800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U15 - 3800 (4 spillere) | SM seminfinaler og finale U15 - 3800 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U15 - 4000 (4 piger) | SM finale U15 - 4000 (4 piger) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U15 - 3400 (4 piger) | SM finale U15 - 3400 (4 piger) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| DMU H - U17 (4+3) | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17 (4+3) | Finale | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17 (4+3) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17 (4+3) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U17 - 4+3 | Pulje 1701 - BL | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U17 - 4+3 | SM Finale U17 - 4+3 | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| DMU H - U17/U19 15000 (4+2) | Bronzekamp 3.-4. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 15000 (4+2) | Finale slutspil (1.-2. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 15000 (4+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 15000 (4+2) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 7800 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 9600 (4 spillere) | Bronzekamp 3.-4. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 9600 (4 spillere) | Finale slutspil (1.-2. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 9600 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 9600 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 8000 (4 spillere) | Bronzekamp (3.-4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 8000 (4 spillere) | Finale (1.-2. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 8000 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 8000 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6600 (4 spillere) | Finale slutspil (1.-4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 6600 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6600 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6600 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6600 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 6600 (4 spillere) | Slutspil 13.-16. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 6600 (4 spillere) | Slutspil 5.-8. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 6600 (4 spillere) | Slutspil 9.-12. plads | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 5600 (4 spillere) | 5. - 8. plads | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 5600 (4 spillere) | 9. - 12. plads | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 5600 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 5600 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5600 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5600 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 5600 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 4800 (4 spillere) | 5. - 8. plads | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 4800 (4 spillere) | 9. - 13. plads | andet/ukendt | 2 | 2023–2023 | 2 | ingen sikker nøgle |
| DMU H - U17/U19 4800 (4 spillere) | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| DMU H - U17/U19 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 4800 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 4800 (4 spillere) | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DMU H - U17/U19 4800 (4 spillere) | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) E/M | Finale slutspil (1. - 8. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) E/M | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) E/M | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) A | Bronzekamp ((nr. 2 i puljen) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) A | Finale (puljevindere) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) A | Placeringskamp (nr. 3 i puljen) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) A | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) A | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) B | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4+2) C | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) M | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) A | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) B | Bronzekamp (nr. 2 i puljen) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) B | Finale (nr. 1 i puljen) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) B | Placeringskamp (nr. 3 i puljen) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) B | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) B | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) C | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) C | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) C | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) C | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) C | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) D | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2023–2023 | 2 | navneord: slutspil |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) D | Placeringskamp (nr. 2 i puljen) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) D | Placeringskamp (nr. 3 i puljen) | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) D | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) D | Pulje 2 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) D | Pulje 3 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4spillere) D | Pulje 4 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| VICTOR EFTERSKOLEMESTERSKABER (4Piger) C/D | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 4+2 (12.000) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 4+2 (10.000) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 4+2 (8.400) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 4 spillere (8.000) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 4 spillere (5.600) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 4 spillere (4.800) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 4 spillere (4.200) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere 4.800 | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere Beg. 1 | Finale | slutspil | 2 | 2023–2023 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 Spillere Beg. 1 | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere Beg. 1 | Pulje 2 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere Beg. 2 | Finale | slutspil | 2 | 2023–2023 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 Spillere Beg. Do. | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere Beg. 2 | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 Spillere Beg. 2 | Pulje 2 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U17/U19 - 15000 (4+2) | Pulje 1702 - TSS | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U17/U19 - 9600 (4 spillere) | Pulje 1703 - TSS | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U17/U19 - 9600 (4 spillere) | Pulje 1703 slutspil A | slutspil | 2 | 2023–2023 | 13 | navneord: slutspil |
| U17/U19 - 9600 (4 spillere) | Pulje 1703 slutspil B | slutspil | 2 | 2023–2023 | 13 | navneord: slutspil |
| U17/U19 - 8000 (4 spillere) | Pulje 1704 - TSS | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U17/U19 - 8000 (4 spillere) | Pulje 1705 - BL | grundspil | 2 | 2023–2023 | 13 | navneord: grundspil/pulje |
| U17/U19 - 6600 (4 spillere) | Pulje 1706 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U17/U19 - 6600 (4 spillere) | Pulje 1707 -TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U17/U19 - 5600 (4 spillere) | Pulje 1708 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U17/U19 - 5600 (4 spillere) | Pulje 1709 - CSV | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U17/U19 - 5600 (4 spillere) | Pulje 1710 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U17/U19 - 4800 (4 spillere) | Pulje 1711 - TSS | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U17/U19 - 4800 (4 spillere) | Pulje 1712 - BL | grundspil | 2 | 2023–2023 | 9 | navneord: grundspil/pulje |
| U17/19 6600 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U17/19 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 2 | navneord: grundspil/pulje |
| U17/U19 - 7800 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U17/U19 - 7800 (2+2) | Pulje 2 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U17/U19 - 7800 (2+2) | SM finale U17/U19 - 7800 (2+2) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U17/U19 - 5600 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U17/U19 - 5600 (2+2) | SM finale U17/U19 - 5600 (2+2) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U15 - U17/U19 - 4800 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U15 - U17/U19 - 4800 (2+2) | SM finale U15 - U17/U19 - 4800 (2+2) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U17/U19 - 9600 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U17/U19 - 9600 4 spillere | SM finale U17/U19 - 9600 4 spillere | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U17/U19 - 8000 (4 spillere) | SM finale U17/U19 - 8000 4 spillere | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U17/U19 - 6600 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U17/U19 - 5600 (4 spillere) | SM finale U17/U19 - 5600 (4 spillere) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U17/U19 - 4800 4 spillere | Pulje 1 | grundspil | 2 | 2023–2023 | 1 | navneord: grundspil/pulje |
| U17/U19 - 4200 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U17/U19 - 4200 (4 spillere) | SM finale U17/U19 - 4200 (4 spillere) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U17/U19 - 6600 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U17/U19 - 6600 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 4 | navneord: grundspil/pulje |
| U17/U19 - 6600 (4 spillere) | SM finale U17/U19 - 6600 (4 spillere) | slutspil | 2 | 2023–2023 | 4 | navneord: slutspil |
| U17/U19 - 15000 (4+2) | SM finale U17/U19 - 15000 (4+2) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U17/U19 - 6600 (2+2) | Pulje 1 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U17/U19 - 6600 (2+2) | SM finale U17/U19 - 6600 (2+2) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| U17/U19 - 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U17/U19 - 4800 (4 spillere) | Pulje 2 | grundspil | 2 | 2023–2023 | 3 | navneord: grundspil/pulje |
| U17/U19 - 4800 (4 spillere) | SM finale U17/U19 - 4800 (4 spillere) | slutspil | 2 | 2023–2023 | 3 | navneord: slutspil |
| Kredsserien Vest | Kvalifikation til Danmarksserien pulje A | andet/ukendt | 2 | 2023–2024 | 4 | kvalifikation uden retning |
| Kredsserien Vest | Kvalifikation til Danmarksserien pulje B | andet/ukendt | 2 | 2023–2024 | 4 | kvalifikation uden retning |
| Kredsserien Vest | Nedrykning fra Kredsserien pulje A | nedrykningsspil | 2 | 2023–2024 | 4 | navneord: nedrykning |
| Kredsserien Vest | Nedrykning fra Kredsserien pulje B | nedrykningsspil | 2 | 2023–2024 | 4 | navneord: nedrykning |
| Senior A (4+2) | Pulje 101 (AT) | grundspil | 2 | 2023–2024 | 9 | navneord: grundspil/pulje |
| Senior A (4 spillere) - Single/double | Pulje 111 (AT) | grundspil | 2 | 2023–2024 | 9 | navneord: grundspil/pulje |
| Serie B/C - Single + Double | Pulje 1 | grundspil | 2 | 2023–2024 | 1 | navneord: grundspil/pulje |
| 4+2 Nord | Pulje 1 | grundspil | 2 | 2023–2024 | 5 | navneord: grundspil/pulje |
| 6+4 (5+3) Mesterrække | Pulje 1 | grundspil | 2 | 2023–2024 | 5 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 4 | Pulje 3 | grundspil | 2 | 2023–2024 | 1 | navneord: grundspil/pulje |
| DMU Hold U9C-D (3200) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U9D (2800) 4 Spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U9D (2800) 4 Spillere | Kvartfinale 1 (Nr. 1 pulje 1 og nr. 2 pulje 4) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U9D (2800) 4 Spillere | Kvartfinale 2 (nr. 1 pulje 2 og nr. 2 pulje 3) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U9D (2800) 4 Spillere | Kvartfinale 3 (nr. 1 pulje 3 og nr. 2 pulje 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U9D (2800) 4 Spillere | Kvartfinale 4 (nr. 1 pulje 4 og nr. 2 pulje 1) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U9D (2800) 4 Spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U9D (2800) 4 Spillere | Placeringskampe (9. - 14. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U9D (2800) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U9D (2800) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U9D (2800) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U9D (2800) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U09 C-D (3200) 4 Spillere | Pulje 901 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U09 D (2800) 4 Spillere | Pulje 902 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U09 D (2800) 4 Spillere | Pulje 903 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U09 D (2800) 4 Spillere | Pulje 904 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U9 D (2800) - 4 spillere | Nordjysk Mesterskab - U9D | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U9 D (2800) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering - 9. marts | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering - 23. marts | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U9 D (2800) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U9 C-D 3200 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U9 D 2800 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U9 D 2800 (4 spillere). | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U9 D, 2800 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U9 D, 2800 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 3 | navneord: slutspil |
| DMU Hold U11 4+2 | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11 4+2 | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11C (4000) 4 Spillere | Finale slutspil (1. - 4. plads) NY | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C (4000) 4 Spillere | Kvartfinale 2 (nr. 1 pulje 2 og nr. 2 puljje 3) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C (4000) 4 Spillere | Kvartfinale 1 (nr. 1 pulje 1 og nr. 2 pulje 4) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C (4000) 4 Spillere | Kvartfinale 3 (nr. 1 pulje 2 og nr. 2 pulje 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C (4000) 4 Spillere | Kvartfinale 4 (nr. 1 pulje 4 og nr. 2 pulje 1) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C (4000) 4 Spillere | Placeringskampe (5. - 8. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11C (4000) 4 Spillere | Placeringskampe (9. - 12. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11C (4000) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C (4000) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C (4000) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C (4000) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C-D (3400) 4 Spillere | Finaleslutspil (1. - 4. plads) NY | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C-D (3400) 4 Spillere | Kvartfinale 1 (nr. 1 pulje 1 og nr. 2 pulje 4) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C-D (3400) 4 Spillere | Kvartfinale 2 (nr. 1 pulje 2 og nr. 2 pulje 3) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C-D (3400) 4 Spillere | Kvartfinale 3 (nr. 1 pulje 3 og nr. 2 pulje 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C-D (3400) 4 Spillere | kvartfinale 4 (nr. 1 pulje 4 og nr. 2 pulje 1) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11C-D (3400) 4 Spillere | Placeringskampe (5. - 8. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11C-D (3400) 4 Spillere | Placeringskampe (9. - 12. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11C-D (3400) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C-D (3400) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C-D (3400) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C-D (3400) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11D (3200) 4 Spillere | Finaleslutspil (1. - 4. plads) NY | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11D (3200) 4 Spillere | Kvartfinale 1 (nr. 1 pulje 2 og 3) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11D (3200) 4 Spillere | Kvartfinale 2 (nr. 1 pulje 4 og 5) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11D (3200) 4 Spillere | kvartfinale 3 (nr. 1 pulje 6 og pulje 7) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U11D (3200) 4 Spillere | Placeringskamp (5. - 7. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11D (3200) 4 Spillere | Placeringskampe for 2'ere (8. - 14. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11D (3200) 4 Spillere | Placeringskampe for 3'ere (15. - 21. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11D (3200) 4 Spillere | Placeringskampe for 4'ere (22. - 27. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U11D (3200) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11D (3200) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11D (3200) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11D (3200) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11D (3200) 4 Spillere | Pulje 5 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11D (3200) 4 Spillere | Pulje 6 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U11D (3200) 4 Spillere | Pulje 7 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (2800) 4 Piger | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 (4+2) | Pulje 1101 - Niels | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U11 C (4000) 4 Spillere | Pulje 1102 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 C (4000) 4 Spillere | Pulje 1103 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 C-D (3400) 4 Spillere | Pulje 1104 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 C-D (3400) 4 Spillere | Pulje 1104 slutspil A | slutspil | 2 | 2024–2024 | 8 | navneord: slutspil |
| U11 C-D (3400) 4 Spillere | Pulje 1104 slutspil B | slutspil | 2 | 2024–2024 | 8 | navneord: slutspil |
| U11 C-D (3400) 4 Spillere | Pulje 1104 slutspil C | slutspil | 2 | 2024–2024 | 8 | navneord: slutspil |
| U11 C-D (3400) 4 Spillere | Pulje 1105 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1106 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1107 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1108 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1109 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1110 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1111 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1112 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1113 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 D (3200) 4 Spillere | Pulje 1114 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - 9. marts | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - 23. marts | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - 23. marts | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - 9. marts | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - 9. marts | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 C-D (3400) - 4 spillere | Nordjysk Mesterskab - U11 C-D | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U11 C-D (3400) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 D (3200) - 4 spillere | Nordjysk Mesterskab - U11D | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U11 D (3200) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 D (3200) - 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 D (3200) - 4 spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 D (3200) - 4 spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 C-D (3400) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 D (3200) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 D (3200) 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 D (3200) 4 spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U11 C 4000 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 C-D 3400 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 D 2800 (4 piger). | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U11 D 3200 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 D 3200 (4 spillere). | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 D 2800 (4 piger). | Pulje 2 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U11 D 3200 (4 spillere). | Pulje 3 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U11 D 2800 (4 piger). | Pulje 3 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U11 D 2800 (4 piger). | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| 3200 (D) | U11 3200 | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| U11 C, 4000 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U11 C, 4000 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 3 | navneord: slutspil |
| U11 C-D, 3400 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U11 C-D, 3400 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 3 | navneord: slutspil |
| U11 D, 3200 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U11 D, 3200 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U11 D, 3200 (4 spillere) | Pulje 3 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U11 D, 3200 (4 spillere) | Pulje 4 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U11 D, 3200 (4 spillere) | SM-Finalestævne | slutspil | 2 | 2024–2024 | 3 | navneord: slutspil |
| DMU Hold - U13 (4+3) | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U13 (4+3) | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U13 (4+3) | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U13 (4+3) | Placeringskamp (7. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U13 (4+3) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U13 (4+3) | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13A 2+2 (5600) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13A (6000) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13B (5000) 4 Spillere | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13B (5000) 4 Spillere | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13B (5000) 4 Spillere | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13B (5000) 4 Spillere | Placeringskamp (7. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13B (5000) 4 Spillere | Placeringskamp (9. - 10. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13B (5000) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13B (5000) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (4200) 4 Spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13C (4200) 4 Spillere | Placeeringskampe for 3'ere (9. - 12. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13C (4200) 4 Spillere | Placeringskampe for 2'ere (5. - 8. pladsen) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13C (4200) 4 Spillere | Placeringskampe for 4'ere (13. - 16. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13C (4200) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (4200) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (4200) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (4200) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C-D (3800) 4 Spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13C-D (3800) 4 Spillere | Kvartfinale 1 (nr. 1 pulje 1 og nr.2 pulje 4) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13C-D (3800) 4 Spillere | Kvartfinale 2 (nr. 1 pulje 2 og nr. 2 pulje 3) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13C-D (3800) 4 Spillere | Kvartfinale 3 (nr. 1 pulje 3 og nr. 2 pulje 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13C-D (3800) 4 Spillere | Kvartfinale 4 (nr. 1 pulje 4 og nr. 2 pulje 1) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13C-D (3800) 4 Spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13C-D (3800) 4 Spillere | Placeringskampe (9. - 14. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13C-D (3800) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C-D (3800) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C-D (3800) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C-D (3800) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (3600) 4 Spillere | Finaleslutspil (1. - 4. plads) NY | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13D (3600) 4 Spillere | Kvartfinale 1 (nr. 1 pulje 2 og 3) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13D (3600) 4 Spillere | Kvartfinale 2 (nr. 1 pulje 4 og 5) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13D (3600) 4 Spillere | Kvartfinale 3 (nr. 1 pulje 6 og 7) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold U13D (3600) 4 Spillere | Placeringskamp (5. - 7. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13D (3600) 4 Spillere | Placeringskampe for 2'ere (8. - 14. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13D (3600) 4 Spillere | Placeringskampe for 3'ere (15. - 21. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13D (3600) 4 Spillere | Placeringskampe for 4'ere (22. - 28. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold U13D (3600) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (3600) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (3600) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (3600) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (3600) 4 Spillere | Pulje 5 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (3600) 4 Spillere | Pulje 6 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (3600) 4 Spillere | Pulje 7 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U13D (3200) 4 Piger | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U13C (3800) 4 Piger | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U13C (3800) 4 Piger | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U13D (3200) 4 Piger | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U13D (3200) 4 Piger | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U13C (3800) 4 Piger | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U13C (3800) 4 Piger | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U13D (3200) 4 Piger | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13/U15 - Begynderholdturnering - Januar | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13 / U15 - Begynderholdturnering - 9. marts | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13 / U15 - Begynderholdturnering - 23. marts | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13 (4+3) | Pulje 1301 - Christina | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U13 A (6000) 4 Spillere | Pulje 1302 - Christina | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U13 A (6000) 4 Spillere | Pulje 1303 - Christina | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U13 B (5000) - 4 spillere | Nordjysk Mesterskab - U13B | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U13 B (5000) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 C (4200) - 4 spillere | Nordjysk Mesterskab - U13C | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U13 C (4200) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 C-D (3800) - 4 spillere | Nordjysk Mesterskab - U13 C-D | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U13 C-D (3800) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 C-D (3800) - 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 D (3600) - 4 spillere | Nordjysk Mesterskab - U13D | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U13 D (3600) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 D (3600) - 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 D (3600) - 4 spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 D (3600) - 4 spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 D (3200) - 4 piger | Nordjysk Mesterskab - U13D Piger | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U13 D (3200) - 4 piger | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 B (5000) 4 Spillere | Pulje 1304 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 B (5000) 4 Spillere | Pulje 1305 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C (4200) 4 Spillere | Pulje 1306 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C (4200) 4 Spillere | Pulje 1307 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C (4200) 4 Spillere | Pulje 1308 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C (4200) 4 Spillere | Pulje 1309 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C-D (3800) 4 Spillere | Pulje 1310 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C-D (3800) 4 Spillere | Pulje 1311 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C-D (3800) 4 Spillere | Pulje 1312 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C-D (3800) 4 Spillere | Pulje 1313 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1314 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1315 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1316 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1317 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1318 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1319 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1320 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1321 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1322 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3600) 4 Spillere | Pulje 1323 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 C (3800) 4 Piger | Pulje 1324 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13 D (3200) 4 Piger | Pulje 1325 - Christina | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U13CD (3800) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13C (4200) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13D (3600) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13D (3600) 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13D (3600) 4 spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U13 C 3800 (4 piger). | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U13 D 3600 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 D 3600 (4 spillere). | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 D 3600 (4 spillere). | Pulje 3 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| UGE 38 - U13 C, 4000 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| UGE 38 - U13 D, 3600 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 A, 5600 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 A, 5600 (2+2) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U13 B, 4700 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 B, 4700 (2+2) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U13 A, 6000 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 A, 6000 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U13 B, 5000 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 B, 5000 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 B, 5000 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U13 C, 4200 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 6 | navneord: grundspil/pulje |
| U13 C, 4200 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 6 | navneord: grundspil/pulje |
| U13 C, 4200 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 6 | navneord: slutspil |
| U13 C-D, 3800 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 C-D, 3800 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 C-D, 3800 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U13 D, 3200 (4 piger) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 D, 3200 (4 piger) | Pulje 2 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U13 D, 3200 (4 piger) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U13 D, 3600 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U13 D, 3600 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U13 D, 3600 (4 spillere) | Pulje 3 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U13 D, 3600 (4 spillere) | Pulje 4 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U13 D, 3600 (4 spillere) | Pulje 5 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U13 D, 3600 (4 spillere) | Pulje 6 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U13 D, 3600 (4 spillere) | Pulje 7 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U13 D, 3600 (4 spillere) | SM-Slutspil | slutspil | 2 | 2024–2024 | 5 | navneord: slutspil |
| DMU Hold - U15 (4+3) | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15 (4+3) | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15 (4+3) | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15 (4+3) | Placeringskamp (7. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15 (4+3) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15 (4+3) | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15M 2+2 (7800) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15A 2+2 (6500) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15B 2+2 (5400) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15A (7200) 4 Spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15A (7200) 4 Spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15A (7200) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15A (7200) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15B (6000) 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15B (6000) 4 Spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15B (6000) 4 Spillere | Placeringskampe (9. - 13. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15B (6000) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15B (6000) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15B (6000) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15B (6000) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C (4800) 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15C (4800) 4 Spillere | Kvartfinale (nr. 1 pulje 4 og pulje5) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15C (4800) 4 Spillere | Placeeringskampe (5. - 10. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15C (4800) 4 Spillere | Placeringskampe (11. - 17. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15C (4800) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C (4800) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C (4800) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C (4800) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C (4800) 4 Spillere | Pulje 5 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C-D (4200) 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15C-D (4200) 4 Spillere | Placeingskampe (9. - 12. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15C-D (4200) 4 Spillere | Placeringskampe (13. - 15. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15C-D (4200) 4 Spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15C-D (4200) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C-D (4200) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C-D (4200) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C-D (4200) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (4000) 4 Spillere | Finaleslutspil (1. - 4. plads) NY | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale A-1 (nr. 1 pulje 1 og 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale B-1 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale C-1 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale D-1 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale E-2 (nr. 2 pulje 1 og 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale F-2 (nr. 2 pulje 3 og 4) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale G-2 (nr. 2 pulje 5 og 6) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale H-2 (nr. 2 pulje 7 og 8) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale I-3 (nr. 3 pulje 1 og 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | kvartfinale J-3 (nr. 3 pulje 3 og 4) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale K-3 (nr. 3 pulje 5 og 6) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Kvartfinale L-3 (nr. 3 pulje 7 og 8) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (4000) 4 Spillere | Placeringskampe (13. - 16. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15D (4000) 4 Spillere | Placeringskampe (17. - 20. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15D (4000) 4 Spillere | Placeringskampe (21. - 24. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15D (4000) 4 Spillere | Placeringskampe (5. - 8. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15D (4000) 4 Spillere | Placeringskampe (9. - 12. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15D (4000) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (4000) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (4000) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (4000) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (4000) 4 Spillere | Pulje 5 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (4000) 4 Spillere | Pulje 6 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (4000) 4 Spillere | Pulje 7 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (4000) 4 Spillere | Pulje 8 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C (4200) 4 Piger | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15C (4200) 4 Piger | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15C (4200) 4 Piger | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15C (4200) 4 Piger | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (3600) 4 Piger | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U15D (3600) 4 Piger | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U15D (3600) 4 Piger | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U15D (3600) 4 Piger | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U15 (4+3) | Pulje 1501 - Kristian | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U15 A/B, 6500/5400 (2+2) | Pulje 1502 - Kristian | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U15 A/B, 6500/5400 (2+2) | Pulje 1502 slutspil A | slutspil | 2 | 2024–2024 | 12 | navneord: slutspil |
| U15 A/B, 6500/5400 (2+2) | Pulje 1502 slutspil B | slutspil | 2 | 2024–2024 | 12 | navneord: slutspil |
| U15 A (7200) 4 Spillere | Pulje 1503 - Kristian | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U15 A (7200) 4 Spillere | Pulje 1504 - Kristian | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U15 B (6000) 4 Spillere | Pulje 1505 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 B (6000) 4 Spillere | Pulje 1506 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 B (6000) 4 Spillere | Pulje 1507 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C (4800) 4 Spillere | Pulje 1508 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C (4800) 4 Spillere | Pulje 1509 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C (4800) 4 Spillere | Pulje 1510 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C (4800) 4 Spillere | Pulje 1511 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C (4800) 4 Spillere | Pulje 1512 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C (4800) 4 Spillere | Pulje 1513 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C-D (4200) 4 Spillere | Pulje 1514 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C-D (4200) 4 Spillere | Pulje 1515 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C-D (4200) 4 Spillere | Pulje 1516 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 C-D (4200) 4 Spillere | Pulje 1517 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1518 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1519 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1520 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1521 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1522 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1523 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1524 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1525 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (4000) 4 Spillere | Pulje 1526 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (3600) 4 Piger | Pulje 1527 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 D (3600) 4 Piger | Pulje 1528 - Kristian | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U15 B (6000) - 4 spillere | Nordjysk Mesterskab - U15B | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U15 B (6000) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 C (4800) - 4 spillere | Nordjysk Mesterskab - U15C | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U15 C (4800) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 C (4800) - 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 C-D (4200) - 4 spillere | Nordjysk Mesterskab - U15 C-D | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U15 C-D (4200) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 D (4000) - 4 spillere | Nordjysk Mesterskab - U15D - Finale | slutspil | 2 | 2024–2024 | 1 | navneord: slutspil |
| U15 D (4000) - 4 spillere | Nordjysk Mesterskab - U15D - Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 D (4000) - 4 spillere | Nordjysk Mesterskab - U15D - Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 D (4000) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 D (4000) - 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 D (4000) - 4 spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U13 C (3800) / U15 D (3600) - 4 piger | Nordjysk Mesterskab - U13C / U15D piger | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U13 C (3800) / U15 D (3600) - 4 piger | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 C (4800) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U15 C (4800) 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U15 C-D (4200) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U15 D (3600) 4 piger | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U15 D (4000) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U15 B (6000) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U15 C (4200) 4 piger | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U15 D (4000) 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U15 D (4000) 4 spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U15 A 7200 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U15 B 6000 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 C 4800 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 C-D 4200 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U15 D 4000 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| UGE 38 - U15 A, 6500 (2+2 | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| UGE 38 - U15 C, 4600 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| UGE 38 - U15 D, 4000 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U15 A, 6500 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U15 A, 6500 (2+2) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U15 B, 5400 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U15 B, 5400 (2+2) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U15 C, 4200 (4 piger) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U15 C, 4200 (4 piger) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U15 D, 3600 (4 piger) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U15 D, 3600 (4 piger) | Pulje 2 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U15 D, 3600 (4 piger) | SM-Finalespil | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U15 C, 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 C, 4800 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 C, 4800 (4 spillere) | Pulje 3 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 C, 4800 (4 spillere) | SM-Finalespil | slutspil | 2 | 2024–2024 | 5 | navneord: slutspil |
| U15 C-D, 4200 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 C-D, 4200 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 C-D, 4200 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 5 | navneord: slutspil |
| U15 D, 4000 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 D, 4000 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 D, 4000 (4 spillere) | Pulje 3 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 D, 4000 (4 spillere) | Pulje 4 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 D, 4000 (4 spillere) | Pulje 5 | grundspil | 2 | 2024–2024 | 5 | navneord: grundspil/pulje |
| U15 D, 4000 (4 spillere) | Slutspil | slutspil | 2 | 2024–2024 | 5 | navneord: slutspil |
| U15 B, 6000 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U15 B, 6000 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 3 | navneord: slutspil |
| DMU Hold - U17 (4+3) | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17 (4+3) | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17 (4+3) | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17 (4+3) | Placeringskamp (7. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17 (4+3) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17 (4+3) | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U17 (4+3) | Pulje 1701 - Niels | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| DMU Hold - U17/U19 M 4+2 (15000) | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19 M 4+2 (15000) | Finaleslutspil (1. - 4. plads) NY | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19 M 4+2 (15000) | Kvartfinale 1 (nr. 2 pulje 1 og nr. 3 pulje 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19 M 4+2 (15000) | Kvartfinale 2 (nr. 3 pulje 1 og nr. 2 pulje 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19 M 4+2 (15000) | Placeringskamp (5. - 6. pladsen) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17/U19 M 4+2 (15000) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19 M 4+2 (15000) | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19A 2+2 (7800) | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19M (10000) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19A (8600) 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19A (8600) 4 Spillere | Finaleslutspil (1. - 4. plads) NY | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19A (8600) 4 Spillere | Kvartfinale 1 (nr. 2 pulje 1 og nr. 3 pulje 2) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19A (8600) 4 Spillere | Kvartfinale 2 (nr. 2 pulje 2 og nr. 3 pulje 1) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19A (8600) 4 Spillere | Placeringskamp (5. - 6. plads) NY | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17/U19A (8600) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19A (8600) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19B (7200) 4 Spillere | Finale slutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19B (7200) 4 Spillere | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17/U19B (7200) 4 Spillere | Placeringskamp (7. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17/U19B (7200) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19B (7200) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19C (6000) 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19C (6000) 4 Spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17/U19C (6000) 4 Spillere | Placeringskampe (9. - 14. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17/U19C (6000) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19C (6000) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19C (6000) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19C (6000) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19C-D (5000) 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19C-D (5000) 4 Spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17/U19C-D (5000) 4 Spillere | Placeringskampe (9. - 13. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| DMU Hold - U17/U19C-D (5000) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19C-D (5000) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19C-D (5000) 4 Spillere | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19C-D (5000) 4 Spillere | Pulje 4 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19D (4600) 4 Spillere | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19D (4600) 4 Spillere | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| DMU Hold - U17/U19D (4600) 4 Spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DMU Hold - U17/U19D (4600) 4 Spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 ELITE | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 M | Bronzekamp | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4+2 M | Finale | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4+2 M | Placeringskamp | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKAB 4+2 M | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 M | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 A | Ekstra kampe for 2'erer og 3'ere i pulje 2 og 3) | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 A | Finaleslutspil (1. - 3. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4+2 A | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 A | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-M | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-A | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-B | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-C | Bronzekamp | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4 SP.-C | Finale | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4 SP.-C | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-C | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U17/U19 EFTERSKOLEMESTERSKAB 4 SP. C-D | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| U17/U19 EFTERSKOLEMESTERSKAB 4 SP. C-D | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| U17/U19 EFTERSKOLEMESTERSKAB 4 SP. C-D | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| U17/U19 EFTERSKOLEMESTERSKAB 4 SP. C-D | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U17/U19 EFTERSKOLEMESTERSKAB 4 SP. C-D | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-D | Ekstra kampe for 2'erer og 3'ere i pulje 2 og 3) | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-D | Finaleslutspil (1. - 3. plads) | slutspil | 2 | 2024–2024 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4 SP.-D | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-D | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 SP.-D | Pulje 3 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4 PIGER-D | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| EFTERSKOLER 4+2 M (15.000) | 4+2 M (15.000) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4+2 A (12.000) | 4+2 A (12.000) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4+2 B (10.000) | 4+2 B (10.000) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4+2 C (8.400) | 4+2 C (8.400) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4 Spillere M (10.000) | 4 M (10.000) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4 Spillere A-B (8.000) | 4 A-B (8.000) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4 Spillere C (6.000) | 4C - (6.000) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4 Spillere C-D (5.000) | 4 C-D (5.000) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| EFTERSKOLER 4 Spillere D (4.600) | 4 D (4.600) | andet/ukendt | 2 | 2024–2024 | 2 | ingen sikker nøgle |
| U17/U19 M, 15000 (4+2) | Pulje 1702 - Niels | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U17/U19 M (10000) 4 Spillere | Placeringskamp | andet/ukendt | 2 | 2024–2024 | 12 | ingen sikker nøgle |
| U17/U19 M (10000) 4 Spillere | Pulje 1703 - Niels | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U17/U19 M (10000) 4 Spillere | Slutspil Cup | slutspil | 2 | 2024–2024 | 12 | navneord: slutspil |
| U17/U19 A (8600) 4 Spillere | Pulje 1704 - Niels | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U17/U19 A (8600) 4 Spillere | Pulje 1705 - Niels | grundspil | 2 | 2024–2024 | 12 | navneord: grundspil/pulje |
| U17/U19 B (7200) 4 Spillere | Pulje 1706 - Niels | grundspil | 2 | 2024–2024 | 10 | navneord: grundspil/pulje |
| U17/U19 B (7200) 4 Spillere | Pulje 1707 - Niels | grundspil | 2 | 2024–2024 | 10 | navneord: grundspil/pulje |
| U17/U19 C (6000) 4 Spillere | Pulje 1708 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U17/U19 C (6000) 4 Spillere | Pulje 1709 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U17/U19 C (6000) 4 Spillere | Pulje 1710 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U17/U19 C-D/D (5000) 4 Spillere | Pulje 1711 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U17/U19 C-D/D (5000) 4 Spillere | Pulje 1712 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| U17/U19 D (4600) 4 Spillere | Pulje 1713 - Niels | grundspil | 2 | 2024–2024 | 8 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4D (single/double) | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 sp. beg. 1 (single/double) | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 sp. beg. 2 (single/double) | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 sp. beg. (4 doubler) | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 Piger beg. (4 doubler) | Finale (1. - 2. plads) | slutspil | 2 | 2024–2024 | 1 | navneord: slutspil |
| &#216;M EFTERSKOLER 4 Piger beg. (4 doubler) | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 sp. beg. (4 doubler) | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 sp. beg. 2 (single/double) | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER Piger 4D (single/double) | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4 sp. beg. 1 (single/double) | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4C (single/double) | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| &#216;M EFTERSKOLER 4D (single/double) | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U17/U19 B (7200) - 4 spillere | Nordjysk Mesterskab - U17/U19B | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U17/U19 B (7200) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U17/U19 C (6000) - 4 spillere | Nordjysk Mesterskab - U17/U19C | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U17/U19 C (6000) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U17/U19 C-D (5000) - 4 spillere | Nordjysk Mesterskab - U17/U19 C-D | andet/ukendt | 2 | 2024–2024 | 1 | ingen sikker nøgle |
| U17/U19 C-D (5000) - 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U17/U19 C-D (5000) - 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 1 | navneord: grundspil/pulje |
| U17/19 C-D (5000) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U17/19 D (4600) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U17/19 C (6000) 4 spillere | Pulje 1 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| U17/19 D (4600) 4 spillere | Pulje 2 | grundspil | 2 | 2024–2024 | 2 | navneord: grundspil/pulje |
| 8600 (4 spillere). | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| UGE 38 - A, 7800 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| UGE 38 - C, 5600 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| M, 15000 (4+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| M, 15000 (4+2) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| A, 7800 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| D, 4800 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| D, 4800 (2+2) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U17/U19 C, 6000 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U17/U19 C, 6000 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U17/U19 C, 6000 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U17/U19 C-D, 5000 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 6 | navneord: grundspil/pulje |
| U17/U19 C-D, 5000 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 6 | navneord: grundspil/pulje |
| U17/U19 C-D, 5000 (4 spillere) | SM-finalespil | slutspil | 2 | 2024–2024 | 6 | navneord: slutspil |
| U17/U19 D, 4600 (4 spillere) | Pulje 1 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U17/U19 D, 4600 (4 spillere) | Pulje 2 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U17/U19 D, 4600 (4 spillere) | Pulje 3 | grundspil | 2 | 2024–2024 | 4 | navneord: grundspil/pulje |
| U17/U19 D, 4600 (4 spillere) | SM-Finalespil | slutspil | 2 | 2024–2024 | 4 | navneord: slutspil |
| U17/U19 B, 6600 (2+2) | Pulje 1 | grundspil | 2 | 2024–2024 | 3 | navneord: grundspil/pulje |
| U17/U19 B, 6600 (2+2) | SM-Finale | slutspil | 2 | 2024–2024 | 3 | navneord: slutspil |
| U17/U19 A, 8600 (4 spillere) | SM-Finale | slutspil | 2 | 2024–2024 | 1 | navneord: slutspil |
| Badmintonligaen | Kvalifikationskamp liga/1. division | kvalifikation_op | 2 | 2024–2025 | 1 | navneord: kvalifikation + op |
| Danmarksserien (oversidder-runde) | Oversidder-runder/papirhold | grundspil | 2 | 2024–2025 | 1 | navneord: grundspil/pulje |
| Kredsserien Vest | Kvalifikationskampe | andet/ukendt | 2 | 2024–2025 | 4 | kvalifikation uden retning |
| 40+ Hr - C | Pulje 1 | grundspil | 2 | 2024–2025 | 2 | navneord: grundspil/pulje |
| &#216;vre slutspil 50+ 4+2 B | Pulje 1 | slutspil | 2 | 2024–2025 | 2 | navneord: slutspil |
| Nedre slutspil 50+ 4+2 B | Pulje 1 | slutspil | 2 | 2024–2025 | 2 | navneord: slutspil |
| 4+2 A-række - Slutspil | Pulje 1 | slutspil | 2 | 2024–2025 | 1 | navneord: slutspil |
| 70+ Eliteserien | Pulje 1 | grundspil | 2 | 2024–2025 | 1 | navneord: grundspil/pulje |
| MOT 4+2 Serie 3 | Pulje 1 | grundspil | 2 | 2024–2025 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 2 | Pulje 2 | grundspil | 2 | 2024–2025 | 1 | navneord: grundspil/pulje |
| DMU Holdtræf U9 - 3 Spillere | U9 DMU holdtræf | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U9D (3300) - 3 spillere | Pulje 901 - (Arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U9D (3300) - 3 spillere | Pulje 901 A FOR&#197;R (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U9D (3300) - 3 spillere | Pulje 901 B FOR&#197;R (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U9D (3300) - 3 spillere | Pulje 902 - (Arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U9D (3300) - 3 spillere | Pulje 902 FOR&#197;R (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U9 BEGYNDER - 3 spillere | Pulje 904 (forår) | grundspil | 2 | 2025–2025 | 10 | navneord: grundspil/pulje |
| U9 BEGYNDER - 3 spillere | Pulje 905 (forår) | grundspil | 2 | 2025–2025 | 10 | navneord: grundspil/pulje |
| U9 BEGYNDER - 3 spillere | Pulje 906 (forår) | grundspil | 2 | 2025–2025 | 10 | navneord: grundspil/pulje |
| U9D + U9C - 3 spillere | Nordjysk Mesterskab - U9D + U9C - 3 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U9D + U9C - 3 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering - Marts | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering - Februar | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering - Februar | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering - Marts | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U9 - Begynderholdturnering - Marts | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U9D (3300) - 3 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 C 3600 (3 spillere) BD (2. halvår) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 C 3600 (3 spillere) BD (2. halvår) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 C 3600 (3 spillere) BD (2. halvår) | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 D 3300 (3 spillere) BD (2. halvår) | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 C 3600 (3 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U09 D 3300 (3 spillere) BD | Pulje 2 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U09 D 3300 (3 spillere) BD | Pulje 3 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U09 C 3600 (3 spillere) BD | SM-Finale | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| U9 D, 3300 (3 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| DMU Hold U11 4+2 | 3. - 4. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11 4+2 | 7. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11 4+2 | Finale (1. - 2. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U11B (5600) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U11B (5600) - 4 Spillere | Placeringskampe (5. - 8. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11B (5600) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U11B (5600) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C (5100) - 4 Spillere | 3. - 4. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11C (5100) - 4 Spillere | 5. - 6. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11C (5100) - 4 Spillere | 7. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11C (5100) - 4 Spillere | 9. - 10. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11C (5100) - 4 Spillere | Finale (1. - 2. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U11C (5100) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C (5100) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C-D (4800) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U11C-D (4800) - 4 Spillere | Placeringskampe 5. - 8. plads (2'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11C-D (4800) - 4 Spillere | Placeringskampe 9. - 14. palds (3'ere og 4'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U11C-D (4800) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C-D (4800) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C-D (4800) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U11C-D (4800) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4600) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold - U11D (4600) - 4 Spillere | Kvartfinale 1 (nr. 1 pulje 1 og 2) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold - U11D (4600) - 4 Spillere | Kvartfinale 2 (nr. 1 pulje 3 og 4) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold - U11D (4600) - 4 Spillere | Kvartfinale 3 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold - U11D (4600) - 4 Spillere | Kvartfinale 4 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold - U11D (4600) - 4 Spillere | Placeringskampe 17. - 26. plads (3'ere og 4'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold - U11D (4600) - 4 Spillere | Placeringskampe 5. - 8. plads (tabere i kvart) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold - U11D (4600) - 4 Spillere | Placeringskampe 9. - 16. plads (2'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold - U11D (4600) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4600) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4600) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4600) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4600) - 4 Spillere | Pulje 5 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4600) - 4 Spillere | Pulje 6 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4600) - 4 Spillere | Pulje 7 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4600) - 4 Spillere | Pulje 8 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4200) - 4 Piger | Finaleslutspil 1-4 | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold - U11D (4200) - 4 Piger | Placeringskampe 5-8 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold - U11D (4200) - 4 Piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold - U11D (4200) - 4 Piger | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11 4+2 | Pulje 1101 (Arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U11B (5600) - 4 Spillere | Pulje 1102 (Arne@badminton.dk) | grundspil | 2 | 2025–2025 | 10 | navneord: grundspil/pulje |
| U11C (5100) - 4 Spillere | Pulje 1103 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11C (5100) - 4 Spillere | Pulje 1104 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11C-D (4800) - 4 Spillere | Pulje 1105 (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11C-D (4800) - 4 Spillere | Pulje 1106 (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11C-D (4800) - 4 Spillere | Pulje 1107 (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1109 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1110 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1111 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1112 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1113 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1114 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1115 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1116 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1117 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4600) - 4 Spillere | Pulje 1118 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11D (4200) - 4 Piger | Pulje 1108 - minifarmer@gmail.com | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U11C - 4 spillere | Nordjysk Mesterskab - U11C - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U11D - 4 spillere | Nordjysk Mesterskab - U11D - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U11D - 4 spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - Februar | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - Marts | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - Januar | Pulje 2 - U11 + U13 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11 - Begynderholdturnering - Marts | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11C (5100) -4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11D (4600) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11D (4600) - 4 spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11D (4600) - 4 spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11 B 5600 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U11 4200 (4 piger) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U11 C-D 4800 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U11 D 4600 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U11 D 4600 (4 spillere) BD | Pulje 2 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U11 4200 (4 piger) BD | Pulje 2 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U11 D 4600 (4 spillere) BD | Pulje 3 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U11 D 4600 (4 spillere) BD | Pulje 4 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U11 B 5600 (4 spillere) BD | SM-Finale | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| U11 C, 5100 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U11 C, 5100 (4 spillere) | Pulje 2 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U11 C, 5100 (4 spillere) | SM-Finalespil | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U11 C-D, 4800 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U11 D, 4600 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U11 D, 4600 (4 spillere) | Pulje 2 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U11 D, 4600 (4 spillere) | Pulje 3 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U11 D, 4600 (4 spillere) | SM-Finalespil | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U11 D, 4200 (4 piger) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U11 BEGYNDER - 3 spillere | Pulje 1 Begynder | grundspil | 2 | 2025–2025 | 7 | navneord: grundspil/pulje |
| U11 BEGYNDER - 3 spillere | Pulje 2 Begynder | grundspil | 2 | 2025–2025 | 7 | navneord: grundspil/pulje |
| U11 BEGYNDER - 3 spillere | Pulje 3 Begynder | grundspil | 2 | 2025–2025 | 7 | navneord: grundspil/pulje |
| DMU Hold U13 (4+3) | Finale | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13 (4+3) | Placeringskamp 3-4 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13 (4+3) | Placeringskamp 5-6 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13 (4+3) | Placeringskamp 7-8 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13 (4+3) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13 (4+3) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13A (6400) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13B (5800) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13B (5800) - 4 Spillere | Placeringskampe 5. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13B (5800) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13B (5800) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (5300) - 4 Spillere | 3. - 4. plads (2'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13C (5300) - 4 Spillere | 5. - 6. plads (3'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13C (5300) - 4 Spillere | 7. - 8. plads (4'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13C (5300) - 4 Spillere | 9. - 10. plads (5'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13C (5300) - 4 Spillere | Finale (1. - 2. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13C (5300) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (5300) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C-D (5000) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13C-D (5000) - 4 Spillere | Placeringskampe 13. - 15. plads (4'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13C-D (5000) - 4 Spillere | Placeringskampe 5. - 8. plads (2'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13C-D (5000) - 4 Spillere | Placeringskampe 9. - 12. plads (3'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13C-D (5000) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C-D (5000) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C-D (5000) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C-D (5000) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | 5. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13D (4800) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13D (4800) - 4 Spillere | Kvartfinale 1 (nr. 1 pulje 1 og 2) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13D (4800) - 4 Spillere | Kvartfinale 2 (nr. 1 fra pulje 3 og 4) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13D (4800) - 4 Spillere | Kvartfinale 3 (nr. 1 pulje 5 og 6) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13D (4800) - 4 Spillere | Kvartfinale 4 (nr. 1 pulje 7 og 8) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13D (4800) - 4 Spillere | Placeringskampe 17. - 26. plads (3'ere og 4'ere i puljen) | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Placeringskampe 9. - 16. plads (2'ere i puljen) | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Pulje 5 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Pulje 6 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Pulje 7 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D (4800) - 4 Spillere | Pulje 8 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (4800) - 4 Piger | Finalekampe 1-4 | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13C (4800) - 4 Piger | Placeringskampe 5-8 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13D (4400) - 4 Piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (4800) - 4 Piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13C (4800) - 4 Piger | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13A 2+2 (6000) | 3. - 4. plads (2'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13A 2+2 (6000) | 5. - 6. plads (3'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U13A 2+2 (6000) | Finale (1. - 2. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13A 2+2 (6000) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13A 2+2 (6000) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U13D 2+2 (4800) | Finaleslutspil (1. - 3. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U13D 2+2 (4800) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13 Kredsmatch 2025 | Pulje 1 | grundspil | 2 | 2025–2025 | 6 | navneord: grundspil/pulje |
| U13 4+3 | Pulje 1301 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U13A 2+2 (6000) | Pulje 1302 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U13B (5800) - 4 Spillere | Pulje 1303 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13B (5800) - 4 Spillere | Pulje 1304 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13C (5300) - 4 Spillere | Pulje 1305 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13C (5300) - 4 Spillere | Pulje 1306 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13C (5300) - 4 Spillere | Pulje 1307 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13C-D (5000) - 4 Spillere | Pulje 1308 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13C-D (5000) - 4 Spillere | Pulje 1309 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13C-D (5000) - 4 Spillere | Pulje 1310 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13C-D (5000) - 4 Spillere | Pulje 1311 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13D (4800) - 4 Spillere | Pulje 1312 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13D (4800) - 4 Spillere | Pulje 1313 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13D (4800) - 4 Spillere | Pulje 1314 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13D (4800) - 4 Spillere | Pulje 1315 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13D (4800) - 4 Spillere | Pulje 1316 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13D (4800) - 4 Spillere | Pulje 1317 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13D (4800) - 4 Spillere | Pulje 1318 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13C/ U15C (4800)(5000) - 4 Piger | Pulje 1319 - minifarmer@gmail.com | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13D (4400) - 4 Piger | Pulje 1320 - minifarmer@gmail.com | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U13B - 4 spillere | Nordjysk Mesterskab - U13B - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U13C - 4 spillere | Nordjysk Mesterskab - U13C - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U13C/U15D - 4 piger | Nordjysk Mesterskab - U13C/U15D - 4 piger | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U13C-D - 4 spillere | Nordjysk Mesterskab - U13C-D - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U13D - 4 spillere | Nordjysk Mesterskab - U13D - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U13C/U15D - 4 piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13C-D - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13C-D - 4 spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering - Februar | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering - Marts | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13 - Begynderholdturnering - Marts | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13D (4400) - 4 piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13B (5800) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13C (5300) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13C-D (5000) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13D (4800) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13D (4800) - 4 spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13 A 6400 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U13 C 5300 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U13 C-D 5000 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U13 D 4400 (4 piger) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U13 D 4800 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U13 D 4800 (4 spillere) BD | Pulje 2 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U13 D 4800 (4 spillere) BD | Pulje 3 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U13 A 6400 (4 spillere) BD | SM-Finale | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| Uge 38 - U13 A, 6000 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U13 B, 5400 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U13 B, 5400 (2+2) | Pulje 2 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U13 C, 5000 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U13 D, 4800 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U13 A, 6000 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U13 B, 5400 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U13 D, 4800 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U13 D, 4800 (2+2) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U13 B, 5800 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 5 | navneord: grundspil/pulje |
| U13 B, 5800 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 5 | navneord: slutspil |
| U13 C, 4800 (4 piger) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U13 C, 4800 (4 piger) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U13 C, 5300 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U13 C, 5300 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U13 C-D, 5000 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U13 D, 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U13 D, 4800 (4 spillere) | Pulje 2 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U13 D, 4800 (4 spillere) | Pulje 3 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U13 D, 4800 (4 spillere) | Pulje 4 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U13 D, 4800 (4 spillere) | Pulje 5 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U13 D, 4800 (4 spillere) | SM Slutspil | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U13 D, 4400 (4 piger) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U13 BEGYNDER - 3 spillere | Pulje 1 Begynder | grundspil | 2 | 2025–2025 | 7 | navneord: grundspil/pulje |
| U13 BEGYNDER - 3 spillere | Pulje 2 Begynder | grundspil | 2 | 2025–2025 | 7 | navneord: grundspil/pulje |
| U13 BEGYNDER - 3 spillere | Pulje 3 Begynder | grundspil | 2 | 2025–2025 | 7 | navneord: grundspil/pulje |
| DMU Hold U15 (4+3) | Finale 1-2 | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15 (4+3) | Placeringskamp 3-4 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15 (4+3) | Placeringskamp 5-6 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15 (4+3) | Placeringskamp 7-8 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15 (4+3) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15 (4+3) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15A (7200) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15A (7200) - 4 Spillere | Placeringskampe 5. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15A (7200) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15A (7200) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15B (6400) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15B (6400) - 4 Spillere | Placeringskampe 13. - 16. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15B (6400) - 4 Spillere | Placeringskampe 5. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15B (6400) - 4 Spillere | Placeringskampe 9. - 12. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15B (6400) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15B (6400) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15B (6400) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15B (6400) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C (5600) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15C (5600) - 4 Spillere | Placeringskampe 13. -16. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15C (5600) - 4 Spillere | Placeringskampe 5. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15C (5600) - 4 Spillere | Placeringskampe 9. - 12. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15C (5600) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C (5600) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C (5600) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C (5600) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C-D (5200) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15C-D (5200) - 4 Spillere | Placeringskampe nr. 5. - 8. plads (2'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15C-D (5200) - 4 Spillere | Placeringskampe nr. 9 - 14 (3'ere og 4'ere) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15C-D (5200) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C-D (5200) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C-D (5200) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C-D (5200) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15D (5000) - 4 Spillere | Finaleslutspil 1-4 | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15D (5000) - 4 Spillere | Placeringskampe 5-8 | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15D (5000) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15D (5000) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15D (4600) - 4 Piger | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15D (4600) - 4 Piger | Placeringskampe (5. - 7. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15D (4600) - 4 Piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C (5000) - 4 Piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15D (4600) - 4 Piger | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15A 2+2 (6800) | Finale (1. - 2. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15C 2+2 (5400) | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U15A 2+2 (6800) | Placeringskamp 3. - 4. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15A 2+2 (6800) | Placeringskamp 5. - 6. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15A 2+2 (6800) | Placeringskamp 7. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U15D 2+2 (5000) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15A 2+2 (6800) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C 2+2 (5400) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15B 2+2 (6000) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15A 2+2 (6800) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U15C 2+2 (5400) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15 Kredsmatch 2025 | Pulje 1 | grundspil | 2 | 2025–2025 | 6 | navneord: grundspil/pulje |
| U15 4+3 | Pulje 1501 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U15A 2+2 (6800) | Pulje 1502 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U15A 2+2 (6800) | Pulje 1503 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U15M (8400) - 4 Spillere | Pulje 1504 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U15A (7200) - 4 Spillere | Pulje 1505 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U15A (7200) - 4 Spillere | Pulje 1506 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U15B (6400) - 4 Spillere | Pulje 1507 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15B (6400) - 4 Spillere | Pulje 1508 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15B (6400) - 4 Spillere | Pulje 1509 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15B (6400) - 4 Spillere | Pulje 1510 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15C (5600) - 4 Spillere | Pulje 1511 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15C (5600) - 4 Spillere | Pulje 1512 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15C (5600) - 4 Spillere | Pulje 1513 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15C-D (5200) - 4 Spillere | Pulje 1514 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15C-D (5200) - 4 Spillere | Pulje 1515 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15C-D (5200) - 4 Spillere | Pulje 1516 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15C-D (5200) - 4 Spillere | Pulje 1517 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15C-D (5200) - 4 Spillere | Pulje 1518 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15D (5000) - 4 Spillere | Pulje 1519 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15D (5000) - 4 Spillere | Pulje 1520 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15D (5000) - 4 Spillere | Pulje 1521 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15D (5000) - 4 Spillere | Pulje 1522 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15D (5000) - 4 Spillere | Pulje 1523 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15D (5000) - 4 Spillere | Pulje 1524 - (minifarmer@gmail.com) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15D (4600) - 4 Piger | Pulje 1525 - minifarmer@gmail.com | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15D (4600) - 4 Piger | Pulje 1526 - minifarmer@gmail.com | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U15B - 4 spillere | Nordjysk Mesterskab - U15B - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U15C - 4 spillere | Nordjysk Mesterskab - U15C - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U15C/U17D - 4 piger | Nordjysk Mesterskab - U15C/U17D - 4 piger | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U15C-D - 4 spillere | Nordjysk Mesterskab - U15C-D - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U15D - 4 spillere | Nordjysk Mesterskab - U15D - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U15C/U17D - 4 piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15C-D - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15C-D - 4 spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15C (5600) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15B (6400) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15C-D (5200) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15D (4600) - 4 piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15D (5000) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15C (5600) - 4 spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15 B 6400 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U15 C 5000 (4 piger) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U15 C-D 5200 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U15 D 5000 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U15 D 5000 (4 spillere) BD | Pulje 2 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U15 C 5000 (4 piger) BD | SM-Finale | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| Uge 38 - U15 M, 7800 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U15 A, 6800 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U15 A, 6800 (2+2) | Pulje 2 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U15 B, 6000 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U15 B, 6000 (2+2) | Pulje 2 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U15 C, 5400 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U15 C, 5400 (2+2) | Pulje 2 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U15 A, 6800 (2+2) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U15 B, 6000 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 5 | navneord: grundspil/pulje |
| U15 B, 6000 (2+2) | SM-Finale | slutspil | 2 | 2025–2025 | 5 | navneord: slutspil |
| U15 C, 5400 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U15 C, 5400 (2+2) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U15 D, 5000 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U15 D, 5000 (2+2) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U15 C, 5600 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U15 C, 5600 (4 spillere) | Pulje 2 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U15 C, 5600 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U15 D, 4600 (4 piger) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U15 D, 4600 (4 piger) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U15 B, 6400 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U15 B, 6400 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U15 C-D, 5200 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U15 D, 5000 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U15 D, 5000 (4 spillere) | Pulje 2 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U15 D, 5000 (4 spillere) | Pulje 3 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U15 D, 5000 (4 spillere) | Pulje 4 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U15 D, 5000 (4 spillere) | Pulje 5 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U15 D, 5000 (4 spillere) | SM Slutspil | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| DMU Hold U17 (4+3) | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17 (4+3) | Placeringskamp 5. - 6. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17 (4+3) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17 (4+3) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U17 4+3 | Pulje 1701 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| DMU Hold U17/U19M 4+2 (15.000) | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17/U19M 4+2 (15.000) | Placeringskampe 5. - 6. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19M 4+2 (15.000) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19M 4+2 (15.000) | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19M (10.000) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19D (5200) - 4 Spillere | 3. - 4. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19D (5200) - 4 Spillere | Finale (1. - 2. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17/U19B (7200) - 4 Spillere | Finaleslutspil (1. - 3. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17/U19C (6400) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Kvartfinale 1 (nr. 1 pulje 2 og 3) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Kvartfinale 2 (nr. 1 pulje 4 og 5) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Placeringskamp 13. - 18. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Placeringskamp 5. - 6 plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Placeringskamp 7. - 12. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19B (7200) - 4 Spillere | Placeringskampe (4. - 6. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19B (7200) - 4 Spillere | Placeringskampe (7. - 9. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19C (6400) - 4 Spillere | Placeringskampe 13. - 16. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19C (6400) - 4 Spillere | Placeringskampe 5. - 8. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19C (6400) - 4 Spillere | Placeringskampe 9. - 12. plads | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19D (5200) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19A (8400) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19B (7200) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C (6400) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C (6400) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19B (7200) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19D (5200) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19B (7200) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C (6400) - 4 Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C (6400) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Pulje 4 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Pulje 5 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C-D (5600) - 4 Spillere | Pulje 6 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19C 2+2 (5800) | Finaleslutspil (1. - 3. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| DMU Hold U17/U19C 2+2 (5800) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DMU Hold U17/U19A 2+2 (7800) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 Elite | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 Mester | (5. - 6. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKAB 4+2 Mester | Bronzekamp (3. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4+2 Mester | Finale (1. - 2. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4+2 Mester | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4+2 Mester | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4B Spillere | (5. - 6. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKAB 4B Spillere | (7. - 9. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKAB 4C-D Spillere | Bronze (3. - 4. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKAB 4C-D Spillere | Finale (1. - 2. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4C Spillere | Finaleslutspil (1. - 3. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4D Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4B Spillere | Finaleslutspil (1. - 4. plads) | slutspil | 2 | 2025–2025 | 2 | navneord: slutspil |
| EFTERSKOLEMESTERSKAB 4C-D Spillere | Placeringskamp (5. - 6. plads) | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKAB 4D Spillere | Placeringskampe | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKAB 4C Spillere | Placeringskampe | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| EFTERSKOLEMESTERSKAB 4C-D Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4A Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4B Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4C Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4D Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4C-D Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4C Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4B Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4D Spillere | Pulje 2 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4D Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4B Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4C Spillere | Pulje 3 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLEMESTERSKAB 4C-D Piger | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/19C 4+2 (8.900) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/19B 4+2 (10.400) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19A 4+2 (12.000) | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19A (10.500) - 5 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19B (9.000) - 5 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19C (6.400) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19C-D (5.600) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19D (5.200) - 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U17/U19M 4+2 (15000) | Pulje 1702 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U17/U19M (10000) - 4 Spillere | Pulje 1703 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U17/U19M (10000) - 4 Spillere | Pulje 1704 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U17/U19A (8400) - 4 Spillere | Pulje 1705 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 12 | navneord: grundspil/pulje |
| U17/U19B (7200) - 4 Spillere | Pulje 1706 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U17/U19C (6400) - 4 Spillere | Pulje 1707 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U17/U19C (6400) - 4 Spillere | Pulje 1708 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U17/U19C-D (5600) - 4 Spillere | Pulje 1709 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U17/U19C-D (5600) - 4 Spillere | Pulje 1710 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U17/U19C-D (5600) - 4 Spillere | Pulje 1711 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U17/U19D (5200) - 4 Spillere | Pulje 1712 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| U17/U19D (5200) - 4 Spillere | Pulje 1713 - (arne@badminton.dk) | grundspil | 2 | 2025–2025 | 8 | navneord: grundspil/pulje |
| &#216;M 5 Spillere C-række (4si., 3do.) | Finale | slutspil | 2 | 2025–2025 | 1 | navneord: slutspil |
| &#216;M 5 Spillere C-række (4si., 3do.) | Pulje A | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| &#216;M 5 Spillere C-række (4si., 3do.) | Pulje B | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| &#216;M 5 Spillere D-række (4si., 3do.) | Pulje 2 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| &#216;M 5 Piger D-række (4si., 3do.) | Finale | slutspil | 2 | 2025–2025 | 1 | navneord: slutspil |
| &#216;M 5 Piger D-række (4si., 3do.) | Pulje 3 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| &#216;M 5 Spillere Begynder | Finale | slutspil | 2 | 2025–2025 | 1 | navneord: slutspil |
| &#216;M 5 Spillere Begynder | Pulje 4 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| &#216;M 4 PIGER Doubler | Finale | slutspil | 2 | 2025–2025 | 1 | navneord: slutspil |
| &#216;M 4 PIGER Doubler | Pulje 5 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| U17/U19B - 4 spillere | Nordjysk Mesterskab - U17/U19B - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U17/U19C - 4 spillere | Nordjysk Mesterskab - U17/U19C - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U17/U19C-D - 4 spillere | Nordjysk Mesterskab - U17/U19C-D - 4 spillere | andet/ukendt | 2 | 2025–2025 | 2 | ingen sikker nøgle |
| U17/U19C-D - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U17/19B (7200) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U17/19C (6400) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U17/19C-D (5600) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| U17/19D (5200) - 4 spillere | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| A 8400 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 2 | navneord: grundspil/pulje |
| C 6400 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| C-D 5600 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2025–2025 | 1 | navneord: grundspil/pulje |
| Uge 38 - U17/U19 A, 7800 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| Uge 38 - U17/U19 D, 5000 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U17/U19 M, 15000 (4+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U17/U19 M, 15000 (4+2) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U17/U19 A, 7800 (2+2) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U17/U19 B, 6800 (2+2) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U17/U19 C, 5800 (2+2) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U17/U19 D, 5000 (2+2) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U17/U19 M, 10000 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U17/U19 D, 5200 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U17/U19 D, 5200 (4 spillere) | Pulje 2 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U17/U19 D, 5200 (4 spillere) | Pulje 3 | grundspil | 2 | 2025–2025 | 4 | navneord: grundspil/pulje |
| U17/U19 D, 5200 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 4 | navneord: slutspil |
| U17/U19 C, 6400 (4 spillere) | Pulje 2 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U17/U19 C, 6400 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| U17/U19 C-D, 5600 (4 spillere) | Pulje 1 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U17/U19 C-D, 5600 (4 spillere) | Pulje 2 | grundspil | 2 | 2025–2025 | 3 | navneord: grundspil/pulje |
| U17/U19 C-D, 5600 (4 spillere) | SM-Finale | slutspil | 2 | 2025–2025 | 3 | navneord: slutspil |
| Serie 1 Vest (5+3) | Pulje 6 | grundspil | 2 | 2025–2026 | 4 | navneord: grundspil/pulje |
| Serie C - Double | Pulje 4 | grundspil | 2 | 2025–2026 | 2 | navneord: grundspil/pulje |
| Sen 4 + 2 B | Pulje 1 | grundspil | 2 | 2025–2026 | 2 | navneord: grundspil/pulje |
| 4+2 - &#216;verste slutspil | Pulje 1 | slutspil | 2 | 2025–2025 | 1 | navneord: slutspil |
| 4+2 - Nederste slutspil | Pulje 1 | slutspil | 2 | 2025–2025 | 1 | navneord: slutspil |
| 4 Spillere | Pulje 1 | grundspil | 2 | 2025–2026 | 1 | navneord: grundspil/pulje |
| 4 Spillere A-række | Pulje 1 | grundspil | 2 | 2025–2026 | 1 | navneord: grundspil/pulje |
| 4 Spillere B-række | Pulje 1 | grundspil | 2 | 2025–2026 | 1 | navneord: grundspil/pulje |
| 4 spillere | Pulje 1 | grundspil | 2 | 2025–2026 | 1 | navneord: grundspil/pulje |
| U9 - Begynder - Opstartsturnering - 20.sep | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U09 C-D 3400 (3 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U9 Dx, 3000 (3 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U11 (4+2) - maks. 8500 p. holdfællesskab | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U11 B, 5600 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U11 C, 5000 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U11 C-D, 4700 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U11 D, 4400 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U11 D, 4400 (4 spillere) BD | Pulje 2 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U11 Dx, 4200 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U11 D, 4200 (4 piger) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U11 D 4400 (4 spilllere) | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U11 C, 5000 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U11 C-D, 4700 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U11 C-D, 4700 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U11 D, 4400 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U11 D, 4400 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U11 Dx, 4200 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 - Begynder - Opstartsturnering - 20.sep | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U13 (4+3) - maks. 11500 p. holdfællesskab | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U13 A, 5800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U13 B, 5200 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U13 C, 4800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U13 A, 6400 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U13 A, 6400 (4 spillere) BD | Pulje 2 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U13 B, 5600 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U13 C, 5100 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U13 C-D, 4800 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U13 D, 4600 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U13 Dx, 4400 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U13 C, 4800 (4 piger) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U13 D, 4400 (4 piger) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| UGE 38 - U13 A, 5800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U13 B, 5200 (2+2) | Finale | slutspil | 2 | 2026–2026 | 4 | navneord: slutspil |
| UGE 38 - U13 B, 5200 (2+2) | Kampen om 3. pladsen | andet/ukendt | 2 | 2026–2026 | 4 | ingen sikker nøgle |
| UGE 38 - U13 B, 5200 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U13 B, 5200 (2+2) | Pulje 2 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U13 D, 4600 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U13 C, 5100 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U13 D 4600 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U13 B, 5600 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 B, 5600 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 C-D, 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 C-D, 4800 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 C-D, 4800 (4 spillere) | Pulje 3 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 D, 4600 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 D, 4600 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 D, 4600 (4 spillere) | Pulje 3 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 Dx, 4400 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U13 Dx, 4400 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U15 B, 5800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 5 | navneord: grundspil/pulje |
| U15 C-D, 5100 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 C-D, 5100 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 C-D, 5100 (4 spillere) | Pulje 3 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 D 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U15 (4+3) - maks. 14000 p. holdfællesskab | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 C, 5200 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 D, 4800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 B, 6200 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U15 C, 5500 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 C, 5500 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 C-D, 5100 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U15 D, 4800 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U15 Dx, 4600 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 B, 5400 (4 piger) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| U15 C, 4900 (4 piger) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 D, 4500 (4 piger) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U15 A, 6800 (2+2) | Finale | slutspil | 2 | 2026–2026 | 4 | navneord: slutspil |
| UGE 38 - U15 A, 6800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U15 A, 6800 (2+2) | Pulje 2 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U15 B, 5800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U15 C, 5200 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| Uge 38 - U15 D, 4800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U15 B, 6200 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U15 B, 6200 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U15 D, 4800 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| U15 D, 4800 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19M+A 4+2 | Pulje 4+2 M-A | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19B+C+D 2+2 | Pulje 2+2 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19B-C-D-Dx 4 Spillere | Pulje 4 Spillere B-C-D-Dx | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| EFTERSKOLETURN. U17/U19A 4 Spillere | 4 Spillere A | andet/ukendt | 2 | 2026–2026 | 2 | ingen sikker nøgle |
| U17/U19 B, 6800 (2+2) | Pulje 2 | grundspil | 2 | 2026–2026 | 6 | navneord: grundspil/pulje |
| U17/U19 M, 14000 (4+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 M, 9600 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 A, 8200 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 C, 6200 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U17/U19 C-D, 5500 (4 spillere) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 1 | navneord: grundspil/pulje |
| U17/U19 D, 5100 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 5 | navneord: grundspil/pulje |
| U17/U19 D, 5100 (4 spillere) | Pulje 2 | grundspil | 2 | 2026–2026 | 5 | navneord: grundspil/pulje |
| U17/U19 D, 4800 (4 piger) BD | Pulje 1 | grundspil | 2 | 2026–2026 | 2 | navneord: grundspil/pulje |
| UGE 38 - U17/U19 A, 7800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U17/U19 B, 6800 (2+2) | Finale | slutspil | 2 | 2026–2026 | 4 | navneord: slutspil |
| UGE 38 - U17/U19 B, 6800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U17/U19 B, 6800 (2+2) | Pulje 2 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U17/U19 C, 5800 (2+2) | Finale | slutspil | 2 | 2026–2026 | 4 | navneord: slutspil |
| UGE 38 - U17/U19 C, 5800 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U17/U19 C, 5800 (2+2) | Pulje 2 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| UGE 38 - U17/U19 D, 5000 (2+2) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 C, 6200 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 C-D, 5500 (4 spillere) | Pulje 1 | grundspil | 2 | 2026–2026 | 4 | navneord: grundspil/pulje |
| U17/U19 C, 5300 (4 piger) | Pulje 1 | grundspil | 2 | 2026–2026 | 3 | navneord: grundspil/pulje |
| 4+2 Slutspilstider | Pulje 1 | slutspil | 2 | 2026–2026 | 1 | navneord: slutspil |
| 4 Spillere Slutspilstider | Pulje 1 | slutspil | 2 | 2026–2026 | 1 | navneord: slutspil |
| Kvalifikation til 3.division | A Vest | andet/ukendt | 1 | 2010–2010 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien | A Vest | nedrykningsspil | 1 | 2010–2010 | 1 | navneord: nedrykning |
| Kvalifikation til 3.division | A &#216;st | andet/ukendt | 1 | 2010–2010 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien | A &#216;st | nedrykningsspil | 1 | 2010–2010 | 1 | navneord: nedrykning |
| Kvalifikation til 3.division | B Vest | andet/ukendt | 1 | 2010–2010 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien | B Vest | nedrykningsspil | 1 | 2010–2010 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien | B &#216;st | nedrykningsspil | 1 | 2010–2010 | 1 | navneord: nedrykning |
| Kvalifikation til 3.division | B &#216;st | andet/ukendt | 1 | 2010–2010 | 1 | kvalifikation uden retning |
| Badmintonligaen | Badmintonligaen | grundspil | 1 | 2010–2010 | 1 | navneord: grundspil/pulje |
| Bronzematchen | Bronzematchen | andet/ukendt | 1 | 2010–2010 | 1 | ingen sikker nøgle |
| Guldmatchen | Guldmatchen | andet/ukendt | 1 | 2010–2010 | 1 | ingen sikker nøgle |
| Kvalifikation til 1.division | Kvalifikation til 1.division | andet/ukendt | 1 | 2010–2010 | 1 | kvalifikation uden retning |
| Kvalifikation til Badmintonligaen | Kvalifikation til Badmintonligaen | andet/ukendt | 1 | 2010–2010 | 1 | kvalifikation uden retning |
| Kvalifikationskampe i DS | Kvalifikationskampe i DS | andet/ukendt | 1 | 2010–2010 | 1 | kvalifikation uden retning |
| Kvartfinaler | Kvartfinaler | slutspil | 1 | 2010–2010 | 1 | navneord: slutspil |
| Medaljeslutspil | Medaljeslutspil A | slutspil | 1 | 2010–2010 | 1 | navneord: slutspil |
| Medaljeslutspil | Medaljeslutspil B | slutspil | 1 | 2010–2010 | 1 | navneord: slutspil |
| Nedrykning fra 3.division | Nedrykning | nedrykningsspil | 1 | 2010–2010 | 1 | navneord: nedrykning |
| Nedrykning fra 2.division | Nedrykning 2. div | nedrykningsspil | 1 | 2010–2010 | 1 | navneord: nedrykning |
| Nedrykningsspil fra 1. division | Nedrykningsspil fra 1. division | nedrykningsspil | 1 | 2010–2010 | 1 | navneord: nedrykning |
| Kvalifikation til 2.division | Opryk. pulje A | kvalifikation_op | 1 | 2010–2010 | 1 | navneord: kvalifikation + op |
| Kvalifikation til 2.division | Opryk. pulje B | kvalifikation_op | 1 | 2010–2010 | 1 | navneord: kvalifikation + op |
| 3.division | pulje 1 | grundspil | 1 | 2010–2010 | 1 | navneord: grundspil/pulje |
| 2.division | pulje 1 | grundspil | 1 | 2010–2010 | 1 | navneord: grundspil/pulje |
| 2.division | pulje 2 | grundspil | 1 | 2010–2010 | 1 | navneord: grundspil/pulje |
| 3.division | pulje 2 | grundspil | 1 | 2010–2010 | 1 | navneord: grundspil/pulje |
| 3.division | pulje 3 | grundspil | 1 | 2010–2010 | 1 | navneord: grundspil/pulje |
| 3.division | pulje 4 | grundspil | 1 | 2010–2010 | 1 | navneord: grundspil/pulje |
| Nedrykning fra 3.division | Pulje B | nedrykningsspil | 1 | 2010–2010 | 1 | navneord: nedrykning |
| Semifinaler | Semifinaler | slutspil | 1 | 2010–2010 | 1 | navneord: slutspil |
| Badmintonligaen, slutspil | Medaljeslutspil pulje A | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| Badmintonligaen, slutspil | Medaljeslutspil pulje B | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| Badmintonligaen, slutspil | Ligakvalifikationsspil | andet/ukendt | 1 | 2011–2011 | 1 | kvalifikation uden retning |
| Kvalifikation til 1. division | Slutspil | andet/ukendt | 1 | 2011–2011 | 1 | kvalifikation uden retning |
| Nedrykning fra 2. division | Slutspil | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Nedrykning fra 3. division | Pulje 1 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Nedrykning fra 3. division | Pulje 2 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien | Pulje 1 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien | Pulje 2 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien | Pulje 3 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien | Pulje 4 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| 1. division | 1. division | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Danmarksserien | &#216;st pulje1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Serie 3 - enkelt | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Slutspil Kvalifikation | Nedrykning | kvalifikation_ned | 1 | 2011–2011 | 1 | navneord: kvalifikation + ned |
| Slutspil Serie 1 | Nedrykning | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Slutspil JS | Nedrykning pulje A | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Slutspil JS | Nedrykning pulje B | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Slutspil JS | Opryking pulje A | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| Slutspil Kvalifikation | Oprykning | kvalifikation_op | 1 | 2011–2011 | 1 | navneord: kvalifikation + op |
| Slutspil Serie 1 | Oprykning | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| Slutspil JS | Oprykning pulje B | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| JYLLANDSSERIEN | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| JYLLANDSSERIEN | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| JYLLANDSSERIEN | Pulje 3 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| JYLLANDSSERIEN | Pulje 4 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| KVALIFIKATIONSR&#198;KKEN | Pulje 1 | andet/ukendt | 1 | 2011–2011 | 1 | kvalifikation uden retning |
| KVALIFIKATIONSR&#198;KKEN | Pulje 2 | andet/ukendt | 1 | 2011–2011 | 1 | kvalifikation uden retning |
| SERIE 1 | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| SERIE 1 | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| SERIE 2 | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| SERIE 2 | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| SERIE 2 | Pulje 3 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Serie 2 slutspil | Nedrykning til Serie 3 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Serie 2 slutspil | Oprykning til Serie 1 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| Serie 1 grundspil | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Herre Senior B | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Motion | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Herre Senior B | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Serie 1 grundspil | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Fynsserie -slutspil | Nedryknings slutspil | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Fynsserie -slutspil | Opryknings slutspil | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| KS-Nedryk | KS-Nedrykning | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| 1. Serie Pulje 1 | 1. Serie Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 1. Serie Pulje 2 | 1. Serie Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 2. Serie Pulje 1 | 2. Serie Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 2. Serie Pulje 2 | 2. Serie Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 3. Serie Pulje 1 | 3. Serie Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 3. Serie Pulje 2 | 3. Serie Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 4. Serie Pulje 1 | 4. Serie Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 4. Serie Pulje 2 | 4. Serie Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 5. Serie Pulje 1 | 5. Serie Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 5. Serie Pulje 2 | 5. Serie Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 30. Serie | 30. Serie | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Q 1. Serie | Q 1. Serie | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Holdturnering Serie 3a | Pulje 3a | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Motion B | Motion B | andet/ukendt | 1 | 2011–2011 | 1 | ingen sikker nøgle |
| Motion C | Motion C | andet/ukendt | 1 | 2011–2011 | 1 | ingen sikker nøgle |
| LF Serie 1 | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| LF Serie 2 | Serie 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| LF Serie 3 | Serie 3 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Motion B - Slutspil | Slutspil A | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| Motion B - Slutspil | Slutspil B | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| SM - DH-rækken | DH-rækken | andet/ukendt | 1 | 2011–2011 | 1 | ingen sikker nøgle |
| SM - DS/Sj-rækken | DS/Sj-rækken | andet/ukendt | 1 | 2011–2011 | 1 | ingen sikker nøgle |
| SM - Eliterækken | Eliterækken | andet/ukendt | 1 | 2011–2011 | 1 | ingen sikker nøgle |
| SM - Serie 1-3-rækken | Serie 1-3 - rækken | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Sjællandsserien, oprykningsspil | Pulje 1 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| Sjællandsserien, nedrykning | Pulje 1 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Serie 1, oprykning | Pulje 1 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| Serie 1, oprykning | Pulje 2 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| Serie 1, nedrykning | Pulje 1 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Serie 1, nedrykning | Pulje 2 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Serie 2, oprykning | Pulje 1 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| Serie 2, oprykning | Pulje 2 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| Serie 2, nedrykning | Pulje 1 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Serie 2, nedrykning | Pulje 2 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Serie 6 | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Serie 3 | Pulje 4 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Veteran B | Veretan B | andet/ukendt | 1 | 2011–2011 | 1 | ingen sikker nøgle |
| Veteran A slutspil | Slutspilspulje A | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| Veteran B slutspil | Slutspilspulje A | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| Veteran B slutspil | Slutspilspulje B | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| Veteran A slutspil | Slutspilspulje B | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| Veteran Elite | Veteran Elite | andet/ukendt | 1 | 2011–2011 | 1 | ingen sikker nøgle |
| 1. Serie Veteran | 1. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 2. Serie Veteran | 2. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 3. Serie Veteran | 3. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 4. Serie Veteran | 4. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 5. Serie Veteran | 5. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 6. Serie Veteran | 6. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 7. Serie Veteran | 7. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 8. Serie Veteran | 8. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 9. Serie Veteran | 9. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 20. Serie Veteran | 20. Serie Veteran | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Eliterækken, medaljespil | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Eliterækken, nedrykning | Pulje 1 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Mesterrækken, oprykning | Pulje 1 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| Mesterrækken, nedrykning | Pulje 1 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| A række finale | 40+ A række finale | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| A-rækken, oprykning | Pulje 1 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| A-rækken, oprykning | Pulje 2 | oprykningsspil | 1 | 2011–2011 | 1 | navneord: oprykning |
| A-rækken, nedrykning | Pulje 1 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| A-rækken, nedrykning | Pulje 2 | nedrykningsspil | 1 | 2011–2011 | 1 | navneord: nedrykning |
| Eliterækken | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Mesterrækken | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| Mesterrækken | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| A-rækken | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| A-rækken | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| A-rækken | Pulje 3 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| A-rækken | Pulje 4 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B række finale | B række finale | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| B-rækken | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| B-rækken | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 50+ 2. Serie | 50+ 2. Serie | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 50+ 7. Serie | 50+ 7. Serie | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| (6+2) finale | (6+2) finale | slutspil | 1 | 2011–2011 | 1 | navneord: slutspil |
| (4+4) række | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| (6+2) række | Pulje 2 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 60+ 2. Serie | 60+ 2. Serie | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| (2+2) række | Pulje 1 | grundspil | 1 | 2011–2011 | 1 | navneord: grundspil/pulje |
| 1.division | Nedrykning | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| SLUTSPIL KVAL | NEDRYKNING KVALIFIKATION | kvalifikation_ned | 1 | 2012–2012 | 1 | navneord: kvalifikation + ned |
| SLUTSPIL JS | NEDRYKNING PULJE A | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| SLUTSPIL JS | NEDRYKNING PULJE B | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| SLUTSPIL SERIE 1 | NEDRYKNING SERIE 1 | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| SLUTSPIL KVAL | OPRYKNING KVALIFIKATION | kvalifikation_op | 1 | 2012–2012 | 1 | navneord: kvalifikation + op |
| SLUTSPIL JS | OPRYKNING PULJE A | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| SLUTSPIL JS | OPRYKNING PULJE B | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| SLUTSPIL SERIE 1 | OPRYKNING SERIE 1 | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| Kvalifikationsrækken | Pulje 1 | andet/ukendt | 1 | 2012–2012 | 1 | kvalifikation uden retning |
| Kvalifikationsrækken | Pulje 2 | andet/ukendt | 1 | 2012–2012 | 1 | kvalifikation uden retning |
| Kvalifikationskamp | Kvalifiktionskamp | andet/ukendt | 1 | 2012–2012 | 1 | kvalifikation uden retning |
| Fynsserie slutspil | Nedrykning | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| Fynsserie slutspil | Oprykning | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| Serie 3 slutspil | Nederste | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| Serie 3 slutspil | Oprykning | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| Herrerækken | Herrerækken | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| KS-nedryk | KS-nedryk | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| KS-opryk | KS-opryk | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| 1.Serie P1 | 1.Serie P1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 1. Serie P2 | 1.Serie P2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 2. Serie P1 | 2. Serie P1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 2.Serie P2 | 2.Serie P2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 3. Serie P1 | 3.Serie P1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 3. Serie P2 | 3.Serie P2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 4. Serie P1 | 4. Serie P1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 4. Serie P2 | 4. Serie P2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 5. Serie P1 | 5.Serie P1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Q-Serie 1 | Q-Serie 1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 35. Serie | 35. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| LF-Serie 1 Slutspil | LF-Serie 1 Slutspil | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| LF-Serie 1/2 | LF-Serie 1/2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| LF-Serie 2 Slutspil | LF-Serie 2 Slutspil | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| LF-Serie 3 | LF-Serie 3 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| LF-Serien Slutspil | LF-Serien Nedrykning | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| LF-Serien Slutspil | LF-Serien Oprykning | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| Motion A - Slutspil | Motion A | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| Motion B - Slutspil | Motion B | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| Motionist B | Motionist B | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| Motionist C | Motionist C | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| SM - DS/SJ Rækken | DS/Sj-rækken | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| SM - Serie 1 - 3 rækken | Serie 1-3 - rækken | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| SM - DH Rækken | SM DH-rækken | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| Serie 2, 6+4, slutspil - oprykning | Pulje 1 | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| Serie 2, 6+4, slutspil - nedrykning | Pulje 1 | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| Serie 2, Herrerække | Pulje 1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Serie 3, 4+2 | Pulje 1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Serie 3, 4+2 | Pulje 2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Serie 4, Herrerække | Pulje 2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Serie 4, 4+2 | Pulje 2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Veteran B | Pulje 3 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| Veteran B slutspil | Slutspil Pulje A | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| Veteran B slutspil | Slutspil Pulje B | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| Veteran | Veteran B | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| 40+ Elite | 40+ Elite | andet/ukendt | 1 | 2012–2012 | 1 | ingen sikker nøgle |
| 40+ 1. Serie | 40+1.Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 2.Serie | 40+ 2. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 3. Serie | 40+ 3. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 4. Serie | 40+ 4. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 5. Serie | 40+ 5.serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 6. Serie | 40+ 6. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 7. Serie | 40+ 7. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 8. Serie | 40+ 8. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 9. Serie | 40+ 9. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ 20. Serie | 40+ 20. Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ A-rækken Finale | Pulje 1 | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 40+ B-rækken Finale | Pulje 1 | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 40+ Eliterækken, Nedrykning | Pulje 1 | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| 40+ B-rækken | Pulje 2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ (6+2) rækken | Pulje 1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ A-rækken, Oprykningsspil | Pulje A | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| 40+ B-række Slutspil Pulje 1 | Pulje A | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 40+ B-række Slutspil Pulje 1 | Pulje B | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 40+ A-rækken, Oprykningsspil | Pulje B | oprykningsspil | 1 | 2012–2012 | 1 | navneord: oprykning |
| 40+ Herrerækken | Pulje 1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 40+ A-række, Nedrykningsspil | Pulje A | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| 40+ A-række, Nedrykningsspil | Pulje B | nedrykningsspil | 1 | 2012–2012 | 1 | navneord: nedrykning |
| 50+ 2. Serie | 50+ 2.Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 50+ 6+2 Finale | Pulje 1 | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 50+ (4+4) rækken, Slutspil | Pulje A | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 50+ (4+4) rækken, Slutspil | Pulje B | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 50+ (6+2) rækken | Pulje 1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 50+ (6+2) rækken | Pulje 2 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 50+ (6+2), Slutspil for pulje 1 | Pulje A | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 50+ (6+2), Slutspil for pulje 2 | Pulje A | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 50+ (6+2), Slutspil for pulje 2 | Pulje B | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 50+ (6+2), Slutspil for pulje 1 | Pulje B | slutspil | 1 | 2012–2012 | 1 | navneord: slutspil |
| 50+ (4+4) rækken | Pulje 1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 60+ 2. Serie | 60+ 2.Serie | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| 60+ (2+2) rækken | Pulje 1 | grundspil | 1 | 2012–2012 | 1 | navneord: grundspil/pulje |
| LM 4+2 A | Sen 4+2 A | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4+2 B | Sen 4+2 B | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4H A | Sen 4H A | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4H B | Sen 4H B | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4H C | Sen 4H C | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| Slutspil serie 1 | Nedrykning til serie 2 | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| Slutspil serie 1 | Oprykning til Jyllandsserien | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| Oprykning JS | Pulje A | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| Oprykning Serie 1 | Pulje A | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| Oprykning Serie 2 | Pulje A | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| Nedrykning JS | Pulje A | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| Nedrykning JS | Pulje B | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| Nedrykning Serie 1 | Pulje B | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| Nedrykning Serie 2 | Pulje B | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| Oprykning JS | Pulje B | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| Kvalifikationskamp | Kvalifikation til DS | andet/ukendt | 1 | 2013–2013 | 1 | kvalifikation uden retning |
| Fynsserien -slutspil | Nedrykning | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| Fynsserien -slutspil | Oprykning | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| Fynsserien | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 35.serie | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| KS Oprykning | Pulje 1 | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| KS Nedrykning | Pulje 1 | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| 4. Serie P2 | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| LF-Serien SLUTSPIL | Nedrykning | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| LF-Serien SLUTSPIL | Oprykning | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| SM DH-rækken | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| SM SJ/Serie 1-rækken | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| SM Serie 2-3 rækken | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Sjællandsserien Slutspil - Oprykning | Pulje 1 | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| Serie 2, 6+4 Syd/Vest | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Serie 2-3, 4+2, Nord | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Serie 2-3, 4+2, Syd/Vest | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Serie 2-3, 4+2, Slutspil Syd/Vest - oprykning | Pulje 1 | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| Serie 2-3, 4+2, Slutspil Syd/Vest - nedrykning | Pulje 1 | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| Serie 3, Herrerække | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 Herre doubler - serie 1 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4H + 2D - doubler serie 1 Silkeborg | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 Herre doubler - serie 2 Silkeborg | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 Herre doubler - serie 2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4H + 2D - doubler serie 2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 Herre single/double - serie 1 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior Herre A | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior Hr. B kredskamp | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior Herre B | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior Herre B | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion Herre | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 2+2 mixhold | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior B - 4+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 2 | navneord: grundspil/pulje |
| 50+ ABC 4 Herrer 6 doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ ABC 4 Herrer 6 doubler | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ ABC 2+2 6 doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 17+ ABC 2+2 6 doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 17+ ABC 2+2 6 doubler | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 17+ ABC 4 + 2 spillere 6 doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ ABC 4+2 spillere 6 doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ ABC 4+2 spillere 6 doubler | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 17+ A 4 Herrer 6 doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 17+ BC 4 Herrer 6 doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Serie 1 4 Herrer | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior C 4H kun doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior Dx 4H | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior C 4H kun doubler | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 4 herrer 2 damer | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 Herre (4 singler 2 doubler) | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4 herrer 2 damer (6 kampe) | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 herre doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| A-række 4 herre doubler ombrydning | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| B-række 4 herre doubler ombrydning | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| C-række 4 herre double ombrydning | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| A-række Motion 4 herre 2 damer | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| B-række motion 4 herre 2 damer ombrydning | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| A-række 4 herre 4 singler og 2 double ombrydning | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| B-række 4 herre 4 singler 2 doubler ombrydning | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 herre doubler | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4 herrer 2 damer (6 kampe) | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 Herre (4 singler 2 doubler) | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 4 herre doubler | Pulje 3 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior 2 - 4H | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior 3 - 4H | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion - 4H | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior 3 - 4H | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior 2 - 4H | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Serie 3 + 4 + 5 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Senior + Veteran damedoubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Herre 1. + 2. division | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Herre 3. + 4. + 5. division | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion A 4 H doubler | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion B 4 H doubler serie 1 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion B 4 H doubler serie 2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion B 4 H doubler serie 3 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion B 4 H doubler serie 4 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion B 4 H doubler serie 5 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 1 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 3 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 4 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 5 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 6 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 7 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 8 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 4+4 serie 9 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Motion 2+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| DM for hold | 35-44 år | andet/ukendt | 1 | 2013–2013 | 1 | ingen sikker nøgle |
| Motionist B SLUTSPIL | Mot. A | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Motionist B SLUTSPIL | Mot. B | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Motionist B | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 4 Herrer | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 4 Herrer | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 4 Herrer | Pulje 3 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran (2+4) fjer | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran (2+4) fjer | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| OLD +35+40 4H 6D | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| LM 4H A | 40-45 4H | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4+2 B | Vet 40 4+2 | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| Veteran B slutspil | Pulje A | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Veteran B slutspil | Pulje B | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| 40+ 1. Serie | 1. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 2. Serie | 2. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 20. Serie | 20. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 3. Serie | 3. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 4. Serie | 4. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 5. Serie | 5. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 6. Serie | 6. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 7. Serie | 7. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 8. Serie | 8. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ 9. Serie | 9. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 40+ Elite | Elite | andet/ukendt | 1 | 2013–2013 | 1 | ingen sikker nøgle |
| Finale 40+ A | Finale | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| 40+ A-rækken, Oprykningsspil | Pulje 1 | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| 40+ A-rækken, Oprykningsspil | Pulje 2 | oprykningsspil | 1 | 2013–2013 | 1 | navneord: oprykning |
| 40+ A-rækken, Nedrykningsspil | Pulje 2 | nedrykningsspil | 1 | 2013–2013 | 1 | navneord: nedrykning |
| Vet. 40 - 45 M, 4+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Slutspil &#216; Vet 40 - 45 M 4 + 2 | Pulje 1 | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Slutspil N Vet. 40 - 45 M 4+2 | Pulje 1 | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Vet. 40 - 45 A, 4+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Vet. 40 - 45 B, 4+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Slutspil &#216; vet. 40 B 4+2 | Pulje 1 | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Slutspil N vet. 40 B 4+2 | Pulje 1 | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Vet. 40 - 45 C, 4+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Vet. 40 - 45 Dame | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Vet. 40 - 45 Herre A | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Vet. 40 - 45 Herre B | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Slutspil &#216; Vet. 40 Herre B | Pulje 1 | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Slutspil N Vet. 40 Herre B | Pulje 1 | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Veteran - 4 herrer | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Ombrydning +40+50 4+2 pulje 1 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Ombrydning +40+50 4+2 pulje 2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 40 HD A (vendedoubler) | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 40 HD B (vendedoubler) | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran D | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 40 HD B (vendedoubler) | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| DM for hold 45-54 år | 45 - 54 år | andet/ukendt | 1 | 2013–2013 | 1 | ingen sikker nøgle |
| LM 4+2 B | Vet 45 4+2 | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| Veteran +45+50 4H 6D | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 45 HD | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| LM 4+2 A | Vet 40-50 4+2 | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4H B | Vet 50-55 4H | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| 50+ 1. Serie | 1. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ 2. Serie | 2. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ 3. Serie | 3. serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ 4. Serie | 4. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ 5. Serie | 5. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ 6. Serie | 6. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 50+ 7. Serie | 7. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Finale 50+ (6+2) | Finale | slutspil | 1 | 2013–2013 | 1 | navneord: slutspil |
| Vet. 50 - 55 A, 4+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Vet. 50 - 55 B, 4+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran +50 4+2 9D | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 50 2+2 (vendedoubler) | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 50 HD | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 50 HD | Pulje 2 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| DM for hold 55+ | 55+ | andet/ukendt | 1 | 2013–2013 | 1 | ingen sikker nøgle |
| Veteran 55 (60) 2+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 55 HD | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| LM 4H | Vet 55-60 4H | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| 60+ 1. Serie | 1. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 60+ 2. Serie | 2. Serie | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| 60+, 2+2 rækken | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Vet. 60 - 65, 4+2 | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Vet. 60 - 65 Herre | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| Veteran 60 HD | Pulje 1 | grundspil | 1 | 2013–2013 | 1 | navneord: grundspil/pulje |
| LM 2+2 A | Mot 2+2 A | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 2+2 B | Mot 2+2 B | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4+4 B | Mot 4+4 p1 | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4+4 B | Mot 4+4 p2 | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4H A | Mot 4H A | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4H B | Mot 4H B1 | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4H B | Mot 4H B2 | andet/ukendt | 1 | 2013–2013 | 15 | ingen sikker nøgle |
| LM 4H C | Mot 4H C | andet/ukendt | 1 | 2013–2013 | 14 | ingen sikker nøgle |
| Kval. til 1. division | Kval. til 1. div. | andet/ukendt | 1 | 2014–2014 | 1 | kvalifikation uden retning |
| 2. division nedrykning | Nedrykning | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Kredsserien Vest kvalifikation til DS (runde 12) | Kvalifikationskamp 13 | andet/ukendt | 1 | 2014–2014 | 1 | kvalifikation uden retning |
| Kredsserien Vest kvalifikation til DS (runde 12) | Kvalifikationskamp 14 | andet/ukendt | 1 | 2014–2014 | 1 | kvalifikation uden retning |
| Kredsserien Vest kvalifikation til DS | Pulje A | andet/ukendt | 1 | 2014–2014 | 1 | kvalifikation uden retning |
| Kredsserien Vest kvalifikation til DS | Pulje B | andet/ukendt | 1 | 2014–2014 | 1 | kvalifikation uden retning |
| Kredsserien Vest nedrykning (runde 12) | Kvalifikationskamp 15 | kvalifikation_ned | 1 | 2014–2014 | 1 | navneord: kvalifikation + ned |
| Kredsserien Vest nedrykning | Pulje A | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Kredsserien Vest nedrykning | Pulje B | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Serie 1 Vest kvalifikation til Kredsserien Vest | Midt | andet/ukendt | 1 | 2014–2014 | 1 | kvalifikation uden retning |
| Serie 1 Vest kvalifikation til Kredsserien Vest | Nord | andet/ukendt | 1 | 2014–2014 | 1 | kvalifikation uden retning |
| Serie 1 Vest nedrykning | Midt | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Serie 1 Vest nedrykning | Nord | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Serie 1 Vest | Pulje 1 Midtjylland | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 1 Nordjylland | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 2 Midtjylland | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 1 Vest | Pulje 2 Nordjylland | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LM 4+2 A | Senior A 4+2 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4H A | Senior A 4H | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4+2 B | Senior B 4+2 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4H B | Senior B 4H | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4+2 C | Senior C 4+2 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4H C | Senior C 4H | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| &#197;ben motion | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Herre Senior A | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Herre B | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Herre B | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Slutspil Herre B | Slutspil placering 1-8 | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| Slutspil Herre B | Slutspil placering 9-16 | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| Slutspil serie 2 | Slutspil serie 2 nedrykning til serie 3 | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Slutspil serie 2 | Slutspil Serie 2 oprykning til serie 1 | oprykningsspil | 1 | 2014–2014 | 1 | navneord: oprykning |
| Slutspil Veteran B | Slutspil Veteran B Nedrykning | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Slutspil Veteran B | Slutspil Veteran B Oprykning til Veteran A | oprykningsspil | 1 | 2014–2014 | 1 | navneord: oprykning |
| Serie2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 1 | Nedrykningsslutspil | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Serie 1 | Oprykningsslutspil | oprykningsspil | 1 | 2014–2014 | 1 | navneord: oprykning |
| Kredsserie 5 (Fyn) | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 1 | Pulje 1 Fyn | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 1 | Pulje 2 Fyn | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Kredsserie Fyn | Nedrykningsslutspil | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Kredsserie Fyn | Oprykningsslutspil | oprykningsspil | 1 | 2014–2014 | 1 | navneord: oprykning |
| 1.serie P1 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 2.serie P1 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 3.serie P1 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4.serie P1 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 30.serie | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| KS-Oprykning | Pulje 1 | oprykningsspil | 1 | 2014–2014 | 1 | navneord: oprykning |
| KS-Nedrykning | Pulje 1 | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| 4.serie P2 | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 3.serie P2 | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 2.serie P2 | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 1.serie P2 | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LF-Serien - Slutspil | Pulje 1 - Oprykning | oprykningsspil | 1 | 2014–2014 | 1 | navneord: oprykning |
| LF-Serien - Slutspil | Pulje 2 - Nedrykning | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| SM Række 1 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| SM Række 2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 1 Slutspil - Nedrykning | Pulje 1 | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Serie 1 Slutspil - Nedrykning | Pulje 2 | nedrykningsspil | 1 | 2014–2014 | 1 | navneord: nedrykning |
| Serie 2, 6+4 Sydvest | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 3, 6+4, Slutspil Nord - Oprykning | Pulje 1 | oprykningsspil | 1 | 2014–2014 | 1 | navneord: oprykning |
| Serie 3, 6+4, Slutspil Nord - Placering | Pulje 1 | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| 4 Herre doubler Serie 1 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4 Herre single/double | Pulje 1 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| 4H+2D Doubler | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4 Herre Double serie 2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4 Herre Double Silkeborg | Serie 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4H+2D Doubler Silkeborg | Serie 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4 Herre Double Silkeborg | Serie 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4 Herrer serie 1 - &#216;stjylland | Pulje 101 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| 4 Herrer serie 1 - &#216;stjylland | Pulje 102 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| 4H serie 1 ( &#216;st ) Puljevinderkamp | Pulje 101-102 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| Senior Hr. A | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior Hr. B | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior Hr. B | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior Hr. B | Pulje 3 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior Hr. B Finale Fynsmester | Pulje 1 | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| 17+ - 4H A | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 50+ - 4H A/B | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 50+ - 4H C | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 2 4 Herrer | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Serie 2 4 Herrer | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior Cx-Dx 4H | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior C+D 4H doubler | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 2. runde Cx 4H | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 2. runde Dx 4H | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior 2 - 4H | Senior 2 Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior 2 - 4H | Senior 2 Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior 3 - 4H | Senior 3 Vestjylland | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| Motion 4H | Senior Motion Vestjylland | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| Motion 4+2 A-B-C | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior herre 4 doubler A-B | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior herre 4 doubler C | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior herre 4 singler +2 doubler A-B | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Senior herre 4 doubler A-B | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4H+2D Serie 2-3 | Pulje 100 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4 Herrer serie 2-3 | Pulje 103 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4 Herrer serie 2-3 | Pulje 104 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 4H serie 2-3 Puljevinderkamp | Pulje 103-104 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Veteran 4 Herrer C | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Veteran 4 Herrer B | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 2. runde +35A 4H | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 2. runde +35B 4H | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LM 4+2 A | 40+ 4+2 A | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4+2 B | 40+ 4+2 B | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4H | 40+ 4H | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| SLUTSPIL VETERAN B | SLUTSPIL Pulje A | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| SLUTSPIL VETERAN B | SLUTSPIL Pulje B | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| 40+ 9.serie | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 40+ A-række - finale | Pulje 1 | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| 40+ B-rækken, Oprykningsslutspil | Pulje 1 | oprykningsspil | 1 | 2014–2014 | 1 | navneord: oprykning |
| 40+, B-række, Placeringsspil | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 40-45 M, 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 40-45 A, 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 40-45 B, 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 40-45 C, 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 40-45 Dame | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 40-45 Hr. A, enkeltturnering med slutspil | Pulje 1 | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| Vet. Hr. A. Slutspil øverst | Pulje 1 | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| Vet. Hr. A. Slutspil nederst | Pulje 1 | slutspil | 1 | 2014–2014 | 1 | navneord: slutspil |
| Vet. 40-45 Hr. B, enkeltturnering | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Veteran +40+45+50 4H 6D | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 2. runde Veteran A +40/+50 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 2. runde Veteran B +40/+50 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Veteran A + B (4+2) | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Veteran D (4+2) | Pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet 40-50+ 4H+2D serie 1 | Pulje 105 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet 40-50+ 4H+2D serie 2-3 | Pulje 106 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet 4H+2D serie 2- 3 puljevinderkamp | Pulje 106 - 107 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet 40-50+ 4H+2D serie 2-3 | Pulje 107 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LM 4+2 | 45+ 4+2 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 2+2 | 50+ 2+2 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4+2 | 50+ 4+2 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4H | 50+ 4H | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| 50+, Eliterække | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 50-55 A, 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 50-55 B, 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 50+ Mot(x-mot) 4 Herrer | Pulje 129 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 50+ Puljevinderkamp | Pulje 129 - 130 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| 50+ Mot(x-mot) 4 Herrer | Pulje 130 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 60, 4+2 | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Vet. 60 Hr. | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LM 2+2 A | Motion 2+2 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4+4 A | Motion A 4+4 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4H A | Motion A 4H pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LM 4H A | Motion A 4H pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LM 4+4 B | Motion B 4+4 | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| LM 4H B | Motion B 4H pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LM 4H B | Motion B 4H pulje 2 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| LM 4H C | Motion C 4H | andet/ukendt | 1 | 2014–2014 | 1 | ingen sikker nøgle |
| Motion kun med doubler (2+2) | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| Motion kun med doubler Hr. | Pulje 1 | grundspil | 1 | 2014–2014 | 1 | navneord: grundspil/pulje |
| &#216;st-Mot 4D+4H | Pulje 108 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot 2D+2H M- A-række | Pulje 109 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot 2D+2H M- A-række | Pulje 110 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| 2D+2H M-A Puljevinderkamp | Pulje 109 - 110 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot 2D+2H B-C-række | Pulje 111 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot 2D+2H B-C-række | Pulje 112 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| 2D+2H B-C Puljevinderkamp | Pulje 111 - 112 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer Mesterrække | Pulje 113 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer Mesterrække | Pulje 114 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4H M Puljevinderkamp | Pulje 113-114 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer A-række | Pulje 115 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer A-række | Pulje 116 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer A-række | Pulje 117 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer A-række | Pulje 118 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer A-række | Pulje 119 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer A-række | Pulje 120 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer A-række | Pulje 121 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4H A Puljevinderkampe | Pulje 115 til 121 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer B-række | Pulje 122 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer B-række | Pulje 123 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer B-række | Pulje 124 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer B-række | Pulje 125 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4H B Puljevinderkampe | Pulje 122 til 125 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Herrer C-række | Pulje 126 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Damer M-A række | Pulje 127 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| &#216;st-Mot(x-mot) 4 Damer B-C række | Pulje 128 | grundspil | 1 | 2014–2014 | 2 | navneord: grundspil/pulje |
| 2. division | Kval. til 1. division | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| 2. division | 2. division nedrykning | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| 2.division | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 2.division | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Kvalifikation til 2. division (runde 12) | Kvalifikationsevent kamp 10 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til 2. division (runde 12) | Kvalifikationsevent kamp 9 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Nedrykning fra 3. division (runde 12) | Kvalifikationsevent kamp 11 | kvalifikation_ned | 1 | 2015–2015 | 1 | navneord: kvalifikation + ned |
| Nedrykning fra 3. division (runde 12) | Kvalifikationsevent kamp 12 | kvalifikation_ned | 1 | 2015–2015 | 1 | navneord: kvalifikation + ned |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 1 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 13 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 14 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien (øst) | Pulje A &#216;st | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien (øst) | Pulje B &#216;st | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Nedrykning Danmarksserien (vest) | Pulje A Vest | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Nedrykning Danmarksserien (vest) | Pulje B Vest | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 15 | kvalifikation_ned | 1 | 2015–2015 | 1 | navneord: kvalifikation + ned |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 16 | kvalifikation_ned | 1 | 2015–2015 | 1 | navneord: kvalifikation + ned |
| Kvalifikation til Danmarksserien (vest) | Pulje A | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til Danmarksserien (vest) | Pulje B | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til DS Vest (runde 12) | Kvalifikationsevent kamp 5 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til DS Vest (runde 12) | Kvalifikationsevent kamp 6 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Nedrykning fra Kredsserien (Vest) | Pulje A | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Nedrykning fra Kredsserien (Vest) | Pulje B | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Kvalifikation til Kredsserien (Vest) | Pulje A | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til Kredsserien (Vest) | Pulje B | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til Kredsserien (Vest) | Pulje C | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til Kredsserien (Vest) | Pulje D | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest (runde 12) | Kvalifikationsevent kamp 7 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest (runde 12) | Kvalifikationsevent kamp 8 | andet/ukendt | 1 | 2015–2015 | 1 | kvalifikation uden retning |
| Nedrykning fra Serie 1 (Vest) | Pulje A | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Nedrykning fra Serie 1 (Vest) | Pulje B | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Nedrykning fra Serie 1 (Vest) | Pulje C | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Nedrykning fra Serie 1 (Vest) | Pulje D | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| LM 4+2 B | Bronzekamp | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H C | Bronzekamp | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4+2 B | Finale | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H C | Finale | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H C | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+2 A | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+2 B | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+2 C | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H A/B | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+2 B | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H C | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H C | Slutspil 5.-6. plads | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| Sønderjysk Holdturnering senior serie 2 | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Sønderjysk Holdturnering senior serie 3 | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Sønderjysk Holdturnering Motion 4+2 A | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Sønderjysk Holdturnering Motion 4+2 B & C | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Sønderjysk Holdturnering senior 4 herre A - double | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Sønderjysk Holdturnering senior 4 herre B - double | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Sønderjysk Holdturnering senior 4 herre C - double | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Sønderjysk Holdturnering senior 4 herrer A & B | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Herre B Grundspil | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Slutspil Herre B | Pulje 1 Placering 1-8 | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| Herre B Grundspil | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Slutspil Herre B | Pulje 2 Placering 9-16 | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| Senior B-række, enkeltturnering | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Senior C-række | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Senior Hr. A Fynsmesterskab | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Senior Hr. B-række | Pulje 2 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Senior Hr. B-række | Pulje 3 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Senior Hr. B Fynsmesterskab | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| KS serie P1 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| KS serie P2 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 1. serie P1 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 2. serie P1 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 1. serie P2 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 2. serie P2 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 3. serie P1 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 3. serie P2 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4. serie P2 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4. serie P1 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 30. serie | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 5. serie P1 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| KS-OPRYKNING | Pulje 1 | oprykningsspil | 1 | 2015–2015 | 1 | navneord: oprykning |
| KS-NEDRYKNING | Pulje 1 | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Serie 2, Oprykningsspil | Pulje 1 | oprykningsspil | 1 | 2015–2015 | 1 | navneord: oprykning |
| Serie 2, Oprykningsspil | Pulje 2 | oprykningsspil | 1 | 2015–2015 | 1 | navneord: oprykning |
| Serie 2, Oprykningsspil | Pulje 3 | oprykningsspil | 1 | 2015–2015 | 1 | navneord: oprykning |
| Serie 2, Nedrykningsspil | Pulje 1 | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Serie 2, Nedrykningsspil | Pulje 2 | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| Serie 2, Nedrykningsspil | Pulje 3 | nedrykningsspil | 1 | 2015–2015 | 1 | navneord: nedrykning |
| SEN 4H + 2D Silkeborg (DGI-MID) | Forår Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| SEN 4H + 2D Silkeborg (DGI-MID) | Forår Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| SEN 4H + 2D Silkeborg (DGI-MID) | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior 1 Vestjylland | Pulje 1 | grundspil | 1 | 2015–2015 | 3 | navneord: grundspil/pulje |
| Senior 2 Vestjylland | Pulje 1 | grundspil | 1 | 2015–2015 | 3 | navneord: grundspil/pulje |
| Serie 1 Herre Doubler (DGI-MID) | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Serie 2 Herre Doubler (DGI-MID) | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4 Herre Double Silkeborg (DGI-MID) | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4H + 2D Doubler (DGI-MID) | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4H + 2D Doubler (DGI-MID) | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior 2 Vestjylland | Pulje 2 | grundspil | 1 | 2015–2015 | 3 | navneord: grundspil/pulje |
| 4 Herrer serie 1 (&#216;st) | Pulje 101 | grundspil | 1 | 2015–2015 | 3 | navneord: grundspil/pulje |
| 4 Herrer serie 1 (&#216;st) | Pulje 102 | grundspil | 1 | 2015–2015 | 3 | navneord: grundspil/pulje |
| 4 H, S1, Puljevinderkamp (&#216;st) | Pulje 101-102 | grundspil | 1 | 2015–2015 | 3 | navneord: grundspil/pulje |
| 4 Herrer serie 2-3 (&#216;st) | Pulje 103 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer serie 2-3 (&#216;st) | Pulje 104 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| SENIOR B-række | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Serie 1 + 2 4 Herrer | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Serie 1 + 2 4 Herrer | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior C+D 4 doubler | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior Bx-Cx 4H | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior Bx 4H ombrydning | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior A 4+2 ombrydning | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior B 4+2 ombrydning | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior A+B 4+2 | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior Cx 4H | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior Bx-Cx 4H | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior Bx-Cx 4H | Pulje 3 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Senior Cx 4H | Pulje 3 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4H+2D Serie 2-3 (&#216;st) | Pulje 100 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4 H, 2-3, Puljevinderkamp (&#216;st) | Pulje 103-104 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Veteran 4 Herrer B+C | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Veteran 4 Herrer B+C | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H 40+/50+ | Bronzekamp | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H 40+/50+ | Finale | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H 40+/50+ | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+2 A/B | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H 40+/50+ | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H 40+/50+ | Slutspil 5.-6. plads | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| Veteran 40-45 (4+2) M-række | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran 40-45 (4+2) A-række, enkeltturnering | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran 40-45 (4+2) B-rk. enkeltturn. med slutspil | Pulje 1 | slutspil | 1 | 2015–2015 | 2 | navneord: slutspil |
| Vet. 40-45 (4+2) B-rk. slutspil øverst | Pulje 1 | slutspil | 1 | 2015–2015 | 2 | navneord: slutspil |
| Vet. 40-45 (4+2) B-rk. slutspil nederst | Pulje 1 | slutspil | 1 | 2015–2015 | 2 | navneord: slutspil |
| Veteran 40-45 Hr. A-række, enkeltturnering | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran 40-45 Hr. B-række | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran 40-45 Hr. B-række | Pulje 2 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran 40 Hr. B Fynsmesterskab | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran 40-45 Dame A-række | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 40+ 2. serie | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 40+ A-rækken, Oprykningsslutspil | Pulje 1 | oprykningsspil | 1 | 2015–2015 | 1 | navneord: oprykning |
| 40+, 6+2 rækken, topslutspil | Pulje 1 | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| 40+, 6+2 rækken, 5-8 slutspil | Pulje 1 | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| Vet 40-50 4H+2D serie 1 (&#216;st) | Pulje 105 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Vet 40-50 4H+2D serie 2-3 (&#216;st) | Pulje 106 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Vet 40-50 4H+2D serie 2-3 (&#216;st) | Pulje 107 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Vet 4H+2D S. 2-3 Puljevinderkamp (&#216;st) | Pulje 106-107 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran +40+45+50 4+2 9 doubler | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Veteran +40+45+50 A 4+2 9 doubler | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Veteran +40+45+50 B 4+2 9 doubler | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Veteran +40+45+50 4+2 9 doubler | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Veteran A+B (4+2) | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+2 45+/50+ | Bronzekamp | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4+2 45+/50+ | Finale | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4+2 45+/50+ | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+2 45+/50+ | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+2 45+/50+ | Slutspil 5.-6. plads | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| Veteran +40+45+50 4H 6 doubler | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 2+2 | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Veteran 50-55 (4+2) A-række | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran 50-55 (4+2) B-række | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 50+, Elitetrækken | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) A-række (&#216;st) | Pulje 129 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) B-C række (&#216;st) | Pulje 130 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran +55 4H 6 doubler | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Veteran 60 (4+2) A-række | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| Veteran 60 Hr. B-række | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 60+ 2+2 | Pulje 131 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 60+ 4H | Pulje 132 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H B/4D | Bronzekamp | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H A | Bronzekamp | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H B/4D | Finale | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H A | Finale | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4+4 A/B | Finale A hold | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4+4 A/B | Finale B hold | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| LM 4H A | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 2+2 A/B | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+4 A/B | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H C/4D | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H B/4D | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H B/4D | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4+4 A/B | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| LM 4H A | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| Motion Hr. doubler | Pulje 1 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 2D+2H M-A række (&#216;st) | Pulje 108 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 2D+2H M-A række (&#216;st) | Pulje 109 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 2D+2H M-A puljevinderkamp (&#216;st) | Pulje 108-109 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 2D+2H B-C række (&#216;st) | Pulje 110 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 2D+2H B-C række (&#216;st) | Pulje 111 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 2D+2H B-C Puljevinderkamp(&#216;st) | Pulje 110-111 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) M-række (&#216;st) | Pulje 112 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) M-række (&#216;st) | Pulje 113 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4H. (x-mot) M - Puljevinderkamp (&#216;st) | Pulje 112-113 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) A-række (&#216;st) | Pulje 114 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) A-række (&#216;st) | Pulje 115 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) A-række (&#216;st) | Pulje 116 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) A-række (&#216;st) | Pulje 117 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) A-række (&#216;st) | Pulje 118 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) A-række (&#216;st) | Pulje 119 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4H. (x-mot) A - Puljevinderkampe (&#216;st) | Pulje 114 til 119 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) B-række (&#216;st) | Pulje 120 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) B-række (&#216;st) | Pulje 121 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) B-række (&#216;st) | Pulje 122 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) B-række (&#216;st) | Pulje 123 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) B-række (&#216;st) | Pulje 124 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4H. (x-mot) B - Puljevinderkampe (&#216;st) | Pulje 120 til 124 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Herrer (x-mot) C-række (&#216;st) | Pulje 125 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Damer (x-mot) (&#216;st) | Pulje 126 | grundspil | 1 | 2015–2015 | 2 | navneord: grundspil/pulje |
| 4 Damer ( slutspil ) B-række (&#216;st) | Pulje 126 B | slutspil | 1 | 2015–2015 | 2 | navneord: slutspil |
| MOT 4+2 u/s Serie 3-4 | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer Serie 4-5 | Pulje 2 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 50+ - 4H A | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 50+ - 4H B/C | Pulje 1 | grundspil | 1 | 2015–2015 | 1 | navneord: grundspil/pulje |
| 4 Damer ( slutspil ) A-række (&#216;st) | Pulje 126 A | slutspil | 1 | 2015–2015 | 1 | navneord: slutspil |
| DM Veteran for hold | 35-44 | andet/ukendt | 1 | 2015–2015 | 1 | ingen sikker nøgle |
| DM Veteran for hold | 45-54 | andet/ukendt | 1 | 2015–2015 | 1 | ingen sikker nøgle |
| DM Veteran for hold | 55+ | andet/ukendt | 1 | 2015–2015 | 1 | ingen sikker nøgle |
| DM-Hold Senior 4 spillere | 5. - 6. plads | andet/ukendt | 1 | 2016–2016 | 2 | ingen sikker nøgle |
| DM-Hold Senior 4+2 | 5. - 8. plads | andet/ukendt | 1 | 2016–2016 | 2 | ingen sikker nøgle |
| DM-Hold Senior 4 spillere | 7. - 8. plads | andet/ukendt | 1 | 2016–2016 | 2 | ingen sikker nøgle |
| DM-Hold Senior 4+2 | 9. - 12. plads | andet/ukendt | 1 | 2016–2016 | 2 | ingen sikker nøgle |
| DM-Hold Senior 4 spillere | Bronzekamp | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| DM-Hold Senior 4 spillere | Finale | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| DM-Hold Senior 4+2 | Finalerunde | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| DM-Hold Senior 4 spillere | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Senior 4 spillere | Pulje 2 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Senior 4+2 | Pulje A | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Senior 4+2 | Pulje B1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Senior 4+2 | Pulje B2 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Senior 4+2 | Pulje B3 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Senior 4+2 | Pulje B4 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Serie 2 | Pulje 5 slutspil 1-S&#216;N | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| Serie 2 | Pulje 5 slutspil 2 - S&#216;N | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| Serie 2 | Pulje 5-S&#216;N | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| Kvalifikation til Danmarksserien | Pulje A | andet/ukendt | 1 | 2016–2016 | 4 | kvalifikation uden retning |
| Kvalifikation til Danmarksserien | Pulje B | andet/ukendt | 1 | 2016–2016 | 4 | kvalifikation uden retning |
| Nedrykning fra Kredsserien Vest | Pulje A | nedrykningsspil | 1 | 2016–2016 | 4 | navneord: nedrykning |
| Nedrykning fra Kredsserien Vest | Pulje B | nedrykningsspil | 1 | 2016–2016 | 4 | navneord: nedrykning |
| Kvalifikation til Kredsserien Vest | Kvalifikation Pulje A | andet/ukendt | 1 | 2016–2016 | 4 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest | Kvalifikation Pulje B | andet/ukendt | 1 | 2016–2016 | 4 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest | Kvalifikation Pulje C | andet/ukendt | 1 | 2016–2016 | 4 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest | Kvalifikation Pulje D | andet/ukendt | 1 | 2016–2016 | 4 | kvalifikation uden retning |
| Nedrykning fra Serie 1 | Nedrykning Pulje A | nedrykningsspil | 1 | 2016–2016 | 4 | navneord: nedrykning |
| Nedrykning fra Serie 1 | Nedrykning Pulje B | nedrykningsspil | 1 | 2016–2016 | 4 | navneord: nedrykning |
| Nedrykning fra Serie 1 | Nedrykning Pulje C | nedrykningsspil | 1 | 2016–2016 | 4 | navneord: nedrykning |
| Nedrykning fra Serie 1 | Nedrykning Pulje D | nedrykningsspil | 1 | 2016–2016 | 4 | navneord: nedrykning |
| 4 spillere double A ny | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Nordjysk Mesterskab 4 spillere single B | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Nordjysk Mester Veteran B | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 4 spillere single B | Pulje 2 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 4 spillere single B | Pulje 3 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 4. Serie P2 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| KS-NEDRYKNING | KS-NEDRYKNING | nedrykningsspil | 1 | 2016–2016 | 1 | navneord: nedrykning |
| KS-OPRYKNING | KS-oprykning | oprykningsspil | 1 | 2016–2016 | 1 | navneord: oprykning |
| 30. Serie P1 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| KS Serie P1 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| KS Serie P2 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 1.Serie P1 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 1.Serie P2 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 2. Serie P2 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 3. Serie P2 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Kvalifikations-række | Nedrykningspulje | kvalifikation_ned | 1 | 2016–2016 | 2 | navneord: kvalifikation + ned |
| Kvalifikations-række | Oprykningsslutspil | kvalifikation_op | 1 | 2016–2016 | 2 | navneord: kvalifikation + op |
| Senior A-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Senior Hr. A-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| 4+2, A-B række | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 4+2, A-B række | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 4 herrer, A-B-række | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 4 herrer, A-B-række | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| Seniorholdturneringsdag, A-rækken | Nr. 1 A-rækken | andet/ukendt | 1 | 2016–2016 | 1 | ingen sikker nøgle |
| Seniorholdturneringsdag, A-rækken | Nr. 2 A-rækken | andet/ukendt | 1 | 2016–2016 | 1 | ingen sikker nøgle |
| Seniorholdturneringsdag, A-rækken | Nr. 3 A-rækken | andet/ukendt | 1 | 2016–2016 | 1 | ingen sikker nøgle |
| Seniorholdturneringsdag, B-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Seniorholdturneringsdag, A-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Seniorholdturneringsdag, A-rækken | Pulje 2 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| DM-Hold Veteran 40+ 4+2 | 3. - 4. plads | andet/ukendt | 1 | 2016–2016 | 2 | ingen sikker nøgle |
| DM-Hold Veteran 40+ 4+2 | 5. - 6. plads | andet/ukendt | 1 | 2016–2016 | 2 | ingen sikker nøgle |
| DM-Hold Veteran 40+ 4+2 | 7. - 8. plads | andet/ukendt | 1 | 2016–2016 | 2 | ingen sikker nøgle |
| DM-Hold Veteran 40+ 4+2 | Finale | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| DM-Hold Veteran 40+ 4 Herre | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Veteran 40+ 4+2 | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Veteran 40+ 4+2 | Pulje 2 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| 40+ 4+2 A - Double - 9 kampe | Pulje 341 ( 40-50 A DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 40+ 4+2 B - Double - 9 kampe | Pulje 342 ( 40-50 B-C DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 40+ 4+2 B - Double - 9 kampe | Pulje 342-343 ( 40-50 B-C DGI-&#216;ST ) Slutspil | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 40+ 4+2 B - Double - 9 kampe | Pulje 343 ( 40-50 B-C DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 40+ 4+2 B - Double - 9 kampe | Pulje 541 MIDT-SYD 40+ B/50+ B (DGI-Sydøst) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 40+ 4+2 B - Double - 9 kampe | Pulje 542 MIDT-SYD 40+ B/50+ B (DGI-Sydøst) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 40+ 4+2 - Slutspil A | Pulje 543 MIDT-SYD 40+ B/50+ B Slutspil A (DGI-Sydøst) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 40+ 4+2 - Slutspil B | Pulje 544 MIDT-SYD 40+ B/50+ B Slutspil B (DGI-Sydøst) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 40+ 4 spillere A - Double - 6 kampe | Pulje 441 MIDT-SYD 40+ A/MOT A (DGI-SYV) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 40+ 4 spillere B - Double - 6 kampe | Pulje 442 MIDT-SYD 40+ B/50+ A/B (DGI-SYV) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 40+ 4 spillere C - Double - 6 kampe | Pulje 443 MIDT-SYD 40+ C/50+ B/MOT C (DGI-SYV) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 40+ 4 spillere B - Double - 6 kampe | Pulje 540 MIDT-SYD 40+ B (DGI-Sydøst) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| Veteran 40+ (4+2) A-række | Nedrykning | nedrykningsspil | 1 | 2016–2016 | 2 | navneord: nedrykning |
| Veteran 40+ (4+2) A-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Veteran 40+ (4+2) A-række | Slutspil | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| Veteran 40+ (4+2) B-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Veteran 40+ Hr. A-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Veteran 40+ Hr. B-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Veteran 40+ Dame A-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| vet. 20.serie | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 40+, 6+4 Eliterækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 6+4 Eliterækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 6+4 Mesterrækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 6+4 Mesterrækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 6+4 A-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 6+4 A-rækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 6+4 A-rækken - finale | Finale | slutspil | 1 | 2016–2016 | 4 | navneord: slutspil |
| 40+, 4+2 A-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 4+2 B-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 4+2 C-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 4+2 C-rækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 4+2 C-række - finale | Finale | slutspil | 1 | 2016–2016 | 4 | navneord: slutspil |
| 40+, 4 Herrer B-rækken finale | Pulje 1 | slutspil | 1 | 2016–2016 | 4 | navneord: slutspil |
| 40+, 4 Herrer A-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 4 Herrer B-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 4 Herrer B-rækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| DM-Hold Veteran 50+ 4+2 | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Veteran 50+/60+ 4 Herre | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Veteran 50+/60+ 4 Herre | Pulje 2 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Veteran 50+/60+ 4 Herre | Slutspil A | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| DM-Hold Veteran 50+/60+ 4 Herre | Slutspil B | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| 50+ 4 spillere A - Double - 6 kampe | Pulje 351 ( 4H DGI-&#216;st ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 50+ 4 spillere B - Double - 6 kampe | Pulje 352 ( 4H DGI-&#216;st ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 50+ 4 spillere B - Double - 6 kampe | Pulje 550 MIDT-SYD 50+ B (DGI-Sydøst) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| Veteran 50+ (4+2) A-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Veteran 50+ (4+2) B-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| 50+ 8.serie | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 50+, 4+2 Eliterække | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 50+, 4+2 A-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 50+, 4+2 A-rækken, finale | Pulje 1 | slutspil | 1 | 2016–2016 | 4 | navneord: slutspil |
| 50+, 4+2 A-rækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 50+, 4+2 B-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 50+, 4+2 B-rækken, finale | Pulje 1 | slutspil | 1 | 2016–2016 | 4 | navneord: slutspil |
| 50+, 4+2 B-rækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 50+, 4 Herrer B-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 40+, 4 Herrer B-rækken, finale | Pulje 1 | slutspil | 1 | 2016–2016 | 4 | navneord: slutspil |
| 50+, 4 Herrer B-rækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| Veteran 60+ (4+2) A-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| Veteran 60+ Hr. B-række | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| 60+, 2+2 B-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 60+, 2+2 B-rækken , finale | Pulje 1 | slutspil | 1 | 2016–2016 | 4 | navneord: slutspil |
| 60+, 2+2 B-rækken | Pulje 2 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 60+, 4 Herrer B-rækken | Pulje 1 | grundspil | 1 | 2016–2016 | 4 | navneord: grundspil/pulje |
| 60+ 2+2 A-B | Pulje 360 ( DGI-&#216;ST 2+2 ) A-B | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 60+ 2+2 A-B | Pulje 361 ( finale 1-2 ) A | slutspil | 1 | 2016–2016 | 1 | navneord: slutspil |
| 60+ 2+2 A-B | Pulje 362 ( finale 3-4 ) A | slutspil | 1 | 2016–2016 | 1 | navneord: slutspil |
| 60+ 2+2 A-B | Pulje 363 ( finale 5-6 ) B | slutspil | 1 | 2016–2016 | 1 | navneord: slutspil |
| 60+ 2+2 A-B | Pulje 364 ( finale 7-8 ) B | slutspil | 1 | 2016–2016 | 1 | navneord: slutspil |
| 60+ 4H A-B | Pulje 365 ( DGI-&#216;ST 4H ) A-B | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| 60+ 4H A-B | Pulje 366 ( finale 1-2 ) A | slutspil | 1 | 2016–2016 | 1 | navneord: slutspil |
| 60+ 4H A-B | Pulje 367 ( finale 3-4 ) A | slutspil | 1 | 2016–2016 | 1 | navneord: slutspil |
| 60+ 4H A-B | Pulje 368 ( finale 5-6 ) B | slutspil | 1 | 2016–2016 | 1 | navneord: slutspil |
| 60+ 4H A-B | Pulje 369 ( finale 7-8 ) B | slutspil | 1 | 2016–2016 | 1 | navneord: slutspil |
| DM-Hold Motion A/B 4+4 | 5. - 6. plads | andet/ukendt | 1 | 2016–2016 | 2 | ingen sikker nøgle |
| DM-Hold Motion A/B 4+4 | Finalerunde | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| DM-Hold Motion A 4 spillere | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion B 4 spillere | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion 4+2 | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion A/B 4+4 | Pulje 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion A/B 4+4 | Pulje 2 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion 4+2 | Pulje 2 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion 4+2 | Pulje 3 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion 4+2 | Slutspil A | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| DM-Hold Motion 4+2 | Slutspil B | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| DM-Hold Motion 4+2 | Slutspil C | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| 4+2 B Double - 9 kampe | Pulje 201 Midtjylland (DGI MID) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4+2 B Double - 9 kampe | Pulje 202 Vestergadehallen (DGI-MID) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4+2 A Double - 9 kampe | Pulje 623 MOT 4+2 A/B double (MIDT-S&#216;N) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4+2 B Double - 9 kampe | Pulje 941 MIDT-SYD MOT B 4+2 (DGI-SYV) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 2+2 A Double - 6 kampe | Pulje 311 ( 2+2 DGI-&#216;st ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 2+2 B Double - 6 kampe | Pulje 312 ( 2+2 DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 2+2 B Double - 6 kampe | Pulje 312-313 ( 2+2 DGI-&#216;ST ) Slutspil | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 2+2 B Double - 6 kampe | Pulje 313 ( 2+2 DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 2+2 C Double - 6 kampe | Pulje 314 ( 2+2 DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pujle 741 MIDT-SYD MOT B 4sp (DGI-SYV) | andet/ukendt | 1 | 2016–2016 | 8 | ingen sikker nøgle |
| 4 spillere B - Double - 6 kampe | Pulje 131 (DGI-Vest) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere D - Double - 6 kampe | Pulje 132 (DGI-Vest) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere A - Double - 6 kampe | Pulje 221 Midtjylland (DGI-MID) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje 222 Midtjylland (DGI-MID) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje 223 Vestergadehallen (DGI-MID) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje 224 Vestergadehallen (DGI-MID) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere A - Double - 6 kampe | Pulje 321-322 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere A - Double - 6 kampe | Pulje 321-322 , 1 slutspil 1-2 ( 4H DGI-&#216;ST ) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere A - Double - 6 kampe | Pulje 321-322 , 2 slutspil 3-4 ( 4H DGI-&#216;ST ) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere A - Double - 6 kampe | Pulje 321-322 , 3 slutspil 5-6 ( 4H DGI-&#216;ST ) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere A - Double - 6 kampe | Pulje 321-322 , 4 slutspil 7-8 ( 4H DGI-&#216;ST ) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere B - Double - 6 kampe | Pulje 323 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje 324 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje 325 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje 326 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere C - Double - 6 kampe | Pulje 327 ( 4H DGI-&#216;st ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere C - Double - 6 kampe | Pulje 328 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere C - Double - 6 kampe | Pulje 329 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere C - Double - 6 kampe | Pulje 330 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere C - Double - 6 kampe | Pulje 331 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere D - Double - 6 kampe | Pulje 332 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje 512 MIDT-SYD Mot B 4 sp (DGI Sydøst) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere C - Double - 6 kampe | Pulje 513 MIDT-SYD Mot C 4 sp (DGI Sydøst) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere A - Double - 6 kampe | Pulje 621 MOT/40+/50+ A (MIDT-S&#216;N) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje 624 MOT. B 4 sp./40+B/40+C double (MIDT-S&#216;N) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere C - Double - 6 kampe | Pulje 625 MOT.4 sp. C/D double (MIDT-S&#216;N) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Double - 6 kampe | Pulje Slutspil ( 4H DGI-&#216;ST ) P. 323-24-25-26 | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere C - Double - 6 kampe | Pulje Slutspil ( 4H DGI-&#216;ST ) P. 327-28-29-30-31 | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere A - Single / double - 8 kampe | Pulje 121 (DGI-Vest) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Single / double - 8 kampe | Pulje 122 (DGI-Vest) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Single / double - 8 kampe | Pulje 123 Slutspil 1-4 (DGI Vest) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere B - Single / double - 8 kampe | Pulje 124 Slutspil 5+8 (DGI Vest) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere A - Single / double - 8 kampe | Pulje 333 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere A - Single / double - 8 kampe | Pulje 333 - 334 ( 4H DGI-&#216;ST ) Slutspil | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere A - Single / double - 8 kampe | Pulje 334 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Single / double - 8 kampe | Pulje 335 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Single / double - 8 kampe | Pulje 336 ( 4H DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 damer A-B - Double - 6 kampe | Pulje 337 ( 4D DGI-&#216;ST ) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Single / double - 8 kampe | Pulje 510 MIDT-SYD Mot A/B 4 sp (DGI Sydøst) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Single / double - 8 kampe | Pulje 511 MIDT-SYD Mot A/B 4 sp (DGI Sydøst) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere B - Single / double - 8 kampe | Pulje 512 MIDT-SYD Mot A/B 4 sp SLUTSPIL A (DGI Sydøst) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere B - Single / double - 8 kampe | Pulje 513 MIDT-SYD Mot A/B 4 sp SLUTSPIL B (DGI Sydøst) | slutspil | 1 | 2016–2016 | 8 | navneord: slutspil |
| 4 spillere A - Single / double - 8 kampe | Pulje 622 MOT. A/B (MIDT-S&#216;N) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere A - Single / double - 8 kampe | Pulje 942 MIDT-SYD MOT A/B 4 sp (DGI-SYV) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| 4 spillere C - Single / double - 8 kampe | Pulje 943 MIDT-SYD MOT C 4 sp (DGI-SYV) | grundspil | 1 | 2016–2016 | 8 | navneord: grundspil/pulje |
| Motionist A | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| MOT 4 herrer Elite | Grundspil 1 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| MOT 4 herrer Elite | Grundspil 2 | grundspil | 1 | 2016–2016 | 2 | navneord: grundspil/pulje |
| MOT 4 herrer Elite | Slutspil 1 | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| MOT 4 herrer Elite | Slutspil 2 | slutspil | 1 | 2016–2016 | 2 | navneord: slutspil |
| 50+ 4H - Serie 2/3 (B/C) | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Motion 4+4 Serie 2+3 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Motion 4 herrer Serie 1 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Motion 4 herrer Serie 2 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Motion 4 herrer Serie 2 | Pulje 2 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Motion 4 herrer Serie 2 | Pulje 3 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Motion 4+2 serie 1+2 | Pulje 1 | grundspil | 1 | 2016–2016 | 1 | navneord: grundspil/pulje |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 9 | andet/ukendt | 1 | 2017–2017 | 1 | kvalifikation uden retning |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 7 | kvalifikation_ned | 1 | 2017–2017 | 1 | navneord: kvalifikation + ned |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 8 | kvalifikation_ned | 1 | 2017–2017 | 1 | navneord: kvalifikation + ned |
| Serie 2 | Pulje 4A slutspil 1 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| Serie 2 | Pulje 4B sluspil 2 | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| SLUTSPIL Serie 4 | SLUTSPIL Pulje A | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| SLUTSPIL Serie 4 | SLUTSPIL Pulje B | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| SEN A 4+2 | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| SEN B 4+2 | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| SEN C 4+2 | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| KS-P1 | Pulje 1 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| KS-P2 | Pulje 2 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| LF - Serien | Pulje 1 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| Serie 3 slutspil, oprykning | Pulje 1 | oprykningsspil | 1 | 2017–2017 | 1 | navneord: oprykning |
| Serie 3 slutspil, oprykning | Pulje 2 | oprykningsspil | 1 | 2017–2017 | 1 | navneord: oprykning |
| Serie 3 slutspil, 5-8 | Pulje 1 | slutspil | 1 | 2017–2017 | 1 | navneord: slutspil |
| 4+2 A-/B-række | Pulje 1 | grundspil | 1 | 2017–2017 | 4 | navneord: grundspil/pulje |
| 4+2 A-/B-række | Pulje 2 | grundspil | 1 | 2017–2017 | 4 | navneord: grundspil/pulje |
| 4 Herrer, B-række (Serie2-3) | Pulje 1 | grundspil | 1 | 2017–2017 | 4 | navneord: grundspil/pulje |
| 4 Herrer, B-række (Serie2-3) | Pulje 2 | grundspil | 1 | 2017–2017 | 4 | navneord: grundspil/pulje |
| Seniorholdturneringsdag B-række | Pulje 2 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| Seniorholdturneringsdag B-række | Pulje 3 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| Seniorholdturneringsdag B-række | Pulje 4 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| Seniorholdturneringsdag B-række | Pulje 5 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| 4+2 A DOUBLE - 9 kampe | Pulje 341 ( 4+2 A DGI-&#216;ST ) 40+/mot | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4+2 B DOUBLE - 9 kampe | Pulje 342 ( 4+2 B DGI-&#216;ST ) 40/50+/mot | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4+2 B DOUBLE - 9 kampe | Pulje 343 ( 4+2 B DGI-&#216;ST ) 40/50+/mot | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4+2 B DOUBLE - 9 kampe | Pulje 344 ( 4+2 B DGI-&#216;ST ) Slutspil 342-43 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4+2 B DOUBLE - 9 kampe | Pulje 541 DGI Sydøst 40/50+/Mot B 4+2 | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4+2 B DOUBLE - 9 kampe | Pulje 549 DGI Sydøst 40+ B/MOT B 4+2 | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 441 Sydvest 40+A / MOT A | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 442 Sydvest 40+B / 50+A/B | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 443 Sydvest 40+C / 50+ /Mot C/D | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 550 Sydøst 40+ B Doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 551 Sydøst 40+ Doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 552 Sydøst 40+ B Doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 553 Sydøst 40+ B Doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 40+ VET 4+2 A | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 40+ VET 4+2 B | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 40+ VET 4+2 C | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 40+ VET Hr - A | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 40+ VET Hr - B | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 40+ VET Dame - A | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 40+ 7. Serie | Pulje 1 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| 6+4 A-rækken - oprykningsspil | Finale | oprykningsspil | 1 | 2017–2017 | 4 | navneord: oprykning |
| 6+4 A-rækken - oprykningsspil | Pulje 1 | oprykningsspil | 1 | 2017–2017 | 4 | navneord: oprykning |
| 6+4 A-rækken - oprykningsspil | Pulje 2 | oprykningsspil | 1 | 2017–2017 | 4 | navneord: oprykning |
| 6+4 A-rækken - 5-8 slutspil | Pulje 1 | slutspil | 1 | 2017–2017 | 4 | navneord: slutspil |
| 6+4 A-rækken - 5-8 slutspil | Pulje 2 | slutspil | 1 | 2017–2017 | 4 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 351 ( 4H A-B DGI-&#216;st ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 352 ( 4H A-B DGI-&#216;st ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 353 ( 4H A-B DGI-&#216;st ) slutspil 1-2 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 354 ( 4H A-B DGI-&#216;st ) slutspil 3-4 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 355 ( 4H A-B DGI-&#216;st ) slutspil 5-6 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 356 ( 4H A-B DGI-&#216;st ) slutspil 7-8 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 357 ( 4H A-B DGI-&#216;st ) slutspil 9-10 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 542 Sydøst 50+ B Doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 50+ VET 4+2 A | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 50+ VET 4+2 B | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 4+2 B-rækken | Finale | slutspil | 1 | 2017–2017 | 4 | navneord: slutspil |
| DM-Hold Veteran 4 Herre 50+/60+ | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 60+ VET 4+2 A | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 60+ 1.Serie | Pulje 1 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| 60+ 2.Serie | Pulje 1 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| 60+ 2+2 A | Pulje 361 ( 60+ 2+2 A DGI &#216;st ) | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| 60+ 2+2 A | Pulje 362 ( 60+ 2+2 A DGI &#216;st ) slutspil | slutspil | 1 | 2017–2017 | 1 | navneord: slutspil |
| 60+ 2+2 B | Pulje 363 ( 2+2 B DGI &#216;st ) | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| 60+ 4H A | Pulje 364 ( 4H A DGI &#216;st ) | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| 60+ 4H B | Pulje 365 ( 4H B DGI &#216;st ) | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| DM-Hold Motion 4+2 | 5. - 8. plads | andet/ukendt | 1 | 2017–2017 | 2 | ingen sikker nøgle |
| DM-Hold Motion 4+2 | 9. - 12. plads | andet/ukendt | 1 | 2017–2017 | 2 | ingen sikker nøgle |
| DM-Hold Motion 4+2 | Finale slutspil 1. - 4 plads | slutspil | 1 | 2017–2017 | 2 | navneord: slutspil |
| DM-Hold Motion 4+2 | Pulje A1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion 4+2 | Pulje A2 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion 4+2 | Pulje B1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| DM-Hold Motion 4+2 | Pulje B2 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4+4 | Pulje A | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4+4 | Pulje B | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4 spillere | Finale slutspil 1. - 4. plads | slutspil | 1 | 2017–2017 | 2 | navneord: slutspil |
| LM Motions-Hold 4 spillere | Placeringskampe 5. - 12. plads (pulje 1) | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4 spillere | Placeringskampe 5. - 12. plads (pulje 2) | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4 spillere | Pulje A1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4 spillere | Pulje A2 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4 spillere | Pulje B1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4 spillere | Pulje B2 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| LM Motions-Hold 4 spillere | Slutspil 13. - 16. plads | slutspil | 1 | 2017–2017 | 2 | navneord: slutspil |
| 4+2 B DOUBLE - 9 kampe | Pulje 201 (DGI Midt) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4+2 B DOUBLE - 9 kampe | Pulje 202 Vestergade hallen (DGI Midt) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4+2 B DOUBLE - 9 kampe | Pulje 401 MIDT (DGI -SYV) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4+2 A DOUBLE - 9 kampe | Pulje 623 4+2 A/B Double (DGI-S&#216;N) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 2+2 B DOUBLE - 6 kampe | Pulje 312 ( 2+2 A-B DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 2+2 B DOUBLE - 6 kampe | Pulje 313 ( 2+2 A-B DGI-&#216;ST ) slutspil | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 2+2 C DOUBLE - 6 kampe | Pulje 314 ( 2+2 C DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 2+2 C DOUBLE - 6 kampe | Pulje 315 ( 2+2 C DGI &#216;st ) slutspil 1 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 2+2 C DOUBLE - 6 kampe | Pulje 316 ( 2+2 C DGI &#216;st ) slutspil 2 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 101 (DGI Vest) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere D DOUBLE - 6 kampe | Pulje 102 (DGI Vest) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 221 (DGI Midt) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 221 slutspil 1 (DGI Midt) | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 221 slutspil 2 (DGI Midt) | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 222 (DGI Midt) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 223 (DGI Midt) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 321 ( 4H A DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 321-22 ( 4H A DGI-&#216;ST ) slutspil | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 322 ( 4H A DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 323 ( 4H B DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 324 ( 4H B DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 325 ( 4H B DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 326 ( 4H B DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 327 ( 4H B DGI-&#216;st ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 328 ( 4H B DGI-&#216;ST ) Slutspil P. 323-24-25-26-27 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 329 ( 4H C DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 330 ( 4H C DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 331 ( 4H C DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 332 ( 4H C DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 333 ( 4H C DGI-&#216;ST ) Slutspil P. 329-30-31-32 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere D DOUBLE - 6 kampe | Pulje 334 ( 4H D DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 543 DGI Sydøst Motion B Doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 544 DGI Sydøst Motion C/D Doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 621 4 Spillere A Double (DGI-S&#216;N) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 629 4 spillere B double (DGI-S&#216;N) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 634 4 spillere C/D double | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A SINGLE/DOUBLE - 8 kampe | Pulje 103 (DGI Vest) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 104 (DGI Vest) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 105 (DGI Vest) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 106 (1+2 pulje 104/05) (DGI Vest) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 107 (3+4+5 104/05) (DGI Vest) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 335 ( 4H B DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C SINGLE/DOUBLE - 8 kampe | Pulje 336 ( 4H C DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere C SINGLE/DOUBLE - 8 kampe | Pulje 337 ( 4H C DGI-&#216;ST ) Slutspil 1 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Spillere C SINGLE/DOUBLE - 8 kampe | Pulje 338 ( 4H C DGI-&#216;ST ) Slutspil 2 | slutspil | 1 | 2017–2017 | 8 | navneord: slutspil |
| 4 Damer DOUBLE - 6 kampe | Pulje 339 ( 4Damer DGI-&#216;ST ) | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 401 DGi Sydvest A+B+C | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A SINGLE/DOUBLE - 8 kampe | Pulje 545 DGI Sydøst Motion A 4 sp. single/doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| 4 Spillere A SINGLE/DOUBLE - 8 kampe | Pulje 546 DGI Sydøst Motion B 4 sp. single/doubler | grundspil | 1 | 2017–2017 | 8 | navneord: grundspil/pulje |
| MOT 4+4 Serie 6 | Pulje 1 | grundspil | 1 | 2017–2017 | 2 | navneord: grundspil/pulje |
| 17+ 4H - Serie 2 (B) | Pulje 1 | grundspil | 1 | 2017–2017 | 1 | navneord: grundspil/pulje |
| Kvalifikation til 1. division (runde 12) | Kvalifikationsevent kamp 6 | andet/ukendt | 1 | 2018–2018 | 1 | kvalifikation uden retning |
| Nedrykning fra 3. division (runde 12) | Kvalifikationsevent kamp 5 | kvalifikation_ned | 1 | 2018–2018 | 1 | navneord: kvalifikation + ned |
| Nedrykning fra 3. division (runde 12) | Kvalifikationsevent kamp 7 | kvalifikation_ned | 1 | 2018–2018 | 1 | navneord: kvalifikation + ned |
| Nedrykning fra Danmarksserien (runde 12) | Kvalifikationsevent kamp 13 | kvalifikation_ned | 1 | 2018–2018 | 1 | navneord: kvalifikation + ned |
| Kvalifikation til DS Vest (runde 12) | Kvalifikationsevent kamp 12 | andet/ukendt | 1 | 2018–2018 | 5 | kvalifikation uden retning |
| Kvalifikation til DS Vest (runde 12) | Kvalifikationsevent kamp 8 | andet/ukendt | 1 | 2018–2018 | 5 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest (runde 12) | Kvalifikationsevent kamp 14 | andet/ukendt | 1 | 2018–2018 | 6 | kvalifikation uden retning |
| Kvalifikation til Kredsserien Vest (runde 12) | Kvalifikationsevent kamp 9 | andet/ukendt | 1 | 2018–2018 | 6 | kvalifikation uden retning |
| Badmintonligaen, kvartfinaler | Kvartfinale 1 | slutspil | 1 | 2018–2018 | 1 | navneord: slutspil |
| Badmintonligaen, kvartfinaler | Kvartfinale 2 | slutspil | 1 | 2018–2018 | 1 | navneord: slutspil |
| Badmintonligaen, semifinaler | Semifinale 1 | slutspil | 1 | 2018–2018 | 1 | navneord: slutspil |
| Badmintonligaen, semifinaler | Semifinale 2 | slutspil | 1 | 2018–2018 | 1 | navneord: slutspil |
| Kvalifikation til 1. division | Pulje A | andet/ukendt | 1 | 2018–2018 | 1 | kvalifikation uden retning |
| Kvalifikation til 1. division | Pulje B | andet/ukendt | 1 | 2018–2018 | 1 | kvalifikation uden retning |
| 3. division | Nedrykning fra 3. division, A | nedrykningsspil | 1 | 2018–2018 | 1 | navneord: nedrykning |
| Danmarksserien | Kvalifikation til 3. division, A Vest | andet/ukendt | 1 | 2018–2018 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division, A &#216;st | andet/ukendt | 1 | 2018–2018 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division, B Vest | andet/ukendt | 1 | 2018–2018 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division, B &#216;st | andet/ukendt | 1 | 2018–2018 | 1 | kvalifikation uden retning |
| Danmarksserien | Nedrykning fra Danmarksserien, A Vest | nedrykningsspil | 1 | 2018–2018 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien, A &#216;st | nedrykningsspil | 1 | 2018–2018 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien, B Vest | nedrykningsspil | 1 | 2018–2018 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien, B &#216;st | nedrykningsspil | 1 | 2018–2018 | 1 | navneord: nedrykning |
| DM Hold SEN 4+2 | 5. - 6. plads A-række | andet/ukendt | 1 | 2018–2018 | 2 | ingen sikker nøgle |
| DM Hold SEN 4+2 | 5. - 6. plads C-række | andet/ukendt | 1 | 2018–2018 | 2 | ingen sikker nøgle |
| DM Hold SEN 4+2 | 7. - 8. plads A-række | andet/ukendt | 1 | 2018–2018 | 2 | ingen sikker nøgle |
| DM Hold SEN 4+2 | 7. - 8. plads C-række | andet/ukendt | 1 | 2018–2018 | 2 | ingen sikker nøgle |
| DM Hold SEN 4+2 | A Rækken Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold SEN 4+2 | A Rækken Pulje 2 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold SEN 4+2 | B Rækken Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold SEN 4+2 | Bronzekamp A-række | slutspil | 1 | 2018–2018 | 2 | navneord: slutspil |
| DM Hold SEN 4+2 | Bronzekamp C-række | slutspil | 1 | 2018–2018 | 2 | navneord: slutspil |
| DM Hold SEN 4+2 | C Rækken Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold SEN 4+2 | C Rækken Pulje 2 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold SEN 4+2 | Finale A-række | slutspil | 1 | 2018–2018 | 2 | navneord: slutspil |
| DM Hold SEN 4+2 | Finale C-række | slutspil | 1 | 2018–2018 | 2 | navneord: slutspil |
| DM Hold SEN 4 Spillere | B-række 3. - 4. plads | andet/ukendt | 1 | 2018–2018 | 2 | ingen sikker nøgle |
| DM Hold SEN 4 Spillere | Finale B-række | slutspil | 1 | 2018–2018 | 2 | navneord: slutspil |
| DM Hold SEN 4 Spillere | Pulje 1 A-række | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold SEN 4 Spillere | Pulje 1 B-række | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| Slutspil KS vest runde 8 | Pulje 1 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil KS vest runde 8 | Pulje 3 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil KS vest runde 9 | Pulje 2 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil KS vest runde 9 | Pulje 4 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil KS vest runde 10 | Pulje 1 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil KS vest runde 10 | Pulje 3 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil KS vest runde 11 | Pulje 2 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil KS vest runde 11 | Pulje 4 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 8 | Pulje 1 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 8 | Pulje 3 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 8 | Pulje 5 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 8 | Pulje 7 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 9 | Pulje 2 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 9 | Pulje 4 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 9 | Pulje 6 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 9 | Pulje 8 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 10 | Pulje 1 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 10 | Pulje 3 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 10 | Pulje 5 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 10 | Pulje 7 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 11 | Pulje 2 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 11 | Pulje 4 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 11 | Pulje 6 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Slutspil S1 vest runde 11 | Pulje 8 | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Veteran M - grundspil | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| 4 spillere double B | Pulje 2 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| Veteran M slutspil | Veteran M 1-4 | slutspil | 1 | 2018–2018 | 1 | navneord: slutspil |
| Veteran M slutspil | Veteran M 5-8 | slutspil | 1 | 2018–2018 | 1 | navneord: slutspil |
| SEN 4+2 B | Pulje 2 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| SEN 4+2 B | Pulje 3 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| SEN Hr - B | Pulje 3 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| SEN 30. Serie | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| SEN 4. Serie | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| 4+2, B-række (Serie 2-3) | Pulje 1 | grundspil | 1 | 2018–2018 | 4 | navneord: grundspil/pulje |
| 4 Herrer, B-række (Serie 2-3) | Pulje 1 | grundspil | 1 | 2018–2018 | 4 | navneord: grundspil/pulje |
| 4 Herrer, B-række (Serie 2-3) | Pulje 2 | grundspil | 1 | 2018–2018 | 4 | navneord: grundspil/pulje |
| Serie 4 - Efter nytårsturnering | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| Serie 5 - Efter nytårsturnering | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| DM Hold 35+ 4+2 | Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 35+ 4 Herrer | Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| SEN+40 4+2 B DOUBLE - 9 kampe | Pulje 341 ( 4+2 sen+ 40-50 DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| SEN+40 4+2 B DOUBLE - 9 kampe | Pulje 341 A ( 4+2 sen+40-50 slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| SEN+40 4+2 B DOUBLE - 9 kampe | Pulje 341 B ( 4+2 sen+40-50 slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| SEN+40 4+2 B DOUBLE - 9 kampe | Pulje 511 (Sen+ 40/50 4+2 B doubler DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| SEN+40 4+2 B DOUBLE - 9 kampe | Pulje 512 (Sen+ 40/50 4+2 B doubler DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| SEN+40 4 Spillere B DOUBLE - 6 kampe | Pulje 342 ( 4sp sen+40 double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| SEN+40 4 Spillere B DOUBLE - 6 kampe | Pulje 342 A ( 4sp double sen+40 slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| SEN+40 4 Spillere B DOUBLE - 6 kampe | Pulje 342 B ( 4sp double sen+40 slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| SEN+40 4 Spillere B DOUBLE - 6 kampe | Pulje 510 (4H 50/40+ B/C Doubler DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 40+ 4+2 A | Pulje 2 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| 40+ 4+2 A | Pulje 3 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| 40+ 4+2 C | Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| 40+ Hr - A | Pulje 2 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| 40+ Hr - A | Pulje 3 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| 6+4 A-rækken | Slutspil | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| SEN+50 4 Spillere B DOUBLE - 6 kampe | Pulje 351 ( 4sp double sen+50 DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| SEN+50 4 Spillere B DOUBLE - 6 kampe | Pulje 351 A ( 4sp double sen+50 slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| SEN+50 4 Spillere B DOUBLE - 6 kampe | Pulje 351 B ( 4sp double sen+50 slutspil DGI &#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| 4+2 B-rækken | Slutspil | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| 4 Herrer B-rækken | Pulje 2 | grundspil | 1 | 2018–2018 | 4 | navneord: grundspil/pulje |
| 4 Herrer B-rækken | Slutspil | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| 4 herrer B-rækken | Slutspil | slutspil | 1 | 2018–2018 | 4 | navneord: slutspil |
| Sen+60 2+2 A | Pulje 361 ( 2+2 A DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| Sen+60 2+2 B | Pulje 362 ( 2+2 B DGI-&#216;st ). | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| Sen+60 2+2 B | Pulje 363 ( 2+2 B slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 1 | navneord: slutspil |
| Sen+60 4H A | Pulje 364 ( 60+ 4H A DGI &#216;st ) | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| Sen+60 4H B | Pulje 365 ( 60+ 4H B DGI &#216;st ) | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4+2 | 5. - 6. plads B-række | andet/ukendt | 1 | 2018–2018 | 2 | ingen sikker nøgle |
| DM Hold 17+(MOT) 4+2 | A Rækken Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4+2 | B Rækken Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4+2 | B Rækken Pulje 2 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4+2 | Bronzekamp B-række | slutspil | 1 | 2018–2018 | 2 | navneord: slutspil |
| DM Hold 17+(MOT) 4+2 | Finale B-rækken | slutspil | 1 | 2018–2018 | 2 | navneord: slutspil |
| DM Hold 17+(MOT) 4 Spillere | 5. - 8 plads B-række | andet/ukendt | 1 | 2018–2018 | 2 | ingen sikker nøgle |
| DM Hold 17+(MOT) 4 Spillere | 9. - 12 plads B-række | andet/ukendt | 1 | 2018–2018 | 2 | ingen sikker nøgle |
| DM Hold 17+(MOT) 4 Spillere | A Rækken Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4 Spillere | B Rækken Pulje 1 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4 Spillere | B Rækken Pulje 2 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4 Spillere | B Rækken Pulje 3 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4 Spillere | B Rækken Pulje 4 | grundspil | 1 | 2018–2018 | 2 | navneord: grundspil/pulje |
| DM Hold 17+(MOT) 4 Spillere | Finale slutspil B-række | slutspil | 1 | 2018–2018 | 2 | navneord: slutspil |
| 4+2 B DOUBLE - 9 kampe | Pulje 204 4+2 B(DGI MIDT) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4+2 B DOUBLE - 9 kampe | Pulje 205 4+2 B Vestergade(DGI MIDT) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 2+2 B DOUBLE - 6 kampe | Pulje 312 ( 2+2 A-B DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 2+2 B DOUBLE - 6 kampe | Pulje 313 ( 2+2 A-B puljevinderkamp DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 2+2 C DOUBLE - 6 kampe | Pulje 314 ( 2+2 C DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4+2 A DOUBLE - 9 kampe | Pulje 601 4+2 A double (DGI S&#216;N) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere D DOUBLE - 6 kampe | Pulje 104 (4H D Double DGI VEST) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 201 4 spillere A Double(DGI MIDT) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 202 4 spillere B double(DGI MIDT) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 203 4 spillere B Vestergade(DGI MIDT) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 206 4 sp B double slutspil A( DGI Midt) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 207 4 sp B double Slutspil B(DGI Midt) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 321 ( 4sp A double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 321 A ( 4sp A slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 321 B ( 4sp A slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 322 ( 4sp B double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 323 ( 4sp B double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 324 ( 4sp B double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 325 ( 4sp B double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 326 ( 4sp B double - puljevinderkampe DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 327 ( 4sp C double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 328 ( 4sp C double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 329 ( 4sp C double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 330 ( 4sp C double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 331 ( 4sp C double - puljevinderkampe DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere D DOUBLE - 6 kampe | Pulje 332 ( 4sp D double + damer DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 401 4 Spillere A MOT A / 40+A (DGI SYV) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 402 4 Spillere B MOT B / 40+B/C (DGI SYV) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 403 4 Spillere MOT C (DGI Sydvest) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 404 4 Spillere MOT C (DGI Sydvest) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 502 (4H A/B Doubler DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 504 (4H C/D Doubler DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 505 (4H C/D Doubler DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 506 (4H C/D Doubler Slut spil 1 DGI Syd Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 507 (4H C/D Doubler Slut spil 2 DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere A DOUBLE - 6 kampe | Pulje 602 4 spillere A dobule (DGI S&#216;N) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B DOUBLE - 6 kampe | Pulje 603 4 spillere B double (DGI S&#216;N) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C DOUBLE - 6 kampe | Pulje 604 4 spillere C/D double (DGI S&#216;N) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere A SINGLE/DOUBLE - 8 kampe | Pulje 101 (4H A S/D DGI VEST) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 102 (4H B S/D DGI VEST) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 103 (4H B S/D DGI VEST) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 333 ( 4sp A-B single/double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C SINGLE/DOUBLE - 8 kampe | Pulje 334 ( 4sp C single/double DGI-&#216;st ) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere C SINGLE/DOUBLE - 8 kampe | Pulje 334 A ( 4sp C s/d slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| 4 Spillere C SINGLE/DOUBLE - 8 kampe | Pulje 334 B ( 4sp C s/d slutspil DGI-&#216;st ) | slutspil | 1 | 2018–2018 | 8 | navneord: slutspil |
| 4 Spillere A SINGLE/DOUBLE - 8 kampe | Pulje 501 (4H A S/D DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 4 Spillere B SINGLE/DOUBLE - 8 kampe | Pulje 504 (4H B S/D DGI Sydøst) | grundspil | 1 | 2018–2018 | 8 | navneord: grundspil/pulje |
| 50+ 2+2 - Serie 2 (B/C) | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| 50+ 4+2 - Serie 3 (B/C) | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| 17+ 4H - Serie 2 (B/C) | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| 17+ 4H - Serie 2 (B/C) Slutspil | Pulje 1 | slutspil | 1 | 2018–2018 | 1 | navneord: slutspil |
| 17+ 4H - Serie 2 (B/C) | Pulje 2 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| 50+ 4H - Serie 3 (A/B/C) | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| 17+ 2+2 - Serie 1 (A/B) | Pulje 1 | grundspil | 1 | 2018–2018 | 1 | navneord: grundspil/pulje |
| Badmintonligaen | Nedrykning fra Badmintonligaen | nedrykningsspil | 1 | 2019–2019 | 1 | navneord: nedrykning |
| Spilletider i slutspillet i 1.division | Pulje 1 | slutspil | 1 | 2019–2019 | 1 | navneord: slutspil |
| Spilletider i slutspillet i 1.division | Pulje 2 | slutspil | 1 | 2019–2019 | 1 | navneord: slutspil |
| Kredsserie Vest | Kredsserie Vest Pulje 1 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Kredsserie Vest | Kredsserie Vest Pulje 2 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Kredsserie Vest | Kredsserie Vest Pulje 3 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Kredsserie Vest | Kredsserie Vest Pulje 4 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Kredsserie Vest | Nedrykningsspil fra Kredsserien Vest til Serie 1 Pulje 1 | nedrykningsspil | 1 | 2019–2019 | 4 | navneord: nedrykning |
| Kredsserie Vest | Nedrykningsspil fra Kredsserien Vest til Serie 1 Pulje 2 | nedrykningsspil | 1 | 2019–2019 | 4 | navneord: nedrykning |
| Kredsserie Vest | Oprykningsspil fra Kredsserien Vest til Danmarksserien Pulje 1 | oprykningsspil | 1 | 2019–2019 | 4 | navneord: oprykning |
| Kredsserie Vest | Oprykningsspil fra Kredsserien Vest til Danmarksserien Pulje 2 | oprykningsspil | 1 | 2019–2019 | 4 | navneord: oprykning |
| Serie 1 Vest | Nedrykningsspil fra Serie 1 Vest til Serie 2 Pulje 1 | nedrykningsspil | 1 | 2019–2019 | 4 | navneord: nedrykning |
| Serie 1 Vest | Nedrykningsspil fra Serie 1 Vest til Serie 2 Pulje 2 | nedrykningsspil | 1 | 2019–2019 | 4 | navneord: nedrykning |
| Serie 1 Vest | Nedrykningsspil fra Serie 1 Vest til Serie 2 Pulje 3 | nedrykningsspil | 1 | 2019–2019 | 4 | navneord: nedrykning |
| Serie 1 Vest | Nedrykningsspil fra Serie 1 Vest til Serie 2 Pulje 4 | nedrykningsspil | 1 | 2019–2019 | 4 | navneord: nedrykning |
| Serie 1 Vest | Oprykningsspil fra Serie 1 Vest til Kredsserien Vest Pulje 1 | oprykningsspil | 1 | 2019–2019 | 4 | navneord: oprykning |
| Serie 1 Vest | Oprykningsspil fra Serie 1 Vest til Kredsserien Vest Pulje 2 | oprykningsspil | 1 | 2019–2019 | 4 | navneord: oprykning |
| Serie 1 Vest | Oprykningsspil fra Serie 1 Vest til Kredsserien Vest Pulje 3 | oprykningsspil | 1 | 2019–2019 | 4 | navneord: oprykning |
| Serie 1 Vest | Oprykningsspil fra Serie 1 Vest til Kredsserien Vest Pulje 4 | oprykningsspil | 1 | 2019–2019 | 4 | navneord: oprykning |
| Serie 1 Vest | Serie 1 Vest Pulje 1 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest | Serie 1 Vest Pulje 2 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest | Serie 1 Vest Pulje 3 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest | Serie 1 Vest Pulje 4 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest | Serie 1 Vest Pulje 5 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest | Serie 1 Vest Pulje 6 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest | Serie 1 Vest Pulje 7 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 1 Vest | Serie 1 Vest Pulje 8 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 1 - CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 3/4 (4 + 2) | Pulje 1 /CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 2 - CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 2A (Slutspil 1) | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| Serie 2 (4 + 2) | Pulje 2B (Slutspil 2) | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| Serie 3/4 (4 + 2) | Pulje 3 - HG | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 4 - HG | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 3/4 (4 + 2) | Pulje 4 /CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 5 S&#216;N/BL | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 5A (slutspil 1) | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| Serie 2 (4 + 2) | Pulje 5B (slutspil 2) | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| Serie 2/3 (4 spillere - single/double) | Pulje 1 /CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 3 (4 spillere - single/double) | Pulje 1 /CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 2/3 (4 spillere - single/double) | Pulje 2- (VES-HHA) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 4 (4 spillere - si./do., tidl. Motion A | Pulje 2181 (VES-HHA) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 5 (4 spillere - si./do., tidl. Motion B | Pulje 2182 (VES-HHA) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 4 (4 spillere - si./do., tidl. Motion A | Pulje 401 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 5 (4 spillere - si./do., tidl. Motion B | Pulje 402 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 5 (4 spillere - si./do., tidl. Motion B | Pulje 6186 serie 4/5 JT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Serie 5 (4 spillere - si./do., tidl. Motion B | Pulje 6187 Slutspil A | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| Serie 5 (4 spillere - si./do., tidl. Motion B | Pulje 6188 Slutspil B | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| SEN 4+2 A | Pulje 1 | grundspil | 1 | 2019–2019 | 2 | navneord: grundspil/pulje |
| SEN 4+2 B | Slutspil A | slutspil | 1 | 2019–2019 | 2 | navneord: slutspil |
| SEN 4+2 B | Slutspil B | slutspil | 1 | 2019–2019 | 2 | navneord: slutspil |
| SEN 4. Serie P1 | Pulje 1 | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Serie 3 - oprykningsslutspil | Pulje 1 | oprykningsspil | 1 | 2019–2019 | 1 | navneord: oprykning |
| Serie 3 - mellemste slutspil | Pulje 1 | slutspil | 1 | 2019–2019 | 1 | navneord: slutspil |
| Serie 3 - nederste slutspil | Pulje 1 | slutspil | 1 | 2019–2019 | 1 | navneord: slutspil |
| 4+2 A/B-række (Sj-Serie - Serie 2) | Pulje 1 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| 4 Herrer, A/B-række (Sj.-serie Serie 3) | Pulje 1 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| 4 Herrer, A/B-række (Sj.-serie Serie 3) | Pulje 2 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| Serie 4 | Pulje 1 - Efter Nytår turnering | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Serie 5 | Pulje 1 - Efter Nytår turnering | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Senior holdturneringsdag - B-række | Pulje 1 | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Senior holdturneringsdag - A-række | Pulje 1 | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Senior holdturneringsdag - B-række | Pulje 2 | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| SEN+35 A (4 + 2 - doubler) | Pulje 1 A-B (NORD/CT) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+35 B (4 spillere - doubler) | Pulje 1 (NORD/CT) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+35 B (4 spillere - doubler) | Pulje 2 (NORD/CT) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+35 B (4 spillere - doubler) | Pulje 435 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+35 B (4 spillere - doubler) | Pulje 6351 JT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Veteran C - Slutspil | Nedrykning | nedrykningsspil | 1 | 2019–2019 | 1 | navneord: nedrykning |
| Veteran C - Slutspil | Oprykning | oprykningsspil | 1 | 2019–2019 | 1 | navneord: oprykning |
| 40+ Hr - B | A slutspil | slutspil | 1 | 2019–2019 | 2 | navneord: slutspil |
| 40+ Hr - B | B slutspil | slutspil | 1 | 2019–2019 | 2 | navneord: slutspil |
| 6+4 A-række - oprykningsspil | Pulje 1 | oprykningsspil | 1 | 2019–2019 | 4 | navneord: oprykning |
| 6+4 A-rækken - nederste slutspil | Pulje 1 | slutspil | 1 | 2019–2019 | 4 | navneord: slutspil |
| 4 Herrer A/B-rækken | Pulje 1 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| SEN+45 B (4 + 2 - doubler) | Pulje 1 NORD CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+45 A (4 + 2 - doubler) | Pulje 1 NORD/CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+45 B (4 + 2 - doubler) | Pulje 445 ( &#216;ST - OS ) +45/+55 | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+45 B (4 + 2 - doubler) | Pulje 6451 JT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+45 A (4 spillere - doubler) | Pulje 1 NORD CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+45 B (4 spillere - doubler) | Pulje 446 ( &#216;ST-OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| SEN+45 B (4 spillere - doubler) | Pulje 6452 JT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| 4+2 Eliterækken | Pulje 1 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| 4 Herrer Elite/A-rækken | Pulje 1 | grundspil | 1 | 2019–2019 | 4 | navneord: grundspil/pulje |
| SEN+55 (4 spillere - doubler) | Pulje 455 ( &#216;st - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| Sen+60 2+2 A | Pulje 461 ( &#216;ST-OS ) | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Sen+60 2+2 A | Pulje 462 ( &#216;ST-OS ) slutspil | slutspil | 1 | 2019–2019 | 1 | navneord: slutspil |
| sen+60 2+2 B | Pulje 463 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| sen+60 2+2 B | Pulje 464 ( &#216;ST - OS ) slutspil | slutspil | 1 | 2019–2019 | 1 | navneord: slutspil |
| Sen+60 4H A | Pulje 465 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Sen+60 4H B | Pulje 467 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Sen+60 4H B | Pulje 468 ( &#216;ST - OS ) slutspil | slutspil | 1 | 2019–2019 | 1 | navneord: slutspil |
| MOT+18 B (4 + 2 - doubler) | Pulje 1 (NORD-CT) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 + 2 - doubler) | Pulje 1 MOT +18A 4+2 doubler S&#216;N/BL | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 + 2 - doubler) | Pulje 3181 (MIDT-MP) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 + 2 - doubler) | Pulje 3181 A slutspil A(MIDT-MP) | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 B (4 + 2 - doubler) | Pulje 3181 B slutspil B(MIDT-MP) | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 B (4 + 2 - doubler) | Pulje 3182 Vestergade (MIDT-MP) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (2 + 2 - doubler) | Pulje 405 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (2 + 2 - doubler) | Pulje 406 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (2 + 2 - doubler) | Pulje 407 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (2 + 2 - doubler) | Pulje 408 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (2 + 2 - doubler) | Pulje 409 ( &#216;ST - OS ) slutspil | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 A (4 spillere - doubler) | Pulje 1 A/B NORD/CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 spillere - doubler) | Pulje 1001 4 spillere A double (SYV-FT) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 1002 4 Spillere doubler (SYV-FT) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 C (4 spillere - doubler) | Pulje 1003 4 Spillere doubler (SYV-FT) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 spillere - doubler) | Pulje 2 B/C NORD/CT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 C (4 spillere - doubler) | Pulje 2183 (VES-HHA) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 D (4 spillere - doubler) | Pulje 2184 (VES-HHA) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 spillere - doubler) | Pulje 3183(MIDT-MP) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 3184 A slutspil A(MIDT-MP) | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 B (4 spillere - doubler) | Pulje 3184 B slutspil B(MIDT-MP) | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 B (4 spillere - doubler) | Pulje 3184(MIDT-MP) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 3185 Vestergade(MIDT-MP) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 spillere - doubler) | Pulje 410 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 spillere - doubler) | Pulje 411 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 spillere - doubler) | Pulje 412 ( &#216;ST - OS ) slutspil | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 B (4 spillere - doubler) | Pulje 413 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 414 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 415 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 416 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 417 ( &#216;ST - OS ) slutspil | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 C (4 spillere - doubler) | Pulje 418 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 C (4 spillere - doubler) | Pulje 419 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 C (4 spillere - doubler) | Pulje 420 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 C (4 spillere - doubler) | Pulje 421 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 C (4 spillere - doubler) | Pulje 422 ( &#216;ST - OS ) slutspil | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 D (4 spillere - doubler) | Pulje 423 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 6181 JT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 C (4 spillere - doubler) | Pulje 6182 JT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 D (4 spillere - doubler) | Pulje 6183 JT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 spillere - doubler) | Pulje 6184 JT | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 A (4 spillere - doubler) | Pulje 7181 (S&#216;N-BL) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 7181 B (slutspil 2) S&#216;N BL | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 B (4 spillere - doubler) | Pulje 7182 (S&#216;N BL) | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 B (4 spillere - doubler) | Pulje 7182 A (slutspil 1) S&#216;N BL | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 B (4 spillere - doubler) | Pulje 7182 C (slutspil 3) S&#216;N BL | slutspil | 1 | 2019–2019 | 11 | navneord: slutspil |
| MOT+18 C (4 spillere - doubler) | Pulje 7183 S&#216;N BL | grundspil | 1 | 2019–2019 | 11 | navneord: grundspil/pulje |
| MOT+18 (4 damer - doubler) | Pulje 425 ( &#216;ST - OS ) | grundspil | 1 | 2019–2019 | 10 | navneord: grundspil/pulje |
| 50+ 2+2 - Serie 2/3 (B/C) | Pulje 1 | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| 17+ 4H - Serie 1/2 (B/C) | Pulje 1 | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| 17+ 4H - Serie 1/2 (B/C) | Pulje 2 | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| 50+ 4H - Serie 1/2/3 (A/B/C) | Pulje 1 | grundspil | 1 | 2019–2019 | 1 | navneord: grundspil/pulje |
| Serie 3 (4 herrer + 2 damer) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie 4 (4 herrer + 2 damer) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie A (4 spillere \| Single+double) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie B (4 spillere \| Single+double) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie C (4 spillere \| Single+double) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie A (3 runder double) | Pulje 1 | grundspil | 1 | 2020–2020 | 2 | navneord: grundspil/pulje |
| Serie B (3 runder double) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie C (3 runder double) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie D (3 runder double) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie 2 (4 herrer + 2 damer) | Pulje 1 | grundspil | 1 | 2020–2020 | 2 | navneord: grundspil/pulje |
| Serie 2 (4 herrer + 2 damer) | Pulje 2 | grundspil | 1 | 2020–2020 | 2 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 1 - HG | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 3/4 (4 + 2) | Pulje 1 - HG | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 2 - HG | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 2 (4 + 2) | Pulje 4 S&#216;N | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 2/3 - (4 spillere) single/double | Pulje 1 - HG | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 2/3 - (4 spillere) single/double | Pulje 2 - HG | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 4 - (4 spillere) single/double | Pulje 2181 - (VES/HHA) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 5 - (4 spillere) single/double | Pulje 2182 - (VES/HHA) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 5 - (4 spillere) single/double | Pulje 2184 - slutspil 1-4 (ves/hha) | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Serie 5 - (4 spillere) single/double | Pulje 2185 - slutspil 5-7 (ves/hha) | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Serie 2/3 - (4 spillere) single/double | Pulje 3 - HG | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 4/5 (4 spillere) single/double | Pulje 401 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Serie 4/5 (4 spillere) single/double | Pulje 401-1 ( &#216;ST-OS ) slutspil 1 | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Serie 4/5 (4 spillere) single/double | Pulje 401-2 ( &#216;ST-OS ) slutspil 2 | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Serie 4/5 (4 spillere) single/double | Pulje 601 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4+2) doubler | Pulje 301 (Midt-MP) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4+2) doubler | Pulje 302 (Midt-MP) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4+2) doubler | Pulje 606 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4+2) doubler | Pulje 607 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion A (2+2) doubler | Pulje 405 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (2+2) doubler | Pulje 406 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (2+2) doubler | Pulje 407 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (2+2) doubler | Pulje 408 ( &#216;ST-OS ) Finale - B | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Senior motion A (4 spillere) doubler | Pulje 1001 4 Spillere A double (SYV FT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 1002 4 Spillere B double (SYV FT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion D (4 spillere) doubler | Pulje 2183 - (VES/HHA) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion D (4 spillere) doubler | Pulje 2186 slutspil 1-4 (ves/hha) | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Senior motion D (4 spillere) doubler | Pulje 2187 slutspil 5-7 (ves/hha) | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Senior motion A (4 spillere) doubler | Pulje 303 (Midt-MP) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 304 (Midt-MP) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 305 (Midt-MP) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 306 (Midt-MP) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion A (4 spillere) doubler | Pulje 410 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 411 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 412 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 413 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 414 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 415 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 416 ( &#216;ST-OS ) Finale - B | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Senior motion C (4 spillere) doubler | Pulje 417 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion C (4 spillere) doubler | Pulje 418 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion C (4 spillere) doubler | Pulje 419 (&#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion C (4 spillere) doubler | Pulje 420 ( &#216;ST-OS ) Finale - C | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Senior motion D (4 spillere) doubler | Pulje 421 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion D (4 spillere) doubler | Pulje 422 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion D (4 spillere) doubler | Pulje 423 ( &#216;ST-OS ) Finale - D | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Senior motion A (4 spillere) doubler | Pulje 602 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 603 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion C (4 spillere) doubler | Pulje 604 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion D (4 spillere) doubler | Pulje 605 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion A (4 spillere) doubler | Pulje 701 (S&#216;N-BL) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion B (4 spillere) doubler | Pulje 702 (S&#216;N-BL) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion C (4 spillere) doubler | Pulje 703 (S&#216;N-BL) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion D (4 spillere) doubler | Pulje 704 (S&#216;N-BL) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior motion (4 damer) doubler | Pulje 425 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| 4+2 B - række | Pulje 1 | grundspil | 1 | 2020–2020 | 6 | navneord: grundspil/pulje |
| 4 Herrer A - række | Pulje 1 | grundspil | 1 | 2020–2020 | 6 | navneord: grundspil/pulje |
| 4 Herrer B - række | Pulje 1 | grundspil | 1 | 2020–2020 | 6 | navneord: grundspil/pulje |
| Sjællandsserien Slutspil | Pulje 1 | slutspil | 1 | 2020–2020 | 1 | navneord: slutspil |
| Serie 2 - Enkeltresultater Rd. 1 - 3 | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Serie 2 - Enkeltresultater Rd. 1 - 3 | Pulje 2 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Senior+35 B (4 spillere) doubler | Pulje 608 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior+35 B (4 spillere) doubler | Pulje 609 (Sydøst - JT) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Veteran A (4 herrer + 2 damer) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Veteran B (4 herrer + 2 damer) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Veteran C (4 herrer + 2 damer) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| 40+ Elite P1 | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| 40+ Elite P2 | Pulje 2 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| 6+4 Mester | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 6+4 Mester | Pulje 2 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 6+4 A-Række | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 4+2 C-Række | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 4 Herre A-Række | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 4 Herre C-Række | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| Senior+45 B (4 spillere) doubler | Pulje 440 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| Senior+45 B (4 spillere) doubler | Pulje 440-1 ( &#216;ST-OS ) slutspil - 1 | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| Senior+45 B (4 spillere) doubler | Pulje 440-2 ( &#216;ST-OS ) slutspil - 2 | slutspil | 1 | 2020–2020 | 9 | navneord: slutspil |
| 50+ 20. Serie | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| 4+2 Elite | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 4+2-A Række | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 4 Herre Elite/A-række | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 4 Herre A/B-Række | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| Senior+55 ( 4 spillere - double ) | Pulje 450 ( &#216;ST-OS ) | grundspil | 1 | 2020–2020 | 9 | navneord: grundspil/pulje |
| 2+2 B-Række | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 4 Herre - Nord | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| 4 Herre - Syd/Vest | Pulje 1 | grundspil | 1 | 2020–2020 | 5 | navneord: grundspil/pulje |
| Sen+60 2+2 A | Pulje 461 ( &#216;ST - OS ) aflyst , covid-19 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Sen+60 2+2 A | Pulje 462 ( &#216;ST - OS ) slutspil (aflyst) | slutspil | 1 | 2020–2020 | 1 | navneord: slutspil |
| Sen+60 2+2 B | Pulje 463 ( &#216;ST-OS ) aflyst , covid-19 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Sen+60 2+2 B | Pulje 464 ( &#216;ST-OS ) slutspil (aflyst) | slutspil | 1 | 2020–2020 | 1 | navneord: slutspil |
| Sen+60 4H A | Pulje 465 ( &#216;ST-OS ) aflyst , covid-19 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Sen+60 4H B | Pulje 466 ( &#216;ST-OS ) aflyst , covid-19 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Sen+60 4H B | Pulje 467 ( &#216;ST-OS ) slutspil (aflyst) | slutspil | 1 | 2020–2020 | 1 | navneord: slutspil |
| MOT 4 herrer Elite | Pulje 2 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| Slutspil 4 herre Elite | Pulje 1 | slutspil | 1 | 2020–2020 | 1 | navneord: slutspil |
| 17+ 4H - Serie 2/3 (B/C) | Pulje 2 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| 50+ 4H - Serie 1/2 (A/B) | Pulje 1 | grundspil | 1 | 2020–2020 | 1 | navneord: grundspil/pulje |
| DM HOLD 4+2 | Senior A 3. - 4. plads | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD 4+2 | Senior A 5. - 6. plads | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD 4+2 | Senior A 7. - 8. plads | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD 4+2 | Senior A finale | slutspil | 1 | 2021–2021 | 2 | navneord: slutspil |
| DM HOLD 4+2 | Senior A pulje 1 | grundspil | 1 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | Senior A pulje 2 | grundspil | 1 | 2021–2021 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | Senior B | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD 4+2 | Senior C | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD 4 spillere | Senior A | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD 4 spillere | Senior B | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD (MOT) 4+2 | Senior motion | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD (MOT) 4 spillere | Senior motion 1 | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD (MOT) 4 spillere | Senior motion 2 | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| DM HOLD (MOT) 2+2 | 2 + 2 (MOT)/50+ | andet/ukendt | 1 | 2021–2021 | 2 | ingen sikker nøgle |
| 1. division (grundspil) | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| 1. division (grundspil) | Pulje 2 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| 1. division (slutspil) | Kvalifikation til Badmintonligaen | andet/ukendt | 1 | 2021–2021 | 1 | kvalifikation uden retning |
| 1. division (slutspil) | Kvalifikationskampe mod 2. division | andet/ukendt | 1 | 2021–2021 | 1 | kvalifikation uden retning |
| 1. division (slutspil) | Nedrykning fra 1. division | nedrykningsspil | 1 | 2021–2021 | 1 | navneord: nedrykning |
| Danmarksserien, Kvalifikationskampe | Kvalifikationskampe | andet/ukendt | 1 | 2021–2021 | 1 | kvalifikation uden retning |
| Serie 2 | Slutspil | slutspil | 1 | 2021–2021 | 2 | navneord: slutspil |
| Kredsserie Vest | Kvalifikationskampe | andet/ukendt | 1 | 2021–2021 | 4 | kvalifikation uden retning |
| Kredsserie Vest | Nedrykning til Serie 1 pulje 1 | nedrykningsspil | 1 | 2021–2021 | 4 | navneord: nedrykning |
| Kredsserie Vest | Nedrykning til Serie 1 pulje 2 | nedrykningsspil | 1 | 2021–2021 | 4 | navneord: nedrykning |
| Kredsserie Vest | Oprykning til Danmarksserie pulje 1 | oprykningsspil | 1 | 2021–2021 | 4 | navneord: oprykning |
| Kredsserie Vest | Oprykning til Danmarksserie pulje 2 | oprykningsspil | 1 | 2021–2021 | 4 | navneord: oprykning |
| Serie 1 Vest | Nedrykning til Serie 2 pulje 1 | nedrykningsspil | 1 | 2021–2021 | 4 | navneord: nedrykning |
| Serie 1 Vest | Nedrykning til Serie 2 pulje 2 | nedrykningsspil | 1 | 2021–2021 | 4 | navneord: nedrykning |
| Serie 1 Vest | Nedrykning til Serie 2 pulje 3 | nedrykningsspil | 1 | 2021–2021 | 4 | navneord: nedrykning |
| Serie 1 Vest | Oprykning til Kredsserie pulje 1 | oprykningsspil | 1 | 2021–2021 | 4 | navneord: oprykning |
| Serie 1 Vest | Oprykning til Kredsserie pulje 2 | oprykningsspil | 1 | 2021–2021 | 4 | navneord: oprykning |
| Serie 1 Vest | Oprykning til Kredsserie pulje 3 | oprykningsspil | 1 | 2021–2021 | 4 | navneord: oprykning |
| Serie 3/4 (4+2) | Pulje 1 - JT | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 2 (4+2) | Pulje 1 - JT | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 2 (4+2) | Pulje 2 - JT | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 2 (4+2) | Pulje 3 - JT | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 2 (4+2) | Pulje 4 - Slutspil 1 | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Serie 2 (4+2) | Pulje 4 S&#216;N | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 2 (4+2) | Pulje 5 - Slutspil 2 | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Serie 2/3 (4 spillere - single/double) | Pulje 1 - JT | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 2/3 (4 spillere - single/double) | Pulje 2 - JT | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 4 (4 spillere - single/double) | Pulje 201 (VES-HHA) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 2/3 (4 spillere - single/double) | Pulje 3 - JT | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 4 (4 spillere - single/double) | Pulje 501 (Sydøst JT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Serie 4/5 (4 spillere - single/double) | Pulje 401 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 8 | navneord: grundspil/pulje |
| Serie 5 (4 spillere - single/double) | Pulje 202 (VES-HHA) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4+2) | Pulje 301 (MIDT-MP | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4+2) | Pulje 302 (MIDT-MP) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4+2) | Pulje 502 (Sydøst JT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion A doubler (2+2) | Pulje 405 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (2+2) | Pulje 406 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (2+2) | Pulje 407 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (2+2) | Pulje 408 ( &#216;st - OS ) Finale - B | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Senior motion D doubler (4 spillere) | Pulje 203 INDLEDENDE (VES-HHA) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion D doubler (4 spillere) | Pulje 204 INDLEDENDE (VES-HHA) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion D doubler (4 spillere) | Pulje 205 SLUTSPIL 1 (VES-HHA) | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Senior motion D doubler (4 spillere) | Pulje 206 SLUTSPIL 2 (VES-HHA) | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Senior motion A doubler (4 spillere) | Pulje 305 (MIDT-MP) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 306 (MIDT-MP) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 307 (MIDT-MP) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 308 (MIDT-MP) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion A doubler (4 spillere) | Pulje 410 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 411 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 412 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 413 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 414 ( &#216;ST - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 415 ( &#216;ST - OS ) Finale B | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Senior motion C doubler (4 spillere) | Pulje 416 ( &#216;st - OS ) Indledende | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 417 ( &#216;st - OS ) Slutspil 1-4 | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Senior motion C doubler (4 spillere) | Pulje 418 ( &#216;st - OS ) Slutspil 5-8 | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Senior motion D doubler (4 spillere) | Pulje 419 ( &#216;st - OS ) Indledende | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion D doubler (4 spillere) | Pulje 420 ( &#216;st - OS ) Slutspil 1-4 | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Senior motion D doubler (4 spillere) | Pulje 421 ( &#216;st - OS ) Slutspil 5-8 | slutspil | 1 | 2021–2021 | 9 | navneord: slutspil |
| Senior motion A doubler (4 spillere) | Pulje 505 (Sydøst JT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 506 (Sydøst JT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 507 - JT (Sydøst) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 508 - JT (Sydøst) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion D doubler (4 spillere) | Pulje 508 (Sydøst JT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 509 - JT (Sydøst) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 603 (S&#216;N - BL | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion A doubler (4 spillere) | Pulje 701 (SYV - FT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 702 (SYV - FT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| Final 4 - Serie 2 | Nedrykning til Serie 3 | nedrykningsspil | 1 | 2021–2021 | 1 | navneord: nedrykning |
| Final 4 - VoksenFjer | Nordjysk Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Final 4 - Serie B - Double | Nordjysk Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Final 4 - Serie C - Double | Nordjysk Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Final 4 - Serie D - Double | Nordjysk Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Final 4 - Serie B + C - Single + Double | Nordjysk Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Final 4 - Serie A - Double | Nordjyske Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Final 4 - Serie 2 | Oprykning til Serie 1 | oprykningsspil | 1 | 2021–2021 | 1 | navneord: oprykning |
| Final 4 - Serie 3 | Oprykning til Serie 2 | oprykningsspil | 1 | 2021–2021 | 1 | navneord: oprykning |
| Serie B + C - Single + Double | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN 2. Serie P1 Ny | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| KS Nedrykning | KS-Nedrykning | nedrykningsspil | 1 | 2021–2021 | 1 | navneord: nedrykning |
| KS Oprykning | KS-Oprykning | oprykningsspil | 1 | 2021–2021 | 1 | navneord: oprykning |
| 4 Herre A-Række (Serie 1-2 niveau) | Pulje 1 | grundspil | 1 | 2021–2021 | 6 | navneord: grundspil/pulje |
| 4 Herre B-Række (Serie 2-3 niveau) | Pulje 1 | grundspil | 1 | 2021–2021 | 6 | navneord: grundspil/pulje |
| Herre | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Sællandsserien Slutspil - oprykning | Pulje 1 | oprykningsspil | 1 | 2021–2021 | 1 | navneord: oprykning |
| Final 4 - Veteran A | Nordjysk Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Final 4 - Veteran B | Nordjysk Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Final 4 - Veteran C | Nordjysk Mesterskab | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Veteran B - Slutspil | Pulje 1 | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Veteran B - Slutspil | Pulje 2 | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| SEN+40 5. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+40 Elite P1 | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+40 Elite Mesterskabsslutspil | Pulje 1 | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| SEN+40 Elite Nedrykningsslutspil | Pulje 1 | nedrykningsspil | 1 | 2021–2021 | 1 | navneord: nedrykning |
| SEN+40 Elite P2 | Pulje 2 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| 6+4 Elite | Pulje 1 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| 6+4 Mesterrække | Pulje 2 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| SEN+40 6+4 Mesterrækken - oprykningsspil | Pulje 1 | oprykningsspil | 1 | 2021–2021 | 4 | navneord: oprykning |
| SEN+40 6+4 Mesterrækken - nedrykningsspil | Pulje 1 | nedrykningsspil | 1 | 2021–2021 | 4 | navneord: nedrykning |
| 4+2 B/C-Række | Pulje 1 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| 4+2 B/C-Række | Pulje 2 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| SEN+40 4+2 B/C-Række - øverste slutspil nord | Pulje 1 | slutspil | 1 | 2021–2021 | 5 | navneord: slutspil |
| SEN+40 4+2 B/C-Række - nederste slutspil nord | Pulje 1 | slutspil | 1 | 2021–2021 | 5 | navneord: slutspil |
| SEN+40 4+2 B/C-Række - øverste slutspil syd | Pulje 1 | slutspil | 1 | 2021–2021 | 5 | navneord: slutspil |
| SEN+40 4+2 B/C-Række - nederste slutspil syd | Pulje 1 | slutspil | 1 | 2021–2021 | 5 | navneord: slutspil |
| 4 Herre A-Række - øverste slutspil | Pulje 1 | slutspil | 1 | 2021–2021 | 5 | navneord: slutspil |
| 4 Herre A-Række - nederste slutspil | Pulje 1 | slutspil | 1 | 2021–2021 | 5 | navneord: slutspil |
| 4 Herrer B/C-Række | Pulje 1 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| SEN+45 B doubler (4+2) | Pulje 503 (Sydøst JT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| SEN+45 B doubler (4 spillere) | Pulje 440 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| SEN+45 B doubler (4 spillere) | Pulje 504 (Sydøst JT) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| SEN+50 1. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+50 2. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+50 3. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+50 4. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+50 5. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+50 6. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+50 20. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| 4+2 Elite-Række | Pulje 1 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| 4+2 Eliterække slutspil | Pulje 1 | slutspil | 1 | 2021–2021 | 5 | navneord: slutspil |
| 4+2 B-række slutkamp | Pulje 1 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| 4+2 B-Række | Pulje 2 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| /+60 4 Herrer A-Række | Pulje 1 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| SEN+55 doubler (4 spillere) | Pulje 450 ( &#216;st - OS ) | grundspil | 1 | 2021–2021 | 9 | navneord: grundspil/pulje |
| SEN+60 1. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+60 2. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| SEN+60 3. Serie | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| 2+2 B-række | Pulje 1 | grundspil | 1 | 2021–2021 | 5 | navneord: grundspil/pulje |
| Sen+60 2+2 A/B | Pulje 460 ( &#216;st-OS ) inledende | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Sen+60 2+2 A/B | Pulje 461 ( &#216;st-OS )slutspil | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Sen+60 4H A | Pulje 463 (&#216;st - OS ) | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Sen+60 4H B | Pulje 465 ( &#216;st-OS ) | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Sen+60 4H B | Pulje 466 ( &#216;st-OS ) | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Sen+60 4H B | Pulje 467 ( &#216;st-OS ) Finale | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| SEN+70 1. Serie P1 | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Finalestævne 4+4 | Serie 2/3 - Serie 4 | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| MOT 4+4 Serie 2/3 | Pulje 1 | grundspil | 1 | 2021–2021 | 1 | navneord: grundspil/pulje |
| Finalestævne 4+2 | Serie 1 - Serie 1 | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Finalestævne 4+2 | Serie 1 - Serie 2 | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Finalestævne 4H | Serie 2 - Serie 3 | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| Finalestævne 4H | Serie 3 - Serie 4 | slutspil | 1 | 2021–2021 | 1 | navneord: slutspil |
| 1. division | Kvalifikationskampe | andet/ukendt | 1 | 2022–2022 | 1 | kvalifikation uden retning |
| 1. division (oversidder-runder) | Papirhold | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| 2. division (oversidder-runder) | Papirhold | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| 3. division | Nedrykning fra 3. division, pulje A | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| 3. division (oversidder-runder) | Papirhold | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Danmarksserien | Kvalifikation til 3. division, pulje A | andet/ukendt | 1 | 2022–2022 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division, pulje B | andet/ukendt | 1 | 2022–2022 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division, pulje C | andet/ukendt | 1 | 2022–2022 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division, pulje D | andet/ukendt | 1 | 2022–2022 | 1 | kvalifikation uden retning |
| Danmarksserien | Kvalifikationskampe | andet/ukendt | 1 | 2022–2022 | 1 | kvalifikation uden retning |
| Danmarksserien | Nedrykning fra Danmarksserien, pulje A | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien, pulje B | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien, pulje C | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| Danmarksserien | Nedrykning fra Danmarksserien, pulje D | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| Danmarksserien (oversidder-runder) | Papirhold | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| DM HOLD 4+2 | 5. - 6. plads SEN A | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD 4+2 | 5. - 6. plads SEN B | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD 4+2 | 7. - 8- plads SEN A | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD 4+2 | 7. - 8. plads SEN B | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD 4+2 | Bronzekamp SEN A | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD 4+2 | Bronzekamp SEN B | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD 4+2 | Finale SEN A | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD 4+2 | Finale SEN B | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD 4+2 | SEN A Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | SEN A Pulje 2 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | SEN B Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | SEN B Pulje 2 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | SEN C Finalepulje | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD 4+2 | SEN C-D Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | SEN C-D pulje 2 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | SEN C-D pulje 3 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4+2 | SEN D Finalepulje | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD 4+2 | SEN D Placeringskampe | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD 4 spillere - Singler | SEN A 4 Singler | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD 4 spillere - Singler | SEN B (5. - 6. plads) | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD 4 spillere - Singler | SEN B 4 Singler Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4 spillere - Singler | SEN B 4 Singler Pulje 2 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4 spillere - Singler | SEN B Finale slutspil (1. - 4. plads) | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD 4 spillere - Singler | SEN C (5. - 6. plads) | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD 4 spillere - Singler | SEN C 4 Singler Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4 spillere - Singler | SEN C 4 Singler Pulje 2 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4 spillere - Singler | SEN C Finale slutspil (1. - 4. plads) | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD 4 spillere - Doubler | SEN (MOT) Pulje B | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4 spillere - Doubler | SEN (MOT) Pulje C | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD 4 spillere - Doubler | SEN Pulje A | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD (MOT) 4+2 | 3. - 4. plads | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD (MOT) 4+2 | 5. - 6. plads | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD (MOT) 4+2 | 7. - 8. plads | andet/ukendt | 1 | 2022–2022 | 2 | ingen sikker nøgle |
| DM HOLD (MOT) 4+2 | Finale | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| DM HOLD (MOT) 4+2 | Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD (MOT) 4+2 | Pulje 2 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| DM HOLD (MOT) 2+2 | Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| Kredsserien Vest | Kvalkamp | andet/ukendt | 1 | 2022–2022 | 4 | kvalifikation uden retning |
| Kredsserien Vest | Nedrykning til serie 1, pulje 1 | nedrykningsspil | 1 | 2022–2022 | 4 | navneord: nedrykning |
| Kredsserien Vest | Nedrykning til serie 1, pulje 2 | nedrykningsspil | 1 | 2022–2022 | 4 | navneord: nedrykning |
| Kredsserien Vest | Oprykning til Danmarksserien, pulje 1 | oprykningsspil | 1 | 2022–2022 | 4 | navneord: oprykning |
| Kredsserien Vest | Oprykning til Danmarksserien, pulje 2 | oprykningsspil | 1 | 2022–2022 | 4 | navneord: oprykning |
| Serie 1, vest | Nedrykning fra serie 1, pulje 1 | nedrykningsspil | 1 | 2022–2022 | 4 | navneord: nedrykning |
| Serie 1, vest | Nedrykning fra serie 1, pulje 2 | nedrykningsspil | 1 | 2022–2022 | 4 | navneord: nedrykning |
| Serie 1, vest | Nedrykning fra serie 1, pulje 3 | nedrykningsspil | 1 | 2022–2022 | 4 | navneord: nedrykning |
| Serie 1, vest | Oprykning til Kredsserien, pulje 1 | oprykningsspil | 1 | 2022–2022 | 4 | navneord: oprykning |
| Serie 1, vest | Oprykning til Kredsserien, pulje 2 | oprykningsspil | 1 | 2022–2022 | 4 | navneord: oprykning |
| Serie 1, vest | Oprykning til Kredsserien, pulje 3 | oprykningsspil | 1 | 2022–2022 | 4 | navneord: oprykning |
| Serie 2 (4+2) | Pulje 1 - Midt JT | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 3 - 4 (4+2) | Pulje 1 JT | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 2 (4+2) | Pulje 4 - Syd BL | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 2/3 (4 spillere - single/double) | Pulje 1 - Midt JT | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 2/3 (4 spillere - single/double) | Pulje 2 - Midt JT | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 4 (4 spillere - single/double) | Pulje 201 (VES-HH) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 4 (4 spillere - single/double) | Pulje 201-2 SLUTSPIL 1-2 (VES-HH) | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Serie 4 (4 spillere - single/double) | Pulje 201-3 SLUTSPIL 3-4 (VES-HH) | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Serie 4 (4 spillere - single/double) | Pulje 501 (Sydøst - JT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 4/5 (4 spillere - single/double) | Pulje 401 ( &#216;ST-OS ) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 5 (4 spillere - single/double) | Pulje 202 (VES- HH) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 5 (4 spillere - single/double) | Pulje 202-2 SLUTSPIL 1-2 (VES-HH) | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Serie 5 (4 spillere - single/double) | Pulje 202-3 SLUTSPIL 3-4 (VES-HH) | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion B doubler (4+2) | Pulje 301 (Midt-MP) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4+2) | Pulje 508 (Sydøst - JT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion A doubler (2+2) | Pulje 405 (&#216;ST-OS) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (2+2) | Pulje 406 (&#216;ST-OS) indledende | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (2+2) | Pulje 407 (&#216;ST-OS) slutspil 1-4 | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion B doubler (2+2) | Pulje 408 (&#216;ST-OS) slutspil 5-7 | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion C doubler (4 spillere) | Pulje 203 (VES-HH) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 203-2 SLUTSPIL 1-2 (VES-HH) | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion C doubler (4 spillere) | Pulje 203-3 SLUTSPIL 3-4 (VES-HH) | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion D doubler (4 spillere) | Pulje 204 (VES-HH) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion D doubler (4 spillere) | Pulje 204-2 SLUTSPIL 1-2 (VES-HH) | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion D doubler (4 spillere) | Pulje 204-3 SLUTSPIL 3-4 (VES-HH) | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion A doubler (4 spillere) | Pulje 302 (Midt-MP) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 303 (Midt-MP) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 304 (Midt-MP) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 305 (Midt-MP) slutspil A | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion B doubler (4 spillere) | Pulje 306 (Midt-MP) slutspil B | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion C doubler (4 spillere) | Pulje 307 (Midt-mp) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion A doubler (4 spillere) | Pulje 410 (&#216;ST-OS) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 412 (&#216;ST-OS) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 413 (&#216;ST-OS) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 414 (&#216;ST-OS) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 415 (&#216;ST-OS) finale B | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion C doubler (4 spillere) | Pulje 416 (&#216;ST-OS) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 417 (&#216;ST-OS) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 418 (&#216;ST-OS) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 419 (&#216;ST-OS) finale C | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion D doubler (4 spillere) | Pulje 420 (&#216;ST-OS) indledende | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion D doubler (4 spillere) | Pulje 421 (&#216;ST-OS) Slutspil 1-4 | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion D doubler (4 spillere) | Pulje 422 (&#216;ST-OS) Slutspil 5-7 | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| Senior motion A doubler (4 spillere) | Pulje 502 (Sydøst - JT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 503 (Sydøst - JT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 504 (Sydøst - JT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 505 (Sydøst - JT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion C doubler (4 spillere) | Pulje 603 (S&#216;N - BL) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Senior motion B doubler (4 spillere) | Pulje 701 (SYV - FT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 1 (4 spillere - single/double) | Pulje 1 - Midt JT | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| Serie 2: for spillere fra U17 | Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| Serie 2: for spillere fra U17 | Slutspil | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| Serie 2 | Final 4 - Serie 2 - Nedrykning til Serie 3 - Nedrykningsfinale | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| Serie A & B - Single + Double | Final 4 - Serie A/B single + double - Nordjysk Mesterskab - Finale | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Serie C - Single + Double | Final 4 - Serie C - Single + double - Nordjysk Mesterskab | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Serie C - Single + Double | Final 4 - Serie C - Single + double - Nordjysk Mesterskab - Finale | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Serie D - Double | Final 4 - Serie D double - Nordjysk Mesterskab | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| VoksenFjer | Final 4 - Voksenfjer - Nordjysk Mesterskab - Finale | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Holdturneringsdag - Voksne begyndere | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Holdturneringsdag - Voksne let øvet | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Serie A & B - Single + Double | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Holdturneringsdag - Voksne let øvet | Pulje 2 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Kval-rækken 5 + 3 | Pulje 1 | andet/ukendt | 1 | 2022–2022 | 2 | kvalifikation uden retning |
| SEN 4 + 2 B | Slutspil-nedre | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| SEN 4 + 2 B | Slutspil-øvre | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| SEN Hr - B | Vinder finale | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| Serie 30 | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Serie 30 | Pulje 2 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Herre - HD | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Herre - HS | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Serie 1 + 2 | Slutspil - Serie 1 | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Serie 1 + 2 | Slutspil - Serie 2 | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Serie 1 Nord | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Kvalifikationskamp Serie 1 | Pulje 1 | andet/ukendt | 1 | 2022–2022 | 1 | kvalifikation uden retning |
| Serie 1 Nord | Pulje 2 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Serie 1 Syd/Vest | Pulje 3 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Serie 1 Syd/Vest | Pulje 4 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| Serie 1 slutspil - oprykning Nord | Pulje 1 | oprykningsspil | 1 | 2022–2022 | 1 | navneord: oprykning |
| Serie 1 slutspil - oprykning Syd/Vest | Pulje 1 | oprykningsspil | 1 | 2022–2022 | 1 | navneord: oprykning |
| Serie 1 Slutspil - nedrykning Nord | Pulje 1 | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| Serie 1 slutspil - nedrykning Syd/Vest | Pulje 1 | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| Veteran B | Final 4 - Veteran B - Nordjysk Mesterskab | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Veteran B | Final 4 - Veteran B - Nordjysk Mesterskab - Finale | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Veteran C | Final 4 - Veteran C - Nordjysk Mesterskab | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Veteran C | Final 4 - Veteran C - Nordjysk Mesterskab - Finale | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Veteran D | Final 4 - Veteran D - Nordjysk Mesterskab | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Veteran D | Final 4 - Veteran D - Nordjysk Mesterskab - Finale | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| Veteran C | Slutspil - Nedrykning | nedrykningsspil | 1 | 2022–2022 | 1 | navneord: nedrykning |
| Veteran C | Slutspil - Oprykning | oprykningsspil | 1 | 2022–2022 | 1 | navneord: oprykning |
| 40+ 4+2 B | Slutspil-nedre | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| 40+ 4+2 B | Slutspil-øvre | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| SEN+40 Eliteserien | Pulje 1 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| SEN+40 Eliteserien | Pulje 2 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| SEN+40 Eliteserien | SEN+40 Elite Mesterskabsslutspil | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| SEN+40 Eliteserien | SEN+40 Elite Nedrykningsslutspil | nedrykningsspil | 1 | 2022–2022 | 2 | navneord: nedrykning |
| SEN +40 6+4 (5+3) Mesterrække | Pulje 1 | grundspil | 1 | 2022–2022 | 5 | navneord: grundspil/pulje |
| SEN +40 6+4 (5+3) A-række | Pulje 2 | grundspil | 1 | 2022–2022 | 5 | navneord: grundspil/pulje |
| SEN +40 6+4 (5+3) A-række - øverste slutspil | Pulje 1 | slutspil | 1 | 2022–2022 | 4 | navneord: slutspil |
| SEN +40 6+4 (5+3) A-række - nederste slutspil | Pulje 1 | slutspil | 1 | 2022–2022 | 4 | navneord: slutspil |
| SEN +40 4+2 B-række - øverste slutspil | Pulje 1 | slutspil | 1 | 2022–2022 | 5 | navneord: slutspil |
| SEN +40 4+2 B-række - nederste slutspil | Pulje 1 | slutspil | 1 | 2022–2022 | 5 | navneord: slutspil |
| SEN+45 doubler (4+2) | Pulje 507 (Sydøst - JT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| SEN+45 doubler (4 spillere) | Pulje 445 (&#216;ST-OS) NY | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| SEN+45 doubler (4 spillere) | Pulje 507 (Sydøst - JT) | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| SEN+50 1.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN+50 2.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN+50 3.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN+50 4.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN+50 5.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN+50 6.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN +50 4+2 Mesterrække | Pulje 1 | grundspil | 1 | 2022–2022 | 5 | navneord: grundspil/pulje |
| SEN +50 4 Herrer A/B-række | Pulje 1 | grundspil | 1 | 2022–2022 | 5 | navneord: grundspil/pulje |
| SEN+55 doubler (4 spillere) | Pulje 455 (&#216;ST-OS) indledende | grundspil | 1 | 2022–2022 | 9 | navneord: grundspil/pulje |
| SEN+55 doubler (4 spillere) | Pulje 456 (&#216;ST-OS) slutspil 1-4 | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| SEN+55 doubler (4 spillere) | Pulje 457 (&#216;ST-OS) slutspil 5-7 | slutspil | 1 | 2022–2022 | 9 | navneord: slutspil |
| 60+ - B-række | 1.-2.plads | andet/ukendt | 1 | 2022–2022 | 1 | ingen sikker nøgle |
| 60+ - B-række | 3.-4.plads | andet/ukendt | 1 | 2022–2022 | 1 | ingen sikker nøgle |
| 60+ - B-række | 5.-6. plads | andet/ukendt | 1 | 2022–2022 | 1 | ingen sikker nøgle |
| 60+ - A-række | Finalespil pulje 1 og 2 - 1.-2.plads | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| 60+ - A-række | Finalespil pulje 1 og 2 - 3.-4.plads | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| 60+ - A-række | Finalespil pulje 1 og 2 - 5.-6.plads | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| 60+ - B-række | Pulje 2 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| 60+ - A-række | Pulje 3 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN+60 1.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN+60 2.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| SEN+60 3.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| 60+, 4 Herrer B-række | Pulje 1 | grundspil | 1 | 2022–2022 | 5 | navneord: grundspil/pulje |
| SEN+70 1.serie | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere - Elite | Pulje 1 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 1 | Pulje 2 | grundspil | 1 | 2022–2022 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 1 | Slutspil nedre halvdel | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| MOT 4 spillere Serie 1 | Slutspil øvre halvdel | slutspil | 1 | 2022–2022 | 1 | navneord: slutspil |
| MOT 4+2 Serie 2 | Pulje 2 | grundspil | 1 | 2022–2022 | 2 | navneord: grundspil/pulje |
| MOT 4+2 Serie 2 | Slutspil nedre halvdel | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| MOT 4+2 Serie 2 | Slutspil øvre halvdel | slutspil | 1 | 2022–2022 | 2 | navneord: slutspil |
| Badmintonligaen | Kvalifikationskamp til Ligaen | kvalifikation_op | 1 | 2023–2023 | 1 | navneord: kvalifikation + op |
| Badmintonligaen | Medalje slutspil | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN A (5. - 6. plads) | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN A Finaleslutspil (1. - 4. plads) | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN A Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN A Pulje 2 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN B (5. - 6. plads) | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN B Finaleslutspil (1. - 4. plads) | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN B Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN B Pulje 2 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN C Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2) m. DS | SEN D Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2) u. DS | Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2 Double) | Bronzekamp (3.-4. plads) | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4+2 Double) | Finale (1. - 2. plads) | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4+2 Double) | Placeringskampe (5. - 8. plads) | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4+2 Double) | Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2 Double) | Pulje 2 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (2+2 Double) | SEN pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | Ekstra kamp nr. 1 og 2 | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | Finale slutspil SEN B (1. - 4. plads) | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | Finale slutspil SEN C (1. - 4. plads) | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | SEN A | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | SEN B 5. - 6. plads | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | SEN B pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | SEN B pulje 2 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | SEN C 5. - 6. plads | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | SEN C Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | SEN C pulje 2 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 3 do.,2 si.) | SEN D | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN C 3. - 4. plads | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN C 5. - 6. plads | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN C Finale | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN C/50+ Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN C/50+ Pulje 2 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN D Bronzekamp (3. - 4. plads) | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN D Finale | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN D Placering (5. - 8. plads) | andet/ukendt | 1 | 2023–2023 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN D Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | SEN D Pulje 2 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| Serie 2, 1. halvår 2024 | Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| Serie 3, 1. halvår 2024 | Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| Serie 2 - for spillere fra U17 | Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| Kredsserien Vest | Kvalkampe: Oprykning til DS | kvalifikation_op | 1 | 2023–2023 | 4 | navneord: kvalifikation + op |
| Kredsserien Vest - slutspilstider | Pulje 2 og 4 | slutspil | 1 | 2023–2023 | 4 | navneord: slutspil |
| Senior B/C (4+2) | Pulje 121 (AT) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B/C (4+2) | Pulje 121 B slutspil B | slutspil | 1 | 2023–2023 | 9 | navneord: slutspil |
| Senior B/C (4+2) | Pulje 121 slutspil A | slutspil | 1 | 2023–2023 | 9 | navneord: slutspil |
| Senior B/C (4+2) | Pulje 721 (S&#216;N-BL) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) - Single/double | Pulje 112 (AT) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) - Single/double | Pulje 113 | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) - Single/double | Pulje 113 A - Finale | slutspil | 1 | 2023–2023 | 9 | navneord: slutspil |
| Senior B (4 spillere) - Single/double | Pulje 113 B - Placeringskamp | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) - Single/double | Pulje 211 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) - Single/double | Pulje 212 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) - Single/double | Pulje 213 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) - Single/double | Pulje 214 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) - Single/double | Pulje 215 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) - Single/double | Pulje 216 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) - Single/double | Pulje 217 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) - Single/double | Pulje 511 (SYD&#216;ST-KS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C-D (4 spillere) - single/double | Pulje 411 (&#216;ST-OS) indledende | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C-D (4 spillere) - single/double | Pulje 411 A (&#216;ST-OS) Slutspil - C | slutspil | 1 | 2023–2023 | 9 | navneord: slutspil |
| Senior C-D (4 spillere) - single/double | Pulje 411 B (&#216;ST-OS) Slutspil - D | slutspil | 1 | 2023–2023 | 9 | navneord: slutspil |
| Senior C (4+2) double | Pulje 301(MIDT-MP) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4+2) double | Pulje 302(MIDT-MP) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (2+2) double | Pulje 414 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (2+2) double | Pulje 415 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 221 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) double | Pulje 222 (VEST-HH) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 321 (MIDT-MP) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 322 (MIDT-MP) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 323 (MIDT-MP) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) double | Pulje 324 (MIDT-MP) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 420 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 421 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 422 (&#216;ST-OS) Finale B | slutspil | 1 | 2023–2023 | 9 | navneord: slutspil |
| Senior C (4 spillere) double | Pulje 424 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 425 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 426 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 427 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 428 (&#216;ST-OS) Finale - C | slutspil | 1 | 2023–2023 | 9 | navneord: slutspil |
| Senior B (4 spillere) double | Pulje 521 (SYD&#216;ST-KS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 521 A (SYD&#216;ST-KS) - Placeringskamp | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 521 B (SYD&#216;ST-KS) - Placeringskamp | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 521 C (SYD&#216;ST-KS) - Placeringskamp | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 521 D (SYD&#216;ST-KS) - Placeringskamp | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 523 (SYD&#216;ST-KS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) double | Pulje 524 (SYD&#216;ST-KS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) double | Pulje 524 A (SYD&#216;ST-KS) - Placeringskamp | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) double | Pulje 524 B (SYD&#216;ST-KS) - Placeringskamp | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 621 (SYDVEST-BL) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 622 (SYDVEST-BL) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) double | Pulje 721 (S&#216;N-BL) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) double | Pulje 722 (S&#216;N-BL) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) double | Pulje 723 (S&#216;N-BL) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D/NY (4 spillere) double | Pulje 430 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D/NY (4 spillere) double | Pulje 431 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D/NY (4 spillere) double | Pulje 432 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| Senior D/NY (4 spillere) double | Pulje 433 (&#216;ST-OS) Finale D/NY | slutspil | 1 | 2023–2023 | 9 | navneord: slutspil |
| SEN Hr - A | Slutspil nedre | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| SEN Hr - A | Slutspil øvre | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| Serie B/C - Single + Double | Final 4 - Serie B/C Single+Double - Nordjysk Mesterskab | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| Serie B/C - Single + Double | Final 4 - Serie B/C Single+Double - Nordjysk Mesterskab - Finale | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| Serie C - Double | Final 4 - Serie C double - Nordjysk Mesterskab | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| VoksenFjer | Final 4 - VoksenFjer - Nordjysk Mesterskab - Finale | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| Serie A - Double | Pulje 2 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| Serie 1-2 | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| SEN Herre - HD | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| Serie 31 | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| Serie 32 | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| Sjællandsserien slutspil - Oprykning | Pulje 1 | oprykningsspil | 1 | 2023–2023 | 1 | navneord: oprykning |
| Serie 1 slutspil - oprykning nord | Pulje 1 | oprykningsspil | 1 | 2023–2023 | 1 | navneord: oprykning |
| Serie 1 slutspil - oprykning syd/vest | Pulje 1 | oprykningsspil | 1 | 2023–2023 | 1 | navneord: oprykning |
| Serie 1 slutspil - nedrkning nord | Pulje 1 | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| Serie 1 slutspil - nedrykning syd/vest | Pulje 1 | nedrykningsspil | 1 | 2023–2023 | 1 | navneord: nedrykning |
| 4+2 Syd/Vest | Pulje 1 | grundspil | 1 | 2023–2023 | 5 | navneord: grundspil/pulje |
| Herre række | Pulje 1 | grundspil | 1 | 2023–2023 | 5 | navneord: grundspil/pulje |
| Veteran B/C | Final 4 - Veteran B/C - Nordjysk Mesterskab | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| Veteran B/C | Final 4 - Veteran B/C - Nordjysk Mesterskab - Finale | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| Veteran B/C | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| 40+ 4+2 A | Slutspil nedre | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| 40+ 4+2 A | Slutspil øvre | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| Eliteserien | Elite Mesterskabsslutspil | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| Eliteserien | Elite Nedrykningsslutspil | nedrykningsspil | 1 | 2023–2023 | 2 | navneord: nedrykning |
| Eliteserien | Pulje 2 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| 20. serie | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| 6+4 (5+3) M+A - øverste slutspil | Pulje 1 | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 6+4 (5+3) M+A - midterste slutspil | Pulje 1 | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 6+4 (5+3) M+A - nederste slutspil | Pulje 1 | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4+2 B-række - kvartfinale | Kvartfinale | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4+2 B-række - semifinaler | semifinaler | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4+2 B-række - finalespil | 3.- 4.plads | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4+2 B-række - finalespil | Finale | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4 herrer A-række - øverste slutspil | &#216;verste slutspil | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4 herrer A-række - nederste slutspil | Nederste slutspil | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4 Herrer B-række - finaledag | 3.- 4.plads | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4 Herrer B-række - finaledag | Finale | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| SEN+45 doubler (4 spillere) | Pulje 445 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (2+2 Double) | Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4 spillere/ 4 doubler) | Pulje 1 | grundspil | 1 | 2023–2023 | 2 | navneord: grundspil/pulje |
| 50+ 4+2 B | Slutspil nedre | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| 50+ 4+2 B | Slutspil øvre | slutspil | 1 | 2023–2023 | 2 | navneord: slutspil |
| 1. Serie | Serie 1 Mesterskabsslutspil | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| 1. Serie | Serie 1 Nedrykningsslutspil | nedrykningsspil | 1 | 2023–2023 | 1 | navneord: nedrykning |
| 5. Serie | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| SEN +50 4+2 B-række | Pulje 1 | grundspil | 1 | 2023–2023 | 5 | navneord: grundspil/pulje |
| 4+2 B-række - øverste slutspil | Pulje 1 | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4+2 B-række - nederste slutspil | Pulje 1 | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| SEN +50 4 herrer A/B-række | Pulje 1 | grundspil | 1 | 2023–2023 | 5 | navneord: grundspil/pulje |
| 4 herrer A/B-række - kvartfinale | Pulje 1 | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4 herrer A/B-række - semifinaler | Semifinaler | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4 herrer A/B-række - finaledag | 3.- 4.plads | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| 4 herrer A/B-række - finaledag | Finale | slutspil | 1 | 2023–2023 | 5 | navneord: slutspil |
| SEN+55 doubler (4 spillere) | Pulje 455 (&#216;ST-OS) | grundspil | 1 | 2023–2023 | 9 | navneord: grundspil/pulje |
| 60+ - A-række | A-række - 1.-2. Plads | andet/ukendt | 1 | 2023–2023 | 1 | ingen sikker nøgle |
| 60+ - A-række | A-række - 3.-4. plads | andet/ukendt | 1 | 2023–2023 | 1 | ingen sikker nøgle |
| 60+ - A-række | A-række - 5.-6. Plads | andet/ukendt | 1 | 2023–2023 | 1 | ingen sikker nøgle |
| Senior 60+, 4 Herrer A/B-række | Pulje 1 | grundspil | 1 | 2023–2023 | 5 | navneord: grundspil/pulje |
| MOT 4+2 Serie 1-2 | Pulje 2 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| MOT 4+2 Serie 1-2 | Slutspil nedre halvdel | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| MOT 4+2 Serie 1-2 | Slutspil øvre halvdel | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| 50+ 4 spillere - Serie 2/3 (B/C) | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 3 | Slutspil nedre halvdel | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 3 | Slutspil øvre halvdel | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 4 | Slutspil | slutspil | 1 | 2023–2023 | 1 | navneord: slutspil |
| Test række | Pulje 1 | grundspil | 1 | 2023–2023 | 1 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2 SINGLE/double/mix)) | SEN 1 (4+2) (5. - 8. plads) | andet/ukendt | 1 | 2024–2024 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4+2 SINGLE/double/mix)) | SEN 1 (4+2) Finaleslutspil (1. - 4. plads) | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| DM-HOLD I HYGGEFJER (4+2 SINGLE/double/mix)) | SEN 1 (4+2) Pulje 1 | grundspil | 1 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2 SINGLE/double/mix)) | SEN 1 (4+2) Pulje 2 | grundspil | 1 | 2024–2024 | 2 | navneord: grundspil/pulje |
| DM-HOLD I HYGGEFJER (4+2 SINGLE/double/mix)) | SEN 2 (4+2 single/double/mix) | andet/ukendt | 1 | 2024–2024 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4+2 SINGLE/double/mix)) | SEN 3 (4+2 single/double/mix) | andet/ukendt | 1 | 2024–2024 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4+2 Double/mix) | SEN 4+2 (double/mix) | andet/ukendt | 1 | 2024–2024 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (2+2 Double/mix) | SEN 2+2 (double/mix) | andet/ukendt | 1 | 2024–2024 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/SINGLE og double) | SEN 1 - 4 spillere (single/double) | andet/ukendt | 1 | 2024–2024 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/SINGLE og double) | SEN 2 - 4 spillere (single/double) | andet/ukendt | 1 | 2024–2024 | 2 | ingen sikker nøgle |
| DM-HOLD I HYGGEFJER (4 spillere/ kun doubler) | SEN 4 spillere (kun doubler) | andet/ukendt | 1 | 2024–2024 | 2 | ingen sikker nøgle |
| Badmintonligaen | Kvalifikationskamp nr. 8-9 | kvalifikation_ned | 1 | 2024–2024 | 1 | navneord: kvalifikation + ned |
| Serie 2 - slutspil 2025 | Pulje 1 | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie 3 - slutspil 2025 | Pulje 1 | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie 4 - slutspil 2025 | Pulje 1 | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie 2 | Final 4 - Nordjysk Mesterskab - Serie 2 | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie 2 | Final 4 - Nordjysk Mesterskab - Serie 2 - Bronzekamp | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie 2 | Final 4 - Nordjysk Mesterskab - Serie 2 - Finale | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie 3 | Final 4 - Nordjysk Mesterskab - Serie 3 | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie 3 | Final 4 - Nordjysk Mesterskab - Serie 3 - Bronzekamp | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie 3 | Final 4 - Nordjysk Mesterskab - Serie 3 - Finale | slutspil | 1 | 2024–2024 | 2 | navneord: slutspil |
| Serie A - Double | Final 4 - Nordjysk Mesterskab - Serie A double | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie A - Double | Final 4 - Nordjysk Mesterskab - Serie A double - Bronzekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie A - Double | Final 4 - Nordjysk Mesterskab - Serie A double - Finale | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie B - Double | Final 4 - Nordjysk Mesterskab - Serie B double | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie B - Double | Final 4 - Nordjysk Mesterskab - Serie B double - Bronzekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie B - Double | Final 4 - Nordjysk Mesterskab - Serie B double - Finale | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie B/C - Single + Double | Final 4 - Nordjysk Mesterskab - Serie B/C single+double | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie B/C - Single + Double | Final 4 - Nordjysk Mesterskab - Serie B/C single+double - Bronzekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie B/C - Single + Double | Final 4 - Nordjysk Mesterskab - Serie B/C single+double - Finale | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie C - Double | Final 4 - Nordjysk Mesterskab - Serie C - Double | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie D - Double | Final 4 - Nordjysk Mesterskab - Serie D double | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie D - Double | Final 4 - Nordjysk Mesterskab - Serie D double - Bronzekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Serie D - Double | Final 4 - Nordjysk Mesterskab - Serie D double - Finale | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| VoksenFjer | Final 4 - Nordjysk Mesterskab - VoksenFjer | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| VoksenFjer | Final 4 - Nordjysk Mesterskab - VoksenFjer - Bronzekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| VoksenFjer | Final 4 - Nordjysk Mesterskab - VoksenFjer - Finale | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Senior B/C (4+2) | Pulje 401 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B/C (4+2) | Pulje 701 (BL) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) - Single/double | Pulje 411 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) - Single/double | Pulje 611 (SYDVEST-BL) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C/D (4 spillere) - Single/double | Pulje 211 (HHA) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C/D (4 spillere) - Single/double | Pulje 412 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C/D (4 spillere) - Single/double | Pulje 413 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C/D (4 spillere) - Single/double | Pulje 414 (&#216;ST-OS) Finale C/D | slutspil | 1 | 2024–2024 | 9 | navneord: slutspil |
| Senior C/D (4 spillere) - Single/double | Pulje 511 (KS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C/D (4 spillere) - Single/double | Pulje 511a - Placeringskamp | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C/D (4 spillere) - Single/double | Pulje 511b - Placeringskamp | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C/D (4 spillere) - Single/double | Pulje 511c - Placeringskampe | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4+2) DOUBLE | Pulje 321 - MIDT (MP) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4+2) DOUBLE | Pulje 322 - MIDT (MP) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (2+2) DOUBLE | Pulje 415 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (2+2) DOUBLE | Pulje 416 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 341 (MIDT-MP) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 420 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 421 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 422 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 423 ( &#216;ST-OS) Finale B | slutspil | 1 | 2024–2024 | 9 | navneord: slutspil |
| Senior B (4 spillere) DOUBLE | Pulje 541 (SYD&#216;ST-KS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 641 (SYDVEST-BL) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 741 (S&#216;N-BL) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 241 (VEST-HH) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 342 (MIDT-MP) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 424 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 425 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 426 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 427 (&#216;ST-OS) Finale C | slutspil | 1 | 2024–2024 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Pulje 542 (SYD&#216;ST-KS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 543 (SYD&#216;ST-KS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 742 (S&#216;N-BL) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 243 (VEST-HH) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 343 (MIDT-MP) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 428 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 429 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 430 (&#216;ST-OS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 431 (&#216;ST-OS) Finale D | slutspil | 1 | 2024–2024 | 9 | navneord: slutspil |
| Senior D (4 spillere) DOUBLE | Pulje 544 (SYD&#216;ST-KS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 545 (SYD&#216;ST-KS) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 743 (S&#216;N-BL) | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| SEN 4 + 2 A | Pulje 1 | grundspil | 1 | 2024–2024 | 2 | navneord: grundspil/pulje |
| SEN Herre HD 6 kampe | Pulje 1 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| Sjællandsserien | Sjællandsserien - Nedrykningsspil | nedrykningsspil | 1 | 2024–2024 | 1 | navneord: nedrykning |
| Sjællandsserien | Sjællandsserien - oprykningsspil | oprykningsspil | 1 | 2024–2024 | 1 | navneord: oprykning |
| Serie 1 slutkampe | Nedrykningskampe | nedrykningsspil | 1 | 2024–2024 | 1 | navneord: nedrykning |
| Serie 1 slutkampe | Oprykningskampe | oprykningsspil | 1 | 2024–2024 | 1 | navneord: oprykning |
| Serie 2 slutspil - Oprykning | Pulje 1 | oprykningsspil | 1 | 2024–2024 | 1 | navneord: oprykning |
| Serie 2 slutspil - Nedrykning | Pulje 1 | nedrykningsspil | 1 | 2024–2024 | 1 | navneord: nedrykning |
| Serie 3 slutspil - Oprykning | Pulje 1 | oprykningsspil | 1 | 2024–2024 | 1 | navneord: oprykning |
| Serie 3 slutspil - Nederste slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 4+2 Vest | Pulje 1 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| 4 Herrer Slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 4 Herrer Slutspil | Pulje 2 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Veteran A | Final 4 - Nordjysk Mesterskab - Veteran A | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Veteran A | Final 4 - Nordjysk Mesterskab - Veteran A - Bronzekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| Veteran A | Final 4 - Nordjysk Mesterskab - Veteran A - Finale | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 40+ Eliteserien | Pulje 1 | grundspil | 1 | 2024–2024 | 2 | navneord: grundspil/pulje |
| 6+4 (5+3) A-række | Pulje 1 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| 6+4 (5+3) M+A - &#216;verste slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 6+4 (5+3) M+A - Midterste slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 6+4 (5+3) M+A - Nederste slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 4+2 A-række - &#216;verste slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 4+2 A-række - Nederste slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 4 Herrer A-række - &#216;verste Slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 4 Herrer A-række - Nederste Slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 4 Herrer B-række - &#216;verste Slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 4 Herrer B-række - Nederste Slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 50+ 4+2 B | Pulje 2 | grundspil | 1 | 2024–2024 | 2 | navneord: grundspil/pulje |
| 50+ Eliteserien | Pulje 1 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| SEN+45-55 DOUBLER (4 spillere) | Pulje 455-45 A (&#216;ST-OS) Slutspil | slutspil | 1 | 2024–2024 | 9 | navneord: slutspil |
| SEN+45-55 DOUBLER (4 spillere) | Pulje 455-45 B (&#216;ST-OS) Slutspil | slutspil | 1 | 2024–2024 | 9 | navneord: slutspil |
| SEN+45-55 DOUBLER (4 spillere) | Pulje 455-45 (&#216;ST-OS) Indledende | grundspil | 1 | 2024–2024 | 9 | navneord: grundspil/pulje |
| 60+ Double | Final 4 - Nordjysk Mesterskab - 60+ double | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 60+ Double | Final 4 - Nordjysk Mesterskab - 60+ double - Bronzekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 60+ Double | Final 4 - Nordjysk Mesterskab - 60+ double - Finale | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 60+ Eliteserien | Pulje 1 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| 4 Herrer A/B-række | Pulje 1 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 4 | Pulje 2 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere Serie 4 | Slutspil nedre halvdel | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| MOT 4 spillere Serie 4 | Slutspil øvre halvdel | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| 17+ 4 spillere - Sammenlægning af Serie 1(A) + 2(B | Pulje 1 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| 17+ og 50+ 4 spillere - Serie 3 (C) (Sammenlægning | Pulje 1 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| MOT 4+2 Serie 1 | Pulje 2 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| MOT 4+2 Serie 1 - slutspil | Slutspil nedre halvdel | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| MOT 4+2 Serie 1 - slutspil | Slutspil øvre halvdel | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 1 | Pulje 2 | grundspil | 1 | 2024–2024 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 1 - Finale | Finalekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 2 - Finale | Finalekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 3 - Finale | Finalekamp | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 4 - Slutspil | Pulje 1 | slutspil | 1 | 2024–2024 | 1 | navneord: slutspil |
| DM I HYGGEFJER (4+2 DOUBLE-6 kampe) | Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DM I HYGGEFJER (4 Sp. DOUBLE-4 kampe)/SEN+ (2+2) | Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DM I HYGGEFJER (4 spillere SINGLE/DOUBLE-5 kampe) | Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DM I HYGGEFJER (4+2 m/SINGLE-8 kampe) | SEN 1 (4+2) Finaleslutspil (1. - 4. plads) | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| DM I HYGGEFJER (4+2 m/SINGLE-8 kampe) | SEN 1 (4+2) Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DM I HYGGEFJER (4+2 m/SINGLE-8 kampe) | SEN 1 (4+2) Pulje 2 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| DM I HYGGEFJER (4+2 m/SINGLE-8 kampe) | SEN 2 (4+2 single/double/mix) | andet/ukendt | 1 | 2025–2025 | 2 | ingen sikker nøgle |
| DM I HYGGEFJER (4+2 m/SINGLE-8 kampe) | SEN 3 (4+2 single/double/mix) | andet/ukendt | 1 | 2025–2025 | 2 | ingen sikker nøgle |
| Serie 2 - slutspil 2026 | Pulje 1 | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie 3 - slutspil 2026 | Pulje 1 | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie 4 - slutspil 2026 | Pulje 1 | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Kredsserien Vest | Nedrykning til serie 1 pulje 1 | nedrykningsspil | 1 | 2025–2025 | 4 | navneord: nedrykning |
| Kredsserien Vest | Nedrykning til serie 1 pulje 2 | nedrykningsspil | 1 | 2025–2025 | 4 | navneord: nedrykning |
| Kredsserien Vest | Oprykning til DS pulje 1 | oprykningsspil | 1 | 2025–2025 | 4 | navneord: oprykning |
| Kredsserien Vest | Oprykning til DS pulje 2 | oprykningsspil | 1 | 2025–2025 | 4 | navneord: oprykning |
| Senior A (4 Spillere - single/double) | Pulje 111 (AT - arne@badminton.dk) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior A (4 Spillere - single/double) | Pulje 112 (AT - arne@badminton.dk) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 Spillere - single/double) | Pulje 211 (HHA) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 Spillere - single/double) | Pulje 211-Slutspil A (HHA) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 Spillere - single/double) | Pulje 211-Slutspil B (HHA) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 Spillere - single/double) | Pulje 211-Slutspil C (HHA) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 Spillere - single/double) | Pulje 211-Slutspil D (HHA) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior B (4 Spillere - single/double) | Pulje 411 (OS) indledende | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 Spillere - single/double) | Pulje 411 A (OS) Slutspil A | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior B (4 Spillere - single/double) | Pulje 411 B (OS) Slutspil B | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 Spillere - single/double) | Pulje 412 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 Spillere - single/double) | Pulje 511 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 Spillere - single/double) | Pulje 511 Slutspil - 4 top | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 Spillere - single/double) | Pulje 511 Slutspil bund | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4+2) DOUBLE | Pulje 321 (MP) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4+2) DOUBLE | Pulje 321 A (slutspil) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4+2) DOUBLE | Pulje 321 B (slutspil) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior B (2+2) DOUBLE | Pulje 431 (OS) Indledende | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (2+2) DOUBLE | Pulje 431 A (OS) Slutspil A | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior B (2+2) DOUBLE | Pulje 431 B (OS) Slutspil B | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (2+2) DOUBLE | Pulje 432 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Finale Region SYD | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Pulje 241 HHA) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 241-Slutspil A (HHA) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Pulje 241-Slutspil B (HHA) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Pulje 241-Slutspil C (HHA) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Pulje 241-Slutspil D (HHA) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior D (4 spillere) DOUBLE | Pulje 242 (HHA) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 341 (MP) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 341A slutspil(MP) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior B (4 spillere) DOUBLE | Pulje 341B slutspil(MP) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Pulje 342 (MP) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 343 (MP) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 344 (MP) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 345 (MP) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 346 slutspil Midt Vest D4 spillere(MP) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Pulje 347 Fælles slutspil Midt-Vest(MP) | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior B (4 spillere) DOUBLE | Pulje 441 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 442 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 443 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 444 (OS) Finale (&#216;st) 4sp B | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Pulje 445 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 446 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 447 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 448 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 449 (OS) Finale (&#216;st) 4sp C | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior D (4 spillere) DOUBLE | Pulje 450 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 451 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 452 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 453 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 454 (OS) Finale (&#216;st) 4sp D | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior D (4 spillere) DOUBLE | Pulje 541 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 541 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 541 2. omgang | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 641 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 642 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 643 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior B (4 spillere) DOUBLE | Pulje 741 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Pulje 742 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior D (4 spillere) DOUBLE | Pulje 743 (TJV) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| Senior C (4 spillere) DOUBLE | Slutspil 642 - 2 | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior C (4 spillere) DOUBLE | Slutspil 642 top | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior D (4 spillere) DOUBLE | Slutspil Pulje 643 - 1 | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Senior D (4 spillere) DOUBLE | Slutspil Pulje 643 - 2 | slutspil | 1 | 2025–2025 | 9 | navneord: slutspil |
| Serie 2 | Nordjysk Mesterskab - Serie 2 - Bronzekamp | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie 2 | Nordjysk Mesterskab - Serie 2 - Finale | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie 2 | Nordjysk Mesterskab - Serie 2 - Semifinaler | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie 3 | Nordjysk Mesterskab - Serie 3 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| Serie A - Double | Nordjysk Mesterskab - Serie A - Double | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| Serie A - Single + Double | Nordjysk Mesterskab - Serie A - Single+Double | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| Serie B - Double | Nordjysk Mesterskab - Serie B - Double - Bronzekamp | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie B - Double | Nordjysk Mesterskab - Serie B - Double - Finale | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie B - Double | Nordjysk Mesterskab - Serie B - Double - Semifinaler | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie C - Double | Nordjysk Mesterskab - Serie C - Double - Bronzekamp | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie C - Double | Nordjysk Mesterskab - Serie C - Double - Finale | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie C - Double | Nordjysk Mesterskab - Serie C - Double - Semifinale | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie C - Single + Double | Nordjysk Mesterskab - Serie C - Single+Double | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| Serie D - Double | Nordjysk Mesterskab - Serie D - Double - Bronzekamp | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie D - Double | Nordjysk Mesterskab - Serie D - Double - Finale | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| Serie D - Double | Nordjysk Mesterskab - Serie D - Double - Semifinale | slutspil | 1 | 2025–2025 | 2 | navneord: slutspil |
| VoksenFjer | Nordjysk Mesterskab - VoksenFjer | andet/ukendt | 1 | 2025–2025 | 2 | ingen sikker nøgle |
| Serie A - Single + Double | Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| Sen Hr - A | Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| Sen Hr - B | Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| Sen Hr - C | Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| Københavnsserien | Nedrykning til serie 1 | nedrykningsspil | 1 | 2025–2025 | 1 | navneord: nedrykning |
| Herrehold 6 kampe | Pulje 1 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| Herrehold 4 kampe | Pulje 1 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| 4+2 | Pulje 1 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| 4 spillere - &#216;verste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| 4 spillere - Nederste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| Vet B | Pulje 1 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| Vet C | Nedrykning | nedrykningsspil | 1 | 2025–2025 | 1 | navneord: nedrykning |
| Vet C | Oprykning | oprykningsspil | 1 | 2025–2025 | 1 | navneord: oprykning |
| Vet C | Pulje 1 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| Vet C | Pulje 2 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| Veteran A | Nordjysk Mesterskab - Veteran A | andet/ukendt | 1 | 2025–2025 | 2 | ingen sikker nøgle |
| 6+4 - &#216;verste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| 6+4 - Mellemste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| 6+4 - Nederste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| 4+2 - Mellemste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| 4 Spillere - &#216;verste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| 4 Spillere - Mellemste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| 4 Spillere - Nederste slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| 4+2 B-række - Slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| SEN+55 DOUBLER (4 spillere) | Pulje 455 (OS) | grundspil | 1 | 2025–2025 | 9 | navneord: grundspil/pulje |
| 60+ Double | Nordjysk Mesterskab - 60+ Double | andet/ukendt | 1 | 2025–2025 | 2 | ingen sikker nøgle |
| 60+ 4+2 B | Pulje 1 | grundspil | 1 | 2025–2025 | 2 | navneord: grundspil/pulje |
| MOT 4+4 Serie 4/5 | Pulje 1 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| MOT 4+2 Serie 2 - slutspil | Pulje 1 | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| MOT 4+2 Serie 4/5 | Pulje 1 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| MOT 4+2 Serie 4/5 | Pulje 2 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 2 | Slutspil nedre halvdel | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 2 | Slutspil øvre halvdel | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 3 | Pulje 3 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 3 | Pulje 4 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| MOT 4 Spillere Serie 4 | Slutspil nedre halvdel | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 4 | Slutspil øvre halvdel | slutspil | 1 | 2025–2025 | 1 | navneord: slutspil |
| MOT 4 Spillere Serie 5 | Pulje 1 | grundspil | 1 | 2025–2025 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 8 og 10 | 1. division pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 8 og 10 | 2. division pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 8 og 10 | 3. division, pulje 1/3 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 8 og 10 | DS pulje 1/3 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 8 og 10 | DS pulje 5/7 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 9 og 11 | 1. division pulje 2 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 9 og 11 | 2. division pulje 2 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 9 og 11 | 3. division, pulje 2/4 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 9 og 11 | DS pulje 2/4 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Indberettede spilletider for runde 9 og 11 | DS pulje 6/8 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Københavnsserien - spilletider i slutspillet | Pulje 1 | slutspil | 1 | 2026–2026 | 1 | navneord: slutspil |
| Københavnsserien - spilletider i slutspillet | Pulje 2 | slutspil | 1 | 2026–2026 | 1 | navneord: slutspil |
| 33. Serie | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Sen 4 + 2 A | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| Sen Hr. - A | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| Sen Hr. - B | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| Sen Hr. - C | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| LF Serie | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Serie 1 - 2 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Herrehold m/k 6 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Herrehold m/k 4 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| Sjællandsserien slutspilstider | Pulje 1 | slutspil | 1 | 2026–2026 | 1 | navneord: slutspil |
| Serie 1 Slutspilstider | Pulje 1 | slutspil | 1 | 2026–2026 | 1 | navneord: slutspil |
| Serie 2 Slutspilstider | Pulje 1 | slutspil | 1 | 2026–2026 | 1 | navneord: slutspil |
| 35+ 4+2 A | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| 35+ Hr - B | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| 35+ Hr - C | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| 35 + Dame - B | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| 20. Serie | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| 50+ Hr. A | Pulje 1 | grundspil | 1 | 2026–2026 | 2 | navneord: grundspil/pulje |
| Alle serier | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| 17+ 4 spillere - Serie 3 (C) | Pulje 2 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+4 serie 4/5 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+2 serie 1 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+2 serie 2 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+2 serie 3 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4+2 serie 4/5 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 1/2 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 1/2 | Pulje 2 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 1/2 | Pulje 3 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 3 | Finale | slutspil | 1 | 2026–2026 | 1 | navneord: slutspil |
| MOT 4 spillere serie 3 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 3 | Pulje 2 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 4 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 4 | Pulje 2 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 4 | Pulje 3 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |
| MOT 4 spillere serie 4 - foreløbigt slutspil | slutspil - nedre halvdel | slutspil | 1 | 2026–2026 | 1 | navneord: slutspil |
| MOT 4 spillere serie 4 - foreløbigt slutspil | slutspil - øvre halvdel | slutspil | 1 | 2026–2026 | 1 | navneord: slutspil |
| MOT 4 spillere serie 5 | Pulje 1 | grundspil | 1 | 2026–2026 | 1 | navneord: grundspil/pulje |

### Uklare kombinationer

| Division | Gruppe | Forekomster | Hvorfor uklar |
|---|---|---:|---|
| 2. division | Kvalifikation til 1. division | 8 | kvalifikation uden retning |
| Kvalifikation til 2. division | Pulje A | 5 | kvalifikation uden retning |
| Kvalifikation til 2. division | Pulje B | 5 | kvalifikation uden retning |
| Kvalifikation til 2. division (runde 12) | Kvalifikationsevent kamp 1 | 5 | kvalifikation uden retning |
| Badmintonligaen | Ligakvalifikation | 5 | kvalifikation uden retning |
| 1. division | Kvalifikation til Badmintonligaen | 5 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje A | 5 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje B | 5 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje C | 5 | kvalifikation uden retning |
| Danmarksserien | Kvalifikation til 3. division pulje D | 5 | kvalifikation uden retning |
| U15B | U15B | 4 | ingen sikker nøgle |
| U15C | U15C | 4 | ingen sikker nøgle |
| U17C | U17C | 4 | ingen sikker nøgle |
| U15 D 4-8 spillere | Jammerbugt | 4 | ingen sikker nøgle |
| Kvalifikation til 2. division (runde 12) | Kvalifikationsevent kamp 2 | 4 | kvalifikation uden retning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 5 | 4 | kvalifikation uden retning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 6 | 4 | kvalifikation uden retning |
| U11 D 4 spillere | Jammerbugt | 4 | ingen sikker nøgle |
| U13 D 4 spillere | Jammerbugt | 4 | ingen sikker nøgle |
| U15 C 4 spillere | Jammerbugt | 4 | ingen sikker nøgle |
| DM EFTERSKOLER 4+2 Elite | 4+2 Elite | 4 | ingen sikker nøgle |
| 3. division | Kvalifikation til 2. division pulje A | 4 | kvalifikation uden retning |
| 3. division | Kvalifikation til 2. division pulje B | 4 | kvalifikation uden retning |
| DMU Hold A 4 Spillere | 3. - 4. plads | 4 | ingen sikker nøgle |
| DMU Hold B 4 Spillere | 5. - 8. plads | 4 | ingen sikker nøgle |
| DMU Hold B 4 Spillere | 9. - 12. plads | 4 | ingen sikker nøgle |
| DMU Hold U17 4+3 | 5. - 6. plads | 4 | ingen sikker nøgle |
| DMU Hold U17 4+3 | 7. - 8. plads | 4 | ingen sikker nøgle |
| Kval - 5+3 | Pulje 1 | 4 | kvalifikation uden retning |
| DMU Hold U11 4+2 | 5. - 6. plads | 4 | ingen sikker nøgle |
| Veteran A | Veteran A | 3 | ingen sikker nøgle |
| Kvalifikation til 3. division | Pulje A vest | 3 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje A øst | 3 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje B vest | 3 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje B øst | 3 | kvalifikation uden retning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 7 | 3 | kvalifikation uden retning |
| Kvalifikation til 3. division (runde 12) | Kvalifikationsevent kamp 8 | 3 | kvalifikation uden retning |
| 1. division | Kvalifikationskampe til 1. division | 3 | kvalifikation uden retning |
| 3. division | Kvalifikation til 2.division pulje A | 3 | kvalifikation uden retning |
| 3. division | Kvalifikation til 2.division pulje B | 3 | kvalifikation uden retning |
| U11 H1 | U11 H1 | 2 | ingen sikker nøgle |
| U11 H2 | U11 H2 | 2 | ingen sikker nøgle |
| U11 S1 | U11 S1 | 2 | ingen sikker nøgle |
| U11 S2 | U11 S2 | 2 | ingen sikker nøgle |
| U11 SA | U11 SA | 2 | ingen sikker nøgle |
| U11 SB | U11 SB | 2 | ingen sikker nøgle |
| U11 "4 på stribe" | "4 på stribe" | 2 | ingen sikker nøgle |
| U11 - Mikset | Mikset | 2 | ingen sikker nøgle |
| U13 B | U13 B | 2 | ingen sikker nøgle |
| U13 C | U13 C | 2 | ingen sikker nøgle |
| U13 H | U13H | 2 | ingen sikker nøgle |
| U13 S | U13 S | 2 | ingen sikker nøgle |
| Mikset | Mikset | 2 | ingen sikker nøgle |
| U15A | U15A | 2 | ingen sikker nøgle |
| U15 P | U15 P | 2 | ingen sikker nøgle |
| U15H | U15H | 2 | ingen sikker nøgle |
| U15 S | U15 S | 2 | ingen sikker nøgle |
| U13/U15 - "4 på stribe" | "4 på stribe" | 2 | ingen sikker nøgle |
| U15 - Mikset | Mikset | 2 | ingen sikker nøgle |
| U17H | U17H | 2 | ingen sikker nøgle |
| U15/17 - Drenge | Drenge | 2 | ingen sikker nøgle |
| Kvalifikation til 3. division | Pulje A Vest | 2 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje A &#216;st | 2 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje B Vest | 2 | kvalifikation uden retning |
| Kvalifikation til 3. division | Pulje B &#216;st | 2 | kvalifikation uden retning |
| Veteran C | Veteran C | 2 | ingen sikker nøgle |
| Veteran B | Veteran B | 2 | ingen sikker nøgle |
| U9S | U9S | 2 | ingen sikker nøgle |
| U9SA | U9SA | 2 | ingen sikker nøgle |
| U9SB | U9SB | 2 | ingen sikker nøgle |
| U11H | U11H | 2 | ingen sikker nøgle |
| U11S | U11S | 2 | ingen sikker nøgle |
| U11SA | U11SA | 2 | ingen sikker nøgle |
| U11SB | U11SB | 2 | ingen sikker nøgle |
| U13B | U13B | 2 | ingen sikker nøgle |
| U13C | U13C | 2 | ingen sikker nøgle |
| U13H | U13H | 2 | ingen sikker nøgle |
| U13P | U13P | 2 | ingen sikker nøgle |
| U15H | U15 H | 2 | ingen sikker nøgle |
| U17B | U17B | 2 | ingen sikker nøgle |
| Badmintonligaen | Ligakvalifikationsspillet | 2 | kvalifikation uden retning |
| 2. division | Kval. til 1. div. | 2 | kvalifikation uden retning |
| LM U11 4 SPILLERE | U 11 A | 2 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 B 1 | 2 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 B 2 | 2 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 C 1 | 2 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 C 2 | 2 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 D 1 | 2 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 D 2 | 2 | ingen sikker nøgle |
| LM U11 4 SPILLERE | U 11 D 3 | 2 | ingen sikker nøgle |
| U11 D 4-8 spillere | Jammerbugt | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | A1 | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | A2 | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | B1 | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | B2 | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | B3 | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | C1 | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | C2 | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | C3 | 2 | ingen sikker nøgle |
| LM U13 4 SPILLERE | D1 | 2 | ingen sikker nøgle |

## 3. Dækningsmatrix og brud

Matrixen har 332 region-sæson-rækker. Nedenfor er kandidatspring (mindst 40 % og mindst 5 puljer eller 20 hold); de beviser hverken strukturændring eller datahul alene.

| Region | Sæsonskifte | Puljer | Hold |
|---:|---|---|---|
| 1 | 2012→2013 | 40→103 | 132→160 |
| 1 | 2013→2014 | 103→235 | 160→357 |
| 1 | 2018→2019 | 268→44 | 494→183 |
| 1 | 2019→2020 | 44→138 | 183→273 |
| 1 | 2020→2021 | 138→259 | 273→527 |
| 1 | 2025→2026 | 291→31 | 507→243 |
| 2 | 2013→2014 | 99→184 | 280→321 |
| 2 | 2018→2019 | 221→22 | 396→82 |
| 2 | 2019→2020 | 22→136 | 82→210 |
| 2 | 2020→2021 | 136→231 | 210→400 |
| 2 | 2025→2026 | 253→4 | 423→60 |
| 3 | 2015→2016 | 8→2 | 13→8 |
| 4 | 2014→2015 | 47→92 | 116→304 |
| 4 | 2015→2016 | 92→226 | 304→643 |
| 4 | 2025→2026 | 170→12 | 490→79 |
| 5 | 2015→2016 | 54→89 | 157→260 |
| 5 | 2018→2019 | 103→237 | 253→709 |
| 5 | 2021→2022 | 171→157 | 540→315 |
| 5 | 2025→2026 | 129→31 | 283→187 |
| 6 | 2012→2013 | 3→18 | 16→27 |
| 6 | 2013→2014 | 18→2 | 27→13 |
| 6 | 2014→2015 | 2→20 | 13→61 |
| 6 | 2015→2016 | 20→223 | 61→631 |
| 6 | 2025→2026 | 170→12 | 490→79 |
| 7 | 2014→2015 | 29→62 | 64→142 |
| 7 | 2015→2016 | 62→71 | 142→240 |
| 7 | 2025→2026 | 75→24 | 217→131 |
| 9 | 2023→2024 | 11→34 | 60→176 |
| 9 | 2024→2025 | 34→16 | 176→52 |
| 9 | 2025→2026 | 16→21 | 52→107 |
| 16 | 2013→2014 | 124→38 | 365→97 |
| 16 | 2014→2015 | 38→61 | 97→136 |
| 16 | 2018→2019 | 44→67 | 124→173 |
| 16 | 2025→2026 | 61→12 | 170→55 |
| 17 | 2013→2014 | 116→58 | 337→186 |
| 17 | 2014→2015 | 58→132 | 186→432 |
| 17 | 2015→2016 | 132→197 | 432→529 |
| 18 | 2013→2014 | 107→42 | 309→107 |
| 18 | 2018→2019 | 35→213 | 105→613 |
| 18 | 2021→2022 | 123→79 | 364→171 |
| 18 | 2024→2025 | 39→108 | 122→212 |
| 18 | 2025→2026 | 108→19 | 212→109 |
| 19 | 2013→2014 | 87→28 | 256→145 |
| 19 | 2014→2015 | 28→67 | 145→233 |
| 19 | 2015→2016 | 67→148 | 233→351 |
| 23 | 2018→2019 | 3→213 | 9→610 |
| 23 | 2020→2021 | 197→56 | 614→227 |
| 23 | 2021→2022 | 56→156 | 227→400 |
| 23 | 2023→2024 | 145→47 | 406→206 |
| 24 | 2013→2014 | 20→1 | 93→3 |
| 24 | 2020→2021 | 19→27 | 90→94 |
| 24 | 2021→2022 | 27→16 | 94→68 |
| 24 | 2022→2023 | 16→30 | 68→73 |
| 25 | 2013→2014 | 89→19 | 301→96 |
| 25 | 2014→2015 | 19→61 | 96→208 |
| 25 | 2015→2016 | 61→133 | 208→320 |
| 25 | 2018→2019 | 113→46 | 331→201 |
| 25 | 2019→2020 | 46→90 | 201→285 |
| 25 | 2022→2023 | 116→36 | 284→96 |
| 25 | 2023→2024 | 36→30 | 96→145 |
| 25 | 2024→2025 | 30→4 | 145→21 |
| 27 | 2013→2014 | 87→20 | 285→58 |
| 27 | 2014→2015 | 20→92 | 58→289 |
| 27 | 2015→2016 | 92→197 | 289→529 |
| 28 | 2013→2014 | 125→30 | 365→101 |
| 28 | 2014→2015 | 30→104 | 101→350 |
| 28 | 2015→2016 | 104→197 | 350→529 |
| 29 | 2013→2014 | 112→23 | 303→65 |
| 29 | 2015→2016 | 20→195 | 61→522 |
| 30 | 2013→2014 | 118→15 | 326→40 |
| 30 | 2014→2015 | 15→89 | 40→279 |
| 30 | 2015→2016 | 89→197 | 279→529 |
| 31 | 2013→2014 | 120→38 | 386→134 |
| 31 | 2014→2015 | 38→74 | 134→229 |
| 31 | 2015→2016 | 74→139 | 229→314 |
| 32 | 2014→2015 | 106→146 | 234→435 |
| 32 | 2015→2016 | 146→220 | 435→565 |

## 4. Sæson-sanity

| season_id | Første kampdato | Sidste kampdato | Kampe |
|---:|---|---|---:|
| 2019 | 01-02-2020 | 31-10-2019 | 13349 |
| 2020 | 01-01-2021 | 31-10-2020 | 9769 |
| 2025 | 01-02-2026 | 31-10-2025 | 13468 |

## 5. Rå markeringer

2407 markørtræf på 1729 indeks-/puljesider. Kontekstprøver ligger i JSON; de er ikke automatisk tolket som en regel.

## 6–7. Roskilde og Gentofte

Den interne tekstafgrænsning fandt nedenstående kandidater. Kortet angiver ikke sæson/pulje for den konkrete Roskilde- eller Gentofte-sag, så en endelig reproduktion kan ikke gøres uden at gætte. De er derfor flaget til Christoffer i opgavekortet; der er ikke konstrueret en cap-konklusion.

| Sæson | Alder | Pulje | Division | Gruppe | Hold | Plads |
|---:|---:|---|---|---|---|---:|
| 2026 | 21 | 19143 | U13 D, 4600 (4 spillere) BD | Pulje 1 | Gentofte 4 |  |
| 2026 | 21 | 19141 | U13 C, 5100 (4 spillere) BD | Pulje 1 | Gentofte 3 |  |
| 2026 | 21 | 19138 | U13 A, 6400 (4 spillere) BD | Pulje 1 | Gentofte 2 |  |
| 2026 | 21 | 19127 | U11 D, 4400 (4 spillere) BD | Pulje 1 | Gentofte 2 |  |
| 2026 | 21 | 19124 | U11 B, 5600 (4 spillere) BD | Pulje 1 | Gentofte 1 |  |
| 2026 | 21 | 19123 | U17/U19 D, 4800 (4 piger) BD | Pulje 1 | Gentofte 4 |  |
| 2026 | 21 | 19117 | U15 B, 6200 (4 spillere) BD | Pulje 1 | Gentofte 2 |  |
| 2026 | 21 | 19116 | U09 C-D 3400 (3 spillere) BD | Pulje 1 | Gentofte 1 |  |
| 2026 | 21 | 19093 | U15 D, 4500 (4 piger) | Pulje 1 | Gentofte 3 |  |
| 2026 | 21 | 19001 | U17/U19 C, 5800 (2+2) | Pulje 1 | Gentofte 3 |  |
| 2026 | 21 | 18991 | U17/U19 B, 6800 (2+2) | Pulje 2 | Gentofte 2 |  |
| 2026 | 21 | 18989 | U17/U19 M, 14000 (4+2) | Pulje 1 | Gentofte 1 |  |
| 2026 | 21 | 18983 | UGE 38 - U15 M, 7800 (2+2) | Pulje 1 | Gentofte 2 | 1 |
| 2026 | 21 | 18978 | U15 (4+3) - maks. 14000 p. holdfællesskab | Pulje 1 | Gentofte 1 |  |
| 2026 | 21 | 18974 | U13 (4+3) - maks. 11500 p. holdfællesskab | Pulje 1 | Gentofte 1 |  |
| 2026 | 18 | 19123 | U17/U19 D, 4800 (4 piger) BD | Pulje 1 | Gentofte 4 |  |
| 2026 | 18 | 19001 | U17/U19 C, 5800 (2+2) | Pulje 1 | Gentofte 3 |  |
| 2026 | 18 | 18991 | U17/U19 B, 6800 (2+2) | Pulje 2 | Gentofte 2 |  |
| 2026 | 18 | 18989 | U17/U19 M, 14000 (4+2) | Pulje 1 | Gentofte 1 |  |
| 2026 | 13 | 18921 | Eliteserien | Pulje 1 | Gentofte | 4 |
| 2026 | 11 | 18919 | 3. Serie | Pulje 1 | Gentofte 3 | 6 |
| 2026 | 11 | 18918 | 2. Serie | Pulje 1 | Gentofte 2 | 4 |
| 2026 | 11 | 18915 | Eliteserien | Pulje 1 | Gentofte | 3 |
| 2026 | 9 | 18912 | 3. Serie | Pulje 1 | Gentofte 2 | 8 |
| 2026 | 9 | 18909 | Eliteserien | Pulje 1 | Gentofte | 5 |
| 2026 | 5 | 19117 | U15 B, 6200 (4 spillere) BD | Pulje 1 | Gentofte 2 |  |
| 2026 | 5 | 19093 | U15 D, 4500 (4 piger) | Pulje 1 | Gentofte 3 |  |
| 2026 | 5 | 18983 | UGE 38 - U15 M, 7800 (2+2) | Pulje 1 | Gentofte 2 | 1 |
| 2026 | 5 | 18978 | U15 (4+3) - maks. 14000 p. holdfællesskab | Pulje 1 | Gentofte 1 |  |
| 2026 | 4 | 19143 | U13 D, 4600 (4 spillere) BD | Pulje 1 | Gentofte 4 |  |
| 2026 | 4 | 19141 | U13 C, 5100 (4 spillere) BD | Pulje 1 | Gentofte 3 |  |
| 2026 | 4 | 19138 | U13 A, 6400 (4 spillere) BD | Pulje 1 | Gentofte 2 |  |
| 2026 | 4 | 18974 | U13 (4+3) - maks. 11500 p. holdfællesskab | Pulje 1 | Gentofte 1 |  |
| 2026 | 3 | 19127 | U11 D, 4400 (4 spillere) BD | Pulje 1 | Gentofte 2 |  |
| 2026 | 3 | 19124 | U11 B, 5600 (4 spillere) BD | Pulje 1 | Gentofte 1 |  |
| 2026 | 2 | 19116 | U09 C-D 3400 (3 spillere) BD | Pulje 1 | Gentofte 1 |  |
| 2026 | 1 | 18905 | 3. Serie | Pulje 2 | Gentofte 6 | 2 |
| 2026 | 1 | 18902 | Københavnsserien - spilletider i slutspillet | Pulje 1 | Gentofte 5 |  |
| 2026 | 1 | 18894 | Københavnsserien | Pulje 1 | Gentofte 5 | 2 |
| 2026 | 1 | 18885 | Indberettede spilletider for runde 9 og 11 | 3. division, pulje 2/4 | Gentofte 4 |  |
| 2026 | 1 | 18884 | Indberettede spilletider for runde 9 og 11 | 2. division pulje 2 | Gentofte 3 |  |
| 2026 | 1 | 18883 | Indberettede spilletider for runde 9 og 11 | 1. division pulje 2 | Gentofte 2 |  |
| 2026 | 1 | 18872 | Badmintonligaen | Grundspil | Gentofte | 2 |
| 2026 | 1 | 18845 | 3. division | Pulje 4 | Gentofte 4 | 2 |
| 2026 | 1 | 18839 | 2. division | Pulje 2 | Gentofte 3 | 1 |
| 2026 | 1 | 18834 | 1. division | Pulje 2 | Gentofte 2 | 1 |
| 2025 | 21 | 18784 | DMU Hold U17/U19C 2+2 (5800) | Finaleslutspil (1. - 3. plads) | Gentofte | 3 |
| 2025 | 21 | 18769 | DMU Hold U15A 2+2 (6800) | Placeringskamp 7. - 8. plads | Gentofte 2 | 1 |
| 2025 | 21 | 18693 | DMU Hold U13 (4+3) | Finale | Gentofte 1 | 2 |
| 2025 | 21 | 18691 | DMU Hold U15 (4+3) | Placeringskamp 7-8 | HBC/Gentofte 1 | 1 |
| 2025 | 21 | 18686 | DMU Hold U17 (4+3) | Finaleslutspil (1. - 4. plads) | Gentofte 1 | 1 |
| 2025 | 21 | 18668 | DMU Hold U15A 2+2 (6800) | Pulje 2 | Gentofte 2 | 4 |
| 2025 | 21 | 18664 | DMU Hold U11 4+2 | 5. - 6. plads | Gentofte 1 | 1 |
| 2025 | 21 | 18639 | DMU Hold U17/U19C 2+2 (5800) | Pulje 1 | Gentofte 1 | 3 |
| 2025 | 21 | 18638 | DMU Hold U17 (4+3) | Pulje 2 | Gentofte 1 | 1 |
| 2025 | 21 | 18636 | DMU Hold U15 (4+3) | Pulje 2 | HBC/Gentofte 1 | 4 |
| 2025 | 21 | 18616 | DMU Hold U13 (4+3) | Pulje 2 | Gentofte 1 | 1 |
| 2025 | 21 | 18591 | DMU Hold U11 4+2 | Pulje 2 | Gentofte 1 | 3 |
| 2025 | 21 | 18505 | U09 C 3600 (3 spillere) BD (2. halvår) | Pulje 3 | Gentofte 1 | 2 |
| 2025 | 21 | 18503 | U09 C 3600 (3 spillere) BD (2. halvår) | Pulje 1 | Gentofte 2 | 3 |
| 2025 | 21 | 18137 | U11 D 4600 (4 spillere) BD | Pulje 3 | Gentofte 3 | 5 |
| 2025 | 21 | 18129 | U09 C 3600 (3 spillere) BD | Pulje 1 | Gentofte 1 | 5 |
| 2025 | 21 | 18128 | U09 D 3300 (3 spillere) BD | Pulje 2 | Gentofte 2 | 2 |
| 2025 | 21 | 18114 | U11 C, 5100 (4 spillere) | Pulje 1 | Gentofte 1 | 4 |
| 2025 | 21 | 18086 | U17/U19 M, 10000 (4 spillere) | Pulje 1 | Gentofte 1 | 2 |
| 2025 | 21 | 18049 | U15 M, 7800 (2+2) | Pulje 1 | Gentofte 1 |  |
| 2025 | 21 | 18007 | U15 D, 5000 (2+2) | Pulje 1 | Gentofte 4 | 4 |
| 2025 | 21 | 18006 | U17/U19 D, 5000 (2+2) | Pulje 1 | Gentofte 4 | 3 |
| 2025 | 21 | 18005 | U17/U19 A, 7800 (2+2) | Pulje 1 | Gentofte 2 | 2 |
| 2025 | 21 | 18003 | U15 B, 6000 (2+2) | Pulje 1 | Gentofte 3 | 4 |
| 2025 | 21 | 18002 | U15 A, 6800 (2+2) | Pulje 1 | Gentofte 2 | 3 |
| 2025 | 21 | 18001 | U15 (4+3) | Pulje 1 | HBC/Gentofte 1 | 3 |
| 2025 | 21 | 18000 | U13 D, 4800 (2+2) | Pulje 1 | Gentofte 4 | 6 |
| 2025 | 21 | 17993 | U13 B, 5400 (2+2) | Pulje 1 | Gentofte 2 | 2 |
| 2025 | 21 | 17993 | U13 B, 5400 (2+2) | Pulje 1 | Gentofte 3 | 3 |
| 2025 | 21 | 17984 | U13 (4+3) | Pulje 1 | Gentofte 1 | 2 |
| 2025 | 21 | 17983 | U11 (4+2) | Pulje 1 | Gentofte 3 | 1 |
| 2025 | 21 | 17981 | U17 (4+3) | Pulje 1 | Gentofte 1 | 1 |
| 2025 | 21 | 17979 | U17/U19 C, 5800 (2+2) | Pulje 1 | Gentofte 3 | 3 |
| 2025 | 18 | 18784 | DMU Hold U17/U19C 2+2 (5800) | Finaleslutspil (1. - 3. plads) | Gentofte | 3 |
| 2025 | 18 | 18639 | DMU Hold U17/U19C 2+2 (5800) | Pulje 1 | Gentofte 1 | 3 |
| 2025 | 18 | 18086 | U17/U19 M, 10000 (4 spillere) | Pulje 1 | Gentofte 1 | 2 |
| 2025 | 18 | 18006 | U17/U19 D, 5000 (2+2) | Pulje 1 | Gentofte 4 | 3 |
| 2025 | 18 | 18005 | U17/U19 A, 7800 (2+2) | Pulje 1 | Gentofte 2 | 2 |
| 2025 | 18 | 17979 | U17/U19 C, 5800 (2+2) | Pulje 1 | Gentofte 3 | 3 |
| 2025 | 13 | 17962 | Eliteserien | Pulje 1 | Gentofte 1 | 5 |
| 2025 | 11 | 17960 | 3. Serie | Pulje 1 | Gentofte 3 | 6 |
| 2025 | 11 | 17959 | 2. Serie | Pulje 1 | Gentofte 2 | 3 |
| 2025 | 11 | 17956 | Eliteserien | Pulje 1 | Gentofte 1 | 2 |
| 2025 | 9 | 17957 | 40+ 20. Serie | Pulje 1 | Gentofte 2 | 3 |
| 2025 | 9 | 17951 | Eliteserien | Pulje 1 | Gentofte 1 | 5 |
| 2025 | 6 | 18686 | DMU Hold U17 (4+3) | Finaleslutspil (1. - 4. plads) | Gentofte 1 | 1 |
| 2025 | 6 | 18638 | DMU Hold U17 (4+3) | Pulje 2 | Gentofte 1 | 1 |
| 2025 | 6 | 17981 | U17 (4+3) | Pulje 1 | Gentofte 1 | 1 |
| 2025 | 5 | 18769 | DMU Hold U15A 2+2 (6800) | Placeringskamp 7. - 8. plads | Gentofte 2 | 1 |
| 2025 | 5 | 18691 | DMU Hold U15 (4+3) | Placeringskamp 7-8 | HBC/Gentofte 1 | 1 |
| 2025 | 5 | 18668 | DMU Hold U15A 2+2 (6800) | Pulje 2 | Gentofte 2 | 4 |
| 2025 | 5 | 18636 | DMU Hold U15 (4+3) | Pulje 2 | HBC/Gentofte 1 | 4 |
| 2025 | 5 | 18049 | U15 M, 7800 (2+2) | Pulje 1 | Gentofte 1 |  |
| 2025 | 5 | 18007 | U15 D, 5000 (2+2) | Pulje 1 | Gentofte 4 | 4 |

## Konklusion

- Stabilt, tværsæson-klub-ID: **nej fundet i dette udsnit**.
- Gruppetyper: kataloget er komplet for `league_groups`; uklare navne er bevaret som `andet/ukendt`.
- Roskilde/Gentofte: kræver de konkrete sæson-/puljehenvisninger for en ikke-gættet testcase.
