# Opgave 022 — gør build3.py køreklar med config.local.json

**Kategori:** Generelt (teknisk gæld)
**Status:** work/future/ — IKKE aktiv. Flyttes til work/aabne/ først når
Chris giver signal, jf. AGENTS.md's prioritetsregel.

---

## Mål

`kampsystem/build3.py` skal kunne køre på en almindelig maskine uden
Claude-sandkasse-stier. `AGENTS.md` flagger den i dag som "kan ikke køre
nogen steder" pga. de hårdkodede stier `SRC`/`OUT`.

## Kontekst

Linje 3-4 i `kampsystem/build3.py`:

```python
SRC = "/mnt/user-data/uploads/Dropbox/netlify-tool-prod/public"
OUT = "/home/claude/gsb-preview"
```

`SRC` var oprindeligt en Claude-sandkasses mirror af en Dropbox-mappe
("netlify-tool-prod") der siden er blevet til den ene overlevende app —
den ligger nu i selve git-repoet som `apps/netlify-prod/public`.
**Sandsynligvis** skal `SRC` derfor blive en almindelig relativ repo-sti,
ikke en `config.local.json`-nøgle — men bekræft det ved at sammenligne
filerne scriptet forventer at læse fra `SRC` (`read()`-kaldene) mod hvad
der rent faktisk ligger i `apps/netlify-prod/public`, før du antager det.

`OUT` er en anden sag: scriptet BÅDE læser fra og (formentlig, ikke
efterprøvet i denne opgave) skriver til `OUT`. De fire JSON-filer den
læser derfra (`real_data.json`, `resultater_2425.json`,
`stilling_2425_addendum.json`, `gsb_alle_spillere.json`) er genereret
data — efter AGENTS.md's regel ("Genereret data holdes ude af git") hører
de hjemme i Dropbox, ikke i repoet. Deres nuværende, rigtige placering på
disken er IKKE dokumenteret noget sted i `docs/` eller `AGENTS.md`. Gæt
den ikke — søg efter dem under den Dropbox-rod `config.local.json`
allerede peger på (`gsbData`), og brug den fundne placering.

## Afgrænsning

**Må røres:** `kampsystem/build3.py` (kun stihåndteringen — ikke
forretningslogikken der bygger selve preview-HTML'en),
`config.example.json` (tilføj en ny nøgle hvis `OUT`s rigtige placering
viser sig at være et sted i Dropbox der endnu ikke har sin egen nøgle).

**Må ikke røres:** selve dataindholdet i de fire JSON-filer, `apps/`,
`docs/historik/`, Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
grep -n "mnt/user-data\|/home/claude" kampsystem/build3.py
```

Skal give nul træf.

```
python kampsystem/build3.py
```

Skal køre uden fejl PÅ DEN MASKINE HVOR PYTHON ER INSTALLERET (den
stationære, jf. AGENTS.md's "Værktøjer på de to maskiner" — den bærbare
har endnu ikke python). Kør ikke dette kontroltrin på den bærbare og
konkludér fejl derfra.

**Værnene:**

```
git diff --stat main..arbejde/022-generelt-build3-koereklar-config
```

Må ikke vise ændringer i `apps/`, `statistik/`, `docs/historik/` eller
Dropbox-arkivet.

**Skøn:**

- Skift ikke stien til noget der "nok" er rigtigt uden at have set filerne
  ligge der. Find dem eller stop.

## Ved tvivl

Findes `OUT`s fire JSON-filer ikke nogen steder i den tilgængelige
Dropbox-mappe, eller er det uklart om `SRC` skal være en repo-sti eller
en config-nøgle, så stop og skriv det under "Spørgsmål" — gæt ikke en
placering og opret ikke tomme placeholder-filer.

## Gren

`arbejde/022-generelt-build3-koereklar-config`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**SRC og OUT's nye værdier, og hvordan de blev bekræftet (ikke gættet):**

**Commits:**
