/**
 * =============================================================================
 * OROMIA STEM SUITE: INTEGRATED PHYSICS & OPTICS WORKBENCH
 * =============================================================================
 * Author: Abdi Gebisa Nagasa (Grade 12 Student Developer & Researcher)
 * School: Ambo University Special Secondary School (AUSSS)
 * Competition: Oromia Education Bureau Innovation Festival 2026
 *
 * Core Curriculum Reference:
 * - Grade 11 Physics (Unit 2: Kinematics & 2D Projectile Motion)
 *   R = (v_0^2 * sin(2θ)) / g, H_max = (v_0^2 * sin^2(θ)) / (2g)
 * - Grade 10 & 11 Physics (Geometric Optics & Wave Refraction)
 *   Snell's Law: n1 * sin(θ1) = n2 * sin(θ2)
 *   Critical Angle: θc = arcsin(n2 / n1) when n1 > n2
 *   Gaussian Thin Lens: 1/f = 1/d_o + 1/d_i => d_i = (d_o * f) / (d_o - f)
 *   Magnification: M = -d_i / d_o
 *
 * Pure Vanilla JavaScript (Client-side Canvas 2D Engine, Zero Dependencies)
 * =============================================================================
 */

'use strict';

// -------------------------------------------------------------
// 1. DUAL LANGUAGE DICTIONARY (Afaan Oromoo & English)
// -------------------------------------------------------------
let currentLang = 'om'; // Default to Afaan Oromoo

const i18n = {
  om: {
    langBtnText: "English",
    appTitle: "Oromia STEM Suite: Kuusaa Fiiziksii fi Optikii",
    appSubtitle: "Mana Barumsaa Bultii Addaa Yuunivarsiitii Amboo • Oromia Education Bureau Innovation Festival",
    devLbl: "Qopheessaan:",
    tabProj: "1. Sochii Pirojektaayilii",
    tabSnell: "2. Seera Isneel & TIR",
    tabLens: "3. Teessoo Leensii Qalloo",
    tabEuee: "4. Shaakala EUEE",
    sysReady: "Mootorri Qophiidha (Lab Engine Active)",
    badgeProj: "Mootora Sochii Pirojektaayilii (2D Kinematics)",
    badgeSnell: "Jal'ina Ifaa fi Reflekshinii Guutuu (Snell's Law & TIR)",
    badgeLens: "Teessoo Leensii Gaawusiyaanii (Gaussian Thin Lens)",
    badgeEuee: "Baankii Gaaffilee Biyyoolessaa EUEE (Grade 10 & 11)",

    // Projectile Module
    projTitle: "Qindaa'ina Pirojektaayilii",
    lblV0: "Saffisa Jalqabaa (v₀):",
    lblTheta: "Kofa Furguggiisaa (θ):",
    lblH0: "Olka'iinsa Masaraa (h₀):",
    lblGravity: "Harkisa Lafaa (g):",
    btnLaunch: "Furguggisi (Launch)",
    btnResetProj: "Haaraa (Clear)",
    projPedTitle: "Hubachiisa Fiiziksii (Grade 11):",
    projPedBody: "Fageenyi furguggiisaa (R) kofa θ = 45° irratti olaanaa ta'a yeroo h₀ = 0 ta'u. Sochiin dalgaa saffisa dhaabbataadha (a_x = 0); sochiin ol-gadii garuu harkisa lafaatiin jijjiirama (a_y = -g).",

    // Projectile Telemetry
    telTime: "Yeroo Balali'iinsaa (T)",
    telRange: "Fageenya Dirree (R)",
    telMaxH: "Olka'iinsa Olaanaa (H_max)",
    telVx: "Saffisa Dalgaa (v_x)",

    // Snell Module
    snellTitle: "Qindaa'ina Jal'ina Ifaa",
    lblMed1: "Giddu-galeessa 1ffaa (Medium 1 - n₁):",
    lblMed2: "Giddu-galeessa 2ffaa (Medium 2 - n₂):",
    lblTheta1: "Kofa Furguggiisaa (θ₁):",
    tirInactive: "CALAQQEE GUUTUU HIN TAANE",
    tirActive: "REFLEKSHINII GUUTUU (TIR ACTIVE)!",
    tirDescInactive: "Ifni meediyama 2ffaatti darbee jal'ateera: n₁·sin(θ₁) = n₂·sin(θ₂).",
    tirDescActive: "Kofni galii kofa murteessaa (θc) caaleera. Ifni hundi 100% calaqqisee deebi'a! Faayibarri optikii kanumaan hojjeta.",
    snellPedTitle: "Ijaarsa Faayibara Optikii:",
    snellPedBody: "Yeroo ifni giddu-galeessa dhangala'oo olaanaa (n₁) irraa gara isa gadii (n₂) darbu, kofni galii kofa murteessaa (θc = arcsin(n₂/n₁)) yoo caale ifti hundi 100% deebi'a (TIR).",
    telTheta2: "Kofa Jal'inaa (θ₂)",
    telCrit: "Kofa Murteessaa (θc)",
    telSpeed: "Saffisa Ifaa (v₂)",
    telRefl: "Calaqqee Fresnel",

    // Lens Module
    lensTitle: "Teessoo Leensii Qalloo",
    lblLensType: "Gosa Leensii (Lens Type):",
    btnConvex: "Bukullee (Convex)",
    btnConcave: "Qoollee (Concave)",
    lblFocal: "Fageenya Fookasii (|f|):",
    lblDo: "Fageenya Wantaa (d_o):",
    lblHo: "Olka'iinsa Wantaa (h_o):",
    lensPedTitle: "Herrega Leensii Gaawusiyaanii:",
    lensPedBody: "1/f = 1/d_o + 1/d_i  =>  d_i = (d_o · f) / (d_o - f)<br>Guddina (Magnification): M = -d_i / d_o = h_i / h_o",
    telDi: "Fageenya Fakkii (dᵢ)",
    telMag: "Guddina Fakkii (M)",
    telNature: "Amala Fakkii",
    realInverted: "Qabatamaa / Garagaltoo",
    virtualUpright: "Fakkaattii / Qajeeltoo",
    infinity: "Waliin Hin Geessu (∞)",

    // EUEE Module
    eueeTitle: "Qormaata EUEE Shaakaluu",
    scoreLbl: "Qabxii Keessan:",
    quizReset: "Irra Deebi'i",
    footerCurriculum: "Silabasii Fiiziksii Kutaa 10 & 11 (Sirna Barnootaa Haarawa Itoophiyaa)"
  },
  en: {
    langBtnText: "Afaan Oromoo",
    appTitle: "Oromia STEM Suite: Physics & Optics Lab",
    appSubtitle: "Ambo University Special Secondary School (AUSSS) • Oromia Education Bureau Innovation Festival",
    devLbl: "Developer:",
    tabProj: "1. Projectile Kinematics",
    tabSnell: "2. Snell's Law & TIR",
    tabLens: "3. Thin Lens Bench",
    tabEuee: "4. EUEE Exam Prep",
    sysReady: "Lab Engine Active & Online",
    badgeProj: "2D Kinematics & Ballistic Trajectory Engine",
    badgeSnell: "Snell's Law of Refraction & Total Internal Reflection (TIR)",
    badgeLens: "Gaussian Optical Bench & Thin Lens Ray Tracer",
    badgeEuee: "EUEE National Exam Questions (Grade 10 & 11 Physics)",

    // Projectile Module
    projTitle: "Projectile Parameters",
    lblV0: "Initial Velocity (v₀):",
    lblTheta: "Launch Angle (θ):",
    lblH0: "Platform Height (h₀):",
    lblGravity: "Gravitational Accel (g):",
    btnLaunch: "Launch Projectile",
    btnResetProj: "Reset Path",
    projPedTitle: "Physics Mechanics Note (Grade 11):",
    projPedBody: "Horizontal range is maximized at θ = 45° over level ground (h₀ = 0). Horizontal velocity is strictly constant (a_x = 0); vertical velocity is accelerated by downward gravity (a_y = -g).",

    // Projectile Telemetry
    telTime: "Time of Flight (T)",
    telRange: "Horizontal Range (R)",
    telMaxH: "Max Altitude (H_max)",
    telVx: "Horizontal Speed (v_x)",

    // Snell Module
    snellTitle: "Refraction Controls",
    lblMed1: "Medium 1 (Incident - n₁):",
    lblMed2: "Medium 2 (Refracted - n₂):",
    lblTheta1: "Incident Angle (θ₁):",
    tirInactive: "PARTIAL REFRACTION ACTIVE",
    tirActive: "TOTAL INTERNAL REFLECTION (TIR)!",
    tirDescInactive: "Light refracts into Medium 2 according to Snell's Law: n₁·sin(θ₁) = n₂·sin(θ₂).",
    tirDescActive: "Incident angle exceeds the critical angle (θc). 100% of the light reflects internally. This is the bedrock of fiber optic telecommunications.",
    snellPedTitle: "Fiber Optics & Wave Guides:",
    snellPedBody: "When propagating from a denser medium (n₁) toward a rarer medium (n₂), angles beyond critical angle θc = arcsin(n₂/n₁) undergo zero transmission and 100% internal reflection.",
    telTheta2: "Refracted Angle (θ₂)",
    telCrit: "Critical Angle (θc)",
    telSpeed: "Speed in Med 2 (v₂)",
    telRefl: "Fresnel Reflectance",

    // Lens Module
    lensTitle: "Thin Lens Bench Controls",
    lblLensType: "Lens Geometry:",
    btnConvex: "Convex (Converging)",
    btnConcave: "Concave (Diverging)",
    lblFocal: "Focal Length (|f|):",
    lblDo: "Object Distance (d_o):",
    lblHo: "Object Height (h_o):",
    lensPedTitle: "Gaussian Thin Lens Formulation:",
    lensPedBody: "1/f = 1/d_o + 1/d_i  =>  d_i = (d_o · f) / (d_o - f)<br>Magnification: M = -d_i / d_o = h_i / h_o",
    telDi: "Image Distance (dᵢ)",
    telMag: "Magnification (M)",
    telNature: "Image Character",
    realInverted: "Real & Inverted",
    virtualUpright: "Virtual & Upright",
    infinity: "At Infinity (Parallel)",

    // EUEE Module
    eueeTitle: "EUEE Exam Simulation Bank",
    scoreLbl: "Your Score:",
    quizReset: "Reset Exam Quiz",
    footerCurriculum: "Ethiopian National Grade 10 & 11 Physics Syllabus"
  }
};

// -------------------------------------------------------------
// 2. EUEE NATIONAL EXAM QUESTION REPOSITORY
// -------------------------------------------------------------
const eueeQuestions = [
  {
    badge: "EUEE 2011 E.C. (Grade 11 Kinematics)",
    q_om: "Kubbaan tokko saffisa jalqabaa 20 m/s fi kofa 30° dachee irraa furguggifame. Yeroo hammamii booda kubbaan kun olka'iinsa isa olaanaa (maximum height) ga'a? (g = 10 m/s² fayyadamaa)",
    q_en: "A projectile is launched from ground level with initial velocity 20 m/s at an angle of 30° above horizontal. What is the time required to reach maximum altitude? (Use g = 10 m/s²)",
    options: ["1.0 s", "2.0 s", "0.5 s", "1.73 s"],
    correct: 0,
    solution: "v_y = v_0*sin(θ) - g*t = 0 => t = (20 * sin 30°) / 10 = (20 * 0.5) / 10 = 1.0 s"
  },
  {
    badge: "EUEE 2013 E.C. (Grade 10 Refraction)",
    q_om: "Ifni gilaasii (n₁ = 1.50) keessaa gara qilleensaa (n₂ = 1.00) yoo darbu, kofni murteessaa (critical angle - θc) meeqa ta'a?",
    q_en: "Light travels from crown glass (n₁ = 1.50) into air (n₂ = 1.00). What is the critical angle for Total Internal Reflection (TIR)?",
    options: ["41.8°", "48.6°", "30.0°", "90.0°"],
    correct: 0,
    solution: "sin(θc) = n2 / n1 = 1.00 / 1.50 = 0.6667 => θc = arcsin(0.6667) ≈ 41.8°"
  },
  {
    badge: "EUEE 2014 E.C. (Grade 10 Thin Lens)",
    q_om: "Wanti tokko fageenya 30 cm irratti leensii bukullee (convex lens) dheerinni fookasii isaa f = 20 cm ta'e fuuldura kaa'ame. Fageenyi fakkii (d_i) meeqa ta'a?",
    q_en: "An object is placed 30 cm in front of a convex converging lens with focal length f = 20 cm. What is the image distance (d_i)?",
    options: ["+60 cm (Qabatamaa)", "+12 cm", "-60 cm (Fakkaattii)", "+10 cm"],
    correct: 0,
    solution: "1/d_i = 1/f - 1/d_o = 1/20 - 1/30 = (3 - 2)/60 = 1/60 => d_i = +60 cm (Real)"
  },
  {
    badge: "EUEE 2015 E.C. (Grade 11 Two-Dimensional Motion)",
    q_om: "Kofa furguggiisaa (θ) kam irratti fageenyi dalgaa (horizontal range - R) fi olka'iinsi olaanaan (H_max) wal-qixa ta'u yoo h₀ = 0 ta'e?",
    q_en: "At what launch angle (θ) is the horizontal range equal to the maximum height of a projectile fired from level ground (h₀ = 0)?",
    options: ["45°", "60°", "76° (tan θ = 4)", "30°"],
    correct: 2,
    solution: "R = (v₀² sin 2θ)/g and H = (v₀² sin² θ)/(2g). Setting R = H gives 2 sin θ cos θ = sin² θ / 2 => tan θ = 4 => θ ≈ 75.96° ≈ 76°"
  }
];

// -------------------------------------------------------------
// 3. UNIFIED GLOBAL APPLICATION STATE
// -------------------------------------------------------------
const state = {
  activeTab: 'projectile',

  // Projectile Kinematics
  projectile: {
    v0: 40,
    thetaDeg: 45,
    h0: 0,
    g: 9.80,
    isFiring: false,
    t: 0,
    trajHistory: []
  },

  // Snell's Law & Refraction
  refraction: {
    n1: 1.0003, // Air
    n2: 1.3330, // Water
    theta1Deg: 45.0,
    laserRadius: 210,
    isDragging: false
  },

  // Thin Lens Optical Bench
  lens: {
    type: 'convex',
    f: 110,
    d_o: 220,
    h_o: 65,
    isDragging: false
  },

  // EUEE Quiz
  quiz: {
    answers: {},
    score: 0
  }
};

const SPEED_OF_LIGHT = 299792458; // m/s

// Canvas Reference
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
const telemetryDeck = document.getElementById('telemetry-deck');

// -------------------------------------------------------------
// 4. BILINGUAL LANGUAGE ENGINE
// -------------------------------------------------------------
function applyLanguage(lang) {
  currentLang = lang;
  const dict = i18n[lang];

  document.getElementById('lang-current').textContent = dict.langBtnText;
  document.getElementById('app-title').textContent = dict.appTitle;
  document.getElementById('app-subtitle').textContent = dict.appSubtitle;
  document.getElementById('dev-lbl').textContent = dict.devLbl;
  document.getElementById('tab-lbl-proj').textContent = dict.tabProj;
  document.getElementById('tab-lbl-snell').textContent = dict.tabSnell;
  document.getElementById('tab-lbl-lens').textContent = dict.tabLens;
  document.getElementById('tab-lbl-euee').textContent = dict.tabEuee;
  document.getElementById('sys-status-text').textContent = dict.sysReady;

  // Projectile
  document.getElementById('proj-panel-title').textContent = dict.projTitle;
  document.getElementById('lbl-v0').textContent = dict.lblV0;
  document.getElementById('lbl-theta').textContent = dict.lblTheta;
  document.getElementById('lbl-h0').textContent = dict.lblH0;
  document.getElementById('lbl-gravity').textContent = dict.lblGravity;
  document.getElementById('lbl-btn-launch').textContent = dict.btnLaunch;
  document.getElementById('lbl-btn-reset-proj').textContent = dict.btnResetProj;
  document.getElementById('proj-pedagogy-title').textContent = dict.projPedTitle;
  document.getElementById('proj-pedagogy-body').textContent = dict.projPedBody;

  // Snell
  document.getElementById('snell-panel-title').textContent = dict.snellTitle;
  document.getElementById('lbl-med1').textContent = dict.lblMed1;
  document.getElementById('lbl-med2').textContent = dict.lblMed2;
  document.getElementById('lbl-theta1').textContent = dict.lblTheta1;
  document.getElementById('snell-pedagogy-title').textContent = dict.snellPedTitle;
  document.getElementById('snell-pedagogy-body').textContent = dict.snellPedBody;

  // Lens
  document.getElementById('lens-panel-title').textContent = dict.lensTitle;
  document.getElementById('lbl-lens-type').textContent = dict.lblLensType;
  document.getElementById('btn-convex').textContent = dict.btnConvex;
  document.getElementById('btn-concave').textContent = dict.btnConcave;
  document.getElementById('lbl-focal').textContent = dict.lblFocal;
  document.getElementById('lbl-do').textContent = dict.lblDo;
  document.getElementById('lbl-ho').textContent = dict.lblHo;
  document.getElementById('lens-pedagogy-title').textContent = dict.lensPedTitle;
  document.getElementById('lens-pedagogy-body').innerHTML = dict.lensPedBody;

  // EUEE
  document.getElementById('euee-panel-title').textContent = dict.eueeTitle;
  document.getElementById('score-label').textContent = dict.scoreLbl;
  document.getElementById('lbl-quiz-reset').textContent = dict.quizReset;
  document.getElementById('footer-curriculum').textContent = dict.footerCurriculum;

  updateBadgeText();
  renderActiveView();
  renderQuiz();
}

function updateBadgeText() {
  const badgeEl = document.getElementById('canvas-mode-text');
  const dict = i18n[currentLang];
  if (state.activeTab === 'projectile') badgeEl.textContent = dict.badgeProj;
  else if (state.activeTab === 'refraction') badgeEl.textContent = dict.badgeSnell;
  else if (state.activeTab === 'lens') badgeEl.textContent = dict.badgeLens;
  else badgeEl.textContent = dict.badgeEuee;
}

document.getElementById('lang-toggle-btn').addEventListener('click', () => {
  applyLanguage(currentLang === 'om' ? 'en' : 'om');
});

// -------------------------------------------------------------
// 5. TECHNICAL TAB DISPATCHER
// -------------------------------------------------------------
function switchTab(tabId) {
  state.activeTab = tabId;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  document.querySelectorAll('.console-module').forEach(panel => {
    panel.classList.add('hidden');
  });

  document.getElementById(`panel-${tabId}`).classList.remove('hidden');

  updateBadgeText();
  renderActiveView();
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
});

// -------------------------------------------------------------
// 6. MODULE 1: PROJECTILE MOTION ENGINE
// -------------------------------------------------------------
const slV0 = document.getElementById('sl-v0');
const slTheta = document.getElementById('sl-theta');
const slH0 = document.getElementById('sl-h0');
const selGravity = document.getElementById('sel-gravity');

function readProjectileInputs() {
  state.projectile.v0 = parseFloat(slV0.value);
  state.projectile.thetaDeg = parseFloat(slTheta.value);
  state.projectile.h0 = parseFloat(slH0.value);
  state.projectile.g = parseFloat(selGravity.value);

  document.getElementById('out-v0').textContent = `${state.projectile.v0} m/s`;
  document.getElementById('out-theta').textContent = `${state.projectile.thetaDeg.toFixed(1)}°`;
  document.getElementById('out-h0').textContent = `${state.projectile.h0} m`;
}

[slV0, slTheta, slH0, selGravity].forEach(ctrl => {
  ctrl.addEventListener('input', () => {
    readProjectileInputs();
    if (!state.projectile.isFiring) {
      computeProjectileTelemetry();
      drawProjectileScene();
    }
  });
});

document.getElementById('btn-launch-proj').addEventListener('click', () => {
  readProjectileInputs();
  state.projectile.isFiring = true;
  state.projectile.t = 0;
  state.projectile.trajHistory = [];
  runProjectileLoop();
});

document.getElementById('btn-reset-proj').addEventListener('click', () => {
  state.projectile.isFiring = false;
  state.projectile.t = 0;
  state.projectile.trajHistory = [];
  computeProjectileTelemetry();
  drawProjectileScene();
});

function computeProjectileTelemetry() {
  const { v0, thetaDeg, h0, g } = state.projectile;
  const thetaRad = (thetaDeg * Math.PI) / 180;
  const v0x = v0 * Math.cos(thetaRad);
  const v0y = v0 * Math.sin(thetaRad);

  const discr = v0y * v0y + 2 * g * h0;
  const tFlight = (v0y + Math.sqrt(discr)) / g;
  const maxH = h0 + (v0y * v0y) / (2 * g);
  const range = v0x * tFlight;

  const dict = i18n[currentLang];
  telemetryDeck.innerHTML = `
    <div class="telemetry-node">
      <span class="telemetry-lbl">${dict.telTime}</span>
      <span class="telemetry-val cyan">${tFlight.toFixed(2)} s</span>
    </div>
    <div class="telemetry-node">
      <span class="telemetry-lbl">${dict.telRange}</span>
      <span class="telemetry-val emerald">${range.toFixed(1)} m</span>
    </div>
    <div class="telemetry-node">
      <span class="telemetry-lbl">${dict.telMaxH}</span>
      <span class="telemetry-val amber">${maxH.toFixed(1)} m</span>
    </div>
    <div class="telemetry-node">
      <span class="telemetry-lbl">${dict.telVx}</span>
      <span class="telemetry-val">${v0x.toFixed(1)} m/s</span>
    </div>
  `;

  return { tFlight, maxH, range, v0x, v0y };
}

function runProjectileLoop() {
  if (!state.projectile.isFiring || state.activeTab !== 'projectile') return;

  const { v0, thetaDeg, h0, g } = state.projectile;
  const thetaRad = (thetaDeg * Math.PI) / 180;
  const v0x = v0 * Math.cos(thetaRad);
  const v0y = v0 * Math.sin(thetaRad);

  const tFlight = (v0y + Math.sqrt(v0y * v0y + 2 * g * h0)) / g;
  state.projectile.t += 0.045;

  if (state.projectile.t >= tFlight) {
    state.projectile.t = tFlight;
    state.projectile.isFiring = false;
  }

  const curX = v0x * state.projectile.t;
  const curY = h0 + v0y * state.projectile.t - 0.5 * g * state.projectile.t * state.projectile.t;
  state.projectile.trajHistory.push({ x: curX, y: Math.max(0, curY) });

  drawProjectileScene(curX, Math.max(0, curY), v0x, v0y - g * state.projectile.t);

  if (state.projectile.isFiring) {
    requestAnimationFrame(runProjectileLoop);
  }
}

function drawProjectileScene(curX = null, curY = null, vx = null, vy = null) {
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const stats = computeProjectileTelemetry();
  const groundY = H - 55;
  const originX = 75;

  const safeRange = Math.max(80, stats.range * 1.15);
  const safeHeight = Math.max(45, stats.maxH * 1.25);
  const scaleX = (W - 140) / safeRange;
  const scaleY = (groundY - 70) / safeHeight;

  // Ground & Grid
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, groundY, W, H - groundY);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(W, groundY)
