# Opgave 115 — manuel opstillingskrav-rangering: metode og fund (session 2026-09-27)

## Status

Denne opgave er allerede udført manuelt af Christoffer og Claude direkte i samtale
(2026-09-27), som opfølgning på opgave 112's katalog og som afløser for 113's forkastede
scoring-tilgang. Kortet lægges her udelukkende for at dokumentere metoden og resultatet, så
det ikke går tabt. Ingen kode er ændret; alt er analyse af 112's eksisterende output.

## Baggrund: hvorfor 113's oprindelige tilgang blev forkastet

`statistik/scripts/113-generate-spilleformats-rangering.mjs` (stadig på gren
`arbejde/113-spilleformats-rangering-hierarki`, IKKE merget til main) brugte en
formel-baseret score (`N×10+M` for "N+M"-formater, hårdkodede tal for de øvrige) til at
rangere formater. Scoren modsagde Christoffers eget udtrykte hierarki (4+3 > 4+2 > 2+2 >
4 spillere > 4 piger), fordi 2+2 fik en kunstigt lav score. Christoffer bad i stedet om en
rå liste af alle formater, som han selv kunne rangere.

## Metode

1. For hver kombination i 112's katalog: brug `category_signature` (den sorterede mængde af
   rå `category_raw`-koder pr. pulje) som primær evidens for et formats reelle
   sammensætning, ikke det tekstgenkendte `spillefamilie`-felt (som har en kendt bug, se
   opgave 112's efterfølgende opdateringsbehov — `spillefamilie` er altid tekstmønstret, ikke
   afledt af signaturen, selvom `spillefamilie_source` fejlagtigt antyder det modsatte).
2. Kategorikoder oversat til syv kolonner: **Mix** (MD), **DS**, **DD**, **HS**, **HD**
   (kønnede), **S**, **D** (ukønnede/generiske).
3. Rangeringsregel aftalt med Christoffer, i prioriteret rækkefølge:
   1. Flest **forskellige kamptyper** (hvor mange af de 7 kolonner er > 0)
   2. Flest **kønnede kampe** (Mix+DS+DD+HS+HD)
   3. Flest **kampe i alt** (kønnede + ukønnede)
4. **Tier-opdeling** oveni rangeringen (Christoffers regel):
   - **Tier 1**: formatet er spillet i sæson 2023/24 eller senere
   - **Tier 2**: ikke spillet siden 2023, men ≥15 forekomster i hele datasættet
   - **Tier 3**: ikke spillet siden 2023 OG under 15 forekomster (reelt uddøde/engangs-varianter)
5. **Kønnet-vs-ukønnet-regel** (afgørende afklaring fra Christoffer): hvor et navngivet
   format optræder med både en kønnet og en ukønnet signaturvariant med samme
   Mix/DS/DD-tal (fx "4+2" som både Mix1/DS1/DD1/HS3/HD2 og Mix1/DS1/DD1/S3/D2), er den
   **kønnede** variant den officielle — den ukønnede er en mærkningsinkonsekvens i den rå
   kildetekst for de samme reelle kampe, IKKE et separat format. Begrundelse: fx "4 piger"
   betyder pr. definition pigekampe, så en generisk S/D-mærkning af de samme kampe er en
   datafejl i kilden, ikke et alternativt format.

## Kanoniske signaturer for de seks (nu syv, jf. opgave 114) navngivne ungdomsformater

Udledt ved at filtrere 112's kombinationer på `spillefamilie === token` for ren ungdom
(U09-U17/U19, UNG udelukket som aggregatkategori) og se hvilken `category_signature` der
dominerer:

| Format | Officiel signatur | Kampe i alt | Dominans i ungdomsdata |
|---|---|---:|---:|
| 4+3 | Mix2/DS2/DD1/HS2/HD2 | 9 | 100% |
| 3 spillere | S4/D1 | 5 | 100% |
| 4 spillere | S4/D2 | 6 | 100% |
| 2+2 | Mix2/DS2/DD1/HS2/HD1 | 8 | 96% |
| 4+2 | Mix1/DS1/DD1/HS3/HD2 (kønnet) | 8 | 76% (17% er samme kampe ukønnet mærket) |
| 4 piger | DS4/DD2 (kønnet) | 6 | 53% (47% er samme kampe ukønnet mærket, S4/D2) |
| 5 spillere (nyt, jf. opgave 114) | S4/D3 | 7 | fundet direkte i kildetekst ("5 Spillere") |

**Uafklaret rest**: 1.411 forekomster (ren ungdom) med signatur S4/D2 (samme struktur som
"4 spillere"-kanonen) UDEN at teksten indeholder et af de kendte formatord. Kan være
fejlmærkede "4 piger"-rækker (S4/D2 er identisk struktur med "4 piger"s ukønnede variant)
eller ægte "4 spillere". Opgave 114 forsøgte at afgøre dette via spillerdata i
`gsb-statistik-normalized.db`, men fandt ingen af stikprøvens kamp-ID'er dér — forbliver
ubekræftet. Kræver national spillerdata for at afgøre, jf. opgave 116.

## SEN-rangering (Tier 1, top efter typer→kønnede→kampe)

1. [5t/13k/13 kampe] 1480x, 17 sæsoner, sidst 26/27 — Mix2/DS2/DD1/HS4/HD2 — Danmarksserien/
   Kredsserien Vest (DH-hovedformatet)
2. [5t/11k/11] 498x, 14 sæsoner — Kredsserien Vest/nedrykning
3. [5t/11k/11] 35x, 10 sæsoner — DGI Fyn seniorrække
4. [5t/9k/9] 69x, 8 sæsoner — Badmintonligaen 1. division
5. [5t/8k/8] 906x, 15 sæsoner — DGI Øst Serie 2-4 (bredt udbredt standardformat)
... (fuld liste med 32 rækker, Tier 1/2/3, findes i samtalen 2026-09-27 — kan genskabes ved
at køre samme filtrering på `statistik/results/112-spilleformats-katalog-alle-aargange.json`
med `age_group_name === "SEN"`)

## Ungdomsrangering på tværs af årgange (Tier 1, efter merge af navngivne formater)

Med de officielle signaturer og kønnet-regel anvendt, sammenlagt på tværs af
U09-U17/U19 (UNG udelukket som aggregat):

1. [5t/9k/9] **1435x** (4+3, mergede varianter) — 16 sæsoner, sidst 26/27
2. [5t/8k/8] 1040x (4+2) — 16 sæsoner, sidst 26/27
3. [5t/8k/8] 799x (2+2) — 7 sæsoner, sidst 26/27
4. [2t/6k/6] **1127x** (4 piger, mergede varianter) — 14 sæsoner, sidst 26/27
5. [2t/0k/8] 6x — efterskole "4 spillere"-variant med 4 double (uverificeret struktur)
6. [2t/0k/7] 7x — **5 spillere** (nyt format, efterskole)
7. [2t/0k/6] 16895x (4 spillere) — 15 sæsoner, sidst 26/27
8. [2t/0k/6] 1411x — uafklaret S4/D2-rest (se ovenfor)
9. [2t/0k/5] **169x** (3 spillere, mergede varianter) — 2 sæsoner, sidst 26/27
10. [ukendt] 195x — UKENDT (ingen kategoridata, reel kildemangel jf. opgave 112/114)

## Konsekvenser for videre arbejde

- `113-generate-spilleformats-rangering.mjs`s scoring-baserede tilgang bør IKKE bruges eller
  merges. Rangeringen ovenfor (manuel, tier-baseret, med kanoniske signaturer) er den
  besluttede metode.
- 112-scriptets `spillefamilie`-bug skal stadig rettes (afledes af `category_signature` når
  den findes, i stedet for altid at bruge tekstmønstret).
- Den uafklarede S4/D2-rest og efterskole-formaternes præcise spillerantal kræver national
  spillerdata, jf. opgave 116.

## Gren

Ingen — dette er dokumentation af manuelt udført analysearbejde, ikke en Codex-opgave.

## Resultatnote

Udført og dokumenteret 2026-09-27 af Christoffer og Claude i samtale. Ingen kode ændret.
