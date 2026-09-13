/*
 * GSB Webapps — fælles navigation (to lag: apps + sider) og en simpel
 * klient-side kode-gate til Kampsystem.
 *
 * Bruges på alle rigtige sider: tilføj
 *   <script src="/gsb-nav.js" defer></script>
 * i <head>, sæt <body data-gsb-page="NØGLE"> og placér
 *   <div id="gsb-nav-root"></div>
 * som det første i <body>, før den eksisterende <header>.
 *
 * VIGTIGT (samme begrænsning som beskrevet i idébanken for Søndagstræning):
 * kode-gaten herunder er ren klient-side JavaScript. Den holder tilfældige
 * forbipasserende ude (samme sikkerhedsniveau som resten af sitet), men er
 * IKKE reel beskyttelse af selve dataen — kildekoden kan altid læses. Data-
 * indskrivningen (Admin/index.html) er fortsat den eneste side med en RIGTIG
 * (server-side) adgangskode, tjekket inde i selve hent-resultater.js.
 */
(function () {
  'use strict';

  var APPS = [
    { key: 'landing', label: '🏠 Forside', href: '/forside.html' },
    {
      key: 'dreamteam', label: '🏸 GSB Dream Team', href: '/tilmelding.html',
      pages: [
        { key: 'tilmelding', label: '✍️ Tilmelding', href: '/tilmelding.html' },
        { key: 'analyse', label: '📊 Statistik', href: '/analyse.html' },
        { key: 'stilling', label: '🏆 Historisk stilling', href: '/stilling.html' },
        { key: 'index', label: '⚙ Admin', href: '/index.html', pill: true },
      ],
    },
    { key: 'ungdom', label: '🎾 Ungdomssparring', href: '/senior-ungdom-tilmelding.html' },
    { key: 'kampsystem', label: '⚡ Kampsystem', href: '/kampsystem.html', locked: 'kampsystem' },
  ];

  var GATES = {
    kampsystem: {
      code: 'kamp2026',
      title: '⚡ Kampsystem',
      desc: 'Trænernes rundefordelingsværktøj — koden deles kun med trænerne.',
    },
  };

  var STYLE = ''
    + '#gsb-nav-root{font-family:"Segoe UI",system-ui,-apple-system,sans-serif;}'
    + '.gsb-nav-apps{background:#123a28;display:flex;align-items:center;gap:2px;padding:8px 16px;flex-wrap:wrap;}'
    + '.gsb-nav-pages{background:#1a4a32;display:flex;align-items:center;gap:2px;padding:6px 16px;flex-wrap:wrap;}'
    + '.gsb-nav-pages.gsb-hidden{display:none;}'
    + '.gsb-nav-tab{color:rgba(247,245,239,0.78);text-decoration:none;font-size:0.85rem;font-weight:600;padding:7px 13px;border-radius:7px;white-space:nowrap;}'
    + '.gsb-nav-tab:hover{background:rgba(255,255,255,0.08);color:#fff;}'
    + '.gsb-nav-tab.active{background:#e8a33d;color:#2b1c05;}'
    + '.gsb-nav-tab.sub{font-size:0.8rem;padding:6px 12px;color:rgba(247,245,239,0.72);}'
    + '.gsb-nav-tab.sub.active{background:#f7f5ef;color:#123a28;}'
    + '.gsb-nav-tab.pill{margin-left:auto;opacity:0.65;font-size:0.76rem;}'
    + '.gsb-nav-tab.pill:hover{opacity:1;}'
    + '.gsb-lock{margin-left:3px;font-size:0.78em;opacity:0.85;}'
    + '.gsb-gate-overlay{position:fixed;inset:0;background:rgba(18,58,40,0.97);display:flex;align-items:center;justify-content:center;z-index:9999;}'
    + '.gsb-gate-box{background:#fff;border-radius:12px;padding:30px 28px;max-width:320px;width:90%;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.25);}'
    + '.gsb-gate-box .gsb-icon{font-size:1.9rem;margin-bottom:8px;}'
    + '.gsb-gate-box h3{margin:0 0 6px;font-size:1.05rem;color:#123a28;}'
    + '.gsb-gate-box p{margin:0 0 16px;font-size:0.85rem;color:#5c6b62;}'
    + '.gsb-gate-box input{width:100%;padding:10px 12px;border-radius:6px;border:1px solid #d7ddd4;font-size:0.95rem;text-align:center;margin-bottom:10px;box-sizing:border-box;}'
    + '.gsb-gate-box input:focus{outline:2px solid #1f5c3f;outline-offset:1px;}'
    + '.gsb-gate-box button{width:100%;padding:10px;border-radius:6px;border:none;background:#1f5c3f;color:#fff;font-weight:700;font-size:0.9rem;cursor:pointer;}'
    + '.gsb-gate-box button:hover{background:#123a28;}'
    + '.gsb-gate-err{color:#b3432f;font-size:0.78rem;min-height:1.2em;margin-top:8px;}';

  function isUnlocked(key) {
    try { return sessionStorage.getItem('gsb_unlock_' + key) === '1'; }
    catch (e) { return false; }
  }
  function setUnlocked(key) {
    try { sessionStorage.setItem('gsb_unlock_' + key, '1'); } catch (e) {}
  }

  function findByPageKey(pageKey) {
    for (var i = 0; i < APPS.length; i++) {
      var app = APPS[i];
      if (app.key === pageKey) return { app: app, page: null };
      if (app.pages) {
        for (var j = 0; j < app.pages.length; j++) {
          if (app.pages[j].key === pageKey) return { app: app, page: app.pages[j] };
        }
      }
    }
    return null;
  }

  function showGate(key, onUnlock) {
    var g = GATES[key];
    var overlay = document.createElement('div');
    overlay.className = 'gsb-gate-overlay';
    overlay.innerHTML =
      '<div class="gsb-gate-box">' +
      '<div class="gsb-icon">🔒</div>' +
      '<h3>' + g.title + '</h3>' +
      '<p>' + g.desc + '</p>' +
      '<input type="password" placeholder="Kode" autocomplete="off">' +
      '<button type="button">Lås op</button>' +
      '<div class="gsb-gate-err"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    var input = overlay.querySelector('input');
    var err = overlay.querySelector('.gsb-gate-err');
    function tryUnlock() {
      if (input.value === g.code) {
        setUnlocked(key);
        overlay.parentNode.removeChild(overlay);
        if (onUnlock) onUnlock();
      } else {
        err.textContent = 'Forkert kode — prøv igen.';
      }
    }
    overlay.querySelector('button').addEventListener('click', tryUnlock);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryUnlock(); });
    setTimeout(function () { input.focus(); }, 50);
  }

  function renderNav(currentPageKey) {
    var root = document.getElementById('gsb-nav-root');
    if (!root) return;

    var styleEl = document.createElement('style');
    styleEl.textContent = STYLE;
    document.head.appendChild(styleEl);

    var found = findByPageKey(currentPageKey) || {};
    var currentApp = found.app;

    var appsRow = document.createElement('div');
    appsRow.className = 'gsb-nav-apps';
    APPS.forEach(function (app) {
      var a = document.createElement('a');
      a.className = 'gsb-nav-tab' + (currentApp === app ? ' active' : '');
      a.href = app.href;
      var locked = app.locked && !isUnlocked(app.locked);
      a.innerHTML = app.label + (locked ? '<span class="gsb-lock">🔒</span>' : '');
      if (app.locked) {
        a.addEventListener('click', function (e) {
          if (!isUnlocked(app.locked)) {
            e.preventDefault();
            showGate(app.locked, function () { window.location.href = app.href; });
          }
        });
      }
      appsRow.appendChild(a);
    });
    root.appendChild(appsRow);

    var pagesRow = document.createElement('div');
    pagesRow.className = 'gsb-nav-pages';
    if (!currentApp || !currentApp.pages || currentApp.pages.length === 0) {
      pagesRow.classList.add('gsb-hidden');
    } else {
      currentApp.pages.forEach(function (p) {
        var a = document.createElement('a');
        a.className = 'gsb-nav-tab' + (p.pill ? ' pill' : ' sub') + (p.key === currentPageKey ? ' active' : '');
        a.href = p.href;
        a.textContent = p.label;
        pagesRow.appendChild(a);
      });
    }
    root.appendChild(pagesRow);
  }

  function checkPageGate(currentPageKey) {
    var found = findByPageKey(currentPageKey);
    if (found && found.app.locked && !isUnlocked(found.app.locked)) {
      showGate(found.app.locked, function () {});
    }
  }

  function init() {
    var pageKey = document.body.getAttribute('data-gsb-page') || '';
    renderNav(pageKey);
    checkPageGate(pageKey);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
