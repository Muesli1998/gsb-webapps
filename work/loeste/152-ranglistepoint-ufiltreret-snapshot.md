# Opgave 152 — ét komplet, ufiltreret snapshot af pointlisterne

**Trin:** Fortsætter 151. Første rigtige hentning, men kun ét snapshot, ind i en ny separat database.

## Hvorfor
151 viste:
- Aldersfiltrene kan ikke bruges til at hente "alle ungdomsspillere" sikkert (`agegroupid`, `agefrom`/`ageto` blandede klasser, og U17 E må spille senior). Uden filtre får man alle spillere på listen.
- Ufiltreret er det overkommeligt: 288 M 99 sider, 288 K 37, 289 M 136, 289 K 53, 292 M 41, 292 K 33 = **399 sider pr. snapshot**. Ved 2 sekunders pause er det ca. 14 minutter pr. snapshot.
- 11 forskellige snapshots dækker alle 266 daterede GSB-ungdomskampe i 2025/26. Det giver ca. 4.400 kald (ca. 2,5 timer) for hele sæsonen.
- 159 af 280 U13-modstandere blev ikke fundet i aldersfilter-siderne. Det kan være seniorer/andre klasser, eller spillere der slet ikke står på en pointliste (ingen point endnu). De to forklaringer kan kun skilles ad med ufiltrerede lister.

Denne opgave tester hele kæden på **ét** snapshot, før vi henter de andre ti.

## Mål
1. **Vælg snapshot.** Brug det snapshot (versionsdato fra 151 punkt 4), som flest af de 266 daterede GSB-ungdomskampe 2025/26 bruger efter reglen "seneste version på eller før kampdato". Skriv datoen og antal kampe, der bruger den.
2. **Hent alle sider for alle seks lister** (288/289/292 × M/K), helt ufiltreret, for det snapshot: forventet ca. 399 sider. Læs det rigtige sidetal fra hvert første svar, og hent til og med sidste side.
3. **Ny database** `statistik/data/rangliste-point.db` (ny fil; ikke de fire eksisterende). Tabel `ranking_points(list_id, param, version_date, player_id, member_number, name, club, class, rank, points, page_index, fetched_at, response_sha256)` plus en tabel `harvest_pages(list_id, param, version_date, page_index, status, rows, response_sha256, fetched_at)` til checkpoint. Primærnøgle på (`list_id`, `param`, `version_date`, `player_id`). Rapportér dubletter (samme spiller to gange i samme liste og snapshot), hvis de findes.
4. **Prøv genoptagelse.** Afbryd kørslen kunstigt efter ca. 30 sider (fx `--stop-after 30`), og kør igen. Bekræft, at allerede hentede sider ikke hentes igen, og at et snapshot først markeres komplet, når alle sider for alle seks lister er hentet.
5. **Kontrol af fuldstændighed.** For hver liste: summen af rækker mod sidetal × 100 (sidste side kortere). Antal rækker uden point. Antal unikke `player_id` pr. liste og samlet.
6. **Kobling.** Tæl for alle GSB-ungdomskampe i det valgte snapshots kampe (alle aldersgrupper U09–U17/U19, ikke kun U13), for både GSB-spillere og modstandere (sider fastslået som i 151 punkt 5):
   - fundet på `player_id` (og passer navn og klub),
   - fundet på `player_id`, men navn/klub afviger (list dem),
   - kun navn og klub (uafklaret),
   - slet ikke fundet.
   Del "slet ikke fundet" op i **pr. disciplin**: har spilleren en pointliste i den disciplin, kampen blev spillet i (HS/DS, HD/DD, MD)? En spiller, der findes på HD-listen, men ikke på HS-listen, er ikke en koblingsfejl, men en spiller uden single-point. Skriv tallene pr. disciplin.
7. **Klasseetiket.** Tæl klasseetiketterne i alle rækker (`U13 …`, `U17 E`, `SEN …`, tom). Skriv hvor mange modstandere der er U17 E eller senior.

## Netværksregler
- Maks. **450 forespørgsler** i alt (399 sider + 6 versionslister/GET + genoptagelsestest + reserve), sekventielt, mindst 2 sekunder mellem kald, backoff ved 429/5xx, stop ved 3 fejl i træk. Hent ny kontekstnøgle (GET af `/DBF/Ranglister/`), når nøglen udløber eller et kald fejler på den.
- Kun `badmintonplayer.dk`. Ingen login, ingen cookies, ingen CAPTCHA, ingen samtykkeklik. Ved bot-værn: stop og skriv det i "Spørgsmål".
- Råsvar må gerne gemmes som komprimerede filer i `statistik/results/152-raa-svar/` (kontekstnøgle redigeret ud), men kun hvis mappen holder sig under ca. 30 MB; ellers gem kun hash og de første 3 sider pr. liste.
- Brug 151-scriptet som udgangspunkt (checkpoint og `--stop-after` skal afprøves som led i punkt 4).

## Output
- `statistik/scripts/152-snapshot-hentning.mjs`
- `statistik/data/rangliste-point.db` (ny, **ustaged**; Christoffer afgør, om den skal i git)
- `statistik/results/152-snapshot.md` (punkt 1–7, forespørgselslog med nr., status, bytes, svarhash)
- `statistik/results/152-snapshot.json`

## Kontrol
- **Målet:** Alle seks lister er hentet til sidste side, og punkt 1–7 er besvaret.
- **Værnet:** Højst 450 forespørgsler (tallet står i loggen). De fire eksisterende databasers hashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E), alle åbnet readOnly. `git status --short statistik/data/` må kun vise den nye `rangliste-point.db`. `git diff --check` uden fejl.
- **Skøn:** 5 GSB-spillere og 5 modstandere fra forskellige aldersgrupper (navn, klub, klasse, point pr. liste), som Christoffer kan slå op på den offentlige side for samme dato. Sammenlign også 5 GSB-spillere med `rangliste-historik.db` for samme eller nærmeste version, og skriv forskellene.

## Afgrænsning
- Ét snapshot. Ingen andre versioner, ingen ældre sæsoner, ingen forventet-vinder-beregning, ingen artifact.
- Ret ikke 136-parseren, 143–151-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke. Spillere uden point markeres som "ikke på listen", aldrig med et opdigtet startpoint.

## Gren
`arbejde/152-snapshot`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
- Prompten godkendte fase 0 (højst 10 kald) og højst 470 kald samlet. Kortets oprindelige grænse er 450; de faktisk brugte 404 overholder begge grænser. Den ekstra versionsprøve i fase 0 er kun rå evidens og er ikke importeret som snapshotpoint.
- 10 ID-fund har navn-/klubafvigelse: 9 modstandere og 1 deltager med ukendt side. De er listet i rapporten og JSON, ikke automatisk godkendt. Skal klubskift/navnevarianter senere afklares manuelt?
- To kampe (506407 og 506413) mangler nationale deltagere/brugbar sideevidens. To øvrige deltagere har ukendt side og tælles separat. Dækningen er derfor ikke fuldstændig for alle kampdeltagere.
- 37 dubletforekomster har samme ID og værdier. Alle annoncerede sider er hentet, men stabil paginering ved ties er ikke bevist. "Ikke fundet" betyder ikke fundet på de hentede sider; det beviser ikke absolut fravær i kildens bagvedliggende data.
- Fase 0: K-listens rang 1 blev 83 ved playerid-opslag, selvom ID/navn/klub/point var uændrede. Rangsemantikken er ukendt; fase 1 importerede kun ufiltrerede svar.
- Skøn-stikprøverne omfatter fem spillere på hver side, men kun U13/U15 på GSB-siden og U09/U13/U15 hos modstanderne. Der var ikke fem forskellige aldersgrupper blandt de entydigt koblede deltagere i dette snapshots kampe.
- Historikstikprøverne er navnekoblede til Nembadminton og ligger 8 dage før snapshot. Fire pointtal er ens, ét afviger med 49. Dette beviser ikke en systematisk skalaforskel.

## Tilbagefald
Slet de nye filer, inklusive `rangliste-point.db` og `152-raa-svar/`. Ingen eksisterende database er berørt.

## Resultat
Hentningen er afsluttet for snapshot 2026-04-10 (requestværdi `04/10/2026`, sæson 2025/26), som bruges af 41 af sæsonens 266 daterede ungdomsholdkampe. Parser og requestkontrakt er genbrugt fra 151 uden ændring i 151-filerne.

Fase 0: 10 kald. Fem positive playerid-svar gav én isoleret række; fire direkte pointkontroller mod kontrolsvar bestod. Et double-opslag gav nul rækker, og fraværet blev efterprøvet i den fulde doubleliste. Et faktisk historisk ranglistepost-ID åbnede GetPlayerRankingListPoints med 20 eventrækker, ikke en samlet liste over alle versioner. K-rangafvigelsen står under Spørgsmål.

Fase 1: alle 393 annoncerede sider hentet, 404 kald samlet, alle HTTP 200, mindste interval 2.100 ms. Ingen cookies eller bot-omgåelse. To ufiltrerede fase 0-sider blev genbrugt; andre fase 0-svar blev ikke importeret.

| Liste | M/K | Sider | Kildeforekomster | Unikke liste/ID-rækker | Sidste side |
|---|---|---:|---:|---:|---:|
| 288 | M | 97 | 9.632 | 9.628 | 32 |
| 288 | K | 37 | 3.620 | 3.616 | 20 |
| 289 | M | 134 | 13.366 | 13.337 | 66 |
| 289 | K | 52 | 5.196 | 5.196 | 96 |
| 292 | M | 41 | 4.003 | 4.003 | 3 |
| 292 | K | 32 | 3.167 | 3.167 | 67 |

38.984 kildeforekomster = 38.947 gemte ranglisterækker + 37 dubletforekomster. 20.043 forskellige profil-ID'er på tværs af lister. Ingen gemte rækker har null-point. Klasseetiketterne er optalt i JSON og rapport; blandt de koblede modstandere fandtes 0 U17 E og 0 SEN.

Kobling: 215 forskellige deltager-ID'er. GSB: 47, heraf 43 ID/navn/klub godkendt og 4 ikke fundet. Modstandere: 166, heraf 144 godkendt, 9 med navn-/klubafvigelse og 13 ikke fundet. Ukendt side: 2, heraf 1 afvigelse og 1 ikke fundet. Ingen kun-navn/klub-koblinger. Alle disciplinoptællinger står i rapporten: enheden er distinkte spiller–disciplin-kombinationer, ikke antal kampe. Et pointtal på et afvigende ID er ikke en godkendt identitetskobling.

Genoptagelse: kunstigt stop efter 30 nye sider; 36 sider var da gemt, og snapshot var ikke komplet. Genoptagelsen sprang gemte sider over. Ved kald 212 stoppede en lokal EPERM-fejl atomisk udskiftning af JSON-checkpointet; SQLite havde allerede gemt siden, integritetskontrollen bestod, og næste kørsel fortsatte på næste manglende side. Ingen rettigheder/ACL'er ændret, ingen færdige sider genhentet. Slutkontrol: `PRAGMA integrity_check` = `ok`.

Kontroller: `node --check statistik/scripts/152-snapshot-hentning.mjs`; offline `node statistik/scripts/152-snapshot-hentning.mjs --analyze`; alle 404 råsvarshashes og alle seks identitets-/pointfelter for de 37 dubletforekomster efterprøvet. Fem GSB- og fem modstanderstikprøver samt fem historikstikprøver er i rapporten. Komprimerede råsvar: 2.865.543 bytes, under 30 MB.

Alle fire eksisterende databasehashes er uændrede før/efter og svarer til kortets kendte værdier. Eksisterende databaser blev kun åbnet readOnly. Kun den nye `rangliste-point.db` blev skrevet; den er gitignored, så `git status --short statistik/data/` er tom. Ingen git-skrivning, staging eller commit. Chris' eksisterende ændringer samt andre trådes filer er urørte. `git diff --check` bestod (kun eksisterende CRLF-advarsler for 136-filerne).

Leverancer: `statistik/scripts/152-snapshot-hentning.mjs`, `statistik/data/rangliste-point.db`, `statistik/results/152-snapshot.md`, `statistik/results/152-snapshot.json` og `statistik/results/152-raa-svar/`. Kortet bliver i `work/aabne/` med ændringerne ustaged.
