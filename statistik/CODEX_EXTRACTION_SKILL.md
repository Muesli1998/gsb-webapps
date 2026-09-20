# Codex-procedure: udtræk af holdkampdata

Brug denne procedure fra repo-roden sammen med `AGENTS.md` og `statistik/AGENTS.md`. Den beskriver kildeudtræk fra Nembadminton og BadmintonPlayer; den giver ikke i sig selv tilladelse til at køre et udtræk, ændre scripts eller skrive i SQLite. Arbejd i `statistik/` ved scriptkørsel, da de verificerede scripts bruger relative stier. Dokumenteret metode er ikke det samme som en aktuelt fungerende automatiseret browserrute.

## 1. Hvornår denne skill bruges

- Brug den ved ny sæson, et godkendt masseudtræk eller genudtræk af et dokumenteret hul. Afklar sæson, kampomfang, destination og skriveadgang i den konkrete opgave, før der køres noget. Læs `docs/nembadminton-api.md`, `statistik/API_RESEARCH.md` og `statistik/results/004-udtraeksvej.md` for den aktuelle kilderute.
- Ved første udtræk i en sæson: verificér de faktiske kilde-URL'er, GraphQL-felter, status- og resultatvisning, aldersgruppe-ID'er, alle pulje-ID'er og eventuelle ændrede sæsonregler mod rå svar og officielle visninger. Gem en dateret, kildebelagt sæsonprofil på et sted, som den konkrete opgave tillader. Brug `badmintonPlayerTeams` → `badmintonPlayerTeamFights` → `badmintonPlayerTeamMatch` som dokumenteret discovery-kæde; et hold kan have flere `leagueGroupId` i én sæson. `season` er startåret, og GSB's `clubId` er 1093. Gæt ikke ID'er eller regler ud fra tidligere sæson.
- Ved udtræk midt i samme sæson: genbrug den verificerede profil, kontrollér kun få kendte og aktuelle kildeeksempler for URL, felter, status og render-gate, og hent derefter kun nye/ændrede eller dokumenteret fejlede kampe. Genundersøg først regler og hele kilderuten, hvis profil mangler, kontrolprøver afviger, eller kilden har ændret sig; stop den berørte fortolkning og dokumentér afvigelsen.
- En frisk lokal Playwright-kontekst gav i opgave 004 kun en standardshell, mens den eksisterende in-app-browser viste kampdetaljen. Verificér en automatiseret rute på en kendt kamp med render-gaten **før** en masseudtrækskørsel; behandl ikke turnerings-webservicens `SearchTournamentMatches` som en bevist holdkamprute. Hvis ingen automatiseret rute passerer gaten, stop masseudtrækket og brug kun den validerede, manuelle browserfallback for afgrænsede enkeltkampe.

## 2. Render-gate

- Godkend kun en BadmintonPlayer-side som dynamisk kampdetalje, når den **renderede** accessibility-/bodytekst både indeholder det forventede kamp-ID og en linje, der starter med `Resultat`. Kontrollér at ID'et tilhører den forventede sæson og pulje/kildelink; et vilkårligt ID i en standardshell er ikke nok.
- Klassificér en tom side, standardshell, manglende kamp-ID, manglende `Resultat`-linje eller browserfejl som **ikke verificeret**. Gem rå tekst og fejl, men importér aldrig siden som kampdata. Prøv kun en anden rute, hvis den er dokumenteret for holdkampe, og anvend samme gate igen.
- Læs `statistik/results/VALIDATED_BROWSER_METHOD.md` og `statistik/results/COMPLETE_RESULT_FALLBACK_METHOD.md` før browserfallback. Ventetid alene er ikke evidens for fuld rendering.

## 3. Idempotens og genoptagelse

- Brug en stabil nøgle som sæson + kamp-ID. Skriv én JSON-fil pr. kamp efter hvert forsøg med rå kilde, status og tidspunkt; bevar tidligere forsøg som historik i samme kampfil ved retry, så ny evidens ikke sletter gammel rå evidens. Opdatér køen efter hver kamp. Spring **kun verificeret** eksisterende output over. Genoptag fra den første uverificerede post, og lad én fejl blive logget uden at stoppe resten.
- Gennemgå eksisterende JSON og køstatus før genkørsel. `run-complete-result-fallback.mjs` springer **alle** eksisterende outputfiler over, også `no_dynamic_detail` og fejl. `rerun-browser-field-gaps.mjs` sætter `reverifiedAt` selv ved browserfejl og udelukker derefter posten fra næste kandidatliste. `run-youth-browser-fallback.mjs` filtrerer på `deferred_youth_u15`, ikke på verificeret output. De scripts opfylder derfor ikke alene ovenstående genoptagelsesregel; planlæg eksplicit retry af uverificerede poster uden at overskrive rå evidens. Ændr ikke kø, output eller script uden tilladelse i den konkrete opgave.
- Opret ikke en ny fallback-kø oven i en eksisterende kø uden at kontrollere effekten: `prepare-browser-fallback-queue.mjs` overskriver køfilen ud fra et eksisterende indeks. Det er ikke en generel inkrementel sæsonkørsel.

## 4. Walkover

- Registrér walkover kun når rå kildetekst udtrykkeligt indeholder `(Ikke fremmødt)`. `Vinder W.O.` er en kolonneoverskrift og er **ikke** bevis for walkover.
- Gem den ordrette tekst. Udled kun et vinderhold, hvis eksplicit walkovertekst, hjemme-/udehold og den viste numeriske holdscore tilsammen understøtter det. Ellers behold vinder som ukendt. Klassificér ikke corona-aflysninger eller et vist `-` som walkover uden denne evidens.

## 5. Evidens før fortolkning

- Gem rå API-svar eller renderet tekst før parsing sammen med kilde, sæson, `leagueGroupId`, kamp-ID, URL, hentetidspunkt, render-/fejlstatus og eventuelle usikre felter. Udtræk `Hjemmehold`, `Udehold`, `Resultat` og `Point` fra linjer, hvor værdien står efter labelen eller på næste linje; gem begge dele, også hvis parsing fejler.
- Behold rå resultatmarkører uændrede. Gæt ikke på aldersgruppe-ID, årsag til manglende data eller betydningen af `individual_matches.result_marker_raw`. Verificér identitet på alle tilgængelige felter, ikke kun holdnavn eller kamp-ID. Skeln mellem sidens tekniske status og faktisk feltdækning.
- Hent `SR_CallbackContext` frisk fra siden, hvis en dokumenteret webservice-rute kræver det; gem aldrig værdien i fil eller repo. Den fundne `SearchTournamentMatches`-rute gælder turneringsresultater, ikke dokumenteret holdkampudtræk.

## 6. Verificerede scripts og roller

Stierne nedenfor er kontrolleret mod filernes kildekode 2026-09-20; **ingen af dem er kørt i denne dokumentationsopgave**. Kør dem kun, når den konkrete udtræksopgave tillader deres læse-/skriveeffekter. Alle syv navne fra `statistik/results/CURRENT_VALIDATION_STATUS.md` findes stadig under `statistik/scripts/`; ingen er fundet omdøbt eller manglende.

| Script i `statistik/scripts/` | Kodebekræftet rolle og effekt |
| --- | --- |
| `run-youth-browser-fallback.mjs` | Browserforsøg for køposter med `deferred_youth_u15`; skriver ungdoms-JSON og køstatus. |
| `rerun-browser-field-gaps.mjs` | Genbesøger køposter med `verified` og uden `reverifiedAt`; skriver browser-JSON og køstatus. |
| `run-complete-result-fallback.mjs` | Læser normaliseret DB for `complete`-rækker uden resultat; skriver browser-JSON for poster uden eksisterende fil. |
| `sync-browser-field-gaps.mjs` | Parser verificerede browserfiler og udfører `UPDATE` i normaliseret SQLite; **må ikke køres uden eksplicit DB-skrivetilladelse**. Gennemgå især corona-status før og efter brug. |
| `sync-legacy-route-probe.mjs` | Udfører `UPDATE` i normaliseret SQLite fra legacy-probefiler; **må ikke køres uden eksplicit DB-skrivetilladelse**. |
| `run-api-gap-audit.mjs` | Læser normaliseret DB og **overskriver** JSON-/markdown-auditrapporter. Den eksisterende markdowntekst indeholder en gammel påstand om to U09-huller; kontrollér mod aktuelle undtagelser før rapportering. |
| `run-data-quality-check.mjs` | Læser normaliseret DB og **overskriver** JSON-kvalitetsrapport. |

De gamle scriptroller er kun statisk verificeret; browserens aktuelle rendering, API-svar, køformat og endelige resultat er uverificeret i denne opgave. Kontroller dem ved en fremtidig, autoriseret kørsel. `statistik/AGENTS.md` angiver desuden fem efter-import-audits; kontroller deres aktuelle effekt før brug, da de kan skrive rapportfiler.

## 7. Kontrol efter kørsel

1. Tæl separat godkendte dynamiske kampdetaljer, sider uden detalje og browserfejl. Læs de faktisk skrevne JSON-filer igen, og afstem optælling med køen; en fejlfil er ikke en verificeret kamp.
2. Auditér faktisk feltdækning for resultat, hjemmehold, udehold og point. En status som `complete` eller `browser_verified` er ikke i sig selv bevis for udfyldte felter.
3. Efter en **særskilt autoriseret** import: kør SQLite foreign-key- og dubletkontrol samt de fem efter-import-scripts i `statistik/AGENTS.md`; læs rapporterne igen og kontrollér tallene. Uden DB-skrivetilladelse udføres ingen import.
4. Sammenlign kampantal pr. relevant pulje/sæson med officielle stillinger. Dokumentér afvigelser og kilde; antag ikke at historiske stillingsrækker har identisk format.
5. Rapportér statuskategorier og feltdækning hver for sig: mindst `browser_verified`, `browser_verified_no_result`, `api_error`, `corona_suspended` samt relevante ungdoms-/renderfejl. Genåbn enhver genereret rapport og kontrollér, at rapporterede tal faktisk står i filen.

## 8. Kendte begrænsninger

- En godkendt dynamisk detalje beviser kun, hvad siden viste på hentetidspunktet, ikke at alle historiske sæsoner har samme format eller regler.
- `statistik/AGENTS.md` dokumenterer **fire** U09-undtagelser (505217, 505219, 506407, 506413) og to corona-suspenderede kampe (387862, 387864). Den ældre fallback-metodes tekst om to U09-kampe er forældet. Behold undtagelserne med URL, status og rå kilde; forsøg ikke at opfinde resultater. Kamp 340495 er en protestafgørelse, ikke en skjult mangel på holdscore.
- Et holdresultat er ikke fulde individuelle opstillinger. Spiller- og kategoridata kræver separat parser og egen validering; denne skill giver ikke en sådan parser eller ny adgang til historiske ranglistepoint.
- Eksisterende browser-scripts er ikke bevis for en fungerende, ny automatiseret masserute. Den dokumenterede friske Playwright-test i opgave 004 fejlede render-gaten. Stop før masseudtræk, hvis ruten stadig fejler.

## 9. Normaliseret slutformat og importgrænse

- Brug den **faktiske** `gsb-statistik-normalized.db` som målformat, ikke en ny SQL-model. Find den lokale Dropbox-rod via `config.local.json`/opgavens godkendte konfiguration; skriv aldrig en maskins absolutte sti ind i repoet. Mangler lokal konfiguration eller den aktuelle database, så stop importplanen og få placeringen afklaret. Åbn reference-databasen read-only; `statistik/sql/schema-normalized.sql` er kun den deklarerede startstruktur.
- Verificér tabeller og kolonner med `PRAGMA table_list` og `PRAGMA table_info` mod den aktuelle database, før felter mappes. Den 2026-09-20 læste Dropbox-kopi har 11 tabeller med samme kolonnenavne som skemafilen. `team_matches` har en anden fysisk kolonnerækkefølge efter migrationer; brug derfor altid eksplicitte kolonnenavne, aldrig `INSERT ... VALUES` uden kolonneliste. Gentag kontrollen ved næste autoriserede udtræk.
- Kortlæg kun faktisk observerede og verificerede felter: sæson → `seasons`; klub → `clubs`; sæson/pulje/aldersgruppe → `competitions`; hold i den konkrete pulje → `teams`; kamp-ID og kampens rå felter/status → `team_matches`; kilde-JSON/renderet tekst med URL og hentetid → `raw_payloads`; mislykkede kald/sider → `extraction_errors`. Individuelle kategorier, spillere og relationer hører i `individual_matches`, `players` og `individual_match_players` **kun** når en særskilt parser og identiteten er verificeret. Officielle stillinger hører i `standings` med kilde og præcis puljeidentitet. Holdnavn alene er ikke en stabil nøgle på tværs af kilder/sæsoner.
- Gennemgå eksisterende importkode som **historiske delruter, ikke én bevist ny-sæson-importør**: `generate-normalized-import.mjs` læser historiske JSONL-filer og skriver en SQL-import; `build-normalized-db.mjs` udfører den mod lokal DB og må ikke køres her. Generatorens navneafledte spiller-ID, scorekolonner og `INSERT OR IGNORE` skal testes mod rå kilder før genbrug. `sync-browser-field-gaps.mjs` og `sync-legacy-route-probe.mjs` opdaterer eksisterende holdkampe, ikke hele skemaet; tom streng kan stadig overskrive kendt værdi, og generisk status kan ændre corona-status. `parse-browser-individual-payloads.mjs` skriver en parserapport, mens `import-browser-individual-candidates.mjs` først skriver individuelle DB-rækker ved `APPLY=1` (men skriver rapport også ved dry-run). `import-browser-raw-payloads.mjs` håndterer kun `.retry.json` og bruger `INSERT OR REPLACE`; den er ikke en generel råpayload-import. `import-browser-standings.mjs` vælger en competition på sæson + pulje med `LIMIT 1`, hvilket ikke alene beviser korrekt identitet. Verificér scriptets arbejdsmappe og fil-effekter før hvert kald.
- Hold de rå filer uændrede og importen separat. Brug kun en importvej med dokumenteret nøgle, eksplicit status-/kildemapping og håndtering af både `NULL` **og** tom streng uden tab af en kendt værdi. Genbrug ikke en historisk scriptkørsel som bevis for den nye sæson. En faktisk SQLite-skrivning kræver, at den konkrete opgaves Mål udtrykkeligt tillader den; efter en sådan opgave skal den opdaterede DB kopieres til Dropbox som krævet i `statistik/AGENTS.md`.

## 10. Validering mod det endelige datasæt

1. Åbn reference-databasen med SQLite `mode=ro` og `PRAGMA query_only=ON`; brug kun `immutable=1`, hvis der ikke findes uafviklet WAL ved siden af filen. Dokumentér filens version/tidspunkt. Sammenlign `sqlite_master`, `PRAGMA table_info`, `foreign_key_list` og `index_list` mod skemafilen og eventuelle senere migrationer; en fil der blot har samme navn er ikke nødvendigvis den aktuelle database.
2. Mål baseline read-only: tabeller, antal pr. tabel/sæson/pulje/status, `PRAGMA foreign_key_check`, dubletter på `team_matches.external_match_id`, og faktisk felt-dækning adskilt fra status. Den verificerede Dropbox-kopi 2026-09-20 gav 2.818 holdkampe, 20.319 individuelle rækker, 67.196 spillerrelationer, 7.599 spillere, 751 stillingsrækker, 0 foreign-key-fejl og 0 dublerede kamp-ID'er. Disse tal er **reference for den kopi**, ikke måltal for en ny sæson. Genåbn output før rapportering.
3. Kontrollér kendte reference-ID'er mod både rå evidens og DB: de fire U09-ID'er 505217, 505219, 506407, 506413 skal ikke få opfundne resultater; 387862 og 387864 skal bevare `corona_suspended`; 340495 har protestbemærkning og et kendt holdresultat. Et kildematch kræver alle tilgængelige identificerende felter, ikke kun kamp-ID eller holdnavn.
4. Afprøv en fremtidig, **særskilt autoriseret** import på en isoleret testdatabase, aldrig på referencen: gyldig kampdetalje, forkert kamp-ID, standardshell, `Resultat -`, eksplicit `(Ikke fremmødt)`, `Vinder W.O.` alene, browserfejl, ukendt resultatmarkør og sæson-/puljedrift. Kræv rå payload/fejl med URL og tidspunkt, korrekt feltmapping, uændrede kendte værdier ved `NULL`/tomt input, korrekt status og ingen import af afvist side. Gentag samme fixture to gange; antal og værdier må ikke ændre sig. Uden en verificeret importør er dette en **testplan**, ikke en bestået ende-til-ende-test.
5. Efter en autoriseret import: afstem rå kampnøgler mod importerede rækker, undersøg manglende/ekstra poster og dubletter, kør foreign-key- og feltdækningskontrol, sammenlign individuelle scores/spillere med rå tekst og kampantal med de præcise officielle puljestillinger. Brug de fem efter-import-audits i `statistik/AGENTS.md` **kun** når deres rapportskrivning er tilladt: `check-normalized-db.mjs`, `audit-individual-db.mjs`, `audit-individual-coverage-gaps.mjs`, `audit-team-vs-individual-results.mjs`, `run-data-quality-check.mjs`. Genåbn rapporterne og efterprøv alle tal. Stop ved uforklarede forskelle; gamle totaler og kendte historiske afvigelser må ikke bruges til at bortforklare nye fund.
