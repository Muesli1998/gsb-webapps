# Opgave 190 — hente-biblioteket: pause og kaldloft ved genforsøg

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10.
**Kategori:** statistik · **Bølge:** 0 · **Afhænger af:** 162 (færdig) · **Netværk:** ingen

**Trin:** Retter to fejl i `statistik/scripts/lib/hent.mjs` fra kort 162, før noget kort (163 og frem) bruger biblioteket. Fundet i gennemlæsning af Claude 2026-10-10.

## Gren
`arbejde/190-hent-genforsoeg`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
I `opretKlient().perform()` gælder i dag, når et svar er 429 eller 5xx:
1. **Pausen er for kort.** Ventetiden før et genforsøg er `1000 × forsøgsnummer` ms (1 s, 2 s), men den fælles minimumspause mellem to anmodninger er `minPauseMs = 2100` ms. Et genforsøg kan altså sendes hurtigere end vores egen regel om moderat takt, og netop efter en 429 er det det værste tidspunkt.
2. **Genforsøg tæller ikke med i kaldloftet.** Loftet tjekkes kun én gang pr. `post`/`hentKontekst`, og `count` stiger kun med 1, selv om der er sendt op til 3 anmodninger. Et loft på 20 kan derfor give op til 60 anmodninger. Kun det sidste svar bliver gemt og logget; de første 429/5xx-svar forsvinder.
3. Den eksisterende test d) fastlåser fejlen: den kræver, at der ventes præcis `1000` ms. Den skal rettes.

Regler fra `statistik/AGENTS.md` ("Standardregler for kort der henter data") og kort 162 gælder uændret: logning før parsing, smal stopregel, stop ved 3 fejl i træk, redigering af kontekstnøglen.

## Mål
Ret `statistik/scripts/lib/hent.mjs` og `statistik/scripts/lib/hent.test.mjs`. Offentlige navne og signaturer ændres ikke.

1. **Hver afsendt anmodning er ét kald.** Også genforsøg. Hver afsendt anmodning:
   - tæller i `antalKald` og i kaldloftet (`tidligereKald` + denne kørsels afsendte anmodninger må ikke overstige `loft`),
   - tjekkes mod loftet FØR den sendes (kast `Kaldloft overskredet (...)`, send ikke),
   - gemmes redigeret som sit eget `call-NNN.json.gz` med fortløbende nummer,
   - får sin egen linje i `calls.jsonl`, med HTTP-status og et felt `retry` (0 for første forsøg, 1 og 2 for genforsøg).
2. **Pause før hvert genforsøg:** mindst `max(minPauseMs, 1000 × genforsøgsnummer)` ms regnet fra forrige anmodnings afsendelse, så to anmodninger aldrig er tættere end `minPauseMs`. Brug de indsatte `sovFn` og `nowFn`, så det kan testes uden ventetid.
3. **Antal forsøg uændret:** højst 3 anmodninger pr. kald (første forsøg + højst 2 genforsøg) ved 429/5xx, som i dag. Er det sidste svar stadig 429/5xx, tælles det som fejl som før (stop ved 3 fejl i træk).
4. **Hashkontrollen ("filteret virker ikke") må kun se på svar med status 200.** Ellers kan to forskellige anmodninger, der begge får samme 429-tekst, give en falsk fejl.
5. **Tests i `hent.test.mjs`:**
   - ret d) så den ikke fastlåser 1000 ms, men kontrollerer, at genforsøget kommer efter mindst 2100 ms (brug `nowFn` og `sovFn` som i test i),
   - m) genforsøg logges: efter 429 + 200 står der to linjer i `calls.jsonl` (status 429 med `retry` 0, status 200 med `retry` 1) og to `call-NNN.json.gz`,
   - n) genforsøg tæller i loftet: med `loft: 2` og to 429-svar sendes der netop 2 anmodninger, og den tredje kastes `Kaldloft` FØR afsendelse,
   - o) to forskellige anmodninger med samme 429-tekst giver IKKE "filteret virker ikke",
   - p) `antalKald` efter 429 + 200 er 2.
   Alle de gamle tests (a–l) skal stadig bestå.

## Afgrænsning
- **Må røres:** `statistik/scripts/lib/hent.mjs`, `statistik/scripts/lib/hent.test.mjs` og dette kort (kun Spørgsmål og Resultat).
- **Må ikke røres:** alt andet, herunder `statistik/data/`, `statistik/HASHES.txt`, `tools/tjek/`, `tools/koer-kort.ps1`, `.gitattributes`, `apps/netlify-prod/`, `docs/BESLUTNINGER.md`, rodens `AGENTS.md`.
- Ingen netværkskald (alt køres med falsk `fetchFn`). Ingen nye pakker.

## Kontrol
- **Målet:** `node --test statistik/scripts/lib/hent.test.mjs` består, alle gamle tests plus nye m–p; antallet af tests står i rapporten. Koden viser, hvor pausen og loftet tjekkes ved genforsøg (angiv linjenumre i rapporten).
- **Værnet:** `node tools/tjek/db-hashes.mjs` afslutter med kode 0 (fem "ja"). `git status --short` viser kun de to filer og dette kort. `git diff --check` uden fejl. Nul netværkskald.
- **Skøn:** (vurdering) om ændringen ændrer noget for kald, der lykkes første gang (det skal den ikke).

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke. Hvis noget i kortets beskrivelse af den nuværende kode viser sig ikke at passe, så skriv hvad du fandt, og ret ud fra det.

## Spørgsmål
Ingen. Kortets beskrevne fejl passede med den fundne implementering.

## Tilbagefald
Gendan `statistik/scripts/lib/hent.mjs` og `hent.test.mjs` fra `main` (`git restore`). Ingen database er berørt.

## Resultat
`hent.mjs` logger og gemmer hvert HTTP-svar separat; genforsøg tæller med i `antalKald` og kontrolleres mod loftet før afsendelse. Pausen før hvert efterfølgende forsøg beregnes fra forrige afsendelse. Hashkontrollen bruger kun status 200. `hent.test.mjs`: 16/16 tests bestået (a–p). Pauseberegning: `hent.mjs:116–117`; loftstjek før afsendelse: `hent.mjs:119`.

Kontroller: `node tools/tjek/db-hashes.mjs` exit 0, fem ja; `git diff --check` exit 0; `git status --short` viste kun `hent.mjs`, `hent.test.mjs` og dette kort. Ingen netværkskald; tests brugte falsk `fetchFn`. Vurdering: første-gangs succes ændrer ikke funktionelt forløb, men tæller nu ét kald og gemmes særskilt som specificeret.
