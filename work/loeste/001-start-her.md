# Opgave 001 — opdater START-HER

## Mål

Omskriv `docs/START-HER.md`, så dokumentet beskriver den nuværende struktur i `gsb-webapps` og bevarer projektets arbejds- og dokumentationsregler.

## Afgrænsning

**Må røres:** `docs/START-HER.md` og denne opgavefil.

**Må ikke røres:** alle øvrige filer og mapper, særligt `docs/historik/` og Dropbox' `_arkiv/`.

## Kontekst

`AGENTS.md` er den gældende strukturreference. Den nuværende `docs/START-HER.md` beskriver den gamle Dropbox-opbygning, et GitHub-repository der aldrig blev oprettet og en backup-protokol, som Git overtog 13. september 2026.

## Acceptkriterier

- `docs/START-HER.md` indeholder ingen sti under `Dropbox\`.
- Dokumentet nævner ingen mappe, der ikke findes i repositoryet.
- Dokumentet nævner intet GitHub-repository ud over `gsb-webapps`.
- Reglerne om arbejdsmetode og dokumentationsskik er bevaret.
- Backupkravet før omskrivning er fjernet og erstattet af Git-baseret versionsstyring.
- `docs/historik/` og Dropbox' `_arkiv/` er ikke ændret.

## Ved tvivl

Stop og skriv spørgsmålet under "Spørgsmål". Gæt ikke.

## Gren

`arbejde/001-start-her`

## Spørgsmål

Ingen.

## Resultat

`docs/START-HER.md` er omskrevet til den aktuelle repositorystruktur. De
gamle placeringshenvisninger og backupkravet er fjernet; arbejdsmetode,
dokumentationsskik, eksplicit byggetilladelse, temp-note-flow og synkronisering
mellem idébank og specifikation er bevaret i Git-baseret form.

Kontroller udført:

- Ingen sti under `Dropbox\`.
- Ingen omtale af det ikke-oprettede dokument-repository.
- Alle eksplicit nævnte repo-filer og mapper findes.
- Ingen placeholdermønstre eller whitespace-fejl i Git-diffen.
- `docs/historik/` og det eksterne `_arkiv/` er ikke ændret.
