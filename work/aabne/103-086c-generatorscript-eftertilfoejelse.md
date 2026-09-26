# Opgave 103 — commit 086c's genereringsscript retroaktivt

**Trin:** Vedligeholdelse/reproducerbarhed (efterfølger til allerede merget opgave 086c).

**Baggrund:** Opgave 086c (`work/loeste/086c-udvidet-visuelt-kort.md`, merget til main i commit
`f47fa94`) leverede et filtrerbart visuelt kort (`statistik/results/086c-udvidet-visuelt-kort.html`)
med klassifikationsdata bagt direkte ind i HTML'en. Verifikationen af 086c (Claude, 2026-09-26) bekræftede
at klassifikationstallene er korrekte ved at inspicere det indlejrede datasæt direkte — men fandt at
selve genereringsscriptet, der producerede klassifikationen (spilleform-familie via tekstsignal eller
arv fra grundspil), ikke blev committet. Det afviger fra mønsteret i alle tidligere opgaver i dette
projekt (fx 101's `101-koebenhavn-traadmatching.mjs`), hvor generator-scriptet altid ligger i
`statistik/scripts/` sammen med sit output. Uden scriptet kan klassifikationen ikke genkøres eller
efterprøves uafhængigt — kun inspiceres i det færdige output.

Christoffer har bekræftet at scriptet skal committes ("Det skal det").

## Mål

1. Commit det script (eller de scripts) der faktisk blev brugt til at generere
   `statistik/results/086c-udvidet-visuelt-kort.html`s indlejrede data, til `statistik/scripts/`,
   navngivet efter samme mønster som øvrige opgaver (fx `103-086c-klassifikation.mjs`, eller behold et
   navn der tydeligt peger på 086c hvis det oprindelige script allerede har et andet navn lokalt).
2. Kør scriptet igen og bekræft at det reproducerer PRÆCIS det allerede committede output
   (`086c-udvidet-visuelt-kort.html`) byte-for-byte, eller — hvis scriptet er blevet renset op i
   processen — at det producerer et output der er indholdsmæssigt identisk (samme klassifikationstal:
   686 arvet, 839 tekstsignal, 856 ukendt, 18.546 unikke puljer, 59.127 forekomster).
3. Tilføj en kort note i `statistik/results/086c-udvidet-visuelt-kort.md`, der linker til det nu
   committede script.

## Afgrænsning

**Må røres:** nyt script under `statistik/scripts/`, en tilføjelse til
`statistik/results/086c-udvidet-visuelt-kort.md`. Selve `086c-udvidet-visuelt-kort.html` bør IKKE
ændre indhold — kun genereres på ny for at bekræfte reproducerbarhed (og evt. overskrives hvis
reglen i Mål 2 om byte-identisk ikke er opfyldt, men det bør flages eksplicit hvis det sker).

**Må ikke røres:** `statistik/data/*.db` (kun læses), `apps/netlify-prod/`, `kampsystem/`,
`klubstatistik-preview/`. Ingen nye API-kald.

## Kontekst

- `work/loeste/086c-udvidet-visuelt-kort.md` — det oprindelige opgavekort, inkl. Resultatnote.
- `statistik/results/086c-udvidet-visuelt-kort.html`/`.md` — det allerede leverede resultat.
- `statistik/scripts/101-koebenhavn-traadmatching.mjs` — eksempel på det forventede mønster
  (script + output committet sammen).

## Kontrol

**Målet:**
```
statistik/scripts/ indeholder et script der reproducerer 086c's klassifikationstal.
Reproduktionen er verificeret (byte-identisk output ELLER dokumenteret identiske klassifikationstal).
```

**Værnet:**
```
git status --short statistik/data/   tom
086c's allerede godkendte klassifikation (686/839/856, 18.546 puljer) er uændret efter denne opgave.
```

**Skøn:** ingen — dette er en ren reproducerbarheds-eftertilfølgelse, intet nyt besluttes.

## Ved tvivl

Er det oprindelige script helt væk/ikke gemt nogen steder, og skal genskrives fra bunden ud fra
HTML'ens indlejrede data og rapportens beskrevne regler: gør det, men flag det tydeligt i
Resultatnoten som en REKONSTRUKTION, ikke en genfinding af det originale script, og vær ekstra
omhyggelig med at verificere at reproduktionen matcher de allerede godkendte tal.

## Gren

`arbejde/103-086c-generatorscript`, fra `main`.

---

## Spørgsmål

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
