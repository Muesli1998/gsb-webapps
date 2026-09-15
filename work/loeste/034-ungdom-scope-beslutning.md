# Opgave 034 — skriv den eksplicitte ungdoms-scope-beslutning ind i planen

**Trin:** Beslutning (dokumentation), ikke kode

**Gren:** `opgave-034-ungdom-scope-beslutning`, jf. AGENTS.md ("Arbejde
udført af en agent kører på sin egen gren").

---

## Mål

Skriv en eksplicit, dateret beslutning om ungdoms scope ind i
`docs/statistik-plan.md` og `docs/BESLUTNINGER.md`, baseret på tallene fra
opgave 033 (`statistik/results/033-ungdom-scope-maaling.md`). Beslutningen
skal sige hvornår og hvordan ungdom går ind i planen — ikke bare at den
gør.

## Kontekst

Opgave 033 målte hvor meget ungdomsdata (U09/U11/U13/U15) der allerede
findes i `gsb-statistik-normalized.db`:

- 1.207 ungdomsholdkampe, 1.002 med individuelle rækker (83,02 % dækning).
- 205 uden individuelle rækker: 162 `browser_verified` (kræver særskilt
  klassifikation, ikke gjort i 033), 39 `browser_verified_no_result`, 4
  `api_error`.
- 17.114 spillerrelationer, kun 48,24 % med external ID.
- Intet uafhængigt Nembadminton-discovery-tal — vi ved ikke hvor mange
  ungdomskampe der findes hos kilden men ikke i databasen.
- Stillingskontrol kun mulig for 2 ungdomskonkurrencer (begge 2025).
- Sæson 2011 (82 kampe på tværs af U11/U13/U15) har 0 % individuel
  dækning — **bekræftet af Chris som en reel datamangel fra dengang, ikke
  en fejl i 033's måling eller i databasens season/age-mapping.**

`docs/statistik-plan.md` sagde før 033: "Ikke en del af dette trin: U15 og
yngre... Alt det er Videreudvikling." Chris har efterfølgende besluttet at
udvide scope til ungdom (se denne opgaves historik i `work/loeste/033-...`),
med den præcisering at den oprindelige afgrænsning skyldtes usikkerhed i de
tidlige tests, ikke en arkitektonisk beslutning om at holde ungdom ude.

## Chris' svar (2026-09-15)

1. **Rækkefølge: JA** — ungdom går ind i Test & Validation nu, sideløbende
   med Results-fasen for senior. Ikke udskudt til efter Preview/Prod Push.
2. **De 162 uklassificerede `browser_verified`-rækker: lukkes, ikke kun
   dokumenteres.** "Lad os lukke dem vi kan ved at lave opgaven. Det kan
   være vi finder noget der kan rettes." → udskilt som **opgave 035**
   (`work/aabne/035-ungdom-klassificer-manglende-individuelle.md`). Denne
   opgave (034) venter på 035's resultat før punkt 2 kan skrives ind i
   `statistik-plan.md`.
3. **Spiller-ID-kobling for ungdom: fuld audit, ikke stikprøve.** "Vi skal
   100% tjekke ungdom for at se om der er nogen specifik fejl i
   ungdomsstatistikker. Også om der er flere fejl når vi går længere
   tilbage i sæsonerne." → udskilt som **opgave 036**
   (`work/aabne/036-ungdom-navnematch-fuld-audit.md`). Denne opgave (034)
   venter på 036's resultat før punkt 3 kan skrives ind.
4. **Nembadminton-discovery-tallet: lukkes som dokumenteret begrænsning,
   ikke forsøgt.** Chris' vurdering: usikkert om det overhovedet kan
   hentes pålideligt, og Nembadminton er som kilde for begrænset til at et
   sådant tal ville være retvisende. Skrives ind som et kendt, accepteret
   åbent punkt — ingen ny hente-opgave oprettes for dette.

**Konsekvens: opgave 034 er blokeret på 035 og 036.** Punkt 1 og 4 kan
skrives ind i `docs/statistik-plan.md`/`docs/BESLUTNINGER.md` nu, men en
samlet, sammenhængende beslutningstekst bør vente til alle fire punkter
kan skrives færdigt på én gang — ellers skal dokumentet rettes to gange.
**Anbefaling: vent med at røre `docs/statistik-plan.md`/`BESLUTNINGER.md`
til 035 og 036 begge er i `work/loeste/`.** Hvis Chris hellere vil have
punkt 1 og 4 skrevet ind med det samme og punkt 2/3 eftersendt, skal det
siges eksplicit — gæt ikke, jf. AGENTS.md's arbejdsform.

## Afgrænsning

**Må røres, når svarene ovenfor foreligger:** `docs/statistik-plan.md`
(afsnittene "Ikke en del af dette trin", "Rækkefølge" og evt. et nyt
ungdomsafsnit efter samme skabelon som senior), `docs/BESLUTNINGER.md`
(ny, dateret post).

**Må ikke røres:** `statistik/data/*.db`, `statistik/results/033-...`,
`work/loeste/033-...` (historik, rettes ikke bagudrettet),
`docs/historik/`, Dropbox' `_arkiv\`.

## Kontrol

**Målet:** `docs/statistik-plan.md` og `docs/BESLUTNINGER.md` indeholder
efter opgaven en dateret beslutning om ungdoms placering i planen, med
henvisning til opgave 033's tal og til Chris' fire svar.

**Værnet:** ingen tal fra senior-afsnittet i `docs/statistik-plan.md`
("Hvor vi står") ændres. Opgave 033's resultatfiler ændres ikke.

**Resultatnoten skal angive hvad der faktisk blev skrevet og hvor** — ikke
en vurdering af om beslutningen er "rigtig".

## Resultatnote

Beslutningen er skrevet 2026-09-15 på grenen
`opgave-034-ungdom-scope-beslutning` i `docs/statistik-plan.md` og
`docs/BESLUTNINGER.md`.

- U09/U11/U13/U15 går ind i Test & Validation parallelt med senior Results.
- Opgave 033: 1.207 ungdomsholdkampe, 1.002 med individuelle rækker
  (83,02 %), 205 uden.
- Opgave 035: 115 eksplicitte afbud/udeblivelser, 46 uden kategorisektion
  eller afbud, 1 kategorisektion uden importerede rækker.
- Opgave 036: 8.859 navnematch-relationer, 0 normaliserede navnedubletter,
  0 samme-dato-fund med samme `league_raw`/`name_raw`; 0 % i alle
  sæsoner 2012–2025.
- Discovery-dækning og fuld ungdoms-stillingskontrol er dokumenterede
  begrænsninger, ikke antaget løst.

**Commits:** 0b15347
