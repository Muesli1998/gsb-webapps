# Opgave 082 — kortlæg hele API-overfladen på badmintonplayer.dk

**Trin:** Ren opdagelse/undersøgelse, udsprunget af opgave 081 (liga-landskab-kataloget). Ikke en del
af 081's scope, men et selvstændigt grundlag for evt. fremtidige kort (turneringsresultater,
ranglistehistorik) — se `work/aabne/081-statistik-alle-ligaer-landskab-katalog.md` for baggrund om
hvordan `WebService1.asmx` og `/api/AgeGroup/Get`/`/api/Region` blev fundet.

**Gren:** `arbejde/082-api-overflade-kortlaegning`, jf. `AGENTS.md`.

**Baggrund:** Under opgave 081 blev det opdaget at badmintonplayer.dk har mindst to forskellige
API-stile: `WebService1.asmx` (43 eksponerede metoder, fundet via `/WebService1.asmx/js`) og en
separat REST-stil (`/api/AgeGroup/Get`, `/api/Region`). Kun `.asmx`-referencer er systematisk
undersøgt indtil nu (fire sidetyper blev gennemgået for `.asmx`-referencer). `/api/...`-ruter er
IKKE undersøgt bredt — de blev kun fundet ved et tilfælde. Christoffer vil vide om der findes flere
API-ruter, særligt til turneringsresultater og ranglistepoint over tid, som kunne åbne op for
billigere udtræksruter på samme måde som `GetLeagueStanding` gjorde for ligaer.

## Mål

1. Besøg de forskellige sidetyper på badmintonplayer.dk — Holdturnering/Stilling,
   Turnering/VisResultater, Spiller/VisSpiller, Ranglister, og evt. andre sektioner tilgængelige fra
   forsiden/menuen — og log ALLE netværkskald (XHR/fetch) hver side laver, ikke kun de allerede
   kendte. Brug browserværktøj med netværksovervågning, ikke gæt ud fra sidens HTML alene.
2. List alle unikke endpoint-mønstre (både `.asmx`-metoder og `/api/...`-ruter), med hvilken
   sidetype de blev observeret på.
3. For nye/uafprøvede endpoints: afprøv kort med et testkald og vurdér om de kan ENUMERERE data over
   tid (fx alle turnerings-ID'er for en sæson, eller ranglistepoint-historik for en kendt spiller på
   forskellige datoer) — ikke kun slå op på et allerede kendt ID. Det er den type rute der reelt
   sparer os for dyr iteration.
4. Læs de eksisterende, endnu ubearbejdede probefiler i `statistik/results/`: `ranking-points-2026.json`,
   `ranking-versions-2026.json`, `ranking-mix-2026.json`, `player-ranking-links-2026.html`,
   `historical-ranking-call.txt`, `historical-ranking-ids.txt`, `historical-test-summary.json`.
   Rapportér hvad de faktisk viser — antag ikke de er ubrugelige uden at have læst dem.

## Kontekst

Se `statistik/CODEX_EXTRACTION_SKILL.md` for den eksisterende dokumenterede API-viden, og
`work/aabne/081-statistik-alle-ligaer-landskab-katalog.md`s "Spørgsmål"-afsnit for hvordan
`GetLeagueStanding`-ruten blev fundet og bekræftet — samme fremgangsmåde (browser + netværkslog, ikke
gæt ud fra endpoint-navne) skal bruges her.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/082-api-overflade-kortlaegning.md` + evt.
`.json`), nye probe-scripts under `statistik/scripts/`, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/liga-landskab.db` (opgave 081's separate datasæt — denne opgave er ren opdagelse, ikke
udtræk), `apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`.

## Kontrol

**Målet:**
```
Den fulde liste af observerede endpoints (både .asmx og /api/...) er dokumenteret, med hvilken
  sidetype de blev fundet på og et faktisk testkald/svar for hvert nyt/uafprøvet endpoint.
For hvert endpoint der ser ud til at kunne enumerere data over tid: en konkret vurdering (kan det
  eller kan det ikke), ikke en antagelse ud fra navnet.
De 7 eksisterende ranglisteprobefiler er læst og deres indhold rapporteret.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/ apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen fuld/masse-indsamling af data er sat i gang — kun opdagelse og enkeltstående testkald.
```

**Skøn:** ingen på om et endpoint reelt kan enumerere data — det skal bevises med et testkald og
faktisk svar, ikke antages ud fra endpoint-navnet.

## Ved tvivl

Er det uklart om et fundet endpoint kan bruges til noget nyttigt uden mange flere testkald end
rimeligt for en opdagelsesfase: stop og rapportér det som "lovende, kræver yderligere undersøgelse" i
stedet for selv at afgøre om det er værd at forfølge — det er en prioriteringsbeslutning, ikke en
teknisk afklaring.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
