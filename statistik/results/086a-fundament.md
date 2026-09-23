# Opgave 086a — fundament

Genereret: 2026-09-23T17:35:06.362Z

## Mål 1 — siderækkefølge

- 2896/16269 gemte indeks-sider rekonstrueret; 13373 kunne ikke.
- Regioner: 25/33 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 16, 17, 18, 19, 20, 23, 24, 25, 27, 28, 29, 30, 31, 32); sæsoner: 17; aldersgrupper: 17.
- 59127 puljehenvisninger og 18546 unikke puljer; 7161 har konfliktende ordre, fordi samme pulje forekommer i flere indekskontekster.
- Ikke-rekonstruerede årsager: {"no_division_or_group_links":13373}.

### Afklaring af forskellen til opgave 085

085 og 086a bruger samme rådata og samme grundidé for linkudtræk. Forskellen er optællingen: 085 talte alle 16.269 inputrækker og rapporterede kun de 59.127 udtrukne puljehenvisninger; det havde ingen tæller for inputrækker med nul links og kaldte derfor ikke 13.373 sider "ikke rekonstrueret". 086a tæller eksplicit links pr. side. De 13.373 er gyldige, tomme indeks-skalder med sidetitel og `ShowStanding('0', ...)`/"Søg andre rækker", men ingen divisionrow/grouprow. Eksempler er indeks 1 (BADDAN U09 2010/2011), 2 (BADMIDJ U09 2010/2011) og 3 (DGI U09 2010/2011). Det er altså ikke en regex-variant, og 085's 59.127 puljehenvisninger samt 18.546 unikke puljer er stadig de samme korrekte fund; 086a tilføjer den manglende side-dækningsmåling.

## Mål 2 — spilleform-signatur

- 17293 puljer med kategoridata; 263053 kampe og 1890589 kategorirækker.
- Konsistent signatur i 17291 puljer; varierende signatur i 2. Signaturen er den sorterede multiset af category_raw pr. kamp; variation er rapporteret, ikke fortolket.
- Variationsgruppe 2013|3|3128: 20 kampe, signaturer 1. D×1|1. S×1|2. D×1|2. S×1|3. S×1|4. S×1 vs. 1. S×1|2. S×1|3. S×1; eksempler 118946=1. S×1|2. S×1|3. S×1
- Variationsgruppe 2013|21|3128: 20 kampe, signaturer 1. D×1|1. S×1|2. D×1|2. S×1|3. S×1|4. S×1 vs. 1. S×1|2. S×1|3. S×1; eksempler 118946=1. S×1|2. S×1|3. S×1

## Mål 3 — klubregister

- SearchClubInfo: 51 kald for 33 regionfiltre; 51 HTTP 200, 0 fejl.
- 796 unikke klubrækker skrevet til club_registry; 796 rækker i tabellen efter kørsel; home_region-værdier: 0.
- Endpointets HTML indeholder klub-ID, navn og postnummer, men intet home-region-felt. Regionfilteret gav samme klub i flere regioner (fx GSB i region 1, 2, 8 og 24), så region_id er NULL frem for en upræcis antagelse.

## Afgrænsning og værn

- Ingen GetLeagueStanding- eller Nembadminton-kald. `gsb-statistik-normalized.db` og `rangliste-historik.db` er kun læst. Rådata i `liga-landskab.db` er ikke ændret ud over den nye `club_registry`-tabel.
