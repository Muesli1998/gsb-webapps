# Komplet opdeling af 2.818 holdkampe

Read-only SQL-optælling mod `statistik/data/gsb-statistik-normalized.db`.
En kamp tælles som “har individuelle rækker” når `individual_matches` har
mindst én række for kampen.

| Kategori | Antal | Grundlag |
|---|---:|---|
| Har individuelle rækker (kategori-scores gemt) | 2.367 | SQL: mindst én `individual_matches`-række |
| Mangler individuelle rækker — 013: uden kategorisektion | 257 | `results/013-manglende-kategorisektioner.json` metadata-tal |
| Mangler individuelle rækker — 013: kategorier uden scores | 58 | `results/CURRENT_VALIDATION_STATUS.md` |
| Kendte undtagelser: 4 U09 + 2 corona-suspenderede | 6 | `CURRENT_VALIDATION_STATUS.md` (U09: 505217, 505219, 506407, 506413; corona: 387862, 387864) |
| Resterende uden individuelle rækker, ikke dækket af ovenstående klassifikation | 130 | Aritmetisk rest; SQL viser 451 uden rækker, 451 − 257 − 58 − 6 |
| **I alt** | **2.818** | 2.367 + 257 + 58 + 6 + 130 |

SQL-kontrol af de rå rækkegrupper:

```text
team_matches = 2818
team_matches med individuelle rækker = 2367
team_matches uden individuelle rækker = 451
uden individuelle rækker pr. status:
  browser_verified = 315
  browser_verified_no_result = 85
  corona_suspended = 47
  api_error = 4
```

De 257 og 58 er dokumenterede tællinger fra tidligere audits, men de
bevarede 013-filer indeholder ikke en komplet ID-liste (JSON har kun 20
sample-rækker). Derfor kan overlap mellem 257/58 og de seks undtagelser
ikke bevises på ID-niveau i dette materiale. Tallet 130 er således den
ærligste resterende kategori i den ønskede, udtømmende aritmetiske opdeling;
den må ikke fortolkes som en forklaring på hvorfor de 130 mangler.

