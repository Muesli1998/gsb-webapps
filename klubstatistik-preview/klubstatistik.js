(function () {
  'use strict';

  var TABS = [
    ['overblik', 'Overblik'], ['hold', 'Hold'], ['spillere', 'Spillere'], ['kategori', 'Kategori'],
    ['hjemmeude', 'Hjemme/Ude'], ['modstander', 'Modstanderhold'], ['saeson', 'Sæson'], ['karriere', '🏅 Klub-karriere']
  ];
  var AGE_GROUPS = { all: null, youth: [2, 3, 4, 5, 6, 18], senior: [1], veteran: [9, 11, 12, 13, 17] };
  var state = { data: null, age: 'all', subAge: null, season: 'all', tab: 'overblik' };
  var $ = function (selector) { return document.querySelector(selector); };

  function renderTabs() {
    $('#stat-tabs').innerHTML = TABS.map(function (tab) {
      return '<button class="stat-tab' + (tab[0] === state.tab ? ' active' : '') + '" data-tab="' + tab[0] + '">' + tab[1] + '</button>';
    }).join('');
    $('#panes').innerHTML = TABS.map(function (tab) {
      return '<section class="pane' + (tab[0] === state.tab ? ' active' : '') + '" data-pane="' + tab[0] + '"><div class="placeholder">Denne fane bygges i et efterfølgende opgavekort.</div></section>';
    }).join('');
    document.querySelectorAll('[data-tab]').forEach(function (button) {
      button.addEventListener('click', function () { state.tab = button.dataset.tab; renderTabs(); });
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
  }

  fetch('/api/data').then(function (response) { if (!response.ok) throw new Error('Datalaget svarede med HTTP ' + response.status); return response.json(); }).then(function (data) {
    if (data.error) throw new Error(data.error);
    state.data = data;
    renderFilters(); renderSeasons(); renderTabs(); renderStatus();
  }).catch(function (error) { $('#dataset-status').textContent = 'Kunne ikke hente lokale statistikdata: ' + error.message; });
}());
