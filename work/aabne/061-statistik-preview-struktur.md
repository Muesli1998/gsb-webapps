# Opgave 061 — Klubstatistik-siden: struktur, nav og datalag (statistik-preview)

**Trin:** Preview — jf. `docs/statistik-plan.md`s rækkefølge (punkt 8) kommer Preview EFTER
Results-rapporten og "Skillen". **Dette kort ligger i `work/future/` med vilje og må IKKE flyttes
til `work/aabne/` eller påbegyndes, før Chris selv beslutter det** — statistik har førsteprioritet
frem til Prod Push (jf. `AGENTS.md`), og lige nu er Results-rapporten (opgavekort endnu ikke
skrevet) det aktive trin, ikke Preview. Dette kort er skrevet nu, fordi det visuelle design allerede
er godkendt af Chris — ikke som et signal om at gå i gang.

**Gren:** `arbejde/061-statistik-preview-struktur`, jf. `AGENTS.md`.

**Baggrund:** `docs/statistik-plan.md` (afsnittet "Preview") og `docs/BESLUTNINGER.md` (posten
"2026-09-15 — statistik/ (SQLite) afløser B3 Klubstatistiks backend, ikke dens design") fastlægger
at denne side genbruger B3's aftalte frontend-design (`docs/planlagte-features-spec.md`), men med
`statistik/`-projektets SQLite-database (`statistik/data/gsb-statistik-normalized.db`, skema i
`statistik/sql/schema-normalized.sql`) som backend.

Det konkrete visuelle design er udarbejdet og godkendt af Chris i en separat Claude-session (ikke i
dette repo) og findes som:
- En klikbar mockup med eksempeldata: `work/future/referencer/061-statistik-preview-mockup.html`
  (kopieret ind i repoet som facit — læs den i en browser før du starter).
- Et designdokument der beskriver beslutningerne bag mockuppen: se
  `work/future/referencer/061-statistik-preview-design.md` (samme mappe).

Dette kort dækker KUN skelettet: den nye side, nav-integration, filterbar med underfiltre, den
tomme fanemekanik, og datalaget. De otte faners indhold er separate opgavekort (062–069), som alle
afhænger af dette korts resultat.

## Mål

En ny side i `apps/netlify-prod/public/` (foreslået filnavn: `klubstatistik.html` — vælg selv hvis
et bedre navn giver mening, men hold det konsistent med de øvrige sidenavne) der:

1. Er tilføjet som et nyt top-level punkt i `gsb-nav.js`s `APPS`-array (`📈 Klubstatistik`, ingen
   `locked`-kode-gate, ingen `pages`-underliste), sideordnet med de eksisterende fire.
2. Har et femte kort i `forside.html`s `app-grid`, samme mønster som de tre eksisterende
   (`.app-card`, badge "Åben for alle").
3. Har en filterbar med fire pills (Alle/Ungdom/Senior/Veteran), der klient-side filtrerer ét
   allerede hentet datasæt på `age_group_id` (se mockuppens JS for den tilsigtede interaktion):
   - Senior: 1
   - Ungdom: 2, 3, 4, 5, 6, 18
   - Veteran: 9, 11, 12, 13, 17
   - Alle: ingen filtrering
4. Har to underfilter-rækker (kun én synlig ad gangen, styret af hvilken af de fire hovedpills der
   er valgt — se mockuppen):
   - Under "Ungdom": årgangs-pills. Brug `statistik/agegroup-labels.json` som facit for label/ID:
     U9 (2), U11 (3), U13 (4), U15 (5), U17 (6), U17/U19 (18).
   - Under "Veteran": klasse-pills. Samme kilde: VETERAN A/SEN40+ (9), SEN50+ (11), SEN55+ (12),
     SEN60+ (13), SEN70+ (17), samt MOT/Motionist (16) hvis der findes data for den i den valgte
     sæson.
5. Har en tom, klikbar fanerække (Overblik, Hold, Spillere, Kategori, Hjemme/Ude, Modstanderhold,
   Sæson, 🏅 Klub-karriere) der viser/skjuler `.pane`-elementer — selve panernes indhold bygges i
   opgave 062–069, men fanemekanikken og de tomme paner (med en tydelig "under opbygning"-placeholder)
   hører til dette kort.
6. Har ét datalag: én (eller et lille, dokumenteret antal) forespørgsel(er) mod SQLite-databasen
   der henter det nødvendige rådata for den valgte sæson/alle sæsoner, eksponeret som en
   in-memory-struktur klientkoden filtrerer videre på — IKKE et separat databasekald pr.
   fane/filterkombination. Vælg selv om dette bedst løses som en Netlify-funktion (`netlify/functions/`)
   der læser SQLite'en og returnerer JSON, eller som et build-time-genereret datafil — dokumentér
   valget og hvorfor i resultatnoten.

## Kontekst

- Visuel stil: genbrug klasser/farver 1:1 fra `apps/netlify-prod/public/analyse.html` og
  `apps/netlify-prod/public/stilling.html` (samme `--court-green`-variabler, `.card`, `.bar-cell`,
  `.season-pill`-familien osv.) — ingen nye farver eller komponenttyper. Mockuppen
  (`referencer/061-statistik-preview-mockup.html`) er bygget efter nøjagtig denne regel; brug den
  som facit for udseendet, ikke som kode der kan kopieres direkte (den har ingen rigtig databinding).
- Holdidentitets-reglen fra `docs/statistik-plan.md` (2026-09-16) gælder for alt datalaget leverer:
  senior/veteran identificeres på `name_raw + age_group_id`; ungdom kræver desuden holdtype og
  niveau/pointgrænse (se `statistik/results/046-ungdom-holdtype-niveau-audit.md` for hvor ofte
  niveau er "ukendt" — det skal vises som "ukendt", ikke gættes eller skjules).
- `docs/BESLUTNINGER.md` (2026-09-19): `apps/netlify-prod/` må kun ændres til en godkendt, ny
  feature, og kun efter Chris' eksplicitte godkendelse af den konkrete ændring — dette kort ER den
  godkendte feature (designet er godkendt), men vent alligevel på Chris' eksplicitte "byg det", jf.
  Trin-note ovenfor.
- Databasen er read-only for dette kort. Ingen skrivning til `statistik/data/gsb-statistik-normalized.db`.

## Afgrænsning

**Må røres:** ny side under `apps/netlify-prod/public/`, `apps/netlify-prod/public/gsb-nav.js`,
`apps/netlify-prod/public/forside.html`, evt. en ny Netlify-funktion under
`apps/netlify-prod/netlify/functions/` til datalaget.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses), `analyse.html`,
`stilling.html`, `tilmelding.html`, `kampsystem.html`, `senior-ungdom-tilmelding.html` og deres
funktioner (Dream Team/Kampsystem/Ungdomssparring-flowene skal være fuldstændig urørte),
`docs/historik/`, Dropbox' `_arkiv\`.

## Kontrol

**Målet:**
```
grep -c "klubstatistik" apps/netlify-prod/public/gsb-nav.js     forventet: ≥1 (nyt APPS-punkt)
grep -c "app-card" apps/netlify-prod/public/forside.html        forventet: 4 (var 3 før)
```
Ny sides fanerække viser og skjuler paner ved klik (manuel/jsdom-verificeret, se resultatnote).
Filterbar-pills filtrerer det hentede datasæt uden nyt netværkskald pr. klik (dokumentér i
resultatnoten hvordan det er verificeret, fx et network-log fra en manuel test).

**Værnet:**
```
grep -c "GSB Dream Team" apps/netlify-prod/public/*.html        skal være uændret fra før
```
`analyse.js`, `stilling.js`, `hent-resultater.js`, `elo-*.js`, `spillere.js`, `tilmeld.js`: 0 ændrede
linjer.

**Skøn:** siden ligner resten af sitet visuelt (sammenlign mod mockuppen og mod `analyse.html`).

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor. Gæt ikke på hvordan datalaget bedst hentes, eller på
hvilken sti/filnavn der er "rigtigst" hvis noget i denne opgave er uklart mod det faktiske repo på
løsningstidspunktet — repoet kan have ændret sig siden dette kort blev skrevet (2026-09-19).

### Spørgsmål

2026-09-20: Den overordnede arbejdsinstruks for denne sekvens siger eksplicit
"Rør ikke `apps/netlify-prod/`", mens dette korts Mål og Afgrænsning kræver
ændringer i `apps/netlify-prod/public/` og eventuelt
`apps/netlify-prod/netlify/functions/`. Hvilken instruktion gælder for
Preview-kortene? Ingen filer under `apps/netlify-prod/` er ændret.

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
