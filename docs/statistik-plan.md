# Plan for statistikdelen

Skrevet 2026-09-13 ud fra `statistik/RESUME_INSTRUCTIONS.txt`,
`statistik/RESEARCH_BACKLOG.md`, `results/CURRENT_VALIDATION_STATUS.md`,
`results/coverage-report.md`, `results/individual-coverage-gap-audit.md`,
`results/terra-action-items.md`, `results/VALIDATED_BROWSER_METHOD.md` og
`results/COMPLETE_RESULT_FALLBACK_METHOD.md`.

Statistik har førsteprioritet indtil Prod Push, jf. `AGENTS.md`. Denne fil
siger hvad der skal være sandt før hvert trin er passeret.

---

## Hvor vi står

2.818 deduplikerede holdkampe i SQLite, hvoraf 2.812 har dokumenteret
hjemmehold, udehold og holdresultat. 20.319 individuelle kategorier fordelt
på 2.367 af holdkampene. 67.196 spillerrelationer, 7.599 unikke spillere.
Ingen foreign-key-fejl eller ID-dubletter.

Tallene er klubbredt optalt uden `age_group_id`-filter. Holdkampene fordeler
sig sådan:

| Gruppe | `age_group_id` | Holdkampe |
|---|---:|---:|
| Senior | 1 | 506 |
| U09–U15 | 2–5 | 1.207 |
| U17/U19 | 6, 18 | 147 |
| Veteran | 9, 11, 12, 13, 17 | 958 |
| **I alt** |  | **2.818** |

Opgave 038 bekræftede, at også 20.319 individuelle kategorier og 67.196
spillerrelationer er klubbredde totaler. Opgave 033–037 var derfor en
aldersopdelt måling og fejlkontrol af et allerede eksisterende datasæt —
ikke en udvidelse af databasens scope.

De dokumenterede huller er kendte og afgrænsede: 315 holdkampe med
holdresultat mangler individuelle rækker, 458 holdkampe afviger mellem
holdresultat og individuelle resultater, samt fire U09-kampe og to
corona-suspenderede kampe som blivende undtagelser. De øvrige 130 kampe
uden individuelle rækker er dokumenteret som 85 `browser_verified_no_result`
og 45 øvrige `corona_suspended`.

Grundlaget er altså solidt. Det der mangler, er individuel dækning og
klassifikation — ikke at hente forfra.

---

## Den tekniske knude der skal løses først

`VALIDATED_BROWSER_METHOD.md` dokumenterer at Playwright med en frisk
kontekst ofte kun returnerer standardskallen på omkring 292 tegn. Det der
virkede, var Codex' egen in-app-browser. Oveni kunne den seneste kørsel
slet ikke starte Playwright (spawn EPERM).

Der er altså to forskellige problemer: ét miljømæssigt, som måske kun
gælder den sandkasse kørslen foregik i, og ét arkitektonisk, hvor siden
ikke initialiseres fuldt ud.

Men `RESEARCH_BACKLOG.md` beskriver et tredje spor: BadmintonPlayers
ASP.NET-webservicelag, hvor `SearchTournamentMatches` returnerer kamp- og
resultat-HTML direkte, når en frisk `SR_CallbackContext` først er hentet
fra sidens HTML. Det er hidtil kun afprøvet på turneringer.

**Anbefalet udtræksvej:** Opgave 004 har bekræftet turnerings-
webservicelaget, men ikke fundet en holdkampmetode. Playwright kan starte
lokalt, men passerer ikke render-gaten for referencekampen i en frisk
kontekst. Byg derfor ikke masseextractoren endnu; behold den validerede
in-app-browsermetode som manuel fallback, indtil én af de to automatiske
ruter er reproduceret. Se `statistik/results/004-udtraeksvej.md`.

---

## Test & Validation

Trinnet er passeret når alt nedenstående er sandt.

**Individuel dækning er lukket.** Hver af de 2.818 holdkampe har enten
individuelle rækker eller en dokumenteret grund til ikke at have det. De
315 nuværende huller er allerede klassificeret som 257 payloads uden
kategorisektioner og 58 med kategorier uden scores, hvoraf 57 har
eksplicit no-play-tekst. En sæsonstratificeret stikprøve på 20 af de 257
payloads med manglende kategorisektioner viser ingen kategorisektion i den gemte, renderede browsertekst — også
for kampe med holdresultat uden eksplicit afbud. De behandles derfor som
et dokumenteret kildehul i det nuværende materiale, ikke som en
importfejl. En ny manuel indhentning kræver en særskilt opgave.

De resterende 130 af de 451 uden individuelle rækker (ikke en del af de
315) er bekræftet ved SQL i opgave 031: 85 `browser_verified_no_result`
og 45 øvrige `corona_suspended`-kampe — begge statusser der i sig selv
forklarer fraværet af individuelle rækker (intet spillet). 100 % match,
ingen kampe uden for de to statusgrupper. Se
`statistik/results/031-komplet-individuel-daekning.md`.

**De 458 afvigelser er klassificeret efter evidens** i de fem kategorier
der allerede er navngivet i genoptagelsesinstruktionen: administrativ
bemærkning eller protest, Golden Set, manglende kategori, rå
resultatmarkør, og reel uoverensstemmelse. Klassifikation betyder at
evidensen er gemt ordret — ikke at årsagen er gættet.

**Spilleridentitet hviler på ID, ikke navn.** Audit i opgave 016 viser
57.270 af 67.196 spillerrelationer (85,2 %) med gemt eksternt
BadmintonPlayer-ID; 9.926 relationer og 2.556 spillere mangler et sådant
ID. Spillere kobles via BadmintonPlayer-links
(`/DBF/Spiller/VisSpiller/#<playerId>`), men navnematch alene er ikke en
sikker identitet. Den resterende kobling er en separat byggeopgave, ikke
en del af denne audit; se `statistik/results/016-spiller-id-audit.md`.

Opgave 032 (tre runder) undersøgte om de 2.556 navnematch-koblede
spillere reelt udgør en identitetsrisiko, blandt de 25 mest aktive.
**7 mistænkte navnekollisioner** blev fundet i runde 2 (kampe på to
GSB-hold samme dato) — men alle 7 er siden afkræftet: Konrad Kunckel
ved Chris' manuelle tjek, de øvrige 6 ved at tilføje rækketype
(`league_raw`/`name_raw`) til tjekket i runde 3, som viste at samtlige
samme-dato-fund lå i forskellige rækker (typisk flere ungdoms-kamptyper
samme dag — normal praksis, ikke en fejl). Se
`statistik/results/032-spiller-navnematch-risiko.md`. Ingen bekræftet
kollision i den undersøgte stikprøve — men stikprøven dækker kun de 25
mest aktive af 2.556, så risikoen for resten er ikke kvantificeret.

**Kampantal er holdt op mod stillingerne — OPDATERET 2026-09-15, alle
98 rækker har nu en dokumenteret status:**

| Kategori | Antal | Status |
|---|---:|---|
| Eksakt match | 24 | Bestået |
| `difference_with_corona_suspended_rows` | 19 | Forklaret (corona-administrativt, kendt mønster) |
| `no_linked_team_matches_in_current_database` | 24 | Rodårsag BEKRÆFTET i opgave 019/030: GSB's holdnummer er ikke en stabil identitet på tværs af `standings`- og `team_matches`-kilderne (usystematisk forskydning, ingen bedre nøgle fundet). Kan ikke rettes med nuværende data — dokumenteret som kendt begrænsning, ikke en bug. |
| `unexplained_from_current_material` | 31 | Undersøgt i opgave 020: 10 fik konkret forklaring (9 `browser_verified_no_result`, 1 protestbemærkning). 21 forbliver genuint uforklarede efter undersøgelse — dokumenteret pr. række, ikke gættet væk. |

**Alle 98 rækker falder nu i en af tre kasser: eksakt match (24), en
forklaret/kendt afvigelse (19 corona + 24 holdnummer-ustabilitet + 10 fra
020 = 53), eller en dokumenteret, genuint uforklaret afvigelse (21).**
Ingen rækker mangler status. Det opfylder ordlyden af kriteriet
("afvigelser er enten forklarede eller dokumenteret som kendte") — de 21
er ikke forklarede, men de ER dokumenterede, hvilket kriteriet
eksplicit tillader.

**Lukket ved Chris' beslutning 2026-09-15.** De 21 genuint uforklarede
rækker undersøges ikke yderligere nu — fire undersøgelsesrunder (015,
018, 019/030, 020) er kørt, og marginalnytten af endnu en runde vurderes
lav uden nyt kildemateriale at gå efter. **Flagget til genoptagelse hvis
statistikprojektet udvides til en national database:** både
holdnummer-ustabiliteten (opgave 030) og de 21 uforklarede
stillingsafvigelser bliver en større risiko ved flere klubber, fordi
flere puljer giver flere steder mønsteret kan opstå ubemærket — se
`statistik/RESEARCH_BACKLOG.md`.

BadmintonPlayers `Stilling`-side er den anbefalede kilde til almindelige
puljer; Nembadminton bruges kun til discovery. Playoffplacering afledes
af semifinaler/finale/bronzekamp, ikke af en opfunden puljestilling. Se
`statistik/results/005-stillingskilde.md`,
`statistik/results/015-stillingskontrol.md`,
`statistik/results/018-no-linked-standings.md`,
`work/loeste/019-ret-matching-noegle-stillingskontrol.md`,
`statistik/results/020-unexplained-standings.md` og
`statistik/results/030-holdnummer-stabilitet.md`.

**De blivende undtagelser står dokumenteret:** fire U09-kampe (505217,
505219, 506407, 506413) hvor API'et giver Internal Server Error og siden
ikke viser dynamisk detalje, og to corona-suspenderede (387862, 387864).
De skal ikke løses. De skal stå med URL, status og rå kilde.

**Ungdomsstatus:** U09–U15 var hele tiden med i datasættet, men blev først
aldersopdelt og særskilt undersøgt i opgave 033–038. De 1.207 kampe indgår
allerede i klubbens 2.818 total. Opgave 035 fandt 115 eksplicitte
afbud/udeblivelser, 46 uden kategorisektion eller afbud og 1 kategori-
sektion uden importerede rækker. Opgave 036 fandt 0 navnedubletter og 0
same-date-fund med samme `league_raw`/`name_raw`. De 46 kandidater,
begrænset discovery og manglende ungdomsstillinger er kendte Results-
begrænsninger, ikke et nyt scope.

Turnerings- og spillerprofil-sporet samt historiske ranglistepoint er
fortsat Videreudvikling.

**Status på Test & Validation som helhed (opdateret 2026-09-15):** alle
fem kriterier ovenfor er vurderet på det klubbredde datasæt og opfylder
deres egen ordlyd (individuel dækning,
458-klassifikation, spilleridentitet, stillingskontrol, blivende
undtagelser). Stillingskontrol-punktet er eksplicit lukket ved Chris'
beslutning (se ovenfor).

**Spilleridentitet-punktet er nu også afklaret, i tre runder (opgave
032).** Runde 1's dublet-tjek var tautologisk og blev forkastet (se
`statistik/RESEARCH_BACKLOG.md`). Runde 2 fandt 7 af de 25 mest aktive
navnematch-spillere med kampe registreret for to GSB-hold samme dato
(22 kampforekomster) — Lasse Bjerregaard Kirt, Konrad Kunckel, Norr
Bagge Køhler, Pelle Emil Jessing Schjøtt, Kasper Gorm, Lasse Friberg
Andersen og Sebastian Larsen Lund — og klassificerede dem som
mistænkte kollisioner. Runde 3 afkræftede alle 7: Konrad Kunckel ved
Chris' manuelle tjek (to forskellige U15-rækker samme dag, normal
praksis), og de øvrige 6 ved at tilføje rækketype
(`league_raw`/`name_raw`) til samme-dato-tjekket — samtlige 6 viste sig
også at ligge i forskellige rækker/kamptyper, typisk flere
ungdomskampe samlet på én dag. **0/25 undersøgte navnematch-spillere
har bekræftet kollisionsevidens.**

Bemærk: alle 7 oprindeligt mistænkte tilfælde lå i ungdomsrækker
(U09/U13/U15), som allerede er uden for dette trins scope (se "Ikke en
del af dette trin" nedenfor) — mønsteret "samme dato, to hold" ser ud
til at være en ungdomsspecifik praksis, ikke en generel datafejl.
Stikprøven dækker kun de 25 mest aktive af 2.556 navnematch-spillere,
så risikoen for resten er stadig ikke kvantificeret — men den ene
konkrete metode der hidtil har fundet mistænkelige tilfælde, har nu
0 bekræftede fund tilbage efter at rækketype blev taget med. Se
`statistik/results/032-spiller-navnematch-risiko.md`.

**Vurdering (ikke en afgørelse — Chris beslutter om trinnet lukkes):**
med dette er alle fem kriterier opfyldt efter deres egen ordlyd, og den
konkrete, undersøgte kollisionsrisiko er afkræftet. Fuld ID-kobling for
resten af de 2.556 er stadig en god idé som separat byggeopgave før
Results bygges for alvor, men det er ikke længere en blokering for at
lukke Test & Validation — det er forebyggende arbejde for Results, ikke
et uafklaret spørgsmål i dette trin.

Den tidligere uoverensstemmelse med "Rækkefølge"s punkt 2 ("Byg den
individuelle extractor") er afklaret ved at læse
`statistik/results/CURRENT_VALIDATION_STATUS.md`: arbejdet er reelt gjort
— 20.319 individuelle kategorier er gemt for 2.367 af de 2.818
holdkampe, udført gennem en række specialiserede scripts
(`run-youth-browser-fallback.mjs`, `run-complete-result-fallback.mjs`,
`sync-browser-field-gaps.mjs` m.fl., se scriptlisten dér), ikke ét
samlet værktøj kaldet "extractoren". Punkt 2 var derfor blevet
overflødiggjort af klassifikationsarbejdet, ikke glemt eller mangelfuldt
udført. Rettet i "Rækkefølge" nedenfor.

**"Rækkefølge"s punkter 1, 2, 3, 5 og 5b er opfyldt. Punkt 4
(spiller-ID-kobling) er delvist opfyldt, men blokerer ikke længere
lukningen af Test & Validation** — opgave 032 har afklaret at den
undersøgte navnematch-risiko er afkræftet, jf. "Status på Test &
Validation som helhed" ovenfor. Den resterende fulde ID-kobling
(85,2 % → 100 %) er en anbefalet byggeopgave for Results-fasen, ikke
en åben betingelse for dette trin.

---

## Results

Trinnet er passeret når grundessensen kan aflæses uden at åbne databasen.

Konkret en rapport der for hver sæson viser klubbens hold, kampe, vundne
og tabte, og for hver spiller antal kampe og vinderprocent fordelt på
kategori. Plus en oversigt over hvad der mangler og hvorfor, så tallenes
pålidelighed kan vurderes af den der læser dem.

Formatet er sekundært. Kravet er at et menneske kan se hvad data siger,
og hvor sikkert det er.

**Note (2026-09-15): 18 uafklarede audit-kandidater fra opgave 006.**
Af de 39 hold-/individafvigelser med en gemt, ordret Bemærkning er 18
uden uafklarede kategorier — de er klassificeret som "administrativ
bemærkning eller protest" (det opfylder Test & Validations kriterium),
men `results/CURRENT_VALIDATION_STATUS.md` markerer dem eksplicit som
"audit-kandidater" der "ikke må automatisk omskrives", og de er så
vidt vides aldrig gennemgået enkeltvis. De 18 konkrete kampe kan dukke
op som mærkelige tal i en hold- eller spillerrapport — værd at have i
baghovedet ved bygning af Results, ikke en blokering for at starte.

---

## Preview

En side i webappen der viser statistikken med spillerfiltre.

Beslutningen om at denne først bygges når dækningen er lukket, står
allerede i `terra-action-items.md` og fastholdes. Grunden er at en
brugerflade bygget på ufuldstændige tal skaber tillid til noget der ikke
er færdigt.

**Design genbruges fra B3 (2026-09-15):** denne side dækker samme formål
som `docs/planlagte-features-spec.md`s B3 "Klubstatistik" — men med
DENNE database som backend, ikke B3's planlagte Google Sheets/
`AlleResultater`. Nav-placering (ny top-level side, ikke en filtrering
inde i en eksisterende side), Alle/Ung/Sen/Vet-faneskiftet, og kravet om
at den skal ligne resten af sitet visuelt, gælder stadig og skal genbruges
her. Se `docs/BESLUTNINGER.md` for begrundelsen.

---

## Prod Push

Siden er live på gsbmore.netlify.app sammen med resten af appen.

---

## Skillen

`CURRENT_VALIDATION_STATUS.md` nævner allerede en senere skill, og
`COMPLETE_RESULT_FALLBACK_METHOD.md` er råmaterialet til den.

**Den skrives når Test & Validation lukker, ikke før.** Metoden har lige
nu et uløst kerneproblem — hvilken rute der overhovedet virker til
masseudtræk. Skrives skillen nu, indkodes problemet. Skrives den bagefter,
indkodes løsningen, og så er den præcis det der gør næste sæson billig.

Den skal indeholde render-gaten, idempotens-mønstret med én fil per kamp,
reglen om at walkover kræver eksplicit `(Ikke fremmødt)`-tekst, og
princippet om at rå data gemmes før fortolkning.

---

## Rækkefølge

1. **[Afsluttet — 004] Afklar udtræksvejen.** Resultat: se
   `statistik/results/004-udtraeksvej.md`.
2. **[Afsluttet, opdaget 2026-09-15] Byg den individuelle extractor.**
   Gjort som flere specialiserede scripts snarere end ét samlet værktøj —
   se `statistik/results/CURRENT_VALIDATION_STATUS.md`s scriptliste.
   20.319 individuelle kategorier er gemt for 2.367 af de 2.818
   holdkampe; de resterende 315 er klassificeret, ikke uudforskede.
3. **[Afsluttet — 006] Klassificér de 458 afvigelser.**
4. **[Delvist afsluttet — 016, ikke blokerende] Kobl spiller-ID'er.**
   85,2 % af relationerne har ID; den resterende kobling er stadig en
   separat byggeopgave, men opgave 032 har afklaret at den blokerer
   ikke Test & Validation — se punkt 5b.
5. **[Lukket ved Chris' beslutning 2026-09-15 — 015/018/019/020/030]
   Stillingskontrol:** kampantal per sæson og pulje mod officielle
   stillinger. 24/98 eksakte matches, men alle 98 rækker har nu en
   dokumenteret status (se "Kampantal er holdt op mod stillingerne"
   ovenfor) — 77 forklarede/kendte, 21 dokumenteret genuint uforklarede.
   Opfylder kriteriets egen ordlyd. Genoptages kun hvis statistikprojektet
   udvides til en national database (se flag ovenfor).
5b. **[Afsluttet, tre runder — 032] Spiller-navnematch-risiko:** stikprøve
   af om de 2.556 spillere uden BadmintonPlayer-ID dækker over
   navnekollisioner eller -splittelser. Runde 1's dublet-tjek var
   tautologisk og blev forkastet; runde 2 fandt 7 mistænkte kollisioner
   (kampe på to GSB-hold samme dato) i de 25 mest aktive; runde 3
   afkræftede alle 7 (forskellige rækker/kamptyper, typisk flere
   ungdomskampe samlet samme dag). 0/25 bekræftede kollisioner — se
   `statistik/results/032-spiller-navnematch-risiko.md`.
6. **Results-rapporten.**
7. **Skillen.**
8. Preview, derefter Prod Push.

---

## Arbejdsprincipper fra statistikprojektet

Disse står i `RESUME_INSTRUCTIONS.txt` og gælder uændret:

Evidens før fortolkning. Ingen gæt uden tydelig mærkning, helst ingen gæt
overhovedet. Rå API- og browserdata bevares. En fejl i én kamp eller rute
skal logges og må ikke stoppe hele testserien. Statusændringer skal kunne
spores i git og i procesloggen.

Hver ny test dokumenteres i `statistik/TEST_RUN_LOG.md`, og
`results/CURRENT_VALIDATION_STATUS.md` opdateres når status ændrer sig.
