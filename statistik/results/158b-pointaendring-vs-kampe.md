# Opgave 158B — pointændring vs. kampe

**Status: delvist udført; stoppet ved checkpoint-fejl.** Sammenligningen før/efter, ugeklassifikation, falsk positive/negative og Del C er ikke beregnet.

## Udvalg og profilkontrol

| Spiller | Profil-ID | Liste/parameter | Køn | Aldersgruppe-ID’er i holdkampdata | Eventtabel |
|---|---:|---|---|---|---|
| Josefine Bille-Ahmt | 329159 | 288/K | kvinde | 3, 4 | 34 turnering, 6 holdkamp, 0 ukendt |
| Benjamin Hinge Carlsson | 330650 | 288/M | mand | 2, 3, 4, 5 | 24 turnering, 5 holdkamp, 0 ukendt |
| Louis Valdemar Hedegaard Toftlund | 330770 | 289/M | mand | 1, 3, 4, 5, 18 | 32 turnering, 12 holdkamp, 0 ukendt |
| Theodor Lumby Jessen | 327691 | 288/M | mand | 1, 3, 4, 5 | 47 turnering, 14 holdkamp, 0 ukendt |
| Anna Rudolph | 328195 | 288/K | kvinde | 2, 3, 4, 5 | 43 turnering, 11 holdkamp, 0 ukendt |
| Chastine Christiansen | 328196 | 288/K | kvinde | 5 | 0 turnering, 1 holdkamp, 0 ukendt |
| Sophia Rita Giuliani | 362606 | 288/K | kvinde | 5 | 0 turnering, 1 holdkamp, 0 ukendt |
| Guanyan Chen | 343986 | 288/M | mand | 5 | 50 turnering, 13 holdkamp, 0 ukendt |

15 nye eventprofilopslag gav to profiler med én holdkamprække, nul turneringsrækker og nul ukendte eventrækker (Chastine Christiansen og Sophia Rita Giuliani). Guanyan Chen havde både turnerings- og holdkamprækker. De fem Del A-profiler genbrugtes og havde begge typer. Udvalget dækker fire kvinder og fire mænd.

## Kalender og budget

Ugekalenderen blev læst fra 154’s gemte versionssvar 022–027 og krydstjekket mod 153 for 289/292. Der er 49 mandagsversioner pr. valgt liste/parameter. Planen var 392 ugeopslag; 180 blev gemt med HTTP 200, og 212 mangler. Del A brugte 4 kald. I denne kørsel er 202 kald registreret, og ét ekstra GET-svar (kald 207 samlet) blev gemt råt, men status nåede ikke loggen. Forsøg i alt: 207/480. Budgettet er fortsat tilstrækkeligt til genoptagelse.

## Ugeopslag indtil stop

| Spiller | Gemte ugeopslag | Første dato | Sidste dato |
|---|---:|---|---|
| Josefine Bille-Ahmt | 49 | 2025-07-21 | 2026-06-29 |
| Benjamin Hinge Carlsson | 49 | 2025-07-21 | 2026-06-29 |
| Louis Valdemar Hedegaard Toftlund | 49 | 2025-07-21 | 2026-06-29 |
| Theodor Lumby Jessen | 33 | 2025-07-21 | 2026-03-02 |
| Anna Rudolph | 0 | — | — |
| Chastine Christiansen | 0 | — | — |
| Sophia Rita Giuliani | 0 | — | — |
| Guanyan Chen | 0 | — | — |

Pointændring/event-sammenligning og falsk positive/negative er ikke kørt, fordi ugekalenderen er ufuldstændig. Ingen nulpoint er udledt for fravær.

## Databaseværn

| Database | SHA-256 før | SHA-256 efter |
|---|---|---|
| gsb-statistik-normalized.db | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E | 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E |
| liga-landskab.db | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C | 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C |
| rangliste-historik.db | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F | 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F |
| national-spillere.db | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E | 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E |
| rangliste-point.db | DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9 | DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9 |

Alle fem hashes er uændrede og svarer til de forventede værdier: true. Databaser åbnet readOnly og PRAGMA query_only=ON. git diff --check bestod.

## Forespørgselslog

For kald 1–4 se loggen i statistik/results/158-turneringer.json. De resterende registrerede kald og det ufuldstændige sidste GET ligger i JSON’en og statistik/results/158b-raa-svar/forespoergsler.json. Kald 207: svarbytes 21760, redigeret SHA-256 B8AD91A1858115BF54A2870428D2214271B2DEEFDA6C524BC842BC8E8080DB39; HTTP-status ukendt, fordi checkpointskrivningen fejlede.

## Spørgsmål / blokering

Node fejlede med UNKNOWN: unknown error, open .../158b-raa-svar/state.json under persist efter et kontekst-GET. Råsvar call-207.json.gz findes og indeholder redigeret SR_CallbackContext, men HTTP-status kunne ikke genskabes. Skal checkpointskrivningen gøres atomisk, hvorefter kørslen genoptages med de 212 manglende ugeopslag?
