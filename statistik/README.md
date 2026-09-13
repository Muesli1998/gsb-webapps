# GSB statistik og historisk discovery

Separat test- og udviklingsmappe for GSB's statistikarbejde.

## Formål

Første leverance er en read-only discovery-funktion, der undersøger hvor langt
Nembadminton kan finde GSB-hold og holdkampe tilbage i tiden.

## Afgrænsning

- Produktionskilden i `../netlify-tool-prod` ændres ikke her.
- Google Sheets ændres ikke af discovery-testen.
- Ingen ny regelsætkatalog- eller databasearkitektur endnu.
- Ingen API-nøgler, servicekonti eller `.env`-filer committes.

## Verificeret API-kæde

```text
badmintonPlayerTeams
  -> badmintonPlayerTeamFights
  -> badmintonPlayerTeamMatch
```

Endpointet er `https://app.nembadminton.dk/graphql`.

GSB bruger `clubId = 1093`. API-sæsonen `2025` svarer i praksis til sæsonen
2025/26.

## Arbejdsregel

Intet bygges, deployes eller kopieres til produktion uden et eksplicit signal
for den konkrete ændring.
