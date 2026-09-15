# Opgave 035 — klassifikation af 162 ungdomskampe uden individuelle rækker

Kørt 2026-09-15 på grenen `opgave-035-ungdom-klassificer-manglende` med
`scripts/035-ungdom-klassificer-manglende.mjs`. Alle 162 rækker blev testet
mod allerede gemte renderede browsertekster i `results/browser-fallback/`,
`results/browser-fallback-youth/` og `results/individual-browser-all/`.

## Resultat

| Klassifikation | Antal |
|---|---:|
| `explicit_forfeit_or_no_show` | 115 |
| `no_category_section_no_explicit_forfeit` | 46 |
| `category_section_present_without_imported_rows` | 1 |
| **I alt** | **162** |

Klassifikationen `explicit_forfeit_or_no_show` kræver eksplicit tekst som
`Afgjort uden kamp`, `Ikke fremmødt`, `afbud` eller `udeblivelse` i den
gemte browsertekst. Den ene `category_section_present_without_imported_rows`
har en kategorisektion, men ingen importerede individuelle rækker; den er
ikke flyttet til et andet hul uden yderligere undersøgelse.

## Del B — kandidater til frisk hentning

De 46 rækker uden kategorisektion og uden eksplicit afbud er kandidater til
en separat CUA/browser-genindhentning. Denne opgave udførte ingen frisk
masseindhentning, som kortet kræver. Kandidat-ID'er:

`2162, 2164, 2166, 2168, 2173, 2176, 2178, 2182, 2190, 2193, 2195, 2215,
2245, 2286, 2290, 2294, 2302, 2308, 2312, 2323, 2327, 2344, 2365, 2372,
2374, 2377, 2390, 2396, 2421, 2478, 2487, 2490, 2493, 2498, 2507, 2509,
2515, 2523, 2535, 2543, 2553, 2556, 2561, 30156, 96231, 96240`.

## Kontrol

Alle 162/162 har klassifikation. Databasen blev kun læst. De øvrige 1.045
ungdomsholdkampe og senior-tallene blev ikke ændret. Rå klassifikationer og
match-ID'er ligger i `035-ungdom-klassificer-manglende.json`.
