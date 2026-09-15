# Researchspor og fremtidige muligheder

## Afsluttet discovery-spor

Vi fandt og reproducerede BadmintonPlayers ASP.NET-webservice-lag for
turneringer og spillerprofiler. Det er adskilt fra Nembadminton GraphQL.

Verificerede metoder:

- `GetTournamentEvents` – finder events/rækker for en turnering
- `SearchTournamentMatches` – returnerer kamp-/resultat-HTML for et event
- `GetPlayerProfile` – returnerer spillerdata, holdkampe og i relevante sæsoner
  en `Turneringer`-sektion
- `GetPlayerRankingListPoints` – returnerer kategoriopdelte pointposter for
  den aktuelle sæson

Reference: turnering `115342`, events `490920`–`490924`, spiller `84737`.
En frisk `SR_CallbackContext` skal hentes fra sidens HTML før kald. Den må
ikke gemmes eller genbruges efter timeout.

## Dokumenterede fund

- En komplet turnering består af flere events: single, double og mixdouble.
- Resultater kommer som HTML-fragmenter med kampnumre, spillere, spiller-ID’er,
  klubber, faser, scores og `W.O.`.
- Spillerprofilens `Turneringer`-sektion kan bruges til at finde turnerings-ID’er
  pr. sæson.
- Ranglistepoint kan hentes kategoriopdelt for den aktuelle sæson.
- Brugeren har bekræftet, at pointene er de ranglistepoint, der gjaldt på
  spilletidspunktet.
- Historiske point skal undersøges via de generelle ranglistearkiver; det er
  ikke afgjort, om alle historiske sæsoner kan hentes maskinelt.

## Fremtidige testpunkter

1. Parse `GetTournamentEvents`-responsen til en komplet eventliste.
2. Parse `SearchTournamentMatches` til strukturerede kampe og W.O.-status.
3. Test én komplet turnering på tværs af alle events og rækker.
4. Test spillerprofilens turnerings-ID’er for flere spillere og sæsoner.
5. Undersøg generelle ranglistearkiver for historiske point.
6. Gem callback-kontekst kun runtime; brug aldrig hardkodede sessionsværdier.

## Aktiv prioritet

Turnerings-/spillerresearch er et side-/idéspor. Det aktive hovedmål er igen
en komplet, evidensbaseret GSB-holdkampdatabase med rådata, fejlstatus,
walkovers, aldersgruppe-ID’er og dokumenterede fallback-links.

## Næste holdkamp-test — afklaret i opgave 005

Opgave 005 afklarede kilden: Nembadminton-discovery indeholder kampe og
gruppe-ID’er, men ingen dokumenteret slutstilling. Almindelige puljer skal
suppleres fra BadmintonPlayers `Stilling`-side; playoffplaceringer afledes
separat af gemte kampe. Den efterfølgende kontrol i opgave 015 viste, at
den nuværende kobling stadig har 74 afvigende af 98 GSB-stillingsrækker.

Opgave 013 dokumenterede desuden 257 gemte payloads uden kategorisektion.
Manuel indhentning af disse payloads er en mulig, men endnu ikke besluttet,
opfølgende undersøgelse.

## Potentielt punkt ved fuld klubimport

Ved import af andre klubbers hold skal kampe i de dokumenterede corona-perioder klassificeres særskilt. Et resultatfelt med `-` i disse perioder bør gemmes som mulig suspenderet/ikke gennemført kamp, ikke som almindelig kampfejl. Kamp-ID, dato, pulje og rå kilde skal stadig bevares, så klassifikationen kan efterprøves.

## Åbent, uafklaret: er GSB's holdnummerering en stabil identitet på tværs af kilderne? (fundet i opgave 019, 2026-09-15)

Opgave 019 forsøgte at rette matching-nøglen i `check-standing-match-counts.mjs`
(stillinger vs. holdkampe) og fandt at rettelsen ikke ændrede noget. Diagnosen
(`statistik/results/019-diagnose-raa-navne.md`, alle 24 "no_linked"-rækker fra
opgave 015) viser et gennemgående mønster: stillingens `team_name_raw` for et
givet `season_id + league_group_id` matcher næsten aldrig de rå
hjemme-/udeholdnavne i `team_matches` for samme pulje — hverken før eller
efter normalisering. To konkrete, verificerede eksempler:

- 2011 / pulje 60: stilling siger `Gladsaxe Søborg 2`, `team_matches` siger
  udelukkende `Gladsaxe Søborg 3` (kamp 1717).
- 2025 / pulje 18733: stilling siger `Gladsaxe Søborg 1` (og separat
  `Gladsaxe Søborg 2` for en anden stillingsrække), `team_matches` siger
  udelukkende `Gladsaxe Søborg 3` (kamp 506441) — et AKTIVT 2025/26-hold.

**Hypotese (ubekræftet):** BD's holdnummerering er positionel/administrativ
pr. pulje, ikke en persistent identitet for et bestemt fysisk hold — dvs.
"Gladsaxe Søborg 2" kan betyde "GSB's andet hold i DENNE pulje", ikke
"det samme hold som blev kaldt 2 sidste sæson eller i en anden kilde".

**Hvorfor det er værd at undersøge før statistikken går til Prod Push:** hvis
hypotesen holder, kan ethvert sted i projektet der bruger holdnummer som
nøgle på tværs af kilder eller sæsoner (ikke kun denne ene kontrol) give
stille forkerte koblinger — ikke kun de 24 allerede kendte rækker.

**Forslag til hvordan det kan tjekkes senere** (ingen af disse er startet):

1. Undersøg om `league_raw` eller et andet gemt felt er en mere pålidelig
   tværkilde-nøgle end holdnummer — sammenlign for de 24 kendte rækker om
   et andet felt END holdnummeret faktisk matcher konsekvent.
2. Kortlæg hvor i `statistik/`-koden (scripts, matching, rapporter) et
   holdnummer i dag antages at være en stabil identitet, og vurdér
   konsekvensen for hvert sted.
3. Test om mønsteret er en konsekvent forskydning (fx "stillingens N er
   altid team_matches' N+1 i samme pulje") eller om det varierer usystematisk
   fra pulje til pulje — det første kunne kompenseres for, det andet ikke.
4. Spørg Christoffer om han (som spiller/hjælpetræner i klubben) kender den
   administrative praksis for hvordan BD tildeler holdnumre — det kan være
   hurtigere at få svaret fra en person end at udlede det af data.

Status: uafklaret, ikke påbegyndt. Blokerer ikke i sig selv statistikkens
Prod Push (de 24 rækker er allerede dokumenteret som en kendt begrænsning),
men er en risiko der bør vurderes før projektet udvides til flere klubber
eller flere afhængige funktioner bygges oven på holdnummer-antagelsen.

**Prioritet opdateret 2026-09-15:** denne undersøgelse rangerer højere end
det efterfølgende punkt (kategorisektioner), fordi den rammer selve
matching-kernelogikken — noget der bliver mere kritisk, ikke mindre, ved
en fremtidig klubudvidelse (flere klubber = flere puljer hvor mønsteret
kan opstå). Se `docs/BESLUTNINGER.md`s post fra samme dato.

## Åbent, lavere prioritet: mangler "mangler kategorisektion" en generel BD-kildeforklaring? (opgave 013/021, lukket 2026-09-15)

257 gemte browserpayloads mangler en kategorisektion (fx "Herresingle
U15"); 109 af dem uden eksplicit "Afgjort uden kamp"-tekst. Opgave 021
forsøgte manuel genhentning af den delmængde der faktisk kunne forsøges
(kun 7 af 109 — se nedenfor) og fik 7/7 bekræftet tomme kilde-sider. De
257 forbliver et dokumenteret kildehul, ikke en importfejl.

**Vigtig detalje for enhver der genoptager dette:** opgave 013's "257" og
"109" er metadata-tal fra en scanning. Den konkrete kandidatliste
(kamp-ID, sæson, pulje, leagueMatchId — nødvendig for at bygge en
genhentnings-URL) blev kun gemt for en stratificeret stikprøve på 20
rækker, IKKE for alle 257. Skal resten (~237 af 257, ~102 af 109)
nogensinde forsøges, skal kandidatlisten først genudtrækkes fra den
database/det script der oprindeligt talte dem — den findes ikke i det
nuværende materiale.

**Hvorfor det er nedprioriteret, ikke bare glemt:** manuel
CUA-genhentning (én kamp ad gangen, "vær sparsom"-regel) skalerer ikke
til en fremtidig alle-klubber-udvidelse. Er "mangler kategorisektion" en
generel begrænsning i BD's kilde (7/7 negative resultater for GSB peger
på det), er det mere værd at dokumentere ÉN gang og designe
importpipelinen til at forvente og håndtere det korrekt for alle
klubber fra starten, end at blive ved med at genhente manuelt klub for
klub. Bliver klubudvidelsen aktuel, hører denne undersøgelse hjemme som
en del af importpipeline-designet, ikke som en isoleret opfølgningsopgave.

Status: lukket som dokumenteret kildehul for GSB. Genoptages kun hvis
klubudvidelse bliver konkret, og da som en del af pipeline-designet.
