# Opgave 101 — København-trådmatching med GSB-kontrol

## Metode

Kun `region_id=8` og `age_group_id=1` læses fra de regionale data. 089s eksisterende DH-rækker læses uændret og kombineres med København-rækker, der både er `grundspil` i kataloget og passer en eksplicit periode-mapping. Kvalifikation, oprykning og nedrykning bliver dermed kontekst, ikke selvstændige hjemmeniveauer.

## Versioneret København-mapping

| Sæsoner | Rå familie | Niveau |
| --- | --- | --- |
| 2011/2018 | KS-familien | København topserie |
| 2018/2022 | KBH Serien | København topserie |
| 2022/2027 | Københavnsserien | København topserie |
| 2011/2027 | nummereret Serie | København Serie {nummer} |

Nummererede `Serie`-navne beholdes som deres rå nummer (fx `København Serie 30`); der udledes ingen uprøvet styrkerækkefølge af tallet.

## Samlet resultat

| Mål | Antal |
| --- | ---: |
| DH-kilder fra 089 | 2206 |
| København-kilder efter mapping | 1301 |
| Kanoniske sæsonknuder | 3475 |
| Automatiske nabosæson-kanter | 2920 |
| Samme-sæson ambiguity reviews | 16 |
| København-rækker fravalgt som eksplicit slutspil | 0 |

## Navngiven accepttest — GSB seniorhold: DH + København

| Kontrol | Antal |
| --- | ---: |
| GSB-holdtråde | 7 |
| Sammenhængende mellem observerede sæsoner | 6 |
| Tråde med internt sæsonbrud | 1 |
| Flaggede brud uden årsagsgæt | 1 |
| GSB same-season ambiguity reviews | 2 |
| Automatiske DH↔København-overgange | 2 |

Hvert internt GSB-brud står i JSON-outputtet som `kræver_Christoffers_gennemgang_ingen_kildeevidens_for_årsag`. Opgaven klassificerer ikke disse som hverken datamangel eller matchingfejl uden yderligere evidens.

## GSB-tråde

| Normaliseret identitet | Observerede sæsoner | Første–sidste | Status |
| --- | ---: | --- | --- |
| gladsaxe søborg hold 1 | 17 | 2010/2011–2026/2027 | sammenhængende_mellem_observerede_sæsoner |
| gladsaxe søborg hold 2 | 15 | 2012/2013–2026/2027 | sammenhængende_mellem_observerede_sæsoner |
| gladsaxe søborg hold 3 | 15 | 2012/2013–2026/2027 | sammenhængende_mellem_observerede_sæsoner |
| gladsaxe søborg hold 4 | 5 | 2015/2016–2026/2027 | brud_flagget_uden_gæt |
| gladsaxe søborg hold 5 | 3 | 2024/2025–2026/2027 | sammenhængende_mellem_observerede_sæsoner |
| gladsaxe søborg hold 6 | 2 | 2025/2026–2026/2027 | sammenhængende_mellem_observerede_sæsoner |
| gladsaxe søborg hold 7 | 1 | 2026/2027–2026/2027 | sammenhængende_mellem_observerede_sæsoner |

## GSB-flaggede brud

| Hold | Fra | Til | Manglende sæsoner | Klassifikation |
| --- | --- | --- | ---: | --- |
| gladsaxe søborg hold 4 | 2015/2016 (København Serie 4) | 2023/2024 (København Serie 31) | 7 | kræver Christoffers gennemgang; ingen årsag udledt |

## GSB same-season-uklarheder

| Sæson | Hold | Gemte grundspilskilder |
| --- | --- | --- |
| 2015/2016 | gladsaxe søborg hold 5 | Gladsaxe Søborg 5: 30. serie (6020); Gladsaxe Søborg 5 udgået: 5. serie P1 (6022) |
| 2016/2017 | gladsaxe søborg hold 4 | Gladsaxe Søborg 4 udgået: 4. Serie P2 (7643); Gladsaxe Søborg 4 trukket: 30. Serie P1 (7644) |

## Værn

- 092s eksisterende DH-facit er læst, ikke regenereret: 166/170 automatiske kanter og 2206 kilder i baseline.
- Mappingen indeholder kun `region_id=8`; den indeholder ingen Kredsserie Vest- eller Bornholmsserie-rækker.
- Databaserne åbnes read-only. Hash-kontrol før/efter dokumenteres i opgavekortet.

