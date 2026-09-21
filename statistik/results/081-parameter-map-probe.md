# Opgave 081 — parameterkortlægning og senior-anomali

Probe kørt read-only mod de offentlige BadmintonPlayer-endpoints. Rå JSON-
svar, request-parametre, længder og SHA-256 findes i
`statistik/results/081-parameter-map-probe.json`; probe-scriptet er
`statistik/scripts/081-parameter-map-probe.mjs`.

## Gyldige parametre

De direkte katalog-endpoints er `GET /api/AgeGroup/Get` og `GET /api/Region`.
De gav henholdsvis 29 og 33 poster.

| ageGroupID | Navn |
|---:|---|
| 1 | SEN |
| 2 | U09 |
| 3 | U11 |
| 4 | U13 |
| 5 | U15 |
| 6 | U17 |
| 7 | U19 |
| 8 | SEN+35 |
| 9 | SEN+40 |
| 10 | SEN+45 |
| 11 | SEN+50 |
| 12 | SEN+55 |
| 13 | SEN+60 |
| 14 | SEN+65 |
| 15 | Andet |
| 16 | MOT |
| 17 | SEN+70 |
| 18 | U17/U19 |
| 19 | SEN+30 |
| 20 | U23 |
| 21 | UNG |
| 22 | SEN+75 |
| 23 | U10 |
| 24 | U12 |
| 25 | U14 |
| 26 | U16 |
| 27 | U18 |
| 28 | SEN+80 |
| 29 | U08 |

Regionkataloget indeholder følgende 33 poster (parent 1 = Badminton Danmark,
parent 2 = DGI):

| ID | Navn | Kort navn | Parent |
|---:|---|---|---:|
| 1 | Badminton Danmark | BADDAN | — |
| 2 | DGI | DGI | — |
| 3 | Badminton Bornholm | BADBORN | 1 |
| 4 | Badminton Midtjylland | BADMIDJ | 1 |
| 5 | Badminton Nordjylland | BADNDRJ | 1 |
| 6 | Badminton Sønderjylland | BADSDRJ | 1 |
| 7 | Badminton Fyn | BADFYN | 1 |
| 8 | Badminton København | BADKBH | 1 |
| 9 | Badminton Lolland-Falster | BADLF | 1 |
| 10 | Badminton Sjælland | BADSJ | 1 |
| 11 | EBU | — | — |
| 12 | IBF | — | — |
| 13 | INT | — | — |
| 14 | DGI Bornholm | DGI-BOR | 2 |
| 16 | DGI Fyn | DGI-FYN | 2 |
| 17 | DGI Midtjylland | DGI-MID | 2 |
| 18 | DGI Nordjylland | DGI-NOR | 2 |
| 19 | DGI Nordsjælland | DGI-NSJ | 2 |
| 20 | DGI Nordvest | DGI-NV | 2 |
| 22 | DGI Roskilde | — | 2 |
| 23 | DGI SdU | DGI-SDU | 2 |
| 24 | DGI Storkøbenhavn | DGI-STK | 2 |
| 25 | DGI Storstrømmen | DGI-STS | 2 |
| 26 | DGI Sydhavsøerne | — | 2 |
| 27 | DGI Sydvest | DGI-SYV | 2 |
| 28 | DGI Sydøstjylland | DGI-SYØ | 2 |
| 29 | DGI Sønderjylland | DGI-SØN | 2 |
| 30 | DGI Vestjylland | DGI-VES | 2 |
| 31 | DGI Midt- og Vestsjælland | DGI-MVS | 2 |
| 32 | DGI Østjylland | DGI-ØST | 2 |
| 33 | Badminton World Federation | BWF | 1 |
| 34 | Badminton Europe | BE | 1 |
| 35 | Fælles BD/DGI | BD-DGI | — |

## Senior-anomali

Der blev kaldt `GetLeagueStanding` med `subPage=1`, `seasonID=2026`,
`ageGroupID=1` for region 4, 5, 6 og 7 og derefter `subPage=2`,
`leagueGroupID=18888` for samme fire regioner.

Indekssvarene var **ikke** byte-for-byte identiske: længderne var 4.887,
11.184, 4.887 og 7.166 bytes, og alle fire SHA-256-værdier er forskellige.
Det konkrete puljesvar var også forskelligt på rå-byteniveau (alle 8.268
bytes, fire forskellige SHA-256-værdier), men den afkodede titel var identisk:
`BADMIDJ,BADNDRJ,BADSDRJ,BADFYN SEN 2026/2027`. HTML'en indeholdt samme
Pulje 1 og de samme otte hold, bl.a. Højbjerg 5 (N), Skovbakken 4,
Silkeborg BK 2 og Brabrand.

Konklusionen er derfor en reel **delt seniorpulje på tværs af de fire vestlige
Badminton Danmark-regioner**, ikke byte-identisk fallback. De forskellige
rå-svar afspejler regionskontekst/links, mens titel, pulje og holdliste viser
den fælles konkurrence. Det kan ikke beskrives som en generel fejl i
`regionID`-parameteren.

## Kaldestimat før fuld indsamling

2010–2026 inklusive er 17 sæsoner. Estimatet nedenfor gælder de første
`subPage=1`-kald, som finder pulje-ID'er; hvert unikt pulje-ID kræver derefter
et ekstra `subPage=2`-kald, hvis holdlisten skal gemmes.

| Scope | Beregning | Index-kald |
|---|---:|---:|
| Alle 33 katalogregioner | 17 × 29 × 33 | 16.269 |
| Badminton Danmark + 8 BD-kredse (ID 1,3–10) | 17 × 29 × 9 | 4.437 |
| BD + alle DGI-regioner | 17 × 29 × 27 | 13.311 |

Det samlede antal bliver baseline-tallet plus antallet af **unikke** pulje-ID'er
fundet i indeks-svarene. Det sidste kan ikke fastslås uden at køre den
historiske iteration. Fuld indsamling er derfor ikke startet; der er ikke
skrevet til `statistik/data/*.db`.
