import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DB_PATH = path.join(ROOT, 'data', 'gsb-statistik-normalized.db');
const JSON_PATH = path.join(ROOT, 'results', '177-effektivitet-metoder.json');
const MD_PATH = path.join(ROOT, 'results', '177-effektivitet-metoder.md');
const SEASON_ID = 2025;
const MINIMUM_THRESHOLD = 20;
const BAYES_PRIOR_MATCHES = 10;
const ELO_START = 1500;
const ELO_K = 24;
const Z95 = 1.96;
const NS = [5, 10, 20];
const METHODS = [
  { id: 'raw', name: 'Rå vindprocent' },
  { id: 'bayes', name: 'Bayes-justeret' },
  { id: 'wilson', name: 'Wilson nedre 95 %' },
  { id: 'minimum', name: `Minimum ${MINIMUM_THRESHOLD} kampe + rå %` },
  { id: 'elo', name: 'ELO' },
];

const db = new DatabaseSync(DB_PATH, { readOnly: true });
try {
  const season = db.prepare('SELECT season_id, label FROM seasons WHERE season_id=?').get(SEASON_ID);
  if (!season) throw new Error(`Sæson ${SEASON_ID} findes ikke i databasen.`);
  const rows = db.prepare(`
    SELECT im.individual_match_id, im.team_match_id, im.discipline_raw, im.winner_side,
           im.status AS individual_status, im.result_marker_raw,
           tm.round_date, tm.game_time, tm.round_number, tm.home_name_raw, tm.away_name_raw,
           tm.walkover_text_raw, tm.walkover_winner_raw,
           t.team_id AS gsb_team_id, t.name_raw AS gsb_team_name,
           c.age_group_id,
           mp.player_id, mp.side AS participant_side, mp.points_at_match,
           p.name_raw AS player_name
    FROM individual_matches im
    JOIN team_matches tm ON tm.team_match_id=im.team_match_id
    JOIN teams t ON t.team_id=tm.gsb_team_id AND t.club_id=1093 AND t.season_id=tm.season_id
    LEFT JOIN competitions c ON c.competition_id=t.competition_id
    JOIN individual_match_players mp ON mp.individual_match_id=im.individual_match_id
    JOIN players p ON p.player_id=mp.player_id
    WHERE tm.season_id=?
    ORDER BY COALESCE(NULLIF(tm.round_date,''), NULLIF(tm.game_time,''), ''),
             tm.round_number, im.team_match_id, im.individual_match_id, mp.player_id
  `).all(SEASON_ID);

  const gameMap = new Map();
  let unresolvedGsbSideRows = 0;
  for (const row of rows) {
    const isHome = row.gsb_team_name && row.home_name_raw === row.gsb_team_name;
    const isAway = row.gsb_team_name && row.away_name_raw === row.gsb_team_name;
    const gsbSide = isHome === isAway ? null : (isHome ? 'home' : 'away');
    if (!gsbSide || !['home', 'away'].includes(row.participant_side)) {
      unresolvedGsbSideRows++;
      continue;
    }
    if (!gameMap.has(row.individual_match_id)) {
      const woText = String(row.walkover_text_raw ?? '');
      gameMap.set(row.individual_match_id, {
        id: row.individual_match_id,
        teamMatchId: row.team_match_id,
        date: row.round_date || row.game_time || '',
        discipline: row.discipline_raw || 'ukendt',
        ageGroupId: row.age_group_id,
        gsbSide,
        winnerSide: row.winner_side,
        walkoverText: woText,
        walkover: /ikke\s*fremmødt/iu.test(woText),
        marker: row.result_marker_raw,
        individualStatus: row.individual_status,
        participants: [],
      });
    }
    gameMap.get(row.individual_match_id).participants.push({
      id: row.player_id,
      name: row.player_name,
      side: row.participant_side,
      pointsAtMatch: row.points_at_match,
    });
  }
  const games = [...gameMap.values()].filter(g => g.participants.length > 0);
  const playersInSeason = new Set(games.flatMap(g => g.participants.filter(p => p.side === g.gsbSide).map(p => p.id)));
  const validOutcome = g => g.winnerSide === 'home' || g.winnerSide === 'away';
  const unknownGames = games.filter(g => !validOutcome(g));
  const knownGames = games.filter(validOutcome);
  const walkoverGames = games.filter(g => g.walkover);
  const unknownWalkovers = walkoverGames.filter(g => !validOutcome(g));
  const disciplineKind = d => ['S', 'HS'].includes(d) ? 'single' :
    ['D', 'DD', 'DS', 'HD', 'MD'].includes(d) ? 'double' : 'unknown';

  function eventsFor({ includeWalkovers = false, discipline = null, seasonHalf = null, parity = null } = {}) {
    const selected = games.filter(g => validOutcome(g) && (includeWalkovers || !g.walkover) &&
      (!discipline || disciplineKind(g.discipline) === discipline));
    const output = [];
    for (const g of selected) {
      const ownParticipants = g.participants.filter(p => p.side === g.gsbSide);
      const opponentIds = [...new Set(g.participants.filter(p => p.side !== g.gsbSide).map(p => p.id))];
      for (const p of ownParticipants) {
        output.push({
          playerId: p.id, playerName: p.name, gameId: g.id, teamMatchId: g.teamMatchId,
          date: g.date, discipline: g.discipline, ageGroupId: g.ageGroupId,
          win: g.winnerSide === g.gsbSide, walkover: g.walkover,
          pointsAtMatch: p.pointsAtMatch, opponentIds,
        });
      }
    }
    output.sort((a, b) => a.date.localeCompare(b.date) || a.teamMatchId - b.teamMatchId || a.gameId - b.gameId || a.playerId - b.playerId);
    if (parity !== null) {
      const indexes = new Map();
      return output.filter(e => {
        const i = indexes.get(e.playerId) ?? 0;
        indexes.set(e.playerId, i + 1);
        return i % 2 === parity;
      });
    }
    if (seasonHalf !== null) {
      const dates = [...new Set(output.map(e => e.date).filter(Boolean))].sort();
      const pivot = dates.length ? dates[Math.floor((dates.length - 1) / 2)] : '';
      return output.filter(e => seasonHalf === 0 ? e.date <= pivot : e.date > pivot);
    }
    return output;
  }

  function groupByPlayer(events) {
    const map = new Map();
    for (const e of events) {
      if (!map.has(e.playerId)) map.set(e.playerId, { id: e.playerId, name: e.playerName, events: [] });
      map.get(e.playerId).events.push(e);
    }
    return map;
  }

  function calculateElo(events) {
    const ratings = new Map();
    const gameGroups = new Map();
    for (const e of events) {
      if (!gameGroups.has(e.gameId)) gameGroups.set(e.gameId, []);
      gameGroups.get(e.gameId).push(e);
    }
    for (const entries of gameGroups.values()) {
      const ownIds = [...new Set(entries.map(e => e.playerId))];
      const opponentIds = entries[0].opponentIds;
      if (!opponentIds.length) continue;
      for (const id of [...ownIds, ...opponentIds]) if (!ratings.has(id)) ratings.set(id, ELO_START);
      const ownAverage = ownIds.reduce((sum, id) => sum + ratings.get(id), 0) / ownIds.length;
      const opponentAverage = opponentIds.reduce((sum, id) => sum + ratings.get(id), 0) / opponentIds.length;
      const expected = 1 / (1 + 10 ** ((opponentAverage - ownAverage) / 400));
      const actual = entries[0].win ? 1 : 0;
      const delta = ELO_K * (actual - expected);
      for (const id of ownIds) ratings.set(id, ratings.get(id) + delta);
      for (const id of opponentIds) ratings.set(id, ratings.get(id) - delta);
    }
    return ratings;
  }

  function scores(events, minGames, minimumMethodThreshold = MINIMUM_THRESHOLD) {
    const grouped = groupByPlayer(events);
    const valid = [...grouped.values()].filter(p => p.events.length >= minGames);
    const totalWins = events.filter(e => e.win).length;
    const totalGames = events.length;
    const priorMean = totalGames ? totalWins / totalGames : 0.5;
    const elo = calculateElo(events);
    const entries = valid.map(p => {
      const wins = p.events.filter(e => e.win).length;
      const n = p.events.length;
      const raw = wins / n;
      const posterior = (wins + BAYES_PRIOR_MATCHES * priorMean) / (n + BAYES_PRIOR_MATCHES);
      const z2 = Z95 * Z95;
      const wilson = (raw + z2 / (2 * n) - Z95 * Math.sqrt((raw * (1 - raw) + z2 / (4 * n)) / n)) / (1 + z2 / n);
      return { id: p.id, name: p.name, games: n, wins, raw, bayes: posterior, wilson, minimum: raw, elo: elo.get(p.id) ?? ELO_START };
    });
    const result = {};
    for (const method of METHODS) {
      const min = method.id === 'minimum' ? Math.max(minGames, minimumMethodThreshold) : minGames;
      const qualified = entries.filter(e => e.games >= min);
      const sorted = [...qualified].sort((a, b) => b[method.id] - a[method.id] || a.name.localeCompare(b.name, 'da') || a.id - b.id);
      result[method.id] = sorted.map((e, i) => ({ ...e, rank: i + 1 }));
    }
    return { result, priorMean, playersWithAny: grouped.size, playersQualifyingBase: entries.length };
  }

  function rankMap(ranked) { return new Map(ranked.map(x => [x.id, x.rank])); }
  function scoreMap(ranked, methodId) { return new Map(ranked.map(x => [x.id, x[methodId]])); }
  function spearman(a, b) {
    const common = [...a.keys()].filter(id => b.has(id));
    if (common.length < 2) return { rho: null, n: common.length };
    const midranks = map => {
      const vals = common.map(id => [id, map.get(id)]).sort((x, y) => x[1] - y[1]);
      const out = new Map();
      for (let i = 0; i < vals.length;) {
        let j = i + 1;
        while (j < vals.length && vals[j][1] === vals[i][1]) j++;
        const rank = (i + 1 + j) / 2;
        for (let k = i; k < j; k++) out.set(vals[k][0], rank);
        i = j;
      }
      return out;
    };
    const ra = midranks(a), rb = midranks(b);
    const ma = common.reduce((s, id) => s + ra.get(id), 0) / common.length;
    const mb = common.reduce((s, id) => s + rb.get(id), 0) / common.length;
    let cov = 0, va = 0, vb = 0;
    for (const id of common) { const x = ra.get(id) - ma, y = rb.get(id) - mb; cov += x * y; va += x * x; vb += y * y; }
    return { rho: va && vb ? cov / Math.sqrt(va * vb) : null, n: common.length };
  }
  function splitsFor(baseEvents, n, methodId) {
    const eligibleIds = new Set(scores(baseEvents, n).result[methodId].map(p => p.id));
    const specifications = [
      ['lige/ulige spillerkampe', eventsFor({ parity: 0 }), eventsFor({ parity: 1 })],
      ['første/anden sæsonhalvdel', eventsFor({ seasonHalf: 0 }), eventsFor({ seasonHalf: 1 })],
    ];
    return specifications.map(([label, firstEvents, secondEvents]) => {
      const first = scores(firstEvents.filter(e => eligibleIds.has(e.playerId)), 1, 0).result[methodId];
      const second = scores(secondEvents.filter(e => eligibleIds.has(e.playerId)), 1, 0).result[methodId];
      const a = rankMap(first), b = rankMap(second);
      const common = [...a.keys()].filter(id => b.has(id));
      const shifts = common.map(id => ({ id, name: (first.find(x => x.id === id) || second.find(x => x.id === id)).name, first: a.get(id), second: b.get(id), shift: Math.abs(a.get(id) - b.get(id)) })).sort((x, y) => y.shift - x.shift || x.name.localeCompare(y.name, 'da'));
      return { split: label, spearman: spearman(scoreMap(first, methodId), scoreMap(second, methodId)), largestShifts: shifts.slice(0, 5) };
    });
  }

  const defaultEvents = eventsFor();
  const allSeasonParticipantEvents = eventsFor({ includeWalkovers: true });
  const output = {
    metadata: {
      seasonId: SEASON_ID, seasonLabel: season.label, club: 'Gladsaxe Søborg', generatedAt: new Date().toISOString(),
      databasePath: 'statistik/data/gsb-statistik-normalized.db', readOnly: true,
      sampleScope: 'GSB spillere i individuelle kampe for GSB-hold i 2025/26, alle aldersgrupper',
      bayesPrior: { type: 'Beta-binomial posterior mean', priorMatches: BAYES_PRIOR_MATCHES, pooledWinRate: null },
      wilson: 'Nedre grænse i Wilson-scoreinterval med z=1,96 (95 % tosidet)',
      minimumRule: { games: MINIMUM_THRESHOLD, note: 'Metode d kræver altid mindst 20 kampe, også når N=5 eller N=10.' },
      elo: { start: ELO_START, k: ELO_K, description: 'Holdbaseret ELO med faktiske deltagere på begge sider; modstander- og GSB-spillernes ratinggennemsnit bestemmer forventet udfald. K=24; alle starter på 1500.' },
      walkoverRule: 'Inkludér kun kamp som walkover ved eksplicit tekst, der indeholder “Ikke fremmødt”. Standardrangeringer udelukker identificerede walkovers.',
    },
    coverage: {
      individualGamesWithGSBParticipant: games.length,
      distinctGSBPlayersInSeason: playersInSeason.size,
      youthIndividualGames: games.filter(g => [2, 3, 4, 5, 6, 18].includes(g.ageGroupId)).length,
      validOutcomeGames: knownGames.length,
      unknownOutcomeGames: unknownGames.length,
      validPlayerAppearancesIncludingWalkovers: allSeasonParticipantEvents.length,
      validPlayerAppearancesDefault: defaultEvents.length,
      walkoverGames: walkoverGames.length,
      validWalkoverGames: walkoverGames.filter(validOutcome).length,
      unknownOutcomeWalkoverGames: unknownWalkovers.length,
      unresolvedParticipantOrSideRows: unresolvedGsbSideRows,
      playerPointsKnown: defaultEvents.filter(e => e.pointsAtMatch !== null && e.pointsAtMatch !== undefined && e.pointsAtMatch !== '').length,
      resultMarkersOnUnknownGames: [...new Set(unknownGames.map(g => g.marker).filter(x => x !== null))],
      unknownOutcomeEvidence: unknownGames.map(g => ({ individualMatchId: g.id, teamMatchId: g.teamMatchId, date: g.date, ageGroupId: g.ageGroupId, discipline: g.discipline, individualStatus: g.individualStatus, winnerSide: g.winnerSide, resultMarkerRaw: g.marker, explicitWalkoverText: g.walkoverText || null })),
      unknownOutcomeByAgeGroup: Object.fromEntries([...new Set(unknownGames.map(g => String(g.ageGroupId ?? 'ukendt')))].map(age => [age, unknownGames.filter(g => String(g.ageGroupId ?? 'ukendt') === age).length])),
      ageGroupLabels: { "1":"SEN", "2":"U9", "3":"U11", "4":"U13", "5":"U15", "6":"U17", "9":"VETERAN A / SEN40+", "11":"SEN50+", "13":"SEN60+", "17":"SEN70+", "18":"U17/U19" },
      individualMatchesByAgeGroup: Object.fromEntries([...new Set(games.map(g => String(g.ageGroupId ?? 'ukendt')))].sort().map(age => [age, games.filter(g => String(g.ageGroupId ?? 'ukendt') === age).length])),
      singlesDoubles: ['single', 'double', 'unknown'].map(kind => {
        const selected = defaultEvents.filter(e => disciplineKind(e.discipline) === kind);
        return { kind, playerAppearances: selected.length, wins: selected.filter(e => e.win).length,
          winRate: selected.length ? selected.filter(e => e.win).length / selected.length : null,
          distinctPlayers: new Set(selected.map(e => e.playerId)).size,
          unknownRawDisciplineCount: kind === 'unknown' ? games.filter(g => disciplineKind(g.discipline) === 'unknown').length : 0 };
      }),
      rawDisciplines: Object.fromEntries([...new Set(games.map(g => g.discipline))].sort().map(d => [d, games.filter(g => g.discipline === d).length])),
    },
    comparisons: [],
    sensitivity: { walkovers: [], singlesDoubles: [], opponentStrength: { knownPlayerPoints: defaultEvents.filter(e => e.pointsAtMatch !== null && e.pointsAtMatch !== undefined && e.pointsAtMatch !== '').length, note: 'Modstanderpoint mangler i alle inkluderede spilleroptrædener; modstanderstyrke kan ikke beregnes.' } },
  };
  const pooledWins = defaultEvents.filter(e => e.win).length;
  output.metadata.bayesPrior.pooledWinRate = defaultEvents.length ? pooledWins / defaultEvents.length : null;

  for (const n of NS) {
    const ranked = scores(defaultEvents, n);
    const perMethod = [];
    for (const method of METHODS) {
      const players = ranked.result[method.id];
      perMethod.push({ methodId: method.id, method: method.name, eligiblePlayers: players.length,
        playersWithKnownNonWalkoverResults: ranked.playersWithAny, excludedAmongAllSeasonParticipants: playersInSeason.size - players.length,
        top10: players.slice(0, 10).map(p => ({ rank: p.rank, player: p.name, games: p.games, wins: p.wins, winRate: p.raw, score: p[method.id] })) });
      const splits = splitsFor(defaultEvents, n, method.id);
      output.comparisons.push({ minGamesN: n, methodId: method.id, method: method.name,
        playersWithKnownNonWalkoverResults: ranked.playersWithAny, eligiblePlayers: players.length,
        excludedPlayers: playersInSeason.size - players.length, bayesPriorWinRate: ranked.priorMean,
        splits });
    }
    const rankmaps = Object.fromEntries(METHODS.map(m => [m.id, rankMap(ranked.result[m.id])]));
    const shifts = [];
    for (const id of new Set(METHODS.flatMap(m => ranked.result[m.id].map(p => p.id)))) {
      const present = METHODS.map(m => ({ methodId: m.id, rank: rankmaps[m.id].get(id) })).filter(x => x.rank !== undefined);
      if (present.length < 2) continue;
      const ranks = present.map(x => x.rank);
      const span = Math.max(...ranks) - Math.min(...ranks);
      if (span > 5) {
        const name = METHODS.map(m => ranked.result[m.id].find(p => p.id === id)?.name).find(Boolean);
        shifts.push({ player: name, rankSpan: span, bestRank: Math.min(...ranks), worstRank: Math.max(...ranks), ranks: Object.fromEntries(present.map(x => [x.methodId, x.rank])) });
      }
    }
    output.sensitivity.walkovers.push({ minGamesN: n, methods: METHODS.map(m => {
      const withWo = scores(allSeasonParticipantEvents, n).result[m.id];
      const withoutWo = ranked.result[m.id];
      const a = rankMap(withWo), b = rankMap(withoutWo);
      return { methodId: m.id, eligibleWith: withWo.length, eligibleWithout: withoutWo.length,
        top10Overlap: withWo.slice(0, 10).filter(x => b.has(x.id) && b.get(x.id) <= 10).length,
        spearmanWithVsWithout: spearman(scoreMap(withWo, m.id), scoreMap(withoutWo, m.id)) };
    }) });
    output.sensitivity.singlesDoubles.push({ minGamesN: n, disciplines: ['single', 'double'].map(kind => {
      const sub = scores(defaultEvents.filter(e => disciplineKind(e.discipline) === kind), n);
      return { kind, methods: METHODS.map(m => ({ methodId: m.id, eligiblePlayers: sub.result[m.id].length,
        top10: sub.result[m.id].slice(0, 10).map(p => ({ player: p.name, games: p.games, wins: p.wins, winRate: p.raw })) })) };
    }) });
    output.sensitivity.methodRankShifts = output.sensitivity.methodRankShifts || [];
    output.sensitivity.methodRankShifts.push({ minGamesN: n, playersOverFivePlaces: shifts.sort((a, b) => b.rankSpan - a.rankSpan || a.player.localeCompare(b.player, 'da')) });
    output[`top10_N${n}`] = perMethod;
  }
  output.caveats = [
    'ELO bruger de faktiske modstanderdeltagere i GSB-kampene, men modstandernes andre kampe uden GSB og pointbaseret styrke findes ikke i dette datasæt.',
    'Bayes-prioren er sæsonens samlede GSB-spilleroptrædelses-vindprocent med 10 pseudo-kampe; dobbeltkampe bidrager med hver GSB-spillers optræden.',
    'Disciplinlabels S/HS er behandlet som single; D/DD/DS/HD/MD som double. Ukendte labels rapporteres separat.',
    'Kampe uden home/away-vindermarkør er udelukket fra scoring og tælles særskilt. Rå markører med ukendt betydning fortolkes ikke.',
    'Resultater måler vundne individuelle kampe, ikke fantasy-point eller samlet holdkampseffekt.',
  ];
  const fmtPct = x => x === null || x === undefined ? 'ukendt' : `${(100 * x).toFixed(1)} %`;
  const fmtRho = x => x === null || x === undefined ? 'ukendt' : x.toFixed(3);
  const lines = [
    '# Opgave 177 — effektivitet: metodesammenligning', '',
    `Data: ${season.label}, Gladsaxe Søborg, alle aldersgrupper. Genereret ${output.metadata.generatedAt}. SQLite åbnet read-only.`, '',
    '## Kort anbefaling (vurdering)', '',
    '**Anbefaling til B3: vis rå vindprocent sammen med kampantal, og brug Bayes-justeret procent som standard sortering ved små stikprøver.** Den dæmper udsving uden at skjule kampantallet. Wilson er et gennemskueligt konservativt alternativ, men dens nedre grænse kan føles straffende. ELO er den mest resultatbaserede modstanderjustering her, men starter alle deltagere på 1500, bygger kun på kampe mod GSB og mangler point-/ekstern kampstyrke. Minimum 20 kampe er let at forklare, men udelukker spillere og siger intet om hvor gode deres modstandere var. Vurderingen er foreløbig og bygger på én sæson.', '',
    '## Datagrundlag og udfald', '',
    `- Individuelle kampe med GSB-deltager: ${games.length}; med kendt vinder: ${knownGames.length}; uden kendt home/away-vinder: ${unknownGames.length}. Ukendte udfald er udelukket og ikke gættet.`,
    `- Spillertilfælde med kendt udfald: ${allSeasonParticipantEvents.length} inkl. walkovers, ${defaultEvents.length} ekskl. walkovers.`,
    `- Eksplicitte walkover-kampe (“Ikke fremmødt”): ${walkoverGames.length}; med kendt udfald: ${walkoverGames.filter(validOutcome).length}; kendt markør mangler i ${unknownWalkovers.length}. Standardrangeringer udelukker dem.`,
    `- Databasen har point ved kamp for ${output.sensitivity.opponentStrength.knownPlayerPoints} af ${defaultEvents.length} standardoptrædener; modstanderstyrke er derfor ukendt.`,
    `- Ukendt GSB-side/deltagerrække: ${unresolvedGsbSideRows}. Ungdom (U9-U17/U19): ${output.coverage.youthIndividualGames} kampe. Aldersgruppeantal individuelle kampe (rå ID): ${JSON.stringify(output.coverage.individualMatchesByAgeGroup)}.`,
    `- Bayes-prior: ${fmtPct(output.metadata.bayesPrior.pooledWinRate)} pooled GSB-spilleroptrædelses-vindrate, vægt 10 kampe. Minimumsmetoden kræver altid ${MINIMUM_THRESHOLD} kampe.`, '',
    '## Metoder: top 10 for N=5, 10, 20', '',
    'Score er vindprocent for rå/minimum, posterior middelværdi for Bayes, Wilsons nedre 95 %-grænse eller sæsonslut-ELO. Spillere med lige score ordnes alfabetisk.',
  ];
  for (const n of NS) {
    lines.push('', `### N=${n}`, '', '| Metode | Kvalificerede | Udelukket | Top 10 (rang: navn, kampe, vundne, rå %) |', '|---|---:|---:|---|');
    for (const m of output[`top10_N${n}`]) {
      const top = m.top10.map(p => `${p.rank}. ${p.player} (${p.games}, ${p.wins}, ${fmtPct(p.winRate)})`).join('; ') || 'ingen';
      lines.push(`| ${m.method} | ${m.eligiblePlayers} | ${m.excludedAmongAllSeasonParticipants} | ${top} |`);
    }
    lines.push('', '| Metode | Split lige/ulige: Spearman (spillere) | Split sæsonhalvdel: Spearman (spillere) |');
    lines.push('|---|---:|---:|');
    for (const c of output.comparisons.filter(x => x.minGamesN === n)) {
      lines.push(`| ${c.method} | ${fmtRho(c.splits[0].spearman.rho)} (${c.splits[0].spearman.n}) | ${fmtRho(c.splits[1].spearman.rho)} (${c.splits[1].spearman.n}) |`);
    }
  }
  lines.push('', '## Stabilitet: største skift', '', 'Skift er absolut rangforskel mellem de to halvdele inden for samme metode og metodekvalificerede sæsonkohorte. Maksimalt fem spillere pr. split vises i JSON-filen.', '');
  for (const n of NS) for (const c of output.comparisons.filter(x => x.minGamesN === n)) {
    lines.push(`- N=${n}, ${c.method}: lige/ulige ${c.splits[0].largestShifts.slice(0, 3).map(x => `${x.name} (${x.shift})`).join(', ') || 'ukendt'}; sæsonhalvdel ${c.splits[1].largestShifts.slice(0, 3).map(x => `${x.name} (${x.shift})`).join(', ') || 'ukendt'}.`);
  }
  lines.push('', '## Følsomhed', '', '### Walkovers', '',
    `Af de ${walkoverGames.length} tekstligt identificerede walkover-kampe har ${unknownWalkovers.length} intet kendt vinderfelt. For hver N/metode er top-10-overlap samt rangkorrelation med/uden de kendte walkovers gemt i JSON.`, '',
    '### Single og double', '',
    `Disciplinfordeling på inkluderede spilleroptrædener: ${output.coverage.singlesDoubles.map(x => `${x.kind}: ${x.playerAppearances} optrædener, ${fmtPct(x.winRate)}`).join('; ')}. Separate top-10 og spillerantal pr. N/metode ligger i JSON.`, '',
    '### Modstanderstyrke', '',
    `Point ved kamp er tilgængelige for ${output.sensitivity.opponentStrength.knownPlayerPoints} standardoptrædener. Ingen modstanderstyrkejustering kan derfor beregnes; dette er ukendt, ikke nul.`, '',
    '### Skift mellem metoder', '',
    'Spillere med mere end fem pladsers spænd på tværs af metoder står i JSON under `sensitivity.methodRankShifts`; forskelle kan også skyldes metode d’s 20-kampskrav.', '',
    '## Hvad metoderne gør forkert', '',
    '- **Rå procent:** overdriver små stikprøver og behandler alle sejre som lige sikre.',
    '- **Bayes:** afhænger af valg af prior og trækker alle mod sæsonens gennemsnit; spillerens disciplin/styrke indgår ikke.',
    '- **Wilson:** konservativ nedre grænse er ikke et neutralt estimat af spillerens forventede vinderate og straffer få kampe kraftigt.',
    '- **Minimum + rå procent:** skjuler spillere under grænsen og skaber et brat adgangsskel ved 20 kampe.',
    '- **ELO:** tager højde for tidligere resultater mod spillere fra modstanderhold, men starter alle på 1500, bygger kun på modstandere mødt mod GSB og deler samme ratingændring mellem doublespillere.', '',
    '## Metodevalg og begrænsninger', '',
    `- Bayes: Beta-binomial middelværdi med ${BAYES_PRIOR_MATCHES} pseudo-kampe omkring sæsonens poolede rå GSB-rate.`,
    `- Wilson: nedre grænse for 95 % Wilson-scoreinterval, z=${Z95}.`,
    `- ELO: start ${ELO_START}, K=${ELO_K}; holdrating er gennemsnit af spillernes rating på hver side, og samme holdændring fordeles på holdets deltagere.`,
    '- “Lige/ulige” alternerer hver spillers egne kampe i datoorden; “første/anden sæsonhalvdel” bruger median dato blandt kendte udfald.',
    ...output.caveats.map(x => `- ${x}`), '',
    '## Kildestatus', '',
    `Kørsel offline mod lokal SQLite. Uafklarede resultatmarkører uden vinder: ${unknownGames.length} kampe; rå markører på disse kampe: ${JSON.stringify(output.coverage.resultMarkersOnUnknownGames)}. Se tællinger efter alder i JSON.`,
  );
  fs.writeFileSync(JSON_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
  fs.writeFileSync(MD_PATH, lines.join('\n') + '\n', 'utf8');
  console.log(JSON.stringify({ json: path.relative(process.cwd(), JSON_PATH), markdown: path.relative(process.cwd(), MD_PATH), coverage: output.coverage, nCounts: output.comparisons.map(c => ({ n:c.minGamesN, method:c.methodId, eligible:c.eligiblePlayers, rho:c.splits.map(s=>s.spearman.rho) })) }, null, 2));
} finally {
  db.close();
}










