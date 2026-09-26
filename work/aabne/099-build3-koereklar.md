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

**Afgjort 2026-09-26:** Python 3.12.10 blev installeret på maskinen og føjet til bruger-PATH. En ny PowerShell-proces gav `Python 3.12.10` fra den installerede interpreter; Windows Store-aliasen blokerer derfor ikke længere buildet.
## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
SRC: apps/netlify-prod/public/ (bekræftet af Chris)
OUT: kampsystem/dist/preview/ (ignoreret genereret output)
Ny PowerShell-proces: Python 3.12.10
Kommando: python kampsystem/build3.py
Output: done {'landing': 5222, 'index': 12276, 'tilmelding': 16113,
  'analyse': 187246, 'stilling': 40540, 'senior': 17575,
  'sondag': 8727, 'kampsystem': 110340} shell bytes: 544304
Outputfiler: 10
Gentaget build, hash-forskelle: 0
Forekomster af /mnt/user-data eller /home/claude i build3.py: 0
apps/netlify-prod/ tracked changes: 0
kampsystem_source.html SHA-256 uændret: 797D699D2A54C3F7AD7515CC93DADCDFDEC7C6DB1F2B6344BDED0EFD6F28FEA5
```
**Hvad blev gjort:**

- Hentede og flettede Chris' beslutning om den kanoniske repo-SRC ind i grenen.
- Installerede Python 3.12.10 og bekræftede den i en ny PowerShell-proces.
- Gjorde buildet relativt til scriptets placering: produktionskilden læses fra `apps/netlify-prod/public/`, og genereret output skrives til `kampsystem/dist/preview/`.
- Byggede den tidligere mellemliggende `real_data.json`-datastruktur direkte i hukommelsen fra de fire allerede eksisterende 25/26-CSV-filer, så `build3.py` kan køre selvstændigt.
- Kørte buildet to gange med identiske hash for alle 10 genererede filer.
**Hvad blev fravalgt og hvorfor:**

- `config.example.json` er ikke ændret: den godkendte SRC er en sti i repoet og kræver ingen lokal konfiguration.
- En indholds-sammenligning mod det gamle output kunne ikke udføres, fordi den gamle udgave ikke kunne køre uden Claude-sandkassens filer. I stedet er samme kildefil hash-kontrolleret før/efter og det nye build er kontrolleret deterministisk med to identiske kørsler.
**Commits:** f97a8f7 (`Opgave 099: dokumentér blokerende SRC-stikonflikt`), 09e2d01 (`Opgave 099: dokumentér manglende Python på arbejdsstationen`)
