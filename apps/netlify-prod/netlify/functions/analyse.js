const { google } = require('googleapis');
const { officieltNavn } = require('../lib/navne');

// Opdateret 2026-09-03 for at matche den udvidede Statistik-side (sæson-sammenligning,
// hold×kategori-matrix, spiller-drilldown m. board-historik). Indeholder tre ting der
// tidligere KUN fandtes i Claude-previewets klient-side reimplementering, aldrig i denne
// rigtige, shippede funktion:
//   1. Board-position-baseret dedup (matchKey inkl. boardPosition, ikke sæt-score-tekst) —
//      retter en reel win%-inflation-bug for doublekategorier (se board-position-afsnittet
//      i idébanken for baggrund og tal).
//   2. Hold×kategori-matrix (`matrix`) og pr.-spiller hold/kategori-opdeling m. board-
//      historik (`players[].byHoldCategory[hold|kategori].positions`).
//   3. `ikkeSlutspilHold`-query-parameter (kommasepareret holdliste, fra seasons.js pr.
//      sæson) — de nævnte hold tæller altid deres fulde sæson med, uanset runde-filter.
//
// RETTET 2026-09-07: `knownPlayers` og selve hjemme/ude-navnene normaliseres nu via
// navne.js's alias-opslag før sammenligning — se navne.js for baggrund. Dette retter
// matching for BÅDE nye og allerede-eksisterende Resultater-rækker med en stave-variant
// (fx "Hannah Clausen"), uden at selve arkets rå tekst behøver rettes.
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
  const ikkeSlutspilHold = new Set(
    ((event.queryStringParameters && event.queryStringParameters.ikkeSlutspilHold) || '')
      .split(',').map((h) => h.trim()).filter(Boolean)
  );
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

    const [resRes, playersRes] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Resultater!A2:K' }),
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Spillerpoint!A2:A200' }),
    ]);
    const rows = (resRes.data.values || []).filter((r) => {
      if (!r[0] || r[0] === '') return false;
      if (ikkeSlutspilHold.has(r[1])) return true; // hold uden slutspil: altid med, uanset runde-filter
      const runde = Number(r[0]);
      return runde >= rundeMin && runde <= rundeMax;
    });
    const knownPlayers = new Set(
      (playersRes.data.values || []).map((r) => officieltNavn((r[0] || '').trim())).filter(Boolean)
    );

    const playerStats = {}; // navn -> { wins, losses, byHoldCategory: {hold|kat: {wins,losses,positions[]}} }
    const teamStats = {}; // hold -> { wins, losses }
    const categoryStats = {}; // kategori -> { wins, losses }
    const matrixStats = {}; // hold -> kategori -> { wins, losses }
    const seenMatches = new Set(); // dedupe by board (runde|hold|kategori|boardPosition)
    const groupRowIdx = {}; // (runde|hold|kategori) -> running row index, used to derive board position

    function ensurePlayer(name) {
      if (!playerStats[name]) playerStats[name] = { wins: 0, losses: 0, byHoldCategory: {} };
      return playerStats[name];
    }
    function ensureHoldCat(obj, hold, kat) {
      const key = hold + '|' + kat;
      if (!obj.byHoldCategory[key]) obj.byHoldCategory[key] = { wins: 0, losses: 0, positions: [] };
      return obj.byHoldCategory[key];
    }
    function ensureMatrix(hold, kat) {
      if (!matrixStats[hold]) matrixStats[hold] = {};
      if (!matrixStats[hold][kat]) matrixStats[hold][kat] = { wins: 0, losses: 0 };
      return matrixStats[hold][kat];
    }
    // Singles (HS/DS) bidrager med 1 række pr. board; doubler (HD/DD/MD) bidrager normalt
    // med 2 (én pr. splittet "os"-spiller) — så inden for én (runde, hold, kategori)-gruppe
    // hører hver rowsPerBoard fortløbende rækker til samme board, i stigende boardrækkefølge.
    const SINGLES_KATS = { HS: true, DS: true };
    function rowsPerBoard(kat) { return SINGLES_KATS[kat] ? 1 : 2; }

    rows.forEach((r) => {
      const [runde, hold, kategori, hjemmeRaa, udeRaa, s1, s2, s3, vinder] = r;
      if (!hold || !kategori) return;

      const groupKey = `${runde}|${hold}|${kategori}`;
      const idxInGroup = groupRowIdx[groupKey] || 0;
      const boardPosition = Math.floor(idxInGroup / rowsPerBoard(kategori)) + 1;
      groupRowIdx[groupKey] = idxInGroup + 1;

      const hjemme = hjemmeRaa && !hjemmeRaa.includes(' / ') ? officieltNavn(hjemmeRaa.trim()) : hjemmeRaa;
      const ude = udeRaa && !udeRaa.includes(' / ') ? officieltNavn(udeRaa.trim()) : udeRaa;
      const hjemmeIsIndividual = hjemme && !hjemme.includes(' / ') && knownPlayers.has(hjemme);
      const udeIsIndividual = ude && !ude.includes(' / ') && knownPlayers.has(ude);
      const hjemmeWon = vinder === 'Hjemme';

      if (hjemmeIsIndividual) {
        const p = ensurePlayer(hjemme);
        const c = ensureHoldCat(p, hold, kategori);
        if (hjemmeWon) { p.wins++; c.wins++; } else { p.losses++; c.losses++; }
        c.positions.push({ runde: Number(runde), position: boardPosition });
      }
      if (udeIsIndividual) {
        const p = ensurePlayer(ude);
        const c = ensureHoldCat(p, hold, kategori);
        if (!hjemmeWon) { p.wins++; c.wins++; } else { p.losses++; c.losses++; }
        c.positions.push({ runde: Number(runde), position: boardPosition });
      }

      // Dedupe by BOARD (runde+hold+kategori+boardPosition), ikke sæt-score-tekst — se
      // filens header-kommentar. Uden dette fix inflateres double-kategoriernes win%.
      const matchKey = `${runde}|${hold}|${kategori}|${boardPosition}`;
      if (!seenMatches.has(matchKey)) {
        seenMatches.add(matchKey);
        if (!teamStats[hold]) teamStats[hold] = { wins: 0, losses: 0 };
        if (!categoryStats[kategori]) categoryStats[kategori] = { wins: 0, losses: 0 };
        const mCell = ensureMatrix(hold, kategori);
        if (hjemmeIsIndividual || udeIsIndividual) {
          const weWon = hjemmeIsIndividual ? hjemmeWon : !hjemmeWon;
          if (weWon) { teamStats[hold].wins++; categoryStats[kategori].wins++; mCell.wins++; }
          else { teamStats[hold].losses++; categoryStats[kategori].losses++; mCell.losses++; }
        }
      }
    });

    function withPct(obj) {
      const total = obj.wins + obj.losses;
      return { ...obj, total, winPct: total > 0 ? Math.round((obj.wins / total) * 1000) / 10 : null };
    }

    const playersOut = Object.entries(playerStats).map(([navn, s]) => {
      const byHC = {};
      Object.entries(s.byHoldCategory).forEach(([k, v]) => { byHC[k] = withPct(v); });
      return { navn, ...withPct(s), byHoldCategory: byHC };
    }).sort((a, b) => b.total - a.total);

    const teamsOut = Object.entries(teamStats).map(([hold, s]) => ({ hold, ...withPct(s) }))
      .sort((a, b) => a.hold.localeCompare(b.hold));

    const categoriesOut = Object.entries(categoryStats).map(([kategori, s]) => ({ kategori, ...withPct(s) }))
      .sort((a, b) => a.kategori.localeCompare(b.kategori));

    const matrixOut = {};
    Object.entries(matrixStats).forEach(([hold, byKat]) => {
      matrixOut[hold] = {};
      Object.entries(byKat).forEach(([kategori, s]) => { matrixOut[hold][kategori] = withPct(s); });
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        players: playersOut, teams: teamsOut, categories: categoriesOut, matrix: matrixOut,
        totalRows: rows.length, rundeMin, rundeMax,
      }),
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
