# Aktuel valideringsstatus

Dato: 2026-09-13

## Datagrundlag

- 2.818 deduplikerede GSB-holdkampe i SQLite.
- 2.812/2.818 har dokumenteret hjemmehold, udehold og holdresultat. De resterende seks er de to eksplicit corona-suspenderede og fire U09-sider, der ikke viser dynamisk kampdetalje.
- 2.682 rækker er `browser_verified`; 85 er `browser_verified_no_result` med eksplicit resultatværdi `-`; 47 er `corona_suspended`.
- 1.440/1.444 fallback-køposter er verificeret; 2 er corona-suspenderede og 2 er U09 uden dynamisk detalje.
- 126 rækker har walkovertekst i SQLite; 57 køposter har dokumenteret walkovervinder. `Vinder W.O.` alene tælles ikke.
- 736 standingsrækker er gemt; 96 GSB-stillingsrækker er fundet i den aktuelle stillingssamling.

## Resterende dokumenterede huller

- **4 U09-kampe:** 505217, 505219, 506407, 506413. API giver Internal Server Error, og standard browser-URL viser ingen dynamisk detalje. De er bevaret med URL og status.
- **2 corona-suspenderede:** 387862 og 387864. De skal ikke behandles som tekniske fejl; siderne har ingen spillet resultat.
- Individuelle kampopstillinger er endnu ikke komplet parseret for alle 2.818 holdkampe. De eksisterende 56 retrypayloads gav 11 fulde individuelle detaljer og 45 corona-/resultat-minus-sider; ungdomspayloads indeholder yderligere rå spillertekst, der kræver separat normalisering.

## Valideringskontroller

- Ingen ID-dubletter.
- Ingen foreign-key-fejl.
- Status og faktisk felt-dækning måles separat.
- Standardrute og legacy-rute prøves før en kamp klassificeres som manglende detalje.
- Alle rå dynamiske payloads og fejl gemmes lokalt, før synkronisering.

## Reproducerbare scripts

- `run-youth-browser-fallback.mjs`
- `rerun-browser-field-gaps.mjs`
- `run-complete-result-fallback.mjs`
- `sync-browser-field-gaps.mjs`
- `sync-legacy-route-probe.mjs`
- `run-api-gap-audit.mjs`
- `run-data-quality-check.mjs`

Metodedetaljer til en senere skill står i `COMPLETE_RESULT_FALLBACK_METHOD.md`; procesloggen står i `TEST_RUN_LOG.md`.


## Individuelle kampe – seneste synkronisering

- 20.319 individuelle kategorier er nu gemt for 2.367 af de 2.818 holdkampe.
- 67.196 spillerrelationer og 7.599 unikke spillernavne er gemt.
- 6.103 browserkategorier blev tilføjet efter en score-dry-run uden konflikter mod API-rækkerne.
- 138 Golden Set-sektioner blev fundet; 133 har scores og er gemt som egne kategorier.
- 8 kategorier har 0-0-sæt med rå resultatmarkør. De er markeret browser_zero_score og skal ikke tælles som almindelige spillede sæt.
- 315 holdkampe med et holdresultat mangler fortsat individuelle kategorier. De er næste dækningshul.
- Ingen ID- eller foreign-key-fejl efter importen.

## Individuelle dækningshuller

- 315 holdkampe har registreret holdresultat, men ingen individuelle SQLite-rækker.
- 257 gemte payloads har ingen kategorisektioner.
- 58 payloads har kategorier uden scores; 57 har eksplicit no-play-/walkovertekst.
- Kamp 340495 er den eneste række i denne gruppe uden eksplicit no-play-/walkovertekst. Dens **individuelle** kategoriscores er derfor fortsat et dokumenteret dækningshul, men kampens **holdresultat** er ikke uafklaret: den ordrette Bemærkning siger, at resultatet blev ændret efter en protestkendelse.
- Ingen af de 315 gaps indeholder scorede kategorier, som importøren har undladt at importere.

## Bemærkninger og afgørelser

- 80 holdkampe har nu ordret Bemærkning gemt i team_matches.remark_raw.
- De fire individuelle gaps med Bemærkning er 340495, 429571, 429790 og 446325; de er dokumenteret i gap-auditen.
- 340495 er en protestafgørelse: Bemærkningen er ordret "Resultatet ændret jf. kendelse i protest. Kurt Mehlsen 10.03.2019". Det forener de to fund: afgørelsen forklarer holdresultatet 0-6 (0-3 point), mens de seks individuelle kategorier stadig mangler scores i den gemte browserpayload.

## Alternativ ruteprøve

- 16 repræsentative gap-kampe er klar til fem fragmentvarianter.
- Denne runtime kunne ikke starte Playwright (spawn EPERM); forsøget er gemt og ændrede ikke databasen.
- De gemte browserpayloads bruges derfor fortsat som evidens, indtil browserkørslen kan gentages.

## Seneste synkroniseringsaudit: holdresultat vs. individuelle resultater

- 2.367 af 2.818 holdkampe har individuelle rækker og er sammenlignet.
- 1.909 matcher holdresultatets vinderantal nøjagtigt; 458 afviger.
- 313 afvigelser indeholder mindst én uafklaret kategori. 121 Golden Sets er medtaget, når de passer med holdresultatets samlede kampantal.
- 39 afvigelser har en gemt `Bemærkning`; 18 er afvigelser uden uafklarede kategorier. Disse skal gennemgås som audit-kandidater og må ikke automatisk omskrives.
- Rå kategori-markører gemmes i `individual_matches.result_marker_raw`, men deres betydning er ikke fastslået og bliver ikke gættet.
- Detaljer og sæsonfordeling: `results/team-vs-individual-result-audit.md` og `.json`.
- Næste genoptagelsespunkt er at klassificere afvigelserne efter evidens (administrativ bemærkning, Golden Set, manglende kategori, markeret 0-0) og derefter genkøre browser-ruteprøven, når runtime kan starte Playwright.
