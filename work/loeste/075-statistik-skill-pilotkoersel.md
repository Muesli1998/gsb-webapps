# Opgave 075 — pilotkør skillen (bevis, ikke kun dokumentér)

**Trin:** Skillen (`docs/statistik-plan.md`s "Rækkefølge", punkt 7 —
skrevet og struktur-verificeret i opgave 074, men eksplicit ikke
pilot-testet). Dette er statistikkens nuværende førsteprioritet, jf.
`AGENTS.md`.

**Gren:** `arbejde/075-statistik-skill-pilotkoersel`, jf. AGENTS.md.

---

**Baggrund:** `statistik/CODEX_EXTRACTION_SKILL.md` (opgave 074) er
struktureret korrekt og alle 18 nævnte scripts findes — men det er kun
statisk verificeret. Skillen selv siger det ordret flere steder:

> "Dokumenteret metode er ikke det samme som en aktuelt fungerende
> automatiseret browserrute." (§0)
>
> "Uden en verificeret importør er dette en **testplan**, ikke en bestået
> ende-til-ende-test." (§10.4)

Opgave 004 fandt at en frisk Playwright-kontekst kun returnerer en
standardshell (~292 tegn) og ikke passerer render-gaten. Det er den
uløste kerneknude — ikke skillens tekst, men om der overhovedet findes en
automatiseret rute der virker i dag.

## Mål

To ting skal bevises, ikke antages:

1. **Mindst én automatiseret rute** (Playwright eller webservicelaget med
   frisk `SR_CallbackContext`) kan hente og render-gate-godkende et lille,
   kendt sæt holdkampe — dvs. den renderede tekst indeholder både det
   forventede kamp-ID og en linje der starter med `Resultat`, jf. skillens
   §2. Brug 3-5 allerede kendte, `browser_verified`-kampe fra den
   nuværende database som reference (kamp-ID + forventet resultat er
   allerede kendt, så du kan sammenligne).
2. **Skillens §10.4-testplan udføres faktisk** på en isoleret testdatabase
   (en KOPI, aldrig referencen): alle otte scenarier (gyldig kampdetalje,
   forkert kamp-ID, standardshell, `Resultat -`, eksplicit
   `(Ikke fremmødt)`, `Vinder W.O.` alene, browserfejl, ukendt
   resultatmarkør/sæson-/puljedrift) køres igennem hele kæden fra rå
   hentning til importeret række. Samme fixture gentages to gange —
   tal og værdier må ikke ændre sig mellem de to kørsler.

Hvis punkt 1 slår fejl (ingen automatiseret rute passerer render-gaten på
noget kendt eksempel), er opgaven stadig løst i den forstand at
spørgsmålet er endeligt besvaret — se "Ved tvivl".

## Afgrænsning

**Må røres:** en ny, isoleret testdatabase (fysisk kopi af den nuværende
`gsb-statistik-normalized.db`, lagt et andet sted end `data/`, fx
`data/pilot-test.db` — skal IKKE overskrive originalen), nye
pilot-scripts/logfiler under `statistik/` hvis nødvendige for testen, et
nyt resultatdokument (`statistik/results/075-skill-pilotkoersel.md`/`.json`),
`statistik/TEST_RUN_LOG.md`.

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (den
rigtige) — kun læses read-only for skema-/referenceformål, ALDRIG
skrives til i denne opgave. `statistik/CODEX_EXTRACTION_SKILL.md` og
`.agents/skills/gsb-match-extraction/SKILL.md` (opgave 074's output —
ret dem kun hvis pilotten afdækker en konkret fejl i teksten, og i så
fald: sig præcis hvilken linje og hvorfor, gæt ikke en omskrivning).
`docs/statistik-plan.md`, `apps/netlify-prod/`.

## Kontekst

Dette er IKKE en sæsonstart-udtrækning og ikke et masseudtræk. Det er en
lille, kontrolleret pilot på et håndfuldt allerede-kendte kampe plus
skillens egen fixture-liste, udelukkende for at afgøre om proceduren
faktisk virker, før den stoles på ved næste sæsonstart. Skriv aldrig til
den rigtige database under denne opgave — enhver "import" sker på
testkopien.

## Kontrol

**Målet:**

```
Antal af 3-5 kendte referencekampe der render-gate-godkendes af en automatiseret rute   forventet: rapporteres eksplicit (kan være 0)
Antal af skillens 8 §10.4-scenarier der består korrekt ved kørsel 1        forventet: 8/8, eller dokumenteret hvorfor ikke
Antal af skillens 8 §10.4-scenarier der giver IDENTISK resultat ved gentaget kørsel 2   forventet: 8/8
```

**Værnet:**

```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/ apps/netlify-prod/ docs/statistik-plan.md   skal være tom
```

**Skøn:** om skillens tekst (§2, §3, §6, §10) stadig stemmer med det
pilotten faktisk observerede — markér eksplicit hvor den ikke gør.

## Ved tvivl

Består ingen automatiseret rute render-gaten på noget kendt eksempel:
stop, konkludér at masseudtræk fortsat kræver den manuelle
in-app-browserfallback (som skillen selv siger i §1), og skriv det som
et bekræftet, endeligt svar under "Spørgsmål" — ikke som en fejl der
skal debugges videre i denne opgave. Det er et gyldigt, informativt
resultat.

Er et scenarie i §10.4-fixturen tvetydigt at konstruere (fx hvordan man
fremtvinger en realistisk `Vinder W.O.`-uden-evidens-side), spring det
enkelte scenarie over, dokumentér hvorfor, og fortsæt til de øvrige — gæt
ikke en syntetisk fixture der ikke afspejler en reel kilde.

## Spørgsmål

2026-09-20: Alle 5 afprøvede kendte `browser_verified`-kampe fejlede den friske Playwright-render-gate. De returnerede hver 875 tegn standardskal uden forventet kamp-ID og uden linje der starter med `Resultat`; 0/5 blev godkendt. Ifølge kortets "Ved tvivl" stopper pilotten her. Masseudtræk kræver fortsat den manuelle in-app-browserfallback; der forsøges ikke at omgå eller rette render-gaten i denne opgave.

2026-09-20: §10.4-fixturekørslen blev ikke startet, fordi stopbetingelsen ovenfor indtrådte. Derfor er ingen af de 8 scenarier rapporteret som bestået, og gentagelse 2 er ikke relevant. En read-only audit fandt desuden kun 4/8 scenarier med direkte eksisterende rå evidens i checkoutet; de øvrige ville kræve manglende eller opfundne fixtures. Ingen testdatabase eller import blev derfor oprettet.

## Resultatnote

2026-09-20: Pilotten blev kørt fra frisk `main` på grenen `arbejde/075-statistik-skill-pilotkoersel`. Referenceudvalget var 5 kendte `browser_verified`-kampe: 337416 (forventet 4-3), 494475 (2-3), 494477 (2-3), 505211 (0-5) og 506441 (0-5). En ny headless Playwright Chromium-kontekst åbnede hver dokumenterede BadmintonPlayer-URL, ventede 5.000 ms og kontrollerede render-gaten på renderet bodytekst.

Faktiske tal fra den genåbnede rapport `statistik/results/075-render-gate.json`: 5 forsøg, 0 med forventet kamp-ID, 0 med `Resultat`-linje, 0/5 render-gate-godkendt; alle 5 havde `textLength=875`, ingen browserfejl. Rapporten blev genåbnet efter generering og tallene stemmer med denne note.

§10.4 blev ikke kørt efter den eksplicitte stopregel: kørsel 1 = 0/8 udførte scenarier, kørsel 2 = ikke udført, identitetskontrol = ikke relevant. Der blev ikke oprettet testkopi og ikke kørt import. Den uafhængige read-only audit vurderede 4/8 scenarier som direkte understøttet af eksisterende rå evidens, mens 4/8 var tvetydige eller manglede rå fixture; ingen eksisterende importer blev vurderet sikre at køre uændret mod en kopi.

Reference-DB'en blev kun læst. SHA-256 før og efter var identisk: `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`. Ingen ændring i `statistik/data/`, `apps/netlify-prod/` eller `docs/statistik-plan.md`. Pilot-scriptet og JSON-rapporten er nye og indeholder ingen credentials eller callback-context.

Skøn: Pilotten bekræfter, at den friske automatiserede Playwright-rute fortsat ikke passerer render-gaten; den beviser ikke, at den manuelle in-app-browserfallback er fejlet. Skillens §2, §3, §6 og §10 blev ikke ændret, fordi observationen stemmer med deres dokumenterede begrænsning. Opgaven afsluttes med et bekræftet negativt rutesvar, ikke med en fungerende automatiseret masseudtræksrute.
