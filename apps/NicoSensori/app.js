// Inizializza
g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();

// Font più grande
g.setFont("Vector", 2);
g.setFontAlign(-1, -1); // Allinea testo in alto a sinistra

// Disegna testo helper
g.drawString("Lettura sensori:", 5, 5);

// Variabili
let y = 30;

// Accelerometro
Bangle.on("accel", function (a) {
  g.clearRect(0, y, 176, y + 20);
  g.drawString(`Accel: ${a.x.toFixed(2)}, ${a.y.toFixed(2)}, ${a.z.toFixed(2)}`, 5, y);
});

// Battito cardiaco
Bangle.setHRMPower(1); // accendi sensore
Bangle.on("HRM", function (hrm) {
  g.clearRect(0, y + 25, 176, y + 45);
  g.drawString(`BPM: ${hrm.bpm}`, 5, y + 25);
});

// Bussola
Bangle.setCompassPower(1);
Bangle.on("mag", function (m) {
  g.clearRect(0, y + 50, 176, y + 70);
  g.drawString(`Mag: ${m.x.toFixed(1)}, ${m.y.toFixed(1)}, ${m.z.toFixed(1)}`, 5, y + 50);
});

// GPS
Bangle.setGPSPower(1);
Bangle.on("GPS", function (gps) {
  g.clearRect(0, y + 75, 176, y + 100);
  g.drawString(`GPS: ${gps.lat.toFixed(5)}, ${gps.lon.toFixed(5)}`, 5, y + 75);
});

// Chiudi app al tocco
Bangle.setUI("touch", () => load());
