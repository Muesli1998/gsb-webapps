# Opgave 006 — klassificér de 458 afvigelser

**Trin:** Test & Validation

Dette er **analysearbejde på data der allerede er hentet**, ikke et nyt
udtræk. Den kan køre parallelt med opgave 004 — den venter ikke på svaret
om Playwright vs. webservicelag, fordi den kun læser data der allerede
ligger i SQLite og i den eksisterende audit-rapport.

---

## Mål

Klassificere alle 458 afvigelser mellem holdresultat og individuelle
resultater i de fem evidenskategorier der allerede er navngivet i
`docs/statistik-plan.md`: administrativ bemærkning eller protest, Golden
Set, manglende kategori, rå resultatmarkør, og reel uoverensstemmelse.

## Kontekst

`statistik/results/team-vs-individual-result-audit.md` og den tilhørende
`.json`-fil indeholder de 458 afvigelser med kamp-ID, sæson,
holdresultat, observeret individuelt resultat og antal uafklarede
kategorier. Det er kildelisten for denne opgave.

`statistik/results/CURRENT_VALIDATION_STATUS.md` har allerede identificeret
39 afvigelser med en ordret `Bemærkning` (heraf 18 uden uafklarede
kategorier) og at 121 Golden Sets er inkluderet, når de passer med
holdresultatets kampantal — det er et udgangspunkt, ikke den fulde
klassifikation.

`individual_matches.result_marker_raw` indeholder 309 rå markører hvis
betydning ikke er fastslået, jf. `statistik/AGENTS.md`-udkastet (endnu
ikke committet — reglen står også i `RESUME_INSTRUCTIONS.txt`). De
markører må ikke fortolkes i denne opgave; de skal tælles som "rå
resultatmarkør"-kategorien, ikke gættes på.

**Klassifikation betyder at evidensen er gemt ordret — ikke at årsagen er
gættet.** Findes der ingen af de fire specifikke evidenstyper for en
afvigelse, klassificeres den som "reel uoverensstemmelse" fremfor at
tvinges ind i en kategori den ikke passer i.

## Afgrænsning

**Må røres:** `statistik/` — et nyt script og en ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave
klassificerer og rapporterer — den omskriver ikke `result_marker_raw`
eller andre felter. Heller ikke `docs/historik/`, `apps/netlify-prod/`
eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "afvigelse-klassifikation\|discrepancy-classification"
```

Skal give mindst én ny rapportfil.

```
grep -c "006" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

Summen af de fem kategorier i den nye rapport skal være **458** — hverken
mere eller mindre. Angiv summen eksplicit i resultatnoten.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom. Databasen må ikke ændres.

```
node scripts/check-normalized-db.mjs
node scripts/audit-team-vs-individual-results.mjs
```

Skal give samme resultat som før opgaven — stadig 2.367 sammenlignede
holdkampe og 458 afvigelser. Kør dem først og gem outputtet.

```
git diff --stat main..arbejde/006-klassificer-afvigelser
```

Må ikke vise ændringer i `apps/`, `kampsystem/`, `docs/historik/` eller
`data/`.

**Skøn:**

- Hver afvigelse har præcis én kategori, og valget er begrundet i den
  gemte evidens for netop den kamp — ikke i et generelt mønster.
- Er en afvigelse tvetydig mellem to kategorier, vælges "reel
  uoverensstemmelse" fremfor at presse den ind et forkert sted.

## Ved tvivl

Findes der en sjette type mønster der ikke passer i de fem kategorier, så
stop og skriv det under "Spørgsmål" — udvid ikke kategorierne selv.
Kategorinavnene i `docs/statistik-plan.md` er dem der bruges videre i
Results-rapporten, så en ekstra kategori her skal godkendes først.

## Gren

`arbejde/006-klassificer-afvigelser`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Fordeling på de fem kategorier (sum = 458):**

**Hvad blev gjort:**

**Hvad blev fravalgt og hvorfor:**

**Commits:**
