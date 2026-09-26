# Opgave 099 — gør kampsystem/build3.py køreklar på en almindelig maskine

**Trin:** Videreudvikling / Infrastruktur

**Baggrund:** `AGENTS.md`s "Hvad du ikke kan stole på" har længe påpeget at
`kampsystem/build3.py` har hårdkodede stier ind i en Claude-sandkasse
(`SRC = "/mnt/user-data/uploads/Dropbox/netlify-tool-prod/public"`,
`OUT = "/home/claude/gsb-preview"`) og derfor ikke kan køre nogen steder
udenfor den sandkasse. Bekræftet stadig sandt 2026-09-26. Resten af repoet
bruger `config.local.json` (se `config.example.json`) til at slå
maskinspecifikke stier op — dette script gør det ikke endnu.

## Mål

1. Erstat de hårdkodede `SRC`/`OUT`-stier i `build3.py` med opslag i
   `config.local.json` (samme mønster som resten af repoet — se
   `config.example.json`s `dropboxRod`/`gsbData`-felter for det forventede
   format). `SRC` skal pege på `netlify-tool-prod/public` under den
   konfigurerede `gsbData`-sti; `OUT` skal være en sti inde i selve repoet
   (fx `kampsystem/output/` eller tilsvarende — vælg noget der giver mening,
   men spørg hvis der er tvivl om hvor output bør ligge, se Spørgsmål).
2. Kør scriptet igennem på den maskine du sidder på (Chris' stationære,
   ifølge `AGENTS.md` python 3.10, ingen node) og bekræft at det rent faktisk
   producerer output uden fejl.
3. Ret evt. andre hårdkodede stier i samme fil du støder på undervejs,
   efter samme mønster.

## Afgrænsning

**Må røres:** `kampsystem/build3.py`, denne opgaves kortfil. Evt.
`config.example.json` HVIS scriptet får brug for et nyt feltnavn dér
(dokumentér i så fald i Resultatnoten hvilket felt der er tilføjet, og at
Chris selv skal tilføje det tilsvarende felt i sin egen `config.local.json`).

**Må ikke røres:** `apps/netlify-prod/` (kilde-data må læses, ikke ændres).
`kampsystem_source.html` og andre byggefiler, medmindre Målet eksplicit
kræver det. Ingen databaser.

## Kontekst

- `AGENTS.md`, "Hvad du ikke kan stole på" — den oprindelige fejlbeskrivelse.
- `config.example.json` — det etablerede mønster for maskinspecifikke stier.
- `AGENTS.md`, "Ingen absolutte stier i repoet" — princippet denne opgave
  retter en overtrædelse af.

## Kontrol

**Målet — hvad skal blive sandt:**

```
build3.py indeholder ingen forekomster af "/mnt/user-data" eller "/home/claude".
Scriptet er kørt igennem på en almindelig maskine (ikke en Claude-sandkasse)
  og producerede output uden fejl — vis den faktiske kommando og dens output.
```

**Værnet — hvad må ikke ændre sig:**

```
git diff --stat   viser KUN build3.py, evt. config.example.json, og kortfilen.
apps/netlify-prod/ er ikke ændret (kun læst som kildedata).
Outputtets faktiske INDHOLD (fx kampsystem_source.html's data) er identisk
  med hvad scriptet producerede før rettelsen, hvis det kan sammenlignes —
  dette er en sti-rettelse, ikke en logikændring.
```

**Skøn** (kan ikke måles):

- Hvor i repoet `OUT` bør pege hen, hvis det ikke allerede er indlysende ud
  fra hvordan output'et bruges i dag.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** på
hvor `OUT` skal pege hen hvis det er uklart, eller på hvad et nyt
`config.local.json`-felt skal hedde.

## Gren

`arbejde/099-build3-koereklar`, fra `main`.

---

## Spørgsmål

**Stop — afventer Chris:** `config.local.json` angiver `gsbData` som `C:\Users\chril\Dropbox\Projects\GSB-Webapps`, men `Test-Path "$gsbData\netlify-tool-prod\public"` giver `False`. Den kilde, som faktisk findes og er kanonisk ifølge `AGENTS.md`, er `apps/netlify-prod/public/` i repoet; den indeholder `index.html` og `senior-ungdom-tilmelding.html`, som `build3.py` læser fra `SRC`.

Kortets Mål kræver eksplicit, at `SRC` peger under `gsbData`, mens repoets nuværende struktur siger, at produktionskoden ligger i `apps/netlify-prod/`. Skal `build3.py` bruge den kanoniske repo-kilde (`apps/netlify-prod/public/`), eller skal Chris først genskabe en særskilt `gsbData\netlify-tool-prod\public`-kopi? Jeg kan ikke vælge mellem de to uden at gætte, og scriptet kan derfor ikke køres ærligt endnu.

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
config.local.json gsbData: C:\Users\chril\Dropbox\Projects\GSB-Webapps
Test-Path $gsbData\netlify-tool-prod\public: False
Test-Path apps\netlify-prod\public: True
apps\netlify-prod\public\index.html: True
apps\netlify-prod\public\senior-ungdom-tilmelding.html: True
build3.py kørt: nej — Mål 1's krævede SRC findes ikke på den konfigurerede sti.
```

**Hvad blev gjort:**

- Læste build3.py, `config.local.json` og den kanoniske app-kilde for at verificere den påkrævede SRC-sti.
- Dokumenterede den konkrete konflikt i Spørgsmål med begge verificerede stier.

**Hvad blev fravalgt og hvorfor:**

- Ingen kodeændring og ingen buildkørsel: at skifte SRC til repoet ville afvige fra kortets eksplicitte `gsbData`-krav uden beslutning.
- Ingen oprettelse eller kopiering af en Dropbox-kilde: det ville genindføre en uklar, separat kilde ved siden af det kanoniske repo.

**Commits:** f97a8f7 (`Opgave 099: dokumentér blokerende SRC-stikonflikt`)
