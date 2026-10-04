# Opgave 138 — genkør 127 og 129 med regelbog og ny parser

**Trin:** ⚠ Afhænger af 131 (merget), 136 (godkendt og merget) og 137 (besluttet). Må ikke startes før. Er forskellig fra `future/128` (genkørsel efter sæson 2026/27, ca. maj 2027); 138 er et tværgående løft nu, 128 kan køres bagefter eller slås sammen med dette.

## Baggrund
127 (format- og breddeanalyse) og 129 (rækkenavnstolkning) blev kørt før regelbogen og før parserudvidelsen. Resultatet kan nu forbedres: flere rækkenavne kan tolkes, og hver tolkning kan få regelbogens status.

## Mål
1. Nyt script `statistik/scripts/138-genkoer-127-129.mjs`, der genbruger 127- og 129-logikken, men bruger 136-parseren og slår regelbog op i 131-regelbogen pr. sæson/region/aldersgruppe.
2. Output `statistik/results/138-ungdom-i-tal.json` (samme felter som 127-JSON'en, plus `regelbog_status`, `regelbog_afstand` og `tolkning_regel`) og `138-aendringer-mod-127-129.md`: hvad flyttede sig (tolkede rækker, placeringer, bredde), og hvorfor.
3. Medtag `missing_rows`-feltet fra 127 og forklar for hver, om rækken nu er tolket, stadig uforklaret, eller afvist.
4. Behandl pointskala efter beslutning i 137.
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
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
