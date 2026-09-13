# LOG-ENTRY (klar til indsættelse i claude/gsb-kampsystem-idebank.md)

**VIGTIGT:** Projects-værktøjet er deaktiveret i denne session (samme situation som opstod midt i
den umiddelbart forudgående genopbygningssession samme dag — se
`LOG-ENTRY-kampsystem-genopbygning-2026-09-07.md`) — jeg kunne derfor IKKE skrive denne log ind i
`claude/gsb-kampsystem-idebank.md` via `project_write`, selvom det er et krævet trin i opgaven.
Denne fil er en stand-in: indsæt teksten nedenfor NEDERST i `claude/gsb-kampsystem-idebank.md`
(efter det eksisterende "OPDATERING 2026-09-07 — kampsystem_source.html GENOPBYGGET 100% FRA
DOKUMENTATION..."-afsnit, som er filens nuværende sidste afsnit), næste gang Projects-værktøjet er
tilgængeligt igen. Følg START-HER.md's fulde protokol for store dokumenter ved den indsættelse
(frisk læsning umiddelbart før skrivning, backup af det friske pre-ændrings-indhold til
`D:\Dropbox\gsb-claude-projekt-docs-backup\gsb-kampsystem-idebank.md`, og et kort
stop-betingelses-tjek bagefter: længde, ingen placeholder-tekst, forventede overskrifter til
stede) — ingen undtagelse.

En pre-ændrings-backup af filens indhold (frisk læst tidligere i denne session, 88.425 bytes) er
allerede skrevet til `D:\Dropbox\gsb-claude-projekt-docs-backup\gsb-kampsystem-idebank.md` og
byte-størrelse-bekræftet ved read-back — men filen kan være ændret af andre sessioner i
mellemtiden, så en FRISK læsning lige før selve indsættelsen er stadig påkrævet, ikke kun et tjek
af denne allerede eksisterende backup.

---

## OPDATERING 2026-09-07 (samme dag, opfølgende session) — Chris' seks testfund efter genopbygningen: FEM RETTET OG TESTET, ét (UI-polish) forbedret

Chris testede den genopbyggede standalone-fil fra opdateringen ovenfor og fandt seks konkrete
problemer. Denne opfølgende session (orkestreret, diagnose + fix udført af underliggende
Sonnet-agent) rettede fem af dem i kode og forbedrede UI'en visuelt for det sjette.

### 1. UI "scuffed" sammenlignet med den gamle standalone-fil — FORBEDRET

Chris: "UI er meget værre end det var før desværre, kig på kampsystem_preview_standalone_backup
for at tage inspiration." Den genopbyggede `style.css` var minimal/rå (systemfont, fladt design)
sammenlignet med den ældre (2026-09-01), mere polerede fil. `style.css` skrevet om for at matche
den gamle fils visuelle sprog markant tættere: header-bjælke i accentfarve (`--kamp-accent:
#2f5fa8`), afrundede kort med skygge-agtig kant og luftig padding, farvede badges/chips, tydeligt
primær-styling på det første/hoved-knap i hvert kort, ensartet cremehvid baggrund
(`--line-white: #f7f5ef`), samme fonte-stack (`Segoe UI`/system-ui). Alle 3 nyere faner og
funktioner (3-faneopdeling, banekapacitets-planlægger, tving-til-teknik, udskiftningssingle/
-double m.fl.) er bevaret uændret — kun CSS er rørt, ingen markup/logik-ændring.

### 2+3. ROD-ÅRSAG (samme bug bag begge fund): `forsoegKoensblanding()` ombyttede spillere MELLEM rene H/H- og D/D-hold og skabte kønsblandede hold labelet "Double" — RETTET

Fejlfortolkning af en gammel driftlog-idé ("undgå rene H/H mod D/D som MODSTANDERE i høje lag" —
en idé om hvilke to hold der spiller mod hinanden) var i genopbygningen implementeret som en
ombytning af HVEM DER ER PÅ et hold — `forsoegKoensblanding()` byttede aktivt en spiller fra et
rent H/H-hold med en spiller fra et rent D/D-hold (øverste ~35% af puljen, målt på
hold-gennemsnit), hvilket producerede kunstige 1H+1D "double"-hold i stedet for ægte damedouble.
Det er derfor Chris næsten aldrig så en ren damedouble, og derfor et skærmbillede viste "Bane 2 —
Double: Hannah Phoebe Ejada Clausen + Tobias Weinreich Hansen mod Kenn Blæsbjerg Christensen +
Linda Bækgaard" (to reelt kønsblandede "double"-hold).

**Fix i BÅDE `engine.js` og `app.js`'s `formTeams()`:** kaldet til `forsoegKoensblanding()` er
fjernet fra den aktive kodesti (funktionen selv er bevaret, udokumenteret-kaldt, hvis den korrekte
"undgå H/H-mod-D/D som modstandere"-idé (en ombytning af hvilke to allerede rent-kønnede HOLD der
spiller mod hinanden, ALDRIG hvem der er PÅ et hold) skal bygges separat senere). `formTeams`
splitter nu puljen i herrer/damer/ukendt-køn, danner hold inden for hvert køn for sig (samme
rating-nabo-parrings-logik/filosofi som før, nu kørt separat pr. køn), og lægger dem sammen
bagefter. Ukendt-køn-spillere fordeles til den mindste gruppe (skiftevis) for at holde begge
grupper lige. Et REELT ulige antal i begge køn SAMTIDIG (fx 3 kvinder + 3 mænd, hver med én til
overs) krydsparres som SIDSTE UDVEJ til ét enkelt H+D-hold, fremfor at begge sidder unødvendigt
over — men kun når begge køn faktisk har en rest på samme tid, aldrig systematisk.

**Verifikation:** ny test `test_koen_og_rating.js` (mod `engine.js` isoleret) bekræfter: 6D+6H
kun-double → præcis 3 DD-hold + 3 HH-hold, 0 kønsblandede hold, 0 oversiddere; 3D+4H → intet
krydshold dannes (kun ét køns rest), den overskydende kvinde ender korrekt i "sidder over" sammen
med det svageste hold; 3D+3H (begge ulige samtidig) → ét H+D-krydshold dannes som sidste udvej
fremfor to unødvendige enkelt-oversiddere. Ny test `test_app_fixes.js` (mod den fulde, byggede
`app.js` i jsdom, med hele 61-spiller-rosteret) kører en ægte Senior-gruppe-runde (kun double
valgt) og bekræfter: mindst én ægte DD-mod-DD-kamp dannes, og højst ét kønsblandet hold opstår i
hele runden (dvs. INGEN systematisk ombytning som den gamle bug — kun den legitime,
sidste-udvejs-krydsning kan forekomme, og kun én gang). Punkt 3 (fejlmærkning "Double" på
kønsblandede hold) er dermed automatisk løst — der findes ikke længere kønsblandede
"double"-labelede hold i praksis (bortset fra den sjældne, legitime sidste-udvej).

### 4. Uratede spillere manglede en "effektiv rating"-fallback til parring/visning — RETTET

Den genopbyggede kode havde IKKE genskabt den oprindelige (tabte) `fallbackRating`-mekanisme —
`sortEfterRating` brugte `(b[ratingKey] || 0)`, så en uratet spiller (`null`) blev regnet som 0
point ved sortering/parring/forventet-%-visning, hvilket ødelagde både parring (uratede spillere
havnede altid forkert i sortering) og forventet-%-visningen (viste tæt på 100/0% mod en normalt
ratet modstander).

**Fix:** ny hjælpefunktion `effektivRating(spiller, ratingKey)` (`= spiller[ratingKey] != null ?
spiller[ratingKey] : 2000`, Chris' eksplicitte 2000-point-regel), tilføjet i BÅDE `engine.js` og
`app.js`, og brugt overalt en rating læses til sortering/parring/forventet-%: `sortEfterRating`,
`holdRating` (nu `effektivHoldRating` for arbitrære sidestørrelser i selve kort-visningen),
`formTeams`/`formTeamsMixed`s interne parring, og `byggMatchCard`s forventet-%-beregning.
`kampsystem_source.html`/standalone bygger deres logik direkte fra `app.js` via `combine.py` (ingen
separat, tredje kopi af logikken) — så denne rettelse dækker automatisk begge de byggede HTML-filer
uden yderligere ændringer der.

**ELO-opdaterings-beskyttelsen tjekket eksplicit (Chris' udtrykkelige krav om IKKE at røre selve
opdateringsreglen):** `registerVinder()` i `app.js` brugte allerede `if (p[ratingKey] != null)` til
at undlade at opdatere EN uratet spillers egen rating — men denne beskyttelse var UTILSTRÆKKELIG:
modstanderens RIGTIGE rating blev stadig opdateret ud fra en sammenligning mod den uratede
spillers `|| 0`-fallback (0 point), hvilket ville have givet modstanderen en helt urimelig,
forkert ratingændring. Rettet: `registerVinder()` tjekker nu FØRST, med de RIGTIGE (ikke
2000-fallback) værdier, om ALLE fire deltagere i kampen faktisk har en rigtig rating i den spillede
kategori — hvis ikke, springes HELE ratingopdateringen for kampen over (ingen af de to sider
ændres), men kampen tælles og logges stadig i kamplog/H2H som normalt.

**Verifikation:** `test_koen_og_rating.js` bekræfter `effektivRating`/`FALLBACK_RATING` og at
`sortEfterRating` nu sorterer en uratet spiller (2000) korrekt over en lavt ratet (1000) men under
ingen (dvs. som en middel spiller, ikke sidst). `test_app_fixes.js` bekræfter med rigtige
roster-spillere (Andreas Drasbek, uratet single, mod Malthe Baltzer, ratet): efter
`registerVinder()` er Andreas' rating stadig `null` (ikke sat til noget afledt af 2000-fallbacken),
OG Malthes rigtige rating er UÆNDRET (kampen talte ikke som en reel ratingkamp) — samt en
kontroltest der bekræfter at to NORMALT ratede spilleres kamp stadig opdaterer begges rating som
altid (beskyttelsen er ikke for bred).

### 5. Udskiftningssingle/-double valgte bare `alleKampe[0]` i stedet for den bedst egnede kamp — RETTET

I `app.js`s udskiftnings-logik blev en overskydende spiller sat ind i den FØRSTE fundne
single-/team-kamp uanset niveau — Chris' konkrete eksempel var en meget stærk spiller (fx Jonas
Trussel-Jensen) presset ind på en bane med langt svagere spillere.

**Fix:** ny hjælpefunktion `vaelgTaetteseteKamp()` vælger nu, blandt de tilgængelige kandidatkampe,
den hvis deltageres GENNEMSNITSRATING (i den relevante kategori, med `effektivRating`-fallback for
uratede deltagere) ligger tættest på den overskydende spillers egen (effektive) rating — for BÅDE
udskiftningssingle- og udskiftningsdouble-valget.

**Verifikation:** `test_app_fixes.js` opstiller en situation med to meget forskellige
single-niveauer (to svage spillere i én kamp, to stærke i en anden) plus én ekstra, høj-ratet
overskydende spiller — bekræfter at udskiftningsspilleren (uanset hvilken af de fem der reelt blev
"til overs" af den eksisterende oversidder-udvælgelse) altid havner på den STÆRKE kamp, aldrig den
svage.

### 6. Yiting Chen og Guanyan Chen fejlagtigt sat til "D" (dame) — RETTET, er begge herrer

Rettet fra "D" til "H" for begge navne ALLE steder de forekommer: `kampsystem_roster.json`,
`build_roster.py`, `build3.py`/`build3_updated.py`s `KAMPSYSTEM_ROSTER` (både i data-listen og
bekræftet af en allerede eksisterende, men internt inkonsistent `PLAYERS_2627_HERRER`-navneliste i
samme fil, som allerede listede begge navne som herrer baseret på faktisk kamphistorik-data —
`koen`-feltet i selve roster-listen havde blot ikke fulgt den liste). `kampsystem_source.html`/
`kampsystem_preview_standalone.html` indeholder ingen separat, tredje kopi af rosteret — de bygges
fra `kampsystem_roster.json` via `combine.py`, så rettelsen er automatisk med i de genbyggede
HTML-filer.

**Andre navne i rosteret værd for Chris selv at dobbelttjekke (IKKE rettet på egen hånd — kun
flagget, samme "gæt aldrig"-regel som resten af kønsseedingen):**
- **Qingyi Marie Han** (nuværende `koen: "D"`) — kinesisk fornavn, kan ikke afgøres entydigt ud fra
  et dansk perspektiv (samme kategori fejl som Yiting/Guanyan Chen, som netop viste sig forkerte).
- **Mina Lorin Özden** (nuværende `koen: "D"`) — "Özden" er et tyrkisk efternavn; "Mina" er
  sandsynligvis korrekt som kvindenavn i både dansk/tyrkisk/persisk kontekst, men flagges for en
  sikkerheds skyld givet det udenlandske efternavn.

Ingen af disse to er ændret — kun flagget til Chris' egen bekræftelse.

### Regressionstests

Kørt og bestået: `test_core_tal.js` (17 delassertions, upåvirket — `genererRunde` i `engine.js` er
en ren kapacitets-planlægger og kalder ikke `formTeams`), `test_mixed_og_gentagelse.js` (upåvirket
— `formTeamsMixed` og gentagelses-logikken er ikke rørt af denne runde), `test_jsdom_ui.js` (kørt
mod den genbyggede standalone-fil med det nye CSS — alle eksisterende assertions stadig bestået,
bekræfter UI-ændringen ikke brød nogen funktionalitet), samt to helt nye testfiler:
`test_koen_og_rating.js` (engine.js-niveau, punkt 2/3/4 — se ovenfor) og `test_app_fixes.js`
(fuld app.js-niveau i jsdom mod det rigtige 61-spiller-roster, punkt 2/3/4/5/6 — se ovenfor). Ingen
regressioner på tidligere verificerede tal (40/10-baner→10/0, 36/10→8 double+2 single/0 oversiddere,
osv.).

### Leveret og synkroniseret (med read-back-verifikation)

1. Ny `kampsystem_preview_standalone.html` (99.879 bytes) sendt til Chris.
2. **Backup taget FØR overskrivning** (denne sessions "scuffede", men funktionelt nyeste filer):
   `kampsystem_source_BACKUP_2026-09-07-v2.html` (48.758 bytes),
   `kampsystem_preview_standalone_BACKUP_2026-09-07-v2.html` (94.492 bytes),
   `build3_BACKUP_2026-09-07-v2.py` (35.830 bytes) — alle tre skrevet til
   `D:\Dropbox\gsb-claude-preview-kilde\` og størrelsesbekræftet ved read-back FØR de rettede filer
   blev skrevet.
3. Rettede filer skrevet til samme mappe: `kampsystem_source.html` (54.145 bytes),
   `kampsystem_preview_standalone.html` (99.879 bytes), `build3.py` (35.830 bytes, kun
   `koen`-felterne ændret, samme størrelse som før).
4. **Read-back-verifikation udført og bestået for ALLE tre skrevne filer** — hver fil læst tilbage
   fra Dropbox og SHA-256-hashet mod den lokale kopi: `kampsystem_source.html`
   (797d699d2a54c3f7…), `kampsystem_preview_standalone.html` (7471a301ba4741a0…), `build3.py`
   (e7e0e53a1c3f6527…) — alle tre byte-identiske. **Bemærk:** den første commit af
   `kampsystem_source.html` fejlede stille (device_commit_files rapporterede success, men
   read-back viste stadig den GAMLE fils hash/størrelse — præcis den kendte fejlklasse fra den
   forrige genopbygningsrunde) — opdaget PRÆCIS fordi read-back-trinnet blev fulgt uden undtagelse,
   rettet med et fornyet commit-forsøg (`force:true`), og derefter bekræftet byte-identisk ved en
   ny read-back. Endnu et konkret eksempel på hvorfor dette trin er ufravigeligt.
5. **Rørt IKKE:** `netlify-tool-prod` eller nogen produktionsfiler. **Bygget/deployet IKKE:**
   Sheets-persistens eller andre features ud over de seks fund ovenfor.

**Status:** alle seks fund fra Chris' test er adresseret (fem rettet i kode og testet, UI-punktet
forbedret visuelt) — afventer Chris' fornyede test af den opdaterede standalone-fil, samt hans
bekræftelse/rettelse af de to yderligere flaggede, usikre kønsdata-navne (Qingyi Marie Han, Mina
Lorin Özden).
