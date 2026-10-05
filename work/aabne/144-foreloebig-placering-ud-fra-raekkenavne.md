# Opgave 144 — foreløbig placering ud fra rækkenavne, hvor kategorisignaturen mangler

**Trin:** Bygger på 143 (merget). Retter, at alle GSB-hold i 2026/27 og U09 i 2025/26 står som "Ikke placeret", selv om rækkenavnet selv angiver format og niveau.

## Baggrund
Placeringen i 126/127 bygger på en kategorisignatur: hvilke kampkategorier der faktisk er spillet i puljen. Den findes først, når kampe er spillet. 2026/27 er lige begyndt, så alle rækker står som `Uplaceret: <format> (ingen brugbar kategorisignatur)`. Christoffer har kontrolleret badmintonplayer.dk (U13 2026/27, region København): siden viser kun rækkenavne, fx "U13 B, 5200 (2+2)" og "U13 Dx, 4400 (4 spillere) BD". Der er altså ingen nyere data at hente. Navnet bærer format og niveau.

Afgørelse (Christoffer, 2026-10-05): placér foreløbigt ud fra rækkenavnet. Når de første kampe er spillet, dobbelttjekkes mod signaturen.

Dx er nybegynderrækken: spillere uden ranglistepoint endnu. Den er et eget niveau under D.

## Mål
1. **Nyt script** `statistik/scripts/144-foreloebig-placering.mjs`, der genbruger 143-logikken og 136-parseren (ret ikke 136).
2. **Regel:** For rækker, hvor formatet står som `Uplaceret: <format> (ingen brugbar kategorisignatur)` og rækkenavnet indeholder et format i parentes (`4+3`, `4+2`, `2+2`, `4 spillere`, `4 piger`, `3 spillere`), læses format og niveau fra navnet.
   - Niveau: bogstav E, M, A, B, C, C-D, D, Dx, og tallet efter (fx 5200).
   - Forslag 4 gælder som før for 4+3 og U11 4+2 uden niveau (én række af formatet i region, sæson og aldersgruppe: "eneste række").
   - Suffikset "BD" ignoreres i niveauet. "maks. 11500 p. holdfællesskab" er ikke et niveau.
3. **Dx:** Nyt niveau i rangeringen, rang efter D (E > M > A > B > C > C-D > D > Dx). Tallet efter bruges til sortering som for de andre. Navn i output: "nybegynder (uden ranglistepoint)". Dx tolkes aldrig som D. Tjek 136-X/Dx-undersøgelsen (`statistik/results/136-x-dx-bd-undersoegelse.md`) og sig, om den modsiger dette.
4. **3 spillere (U09):** Foreløbigt sidst i formatrækkefølgen: 4+3 > 4+2 > 2+2 > 4 spillere > 4 piger > 3 spillere. Mærk det `hierarki_status: "foreløbigt valg (Christoffer ikke afgjort)"`. U09 sammenlignes kun med U09.
5. **Mærkning:** Hver placering fra navnet får `placering_kilde: "raekkenavn_foreloebig"` og `foreloebig: true`. Placeringer fra signatur får `placering_kilde: "signatur"`.
6. **Hvilke sæsoner:** Kun rækker, hvor signaturen mangler og navnet har format. Forventet: alle rækker i 2026/27 og 2025/26 U09. Find selv alle andre tilfælde og list dem. Gamle sæsoner uden formattekst (2011–2014, "X1/X2") røres ikke.
7. **Output** (nye filer, 143-filerne står urørte):
   - `statistik/results/144-ungdom-i-tal.json` (samme felter som 143 plus `placering_kilde`, `foreloebig`, `hierarki_status`)
   - `statistik/results/144-aendringer-mod-143.md`

## Kontrol
- **Målet:** 2026/27 og 2025/26 U09 har nu placeringer, hvor navnet kan læses. Vis tabellen for alle fem årgange i 2026/27: bedste format og niveau for GSB, og hvilke hold der ligger bag. Hver række, der IKKE kunne læses, listes med navn og grund.
- **Værnet (vigtigst):** For de øvrige 64 kombinationer af sæson og aldersgruppe er placering og bredde **uændret** mod 143. Skriv det eksplicit, og list evt. afvigelser. Bredde må ikke ændre sig for nogen kombination. Databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `readOnly: true`, `git status --short statistik/data/` tom, `git diff --check` uden fejl. 136-parserens 28 tests består uændret.
- **Skøn:** 15 rækker fra 2026/27, hvor format og niveau aflæst fra navnet er sammenholdt med rækken som den ser ud i rådata. Mindst 3 Dx-rækker og 3 U09-rækker.

## Afgrænsning
- Ret ikke 136-parseren, 143-filerne eller regelbogen.
- Ingen netværk, ingen downloads, ingen databaseændringer.
- Rør ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.
- Ingen artifact.

## Ved tvivl
Skriv i "Spørgsmål". Kan et rækkenavn ikke læses sikkert, så lad rækken stå uplaceret og list den. Gæt ikke.

## Gren
`arbejde/144-foreloebig-placering`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Spørgsmål
143 indeholder 69 sæson/aldersgruppe-kombinationer, og seks er berørt af målgruppen. Derfor er 63 øvrige kombinationer uændrede, ikke de 64 som kortets kontrol forventer. Skal kontroltallet rettes til 63, eller mangler der en kombination i 143-grundlaget?

## Tilbagefald
Slet de nye filer. Ingen database er berørt.

## Opfølgning
Når de første kampe i 2026/27 er spillet, genkøres 143 med signaturen, og de foreløbige placeringer dobbelttjekkes mod den. Det sker i et nyt kort.

## Resultat

- Nyt script: `statistik/scripts/144-foreloebig-placering.mjs`. Det læser 143-resultatet, 136-parserens eksisterende parserresultater og `liga-landskab.db` med `readOnly: true`; 136- og 143-filerne er ikke ændret.
- Nye rapporter: `statistik/results/144-ungdom-i-tal.json` og `statistik/results/144-aendringer-mod-143.md`.
- 70 division-rækker blev foreløbigt placeret i seks kombinationer: 2025/26 U09 samt alle fem årgange i 2026/27. De får `placering_kilde: "raekkenavn_foreloebig"` og `foreloebig: true`. 3-spillerformatets status er `foreløbigt valg (Christoffer ikke afgjort)`. Dx er placeret separat efter D og vist som “nybegynder (uden ranglistepoint)”.
- 2026/27 bedste GSB-række pr. årgang: U09 — 3 spillere, D 3300 (Gladsaxe Søborg 1 og 2); U11 — 4 spillere, B 5600 (GSB 1); U13 — 2+2, B 5200 (GSB 1); U15 — 4 spillere, A 7200 (GSB 1); U17/U19 — 2+2, B 6800 (GSB 1). Understøttende rå holdnavne står i rapporten.
- Fire rækker kunne ikke læses sikkert; de er listet med grund i rapporten. Ingen af de fire har et GSB-hold knyttet i 143. UGE 38 er fortsat udeladt fra placering.
- Kontrol: de øvrige 63 af 143’s 69 kombinationer har uændret placering; bredden er uændret i 69/69 kombinationer. Kortets forventning om 64 uændrede kombinationer kan ikke afstemmes: 69 minus de seks mål-kombinationer giver 63. Se også Spørgsmål.
- Stikprøve mod rådata: 15/15 rækker bestod, heraf 4 U09 og 6 Dx. 136-parseren blev kørt uændret: 28/28 tests bestod; dens tre eksisterende resultatfiler var skrivebeskyttet under testen og står uændrede.
- `node --check statistik/scripts/144-foreloebig-placering.mjs`: bestået. `git diff --check`: ingen fejl.
- Databasekontrol før/efter: `liga-landskab.db` SHA-256 `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`; `gsb-statistik-normalized.db` SHA-256 `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`. Begge hasher og alle tabelrækketal var identiske før/efter. `git status --short statistik/data/` var tom.
