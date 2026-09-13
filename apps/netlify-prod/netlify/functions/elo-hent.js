// Deployet 2026-09-02 (Fase 1, godkendt af Chris: "Sheets ja tak"). Følger samme mønster som
// spillere.js/hent-resultater.js.
// Henter Kampsystemets fulde tilstand (roster + ratings + kamphistorik) fra Google Sheets,
// så Kampsystem-siden ikke længere mister data ved genindlæsning.
//
// GET /.netlify/functions/elo-hent?spreadsheetId=...
// Svar: { roster: [{navn,gruppe,single,double,mix}], kampe: [{runde,type,a1,a2,b1,b2,vinder,dato}] }

const { google } = require('googleapis');

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

    const [spillereRes, kampeRes] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'ELO_Spillere!A2:F1000' }),
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'ELO_Kampe!A2:L5000' }),
    ]);

    // Tomt/manglende felt = spilleren har (endnu) ingen rigtig BD-rating i den disciplin —
    // bevares som null (IKKE 0), så Kampsystemets null-safe UI/regler (ingen ratingændring når
    // en deltager mangler rating) fortsat virker efter en tur gennem Sheets.
    const parseRating = (v) => {
      const s = (v || '').toString().trim();
      if (s === '') return null;
      const n = parseInt(s, 10);
      return Number.isNaN(n) ? null : n;
    };
    const roster = (spillereRes.data.values || [])
      .filter((row) => (row[0] || '').trim())
      .map((row) => ({
        navn: (row[0] || '').trim(),
        gruppe: (row[1] || '').trim(),
        single: parseRating(row[2]),
        double: parseRating(row[3]),
        mix: parseRating(row[4]),
      }));

    const kampe = (kampeRes.data.values || [])
      .filter((row) => (row[0] || '').trim())
      .map((row) => ({
        dato: row[0] || '',
        runde: parseInt(row[1], 10) || 0,
        type: row[2] || '',
        a1: row[3] || '', a2: row[4] || '',
        b1: row[5] || '', b2: row[6] || '',
        vinder: row[7] || '',
        ratingAendring: row[8] || '',
        saet1: row[9] || '', saet2: row[10] || '', saet3: row[11] || '',
      }));

    return { statusCode: 200, headers, body: JSON.stringify({ roster, kampe }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
