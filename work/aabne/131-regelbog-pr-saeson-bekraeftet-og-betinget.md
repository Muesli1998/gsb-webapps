# Opgave 131 — regelbog pr. sæson: bekræftet, betinget eller ingen

**Trin:** Bygger på 130 (reglementsarkivet, 53 PDF'er). Fundament for rækkenavne-/niveau-gennemgangen og for artifacten. Ved tvivl: skriv i "Spørgsmål", gæt ikke.

## Baggrund
Vi har reglementer for nogle sæsoner, ikke alle. Christoffer har besluttet denne regel:

- **Bekræftet:** sæsonen har en fil, som selv angiver, at den gælder for sæsonen. Filen er regelbogen.
- **Betinget:** sæsonen har ingen fil. Så bruges den nyeste tidligere fil for samme målgruppe og område som regelbog, men mærket "betinget", så ingen læser den som bekræftet. Eksempel: ingen ungdomsfil for 2017/18, men en for 2016/17 → 2016/17-filen er betinget regelbog for 2017/18.
- **Ingen regelbog:** findes ingen tidligere fil, arves der ikke bagud. Der står "ingen", ikke et gæt.

Denne regel afløser linjen i `mangler.md` og i 130-kortets afgrænsning om, at sæsoner uden kilde ikke må få regler arvet fra nabosæsonen. Ret `mangler.md` til den nye regel; ret ikke 130-kortets tekst (afsluttet historik), men skriv i resultatnoten her, at reglen er afløst.

## Mål
Byg i repoet:

1. **`statistik/kilder/reglementer/regelbog-pr-saeson.json`** (maskinlæsbar) og **`regelbog-pr-saeson.md`** (kort oversigtstabel). For hver kombination af **sæson** (2010/11-2026/27) × **målgruppe** (ungdom, senior, veteran) × **område** vises:
   - `status`: `bekraeftet`, `betinget` eller `ingen`.
   - `kilde`: filens id i `register.json`, den sæson filen selv angiver, dokumentdato og sidetal der hvor sæsonen/gyldigheden står.
   - `afstand_saesoner`: antal sæsoner mellem den betingede sæson og kildefilens sæson (0 ved bekræftet).
   - `svag`: `true` hvis afstanden er 3 sæsoner eller mere.
   - `kilde_saeson_fastlagt`: `true` hvis filen selv angiver sæsonen; `false` hvis sæsonen er udledt (se punkt 2).
   - `versioner`: hvis der findes flere udgaver i samme sæson (fx 2024/25 første udgave og martsrevision; 2025/26 original og revision 8. oktober 2025), list hver med `gyldig_fra`/`gyldig_til` (dato, eller `null` hvis kilden ikke angiver den) og angiv, hvilken der gælder for kampe før og efter revisionen.
   - `kilde_kommentar`: kort tekst, fx hvilken regel der er brugt, og hvorfor.
2. **Områder.** Ungdom har to lag, og begge vises: **national** (Badminton Danmark + DGI fælles reglement; gælder som udgangspunkt for alle) og **regional/lokal** (fx Badminton København, Badminton Sjælland, DGI-landsdelene, Nordjylland, Fyn m.fl., hvor lokale tillæg findes). Senior og veteran: det nationale DH-/seniorreglement og de regionale. Brug områdenavnene fra `register.json`; nævn, hvis to områder deler samme fil. Giv GSB's område (Badminton København, ungdom) en tydelig række i `.md`-oversigten.
3. **Opslagsscript.** `statistik/scripts/slaa-op-regelbog.mjs` (eller et script i samme sprog som resten af `statistik/scripts/`), der givet sæson, målgruppe og område returnerer posten fra JSON'en. Må ikke læse databaser.
4. **Dækningsrapport.** `131-regelbog-daekning.md`: antal felter pr. status (bekræftet/betinget/ingen), pr. målgruppe og pr. sæson, antal "svage", og en liste over de felter, hvor der kun findes en kilde uden fastlagt sæson.
5. **Opdatér `mangler.md`** så reglen om nabosæsoner afløses af den nye regel, og så dækningstabellen peger på `regelbog-pr-saeson.md`.

## Præciseringer (aftalt med Christoffer)
- **Filer uden angivet sæson** (fx "revideret 1. august 2018", dokumenter dateret men uden sæson, SBKr-dokumenter uden sæson) tæller **aldrig som bekræftet**. De må bruges som betinget kilde. Placér dem på den sæson, som dokumentdatoen peger på (1. juli år Y til 30. juni år Y+1 → sæson Y/Y+1) og sæt `kilde_saeson_fastlagt: false` og `kilde_kommentar: "sæson ikke fastlagt i kilden, udledt af dokumentdato"`. Dokumenter helt uden dato eller sæson placeres ikke; list dem i en egen liste `ikke_placeret` i JSON og i dækningsrapporten.
- **Revisioner midt i en sæson** håndteres med `versioner` (se mål 1).
- **Afstand** vises altid, og 3+ sæsoner markeres `svag`.
- **Ingen arv bagud.** Før den ældste fil for et målgruppe/område-par står der `ingen`.
- **Hver kæde er sin egen.** Ungdom-national, ungdom-København, senior-Nordjylland osv. er separate kæder. En ungdomsfil arves aldrig til senior eller omvendt, og en region arver aldrig fra en anden region. Er en regional fil kun et tillæg til det nationale reglement, så vis både det nationale lag og tillægget.
- **Pointskalaer og niveautal arves IKKE (besluttet af Christoffer 2026-10-05, valg A i kort 137).** Skalaer ændres mellem versioner (U13 4 spillere havde fire forskellige skalaer mellem 2024/25 og 2026/27, og én blev ændret midt i 2025/26). Regelbogen peger kun på, hvilken *fil* der er kilden; den beregner ingen niveautal og oversætter intet tal til et bogstav. Skriv i alle poster `pointskala_arv: "ingen"`. Er posten bekræftet og filen selv indeholder en skala, må du angive, at filen har en skala, men du må ikke kopiere tallene ind i regelbogen. Rør ikke 127-, 129- eller andre afsluttede resultatfiler.

## Kontrol
- Stikprøve af mindst **15 felter** (mindst 3 bekræftede, 6 betingede, 3 `ingen` og 3 svage) mod `register.json` og PDF'ens egne sæsonangivelser: er sæsonen i kilden den samme som i regelbogen, og er afstanden rigtigt talt?
- Særlige tests, som skal stå i dækningsrapporten:
  1. Ungdom national 2017/18 → betinget, kilde 2016/17 (afstand 1).
  2. Ungdom national 2010/11 → `ingen`.
  3. Ungdom København 2021/22 → afgør efter registeret (bekræftet/betinget/ingen), og forklar hvorfor.
  4. Ungdom national 2025/26 → bekræftet, to versioner med dato for revisionen 8. oktober 2025.
  5. Ungdom national 2023/24 → bekræftet (fællesreglement + DMU-tillæg som egen post).
- Hver fil, regelbogen peger på, findes i `register.json` med URL, hentedato og SHA-256. Ingen kilde uden register-post.
- Databasehashes uændrede: `gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E og `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C. Kun læsning af `statistik/data/*.db` (`readOnly: true`); `git status --short statistik/data/` viser ingen databasefiler.
- JSON validerer, scriptet kører på alle fem særlige tests, og `git diff --check` er uden fejl.

## Afgrænsning
- Ingen nye downloads eller søgninger i denne opgave. Brug kun det, der ligger i `register.json`.
- Gæt aldrig. Hvad kilden ikke siger, står som "ikke angivet i kilden".
- Skriv på dansk, jævnt sprog.

## Ved tvivl
Skriv i "Spørgsmål", især hvis to filer kunne være kilde for samme felt, eller en fil kan læses som både national og regional.

## Gren
`arbejde/131-regelbog-pr-saeson`, fra `main` (efter 130 runde 5-6 er merget). Christoffer opretter branchen selv; Codex kører ingen git-kommandoer, der skriver til `.git`, og lader ændringer stå ustaged.

---

## Spørgsmål
(Tomt.)

## Resultatnote
(Udfyldes af Codex.)
