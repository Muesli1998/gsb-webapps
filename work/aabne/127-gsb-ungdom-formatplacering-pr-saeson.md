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

## Afgrænsning

- Sammenlign KUN inden for samme aldersgruppe og sæson, aldrig på tværs af aldersgrupper.
- Brug KUN format. Intet pyramideniveau for ungdom. Intet senior.
- Brug fysiske puljer som enhed. Bland aldrig med forekomster (region-vægtet).
- Rangeringen må ikke bruges til at sammenligne på tværs af spilleform-familier som sportslig styrke
  (jf. 113/103/104). Skriv det i selve rapporten.
- Klubidentifikation: genbrug den eksisterende holdidentitet/GSB-mapping (se 101, 092) frem for at
  finde på en ny. Gæt ikke på hold ud fra navn, hvis mappingen ikke dækker dem.
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

### Afventer godkendelse af navnevarianter og identitetsregel

Del 1 fandt ingen direkte ID/FK-kobling mellem `club_registry` og `league_group_teams`. `club_registry.club_id=1093` har navnet `Gladsaxe Søborg Badmintonklub`, mens holdrækker kun giver `team_name_raw`; 101/092 er senior-only og løser ikke ungdomskoblingen. Auditten fandt 21 direkte Gladsaxe-navnevarianter (280 poster) og 18 BC37-/lignende holdvarianter (236 poster samt én hybridpost med både BC37 og Gladsaxe). De fulde optællinger og sæsonspænd står i `statistik/results/127-gsb-ungdom-holdnavne-audit.md`.

**Christoffer bedes godkende/afvise som GSB-hold hver af de 21 direkte navnevarianter:** `Gladsaxe Søborg`; `Gladsaxe Søborg *udgået*`; `Gladsaxe Søborg 1`; `Gladsaxe Søborg 10`; `Gladsaxe Søborg 2`; `Gladsaxe Søborg 2 *Trukket`; `Gladsaxe Søborg 2 *udgået*`; `Gladsaxe Søborg 2 trukket`; `Gladsaxe Søborg 2 udgået`; `Gladsaxe Søborg 3`; `Gladsaxe Søborg 3 *udgået*`; `Gladsaxe Søborg 4`; `Gladsaxe Søborg 4 *trukket*`; `Gladsaxe Søborg 4 *udgået*`; `Gladsaxe Søborg 5`; `Gladsaxe Søborg 5 (2+2 B)`; `Gladsaxe Søborg 6`; `Gladsaxe Søborg 7`; `Gladsaxe Søborg 8`; `Gladsaxe Søborg 9`; `Gladsaxe Søborg udgået`.

**Tvetydige holdvarianter, som skal afvises eller forklares særskilt:** `BC37 Amager`; `BC37 Amager 1`; `BC37 Amager 2`; `BC37 Amager 2 trukket`; `BC37 Amager 3`; `BC37 Amager 4`; `BC37 Amager 5`; `BC37 Amager 6`; `BC37 Amager trukket`; `BC37 Amager udgået`; `BC37/Dragør 1`; `BC37/Dragør 2`; `BC37/Gladsaxe Søborg 1`; `BC37/IBB 1`; `BC37/KMB2010 Amager 1`; `BC37/NBK Amager 1`; `IBB/BC37 Amager 1`; `NBK/BC 37 Amager 1`.

Registry-klubberne `club_id=1087` (`Badmintonklubben af 1937 (BC 37)`) og `club_id=1232` (`Søborg S.G.& I.F., Badmintonafd.`) er ligeledes kun navnelignende kandidater — skal hver afvises som GSB? Bekræft også, om den samme godkendte identitetsregel må bruges på de øvrige klubber i puljerne; databasen har ingen direkte club-ID-link til holdrækkerne.

## Resultatnote

### Del 1 — ungdomsholdnavne-audit (placering ikke udført)

Tilføjet `statistik/scripts/127-audit-gsb-youth-team-names.mjs` og genereret `statistik/results/127-gsb-ungdom-holdnavne-audit.md/.json`. Scriptet bruger `DatabaseSync(..., { readOnly: true })`, scanner 32.837 hold-puljeposter for aldersgruppe-ID'erne 2, 3, 4, 5, 6, 7 og 18, og finder 516 poster på et bredt søgemønster: 280 indeholder Gladsaxe, 236 BC37 uden Gladsaxe, og én af de 280 Gladsaxe-poster indeholder også BC37. Det giver 21 direkte rå GSB-navnekandidater og 18 tvetydige/lignende varianter; ingen af dem erklæres verificeret alene på navnet.

`club_registry` har `club_id`/`club_name_raw`; `league_group_teams` har ikke klub-ID eller registry-ID og ingen FK. Derfor bruges tekstmatch kun til kandidatfund. Auditten fandt registry-kandidat `1093 Gladsaxe Søborg Badmintonklub` samt de tvetydige `1087 Badmintonklubben af 1937 (BC 37)` og `1232 Søborg S.G.& I.F., Badmintonafd.`. 092/101's holdidentitetslogik dækker senior, ikke ungdom. En tilsvarende verificeret mapping til at navngive alle øvrige klubber i puljerne findes heller ikke i de undersøgte tabeller.

**Afventer Christoffers svar** på variantlisten og identitetsreglen ovenfor. Trin 2/formatplacering er ikke begyndt; GSB-holdantal, placerede og uplacerede er derfor ikke opgjort.

Databaserne var kun læst. Før/efter SHA-256 og alle tabelrækketal er ens: `gsb-statistik-normalized.db` `49bc62ac3aa8b5a003a4b4d1a8112a8f986d12c8667b22342027d42a1d01b41e`; `liga-landskab.db` `9976723eaa61e248adc7ee33348cad41eebf9f30ddfdf913b6d40ef9d0d4b74c`. De fulde rækketal står i auditrapporten. Scriptkontrol: `node --check statistik/scripts/127-audit-gsb-youth-team-names.mjs` bestod; scriptkørslen skrev begge rapporter med de ovenstående tal.
