(function () {
  'use strict';

  var TABS = [
    ['overblik', 'Overblik'], ['hold', 'Hold'], ['spillere', 'Spillere'], ['kategori', 'Kategori'],
    ['hjemmeude', 'Hjemme/Ude'], ['modstander', 'Modstanderhold'], ['saeson', 'Sæson'], ['karriere', '🏅 Klub-karriere']
  ];
  var AGE_GROUPS = { all: null, youth: [2, 3, 4, 5, 6, 18], senior: [1], veteran: [9, 11, 12, 13, 17] };
  var DISCIPLINE_LABELS = { HS: 'HS', DS: 'DS', HD: 'HD', DD: 'DD', MD: 'MD', S: 'Fri single', D: 'Fri double' };
  var EXCLUDED_PLAYER_IDS = new Set([176]);
  var state = { data: null, age: 'all', subAge: null, season: 'all', tab: 'overblik', holdSort: { key: 'name', direction: 1 }, opponentSort: { key: 'name', direction: 1 } };
  var $ = function (selector) { return document.querySelector(selector); };

  function renderTabs() {
    $('#stat-tabs').innerHTML = TABS.map(function (tab) {
      return '<button class="stat-tab' + (tab[0] === state.tab ? ' active' : '') + '" data-tab="' + tab[0] + '">' + tab[1] + '</button>';
    }).join('');
    $('#panes').innerHTML = TABS.map(function (tab) {
      return '<section class="pane' + (tab[0] === state.tab ? ' active' : '') + '" data-pane="' + tab[0] + '"><div class="placeholder">Denne fane bygges i et efterfølgende opgavekort.</div></section>';
    }).join('');
    document.querySelectorAll('[data-tab]').forEach(function (button) {
      button.addEventListener('click', function () { state.tab = button.dataset.tab; renderTabs(); renderStatus(); });
    });
  }

  function ageLabel(key) { return { all: 'Alle', youth: 'Ungdom', senior: 'Senior', veteran: 'Veteran' }[key]; }
  function ageIds() { return AGE_GROUPS[state.age] || null; }
  function filtered() {
    var ids = ageIds();
    if (state.subAge !== null) ids = [state.subAge];
    var competitions = state.data.competitions.filter(function (row) {
      return (!ids || ids.indexOf(row.ageGroupId) !== -1) && (state.season === 'all' || String(row.seasonId) === state.season);
    });
    var competitionIds = new Set(competitions.map(function (row) { return row.id; }));
    return {
      competitions: competitions,
      teams: state.data.teams.filter(function (row) { return competitionIds.has(row.competitionId); }),
      matches: state.data.matches.filter(function (row) { return competitionIds.has(row.competitionId); })
    };
  }

  function playerCount(result) {
    var matchIds = new Set(result.matches.map(function (row) { return row.teamMatchId; }));
    var ids = new Set(state.data.playerLinks.filter(function (row) { return matchIds.has(row.teamMatchId) && !EXCLUDED_PLAYER_IDS.has(row.playerId); }).map(function (row) { return row.playerId; }));
    return ids.size;
  }

  function score(result) {
    var match = /^\s*(\d+)\s*-\s*(\d+)\s*$/.exec(result || '');
    return match ? [Number(match[1]), Number(match[2])] : null;
  }

  function isGsbTeamName(teamName, sourceName) {
    var team = String(teamName || '').trim();
    var source = String(sourceName || '').trim();
    return Boolean(team && source) && (team === source || source === 'BC37/' + team);
  }

  function overblik(result) {
    var teams = new Map();
    result.teams.forEach(function (team) {
      var key = String(team.id);
      if (!teams.has(key)) teams.set(key, { team: team, wins: 0, losses: 0, matches: 0 });
    });
    result.matches.forEach(function (match) {
      var entry = teams.get(String(match.teamId));
      if (!entry) return;
      var pair = score(match.result);
      if (!pair) return;
      entry.matches += 1;
      var teamName = entry.team.name || '';
      var home = isGsbTeamName(teamName, match.home);
      var away = isGsbTeamName(teamName, match.away);
      if (!home && !away) return;
      var won = home ? pair[0] > pair[1] : pair[1] > pair[0];
      if (pair[0] === pair[1]) return;
      if (won) entry.wins += 1; else entry.losses += 1;
    });
    var cards = Array.from(teams.values()).filter(function (entry) { return entry.matches > 0; }).map(function (entry) {
      var age = state.data.ageGroups[String(entry.team.ageGroupId)] || 'ukendt';
      var youth = AGE_GROUPS.youth.indexOf(entry.team.ageGroupId) !== -1;
      var decided = entry.wins + entry.losses;
      return { name: entry.team.name, age: age, detail: youth ? 'ukendt · ukendt' : '—', matches: entry.matches, wins: entry.wins, losses: entry.losses, rate: decided ? Math.round(entry.wins / decided * 100) : null };
    });
    var decided = cards.reduce(function (sum, card) { return sum + card.wins + card.losses; }, 0);
    var wins = cards.reduce(function (sum, card) { return sum + card.wins; }, 0);
    var html = '<div class="kpi-row"><div class="kpi-tile"><div class="kpi-num">' + (decided ? Math.round(wins / decided * 100) + '%' : '—') + '</div><div class="kpi-label">Samlet winrate</div></div>' +
      '<div class="kpi-tile"><div class="kpi-num">' + result.matches.length.toLocaleString('da-DK') + '</div><div class="kpi-label">Holdkampe</div></div>' +
      '<div class="kpi-tile"><div class="kpi-num">' + playerCount(result).toLocaleString('da-DK') + '</div><div class="kpi-label">Spillere</div></div>' +
      '<div class="kpi-tile"><div class="kpi-num">' + cards.length.toLocaleString('da-DK') + '</div><div class="kpi-label">Hold</div></div></div>';
    html += '<h2>Hold i valgt gruppe</h2><div class="team-cards">' + cards.map(function (card) {
      var rate = card.rate === null ? '—' : card.rate + '%';
      return '<div class="team-card"><div class="hold">' + card.name + '</div><div class="sub">' + card.age + ' · ' + card.detail + '</div><div class="pct-big">' + rate + '</div><div class="record">' + card.wins + 'S–' + card.losses + 'T · ' + card.matches + ' kampe</div></div>';
    }).join('') + '</div>';
    return html;
  }

  function holdTable(result) {
    var entries = new Map();
    result.teams.forEach(function (team) {
      entries.set(String(team.id), { team: team, matches: 0, wins: 0, losses: 0 });
    });
    result.matches.forEach(function (match) {
      var entry = entries.get(String(match.teamId));
      var pair = score(match.result);
      if (!entry || !pair || pair[0] === pair[1]) return;
      var home = isGsbTeamName(entry.team.name, match.home);
      var away = isGsbTeamName(entry.team.name, match.away);
      if (!home && !away) return;
      entry.matches += 1;
      var won = home ? pair[0] > pair[1] : pair[1] > pair[0];
      if (won) entry.wins += 1; else entry.losses += 1;
    });
    return Array.from(entries.values()).filter(function (entry) { return entry.matches > 0; }).map(function (entry) {
      var youth = AGE_GROUPS.youth.indexOf(entry.team.ageGroupId) !== -1;
      var decided = entry.wins + entry.losses;
      return {
        name: entry.team.name || 'ukendt',
        age: state.data.ageGroups[String(entry.team.ageGroupId)] || 'ukendt',
        detail: youth ? 'ukendt · ukendt' : '—',
        matches: entry.matches,
        rate: decided ? Math.round(entry.wins / decided * 100) : null,
        wins: entry.wins,
        losses: entry.losses
      };
    });
  }

  function renderHold(result) {
    var rows = holdTable(result);
    var key = state.holdSort.key;
    rows.sort(function (a, b) {
      var left = a[key] === null ? -1 : a[key];
      var right = b[key] === null ? -1 : b[key];
      return (typeof left === 'string' ? left.localeCompare(right, 'da') : left - right) * state.holdSort.direction;
    });
    var headers = [['name', 'Hold'], ['age', 'Aldersgruppe'], ['detail', 'Holdtype/niveau'], ['matches', 'Kampe'], ['rate', 'Winrate']];
    var html = '<div class="table-wrap"><table class="hold-table"><thead><tr>' + headers.map(function (header) {
      var marker = key === header[0] ? (state.holdSort.direction === 1 ? ' ▲' : ' ▼') : '';
      return '<th><button class="sort-button" data-hold-sort="' + header[0] + '">' + header[1] + marker + '</button></th>';
    }).join('') + '</tr></thead><tbody>';
    html += rows.map(function (row) {
      var rate = row.rate === null ? '—' : row.rate + '%';
      return '<tr><td>' + row.name + '</td><td>' + row.age + '</td><td>' + row.detail + '</td><td>' + row.matches + '</td><td><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:' + (row.rate || 0) + '%"></div></div><span class="pct">' + rate + '</span></div></td></tr>';
    }).join('') + '</tbody></table></div>';
    var pane = document.querySelector('[data-pane="hold"]');
    pane.innerHTML = html;
    pane.querySelectorAll('[data-hold-sort]').forEach(function (button) {
      button.addEventListener('click', function () {
        var next = button.dataset.holdSort;
        state.holdSort = { key: next, direction: state.holdSort.key === next ? -state.holdSort.direction : 1 };
        renderHold(filtered());
      });
    });
  }

  function opponentTable(result) {
    var entries = new Map();
    result.matches.forEach(function (match) {
      var team = result.teams.find(function (row) { return String(row.id) === String(match.teamId); });
      if (!team) return;
      var home = isGsbTeamName(team.name, match.home);
      var away = isGsbTeamName(team.name, match.away);
      if (home === away) return;
      var opponent = home ? match.away : match.home;
      if (!opponent) return;
      var pair = score(match.result);
      if (!pair) return;
      var key = opponent.trim();
      if (!entries.has(key)) entries.set(key, { name: key, matches: 0, wins: 0 });
      var entry = entries.get(key);
      entry.matches += 1;
      if ((home && pair[0] > pair[1]) || (away && pair[1] > pair[0])) entry.wins += 1;
    });
    return Array.from(entries.values()).map(function (entry) {
      return { name: entry.name, matches: entry.matches, wins: entry.wins, rate: entry.matches ? Math.round(entry.wins / entry.matches * 100) : null };
    });
  }

  function renderOpponents(result) {
    var rows = opponentTable(result);
    var key = state.opponentSort.key;
    rows.sort(function (a, b) {
      var left = a[key];
      var right = b[key];
      return (typeof left === 'string' ? left.localeCompare(right, 'da') : left - right) * state.opponentSort.direction;
    });
    var headers = [['name', 'Modstanderhold'], ['matches', 'Kampe'], ['rate', 'Winrate mod dem']];
    var html = '<div class="table-wrap"><table class="opponent-table"><thead><tr>' + headers.map(function (header) {
      var marker = key === header[0] ? (state.opponentSort.direction === 1 ? ' ▲' : ' ▼') : '';
      return '<th><button class="sort-button" data-opponent-sort="' + header[0] + '">' + header[1] + marker + '</button></th>';
    }).join('') + '</tr></thead><tbody>';
    html += rows.map(function (row) {
      return '<tr><td>' + row.name + '</td><td>' + row.matches + '</td><td><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:' + row.rate + '%"></div></div><span class="pct">' + row.rate + '%</span></div></td></tr>';
    }).join('') + '</tbody></table></div>';
    html += '<p class="muted opponent-note">Rækker uden entydig GSB-side eller resultat er ikke medregnet.</p>';
    var pane = document.querySelector('[data-pane="modstander"]');
    pane.innerHTML = html;
    pane.querySelectorAll('[data-opponent-sort]').forEach(function (button) {
      button.addEventListener('click', function () {
        var next = button.dataset.opponentSort;
        state.opponentSort = { key: next, direction: state.opponentSort.key === next ? -state.opponentSort.direction : 1 };
        renderOpponents(filtered());
      });
    });
  }

  function seasonTable() {
    var ids = ageIds();
    var competitions = state.data.competitions.filter(function (row) {
      return !ids || ids.indexOf(row.ageGroupId) !== -1;
    });
    var competitionIds = new Set(competitions.map(function (row) { return row.id; }));
    var seasons = new Map();
    state.data.seasons.forEach(function (season) { seasons.set(String(season.id), { id: season.id, label: season.label, matches: 0, wins: 0, losses: 0 }); });
    var teams = new Map(state.data.teams.map(function (team) { return [String(team.id), team]; }));
    state.data.matches.forEach(function (match) {
      if (!competitionIds.has(match.competitionId)) return;
      var entry = seasons.get(String(match.seasonId));
      if (!entry) return;
      entry.matches += 1;
      var team = teams.get(String(match.teamId));
      var pair = score(match.result);
      if (!team || !pair || pair[0] === pair[1]) return;
      var home = isGsbTeamName(team.name, match.home);
      var away = isGsbTeamName(team.name, match.away);
      if (!home && !away) return;
      var won = home ? pair[0] > pair[1] : pair[1] > pair[0];
      if (won) entry.wins += 1; else entry.losses += 1;
    });
    return Array.from(seasons.values()).filter(function (row) { return row.matches > 0; }).sort(function (a, b) { return a.id - b.id; }).map(function (row) {
      var decided = row.wins + row.losses;
      return { label: row.label, matches: row.matches, wins: row.wins, losses: row.losses, rate: decided ? Math.round(row.wins / decided * 100) : null };
    });
  }

  function renderSeasonsPane() {
    var rows = seasonTable();
    var html = '<div class="table-wrap"><table class="season-table"><thead><tr><th>Sæson</th><th>Kampe</th><th>Winrate</th></tr></thead><tbody>';
    html += rows.map(function (row) {
      var rate = row.rate === null ? '—' : row.rate + '%';
      return '<tr><td>' + row.label + '</td><td>' + row.matches + '</td><td><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:' + (row.rate || 0) + '%"></div></div><span class="pct">' + rate + '</span></div></td></tr>';
    }).join('') + '</tbody></table></div>';
    html += '<p class="muted season-note">Sæson-dropdownen ovenfor påvirker ikke denne historik; alders- og underfilter gør.</p>';
    document.querySelector('[data-pane="saeson"]').innerHTML = html;
  }

  function homeAwayTable(result) {
    var rows = { home: { label: 'Hjemme', matches: 0, wins: 0, losses: 0 }, away: { label: 'Ude', matches: 0, wins: 0, losses: 0 } };
    var teams = new Map(result.teams.map(function (team) { return [String(team.id), team]; }));
    var unclassified = [];
    result.matches.forEach(function (match) {
      var team = teams.get(String(match.teamId));
      if (!team) return;
      var home = isGsbTeamName(team.name, match.home);
      var away = isGsbTeamName(team.name, match.away);
      if (home === away) { unclassified.push(match.id); return; }
      var row = rows[home ? 'home' : 'away'];
      row.matches += 1;
      var pair = score(match.result);
      if (!pair || pair[0] === pair[1]) return;
      if ((home && pair[0] > pair[1]) || (away && pair[1] > pair[0])) row.wins += 1;
      else row.losses += 1;
    });
    return { rows: [rows.home, rows.away], unclassified: unclassified };
  }

  function renderHomeAway(result) {
    var stats = homeAwayTable(result);
    var html = '<div class="team-cards home-away-cards">' + stats.rows.map(function (row) {
      var decided = row.wins + row.losses;
      var rate = decided ? Math.round(row.wins / decided * 100) : null;
      return '<div class="team-card home-away-card" data-home-away="' + row.label.toLowerCase() + '" data-match-count="' + row.matches + '"><div class="hold">' + row.label + '</div><div class="pct-big">' + (rate === null ? '—' : rate + '%') + '</div><div class="record">' + row.wins + 'S–' + row.losses + 'T · ' + row.matches + ' kampe</div></div>';
    }).join('') + '</div>';
    if (stats.unclassified.length) html += '<p class="muted home-away-note">' + stats.unclassified.length + ' kamp(e) uden entydig hjemme/ude-side er udeladt: ' + stats.unclassified.join(', ') + '.</p>';
    document.querySelector('[data-pane="hjemmeude"]').innerHTML = html;
  }

  function categoryTable(result) {
    var labels = { HS: 'Herresingle', DS: 'Damesingle', HD: 'Herredouble', DD: 'Damedouble', MD: 'Mixeddouble', S: 'Fri single', D: 'Fri double' };
    var categories = Object.keys(labels).map(function (key) { return { key: key, name: labels[key], matches: 0, wins: 0, losses: 0 }; });
    var byKey = new Map(categories.map(function (row) { return [row.key, row]; }));
    var teams = new Map(result.teams.map(function (team) { return [String(team.id), team]; }));
    var matches = new Map(result.matches.map(function (match) { return [String(match.teamMatchId), match]; }));
    state.data.individualMatches.forEach(function (individual) {
      var match = matches.get(String(individual.teamMatchId));
      var category = byKey.get(individual.discipline);
      var team = match && teams.get(String(match.teamId));
      if (!match || !category || !team) return;
      var home = isGsbTeamName(team.name, match.home);
      var away = isGsbTeamName(team.name, match.away);
      var side = home === away ? null : (home ? 'home' : 'away');
      category.matches += 1;
      if (side && individual.winnerSide === side) category.wins += 1;
      else if (side && individual.winnerSide) category.losses += 1;
    });
    return categories.map(function (category) {
      var decided = category.wins + category.losses;
      return { name: category.name, matches: category.matches, wins: category.wins, losses: category.losses, rate: decided ? Math.round(category.wins / decided * 100) : null };
    });
  }

  function renderCategory(result) {
    var rows = categoryTable(result);
    var html = '<div class="table-wrap"><table class="category-table"><thead><tr><th>Kategori</th><th>Kampe</th><th>Winrate</th></tr></thead><tbody>';
    html += rows.map(function (row) {
      var rate = row.rate === null ? '—' : row.rate + '%';
      return '<tr><td>' + row.name + '</td><td>' + row.matches + '</td><td><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:' + (row.rate || 0) + '%"></div></div><span class="pct">' + rate + '</span></div></td></tr>';
    }).join('') + '</tbody></table></div>';
    document.querySelector('[data-pane="kategori"]').innerHTML = html;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]; });
  }

  function profileStats(result) {
    var teamById = new Map(state.data.teams.map(function (team) { return [team.id, team]; }));
    var matchById = new Map(result.matches.map(function (match) { return [match.teamMatchId, match]; }));
    var individual = state.data.individualMatches.filter(function (row) { return matchById.has(row.teamMatchId); });
    var individualById = new Map(individual.map(function (row) { return [row.id, row]; }));
    var linksByIndividual = new Map();
    state.data.playerLinks.forEach(function (link) {
      if (EXCLUDED_PLAYER_IDS.has(link.playerId)) return;
      if (!individualById.has(link.individualMatchId)) return;
      if (!linksByIndividual.has(link.individualMatchId)) linksByIndividual.set(link.individualMatchId, []);
      linksByIndividual.get(link.individualMatchId).push(link);
    });
    var playersById = new Map(state.data.players.map(function (player) { return [player.id, player]; }));
    var stats = new Map();
    function get(playerId) {
      if (!stats.has(playerId)) {
        var player = playersById.get(playerId) || {};
        stats.set(playerId, { id: playerId, hasExternalId: Boolean(player.externalPlayerId), matchIds: new Set(), ageBuckets: { youth: new Set(), senior: new Set(), veteran: new Set() }, wins: 0, losses: 0, categories: new Map(), teams: new Map(), seasons: new Map(), opponents: new Map() });
      }
      return stats.get(playerId);
    }
    state.data.playerLinks.forEach(function (link) {
      if (EXCLUDED_PLAYER_IDS.has(link.playerId)) return;
      var im = individualById.get(link.individualMatchId);
      if (!im) return;
      var match = matchById.get(im.teamMatchId);
      var player = get(link.playerId);
      player.matchIds.add(im.id);
      var category = im.discipline || 'ukendt';
      if (!player.categories.has(category)) player.categories.set(category, { wins: 0, losses: 0, matches: 0 });
      var cat = player.categories.get(category);
      cat.matches += 1;
      if (im.winnerSide === link.side) { player.wins += 1; cat.wins += 1; }
      else if (im.winnerSide) { player.losses += 1; cat.losses += 1; }
      var team = teamById.get(match.teamId);
      var ageBucket = AGE_GROUPS.youth.indexOf(team && team.ageGroupId) !== -1 ? 'youth' : AGE_GROUPS.senior.indexOf(team && team.ageGroupId) !== -1 ? 'senior' : AGE_GROUPS.veteran.indexOf(team && team.ageGroupId) !== -1 ? 'veteran' : null;
      if (ageBucket) player.ageBuckets[ageBucket].add(im.id);
      var teamKey = String(match.teamId);
      if (!player.teams.has(teamKey)) player.teams.set(teamKey, { name: team ? team.name : 'ukendt', wins: 0, losses: 0, seasons: new Set() });
      var teamStat = player.teams.get(teamKey);
      teamStat.seasons.add(match.seasonId);
      if (im.winnerSide === link.side) teamStat.wins += 1; else if (im.winnerSide) teamStat.losses += 1;
      var seasonKey = String(match.seasonId) + '|' + teamKey;
      if (!player.seasons.has(seasonKey)) player.seasons.set(seasonKey, { seasonId: match.seasonId, team: team ? team.name : 'ukendt', wins: 0, losses: 0 });
      var seasonStat = player.seasons.get(seasonKey);
      if (im.winnerSide === link.side) seasonStat.wins += 1; else if (im.winnerSide) seasonStat.losses += 1;
      (linksByIndividual.get(im.id) || []).forEach(function (opponent) {
        if (opponent.playerId === link.playerId || opponent.side === link.side) return;
        if (!player.opponents.has(opponent.playerId)) player.opponents.set(opponent.playerId, { matches: 0, wins: 0, losses: 0 });
        var opponentStat = player.opponents.get(opponent.playerId);
        opponentStat.matches += 1;
        if (im.winnerSide === link.side) opponentStat.wins += 1; else if (im.winnerSide) opponentStat.losses += 1;
      });
    });
    return stats;
  }

  function profileHtml(stat, result) {
    var playerName = (state.data.players.find(function (player) { return player.id === stat.id; }) || {}).name || 'ukendt';
    var seasonLabels = new Map(state.data.seasons.map(function (season) { return [String(season.id), season.label]; }));
    var seasons = Array.from(stat.seasons.values()).sort(function (a, b) { return b.seasonId - a.seasonId; });
    var latest = seasons[0] ? seasons[0].team : 'ukendt';
    var decided = stat.wins + stat.losses;
    var rate = decided ? Math.round(stat.wins / decided * 100) : null;
    var categoryHtml = Array.from(stat.categories.entries()).sort().map(function (entry) { var value = entry[1]; var pct = value.wins + value.losses ? Math.round(value.wins / (value.wins + value.losses) * 100) : 0; var label = DISCIPLINE_LABELS[entry[0]] || entry[0]; return '<div class="profile-line"><span>' + escapeHtml(label) + '</span><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div><span class="pct">' + (value.wins + value.losses ? pct + '%' : '—') + '</span><span class="profile-record">' + value.wins + 'S–' + value.losses + 'T</span></div></div>'; }).join('');
    var teamHtml = Array.from(stat.teams.values()).map(function (team) { return '<div class="profile-list-row"><span>' + escapeHtml(team.name) + '</span><span>' + team.wins + 'S–' + team.losses + 'T</span></div>'; }).join('') || '<span class="muted">Ingen holddata</span>';
    var opponentHtml = Array.from(stat.opponents.entries()).sort(function (a, b) { return b[1].matches - a[1].matches; }).map(function (entry) { var opponent = (state.data.players.find(function (player) { return player.id === entry[0]; }) || {}).name || 'ukendt'; return '<div class="profile-list-row"><span>' + escapeHtml(opponent) + '</span><span>' + entry[1].matches + ' kampe · ' + entry[1].wins + 'S–' + entry[1].losses + 'T</span></div>'; }).slice(0, 5).join('') || '<span class="muted">Ingen modstanderdata</span>';
    var seasonHtml = seasons.map(function (season) { var total = season.wins + season.losses; return '<tr><td>' + escapeHtml(seasonLabels.get(String(season.seasonId)) || String(season.seasonId)) + '</td><td>' + escapeHtml(season.team) + '</td><td>' + total + '</td><td>' + (total ? Math.round(season.wins / total * 100) + '%' : '—') + '</td></tr>'; }).join('');
    var identityNote = stat.hasExternalId ? '' : '<span class="identity-note">Navnematch · ID ikke verificeret</span>';
    return '<div class="player-profile"><div class="profile-head"><div><strong>' + escapeHtml(playerName) + '</strong>' + identityNote + '</div><span>' + escapeHtml(latest) + '</span></div><div class="profile-kpis"><div><strong>' + stat.matchIds.size + '</strong><span>Kampe</span></div><div><strong>' + (rate === null ? '—' : rate + '%') + '</strong><span>Winrate</span></div><div><strong>' + stat.teams.size + '</strong><span>Hold</span></div><div><strong>' + new Set(seasons.map(function (season) { return season.seasonId; })).size + '</strong><span>Sæsoner</span></div></div><div class="profile-grid"><div><h3>Kategorier spillet</h3>' + categoryHtml + '</div><div><h3>Hold spillet for</h3>' + teamHtml + '</div><div><h3>Board-tendens</h3><p class="board-trend">Ikke beregnet: den normaliserede database indeholder ikke `runAnalyse`-rækkefølgen.</p></div><div><h3>Hyppigste modstandere</h3>' + opponentHtml + '</div><div class="profile-wide"><h3>Sæson for sæson</h3><table class="profile-season-table"><thead><tr><th>Sæson</th><th>Hold</th><th>Kampe</th><th>Winrate</th></tr></thead><tbody>' + seasonHtml + '</tbody></table><p class="career-line">Klub-karriere: <strong>' + new Set(seasons.map(function (season) { return season.seasonId; })).size + ' sæsoner</strong>, <strong>' + stat.matchIds.size + ' kampe</strong> totalt for klubben.</p></div></div></div>';
  }

  function renderPlayers(result) {
    var stats = profileStats(result);
    var all = Array.from(stats.values());
    var names = new Map(state.data.players.map(function (player) { return [player.id, player.name]; }));
    var view = { search: '', minEnabled: false, min: 3, sort: 'matches', direction: -1 };
    var pane = document.querySelector('[data-pane="spillere"]');
    pane.innerHTML = '<div class="player-controls"><input id="player-search" placeholder="Søg spiller…"><label><input id="min-games" type="checkbox"> Min. <select id="min-games-value"><option>3</option><option>5</option><option>10</option></select> kampe</label></div><div class="table-wrap"><table class="player-table"><thead><tr><th><button class="sort-button" data-player-sort="name">Spiller</button></th><th><button class="sort-button" data-player-sort="matches">Kampe</button></th><th><button class="sort-button" data-player-sort="wins">Sejre</button></th><th><button class="sort-button" data-player-sort="rate">Winrate</button></th></tr></thead><tbody></tbody></table></div>';
    function draw() {
      var rows = all.filter(function (stat) { var name = names.get(stat.id) || 'ukendt'; return name.toLowerCase().indexOf(view.search.toLowerCase()) !== -1 && (!view.minEnabled || stat.matchIds.size >= view.min); });
      rows.sort(function (a, b) { var an = names.get(a.id) || ''; var bn = names.get(b.id) || ''; var av = view.sort === 'name' ? an : view.sort === 'matches' ? a.matchIds.size : view.sort === 'wins' ? a.wins : (a.wins + a.losses ? a.wins / (a.wins + a.losses) : -1); var bv = view.sort === 'name' ? bn : view.sort === 'matches' ? b.matchIds.size : view.sort === 'wins' ? b.wins : (b.wins + b.losses ? b.wins / (b.wins + b.losses) : -1); return (typeof av === 'string' ? av.localeCompare(bv, 'da') : av - bv) * view.direction; });
      pane.querySelector('tbody').innerHTML = rows.map(function (stat) { var name = names.get(stat.id) || 'ukendt'; var total = stat.wins + stat.losses; var pct = total ? Math.round(stat.wins / total * 100) : null; return '<tr class="player-row"><td>' + escapeHtml(name) + '</td><td>' + stat.matchIds.size + '</td><td>' + stat.wins + '</td><td><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:' + (pct || 0) + '%"></div></div><span class="pct">' + (pct === null ? '—' : pct + '%') + '</span></div></td></tr><tr class="player-detail-row"><td colspan="4">' + profileHtml(stat, result) + '</td></tr>'; }).join('');
      pane.querySelectorAll('.player-row').forEach(function (row) { row.addEventListener('click', function () { row.nextElementSibling.classList.toggle('show'); }); });
    }
    pane.querySelector('#player-search').addEventListener('input', function (event) { view.search = event.target.value; draw(); });
    pane.querySelector('#min-games').addEventListener('change', function (event) { view.minEnabled = event.target.checked; draw(); });
    pane.querySelector('#min-games-value').addEventListener('change', function (event) { view.min = Number(event.target.value); if (view.minEnabled) draw(); });
    pane.querySelectorAll('[data-player-sort]').forEach(function (button) { button.addEventListener('click', function () { var key = button.dataset.playerSort; view.direction = view.sort === key ? -view.direction : (key === 'name' ? 1 : -1); view.sort = key; draw(); }); });
    draw();
  }

  function careerResult() {
    var ids = ageIds();
    if (state.subAge !== null) ids = [state.subAge];
    var competitions = state.data.competitions.filter(function (row) { return !ids || ids.indexOf(row.ageGroupId) !== -1; });
    var competitionIds = new Set(competitions.map(function (row) { return row.id; }));
    return {
      teams: state.data.teams.filter(function (row) { return competitionIds.has(row.competitionId); }),
      matches: state.data.matches.filter(function (row) { return competitionIds.has(row.competitionId); })
    };
  }

  function renderCareer() {
    var stats = Array.from(profileStats(careerResult()).values());
    var names = new Map(state.data.players.map(function (player) { return [player.id, player.name]; }));
    stats.sort(function (a, b) { var difference = b.matchIds.size - a.matchIds.size; return difference || (names.get(a.id) || '').localeCompare(names.get(b.id) || '', 'da'); });
    var html = '<div class="table-wrap"><table class="career-table"><thead><tr><th>Spiller</th><th>Ungdom</th><th>Senior</th><th>Veteran</th><th>Total</th></tr></thead><tbody>';
    html += stats.map(function (stat) { return '<tr><td>' + escapeHtml(names.get(stat.id) || 'ukendt') + '</td><td>' + stat.ageBuckets.youth.size + '</td><td>' + stat.ageBuckets.senior.size + '</td><td>' + stat.ageBuckets.veteran.size + '</td><td>' + stat.matchIds.size + '</td></tr>'; }).join('');
    html += '</tbody></table></div>';
    document.querySelector('[data-pane="karriere"]').innerHTML = html;
  }

  function renderFilters() {
    $('#age-filters').innerHTML = Object.keys(AGE_GROUPS).map(function (key) {
      return '<button class="agegroup-pill' + (state.age === key ? ' active' : '') + '" data-age="' + key + '">' + ageLabel(key) + '</button>';
    }).join('');
    var labels = state.data.ageGroups;
    var youthIds = [2, 3, 4, 5, 6, 18];
    var veteranIds = [9, 11, 12, 13, 17, 16].filter(function (id) {
      return state.data.competitions.some(function (row) { return row.ageGroupId === id; });
    });
    function subfilter(target, title, ids) {
      $(target).innerHTML = '<span class="subfilter-label">' + title + '</span>' + ids.map(function (id) {
        return '<button class="subfilter-pill' + (state.subAge === id ? ' active' : '') + '" data-sub-age="' + id + '">' + (labels[String(id)] || id) + '</button>';
      }).join('');
      $(target).hidden = state.age !== (target === '#youth-filters' ? 'youth' : 'veteran');
    }
    subfilter('#youth-filters', 'Årgang', youthIds);
    subfilter('#veteran-filters', 'Klasse', veteranIds);
    document.querySelectorAll('[data-age]').forEach(function (button) { button.addEventListener('click', function () { state.age = button.dataset.age; state.subAge = null; renderFilters(); renderStatus(); }); });
    document.querySelectorAll('[data-sub-age]').forEach(function (button) { button.addEventListener('click', function () { state.subAge = Number(button.dataset.subAge); renderFilters(); renderStatus(); }); });
  }

  function renderSeasons() {
    $('#season-filter').innerHTML = '<option value="all">Alle sæsoner</option>' + state.data.seasons.map(function (row) { return '<option value="' + row.id + '">' + row.label + '</option>'; }).join('');
    $('#season-filter').value = state.season;
    $('#season-filter').addEventListener('change', function (event) { state.season = event.target.value; renderStatus(); });
  }

  function renderStatus() {
    var result = filtered();
    $('#dataset-status').textContent = result.matches.length.toLocaleString('da-DK') + ' holdkampe, ' + result.teams.length.toLocaleString('da-DK') + ' hold og ' + result.competitions.length.toLocaleString('da-DK') + ' puljer i valgt udsnit (' + ageLabel(state.age) + '). Data blev hentet én gang; filtre kører lokalt.';
    var pane = document.querySelector('[data-pane="overblik"]');
    if (pane) pane.innerHTML = overblik(result);
    if (document.querySelector('[data-pane="hold"]')) renderHold(result);
    if (document.querySelector('[data-pane="hjemmeude"]')) renderHomeAway(result);
    if (document.querySelector('[data-pane="kategori"]')) renderCategory(result);
    if (document.querySelector('[data-pane="modstander"]')) renderOpponents(result);
    if (document.querySelector('[data-pane="saeson"]')) renderSeasonsPane();
    if (document.querySelector('[data-pane="spillere"]')) renderPlayers(result);
    if (document.querySelector('[data-pane="karriere"]')) renderCareer();
  }

  fetch('/api/data').then(function (response) { if (!response.ok) throw new Error('Datalaget svarede med HTTP ' + response.status); return response.json(); }).then(function (data) {
    if (data.error) throw new Error(data.error);
    state.data = data;
    renderFilters(); renderSeasons(); renderTabs(); renderStatus();
  }).catch(function (error) { $('#dataset-status').textContent = 'Kunne ikke hente lokale statistikdata: ' + error.message; });
}());
