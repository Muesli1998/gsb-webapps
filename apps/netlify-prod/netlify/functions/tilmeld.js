const { google } = require('googleapis');

// Opdateret 2026-09-03: gemmer nu også "betaling" (betalt/gratis) i en ny kolonne F i
// Tilmeldinger — matcher B5-designet (se idébanken) og den betalt/gratis-vælger der er
// tilføjet i tilmelding.html. Skriver blot til F uanset om arket allerede har en
// overskrift der ("Betaling") — harmløst hvis kolonnen mangler header, og begynder at
// fange data med det samme; Chris kan tilføje selve headeren i arket når det passer.
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

  const { spreadsheetId, navn, herrer, damer, email, betaling } = body;

  if (!spreadsheetId || !navn || !Array.isArray(herrer) || !Array.isArray(damer)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Mangler spreadsheetId, navn, herrer[] eller damer[]' }) };
  }
  if (herrer.length !== 6) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: `Der skal vælges præcis 6 herrer (fik ${herrer.length})` }) };
  }
  if (damer.length !== 4) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: `Der skal vælges præcis 4 damer (fik ${damer.length})` }) };
  }
  const alle10 = [...herrer, ...damer];
  const unikke = new Set(alle10.map((n) => n.trim()));
  if (unikke.size !== 10) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Samme spiller er valgt mere end én gang' }) };
  }
  if (betaling !== 'betalt' && betaling !== 'gratis') {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Mangler betaling ("betalt" eller "gratis")' }) };
  }

  try {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!credentialsJson) {
      throw new Error('Miljøvariablen GOOGLE_SERVICE_ACCOUNT_JSON er ikke sat i Netlify');
    }
    const credentials = JSON.parse(credentialsJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const tidsstempel = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const row = [tidsstempel, navn.trim(), herrer.join(', '), damer.join(', '), email || '', betaling];

    // Find first blank row by reading column A, then update in place (never insert/shift rows)
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Tilmeldinger!A2:A',
    });
    const existingValues = existing.data.values || [];
    let firstBlankRow = 2;
    for (let i = 0; i < existingValues.length; i++) {
      const cell = existingValues[i] && existingValues[i][0];
      if (cell === undefined || cell === null || cell === '') {
        firstBlankRow = i + 2;
        break;
      }
      firstBlankRow = i + 3;
    }

    const result = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Tilmeldinger!A${firstBlankRow}:F${firstBlankRow}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, row: firstBlankRow, updatedRange: result.data.updatedRange }),
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
