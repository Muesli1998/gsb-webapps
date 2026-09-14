# Opgave 018 — afklar de 24 "no_linked_team_matches_in_current_database"-rækker

**Trin:** Test & Validation

Dette er en **undersøgelse**, ikke en rettelse. Formålet er at afgøre om
det er en kobling-/matchingfejl i stillingskontrollens metode (015),
eller et reelt datahul.

---

## Mål

For hver af de 24 puljer hvor 015's stillingskontrol fandt nul linkede
holdkampe i databasen, afgøre om kampene reelt mangler, eller om de
findes i databasen men ikke blev fundet af 015's sammenligningsmetode.

## Kontekst

`statistik/results/015-stillingskontrol.md` sammenlignede stillingens
holdnavn (normaliseret — "udgået", "trukket" og "(O)" fjernet kun til
sammenligningen) mod hjemme/ude-feltet i `team_matches` inden for samme
`competition`. 24 rækker fik status
`no_linked_team_matches_in_current_database`: stillingen viser et
kampantal større end nul, men sammenligningen fandt intet i databasen
for netop den pulje.

Det er usandsynligt at en hel pulje reelt har nul registrerede kampe, når
andre sæsoner er velbefolkede (2.818 holdkampe totalt). Den mere
sandsynlige forklaring er at label- eller pulje-ID-matchingen i 015
fejler for disse 24 specifikt — fx en stavevariant der ikke blev
normaliseret, eller at kampene ligger under et andet
sæson-/pulje-nummer i databasen end det stillingen refererer til.

## Afgrænsning

**Må røres:** `statistik/` — nyt script, ny rapport under
`statistik/results/`, `statistik/TEST_RUN_LOG.md`. `docs/statistik-plan.md`
må kun røres hvis konklusionen ændrer status for "Kampantal er holdt op
mod stillingerne" markant (fx hvis alle 24 viser sig at være
kobling-fejl) — i så fald kun den ene, relevante sætning.

**Må ikke røres:** databasen `statistik/data/*.db`. Denne opgave
undersøger — den retter ikke koblingen i 015's script eller skriver nye
feltværdier. Heller ikke `docs/historik/`, `apps/netlify-prod/` eller
Dropbox' `_arkiv\`.

## Kontrol

**Målet:**

```
ls statistik/results/ | grep -i "no-linked\|kobling\|unresolved-standings"
```

Skal give mindst én ny rapportfil.

```
grep -c "018" statistik/TEST_RUN_LOG.md
```

Skal være mindst 1.

For hver af de 24 rækker (pulje-ID, sæson, stillingens holdnavn): forsøg
en alternativ søgning i databasen (fx uden krav om eksakt pulje-ID-match,
en bredere navnesøgning inden for samme sæson, eller opslag i den rå
discovery-data for om pulje-ID'et overhovedet findes andre steder).
Konklusion pr. række: enten "kobling-fejl — fundet under [alternativ
nøgle/forklaring]" eller "reelt hul — ingen kampe fundet nogen steder for
denne pulje efter udvidet søgning".

**Værnene:**

```
git status --short statistik/data/
```

Skal være tom.

```
git diff --stat main..arbejde/018-afklar-no-linked-stillinger
```

Må ikke vise ændringer i `apps/`, `kampsystem/`, `docs/historik/` eller
`data/`.

**Skøn:**

- Konklusionen pr. pulje skal bygge på en faktisk forsøgt alternativ
  søgning — ikke antages ud fra mønsteret i de andre 23.

## Ved tvivl

Kan en række hverken bekræftes som kobling-fejl eller reelt hul (fx fordi
pulje-ID'et slet ikke findes nogen steder i den rå discovery-data,
hverken i databasen eller de gemte payloads), så stop og skriv den under
"Spørgsmål" i stedet for at gætte.

## Gren

`arbejde/018-afklar-no-linked-stillinger`

---

## Spørgsmål

## Tilbagefald

## Resultat

**Kontroloutput — før og efter:**

```
```

**De 24 rækker (pulje-ID, sæson, konklusion):**

**Ændrer dette "Kampantal er holdt op mod stillingerne"s status i docs/statistik-plan.md:**

**Commits:**
