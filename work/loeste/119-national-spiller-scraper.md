# Opgave 119 — byg national spiller-scraper og -database (grundlag)

## Baggrund

Opgave 116 bekræftede at den samme spiller-ID-mekanisme som GSB's egen scraper bruger
(`a[href*="/DBF/Spiller/VisSpiller/"]`, stabilt numerisk ID fra href-fragmentet) også findes
på nationale (ikke-GSB) holdkampsider — 8/9 stikprøver bestod, med én dokumenteret, ikke
generaliseret undtagelse (kamp 3757, Bornholm U11 2011). `liga-landskab.db` har 203.012
distinkte `external_match_id`-værdier på tværs af hele landet, som denne opgave kan bygge
videre på.

Opgave 118 (`work/future/118-national-spiller-scraper-design.md`) aftalte de konkrete
designbeslutninger for hvad en national spillerkobling skal indeholde. Dette opgavekort
omsætter de beslutninger til en faktisk byggeopgave: en ny scraper og et nyt databaseskema,
adskilt fra `gsb-statistik-normalized.db` (som forbliver GSB-scoped og urørt).

## Mål

Byg et første, fungerende lag af en national spiller-database, baseret på de 5
designbeslutninger fra opgave 118 uden at genforhandle dem:

1. **Nyt skema** (fx `statistik/data/national-spillere.db`, eller et nyt sæt tabeller —
   vælg selv en fornuftig struktur, men hold det adskilt fra `gsb-statistik-normalized.db`
   og skriv IKKE til den eksisterende fil) med som minimum:
   - `players`: eksternt spiller-ID + navn (samme mønster som eksisterende
     `players.external_player_id`/`name_raw`)
   - en kobling spiller ↔ individuel kamp, inkl. `external_match_id` så den kan slås op mod
     `liga-landskab.db`
   - kønsfelt afledt EFTER reglen i designbeslutning 2: HS/HD → mand, DS/DD → kvinde,
     "ikke afklaret" (spillet kampe, aldrig kønnet disciplin), "aldrig spillet" (ID findes,
     ingen kampe) — ALDRIG navnebaseret gæt
   - felterne fra designbeslutning 3: makkerkobling i double, modstanderidentitet,
     klub/hold på kamptidspunktet, sætresultater pr. disciplin, individuel
     walkover/udeblivelses-markør, runde/turneringskontekst hvor tilgængelig
   - INGEN kolonne til ranglistepoint pr. kamp (designbeslutning 4 — eksplicit udelukket)
2. **Scraper-script** der genbruger samme udtræksmetode og render-gate som
   `statistik/scripts/extract-individual-browser.mjs` / `extract-all-verified-individual.mjs`,
   men kører mod nationale `external_match_id`'er fra `liga-landskab.db` i stedet for kun
   GSB's egne.
3. **Kør scraperen på en afgrænset, kontrolleret delmængde først** — foreslå selv en
   fornuftig indledende skala (fx nogle hundrede kampe spredt over regioner/aldre/sæsoner,
   IKKE alle 203.012 på én gang), og rapportér resultatet, før der tages stilling til en
   fuld nationaldækkende kørsel. En fuld kørsel er IKKE en del af dette opgavekort.
4. Følg `statistik/AGENTS.md`'s principper undervejs: "Evidens før fortolkning", "Aldrig
   gæt" (en kamp uden kønnet disciplin er "ikke afklaret", ikke et gæt ud fra navnet),
   "Render-gaten" (kun kampside-tekst der består gaten tæller som verificeret), "En fejl
   stopper ikke serien" (log og fortsæt ved enkeltsidefejl).
5. Dokumentér i resultatnoten: hvor mange kampe blev forsøgt, hvor mange lykkedes, hvor
   mange spillere blev fundet, evt. mønstre i fejl/manglende data (fx om kamp 3757's
   mangel på spillerlinks er et isoleret tilfælde eller ses igen i den kørte delmængde).

## Afgrænsning

- INGEN ranglistepoint pr. kamp — hverken kolonne eller forsøg på at hente dem. Hvis det
  senere ønskes, er det en selvstændig, separat opgave (jf. opgave 118, punkt 4).
- Forsøg IKKE at rekonstruere historiske navne — mekanismen tillader det ikke (opgave 118,
  punkt 5). Gem kun det aktuelt viste (nuværende) navn pr. spiller-ID.
- Rør IKKE `statistik/data/gsb-statistik-normalized.db` eller `statistik/data/liga-landskab.db`
  — kun læsning derfra (for `external_match_id`-lister), ingen skrivning.
- Kør IKKE en fuld national scraping af alle 203.012 kampe i denne opgave — kun en afgrænset
  første delmængde, som beskrevet i Mål #3.
- Byg ikke en visning/UI ovenpå dataene — kun scraper + database + rapport.

## Kontekst

- `work/future/118-national-spiller-scraper-design.md` — de aftalte designbeslutninger,
  udgangspunkt for dette kort, må ikke genforhandles uden at spørge Christoffer
- `statistik/results/116-national-spiller-id-mekanisme.md`/`.json` — bekræftelse af
  mekanismen nationalt, inkl. den ene kendte undtagelse (kamp 3757)
- `statistik/scripts/extract-individual-browser.mjs`,
  `extract-all-verified-individual.mjs` — eksisterende GSB-udtræksmetode, genbrug mønsteret
- `statistik/data/liga-landskab.db` — kilde til nationale `external_match_id`'er
  (`league_match_groups.external_match_id`, 203.012 distinkte værdier)
- `statistik/results/individual-browser/2018-337416.json` — eksempel på rå kampside-tekst
  der viser hvilke felter der reelt er til stede
- `statistik/results/016-spiller-id-audit.md` — GSB's eksisterende spiller-ID-dækningstal,
  til sammenligning

## Kontrol

- Verificér stikprøvevis (fx 5-10 spillere) at det afledte køn stemmer overens med de
  faktiske disciplinkoder i deres kampe — ingen navnebaseret genvej.
- Verificér at "ikke afklaret" og "aldrig spillet" faktisk optræder i data hvor de burde
  (dvs. ikke alle spillere ender med et afklaret køn).
- Kør en kontrolforespørgsel der bekræfter 0 rækker forsøger at gemme ranglistepoint.
- Bekræft at `gsb-statistik-normalized.db` og `liga-landskab.db` ikke er ændret
  (fx via `git status`/diff eller filens mtime).

## Ved tvivl

Spørg Christoffer før du udvider skalaen ud over en indledende, afgrænset delmængde, eller
hvis noget i data modsiger en af de 5 designbeslutninger fra opgave 118 (fx hvis kønnede
disciplinkoder viser sig upålidelige, eller hvis flere kampe end forventet mangler
spillerlinks som kamp 3757).

## Gren

`arbejde/119-national-spiller-scraper`

## Spørgsmål

(udfyldes hvis noget er uklart under arbejdet)

## Resultatnote

### Kontroloutput

- 12 kampe forsøgt, 12 render-gate-bestået, 0 fetch/render-fejl.
- 106 unikke spillere og 173 spiller-kamp-rækker i den separate `national-spillere.db`.
- Kønsstatus: 8 mand, 6 kvinde, 92 ikke afklaret, 0 aldrig spillet.
- 0 felter med point/rank i `players`; ingen ranglistepoint blev hentet.
- De eksisterende `gsb-statistik-normalized.db` og `liga-landskab.db` blev kun læst.

### Hvad blev gjort

Bygget og kørt `statistik/scripts/119-national-spiller-scraper.mjs` på en kontrolleret prøve af 12 kamp-ID’er. Skemaet er adskilt i `statistik/data/national-spillere.db` med `matches`, `players`, `player_matches` og `scrape_errors`. Render-gaten og disciplinbaseret kønsafledning følger opgave 118 og `statistik/AGENTS.md`. Resultaterne ligger i `statistik/results/119-national-spiller-scraper/` og `statistik/results/119-national-spiller-scraper.md`.

### Hvad blev fravalgt og hvorfor

Ingen fuld national kørsel, ingen ændring af eksisterende databaser, ingen ranglistepoint og ingen navnebaseret kønsafledning. `aldrig spillet` optrådte ikke i prøven, fordi kilden kun eksponerer ID’er via faktiske kampsider; statusværdien er dog understøttet i skemaet. En udvidelse ud over de 12 kampe afventer særskilt beslutning.

### Commits

Commit: scraper, rapport og kort arkiveret på `arbejde/119-national-spiller-scraper`.
