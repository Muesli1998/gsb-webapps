# Opgave 036 — fuld audit af ungdoms navnematch-risiko (alle spillere, alle sæsoner)

**Trin:** Test & Validation (ungdomsdelmængde)

**Gren:** `opgave-036-ungdom-navnematch-fuld-audit`, jf. AGENTS.md.

**Besluttet af Chris 2026-09-15 (svar på opgave 034's spørgsmål 3):** "Vi
skal 100% tjekke ungdom for at se om der er nogen specifik fejl i
ungdomsstatistikker. Også om der er flere fejl når vi går længere tilbage
i sæsonerne." — altså ikke en stikprøve af de mest aktive (som opgave 032
gjorde for senior), men hele populationen af ungdoms-navnematch-relationer,
og en eksplicit sæson-stratificeret sammenligning af fejlrate over tid.

---

## Mål

Kør samme type undersøgelse som opgave 032 (runde 1-3), men:

1. **På 100 % af ungdommens navnematch-relationer** (spillere uden
   `external_player_id` i ungdomsrækker, jf. opgave 033's tal: 8.859 af
   17.114 relationer uden external ID) — ikke kun de 25 mest aktive.
2. **Runde 1-metoden:** SQL-tjek for dubletter på `players.name_normalized`
   blandt ungdommens navnematch-spillere.
3. **Runde 2/3-metoden, fra start med rækketype:** "samme dato, to hold"-
   tjekket SKAL inkludere `competitions.league_raw`/`name_raw` fra første
   forsøg — brug ikke runde 2's metode fra opgave 032 uden rækketype, da
   den gav 7 falske positive i senior-stikprøven. Byg videre på
   `statistik/results/032-spiller-navnematch-risiko.md`s allerede
   validerede tilgang.
4. **Sæsonstratificeret fejlrate:** del resultatet op pr. sæson (eller
   sæsongruppe, fx 2011-2015 / 2016-2020 / 2021-2025) og sammenlign
   andelen af mistænkte/uafklarede tilfælde. Målet er at svare konkret på
   om ældre sæsoner har en højere fejl-/uklarhedsrate end nyere — ikke en
   fornemmelse, et tal pr. periode.

## Kontekst

Opgave 032 stikprøvede kun senior's 25 mest aktive navnematch-spillere (som
det viste sig, ramte ind i ungdomsrækker for flere af dem) og fandt 0
bekræftede kollisioner efter rækketype blev tilføjet. Det er ikke en
ungdoms-audit — det er en delvis, tilfældig berøring af ungdom via en
senior-fokuseret stikprøve. Opgave 033 viste at ungdom har en markant
større unavdited pulje: 8.859 relationer uden external ID (51,76 %), mod
9.926 af 67.196 for hele klubben (14,8 %) i opgave 016's audit — ungdoms
navnematch-andel er proportionelt større.

**Vigtigt om ældre sæsoner:** opgave 013's stikprøve viste allerede at
2011-materialet generelt mangler kategorisektioner i højere grad end nyere
sæsoner (flere af de 20 stikprøvede "ingen kategorisektion"-kampe lå i
2011-2014). Chris har bekræftet at sæson 2011's 0 %-individuel-dækning
(fundet i opgave 033) er en reel, kendt datamangel — ikke en fejl i
033's måling. Denne opgave undersøger om samme mønster (dårligere data
længere tilbage) også gælder navnematch-kvaliteten, ikke kun
individuel-dækningen.

## Afgrænsning

**Må røres:** nyt script i `statistik/scripts/` (fx
`036-ungdom-navnematch-fuld-audit.mjs`),
`statistik/results/036-ungdom-navnematch-fuld-audit.md` (+ `.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning). Senior-delen af
navnematch-materialet (opgave 016/032's resultater) ændres ikke.
`docs/statistik-plan.md`, `docs/BESLUTNINGER.md` (opgave 034 venter på
denne opgaves resultat).

## Kontrol

**Målet:** et tal for andel mistænkte/uafklarede navnematch-tilfælde ud af
ALLE 8.859 ungdoms-navnematch-relationer (ikke en stikprøve), plus samme
tal brudt ned pr. sæsonperiode.

**Værnet:** senior-navnematch-resultaterne (opgave 016, 032) og
`statistik/data/*.db` er uændrede.

**Resultatnoten skal angive tal, ikke vurderinger** — jf. AGENTS.md. Hvis
noget forbliver genuint uafklaret (som de 21 stillings-afvigelser for
senior), skal det stå som et dokumenteret, optalt "ved ikke", ikke gættes
væk.

## Resultatnote

Kørt 2026-09-15 på `opgave-036-ungdom-navnematch-fuld-audit`.

| Måling | Antal |
|---|---:|
| Navnematch-relationer | 8.859 |
| Distinkte spillere | 2.256 |
| Dubletter på `name_normalized` | 0 |
| Samme dato + samme `league_raw`/`name_raw` på flere GSB-hold | 0 grupper |
| Spillere med signalet | 0 |

Sæsonraten er 0 % for alle sæsoner med relationer (2012–2025). Sæson 2011
har ingen ungdoms-navnematch-relationer. Fuld tabel og rå evidens ligger i
`statistik/results/036-ungdom-navnematch-fuld-audit.md` og `.json`.

**Commits:** afventer commit på denne gren.
