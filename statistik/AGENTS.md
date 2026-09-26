# statistik — arbejdsregler

Gælder alt arbejde i denne mappe. Repo-roden har de generelle regler i
`../AGENTS.md`; dette er tilføjelser der kun gælder statistikprojektet.

Planen og færdig-definitionen står i `../docs/statistik-plan.md`.

---

## Princippet

**Evidens før fortolkning.** Gem hvad kilden faktisk sagde, ordret, før du
konkluderer noget om hvad det betyder.

Der er en grund til at det står først: næsten alle fejl i dette projekt
har været fortolkninger der blev til data. En rå resultatmarkør gemmes som
den står, ikke som det man tror den betyder. En kamp uden resultat gemmes
som en kamp uden resultat, ikke som en fejl.

---

## Aldrig gæt

Gæt aldrig på aldersgruppe-ID'er, rå resultatmarkører eller årsager til
manglende data. Er årsagen ukendt, så skriv at den er ukendt og gem
evidensen.

Skal der endelig gættes, skal gættet være tydeligt mærket som gæt — men
helst slet ikke.

`individual_matches.result_marker_raw` indeholder 309 markører hvis
betydning ikke er fastslået. De bliver ikke fortolket, og de bliver ikke
omskrevet.

---

## Walkover kræver eksplicit tekst

En walkover registreres kun ved eksplicit `(Ikke fremmødt)`-tekst.
`Vinder W.O.` er en kolonneoverskrift og er ikke i sig selv evidens.

---

## Render-gaten

En browserside må kun godkendes som kampdetalje når den renderede tekst
indeholder **både** det forventede kamp-ID **og** en linje der starter med
`Resultat`. En standardshell på omkring 292 tegn, en tom side eller en
side uden de to signaler må ikke importeres som kampdata.

Detaljerne står i `results/COMPLETE_RESULT_FALLBACK_METHOD.md`.

---

## En fejl stopper ikke serien

Fejler én kamp eller én rute, logges den og kørslen fortsætter. Gem både
succeser og fejl. En enkelt fejlende side må aldrig afbryde resten af en
lang kørsel.

Kørsler skriver én fil per kamp og opdaterer køen løbende, så en afbrudt
kørsel kan genoptages uden at starte forfra.

---

## Databasen

`data/gsb-statistik-normalized.db` ændres kun når opgaven eksplicit siger
det. Undersøgelser og prober skriver aldrig til SQLite.

Efter enhver import køres kontrollerne:

```
node scripts/check-normalized-db.mjs
node scripts/audit-individual-db.mjs
node scripts/audit-individual-coverage-gaps.mjs
node scripts/audit-team-vs-individual-results.mjs
node scripts/run-data-quality-check.mjs
```

Felter udfyldes med `COALESCE`, så en dokumenteret browserværdi ikke
overskrives af tom API-data. Corona-status skal genoprettes efter
generiske browser-synkroniseringer, så den ikke utilsigtet bliver til
`browser_verified`.

`data/`-mappen (databasen, backupper) er `.gitignore`'et og findes derfor
kun lokalt på den maskine der skrev den — den rejser ikke med git. **Efter
enhver opgave der ændrer databasen, skal den opdaterede
`gsb-statistik-normalized.db` kopieres til `gsbData`-stien fra
`config.local.json` (Dropbox), inden opgaven markeres løst.** Uden det trin
er ændringen kun synlig på den maskine der lavede den, og forsvinder hvis
den lokale `data/`-mappe senere ryddes eller repoet klones friskt (set med
opgave 050: 751-rækkers versionen af `standings` findes i dag ingen steder
— hverken lokalt eller i Dropbox — fordi kopieringen blev sprunget over).

---

## Blivende undtagelser

Disse skal **ikke** løses. De skal stå dokumenteret med URL, status og rå
kilde:

- Fire U09-kampe: 505217, 505219, 506407, 506413. API'et giver Internal
  Server Error, og siden viser ingen dynamisk detalje.
- To corona-suspenderede: 387862 og 387864. Siderne har intet spillet
  resultat og er ikke tekniske fejl.
- Kamp 340495 er en protestafgørelse hvor resultatet blev ændret efter
  kendelse. Den må ikke behandles som en skjult scoremangel.

---

## Dokumentation efter hver kørsel

Hver ny test skrives i `TEST_RUN_LOG.md`. Ændrer status sig, opdateres
`results/CURRENT_VALIDATION_STATUS.md`.

Commit kode, databaseændringer og rapporter. Commit ikke browser-cache,
`node_modules` eller midlertidige backups uden en konkret grund — de står
allerede i `.gitignore`.

---

## Hemmeligheder

`SR_CallbackContext` hentes frisk fra sidens HTML ved hvert kald og gemmes
kun i runtime. Den må aldrig hardkodes, gemmes i en fil eller committes.

---

## Uden for dette projekt

U09-U15 er IKKE udskudt — de har været en del af datasættet siden opgave
033-038 (se `docs/statistik-plan.md`, "Ungdomsstatus"). Det der fortsat er
Videreudvikling (ikke hovedmålet, men heller ikke afvist) er specifikt
turnerings- og spillerprofilsporet samt historiske ranglistepoint — se
`docs/statistik-plan.md` og opgave 097 for første skridt i det spor.

Alt dette hører i `../docs/idebank-statistik.md`, ikke i opgavekøen — jf.
prioriteten i `../AGENTS.md`.
