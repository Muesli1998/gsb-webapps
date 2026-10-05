# Opgave 137 — pointskala og niveautal: skal de kunne arves?

**Trin:** Beslutningskort. **Besluttet 2026-10-05: valg A (ingen arv).** Intet at bygge. Kortet kan flyttes til `work/loeste/`.

## Baggrund
Regelbogen (131) arver filen, ikke tallene. Posterne har `pointskala_arv: "afventer beslutning"`. Skalaerne ændres mellem versioner: U13 4 spillere havde 6000/5000/4200/3800/3600 i 2024/25 og i den oprindelige 2025/26-udgave, 6400/5800/5300/5000/4800 efter revisionen 8. oktober 2025, og 6400/5600/5100/4800/4600 i 2026/27 (ikke verificeret). Tal kan derfor ikke oversættes til bogstav uden sæson og version.

## Valg
| Valg | Betydning |
|------|-----------|
| A. Ingen arv (nuværende) | Pointskala kun for sæsoner/versioner med egen fil. Resten "ukendt". Sikrest, flest huller. |
| B. Arv med mærkat | Betinget sæson låner skalaen fra kildefilen, mærket "betinget", svag ved 3+ sæsoner. |
| C. Arv kun ved uændret skala | Arv kun, hvor skalaen er identisk i nabosæsonerne på begge sider. |
| D. Arv aldrig, men vis udsnit | Vis tallene fra kildefilen som "nærmeste kendte", uden at bruge dem til niveau. |

## Beslutning
**A. Ingen arv.** Besluttet af Christoffer 2026-10-05. Pointskala (og niveautal) kendes kun for de sæsoner og versioner, der har en fil, som selv angiver den. Alle andre står som "ukendt". Kan genåbnes senere, hvis de mange huller viser sig at være et problem; så vælges C eller D.

## Mål (efter beslutning)
Ingen kode. Konsekvenser: 131 skriver `pointskala_arv: "ingen"` i alle poster (kortet er rettet). 136 omregner ikke rene tal til bogstav ved hjælp af en skala. 138 bruger kun skalaer fra bekræftede filer og lader resten stå "ukendt".

## Afgrænsning
Rør ikke 127/129/131-filer eller databaser.

## Gren
Fastsættes efter beslutning.

## Spørgsmål
(Tomt.)

## Resultat
(Udfyldes af Codex.)
