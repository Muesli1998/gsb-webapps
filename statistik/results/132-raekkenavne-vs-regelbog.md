# Opgave 132 — rækkenavne mod regelbogen

Rågrundlag: 46450 fysiske gruppe-region-links i 1858 sæson/region/aldersgruppe-scopes. Forklaring er operationelt defineret som en rækkenavnstolkning i 136 plus en regelbogspost med status bekræftet eller betinget. Niveauer udledes ikke af pointtal.

| Regelbogsstatus | Navn/scope-forekomster | Forklaret | Uforklaret | Fysiske links |
|---|---:|---:|---:|---:|
| bekraeftet | 525 | 277 | 248 | 770 |
| betinget | 449 | 164 | 285 | 612 |
| ingen | 2653 | 0 | 2653 | 7538 |
| ingen_match_i_regelbog | 13513 | 0 | 13513 | 37530 |

Forklaringer med betinget regelbog: 164; heraf svage (afstand ≥3): 63.

## Stikprøve på 20 rækkenavne (5 pr. regelbogsstatus)

De fem `ingen`-poster har ingen tilknyttet PDF og kan derfor ikke kontrolleres mod ordlyd. For de fem områder uden match i 131-regelbogen er den nationale fælles ungdoms-PDF tjekket som tekstgrundlag, men området er fortsat umatchet; dette tælles ikke som regional regelbogsdækning. De bekræftede/betingede stikprøver er kontrolleret mod den nationale ungdoms-PDF for holdtype-/rækketerminologi, mens områdets status og afstand forbliver fra 131.

| # | Sæson | Område | Alder | Rækkenavn | Status/afstand | PDF-kontrol |
|---:|---|---|---|---|---|---|
| 1 | 2024/25 | Badminton København | U09 | U9 D 2800 (4 spillere). | bekraeftet / 0 | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 2 | 2024/25 | Badminton København | U09 | U9 C-D 3200 (4 spillere). | bekraeftet / 0 | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 3 | 2024/25 | Badminton København | U11 | U11 D 2800 (4 piger). | bekraeftet / 0 | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 4 | 2024/25 | Badminton København | U11 | U11 D 3200 (4 spillere). | bekraeftet / 0 | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 5 | 2024/25 | Badminton København | U11 | U11 (4+2) | bekraeftet / 0 | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 6 | 2016/17 | Badminton København | U11 | U11 (4+3) | betinget / 1 | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 7 | 2016/17 | Badminton København | U11 | U11 A (4) | betinget / 1 | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 8 | 2016/17 | Badminton København | U11 | U11 B (4) | betinget / 1 | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 9 | 2016/17 | Badminton København | U11 | U11 C (4) | betinget / 1 | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 10 | 2016/17 | Badminton København | U11 | U11 D (4) P1 | betinget / 1 | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 11 | 2011/12 | Badminton Nordjylland | U09 | U9 | ingen / — | ingen PDF |
| 12 | 2011/12 | Badminton Nordjylland | U11 | U11D | ingen / — | ingen PDF |
| 13 | 2011/12 | Badminton Nordjylland | U11 | U11B | ingen / — | ingen PDF |
| 14 | 2011/12 | Badminton Nordjylland | U11 | U11C | ingen / — | ingen PDF |
| 15 | 2011/12 | Badminton Nordjylland | U11 | U11A | ingen / — | ingen PDF |
| 16 | 2024/25 | DGI | U09 | DMU Hold U9D (2800) 4 Spillere | ingen_match_i_regelbog / — | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 17 | 2024/25 | DGI | U09 | DMU Hold U9C-D (3200) 4 Spillere | ingen_match_i_regelbog / — | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 18 | 2024/25 | DGI | U11 | DMU Hold U11D (3200) 4 Spillere | ingen_match_i_regelbog / — | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 19 | 2024/25 | DGI | U11 | DMU Hold U11C (4000) 4 Spillere | ingen_match_i_regelbog / — | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |
| 20 | 2024/25 | DGI | U11 | DMU Hold U11C-D (3400) 4 Spillere | ingen_match_i_regelbog / — | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 5–6 |

## Metode og vigtig afgrænsning

An entry with status ingen has no applicable PDF; therefore PDF-wording sampling cannot be performed for that status. Parser recognition is not a claim that every raw row name occurs verbatim in the regulation.

## Største uforklarede rå rækkenavne pr. regelbogsstatus

### bekraeftet

| Sæson | Område | Alder | Rækkenavn | Poster | Afstand |
|---|---|---|---|---:|---:|
| 2019/20 | Badminton København | UNG | Kredsmatch BADSJ&#198; - BADKBH | 4 | 0 |
| 2020/21 | Badminton København | U13 | U13 3400 4 Spillere | 4 | 0 |
| 2020/21 | Badminton København | UNG | U13 3400 4 Spillere | 4 | 0 |
| 2026/27 | Badminton København | U13 | UGE 38 - U13 B, 5200 (2+2) | 4 | 0 |
| 2026/27 | Badminton København | UNG | UGE 38 - U13 B, 5200 (2+2) | 4 | 0 |
| 2019/20 | Badminton København | U11 | U11 - 3000 - 4 spillere | 3 | 0 |
| 2019/20 | Badminton København | UNG | U11 - 3000 - 4 spillere | 3 | 0 |
| 2020/21 | Badminton København | U11 | U11 3000 4 Spillere | 3 | 0 |
| 2020/21 | Badminton København | UNG | U11 3000 4 Spillere | 3 | 0 |
| 2020/21 | Badminton København | U17/U19 | U17/U19 - 5200 - 4 spillere | 3 | 0 |
| 2020/21 | Badminton København | UNG | U17/U19 - 5200 - 4 spillere | 3 | 0 |
| 2026/27 | Badminton København | U15 | UGE 38 - U15 A, 6800 (2+2) | 3 | 0 |
| 2026/27 | Badminton København | UNG | UGE 38 - U15 A, 6800 (2+2) | 3 | 0 |
| 2026/27 | Badminton København | U17/U19 | UGE 38 - U17/U19 B, 6800 (2+2) | 3 | 0 |
| 2026/27 | Badminton København | UNG | UGE 38 - U17/U19 B, 6800 (2+2) | 3 | 0 |
| 2026/27 | Badminton København | U17/U19 | UGE 38 - U17/U19 C, 5800 (2+2) | 3 | 0 |
| 2026/27 | Badminton København | UNG | UGE 38 - U17/U19 C, 5800 (2+2) | 3 | 0 |
| 2024/25 | Badminton København | U17/U19 | D, 4800 (2+2) | 2 | 0 |
| 2024/25 | Badminton København | UNG | D, 4800 (2+2) | 2 | 0 |
| 2024/25 | Badminton København | U17/U19 | M, 15000 (4+2) | 2 | 0 |
| 2024/25 | Badminton København | UNG | M, 15000 (4+2) | 2 | 0 |
| 2025/26 | Badminton København | U11 | U11 4200 (4 piger) BD | 2 | 0 |
| 2025/26 | Badminton København | UNG | U11 4200 (4 piger) BD | 2 | 0 |
| 2019/20 | Badminton København | U13 | U13 - 3400 - 4 spillere | 2 | 0 |
| 2019/20 | Badminton København | UNG | U13 - 3400 - 4 spillere | 2 | 0 |
| 2019/20 | Badminton København | U13 | U13 - 3800 - 4 spillere | 2 | 0 |
| 2019/20 | Badminton København | UNG | U13 - 3800 - 4 spillere | 2 | 0 |
| 2019/20 | Badminton København | U13 | U13 - 6200 - 4 spillere | 2 | 0 |
| 2019/20 | Badminton København | UNG | U13 - 6200 - 4 spillere | 2 | 0 |
| 2024/25 | Badminton København | U13 | U13 (4+3) | 2 | 0 |

### betinget

| Sæson | Område | Alder | Rækkenavn | Poster | Afstand |
|---|---|---|---|---:|---:|
| 2021/22 | Badminton København | U11 | U11 3100 4 Spillere | 3 | 1 |
| 2021/22 | Badminton København | UNG | U11 3100 4 Spillere | 3 | 1 |
| 2021/22 | Badminton København | U11 | U11 Nye spillere - 3100 (4 spillere) | 3 | 1 |
| 2021/22 | Badminton København | UNG | U11 Nye spillere - 3100 (4 spillere) | 3 | 1 |
| 2023/24 | Badminton København | U13 | U13 - 4400 (4 spillere) | 3 | 3 |
| 2023/24 | Badminton København | UNG | U13 - 4400 (4 spillere) | 3 | 3 |
| 2021/22 | Badminton København | U13 | U13 3500 4 Spillere | 3 | 1 |
| 2021/22 | Badminton København | UNG | U13 3500 4 Spillere | 3 | 1 |
| 2023/24 | Badminton København | U15 | U15 - 5600 (4 spillere) | 3 | 3 |
| 2023/24 | Badminton København | UNG | U15 - 5600 (4 spillere) | 3 | 3 |
| 2021/22 | Badminton København | U17/U19 | U17/U19 - 5600 (4 spillere) | 3 | 1 |
| 2021/22 | Badminton København | UNG | U17/U19 - 5600 (4 spillere) | 3 | 1 |
| 2023/24 | Badminton København | U17/U19 | U17/U19 - 5600 (4 spillere) | 3 | 3 |
| 2023/24 | Badminton København | UNG | U17/U19 - 5600 (4 spillere) | 3 | 3 |
| 2022/23 | Badminton København | U17/U19 | U17/U19 - 6000 (4 spillere) | 3 | 2 |
| 2022/23 | Badminton København | UNG | U17/U19 - 6000 (4 spillere) | 3 | 2 |
| 2023/24 | Badminton København | U17/U19 | U17/U19 - 7800 (2+2) | 3 | 3 |
| 2023/24 | Badminton København | UNG | U17/U19 - 7800 (2+2) | 3 | 3 |
| 2017/18 | Badminton København | UNG | Holdturneringsdage for begyndere Hillerød 18/3-18 | 2 | 2 |
| 2016/17 | Badminton København | U11 | Holdturneringsdage for begyndere U11-Herlev | 2 | 1 |
| 2016/17 | Badminton København | UNG | Holdturneringsdage for begyndere U11-Herlev | 2 | 1 |
| 2022/23 | Badminton København | U11 | U11 - 2+2 | 2 | 2 |
| 2022/23 | Badminton København | UNG | U11 - 2+2 | 2 | 2 |
| 2023/24 | Badminton København | U11 | U11 - 2900 4 spillere | 2 | 3 |
| 2023/24 | Badminton København | UNG | U11 - 2900 4 spillere | 2 | 3 |
| 2023/24 | Badminton København | U11 | U11 - 3200 4 spillere | 2 | 3 |
| 2023/24 | Badminton København | UNG | U11 - 3200 4 spillere | 2 | 3 |
| 2023/24 | Badminton København | U11 | U11 - 4400 4 spillere | 2 | 3 |
| 2023/24 | Badminton København | UNG | U11 - 4400 4 spillere | 2 | 3 |
| 2022/23 | Badminton København | U11 | U11 3000 4 Spillere | 2 | 2 |

### ingen

| Sæson | Område | Alder | Rækkenavn | Poster | Afstand |
|---|---|---|---|---:|---:|
| 2022/23 | Badminton Danmark | U13 | DMU H - U13 3400 4 spillere | 27 | — |
| 2022/23 | Badminton Danmark | UNG | DMU H - U13 3400 4 spillere | 27 | — |
| 2022/23 | Badminton Danmark | U13 | DMU H - U13 3800 4 spillere | 26 | — |
| 2022/23 | Badminton Danmark | UNG | DMU H - U13 3800 4 spillere | 26 | — |
| 2022/23 | Badminton Danmark | U13 | DMU H - U13 4400 4 spillere | 26 | — |
| 2022/23 | Badminton Danmark | UNG | DMU H - U13 4400 4 spillere | 26 | — |
| 2024/25 | Badminton Danmark | U15 | DMU Hold - U15D (4000) 4 Spillere | 26 | — |
| 2024/25 | Badminton Danmark | UNG | DMU Hold - U15D (4000) 4 Spillere | 26 | — |
| 2021/22 | Badminton Danmark | U15 | DMU H - U15 5600 - 4 spillere | 19 | — |
| 2021/22 | Badminton Danmark | UNG | DMU H - U15 5600 - 4 spillere | 19 | — |
| 2023/24 | Badminton Danmark | U15 | DMU H - U15 4200 (4 spillere) | 17 | — |
| 2023/24 | Badminton Danmark | UNG | DMU H - U15 4200 (4 spillere) | 17 | — |
| 2016/17 | Badminton Danmark | U13 | DMU-Hold U13 D 4 Spillere | 17 | — |
| 2016/17 | Badminton Danmark | UNG | DMU-Hold U13 D 4 Spillere | 17 | — |
| 2023/24 | Badminton Danmark | U11 | DMU H - U11 2900 (4 spillere) | 16 | — |
| 2023/24 | Badminton Danmark | UNG | DMU H - U11 2900 (4 spillere) | 16 | — |
| 2023/24 | Badminton Danmark | U11 | DMU H - U11 3200 (4 spillere) | 16 | — |
| 2023/24 | Badminton Danmark | UNG | DMU H - U11 3200 (4 spillere) | 16 | — |
| 2023/24 | Badminton Danmark | U15 | DMU H - U15 4800 (4 spillere) | 16 | — |
| 2023/24 | Badminton Danmark | UNG | DMU H - U15 4800 (4 spillere) | 16 | — |
| 2025/26 | Badminton Danmark | U11 | DMU Hold - U11D (4600) - 4 Spillere | 16 | — |
| 2025/26 | Badminton Danmark | UNG | DMU Hold - U11D (4600) - 4 Spillere | 16 | — |
| 2025/26 | Badminton Danmark | U13 | DMU Hold U13D (4800) - 4 Spillere | 16 | — |
| 2025/26 | Badminton Danmark | UNG | DMU Hold U13D (4800) - 4 Spillere | 16 | — |
| 2015/16 | Badminton Danmark | U13 | U13 uDM 4+3 | 16 | — |
| 2015/16 | Badminton Danmark | UNG | U13 uDM 4+3 | 16 | — |
| 2015/16 | Badminton Danmark | U15 | U15 uDM hold 4+3 | 16 | — |
| 2015/16 | Badminton Danmark | UNG | U15 uDM hold 4+3 | 16 | — |
| 2017/18 | Badminton Danmark | UNG | DMU Hold B 4 Spillere | 15 | — |
| 2024/25 | Badminton Danmark | U11 | DMU Hold U11D (3200) 4 Spillere | 15 | — |

## Spørgsmål

- Kortets stikprøve kræver mindst fem rækkenavne pr. status tjekket mod PDF-ordlyd. Status `ingen` betyder at der ikke findes en tilknyttet PDF; ønsker Chris at fem eksempler pr. status erstattes af fem fraværs-/kildehulsprøver for `ingen`?

- Parserstatus viser, om navnet blev fortolket af 136; det beviser ikke, at det præcise lokale rækkenavn står i reglementet. Derfor er rapportens “forklaret” en afgrænset kombination af fortolkning og kildeanvendelighed, ikke en ordret dokumentmatch.

