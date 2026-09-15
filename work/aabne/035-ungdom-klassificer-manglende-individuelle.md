# Opgave 035 — klassificér de 162 ungdoms-holdkampe uden individuelle rækker

**Trin:** Test & Validation (ungdomsdelmængde)

**Gren:** `opgave-035-ungdom-klassificer-manglende`, jf. AGENTS.md.

**Besluttet af Chris 2026-09-15 (svar på opgave 034's spørgsmål 2):** "Lad
os lukke dem vi kan ved at lave opgaven. Det kan være vi finder noget der
kan rettes." — altså ikke bare dokumentere gabet, men faktisk undersøge om
noget af det er retteligt, samme ambition som senior-sporet havde.

---

## Mål

Klassificér de 162 ungdomsholdkampe med status `browser_verified` men uden
individuelle rækker (fundet i opgave 033, se
`statistik/results/033-ungdom-scope-maaling.md`), efter samme metode som
blev brugt for de tilsvarende 257 senior-payloads i opgave 013/021:

**Del A — klassificering af allerede gemt materiale (kan gøres nu, read-only):**
1. For hver af de 162: tjek den allerede gemte, renderede browsertekst
   (raw_payloads) for en kategorisektion, samme metode som
   `statistik/results/013-manglende-kategorisektioner.md`.
2. Del op i mindst: (a) eksplicit afbud/udeblivelse-tekst til stede, (b)
   ingen kategorisektion og intet eksplicit afbud, (c) andet (beskriv).
3. Brug en sæsonstratificeret stikprøve hvis 162 er for mange at læse
   enkeltvis manuelt, men kør selve SQL/tekst-tjekket på alle 162, ikke
   kun stikprøven — stikprøven i 013 var til den skriftlige gennemgang,
   ikke til selve klassificeringen.

**Del B — forsøg på frisk genindhentning (kun hvis Del A ikke lukker sagen):**
For de rækker i (b) hvor der hverken er kategorisektion eller eksplicit
afbud i det gemte materiale: dokumentér dem som kandidater til en frisk
hentning, men **forsøg ikke selv en ny Playwright-baseret masseindhentning**
— `docs/statistik-plan.md` dokumenterer at Playwright ikke passerer
render-gaten i en frisk kontekst, og at den validerede metode i stedet er
den indbyggede browser/CUA (se opgave 021's fremgangsmåde). Denne del af
opgaven afsluttes derfor med en liste af kandidat-kampe og en anbefaling —
den faktiske genindhentning er en opfølgende opgave, fordi den kræver en
browsersession, ikke kun git/scripts.

## Kontekst

Opgave 033 fandt at 205 af 1.207 ungdomsholdkampe mangler individuelle
rækker: 162 `browser_verified`, 39 `browser_verified_no_result`, 4
`api_error`. De to sidste er allerede selvforklarende (status'en beskriver
fraværet). De 162 er uklassificerede — parallelt til senior's oprindelige
315-gab, som blev delt i 257 (ingen kategorisektion) + 58 (kategori uden
score, heraf 57 med eksplicit no-play-tekst).

## Afgrænsning

**Må røres:** nyt script i `statistik/scripts/` (fx
`035-ungdom-klassificer-manglende.mjs`),
`statistik/results/035-ungdom-klassificer-manglende.md` (+ evt. `.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/*.db` (kun læsning — dette er
klassificering af eksisterende materiale, ikke en ny import).
`docs/statistik-plan.md`, `docs/BESLUTNINGER.md` (opgave 034 venter på
denne opgaves resultat, ikke omvendt). Ingen Playwright-masseindhentning
forsøges i denne opgave (se Del B ovenfor).

## Kontrol

**Målet:** alle 162 rækker har en klassifikation (kategori a/b/andet), med
antal i hver kategori.

**Værnet:** senior-tallene og de øvrige 1.045 ungdomsholdkampe (1.207 −
162) er uændrede. `statistik/data/*.db` er uændret.

**Resultatnoten skal angive tal, ikke vurderinger** — jf. AGENTS.md.

## Resultatnote

Alle 162 rækker er klassificeret 2026-09-15 på grenen
`opgave-035-ungdom-klassificer-manglende`:

| Klassifikation | Antal |
|---|---:|
| `explicit_forfeit_or_no_show` | 115 |
| `no_category_section_no_explicit_forfeit` | 46 |
| `category_section_present_without_imported_rows` | 1 |
| **I alt** | **162** |

De 46 uden kategori/afbud er dokumenteret som kandidater til Del B; ingen
frisk masseindhentning blev udført. Den fulde ID-liste og rå evidens ligger
i `statistik/results/035-ungdom-klassificer-manglende.json`.

**Commits:** afventer commit på denne gren.
