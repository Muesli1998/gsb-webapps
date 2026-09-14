# Opgave 009 — migrér NEMBADMINTON_API_NOTES.md til repoet

**Trin:** Test & Validation

---

## Mål

`NEMBADMINTON_API_NOTES.md` findes i git-repoet, ikke kun i claude.ai-
projektet. Indholdet er uændret ved migreringen — dette er en flytning,
ikke en omskrivning.

## Kontekst

Filen dokumenterer Nembadmintons uofficielle GraphQL-API
(`app.nembadminton.dk/graphql`), herunder `badmintonPlayerTeamMatch`,
som er datakilden bag den eksisterende holdkamp-scraping. Den er skrevet
2026-09-04 og ligger i dag kun i claude.ai-projektet "GSB Webapps" — den
blev aldrig committet til `gsb-webapps`-repoet, formentlig fordi den blev
skrevet før flytningen ud af Dropbox.

Det er en reel afvigelse fra beslutningen "repoet er den kanoniske
kilde, claude.ai-projektet er et spejl" fra 2026-09-13 i
`docs/BESLUTNINGER.md` — bare i den anden retning end normalt: her
mangler indhold i kilden, det findes kun i spejlet.

Dokumentets indhold er direkte relevant baggrund for det igangværende
statistikarbejde: `statistik/results/COMPLETE_RESULT_FALLBACK_METHOD.md`
refererer til at "Nembadminton-resultatet" er den primære kilde, som
browser-fallback bruges når den fejler på. Notesne forklarer hvorfor og
hvordan den API virker, inkl. kendte fejlmønstre (fx "LEVEL-bugget").

**Fuldt indhold til flytning er vedhæftet i chatten, som en separat
fil.** Kopiér det ordret — omskriv det ikke undervejs.

## Afgrænsning

**Må røres:** ny fil `docs/NEMBADMINTON_API_NOTES.md` (eller
`statistik/NEMBADMINTON_API_NOTES.md` — se "Ved tvivl").

**Må ikke røres:** alt andet. Dette er en ren tilføjelse af én fil.

## Kontrol

**Målet:**

```
test -f docs/NEMBADMINTON_API_NOTES.md && wc -l docs/NEMBADMINTON_API_NOTES.md
```

Filen skal findes og have et linjetal der matcher kildefilen (den
vedhæftede version) inden for få linjer (formatering kan give mindre
udsving).

```
git diff --stat main..arbejde/009-migrer-nembadminton-api-notes
```

Skal vise **præcis én ny fil**, intet andet.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

**Skøn:**

- Indholdet er identisk med kildefilen — ingen forkortelser, ingen
  "oprydning" undervejs. Er noget forældet i den (fx datoen 2026-09-04),
  rettes det ikke her; det er en ren flytning.

## Ved tvivl

Filen kan lige så godt hedde `statistik/NEMBADMINTON_API_NOTES.md`, hvis
det virker mere rigtigt givet resten af mappestrukturen — begge er
fint, men vælg kun ét sted og skriv hvilket i resultatnoten.

## Gren

`arbejde/009-migrer-nembadminton-api-notes`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Placering valgt:**

**Commits:**
