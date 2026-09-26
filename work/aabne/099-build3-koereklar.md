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

1. Erstat de hårdkodede `SRC`/`OUT`-stier i `build3.py`. **Rettet 2026-09-26,
   efter Codex' spørgsmål:** `SRC` skal pege på repoets egen kanoniske kilde,
   `apps/netlify-prod/public/` (relativt til repo-roden, IKKE `config.local.json`
   — der findes ingen separat Dropbox-kopi af produktionskoden mere, det var
   netop det 13. september-omlægningen fjernede). `OUT` skal være en sti inde i selve repoet
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

**Afgjort 2026-09-26:** Chris bekræftede, at `SRC` skal være repoets kanoniske `apps/netlify-prod/public/`, ikke `gsbData`. Den tidligere SRC-uklarhed er dermed lukket.

**Nyt stop — afventer Chris:** Den aktuelle maskine har ingen brugbar Python-installation. Faktisk output: `python --version` og `python3 --version` åbner Windows Store-aliasen, `py --version` er ikke genkendt, og `where.exe python` finder kun `C:\Users\chril\AppData\Local\Microsoft\WindowsApps\python.exe`. Kortet kræver, at `build3.py` faktisk køres uden fejl; det kan ikke dokumenteres før Python installeres eller opgaven flyttes til den stationære maskine med Python. Ingen kodeændring er lavet, fordi den ikke kan afprøves som kortet kræver.
## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
SRC-beslutning: apps/netlify-prod/public/ (bekræftet af Chris)
Test-Path apps\netlify-prod\public: True
apps\netlify-prod\public\index.html: True
apps\netlify-prod\public\senior-ungdom-tilmelding.html: True
python --version: Windows Store-alias, ingen Python-installation
py --version: kommando ikke fundet
python3 --version: Windows Store-alias, ingen Python-installation
build3.py kørt: nej — ingen Python-interpreter på den aktuelle maskine.
```
**Hvad blev gjort:**

- Hentede og flettede Chris' beslutning om den kanoniske repo-SRC ind i grenen.
- Verificerede at begge kildefiler, som build3.py læser fra `SRC`, findes i `apps/netlify-prod/public/`.
- Testede `python`, `py` og `python3` på den aktuelle maskine.
**Hvad blev fravalgt og hvorfor:**

- Ingen kodeændring: Mål 2 kræver en faktisk fejlfri build, men ingen interpreter findes på maskinen.
- Ingen Python-installation: det er maskinopsætning uden for kortets tilladte filer og er ikke antaget autoriseret.
**Commits:** f97a8f7 (`Opgave 099: dokumentér blokerende SRC-stikonflikt`)
