# Opgave 098 — ret docs/preview-vs-live-status.md til den nye repo-struktur

**Trin:** Videreudvikling / Dokumentation

**Baggrund:** Under opgave "ryd AGENTS.md op" (2026-09-26) blev det opdaget at
`docs/preview-vs-live-status.md` sidst blev rørt præcis 13. september 2026, som
del af importen af "de resterende projektdokumenter fra 12-sept-eksporten" —
altså en fastfrosset kopi fra FØR omlægningen (se `AGENTS.md`, "Hvad der skete
13. september 2026"). Filen beskriver stadig produktionskode som liggende i
`D:\Dropbox\netlify-tool-prod`, men efter omlægningen ligger den deployede app
i `apps/netlify-prod/` i selve repoet (se `AGENTS.md`s mappestruktur-afsnit).

Chris har bekræftet (2026-09-26): **deploy-metoden til Netlify er stadig manuel
upload** — det er ikke ændret siden omlægningen, kun hvor kildefilerne ligger.

## Mål

1. Læs `docs/preview-vs-live-status.md` helt igennem og find alle steder hvor
   den beskriver filplacering på en måde der ikke stemmer med den nuværende
   struktur (`apps/netlify-prod/` i repoet, ikke Dropbox).
2. Ret disse referencer så de peger på `apps/netlify-prod/` i stedet for
   `D:\Dropbox\netlify-tool-prod`. Deploy-metoden (manuel upload til Netlify)
   er STADIG korrekt og skal ikke ændres — kun hvor kildefilerne kommer fra.
3. Gennemgå resten af tabellen (feature-for-feature-status) for andre
   åbenlyse forældede antagelser fra før omlægningen (fx stier, mappenavne).
   Ret kun det der konkret kan verificeres mod det nuværende repo — gæt ikke
   på om en features live/preview-status selv er ændret siden 13. september,
   det er en anden slags fejl end en sti-fejl.

## Afgrænsning

**Må røres:** `docs/preview-vs-live-status.md`, denne opgaves kortfil.

**Må ikke røres:** `apps/netlify-prod/` selv (jf. beslutningen 2026-09-19 i
`docs/BESLUTNINGER.md` — ingen ændringer i produktionskoden uden separat,
eksplicit godkendelse). Ingen andre dokumenter. Ingen databaser.

## Kontekst

- `AGENTS.md`, "Hvad der skete 13. september 2026" og mappestruktur-afsnittet.
- `docs/BESLUTNINGER.md`, "2026-09-19 — apps/netlify-prod/ røres kun ved ny
  feature" — relevant hvis du bliver fristet til at "rette" noget i selve
  appen som en del af denne opgave. Det skal du ikke.
- Chris' bekræftelse: deploy er stadig manuel upload til Netlify, uændret.

## Kontrol

**Målet — hvad skal blive sandt:**

```
grep -c 'D:\\Dropbox' docs/preview-vs-live-status.md   →  0
Alle sti-referencer i filen peger på apps/netlify-prod/ hvor de tidligere
  pegede på Dropbox.
```

**Værnet — hvad må ikke ændre sig:**

```
git diff --stat   viser KUN docs/preview-vs-live-status.md og denne kortfil.
Ingen ændringer i apps/netlify-prod/.
Antal 🟢/🟡/⚪/🔴-markeringer i tabellen er uændret (medmindre du konkret
  kan verificere at en status er forkert — i så fald: notér det eksplicit
  i Resultatnoten, ret det ikke stiltiende).
```

**Skøn** (kan ikke måles):

- Om en linje i tabellen er "forældet sti" (ret den) eller "forældet status"
  (spørg/notér som åbent spørgsmål, ret den ikke) er en vurdering — vær
  konservativ og spørg hellere én gang for meget.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke** på om
en features live-status selv har ændret sig siden 13. september — det kan kun
Chris bekræfte.

## Gren

`arbejde/098-ret-preview-vs-live-status`, fra `main`.

---

## Spørgsmål

(Ingen ved oprettelse.)

## Tilbagefald

(Én linje hver gang opgaven falder tilbage til et tidligere trin, med hvorfor.)

## Resultat

**Kontroloutput — før og efter:**

```
(indsæt det faktiske output, ikke en beskrivelse af det)
```

**Hvad blev gjort:**

**Hvad blev fravalgt og hvorfor:**

**Commits:**
