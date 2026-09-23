# Opgave 086c — udvidet visuelt kort: alle 33 regioner, tre forbindelseslag, forgrenet op-/nedrykning

**Trin:** Bygger på opgave 086a (data), samt 086d og 086e (empiri/regler — disse ERSTATTER 086b's Mål
1-3, se Baggrund). Byg-kort — men med et eksplicit godkendelsespunkt undervejs (farve-/linjekode) før
selve visualiseringen bygges. Del 3 af den oprindelige opsplitning af opgave 086.

**Gren:** `arbejde/086c-udvidet-visuelt-kort`, fra `main` (086a, 086d og 086e er alle merget).

**Baggrund:** Opgave 085 byggede et visuelt kort (artifact) for tre eksempelsider. Christoffer har set
det og præciseret hvordan det skal udvides og forfines. **Vigtigt: dette korts oprindelige Kontekst
pegede på opgave 086b for empiri/regler — men 086b's Mål 1-3 (oprykningsbevis, reglement, Øst/Vest) blev
siden fundet metodisk utilstrækkelige og er genkørt og erstattet af 086d, og yderligere uddybet af 086e.
Brug 086d/086e's tal, IKKE 086b's oprindelige "0 fundne oprykninger"-konklusion.** 086b's Mål 4-6
(ungdomsgruppering, rangliste-indførelsestidspunkt, spillerdrevet holdforskydning) er stadig gyldige og
uændrede.

**Det samlede, aktuelle facit findes nu i ét sted:** `statistik/results/086-liga-hierarki-viden-samlet.md`
— et levende referencedokument der opsummerer tre-lags-modellen, forgreningsmodellen, reglement-citater,
op-/nedrykningstal og Øst/Vest-renhed. Læs DET først, frem for at samle fund fra flere opgave-kort selv.

**Ny, kendt begrænsning der påvirker dette kort direkte:** opgave 086e afdækkede at hold-identitet på
tværs af sæsoner er markant sværere at spore end antaget (1.353 af 1.584 "nye" hold i nabo-niveauer
kunne ikke matches tilbage). Dette er under selvstændig undersøgelse i opgave 087
(`work/aabne/087-holdidentitet-paa-tvaers-af-saesoner.md` eller `work/loeste/` hvis den er afsluttet).
**Tjek 087's status før dette kort bygges:** er 087 afsluttet, brug dens forbedrede match-rate til de
bekræftede oprykningspile. Er 087 IKKE afsluttet endnu, byg kortet med den lavere match-rate fra 086e
og gør det tydeligt i kortet selv (fx en note) at antallet af tegnede oprykningspile sandsynligvis er et
underkantsestimat pga. et kendt, uløst identitetssporings-problem — ikke fordi der reelt sker mindre
oprykning end det.

Kortets visuelle sprog er allerede delvist etableret fra 085: kæde af niveauer med prik/linje, orange
stiplet kant for ikke-niveauer (spilletidssider), blå badges for delte puljer.

**Nodemodel — puljer forgrener, de står ikke i én lineær kæde.** Hver pulje-node kan have en opadgående
forbindelse (oprykning), en nedadgående (nedrykning), og en sideværts forbindelse til en delt
kvalifikations-/slutspils-node som flere puljer peger ind i og ud af (fx Danmarksseriens 4
kvalifikationsgrupper à 2 puljer, jf. den samlede videns afsnit 2). "Finale"/"Bronzekamp"/"5.-8.
plads"-noder er en fjerde nodetype (ikke niveau, ikke spilletidsside) og hænger som en forgrening af den
pulje de hører til, ikke som deres eget trin i rækkefølgekæden.

**Fremtidig vision (IKKE en del af dette kort — kun noteret så den ikke går tabt):** Christoffer har
peget på en meget større, interaktiv retning for dette værktøj: et klub-filter der "lyser" alle puljer
op som en valgt klub (fx GSB) har hold i; muligheden for at vælge fx "Seniorholdturneringen" og se hele
stigen fra Badmintonligaen til Serie 3; klik på en pulje for at se stilling; klik på et hold for at se
alle deres kampe/spillere/resultater; klik på en kamp for at åbne kamptal i et vindue. Dette er en
selvstændig, langt større opgave (interaktiv "liga-udforsker" oven på hele `liga-landskab.db`, ikke kun
et statisk QA-kort) og skal IKKE forsøges bygget i dette kort. Skriv en kort opsummering af visionen ind
i et relevant idébank-dokument i repoet (fx `claude/gsb-statistik-idebank.md` eller
`claude/gsb-feature-idebank.md` — se hvilket der passer bedst efter at have læst dem) når dette kort
afsluttes, så den ikke går tabt, og lad Christoffer beslutte hvornår/om den skal blive til sit eget
opgavekort.

## Mål

1. Foreslå en konkret farve-/linjekode for de tre forbindelseslag (spilleform-familie, formodet niveau,
   bekræftet oprykning/nedrykning) OG for de fire nodetyper (reelt niveau, ikke-niveau/spilletidsside,
   slutspil/kvalifikation, delt pulje på tværs af regioner) i "Spørgsmål"-afsnittet. STOP og vent på
   Christoffers godkendelse af kodningen før Mål 2 påbegyndes.
2. Udvid det eksisterende visuelle kort (artifact fra opgave 085) til at dække alle 33 regioner, med:
   (a) spilleform-familie som den yderste, grovkornede adskillelse — puljer i forskellige familier
       forbindes eller placeres ALDRIG på en måde der antyder sammenlignelighed;
   (b) formodet niveau inden for samme familie vist visuelt svagere (fx tynd/stiplet linje) end;
   (c) bekræftet oprykning/nedrykning, vist som en tydelig, farvet pil — KUN hvor 086d/086e (eller 087,
       hvis afsluttet) fandt konkret databelæg eller citerbar regeltekst, aldrig som antagelse. Marker
       forskelligt om belægget er regeltekst, empiri, eller begge;
   (d) forgrenet nodemodel (op/ned/kval-sideforbindelse), jf. Baggrund;
   (e) ungdomspuljer grupperet side om side uden automatiske forbindelser, medmindre 086b Mål 4 fandt
       konkret bevis;
   (f) et separat afsnit/panel der viser 086b's fund om rangliste-indførelsestidspunkt og
       spillerdrevet holdforskydning (disse dele af 086b er stadig gyldige, kun Mål 1-3 er erstattet).
3. Sørg for at kortet forbliver læsbart i denne skala — 33 regioner er markant mere end de 3 eksempler
   fra 085. Overvej filtrering/foldning (fx pr. region eller aldersgruppe) frem for at presse alt ind i
   én lang, uoverskuelig side — dette er en byggebeslutning Codex selv må tage, men skal begrunde valget
   kort i Resultatnoten.

## Kontekst

- `statistik/results/086-liga-hierarki-viden-samlet.md` — DET samlede, aktuelle facit. Læs dette først.
- `work/loeste/086a-fundament-rekkefoelge-spilleform-klubregister.md` — data-fundamentet.
- `work/loeste/086d-oprykning-og-regler-genbesoeg.md`, `work/loeste/086e-regler-dybde-og-fuld-revision.md`
  (+ `.json`-rapporter i `statistik/results/`) — de GÆLDENDE tal for oprykning, reglement, Øst/Vest.
- `work/loeste/086b-oprykning-vestoest-regler-hypoteser.md` — kun Mål 4-6 er stadig gyldige herfra.
- `work/aabne/087-holdidentitet-paa-tvaers-af-saesoner.md` (eller `work/loeste/` hvis afsluttet) — tjek
  status før kortet bygges, se Baggrund.
- `work/loeste/085-niveau-fra-rekkefoelge-og-skabelon.md` og det publicerede visuelle kort (artifact)
  bygget derfra i chatten — samme visuelle grundsprog skal videreføres.

## Afgrænsning

**Må røres:** nyt/udvidet undersøgelsesdokument (`statistik/results/086c-*`), ny/udvidet
visualiserings-HTML under `statistik/results/`, et idébank-dokument for at notere fremtidsvisionen (se
Baggrund).

**Må ikke røres:** `statistik/data/*.db` (kun læses — dette kort skriver ikke til nogen database, det
forbruger kun allerede gemt output), `apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`.
INGEN nye API-kald.

## Kontrol

**Målet:**
```
En konkret farve-/linjekode for alle forbindelseslag og nodetyper er foreslået og godkendt af
  Christoffer, før selve kortet blev bygget.
Kortet dækker alle 33 regioner med de tre forbindelseslag og den forgrenede nodemodel tydeligt adskilt.
Kortet forbliver læsbart i denne skala (filtrering/foldning eller anden løsning, begrundet kort).
Kortet bruger 086d/086e (eller 087, hvis afsluttet) for oprykningsbevis — ikke 086b's forældede Mål 1-3.
Fremtidsvisionen om en interaktiv liga-udforsker er noteret i et idébank-dokument, ikke tabt.
```

**Værnet:**
```
git status --short statistik/data/   tom (ingen databaseskrivninger fra dette kort)
Ingen forbindelse i kortet uden et konkret citerbart belæg fra 086d/086e/087.
Farve-/linjekoden er godkendt af Christoffer i "Spørgsmål"-afsnittet før kortet blev bygget.
```

**Skøn:** filtrerings-/foldningsløsningen for skalaen (Mål 3) må Codex selv vælge og begrunde kort.
Ingen andre skøn — resten følger direkte af 086a/086d/086e/(087)'s fund.

## Ved tvivl

Er det uklart hvordan en bestemt forbindelse skal vises fordi belægget for det pågældende niveau var
tyndt/blandet: vis det som usikkert (fx en tredje, svagere visuel stil), spørg Christoffer i
"Spørgsmål" hvis det ikke allerede er dækket af den godkendte kodning fra Mål 1.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
