# Samlet testlog

Sidst opdateret: 2026-09-12

Dette er den samlede log over de read-only undersøgelser, der er kørt for GSB-
statistikprojektet. API-fejl er ikke fortolket som bevis på, at data mangler.
Uverificerede fortolkninger er markeret som ukendte.

## Nembadminton GraphQL

Endpoint testet: `POST https://app.nembadminton.dk/graphql`.

- GSB-identitet verificeret: BadmintonPlayer `clubId=1093`, Nembadminton
  `clubhouseId=331`.
- `badmintonPlayerTeams` testet for sæsonerne 2010–2025.
- `badmintonPlayerTeamsBulk` testet med flere sæsoner.
- `badmintonPlayerTeamFights` testet for GSB-grupper.
- `badmintonPlayerTeamFightsBulk` testet med flere grupper.
- 16 sæsoner med reelle GSB-holddata: 2010–2025.
- 462 grupper og 2.818 deduplicerede kamp-ID’er fundet.
- 2000–2009 gav ingen reelle discovery-data i den testede kæde; det er et
  API-resultat og ikke bevis på historisk fravær.
- `badmintonPlayerTeamMatch` testet på repræsentative kampe.
- 1.374 kampdetaljer lykkedes.
- 1.444 kampdetaljer fejlede:
  - 1.085 `Internal server error`
  - 359 `Could not find any players on match`
- Fejlene er analyseret pr. sæson, aldersgruppe, hold og modstander.
- Kendte kamp-ID’er 486396 og 487423 fejler fortsat i Nembadminton.
- Alternative matchkald er skema-testet, men gav ikke en generel løsning på
  fejlene.
- `teams`-rækkefølge testet: GSB står ikke altid i samme array-position.
- `matchId`, `round`, `roundDate` og `gameTime` er bevaret i rådata.
- `teamRounds` og `teamRound` findes i skemaet.
- `teamRounds(clubhouseId=331, first=100, page=1)` returnerede `Unauthenticated`
  med guard `api`.
- `highestPointGain` virker uden login.
- `memberStats`/`membersStats` findes i skemaet.
- `rankingProgression` var `null` i det testede `clubhouseStats`-svar.
- `seasons` returnerede `Unauthenticated` uden login.
- Klublistekald gav 1.428 BadmintonPlayer-klubber og 1.159 poster i det andet
  klubkald.

## Aldersgrupper og rækker

- Evidenskatalog bygget fra konkrete rå rækketekster.
- Observerede ID’er: 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 13, 16, 17 og 18.
- ID 7, 10, 14 og 15 er fortsat `unknown`.
- `ageGroupId` gemmes altid sammen med sæson og rå rækketekst.
- Brugerbekræftede eksempler:
  - kamp 486396: SEN40+, ID 9
  - kamp 487423: SEN60+, ID 13
- Der er ikke oprettet et globalt aldersgruppekort baseret på gæt.

## Kampdetaljer og walkovers

- Repræsentative kampdetaljer testet for sæsonerne 2011–2025.
- 2010-prøvekampene fejlede.
- Kamp 486396 blev visuelt verificeret på BadmintonPlayer som:
  - Tingbjerg 2 – Gladsaxe Søborg 4
  - SEN+40
  - resultat 12-0, point 2-0
  - `Afgjort uden kamp (afbud/udeblivelse)`
- Walkoverstatus skal gemmes separat; manglende sætresultater må ikke tolkes
  som en almindelig kamp.
- Terminal-fetch returnerede kun dynamisk HTML-skal for kampvisningen.
  Browser-rendering viste de faktiske felter.
- En checkpoint-fejl, der kunne skrive dubletter ved genkørsel, blev rettet.
- Deduplikeret kampfil med 2.818 unikke kamp-ID’er er genereret.

## BadmintonPlayer browser og stillinger

- Login-session testet og verificeret som Christoffer Müller.
- GSB-søgning testet i holdturneringens stillingsvisning.
- Gruppekaldets dokumenterede JavaScript-format er:
  `ShowStanding(region, season, groupId, ageGroupId, ..., clubId, ...)`.
- Sæson 2026/27, Danmarksserien Pulje 8, gruppe 18861 hentet.
- Sæson 2025/26, Danmarksserien Pulje 7, gruppe 17922 hentet.
- Stillingerne indeholder position, hold, kampe, sejre, score, sæt, point og
  sætpoint.
- Historiske GSB-grupper og række-/fasekategorier vises i browseren.
- BadmintonPlayer er dermed verificeret som fallback-kilde for slutstillinger
  og kampdata.

## BadmintonPlayer webservice og turneringsdata

- `GetTournamentEvents` testet for turnering 115342.
- Events 490920–490924 fundet for single, double og mixdouble.
- `SearchTournamentMatches` testet for event 490920.
- Resultater indeholder kampnumre, faser, spillere, spiller-ID’er, klubber og
  scores.
- `GetPlayerProfile` testet for spiller 84737 i sæsonerne 2025 og 2026.
- `GetPlayerRankingListPoints` testet for single, double og mixdouble i den
  aktuelle sæson.
- `GetRankingListVersions` testet og returnerede historiske ranglistedatoer.
- `GetRankingListPlayers` og varianter gav HTTP 500 med de testede direkte
  parameterpakker.
- Direkte HTML-fetch af dynamiske sider gav ikke de renderede resultater.

## SQL og datakvalitet

- Lokal SQLite-struktur og prøveimport testet.
- Separat datakvalitetsanalyse kørt.
- 472 holdobservationer, 462 grupper og 2.818 kampobservationer i analysen.
- Ingen dubletter fundet på de analyserede hold-, gruppe- eller kampnøgler.
- 65 kampe mangler `round`.
- 66 kampe mangler `roundDate`.
- Forskelle mellem `roundDate` og datoen i `gameTime` er målt.
- Den fælles database er ikke ændret af disse analyser.

## Parallel testkørsel

Seneste parallelle kørsel dækkede:

1. Nembadminton discovery og kampfejl.
2. BadmintonPlayer-fallback og walkoverkontrol.
3. SQL-datakvalitet og skemaforslag.
4. Autentificeret browser-test af historiske stillinger.

Alle agenter skrev kun til afgrænsede testområder. `netlify-tool-prod` blev ikke
ændret.

## Åbne tests

- Automatisere BadmintonPlayer-stillinger for alle historiske GSB-grupper.
- Bruge fallback-metoden på alle 1.444 fejlende kampdetaljer.
- Teste `teamRounds` i Nembadminton med en separat Nembadminton-session.
- Finde ud af om `squads` indeholder flere stillingsfelter.
- Afklare de ukendte aldersgruppe-ID’er med konkrete observationer.
- Bygge den endelige rådata- og normaliserede SQL-model.
- Først derefter beregne avanceret statistik.
