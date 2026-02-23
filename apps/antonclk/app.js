// ====== LASCIA IL TUO Graphics.prototype.setFontAnton IDENTICO SOPRA ======

let acc_1, hrm_1, bar_1, mag_1;
let lastValidBPM = 0;

// ------------------------------------------------------------
// Minimal console BPM log (Espruino Console)
// ------------------------------------------------------------
let _lastBpmPrint = 0;
function logBpmThrottled(v) {
  const now = Date.now();
  if (now - _lastBpmPrint < 2000) return; // max ogni 2s
  _lastBpmPrint = now;
  if (!v) return print("[HRM] none");
  print("[HRM] bpm=" + (v.bpm|0) + " conf=" + (v.confidence|0));
}

// ------------------------------------------------------------
// Sleep + worn detection (HRM always ON)
// ------------------------------------------------------------
// States: 0 unknown, 1 not worn, 2 awake, 3 light, 4 deep
let sleepStatus = 0;
let sleepLastEval = 0;

let wornScore = 0;
const WORN_SCORE_MAX = 6;
const WORN_SCORE_MIN_WORN = 2;

const SLEEP_MOV_DEEP = 30;
const SLEEP_MOV_LIGHT = 100;

// lowered threshold so "0 c18" still counts as worn
const HRM_WORN_CONFIDENCE_MIN = 10;

// 16x16 icons
const ICON_MOON_16 = { w: 16, h: 16, bpp: 1, data: new Uint8Array([
  0x00,0x00, 0x03,0x80, 0x0F,0xC0, 0x1F,0xE0,
  0x3E,0x70, 0x3C,0x30, 0x78,0x18, 0x78,0x18,
  0x78,0x18, 0x78,0x18, 0x3C,0x30, 0x3E,0x70,
  0x1F,0xE0, 0x0F,0xC0, 0x03,0x80, 0x00,0x00
])};

const ICON_AWAKE_16 = { w: 16, h: 16, bpp: 1, data: new Uint8Array([
  0x00,0x00, 0x03,0x80, 0x0C,0x60, 0x18,0x30,
  0x30,0x18, 0x60,0x0C, 0x60,0x0C, 0xC0,0x06,
  0xC0,0x06, 0x60,0x0C, 0x60,0x0C, 0x30,0x18,
  0x18,0x30, 0x0C,0x60, 0x03,0x80, 0x00,0x00
])};

function drawSleepIcon() {
  const r = Bangle.appRect;
  const size = 16, pad = 6;
  const x = r.x2 - size - pad;
  const y = r.y2 - size - pad;

  g.clearRect(x - 2, y - 2, x + size + 2, y + size + 2);

  if (sleepStatus === 3 || sleepStatus === 4) {
    g.drawImage(ICON_MOON_16, x, y);
    if (sleepStatus === 4) g.fillCircle(x + 12, y + 4, 2);
  } else if (sleepStatus === 2) {
    g.drawImage(ICON_AWAKE_16, x, y);
  } else if (sleepStatus === 1) {
    g.drawLine(x, y, x + size, y + size);
    g.drawLine(x + size, y, x, y + size);
  } else {
    g.setFont("6x8", 1);
    g.drawString("?", x + 5, y + 2);
  }
}

function updateWornScoreFromHRM() {
  if (Bangle.isCharging()) { wornScore = 0; return; }
  if (!hrm_1) return;

  const bpmOk = hrm_1.bpm > 0;
  const confOk = (hrm_1.confidence | 0) >= HRM_WORN_CONFIDENCE_MIN;
  const ok = bpmOk || confOk;

  wornScore = ok
    ? Math.min(WORN_SCORE_MAX, wornScore + 1)
    : Math.max(0, wornScore - 1);
}

function isWorn() {
  return wornScore >= WORN_SCORE_MIN_WORN;
}

function evaluateSleepStatus() {
  const now = Date.now();
  // ogni 10 minuti (coerente con health event / movement window)
  if (now - sleepLastEval < 10 * 60 * 1000) return;
  sleepLastEval = now;

  if (Bangle.isCharging() || !isWorn()) {
    sleepStatus = 1; // not worn
    return;
  }

  const hs = Bangle.getHealthStatus("day") || {};
  const mv = hs.movement | 0;

  if (mv <= SLEEP_MOV_DEEP) sleepStatus = 4;
  else if (mv <= SLEEP_MOV_LIGHT) sleepStatus = 3;
  else sleepStatus = 2;
}

// ------------------------------------------------------------
// Draw clock (come tuo originale) + icona
// ------------------------------------------------------------
function drawClock() {
  const x = g.getWidth() / 2;
  const y = g.getHeight() / 2;

  g.reset().clearRect(Bangle.appRect);

  const date = new Date();
  const timeStr = require("locale").time(date, 1); // mantiene ":" e locale
  g.setFontAlign(0, 0).setFont("Anton").drawString(timeStr, x, y);

  const dateStr =
    require("locale").date(date, 0).toUpperCase() + "\n" +
    require("locale").dow(date, 0).toUpperCase();

  g.setFontAlign(0, 0).setFont("6x8", 2).drawString(dateStr, x, y + 48);
  g.setFontAlign(0, 0).setFont("6x8", 1.5).drawString(NRF.getAddress(), x, y + 80);

  drawSleepIcon();
}

// ------------------------------------------------------------
// BLE helpers (come tuo originale)
// ------------------------------------------------------------
function toByteArray(value, bytes, signed) {
  if (signed && value < 0) value += 1 << (bytes * 8);
  const arr = [];
  for (let i = 0; i < bytes; i++) arr.push((value >> (i * 8)) & 0xFF);
  return arr;
}

function encodeAcc(data) {
  const x = toByteArray(data.x * 1000, 2, true);
  const y = toByteArray(data.y * 1000, 2, true);
  const z = toByteArray(data.z * 1000, 2, true);
  return [x[0], x[1], y[0], y[1], z[0], z[1]];
}

function encodeMag(data) {
  const x = toByteArray(data.x, 2, true);
  const y = toByteArray(data.y, 2, true);
  const z = toByteArray(data.z, 2, true);
  return [x[0], x[1], y[0], y[1], z[0], z[1]];
}

function updateBLE() {
  NRF.updateServices({
    0x180D: {
      0x2A37: {
        value: [6, hrm_1 && hrm_1.confidence >= 50 ? (hrm_1.bpm > 0 ? hrm_1.bpm : lastValidBPM) : lastValidBPM],
        notify: true
      }
    },
    0x181A: {
      0x2A1F: {
        value: bar_1 ? toByteArray(Math.round(bar_1.temperature * 10), 2, true) : [0, 0],
        notify: true
      },
      0x2AA1: {
        value: mag_1 ? encodeMag(mag_1) : [0, 0, 0, 0, 0, 0],
        notify: true
      }
    },
    "E95D0753251D470AA062FA1922DFA9A8": {
      "E95D0753251D470AA062FA1922DFA9A8": {
        value: acc_1 ? encodeAcc(acc_1) : [0, 0, 0, 0, 0, 0],
        notify: true
      }
    }
  });
}

function setupBLE() {
  NRF.setServices({
    0x180D: { 0x2A37: { value: [6, 0], notify: true, readable: true } },
    0x181A: {
      0x2A1F: { value: [0, 0], notify: true, readable: true },
      0x2AA1: { value: [0, 0, 0, 0, 0, 0], notify: true, readable: true }
    },
    "E95D0753251D470AA062FA1922DFA9A8": {
      "E95D0753251D470AA062FA1922DFA9A8": {
        value: [0, 0, 0, 0, 0, 0],
        notify: true,
        readable: true
      }
    }
  }, { uart: false });
}

// ------------------------------------------------------------
// Sensor cycle (come tuo originale): HRM always ON + bar/compass 5s
// ------------------------------------------------------------
function startSensorCycle() {
  // HRM sempre attivo (come prima)
  if (!Bangle.isHRMOn()) Bangle.setHRMPower(true, "always");

  Bangle.setBarometerPower(true, "cycle");
  Bangle.setCompassPower(true, "cycle");

  setTimeout(() => {
    Bangle.setBarometerPower(false, "cycle");
    Bangle.setCompassPower(false, "cycle");
  }, 5000);
}

// ------------------------------------------------------------
// Listeners
// ------------------------------------------------------------
Bangle.on("HRM", v => {
  if (v && v.confidence >= 50 && v.bpm > 0) lastValidBPM = v.bpm;
  hrm_1 = v;

  logBpmThrottled(v);
  updateWornScoreFromHRM();

  updateBLE();
});

Bangle.on("pressure", v => { bar_1 = v; updateBLE(); });
Bangle.on("mag", v => { mag_1 = v; updateBLE(); });
Bangle.on("accel", v => { acc_1 = v; updateBLE(); });

// ------------------------------------------------------------
// Boot (come tuo originale)
// ------------------------------------------------------------
Bangle.setUI("clock");
Bangle.loadWidgets();

setupBLE();

drawClock();
setTimeout(Bangle.drawWidgets, 0);

// Loop: aggiorna orologio + ciclo sensori (come tuo originale)
setInterval(() => {
  drawClock();
  startSensorCycle();
  updateWornScoreFromHRM();
  evaluateSleepStatus();
}, 10000);
