# Opgave 138 — genkør 127 og 129 med regelbog og ny parser

**Trin:** ⚠ Afhænger af 131 (merget) og 136 (merget). 137 er besluttet (valg A: ingen pointskala-arv). Må ikke startes før. Forslag 4 og 5 i 136 er ikke besluttet, så rækker af den slags står fortsat som uforklarede. Er forskellig fra `future/128` (genkørsel efter sæson 2026/27, ca. maj 2027); 138 er et tværgående løft nu, 128 kan køres bagefter eller slås sammen med dette.

## Baggrund
127 (format- og breddeanalyse) og 129 (rækkenavnstolkning) blev kørt før regelbogen og før parserudvidelsen. Resultatet kan nu forbedres: flere rækkenavne kan tolkes, og hver tolkning kan få regelbogens status.

## Mål
1. Nyt script `statistik/scripts/138-genkoer-127-129.mjs`, der genbruger 127- og 129-logikken, men bruger 136-parseren og slår regelbog op i 131-regelbogen pr. sæson/region/aldersgruppe.
2. Output `statistik/results/138-ungdom-i-tal.json` (samme felter som 127-JSON'en, plus `regelbog_status`, `regelbog_afstand` og `tolkning_regel`) og `138-aendringer-mod-127-129.md`: hvad flyttede sig (tolkede rækker, placeringer, bredde), og hvorfor.
3. Medtag `missing_rows`-feltet fra 127 og forklar for hver, om rækken nu er tolket, stadig uforklaret, eller afvist.
4. Pointskala: ingen arv (kort 137, valg A). Brug kun skalaer fra filer, der selv angiver dem; resten står "ukendt".
5. Artifacten (klubbens "ungdom i tal"-side) bygges af Claude ud fra 138-JSON'en; Codex rører ikke artifacten.

## Afgrænsning
- Gamle 127/129-filer står uændret. Nye filer ved siden af.
- UGE 38 udgår af placering/bredde som hidtil. Bredde = region 8-rækker med mindst ét GSB-hold.
- Ingen databaseændring, ingen nye downloads.

## Kontrol
- **Målet:** forskelle mod 127/129 forklares række for række i ændringsrapporten; ingen uforklarede afvigelser.
- **Værnet:** databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `readOnly: true`, `git diff --check` uden fejl.
- **Skøn:** 25 rækker, som er skiftet, tjekket manuelt mod reglement og rådata.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/138-genkoer-127-129`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, rører ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Spørgsmål
- 138 kobler 136-status og regelbogsstatus/afstand til alle 6.766 fysiske ungdomsposter og medtager 127's placement/width og `missing_rows`; det genberegner ikke 127's rangering eller bredde. Er denne afgrænsede genkørsel tilstrækkelig, eller ønskes en særskilt fuld genberegning? En sådan genberegning kræver afklaring af, om 136-parserstatus må erstatte 127's manuelt fastlagte format-/niveau-facit.
- 129-scriptet findes ikke som selvstændig fil i repoet; 129's grupperede niveau-/DMU-resultater kan derfor ikke køres igen som samme program. 138 bevarer 127's 129-afledte felter og tilføjer 136-resultatet. Skal en genopbygning af 129-logikken afgrænses som en separat opgave?
- 136 markerer fem rækker som “intet niveau nødvendigt (eneste række)”, selv om navnet indeholder muligt eksplicit niveau (`A (4+3)` eller `Elite/Mesterrække (4+3)`). De står uændret i 138 og er listet i JSON. Skal parserens kendte fejl rettes i en ny opgave?
- I 132 er fem `ingen`-stikprøver uden tilknyttet PDF; ordlydskontrol kan ikke udføres for dem. Se 132-kortets Spørgsmål.

## Tilbagefald
Slet de nye filer.

## Resultat
**Udført som annotering/genkørsel af klassifikation, ikke som ny fuld genberegning af rangering og bredde.** Nyt script `statistik/scripts/138-genkoer-127-129.mjs` læser begge databaser med `readOnly: true`, kontrollerer hashes før/efter og genererer de tre nye 138-leverancer samt 132-resultaterne. `138-ungdom-i-tal.json` indeholder 6.766 fysiske rækker, parser-/regelbogsstatus pr. række, 361 bevarede `missing_rows` med disposition og 25 manuelle rådata/PDF-stikprøver. Placering og bredde er kopieret som baseline fra 127, ikke genberegnet.

136-status på de 6.766 rækker: allerede fortolket af 129 3.178; allerede eksplicit niveau fra 136 16; forslag 4 “eneste række” 61; fortsat uforklaret 2.922; forslag 4 fortsat uforklaret 303; nyfortolket af 136 120; separat liste efter forslag 6 123; UGE 38 afvist fra almindelig placering/bredde 43. Kategorierne summerer til 6.766. Af 361 `missing_rows`: 202 nu tolket af 136, 157 stadig uforklaret, 2 afvist som UGE 38. Alle 361 er medtaget med rækkenavn, format, holdantal, klubber, matching league-group-id, parserstatus og regelbogsopslag. JSON har desuden alle DB-rækker med ændringskategori og forklaring; disse er annoteringer/fortolkninger, ikke påstand om nye beregnede placeringer.

127-baselinekontroller er uændrede: GSB 279 = 133 placerede aktive + 53 aktive uplacerede + 12 udgåede/trukne + 62 DMU-poster + 19 UGE 38-poster. 25 fysiske rækker er efterset mod rå `league_groups`-navn/id og relevante lokale PDF-sider (2016/17, 2018/19, 2019/20, 2020/21, 2024/25, 2025/26); ingen pointtal er oversat til niveau. 136's fem mulige eksplicit-niveau-fejl er bevaret, ikke rettet. Regelbogens status og sæsonafstand er knyttet pr. region; pointskala-arv er ingen.

Filer: `statistik/scripts/138-genkoer-127-129.mjs`, `statistik/results/138-ungdom-i-tal.json`, `statistik/results/138-aendringer-mod-127-129.md`; 132-filerne er listet i kort 132. Databasehashes før/efter er uændrede: normalized `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; landscape `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C`. `git status --short statistik/data/` tom. Scriptens generering bestod, `node --check` bestod; rækkeledgeren har 6.766/6.766 poster med ændringskategori og forklaring. `git diff --check` havde ingen fejl (kun Git's LF→CRLF-advarsel for de redigerede Markdownfiler).
