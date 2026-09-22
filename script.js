(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const bootScreen = $('#bootScreen');
  const introScreen = $('#introScreen');
  const modeScreen = $('#modeScreen');
  const desktop = $('#desktop');
  const bootProgress = $('#bootProgress');
  const bootPercent = $('#bootPercent');
  const windowsLayer = $('#windowsLayer');
  const systemTime = $('#systemTime');
  const modeLabel = $('#modeLabel');

  if (!bootScreen || !introScreen || !modeScreen || !desktop || !bootProgress || !bootPercent) return;

  // Keep the controls visible even if an older Chromebook browser has cached CSS.
  const closeStyles = document.createElement('style');
  closeStyles.textContent = `.window-close{width:24px;height:24px;border:1px solid #666;border-radius:50%;background:#222;color:#fff;cursor:pointer;line-height:20px}.window-close:hover{background:#fff;color:#111}.window-header{gap:12px}.window-title{flex:1;text-align:center}`;
  document.head.appendChild(closeStyles);

  const apps = {
    settings: { title: 'Settings', width: 590, height: 440, content: `<div class="window-body"><h2>System Settings</h2><div class="settings-grid"><div class="setting-tile"><strong>Appearance</strong><small>Theme: Monochrome</small></div><div class="setting-tile"><strong>Personalization</strong><small>Accent: Silver</small></div><div class="setting-tile"><strong>Notifications</strong><small>Focus mode enabled</small></div><div class="setting-tile"><strong>Privacy &amp; Security</strong><small>Protected browsing</small></div><div class="setting-tile"><strong>Network</strong><small>Vindrell Wi-Fi connected</small></div><div class="setting-tile"><strong>Sound</strong><small>Output: Default</small></div><div class="setting-tile"><strong>Accessibility</strong><small>Motion and text controls</small></div><div class="setting-tile"><strong>System Updates</strong><small>VindrellOS is up to date</small></div></div></div>` },
    movies: { title: 'Movies/TV', width: 520, height: 360, content: `<div class="window-body"><h2>Movie Library</h2><div class="window-grid"><div class="window-card"><strong>Featured</strong><span>Midnight Run</span></div><div class="window-card"><strong>Series</strong><span>Signal Fade</span></div><div class="window-card"><strong>Genres</strong><span>Drama</span></div><div class="window-card"><strong>Queue</strong><span>12 Items</span></div></div></div>` },
    browser: { title: 'DuckDuckGo Browser', width: 680, height: 440, content: `<div class="browser-view"><div class="browser-toolbar"><button type="button" class="browser-back">←</button><button type="button" class="browser-forward">→</button><div class="address-bar">https://duckduckgo.com</div></div><div class="browser-page"><div><div class="duck-logo">🦆</div><h2>DuckDuckGo</h2><p>Private searching in Vindrell Browser.</p><form class="search-box"><input class="search-input" placeholder="Search DuckDuckGo" autocomplete="off"><button>Search</button></form><p class="search-status"></p></div></div></div>` },
    games: { title: 'Games', width: 620, height: 470, content: `<div class="window-body"><h2>School Break Arcade</h2><p>Quick, offline-friendly games for a short break.</p><div class="game-list"><button class="game-link" data-game="runner">Vindrell Runner</button><button class="game-link" data-game="memory">Memory Match</button><button class="game-link" data-game="reaction">Reaction Test</button></div><div class="game-stage"></div></div>` },
    files: { title: 'Files', width: 500, height: 330, content: `<div class="window-body"><h2>Files</h2><div class="window-grid"><div class="window-card"><strong>Work</strong><span>Projects</span></div><div class="window-card"><strong>Media</strong><span>Library</span></div><div class="window-card"><strong>System</strong><span>Logs</span></div><div class="window-card"><strong>Archive</strong><span>Backups</span></div></div></div>` },
    finder: { title: 'Finder', width: 460, height: 300, content: `<div class="window-body"><h2>Desktop</h2><p>Welcome back to VindrellOS. Your workspace is ready.</p></div>` }
  };

  function setTime() {
    if (systemTime) systemTime.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function closeWindow(windowEl) {
    windowEl.remove();
    if (windowsLayer && !windowsLayer.children.length) windowsLayer.style.pointerEvents = 'none';
  }

  function openApp(name) {
    const app = apps[name];
    if (!app || !windowsLayer) return;
    const windowEl = document.createElement('section');
    windowEl.className = 'window';
    windowEl.setAttribute('role', 'dialog');
    windowEl.setAttribute('aria-label', app.title);
    windowEl.style.left = `${Math.random() * 18 + 18}%`;
    windowEl.style.top = `${Math.random() * 14 + 18}%`;
    windowEl.style.width = `${app.width}px`;
    windowEl.style.height = `${app.height}px`;
    windowEl.innerHTML = `<div class="window-header"><div class="window-dots"><span></span><span></span><span></span></div><div class="window-title">${app.title}</div><button type="button" class="window-close" aria-label="Close ${app.title}">×</button></div>${app.content}`;
    windowsLayer.appendChild(windowEl);
    windowsLayer.style.pointerEvents = 'auto';
    $('.window-close', windowEl).addEventListener('click', () => closeWindow(windowEl));
    windowEl.addEventListener('pointerdown', () => { windowEl.style.zIndex = String(Date.now()); });
    if (name === 'browser') wireBrowser(windowEl);
    if (name === 'games') wireGames(windowEl);
  }

  function wireBrowser(windowEl) {
    const form = $('.search-box', windowEl);
    const input = $('.search-input', windowEl);
    const status = $('.search-status', windowEl);
    const address = $('.address-bar', windowEl);
    if (!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) return;
      const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      address.textContent = url;
      status.textContent = `Opening DuckDuckGo results for “${query}”…`;
      // Use a normal link navigation so Chromebook popup blockers do not stop it.
      window.location.href = url;
    });
  }

  function wireGames(windowEl) {
    $$('.game-link', windowEl).forEach(button => button.addEventListener('click', () => {
      const stage = $('.game-stage', windowEl);
      if (button.dataset.game === 'runner') {
        stage.innerHTML = '<p>Press jump when the obstacle gets close.</p><canvas class="runner-canvas" width="540" height="170"></canvas><button class="runner-start">Start / Restart</button>';
        const canvas = $('canvas', stage), ctx = canvas.getContext('2d'), start = $('.runner-start', stage);
        let running = false, obstacle = 520, playerY = 0, velocity = 0, score = 0, last = 0;
        const jump = () => { if (running && playerY === 0) velocity = -430; };
        function frame(now) { const dt = Math.min((now - last) / 1000, .04); last = now; ctx.clearRect(0, 0, canvas.width, canvas.height); velocity += 1200 * dt; playerY = Math.max(0, playerY - velocity * dt); if (playerY === 0) velocity = 0; obstacle -= 220 * dt; if (obstacle < -25) { obstacle = 540; score += 1; } ctx.fillStyle = '#eee'; ctx.fillRect(0, 145, 540, 2); ctx.fillRect(70, 120 - playerY, 25, 25); ctx.fillStyle = '#888'; ctx.fillRect(obstacle, 112, 22, 33); ctx.fillStyle = '#aaa'; ctx.fillText(`Score: ${score}`, 12, 20); if (running && !(obstacle < 95 && obstacle > 45 && playerY < 33)) requestAnimationFrame(frame); else if (running) { running = false; ctx.fillStyle = '#fff'; ctx.fillText('Game over — press restart', 190, 35); } }
        start.addEventListener('click', () => { running = true; obstacle = 520; playerY = 0; velocity = 0; score = 0; last = performance.now(); requestAnimationFrame(frame); }); canvas.addEventListener('pointerdown', jump); window.addEventListener('keydown', event => { if (event.code === 'Space') { event.preventDefault(); jump(); } });
      } else {
        stage.innerHTML = `<p>${button.dataset.game === 'memory' ? 'Memory Match: remember the sequence.' : 'Reaction Test: click when ready.'}</p><button class="runner-start">Start</button>`;
      }
    }));
  }

  function chooseMode(mode) {
    desktop.classList.toggle('windows-mode', mode === 'windows');
    if (modeLabel) modeLabel.textContent = mode === 'windows' ? 'Windows experience' : 'macOS experience';
    const menuBrand = $('#menuBrand');
    if (menuBrand) menuBrand.textContent = mode === 'windows' ? 'Start' : 'Finder';
    modeScreen.classList.add('hidden');
    desktop.classList.remove('hidden');
  }

  function startBoot() {
    let progress = 0;
    const interval = window.setInterval(() => {
      progress = Math.min(100, progress + 7);
      bootProgress.style.width = `${progress}%`;
      bootPercent.textContent = `${progress}%`;
      if (progress === 100) {
        window.clearInterval(interval);
        window.setTimeout(() => { bootScreen.classList.add('hidden'); introScreen.classList.remove('hidden'); }, 350);
      }
    }, 120);
  }

  $('#introContinue')?.addEventListener('click', () => { introScreen.classList.add('hidden'); modeScreen.classList.remove('hidden'); });
  $$('.mode-option').forEach(button => button.addEventListener('click', () => chooseMode(button.dataset.mode)));
  $$('.app-icon, .app-button').forEach(button => button.addEventListener('click', () => openApp(button.dataset.app)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { const openWindows = $$('.window'); if (openWindows.length) closeWindow(openWindows[openWindows.length - 1]); } });
  setTime();
  window.setInterval(setTime, 15000);
  startBoot();
})();
