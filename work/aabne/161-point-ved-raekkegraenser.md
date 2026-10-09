# Opgave 161 — hvor mange point svarer en rækkegrænse til? (voksne) og opslagstabel (ungdom)

**Trin:** Bygger på 156, 159 og 160. Mest hentning af kønslister på 287 og offline sammenkobling med `rangliste-point.db`. Ingen skrivning til databaser.

## Hvad vi ved
- **Voksenrækken er placeringen i den kønsspecifikke 287-liste** (159: herrer 577 af 577, damer 833 af 837). Grænserne er placeringer, ikke point. Herrer: E 1–40, E-M 41–200, M 201–400, M-A 401–700, A 701–2000, A-B 2001–2500, B 2501–3500, B-C 3501–4000, C 4001–5000, C-D 5001–6000, D 6001-. Damer: E 1–40, E-M 41–150, M 151–300, M-A 301–500, A 501–1000, A-B 1001–1200, B 1201–1700, B-C 1701–1900, C 1901–2400, C-D 2401–2600, D 2601-.
- **287 har ingen point-kolonne.** Tilmeldingsniveau er et vægtet gennemsnit over spillerens kategorier, og koefficienterne står ikke i reglementet. Vi kan derfor ikke regne et pointtal til en grænse. Vi kan måle, hvilke disciplinpoint spillerne omkring en grænse faktisk har (156 og 159 viste, at højeste disciplinpoint er den bedste enkeltstående proxy for ungdom).
- Kønsfilteret på 287 er feltet `gender` (K eller M) uden klubfilter, 100 rækker pr. side, første kolonne = placeringen i kønslisten. Sidetal: K 61, M 152. `param` alene virker ikke (kort 160).
- **Allerede hentet i 159** (råsvar i `statistik/results/159-raa-svar/`, version 09-10-2026): K side 0–5 og 9–11; M side 0, 2, 3, 4, 6, 7. Genbrug dem, hent dem ikke igen. Brug samme version for nye sider, hvis ikke den er skiftet (hvis versionsdatoen er ændret, så skriv det).
- Ungdomsrækker (reglementet 2026/27, opsummeret i `statistik/results/159-tilmeldingsniveau.md` og `160-ungdom-placeringsraekker.md`) er pointintervaller pr. køn og aldersgruppe, undtagen placeringsrækkerne i U13, U15 og U17.
- Point i `rangliste-point.db`: tabellen `ranking_points`, version 2026-10-07, lister 288/289/292 (single/double/mix), `param` M/K.

## Mål
1. **Hent manglende sider af kønslisterne** omkring hver voksengrænse: for hver grænse mellem placering N og N+1 skal siderne med placering N-30 til N+30 være hentet (grænser, der ligger over en sidegrænse, kræver to sider). Herrer: 40, 200, 400, 700, 2000, 2500, 3500, 4000, 5000, 6000. Damer: 40, 150, 300, 500, 1000, 1200, 1700, 1900, 2400, 2600. Genbrug de sider, 159 allerede har. Lav en liste over, hvilke sider der skal hentes, før første kald, og vis den i rapporten.
2. **Kobl til point.** Kobl hver spiller i vinduet til `ranking_points` via profil-ID. Skriv koblingsandelen pr. køn. Er den under 70 % i et vindue, så skriv det og vis hvilke profiler, der mangler, men gæt ikke. For hver spiller: point i single, double og mix (hvor de findes) og højeste disciplinpoint.
3. **Tabel pr. grænse og køn.** Pr. grænse N/N+1: antal spillere i vinduet N-30..N+30 med point, og for spillerne på hver side af grænsen (N-30..N og N+1..N+30) median, 25. og 75. percentil af højeste disciplinpoint, samt det samme pr. disciplin. Vis også pointtallet for præcis placering N og N+1. Fremhæv, hvor stor overlappet er mellem de to sider af grænsen (andel af spillerne på den lavere side, som har højere højeste point end medianen på den højere side).
4. **Besvar spørgsmålet "hvor mange point skal jeg have for at stå i række X?"** for hver række og køn som: placeringsinterval, og et pointområde (25.–75. percentil af højeste disciplinpoint for spillere på rækkens grænsepladser). Skriv tydeligt, at det er en empirisk tilnærmelse og ikke en formel, og hvor bred spredningen er. Lav også en version pr. disciplin ("single", "double", "mix").
5. **Ungdomsopslagstabel (offline, ingen kald).** Lav en tabel pr. køn og aldersgruppe (U9–U19) med rækker og pointinterval eller placeringsinterval fra reglementet 2026/27 som beskrevet i 159 og 160. Hvad der ikke står i de gemte rapporter, skal ikke gættes: skriv "ukendt" og peg på, hvad der mangler. Genhent ikke reglementet (ingen kald til `badminton.dk`).
6. **Dobbelt og mix.** Reglementet siger, at en doubles række sættes ud fra parrets point divideret med to. Udled af jeres data: hvad er "point til en rækkegrænse" i double og mix for et par (to spillere)? Skriv kun, hvad data og reglement understøtter.
7. **Anbefaling.** Er tabellen skarp nok til, at en spiller kan læse "jeg skal op på ca. X point for at nå M-A"? Hvad kræver det at gøre den skarpere (historiske versioner, koefficienter, flere sider)?

## Regler
- Alle databaser åbnes read-only (`mode=ro`, `PRAGMA query_only=ON`). Ingen skrivning, ingen import.
- Netværk: kun `badmintonplayer.dk`, højst **35 kald** i alt (inklusive friske GET af kontekstnøgle). Ingen kald til `badminton.dk`. Sekventielt, mindst 2,1 sekunder, backoff ved 429/5xx, stop ved 3 fejl i træk eller botværn. Ingen login, cookies, CAPTCHA eller samtykkeklik. Kontekstnøglen redigeres ud af alle gemte svar.
- **Efter de to første kald med forskellige filtre (K og M): sammenlign svarenes hash.** Er de ens, virker filteret ikke; stop og ret, før resten køres.
- Gæt ikke på formler eller koefficienter. Skriv "ukendt", hvor noget ikke kan afgøres.
- Starter din shell ikke (`setup refresh had errors`), så stop og skriv det i Spørgsmål, og søg ikke omveje (se `AGENTS.md`, afsnittet om Codex på Windows). Fejler `apply_patch`, brug metoden i samme afsnit.

## Output
- `statistik/scripts/161-point-ved-raekkegraenser.py` (eller `.mjs`)
- `statistik/results/161-point-ved-raekkegraenser.md` (punkt 1–7, tabeller, forespørgselslog med nr., felter ændret, status, bytes og svarhash)
- `statistik/results/161-point-ved-raekkegraenser.json`
- `statistik/results/161-opslagstabel.csv` (række, køn, interval, pointområde, kilde)
- `statistik/results/161-raa-svar/`

## Kontrol
- **Målet:** Punkt 1–7 besvaret. For hver af de 20 voksengrænser står antal spillere i vinduet, koblingsandel og pointområde. Ungdomstabellen dækker alle aldersgrupper, reglementet nævner, eller markerer dem som "ukendt".
- **Værnet:** Kaldtal (højst 35) i loggen med hash. Alle databasers SHA-256 uændrede: `gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C, `rangliste-historik.db` 6E9516DB643F88F88946A82CB76EC3B5C686C7D548ABF7084B3F60EE3DA0316F, `national-spillere.db` 1E27C5D81CCE8E2D656DF2C924E4BF6931EEAAF86348ADD384AB6D58F7CBAC3E, `rangliste-point.db` DABE3A12ACECD763E537087F0E16855AD39DF298234EB03FF111A3366100D1B9. `git diff --check` uden fejl. Ret ikke `statistik/data/`.
- **Skøn:** Tre konkrete spillere (navn, køn, placering, række, højeste point), som Christoffer kan slå op på den offentlige side, så tabellen kan efterprøves.

## Afgrænsning
- Kun aktuel version. Ingen historiske versioner, ingen bulkhentning ud over de angivne sider.
- Ret ikke 136-parseren, 143–160-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/161-point-ved-raekkegraenser`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer, inklusive `161-raa-svar/`. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
