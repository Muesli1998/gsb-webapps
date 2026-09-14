# Opgave 017 — opdatér valideringsstatus, rækkefølge og researchbacklog

**Trin:** Test & Validation

Dokumentationsopgave, ikke undersøgelse. **Skal køres sidst, efter
opgave 015 og 016 er afsluttet** — den samler op på deres konklusioner
sammen med 004-014's. Er 015 eller 016 ikke afsluttet endnu (heller ikke
på egen ubmerget gren), så stop og spørg i stedet for at springe dem
over.

---

## Mål

`statistik/results/CURRENT_VALIDATION_STATUS.md`,
`docs/statistik-plan.md`s "Rækkefølge"-sektion og
`statistik/RESEARCH_BACKLOG.md` afspejler alle den faktiske status efter
opgave 004-016 — ikke status fra 2026-09-13.

## Kontekst

`CURRENT_VALIDATION_STATUS.md` er dateret 2026-09-13 og nævner intet af
det ti opgaver siden har afklaret: at ingen automatisk udtræksrute
virker (004), stillingskilden og selve stillingskontrollen (005, 015),
den reklassificerede afvigelsesfordeling (006), de syv tvetydige
lavscorer (008), corona-sæsonernes faktiske omfang (012), de 257
payloads' status som dokumenteret kildehul (013), kamp 340495's
afklarede status (014), og spiller-ID-dækningen (016).

`docs/statistik-plan.md`s "Rækkefølge"-sektion (punkt 1-8) er skrevet
som en fremtidig plan, men punkt 1 (004), punkt 3 (klassificér 458),
punkt 4 (kobl spiller-ID'er, jf. 016) og punkt 5 (stillingskontrol, jf.
015) er nu afsluttet eller afklaret. Listen bør markere det, ikke stå
som om intet er sket.

`statistik/RESEARCH_BACKLOG.md`s afsnit "Næste holdkamp-test" (linje
49-55) er det oprindelige spørgsmål bag opgave 005 og bør markeres som
afklaret der, med en henvisning, i stedet for at stå som et åbent
spørgsmål. Opgave 013's forslag om at "en ny manuel indhentning [af de
257] kræver en særskilt opgave" er en beslutning der ikke er taget
endnu, og hører hjemme i `RESEARCH_BACKLOG.md` som en dokumenteret,
ikke-besluttet mulighed — ikke i opgavekøen.

## Afgrænsning

**Må røres:** `statistik/results/CURRENT_VALIDATION_STATUS.md`,
`docs/statistik-plan.md` (kun "Rækkefølge"-sektionen, og "Hvor vi
står"-afsnittet øverst hvis tallene har ændret sig),
`statistik/RESEARCH_BACKLOG.md`, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** databasen `statistik/data/*.db`, andre afsnit af
`docs/statistik-plan.md` end de nævnte, `docs/historik/`,
`apps/netlify-prod/`, Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
grep -n "2026-09-13" statistik/results/CURRENT_VALIDATION_STATUS.md
```

Datoen i filens top skal være opdateret til dagens dato, eller filen
skal på anden tydelig vis vise at den er ajourført siden 09-13.

```
grep -n "004\|005\|006\|008\|012\|013\|014\|015\|016" docs/statistik-plan.md
```

"Rækkefølge"-sektionen skal tydeligt markere hvilke af punkterne der er
afsluttet, og med hvilken opgave.

```
grep -n "Næste holdkamp-test" statistik/RESEARCH_BACKLOG.md
```

Afsnittet skal enten være markeret afklaret (med henvisning til opgave
005) eller fjernet til fordel for en kort note om at det er afklaret.

```
grep -c "013\|manuel indhentning" statistik/RESEARCH_BACKLOG.md
```

Skal være mindst 1 — 013's forslag om manuel genindhentning af de 257
skal stå som en dokumenteret, ikke-besluttet mulighed.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/017-opdater-status-og-rakkefolge
```

Må kun vise ændringer i de fire navngivne filer.

**Skøn:**

- Opdatér, omskriv ikke unødigt. Bevar strukturen i de tre dokumenter —
  dette er en ajourføring, ikke en genskrivning.
- Tal der har ændret sig (fx 315 dækningshuller, hvis 015 eller 016 har
  ændret forståelsen af dem) skal opdateres til de nyeste, bekræftede
  tal.

## Ved tvivl

Er der uoverensstemmelse mellem hvad to opgavers resultatnoter siger om
samme tal, så stop og skriv det under "Spørgsmål" i stedet for at vælge
den ene kilde uden begrundelse.

## Gren

`arbejde/017-opdater-status-og-rakkefolge`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:** Statusdatoen er ændret fra 2026-09-13
til 2026-09-14. `grep`-kontrollerne viser referencer til 004, 005, 006,
008, 012, 013, 014, 015 og 016; `Næste holdkamp-test` er markeret
afklaret; og backloggen indeholder fortsat 013 samt manuel indhentning.
`git status --short statistik/data/` var tom.

**Hvad blev opdateret i hver af de tre filer:**
`CURRENT_VALIDATION_STATUS.md` fik de målte 012–016-resultater og ny dato.
`docs/statistik-plan.md` fik afsluttede audits markeret og 015/016's faktiske
ikke-fulde status. `RESEARCH_BACKLOG.md` fik stillingskilde-testen afklaret
via 005 og den ikke-besluttede manuelle 013-mulighed bevaret.

**Commits:** 31a5129 (status, rækkefølge og backlog), 035958d (resultatnote arkiveret).
