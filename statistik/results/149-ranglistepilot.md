# Opgave 149 — ranglistepilot

## Konklusion

Piloten blev stoppet efter to offentlige GET-forespørgsler til `badmintonplayer.dk/DBF/Ranglister/`, før noget rangliste-API blev kaldt. Siden svarede HTTP 200 med titel “Ranglister” og en frisk `SR_CallbackContext`, men HTML’en indlæser Cookiebot med `data-blockingmode="auto"` og indeholder reCAPTCHA-konfiguration. Opgavekortet kræver stop ved cookie-/adgangsværn. Ingen consent blev accepteret, ingen CAPTCHA blev løst, og intet værn blev omgået.

Der er derfor ingen ny bekræftelse af, om `GetRankingListPlayers` kan hente samlede ranglister, ingen rækker at analysere, og ingen ny ID-koblingstest. Den tidligere lokale evidens er fortsat: `GetRankingListVersions` har tidligere returneret HTTP 200; de prøvede generiske `GetRankingListPlayers`-forespørgsler gav HTTP 500. Det er ikke genverificeret i denne pilot.

## Forespørgselslog

| Nr. | Forespørgsel | Status | Bytes | Svarhash | Udfald |
|---:|---|---:|---:|---|---|
| 1 | GET `https://badmintonplayer.dk/DBF/Ranglister/#288` | 200 | 21.846 | ikke målt | Første eksplorative svar; callback fundet. Ikke gemt, og hash blev ikke beregnet. Logmanglen er eksplicit bevaret i JSON. |
| 2 | GET `https://badmintonplayer.dk/DBF/Ranglister/#288` | 200 | 21.846 | `175d065b8343161bab39f5a0def199108ead2fe8022a2da71aa1de7c0a451cd0` | Side-shell blev gemt med kortlivet `SR_CallbackContext` redigeret. Cookiebot `data-blockingmode=auto` og reCAPTCHA-konfiguration konstateret; stop. |

Forbrugt: 2 af højst 30 forespørgsler, kun værten `badmintonplayer.dk`; de to kald var sekventielle med over 1,5 sekunds mellemrum. Ingen ASMX-/GraphQL-forespørgsler blev sendt.

## Uafklaret

- Om Cookiebot auto-blocking kræver aktivt samtykke for den offentlige ranglisteside, og om Chris ønsker at åbne siden manuelt og afklare det. Indtil da fortsættes netværkspiloten ikke.
- Om de samlede ranglister kan hentes via `GetRankingListPlayers`, herunder pagination og de præcise filtre.
- Felter/ID-type i ranglisteresponsen og kobling mod `national-spillere.db` eller `gsb-statistik-normalized.db`.
- Koblingstal for stikprøver på 20 modstandere og 20 GSB-spillere.
- Om versioner før august 2022 kan hentes.

## Lokale kilder og fortsættelsesplan

`call-ranking-versions.mjs`, `call-ranking-players.mjs`, `call-ranking-points.mjs`, `call-ranking-mix.mjs`, `API_RESEARCH.md` og `ranking-parameter-grid.txt` blev læst. De tidligere generic fuldlistekald fejlede HTTP 500; denne opgave nåede ikke at afprøve en ny request-body.

Hvis Chris afklarer værnet og ønsker fortsættelse, er næste minimum en ny offentlig sidekontekst og ét versionskald; kun derefter kan et konkret `GetRankingListPlayers`-kald vælges. Ingen fuld indsamling bør planlægges før første side virker og rækkerne indeholder identificerbare spillerfelter. En fremtidig fuld hentning vil kræve pagination, sekventiel takt, checkpoints og en separat database; kampkobling kræver samme stabile ID på rangliste- og kampsiden, ellers skal navn/klub-markeringer forblive uafklarede.

## Databaseværn

Alle fire databaser blev hashet før netværksforsøget; de stemte med kortets værdier. Efter forsøgene blev ingen database åbnet til skrivning eller ændret. Hashene står i `149-ranglistepilot.json`.
