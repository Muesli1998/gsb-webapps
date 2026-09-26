# gsb-webapps — start her

Dette repo indeholder Christoffer Müllers værktøjer til Gladsaxe Søborg
Badmintonklub: en fantasyliga (Dream Team), et kampsystem med ELO-rating og
rundefordeling, og et statistikprojekt der henter data fra Nembadminton.

Læs dette dokument færdigt før du ændrer noget. Der er ting i repoet der
ser rigtige ud, men er forældede — de er listet under "Hvad du ikke kan
stole på" nedenfor.

---

## Sådan hænger det sammen

Arbejdet ligger to steder, og det er med vilje:

**Dette git-repo** indeholder kode, dokumenter og små tekstdata. Det er den
kanoniske kilde. Repoet ligger forskellige steder på de to computere
(`C:\Users\chril\Code\gsb-webapps` på den bærbare,
`C:\Users\Christoffer\Code\gsb-webapps` på den stationære) — det er
ligegyldigt, git er stiuafhængig.

**Dropbox** indeholder de tunge og binære filer: videoer, regneark,
databaser, arkiv og nøgler. De hører ikke i git, fordi git gemmer hver
version af en binær fil i fuld længde for evigt.

Broen mellem dem er `config.local.json` i repo-roden. Den findes ikke i git
(den er i `.gitignore`), fordi Dropbox ligger `C:\Users\chril\Dropbox` på den
ene maskine og `D:\Dropbox` på den anden. Skal du bruge en fil fra Dropbox,
så slå stien op der — skriv den aldrig direkte ind i koden.

`config.example.json` viser formatet.

---

## Mappestruktur

```
docs/            projektdokumenter — det levende regelsæt og idébankerne
docs/historik/   driftlog og afsluttede forløb. Beskriver fortiden korrekt;
                 stier deri er fra før omlægningen og skal ikke rettes.
apps/netlify-prod/   den app der faktisk er deployet (gsbmore.netlify.app)
kampsystem/      kilder og byggescript til kampsystem-previewet
statistik/       Nembadminton-dataprojektet, eget delrepo med egen historik
data/            små tekstdata: navne-alias, CSV, enkelte scripts
tools/           hjælpescripts
work/            opgavefiler (se "Arbejdsform" og "Opgavekøen")
```

Ligger i Dropbox under `Projects\GSB-Webapps\`:
`secrets\` (to Google-nøgler), `dream-team-data\` (videoer og regneark),
`_arkiv\` (alt det udfasede).

---

## Hvad du ikke kan stole på lige nu

Dette er det vigtigste afsnit i dokumentet.

**`kampsystem/build3.py` kan ikke køre nogen steder.** Den har hårdkodede
stier ind i en Claude-sandkasse (`/mnt/user-data/uploads/...`,
`/home/claude/...`). Den skal laves om til at bruge `config.local.json`
før den virker på en almindelig maskine.

**`apps/netlify-prod/START_LOKAL_PREVIEW.txt` lyver.** Den lover at der
ligger en `.env` med Google-nøglen i mappen. Det gør der ikke; nøglerne
ligger i Dropbox under `secrets\`.

**Rettet siden omlægningen:** `docs/START-HER.md` blev skrevet om i opgave
001, og sti-referencerne i roadmap, idébankerne og spec-filen i opgave 002.
De er nu retvisende. Én overset reference til det gamle dokumentnavn
`gsb-roadmap.md` er kendt og håndteres i opgave 003.

---

## Værktøjer på de to maskiner

Den bærbare (bruger `chril`, Windows 10 Pro) har node, men ikke python.
Den stationære (bruger `Christoffer`, Windows 10 Home) har python 3.10,
men ikke node. Ingen af dem kan altså køre hele projektet endnu —
det skal installeres.

Tunge og langvarige kørsler (Playwright-scraping, databasebygning) hører
hjemme på den stationære, som står tændt. Den bærbare er til redigering
og lettere arbejde. Det er en vejledning, ikke en spærring.

**Et repo skabes altid med `git clone` fra GitHub, aldrig ved at kopiere en .git-mappe mellem maskiner eller fra et arkiv/zip.** Fejler
`git pull` med en rettighedsfejl (`Permission denied`) på noget inde i
`.git/`, er den rigtige reaktion at klone repoet på ny i en frisk mappe —
ikke at rette rettigheder på den eksisterende `.git`-mappe med `icacls`
eller lignende. Tjek altid `pwd`/`git rev-parse --show-toplevel` mod den
forventede sti for den aktuelle maskine, før du antager noget mangler fra
repoet.

---

## Arbejdsform

**Hent før du går i gang, send når du holder op.** `git pull` først,
`git push` når du er færdig. Dropbox synkroniserede af sig selv; det gør
git ikke. Glemmer du at pushe, er arbejdet usynligt for den anden maskine.

**Opgaver der uddelegeres får en fil i `work/`**, altid med disse
sektioner, i denne rækkefølge: Trin, Gren, Baggrund, Mål, Afgrænsning
(Må røres/Må ikke røres), Kontrol (Målet/Værnet), Ved tvivl (med en tom
`## Spørgsmål`-sektion Codex skriver i ved behov), Resultatnote. Dette er
den ENESTE definition af formatet i repoet — gentag den ikke andre
steder (heller ikke i "## Roller: manager og worker" nedenfor, som i
stedet skal henvise hertil). Ældre kort i `work/loeste/` fra før
2026-09-19 kan afvige fra denne liste; de rettes ikke med tilbagevirkende
kraft. Små rettelser laver man bare — ceremonien er til det der gives
videre til en anden.

**Arbejde udført af en agent kører på sin egen gren**, så ændringen kan
læses samlet før den flettes ind. Rettelser man selv laver, committes
direkte på `main`.

**Databaser er read-only som udgangspunkt.** Enhver `.db`-fil i repoet
må kun læses, medmindre et opgavekorts Mål-afsnit eksplicit navngiver
skriveadgang som en del af opgaven. Fravær af en eksplicit
skrivetilladelse betyder ingen skrivning — det er ikke nok at et kort
undlader at nævne databasen.

**Fletning til `main` sker kun som fast-forward** (`git merge --ff-only`),
aldrig en almindelig merge-commit og aldrig `--force`. Før en gren
godkendes til fletning, tjekkes at `main` reelt er en forfader til grenen
(`git merge-base --is-ancestor origin/main origin/<gren>`), så en
forældet lokal `main` ikke overskriver arbejde lavet på den anden
computer i mellemtiden.

**Ingen absolutte stier i repoet.** Alt inde i repoet er relativt til
repo-roden; alt der peger ud af det går gennem `config.local.json`.
De to undtagelser er `config.local.json` selv og dokumenter hvor en sti
står som eksempel med tydelig markering.

**Rør ikke `docs/historik/` eller Dropbox' `_arkiv\`** når du retter stier.
De beskriver fortiden korrekt, og at "rette" dem ville forfalske
historikken.

**Genereret data holdes ude af git.** Browser-fallback-mapperne,
databaserne, den store SQL-import og browserprofilen står i `.gitignore`.
Filerne ligger stadig på disken; de versionsstyres bare ikke.

---

## Roller: manager og worker

Chris arbejder sammen med to forskellige AI'er, med forskellige roller —
ikke fordi den ene er bedre, men fordi de har forskellig adgang:

**Claude (manager)** læser repoet, undersøger, vurderer prioritet op mod
denne fil, og skriver opgavekort i `work/` — formatet er defineret én gang
under "Arbejdsform" ovenfor. Claude har typisk ikke selv
git-adgang til at pushe (afhænger af opsætningen den kører i) og kører
ikke selv de faktiske undersøgelser, scripts eller commits.

**Codex (worker, pt. ChatGPT Codex CLI)** har git- og filadgang på Chris'
maskine og udfører selve arbejdet: `git pull`, branch, scripts, tests,
commit, `git push`. Codex arbejder ud fra opgavekortet i `work/aabne/` —
kortet er facit for hvad der skal laves, ikke en genfortælling af det.

**Praktisk konsekvens for hvordan Claude leverer:**
- Opgavekortet lægges i `work/aabne/`, i nøjagtig samme form som filerne i
  `work/loeste/` — intet separat promptdokument i repoet.
- Selve Codex-prompten (den tekst Chris limer ind i Codex) gives i chatten
  med Chris, ikke som fil. Den henviser til opgavekortet ved sti og
  nummer i stedet for at gentage indholdet.
- Når Claude selv har skrevet noget direkte i repoet (fx rettet en
  dokumentfil via filadgang) og det er klar til at blive versionsstyret,
  giver Claude de nødvendige git-kommandoer i chatten, så Chris kan sætte
  dem ind i Codex frem for at Claude selv forsøger at committe.

Chris beslutter selv hvornår og om en opgave køres — et opgavekort i
`work/aabne/` er stadig kun "klar", ikke "kør nu af dig selv", jf.
Opgavekøen nedenfor.

Hvilket værktøj der er "worker" kan skifte — det er rollen, ikke
værktøjsnavnet, der er pointen. Skift derfor kun navnet Codex herover hvis
Chris rent faktisk skifter værktøj.

---

## Arbejder pt. på (besluttet 2026-09-26, erstatter tidligere hård prioritetsregel)

**Statistik er det Chris aktivt arbejder på lige nu.** Det er en status,
ikke en spærre — andre opgaver må godt oprettes og løses sideløbende, hvis
Chris beslutter det (se "Opgavekøen": et kort i `work/aabne/` er allerede
per definition besluttet). Formålet med denne linje er at gøre det
gennemsigtigt hvad hovedfokus er lige nu, ikke at forhindre andet arbejde.

Gode idéer der dukker op undervejs hører stadig som udgangspunkt i
idébankerne eller `work/future/`, ikke automatisk i `work/aabne/` — men det
er fordi de endnu ikke er besluttet, ikke fordi de er nedprioriteret på
forhånd.

---

## Udviklingstrin

Et arbejde bevæger sig gennem fire trin og lander til sidst i det femte:

**Test & Validation** — koden gør det den skal, og tallene er holdt op mod
et facit. Afvigelser er enten forklarede eller dokumenteret som kendte.

**Results** — grundessensen af det man bad om kan aflæses i en form et
menneske kan forstå.

**Preview** — brugerflade og funktion er afprøvet, men ikke live.

**Prod Push** — det er ude hos brugerne.

**Videreudvikling** — nye features og forbedringer. Alt hvad der falder
uden for den aktuelle færdig-definition, hører hjemme her, altså bagefter.

### Når noget falder tilbage

Viser det sig i Preview at tallene er forkerte, ryger posten tilbage til
Test & Validation. Den har ikke overhalet noget — den er gået baglæns, og
var altså ikke færdig.

**En post der falder tilbage, går forrest i det trin den lander i.**
Næsten færdigt arbejde er mere værd end knap påbegyndt.

**Om noget er et tilbagefald eller et nyt fund, afgør Christoffer.** Den
der arbejder på noget, har en indbygget skævhed mod at kalde det
tilbagefald, fordi det føles forbundet med det igangværende. Foreslå
gerne en klassifikation med én linjes begrundelse — men vent på svaret.

**Notér hvert tilbagefald i opgavefilen med en linje om hvorfor.** Bouncer
den samme post tre gange, er det ikke posten der er problemet: så var
udgangskriterierne for vage, eller opgaven for stor.

---

## Opgavekøen

`work/aabne/` er indbakken. Ligger der en opgavefil dér, er den besluttet
og klar til at blive løst. Er du i tvivl om hvad du skal lave, så kig der
først.

`work/loeste/` er arkivet. En opgave flyttes dertil når den er løst, med
resultatnoten udfyldt.

`work/future/` er et tredje sted, besluttet 2026-09-15: færdigt
specificerede opgavekort for alt der IKKE er statistik — Kampsystem,
Dream Team/Tilmelding, Kampkalender, Søndagstræning, generelt. De følger
nøjagtig samme kortformat som `work/aabne/`, men er bevidst IKKE i køen —
de køres ikke, uanset hvor færdige de ser ud, før Chris selv flytter
(eller beder om at få flyttet) et konkret kort til `work/aabne/`. At et
kort ligger i `work/future/` er IKKE et "byg det"-signal i sig selv, og
det ophæver ikke prioritetsreglen ovenfor.

Kort i `work/future/` navngives `NNN-kategori-navn.md` (fx
`023-kampsystem-...md`), så Chris kan vælge en hel kategori ad gangen.
Nummerserien er fælles med `work/aabne/` og `work/loeste/` — et kort
beholder sit nummer når det flyttes.

Idébankerne i `docs/` er noget andet igen: dér ligger det der er
*fundet*, ikke det der er *besluttet*. At skrive en idé ned skal koste
ingenting og må ikke skabe forpligtelse. Et `work/future/`-kort er et
skridt mere konkret end en idébank-linje — det har mål, afgrænsning og
kontrol, ligesom et rigtigt opgavekort — men er stadig ikke i køen.

---

## Kontrol og resultatnoter

Hver opgave bærer sin egen kontrol — som kommandoer, ikke som påstande.
To slags:

**Målet:** hvad skal blive sandt. `grep -rF 'D:\\Dropbox' docs/*.md`
skal give nul.

**Værnet:** hvad må ikke ændre sig. Antallet af "GSB Dream Team" i
dokumenterne skal være det samme før og efter. Det er værnene der fanger
den klassiske skade — at opgaven løses og noget andet går i stykker
undervejs.

**Resultatnoten skal angive tal, ikke vurderinger.** "13 forekomster
bevaret, 0 stier tilbage" kan efterprøves på et sekund. "Produktnavnet er
bevaret" kan ikke, og har allerede én gang været upræcist i denne
kodebase.

Kan et kriterium ikke måles — "er dokumentet velskrevet" — så markér det
tydeligt som en vurdering, så man kan se hvad der er bevist og hvad der
er en mening.

Kontroller der er værd at beholde permanent, flyttes til `tools/tjek/`.

### Efterprøv dit eget resultat, før du rapporterer det

Tilføjet 2026-09-17 efter at samme mønster gik galt tre gange i træk
(opgave 047, 048, 050, 051): et rapporteret tal der ikke stemte med det
der rent faktisk stod i den committede fil. Før du skriver en statusbesked
med et tal i ("X løst", "Y mismatch", "Z uforklaret"), gør dette FØR du
sender den, ikke som en rettelse bagefter når nogen spørger ind til det:

1. **Genåbn den fil du lige skrev, og læs den.** Sammenlign de tal du ser
   i filen med de tal du er ved at skrive i beskeden. Stemmer de ikke
   overens, kørte noget i en anden rækkefølge end du tror — det er ikke
   noget der kan forklares væk, det skal findes og rettes.
2. **En post talt med i "løst"/"forklaret" skal selv indeholde en brugbar
   værdi.** Hvis feltet der skulle udfyldes stadig er tomt/`UNKNOWN`/`null`
   i selve outputtet, hører posten IKKE til "løst"-kategorien, uanset hvor
   sikkert selve kildematchet var.
3. **Et match mellem en identitet og en kildetekst skal bekræftes på ALLE
   identificerende felter, ikke kun ét.** Hvis en identitet har klubnummer,
   holdtype og pointgrænse, skal den matchede kildetekst stemme på alle
   tre — et delvist match (fx samme holdtype, men forskelligt klubnummer
   eller pointgrænse) er ikke et match, og skal ikke bruges til at udfylde
   noget.
4. **Er en optælling markant større eller mindre end forventet ud fra
   opgavens egen kontekst** (fx "alt blev løst" i en opgave der eksplicit
   forventede at noget ville forblive uafklaret), er det et signal om at
   efterprøve metoden igen, ikke et tegn på at arbejdet gik usædvanligt
   let.

Det er billigere at fange selv end at få det samme fund tilbage en tredje
gang.

---

## Beslutninger

Afgørelser der ikke handler om en konkret filændring, skrives i
`docs/BESLUTNINGER.md`. Commit-beskeder dokumenterer kode; beslutningsloggen
dokumenterer hvorfor. Uden den bliver de samme spørgsmål afgjort forfra
hver gang, og typisk anderledes.

---

## Hvad der skete 13. september 2026

Alt lå tidligere fladt i Dropbox-roden, blandet med jobansøgninger og
private dokumenter, og blev synkroniseret mellem to computere — inklusive
`.git`-mapper, hvilket er den klassiske måde at ødelægge et git-repo på.
Det blev ryddet op og delt i `Projects` og `Personal`, og koden blev
flyttet helt ud af Dropbox og over i dette repo.

Undervejs blev fire ting afklaret, som er værd at kende:

**Mappen der lignede et arkiv var den nyeste kilde.** "GSB Webapp Zip" var
en eksport fra 12. september, ikke et gammelt arkiv. Dens udgaver af
alias-filen, API-noterne, projektbriefet, START-HER og roadmap var
nyere end dem der lå fremme. Havde vi bygget repoet på de synlige
kopier, havde vi tabt to ugers navnerettelser i den fil apps'ene bruger
til at matche spillere.

**Tre app-mapper viste sig at være én app.** `netlify-tool-prod` var
konsekvent nyest på hver eneste fil; `netlify-tool` var fra 28. august og
`dream-ung-kamp` et øjebliksbillede fra 3. september. Kun prod overlevede,
de to andre ligger i Dropbox' arkiv.

**Fire filer havde divergeret mellem de to computere** uden at nogen
opdagede det. Driftloggen og roadmap var nyest på den bærbare; `build3.py`
havde en kommentarblok fra 5. september som kun fandtes på den stationære
(August Carl Toftager-Larsens ratings), og den blev flettet ind.
`kampsystem_source.html` var bevidst bygget om 7. september — den gamle
udgave ligger i arkivet.

**Statistik-repoets 171 commits blev bevaret** via `git subtree`, ikke
kopieret ind. Derefter blev 3.499 genererede filer fjernet fra sporingen,
hvilket bragte repoet fra 93 MB til 8 MB uden at miste historik.

---

## Status på oprydningen efter 13. september 2026 (opdateret 2026-09-26)

Listen herunder var oprindeligt seks fremadrettede skridt. De er nu tjekket
mod repoet i stedet for antaget — dette er hvad der faktisk står, ikke en ny
liste af opgaver:

1. **Gjort.** `docs/START-HER.md` er skrevet om til den nye struktur (bekræftet:
   dokumentet selv siger "skrevet om 13. september 2026" og henviser til
   `AGENTS.md` som gældende reference).
2. **Delvist gjort.** De fleste stier er rettet, men `docs/opus-strategisk-
   review-prompt.md` og `docs/preview-vs-live-status.md` indeholder stadig
   `D:\Dropbox`-referencer — uklart om de er forældede stier eller bevidst
   historisk/eksempel-tekst; ikke rettet her, **gæt ikke** på hvilket uden at
   læse dem i kontekst.
3. **Ikke gjort.** `kampsystem/build3.py` har stadig hårdkodede
   Claude-sandkasse-stier (`/mnt/user-data/uploads/...`, `/home/claude/...`) —
   samme status som beskrevet i "Hvad du ikke kan stole på" ovenfor.
4. **Ukendt, gæt ikke.** Node/python er installeret på i hvert fald én af
   maskinerne pt. — status for begge maskiner er ikke tjekket herfra og skal
   bekræftes af Chris, ikke antaget.
5. **Ikke gjort.** Der findes ingen strukturguide i `docs/` (hvor nye
   projekter hører hjemme, hvordan en ny maskine sættes op).
6. **Ikke tjekket herfra.** Om claude.ai-projektets dokumenter nu er et slankt
   spejl af `docs/` kan ikke afgøres fra selve git-repoet.

Punkt 3 og 5 er reelle, ubesluttede åbne opgaver — de ligger ikke i
`work/aabne/` endnu, fordi Chris ikke har besluttet dem ind i køen (jf.
"Opgavekøen" og Prioritetsreglen: Statistik har førsteprioritet). De står her
som kendt, ikke som "gør det nu".

---

## Kontekst der ikke står i koden

Klubben er Gladsaxe Søborg Badminton. Dream Team er en fantasyliga hvor
medlemmer vælger et hold af klubbens spillere og får point efter hvordan
de klarer sig i holdkampene. Kampsystemet er et andet værktøj, der fordeler
spillere i kampe til træning ud fra ELO-rating. Statistikprojektet er nyt
fra weekenden 12.-13. september og henter historiske resultater fra
Nembadmintons API — se `statistik/API_RESEARCH.md` og
`statistik/GIT_CONTEXT_FOR_CLAUDE.md`.

Data hentes fra Nembadminton (badmintonplayer.dk). `docs/nembadminton-api.md`
er den samlede tekniske reference over hvilke API-kald der virker uden
login, og hvilke der ikke gør.
