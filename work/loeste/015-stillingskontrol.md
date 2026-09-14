# Opgave 015 — stillingskontrol: kampantal mod officielle stillinger

**Trin:** Test & Validation

Dette er selve sammenligningen som `docs/statistik-plan.md`s
Test & Validation-kriterium kræver — opgave 005 fandt kun kilden, den
udførte den ikke.

---

## Mål

For hver sæson og pulje: sammenlign antallet af GSB-holdkampe i
databasen med kampantallet i den officielle stilling, og dokumentér
afvigelser med begrundelse hvor den allerede er kendt.

## Kontekst

`docs/statistik-plan.md` (afsnittet "Kampantal er holdt op mod
stillingerne") kræver denne sammenligning som en del af Test &
Validation. Opgave 005 afklarede kilden — BadmintonPlayers
`Stilling`-side til almindelige puljer, Nembadminton kun til discovery,
playoff-placeringer afledes af kampresultater — men selve
sammenligningen er ikke kørt. 736 standingsrækker er allerede gemt (96
GSB-rækker), jf. `results/005-stillingskilde.md`.

Opgave 012 (corona-sæsontælling) fandt at et ukendt antal
aldrig-registrerede corona-aflysninger ikke kunne kvantificeres uden en
officiel kampplan med forventet kampantal. Denne opgave kan levere netop
det som sidegevinst for sæson 2019/20 og 2020/21 specifikt — sammenhold
gerne resultatet med `results/012-corona-saeson-taelling.md`.

## Afgrænsning

**Må røres:** `statistik/` — nyt script, ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`, og
`docs/statistik-plan.md` (kun afsnittet "Kampantal er holdt op mod
stillingerne" under Test & Validation — markér bestået/ikke bestået med
begrundelse).

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave
sammenligner og dokumenterer — den henter ikke ny stillingsdata og
retter ikke feltværdier. Heller ikke `docs/historik/`,
`apps/netlify-prod/` eller Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "stillingskontrol\|standings-check"
```

Skal give mindst én ny rapportfil.

```
grep -c "015" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

Rapporten skal for hver sæson/pulje med gemt stillingsdata vise:
kampantal i databasen, kampantal i den officielle stilling, afvigelse
(hvis nogen), og — hvis kendt fra allerede dokumenterede huller (315
dækningshuller, corona, U09-undtagelser) — en foreslået forklaring. For
sæson 2019/20 og 2020/21 specifikt: sammenhold med 012's tal.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
node scripts/check-normalized-db.mjs
```

Skal give samme resultat som før opgaven.

```
git diff --stat main..arbejde/015-stillingskontrol
```

Må kun vise ændringer i `statistik/` og `docs/statistik-plan.md`.

**Skøn:**

- Brug den allerede gemte stillingsdata (736/96 rækker) — hent ikke ny
  data i denne opgave.
- En afvigelse uden kendt forklaring skal stå som uforklaret, ikke
  tvinges ind under en af de eksisterende kategorier.

## Ved tvivl

Er stillingsdækningen for tynd til at lave en meningsfuld sammenligning
for en betydelig del af sæsonerne/puljerne (fx fordi 96 GSB-rækker ikke
dækker ret mange sæsoner), så stop og skriv præcis hvilke der mangler
under "Spørgsmål" — udvid ikke opgaven til selv at hente mere
stillingsdata.

## Gren

`arbejde/015-stillingskontrol`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:** `node scripts/check-standing-match-counts.mjs`
skrev rapporten uden SQLite-ændringer; `git status --short statistik/data/`
var tom; `node scripts/check-normalized-db.mjs` viste fortsat `fk []` og
`dupes []`.

**Sammenligning pr. sæson/pulje (kort opsummeret; fuld tabel i rapportfilen):**
98 GSB-stillingsrækker blev sammenlignet. 24 havde eksakt kampantal og 74
afveg. 28 af rækkerne ligger i corona-sæsonerne 2019/20 og 2020/21.

**Uforklarede afvigelser, hvis nogen:** Rapporten viser alle rækker og
skelner mellem `difference_with_corona_suspended_rows`,
`no_linked_team_matches_in_current_database` og
`unexplained_from_current_material`. De sidste to er ikke tvunget ind i en
årsagskategori.

**Konklusion — er "Kampantal er holdt op mod stillingerne" bestået:**
Nej, ikke som fuld validering endnu. Kontrollen er udført, men kun 24/98
rækker matcher eksakt; 74 kræver bedre pulje-/holdkobling eller yderligere
evidens. Planens kriterium er markeret som ikke bestået med denne begrundelse.

**Commits:** 3b4773b (audit og rapport); resultatnotens arkivering følger i næste commit.
