# Opgave 124 — holdside, makkere og sætresultater

## Resultat

Den gemte, render-godkendte kamptekst blev genparset uden nye kald. Resultatet
ligger i den nye tabel `player_match_extras` i `national-spillere.db`; ingen
eksisterende tabel blev ændret.

| Måling | Antal |
|---|---:|
| Kampe med spillerrelationer og ekstra-rækker | 164.568 |
| `player_match_extras`-rækker | 3.779.792 |
| `ok` | 2.970.538 |
| `uklar_navnekobling` | 806.425 |
| `kamptekst_mangler_blokke` | 2.829 |
| `afkortet` | 0 |
| Rækker med `team_side` | 2.970.538 |
| Rækker med makker-ID | 1.896.721 |
| Rækker med rå sætresultat | 3.561.325 |
| Rækker med eksplicit `(Ikke fremmødt)` | 45.762 |

`team_side` er kun sat, når alle spillernavne i den konkrete disciplinblok
kunne kobles entydigt til de eksisterende relationer. Dobbeltmodstandere
gemmes ikke i det ene historiske `opponent_player_id`-felt, fordi to modstandere
ikke kan repræsenteres uden at miste information. Sætresultater bevares som rå,
tab-adskilte teksttokens, fx `18 - 21 | 21 - 12 | 21 - 11`.

## Obligatorisk GSB-validering

GSB-databasen har ikke de nationale numeriske spiller-ID'er; dens
`external_player_id`-værdier er `name:*`. Sammenligningen bruger derfor kun
entydigt normaliserede spillernavne inden for samme kamp og disciplin.

| Kontrol | Match | Afvigelse | Matchprocent |
|---|---:|---:|---:|
| Holdside | 51.424 / 51.464 | 40 | 99,922 % |
| Makker, når sammenlignelig | 37.941 / 37.945 | 4 | 99,989 % |

De 40 sideafvigelser er koncentreret i fire hele kampe (`296196`, `419354`,
`467598`, `491850`; henholdsvis 12, 8, 12 og 8 rækker), hvor den ældre
GSB-import har modsat hjemme/ude af den gemte nationale kamptekst. De fire
makkerafvigelser er navnevariationer i GSB-data: `Cedric`/`Cedrich Henri Kragh`,
`Patrick Benjamin Petersen`/`Patrick Petersen` og `Kenneth Wettendorff`/
`Kenneth Wettendorff Petersen`. De er derfor beholdt som dokumenterede
kildeforskelle; parseren eller de beskyttede kildetabeller er ikke ændret.

## Visuel stikprøve

20 kampe blev læst i den gemte `context_raw`-tekst, med sæsonspredning
2010–2026: `22818`, `22819`, `22820`, `22821`, `147`, `48878`, `93842`,
`140946`, `192276`, `236705`, `280500`, `321822`, `364143`, `385426`,
`405771`, `424887`, `443869`, `463821`, `484961`, `507270`. Teksten viser
hjemme-navneblokken først, ude-navneblokken derefter og rå sætresultater bagefter.
De tilhørende ekstra-rækker indeholder holdside for alle `ok`-rækker; de tre
seneste år i stikprøven har hver 28 rækker med side, 20 med makker og 28 med
sætresultat. Kamp `337416` blev desuden brugt som isoleret GSB-pilot: 16/16
holdsider, 8/8 makkere og 16/16 sætresultater blev afledt, og den matchede GSB
fuldt ud.

## Kendte huller

`uklar_navnekobling` omfatter kun rækker, hvor den rå blok ikke kan forbindes
entydigt med de gemte spillerrelationer. De er ikke udfyldt ved navn-gæt.
`kamptekst_mangler_blokke` har tekst og spillerrelation, men ingen relevant
disciplinblok. Kampe uden spillerlinks fra 120 indgår ikke i tabellen og er
fortsat dokumenterede datakildehuller, ikke parserfejl.

## Værn

| Tabel | Før | Efter |
|---|---:|---:|
| `players` | 76.169 | 76.169 |
| `matches` | 203.012 | 203.012 |
| `player_matches` | 3.400.576 | 3.400.576 |
| `scrape_progress` | 203.012 | 203.012 |

SHA-256 efter kørslen: `gsb-statistik-normalized.db` =
`49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` og
`liga-landskab.db` =
`9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`.
Begge matcher værdierne før kørslen.
