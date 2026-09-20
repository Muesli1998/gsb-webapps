# Opgave 076 — ret tre konkrete datafejl fundet under opgave 066 (Hjemme/Ude-fanen)

**Trin:** Test & Validation (datarettelser i `team_matches`) — opdaget som en biprodukt af
Preview-opgave 066, men er selv en datakvalitetsopgave, ikke en Preview-opgave. Løses før 066
færdiggøres, da 066's egne kontroltal ellers bygger på kendt forkerte/manglende data.

**Gren:** `arbejde/076-statistik-hjemme-ude-datarettelser`, jf. `AGENTS.md`.

**Baggrund:** Opgave 066 (Hjemme/Ude-fanen) fandt 13 `team_matches`-rækker hvor hverken
`home_name_raw` eller `away_name_raw` entydigt matcher GSB-holdets `name_raw`. Claude undersøgte
alle 13 direkte i den aktuelle Dropbox-database (læst read-only) og fandt tre forskellige,
navngivne rodårsager — ikke ét problem:

**Gruppe A — 6 rækker, "BC37/Gladsaxe Søborg 1" (sæson 2020/21, `gsb_team_id=252`):**
388606, 388609, 402365, 402367, 388870, 388873. GSB spillede den sæson i en fusion med BC37, så
holdnavnet i kildeteksten er `BC37/Gladsaxe Søborg 1`, ikke det rene `Gladsaxe Søborg 1`. Teksten er
historisk korrekt — det er ikke en fejl i kilden, kun en matchning der er for snæver.
**Chris' beslutning (2026-09-20): BC37/Gladsaxe Søborg 1 tæller som et GSB-hold.** Ret ikke
`home_name_raw`/`away_name_raw` (historisk korrekt tekst, rør ikke), men ret MATCHNINGSREGLEN i
koden (Hjemme/Ude-fanen, og evt. andre steder der afgør hjemme/ude eller "er dette GSB") til at
genkende `BC37/Gladsaxe Søborg`-varianter som ækvivalente med GSB-holdet.

**Gruppe B — 2 rækker, corona-suspenderede uden hjemme/ude-tekst:**
387862 (`gsb_team_id=267`, sæson 2020) og 387864 (samme hold). Begge har tomme
`home_name_raw`/`away_name_raw`, fordi ingen dynamisk kampdetalje findes for corona-suspenderede
kampe. **Chris kender de faktiske forhold fra hukommelse (2026-09-20): GSB var hjemme i 387862;
Lyngby var hjemme i 387864.** Dette er en reel udfyldning af manglende data fra en pålidelig kilde
(Chris selv), ikke et gæt — men det ER en skrivning til databasen, og skal ledsages af en tydelig
kildeanmærkning (se Mål).

**Gruppe C — 1 række, forkert klub-kobling:** 484777 (sæson 2024, `competition_id=79`,
`gsb_team_id=83`). `competition_id=79` er en lille placeringspulje (5.-8. plads,
"DMU Hold U11C Placeringskampe") med flere klubber. 484777's rå tekst er "Badminton Esbjerg" vs.
"Kolding BK" — en ægte kamp, men uden GSB på nogen side. Importen har tilsyneladende hentet ALLE
kampe i puljen (også de to andre klubbers indbyrdes kamp), ikke kun GSB's egne. **Chris bekræfter
(2026-09-20): det ER en ægte Esbjerg-Kolding-kamp, ikke en GSB-kamp.** Denne række hører ikke i
GSB's `team_matches` og skal fjernes derfra — men undersøg FØRST om samme importfejl har ramt andre
kampe i samme eller andre placeringspuljer, før du kun retter denne ene række.

## Mål

1. **Gruppe A (kode, ingen DB-skrivning):** find og ret den/de steder i kodebasen der afgør
   hjemme/ude eller "hører denne tekst til GSB" (fx opgave 066's Hjemme/Ude-fane, og evt.
   `gsb-nav`/andre fanes matchning hvis de har samme mønster) til at genkende
   `BC37/Gladsaxe Søborg`-teksten som GSB. Dokumentér i resultatnoten præcis hvor reglen er
   implementeret, og bekræft at de 6 rækker i Gruppe A nu klassificeres korrekt som hjemme ELLER ude
   (ikke længere "uafklaret").
2. **Gruppe B (DB-skrivning, kun disse to specifikke felter):** sæt
   `home_name_raw='Gladsaxe Søborg 2'`/`away_name_raw` (det faktiske modstanderhold — SLÅ navnet OP i
   den gemte rå kildefil/`raw_payload` for 387862/387864 i stedet for at gætte modstanderens navn;
   kun hjemme/ude-siden er givet af Chris, ikke modstanderens navn) for `team_match_id=1489`
   (387862, GSB hjemme) og `team_match_id=1490` (387864, Lyngby hjemme — bekræft at "Lyngby" i den
   rå kilde faktisk er modstanderens fulde holdnavn, brug det fulde navn, ikke en forkortelse).
   Tag en `.sql`-backup af `team_matches` FØR skrivningen (samme mønster som opgave 050), og
   kopiér den opdaterede database til Dropbox EFTER, jf. `statistik/AGENTS.md`s nye regel.
3. **Gruppe C (undersøgelse + DB-skrivning):** undersøg om andre rækker i samme placeringspulje
   (`competition_id=79`) eller andre lignende puljer har samme "hele puljen importeret, ikke kun
   GSB's kampe"-fejl — rapportér omfanget i resultatnoten, uanset hvad det er. Fjern derefter
   `team_match_id=428` (484777) fra `team_matches` (og evt. tilhørende `individual_matches`/
   `individual_match_players`-rækker, hvis nogen — tjek FK-referencer før sletning). Er der flere
   ramte rækker end kun 484777: ret dem alle i denne opgave, med samme begrundelse i resultatnoten.

## Kontekst

`statistik/AGENTS.md`s "Aldrig gæt"-regel gælder fuldt ud for Gruppe B's modstandernavn — Chris har
kun bekræftet hjemme/ude-siden, ikke modstanderholdets eksakte navn. Slå det op i kildedata
(`raw_payloads` for disse to `external_match_id`'er, eller de gemte browser-fallback-filer for
sæson 2020/21) i stedet for at bruge Chris' uformelle "Lyngby" direkte i databasen, hvis kilden har
et mere præcist holdnavn (fx "Lyngby 1" som ses i de andre 2020/21-rækker).

## Afgrænsning

**Må røres:** koden der afgør hjemme/ude/GSB-matchning (Gruppe A), `team_matches`-rækkerne for
`team_match_id` 1489, 1490, 428 og eventuelle andre bekræftede Gruppe-C-rækker (kun de nævnte
felter/rækker, ingen bredere ryk), en ny `.sql`-backup i `statistik/results/` (ikke versioneret),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** alle andre `team_matches`-rækker, `individual_matches`/`individual_match_players`
uden en bekræftet FK-reference til den slettede række 428, `competitions`/`teams`-tabellerne,
`apps/netlify-prod/`, `docs/historik/`, Dropbox' `_arkiv\`.

## Kontrol

**Målet:**
```
SELECT home_name_raw, away_name_raw FROM team_matches WHERE team_match_id IN (1489,1490);
  forventet: begge udfyldt, ingen tomme strenge
SELECT COUNT(*) FROM team_matches WHERE external_match_id='484777';
  forventet: 0
```
Gruppe A: de 6 navngivne rækker klassificeres nu korrekt hjemme/ude i koden (vis før/efter for
mindst 2 af de 6).

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før skrivning, gemt i resultatnoten)
SELECT COUNT(*) FROM team_matches;  forventet: 2.817 (2.818 minus den fjernede 484777,
  plus evt. flere hvis Gruppe C's undersøgelse finder mere — angiv det faktiske tal og hvorfor)
```
Ingen andre rækker end de udpegede er ændret — vis en fuld diff/liste af ændrede `team_match_id`'er
i resultatnoten.

**Skøn:** ingen — alle tre grupper har eksplicitte, efterprøvelige tal.

## Ved tvivl

Kan modstanderholdets fulde navn for 387862/387864 ikke findes i nogen gemt kilde (kun Chris'
uformelle "GSB"/"Lyngby"): stop, brug ikke den uformelle tekst direkte, og spørg under "Spørgsmål"
om Chris vil bekræfte det fulde holdnavn i stedet. Finder Gruppe C's undersøgelse flere ramte
rækker end forventet (fx en hel pulje med systematisk fejlkobling): stop og rapportér omfanget under
"Spørgsmål" i stedet for at rette dem alle uden at spørge, hvis antallet er stort nok til at ændre
opgavens karakter.

### Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
