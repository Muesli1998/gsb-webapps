(function () {
  'use strict';

  var TABS = [
    ['overblik', 'Overblik'], ['hold', 'Hold'], ['spillere', 'Spillere'], ['kategori', 'Kategori'],
    ['hjemmeude', 'Hjemme/Ude'], ['modstander', 'Modstanderhold'], ['saeson', 'Sæson'], ['karriere', '🏅 Klub-karriere']
  ];
  var AGE_GROUPS = { all: null, youth: [2, 3, 4, 5, 6, 18], senior: [1], veteran: [9, 11, 12, 13, 17] };
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
    var ids = new Set(state.data.playerLinks.filter(function (row) { return matchIds.has(row.teamMatchId); }).map(function (row) { return row.playerId; }));
    return ids.size;
  }

  function score(result) {
    var match = /^\s*(\d+)\s*-\s*(\d+)\s*$/.exec(result || '');
    return match ? [Number(match[1]), Number(match[2])] : null;
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
      var home = teamName === (match.home || '');
      var away = teamName === (match.away || '');
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
      var home = entry.team.name === (match.home || '');
      var away = entry.team.name === (match.away || '');
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
      var home = team.name === (match.home || '');
      var away = team.name === (match.away || '');
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
    if (document.querySelector('[data-pane="modstander"]')) renderOpponents(result);
  }

  fetch('/api/data').then(function (response) { if (!response.ok) throw new Error('Datalaget svarede med HTTP ' + response.status); return response.json(); }).then(function (data) {
    if (data.error) throw new Error(data.error);
    state.data = data;
    renderFilters(); renderSeasons(); renderTabs(); renderStatus();
  }).catch(function (error) { $('#dataset-status').textContent = 'Kunne ikke hente lokale statistikdata: ' + error.message; });
}());
