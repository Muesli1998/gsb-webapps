# Opgave 083 — Nembadminton ranglistehistorik

Genereret: 2026-09-21. Kilden blev kaldt uden login via
`POST https://app.nembadminton.dk/graphql`. Den eksisterende normaliserede
database blev kun læst; historikken ligger i den separate
`statistik/data/rangliste-historik.db`.

## Spillerkobling

GSB-populationen blev defineret som spillere, der i den lokale database står på
GSB-siden af mindst én individuel holdkamp: **677** spillere. Den offentlige
`highestPointGain(clubhouseId: 331, limit: 1000)` blev kørt for HS, DS, HD, DD,
MxH og MxD med alle kendte vintages. Det gav 964 rå roster-rækker og **386
unikke Nembadminton-medlemmer**.

| Koblingsstatus | Antal |
|---|---:|
| Entydigt normaliseret navnematch (`exact_name`) | 345 |
| Tvetydige navnekollisioner (4 links; 2 GSB-spillere med flere Nembadminton-ID'er) | 4 |
| GSB-spillere uden entydigt aktuelt roster-match | 330 |
| Nembadminton-medlemmer uden GSB-navnematch | 37 |

De tvetydige links er gemt som `ambiguous_name_collision`; ingen af dem bruges
som sikre koblinger. Der blev ikke gættet på aliaser.

## Hentede snapshots

De 349 entydigt koblede medlems-ID'er blev hentet i **7** bulk-kald til
`membersStats(ids: [...])`. Alle 7 svarede HTTP 200 uden GraphQL-fejl.
Der blev gemt **40.364** datapunkter for 349 medlemmer:

| Serie/felt | Antal |
|---|---:|
| `single` | 3.040 |
| `double` | 4.298 |
| `mix` | 3.294 |
| `raw:HS` | 5.377 |
| `raw:DS` | 2.356 |
| `raw:HD` | 6.923 |
| `raw:DD` | 3.410 |
| `raw:MxH` | 4.992 |
| `raw:MxD` | 3.089 |
| `raw:LEVEL` | 3.585 |

Der var **0** poster i `fetch_errors`. Hvert bulk-svar blev gemt i
`statistik/results/083-nembadminton-raw.json` med SHA-256; snapshots gemmer
den tilsvarende hash i `raw_response_sha256`. Genkørsel bruger primærnøgler og
duplikerer ikke snapshots.

## Filer og begrænsninger

- `statistik/data/rangliste-historik.db`: `player_link`, `ranking_snapshots` og
  `fetch_errors`.
- `statistik/scripts/083-hent-rangliste-historik.mjs`: idempotent udtræk.
- `statistik/results/083-rangliste-historik-summary.json`: maskinlæsbar optælling.
- 330 GSB-spillere mangler et entydigt navn i den nuværende Nembadminton-
  clubhouse-roster. Det er dokumenteret som manglende kobling, ikke som bevis
  på at historikken ikke findes.
