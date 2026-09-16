# Opgave 047 — verificér 043 efter holdidentitets-fix, og genbesøg de 21 uforklarede stillingsrækker

**Trin:** Results (kvalitetstjek) + Test & Validation (genbesøg af en tidligere lukket, dokumenteret undtagelse)

**Gren:** `opgave-047-verificer-043-og-stillinger`, jf. AGENTS.md.

**Baggrund:** opgave 044-046 rettede hold-identiteten i 042/043 gennem
tre iterationer og landede på en dokumenteret standard i
`docs/statistik-plan.md` ("Holdidentitets-standard"). Rodårsagen var at
et GSB-holdnummer ALENE ikke er en pålidelig identitet — det kan dække
flere reelt forskellige tilmeldinger (forskellig holdtype/niveau/
pointgrænse for ungdom).

Chris bemærkede at `docs/statistik-plan.md`s "Stillingskontrol"-afsnit
allerede beskriver et STRUKTURELT LIGNENDE problem for de 24
`no_linked_team_matches_in_current_database`-rækker: "GSB's holdnummer
er ikke en stabil identitet på tværs af standings- og
team_matches-kilderne" (opgave 019/030). De 21 "genuint uforklarede"
stillingsrækker (opgave 020) blev undersøgt og lukket FØR opgave 044-046
opdagede holdtype-kollisionen — stillingskontrollen kendte altså ikke
til dette fænomen dengang. Det er muligt (ikke bekræftet) at nogle af de
21 rækker reelt skyldes samme rodårsag, ikke en ægte uforklaret
afvigelse.

**Chris' svar (2026-09-16):** "som en del af 1" — dvs. denne opgave
kombinerer to ting: (1) et selvstændigt sanity-tjek af 043's indhold
efter holdidentitets-fixet (ikke kun holdtallet, som allerede er
verificeret), og (2) et genbesøg af de 21 uforklarede stillingsrækker i
lyset af holdtype-fundet.

---

## Mål

**Del A — verificér 043's indhold efter opgave 044-046:**
1. Gennemgå `statistik/results/043-results-rapport-v2.md`/`.json`s
   "winrate mod modstanderhold"-sektion (980 identiteter efter
   fixet) — stikprøvetjek et par konkrete eksempler for at bekræfte at
   modstander-identiteten (nu også opdelt på ungdommens holdtype/niveau)
   giver mening, og ikke fx har introduceret nye "unknown unknown
   unknown"-grupper i utide.
2. Gennemgå "mest aktive spillere" og "klub-karriereoversigt" — bekræft
   at disse IKKE er påvirket af hold-identitets-rettelsen (de er baseret
   på `individual_match_players`/spiller-ID, ikke på hold-identiteten) —
   vis dette eksplicit med et par tal, i stedet for bare at antage det.
3. Bekræft at "winrate pr. hold" og "kamptal pr. hold" (punkt 1 og 8 i
   stat-kataloget) nu bruger den fulde 180-identiteters hold-liste
   konsistent begge steder.

**Del B — genbesøg de 21 uforklarede stillingsrækker:**
4. Genfind de 21 rækker (samme population som opgave 020/040 arbejdede
   med — se `statistik/results/020-unexplained-standings.md` og
   `040-bekraeft-aldersfordeling.json` for hvordan de tidligere blev
   identificeret).
5. For hver af de 21: undersøg om rækkens `age_group_id` er ungdom, og
   hvis ja, om holdnummeret i den pågældende sæson/årgang havde MERE END
   ÉN holdtype/niveau-kombination (dvs. om den samme kollision opgave
   046 fandt, også rammer denne konkrete stilling-sammenligning).
6. Hvis nogen af de 21 nu kan forklares af holdtype-kollisionen: vis
   konkret hvordan (fx: stillingen matcher hold X's 2+2-tilmelding, men
   `team_matches` blev talt op mod hold X's 4-spillere-tilmelding, fordi
   det oprindelige stillingstjek ikke skelnede mellem dem). Opdater IKKE
   selv `docs/statistik-plan.md`s tal — rapportér resultatet, og lad
   Chris beslutte om planen skal opdateres.
7. Hvis INGEN af de 21 forklares af dette: sig det eksplicit med et tal
   (0 af 21), så konklusionen "stadig genuint uforklaret" står på et
   opdateret, ikke bare et gammelt grundlag.

## Kontekst

Del A er et rent kvalitetstjek — ingen ny opdagelse forventes, men det
skal vises, ikke antages. Del B er en reel mulighed for at finde en ny
forklaring på en tidligere lukket undtagelse — men det er lige så
værdifuldt at bekræfte at de 21 IKKE hænger sammen med holdtype-
kollisionen, som at finde ud af at nogen af dem gør. Gæt ikke på
resultatet på forhånd.

## Afgrænsning

**Må røres:** nyt script/resultat i `statistik/scripts/`/
`statistik/results/` for Del A og B (fx
`047-verificer-043-og-stillinger.mjs`/`.md`/`.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). De eksisterende
042/043-resultatfiler (allerede korrekte efter opgave 046). De
oprindelige 015/018/019/020/030-resultatfiler ændres ikke.
`docs/statistik-plan.md` og `docs/BESLUTNINGER.md` røres IKKE i denne
opgave, uanset hvad Del B finder — hvis noget af de 21 rækker viser sig
forklaret, er det en selvstændig efterfølgende beslutning for Chris, ikke
noget der skrives ind stiltiende her. Stop og spørg i så fald.

## Kontrol

**Målet:** Del A's tre punkter bekræftet med konkrete tal/eksempler; Del
B's konklusion er et eksplicit tal (X af 21 forklaret af holdtype-
kollisionen, med konkrete eksempler hvis X>0).

**Værnet:** ingen ændringer i databasen eller i eksisterende
resultatfiler/planer.

**Resultatnoten skal angive tal, ikke vurderinger.**

## Resultatnote

Del A: 043 indeholder 980 modstanderidentiteter efter 046-fixet. De spillerbaserede opgørelser er uændrede: 7.599 karrierespillere, 67.196 relationer og top-25 mest aktive spillere. Hold- og kamptalsgrupperingen bruger 180 identiteter konsistent i 042/043.

Del B: Den præcise population på 21 stillingsrækker blev genfundet. 0 af 21 kan forklares af en ungdoms-holdtype/niveau-kollision; ingen af rækkerne havde både ungdomsstatus og flere relevante kombinationer i samme sæson, pulje og holdnavn. Konklusionen om de 21 fortsat uforklarede rækker står derfor uændret.

**Commits:** afventer commit på denne gren
