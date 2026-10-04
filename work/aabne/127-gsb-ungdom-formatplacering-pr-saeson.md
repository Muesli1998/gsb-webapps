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

### Afventer autoritativ GSB-ungdomsholdidentitet

Jeg stoppede før formatplacering. De angivne identitetskilder dækker ikke ungdom:

- `statistik/scripts/101-koebenhavn-traadmatching.mjs` filtrerer eksplicit `age_group_id = 1`; resultatet `statistik/results/101-koebenhavn-traadmatching.json` har 7 GSB-tråde, alle fra senioranalysen.
- `statistik/scripts/092-hold-identitet-traadmatching.mjs` filtrerer også eksplicit `age_group_id = 1` og bruger senior-only input fra 089.
- En read-only forespørgsel i `liga-landskab.db` fandt 280 GSB-navngivne hold-puljeposter i 126's ungdomsaldersgruppe-ID'er (2, 3, 4, 5, 6, 18; ID 7 havde ingen poster). Det er kun et antal rå kandidatposter — ikke en valideret identitetsmapping eller antal placerbare GSB-hold.

**Spørgsmål til Christoffer:** Hvilken eksisterende, autoritativ mapping/facit skal bruges til at identificere GSB's ungdomshold på tværs af sæson og aldersgruppe? Må der anvendes en præcis klubnavne-/holdnavnematchning mod de rå GSB-navne i databasen, og i givet fald hvilket eksplicit regelsæt afgør aliaser, udgåede hold og hold med flere puljer? Indtil det er afklaret, er antal verificerede GSB-ungdomshold, placerede og uplacerede **ikke fastslået**; ingen klub- eller holdidentitet udledes her.

## Resultatnote

Opgaven er sat på pause før placering, fordi de påpegede kilder 101/092 kun indeholder senioridentitet (`age_group_id=1`). Se ovenstående spørgsmål. Begge databaser blev åbnet read-only; før/efter SHA-256 og rækketal rapporteres i afleveringen. Ingen outputrangering eller nyt script blev lavet.
