// Spillere der spiller for GSB's hold, men IKKE er med i Dream Team-truppen (Spillerpoint-arket).
// Ny fil 2026-10-04.
//
// BAGGRUND: analyse.js afgør hvilken side af en kamp der er "os" ved at slå navnene op i
// Spillerpoint!A2:A200. Spillerpoint er Dream Team-truppen (44-49 navne) — ikke alle der spiller
// for GSB 1-4. Reserver på GSB 3/4 står ikke dér, og en kamp hvor ingen af vores spillere er på
// listen blev derfor ikke talt med i hold-/kategoristatistikken (13 af 117 kampe i runde 1-3
// 2026/27, næsten alle på GSB 4).
//
// Navnene må IKKE tilføjes til Spillerpoint: spillere.js lægger alle navne dér ind i BEGGE
// køns-dropdowns på Dream Team-tilmeldingen, og Spillerpoint-formlerne giver dem Dream
// Team-point. Derfor har statistikken sin egen liste her.
//
// TILFØJ EN SPILLER: skriv navnet som det står i Resultater-arket (efter alias, se navne.js).
// Hold listen sæson-uafhængig; gamle navne koster intet at beholde.
//
// KENDT BEGRÆNSNING / TODO: det er en manuel liste, der skal vedligeholdes. analyse.js melder nu
// selv i svaret (`ikkeTalt`) og på siden hvilke kampe der ikke blev talt, så en ny reserve ikke
// længere forsvinder i stilhed. Den varige løsning er at udlede "vores side" strukturelt (se
// docs/BESLUTNINGER.md, 2026-10-04) i stedet for at matche mod en navneliste.
const STATISTIK_SPILLERE = [
  'Carsten Yan',
  'Chaojun Li',
  'Charlotte Neerdal',
  'Emeli Hansen',
  'Ida Dam Drabæk',
  'Jonas Felk Øster',
  'Laurits Roland Nielsen',
  'Yuan Liang',
];

module.exports = { STATISTIK_SPILLERE };
