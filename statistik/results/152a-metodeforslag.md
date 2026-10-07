# 152a — billigere hentning af præcise ranglistepoint

Dato: 2026-10-07. Gren: `arbejde/152a-metode`.
Kun offline-læsning og analyser; **0 netværkskald**. Ingen databaseændringer.
Dette er et metodeforslag, ikke en gennemført hentning eller en ændring af kort 152.

## Anbefaling kort

1. Afklar `playerid` på den **fungerende** `GetRankingListPlayers`-request med højst 10 kald. Det er endnu ikke bevist, at parameteren giver et isoleret spilleropslag eller kan bruges historisk.
2. Behold præcise versionsdatoer. Byg et behovsregister over spiller-ID × disciplinliste × relevant version, og vælg derefter spilleropslag eller fulde sider **pr. liste og version**, ikke én metode for hele arkivet.
3. Behold kort 152's fulde kontrolsnapshot som reference, især hvis `playerid` ikke består testen. Det valgte snapshot er **2026-04-10**, brugt af **41 holdkampe**. Med de aktuelle sidetal er forskellen mellem en forsigtig hybrid og alle seks fulde lister kun **374 mod 399 side-/spillerkald** dér.
4. Gem svar, versioner og negative fund permanent. Hent aldrig samme side/opslag igen ved genoptagelse. Brug kun de lister, spillerens faktiske discipliner kræver; uafklaret køn må ikke gættes.

For hele 2025/26 giver scenarieberegningen **3.473 hybridkald mod 4.389 fulde sidekald**, omtrent **21 % færre**, før versionsopslag, kontekst, kontrol og fejlreserve. Det kræver, at `playerid` virker, og at historiske sidetal ligner de aktuelle. Det er **ikke et bevist historisk kaldtal**. Rene spilleropslag kan derimod koste **4.983 kald** og blive dyrere end fuld hentning.

## 1. Hvad der faktisk er målt

### Afgrænsning og identiteter

Udgangspunktet er `team_matches` koblet til `competitions` i `gsb-statistik-normalized.db`: sæson-ID 2019–2026 og ungdoms-ID'er 2, 3, 4, 5, 6, 7, 18. De forekommende grupper er U09, U11, U13, U15 og U17/U19. Senior indgår ikke. Spillere må gerne stå i seniorklasse på ranglisten: det ændrer ikke, at deres holdkamp her er en ungdomskamp.

Der er **924 holdkampe**, heraf **876 daterede** og **48 uden brugbar dato**. `national-spillere.db.player_matches` indeholder **14.136 deltager-/disciplinrækker** for **871** af holdkampene og **2.481 distinkte eksterne spiller-ID'er**. Dette er ID'er fra den nationale kampkilde, ikke et garanteret, komplet antal personer i alle 924 kampe. Samme person kan spille flere discipliner og sæsoner; sæsonernes spillertal må ikke summeres til 2.481.

Nationalt afledt kønsstatus for disse ID'er: **545 mand, 570 kvinde, 1.366 ikke afklaret**. Status stammer fra databasen, ikke navnegæt. I fri S/D og MD med uafklaret køn indeholder det forsigtige behovsregister begge M/K-lister. En kønnet disciplinkode HS/DS/HD/DD vælger direkte sin liste.

**53 holdkampe mangler nationale deltagerposter**: 1 i 2019, 37 i 2020, 2 i 2021, 1 i 2022, 8 i 2023, 2 i 2024, 2 i 2025. Deres status er 14 `browser_verified`, 38 `browser_verified_no_result`, 1 `api_error`. Kun én af disse 53 har deltagerposter i den normaliserede database. Det er ikke bevist, at alle 53 burde have spillede individuelle kampe; ingen af dem konverteres automatisk til efterspurgte point.

Den normaliserede ungdomsdel har **2.426 lokale player_id'er**, men kun **604 distinkte, ikke-null external_player_id'er**. Blandt dem er tekstidentiteten `name:ikke fremmødt`, som ikke er en person, der skal hentes point for. ID'er herfra må ikke blindt lægges sammen med BadmintonPlayer-profil-ID'er. Manglende eller forskellig ID-namespace kræver et dokumenteret match; navn alene er en kandidat. De nationale deltagerposter havde ingen `Ikke fremmødt`-spiller.

`player_match_extras` har 14.179 rækker for de samme 871 kampe. Denne tabel har flere slotposter end `player_matches` og må ikke tælles som flere personer. Optællingen bruger `player_matches`, ikke summen af begge tabeller.

### Sæsonbehov

| Sæson | Holdkampe / daterede | Forskellige brugbare kampdatoer | Kampe med nationale deltagere | Distinkte nationale spiller-ID'er | Nødvendige versioner fra gemt liste 288 |
|---|---:|---:|---:|---:|---:|
| 2019/20 | 20 / 20 | 7 | 19 | 99 | 7 |
| 2020/21 | 65 / 65 | 8 | 28 | 161 | 8 |
| 2021/22 | 90 / 90 | 11 | 88 | 408 | 10 |
| 2022/23 | 134 / 134 | 11 | 133 | 533 | 11 |
| 2023/24 | 157 / 143 | 10 | 149 | 564 | Ukendt; højst 10 ved én version pr. kampdato |
| 2024/25 | 187 / 158 | 10 | 185 | 741 | Ukendt; højst 10 ved én version pr. kampdato |
| 2025/26 | 271 / 266 | 12 | 269 | 964 | 11 |
| 2026/27 | 0 / 0 | 0 | 0 | 0 | Intet aktuelt kampbehov |

Version vælges som største dato ≤ kampdato, og requesten skal sende den tilhørende `Value`, måned/dag/år, ikke visningens `Text`. Gemte daterede versionslister for 288 har 145 versioner i 2019, 76 i 2020, 146 i 2021, 137 i 2022, 158 i 2025 og 41 i 2026. Der er ikke fundet en gemt fuld versionsliste for 2023/24 eller 2024/25 i 150/151-svarene.

Disse versionsantal er **ikke** antal nødvendige snapshots. Der skal kun hentes de versioner, en kamp faktisk bruger. Det er heller ikke bevist, at 289 og 292 har præcis samme versionskalender som 288; planen skal validere eller enumerere kalenderen pr. liste. Tabellen og beregningerne nedenfor bruger 288-kalenderen som eksplicit scenarie, ikke som et bevist fælles arkiv.

Nul kampe i 2026/27 betyder nul behov **i den nuværende normaliserede database**, ikke at sæsonen ikke har kampe. En fremtidig incremental kørsel skal beregne behovet igen.

### Sammenlignelige kaldscenarier

Kun daterede kampbehov med læsbar disciplin. Et spilleropslag antages her at koste ét kald pr. spiller, liste, køn og version. Ukendt køn afprøves i begge lister. Sidepriser er de observerede aktuelle priser: 288 M/K = 99/37, 289 = 136/53, 292 = 41/33. Der er ingen garanti for disse priser historisk.

| Sæson | Isolerede spilleropslag, forsigtigt | Hvis ét kald gav alle lister for spiller+version | Hybrid Σ min(spillerbehov, aktuelle sider) | Hele seks lister, aktuelle sider |
|---|---:|---:|---:|---:|
| 2019/20 | 393 | 146 | 393 | 2.793 |
| 2020/21 | 513 | 194 | 473 | 3.192 |
| 2021/22 | 1.593 | 592 | 1.568 | 3.990 |
| 2022/23 | 2.443 | 885 | 2.219 | 4.389 |
| 2023/24 | højst 2.328* | højst 882* | 1.985* | højst 3.990* |
| 2024/25 | højst 3.153* | højst 1.123* | 2.425* | højst 3.990* |
| 2025/26 | 4.983 | 1.690 | 3.473 | 4.389 |
| 2026/27 | 0 | 0 | 0 | 0 |

\* Her bruges kampdato som separat gruppe, fordi versionslisten mangler. Fælles versioner kan reducere antallet. Hybridtallet er også betinget af de aktuelle sidepriser. Tabellen er ikke et budget for fuld produktion og dækker ikke ukendte deltagere, rettede kampdatoer eller nye kampe.

Alle-rækker-i-én-spillerrequest er **hypotetisk**. Det fremgår ikke af gemte svar, at det findes. Omkring 15 nationale deltagerposter har tom/ukendt disciplin: 4 i 2021, 1 i 2022, 3 i 2023, 5 i 2024 og 2 i 2025. De får ingen opdigtet liste. Behov uden kampdato står uden for kaldscenarierne.

Hvis man kun talte allerede kønsafklarede rækker, ville 2025/26 koste 1.665 spilleropslag. Det ville være en misvisende billig plan: 2.157 deltagerposter i sæsonen kan ikke vælge disciplinliste+køn sikkert med den nuværende viden. De 4.983 inkluderer den nødvendige forsigtige håndtering.

Kald ovenfor er datakald uden kontekst, nye versionslister, kontrol, fejl og eventuel negativ-fund-validering. Første sider til at måle sidetal kan genbruges i fuld hentning, men er ekstra prøveudgift i grupper, der ender med kun spilleropslag. Derfor er `Σ min(...)` et beslutningsscenarie før denne overhead, ikke et løfte om et præcist slutantal.

## 2. Evidens: hvad requestfelterne allerede beviser

Kilder: `statistik/results/150-ranglistepilot.md/.json`, `151-pointlister.md/.json`, alle 20 og 49 gemte svar i deres råmapper, samt de relevante ranking-svar og scripts. De fire `call-ranking-*.mjs` ligger faktisk i **statistik/**, ikke `statistik/scripts/` som baggrundspromptens sti antyder.

| Spørgsmål | Bevist i gemte data | Ikke bevist |
|---|---|---|
| Version + sider | 150 request 7: `10/01/2026`; request 15: `12/31/2025`; request 8: sideindex 1 med 100 andre rækker end side 0. 151 request 23: GSB 2019, 29 rækker med point. | Alle historiske sider og kalenderfællesskab på tværs af lister. |
| `playerid` i listekald | Feltet står i proxyens metode og den fungerende request-body, hvor det er tomt. Responsen har også `PlayerID`, `PlayerNumber`, `PlayerName`. | Om ikke-tomt ID filtrerer, flytter til en side, markerer en spiller eller gør noget andet; kombinationen med version. |
| Gammelt spiller-ID-forsøg | `call-ranking-players.mjs` satte 84737, men brugte en anden parameterpakke og fik HTTP 500. | Fejlen kan ikke tilskrives `playerid` alene. Det er ikke en afprøvning med 150's fungerende baseline. |
| `GetPlayerRankingListPoints` | `ranking-points-2026.json` viser single-point for flere kampe/events; `ranking-mix-2026.json` viser eget hold, makker og to modstanderes point i holdkamp 507719, 05-09-2026. | Et samlet svar med alle discipliner eller alle ranglisteversioner; komplet historisk adgang. |
| Historisk profilopslag | `historical-ranking-call.txt` gav 500 med aktuel rankinglistplayer-ID og gammel sæson; `historical-ranking-ids.txt` fandt ikke historiske ranking-links. | Om korrekte historiske rankinglistplayer-ID'er kan skaffes gennem ranglistearkivet og åbner pointtabellerne. |
| Pointfilter | 151 request 18: `pointsto=1500`, 59 sider; første sides point 1480–1500. | `pointsfrom`, inklusive/eksklusive grænser og komplet tie-håndtering. |
| Rangfilter/sortering | `rankingfrom`, `rankingto`, `sortfield` står i metode og body. | Virkning, sorteringskoder og stabilitet. Der er ingen kontrolleret vellykket ranginterval-test i 150/151. |
| Aldersfilter | 151 hentede agegroupid 4, M+K: 26 sider, 2.526 rækker. 150 request 9 ændrede samlet liste 287 med agegroupid 5 + gender K. | At aldersfilter giver alle, der deltog i de historiske ungdomskampe. |

`GetPlayerRankingListPoints` tager `seasonid`, `playerid`, `rankinglistid`, `rankinglistplayerid`, `getplayerdata`, men **ingen versionsdato** i den gemte proxydefinition (`081-webservice-catalog-probe.json`). Profil-ID 84737 og single-ranglistepost-ID 8473902 er forskellige identiteter. De må ikke forveksles.

`API_RESEARCH.md` under "Brugerbekræftet betydning af pointfeltet" fastslår, at kamp-/eventpoint i denne metode er de gældende ranglistepoint ved spilletidspunktet. Den betydning er domænebekræftet og skal ikke afvises. Men en eventtabel er ikke i sig selv bevis for alle versioner eller alle kampe. De ældre noter om generelle listekald, der fejler, er overhalet af 150/151's vellykkede request og historiske prøver.

En yderligere fejlkilde: 151's 121 fundne og 159 ikke-fundne U13-modstandere sammenligner 2025/26-kampdeltagere med et **aktuelt 2026/27-aldersfilter**. Sæsonskift/årgangsskift er en mulig forklaring; tallene beviser ikke, at de 159 er seniorer, eller at de mangler i samme historiske snapshot. Dette skal testes på samme dato, ikke forklares med gæt.

## 3. Metoder og afgrænsede fremtidige prøver

Prøverne er **forslag**, ikke udført. Hvert forslag er højst 10 kald inklusive nødvendigt GET; de skal ikke alle gennemføres. Fælles første pilot står i afsnit 7. Kun offentlig adgang, ingen cookies/token-omgåelse; sekventielt mindst 2 sekunder, stop ved botværn/CAPTCHA og tre fejl i træk.

### A. Direkte `playerid` på den fungerende liste-request

**Krav:** Godkendt pilot med baseline fra 150/151; historisk `Value`; kendt profil-ID; `getplayer` behandles som ukendt flag. Kontrollér selve tabellens ID og point, ikke kun topniveauets `PlayerName`.

**Pris:** Ét isoleret svar pr. behov giver scenariet 4.983 kald i 2025/26, mod 4.389 fulde sider. Hvis svaret indeholder begge køn med sikkert ID, falder dobbelte kønsprøver bort, men det er ikke bevist. Ét svar med alle discipliner kunne give 1.690 spiller+version-opslag; dette er et uprøvet alternativ, ikke den normale metodes dokumenterede respons.

**Risiko:** Serveren kan blot lokalisere/markere ID'et på en 100-rækkers side. Det kan stadig være nyttigt: gem den medfølgende side, dæk andre efterspurgte ID'er gratis, og dedupliker sidehentningen. Et tomt eller uændret svar er ikke sikkert "ikke på listen", før flag, param, version og ugyldigt-ID-adfærd er afklaret.

**Prøve, højst 8 kald:** GET, historisk baseline, kendt ID med getplayer true, samme med false, samme ID på anden version, samme ID på anden liste, kendt kvinde i K, et rigtigt ID med dokumenteret fravær fra kontrol-listen. Sammenlign ID, point, side, øvrige rækker og negative svar. Ingen opfundne spiller-ID'er.

### B. Kampvise pointtabeller pr. spiller og disciplin

**Krav:** Historisk rankinglistplayer-ID og kontrolleret kobling til konkret holdkamp/disciplin. Tabellen kan give flere deltageres point i én double/mixed, hvilket er en reel mulig batchgevinst. Flere eventrækker skal grupperes korrekt; en fortsættelsesrække uden dato er ikke en ny version.

**Pris:** Der er **1.888 distinkte spiller×liste-behov i daterede 2025/26-kampe**, uanset køn, og **6.468** over alle sæsoner med daterede kampdata. Hvis ét eventkald pr. spiller×liste×sæson dækkede disse, ville det være datakaldsprisen, plus ID-discovery/profiler og manglende kampe. At én double/mixed kan dække makker/modstandere kan reducere det yderligere; ingen dækningsfaktor er bevist. Hvis én spillerprofil gav alle point for en sæson, er der 942 daterede spiller×sæson-behov i 2025 og 3.264 i hele perioden — heller ikke en bevist capability.

**Bevis/risiko:** Gemt aktuel single og mixed er positive beviser; historisk brug med aktuel post-ID fejlede. Skjult antagelse om gamle post-ID'er eller om ikke-pointgivende kampe ville bryde fuldstændigheden. Et manglende event må føre til ranglistearkiv-fallback, ikke nul/startpoint.

**Prøve, højst 6 kald:** GET; listekald med en historisk spiller, som kan levere et faktisk post-ID/link; følg det eksakte historiske pointlink; samme spillers anden disciplin; aktuel positiv kontrol; sammenlign mod et dateret listekald. Hvis post-ID/link ikke findes, stop dette spor, ikke gæt.

### C. Målrettede sider via rang/point og kendte placeringer

**Krav:** Bevist filtersemantik og sortering. Kendt rang eller punktværdi for **samme** liste/version kan finde en side. En ID-værdi alene kan ikke binærsøges i en pointsorteret tabel: den fortæller ikke, om spilleren ligger over eller under en læst side.

**Pris:** Aktuelle sidetal 33–136 giver ceil(log2(sider)) = 6–8 søgeskridt. Med én slutkontrol er det 7–9 kald pr. spillerbehov: 4.983 × 7–9 = **34.881–44.847** kald i 2025/26, hvis opslagene køres uafhængigt. Derfor er almindelig binærsøgning et dårligt hovedspor. Ved en **allerede kendt, korrekt sideplacering** bliver prisen antal distinkte efterspurgte sider, højst fuld liste. Tidligere versions rang er kun et fingerpeg.

**Pointvinduer:** Brug et tidligere snapshots kendte point som start og udvid vinduet. På 151's aktuelle 288/M reducerede et loft på 1500 siderne fra 99 til 59, men udelukkede alle over loftet. Forskydninger kan være store, og lige point kan fylde flere sider. Stop først, når alle efterspurgte ID'er er fundet, eller hele liste-intervallet er gennemgået. Pris for de relevante ID'ers virkelige vinduer kan ikke beregnes endnu: historiske rækker/range-semantik mangler.

**Prøve, højst 7 kald:** GET, baseline; ranginterval omkring en faktisk gemt rang; præcist pointinterval omkring en faktisk gemt pointværdi; nabointerval; to sider ved ties/grænser. Bekræft intervalgrænser, rækkefølge, dubletter og ID-dækning. Ingen gættet sortfield-kode.

### D. Færre snapshots / månedlige point

**Krav:** Chris ændrer præcisionskravet, eller kilden dokumenterer, at point er uændrede i et interval. Uændret point ved to endepunkter beviser ikke uændrede mellemliggende versioner.

**Pris:** 2025/26's 11 brugte versioner ligger i 8 forskellige måneder. Ét valgt snapshot pr. behovsmåned ville i det aktuelle fuldliste-scenarie være 8 × 399 = **3.192** mod 4.389, **27,3 % færre sidekald**. Men det leverer ikke nødvendigvis seneste version før kampen. Et månedsultimo-snapshot kan desuden ligge efter kampen og give fremtidslækage.

**Offline-måling:** Se afsnit 4. Der er reelle ændringer, og daglig BP-fejl kan ikke måles med den eksisterende, overvejende månedlige Nembadminton-historik. Metoden fravælges til det uændrede præcisionsmål.

**Prøve, højst 7 kald:** GET og tre par præcis/månedlig version på samme liste med faktiske ID'er. Mål ændring og manglende ID'er, ikke kun gennemsnit. En lille prøve kan afkræfte lighed, ikke bevise lighed for hele arkivet.

### E. Færre liste/køn-kombinationer pr. spiller

**Krav:** Deltagernes faktiske discipliner. HS→288/M, DS→288/K, HD→289/M, DD→289/K, MD→292 med sikkert køn; S/D bruger kønsstatus eller begge lister. Holdets aldersgruppe erstatter ikke køn eller ranglisteklasse. Tom disciplin er uafklaret.

**Pris:** 2025/26 har 1.690 spiller+version-behov. Seks opslag til hvert ville være **10.140**; faktiske disciplinspecifikke behov inklusive dobbelte prøver ved ukendt køn er **4.983**, 50,9 % færre end denne naive spillermetode. Det er ikke en 50,9 %-besparelse mod fuldlisteplanen. I 2025/26 bruges 64 af mulige 66 liste×version-grupper; 2026-03-20 behøver ingen mixed-gruppe i de læsbare deltagerdata.

**Bevis/risiko:** Disciplinkoder og databasederiveret kønsstatus er gemt; historisk tilstedeværelse på ranglisten er ikke bevist. Et fund i HD erstatter ikke manglende HS. Lister 287 og raw:LEVEL kan ikke erstatte disciplinspecifikke point. Uafklaret køn fra fri disciplin må ikke blive navnegæt.

**Prøve, højst 5 kald:** GET og samme historiske single-only-spiller på 288 og 289, samt en mixed-spiller på 292 M/K. Kontrollér præcist, hvad fravær betyder. Selve offline-behovsreduktionen kræver ingen netværksprøve.

### F. Sidestørrelse, skjult JavaScript og mindre svar

**Krav:** Serverens rigtige parameterkontrakt. Det gemte HTML indeholder inline-JavaScript og henvisninger til `sportsresults.js?v=14`, `DBFMaster.js?v=7`, ASMX `/js`, `v2-vendors.js`, `v2-app.js`. De eksterne ranking-implementeringer er ikke gemt sammen med 150/151-svarene. Det er ikke muligt offline at påstå, at hele klientlogikken er læst.

Den gemte proxydefinition indeholder playerid, rang-/point-/aldersfiltre, getplayer/getversions, men **ingen pagesize, offset, batch-player-ID eller all-versions-parameter**. Observerede fulde sider har 100 rækker. Dette beviser ikke, at serveren internt aldrig kan noget andet; der er bare ingen dokumenteret genvej.

**Pris:** Hvis 500 rækker pr. side faktisk understøttes, ville de aktuelle seks lister kræve højst ceil(99/5)+ceil(37/5)+ceil(136/5)+ceil(53/5)+ceil(41/5)+ceil(33/5) = **83** sider pr. snapshot, højst 913 for 11 snapshots. Dette er kun et regneeksempel, ikke et understøttet requestforslag.

**Mindre payload:** 61 gemte vellykkede POST-svar med HTML er i gennemsnit **75.686 bytes**; offline gzip af samme bytes giver **6.050 bytes**. `Versions`-feltet fylder gennemsnitligt **3.248 bytes**, ca. 4,3 %. Hent kalenderen én gang pr. liste/sæson og afprøv `getversions=false` på datakald. Det giver ikke færre kald, men muligvis mindre svar og serverarbejde. Gzip af lokale filer reducerer lagring, ikke automatisk serverbelastning eller netværksbytes.

4.389 svar af denne stikprøvestørrelse svarer til ca. **332 MB ukomprimeret** eller **26,6 MB lokalt gzip**; ét 399-siders snapshot ca. 30,2 MB/2,4 MB. Det er stikprøvefremskrivning, ikke målt historisk trafik. Callback-kontekst redigeres ud inden permanent lagring.

**Risiko:** Større svar kan give mere serverarbejde eller timeout. `getplayer=false`/`getversions=false` kan påvirke andre felter; det skal måles, ikke antages. 151's page_count falder til 7 på den kendte sidste K-side (index 7), fordi højeste link på sidste side kun er forrige side. Bevar oprindeligt bekræftet total; brug ikke max(synlige links)+1 på hver side som løbende total. Kort sidste side og kendt sidste index skal afstemmes.

**Prøve, højst 5 kald:** GET; hent den faktisk linkede ranking-JS; baseline og samme data med getversions false; ændret sidestørrelse **kun hvis den fremgår af klient/proxy**. Ellers afslut med "ingen dokumenteret sidestørrelsesparameter".

### G. Stop, når efterspurgte ID'er er fundet

**Krav:** Frosset version og et komplet behovsregister pr. liste. Gem et sæt udestående ID'er og deres disciplin. Første sider med høje point er ikke nødvendigvis de mest informative ungdomssider.

**Pris:** Kald = højeste læste side frem til alle mål-ID'er er dækket, eller antal distinct sider ved en valideret målrettet rute. Præcist antal kan ikke måles på ufiltrerede lister: 150/151 har kun få af deres sider. 26 fulde aldersfiltrerede sider kan ikke bruges som nationalt unfiltered sidekort.

**Risiko:** Hvis blot én spiller ikke findes på listen, finder algoritmen aldrig alle ID'er. Når alle er fundet med brugbare point, kan den stoppe sikkert for **pointbehovet**. Når nogen mangler, skal fuld gennemgang eller bevist eksakt negativ-ID-opslag skelne fravær fra ufærdig søgning. "Snapshot komplet nationalt" og "efterspurgte spillerbehov komplet" skal være to forskellige statusser. Navn/klub-afvigelse bliver review, ikke et stille positivt match.

**Prøve, højst 4 kald:** GET, to kendte sider med en lille mål-ID-liste og ét valideret negativt ID-opslag. Offline kan checkpoint/stoplogikken testes på gemte svar uden netværk; det beviser logik, ikke serverens negative svar.

### H. Adaptiv hybrid og genbrug

**Krav:** A består; aktuelle/historiske sidetal måles pr. gruppe; sæt med manglende ID'er, cache og negative svar har provenance. Vælg færrest estimerede kald mellem isolerede opslag og fuld liste. Udnyt hele medfølgende sider, selv når formålet var ét ID. Genberegn udestående behov efter hvert svar.

**Pris:** 2025/26: ca. **3.473** mod 4.389 før overhead i det aktuelle-sidepris-scenarie. Den mest brugte version, 2026-04-10, har 668 forsigtige spiller×liste×køn-behov:

| Gruppe | Efterspurgte ID'er | Aktuelle fulde sider | Valg i scenariet |
|---|---:|---:|---:|
| 288 M | 166 | 99 | 99 sider |
| 288 K | 151 | 37 | 37 sider |
| 289 M | 159 | 136 | 136 sider |
| 289 K | 143 | 53 | 53 sider |
| 292 M | 26 | 41 | 26 spilleropslag |
| 292 K | 23 | 33 | 23 spilleropslag |
| **I alt** | **668** | **399** | **374 kald** |

Fuld kontrolhentning af dette snapshot er derfor et fornuftigt første trin: kun 25 flere scenariekald og sikker reference for negative fund. På andre versioner er hybridgevinsten større, fx 2025-09-19: 244 mod 399.

"Fuld nyeste + målrettet ældre" er ikke nødvendigvis billigst: nyeste kalender-snapshot har intet aktuelt 2026/27-kampbehov. Brug i stedet et **relevant**, tæt kontrolsnapshot; dets rækkepositioner og point er fingerpeg for ældre versioner, ikke garanti. Behov fra senere kampe kan altid tilføjes og genbruge cache.

**Andre genveje:** Klubfiltre kan samle mange efterspurgte ID'er i få sider, men ranglisteklubben kan være forskellig fra klubben på kampdagen. Brug kun verificerede klub-ID'er og fallback for alle ufundne. De aktuelle GSB-lister kræver 9 sider, men denne klubpris dækker ikke modstandere eller historisk klubskift. Region/aldersfiltre udelukker potentielle deltagere og er ikke et komplet hovedspor. Parallelisering giver færre venteminutter, ikke færre kald, og øger kildebelastningen; den anbefales ikke.

**Prøve, højst 10 kald:** Fælles A-pilot i afsnit 7. Valg-/cachelogik afprøves offline. En alternativ klubprøve kan erstatte et lavere prioriteret kald: baseline, præcist verificeret klubfilter, samme historiske ID-opslag og sammenligning; ikke udvide den samlede pilot automatisk.

## 4. Måling af ændringer og grovere snapshotfejl

`rangliste-historik.db` har **40.364 pointposter**, **349 Nembadminton-member-ID'er**, **49 distinkte versionsdatoer**, fra 2022-08-01 til 2026-09-02. Kildetyper holdes adskilt: `single/double/mix` fra membersStats og `raw:HS/DS/HD/DD/MxH/MxD` fra memberStats. Der er ikke historik for 2019–2021 her.

For hver member+disciplin sorteres version_date; fejlmålet er absolut punktforskel til forrige **gemte** version. Det er ikke nødvendigvis to på hinanden følgende offentlige BP-versioner. Typisk afstand er 31 dage; nogle raw-forløb har huller på op til 1.219 dage.

| Serie | Sammenligninger | Uændrede | Gennemsnitlig absolut ændring | P95 | Maks. |
|---|---:|---:|---:|---:|---:|
| raw:HS | 5.148 | 3.926 | 10,98 | 42 | 1.079 |
| raw:DS | 2.269 | 1.880 | 8,48 | 37 | 1.138 |
| raw:HD | 6.679 | 4.384 | 13,24 | 54 | 1.269 |
| raw:DD | 3.306 | 2.391 | 10,07 | 40 | 1.131 |
| raw:MxH | 4.792 | 3.923 | 8,59 | 28 | 1.291 |
| raw:MxD | 2.991 | 2.295 | 8,98 | 35 | 836 |
| single | 2.784 | 2.239 | 4,87 | 30 | 817 |
| double | 3.950 | 3.055 | 5,09 | 31 | 934 |
| mix | 3.018 | 2.612 | 2,58 | 20 | 250 |

Median er 0 i alle ni serier. Maksima og gennemsnit må ikke præsenteres som daglige udsving; de inkluderer lange huller. raw:LEVEL er ikke en kampdisciplin og bruges ikke som point-erstatning.

**Kampdato-proxy:** Via `player_link` med `match_confidence=exact_name` vælges kun HS/DS/HD/DD, fordi fri S/D og MD ikke sikkert kan oversættes her. Sammenlign ved hver unik lokal spiller×disciplin×kampdato (a) seneste gemte point ≤ kampdato med (b) seneste gemte point ≤ den 1. i kampens måned. Kræv, at (a) er højst 35 dage gammelt; uden denne afgrænsning bliver gamle fastfrosne serier vildledende.

Resultat: **189 sammenligninger**, **77 med forskel** (40,7 %), median 0, gennemsnitlig absolut forskel **8,83**, P95 **34**, maks. **86 point**. Dette er et begrænset, navnekoblet GSB-proxyforsøg, ikke validering på alle 2.481 ID'er eller modstandere. Koblingerne er `normalized_exact_name`, ikke bevis for ens Nembadminton/BP-ID. Den ukvalificerede prøve havde 461 sammenligninger og median datalder 284 dage; den forkastes som repræsentativ fejlmåling.

Den månedlige proxy bruger kun fortidige værdier. Når kilden har versioner den 2., kan "seneste før månedens 1." blive forrige måneds version. En anden månedlig udvælgelse giver andre fejl; ingen af dem rekonstruerer ukendte daglige ændringer.

**Konklusion:** Der er ikke offline-grundlag for at love samme præcision ved månedlig hentning. Den faktiske fejl mod seneste officielle BP-version før kampdagen er **ukendt**, fordi de daglige par ikke er gemt. Besparelse ved grovere tid må ikke blandes sammen med samme fuldstændighed/præcision.

Eksisterende `points_at_match` hjælper heller ikke: alle **14.033** normaliserede ungdoms-deltagerposter i perioden har tomme point. Fordeling: S 5.124, D 5.080, HS 428, DS 960, HD 561, DD 971, MD 909; **0 med udfyldte point**. Ingen af dem kan bruges som gratis point-cache.

## 5. Foreslået hentningslogik

1. Byg frosset offline-behov fra kampdata. Ekskludér ikke-fremmødt-identiteter. Bevar ukendt dato, ID og disciplin i særskilt mangelliste; de tæller ikke som løst.
2. Valider profil-ID-namespace. Eksakt ID-match efterfølges af navn+klub-kontrol; en klubændring må markeres med årsag, ikke automatisk blive identitetsfejl eller blive skjult. Uafklarede matches forbliver uafklarede.
3. Enumerér/version-cache pr. liste og sæson. Vælg sidste version ≤ kampdag og gem original Value. Deduplicér ens liste+version på tværs af kampdage og aldersgrupper.
4. Opret mål-ID'er pr. liste+køn+version. Uafklaret køn har to forespurgte lister, ikke to opdigtede personer. Tomme behovsgrupper udløser ingen hentning.
5. Brug en valideret spiller-rute, når den er billigere. Ellers hent fuld liste med fast historisk version; gem første side, ægte sidste index og negative fund. Bevar alle brugbare point i læste sider til senere behov.
6. Efter hvert svar: efterprøv faktiske point, dæk også andre mål-ID'er i svaret, opdater checkpoint og kostmodel. Ved sidefund fra spilleropslag kan flere mål dækkes af ét kald.
7. Stop med succes, når alle aktuelle pointbehov er dækket eller har **bevist disciplin-specifikt fravær**. Review/navn-klub-konflikt, ufuldstændig søgning og teknisk fejl har hver sin status. Manglende point er aldrig 0 eller et default-startpoint.
8. Brug samme requestnøgle i cache: sæson, liste, param, versions-Value og samtlige virksomme filtre, pageindex/playerid. Kontekstnøglen er ikke en data-identitet. Gem hash, kilde og hentetid; pause/resume må ikke duplikere færdige requests.

For at vurdere kildebelastning skal pilotens log også måle svartid og bytes. Ti små svar kan stadig være dyrere for serveren end én 100-rækkers side. Ingen bevis for indeksering af playerid/rangfiltre findes lokalt.

## 6. Rangeret anbefaling

1. **Adaptiv, præcis hybrid efter playerid-pilot.** Bedste balance mellem fuldstændighed, risiko og forventet kaldpris. Gevinsten er betinget, men kan måles tidligt og metoden har en sikker fuldliste-fallback.
2. **Fulde, relevante snapshots med behovs-/cache-/stoplogik.** Allerede dokumenteret fungerende datarute. Behold som reference og hovedmetode, hvis isolerede opslag ikke virker. Det historiske budget skal måles, ikke sættes til 399 pr. version på forhånd.
3. **Kampvise GetPlayerRankingListPoints som ekstra batchspor.** Kan give flere spillere og kampdagens point i samme svar. Undersøg kun, hvis korrekte historiske post-ID'er findes; historisk komplethed er ikke bevist.
4. **Klubfiltre, kendte sider og udvidende pointvinduer som opportunistiske genveje.** Brug en dækningsgaranterende fallback for alle ufundne. Ingen blind alders-, regions- eller pointgrænse.
5. **Større sider / alle lister / alle versioner i ét svar.** Stor mulig gevinst, men ingen dokumenteret parameter. Kort kontraktkontrol, ikke et langt feltgætteri.
6. **Månedlige snapshots.** Fravælges med det nuværende krav. Kun relevant, hvis Chris eksplicit accepterer omtrentlige point og mærkning af alder/fejl.

## 7. Konkret fælles pilot: højst 10 kald

Dette er den første anbefalede afprøvning, hvis Chris godkender netværk i en efterfølgende opgave. De øvrige metoders prøver er alternativer og er ikke et ekstra samlet budget.

| Nr. | Kald | Afgørende kontrol |
|---:|---|---|
| 1 | GET af den offentlige Ranglister-side | Frisk kontekst; ingen cookies/login. |
| 2 | Historisk 288/M baseline, kendt Value, side 0 | Rækker, profil-ID, point, versionsvalg, pagination. Vælg en faktisk spiller fra dette svar. |
| 3 | Samme request, kun playerid udfyldt | Isoleret række, fundet side eller kun markering? Gem hele svaret. |
| 4 | Samme som 3, getplayer false | Flagets virkning; tabellens point/ID, ikke kun topniveau. |
| 5 | Samme spiller på anden dokumenteret versions-Value | Historisk filter virker og dato er ikke ignoreret. Point behøver ikke ændre sig, hvis spilleren faktisk har samme værdi. |
| 6 | Samme spiller på 289, kendt version | Alle discipliner i ét svar eller listevis? Fravær må ikke gættes. |
| 7 | Kendt kvindelig profil fra gemt K-liste, 288/K | M/K og spillerfilter i kombination. |
| 8 | ID med dokumenteret fravær fra den konkrete kontrolliste | Negativt svar skal være skelneligt fra teknisk fejl/ufiltreret svar. Hvis et sådant ID ikke er kendt, brug kaldet på en anden positiv kontrol; negativ semantik står uafklaret. |
| 9 | Samme positive request med getversions false | Samme point/ID, færre bytes, ingen mistet versionsbinding. |
| 10 | Følg et faktisk rankinglistplayer-link fra historisk svar | Pointtabelsporet, kun hvis korrekt historisk ID/link findes; ellers endnu en positiv filterkontrol. |

Genbrug gemt råsvar til sammenligninger, men sørg for samme historiske dato i baseline og filtertest. Hvis versionskalender eller korrekt historisk post-ID ikke foreligger, prioriteres afklaringen inden for de 10; ikke flere kald på gættede felter. En frisk kontekst-GET efter udløb tæller også med. Log alle requestfelter uden konteksthemmelighed, status, bytes, svartid, hash, pointdækning og præcis stopgrund.

Efter piloten: godkend en fuld referenceversion, fx 2026-04-10. De 399 aktuelle sider og 450-kaldsbudgettet er kun et estimat; verificér de historiske sidste sider, før resten sættes i gang. De 10 afklaringskald skal tælles med eller godkendes som en separat fase; ikke skjules i reservedelen.

## 8. Udkast til ændring af kort 152

Kortet er **ikke ændret** i denne opgave. Forslag til Chris/manager:

- Behold titlen "ét komplet, ufiltreret kontrolsnapshot", men indsæt en indledende pilot på højst 10 kald for `playerid` og payloadflag. Skriv udfald før fuld hentning. Selve kortets nationale fuldstændighedskontrol må ikke erstattes af "mål-ID'er fundet" uden et bevidst ændret mål.
- Ret baggrunden: 399 sider er observeret på aktuelle 2026/27-svar, ikke garanteret på valgt historisk snapshot. 159 ikke-fundne U13-modstandere kommer fra et andet sæson-/aldersfilter; årsagen er ikke fastslået.
- Angiv valget 2026-04-10, 41 holdkampe, og genberegn det ved kørsel. 48 undaterede holdkampe i hele målperioden og 53 uden nationale deltagerposter håndteres særskilt; 2025 har fem undaterede.
- Behold alle seks fulde lister i **kontrolsnapshot** og checkpoint-testen. Læs totalt sidetal korrekt fra første/eksplicit sidste link; sidste sides tilbage-links må ikke nedjustere totalen.
- Lav offline `ranking_needs` før hentning. Gem også `need_status` med found, confirmed_absent, incomplete_search, identity_review, missing_date/id/discipline. Uden punktværdi er posten ikke dækket. Uafklaret køn prøves i begge lister uden navnegæt.
- Ved efterfølgende sæsonhentning: særskilt godkendt kort med hybrid og behov pr. version. Kræv nye historiske side-/versionstal og konkrete budgets, ikke "11 × 399" som et fast faktum.
- Gem eksakt versionskalender pr. liste/sæson. `getversions=false` bruges kun efter positiv pilot. Bevar redigerede råsvar komprimeret, så kontrol/future genbrug ikke kræver nye kald.
- Pointskema/cache skal skelne profil-ID, medlemsnummer og rankinglistplayer-ID. Negative resultater kræver fuld liste eller valideret eksakt filter, ikke blot tom side.
- Behold eksisterende kilde-/databaseværn, max-kald, mindst 2 sekunder, bot-stop og ny separat database. Ingen månedlig approximation uden ny beslutning.

## 9. Spørgsmål og ubekræftede forhold

1. `playerid`/getplayer-semantik, historisk gyldighed og sikre negative svar er ikke afprøvet med fungerende baseline.
2. Kan historiske ranglistepost-ID'er findes, og dækker eventpointtabellen alle relevante kampe? Aktuelle positive svar er ikke et historisk bevis.
3. Kalender for 2023/24 og 2024/25 samt liste 289/292's kalenderfællesskab mangler offline. Sidetal historisk mangler.
4. 53 holdkampe uden nationale deltagerrækker, 48 uden dato, 15 rækker uden disciplin og mange lokale spillere uden profil-ID begrænser et løfte om "alle spillere i alle kampe". Behovsregisteret må angive hullerne, ikke skjule dem i et lavt kaldtal.
5. Ekstern ranking-JavaScript er ikke gemt; skjult side-/batchparameter kan hverken bekræftes eller afvises fuldstændigt offline.
6. Rangliste-historikkens navnebaserede GSB-koblinger og månedlige sampling kan ikke validere daglig BP-præcision eller modstanderdækning. Månedlig substitution fravælges uden ny beslutning.
7. Der optrådte under analysen en uvedkommende untracked fil `clear`, med tekst om opgave 151. Den er ikke oprettet, ændret eller slettet af denne opgave. Den eksisterende 136-status er også urørt.

## 10. Sporbarhed og kontrol

Alle SQLite-koblinger brugte Node `DatabaseSync(path, {readOnly: true})`. `player_matches` blev læst via sin covering primærnøgle; `player_match_extras` via kamp-ID-indeks. Ingen scripts med netværk blev kørt. Analyseprogrammer blev kørt fra stdin og gemte ingen hjælpescripts eller analysefiler. Ét første forsøg på en supplerende tællekommando havde en parentes-SyntaxError; den blev rettet og kørt igen uden database- eller filskrivning.

Kerneforespørgsel til kampudvælgelse:

```sql
SELECT t.*, c.age_group_id
FROM team_matches t
JOIN competitions c USING (competition_id)
WHERE t.season_id BETWEEN 2019 AND 2026
  AND c.age_group_id IN (2, 3, 4, 5, 6, 7, 18);
```

Nationale deltagere vælges med `external_match_id IN (...)` fra denne mængde. Distinkte nøgler til prisberegning: `(season_id, valgt_version, external_player_id, liste, M/K)`; 2023/24 og 2024/25 bruger kampdato som øvre scenariegruppering. Statistik/P95 er beregnet på sorterede absolutte forskelle med indeks floor(0,95 × antal); ingen interpolation. Denne beskrivelse og tabellerne angiver, hvilke antagelser der skal ændres ved nye data.

Læste grundlag: AGENTS.md, statistik/AGENTS.md, kort 152; 150/151-rapporter og JSON; 69 gemte råsvar inklusive HTML/inline-JS; API_RESEARCH.md; de fire call-ranking-scripts i statistik-roden; ranking-points/mix-2026.json, historical-ranking-call.txt, historical-ranking-ids.txt, ranking-players-2026-09-01.json, ranking-inline.txt, ranking-page-inspect.txt; 081-webservice-catalog-probe.json; analyse-/parserdele af 150/151-scripts; readonly skema og data i normaliseret, national og ranglistehistorik. Liga-landskab.db blev kun hashet. Ingen ændringer i nogen af disse.

### SHA-256 før og efter

| Database | SHA-256 før = efter |
|---|---|
| gsb-statistik-normalized.db | `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` |
| liga-landskab.db | `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C` |
| national-spillere.db | `1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E` |
| rangliste-historik.db | `6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F` |

Før-status havde seks eksisterende ændringer: de tre Netlify-filer, docs/BESLUTNINGER.md og de to 136-parser-effekt-filer. `git diff --stat` viste kun fire indholdsmæssigt ændrede filer, 14 indsættelser/14 sletninger; 136 gav linjeskiftadvarsler. Efter-status viser de samme seks ændringer samt denne rapport og den uvedkommende `clear` som untracked. `git diff --stat` er stadig fire filer, 14 indsættelser/14 sletninger. Ingen eksisterende fil er skrevet af opgaven. Ingen staging/commit/push.

Kontrol efter analysen: alle fire SHA-256 matcher før-værdierne. `git status --short statistik/data/`: tom. `git diff --check`: exit 0, ingen whitespacefejl (kun eksisterende 136-linjeskiftadvarsler). Rapporten er genåbnet, nøgletallene kontrolleret mod analysens output og de fire hashstrenge kontrolleret som 64 tegn. Rapportens egen linje-whitespacekontrol fandt 0 fejl; den er untracked og derfor ikke dækket af almindelig `git diff --check`.
