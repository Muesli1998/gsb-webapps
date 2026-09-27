# Opgave 107 — følg hold der rykker op/ned mellem regionerne og DH via 105's strukturelle kanter

**Trin:** Videreudvikling (bygger på 089/092's tråd-matching, 101's regionsudvidelse for København,
105's nationale styrke-DAG med regionale strukturkanter).

**Baggrund:** Opgave 105 lagde de fem regioners (Kredsserie Vest, Sjælland, Lolland-Falster,
København, Bornholm) faste oprykningspladser til Danmarksserien ind som dokumenterede,
reglementscitérede strukturkanter i den nationale styrke-DAG. Christoffer har påpeget at dette
betyder, at man nu i PRINCIPPET kan følge konkrete HOLD der rykker op/ned over disse regionsgrænser
til/fra Danmarksserien — ikke kun at pladserne findes, men at et faktisk hold kan spores.

Dette er IKKE et nyt spor fra bar mark: 089/092 har allerede bygget automatiseret tråd-matching for
DH-hovedturneringen (Ligaen→Danmarksserien), og opgave 101 udvidede den til Københavns-regionen
specifikt, verificeret mod GSB's egne hold som facit. 107 er derfor en udvidelse af SAMME
tråd-matchings-maskineri til de fire ØVRIGE regioner (Sjælland, LF, Bornholm, Kredsserie Vest), nu at
105 har givet en dokumenteret bro til Danmarksserien for dem alle.

**Vigtig advarsel fra 087's eget fund:** automatiseret hold-identitet på tværs af sæsoner/niveauer er
i den brede population overvejende UBEKRÆFTET — 087 fandt at 1.310 af 1.353 undersøgte rækker
("new_or_returning") ikke havde noget spor af klubben på lavere niveauer med de tilgængelige metoder
(navnevariation, holdnummermønster, top-down anker). Der findes ingen officiel hold-ID-historik i
kilderne. Denne opgave skal derfor IKKE love eller foregive fuld sporing — den skal anvende 089/092/
101's samme, allerede validerede metoder på de fire nye regioner, og rapportere ærligt hvor mange hold
der faktisk kan følges vs. hvor mange der forbliver ubekræftede, ligesom 087 gjorde.

## Mål

1. **Udvid 089/092/101's tråd-matchingslogik til de fire regioner Sjælland, Lolland-Falster,
   Bornholm og Kredsserie Vest** (region_id 9, 10 (LF/Sjælland — bekræft præcise id'er mod 105's
   node-data), 3 (Bornholm), 4/5/6/7 (Vest)), efter samme mønster som 101 brugte for Københavns-
   regionen: en eksplicit, versioneret `(region_id, sæsoninterval, division_name_raw-familie)`-mapping
   til regionalt niveau — ikke en global funktion for alle regioner på én gang.
2. **Kobl de regionale niveauer til DH-hovedturneringens niveauer via 105's dokumenterede
   strukturkanter** (Danmarksserien ↔ regionens øverste niveau), så et hold der rykker mellem en
   regions øverste serie og Danmarksserien/3. division ikke fremstår som et brudt tråd — samme
   principielle kobling som 101 gjorde for København.
3. **Kør tråd-matchingen for hver regions egne hold, og rapportér separat pr. region**: hvor mange
   holdtråde over regionsgrænsen (region → Danmarksserien eller omvendt) er fundet med hvilken metode
   (A/B/C fra 087), og hvor mange forbliver ubekræftede/brudte. Ingen samlet "det virker"-konklusion —
   pr.-region-tal, ærligt.
4. **Vær særligt opmærksom på Lolland-Falster/Bornholms afvigende spilleform-familie** (10 vs. 13
   kategorier, jf. 086c/103/104/105): et hold der rykker fra LF-Serien eller Bornholmsserien til
   Danmarksserien skifter reelt spilleform-familie ved oprykningen. Tråd-matchingen skal kunne
   registrere denne overgang som en gyldig, dokumenteret regel-baseret overgang (den samme
   `strukturel_regeltekst_regional`-kant som 105 allerede har citeret) — IKKE som en fejlagtig
   familiekonflikt der afviser matchet, og heller ikke som en sportslig sammenligning af de to
   familier.
5. **Christoffer har eksplicit sagt at Bornholms konkrete historiske pladsbrug er UDENFOR scope her**
   (det hører til den udskudte "lokalhistorik"-opgave, noteret i `docs/idebank-statistik.md`
   2026-09-27) — denne opgave må gerne PÅVISE om et Bornholms-hold faktisk er sporet til
   Danmarksserien i databasen, men skal ikke bygge den dedikerede historiske analyse af hvor tit/
   hvornår pladsen er brugt. Det er en finpudset optælling til det senere kort.

## Afgrænsning

**Må røres:** en ny eller udvidet version af 089/092/101's generator-scripts (navngiv efter samme
mønster, fx `107-...mjs`, eller udvid eksisterende hvis mest naturligt — dokumentér valget), en ny
outputfil under `statistik/results/`.

**Må ikke røres:** `statistik/data/*.db` (kun læses — INGEN skrivning, dette er ren analyse), `104-
national-styrke-dag.json`, `105-national-styrke-dag.json` (læses, ændres ikke), `apps/netlify-prod/`,
`kampsystem/`, `klubstatistik-preview/`. Ingen kald til Nembadminton/badmintonplayer.dk's kamp-API'er.

## Kontekst

- `statistik/results/087-holdidentitet-paa-tvaers-af-saesoner.md`/`.json` — metode A/B/C og deres
  begrænsning; brug samme metoder, gentag ikke arbejdet fra bar mark.
- `work/loeste/101-koebenhavn-traadmatching-gsb-facit.md` og dens resultatnote/scripts — den allerede
  validerede regions-udvidelsesmetode for København; 107 er samme mønster for de fire andre regioner.
- `statistik/results/105-national-styrke-dag.json`, `105-regionale-oprykningspladser-og-
  reglementer.md` — de dokumenterede strukturkanter og region-id'er denne opgave kobler til.

## Kontrol

**Målet:**
```
Tråd-matching er udvidet til Sjælland, LF, Bornholm og Kredsserie Vest, efter 101's metode.
Resultatet er rapporteret PR. REGION, med antal fundne/ubekræftede holdtråde og hvilken metode
  (A/B/C) der fandt hver — ingen samlet, udifferentieret succesrate.
LF/Bornholms familieovergang ved oprykning håndteres som en gyldig regelbaseret overgang, ikke en
  fejl eller en sportslig sammenligning.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen skrivning til nogen database.
Ingen ny hold-identitet er postuleret uden en af 087's tre metoder eller en klar, dokumenteret
  begrundelse — "none"/ubekræftet er et gyldigt og forventet udfald, ikke en fejl der skal camoufleres.
```

**Skøn:** hvor stringent metode A's "top-down/anker uden hårdt oprykningsloft" skal anvendes på de nye
regioner (som kan have andre navnemønstre end København), er Codex' eget skøn — begrund kort i
Resultatnoten.

## Ved tvivl

Er et holds tråd tvivlsomt (flere kandidater, svag matchscore), mærk det som ubekræftet i stedet for
at gætte — præcis som 087's egen praksis. Er en regions data for tynd eller mærkelig til at sige noget
meningsfuldt (fx meget få hold, eller uklare region-id-grænser i 105's data), dokumentér det som et
begrænset/tomt fund for den region i stedet for at presse et resultat frem.

## Gren

`arbejde/107-holdtracking-over-regionsgraenser`, fra `main`.

---

## Spørgsmål

## Resultatnote

**Kontroloutput:** `node statistik/scripts/107-holdtracking-over-regionsgraenser.mjs` afsluttede med exit 0. Der er 717 unikke regionale grundspilsknuder efter deduplikering af Kredsserie Vests fælles puljer på tværs af region-id 4–7. 194 direkte nabosæson-overgange er entydige (metode A), fordelt på 81 regional→DH og 113 DH→regional. 207 rækker er flertydige eller alene metode-B/C-signaler; 429 regionale→DH-forsøg har ingen kandidat og er bevaret som ubekræftede. Regnskabet i JSON stemmer: A = 194 = `confirmed_transitions`; regionale ambiguity-tal summer til 207 = `ambiguity_reviews`.

| Region | Grundspilsknuder | Entydige A-fund | B-signal | C-signal | Flertydig/signal | Ubekræftet regional→DH |
|---|---:|---:|---:|---:|---:|---:|
| Sjælland (region 10) | 256 | 98 | 0 | 68 | 85 | 128 |
| Lolland-Falster (region 9) | 87 | 2 | 0 | 3 | 3 | 83 |
| Bornholm (region 3) | 22 | 0 | 0 | 0 | 0 | 22 |
| Kredsserie Vest (region 4, 5, 6, 7) | 352 | 94 | 0 | 93 | 119 | 196 |

**Hvad blev gjort:** Tilføjede `statistik/scripts/107-holdtracking-over-regionsgraenser.mjs` og rapporterne `statistik/results/107-holdtracking-over-regionsgraenser.md`/`.json`. Scriptet bruger fire eksplicitte, versionerede mappinger: Sjællandsserien 2011/12–2026/27, LF-Serien 2011/12–2026/27, Bornholmsserien 2011/12–2015/16 og Kredsserie Vest 2016/17–2026/27. Hver mapping verificeres mod 105's regionale strukturkant før analysen. Kredsserie Vest deduplikeres på sæson, pulje og hold, fordi de samme fælles puljer ligger under alle fire vestlige region-id'er.

Metode A er med vilje et strengt direkte grænseanker (samme normaliserede klubnavn og holdnummer i den næste sæson); den fulde 087-kaskade bruges ikke til at udfylde ukendte lokale led. Metode B og C er kun signaler til manuel gennemgang. Lolland-Falster og Bornholm må kun krydse spilleform-familie gennem 105's dokumenterede regionale regeltekstkant; der findes to entydige LF↔Danmarksserien-spor og ingen Bornholm-spor. Bornholms pladsbrug er ikke analyseret særskilt.

**Værn:** `liga-landskab.db` SHA-256 før/efter var uændret: `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`. `104-national-styrke-dag.json` og `105-national-styrke-dag.json` har ingen diff. `git status --short statistik/data/` viser kun den allerede eksisterende utrackede data-mappe; ingen tracked databasefil er ændret. Ingen API-kald blev foretaget.

**Hvad blev fravalgt og hvorfor:** Ingen ny identitet er postuleret for B/C-signaler eller tomme søgninger. Ingen lokalhistorik for Bornholms konkrete pladsbrug er bygget. Ingen database, DAG-kilde-JSON eller produktkode er ændret.

**Commits:** 2e4429b.
