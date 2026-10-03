# Opgave 125 — formatafgørelser og S4/D2-genanalyse

## Formatafgørelser

| Format | Puljer |
|---|---:|
| 4 piger | 135 |
| 4 spillere | 4813 |
| 4-8 spillere | 131 |
| X1 | 8 |
| X2 | 6 |

Kategorierne summerer til **5093** ungdoms-S4/D2-puljer. `(4)`, `4 m/k` og puljer uden tekst er sat til **4 spillere** efter Christoffers afgørelse. `4-8 spillere` er bevaret som selvstændig kategori. `4 piger` er kun dataunderstøttet, når holdsidekriteriet nedenfor er opfyldt.

## Holdside og køn

| Holdsider | Antal | Andel |
|---|---:|---:|
| Kun kvinder | 2964 | 1.7 % |
| Kun mænd | 7516 | 4.3 % |
| Blandet | 9246 | 5.3 % |
| Ukendt køn | 155724 | 88.8 % |
| **I alt** | **175450** | **100,0 %** |

Holdsidedækning (ikke `ukendt køn`): **19726 / 175450 (11.2 %)**. `4939` puljer kan ikke få en kønsbaseret foreslået klassifikation. Forslaget `overvejende piger`/`drenge` kræver mindst 80 % afgørbare holdsider og mindst 95 % rene kendte sider af det pågældende køn; det er et forslag til Christoffers godkendelse, ikke en regel der omskriver tekst. Af de **135** tekstmarkerede `4 piger`-puljer opfylder **9** kriteriet; **126** har ikke tilstrækkelig dækning og er derfor ikke datastøttet som pigeformat.

## Resten fra 123

- Rest før 123: **775** puljer.
- Afgjort efter 125: **775** puljer.
- Egne kategorier: **131** puljer (`4-8 spillere`).
- Stadig uafklaret: **0** puljer.

## Kontrol

- SHA-256 for `liga-landskab.db` og `gsb-statistik-normalized.db`: uændret før/efter.
- Tællingerne for `players`, `matches`, `player_matches` og `player_match_extras` i `national-spillere.db`: uændrede før/efter.
- Ti deterministiske pulje-stikprøver med `context_raw` og de anvendte `player_match_extras` ligger i `katalog.json` under `manual_samples`.
