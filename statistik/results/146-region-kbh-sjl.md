# Opgave 146 — København/Sjælland og GSB-bredde

## Konklusion

Første region-8-grupper, der også er tilknyttet en anden region, ses i **2014/2015** (først Badminton Danmark, region 1; kun U11). Første sæson med specifik København–Badminton Sjælland-tilknytning (region 8+10) er **2015/2016**, i 2 af 7 årgange. Det viser tilknytning i data, ikke nødvendigvis at turneringsformatet blev samlet netop dér. Bredde A stemmer med 145 for alle 69 kombinationer; A og B er forskellige i 28 kombinationer. Formatplaceringen fra GSB's egne hold er uændret i 69/69.

Fortolkning: en liga-group regnes som fælles, når dens `league_group_regions`-mængde indeholder region 8 og mindst én anden region. En række er samlet på `(sæson, årgang, division_name_raw)` over dens puljer. B kræver, at hele den samlede række kun er region 8; C tillader kun region 8 alene eller region 8 sammen med Sjælland, og tæller GSB-rækker. Dette er en operationel måling af datasættets regionstilknytninger, ikke dokumentation for turneringsregler.

## 1. Region-8 puljegrupper pr. sæson og årgang

| Sæson | Årgang | Kun region 8 | Region 8 + anden region | Andre regioner |
|---|---|---:|---:|---|
| 2011/2012 | U11 | 5 | 0 | — |
| 2011/2012 | U13 | 5 | 0 | — |
| 2011/2012 | U15 | 5 | 0 | — |
| 2011/2012 | U17 | 3 | 0 | — |
| 2012/2013 | U11 | 5 | 0 | — |
| 2012/2013 | U13 | 5 | 0 | — |
| 2012/2013 | U15 | 5 | 0 | — |
| 2012/2013 | U17 | 3 | 0 | — |
| 2013/2014 | U11 | 6 | 0 | — |
| 2013/2014 | U13 | 6 | 0 | — |
| 2013/2014 | U15 | 7 | 0 | — |
| 2013/2014 | U17 | 3 | 0 | — |
| 2014/2015 | U11 | 5 | 16 | Badminton Danmark (1) |
| 2014/2015 | U13 | 6 | 0 | — |
| 2014/2015 | U15 | 5 | 0 | — |
| 2014/2015 | U17 | 3 | 0 | — |
| 2015/2016 | U11 | 4 | 1 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Fyn (7), Badminton Sjælland (10) |
| 2015/2016 | U13 | 6 | 0 | — |
| 2015/2016 | U15 | 6 | 0 | — |
| 2015/2016 | U17 | 3 | 1 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2016/2017 | U11 | 7 | 3 | Badminton Midtjylland (4), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storkøbenhavn (24), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2016/2017 | U13 | 7 | 1 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storkøbenhavn (24), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2016/2017 | U15 | 6 | 0 | — |
| 2016/2017 | U17 | 5 | 0 | — |
| 2016/2017 | U17/U19 | 1 | 0 | — |
| 2017/2018 | U11 | 4 | 6 | Badminton Midtjylland (4), Badminton Fyn (7), Badminton Lolland-Falster (9), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storkøbenhavn (24), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2017/2018 | U13 | 6 | 6 | Badminton Lolland-Falster (9), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storkøbenhavn (24), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2017/2018 | U15 | 4 | 10 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2017/2018 | U17/U19 | 2 | 4 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2018/2019 | U11 | 6 | 5 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2018/2019 | U13 | 6 | 5 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2018/2019 | U15 | 5 | 10 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2018/2019 | U17/U19 | 2 | 6 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2019/2020 | U11 | 6 | 4 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2019/2020 | U13 | 6 | 6 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2019/2020 | U15 | 6 | 4 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2020/2021 | U09 | 1 | 0 | — |
| 2020/2021 | U11 | 4 | 5 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2020/2021 | U13 | 8 | 3 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2020/2021 | U15 | 5 | 8 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2021/2022 | U09 | 1 | 1 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2021/2022 | U11 | 4 | 8 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2021/2022 | U13 | 3 | 10 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2021/2022 | U15 | 6 | 7 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2022/2023 | U09 | 1 | 1 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2022/2023 | U11 | 5 | 6 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2022/2023 | U13 | 7 | 8 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2022/2023 | U15 | 7 | 11 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2022/2023 | U17/U19 | 2 | 10 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2023/2024 | U09 | 2 | 0 | — |
| 2023/2024 | U11 | 5 | 5 | Badminton Midtjylland (4), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2023/2024 | U13 | 6 | 11 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2023/2024 | U15 | 7 | 14 | Badminton Midtjylland (4), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2023/2024 | U17/U19 | 2 | 16 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2024/2025 | U09 | 3 | 0 | — |
| 2024/2025 | U11 | 5 | 6 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2024/2025 | U13 | 3 | 24 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Lolland-Falster (9), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2024/2025 | U15 | 4 | 19 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2024/2025 | U17/U19 | 0 | 21 | Badminton Lolland-Falster (9), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2025/2026 | U09 | 3 | 9 | Badminton Sjælland (10) |
| 2025/2026 | U11 | 7 | 7 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2025/2026 | U13 | 6 | 18 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Storstrømmen (25), DGI Midt- og Vestsjælland (31) |
| 2025/2026 | U15 | 4 | 29 | Badminton Midtjylland (4), Badminton Nordjylland (5), Badminton Sønderjylland (6), Badminton Fyn (7), Badminton Lolland-Falster (9), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2025/2026 | U17/U19 | 2 | 20 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2026/2027 | U09 | 1 | 2 | Badminton Sjælland (10) |
| 2026/2027 | U11 | 6 | 2 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2026/2027 | U13 | 6 | 13 | Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2026/2027 | U15 | 3 | 20 | Badminton Bornholm (3), Badminton Lolland-Falster (9), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |
| 2026/2027 | U17/U19 | 2 | 19 | Badminton Bornholm (3), Badminton Lolland-Falster (9), Badminton Sjælland (10), DGI Nordsjælland (19), DGI Midt- og Vestsjælland (31) |

Første region-8 + anden region: **2014/2015**; alle aldersgrupper samtidig? **nej**. Specifikt region 8 + Badminton Sjælland (region 10) starter i **2015/2016**; alle aldersgrupper samtidig? **nej**. Aldersgruppedækningerne står i de to first_* felter i JSON.

## 2. Regioner og klubber på fælles puljer

| Anden region | ID | Fælles league_group_regions-koblinger | Fælles divisionsrækker |
|---|---:|---:|---:|
| Badminton Sjælland | 10 | 453 | 318 |
| DGI Nordsjælland | 19 | 404 | 277 |
| DGI Midt- og Vestsjælland | 31 | 404 | 277 |
| DGI Storstrømmen | 25 | 158 | 116 |
| Badminton Midtjylland | 4 | 19 | 85 |
| Badminton Fyn | 7 | 19 | 42 |
| Badminton Lolland-Falster | 9 | 17 | 11 |
| Badminton Danmark | 1 | 16 | 3 |
| Badminton Nordjylland | 5 | 15 | 56 |
| Badminton Sønderjylland | 6 | 11 | 76 |
| DGI Storkøbenhavn | 24 | 6 | 5 |
| Badminton Bornholm | 3 | 5 | 3 |

Fælles puljer indeholder 2410 rå holdposter. 0 kan bekræftes med en hjemregion uden for København; 82 kan matches til club_registry-navn, men registry.region_id er NULL; 2226 poster har intet normaliseret club_registry-navnematch; 0 har tvetydigt hjemregionmatch; 102 er regionsnavne frem for klubnavne. club_registry har 796/796 rækker uden region_id, så udenfor-København-tal kan ikke fuldt afgøres fra den anførte kolonne. Navne uden entydigt match:

- Greve — 7 poster
- Hvidovre — 3 poster
- Dybbøl — 3 poster
- Højbjerg — 3 poster
- Solrød Strand — 17 poster
- Skovshoved — 6 poster
- Kolding BK — 3 poster
- Næsby — 3 poster
- Værløse — 10 poster
- Talent Team Nord — 3 poster
- KBK Kbh. — 3 poster
- Odense OBK — 3 poster
- Middelfart — 5 poster
- Amager ABC 1 — 1 poster
- Helsingør 1 — 7 poster
- Herlufsholm 1 — 5 poster
- Måløv 1 — 10 poster
- Viskinge 1 — 1 poster
- Humlebæk 1 — 24 poster
- &#216;lstykke 1 — 17 poster
- Fredensborg 1 — 10 poster
- Herlev/Hjorten 1 — 26 poster
- Greve 1 — 29 poster
- Vordingborg 1 — 1 poster
- Herlev/Hjorten 0 Vært — 1 poster
- Viby S 1 — 2 poster
- Sydstevns 1 — 1 poster
- Herlev/Hjorten Vært — 1 poster
- Kalundborg 1 — 2 poster
- Sydstevns 2 — 2 poster
- Hillerød 5 — 3 poster
- Vindinge 1 — 7 poster
- Lillerød-Farum — 1 poster
- Skovshoved 1 — 42 poster
- Solrød Strand 1 — 57 poster
- Lillerød-Farum 1 — 1 poster
- Lyngby 1 — 35 poster
- Taastrup Elite/Vallensbæk 1 — 2 poster
- KBK Kbh. 1 — 39 poster
- Nykøbing Sj. 1 — 3 poster
- Holbæk 1 — 22 poster
- Birkerød BK13 1 — 19 poster
- Hillerød 2 — 13 poster
- Jyllinge 1 — 3 poster
- Solrød Strand 3 — 14 poster
- Slagelse 1 — 7 poster
- Kirke Hyllinge 1 — 9 poster
- Gentofte 1 — 40 poster
- Lillerød 1 — 28 poster
- Hillerød 1 — 27 poster
- Hvidovre 1 — 30 poster
- Drive 1 — 23 poster
- GBK/FBK U13 M/A (4+2) 1 — 1 poster
- Solrød Strand 2 — 34 poster
- Dragør 1 — 10 poster
- KBK Kbh. 2 — 20 poster
- ABC/IBB U13 B (4+2) 1 — 1 poster
- KMB2010 1 — 19 poster
- Team Storstrøm 1 — 6 poster
- Holte 1 — 18 poster
- Lillerød — 5 poster
- Hillerød — 6 poster
- Køge — 3 poster
- Skælskør — 1 poster
- Værløse 1 — 30 poster
- Skælskør 1 — 11 poster
- Charlottenlund 1 — 14 poster
- Hillerød 3 — 4 poster
- Ishøj SB 50 1 — 2 poster
- Drive 2 — 14 poster
- Køge 1 — 23 poster
- Lyngby 2 — 16 poster
- Hørsholm 1 — 17 poster
- Greve 2 — 18 poster
- Slagelse/Gørlev Badminton 1 — 1 poster
- Gladsaxe Søborg 1 — 20 poster
- Hillerød 4 — 2 poster
- Lillerød 2 — 10 poster
- Farum 1 — 14 poster
- Lillerød 3 — 3 poster
- Værløse 3 — 11 poster
- KBK Kbh. 3 — 13 poster
- Vanløse 1 — 13 poster
- Sorø 1 — 13 poster
- Valby BC 1 — 11 poster
- Greve 3 — 9 poster
- Værløse 2 — 12 poster
- &#216;lstykke — 5 poster
- Taastrup Elite 1 — 1 poster
- Holte 2 — 12 poster
- Græsted 1 — 7 poster
- Stenløse 1 — 5 poster
- BC37 Amager 1 — 22 poster
- FKIF Frederiksberg 1 — 11 poster
- Skovshoved 4 — 7 poster
- Espergærde 1 — 2 poster
- Dragør 2 — 3 poster
- FKIF Frederiksberg — 1 poster
- Herlev/Hjorten 3 — 12 poster
- Solrød Strand 7 — 4 poster
- Valby BC — 2 poster
- Taastrup Elite 2 — 1 poster
- Nivå-Kokkedal 1 — 8 poster
- Ringsted 2 — 8 poster
- Ringsted 1 — 11 poster
- Solrød Strand U13 4+3 — 1 poster
- Lillerød U13 4+3 — 1 poster
- GBK/KMB2010 1 — 1 poster
- SKB-Stubbekøbing 1 — 2 poster
- Hørsholm 2 — 7 poster
- Frem - Hellebæk 1 — 10 poster
- Herlev/Hjorten 2 — 18 poster
- Måløv 2 — 3 poster
- Vanløse 2 — 5 poster
- Holbæk 2 — 11 poster
- Solrød Strand 4 — 9 poster
- Hillerød U15 4+3 — 1 poster
- Greve U15 4+3 — 1 poster
- Solrød Strand U17 4+3 — 1 poster
- Lillerød U17 4+3 — 1 poster
- HB2000/Taastrup Badminton 1 — 1 poster
- Ledøje-Smørum 2 — 4 poster
- Islands Brygge 1 — 12 poster
- Glostrup 2 — 3 poster
- Charlottenlund 2 — 9 poster
- Græsted 2 — 4 poster
- BC37 Amager 2 — 15 poster
- Rudersdal 1 — 14 poster
- Holte 3 — 1 poster
- Ballerup BC58 1 — 7 poster
- Slangerup 2 — 7 poster
- Sorø 2 — 1 poster
- Næstved 1 — 2 poster
- Charlottenlund 3 — 2 poster
- Ledøje-Smørum 1 — 8 poster
- Køge 3 — 4 poster
- Taastrup TIK 1 — 1 poster
- Borup 1 — 5 poster
- Glumsø 1 — 4 poster
- HB2000/Taastrup Badminton — 1 poster
- Hvidovre 2 — 10 poster
- IBB/BC37 Amager 1 — 1 poster
- Næstved/Gørlev 1 — 1 poster
- Ringsted/Værløse 1 — 1 poster
- Team København 1 — 1 poster
- Nivå-Kokkedal 2 — 7 poster
- Gørlev 1 — 10 poster
- Solrød Strand 8 — 2 poster
- BC37 Amager 4 — 5 poster
- &#216;lstykke 2 — 10 poster
- Nivå-Kokkedal 4 — 3 poster
- Solrød Strand 6 — 7 poster
- Herlev/Hjorten 5 — 11 poster
- Lyngby 3 — 5 poster
- Jernløse 3 — 5 poster
- Ledøje-Smørum 4 — 2 poster
- Greve 4 — 4 poster
- KBK/KMB2010 kbh. 1 — 1 poster
- Vanløse/FKIF 1 — 3 poster
- Holbæk-Skibby 1 — 1 poster
- NBK/BC 37 Amager 1 — 1 poster
- Team Egedal 1 — 2 poster
- Køge 4 — 1 poster
- Hørsholm 6 — 1 poster
- Kirke Hyllinge 3 — 1 poster
- Nivå-Kokkedal 5 — 2 poster
- BC37/Dragør 2 — 1 poster
- BC37/Dragør 1 — 2 poster
- Hvidovre HB2000 1 — 7 poster
- Virum 1 — 6 poster
- Slangerup 1 — 9 poster
- Sandved Tornemark 1 — 2 poster
- Team Vejleå 1 — 8 poster
- Skovlunde 1 — 8 poster
- Birkerød BK13 3 — 8 poster
- Rudersdal 2 — 4 poster
- Slangerup 3 — 3 poster
- Græsted 3 — 2 poster
- Espergærde 3 — 1 poster
- Køge 2 — 7 poster
- BC37/KMB2010 Amager 1 — 1 poster
- Næstved 2 — 3 poster
- Birkerød BK13 2 — 4 poster
- Fredensborg 2 — 2 poster
- Helsinge 1 — 4 poster
- Bjæverskov 1 — 2 poster
- Havdrup 1 — 3 poster
- Virum 2 — 4 poster
- BK36 Kbh. 1 — 4 poster
- Haslev 1 — 2 poster
- BC37/Gladsaxe Søborg 1 — 1 poster
- KMB2010 4 — 7 poster
- Rødovre 2 — 5 poster
- Islands Brygge 3 — 3 poster
- FKIF Frederiksberg 2 — 11 poster
- Skovshoved 2 — 17 poster
- Herlev/Smørum 1 — 1 poster
- Humlebæk 3 — 1 poster
- BADFYN/BADSDRJ — 12 poster
- Team Metro+ 1 — 1 poster
- Furesø 1 — 1 poster
- Hvidovre 3 — 5 poster
- FKIF Frederiksberg 3 — 4 poster
- Team Vejleå 3 — 8 poster
- Køge 5 — 2 poster
- Holbæk 4 — 7 poster
- Allinge-S.G. Badminton 1 — 2 poster
- Slagelse 2 — 1 poster
- BC37 Amager 3 — 9 poster
- Nivå-Kokkedal 3 — 6 poster
- Værløse 4 — 5 poster
- Hørsholm 4 — 1 poster
- Jernløse 2 — 4 poster
- Vallensbæk 2 — 6 poster
- Lyngby 4 — 4 poster
- Måløv/Smørum 1 — 5 poster
- Kirke Hyllinge 2 — 2 poster
- Sorø/Slagelse 1 — 1 poster
- Jyllinge 2 — 1 poster
- BC37/NBK Amager 1 — 1 poster
- Sorø/Ringsted 1 — 1 poster
- KBK Kbh. 4 — 5 poster
- Valby BC 4 — 3 poster
- &#216;lstykke 3 — 3 poster
- Team Vejleå 2 — 3 poster
- Hundested 1 — 2 poster
- Gilleleje 1 — 2 poster
- Melby 1 — 1 poster
- Valby BC 2 — 3 poster
- Virum 3 — 1 poster
- Jernløse 1 — 13 poster
- Karlslunde 1 — 5 poster
- Ganløse 1 — 1 poster
- Drive/FKIF 1 — 1 poster
- Nordrup-Farendløse 1 — 1 poster
- Farum 2 — 4 poster
- Islands Brygge 2 — 4 poster
- Valby BC 3 — 4 poster
- Frederikssund 1 — 6 poster
- Taastrup BC 1 — 5 poster
- Team Sjælland 1 — 1 poster
- Solrød Strand 5 — 5 poster
- Lyngby 5 — 4 poster
- Gentofte/KMB2010 1 — 1 poster
- Team FKIF/KBK/HBC 1 — 1 poster
- Team Nordsjælland 1 — 1 poster
- Ringsted 3 — 1 poster
- Værløse 5 — 3 poster
- BC37 Amager 5 — 4 poster
- Birkerød BK13 4 — 5 poster
- Gladsaxe Søborg 4 — 7 poster
- Gentofte 5 — 4 poster
- BC37 Amager 6 — 2 poster
- KMB2010 3 — 8 poster
- Gentofte 3 — 9 poster
- SAIF Kbh. 1 — 5 poster
- Gentofte 4 — 10 poster
- Frederiksberg 2 — 1 poster
- Skovshoved 6 — 2 poster
- Gladsaxe Søborg 3 — 9 poster
- KFUM Badminton Kbh. 1 — 1 poster
- Lejre 1 — 3 poster
- Rødovre 1 — 8 poster
- Gladsaxe Søborg 2 — 7 poster
- Hvidovre 4 — 7 poster
- Hornbæk 1 — 1 poster
- FSK Furesø 1 — 2 poster
- Team KBK/Drive/Jernløse 1 — 1 poster
- NK Lillerød — 1 poster
- HBC/KMB2010 1 — 2 poster
- FSK Furesø 2 — 1 poster
- Holbæk 3 — 4 poster
- Gladsaxe Søborg 5 — 4 poster
- Næstved/Herlufsholm 2 — 1 poster
- Herlev/Hjorten 7 — 5 poster
- Vanløse 4 — 1 poster
- FKIF/VBC 1 — 1 poster
- Næstved/Herlufsholm 1 — 1 poster
- Bagsværd 1 — 3 poster
- Helsingør 2 — 4 poster
- Hareskov 2 — 1 poster
- Herlev/Hjorten 4 — 7 poster
- Bjæverskov/Borup 1 — 1 poster
- Albertslund 1 — 1 poster
- Hareskov 1 — 1 poster
- Stenløse 2 — 1 poster
- Lyngby/KBK 1 — 3 poster
- Vallensbæk 1 — 7 poster
- Gladsaxe Søborg 6 — 4 poster
- Herlev/Hjorten — 5 poster
- KBK/Drive/(Gentofte) 1 — 1 poster
- Skovshoved 3 — 3 poster
- &#216;lstykke 4 — 1 poster
- Næstved-Herlufsholm 3 — 1 poster
- Holbæk/Kirke Hyllinge 1 — 2 poster
- Gentofte 2 — 12 poster
- Jernløse 5 — 3 poster
- Ringsted 4 — 1 poster
- Ledøje-Smørum — 2 poster
- Holbæk — 2 poster
- Ringsted — 1 poster
- Jernløse — 2 poster
- Næstved-Herlufsholm 1 — 7 poster
- FKIF/VBC 2 — 1 poster
- Birkerød BK13 — 3 poster
- Farum — 1 poster
- Herlev/Hjorten 11 — 1 poster
- Herlev/Hjorten 22 — 1 poster
- Team Vindinge/Roskilde 1 — 1 poster
- Team Vindinge/Roskilde — 1 poster
- Humlebæk — 2 poster
- Team HJR Sjælland 1 — 1 poster
- KMB2010/Drive 1 — 2 poster
- GBK/CBK 1 — 1 poster
- KMB2010 2 — 9 poster
- Glostrup 1 — 6 poster
- Humlebæk 2 — 7 poster
- Jernløse 4 — 6 poster
- Frederiksberg 3 — 3 poster
- Rødovre 3 — 2 poster
- Vallensbæk — 1 poster
- Team Midtsjælland 1 — 1 poster
- Sorø/Nykøbing F. 1 — 2 poster
- Vanløse — 2 poster
- Team Slagelse/Skælskør 1 — 6 poster
- Gørlev — 2 poster
- Team Midtsjælland — 1 poster
- Skovshoved/Lillerød 1 — 1 poster
- Herlev/Hjorten 6 — 9 poster
- Birkerød BK13 5 — 1 poster
- Storstrømmen-Kippinge 1 — 1 poster
- Hvidovre/Gentofte 1 — 1 poster
- Nivå-Kokkedal — 2 poster
- Måløv/Smørum — 1 poster
- Frem - Hellebæk — 1 poster
- Vindinge — 1 poster
- Lejre — 1 poster
- Helsingør — 1 poster
- Islands Brygge 4 — 2 poster
- Drive 4 — 5 poster
- Lundtofte 2 — 3 poster
- CBK/GBK/KMB2010 1 — 1 poster
- Gentofte 6 — 2 poster
- Gladsaxe Søborg 9 — 2 poster
- Gentofte 7 — 2 poster
- KMB2010 6 — 5 poster
- Frederiksberg 4 — 3 poster
- Gladsaxe Søborg 8 — 3 poster
- Karlslunde 3 — 2 poster
- Skovlunde 2 — 4 poster
- KMB2010 5 — 6 poster
- Hørsholm 3 — 2 poster
- Drive 3 — 6 poster
- Nykøbing F 1 — 3 poster
- Gørlev/Sorø 1 — 1 poster
- Frederiksberg 1 — 7 poster
- Gørlev 2 — 4 poster
- Vindinge 2 — 2 poster
- Skibby 1 — 2 poster
- KBK Kbh. 5 — 3 poster
- Gladsaxe Søborg 7 — 4 poster
- HBC/FKIF 1 — 1 poster
- Badminton Roskilde/&#216;lstykke 2 — 1 poster
- Team NHRS 1 — 2 poster
- Badminton Roskilde/&#216;lstykke 1 — 1 poster
- Drive 5 — 2 poster
- Hvidovre 5 — 3 poster
- FKIF Frederiksberg 4 — 1 poster
- Birkerød BK13 6 — 1 poster
- Karlslunde 2 — 2 poster
- Skovshoved 5 — 4 poster
- Dragør 3 — 2 poster
- Frem - Hellebæk 3 — 1 poster
- Værløse 6 — 3 poster
- Vallensbæk 3 — 6 poster
- Glostrup 5 — 1 poster
- Skælskør 2 — 1 poster
- Gentofte — 1 poster
- Team HHG 1 — 1 poster
- Team Køge/Holbæk 1 — 2 poster
- Græsted/Gilleleje 1 — 1 poster
- Brøndby BK 1 — 2 poster
- &#216;nslev-Eskildstrup 1 — 1 poster
- Jægerspris 1 — 1 poster
- BC37/IBB 1 — 2 poster
- Køge/Badminton Roskilde 1 — 2 poster
- KMB2010 7 — 2 poster
- Hvidovre 6 — 2 poster
- Solrød Strand 9 — 1 poster
- Gladsaxe Søborg 10 — 1 poster
- Nakskov/Nykøbing F 1 — 2 poster
- Farum 3 — 3 poster
- Team Bornholm 1 — 2 poster
- Jernløse 6 — 1 poster
- Drive 8 — 2 poster
- Islands Brygge 5 — 1 poster
- Drive 9 — 2 poster
- HBC/Gentofte 1 — 1 poster
- LBK/KMB2010 1 — 1 poster
- KBK Kbh./Drive 1 — 1 poster
- Karlslunde 4 — 1 poster
- Karlslunde 6 — 2 poster
- Drive 7 — 3 poster
- Herlev/Hjorten 8 — 2 poster
- Team Bornholm 2 — 1 poster
- Team Sydkysten 3 — 2 poster
- Greve/Skælskør/&#216;lstykke 1 — 2 poster
- Team Sydkysten 1 — 3 poster
- SAIF Kbh. 2 — 2 poster
- Herlev/Hjorten - Birkerød 1 — 1 poster
- Team Skælskør-Sorø 1 — 1 poster
- Team Sydkysten 2 — 2 poster
- Helsinge 2 — 2 poster
- Værløse 8 — 1 poster
- Herlev/Hjorten - Valby 1 — 1 poster
- GSB/LBK 1 — 1 poster
- KBK Kbh. 6 — 2 poster
- Roskilde/Valby 1 — 1 poster
- LBK/SBK/SLBK 1 — 1 poster
- Slangerup/Holte 1 — 1 poster
- Tune 1 — 2 poster
- Slagelse/Sorø/Skælskør 1 — 1 poster
- LBK/SBK/SLBK 2 — 1 poster
- Drive 6 — 2 poster
- Slangerup/Holte 2 — 1 poster
- Valby BC 5 — 1 poster
- Brøndby BK 2 — 1 poster
- Lundtofte 3 — 1 poster
- Næstved-Herlufsholm/Sorø 1 — 1 poster
- Frederikssund 2 — 1 poster
- Slangerup/Skibby 1 — 1 poster
- Valby BC 6 — 1 poster
- VBC/FKIF 1 — 2 poster
- Lundtofte 4 — 1 poster
- Lillerød/Hørsholm 1 — 1 poster
- Gladsaxe Søborg — 1 poster
- Greve 5 — 1 poster
- Holbæk 5 — 1 poster
- Slangerup/Skibby 2 — 2 poster
- Stubbekøbing 2 — 1 poster
- Græsted/Gilleleje 2 — 1 poster

## 3. GSB-bredde A/B/C pr. sæson og årgang

| Sæson | Årgang | A rækker/formater | B rækker/formater | C rækker/formater | Fællesrækker i region 8 |
|---|---|---:|---:|---:|---:|
| 2011/2012 | U11 | 2/0 | 2/0 | 2/0 | 0 |
| 2011/2012 | U13 | 2/0 | 2/0 | 2/0 | 0 |
| 2011/2012 | U15 | 3/0 | 3/0 | 3/0 | 0 |
| 2011/2012 | U17 | 0/0 | 0/0 | 0/0 | 0 |
| 2012/2013 | U11 | 1/0 | 1/0 | 1/0 | 0 |
| 2012/2013 | U13 | 1/0 | 1/0 | 1/0 | 0 |
| 2012/2013 | U15 | 3/0 | 3/0 | 3/0 | 0 |
| 2012/2013 | U17 | 1/0 | 1/0 | 1/0 | 0 |
| 2013/2014 | U11 | 2/0 | 2/0 | 2/0 | 0 |
| 2013/2014 | U13 | 1/1 | 1/1 | 1/1 | 0 |
| 2013/2014 | U15 | 3/1 | 3/1 | 3/1 | 0 |
| 2013/2014 | U17 | 2/0 | 2/0 | 2/0 | 0 |
| 2014/2015 | U11 | 2/1 | 2/1 | 2/1 | 3 |
| 2014/2015 | U13 | 2/2 | 2/2 | 2/2 | 0 |
| 2014/2015 | U15 | 2/2 | 2/2 | 2/2 | 0 |
| 2014/2015 | U17 | 0/0 | 0/0 | 0/0 | 0 |
| 2015/2016 | U11 | 1/1 | 1/1 | 1/1 | 1 |
| 2015/2016 | U13 | 2/1 | 2/1 | 2/1 | 0 |
| 2015/2016 | U15 | 1/1 | 1/1 | 1/1 | 0 |
| 2015/2016 | U17 | 0/0 | 0/0 | 0/0 | 1 |
| 2016/2017 | U11 | 2/1 | 2/1 | 2/1 | 2 |
| 2016/2017 | U13 | 1/1 | 1/1 | 1/1 | 1 |
| 2016/2017 | U15 | 2/2 | 2/2 | 2/2 | 0 |
| 2016/2017 | U17 | 1/1 | 1/1 | 1/1 | 0 |
| 2016/2017 | U17/U19 | 0/0 | 0/0 | 0/0 | 0 |
| 2017/2018 | U11 | 1/1 | 1/1 | 1/1 | 5 |
| 2017/2018 | U13 | 2/1 | 2/1 | 2/1 | 5 |
| 2017/2018 | U15 | 2/1 | 1/1 | 1/1 | 6 |
| 2017/2018 | U17/U19 | 1/1 | 0/0 | 0/0 | 3 |
| 2018/2019 | U11 | 2/1 | 1/1 | 1/1 | 7 |
| 2018/2019 | U13 | 1/1 | 0/0 | 0/0 | 6 |
| 2018/2019 | U15 | 1/1 | 1/1 | 1/1 | 9 |
| 2018/2019 | U17/U19 | 2/1 | 1/1 | 1/1 | 4 |
| 2019/2020 | U11 | 1/1 | 0/0 | 0/0 | 8 |
| 2019/2020 | U13 | 2/1 | 0/0 | 0/0 | 9 |
| 2019/2020 | U15 | 1/1 | 0/0 | 0/0 | 9 |
| 2020/2021 | U09 | 1/1 | 1/1 | 1/1 | 0 |
| 2020/2021 | U11 | 2/2 | 1/1 | 1/1 | 5 |
| 2020/2021 | U13 | 2/1 | 2/1 | 2/1 | 3 |
| 2020/2021 | U15 | 3/2 | 3/2 | 3/2 | 7 |
| 2021/2022 | U09 | 1/1 | 1/1 | 1/1 | 1 |
| 2021/2022 | U11 | 1/1 | 1/1 | 1/1 | 6 |
| 2021/2022 | U13 | 3/2 | 1/1 | 1/1 | 7 |
| 2021/2022 | U15 | 5/2 | 2/1 | 2/1 | 7 |
| 2022/2023 | U09 | 1/1 | 1/1 | 1/1 | 1 |
| 2022/2023 | U11 | 5/3 | 3/1 | 3/1 | 4 |
| 2022/2023 | U13 | 2/1 | 2/1 | 2/1 | 5 |
| 2022/2023 | U15 | 5/2 | 5/2 | 5/2 | 6 |
| 2022/2023 | U17/U19 | 1/1 | 1/1 | 1/1 | 5 |
| 2023/2024 | U09 | 1/1 | 1/1 | 1/1 | 0 |
| 2023/2024 | U11 | 4/3 | 2/1 | 2/1 | 5 |
| 2023/2024 | U13 | 4/2 | 2/1 | 2/1 | 6 |
| 2023/2024 | U15 | 4/3 | 3/2 | 3/2 | 8 |
| 2023/2024 | U17/U19 | 2/1 | 2/1 | 2/1 | 7 |
| 2024/2025 | U09 | 1/1 | 1/1 | 1/1 | 0 |
| 2024/2025 | U11 | 3/2 | 2/1 | 2/1 | 3 |
| 2024/2025 | U13 | 5/3 | 1/1 | 1/1 | 12 |
| 2024/2025 | U15 | 3/1 | 2/1 | 2/1 | 12 |
| 2024/2025 | U17/U19 | 1/1 | 0/0 | 0/0 | 11 |
| 2025/2026 | U09 | 4/1 | 1/1 | 4/1 | 3 |
| 2025/2026 | U11 | 3/2 | 3/2 | 3/2 | 4 |
| 2025/2026 | U13 | 5/3 | 3/2 | 3/2 | 12 |
| 2025/2026 | U15 | 6/3 | 3/1 | 3/1 | 15 |
| 2025/2026 | U17/U19 | 2/1 | 1/1 | 1/1 | 11 |
| 2026/2027 | U09 | 2/1 | 1/1 | 2/1 | 2 |
| 2026/2027 | U11 | 4/2 | 3/2 | 4/2 | 2 |
| 2026/2027 | U13 | 6/4 | 4/2 | 4/2 | 9 |
| 2026/2027 | U15 | 6/2 | 3/1 | 3/1 | 17 |
| 2026/2027 | U17/U19 | 3/3 | 1/1 | 2/2 | 13 |

A vs. B ændrer 28 af 69 kombinationer. Største afvigelser (A minus B):

| Sæson | Årgang | A | B | Forskel rækker | Forskel formater |
|---|---|---:|---:|---:|---:|
| 2024/2025 | U13 | 5/3 | 1/1 | 4 | 2 |
| 2025/2026 | U15 | 6/3 | 3/1 | 3 | 2 |
| 2021/2022 | U15 | 5/2 | 2/1 | 3 | 1 |
| 2026/2027 | U15 | 6/2 | 3/1 | 3 | 1 |
| 2025/2026 | U09 | 4/1 | 1/1 | 3 | 0 |
| 2022/2023 | U11 | 5/3 | 3/1 | 2 | 2 |
| 2023/2024 | U11 | 4/3 | 2/1 | 2 | 2 |
| 2026/2027 | U13 | 6/4 | 4/2 | 2 | 2 |
| 2026/2027 | U17/U19 | 3/3 | 1/1 | 2 | 2 |
| 2019/2020 | U13 | 2/1 | 0/0 | 2 | 1 |

## 4. Formatplacering

Sammenligning af bedste GSB-format fra 145: 69/69 kombinationer uændrede; afvigelser: 0. Regionbaseret opdeling ændrer ikke GSB's egne registrerede hold eller formatet på deres puljer; A/B/C er her deltagelsesbredde, ikke en ny rangering.

## 5. U15 2026/27 — alle region-8-rækker og hold

| Række | Format | Regiontilknytning | Hold (råt navn; hjemregion hvis entydigt) |
|---|---|---|---|
| U15 (4+3) - maks. 14000 p. holdfællesskab | Uplaceret: 4+3 (ingen brugbar kategorisignatur) | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Gentofte 1 — ukendt hjemregion; LBK/SBK/SLBK 1 — ukendt hjemregion; Solrød Strand 1 — ukendt hjemregion; Værløse 1 — ukendt hjemregion |
| U15 A, 6800 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Badminton Roskilde 1 — ukendt hjemregion; Drive 1 — ukendt hjemregion; Drive 2 — ukendt hjemregion; KBK Kbh. 1 — ukendt hjemregion; Slangerup/Holte 1 — ukendt hjemregion; Tune 1 — ukendt hjemregion |
| U15 A, 7200 (4 spillere) | 4 spillere | København + anden region / blandet: Badminton København, Badminton Lolland-Falster, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | BC37/IBB 1 — ukendt hjemregion; Birkerød BK13 1 — ukendt hjemregion; Gladsaxe Søborg 1 [GSB] — ukendt hjemregion; Holte 1 — ukendt hjemregion; Hørsholm 1 — ukendt hjemregion; KBK Kbh. 2 — ukendt hjemregion; Køge 1 — ukendt hjemregion; Lyngby 1 — ukendt hjemregion; Nykøbing F 1 — ukendt hjemregion; VBC/FKIF 1 — ukendt hjemregion; Værløse 2 — ukendt hjemregion |
| U15 B, 5400 (4 piger) BD | 4 piger | København + Sjælland: Badminton København, Badminton Sjælland | FKIF Frederiksberg 2 — ukendt hjemregion; KBK Kbh. 5 — ukendt hjemregion; KMB2010 2 — ukendt hjemregion; Værløse 6 — ukendt hjemregion |
| U15 B, 5800 (2+2) | 2+2 | København + anden region / blandet: Badminton Bornholm, Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Badminton Bornholm 1 — Badminton Bornholm; BC37 Amager 1 — ukendt hjemregion; Drive 3 — ukendt hjemregion; Greve 1 — ukendt hjemregion; Islands Brygge 1 — ukendt hjemregion |
| U15 B, 6200 (4 spillere) BD | 4 spillere | kun København: Badminton København | Frederiksberg 1 — ukendt hjemregion; Gentofte 2 — ukendt hjemregion; Gladsaxe Søborg 2 [GSB] — ukendt hjemregion; Gladsaxe Søborg 3 [GSB] — ukendt hjemregion; Hvidovre 2 — ukendt hjemregion; KBK Kbh. 3 — ukendt hjemregion; KMB2010 1 — ukendt hjemregion; Skovshoved 3 — ukendt hjemregion; Valby BC 3 — ukendt hjemregion; Vanløse 1 — ukendt hjemregion |
| U15 C-D, 5100 (4 spillere) BD | 4 spillere | kun København: Badminton København | BC37 Amager 3 — ukendt hjemregion; Dragør 1 — ukendt hjemregion; Frederiksberg 2 — ukendt hjemregion; Gladsaxe Søborg 4 [GSB] — ukendt hjemregion; Hvidovre 3 — ukendt hjemregion; KBK Kbh. 4 — ukendt hjemregion; NBK Amager 1 — ukendt hjemregion |
| U15 C, 4900 (4 piger) | 4 piger | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Badminton Roskilde 6 — ukendt hjemregion; Birkerød BK13 3 — ukendt hjemregion; Dragør 3 — ukendt hjemregion; Gladsaxe Søborg 7 [GSB] — ukendt hjemregion; Herlev/Hjorten 5 — ukendt hjemregion; KMB2010 3 — ukendt hjemregion; KMB2010 4 — ukendt hjemregion; Køge 3 — ukendt hjemregion; Ledøje-Smørum 2 — ukendt hjemregion; Team Vejleå 3 — ukendt hjemregion; Valby BC 6 — ukendt hjemregion |
| U15 C, 5200 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Drive 4 — ukendt hjemregion; Skovshoved 2 — ukendt hjemregion; Slagelse/Sorø/Skælskør 1 — ukendt hjemregion |
| U15 C, 5500 (4 spillere) | 4 spillere | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Glostrup 1 — ukendt hjemregion; Islands Brygge 2 — ukendt hjemregion; Måløv 1 — ukendt hjemregion; Næstved-Herlufsholm/Sorø 1 — ukendt hjemregion; Ringsted 1 — ukendt hjemregion; Skovlunde 1 — ukendt hjemregion; Slagelse 1 — ukendt hjemregion; Valby BC 4 — ukendt hjemregion; Frederikssund 2 — ukendt hjemregion; Holte 2 — ukendt hjemregion; Humlebæk 2 — ukendt hjemregion; Lillerød 2 — ukendt hjemregion; Slangerup/Skibby 1 — ukendt hjemregion; Værløse 3 — ukendt hjemregion; &#216;lstykke 1 — ukendt hjemregion |
| U15 D, 4500 (4 piger) | 4 piger | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Badminton Roskilde 7 — ukendt hjemregion; Birkerød BK13 4 — ukendt hjemregion; Brøndby BK 2 — ukendt hjemregion; Charlottenlund 2 — ukendt hjemregion; Gentofte 3 — ukendt hjemregion; Hillerød 4 — ukendt hjemregion; Lundtofte 3 — ukendt hjemregion; Nivå-Kokkedal 4 — ukendt hjemregion; Slangerup 2 — ukendt hjemregion; Vallensbæk 2 — ukendt hjemregion |
| U15 D, 4800 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | BC37 Amager 2 — ukendt hjemregion; Greve 2 — ukendt hjemregion; Holbæk 1 — ukendt hjemregion; Hvidovre 1 — ukendt hjemregion; Solrød Strand 2 — ukendt hjemregion |
| U15 D, 4800 (4 spillere) BD | 4 spillere | kun København: Badminton København | BK36 Kbh. 1 — ukendt hjemregion; Charlottenlund 1 — ukendt hjemregion; Dragør 2 — ukendt hjemregion; Drive 5 — ukendt hjemregion; FKIF Frederiksberg 1 — ukendt hjemregion; Frederiksberg 3 — ukendt hjemregion; Gladsaxe Søborg 5 [GSB] — ukendt hjemregion; Islands Brygge 3 — ukendt hjemregion; Rødovre 1 — ukendt hjemregion |
| U15 Dx, 4600 (4 spillere) | 4 spillere | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Gladsaxe Søborg 6 [GSB] — ukendt hjemregion; Glumsø 1 — ukendt hjemregion; Herlev/Hjorten 4 — ukendt hjemregion; Jernløse 1 — ukendt hjemregion; Karlslunde 2 — ukendt hjemregion; Team Vejleå 2 — ukendt hjemregion; Valby BC 5 — ukendt hjemregion; Vallensbæk 1 — ukendt hjemregion; Vanløse 2 — ukendt hjemregion; Vindinge 2 — ukendt hjemregion; Værløse 5 — ukendt hjemregion |
| U15 M, 7800 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Humlebæk 1 — ukendt hjemregion; Roskilde/Valby 1 — ukendt hjemregion; Skovshoved 1 — ukendt hjemregion |
| UGE 38 - U15 A, 6800 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Drive 6 — ukendt hjemregion; Gladsaxe Søborg 1 [GSB] — ukendt hjemregion; FKIF Frederiksberg 1 — ukendt hjemregion; Badminton Roskilde 2 — ukendt hjemregion; KMB2010 5 — ukendt hjemregion; Badminton Roskilde 3 — ukendt hjemregion; Slangerup/Holte 2 — ukendt hjemregion; Drive 6 — ukendt hjemregion; KMB2010 5 — ukendt hjemregion |
| UGE 38 - U15 B, 5800 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Herlev/Hjorten 6 — ukendt hjemregion; Gladsaxe Søborg 2 [GSB] — ukendt hjemregion; Greve 3 — ukendt hjemregion; KMB2010 6 — ukendt hjemregion |
| UGE 38 - U15 C, 5200 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Dragør 1 — ukendt hjemregion; Herlev/Hjorten 7 — ukendt hjemregion; KBK Kbh. 6 — ukendt hjemregion; Skovshoved 5 — ukendt hjemregion |
| Uge 38 - U15 D, 4800 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Hvidovre 4 — ukendt hjemregion; Lundtofte 4 — ukendt hjemregion; Rudersdal 1 — ukendt hjemregion; Holbæk 2 — ukendt hjemregion |
| UGE 38 - U15 M, 7800 (2+2) | 2+2 | København + anden region / blandet: Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Gentofte 2 — ukendt hjemregion; LBK/SBK/SLBK 2 — ukendt hjemregion; Skovshoved 4 — ukendt hjemregion |

## 6. Fem ældre række-stikprøver

| Sæson | Årgang | Række | Regioner | Rå holdnavne |
|---|---|---|---|---|
| 2023/2024 | U11 | U11 - 2+2 | Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Solrød Strand 1; Gladsaxe Søborg 1; Gentofte 1; KBK Kbh. 1; Hvidovre 1 |
| 2012/2013 | U15 | U15 Serie X1 | Badminton København | KFUM Badminton Kbh.; Gladsaxe Søborg 2; Charlottenlund 3; Valby BC; FKIF Frederiksberg 2; Amager ABC; NBK Amager; Sct. Jørgen Kbh. |
| 2025/2026 | U13 | U13 (4+3) | Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Solrød Strand 1; Gentofte 1; Køge/Badminton Roskilde 1; Solrød Strand 1; Køge/Badminton Roskilde 1 |
| 2022/2023 | U17/U19 | U17/U19 5200 4 Spillere pulje 1 - Ny | Badminton København | Rødovre 1; BK36 Kbh. 1; Gladsaxe Søborg 1; Gentofte 2; SAIF Kbh. 1; Drive 2; Islands Brygge 1; BK36 Kbh. 2 |
| 2024/2025 | U13 | U13 A, 5600 (2+2) | Badminton København, Badminton Sjælland, DGI Nordsjælland, DGI Midt- og Vestsjælland | Humlebæk 1; Gladsaxe Søborg 1; Badminton Roskilde 1; Skovshoved 1; Lyngby 2; Badminton Roskilde 1; Humlebæk 1 |

Udvalget er reproducerbart i hash-rækkefølge, ikke et statistisk tilfældigt udsnit. Det dækker fem forskellige sæsoner.

## 7. Kapacitetsdata: hvad databasen indeholder

Tabeller og kolonner med spiller-/kamp-/klub-/sæsonfelter fra den normaliserede database (kun skemaliste; ingen kapacitetskonklusion udledt her):

- clubs: club_id, badmintonplayer_id, nembadminton_id, name_raw, name_normalized
- competitions: competition_id, season_id, league_group_id, age_group_id, name_raw, league_raw, phase_raw, source_url
- extraction_errors: error_id, source_system, season_id, external_match_id, team_name_raw, error_type, error_message, fallback_status, retrieved_at
- individual_match_players: individual_match_id, player_id, side, pair_number, role, points_at_match
- individual_matches: individual_match_id, team_match_id, discipline_raw, game_number_raw, category_raw, home_score_raw, away_score_raw, winner_side, status, result_marker_raw
- players: player_id, external_player_id, name_raw, name_normalized
- seasons: season_id, label
- standings: standing_id, competition_id, team_name_raw, snapshot_date, snapshot_type, position, matches_played, wins, draws, losses, score_raw, sets_raw, points, set_points, source_url
- team_matches: team_match_id, external_match_id, season_id, competition_id, gsb_team_id, round_number, round_date, game_time, home_name_raw, away_name_raw, result_raw, points_raw, status, walkover_text_raw, source_status, raw_payload_id, walkover_winner_raw, remark_raw
- teams: team_id, club_id, season_id, competition_id, name_raw

Schema-vurdering: `players` har player_id, external_player_id og navnefelter, men intet køn- eller aldersfelt. `individual_match_players` forbinder spiller-ID med kampside/rolle; `individual_matches` forbinder til holdkamp; `team_matches` har sæson/competition, og `competitions` har aldersgruppe. Det giver grundlag for at tælle registrerede kampdeltagere pr. sæson/årgang, men ikke køn eller en komplet tilgængelig spillertrup. Det er observationer af registrerede kampe, ikke kapacitetsbevis.


## Kontrol

- 69 sæson/årgang-kombinationer fra 143; A matches 145 i 69/69.
- Databasehashes og alle tabelrækketal uændrede; begge databaser åbnet readOnly: true.
- 136-parserens 28 tests: se kontrolkørslen/resultatnoten.
- GSB formatplacering afviger ikke fra 145: 0.

Databaser før/efter: liga-landskab.db 9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c; gsb-statistik-normalized.db 49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e.

