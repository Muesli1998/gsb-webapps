# Opgave 086b — empirisk oprykning, Vest/Øst, ungdom og holdforskydning

Genereret: 2026-09-23T17:52:38.292Z

## Mål 1 — regional seniortopkreds → Danmarksserie

- GSB seniorholdrækker: **94**.
- Sæson-til-sæson kandidater via samme klub/holdnavn: **312**.
- Ingen er kaldt bekræftet oprykning: gemte tabeller har ingen eksplicit oprykningshændelse.

## Mål 2 — officielle regler

| Overgang/område | Faktisk kilde/fund | Status |
|---|---|---|
| DH-stigen Badmintonligaen–Danmarksserien | BD holder et samlet DH-reglement og særskilt ungdomsreglement på https://badminton.dk/holdturneringsregler/ | officiel kilde fundet; konkrete årgangsparagraffer ikke fuldt udtrukket |
| 3. division ↔ Danmarksserien | DH-reglement §§23 stk.5, 24 stk.3-4 og 28 er allerede citeret i 084/086-konteksten | dokumenteret i eksisterende repo-kilde |
| Sjællandsserien ↔ Serie 1–3 | Sjællandsreglement 2025 §5, §8, Appendix 1; geografiske puljer og foregående placering styrer niveau | dokumenteret |
| Københavnsserien/serier | Badminton København 2023-24 §§8–12: normalt top 2 op, nedrykning reguleres efter niveau/DS | dokumenteret |
| Fyn Mesterrække/Serie 1–3 | Holdturnering Fyn §§12–13: direkte op/ned efter placering | dokumenteret |
| Ungdom | BD har fælles ungdomsreglement; historisk puljeovergang ikke udledt her | kilde fundet, historisk mapping ikke fundet |
| Maks. 5 DH / maks. 2 DS pr. klub | ikke eksplicit bekræftet i de undersøgte offentlige kilder | ikke fundet |

## Mål 3 — Vest/Øst pr. seniorniveau

Postal-geografien er en heuristik og ikke et officielt regionsfelt.

| Niveau | Puljer | Øst | Vest | Blandede | Ukendt |
|---|---:|---:|---:|---:|---:|
| 3. division | 186 | 0 | 0 | 44 | 142 |
| Danmarksserien | 271 | 0 | 0 | 61 | 210 |
| Badmintonligaen | 93 | 0 | 0 | 0 | 93 |
| 1. division | 62 | 0 | 0 | 5 | 57 |
| 2. division | 90 | 0 | 0 | 23 | 67 |

Pulje 1–4/5–8-fordelingen ligger i JSON; blandede/ukendte grupper bruges ikke som forbindelsesbevis.

## Mål 4 — ungdom

- Rå divisionsnavne der gentages på tværs af regioner: **0**.
- Konklusion: for tyndt grundlag til at forbinde ungdomspuljer automatisk; ingen navnebaseret kobling.

## Mål 5 — bogstav til pointformat

| Alder | Første bogstav | Sidste bogstav | Første point | Sidste point |
|---:|---:|---:|---:|---:|
| 1 | 2011 | 2026 | 2023 | 2025 |
| 2 | 2013 | 2026 | 2019 | 2026 |
| 3 | 2011 | 2026 | 2019 | 2026 |
| 4 | 2011 | 2026 | 2019 | 2026 |
| 5 | 2011 | 2026 | 2019 | 2026 |
| 6 | 2011 | 2016 | — | — |
| 8 | 2011 | 2026 | — | — |
| 9 | 2011 | 2026 | — | — |
| 10 | 2013 | 2021 | — | — |
| 11 | 2013 | 2026 | — | — |
| 12 | — | — | — | — |
| 13 | 2016 | 2025 | — | — |
| 15 | — | — | — | — |
| 16 | 2013 | 2024 | — | — |
| 17 | — | — | — | — |
| 18 | 2015 | 2026 | 2019 | 2026 |
| 21 | 2011 | 2026 | 2019 | 2026 |

Datoerne er rå observationer; de viser ikke nødvendigvis én global overgang.

## Mål 6 — GSB spiller-ID på tværs af aldersgrupper

- Kategori-spillerrækker i GSB-kampe: **80928**.
- Distinkte spiller-ID’er: **9676**.
- ID’er i mere end én aldersgruppe samme sæson: **1405**.
- Dette er et signal, ikke årsagsbevis; navn-only links er ikke brugt.

## Afgrænsning og værn

- Ingen nye API-kald; begge normaliserede DB-filer er read-only; ingen skrivning til liga-landskab.db.
- Ingen oprykning eller regionsforbindelse er kaldt bekræftet uden citeret regel eller entydigt databevis.
