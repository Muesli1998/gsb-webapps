# Opgave 014 — afklar kamp 340495

**Trin:** Test & Validation

Lille opgave, men bør lukkes før Results-rapporten, da kampen nævnes
flere steder med tilsyneladende to forskellige statusser.

---

## Mål

Afklare kamp 340495's faktiske status entydigt, og rette eventuel
selvmodsigelse i dokumentationen.

## Kontekst

`statistik/results/CURRENT_VALIDATION_STATUS.md` nævner kamp 340495 to
steder med to forskellige udsagn:

- Linje 56 (afsnit "Individuelle dækningshuller"): *"Kamp 340495 er den
  eneste uafklarede række i denne gruppe."*
- Linje 63 (afsnit "Bemærkninger og afgørelser"): *"340495 er en
  protestafgørelse: resultatet er ændret jf. kendelse i protest."*

Det er uklart om dette er to forskellige ting om samme kamp der begge er
sande (fx: protesten er afgjort, men én individuel kategori mangler
stadig score), eller om den ene sætning er forældet og skulle være
rettet da den anden blev skrevet.

## Afgrænsning

**Må røres:** `statistik/results/CURRENT_VALIDATION_STATUS.md` (kun de
to relevante linjer/afsnit), `statistik/TEST_RUN_LOG.md`, og evt. en ny
lille evidensfil under `statistik/results/` hvis den rå kilde skal
dokumenteres separat.

**Må ikke røres:** databasen `statistik/data/*.db` — denne opgave må
foreslå en rettelse af feltværdier i resultatnoten, men udfører den
ikke. Heller ikke `docs/historik/`, `apps/netlify-prod/` eller Dropbox'
`_arkiv\`.

## Kontrol

**Målet:**

```
grep -n "340495" statistik/results/CURRENT_VALIDATION_STATUS.md
```

Skal efter opgaven vise **konsistente** udsagn om kamp 340495 — ikke to
sætninger der modsiger hinanden uden forklaring på hvorfor begge kan
være sande.

```
grep -c "014" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/014-afklar-kamp-340495
```

Må ikke vise ændringer i `apps/`, `kampsystem/`, `docs/historik/` eller
`data/`.

**Skøn:**

- Findes der rå kildeevidens (payload, protestreferat, browser-udsnit)
  for kampen, skal konklusionen bygge på den — ikke på at vælge den ene
  af de to eksisterende sætninger som "nok den rigtige".

## Ved tvivl

Kan de to udsagn ikke forenes ud fra tilgængelig evidens (fx mangler den
rå protestafgørelse helt), så stop og skriv det under "Spørgsmål" —
gæt ikke hvilken af de to der er korrekt.

## Gren

`arbejde/014-afklar-kamp-340495`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:** `CURRENT_VALIDATION_STATUS.md` siger nu
entydigt, at kampens holdresultat er afklaret som en protestafgørelse,
mens de seks individuelle kategoriscores fortsat er et særskilt
dækningshul. `git status --short statistik/data/` var tom.

**Hvad viste den rå kilde, og hvordan blev de to udsagn forenet:**
Den gemte række har resultat `0-6`, point `0-3`, status
`browser_verified` og den ordrette Bemærkning "Resultatet ændret jf.
kendelse i protest. Kurt Mehlsen 10.03.2019". Den gemte coverage-audit
viser seks kategorier og 22 spillere, men ingen scores og ingen eksplicit
no-playtekst. Protesten afklarer altså holdresultatet; den manglende
individuelle score er fortsat et afgrænset dækningshul.

**Commits:** 5fc8045 (evidens og statusafklaring); resultatnotens arkivering
følger i næste commit.
