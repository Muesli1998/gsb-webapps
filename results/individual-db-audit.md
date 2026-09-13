# Audit af individuelle holdkampdata

Genereret: 2026-09-13T07:43:59.377Z

- Holdkampe i SQLite: **2818**
- Holdkampe med individuelle rækker: **2367**
- Individuelle rækker: **20319**
- Spillerrelationer: **67196**
- Individuelle rækker med vinderfelt: **19352**
- Individuelle rækker med score: **20319**
- Individuelle rækker hvor hjemme- og ude-score er identiske tekstfelter: **936**
- Holdkampe med resultat men uden individuelle rækker: **315**

- 0-0-særstatusser: **8**
- Rækker med rå resultatmarkør: **309**
- Statusfordeling: api_repaired=13285, browser_parsed=6100, browser_zero_score=8, complete=926

## Browserpayloads

- Unikke payloads med rå tekst: **2816**
- Med kategorisektioner: **2484**
- Med faktiske scores efter Resultat-feltet: **2680**
- Med eksplicit no-play-/walkovertekst: **360**

## Pr. sæson

| Sæson | Holdkampe | Med individuelle rækker | Individuelle rækker | Med holdresultat | Resultat uden individuelle rækker |
|---:|---:|---:|---:|---:|---:|
| 2010 | 11 | 11 | 142 | 11 | 0 |
| 2011 | 169 | 10 | 130 | 169 | 159 |
| 2012 | 131 | 112 | 1092 | 131 | 19 |
| 2013 | 134 | 128 | 1195 | 134 | 6 |
| 2014 | 144 | 122 | 1173 | 142 | 20 |
| 2015 | 156 | 127 | 1269 | 156 | 29 |
| 2016 | 147 | 127 | 1206 | 147 | 20 |
| 2017 | 133 | 127 | 1193 | 133 | 6 |
| 2018 | 143 | 138 | 1300 | 143 | 5 |
| 2019 | 125 | 106 | 1009 | 107 | 1 |
| 2020 | 162 | 51 | 423 | 51 | 0 |
| 2021 | 186 | 180 | 1459 | 186 | 6 |
| 2022 | 227 | 221 | 1736 | 227 | 6 |
| 2023 | 255 | 239 | 1842 | 255 | 16 |
| 2024 | 295 | 286 | 2229 | 294 | 8 |
| 2025 | 400 | 382 | 2921 | 396 | 14 |

## Fortolkning

Den individuelle tabel dækker nu både API-rækker og browserfundne kategorier. Rækker med 0-0-sæt og rå markør gemmes særskilt som administrative/no-score-hændelser; de behandles ikke som almindelige spillede sæt. Browserpayload-statistikken måler kun filer, der ligger lokalt, og er derfor et dækningsmål, ikke et bevis på at resten af kampene mangler på badmintonplayer.dk.
