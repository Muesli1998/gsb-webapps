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

Opgave 032 undersøgte om de 2.556 navnematch-koblede spillere reelt
udgør en identitetsrisiko. **7 mistænkte navnekollisioner** blev fundet
(kampe på to GSB-hold samme dato) blandt de 25 mest aktive — se
"Status på Test & Validation som helhed" nedenfor og
`statistik/results/032-spiller-navnematch-risiko.md`. Risikoen er
bekræftet reel, ikke længere hypotetisk, men uafklaret uden fuld
ID-kobling eller en manuel gennemgang af de 7 navne.

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

**Ikke en del af dette trin:** U15 og yngre, turnerings- og
spillerprofil-sporet, historiske ranglistepoint. Alt det er
Videreudvikling.

**Status på Test & Validation som helhed (opdateret 2026-09-15):** alle
fem kriterier ovenfor opfylder nu deres egen ordlyd (individuel dækning,
458-klassifikation, spilleridentitet, stillingskontrol, blivende
undtagelser). Stillingskontrol-punktet er eksplicit lukket ved Chris'
beslutning (se ovenfor). Spilleridentitet-punktet er derimod IKKE
færdigbehandlet: 85,2 % dækning hviler på et gemt ID, men de
resterende 14,8 % (9.926 relationer, 2.556 spillere) hviler på
navnematch alene. Opgave 032 (to runder — runde 1's dublet-tjek var
tautologisk og blev forkastet, se `statistik/RESEARCH_BACKLOG.md`)
fandt i runde 2 konkret adfærdsmæssig evidens: **7 af de 25 mest
aktive navnematch-spillere har kampe registreret for to GSB-hold samme
dato (22 kampforekomster)** — Lasse Bjerregaard Kirt, Konrad Kunckel,
Norr Bagge Køhler, Pelle Emil Jessing Schjøtt, Kasper Gorm, Lasse
Friberg Andersen og Sebastian Larsen Lund. Det er ikke bekræftet om
det er reelle navnekollisioner (to fysiske personer) eller
registreringsfejl — begge kræver stadig fuld ID-kobling for at
afklares endeligt, se `statistik/results/032-spiller-navnematch-
risiko.md`. Trinnet som helhed kan derfor ikke lukkes på dette
kriterium endnu.

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

**"Rækkefølge"s punkter 1, 2, 3 og 5 er opfyldt. Punkt 4
(spiller-ID-kobling) er delvist opfyldt og afventer opgave 032's
stikprøve af navnematch-risikoen, før Test & Validation som helhed kan
lukkes**, jf. AGENTS.md's regel om at trin ikke overhaler hinanden
stiltiende. Viser opgave 032 at risikoen er lav, er trinnet reelt klar
til at lukkes; viser den konkrete kollisioner eller splittelser, bør
fuld ID-kobling (foreslået i opgave 016) gøres først.

---

## Results

Trinnet er passeret når grundessensen kan aflæses uden at åbne databasen.

Konkret en rapport der for hver sæson viser klubbens hold, kampe, vundne
og tabte, og for hver spiller antal kampe og vinderprocent fordelt på
kategori. Plus en oversigt over hvad der mangler og hvorfor, så tallenes
pålidelighed kan vurderes af den der læser dem.

Formatet er sekundært. Kravet er at et menneske kan se hvad data siger,
og hvor sikkert det er.

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
4. **[Delvist afsluttet — 016] Kobl spiller-ID'er.** 85,2 % af relationerne
   har ID; den resterende kobling er stadig en separat byggeopgave.
5. **[Lukket ved Chris' beslutning 2026-09-15 — 015/018/019/020/030]
   Stillingskontrol:** kampantal per sæson og pulje mod officielle
   stillinger. 24/98 eksakte matches, men alle 98 rækker har nu en
   dokumenteret status (se "Kampantal er holdt op mod stillingerne"
   ovenfor) — 77 forklarede/kendte, 21 dokumenteret genuint uforklarede.
   Opfylder kriteriets egen ordlyd. Genoptages kun hvis statistikprojektet
   udvides til en national database (se flag ovenfor).
5b. **[Afsluttet, to runder — 032] Spiller-navnematch-risiko:** stikprøve
   af om de 2.556 spillere uden BadmintonPlayer-ID dækker over
   navnekollisioner eller -splittelser. Runde 1's dublet-tjek var
   tautologisk og blev forkastet; runde 2 fandt 7 mistænkte kollisioner
   (kampe på to GSB-hold samme dato) i de 25 mest aktive. Risikoen er
   bekræftet, men ikke endeligt afklaret — se
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
