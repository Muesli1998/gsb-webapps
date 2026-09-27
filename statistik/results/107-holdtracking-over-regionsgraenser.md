# Opgave 107 — holdtracking over regionsgrænser

## Metode og afgrænsning

Hver region har en eksplicit, versioneret mapping fra (region_id, sæsoninterval, rå rækkenavn) til topniveau. Kun grundspilsrækker indgår. Der søges kun mellem to på hinanden følgende sæsoner, og kun hvor den ene side er regionens topserie og den anden Danmarksserien eller 3. division. Ingen alias er opfundet.

Metode A anvendes her som et strengt grænseanker: eksakt normaliseret klubnavn og samme holdnummer i den direkte næste sæson. Den fulde 087-kaskade bruges ikke til at udfylde ukendte lokale led, fordi denne opgave kun må bekræfte den konkrete dokumenterede regionsgrænse. Metode B og C registreres som signaler til manuel gennemgang, fordi 087 allerede viste, at de ikke alene er tilstrækkelige i den brede population. Ingen kandidat betyder ubekræftet, ikke at holdet beviseligt ophørte.

## Versionerede region-mappinger

| Region | region_id | Sæsoninterval | Rå række-familie | 105-strukturkant |
|---|---|---|---|---|
| Sjælland | 10 | 2011/2027 | /^sjællandsserien$/iu | regional_strukturel|Sjællandsserien |
| Lolland-Falster | 9 | 2011/2027 | /^lf[ -]?serien$/iu | regional_strukturel|LF-Serien |
| Bornholm | 3 | 2011/2016 | /^bornholmsserien$/iu | regional_strukturel|Bornholmsserien |
| Kredsserie Vest | 4, 5, 6, 7 | 2016/2027 | /^kredsserien? vest$/iu | regional_strukturel|Kredsserie Vest |

## Resultat pr. region

| Region | Regionale grundspilsknuder | Entydige fund | A | B-signal | C-signal | Flertydig/signal | Ubekræftet regional→DH |
|---|---:|---:|---:|---:|---:|---:|---:|
| Sjælland | 256 | 98 | 98 | 0 | 68 | 85 | 128 |
| Lolland-Falster | 87 | 2 | 2 | 0 | 3 | 3 | 83 |
| Bornholm | 22 | 0 | 0 | 0 | 0 | 0 | 22 |
| Kredsserie Vest | 352 | 94 | 94 | 0 | 93 | 119 | 196 |

## Entydige overgange

| Region | Fra | Til | Metode | Retning |
|---|---|---|---|---|
| Sjælland | 2011/2012 Helsinge 1 (Sjælland topserie) | 2012/2013 Helsinge (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2011/2012 Albertslund 1 (Sjælland topserie) | 2012/2013 Albertslund (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2011/2012 Næstved 1 (Sjælland topserie) | 2012/2013 Næstved (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2012/2013 Herlufsholm (Sjælland topserie) | 2013/2014 Herlufsholm (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2012/2013 &#216;nslev-Eskildstrup (Sjælland topserie) | 2013/2014 &#216;nslev-Eskildstrup (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2012/2013 Ishøj SB 50 (Sjælland topserie) | 2013/2014 Ishøj SB 50 (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2012/2013 Slagelse (Sjælland topserie) | 2013/2014 Slagelse (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2012/2013 Blistrup (Sjælland topserie) | 2013/2014 Blistrup (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2013/2014 Taastrup TIK (Sjælland topserie) | 2014/2015 Taastrup TIK (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2014/2015 Vordingborg (Sjælland topserie) | 2015/2016 Vordingborg (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2014/2015 Herlufsholm (Sjælland topserie) | 2015/2016 Herlufsholm (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2014/2015 Gribskov Badminton (Sjælland topserie) | 2015/2016 Gribskov Badminton (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2015/2016 Sorø (Sjælland topserie) | 2016/2017 Sorø (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2015/2016 Køge (Sjælland topserie) | 2016/2017 Køge (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2015/2016 Hørsholm (Sjælland topserie) | 2016/2017 Hørsholm (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2015/2016 Frem - Hellebæk (Sjælland topserie) | 2016/2017 Frem - Hellebæk (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2016/2017 &#216;lstykke (Sjælland topserie) | 2017/2018 &#216;lstykke (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2016/2017 Rødby (Sjælland topserie) | 2017/2018 Rødby (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2016/2017 Mørkøv (Sjælland topserie) | 2017/2018 Mørkøv (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2017/2018 Frem - Hellebæk (Sjælland topserie) | 2018/2019 Frem - Hellebæk (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2017/2018 Værløse 4 (Sjælland topserie) | 2018/2019 Værløse 4 (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2017/2018 Ringsted (Sjælland topserie) | 2018/2019 Ringsted (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2017/2018 Team Vejleå (Sjælland topserie) | 2018/2019 Team Vejleå (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2018/2019 Herlufsholm (Sjælland topserie) | 2019/2020 Herlufsholm (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2018/2019 Nivå-Kokkedal (Sjælland topserie) | 2019/2020 Nivå-Kokkedal (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2018/2019 Lillerød 3 (Sjælland topserie) | 2019/2020 Lillerød 3 (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2018/2019 Ledøje-Smørum (Sjælland topserie) | 2019/2020 Ledøje-Smørum (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2018/2019 Team GSG (Sjælland topserie) | 2019/2020 Team GSG (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2019/2020 Birkerød BK13 (Sjælland topserie) | 2020/2021 Birkerød BK13 (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |
| Sjælland | 2019/2020 Greve 4 (Sjælland topserie) | 2020/2021 Greve 4 (O) (Danmarksserien) | A_eksakt_klub_og_holdnummer | regional_til_DH |

## Spilleform og Bornholm/Lolland-Falster

Lolland-Falster og Bornholm behandles ikke som fejl, hvis en ellers entydig A-identitet går til/fra Danmarksserien med anden kategori-/spilleform-familie. Overgangen er kun tilladt i analysen, fordi 105's strukturel_regeltekst_regional-kant dokumenterer den organisatoriske oprykningsvej. Den bruges ikke til at sammenligne familier sportsligt.

Bornholms konkrete pladsbrug er ikke genstand for en særskilt historisk optælling her. Rapporten viser alene eventuelle konkrete nabosæson-spor på samme måde som de øvrige regioner.

## Begrænsning

087's kendte identitetsbegrænsning gælder fortsat. Denne rapport udvider ikke hold-ID-historik eller navnealiaser; ubekræftede og flertydige rækker bliver bevaret i JSON i stedet for tvunget til en tråd.

Maskinlæsbar rapport: [107-holdtracking-over-regionsgraenser.json](107-holdtracking-over-regionsgraenser.json).

