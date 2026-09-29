# Opgave 122 — S4/D2-rest afklaring

## Metode og deduplikering

Analysen bruger kun råtabeller i liga-landskab.db. Den fysiske puljenøgle er (season_id, age_group_id, league_group_id); regioner gentages i separate visninger og indgår ikke i nøglen. Ungdomsfilteret er age_group_id IN (2, 3, 4, 5, 6, 7, 18), mens UNG (21) er udeladt.

| Optælling | Antal |
|---|---:|
| Puljer med mindst én match_category-række | 6765 |
| S4/D2-puljer (4 S-koder + 2 D-koder) | 5093 |
| S4/D2 med kendt 046/112-formatord | 4318 |
| S4/D2 uden kendt formatord (rest) | 775 |
| 112-katalogets region-forekomster (kun sammenligning) | 59127 |

S4/D2 er identificeret fra de seks distinkte råkoder `1.–4. S` og `1.–2. D` i match_categories. Den deduplikerede rest er derfor 775 puljer, ikke 1.411 region-forekomster; 1.411 kan ikke genskabes som fysisk-puljetal fra den rå population uden en anden optællingsdefinition.

## Kontrol først: kendt “4 spillere”-tekst

Stikprøven indeholder 30 spredte puljer; 30 havde spillerrelationer i national-spillere.db (468 relationer). Kønsstatus blandt distinkte spiller-ID’er: {"kvinde":25,"mand":74,"ikke afklaret":154}. Kontrollen viser en overvægt af mand-status blandt de afklarede spillere, men mange står som ikke afklaret, fordi rå S/D-koder ikke bærer køn.

## S4/D2-restens stikprøve

Stikprøven indeholder 60 spredte restpuljer; 55 havde national spillerdata (849 relationer). Kønsstatus blandt distinkte spiller-ID’er: {"mand":142,"kvinde":69,"ikke afklaret":253}.

| Sæson | Alder | Pulje | Eksempelkamp | Antal kampe i puljen | Tekst | Distinkte spillere | Kønsstatus |
|---:|---:|---|---|---:|---|---:|---|
| 2011 | 2 | 619 | 35210 | 21 | U9 / Pulje 2 / BADNDRJ U09 2011/2012 | 0 | {} |
| 2011 | 4 | 1248 | 48391 | 1 | U13C (4m/k) finale / Finale / BADSJ U13 2011/2012 | 8 | {"mand":4,"kvinde":4} |
| 2011 | 4 | 479 | 29487 | 21 | U13D / Pulje 5 / BADNDRJ U13 2011/2012 | 0 | {} |
| 2011 | 5 | 203 | 10524 | 30 | C (4m/k) / Pulje 4 / BADSJ U15 2011/2012 | 4 | {"mand":2,"ikke afklaret":2} |
| 2011 | 5 | 678 | 37872 | 12 | U15B/C4 / Pulje 2 / BADMIDJ U15 2011/2012 | 8 | {"mand":4,"ikke afklaret":3,"kvinde":1} |
| 2012 | 3 | 1589 | 61080 | 30 | U11 B-række (4 m/k, valgfrit køn) / Pulje 1 / BADSJ U11 2012/2013 | 7 | {"ikke afklaret":4,"mand":2,"kvinde":1} |
| 2012 | 3 | 2462 | 91296 | 1 | Semifinale U11B 4m/k / Semifinale / BADSJ U11 2012/2013 | 8 | {"ikke afklaret":2,"mand":6} |
| 2012 | 4 | 1683 | 69646 | 10 | U13 / Pulje 1 / BADBORN U13 2012/2013 | 0 | {} |
| 2012 | 4 | 2473 | 91307 | 1 | Semi- og Finaler - 4 m/k og 4 dr hold - A, B, C, D / Finale - U13B 4m/k / BADSJ U13 2012/2013 | 8 | {"kvinde":6,"mand":2} |
| 2012 | 5 | 1943 | 81406 | 20 | U15C / U15C / BADFYN U15 2012/2013 | 8 | {"ikke afklaret":4,"mand":2,"kvinde":2} |
| 2012 | 6 | 1898 | 80407 | 12 | U17B / Pulje 1 / BADNDRJ U17 2012/2013 | 7 | {"ikke afklaret":3,"mand":3,"kvinde":1} |
| 2013 | 3 | 3005 | 114413 | 30 | U11D 4 m/k / Pulje 2 / BADSJ U11 2013/2014 | 6 | {"mand":2,"ikke afklaret":3,"kvinde":1} |
| 2013 | 3 | 3395 | 128191 | 30 | U11 D 4-8 spillere / Jammerbugt / BADNDRJ U11 2013/2014 | 8 | {"ikke afklaret":8} |
| 2013 | 4 | 3143 | 127595 | 12 | U13 B 4-8 spillere / Pulje 1 / BADNDRJ U13 2013/2014 | 8 | {"ikke afklaret":5,"mand":3} |
| 2013 | 4 | 3397 | 128260 | 20 | U13 D 4-8 spillere / Pulje 6 Jammerbugt / BADNDRJ U13 2013/2014 | 13 | {"ikke afklaret":9,"kvinde":3,"mand":1} |
| 2013 | 5 | 3016 | 114709 | 30 | U15 D 4 m/k / Pulje 1 / BADSJ U15 2013/2014 | 4 | {"ikke afklaret":4} |
| 2013 | 5 | 3389 | 127996 | 20 | U15 D 4-8 spillere / Pulje 1 / BADNDRJ U15 2013/2014 | 0 | {} |
| 2013 | 6 | 3189 | 120247 | 12 | U17 C 4-8 spillere / Pulje 1 / BADLF U17 2013/2014 | 8 | {"mand":6,"ikke afklaret":2} |
| 2013 | 6 | 4001 | 138403 | 6 | LM U17 ELITE/MESTER 4 SP. / Pulje 1 / DGI-&#216;ST U17 2013/2014 | 8 | {"mand":8} |
| 2013 | 6 | 4172 | 140620 | 1 | LM EFTSK. SLUTSPIL 4 SP. C / 3. - 4. plads 4 SP. C / DGI-&#216;ST U17 2013/2014 | 9 | {"ikke afklaret":8,"mand":1} |
| 2014 | 3 | 4691 | 167446 | 30 | U11 D 4-8 spillere / Pulje 2 / BADSJ U11 2014/2015 | 8 | {"ikke afklaret":8} |
| 2014 | 3 | 5491 | 189687 | 1 | U11D Finale Fynsmester / Pulje 1 / DGI-FYN U11 2014/2015 | 10 | {"mand":3,"ikke afklaret":7} |
| 2014 | 4 | 4799 | 171526 | 30 | U13 C 4-8 spillere / Pulje 1 / BADLF U13 2014/2015 | 8 | {"mand":3,"ikke afklaret":5} |
| 2014 | 4 | 5177 | 185000 | 20 | U13B ombrydning / Pulje 1 / DGI-SY&#216; U13 2014/2015 | 8 | {"ikke afklaret":6,"mand":1,"kvinde":1} |
| 2014 | 5 | 4542 | 159532 | 21 | U15M / Pulje 1 / BADBORN U15 2014/2015 | 7 | {"ikke afklaret":4,"mand":3} |
| 2014 | 5 | 4893 | 173255 | 30 | U15 C 4-8 spillere / Pulje 1 / DGI-NOR U15 2014/2015 | 8 | {"ikke afklaret":5,"kvinde":3} |
| 2014 | 5 | 5811 | 191090 | 1 | U15 D 4-8 spillere / Finalekamp U15D 4-8sp / BADSJ U15 2014/2015 | 8 | {"kvinde":4,"ikke afklaret":3,"mand":1} |
| 2014 | 6 | 5037 | 179461 | 30 | U17-19 B 4-8 spillere / Pulje 1 / BADMIDJ U17 2014/2015 | 8 | {"mand":6,"kvinde":2} |
| 2014 | 6 | 5871 | 191425 | 6 | DM EFTERSKOLER 4 SP. A / 4 SP. A / DGI U17 2014/2015 | 8 | {"kvinde":2,"mand":5,"ikke afklaret":1} |
| 2015 | 3 | 7172 | 233987 | 2 | U11D Semifinaler / Semifinaler / DGI-FYN U11 2015/2016 | 10 | {"mand":2,"ikke afklaret":7,"kvinde":1} |
| 2015 | 4 | 6331 | 211177 | 12 | U13 / Pulje 1 / BADBORN U13 2015/2016 | 0 | {} |
| 2015 | 4 | 7221 | 234491 | 2 | Nordjysk holdmesterskab U13B / Pulje 1 / DGI-NOR U13 2015/2016 | 10 | {"mand":5,"ikke afklaret":4,"kvinde":1} |
| 2015 | 5 | 6095 | 196725 | 28 | U15 B Række 4 / Pulje 1 / BADKBH U15 2015/2016 | 8 | {"kvinde":3,"mand":3,"ikke afklaret":2} |
| 2015 | 5 | 7225 | 234501 | 2 | Nordjysk holdmesterskab U15C / Pulje 1 / DGI-NOR U15 2015/2016 | 9 | {"kvinde":1,"mand":2,"ikke afklaret":6} |
| 2016 | 2 | 8781 | 277805 | 3 | Holdturneringsdage for begyndere U9-Herlev / Pulje 1 / DGI-MVS U09 2016/2017 | 9 | {"ikke afklaret":6,"mand":1,"kvinde":2} |
| 2016 | 4 | 7690 | 239620 | 20 | U13 A (4) / Pulje 1 / BADKBH U13 2016/2017 | 8 | {"mand":6,"kvinde":1,"ikke afklaret":1} |
| 2016 | 5 | 7681 | 239124 | 45 | U15 D (4) / Pulje 1 / BADKBH U15 2016/2017 | 7 | {"mand":1,"ikke afklaret":6} |
| 2017 | 3 | 9292 | 282801 | 28 | U11 B (4) / Pulje 1 / BADKBH U11 2017/2018 | 8 | {"ikke afklaret":2,"mand":3,"kvinde":3} |
| 2017 | 5 | 10425 | 318932 | 11 | Slutkampe SM for hold U15 / Slutkampe SM for hold / BADSJ U15 2017/2018 | 9 | {"mand":9} |
| 2018 | 2 | 12135 | 360484 | 6 | DMU Hold U9 D 4 Sp. / Pulje 2 / DGI U09 2018/2019 | 9 | {"kvinde":3,"mand":2,"ikke afklaret":4} |
| 2018 | 3 | 12202 | 361362 | 10 | DMU Hold U11 D 4 Sp. / Pulje 1 / DGI U11 2018/2019 | 8 | {"kvinde":2,"mand":4,"ikke afklaret":2} |
| 2018 | 3 | 12282 | 361157 | 6 | DMU Hold U11 C 4 Sp. / Pulje 2 / DGI U11 2018/2019 | 9 | {"mand":1,"ikke afklaret":8} |
| 2018 | 4 | 12154 | 361079 | 6 | DMU Hold U13 CD 4 Sp. / Pulje 1 / DGI U13 2018/2019 | 9 | {"ikke afklaret":6,"mand":3} |
| 2018 | 4 | 12246 | 361078 | 1 | DMU Hold U13 C 4 Sp. / Bronzekamp 3. - 4. plads / DGI U13 2018/2019 | 8 | {"mand":3,"ikke afklaret":5} |
| 2018 | 4 | 12315 | 362633 | 2 | DMU Hold U13 D 4 Sp. / 5. - 7. plads / DGI U13 2018/2019 | 9 | {"kvinde":5,"ikke afklaret":4} |
| 2018 | 5 | 12266 | 362290 | 3 | DMU Hold U15 C 4 Sp. (NY PLAN) / Pulje 4 / DGI U15 2018/2019 | 9 | {"kvinde":3,"ikke afklaret":6} |
| 2018 | 5 | 12334 | 361937 | 3 | DMU Hold U15 CD 4 Sp. / Pulje 4 / DGI U15 2018/2019 | 10 | {"kvinde":1,"ikke afklaret":7,"mand":2} |
| 2018 | 5 | 12358 | 362313 | 5 | DMU Hold U15 C 4 Sp. (NY PLAN) / Kvartfinaler (3'ere i puljen) / DGI U15 2018/2019 | 9 | {"ikke afklaret":3,"mand":3,"kvinde":3} |
| 2018 | 18 | 11829 | 355319 | 6 | &#216;M 4 C (4 SP.) / Pulje 1 / DGI-&#216;ST U17/U19 2018/2019 | 8 | {"ikke afklaret":8} |
| 2018 | 18 | 12178 | 360633 | 4 | DMU Hold U17/19 B 4 Sp. / Finale slutspil / DGI U17/U19 2018/2019 | 10 | {"mand":10} |
| 2018 | 18 | 12289 | 361293 | 10 | DMU Hold U17/19 CD/D 4 Sp. / Pulje 2 / DGI U17/U19 2018/2019 | 9 | {"kvinde":2,"mand":3,"ikke afklaret":4} |
| 2021 | 4 | 14436 | 422687 | 8 | U13 - Begynderholdturnering / Pulje 1 / DGI-NOR U13 2021/2022 | 9 | {"ikke afklaret":7,"mand":2} |
| 2021 | 18 | 14767 | 424769 | 3 | Efterskolemesterskaber 4 Sp. D (5.600) / Pulje 2 / DGI U17/U19 2021/2022 | 9 | {"ikke afklaret":6,"mand":3} |
| 2022 | 3 | 15387 | 441678 | 3 | U11 - Begynderholdturnering (Dec) / Pulje 1 / DGI-NOR U11 2022/2023 | 10 | {"ikke afklaret":5,"kvinde":5} |
| 2023 | 3 | 16365 | 461426 | 3 | U11 - Begynderholdturnering - December / Pulje 1 / DGI-NOR U11 2023/2024 | 9 | {"ikke afklaret":9} |
| 2024 | 3 | 17490 | 483474 | 3 | U11 - Begynderholdturnering - 9. marts / Pulje 2 / DGI-NOR U11 2024/2025 | 10 | {"ikke afklaret":10} |
| 2024 | 18 | 17866 | 484829 | 3 | EFTERSKOLEMESTERSKAB 4 SP.-D / Pulje 3 / DGI U17/U19 2024/2025 | 10 | {"ikke afklaret":10} |
| 2025 | 3 | 18521 | 505528 | 6 | U11 - Begynderholdturnering - Februar / Pulje 1 / DGI-NOR U11 2025/2026 | 9 | {"ikke afklaret":9} |
| 2025 | 18 | 18814 | 507061 | 3 | EFTERSKOLEMESTERSKAB 4C Spillere / Pulje 2 / DGI U17/U19 2025/2026 | 9 | {"ikke afklaret":8,"kvinde":1} |
| 2025 | 18 | 18853 | 507552 | 4 | EFTERSKOLEMESTERSKAB 4B Spillere / Finaleslutspil (1. - 4. plads) / DGI U17/U19 2025/2026 | 9 | {"kvinde":1,"mand":6,"ikke afklaret":2} |

## Databegrænsning og konklusion

I national-spillere.db er `player_matches.team_side` NULL i stikprøven, og partner-/modstanderfelterne er også NULL. Derfor kan spillerne ikke fordeles på hjemmehold/udehold uden at gætte. Resultatet er samlet pr. kamp under ukendt side, som rådata faktisk tillader.

De afklarede kønsstatusser i restens stikprøve er 142 mand og 69 kvinde (253 ikke afklarede); kontrolstikprøven er 74 mand og 25 kvinde (154 ikke afklarede). Det er ikke evidens for rene pigehold, men det er heller ikke tilstrækkeligt til at bevise, at resten er ægte “4 spillere”, fordi holdtilhørsforhold og køn for mange spillere mangler. S4/D2-resten forbliver derfor en selvstændig, uafklaret kategori.

Den maskinlæsbare rapport med alle 60 rest- og 30 kontroludvalg ligger i `122-s4d2-rest-afklaring.json`.

