// Delt navnealias-opslag for GSB Dream Team. Ny fil 2026-09-07, RETTET samme dag (nittende
// runde) efter Chris krydstjekkede hele 26/27-truppen direkte mod BD/Nembadmintons egne
// registrerede navne og leverede den definitive, korrekte stavning for hver spiller.
//
// BAGGRUND: forskellige kilder staver nogle gange samme spillers navn forskelligt —
// spillerens eget tilmeldingsnavn, Nembadminton/BD-scrapingen (hent-resultater.js), og det
// hardkodede HERRER_2627/DAMER_2627-snapshot (spillere.js). Uden et fælles opslag matcher
// disse ikke hinanden som rene strenge. Det har konkret kostet spillere point (et
// Resultater-navn der ikke matchede Spillerpoint) og fået samme spiller til at optræde i
// BEGGE kønsdropdowns på tilmeldingssiden (spillere.js's "ukendt køn"-fallback, som er
// bygget til aldrig at skjule en spiller — men rammes for hårdt af stave-varianter).
//
// VIGTIGT PRINCIP (2026-09-07): den OFFICIELLE stavning pr. spiller er IKKE "altid det
// længste navn" eller "altid det korteste" — det er PR. SPILLER den stavning Chris har valgt
// som den rigtige (som regel den BD/Nembadminton reelt har registreret spilleren under, men
// ikke altid). Se HERRER_2627/DAMER_2627 i spillere.js for selve facit-listen — ALIAS_RAA
// nedenfor indeholder kun de kendte AFVIGENDE stavninger der skal oversættes til facit.
//
// BRUG: kald officieltNavn(raaNavn) på ethvert navn der skal SAMMENLIGNES eller SKRIVES til
// et ark, FØR sammenligningen/skrivningen sker. Rør ALDRIG et rent visningsnavn brugeren selv
// har valgt at se — kun navne der bruges til matching.
//
// TILFØJ EN NY ALIAS: find den AFVIGENDE stavemåde (fx sådan Nembadminton skriver navnet, en
// tastefejl der er endt i et ark, eller et mellemnavn nogen ikke selv skriver ved tilmelding)
// og den OFFICIELLE stavemåde (den der reelt bruges i spillere.js's HERRER_2627/DAMER_2627 og
// som spilleren tilmelder sig med), og tilføj én linje i ALIAS_RAA nedenfor:
//   'afvigende stavemåde': 'Officiel stavemåde',
// Store/små bogstaver og ekstra mellemrum er ligegyldigt (se normaliserNoegle) — skriv det
// bare naturligt. Alias-listen er bevidst sæson-uafhængig: ryd aldrig gamle navne ud, de
// koster intet at beholde og genbruges år over år (samme spiller kan komme igen).
//
// Kilder til nedenstående: Chris' direkte krydstjek 2026-09-07 af hele 26/27-truppen mod
// BD/Nembadmintons `highestPointGain`-API (382 registrerede GSB-navne hentet og sammenlignet),
// plus de historiske variationer fra GSB_NAVNE_ALIAS_OG_ANOMALIER.json (24/25+25/26) som stadig
// er værd at beholde for ældre data.

function normaliserNoegle(navn) {
  if (!navn) return '';
  return navn
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('da-DK');
}

// afvigende stavemåde -> officiel stavemåde (facit = HERRER_2627/DAMER_2627 i spillere.js)
const ALIAS_RAA = {
  // Hannah: Chris bekræftede 2026-09-07 at "Hannah Clausen" (BD's egen registrering) ER det
  // officielle navn — IKKE det længere "Hannah Phoebejada Clausen" som blev brugt som facit
  // tidligere samme dag. Alle tre tidligere anvendte lange former peger nu tilbage på den
  // korte, officielle BD-stavning.
  'Hannah Phoebejada Clausen': 'Hannah Clausen',
  'Hannah Phoebe Ejada Clausen': 'Hannah Clausen',
  'Hannah Phoebeejada Clausen': 'Hannah Clausen',

  'Anja Gunna Thomsen': 'Anja Thomsen',
  'Dorthe Høst': 'Dorthe Høst Sarup',
  'Holger Lindholm': 'Holger Tscherning Lindholm',
  'Jonathan Hansen': 'Jonathan W. Hansen',
  'Louise Kofoed': 'Louise Korsby Kofoed',
  'Sebastian Møller': 'Sebastian Almeida Møller',
  'Thøger Eusebius Jakobsen': 'Thøger Jakobsen',
  'Thor Percy Hinge Pedersen': 'Thor Pedersen',
  'Nadia Sawangjai Mortensen': 'Nadia Mortensen',
  'Linus Bergstrøm Hesselballe': 'Linus Bergström Hesselballe',
  'Rasmus Holmlykke Andersen': 'Rasmus Holmslykke Andersen',
  'Lena Vang': 'Lena Bigum Vang',

  // Fundet 2026-09-07 ved krydstjek mod BD's API (Camilla og Theodor blev flaget af Chris,
  // Louis var allerede kendt fra GSB_NAVNE_ALIAS_OG_ANOMALIER.json's SUT-ungdomsnote):
  'Camilla Bagge': 'Camilla Steinmetz Bagge',
  'Theodor Lumby': 'Theodor Lumby Jessen',
  'Louis Toftlund': 'Louis Valdemar Hedegaard Toftlund',
};

const ALIAS_OPSLAG = new Map(
  Object.entries(ALIAS_RAA).map(([alias, officiel]) => [normaliserNoegle(alias), officiel])
);

// Slår et råt/scrapet/indtastet navn op og returnerer den officielle stavemåde, hvis en
// alias findes — ellers returneres navnet uændret (trimmet), så et ukendt navn ALDRIG
// forsvinder eller fejler, det passerer bare igennem som det er.
function officieltNavn(raaNavn) {
  if (!raaNavn) return raaNavn;
  const trimmet = raaNavn.trim();
  const noegle = normaliserNoegle(trimmet);
  return ALIAS_OPSLAG.get(noegle) || trimmet;
}

module.exports = { officieltNavn, normaliserNoegle };
