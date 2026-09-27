# Opgave 114 — verificering af efterskoleformater og spillerantal

Dato: 2026-09-27. Alle forespørgsler var read-only.

## Metode

112-kataloget blev brugt til at finde navngivne efterskoleformater. For hver valgt pulje blev alle distinkte `external_match_id`-værdier hentet fra `liga_landsskabs.db`-tabellen `league_match_groups`. De samme ID’er blev slået op direkte i `gsb-statistik-normalized.db.team_matches`. Hvor et ID fandtes dér, skulle spillerantallet tælles via `individual_matches` → `individual_match_players`; ingen af de valgte ID’er fandtes, så der blev ikke lavet en spilleroptælling med et tomt eller indirekte resultat.

## 1–2. Efterskolepuljer

| Pulje | Tekst i kilden | Sæson/aldersgruppe | Kamp-ID’er i liga-landskab | Eksempler på ID | Kategorirækker i liga-landskab | Match i GSB DB | Tekstantagelse |
|---|---|---:|---:|---|---:|---:|---|
| 18170 | U17/U19C (6.400) – 4 Spillere | 2025 / U17-U19 | 80 | 499805, 499806, 499808, 499999, 500000, 500001 | 192 | 0 | 4 spillere |
| 18173 | U17/U19A (10.500) – 5 Spillere | 2025 / U17-U19 | 13 | 499797, 499798, 499799, 503271, 503272, 503273 | 91 | 0 | 5 spillere |
| 18413 | ØM 5 Spillere C-række (4si., 3do.) | 2025 / U17-U19 | 3 | 503838, 503839, 503840 | 21 | 0 | 5 spillere |
| 18415 | ØM 5 Spillere D-række (4si., 3do.) | 2025 / U17-U19 | 10 | 503842–503847 | 0 | 0 | 5 spillere |
| 19062 | U17/U19A 4 Spillere | 2026 / U17-U19 | 3 | 512925, 512996, 512997 | 24 | 0 | 4 spillere |

**Konklusion:** Der findes konkrete kamp-ID’er og i fire af fem valgte puljer også `match_categories`-rækker i `liga-landskab.db`. Ingen af 109 distinkte kamp-ID-forekomster i de fem viste puljekoblinger blev fundet i `gsb-statistik-normalized.db.team_matches` (0 match), så faktisk spillerantal pr. holdkamp kan ikke verificeres i den normaliserede GSB-kilde. S4D4-antagelsen er derfor ubekræftet; S4D3/“5 spillere” er tekstmæssigt dokumenteret, men ikke spillerdata-verificeret.

## 3. Stikprøve af den uafklarede S4/D2-rest

Stikprøven brugte samme eksterne-ID-join på fire ungdomspuljer uden de seks kendte formatord:

| Pulje | Sæson/aldersgruppe | Kamp-ID’er | Kategorirækker | Match i GSB DB | Køn/spillerantal |
|---|---:|---:|---:|---:|---|
| 18500, U11 begynder Januar | 2025 / U11 | 6 (505128–505133) | 36 | 0 | Ikke afgørbart |
| 18520, U13 begynder Februar | 2025 / U13 | 3 (505525–505527) | 18 | 0 | Ikke afgørbart |
| 18566, U13 begynder Marts | 2025 / U13 | 3 (505701–505703) | 18 | 0 | Ikke afgørbart |
| 19156, U13 opstart 20. sep. | 2026 / U13 | 1 (516683) | 8 | 0 | Ikke afgørbart |

Der er dermed ingen spiller-/kønsdata til at skelne “4 piger” fra kønsblandet “4 spillere” i denne stikprøve. Navnebaseret kønsudledning blev ikke forsøgt, fordi ingen spillerrelationer var tilgængelige.

## 4. Bredere kilde

Søgning i repoets scripts, resultater og appkode fandt ingen komplet, ikke-GSB-scoped rosterkilde. `liga-landskab.db` har puljer, kampe og kategorier, men ingen spillere; `gsb-statistik-normalized.db` har spillere, men de relevante efterskole-ID’er er ikke til stede i `team_matches`. En fremtidig verificering kræver derfor en særskilt, bred spiller-/rosterkilde eller ny indsamling; der blev ikke bygget scraper eller pipeline her.

## 5–6. Samlet status og formatkatalog

112-scriptets `spillefamilie`-bug er ikke ændret. Den tidligere kontrol af manglende `category_raw` gælder fortsat: manglen er et kildehul for de konkrete puljer, ikke et nyt join-fund i denne opgave.

**5 spillere** registreres som det syvende kendte navngivne ungdomsformat. Kildeteksterne er `EFTERSKOLETURN. U17/U19A/B ... - 5 Spillere` samt `ØM 5 Spillere C/D-række (4si., 3do.)`. Registreringen ligger i denne dokumentation; 112-scriptet er uændret.

## Begrænsninger

GSB-databasens manglende ID’er betyder, at denne kontrol ikke kan bekræfte faktisk spillerantal eller køn. Det er et dokumenteret “ikke dækket af kilden”-resultat, ikke evidens for at formaterne er forkerte.
