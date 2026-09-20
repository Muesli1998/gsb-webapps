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

**Afklaret 2026-09-20 (se Spørgsmål nedenfor): dette bygges IKKE i `apps/netlify-prod/`.**
Det bygges i en ny, selvstændig mappe `klubstatistik-preview/` i repo-roden — samme princip som
`kampsystem/` allerede bruger for kampsystem-previewet: kilder der køres/testes lokalt, og som
først "pastes" ind i `apps/netlify-prod/` som et separat, senere opgavekort, når siden er godkendt
til at gå live. Databasen læses lokalt (via `config.local.json`, read-only) — ingen ekstern SQL-host
endnu; det er et separat, senere skridt Chris selv tager stilling til.

En ny side i `klubstatistik-preview/` (foreslået filnavn: `klubstatistik.html` — vælg selv hvis et
bedre navn giver mening, men hold det konsistent med de øvrige sidenavne i `apps/netlify-prod/public/`,
så den senere kan "pastes" ind uden omdøbning) der:

1. Er en selvstændig, lokalt-kørbar side — ingen integration i `apps/netlify-prod/public/gsb-nav.js`
   eller `forside.html` i denne opgave. Nav- og forside-integrationen hører til det senere
   "paste ind i prod"-kort, ikke dette.
2. Har en filterbar med fire pills (Alle/Ungdom/Senior/Veteran), der klient-side filtrerer ét
   allerede hentet datasæt på `age_group_id` (se mockuppens JS for den tilsigtede interaktion):
   - Senior: 1
   - Ungdom: 2, 3, 4, 5, 6, 18
   - Veteran: 9, 11, 12, 13, 17
   - Alle: ingen filtrering
3. Har to underfilter-rækker (kun én synlig ad gangen, styret af hvilken af de fire hovedpills der
   er valgt — se mockuppen):
   - Under "Ungdom": årgangs-pills. Brug `statistik/agegroup-labels.json` som facit for label/ID:
     U9 (2), U11 (3), U13 (4), U15 (5), U17 (6), U17/U19 (18).
   - Under "Veteran": klasse-pills. Samme kilde: VETERAN A/SEN40+ (9), SEN50+ (11), SEN55+ (12),
     SEN60+ (13), SEN70+ (17), samt MOT/Motionist (16) hvis der findes data for den i den valgte
     sæson.
4. Har en tom, klikbar fanerække (Overblik, Hold, Spillere, Kategori, Hjemme/Ude, Modstanderhold,
   Sæson, 🏅 Klub-karriere) der viser/skjuler `.pane`-elementer — selve panernes indhold bygges i
   opgave 062–069, men fanemekanikken og de tomme paner (med en tydelig "under opbygning"-placeholder)
   hører til dette kort.
5. Har ét datalag der læser lokalt fra `statistik/data/gsb-statistik-normalized.db` (sti via
   `config.local.json`, read-only) og henter det nødvendige rådata for den valgte sæson/alle sæsoner,
   eksponeret som en in-memory-struktur klientkoden filtrerer videre på — IKKE et separat
   databasekald pr. fane/filterkombination. Vælg selv den enkleste lokale løsning der virker uden
   Netlify (fx et lille Node/Python-script der læser SQLite'en og skriver en statisk JSON-fil i
   `klubstatistik-preview/`, eller en minimal lokal server) — dokumentér valget og hvorfor i
   resultatnoten, og navngiv tydeligt hvad der skal ændres når dette senere kobles til en rigtig
   SQL-host/Netlify-funktion i stedet.

## Kontekst

- Visuel stil: genbrug klasser/farver 1:1 fra `apps/netlify-prod/public/analyse.html` og
  `apps/netlify-prod/public/stilling.html` (samme `--court-green`-variabler, `.card`, `.bar-cell`,
  `.season-pill`-familien osv.) — ingen nye farver eller komponenttyper. Mockuppen
  (`referencer/061-statistik-preview-mockup.html`) er bygget efter nøjagtig denne regel; brug den
  som facit for udseendet, ikke som kode der kan kopieres direkte (den har ingen rigtig databinding).
  Læs, kopiér ikke omdøb, de nødvendige CSS-klasser ind i `klubstatistik-preview/`, så "paste"-trinet
  senere er en filflytning, ikke en omskrivning.
- Holdidentitets-reglen fra `docs/statistik-plan.md` (2026-09-16) gælder for alt datalaget leverer:
  senior/veteran identificeres på `name_raw + age_group_id`; ungdom kræver desuden holdtype og
  niveau/pointgrænse (se `statistik/results/046-ungdom-holdtype-niveau-audit.md` for hvor ofte
  niveau er "ukendt" — det skal vises som "ukendt", ikke gættes eller skjules).
- `docs/BESLUTNINGER.md` (2026-09-19)s krav om Chris' eksplicitte godkendelse gælder kun
  `apps/netlify-prod/` — og er derfor IKKE relevant for dette kort, da intet i `apps/netlify-prod/`
  røres. Det bliver relevant igen ved det senere "paste ind i prod"-kort.
- Databasen er read-only for dette kort. Ingen skrivning til `statistik/data/gsb-statistik-normalized.db`.

## Afgrænsning

**Må røres:** ny mappe `klubstatistik-preview/` (repo-roden), inklusive et lille lokalt
script/serverfil til at læse databasen og eksponere data til siden.

**Må ikke røres:** ALT i `apps/netlify-prod/` (inklusive `gsb-nav.js`, `forside.html`,
`netlify/functions/`) — ingen undtagelser i dette kort. `statistik/data/gsb-statistik-normalized.db`
(kun læses), `kampsystem/` og dets byggescript, `docs/historik/`, Dropbox' `_arkiv\`.

## Kontrol

**Målet:**
```
test -d klubstatistik-preview                                  forventet: mappen findes
git status --short apps/netlify-prod/                           forventet: tom (0 ændrede filer)
```
Siden kan åbnes lokalt (fx via en lokal server eller direkte som fil) og viser reelt hentet data fra
`statistik/data/gsb-statistik-normalized.db`, ikke mockuppens eksempeldata. Ny sides fanerække viser
og skjuler paner ved klik (manuel/jsdom-verificeret, se resultatnote). Filterbar-pills filtrerer det
hentede datasæt uden nyt hentekald pr. klik (dokumentér i resultatnoten hvordan det er verificeret).

**Værnet:**
```
git status --short apps/netlify-prod/ kampsystem/                skal være tom
grep -c "GSB Dream Team" apps/netlify-prod/public/*.html          skal være uændret fra før
```

**Skøn:** siden ligner resten af sitet visuelt (sammenlign mod mockuppen og mod `analyse.html`).

## Ved tvivl

Stop og skriv under "Spørgsmål" nedenfor. Gæt ikke på hvordan datalaget bedst hentes, eller på
hvilken sti/filnavn der er "rigtigst" hvis noget i denne opgave er uklart mod det faktiske repo på
løsningstidspunktet — repoet kan have ændret sig siden dette kort blev skrevet (2026-09-19).

### Spørgsmål

**Codex' spørgsmål (2026-09-20):** Kortets egen Kontekst-note siger dette
kort ER den godkendte feature og kun venter på Chris' eksplicitte "byg
det" — men den overordnede arbejdsinstruktion for denne runde sagde
generelt "rør ikke `apps/netlify-prod/`", uden at nævne denne undtagelse.
Hvilket gælder?

**Rettelse (2026-09-20, samme dag):** Claudes forrige svar her var
FORKERT og skal ignoreres. `AGENTS.md`s egen trin-definition siger
"Preview — brugerflade og funktion er afprøvet, men ikke live." Men
`apps/netlify-prod/` ER den faktisk deployede, live side
(gsbmore.netlify.app) — enhver ændring der committes og pushes dertil
bliver live med det samme. Kortets Mål-afsnit (sætte siden direkte i
`apps/netlify-prod/public/`) er derfor i konflikt med sit eget Trin, og
det er IKKE afklaret endnu hvordan denne modsigelse løses.

**Stop. Byg ikke i `apps/netlify-prod/` for dette kort, før dette er
afklaret.** Chris skal beslutte hvordan et reelt "ikke-live" preview
teknisk realiseres — fx en separat Netlify preview-deploy pr. gren, en
lokal HTML-fil uden nav-integration, eller et andet mønster. Kortets
Mål-afsnit skal formentlig omskrives, ikke bare besvares.

**Chris' svar (2026-09-20):** Byg det for sig selv, i en ny mappe
`klubstatistik-preview/` — samme princip som `kampsystem/`. Det skal
kunne testes rent lokalt, og skal senere kunne "pastes" ind i
`apps/netlify-prod/` som et separat kort. Databasen læses lokalt via
`config.local.json` for nu — en gratis ekstern SQL-host til Netlify er
et senere, separat skridt, som ikke er en del af dette kort. Mål,
Kontekst, Afgrænsning og Kontrol er rettet til herefter. `apps/netlify-prod/`
røres ikke i dette kort.

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
