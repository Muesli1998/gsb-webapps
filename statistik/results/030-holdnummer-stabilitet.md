# Opgave 030 — holdnummer-stabilitet

Read-only analyse af `015-stillingskontrol.json` mod den normaliserede DB.

## Spørgsmål 1: findes en bedre nøgle?

`league_raw` indeholder liga-/aldersbetegnelse, men intet GSB-holdnummer.
På de 24 no-linked-rækker fandtes et GSB-navn i samme pulje i 23 tilfælde;
13 havde numerisk holdnummer på begge sider. Rå holdnummer matchede i **0/13**.
De observerede forskydninger (team_matches minus stilling) var:

| Forskydning | Antal |
|---:|---:|
| +1 | 9 |
| +2 | 1 |
| -1 | 1 |
| -2 | 1 |
| -3 | 1 |

I et kontroludsnit på 12 ikke-no-linked-rækker matchede rå holdnummer i
alle 7 rækker hvor begge sider havde numerisk nummer (7/7). Ingen felt i de
gemte data gav en mere pålidelig tværkilde-nøgle end at behandle holdnummer
som pulje-/kildespecifikt.

## Spørgsmål 2: systematisk forskydning?

Nej. De 13 numeriske no-linked-sammenligninger fordeler sig på fem
forskydninger (+1 ni gange, samt +2, -1, -2 og -3 én gang hver). Det er
ikke en konstant N→N+1-regel. Eksempler: 2011/pulje 60 er 2→3 (+1),
2011/pulje 74 er 3→(uden nummer), 2014/pulje 4247 er 3→4 (+1),
2017/pulje 9288 er 1→2 (+1), mens 2012/pulje 1301 er 3→2 (-1) og
2025/pulje 18733 er både 1→3 (+2) og 2→3 (+1).

## Hvor holdnummer antages stabilt i statistik-koden

- `scripts/check-standing-match-counts.mjs`: normaliseret råt holdnavn bruges
  som join-nøgle mellem `standings` og `team_matches`.
- `scripts/audit-no-linked-standings.mjs`: samme normaliserede navn bruges
  til at klassificere no-linked-rækker.
- `scripts/generate-normalized-import.mjs`: team-rækker og team_matches
  kobles via `teams.name_raw` for sæson/pulje/aldersgruppe.
- `scripts/analyze-gsb-standings.mjs`: filtrerer og sammenholder holdnavne
  fra browser-standings med kødata.

## Konklusion

Der er ikke fundet et allerede gemt felt, der løser problemet. Holdnummeret
varierer usystematisk mellem kilderne i de tilgængelige data og bør ikke
bruges som stabil identitet på tværs af kilder eller sæsoner.

