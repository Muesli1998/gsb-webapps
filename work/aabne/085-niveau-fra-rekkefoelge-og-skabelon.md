# Opgave 085 — niveau/rækketype fra siderækkefølge og 077's skabelon, joinbart i SQL

**Trin:** Fortsættelse af opgave 084's analyse, med to nye, konkrete spor Christoffer har peget på.
Stadig undersøgelse/afklaring før bygning — men målet er nu eksplicit at levere noget der kan **joines**
ind i `liga-landskab.db`, ikke bare et dokument.

**Gren:** `arbejde/085-niveau-fra-rekkefoelge-og-skabelon`, jf. `AGENTS.md`.

**Baggrund:** Opgave 084 konkluderede at der ikke findes en komplet, maskinlæsbar mapping fra rå
rækkenavne til niveau, og foreslog en tung model (`league_level_assignments` + `team_identity_links`)
uden at bygge den. Christoffer har siden peget på to billigere signaler der ikke kræver ny dataindsamling:

1. **Siderækkefølgen er selv et niveau-signal.** På badmintonplayer.dk's indekssider listes rækker i en
   fast, meningsfuld rækkefølge — fx for BADDAN SEN 2026/2027: Badmintonligaen → 1. division → 2.
   division → 3. division → Danmarksserien; for BADKBH SEN 2026/2027: Københavnsserien → 1. Serie → 2.
   Serie → ... → 33. Serie. For ungdom (fx BADKBH U15) ser det ud til at "bedste" type (4+3, maks.
   14000 point) ligger øverst, derefter 2+2-ligaer (niveaudelt), derefter 4-spiller-rækker, derefter
   pige-rækker, med UGE38-runder der lægger sig op ad de eksisterende 2+2-ligaer.
2. **Opgave 077's allerede klassificerede GSB-rækker er et validerings-/skabelon-grundlag.** 077
   klassificerede 455 af GSB's egne ligaer/kampe (343 afklarede, 112 uafklarede — koncentreret i
   ungdomsrækker) ud fra rå-tekst-mønstre. De afklarede rækker kan bruges som facitliste: stemmer deres
   kendte niveau overens med den rækkefølge de faktisk havde på siden i den relevante sæson/region?

**Vigtigt:** Siderækkefølgen blev IKKE gemt som et eget felt i `league_groups` under opgave 081 (skemaet
har kun `division_name_raw`/`group_name_raw`/`page_title_raw`, ingen positions-/sekvenskolonne). Det er
ikke bekræftet om rækkefølgen kan udledes fra det der allerede er gemt — det er første ting der skal
afklares, IKKE antages.

## Mål

1. **Bekræft om siderækkefølgen kan udledes uden nye API-kald.** De rå indeks-svar
   (`standing_indexes.raw_response` fra opgave 081) skal stadig indeholde den oprindelige HTML/JSON
   struktur. Undersøg om divisionernes/rækkernes rækkefølge i det rå svar kan genparses pålideligt (fx
   dokumentordenen i HTML'en). Hvis ja: tilføj en `display_order`-kolonne (eller tilsvarende) til
   `league_groups` udledt fra genparsing — INGEN nye kald til badmintonplayer.dk. Hvis nej (rå-data
   utilstrækkelig eller rækkefølgen ikke er pålideligt bevaret i det gemte svar): dokumentér det
   tydeligt i stedet for at antage en rækkefølge.
2. **Test rækkefølge-signalet på kendte eksempler.** Brug de konkrete eksempler Christoffer gav
   (BADDAN SEN 2026/2027, BADKBH SEN 2026/2027, BADKBH U15 2026/2027) og verificér at den udledte
   rækkefølge faktisk matcher det viste (Badmintonligaen øverst, osv.). Rapportér om mønsteret er
   konsistent på tværs af flere sæsoner/regioner, eller om det varierer (fx om rækkefølgen ændrer sig
   år for år, eller er forskellig mellem BD og de enkelte DGI-kredse).
3. **Sammenlign rækkefølge-signalet med 077's klassificering.** For GSB's 343 allerede afklarede rækker
   fra opgave 077: stemmer den udledte rækkefølge/niveau overens med 077's klassificering? Rapportér
   match-rate og konkrete uoverensstemmelser — brug det som en reel valideringstest, ikke en antagelse
   om at metoderne er enige.
4. **Design en joinbar tabel, ikke et dokument.** Foreslå en konkret ny tabel i `liga-landskab.db` (fx
   `league_level_signals` eller udvidelse af `league_groups` selv) med `season_id`, `age_group_id`,
   `region_id`, `league_group_id`, `display_order`, et afledt niveau/rang hvis rimeligt sikkert,
   `confidence`, `evidence_type` (fx `page_order`, `template_match_077`, `both`) og `source_ref`. Den
   skal kunne JOINES direkte på de eksisterende nøgler i `league_groups`/`league_group_teams`/
   `league_matches`, så niveau/række kan slås op sammen med resten af datasættet i almindelige SQL-
   forespørgsler. Skriv forslaget i "Spørgsmål"-afsnittet og STOP der — byg det ikke endnu.

## Kontekst

- `work/loeste/084-liga-landskab-rangering.md` — forrige analyse: rå navnekatalog, officielle kilder,
  og det tungere `league_level_assignments`/`team_identity_links`-forslag (stadig ikke bygget).
- `work/loeste/081-statistik-alle-ligaer-landskab-katalog.md` — kildeskemaet, inkl. hvor
  `standing_indexes.raw_response` ligger, og hvordan de 869 batchede JSONL-rå-filer for kampdata er
  organiseret (til sammenligning, selvom denne opgave fokuserer på indeks-svarene, ikke kampdata).
- `statistik/results/077-liga-regelsaet-katalog.md` — GSB's 455 klassificerede ligaer/kampe, brugt som
  skabelon/facitliste i Mål 3.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/085-*`), nye scripts under
`statistik/scripts/`. Skrivning TILLADT i `liga-landskab.db`, men KUN for at tilføje
`display_order`-kolonnen udledt af genparsing i Mål 1 — ingen andre skemaændringer, ingen nye tabeller
ud over det der eksplicit er bedt om i Mål 4's forslag (som fortsat kun skal skrives som forslag, ikke
bygges).

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/rangliste-historik.db` (kun læses), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`. INGEN nye API-kald til badmintonplayer.dk eller nembadminton.dk i denne
opgave — alt arbejde i Mål 1-3 skal ske ud fra allerede gemt rådata.

## Kontrol

**Målet:**
```
Det er afklaret, med konkret evidens, om siderækkefølgen kan genparses fra allerede gemte rå svar.
Rækkefølge-signalet er testet mod de tre konkrete eksempler og rapporteret som konsistent eller ej.
Rækkefølge-signalet er sammenlignet med 077's 343 afklarede rækker, med en faktisk match-rate.
Et konkret, joinbart tabelforslag findes i kortets "Spørgsmål"-afsnit.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye API-kald til badmintonplayer.dk/nembadminton.dk (kun genparsing af allerede gemt rådata).
Eneste tilladte skrivning til liga-landskab.db er display_order-kolonnen fra Mål 1.
```

**Skøn:** ingen på om rækkefølge-signalet er sikkert nok til at bruges uden markering, og ingen på om
et match mod 077's skabelon er "godt nok" — rapportér match-rate og lad Christoffer vurdere tærsklen.

## Ved tvivl

Er det uklart om siderækkefølgen faktisk kan udledes pålideligt fra det gemte rådata, eller om
rækkefølgen viser sig at variere uforudsigeligt på tværs af sæsoner/regioner: dokumentér det som
usikkert/uafklaret i stedet for at antage et konsistent mønster — samme princip som resten af projektet.

### Spørgsmål

#### Svar — analyse udført 2026-09-22

**1. Genparsing af gemte svar.** `standing_indexes.raw_response` indeholder den oprindelige HTML-struktur med `divisionrow`/`grouprow`, `h3`-tekster og `ShowStanding('2', season, leagueGroupID, ...)`-links i dokumentorden. Scriptet `statistik/scripts/085-analyse-display-order.mjs` genparsede alle 16.269 gemte indeks-svar uden netværkskald: 59.127 puljehenvisninger blev fundet, 18.546 unikke puljer matchede `league_groups`, og 0 puljer manglede i hver retning.

Der blev **ikke** tilføjet en `display_order`-kolonne til `league_groups`. 7.161 af de 18.546 puljer har mere end én observeret rækkefølge, fordi samme `(season_id, age_group_id, league_group_id)` genbruges i flere indeks-svar med forskellig region-/listekontekst, mens `league_groups` ikke har `region_id` i sin nøgle. En enkelt kolonne ville derfor kassere dokumenteret kontekst. Rækkefølgen kan udledes pålideligt pr. konkret indeks-svar, men ikke lagres entydigt i den nuværende tabel.

**2. Konkrete eksempler.** De gemte 2026-svar viser:

- BADDAN SEN (region 1): Badmintonligaen → 1. division → 2. division → 3. division → Danmarksserien, ordre 1–5.
- BADKBH SEN (region 8): Københavnsserien først, derefter playoff/spilletidssektioner, 1.–3. Serie og 31.–33. Serie i den faktiske HTML-orden.
- BADKBH U15 (region 8): U15 (4+3) øverst, derefter 2+2, 4-spiller-rækker, pigerækker og UGE38-blokke. Det er en stabil dokumentorden i dette svar, men ikke en global numerisk skala.

**3. Sammenligning med opgave 077.** 077's 343 rækker med `direkte tekstindikator til stede` er alle genfundet i indeks-svarene (**343/343 = 100 %**), og den normaliserede rå rækketekst stemmer konservativt med indeksdivisionen for **343/343 = 100 %**. Display-order er entydig for **320/343 = 93,3 %**; 23 rækker er tvetydige af samme manglende-region-årsag. Det er en reproducerbarhed/raw-text-match-rate, ikke et bevis for en universel ungdomsrangskala.

**4. Joinbart forslag (ikke bygget).** Opret senere `league_level_signals` med primærnøgle `(season_id, age_group_id, region_id, league_group_id)` og felterne `display_order`, `derived_level`, `confidence`, `evidence_type` og `source_ref`. `display_order` gemmes fra den konkrete indekskontekst; `derived_level` udfyldes kun ved dokumenteret template-/reglement-match. Det bevarer regionale forskelle og kan JOINES direkte til `league_groups`, `league_group_teams` og `league_matches`.

## Resultatnote

Opgaven er gennemført som read-only analyse. Rapportfiler: `statistik/results/085-display-order-analysis.md` og `.json`; script: `statistik/scripts/085-analyse-display-order.mjs`.

- 16.269 indeks-svar; 59.127 parsede puljehenvisninger; 18.546 unikke puljer; 18.546/18.546 matchet til `league_groups`; 0 mangler.
- 7.161/18.546 puljer havde konfliktende display_order-værdier. Derfor ingen databaseændring og ingen `display_order`-kolonne i denne opgave.
- 077-match: 343/343 indekseret, 343/343 råtekst-match, 320/343 entydig display_order, 23 tvetydige.
- `gsb-statistik-normalized.db` SHA-256 før/efter: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` / samme hash efter.
- Ingen nye API-kald; ingen skrivning til nogen database. Den konkrete joinbare tabel er kun foreslået, ikke bygget.
