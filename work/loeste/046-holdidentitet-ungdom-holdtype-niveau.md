# Opgave 046 — ungdoms hold-identitet skal også skelne på holdtype og niveau/pointgrænse

**Trin:** Results (tredje og forhåbentlig sidste rettelse af hold-identiteten, efter opgave 044/045)

**Gren:** `opgave-046-holdidentitet-ungdom-holdtype-niveau`, jf. AGENTS.md.

**Baggrund:** opgave 045 rettede hold-identiteten til `name_raw +
age_group_id`, hvilket løste den grove kollision fra opgave 044. Men
Chris opdagede ved at kigge på et konkret U13-bilag at samme klubnummer
(fx "Gladsaxe Søborg 1") kan optræde med to forskellige HOLDTYPER i
samme årgang og sæson — fx "DMU Hold U13C-D (5000) - 4 Spillere" og
"U13 A, 6000 (2+2)" — med forskellig pointgrænse OG forskellig
holdsammensætning (4 spillere vs. 2+2). Det er sandsynligvis to reelt
forskellige tilmeldinger, ikke samme fysiske hold, men `age_group_id`
alene kan ikke se forskel på dem.

Claude researchede efterfølgende Badminton Danmarks/DGI's officielle
ungdomsreglement (se chatten 2026-09-16) og fandt:
- DMU for hold er den afsluttende NATIONALE FASE af den samme lokale
  ungdomsholdturnering — ikke en ny, uafhængig tilmelding. DMU-hold
  fortsætter i samme række som de spillede i lokalt.
- Spillertruppen er IKKE garanteret identisk mellem lokal fase og DMU —
  det er en anbefaling, ikke et krav.
- Pointtallene (5000, 6000 osv.) er en klassifikationsgrænse for
  holdets samlede spillerpoint PR. HOLDTYPE ved sæsonstart — ikke et
  facit for niveau i sig selv, og ikke nødvendigvis sammenligneligt på
  tværs af holdtyper.
- "4 spillere" og "2+2" er strukturelt forskellige holdtyper/kampmodeller
  (forskellig kønsfordelingsregel), men spillere kan overlappe delvist
  mellem dem.
- Der findes ingen regel om at et klubnummer ("GSB 1") er en global,
  fysisk trup på tværs af turneringsformer — nummereringen er
  kontekstafhængig og skal kombineres med sæson, årgang, holdtype og
  turneringsforløb.

Chris afklarede desuden at senior IKKE har dette problem: klubbens
holdnumre er fortløbende og unikke uanset holdtype/pulje (en klub kan
have to hold i samme række i forskellige puljer, men de har altid
forskelligt nummer) — så denne rettelse er isoleret til ungdom.
Den nye standard er skrevet ind i `docs/statistik-plan.md`s
"## Results"-afsnit, "Holdidentitets-standard" — læs den først.

**Chris' svar (2026-09-16):** "Lad os formulere en opgave, og den nye
standard" — dvs. både denne opgave og planens standard-afsnit er
resultatet af chattens diskussion.

---

## Mål

1. For alle ungdoms-`competitions`-rækker (`age_group_id` IN
   (2,3,4,5,6,18)): udtræk holdtype (fx "4 spillere" vs. "2+2", match
   på mønstre i `league_raw`/`name_raw`) og niveau/pointgrænse (fx
   bogstav A/B/C/D/C-D og det numeriske pointtal, hvis det findes i
   teksten). Vis den fulde liste af udtrukne (holdtype, niveau,
   pointgrænse)-kombinationer og hvor mange competitions/team_matches
   hver dækker, så parsing-reglerne kan efterprøves manuelt — gæt ikke
   blindt, vis arbejdet.
2. Byg den nye ungdoms-identitet: `name_raw + age_group_id + holdtype +
   niveau/pointgrænse`. Bekræft med SQL/optælling at DMU-faser (Pulje,
   Kvartfinale, Placeringskampe, Finaleslutspil) af SAMME lokale
   tilmelding fortsat kollapser sammen under denne identitet (de bør
   dele holdtype og pointgrænse med deres lokale modstykke, jf.
   reglementet) — vis konkrete eksempler.
3. Identificér de tvetydige tilfælde: hvor en formodet DMU-fase har en
   ANDEN pointgrænse end sit lokale modstykke for samme klubnummer/
   årgang/sæson. For disse: tjek om der findes individuelle
   spillerdata for den pågældende sæson (`individual_match_players`),
   og hvis ja, sammenlign spillertruppen mellem de to entries (samme
   spillere = sandsynligvis samme fysiske hold; ingen overlap =
   sandsynligvis to forskellige tilmeldinger, jf. planens standard).
   Dokumentér begge dele eksplicit i resultatet — konkludér ikke
   `same-hold`/`forskellige-hold` uden at vise tallet der ligger til
   grund.
4. For tvetydige tilfælde UDEN individuelle spillerdata (ældre
   sæsoner): dokumentér dem som "afgjort ud fra tekstparsing alene,
   ikke krydstjekket" — brug IKKE samme sikkerhedsniveau som for de
   spillerdata-bekræftede tilfælde i rapporten.
5. Genkør 042 og 043 med den nye ungdoms-identitet (senior/veteran
   forbliver uændret, `name_raw + age_group_id`, jf. planens standard —
   rør IKKE deres logik). Rapportér det nye samlede holdantal og et par
   konkrete eksempler, inkl. mindst ét sted hvor "GSB 1" nu korrekt
   splittes i to identiteter i samme årgang (4-spiller vs. 2+2), og
   mindst ét sted hvor en DMU-fase korrekt kollapser med sit lokale
   modstykke.
6. Ret 043's "winrate mod modstanderhold" tilsvarende for ungdomsrækker
   (modstandernavne er rå tekst og kan have samme problem — undersøg
   om det reelt sker, ret kun hvis det gør).

## Kontekst

Dette er IKKE endnu en omgang "find flere navnekollisioner" — det er en
implementering af en nu veldefineret standard (se
`docs/statistik-plan.md`). Formålet er at ramme den rigtige
detaljeringsgrad: fin nok til at skelne reelt forskellige ungdomshold,
grov nok til stadig at lade DMU's faser af samme hold høre sammen.

## Afgrænsning

**Må røres:** `statistik/scripts/042-results-rapport.mjs`,
`statistik/scripts/043-results-rapport-v2.mjs` (eller nye versioner),
deres resultatfiler, nyt undersøgelsesscript/resultat for punkt 1, 3 og
4 (fx `046-ungdom-holdtype-niveau-audit.mjs`/`.md`/`.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). Senior/veteran-
identiteten (`name_raw + age_group_id`) må IKKE ændres — kun ungdommens
identitet udvides. `docs/statistik-plan.md` og `docs/BESLUTNINGER.md`
røres ikke i denne opgave (standarden er allerede skrevet ind af
Claude) — medmindre du finder noget der modsiger standarden, i så
fald: stop og spørg, ret ikke selv.

## Kontrol

**Målet:** ungdommens hold-identitet skelner nu på holdtype og niveau/
pointgrænse, med eksplicit dokumentation af hvilke tvetydige tilfælde
der er krydstjekket med spillerdata og hvilke der kun hviler på
tekstparsing.

**Værnet:** ingen ændringer i databasen. Senior/veteran-logikken er
urørt og giver samme resultat som i opgave 045.

**Resultatnoten skal angive:** antal udtrukne holdtype/niveau-
kombinationer, det nye ungdoms-holdantal, antal DMU-fase-kollaps
bekræftet korrekte, antal tvetydige tilfælde fundet og hvor mange af
dem der blev afgjort med spillerdata vs. tekst alene.

## Resultatnote

Parseren fandt 12 specifikke age_group_id-værdier og 85 kombinationer af
holdtype/niveau/pointgrænse på tværs af ungdomscompetitions. 34 DMU-fasegrupper
kan identificeres som samme navn, årgang, holdtype og pointgrænse og kollapser
derfor korrekt med lokale faser. Der blev fundet 19 tvetydige DMU/lokal-par med
forskellig pointgrænse; 18 havde individuelle spillerdata til krydstjek, mens 1
kun kunne afgøres ud fra tekstparsing. Rapporten angiver spillergrundlaget uden
at gætte en fysisk holdidentitet.

042/043 er genkørt. Ungdomsidentiteten indeholder nu specifik årgang, holdtype
og niveau/pointgrænse; senior/veteran bruger fortsat kun navn + age_group_id.
Det samlede registrerede holdantal er 58 i 042/043-outputtet.

**Commits:** afventer commit på denne gren
