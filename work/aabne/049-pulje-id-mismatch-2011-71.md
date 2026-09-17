# Opgave 049 — undersøg pulje-ID-mismatch (league_group_id "71", sæson 2011) og tjek for lignende fejl

**Trin:** Test & Validation (ny undtagelseskategori, fundet under Chris' visuelle gennemgang af opgave 048's 6 tilbageværende uforklarede rækker)

**Gren:** `opgave-049-pulje-id-mismatch`, jf. AGENTS.md.

**Baggrund:** Chris tjekkede selv "2011/71 Gladsaxe Søborg udgået" (en af de 6
uforklarede rækker fra opgave 048) op mod den officielle kilde
(badmintonplayer.dk, "BADDAN SEN 2011/2012", "Danmarksserien Øst pulje 2")
og fandt en helt anden pulje end den vores database har liggende under
`competition_id=450` (`season_id=2011`, `league_group_id="71"`,
`league_raw="Danmarksserien Øst pulje 2"`):

- **Kilden (Chris' skærmbillede):** Drive 2, Greve 3 (N), Charlottenlund,
  Holbæk 3 (O), KBK Kbh. 4, Gladsaxe Søborg, Team Roskilde 2, Kalundborg
  *udgået* — alle med 7 kampe. GSB er IKKE udgået (7 kampe, 3 vundne, 10
  point).
- **Vores DB (competition_id 450):** Charlottenlund, Sundby KFUM, KBK Kbh.
  2, BC37 Amager, Hvidovre HB2000, Drive, FKIF Frederiksberg, Lyngby
  *udgået*, Gladsaxe Søborg *udgået* — alle med 8 kampe.

To forskellige puljer, delvist overlappende holdnavne, forskelligt
kampantal, og forskelligt udgået-hold. Claude tjekkede `raw_payloads`-
tabellen: der findes INGEN gemt rå kildedata for standings fra 2011 (kun
for enkeltkampe, og kun browser-URL'er fra 2018 og frem) — så der er ingen
gemt kopi af hvad der oprindeligt blev hentet, det skal krydstjekkes mod
den nuværende kilde.

**Chris' svar (2026-09-17):** "Det bliver vi nok nødt til, især hvis vi
skal lave det her om til en skill for codex i sidste ende..." — dvs. dette
er ikke kun et engangstjek af én række, men en potentiel systemisk
importfejl der bør forstås og dokumenteres, fordi den samme metodik
sandsynligvis bliver genbrugt (som en "skill"/standardprocedure) i
fremtidige runder.

---

## Mål

1. Undersøg hvordan `competition_id=450` (`season_id=2011`,
   `league_group_id="71"`) blev importeret — hvilket script/kilde-URL blev
   brugt til at hente både `competitions`-rækken og dens `standings`? Er
   `league_group_id="71"` en direkte kopi af et pulje-ID fra kilden, eller
   er det konstrueret/afledt af noget andet?
2. Slå selv op på badmintonplayer.dk (eller nembadminton, alt efter hvilken
   kilde der oprindeligt blev brugt for 2011-data) hvad der reelt findes af
   puljer under "Danmarksserien Øst" for sæson 2011/2012, og identificér
   hvilken pulje der har det korrekte GSB-hold og udgåede modstander
   (Kalundborg, ikke Lyngby). Sammenlign pulje-ID'et i kilden med "71" i
   vores database — er de rent faktisk forskellige numre, eller er det
   samme nummer der bare peger på forskelligt indhold nu vs. dengang?
3. Tjek de øvrige 5 tilbageværende uforklarede rækker fra opgave 048 (2010/
   431, 2013/2693, 2021/13965, 2025/18504, 2025/18733) for samme
   fejltype: stem holdlisten og kampantallet i vores `standings`-tabel
   overens med hvad der reelt står i kilden for samme sæson+pulje-navn?
   Vis for hver af de 5 en direkte sammenligning (holdliste + kampantal
   fra DB vs. holdliste + kampantal fra kilden).
4. Hvis flere rækker viser samme mismatch-mønster: undersøg om det er
   isoleret til disse 6, eller om det er en bredere, systemisk risiko der
   kan påvirke andre af de allerede "lukkede" opgaver (015/018/019/020/030/
   047/048's konklusioner er alle bygget på `standings`-tabellens indhold).
   Giv et konkret tal for omfanget — gæt ikke.
5. Dokumentér roden af fejlen så præcist som muligt: forkert kilde-URL ved
   import, en kollision i hvordan pulje-ID'er er konstrueret/gemt, eller
   noget tredje. Dette skal kunne genbruges som en fremtidig tjekprocedure
   ("skilref"), så beskriv metoden (kilde, forespørgsler, sammenligning)
   tydeligt nok til at den kan gentages på andre rækker/sæsoner.

## Kontekst

Dette er en anderledes type fejl end opgave 044-048's team-identitets- og
tærskel-fejl: her er der (muligvis) hentet forkert KILDE-data ind under det
rigtige tabel-ID, ikke en fejl i hvordan vi grupperer/matcher allerede
korrekt data. Det er derfor vigtigere at forstå ROD-årsagen end blot at
rette denne ene række — hvis importen har en systematisk fejl i hvordan
pulje-ID'er tildeles, kan det påvirke flere sæsoner end de 21 vi allerede
har kigget på.

Vi har ingen gemt rå kildedata for standings fra 2011 at sammenligne med
(tjekket af Claude i `raw_payloads`) — sammenligningen skal ske mod kildens
NUVÆRENDE visning, med et eksplicit forbehold om at kilden kan have ændret
sig siden vores oprindelige import (fx pga. efterfølgende rettelser hos
Badminton Danmark).

## Afgrænsning

**Må røres:** nyt undersøgelsesscript/resultat (fx
`049-pulje-id-mismatch.md`/`.json`), `statistik/TEST_RUN_LOG.md`. Hvis
rod-årsagen findes og er entydig (fx en forkert kilde-URL i en
importliste), må selve importscriptet rettes til FREMTIDIGE importer — men
IKKE de eksisterende `standings`/`competitions`-rækker i databasen uden
først at vise Chris den konkrete rettelse og få godkendelse.

**Må ikke røres:** `statistik/data/*.db` må ikke ændres i denne omgang
(kun læses) — hvis en konkret rettelse findes, present den som forslag
først. De eksisterende 015/018/019/020/030/047/048-resultatfiler ændres
ikke. `docs/statistik-plan.md`/`docs/BESLUTNINGER.md` røres ikke — hvis
dette viser sig at være en bredere/systemisk fejl der ændrer tidligere
konklusioner, er det en selvstændig efterfølgende beslutning for Chris.
Stop og spørg i så fald.

## Kontrol

**Målet:** en klar rod-årsagsforklaring for 2011/71-mismatchet, en
holdliste+kampantal-sammenligning (DB vs. kilde) for alle 6 rækker fra
opgave 048, og et eksplicit tal for hvor mange af dem der har samme
fejltype.

**Værnet:** ingen ændringer i databasen eller eksisterende resultater/
planer uden eksplicit godkendelse fra Chris.

**Resultatnoten skal angive konkrete tal og en klar rod-årsag, ikke en
vurdering.**

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*

## Spørgsmål
Den gemte browserfil statistik/results/browser-standings/2011-71.json (source_url #2,2011,71,...) indeholder samme 9-holds pulje som databasen, ikke Chris' aktuelle skærmbillede med 8 hold. Den reproducerbare sammenligning finder holdlisteafvigelse for 2 af 6 rækker (2013/2693 og 2021/13965), mens 2011/71 ikke afviger i den gemte snapshot-fil. Kan den aktuelle badmintonplayer-visning for 2011/71 genhentes manuelt, så vi kan skelne mellem historisk ændring i kilden og importfejl? 049 lukkes ikke før dette er afklaret.


## Resultat
Read-only sammenligning mod de seks gemte browser-standingsfiler: **2 af 6** har holdliste-mismatch (2013/2693 og 2021/13965); 2010/431, 2011/71, 2025/18504 og 2025/18733 matcher i disse snapshots. 2011/71 kan ikke verificeres mod Chris' aktuelle 8-holds visning, fordi den gemte fil selv indeholder DB'ens 9-holds pulje. Importkoden (import-browser-standings.mjs) vælger competition_id med sæson + league_group_id alene og LIMIT 1; det dokumenterer en systemisk risiko, men ikke alene den historiske årsag til 2011-mismatchet. Opgaven er derfor stoppet af kilde-diskrepansen og kræver et nyt manuelt snapshot.

