# Plan for statistikdelen

Skrevet 2026-09-13 ud fra `statistik/RESUME_INSTRUCTIONS.txt`,
`statistik/RESEARCH_BACKLOG.md`, `results/CURRENT_VALIDATION_STATUS.md`,
`results/coverage-report.md`, `results/individual-coverage-gap-audit.md`,
`results/terra-action-items.md`, `results/VALIDATED_BROWSER_METHOD.md` og
`results/COMPLETE_RESULT_FALLBACK_METHOD.md`.

Statistik har førsteprioritet indtil Prod Push, jf. `AGENTS.md`. Denne fil
siger hvad der skal være sandt før hvert trin er passeret.

---

## Hvor vi står

2.818 deduplikerede holdkampe i SQLite, hvoraf 2.812 har dokumenteret
hjemmehold, udehold og holdresultat. 20.319 individuelle kategorier fordelt
på 2.367 af holdkampene. 67.196 spillerrelationer, 7.599 unikke spillere.
Ingen foreign-key-fejl eller ID-dubletter.

De dokumenterede huller er kendte og afgrænsede: 315 holdkampe med
holdresultat mangler individuelle rækker, 458 holdkampe afviger mellem
holdresultat og individuelle resultater, fire U09-kampe og to
corona-suspenderede kampe er blivende undtagelser.

Grundlaget er altså solidt. Det der mangler, er individuel dækning og
klassifikation — ikke at hente forfra.

---

## Den tekniske knude der skal løses først

`VALIDATED_BROWSER_METHOD.md` dokumenterer at Playwright med en frisk
kontekst ofte kun returnerer standardskallen på omkring 292 tegn. Det der
virkede, var Codex' egen in-app-browser. Oveni kunne den seneste kørsel
slet ikke starte Playwright (spawn EPERM).

Der er altså to forskellige problemer: ét miljømæssigt, som måske kun
gælder den sandkasse kørslen foregik i, og ét arkitektonisk, hvor siden
ikke initialiseres fuldt ud.

Men `RESEARCH_BACKLOG.md` beskriver et tredje spor: BadmintonPlayers
ASP.NET-webservicelag, hvor `SearchTournamentMatches` returnerer kamp- og
resultat-HTML direkte, når en frisk `SR_CallbackContext` først er hentet
fra sidens HTML. Det er hidtil kun afprøvet på turneringer.

**Hypotese:** kan det samme lag levere individuelle kampdata for
holdkampe, er der slet ikke brug for en browser til masseudtrækket. Det
ville løse begge problemer på én gang og være væsentligt hurtigere.

Hypotesen er billig at afprøve og bør afprøves **før** nogen bygger en
extractor. Det er opgave 004.

---

## Test & Validation

Trinnet er passeret når alt nedenstående er sandt.

**Individuel dækning er lukket.** Hver af de 2.818 holdkampe har enten
individuelle rækker eller en dokumenteret grund til ikke at have det. De
315 nuværende huller er allerede klassificeret som 257 payloads uden
kategorisektioner og 58 med kategorier uden scores, hvoraf 57 har
eksplicit no-play-tekst. Det der mangler, er at afgøre om de 257 kan
hentes ad en anden rute, eller om de er blivende huller.

**De 458 afvigelser er klassificeret efter evidens** i de fem kategorier
der allerede er navngivet i genoptagelsesinstruktionen: administrativ
bemærkning eller protest, Golden Set, manglende kategori, rå
resultatmarkør, og reel uoverensstemmelse. Klassifikation betyder at
evidensen er gemt ordret — ikke at årsagen er gættet.

**Spilleridentitet hviler på ID, ikke navn.** Spillere kobles via
BadmintonPlayer-links (`/DBF/Spiller/VisSpiller/#<playerId>`).
Navnematch alene er ikke en sikker identitet, jf. `terra-action-items.md`.

**Kampantal er holdt op mod stillingerne.** For hver sæson og pulje
sammenlignes antallet af kampe i databasen med kampantallet i den
officielle stilling. Afvigelser er forklarede eller dokumenterede.

**De blivende undtagelser står dokumenteret:** fire U09-kampe (505217,
505219, 506407, 506413) hvor API'et giver Internal Server Error og siden
ikke viser dynamisk detalje, og to corona-suspenderede (387862, 387864).
De skal ikke løses. De skal stå med URL, status og rå kilde.

**Ikke en del af dette trin:** U15 og yngre, turnerings- og
spillerprofil-sporet, historiske ranglistepoint. Alt det er
Videreudvikling.

---

## Results

Trinnet er passeret når grundessensen kan aflæses uden at åbne databasen.

Konkret en rapport der for hver sæson viser klubbens hold, kampe, vundne
og tabte, og for hver spiller antal kampe og vinderprocent fordelt på
kategori. Plus en oversigt over hvad der mangler og hvorfor, så tallenes
pålidelighed kan vurderes af den der læser dem.

Formatet er sekundært. Kravet er at et menneske kan se hvad data siger,
og hvor sikkert det er.

---

## Preview

En side i webappen der viser statistikken med spillerfiltre.

Beslutningen om at denne først bygges når dækningen er lukket, står
allerede i `terra-action-items.md` og fastholdes. Grunden er at en
brugerflade bygget på ufuldstændige tal skaber tillid til noget der ikke
er færdigt.

---

## Prod Push

Siden er live på gsbmore.netlify.app sammen med resten af appen.

---

## Skillen

`CURRENT_VALIDATION_STATUS.md` nævner allerede en senere skill, og
`COMPLETE_RESULT_FALLBACK_METHOD.md` er råmaterialet til den.

**Den skrives når Test & Validation lukker, ikke før.** Metoden har lige
nu et uløst kerneproblem — hvilken rute der overhovedet virker til
masseudtræk. Skrives skillen nu, indkodes problemet. Skrives den bagefter,
indkodes løsningen, og så er den præcis det der gør næste sæson billig.

Den skal indeholde render-gaten, idempotens-mønstret med én fil per kamp,
reglen om at walkover kræver eksplicit `(Ikke fremmødt)`-tekst, og
princippet om at rå data gemmes før fortolkning.

---

## Rækkefølge

1. **004 — afklar udtræksvejen.** Virker Playwright uden for sandkassen,
   og kan webservicelaget levere individuelle kampdata? Svaret bestemmer
   hvordan extractoren bygges.
2. **Byg den individuelle extractor** med render-gate, valideret mod fem
   til ti referencekampe manuelt før masseudtræk.
3. **Klassificér de 458 afvigelser.** Analysearbejde, ikke udtræk — kan
   køre parallelt med punkt 2.
4. **Kobl spiller-ID'er.**
5. **Stillingskontrol:** kampantal per sæson og pulje mod officielle
   stillinger.
6. **Results-rapporten.**
7. **Skillen.**
8. Preview, derefter Prod Push.

---

## Arbejdsprincipper fra statistikprojektet

Disse står i `RESUME_INSTRUCTIONS.txt` og gælder uændret:

Evidens før fortolkning. Ingen gæt uden tydelig mærkning, helst ingen gæt
overhovedet. Rå API- og browserdata bevares. En fejl i én kamp eller rute
skal logges og må ikke stoppe hele testserien. Statusændringer skal kunne
spores i git og i procesloggen.

Hver ny test dokumenteres i `statistik/TEST_RUN_LOG.md`, og
`results/CURRENT_VALIDATION_STATUS.md` opdateres når status ændrer sig.
