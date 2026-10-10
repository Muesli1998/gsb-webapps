# Opgave 162 — fælles hente-bibliotek, standardregler og hash-tjek

**Trin:** Værktøj til alle fremtidige hentekort. Bygger på erfaringerne fra 158 og 158b. Ingen netværkskald i dette kort.

**Netværk:** ingen

## Gren
`arbejde/162-hente-bibliotek`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
Tre fejl kostede tid i 158/158b, og alle tre lå i kortenes egne scripts, ikke i kilden:
1. En for bred stopregel (`/captcha|robot check|.../` på hele sidens tekst) standsede kørslen på en helt almindelig side, fordi HTML'en indeholder ordet `RECAPTCHA_SITE_KEY`. Siden indeholder også Cookiebot og reCAPTCHA-konfiguration (set i 149 og 158), men det er ikke en blokering: de samme sider svarede HTTP 200 og gav data.
2. Status, bytes og hash for et kald blev først logget efter parsing og kontrol. Da kørslen stoppede, manglede loggen for kald 1 og kald 207.
3. `state.json` (ca. 580 KB) blev omskrevet i sin helhed efter hvert kald med `writeFileSync`. På Windows fejlede én skrivning med `UNKNOWN: unknown error, open` (sandsynligvis en kortvarig fil-lås; ikke bevist), og kørslen stoppede.

Christoffer har besluttet (2026-10-09, se `docs/BESLUTNINGER.md`): vi må hente åbent fra badmintonplayer.dk. Der findes ingen API-nøgle fra Badminton Danmark, og vi bruger ingen. Hentning sker i moderat takt.

## Mål
1. **Bibliotek `statistik/scripts/lib/hent.mjs`** (ren Node, ingen nye pakker) med disse dele:
   - `skrivAtomisk(sti, indhold)`: skriv til `<sti>.tmp` i samme mappe, omdøb derefter over målfilen. Genforsøg op til 6 gange med stigende ventetid (150 ms x forsøgsnummer) ved EPERM, EBUSY, EACCES og UNKNOWN. Kaster først efter sidste forsøg.
   - `tilfoejLinje(sti, objekt)`: tilføj én JSON-linje til en `.jsonl`-fil, med samme genforsøg.
   - `opretKlient({ mappe, loft, tidligereKald, minPauseMs = 2100, fetchFn, sovFn })`: giver `hentKontekst()` (GET `/DBF/Ranglister/`, udtræk `SR_CallbackContext`) og `post(metode, krop, label)` (POST til `.../WebService1.asmx/<metode>`). `fetchFn` og `sovFn` kan indsættes, så alt kan testes uden netværk og uden ventetid.
   - **Rækkefølgen i hvert kald:** 1) vent min. `minPauseMs` siden forrige kald, 2) tjek kaldloftet (`tidligereKald` + denne kørsels kald må ikke overstige `loft`; kast FØR anmodningen sendes), 3) send, 4) gem det redigerede råsvar som `call-NNN.json.gz` (komprimeret), 5) append en linje til `calls.jsonl` med nr., tidspunkt, metode, label, felter uden kontekstnøgle, HTTP-status, bytes, SHA-256 af det redigerede svar og filnavn, 6) først DEREFTER stopregel og parsing.
   - **Redigering:** `SR_CallbackContext` og `callbackcontextkey` fjernes fra alt, der gemmes.
   - **Stopregel (`vurderSvar`)** som ren funktion, der returnerer `{ stop, aarsag, uddrag }`. Stop kun hvis: (a) HTTP-status er ikke 200 og ikke 429/5xx (429/5xx giver backoff og højst 3 genforsøg, derefter tælles de som fejl), (b) et GET af `/DBF/Ranglister/` mangler `SR_CallbackContext`, (c) svaret indeholder en tydelig udfordringsside: `challenge-platform`, `Just a moment`, `verify you are human`, `Attention Required`, eller en `<form>` med `g-recaptcha-response` som synligt krav. Ordene `captcha`, `recaptcha`, `Cookiebot` og `robot` alene er IKKE stopårsager. Stoppes der, skal årsagen og ca. 200 tegn omkring matchet logges (uden kontekstnøgle), og svaret skal være gemt.
   - **Stop ved 3 fejl i træk.**
   - **Hashkontrol:** `sammenlignForsteTo(label)`; når to kald med forskellige parametre giver identisk hash, kastes en fejl med teksten "filteret virker ikke". Brug case-ufølsom sammenligning af hashes.
   - **Genoptagelse:** `genoptag(mappe, validerFn)` læser `calls.jsonl` og de gemte filer og returnerer de labels, der allerede har et gyldigt gemt svar (valideret med den `validerFn`, som kortet leverer). Findes `state.json` ikke eller er den ødelagt, skal alt kunne genskabes ud fra `calls.jsonl` og råfilerne.
   - **Checkpoint:** `state.json` skrives højst hvert 10. kald og ved afslutning, og altid med `skrivAtomisk`. En fejl i checkpointet stopper ikke kørslen, så længe `calls.jsonl` kan skrives; fejlen logges som advarsel.
2. **Test `statistik/scripts/lib/hent.test.mjs`** kørt med `node --test`, med falsk `fetchFn` og falsk `sovFn`. Mindst disse tilfælde:
   a) et svar logges i `calls.jsonl`, selv om parsingen bagefter kaster en fejl,
   b) `skrivAtomisk` lykkes efter 3 simulerede EBUSY,
   c) `skrivAtomisk` kaster efter 6 simulerede EBUSY, og `calls.jsonl` er stadig intakt,
   d) 429 giver backoff og derefter 200,
   e) en side med `RECAPTCHA_SITE_KEY` og Cookiebot giver IKKE stop,
   f) en side med `challenge-platform` giver stop med årsag og uddrag,
   g) to forskellige anmodninger med identisk svarhash giver stop,
   h) kaldloftet overskrides ikke: kastes FØR anmodningen sendes,
   i) pausen mellem kald er mindst 2100 ms (kontrolleret via den falske `sovFn`),
   j) genoptagelse springer færdige labels over og gentager ødelagte,
   k) kontekstnøglen står ikke i nogen gemt fil,
   l) de tre rigtige gemte GET-svar `statistik/results/158-raa-svar/kald-002-get.txt.gz`, `statistik/results/149-raa-svar/01-rangliste-page-redacted.html` og et GET-svar fra `statistik/results/158b-raa-svar/` giver ikke stop. (Her mangler kontekstnøglen allerede, fordi den er redigeret ud; test derfor `vurderSvar` med en indstilling, der ikke kræver nøglen for netop disse tre filer, og skriv det i testen.)
3. **`.gitattributes`** i repo-roden med præcis to linjer: `*.gz binary` og `*.db binary`. Tilføj INGEN regler om linjeskift (`eol`/`text`). Bekræft med `git status --short`, at ingen eksisterende filer bliver markeret som ændret.
4. **Hash-tjek:** opret `statistik/HASHES.txt` (en linje pr. database: `<SHA-256>  <filnavn>`) med de fem hashes fra Kontrol/Værnet, og `tools/tjek/db-hashes.mjs`, som læser `HASHES.txt`, beregner SHA-256 af hver database (find sti under `statistik/data/`; ligger en anden et andet sted, så brug den fundne placering og skriv det), sammenligner uden hensyn til store/små bogstaver, udskriver en tabel og afslutter med kode 1 ved afvigelse.
5. **Standardregler i `statistik/AGENTS.md`:** nyt afsnit `## Standardregler for kort der henter data` (højst ca. 40 linjer), placeret før `## Hemmeligheder`. Indhold: kør kommandoer med forhøjet adgang (henvis til rodens `AGENTS.md`-afsnit om Codex på Windows); brug `lib/hent.mjs`; logning før parsing; den smalle stopregel og hvorfor (RECAPTCHA_SITE_KEY og Cookiebot er ikke blokeringer); hashkontrol efter de to første kald med forskellige parametre; kaldloft regnes ud før start og står i rapporten; ingen login, cookies, CAPTCHA eller samtykkeklik; databaser read-only med `tools/tjek/db-hashes.mjs` til sidst; efterprøv eget resultat før rapport (henvis til rodens afsnit); at vi må hente åbent fra badmintonplayer.dk uden API-nøgle (Christoffers beslutning 2026-10-09).

## Afgrænsning
- **Må røres:** de nye filer ovenfor og `statistik/AGENTS.md` (kun det nye afsnit).
- **Må ikke røres:** eksisterende scripts (`143`–`161`, `158*`, `call-ranking-*.mjs`), `statistik/data/`, 136-parseren, regelbogen, `apps/netlify-prod/`, `docs/BESLUTNINGER.md`, rodens `AGENTS.md`.
- Ingen netværkskald. Ingen omskrivning af gamle scripts til det nye bibliotek (det er et senere, eget kort).

## Kontrol
- **Målet:** `node --test statistik/scripts/lib/hent.test.mjs` består, alle tilfælde a–l, og antallet af tests står i rapporten. `node tools/tjek/db-hashes.mjs` afslutter med kode 0 og viser fem "ja". `statistik/AGENTS.md` har det nye afsnit. `.gitattributes` har kun de to linjer.
- **Værnet:** de fem databasers SHA-256 uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E, `rangliste-point.db` DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9). `git status --short` viser kun nye filer og `statistik/AGENTS.md`. `git diff --check` uden fejl. Nul netværkskald.
- **Skøn:** (vurdering) om afsnittet i `statistik/AGENTS.md` er kort og tydeligt nok til, at et nyt kort kan nøjes med at skrive "følg standardreglerne".

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke på, hvordan en gammel kontrakt (felter, URL'er) ser ud: læs `158b-pointaendring-vs-kampe.mjs` og `158-turneringer.mjs` og genbrug deres kald.

## Spørgsmål
Ingen åbne spørgsmål. `.gitattributes` fandtes allerede med otte regler; den blev ændret til de krævede præcis to linjer, så den står som ændret fil i `git status --short`.

## Tilbagefald
Slet de nye filer og det nye afsnit i `statistik/AGENTS.md`. Ingen database er berørt.

## Resultat
12 tests bestod (`node --test statistik/scripts/lib/hent.test.mjs`), herunder tilfælde a–l. Hashkontrollen afsluttede med kode 0; alle fem databaser viste `ja`, og de fundne filer ligger under `statistik/data/`. `git diff --check` afsluttede uden fejl. Ingen netværkskald blev foretaget.

`git status --short` viste `.gitattributes`, `statistik/AGENTS.md`, de nye `statistik/HASHES.txt`, `statistik/scripts/lib/` og `tools/tjek/db-hashes.mjs`. `.gitattributes` er ændret fra otte til præcis to krævede regler. Dette kort blev også udfyldt efter den udtrykkelige instruktion, selv om det ikke er nævnt i Afgrænsningen.

(Vurdering) Standardafsnittet er 11 linjer og samler de krævede hente-regler.
