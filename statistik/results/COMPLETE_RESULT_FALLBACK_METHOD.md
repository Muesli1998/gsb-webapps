# Genbrugelig browser-fallback til holdkampresultater

## Formål

At hente kampfelter, når Nembadminton-resultatet kun giver en API-fejl eller den normaliserede række mangler resultatfelter. Metoden gælder for holdkampe på BadmintonPlayer og kan genbruges for senior- og ungdomsrækker.

## Kilde og URL

Kilden er den dynamisk renderede BadmintonPlayer-side. URL-formatet er:

`https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,{season},{leagueGroupId},1,8,,{matchId},1093,`

Hvis `leagueGroupId` ikke findes i den normaliserede række, kan feltet stå tomt i første forsøg; match-ID'et er stadig den primære identifikator.

## Render-gate

En side må kun markeres som dynamisk kampdetalje, når den renderede accessibility-/bodytekst både indeholder det forventede kamp-ID og en linje, der starter med `Resultat`. En standardshell, en tom side eller en side uden disse to signaler må ikke importeres som kampdata.

## Felter der udtrækkes

Fra den renderede tekst udtrækkes label-felter ved at finde linjer, der starter med `Hjemmehold`, `Udehold`, `Resultat` og `Point`; værdien ligger efter labelen eller på næste linje. Den rå tekst gemmes altid sammen med sæson, pulje, kamp-ID, URL og tidspunkt.

Walkover kræver en eksplicit `(Ikke fremmødt)`-tekst. `Vinder W.O.` er en kolonneoverskrift og er ikke alene evidens for walkover. Ved en numerisk holdscore kan vinderholdet udledes direkte af den viste hjemme/ude-score og gemmes sammen med den rå walkovertekst.

## Genoptagelse og idempotens

Kørselen skriver én JSON-fil pr. kamp efter hver side og opdaterer køen efter hver kamp. En ny kørsel springer allerede genverificerede filer over. Det gør langvarige browserkørsler genoptagelige efter afbrydelse.

## Synkronisering

Browserpayloads importeres først efter kørslen med en særskilt parser. Felter udfyldes med `COALESCE`, så en dokumenteret browserværdi ikke overskrives af tom API-data. Status og kilde gemmes separat fra faktisk feltdækning. Corona-status skal genoprettes efter generiske browser-synkroniseringer, så den ikke utilsigtet ændres til `browser_verified`.

## Kontroller efter kørsel

1. Tæl dynamiske detaljer, sider uden detalje og browserfejl.
2. Kør felt-audit for resultat, hjemmehold, udehold og point.
3. Kør foreign-key- og dubletkontrol på SQLite.
4. Sammenlign kampantal med officielle puljestillinger.
5. Rapportér statuskategorier separat: `browser_verified`, `browser_verified_no_result`, `api_error`, `corona_suspended` og eventuelle ungdoms-/renderfejl.

## Aktuel kørsel

`scripts/run-complete-result-fallback.mjs` gennemgår de 1.374 `complete`-rækker uden resultat. Output gemmes i `results/browser-fallback-complete/`. Efter færdig kørsel bruges `scripts/sync-browser-field-gaps.mjs` til feltimport, hvorefter alle audits regenereres.

## Begrænsninger

- Dynamisk detalje beviser, at siden viser data på køretidspunktet; det beviser ikke, at alle historiske formater er ens.
- To kendte U09-kampe og eventuelle nye standardshell-sider skal stå som særskilte undtagelser.
- Individuelle kampopstillinger kræver en separat parser; holdresultatets tilstedeværelse er ikke det samme som fuld spillerdata.
