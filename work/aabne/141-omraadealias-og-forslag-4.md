# Opgave 141 — saml områdenavne i regelbogen og implementér forslag 4 i parseren

**Trin:** Retter to ting fra gennemgangen af 131 og 136 (2026-10-05). Forudsætter at grenen `arbejde/131-133-136-regelbog-senior-parser` er merget til main.

## Baggrund
1. **131: områdenavnene er splittet.** Regelbogen bruger registerets `area`-tekst ordret, så samme område optræder under flere navne, fx "Badminton Danmark + DGI Badminton" og "DGI Badminton + Badminton Danmark", og to varianter af Fyn/Sønderjylland/Nordjylland/Midtjylland. Hver variant er sin egen kæde, så en betinget sæson kan misse en tidligere fil, der ligger under det andet navn. Det rammer især senior, veteran og regionerne. GSB's egne kæder (København, nationalt ungdom) er ikke berørt.
2. **136: forslag 4 er kun talt.** Christoffer har godkendt forslag 4 som datastyret regel (se `work/aabne/136-raekkenavne-niveauparser-udvidelse.md`, afsnittet "Forslag 4"), men `136-parser-effekt.md` siger "forbliver kun optælling". Reglen er ikke implementeret.

## Del A: områdenavne i regelbogen
1. **Find generatoren.** Undersøg, hvordan `statistik/kilder/reglementer/regelbog-pr-saeson.json` blev bygget. Findes der ikke et committet script, så lav `statistik/scripts/131-byg-regelbog.mjs`, der bygger JSON'en deterministisk ud fra `register.json`. **Bevis først**, at scriptet reproducerer den nuværende regelbog uden ændringer (samme 918 poster, samme tal pr. status, ingen forskel i `entries`), før du tilføjer alias.
2. **Aliastabel.** Lav `statistik/kilder/reglementer/omraade-alias.json`, med felterne `kanonisk`, `varianter` (liste af registerets områdenavne), `type` (`stavning_rækkefølge` eller `substantiel`) og `begrundelse`.
   - **Anvend kun** rene stavnings-, forkortelses- og rækkefølgevarianter, hvor det er åbenlyst, at der er tale om samme geografiske/organisatoriske område (fx "A + B" mod "B + A", eller "Badminton Fyn, Badminton Sønderjylland, Badminton Nordjylland og Badminton Midtjylland" mod "Badminton Fyn, Sønderjylland, Nordjylland og Midtjylland").
   - **Anvend ikke** sammenlægninger, hvor områdets indhold er forskelligt eller det er uklart (fx "Sjællands Badminton Kreds (historisk forgænger)" mod "Badminton Sjælland", eller DGI-kombinationer). De står som `forslag_ikke_anvendt` med begrundelse, så Christoffer kan afgøre dem.
3. **Genopbyg regelbogen** med kanoniske områder. Behold de oprindelige varianter i et felt `omraade_varianter` på hver post. Regelbogens JSON og .md opdateres; skriv `131-regelbog-daekning.md`-tallene om (antal kæder, kæder med mindst én fil, felter pr. status).
4. **Før/efter-rapport** `statistik/results/141-omraadealias-foer-efter.md`: antal områder før og efter, hvilke kæder der blev slået sammen, og for hver sammenlagt kæde hvilke felter der skiftede status (fx fra "ingen" til "betinget") og hvorfor. Skift der er sket **uden** at en tidligere fil stod i den anden variant, er fejl og skal rettes.
5. **Opslagsscriptet** `slaa-op-regelbog.mjs` skal kunne slå op både på kanonisk navn og på en variant. Opdatér det og vis 5 eksempler.
6. **Oversigt for GSB:** bekræft, at København-ungdom og national ungdom (BD + DGI) er **uændrede** (samme status og kilde pr. sæson som før). Skriv det i før/efter-rapporten.

## Del B: forslag 4 i parseren (`statistik/scripts/136-raekkenavn-parser.mjs`)
Regel (fra 136-kortet, godkendt af Christoffer): 4+3 og U11 4+2 afgøres **pr. region, sæson og aldersgruppe ud fra data**:
- har rækkenavnet et niveau (bogstav eller tal), tolkes det som normalt;
- har det intet niveau, og der kun findes **én** række af det format i region, sæson og aldersgruppe, så er status **"intet niveau nødvendigt (eneste række)"**;
- har det intet niveau, og der findes **flere** rækker af formatet i samme region, sæson og aldersgruppe, så forbliver de **uforklarede**.

Opgaver:
1. Implementér reglen. Hver tolkning får `tolkning_regel: "forslag-4"` og en status for de tre grupper.
2. Genskab `statistik/results/136-parser-effekt.md/.json` (136 er ikke afsluttet, før reglen er med). Tilføj: antal poster og rækkenavne i hver af de tre grupper for 4+3 og for U11 4+2, listen over 4+3/4+2-rækker, der **har** et bogstav eller tal, og 20 eksempler fra hver gruppe.
3. Tjek med et par udvalgte eksempler, at en region/sæson med flere navnløse rækker af formatet ikke fejlagtigt får "eneste række".
4. Kør de eksisterende 25 parsertests igen, og tilføj mindst tre nye for forslag 4 (én række uden niveau, flere rækker uden niveau, række med bogstav).
5. Ret **ikke** 129-parseren eller 127/129-filer.

## Afgrænsning
- Rør ikke afsluttede resultater (127, 129, 130, 133). Regelbogsfilerne (131) og 136-filerne må genopbygges, fordi de er det, opgaven retter.
- Ingen nye downloads. Ingen databaseændringer, kun læsning (`readOnly: true`).
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.
- Pointskalaer arves ikke (kort 137, valg A). `pointskala_arv: "ingen"` skal bevares i alle poster.

## Kontrol
- **Målet:** Del A: det genopbyggede regelbogsscript reproducerer den gamle regelbog 1:1 før alias, og aliasændringerne er forklaret felt for felt. Del B: forslag 4 er implementeret, tallene for de tre grupper er vist, og testene består (25 gamle + mindst 3 nye).
- **Værnet:** databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C); `git status --short statistik/data/` tom; København-ungdom og national ungdom uændrede; `git diff --check` uden fejl.
- **Skøn:** stikprøve på 10 sammenlagte felter og 15 parserrækker, med konkrete eksempler.

## Ved tvivl
Skriv i "Spørgsmål". Er to områdenavne ikke åbenlyst samme område, så lad dem være adskilt og list dem som forslag.

## Gren
`arbejde/141-omraadealias-og-forslag-4`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git, lader ændringer stå ustaged, melder filstierne, tager aldrig `git add -A`, pusher ikke, ingen Co-Authored-By.

## Spørgsmål
- Den oprindelige 131-kildeselektion var ikke gemt som et committet generator-script. `131-byg-regelbog.mjs` reproducerer derfor først de historiske 918 poster fra 131-resultatets immutable baseline `0d27ab7`, og validerer samtlige kilde-ID'er mod `register.json`; derefter udfører den alias-sammenlægningen. Hvis der ønskes en uafhængig genberegning af den oprindelige 131-kildeselektion direkte fra registerfelterne, kræver det særskilt fastlæggelse af de historiske type-/sæsonregler.
- Tre mulige områdesammenlægninger står bevidst som `forslag_ikke_anvendt`: den historiske SBKr-kæde mod Badminton Sjælland, Nordjylland med/uden DGI og de Sjællandske DGI-/Badminton-kombinationer. De ændrer ikke regelbogen.

## Tilbagefald
Gendan regelbogsfilerne og 136-resultatfilerne fra `main`. Ingen database er berørt.

## Resultat
### Del A — områdenavne

Der fandtes intet tidligere generator-script. `node statistik/scripts/131-byg-regelbog.mjs --verify-baseline` bestod før aliasering: 918 felter; bekraeftet/betinget/ingen = 41/96/781; `entries` identiske med 131-baselinen; 53 kilde-ID'er kontrolleret mod registeret. Scriptet replay'er de historiske valg fra commit `0d27ab7`, fordi den oprindelige kildeudvælgelse ikke var gemt som kode, og derefter anvender den dokumenterede rene navnevarianter.

Områder: 18 → 15; felter: 918 → 765; område-/målgruppekæder efter sammenlægning: 45, heraf 16 med mindst én kilde. Status efter: 41 bekræftede, 92 betingede, 632 ingen. 153 sæson/målgruppefelter indgår i tre sammenlagte kæder. 23 variantfelter skiftede status, alle fordi deres tidligere egen kæde stod som `ingen` eller betinget, mens en kilde faktisk var registreret under den anden navnevariant. Rapporten angiver for hvert skift sæson, gruppe, kilde-ID, kildeområdets registertekst og forklaring. Kontrollen af kildeområde mod den modsatte variant bestod for alle skift (0 skift uden kilde i anden variant). Ti sammenlagte felter er vist som stikprøve.

De tre anvendte grupper er (1) Badminton Danmark + DGI Badminton med omvendt rækkefølge, (2) den samme fire-regioners Fyn/Sønderjylland/Nordjylland/Midtjylland-liste med og uden gentaget "Badminton", og (3) den samme vestlige DGI-/Badminton-deltagerliste i omvendt rækkefølge. Tre substantielle forslag er ikke anvendt. Opslagsscriptet accepterer både kanonisk navn og variant; fem opslag bestod. København-ungdom og national BD/DGI-ungdom er sammenlignet på alle 17 sæsoner: status, kilde, afstand og versioner uændrede. `pointskala_arv` = `ingen` i alle 765 poster.

### Del B — forslag 4

`136-raekkenavn-parser.mjs` afgør 4+3 og U11 4+2 pr. fysisk række og alle dens region/sæson/alder-koblinger. Rækker med genkendt niveau fortsætter med normal tolkning; niveau-løse rækker får `tolkning_regel: "forslag-4"` kun når der ikke er en anden pulje af samme format i nogen tilknyttet region. Rækker i flerrække-scopes og rækker uden regionkobling forbliver uafklarede.

Optælling: 4+3 = 347 puljer (11 med niveau, 49 eneste række, 287 flere/ukendt); U11 4+2 = 33 (5 med niveau, 12 eneste række, 16 flere/ukendt). I alt 61 niveau-løse puljer fik forslag-4-status. Rapportens 15-rækkers stikprøve består af 5 med niveau, 5 eneste-række og 5 flerrækkeeksempler. `parser_tests`: 25 eksisterende + 3 nye = 28/28 bestået. Der er 245 scopes med flere niveau-løse puljer; listen og eksemplerne står i JSON. Resultatets baseline er fortsat 1.986 navne / 941 gamle parserfund / 1.045 gamle ufortolkede navne / 3.536 gamle ufortolkede puljer.

### Kontrol og værn

`node --check` bestod for `131-byg-regelbog.mjs`, `slaa-op-regelbog.mjs` og `136-raekkenavn-parser.mjs`. Baselinekontrol, genopbygning, parsergenerering og fem aliasopslag bestod. Begge databaser er uændrede: normalized SHA-256 `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`, liga-landskab SHA-256 `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; `git status --short statistik/data/` er tom.

Før arbejdet viste Git-status kun Chris' fire eksisterende ændringer. Efter arbejdet står de samme fire urørte, plus udelukkende filerne angivet i Del A og Del B; ingen staging eller andre Git-skrivninger. `git diff --check` bestod. Ingen spørgsmål om parserfortolkningen står åbne; generatorens historiske replay-begrænsning og uanvendte substantielle aliasforslag er anført under Spørgsmål.
