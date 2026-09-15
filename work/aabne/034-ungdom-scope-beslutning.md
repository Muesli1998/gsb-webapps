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

## Beslutning som Chris skal tage (kan ikke gættes af den der løser opgaven)

Denne opgave er selve nedskrivningen af en beslutning — ikke at tage den.
Før `docs/statistik-plan.md` og `docs/BESLUTNINGER.md` rettes, skal Chris
have svaret på:

1. **Rækkefølge:** går ungdom ind i Test & Validation nu, sideløbende med
   Results-fasen for senior (`Rækkefølge`-punkt 6 i `statistik-plan.md`),
   eller venter ungdom til efter Preview/Prod Push for senior?
2. **Hvor meget skal være på plads før Results/Preview kan vise ungdom:**
   er 83 % individuel dækning nok til at gå videre, eller skal de 162
   uklassificerede `browser_verified`-rækker klassificeres først (samme
   type arbejde som opgave 006 gjorde for senior)?
3. **Spiller-ID-kobling for ungdom:** kun 48,24 % har external ID (mod
   85,2 % for senior efter opgave 016). Skal dette lukkes før ungdom vises
   i en brugerflade, eller er det som for senior "forebyggende arbejde for
   Results, ikke en blokering"?
4. **Nembadminton-discovery-tallet:** skal der køres en ny opgave der
   henter det uafhængige forventningstal (hvor mange ungdomskampe findes
   hos kilden), før scope-beslutningen skrives endeligt, eller skrives
   beslutningen med dette som et kendt, åbent punkt?

**Stop og skriv Chris' svar ind i dette afsnit, som fire nummererede svar,
før `docs/statistik-plan.md` eller `docs/BESLUTNINGER.md` røres.** Gæt
ikke — jf. AGENTS.md's arbejdsform for uddelegerede opgaver.

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

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
