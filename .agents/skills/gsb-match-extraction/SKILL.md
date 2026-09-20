---
name: gsb-match-extraction
description: Extract GSB holdkamp data from Nembadminton and BadmintonPlayer for a new season, an incremental in-season run, or a documented match gap, with source validation and normalized SQLite handoff. Do not use for unrelated statistics, reporting, or database maintenance.
---

# GSB holdkampudtræk

Brug kun denne skill i `gsb-webapps` til holdkampudtræk fra Nembadminton/BadmintonPlayer og overdragelse til projektets eksisterende normaliserede format. Den er ikke en generel statistik- eller databaseskill.

1. Find repo-roden, læs `AGENTS.md` og `statistik/AGENTS.md`, og læs derefter **hele** `statistik/CODEX_EXTRACTION_SKILL.md` før udtræksarbejde. Repo-dokumentet er den kanoniske, detaljerede procedure og scriptoversigt. Findes det ikke, så stop og bed om den korrekte repo-version; improvisér ikke en ny rute.
2. Afgør om opgaven er sæsonstart eller inkrementel kørsel. Ved sæsonstart skal kilder, felter, ID'er og mulige sæsonregelændringer verificeres og kildebelægges. Midt i sæsonen genbruges en verificeret sæsonprofil med en lille kildesundhedskontrol; fuld regelundersøgelse genåbnes kun ved ændring eller manglende profil.
3. Kræv en demonstreret render-gate for en automatisk BadmintonPlayer-rute før masseudtræk. Rå kilde, identitet, URL, tidspunkt og fejl gemmes før fortolkning. En eksisterende JSON-fil tæller kun som færdig, hvis den er verificeret.
4. Kortlæg kun verificerede rå felter til det eksisterende normaliserede SQLite-format, og sammenlign mod den faktiske database read-only før en importplan godkendes. Respektér opgavens scope: skillen autoriserer ingen scriptændring, masseudtræk eller DB-skrivning i sig selv. Hold kildeudtræk og SQLite-import adskilt, og kør efterkontroller først efter en særskilt autoriseret import. Hvis den automatiserede rute stadig fejler, stop masseudtrækket og rapportér begrænsningen.
