# Audit af individuelle holdkampdata

Genereret: 2026-09-13T07:24:09.140Z

- Holdkampe i SQLite: **2818**
- Holdkampe med individuelle rækker: **1374**
- Individuelle rækker: **14216**
- Spillerrelationer: **49986**
- Individuelle rækker med vinderfelt: **13256**
- Individuelle rækker med score: **14216**
- Individuelle rækker hvor hjemme- og ude-score er identiske tekstfelter: **933**
- Holdkampe med resultat men uden individuelle rækker: **1308**

## Browserpayloads

- Unikke payloads med rå tekst: **2816**
- Med kategorisektioner: **2484**
- Med faktiske scores efter Resultat-feltet: **2680**
- Med eksplicit no-play-/walkovertekst: **360**

## Pr. sæson

| Sæson | Holdkampe | Med individuelle rækker | Individuelle rækker | Med holdresultat | Resultat uden individuelle rækker |
|---:|---:|---:|---:|---:|---:|
| 2010 | 11 | 0 | 0 | 11 | 11 |
| 2011 | 169 | 10 | 130 | 169 | 159 |
| 2012 | 131 | 79 | 860 | 131 | 52 |
| 2013 | 134 | 91 | 966 | 134 | 43 |
| 2014 | 144 | 91 | 984 | 142 | 51 |
| 2015 | 156 | 108 | 1166 | 156 | 48 |
| 2016 | 147 | 93 | 1000 | 147 | 54 |
| 2017 | 133 | 88 | 949 | 133 | 45 |
| 2018 | 143 | 104 | 1093 | 143 | 39 |
| 2019 | 125 | 82 | 869 | 107 | 25 |
| 2020 | 162 | 31 | 303 | 51 | 20 |
| 2021 | 186 | 86 | 881 | 186 | 100 |
| 2022 | 227 | 95 | 986 | 227 | 132 |
| 2023 | 255 | 128 | 1178 | 255 | 127 |
| 2024 | 295 | 130 | 1272 | 294 | 164 |
| 2025 | 400 | 158 | 1579 | 396 | 238 |

## Fortolkning

Den nuværende individuelle tabel dækker kun en delmængde af holdkampene. Identiske scoretekster i hjemme- og ude-felterne er et datamodel-/importproblem, som skal rettes ved næste parserimport; det er ikke evidens for ens scores i selve kampen. Browserpayload-statistikken måler kun filer, der ligger lokalt, og er derfor et dækningsmål, ikke et bevis på at resten af kampene mangler på badmintonplayer.dk.
