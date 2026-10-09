# Opgave 159 — tilmeldingsniveau: kønsfiltrerede 287-lister, 2026/27-reglement og ungdomsrækker

Kørt af **Claude** (ikke Codex): Codex' kommandoværktøj kunne ikke starte (`setup refresh had errors`). Kortets regler er fulgt: kun `badmintonplayer.dk` og én WebFetch af en offentlig PDF på `badminton.dk`, sekventielt, 2,2 s mellem kald, ingen login/cookies, ingen skrivning til databaser. Script: `statistik/scripts/159-hent287.py` (hentning), analyserne kørt som engangsscripts på de gemte råsvar. Råsvar (kontekstnøgle redigeret ud): `statistik/results/159-raa-svar/`, log: `159-tilmeldingsniveau.json`.

## Kald brugt
`badmintonplayer.dk`: **24 af 25** (4 GET af kontekstnøgle, 20 POST, heraf ét mislykket med "connection reset"; log for én delkørsel med fire sider, K p1–p4, blev ikke gemt som JSON, men råsvarene ligger i mappen). `badminton.dk`: 1 WebFetch af reglement-PDF'en (af 3). Ikke udført: `playerid` på 287 og U09 på 287 (kaldbudget).

## 1. Reglement 2026/27 (Reglement for Rangliste, 10-09-2026)
Kilde: `https://badminton.dk/wp-content/uploads/2026/09/Reglement-for-Rangliste-2026-09-10.pdf` (WebFetch-udtræk uden sidetal). 
- **Række bestemmes af spillerens point i TILMELDINGSNIVEAU** (Appendiks A, § 4). Double: parrets samlede point divideret med to (Appendiks B).
- **Koefficienter for tilmeldingsniveau står ikke i teksten.** (157 fandt "vægtet gennemsnit af alle kategorier, man er aktiv i" i 2023/24-udgaven.)
- Skemaer vurderes hvert kvartal. Rangliste opdateres mandag, onsdag og fredag. Fra 2026/27 deler U13 og yngre dobbelt-/mixdoubleranglistegrundlag, og der er en engangsjustering af double-/mixpoint ved sæsonstart.
- **Voksne (SEN):** placeringsintervaller pr. køn, uændrede i forhold til 2023/24 (herrer E 1–40, E-M 41–200, M 201–400, M-A 401–700, A 701–2000, A-B 2001–2500, B 2501–3500, B-C 3501–4000, C 4001–5000, C-D 5001–6000, D 6001-; damer E 1–40, E-M 41–150, M 151–300, M-A 301–500, A 501–1000, A-B 1001–1200, B 1201–1700, B-C 1701–1900, C 1901–2400, C-D 2401–2600, D 2601-).
- **Ungdom:** pointintervaller pr. køn og aldersgruppe, fx drenge U15: A >1601–1850, B >1375–1600, C >1200–1375, D ≤1200; piger U15: A >1350–1500, B >1225–1350, C >1125–1225, D ≤1125. U13 og U15/U17 E, E-M, M samt U13 M/M-A/A bruger placering. (Hele tabellen er i JSON/udtrækket; skema 2023/24 står i 157-rapporten.)

## 2. Voksenrækker er placering i en kønsspecifik 287-liste (bekræftet)
Liste 287 med `gender` K eller M, **uden** klub- og aldersfilter (sidetal: K 61, M 152). Placeringen i den første kolonne (`local`) er placeringen i kønslisten. Klasseskift i 15 hentede sider (K: 0–5, 9–11; M: 0, 2, 3, 4, 6, 7) sammenlignet med reglementets intervaller:

| Køn | SEN-rækker testet | Inden for reglementets interval | Afvigere |
|---|---:|---:|---|
| Herrer | 577 | **577** | ingen |
| Damer | 837 | **833** | 4 på rang 501 og 1002, altså lige på grænsen (delt placering) |

Klassegrænserne ligger præcis ved 40/41, 150/151 (damer), 300/301, 500/501 og 1000/1001 (damer), og ved 200/201, 400/401 og 700/701 (herrer). Der er ingen "hukommelse" at forklare på voksenniveau i det udsnit; bogstavet følger placeringen i kønslisten.

**Hvorfor 156 så overlap:** den placering i parentes, vi så på GSB-filtrerede lister uden kønsfilter, er placeringen på den **fælles** liste (damer lander dér langt nede: kvindens kønsplacering 300 svarer til fælles placering ca. 1.998, 501 til 2.595, 900 til 3.716). Rækken hører til kønsplaceringen. GSB-filtreret med `gender` giver kun placering inden for GSB (lokal) og fælles placering i parentes, ikke kønsplaceringen; den kan kun aflæses i den ufiltrerede kønsliste.

Spiller-eksempler: Jonas Trusell-Jensen (SEN M-A, herreplacering 497, intervallet 401–700), Morten Aarøe (SEN M-A, 507), Kenn Blæsbjerg Christensen (SEN A, 889). Tina Kærgaard Wissing (GSB, SEN M-A, fælles placering 2.595) står som kønsplacering 501 på rækkegrænsen M-A/A.

U19 E, U17 E og U15 E-spillere forekommer midt i seniorlisternes placeringer (de har senior E-niveau i placeringen), uden at det flytter seniorernes grænser.

## 3. Ungdomsrækker mod point (offline, 2026/27-skemaet)
GSB-ungdom fra de gemte GSB-lister (311 rækker, heraf ungdom U11–U17 med rækker A–D) mod disciplinpoint fra `rangliste-point.db` (version 2026-10-07, M/K efter køn, lister 288/289/292). Række forudsagt ved at placere hypotesens pointtal i reglementets 2026/27-interval:

| Hypotese | Kampe/spillere testet | Rigtig række | Højst én række fra |
|---|---:|---:|---:|
| Højeste disciplinpoint | 132 | **123 (93 %)** | 124 |
| Gennemsnit af disciplinerne med point | 134 | 123 (92 %) | 124 |
| Laveste disciplinpoint | 135 | 97 (72 %) | 98 |

Spillere, hvis række er placeringsbaseret (U13 M/M-A/A og alle E/E-M/M), er holdt ude. Dette er en korrelation, ikke en formel: tilmeldingsniveau er ifølge reglementet et vægtet gennemsnit med den stærkeste kategori som tungeste led, og vi har ikke koefficienterne. 9 uoverensstemmelser (ca. 7 %) kan skyldes kvartalsvis vurdering, vægtningen og at pointtallene i tilmeldingsniveau ikke vises (Point-kolonnen er tom).
Den samme test med 2023/24-tabellen gav kun 18–38 af 78 rigtige: skemaet er ændret, så 2026/27-tabellen skal bruges.

## 4. Ikke besvaret
- `playerid` på 287 (samlet eller lokal placering, version): ikke afprøvet.
- U09 på 287: ikke afprøvet (reglementet har kun C/D for U09 og automatisk opflytning).
- Koefficienterne til tilmeldingsniveau: ikke i reglementet. Man kunne bestemme dem ved regression på ungdom (point i flere kategorier mod række), men række er kun et interval, så det giver kun grænser.

## 5. Anbefaling
1. **Voksenrækker kan forudsiges** direkte: kønsplacering → række (fejl kun ved delte placeringer på grænsen).
2. **Ungdomsrækker** kan forudsiges med højeste disciplinpoint og 2026/27-tabellen i ca. 93 % af tilfældene. "Hvor mange point skal jeg bruge for at blive M-A i mixdouble?" kan derfor besvares ungefært for ungdom: point i den stærkeste kategori over intervalgrænsen. For voksne er grænsen en placering (fx herrer 700), og pointbehovet fås ved at slå op, hvilket point den spiller har, der står på placering 700 i den relevante kønsliste.
3. Næste skridt, hvis vi vil videre: (a) gem en kønsplacering-til-point-tabel for voksne (kønsliste 287 mod disciplinpoint) så "point til M-A" kan beregnes; (b) historiske versioner (hent kønslister for flere datoer, ca. 15 kald pr. version); (c) test koefficienter med flere spillere.

## Databasehashes
Kun læsning. Kopierne af `gsb-statistik-normalized.db` (49BC62AC…1B41E) og `rangliste-point.db` (DABE3A12…D1B9) blev hash-kontrolleret før analysen og er uændrede; de andre tre databaser blev ikke åbnet.
