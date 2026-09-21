# 082 — opfølgning: historikgrænse i `memberStats`

Dato: 2026-09-21. Alle kald var read-only og uden login.

## Flere spillere

Den samme `membersStats(ids: [...])`-forespørgsel blev kørt for fem GSB-medlemmer,
fundet via den login-frie `highestPointGain`-roster. Første og sidste rå
`member.points.version` varierede:

| Spiller | ID | Vintage | Første rå version | Sidste rå version | Første serieversion |
|---|---:|---|---|---|---|
| Adnan Bacic | 16214 | SEN | 2023-02-01 | 2026-09-02 | 2025-08-02 |
| Morten Høyrup | 34674 | SEN | 2024-10-02 | 2026-09-02 | 2025-08-02 |
| Sebastian Almeida Møller | 16467 | U19 | 2022-09-01 | 2026-09-02 | 2025-08-02 |
| Konrad Bybeck Tosev | 43097 | U15 | 2026-07-02 | 2026-09-02 | 2026-07-02 |
| Oliver Guldbæk | 16229 | SEN | 2022-09-01 | 2026-09-02 | 2025-08-02 |

Det afkræfter, at 2023-02-01 er en fast startdato for alle spillere. Det viser
dog ikke data før 2022; det er derfor ikke bevis på komplette data tilbage til
2010.

## Introspektion og ældre dato

`memberStats` har kun argumentet `id: ID!`. Felterne `mix`, `single` og `double`
har ingen argumenter. `Member.points` har to argumenter: `version: Date` og
`where`; `DataPoint` har ingen argumenter.

Det eneste relevante datoargument blev afprøvet på spiller `16214`:

| `version` | HTTP | Antal poster |
|---|---:|---:|
| `2010-01-01` | 200 | 0 |
| `2015-01-01` | 200 | 0 |
| `2023-02-01` | 200 | 3 |
| `2026-09-02` | 200 | 3 |

Der findes ingen `from`, `to`, `before`, `after`, `limit`, `cursor` eller
`seasonId` på `memberStats` eller tidsserie-felterne i det inspicerede skema.

## Konklusion

2023-02-01 er spillerspecifik i den rå `member.points`-liste, fordi de fem
spillere starter på fem forskellige datoer. Den ældste observerede dato var
2022-09-01. Samtidig returnerede det eneste relevante datoargument tomme svar
for 2010 og 2015. Der er derfor ingen kendt, offentligt dokumenteret vej til
ældre ranglistepoint end de snapshots Nembadminton selv returnerer.
