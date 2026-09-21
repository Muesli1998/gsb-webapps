# 082 — Nembadminton ranglistepoint over tid

Dato: 2026-09-21. Read-only, uden login og uden databaseændringer.

## Kilde og konkret spillerprofil

Nembadmintons frontend har ruten:

```text
https://app.nembadminton.dk/app/player/:playerID/stats
```

Den tilhørende bundle `Stats-D8rhXkEc.js` indeholder den faktiske tekst
`Ranging progression for` og tre diagrammer med overskrifterne `Mix`, `Single`
og `Double`. Ruten er i klientens route-metadata markeret `requiresAuth: true`;
en direkte, unauthenticated HTTP-hentning returnerer dog SPA-shell'en med HTTP
200. Det er derfor frontend-koden og GraphQL-svaret — ikke en server-renderet
offentlig profilside — der er den verificerede evidens for visningen i denne
probe.

## Faktisk GraphQL-kald

Endpointet er:

```text
POST https://app.nembadminton.dk/graphql
```

Frontendens query er:

```graphql
query memberStats($id: ID!) {
  memberStats(id: $id) {
    member { id name }
    mix { version points }
    single { version points }
    double { version points }
  }
}
```

Schema-introspektion bekræfter `memberStats(id: ID!): MemberStats` med felterne
`member`, `mix`, `single` og `double`; hvert datapunkt har `points` og `version`.

## Login-frit faktisk svar

Et kald med det offentligt fundne Nembadminton-medlems-ID `16214` (Adnan Bacic,
fundet via den allerede dokumenterede offentlige `highestPointGain`-query for
GSB clubhouse `331`) svarede HTTP 200 uden login. Uddrag af svaret:

| Serie | Antal datapunkter | Første snapshot | Seneste snapshot |
|---|---:|---|---|
| Single | 14 | 1545 @ 2025-08-02 | 1912 @ 2026-09-02 |
| Double | 14 | 1424 @ 2025-08-02 | 1468 @ 2026-09-02 |
| Mix | 11 | 1624 @ 2025-11-02 | 1660 @ 2026-09-02 |

Det samme svar indeholdt 105 rå `member.points`-poster med ældste version
2023-02-01 og seneste version 2026-09-02. Den separate `single`/`double`/`mix`
serie begynder senere end den rå kategori-/niveauhistorik i dette eksempel.

## Kan det enumereres?

- `memberStats` kræver et kendt medlems-ID og har ingen datointerval- eller
  versionsparameter. Den returnerer de snapshots, der findes for netop den
  spiller.
- `highestPointGain` er login-fri og kan bruges til at finde medlems-ID'er for
  et kendt clubhouse, kategori og aldersgruppe. Det giver dermed en praktisk
  roster-enumerator for GSB (`clubhouseId=331`), men ikke en generel liste over
  alle danske spillere eller alle klubbers interne clubhouse-ID'er.
- Der blev ikke fundet en separat offentlig query, der enumererer alle datoer
  eller alle medlemsprofiler uden et kendt ID. Der blev heller ikke kørt nogen
  masseindsamling.

## Konklusion

Nembadmintons GraphQL har et offentligt, login-frit felt til pointudvikling over
tid: `memberStats(id)`, med daterede `single`, `double` og `mix`-snapshots. Det
er derfor teknisk anvendeligt til GSB-spillere, når deres Nembadminton-ID er
kendt eller først findes via `highestPointGain`. Det er ikke dokumenteret som
en fri, tværgående enumerator for alle spillere eller datoer.

Den maskinlæsbare evidens ligger i
`statistik/results/082-nembadminton-ranking-probe.json`.
