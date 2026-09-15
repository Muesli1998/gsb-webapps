# Opgave 026 — adgangskode-gate til Admin-siden (index.html)

**Kategori:** Kampsystem/Dream Team (sikkerhed)
**Status:** work/future/ — IKKE aktiv. Flyttes til work/aabne/ først når
Chris giver signal, jf. AGENTS.md's prioritetsregel.

---

## Mål

Tilføj en klientside-adgangskode-gate til `apps/netlify-prod/public/index.html`
(Admin-siden), svarende til den Kampsystemet har — så siden ikke er åben
for enhver der kender URL'en.

## Kontekst

`docs/roadmap.md` punkt 1a: Chris opdagede at der ikke fandtes nogen
`ADMIN_PASSWORD`-environment-variabel på Netlify, hvilket gjorde
`hent-resultater.js`s skrive-endpoint reelt ubeskyttet. **Chris har selv
allerede sat en ny `ADMIN_PASSWORD`-værdi og deployet (bekræftet
2026-09-07)** — den del af punktet er lukket og skal IKKE gøres i denne
opgave.

Det der mangler er selve klientside-gaten: Admin-siden (`index.html`)
har i dag ikke noget kode-felt der skal udfyldes FØR man kan bruge siden
overhovedet — kun det bagvedliggende serverside-tjek når man rent
faktisk trykker "Hent og skriv til arket". Ønsket er en synlig gate
foran hele siden, af samme type som Kampsystemet har (se opgave 025's
research-note: den præcise nuværende implementering af Kampsystemets
gate er ikke bekræftet endnu — undersøg det FØRST og genbrug det
bekræftede mønster, opfind ikke et nyt).

## Afgrænsning

**Må røres:** `apps/netlify-prod/public/index.html`.

**Må ikke røres:** `apps/netlify-prod/netlify/functions/hent-resultater.js`s
eksisterende serverside-adgangstjek (det er allerede korrekt og skal
IKKE dubleres eller erstattes — kun suppleres med en klientside-gate
foran).

## Kontrol

**Målet:**

Manuel funktionstest: uden korrekt kode kan sidens funktioner ikke
tilgås; med korrekt kode fungerer siden som i dag.

```
git diff --stat main..arbejde/026-kampsystem-admin-adgangskode-gate
```

Skal KUN vise `apps/netlify-prod/public/index.html`.

**Værnene:**

Det eksisterende serverside-tjek i `hent-resultater.js` skal stadig
fungere uændret bagefter — klientside-gaten er et ekstra lag, ikke en
erstatning.

**Skøn:**

- Selve koden (adgangskoden Admin-siden skal bruge) er IKKE givet af
  dette kort — det er en beslutning Chris skal tage, ikke noget der skal
  gættes eller genbruges direkte fra Kampsystemets egen kode uden at
  spørge.

## Ved tvivl

Er Kampsystemets nuværende gate-mekanisme ikke fundet/bekræftet (se
opgave 025), eller er det uklart hvilken adgangskode Admin-siden skal
bruge, så stop og skriv det under "Spørgsmål" i stedet for at gætte en
værdi eller opfinde et nyt mønster.

## Gren

`arbejde/026-kampsystem-admin-adgangskode-gate`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**Commits:**
