# 118 — parkeret: designbeslutninger til en fremtidig national spiller-scraper

## Status

Parkeret idé, ikke en byggeopgave endnu. Besluttet i samtale mellem Christoffer og Claude
2026-09-27, som opfølgning på opgave 116 (national spiller-ID-mekanisme bekræftet:
`a[href*="/DBF/Spiller/VisSpiller/"]`, ID fra href-fragmentet, samme mønster som GSB's
egen `extract-individual-browser.mjs`).

## Designbeslutninger (aftalt, klar til brug når scraperen bygges)

1. **Spiller-ID og navn gemmes begge** — samme mønster som eksisterende
   `players.external_player_id` + `players.name_raw`/`name_normalized`. Ingen ny
   beslutning, bare bekræftet videreført.

2. **Køn afledes af kønnede disciplinkoder, ikke af navnet.** HS/HD → registreret som
   mand; DS/DD → registreret som kvinde. Mix (MD) alene afgør intet for den enkelte
   spiller. To eksplicitte statusser i stedet for et gæt:
   - **"ikke afklaret"**: spilleren har spillet officielle kampe, men aldrig en kønnet
     disciplin (kun S/D generisk, eller kun mix)
   - **"aldrig spillet"**: spiller-ID findes, men ingen registrerede kampe overhovedet
   Dette er langt mere pålideligt end navnebaseret kønsgæt (som en tidligere overvejelse i
   opgave 114 afviste at bruge uden videre).

3. **Yderligere felter der skal med, fordi de reelt findes på kampsiden** (bekræftet ved at
   læse den faktiske gemte side-tekst for kamp 2018-337416):
   - **Makkerkobling i double** — hvem spillede med hvem (samme mønster som GSB's
     `individual_match_players.pair_number`/`role`)
   - **Modstanderidentitet** — modstanderens spiller-ID/navn på samme måde
   - **Klub/hold på kamptidspunktet** — kan afvige fra spillerens nuværende klub ved
     senere klubskifte
   - **Sætresultater pr. disciplin** (fx "21-18, 14-21, 21-13"), ikke kun kampens
     samlede resultat — bekræftet til stede i den rå sidetekst
   - **Individuel walkover/udeblivelses-markør** pr. disciplin, ikke kun på holdkampniveau
     (i dag kun `team_matches.walkover_text_raw`)
   - **Runde/turneringskontext** for den enkelte kamp (kvalifikation/ordinær/finale) —
     delvist til stede via `group_type_katalog`, men ikke nødvendigvis koblet til den
     enkelte individuelle kamp i dag

4. **EKSPLICIT UDELUKKET: ranglistepoint pr. kamp.** `individual_match_players
   .points_at_match` findes som kolonne i det eksisterende GSB-skema, men er **0%
   udfyldt i hele datasættet (0 af 67.196 rækker)** — den blev aldrig faktisk hentet.
   Selve kampsiden (verificeret ved at læse den rå gemte tekst for kamp 2018-337416)
   indeholder INGEN individuelle ranglistepoint — kun "Point 2-1", som er holdets
   stillings-pointscore, ikke en spillers personlige ranglistepoint. Ranglistepoint findes
   formentlig under sidens separate "Rank-/Rækkelister"-sektion, som er en helt anden kilde
   og kræver sin egen undersøgelse — ikke noget der "følger med gratis" ved at hente
   kampsiden. Tages IKKE med i en fremtidig national scraper uden en selvstændig
   forundersøgelse af om og hvordan de kan hentes.

5. **Bekræftet ikke-mulig, uanset scraper-indsats**: intet historisk "navn på
   kamptidspunktet". Siden gemmer aldrig navnet statisk pr. kamp, kun spiller-ID'et, og
   viser altid spillerens NUVÆRENDE registrerede navn — bekræftet ved observation af egne
   gamle kampe (2014). En national scraper vil derfor aldrig kunne rekonstruere hvad en
   spiller hed dengang, kun hvem det var (via ID).

## Ved tvivl

Disse er designbeslutninger, ikke en implementeringsplan. Et opgavekort til selve byggeriet
skal skrives separat, når det besluttes at gå videre — det bør genbruge disse punkter som
udgangspunkt frem for at genforhandle dem.

## Gren

(ingen endnu — parkeret)
