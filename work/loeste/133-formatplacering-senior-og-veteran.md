# Opgave 133 — formatplacering og bredde for senior og veteran (som 127 for ungdom)

**Trin:** Samme metode som 127, men for senior og veteran. Kan køre uafhængigt af 131, men bør kende regelbogen, hvis den er merget.

## Baggrund
127 lavede format- og bredde-analysen for ungdom (formathierarki, GSB's placering, bredde = rækker i region 8 hvor GSB har mindst ét hold). Senior og veteran mangler tilsvarende. Scriptet er `statistik/scripts/127-youth-format-and-kbh-width.mjs`.

## Mål
1. Kopiér metoden fra 127 til et nyt script `statistik/scripts/133-senior-veteran-placering.mjs`. Ret ikke 127-scriptet.
2. For senior og veteran, pr. sæson: GSB's hold, række, placering og antal hold i rækken, samt bredde (rækker i Badminton København med mindst ét GSB-hold).
3. Rangér rækkerne efter niveau, hvor rækkenavnene tillader det. Hvor niveau ikke kan afgøres, så skriv "ikke fastlagt", ikke et gæt.
4. Skriv `statistik/results/133-senior-veteran-placering.json` og `.md` med de samme felter som 127, så artifacten kan bruge dem.
5. Liste over rækkenavne, der ikke kunne tolkes (som 129), med antal poster.

## Afgrænsning
- Hierarkiet for ungdomsformater (4+3 > 4+2 > …) gælder ikke for senior/veteran. Find rækkernes egen struktur (fx række 1–4, serier, Danmarksserie) i data og skriv antagelserne i resultatnoten.
- Ingen ændring af databaser eller af 127/129-filer.
- Ingen nye downloads.

## Kontrol
- **Målet:** alle sæsoner med GSB senior/veteran-hold er med; tal summerer til antal poster i databasen.
- **Værnet:** databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `readOnly: true`, `git diff --check` uden fejl.
- **Skøn:** stikprøve på 15 hold mod rå-data.

## Ved tvivl
Skriv i "Spørgsmål". Især hvis senior-struktur ikke svarer til 127's antagelser.

## Gren
`arbejde/133-senior-veteran-placering`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, rører ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Spørgsmål
- `standing_position` giver placering inden for én fysisk pulje, ikke samlet placering i en rækkenavn-gruppe med flere puljer. Rapporten viser pool-placering og antal hold i puljen samt total hold i rækken; samlet rækkebaseret placering står som ikke fastlagt. Hvis Chris ønsker en samlet rækkeplacering, kræves et særskilt valg af hvordan forskellige puljer/spilfaser skal sammenlægges.
- Senior-/veteranrækkenavne indeholder flere adskilte systemer (Badmintonligaen, Danmarksserien, divisioner, serie-familier og lokale etiketter). Rapporten rangerer kun eksplicitte tal inden for samme familie og sammenligner dem ikke på tværs; der er ikke udledt en samlet officiel rang uden kilde.

## Tilbagefald
Slet de nye filer.

## Resultat
Tilføjet `statistik/scripts/133-senior-veteran-placering.mjs` og genereret JSON/MD-resultater. Scriptet åbner begge databaser med `readOnly: true`; det ændrer ikke 127/129-resultater. SEN er senior; aldersgrupper med navn `SEN+…` behandles som veteran. GSB er kun råt `team_name_raw`, der starter med `Gladsaxe Søborg`.

**Optælling:** 248 GSB-hold-puljeposter = 94 SEN + 154 SEN+-poster; 245 fysiske puljepostrækker, 74 sæson/aldersgruppe-kombinationer. Af dem har 240 en puljeplacering og 8 mangler `standing_position` (flere GSB-hold kan stå i én pulje, derfor summerer disse to posttal ikke som antal fysiske rækker). Den fulde niveau-ufortolkeliste har 774 distinkte rækkenavne/2.305 fysiske senior-/veteranpuljer, heraf 31 GSB-hold-poster i ufortolkede rækker. Rapporten viser alle 74 kombinationer.

**Bredde:** 72 Badminton København sæson/aldersgruppe-kombinationer med GSB; række-bredde (eksakt `division_name_raw`) og fysisk-pulje-bredde vises separat pr. sæson/alder og summeret pr. aldersgruppe. Region 8 blev bekræftet som Badminton København.

**Metode/antagelser:** divisioner og serienumre står i hver sin niveau-familie; lavere eksplicit rækkenummer sorteres først inden for familien. Badmintonligaen og Danmarksserien vises særskilt, og “elite”, kvalifikation, slutspil samt uklare rækkenavne sammenlignes ikke med andre familier. For én pulje kan `standing_position` vises som puljens/rækkens placering. Ved flere puljer vises kun puljeplaceringen, fordi databasen ikke indeholder en samlet rækkeplacering. Spørgsmålene ovenfor forbliver åbne.

**Kontrol:** `node --check statistik/scripts/133-senior-veteran-placering.mjs` bestod; scriptkørslen bestod med 248/248 GSB-poster afstemt; separat opslag af de 15 udtrukne stikprøver mod rå `league_group_teams` gav 15/15 identiske holdnavne og `standing_position`; breddebrøker var alle inden for nævnerne. SHA-256 før/efter uændret: normalized `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; landscape `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`. Fuldstændige tabelrækketal før/efter er i JSON og identiske. `git status --short statistik/data/` er tomt; `apps/netlify-prod/` har fortsat kun Chris’ tre forudgående ændringer.
