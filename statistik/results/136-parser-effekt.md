# Opgave 136 — parserens effekt

Kilde: ungdomsgrupper age_group_id 2, 3, 4, 5, 6, 7, 18. Baseline genskabt fra eksisterende 129-parser: 1986 distinkte rækkenavne, 941 tolkede, 1045 ufortolkede; de ufortolkede forekommer i 3536 fysiske league_groups-rækker.

## Effekt pr. godkendt forslag

| Forslag | Distinkte rækkenavne | Fysiske rækker | Eksempler |
|---|---:|---:|---|
| forslag-1 | 4 | 4 | 3800; 4400; 5600; 6800 |
| forslag-2 | 27 | 77 | U11 CD 4 Spillere; U11 CD 4 Piger; U11 CD 4 spillere; DMU Hold U11 CD 4 Sp.; DMU Hold U11 CD 4 Piger |
| forslag-3 | 31 | 44 | U11 1.Serie; U11 2. Serie; U11 3. Serie; U13 2. Serie; U13 3. Serie |
| forslag-6 | 71 | 129 | U9, Begyndere ikke pointgivende, 4 spillere; U 11, Begyndere ikke pointgivende, 4 spillere; U 13, Begyndere ikke pointgivende, 4 spillere; U9 Begynder; U11 Begynder |

Forslag 4: 4+3 har 347 fysiske puljer/71 rå navne; U11 4+2 har 33/11. Statusfordeling pr. format står nedenfor og fuldt i JSON. Rækker med niveau står fuldt listet i JSON; hvert forslag-4-format har op til 20 konkrete eksempler pr. status.

| Format | Status | Fysiske puljer | Distinkte rå navne |
|---|---|---:|---:|
| 4+3 | har_niveau | 11 | 11 |
| 4+3 | eneste_raekke | 49 | 20 |
| 4+3 | flere_eller_ukendt | 287 | 51 |
| U11 4+2 | har_niveau | 5 | 5 |
| U11 4+2 | eneste_raekke | 12 | 6 |
| U11 4+2 | flere_eller_ukendt | 16 | 2 |

### Stikprøve på 15 parserrækker (4+3)

| Klasse | Sæson | Alder | Regionkoblinger og antal formatrækker | Rå rækkenavn |
|---|---|---|---|---|
| har niveau | 2012/13 | U11 | Badminton Sjælland: 1 | U11 A-række (4+3) |
| har niveau | 2013/14 | U11 | Badminton Sjælland: 2 | U11 A 4+3 |
| har niveau | 2013/14 | U11 | Badminton Sjælland: 2 | U11A 4+3 Finale |
| har niveau | 2014/15 | U11 | Badminton København: 1 | U11 1.serie (4+3) |
| har niveau | 2014/15 | U13 | Badminton København: 1 | U13 1.serie (4+3) |
| eneste række | 2011/12 | U11 | Badminton Sjælland: 1 | A (4+3) |
| eneste række | 2011/12 | U13 | Badminton Sjælland: 1 | A (4+3) |
| eneste række | 2011/12 | U17 | Badminton Sjælland: 1 | A (4+3) |
| eneste række | 2012/13 | U13 | Badminton Sjælland: 1 | U13 Elite/Mesterrække (4+3) |
| eneste række | 2012/13 | U15 | Badminton Sjælland: 1 | U15 Elite/Mesterrække (4+3) |
| flere/ukendt | 2011/12 | U15 | Badminton Sjælland: 2 | A (4+3) |
| flere/ukendt | 2011/12 | U15 | Badminton Sjælland: 2 | A (4+3) |
| flere/ukendt | 2013/14 | U13 | Badminton Midtjylland: 4 | U13 4+3 |
| flere/ukendt | 2013/14 | U13 | Badminton Midtjylland: 4 | U13 4+3 |
| flere/ukendt | 2013/14 | U13 | Badminton Midtjylland: 4 | U134+3 slutspil |

Rækker med niveau: Finale U11B 4+2; U 11 2.serie (4+2 A); U11 1.serie (4+3); U11 A 4+3; U11 A Række 4+3; U11 A-række (4+3); U11 B 4+2; U11 B-række (4+2); U11A 4+3 Finale; U11B 4+2 Finale; U13 1.serie (4+3); U13 E Række 4+3; U15 1.serie (4+3); U15 E Række 4+3; U17 1.serie (4+3); U17 E Række 4+3.

Samlet: 3230 tidligere tolkede poster; 125 fysiske rækker nyligt tolkede efter forslag 1–3; 61 puljer fik forslag-4-status; 129 poster på forslag 6's separate liste; 899 navne/3221 rækker forbliver ufortolkede. Parserprøver: 25/25 tidligere + 3/3 nye (28/28).

De tre proposal-4 grupper er 4+3, U11 4+2 og den samlede liste over begge formater med bogstav-/talniveau. Flere-række scopes forbliver uafklarede; konkrete scopes står i JSON. JSON indeholder parserresultat for hvert råt rækkenavn og scopes. Ingen database skrivning.
