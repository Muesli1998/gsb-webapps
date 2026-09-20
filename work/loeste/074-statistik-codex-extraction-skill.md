# Opgave 074 — byg Codex-skillen til masseudtræk (rækkefølgepunkt 7)

**Trin:** Skillen (`docs/statistik-plan.md`s "Rækkefølge", punkt 7 — Results-
rapporten, punkt 6, er afsluttet). Dette er statistikkens nuværende
førsteprioritet, jf. `AGENTS.md`.

**Gren:** `arbejde/074-statistik-codex-extraction-skill`, jf. AGENTS.md.

**Baggrund:** `docs/statistik-plan.md`s "## Skillen"-afsnit beskriver et
dokument der "skrives når Test & Validation lukker" (den er lukket
2026-09-15) og skal bruges næste gang masseudtræk af kampdata skal køres —
typisk ved sæsonstart. Chris har efterfølgende præciseret, at leverancen
skal være en **installerbar Codex-skill**, ikke kun en markdownfil til
manuel indlæsning. Den versionsstyres i repoet med `SKILL.md` og en
detaljeret procedure i `statistik/CODEX_EXTRACTION_SKILL.md`; ingen
Claude-specifik skill eller global kopi er den kanoniske kilde.

Skillens formål er kildeudtræk fra Nembadminton/BadmintonPlayer med fokus
på faktiske kildefejl og eventuelle sæsonændringer. Den skal også føre
data frem til det **normaliserede SQLite-format, projektet endte med**,
og kunne validere resultatet mod det eksisterende datasæt. Den er ikke
en generel statistik-, rapport- eller databasevedligeholdelsesskill.

Råmaterialet findes allerede, men er spredt over flere dokumenter:

- `statistik/results/COMPLETE_RESULT_FALLBACK_METHOD.md` — selve metoden
  (render-gate, feltudtræk, idempotens, walkover-regel, kontroller efter
  kørsel, begrænsninger). Dokumentet siger selv "Metodedetaljer til en
  senere skill står i dette dokument".
- `statistik/results/CURRENT_VALIDATION_STATUS.md` — statuskategorier
  (`browser_verified`, `browser_verified_no_result`, `api_error`,
  `corona_suspended`) og en liste af "Reproducerbare scripts".
- `statistik/AGENTS.md` og `statistik/RESUME_INSTRUCTIONS.txt` —
  arbejdsprincipperne (evidens før fortolkning, aldrig gæt, en fejl
  stopper ikke serien).
- `statistik/sql/schema-normalized.sql`, den faktiske normaliserede
  database og de eksisterende import-/audit-scripts — målformat og
  kontroller. Skemafilen alene er ikke nødvendigvis identisk med den
  aktuelle database efter senere migrationer.

**Vigtigt:** disse dokumenter er skrevet på forskellige tidspunkter og kan
være forældede på detaljer (fx præcise scriptnavne eller filstier). Denne
opgave skal IKKE bare sammenklippe dem — hvert konkret scriptnavn og hver
sti skal verificeres mod den faktiske kode/mappestruktur, som den ser ud
nu, før den skrives ind i skillen (jf. `statistik/AGENTS.md`s "Aldrig
gæt"-regel).

## Mål

Byg en formel Codex-skill i `.agents/skills/gsb-match-extraction/SKILL.md`,
der aktiveres ved relevante GSB-udtræk og henviser til
`statistik/CODEX_EXTRACTION_SKILL.md`. Skriv sidstnævnte som en konkret,
udførbar procedure (imperativ tjekliste, ikke fortællende prosa) for
kildeudtræk, normalisering og validering ved fx sæsonstart eller et
inkrementelt udtræk. Den skal som minimum indeholde:

1. **Hvornår denne skill bruges** — kort, konkret trigger-beskrivelse (ny
   sæson, et kendt hul der skal genudtrækkes, e.l.).
2. **Render-gate-reglen**, ordret/tilpasset fra
   `COMPLETE_RESULT_FALLBACK_METHOD.md`: hvornår en side må markeres som
   gyldig dynamisk kampdetalje, og hvornår den ikke må.
3. **Idempotens-mønstret**: én JSON-fil pr. kamp, en kørsel springer
   allerede verificerede filer over, så en afbrudt kørsel kan genoptages
   uden at starte forfra.
4. **Walkover-reglen**: kræver eksplicit `(Ikke fremmødt)`-tekst; en
   `Vinder W.O.`-kolonneoverskrift er IKKE i sig selv evidens.
5. **Evidens-før-fortolkning-princippet**: rå tekst/data gemmes altid
   sammen med kilde, kamp-ID, URL og tidspunkt, før noget fortolkes.
6. **De faktiske scripts og deres roller** — kortlagt og VERIFICERET mod
   den nuværende `statistik/`-mappe (kør `ls`/tjek filerne findes), ikke
   kopieret blindt fra `CURRENT_VALIDATION_STATUS.md`s liste. Nævn
   eksplicit hvis et script fra den gamle liste ikke længere findes, eller
   er omdøbt.
7. **Kontrolliste efter kørsel** — de fem punkter fra
   `COMPLETE_RESULT_FALLBACK_METHOD.md`s "Kontroller efter kørsel"
   (tælling af dynamiske detaljer/manglende/fejl, felt-audit, FK-/dublet-
   kontrol, sammenligning mod officielle stillinger, statuskategorier
   rapporteret separat).
8. **Kendte begrænsninger**, videreført fra samme dokument (dynamisk
   detalje beviser ikke at alle historiske formater er ens; de kendte
   U09-/corona-undtagelser; individuelle opstillinger kræver separat
   parser).
9. **Normaliseret slutformat og importgrænse** — beskriv den verificerede
   vej fra rå, kildebelagte JSON-/browserpayloads til projektets
   eksisterende normaliserede SQLite-struktur, ikke et nyt format eller
   blot en løs SQL-eksport. Kortlæg de relevante felter og nøgler mod
   den faktiske database og `statistik/sql/schema-normalized.sql`, herunder
   sæson/pulje/hold, holdkamp, individuelle kategorier/spillere,
   stillinger, rå payloads og udtræksfejl. Verificér migrationsforskelle
   og import-scripts mod aktuel kode; markér en manglende eller uprøvet
   importvej som sådan. Bevar rå kilde, status og ukendte værdier;
   deduplikér på verificerede identiteter, overskriv ikke kendte værdier
   med tomme, og bevar bl.a. corona-status. Skillen må **ikke** selv give
   tilladelse til at skrive i databasen.
10. **Validering mod det endelige datasæt** — angiv en reproducerbar,
    read-only referencekontrol af den faktiske SQLite-databases aktuelle
    tabeller/kolonner, nøgler og kendte poster. Beskriv, hvordan et
    fremtidigt autoriseret prøveudtræk/import afprøves i en isoleret
    testdatabase eller kopi og sammenholdes felt for felt med rå kilde
    og referenceposter, inklusive status, resultat, individuelle data og
    proveniens. Kontrollér tællinger pr. sæson/pulje, dubletter,
    foreign keys, feltdækning og officielle stillinger; dokumentér kendte
    undtagelser og stop ved uforklarede afvigelser. Historiske totaler er
    ikke et facit for en ny sæson.

Skeln tydeligt mellem sæsonstart (verificér mulige regel-, felt- og
ID-ændringer og gem kildebelagt sæsonprofil) og udtræk midt i en allerede
verificeret sæson (genbrug profilen, lav kun en lille kildesundhedskontrol,
og genåbn fuld undersøgelse ved ændring eller manglende profil). En
automatisk masseudtræksrute må ikke kaldes fungerende, før den passerer
render-gaten på en kendt kamp; `statistik/results/004-udtraeksvej.md`
dokumenterer den hidtidige begrænsning.

Opdater desuden `statistik/TEST_RUN_LOG.md` med en linje der noterer at
skillen er skrevet (dato, kort begrundelse), jf. `AGENTS.md`s krav om at
statusændringer skal kunne spores.

## Kontekst

Dette er en skill- og dokumentationsopgave, ikke en opgave om at bygge
en ny extractor eller importør. Der skal ikke skrives eller ændres
udtræks-/importscripts, og hverken masseudtræk eller import i den rigtige
database køres som del af opgaven. Beskriv kun en ende-til-ende-rute,
hvor hvert led er verificeret mod kode og målformat eller tydeligt
markeret som endnu ikke bevist. En live pilot hører til en særskilt,
godkendt testopgave.

## Afgrænsning

**Må røres:** `.agents/skills/gsb-match-extraction/SKILL.md` (ny fil),
`statistik/CODEX_EXTRACTION_SKILL.md` (ny fil),
`statistik/TEST_RUN_LOG.md` (kun en ny logline, ikke ret i eksisterende
linjer) og dette opgavekort til spørgsmål/resultatnote.

**Må ikke røres:** `statistik/data/*.db` (må kun åbnes read-only for at
bekræfte målformat og referenceposter — ingen skrivning under nogen
omstændigheder), ingen eksisterende scripts i `statistik/`
(hverken `.mjs`-filer eller andet), ingen eksisterende resultatfiler i
`statistik/results/`, `docs/statistik-plan.md` (allerede opdateret i en
tidligere opgave — ikke en del af denne), `apps/netlify-prod/`.

## Kontrol

**Målet:** `.agents/skills/gsb-match-extraction/SKILL.md` kan valideres
som Codex-skill og peger på den kanoniske procedure.
`statistik/CODEX_EXTRACTION_SKILL.md` findes og dækker alle ti punkter
fra Mål-afsnittet ovenfor — bekræft med en simpel optælling (fx antal
`##`-overskrifter der matcher punkterne) i resultatnoten. Hvert
scriptnavn nævnt i proceduren er bekræftet at findes på den angivne sti —
angiv hvor mange der blev verificeret, og hvor mange (om nogen) der ikke
længere fandtes/var omdøbt. Angiv også antal kontrollerede mål-tabeller
og eventuelle konstaterede forskelle mellem skemafil og faktisk database.

**Proceskontrol uden live udtræk:** Afprøv med eksisterende rå eksempler
eller isolerede fixtures, at skillen skelner sæsonstart fra inkrementel
kørsel, afviser standardshell/forkert kamp-ID og walkover uden eksplicit
tekst, genoptager kun uverificerede kampe og kræver særskilt autorisation
før databaseimport. Kontrollér feltmapping mod read-only reference og
isolér eventuelle prøveskrivninger til en testdatabase. Notér konkrete
bestået/fejlet-resultater; en statisk skill-validator alene beviser ikke
at udtræksruten virker.

**Værnet:**

```
git status --short statistik/data/ statistik/scripts/ statistik/results/ apps/netlify-prod/ docs/statistik-plan.md
```

Skal være tom. I samlet `git status` må kun de tre tilladte leverancefiler
og dette opgavekort være ændret/nye. Ændringer i den rigtige database,
eksisterende scripts eller genererede resultater er ikke tilladt.

## Ved tvivl

Findes et scriptnavn fra `CURRENT_VALIDATION_STATUS.md`s liste ikke
længere, er strukturen ændret markant, eller kan det normaliserede
slutformat ikke identificeres sikkert mod den aktuelle database — stop og
skriv det under Spørgsmål i stedet for at gætte eller opfinde en ny
struktur. Er det uklart om et script stadig gør det kilden siger, eller
om en importvej fungerer uden at køre den på rigtige data, så markér den
som uverificeret i skillen (fx "ikke kørt siden 2026-09-14, verificér før
brug") frem for at præsentere den som testet nu. En fejlet kontrol
stopper arbejdet før commit, indtil fejlen er afklaret.

## Spørgsmål

2026-09-20: Den forventede `statistik/data/gsb-statistik-normalized.db` findes ikke på denne maskine (`Test-Path` gav `False`), så den faktiske tabelstruktur og referenceposter kan ikke kontrolleres mod slutdatasættet. Hvor kan den faktiske normaliserede SQLite-database læses read-only til punkt 9–10? Hvis den ikke er tilgængelig, skal du afgøre om referencevalideringen skal udskydes; skemafilen alene er ikke et verificeret slutdatasæt.

2026-09-20 opfølgning: Chris angav den uversionerede database under Dropbox, og den kunne læses read-only uden kopi, symlink eller `config.local.json`. Den har 736 `standings`-rækker, mens `statistik/TEST_RUN_LOG.md` dokumenterer 751 efter opgave 050 den 17. september; Dropbox-filens ændringstid er 13. september. Er dette en ældre kopi, og hvor findes i så fald den opdaterede normaliserede database? Referencevalidering mod "det endelige datasæt" er sat på pause, indtil dette er afklaret.

2026-09-20 afklaring: Chris oplyste, at Dropbox-filen nu har 751 `standings`-rækker. En ny read-only kontrol af samme fil viste 751 rækker og ændringstid 20. september; ovenstående versionsspørgsmål er dermed afklaret. Filen blev ikke kopieret eller ændret.

## Resultatnote

2026-09-20: Skrev installerbar repo-skill og kanonisk udtræksprocedure. Metode: gennemlæste de henviste kilder og scriptkode, verificerede scriptstier, sammenholdt skemafil med den faktiske Dropbox-database read-only og lod en uafhængig sub-agent afprøve to isolerede beslutningsscenarier. Ingen live browserkørsel, genereret rapport, prøveimport eller skrivning til databasen.

Rå kontroller: Proceduren har 10 nummererede `##`-afsnit svarende til de 10 målpunkter. 18 unikke `.mjs`-scriptnavne blev kontrolleret med `Test-Path`: 18 fandtes, 0 manglede/var omdøbt; alle 7 navne fra den ældre statusliste findes. Den aktuelle reference-DB havde 11 brugertabeller; kolonnenavne stemte med skemafilen i alle 11, mens `team_matches` havde ændret fysisk kolonnerækkefølge. Read-only tællinger: 2.818 `team_matches`, 20.319 `individual_matches`, 67.196 `individual_match_players`, 7.599 `players`, 751 `standings`; 0 foreign-key-fejl og 0 dublerede eksterne kamp-ID'er. Kendte U09-, corona- og protest-ID'er blev kontrolleret uden ændring.

Testresultater: `quick_validate.py` → `Skill is valid!`; `git diff --check` → 0 fejl; værnekommandoens `git status --short` for data, scripts, resultater, prod og plan → tom. Uafhængig, skrivefri scenarietest → 2/2 bestået: inkrementel sæsonprofil/genoptagelse, afvist standardshell/forkert ID og W.O.-overskrift, samt ny sæsons kilde-/regelkontrol og stop før ikke-autoriseret import. En uklarhed om retry-evidens blev præciseret efter testen.

Begrænsning: Dette beviser skillens dokumenterede beslutningsregler og referenceformat, ikke en fungerende automatiseret browserrute eller ende-til-ende-import. De historiske scripts har kendte genoptagelses-/importbegrænsninger; en separat autoriseret pilot med isoleret testdatabase kræves før reel massebrug. Ingen åbne spørgsmål efter den opdaterede 751-rækkers referencekontrol.
