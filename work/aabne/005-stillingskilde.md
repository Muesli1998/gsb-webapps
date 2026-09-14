# Opgave 005 — afklar kilden til slutstillinger

**Trin:** Test & Validation

Dette er en **undersøgelse**, ikke en byggeopgave, ligesom 004. Resultatet
er en anbefaling om hvor slutstillinger og gruppeplaceringer skal hentes
fra — ikke en færdig stillingsimport.

---

## Mål

Afgøre om slutstillinger og gruppeplaceringer kan hentes fra et
login-frit Nembadminton-felt, eller om de skal suppleres fra
BadmintonPlayer, og skrive anbefalingen ind i `docs/statistik-plan.md`.

## Kontekst

`statistik/RESEARCH_BACKLOG.md`, afsnittet "Næste holdkamp-test",
dokumenterer at kamp-discovery-kæden indeholder kampe og gruppe-ID'er, men
at en slutstilling endnu ikke er dokumenteret i dens svar.

`statistik/results/CURRENT_VALIDATION_STATUS.md` nævner at 736
standingsrækker allerede er gemt, og at 96 GSB-stillingsrækker er fundet i
den aktuelle stillingssamling — så noget virker allerede delvist. Denne
opgave skal afklare om det er hele svaret, eller om der mangler en kilde
for playoff-stillinger (semifinaler, finale, bronzekamp — nævnt som åbent
punkt i `results/terra-action-items.md`).

Dette er trin 5 i `docs/statistik-plan.md` ("Stillingskontrol" —
kampantal pr. sæson/pulje holdt op mod de officielle stillinger). Uden en
afklaret kilde til slutstillinger kan det trin ikke bygges pålideligt.

## Spørgsmål der skal besvares

**A. Har det login-frie Nembadminton-felt slutstillinger?**
Undersøg om kamp-discovery-kæden (den samme rute der allerede finder
kampe og gruppe-ID'er) også indeholder et stillings- eller
placeringsfelt, eller om den kun lister kampe. Brug en kendt GSB-pulje
som reference og gem den rå kilde som evidens uanset udfald.

**B. Kan BadmintonPlayer levere det, hvis Nembadminton ikke kan?**
Undersøg om samme ASP.NET-webservicelag som i opgave 004
(`SearchTournamentMatches` / `GetTournamentEvents`-familien) også har et
kald der returnerer en stilling eller gruppeplacering, ikke kun
enkeltkampe.

**C. Dækker den nuværende stillingssamling (736 rækker) allerede det
meste?**
De 96 GSB-rækker der allerede er fundet — undersøg om de stammer fra en
af de to kilder ovenfor, eller fra en tredje rute der allerede er i brug.
Det afgør om opgaven er "byg videre på det der virker" eller "find en ny
rute".

**D. Hvordan aggregeres playoff-stillinger?**
Semifinaler, finale og bronzekamp giver ikke en enkelt puljestilling.
Undersøg om der findes et samlet playoff-resultat i en af kilderne, eller
om det skal udledes af de enkelte kampresultater — og skriv hvilket af de
to det er.

## Afgrænsning

**Må røres:** `statistik/` — nye probe-scripts, nye filer under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`, og
`docs/statistik-plan.md` (kun afsnittet om "Stillingskontrol").

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave må ikke
skrive til SQLite overhovedet. Heller ikke `docs/historik/`,
`apps/netlify-prod/` eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "stillingskilde\|standings-source"
```

Skal give mindst én ny evidensfil.

```
grep -c "005" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

```
grep -c "Anbefalet stillingskilde" docs/statistik-plan.md
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
git diff --stat main..arbejde/005-stillingskilde
```

Må ikke vise ændringer i `apps/`, `kampsystem/`, `docs/historik/` eller
`data/`.

**Skøn:**

- Anbefalingen er begrundet i evidens fra kørslerne, ikke i formodning.
- Et dokumenteret "ingen af kilderne dækker playoff-stillinger endnu" er
  et brugbart resultat — det skal ikke dækkes over.

## Ved tvivl

Virker den ene kilde kun for nogle sæsoner eller kun for grundspil (ikke
playoff), så skriv præcis hvor grænsen går frem for at konkludere enten
eller.

## Gren

`arbejde/005-stillingskilde`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Svar på A (Nembadminton-felt):**

**Svar på B (BadmintonPlayer-webservice):**

**Svar på C (de 736/96 eksisterende rækker):**

**Svar på D (playoff-aggregering):**

**Anbefalet stillingskilde og begrundelse:**

**Hvad blev fravalgt og hvorfor:**

**Commits:**
