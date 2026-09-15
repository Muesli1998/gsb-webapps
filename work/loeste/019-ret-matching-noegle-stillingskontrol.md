# Opgave 019 — ret matching-nøglen i stillingskontrollen og genkør

**Trin:** Test & Validation

**LUKKET 2026-09-15 — IKKE løst.** Den planlagte rettelse ændrede intet
(tallene er identiske med 015's oprindelige), og diagnosen viste at
årsagen ikke er den antagne matching-key-bug, men et dybere,
uafklaret spørgsmål om hvorvidt GSB's holdnummerering er en stabil
identitet på tværs af de to datakilder. Se "Spørgsmål" og "Resultat"
nedenfor. Opgaven flyttes til `work/loeste/` som et dokumenteret nej,
ikke som et løst kriterium — jf. AGENTS.md: "et dokumenteret nej er et
brugbart resultat."

Dette skulle have været en rettelse af et kendt script-bug, ikke en ny
undersøgelse. Opgave 018 beviste at alle 24 "no_linked_team_matches_in_current_database"
rækker fra opgave 015 var en falsk negativ — kampene fandtes, men blev
ikke fundet fordi 015's script matcher for snævert. Det viste sig at
018's egen evidens var løsere end antaget her (se "Resultat").

---

## Mål

Ret matchingen i `statistik/scripts/check-standing-match-counts.mjs` så
den finder de kampe 018 allerede beviste findes, og genkør scriptet for
at få et opdateret, mere retvisende bestået/ikke-bestået-billede for
"Kampantal er holdt op mod stillingerne".

## Kontekst

015's nuværende matching kræver at `standing.competition_id` er identisk
med `team_matches.competition_id` for samme normaliserede holdnavn. 018
viste at denne kobling fejler systematisk, fordi stillinger og holdkampe
scrapes fra forskellige kilder med forskellige competition_id-skemaer —
men at `season_id + league_group_id + normaliseret holdnavn` er en
pålidelig alternativ nøgle: i 018's audit gav "samme sæson + samme
leagueGroupId" alene evidens for alle 24 undersøgte rækker.

Se `statistik/scripts/audit-no-linked-standings.mjs` og
`statistik/results/018-no-linked-standings.md` for den allerede
validerede alternative metode — brug samme normaliseringsfunktion og
samme fallback-idé, ikke en ny opfindelse.

## Afgrænsning

**Må røres:** `statistik/scripts/check-standing-match-counts.mjs`,
`statistik/results/015-stillingskontrol.md`,
`statistik/results/015-stillingskontrol.json`,
`statistik/TEST_RUN_LOG.md`, og `docs/statistik-plan.md` (kun afsnittet
"Kampantal er holdt op mod stillingerne").

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave retter
matching-logikken og genkører — den ændrer ikke rå data.
`statistik/scripts/audit-no-linked-standings.mjs` røres ikke (018's
script er allerede færdigt og skal bestå som reference). Heller ikke
`docs/historik/`, `apps/netlify-prod/` eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
node scripts/check-standing-match-counts.mjs
```

Skal køre uden fejl og opdatere `results/015-stillingskontrol.md/.json`.
Antallet af "no_linked_team_matches_in_current_database"-rækker i det nye
resultat skal være markant lavere end de oprindelige 24 (helst 0, jf.
018's fund om at alle 24 var koblingsfejl) — er det ikke 0, skal de
resterende stå med samme forklaringsniveau som før (ikke skjules).

```
grep -c "019" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/019-ret-matching-noegle-stillingskontrol
```

Må kun vise ændringer i de fire navngivne filer.

**Skøn:**

- Match-nøglen skal være `season_id + league_group_id + normaliseret
  holdnavn` (samme normalisering som i dag: fjern "(O)", "udgået",
  "trukket"). Behold en fallback der stadig kan konkludere "reelt hul"
  hvis intet findes selv med den bredere nøgle — scriptet skal ikke
  blindt antage alt er en koblingsfejl.
- Opdater `docs/statistik-plan.md`s kriteriesætning med de NYE, genkørte
  tal (ikke de gamle 24/98) og opdater konklusionen om kriteriet er
  bestået eller stadig ikke, ud fra det nye resultat.

## Ved tvivl

Giver den rettede nøgle et markant anderledes billede end forventet (fx
stadig mange no_linked-rækker, eller et pludseligt fald i eksakte
matches), så stop og skriv det under "Spørgsmål" i stedet for at
forklare det væk.

## Gren

`arbejde/019-ret-matching-noegle-stillingskontrol`

---

## Spørgsmål

**GSB's holdnummerering ser ikke ud til at være en stabil identitet på
tværs af de to datakilder** (BadmintonPlayers-stillinger vs.
Nembadminton-holdkampe) — samme `season_id + league_group_id` kan pege
på et andet holdnummer i den ene kilde end i den anden. Bekræftet ved
to konkrete eksempler:

- Sæson 2011 / pulje 60: stillingens `team_name_raw` er
  `Gladsaxe Søborg 2`, men de rå hjemme-/udeholdnavne i `team_matches`
  for samme pulje er udelukkende `Gladsaxe Søborg 3` (kamp 1717).
- Sæson 2025 / pulje 18733: stillingens `team_name_raw` er
  `Gladsaxe Søborg 1` (og separat `Gladsaxe Søborg 2` for en anden
  stillingsrække i samme pulje), men de rå navne i `team_matches` er
  udelukkende `Gladsaxe Søborg 3` (kamp 506441) — dette er et AKTIVT
  2025/26-seniorhold, ikke kun et historisk kuriosum.

Den fulde rå-navne-diagnose for alle 24 "no_linked"-rækker findes i
`statistik/results/019-diagnose-raa-navne.md`. Mønsteret er
gennemgående: næsten ingen af de 24 puljer har NOGEN rå holdnavn i
`team_matches`, der matcher stillingens holdnummer eksakt, hverken før
eller efter normalisering.

**Hvad der endnu ikke er afklaret:** om forskydningen er systematisk
(fx en konsekvent off-by-one man kunne kompensere for), eller om BD's
holdnummerering er positionel/administrativ pr. pulje og altså ikke en
persistent identitet for et fysisk hold — hvilket i så fald ville være
et fund der rækker ud over denne ene kontrol, fordi flere dele af
`statistik/` (og evt. andre steder i projektet) antager at
holdnummeret er en stabil nøgle. Se forslag til opfølgning nedenfor.

**Sekundært fund, som forklarer hvorfor 019's instruktion ikke virkede:**
Opgavekortets antagelse — at "season_id + league_group_id + normaliseret
holdnavn" er en valideret alternativ nøgle — byggede på en for optimistisk
læsning af 018's evidens. 018 beviste kun det løsere krav "GSB spillede
noget i denne sæson+leagueGroupId" (bred `/gladsaxe|søborg|gsb/i`-søgning),
ikke at DETTE SPECIFIKKE holds kampe findes med samme normaliserede navn i
den pulje. Med det specifikke navnekrav er nøglen derfor lige så snæver
som 015's oprindelige, og resultatet blev uændret.

## Tilbagefald

Ikke relevant — dette er en lukning uden løsning, ikke et tilbagefald af
tidligere arbejde.

## Resultat

**Kontroloutput — før og efter:**

```
Før (015, oprindelig kørsel):  Eksakt: 24, Afvigende: 74, no_linked: 24
Efter (forsøgt rettet nøgle):  Eksakt: 24, Afvigende: 74, no_linked: 24
```

Ingen ændring. Rettelsen af matching-nøglen (season_id + league_group_id
+ normaliseret holdnavn) gav præcis samme resultat som før, fordi den
underliggende antagelse ikke holdt (se "Spørgsmål").

**Nye totaler (eksakt/afvigende/no-linked/uforklaret):** Uændrede ift.
opgave 015: 24 eksakt / 74 afvigende / 24 no_linked. Ingen ny kørsel er
skrevet til `results/015-stillingskontrol.md/.json` — de eksisterende
tal er stadig de retvisende.

**Ændrer dette "Kampantal er holdt op mod stillingerne"s status i
docs/statistik-plan.md:** Nej. Status er uændret siden 015/018. De 24
no_linked-rækker forbliver dokumenteret som en kendt, uafklaret
begrænsning — nu med en mere præcis forklaring (mulig
holdnummer-ustabilitet) end den oprindelige antagelse (ren
matching-key-bug).

**Foreslået opfølgning (ikke en del af denne opgave):** en ny,
selvstændig undersøgelse af om holdnummeret er en stabil identitet på
tværs af kilderne — fx ved at teste om `league_raw` eller et andet felt
er en mere pålidelig tværkilde-nøgle, og ved at kortlægge hvor mange
andre steder i projektet der antager at holdnummeret er stabilt. Se
`statistik/RESEARCH_BACKLOG.md`.

**Commits:** Udfyldes ved lukning på grenen
`arbejde/019-ret-matching-noegle-stillingskontrol` (diagnoserapporten
`statistik/results/019-diagnose-raa-navne.md` og denne resultatnote
committes sammen, kortet flyttes til `work/loeste/`, og grenen merges
til `main`).
