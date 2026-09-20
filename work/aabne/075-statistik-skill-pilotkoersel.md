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

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
