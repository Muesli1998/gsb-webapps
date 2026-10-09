# 156 Del A (offline) — hvad står der på liste 287 ("Tilmeldingsniveau")?

Kilde: gemte råsvar fra 150 (`10-q10-clubid-1093-list287`, `18-q18-baseline-list287-current-page0`, `09-q09-agegroupid-5-gender-K-list287`) og 151/150 (`19-q19-clubid-1093-list287-pageindex-1`). Ingen nye kald. Kørt af Claude, ikke Codex. Version: den aktuelle liste på 150's kørselstidspunkt (ikke dateret i svarene).

## 1. Hvad betyder placeringstallene?
- **Filtreret liste (fx `clubid` = 1093):** to tal. Første kolonne (`class='rank'`) er den **lokale placering i filteret**, med delte placeringer ved lighed (1, 2, 3, 4, 5, 5, 7 …). Tallet i parentes er **placeringen på den samlede liste 287**. Det matcher billedet fra Christoffer: lokal 1 / samlet 497 for Jonas Trusell-Jensen.
- **Ufiltreret liste:** kun ét tal, og det er den samlede placering (1 = Anders Antonsen).
- Delte placeringer forekommer også på den samlede liste (to spillere med samlet 889 og lokal 5).
- Spillerens række står i kolonnen "Række" (fx `SEN M-A`, `SEN A`, `U15 E`, `U17 B`). `Point` er tom i alle rækker.
- **Konsekvens:** hvis `rank` i `ranking_points` kommer fra en filtreret hentning (klubfilter, `playerid`), er det den lokale placering, ikke den samlede. Det forklarer 152's "K-rang 1 mod 83". Brug altid point til sammenligning, og kun samlet rang fra ufiltrerede lister eller parentesen.

## 2. Hvordan hænger række og samlet placering sammen? (GSB-filter, 200 rækker)
Række er **ikke** en ren funktion af den samlede placering. Intervallerne overlapper:

| Række | Antal | Samlet placering |
|---|---:|---|
| SEN M-A | 7 | 497–2.595 |
| SEN A | 32 | 889–3.981 |
| SEN M | 1 | 1.665 |
| SEN A-B | 6 | 2.711–4.254 |
| SEN B | 19 | 3.419–6.510 |
| SEN B-C | 10 | 5.242–7.789 |
| SEN C | 22 | 5.554–10.035 |
| SEN D | 41 | 8.192–13.516 |
| U15 M / A / B / C | 4 / 4 / 8 / 3 | 6.164–9.342 / 7.123–9.512 / 10.386–13.126 / 13.111–13.585 |
| U17 B / C / A | 5 / 9 / 1 | 7.211–11.031 / 10.649–13.516 / 10.167 |

En SEN A-spiller kan ligge på 889 og en SEN M-A-spiller på 2.595, så rækken kan ikke aflæses som en fast placeringsgrænse. Den er altså bestemt af noget andet end den samlede placering alene (fx disciplin-niveauer). Det er **ikke** afgjort hvad.

Ufiltreret side 0 (rang 1–100) er kun `SEN E` (1–40) og `SEN E-M` (41–100).

## 3. Ungdom er på listen
U15-piger (aldersfilter `agegroupid` 5, K): samlet placering 2.275–11.260, rækker `U17 E`, `U15 E`, `U15 E-M`, `U15 M`, `U15 A`. GSB's U11-, U13-, U15-, U17- og U19-spillere står med række og samlet placering. Der er altså en styrkeindikator for ungdomsspillere uden point i en disciplin. U09 er **ikke** undersøgt på liste 287.

## 4. Det der stadig kræver kald (Del A, online)
- Giver `playerid` på 287 samlet eller lokal placering, og følger det den historiske version?
- Findes U09 på 287 med placering?
- Er placeringen bare en rangering af en værdi, vi kan regne tilbage til (kort 157)?

Alle tre kan afklares med højst 15 kald.
