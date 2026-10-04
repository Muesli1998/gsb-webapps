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
(Tomt.)

## Tilbagefald
Slet de nye resultatfiler. Intet andet er ændret.

## Resultat
(Udfyldes af Codex.)
