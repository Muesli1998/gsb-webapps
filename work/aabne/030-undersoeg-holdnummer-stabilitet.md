# Opgave 030 — undersøg om GSB's holdnummerering er en stabil identitet på tværs af kilderne

**Trin:** Test & Validation

Dette er en ny, selvstændig undersøgelse — ikke en rettelse. Den blev
rejst af opgave 019 (lukket uden løsning, se
`work/loeste/019-ret-matching-noegle-stillingskontrol.md` og
`statistik/RESEARCH_BACKLOG.md`s afsnit om holdnummer-stabilitet), men
er ikke afgrænset til de samme 24 rækker — spørgsmålet er om problemet
er bredere.

---

## Mål

Afgør, så vidt data tillader det, om GSB's holdnummer (fx "Gladsaxe
Søborg 2") er en stabil identitet for ét bestemt fysisk hold på tværs
af `standings`-kilden (BadmintonPlayers' Stilling-side) og
`team_matches`-kilden (Nembadminton), eller om det er en positionel/
administrativ betegnelse der kan pege på forskellige fysiske hold i de
to kilder for samme sæson+pulje.

## Kontekst

019's diagnoserapport (`statistik/results/019-diagnose-raa-navne.md`)
viser at for stort set alle 24 kendte "no_linked"-rækker matcher
stillingens holdnummer ikke noget rå holdnavn i `team_matches` for
samme `season_id + league_group_id` — hverken før eller efter
normalisering. To eksempler er manuelt verificeret: pulje 60/2011
(stilling "2", kampe udelukkende "3") og pulje 18733/2025 (stilling
"1"/"2", kampe udelukkende "3" — et AKTIVT 2025/26-hold).

Hypotesen (endnu ubekræftet): BD's holdnummerering er
positionel/administrativ pr. pulje, ikke en persistent identitet for
et fysisk hold. Er det korrekt, kan det påvirke flere steder i
projektet end denne ene kontrol — overalt hvor holdnummer i dag bruges
som en tværkilde- eller tværsæson-nøgle.

## Afgrænsning

**Må røres:** `statistik/` alene — nye, selvstændige scripts under
`statistik/scripts/` (nye filnavne, ikke ændringer i
`check-standing-match-counts.mjs` eller
`audit-no-linked-standings.mjs` — de er allerede validerede og
afsluttede referencer og skal stå urørt), en ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`, og
`statistik/RESEARCH_BACKLOG.md` (opdatér status på denne undersøgelses
egen sektion, tilføj ikke nye uafhængige emner der).

**Må ikke røres:** databasen `statistik/data/*.db` (read-only — denne
opgave undersøger og dokumenterer, den retter ikke matching-logik
noget sted), `docs/statistik-plan.md`, `apps/netlify-prod/`,
`kampsystem/`, `docs/historik/`, Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

Rapporten skal svare på, med konkrete tal og eksempler (ikke kun de 24
allerede kendte rækker, men et bredere udsnit — fx alle puljer hvor GSB
har mere end ét hold i samme sæson):

1. Er der et felt i de gemte data (`league_raw`, eller andet allerede
   scrapet felt) der matcher stillingens holdnummer mere pålideligt end
   det rå holdnavn gør i dag? Test det konkret mod de 24 kendte
   rækker og mod et stikprøve af rækker der IKKE er i de 24 (dvs. hvor
   015 allerede fandt en eksakt eller afvigende match) — virker den
   foreslåede nøgle kun på de kendte problemrækker, eller også der hvor
   det allerede virker?
2. Er forskydningen mellem stillingens holdnummer og `team_matches`'
   holdnummer systematisk (fx altid "stilling N = kampe N+1" i samme
   pulje), eller varierer den usystematisk fra pulje til pulje? Vis
   dette som en tabel over alle 24 kendte rækker plus evt. flere fundet
   undervejs.

```
ls statistik/results/ | grep -i "030\|holdnummer\|team-number"
```

Skal give mindst én ny rapportfil der besvarer begge spørgsmål ovenfor
med tal, ikke kun en vurdering.

```
grep -c "030" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/030-undersoeg-holdnummer-stabilitet
```

Må KUN vise ændringer i `statistik/`.

**Skøn:**

- Er der tid til det efter spørgsmål 1-2 er besvaret: kortlæg (som en
  liste, ikke en fuld kodeændring) hvilke andre steder i
  `statistik/`-koden der i dag antager at holdnummeret er stabilt på
  tværs af sæsoner eller kilder — så vi ved hvor stort det praktiske
  problem er, hvis hypotesen bekræftes. Dette er research, ikke en
  rettelse af de fundne steder.
- Spørgsmålet om BD's administrative praksis for holdnummer-tildeling
  (forslag 4 i backloggen) er IKKE en del af denne opgave — det er noget
  Chris selv kan afklare ved siden af, ikke noget der skal undersøges
  via data.

## Ved tvivl

Giver undersøgelsen intet klart svar på hverken spørgsmål 1 eller 2
(fx hvis intet felt matcher bedre, og forskydningen ser helt tilfældig
ud), er det stadig et gyldigt og brugbart resultat — dokumentér det
som "ikke en systematisk sammenhæng fundet i de tilgængelige data" i
stedet for at blive ved med at lede efter et mønster. Er det uklart om
et fund er stort nok til at ændre `docs/statistik-plan.md`s
konklusioner, så stop og skriv det under "Spørgsmål" i stedet for at
rette planen selv — det er en beslutning for Chris.

## Gren

`arbejde/030-undersoeg-holdnummer-stabilitet`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Svar på spørgsmål 1 (bedre tværkilde-nøgle?) og 2 (systematisk eller usystematisk forskydning?):**

**Kortlægning af andre steder der antager stabilt holdnummer (hvis nået):**

**Commits:**
