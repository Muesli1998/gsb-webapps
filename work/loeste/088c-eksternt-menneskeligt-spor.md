# Opgave 088c — eksternt/menneskeligt spor: BD-kontakt, kendelser, målrettet presse/referater

**Trin:** Del 3 af 3 (088a/088b/088c). Kører PARALLELT med 088a/088b, blokerer ikke på dem — men den
målrettede presse-/referat-søgning (Mål 2-3) bør vente til 088a/088b har identificeret KONKRETE,
uforklarede anomalier at søge efter, i stedet for bred, ustruktureret søgning.

**Gren:** `arbejde/088c-eksternt-menneskeligt-spor`, fra `main`.

**Baggrund:** Nogle spørgsmål kan ikke besvares fra hverken vores egne data eller offentligt tilgængelige
PDF'er — de kræver enten et menneskeligt spørgsmål direkte til Badminton Danmark, eller målrettet søgning
efter konkrete, navngivne hændelser (som Roskilde-anomalien fra 088a) i pressedækning eller
mødereferater. Christoffer er selv klubbestyrelsesmedlem og kan i praksis få svar hurtigere ad den vej
end vi kan grave os frem til det samme.

## Mål

1. **Christoffer kontakter Badminton Danmarks sekretariat/turneringsafdeling** (denne opgave leverer et
   klart, kort spørgsmålsoplæg til ham, det udføres IKKE automatisk — det er et menneskeligt skridt) om:
   a. Den konkrete Roskilde-anomali (nr. 4 i 3. divisions nedrykningsspil endte alligevel i
      nedrykningskvalspil), HVIS 088a ikke selv fandt forklaringen i egne data.
   b. Om der findes en offentligt tilgængelig oversigt over Turneringsudvalgets afgørelser/kendelser eller
      dispensationer, der kunne bruges som kilde til lignende, fremtidige anomalier.
2. **Målrettet søgning efter referater fra BD's repræsentantskabsmøder**, KUN for de år/paragraffer hvor
   088b fandt en dokumenteret regelændring — brug referaterne til at forstå HVORFOR reglen blev ændret,
   ikke som en bred, ustruktureret søgning.
3. **Målrettet søgning i BadmintonBladet og regionale nyhedssider**, KUN for de specifikke, navngivne
   anomalier 088a/088b ikke selv kunne forklare (fx Roskilde, hvis stadig uløst efter Mål 1a) — ikke en
   generel søgning efter "alt om DH-turneringen".
4. **Dokumentér resultatet af Christoffers kontakt til BD** i denne opgaves resultatnote, uanset om svaret
   kom hurtigt, langsomt, eller slet ikke — en "intet svar endnu" er også et gyldigt, midlertidigt facit.

## Kontekst

- `work/aabne/088a-intern-kortlaegning-og-testcases.md` (eller `work/loeste/`) — Roskilde-sagens status
  efter det interne forsøg (Mål 6 der).
- `work/aabne/088b-regelgrundlag-pr-niveaupar.md` (eller `work/loeste/`) — hvilke år der havde
  dokumenterede regelændringer, som referat-søgningen skal målrettes mod.
- `statistik/results/086-liga-hierarki-viden-samlet.md` — opdateres med resultatet.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/088c-*`). Ingen database-skrivninger.

**Må ikke røres:** `statistik/data/*.db`, `apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`.
**Ekstern websøgning ER godkendt** (samme afgrænsning som 088b — ikke badmintonplayer.dk/nembadminton.dk's
API). Kontakten til BD's sekretariat er Christoffers eget skridt, ikke noget Codex udfører automatisk.

## Kontrol

**Målet:**
```
Christoffer har et klart, brugbart spørgsmålsoplæg til BD, klar til at sende.
Referat-/presse-søgningen er målrettet mod konkrete, navngivne huller fra 088a/088b — ikke bred søgning.
Resultatet (uanset udfald) er dokumenteret i resultatnoten.
```

**Værnet:**
```
git status --short statistik/data/   tom
Ingen kald til badmintonplayer.dk/nembadminton.dk.
Ingen søgning uden en konkret, navngivet anomali eller regelændring at søge efter (undgå bred søgning).
```

**Skøn:** Codex vurderer selv hvornår en søgning er "målrettet nok" vs. bliver for bred — stop og spørg
Christoffer i "Spørgsmål" ved tvivl, i stedet for at bruge lang tid på bred søgning uden resultat.

## Ved tvivl

Er det uklart om en anomali er værd at forfølge videre, eller om et svar fra BD er tilstrækkeligt
autoritativt til at bruges som kilde: dokumentér som uafklaret og spørg Christoffer. Samme princip som
resten af projektet.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

**Afsluttet 2026-09-24.** Spørgeoplægget er skrevet i
`statistik/results/088c-eksternt-menneskeligt-spor.md`; ingen henvendelse er
sendt. Den målrettede Roskilde-søgning fandt BD's offentlige
Holdturneringsudvalgsoversigt, herunder en specifik kendelsespost for kamp
`505717`, og gav dermed både et konkret dokumentlink og bevis for, at en
offentlig afgørelsesoversigt findes. 088b dokumenterede derefter, at
2025-reglementets §23 lader nr. 4 og 5 i 3.-divisions-nedrykningspuljer gå til
kvalifikation; Roskilde er dermed forklaret af normal struktur, ikke cap eller
§28-afslag. Kendelsen er ikke behandlet som yderligere forklaring på
kvalifikationsudvælgelsen. Der blev ikke lavet bred presse- eller
referatsøgning: 088b leverede ingen dokumenteret regelændring, som kunne
afgrænse et repræsentantskabsmøde. `statistik/data/` findes ikke i det
isolerede worktree; der er ikke skrevet databasefiler og ikke kaldt
badmintonplayer.dk/nembadminton.dk.
