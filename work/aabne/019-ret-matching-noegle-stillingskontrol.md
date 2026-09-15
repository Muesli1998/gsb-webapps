# Opgave 019 — ret matching-nøglen i stillingskontrollen og genkør

**Trin:** Test & Validation

Dette er en rettelse af et kendt script-bug, ikke en ny undersøgelse.
Opgave 018 beviste at alle 24 "no_linked_team_matches_in_current_database"
rækker fra opgave 015 var en falsk negativ — kampene fandtes, men blev
ikke fundet fordi 015's script matcher for snævert.

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

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Nye totaler (eksakt/afvigende/no-linked/uforklaret):**

**Ændrer dette "Kampantal er holdt op mod stillingerne"s status i docs/statistik-plan.md:**

**Commits:**
