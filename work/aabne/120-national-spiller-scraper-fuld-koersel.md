# Opgave 120 — fuld national kørsel af spiller-scraperen (alle kampe)

## Baggrund

Opgave 119 byggede og testede spiller-scraperen og databaseskemaet (`statistik/data/national-spillere.db`)
på en afgrænset stikprøve: 12 kampe, 12/12 render-gates bestået, 106 spillere, 173
spiller-kamp-rækker, 0 fejl. Metoden virker. Christoffer har nu bedt om at køre den mod
ALLE kampe systemet har adgang til, ikke kun en stikprøve.

`liga-landskab.db` indeholder 203.012 distinkte `external_match_id`-værdier
(`league_match_groups.external_match_id`) på tværs af alle regioner, aldersgrupper og
sæsoner. Det er den fulde population denne opgave skal dække.

## Mål

1. Kør `119-national-spiller-scraper.mjs` (eller en opdateret version af den) mod ALLE
   203.012 `external_match_id`-værdier i `liga-landskab.db`, ikke en delmængde.
2. Design kørslen så den kan genoptages (resumable): den kommer realistisk til at tage
   lang tid og kan blive afbrudt undervejs (netværksfejl, timeout, computeren lukker ned
   osv.). Gem fremdrift løbende (fx hvilke `external_match_id` der allerede er forsøgt),
   så en genstart ikke starter forfra eller dobbelt-behandler kampe.
3. Følg fortsat `statistik/AGENTS.md`: én side ad gangen (ingen parallel masse-scraping),
   render-gaten afgør om en side tæller som verificeret, "en fejl stopper ikke serien" —
   log fejlede kamp-ID'er og fortsæt.
4. Vær opmærksom på belastning af badmintonplayer.dk — indsæt en fornuftig pause mellem
   sidehentninger (samme stil som eksisterende scraper-scripts, hvis de allerede har en
   sådan pause; ellers vælg en rimelig værdi og nævn den i resultatnoten).
5. Undervejs eller ved milepæle (fx hver ~10.000 kampe), gem et statusøjebliksbillede
   (antal forsøgt, lykkedes, fejlet, spillere fundet) så fremdriften kan følges uden at
   vente på at hele kørslen er færdig.
6. Ved aflevering: rapportér det fulde resultat — total antal kampe forsøgt/lykkedes/fejlet,
   total antal unikke spillere, kønsfordeling (mand/kvinde/ikke afklaret/aldrig spillet),
   og en liste eller sample af de kamp-ID'er der fejlede eller ikke bestod render-gaten (så
   det er klart om kamp 3757-mønsteret fra opgave 116 er isoleret eller systematisk).

## Afgrænsning

- INGEN ranglistepoint pr. kamp — stadig eksplicit udelukket (jf. opgave 118/119).
- Forsøg IKKE at rekonstruere historiske navne — kun det aktuelt viste navn pr. spiller-ID.
- Rør IKKE `statistik/data/gsb-statistik-normalized.db` eller `statistik/data/liga-landskab.db`
  — kun læsning derfra, ingen skrivning.
- Byg ikke en visning/UI ovenpå dataene — kun kørslen, databasen og rapporten.
- Hvis kørslen viser sig markant langsommere eller mere fejlbehæftet end forventet ud fra
  119's stikprøve (fx en stor andel sider der ikke består render-gaten, eller tegn på at
  siden blokerer/rate-limiter), STOP og rapportér i stedet for at fortsætte blindt — det
  hører under "Ved tvivl" nedenfor.

## Kontekst

- `statistik/scripts/119-national-spiller-scraper.mjs` — scraperen fra forrige opgave,
  genbruges eller udvides
- `statistik/results/119-national-spiller-scraper.md`/`work/loeste/119-national-spiller-scraper.md`
  — metoden og testresultatet der ligger til grund
- `statistik/data/national-spillere.db` — databasen fra 119, udvides med den fulde kørsel
  (ikke en ny fil, medmindre der er en god grund til at starte forfra — angiv i så fald
  hvorfor)
- `statistik/data/liga-landskab.db` — kilde til de 203.012 `external_match_id`'er
- `statistik/results/116-national-spiller-id-mekanisme.md` — kendt undtagelse (kamp 3757,
  0 spillerlinks trods bestået render-gate) som reference for hvad der er "normalt" at se
  igen i den fulde kørsel

## Kontrol

- Bekræft at antallet af forsøgte kamp-ID'er i slutrapporten matcher 203.012 (eller
  forklar eksplicit enhver afvigelse, fx dubletter eller kendte udelukkelser).
- Stikprøvevis (10-15 spillere) verificér at afledt køn stemmer med de faktiske
  disciplinkoder i deres kampe.
- Bekræft 0 rækker med ranglistepoint.
- Bekræft at `gsb-statistik-normalized.db` og `liga-landskab.db` er uændrede efter kørslen.
- Bekræft at en genstart midt i kørslen (simuleret eller reel) ikke skaber dubletter i
  databasen.

## Ved tvivl

Stop og spørg Christoffer hvis: render-gate-fejlraten er markant højere end 119's 0/12,
der er tegn på at badmintonplayer.dk blokerer eller rate-limiter, kørslen ser ud til at
tage urealistisk lang tid (giv et estimat tidligt baseret på tiden pr. kamp i 119, fx
"ved X sekunder/kamp tager 203.012 kampe ca. Y timer"), eller hvis data for en betydelig
andel kampe afviger fra det forventede mønster på måder der ikke er dækket af denne opgaves
design.

## Gren

`arbejde/120-national-spiller-scraper-fuld-koersel`

## Spørgsmål

(udfyldes hvis noget er uklart under arbejdet)

## Resultatnote

(udfyldes ved aflevering)
