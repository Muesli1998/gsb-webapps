# Opgave 146 — er rækkerne rene København-rækker, eller blandet København og Sjælland?

**Trin:** Bygger på 145 (merget). Undersøgelse først, tal bagefter. Ingen ændring af eksisterende resultater, før afvigelsen er målt.

## Baggrund
Bredden i 143–145 er målt mod "Badminton København (region_id=8)". Christoffer har kigget på U15 2026/27 på badmintonplayer.dk: 2+2-rækkerne er blandet København og Sjælland. I 143-data ser vi det også: rækken "U15 A, 6800 (2+2)" har blandt andet Badminton Roskilde, Tune og Slangerup/Holte, og "U15 A, 7200 (4 spillere)" har Køge og Nykøbing F. En række kan altså ligge under region 8 uden at være en ren København-række.

Det betyder, at nævneren i bredden ("GSB er med i X af Y rækker") måske tæller rækker, som GSB aldrig ville møde i en ren København-liga. Det gælder ikke nødvendigvis alle sæsoner. Christoffer husker, at ligaerne tidligere var adskilt (Sjællandskampe for sig, fælles kun ved DM for hold), og ved ikke, hvornår de blev slået sammen.

## Spørgsmål der skal besvares
1. **Hvornår blev København og Sjælland fælles?** For hver sæson 2011/12–2026/27 og hver ungdomsårgang: hvor mange ligagrupper ligger kun under region 8, og hvor mange ligger under region 8 sammen med mindst én anden region (brug `league_group_regions`)? Vis tabellen. Marker den første sæson, hvor fællesrækker optræder, og om det sker for alle årgange samtidig.
2. **Hvilke regioner?** For fællesrækkerne: hvilke regioner ligger de også under (navn og id, fx Sjælland), og hvor mange hold kommer fra klubber med hjemregion uden for København? Brug `club_registry.region_id` til klubbernes hjemregion. Sig, hvor mange hold der ikke kan kobles til en klub.
3. **Hvad ændrer det i GSB-tallene?** For hver kombination af sæson og årgang: bredden (rækker og formater) målt på tre måder:
   - A: som i 145 (alle rækker under region 8, inkl. fællesrækker),
   - B: kun rækker, der udelukkende ligger under region 8,
   - C: rækker under region 8 eller København og Sjælland sammen, når mindst én GSB-klub er i rækken (altså det, GSB faktisk kunne møde).
   Skriv, hvor mange kombinationer der ændrer sig mellem A og B, og list de største ændringer.
4. **Er formatplaceringen påvirket?** "Bedste format" kommer fra GSB's egne hold og er sandsynligvis uændret. Bekræft det, eller list afvigelser.

## Output (nye filer, 143–145 står urørte)
- `statistik/scripts/146-region-kbh-sjl.mjs`
- `statistik/results/146-region-kbh-sjl.md` (tabellerne ovenfor, med en kort konklusion øverst: hvornår, hvor meget, hvad der bør ændres)
- `statistik/results/146-region-bredde.json` (pr. sæson og årgang: bredde A/B/C for rækker og formater, antal fællesrækker, regioner)

## Kontrol
- **Målet:** Tabellen i spørgsmål 1 dækker alle 16 sæsoner og alle ungdomsårgange (som i 143: 69 kombinationer). Spørgsmål 3 findes for alle 69.
- **Værnet:** Måling A er identisk med 145 "inkl. holdfællesskab" for alle 69 kombinationer (rækker og formater). Databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `readOnly: true`, `git status --short statistik/data/` tom, `git diff --check` uden fejl, 136-parserens 28 tests består.
- **Skøn:** U15 2026/27: alle rækker, med regioner og klubber, sammenholdt med det, Christoffer ser på badmintonplayer.dk (2+2-rækkerne er blandet). Dertil 5 tilfældige rækker fra ældre sæsoner, fordelt på mindst tre sæsoner.

## Afgrænsning
- Ingen netværk, ingen downloads, ingen databaseændringer.
- Ret ikke 136-parseren, 143–145-filerne eller regelbogen.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.
- Ingen artifact.
- **Ikke i denne opgave:** om GSB "gider" stille hold. Det er ikke noget, data kan afgøre (se nedenfor).

## Om "aktivt fravalg"
Data viser kun, hvilke hold GSB meldte til, ikke hvorfor andre formater mangler. Det kan ligge i spillertal, niveau eller et bevidst valg. Christoffer afgør det selv, hvor han kender situationen (fx U15 2+2 i 2026/27, hvor der principielt var spillere til et U15M-hold). Der laves i stedet en lille håndført fil bagefter, hvor han kan mærke en celle "bevidst fravalgt", "ikke nok spillere" eller "ukendt", og siden viser mærket. Det er et senere kort.

Codex må gerne som tillæg sige, hvilke data der findes om GSB's spillertal pr. årgang og køn pr. sæson (uden at drage konklusioner), så vi kan vurdere, om kapacitet kan måles senere.

## Ved tvivl
Skriv i "Spørgsmål". Er en klubs hjemregion uklar, så lad den stå som "ukendt" og list den.

## Gren
`arbejde/146-region-kbh-sjl`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
(Udfyldes af Codex.)
