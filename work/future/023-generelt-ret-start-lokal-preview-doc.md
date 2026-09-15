# Opgave 023 — ret START_LOKAL_PREVIEW.txt's forkerte .env-påstand

**Kategori:** Generelt (teknisk gæld / dokumentation)
**Status:** work/future/ — IKKE aktiv. Flyttes til work/aabne/ først når
Chris giver signal, jf. AGENTS.md's prioritetsregel.

---

## Mål

`apps/netlify-prod/START_LOKAL_PREVIEW.txt` skal beskrive den faktiske
opsætning korrekt, ikke love en `.env`-fil der ikke findes.

## Kontekst

`AGENTS.md` siger direkte: *"`apps/netlify-prod/START_LOKAL_PREVIEW.txt`
lyver. Den lover at der ligger en `.env` med Google-nøglen i mappen. Det
gør der ikke; nøglerne ligger i Dropbox under `secrets\`."*

Filens nuværende tekst: *"Filen .env indeholder allerede jeres Google
service-konto-nøgle, så du IKKE selv skal sætte noget op — bare start
den."* Det er den sætning der skal rettes, plus opskriften skal udvides
med det skridt der reelt mangler: kopiér nøglen fra Dropbox' `secrets\`
(sti findes via `config.local.json`s `secrets`-nøgle) ind som `.env` før
`npx netlify-cli dev` køres.

## Afgrænsning

**Må røres:** `apps/netlify-prod/START_LOKAL_PREVIEW.txt` alene.

**Må ikke røres:** selve appkoden i `apps/netlify-prod/`, andre
dokumenter.

## Kontrol

**Målet:**

```
grep -n "indeholder allerede" apps/netlify-prod/START_LOKAL_PREVIEW.txt
```

Skal give nul træf (den gamle, forkerte sætning skal være væk).

```
grep -n "secrets" apps/netlify-prod/START_LOKAL_PREVIEW.txt
```

Skal give mindst ét træf — instruktionen om at hente nøglen fra Dropbox
skal stå der.

**Værnene:**

```
git diff --stat main..arbejde/023-generelt-ret-start-lokal-preview-doc
```

Skal KUN vise `apps/netlify-prod/START_LOKAL_PREVIEW.txt`.

**Skøn:**

- Behold resten af filens struktur og tone — det er kun .env-løgnen og
  det manglende kopieringsskridt der rettes, ikke en omskrivning.

## Ved tvivl

Er det uklart om `.env`-formatet (hvilke variabelnavne Google-nøglen skal
have) matcher det appen faktisk forventer, så stop og skriv det under
"Spørgsmål" i stedet for at gætte et variabelnavn.

## Gren

`arbejde/023-generelt-ret-start-lokal-preview-doc`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Commits:**
