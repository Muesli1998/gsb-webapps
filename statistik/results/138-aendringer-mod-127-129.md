# Opgave 138 — genkørsel af 127/129 med regelbog og parser

Grundlag: 127 fastholdt som baseline (279 GSB-poster); 136 parserresultat koblet række for række til 6766 fysiske ungdomsposter i age_group_id 2, 3, 4, 5, 6, 7, 18. 131-regelbogens 765 felter blev slået op med kanoniske områdenavne og aliaser. Pointskala-arv: ingen.

## Parserændringer mod 129/127

| Udfald | Fysiske poster |
|---|---:|
| allerede_fortolket_129 | 3178 |
| allerede_fortolket_niveau_136 | 16 |
| eneste_raekke_forslag4 | 61 |
| fortsat_uforklaret | 2922 |
| fortsat_uforklaret_forslag4 | 303 |
| nyfortolket_af_136 | 120 |
| separat_liste_136 | 123 |
| udeladt_uge38 | 43 |

Parseren markerer 5 fysisk post som “eneste række” trods navn med muligt eksplicit niveau (fx A/Elite). Dette er den kendte parserrisiko; parseren er ikke ændret. Fuldliste står i JSON: parser_136_scope.explicit_level_names_misclassified_as_singleton.

## Placering og bredde

127’s fastlagte formatplaceringer, GSB-placeringer og region-8-bredder er bevaret som baselinefelter i JSON. 136 tilføjer rækkenavnsfortolkning; den bliver ikke brugt til at udlede niveau fra pointtal eller til at ændre rangering, hvor 127’s manuelle format-/niveaukilde allerede er facit. UGE 38 er særskilt og udelukket som i 127.

GSB optælling fastholdt: 279 = 133+53+12+62+19.

## missing_rows fra 127

Bevarede og klassificerede 361 manglende region-8-rækker. Hver indgang står i JSON med parserstatus, disposition (nu tolket/stadig uforklaret/afvist) og København-regelbogsstatus.

## 25 manuelle kontroller

Alle 25 nedenstående fysiske league_groups-poster blev slået op på sæson/alder/league_group_id i read-only-databasen; deres rå rækkenavn blev sammenholdt med 136-resultatet. PDF-siderne blev visuelt kontrolleret for de angivne aldersgrupper, formater og relevante tabelrækker. Tallet i rækkenavnet blev ikke omsat til et bogstav. Regelbogsstatus/afstand er det kanoniske region-8-opslag; tekstkontrollen peger særskilt på den fælles ungdoms-PDF, som fastlægger holdtyperne.

| # | Sæson | Alder | Rå rækkenavn (ID) | 136-resultat | København regelbog | PDF-side(r) |
|---:|---|---|---|---|---|---|
| 1 | 2016/17 | U11 | U11 (4+3) (7687) | intet niveau nødvendigt (eneste række) / forslag-4 | betinget / 1 sæson(er) | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 2 | 2016/17 | U13 | U13 (4+3) (7689) | intet niveau nødvendigt (eneste række) / forslag-4 | betinget / 1 sæson(er) | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 3 | 2016/17 | U15 | U15 (4+3) (7676) | intet niveau nødvendigt (eneste række) / forslag-4 | betinget / 1 sæson(er) | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 4 | 2016/17 | U17 | U17 (4+3) (7682) | intet niveau nødvendigt (eneste række) / forslag-4 | betinget / 1 sæson(er) | manuelt/BD-DGI_ungdomsreglement_2016-17.pdf, s. 3–5 |
| 5 | 2018/19 | U11 | U11 4+2 (11239) | intet niveau nødvendigt (eneste række) / forslag-4 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 6 | 2018/19 | U11 | U11 CD 4 Spillere (11380) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 7 | 2018/19 | U11 | U11 CD 4 Piger (11385) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 8 | 2018/19 | U13 | U13 CD 4 Spillere (11418) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 9 | 2018/19 | U15 | U15 MA 4+2 (11242) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 10 | 2018/19 | U15 | U15 AB 4+2 (11243) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 11 | 2018/19 | U15 | U15 CD 4 Spillere (11424) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 12 | 2018/19 | U15 | U15 AB 4+2 (12063) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 13 | 2018/19 | U17/U19 | U17/19 MA 4+2 (11245) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 14 | 2018/19 | U17/U19 | U17/19 CD 4 Spillere (11347) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 15 | 2018/19 | U17/U19 | U17/19 MA 4+2 (12131) | tolket / forslag-2 | betinget / 3 sæson(er) | 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf, s. 3–5 |
| 16 | 2019/20 | U11 | U11 - 4+2 (12621) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2019/badminton-danmark-dgi-badminton/bd-youth-2019-20.pdf, s. 3–5 |
| 17 | 2019/20 | U13 | U13 - 4+3 (12622) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2019/badminton-danmark-dgi-badminton/bd-youth-2019-20.pdf, s. 3–5 |
| 18 | 2019/20 | U15 | U15 - 4+3 (12624) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2019/badminton-danmark-dgi-badminton/bd-youth-2019-20.pdf, s. 3–5 |
| 19 | 2019/20 | U17 | U17 - 4+3 (12625) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2019/badminton-danmark-dgi-badminton/bd-youth-2019-20.pdf, s. 3–5 |
| 20 | 2020/21 | U11 | U11 4+2 (13328) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2020/badminton-danmark-dgi-badminton/bd-youth-2020-21.pdf, s. 3–5 |
| 21 | 2020/21 | U13 | U13 - 4+3 (13329) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2020/badminton-danmark-dgi-badminton/bd-youth-2020-21.pdf, s. 3–5 |
| 22 | 2020/21 | U15 | U15 - 4+3 (13330) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2020/badminton-danmark-dgi-badminton/bd-youth-2020-21.pdf, s. 3–5 |
| 23 | 2020/21 | U17 | U17 - 4+3 (13332) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2020/badminton-danmark-dgi-badminton/bd-youth-2020-21.pdf, s. 3–5 |
| 24 | 2024/25 | U11 | U11 (4+2) (17000) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2024/badminton-danmark-dgi-badminton/bd-youth-2024-25.pdf, s. 4–6 |
| 25 | 2025/26 | U11 | U11 (4+2) (17983) | intet niveau nødvendigt (eneste række) / forslag-4 | bekraeftet / 0 sæson(er) | 2025/badminton-danmark-dgi-badminton/bd-youth-2025-26-original.pdf, s. 4–6 |

## Spørgsmål og begrænsninger

- Forslag 5 (X1–X3, Dx, BD) er ikke implementeret og forbliver ufortolket; 136’s status er bevaret.
- Enhver forklaring på kilde-/regelbogsniveau er status + afstand fra den konkrete sæson/område. Betingede afstande ≥3 er svage. Pointskalaer arves ikke.
- “Forklaret” i 132 er operationelt parsergenkendelse plus anvendelig regelbogspost. Det betyder ikke, at det præcise lokale rækkenavn står ordret i PDF’en.
- Den kendte 136-fejl med bare niveauord foran 4+3 er målt, men parseren er bevidst ikke rettet.

