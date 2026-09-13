# START HER — kondenseret regelsæt for GSB Webapps

Læs dette dokument ved starten af en arbejdssession. Læs også `AGENTS.md`,
som er den gældende reference for repositoryets struktur, maskiner og kendte
begrænsninger. Åbn derefter kun de dokumenter, der er relevante for opgaven.

Dokumentet blev skrevet om 13. september 2026 efter flytningen til det samlede
Git-repository `gsb-webapps`. Git er versionshistorikken for kode og dokumenter;
tunge og binære filer opbevares eksternt.

## Kilde og struktur

Repositoryet er den kanoniske kilde til kode, dokumenter og små tekstdata.
Eksterne data og hemmeligheder findes uden for repositoryet. Deres placering
slås op gennem `config.local.json`, som er maskinspecifik og ignoreret af Git.
`config.example.json` viser formatet.

Skriv aldrig en maskinspecifik eller absolut sti ind i kode. Brug relative stier
inden for repositoryet og `config.local.json` til filer udenfor.

```text
docs/               levende projektdokumentation og idébanker
docs/historik/      historiske logs og afsluttede forløb
apps/netlify-prod/  den deployede webapp
kampsystem/         kilder, data og byggescripts til kampsystemet
statistik/          Nembadminton-dataarbejde, scripts og rapporter
data/               små fælles tekstdata og hjælpekilder
tools/              lokale hjælpe- og synkroniseringsscripts
work/               opgavefiler til arbejde, der gives videre
```

`docs/historik/` og Dropbox' `_arkiv/` beskriver fortiden og må ikke rettes,
bare fordi deres gamle stier eller struktur ikke længere er aktuelle.

## Standing regel — vigtigst af alt

Intet bygges, kodes eller deployes uden Chris' eksplicitte og utvetydige
"byg det"-signal for det konkrete punkt. En idé, plan eller færdig specifikation
er ikke i sig selv tilladelse til implementering.

Undtagelser og allerede godkendte funktioner fremgår af det relevante
projektdokument. Ved tvivl stoppes arbejdet, og spørgsmålet skrives ned. Der
gættes ikke.

## Arbejdsform og Git

- Kør `git pull` før arbejdet begynder og `git push`, når det afsluttes.
- Arbejde udført af en agent sker på en særskilt gren, så ændringen kan læses
  samlet før fletning. Eget, mindre arbejde kan committes direkte på `main`.
- En opgave, der gives videre, får en fil under `work/aabne/` baseret på
  `work/OPGAVE-SKABELON.md`. Den skal angive mål, afgrænsning, kontekst,
  acceptkriterier, gren og åbne spørgsmål.
- Når opgaven er løst, udfyldes resultatet, og opgavefilen flyttes til
  `work/loeste/`.
- Små rettelser, der udføres med det samme, kræver ikke en opgavefil.
- Commit ændringer i sammenhængende bidder med en besked, der beskriver
  resultatet.
- Genererede databaser, browserprofiler, store importer og genskabelige
  fallback-data holdes ude af Git efter reglerne i `.gitignore`.

## Planlægning og ekstra modelreview

Et uafhængigt review med en dyrere eller mere avanceret model kan foreslås til
ikke-trivielle, algoritmisk komplekse ændringer. Det må kun sættes i gang efter
Chris' udtrykkelige godkendelse.

Brug ikke et tungt review til simple UI-ændringer eller små dokumentrettelser.
Et modelreview bygger ikke selv løsningen; det finder kanttilfælde, uklare
forudsætninger og designspørgsmål. Det erstatter aldrig test med klubbens rigtige
data.

## Dokumentkort

- `AGENTS.md` — struktur, maskiner, arbejdsform og aktuelle faldgruber.
- `docs/dream-team-brief.md` — arkitekturreference for Dream Team-scoringen.
  Brug aktuelle statusdokumenter, hvis briefen og nyere driftserfaring afviger.
- `docs/idebank-feature.md` — øvrige produktidéer som tilmelding, navigation,
  træning, kalender og betaling.
- `docs/idebank-statistik.md` — statistik, spilleranalyse og rankings.
- `docs/idebank-kampsystem.md` — ELO, kampfordeling og kampsystemet.
- `docs/roadmap.md` — prioriterede næste skridt på tværs af projekterne.
- `docs/planlagte-features-spec.md` — aftalte og specificerede funktioner, der
  endnu ikke nødvendigvis er bygget.
- `docs/preview-vs-live-status.md` — samlet status for idé, preview og live.
- `docs/temp-noter.md` — kortlivede noter, før de sorteres til rette dokument.
- `docs/nembadminton-api.md` — samlet teknisk reference for Nembadminton-kald.
- `docs/opus-strategisk-review-prompt.md` — opskrift til et Chris-igangsat
  strategisk review.
- `data/navne-alias.json` — navnematching og kendte navnevariationer.
- `statistik/API_RESEARCH.md` — forskningslog og teknisk kontekst for
  statistikprojektet.
- `statistik/TEST_RUN_LOG.md` — reproducerbar log over statistikkørsler.
- `statistik/results/CURRENT_VALIDATION_STATUS.md` — seneste validerede status
  for statistikdata.

## Hvad du ikke kan stole på lige nu

Nogle dokumenter blev skrevet før flytningen. I `docs/roadmap.md`, idébankerne
og `docs/planlagte-features-spec.md` er beskrivelserne af, hvad der skal bygges,
fortsat relevante, men ældre oplysninger om filplacering kan være forældede.
Bekræft placeringen mod `AGENTS.md` og den faktiske repositorystruktur.

`kampsystem/build3.py` har stadig stier fra et tidligere sandkassemiljø og kan
ikke bruges som almindeligt lokalt byggescript, før det er omlagt til
`config.local.json`.

`apps/netlify-prod/START_LOKAL_PREVIEW.txt` beskriver en lokal nøglefil, som
ikke findes i appmappen. Hemmeligheder skal findes via den maskinspecifikke
konfiguration og må ikke lægges i Git.

## Preview og live-status

Når noget kun bygges i et preview, opdateres den relevante række i
`docs/preview-vs-live-status.md` til preview-status med en konkret beskrivelse
af, hvad der mangler før produktion.

Når noget deployes fra `apps/netlify-prod/`, opdateres rækken til live i samme
arbejdssession som deployeringen. Status må ikke kun gemmes i løbende prosa.

## Dokumentation efter emne

Skriv information dér, hvor den senere kan findes igen:

- Shippede ændringer og historiske forløb dokumenteres i den relevante levende
  status, før afsluttede forløb eventuelt arkiveres under `docs/historik/`.
- Kampsystem og ELO hører i `docs/idebank-kampsystem.md`.
- Statistik, spilleranalyse og rankings hører i `docs/idebank-statistik.md`.
- Ren Nembadminton-teknik hører i `docs/nembadminton-api.md` og, når den er
  eksperimentel eller kørselsnær, i statistikprojektets egne dokumenter.
- Andre produktfunktioner hører i `docs/idebank-feature.md`.
- Tværgående prioritering hører i `docs/roadmap.md`.

Split kun et dokument, når emnet reelt er blevet stort eller hyppigt ændret.
Når et forløb er færdigt eller flyttet til en specifikation, forkortes
idébankens afsnit til en status og en tydelig henvisning.

## Hurtige noter

Enkeltstående idéer skrives først kort i `docs/temp-noter.md` med dato og
emne. Temp-filen er ikke en autoritativ kilde.

Tøm den aldrig automatisk. Foreslå sortering, når den har omtrent 15–20 noter
eller er blevet svær at overskue, og vent på Chris' godkendelse. Ved sortering
læses både temp-filen og hvert måldokument frisk. Først når alle noter er
placeret og kontrolleret, nulstilles temp-filen.

## Sikre dokumentændringer

Git har overtaget rollen som backup og versionshistorik. Lav derfor ikke
særskilte dokumentbackups før en omskrivning.

Følgende regler gælder stadig:

1. Læs altid den aktuelle fil igen i samme arbejdssession før redigering.
2. Brug en præcis patch frem for at rekonstruere uændrede afsnit fra hukommelsen.
3. Brug aldrig placeholders eller anden stedfortrædertekst i stedet for indhold,
   der skal bevares.
4. Gennemgå Git-diff efter ændringen. Kontroller især, at dokumentet ikke er
   blevet utilsigtet kortere, og at henviste overskrifter stadig findes.
5. For store dokumenter skal ændringen holdes snæver. Hvis en stor omskrivning
   er nødvendig, skal den opdeles i reviewbare commits eller gennemgås særskilt.
6. Commit først, når acceptkriterierne er kontrolleret.

## Synkronisering mellem idébank og specifikation

Der er ingen automatisk sammenhæng mellem idébankerne og
`docs/planlagte-features-spec.md`.

Når en funktion er aftalt i detaljer, flyttes den til den relevante del af
specifikationen. Idébankens lange afsnit erstattes af en kort status og en
henvisning. Når et konkret spørgsmål blokerer en næsten aftalt funktion, får
spørgsmålet et tydeligt punkt i specifikationen, og idébanken henviser til det.
Dette vedligeholdes løbende under arbejdet.

## Starttjek for en session

1. Læs `AGENTS.md` og dette dokument.
2. Læs kun den relevante brief, idébank, specifikation eller status.
3. Kør `git pull` og kontroller arbejdsstatus.
4. Bekræft, at opgaven har et tydeligt byg-signal og en afgrænsning.
5. Brug en arbejdsgren og opgavefil, når arbejdet er givet videre.
6. Test mod de relevante rigtige data, gennemgå diffen, dokumentér resultatet,
   commit og push.
