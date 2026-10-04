# Opgave 127 — GSB's ungdomshold: placering i formathierarkiet pr. sæson og aldersgruppe

**Trin:** Ny. Bygger på 126 (`statistik/results/126-rangering-final.json/.md`) og 112 v2 (spilleformats-katalog).

## Baggrund

Christoffer vil vise, hvor "højt" GSB's ungdomshold er rangeret hvert år, for at vise hvor
konkurrencedygtige klubben er. Eksempel: hvis kun Skovshoved, Gentofte og Værløse har 4+3-hold i en
aldersgruppe og en sæson, har GSB ikke et hold i den bedste række.

Ungdom har ingen pyramide. For ungdom måles placeringen derfor KUN på spilleformatet (126's rangering).
For senior konkluderer vi kun ud fra division i pyramiden, ikke spilleformatet — senior er IKKE en del af
denne opgave og må ikke blandes ind.

## Mål

For hver sæson og aldersgruppe (ungdom) hvor GSB har mindst ét hold:

1. Find GSB's hold og deres fysiske pulje (season_id, age_group_id, league_group_id).
2. Slå puljens format op i 126's rangering (tier og plads, brug fysisk-pulje-tabellen, ikke
   forekomsttabellen). Puljer uden brugbar kategorisignatur er "Uplaceret" — gæt aldrig.
3. Find det højest rangerede format der findes i samme aldersgruppe og sæson, på tværs af alle
   regioner (nationalt), og hvilke klubber har hold i det.
4. Beregn GSB's placering: har GSB et hold i det højeste format? Ellers hvilken plads
   (x. højeste format af n forskellige formater til stede den sæson og aldersgruppe).
5. Aflevér en rapport pr. sæson og aldersgruppe, og en samlet oversigt over tid. Brug klubbens
   rigtige navn (ikke kun ID), og vis klubberne i det højeste format, så Christoffer kan se hvem
   GSB sammenlignes med.
6. **Bredde i Badminton København:** For hver ungdomssæson/-aldersgruppe, opgør GSB's deltagelse
   dels som rækker/ligaer (puljer i samme `division_name_raw` samlet), dels som fysiske puljer
   (`season_id, age_group_id, league_group_id`). Vis `GSB i x af n` og procent på begge niveauer,
   pr. sæson/aldersgruppe og samlet over tid pr. aldersgruppe. Find og dokumentér den præcise
   København-region fra `league_group_regions`/`regions`; andre regioner tælles ikke med.
7. Hold der er markeret `udgået` eller `trukket` vises separat og tæller ikke som placerede eller
   deltagelse i bredden. Vis alle GSB-hold, også når der er flere i samme aldersgruppe/sæson; A's
   placering er det bedste rangerede aktive GSB-format.
8. I listen over klubber i højeste format vises både normaliseret klubnavn og de rå holdnavne.
   Normalisér ved at fjerne trailing holdnummer, statusmarkeringer (`udgået`/`trukket`, også
   stjernemarkeret) og parentestekst. Et holdnavn med `/` bevares som én samarbejdsenhed.

## Afgrænsning

- Sammenlign KUN inden for samme aldersgruppe og sæson, aldrig på tværs af aldersgrupper.
- Brug KUN format. Intet pyramideniveau for ungdom. Intet senior.
- Brug fysiske puljer som enhed. Bland aldrig med forekomster (region-vægtet).
- Rangeringen må ikke bruges til at sammenligne på tværs af spilleform-familier som sportslig styrke
  (jf. 113/103/104). Skriv det i selve rapporten.
- GSB-identitet følger Christoffers godkendte regel: `team_name_raw` starter med `Gladsaxe Søborg`;
  `BC37/Gladsaxe Søborg 1` vises separat som samarbejdshold. BC37-varianter samt registry-klub
  1087/1232 er ikke GSB. Dette erstatter Del 1's åbne mapping-spørgsmål for GSB.
- Øvrige klubenheder udledes kun ved Christoffers udtrykkeligt godkendte tekstnormalisering i mål 8;
  samarbejdshold med `/` forbliver én enhed. Ingen yderligere aliasmatchning.
- Rør IKKE `statistik/data/*.db` (kun læsning, `readOnly: true`), gamle 112/115/122–126-resultatfiler
  eller 126-scriptet. Nyt script og nye resultatfiler med 127-præfiks.

## Kontrol

- Stikprøve (5 sæson/aldersgruppe-kombinationer): manuel kontrol mod 126's pulje-liste og mod
  GSB-holdlisten.
- Tæl: antal GSB-hold fundet, antal placeret, antal "Uplaceret" (med årsag). Summerne skal gå op.
- SHA-256 og rækketal for `gsb-statistik-normalized.db` og `liga-landskab.db` uændrede
  (49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E og
  9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C).
- `git status --short statistik/data/` viser kun evt. -shm/-wal-filer (nu ignoreret).

## Ved tvivl

Spørg i "Spørgsmål" frem for at gætte: fx hvis klubmappingen ikke kan genkende et GSB-hold, hvis
et hold spiller i flere puljer samme sæson, eller hvis "højeste format" er uklart for en sæson.

## Gren

`arbejde/127-gsb-ungdom-formatplacering`, fra `main`.

---

## Spørgsmål

Ingen åbne spørgsmål fra Del 1's navneidentifikation: reglerne ovenfor følger Christoffers godkendelse. Del 2 bruger `division_name_raw` som række-ID pr. sæson/aldersgruppe og `league_group_id` som fysisk pulje. Hvis kontrollerne finder manglende/konfliktende format eller row-boundary data, dokumenteres det her; ingen ny aliasregel indføres.

## Resultatnote

### Del 1 — ungdomsholdnavne-audit

Tilføjet `statistik/scripts/127-audit-gsb-youth-team-names.mjs` og genereret `statistik/results/127-gsb-ungdom-holdnavne-audit.md/.json`. Scriptet bruger `DatabaseSync(..., { readOnly: true })`, scanner 32.837 hold-puljeposter for aldersgruppe-ID'erne 2, 3, 4, 5, 6, 7 og 18, og finder 516 poster på et bredt søgemønster: 280 indeholder Gladsaxe, 236 BC37 uden Gladsaxe, og én af de 280 Gladsaxe-poster indeholder også BC37. Det giver 21 direkte rå GSB-navnekandidater og 18 tvetydige/lignende varianter; ingen af dem erklæres verificeret alene på navnet.

`club_registry` har `club_id`/`club_name_raw`; `league_group_teams` har ikke klub-ID eller registry-ID og ingen FK. Derfor bruges tekstmatch kun til kandidatfund. Auditten fandt registry-kandidat `1093 Gladsaxe Søborg Badmintonklub` samt de tvetydige `1087 Badmintonklubben af 1937 (BC 37)` og `1232 Søborg S.G.& I.F., Badmintonafd.`. 092/101's holdidentitetslogik dækker senior, ikke ungdom. En tilsvarende verificeret mapping til at navngive alle øvrige klubber i puljerne findes heller ikke i de undersøgte tabeller.

Denne Del 1-note dokumenterer auditstatus før Christoffers efterfølgende godkendelse. De godkendte identitetsregler og Del 2-resultater står nedenfor; den tidligere afventning er dermed lukket.

Databaserne var kun læst. Før/efter SHA-256 og alle tabelrækketal er ens: `gsb-statistik-normalized.db` `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e`; `liga-landskab.db` `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c`. De fulde rækketal står i auditrapporten. Scriptkontrol: `node --check statistik/scripts/127-audit-gsb-youth-team-names.mjs` bestod; scriptkørslen skrev begge rapporter med de ovenstående tal.

### Del 2 — formatplacering og deltagelsesbredde

Christoffers godkendte regler er anvendt: GSB er et råt holdnavn der starter med `Gladsaxe Søborg` (279 poster/21 auditvarianter); `BC37/Gladsaxe Søborg 1` er en separat samarbejdspost, ikke rent GSB; BC37-varianter og registry-klub 1087/1232 tælles ikke som GSB. `udgået`/`trukket`-poster er vist separat og tæller ikke som placeret eller som GSB-deltagelse i bredde-nævnerens tæller. Bedste GSB-format pr. sæson/aldersgruppe er bedste rangerede aktive format; alle GSB-hold/puljeposter er bevaret i rapporten. Andre klubnavne er normaliseret efter Mål-reglen; slash-samarbejder forbliver én enhed.

Tilføjet `statistik/scripts/127-youth-format-and-kbh-width.mjs` og genereret `statistik/results/127-gsb-ungdom-formatplacering.md/.json`. Scriptet bruger begge SQLite-databaser med `readOnly: true`, 126's fysiske pulje-rangering og 125's afgørelser pr. fysisk pulje, hvor de findes; ellers bruges 126's signatur-/tekstmetode. 126-formatets placering opgøres på ny inden for samme sæson og aldersgruppe nationalt. Ingen senior eller pyramideniveau indgår.

**Optælling:** 279 rene GSB-hold-puljeposter = 233 aktive placerede + 34 aktive uplacerede + 12 udgåede/trukne (9 `udgået`, 3 `trukket`). Én samarbejdspost vises særskilt: `BC37/Gladsaxe Søborg 1`, 2020/2021 U11, fysisk pulje `2020|3|13328`, format `4+2`, Tier 1. Resultatet dækker 69 sæson/aldersgruppe-kombinationer med GSB og bredde for alle 69.

**Række/pulje og region:** `league_group_regions` identificerer Badminton København som region 8 (`BADKBH`); region 24 (`DGI Storkøbenhavn`) er udeladt. I København er 784 ungdoms-puljer fordelt på 568 rækker, defineret som samme eksakte `division_name_raw` inden for sæson/aldersgruppe; `group_name_raw` angiver pulje/fase. Rækkefordelingen er 406×1 pulje, 122×2, 30×3, 8×4 og 2×6. Alle 784/784 har `league_group_details`, og 0 mangler rækkenavn. Række-bredde er hovedmålet, så flere puljer i samme række ikke kunstigt forstørrer udbuddet; fysisk puljebredde står som supplerende tal.

**Bredde samlet over tid, summeret kun inden for aldersgruppe:**

| Aldersgruppe | Sæsoner | Rækker/ligaer | Fysiske puljer |
| --- | ---: | ---: | ---: |
| U09 | 7 | 11/16 (68,8 %) | 16/25 (64,0 %) |
| U11 | 16 | 35/115 (30,4 %) | 43/158 (27,2 %) |
| U13 | 16 | 47/147 (32,0 %) | 55/197 (27,9 %) |
| U15 | 16 | 56/163 (34,4 %) | 58/217 (26,7 %) |
| U17 | 6 | 4/21 (19,0 %) | 4/21 (19,0 %) |
| U17/U19 | 8 | 15/67 (22,4 %) | 16/109 (14,7 %) |

**Fem stikprøver mod de rå pulje-/holdlister, placering og bredde:**

| Sæson / alder | GSB-hold-puljeposter | Bedste aktive GSB-format | Nationalt højeste format | KBH-rækker | KBH-puljer | 125-formatkontrol |
| --- | ---: | --- | --- | ---: | ---: | ---: |
| 2011/2012 U11 | 4 | ingen placeret; aktive er uplacerede | 4+3 | 2/5 | 2/5 | 0/0 tilgængelige i 125 |
| 2016/2017 U11 | 4 | 4 spillere, nr. 3/4 | 4+3 | 2/9 | 2/10 | 4/4 match |
| 2020/2021 U15 | 3 | 4 piger, nr. 3/4 | 4+3 | 3/12 | 3/13 | 2/2 tilgængelige match |
| 2025/2026 U11 | 7 | 4 piger, nr. 3/5 | 4+3 | 3/7 | 4/14 | 7/7 match |
| 2026/2027 U13 | 10 | 2+2, nr. 1/2 | 2+2 | 7/15 | 9/19 | 0/0 tilgængelige i 125 |

Fuld puljenøgle, holdnavn, format, normaliserede klubber i nationalt højeste format samt rækker og puljer findes i MD/JSON-resultaterne. De 5182 nationale ungdomspuljer med medlemskab i flere regioner tælles kun én gang pr. fysisk puljenøgle i København.

**Kontroloutput:** `node --check statistik/scripts/127-youth-format-and-kbh-width.mjs` bestod; scriptet gennemførte og skrev begge rapporter. `gsb_balance=true`, `region_id_8_exact_name=true`, `region_8_missing_division_rows=0`, `all_region_8_pools_have_details=true` og `database_hashes_and_row_counts_unchanged=true`. Alle 5 stikprøvers GSB-puljer stemte med rå kilder; hvor en pulje fandtes i 125-kataloget, matchede formatet i alle tilgængelige tilfælde (13/13 samlet). Databaserne var uændrede:

- `gsb-statistik-normalized.db`: SHA-256 før/efter `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e`; tabelrækketal før/efter er identiske (bl.a. `team_matches=2818`, `players=7599`, `individual_matches=20319`).
- `liga-landskab.db`: SHA-256 før/efter `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c`; tabelrækketal før/efter er identiske (bl.a. `league_groups=18546`, `league_group_regions=59127`, `league_group_teams=96823`, `regions=33`).

Fuld før/efter-rækketal for samtlige tabeller står i JSON-resultatfilen. Ingen åbne spørgsmål; begrænsningen er, at format uden brugbar signatur/formattekst står uplaceret, og at klubnormalisering følger alene den godkendte tekstregel — den er ikke en ekstern klubidentitetsmapping.
