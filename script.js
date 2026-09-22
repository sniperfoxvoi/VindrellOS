var _SYSTEM_PATHS = ["C:/Windows/System32/kernel32.dll", "/var/www/html/cine-os/", "https://cine-os.local/api/v1/auth"];
var _devBuildVer = "3.0.1";

var APPS = {
    'cine': {title: 'CINE // HUB', path: 'script/Apps/Cine/index.html', icon: 'https://cdn.worldvectorlogo.com/logos/netflix-logo-icon.svg', pinned: true},
    'term': {title: 'Spotify', path: 'script/Apps/Spotify/index.html', icon: 'https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_1280.jpg', pinned: true},
    'files': {title: 'PS5 Emu', path: 'script/Apps/Ps5/index.html', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-OeL_be7RFaoHi3PswkuAR5XcMgBNRDynsg&s', pinned: true},
    'web': {title: 'Cine-Web', path: 'script/Apps/Web/index.html', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeD89ZcX5W1FBtal7RerasT27q-OmZqnBixQ&s', pinned: true},
    'settings': {title: 'CONFIG', internal: true, icon: 'https://cdn.iconscout.com/icon/free/png-256/free-apple-settings-icon-svg-download-png-493162.png', pinned: true},
    'discord': {title: 'Discord', path: 'script/Apps/Discord/index.html', icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png', pinned: false},
    'roblox': {title: 'Roblox', path: 'script/Apps/Roblox/index.html', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9KvNyFWMg_bjo_q_1IVLKFWbfCeonn2qDow&s', pinned: false},
    'android': {title: 'Android', path: 'script/Apps/Android/index.html', icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/android-icon.png', pinned: false},
    'ciniai': {title: 'Cini AI', path: 'script/Apps/Cini/index.html', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkLXhvns5Rrdf-XBNlWcPIRh0hlJfWnEtBWg&s', pinned: false},
    'VM': {title: 'Windows Virtual-Machine', path: 'script/Apps/VM/index.html', icon: 'https://static1.squarespace.com/static/68e69c83884dc82cc035a923/69454e29c6db7516b2566fca/69454e32c6db7516b256749a/1766149682532/Virtualbox_logo.png?format=original', pinned: false},
    'crunchyroll': {title: 'CrunchyRoll', path: 'script/Apps/Crunchy/index.html', icon: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0a4547a-06c5-4740-b87a-ca9c4fa0171e/dduaesk-2b3e85d2-3116-4eb5-8260-f413d1fc670e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9hMGE0NTQ3YS0wNmM1LTQ3NDAtYjg3YS1jYTljNGZhMDE3MWUvZGR1YWVzay0yYjNlODVkMi0zMTE2LTRlYjUtODI2MC1mNDEzZDFmYzY3MGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vReffTSSKpde4w8EwFxz_CttxlLay8fXOq0goYh6rsg', pinned: false},
    'Geforce': {title: 'GEFORCE NOW', path: 'script/Apps/Geforce/index.html', icon: 'https://play-lh.googleusercontent.com/_-b_HQXrVyyhZSHj_BoE9u_-cxkcHDH_yLX5rDjJsFMIfsCNQs9F3QP4JvEFcWaSIz0=w240-h480-rw', pinned: false},
    'Fortnite': {title: 'Fortnite', path: 'script/Apps/Fortnite/index.html', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShiXrQ-cvZeDyQNPIZCv_hsaUCAe5j_rXJ7Q&s', pinned: false},
    'RocketL': {title: 'Rocket League', path: 'script/Apps/RocketL/index.html', icon: 'https://ygo-assets-entities-us.yougov.net/87bb7a16-2b62-11e8-82b1-37bb0d207ced.jpg?zcw=518&zch=518&zct=10&zcl=0', pinned: false},
    'Xbox': {title: 'Xbox', path: 'script/Apps/Xbox/index.html', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRknRQh-WRK4F75YB3EAlfrsqAk66Xjn45sBg&s', pinned: false},
};

var savedPins = localStorage.getItem('c_pins_v2');
if(savedPins) {
    let p = JSON.parse(savedPins);
    for(let k in p) {
        if(APPS[k]) APPS[k].pinned = p[k];
    }
}

function syncPins() {
    let obj = {};
    for(let k in APPS) obj[k] = APPS[k].pinned;
    localStorage.setItem('c_pins_v2', JSON.stringify(obj));
}

var wallpaperRegistry = {
    "Default": {id: "Default", name: "Snake Skeleton", url: "Videos/default.mp4", locked: false},
    "green": {id: "green", name: "Green Anime", url: "Videos/green.mp4", locked: false},
    "33A56": {id: "hunt_trait", name: "Hunt Showdown", url: "Videos/33A56.mp4", locked: true},
    "45E33": {id: "45E33", name: "45E33", url: "Videos/45E33.mp4", locked: false},
    "55Cine": {id: "55Cine", name: "Cine 55", url: "Videos/55Cine.PNG", locked: false},
    "99Med": {id: "99Med", name: "99 Med", url: "Videos/99Med.mp4", locked: false},
    "Brother": {id: "Brother", name: "Brother", url: "Videos/Brother.mp4", locked: false},
    "F-1": {id: "F-1", name: "F-1 Formula", url: "Videos/F-1.mp4", locked: false},
    "Gojo-Sukuna": {id: "Gojo-Sukuna", name: "Gojo vs Sukuna", url: "Videos/Gojo-Sukuna.mp4", locked: false},
    "Hunt": {id: "Hunt", name: "Hunt Showdown 2", url: "Videos/Hunt.mp4", locked: false},
    "Minecraft01": {id: "Minecraft01", name: "Minecraft 01", url: "Videos/Minecraft01.mp4", locked: false},
    "Minecraft02": {id: "Minecraft02", name: "Minecraft 02", url: "Videos/Minecraft02.mp4", locked: false},
    "Minecraft03": {id: "Minecraft03", name: "Minecraft 03", url: "Videos/Minecraft03.mp4", locked: false},
    "Monkey": {id: "Monkey", name: "Monkey", url: "Videos/Monkey.mp4", locked: false},
    "Skello": {id: "Skello", name: "Skello", url: "Videos/Skello.MP4", locked: false},
    "SnowFox": {id: "SnowFox", name: "Snow Fox", url: "Videos/SnowFox.mp4", locked: false},
    "Supra": {id: "Supra", name: "Supra Drift", url: "Videos/Supra.PNG", locked: false},
    "Yuji52": {id: "Yuji52", name: "Yuji 52", url: "Videos/Yuji52.mp4", locked: false},
    "sukuna-fire": {id: "sukuna-fire", name: "Sukuna Fire", url: "Videos/sukuna-fire.mp4", locked: false},
    "CozyFox": {id: "CozyFox", name: "Cozy Fox", url: "Videos/CozyFox.mp4", locked: false},
    "RainyCity": {id: "RainyCity", name: "Rainy City", url: "Videos/RainyCity.mp4", locked: false},
    "Gojo": {id: "Gojo", name: "Gojo", url: "Videos/Gojo.mp4", locked: false},
    "BlackHole": {id: "BlackHole", name: "Black Hole", url: "Videos/BlackHole.mp4", locked: false},
    "Yuta": {id: "Yuta", name: "Yuta", url: "Videos/Yuta.mp4", locked: false},
    "Desktop": {id: "Desktop", name: "Desktop Lines", url: "Videos/Desktop.mp4", locked: false}
};

var sysConfig = JSON.parse(localStorage.getItem('cine_sys_config')) || {};
if(sysConfig.optBg === undefined) sysConfig.optBg = false;
if(sysConfig.shortBoot === undefined) sysConfig.shortBoot = false;
if(sysConfig.wpLoop === undefined) sysConfig.wpLoop = false;
if(sysConfig.idleLock === undefined) sysConfig.idleLock = false; 
if(sysConfig.redirectConfirm === undefined) sysConfig.redirectConfirm = false; 
if(!sysConfig.panicKey) sysConfig.panicKey = '`';
if(!sysConfig.homeWallpaper) sysConfig.homeWallpaper = 'Default';
if(!sysConfig.lockWallpaper) sysConfig.lockWallpaper = 'green';
if(!sysConfig.cloak) sysConfig.cloak = 'none';

window.updateSysSetting = function(key, value) {
    sysConfig[key] = value;
    localStorage.setItem('cine_sys_config', JSON.stringify(sysConfig));
    if(key === 'optBg') applySystemSettings();
    if(key === 'wpLoop') updateWallpaperLoop();
};

var cloaks = {
    none: {title: "Cine-OS", icon: ""},
    google: {title: "Google", icon: "https://www.google.com/favicon.ico"},
    drive: {title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"},
    canvas: {title: "Dashboard", icon: "https://du11hjcvx0uqb.cloudfront.net/br/dist/images/favicon-e10d657a73.ico"},
    classroom: {title: "Classes", icon: "https://ssl.gstatic.com/classroom/favicon.png"}
};

window.updateCloak = function(key) {
    sysConfig.cloak = key;
    localStorage.setItem('cine_sys_config', JSON.stringify(sysConfig));
    applyCloak();
};

function applyCloak() {
    var k = sysConfig.cloak || 'none';
    var sel = cloaks[k];
    var icons = document.querySelectorAll("link[rel*='icon']");
    for(var i=0; i<icons.length; i++) icons[i].remove();
    
    if(sel && k !== 'none') {
        document.title = sel.title;
        let n = document.createElement('link');
        n.type = 'image/x-icon';
        n.rel = 'shortcut icon';
        n.href = sel.icon;
        document.getElementsByTagName('head')[0].appendChild(n);
    } else {
        document.title = "Cine-OS";
    }
}
setInterval(applyCloak, 2000);

var isDesktopActive = false;
var bootActive = true;
var enterCount = 0;
var highestZ = 500;
var activeWindowId = null;
var isMediaPlaying = false;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var activeCtxId = null;

if(isMobile) {
    var mobWarn = document.getElementById('mobile-warning');
    if(mobWarn && mobWarn.showModal) mobWarn.showModal();
    else if(mobWarn) mobWarn.style.display = 'flex';
    
    var lastTap = 0;
    document.addEventListener('touchstart', function(e) {
        let t = new Date().getTime();
        let tl = t - lastTap;
        if(tl < 500 && tl > 0) {
            if(mobWarn && mobWarn.close) mobWarn.close();
            else if(mobWarn) mobWarn.style.display = 'none';
        }
        lastTap = t;
    });
}

async function loadDynamicResources() {
    renderUI();
    initWallpapers();
    setupAppContextMenu();
}

window.onbeforeunload = function(e) {
    if(sysConfig.redirectConfirm) {
        let msg = "Are you sure you want to leave? This helps block GoGuardian redirects.";
        e.returnValue = msg;
        return msg;
    }
};

document.addEventListener("DOMContentLoaded", function() {
    applyCloak();
    loadDynamicResources();
    document.getElementById('boot-layer').style.display = 'block';
    loadDesktop();
    updateSidebarData();
});

function renderUI() {
    let dock = document.getElementById('dock-container');
    let dHTML = '<div class="dock-item" onclick="toggleStartMenu()"><img src="https://missionsupport.archden.org/wp-content/uploads/2022/02/windows11-icon.png"></div><div class="dock-sep"></div><div class="dock-item" onclick="toggleAppDrawer()"><svg width="24" height="24" viewBox="0 0 24 24" fill="#aaa"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg></div><div class="dock-sep"></div>';
    
    let pGrid = document.getElementById('pinned-grid');
    let pHTML = '';
    
    for(let id in APPS) {
        if(APPS[id].pinned) {
            dHTML += '<div class="dock-item" data-id="'+id+'" onmousedown="DragSystem.start(event,this,\'dock\',\''+id+'\')" onclick="toggleApp(\''+id+'\')" oncontextmenu="openDockCtx(event, \''+id+'\')"><img src="'+APPS[id].icon+'"></div>';
            pHTML += '<div class="pinned-item" onclick="toggleApp(\''+id+'\')"><img src="'+APPS[id].icon+'"><span>'+APPS[id].title+'</span></div>';
        }
    }
    
    dock.innerHTML = dHTML;
    pGrid.innerHTML = pHTML;
    populateDrawer();
}

function openDockCtx(e, id) {
    e.preventDefault(); e.stopPropagation();
    hideAllCtx();
    activeCtxId = id;
    let m = document.getElementById('dock-ctx-menu');
    if(m) {
        m.style.display = 'block';
        m.style.left = e.pageX + 'px';
        m.style.top = e.pageY + 'px';
    }
}

function openDrawerCtx(e, id) {
    e.preventDefault(); 
  e.stopPropagation();
    hideAllCtx();
    activeCtxId = id;
    let m = document.getElementById('drawer-ctx-menu');
    if(m) {
        m.style.display = 'block';
        m.style.left = e.pageX + 'px';
        m.style.top = e.pageY + 'px';
    }
}

document.getElementById('ctx-pin-app').onclick = function() {
    if(activeCtxId && APPS[activeCtxId]) {
        APPS[activeCtxId].pinned = true;
        syncPins();
        renderUI();
    }
    hideAllCtx();
}

document.getElementById('ctx-unpin-app').onclick = function() {
    if(activeCtxId && APPS[activeCtxId]) {
        APPS[activeCtxId].pinned = false;
        syncPins();
        renderUI();
    }
    hideAllCtx();
}

function hideAllCtx() {
    let menus = ['app-context-menu','desktop-context-menu','drawer-ctx-menu','dock-ctx-menu'];
    for(let i=0; i<menus.length; i++) {
        let m = document.getElementById(menus[i]);
        if(m) m.style.display = 'none';
    }
}
document.addEventListener('click', hideAllCtx);

document.addEventListener('keydown', function(e) {
    if(bootActive && e.key === 'Enter' && document.getElementById('boot-layer').style.display !== 'none') {
        enterCount++;
        if(enterCount >= 2) skipBootSequence();
        setTimeout(function(){ enterCount = 0; }, 500);
    }
    if(e.key && sysConfig.panicKey && e.key.toLowerCase() === sysConfig.panicKey.toLowerCase()) {
        window.location.href = "https://google.com";
    }
});

function startBootSequence() {
    let cb = document.getElementById('boot-content');
    let bv = document.getElementById('boot-video');
    cb.style.display = 'none';
    bv.style.display = 'block';
    bv.muted = false;
    bv.volume = 1.0;
    
    if(sysConfig.shortBoot) {
        bv.src = "Videos/QuickBoot.mp4";
        bv.load();
    }
    
    let p = bv.play();
    if(p !== undefined) {
        p.catch(function() {
            bv.muted = true;
            bv.play();
        });
    }
    bv.onended = function() {
        if(bootActive) skipBootSequence();
    };
}

function skipBootSequence() {
    if(!bootActive) return;
    bootActive = false;
    let lay = document.getElementById('boot-layer');
    let bv = document.getElementById('boot-video');
    if(bv) bv.pause();
    
    if(lay) {
        lay.style.opacity = '0';
        document.getElementById('lock-screen').classList.add('active');
        
        let lv = document.getElementById('lock-video');
        if(lv.style.display !== 'none') {
            lv.play().catch(function(e) {});
        }
        
        setTimeout(function() { lay.style.display = 'none'; }, 600);
        updateClock();
    }
}

function showNotification(title, msg) {
    let c = document.getElementById('toast-container');
    let t = document.createElement('div');
    t.className = 'toast-notification';
    t.innerHTML = '<div class="toast-header"><div class="toast-app-info"><div class="toast-icon"><i class="fas fa-bell"></i></div><span>System</span></div><i class="fas fa-times toast-close"></i></div><div class="toast-title">' + title + '</div><div class="toast-body">' + msg + '</div>';
    c.appendChild(t);
    
    setTimeout(function(){ t.classList.add('show'); }, 100);
    t.onclick = function() {
        t.classList.remove('show');
        setTimeout(function(){ t.remove(); }, 400);
    };
    setTimeout(t.onclick, 6000);
}

var welcomeShown = false;
window.unlockSystem = function() {
    let scr = document.getElementById('lock-screen');
    scr.classList.add('slide-up');
    setTimeout(function() {
        scr.classList.remove('active');
        isDesktopActive = true;
        document.getElementById('lock-video').pause();
        
        if(!sysConfig.optBg) {
            let bV = document.getElementById('bg-video');
            if(bV.style.display !== 'none') bV.play().catch(function(e){});
        }
        if(!welcomeShown) {
            showNotification("Welcome To Cine V2", "Checkout Settings for FAQ!");
            welcomeShown = true;
        }
    }, 600);
    resetIdle();
};

function applyMediaToElements(url, vidEl, imgEl, isBg) {
    if(!url) return;
    let isImg = url.match(/\.(png|jpg|jpeg|gif)$/i);
    if(isImg) {
        vidEl.style.display = 'none';
        vidEl.pause();
        imgEl.style.display = 'block';
        imgEl.src = url;
    } else {
        imgEl.style.display = 'none';
        vidEl.style.display = 'block';
        vidEl.src = url;
        vidEl.load();
        if(isBg && isDesktopActive && !sysConfig.optBg) vidEl.play().catch(function(e){});
        if(!isBg && document.getElementById('lock-screen').classList.contains('active')) vidEl.play().catch(function(e){});
    }
}

function initWallpapers() {
    let bV = document.getElementById('bg-video');
    let bI = document.getElementById('bg-img');
    let lV = document.getElementById('lock-video');
    let lI = document.getElementById('lock-img');
    
    if(wallpaperRegistry[sysConfig.homeWallpaper]) {
        applyMediaToElements(wallpaperRegistry[sysConfig.homeWallpaper].url, bV, bI, true);
    }
    if(wallpaperRegistry[sysConfig.lockWallpaper]) {
        applyMediaToElements(wallpaperRegistry[sysConfig.lockWallpaper].url, lV, lI, false);
    } else {
        applyMediaToElements("Videos/green.mp4", lV, lI, false);
    }
    
    updateWallpaperLoop();
    let wChk = document.getElementById('wp-loop-chk');
    if(wChk) wChk.checked = sysConfig.wpLoop;
}

function updateWallpaperLoop() {
    let bV = document.getElementById('bg-video');
    let lV = document.getElementById('lock-video');
    if(bV) bV.loop = sysConfig.wpLoop;
    if(lV) lV.loop = sysConfig.wpLoop;
    if(!sysConfig.optBg && isDesktopActive && bV && bV.paused && bV.style.display !== 'none') {
        bV.play().catch(function(e){});
    }
}

function updateClock() {
    let n = new Date();
    let dArr = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
    let mArr = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    
    let hrs = n.getHours().toString().padStart(2, '0');
    let min = n.getMinutes().toString().padStart(2, '0');
    let dNum = n.getDate().toString().padStart(2, '0');
    let dName = dArr[n.getDay()];
    let yr = n.getFullYear();
    
    let lDay = document.getElementById('lock-day-large');
    let lDat = document.getElementById('lock-date');
    let lTim = document.getElementById('lock-time');
    let hDay = document.getElementById('lbl-day');
    
    if(lDay) lDay.innerText = dName;
    if(hDay) hDay.innerText = dName;
    if(lDat) lDat.innerText = dNum + ' ' + mArr[n.getMonth()] + ', ' + yr + '.';
    if(lTim) lTim.innerText = '- ' + hrs + ':' + min + ' -';
}
setInterval(updateClock, 1000);

var idleTime = 0;
function resetIdle() { idleTime = 0; }
document.addEventListener('mousemove', resetIdle);
document.addEventListener('keypress', resetIdle);

setInterval(function() {
    idleTime++;
    let scr = document.getElementById('lock-screen');
    if(sysConfig.idleLock && idleTime >= 180 && !scr.classList.contains('active') && !bootActive) {
        if(isMediaPlaying) {
            idleTime = 0; 
        } else {
            isDesktopActive = false;
            scr.classList.remove('slide-up');
            scr.classList.add('active');
            document.getElementById('bg-video').pause();
            let lv = document.getElementById('lock-video');
            if(lv.style.display !== 'none') lv.play().catch(function(e){});
        }
    }
}, 1000);

window.launchLastPlayed = function() { toggleApp('files'); };
window.resumeSpotify = function() { toggleApp('term'); };
window.openUpdateLog = function() {
    let u = document.getElementById('update-modal');
    if(u && u.showModal) u.showModal();
    else if(u) u.style.display = 'flex';
};

function updateSidebarData() {
    try {
        let ps = JSON.parse(localStorage.getItem('ps_purchased'));
        if(ps && ps.length > 0) document.getElementById('last-game-name').innerText = "PS5 Library Ready";
        let sp = JSON.parse(localStorage.getItem('cinify_cache'));
        if(sp) {
            let k = Object.keys(sp);
            if(k.length > 0) {
                document.getElementById('spotify-track-name').innerText = sp[k[k.length-1]].title || "Liked Song";
                if(sp[k[k.length-1]].cover) document.getElementById('spotify-album-art').src = sp[k[k.length-1]].cover;
            }
        }
    } catch(e) {}
}
setInterval(updateSidebarData, 5000);

function populateDrawer() {
    let g = document.getElementById('drawer-grid');
    g.innerHTML = '';
    for(let key in APPS) {
        let a = APPS[key];
        let d = document.createElement('div');
        d.className = 'drawer-item';
        d.dataset.i
