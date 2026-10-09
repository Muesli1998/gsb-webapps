# Opgave 174 — gentag 158b med voksne, inaktive og andre klubber (højst 300 kald)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 4 · **Afhænger af:** 162, 169 (lib og parser) · **Netværk:** højst 300 kald

**Trin:** 158b havde 8 ungdomsspillere i 2025/26. Dette kort afgør, om fundene gælder bredere.

## Gren
`arbejde/174-statistik-158b-gentagelse-voksne-og-inaktive`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- 158b: eventtabellen er en tidsserie af egne point; 103 uger med ændring og event, 12 med ændring uden event, 4 med event uden ændring. Stikprøven er 8 unge, én sæson.
- Christoffer oplyser, at danske ranglistepoint er permanente og ikke udløber. Ikke målt (kort 158).

## Mål
1. Træk en stratificeret stikprøve af 24 spillere fra `rangliste-point.db`: voksne (≥18) aktive, voksne inaktive (ingen event i ≥12 måneder), ungdom fra andre klubber, 8 pr. gruppe, med fast frø (frøet står i rapporten).
2. Billigere design end 158b: eventtabel (1–2 kald pr. spiller) og ugentlige stande kun for uger, hvor serien viser et hul eller en ændring uden event. Regn kaldloftet ud ≤300.
3. Mål: andel ændringer uden event; om point nogensinde falder uden event (udløb/nedskrivning); om inaktive spilleres point står stille; forskelle mellem grupperne.
4. Rapportér med tal og tydelige forbehold for stikprøvens størrelse.

## Afgrænsning
- **Må røres:** nye filer under `statistik/scripts/` og `statistik/results/`.
- **Må ikke røres:** alle databaser (read-only), `158*` (kun læsning).

## Output
- `statistik/scripts/174-pointaendring-bredere.mjs`
- `statistik/results/174-pointaendring-bredere.md/.json`
- `statistik/results/174-raa-svar/`

## Kontrol
- **Målet:** Stikprøve og frø dokumenteret; tabel pr. gruppe; svar på de tre spørgsmål i punkt 3 med tal. Højst 300 kald.
- **Værnet:** De fem databasers SHA-256 uændrede: `node tools/tjek/db-hashes.mjs` (kort 162) afslutter med kode 0 (ellers sammenlign med fordelingen i `statistik/HASHES.txt`). `git diff --check` uden fejl. `git status --short` viser kun de filer, kortet må røre.
- **Skøn:** (vurdering) om fundene fra 158b holder for voksne.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Falder point uden event, så gæt ikke på årsagen; gem rå svar og list mulige forklaringer som hypoteser. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet de nye filer.

## Resultat
(Udfyldes af Codex.)
