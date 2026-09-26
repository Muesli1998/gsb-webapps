# Opgave 096 — Kredsserien Vest: oprindelse og startsæson

**Status:** afsluttet research. `liga-landskab.db` blev kun læst. Den komplette maskinlæsbare sporingsliste er [096-kredsserien-vest-oprindelse.json](096-kredsserien-vest-oprindelse.json).

## Metode

- Afgrænsning: alle `league_group_teams` i seniorgrupper hvor `division_name_raw` er præcis `Kredsserie Vest` eller `Kredsserien Vest`, sæsonerne 2016/17–2026/27.
- En slutmarkør `(O)`, `(N)` eller `(M)` blev fjernet fra holdnavnet ved opslag i den foregående sæson. Hver markeret sæson-knude er derfor sporet på det normaliserede holdnavn, med dens faktiske foregående `division_name_raw`, `group_name_raw` og gemte regionskobling bevaret i JSON-bilaget.
- Hvis et hold optræder i både grund- og efterspil samme sæson, tælles det én gang i sæsonens holdtal. JSON-bilaget bevarer både de 161 rå forekomster og de 108 distinkte hold-sæsoner.
- Oprindelse i 2016/17 er klassificeret ud fra den foregående sæsons grundspil: `Serie 1` = lokal Serie 1-forfremmelse; `3. division` eller `Danmarksserien` = nedrykning fra national række; intet match = ukendt. Markøren bruges ikke alene som bevis.

## Dækning: Kredsserie Vest i de gemte data

| Sæson | Puljer | Distinkte hold | Markerede hold | `(O)` | `(N)` | Knyttede regioner |
|---|---:|---:|---:|---:|---:|---|
| 2016/17 | 4 | 32 | 11 | 6 | 5 | 4, 5, 6, 7 |
| 2017/18 | 8 | 32 | 13 | 7 | 6 | 4, 5, 6, 7 |
| 2018/19 | 8 | 36 | 11 | 5 | 6 | 4, 5, 6, 7 |
| 2019/20 | 8 | 32 | 0 | 0 | 0 | 4, 5, 6, 7 |
| 2020/21 | 4 | 32 | 13 | 7 | 6 | 4, 5, 6, 7 |
| 2021/22 | 9 | 67 | 21 | 14 | 7 | 4, 5, 6, 7 |
| 2022/23 | 9 | 32 | 14 | 11 | 3 | 4, 5, 6, 7 |
| 2023/24 | 9 | 63 | 0 | 0 | 0 | 4, 5, 6, 7 |
| 2024/25 | 9 | 40 | 0 | 0 | 0 | 4, 5, 6, 7 |
| 2025/26 | 9 | 32 | 13 | 7 | 6 | 4, 5, 6, 7 |
| 2026/27 | 4 | 32 | 12 | 6 | 6 | 4, 5, 6, 7 |

De fire første observerede grundspilspuljer i 2016/17 er `league_group_id` 7723, 7724, 7725 og 7732. Hver har samme `league_group_regions`-sæt: 4 (Midtjylland), 5 (Nordjylland), 6 (Sønderjylland) og 7 (Fyn). Datasættet dokumenterer derfor en fælles Kredsserie Vest for alle fire regioner samtidig fra den første sæson, som findes i landskabsdatabasen.

## Startsæsonen 2016/17: alle markerede hold

| Hold i Kredsserie Vest | Markør | Foregående sæsons fund | Klassifikation |
|---|---|---|---|
| Aalborg Triton 3 | N | Danmarksserien, Vest pulje 2 | Nedrykning fra national række |
| St. Restrup | O | Serie 1 Vest, pulje 2 | Lokal Serie 1-forfremmelse |
| Vejgaard | N | Danmarksserien, Vest pulje 1 | Nedrykning fra national række |
| Højbjerg 4 | N | Danmarksserien, Vest pulje 1 | Nedrykning fra national række |
| Langhøj 2 | O | Serie 1 Vest, pulje 4 | Lokal Serie 1-forfremmelse |
| Lystrup | O | Intet navnematch i den gemte seniorstruktur | Ukendt/ikke sporbar |
| Team Favrskov 2 | O | Serie 1 Vest, pulje 5 | Lokal Serie 1-forfremmelse |
| Horsens 2 | N | Danmarksserien, Vest pulje 3 | Nedrykning fra national række |
| Silkeborg IF | O | Serie 1 Vest, pulje 4 | Lokal Serie 1-forfremmelse |
| Badminton Østfyn | N | Danmarksserien, Vest pulje 4 | Nedrykning fra national række |
| Hjemly Idrætsefterskole | O | Serie 1 Vest, pulje 7 | Lokal Serie 1-forfremmelse |

**Samlet:** 11 markerede startteams: 5 dokumenterede fra Danmarksserien/3. division, 5 fra Serie 1 Vest og 1 ukendt. Det understøtter, at startsæsonens deltagerfelt var sammensat af både nedrykkere og lokale oprykkere. Det beviser ikke i sig selv, hvornår eller hvorfor den organisatoriske struktur blev etableret.

Bemærkning om de gemte regioner: de foregående 2015/16-vestpuljer er gemt med `region_id = 1`, selv når rækken hedder `Serie 1 Vest` eller `Danmarksserien / Vest`. Det er derfor række- og puljenavnet, ikke regions-id'et, der bruges til den konkrete startsæsonklassifikation.

## Ekstern, officiel kildekontrol

- En [Badminton Midtjylland-årsberetning for 2015](https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=77746) har allerede en særskilt budgetlinje for `Kredsserien Vest`. Den viser, at navnet/aktiviteten var til stede før den første komplette 2016/17-observation i landskabsdata, men den angiver ikke oprettelsesdato, deltagende regioner eller årsag.
- Et [fælles vestligt reglement](https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=78859) er udstedt for Badminton Fyn, Sønderjylland, Nordjylland og Midtjylland. Det beskriver blandt andet adgang fra Serie 1 Vest til Kredsserie Vest og regulering af oprykkere efter nedrykkere fra 3. division. Det underbygger den observerede bevægelsesstruktur, men ikke etableringsåret.
- [Reglementet for Kredsserien Vest og Serie 1 Vest 2021](https://badmintoninordjylland.dk/wp-content/uploads/2022/08/Reglement-for-Kredsserien-Vest-og-Serie-1-Vest-2021.pdf) bekræfter fortsat den fælles fire-regioners række og de konkrete op-/nedrykningsled mellem Kredsserie Vest, Danmarksserien og Serie 1 Vest.

**Ikke fundet:** En officiel nyhed, beslutning eller regeltekst, der fastslår, at Kredsserie Vest blev organisatorisk oprettet eller sammenlagt netop i 2016/17, og som angiver en begrundelse eller dato. Derfor må 2016/17 alene beskrives som første komplette sæson i den gemte database, ikke som bekræftet startår for samarbejdet.

## Konklusion for senere implementering

En senere regional model kan behandle Kredsserie Vest som én delt vestlig række med regionerne 4–7 fra 2016/17 og frem i **vores** data. Den må ikke antage, at rækken blev skabt i 2016/17 eller at alle tråde starter fra bunden dér: den officielle 2015-kilde giver et modsignal. Før kæder til før-2016 skal automatiseres, kræves enten ældre komplet landskabsdata eller en kilde med den faktiske overgangsbeslutning.
