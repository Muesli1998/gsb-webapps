# Opgave NNN — kort titel

Kopiér denne fil til `work/aabne/NNN-kort-navn.md` og udfyld den.
Når opgaven er løst, flyttes filen til `work/loeste/` med kontroloutput
og resultatnote udfyldt nederst.

Skabelonen er til opgaver der **gives videre** til en anden — en Codex-
session, en Claude-session, eller dig selv om tre uger. Små rettelser du
selv laver med det samme, skal ikke have en opgavefil; så er ceremonien
dyrere end arbejdet.

**Trin:** Test & Validation / Results / Preview / Prod Push
(streg de uaktuelle, se `AGENTS.md`)

---

## Mål

Én sætning om hvilket **resultat** der ønskes. Ikke hvilke skridt der skal
tages — den der løser opgaven, ved bedre end dig hvilke skridt der skal til.

## Afgrænsning

**Må røres:** hvilke mapper og filer.

**Må ikke røres:** de øvrige. Nævn særligt `docs/historik/` og Dropbox'
`_arkiv\`, som beskriver fortiden korrekt og ikke skal "rettes".

## Kontekst

Kun det der er nødvendigt for netop denne opgave, konkret og med filnavne.
Ikke "læs hele repoet" — det er dyrt og upræcist. Er noget forældet eller
upålideligt, så sig det her.

## Kontrol

Kommandoer, ikke påstande. Kør dem **før** du går i gang, så du har et
udgangspunkt, og **efter**, og skriv begge tal i resultatnoten.

**Målet — hvad skal blive sandt:**

```
(kommando)        forventet efter: (tal)
```

**Værnet — hvad må ikke ændre sig:**

```
(kommando)        skal være uændret fra før
```

Værnene er dem der glemmes, og det er dem der fanger den klassiske skade:
at opgaven løses, og noget andet går i stykker undervejs uden at nogen
opdager det.

**Skøn** (kan ikke måles — markér tydeligt som vurdering):

- (fx "dokumentet læses stadig sammenhængende")

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke.**
Et forkert gæt der ser rigtigt ud, koster mere at opdage end at spørge.

## Gren

`arbejde/NNN-kort-navn`. Arbejde udført af en agent flettes først ind i
`main` efter gennemgang.

---

## Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med
hvorfor. Tre tilbagefald på samme opgave betyder at kriterierne var for
vage eller opgaven for stor — ikke at posten er besværlig.)

## Resultat

**Kontroloutput — før og efter:**

```
(indsæt det faktiske output, ikke en beskrivelse af det)
```

**Hvad blev gjort:** kort, i tal hvor det kan lade sig gøre. "13
forekomster bevaret, 0 stier tilbage" kan efterprøves på et sekund;
"produktnavnet er bevaret" kan ikke.

**Hvad blev fravalgt og hvorfor:**

**Commits:**
