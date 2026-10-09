# Opgave 158 — Del A: turneringsresultater og pointændringer

Afgrænsning: Del A udført. Del B og Del C: Ikke kørt i denne omgang.
Netværkskald logget for opgave 158: 4 i alt (badmintonplayer.dk); app.nembadminton.dk/graphql: 0. Tre eventtabeller blev genbrugt fra 154, og to profiler blev hentet i denne fortsættelse.

## 1. Eventtabeller for fem profiler

| Spiller | Profil-ID | Liste/disc. | Rækker | Referencer i rækker | Datoer observeret | Kilde |
|---|---:|---|---:|---|---|---|
| Josefine Bille-Ahmt | 329159 | 288 / single | 42 | systemraekke: 1; turnering: 34; holdkamp: 6; ukendt: 1 | 17-08-2025 – 21-06-2026 | 154-råsvar 009.gz |
| Benjamin Hinge Carlsson | 330650 | 288 / single | 31 | systemraekke: 1; turnering: 24; holdkamp: 5; ukendt: 1 | 20-09-2025 – 21-06-2026 | 154-råsvar 010.gz |
| Louis Valdemar Hedegaard Toftlund | 330770 | 289 / double | 46 | systemraekke: 1; turnering: 32; holdkamp: 12; ukendt: 1 | 24-08-2025 – 21-06-2026 | 154-råsvar 011.gz |
| Theodor Lumby Jessen | 327691 | 288 / single | 63 | systemraekke: 1; turnering: 47; holdkamp: 14; ukendt: 1 | 24-08-2025 – 21-06-2026 | 154-fase-0a detail_link |
| Anna Rudolph | 328195 | 288 / single | 56 | systemraekke: 1; turnering: 43; holdkamp: 11; ukendt: 1 | 17-08-2025 – 21-06-2026 | 154-fase-0a detail_link |

Observeret tabeloverskrift: Dato | Turnering/Holdkamp | Spillere | Point | (tom overskrift). Der er fem celler: Dato, Turnering/Holdkamp, Spillere, Point og en tom overskrift for kontrolindikatoren.
Hver datarække har dato (nogle fortsættelsesrækker har tom datocelle), titel/link til turnering eller holdkamp, spillertekst med profillinks for andre deltagere, et Point-felt med værdier adskilt parallelt med spillerlinjerne samt en tom op/ned-indikator. De rå HTML-rækker er bevaret; parseren gemmer tomme datoceller som null og angiver arvet dato separat.
Rækkens disciplin kan kun knyttes via opslagets rankinglistid (288=single, 289=double); selve tabellen har ingen disciplin-kolonne. Relationen mellem den anden spiller og hovedspilleren (partner/modstander) er ikke mærket i eventtabellen.
Eventtabeller tilgængelige for 5 af 5 profiler. Profiler med holdkamprækker men uden turneringsrækker i den viste tabel: ingen observeret. Det afgør ikke nødvendigvis om spilleren aldrig spiller turneringer uden for denne tabel/sæson.
Runde/fase, kampnummer, modstanderrolle, sætresultat/vinder, point før, point efter og pointændring: ikke vist som eventtabellens felter; derfor ukendt her. Point-feltet er ikke opdelt i før/efter/delta.

### Rækkeeksempler fra de gemte svar

- Josefine Bille-Ahmt: dato 24-05-2026; turnering "Badminton Esbjerg U13 M"; spillere Josefine Bille-Ahmt | / Yrsa Enghave Højlyng , Humlebæk |; pointfelter 1771 | / 1783 |; link /DBF/Turnering/VisResultater/#113413,.
- Josefine Bille-Ahmt: dato 24-05-2026; turnering "Badminton Esbjerg U13 M"; spillere Josefine Bille-Ahmt | / Filippa Lund Christophersen , Humlebæk |; pointfelter 1771 | / 1821 |; link /DBF/Turnering/VisResultater/#113413,.
- Benjamin Hinge Carlsson: dato 19-04-2026; turnering "Nordsjælland U13 A"; spillere Benjamin Hinge Carlsson | / Lauritz Bruun Gejpel , Frederiksberg |; pointfelter 1736 | / 1595 |; link /DBF/Turnering/VisResultater/#110036,.
- Benjamin Hinge Carlsson: dato 19-04-2026; turnering "Nordsjælland U13 A"; spillere Benjamin Hinge Carlsson | / Birk Lund Dujardin , Hørsholm |; pointfelter 1736 | / 1769 |; link /DBF/Turnering/VisResultater/#110036,.
- Louis Valdemar Hedegaard Toftlund: dato 14-06-2026; turnering "Taastrup BC U15 A"; spillere Louis Valdemar Hedegaard Toftlund | Ludvig Alexander Rosager Pedas , Gladsaxe Søborg | / Lucas Holm Madsen , Næstved-Herlufsholm | Casper Nielsen , Næstved-Herlufsholm |; pointfelter 1758 | 1714 / 1670 | 1544; link /DBF/Turnering/VisResultater/#114044,.
- Louis Valdemar Hedegaard Toftlund: dato 14-06-2026; turnering "Taastrup BC U15 A"; spillere Louis Valdemar Hedegaard Toftlund | Ludvig Alexander Rosager Pedas , Gladsaxe Søborg | / Frederik Thygesen Rasmussen , Dragør | Lucas Strikert Mikkelsen , Dragør |; pointfelter 1758 | 1714 / 1628 | 1718; link /DBF/Turnering/VisResultater/#114044,.
- Theodor Lumby Jessen: dato 14-06-2026; turnering "Taastrup BC U15 A"; spillere Theodor Lumby Jessen | / Einar Martensen , Holbæk |; pointfelter 1845 | / 1873 |; link /DBF/Turnering/VisResultater/#114044,.
- Theodor Lumby Jessen: dato 14-06-2026; turnering "Taastrup BC U15 A"; spillere Theodor Lumby Jessen | / Alexander Vedel Nielsen , Lyngby |; pointfelter 1845 | / 1968 |; link /DBF/Turnering/VisResultater/#114044,.
- Anna Rudolph: dato 17-05-2026; turnering "Farum U15 M Farum: Specielle tilmeldingsbetingelser"; spillere Anna Rudolph | / Afbud alle kategorier |; pointfelter 1781 | / 0 |; link /DBF/Turnering/VisResultater/#114741,.
- Anna Rudolph: dato 17-05-2026; turnering "Farum U15 M Farum: Specielle tilmeldingsbetingelser"; spillere Anna Rudolph | / Alberte Mollerup , Drive |; pointfelter 1781 | / 1720 |; link /DBF/Turnering/VisResultater/#114741,.

Klassifikation turnering/holdkamp er alene ud fra linkets offentlige sti (VisResultater eller HoldTurnering/Stilling), ikke ud fra navnefortolkning.

## 2. Hvilke begivenheder og pointændringer?

Begge linktyper forekommer i 2025/26-svarene: turneringslinks og holdkamp-/DMU-holdlinks. Alle fem eventtabeller har daterede poster inden for 2025/26 (se rå rækker og JSON). De gemte 154-links har sæson-ID 2025; om eventhistorikken medtager tidligere sæsoner kan ikke afgøres fra disse fem svar.
Tabellen viser Point-værdier ved eventrækker, men intet eksplicit før/efter- eller deltafelt. Nogle events gentager samme Point-værdi på flere spillerlinjer. Om pointændringen afregnes pr. kamp eller samlet pr. turnering: ukendt ud fra eventtabellen.

Fem konkrete, slå-op-venlige observationer (vist Point, ikke udledt ændring):
- Badminton Esbjerg U13 M; dato 24-05-2026; spiller Josefine Bille-Ahmt (329159); vist Point 1771 | / 1783 |; pointændring ukendt.
- Nordsjælland U13 A; dato 19-04-2026; spiller Benjamin Hinge Carlsson (330650); vist Point 1736 | / 1595 |; pointændring ukendt.
- Taastrup BC U15 A; dato 14-06-2026; spiller Louis Valdemar Hedegaard Toftlund (330770); vist Point 1758 | 1714 / 1670 | 1544; pointændring ukendt.
- Taastrup BC U15 A; dato 14-06-2026; spiller Theodor Lumby Jessen (327691); vist Point 1845 | / 1873 |; pointændring ukendt.
- Farum U15 M Farum: Specielle tilmeldingsbetingelser; dato 17-05-2026; spiller Anna Rudolph (328195); vist Point 1781 | / 0 |; pointændring ukendt.

## 3. Offentlig turneringsoversigt

Tidligere afprøvning (ikke gentaget): SearchTournamentClass gav HTTP 500 i tre prøver (region 1 og 8; sæson 2025 og 2026). GetTournamentEvents kræver et kendt tournamentclassid; for 115342 gav det fem event-ID’er 490920–490924. SearchTournamentMatches kræver tournamentclassid + tournamenteventid og gav kampresultater for det kendte event. Det dokumenterer resultatruter fra kendt ID, ikke en offentlig komplet oversigt over alle turneringer. Evidens: statistik/results/081-route-probe.json, 081-webservice-catalog-probe.json og tournament-reference-115342.md.

## 4. Nembadminton GraphQL

Ingen nye GraphQL-kald eller introspektion. De gemte API_RESEARCH/query-resultater viser tournamentGroups(seasonId, phaseType, order) og tournamentTiers(order): 2025 tournamentGroups-resultat tomt, tournamentTiers har 17 overordnede tier-navne. Ingen gemt offentlig query for individuelle turneringskampe/resultater; GraphQL kan derfor ikke dokumenteres som resultatrute.

## 5. Hvor findes turneringskampens vinder?

Det gemte SearchTournamentMatches-svar for event 490920 har bl.a. kamp 294: (1) Jannick John Galan Mogensen , Jernløse | (ID 283536) mod (3/4) Alexandre Gimenez (EU) , Hvidovre | (ID 355953), sætresultat 15/5,15/7. Række/fase vises særskilt (Finale i HTML-fragmentet). Spiller-ID’er findes i VisSpiller-links. Vinderen kan aflæses af sætscoren for en afsluttet kamp; W.O. forekommer også, og det gemte referenceudsnit fastslår ikke altid en vinder alene fra W.O.-markøren.

### Kaldlog for hele opgaveforløbet

| Nr. | Metode | Felter/parametre | Status | Bytes | SHA-256 (svar uden kontekstnøgle) |
|---:|---|---|---:|---:|---|
| 1 | GET | frisk callback-kontekst (HTML gemmes ikke) | ukendt: scriptet stoppede på botværnsdetektion før metadata blev skrevet til log |  |  |
| 2 | GET | frisk callback-kontekst (HTML gemmes ikke) | 200 | 21846 | b8ad91a1858115bf54a2870428d2214271b2deefda6c524bc842bc8e8080db39 |
| 3 | POST | eventtabel Theodor Lumby Jessen (327691): {"callbackcontextkey":"[REDACTED]","seasonid":2025,"playerid":327691,"rankinglistid":288,"rankinglistplayerid":8327268,"getplayerdata":true} | 200 | 49854 | 984f87a7d5bc6ab1c79ee09e7f5edc45ef1385c677b7b22ae5f387ed130f0f48 |
| 4 | POST | eventtabel Anna Rudolph (328195): {"callbackcontextkey":"[REDACTED]","seasonid":2025,"playerid":328195,"rankinglistid":288,"rankinglistplayerid":8328337,"getplayerdata":true} | 200 | 44020 | 4f8c823141637349fe1a2be3674e0326a6b1b41a55fb41e3737196fd8cd641f9 |

Det første stop i den tidligere kørsel kom fra den brede gamle regex. Det gamle svar blev ikke gemt; den nye GET viser matchen `CAPTCHA` i `RECAPTCHA_SITE_KEY`-identifikatoren, ikke en udfordringsside. Det er den dokumenterede forklaring på falsk alarm; den konkrete historiske respons kan ikke genskabes.

Tre eventtabeller blev genbrugt fra 154; to nye profiler blev hentet efter frisk GET. Kontekstnøglen blev ikke gemt, og råsvarene er gzip-komprimerede. Første forsøg er bevaret i samlet log som ét GET, men status/bytes/hash mangler, fordi det gamle script kastede fejlen før logskrivning.

## Databasehashes (SHA-256)

| Database | Før | Efter | Uændret |
|---|---|---|---|
| gsb-statistik-normalized.db | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E | ja |
| liga-landskab.db | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C | ja |
| rangliste-historik.db | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F | ja |
| national-spillere.db | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E | ja |
| rangliste-point.db | DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9 | DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9 | ja |

## Del B

Ikke kørt i denne omgang.

## Del C

Ikke kørt i denne omgang.
