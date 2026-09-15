# Opgave 037 — afklar ID-overlap mellem senior og ungdom, udvid til U17/U19 hvis det forklarer det

**Trin:** Test & Validation (scope-afklaring, ungdom)

**Gren:** `opgave-037-u17-u19-scope`, jf. AGENTS.md.

**Baggrund:** manager (Claude) fandt at match-ID'erne `2286`, `96231`,
`2365`, `2396`, `2509` optræder BÅDE i opgave 013's senior-klassifikation
(`statistik/results/013-manglende-kategorisektioner.md`, fra før ungdom var
i scope) OG i opgave 035's ungdoms-kandidatliste
(`statistik/results/035-ungdom-klassificer-manglende.md`). Da 033/035/036's
scripts filtrerer ungdom som `age_group_id IN (2,3,4,5)` (U09/U11/U13/U15),
er en sandsynlig forklaring at disse kampe reelt er **U17 eller U19** —
aldersgrupper der hverken er i ungdomsfilteret eller reelt er senior, men
som formentlig er faldet ind under samme `age_group_id` som senior (fx
`age_group_id = 1`) fordi de aldrig er blevet udskilt.

**Chris' svar (2026-09-15):** "U17 og U19 er som minimum med hvis det
løser problemet" — dvs. hvis Fase A nedenfor bekræfter forklaringen, skal
U17/U19 tilføjes til ungdomsscope, ikke kun noteres som en kuriositet.

---

## Mål

**Fase A — afklar (stop her og rapportér før Fase B):**
1. List alle distinkte `age_group_id`-værdier i `competitions`-tabellen,
   med et par eksempler på `league_raw`/`name_raw` for hver, så det er
   tydeligt hvilken værdi der (om nogen) dækker U17 og U19.
2. Slå de fem konkrete overlap-ID'er (2286, 96231, 2365, 2396, 2509) op:
   hvilken `age_group_id` har de reelt i databasen, og hvad er deres
   `league_raw`/`name_raw`?
3. Konkludér eksplicit: bekræfter dette at overlappet skyldes U17/U19 der
   fejlagtigt ligger i samme `age_group_id` som senior — eller er
   forklaringen noget andet (fx en anden form for dubletsag)? Skriv
   konklusionen som et tal/fund, ikke en formodning.

**Fase B — kun hvis Fase A bekræfter U17/U19-forklaringen:**
4. Udvid ungdomsscope til at inkludere U17/U19's `age_group_id`(er).
5. Genkør målingerne fra opgave 033, 035 og 036 med det udvidede filter
   (samme metoder, samme scripts, opdateret `age_group_id`-liste), og skriv
   opdaterede resultater — enten som nye versioner af 033/035/036-filerne
   på denne gren, eller som en klart mærket "inkl. U17/U19"-tilføjelse.
   Vælg selv hvilket der er mindst forvirrende, men gør det eksplicit i
   filen hvilket der er facit.
6. Opdatér `docs/statistik-plan.md` og `docs/BESLUTNINGER.md`s
   2026-09-15-poster (fra opgave 034) så de afspejler U09-U19, ikke kun
   U09-U15 — som en tilføjelse/rettelse til 034's tekst, ikke en ny
   sideløbende beslutning.

**Hvis Fase A IKKE bekræfter forklaringen:** stop efter Fase A, skriv
fundet ind i resultatnoten, og skriv et nyt "Spørgsmål"-afsnit til Chris i
stedet for at gætte videre.

## Kontekst

De tre grene `opgave-033-...`, `opgave-035-...`, `opgave-036-...` og
`opgave-034-...` er alle pushet, men **ikke merget til main endnu** — der
er stadig mulighed for at rette scope før beslutningen låses fast. Se
`work/loeste/033-...`, `work/loeste/034-...` og de to åbne opgavekort for
033/036's fulde historik og metode.

## Afgrænsning

**Må røres:** nyt script i `statistik/scripts/` for Fase A (og evt.
genbrug/tilpasning af 033/035/036's scripts for Fase B),
`statistik/results/037-...md` (+ `.json`). Hvis Fase B udføres: også
`statistik/results/033-...`, `035-...`, `036-...` (opdateret med U17/19),
`docs/statistik-plan.md`, `docs/BESLUTNINGER.md` (kun 2026-09-15-ungdoms-
posterne).

**Må ikke røres:** `statistik/data/*.db` (kun læsning). Senior-specifikke
tal der ikke er en del af overlap-undersøgelsen.

## Kontrol

**Målet:** et eksplicit svar på om de fem overlap-ID'er er U17/U19, med
`age_group_id`-værdien som bevis. Hvis Fase B køres: opdaterede tal for
ungdomsholdkampe inkl. U17/U19, og en tydelig markering af at
033/035/036/034's oprindelige tal (U09-U15 kun) er erstattet/udvidet.

**Værnet:** de oprindelige 033/035/036-branches ændres ikke i sig selv
(denne opgave kører på sin egen gren) — kun hvis Chris beder om at merge
037's udvidede tal ind over dem.

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
