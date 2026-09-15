# Opgave 041 — fuld ungdoms-dubletimport-audit

Kørt 2026-09-15 på `opgave-041-ungdom-dublet-import` med
`scripts/041-ungdom-dublet-import.mjs`. Populationen er alle ungdoms-
relationer i `age_group_id IN (2,3,4,5,6,18)`, både med og uden eksternt ID.
Databasen blev kun læst.

## Resultat

| Kategori | Grupper |
|---|---:|
| (a) Reel dublet-import | 0 |
| (b) Forskellige kampe samme dag, samme konkurrence | 0 |
| (c) Normal multi-registrering på tværs af forskellige konkurrencer | 0 |
| **Grupper fundet** | **0** |

I alt blev 9.691 individuelle spillerrelationer undersøgt. Ingen spiller
havde samme dato og samme `league_raw`/`name_raw` på flere `gsb_team_id` i
materialet. Der er derfor ingen external_match_id-par at liste, og ingen
indikator på dublet-import blev fundet.

## Kontrol

Auditten inkluderede både ID'ede og ID-løse ungdomsspillere samt U17/U19.
Ingen databasefiler, opgave 036/040-resultater, planfiler eller
beslutningsfiler blev ændret.
