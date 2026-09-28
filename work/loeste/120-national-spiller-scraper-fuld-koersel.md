# Opgave 120 — national kørsel af spiller-scraperen, tidsbokset til 1 time (første etape)

## Baggrund

Opgave 119 byggede og testede spiller-scraperen og databaseskemaet (`statistik/data/national-spillere.db`)
på en afgrænset stikprøve: 12 kampe, 12/12 render-gates bestået, 106 spillere, 173
spiller-kamp-rækker, 0 fejl. Metoden virker. Christoffer har nu bedt om at køre den mod
ALLE kampe systemet har adgang til, ikke kun en stikprøve.

`liga-landskab.db` indeholder 203.012 distinkte `external_match_id`-værdier
(`league_match_groups.external_match_id`) på tværs af alle regioner, aldersgrupper og
sæsoner. Det er den fulde population, men denne opgave kører kun en FØRSTE, tidsboksed
etape af den — ikke det hele på én gang. Christoffer har bedt om at give kørslen 1 time,
og at den derefter stopper og gemmer sit fremskridt på en måde så en senere opgave kan
fortsætte direkte derfra uden at starte forfra eller dobbeltbehandle kampe.

## Mål

1. Kør `119-national-spiller-scraper.mjs` (eller en opdateret version af den) mod
   `external_match_id`-værdierne i `liga-landskab.db`, i den rækkefølge du finder
   fornuftig, men KUN i 1 time fra kørslens start. Byg en tidsgrænse ind i scriptet selv
   (ikke bare en ekstern afbrydelse), så det stopper sig selv pænt efter ca. 1 time —
   fuldfør den kamp der er i gang, gem status, og afslut normalt i stedet for at blive
   dræbt midt i en skrivning.
2. Design kørslen så den er fuldt genoptagelig (resumable) — dette er kritisk, da
   opgaven eksplicit kun dækker de første ca. 60 minutter af en meget større population.
   Gem fremdrift løbende (fx hvilke `external_match_id` der allerede er forsøgt, og med
   hvilket udfald), så en SENERE opgave kan fortsætte PRÆCIS hvor denne stoppede — uden at
   starte forfra, uden at springe kampe over, og uden at dobbeltbehandle nogen. Dette
   gælder også hvis kørslen af andre grunde afbrydes før den selv når 1-timers-grænsen
   (netværksfejl, computeren lukker ned osv.).
3. Følg fortsat `statistik/AGENTS.md`: én side ad gangen (ingen parallel masse-scraping),
   render-gaten afgør om en side tæller som verificeret, "en fejl stopper ikke serien" —
   log fejlede kamp-ID'er og fortsæt.
4. Vær opmærksom på belastning af badmintonplayer.dk — indsæt en fornuftig pause mellem
   sidehentninger (samme stil som eksisterende scraper-scripts, hvis de allerede har en
   sådan pause; ellers vælg en rimelig værdi og nævn den i resultatnoten).
5. Undervejs (fx hvert par minutter eller hver ~500-1000 kampe, alt efter tempo), gem et
   statusøjebliksbillede (antal forsøgt, lykkedes, fejlet, spillere fundet) så fremdriften
   kan følges uden at vente på at timen er gået.
6. Ved aflevering: rapportér resultatet af denne ene times kørsel — hvor mange kampe blev
   nået inden for timen, hvor mange lykkedes/fejlede, hvor mange unikke spillere blev
   fundet, kønsfordeling (mand/kvinde/ikke afklaret/aldrig spillet), sample af evt.
   fejlede/ikke-bestået-render-gate kamp-ID'er, og — vigtigst — et klart estimat for hvor
   lang tid den FULDE kørsel over alle 203.012 kampe realistisk vil tage ved det observerede
   tempo (kampe/minut), så vi ved hvor mange flere "etaper" af denne slags der skal til.
7. Skriv tydeligt i resultatnoten PRÆCIS hvordan en efterfølgende opgave genoptager kørslen
   (hvilket kommando/script-kald, hvilken tilstandsfil/tabel den læser fra) — dette skal
   kunne bruges direkte af næste opgavekort uden yderligere undersøgelse.

## Afgrænsning

- INGEN ranglistepoint pr. kamp — stadig eksplicit udelukket (jf. opgave 118/119).
- Forsøg IKKE at rekonstruere historiske navne — kun det aktuelt viste navn pr. spiller-ID.
- Rør IKKE `statistik/data/gsb-statistik-normalized.db` eller `statistik/data/liga-landskab.db`
  — kun læsning derfra, ingen skrivning.
- Byg ikke en visning/UI ovenpå dataene — kun kørslen, databasen og rapporten.
- Kør IKKE længere end ca. 1 time. Denne opgave er eksplicit kun første etape — den fulde
  kørsel over alle 203.012 kampe er IKKE en del af dette opgavekort og skal ikke forsøges
  her, heller ikke selvom tempoet ser ud til at tillade det inden for rimelig tid.
- Hvis kørslen viser sig markant langsommere eller mere fejlbehæftet end forventet ud fra
  119's stikprøve (fx en stor andel sider der ikke består render-gaten, eller tegn på at
  siden blokerer/rate-limiter), STOP før timen er gået og rapportér i stedet for at
  fortsætte blindt — det hører under "Ved tvivl" nedenfor.

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
  databasen — test gerne dette eksplicit ved at stoppe og genstarte scriptet en gang under
  udviklingen, ikke kun i teorien.
- Bekræft at scriptet rent faktisk stopper sig selv omkring 1-timers-mærket uden at skulle
  dræbes udefra.

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

### Resultatnote — driftslog før fuld natlig kørsel

Beslutninger og målte pilotresultater er samlet i `statistik/results/120-national-spiller-scraper.md`. Efter afprøvning af 3, 5 og 10 parallelle processer fortsætter den faktiske kørsel med 3 processer, fordi 5 kun var ca. 10,5 % hurtigere end 3 og gav flere render-gate-fejl. Alle processer bruger disjunkte intervaller, separate browserprofiler og den separate `national-spillere.db`; de beskyttede normaliserede databaser røres ikke.

### Resultatnote — første fulde kørsel

Alle 203.012 kamp-ID’er er forsøgt. Slutstatus: 164.569 `ok`, 38.397 `no_player_links`, 46 `render_gate_failed`, 0 `fetch_error`; 76.169 spillere og 3.400.576 spiller-kamprelationer. Render-gate blev justeret til 15 sekunder, og teksten “kampnummer findes ikke” afslutter hurtigt uden at vente på timeout. De 46 resterende gate-ID’er er dokumenteret i `statistik/results/120-national-spiller-scraper.md` og i den separate `national-spillere.db`, så de kan genkøres senere. Tre parallelle processer blev brugt efter brugerens udtrykkelige godkendelse; fem og ti blev målt, men fravalgt fordi gevinsten var under 15 %. `gsb-statistik-normalized.db` og `liga-landskab.db` blev ikke skrevet til.

### Resultatnote — render-gate-listen afsluttet

De 46 tidligere render-gate-rækker blev genkørt. Alle viste “kampnummer findes ikke” og er nu klassificeret som `match_not_found`; den endelige render-gate-status er 0. Samlet slutstatus: 164.569 `ok`, 38.397 `no_player_links`, 46 `match_not_found`, 0 `fetch_error`, 76.169 spillere og 3.400.576 spiller-kamprelationer.

Afsluttende værn: `gsb-statistik-normalized.db` SHA-256 `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; `liga-landskab.db` SHA-256 `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`. Begge blev kun læst.
