# Beslutningslog

Afgørelser der ikke handler om en konkret filændring. Commit-beskeder
dokumenterer kode; denne fil dokumenterer hvorfor.

Nyeste nederst. Én post per afgørelse: hvad blev besluttet, hvorfor, og
hvad der blev fravalgt. Hold dem korte — værdien ligger i at de findes,
ikke i at de er udtømmende.

Formålet er at de samme spørgsmål ikke bliver afgjort forfra hver gang,
og typisk anderledes. Det gælder især fordi Claude og Codex ikke deler
hukommelse: står en afgørelse ikke her, findes den ikke.

---

## 2026-09-13 — Kode ud af Dropbox, ind i git

**Besluttet:** kode, dokumenter og små tekstdata flytter til et git-repo
udenfor Dropbox. Dropbox beholder tunge og binære filer.

**Hvorfor:** Dropbox synkroniserede `.git`-mapper mellem to computere, hvilket
kan ødelægge et repo. Samme dag fandt vi fire filer der var divergeret mellem
maskinerne uden at nogen havde opdaget det. Git gør uenighed synlig og
flettelig; Dropbox laver en fil med parentes i navnet som man finder tre uger
senere.

**Fravalgt:** at lade alt blive i Dropbox med disciplin om kun at arbejde ét
sted ad gangen. En regel man bryder inden for en uge er ikke en regel.

---

## 2026-09-13 — Ét monorepo frem for et repo per delprojekt

**Besluttet:** `gsb-webapps` samler det hele.

**Hvorfor:** delprojekterne deler data og dokumentation, og krydshenvisninger
mellem separate repos er besværlige. Én klon per maskine er også nemmere at
holde styr på for én person.

**Fravalgt:** separate repos per app. Renere deploy-historie, men fem-seks
kloner at vedligeholde.

---

## 2026-09-13 — Statistik-historikken bevaret, men genereret data fjernet fra sporing

**Besluttet:** de 171 commits blev flettet ind med `git subtree`, hvorefter
3.499 genererede filer blev fjernet fra sporingen.

**Hvorfor:** historikken dokumenterer beslutninger og er værd at beholde.
Men de sporede filer fyldte 93 MB, og en databasekørsel skrev 15 MB ny
historik hver gang. Efter oprydningen fylder repoet 8 MB med historikken
intakt.

**Fravalgt:** at starte statistik på en frisk. Mindre repo, men sporet af
hvorfor tingene blev som de blev, ville være væk.

---

## 2026-09-13 — AGENTS.md er den bærende indgang, ikke README

**Besluttet:** al substans står i `AGENTS.md`. `CLAUDE.md` er tre linjer der
peger derhen.

**Hvorfor:** Codex læser `AGENTS.md` af sig selv. Og managerrollen skal på
sigt kunne overdrages til ChatGPT — hver regel der kun står et Claude-
specifikt sted, forsvinder den dag.

**Fravalgt:** at lade hvert værktøj have sin egen instruksfil. Fristelsen
til at skrive "lige den ene regel" ind i den ene fil er hvordan to
sandheder opstår.

---

## 2026-09-13 — Statistik har førsteprioritet indtil Prod Push

**Besluttet:** intet andet arbejde går i opgavekøen før statistik er ude hos
brugerne. Nye fund hører i idébankerne.

**Hvorfor:** hver gennemgang føder nye idéer. Lander de i samme bunke som det
igangværende, bliver statistik aldrig færdig — den bliver ved med at være
firs procent færdig.

**Fravalgt:** en prioriteret liste hvor alt kan rykke. Det er den samme kø,
bare med flere meninger om rækkefølgen.

---

## 2026-09-13 — Christoffer afgør tilbagefald kontra nyt fund

**Besluttet:** den der finder noget, foreslår klassifikationen med én linjes
begrundelse og venter på svar.

**Hvorfor:** den der arbejder på noget, har en indbygget skævhed mod at kalde
det tilbagefald — det føles forbundet med det igangværende, og så glider det
ind i køen udenom prioriteringen.

**Fravalgt:** en fast regel baseret på om tingen stod i færdig-definitionen.
Ren i teorien, men grænsen er uklar i praksis. Mønsteret i denne log kan
senere gøres til en rigtig regel, når der er nok afgørelser at se på.

---

## 2026-09-13 — Kontrol som kommandoer, resultatnoter i tal

**Besluttet:** hver opgave bærer sin kontrol som kørbare kommandoer, både for
målet og for det der ikke må ændre sig. Resultatnoter angiver tal.

**Hvorfor:** opgave 002 blev løst korrekt, men resultatnoten skrev at der var
"én resterende forekomst" af GSB Dream Team hvor der faktisk var tretten — og
de tretten var de rigtige. Havde nogen troet på noten, kunne de have "rettet"
noget der var i orden. Tal kan efterprøves på et sekund; vurderinger kan ikke.

**Fravalgt:** at stole på opsummeringer. De er påstande, ikke beviser.
