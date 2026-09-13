# API- og felt-dækning: aktuel audit

Dato: 2026-09-13T05:43:02.396Z

## Samlet

- Teamkampe: **2818**
- API-fejl: **186**
- Manglende spillerdata-status: **174**
- Manglende resultatfelt: **1737**
- Manglende hjemme/ude: **366**

## Status

| Status | Antal |
|---|---:|
| api_error | 186 |
| browser_verified | 998 |
| browser_verified_no_result | 39 |
| complete | 1374 |
| corona_suspended | 47 |
| missing_players | 174 |

## Pr. sæson

| Sæson | Kampe | API-fejl | Mangler resultat | Mangler hjemme/ude |
|---:|---:|---:|---:|---:|
| 2010 | 11 | 11 | 11 | 22 |
| 2011 | 169 | 1 | 87 | 154 |
| 2012 | 131 | 6 | 89 | 20 |
| 2013 | 134 | 10 | 101 | 20 |
| 2014 | 144 | 1 | 110 | 38 |
| 2015 | 156 | 0 | 123 | 30 |
| 2016 | 147 | 6 | 116 | 46 |
| 2017 | 133 | 2 | 96 | 16 |
| 2018 | 143 | 9 | 113 | 18 |
| 2019 | 125 | 0 | 82 | 0 |
| 2020 | 162 | 9 | 77 | 92 |
| 2021 | 186 | 15 | 103 | 34 |
| 2022 | 227 | 16 | 111 | 32 |
| 2023 | 255 | 32 | 160 | 64 |
| 2024 | 295 | 26 | 156 | 52 |
| 2025 | 400 | 42 | 202 | 94 |

## Fortolkning

- Browserverificerede rækker er synkroniseret med de felter, der faktisk stod på den dynamiske side.
- To ungdomskampe mangler stadig dynamisk kampdetalje og står som særskilte huller i køen.
- De resterende mangler prioriteres efter sæson og felt: først hjemme/ude og resultat, derefter individuelle spillere og detaljer.
