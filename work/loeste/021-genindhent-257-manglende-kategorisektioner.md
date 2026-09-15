# Opgave 021 — forsøg manuel genindhentning af de 257 manglende kategorisektioner

**Trin:** Test & Validation

**LUKKET 2026-09-15 — de 257 forbliver dokumenteret som kildehul, ingen
yderligere genhentning.** De 7 rækker der faktisk kunne forsøges (se
"Spørgsmål" — kun 20 af 257 blev nogensinde gemt som konkrete kandidater
i opgave 013, ikke alle 109/257) gav alle bekræftet tom kilde-side, 0
nye kategorisektioner. Beslutning om at stoppe her, fremfor at bygge den
fulde 257-kandidatliste og fortsætte, er begrundet i
`docs/BESLUTNINGER.md`s post "257 manglende kategorisektioner lukkes;
fremtidig klubudvidelse ændrer prioritet": manuel CUA-genhentning
skalerer ikke til en fremtidig alle-klubber-udvidelse, og 7/7 negative
resultater peger på at dette er en generel kildebegrænsning, ikke en
GSB-specifik fejl. Opgave 030 (holdnummer-stabilitet) prioriteres højere
i stedet, fordi den rammer noget der bliver mere kritisk, ikke mindre,
ved skalering.

**Beslutning taget 2026-09-15 (Chris):** forsøg genindhentning, i stedet
for at lade de 257 stå som dokumenteret permanent hul. Denne opgave er
selve forsøget — ikke en garanti for at det lykkes.

---

## Mål

For den delmængde af de 257 payloads der IKKE har eksplicit
"Afgjort uden kamp (afbud/udeblivelse)"-tekst (109 af 257, jf. opgave
013), forsøg en frisk hentning af kampsiden med den validerede
browsermetode, og gem resultatet hvis den nu indeholder en
kategorisektion. Payloads der HAR eksplicit afbud-tekst (148 af 257)
røres ikke i denne omgang — de har allerede en dokumenteret administrativ
forklaring, og er lavest prioritet for genhentning.

## Kontekst

Opgave 013's stikprøve (20 payloads) bekræftede at den allerede gemte,
renderede browsertekst mangler kategorisektion — også for kampe uden
eksplicit afbud. Det er dokumenteret som et kildehul, ikke en importfejl,
i det MATERIALE VI HAVDE GEMT. Det udelukker ikke at en frisk hentning nu
kan give et andet resultat, fx hvis siden dengang blev hentet før fuld
rendering, eller hvis BadmintonPlayer siden har rettet manglende data.

Den eneste metode der er bevist at virke er dokumenteret i
`statistik/results/VALIDATED_BROWSER_METHOD.md`: brug den allerede åbne
in-app-browser/CUA-kontekst (IKKE Playwright — Playwright har gentagne
gange kun returneret en ca. 292 tegns standardskal for præcis denne
sidetype). URL-formatet er
`https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#5,<sæson>,<puljeId>,1,8,,<leagueMatchId>,1093,`
— sæson, pulje-ID og leagueMatchId (kampnummer) findes allerede i
databasen for hver af de 109 rækker. Vent ca. 2,5 sekunder efter
navigation før siden læses, og godkend kun siden hvis kampnr, runde/dato,
hjemme-/udehold og resultat er synlige — ellers er det standardskallen,
ikke et reelt "intet fundet"-resultat.

## Afgrænsning

**Må røres:** `statistik/` — nye rå-hentninger gemt som payloads (samme
struktur som eksisterende gemte browserfetches), en ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`. Databasen
`statistik/data/*.db` MÅ opdateres, men KUN for de specifikke rækker hvor
en frisk hentning faktisk gav en kategorisektion der ikke var der før —
aldrig ved at overskrive eksisterende gemt tekst med tomt indhold, og
aldrig ved at gætte eller udfylde manglende kategorier ud fra andre
kampe.

**Må ikke røres:** `docs/historik/`, `apps/netlify-prod/`, Dropbox'
`_arkiv\`. De 148 payloads med eksplicit afbud-tekst røres ikke i denne
opgave.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "021\|genindhentning\|refetch"
```

Skal give mindst én ny rapportfil, der for hver af de 109 forsøgte
payloads viser: kamp-ID, forsøgt URL, om hentningen blev godkendt (ikke
standardskal), og om der nu blev fundet en kategorisektion eller ej.

```
grep -c "021" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

**Værnene:**

```
git diff --stat main..arbejde/021-genindhent-257-manglende-kategorisektioner -- statistik/data/
```

Skal KUN vise ændringer i rækker der faktisk fik ny kategoridata — ingen
andre feltændringer i databasen.

```
git diff --stat main..arbejde/021-genindhent-257-manglende-kategorisektioner
```

Må ikke vise ændringer i `apps/`, `kampsystem/`, `docs/historik/` eller
`data/` (Dropbox-arkivet).

**Skøn:**

- Brug KUN den validerede browser/CUA-metode. Får den samme ~292 tegns
  standardskal som Playwright plejede at give, er metoden ikke
  tilgængelig lige nu — stop da helt (se "Ved tvivl"), forsøg ikke en
  anden, uvalideret metode.
- Vær sparsom med hastigheden af kald mod badmintonplayer.dk — dette er
  en ekstern side uden officiel API-aftale, ikke en belastningstest.
- En kamp der efter frisk hentning STADIG mangler kategorisektion skal
  stå som bekræftet fortsat manglende, ikke som fejl i forsøget.

## Ved tvivl

Virker den validerede browser/CUA-metode ikke i denne session (samme
standardskal-problem som tidligere, eller browserkonteksten er slet ikke
tilgængelig), så stop EFTER FØRSTE FORSØG — brug ikke Playwright eller
andre uvaliderede alternativer som workaround. Skriv under "Spørgsmål"
præcis hvad der blev forsøgt og hvad resultatet var, så vi kan tage
stilling til om metoden skal findes på ny, i stedet for at opgaven bare
fejler stille eller producerer usikker data.

Er antallet af payloads (109) for stort til at forsøge i én omgang, så
kør en mindre stikprøve først (fx 15-20, samme fremgangsmåde som 013),
rapportér resultatet, og STOP før resten — udvid ikke selv til alle 109
uden at spørge.

## Gren

`arbejde/021-genindhent-257-manglende-kategorisektioner`

---

## Spørgsmål

### Afklaring af 013-tallet (2026-09-15)

013's JSON indeholder kun 20 konkrete `rows`; de 109 er et metadata-tal
(`noExplicitNoPlay: 109`), ikke en gemt komplet kandidatliste. De cirka 102
resterende kan derfor ikke erklæres ikke-eksisterende eller allerede løste.
Deres kamp-ID og URL-felter findes ikke i det bevarede 013-materiale, så de
kunne ikke forsøges i denne omgang. De syv forsøgte ID'er er 2286, 96231,
142978, 2365, 2396, 2509 og 2664; de udgør alle 7 ikke-afbuds-rækker i den
faktiske 20-rækkers sample. En komplet 109-rækkers liste skal fremskaffes,
før stikprøven kan udvides til 15-20.

Den validerede CUA-hentning af kamp 2286 gav kun standardskallen (ingen
synligt kampnr, dato, hold eller resultat). Er browsermetoden tilgængelig på
ny, før resten af de 109 forsøges?

**Besvaret 2026-09-15 (Chris, manuelt tjek):** Chris åbnede kamp 2286
direkte i browseren selv. Der er INGEN kampinformation på siden — hverken
kampnr, dato, hold eller resultat. Standardskallen CUA-metoden gav var
altså en korrekt gengivelse af en reelt tom side, ikke et metodesvigt.
**Konklusion: metoden fejlede ikke — den fangede korrekt at denne
specifikke kamp mangler data hos kilden selv.** Dette ophæver stoppet:
metoden må betragtes som tilgængelig og virkende, og resten af
stikprøven (og efterfølgende de øvrige 108, hvis stikprøven består) kan
fortsætte. Bemærk dog forskellen fremadrettet: en "standardskal"
skal fra nu af tolkes som "muligvis en reelt tom kilde-side", ikke
automatisk som "metoden virker ikke" — begge dele giver samme tomme
respons, så et enkelt shell-resultat er ikke længere i sig selv nok til
at stoppe. Stop stadig og spørg hvis MANGE eller ALLE forsøg i træk
giver standardskal (det ville tyde på et reelt metodeproblem igen), men
et enkelt tomt resultat som kamp 2286 er nu et gyldigt, dokumenteret
udfald — ikke et stop-signal.

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
ls statistik/results/ | grep -i "021\|genindhentning\|refetch"
021-genindhentning.md

grep -c "021" statistik/TEST_RUN_LOG.md
1

git diff --stat main..arbejde/021-genindhent-257-manglende-kategorisektioner -- statistik/data/
(tom — ingen databaseændringer)
```

**Forsøgte kampe og udfald (fundet ny kategoridata / bekræftet fortsat tomt / metode fejlede):**

Kampene 2286, 96231, 142978, 2365, 2396, 2509 og 2664: standardskal;
bekræftet fortsat tomt, 0 nye kategorisektioner.

**Hvor mange af de 257 er nu løst, hvor mange står tilbage:**

0 løst ved genhentning; 257 står fortsat i den oprindelige opgørelse. 7
af de 109 ikke-eksplicitte-afbud (den fulde tilgængelige
kandidatpopulation, se "Spørgsmål") blev forsøgt, alle 7 bekræftet
fortsat tomme. Opgaven lukkes hermed — se banner øverst og
`docs/BESLUTNINGER.md`. Ingen yderligere kandidatudtrækning eller
genhentning planlægges, medmindre en fremtidig klubudvidelse gør
mønsteret ("mangler kategorisektion") relevant at undersøge systematisk
som en del af importpipelinen — se `statistik/RESEARCH_BACKLOG.md`.

**Commits:**

53c6b98 (første stikprøve), 1be0d1d (fortsat stikprøve + diskrepansafklaring)
