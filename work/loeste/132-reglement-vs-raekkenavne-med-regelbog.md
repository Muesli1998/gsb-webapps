# Opgave 132 — rækkenavne holdt op mod regelbogen (bekræftet/betinget)

**Trin:** Bygger på 130 (`130-reglement-vs-raekkenavne.md/.json`) og 131 (regelbog pr. sæson). Starter først, når 131 er merget.

## Baggrund
130 satte reglementer op mod rækkenavnene i `liga-landskab.db`, men mange tidlige sæsoner endte med "regelsæsonkilde mangler", fordi der ikke var en regelbog for sæsonen. Med 131 har hver sæson × målgruppe × område en status (bekræftet, betinget, ingen). Nu skal rækkenavnene måles mod den regelbog, der faktisk gælder, og hver forklaring skal bære sin status.

## Mål
1. Genkør sammenligningen fra 130 med regelbogen som kilde. Brug `slaa-op-regelbog.mjs` eller læs `regelbog-pr-saeson.json`.
2. For hver kombination af sæson, region og aldersgruppe: hvilke rækkenavne forklares af regelbogen, og hvilke forklares ikke? Hver forklaring får regelbogens status (`bekraeftet`/`betinget`/`ingen`) og afstand i sæsoner.
3. Skriv `statistik/results/132-raekkenavne-vs-regelbog.md` og `.json` med antal rækker, antal forklaret/uforklaret pr. status og de 30 største uforklarede navne pr. status.
4. Konklusion: hvor mange forklaringer hviler på betinget regelbog, og hvor mange af dem er svage (3+ sæsoner)?

## Afgrænsning
- Ingen ændring af `130-reglement-vs-raekkenavne.*`, 127, 129 eller andre afsluttede filer. Nye filer ved siden af.
- Pointskalaer og niveautal arves ikke (jf. 131). Peg kun på filen, oversæt ikke tal til bogstav.
- Ingen nye downloads. Rækkenavne-parseren ændres ikke her (se 136).

## Kontrol
- **Målet:** hver forklaring har en regelbogspost med status; ingen uden.
- **Værnet:** databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), kun læsning (`readOnly: true`), `git status --short statistik/data/` tom, `git diff --check` uden fejl.
- **Skøn:** stikprøve på 20 rækkenavne (mindst 5 pr. status) tjekket mod PDF'ens ordlyd.

## Ved tvivl
Skriv i "Spørgsmål". Gæt ikke.

## Gren
`arbejde/132-raekkenavne-vs-regelbog`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git, lader ændringer stå ustaged, melder filstier, tager aldrig `git add -A`, pusher ikke, rører ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Spørgsmål
- Kontrollen kræver PDF-ordlyd for mindst fem poster pr. status. `ingen`-posterne har ingen tilknyttet kilde/PDF i regelbogen (5 af 20-stikprøven), så den del kan ikke opfyldes uden en ny kilde. Skal fraværskontrollen accepteres som dokumenteret begrænsning, eller skal der findes/tilføjes kilder først?
- “Forklaret” er i denne rapport operationelt: 136-parseren genkender rækkenavnet, og den konkrete sæson/områdepost er `bekraeftet` eller `betinget`. Det beviser ikke, at hvert lokalt rækkenavn står ordret i PDF'en. Er denne definition tilstrækkelig for 132?

## Tilbagefald
Slet de nye resultatfiler. Intet andet er ændret.

## Resultat
**Udført, med de to begrænsninger under Spørgsmål.** Sammenligningen omfatter 46.450 fysiske gruppe-region-links i 1.858 sæson/region/aldersgruppe-scopes. Af 525 navn/scope-forekomster med bekræftet regelbog blev 277 operationelt forklaret og 248 ikke forklaret (770 fysiske links). Af 449 betingede blev 164 forklaret og 285 ikke forklaret (612 links); 63 af de 164 forklaringer er svage, fordi afstanden er mindst tre sæsoner. Status `ingen`: 2.653 forekomster / 7.538 links, ingen forklaret. Intet direkte områdematch: 13.513 / 37.530, ingen forklaret. I alt: 46.450 links.

Stikprøven i rapporten har 20 rå rækkenavne, fem pr. statuskategori. PDF-ordlyd kunne kontrolleres for de 15 med en angivet kilde; de fem med status `ingen` er eksplicit markeret uden PDF og kan ikke bestå ordlydskontrollen. `ingen_match_i_regelbog`-stikprøven bruger den nationale ungdoms-PDF til format-/alderskontekst, men dette tælles ikke som regional dækning. Der blev ikke arvet pointskalaer eller udledt niveauer af tal.

Leverancer: `statistik/results/132-raekkenavne-vs-regelbog.json` og `.md`. Scriptet 138 genererer begge 132-filer. Databasehashes før/efter: normalized `49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E`; landscape `9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C` (uændrede). `git status --short statistik/data/` tom. Kontrol af alle 441 forklaringer fandt 0 manglende eller uoverensstemmende regelbogsstatus/afstand. `git diff --check` kørt: ingen fejl (kun Git's LF→CRLF-advarsel for de redigerede Markdownfiler).
