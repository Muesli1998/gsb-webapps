# Opgave 041 — tjek alle ungdomsspillere for dobbelt-importerede kampe (ikke kun navnematch)

**Trin:** Test & Validation (datakvalitet — afsluttende tjek efter 036/040)

**Gren:** `opgave-041-ungdom-dublet-import`, jf. AGENTS.md.

**Baggrund:** opgave 036 kørte "samme dato, samme konkurrence, flere
GSB-hold"-tjekket kun for de 8.859 ungdomsrelationer UDEN eksternt
BadmintonPlayer-ID (`external_player_id IS NULL`), fordi formålet dengang
var at afkræfte en identitetskollisionsrisiko (er navnet i virkeligheden
to forskellige mennesker?). Det er nu afkræftet: 0/8.859.

**Chris' spørgsmål (2026-09-15):** er det et problem at spillere MED
eksternt ID aldrig blev tjekket for samme mønster? Svar: identiteten er
sikker for dem, men mønsteret kunne stadig afsløre at den samme fysiske
kamp er importeret to gange under to forskellige holdopstillinger — en
statistik-forvridende dublet-fejl, ikke en identitetsfejl. Det er ikke
udelukket for de ID'ede ungdomsspillere endnu.

**Chris' svar:** "Ja tak" til at få det tjekket.

---

## Mål

1. Kør samme "samme dato, samme konkurrence (`league_raw`/`name_raw`),
   flere `gsb_team_id`"-gruppering som opgave 036 — men denne gang for
   ALLE ungdomsspillere (`age_group_id IN (2,3,4,5,6,18)`, altså inkl.
   U17/U19), uanset om de har `external_player_id` eller ej. Fjern
   `external_player_id IS NULL`-filteret fra 036's forespørgsel.
2. For hver fundet gruppe (samme spiller, samme dato, samme konkurrence,
   flere hold): afgør om det er (a) en reel dublet-import — samme
   `external_match_id`/kampdata gentaget under to forskellige
   `gsb_team_id`, eller (b) to genuint forskellige kampe samme dag i
   samme konkurrence (fx et gruppespil med flere runder samme dag), eller
   (c) fortsat normal multi-registrering på tværs af reelt forskellige
   rækker som viste sig at dele `league_raw`/`name_raw`-værdi af andre
   grunde. Brug `external_match_id` og evt. `round_date`/resultat-detaljer
   til at skelne (a) fra (b)/(c) — gæt ikke.
3. Tæl op: hvor mange grupper er (a), (b), (c). Hvis (a) findes: list de
   konkrete `external_match_id`-par og hvilke spillere/hold det påvirker,
   så det kan rettes i en opfølgende opgave — denne opgave retter ikke
   selv databasen.

## Kontekst

Dette er en udvidelse, ikke en gentagelse: 036's konklusion (0 kollisioner
for ID-løse spillere) ændres ikke af denne opgave. Formålet her er
udelukkende at lukke det sidste hul — dublet-importrisiko for ID'ede
ungdomsspillere — som 036 bevidst ikke dækkede, fordi det ikke var dens
formål dengang.

## Afgrænsning

**Må røres:** nyt script i `statistik/scripts/` (fx
`041-ungdom-dublet-import.mjs`),
`statistik/results/041-ungdom-dublet-import.md` (+ `.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning — denne opgave
finder og dokumenterer kandidater, den retter ikke dubletter). Opgave 036's
resultatfiler ændres ikke. `docs/statistik-plan.md`,
`docs/BESLUTNINGER.md` røres ikke, medmindre der findes reelle dubletter
der ændrer et af de fem T&V-kriterier — i så fald: stop og spørg, ret ikke
selv.

## Kontrol

**Målet:** et eksplicit tal for hver af de tre kategorier (a/b/c), og en
konkret liste hvis (a) > 0.

**Værnet:** ingen ændringer i databasen eller i 036/040's resultatfiler.

**Resultatnoten skal angive tal, ikke vurderinger.**

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
