# Opgave 010 — migrér code review af analyse.js til repoet

**Trin:** Test & Validation

---

## Mål

`gsb-analyse-js-code-review-2026-09-06.md` findes i git-repoet, ikke kun
i claude.ai-projektet. Indholdet er uændret ved migreringen.

## Kontekst

Filen er en fokuseret code review af `netlify/functions/analyse.js` —
den fil der driver den **live** statistikside (`analyse.html`), baseret
på Google Sheets-data (`Spillerpoint`, `Resultater`). Det er **ikke**
det samme system som det nye SQLite-baserede statistikprojekt i
`statistik/`, som resten af opgavekøen handler om — dette er en
allerede shippet, separat del af Dream Team-appen.

Reviewet fandt tolv fund (F1-F12). Flere er markeret høj alvor/høj
sandsynlighed — særligt F1, som beskriver at en walkover-kamp kan blive
registreret med forkert vinder i produktion, stille og uden fejl, "så
snart en walkover importeres uden manuel rettelse". Reviewet selv har et
eksplicit forbehold: den gennemgåede kopi af `analyse.js` i projektet
var fra 2026-08-30 og manglede en mekanisme der siden er tilføjet direkte
i produktion — flere fund bør derfor verificeres mod den faktiske
prod-fil, før noget rettes. Det er en advarsel i selve dokumentet, ikke
noget der skal rettes ved migreringen.

**Dette er ren migrering af eksisterende analyse — ingen rettelser
udføres i denne opgave**, og fejlene i F1-F12 rettes ikke her. De
findes i produktionskode (`netlify-tool-prod`), ikke i statistik-sporet,
og hører derfor ikke under statistikprioriteten — de venter i idébanken
til Christoffer beslutter at tage fat på dem.

**Fuldt indhold til flytning er vedhæftet i chatten, som en separat
fil.** Kopiér det ordret.

## Afgrænsning

**Må røres:** ny fil, fx `docs/analyse-js-code-review-2026-09-06.md`
(se "Ved tvivl" for placeringsvalg).

**Må ikke røres:** alt andet, herunder `netlify/functions/analyse.js`
selv — denne opgave retter intet i produktionskoden.

## Kontrol

**Målet:**

```
test -f docs/analyse-js-code-review-2026-09-06.md && grep -c "^## F" docs/analyse-js-code-review-2026-09-06.md
```

Filen skal findes, og der skal være 12 overskrifter der matcher
mønstret `## F<tal>` (F1 til F12).

```
git diff --stat main..arbejde/010-migrer-analyse-js-code-review
```

Skal vise **præcis én ny fil**, intet andet.

**Værnene:**

```
git status --short statistik/data/ netlify/functions/
```

Skal begge være tomme.

**Skøn:**

- Indholdet er identisk med kildefilen — ingen forkortelser, ingen
  "oprydning" undervejs.

## Ved tvivl

Filen kan lige så godt hedde noget der matcher `docs/historik/`s
navngivning, hvis det virker mere rigtigt — men fundene er stadig
**uafklarede** (ikke rettet, ikke afvist), så den hører nok bedre til
som aktiv reference i `docs/` end som afsluttet historik. Vælg selv,
og skriv hvilket i resultatnoten.

## Gren

`arbejde/010-migrer-analyse-js-code-review`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
Før: begge stier fandtes; indholdet afveg kun i to roadmap-henvisninger.
Efter: kun docs/analyse-js-code-review-2026-09-06.md findes.
```

**Placering valgt:**

`docs/analyse-js-code-review-2026-09-06.md`.

**Sammenlignede stier:**

- `docs/historik/analyse-js-code-review-2026-09-06.md`
- `docs/analyse-js-code-review-2026-09-06.md`

**Afgørelse:**

Dedupliceret. Den oprindelige fil er flyttet med Git til den aktive
placering, og de to opdaterede roadmap-henvisninger er bevaret: F1 peger
på roadmap-punkt 2, “Walkover-håndtering”, i stedet for punkt 1. Aktive
henvisninger er omdirigeret til den beholdte sti.

**Commits:**
`fffcce4`, `e6cbdf4` — erstattet ved amend med resultatnoten udfyldt.
`fffcce4`, `e2631b8` — deduplikering og afsluttende referenceopdatering.
