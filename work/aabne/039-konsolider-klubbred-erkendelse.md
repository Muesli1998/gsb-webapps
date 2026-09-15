# Opgave 039 — konsolidér erkendelsen af at databasen altid var klubbred

**Trin:** Test & Validation (grundlagsrettelse — erstatter dele af opgave 034)

**Gren:** `opgave-039-konsolider-klubbred`, jf. AGENTS.md.

**Baggrund:** opgave 038 bekræftede (A): `docs/statistik-plan.md`s
"Hvor vi står"-tal (2.818 holdkampe, 20.319 individuelle kategorier, 67.196
spillerrelationer) er klubbrede — de har altid dækket alle aldersgrupper
(senior, U09-U15, U17/U19, veteran), ikke kun senior. Opgave 033's "1.207
ungdomsholdkampe" var derfor en nedbrydning af tal der allerede lå i
"Hvor vi står", ikke en ny, tidligere ubesøgt mængde. Det betyder at
"Test & Validation lukket for senior" (erklæret 2026-09-15, FØR denne
tråd) reelt blev vurderet på et klubbredt datasæt.

**Chris' svar (2026-09-15):** "Ja tak" til at få dette konsolideret i én
sammenhængende, korrekt tekst.

---

## Mål

1. **Ret `docs/statistik-plan.md`s "Hvor vi står"** til eksplicit at sige
   at tallene er klubbrede, med en aldersfordelt tabel (senior, U09-U15,
   U17/U19, veteran — brug `age_group_id`-opdelingen fra opgave 038's
   resultat) i stedet for at fremstå som rendyrket senior.
2. **Ret "Status på Test & Validation som helhed"** til at sige at
   vurderingen af de fem kriterier blev foretaget på det klubbrede
   datasæt — uden at ændre selve konklusionen (kriterierne er stadig
   opfyldt efter deres egen ordlyd), medmindre gennemgangen i punkt 4
   nedenfor finder noget der reelt ændrer et af de fem kriteriers status.
3. **Erstat opgave 034's nuværende tekst i `docs/statistik-plan.md` og
   `docs/BESLUTNINGER.md`** (postet 2026-09-15, "Ungdom ind i Test &
   Validation") med en korrekt version: ungdom var aldrig udenfor
   datasættet, kun udenfor opmærksomheden. Opgave 033/035/036/037/038 er
   en nedbrydning og udfyldning af huller i et allerede eksisterende
   datasæt — ikke en scope-udvidelse. Bevar de konkrete tal og fund fra
   034/035/036 (de er stadig gyldige), men ret narrativet omkring dem.
4. **Vurdér om noget af det tidligere senior-lukkede arbejde reelt allerede
   dækkede ungdom uden at blive kaldt det** — særligt opgave 013's 257/58-
   klassifikation (mangler kategorisektion / kategori uden score) og
   opgave 032's spillernavne-audit (top-25 mest aktive). Tjek konkret: er
   opgave 035's 162 klassificerede ungdomsrækker en delmængde af de
   oprindelige 257+58, eller er de reelt adskilte poster? Hvis de er
   samme underliggende rækker klassificeret to gange under forskellige
   navne, skal det siges eksplicit, så ingen tror der er lavet dobbelt
   arbejde uden grund, eller at der findes to modstridende
   klassifikationer af samme kamp.
5. **Flyt opgave 034's kort fra `work/loeste/` tilbage til at være markeret
   som "delvist forældet, se opgave 039"** — eller skriv en kort note i
   `work/loeste/034-...md` der peger på 039, alt efter hvad der er mindst
   forvirrende. Vælg selv, men gør valget eksplicit i resultatnoten.

## Kontekst

Dette er ikke en ny opgave om ungdom — det er en rettelse af hvordan hele
kæden 033→034→035→036→037→038 er blevet fortalt. De faktiske tal fra hver
opgave står stadig ved magt (de er alle læsende, verificerede målinger).
Det der skal rettes er sproget: "ungdom kommer ind i scope" er en forkert
beskrivelse af hvad der skete. Den rigtige beskrivelse er: "vi opdagede at
databasen altid indeholdt ungdom, og har nu for første gang set specifikt
på den del af den."

## Afgrænsning

**Må røres:** `docs/statistik-plan.md` (afsnittene "Hvor vi står", "Status
på Test & Validation som helhed", og ungdomsafsnittet fra opgave 034),
`docs/BESLUTNINGER.md` (2026-09-15-ungdomsposten fra opgave 034 — ret
eller tilføj, slet ikke historikken), `work/loeste/034-ungdom-scope-
beslutning.md` (tilføj en pointer-note, rediger ikke resultatnotens tal).

**Må ikke røres:** `statistik/data/*.db` (kun læsning). De faktiske
tal/resultatfiler fra 033/035/036/037/038 (`statistik/results/033-...`
til `038-...`) — disse er korrekte målinger og skal ikke ændres, kun
fortolkningen af dem i planen.

## Kontrol

**Målet:** `docs/statistik-plan.md` og `docs/BESLUTNINGER.md` beskriver
korrekt at databasen altid var klubbred, med en aldersfordelt tabel og en
eksplicit afklaring af om 035's 162 overlapper med de oprindelige 257+58.

**Værnet:** ingen af de underliggende måletal fra 033-038 ændres — kun
narrativet i `statistik-plan.md`/`BESLUTNINGER.md`/034's pointer-note.

**Resultatnoten skal angive hvad der faktisk blev rettet, med henvisning
til hvilke afsnit** — ikke en vurdering af om det nu er "rigtigt nok".

## Resultatnote

Fase 1–3 er ikke gennemført, fordi punkt 4 ramte et dokumenteret
datagrundlags-stop. 013's versionsstyrede JSON/Markdown indeholder kun 20
stikprøverækker, ikke den fulde liste over 257 payload-ID'er. Af 035's 162
ID'er overlapper 5 med den bevarede 013-stikprøve (2286, 96231, 2365, 2396,
2509), mens 0 overlapper med 006's 458-rækkers klassifikation. Det er ikke
tilstrækkeligt til at afgøre hele 162-mod-257+58-overlappet uden at gætte.
Derfor er `docs/statistik-plan.md`, `docs/BESLUTNINGER.md` og 034-noten
urørte.

## Spørgsmål

Skal den manglende fulde 013-kandidatliste rekonstrueres fra eksterne,
ikke-versionsstyrede browserfiler, eller accepteres punkt 4 som uafklaret?
Jeg har ikke ændret 034-narrativet på baggrund af stikprøven alene.

**Commits:** afventer commit på denne gren.
