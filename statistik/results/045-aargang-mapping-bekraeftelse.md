# Opgave 045 — aldersmapping og kollapsbekræftelse

## Mapping fra database

| age_group_id | antal competitions | league-eksempler |
|---:|---:|---|
| 1 | 84 | Danmarksserien Pulje 7,Danmarksserien Kvalifikation til 3. division pulje D,Københavnsserien	 Pulje 1,Københavnsserien	 Oprykning til Danmarksserien,2. Serie Pulje 1,3. Serie Pulje |
| 2 | 19 | DMU Holdtræf U9 - 3 Spillere U9 DMU holdtræf,U09 C 3600 (3 spillere) BD (2. halvår) Pulje 2,U09 C 3600 (3 spillere) BD Pulje 1,U09 D 3300 (3 spillere) BD  (2. halvår) Pulje 2,U09 D |
| 3 | 59 | DMU Hold U11C-D (4800) - 4 Spillere Pulje 2,DMU Hold U11C-D (4800) - 4 Spillere Finaleslutspil (1. - 4. plads),U11 C-D 4800 (4 spillere) BD Pulje 1,U11 D 4600 (4 spillere) BD Pulje |
| 4 | 71 | DMU Hold U13C-D (5000) - 4 Spillere Pulje 2,DMU Hold U13C-D (5000) - 4 Spillere Placeringskampe 9. - 12. plads (3'ere),U13 A, 6000 (2+2) Pulje 1,DMU Hold U13D (4800) - 4 Spillere P |
| 5 | 62 | DMU Hold U15B (6400) - 4 Spillere Pulje 4,DMU Hold U15B (6400) - 4 Spillere Finaleslutspil (1. - 4. plads),U15 A, 6800 (2+2) Pulje 1,DMU Hold U15C-D (5200) - 4 Spillere Pulje 1,DMU |
| 6 | 8 | U17/U19 B (4) P2 Pulje 1,U17 A Række 4+2 Pulje 1,U17 2.serie (4+2 M) Pulje 1,U17 serie X1 (4 spillere C) Pulje 1,U17 2. serie Pulje 1,U17 Serie X1 Pulje 1,U17 2. Serie U17 2. Serie |
| 9 | 58 | Eliteserien Pulje 1,1. Serie Pulje 1,3. Serie Pulje 1,4. Serie Pulje 1,40+ Eliteserien Pulje 1,40+ 1. Serie Pulje 1,40+ 4. Serie Pulje 1,Eliteserien Elite Nedrykningsslutspil,2. Se |
| 11 | 53 | Eliteserien Pulje 1,1. Serie Pulje 1,2. Serie Pulje 1,4. Serie Pulje 1,50+ Eliteserien Pulje 1,50+ 1. Serie Pulje 1,50+ 3. Serie Pulje 1,50+ 4. Serie Pulje 1,3. Serie Pulje 1,5. Se |
| 12 | 1 | DM for hold 55+ 55+ |
| 13 | 23 | Eliteserien Pulje 1,1. Serie Pulje 1,60+ Eliteserien Pulje 1,60+ 1. Serie Pulje 1,2. Serie Pulje 1,SEN+60 1.serie Pulje 1,SEN+60 2.serie Pulje 1,SEN+60 1. Serie Pulje 1,SEN+60 2. S |
| 17 | 7 | 70+ Eliteserien Pulje 1,1. Serie Pulje 1,SEN+70 1.serie Pulje 1,SEN+70 1. Serie P1 Pulje 1,70+ 1. Serie Pulje 1 |
| 18 | 17 | C-D 5600 (4 spillere) BD Pulje 1,U17/U19 D, 5200 (4 spillere) Pulje 3,Uge 38 - U17/U19 D, 5000 (2+2) Pulje 1,U17/U19 D, 4600 (4 spillere) Pulje 1,DMU H - U17/U19 6600 (4 spillere)  |

## Optælling

- Distinkte specifikke identiteter (name_raw + age_group_id): 59
- Distinkte age_group_id-værdier: 12
- Identitetsgrupper med flere competitions: 70

Specifik age_group_id er den dokumenterede identitetsnøgle. Grundspil/slutspil-varianter med samme sæson, navn og age_group_id kollapser; DMU/BD-varianter deler samme age_group_id i de fundne grupper.
