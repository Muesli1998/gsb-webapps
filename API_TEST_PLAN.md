# Foreløbig testplan for Nembadminton API

Formål: kortlægge hvilke data GSB kan hente uden login, hvor langt historikken
går tilbage, og hvilke kald der senere kan bruges til statistiksystemet.

Alle tests er read-only. De må ikke skrive til Google Sheets, Netlify eller
andre eksterne systemer. Testresultater logges i `API_RESEARCH.md`.

## Fase 1 — Schema og adgang

1. Hent GraphQL-schemaets Query-felter og inputtyper.
2. Gruppér felterne i:
   - bekræftet uden login
   - kræver login
   - svarer, men er ikke forstået endnu
   - giver schema- eller intern fejl
3. Gem præcise fejlbeskeder og de input, der blev brugt.

## Fase 2 — Discovery-kæden

Test med `clubId = 1093`:

1. `badmintonPlayerTeams` for én sæson.
2. `badmintonPlayerTeamsBulk` for flere sæsoner.
3. `badmintonPlayerTeamFights` for én holdgruppe.
4. `badmintonPlayerTeamFightsBulk` for flere grupper.
5. Sammenlign bulk-resultater med individuelle kald.
6. Kontrollér samme fysiske hold med flere `leagueGroupId`’er.
7. Deduplicér på `matchId` og kontrollér overlap mellem grupper.

For hver sæson registreres antal hold, grupper, unikke kampe, fejl, ældste
`roundDate` og nyeste `roundDate`.

Rapporten skal også have en særskilt **Badmintonligaen-sanitytest**. Den
finder holdposter, hvor den rå `league`-tekst peger på Ligaen, bevarer alle
parallelle `leagueGroupId`’er og kontrollerer kampdækning for udvalgte klubber
og historiske sæsoner. Ligaen prioriteres som reference for, om de vigtigste
nationale resultater er bevaret. Selve Ligaen, kvalifikation og slutspil skal
skelnes fra hinanden ud fra rå tekst og gruppe-ID.

## Fase 3 — Historisk rækkevidde

1. Kør `badmintonPlayerTeamsBulk` i intervaller bagud fra 2025.
2. For sæsoner med hold: hent gruppernes kampe.
3. Fortsæt mindst til 2000 eller til flere på hinanden følgende år uden reelle
   data.
4. Skeln mellem tomt svar, `null`, API-fejl og reelle hold uden kampe.
5. Bekræft cutoff med mindst ét ekstra kald efter det sidste reelle år.

## Fase 4 — Kampdetaljer

1. Hent én kamp med `badmintonPlayerTeamMatch`.
2. Test valgfrit `version`-felt.
3. Test `badmintonPlayerTeamMatches` med korrekt `leagueMatches`-input.
4. Sammenlign enkelt- og bulk-resultater.
5. Registrér hjemmehold, udehold, kampsted, kategorier, spillere og sæt.
6. Kontroller walkovers, tomme sæt, doubler og forskelle mellem `roundDate` og
   `gameTime`.

## Fase 5 — Andre login-frie datakilder

Test og dokumentér:

- `clubhouseStats`
- `calendarEvents`
- `highestPointGain`
- `memberStats` og `membersStats` for kendte spiller-ID’er
- `badmintonPlayerClubs`
- `clubsSearch`
- `cancellationCollectorPublic` med en kendt eller bevidst manglende ID
- `badmintonPlayerApiTeamMatches`
- `teamMatchesFormattedForValidation`

For hvert kald skal vi beskrive, om det kan bruges til historisk statistik,
kommende kampe, roster-data, ranglistehistorik eller validering.

## Fase 6 — Login-spor, separat

Først når login-frie muligheder er kortlagt, kan følgende testes med brugerens
egen aktive browser-session:

- `seasons`
- `teams`
- `teamRounds`
- `membersSearch`
- `memberSearchPoints`
- `memberSearchTeamFight`
- `clubhouse`
- `logs`

Adgangskoder skal aldrig kopieres ind i projektfiler eller chatten.

## Fase 7 — Beslutningsrapport

Efter testene udarbejdes en kort rapport med:

1. Hvad der kan hentes uden login.
2. Ældste dokumenterede sæson med reelle GSB-kampe.
3. Hvilket kald der er bedst til discovery.
4. Hvilket kald der er bedst til kampdetaljer.
5. Kendte datakvalitetsproblemer.
6. Hvad der eventuelt kræver login eller BadmintonPlayer.dk.
7. Anbefaling til næste isolerede discovery-implementering.

Ingen regelsætkatalog, Google Sheets-model eller ændring af
`netlify-tool-prod` indgår i denne testplan.

## Langvarig genoptagelig test

Den store test skal kunne afbrydes og fortsætte fra seneste checkpoint.

### Testområder

1. GSB (`clubId 1093`) for sæsoner fra 2025 bagud til første tomme historiske
   område.
2. Bekræftelse af cutoff med ekstra år efter sidste reelle data.
3. Flere `leagueGroupId`-grupper for samme hold og sæson.
4. Sammenligning af individuelle kald og bulk-kald.
5. Kampdeduplicering på `matchId`.
6. Kampdetaljer for et repræsentativt udvalg: senior, ungdom, veteran,
   playoff, doubles og walkover hvis de findes.
7. Forsigtigt udvalg af andre kendte BadmintonPlayer `clubId`’er, hvis en
   pålidelig klub-ID-kilde kan etableres.
8. Klub-, kalender-, rangliste- og medlemskald, der virker uden login.
9. Badmintonligaen som særskilt sanity test på tværs af klubber og sæsoner.

### Checkpoint-model

Testen gemmer løbende filer i `results/`:

```text
results/
  run-<id>.json                 samlet status og resume
  seasons-<id>.jsonl            én sæsonpost pr. linje
  groups-<id>.jsonl             én gruppepost pr. linje
  matches-<id>.jsonl            én unik matchpost pr. linje
  errors-<id>.jsonl             fejl og advarsler
  probes-<id>.jsonl             schema- og felt-tests
```

`run-<id>.json` skal mindst indeholde:

```json
{
  "runId": "...",
  "startedAt": "...",
  "updatedAt": "...",
  "status": "running|paused|complete|failed",
  "nextTask": "...",
  "completedTasks": 0,
  "totalTasks": 0,
  "apiVersionUnknown": true
}
```

Hver resultatlinje skal indeholde input, tidspunkt, status, kort responsresume
og eventuel fejl. Store rå API-svar gemmes kun, hvis de er nødvendige for at
forklare en fejl; ellers gemmes et normaliseret resume for at holde repository
og usage nede.

### Genoptagelse og sikkerhed

- En opgave markeres først som færdig efter et gyldigt svar er gemt.
- En fejl gemmes med forsøg nummer og fortsætter til næste opgave.
- Retry bruges kun ved timeout, HTTP-fejl eller midlertidig GraphQL-fejl.
- Der bruges begrænset parallelitet og en kort pause mellem batches.
- Samme `matchId` gemmes én gang i den samlede resultatvisning, men alle
  kilder/grupper registreres som referencer.
- Testen må aldrig skrive til Google Sheets eller bruge hemmelige nøgler.
- Resultaterne commit’es først efter en afsluttet eller bevidst pauset kørsel,
  så en afbrudt test ikke efterlader et uklart Git-punkt.

### Godkendelsespunkt før kørsel

Før første store kørsel skal Chris godkende:

1. sæsonintervallet
2. om andre klubber skal med i første kørsel
3. om normaliserede svar er nok, eller om udvalgte rå svar skal gemmes
4. maksimal køretid og forsigtig parallelitet

Indtil denne godkendelse er testen kun planlagt.
