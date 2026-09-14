# Opgave 011 — arkivér gsb-dropbox-filstruktur.md som historik

**Trin:** Test & Validation

---

## Mål

`gsb-dropbox-filstruktur.md` findes i repoet under `docs/historik/`,
tydeligt mærket som en beskrivelse af en **forældet** arkitektur — ikke
som aktiv reference.

## Kontekst

Filen er skrevet 2026-09-12 og beskriver en git-opsætning med **to
separate repos** (`gsb-projekt-docs-backup` og `gsb-kampsystem-kilde`),
hver med sit eget PowerShell-script kørt af Christoffer. Denne opsætning
blev **erstattet dagen efter** (2026-09-13) af monorepo-beslutningen i
`docs/BESLUTNINGER.md` — alt samlet i ét repo, `gsb-webapps`.

Filen er altså ikke bare umigreret, den er **faktuelt forkert som
beskrivelse af nutiden**: de to repos den beskriver findes ikke længere
i den form. Migreres den som almindelig reference i `docs/`, planter man
en forkert beskrivelse af den aktuelle struktur midt i repoet — præcis
den slags drift `AGENTS.md`s "Hvad du ikke kan stole på" findes for at
undgå.

Løsningen er ikke at droppe filen — den dokumenterer et reelt forløb
(inkl. et konkret lærestykke om en tabt idébank-fil 2026-09-05, og
regler om Dropbox-mappenavne der stadig kan være relevante at kende
historien til) — men at lægge den i `docs/historik/`, som netop er
stedet for indhold der "beskriver fortiden korrekt" og ikke skal rettes
som om det var facit, jf. `AGENTS.md`.

**Fuldt indhold til flytning er vedhæftet i chatten, som en separat
fil.** Kopiér det ordret, men tilføj en kort indledende note (se
"Kontrol" for det præcise krav) der markerer den som historisk.

## Afgrænsning

**Må røres:** ny fil `docs/historik/dropbox-filstruktur-2026-09-12.md`
(dato i filnavnet, fordi indholdet netop er tidsbundet).

**Må ikke røres:** alt andet.

## Kontrol

**Målet:**

```
test -f docs/historik/dropbox-filstruktur-2026-09-12.md
```

Skal findes.

```
head -5 docs/historik/dropbox-filstruktur-2026-09-12.md
```

De første linjer skal indeholde en tydelig note om at filen er
**forældet/historisk**, og at den er erstattet af monorepo-strukturen
beskrevet i `docs/BESLUTNINGER.md` (2026-09-13). Formuleringen er fri,
men noten skal stå der.

```
git diff --stat main..arbejde/011-arkiver-dropbox-filstruktur
```

Skal vise **præcis én ny fil**.

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
grep -ril "gsb-dropbox-filstruktur\|dropbox-filstruktur" docs/ --include="*.md" | grep -v historik
```

Kør denne **før** ændringen. Refererer noget andet aktivt dokument til
den gamle fil, skal referencen enten opdateres til at pege på den nye
historik-placering, eller nævnes i resultatnoten.

**Skøn:**

- Selve sagsindholdet (Dropbox-mappenavne, lærestykket om den tabte
  idébank-fil, sikkerhedsflaget om en credential-lignende fil i
  Dropbox-roden) bevares ordret — kun en indledende note tilføjes.

## Ved tvivl

Er der noget i filen der stadig er aktuelt og ikke kun historisk (fx
sikkerhedsflaget om `gsbdreamteam-b79726885661.json` i Dropbox-roden,
hvis den stadig ligger der) — stop og spørg om det skal trækkes ud til
et separat, aktivt dokument, fremfor at begrave en uløst sikkerhedsting
i historik-mappen.

## Gren

`arbejde/011-arkiver-dropbox-filstruktur`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
Før: begge stier fandtes; indholdet afveg kun ved den daterede fils
syvlinjers FORÆLDET / HISTORISK-note.
Efter: kun docs/historik/dropbox-filstruktur-2026-09-12.md findes.
```

**Fandtes der aktive referencer til den gamle fil? Hvad blev gjort:**

Ja. `docs/planlagte-features-spec.md` pegede på den udaterede sti og er
opdateret til den daterede historikfil.

**Sammenlignede stier:**

- `docs/historik/dropbox-filstruktur.md`
- `docs/historik/dropbox-filstruktur-2026-09-12.md`

**Afgørelse:**

Dedupliceret. Den oprindelige historikfil er flyttet med Git til den
daterede, kanoniske sti; den præciserende historiknote er bevaret.

**Commits:**
`f93aff6` — erstattet ved amend med resultatnoten udfyldt.
