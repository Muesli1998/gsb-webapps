# Opgave NNN — kort titel

Kopiér denne fil til `work/aabne/NNN-kort-navn.md` og udfyld den.
Når opgaven er løst, flyttes filen til `work/loeste/` med resultatnoten
udfyldt nederst.

Skabelonen er til opgaver der **gives videre** til en anden — en Codex-
session, en Claude-session, eller dig selv om tre uger. Små rettelser du
selv laver med det samme, skal ikke have en opgavefil; så er ceremonien
dyrere end arbejdet.

---

## Mål

Én sætning om hvilket **resultat** der ønskes. Ikke hvilke skridt der skal
tages — den der løser opgaven, ved bedre end dig hvilke skridt der skal til.

## Afgrænsning

**Må røres:** hvilke mapper og filer.

**Må ikke røres:** de øvrige. Nævn særligt `docs/historik/` og Dropbox'
`_arkiv\`, som beskriver fortiden korrekt og ikke skal "rettes".

## Kontekst

Kun det der er nødvendigt for netop denne opgave, konkret og med filnavne.
Ikke "læs hele repoet" — det er dyrt og upræcist. Hvis noget er forældet
eller upålideligt, så sig det her.

## Acceptkriterier

Hvordan afgøres det at opgaven er løst? Skal kunne efterprøves uden at
diskutere smag. For eksempel:

- `grep -r "gsb-statistik-test" --exclude-dir=historik` giver ingen træf
- `node apps/netlify-prod/...` kører uden fejl
- `docs/START-HER.md` nævner ingen sti under `Dropbox\`

Er kriterierne vage, bliver review dyrt, og så er det dig der ender med at
fejlsøge output.

## Ved tvivl

Stop, og skriv spørgsmålet ind under "Spørgsmål" nedenfor. **Gæt ikke.**
Et forkert gæt der ser rigtigt ud, koster mere at opdage end at spørge.

## Gren

Arbejde udført af en agent kører på `arbejde/NNN-kort-navn`, så ændringen
kan læses samlet før den flettes ind i `main`.

---

## Spørgsmål

(Udfyldes af den der løser opgaven. Manageren svarer her i filen.)

## Resultat

(Udfyldes når opgaven er løst: hvad blev gjort, hvilke commits, og hvad
der eventuelt blev fravalgt undervejs og hvorfor.)
