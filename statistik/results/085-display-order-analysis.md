# Opgave 085 — display-order fra gemte indeks-svar

Genereret: 2026-09-22T06:39:57.281Z

## Dækning

- Gemte indeks-svar med HTTP 200/parse_status ok: **16269**
- Parsede puljehenvisninger i HTML-dokumentorden: **59127**
- Unikke puljer i indeks-svar: **18546**
- Rækker i league_groups: **18546**
- Indekspuljer der matcher league_groups: **18546**; mangler: **0**
- league_groups uden fundet indeksrækkefølge: **0**

## Kan display_order ligge i league_groups?

Parseren kan genfinde rækkefølgen i de gemte HTML-svar. Men **7161** af 18546 unikke puljer har mere end én display_order, fordi samme (season_id, age_group_id, league_group_id) forekommer i flere indeks-svar med forskellige regionale/aldersspecifikke lister. Derfor blev der **ikke** tilføjet en enkelt display_order-kolonne til league_groups: den ville kassere dokumenteret kontekst for de tvetydige puljer. En fremtidig joinbar løsning skal have mindst region_id (og gerne index-kilde) i nøglen.

## Konkrete 2026-eksempler

| Sæson | Alder | Region | Pulje | Display order | Division fra rå HTML | Gruppe |
|---:|---:|---:|---:|---:|---|---|
| 2026 | 5 | 8 | 18978 | 1 | U15 (4+3) - maks. 14000 p. holdfællesskab | Pulje 1 |
| 2026 | 5 | 8 | 18959 | 2 | U15 M, 7800 (2+2) | Pulje 1 |
| 2026 | 5 | 8 | 18979 | 3 | U15 A, 6800 (2+2) | Pulje 1 |
| 2026 | 5 | 8 | 18981 | 5 | U15 C, 5200 (2+2) | Pulje 1 |
| 2026 | 5 | 8 | 18982 | 6 | U15 D, 4800 (2+2) | Pulje 1 |
| 2026 | 5 | 8 | 19117 | 8 | U15 B, 6200 (4 spillere) BD | Pulje 1 |
| 2026 | 5 | 8 | 19098 | 9 | U15 C, 5500 (4 spillere) | Pulje 1 |
| 2026 | 5 | 8 | 19099 | 9 | U15 C, 5500 (4 spillere) | Pulje 2 |
| 2026 | 5 | 8 | 19118 | 10 | U15 C-D, 5100 (4 spillere) BD | Pulje 1 |
| 2026 | 5 | 8 | 19119 | 11 | U15 D, 4800 (4 spillere) BD | Pulje 1 |
| 2026 | 5 | 8 | 19088 | 12 | U15 Dx, 4600 (4 spillere) | Pulje 1 |
| 2026 | 5 | 8 | 19120 | 13 | U15 B, 5400 (4 piger) BD | Pulje 1 |
| 2026 | 5 | 8 | 19100 | 14 | U15 C, 4900 (4 piger) | Pulje 1 |
| 2026 | 5 | 8 | 19093 | 15 | U15 D, 4500 (4 piger) | Pulje 1 |
| 2026 | 5 | 8 | 18983 | 16 | UGE 38 - U15 M, 7800 (2+2) | Pulje 1 |
| 2026 | 5 | 8 | 18986 | 17 | UGE 38 - U15 A, 6800 (2+2) | Finale |
| 2026 | 5 | 8 | 18984 | 17 | UGE 38 - U15 A, 6800 (2+2) | Pulje 1 |
| 2026 | 5 | 8 | 18985 | 17 | UGE 38 - U15 A, 6800 (2+2) | Pulje 2 |
| 2026 | 5 | 8 | 18987 | 18 | UGE 38 - U15 B, 5800 (2+2) | Pulje 1 |
| 2026 | 5 | 8 | 18988 | 19 | UGE 38 - U15 C, 5200 (2+2) | Pulje 1 |
| 2026 | 5 | 8 | 19216 | 20 | Uge 38 - U15 D, 4800 (2+2) | Pulje 1 |
| 2026 | 1 | 1 | 18872 | 1 | Badmintonligaen | Grundspil |
| 2026 | 1 | 1 | 18833 | 2 | 1. division | Pulje 1 |
| 2026 | 1 | 1 | 18834 | 2 | 1. division | Pulje 2 |
| 2026 | 1 | 1 | 18838 | 3 | 2. division | Pulje 1 |
| 2026 | 1 | 1 | 18839 | 3 | 2. division | Pulje 2 |
| 2026 | 1 | 1 | 18842 | 4 | 3. division | Pulje 1 |
| 2026 | 1 | 1 | 18843 | 4 | 3. division | Pulje 2 |
| 2026 | 1 | 1 | 18844 | 4 | 3. division | Pulje 3 |
| 2026 | 1 | 1 | 18845 | 4 | 3. division | Pulje 4 |
| 2026 | 1 | 1 | 18854 | 5 | Danmarksserien | Pulje 1 |
| 2026 | 1 | 1 | 18855 | 5 | Danmarksserien | Pulje 2 |
| 2026 | 1 | 1 | 18856 | 5 | Danmarksserien | Pulje 3 |
| 2026 | 1 | 1 | 18857 | 5 | Danmarksserien | Pulje 4 |
| 2026 | 1 | 1 | 18858 | 5 | Danmarksserien | Pulje 5 |
| 2026 | 1 | 1 | 18859 | 5 | Danmarksserien | Pulje 6 |
| 2026 | 1 | 1 | 18860 | 5 | Danmarksserien | Pulje 7 |
| 2026 | 1 | 1 | 18861 | 5 | Danmarksserien | Pulje 8 |
| 2026 | 1 | 1 | 18878 | 6 | Indberettede spilletider for runde 8 og 10 | 1. division pulje 1 |
| 2026 | 1 | 1 | 18879 | 6 | Indberettede spilletider for runde 8 og 10 | 2. division pulje 1 |

- BADDAN SEN (region 1) viser Badmintonligaen → 1. division → 2. division → 3. division → Danmarksserien som ordre 1–5.
- BADKBH SEN (region 8) viser Københavnsserien først, derefter regionale playoff/spilletidssektioner og 1.–3. Serie samt 31.–33. Serie i den gemte dokumentorden.
- BADKBH U15 (region 8) viser U15 (4+3) øverst, derefter 2+2-rækker, 4-spiller-rækker, pigerækker og UGE38-blokken. Ordenen kan genparses, men er ikke en global numerisk niveauskala.

## Sammenligning med opgave 077

- 077 har **343** rækker med direkte tekstindikator (de afklarede rækker).
- **343/343** (100 %) findes i de gemte indeks-svar.
- Rå rækkenavn/division stemmer konservativt (den ene normaliserede tekst indeholder den anden) for **343/343** (100 %).
- Display_order er entydig for **320/343** (93.3 %); **23** har flere dokumenterede ordrer på grund af manglende region i league_groups-nøglen.
- Dette er en match-rate for reproducerbarhed og råtekst, ikke et påstået bevis for at alle ungdomsordener kan omsættes til én global rangskala.

## Joinbart forslag (ikke bygget)

`league_level_signals(season_id, age_group_id, region_id, league_group_id, display_order, derived_level, confidence, evidence_type, source_ref)` med primærnøgle på de fire første felter. `display_order` kommer fra den konkrete standing_index-kilde; `derived_level` udfyldes kun ved dokumenteret template-/reglement-match. Det gør signalet joinbart uden at ændre rå league_groups og bevarer regionale forskelle.
