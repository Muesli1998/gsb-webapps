# Opgave 086 — fuldt liga-hierarki (alle 33 regioner), oprykning som bevis, og ranglistens indførelse i ungdom

**Trin:** Direkte fortsættelse af opgave 085. Stadig undersøgelse/afklaring, med et konkret, allerede
leveret visuelt kort som skabelon (se "Kontekst"), men nu udvidet i tre retninger Christoffer selv har
peget på efter at have set det.

**Gren:** `arbejde/086-fuldt-liga-hierarki-og-oprykning`, jf. `AGENTS.md`.

**Baggrund:** Opgave 085 genparsede siderækkefølgen for tre konkrete eksempelsider (BADDAN SEN, BADKBH
SEN, BADKBH U15) og byggede et visuelt kort ud fra det. Kortet dækker kun de tre sider — ikke alle 33
regioner. Christoffer har set kortet og peget på tre konkrete udvidelser:

1. **Udvid til alle 33 regioner.** Samme metode (genparsing af `standing_indexes.raw_response`) skal
   køres for alle regioners sider, ikke kun de tre eksempler.
2. **Op-/nedrykning som empirisk bevis for niveau-lighed, kun for senior.** Christoffer vurderer at man
   for senior kan regne med at hver regions topkreds (fx Sjællandsserien, Københavnsserien, Kredsserien
   Vest) reelt er "ens" i niveau, fordi oprykning fra dem går til Danmarksserien — dvs. flere regionale
   topkredse fødrer den samme fælles række. Dette skal IKKE antages — det skal testes empirisk: findes
   der faktiske hold der er rykket op fra en regional topkreds til Danmarksserien i kildedataen? Hvis ja,
   kan det bruges som begrundelse for at tegne en pil/forbindelse mellem de regionale topkredse (de
   "fødrer" samme næste niveau). Hvis nej, eller for tyndt datagrundlag, dokumentér det i stedet for at
   tegne forbindelsen.
3. **Ungdom grupperes IKKE med automatiske forbindelser.** For ungdomsrækker (U-grupper) må ens/lignende
   navngivne puljer i forskellige regioner IKKE forbindes med streger/pile som om de var bekræftet
   samme niveau — de skal vises side om side som en gruppe uden linje, medmindre der findes konkret
   op-/nedrykningsbevis mellem specifikke puljer på tværs af sæsoner (samme princip som for senior, men
   Christoffer forventer selv at det bliver sjældnere eller fraværende, og det skal ikke antages i den
   ene eller anden retning).

**Vigtigt — to nye faktiske spørgsmål Christoffer har rejst, som skal undersøges som selvstændige
delmål, ikke antages:**

**A. Hvornår gik ungdomsrækker over til pointbaseret rangliste-pooling?** Christoffer stoppede med at
spille i 2017 og mener bestemt at ungdomsrækker dengang ikke var rangliste-baserede (pointgrænser som
"U15 A, 6800" er et nyere fænomen — puljerne hed dengang formentlig bogstavniveauer som "A", "B", "C",
"D" uden pointgrænse i navnet). Find den faktiske sæson hvor navngivningen skifter fra bogstavniveau til
pointgrænse-format i `division_name_raw`, pr. aldersgruppe. Dette er direkte tjekbart i allerede gemt
data (`league_groups` har `season_id` og rå navne for alle 17 sæsoner) — ingen nye API-kald nødvendige.
Rapportér det fundne skiftetidspunkt (eller dokumentér at det er gradvist/inkonsistent på tværs af
aldersgrupper/regioner, hvis det viser sig at være tilfældet).

**B. Spillerdrevet "holdforskydning" mellem aldersgrupper — er det synligt i data?** Christoffers
hypotese: hvis en klub (fx GSB) har en stærk U13-årgang i en periode, kan det ske at klubben ikke har et
hold i en bestemt U13-pulje en sæson, fordi spillerne allerede er rykket op og spiller U15 i stedet.
Dette er testbart empirisk: `match_categories` har spiller-ID'er og -navne pr. kamp. Undersøg om der er
konkrete, navngivne eksempler (brug GSB som kendt case, samme forsigtighed som `player_link` i opgave
083 — spor spillere via ID, ikke kun navn, og marker usikre koblinger som usikre) hvor de samme spillere
findes i en yngre aldersgruppes kampe én sæson og en ældre aldersgruppes kampe næste sæson, uden at have
spillet den mellemliggende aldersgruppe. Dette er et sidespor i forhold til niveau-hierarkiet, men
direkte efterspurgt — hold det afgrænset til et konkret, dokumenteret udsnit (fx GSB), ikke en
generalisering over hele landskabet.

## Mål

1. Udvid genparsingen af siderækkefølge (fra opgave 085's metode) til alle 33 regioner, alle
   aldersgrupper, for de sæsoner hvor `standing_indexes.raw_response` er gemt — stadig UDEN nye
   API-kald. Rapportér dækning (hvor mange sider/regioner/sæsoner kunne rekonstrueres, hvor mange kunne
   ikke, og hvorfor).
2. Test empirisk om regionale seniortopkredse "fødrer" Danmarksserien via faktiske
   oprykningshændelser i data (ikke antaget). Rapportér konkrete fundne eksempler eller dokumentér
   fraværet af tilstrækkeligt bevis.
3. Test det samme for ungdom, afgrænset og forsigtigt — forvent og accepter et "nej" eller "for tyndt
   grundlag" som gyldigt svar.
4. Besvar spørgsmål A (rangliste-indførelsestidspunkt i ungdom) fra allerede gemt data.
5. Besvar spørgsmål B (spillerdrevet holdforskydning) afgrænset til et konkret, kendt udsnit (GSB),
   med samme forsigtighed som opgave 083's spillerkobling.
6. Udvid det eksisterende visuelle kort (artifact fra opgave 085, se Kontekst) til at dække alle 33
   regioner, med: (a) forbindelser/pile KUN hvor Mål 2/3 fandt konkret oprykningsbevis, (b) ungdomspuljer
   grupperet visuelt uden automatiske forbindelser medmindre Mål 3 fandt bevis, (c) et separat afsnit der
   viser fundet fra spørgsmål A og B. Byg selve den udvidede visualisering (HTML), da opgave 085 allerede
   etablerede at dette er et konkret, brugt værktøj — ikke kun et forslag.

## Kontekst

- `work/loeste/085-niveau-fra-rekkefoelge-og-skabelon.md` — metoden for genparsing af siderækkefølge,
  og de tre eksempler kortet allerede dækker.
- Det publicerede visuelle kort (artifact) bygget i denne chat ud fra 085's data — vis Christoffers
  chatsession dette hvis du har adgang til den, ellers byg videre på samme visuelle sprog: kæde af
  niveauer med prik/linje, orange stiplet kant for ikke-niveauer (spilletidssider), blå badges for delte
  puljer.
- `statistik/data/liga-landskab.db` — `league_groups`, `league_group_regions`, `standing_indexes`,
  `league_matches`, `match_categories`, `match_games`.
- `statistik/results/077-liga-regelsaet-katalog.md` — GSB's egen klassificering, fortsat brugbar som
  krydstjek.

## Afgrænsning

**Må røres:** nyt undersøgelsesdokument (`statistik/results/086-*`), nye scripts under
`statistik/scripts/`, ny/udvidet visualiserings-HTML under `statistik/results/` (eller tilsvarende sted
for visuelle artefakter i repoet — følg samme konvention som opgave 085 brugte, hvis en sådan blev
etableret). Skrivning i `liga-landskab.db` KUN hvis det følger samme afgrænsning som 085 (kun afledte
kolonner/tabeller der er eksplicit beskrevet og godkendt her — spørg i "Spørgsmål" før noget skrives,
byg det ikke stiltiende undervejs).

**Må ikke røres:** `statistik/data/gsb-statistik-normalized.db` (kun læses, ALDRIG skrives til),
`statistik/data/rangliste-historik.db` (kun læses — relevant for Mål 5's spillerkobling),
`apps/netlify-prod/`, `kampsystem/`, `klubstatistik-preview/`. INGEN nye API-kald til
badmintonplayer.dk eller nembadminton.dk — alt arbejde skal ske ud fra allerede gemt rådata.

## Kontrol

**Målet:**
```
Genparsing af siderækkefølge er udvidet til alle 33 regioner, med rapporteret dækning.
Oprykning mellem regional seniortopkreds og Danmarksserien er testet empirisk, med konkrete eksempler
  eller en dokumenteret konklusion om utilstrækkeligt bevis.
Samme test er forsøgt for ungdom, afgrænset og uden at tvinge et resultat frem.
Sæsonen (eller sæsonintervallet) hvor ungdomsrækker skifter til pointbaseret navngivning er fundet eller
  dokumenteret som ikke entydig.
Et konkret, afgrænset fund om spillerdrevet holdforskydning i GSB findes, med usikre koblinger markeret
  som usikre.
Det visuelle kort er udvidet til alle 33 regioner efter samme principper.
```

**Værnet:**
```
sha256sum statistik/data/gsb-statistik-normalized.db (før og efter)   skal være uændret
git status --short statistik/data/gsb-statistik-normalized.db statistik/data/rangliste-historik.db
  apps/netlify-prod/ kampsystem/ klubstatistik-preview/   tom
Ingen nye API-kald til badmintonplayer.dk/nembadminton.dk.
Ingen forbindelse/pil i det visuelle kort uden et konkret, citerbart databelæg (kamp-ID, hold-ID, eller
  sæson-til-sæson-reference) — "det giver mening" er ikke nok.
```

**Skøn:** ingen på om oprykningsbeviset er "nok" til at tegne en forbindelse i ungdom — vis det fundne
(eller det manglende) og lad Christoffer vurdere. Samme regel for spørgsmål A og B: rapportér det
fundne, konkludér ikke hårdere end dataen bærer.

## Ved tvivl

Er det uklart om to regionale rækker faktisk fødrer samme næste niveau, om en pointgrænse-navngivning
reelt markerer starten på rangliste-pooling (frem for blot en navngivningsvariation), eller om en
spillerkobling på tværs af aldersgrupper er den samme person: dokumentér som uafklaret i stedet for at
antage — samme princip som hele resten af projektet.

### Spørgsmål

(Udfyldes af den der løser opgaven. Christoffer svarer her i filen.)

## Resultatnote

*(udfyldes når opgaven er løst — flyt filen til `work/loeste/`.)*
