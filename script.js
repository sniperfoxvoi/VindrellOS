const bootScreen=document.getElementById('bootScreen');
const modeScreen=document.getElementById('modeScreen');
const desktop=document.getElementById('desktop');
const bootProgress=document.getElementById('bootProgress');
const bootPercent=document.getElementById('bootPercent');
const windowsLayer=document.getElementById('windowsLayer');
const systemTime=document.getElementById('systemTime');
const modeLabel=document.getElementById('modeLabel');

const apps={
 settings:{title:'Settings',width:480,height:340,content:`<div class="window-body"><h2>System Settings</h2><div class="settings-list"><div class="setting-row"><span>Dark Mode</span><div class="toggle"></div></div><div class="setting-row"><span>Blur Effects</span><div class="toggle"></div></div><div class="setting-row"><span>Audio Output</span><span>Studio Monitor</span></div></div></div>`},
 movies:{title:'Movies/TV',width:520,height:360,content:`<div class="window-body"><h2>Movie Library</h2><div class="window-grid"><div class="window-card"><strong>Featured</strong><span>Midnight Run</span></div><div class="window-card"><strong>Series</strong><span>Signal Fade</span></div><div class="window-card"><strong>Genres</strong><span>Drama</span></div><div class="window-card"><strong>Queue</strong><span>12 Items</span></div></div></div>`},
 browser:{title:'Browser',width:640,height:420,content:`<div class="browser-view"><div class="browser-toolbar"><div class="address-bar">vindrell://home</div></div><div class="browser-page"><div><h3>Vindrell Browser</h3><p>Private, focused, and minimal.</p></div></div></div>`},
 games:{title:'Games',width:560,height:360,content:`<div class="window-body"><h2>Game Center</h2><div class="games-grid"><div class="game-card">◈<br>Neon Drift</div><div class="game-card">▣<br>Void Grid</div><div class="game-card">✦<br>Signal 7</div></div></div>`},
 files:{title:'Files',width:500,height:330,content:`<div class="window-body"><h2>Files</h2><div class="window-grid"><div class="window-card"><strong>Work</strong><span>Projects</span></div><div class="window-card"><strong>Media</strong><span>Library</span></div><div class="window-card"><strong>System</strong><span>Logs</span></div><div class="window-card"><strong>Archive</strong><span>Backups</span></div></div></div>`},
 finder:{title:'Finder',width:460,height:300,content:`<div class="window-body"><h2>Desktop</h2><p>Welcome back to VindrellOS. Your workspace is ready.</p></div>`}
};
function setTime(){systemTime.textContent=new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});}
function openApp(name){const app=apps[name];if(!app)return;const el=document.createElement('div');el.className='window';el.style.left=`${Math.random()*18+18}%`;el.style.top=`${Math.random()*14+18}%`;el.style.width=`${app.width}px`;el.style.height=`${app.height}px`;el.innerHTML=`<div class="window-header"><div class="window-dots"><span></span><span></span><span></span></div><div class="window-title">${app.title}</div><div></div></div>${app.content}`;windowsLayer.appendChild(el);windowsLayer.style.pointerEvents='auto';}
function chooseMode(mode){desktop.classList.toggle('windows-mode',mode==='windows');modeLabel.textContent=mode==='windows'?'Windows experience':'macOS experience';modeScreen.classList.add('hidden');desktop.classList.remove('hidden');}
function startBoot(){let progress=0;const interval=setInterval(()=>{progress+=Math.random()*18+8;if(progress>=100){progress=100;clearInterval(interval);setTimeout(()=>{bootScreen.classList.add('hidden');modeScreen.classList.remove('hidden');},300);}bootProgress.style.width=`${progress}%`;bootPercent.textContent=`${Math.floor(progress)}%`;},140);}
document.querySelectorAll('.app-icon,.app-button').forEach(button=>button.addEventListener('click',()=>openApp(button.dataset.app)));
document.querySelectorAll('.mode-option').forEach(button=>button.addEventListener('click',()=>chooseMode(button.dataset.mode)));
setTime();setInterval(setTime,15000);startBoot();
