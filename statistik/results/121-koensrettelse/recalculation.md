# Opgave 121 — genberegning af kønsstatus

Kørslen brugte udelukkende den eksisterende `statistik/data/national-spillere.db`; der blev ikke scraped nye sider.

| Status | Før | Automatisk efter 80%-regel | Endelig efter 62 overrides |
|---|---:|---:|---:|
| `mand` | 24.424 | 23.277 | 23.283 |
| `kvinde` | 13.941 | 15.025 | 15.081 |
| `ikke afklaret` | 37.804 | 37.804 | 37.804 |
| `modstridende data` | 0 | 63 | 1 |
| `aldrig spillet` | 0 | 0 | 0 |
| **I alt** | **76.169** | **76.169** | **76.169** |

Den automatiske beregning ændrede 1.169 eksisterende statusværdier. Den klassificerer HS+HD som mandlige koder og DS+DD som kvindelige koder; mindst 80% giver den tilsvarende status, ellers `modstridende data`, og ingen kønnede koder giver `ikke afklaret`. Alle 62 CSV-overstyringer blev fundet og anvendt; ingen ID'er manglede. Kontrolopslag viste fx 15896 Sofie Robdrup → `kvinde` og 289635 Lukas Skov Hansen → `mand` efter override.

Spiller 234617 står fortsat som `Ukendt` og har status `modstridende data`. De eksisterende data indeholder kun navnet `Ukendt` for spilleren (35 gemte relationer på 17 kamp-ID'er); der er ingen yderligere navnekilde i databasen, så navnet kan ikke forklares som andet end manglende navn i det allerede hentede materiale uden ny scraping.

Schemaet for `players.gender_status` tillader nu også `modstridende data`. `gsb-statistik-normalized.db` og `liga-landskab.db` blev ikke skrevet til.
