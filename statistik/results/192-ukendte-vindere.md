# Opgave 192 — ukendte vindere

Kørt offline 2026-10-10 mod den lokale normalized database. Databasen blev åbnet med readOnly:true og PRAGMA query_only=ON. Netværkskald: **0**.

## 1. Katalog og omfang

- Individuelle kampe uden home/away-vinder: **967**; i sæson 2025/26: **116**.
- Antal scorede sæt tælles som unikke sætresultater i de to rå scorefelter.
- Manglende holdkortside udledes kun når deltagerlisten indeholder spillere på præcis én side. Ingen spillere på nogen side eller spillere på begge sider giver ingen sådan slutning.
- Katalogets komplette felter og deltagerliste står i CSV/JSON.

### Status

| Status | Kampe |
|---|---:|
| api_repaired | 29 |
| browser_parsed | 4 |
| browser_zero_score | 8 |
| complete | 926 |

### Spillede sæt pr. kamp

| Sæt | Kampe |
|---:|---:|
| 0 | 936 |
| 2 | 31 |

## 2. Kontrol mod kendte holdresultater

Kun holdkampe hvor alle individuelle kampe har registreret hjemme-/udevinder og holdresultatet kan parses indgår. **1908 af 2048** stemmer præcist; **140** afviger. G-markør på individuelle rækker i afvigende holdkampe: **43**; i holdkampe der stemmer: **62**. Holdkampe med mindst én G: 17/140 afvigende (12.1 %) mod 34/1908 præcise (1.8 %). Dette er tællinger, ikke en kausal forklaring.

| Ekstern holdkamp-ID (eller intern ID) | Sæson-ID | Dato | Holdresultat | Optalte sejre | G-kampe |
|---|---:|---|---|---|---:|
| 23219 | 2010 | 2010-09-26 | 6-7 | 6-6 | 0 |
| 50021 | 2012 | 2012-10-07 | 0-8 | 0-6 | 0 |
| 50296 | 2012 | 2012-10-07 | 6-0 | 1-5 | 5 |
| 49741 | 2012 | 2012-10-07 | 7-5 | 8-4 | 0 |
| 50027 | 2012 | 2012-11-18 | 4-4 | 4-2 | 0 |
| 49890 | 2012 | 2012-12-09 | 9-0 | 5-0 | 0 |
| 50032 | 2012 | 2012-12-09 | 4-4 | 2-4 | 0 |
| 50284 | 2012 | 2013-01-13 | 5-3 | 3-3 | 0 |
| 50289 | 2012 | 2013-02-03 | 6-2 | 5-2 | 0 |
| 50044 | 2012 | 2013-03-10 | 1-7 | 1-5 | 0 |
| 50292 | 2012 | 2013-03-10 | 6-2 | 6-1 | 0 |
| 95850 | 2013 | 2013-09-22 | 2-6 | 1-6 | 0 |
| 96111 | 2013 | 2013-09-22 | 2-6 | 0-1 | 0 |
| 95851 | 2013 | 2013-10-06 | 6-2 | 4-2 | 0 |
| 96223 | 2013 | 2013-10-06 | 4-2 | 2-2 | 0 |
| 96250 | 2013 | 2013-10-06 | 1-7 | 0-7 | 0 |
| 96120 | 2013 | 2013-10-27 | 1-7 | 1-4 | 0 |
| 96226 | 2013 | 2013-10-27 | 5-1 | 4-1 | 0 |
| 95857 | 2013 | 2013-12-08 | 3-5 | 1-5 | 0 |
| 95859 | 2013 | 2014-01-12 | 6-2 | 6-0 | 0 |
| 95863 | 2013 | 2014-02-23 | 3-5 | 2-5 | 0 |
| 96145 | 2013 | 2014-02-23 | 0-8 | 0-5 | 0 |
| 96286 | 2013 | 2014-02-23 | 0-6 | 0-4 | 0 |
| 96149 | 2013 | 2014-03-09 | 5-3 | 3-3 | 0 |
| 100358 | 2013 | 2014-03-09 | 4-4 | 2-2 | 0 |
| 95867 | 2013 | 2014-03-23 | 8-0 | 6-0 | 0 |
| 142501 | 2014 | 2014-09-07 | 3-5 | 0-5 | 0 |
| 142166 | 2014 | 2014-09-21 | 2-4 | 2-2 | 0 |
| 143862 | 2014 | 2014-09-21 | 6-0 | 4-0 | 0 |
| 141997 | 2014 | 2014-11-16 | 11-1 | 10-2 | 1 |
| 142316 | 2014 | 2014-12-07 | 1-5 | 1-3 | 0 |
| 169020 | 2014 | 2015-01-11 | 0-6 | 4-0 | 4 |
| 143886 | 2014 | 2015-03-08 | 3-3 | 3-1 | 0 |
| 196556 | 2015 | 2015-10-25 | 4-2 | 2-2 | 0 |
| 196369 | 2015 | 2015-10-25 | 0-6 | 0-3 | 0 |
| 196558 | 2015 | 2015-11-15 | 4-2 | 2-2 | 0 |
| 196564 | 2015 | 2015-12-06 | 0-6 | 0-4 | 0 |
| 196569 | 2015 | 2016-01-17 | 3-3 | 1-3 | 0 |
| 193994 | 2015 | 2016-01-31 | 3-5 | 2-6 | 1 |
| 239763 | 2016 | 2016-09-25 | 4-2 | 2-2 | 0 |
| 239567 | 2016 | 2016-10-09 | 2-4 | 0-4 | 0 |
| 239116 | 2016 | 2016-10-09 | 2-4 | 2-0 | 0 |
| 239228 | 2016 | 2016-11-20 | 8-0 | 7-1 | 1 |
| 239576 | 2016 | 2017-01-15 | 2-4 | 0-4 | 0 |
| 239245 | 2016 | 2017-03-26 | 5-4 | 3-4 | 0 |
| 239780 | 2016 | 2017-03-26 | 1-5 | 1-3 | 0 |
| 282905 | 2017 | 2018-01-14 | 0-6 | 0-4 | 0 |
| 282799 | 2017 | 2018-03-11 | 3-4 | 3-2 | 0 |
| 280582 | 2017 | 2018-04-08 | 1-7 | 2-6 | 1 |
| 330558 | 2018 | 2018-09-09 | 1-12 | 2-11 | 0 |
| 337417 | 2018 | 2018-10-28 | 4-3 | 4-2 | 0 |
| 353930 | 2018 | 2018-12-09 | 5-1 | 3-1 | 0 |
| 353932 | 2018 | 2018-12-09 | 5-1 | 3-1 | 0 |
| 340306 | 2018 | 2019-01-13 | 0-6 | 0-5 | 0 |
| 329782 | 2018 | 2019-02-03 | 4-4 | 3-5 | 1 |
| 365995 | 2019 | 2019-09-21 | 5-8 | 6-7 | 0 |
| 373816 | 2019 | 2019-12-08 | 3-4 | 3-0 | 0 |
| 373519 | 2019 | 2020-02-23 | 2-4 | 1-5 | 0 |
| 373653 | 2019 | 2020-03-08 | 5-1 | 3-1 | 0 |
| 387364 | 2020 | 2020-09-13 | 11-2 | 12-1 | 0 |
| 387757 | 2020 | 2020-10-11 | 5-1 | 3-3 | 0 |
| 414809 | 2021 | 2021-10-10 | 4-2 | 3-3 | 0 |
| 413791 | 2021 | 2021-11-21 | 6-0 | 3-0 | 0 |
| 413853 | 2021 | 2021-11-21 | 6-0 | 4-0 | 0 |
| 421909 | 2021 | 2021-12-12 | 3-4 | 3-2 | 0 |
| 414560 | 2021 | 2021-12-12 | 3-4 | 3-1 | 0 |
| 407444 | 2021 | 2022-01-09 | 4-8 | 5-7 | 1 |
| 414060 | 2021 | 2022-02-06 | 4-2 | 2-2 | 0 |
| 413617 | 2021 | 2022-02-27 | 1-5 | 1-3 | 0 |
| 413803 | 2021 | 2022-03-27 | 2-4 | 2-1 | 0 |
| 413962 | 2021 | 2022-03-27 | 1-5 | 1-3 | 0 |
| 413963 | 2021 | 2022-03-27 | 3-4 | 1-4 | 0 |
| 429729 | 2022 | 2022-10-09 | 4-2 | 2-2 | 0 |
| 430515 | 2022 | 2022-10-09 | 3-3 | 1-3 | 0 |
| 429489 | 2022 | 2022-10-30 | 5-1 | 3-2 | 1 |
| 429491 | 2022 | 2022-10-30 | 2-4 | 2-3 | 1 |
| 429496 | 2022 | 2022-12-11 | 0-6 | 0-4 | 0 |
| 429498 | 2022 | 2022-12-11 | 6-0 | 4-0 | 0 |
| 429924 | 2022 | 2023-01-15 | 4-3 | 4-2 | 0 |
| 430139 | 2022 | 2023-01-15 | 3-4 | 3-2 | 0 |
| 430104 | 2022 | 2023-01-15 | 6-0 | 4-0 | 0 |
| 433615 | 2022 | 2023-02-05 | 4-2 | 2-2 | 0 |
| 430108 | 2022 | 2023-02-05 | 4-2 | 4-0 | 0 |
| 430296 | 2022 | 2023-02-26 | 6-0 | 5-0 | 0 |
| 442940 | 2022 | 2023-04-29 | 4-2 | 3-2 | 0 |
| 443925 | 2022 | 2023-04-30 | 5-1 | 4-2 | 1 |
| 462728 | 2023 | 2024-04-21 09:00:00 | 4-2 | 4-0 | 0 |
| 452822 | 2023 | 2023-10-29 | 6-0 | 4-0 | 0 |
| 452823 | 2023 | 2023-10-29 | 3-3 | 3-1 | 0 |
| 452828 | 2023 | 2023-11-19 | 2-4 | 0-2 | 0 |
| 454632 | 2023 | 2023-11-19 | 2-4 | 2-2 | 0 |
| 454634 | 2023 | 2023-11-19 | 2-4 | 2-2 | 0 |
| 452831 | 2023 | 2023-12-10 | 4-3 | 4-1 | 0 |
| 452196 | 2023 | 2023-12-10 | 0-6 | 0-3 | 0 |
| 452891 | 2023 | 2024-01-14 | 3-4 | 4-2 | 2 |
| 454458 | 2023 | 2024-01-14 | 5-1 | 3-1 | 0 |
| 445619 | 2023 | 2024-01-28 | 3-5 | 4-4 | 0 |
| 452208 | 2023 | 2024-02-04 | 5-1 | 2-1 | 0 |
| 453008 | 2023 | 2024-02-25 | 0-6 | 0-5 | 0 |
| 452554 | 2023 | 2024-03-24 | 6-0 | 4-0 | 0 |
| 453021 | 2023 | 2024-03-24 | 0-6 | 0-4 | 0 |
| 453023 | 2023 | 2024-03-24 | 6-0 | 4-0 | 0 |
| 452220 | 2023 | 2024-03-24 | 3-2 | 2-2 | 0 |
| 452221 | 2023 | 2024-03-24 | 2-4 | 0-4 | 0 |
| 452589 | 2023 | 2024-03-24 | 6-0 | 4-0 | 0 |
| 462982 | 2023 | 2024-04-20 | 4-5 | 3-5 | 0 |
| 465711 | 2024 | 2024-09-29 | 0-8 | 6-2 | 6 |
| 464268 | 2024 | 2024-12-07 | 6-7 | 7-6 | 0 |
| 471612 | 2024 | 2024-12-08 | 2-4 | 2-2 | 0 |
| 466134 | 2024 | 2025-01-05 | 4-9 | 9-4 | 5 |
| 471323 | 2024 | 2025-01-12 | 6-0 | 3-0 | 0 |
| 471324 | 2024 | 2025-01-12 | 2-4 | 2-1 | 0 |
| 466136 | 2024 | 2025-01-26 | 1-12 | 9-4 | 8 |
| 471621 | 2024 | 2025-02-02 | 5-1 | 4-1 | 0 |
| 471464 | 2024 | 2025-02-02 | 1-5 | 1-4 | 0 |
| 469721 | 2024 | 2025-02-02 | 2-4 | 2-2 | 0 |
| 471718 | 2024 | 2025-02-23 | 0-6 | 0-4 | 0 |
| 471769 | 2024 | 2025-03-09 | 5-1 | 3-1 | 0 |
| 471773 | 2024 | 2025-03-23 | 6-0 | 5-0 | 0 |
| 471343 | 2024 | 2025-03-23 | 3-4 | 3-0 | 0 |
| 471345 | 2024 | 2025-03-23 | 6-0 | 3-0 | 0 |
| 493232 | 2025 | 2025-10-05 | 2-3 | 0-3 | 0 |
| 493929 | 2025 | 2025-10-05 | 5-1 | 4-1 | 1 |
| 493220 | 2025 | 2025-10-26 | 2-3 | 0-3 | 0 |
| 493590 | 2025 | 2025-10-26 | 2-4 | 2-1 | 0 |
| 493364 | 2025 | 2025-11-16 | 6-0 | 4-2 | 0 |
| 492136 | 2025 | 2025-11-16 | 4-2 | 2-2 | 0 |
| 492138 | 2025 | 2025-11-16 | 1-5 | 1-3 | 0 |
| 492919 | 2025 | 2025-12-07 | 4-2 | 4-0 | 0 |
| 494098 | 2025 | 2025-12-07 | 3-4 | 3-2 | 0 |
| 494100 | 2025 | 2025-12-07 | 2-4 | 2-2 | 0 |
| 487186 | 2025 | 2026-01-04 | 4-9 | 8-5 | 0 |
| 494402 | 2025 | 2026-01-11 | 2-4 | 0-4 | 0 |
| 487585 | 2025 | 2026-01-11 | 3-10 | 6-7 | 3 |
| 487478 | 2025 | 2026-02-01 | 6-0 | 4-0 | 0 |
| 505211 | 2025 | 2026-02-22 | 0-5 | 0-3 | 0 |
| 494407 | 2025 | 2026-02-22 | 5-1 | 2-1 | 0 |
| 494409 | 2025 | 2026-02-22 | 5-1 | 2-1 | 0 |
| 487594 | 2025 | 2026-03-01 | 4-9 | 5-8 | 0 |
| 505282 | 2025 | 2026-03-22 | 2-3 | 2-1 | 0 |

### Resultatmarkører

| Markør | Antal individuelle kampe | Betydning |
|---|---:|---|
| (1) | 5 | ukendt |
| (2) | 4 | ukendt |
| (tom) | 20010 | Ingen markør; betydning ukendt |
| A | 1 | ukendt |
| B | 6 | ukendt |
| C | 9 | ukendt |
| D | 23 | ukendt |
| E | 0 | ukendt |
| F | 28 | ukendt |
| G | 150 | Walkover/protest eller lignende (oplyst af Christoffer; ikke selvstændigt verificeret) |
| H | 19 | ukendt |
| I | 1 | ukendt |
| J | 0 | ukendt |
| K | 15 | ukendt |
| L | 4 | ukendt |
| M | 0 | ukendt |
| N | 1 | ukendt |
| O | 0 | ukendt |
| P | 4 | ukendt |
| Q | 0 | ukendt |
| R | 3 | ukendt |
| S | 12 | ukendt |
| T | 4 | ukendt |
| U | 0 | ukendt |
| V | 18 | ukendt |
| Ø | 2 | ukendt |

A–V-tekster fortolkes ikke ud fra frekvens alene. G-betydningen er oplyst af Christoffer; markørens betydning i de øvrige rækker er ukendt.

## 3. Udledning og sikkerhed

| Metode | Kampe |
|---|---:|
| holdresultat | 878 |
| holdresultat ikke entydigt | 69 |
| ikke fremmødt, deltagerside ikke entydig | 9 |
| holdresultat (G, delvist scoret) | 11 |

Klasse: **889 udledt**, **78 uafklaret**.

| Sikkerhed | Kampe |
|---|---:|
| entydig | 889 |
| uafklaret | 78 |

Metoden og forklaringen står pr. kamp i CSV. Entydighed fra holdresultat gælder kun når den resterende hjemme- og udekvote præcist fordeler alle ukendte. Mellemtal bliver uafklaret.

- Holdkampe med eksplicit “Ikke fremmødt”: 117; walkover_winner_raw stemmer med holdresultat i **110**, afviger i **0**, uafklaret **7**. Ukendte individuelle kampe under denne tekst: 155. Individuel manglende holdkortside vises kun når præcis én side har deltagere; tomme deltagerlister på begge sider giver ukendt side.
- G med delvist spillet score kan ikke alene vise hvem der trak sig. Holdresultatet kan udlede en vinder, hvis den samlede restkvote er entydig; ellers står udfaldet som uafklaret.

## 4. Forslag til import og visning

Gem kildens rå markør, score og holdresultat uændret. Gem udledt vinder med metode og evidens som et afledt felt, aldrig som om kilden havde leveret vinderen. En walkover uden spillet score kan tælle som sejr/tab i kampresultat og eventuelt i vinderprocent, hvis holdreglen er entydig; vis den separat fra normalt spillede kampe. Ved delvist spillet kamp bør win/loss kun tælle, når vinder er entydigt udledt, jf. metodefeltet. Hvis der mangler evidens, medregnes kampen som “ukendt” og ikke i vinderprocenten. Point/ratings bør ikke beregnes for walkover uden faktisk spillet score; ved delvist spillet kamp er pointreglen ukendt og kræver særskilt beslutning.

## 5. Konsekvens for kort 177

**112 af 116** kampe i 2025/26 blev udledt; 4 er fortsat uafklarede. Sammenlignet for rå%, Bayes, Wilson, minimum og ELO efter 177s datavalg (GSB-spilleroptrædener, eksplicit “Ikke fremmødt” udeladt):

| Min. kampe | Metode | Spillere før | Spillere efter | Spillere med rangskift >5 |
|---:|---|---:|---:|---:|
| 5 | raw | 231 | 231 | 0 |
| 5 | bayes | 231 | 231 | 0 |
| 5 | wilson | 231 | 231 | 0 |
| 5 | minimum | 96 | 96 | 0 |
| 5 | elo | 231 | 231 | 0 |
| 10 | raw | 186 | 186 | 0 |
| 10 | bayes | 186 | 186 | 0 |
| 10 | wilson | 186 | 186 | 0 |
| 10 | minimum | 96 | 96 | 0 |
| 10 | elo | 186 | 186 | 0 |
| 20 | raw | 96 | 96 | 0 |
| 20 | bayes | 96 | 96 | 0 |
| 20 | wilson | 96 | 96 | 0 |
| 20 | minimum | 96 | 96 | 0 |
| 20 | elo | 96 | 96 | 0 |

Rangskift >5 på tværs af tre minimumskrav og fem metoder: **0 spiller- og tærskelkombinationer**. Alle fem 177-metoder er genberegnet på de samme rangeringskohorter før og efter; sammenligningen omfatter spillere, der rangerer i begge udgaver.

## Vurdering

Reglerne er sikre nok til at gemme som et særskilt, sporbar afledt udfald, når holdresultatet entydigt bestemmer siden. De er ikke tilstrækkeligt grundlag for at omskrive rå databasevindere uden særskilt importbeslutning. Markørbetydning som bør bekræftes: **P, K, C, (2), H, S, L, F, D, A, R, T, B, (1), V, N, Ø, I, E, J, M, O, Q, U** (hver betydning er ukendt).
