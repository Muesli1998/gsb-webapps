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
