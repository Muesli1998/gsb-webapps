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

    const [resRes, playersRes] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Resultater!A2:K' }),
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Spillerpoint!A2:A200' }),
    ]);
    const rows = (resRes.data.values || []).filter((r) => r[0] && r[0] !== '' && Number(r[0]) >= rundeMin && Number(r[0]) <= rundeMax);
    const knownPlayers = new Set((playersRes.data.values || []).map((r) => (r[0] || '').trim()).filter(Boolean));

    const playerStats = {}; // navn -> { wins, losses, byCategory: {cat: {wins, losses}} }
    const teamStats = {}; // hold -> { wins, losses }
    const categoryStats = {}; // kategori -> { wins, losses }
    const seenMatches = new Set(); // dedupe doubles rows (2 rows per real match) for team/category counts
    const groupRowIdx = {}; // (runde|hold|kategori) -> running row index, used to derive board position

    function ensurePlayer(name) {
      if (!playerStats[name]) playerStats[name] = { wins: 0, losses: 0, byCategory: {} };
      return playerStats[name];
    }
    function ensureCat(obj, cat) {
      if (!obj.byCategory[cat]) obj.byCategory[cat] = { wins: 0, losses: 0 };
      return obj.byCategory[cat];
    }
    // Singles (HS/DS) contribute one row per board; doubles (HD/DD/MD) normally
    // contribute two (one per split "us" player) — so within a single
    // (runde, hold, kategori) group, every rowsPerBoard consecutive rows belong
    // to the same board, in ascending board order.
    const SINGLES_KATS = { HS: true, DS: true };
    function rowsPerBoard(kat) { return SINGLES_KATS[kat] ? 1 : 2; }

    rows.forEach((r) => {
      const [runde, hold, kategori, hjemme, ude, s1, s2, s3, vinder, ptH, ptU] = r;
      if (!hold || !kategori) return;

      const groupKey = `${runde}|${hold}|${kategori}`;
      const idxInGroup = groupRowIdx[groupKey] || 0;
      const boardPosition = Math.floor(idxInGroup / rowsPerBoard(kategori)) + 1;
      groupRowIdx[groupKey] = idxInGroup + 1;

      const hjemmeIsIndividual = hjemme && !hjemme.includes(' / ') && knownPlayers.has(hjemme.trim());
      const udeIsIndividual = ude && !ude.includes(' / ') && knownPlayers.has(ude.trim());
      const hjemmeWon = vinder === 'Hjemme';

      // --- Player-level stats: only for the individual (non-combined) side ---
      if (hjemmeIsIndividual) {
        const p = ensurePlayer(hjemme.trim());
        const c = ensureCat(p, kategori);
        if (hjemmeWon) { p.wins++; c.wins++; } else { p.losses++; c.losses++; }
      }
      if (udeIsIndividual) {
        const p = ensurePlayer(ude.trim());
        const c = ensureCat(p, kategori);
        if (!hjemmeWon) { p.wins++; c.wins++; } else { p.losses++; c.losses++; }
      }

      // --- Team/category stats: dedupe by BOARD (runde+hold+kategori+boardPosition),
      // not by set-score text. ~50% of real doubles rows have blank Sæt-columns on
      // one of the two partner rows for the same board (a data-conversion artifact —
      // Point(Hjemme)/(Ude), and therefore Dream Team scoring via Spillerpoint's
      // SUMIFS, is unaffected since those columns are always filled correctly).
      // Keying on set-score text meant a blank-vs-filled pair never matched, so the
      // SAME physical board got counted as two separate matches — inflating
      // team/category win counts for doubles categories by up to ~50%.
      const matchKey = `${runde}|${hold}|${kategori}|${boardPosition}`;
      if (!seenMatches.has(matchKey)) {
        seenMatches.add(matchKey);

        if (!teamStats[hold]) teamStats[hold] = { wins: 0, losses: 0 };
        if (hjemmeIsIndividual || udeIsIndividual) {
          // whichever side is "us" (individual) determines win/loss for the team
          const weWon = hjemmeIsIndividual ? hjemmeWon : !hjemmeWon;
          if (weWon) teamStats[hold].wins++; else teamStats[hold].losses++;
        }

        if (!categoryStats[kategori]) categoryStats[kategori] = { wins: 0, losses: 0 };
        if (hjemmeIsIndividual || udeIsIndividual) {
          const weWon = hjemmeIsIndividual ? hjemmeWon : !hjemmeWon;
          if (weWon) categoryStats[kategori].wins++; else categoryStats[kategori].losses++;
        }
      }
    });

    function withPct(obj) {
      const total = obj.wins + obj.losses;
      return { ...obj, total, winPct: total > 0 ? Math.round((obj.wins / total) * 1000) / 10 : null };
    }

    const playersOut = Object.entries(playerStats).map(([navn, s]) => ({
      navn,
      ...withPct(s),
      byCategory: Object.fromEntries(Object.entries(s.byCategory).map(([c, v]) => [c, withPct(v)])),
    })).sort((a, b) => b.total - a.total);

    const teamsOut = Object.entries(teamStats).map(([hold, s]) => ({ hold, ...withPct(s) }))
      .sort((a, b) => a.hold.localeCompare(b.hold));

    const categoriesOut = Object.entries(categoryStats).map(([kategori, s]) => ({ kategori, ...withPct(s) }))
      .sort((a, b) => a.kategori.localeCompare(b.kategori));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ players: playersOut, teams: teamsOut, categories: categoriesOut, totalRows: rows.length, rundeMin, rundeMax }),
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
