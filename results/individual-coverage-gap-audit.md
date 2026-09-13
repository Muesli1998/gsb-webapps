# Audit af holdkampe uden individuelle kategorier

Genereret: 2026-09-13T07:53:45.824Z

- Holdkampe med holdresultat men uden individuelle rækker: **315**
- categories_without_scores: **54**
- categories_without_scores_with_remark: **4**
- payload_without_categories: **257**
- Med eksplicit no-play-/walkovertekst: **205**
- Kategorier uden scores, men med eksplicit no-play: **57** af 58

## Pr. sæson

| Sæson | Uden kategorier | Kategorier uden scores | Med bemærkning | Andet |
|---:|---:|---:|---:|---:|
| 2011 | 159 | 0 | 0 | 0 |
| 2012 | 11 | 8 | 0 | 0 |
| 2013 | 3 | 3 | 0 | 0 |
| 2014 | 19 | 1 | 0 | 0 |
| 2015 | 27 | 2 | 0 | 0 |
| 2016 | 19 | 1 | 0 | 0 |
| 2017 | 6 | 0 | 0 | 0 |
| 2018 | 3 | 2 | 1 | 0 |
| 2019 | 1 | 0 | 0 | 0 |
| 2021 | 4 | 2 | 0 | 0 |
| 2022 | 1 | 5 | 2 | 0 |
| 2023 | 3 | 13 | 1 | 0 |
| 2024 | 0 | 8 | 0 | 0 |
| 2025 | 1 | 13 | 0 | 0 |

## Konklusion

Der blev ikke fundet nogen gap med scorede kategorier, som importøren burde have overset. 257 payloads indeholder ingen kategorisektioner. 58 har kategorier uden scores; 57 af disse har eksplicit no-playtekst. Den resterende række, kamp 340495, har en ordret Bemærkning om at resultatet blev ændret efter en protest og skal behandles som en administrativ afgørelse. Dette er evidens for sidens indhold, ikke en automatisk fortolkning af årsagen.

Eksempelrækkerne og den fulde klassifikation findes i JSON-filen.
