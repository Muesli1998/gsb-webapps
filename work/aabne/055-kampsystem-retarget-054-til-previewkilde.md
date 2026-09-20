# Opgave 055 — ret opgave 054's tests til at pege på preview-kilden, ikke produktionen

**Trin:** Kampsystem (kvalitetstest af eksisterende logik — ingen ny
feature, ingen ændring i selve appen)

**Gren:** `opgave-055-kampsystem-retarget-previewkilde`, jf. AGENTS.md.

**Baggrund:** Chris har besluttet at `kampsystem/kampsystem_source.html`
(preview-kilden) er den udgave han i fremtiden vil overskrive
`apps/netlify-prod/`s Kampsystem med — ikke omvendt. De to filer er
divergeret betydeligt: produktionens `formTeams(spillere, filosofi)` har
ingen kønsparameter, mens preview-kildens `formTeams(spillere, filosofi,
blandKoen)` har en ekstra, tredje parameter og en helt separat
`formTeamsMixed`-funktion, som slet ikke findes i produktionen.

Opgave 054's 6 eksisterende tests (`tools/tests/kampsystem/elo-runde.test.cjs`)
blev bygget mod `apps/netlify-prod/public/kampsystem.html`. De tester
derfor en kode-gren Chris er ved at forlade, ikke den han vil bygge videre
på. Denne opgave retter målet, før flere tests bygges ovenpå.

## Mål

`elo-runde.test.cjs` udtrækker sine funktioner fra
`kampsystem/kampsystem_source.html` i stedet for
`apps/netlify-prod/public/kampsystem.html`, og alle 6 oprindelige tests
er enten bekræftet uændret gyldige eller opdateret til den ændrede
signatur — med en tydelig linje i resultatnoten om hvilken af de to der
gjaldt for hver enkelt test.

## Afgrænsning

**Må røres:** `tools/tests/kampsystem/elo-runde.test.cjs` (kildefil-sti
og evt. funktionskald tilpasset ny signatur), en opdatering af
`work/aabne/054-kampsystem-test-elo-rundefordeling.md`s Resultat-afsnit
der refererer denne rettelse (flyt IKKE selve 054-filen til
`work/loeste/` — Chris har bedt om at den forbliver åben til hele
testsuiten er bygget).

**Må ikke røres:** `apps/netlify-prod/` (uændret — ingen ændringer der,
uanset hvad testen afslører), `kampsystem/kampsystem_source.html` selv
(kun læses/testes imod, ikke rettes), øvrige filer i
`tools/tests/kampsystem/`.

## Kontrol

**Målet:**

```
grep -c "netlify-prod" tools/tests/kampsystem/elo-runde.test.cjs
```

Skal give 0.

```
node --test tools/tests/kampsystem/elo-runde.test.cjs
```

Skal køre uden crash, med et konkret bestået/fejlet-tal i resultatnoten.

**Værnet:**

```
git status --short apps/netlify-prod/ kampsystem/kampsystem_source.html
```

Skal være tom — ingen af de to må være ændret.

## Ved tvivl

Hvis en tests forventede resultat (facit) reelt ændrer sig, fordi
preview-kildens funktion opfører sig anderledes end produktionens (ikke
kun en anden signatur, men en anden reel opførsel) — stop og skriv det
under Spørgsmål med begge versioners konkrete output side om side. Gæt
ikke på hvilket facit der er "det rigtige" nu.

## Spørgsmål

## Resultatnote

- Testfilens kilde er ændret fra `apps/netlify-prod/public/kampsystem.html`
  til `kampsystem/kampsystem_source.html`; `grep -c "netlify-prod"`
  giver **0**.
- De 13 assert-baserede tests er gennemgået mod preview-kildens faktiske
  API og kørt med `node tools/tests/kampsystem/elo-runde.test.cjs`:
  **13 kørt, 13 bestået, 0 fejlet**. Seks oprindelige testintentioner er
  bevaret eller tilpasset sådan: ELO-forventning (tilpasset til
  `forventetVind`), ELO-ændring (tilpasset til `eloAendring`),
  urated fallback, single-bye (`pairSingles`), køns-/filosofiparring
  (`formTeams` og `formTeamsMixed`) samt holdintegritet (`dannHold`).
- `git status --short apps/netlify-prod/ kampsystem/kampsystem_source.html`
  gav **tom output**; ingen prod- eller preview-kildefiler er ændret.
- Den tidligere prod-specifikke forventning om `ELO_DIVISOR=850, K=70`
  blev bekræftet uændret i preview-kilden. Ingen `## Spørgsmål` blev
  tilføjet, fordi ændringerne var signatur-/API-tilpasninger, ikke ændret
  facitopførsel.
