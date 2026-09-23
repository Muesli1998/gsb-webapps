# Opgave 086d — genbesøg oprykning/nedrykning og Vest/Øst

Genereret: 2026-09-23T18:21:33.913Z

## Mål 1 — regler på tværs af år

| Regel | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|
| DH-stigen omfatter Badmintonligaen–Danmarksserien | PDF §3/indholdsfortegnelse | samme DH-kilde varslet for 2023/24 | PDF §5/§8-§14 | PDF §3/indhold | PDF §3 og indhold |
| Maks. 5 DH-hold pr. klub | Ja, §26 (trykt som ændring fra 2023/24) | overgang angivet i 2022-udgaven | Ja, §26 | PDF fundet, ikke særudtrukket her | Ja, §26 |
| Maks. 2 i Danmarksserien | Ja fra 2023/24, §26 | Ja | Ja | PDF fundet | Ja |
| Samme klub så vidt muligt i forskellige puljer + første runde indbyrdes | §26 | samme regelspor | §26 | PDF fundet | §26 |
| Tvangsnedrykning ved for mange klubhold | §26 stk.2 | samme regelspor | §26 stk.2 | PDF fundet | §26 stk.2 |
| Afvist oprykningsplads | §28: før program udsendes går plads til bedst placerede ikke-kvalificerede fra samme pulje; efter udsendelse w.o./fastlagt event | samme regelspor | §26/§28 | PDF fundet | §28 |

Direkte PDF-evidens: 2022 §26-§29, 2024 §26-§28 og 2026 §26-§29. 2026 §5 siger samtidig eksplicit, at kredsene selv fastsætter lokale op-/nedrykningsregler.

## Mål 2 — slutstillinger og næste niveau

- Byggede **691** senior-puljestillinger fra `league_matches.team_score_raw` (sejre/tab, score difference) uden at ændre databasen.
- Tophold som brede oprykningskandidater: **601**; klubben findes i næste niveau året efter i **122** tilfælde.
- Bundhold som brede nedrykningskandidater: **421**; klubben findes i næste lavere niveau året efter i **100** tilfælde.
- Testen søger i hele næste niveau, aldrig et bestemt puljenummer. Kandidaterne er indikatorer, ikke endelige oprykningsbeviser, når kvalifikations-/slutspilsdata eller regler mangler.

## Mål 3 — Vest/Øst med lokalseriehistorik

- Primær metode: klubbers gemte lokalseriehistorik via regionens short_name. `BADFYN/BADMIDJ/BADNDRJ/BADSDRJ` er eksplicit grupperet som vestlige lokalserieetiketter i denne analyse; postnummer blev brugt som supplerende fallback for klubber uden lokalhistorik; ingen ekstra grupper blev dermed ændret i denne kørsel.
- Puljefordelingen pr. niveau ligger i JSON med east/west/mixed/unknown pr. pulje.
| Niveau | Puljer | Overvejende øst | Overvejende vest | Blandede | Ukendte |
|---|---:|---:|---:|---:|---:|
| Badmintonligaen | 90 | 44 | 8 | 25 | 13 |
| 3. division | 184 | 83 | 82 | 18 | 1 |
| 1. division | 58 | 38 | 11 | 9 | 0 |
| 2. division | 89 | 46 | 24 | 19 | 0 |
| Danmarksserien | 270 | 129 | 133 | 7 | 1 |

Undtagelser og konkrete hold findes i JSON; blandede/ukendte puljer bruges ikke som binært bevis.

## Afgrænsning og værn

- Ingen nye API-kald. `gsb-statistik-normalized.db` og `rangliste-historik.db` er read-only; `liga-landskab.db` er ikke skrevet.
- SHA-256 og statusværn står i opgavekortets resultatnote.
