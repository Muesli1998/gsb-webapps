# Opgave 195 — Codex må kun skrive i kortets Spørgsmål og Resultat, via scriptet `skriv-kort-afsnit.mjs`

**Status:** `work/aabne/` — besluttet af Christoffer 2026-10-10.
**Kategori:** generelt · **Bølge:** 1 · **Afhænger af:** ingen · **Netværk:** ingen

**Trin:** Under første netværkskørsel af kort 172 (2026-10-10) omskrev Codex hele kortfilen i en forkert tegnkodning (æøå dobbeltkodet, blandede linjeskift), og overvågningen stoppede kørslen. Værktøjet `tools/skriv-kort-afsnit.mjs` kan kun udskifte teksten i `## Spørgsmål` eller `## Resultat`. Kortet gør det til den eneste tilladte skrivemetode og skriver reglen ind i runnerens prompt og i `AGENTS.md`.

## Gren
`arbejde/195-kortskrivning-kun-afsnit`, fra `main`. Christoffer opretter grenen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, ingen Co-Authored-By, ingen sub-agents.

## Baggrund
- `tools/skriv-kort-afsnit.mjs` og `tools/test-skriv-kort-afsnit.mjs` ligger på `main` (testet 46/46 på Linux og 45/45 på Windows, gennemgået af Codex i en anden chat).
- Brug: `node tools/skriv-kort-afsnit.mjs <repo-relativ kortsti> <Spørgsmål|Resultat> <tekstfil> [--tilfoej]`. Tekstfilen skal ligge i repoet (fx `work/koersler/<nr>/tekst.md`, som er ignoreret af git) eller være `-` for stdin. Scriptet afviser absolutte stier, `..`, stier uden for `work/aabne|future|arkiv` og tekst med linjer, der starter med `## `. Alle fejl slutter med "Skriv ikke hele kortfilen som fallback. Stop og rapportér fejlen."
- Runnerens prompt står i `tools/koer-kort.ps1`. Den indeholder i dag linjen "Du skal altid udfylde afsnittene Spørgsmål og Resultat i selve kortfilen, også hvis Afgrænsningen ikke nævner den." Runneren indeholder desuden parameteren `-ForventetKortHash`; den må ikke røres.
- `AGENTS.md` har afsnittet "Codex på Windows: kendte fejl og hvad man gør". Reglen skal stå dér.

## Mål
1. I `tools/koer-kort.ps1`: erstat kun linjen, der begynder med "Du skal altid udfylde afsnittene", så den lyder (ordret; `<kortnummer>` og `<kortets repo-relative sti>` står som tekst, Codex kender dem fra kortet): "Du skal altid udfylde afsnittene Spørgsmål og Resultat i selve kortfilen, også hvis Afgrænsningen ikke nævner den. Skriv dem KUN med `node tools/skriv-kort-afsnit.mjs <kortets repo-relative sti> <Spørgsmål|Resultat> <tekstfil>` (`--tilfoej` for at tilføje). Gem teksten først i en fil under `work/koersler/<kortnummer>/`; den mappe må du altid bruge. Skriv aldrig hele kortfilen: ikke med Set-Content, Out-File, WriteAllText, apply_patch eller nogen anden metode. Fejler scriptet, så stop og skriv fejlen i dit slutsvar." Ret ikke andet i runneren.
2. I `AGENTS.md`, afsnittet "Codex på Windows": tilføj et nyt afsnit **"Kortfiler: skriv kun i Spørgsmål og Resultat, aldrig hele filen."** lige efter afsnittet om `apply_patch`. Indhold: hændelsen (172, 2026-10-10; æøå dobbeltkodet; overvågningen stoppede kørslen; værktøjet, der skrev, er ukendt), reglen, kommandoen, og at `kort_koer_net`-overvågningen afbryder en kørsel, hvis kortets faste del ændres. Højst 12 linjer. Ret ikke andre afsnit i filen.
3. Skriv i `## Resultat`, hvad der præcis blev ændret (linjenumre i begge filer).

## Afgrænsning
- **Må røres:** `tools/koer-kort.ps1` (kun den ene promptlinje), `AGENTS.md` (kun det nye afsnit), samt dette korts Spørgsmål og Resultat (skrives med `tools/skriv-kort-afsnit.mjs`).
- **Må ikke røres:** alle andre filer. Især ikke `-ForventetKortHash`-koden, parameterlisten, `tools/skriv-kort-afsnit.mjs`, `tools/test-skriv-kort-afsnit.mjs`, andre kort, databaser, `apps/netlify-prod/`.
- Ingen netværkskald. Ingen nye pakker.

## Output
- `tools/koer-kort.ps1` (én linje ændret)
- `AGENTS.md` (nyt afsnit)
- Dette korts `## Resultat`

## Kontrol
- **Målet:** `git diff --stat` viser kun de to filer plus kortet. Diffen i `tools/koer-kort.ps1` er præcis den ene promptlinje. Diffen i `AGENTS.md` er kun det nye afsnit.
- **Værnet:** `node tools/test-skriv-kort-afsnit.mjs` afslutter med kode 0. Runneren kan stadig læses af PowerShell: `powershell -NoProfile -Command "$null = [scriptblock]::Create((Get-Content -Raw tools/koer-kort.ps1))"` giver ingen fejl. `powershell -NoProfile -ExecutionPolicy Bypass -File tools/koer-kort.ps1 -Kort 195 -Toer` viser den nye prompttekst (kør ikke uden `-Toer`). `git diff --check` uden fejl. Kortfilens bytes uden for `## Spørgsmål` og `## Resultat` er uændrede efter kørslen (`git diff` på kortet viser kun de to afsnit).
- **Skøn:** (vurdering) om reglen i prompten er utvetydig nok til, at Codex ikke selv finder på en anden skrivemetode.

## Shell
Din almindelige shell starter ikke på denne maskine (`setup refresh had errors`). Kør alle kommandoer med **forhøjet adgang**; Christoffer godkender hver gang. Se rodens `AGENTS.md`, afsnittet om Codex på Windows. Fejler `apply_patch`, brug metoden i samme afsnit.
**Dette kort kører, før reglen er indbygget i runneren.** Skriv derfor `## Spørgsmål` og `## Resultat` i dette kort KUN med `node tools/skriv-kort-afsnit.mjs work/aabne/195-generelt-kortskrivning-kun-afsnit.md <Spørgsmål|Resultat> work/koersler/195/tekst.md`. Rediger aldrig selve kortfilen på anden måde. Fejler scriptet, så stop og skriv fejlen i dit slutsvar.

## Ved tvivl
Gæt ikke. Passer den eksisterende promptlinje ikke til beskrivelsen, så ret ingenting og skriv forskellen i `## Spørgsmål`.

## Spørgsmål
Ingen spørgsmål.

## Tilbagefald
`git restore tools/koer-kort.ps1 AGENTS.md`. Ingen database er berørt.

## Resultat
Ændret tools/koer-kort.ps1: promptlinje 94 instruerer nu udelukkende brug af skriv-kort-afsnit.mjs til Spørgsmål/Resultat og forbyder omskrivning af hele kortfilen. AGENTS.md: nyt afsnit indsat efter apply_patch-vejledningen; det fylder linje 142–145 og beskriver hændelsen, skrive-reglen og kort_koer_net-overvågningen.
