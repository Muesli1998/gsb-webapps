# Opgave 134 — uafhængig verifikation af regelbogen

## Metode og begrænsning

Stikprøven er reproducerbar med Python `random.Random(20261005)`. Udtrækket blev stratificeret i denne rækkefølge: 10 tilfældige bekræftede, 7 tilfældige svage betingede, 8 yderligere betingede, 8 “ingen” og 7 yderligere tilfældige poster uden gentagelser. Det giver 40 poster: 10 bekræftede, 16 betingede, 14 “ingen” og 9 svage (svage overlapper betingede). Seedet, rækkefølgen og den konkrete stikprøve står nedenfor.

PDF-teksten blev udtrukket med `pdfplumber` fra Codex’ medfølgende Python-runtime. Den almindelige `pdftotext.exe` var en MiKTeX-version, som fejlede med exitkode 1 og intet output; den medfølgende Poppler-map havde `pdftoppm` og `pdfinfo`, men ingen `pdftotext.exe`. Den præcise interne årsag til MiKTeX-programmets exitkode kunne ikke fastslås; det var ikke Popplers `pdftotext`. `fitz`, `pdfplumber` og `pypdf` manglede i systemets Python; PyMuPDF-installation blev forsøgt, men netværkstilladelsen blokerede pip. Den medfølgende runtime havde `pdfplumber` og `pypdf`, så ingen pakkeinstallation var nødvendig. Udtræk gav tekst på alle tre prøvefiler; de er tekstbaserede og læsbare, ikke blot billedscanninger. Citater nedenfor bruger fysisk PDF-sidetal.

Samlet for de 40 felter: **24 ok, 2 afvigelser, 14 uklare**. Afvigelsesrate af hele stikprøven: **2/40 = 5 %**. Blandt de 26 afgørlige felter er raten **2/26 = 7,7 %**. De uklare felter er #11–18, #20–22, #24–25 og #40; præcis liste og årsager står i tabellen.

## Afprøvning af tekstudtrækker

Før genkørslen blev `pdfplumber` prøvet på tre kendte PDF’er. Første 300 tegn fra den udtrukne tekst (vist her med indholdet læsbart):

1. `bd-youth-2023-24.pdf` — 11 sider, 26.245 tegn:

   > Fælles reglement for ungdomsholdturneringen 2023/2024<br>Indhold:<br>§ 1 Formål og deltagelse side 2<br>§ 2 Udvalg og administration side 2<br>§ 3 Indbydelse og tilmeldingsprocedure side 2<br>§ 4 Deltagergebyr side 2<br>§ 5 Holdturneringens sæsonplan side 2<br>§ 6 Spilledatoer og tider side 2<br>§ 7 Holdtyper og rækker sid

2. `bd-youth-2025-26-rev-2025-10-08.pdf` — 13 sider, 35.730 tegn:

   > Fælles reglement for ungdomsholdturneringen 2025/2026<br>Indhold:<br>§ 1 Formål og deltagelse side 2<br>§ 2 Udvalg og administration side 2<br>§ 3 Indbydelse og tilmeldingsprocedure side 2<br>§ 4 Deltagergebyr side 2<br>§ 5 Ungdomsholdturneringens sæsonplan side 2<br>§ 6 Spilledatoer og tider side 3<br>§ 7 Holdtyper og ræk

3. `BD-DGI_ungdomsreglement_2016-17.pdf` — 10 sider, 22.677 tegn:

   > BADMINTON DANMARK – DGI BADMINTON, Reglement pointgivende ungdomsholdturnering 2016/2017 1<br>Reglement for den pointgivende ungdomsholdturnering 2016/2017<br>Indhold:<br>§ 1 Formål side 2<br>§ 2 Udvalg og administration side 2<br>§ 3 Indbydelse og tilmeldingsprocedure side 2<br>§ 4 Deltagergebyr side 2<br>§ 5 Holdturne

## Stikprøvetabel

| # | Felt (sæson · målgruppe · område) | Status | Kilde / PDF | PDF-tekstfund (side, citat) | Dom |
|---:|---|---|---|---|---|
| 1 | 2023/24 · senior · Badminton Nordjylland + DGI Nordjylland | bekraeftet | `nordjylland-senior-veteran-2023-24 — 2023/badminton-nordjylland/nordjylland-senior-veteran-2023-24.pdf` | Regelbog: bekræftet, kilde-sæson 2023/24, fastlagt=true, afstand=0. PDF s. 5 (trykt s. 3): “Holdturneringen sæson 2023/2024”. Sæsonen stemmer. | ok |
| 2 | 2026/27 · senior · Badminton Danmark | bekraeftet | `bd-dh-2026-27 — 2026/badminton-danmark/bd-dh-2026-27.pdf` | Regelbog: bekræftet, 2026/27, fastlagt=true, afstand=0. PDF s. 13: “…sæsonen 2026/2027”. Sæsonen stemmer. | ok |
| 3 | 2023/24 · ungdom · Badminton Danmark + DGI Badminton | bekraeftet | `bd-youth-2023-24 — 2023/badminton-danmark-dgi-badminton/bd-youth-2023-24.pdf` | Regelbog: bekræftet, 2023/24, fastlagt=true, afstand=0. PDF s. 1: “Fælles reglement for ungdomsholdturneringen 2023/2024”. Stemmer. | ok |
| 4 | 2024/25 · veteran · Badminton Nordjylland + DGI Nordjylland | bekraeftet | `nordjylland-senior-veteran-2024-25 — 2024/badminton-nordjylland/nordjylland-senior-veteran-2024-25.pdf` | Regelbog: bekræftet, 2024/25, fastlagt=true, afstand=0. PDF s. 5 (trykt s. 3): “Holdturneringen sæson 2024/2025”. Stemmer. | ok |
| 5 | 2019/20 · ungdom · Badminton Danmark + DGI Badminton | bekraeftet | `bd-youth-2019-20 — 2019/badminton-danmark-dgi-badminton/bd-youth-2019-20.pdf` | Regelbog: bekræftet, 2019/20, fastlagt=true, afstand=0. PDF s. 1: “Reglement for ungdomsholdturnering 2019/2020”. Stemmer. | ok |
| 6 | 2018/19 · senior · Badminton Nordjylland | bekraeftet | `nordjylland-senior-2018-19-manual — manuelt/Nordjylland_seniorhold_serie2-4_2018-19.pdf` | Regelbog: bekræftet, 2018/19, fastlagt=true, afstand=0. PDF s. 1: “GÆLDENDE FOR SÆSONEN 2018-2019”. Stemmer. | ok |
| 7 | 2025/26 · veteran · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland | bekraeftet | `west-senior-veteran-2025-26 — 2025/badminton-sønderjylland-og-midtjylland-dgi-østjylland-vestjylland-sydvest-midtjylland-sønderjylland-sydøstjylland/west-senior-veteran-2025-26.pdf` | Regelbog: bekræftet, kilde-sæson 2025/26 og fastlagt=true. PDF s. 1 siger “Gældende pr. 01-10-2025”; PDF s. 9 siger “sidst opdateret og gældende fra uge 43 2025”. Søgning i hele PDF-teksten fandt ingen angivelse af sæsonen 2025/26. Dokumentdato/ikrafttrædelsesdato er ikke det samme som en selvangivet sæson; bekræftet/fastlagt er derfor i modstrid med reglen. | afvigelse |
| 8 | 2015/16 · senior · Badminton København | bekraeftet | `kbh-rules-2015-16-fileid-56207 — 2015/badminton-koebenhavn/kbh-holdturneringsreglement-2015-16.pdf` | Regelbog: bekræftet, 2015/16, fastlagt=true, afstand=0. PDF s. 1: “holdturnering 2015-2016 (version 2015.1)”. Stemmer. | ok |
| 9 | 2018/19 · senior · Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland | bekraeftet | `west-series-rules-2018-19-fileid-77211 — 2018/badminton-kredsserie-vest/kredsserie-vest-serie1-1819.pdf` | Regelbog: bekræftet, source_season=2018/19, men fastlagt=false. PDF s. 1 har kun “HOLDTURNERINGSREGLEMENT for Kredsserien Vest & Serie 1 Vest”; tekstudtræk af alle 13 sider fandt ingen sæsonangivelse (2018/19 fremgår kun af eksternt filnavn/registrering). Reglen siger, at filer uden selvangivet sæson aldrig er bekræftede. Status bekræftet er derfor en afvigelse. | afvigelse |
| 10 | 2018/19 · ungdom · Badminton Danmark + DGI Badminton | bekraeftet | `bd-dgi-youth-2018-19 — 2018/badminton-danmark-dgi-badminton/bd-dgi-youth-2018-19.pdf` | Regelbog: bekræftet, 2018/19, fastlagt=true, afstand=0. PDF s. 1: “Samarbejdsområder sæson 2018/2019”. Stemmer. | ok |
| 11 | 2026/27 · veteran · Badminton Sjælland (tidl. SBKr.) | betinget | `sj-veteran-2013-14-season-conflict — 2013/badminton-sjaelland/sj-veteran-2013-14-season-conflict.pdf` | Regelbog: betinget, kilde-sæson 2013/14, afstand=13, fastlagt=true. PDF s. 1 har både titlen “Holdturneringen 2013/2014 - Veteran” og brødteksten “... veteranholdturnering 2012/2013”. Titlen støtter valgt sæson, men selve dokumentet er modstridende; kan ikke afgøre hvilken sæson reglerne faktisk gjaldt for eller validere arveafstanden. | uklart |
| 12 | 2023/24 · senior · Badminton Fyn | betinget | `fyn-senior-veteran-reglement-date-2018-fileid-77210 — 2018/badminton-fyn/fyn-senior-veteran-reglement-revised-2018-08-01.pdf` | Regelbog: betinget, source_season=2018/19 (fastlagt=false), afstand=5. PDF s. 1: “Revideret 1. august 2018”; PDF’en angiver ingen anvendelsessæson. Datoen understøtter revisionsdatoen, men ikke alene sæsonen 2018/19 eller afstanden. | uklart |
| 13 | 2024/25 · veteran · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland | betinget | `west-dgi-senior-rules-date-2020-fileid-87130 — 2020/badminton-midt-og-soenderjylland-dgi-midtsyd/hybrid-senior-reglement-effective-2020-09-10.pdf` | Regelbog: betinget, source_season=2020/21 (fastlagt=false), afstand=4. PDF s. 1: “Gældende pr. 10-09-2020”; ingen eksplicit sæson fundet. Årstal/dato alene afgør ikke sæsonen eller afstanden uden en antagelse. | uklart |
| 14 | 2026/27 · veteran · Badminton Sjælland + DGI Nordsjælland, Midt- og Vestsjælland, Storstrømmen | betinget | `sjaelland-veteran-2022-docdate — 2022/badminton-sjaelland/sjaelland-veteran-2022-docdate.pdf` | Regelbog: betinget, source_season=2022/23 (fastlagt=false), afstand=4. PDF s. 2: “Pr 1/9-2022”; ingen eksplicit sæson fundet. Datoen bekræfter dokumentets dato, ikke sæson/afstand. | uklart |
| 15 | 2024/25 · senior · Badminton Fyn | betinget | `fyn-senior-veteran-reglement-date-2018-fileid-77210 — 2018/badminton-fyn/fyn-senior-veteran-reglement-revised-2018-08-01.pdf` | Regelbog: betinget, source_season=2018/19 (fastlagt=false), afstand=6. PDF s. 1: “Revideret 1. august 2018”; anvendelsessæson står ikke i PDF’en. Sæson/afstand kan ikke uafhængigt fastslås. | uklart |
| 16 | 2026/27 · senior · Badminton Fyn | betinget | `fyn-senior-veteran-reglement-date-2018-fileid-77210 — 2018/badminton-fyn/fyn-senior-veteran-reglement-revised-2018-08-01.pdf` | Regelbog: betinget, source_season=2018/19 (fastlagt=false), afstand=8. PDF s. 1: “Revideret 1. august 2018”; anvendelsessæson står ikke i PDF’en. Sæson/afstand kan ikke uafhængigt fastslås. | uklart |
| 17 | 2023/24 · veteran · Badminton Sjælland (tidl. SBKr.) | betinget | `sj-veteran-2013-14-season-conflict — 2013/badminton-sjaelland/sj-veteran-2013-14-season-conflict.pdf` | Regelbog: betinget, source_season=2013/14, afstand=10, fastlagt=true. PDF s. 1 modsiger sig selv: titel “2013/2014”, brødtekst “2012/2013”. Derfor kan kilde-sæson og afstand ikke bekræftes entydigt. | uklart |
| 18 | 2025/26 · senior · Badminton Sjælland + DGI Nordsjælland, Midt- og Vestsjælland, Storstrømmen | betinget | `sjaelland-senior-2025-docdate — 2025/badminton-sjaelland/sjaelland-senior-reglement-docdate-2025.pdf` | Regelbog: betinget, source_season=2025/26 (fastlagt=false), afstand=0. PDF s. 1: “Reglement for Seniorholdturnering - Pr 1/9-2025.” Ingen eksplicit sæsonangivelse. At den daterede fil gælder 2025/26 og kan fungere som “tidligere” kilde til samme sæson kan ikke bekræftes ud fra PDF-teksten. | uklart |
| 19 | 2022/23 · veteran · Badminton København | betinget | `kbh-rules-2020-21-fileid-86810 — 2020/badminton-koebenhavn/kbh-holdturneringsreglement-2020-21.pdf` | Regelbog: betinget, kilde-sæson 2020/21, afstand=2, fastlagt=true. PDF s. 1: “holdturnering 2020-2021 (version 2020-0)”; samme side viser versions-/dokumentdato 21.08.2020. Sæsonen og afstanden til 2022/23 stemmer. | ok |
| 20 | 2020/21 · veteran · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland | betinget | `west-dgi-senior-rules-date-2020-fileid-87130 — 2020/badminton-midt-og-soenderjylland-dgi-midtsyd/hybrid-senior-reglement-effective-2020-09-10.pdf` | Regelbog: betinget, source_season=2020/21 (fastlagt=false), afstand=0. PDF s. 1: “Gældende pr. 10-09-2020”; ingen sæson nævnes. Da kilde-sæsonen er udledt og feltets afstand er nul, kan brugen som tidligere kilde til 2020/21 ikke afgøres efter reglen uden at gætte. | uklart |
| 21 | 2015/16 · veteran · Badminton Sjælland (tidl. SBKr.) | betinget | `sj-veteran-2013-14-season-conflict — 2013/badminton-sjaelland/sj-veteran-2013-14-season-conflict.pdf` | Regelbog: betinget, kilde-sæson 2013/14, afstand=2. PDF s. 1 angiver både titel 2013/2014 og turnering 2012/2013. Modstriden gør valgt kilde-sæson og arveafstand uklar. | uklart |
| 22 | 2019/20 · senior · Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland | betinget | `west-series-rules-2018-19-fileid-77211 — 2018/badminton-kredsserie-vest/kredsserie-vest-serie1-1819.pdf` | Regelbog: betinget, source_season=2018/19 (fastlagt=false), afstand=1. PDF s. 1 identificerer Kredsserien Vest/Serie 1 Vest, men intet sæsonår; gennemgang af alle 13 sider fandt ingen sæsonangivelse. Sæson og afstand kan ikke verificeres fra filen. | uklart |
| 23 | 2022/23 · ungdom · Badminton København | betinget | `kbh-rules-2020-21-fileid-86810 — 2020/badminton-koebenhavn/kbh-holdturneringsreglement-2020-21.pdf` | Regelbog: betinget, kilde-sæson 2020/21, afstand=2, fastlagt=true. PDF s. 1: “holdturnering 2020-2021 (version 2020-0)”. Sæsonen og afstanden til 2022/23 stemmer. | ok |
| 24 | 2022/23 · veteran · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland | betinget | `west-dgi-senior-rules-date-2020-fileid-87130 — 2020/badminton-midt-og-soenderjylland-dgi-midtsyd/hybrid-senior-reglement-effective-2020-09-10.pdf` | Regelbog: betinget, source_season=2020/21 (fastlagt=false), afstand=2. PDF s. 1: “Gældende pr. 10-09-2020”; ingen eksplicit sæson. Sæson/afstand kan ikke fastslås uden en antagelse. | uklart |
| 25 | 2022/23 · veteran · Badminton Fyn | betinget | `fyn-senior-veteran-reglement-date-2018-fileid-77210 — 2018/badminton-fyn/fyn-senior-veteran-reglement-revised-2018-08-01.pdf` | Regelbog: betinget, source_season=2018/19 (fastlagt=false), afstand=4. PDF s. 1: “Revideret 1. august 2018”; PDF’en angiver ingen anvendelsessæson. Arveafstanden kan derfor ikke bekræftes selvstændigt. | uklart |
| 26 | 2016/17 · veteran · DGI Midt- og Vestsjælland + Nordsjælland + Badminton Sjælland + København | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 27 | 2019/20 · senior · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 28 | 2016/17 · ungdom · Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 29 | 2016/17 · veteran · Sjællands Badminton Kreds (SBKr.; historisk forgænger til Badminton Sjælland) | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 30 | 2013/14 · ungdom · Badminton København | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 31 | 2011/12 · senior · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 32 | 2015/16 · senior · Badminton Danmark | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 33 | 2013/14 · ungdom · DGI Midt- og Vestsjælland + Nordsjælland | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 34 | 2016/17 · senior · Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 35 | 2017/18 · senior · DGI Sjælland / Badminton Sjælland | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 36 | 2024/25 · ungdom · DGI Midt- og Vestsjælland + Nordsjælland + Badminton Sjælland + København | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 37 | 2026/27 · veteran · Sjællands Badminton Kreds (SBKr.; historisk forgænger til Badminton Sjælland) | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 38 | 2022/23 · senior · DGI Midt- og Vestsjælland + Nordsjælland | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 39 | 2026/27 · veteran · DGI Midt- og Vestsjælland + Nordsjælland + Badminton Sjælland + København | ingen | `—` | Intet kilde-PDF (ingen). Registerkontrol: ingen tidligere post for samme målgruppe og områdeversioner. | ok |
| 40 | 2021/22 · veteran · Badminton Fyn | betinget | `fyn-senior-veteran-reglement-date-2018-fileid-77210 — 2018/badminton-fyn/fyn-senior-veteran-reglement-revised-2018-08-01.pdf` | Regelbog: betinget, source_season=2018/19 (fastlagt=false), afstand=3. PDF s. 1: “Revideret 1. august 2018”; ingen anvendelsessæson. Kan ikke afgøre, om filen er en tidligere kilde for 2021/22 eller validere afstanden uden at gætte. | uklart |

### Seedudtræk

Nedenstående er det præcise, ordnede udtræk; feltidentiteten er sæson, målgruppe og områdenavn i regelbogen.

1. `2023/24 · senior · Badminton Nordjylland + DGI Nordjylland` — `bekraeftet`
2. `2026/27 · senior · Badminton Danmark` — `bekraeftet`
3. `2023/24 · ungdom · Badminton Danmark + DGI Badminton` — `bekraeftet`
4. `2024/25 · veteran · Badminton Nordjylland + DGI Nordjylland` — `bekraeftet`
5. `2019/20 · ungdom · Badminton Danmark + DGI Badminton` — `bekraeftet`
6. `2018/19 · senior · Badminton Nordjylland` — `bekraeftet`
7. `2025/26 · veteran · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland` — `bekraeftet`
8. `2015/16 · senior · Badminton København` — `bekraeftet`
9. `2018/19 · senior · Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland` — `bekraeftet`
10. `2018/19 · ungdom · Badminton Danmark + DGI Badminton` — `bekraeftet`
11. `2026/27 · veteran · Badminton Sjælland (tidl. SBKr.)` — `betinget`; svag
12. `2023/24 · senior · Badminton Fyn` — `betinget`; svag
13. `2024/25 · veteran · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland` — `betinget`; svag
14. `2026/27 · veteran · Badminton Sjælland + DGI Nordsjælland, Midt- og Vestsjælland, Storstrømmen` — `betinget`; svag
15. `2024/25 · senior · Badminton Fyn` — `betinget`; svag
16. `2026/27 · senior · Badminton Fyn` — `betinget`; svag
17. `2023/24 · veteran · Badminton Sjælland (tidl. SBKr.)` — `betinget`; svag
18. `2025/26 · senior · Badminton Sjælland + DGI Nordsjælland, Midt- og Vestsjælland, Storstrømmen` — `betinget`
19. `2022/23 · veteran · Badminton København` — `betinget`
20. `2020/21 · veteran · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland` — `betinget`
21. `2015/16 · veteran · Badminton Sjælland (tidl. SBKr.)` — `betinget`
22. `2019/20 · senior · Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland` — `betinget`
23. `2022/23 · ungdom · Badminton København` — `betinget`
24. `2022/23 · veteran · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland` — `betinget`
25. `2022/23 · veteran · Badminton Fyn` — `betinget`; svag
26. `2016/17 · veteran · DGI Midt- og Vestsjælland + Nordsjælland + Badminton Sjælland + København` — `ingen`
27. `2019/20 · senior · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland` — `ingen`
28. `2016/17 · ungdom · Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland` — `ingen`
29. `2016/17 · veteran · Sjællands Badminton Kreds (SBKr.; historisk forgænger til Badminton Sjælland)` — `ingen`
30. `2013/14 · ungdom · Badminton København` — `ingen`
31. `2011/12 · senior · Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland` — `ingen`
32. `2015/16 · senior · Badminton Danmark` — `ingen`
33. `2013/14 · ungdom · DGI Midt- og Vestsjælland + Nordsjælland` — `ingen`
34. `2016/17 · senior · Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland` — `ingen`
35. `2017/18 · senior · DGI Sjælland / Badminton Sjælland` — `ingen`
36. `2024/25 · ungdom · DGI Midt- og Vestsjælland + Nordsjælland + Badminton Sjælland + København` — `ingen`
37. `2026/27 · veteran · Sjællands Badminton Kreds (SBKr.; historisk forgænger til Badminton Sjælland)` — `ingen`
38. `2022/23 · senior · DGI Midt- og Vestsjælland + Nordsjælland` — `ingen`
39. `2026/27 · veteran · DGI Midt- og Vestsjælland + Nordsjælland + Badminton Sjælland + København` — `ingen`
40. `2021/22 · veteran · Badminton Fyn` — `betinget`; svag

## Kontroller af registerhenvisninger og checksums

Alle kilde-id’er i stikprøvens kilde/versioner blev fundet i `register.json`; de havde `source_url`, `retrieved_at` og `sha256`. Ingen registerhenvisning manglede. SHA-256 blev beregnet for fem tilfældige, forskellige PDF’er fra stikprøvens kilder med samme seed; alle fem stemte:

- `manuelt/Nordjylland_seniorhold_serie2-4_2018-19.pdf` — match (`785d14908a99843dd4cee694b33b5e4993424835f203c1148e2abd9de607ada4`).
- `2023/badminton-nordjylland/nordjylland-senior-veteran-2023-24.pdf` — match (`4bfac3587790276029911012b6e869430177c6e8075a65c0c7dd7a31365ebc02`).
- `2024/badminton-nordjylland/nordjylland-senior-veteran-2024-25.pdf` — match (`db2defc30e523da3c8f30790261a5192f404cef38f70abd744d793864a20030b`).
- `2025/badminton-sønderjylland-og-midtjylland-dgi-østjylland-vestjylland-sydvest-midtjylland-sønderjylland-sydøstjylland/west-senior-veteran-2025-26.pdf` — match (`332de0d3a6e0ef70d6ea8ab499396b641d2a5157e55f2a2c60a01f9eca06989a`).
- `2020/badminton-koebenhavn/kbh-holdturneringsreglement-2020-21.pdf` — match (`c5d809574e2515507af54703e51fdf7a9e764a8db406f8b7a83f03af8812ea8c`).

## “Ingen”-felter

De 14 stikprøveposter med status “ingen” blev slået op i registeret mod deres områdenavne/varianter og målgruppe. Ingen tidligere kildepost blev fundet. Det understøtter disse statusser inden for det register, der forelå; PDF-teksten er ikke relevant, da feltet ikke peger på en PDF.

## Sammenlagte områdenavne

- **Badminton Danmark + DGI Badminton**: varianterne `Badminton Danmark + DGI Badminton; DGI Badminton + Badminton Danmark`. Registertitlerne viser samme navngivne organisationer ved rækkefølge-/forkortelsesforskel. PDF-udtræk virkede nu, men denne genkørsel kontrollerede ikke systematisk alle dokumenters områdeafgrænsning; fuld PDF-baseret bekræftelse af gruppen står fortsat **uklar**.
- **Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland**: varianterne `Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland; Badminton Fyn, Sønderjylland, Nordjylland og Midtjylland`. Registertitlerne viser samme navngivne organisationer ved rækkefølge-/forkortelsesforskel. PDF-udtræk virkede nu, men denne genkørsel kontrollerede ikke systematisk alle dokumenters områdeafgrænsning; fuld PDF-baseret bekræftelse af gruppen står fortsat **uklar**.
- **Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland**: varianterne `Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland; DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland samt Badminton Sønderjylland og Midtjylland`. Registertitlerne viser samme navngivne organisationer ved rækkefølge-/forkortelsesforskel. PDF-udtræk virkede nu, men denne genkørsel kontrollerede ikke systematisk alle dokumenters områdeafgrænsning; fuld PDF-baseret bekræftelse af gruppen står fortsat **uklar**.

## Fem særlige tests

- **Ungdom national 2017/18:** betinget, kilde `bd-dgi-youth-2016-17-manual`, afstand 1. PDF s. 1 angiver 2016/2017; sæson og afstand 1 stemmer.
- **Ungdom national 2010/11:** regelbogen siger ingen; registeret har ingen tidligere ungdomskilde for den nationale kæde. Status er understøttet af registerkontrollen.
- **Ungdom København 2021/22:** betinget fra `kbh-rules-2020-21-fileid-86810`, afstand 1. PDF s. 1 siger “holdturnering 2020-2021 (version 2020-0)”; sæsonen og afstanden stemmer med feltet.
- **Ungdom national 2025/26:** PDF s. 1 angiver “2025/2026”. På s. 13 står “Dette reglement erstatter pr. 01-07-2025” og at nødvendige ændringer mellem 01-07-2025 og 30-06-2026 indføjes løbende. PDF’en angiver altså ikrafttræden 1. juli 2025, men nævner ikke revisionsdatoen 8. oktober 2025; datoen i revisionsfilens navn/registertitel er ikke uafhængigt bekræftet af PDF-teksten.
- **Ungdom national 2023/24:** PDF s. 2 henviser til “tillægsreglement for Danske Mesterskaber for Ungdomshold (DMU Hold)”. Der er dog ingen særskilt 2023/24 DMU-PDF/post i det lokale register eller reglementmappen (DMU-posterne dér er 2025/26 og 2026/27). Hovedreglementet dokumenterer altså et tillæg, men den separate 2023/24-kilde mangler i det afgrænsede kildesæt; dens eksterne eksistens er ukendt.

## Samlet vurdering

Domme i stikprøven: **24 ok, 2 afvigelser, 14 uklare**. Afvigelsesraten er **2/40 = 5 %** for alle felter; blandt de 26 afgørlige felter er den **2/26 = 7,7 %**. Afvigelserne er #7 (PDF’en fastlægger ikke 2025/26, men posten er bekræftet og markeret fastlagt) og #9 (PDF’en angiver ingen sæson, men posten er bekræftet). De uklare er #11–18, #20–22, #24–25 og #40: dokumentet har modstridende sæsoner (#11/#17/#21), eller kun dato/revisionsdato uden selvangivet sæson (#12–16/#18/#20/#22/#24/#25/#40). Regelbogen kan ikke bruges uforbeholdent til disse felter; de to afvigelser kræver rettelse/afklaring, og de 14 uklare kræver kildemæssig vurdering.

