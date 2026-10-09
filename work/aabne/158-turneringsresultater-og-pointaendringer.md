# Opgave 158 — turneringsresultater via eventtabellen, og passer pointændringer med kampe?

**Trin:** Bygger på 154 (version/dato-regel, eventtabel via `detail_links`) og 156. Lille undersøgelse. Ingen skrivning til databaser.

## Baggrund
- Christoffer oplyser: danske ranglistepoint **udløber ikke**. De er permanente, indtil spilleren har været inaktiv længe og skal genindsættes. Kun de allerbedste kan få point overskrevet (fx 5.000 til en nummer ét-herre). BWF og nogle udenlandske turneringer har udløb, men det er ikke den danske liste. Det er hans udsagn, ikke målt af os.
- Hvis det er rigtigt, ændrer en spillers point sig kun, når et resultat indberettes. Så er en pointændring mellem to versioner et tegn på, at spilleren har spillet. Det vil vi måle, ikke antage.
- 154 viste, at et `playerid`-svar har `detail_links` (post-ID), og at eventtabellen viser point ved kampen. Vi ved endnu ikke, hvilke felter eventtabellen har ud over point (fx turneringsnavn, dato, runde, modstander, resultat).

## Del A — eventtabel og turneringsoversigt (højst 40 kald)
1. **Eventtabellen.** For 5 spillere med kendte `detail_links` (fra `rangliste-point.db` eller 154's råsvar): åbn eventtabellen og skriv alle felter, antal rækker, og hvordan en række er opbygget (turnering, dato, række, disciplin, runde, modstander, resultat, point før/efter, ændring?). Skriv "ukendt", hvor det ikke kan afgøres. Gem rå svar.
2. **Hvilke begivenheder står der?** Kun turneringer? Også holdkampe (DH, ungdomsholdturnering)? Er 2025/26 og tidligere sæsoner med? Er pointændringen pr. kamp eller pr. turnering?
3. **Turneringsoversigt.** Findes der en offentlig turneringsoversigt på `badmintonplayer.dk` (fx under SportsResults), hvor man kan få alle turneringer og deres resultater i stedet for at gå via spillere? Skriv rute, parametre og hvad den giver. Kør højst 5 kald.
4. **Nembadminton.** Har `app.nembadminton.dk/graphql` forespørgsler om turneringer og turneringsresultater? Brug introspektion eller allerede kendte forespørgsler i repoet (`statistik/API_RESEARCH.md`). Højst 5 kald. Hvis introspektion er slået fra, så skriv det og stop.
5. **Hvor vi kan finde vinderen af en turneringskamp.** Skriv, hvilken kilde der har modstander og resultat, og om modstanderens spiller-ID er med.

## Del B — passer pointændring med kampe? (højst 500 kald)
1. **Udvalg.** 10 GSB-spillere (blandet alder og køn, mindst 3 der har spillet turneringer, mindst 2 der kun spiller holdkampe) fra `rangliste-point.db`/`national-spillere.db`.
2. **Versioner.** For hver spiller: `playerid`-opslag på liste 288 (eller den liste, spilleren står på) for alle mandagsversioner i 2025/26 (cirka 52, brug kalenderen fra 153/154). 10 spillere × 52 versioner = ca. 520 kald; skær ned til højst 500 ved at tage færre spillere eller droppe versioner uden for sæsonen.
3. **Sammenlign.** For hver spiller: ugens pointændring mod eventtabellens rækker i samme interval. Tæl: (a) uger med pointændring og matchende event, (b) uger med pointændring uden event, (c) uger med event uden pointændring (fx kamp uden effekt), (d) uger uden begge. Pointændring uden event kan være genindsættelse, rettelse eller tabte point; gæt ikke, skriv de enkelte tilfælde.
4. **Konklusion.** Er "pointændring = spillet" rimelig at bruge som aktivitetsmål? Hvor mange falske positive og negative? Er der tilfælde, hvor point falder, og hvorfor (forklar med eventtabellen, ikke antagelser)?
5. **Fravær.** Findes der spillere, der forsvinder fra listen (nul rækker) og vender tilbage? Skriv, hvilke og hvordan det ser ud i data. Ingen nulpunkter.

## Del C — anbefaling
Skriv kort: er ugentlig hentning relevant, for hvilken gruppe (GSB-ungdom, kommende modstandere), med hvilken metode (`playerid` pr. uge eller fuldt snapshot) og et kaldtal pr. uge og pr. sæson. Skriv også, hvordan turneringsresultater bedst hentes (via spillere, via en turneringsoversigt eller via Nembadminton).

## Netværksregler
- Højst **545 kald i alt** (40 i Del A, 500 i Del B, 5 reserve), sekventielt, mindst 2,1 sekunder, backoff ved 429/5xx, stop ved 3 fejl i træk eller botværn. Kun `badmintonplayer.dk` og `app.nembadminton.dk/graphql`. Hent ny kontekstnøgle (GET `/DBF/Ranglister/`), når den udløber.
- Ingen login, cookies, CAPTCHA eller samtykkeklik. Ved botværn: stop og skriv det i "Spørgsmål".
- Gem rå svar uden kontekstnøgle i `statistik/results/158-raa-svar/` (komprimeret, under ca. 50 MB; ellers kun hash og de første tre svar pr. spiller).
- Alle databaser åbnes readOnly. Ingen skrivning.

## Output
- `statistik/scripts/158-turneringer.mjs`
- `statistik/results/158-turneringer.md` (Del A–C, tabeller, forespørgselslog)
- `statistik/results/158-turneringer.json`
- `statistik/results/158-raa-svar/`

## Kontrol
- **Målet:** Eventtabellens felter er beskrevet med eksempler. Del B giver for hver af de 10 spillere en tabel over uger med/uden pointændring og event. Del C har en anbefaling med kaldtal.
- **Værnet:** Højst 545 forespørgsler (tallet står i loggen, hver med hash). Alle databasers SHA-256 uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E, `rangliste-point.db` DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9). `git diff --check` uden fejl.
- **Skøn:** Tre konkrete turneringer (navn, dato, spiller, pointændring), som Christoffer kan slå op på den offentlige side.

## Afgrænsning
- Kun 2025/26 og 10 spillere. Ingen bulkhentning, ingen databaseskrivning, ingen artifact.
- Ret ikke 136-parseren, 143–157-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke på, hvorfor point ændrer sig.

## Gren
`arbejde/158-turneringer`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
- Det første GET-forsøg har ikke bevaret status/bytes/hash, fordi den daværende kode kastede før logskrivning. Nyt GET-svar viste, at den gamle brede regex ramte `CAPTCHA` som del af `RECAPTCHA_SITE_KEY`; ingen tydelig udfordringsside-markør blev fundet, ja SR_CallbackContext blev fundet, og efterfølgende POST-kald lykkedes. Dette forklarer falsk alarmen stærkt, men præcis gammel svartekst kan ikke genskabes.
- Ingen af de fem undersøgte profiler havde kun holdkamprækker: alle havde både turnerings- og holdkamprækker. 154-materialet og de udvalgte profilopslag afgør ikke, om en spiller findes, som kun spiller holdkampe.
- Eventtabellen viser et `Point`-felt, men ikke point før/efter eller delta. Om tallet gælder pr. kamp eller samlet pr. turnering, og om tidligere sæsoner indgår, kan ikke afgøres fra de fem svar.

## Tilbagefald
Slet de nye filer, inklusive `158-raa-svar/`. Ingen database er berørt.

## Resultat
**Del A udført.** Fem eventtabeller: Josefine Bille-Ahmt (42 rækker), Benjamin Hinge Carlsson (31), Louis Valdemar Hedegaard Toftlund (46), Theodor Lumby Jessen (63) og Anna Rudolph (56), i alt 238. Heraf 180 turneringsrækker, 48 holdkamprækker, 5 systemrækker og 5 med ukendt linktype. Tabellen viser Dato, Turnering/Holdkamp, Spillere, Point og en tom indikatorcelle; runde, modstanderrolle, resultat og pointdelta er ikke felter i tabellen. Alle fem havde både turnerings- og holdkamprækker.

Samlet 4 netværkskald på badmintonplayer.dk: det tidligere afbrudte GET (status/bytes/hash ukendt), et nyt GET (HTTP 200) og to POST (begge HTTP 200; de to redigerede svarhashes var forskellige). Det nye GET viste, at den gamle løse regex matchede `CAPTCHA` inde i `RECAPTCHA_SITE_KEY`, ikke en challenge. Ingen GraphQL-kald; tournament overview/GraphQL-konklusioner bygger på eksisterende gemt evidens. Del B og Del C er ikke kørt. Alle fem databasehashes før/efter er uændrede, og `git diff --check` bestod. Kortet bliver i `work/aabne/`.
