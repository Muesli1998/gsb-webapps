# Opgave 150 — ranglistepilot, nu med den rigtige request-body

**Trin:** Fortsætter 149, som stoppede, før noget API-kald var sendt. Dette kort giver de manglende parametre og afklarer værnet. Netværk er tilladt i en lille, afgrænset prøve.

## Svar på spørgsmålene i 149
1. **Cookiebot/reCAPTCHA.** Et almindeligt GET af Ranglister-siden for at læse `SR_CallbackContext` er det, projektet altid har gjort, og er ikke et værn i sig selv. Stop stadig, hvis der kommer en reCAPTCHA-udfordring, en afvisning (403/429 med bot-tekst), eller hvis et kald kræver et bot-token eller en cookie, som kun kan fås ved at køre sidens JavaScript. Accepter ikke cookie-samtykke, løs ingen CAPTCHA, og brug ikke Christoffers cookies.
2. **Hvorfor 500 tidligere.** Christoffer har kopieret et rigtigt kald fra sin browser (se nedenfor). Forskellen til de gamle forsøg: `rankinglistagegroupid` er `"15"` (ikke 0), tomme felter er tomme strenge (ikke 0), `searchall` er `false`, `getversions` og `getplayer` er `true`, og kontekstnøglen kommer fra selve Ranglister-siden (ikke fra en spillerprofil).

## Kendt request (fra Christoffers browser; cookies og kontekstnøgle er udeladt med vilje)
`POST https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/GetRankingListPlayers`

Headers (kun disse): `content-type: application/json; charset=UTF-8`, `accept: */*`, `x-requested-with: XMLHttpRequest`, `origin: https://badmintonplayer.dk`, `referer: https://badmintonplayer.dk/DBF/Ranglister/`, en almindelig browser-`user-agent`. Ingen cookies.

Eksempel 1: ren HS-rangliste (liste 288, herrer):
```json
{"callbackcontextkey":"<fra siden>","rankinglistagegroupid":"15","rankinglistid":"288","seasonid":"2026","rankinglistversiondate":"","agegroupid":"","classid":"","gender":"","clubid":"","searchall":false,"regionid":"","pointsfrom":"","pointsto":"","rankingfrom":"","rankingto":"","birthdatefromstring":"","birthdatetostring":"","agefrom":"","ageto":"","playerid":"","param":"M","pageindex":"0","sortfield":"0","getversions":true,"getplayer":true}
```
Eksempel 2: ren samlet rangliste (liste 287):
```json
{"callbackcontextkey":"<fra siden>","rankinglistagegroupid":"15","rankinglistid":"287","seasonid":"2026","rankinglistversiondate":"","agegroupid":"","classid":"","gender":"","clubid":"","searchall":false,"regionid":"","pointsfrom":null,"pointsto":null,"rankingfrom":"","rankingto":"","birthdatefromstring":null,"birthdatetostring":null,"agefrom":null,"ageto":null,"playerid":"","param":"","pageindex":0,"sortfield":0,"getversions":true,"getplayer":true}
```
Kontekstnøglen er `SR_CallbackContext` på Ranglister-siden (`var SR_CallbackContext = '…'`), hentet med et GET af `https://badmintonplayer.dk/DBF/Ranglister/` lige før kaldet. Den er kortlivet.

## Hash → felter (hypotese, skal afprøves)
Christoffers hash-eksempler: `#287,2026,<version>,0,<aldersgruppe>,<køn>,<klub>,0,<region>,,,15,…`. Det ser ud til at svare til felterne `rankinglistid`, `seasonid`, `rankinglistversiondate`, `classid`(0?), `agegroupid`, `gender`, `clubid`, `searchall`(0?), `regionid`, …, `rankinglistagegroupid`(15). Disciplin-listerne 288/289/292 har køn som sidste hash-led, som ser ud til at svare til `param`. Aldersgruppe 21 = ungdom samlet, 4 = U13, 5 = U15; klub 1093 = GSB; region 8 = København. Bekræft eller afvis hver ved at ændre ét felt ad gangen.

## Mål
1. **Bekræft ruten** med eksempel 1 (maks. 1–2 kald): HTTP-status, om svaret har rækker, felterne i en række (navn, klub, point, placering, ID), pagination (`pageindex`, antal rækker pr. side), og versionslisten (`getversions`).
2. **Prøv filtrene, ét ad gangen (maks. 8 kald):**
   - `rankinglistversiondate` sat til en dato fra versionslisten (en nyere og en fra sæson 2023/24, hvis den findes).
   - `agegroupid` `"4"` (U13) og `"5"` (U15) med `gender` `"K"`/`"M"`.
   - `clubid` `"1093"` (GSB).
   - `regionid` `"8"`.
   - Liste 289 og 292 (`param` `"M"`/`"K"`).
   Skriv for hvert filter, om det virker, og hvordan svaret ændrer sig.
3. **Spiller-ID.** Hvilken slags ID står der i rækkerne (BadmintonPlayer-spiller-ID, medlemsnummer, eller kun navn/klub)? Er det samme ID som i `national-spillere.db` og i kampdata?
4. **Kobling.** Tag de hentede rækker og afprøv på 20 GSB-spillere og 20 tilfældige modstandere fra GSB-ungdomskampe 2025/26: hvor mange kan kobles entydigt på ID, hvor mange kun på navn og klub (marker disse som uafklarede), og hvor mange slet ikke.
5. **Hvor langt tilbage?** Viser versionslisten datoer før august 2022? Hent højst ét kald fra før 2022, hvis det findes.
6. **Plan for fuld hentning:** antal lister × versioner × sider, takt, checkpoint og ny separat database (ikke de eksisterende), og hvad "forventet vinder" som minimum kræver (point for begge sider i hver kamp pr. disciplin ved kampdatoen).

## Netværksregler
- Maks. **20 forespørgsler i alt**, sekventielt, mindst 2 sekunders pause, backoff ved 429/5xx, stop ved 3 fejl i træk.
- Kun `badmintonplayer.dk`: ét GET af `/DBF/Ranglister/` for kontekstnøglen og POST til `GetRankingListPlayers`. Ingen andre kald.
- Ingen login, ingen cookies fra Christoffer, ingen CAPTCHA, ingen samtykkeklik. Ved bot-værn: stop og skriv det i "Spørgsmål".
- Gem de rå svar som filer i `statistik/results/150-raa-svar/` (kun prøvesvarene). Ingen databaser skrives til. Kontekstnøglen redigeres ud af de gemte filer.

## Output
- `statistik/scripts/150-ranglistepilot.mjs`
- `statistik/results/150-ranglistepilot.md` (punkt 1–6 og forespørgselslog: nr., felter ændret, status, bytes, svarhash)
- `statistik/results/150-ranglistepilot.json`
- `statistik/results/150-raa-svar/`

## Kontrol
- **Målet:** Punkt 1–6 besvaret, eller et tydeligt stop med den fejl, der blev set.
- **Værnet:** Højst 20 forespørgsler (tallet står i loggen, og hver forespørgsel har hash). Databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E), alle åbnet readOnly. `git status --short statistik/data/` tom. `git diff --check` uden fejl.
- **Skøn:** 5 hentede rækker (navn, klub, point) som Christoffer kan sammenligne med den offentlige side.

## Afgrænsning
- Ingen fuld indsamling, ingen ny database, ingen forventet-vinder-beregning, ingen artifact.
- Ret ikke 136-parseren, 143–149-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke på felters betydning; skriv, at det er ukendt, og gem evidensen.

## Gren
`arbejde/150-ranglistepilot`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
- Bekræftet: `rankinglistversiondate` skal sendes som `Versions[].Value` (fx `10/01/2026`, måned/dag/år). Det gav HTTP 200 og ændrede 58 af 99 fælles spilleres rang/point mod baseline; ét ID kom ind og ét ud. Den tidligere visningstekst `30-09-2026` gav tre HTTP 500-svar. Datoformatet er den stærkeste forklaring, men serverfejlens præcise årsag er ikke dokumenteret.
- `agegroupid=5` + `gender=K` ændrede alle 100 ID'er mod liste 287's baseline-side, men klasseetiketterne omfattede også `U17 E`. Kan parameterens præcise semantik fastslås, og hvorfor kom U17 med? Gæt ikke.
- GSB-filteret viser fire sider, men kun sideindex 0–2 blev hentet inden for 20-kaldsgrænsen. De 8 GSB-spillere, som ikke blev fundet i de hentede svar, kan være på den uhentede sideindex 3; de er derfor ikke dokumenteret fraværende fra ranglisten.
- Liste 287 returnerede profil-ID på alle 300 hentede GSB-rækker, men ingen numeriske pointværdier i pointkolonnen. Liste 288 har point; det er ikke afklaret, hvilken liste/parametervariant der er den rigtige kilde til point for alle relevante ungdomsspillere/modstandere.
- `seasonid=2022` returnerede daterede versioner fra 1. juli 2022 til 19. juni 2023. Ældre seasonid'er end 2022 er ikke afprøvet; hvor langt historikken går før dette, er ukendt.
- Samlet forespørgselsbudget er brugt: 20/20. Der er ikke sendt kald for GSB-sideindex 3 eller sæsoner før 2022.

## Tilbagefald
Slet de nye filer, inklusive `150-raa-svar/`. Ingen database er berørt.

## Resultat
### Rute og baseline
- Frisk GET af `https://badmintonplayer.dk/DBF/Ranglister/` gav HTTP 200, HTML på 24.149 bytes. `SR_CallbackContext` blev udtrukket til requesten; værdien blev redigeret fra den gemte HTML og requestlog. Ingen cookies blev sendt.
- Den kendte POST til `GetRankingListPlayers` (liste 288, `param=M`, sæson 2026, side 0) gav HTTP 200, JSON på 81.492 bytes og rigtig rangliste-HTML. Ruten er således bekræftet for baseline.
- Svarobjektets felter omfatter `__type`, `Html`, `Versions`, `PlayerID`, `PlayerNumber`, `PlayerName`. Liste 288 har 100 rækker på side 0; HTML-linkene går til sidste `pageindex=98`, altså 99 sider ved nulbaseret indeksering. Det gælder kun liste 288 / `param=M` / seasonid 2026.
- Versionslisten for seasonid 2026 havde 42 elementer: 41 daterede værdier samt “Seneste”, fra `07/01/2026` til `10/07/2026`. Fem faktiske baseline-rækker (placering, medlemsnummer, spiller, klub, klasse, point, profil-ID) findes i JSON-rapporten. Fx Anders Antonsen: nr. 1, Aarhus AB, SEN E, 4.975 point, profil-ID `79451`; medlemsnummeret er separat.
- Fem faktiske baseline-rækker (placering, medlemsnummer, spiller, klub, klasse, point, spillerprofil-ID) står i `statistik/results/150-ranglistepilot.json` og rapporten. Fx Anders Antonsen: nr. 1, Aarhus AB, SEN E, 4.975 point, profil-ID `79451`; medlemsnummeret er et separat felt.

### Stop og filtre
- I alt 20/20 forespørgsler: 17 HTTP 200 og 3 HTTP 500. Hvert kald er logget med ændrede requestfelter, status, bytes og SHA-256 i JSON-rapporten. Ingen CAPTCHA, bottekst, cookies eller bot-token blev mødt. De tre 500-svar var samme 91-byte JSON-fejl.
- `rankinglistversiondate=10/01/2026` på liste 288 / `param=M` gav 200 og 100 rækker. 99 ID'er var fælles med baseline; 58 af de fælles havde ændret rang og/eller point, og ét ID blev udskiftet. Datoen `12/31/2025` med `seasonid=2025` gav også 200 og ændrede 89 af 90 fælles spilleres rang/point mod sæsonens standardrespons. `30-09-2026` (visningsteksten) gav tre 500-svar; forskellen i datoformat er den stærkeste forklaring, men den præcise serverårsag er ikke bevist.
- Paginering: `pageindex=1` gav 200 og 100 rækker; ingen spiller-ID'er overlappede side 0. Pagineringen virker, og side 2 har 100 rækker. Liste 287 ufiltreret viser 212 sider.
- `agegroupid=5`, `gender=K`, liste 287 gav 100 rækker og ændrede alle ID'er mod ufiltreret sides første 100. Klasseetiketterne var `U15 A`, `U15 E`, `U15 E-M`, `U15 M` og `U17 E`; udvalget ændres, men ID 5's præcise semantik er ikke afklaret, og U17-resultatet er overraskende.
- `clubid=1093`: tre hentede sider på liste 287 gav 300 unikke rækker. Alle viste klubnavne var `Gladsaxe Søborg` eller `Gladsaxe Søborg (g)`; alle 300 havde profil-ID. Ingen havde en numerisk pointværdi i pointkolonnen. Svaret viser fire sider i alt; sideindex 3 blev ikke hentet, fordi budgettet på 20 kald var nået.
- `regionid=8` gav 100 rækker og 15 distinkte klubnavne; mod ufiltreret liste 287 var 36 ID'er fælles, 64 kom ind og 64 ud, og rang ændredes for alle 36 fælles. Det er foreneligt med at filteret virker, men region-ID'ets officielle betydning er ikke uafhængigt verificeret.
- Liste 289 og 292 med `param=M` gav begge HTTP 200 og 100 rækker med point og profil-ID. HTML-linkene antydede hhv. 136 og 41 sider.
- `seasonid=2025` gav 159 versionselementer (158 daterede) fra `07/01/2025` til `06/29/2026`. `seasonid=2022` gav 138 elementer (137 daterede) fra `07/01/2022` til `06/19/2023`. Ældre end 1. juli 2022 blev ikke afprøvet.

### ID og fuld hentning
- Hver række indeholder et separat `member_number` og et numerisk profil-ID fra `VisSpiller/#...`. Af 20 GSB-spillere blev 12 koblet på ID, 0 kun på navn+klub og 8 ikke fundet i de hentede GSB-svar. Af 20 modstandere blev 1 koblet på ID, 0 kun på navn+klub og 19 ikke fundet i alle hentede svar. GSB-tallet er ufuldstændigt, fordi sideindex 3 af fire ikke blev hentet; modstanderresultatet er begrænset til de 20 kampstikprøver og de hentede ranglister/sider. “Ikke fundet” betyder ikke fravær andre steder.
- ID-kobling virker direkte for nogle poster, men det er ikke bevist at alle ID-felter er samme identitetsrum eller at alle kan kobles. Navn+klub gav ingen ekstra entydige kandidater i stikprøverne.
- Fuldhentningens præcise requesttal er ukendt. Målte versionstal for liste 288 var 41 daterede snapshots i seasonid 2026, 158 i 2025 og 137 i 2022; observerede sidetal varierede fra 41 til 212 på prøvede kombinationer. Før et samlet estimat skal versioner og sider tælles pr. liste/sæson/filter, hvorefter summen er liste × snapshot × side plus versionskald. Hent sekventielt med mindst 2 sekunders mellemrum; gem/hash hvert svar og checkpoint pr. liste/version/side. Brug en ny separat database. “Forventet vinder” kræver point for begge sider i hver kamp pr. disciplin fra seneste snapshot på eller før kampdatoen; uløste ID-/navne-/klub-koblinger forbliver manglende.

### Kontrol
- Fire databaser blev åbnet `readOnly`; SHA-256 før/efter er identisk med de forventede værdier. `git status --short statistik/data/` var tomt.
- `node --check statistik/scripts/150-ranglistepilot.mjs` bestod; `git diff --check` gav ingen whitespace-fejl (Git viste kun LF→CRLF-advarsler på de allerede ændrede 136-resultatfiler).
- Rå-svar og log indeholder præcis 20 kald (17×200, 3×500), hver med status, bytes, hash og requestfelter. Ingen cookies eller redirects blev brugt; ingen andre værter blev kontaktet. Ingen kald blev sendt efter #20.
