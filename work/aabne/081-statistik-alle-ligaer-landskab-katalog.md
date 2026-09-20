# Opgave 081 — katalog over ALLE ligaer/turneringer i Nembadminton, 2010-2026 (ikke kun GSB)

**Trin:** Udvidelse af opgave 077 (liga-katalog), på Christoffers eksplicitte ønske efter at have set
077's resultat — se `statistik/results/077-liga-regelsaet-katalog.md`.

**Gren:** `arbejde/081-statistik-alle-ligaer-landskab-katalog`, jf. `AGENTS.md`.

**Baggrund:** Opgave 077 kortlagde kun de ligaer GSB selv har spillet i, fordi discovery-kæden i
`statistik/CODEX_EXTRACTION_SKILL.md` §1 er bygget klub-scoped (`clubId=1093`,
`badmintonPlayerTeams` → `badmintonPlayerTeamFights` → `badmintonPlayerTeamMatch`). Christoffer vil
nu have et bredere billede: alle ligaer/turneringer for alle sæsoner 2010-2026, uanset om GSB har
spillet i dem, for at kunne se landskabet af kreds-ligaer (distrikts-niveau) og nationale ligaer og
dermed bedre vurdere hvor GSB's egne hold ligger niveaumæssigt.

**Vigtigt:** dette er sandsynligvis IKKE bare "kør 077's metode uden klub-filter" — discovery-kæden er
bygget til at starte fra en klubs spillere/hold, ikke til at liste alle competitions i systemet.
Der findes muligvis allerede relevante undersøgelser af dette i `statistik/results/`:
`club-scan-2025.csv`, `club-scan-2025-summary.json`, `tournament-query-surface.json`,
`tournament-options-2025.json`, `tournament-clientcalls.txt`. Læs disse FØRST — de kan enten løse
problemet direkte eller vise hvorfor det ikke er ligetil.

## Mål

Todelt: først afklaring, så udtræk. Byg IKKE i stor skala før trin 1 er afklaret.

1. **Afklar ruten.** Undersøg om der findes en dokumenteret eller findbar GraphQL-forespørgsel (eller
   anden endpoint) i Nembadminton-API'et der lister alle competitions/turneringer for en given sæson
   uden at kræve et `clubId`-filter — evt. et kreds-/distrikts-niveau og et nationalt niveau hver for
   sig. Genbrug det der allerede er fundet i de nævnte `statistik/results/`-filer og i
   `CODEX_EXTRACTION_SKILL.md` før noget nyt probes. Hvis ingen sådan rute findes, og eneste
   mulighed er at iterere gennem alle kendte klub-ID'er (dyrt, langsomt, mange API-kald): STOP og
   rapportér under "Spørgsmål" i stedet for at sætte det i gang — det er en beslutning Christoffer
   skal tage, ikke noget der skal gættes sig frem til.
2. **Byg kataloget — kun hvis trin 1 finder en brugbar rute.** Samme struktur som 077's katalog, men
   uden GSB-filter: alle ligaer/turneringer pr. sæson 2010-2026, med navn (rå tekst), aldersgruppe
   hvis den kan udledes, kreds/distrikt hvis det kan udledes af kilden, og niveau-indikation KUN hvor
   det direkte kan læses af kildeteksten (samme regel som 077 — "niveau uafklaret ud fra kildetekst
   alene" er en gyldig værdi, gæt aldrig en rangordning). Marker eksplicit hvilke af disse ligaer GSB
   selv har hold i (krydsreference til 077's katalog), så det ene dokument kan bruges til at se GSB's
   hold i kontekst af det fulde landskab.
3. Noter at "KS" i rå liga-tekster betyder "Københavnsserien" (bekræftet af Christoffer) — dette er en
   navneforklaring, ikke en niveau-afgørelse; brug det til at gøre kataloget mere læsbart hvor
   forkortelsen forekommer, men det ændrer ikke om noget er "uafklaret" niveaumæssigt.

## Kontekst

Se `statistik/CODEX_EXTRACTION_SKILL.md` (særligt §1 og §9), `work/loeste/077-statistik-liga-regelsaet-katalog.md`
og dens resultatnote, og de eksisterende probe-filer nævnt ovenfor. GSB's `clubId` er 1093, men denne
opgave handler netop om at komme UDENFOR det scope.

## Afgrænsning

**Må røres:** nyt katalogdokument (`statistik/results/081-alle-ligaer-landskab-katalog.md` + evt.
`.json`), nye scripts under `statistik/` hvis nødvendige for probes/udtræk, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`, `docs/historik/`.

## Kontrol

**Målet:**
```
Trin 1's konklusion er eksplicit dokumenteret: enten "fundet rute: <beskrivelse + evidens>" eller
  "ingen brugbar rute fundet uden dyr iteration — se Spørgsmål".
Hvis trin 2 udføres: kataloget dækker eksplicit angivne sæsoner/kredse — list dækning og huller.
Hver liga-entry har kilde (URL/tidspunkt) og ingen har fået et gættet niveau.
Antal ligaer der er fundet men IKKE er i 077's GSB-katalog er talt op og rapporteret — det er selve
  pointen med opgaven (at se det bredere landskab).
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/ apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
```

**Skøn:** ingen på niveau-vurderinger. Skøn er tilladt på HVORDAN ruten i trin 1 findes (hvilke
probes der afprøves), men ikke på OM den findes — det skal være dokumenteret, ikke antaget.

## Ved tvivl

Kræver en fungerende rute at iterere gennem et stort antal ukendte klub-ID'er eller på anden måde
sende et stort antal API-kald (fx flere hundrede+): stop og rapportér omfanget under "Spørgsmål" —
lad Christoffer beslutte om det er værd at køre, i stedet for selv at vurdere det. Er det uklart om
en liga hører til en kreds/distrikt eller er national: marker "kreds/national uafklaret" i stedet for
at gætte.

### Spørgsmål

**Christoffers svar (2026-09-20):** Kør den dyre iteration, men gør det smartere og gem resultatet
permanent, så vi ikke skal hente det igen:

1. Da hver holdkamp involverer 2 hold og en pulje typisk ~8 hold, kan et opslag på ét kendt klub-ID
   sandsynligvis afsløre modstander-hold/-klub-ID'er i samme pulje "gratis". Før den fulde iteration
   sættes i gang: **bekræft med et lille antal testkald** om `badmintonPlayerTeamFights`/
   `badmintonPlayerTeamMatch`-svarene rent faktisk indeholder modstanderens klub-/hold-ID (ikke kun
   navn). Hvis ja: byg en graf-baseret ("smitte") traversal der starter fra alle allerede kendte
   klub-ID'er (GSB + de 1.159 fra `club-scan-2025.csv`) og opdager nye klub-ID'er via modstandere, i
   stedet for blindt at iterere alle mulige klub-ID'er for alle 16 sæsoner.
2. Rapportér et konkret estimeret antal API-kald for den fulde 2010-2026-kørsel MED denne genvej,
   sammenlignet med uden, FØR den fulde kørsel sættes i gang — skriv estimatet under et nyt
   "Spørgsmål"-svar og vent på godkendelse, hvis det stadig er i tusinde-kald-størrelsen.
3. Graf-traversal fra kendte klubber dækker ikke nødvendigvis alle klubber i landet (isolerede
   kredse/klubber GSB og de kendte klubber aldrig møder). Rapportér et estimat af hvor stor
   restdækning (klubber ikke fundet via traversal) forventes at være, og lad Christoffer beslutte om
   restdækningen skal findes via blind iteration eller accepteres som et hul.
4. Gem RESULTATET permanent i et NYT, separat datasæt under `statistik/` (fx
   `statistik/data/liga-landskab.db` eller en JSON/CSV-samling under `statistik/results/`) — IKKE i
   `statistik/data/gsb-statistik-normalized.db`, som er forbeholdt de faktiske GSB-kampdata. Formålet
   er at kunne genindlæse hele landskabet uden nye API-kald i fremtiden.

Oprindeligt spørgsmål (nu besvaret ovenfor):

Trin 1 er afklaret, men trin 2 er ikke startet: Der er ikke fundet en
brugbar, dokumenteret rute til at liste alle ligaer/turneringer pr. sæson
uden klubfilter.

Nembadminton GraphQLs eksisterende evidens viser kun `tournamentGroups` og
`tournamentTiers` som turneringsrelaterede felter. `tournamentGroups`-svaret
for 2025 er tomt; `tournamentTiers` returnerer 17 generelle tier-navne.

BadmintonPlayer-sporet er også gennemgået i den eksisterende evidens:
`GetTournamentEvents` er verificeret for den allerede kendte
`tournamentclassid=115342` og returnerer fem events; `SearchTournamentMatches`
er verificeret for den allerede kendte event `490920`. De er derfor opslag
fra et kendt turnerings-ID, ikke en sæsonliste. WebService-proxyen nævner
`SearchTournamentClass`, men der ligger ingen gemt, succesfuld kørsel,
parameterbeskrivelse eller sæson-enumeration for det kald, så det kan ikke
bruges som bevist rute uden at gætte.

Den eneste dokumenterede fallback er at iterere klubscoped
`badmintonPlayerTeams`. Den eksisterende 2025-scanning indeholder 1.159
klub-ID'er og 4.838 holdrækker (1.157 succesfulde klubkald og 2 fejl). En
fuld 2010–2026-scanning vil derfor kræve mindst mange hundrede og i praksis
flere tusinde API-kald, før overlap og sæsoner er dækket. Det er netop den
dyre iteration, som kortet siger skal godkendes særskilt.

**Beslutning kræves:** Skal jeg sætte den dyre klub-ID-/sæson-iteration i
gang, eller skal opgave 081 afsluttes som "ingen brugbar rute uden dyr
iteration"?

**Trin 1-testresultat (2026-09-20):** Graf-genvejen virker ikke på de
afprøvede svar. To `badmintonPlayerTeamFights`-kald (2010/pulje 417 og
2025/pulje 17963) returnerede `teams` som navnestrenge; ingen klub-/hold-ID.
Tre `badmintonPlayerTeamMatch`-kald blev prøvet; det ene succesfulde svar
(2020/kamp 388606) havde kun `home.name` og `guest.name`, mens to returnerede
`Internal server error`. Schema-introspection bekræfter:

- `BadmintonPlayerTeamFight`: `teams`, `matchId`, `gameTime`, `round`,
  `roundDate`.
- `ImportTeamMatch`: `home`, `guest`, `playingPlace`, `playingAddress`,
  `playingZipCode`, `playingCity`.
- `ImportTeam`: `name`, `leagueMatchId`, `side`, `squad`.
- `BadmintonPlayerTeam` har `clubId`, men kun i det allerede klubscopede
  `badmintonPlayerTeams`-svar; det giver ikke et ID for modstanderen.

Derfor er der ingen verificeret graf-traversal. Uden genvejen er det konkrete
2025-baserede overslag for 16 sæsoner mindst `1.159 × 16 = 18.544`
`badmintonPlayerTeams`-kald plus `4.838 × 16 = 77.408`
`badmintonPlayerTeamFights`-kald, altså `95.952` kald **før** ét
`badmintonPlayerTeamMatch`-kald pr. unik kamp. Det faktiske match-detailtal
kan ikke estimeres ærligt fra de eksisterende 2025-klubscan-tal alene.

Grafens forventede restdækning kan heller ikke beregnes meningsfuldt: uden
modstander-ID’er opdager traversal 0 nye klubber, mens eventuelle isolerede
klubber uden for de 1.159 seeds er ukendte. Den fulde blinde iteration er
derfor stoppet og kræver en ny beslutning.

## Resultatnote

**Trin 1 — afklaring (færdig; trin 2 ikke startet):** Ingen brugbar,
dokumenteret klub-uafhængig sæsonliste blev fundet i den eksisterende
evidens. Konklusionen gælder både Nembadminton GraphQL og BadmintonPlayer.

- Nembadminton: `tournament-query-surface.json` viser kun
  `tournamentGroups(seasonId, phaseType, order)` og
  `tournamentTiers(order)` som relevante generelle felter.
  `tournament-options-2025.json` har `tournamentGroups: []` og 17
  `tournamentTiers`; tier-listen indeholder bl.a. `Københavnsserien`.
- BadmintonPlayer: `GetTournamentEvents` er succesfuldt dokumenteret for
  kendt `tournamentclassid=115342` med events `490920`–`490924`.
  `SearchTournamentMatches` er succesfuldt dokumenteret for kendt event
  `490920`. Ingen af de gemte kald enumererer turneringsklasser pr. sæson.
  `SearchTournamentClass` forekommer i den hentede WebService-proxy, men
  uden gemt succesfuldt kald eller verificeret input/uddata for en sådan
  enumeration.
- Dyr fallback: `club-scan-2025.csv` har 1.159 klub-ID'er, 1.157 succeser,
  2 fejl og 4.838 teamrækker. Det er kun sæson 2025; fuld historisk dækning
  ville kræve yderligere klub-/sæsoniteration.

Der er derfor ikke bygget katalog eller kørt fuld iteration. Trin 2 afventer
Christoffers beslutning i afsnittet **Spørgsmål**.

Read-only databasekontrol: SHA-256 før og efter var identisk,
`E6C5046A4B93A8518254BADF5D8F4529FB0B918AE4A31AF63919B5F70D620062`.
Beskyttede mapper `statistik/data/`, `apps/netlify-prod/`, `kampsystem/` og
`klubstatistik-preview/` havde ingen git-ændringer.

Efter den nye probe er konklusionen opdateret: Trin 1–3 er udført, men trin 4
er ikke startet. Den fulde iteration og det permanente landskabsdatasæt
afventer beslutning om mindst 95.952 kald plus et ukendt antal
kampdetailkald. Rå probeevidens ligger i
`statistik/results/081-opponent-identity-probe.json`, og den reproducerbare
probe i `statistik/scripts/081-opponent-identity-probe.mjs`.
