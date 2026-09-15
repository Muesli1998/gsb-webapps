# Opgave 033 — mål ungdomsdækning og forbered scope-beslutning

**Trin:** Test & Validation (ny delmængde: ungdom, U15 og yngre)

**Besluttet af Chris 2026-09-15:** ungdom skal ind i `statistik/`-projektets
scope. Afgrænsningen "U15 og yngre er udskudt" i `docs/statistik-plan.md`
var bevidst, fordi der var mange usikkerheder i de første tests — særligt
på ungdomsområdet — ikke fordi ungdom var arkitektonisk udelukket. B3
"Klubstatistik" har allerede landet ungdom, senior og veteran samlet (se
`docs/idebank-statistik.md` linje ~448-452), og klub-ID-kæden har bevist at
alle klubbens holdkampe inkl. U9-U19 kan hentes uden login. Denne opgave er
første skridt: mål hvor meget ungdomsdata der faktisk er der, før noget
besluttes om hvordan og hvornår.

---

## Mål

En scopingopgave, samme type som opgave 004 var for udtræksvejen: afklar
hvor meget ungdomsdata (U15 og yngre) der allerede findes i
`statistik/data/gsb-statistik-normalized.db`, og hvor meget der mangler,
som grundlag for en eksplicit scope-beslutning.

Konkret:
1. Kvantificér: antal ungdomsholdkampe i databasen, fordelt på årgang
   (U9/U11/U13/U15) og sæson. Hvor mange har individuelle rækker, hvor
   mange mangler dem (samme klassifikation som senior: dokumenteret
   `browser_verified_no_result`/`corona_suspended`/ægte hul).
2. Estimér dækningsgraden: hold databasens ungdomskampantal op mod hvad
   klub-ID-kæden (`badmintonPlayerTeams` → `badmintonPlayerTeamFights` →
   `badmintonPlayerTeamMatch`) reelt kan finde for klubben, for at se
   størrelsen af hullet — ikke kun hvad der allerede er importeret.
3. Kør de samme fem Test & Validation-kriterier fra `docs/statistik-plan.md`
   igen, men for ungdomsdelmængden alene (individuel dækning, 458-agtig
   afvigelsesklassifikation hvis relevant, spilleridentitet, stillingskontrol,
   blivende undtagelser).
4. Skriv resultatet op med tal, ikke vurderinger — som resten af
   statistik-opgaverne.

## Kontekst

**Hvorfor nu:** Test & Validation for senior lukkede 2026-09-15 (alle fem
kriterier opfyldt, se `docs/statistik-plan.md`). Chris har efterfølgende
besluttet at udvide scope til ungdom, fremfor at vente til efter Prod Push
som "Videreudvikling".

**Kendt signal om ungdomsdata:** Opgave 032 (`statistik/results/032-spiller-navnematch-risiko.md`)
fandt undervejs i en anden undersøgelse rigtige U09/U13/U15-holdkampe og
individuelle kategorier med fuld struktur — men målte ikke omfanget. De 7
oprindeligt mistænkte navnekollisioner i den opgave lå alle i
ungdomsrækker og blev afkræftet ved at rækketypen (`league_raw`/`name_raw`)
adskilte dem — se næste punkt.

**Vigtig lære fra opgave 032, runde 2 vs. runde 3:** samme-dags
multi-kamptype er udbredt i ungdom (en spiller kan have kampe i flere
rækker samme dag — normal praksis, ikke en fejl). Ethvert nyt script i
denne opgave der sammenligner på tværs af hold/datoer for ungdom SKAL fra
start inkludere `competitions.league_raw`/`name_raw` i sammenligningen.
Et tjek uden rækketype gav 7 falske positive i runde 2; med rækketype gav
samme tjek 0 i runde 3.

**Baggrund for B3:** `docs/idebank-statistik.md` (~linje 198-244 og
448-452) — "Adskil Dream Team-statistik fra generel GSB-klubstatistik
(inkl. ungdom)" og "Ungdomsstatistik-app"-idéen, begge landet som en del af
B3 i `docs/planlagte-features-spec.md`. Bemærk at DENNE opgave handler om
`statistik/`-projektets egen SQLite-database (Nembadminton-udtræk), ikke om
B3's oprindeligt planlagte Google Sheets/`AlleResultater`-spor — det er
`statistik-plan.md`s Preview-afsnit der allerede har afklaret at B3's
design genbruges, men med denne database som backend.

## Afgrænsning

**Må røres:** nye scripts i `statistik/scripts/` eller `statistik/`
(navngiv med opgavenummer, fx `033-ungdom-scope.mjs`), en ny resultatfil
`statistik/results/033-ungdom-scope-maaling.md` (+ evt. `.json` med rå
tal), `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` må læses, ikke skrives — dette er
en målingsopgave, ikke en importopgave. Ingen ændringer i
`docs/statistik-plan.md` eller `docs/BESLUTNINGER.md` i denne omgang — det
er opgave 034 (se "Næste skridt"). Rør ikke senior-klassifikationen eller
noget i den lukkede Test & Validation for senior.

## Kontrol

**Målet:** et talsæt der findes ét sted — ungdomsholdkampe i databasen
(total, fordelt på årgang/sæson), andel med individuelle rækker, og et
estimat for hvor mange flere der findes hos Nembadminton men ikke i
databasen endnu.

**Værnet:** senior-tallene i `docs/statistik-plan.md` ("Hvor vi står":
2.818 holdkampe, 20.319 individuelle kategorier osv.) skal være uændrede
efter denne opgave — dette er en læse- og målingsopgave for ungdom, ikke en
ny import.

**Resultatnoten skal angive tal, ikke vurderinger** — jf. AGENTS.md.

## Næste skridt (efter denne opgave, ikke en del af den)

En opfølgende opgave (034) skriver den eksplicitte scope-beslutning ind i
`docs/statistik-plan.md` og `docs/BESLUTNINGER.md`: hvornår og hvordan
ungdom går ind i planen, herunder om det sker før eller efter Preview for
senior. Den beslutning tages på baggrund af tallene fra denne opgave, ikke
før.

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/` med tal, jf.
AGENTS.md's krav om resultatnoter som kommandoer/tal, ikke påstande.)*
