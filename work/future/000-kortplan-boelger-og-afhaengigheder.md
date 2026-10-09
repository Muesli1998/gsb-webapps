# Kortplan — bølger, afhængigheder og beslutninger (2026-10-09)

**Status:** plan, ikke en beslutning. Intet af dette er i køen, før Christoffer flytter et kort til `work/aabne/`. Kortene ligger her på Christoffers udtrykkelige ønske 2026-10-09, også de statistikkort, som ellers hører til i køen. Planen erstatter ikke `docs/roadmap.md`, idébankerne eller `docs/BESLUTNINGER.md`.

Numre er permanente og fælles med `work/aabne/` og `work/loeste/`. 162 og 171 ligger allerede i `work/aabne/`.

## Allerede i køen (`work/aabne/`)
| Kort | Indhold | Netværk |
|---|---|---|
| 162 | fælles hente-bibliotek, standardregler, hash-tjek | 0 |
| 171 | turneringsdata Del A: kortlægning af det vi har | 0 |

## Eksisterende kort i `work/future/` (genbruges, ikke duplikeret)
| Kort | Indhold | Bemærkning |
|---|---|---|
| 023 | ret START_LOKAL_PREVIEW-dokumentet | lille |
| 024 | dokumentoprydning idébanker/kode | |
| 025 | kampsystem: saml deployrunde | teknikbane = loft er nu afgjort (2026-10-09); Chris tester stadig standalone-filen først |
| 026 | kampsystem: admin-adgangskode-gate | roadmap 1a |
| 027 | dreamteam: verificér navnealias mod facit | |
| 028 | kampkalender B1: web og calendar-sync | |
| 029 | dreamteam: analyse.js F1/F2-fix | 179 giver sikkerhedsnet først |
| 073 | kampsystem: kønsparring som hård præference | |
| 117 | statistik: central vidensdokumentation | 176 tager det aktuelle |
| 128 | genkør 127 efter sæson 2026/27 | først når sæsonen er slut |

## De nye kort
| Kort | Titel | Bølge | Afhænger af | Kald | Skriver DB? |
|---|---|---|---|---|---|
| 164 | stamdata: navne, aliaser, ID'er, "vores side" | 1 | — | 0 | nej |
| 172 | rækkegrænser som JSON + historik-test | 1 | 162 | ≤10 | nej |
| 176 | dokumentopdatering efter 158b | 1 | 162 | 0 | nej |
| 177 | B3: effektivitetsmetoder sammenlignet | 1 | — | 0 | nej |
| 179 | snapshot-tests af Netlify-funktioner | 1 | — | 0 | nej |
| 165 | turneringsdata Del B: robots, JS, tre turneringer | 2 | 162, 171 | ≤20 | nej |
| 166 | turneringsdata Del C: sæsonoversigt | 2 | 165 | ≤20 | nej |
| 167 | turneringsdata Del D: point mod kampe | 2 | 165 | ≤20 | nej |
| 163 | hent 2026/27-kampe (scope A) | 2 | 162, helst 164 | ca. 330 | **ja** (normalized) |
| 168 | turneringsdata Del E: skema, pris, anbefaling | 3 | 165–167 | 0 | nej |
| 169 | eventtabeller for alle GSB-spillere → ny DB | 3 | 162, 164 | ≤400 | **ja** (ny DB) |
| 170 | formindikator 30/90 dage | 3 | 169 | 0 | nej |
| 175 | ugentlig opdatering 2026/27 | 3 | 163 | 20–60/uge | **ja** (normalized) |
| 173 | forventet vinder og performance mod ranglistepoint | 4 | 163, 164, 168 | ≤150 | nej |
| 174 | gentag 158b: voksne og inaktive | 4 | 162, 169 | ≤300 | nej |
| 184 | ELO mod ranglistepoint | 4 | 164 + Chris' CSV | 0 | nej |
| 178 | Netlify ↔ GitHub-deploy og /version (Del A forslag) | 5 | — | 0 | nej |
| 180 | Dream Team forside-rækkefølge | 5 | Chris' ord; helst 179 | 0 | rører `apps/` i Del B |
| 181 | feature-design: streak, graf, rekordbog, forventede point | 5 | helst 173/177 | 0 | nej |
| 182 | Søndagstræning: afklaring og produktionsplan | 5 | helst 164 | 0 | nej |
| 183 | personlig spillerside: design | 5 | 169, 170, 173 | 0 | nej |
| 185 | fremmøde mod pointudvikling: findes data? | 5 | 164, 169 | 0 | nej |
| 186 | holdopstillings-assistent: design og backtest | 5 | 164, 169, 170, 172 | 0 | nej |
| 187 | bestyrelsesoverblik: nøgletal | 5 | 164, helst 163 | 0 | nej |

## Bølgerne i ord
- **Bølge 0 (nu):** 162 og 171. 162 skal være kørt og flettet, før noget andet henter data.
- **Bølge 1: fundament uden netværk (næsten):** stamdata (164), rækkegrænser (172), dokumenter (176), metodesammenligning til B3 (177), tests (179). Alle kan køre parallelt på hver sin gren; ingen rører databaser.
- **Bølge 2: små netværksundersøgelser:** turneringsrute (165 → 166, 167) og første import af 2026/27-kampe (163). 163 skriver til normalized DB og kræver Christoffers godkendelse af planen, før første kald.
- **Bølge 3: bygning af data:** turneringsanbefaling (168), eventtabeller (169), form (170), ugentlig rutine (175).
- **Bølge 4: analyse:** forventet vinder (173), bredere 158b (174), ELO (184).
- **Bølge 5: produkter og design:** deploy (178), forside (180), features (181), Søndagstræning (182), spillerside (183), fremmøde (185), opstilling (186), overblik (187).
- **Bølge 6: efter sæsonen:** 128, 117.

Kritisk sti for "forventet vinder med rigtige data": 162 → 164 → 163 → (165–168) → 173.

## Hvad Christoffer skal beslutte eller selv gøre
1. Flytte et kort til `work/aabne/` ad gangen (bølge 1 kan flyttes samlet).
2. 163: godkende planen (scope A anbefalet i 155), før første kald.
3. 169: omfanget (alle GSB siden 2023/24 er forslaget).
4. 168: ja/nej til en turneringsdatabase, når anbefalingen ligger der.
5. 184: eksportere `ELO_Spillere` til CSV i Dropbox.
6. 180 og 178 Del B: godkende konkrete ændringer i `apps/netlify-prod/` (BESLUTNINGER 2026-09-19).
7. 182: holdliste, kodeordsmodel, historik (roadmap "Længere ude").
8. Egne opgaver fra før: testen af standalone-kampsystemet; Spillerpoint A3 omdøbes til "Andreas Ryun Drasbek"; betalingsstatus 24/25 og 25/26; drag-and-drop-deploy af `netlify-prod`, når han vil.

## Tværgående regler for alle kort
- Netværkskort følger `Standardregler for kort der henter data` (kort 162). Fri hentning fra badmintonplayer.dk uden API-nøgle er besluttet 2026-10-09; moderat takt; ingen login, cookies, CAPTCHA eller samtykkeklik.
- Databaser er read-only, medmindre kortets Mål navngiver skrivning (163, 169, 175).
- `apps/netlify-prod/` røres kun af 029, 026, 025, 028, 178 Del B og 180 Del B, og kun efter Christoffers godkendelse af den konkrete ændring.
- Gæt aldrig: "ukendt" og gem evidensen. Efterprøv egne tal, før du rapporterer.

## Bevidst ikke med
- En synkronisering af `AlleResultater` i Google Sheets: den er erstattet af statistik/-SQLite (BESLUTNINGER 2026-09-15). B3-backend følger 163/175.
- Et kort til at skrive om gamle scripts til det nye hente-bibliotek; det kommer, hvis og når et gammelt script skal genbruges.
- Kort til Google Calendar, kampsystem og admin-gate ud over de eksisterende 025, 026, 028.
