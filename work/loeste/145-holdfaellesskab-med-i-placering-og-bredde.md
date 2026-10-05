# Opgave 145 — holdfællesskaber med GSB tæller med, mærket som holdfællesskab

**Trin:** Bygger på 144 (merget). Ændrer reglen fra 127, hvor et hold i holdfællesskab med en anden klub ikke blev talt som GSB.

## Baggrund
127-reglen (`approved_identity_rules.collaboration_rule`) holdt "BC37/Gladsaxe Søborg 1" uden for GSB-tallene og viste det separat. Christoffer har besluttet (2026-10-05): holdfællesskaber skal tælle med i placering og bredde, men mærkes som holdfællesskab. GSB har fx teknisk set et hold i 4+3 U13 i 2026/27, men det er et holdfællesskab med Lyngby ("GSB/LBK" i rækken "U13 (4+3) - maks. 11500 p. holdfællesskab").

Det vi allerede kan se i 143-data: kun to hold i region 8 (Badminton København) har GSB i et holdfællesskabsnavn:
- 2020/21 U11, række "U11 4+2": "BC37/Gladsaxe Søborg 1" (i dag adskilt i `collaborations_separate`)
- 2026/27 U13, række "U13 (4+3) - maks. 11500 p. holdfællesskab": "GSB/LBK" (i dag ikke koblet til GSB, fordi normaliseringen ikke genkender navnet)

143 viser klubnavne efter normalisering. Der kan være flere i de rå holdnavne.

## Mål
1. **Find alle** hold i ungdomsdata (alle sæsoner, alle regioner i data), hvis rå holdnavn indeholder en GSB-variant sammen med en anden klub (skråstreg, plus eller lignende): "Gladsaxe Søborg", "GSB" som selvstændigt ord/led, og de 21 godkendte direkte navnevarianter. Brug ikke `LIKE '%GSB%'` blindt. Undgå falske fund. Lav en tabel: sæson, årgang, række, råt holdnavn, partnerklub, om GSB-delen er hovedhold (fx "Gladsaxe Søborg 1") eller kun nævnt. Er der flere end de to kendte, så list dem alle.
2. **Regel:** Et holdfællesskab med GSB tæller som GSB-hold i placering og bredde, men mærkes `holdfaellesskab: true` og `partner: <klub>` på holdet og på alle tal, det påvirker.
3. **Behold begge mål** i output, så siden kan vise dem:
   - placering og bredde **inkl.** holdfællesskab, og
   - placering og bredde **uden** holdfællesskab (som i 144).
   Bredde består af to tal: rækker (hvor mange rækker GSB er i) og formater (hvor mange formater GSB er i). Begge skal findes i begge udgaver.
4. **Placering:** Rækken "(4+3) - maks. … p. holdfællesskab" har intet niveau. Brug forslag 4 (eneste række af formatet i region, sæson og aldersgruppe: "intet niveau nødvendigt (eneste række)"). Mærk placeringen `foreloebig: true` hvis den bygger på rækkenavnet (2026/27).
5. **Rør ikke andre klubbers holdfællesskaber.** Deres navne normaliseres som i dag.
6. **Output** (nye filer, 143- og 144-filer står urørte):
   - `statistik/scripts/145-holdfaellesskab.mjs`
   - `statistik/results/145-ungdom-i-tal.json` (samme felter som 144 plus `holdfaellesskab`, `partner`, `inkl_holdfaellesskab`, `uden_holdfaellesskab`)
   - `statistik/results/145-aendringer-mod-144.md`: hvert hold og hver kombination, der ændrer sig, med før/efter og begrundelse.

## Kontrol
- **Målet:** Alle fundne holdfællesskaber er talt med i tabel og i JSON med mærke. Vis for hvert fund: placering og bredde før/efter. Forventet: 2026/27 U13 får 4+3 som bedste format (foreløbig), og 2020/21 U11 får 4+2 som bedste format (var 4 spillere); begge får +1 række og +1 format i bredden. Bekræft eller afvis det.
- **Værnet:** Alle andre kombinationer af sæson og aldersgruppe er **uændrede** mod 144, både placering og bredde (rækker og formater). Skriv det eksplicit med antal. Databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `readOnly: true`, `git status --short statistik/data/` tom, `git diff --check` uden fejl. 136-parserens 28 tests består uændret.
- **Skøn:** Alle fundne holdfællesskaber (forventet 2, men Codex skal selv finde det rigtige tal), kontrolleret mod rådata, plus 5 tilfældige GSB-hold fra andre sæsoner, der **ikke** er holdfællesskaber og ikke må ændre sig.

## Afgrænsning
- Ret ikke 136-parseren, 143/144-filerne eller regelbogen.
- Ingen netværk, ingen downloads, ingen databaseændringer.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.
- Ingen artifact.

## Ved tvivl
Skriv i "Spørgsmål". Er det uklart, om et navn er et GSB-holdfællesskab, så lad det stå uden for og list det.

## Gren
`arbejde/145-holdfaellesskab`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Resultat
- Nyt script: `statistik/scripts/145-holdfaellesskab.mjs`; nye outputs: `statistik/results/145-ungdom-i-tal.json` og `statistik/results/145-aendringer-mod-144.md`. Scriptet læser `liga-landskab.db` med `readOnly: true`, kontrollerer begge databasehashes/rækketal før og efter og genbruger 143/144 samt 136's eksisterende forslag-4-resultat. Ingen database, 136-, 143-, 144- eller regelbogsfil er ændret.
- Rådata-audit på alle ungdomsaldre (age_group_id 2, 3, 4, 5, 6, 7, 18) fandt **2 fysiske GSB-holdfællesskaber**, med 9 regionale holdkoblinger i alt. De er deduplikeret som fysiske hold, ikke talt ni gange:
  - 2020/21 U11, `U11 4+2`, `BC37/Gladsaxe Søborg 1`: partner `BC37`; GSB-delen er ikke første led i navnet. Fem regionkoblinger.
  - 2026/27 U13, `U13 (4+3) - maks. 11500 p. holdfællesskab`, `GSB/LBK 1`: partner `LBK` (rå partnerholdnavn `LBK 1`); GSB er navnets første led. Fire regionkoblinger.
- Placering/bredde bekræfter forventningen. 2020/21 U11 går fra 4 spillere til 4+2; region-8-bredden går fra 1 række/1 format til 2/2. 2026/27 U13 går fra 2+2 til foreløbigt 4+3; forslag 4 er bekræftet i 136 for præcis pulje 18974 som `intet niveau nødvendigt (eneste række)`, `tolkning_regel: forslag-4`. Dens placering har `placering_kilde: raekkenavn_foreloebig` og `foreloebig: true`. Region-8-bredden går fra 5 rækker/3 formater til 6/4. Begge hold er mærket `holdfaellesskab: true`, partner og rå partnerholdnavn i JSON.
- Af 69 sæson/årgang-kombinationer ændres præcis 2; de øvrige **67** placeringer og bredder er uændrede mod 144. 144’s egen breddekontrol bekræfter 69/69 uændrede som baseline; bredden ændres i 145 kun for de to berørte kombinationer med +1 række og +1 format hver. Fem deterministisk udtrukne direkte GSB-hold fra andre sæsoner blev matchet mod de rå holdposter i 143 og står uændrede. Andre tvetydige GSB-holdfællesskaber fundet: 0.
- Kontroller: `node --check statistik/scripts/145-holdfaellesskab.mjs` bestået; 145-scriptet bestået med 2 samarbejdshold, 69 kombinationer, 67 uændrede, 5/5 direkte GSB-stikprøver og uændrede databaser. 136-parseren: 28/28 tests bestået; de tre eksisterende 136-resultatfiler var skrivebeskyttet under testen. `git diff --check` bestået. `git status --short statistik/data/` tom.
- Database SHA-256 før/efter identisk: `gsb-statistik-normalized.db` `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; `liga-landskab.db` `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`. Alle tabellers rækketal var også identiske før/efter.
- Spørgsmål: Ingen. Partneren er registreret som `LBK`, præcis som det står i rånavnet; navnet er ikke udvidet til et længere klubnavn.
