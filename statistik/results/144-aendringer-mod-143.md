# Opgave 144 — foreløbig placering mod 143

Kilde: 143-resultatet samt `liga-landskab.db` åbnet med `readOnly: true`. Databaserne blev ikke skrevet.

## Regel og Dx

Format læses fra parentes og niveau fra teksten umiddelbart efter aldersgruppen. `BD` ignoreres. Pointlofter for holdfællesskab bruges ikke som niveau. Dx behandles særskilt som `nybegynder (uden ranglistepoint)`, efter D. 136-undersøgelsen modsiger ikke dette: den siger, at Dx er belagt som begynderniveau i kilderne, men ikke implementeret i parseren.

2025/26 U09 står i 143 med formatet `3 spillere`, men uden placering; rå rækkenavne har format og niveau, og kortet udpeger udtrykkeligt alle disse rækker. De får derfor foreløbig placering og markeres med Christoffers uafgjorte hierarkivalg.

## 2026/27 — bedste GSB-format pr. årgang

| Årgang | Bedste format | Niveau | GSB-hold i rækken |
|---|---|---|---|
| U09 | 3 spillere | D, 3300 | Gladsaxe Søborg 1, Gladsaxe Søborg 2 |
| U11 | 4 spillere | B, 5600 | Gladsaxe Søborg 1 |
| U13 | 2+2 | B, 5200 | Gladsaxe Søborg 1 |
| U15 | 4 spillere | A, 7200 | Gladsaxe Søborg 1 |
| U17/U19 | 2+2 | B, 6800 | Gladsaxe Søborg 1 |

Holdene i hver linje er de GSB-hold, der deler den bedste placerbare GSB-række; rækkenavn og niveau er foreløbige.

## Rækker uden sikker aflæsning

- 2026/2027 U11: “U11 (4+2) - maks. 8500 p. holdfællesskab” — 136-parseren fortolker ikke rækken sikkert (status: intet niveau nødvendigt (eneste række)). Ingen GSB-hold knyttet i 143.
- 2026/2027 U11: “U11 D 4400 (4 spilllere)” — Intet entydigt kanonisk format i parentes. Ingen GSB-hold knyttet i 143.
- 2026/2027 U13: “U13 (4+3) - maks. 11500 p. holdfællesskab” — 136-parseren fortolker ikke rækken sikkert (status: intet niveau nødvendigt (eneste række)). Ingen GSB-hold knyttet i 143.
- 2026/2027 U15: “U15 (4+3) - maks. 14000 p. holdfællesskab” — 136-parseren fortolker ikke rækken sikkert (status: intet niveau nødvendigt (eneste række)). Ingen GSB-hold knyttet i 143.

## Afvigelser mod 143

Foreløbigt placerede division-rækker: 70 i 6 sæson/aldersgruppe-kombinationer. Alle øvrige 63 af 143’s 69 kombinationer har uændret placering. Kortets forventning om 64 uændrede kombinationer afstemmer ikke: 143 har 69 i alt, og målgruppen udgør seks kombinationer, altså 63 uændrede.

Bredde er uændret for alle kombinationer: placeringens foreløbige labels ændres ikke på region-8-rækkenøgler eller summer.

| Sæson | Årgang | Række | Format | Niveau | GSB-hold |
|---|---|---|---|---|---|
| 2025/2026 | U09 | U09 C 3600 (3 spillere) BD | 3 spillere | C 3600 | Gladsaxe Søborg 1 |
| 2025/2026 | U09 | U09 C 3600 (3 spillere) BD (2. halvår) | 3 spillere | C 3600 | Gladsaxe Søborg 1 |
| 2025/2026 | U09 | U09 D 3300 (3 spillere) BD | 3 spillere | D 3300 | Gladsaxe Søborg 2, Gladsaxe Søborg 3 |
| 2025/2026 | U09 | U09 D 3300 (3 spillere) BD (2. halvår) | 3 spillere | D 3300 | Gladsaxe Søborg 3, Gladsaxe Søborg 2, Gladsaxe Søborg 4, Gladsaxe Søborg 5 |
| 2025/2026 | U09 | U9 D, 3300 (3 spillere) | 3 spillere | D 3300 | — |
| 2026/2027 | U09 | U09 C-D 3400 (3 spillere) BD | 3 spillere | C-D 3400 | — |
| 2026/2027 | U09 | U09 D 3300 (3 spillere) BD | 3 spillere | D 3300 | Gladsaxe Søborg 1, Gladsaxe Søborg 2 |
| 2026/2027 | U09 | U9 D, 3300 (3 spillere) | 3 spillere | D 3300 | — |
| 2026/2027 | U09 | U9 Dx, 3000 (3 spillere) BD | 3 spillere | nybegynder (uden ranglistepoint) 3000 | Gladsaxe Søborg 3, Gladsaxe Søborg 4 |
| 2026/2027 | U11 | U11 D, 4200 (4 piger) | 4 piger | D 4200 | — |
| 2026/2027 | U11 | U11 D, 4200 (4 piger) BD | 4 piger | D 4200 | Gladsaxe Søborg 5 |
| 2026/2027 | U11 | U11 B, 5600 (4 spillere) BD | 4 spillere | B 5600 | Gladsaxe Søborg 1 |
| 2026/2027 | U11 | U11 C, 5000 (4 spillere) | 4 spillere | C 5000 | — |
| 2026/2027 | U11 | U11 C, 5000 (4 spillere) BD | 4 spillere | C 5000 | — |
| 2026/2027 | U11 | U11 C-D, 4700 (4 spillere) | 4 spillere | C-D 4700 | — |
| 2026/2027 | U11 | U11 C-D, 4700 (4 spillere) BD | 4 spillere | C-D 4700 | Gladsaxe Søborg 2 |
| 2026/2027 | U11 | U11 D, 4400 (4 spillere) | 4 spillere | D 4400 | — |
| 2026/2027 | U11 | U11 D, 4400 (4 spillere) BD | 4 spillere | D 4400 | — |
| 2026/2027 | U11 | U11 Dx, 4200 (4 spillere) | 4 spillere | nybegynder (uden ranglistepoint) 4200 | — |
| 2026/2027 | U11 | U11 Dx, 4200 (4 spillere) BD | 4 spillere | nybegynder (uden ranglistepoint) 4200 | Gladsaxe Søborg 3, Gladsaxe Søborg 4 |
| 2026/2027 | U13 | U13 A, 5800 (2+2) | 2+2 | A 5800 | — |
| 2026/2027 | U13 | U13 B, 5200 (2+2) | 2+2 | B 5200 | Gladsaxe Søborg 1 |
| 2026/2027 | U13 | U13 C, 4800 (2+2) | 2+2 | C 4800 | — |
| 2026/2027 | U13 | U13 C, 4800 (4 piger) BD | 4 piger | C 4800 | — |
| 2026/2027 | U13 | U13 D, 4400 (4 piger) | 4 piger | D 4400 | — |
| 2026/2027 | U13 | U13 D, 4400 (4 piger) BD | 4 piger | D 4400 | Gladsaxe Søborg 6 |
| 2026/2027 | U13 | U13 A, 6400 (4 spillere) BD | 4 spillere | A 6400 | — |
| 2026/2027 | U13 | U13 B, 5600 (4 spillere) | 4 spillere | B 5600 | — |
| 2026/2027 | U13 | U13 B, 5600 (4 spillere) BD | 4 spillere | B 5600 | Gladsaxe Søborg 2 |
| 2026/2027 | U13 | U13 C, 5100 (4 spillere) | 4 spillere | C 5100 | — |
| 2026/2027 | U13 | U13 C, 5100 (4 spillere) BD | 4 spillere | C 5100 | — |
| 2026/2027 | U13 | U13 C-D, 4800 (4 spillere) | 4 spillere | C-D 4800 | — |
| 2026/2027 | U13 | U13 C-D, 4800 (4 spillere) BD | 4 spillere | C-D 4800 | Gladsaxe Søborg 3 |
| 2026/2027 | U13 | U13 D 4600 (4 spillere) | 4 spillere | D 4600 | — |
| 2026/2027 | U13 | U13 D, 4600 (4 spillere) | 4 spillere | D 4600 | — |
| 2026/2027 | U13 | U13 D, 4600 (4 spillere) BD | 4 spillere | D 4600 | — |
| 2026/2027 | U13 | U13 Dx, 4400 (4 spillere) | 4 spillere | nybegynder (uden ranglistepoint) 4400 | — |
| 2026/2027 | U13 | U13 Dx, 4400 (4 spillere) BD | 4 spillere | nybegynder (uden ranglistepoint) 4400 | Gladsaxe Søborg 4, Gladsaxe Søborg 5 |
| 2026/2027 | U15 | U15 M, 7800 (2+2) | 2+2 | M 7800 | — |
| 2026/2027 | U15 | U15 A, 6800 (2+2) | 2+2 | A 6800 | — |
| 2026/2027 | U15 | U15 B, 5800 (2+2) | 2+2 | B 5800 | — |
| 2026/2027 | U15 | U15 C, 5200 (2+2) | 2+2 | C 5200 | — |
| 2026/2027 | U15 | U15 D, 4800 (2+2) | 2+2 | D 4800 | — |
| 2026/2027 | U15 | U15 B, 5400 (4 piger) BD | 4 piger | B 5400 | — |
| 2026/2027 | U15 | U15 C, 4900 (4 piger) | 4 piger | C 4900 | Gladsaxe Søborg 7 |
| 2026/2027 | U15 | U15 D, 4500 (4 piger) | 4 piger | D 4500 | — |
| 2026/2027 | U15 | U15 A, 7200 (4 spillere) | 4 spillere | A 7200 | Gladsaxe Søborg 1 |
| 2026/2027 | U15 | U15 B, 6200 (4 spillere) | 4 spillere | B 6200 | — |
| 2026/2027 | U15 | U15 B, 6200 (4 spillere) BD | 4 spillere | B 6200 | Gladsaxe Søborg 2, Gladsaxe Søborg 3 |
| 2026/2027 | U15 | U15 C, 5500 (4 spillere) | 4 spillere | C 5500 | — |
| 2026/2027 | U15 | U15 C-D, 5100 (4 spillere) | 4 spillere | C-D 5100 | — |
| 2026/2027 | U15 | U15 C-D, 5100 (4 spillere) BD | 4 spillere | C-D 5100 | Gladsaxe Søborg 4 |
| 2026/2027 | U15 | U15 D 4800 (4 spillere) | 4 spillere | D 4800 | — |
| 2026/2027 | U15 | U15 D, 4800 (4 spillere) | 4 spillere | D 4800 | — |
| 2026/2027 | U15 | U15 D, 4800 (4 spillere) BD | 4 spillere | D 4800 | Gladsaxe Søborg 5 |
| 2026/2027 | U15 | U15 Dx, 4600 (4 spillere) | 4 spillere | nybegynder (uden ranglistepoint) 4600 | Gladsaxe Søborg 6 |
| 2026/2027 | U17/U19 | U17/U19 B, 6800 (2+2) | 2+2 | B 6800 | Gladsaxe Søborg 1 |
| 2026/2027 | U17/U19 | U17/U19 C, 5800 (2+2) | 2+2 | C 5800 | — |
| 2026/2027 | U17/U19 | U17/U19 D, 5000 (2+2) | 2+2 | D 5000 | — |
| 2026/2027 | U17/U19 | U17/U19 C, 5300 (4 piger) | 4 piger | C 5300 | — |
| 2026/2027 | U17/U19 | U17/U19 D, 4800 (4 piger) BD | 4 piger | D 4800 | Gladsaxe Søborg 4 |
| 2026/2027 | U17/U19 | U17/U19 M, 9600 (4 spillere) | 4 spillere | M 9600 | — |
| 2026/2027 | U17/U19 | U17/U19 A, 8200 (4 spillere) | 4 spillere | A 8200 | — |
| 2026/2027 | U17/U19 | U17/U19 B, 7200 (4 spillere) | 4 spillere | B 7200 | — |
| 2026/2027 | U17/U19 | U17/U19 C, 6200 (4 spillere) | 4 spillere | C 6200 | — |
| 2026/2027 | U17/U19 | U17/U19 C, 6200 (4 spillere) BD | 4 spillere | C 6200 | — |
| 2026/2027 | U17/U19 | U17/U19 C-D, 5500 (4 spillere) | 4 spillere | C-D 5500 | — |
| 2026/2027 | U17/U19 | U17/U19 C-D, 5500 (4 spillere) BD | 4 spillere | C-D 5500 | Gladsaxe Søborg 2, Gladsaxe Søborg 3 |
| 2026/2027 | U17/U19 | U17/U19 D, 5100 (4 spillere) | 4 spillere | D 5100 | — |
| 2026/2027 | U17/U19 | U17/U19 M, 14000 (4+2) | 4+2 | M 14000 | — |

## Stikprøve og værn

15 GSB-hold/række-stikprøver fra 2026/27 kontrolleret mod rå tabeller: 15/15 bestod; U09: 4, Dx: 6. 136’s registrerede testkørsel er 28/28; testfilerne og parseren er ikke ændret.
Bredde ens: 69/69; placering uændret uden for målgruppen: 63/63.
DB SHA-256 før/efter — liga-landskab: 9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c / 9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c; gsb-statistik-normalized: 49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e / 49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e. Rækketalstabeller identiske før/efter.

## Spørgsmål

Kortet forventer 64 uændrede kombinationer. 143’s output indeholder 69 kombinationer; de seks mål-kombinationer giver 63 uændrede. Bekræft, om kortets forventede total var 70 eller om en kombination mangler i 143.
