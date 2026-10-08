# Opgave 156 — rang-feltet i liste 287 og back-test af ranglistepoint mod faktiske kampresultater (2025/26)

**Trin:** Bygger på 152–155. Næsten alt er offline. Formålet er at måle, om ranglistepoint forudsiger vinderen, og at forstå, hvad `rank` på liste 287 betyder, før vi bruger det.

## Baggrund
- `rangliste-point.db` har ca. 237.000 pointrækker og 6.844 behov for 271 GSB-ungdomskampe i 2025/26 (123 fuldt dækket, 136 delvist, 12 slet ikke; U09 mangler point).
- Liste 287 har ingen point, men en rang. På siden vises to placeringstal: første tal er den lokale placering i det aktive filter (fx klub), tallet i parentes er placeringen på den samlede liste. Delte placeringer forekommer (to gange 889). Det er ikke kendt, hvilket af tallene vores gemte `rank` er, og 152 viste, at rang i et `playerid`-svar ikke er den samme som på den fulde liste.
- Ingen forventet-vinder-beregning er lavet endnu.

## Del A — hvad betyder `rank` på liste 287? (højst 15 forespørgsler)
1. **Offline først.** Læs de gemte råsvar for 287 i `statistik/results/150-raa-svar/` og `151-raa-svar/`. Skriv alle felter i en række og hvilke af dem, der ligner et lokalt og et samlet placeringstal. Gæt ikke; skriv "ukendt", hvis det ikke kan afgøres.
2. **Online (højst 15 kald).** Kun `badmintonplayer.dk`, `GetRankingListPlayers`, liste 287, param `M`. Afklar:
   - GSB-filter (`clubid` 1093): hvilket felt har det lokale og hvilket har det samlede tal? Sammenlign med de otte første rækker på siden for SEN-spillere, som Christoffer kan slå op (billedet i samtalen viser fx lokal 1 / samlet 497).
   - Ufiltreret side 0: er `rank` det samlede tal, og er det identisk med GSB-rækkens samlede tal for samme spiller?
   - Version: giver et `playerid`-opslag på 287 den samlede rang eller den lokale? Bruger det en historisk version (`rankinglistversiondate`)?
   - Ungdom: findes U09, U11, U13 og U15 på 287 med rang? Et enkelt kald pr. aldersgruppe (`agegroupid`, én side).
   - Rækkefeltet (fx `SEN M-A`, `SEN A`): kan det ses i svaret? Gem hele rækken.
3. Skriv, om 287-rang kan bruges som styrkemål for spillere uden point, og hvilke aldersgrupper det gælder.

## Del B — back-test (offline, ingen kald)
Brug `gsb-statistik-normalized.db` (`individual_matches` og tilhørende tabeller for 2025/26 GSB-ungdom, 1.582 rækker på 254 kamp-ID'er), `national-spillere.db` (spiller-ID'er, `player_matches`) og `rangliste-point.db` (`ranking_points`, `ranking_needs`), alle readOnly. Opdag selv de faktiske tabel- og kolonnenavne og skriv dem i rapporten.

1. **Datasæt.** Lav ét datasæt pr. individuel kamp: dato, disciplin, aldersgruppe, vinder (hjemme/ude), og for hver side point pr. spiller fra den version, `ranking_needs` har valgt (strengt før kampdagen). Singler: ét punkt pr. side. Double: begge spilleres point (og sum, gennemsnit, laveste). Udelad kampe med `name:ikke fremmødt`/walkover, delt resultat eller manglende vinder, og tæl dem. Kampe, hvor en side mangler point, kommer ikke med, men tæl dem pr. årsag.
2. **Dækning.** Antal individuelle kampe i alt, antal med point på begge sider, andel pr. disciplin og aldersgruppe.
3. **Hitrate.** For kampe med point på begge sider: andel hvor siden med højest point vandt. Pr. disciplin (HS, DS, HD, DD, MD), pr. aldersgruppe (U11–U17/U19) og samlet. Ved ens point tælles kampen separat. Giv et 95 %-konfidensinterval pr. gruppe (Wilson), og skriv gruppestørrelsen. Små grupper skal ikke fortolkes.
4. **Kalibrering.** Fit en logistisk model `P(vinder) = 1 / (1 + 10^(-d/s))` hvor `d` er pointforskellen (for double: forskellen på de to sides sum eller gennemsnit; test begge og vælg ud fra Brier-score), og `s` er en skala pr. disciplin. Skriv `s`, Brier-score og log-loss for modellen mod en 50/50-baseline. Lav en kalibreringstabel i forskelsintervaller (fx 0–25, 25–50, 50–100, 100–200, 200+): antal kampe, forudsagt og faktisk andel.
5. **Tærskel.** For hvilken pointforskel er den bedste side vinder i mindst 70 %, 80 % og 90 % af kampene (hvis gruppen er stor nok)?
6. **Stikprøver.** 10 kampe, hvor den svageste side på point vandt, med navne, version og point, så Christoffer kan slå dem op (overraskelser).
7. **Følsomhed.** Kør hitrate og Brier også ved at bruge kun kampe med fuld dækning i `ranking_needs`, og ved at tælle 2025/26-sæsonen delt i første og anden halvdel. Er resultatet stabilt?
8. **Hvem er førende?** Er der en simpel, ærlig sammenligning, vi kan gøre med GSB's egen rating (Kampsystemets ELO), hvis spillernes ELO er tilgængelig i en af databaserne? Hvis ikke, skriv "ikke tilgængelig" og stop.

## Regler
- Alle databaser åbnes readOnly. Ingen skrivning til databaser. Ingen import.
- Netværk kun til Del A punkt 2: højst **15** forespørgsler, sekventielt, mindst 2,1 sekunder, backoff ved 429/5xx, stop ved 3 fejl i træk. Kun `badmintonplayer.dk`: GET `/DBF/Ranglister/` for kontekstnøglen og POST til `GetRankingListPlayers`. Ingen login, cookies, CAPTCHA eller samtykkeklik. Gem råsvar uden kontekstnøgle i `statistik/results/156-raa-svar/`.
- Gæt ikke på feltbetydninger eller på, hvem der er hjemme/ude. Skriv "ukendt" og gem evidensen.

## Output
- `statistik/scripts/156-backtest.mjs` (offline) og eventuelt `statistik/scripts/156-rang287.mjs` (netværk)
- `statistik/results/156-forventet-vinder.md` (Del A og B, tabeller, forespørgselslog)
- `statistik/results/156-forventet-vinder.json`
- `statistik/results/156-datasaet.csv` (ét datasæt pr. kamp, til senere brug)
- `statistik/results/156-raa-svar/`

## Kontrol
- **Målet:** Del A afklarer, hvad `rank` på 287 er, eller siger tydeligt, at det er uafklaret. Del B giver hitrate, kalibrering og dækning pr. disciplin og aldersgruppe, med antal og konfidensinterval.
- **Værnet:** Højst 15 forespørgsler (tallet står i loggen). Hashes uændrede: `gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E, `rangliste-point.db` DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9. `git diff --check` uden fejl.
- **Skøn:** Fem kampe fra datasættet, hvor Christoffer kan slå op, at begge spilleres point stemmer med den offentlige side på datoen, og at vinderen i datasættet er den rigtige.

## Afgrænsning
- Kun 2025/26 GSB-ungdomskampe. Ingen hentning af nye point, ingen andre sæsoner, ingen artifact.
- Ret ikke 136-parseren, 143–155-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/156-forventet-vinder`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive `156-raa-svar/`. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
