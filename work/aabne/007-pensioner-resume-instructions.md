# Opgave 007 — pensionér RESUME_INSTRUCTIONS.txt

**Trin:** Test & Validation

---

## Mål

Ét levende regelsæt for statistikprojektet, ikke to der kan glide fra
hinanden. `statistik/RESUME_INSTRUCTIONS.txt` erstattes af en kort
pegepind til `statistik/AGENTS.md` og `docs/statistik-plan.md`, efter
samme mønster som `CLAUDE.md` blev reduceret til en pegepind til
`AGENTS.md` i repo-roden.

## Kontekst

`RESUME_INSTRUCTIONS.txt` blev skrevet før flytningen ud af Dropbox og
har en sikkerhedsregel der peger på en sti der ikke længere findes
(`C:\Users\chril\Dropbox\gsb-statistik-test`). Resten af dens indhold —
principperne, tjek-scriptene, listen over vigtige filer — er allerede
dækket:

- Principperne ("Evidens før fortolkning", ingen gæt, én fejl stopper
  ikke serien) står ordret i `statistik/AGENTS.md`.
- Tjek-scriptene står samme sted under "Databasen".
- Statustallene hører hjemme i `results/CURRENT_VALIDATION_STATUS.md`,
  som allerede er den levende kilde — de blev kun kopieret ind i
  `RESUME_INSTRUCTIONS.txt` som en statisk snapshot, der nu er forældet.
- Rækkefølgen for det videre arbejde står i `docs/statistik-plan.md`.

`statistik/AGENTS.md` er endnu ikke committet til repoet (den blev
skrevet 13. september, men forbindelsen droppede før den kunne lægges
ind) — **denne opgave forudsætter at den ligger i repoet før den
startes.** Er den ikke der, så stop og spørg.

## Afgrænsning

**Må røres:** `statistik/RESUME_INSTRUCTIONS.txt` (erstattes af en kort
pegepind), `statistik/AGENTS.md` (kun hvis noget fra
RESUME_INSTRUCTIONS.txt reelt mangler der — se Kontrol).

**Må ikke røres:** `statistik/TEST_RUN_LOG.md`,
`results/CURRENT_VALIDATION_STATUS.md`, databasen, `docs/historik/`,
`apps/netlify-prod/`, Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
wc -l statistik/RESUME_INSTRUCTIONS.txt
```

Skal være under 15 linjer efter opgaven — en pegepind, ikke et
dokument.

```
grep -c "statistik/AGENTS.md" statistik/RESUME_INSTRUCTIONS.txt
```

Skal være mindst 1.

```
grep -ri "gsb-statistik-test\|C:\\\\Users\\\\chril\\\\Dropbox" statistik/RESUME_INSTRUCTIONS.txt
```

Skal give 0 træf — den forældede sti må ikke stå tilbage nogen steder.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git grep -l "RESUME_INSTRUCTIONS" -- ':!statistik/RESUME_INSTRUCTIONS.txt'
```

Kør denne **før** ændringen. Findes der referencer til filen andre
steder (scripts, andre docs), skal de opdateres eller nævnes i
resultatnoten — filen må ikke bare forsvinde under fødderne på noget der
peger på den.

```
git diff --stat main..arbejde/007-pensioner-resume-instructions
```

Må kun vise ændringer i `statistik/RESUME_INSTRUCTIONS.txt` og evt.
`statistik/AGENTS.md`.

**Skøn:**

- Læs `RESUME_INSTRUCTIONS.txt` og `statistik/AGENTS.md` side om side,
  linje for linje — er der noget reelt indhold i den gamle fil der ikke
  har et hjem i den nye, skal det tilføjes til `statistik/AGENTS.md`
  først, ikke tabes.

## Ved tvivl

Er `statistik/AGENTS.md` ikke committet endnu når opgaven startes, så
stop og skriv det under "Spørgsmål" — gæt ikke indholdet af den.

## Gren

`arbejde/007-pensioner-resume-instructions`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Fandtes der referencer til filen andre steder? Hvad blev gjort ved dem:**

**Blev noget flyttet fra RESUME_INSTRUCTIONS.txt til statistik/AGENTS.md, og hvad:**

**Commits:**
