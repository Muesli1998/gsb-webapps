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
| `browser_verified_no_result` uden individuelle rækker | 85 | SQL status-felt |
| `corona_suspended` uden individuelle rækker, bortset fra 387862/387864 | 45 | SQL status-felt |
| **I alt** | **2.818** | 2.367 + 257 + 58 + 6 + 85 + 45 |

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

De 130 tidligere kaldte “resterende” er præcist 85
`browser_verified_no_result` plus 45 øvrige `corona_suspended` efter de to
navngivne undtagelser er taget ud (100 % match). De resterende 321 kampe
uden individuelle rækker er dermed de dokumenterede 257+58+6-grupper.
