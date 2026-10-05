# Opgave 136 — parserens effekt

Kilde: ungdomsgrupper age_group_id 2, 3, 4, 5, 6, 7, 18. Baseline genskabt fra eksisterende 129-parser: 1986 distinkte rækkenavne, 941 tolkede, 1045 ufortolkede; de ufortolkede forekommer i 3536 fysiske league_groups-rækker.

## Effekt pr. godkendt forslag

| Forslag | Distinkte rækkenavne | Fysiske rækker | Eksempler |
|---|---:|---:|---|
| forslag-1 | 4 | 4 | 3800; 4400; 5600; 6800 |
| forslag-2 | 27 | 77 | U11 CD 4 Spillere; U11 CD 4 Piger; U11 CD 4 spillere; DMU Hold U11 CD 4 Sp.; DMU Hold U11 CD 4 Piger |
| forslag-3 | 31 | 44 | U11 1.Serie; U11 2. Serie; U11 3. Serie; U13 2. Serie; U13 3. Serie |
| forslag-6 | 71 | 129 | U9, Begyndere ikke pointgivende, 4 spillere; U 11, Begyndere ikke pointgivende, 4 spillere; U 13, Begyndere ikke pointgivende, 4 spillere; U9 Begynder; U11 Begynder |

Forslag 4 forbliver kun optælling: 4+3 har 71 rå navne/347 fysiske rækker; U11 4+2 har 11 rå navne/33 fysiske rækker. De to lister og op til 20 eksempler pr. format står i JSON.

Samlet: 3230 tidligere tolkede poster; 125 fysiske rækker nyligt tolkede efter forslag 1–3; 129 poster sendt til forslag 6's separate liste; 912 navne/3282 rækker forbliver ufortolkede. Parserens 25 konkrete testeksempler bestod (25/25).

JSON-filen indeholder parserresultat for hvert distinkt rækkenavn; alle nye fortolkninger har `tolkning_regel` = forslag-1, forslag-2 eller forslag-3. Separate poster har forslag-6; gamle parserfund har null, da de ikke er nyfortolkninger. Ingen database skrivning.
