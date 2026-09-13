const { google } = require('googleapis');
const { officieltNavn } = require('../lib/navne');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Kun POST er tilladt' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Ugyldig JSON i request-body' }) };
  }

  const { runde, matchIds, season, hint, spreadsheetId, password } = body;

  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (expectedPassword && password !== expectedPassword) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Forkert adgangskode' }) };
  }

  if (!runde || !Array.isArray(matchIds) || matchIds.length === 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Mangler "runde" eller "matchIds" (array)' }) };
  }

  const allRows = [];
  const errors = [];

  for (const matchId of matchIds) {
    try {
      const rows = await hentOgBehandlKamp(matchId, season || 2025, hint || 'Gladsaxe Søborg', runde);
      allRows.push(...rows);
    } catch (err) {
      errors.push({ matchId, message: err.message });
    }
  }

  let sheetsResult = null;
  if (allRows.length > 0 && spreadsheetId) {
    try {
      sheetsResult = await skrivTilGoogleSheets(spreadsheetId, allRows);
    } catch (err) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Rækker blev hentet, men kunne ikke skrives til Google Sheets: ' + err.message,
          rowsAdded: 0,
          rows: allRows,
          matchErrors: errors,
        }),
      };
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      rowsAdded: allRows.length,
      rows: allRows,
      matchErrors: errors,
      sheetsResult,
    }),
  };
};

async function hentOgBehandlKamp(matchId, season, hint, runde) {
  const query = `query {
    badmintonPlayerTeamMatch(input: { leagueMatchId: ${matchId}, season: ${season} }) {
      home { name squad { categories { category name results { homePoints guestPoints } players { name } } } }
      guest { name squad { categories { category name results { homePoints guestPoints } players { name } } } }
    }
  }`;

  const res = await fetch('https://app.nembadminton.dk/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`Nembadminton svarede med status ${res.status}`);
  }

  const json = await res.json();
  if (json.errors && json.errors.length) {
    throw new Error(json.errors.map((e) => e.message).join(' / '));
  }

  const d = json.data && json.data.badmintonPlayerTeamMatch;
  if (!d) {
    throw new Error(`Intet data fundet for match-ID ${matchId} (sæson ${season})`);
  }

  return behandlKampData(d, runde, hint);
}

// RETTET 2026-09-07: navne på individuelle spillere ("os"-siden, dem der reelt matches mod
// Spillerpoint) normaliseres nu via navne.js's alias-opslag, FØR de skrives til Resultater.
// Baggrund: Nembadminton staver nogle gange en spiller anderledes end vores egen kanoniske
// stavemåde (fx "Hannah Clausen" i stedet for "Hannah Phoebejada Clausen") — uden dette
// matchede Spillerpoint-arkets SUMIFS-formler aldrig navnet, og spilleren fik reelt 0 point
// for kampen selvom den var spillet og indtastet. Se navne.js for hvordan man tilføjer en ny
// alias. Modstanderholdets kombinerede navnetekst (ikke-individuel, aldrig matchet mod noget)
// normaliseres bevidst IKKE — det er kun reference-tekst.
//
// RETTET 2026-09-07 (walkover-fix, roadmap punkt 2): Nembadminton markerer en spiller/side der
// ikke mødte op med den bogstavelige tekst "Ikke fremmødt" i stedet for almindelige spillernavne
// — og ALLE tre sæt står tomme for den kamp (ingen homePoints/guestPoints overhovedet), så den
// gamle rene sætoptællings-logik (`homeSetWins > guestSetWins ? 'Hjemme' : ... : '?'`) endte med
// `Vinder: '?'` for enhver walkover, hvilket hverken matcher "Hjemme" eller "Ude" i noget
// efterfølgende logik (Point-kolonner, SUMIFS, `analyse.js`s dedup) — se
// `gsb-statistik-idebank.md`s 24/25-rekonstruktion og code review-rapportens F1 for den fulde
// baggrund. Kendte, allerede manuelt rettede 25/26-walkoverrækker i selve Resultater-arket bruger
// parenteser ("(Ikke fremmødt)"), men den rå API-tekst har ingen parenteser — `erWalkover()`
// nedenfor matcher derfor uafhængigt af mellemrum/store-små bogstaver og parenteser, så begge
// former genkendes ens.
function erWalkover(navne) {
  return (navne || []).some((n) => /ikke\s*fremm[øo]dt/i.test(n || ''));
}

function behandlKampData(d, runde, hint) {
  const home = d.home;
  const guest = d.guest;
  const hintLower = hint.trim().toLowerCase();
  const homeIsUs = home.name.toLowerCase().includes(hintLower);
  const guestIsUs = guest.name.toLowerCase().includes(hintLower);

  function extractHoldNumber(name) {
    const m = name.match(/(\d+)\s*$/);
    return m ? m[1] : '1';
  }

  let holdLabel = 'GSB ?';
  if (homeIsUs) holdLabel = 'GSB ' + extractHoldNumber(home.name);
  else if (guestIsUs) holdLabel = 'GSB ' + extractHoldNumber(guest.name);

  const homeCats = home.squad.categories;
  const guestCats = guest.squad.categories;
  const rows = [];

  for (let i = 0; i < homeCats.length; i++) {
    const hc = homeCats[i];
    const gc = guestCats[i];
    const kategori = hc.category;

    // Drop a phantom duplicate 3rd set only if the match was already decided
    // after 2 sets AND the 3rd result exactly repeats the 2nd (safety net, rarely triggers).
    let sets = (hc.results || []).filter((s) => s.homePoints !== null && s.guestPoints !== null);
    if (sets.length === 3) {
      const w1 = sets[0].homePoints > sets[0].guestPoints;
      const w2 = sets[1].homePoints > sets[1].guestPoints;
      const s2 = sets[1];
      const s3 = sets[2];
      if (w1 === w2 && s2.homePoints === s3.homePoints && s2.guestPoints === s3.guestPoints) {
        sets = sets.slice(0, 2);
      }
    }

    let homeSetWins = 0;
    let guestSetWins = 0;
    sets.forEach((s) => {
      if (s.homePoints > s.guestPoints) homeSetWins++;
      else if (s.guestPoints > s.homePoints) guestSetWins++;
    });

    const homeNames = (hc.players || []).map((p) => p.name);
    const guestNames = (gc.players || []).map((p) => p.name);
    const homeWalkover = erWalkover(homeNames);
    const guestWalkover = erWalkover(guestNames);

    let vinder;
    if (homeWalkover && !guestWalkover) {
      vinder = 'Ude';
    } else if (guestWalkover && !homeWalkover) {
      vinder = 'Hjemme';
    } else {
      vinder = homeSetWins > guestSetWins ? 'Hjemme' : guestSetWins > homeSetWins ? 'Ude' : '?';
    }

    const setTxt = sets.map((s) => `${s.homePoints}-${s.guestPoints}`);
    while (setTxt.length < 3) setTxt.push('');

    const homeCombined = homeNames.join(' / ');
    const guestCombined = guestNames.join(' / ');
    const isDoubles = homeNames.length > 1 || guestNames.length > 1;

    if (!isDoubles) {
      const homeSolo = homeNames[0] ? officieltNavn(homeNames[0]) : homeCombined;
      const guestSolo = guestNames[0] ? officieltNavn(guestNames[0]) : guestCombined;
      rows.push([runde, holdLabel, kategori, homeSolo, guestSolo, setTxt[0], setTxt[1], setTxt[2], vinder]);
    } else {
      // Only split the side(s) that are actually "us" into individual rows — that's the
      // only side whose names need to match Spillerpoint for scoring. The other side stays
      // as one combined text (reference only, never matched against anything).
      // If neither side matched the club-name hint, both flags default to true (split both, safe fallback).
      const splitHome = homeIsUs || (!homeIsUs && !guestIsUs);
      const splitGuest = guestIsUs || (!homeIsUs && !guestIsUs);

      if (splitHome) {
        homeNames.forEach((n) => rows.push([runde, holdLabel, kategori, officieltNavn(n), guestCombined, setTxt[0], setTxt[1], setTxt[2], vinder]));
      }
      if (splitGuest) {
        guestNames.forEach((n) => rows.push([runde, holdLabel, kategori, homeCombined, officieltNavn(n), setTxt[0], setTxt[1], setTxt[2], vinder]));
      }
    }
  }

  return rows;
}

async function skrivTilGoogleSheets(spreadsheetId, rows) {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentialsJson) {
    throw new Error('Miljøvariablen GOOGLE_SERVICE_ACCOUNT_JSON er ikke sat i Netlify');
  }
  let credentials;
  try {
    credentials = JSON.parse(credentialsJson);
  } catch (e) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON indeholder ikke gyldig JSON');
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Find the first blank template row by reading column A only (never touches J/K formulas).
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Resultater!A2:A',
  });
  const existingValues = existing.data.values || [];
  let firstBlankRow = 2;
  for (let i = 0; i < existingValues.length; i++) {
    const cell = existingValues[i][0];
    if (cell === undefined || cell === null || cell === '') {
      firstBlankRow = i + 2;
      break;
    }
    firstBlankRow = i + 3; // in case every row so far is filled, continue past the last one
  }

  const lastRow = firstBlankRow + rows.length - 1;
  const range = `Resultater!A${firstBlankRow}:I${lastRow}`;

  // Plain update: fills existing blank cells in place, never shifts or inserts rows,
  // so the Point (Hjemme)/(Ude) formulas in columns J/K are left completely untouched.
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  });

  return { updatedRange: result.data.updatedRange || range };
}
