# Opgave 024 — dokumentoprydning i idébankerne og to små ubrugte kodefund

**Kategori:** Generelt (teknisk gæld)
**Status:** work/future/ — IKKE aktiv. Flyttes til work/aabne/ først når
Chris giver signal, jf. AGENTS.md's prioritetsregel.

---

## Mål

Ryd op i fire konkrete, allerede identificerede rod-punkter fra
`docs/roadmap.md`s afsnit "Kendt teknisk gæld / dokument-oprydning", så
idébankerne beskriver den nuværende, ikke en forældet, tilstand.

## Kontekst

Fire punkter, hver især lille og afgrænset — saml dem i ét kort fordi de
er for små til at retfærdiggøre fire separate opgaver, men behandl dem
som fire uafhængige deltjek, ikke ét stort gæt:

1. **`docs/idebank-kampsystem.md`:** banekapacitets-mekanismen er
   beskrevet to gange (et 36- og et 40-spiller-tilfælde) med voksende
   detaljegrad. Slå dem sammen til én beskrivelse, eller gør tydeligt at
   den ene er en uddybning af den anden — vælg det der kræver mindst
   omskrivning af den omkringliggende tekst.

2. **`docs/idebank-statistik.md`:** afsnittet "Adskil Dream Team-statistik
   fra generel statistik" er overhalet af at B3 (Klubstatistik) er landet
   i `docs/planlagte-features-spec.md`. Markér afsnittet som afklaret der
   (med henvisning), fremfor at lade det stå som et åbent spørgsmål.

3. **`docs/idebank-feature.md`:** Tilmelding-afsnittet har tre lag
   opdateringer oven på originalteksten og er nu shippet (navnealias-
   opslaget, jf. roadmap.md punkt 8). Trim det til den nuværende, gjorte
   tilstand i stedet for at bevare alle tre historiske lag.

4. **`docs/idebank-feature.md`:** en løs ende om ubrugt `nav.sitenav`-CSS
   hører efter roadmappens egen vurdering hjemme i driftloggen
   (`docs/historik/`), ikke i idébanken. Flyt noten dertil.

5. **Kode:** `normalKategorier` (findes i Kampsystem-kildekoden) bevarer
   et ubrugt `double`-felt. Find den konkrete forekomst og fjern feltet,
   MEDMINDRE noget andet stadig læser det — undersøg med et grep for
   feltnavnet på tværs af `kampsystem/` og `apps/` før du fjerner det.

## Afgrænsning

**Må røres:** `docs/idebank-kampsystem.md`, `docs/idebank-statistik.md`,
`docs/idebank-feature.md`, `docs/historik/` (kun for at modtage
CSS-noten fra punkt 4), og den ene kildefil der indeholder
`normalKategorier`.

**Må ikke røres:** `docs/roadmap.md` selv, `docs/planlagte-features-spec.md`,
Dropbox' `_arkiv\`, andre dele af `apps/`/`kampsystem/` end det ene felt.

## Kontrol

**Målet:** intet enkelt kommando-facit her — fire deltjek, ét pr. punkt:

```
grep -c "banekapacitet" docs/idebank-kampsystem.md
```

Antallet af forekomster af den fulde beskrivelse skal falde (dubletten er
fjernet eller tydeligt markeret som uddybning).

```
grep -n "B3\|planlagte-features-spec" docs/idebank-statistik.md
```

Skal give mindst ét træf i "Adskil Dream Team-statistik"-afsnittet.

```
grep -c "nav.sitenav" docs/idebank-feature.md docs/historik/*.md
```

Forekomsten skal være flyttet fra idébanken til en fil i `docs/historik/`.

```
grep -rn "\.double" kampsystem/ apps/ --include=*.js --include=*.py | grep -i normalKategorier
```

Skal give nul træf efter rettelsen, MEDMINDRE grep'et før rettelsen viste
at feltet faktisk bruges et sted — i så fald: ikke rørt, og dokumentér
hvorfor under "Resultat".

**Værnene:**

```
git diff --stat main..arbejde/024-generelt-dokumentoprydning-idebanker-og-kode
```

Må ikke vise ændringer i `apps/netlify-prod/public/` andre steder end det
ene `normalKategorier`-fund, eller i `statistik/`.

**Skøn:**

- Dette er oprydning, ikke omskrivning — ret kun det de fire punkter
  peger på, lad resten af hvert dokument stå.

## Ved tvivl

Bruges `normalKategorier`s `double`-felt et sted du ikke er sikker på
betydningen af, så lad det stå urørt og skriv det under "Spørgsmål" i
stedet for at fjerne noget der måske er i brug.

## Gren

`arbejde/024-generelt-dokumentoprydning-idebanker-og-kode`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter (alle fire deltjek):**

```
```

**Hvad blev gjort ved hvert af de fem punkter:**

**Commits:**
