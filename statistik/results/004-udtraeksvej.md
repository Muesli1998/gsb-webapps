# Opgave 004 — ruteafgørelse for individuelle holdkampresultater

## Evidens

### A. Playwright-start

`npm exec` kunne hente Playwright, og efter lokal installation uden
`package.json` eller lockfil kunne en isoleret Chromium-start gennemføres:
`PLAYWRIGHT_LAUNCHED`. Den tidligere `spawn EPERM` var derfor ikke en
generel blokering på denne maskine.

### B. Render-gate for kamp 337416

En ny headless Playwright-kontekst åbnede den dokumenterede hash-URL for
kamp 337416 og ventede 3,5–5 sekunder. Begge forsøg returnerede kun
cookie-/standardskallen (875 tegn), uden kamp-ID og uden en linje der
starter med `Resultat`. Et klikforsøg på "Kun nødvendige cookies" ændrede
ikke resultatet. Render-gaten fejler derfor i en frisk lokal kontekst.

### C. ASP.NET-webservicelag

En frisk `SR_CallbackContext` fra `/DBF/Turnering/VisResultater/` gav
HTTP 200 fra både `GetTournamentEvents` (4.171 tegn) og
`SearchTournamentMatches` (55.238 tegn) for turnering 115342/event 490920.
Klientproxyen for `WebService1.asmx` eksponerer kun
`SearchTournamentResults` og `SearchTournamentMatches` blandt resultatorienterede
metoder; ingen holdturnerings-/holdkampmetode blev fundet. Dette beviser
turneringsruten, men ikke en browserfri rute til kamp 337416.

## Anbefalet udtræksvej

**Byg ikke masseextractoren endnu.** Brug den allerede validerede in-app-
browsermetode som manuel fallback for enkeltkampe. En automatisk extractor
må først bygges, når enten en dokumenteret holdkamp-webservicemetode er
fundet, eller Playwright kan reproducere den fulde sideinitialisering og
passere render-gaten i en frisk, automatiseret kontekst.

Det er et dokumenteret nej til de tre afprøvede veje i denne opgave; det
er ikke en påstand om at ingen mulig rute findes.
