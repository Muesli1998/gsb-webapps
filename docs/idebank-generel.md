# Generel idébank (ikke GSB-specifik)

Idéer og kuriositeter der er dukket op undervejs i GSB Dream Team-arbejdet, men som ikke reelt handler
om GSB eller Dream Team-webappen — snarere generelle tekniske/data-interesser der kunne være sjove at
forfølge selvstændigt en dag. Intet herfra er en del af GSB-projektet eller planlagt implementeret noget
sted. Ren "måske engang, hvis lysten er der"-liste.

## Reverse-engineere Tilmeldingsniveau-formlen

Oprindeligt rejst i forbindelse med GSB, men interessen er reelt generel: Badminton Danmark bruger et
"vægtet gennemsnit" til at beregne Tilmeldingsniveau (den samlede styrkevurdering der bestemmer hvilken
række en spiller skal tilmeldes til) — men den præcise matematiske formel (hvor meget "antal spillede
kampe i en kategori" trækker i vægtningen) er ikke publiceret noget sted, hverken i det officielle
reglement-PDF eller på forbundets eget support-site.

Det vi ved indtil videre (fra GSB-undersøgelsen):
- Tilmeldingsniveau kan findes i Nembadmintons database som en `category: null`-post i en spillers rå
  punkt-historik (`memberStats(id).member.points`) — ikke under det `LEVEL`-enum man ellers ville
  forvente, hvilket nok er derfor det direkte opslag (`highestPointGain(category: LEVEL)`) fejler med en
  intern serverfejl.
- På 91 GSB-mænd korrelerede Tilmeldingsniveau-position og kategoripoint stærkt (Spearman ≈0,85), og
  Tilmeldingsniveau-point lå konsekvent lidt under spillerens bedste enkeltkategori — konsistent med et
  ægte vægtet gennemsnit, ikke bare den bedste kategori.
- Data er dog forældet (stort set alle snapshots stopper 2024-07-01) og indeholder tydelige
  placeholder-værdier (1300, 1100, 1289 osv. går igen på tværs af helt forskellige spillere) — så det
  nuværende datasæt er for tyndt og for gammelt til reelt at kunne bruges til at fitte en formel med
  nogen selvtillid.

Hvad der ville skulle til for at komme videre: et markant større og mere varieret datasæt end én klub
kan give (91 spillere er for få variable kombinationer til at adskille en rigtig vægtningsformel fra
tilfældigheder) — ideelt data fra mange klubber, nyere end 2024-07. To konkrete forhindringer fundet:
1. `clubhouseId` (det interne Nembadminton-ID der kræves af de login-fri opslag) er IKKE det samme som
   det offentlige `clubId`/badmintonPlayerId, og findes ikke i Nembadmintons egen klubliste (`clubs`,
   1159 klubber, ingen login krævet) — kun GSB's (331) er kendt, fra tidligere dokumenteret research.
   At gætte sig frem til andre klubbers `clubhouseId` for at hente deres data er bevidst fravalgt (ville
   være at skrabe andre organisationers medlemsdata uden konkret grund).
2. Badminton Danmarks egen officielle rangliste-søgeside (badmintonplayer.dk/DBF/Ranglister/) er spærret
   bag en reCAPTCHA, som aldrig omgås. Den eneste kendte tredjeparts-adgang (Shuttler.dk) blev lukket
   permanent i marts 2026 efter direkte påbud fra Badminton Danmark, som efterfølgende afviste enhver
   genåbning — forbundet ønsker tydeligvis ikke alternative adgangsveje til ranglistedata.

Konklusion: en reel reverse-engineering af formlen er ikke praktisk opnåelig lige nu uden enten (a)
adgang til flere klubbers `clubhouseId` med et konkret samtykke/formål, eller (b) en anden, ikke-spærret
datakilde til den officielle rangliste, som jeg ikke har fundet endnu. Kan tages op igen hvis en af de
to forudsætninger ændrer sig.

## Nembadmintons uofficielle GraphQL-API er rigere end først antaget

Undervejs i GSB-arbejdet endte vi med at kortlægge en overraskende stor del af `app.nembadminton.dk`'s
GraphQL-skema via introspektion — langt mere end de par queries der oprindeligt var dokumenteret
(`badmintonPlayerTeamMatch`, `highestPointGain`, `memberStats`). Blandt andet: `badmintonPlayerTeams`
og `badmintonPlayerTeamFights` (find alle en klubs hold og kampe ud fra klub-ID, ungdom inklusive),
`badmintonPlayerClubs`/`clubs` (fulde klub-lister), og den skjulte `category: null`-mekanik for
Tilmeldingsniveau beskrevet ovenfor.

Kunne være en sjov selvstændig ting at dokumentere ordentligt en dag — en lille uofficiel skema-oversigt
eller et minimalt wrapper-bibliotek (Python/JS) for andre der roder med badminton-data i Danmark. Ikke
noget der har noget med GSB's egen webapp at gøre, bare en observation om at API'et er mere kapabelt end
dets (manglende) dokumentation antyder.

## Badminton Danmarks platformsmonopol på ranglistedata

Lidt en sidebemærkning, ikke en "idé" i traditionel forstand: det er værd at huske at Badminton Danmark
aktivt forhindrer alternative adgangsveje til deres ranglistedata (jf. Shuttler.dk-lukningen ovenfor,
plus CAPTCHA'en på deres egen søgeside). Det er ikke noget vi skal forsøge at omgå, men det er nyttig
kontekst hvis emnet "kan vi bygge noget bedre end BadmintonPlayer.dk" nogensinde dukker op igen — svaret
er nok "juridisk/politisk nej", ikke "teknisk nej".

Status: alt i denne fil er ren nysgerrighed noteret undervejs. Intet er planlagt, prioriteret eller
kodet, og intet af det er en del af GSB Dream Team-projektet.
