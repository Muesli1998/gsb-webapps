# Opgave 008 — identiske, lave scoretekster

Genereret fra den gemte API-payload og den aktuelle, **read-only** SQLite-fil.

## Afgrænsning fundet i rådata

Den historiske API-score-reparation havde præcis **7** unikke kamp/kategori-nøgler med én identisk lav score: fem 0-0, én 2-2 og én 3-3. De fem 0-0-nøgler overlapper nu fem af de otte efterfølgende browserimporterede `browser_zero_score`-rækker. Opgavekortets formulering om, at de syv *ikke* er de otte browser-rækker, passer derfor ikke med den bevarede rådata. Der er ikke opfundet fem ekstra rækker.

`Vinder W.O.` er kun en kolonneoverskrift. De rå markører er bevaret, men deres betydning er ikke fastslået, og der er ingen eksplicit `(Ikke fremmødt)`-tekst i disse syv kategoriudsnit. Derfor er ingen af dem kaldt walkover.

## De 7 oprindelige rækker

### Kamp 96518 — 3. HD

- Rå API-svar: `[{"homePoints":0,"guestPoints":0},{"homePoints":null,"guestPoints":null},{"homePoints":null,"guestPoints":null}]`
- Rå scoretekst: **0-0**
- Aktuel SQLite-række: id 12537; score `0-0`; markør `G`; status `browser_zero_score`
- Rå browsertekst fra `results\browser-fallback-complete\2013-96518.json`: `3. HD | Anders Knudsen | Andreas Larsen | Niels Banemann | Jonas Niebling | 0 - 0			G`
- Konklusion: **uafklaret: API- og browserkilden viser den identiske lave score og rå markør G, men ingen eksplicit forklaring på markøren eller `(Ikke fremmødt)`-tekst.**

### Kamp 98375 — 1. HD

- Rå API-svar: `[{"homePoints":0,"guestPoints":0},{"homePoints":null,"guestPoints":null},{"homePoints":null,"guestPoints":null}]`
- Rå scoretekst: **0-0**
- Aktuel SQLite-række: id 12745; score `0-0`; markør `G`; status `browser_zero_score`
- Rå browsertekst fra `results\browser-fallback-complete\2013-98375.json`: `1. HD | Torkil Clemmensen | Jonas Fioritto | Hans Møller | Jan Høst | 0 - 0			G | 2. HD`
- Konklusion: **uafklaret: API- og browserkilden viser den identiske lave score og rå markør G, men ingen eksplicit forklaring på markøren eller `(Ikke fremmødt)`-tekst.**

### Kamp 98375 — 5. HD

- Rå API-svar: `[{"homePoints":0,"guestPoints":0},{"homePoints":null,"guestPoints":null},{"homePoints":null,"guestPoints":null}]`
- Rå scoretekst: **0-0**
- Aktuel SQLite-række: id 12749; score `0-0`; markør `G`; status `browser_zero_score`
- Rå browsertekst fra `results\browser-fallback-complete\2013-98375.json`: `5. HD | Jonas Fioritto | Tommy Kjergaard | Jesper Norup Johansen | Per Jensen | 0 - 0			G | 6. HD`
- Konklusion: **uafklaret: API- og browserkilden viser den identiske lave score og rå markør G, men ingen eksplicit forklaring på markøren eller `(Ikke fremmødt)`-tekst.**

### Kamp 242764 — 1. HD

- Rå API-svar: `[{"homePoints":0,"guestPoints":0},{"homePoints":null,"guestPoints":null},{"homePoints":null,"guestPoints":null}]`
- Rå scoretekst: **0-0**
- Aktuel SQLite-række: id 9837; score `0-0`; markør `R`; status `browser_zero_score`
- Rå browsertekst fra `results\browser-fallback-complete\2016-242764.json`: `1. HD | Martin Roed | Claus Foss | Søren Nygaard | Gorm Wennerstrøm | 0 - 0			R | 2. HD`
- Konklusion: **uafklaret: API- og browserkilden viser den identiske lave score og rå markør R, men ingen eksplicit forklaring på markøren eller `(Ikke fremmødt)`-tekst.**

### Kamp 385773 — 1. DD

- Rå API-svar: `[{"homePoints":0,"guestPoints":0},{"homePoints":null,"guestPoints":null},{"homePoints":null,"guestPoints":null}]`
- Rå scoretekst: **0-0**
- Aktuel SQLite-række: id 5991; score `0-0`; markør `L`; status `browser_zero_score`
- Rå browsertekst fra `results\browser-fallback-complete\2020-385773.json`: `1. DD | Tina Kærgaard Wissing | Sine Vestergaard | Vilma Svensson Pedersen | Michelle Nielsen | 0 - 0			L | 2. DD`
- Konklusion: **uafklaret: API- og browserkilden viser den identiske lave score og rå markør L, men ingen eksplicit forklaring på markøren eller `(Ikke fremmødt)`-tekst.**

### Kamp 387834 — 4. HD

- Rå API-svar: `[{"homePoints":2,"guestPoints":2},{"homePoints":null,"guestPoints":null},{"homePoints":null,"guestPoints":null}]`
- Rå scoretekst: **2-2**
- Aktuel SQLite-række: id 6146; score `2-2`; markør `G`; status `api_repaired`
- Rå browsertekst fra `results\browser-fallback-complete\2020-387834.json`: `4. HD | Tue Abelskov | Bent Horn Andersen | Birger Steenberg | Harly Kampmann | 2 - 2			G | 5. HD`
- Konklusion: **uafklaret: API- og browserkilden viser den identiske lave score og rå markør G, men ingen eksplicit forklaring på markøren eller `(Ikke fremmødt)`-tekst.**

### Kamp 466228 — 2. DD

- Rå API-svar: `[{"homePoints":3,"guestPoints":3},{"homePoints":null,"guestPoints":null},{"homePoints":null,"guestPoints":null}]`
- Rå scoretekst: **3-3**
- Aktuel SQLite-række: id 2068; score `3-3`; markør `D`; status `api_repaired`
- Rå browsertekst fra `results\browser-fallback-complete\2024-466228.json`: `2. DD | Mille Rasmussen | Cecilie Hansen | Louise Kofoed | Marie Gotfred Johansen | 3 - 3			D | 1. HD`
- Konklusion: **uafklaret: API- og browserkilden viser den identiske lave score og rå markør D, men ingen eksplicit forklaring på markøren eller `(Ikke fremmødt)`-tekst.**

## Hvad der blev prøvet

- Genlæste den rå Nembadminton-payload `results/gsb-match-details-all-dedup.jsonl` og deduplikerede på kamp-ID + kategori.
- Sammenholdt hver nøgle med den aktuelle SQLite-række uden at skrive databasen.
- Slog efter på den lokalt gemte, renderede BadmintonPlayer-payload i alle tre fallback-mapper.
- Fortolkede ikke `Vinder W.O.` eller markørerne som walkover, fordi projektreglerne kræver eksplicit tekst.
