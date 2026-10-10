# Opgave 164 — stamdata for GSB-spillere: navne, aliaser og ID'er på tværs af kilderne (kun læsning)

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10 (plan: `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** — (kan køres nu) · **Netværk:** ingen

**Trin:** Forberedelse til alle kort, der skal slå en spiller op: 163, 169, 173, 186. Løser også det åbne spørgsmål om "vores side" (BESLUTNINGER 2026-10-04).

## Gren
`arbejde/164-statistik-stamdata-trup-badmintonid-kortlaegning`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Samme person står under flere navne og ID'er: Resultater bruger BD-navne, Dream Team har en 44-navns facit-liste (`data/navne-alias.json`, `apps/netlify-prod/netlify/lib/navne.js`), `national-spillere.db` har spiller-ID'er (kort 116–120), ranglisten har et `playerid` (fx 329159 i 158b), og den normaliserede DB har sine egne spiller-rækker.
- Ukendt: om rangliste-`playerid` er det samme tal som BadmintonID i `national-spillere.db`. 149 og 155 efterlod spørgsmålet åbent. Ukendt: hvordan man strukturelt afgør, hvilken side i en kamp der er GSB, uden en navneliste (BESLUTNINGER 2026-10-04 "vores side").
- Kort 016 (spiller-id-kobling), 032 (navnematch-risiko) og 036 (navnematch-audit) er læst før dette kort skrives; resultaterne skal bruges, ikke laves om.

## Mål
1. Læs 016, 032, 036, 116, `data/navne-alias.json`, `rangliste-point.db`, `national-spillere.db` og normalized DB (alle read-only). Lav en stamdatatabel pr. person: kanonisk navn, aliaser, rangliste-`playerid`, `national-spillere`-ID, normalized-DB-ID'er, klub (ranglistens klubfelt), køn, fødselsår/aldersgruppe hvis kilden har det, aktiv 2025/26 og 2026/27.
2. Klassificér hver kobling: **entydig på ID**, **navn+klub** (markér uafklaret), **kun navn**, **ingen**. Tæl hver klasse. Udtræk alle navnekonflikter (to personer, samme navn; én person, to navne) som liste.
3. Afgør med evidens, om rangliste-`playerid` = BadmintonID: sammenlign for alle personer, der findes begge steder. Resultat: ja/nej/delvist, med tal og tre eksempler.
4. "Vores side": for GSB-kampene i 2025/26 i normalized DB (271 ungdomsholdkampe, 1.582 individuelle rækker, jf. 155), undersøg om siden kan udledes strukturelt (holdets klub-ID, hjemme/ude og hold-ID) uden navneliste. Tal: andel kampe/rækker, hvor det kan, og hvor det ikke kan, med årsagsfordeling.
5. Anbefaling: hvilken tabelstruktur (`stamdata`, `alias`, `id_kobling`) en senere database skal have, og hvad der skal til for at stamdata kan vedligeholdes (kilde, ejer, opdateringsfrekvens). Kun forslag, ingen oprettelse.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only: `mode=ro`, `PRAGMA query_only=ON`), `data/navne-alias.json`, `apps/netlify-prod/`, 136-parseren, regelbogen.

## Output
- `statistik/scripts/164-stamdata-kortlaegning.mjs`
- `statistik/results/164-stamdata.md/.json/.csv`
- `statistik/results/164-navnekonflikter.csv`

## Kontrol
- **Målet:** Koblingsklasserne summer til antal personer; navnekonfliktlisten findes som CSV; spørgsmålet om rangliste-`playerid` = BadmintonID har et ja/nej/delvist med tal; "vores side"-andelen er målt. Alle tal står i både `.md` og `.json`.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). Nul netværkskald (tallet 0 skrives i rapporten). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om anbefalingen i punkt 5 er konkret nok til, at et senere kort kan bygge stamdata uden at gætte.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Er to kilder uenige om en persons køn eller fødselsår, så vælg ikke; list begge. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål

Uafklaret til senere arbejde; ingen dialog eller netværk er brugt:

- Fysisk personantal er **ukendt**. De 796 stamdataposter er numeriske profilankre eller uafklarede navnegrupper. Navneimport kan have samlet navnebrødre. Alle navnebaserede koblinger bevarer kandidatstatus; 7 af truppens 44 navne har flere mulige profil-IDer og ingen valgt identitet.
- ID-lighed er **delvist** bekræftet: 63 entydige navnepar har forskellige IDer, og 1.865 fælles navne er flertydige. Om de er navnebrødre, dublerede profiler eller navneændringer er **ukendt**. Numerisk profil-ID og BadmintonID/member_number er forskellige felter; medlemsnummeret bevares råt.
- Normalized DB har 0 numeriske profil-IDer, 5.043 `name:`-nøgler og 2.556 NULL-felter. Kort 016's script tæller `COUNT(external_player_id)`/`IS NOT NULL` uden at udelukke `name:`. Den gamle felttælling genbruges, men er ikke bevis for numerisk profil-ID-dækning. Årsagen til den tidligere dækningspåstand er **ukendt**; der er ikke kørt en ny relationsaudit eller rettet i de gamle rapporter.
- Fødselsår er **ukendt** for alle poster; kilderne har intet eksplicit fødselsårsfelt. Ingen århundreder eller fødselsdatoer udledes af member_number. Der er 0 observerede kønskonflikter i stamdataposterne; kildeværdier og uafklaret køn bevares.
- GSB-side er **ukendt** for 505217, 505219, 506407 og 506413: begge holdfelter er tomme, og alle fire har 0 individuelle rækker. En metode alene med numeriske hjemme-/udehold-IDer er ikke dokumenteret; schemaet mangler disse felter. Den målte løsning bruger hold-ID, klub-ID, sæson/pulje og eksakt holdnavn, uden spillernavneliste. Overførsel til Dream Team-arket er **ukendt** og ikke undersøgt her.
- Kort 036's resultatnote er tom, og rapporterne mangler i checkout. De er genfundet med læsende `git show` i commit `07d9a4c65dc204a67416583471b08aa1a3e8240d` og genbrugt med kildehash; auditten er ikke gentaget.

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat

Udført af Codex 2026-10-10 på den eksisterende gren. De fem aftalte outputfiler er oprettet: `statistik/scripts/164-stamdata-kortlaegning.mjs`, `statistik/results/164-stamdata.md`, `.json`, `.csv` og `statistik/results/164-navnekonflikter.csv`. Kortet bliver i `work/aabne/`; kun Spørgsmål og Resultat er udfyldt i kortfilen.

- **Stamdata:** 796 poster = 399 **entydig på ID** + 269 **navn+klub** + 18 **kun navn** + 110 **ingen**. Personklasse er den stærkeste kobling; hver kobling har også egen klasse og uafklaret-flag. Der er 1.119 koblinger, heraf 720 uafklarede. Alle 44 trupnavne er repræsenteret. Én eksplicit `(Ukendt spiller)`-placeholder gemmes separat og tælles ikke som person.
- **Navnekonflikter:** CSV har 3.997 rækker: 3.704 navne med flere profil-IDer, 271 profil-IDer med flere navne og 22 alias-/navnekandidatposter. Listen dækker de læste kildetabeller samlet og har en kolonne, der markerer GSB-relevans. Fysiske navnebrødre er ikke udledt af ID-dubletter alene.
- **ID-sammenligning:** resultat **delvist**; 19.771 af 19.834 entydige navnepar har samme numeriske ID, 63 har forskellige IDer; 1.865 fælles navne er flertydige. Den numeriske ID-intersektion har 22.588 poster, heraf 22.352 med overensstemmende navn og 236 med forskellige navne. Tre eksempler og alle afvigere er gemt. BadmintonID/member_number behandles som separat namespace.
- **Vores side, 2025/26 ungdom:** 267/271 holdkampe = **98,524 %**; 4/271 = **1,476 %** uafklarede på grund af tomme holdfelter. Alle **1.582/1.582 individuelle rækker = 100 %** kan få GSB-side; 0 uafklarede rækker. 254 holdkampe har individuelle rækker; 13 yderligere kampe har kendt side, men 0 individuelle rækker. Årsagsfordeling og evidens pr. kamp/række er gemt.
- **Aktivitet:** 2025/26: 319 observerede og 477 ukendte, heraf 40 observerede med uafklaret personkobling. 2026/27: 125 observerede og 671 ukendte, 0 observerede med uafklaret personkobling. Trupmedlemskab står separat; fravær af kampe betyder ikke inaktivitet.
- **Tidligere arbejde:** 016's eksisterende felttælling og metode, 032's korrigerede række-/kamptypeforbehold, 036's historiske fulde audit og 116's spillerprofilmekanisme er genbrugt. 036's historiske resultat: 8.859 relationer, 2.256 spillerposter og 0 samme-dato/samme-række-indikatorer; det beviser ikke fravær af skjulte navnekollisioner.
- **Forslag:** felter, namespaces, kandidat-/bekræftelsesregler og proveniens for `stamdata`, `alias`, `id_kobling` samt kildeobservationer er beskrevet. Foreslået ejer er Christoffer, automatisk opdatering ugentligt og manuel trupgennemgang ved sæsonstart/ændringer. **Vurdering:** konkret nok til et senere bygge-kort; uafklarede identiteter skal stadig gennemgås. Ingen tabeller er oprettet.

**Kontrol, efter genåbning af output:** `node statistik/scripts/164-stamdata-kortlaegning.mjs` afsluttede med kode 0. Uafhængig SQL bekræftede 271/267 holdkampe, 1.582 individuelle rækker og den aktuelle `name:`-fordeling. Python læste begge CSV-filer med CSV-parser og kontrollerede 796/3.997 rækker, unikke personnøgler, klassesummer, brugbare værdier på bekræftede koblinger og identiske totaler i Markdown/JSON. `node tools/tjek/db-hashes.mjs` afsluttede med kode 0: alle fem SHA-256 matcher `statistik/HASHES.txt` og før/efter-hashene. **Netværkskald: 0**. `git diff --check` afsluttede med kode 0. Git-status viser kun de fem nye outputfiler og denne udtrykkeligt tilladte kortændring. Alle SQLite-forbindelser brugte `mode=ro` og `PRAGMA query_only=ON`; ingen database, parser, aliasfil eller appfil er ændret.
