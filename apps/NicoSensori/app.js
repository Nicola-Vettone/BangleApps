// Inizializza
g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();

// Disegna testo helper
g.setFont("6x8", 1);
g.drawString("Lettura sensori:", 5, 5);

// Variabili
let y = 20;

// Accelerometro
Bangle.on("accel", function (a) {
  g.clearRect(0, y, 176, y + 10);
  g.drawString(`Accel: ${a.x.toFixed(2)}, ${a.y.toFixed(2)}, ${a.z.toFixed(2)}`, 5, y);
});

// Battito cardiaco
Bangle.setHRMPower(1); // accendi sensore
Bangle.on("HRM", function (hrm) {
  g.clearRect(0, y + 15, 176, y + 25);
  g.drawString(`BPM: ${hrm.bpm}`, 5, y + 15);
});

// Bussola
Bangle.setCompassPower(1);
Bangle.on("mag", function (m) {
  g.clearRect(0, y + 30, 176, y + 40);
  g.drawString(`Mag: ${m.x.toFixed(1)}, ${m.y.toFixed(1)}, ${m.z.toFixed(1)}`, 5, y + 30);
});

// GPS
Bangle.setGPSPower(1);
Bangle.on("GPS", function (gps) {
  g.clearRect(0, y + 45, 176, y + 60);
  g.drawString(`GPS: ${gps.lat.toFixed(5)}, ${gps.lon.toFixed(5)}`, 5, y + 45);
});

// Chiudi app al tocco
Bangle.setUI("touch", () => load());
