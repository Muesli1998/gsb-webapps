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

## Tilføjelse (Christoffer, 2026-10-07)
- Uden filtre indeholder en liste **alle** spillere på ranglisten, uanset alder og klub. U17 E-spillere må spille seniorturneringer, så ungdomsmodstandere kan have seniorpoint og ligge uden for aldersfiltrene.
- I punkt 1 og 6: opgiv for hver af de seks lister både antal sider **ufiltreret** (kun sidetallet fra første svar, ingen ekstra sider hentes) og antal sider med det bedste filter. Vurder, om filtrene taber modstandere: tjek for de modstandere, der blev fundet i punkt 5, om de ligger inden for filteret, og list dem, der kun findes ufiltreret (fx U17 E eller seniorer).
- Klasseetiketten i rækken (`U15 …`, `U17 E`, `SEN …`) skal gemmes i rapporten. U17 E regnes som ungdom, men markeres, fordi de må spille senior.

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
- Hvad er den dokumenterede semantik for `agegroupid`? Afprøvede ID'er 4, 5, 2, 3, 6 og 21 gav alle rækker uden klasseetiket. `agegroupid=21` gav 72 sider på 288/M, men kun første side er hentet; det er derfor ikke bekræftet som et samlet U09–U19-filter.
- Af 280 unikke modstandere fra GSB's U13-kampe blev 121 fundet på profil-ID i de fuldt hentede 288/M+K aldersfilterlister, 0 kun på navn+klub og 159 ikke fundet dér. Ingen af de 159 blev fundet på de hentede ufiltrerede første-sider; det er ikke bevis for, at de mangler på hele ranglisten. Hvilket filter eller hvilke listekombinationer dækker dem?
- Fem af 271 ungdomsholdkampe har ingen brugbar dato og kan ikke tildeles et snapshot.
- GSB-filteret på 289/M viser tre sider, men kun side 0 blev hentet; de øvrige GSB-sider og den fulde rækkeoptælling mangler.
- `pointsto=1500` reducerer 288/M til 59 sider, men udelader spillere over 1500 point. `agefrom=9/ageto=19` giver 74 sider og indeholder også SEN-klasser. Ingen af delene er et dokumenteret komplet ungdomsfilter.
- Den særskilte prøve `agegroupid=5` med `gender=K` på liste 287 blev ikke sendt, før prøvekørslerne blev stoppet. `pointsfrom` og `birthdatefromstring`/`birthdatetostring` blev heller ikke afprøvet.
- Ranglisteversioner er undersøgt tilbage til seasonid 2019 (ældste daterede svar 07/01/2019). Ældre sæsoners dækning er ukendt.
- Tre sammenligninger med `raw:HS`-historikken gav forskellene −4, +28 og +4 point. Stikprøven er for lille til at afgøre, om der er en systematisk forskel.
- Den første GET blev blokeret lokalt før HTTP-svar (`fetch failed`); efterfølgende adgang gav svar uden CAPTCHA, login, cookie eller bot-token. Det første forsøg tælles som et kald, men har derfor ingen statuskode, bytes eller svarhash.

## Tilbagefald
Slet de nye filer, inklusive `151-raa-svar/`. Ingen database er berørt.

## Resultat
### Metode og sikkerhed

Ruten `GetRankingListPlayers` virker på `badmintonplayer.dk`. Datoen i `rankinglistversiondate` skal sendes som kildens `MM/DD/YYYY`-værdi. De observerede svar fra 288/289/292 har point og profil-ID; 287 er ikke pointkilden ifølge pilot 150. `param=M/K` opfører sig som herre-/kvinderangliste i de observerede GSB-rækker. Dette er empirisk observation, ikke en formel API-definition.

Efter min besked om at stoppe yderligere prøvekald blev der ikke sendt flere. Jeg brugte i alt 50 af de 100 samlet tilladte kald (den oprindelige grænse på 25 blev udvidet med Chris' tilladelse til 75 ekstra): 49 HTTP 200 og ét lokalt `fetch failed` uden HTTP-svar. Alle kald var til `badmintonplayer.dk`, sekventielle med mindst 2,099 sekunder mellem starttidspunkter, uden cookies; ingen CAPTCHA-/botværn blev set. De 49 HTTP-svar har bytes og SHA-256 i forespørgselsloggen. Råsvar ligger under `statistik/results/151-raa-svar/`, med callback-kontekst redigeret.

Scriptet har nu eksplicitte netværkstilstande (`--collect-probes` og `--continue-u13-pages`) og en offline-tilstand (`--reanalyze-saved`). Det gemmer request-checkpoint efter hvert svar, kan genoptage manglende sidetal uden at gentage allerede hentede sider og kontrollerer databasehashes. Ingen ny forespørgsel blev sendt ved den afsluttende genanalyse.

Checkpoint-/genoptagelsesstien blev tilføjet efter indsamlingen og er derfor syntakskontrolleret, men ikke afprøvet med nye netværkskald; jeg stoppede yderligere kald efter din besked.

### 1–2. Filtre, sider og seks liste/køn-kombinationer

Ufiltrerede sidetal er kun aflæst fra første svar for hver liste/køn; ingen ekstra ufiltrerede sider blev hentet. GSB-filteret giver disse observerede mængder:

| Liste | Køn-param. | Ufiltreret sider | GSB-filter: sider hentet/total | GSB-rækker | Med point | Med profil-ID |
|---:|:---:|---:|---:|---:|---:|---:|
| 288 | M | 99 | 2/2 | 150 | 150 | 150 |
| 288 | K | 37 | 1/1 | 47 | 47 | 47 |
| 289 | M | 136 | 1/3 | 100 | 100 | 100 |
| 289 | K | 53 | 1/1 | 86 | 86 | 86 |
| 292 | M | 41 | 1/1 | 81 | 81 | 81 |
| 292 | K | 33 | 1/1 | 63 | 63 | 63 |

Alle observerede GSB-rækker har både point og profil-ID. 288/M og 288/K indeholder senior-klasseetiketter i GSB-prøven. `param=M/K` stemmer derfor med kønsopdelingen i de observerede svar.

På 288/M gav alders-ID'erne 4, 5, 2, 3, 6 og 21 henholdsvis 18, 20, 1, 12, 15 og 72 sider. Alle afprøvede side-0-rækker havde point, men ingen viste klasseetiket. 288/M med `agegroupid=4` blev hentet 18/18 sider, og 288/K med samme filter 8/8 sider: i alt 26 sider og 2.526 rækker. `pointsto=1500` gav 59 sider (første side pointinterval 1.480–1.500). `agefrom=9/ageto=19` gav 74 sider og viste blandt andet SEN E-M, SEN A og SEN M. Det er derfor ikke muligt at fastslå et sikkert, komplet ungdomsfilter ud fra disse kald.

### 3. Versionshistorik

| seasonid | Versionsposter | Daterede | Ældste | Nyeste |
|---:|---:|---:|---|---|
| 2021 | 147 | 146 | 07/01/2021 | 06/29/2022 |
| 2020 | 77 | 76 | 07/01/2020 | 07/05/2021 |
| 2019 | 146 | 145 | 07/01/2019 | 06/21/2020 |

GSB-filteret for den ældste afprøvede version, 288/M på 07/01/2019, gav 29 rækker, alle med point. Der er ikke søgt før seasonid 2019.

### 4. Versioner pr. kampdato

Databasestikprøven omfatter 271 ungdomsholdkampe i de forespurgte sæsoner; alle 271 er i season_id 2025. Af dem har 266 brugbar dato, fordelt på 12 forskellige kampdatoer. Reglen “seneste version på eller før kampdato” vælger 11 forskellige snapshots. Fem kampe uden dato kan ikke tildeles en version.

### 5. Modstanderkobling

I 88 GSB-U13-kampe i 2025/26 fandtes 280 unikke modstandere. Modstanderholdets hjemme-/ude-side kunne fastslås direkte fra de nationale kampnavne i alle 88 kampe. Af de 280 blev 121 fundet på profil-ID blandt de fuldt hentede 2.526 rækker fra 288/M+K, 0 alene på navn+klub og 159 ikke fundet i disse aldersfilter-sider. Ingen af de 159 dukkede op på de hentede ufiltrerede første-sider; de ufiltrerede svar dækkede kun side 0, så dette afgør ikke om de findes andre steder eller har senior-/anden aldersklasse.

### 6. Hentelogik og foreløbigt omfang

Minimumsdesignet er seks kombinationer (288/289/292 × M/K) gange 11 snapshots, altså mindst 66 sidekald, hvis hver kombination kun havde én side, plus versionslistekald. Med de aktuelle ufiltrerede sidetal er summen 399 sider pr. snapshot; 11 snapshots × 399 + seks versionslistekald = 4.395 kald, omtrent 2,44 timers minimumspause ved 2 sekunder pr. kald. Sidetal kan variere mellem snapshots, så dette er et aktuelt ufiltreret regneeksempel, ikke et endeligt historisk estimat.

Et GSB-only-regneeksempel er 9 observerede sider × 11 snapshots = 99 kald, ca. 0,055 timers pause, men det udelader modstandere; desuden mangler 2 af de 3 sider for GSB 289/M. Det er ikke en egnet fuld-hentningsløsning. Det samlede bedste-filter-estimat kan først laves, når filterets betydning er afklaret og sidetal er målt for alle seks kombinationer og relevante snapshots.

Fuld hentning bør gemme version og hver side sekventielt, mindst 2 sekunder mellem kald. Gem råsvar/hash og checkpoint pr. side. Brug deduplikering på liste, kønsparameter, versionsdato og sidetal; markér først et snapshot komplet, når alle sider er hentet. En separat tabel kan bruge skemaet `ranking_points(list_id,param,version_date,player_id,member_number,name,club,class,rank,points,fetched_at,response_sha256)`. Kampkobling vælger seneste snapshot `<= match_date`; manglende kampdato eller spiller-ID skal forblive uafklaret, ikke udfyldes ved navnegæt.

Fem GSB-eksempler fra 288/M: Jonathan W. Hansen 3.310 (SEN M-A), Jonas Trusell-Jensen 3.299 (SEN M-A), Morten Aarøe 3.244 (SEN M-A), Kenn Blæsbjerg Christensen 3.117 (SEN A), Oliver Frei 3.108 (SEN A).

Tre direkte sammenligninger mod seneste lokale `raw:HS`-snapshot 2026-09-02: Jonathan W. Hansen 3.310 mod 3.314 (−4); Jonas Trusell-Jensen 3.299 mod 3.271 (+28); Morten Aarøe 3.244 mod 3.240 (+4). Forskellene går ikke ens vej; tre personer er ikke nok til at konkludere systematisk forskel.

### Kontrol og værn

- Fire databaser blev åbnet med `readOnly: true`; før/efter SHA-256 er identiske:
  - `gsb-statistik-normalized.db`: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`
  - `liga-landskab.db`: `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`
  - `rangliste-historik.db`: `6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F`
  - `national-spillere.db`: `1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E`
- `git status --short statistik/data/` er tom.
- `node --check statistik/scripts/151-pointlister.mjs` bestod.
- `node statistik/scripts/151-pointlister.mjs --reanalyze-saved` bestod; rapporten blev genskabt offline, 0 netværkskald, og hashene var uændrede.
- `git diff --check` bestod uden fejl.

Nye/ændrede opgavefiler er scriptet, de to resultatfiler, råsvarsmappen og dette opgavekort. Alt efterlades ustaged; ingen commit eller push.
