# Opgave 021 — forsøg manuel genindhentning af de 257 manglende kategorisektioner

**Trin:** Test & Validation

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

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Forsøgte kampe og udfald (fundet ny kategoridata / bekræftet fortsat tomt / metode fejlede):**

**Hvor mange af de 257 er nu løst, hvor mange står tilbage:**

**Commits:**
