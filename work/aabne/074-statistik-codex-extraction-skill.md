# Opgave 074 — byg Codex-skillen til masseudtræk (rækkefølgepunkt 7)

**Trin:** Skillen (`docs/statistik-plan.md`s "Rækkefølge", punkt 7 — Results-
rapporten, punkt 6, er afsluttet). Dette er statistikkens nuværende
førsteprioritet, jf. `AGENTS.md`.

**Gren:** `arbejde/074-statistik-codex-extraction-skill`, jf. AGENTS.md.

**Baggrund:** `docs/statistik-plan.md`s "## Skillen"-afsnit beskriver et
dokument der "skrives når Test & Validation lukker" (den er lukket
2026-09-15) og skal bruges næste gang masseudtræk af kampdata skal køres —
typisk ved sæsonstart. Det skal IKKE være en Claude-skill (SKILL.md i
Anthropics forstand, indlæst via et Skill-værktøj) — Chris har eksplicit
bedt om KUN en Codex-skill: en almindelig markdown-fil i repoet, som Codex
(eller en fremtidig session) læser som kontekst, ligesom `AGENTS.md`, ikke
en formel Claude-skill.

Råmaterialet findes allerede, men er spredt over flere dokumenter:

- `statistik/results/COMPLETE_RESULT_FALLBACK_METHOD.md` — selve metoden
  (render-gate, feltudtræk, idempotens, walkover-regel, kontroller efter
  kørsel, begrænsninger). Dokumentet siger selv "Metodedetaljer til en
  senere skill står i dette dokument".
- `statistik/results/CURRENT_VALIDATION_STATUS.md` — statuskategorier
  (`browser_verified`, `browser_verified_no_result`, `api_error`,
  `corona_suspended`) og en liste af "Reproducerbare scripts".
- `statistik/AGENTS.md` og `statistik/RESUME_INSTRUCTIONS.txt` —
  arbejdsprincipperne (evidens før fortolkning, aldrig gæt, en fejl
  stopper ikke serien).

**Vigtigt:** disse dokumenter er skrevet på forskellige tidspunkter og kan
være forældede på detaljer (fx præcise scriptnavne eller filstier). Denne
opgave skal IKKE bare sammenklippe dem — hvert konkret scriptnavn og hver
sti skal verificeres mod den faktiske kode/mappestruktur, som den ser ud
nu, før den skrives ind i skillen (jf. `statistik/AGENTS.md`s "Aldrig
gæt"-regel).

## Mål

Byg `statistik/CODEX_EXTRACTION_SKILL.md` — en konkret, udførbar
procedure (imperativ tjekliste, ikke fortællende prosa) som en fremtidig
Codex-session kan følge trin for trin, næste gang et masseudtræk af
kampdata fra Nembadminton/BadmintonPlayer skal køres (fx ved en ny sæsons
opstart). Dokumentet skal som minimum indeholde:

1. **Hvornår denne skill bruges** — kort, konkret trigger-beskrivelse (ny
   sæson, et kendt hul der skal genudtrækkes, e.l.).
2. **Render-gate-reglen**, ordret/tilpasset fra
   `COMPLETE_RESULT_FALLBACK_METHOD.md`: hvornår en side må markeres som
   gyldig dynamisk kampdetalje, og hvornår den ikke må.
3. **Idempotens-mønstret**: én JSON-fil pr. kamp, en kørsel springer
   allerede verificerede filer over, så en afbrudt kørsel kan genoptages
   uden at starte forfra.
4. **Walkover-reglen**: kræver eksplicit `(Ikke fremmødt)`-tekst; en
   `Vinder W.O.`-kolonneoverskrift er IKKE i sig selv evidens.
5. **Evidens-før-fortolkning-princippet**: rå tekst/data gemmes altid
   sammen med kilde, kamp-ID, URL og tidspunkt, før noget fortolkes.
6. **De faktiske scripts og deres roller** — kortlagt og VERIFICERET mod
   den nuværende `statistik/`-mappe (kør `ls`/tjek filerne findes), ikke
   kopieret blindt fra `CURRENT_VALIDATION_STATUS.md`s liste. Nævn
   eksplicit hvis et script fra den gamle liste ikke længere findes, eller
   er omdøbt.
7. **Kontrolliste efter kørsel** — de fem punkter fra
   `COMPLETE_RESULT_FALLBACK_METHOD.md`s "Kontroller efter kørsel"
   (tælling af dynamiske detaljer/manglende/fejl, felt-audit, FK-/dublet-
   kontrol, sammenligning mod officielle stillinger, statuskategorier
   rapporteret separat).
8. **Kendte begrænsninger**, videreført fra samme dokument (dynamisk
   detalje beviser ikke at alle historiske formater er ens; de kendte
   U09-/corona-undtagelser; individuelle opstillinger kræver separat
   parser).

Opdater desuden `statistik/TEST_RUN_LOG.md` med en linje der noterer at
skillen er skrevet (dato, kort begrundelse), jf. `AGENTS.md`s krav om at
statusændringer skal kunne spores.

## Kontekst

Dette er en dokumentationsopgave, ikke en kodeopgave — der skal ikke
skrives eller ændres noget udtræksscript, og intet masseudtræk skal
faktisk køres som del af denne opgave. Formålet er at samle den allerede
eksisterende, spredte viden i én operationel fil, verificeret mod den
nuværende kode.

## Afgrænsning

**Må røres:** `statistik/CODEX_EXTRACTION_SKILL.md` (ny fil),
`statistik/TEST_RUN_LOG.md` (kun en ny logline, ikke ret i eksisterende
linjer).

**Må ikke røres:** `statistik/data/*.db` (kun læses, hvis du overhovedet
har brug for at bekræfte noget mod databasen — ingen skrivning under
nogen omstændigheder), ingen eksisterende scripts i `statistik/`
(hverken `.mjs`-filer eller andet), ingen eksisterende resultatfiler i
`statistik/results/`, `docs/statistik-plan.md` (allerede opdateret i en
tidligere opgave — ikke en del af denne), `apps/netlify-prod/`.

## Kontrol

**Målet:** `statistik/CODEX_EXTRACTION_SKILL.md` findes og indeholder
alle otte punkter fra Mål-afsnittet ovenfor — bekræft med en simpel
optælling (fx antal `##`-overskrifter der matcher punkterne) i
resultatnoten. Hvert scriptnavn nævnt i dokumentet er bekræftet at findes
på den angivne sti — angiv i resultatnoten hvor mange der blev
verificeret, og hvor mange (om nogen) der ikke længere fandtes/var
omdøbt.

**Værnet:**

```
git status --short statistik/data/ statistik/scripts/ statistik/results/ apps/netlify-prod/ docs/statistik-plan.md
```

Skal være tom (kun `statistik/CODEX_EXTRACTION_SKILL.md` og
`statistik/TEST_RUN_LOG.md` må stå som ændret/nye filer i den samlede
`git status`).

## Ved tvivl

Findes et scriptnavn fra `CURRENT_VALIDATION_STATUS.md`s liste ikke
længere, eller er strukturen i `statistik/` ændret markant siden disse
dokumenter blev skrevet (fx en anden mappeopdeling) — stop og skriv det
under Spørgsmål i stedet for at gætte det nuværende navn eller opfinde en
ny struktur. Er det uklart om et konkret script stadig gør det
`CURRENT_VALIDATION_STATUS.md` siger det gør (uden at du kan bekræfte det
uden selv at køre det, hvilket denne opgave ikke ber om) — dokumentér det
som uverificeret i skillen selv (fx "ikke kørt siden 2026-09-14, verificér
før brug"), fremfor at præsentere det som testet nu.

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
