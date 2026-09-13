// Deployet 2026-09-02 (Fase 1, godkendt af Chris: "Sheets ja tak"). Følger samme
// "find-første-tomme-række + values.update"-mønster som
// hent-resultater.js bruger for Resultater-arket (undgår at .append forskyder data ift.
// eventuelle formler i nabokolonner — se PROJECT_BRIEF.md's kendte faldgrube #3).
//
// POST /.netlify/functions/elo-gem
// Body: {
//   spreadsheetId,
//   roster: [{navn,gruppe,single,double,mix}, ...]   — FULD, opdateret spillertrup, overskriver ELO_Spillere
//   nyeKampe: [{runde,type,a1,a2,b1,b2,vinder,ratingAendring,saet1?,saet2?,saet3?}, ...]  — appendes til ELO_Kampe
// }
//
// Skriver hele roster-tabellen på hver kald (lille datasæt, ~60-100 rækker — ingen grund til
// diff-baseret opdatering). Kampe TILFØJES, overskrives aldrig (kamphistorik skal bevares).

const { google } = require('googleapis');

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

  const { spreadsheetId, roster, nyeKampe } = body;
  if (!spreadsheetId || !Array.isArray(roster)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Mangler spreadsheetId eller roster[]' }) };
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

    // --- Overskriv ELO_Spillere (fuld tabel) ---
    const nu = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // null (ingen BD-rating i den disciplin endnu) skrives som tom celle, ikke 0 — 0 ville se ud
    // som en rigtig (ekstremt lav) rating og ville fejlagtigt tælles med i fremtidige
    // rundefordelinger/ratingændringer.
    const cell = (v) => (v === null || v === undefined ? '' : v);
    const spillereRows = roster.map((p) => [p.navn, p.gruppe, cell(p.single), cell(p.double), cell(p.mix), nu]);
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `ELO_Spillere!A2:F${1 + Math.max(spillereRows.length, 1)}`,
      valueInputOption: 'RAW',
      requestBody: { values: spillereRows },
    });

    // --- Append nye kampe til ELO_Kampe (find første tomme række, skriv der) ---
    let kampeSkrevet = 0;
    if (Array.isArray(nyeKampe) && nyeKampe.length > 0) {
      const eksisterende = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'ELO_Kampe!A2:A5000',
      });
      const antalEksisterende = (eksisterende.data.values || []).filter((r) => (r[0] || '').trim()).length;
      const startRow = 2 + antalEksisterende;
      const kampeRows = nyeKampe.map((k) => [
        nu, k.runde, k.type, k.a1 || '', k.a2 || '', k.b1 || '', k.b2 || '',
        k.vinder, k.ratingAendring ?? '', k.saet1 || '', k.saet2 || '', k.saet3 || '',
      ]);
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `ELO_Kampe!A${startRow}:L${startRow + kampeRows.length - 1}`,
        valueInputOption: 'RAW',
        requestBody: { values: kampeRows },
      });
      kampeSkrevet = kampeRows.length;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, spillereSkrevet: spillereRows.length, kampeSkrevet }),
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
