# Opgave 078 — ekskludér "Ikke fremmødt" fra spilleraggregeringer

**Trin:** Fejlrettelse i Klubstatistik Preview, opdaget under brugerfeedback-runde 1 — se
`docs/idebank-statistik.md`, afsnittet "Klubstatistik Preview — brugerfeedback runde 1
(2026-09-20)".

**Gren:** `arbejde/078-statistik-preview-ikke-fremmoedt-filter`, jf. `AGENTS.md`.

**Baggrund:** Der findes en spillerrække i `players`-tabellen med `player_id=176` og
`name_raw='Ikke fremmødt'` — bekræftet direkte i databasen, ikke et gæt. Det er en
placeholder-markering fra kilden for en tom holdposition, ikke en rigtig person, men den bliver i
dag talt med som en rigtig spiller i klubstatistik-preview'ens Spillere-fane, Klub-karriere-fane og
alle modstander-optællinger (opgave 064/069/067).

## Mål

1. Ekskludér `player_id=176` ("Ikke fremmødt") fra ALLE steder i `klubstatistik-preview/` hvor
   spillere aggregeres, listes eller tælles: Spillere-fanen (065/064), Klub-karriere-fanen (069),
   Modstanderhold-fanen (067) og "hyppigste modstandere" i spillerprofilen. Filtrer i
   datalaget/beregningen, ikke kun i visningen — den skal ikke tælle med i nogen sum eller
   gennemsnit heller.
2. Undersøg om samme rå placeholder-navn ("Ikke fremmødt" eller lignende, fx tomme
   pladsholder-navne) optræder og bliver talt med i `apps/netlify-prod/public/analyse.html` (Dream
   Teams statistikside) eller andre steder spillerlister/optællinger bruges. Ret KUN hvis det
   faktisk bekræftes at være samme problem — gæt ikke at det er der, undersøg direkte i koden/data.
   Rapportér fundet (eller det bekræftede fravær) i resultatnoten, uanset om noget rettes.

## Kontekst

`player_id` er en stabil nøgle — filtrér på selve ID'et (176), ikke på tekstmatch mod
`name_raw`, så en fremtidig ægte spiller med et lignende navn ikke ved et uheld udelukkes. Bekræft
selv at 176 er den korrekte, aktuelle værdi i den friske Dropbox-kopi af databasen, før du hardkoder
den — den kan i teorien ændre sig ved en fremtidig re-import.

## Afgrænsning

**Må røres:** `klubstatistik-preview/klubstatistik.js` (og evt. `server.py` hvis filtreringen giver
bedre mening i datalaget), `klubstatistik-preview/test_preview.py`. Kun hvis punkt 2 i Målet
bekræfter samme problem i `apps/netlify-prod/`: den specifikke fil det er fundet i, ellers slet
ikke.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (læses kun — dette er et
visnings-/beregningsfilter, ikke en datarettelse), `kampsystem/`, resten af
`apps/netlify-prod/` medmindre punkt 2 bekræfter et fund dér.

## Kontrol

**Målet:**
```
"Ikke fremmødt" optræder IKKE i nogen liste/tabel i klubstatistik-preview'en efter rettelsen
  (browserkontrol: søg i Spillere-, Klub-karriere- og Modstanderhold-fanerne).
Samlede kamp-/spillertal (fx det totale spillerantal i Overblik-fanens KPI) falder med præcis 1
  efter eksklusionen — verificér og skriv før/efter-tallet i resultatnoten.
```

**Værnet:** ingen ændring af selve databasen. `git status --short apps/netlify-prod/` er tom,
medmindre punkt 2 bekræfter et fund og en rettelse dér er eksplicit godkendt i resultatnoten med
begrundelse.

**Skøn:** ingen.

## Ved tvivl

Findes der flere placeholder-lignende spillernavne end kun `player_id=176` (fx andre
tom-plads-markeringer): stop og rapportér dem under "Spørgsmål" i stedet for selv at afgøre hvilke
der skal ekskluderes — kun "Ikke fremmødt" er bekræftet af Chris som ikke-en-person.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

- **Databasekontrol:** Frisk Dropbox-læsning bekræftede `player_id=176`,
  `name_raw='Ikke fremmødt'`, `external_player_id='name:ikke fremmødt'`.
  ID'et har 326 relationer fordelt på 307 individuelle kampe. Der blev ikke
  skrevet til databasen.
- **Preview:** `player_id=176` filtreres i beregningslaget med stabilt ID fra
  `playerCount` og begge player-link-gennemløb i `profileStats`; dermed er
  Spillere, Klub-karriere, spillerprofilens hyppigste modstandere og alle
  afledte spillertal fri for placeholderen. Før/efter-spiller-KPI for Alle:
  7.599 → 7.598, præcis 1 mindre. Ungdoms-KPI: 3.364 → 3.363.
- **Browserkontrol:** Den udvidede `test_preview.py` fandt ikke
  "Ikke fremmødt" i Spillere-, Klub-karriere- eller Modstanderhold-fanen.
  Regressionstal: `homeAwayCounts=[1442,1375]`, 7 kategori-rækker,
  40 modstander-rækker, 15 sæson-rækker og 1 API-kald.
- **analyse.html:** Der blev ikke fundet samme bekræftede fejl i
  `apps/netlify-prod/`. `analyse.js` bygger `knownPlayers` fra
  `Spillerpoint!A2:A200` og tæller kun rækker hvis hjemme-/udenavnet findes
  dér; koden indeholder ingen placeholder-navn. `hent-resultater.js`
  genkender allerede "Ikke fremmødt" som walkovertekst. Ingen prod-fil blev
  ændret.
- Kontroller bestået: `python -m py_compile server.py`,
  `node --check klubstatistik.js` og `python test_preview.py`.
