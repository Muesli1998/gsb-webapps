# Opgave 037 — Fase A: ID-overlap

Kørt 2026-09-15 på `opgave-037-u17-u19-scope` med
`scripts/037-id-overlap-phase-a.mjs`. Databasen blev kun læst.

## Distinkte `age_group_id`-værdier

| ID | Eksempler på rækketype | Konkurrencer |
|---:|---|---:|
| 1 | Senior/Danmarksserien/Københavnsserien | 85 |
| 2 | U09 | 23 |
| 3 | U11 | 60 |
| 4 | U13 | 73 |
| 5 | U15 | 64 |
| 6 | U17 og U17/U19 | 8 |
| 9, 11, 12, 13, 17 | Veteran 40+/50+/55+/60+/70+ | 158 |
| 18 | U17/U19 | 17 |

`age_group_id` 6 og 18 er de eneste værdier med U17/U19 i deres gemte
`league_raw`; de fem overlap-ID’er ligger ikke dér.

## De fem overlap-ID’er

| Kamp-ID | Sæson | Age group | League/pulje | GSB-hold |
|---:|---:|---:|---|---|
| 2286 | 2011 | 4 (U13) | U13 2. Serie | Gladsaxe Søborg |
| 2365 | 2011 | 4 (U13) | U13 Serie X1 | Gladsaxe Søborg 3 |
| 2396 | 2011 | 4 (U13) | U13 Serie X2 | Gladsaxe Søborg 4 |
| 2509 | 2011 | 5 (U15) | U15 Serie X1 | Gladsaxe Søborg 2 |
| 96231 | 2013 | 5 (U15) | U15 Serie X3 | Gladsaxe Søborg 3 |

## Konklusion

**0/5** overlap-ID’er har `age_group_id` 6 eller 18 (U17/U19). **5/5** er
allerede U13/U15 og ligger dermed inden for 033/035/036's ungdomsfilter.
Forklaringen “de er U17/U19, som blev overset” bekræftes ikke af de gemte
data. Fase B udføres ikke.

Den dokumenterede overlap-sag kræver afklaring af, hvorfor de samme fem
ID’er optræder i senior-klassifikationsmaterialet fra 013, selv om deres
database-rækker er U13/U15.
