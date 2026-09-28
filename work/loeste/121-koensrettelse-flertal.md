# Opgave 121 — ret kønsafgørelse i national-spillere.db: flertal i stedet for "mand vinder"

## Baggrund

Opgave 120's kørsel afslørede en fejl i kønslogikken i `120-national-spiller-scraper.mjs`
(og samme mønster i `119-national-spiller-scraper.mjs`): ved konflikt mellem HS/HD (mand)
og DS/DD (kvinde) hos samme spiller-ID vinder "mand" altid, uanset hvor lidt bevis der er
for det. SQL'en er:

```
gender_status=CASE WHEN players.gender_status='mand' OR excluded.gender_status='mand'
  THEN 'mand' WHEN players.gender_status='kvinde' OR excluded.gender_status='kvinde'
  THEN 'kvinde' ELSE 'ikke afklaret' END
```

Det ramte i praksis **1.998 af 38.365 spillere** med kønnede koder (~5,2 %). Christoffer
forklarede årsagen: i ungdomsrækker bliver piger nogle gange brugt til at fylde op i
drengedouble, så en enkelt HD-kamp hos en pige med overvejende DS/DD-kampe har væltet
hele hendes klassifikation over i "mand".

Independent verificering (Claude, denne session) viste:
- **1.809** af de 1.998 modstridende har FLEST damekampe (piger der en sjælden gang har
  spillet drengedouble)
- **177** har det omvendte: overvejende mandekampe, men én enkelt DD-kamp
- **12** har præcis lige mange af hver

En simpel omvending af tie-break ("kvinde vinder" i stedet) ville bare flytte problemet
til de 177 i stedet for at løse det.

**Løsning aftalt med Christoffer**: brug et flertalskriterium i stedet for "første/sidste
vinder". ≥80 % af en spillers kønnede kampe (HS+HD vs. DS+DD) af ét køn slår køn fast.
Under 80 % begge veje: ny status i stedet for et gæt.

Genberegning på den eksisterende, allerede hentede kørsel gav:
- **23.277** afklaret "mand" (≥80 %)
- **15.025** afklaret "kvinde" (≥80 %)
- **63** i gråzonen (under 80 % begge veje) — ned fra 1.998 modstridende under den gamle
  regel

Et overfladisk navnetjek af stikprøven i 80-90 %-båndet (192 spillere) fandt ingen
åbenlyse fejlklassificeringer — grænsen på 80 % ser fornuftig ud.

Christoffer har manuelt gennemgået 62 af de 63 gråzone-tilfælde (via en interaktiv side)
og afgjort dem eksplicit. Den sidste (spiller-ID 234617, navn "Ukendt" i databasen) er
IKKE afgjort og skal forblive markeret som usikker/modstridende — undersøg gerne hvorfor
denne spiller ikke har noget navn registreret, det kan være en tegn på en fejlbehæftet
side.

## Mål

1. **Ret opdateringslogikken** i `120-national-spiller-scraper.mjs` (og evt.
   `119-national-spiller-scraper.mjs` hvis den også bruges/genbruges fremover) så
   `gender_status` for en spiller beregnes ud fra ALLE den spillers kendte kønnede
   kampe (HS+HD-tælling vs. DS+DD-tælling på tværs af `player_matches`), ikke ud fra
   "første/sidste opdatering vinder":
   - ≥80 % af de kønnede kampe er HS/HD → `mand`
   - ≥80 % af de kønnede kampe er DS/DD → `kvinde`
   - ingen af delene (dvs. under 80 % begge veje) → en NY, eksplicit status, fx
     `"modstridende data"` (vælg selv en klar betegnelse, men den skal semantisk betyde
     "vi har set begge køns kampe og kan ikke afgøre det", IKKE genbruge `"ikke afklaret"`,
     som stadig skal betyde "spillet kampe, men aldrig en kønnet disciplin" — de to
     tilstande skal kunne skelnes)
   - spillere UDEN nogen kønnede koder overhovedet beholder `"ikke afklaret"` som hidtil
   - `"aldrig spillet"` (spiller-ID uden nogen kampe) er upåvirket
2. **Genberegn `gender_status` for ALLE 76.169 eksisterende spillere** i
   `statistik/data/national-spillere.db` ud fra de data der allerede er hentet — INGEN ny
   scraping er nødvendig, kun en omregning ud fra `player_matches`.
3. **Anvend Christoffers 62 manuelle overstyringer** fra
   `statistik/results/121-koensrettelse/manuelle-overstyringer.csv` OVEN PÅ den
   flertalsberegnede værdi for de pågældende `external_player_id` — de overstyrer den
   automatiske 80 %-regel, uanset hvad den ville have givet.
4. **Spiller 234617** ("Ukendt") skal have status `"modstridende data"` (eller den
   valgte betegnelse) og IKKE gættes. Undersøg og nævn i resultatnoten hvorfor navnet
   mangler for denne spiller — er det en parsing-fejl, en tom side, eller noget andet?
5. Opdater `statistik/CHECK`-constrainten på `players.gender_status` (eller tilsvarende
   skemadefinition) så den nye status er en gyldig værdi.
6. Rapportér i resultatnoten: den nye fordeling (mand/kvinde/ikke afklaret/aldrig
   spillet/modstridende data), hvor mange der ændrede status i forhold til før
   rettelsen, og bekræft at de 62 manuelle overstyringer er anvendt korrekt (stikprøvevis
   opslag på et par af dem).

## Afgrænsning

- INGEN ny scraping af badmintonplayer.dk i denne opgave — alt data findes allerede i
  `national-spillere.db` fra opgave 120.
- Rør IKKE `gsb-statistik-normalized.db` eller `liga-landskab.db`.
- Ret IKKE selve `matches`/`player_matches`-tabellernes indhold (discipline_code osv.) —
  kun `players.gender_status`.
- Gæt IKKE på spiller 234617's køn — den forbliver eksplicit usikker.

## Kontekst

- `statistik/scripts/120-national-spiller-scraper.mjs` — indeholder den fejlbehæftede
  opdateringslogik (linje ca. 121 i den oprindelige version)
- `statistik/data/national-spillere.db` — databasen der skal genberegnes
- `statistik/results/121-koensrettelse/manuelle-overstyringer.csv` — Christoffers 62
  manuelle afgørelser (spiller-ID, køn), skal have forrang over den automatiske regel
- `statistik/results/120-national-spiller-scraper.md` — driftslog for kørslen der
  producerede dataene

## Kontrol

- Bekræft optælling: mand + kvinde + ikke afklaret + aldrig spillet + modstridende data
  = 76.169 (det totale antal spillere).
- Stikprøvevis (5-10) tjek af navne mod ny status — bør fortsat virke fornuftigt
  (samme type navnetjek som blev lavet i denne samtale for 80-90 %-båndet).
- Bekræft at alle 62 rækker fra `manuelle-overstyringer.csv` reelt har fået den angivne
  status i databasen efter kørslen, og at 234617 har fået "modstridende data" (ikke en
  gættet værdi).
- Bekræft at `gsb-statistik-normalized.db` og `liga-landskab.db` fortsat er uændrede.

## Ved tvivl

Spørg Christoffer hvis navnet på den valgte nye status ("modstridende data" el. lign.)
skal være noget andet, eller hvis flertalstærsklen (80 %) af en eller anden grund ikke kan
anvendes konsistent på alle spillere (fx pga. manglende discipline_code-data for nogle
rækker).

## Gren

`arbejde/121-koensrettelse-flertal`

## Spørgsmål

(udfyldes hvis noget er uklart under arbejdet)

## Resultatnote

- Datagrundlag: eksisterende `statistik/data/national-spillere.db`; ingen scraping og ingen ændring af `gsb-statistik-normalized.db` eller `liga-landskab.db`.
- 76.169 spillere blev genberegnet. Automatisk 80%-fordeling: 23.277 `mand`, 15.025 `kvinde`, 37.804 `ikke afklaret`, 63 `modstridende data`, 0 `aldrig spillet`. 1.169 eksisterende statusværdier ændrede sig før manuelle overrides.
- Efter alle 62 overrides: 23.283 `mand`, 15.081 `kvinde`, 37.804 `ikke afklaret`, 1 `modstridende data`, 0 `aldrig spillet`; summen er 76.169. Alle 62 CSV-rækker blev anvendt, ingen ID'er manglede.
- Spiller 234617 er fortsat `Ukendt` og står eksplicit som `modstridende data`. Databasen har kun navnet `Ukendt` for spilleren (35 relationer fordelt på 17 kamp-ID'er); årsagen kan ikke afgøres uden ny scraping.
- CHECK-constrainten i players er udvidet med `modstridende data`. 120-scriptets fremtidige upsert beregner nu status fra alle gemte HS/HD- og DS/DD-koder med 80%-regel.
- Kontrol: 15896 Sofie Robdrup endte som `kvinde`, 289635 Lukas Skov Hansen som `mand`; de beskyttede databaser havde hash før/efter uændret.
- Nye reproducerbare filer: `statistik/scripts/121-recalculate-gender.mjs`, `statistik/results/121-koensrettelse/recalculation.md` og `.json`.

### Kontroloutput

- Før: 24.424 mand / 13.941 kvinde / 37.804 ikke afklaret.
- Efter automatisk regel: 23.277 / 15.025 / 37.804 / 63 modstridende.
- Endelig: 23.283 / 15.081 / 37.804 / 1 / 0 aldrig spillet = 76.169.
- 62/62 overrides verificeret; 234617 = `modstridende data`.

### Commits

- Branch: `arbejde/121-koensrettelse-flertal` (commit udfyldes efter aflevering).
