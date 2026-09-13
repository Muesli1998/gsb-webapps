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
work/            opgavefiler (se "Arbejdsform")
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

---

## Arbejdsform

**Hent før du går i gang, send når du holder op.** `git pull` først,
`git push` når du er færdig. Dropbox synkroniserede af sig selv; det gør
git ikke. Glemmer du at pushe, er arbejdet usynligt for den anden maskine.

**Opgaver der uddelegeres får en fil i `work/`** med mål, afgrænsning
(hvilke mapper må røres, hvilke ikke), den nødvendige kontekst,
accept­kriterier, og besked om at stoppe og skrive spørgsmålet ind i filen
frem for at gætte ved tvivl. Små rettelser laver man bare — ceremonien er
til det der gives videre til en anden.

**Arbejde udført af en agent kører på sin egen gren**, så ændringen kan
læses samlet før den flettes ind. Rettelser man selv laver, committes
direkte på `main`.

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

## Prioritet

**Statistik har førsteprioritet indtil den har nået Prod Push.** Alt andet
venter. Det gælder også gode idéer der dukker op undervejs — de hører i
idébankerne, ikke i opgavekøen.

Undtagelsen er snæver med vilje: kun noget der taber data, noget der er
i stykker i produktion, eller noget der direkte blokerer statistik, må
springe køen. Alt andet venter, uanset hvor rigtigt det lyder i øjeblikket.

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

Idébankerne i `docs/` er noget andet: dér ligger det der er *fundet*, ikke
det der er *besluttet*. At skrive en idé ned skal koste ingenting og må
ikke skabe forpligtelse.

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

## Næste skridt, i rækkefølge

1. Skriv `docs/START-HER.md` om til den nye struktur. Behold reglerne om
   arbejdsmetode; erstat alt om filplacering. Backup-ritualet for store
   dokumenter kan pensioneres — git overtager den rolle.
2. Ret stier og mappenavne i `docs/roadmap.md`, idébankerne og
   spec-filen. Bemærk at "GSB Dream Team" de fleste steder er
   *produktnavnet i brugerfladen*, ikke en mappe — det skal blive stående.
3. Lav `kampsystem/build3.py` køreklar med `config.local.json` i stedet
   for sandkasse-stier.
4. Installér node på den stationære og python på den bærbare.
5. Skriv strukturguiden: hvor nye projekter hører hjemme, og hvordan en
   ny maskine sættes op.
6. Ryd op i claude.ai-projektets dokumenter, så de bliver et slankt spejl
   af `docs/` frem for en konkurrerende kilde. Ti af de tredive er
   backup-kopier som git nu gør overflødige.

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
