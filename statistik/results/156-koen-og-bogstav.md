# 156 tillæg — damer mod herrer: pointskala og bogstav

Kilde: `rangliste-point.db`, komplette lister for 2026-10-07 (288/289/292 × M/K, 3.227–13.600 rækker pr. liste) og back-testens datasæt. Ingen nye kald. Kørt af Claude. Kun spillere med rækkebogstav (i praksis seniorer) indgår i skalaerne.

## 1. Bogstav og point (medianpoint pr. bogstav, singler 288; 289 og 292 ligner)
| Bogstav | Herrer | Damer | Forskel |
|---|---:|---:|---:|
| SEN E | 4.645 | 3.568 | 1.077 |
| SEN M | 3.352 | 2.810 | 542 |
| SEN M-A | 3.184 | 2.618 | 566 |
| SEN A | 2.842 | 2.377 | 465 |
| SEN B | 2.258 | 1.998 | 260 |
| SEN C | 1.896 | 1.604 | 292 |
| SEN D | 1.526 | 1.259 | 268 |

Samme bogstav ligger altså 250–550 point lavere hos damerne (ca. 1.100 ved E). Bogstavet følger spillerens eget køn, ikke en fælles skala. Det bekræfter Christoffers note. Liste-medianer og maksimum: 288 herrer 1.327/4.975, damer 1.255/3.714.

## 2. Bogstav er ikke en ren pointgrænse
Intervallerne overlapper hos begge køn (fx herresingle SEN M-A 2.815–3.488, SEN A 1.922–3.314). Det samme gælder rang. Bogstavet er derfor ikke en fast pointgrænse; det kan hænge sammen med tidligere placering, op- og nedrykning eller andre regler. Uafklaret.

## 3. Betyder det noget for forventet vinder?
Back-test på de 153 ungdomskampe, hvor siderne er blandet køn (87 singler, 66 doubler):
| Tillæg til pigernes point | Single, hitrate / log-loss | Double, hitrate / log-loss |
|---:|---|---|
| −100 | 60,9 % / 0,782 | 56,1 % / 0,820 |
| **0** | **68,6 % / 0,571** | **60,6 % / 0,667** |
| +100 | 59,8 % / 0,724 | 59,1 % / 0,703 |

Bedst uden justering. En omregning af damernes point til herreskala ud fra seniorernes bogstavmedianer **forværrede** resultatet (alle kampe 73,9 % → 71,4 %; single 75,5 % → 71,7 %). For ungdom bruger vi derfor rå point på tværs af køn. Seniorskalaen må ikke overføres til ungdom. Prøven er lille (153).

## 4. Opfølgning
- Hent liste 287 kun med damer og kun med herrer (ufiltreret på alder/klub, `gender`-filter) og sammenlign placering, bogstav og andel pr. bogstav. Det kræver nye kald og er ikke gjort.
- Til kort 157: test kandidatformler for tilmeldingsniveau hver for sig for damer og herrer.
