// Clock with large digits using the "Anton" bold font
Graphics.prototype.setFontAnton = function(scale) {
  g.setFontCustom(
    atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAA/gAAAAAAAAAAP/gAAAAAAAAAH//gAAAAAAAAB///gAAAAAAAAf///gAAAAAAAP////gAAAAAAD/////gAAAAAA//////gAAAAAP//////gAAAAH///////gAAAB////////gAAAf////////gAAP/////////gAD//////////AA//////////gAA/////////4AAA////////+AAAA////////gAAAA///////wAAAAA//////8AAAAAA//////AAAAAAA/////gAAAAAAA////4AAAAAAAA///+AAAAAAAAA///gAAAAAAAAA//wAAAAAAAAAA/8AAAAAAAAAAA/AAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////AAAAAB///////8AAAAH////////AAAAf////////wAAA/////////4AAB/////////8AAD/////////+AAH//////////AAP//////////gAP//////////gAP//////////gAf//////////wAf//////////wAf//////////wAf//////////wA//8AAAAAB//4A//wAAAAAAf/4A//gAAAAAAP/4A//gAAAAAAP/4A//gAAAAAAP/4A//wAAAAAAf/4A///////////4Af//////////wAf//////////wAf//////////wAf//////////wAP//////////gAP//////////gAH//////////AAH//////////AAD/////////+AAB/////////8AAA/////////4AAAP////////gAAAD///////+AAAAAf//////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gAAAAAAAAAAP/gAAAAAAAAAAf/gAAAAAAAAAAf/gAAAAAAAAAAf/AAAAAAAAAAA//AAAAAAAAAAA/+AAAAAAAAAAB/8AAAAAAAAAAD//////////gAH//////////gAP//////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gA///////////gAAAAAAAAH/4AAAAAAAAAAH/wAAAAAAAAAAH/wAAAAAAAAAAH/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8AAA/////+B///AAA/////+B///wAA/////+B///4AA/////+B///8AA/////+B///8AA/////+B///+AA/////+B////AA/////+B////AA/////+B////AA/////+B////gA/////+B////gA/////+B////gA/////+A////gA//gP/gAAB//wA//gf/AAAA//wA//gf/AAAAf/wA//g//AAAAf/wA//g//AAAA//wA//g//gAAA//wA//g//+AAP//wA//g////////gA//g////////gA//g////////gA//g////////gA//g////////AA//gf///////AA//gf//////+AA//gP//////+AA//gH//////8AA//gD//////4AA//gB//////wAA//gA//////AAAAAAAH////8AAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////gAAAAB///////+AAAAH////////gAAAf////////4AAB/////////8AAD/////////+AAH//////////AAH//////////gAP//////////gAP//////////gAf//////////wAf//////////wAf//////////wAf//////////wAf//////////4A//wAD/4AAf/4A//gAH/wAAP/4A//gAH/wAAP/4A//gAP/wAAP/4A//gAP/4AAf/4A//wAP/+AD//4A///wP//////4Af//4P//////wAf//4P//////wAf//4P//////wAf//4P//////wAP//4P//////gAP//4H//////gAH//4H//////AAH//4D/////+AAD//4D/////8AAB//4B/////4AAA//4A/////wAAAP/4AP////AAAAB/4AD///4AAAAAAAAAH/8AAAAAAAAAAAAAAAA
"),
    46,
    atob("EiAnGicnJycnJycnEw=="),
    78 + (scale << 8) + (1 << 16)
  );
};

{
  let drawTimeout;
  let lastSensorUpdate = getTime();
  let previousValues = {};
  let acc_1, hrm_1, bar_1, mag_1, gps_1;

  let draw = function () {
    let x = g.getWidth() / 2;
    let y = g.getHeight() / 2;
    g.reset().clearRect(Bangle.appRect);
    let date = new Date();
    let timeStr = require("locale").time(date, 1);
    g.setFontAlign(0, 0).setFont("Anton").drawString(timeStr, x, y);
    let dateStr = require("locale").date(date, 0).toUpperCase() + "\n" +
      require("locale").dow(date, 0).toUpperCase();
    g.setFontAlign(0, 0).setFont("6x8", 2).drawString(dateStr, x, y + 48);
    let macAddress = NRF.getAddress();
    g.setFontAlign(0, 0).setFont("6x8", 1.5).drawString(macAddress, x, y + 80);
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = setTimeout(() => {
      drawTimeout = undefined;
      draw();
    }, 60000 - (Date.now() % 60000));
  };

  Bangle.setUI({
    mode: "clock",
    remove: function () {
      if (drawTimeout) clearTimeout(drawTimeout);
      drawTimeout = undefined;
      delete Graphics.prototype.setFontAnton;
    }
  });

  Bangle.loadWidgets();
  draw();
  setTimeout(Bangle.drawWidgets, 0);

  function toByteArray(value, bytes, signed) {
    if (signed && value < 0) value += 1 << (bytes * 8);
    let arr = [];
    for (let i = 0; i < bytes; i++) arr.push((value >> (i * 8)) & 0xFF);
    return arr;
  }

  function encodeAcc(data) {
    let x = toByteArray(data.x * 1000, 2, true);
    let y = toByteArray(data.y * 1000, 2, true);
    let z = toByteArray(data.z * 1000, 2, true);
    return [x[0], x[1], y[0], y[1], z[0], z[1]];
  }

  function encodeMag(data) {
    let x = toByteArray(data.x, 2, true);
    let y = toByteArray(data.y, 2, true);
    let z = toByteArray(data.z, 2, true);
    return [x[0], x[1], y[0], y[1], z[0], z[1]];
  }

  function encodeGps(data) {
    let spd = toByteArray(Math.round(data.speed * 1000 / 36), 2, false);
    let lat = toByteArray(Math.round(data.lat * 1e7), 4, true);
    let lon = toByteArray(Math.round(data.lon * 1e7), 4, true);
    let alt = toByteArray(Math.round(data.alt * 100), 3, true);
    let hdg = toByteArray(Math.round(data.course * 100), 2, false);
    return [157, 2, ...spd, ...lat, ...lon, ...alt, ...hdg];
  }

  function updateIfChanged(newVal, key) {
    let str = JSON.stringify(newVal);
    if (str !== previousValues[key]) {
      previousValues[key] = str;
      lastSensorUpdate = getTime();
      return true;
    }
    return false;
  }

  function updateBLEData() {
    NRF.updateServices({
      0x180D: { 0x2A37: { value: hrm_1 && hrm_1.confidence >= 50 ? [6, hrm_1.bpm] : [6, 0], notify: true } },
      0x181A: {
        0x2A6C: { value: bar_1 ? toByteArray(Math.round(bar_1.altitude * 100), 3, true) : [0, 0, 0], notify: true },
        0x2A6D: { value: bar_1 ? toByteArray(Math.round(bar_1.pressure * 10), 4, false) : [0, 0, 0, 0], notify: true },
        0x2A1F: { value: bar_1 ? toByteArray(Math.round(bar_1.temperature * 10), 2, true) : [0, 0], notify: true },
        0x2AA1: { value: mag_1 ? encodeMag(mag_1) : [0, 0, 0, 0, 0, 0], notify: true }
      },
      0x1819: {
        0x2A67: { value: gps_1 ? encodeGps(gps_1) : new Array(17).fill(0), notify: true }
      },
      "E95D0753251D470AA062FA1922DFA9A8": {
        "E95D0753251D470AA062FA1922DFA9A8": {
          value: acc_1 ? encodeAcc(acc_1) : [0, 0, 0, 0, 0, 0], notify: true
        }
      }
    });
  }

  function setupBLE() {
    require("ble_advert").set(0x180D, undefined, { connectable: true, discoverable: true, scannable: true, whenConnected: true });
    NRF.setServices({
      0x180D: { 0x2A37: { readable: true, value: [6, 0] }, 0x2A38: { readable: true, value: 2 } },
      0x181A: {
        0x2A6C: { readable: true, value: [0, 0, 0] },
        0x2A6D: { readable: true, value: [0, 0, 0, 0] },
        0x2A1F: { readable: true, value: [0, 0] },
        0x2AA1: { readable: true, value: [0, 0, 0, 0, 0, 0] }
      },
      0x1819: { 0x2A67: { readable: true, value: new Array(17).fill(0) } },
      "E95D0753251D470AA062FA1922DFA9A8": {
        readable: true,
        value: [0, 0, 0, 0, 0, 0]
      },
      "6e400001-b5a3-f393-e0a9-e50e24dcca9e": {
        "6e400002-b5a3-f393-e0a9-e50e24dcca9e": {
          writable: true,
          writableWithoutResponse: true,
          onWrite: evt => console.log("UART RX:", evt.data)
        },
        "6e400003-b5a3-f393-e0a9-e50e24dcca9e": {
          notify: true,
          readable: true,
          value: [0]
        }
      }
    }, { uart: false });
  }

  function checkSensorStuck() {
    if (getTime() - lastSensorUpdate > 30) {
      console.log("⚠️ Watchdog: sensori bloccati. Riavvio...");
      E.reboot();
    }
  }

  Bangle.on("HRM", v => { if (updateIfChanged(v, "hrm")) hrm_1 = v, updateBLEData(); });
  Bangle.on("pressure", v => { if (updateIfChanged(v, "bar")) bar_1 = v, updateBLEData(); });
  Bangle.on("mag", v => { if (updateIfChanged(v, "mag")) mag_1 = v, updateBLEData(); });
  Bangle.on("GPS", v => { if (updateIfChanged(v, "gps")) gps_1 = v, updateBLEData(); });
  Bangle.on("accel", v => { if (updateIfChanged(v, "acc")) acc_1 = v, updateBLEData(); });

  Bangle.setHRMPower(true);
  Bangle.setBarometerPower(true);
  Bangle.setCompassPower(true);
  Bangle.setGPSPower(true);

  setupBLE();
  setInterval(checkSensorStuck, 60000);
}
