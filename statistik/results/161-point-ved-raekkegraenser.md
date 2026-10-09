# Opgave 161 — point ved rækkegrænser

Badmintonplayer-kald: 23; badminton.dk: 0. Alle råsvar uden kontekstnøgle i `statistik/results/161-raa-svar/`.

## 1. Sideplan og genbrug

Vindue pr. grænse er N−30…N og N+1…N+30. Sideindeks er 0-baserede. 159-sider blev genbrugt; kun manglende sider hentet.

| Køn | Nødvendige sider | Genbrugt 159 | Nye 161-sider |
|---|---|---|---|
| M | 0,1,2,3,4,6,7,19,20,24,25,34,35,39,40,49,50,59,60 | 0,2,3,4,6,7 | 1,19,20,24,25,34,35,39,40,49,50,59,60 |
| K | 0,1,2,3,4,5,9,10,11,12,16,17,18,19,23,24,25,26 | 0,1,2,3,4,5,9,10,11 | 12,16,17,18,19,23,24,25,26 |

K/M-kontrol: K gemt side 1 SHA-redacted `b566c3022fb48708aa8f5c1134be252fd7d4eb253468336beca51ff2e117f454`; M ny side 1 `7eaf0f0b4a85e8859329d93c1a392aa22f7632310fde7ada69b319bf881edcb8`; ens=False.

## 2–3. Pointkobling og grænser

Join: præcis profil-ID-streng fra 287 mod `ranking_points.player_id`; punkter fra 2026-10-07, 288=single, 289=double, 292=mix, samme K/M. Percentiler er lineær interpolation (type 7).

| Køn | N/N+1 | Vindue (spillere; rankspænd) | Koblet | N-30…N højeste p25/median/p75 | N+1…N+30 højeste p25/median/p75 | N og N+1 højeste point | Lavere side > øvre median |
|---|---:|---:|---:|---|---|---|---:|
| M | 40/41 | 61 spillere (rankspænd 61) | 61/61 (100.0%) | 4582.0/4679.0/4817.5 (n=31) | 4093.0/4297.5/4346.75 (n=30) | 4380.0 / 4346.0 | 0/30 (0.0%) |
| M | 200/201 | 61 spillere (rankspænd 61) | 57/61 (93.4%) | 3559.25/3578.0/3616.5 (n=30) | 3491.0/3510.0/3557.0 (n=27) | 3529.0 / 3569.0 | 4/27 (14.8%) |
| M | 400/401 | 64 spillere (rankspænd 61) | 61/64 (95.3%) | 3309.0/3324.0/3347.25 (n=30) | 3299.0/3310.0/3338.0 (n=31) | 3307.0 / 3297.0, 3340.0, None, 3291.0 | 14/31 (45.2%) |
| M | 700/701 | 61 spillere (rankspænd 61) | 59/61 (96.7%) | 3152.0/3165.0/3189.0 (n=35) | 3152.25/3161.0/3233.0 (n=24) | 3190.0, 3166.0, 3185.0, 3161.0, 3150.0, 3137.0 / ingen eksakt rank | 11/24 (45.8%) |
| M | 2000/2001 | 61 spillere (rankspænd 61) | 60/61 (98.4%) | 2650.75/2667.0/2688.5 (n=28) | 2617.75/2630.5/2695.0 (n=32) | ingen eksakt rank / 2650.0, 2628.0 | 10/32 (31.2%) |
| M | 2500/2501 | 63 spillere (rankspænd 61) | 60/63 (95.2%) | 2447.0/2476.0/2529.0 (n=29) | 2439.5/2467.0/2520.5 (n=31) | 2494.0 / 2470.0, 2441.0 | 13/31 (41.9%) |
| M | 3500/3501 | 59 spillere (rankspænd 61) | 57/59 (96.6%) | 2153.5/2169.0/2194.5 (n=31) | 2145.25/2147.0/2186.25 (n=26) | ingen eksakt rank / ingen eksakt rank | 10/26 (38.5%) |
| M | 4000/4001 | 62 spillere (rankspænd 61) | 59/62 (95.2%) | 2033.25/2043.5/2102.75 (n=30) | 2030.0/2052.0/2100.0 (n=29) | 2033.0, 2029.0 / ingen eksakt rank | 17/29 (58.6%) |
| M | 5000/5001 | 66 spillere (rankspænd 61) | 66/66 (100.0%) | 1850.0/1856.5/1890.25 (n=32) | 1845.5/1870.0/1927.25 (n=34) | ingen eksakt rank / ingen eksakt rank | 20/34 (58.8%) |
| M | 6000/6001 | 61 spillere (rankspænd 61) | 61/61 (100.0%) | 1729.0/1730.0/1735.5 (n=31) | 1727.0/1728.0/1737.0 (n=30) | ingen eksakt rank / ingen eksakt rank | 10/30 (33.3%) |
| K | 40/41 | 61 spillere (rankspænd 61) | 61/61 (100.0%) | 3466.0/3517.0/3616.5 (n=31) | 3321.25/3341.0/3372.75 (n=30) | 3450.0 / 3396.0 | 0/30 (0.0%) |
| K | 150/151 | 64 spillere (rankspænd 61) | 60/64 (93.8%) | 3016.5/3030.5/3075.5 (n=30) | 2939.5/2963.5/2996.0 (n=30) | 3022.0 / 3203.0 | 4/30 (13.3%) |
| K | 300/301 | 62 spillere (rankspænd 61) | 57/62 (91.9%) | 2763.75/2780.5/2799.25 (n=32) | 2745.0/2765.0/2800.0 (n=25) | 2758.0, 2882.0, 2774.0 / ingen eksakt rank | 9/25 (36.0%) |
| K | 500/501 | 61 spillere (rankspænd 61) | 60/61 (98.4%) | 2606.5/2625.0/2640.5 (n=30) | 2581.5/2593.5/2630.75 (n=30) | ingen eksakt rank / 2668.0, 2600.0 | 9/30 (30.0%) |
| K | 1000/1001 | 65 spillere (rankspænd 61) | 61/65 (93.8%) | 2291.0/2316.0/2340.0 (n=31) | 2281.25/2296.5/2313.25 (n=30) | ingen eksakt rank / ingen eksakt rank | 7/30 (23.3%) |
| K | 1200/1201 | 60 spillere (rankspænd 61) | 59/60 (98.3%) | 2190.0/2211.5/2237.25 (n=30) | 2164.0/2184.0/2201.0 (n=29) | 2222.0 / 2162.0, 2276.0 | 6/29 (20.7%) |
| K | 1700/1701 | 61 spillere (rankspænd 61) | 57/61 (93.4%) | 1882.0/1899.0/1925.5 (n=27) | 1874.25/1891.5/1924.25 (n=30) | 1861.0, 1888.0 / ingen eksakt rank | 12/30 (40.0%) |
| K | 1900/1901 | 64 spillere (rankspænd 61) | 62/64 (96.9%) | 1784.0/1794.0/1835.0 (n=31) | 1762.5/1778.0/1807.0 (n=31) | 1814.0, 1892.0 / ingen eksakt rank | 12/31 (38.7%) |
| K | 2400/2401 | 61 spillere (rankspænd 61) | 60/61 (98.4%) | 1560.0/1577.0/1609.0 (n=37) | 1559.5/1567.0/1597.0 (n=23) | 1572.0, 1620.0, 1554.0, 1554.0, 1554.0, 1555.0, 1556.0 / ingen eksakt rank | 8/23 (34.8%) |
| K | 2600/2601 | 62 spillere (rankspænd 61) | 56/62 (90.3%) | 1518.5/1522.0/1541.0 (n=31) | 1518.0/1525.0/1552.0 (n=25) | ingen eksakt rank / ingen eksakt rank | 16/25 (64.0%) |

Disciplinernes p25/median/p75 og spillere med præcis N og N+1 ligger for hver grænse i JSON (`boundaries`). Rangplaceringer kan være delte; derfor kan flere spillere have samme N, og rangtal kan springes over.

Kobling på unionen af vinduer: M 601/619 (97.1%); K 593/621 (95.5%).
Vinduer med kobling under 70%: 0.

## 4. Empiriske punktområder pr. række og køn

P25–p75 er fra op til 30 spillere inden for rækkens interval ved nærmeste rand(e); det er en empirisk tilnærmelse, ikke en pointformel.

| Køn | Række | Placering | Højeste point p25–p75 | Single | Double | Mix | Randspillere |
|---|---|---:|---|---|---|---|---:|
| M | E | 1–40 | 4632.5–4850.0 (n=40) | 4561.5–4812.5 (n=15) | 4483.5–4772.5 (n=30) | 4343.75–4828.0 (n=22) | 40 |
| M | E-M | 41–200 | 3578.0–4297.5 (n=59) | 3529.0–4299.0 (n=41) | 3459.75–3846.75 (n=56) | 3346.5–3952.5 (n=27) | 60 |
| M | M | 201–400 | 3323.5–3504.0 (n=56) | 3286.0–3497.0 (n=41) | 3295.5–3436.5 (n=56) | 3206.75–3341.0 (n=24) | 60 |
| M | M-A | 401–700 | 3162.75–3307.75 (n=66) | 3144.0–3291.0 (n=49) | 3130.5–3265.5 (n=66) | 2941.0–3243.0 (n=29) | 68 |
| M | A | 701–2000 | 2667.0–3156.25 (n=52) | 2633.5–3123.0 (n=39) | 2610.0–3140.75 (n=52) | 2577.0–2862.0 (n=29) | 55 |
| M | A-B | 2001–2500 | 2481.75–2633.75 (n=60) | 2507.75–2619.75 (n=32) | 2444.5–2616.25 (n=60) | 2227.25–2531.5 (n=28) | 61 |
| M | B | 2501–3500 | 2170.0–2465.25 (n=62) | 2170.0–2479.5 (n=31) | 2151.0–2427.0 (n=61) | 2043.0–2352.0 (n=25) | 63 |
| M | B-C | 3501–4000 | 2043.5–2166.5 (n=51) | 1984.0–2189.0 (n=21) | 2033.0–2146.0 (n=51) | 1685.5–2037.25 (n=22) | 55 |
| M | C | 4001–5000 | 1858.5–2055.75 (n=54) | 1897.5–2100.75 (n=28) | 1848.25–2023.75 (n=54) | 1630.0–1963.0 (n=23) | 55 |
| M | C-D | 5001–6000 | 1730.0–1870.0 (n=65) | 1748.25–1936.5 (n=26) | 1724.5–1843.0 (n=64) | 1574.0–1735.5 (n=27) | 65 |
| M | D | 6001–∞ | 1727.0–1737.0 (n=30) | 1706.5–1761.5 (n=10) | 1727.0–1728.0 (n=29) | 1591.5–1702.5 (n=4) | 30 |
| K | E | 1–40 | 3479.25–3654.75 (n=40) | 3486.0–3650.25 (n=20) | 3425.25–3492.25 (n=26) | 3306.0–3645.75 (n=22) | 40 |
| K | E-M | 41–150 | 3030.5–3341.0 (n=59) | 2955.75–3321.25 (n=28) | 3005.0–3301.0 (n=53) | 2947.0–3252.75 (n=42) | 60 |
| K | M | 151–300 | 2777.0–2963.0 (n=61) | 2776.5–2960.0 (n=39) | 2739.5–2927.0 (n=59) | 2694.75–2829.0 (n=44) | 65 |
| K | M-A | 301–500 | 2624.0–2765.0 (n=53) | 2560.0–2723.0 (n=25) | 2577.0–2736.0 (n=53) | 2563.5–2697.25 (n=40) | 58 |
| K | A | 501–1000 | 2320.5–2593.25 (n=60) | 2281.0–2572.0 (n=29) | 2275.0–2570.25 (n=60) | 2272.5–2573.5 (n=43) | 61 |
| K | A-B | 1001–1200 | 2212.75–2297.25 (n=60) | 2171.25–2293.5 (n=30) | 2150.0–2234.5 (n=59) | 2105.5–2262.75 (n=44) | 63 |
| K | B | 1201–1700 | 1899.75–2185.25 (n=56) | 1845.75–2181.0 (n=22) | 1877.75–2148.5 (n=52) | 1827.0–2145.0 (n=41) | 60 |
| K | B-C | 1701–1900 | 1799.0–1896.0 (n=57) | 1785.5–1927.0 (n=27) | 1711.0–1806.0 (n=55) | 1622.0–1872.0 (n=49) | 59 |
| K | C | 1901–2400 | 1573.5–1777.5 (n=63) | 1586.0–1790.0 (n=29) | 1545.0–1738.0 (n=61) | 1490.0–1668.0 (n=50) | 64 |
| K | C-D | 2401–2600 | 1522.0–1569.0 (n=49) | 1544.0–1622.75 (n=16) | 1497.75–1541.5 (n=46) | 1328.5–1534.25 (n=40) | 53 |
| K | D | 2601–∞ | 1518.0–1552.0 (n=25) | 1509.25–1578.5 (n=12) | 1466.0–1522.0 (n=25) | 1351.5–1515.0 (n=19) | 28 |

Tre opslagseksempler pr. kortets stikprøvekrav:

| Køn | Placering | Spiller | Række | Højeste disciplinpoint | Single | Double | Mix |
|---|---:|---|---|---:|---:|---:|---:|
| M | 40 | William Bøgebjerg , Hvidovre | SEN E | 4380.0 | 4380.0 | None | None |
| K | 40 | Sara Lundgaard , Skovshoved | SEN E | 3450.0 | None | 3450.0 | 3302.0 |
| M | 200 | Thor Christtreu , Ribe | SEN E-M | 3529.0 | 3529.0 | 3460.0 | 3311.0 |

## 5. Ungdomsopslagstabel (uden nye kald)

| Alder | Køn | Rækker | Intervaller fra gemte rapporter |
|---|---|---|---|
| U9 | M | ukendt præcist; ingen placeringsrækker ifølge 159/160 | ukendt i gemte rapporter |
| U11 | M | ukendt præcist; ingen placeringsrækker ifølge 159/160 | ukendt i gemte rapporter |
| U13 | M | M; M-A; A | M placering 1–24; M-A 25–48; A fra 49 med >1525 point |
| U15 | M | E; E-M; M; A; B; C; D | E placering 1–24 (top-8-undtagelse pr. disciplin); E-M 25–36; M fra 37 hvis >1850; A >1601–1850; B >1375–1600; C >1200–1375; D ≤1200 |
| U17 | M | E; E-M; M; lavere rækker ukendt | E placering 1–24 (top-8-undtagelse pr. disciplin); E-M 25–36; M fra 37 hvis >2150; lavere punktintervaller ukendt |
| U19 | M | ukendt præcist; ingen placeringsrækker ifølge 159/160 | ukendt i gemte rapporter |
| U9 | K | ukendt præcist; ingen placeringsrækker ifølge 159/160 | ukendt i gemte rapporter |
| U11 | K | ukendt præcist; ingen placeringsrækker ifølge 159/160 | ukendt i gemte rapporter |
| U13 | K | M; M-A; A | M placering 1–24; M-A 25–48; A fra 49 med >1350 point |
| U15 | K | E; E-M; M; A; B; C; D | E placering 1–24 (top-8-undtagelse pr. disciplin); E-M 25–36; M fra 37 hvis >1500; A >1350–1500; B >1225–1350; C >1125–1225; D ≤1125 |
| U17 | K | E; E-M; M; lavere rækker ukendt | E placering 1–24 (top-8-undtagelse pr. disciplin); E-M 25–36; M fra 37 hvis >1700; lavere punktintervaller ukendt |
| U19 | K | ukendt præcist; ingen placeringsrækker ifølge 159/160 | ukendt i gemte rapporter |

Præcise oplysninger, der ikke fremgår af 159/160, står som ukendt. Ingen reglement blev genhentet.

**Tilføjet af Claude 2026-10-09:** de manglende intervaller (U9, U11, U19 og U17's lavere rækker) står i `161-ungdom-reglement-2026-27.md`.

## 6. Double og mix

Reglementnoterne siger, at doublespillerækken beregnes ud fra parrets samlede point divideret med to. Hvis en pointtærskel T er kendt, svarer det til parsum 2T; for voksne er T ukendt, fordi rækken afgøres af placering. De tre disciplinranglistepoint kan ikke sidestilles med det vægtede tilmeldingsniveau uden ukendte koefficienter.

## 7. Anbefaling

Tabellen er kun en grov empirisk pejling: fordelinger på nabogrænser kan overlappe, og den kan ikke give et officielt “skal have X point”. Skarpere svar kræver officielle tilmeldingsniveau-koefficienter og historiske snapshots; double/mix kræver parrets point på den dokumenterede tilmeldingsniveau-skala.

## Forespørgselslog

Fuld log med method, filterfelter, HTTP-status, bytes og rå SHA-256 i JSON `request_log.calls`; alle gemte råsvar har redigeret context key.

## Databasekontrol

Alle fem hashes før arbejdet er kortets forventede værdier; efterhashes står nedenfor og i JSON. **Rettet af Claude 2026-10-09:** scriptet sammenlignede hashene med store mod små bogstaver og skrev derfor AFVIGER ved alle fem; de er identiske (sammenlignet uden hensyn til store/små bogstaver), så alle fem databaser er uændrede. SQLite blev åbnet `mode=ro` med `PRAGMA query_only=ON`.
- `gsb-statistik-normalized.db`: før `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; efter `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e`; uændret.
- `liga-landskab.db`: før `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; efter `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c`; uændret.
- `rangliste-historik.db`: før `6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F`; efter `6e9516db643f88f88946a82cb76ec3b5c686c7d548abf7084b3f60ee3da0316f`; uændret.
- `national-spillere.db`: før `1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E`; efter `1e27c5d81cce8e2d656df2c924e4bf6931eeaaf86348add384ab6d58f7cbac3e`; uændret.
- `rangliste-point.db`: før `DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9`; efter `dabe3a12acecd763e537087f0e16855ad39df298234eb03ff111a3366100d1b9`; uændret.

### Forespørgsler: felter, status, bytes og svarhash

| Nr. | Metode | Felter / filter | Status | Bytes | SHA-256 |
|---:|---|---|---:|---:|---|
| 1 | GET | {} | 200 | 24149 | `4489b5790458659a5bb470efbce799006bbedb092ff3bd778d7f521d46ba3104` |
| 2 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"1"} | 200 | 62974 | `7eaf0f0b4a85e8859329d93c1a392aa22f7632310fde7ada69b319bf881edcb8` |
| 3 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"12"} | 200 | 62991 | `481a2b6c6294f7fb989813124a0c0b39f0b21509e486a4456af5e5438eb3b797` |
| 4 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"16"} | 200 | 62819 | `be71bfbf4f50dc3c3ab77462068d1ec7b7173e4e6ed45d55703b9d0d3e07aafe` |
| 5 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"17"} | 200 | 63473 | `82dbcd20ec3f996e4fd4cf34f77e24533b0a370d164db5532144fb2880dc6f0c` |
| 6 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"18"} | 200 | 63475 | `d9e4d025fbf1f3802f3ef0c2ac6aaf786f04310dc7f3e15b75761233baa02859` |
| 7 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"19"} | 200 | 63357 | `85c86476d334acef5fd1e6262675828211b4f928d2fd65a47833ea6f75e36d35` |
| 8 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"23"} | 200 | 63423 | `211b7413807a9996876d177e9ff75d6de1e76784f623b6749bff94036117c84c` |
| 9 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"24"} | 200 | 63144 | `3adc6f96b2f4f75ca6834538398ce9ac9f97c42d6bbe8b4378c8bbc7dbb6670c` |
| 10 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"25"} | 200 | 63459 | `adb41a170655d77fd9d819b05b9944cd7e07cef5d592ae6a5d229781c0956d6d` |
| 11 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"K","pageindex":"26"} | 200 | 63359 | `1a9cfc64b585a8874bf1cf62fca755170ad0c699685caf55b7e0046233d33829` |
| 12 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"19"} | 200 | 63099 | `c32364b00e7b02be7b816789eefd5b0a3fbb61562fbd0b00cd19c02ea581301b` |
| 13 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"20"} | 200 | 63314 | `082e956a752f21b1ae047799b0ecaefdb7e1b8efc095741e0e15978477559112` |
| 14 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"24"} | 200 | 63248 | `7912b76776b41ed8cf6622223c2f117bbd79646b437033b8520d7d2387ddad7b` |
| 15 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"25"} | 200 | 62815 | `3b79de1c4ab7d5b053ffe1ad24d6ac0ee77db245bb8c5d5a6ecdab3595820546` |
| 16 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"34"} | 200 | 63085 | `3e53bacb2286e75b6d403841092b3d1d76a40b55726909a7175c795de6d61ce3` |
| 17 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"35"} | 200 | 63307 | `01e0346443b5b54bac11095e4d1f89ced34cf74941a151f9930762f844722c8e` |
| 18 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"39"} | 200 | 63024 | `5f73156a14e33939562f4eb7035acb4293f74eb82dcd576b7b274fc8de7288a1` |
| 19 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"40"} | 200 | 63147 | `c6a95247d98778ee2a5f204679ebe2a75bf9b563987d59782b013bb6b8b61e9c` |
| 20 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"49"} | 200 | 63338 | `7816348850a15f34f75a38e0c989fd828ae62057c393711acdecd584f4bc8d03` |
| 21 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"50"} | 200 | 63025 | `802848d3ccf12bfb6ae6fc57761f8d7c5dde1be3af9d8e1f8b2b6f1e50dca5ae` |
| 22 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"59"} | 200 | 63258 | `c194548e694e56fe6043d2a2e8ca2df31e0e8021b7293300dcbf1da314fdf227` |
| 23 | POST | liste=287, param='', {"rankinglistagegroupid":"15","seasonid":"2026","gender":"M","pageindex":"60"} | 200 | 63179 | `70bf33314562a940e0b6b329a217b1cf0adb9085d0068feb0144e1a92538abd3` |

## Ukendt / begrænsninger

API-valg: Seneste; nyeste daterede mulighed: 09-10-2026. 159-rapporten angiver 09-10-2026; pointdatabasen er snapshot 2026-10-07. Manglende punktmatch fremgår af JSON; ingen værdi er gættet.
