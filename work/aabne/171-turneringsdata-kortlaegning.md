# Opgave 171 — turneringsdata fra badmintonplayer.dk, Del A: kortlægning uden netværk

**Trin:** Forberedelse til at hente turneringskampe (modstander, resultat, runde) fra badmintonplayer.dk. Bygger på 081, 154, 158 og 158b. **Ingen netværkskald i dette kort.**

**Netværk:** ingen

## Gren
`arbejde/171-turneringsdata-kortlaegning`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Christoffer har besluttet (2026-10-09): vi må hente åbent fra badmintonplayer.dk. Der findes ingen API-nøgle fra Badminton Danmark, og vi bruger ingen. Al information er offentligt tilgængelig uden login. Hentning sker i moderat takt (se kort 162).
- 158/158b viste: eventtabellen på en spillers profil er en tidsserie af spillerens egne point, med et link pr. række, fx `/DBF/Turnering/VisResultater/#113413,` for turneringer og `HoldTurnering/Stilling`-links for holdkampe. Pointværdien er standen FØR eventet. Eventtabellen har ikke modstander, resultat eller runde.
- 081 fandt tre turneringskald i webservicen: `GetTournamentEvents` (med `tournamentclassid`), `SearchTournamentMatches` (med `tournamentclassid` og `tournamenteventid`; giver spiller-ID'er, sætscore, runde som "Finale" og W.O.), og `SearchTournamentClass`, som gav HTTP 500 i tre forsøg. Beviset findes i `statistik/results/081-route-probe.json`, `081-webservice-catalog-probe.json` og `tournament-reference-115342.md`.
- Ukendt: om tallet efter `#` i et eventlink er det samme som `tournamentclassid`, hvordan man finder alle turneringer i en sæson, og hvilke parametre `SearchTournamentClass` forventer.
- Siden `/DBF/Ranglister/` indeholder Cookiebot (`data-blockingmode="auto"`) og reCAPTCHA-konfiguration. Webservicekaldene har alligevel virket uden samtykkeklik og uden CAPTCHA (154–161). Det er ikke et stopsignal i sig selv, men vi klikker, løser og omgår intet.

## Mål
1. **Turneringer set i eventtabeller.** Læs alle gemte eventtabeller: 154's råsvar, `statistik/results/158-raa-svar/` og `statistik/results/158b-raa-svar/` (både `cached-*`, `event-*` og `genbrugt-*`, gz). Udtræk hvert unikt turnerings- og holdkamp-link. Lav `171-turneringer-fra-eventtabeller.csv` med: link-id (den rå streng efter `#`), linktype (`VisResultater` eller `HoldTurnering`), navn, første og sidste dato, antal profiler og antal rækker, hvor den er set. Skriv antal unikke, fordelt på type og måned.
2. **ID-model.** Læs 081's gemte svar og `tournament-reference-115342.md`. Afgør ud fra evidens og skriv "ukendt" hvor det ikke kan afgøres: er id'et efter `#` i et `VisResultater`-link en turnering, en klasse eller en begivenhed? Er det samme slags tal som `tournamentclassid` i 081 (115342)? Hvilke id-typer findes (turnering, klasse, event, kamp), og hvordan hænger de sammen? Sammenlign talområder (115342 mod 113413 og 114741 osv.).
3. **Webservice-katalog.** Find i gemte filer alle metoder og parametre, der handler om turneringer: `statistik/results/081-webservice-catalog-probe.json`, siden `statistik/results/149-raa-svar/01-rangliste-page-redacted.html`, `statistik/results/158-raa-svar/kald-002-get.txt.gz` og eventuelt andre gemte HTML-sider. Lav en tabel: metode, URL, parametre, set i hvilke filer, status fra 081 (200/500). Udtræk også alle `<script src=...>`-adresser fra den gemte HTML, så et senere kort ved, hvilke JavaScript-filer der skal hentes for at se de rigtige parametre (`SearchTournamentClass`).
4. **Kampfelter.** Beskriv ud fra `tournament-reference-115342.md` og gemte svar, hvad `SearchTournamentMatches` giver pr. kamp: felter, spiller-ID (BadmintonID eller andet), klub, sætscore, runde, W.O.-markering, disciplin. Vis én eksempelrække. Skriv, om modstanderens spiller-ID er med.
5. **Overlap-test uden netværk.** Hvor mange af turnerings-id'erne fra punkt 1 findes også i 081's gemte svar eller i andre gemte turneringssvar? Hvis der er overlap: sammenlign antal rækker for en spiller i eventtabellen med antal kampe i det gemte svar for samme turnering. Hvis der ikke er overlap: skriv det, og skriv det som et resultat.
6. **Plan for næste kort (netværk).** Foreslå konkret, men uden at køre: (a) rækkefølgen af højst 20 kald til Del B, med metode, parametre, forventet svar og stopkriterium. Første kald er `robots.txt`; derefter de nødvendige JavaScript-filer; derefter tre kendte turneringer (vælg tre fra punkt 1, hvor vi kender GSB-spillerne, og skriv navn, dato og link-id), (b) hvad der skal til for en komplet turneringsoversigt (Del C), (c) hvad vi mangler for at se, om pointændring følger af kampene (Del D), (d) en overslagspris i kald for alle turneringer med GSB-spillere i en sæson.

## Afgrænsning
- **Må røres:** de nye filer nedenfor.
- **Må ikke røres:** 136-parseren, `143`–`161`, `158*`, `statistik/data/`, regelbogen, `apps/netlify-prod/`, `docs/BESLUTNINGER.md`. Databaser åbnes read-only (`mode=ro`, `PRAGMA query_only=ON`).
- **Ingen netværkskald**, heller ikke til `robots.txt`. Alt kortlægges ud fra gemte filer.
- Gæt ikke. Skriv "ukendt" og gem evidensen (filnavn, uddrag).

## Output
- `statistik/scripts/171-turneringsdata-kortlaegning.mjs`
- `statistik/results/171-turneringsdata-kortlaegning.md` (punkt 1–6, tabeller, eksempler)
- `statistik/results/171-turneringsdata-kortlaegning.json`
- `statistik/results/171-turneringer-fra-eventtabeller.csv`

## Kontrol
- **Målet:** punkt 1–6 besvaret med tal og tabeller. Antal unikke turnerings- og holdkamp-id'er står i rapporten. ID-modellen er enten beskrevet med evidens eller markeret "ukendt".
- **Værnet:** de fem databasers SHA-256 uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E, `rangliste-point.db` DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9; sammenlign uden hensyn til store/små bogstaver). Nul netværkskald (skriv tallet 0 i rapporten). `git diff --check` uden fejl. `git status --short statistik/data/` tom.
- **Skøn:** tre konkrete turneringer (navn, dato, link-id, en GSB-spiller, antal rækker), som Christoffer kan slå op på den offentlige side.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang** (uden for sandboxen); Christoffer godkender hver gang. Stop ikke, fordi den almindelige shell fejler (se `AGENTS.md`, afsnittet om Codex på Windows). Kan du heller ikke køre med forhøjet adgang, så stop og skriv det i Spørgsmål. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Skriv i "Spørgsmål".

## Spørgsmål
- Hvilken konkret turneringssøge-side/component kalder `SearchTournamentClass`, og hvilke argumentværdier bruger den? Det fremgår ikke af de gemte HTML-/JS-uddrag.
- Er link-id'erne `113413` og `114741` altid `tournamentclassid`? Det er kun direkte bekræftet for `115342`.
- Er offentlige `VisSpiller/#...`-id'er formelt BadmintonID, og hvad betyder alle felter i holdturnerings-hash-id'et? Ukendt ud fra gemt evidens.
- Komplet sæsonoversigt kan ikke estimeres uden fungerende klasse-enumeration og antal events pr. klasse.

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
Del A gennemført på `arbejde/171-turneringsdata-kortlaegning`; gren ikke skiftet. Ingen netværkskald (0). Gennemgået 4.348 gzip-filer; fundet 45 profil-eventtabeller, 20 unikke profiler, 738 deduplikerede rækker og 269 links: 133 `VisResultater` (529 rækker) og 136 `HoldTurnering` (209 rækker). CSV, JSON, rapport og reproducerbart Node-script er oprettet som angivet i Output. Gemte matchresultater for klasse 115342 overlapper med 0 eventlink-id'er.

De fem database-SHA-256 matcher alle kortets forventninger. `git diff --check` gav ingen whitespacefejl (Git viste kun en LF/CRLF-advisory for kortfilen); `git status --short statistik/data/` var tom. Ingen database eller afgrænset kildefil er ændret. Ikke staged, committed eller pushed.
