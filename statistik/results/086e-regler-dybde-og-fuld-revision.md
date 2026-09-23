# Opgave 086e — regler, fuld overgangsrevision og puljerenhed

Genereret: 2026-09-23T18:36:20.831Z

## Mål 1 — tilgængelige reglementsår

Gennemgåede/fundne udgaver: 2020, 2022, 2023 (juli og november), 2024, 2025 og 2026. 2019, 2021 og 2027 blev ikke fundet som særskilte offentlige DH-PDF'er i denne søgning. Hver fundet udgave og URL ligger i JSON. 2026 §26-citatet dækker klublofter, puljeseparation, første-runde-opgør og tvangsnedrykning; §28-citatet dækker afslag-kaskaden. 2023-2026 §5-teksterne bekræfter, at regionale kredse fastsætter egne lokale op-/nedrykningsregler.

## Mål 2 — vendt overgangsrevision

Der blev bygget 691 seniorstillinger fra gemte kampresultater.

| Kandidatklassifikation | Antal |
|---|---:|
| candidate_found_lower_level | 188 |
| exact_candidate_found | 131 |
| not_found_next_level | 378 |
| same_club_other_team | 92 |
| not_found_lower_level | 233 |

Nye hold i næste niveau pr. overgang blev også opgjort uden fast puljenummer:

| Nyt-hold-status | Antal |
|---|---:|
| new_or_returning | 1353 |
| new_from_lower_level | 231 |

Rå, række-for-række lister ligger i JSON. Kategorien `not_found_next_level`/`not_found_lower_level` betyder kun, at samme normaliserede klub+holdidentitet ikke blev fundet; det beviser ikke i sig selv udgået hold, afslag eller forkert kilde.

## Mål 3 — renhed pr. pulje

| Renhedsinterval | Puljer |
|---|---:|
| 100% | 418 |
| 80-99% | 67 |
| 50-79% | 194 |
| under-50% | 12 |

Samlede holdklassifikationer: 2413 øst, 2175 vest, 11 blandede lokalhistorier, 158 ukendte. Alle ukendte hold med individuel årsag ligger i JSON.

Fyn- og Jyllandsetiketterne BADFYN/BADMIDJ/BADNDRJ/BADSDRJ forekommer som lokalseriehistorik og blev derfor evidensbaseret behandlet som vest; ingen automatisk navneantagelse blev brugt.

## Afgrænsning

Ingen nye API-kald og ingen databaseændringer.

## Regelcitater og kilder

Den fulde kildeoversigt ligger i den tilhørende JSON. Centrale direkte citater fra 2026-udgaven (DH-reglementet, §26 stk. 1-2, PDF side 11-12):

> "Der kan kun deltage ét hold fra hver klub i hver division, kvalifikations- og nedrykningsspil, dog med undtagelse af 3. division, Danmarksserien, kvalifikation til 2. division, nedrykningsspillet fra 3. division, kvalifikation til 3. division og nedrykningsspillet fra Danmarksserien, hvor hver klub kan deltage med to hold. En klub kan maksimalt deltage med 5 hold i DH-turneringen."

> "Hold fra samme klub skal så vidt muligt ikke placeres i samme pulje. Skulle 2 hold fra samme klub komme i samme pulje/slutspilspulje, skal disse 2 hold mødes i første runde af grundspillet/slutspillet ..."

> "Har en klub kvalificeret mere end det maksimalt fastsatte antal hold ... nedrykkes det af klubbens hold, der er lavest placeret i slutspillet ..."

Kilde: https://badminton.dk/wp-content/uploads/2026/07/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-07-01-endeligt-med-bilag-3-1.pdf. 2020, 2022, 2023-juli, 2023-november, 2024 og 2025 er registreret med separate URL'er i JSON; 2019, 2021 og 2027 blev ikke fundet som særskilte offentlige DH-PDF'er.
