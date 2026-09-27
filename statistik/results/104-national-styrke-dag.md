# Opgave 104 — national styrke-DAG

## Model

Dette er en **delvis ordning**, ikke en samlet placeringstabel. En pil betyder kun, at dokumenteret regeltekst forbinder de to niveauer inden for samme spilleform-familie. Uden pil er noderne sideordnede/uafgjorte. Det gælder især regionale serier, ungdom og alle familier uden dokumenteret overgang.

## Dækning

- Regioner i kataloget: **33**.
- Pulje-region-forekomster: **59127**.
- Unikke puljer: **18546**.
- DAG-noder: **20140**; dokumenterede kanter: **4**; eksplicit uforbundne noder: **20134**.

## Dokumenterede styrkeforhold

| Stærkere niveau | Svagere niveau | Belæg | Kilde |
|---|---|---|---|
| 1. division | 2. division | regeltekst | 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| 2. division | 3. division | regeltekst | 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| 3. division | Danmarksserien | regeltekst | 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |
| Badmintonligaen | 1. division | regeltekst | 086e/088b: DH-reglement 2025 §17-25 og §28; 2026 §17-25 |

## Hvad DAG'en bevidst ikke gør

- Den sammenligner aldrig forskellige spilleform-familier.
- Den placerer ikke regionale serier indbyrdes eller under Danmarksserien uden en særskilt citeret overgang.
- Den bruger ikke 087's lave hold-kæde-rate til at opfinde flere kanter; 087 er kun støtte for, at konkrete holdspor er begrænsede.
- Fase-/spilletidssider er beholdt som noder, men er ikke styrkeniveauer.

Maskinlæsbar struktur: [104-national-styrke-dag.json](104-national-styrke-dag.json).

## Foreløbig status — afventer beslutning

Spilleforms-standarden er tilføjet til `docs/statistik-plan.md`. Den genererede
DAG er bevidst familieren og har fire dokumenterede DH-kanter, men kan ikke
samtidig repræsentere hele DH-stigen som én total orden: Badmintonligaen/
1. division har 9-kategori-familie, mens 1.–Danmarksserien også forekommer i
13-kategori-familien. Se det præcise spørgsmål i opgavekortet. Ingen
familiekrydsende kant er tilføjet.
