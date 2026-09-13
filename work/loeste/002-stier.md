# Opgave 002 — opdatér sti- og mappereferencer

## Mål

Opdatér de seks levende plan- og idébankdokumenter, så deres fysiske sti- og mappereferencer beskriver den aktuelle `gsb-webapps`-struktur uden at ændre produktindholdet.

## Afgrænsning

**Må røres:** `docs/roadmap.md`, `docs/idebank-kampsystem.md`,
`docs/idebank-statistik.md`, `docs/idebank-feature.md`,
`docs/idebank-generel.md`, `docs/planlagte-features-spec.md` og denne
opgavefil.

**Må ikke røres:** alle øvrige filer og mapper, særligt `docs/historik/` og
Dropbox' `_arkiv/`.

## Kontekst

`AGENTS.md` er strukturreferencen. Kun forekomster, der er fysiske placeringer,
skal opdateres. Produktnavnene "GSB Dream Team" og "Kampsystem" samt historiske
Netlify-statusser bevares, når de ikke beskriver en mappe.

## Acceptkriterier

- Ingen af de seks dokumenter indeholder en sti under `Dropbox\`.
- Ingen forekomst af de udfasede mappenavne bruges som aktuel fysisk placering.
- Alle opdaterede repo-referencer findes i den aktuelle struktur.
- Produktnavnet "GSB Dream Team" står urørt, når det er en titel, UI-tekst eller
  produktbeskrivelse.
- `docs/historik/` og Dropbox' `_arkiv/` er ikke ændret.

## Ved tvivl

Stop og skriv spørgsmålet under "Spørgsmål". Gæt ikke.

## Gren

`arbejde/002-stier`

## Spørgsmål

Ingen ved oprettelse.

## Resultat

Gennemført 2026-09-13. De fem dokumenter med forældede referencer er
opdateret til den aktuelle struktur (`docs/`, `kampsystem/`,
`apps/netlify-prod/` og `data/`). `docs/idebank-generel.md` var allerede
fri for fysiske sti- og mappereferencer og er derfor ikke ændret.

Valideret med en målrettet søgning efter alle udfasede stier, mappenavne og
gamle dokumentnavne samt `git diff --check`. Den eneste søgetræffer for
"GSB Dream Team" er en menuetiket og er bevidst urørt. `docs/historik/` og
Dropbox' `_arkiv/` er ikke ændret.
