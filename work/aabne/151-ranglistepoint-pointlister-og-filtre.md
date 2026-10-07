# Opgave 151 — pointlister (288/289/292) med filtre, og hvor langt tilbage

**Trin:** Fortsætter 150. Små, afgrænsede prøver. Ingen fuld indsamling.

## Hvad 150 viste (læs `statistik/results/150-ranglistepilot.md`)
- Ruten virker. `rankinglistversiondate` skal sendes som Value-strengen `MM/DD/YYYY` (fx `10/01/2026`), ikke `DD-MM-YYYY`.
- **Liste 287 (samlet/tilmeldingsniveau) har ingen point** (`points` er null i alle 300 GSB-rækker). **Listerne 288, 289 og 292 har point** (`points` udfyldt i alle 100 rækker). Point skal altså hentes fra disciplinlisterne.
- Rækkerne har `player_id` (profil-ID) på alle rækker. For GSB-spillerne passede 12 af 12 fundne ID'er med `national_external_player_id` i kampdata, og navn og klub passede i alle 12. ID-koblingen virker altså, hvor spilleren er hentet. De 8 "ikke fundet" skyldes, at kun 3 af 4 GSB-sider og 2 sider af ranglisten blev hentet.
- Versionerne er hyppige: 41 daterede versioner siden 1. juli 2026, 158 i seasonid 2025, 137 i seasonid 2022 (ældste dato 2022-07-01). Ældre sæsoner er ikke afprøvet.
- Sider: 99 sider for HS-herrer (alle), 4 for GSB på liste 287. Det er for meget at hente alt for alle versioner. Filtre skal gøre listen kort.

## Mål (maks. 25 forespørgsler i alt)
1. **Filtre på pointlisterne.** Afprøv ét ad gangen på liste 288 (param `M`, seneste version) og skriv, om point er udfyldt, og hvor mange sider svaret har:
   - `clubid` = `1093` (GSB). Hent alle sider (forventet 1–2). Lister antal rækker, klasser og point.
   - `agegroupid` = `4` (U13), derefter `5` (U15) med `gender` = `M`. Står aldersklassen i rækkerne (`U13 …`), og kommer der U15- eller U17-spillere med? (I 150 gav `agegroupid=5` på liste 287 også "U17 E"; afklar hvad ID 5 dækker, fx ved at prøve 2, 3, 6, 21.)
   - `pointsfrom` / `pointsto`, hvis det virker (fx `pointsto` 1500) og kan bruges til at skære listen ned.
   - `birthdatefromstring` / `birthdatetostring` eller `agefrom` / `ageto` (format afprøves, ét kald). Mål: hent kun spillere i ungdomsalder.
   Skriv for hvert filter: virker det, og hvor mange sider giver "alle U09–U19 på liste 288 herrer"?
2. **Alle seks kombinationer.** Én prøve (GSB-filter, seneste version) for hver af 288 M/K, 289 M/K, 292 M/K. Skriv om `param` er køn, og om alle seks har point.
3. **Hvor langt tilbage.** Hent versionslisten for `seasonid` 2021, 2020 og 2019 (højst ét kald hver). Skriv ældste og nyeste dato og antal versioner. Hent derefter ét GSB-filtreret svar for den ældste version, der findes, så vi ved, om point også er der. Hvis versionslisten for et år er tom, skriv det.
4. **Version vs. kampdato.** Til forventet vinder bruges seneste version på eller før kampdagen. Opgør af de 271 GSB-ungdomskampe 2025/26–2026/27 i databasen, hvor mange forskellige kampdatoer der er, og hvor mange forskellige versioner (efter reglen) de bruger. Det er det antal versioner, en rimelig hentning minimum kræver. Ingen netværk til dette punkt.
5. **Kobling for modstandere.** Når punkt 1 har givet en filtreret ungdomsliste (fx U13 herrer 288), så tæl: hvor mange af de modstandere i GSB's U13-kampe 2025/26, der kan findes på ID på den liste, hvor mange kun på navn og klub (markér som uafklarede), og hvor mange slet ikke. Brug de sider, der er hentet; skriv hvor mange sider det er ud af hvor mange.
6. **Plan for fuld hentning** med tal: antal lister (6) × versioner (fra punkt 4) × sider pr. liste efter filtrering (fra punkt 1), ny separat database (forslag til skema: `ranking_points(list_id, param, version_date, player_id, member_number, name, club, class, rank, points, fetched_at, response_sha256)`), takt, checkpoint, og hvor mange timer det tager ved 2 sekunders pause.

## Netværksregler
- Maks. **25 forespørgsler i alt**, sekventielt, mindst 2 sekunders pause, backoff ved 429/5xx, stop ved 3 fejl i træk.
- Kun `badmintonplayer.dk`: ét GET af `/DBF/Ranglister/` for kontekstnøglen (genbrug nøglen, hent ny ved fejl) og POST til `GetRankingListPlayers`. Brug 150-scriptet som udgangspunkt.
- Ingen login, ingen cookies, ingen CAPTCHA, ingen samtykkeklik. Ved bot-værn: stop og skriv det i "Spørgsmål".
- Rå svar (kontekstnøgle redigeret ud) gemmes i `statistik/results/151-raa-svar/`. Ingen databaser skrives til.

## Output
- `statistik/scripts/151-pointlister.mjs`
- `statistik/results/151-pointlister.md` (punkt 1–6, forespørgselslog med nr., felter ændret, status, bytes, svarhash)
- `statistik/results/151-pointlister.json`
- `statistik/results/151-raa-svar/`

## Kontrol
- **Målet:** Punkt 1–6 besvaret, eller et tydeligt stop med den fejl, der blev set.
- **Værnet:** Højst 25 forespørgsler (tallet står i loggen, hver med hash). Databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E), alle åbnet readOnly. `git status --short statistik/data/` tom. `git diff --check` uden fejl.
- **Skøn:** 5 GSB-spillere fra svaret (navn, point, klasse), som Christoffer kan sammenligne med den offentlige side. Sammenlign også 3 GSB-spillere med den nyeste snapshot i `rangliste-historik.db` (Nembadminton-kilden): hvor tæt er pointene, og er forskellen systematisk?

## Afgrænsning
- Ingen fuld indsamling, ingen ny database, ingen forventet-vinder-beregning, ingen artifact.
- Ret ikke 136-parseren, 143–150-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke på felters betydning; skriv, at det er ukendt, og gem evidensen.

## Gren
`arbejde/151-pointlister`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive `151-raa-svar/`. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
