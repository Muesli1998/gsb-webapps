# Opgave 021 — stikprøve af frisk browserhentning

Stikprøven fortsatte med de øvrige seks ikke-eksplicitte rækker, som er
tilgængelige i den gemte 013-sample. Metoden var den validerede
in-app-browser/CUA-metode; ingen Playwright eller anden workaround blev brugt.

| Kamp-ID | URL forsøgt | Godkendt (ikke standardskal) | Ny kategorisektion |
|---:|---|---|---|
| 2286 | `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,2011,101,1,8,,2286,1093,` | Nej — kun standardskal; kampnr, runde/dato, hjemme-/udehold og resultat var ikke synlige | Ikke undersøgt |
| 96231 | `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,2013,2690,1,8,,96231,1093,` | Nej — standardskal | Bekræftet fortsat tomt |
| 142978 | `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,2014,4267,1,8,,142978,1093,` | Nej — standardskal | Bekræftet fortsat tomt |
| 2365 | `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,2011,103,1,8,,2365,1093,` | Nej — standardskal | Bekræftet fortsat tomt |
| 2396 | `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,2011,104,1,8,,2396,1093,` | Nej — standardskal | Bekræftet fortsat tomt |
| 2509 | `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,2011,107,1,8,,2509,1093,` | Nej — standardskal | Bekræftet fortsat tomt |
| 2664 | `https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,2011,74,1,8,,2664,1093,` | Nej — standardskal | Bekræftet fortsat tomt |

Resultat: 7 af 109 forsøgte i stikprøven; 0 godkendte hentninger; 6
bekræftet fortsat tomme efter første standardskal. De øvrige ~102 er ikke
forsøgt.

**Opdatering 2026-09-15 — manuelt bekræftet af Chris:** kamp 2286 blev
åbnet direkte i browseren. Siden indeholder reelt INGEN kampinformation
(hverken kampnr, dato, hold eller resultat) — standardskallen CUA-metoden
returnerede var altså korrekt, ikke et tegn på at metoden er utilgængelig.
Kamp 2286 er dermed bekræftet fortsat manglende ved kilden selv, ikke ved
et fejlslagent forsøg. Stikprøven kan fortsætte mod de øvrige 108 med
samme metode.
