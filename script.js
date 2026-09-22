const bootScreen = document.getElementById('bootScreen');
const modeScreen = document.getElementById('modeScreen');
const desktop = document.getElementById('desktop');
const bootProgress = document.getElementById('bootProgress');
const bootPercent = document.getElementById('bootPercent');
const windowsLayer = document.getElementById('windowsLayer');
const systemTime = document.getElementById('systemTime');
const modeLabel = document.getElementById('modeLabel');

const logo = document.querySelector('.boot-logo');
if (logo) logo.classList.add('spinning-logo');

const apps = {
  settings: { title: 'Settings', width: 480, height: 340, content: `<div class="window-body"><h2>System Settings</h2><div class="settings-list"><div class="setting-row"><span>Dark Mode</span><div class="toggle"></div></div><div class="setting-row"><span>Blur Effects</span><div class="toggle"></div></div><div class="setting-row"><span>Audio Output</span><span>Studio Monitor</span></div></div></div>` },
  movies: { title: 'Movies/TV', width: 520, height: 360, content: `<div class="window-body"><h2>Movie Library</h2><div class="window-grid"><div class="window-card"><strong>Featured</strong><span>Midnight Run</span></div><div class="window-card"><strong>Series</strong><span>Signal Fade</span></div><div class="window-card"><strong>Genres</strong><span>Drama</span></div><div class="window-card"><strong>Queue</strong><span>12 Items</span></div></div></div>` },
  browser: { title: 'Browser', width: 640, height: 420, content: `<div class="browser-view"><div class="browser-toolbar"><div class="address-bar">vindrell://home</div></div><div class="browser-page"><div><h3>Vindrell Browser</h3><p>Private, focused, and minimal.</p></div></div></div>` },
  games: {
    title: 'Games', width: 620, height: 470,
    content: `<div class="window-body runner-body"><h2>Vindrell Runner</h2><p>Tap, click, or press Space to jump over obstacles.</p><div class="runner-score">Score: <span id="runnerScore">0</span> &nbsp; Best: <span id="runnerBest">0</span></div><canvas id="runnerCanvas" class="runner-canvas" width="560" height="260"></canvas><button id="runnerStart" class="runner-start">Start game</button></div>`
  },
  files: { title: 'Files', width: 500, height: 330, content: `<div class="window-body"><h2>Files</h2><div class="window-grid"><div class="window-card"><strong>Work</strong><span>Projects</span></div><div class="window-card"><strong>Media</strong><span>Library</span></div><div class="window-card"><strong>System</strong><span>Logs</span></div><div class="window-card"><strong>Archive</strong><span>Backups</span></div></div></div>` },
  finder: { title: 'Finder', width: 460, height: 300, content: `<div class="window-body"><h2>Desktop</h2><p>Welcome back to VindrellOS. Your workspace is ready.</p></div>` }
};

function setTime() { systemTime.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }

function startRunner() {
  const canvas = document.getElementById('runnerCanvas');
  const start = document.getElementById('runnerStart');
  const scoreEl = document.getElementById('runnerScore');
  const bestEl = document.getElementById('runnerBest');
  if (!canvas || !start || canvas.dataset.ready) return;
  canvas.dataset.ready = 'true';
  const ctx = canvas.getContext('2d');
  const bestKey = 'vindrell-runner-best';
  bestEl.textContent = localStorage.getItem(bestKey) || '0';
  let runner, obstacles, score, speed, running, lastTime, animation;

  function reset() {
    runner = { x: 72, y: 0, size: 25, velocity: 0, grounded: true };
    obstacles = [{ x: 580, width: 24, height: 38 }];
    score = 0; speed = 230; running = true; lastTime = performance.now();
    start.textContent = 'Restart';
    cancelAnimationFrame(animation); animation = requestAnimationFrame(loop);
  }
  function jump() { if (running && runner.grounded) { runner.velocity = -520; runner.grounded = false; } }
  function draw() {
    const ground = canvas.height - 38;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#171717'; ctx.fillRect(0, ground, canvas.width, 2);
    ctx.fillStyle = '#fff'; ctx.fillRect(runner.x, ground - runner.size - runner.y, runner.size, runner.size);
    ctx.fillStyle = '#aaa';
    obstacles.forEach(o => ctx.fillRect(o.x, ground - o.height, o.width, o.height));
    ctx.fillStyle = '#aaa'; ctx.font = '13px sans-serif'; ctx.fillText(running ? 'RUNNING' : 'GAME OVER', 16, 24);
  }
  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, .04); lastTime = now;
    const ground = canvas.height - 38;
    runner.velocity += 1450 * dt; runner.y -= runner.velocity * dt;
    if (runner.y <= 0) { runner.y = 0; runner.velocity = 0; runner.grounded = true; }
    obstacles.forEach(o => { o.x -= speed * dt; });
    if (obstacles[obstacles.length - 1].x < 330) obstacles.push({ x: canvas.width + 20, width: 20 + Math.random() * 16, height: 25 + Math.random() * 32 });
    obstacles = obstacles.filter(o => o.x > -60);
    const rx = runner.x, ry = ground - runner.size - runner.y;
    for (const o of obstacles) if (rx < o.x + o.width && rx + runner.size > o.x && ry < ground && ry + runner.size > ground - o.height) { running = false; const best = Math.max(score, Number(localStorage.getItem(bestKey) || 0)); localStorage.setItem(bestKey, best); bestEl.textContent = best; }
    if (running) { score += dt * 10; speed += dt * 2; scoreEl.textContent = Math.floor(score); animation = requestAnimationFrame(loop); }
    draw();
  }
  start.addEventListener('click', reset); canvas.addEventListener('pointerdown', jump);
  window.addEventListener('keydown', event => { if (event.code === 'Space') { event.preventDefault(); if (!running) reset(); else jump(); } });
  draw();
}

function openApp(name) {
  const app = apps[name]; if (!app) return;
  const el = document.createElement('div'); el.className = 'window';
  el.style.left = `${Math.random() * 18 + 18}%`; el.style.top = `${Math.random() * 14 + 18}%`;
  el.style.width = `${app.width}px`; el.style.height = `${app.height}px`;
  el.innerHTML = `<div class="window-header"><div class="window-dots"><span></span><span></span><span></span></div><div class="window-title">${app.title}</div><div></div></div>${app.content}`;
  windowsLayer.appendChild(el); windowsLayer.style.pointerEvents = 'auto';
  if (name === 'games') startRunner();
}

function chooseMode(mode) { desktop.classList.toggle('windows-mode', mode === 'windows'); modeLabel.textContent = mode === 'windows' ? 'Windows experience' : 'macOS experience'; modeScreen.classList.add('hidden'); desktop.classList.remove('hidden'); }
function startBoot() { let progress = 0; const interval = setInterval(() => { progress += Math.random() * 18 + 8; if (progress >= 100) { progress = 100; clearInterval(interval); setTimeout(() => { bootScreen.classList.add('hidden'); modeScreen.classList.remove('hidden'); }, 300); } bootProgress.style.width = `${progress}%`; bootPercent.textContent = `${Math.floor(progress)}%`; }, 140); }

document.querySelectorAll('.app-icon,.app-button').forEach(button => button.addEventListener('click', () => openApp(button.dataset.app)));
document.querySelectorAll('.mode-option').forEach(button => button.addEventListener('click', () => chooseMode(button.dataset.mode)));
setTime(); setInterval(setTime, 15000); startBoot();
