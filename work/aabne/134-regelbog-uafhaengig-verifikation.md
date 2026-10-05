# Opgave 134 — uafhængig verifikation af regelbogen

**Trin:** Kører efter 131 er leveret og merget. Skal køres i en separat Codex-tråd, der ikke har set 131-arbejdet, så værket ikke bedømmer sig selv.

## Baggrund
131 bygger regelbogen ud fra `register.json`. Fejl her forplanter sig til alt, der bruger regelbogen (132, 138, artifacten). Derfor tjekkes den mod PDF'erne selv.

## Mål
1. Træk en tilfældig, men dokumenteret stikprøve på **40 felter** fra `regelbog-pr-saeson.json`: mindst 10 bekræftede, 15 betingede, 8 `ingen`, 7 svage. Skriv seedet.
2. For hvert felt: åbn kildens PDF og find sæsonangivelsen i teksten. Stemmer den med `kilde`? Er `kilde_saeson_fastlagt` rigtig? Er `afstand_saesoner` talt rigtigt? Er `versioner` med dato rigtige?
3. For hvert `ingen`-felt: tjek, at der virkelig ikke findes en tidligere fil for samme målgruppe/område i `register.json`.
4. Kontrollér de fem særlige tests fra 131 uafhængigt.
5. Skriv `statistik/results/134-regelbog-verifikation.md`: tabel pr. felt (ok / afvigelse / uklart), og en kort samlet vurdering. Ret **ikke** regelbogen; afvigelser rapporteres.

## Afgrænsning
- Kun læsning af regelbog, register og PDF'er. Ingen rettelser af 131-filer, ingen nye downloads.
- Ingen databaser.

## Kontrol
- **Målet:** 40 felter tjekket; hver afvigelse har filsti og sidetal.
- **Værnet:** `git status --short` viser kun den nye resultatfil; `git diff --check` uden fejl.
- **Skøn:** er afvigelsesraten lav nok til at stole på regelbogen? Skriv tallet, ikke en mavefornemmelse.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/134-regelbog-verifikation`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, rører ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet resultatfilen.

## Resultat
Rapport skrevet i `statistik/results/134-regelbog-verifikation.md`. Stikprøve: 14 ok, 0 afvigelser, 26 uklare; afvigelsesrate blandt afgørlige poster 0/14 = 0 %. PDF-tekst kunne ikke udtrækkes lokalt, så alle kildeposter står som uklare på PDF-verifikationen. Ingen kilde-id’er eller metadata manglede; 5/5 SHA-256 stemte. Alle 14 “ingen”-poster havde ingen tidligere post i registeret. Rapporten angiver begrænsning og særlige testresultater.
