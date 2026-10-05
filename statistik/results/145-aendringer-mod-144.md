# Opgave 145 — ændringer mod 144

Databaseadgang: `readOnly: true`. Fundne entydige GSB-holdfællesskaber: 2 fysiske holdposter (9 regionkoblinger; regionkoblinger tælles ikke som ekstra hold).

| Sæson | Årgang | Række | Råt holdnavn | Partner | GSB hovedhold? |
|---|---|---|---|---|---|
| 2020/21 | U11 | U11 4+2 | BC37/Gladsaxe Søborg 1 | BC37 | Nej |
| 2026/27 | U13 | U13 (4+3) - maks. 11500 p. holdfællesskab | GSB/LBK 1 | LBK | Ja |

## Placering og bredde før/efter

| Sæson/årgang | Placering uden fællesskab | Placering inkl. fællesskab | Bredde uden (rækker/formater) | Bredde inkl. (rækker/formater) |
|---|---|---|---:|---:|
| 2020/2021 U11 | 4 spillere | 4+2 | 1/1 | 2/2 |
| 2026/2027 U13 | 2+2 | 4+3 (foreløbig) | 5/3 | 6/4 |

Placeringerne uden holdfællesskab følger 144. 2026/27 U13-rækken `U13 (4+3) - maks. 11500 p. holdfællesskab` får format 4+3 ved forslag 4 (`intet niveau nødvendigt (eneste række)`), og er derfor foreløbig (`foreloebig: true`, `placering_kilde: raekkenavn_foreloebig`). 2020/21 U11 har signaturbaseret 4+2.

## Værn og stikprøver

Ud af 69 sæson/årgang-kombinationer ændres 2; de øvrige 67 er ens mellem 145 uden fællesskab og 145 med fællesskab. Rækkebredde og formatbredde ændres kun i de to kombinationer ovenfor, hver med +1/+1. Fem direkte GSB-hold fra andre kombinationer blev matchet mod 143's råholdsposter; alle fem er uændrede.

| Sæson | Årgang | Række | Råt direkte GSB-navn | Match i 143 | Uændret |
|---|---|---|---|---|---|
| 2021/22 | U13 | U13 5200 4 Spillere | Gladsaxe Søborg 1 | Ja | Ja |
| 2024/25 | U13 | U13 D 3600 (4 spillere). | Gladsaxe Søborg 4 | Ja | Ja |
| 2025/26 | U13 | Uge 38 - U13 A, 6000 (2+2) | Gladsaxe Søborg 7 | Ja | Ja |
| 2025/26 | U15 | U15 C-D 5200 (4 spillere) BD | Gladsaxe Søborg 4 | Ja | Ja |
| 2011/12 | U17 | U17 2. Serie | Gladsaxe Søborg *udgået* | Ja | Ja |

Tvetydige GSB-lignende rånavne ekskluderet: 0. Ingen af dem er blevet talt som GSB-holdfællesskab; fuld liste i JSON.

Database SHA-256 før/efter uændret: liga-landskab.db 9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c; gsb-statistik-normalized.db 49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e. Alle tabelrækketal ens før/efter.
