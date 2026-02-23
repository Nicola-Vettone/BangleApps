// antonclk/app.js
// Bangle.js 2 clock + BLE sensors + in-app sleep icon (no SleepLog)
// Fixes:
// - HH:MM always shown with ":" centered
// - Local time Europe/Rome (CET/CEST) even if device time is UTC
// - Sleep icon bottom-right (X=not worn, O=awake, moon=sleep, moon+dot=deep)
// - No sleep data sent over BLE

// Clock with large digits using the "Anton" bold font
Graphics.prototype.setFontAnton = function (scale) {
  g.setFontCustom(
    atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAA/gAAAAAAAAAAP/gAAAAAAAAAH//gAAAAAAAAB///gAAAAAAAAf///gAAAAAAAP////gAAAAAAD/////gAAAAAA//////gAAAAAP//////gAAAAH///////gAAAB////////gAAAf////////gAAP/////////gAD//////////AA//////////gAA/////////4AAA////////+AAAA////////gAAAA///////wAAAAA//////8AAAAAA//////AAAAAAA/////gAAAAAAA////4AAAAAAAA///+AAAAAAAAA///gAAAAAAAAA//wAAAAAAAAAA/8AAAAAAAAAAA/AAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////AAAAAB///////8AAAAH////////AAAAf////////wAAA/////////4AAB/////////8AAD/////////+AAH//////////AAP//////////gAP//////////gAP//////////gAf//////////wAf//////////wAf//////////wAf//////////wA//8AAAAAB//4A//wAAAAAAf/4A//gAAAAAAP/4A//gAAAAAAP/4A//gAAAAAAP/4A//wAAAAAAf/4A///////////4Af//////////wAf//////////wAf//////////wAf//////////wAP//////////gAP//////////gAH//////////AAH//////////AAD/////////+AAB/////////8AAA/////////4AAAP////////gAAAD///////+AAAAAf//////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gAAAAAAAAAAP/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/AAAAAAAAAAA//AAAAAAAAAAA/+AAAAAAAAAAB/8AAAAAAAAAAD//////////gAH//////////gAP//////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/4AAAAB/gAAD//4AAAAf/gAAP//4AAAB//gAA///4AAAH//gAB///4AAAf//gAD///4AAA///gAH///4AAD///gAP///4AAH///gAP///4AAP///gAf///4AAf///gAf///4AB////gAf///4AD////gA////4AH////gA////4Af////gA////4A/////gA//wAAB/////gA//gAAH/////gA//gAAP/////gA//gAA///8//gA//gAD///w//gA//wA////g//gA////////A//gA///////8A//gA///////4A//gAf//////wA//gAf//////gA//gAf/////+AA//gAP/////8AA//gAP/////4AA//gAH/////gAA//gAD/////AAA//gAB////8AAA//gAA////wAAA//gAAP///AAAA//gAAD//8AAAA//gAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/+AAAAAD/wAAB//8AAAAP/wAAB///AAAA//wAAB///wAAB//wAAB///4AAD//wAAB///8AAH//wAAB///+AAP//wAAB///+AAP//wAAB////AAf//wAAB////AAf//wAAB////gAf//wAAB////gA///wAAB////gA///wAAB////gA///w//AAf//wA//4A//AAA//wA//gA//AAAf/wA//gB//gAAf/wA//gB//gAAf/wA//gD//wAA//wA//wH//8AB//wA///////////gA///////////gA///////////gA///////////gAf//////////AAf//////////AAP//////////AAP/////////+AAH/////////8AAH///+/////4AAD///+f////wAAA///8P////gAAAf//4H///+AAAAH//gB///wAAAAAP4AAH/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
    46,
    atob("EiAnGicnJycnJycnEw=="),
    78 + (scale << 8) + (1 << 16)
  );
};

// ---------------------------
// Sensors + BLE (tuo codice)
// ---------------------------
let acc_1, hrm_1, bar_1, mag_1;
let lastValidBPM = 0;

// ---------------------------
// Local time Europe/Rome (CET/CEST) even if watch is UTC
// ---------------------------
function _lastSundayOfMonthUTC(year, month0) {
  // last day of month at 01:00 UTC
  const d = new Date(Date.UTC(year, month0 + 1, 0, 1, 0, 0));
  const dow = d.getUTCDay(); // 0=Sun
  d.setUTCDate(d.getUTCDate() - dow);
  return d;
}
function _romeOffsetMinutes(utcDate) {
  const y = utcDate.getUTCFullYear();
  const start = _lastSundayOfMonthUTC(y, 2); // March
  const end = _lastSundayOfMonthUTC(y, 9);   // October
  const t = utcDate.getTime();
  const inDST = (t >= start.getTime()) && (t < end.getTime());
  return inDST ? 120 : 60;
}
function _romeNowDate() {
  const nowUtc = new Date();
  const offMin = _romeOffsetMinutes(nowUtc);
  return new Date(nowUtc.getTime() + offMin * 60000);
}

// ---------------------------
// Sleep detection (in-app)
// ---------------------------
// States: 0 unknown, 1 not worn, 2 awake, 3 light, 4 deep
let sleepStatus = 0;
let sleepLastEval = 0;

// Debounce "worn" detection to avoid X flicker
let wornScore = 0;
const WORN_SCORE_MAX = 6;
const WORN_SCORE_MIN_WORN = 2;

// thresholds (tunable)
const SLEEP_MOV_DEEP = 30;
const SLEEP_MOV_LIGHT = 100;
const HRM_WORN_CONFIDENCE_MIN = 35;

// 16x16 icons
const ICON_MOON_16 = { w:16,h:16,bpp:1, data:new Uint8Array([
  0x00,0x00, 0x03,0x80, 0x0F,0xC0, 0x1F,0xE0,
  0x3E,0x70, 0x3C,0x30, 0x78,0x18, 0x78,0x18,
  0x78,0x18, 0x78,0x18, 0x3C,0x30, 0x3E,0x70,
  0x1F,0xE0, 0x0F,0xC0, 0x03,0x80, 0x00,0x00
])};
const ICON_AWAKE_16 = { w:16,h:16,bpp:1, data:new Uint8Array([
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
    g.drawString("?", x + 5, y + 2);
  }
}

function updateWornScoreFromHRM() {
  if (Bangle.isCharging()) { wornScore = 0; return; }
  const ok = !!(hrm_1 && hrm_1.confidence >= HRM_WORN_CONFIDENCE_MIN);
  wornScore = ok
    ? Math.min(WORN_SCORE_MAX, wornScore + 1)
    : Math.max(0, wornScore - 1);
}
function isWorn() {
  return wornScore >= WORN_SCORE_MIN_WORN;
}

function evaluateSleepStatus() {
  const now = Date.now();
  if (now - sleepLastEval < 10 * 60 * 1000) return;
  sleepLastEval = now;

  if (Bangle.isCharging() || !isWorn()) { sleepStatus = 1; return; }

  const hs = Bangle.getHealthStatus("day") || {};
  const mv = hs.movement | 0;

  if (mv <= SLEEP_MOV_DEEP) sleepStatus = 4;
  else if (mv <= SLEEP_MOV_LIGHT) sleepStatus = 3;
  else sleepStatus = 2;
}

// ---------------------------
// UI Clock
// ---------------------------
function drawClock() {
  try {
    const x = g.getWidth() / 2;
    const y = g.getHeight() / 2;

    g.reset().clearRect(Bangle.appRect);

    // ✅ Force Europe/Rome display time
    const date = _romeNowDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const hh = (h < 10 ? "0" : "") + h;
    const mm = (m < 10 ? "0" : "") + m;

    g.setFontAlign(0, 0);

    // HH and MM using Anton
    g.setFontAnton(1);
    g.drawString(hh, x - 26, y);
    g.drawString(mm, x + 26, y);

    // ":" centered, always visible, drawn last
    g.clearRect(x - 6, y - 18, x + 6, y + 18);
    g.setFont("6x8", 2);
    g.drawString(":", x, y);

    // Date + DOW
    const dateStr =
      require("locale").date(date, 0).toUpperCase() + "\n" +
      require("locale").dow(date, 0).toUpperCase();
    g.setFontAlign(0, 0).setFont("6x8", 2).drawString(dateStr, x, y + 48);

    // MAC
    g.setFontAlign(0, 0).setFont("6x8", 1).drawString(NRF.getAddress(), x, y + 80);

    drawSleepIcon();
  } catch (e) {
    g.reset().clearRect(Bangle.appRect);
    g.setFont("6x8", 2).setFontAlign(0, 0);
    g.drawString("ERR", g.getWidth() / 2, g.getHeight() / 2);
  }
}

// ---------------------------
// Encoding helpers (tuo codice)
// ---------------------------
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

// ---------------------------
// BLE (tuo codice)
// ---------------------------
function updateBLE() {
  NRF.updateServices({
    0x180D: {
      0x2A37: {
        value: [6, (hrm_1 && hrm_1.confidence >= 50 && hrm_1.bpm > 0) ? hrm_1.bpm : lastValidBPM],
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

// ---------------------------
// Sensor cycle (tuo codice)
// ---------------------------
function startSensorCycle() {
  // HRM always on
  if (!Bangle.isHRMOn()) Bangle.setHRMPower(true, "always");

  // Barometer + compass on for 5s every 10s
  Bangle.setBarometerPower(true, "cycle");
  Bangle.setCompassPower(true, "cycle");
  setTimeout(() => {
    Bangle.setBarometerPower(false, "cycle");
    Bangle.setCompassPower(false, "cycle");
  }, 5000);
}

// ---------------------------
// Event listeners
// ---------------------------
Bangle.on("HRM", v => {
  if (v && v.confidence >= 50 && v.bpm > 0) lastValidBPM = v.bpm;
  hrm_1 = v;
  updateWornScoreFromHRM();
  updateBLE();
});
Bangle.on("pressure", v => { bar_1 = v; updateBLE(); });
Bangle.on("mag", v => { mag_1 = v; updateBLE(); });
Bangle.on("accel", v => { acc_1 = v; updateBLE(); });

// ---------------------------
// Boot
// ---------------------------
Bangle.setUI("clock");
Bangle.loadWidgets();
setupBLE();

updateWornScoreFromHRM();
evaluateSleepStatus();
drawClock();
setTimeout(Bangle.drawWidgets, 0);

setInterval(() => {
  updateWornScoreFromHRM();
  evaluateSleepStatus();
  drawClock();
  startSensorCycle();
}, 10000);
