# Opgave 124 — genberegn holdside, makker, modstander, sætresultater og W.O. fra den gemte kamptekst

## Baggrund

Opgave 119-121 byggede `statistik/data/national-spillere.db` (203.012 kampe, 76.169
spillere, 3,4 mio. `player_matches`-rækker). Designbeslutning 3 i opgave 118 og mål 1 i
opgave 119 krævede at disse felter kom med, men de blev aldrig udfyldt: i `player_matches`
er `team_side`, `partner_player_id`, `opponent_player_id`, `set_scores_raw` og
`walkover_raw` NULL i alle rækker (0 af 200.000 i en stikprøve; `round_raw` og
`discipline_code` er udfyldt). Scriptet `120-national-spiller-scraper.mjs` skriver `null`
til dem. Det er også derfor opgave 122 ikke kunne fordele spillerne på hold.

Den gemte kamptekst indeholder oplysningerne. `matches.context_raw` er sidens synlige tekst
(længde ca. 630-2.640 tegn i en stikprøve på 20.000 gengivne kampe, altså ikke afkortet af
10.000-grænsen). Eksempel, kamp 22818:

```
Kampnr	22818
Hjemmehold	Team Skælskør-Slagelse 1
Udehold	Ikast 1
Resultat	5-1
	Team Skælskør-Slagelse 1	Ikast 1	1	2	3	Vinder W.O.
1. MD	
Joachim Fischer
Britta Andersen
	
Henrik K. Hansen
Fiona McKee
	18 - 21	21 - 12	21 - 11	
1. DS	
Mette Poulsen
	
Kristina Gavnholt (EU)
	18 - 21	12 - 21		
```

Første navneblok efter disciplinlinjen er hjemmeholdet, anden blok udeholdet, derefter
sætresultaterne (hjemme - ude). Teksten har navne, ikke spiller-ID'er; ID'erne står i
`player_matches` (`external_match_id`, `external_player_id`, `name_raw`, `discipline_code`).
Der er altså formentlig ingen grund til at scrape igen.

## Mål

1. **Skriv parseren.** For hver kamp med `matches.render_gate = 1` og en `context_raw`:
   læs disciplinblokkene (`1. MD`, `1. DS`, `2. HS` osv.), del hver blok i hjemme- og
   udenavne, og udled:
   - `team_side` (`hjemme`/`ude`) pr. spiller og disciplin
   - makker (den anden spiller i samme navneblok, kun double)
   - modstander(e) (navneblokken på den anden side)
   - sætresultater som rå tekst (fx `18 - 21 | 21 - 12 | 21 - 11`) pr. disciplin
   - walkover/udeblivelse pr. disciplin, **kun** når der står eksplicit tekst (fx
     "(Ikke fremmødt)"). Kolonneoverskriften "Vinder W.O." er ikke evidens (jf.
     `statistik/AGENTS.md`, "Walkover kræver eksplicit tekst").
2. **Kobl navne til spiller-ID'er inden for kampen** via `player_matches` for samme
   `external_match_id` og `discipline_code`. Hvor koblingen ikke er entydig (samme navn to
   gange i kampen, navnesuffikser som `(EU)` / `(udl.)` der afviger fra `name_raw`, entiteter,
   ekstra mellemrum): gæt ikke. Gem rækken med status `uklar_navnekobling` og lad ID-felterne
   være tomme.
3. **Skriv til en NY tabel**, ikke ved at opdatere de 3,4 mio. eksisterende rækker:
   `player_match_extras` med nøgle (`external_match_id`, `external_player_id`,
   `discipline_code`, `slot`) og felterne ovenfor plus `parse_status`
   (`ok` / `uklar_navnekobling` / `kamptekst_mangler_blokke` / `afkortet`). Det er den
   eneste ændring i `national-spillere.db` som denne opgave må gøre; databasen er ikke i git
   og tog en hel nat at bygge, så eksisterende tabeller må ikke ændres. Gør kørslen
   genoptagelig (kamp-ID'er der allerede er parset springes over), og skriv i batches.
4. **Valider mod den eksisterende, verificerede GSB-database.** `gsb-statistik-normalized.db`
   har `individual_match_players` (`side`, `pair_number`, `role`) for GSB's egne kampe. For
   de kampe der findes i begge databaser (samme `external_match_id`): sammenlign din
   `team_side` og makkerkobling med GSB-databasens, og rapportér match-procent og alle
   afvigelser. Det er den vigtigste kontrol.
5. **Rapportér**: antal kampe parset, fordeling på `parse_status`, andel af
   `player_matches`-rækker der har fået `team_side`, og de hyppigste årsager til
   `uklar_navnekobling`/`kamptekst_mangler_blokke` med eksempler. Kendte huller (fx
   ældre kampe uden spillerlinks, jf. opgave 116 og de 38.397 `no_player_links`) skal stå
   som huller, ikke som fejl.

## Afgrænsning

- Ingen ny scraping af badmintonplayer.dk.
- Ingen ranglistepoint (stadig eksplicit udelukket, jf. opgave 118).
- Ændr ikke `players`, `matches`, `player_matches`, `scrape_progress` eller kønsstatus
  (opgave 121 er afsluttet). Kun den nye tabel.
- Rør ikke `gsb-statistik-normalized.db` eller `liga-landskab.db` (kun læsning).
- Genkør IKKE S4/D2-analysen fra opgave 122 i denne opgave; det er et opfølgende trin, når
  `team_side` findes.

## Kontekst

- `statistik/results/120-national-spiller-scraper.md` (driftslog) og
  `statistik/scripts/120-national-spiller-scraper.mjs` (`parsePage`, hvad der blev gemt)
- `statistik/results/122-s4d2-rest-afklaring.md` (hvorfor `team_side` mangler)
- `statistik/results/individual-browser/2018-337416.json` (eksempel på rå kampsidetekst
  med sætresultater)
- `statistik/AGENTS.md` (Evidens før fortolkning, Aldrig gæt, Walkover kræver eksplicit tekst)

## Kontrol

- GSB-sammenligningen fra Mål 4 er obligatorisk og rapporteres først.
- Stikprøve (20 kampe, spredt over sæsoner): tjek parserens hold, makkere og sætresultater
  mod den gemte tekst med øjnene, ikke kun mod koden.
- Bekræft at ingen eksisterende tabel er ændret (rækketal i `players`, `matches`,
  `player_matches`, `scrape_progress` før/efter) og at de to andre databaser har uændret hash.

## Ved tvivl

Spørg Christoffer hvis GSB-sammenligningen viser systematiske afvigelser (så er
hjemme/ude-antagelsen eller navnekoblingen forkert), eller hvis en betydelig andel af
kampene ikke lader sig parse fra den gemte tekst.

## Gren

`arbejde/124-genberegn-holdside-makkere-saetscores`

## Spørgsmål

(udfyldes hvis noget er uklart under arbejdet)

## Resultatnote

(udfyldes ved aflevering)
