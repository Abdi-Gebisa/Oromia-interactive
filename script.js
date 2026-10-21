'use strict';

let currentLang = 'om';
let activeTab = 'projectile';
let lensType = 'convex';

// --- BILINGUAL DICTIONARY ---
const i18n = {
    om: {
        badgeProj: "Mootora Sochii Pirojektaayilii",
        badgeSnell: "Jal'ina Ifaa & TIR",
        badgeLens: "Teessoo Leensii Gaawusiyaanii",
        badgeEuee: "Baankii Gaaffilee EUEE",
        telTime: "Yeroo (T)", telRange: "Fageenya (R)", telMaxH: "Olka'iinsa (H)",
        telTheta2: "Kofa Jal'inaa", telCrit: "Kofa Murteessaa",
        telDi: "Fakkii (di)", telMag: "Guddina (M)"
    },
    en: {
        badgeProj: "Projectile Motion Engine",
        badgeSnell: "Refraction & TIR Engine",
        badgeLens: "Gaussian Optical Bench",
        badgeEuee: "EUEE Exam Question Bank",
        telTime: "Time (T)", telRange: "Range (R)", telMaxH: "Max Height (H)",
        telTheta2: "Refracted Angle", telCrit: "Critical Angle",
        telDi: "Image Dist (di)", telMag: "Magnification"
    }
};

const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

// --- NAVIGATION CORE ---
function switchTab(tabId) {
    activeTab = tabId;
    
    // Update Tab Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const targetTab = document.getElementById('tab-' + tabId);
    if(targetTab) targetTab.classList.add('active');

    // Update Panels
    document.querySelectorAll('.console-module').forEach(panel => panel.classList.add('hidden'));
    const targetPanel = document.getElementById('panel-' + tabId);
    if(targetPanel) targetPanel.classList.remove('hidden');

    // Update Badge
    const badgeEl = document.getElementById('canvas-mode-text');
    if(badgeEl) {
        badgeEl.innerText = i18n[currentLang]['badge' + tabId.charAt(0).toUpperCase() + tabId.slice(1)];
    }
    
    updatePhysics();
}

// --- PHYSICS DISPATCHER ---
function updatePhysics() {
    if(!canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (activeTab === 'projectile') renderProjectile();
    if (activeTab === 'refraction') renderSnell();
    if (activeTab === 'lens') renderLens();
    if (activeTab === 'euee') renderEuee();
}

// --- MODULE: PROJECTILE ---
let projT = 0, isFiring = false;
function launchProjectile() { isFiring = true; projT = 0; animateProj(); }
function resetProjectile() { isFiring = false; projT = 0; updatePhysics(); }

function animateProj() {
    if(!isFiring || activeTab !== 'projectile') return;
    projT += 0.05;
    renderProjectile();
    requestAnimationFrame(animateProj);
}

function renderProjectile() {
    const v0 = parseFloat(document.getElementById('sl-v0').value);
    const theta = parseFloat(document.getElementById('sl-theta').value) * Math.PI / 180;
    const h0 = parseFloat(document.getElementById('sl-h0').value);
    const g = 9.8;

    document.getElementById('out-v0').innerText = v0 + " m/s";
    document.getElementById('out-theta').innerText = (theta*180/Math.PI).toFixed(1) + "°";
    document.getElementById('out-h0').innerText = h0 + " m";

    const vx = v0 * Math.cos(theta);
    const vy0 = v0 * Math.sin(theta);
    const tFlight = (vy0 + Math.sqrt(vy0*vy0 + 2*g*h0)) / g;

    if (projT > tFlight) { projT = tFlight; isFiring = false; }

    const curX = vx * projT;
    const curY = h0 + vy0 * projT - 0.5 * g * projT * projT;

    // Draw Ground
    ctx.strokeStyle = "#2f3e58"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(940, 470); ctx.stroke();
    
    // Draw Ball
    ctx.fillStyle = "#00f2fe"; ctx.beginPath(); ctx.arc(50 + curX*2, 470 - curY*2, 8, 0, Math.PI*2); ctx.fill();

    const dict = i18n[currentLang];
    document.getElementById('telemetry-deck').innerHTML = `
        <div class="telemetry-node"><span>${dict.telTime}</span><br><strong>${projT.toFixed(2)}s</strong></div>
        <div class="telemetry-node"><span>${dict.telRange}</span><br><strong>${(vx*tFlight).toFixed(1)}m</strong></div>
    `;
}

// --- MODULE: SNELL ---
function renderSnell() {
    const n1 = parseFloat(document.getElementById('sel-med1').value);
    const n2 = parseFloat(document.getElementById('sel-med2').value);
    const t1 = parseFloat(document.getElementById('sl-theta1').value) * Math.PI / 180;
    document.getElementById('out-theta1').innerText = (t1*180/Math.PI).toFixed(1) + "°";

    const sinT2 = (n1/n2) * Math.sin(t1);
    const isTIR = sinT2 > 1;

    // Draw Boundary
    ctx.fillStyle = "#0a1020"; ctx.fillRect(0,0,940,260);
    ctx.fillStyle = "#0f172a"; ctx.fillRect(0,260,940,260);
    ctx.strokeStyle = "#3b82f6"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0,260); ctx.lineTo(940,260); ctx.stroke();

    // Incident Ray
    ctx.strokeStyle = "#00f2fe"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(470 - 200*Math.sin(t1), 260 - 200*Math.cos(t1)); ctx.lineTo(470, 260); ctx.stroke();

    if(isTIR) {
        ctx.strokeStyle = "#f43f5e";
        ctx.beginPath(); ctx.moveTo(470, 260); ctx.lineTo(470 + 200*Math.sin(t1), 260 - 200*Math.cos(t1)); ctx.stroke();
        document.getElementById('tir-badge').innerText = "TIR ACTIVE";
    } else {
        const t2 = Math.asin(sinT2);
        ctx.strokeStyle = "#10b981";
        ctx.beginPath(); ctx.moveTo(470, 260); ctx.lineTo(470 + 200*Math.sin(t2), 260 + 200*Math.cos(t2)); ctx.stroke();
        document.getElementById('tir-badge').innerText = "REFRACTION";
    }
}

// --- MODULE: LENS ---
function setLensType(type) { 
    lensType = type; 
    document.getElementById('btn-convex').classList.toggle('active', type === 'convex');
    document.getElementById('btn-concave').classList.toggle('active', type === 'concave');
    updatePhysics(); 
}

function renderLens() {
    const fAbs = parseFloat(document.getElementById('sl-focal').value);
    const doDist = parseFloat(document.getElementById('sl-do').value);
    const f = (lensType === 'convex') ? fAbs : -fAbs;
    const di = (f * doDist) / (doDist - f);

    document.getElementById('out-focal').innerText = fAbs + "mm";
    document.getElementById('out-do').innerText = doDist + "mm";

    ctx.strokeStyle = "#475569"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, 260); ctx.lineTo(940, 260); ctx.stroke();
    
    // Lens
    ctx.strokeStyle = "#00f2fe"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(470, 100); ctx.lineTo(470, 420); ctx.stroke();
    
    // Object
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(470 - doDist, 260); ctx.lineTo(470 - doDist, 200); ctx.stroke();
    
    // Image
    if(isFinite(di)) {
        ctx.strokeStyle = "#10b981";
        ctx.beginPath(); ctx.moveTo(470 + di, 260); ctx.lineTo(470 + di, 260 + (di/doDist)*60); ctx.stroke();
    }
}

// --- MODULE: EUEE ---
function renderEuee() {
    const box = document.getElementById('quiz-container');
    if(box) box.innerHTML = "<p style='color:#94a3b8; font-family:monospace;'>EUEE National Exam Question Bank Active.</p>";
}

function toggleLanguage() {
    currentLang = (currentLang === 'om') ? 'en' : 'om';
    const langBtn = document.getElementById('lang-current');
    if(langBtn) langBtn.innerText = (currentLang === 'om') ? 'English' : 'Afaan Oromoo';
    switchTab(activeTab);
}

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
    switchTab('projectile');
});
