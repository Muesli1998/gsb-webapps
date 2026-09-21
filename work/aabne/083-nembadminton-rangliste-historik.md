# Opgave 083 — hent Nembadminton ranglistepoint-historik for GSB's spillere

**Trin:** Udtræk, baseret på opgave 082's fund. Ikke opdagelse — det er allerede afklaret at
`memberStats` er login-frit, kræver et kendt medlems-ID og returnerer hele den historik der findes
(reelt fra ca. 2022 og frem, varierer pr. spiller). Se `work/aabne/082-api-overflade-kortlaegning.md`s
"Spørgsmål"-afsnit for den fulde baggrund og `statistik/results/082-nembadminton-ranking-probe.md`/
`.json` samt `082-nembadminton-ranking-history-followup.md`/`.json` for det tekniske bevis.

**Gren:** `arbejde/083-nembadminton-rangliste-historik`, jf. `AGENTS.md`.

**Baggrund:** Christoffer vil have ranglistepoint over tid for GSB's egne spillere, til fremtidig brug
i statistikprojektet (fx sammenhæng mellem holdstyrke og individuel ranglisteudvikling). Opgave 082
fandt en billig, login-fri vej: GraphQL-kaldet

```graphql
query memberStats($id: ID!) {
  memberStats(id: $id) {
    member { id name points { version points } }
    mix { version points }
    single { version points }
    double { version points }
  }
}
```

på `POST https://app.nembadminton.dk/graphql`, som kræver et kendt Nembadminton-medlems-ID og ingen
login. `highestPointGain(clubhouseId: ...)` kan (også login-frit) bruges til at finde
Nembadminton-medlems-ID'er for et kendt clubhouse (GSB's er `331`, allerede bekræftet i 082).

**Vigtigt ubekræftet led:** Det er IKKE bekræftet at Nembadmintons medlems-ID'er er de samme som de
spiller-ID'er der allerede findes i `gsb-statistik-normalized.db`s `players`-tabel (de kommer fra
badmintonplayer.dk, et andet system). Antag ikke de matcher — det skal afklares som første skridt,
ikke undervejs.

## Mål

1. Afklar konkret, ikke ved antagelse, om/hvordan GSB's spillere fra `gsb-statistik-normalized.db`s
   `players`-tabel (læses read-only) kan kobles til Nembadminton-medlems-ID'er. Sandsynlig vej: kald
   `highestPointGain(clubhouseId: 331, ...)` (evt. med passende parametre for at få en fuld liste, ikke
   kun "highest gain"-toppen — undersøg om feltet har en `limit`/`count`-parameter der kan sættes højt
   nok til at dække hele klubben) og match navne. Rapportér match-kvaliteten (hvor mange spillere blev
   fundet, hvor mange navne var tvetydige/ingen match) — brug evt. `GSB_NAVNE_ALIAS_OG_ANOMALIER.json`
   som allerede findes i projektet til at håndtere kendte navne-varianter.
2. For hvert fundet Nembadminton-medlems-ID: kald `memberStats` og gem det fulde svar (alle tre
   discipliner + `member.points`) — se skema-forslag i Kontekst.
3. Lav idempotent indsamling: et rå-svar gemmes med SHA-256 og kan genparses uden nyt kald, og
   scriptet kan køres igen uden at duplikere data (samme mønster som opgave 081's tilgang, men det er
   ikke et krav at bruge samme kodebase — vurdér selv).
4. Rapportér samlet dækning: hvor mange af GSB's kendte spillere fik data, og hvor mange havde slet
   ingen Nembadminton-historik (kan forekomme, fx nye spillere).

## Kontekst

Se `statistik/CODEX_EXTRACTION_SKILL.md` og opgave 082's kort/resultatfiler for den dokumenterede
GraphQL-viden. Skema-forslag til et nyt, separat datasæt (ikke en del af
`gsb-statistik-normalized.db` eller `statistik/data/liga-landskab.db`, som opgave 081 ejer) —
`statistik/data/rangliste-historik.db`:

```sql
player_link(gsb_player_id, nembadminton_member_id, match_confidence, match_method, matched_name_raw,
  first_seen_at, PRIMARY KEY(gsb_player_id, nembadminton_member_id))
ranking_snapshots(nembadminton_member_id, discipline, version_date, points, source_query,
  fetched_at, raw_response_sha256, PRIMARY KEY(nembadminton_member_id, discipline, version_date))
fetch_errors(nembadminton_member_id, requested_at, http_status, error_kind, response_text, attempts)
```

`match_confidence`/`match_method` findes fordi navnematch ikke er en garanteret præcis kobling — det
skal være muligt senere at se hvilke koblinger der er sikre (fx eksakt ID-match et andet sted) versus
navne-gættet. Dette er et forslag, ikke et krav — hvis en bedre skemastruktur viser sig undervejs
(fx fordi `highestPointGain` faktisk returnerer noget der kan bruges til en mere sikker kobling), så
brug den i stedet, men dokumentér valget.

## Afgrænsning

**Må røres:** `statistik/data/rangliste-historik.db` (nyt, separat datasæt), nye scripts under
`statistik/scripts/`, nyt resultatdokument under `statistik/results/083-*`, `statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/liga-landskab.db` (opgave 081's datasæt), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`.

## Kontrol

**Målet:**
```
player_link viser hvilke af GSB's kendte spillere der er koblet til et Nembadminton-medlems-ID, med
  en angivet match-metode/-sikkerhed — ikke en stiltiende antagelse.
ranking_snapshots indeholder de faktiske hentede datapunkter (alle tre discipliner hvor de findes) for
  hver koblet spiller.
En kort dækningsrapport findes: hvor mange spillere blev koblet, hvor mange fik data, hvor mange
  fejlede eller havde ingen historik.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/liga-landskab.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Antal GraphQL-kald holdes på et fornuftigt niveau for én klubs spillerantal (formentlig et par hundrede
  spillere i alt inkl. historiske) — ingen bred enumeration ud over GSB.
```

**Skøn:** ingen på om et navnematch er sikkert nok til at bruges uden markering — usikre koblinger skal
markeres som sådan, ikke stille antages korrekte.

## Ved tvivl

Er det uklart om et navnematch er korrekt (flere spillere med samme/lignende navn, ingen entydig
kobling): marker den som usikker i `player_link` i stedet for at gætte et enkelt medlems-ID — det er
bedre at mangle data for en spiller end at gemme den forkerte historik under GSB's roster.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
