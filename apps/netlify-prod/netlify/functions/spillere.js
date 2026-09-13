const { google } = require('googleapis');
const { officieltNavn } = require('../lib/navne');

// Opdateret 2026-09-03. Baggrund: 26/27's Spillerpoint-ark er stadig tomt (ingen kampe
// spillet endnu — arket fyldes først automatisk når sæsonens første runde er indtastet),
// og denne funktion læste TIDLIGERE udelukkende navne derfra — så Tilmelding-sidens
// dropdown-menuer viste reelt 0 spillere for hele 26/27-sæsonen. Denne fix var allerede
// bygget og bekræftet af Chris i Claude-previewet (2026-08-31, se idébanken), men var
// aldrig blevet shippet til selve produktionsfilen før nu.
//
// Løsning: den kendte, bekræftede 26/27-seniortrup er hardkodet herunder, kønsopdelt i
// HERRER/DAMER, og bruges som BUND-liste. Ethvert navn Spillerpoint-arket rent faktisk
// indeholder (når/hvis sæsonen begynder at få rigtige resultater) lægges oveni — hvis navnet
// allerede findes i den hardkodede liste, bruges den kendte kønsopdeling; findes det ikke
// (fx en helt ny spiller vi ikke kender endnu), tilføjes navnet til BEGGE lister frem for
// at blive tabt/skjult, så ingen rigtig tilmeldt kan "forsvinde" fra siden.
//
// RETTET 2026-09-07 (nittende runde): Spillerpoint-arkets navne normaliseres nu via
// navne.js's alias-opslag FØR de sammenlignes mod HERRER_2627/DAMER_2627 — se navne.js for
// baggrund og hvordan man tilføjer en ny alias.
//
// RETTET 2026-09-07, SAMME DAG (opfølgning): Chris krydstjekkede hele truppen direkte mod
// BD/Nembadmintons egne registrerede navne (via highestPointGain-API'en, 382 GSB-navne) og
// leverede den definitive, bekræftede stavning for hver spiller. Listen herunder er opdateret
// til at matche PRÆCIS det — inkl. tre navne der ændrede sig fra tidligere samme dag (Hannah
// Clausen er nu det officielle navn, IKKE et længere navn — se navne.js), to nye alias-fund
// (Camilla Steinmetz Bagge, Theodor Lumby Jessen — begge fundet ved API-krydstjekket, Louis
// Valdemar Hedegaard Toftlund var allerede kendt fra GSB_NAVNE_ALIAS_OG_ANOMALIER.json), samt
// én helt ny spiller der ikke stod på den gamle 43-mands-liste: Shenai Antony (køn bekræftet
// "MEN" via API'ens gender-felt på Member, tilføjet til HERRER_2627). Truppen er nu 44
// spillere. Opdatér denne liste manuelt hvis spillere til-/framelder sig klubben.
const HERRER_2627 = [
  'Adnan Bacic', 'Andreas Drasbek', 'Brian Oddershede', 'Christian Staal',
  'Christoffer Müller', 'Erik Juul', 'Jonas Trusell-Jensen',
  'Jonathan W. Hansen', 'Kenn Blæsbjerg Christensen', 'Kenneth Hasselby',
  'Linus Bergström Hesselballe', 'Louis Valdemar Hedegaard Toftlund', 'Malthe Baltzer',
  'Morten Aarøe', 'Oliver Frei', 'Oliver Guldbæk', 'Oscar Donovan',
  'Oskar Isbosethsen', 'Rasmus Holmslykke Andersen', 'Sebastian Almeida Møller',
  'Shenai Antony', 'Sverre Stütz', 'Sylvester Østberg', 'Theodor Lumby Jessen',
  'Thor Pedersen', 'Thøger Jakobsen', 'Tobias Weinreich Hansen',
  'Yiting Chen',
];
const DAMER_2627 = [
  'Anja Thomsen', 'Camilla Steinmetz Bagge', 'Gitte Mathiasen',
  'Hannah Clausen', 'Helle Mathiasen', 'Lene Sørensen',
  'Linda Bækgaard', 'Line Nielsen', 'Louise Korsby Kofoed',
  'Marie Gotfred Johansen', 'Michelle Christensen', 'Mina Lorin Özden',
  'Nadia Mortensen', 'Rosa Hinge Carlsson', 'Signe Aarøe Jørgensen',
  'Stine Louise Knudsen',
];

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const spreadsheetId = event.queryStringParameters && event.queryStringParameters.spreadsheetId;
  if (!spreadsheetId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Mangler spreadsheetId query-parameter' }) };
  }

  try {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!credentialsJson) {
      throw new Error('Miljøvariablen GOOGLE_SERVICE_ACCOUNT_JSON er ikke sat i Netlify');
    }
    const credentials = JSON.parse(credentialsJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Spillerpoint!A2:A200',
    });

    const sheetNames = (res.data.values || [])
      .map((row) => (row[0] || '').trim())
      .filter((name) => name.length > 0);

    const knownHerrer = new Set(HERRER_2627);
    const knownDamer = new Set(DAMER_2627);
    const herrer = new Set(HERRER_2627);
    const damer = new Set(DAMER_2627);

    sheetNames.forEach((raaNavn) => {
      const name = officieltNavn(raaNavn);
      if (knownHerrer.has(name)) { herrer.add(name); return; }
      if (knownDamer.has(name)) { damer.add(name); return; }
      // Ukendt køn — tilføj til begge frem for at risikere at en rigtig tilmeldt spiller
      // slet ikke kan vælges nogen steder.
      herrer.add(name);
      damer.add(name);
    });

    const sortDa = (a, b) => a.localeCompare(b, 'da');
    const herrerOut = Array.from(herrer).sort(sortDa);
    const damerOut = Array.from(damer).sort(sortDa);
    const playersOut = Array.from(new Set([...herrerOut, ...damerOut])).sort(sortDa);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ players: playersOut, herrer: herrerOut, damer: damerOut }),
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
