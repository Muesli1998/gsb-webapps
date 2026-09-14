# Opgave 016 — audit af spiller-ID-kobling

**Trin:** Test & Validation

Dette er en **undersøgelse**, ikke selve koblingsarbejdet. Formålet er
at afgøre om kriteriet allerede er opfyldt, eller om det er ugjort
arbejde der er skrevet i nutid ved en fejl.

---

## Mål

Dokumentere hvor stor en andel af de gemte spillerrelationer der reelt
er koblet til et BadmintonPlayer-ID, versus hvor mange der kun hviler på
navnematch — og rette `docs/statistik-plan.md`s kriterium til at
afspejle den faktiske dækning.

## Kontekst

`docs/statistik-plan.md` (afsnittet "Spilleridentitet hviler på ID, ikke
navn") skriver kriteriet i nutid: *"Spillere kobles via
BadmintonPlayer-links (…). Navnematch alene er ikke en sikker
identitet."* Men samme dokuments "Rækkefølge"-sektion, punkt 4, lister
*"Kobl spiller-ID'er"* som et fremtidigt, ugjort skridt. De to udsagn
modsiger hinanden — enten er koblingen allerede sket for det meste af
data, og Rækkefølge-punktet er forældet, eller kriteriet er skrevet for
optimistisk, og reel navnematch-afhængighed er stadig udbredt.

Der er 67.196 spillerrelationer og 7.599 unikke spillernavne i
databasen (jf. `CURRENT_VALIDATION_STATUS.md`). Denne opgave skal måle,
ikke antage, hvor mange af dem der har et gemt BadmintonPlayer-ID.

## Afgrænsning

**Må røres:** `statistik/` — nyt script, ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`, og
`docs/statistik-plan.md` (kun afsnittet "Spilleridentitet hviler på ID,
ikke navn").

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave måler
dækningsgraden — den kobler ikke manglende ID'er og retter ikke
feltværdier. Heller ikke `docs/historik/`, `apps/netlify-prod/` eller
Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "spiller-id\|player-id-audit"
```

Skal give mindst én ny rapportfil.

```
grep -c "016" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

Rapporten skal vise: samlet andel af de 67.196 spillerrelationer med et
gemt BadmintonPlayer-ID versus kun navn, og samme fordelt pr. sæson hvis
muligt (ældre sæsoners kilder mangler ofte ID helt).

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/016-spiller-id-kobling
```

Må kun vise ændringer i `statistik/` og `docs/statistik-plan.md`.

**Skøn:**

- Rapportér den faktiske dækningsgrad uden at antage på forhånd om den
  er høj eller lav.
- `docs/statistik-plan.md`s kriterium skal rettes til at matche det
  audit'en faktisk finder — ikke omvendt.

## Ved tvivl

Viser audit'en at en betydelig andel af spillerrelationerne reelt kun
hviler på navnematch, så foreslå under "Spørgsmål" om selve
koblingsarbejdet (at finde og gemme de manglende ID'er) skal være sin
egen, separate byggeopgave — forsøg ikke selv at koble dem i denne
undersøgelse.

## Gren

`arbejde/016-spiller-id-kobling`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:** `node scripts/audit-player-id-coverage.mjs`
skrev rapporten read-only; `git status --short statistik/data/` var tom.

**Dækningsgrad (samlet og pr. sæson hvis muligt):** 57.270 af 67.196
relationer (85,2 %) har eksternt ID; 9.926 (14,8 %) har ikke. Der er
5.043 af 7.599 spillere med ID og 2.556 uden. Fuld fordeling pr. sæson
ligger i rapportens Markdown-tabel.

**Var kriteriet i docs/statistik-plan.md korrekt formuleret? Hvad blev rettet:**
Det var for optimistisk i nutid. Det er nu markeret som delvist opfyldt
med de målte tal; den resterende kobling er foreslået som separat opgave.

**Commits:** 545319f (audit og rapport), 7f57456 (resultatnote arkiveret).
