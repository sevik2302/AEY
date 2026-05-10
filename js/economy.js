window.cityObjects = [];

/* =========================
   CREATE CITY (FIXED LOCATIONS)
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const radius = 2.02;

  const cityCount = 7;

  for (let i = 0; i < cityCount; i++) {

    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos((Math.random() * 2) - 1);

    const baseX = radius * Math.sin(theta) * Math.cos(phi);
    const baseY = radius * Math.cos(theta);
    const baseZ = radius * Math.sin(theta) * Math.sin(phi);

    const city = {
      baseX,
      baseY,
      baseZ,
      buildings: []
    };

    const densityBase = 20;

    for (let j = 0; j < densityBase; j++) {

      const isSkyscraper = Math.random() > 0.92;
      const isMid = Math.random() > 0.6;

      let height, color, emissive;

      if (isSkyscraper) {
        height = 0.5 + Math.random() * 1.2;
        color = 0x9fd3ff;
        emissive = 0x111122;
      } else if (isMid) {
        height = 0.2 + Math.random() * 0.5;
        color = 0xd9d9d9;
        emissive = 0x0a0a0a;
      } else {
        height = 0.08 + Math.random() * 0.15;
        color = 0xbfbfbf;
        emissive = 0x000000;
      }

      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, height, 0.02),
        new THREE.MeshStandardMaterial({
          color,
          emissive,
          emissiveIntensity: 0.6
        })
      );

      mesh.position.set(
        baseX + (Math.random() - 0.5) * 0.15,
        baseY + (Math.random() - 0.5) * 0.15,
        baseZ + (Math.random() - 0.5) * 0.15
      );

      mesh.userData.baseHeight = height;

      cityGroup.add(mesh);
      city.buildings.push(mesh);
    }

    cityObjects.push(city);
  }
};

/* =========================
   GROW SYSTEM (REAL EVOLUTION)
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      const scale = 1 + level * 0.12;

      b.scale.y = scale;

      b.position.y =
        city.baseY +
        (b.userData.baseHeight * scale) / 2;

    });

  });

};

/* RESET */
window.resetCities = function () {
  generateCities();
};

/* INIT */
generateCities();
