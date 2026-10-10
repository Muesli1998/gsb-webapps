# Opgave 171 — turneringsdata fra badmintonplayer.dk, Del A

Kortlægning af lokalt gemte data. **Netværkskald udført: 0.**

## 1. Links fra eventtabeller

Gennemgået 4.348 gzip-filer i `154-raa-svar/`, `158-raa-svar/` og `158b-raa-svar/`. 45 indeholdt profil-eventtabeller; efter deduplikering var der 20 profiler, 19 med klubfeltet Gladsaxe Søborg, og 738 forskellige eventrækker. Gentagne cache-/genbrugsfiler tælles én gang pr. profil og række. Rå udtræk med alle rækker er i JSON; summeringen er i [CSV](171-turneringer-fra-eventtabeller.csv).

| Linktype | Unikke link-id'er | Unikke eventrækker |
|---|---:|---:|
| `VisResultater` | 133 | 529 |
| `HoldTurnering` | 136 | 209 |
| **I alt** | **269** | **738** |

Unikke link-id'er efter måned for eventrækker (samme link-id tælles én gang pr. måned):

| Måned | Turneringer og holdkampe |
|---|---:|
| 08-2025 | 7 |
| 09-2025 | 30 |
| 10-2025 | 28 |
| 11-2025 | 31 |
| 12-2025 | 18 |
| 01-2026 | 25 |
| 02-2026 | 23 |
| 03-2026 | 44 |
| 04-2026 | 43 |
| 05-2026 | 15 |
| 06-2026 | 5 |

CSV'ens `link-id` bevarer hele rå hashstreng efter `#`, inklusive kommaer og tomme holdturneringsfelter. Første/sidste dato er de observerede eventrækkers datoer, ikke turneringens officielle start-/slutdato.

## 2. ID-model

| Id-type | Observeret eksempel | Hvad evidensen viser |
|---|---:|---|
| Turnering (`tournamentID`) | `17558` | Feltet i `reproduce-tournament-events.txt`; fælles overordnet Jernløse-turnering. |
| Turneringens række/klasse (`tournamentClassID`) | `115342` | Samme svar viser klassevalget `SEN A` med value `115342`; `GetTournamentEvents`-objektet angiver `tournamentClassID: 115342`. |
| Begivenhed/disciplins event (`tournamentEventID`) | `490920`–`490924` | Fem events for klassen: herresingle, damesingle, herredouble, damedouble og mixdouble. `SearchTournamentMatches`-svaret vælger event `490920`. |
| Kampnummer | `294` | Kampnummeret i eksemplet i `158-turneringer.md`; det er vist inde i kampresultatet. Om dette nummer er en global kamp-id er **ukendt**. |
| Holdkamp-id i eventlink | `506012` | Forekommer som syvende værdi i hashstien `#5,,,,,,506012,`; den fulde semantik af felterne i denne hash er **ukendt**. |

**Konklusion for eventlinket:** For Jernløse-profilens `/DBF/Turnering/VisResultater/#115342,` er `115342` dokumenteret at være `tournamentClassID`, ikke `tournamentID` eller `tournamentEventID`. Det er dermed samme slags tal som `tournamentclassid` i 081. Tallet i linkene `113413,` og `114741,` ligger i samme observerede klasse-id-område, men deres semantik er ikke separat bekræftet af et turneringssvar; uden den bekræftelse er deres konkrete id-type **ukendt**. `115342` ligger mellem de observerede link-id'er: VisResultater-id'er spænder fra 109822 til 119399. Event-id'erne 490920–490924 og tournament-id 17558 ligger i andre intervaller.

Evidens: `statistik/results/reproduce-tournament-events.txt` (Events-objekter, klasse-/event-selects), `reproduce-tournament-matches.txt` (kald med klasse 115342/event 490920), `tournament-reference-115342.md` og eventtabellerne for `113413,`/`114741,` i `158-turneringer.json`/`158-turneringer.md`.

## 3. Webservice-katalog og gemte scriptadresser

URL-mønsteret er `https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/<metode>`. Parametre nedenfor er katalogets klient-signatur efter frasortering af callback-kontekst og callback-funktioner. **Ukendt** betyder, at der ikke blev fundet en HTTP-status i de gemte probe-svar.

| Metode | Parametre | Set i | HTTP-status i gemt evidens |
|---|---|---|---:|
| `SearchTournamentClass` | `selectfunction, seasonid, agegroupid, classid, clubid, fromdatestring, todatestring, selectopenonly, regionids, adminclubid` | `081-webservice-catalog-probe.json`, `081-route-probe.json`, `browser-assets-probe.txt` | 500 (3 forsøg) |
| `GetTournamentClassInfo` | `instance, tournamentclassid` | `081-webservice-catalog-probe.json`, `tournament-clientcalls.txt` | ukendt |
| `GetTournamentEvents` | `selecteventfunction, instance, tournamentclassid, playerlistselectfunction, selectclassfunction, selectopenonly, clubid, adminclubid, selecteddisciplinecode` | `081-webservice-catalog-probe.json`, `reproduce-tournament-events.txt`, `004-udtraeksvej.md` | 200 |
| `SearchRegistrationsByClass` | `tournamentclassid, clientselectfunction` | `081-webservice-catalog-probe.json` | ukendt |
| `SearchTournamentResults` | `tournamentclassid, clientselectfunction` | `081-webservice-catalog-probe.json`, `004-udtraeksvej.md` | ukendt |
| `SearchTournamentMatches` | `tournamentclassid, tournamenteventid, clubid, playerid, tabnumber, groupnumber, locationnumber, clientselectfunction` | `081-webservice-catalog-probe.json`, `reproduce-tournament-matches.txt`, `004-udtraeksvej.md` | 200 |
| `SearchTournamentInvitation` | `tournamentclassid, tournamenteventid, clubid, playerid, tabnumber, groupnumber, locationnumber, clientselectfunction` | `081-webservice-catalog-probe.json` | ukendt |

Søgesiden `statistik/results/149-raa-svar/01-rangliste-page-redacted.html` og det gemte GET-svar `statistik/results/158-raa-svar/kald-002-get.txt.gz` indeholder ranglistesidens script-tags, men ikke den faktiske turneringsklasse-søgekomponent. Udtrækket af alle 33 unikke `<script src>`-værdier fra gemte HTML-filer ligger i JSON under `scripts`. De turneringsrelevante adresser, som allerede er gemt i `browser-assets-probe.txt`, er:

- `https://badmintonplayer.dk/SportsResults/Components/WebService1.asmx/js` — klientproxyen eksponerer `SearchTournamentClass`.
- `https://badmintonplayer.dk/sportsresults/components/tournamentcomponents/selecttournament.js?v=16` — viser kaldsmønsteret for `GetTournamentEvents` og `GetTournamentClassInfo`.

Den konkrete JS-komponent, der kalder `SearchTournamentClass`, og dens parameterværdier er **ukendt** i de gemte HTML-filer. Derfor skal Del B hente siden/assetlisten for turneringssøgeren; proxy-signaturen alene beviser ikke de faktiske argumentværdier.

Alle 33 udtrukne `src`-værdier:

```text
../../../SportsResults/Components/WebService1.asmx/js
../../sportsresults/components/clubcomponents/clublistclientscript.aspx?unionid=1&version=639268051608870000
../../sportsresults/components/clubcomponents/clublistclientscript.aspx?unionid=1&version=639270408439030000
../../sportsresults/components/clubcomponents/searchclub.js
../../sportsresults/components/general/textboxselectcontroller.js?v=4
../../sportsresults/components/playercomponents/createplayer.js?v=8
../../sportsresults/components/playercomponents/searchplayer.js?v=3
../../sportsresults/components/playercomponents/selectplayer.js?v=16
../../SportsResults/Components/WebService1.asmx/js
../../sportsresults/sportsresults.js?v=14
/DBF/DBFMaster.js?v=7
/DBF/v2-app.js
/DBF/v2-vendors.js
/ScriptResource.axd?d=pVV16iV_LgfBqFqBG-jFcc2_iYq4pi6tACHt8w5XELZat0Z_x3yBpQhRbxaJgNEhpX7KuYtEOGemhax4zgGWZVUE7LkUZU-IXmZPlBe9uQVd0a35qHmvOXrT2ndNHmwgtZvjqQYeqRb-WsLGp1YAraj19Uo1&t=ffffffffa5405632
/ScriptResource.axd?d=rNJl-2P05icAvdVDr4JYkS9ZCeMr3mVkTihEUlmrdVBzEQIzAHRlm_szvIpgDI6FGi9BrrKNFdKPRbBaOEe2q2HTGPeaoAgY4CjGSnJcdXm4PwoDC7lTn2VOUq0asYIPiMrp3Q2&t=ffffffffec54f2d7
/ScriptResource.axd?d=RQUZkaLkcj-2kVp4MxJ4Vrr2-kMNaI-A_qAzQCAjU6KwCop4gVzjeNEafjG8Owt3C0nxeGwBTiGoh_QQ4AAin4txTB3QQfza-AcRaE0UnvT_NPdZXbqGY5qt3sfxUkSxhjQfcDA_ALCoqWvwAxxnq3hgytg1&t=ffffffffa5405632
/ScriptResource.axd?d=Zla5mgB5Mph_4Jy-7vx-jJke-g14RaQ9quVC2G6hk0CL3ChCspGwj6dYo7yde6dkmv75doFYaOhwpoHM_PAvbBpoJAEuziVPzKVR7cfkQrQVc1YGINvJ9LaCnv-TYdi1rFVZZA2&t=ffffffffec54f2d7
/SportsResults/Classes/WebControls.js?v=6
/sportsresults/standalone/scripts/treeview.js?v=3
/WebResource.axd?d=511fvNyMrOe-i5YYZiiv_b9CErKKJE0NMl5mrMv23eYjNc7gnudt5jLX_b4AItOAZu7s_QeWBYRwIvqR6Uzjil_Mwsw1&t=639190905332169432
https://badminton.dk/wp-content/plugins/divi-image-helper/assets/js/script.min.js?ver=1.0.13
https://badminton.dk/wp-content/plugins/gtm-kit/assets/frontend/engagement-events.js?ver=2.20.2
https://badminton.dk/wp-content/themes/Divi/core/admin/js/common.js?ver=4.27.6
https://badminton.dk/wp-content/themes/Divi/includes/builder/feature/dynamic-assets/assets/js/easypiechart.js?ver=4.27.6
https://badminton.dk/wp-content/themes/Divi/includes/builder/feature/dynamic-assets/assets/js/jquery.fitvids.js?ver=4.27.6
https://badminton.dk/wp-content/themes/Divi/includes/builder/feature/dynamic-assets/assets/js/jquery.mobile.js?ver=4.27.6
https://badminton.dk/wp-content/themes/Divi/includes/builder/feature/dynamic-assets/assets/js/salvattore.js?ver=4.27.6
https://badminton.dk/wp-content/themes/Divi/includes/builder/feature/dynamic-assets/assets/js/sticky-elements.js?ver=4.27.6
https://badminton.dk/wp-content/themes/Divi/js/scripts.min.js?ver=4.27.6
https://badminton.dk/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.4.1
https://badminton.dk/wp-includes/js/jquery/jquery.min.js?ver=3.7.1
https://consent.cookiebot.com/uc.js
https://www.googletagmanager.com/gtag/js?id=UA-154233451-1
```

## 4. Felter i `SearchTournamentMatches`

Gemte matchresultater er HTML inde i `SearchRegistrationsResult.Html` (`reproduce-tournament-matches.txt`; status 200). Kampvisningen indeholder runde/fase, kampnummer, spillere (seed/placering, navn, spillerprofil-link og klub) samt sætresultat. Eventets disciplin kommer fra `GetTournamentEvents`-objektets `discipline`-felt (fx `MensSingles` for event 490920), ikke fra den enkelte kamp-række. `W.O.` forekommer som synlig resultatværdi i resultattabellen. Rækkernes felter er HTML-celler, ikke et identificeret typed JSON-skema.

Eksempel fra `statistik/results/158-turneringer.md`: kamp **294**, runde **Finale**; Jannick John Galan Mogensen (Jernløse, spiller-id `283536`) mod Alexandre Gimenez (EU) (Hvidovre, spiller-id `355953`), sæt `15/5, 15/7`. Begge spiller-id'er er til stede via `VisSpiller/#...`-links. De er offentlige spiller-id'er; om Badminton Danmark formelt kalder dette felt “BadmintonID” er **ukendt**. Disciplinen er herresingle ud fra event-id `490920`. Der findes også synlig W.O.-markering, men dette eksempel er en afsluttet kamp.

## 5. Overlapstest uden netværk

Det gemte turneringskamp-svar (`reproduce-tournament-matches.txt`, også beskrevet i `004-udtraeksvej.md`) er for klasse `115342`. Eventtabellerne indeholder 133 forskellige `VisResultater`-link-id'er; **0** matcher nogen af de identificerede ID'er i de gemte turneringssvar (`17558`, `115342`–`115345`, `490920`–`490924`). Der er dermed 0 overlap med gemte kampsvar og ingen sammenligning af eventrækker mod antal kampe for samme turnering. ID'erne `113413,` og `114741,` optræder i eventtabellerne, men de tilhørende gemte filer indeholder eventtabeller, ikke matchresultatsvar.

## 6. Forslag til Del B, C og D

### Del B — afgrænset netværksprøve (9 kald, højst 20)

Alle trin er forslag; ingen af dem blev udført i Del A. Send ét kald ad gangen med rolig takt fra kort 162. Stop ved 403/429, CAPTCHA-/samtykkekrav, uventet login eller uventet svarformat; ingen retries eller omgåelse i samme kørsel.

| Nr. | Metode og parametre | Forventet svar | Stopkriterium |
|---:|---|---|---|
| 1 | GET `/robots.txt` | Regler for den offentlige sti | Stop, hvis adgang til relevante stier frarådes eller svaret ikke kan læses. |
| 2 | GET `/SportsResults/Components/WebService1.asmx/js` | Proxydefinitioner inkl. `SearchTournamentClass` | Gem status/hash; stop ved blokering eller ændret/ukendt indhold. |
| 3 | GET `/sportsresults/components/tournamentcomponents/selecttournament.js?v=16` | Kald fra turneringsvælgeren | Gem status/hash; kald kun videre hvis 200. Caller til `SearchTournamentClass` er stadig ukendt. |
| 4 | GET kendt offentlig Ranglister-/turneringskontekst | Frisk callback-kontekst, hvis siden giver den | Stop ved botværn, CAPTCHA eller manglende kontekst; klik/omgå ikke. |
| 5 | `GetTournamentEvents(tournamentclassid=113340)` | Event-id'er, discipliner og turneringsinfo for Jyllinge U13 C | Forvent 200; stop hvis klasse ikke genkendes. |
| 6 | `SearchTournamentMatches(tournamentclassid=113340, tournamenteventid=<første event>, øvrige filtre=0)` | Kampe, spillere, klubber, runde, score | Stop ved fejl eller hvis event-id ikke stammer fra kald 5. |
| 7 | `GetTournamentEvents(tournamentclassid=114850)` | Event-id'er for Badminton Danmark U13 C VICTOR DMU | Som kald 5. |
| 8 | `SearchTournamentMatches(tournamentclassid=114850, tournamenteventid=<første event>, øvrige filtre=0)` | Kampresultater for valgt event | Som kald 6. |
| 9 | `GetTournamentEvents(tournamentclassid=111062)` | Event-id'er for Gladsaxe Søborg U13 A | Som kald 5. |
| 10 | `SearchTournamentMatches(tournamentclassid=111062, tournamenteventid=<første event>, øvrige filtre=0)` | Kampresultater for valgt event | Som kald 6. |

De tre valgte, observerede turneringer er:

| Turnering | Dato i eventtabellen | Link-id | GSB-profil | Rækker i eventtabeller |
|---|---|---|---|---:|
| Jyllinge U13 C | 28-09-2025 | `113340,` | Aanya Jha (`355801`) | 10 |
| Badminton Danmark U13 C VICTOR DMU, U11A*AB-U13CD | 29-03-2026 | `114850,` | Aanya Jha (`355801`) | 10 |
| Gladsaxe Søborg U13 A | 01-03-2026 | `111062,` | Benjamin Hinge Carlsson (`330650`) | 9 |

Hvert eksempel er verificeret i aggregerede eventrækker i JSON; dato er den registrerede eventdato. Planen er på 10 kald, stadig under loftet 20.

### Del C — komplet sæsonoversigt

Før en komplet oversigt kræves en fungerende og dokumenteret enumeration af klasser via `SearchTournamentClass` eller en anden offentlig kilde. De gemte 081-forsøg gav HTTP 500 i tre parameterkombinationer; derfor er komplet klasseliste og sæt af filterværdier fortsat **ukendt**. Når enumeration virker, skal klasser deduplikeres, sæson-/aldersgruppe-/regiondækning kontrolleres, og hver klasses `GetTournamentEvents`-liste gemmes. Eventuelle sider/paginering og historisk tilgængelighed skal afklares ved kilden.

### Del D — pointændring mod kampe

Der mangler en dokumenteret nøgle mellem eventrækkens spillerprofil, turneringsklasse, disciplin/event og kampene, samt pointmålinger før og efter hvert event i samme ranglistekategori. Der skal også håndteres flere kampe pr. event, double-partnere, W.O./afbud, manglende resultat og profilens dato/pointsemantik. Eventtabellen angiver spillerens point før eventet; den alene viser ikke hvilken kamp der ændrede pointene.

### Kaldoverslag

Udtrækket har 133 unikke `VisResultater`-link-id'er for de observerede GSB-profiler. Et rent minimum med én event pr. klasse er `133 GetTournamentEvents + 133 SearchTournamentMatches + 3` opstartskald = **269 kald**. Det er en nedre grænse, ikke et fuldt sæsonestimat: Jernløse-eksemplet `115342` har fem events, så en ren fem-events-pr-klasse-scenarie ville være `133 + 665 + 3 = 801 kald`. Det faktiske eventantal pr. klasse og komplet sæsonantal er **ukendt**; klasselistekald kan også komme oveni.

## Kontrol

- Netværkskald: **0**.
- Database-SHA-256: alle fem filer matcher opgavekortets forventede hashes (sammenlignet uden hensyn til store/små bogstaver).
- `git diff --check`: køres efter kortopdateringen.
- `git status --short statistik/data/`: tom ved slutkontrol.
- Metode/outputkontrol: 4.348 gzip-filer, 45 profil-svar, 20 unikke profiler, 738 deduplikerede rækker, 269 links (133 `VisResultater`, 136 `HoldTurnering`).
