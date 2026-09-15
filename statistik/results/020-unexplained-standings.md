# Opgave 020 — undersøgelse af uforklarede stillingsafvigelser

Kilde: `statistik/results/015-stillingskontrol.json` og read-only opslag i
`statistik/data/gsb-statistik-normalized.db`. De 31 rækker blev undersøgt
uden nye eksterne kald.

## Resultat

10 rækker har konkret gemt evidens: 9 rækker har `browser_verified_no_result`
med rå `result_raw`/`points_raw` lig `-` (kamp-ID'erne står nedenfor), og én
har en gemt protestbemærkning. De øvrige 21 har kun almindelige registrerede
resultater eller API-fejl og er fortsat uforklarede.

| Sæson | Pulje | Hold | Afvigelse | Gemte felter og konklusion |
|---:|---:|---|---:|---|
| 2010 | 431 | Gladsaxe Søborg 1 | 3 | Fortsat uforklaret; 7 `browser_verified` med resultater. |
| 2011 | 71 | Gladsaxe Søborg *udgået* | -1 | Fortsat uforklaret; 7 verificerede resultater. |
| 2012 | 1329 | Gladsaxe Søborg | 4 | Fortsat uforklaret; 7 resultater og én gemt walkover (`50335`, `(Ikke fremmødt)`). |
| 2013 | 2693 | Gladsaxe Søborg | 1 | Fortsat uforklaret; 6 verificerede resultater. |
| 2014 | 4245 | Gladsaxe Søborg 3 | 1 | Fortsat uforklaret; 7 verificerede resultater. |
| 2014 | 4266 | Gladsaxe Søborg udgået | 10 | Forklaret af `browser_verified_no_result`, rå `-`/`-`: kamp `142521`, `142550`. |
| 2014 | 4267 | Gladsaxe Søborg 2 udgået | 7 | Fortsat uforklaret; 7 verificerede resultater. |
| 2015 | 5984 | Gladsaxe Søborg 2 | 1 | Fortsat uforklaret; 7 verificerede resultater. |
| 2015 | 6013 | Gladsaxe Søborg 3 | 1 | Konkret bemærkning på kamp `193645`: “Resultat rettet grundet protest behandlet af Holdturneringsudvalget. HN”. |
| 2015 | 6019 | Gladsaxe Søborg 4 | 1 | Fortsat uforklaret; 7 verificerede resultater. |
| 2015 | 6022 | Gladsaxe Søborg 5 udgået | 6 | Fortsat uforklaret; 6 verificerede resultater. |
| 2015 | 6099 | Gladsaxe Søborg udgået | 9 | Fortsat uforklaret; 9 verificerede resultater. |
| 2016 | 7631 | Gladsaxe Søborg | 1 | Fortsat uforklaret; 7 verificerede resultater. |
| 2016 | 7640 | Gladsaxe Søborg 3 | 1 | Fortsat uforklaret; 7 verificerede resultater. |
| 2016 | 7643 | Gladsaxe Søborg 4 udgået | 8 | Fortsat uforklaret; 8 verificerede resultater. |
| 2016 | 7644 | Gladsaxe Søborg 4 trukket | 9 | Fortsat uforklaret; 9 verificerede resultater. |
| 2016 | 7647 | Gladsaxe Søborg 3 | 1 | Fortsat uforklaret; 7 verificerede resultater. |
| 2016 | 7652 | Gladsaxe Søborg | 1 | Fortsat uforklaret; 8 verificerede resultater. |
| 2016 | 7654 | Gladsaxe Søborg 3 | 1 | Fortsat uforklaret; 7 verificerede resultater. |
| 2016 | 7660 | Gladsaxe Søborg | 1 | Fortsat uforklaret; 8 verificerede resultater. |
| 2020 | 13228 | Gladsaxe Søborg | 3 | `browser_verified_no_result`, rå `-`/`-`: `405615`, `405622`, `405625`. |
| 2020 | 13230 | Gladsaxe Søborg 2 (O) | 3 | `browser_verified_no_result`, rå `-`/`-`: `405591`, `405598`, `405601`. |
| 2020 | 13285 | Gladsaxe Søborg 3 | 5 | `browser_verified_no_result`, rå `-`/`-`: `387380`, `387385`, `387390`, `387399`, `404111`. |
| 2020 | 13293 | Gladsaxe Søborg 4 | 5 | Alle 5 kampe `browser_verified_no_result`, rå `-`/`-`: `387568`, `404201`, `404203`, `404761`, `404764`. |
| 2020 | 13297 | Gladsaxe Søborg 1 | 6 | `browser_verified_no_result`, rå `-`/`-`: `387628`, `387633`, `387634`, `387638`, `404165`, `404171`. |
| 2020 | 13299 | Gladsaxe Søborg 2 | 6 | Alle 6 `browser_verified_no_result`, rå `-`/`-`: `387689`, `387692`, `387694`, `387697`, `404174`, `404176`. |
| 2020 | 13300 | Gladsaxe Søborg 3 | 6 | `browser_verified_no_result`, rå `-`/`-`: `387712`, `387717`, `387719`, `387725`, `404185`, `404189`. |
| 2020 | 13304 | Gladsaxe Søborg 1 | 7 | `browser_verified_no_result`, rå `-`/`-`: `387814`, `387815`, `387821`, `387825`, `387829`, `404137`, `404138`. |
| 2021 | 13965 | Gladsaxe Søborg 1 | -2 | Fortsat uforklaret; 4 verificerede resultater. |
| 2025 | 18504 | Gladsaxe Søborg 1 | 1 | Fortsat uforklaret; to `api_error` (`505217`, `505219`) uden gemt resultat. |
| 2025 | 18733 | Gladsaxe Søborg 3 | -2 | Fortsat uforklaret; to `api_error` (`506407`, `506413`) uden gemt resultat. |

De ni rækker med `browser_verified_no_result` er konkrete feltforklaringer,
men feltet angiver ikke i sig selv årsagen til den manglende kamp. Rækker med
API-fejl kræver ny hentning og står derfor uforklarede efter opgavens regel.

## Spørgsmål

Årsagen til `browser_verified_no_result` (og om kampene blev aflyst,
walkover eller blot ikke registreret) kan ikke afgøres uden ekstern kilde.
De to 2025-rækker kræver ligeledes ny hentning for `api_error`-kampene.

