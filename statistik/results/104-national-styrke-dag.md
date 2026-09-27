# Opgave 104 — national styrke-DAG

## Model

Dette er en **delvis ordning**, ikke en samlet placeringstabel. En pil betyder kun et dokumenteret niveauforhold. Uden pil er noderne sideordnede/uafgjorte.

Almindelige kanter er familierene: de sammenligner kun én identisk spilleform-familie. Fire kanter af typen **`strukturel_regeltekst`** udgør den eneste godkendte undtagelse: Badminton Danmarks officielt navngivne DH-stige. De er særskilte, strukturelle noder og er **ikke** sportslige sammenligninger mellem kategorisignaturer. Undtagelsen gælder kun Ligaen ↔ 1. division ↔ 2. division ↔ 3. division ↔ Danmarksserien; alle andre familiegrænser er fortsat absolutte.

## Dækning

- Regioner i kataloget: **33**.
- Pulje-region-forekomster: **59127**.
- Unikke puljer: **18546**.
- DAG-noder: **20145**; dokumenterede kanter: **8**; eksplicit uforbundne noder: **20134**.

## Dokumenterede niveauforhold

| Stærkere niveau | Svagere niveau | Kanttype | Belæg | Kilde |
|---|---|---|---|---|
| 1. division | 2. division | familieren_regeltekst | regeltekst | 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| 2. division | 3. division | familieren_regeltekst | regeltekst | 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| 3. division | Danmarksserien | familieren_regeltekst | regeltekst | 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| Badmintonligaen | 1. division | familieren_regeltekst | regeltekst | 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| Badmintonligaen | 1. division | strukturel_regeltekst | regeltekst | Chris-bekræftet afgrænset undtagelse 2026-09-27; 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| 1. division | 2. division | strukturel_regeltekst | regeltekst | Chris-bekræftet afgrænset undtagelse 2026-09-27; 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| 2. division | 3. division | strukturel_regeltekst | regeltekst | Chris-bekræftet afgrænset undtagelse 2026-09-27; 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| 3. division | Danmarksserien | strukturel_regeltekst | regeltekst | Chris-bekræftet afgrænset undtagelse 2026-09-27; 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |

## Hvad DAG'en bevidst ikke gør

- Den sammenligner ikke spilleform-familier sportsligt. DH-undtagelsen er en separat organisatorisk struktur.
- Den placerer ikke regionale serier indbyrdes eller under Danmarksserien uden en særskilt citeret overgang.
- Den bruger ikke 087's lave hold-kæde-rate til at opfinde flere kanter; 087 er kun støtte for, at konkrete holdspor er begrænsede.
- Fase-/spilletidssider er beholdt som noder, men er ikke styrkeniveauer.

Maskinlæsbar struktur: [104-national-styrke-dag.json](104-national-styrke-dag.json).
