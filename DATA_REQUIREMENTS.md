# Datakrav til GSB-statistiksystemet

## Bestyrelsens hovedkrav

- alle GSB-hold i sæsonerne 2010/2011–2026/2027
- alle holdkampe for hvert hold
- endelig stilling for hver pulje/gruppe
- eventuelle løbende stillinger, hvis kilden gemmer dem
- holdkampens samlede resultat og point
- alle individuelle kampe med spillere, kategori/rang og scores
- filtrering på sæson, hold, spiller, kategori, kampnummer, modstander, liga
  og pulje

## Ekstra funktioner der er relevante

- hjemme/ude og spillested
- kampens status: spillet, afbud, walkover, udsat eller ukendt
- holdets placering og point over tid
- modstanderhistorik
- spillerens holdtilknytning pr. sæson
- spillerens antal optrædener pr. kategori og rang (fx 1. mix, 2. mix)
- sejre/nederlag og score for både holdkampe og individuelle kampe
- sæson- og karriereoversigt for spillere
- datadækning: hvilke kampe/grupper der mangler detaljer
- kilde, hentetidspunkt og rå respons for hver post

## Mulige statistikmål fra sportsanalyse

Som senere udvidelser kan vi overveje styrkerating (Elo), modstanderstyrke og
strength of schedule, justeret sejrprocent, pointdifference/-ratio, form over
seneste kampe, win rate pr. kategori/rang, spiller-/par-kombinationer,
opstillingsfrekvens og bidrag til holdkampsejre. De bør først indføres, når de
rå kamp- og spillerdata er komplette nok til at bære dem.

Løbende stillinger skal kun gemmes, hvis de kan dokumenteres som historiske
stikprøver eller snapshots. En nutidig slutstilling må ikke fremstilles som en
løbende historik.

Dette er et arbejdsudkast til datakontrakten. Felter med `unknown` eller
`unverified` må ikke udfyldes ved gæt. Rå API- og BadmintonPlayer-værdier skal
gemmes, så alle beregninger kan spores tilbage til kilden.

## 1. Kampens identitet og kilder

- `match_id` – kampens ID fra discovery
- `season` – numerisk sæsonværdi som API'et returnerer
- `round_date` og `game_time` – begge gemmes, da de kan afvige
- `league_group_id`
- `age_group_id`
- `league_name_raw`
- `source_api_status` – `ok` eller konkret fejltekst
- `source_badmintonplayer_url`
- `source_badmintonplayer_status` – endnu ikke fastlagt

## 2. Hold og kampstatus

- `gsb_team_name_raw`
- `home_team_raw`
- `away_team_raw`
- `opponent_raw`
- `home_away_status` – kun udfyldt når det er valideret
- `match_result_raw` – eksempelvis `8-0` eller `12-0`
- `match_points_raw` – eksempelvis `2-0`
- `walkover_status` – `unknown`, `none`, eller dokumenteret walkover-status
- `walkover_text_raw`
- `organizer_raw`

Holdenes rækkefølge i GraphQL-arrayet gemmes som rådata. Den må ikke alene
bruges som bevis for hjemmehold/udehold.

## 3. Individuelle kampe

Hvis kilden indeholder detaljer, gemmes hver kamp separat:

- `discipline_raw` – MD, DD, HS, DS osv.
- `game_number_raw`
- `home_players_raw`
- `away_players_raw`
- `game_scores_raw`
- `winner_raw` – kun hvis vinder kan udledes sikkert af kildefelterne
- `players_source`

## 4. Klassifikationer

- `age_group_label_observed` – tekst vist af kilden, hvis den findes
- `league_region_classification` – eksempelvis DH/lokalserie, kun efter
  dokumenteret regel
- `league_tier_classification` – eksempelvis Liga/1. division, kun efter
  dokumenteret regel
- `classification_confidence` – `verified`, `unverified` eller `unknown`

## 5. Statistikker der kan beregnes senere

Disse skal ikke gemmes som eneste sandhed, men beregnes fra rådata:

- holdkampe, sejre, nederlag og uafgjorte
- point for og imod
- individuelle kampe, sejre og nederlag
- single/double-fordeling
- spilleroptrædener
- sæson-, hold-, aldersgruppe- og ligasammenligninger
- datadækning og fejlrater pr. sæson/gruppe

## Beslutninger der mangler

1. Skal systemet primært vise holdkamp-statistik, individuel spillerstatistik
   eller begge dele?
2. Skal walkovers tælle med i holdets officielle sejre/nederlag, eller vises
   de separat?
3. Skal historiske ligaer normaliseres til fælles kategorier, eller skal de
   kun gemmes med det rå liganavn?
4. Hvilke felter er minimumskrav for at en kamp må indgå i en statistik?
5. Skal spilleridentitet baseres på spiller-ID, navn eller begge dele?
# Genoptagelsesnote

Dette er et arbejdsudkast, ikke en fastlagt model. Før mere masseudtræk skal besluttes: holdstatistik kontra spillerstatistik, walkover-behandling, liganormalisering, minimumsfelter og spiller-ID-strategi. Gem altid rå kilde samt afledte felter.
