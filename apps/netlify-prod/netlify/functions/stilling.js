const { google } = require('googleapis');

// Opdateret 2026-09-03 (B5-rest): slår nu Betaling op pr. deltager i Tilmeldinger-fanen
// (kolonne F, tilføjet af tilmeld.js) og returnerer et podieBerettiget-flag pr. deltager.
// Reglen (aftalt i gsb-planlagte-features-spec.md, B5): case-insensitivt "Ja"/"Betalt" (og
// BLANK celle/manglende Tilmeldinger-match) tæller som podie-berettiget; alt andet ("Gratis",
// "Nej", eller enhver anden note) udelukker fra podiet. Selve pointberegningen/plads-tallet
// (baseret på Stilling-fanen) er URØRT — podieBerettiget bruges udelukkende af stilling.html
// til at afgøre hvem der vises på selve podiet og i "Honorable mentions".
function erPodieBerettiget(betalingRaw) {
  const v = (betalingRaw || '').trim().toLowerCase();
  if (v === '') return true; // blank/ingen Tilmeldinger-match = podie-berettiget som standard
  if (v === 'ja' || v === 'betalt') return true;
  return false;
}

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
  const rundeMin = parseInt((event.queryStringParameters && event.queryStringParameters.rundeMin) || '1', 10);
  const rundeMax = parseInt((event.queryStringParameters && event.queryStringParameters.rundeMax) || '11', 10);
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

    // Stilling: A=Plads, B=Navn, C..M=R1..R11, N=Total
    // Holdoversigt: A=Navn, B..G=H1..H6, H..K=D1..D4, L=Email
    // Tilmeldinger: A=Tidsstempel, B=Navn, C=Herrer, D=Damer, E=Email, F=Betaling
    const [stillingRes, holdRes] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Stilling!A2:N' }),
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Holdoversigt!A2:K' }),
    ]);

    const holdMap = {};
    (holdRes.data.values || []).forEach((r) => {
      const navn = (r[0] || '').trim();
      if (!navn) return;
      const picks = (r.slice(1, 11) || []).map((p) => (p || '').trim()).filter(Boolean);
      holdMap[navn] = picks;
    });

    // Betaling hentes i et separat, fejl-tolerant kald: ældre sæsoner har måske slet ikke
    // kolonne F endnu (eller Tilmeldinger-fanen er struktureret anderledes) — i så fald falder
    // vi tilbage til "ingen data = podie-berettiget som standard" i stedet for at fejle hele kaldet.
    const betalingMap = {};
    try {
      const tilRes = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Tilmeldinger!B2:F' });
      (tilRes.data.values || []).forEach((r) => {
        const navn = (r[0] || '').trim();
        if (!navn) return;
        betalingMap[navn] = (r[4] || '').trim(); // sidste række for et navn vinder ved gentilmelding
      });
    } catch (e) {
      // Ingen Tilmeldinger-data tilgængelig for denne sæson — alle behandles som podie-berettigede.
    }

    const stillingRows = stillingRes.data.values || [];
    const participants = stillingRows
      .map((r) => {
        const navn = (r[1] || '').trim();
        if (!navn) return null;
        const roundVals = [];
        for (let i = 0; i < 11; i++) {
          const v = parseFloat(r[2 + i]);
          roundVals.push(isNaN(v) ? 0 : v);
        }
        const selected = roundVals.slice(rundeMin - 1, rundeMax);
        const total = Math.round(selected.reduce((a, b) => a + b, 0) * 10) / 10;
        const betalingRaw = betalingMap[navn] || '';
        return {
          navn,
          picks: holdMap[navn] || [],
          roundVals,
          total,
          betaling: betalingRaw || null,
          podieBerettiget: erPodieBerettiget(betalingRaw),
        };
      })
      .filter(Boolean);

    participants.sort((a, b) => b.total - a.total);
    participants.forEach((p, i) => {
      p.plads = i + 1;
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ participants, rundeMin, rundeMax }),
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
