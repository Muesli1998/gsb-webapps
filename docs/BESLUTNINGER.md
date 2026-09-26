# Beslutningslog

Afgørelser der ikke handler om en konkret filændring. Commit-beskeder
dokumenterer kode; denne fil dokumenterer hvorfor.

Nyeste nederst. Én post per afgørelse: hvad blev besluttet, hvorfor, og
hvad der blev fravalgt. Hold dem korte — værdien ligger i at de findes,
ikke i at de er udtømmende.

Formålet er at de samme spørgsmål ikke bliver afgjort forfra hver gang,
og typisk anderledes. Det gælder især fordi Claude og Codex ikke deler
hukommelse: står en afgørelse ikke her, findes den ikke.

---

## 2026-09-13 — Kode ud af Dropbox, ind i git

**Besluttet:** kode, dokumenter og små tekstdata flytter til et git-repo
udenfor Dropbox. Dropbox beholder tunge og binære filer.

**Hvorfor:** Dropbox synkroniserede `.git`-mapper mellem to computere, hvilket
kan ødelægge et repo. Samme dag fandt vi fire filer der var divergeret mellem
maskinerne uden at nogen havde opdaget det. Git gør uenighed synlig og
flettelig; Dropbox laver en fil med parentes i navnet som man finder tre uger
senere.

**Fravalgt:** at lade alt blive i Dropbox med disciplin om kun at arbejde ét
sted ad gangen. En regel man bryder inden for en uge er ikke en regel.

---

## 2026-09-13 — Ét monorepo frem for et repo per delprojekt

**Besluttet:** `gsb-webapps` samler det hele.

**Hvorfor:** delprojekterne deler data og dokumentation, og krydshenvisninger
mellem separate repos er besværlige. Én klon per maskine er også nemmere at
holde styr på for én person.

**Fravalgt:** separate repos per app. Renere deploy-historie, men fem-seks
kloner at vedligeholde.

---

## 2026-09-13 — Statistik-historikken bevaret, men genereret data fjernet fra sporing

**Besluttet:** de 171 commits blev flettet ind med `git subtree`, hvorefter
3.499 genererede filer blev fjernet fra sporingen.

**Hvorfor:** historikken dokumenterer beslutninger og er værd at beholde.
Men de sporede filer fyldte 93 MB, og en databasekørsel skrev 15 MB ny
historik hver gang. Efter oprydningen fylder repoet 8 MB med historikken
intakt.

**Fravalgt:** at starte statistik på en frisk. Mindre repo, men sporet af
hvorfor tingene blev som de blev, ville være væk.

---

## 2026-09-13 — AGENTS.md er den bærende indgang, ikke README

**Besluttet:** al substans står i `AGENTS.md`. `CLAUDE.md` er tre linjer der
peger derhen.

**Hvorfor:** Codex læser `AGENTS.md` af sig selv. Og managerrollen skal på
sigt kunne overdrages til ChatGPT — hver regel der kun står et Claude-
specifikt sted, forsvinder den dag.

**Fravalgt:** at lade hvert værktøj have sin egen instruksfil. Fristelsen
til at skrive "lige den ene regel" ind i den ene fil er hvordan to
sandheder opstår.

---

## 2026-09-13 — Statistik har førsteprioritet indtil Prod Push

**Besluttet:** intet andet arbejde går i opgavekøen før statistik er ude hos
brugerne. Nye fund hører i idébankerne.

**Hvorfor:** hver gennemgang føder nye idéer. Lander de i samme bunke som det
igangværende, bliver statistik aldrig færdig — den bliver ved med at være
firs procent færdig.

**Fravalgt:** en prioriteret liste hvor alt kan rykke. Det er den samme kø,
bare med flere meninger om rækkefølgen.

---

## 2026-09-13 — Christoffer afgør tilbagefald kontra nyt fund

**Besluttet:** den der finder noget, foreslår klassifikationen med én linjes
begrundelse og venter på svar.

**Hvorfor:** den der arbejder på noget, har en indbygget skævhed mod at kalde
det tilbagefald — det føles forbundet med det igangværende, og så glider det
ind i køen udenom prioriteringen.

**Fravalgt:** en fast regel baseret på om tingen stod i færdig-definitionen.
Ren i teorien, men grænsen er uklar i praksis. Mønsteret i denne log kan
senere gøres til en rigtig regel, når der er nok afgørelser at se på.

---

## 2026-09-13 — Kontrol som kommandoer, resultatnoter i tal

**Besluttet:** hver opgave bærer sin kontrol som kørbare kommandoer, både for
målet og for det der ikke må ændre sig. Resultatnoter angiver tal.

**Hvorfor:** opgave 002 blev løst korrekt, men resultatnoten skrev at der var
"én resterende forekomst" af GSB Dream Team hvor der faktisk var tretten — og
de tretten var de rigtige. Havde nogen troet på noten, kunne de have "rettet"
noget der var i orden. Tal kan efterprøves på et sekund; vurderinger kan ikke.

**Fravalgt:** at stole på opsummeringer. De er påstande, ikke beviser.

---

## 2026-09-14 — Én AGENTS.md pr. mappe-niveau, ingen resume-snapshot-filer

**Besluttet:** når en delmappe (som `statistik/`) får sine egne regler, får
den sin egen `AGENTS.md`. Der skrives ikke en separat "sådan genoptager du
arbejdet"-fil ved siden af — det er `AGENTS.md` selv, plus den levende
statusfil (fx `CURRENT_VALIDATION_STATUS.md`), der er indgangen.

**Hvorfor:** `statistik/RESUME_INSTRUCTIONS.txt` var netop sådan en
sidefil. Den duplikerede principper der allerede stod i den nye
`statistik/AGENTS.md`, og den havde en hardkodet sikkerhedssti til den
gamle Dropbox-placering, som ingen opdagede var forældet før nu. To
steder med samme formål glider fra hinanden — det er den samme lektie som
`AGENTS.md`-vs-`README`-beslutningen ovenfor, bare på mappeniveau i
stedet for repo-niveau.

Mønsteret skal bruges igen, når `kampsystem/` eller Dream Team-delen får
brug for egne regler: en lille `AGENTS.md` i den mappe, ikke en ny slags
dokument. Det er det der skalerer til flere og mere komplicerede
delprojekter, uden at hvert ét opfinder sin egen struktur.

**Fravalgt:** at rette `RESUME_INSTRUCTIONS.txt`s forældede sti og
beholde filen som den er. Ville have løst symptomet, ikke at der er to
kilder til det samme. Se opgave 007 i `work/aabne/`, som pensionerer
filen til en kort pegepind.

---

## 2026-09-14 — Søg bredt før du antager at en fil ikke findes

**Besluttet:** før indhold migreres fra claude.ai-projektet (eller
andetsteds) ind i repoet som en "ny" fil, skal der søges bredt efter en
eksisterende, beslægtet fil — flere navnevarianter, andre mapper, ikke
kun det først gættede sted — før man konkluderer at den ikke findes.

**Hvorfor:** under migreringen af opgave 009-011 blev det opdaget at to
"nye" filer allerede havde en tvilling i repoet: `NEMBADMINTON_API_NOTES.md`
duplikerede `docs/nembadminton-api.md`, og
`docs/historik/dropbox-filstruktur-2026-09-12.md` duplikerede
`docs/historik/dropbox-filstruktur.md`. Begge dubletter blev skabt af
Claude selv, som kun prøvede nogle få gættede stier og konkluderede at
filerne manglede, uden at ramme de rigtige. Fejlen blev fanget af Codex
under dens egen `/plan`-gennemgang, ikke ved kontrol før commit — og
rettet med `git mv` for at bevare historikken på den fil der blev
beholdt.

Dette er en variant af den samme lektie som ovenstående poster: to
steder med samme formål glider fra hinanden, uanset om det er en
sidefil, en `README`, eller en dublet skabt ved en ufuldstændig søgning.
Forskellen her er at fejlen opstod hos den der migrerede, ikke i
strukturen selv — så rettelsen er en arbejdsvane, ikke en ny fil-regel:
`git grep`/bredere stisøgning før en migrering markeres som "ny fil".

**Fravalgt:** at stole på at én eller to gættede stier er nok til at
konkludere at noget mangler i repoet. Et gæt der ikke rammer, ser
identisk ud som et bekræftet fravær, medmindre søgningen faktisk var
bred nok.

---

## 2026-09-15 — work/future/ for opgavekort uden for statistik

**Besluttet:** oprette `work/future/` som et tredje sted for
opgavekort, ved siden af `work/aabne/` (den aktive kø) og `work/loeste/`
(arkivet). Kort her har samme fulde format som et rigtigt opgavekort
(Mål/Kontekst/Afgrænsning/Kontrol/Ved tvivl), for Kampsystem, Dream
Team/Tilmelding, Kampkalender, Søndagstræning og generelt — men er IKKE i
køen og køres ikke, før Chris selv flytter et konkret kort til
`work/aabne/`. Navngives `NNN-kategori-navn.md` med fælles nummerserie,
så Chris kan vælge en hel kategori ad gangen.

**Hvorfor:** `AGENTS.md`s prioritetsregel ("statistik har førsteprioritet
... alt andet venter ... det gælder også gode idéer der dukker op
undervejs — de hører i idébankerne, ikke i opgavekøen") skal stå ved
magt. Men Chris ønskede en måde at have fremtidigt arbejde klart som
rigtige, køreklare opgavekort — ikke kun som løse idébank-linjer — uden
at det reelt springer statistik-køen over. `work/future/` løser det: et
kort der er FÆRDIGT SPECIFICERET er ikke det samme som et kort der er
AKTIVT.

**Fravalgt:** at ændre selve prioritetsreglen og åbne `work/aabne/` for
alle kategorier (ville reelt ophæve statistik-førsteprioriteten). Også
fravalgt: at lade fremtidigt arbejde blive stående som ren
idébank-tekst uden konkret Mål/Afgrænsning/Kontrol — Chris ville have
dem klar til at blive kørt med det samme, ikke skrevet færdigt først når
turen kommer.

---

## 2026-09-15 — statistik/ (SQLite) afløser B3 Klubstatistiks backend, ikke dens design

**Besluttet:** `statistik/`-projektets SQLite-backend er den ENESTE
datakilde og arkitektur for klubbens holdkampstatistik fremadrettet.
`docs/planlagte-features-spec.md`s B3-afsnit ("Klubstatistik — ny
top-level side...", AFTALT 2026-08-31) er backend-mæssigt forældet —
dets Google Sheets-faneblad `AlleResultater`, Netlify scheduled function
og separate synk-pipeline bygges IKKE. Til gengæld genbruges B3's
FRONTEND-design når `statistik/` når Results/Preview-trinnet: placeringen
som ny top-level side i nav'en (ved siden af Forside, GSB Dream Team,
Ungdomssparring, Søndagstræning), Alle/Ung/Sen/Vet-faneskiftet, og
princippet om at den skal ligne resten af sitet visuelt — ikke fremstå
som et løsrevet værktøj.

**Hvorfor:** B3 og `statistik/` viste sig ved nærmere eftersyn at
forfølge samme mål (statistik for hele klubben, ikke kun Dream Teams
GSB 1-4) via samme underliggende Nembadminton-API-kæde
(`badmintonPlayerTeams`→`badmintonPlayerTeamFights`→
`badmintonPlayerTeamMatch`, clubId 1093) — men blev specificeret hhv.
bygget uafhængigt af hinanden, uden nogen krydshenvisning i nogen af de
to sæt dokumenter. `statistik/` er allerede langt inde i Test &
Validation med en solid, verificeret database; at genstarte med B3's
Sheets-arkitektur ville kassere det arbejde for intet. B3's designtanker
(nav-placering, filtre, at det skal se ud som resten af sitet) er
derimod stadig gyldige og værd at genbruge, uafhængigt af hvilken
backend der leverer tallene.

**Fravalgt:** at bygge B3 som specificeret (Sheets + scheduled function)
ved siden af eller i stedet for `statistik/`. Også fravalgt: at lade
`statistik/`s kommende Preview-side opfinde sit eget, uafhængige design
fra bunden, når B3 allerede har et aftalt, klub-testet forslag til
placering og filtrering.

---

## 2026-09-15 — 257 manglende kategorisektioner lukkes; fremtidig klubudvidelse ændrer prioritet

**Besluttet:** opgave 021 (manuel genindhentning af de 257 payloads uden
kategorisektion) lukkes uden yderligere forsøg. De 7 rækker der faktisk
kunne forsøges (den eneste konkrete kandidatliste vi har — se
"Spørgsmål" i `work/loeste/021-genindhent-257-manglende-
kategorisektioner.md`) gav alle en bekræftet tom kilde-side, 0 nye
kategorisektioner. De 257 forbliver dokumenteret som et kildehul, ikke
en importfejl.

Samtidig prioriteres opgave 030 (undersøgelse af om GSB's holdnummer er
en stabil identitet på tværs af `standings`- og `team_matches`-kilderne,
se `statistik/RESEARCH_BACKLOG.md`) højere end tidligere antaget.

**Hvorfor:** spørgsmålet blev rejst eksplicit: hvis `statistik/` en dag
udvides til alle klubber og hold, hvad betyder det for prioriteringen?
To ting følger af det:

1. Manuel CUA-genhentning (én kamp ad gangen, med indbygget
   "vær sparsom"-regel) er ikke en metode der kan skaleres til
   titusindvis af kampe på tværs af alle klubber. At bruge mere tid på
   at perfektionere den for GSB's 257 rækker giver ikke en genbrugelig
   løsning. Er "mangler kategorisektion" en generel BD-kildebegrænsning
   (7/7 negative resultater peger i den retning), er den værd at
   dokumentere ÉN gang og designe importpipelinen til at forvente,
   fremfor at genopdage og genhente den klub for klub.
2. Holdnummer-ustabiliteten (opgave 019/030) er derimod en fejl i selve
   matching-kernelogikken. Den bliver ikke mindre ved flere klubber —
   den bliver potentielt hyppigere, fordi flere klubber giver flere
   puljer hvor mønsteret kan opstå. Den bør derfor afklares FØR en
   eventuel udvidelse, ikke efter.

**Fravalgt:** at bygge den fulde 257/109-kandidatliste (kamp-ID, sæson,
pulje, leagueMatchId for alle rækker) for at kunne køre en større
stikprøve nu. Vurderet som uforholdsmæssigt arbejde for en metode der
alligevel skal designes om, hvis/når projektet skalerer til flere
klubber. Noteret som fremtidigt undersøgelsespunkt i
`statistik/RESEARCH_BACKLOG.md` i stedet for en aktiv opgave.

---

## 2026-09-15 — Stillingskontrol lukkes; spiller-ID-risiko åbnes som næste opgave

**Besluttet:** "Kampantal er holdt op mod stillingerne"-kriteriet i
`docs/statistik-plan.md` lukkes. De 21 rækker der efter opgave 020
forbliver genuint uforklarede, undersøges ikke yderligere nu. Punktet
flages eksplicit til genoptagelse, hvis statistikprojektet en dag
udvides til en national database — se `statistik/RESEARCH_BACKLOG.md`.

Samtidig åbnes opgave 032: en stikprøve af de 2.556 spillere der kun
er koblet via navnematch (ingen BadmintonPlayer-ID, jf. opgave 016), for
at afgøre om der er konkrete tegn på navnekollisioner eller
-splittelser, før Results-rapporten bygges på dem.

**Hvorfor:** de to punkter har meget forskellig konsekvens. Stillingskontrol
er en krydskontrol af kampantal — går den galt, er det en ukendt fejlkilde
i optællingen, ikke i selve holdkamp- eller individueldata, og fire
undersøgelsesrunder (015, 018, 019/030, 020) har allerede udtømt de
oplagte spor. Spiller-ID-koblingen fødrer derimod direkte ind i
Results-rapportens kernefunktion (per-spiller kampantal og
vinderprocent) — en unavngiven navnekollision eller -splittelse ville
give synligt forkerte spillertal uden at være synlig i selve
dækningsprocenten. Det er billigere at stikprøvetjekke nu end at opdage
det i en rapport nogen stoler på.

**Fravalgt:** at lade Test & Validation som helhed forblive åben
udelukkende på stillingskontrol-punktet. Det punkt er udtømt for nu og
adskiller sig reelt fra spiller-ID-risikoen, som er den eneste
resterende reelle blokering for at lukke trinnet.

---

## 2026-09-15 — Præcisering af ungdomsstatus (opgave 039)

Opgave 038 viste, at statistikdatabasen fra begyndelsen var klubbred:
2.818 holdkampe, 20.319 individuelle kategorier og 67.196 spillerrelationer
er optalt uden aldersfilter. Opgave 033–038 var derfor en nedbrydning og
validering af ungdomsandelen, ikke en scopeudvidelse. U09–U15 udgør 1.207
af de 2.818 holdkampe; U17/U19 udgør 147, og veteran-grupperne 958.

Opgave 035's 162 rækker er den aktuelle delmængde af de 451 holdkampe uden
individuelle rækker, hvor 205 er U09–U15. En direkte fuld sammenligning med
013's oprindelige 257+58 er ikke mulig, fordi den fulde historiske ID-liste
ikke er bevaret; fem overlap er dokumenteret i 013's 20-rækkers stikprøve.
Dette ændrer ikke måletallene eller Test & Validation-statussen.

---

## 2026-09-15 — Test & Validation officielt lukket (hele datasættet)

**Besluttet af Chris:** Test & Validation-trinnet for statistikprojektet er
officielt afsluttet, og arbejdet går videre til Results.

**Baggrund:** opgave 038 viste at databasens grundtal altid har været
klubbrede (2.818 holdkampe, 20.319 individuelle kategorier, 67.196
spillerrelationer — ikke kun senior). Opgave 033–041 gennemgik derfor alle
fem oprindelige Test & Validation-kriterier med aldersopdeling, for at
bekræfte at den tidligere lukning (2026-09-15, før denne gennemgang) reelt
holder klubbredt:

- **Individuel dækning:** 162 ungdomsrækker klassificeret (opgave 035),
  bekræftet som præcis delmængde af det eksisterende 451-tal (opgave 039).
- **458-afvigelser:** 171 ungdomsrækker identificeret, uafhængigt
  genberegnet og 100 % identisk (ID for ID) med opgave 006's oprindelige
  klassifikation (opgave 040).
- **Spilleridentitet:** alle 8.859 ungdoms-navnematch-relationer uden
  external ID auditeret (ikke stikprøve) — 0 kollisioner (opgave 036).
  Efterfølgende udvidet til alle 9.691 ungdoms-spiller-holdkamp-relationer
  uanset ID-status for at udelukke dublet-import — 0 fund (opgave 041).
- **Stillingskontrol:** 27 af de 98 rækker er ungdom, heraf 6 af de 21
  genuint uforklarede — alle allerede dækket af eksisterende status
  (opgave 040).
- **Blivende undtagelser:** uændret, allerede eksplicit ungdomsmærket
  (4 U09-kampe) fra før denne gennemgang.

Ingen af de fem kriterier ændrede status under gennemgangen. Formålet var
udelukkende at bekræfte at "klubbredt" ikke skjulte noget der ville have
ændret konklusionen for "senior" — hvilket det ikke gjorde.

**Konsekvens:** Results-rapporten bygges nu på et fuldt eftervist,
klubbredt datasæt (senior, U09-U19, veteran), ikke kun senior. Se
`docs/statistik-plan.md`s "Results"-afsnit og det tilhørende opgavekort
for hvad rapporten skal indeholde.

## 2026-09-19 — `apps/netlify-prod/` røres kun ved ny feature og med eksplicit godkendelse

**Besluttet:** ingen ændringer i `apps/netlify-prod/` som en del af nogen
opgave, medmindre formålet er at introducere en ny, besluttet feature i
produktion — og selv da kun efter Chris' eksplicitte godkendelse af den
konkrete ændring, ikke en generel tilladelse givet én gang. Fejl fundet
under test af eksisterende funktionalitet dokumenteres (fil, linje,
input, forventet/faktisk), rettes ikke som en del af testopgaven.

**Hvorfor:** Kampsystemet bruges live af trænerne. En fejl her rammer
nogen midt i en træning, ikke en rapport ingen læser med det samme.

**Fravalgt:** at lade "oplagte" rettelser passere som en del af en
testopgave, eller at lade én tidligere godkendelse gælde for fremtidige
ændringer.


## 2026-09-26 — Prioritetsreglen for Statistik blødgjort til en status, ikke en spærre

**Besluttet:** "Statistik har førsteprioritet, alt andet venter" erstattes af
"Statistik er det Chris pt. arbejder på". Andre opgaver (Kampsystem,
Dream Team, dokumentoprydning m.m.) må oprettes og løses sideløbende når
Chris beslutter det — et kort i `work/aabne/` er i sig selv beslutningen,
uanset hvilket projekt det hører til.

**Hvorfor:** Den oprindelige regel var tænkt som midlertidig fokusering
mens statistikprojektet var i gang, ikke en permanent begrænsning. Den
blev opdaget som friktion da tre reelle, uafklarede punkter (fejl i
`docs/preview-vs-live-status.md`, `kampsystem/build3.py`s hårdkodede
stier, manglende strukturguide) blev fundet under en dokumentoprydning og
ikke kunne oprettes som opgaver uden først at ændre reglen.

**Fravalgt:** at fjerne linjen helt uden erstatning — det er stadig
nyttigt at kunne se hvad hovedfokus er, bare uden at det blokerer andet.
