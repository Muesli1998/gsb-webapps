# Opgave 027 — verificér Chris' manuelle Sheet-rettelser mod den nye navnefacit-liste

**Kategori:** Dream Team/Tilmelding
**Status:** work/future/ — IKKE aktiv. Flyttes til work/aabne/ først når
Chris giver signal, jf. AGENTS.md's prioritetsregel.

---

## Mål

Tjek om allerede-importerede 26/27-runders `Resultater`-rækker og Chris'
egne manuelle rettelser i `Spillerpoint`/`Tilmeldinger` bruger den
korrekte, bekræftede 44-navns facit-stavning (jf. `docs/roadmap.md`
punkt 8, tyvende runde) — og om nogen spillere derfor mangler point pga.
en gammel stavevariant der ikke matcher facit.

## Kontekst

Navnealias-opslaget (`apps/netlify-prod/netlify/lib/navne.js`) blev
shippet og retter fremadrettede imports automatisk. Men allerede
skrevne `Resultater`-rækker er IKKE rettet med tilbagevirkende kraft —
`Spillerpoint`-arkets SUMIFS-formler matcher stadig mod den RÅ tekst i
`Resultater`. Roadmap.md's egen "afventer"-linje for punkt 8: *"en
linje-for-linje verificering af Chris' egne manuelle Sheet-rettelser mod
den nye 44-navns facit-liste, samt et manuelt tjek af
allerede-importerede 26/27-runder for tabte point."*

Den bekræftede facit-liste (44 navne, 28 herrer + 16 damer) og de
kendte alias findes i `apps/netlify-prod/netlify/lib/navne.js`s
`ALIAS_RAA`-objekt og i `data/navne-alias.json`/
`GSB_NAVNE_ALIAS_OG_ANOMALIER.json`.

**Dette kræver LÆSEADGANG til de rigtige Google Sheets** (`Resultater`,
`Spillerpoint`, `Tilmeldinger` for 26/27-sæsonen) — ikke kun
repo-filerne. Bekræft FØRST at credentials/adgang til dette findes
tilgængeligt i den kørende kontekst (fx via `config.local.json`s
`secrets`-sti og den Google service-konto-nøgle der ligger i Dropbox),
før du går i gang. Er adgangen ikke til stede, kan opgaven ikke
gennemføres som beskrevet — se "Ved tvivl".

## Afgrænsning

**Må røres:** ingenting i repoet medmindre en reel fejl findes — i så
fald KUN den specifikke, forkerte celle/streng i det relevante Google
Sheet (ikke repo-filer), og en ny rapport i `docs/historik/` der
dokumenterer hvad der blev fundet og rettet.

**Må ikke røres:** `apps/netlify-prod/netlify/lib/navne.js` (alias-logikken
er allerede korrekt — denne opgave bruger den, ændrer den ikke), koden i
øvrigt, `statistik/`.

## Kontrol

**Målet:**

En liste over alle 26/27-rækker i `Resultater` hvor et spillernavn IKKE
matcher facit-listen eller et kendt alias — for hver: er personen
identificerbar (dvs. er det en kendt stavevariant), og mangler de point
i `Spillerpoint` som følge af det.

**Værnene:**

Ingen skrivning til Sheets uden at det konkrete fund er dokumenteret
først i resultatnoten — ingen "ret og se hvad der sker".

**Skøn:**

- Kun rettelser af navnestavning der med sikkerhed er den samme person
  (matcher et kendt alias eller er entydigt genkendeligt) — er det
  tvivlsomt om det er samme person, lad det stå og noter det som en
  uafklaret række.

## Ved tvivl

Er Google Sheets-adgangen ikke tilgængelig i den kørende kontekst, så
stop MED DET SAMME og skriv det under "Spørgsmål" — forsøg ikke at
gennemføre opgaven ud fra repoets statiske filer alene, da
`Resultater`/`Spillerpoint`s aktuelle indhold ikke findes i git.

## Gren

`arbejde/027-dreamteam-verificer-navnealias-mod-facit`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Fundne uoverensstemmelser og hvad der blev gjort ved hver:**

**Commits:**
