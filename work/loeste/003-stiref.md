# Opgave 003 — overset dokumentreference i idebank-kampsystem

**Trin:** Test & Validation

Første opgave der bruger kontrolformatet fra `work/OPGAVE-SKABELON.md`.
Indholdet er lille med vilje — formålet er lige så meget at afprøve
formatet som at rette fejlen.

---

## Mål

`docs/idebank-kampsystem.md` linje 760 henviser til `gsb-roadmap.md`.
Dokumentet hedder nu `roadmap.md`. Referencen skal pege rigtigt.

Fejlen blev fundet ved uafhængig kontrol af opgave 002. Den var ikke
nævnt i 002's resultatnote — deraf kontrolafsnittet i den nye skabelon.

## Afgrænsning

**Må røres:** `docs/idebank-kampsystem.md`, og kun den ene linje.

**Må ikke røres:** alt andet i filen, alle øvrige dokumenter,
`docs/historik/`, Dropbox' `_arkiv\`.

Bemærk at `docs/historik/` godt må indeholde `gsb-roadmap.md` — de
dokumenter beskriver fortiden korrekt, hvor filen faktisk hed det.

## Kontekst

Linjen lyder cirka: *"punkt 1 blev besvaret uden kodeændring i samme
runde. `gsb-roadmap.md` havde flagget denne linje som..."*

Dokumentnavnene skiftede ved omlægningen 13. september: `gsb-`-præfikset
faldt væk, og idébankerne fik ens form. Se `AGENTS.md` under
"Mappestruktur".

## Kontrol

**Målet:**

```
grep -c "gsb-roadmap" docs/idebank-kampsystem.md
```

Før: `1` — Efter: `0`

**Værnene:**

```
grep -c "roadmap" docs/idebank-kampsystem.md
```

Skal være uændret. Rettelsen erstatter et navn, den fjerner ikke en
henvisning.

```
wc -l docs/idebank-kampsystem.md
```

Skal være uændret — det er én linje der rettes, ingen der tilføjes eller
fjernes.

```
git diff --stat main..arbejde/003-stiref
```

Skal vise præcis to filer: `docs/idebank-kampsystem.md` med 1 ændret
linje, og denne opgavefil.

**Skøn:**

- Sætningen giver stadig mening efter rettelsen.

## Ved tvivl

Finder du flere forekomster end den ene, så ret dem ikke uden videre —
skriv dem ind under Spørgsmål. Det kan være der er en grund til at de
står som de gør, fx hvis de citerer et historisk dokument.

## Gren

`arbejde/003-stiref`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
Før: gsb-roadmap = 1, roadmap = 1, linjer = 1320.
Efter: gsb-roadmap = 0, roadmap = 1, linjer = 1320.
```

**Hvad blev gjort:**

Den ene aktive reference i `docs/idebank-kampsystem.md` er rettet fra
`gsb-roadmap.md` til `roadmap.md`.

**Hvad blev fravalgt og hvorfor:**

Ingen andre forekomster er rørt; opgaven afgrænser rettelsen til denne
ene linje.

**Commits:**
