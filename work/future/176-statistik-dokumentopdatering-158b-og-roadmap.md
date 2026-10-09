# Opgave 176 — opdatér dokumenter efter 158b og den nye hentestandard (kun tekst, ingen kode)

**Status:** `work/future/` — IKKE i køen. Flyttes til `work/aabne/` først når Christoffer siger det (se `work/future/000-kortplan-boelger-og-afhaengigheder.md`).  
**Kategori:** statistik · **Bølge:** 1 · **Afhænger af:** 162; 158b færdig (er det) · **Netværk:** ingen

**Trin:** Små, afgrænsede tekstrettelser, så fremtidige sessioner ikke arbejder ud fra forældet viden.

## Gren
`arbejde/176-statistik-dokumentopdatering-158b-og-roadmap`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- Repoet er kilden; claude.ai-projektets dokumenter er et spejl og kan være bagud. Dette kort retter kun i repoet.
- `statistik/AGENTS.md` afsnittet `Ranglisten` mangler 158b's fund. Rodens `AGENTS.md` afsnit `Hvad du ikke kan stole på` nævner `build3.py` som ukørbar, men kort 022 (build3 køreklar) ligger i `work/loeste/`: afsnittet skal efterses mod virkeligheden.
- `docs/roadmap.md` er sidst opdateret 2026-09-07 (punkt 7: B3 afhænger nu af beslutningen 2026-09-15 om SQLite i stedet for Sheets; punkt 3: teknikbane = loft, besluttet 2026-10-09).

## Mål
1. Tilføj til `statistik/AGENTS.md`, afsnittet `Ranglisten`, 4–8 linjer: eventtabellen er en tidsserie af egne point (stand før eventet; 251 af 293 sammenlignelige rækker matcher ugen før); ca. 10 % af ugerne ændrer point uden event (kun 8 unge, 2025/26); "Sæsonskifte" og "Afbud" er ikke kampe; Cookiebot/reCAPTCHA i HTML er ikke et stopsignal.
2. Efterse rodens `AGENTS.md` afsnit `Hvad du ikke kan stole på` punkt for punkt mod repoet (kør `grep` for stierne). Ret kun det, der kan bevises forældet, og list resten som "ikke tjekket".
3. I `docs/roadmap.md`: ret kun punkt 3 (teknikbane afklaret: loft) og tilføj en linje under punkt 7 om 2026-09-15-beslutningen. Overhold "numre er permanente".
4. Lav listen "spejlfiler der sandsynligvis er forældede" ud fra de 23 dokumenter i claude.ai-projektet (navnene står i projektbeskrivelsen); marker kun, hvilke repo-filer de svarer til. Ret ikke i spejlet.

## Afgrænsning
- **Må røres:** `statistik/AGENTS.md` (kun afsnittet `Ranglisten`), rodens `AGENTS.md` (kun afsnittet `Hvad du ikke kan stole på`), `docs/roadmap.md` (kun punkt 3 og 7).
- **Må ikke røres:** alt andet, især `docs/BESLUTNINGER.md`, `docs/historik/`, kode.

## Kontrol
- **Målet:** `git diff --stat` viser kun de tre filer. Hver ændret påstand har en kilde (kortnummer eller grep-resultat) i Resultat.
- **Værnet:** `git diff --check` uden fejl. Ingen database berørt.
- **Skøn:** (vurdering) om en ny session ville blive vildledt af de resterende afsnit.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.

## Ved tvivl
Er du i tvivl om en påstand er forældet, så lad den stå og list den. Skriv i `## Spørgsmål`; gæt ikke, skriv "ukendt" og gem evidensen.

## Spørgsmål
(Tomt.)

## Tilbagefald
`git checkout` på de tre filer.

## Resultat
(Udfyldes af Codex.)
