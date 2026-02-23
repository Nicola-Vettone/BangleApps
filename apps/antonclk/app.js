// Clock with large digits using the "Anton" bold font
Graphics.prototype.setFontAnton = function (scale) {
  // Actual height 69 (68 - 0)
  g.setFontCustom(
    atob(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAA/gAAAAAAAAAAP/gAAAAAAAAAH//gAAAAAAAAB///gAAAAAAAAf///gAAAAAAAP////gAAAAAAD/////gAAAAAA//////gAAAAAP//////gAAAAH///////gAAAB////////gAAAf////////gAAP/////////gAD//////////AA//////////gAA/////////4AAA////////+AAAA////////gAAAA///////wAAAAA//////8AAAAAA//////AAAAAAA/////gAAAAAAA////4AAAAAAAA///+AAAAAAAAA///gAAAAAAAAA//wAAAAAAAAAA/8AAAAAAAAAAA/AAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////AAAAAB///////8AAAAH////////AAAAf////////wAAA/////////4AAB/////////8AAD/////////+AAH//////////AAP//////////gAP//////////gAP//////////gAf//////////wAf//////////wAf//////////wAf//////////wA//8AAAAAB//4A//wAAAAAAf/4A//gAAAAAAP/4A//gAAAAAAP/4A//gAAAAAAP/4A//wAAAAAAf/4A///////////4Af//////////wAf//////////wAf//////////wAf//////////wAP//////////gAP//////////gAH//////////AAH//////////AAD/////////+AAB/////////8AAA/////////4AAAP////////gAAAD///////+AAAAAf//////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gAAAAAAAAAAP/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/AAAAAAAAAAA//AAAAAAAAAAA/+AAAAAAAAAAB/8AAAAAAAAAAD//////////gAH//////////gAP//////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/4AAAAB/gAAD//4AAAAf/gAAP//4AAAB//gAA///4AAAH//gAB///4AAAf//gAD///4AAA///gAH///4AAD///gAP///4AAH///gAP///4AAP///gAf///4AAf///gAf///4AB////gAf///4AD////gA////4AH////gA////4Af////gA////4A/////gA//wAAB/////gA//gAAH/////gA//gAAP/////gA//gAA///8//gA//gAD///w//gA//wA////g//gA////////A//gA///////8A//gA///////4A//gAf//////wA//gAf//////gA//gAf/////+AA//gAP/////8AA//gAP/////4AA//gAH/////gAA//gAD/////AAA//gAB////8AAA//gAA////wAAA//gAAP///AAAA//gAAD//8AAAA//gAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/+AAAAAD/wAAB//8AAAAP/wAAB///AAAA//wAAB///wAAB//wAAB///4AAD//wAAB///8AAH//wAAB///+AAP//wAAB///+AAP//wAAB////AAf//wAAB////AAf//wAAB////gAf//wAAB////gA///wAAB////gA///wAAB////gA///w//AAf//wA//4A//AAA//wA//gA//AAAf/wA//gB//gAAf/wA//gB//gAAf/wA//gD//wAA//wA//wH//8AB//wA///////////gA///////////gA///////////gA///////////gAf//////////AAf//////////AAP//////////AAP/////////+AAH/////////8AAH///+/////4AAD///+f////wAAA///8P////gAAAf//4H///+AAAAH//gB///wAAAAAP4AAH/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAA//wAAAAAAAAAP//wAAAAAAAAB///wAAAAAAAAf///wAAAAAAAH////wAAAAAAA/////wAAAAAAP/////wAAAAAB//////wAAAAAf//////wAAAAH///////wAAAA////////wAAAP////////wAAA///////H/wAAA//////wH/wAAA/////8AH/wAAA/////AAH/wAAA////gAAH/wAAA///4AAAH/wAAA//+AAAAH/wAAA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gAAAAAAAAH/4AAAAAAAAAAH/wAAAAAAAAAAH/wAAAAAAAAAAH/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8AAA/////+B///AAA/////+B///wAA/////+B///4AA/////+B///8AA/////+B///8AA/////+B///+AA/////+B////AA/////+B////AA/////+B////AA/////+B////gA/////+B////gA/////+B////gA/////+A////gA//gP/gAAB//wA//gf/AAAA//wA//gf/AAAAf/wA//g//AAAAf/wA//g//AAAA//wA//g//gAAA//wA//g//+AAP//wA//g////////gA//g////////gA//g////////gA//g////////gA//g////////AA//gf///////AA//gf//////+AA//gP//////+AA//gH//////8AA//gD//////4AA//gB//////wAA//gA//////AAAAAAAH////8AAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////gAAAAB///////+AAAAH////////gAAAf////////4AAB/////////8AAD/////////+AAH//////////AAH//////////gAP//////////gAP//////////gAf//////////wAf//////////wAf//////////wAf//////////wAf//////////4A//wAD/4AAf/4A//gAH/wAAP/4A//gAH/wAAP/4A//gAP/wAAP/4A//gAP/4AAf/4A//wAP/+AD//4A///wP//////4Af//4P//////wAf//4P//////wAf//4P//////wAf//4P//////wAP//4P//////gAP//4H//////gAH//4H//////AAH//4D/////+AAD//4D/////8AAB//4B/////4AAA//4A/////wAAAP/4AP////AAAAB/4AD///4AAAAAAAAAH/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAA//gAAAAAAAAAA//gAAAAAAAAAA//gAAAAAAADgA//gAAAAAAP/gA//gAAAAAH//gA//gAAAAB///gA//gAAAAP///gA//gAAAD////gA//gAAAf////gA//gAAB/////gA//gAAP/////gA//gAB//////gA//gAH//////gA//gA///////gA//gD///////gA//gf///////gA//h////////gA//n////////gA//////////gAA/////////AAAA////////wAAAA///////4AAAAA///////AAAAAA//////4AAAAAA//////AAAAAAA/////4AAAAAAA/////AAAAAAAA////8AAAAAAAA////gAAAAAAAA///+AAAAAAAAA///4AAAAAAAAA///AAAAAAAAAA//4AAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//gB///wAAAAP//4H///+AAAA///8P////gAAB///+f////4AAD///+/////8AAH/////////+AAH//////////AAP//////////gAP//////////gAf//////////gAf//////////wAf//////////wAf//////////wA///////////wA//4D//wAB//4A//wB//gAA//4A//gA//gAAf/4A//gA//AAAf/4A//gA//gAAf/4A//wB//gAA//4A///P//8AH//4Af//////////wAf//////////wAf//////////wAf//////////wAf//////////gAP//////////gAP//////////AAH//////////AAD/////////+AAD///+/////8AAB///8f////wAAAf//4P////AAAAH//wD///8AAAAA/+AAf//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//gAAAAAAAAB///+AA/+AAAAP////gA//wAAAf////wA//4AAB/////4A//8AAD/////8A//+AAD/////+A///AAH/////+A///AAP//////A///gAP//////A///gAf//////A///wAf//////A///wAf//////A///wAf//////A///wA///////AB//4A//4AD//AAP/4A//gAB//AAP/4A//gAA//AAP/4A//gAA/+AAP/4A//gAB/8AAP/4A//wAB/8AAf/4Af//////////wAf//////////wAf//////////wAf//////////wAf//////////wAP//////////gAP//////////gAH//////////AAH/////////+AAD/////////8AAB/////////4AAAf////////wAAAP////////AAAAB///////4AAAAAD/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AAB/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAA//AAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
    ),
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
// Sleep detection (in-app)
// ---------------------------
// Stati: 0 unknown, 1 not worn, 2 awake, 3 light, 4 deep
let sleepStatus = 0;
let sleepLastEval = 0;

// Soglie MOVEMENT (TARABILI!)
const SLEEP_MOV_DEEP = 30;
const SLEEP_MOV_LIGHT = 100;

// Se HRM confidence è bassa, assumo "non indossato"
const HRM_WORN_CONFIDENCE_MIN = 40;

// Icone 16x16 (disegnate in overlay)
const ICON_MOON_16 = {
  w: 16,
  h: 16,
  bpp: 1,
  data: new Uint8Array([
    0x00, 0x00, 0x03, 0x80, 0x0F, 0xC0, 0x1F, 0xE0, 0x3E, 0x70, 0x3C, 0x30,
    0x78, 0x18, 0x78, 0x18, 0x78, 0x18, 0x78, 0x18, 0x3C, 0x30, 0x3E, 0x70,
    0x1F, 0xE0, 0x0F, 0xC0, 0x03, 0x80, 0x00, 0x00
  ])
};

const ICON_AWAKE_16 = {
  w: 16,
  h: 16,
  bpp: 1,
  data: new Uint8Array([
    0x00, 0x00, 0x03, 0x80, 0x0C, 0x60, 0x18, 0x30, 0x30, 0x18, 0x60, 0x0C,
    0x60, 0x0C, 0xC0, 0x06, 0xC0, 0x06, 0x60, 0x0C, 0x60, 0x0C, 0x30, 0x18,
    0x18, 0x30, 0x0C, 0x60, 0x03, 0x80, 0x00, 0x00
  ])
};

function drawSleepIcon() {
  // area "sicura" dell'app (evita widget topbar)
  const r = Bangle.appRect;
  const size = 16;
  const pad = 6;
  const x = r.x2 - size - pad;
  const y = r.y + pad;

  // pulisco solo l’area icona
  g.clearRect(x - 2, y - 2, x + size + 2, y + size + 2);

  if (sleepStatus === 3 || sleepStatus === 4) {
    g.drawImage(ICON_MOON_16, x, y);
    // deep: puntino (così distingui light vs deep)
    if (sleepStatus === 4) g.fillCircle(x + 12, y + 4, 2);
  } else if (sleepStatus === 2) {
    g.drawImage(ICON_AWAKE_16, x, y);
  } else if (sleepStatus === 1) {
    // not worn: X
    g.drawLine(x, y, x + size, y + size);
    g.drawLine(x + size, y, x, y + size);
  } else {
    g.drawString("?", x + 5, y + 2);
  }
}

function evaluateSleepStatus() {
  // valutazione ogni 10 minuti
  const now = Date.now();
  if (now - sleepLastEval < 10 * 60 * 1000) return;
  sleepLastEval = now;

  // 1) se in carica -> not worn
  if (Bangle.isCharging()) {
    sleepStatus = 1;
    return;
  }

  // 2) se HRM non "vede" polso -> not worn
  const wornByHRM = !!(hrm_1 && hrm_1.confidence >= HRM_WORN_CONFIDENCE_MIN);
  if (!wornByHRM) {
    sleepStatus = 1;
    return;
  }

  // 3) movement-based (aggregato) -> deep/light/awake
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
  const x = g.getWidth() / 2;
  const y = g.getHeight() / 2;

  g.reset().clearRect(Bangle.appRect);

  const date = new Date();
  const timeStr = require("locale").time(date, 1);
  g.setFontAlign(0, 0).setFont("Anton").drawString(timeStr, x, y);

  const dateStr =
    require("locale").date(date, 0).toUpperCase() +
    "\n" +
    require("locale").dow(date, 0).toUpperCase();

  g.setFontAlign(0, 0).setFont("6x8", 2).drawString(dateStr, x, y + 48);
  g.setFontAlign(0, 0).setFont("6x8", 1.5).drawString(NRF.getAddress(), x, y + 80);

  // overlay icona sleep/awake/not worn
  drawSleepIcon();
}

// ---------------------------
// Encoding helpers (tuo codice)
// ---------------------------
function toByteArray(value, bytes, signed) {
  if (signed && value < 0) value += 1 << (bytes * 8);
  const arr = [];
  for (let i = 0; i < bytes; i++) arr.push((value >> (i * 8)) & 0xff);
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
// BLE update (tuo codice)
// ---------------------------
function updateBLE() {
  NRF.updateServices({
    0x180d: {
      0x2a37: {
        value: [
          6,
          hrm_1 && hrm_1.confidence >= 50 ? (hrm_1.bpm > 0 ? hrm_1.bpm : lastValidBPM) : lastValidBPM
        ],
        notify: true
      }
    },
    0x181a: {
      0x2a1f: {
        value: bar_1 ? toByteArray(Math.round(bar_1.temperature * 10), 2, true) : [0, 0],
        notify: true
      },
      0x2aa1: {
        value: mag_1 ? encodeMag(mag_1) : [0, 0, 0, 0, 0, 0],
        notify: true
      }
    },
    E95D0753251D470AA062FA1922DFA9A8: {
      E95D0753251D470AA062FA1922DFA9A8: {
        value: acc_1 ? encodeAcc(acc_1) : [0, 0, 0, 0, 0, 0],
        notify: true
      }
    }
  });
}

function setupBLE() {
  NRF.setServices(
    {
      0x180d: { 0x2a37: { value: [6, 0], notify: true, readable: true } },
      0x181a: {
        0x2a1f: { value: [0, 0], notify: true, readable: true },
        0x2aa1: { value: [0, 0, 0, 0, 0, 0], notify: true, readable: true }
      },
      E95D0753251D470AA062FA1922DFA9A8: {
        E95D0753251D470AA062FA1922DFA9A8: {
          value: [0, 0, 0, 0, 0, 0],
          notify: true,
          readable: true
        }
      }
    },
    { uart: false }
  );
}

// ---------------------------
// Sensor cycle (tuo codice)
// ---------------------------
function startSensorCycle() {
  // HRM sempre attivo
  if (!Bangle.isHRMOn()) Bangle.setHRMPower(true, "always");

  // Accende solo Barometro e Bussola temporaneamente
  Bangle.setBarometerPower(true, "cycle");
  Bangle.setCompassPower(true, "cycle");

  setTimeout(() => {
    Bangle.setBarometerPower(false, "cycle");
    Bangle.setCompassPower(false, "cycle");
  }, 5000);
}

// ---------------------------
// Event listeners (tuo codice)
// ---------------------------
Bangle.on("HRM", v => {
  if (v && v.confidence >= 50) {
    if (v.bpm > 0) lastValidBPM = v.bpm;
  }
  hrm_1 = v;
  updateBLE();
});

Bangle.on("pressure", v => {
  bar_1 = v;
  updateBLE();
});
Bangle.on("mag", v => {
  mag_1 = v;
  updateBLE();
});
Bangle.on("accel", v => {
  acc_1 = v;
  updateBLE();
});

// ---------------------------
// Boot
// ---------------------------
Bangle.setUI("clock");
Bangle.loadWidgets();
drawClock();
setTimeout(Bangle.drawWidgets, 0);

setupBLE();

// Loop: aggiorna orologio + sleep eval (ogni 10min) + sensori brevi ogni 10s
setInterval(() => {
  evaluateSleepStatus();
  drawClock();
  startSensorCycle();
}, 10000);
