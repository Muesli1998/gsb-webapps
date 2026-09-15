# Opgave 028 — byg B1 Kampkalender (webvisning + Google Calendar-sync)

**Kategori:** Kampkalender (B1)
**Status:** work/future/ — IKKE aktiv. Flyttes til work/aabne/ først når
Chris giver signal, jf. AGENTS.md's prioritetsregel. Dette er den
STØRSTE af de foreløbige kort — overvej at splitte web-visning og
Calendar-sync i to separate opgaver når den aktiveres, jf. "Skøn"
nedenfor.

---

## Mål

Byg B1 fra `docs/planlagte-features-spec.md`: en webvisning i GSB-appen
af ALLE klubbens holdkampe (ungdom, senior, veteran), plus en separat
Google Calendar-sync for et udvalgt scope (GSB 1-7, 40+ 1.hold, 50+
1.hold) til Chris' egen kalender.

## Kontekst

Fuldt specificeret og — ifølge specfilen selv — **"INGEN
tilbageværende blokerende spørgsmål — kun eksplicit byg-signal
mangler."** Se `docs/planlagte-features-spec.md`s B1-afsnit for det
fulde, allerede aftalte design: datakilder (`calendarEvents`,
`badmintonPlayerTeamFights`), Google Apps Script-arkitekturen for selve
kalender-skrivningen (kører under Chris' eget login, IKKE en
Netlify-funktion), tag-baseret genkendelse af "samme kamp, ny tid"
(`event.setTag('nembadmintonMatchId', matchId)`), og den bevidste
beslutning om at ignorere aflyste kampe (2026-09-03).

**Vigtigt teknisk skel, IKKE til at overse:** web-visningen er almindelig
klientkode i GSB-appen (samme teknologi som resten af sitet). Selve
Google Calendar-SKRIVNINGEN er et separat Google Apps Script-projekt,
IKKE versionsstyret i dette repo, kørende under Chris' eget
Google-login — se specfilens eget "DISCLAIMER"-afsnit for konsekvenserne
(personligt ejerskab, ikke klub-institutionelt; egne kvoter; bør
eksporteres til Dropbox som backup).

**Resterende åbne, ikke-blokerende spørgsmål (specfilen selv):**
- Skal resultatet vises inline i kalenderen, eller kun et link?
- Skal kalenderen være sin egen side i navigationen, eller en widget?
- Skal den endelige version skrive til Chris' testkalender (omdøbt) eller
  en ny, tredje kalender?

Disse skal afklares med Chris FØR bygning starter — se "Ved tvivl".

## Afgrænsning

**Må røres:** ny side/komponent i `apps/netlify-prod/public/` til
web-visningen, et NYT selvstændigt Google Apps Script-projekt til
Calendar-sync'en (uden for repoet, i Chris' egen Google-konto — dokumentér
i stedet en eksporteret kopi under `docs/historik/` eller en ny fil i
`docs/`, som roadmap.md selv anbefaler for Ungdomssparrings tilsvarende
script).

**Må ikke røres:** det eksisterende Ungdomssparring Apps Script-projekt
(et NYT, separat projekt skal oprettes — ikke en udvidelse af det
eksisterende, jf. specfilens eksplicitte anbefaling), `statistik/`,
Dream Team-rørets eksisterende Sheets/Netlify-arkitektur.

## Kontrol

**Målet:**

Web-visningen: manuel test af at ALLE klubbens hold (ikke kun GSB 1-4)
vises korrekt, ufiltreret.

Calendar-sync: manuel test mod en TESTKALENDER (Chris har allerede
oprettet én til proof-of-concepten, jf. specfilen) — ALDRIG direkte mod
Chris' rigtige, håndlavede kalender uden eksplicit bekræftelse af hvilken
kalender der er target.

**Værnene:**

```
git diff --stat main..arbejde/028-kampkalender-b1-web-og-calendar-sync
```

Må ikke vise ændringer i `statistik/`, Dream Team-rørets eksisterende
Sheets-integrationsfiler, eller Ungdomssparrings eget Apps Script.

**Skøn:**

- Overvej at splitte denne i to opgaver (web-visning / Calendar-sync) når
  den aktiveres — de er teknisk uafhængige, og web-visningen alene giver
  værdi selv hvis Calendar-sync'en tager længere tid.

## Ved tvivl

De tre åbne, ikke-blokerende spørgsmål (inline resultat vs. link,
navigationsplacering, hvilken kalender) skal svares af Chris FØR
bygningen af den pågældende del starter — antag ikke et svar, spørg. Er
det uklart hvilken Google-konto/testkalender der skal bruges til
Calendar-sync-testen, så stop helt frem for at risikere at skrive til
Chris' rigtige kalender ved en fejl.

## Gren

`arbejde/028-kampkalender-b1-web-og-calendar-sync`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Svar på de tre åbne spørgsmål:**

**Commits:**
