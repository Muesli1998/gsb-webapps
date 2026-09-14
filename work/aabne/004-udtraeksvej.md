# Opgave 004 — afklar hvilken udtræksvej der skal bygges på

**Trin:** Test & Validation

Dette er en **undersøgelse**, ikke en byggeopgave. Resultatet er en
anbefaling, ikke en extractor. Byg ikke masseudtrækket i denne opgave —
svaret her bestemmer hvordan det skal bygges, og det ville være spild at
bygge først.

---

## Mål

Afgøre hvilken teknisk rute det individuelle masseudtræk skal hvile på,
og skrive anbefalingen ind i `docs/statistik-plan.md`.

## Baggrund

`statistik/results/VALIDATED_BROWSER_METHOD.md` dokumenterer at Playwright
med en frisk persistent kontekst ofte kun returnerede standardskallen på
cirka 292 tegn for den samme hash-URL der virkede i Codex' in-app-browser.
Den seneste kørsel kunne desuden slet ikke starte Playwright (spawn EPERM).

Der er dermed to adskilte spørgsmål, og et tredje spor der måske gør dem
irrelevante.

## Tre spørgsmål der skal besvares

**A. Er EPERM et miljøproblem?**
Kør en minimal Playwright-start direkte på maskinen, uden for nogen
sandkasse. Virker den, var fejlen et artefakt af kørselsmiljøet og ikke et
reelt problem.

**B. Kan Playwright overhovedet rendere siden fuldt ud?**
Hvis Playwright starter: åbn referencekampen fra metodedokumentet,
`337416` (sæson 2018, pulje 11355), og afgør om den renderede tekst
indeholder både kamp-ID og en linje der starter med `Resultat` — altså om
render-gaten fra `COMPLETE_RESULT_FALLBACK_METHOD.md` kan passeres.
Gem den rå tekst som evidens uanset udfald.

**C. Kan webservicelaget levere holdkampdata uden browser?**
`statistik/RESEARCH_BACKLOG.md` dokumenterer BadmintonPlayers
ASP.NET-webservicelag, hvor `SearchTournamentMatches` returnerer kamp- og
resultat-HTML når en frisk `SR_CallbackContext` først er hentet fra sidens
HTML. Det er hidtil kun afprøvet på turneringer (reference: turnering
`115342`, events `490920`–`490924`).

Undersøg om det samme lag — eller et tilsvarende kald — kan levere
individuelle kampopstillinger for en **holdkamp**. Brug kamp `337416` som
reference, så resultatet kan holdes op mod den kendte, validerede side.

Lykkes det, er der ingen browser nødvendig til masseudtrækket, og både A
og B bliver ligegyldige.

## Afgrænsning

**Må røres:** `statistik/` — nye probe-scripts, nye filer under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`, og
`docs/statistik-plan.md` (kun afsnittet om udtræksvejen).

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave må ikke
skrive til SQLite overhovedet. Heller ikke `docs/historik/`,
`apps/netlify-prod/` eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "udtraeksvej\|route-decision"
```

Skal give mindst én ny evidensfil.

```
grep -c "004" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1 — kørslen skal være dokumenteret i procesloggen.

```
grep -c "Anbefalet udtræksvej" docs/statistik-plan.md
```

Skal være 1 efter opgaven.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom. Databasen må ikke ændres.

```
node scripts/check-normalized-db.mjs
```

Skal give samme resultat som før opgaven. Kør den først og gem outputtet.

```
git diff --stat main..arbejde/004-udtraeksvej
```

Må ikke vise ændringer i `apps/`, `kampsystem/`, `docs/historik/` eller
`data/`.

**Skøn:**

- Anbefalingen er begrundet i evidens fra kørslerne, ikke i formodning.
- Hvis ingen af de tre spor virker, står det som konklusion frem for at
  blive dækket over. Et dokumenteret nej er et brugbart resultat.

## Ved tvivl

Virker webservicevejen delvist — fx kun for nogle sæsoner eller kun for
seniorrækker — så skriv præcis hvor grænsen går frem for at konkludere
enten eller. Delvis dækning kan sagtens være den rigtige vej for
størstedelen, med browseren som fallback for resten.

Gem `SR_CallbackContext` kun i runtime. Den må aldrig hardkodes eller
committes, jf. `RESEARCH_BACKLOG.md`.

## Gren

`arbejde/004-udtraeksvej`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Svar på A (EPERM):**

**Svar på B (Playwright-render):**

**Svar på C (webservicelaget):**

**Anbefalet udtræksvej og begrundelse:**

**Hvad blev fravalgt og hvorfor:**

**Commits:**
