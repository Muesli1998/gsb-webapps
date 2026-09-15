# Opgave 038 — afklar om "senior"-tallene i statistik-plan.md reelt er klubbrede

**Trin:** Test & Validation (grundlagsafklaring — kan påvirke både senior og ungdom)

**Gren:** `opgave-038-senior-tal-klubbred-check`, jf. AGENTS.md.

**Baggrund:** opgave 037's Fase A viste at de fem ID'er der optrådte i BÅDE
opgave 013's oprindelige senior-klassifikation og opgave 035's ungdoms-
klassifikation, alle er ægte U13/U15-kampe (`age_group_id` 4 og 5) — ikke
fejlplacerede U17/U19. Hypotesen om forkert aldersgruppe er dermed afkræftet.
Den sandsynlige forklaring er i stedet at opgave 013's oprindelige
klassifikation af de "257/315 huller" (en del af grundlaget for
`docs/statistik-plan.md`s "Hvor vi står": 2.818 holdkampe, 20.319
individuelle kategorier osv.) aldrig filtrerede på `age_group_id` — den er
formentlig kørt på HELE klubbens data og bare kaldt "senior", fordi ungdom
endnu ikke var en anerkendt, adskilt kategori på det tidspunkt.

**Chris' svar (2026-09-15):** "øøh, ja tak!" — bekræfter at dette skal
undersøges før noget merges.

---

## Mål

Afklar, med tal, om `docs/statistik-plan.md`s "Hvor vi står"-tal (2.818
holdkampe, 2.812 med dokumenteret hjemme-/udehold, 20.319 individuelle
kategorier, 67.196 spillerrelationer, 7.599 unikke spillere) er:

**(A) klubbrede** — dvs. dækker ALLE `age_group_id`-værdier, ungdom
inklusive, og derfor allerede indeholder de 1.207 ungdomsholdkampe opgave
033 "fandt" som noget nyt, eller

**(B) reelt afgrænset til én bestemt `age_group_id`** (fx en værdi der
specifikt betyder "senior"), og overlappet med 013 skyldes noget andet
(fx at 013's stikprøve/udtræk ved en fejl inkluderede nogle forkerte
rækker, uden at det er systematisk for hele 2.818-tallet).

Konkret:
1. Tæl `team_matches` totalt, uden noget aldersfilter overhovedet.
2. Tæl `team_matches` pr. `age_group_id` (samme gruppering som opgave 037's
   Fase A brugte for at identificere U13/U15/U17/U19).
3. Sammenlign: stemmer 2.818 med totalen uden filter (A), med summen af
   alle `age_group_id`-værdier UNDTAGEN ungdom (B), eller med hverken/eller
   (så er der en tredje forklaring, som skal beskrives, ikke gættes på)?
4. Gør det samme tjek for `individual_matches`/individuelle kategorier
   (20.319) og for spillerrelationer (67.196), da disse tal fra opgave 016
   /032 ligger til grund for hele spilleridentitets-arbejdet.
5. Hvis (A) bekræftes: beregn hvor stort overlappet reelt er — dvs. hvor
   mange af de 1.207 ungdomsholdkampe fra opgave 033 allerede var talt med
   i 2.818, og om der findes ungdomsholdkampe i 2.818 som opgave 033's
   filter (`age_group_id IN (2,3,4,5)`) IKKE fangede (fx hvis U17/U19 eller
   en anden `age_group_id` også indgår i 2.818 uden at være "ren senior").

## Kontekst

Dette er ikke kun et ungdomsspørgsmål — hvis (A) er sandt, betyder det at
"Test & Validation lukket for senior" (2026-09-15, se
`docs/statistik-plan.md`s "Status på Test & Validation som helhed") reelt
blev vurderet på et klubbredt datasæt, ikke et rendyrket senior-datasæt.
Det påvirker hvor meget af arbejdet i opgave 006/013/016/018/020/030/032
(alt det der ligger til grund for at lukke trinnet) der reelt allerede
dækkede ungdom, uden at nogen vidste det. Dette skal afklares før nogen af
de fire ungdoms-grene (`opgave-033-...` til `opgave-037-...`) merges, fordi
en bekræftet (A) betyder at 033/035/036's tal skal genfortolkes som
"ungdommens andel af et allerede-eksisterende, klubbredt datasæt", ikke
som "en ny, tidligere ubesøgt delmængde".

## Afgrænsning

**Må røres:** nyt script i `statistik/scripts/` (fx
`038-senior-tal-klubbred-check.mjs`),
`statistik/results/038-afklar-om-senior-tal-er-klubbrede.md` (+ `.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). Ingen ændringer i
`docs/statistik-plan.md`, `docs/BESLUTNINGER.md`, eller nogen af de fire
ungdoms-opgavers resultatfiler (033/035/036/037) — denne opgave afklarer
kun, den retter og fortolker ikke. Fortolkningen og evt. omskrivning af
`statistik-plan.md`s "Hvor vi står" og "Status på Test & Validation" er en
opfølgende opgave, afhængig af hvad 038 finder.

## Kontrol

**Målet:** et eksplicit svar (A), (B) eller "hverken/eller — se
beskrivelse", med tællinger der beviser det, for både holdkampe,
individuelle kategorier og spillerrelationer.

**Værnet:** ingen af de eksisterende resultatfiler eller `statistik-plan.md`
ændres. Databasen læses, ikke skrives.

**Resultatnoten skal angive tal, ikke vurderinger.**

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
