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
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive `150-raa-svar/`. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
