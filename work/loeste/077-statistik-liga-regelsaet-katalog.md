# Opgave 077 — katalog over liga-typer/niveauer GSB har spillet i, 2010-2026

**Trin:** Forarbejde til Klubstatistik Preview's Hold-fane (holdsammenlægning på tværs af sæsoner) —
se `docs/idebank-statistik.md`, afsnittet "Klubstatistik Preview — brugerfeedback runde 1
(2026-09-20)", Chris' prioriterede næste skridt. Ikke en del af de oprindelige 061-069-kort.

**Gren:** `arbejde/077-statistik-liga-regelsaet-katalog`, jf. `AGENTS.md`.

**Baggrund:** For at kunne lægge senior-hold sammen på tværs af sæsoner (GSB 1/2/3/... er samme
hold år efter år) og vurdere hvilke ungdomshold der spiller i de stærke/"gode" ligaer, mangler vi et
samlet overblik over hvilke liga-typer, niveauer og aldersgrupper GSB overhovedet har været en del
af fra 2010 til 2026. Dette er IKKE nyt territorium — der findes allerede løst arbejde om
holdidentitet og regelsæt-parsing: `work/loeste/044-hold-identitet-navnekollision.md`,
`045-holdidentitet-finkornet-aargang.md`, `046-holdidentitet-ungdom-holdtype-niveau.md`,
`052-ukendte-regelsaet-tokens-scan.md`, `053-udvid-holdtype-parsing-nye-tokens.md`. Genlæs disse
FØR arbejdet startes — kataloget her skal bygge videre på deres fund, ikke gentage dem.

**Vigtig afgrænsning fra opgave 075:** den automatiserede Playwright-render-gate-rute til
kampdetalje-udtræk er bevist IKKE at virke i dag (0/5 kendte referencekampe bestod, jf. opgave 075's
resultatnote). Denne opgave rører IKKE render-gaten og henter INGEN kampdetaljer — den bruger kun
`statistik/CODEX_EXTRACTION_SKILL.md`s §1 discovery-kæde (`badmintonPlayerTeams` →
`badmintonPlayerTeamFights` → `badmintonPlayerTeamMatch`), som er en separat, letvægts
liga-/pulje-opslagsrute, ikke kampdetalje-rendering.

## Mål

Byg et dokumenteret katalog (markdown + evt. struktureret JSON under `statistik/results/`) over
alle liga-typer/niveauer/aldersgrupper GSB har spillet i, 2010-2026, i to trin:

1. **Først:** udtræk og strukturér det vi allerede har i den normaliserede database —
   `competitions` (season_id, league_group_id, age_group_id, name_raw, league_raw, phase_raw),
   koblet til `teams`/`team_matches` for at se hvilke GSB-hold der reelt har spillet i hver liga,
   pr. sæson. Dette er read-only mod eksisterende data, ingen ny udtrækning nødvendig for denne
   del.
2. **Dernæst — kun for huller/uklarheder** (fx sæsoner hvor `league_raw`/`phase_raw` er tomt,
   uklart, eller hvor det er uklart om to liga-navne på tværs af sæsoner reelt er samme liga):
   brug skillens dokumenterede discovery-kæde til at verificere/udfylde manglende liga-metadata
   direkte fra Nembadminton. Gem rå svar (URL, tidspunkt, sæson) som evidens, som skillens §5
   kræver. Skriv IKKE til den normaliserede database i denne opgave — kataloget er et
   sideløbende dokument, ikke en import.

For hver liga/pulje i kataloget: navn (rå tekst), sæson(er), aldersgruppe (via
`statistik/agegroup-labels.json`), hvilke GSB-hold der har spillet i den, og — kun hvor det direkte
kan udledes af kildetekstens ordlyd (fx "1. Serie", "2. Serie", "3600", rangbetegnelser) — en
niveau-indikation. Hvor niveau IKKE kan udledes objektivt af kildeteksten: markér eksplicit
"niveau uafklaret ud fra kildetekst alene" — gæt ikke en rangordning af hvor stærk en liga er.

Output skal være struktureret så det direkte kan bruges som input til en senere opgave om
Hold-fanens holdsammenlægning — dvs. gruppér pr. sæson OG pr. hold, ikke kun en flad liste.

## Kontekst

Se `statistik/sql/schema-normalized.sql` for `competitions`/`teams`/`team_matches`-strukturen, og
`statistik/CODEX_EXTRACTION_SKILL.md` (særligt §1 og §9) for discovery-kædens dokumenterede form.
GSB's `clubId` er 1093 (bekræftet flere steder i skillen). `season` i kilden er startåret for
sæsonen.

## Afgrænsning

**Må røres:** nyt katalogdokument (`statistik/results/077-liga-regelsaet-katalog.md` + evt. `.json`),
nye scripts under `statistik/` hvis nødvendige for udtrækket af trin 2 (discovery-kæde-opslag),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til i
denne opgave — kataloget er ikke en import), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`, `docs/historik/`.

## Kontrol

**Målet:**
```
Kataloget dækker alle sæsoner der findes i `seasons`-tabellen 2010-2026 — list eksplicit hvilke
  sæsoner der er dækket og evt. huller.
Hver liga-entry har en kilde: enten "fra normaliseret DB" eller "verificeret via discovery-kæde,
  <URL>, <tidspunkt>" — ingen entry uden kilde.
Ingen liga har fået tildelt et niveau/styrke der ikke direkte kan læses af kildeteksten — tæl og
  rapportér hvor mange ligaer der er markeret "niveau uafklaret".
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/ apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
```

**Skøn:** ingen — kataloget er en dokumentation af faktiske fund, ikke en vurdering.

## Ved tvivl

Afviger discovery-kædens svar for en sæson fra det vi allerede har i databasen: stop, dokumentér
afvigelsen under "Spørgsmål" i stedet for at overskrive eller vælge den ene kilde uden at spørge.
Kan niveauet/styrken af en liga ikke udledes objektivt af kildeteksten alene: markér "uafklaret",
gæt ikke en rangordning ud fra fx antagelser om liga-navnets klang.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

- **Datagrundlag:** Read-only SHA-256 før og efter katalogkørslen var
  `e6c5046a4b93a8518254badf5d8f4529fb0b918ae4a31af63919b5f70d620062`.
  Databasen blev ikke skrevet til. Den aktuelle `seasons`-tabel har 16
  sæsoner, 2010–2025 (2026 har ingen række i databasen); alle 16 er dækket,
  og ingen sæson i tabellen mangler en GSB-entry.
- **Katalog:** 455 entries fra 455 distinkte competitions, grupperet pr.
  sæson og GSB-hold i `statistik/results/077-liga-regelsaet-katalog.md` og
  `.json`. GSB-klubben blev identificeret som `club_id=1093`, og kataloget
  indeholder 472 distinkte API-teamrækker på tværs af discovery-svarene.
- **Discovery:** Den dokumenterede kæde blev kørt for alle 16 sæsoner:
  `badmintonPlayerTeams` og derefter `badmintonPlayerTeamFights` for 472
  grupper. 0 API-fejl, 0 manglende DB-entry-matches og 0 league-mismatches.
  Rå svar, queries og tidspunkter ligger i
  `statistik/results/077-discovery.jsonl`; kilden er
  `https://app.nembadminton.dk/graphql`.
- **Metadata og niveau:** `league_raw` er udfyldt for alle 455 entries;
  `phase_raw` er tomt for alle 455, og discovery-kæden returnerer ikke et
  separat fasefelt. Fase står derfor som ikke tilgængelig, ikke gættet.
  112 entries er markeret "niveau uafklaret ud fra kildetekst alene"; de
  øvrige 343 har en direkte tekstindikator som Serie/division/pointgrænse.
