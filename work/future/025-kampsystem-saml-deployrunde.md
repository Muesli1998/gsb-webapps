# Opgave 025 — saml de ophobede Kampsystem-features i én deployrunde

**Kategori:** Kampsystem
**Status:** work/future/ — IKKE aktiv. Flyttes til work/aabne/ først når
Chris giver signal, jf. AGENTS.md's prioritetsregel.

---

## Mål

Kopiér de features der allerede er bygget og testet i preview-kilden
(`kampsystem/kampsystem_source.html`) ind i produktionsfilen
(`apps/netlify-prod/public/kampsystem.html`), i én samlet runde — ikke
drypvist. `docs/roadmap.md`s anbefaling nr. 5 begrunder hvorfor: seks-syv
færdigbyggede ting er allerede ophobet, og gap'et mellem preview og
produktion er roadmappens vurderede største enkeltrisiko i projektet.

## Kontekst

Punkterne der skal med (alle status 🟡/bygget-i-preview, ingen af dem
kræver nyt designarbejde ifølge roadmap.md):

1. Lås-dropdown-fix (roadmap punkt A5).
2. Bane-begrænset rundegenerering (banekapacitets-bevidst fordeling der
   minimerer oversiddere).
3. Kønsbevidst double-/mixed-fordeling.
4. Tydeligere oversidder-UI.
5. Manuel kamp-redigering.
6. H2H-redesign.
7. "Normal rolle" til produktion (roadmap punkt 4) — BEMÆRK: denne kræver
   at Chris selv har tilføjet nye kolonner G/H i Google Sheet'et
   `ELO_Spillere` FØRST. Er de ikke der, spring dette ene underpunkt over
   og noter det under "Spørgsmål" — lav ikke Sheet-ændringer selv.

**Bevidst UDELADT fra denne runde (afventer separat afklaring):**
Udskiftningssingle/-double (3/5 spillere pr. bane) og teknikbane-loftet —
roadmap.md er eksplicit om at disse først kopieres når
teknikbane-designspørgsmålet (gulv eller loft? forhåndsreserveret eller
kun ved overskydende plads?) er afklaret af Chris. Rør dem ikke i denne
opgave.

## Afgrænsning

**Må røres:** `apps/netlify-prod/public/kampsystem.html` (og evt.
tilhørende JS/CSS-filer i samme mappe hvis features derfra afhænger),
samt Google Sheet-kolonnetilføjelsen for punkt 7 KUN hvis Chris allerede
har oprettet G/H selv.

**Må ikke røres:** `kampsystem/kampsystem_source.html` (preview-kilden
forbliver uændret — den er facit, ikke det der rettes),
udskiftningssingle/-double og teknikbane-loftet (se ovenfor), `statistik/`,
Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

Manuel funktionstest af hvert af de 6-7 punkter i den opdaterede
`kampsystem.html`, sammenlignet mod dets kendte, bekræftede opførsel i
`kampsystem_source.html`. Der findes ingen automatiseret testsuite for
Kampsystemet i dag — dokumentér testen som en liste af "gjort/virkede
som forventet" pr. punkt, ikke som en påstand.

```
git diff --stat main..arbejde/025-kampsystem-saml-deployrunde
```

Skal KUN vise ændringer i `apps/netlify-prod/public/`.

**Værnene:**

`docs/roadmap.md` (2026-09-07) beskriver en synlig kode-gate ("kamp2026")
foran Kampsystemet — men et grep efter "kamp2026", "password", "gate"
eller "kode" i BÅDE `apps/netlify-prod/public/kampsystem.html` og
`kampsystem/kampsystem_source.html` gav nul træf i research forud for
dette kort. Enten er gaten fjernet, ligger i en anden fil (fx en separat
landingsside eller JS-fil), eller roadmap.md's beskrivelse er forældet.
Bekræft FØRST hvor (eller om) gaten faktisk findes i dag, før du antager
den er intakt eller at den skal genindsættes — dette er ikke en del af
selve deployrunden, men skal afklares før punkt 1-7 kopieres, så et
eventuelt eksisterende adgangsværn ikke utilsigtet forsvinder eller
duplikeres.

```
git diff --stat main..arbejde/025-kampsystem-saml-deployrunde
```

Skal KUN vise ændringer i `apps/netlify-prod/public/`.

**Skøn:**

- Kopiér features én ad gangen og test hver for sig før den næste, selv
  om de committes samlet til sidst — en fejl i punkt 3 skal ikke skjules
  af at punkt 1-2 virkede.

## Ved tvivl

Er Sheet-kolonnerne G/H til punkt 7 ikke oprettet endnu, eller er en af
de andre seks features' testresultat i `kampsystem_source.html` uklart
(virker ikke som roadmap.md beskriver), så spring det ENE punkt over,
gennemfør resten, og skriv det udeladte punkt under "Spørgsmål" —
gæt dig ikke igennem det.

Findes kode-gaten (se "Værnene") ingen steder i nogen af de to filer, så
stop HELT før du kopierer noget som helst, og skriv fundet (eller
ikke-fundet) under "Spørgsmål" — dette kan være en reel, uopdaget
sikkerhedsregression, ikke bare en forældet roadmap-linje.

## Gren

`arbejde/025-kampsystem-saml-deployrunde`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Test pr. punkt (1-7), gjort/udeladt/fejlede:**

**Commits:**
