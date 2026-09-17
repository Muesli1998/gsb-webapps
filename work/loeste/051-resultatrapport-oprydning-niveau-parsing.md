# Opgave 051 — opdater 043's "Hvad mangler", og undersøg/forbedr niveau/pointgrænse-parsing for ungdomshold

**Trin:** Results (oprydning før trinnet betragtes som færdigt nok til at gå videre mod Preview)

**Gren:** `opgave-051-resultatrapport-oprydning`, jf. AGENTS.md.

**Baggrund:** To ting blev fundet ved gennemgang af den nuværende
`statistik/results/043-results-rapport-v2.md` (genereret 2026-09-16,
efter opgave 046-050):

**Del 1 — forældet "Hvad mangler"-sektion.** Den lister stadig "21
uforklarede stillingsrækker", men det tal er forældet efter opgave
048-050: 15 af de 21 er nu forklaret (udgået/trukket-hypoteser), 1 er
rekvalificeret som en kildefejl (forkert pulje importeret, ikke en reel
GSB-afvigelse), og 5 forbliver genuint uforklarede. Se
`docs/statistik-plan.md`s "Opfølgning efter lukning"-afsnit under Test &
Validation for den fulde, opdaterede status.

**Del 2 — omfattende "unknown"-huller i holdidentiteter.** Claude talte
op: **103 af 180 holdidentiteter (57 %)** i sektion 1 ("Winrate pr. hold")
har `unknown` i niveau og/eller pointgrænse-delen af nøglen, fx:

```
"Gladsaxe Søborg 3 (age_group_id=2, 3 spillere unknown unknown)"
"Gladsaxe Søborg 1 (age_group_id=4, 2+2 unknown 5600)"
```

Det er en konsekvens af opgave 046's holdtype/niveau/pointgrænse-parsing
(fanger holdtype pænt, men niveau-bogstav og/eller pointgrænse kan ikke
altid udtrækkes af `league_raw`/konkurrencenavnet). Det gør "Winrate pr.
hold"-tabellen svær at læse for over halvdelen af ungdomsholdene. Dette
blev ikke nævnt i opgave 046 eller 047's resultatnoter — det er et nyt
fund.

**Chris' svar (2026-09-17):** "b" (forbedre parsingen før Results
kaldes færdig nok til at gå videre mod Preview).

---

## Mål

**Del 1 (mekanisk, ingen undersøgelse nødvendig):**
1. Opdater `statistik/results/043-results-rapport-v2.md`s (og 042's,
   hvis samme sektion findes der) "Hvad mangler / kendte huller"-sektion
   til at afspejle den opdaterede status: "5 genuint uforklarede
   stillingsrækker (var 21, se `docs/statistik-plan.md` for detaljer),
   heraf 1 med en supplerende uafklaret aldersgruppe-mærkning (opgave
   050)" i stedet for "21 uforklarede stillingsrækker". Bevar de to
   andre punkter (18 audit-kandidater, 205 ungdomsholdkampe uden
   individuelle rækker) uændret, medmindre de også er forældede — tjek
   kort, gæt ikke.

**Del 2 — undersøg og forbedr niveau/pointgrænse-parsing:**
2. Træk `league_raw`/konkurrencenavn-teksten for ALLE de 103 competitions
   med `unknown` niveau og/eller pointgrænse, og vis den fulde liste
   (rå tekst + hvad der blev udtrukket) — så parsing-fejlene kan ses
   konkret, ikke kun tælles.
3. Kategorisér mønstrene: er det (a) niveau-bogstavet mangler helt i
   teksten (fx en ren "4 spillere"-tekst uden A/B/C/D), (b) niveauet
   findes men i et format den nuværende regex ikke fanger (fx
   småbogstaver, mellemrum, eller en anden position i teksten), (c)
   pointgrænsen mangler i teksten, eller (d) andet? Vis et antal for
   hver kategori.
4. For kategori (b) — reelt format-mismatch, ikke manglende data — udvid
   parsing-reglerne til at fange dem, og genkør 042/043. Vis før/efter:
   hvor mange af de 103 blev løst.
5. For kategori (a)/(c) — data der reelt ikke findes i kildeteksten —
   dokumentér det eksplicit som en kildebegrænsning (ikke en parsing-bug)
   i stedet for at gætte niveau/pointgrænse. Disse skal IKKE forsøges
   gættet ud fra fx tilstødende sæsoners hold — de bliver stående som
   `unknown` med en tydelig forklaring i rapportens "Hvad mangler".
6. Bekræft at rettelsen ikke ændrer nogen ALLEREDE korrekt udtrukne
   niveau/pointgrænse-værdier (dvs. de 77 der allerede virkede, skal
   stadig vise samme værdi efter ændringen) — vis dette som en
   regressionskontrol, ikke en antagelse.

## Kontekst

Del 2 skal forbedre parsing hvor det er en reel bug (tekst findes, men
regex fanger den ikke), og ærligt dokumentere hvor data reelt mangler i
kilden — ikke forsøge at nå 0 `unknown` for enhver pris. Et ærligt
"unknown, fordi kilden ikke oplyser det" er et acceptabelt slutresultat
for en del af de 103; et blindt gæt er det ikke.

**Stopkriterium:** når alle 103 er kategoriseret (a-d) og kategori (b) er
rettet, er opgaven færdig, uanset hvor mange der ender i "unknown, kilde
mangler data"-kategorien. Forsøg ikke yderligere runder af regex-
finpudsning ud over den ene gennemgang.

## Afgrænsning

**Må røres:** `statistik/results/042-results-rapport.md`/`.json` og
`043-results-rapport-v2.md`/`.json` (Del 1's tekstopdatering, og Del 2's
genkørsel), `statistik/scripts/042-results-rapport.mjs`/
`043-results-rapport-v2.mjs` (parsing-reglerne), nyt undersøgelsesresultat
for Del 2 (fx `051-niveau-parsing-audit.md`/`.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning — dette er en
rapporteringsændring, ikke en dataimport). Senior/veteran-identiteten
(`name_raw + age_group_id`) må ikke ændres. `docs/statistik-plan.md`/
`docs/BESLUTNINGER.md` røres ikke i denne opgave.

## Kontrol

**Målet:** Del 1: "Hvad mangler"-sektionen viser det korrekte, opdaterede
tal. Del 2: alle 103 er kategoriseret med et konkret tal pr. kategori,
kategori (b) er rettet med et før/efter-tal, og regressionskontrollen
viser 0 ændringer i de allerede korrekte 77.

**Værnet:** ingen ændringer i databasen. Ingen gæt på niveau/pointgrænse
hvor kilden reelt ikke oplyser det.

**Resultatnoten skal angive konkrete tal for hver kategori og for
før/efter-rettelsen, ikke en vurdering.**

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*

## Resultat

- Del 1: 042/043 opdateret fra 21 til 5 genuint uforklarede stillingsrækker; 1 med supplerende uafklaret aldersgruppe-mærkning. 18 audit-kandidater og 205 ungdomsholdkampe uden individuelle rækker bevaret.
- Del 2: 103 tidligere unknown-identiteter gennemgået med streng identitetskobling; 14 entydigt løst (103 -> 89 fortsat unknown). Kategorier: (a) 0, (b) 14 formatfejl løst, (c) 0, (d) 89 ingen entydig match/kildebegrænsning. Fulde rå tekster og udtræk står i statistik/results/051-niveau-parsing-audit.json; den tidligere løse kobling blev afvist.
- Regression: 77 allerede korrekte identiteter ændret 0 gange.


