# Opgave 086a — fundament: fuldt siderækkefølge-katalog, spilleform-signatur, klub-region-register

**Trin:** Fundament for opgave 086b (empiri/hypoteser) og 086c (udvidet visuelt kort). Mekanisk
dataindsamling/-afledning uden fortolkning — lav risiko, ingen "gæt aldrig"-afvejninger. Del 1 af 3 i
en opsplitning af det oprindelige 086-kort, efter aftale med Christoffer.

**Gren:** `arbejde/086a-fundament-rekkefoelge-spilleform-klubregister`, jf. `AGENTS.md`.

**Baggrund:** Opgave 085 genparsede siderækkefølgen for tre konkrete eksempelsider (BADDAN SEN, BADKBH
SEN, BADKBH U15). Det skal udvides til alle 33 regioner. Undervejs i planlægningen af opfølgningen blev
to andre mekaniske behov identificeret:

- **Spilleform er ikke skrevet ned noget sted, men er empirisk aflæselig.** Eksempel fra BADKBH SEN
  2026/2027: Københavnsserien og 3. Serie har 13 kategorier pr. kamp i `match_categories.category_raw`
  (inkl. `DS` — damesingle), mens 31./32./33. Serie kun har 10 kategorier (ingen `DS`, kun én `MD`).
  Det viser at 31.-33. Serie er en anden spilleform end 1.-3. Serie, selvom de står i samme
  rækkefølge-liste på siden.
- **Der findes en klub-opslags-endpoint der aldrig er udnyttet.** Under opgave 081's metode-probing
  blev `SearchClubInfo` fundet (samme webservice som `GetLeagueStanding`, se
  `statistik/scripts/081-webservice-catalog-probe.mjs` linje ~59), som tager `clubid`/`regionid`/
  `postalcode`/`city`/`clubtype`. Den blev aldrig brugt fordi 081 fokuserede på liga-standings. Det
  bekræftede samtidig at `home_team_id` IKKE er en stabil hold-identitet på tværs af sæsoner (sporet
  konkret for Gladsaxe Søborg gennem alle 17 sæsoner — ID'et starter forfra hver sæson) — så et rigtigt
  klub-register er den bedste tilgængelige kilde til at koble hold til deres hjemmeregion.

## Mål

1. Udvid genparsingen af siderækkefølge (fra opgave 085's metode) til alle 33 regioner, alle
   aldersgrupper, for de sæsoner hvor `standing_indexes.raw_response` er gemt — UDEN nye API-kald til
   `GetLeagueStanding`. Rapportér dækning (hvor mange sider/regioner/sæsoner kunne rekonstrueres, hvor
   mange kunne ikke, og hvorfor).
2. Afled en "spilleform-signatur" for hver pulje fra `match_categories.category_raw`-sammensætningen
   pr. kamp (mængden af distinkte kategorikoder, evt. suppleret med antal af hver). Rapportér hvor
   konsistent signaturen er inden for en pulje (samme signatur i alle kampe, eller varierer det?).
3. Hent et klub → hjemmeregion-register via `SearchClubInfo` for de klubber der optræder i vores
   datasæt (formentlig et par tusind unikke klubber, samme lave skala som opgave 083's
   spillermatching-kald). Gem i en ny, selvstændig tabel `club_registry` i `liga-landskab.db`
   (`club_id`, `club_name_raw`, `region_id`, `postal_code`, `fetched_at`) — ikke blandet ind i
   eksisterende tabeller.

## Kontekst

- `work/loeste/085-niveau-fra-rekkefoelge-og-skabelon.md` — metoden for genparsing af siderækkefølge.
- `statistik/scripts/081-webservice-catalog-probe.mjs` — hvor `SearchClubInfo` blev fundet.
- `statistik/data/liga-landskab.db` — `league_groups`, `standing_indexes`, `league_matches`,
  `match_categories`.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/086a-*`), nye scripts under
`statistik/scripts/`. Skrivning i `liga-landskab.db` KUN til: (a) en afledt `display_order`-relateret
udvidelse hvis Mål 1 kræver det (samme forsigtighed som opgave 085 — spørg før noget skrives der ikke
allerede er godkendt), (b) den nye `club_registry`-tabel fra Mål 3.

**Kontrolleret undtagelse fra "ingen nye API-kald" (eksplicit godkendt af Christoffer):** Mål 3 må kalde
`SearchClubInfo`. Dette er den ENESTE tilladte kilde til nye API-kald i denne opgave — Mål 1-2 skal
fortsat ske ud fra allerede gemt rådata, ingen nye kald til `GetLeagueStanding` eller nembadminton.dk.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/rangliste-historik.db` (kun læses), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`.

## Kontrol

**Målet:**
```
Genparsing af siderækkefølge er udvidet til alle 33 regioner, med rapporteret dækning.
Spilleform-signaturen er afledt og rapporteret for alle puljer, med en vurdering af intern konsistens.
Klub-registret er hentet og gemt i en selvstændig tabel, klar til brug i opgave 086b.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Kun SearchClubInfo som nyt API-kald — intet nyt kald til GetLeagueStanding.
```

**Skøn:** ingen. Dette kort er bevidst holdt til ren dataindsamling/-afledning uden fortolkning.

## Ved tvivl

Er dækningen for genparsingen ufuldstændig for bestemte regioner/sæsoner, eller er spilleform-signaturen
inkonsistent inden for en pulje: dokumentér det som et fund, ikke en fejl der skal rettes ved at gætte.

### Spørgsmål

#### Svar — analyse udført 2026-09-23

**Mål 1 — siderækkefølge.** De gemte `standing_indexes.raw_response`-felter blev genparset uden `GetLeagueStanding`-kald. 2.896 af 16.269 indeks-sider havde parsebare divisions-/puljelinks; 13.373 havde ingen sådanne links (`no_division_or_group_links`). Der blev rekonstrueret 59.127 puljehenvisninger og 18.546 unikke puljer, alle 18.546 matchet til `league_groups`. Der var data med puljelinks for 25 af 33 region-id'er og alle 17 sæsoner/17 aldersgruppe-id'er i de rekonstruerede sider. 7.161 puljer havde flere observerede display-order-værdier, fordi samme pulje-nøgle forekommer i flere indekskontekster. Der blev derfor ikke skrevet en display_order-kolonne; den joinbare løsning skal have mindst region_id i nøglen.

**Mål 2 — spilleform-signatur.** For 17.293 puljer med kategoridata blev 263.053 kampe og 1.890.589 kategorirækker analyseret. 17.291 puljer havde identisk multiset-signatur i alle kampe; 2 varierede. Variationerne er konkret dokumenteret for `2013|3|3128` og `2013|21|3128`: 20 kampe, hvor én signatur mangler 4. S/4. D sammenlignet med de øvrige kampe. Det er rapporteret som datavariation, ikke fortolket som en ny spilleform.

**Mål 3 — klubregister.** `SearchClubInfo` blev kaldt 51 gange (33 regionfiltre med pagination), alle HTTP 200, 0 fejl. Svarene gav 796 unikke klubber med navn og postnummer. Endpointet returnerer ikke et home-region-felt, og samme klub (fx GSB) kom tilbage i flere regionfiltre (1, 2, 8, 24). Derfor er `region_id` gemt som NULL; lookup-filteret er ikke fejlagtigt behandlet som hjemmeregion. Tabellen `club_registry` er selvstændig og kan udvides i 086b, når en dokumenteret regionskilde findes.

## Resultatnote

Opgave 086a er gennemført og dokumenteret i `statistik/results/086a-fundament.md`/.json; scriptet er `statistik/scripts/086a-fundament.mjs`.

- Mål 1: 2.896/16.269 sider rekonstrueret; 25/33 regioner med puljelinks; 18.546/18.546 puljer matchet; 13.373 sider uden links.
- Mål 2: 17.291 konsistente puljer, 2 varierende, 263.053 kampe og 1.890.589 kategorirækker.
- Mål 3: 51 SearchClubInfo-kald, 51 HTTP 200, 796 klubrækker i `club_registry`, 0 home-region-værdier (endpointet leverer dem ikke).
- `gsb-statistik-normalized.db` SHA-256 før/efter: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E` / samme hash efter.
- Ingen GetLeagueStanding- eller Nembadminton-kald; eneste nye endpoint var SearchClubInfo. Ingen beskyttede stier ændret.

### Efterfølgende afklaring af 085/086a-tallene

085's `indexRows: 16269` var inputmængden, mens `parsedIndexGroupOccurrences: 59127` kun var antallet af fundne links; 085 havde ingen per-side tæller for nul links. 086a tæller eksplicit sider med links og fandt derfor 2.896 med puljelinks og 13.373 tomme indeks-skalder. De tomme svar indeholder kun sidetitel og `ShowStanding('0', ...)`/"Søg andre rækker" (fx indeks 1 BADDAN U09 2010/2011, 2 BADMIDJ U09 og 3 DGI U09), ikke en alternativ HTML-struktur. Begge scripts finder de samme 59.127 links og 18.546 puljer; forskellen var en måledefinition, ikke en parserfejl.
