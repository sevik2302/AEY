window.cityObjects = [];

/* =========================
   CITY GENERATION (same logic)
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const radius = 2.02;

  const cityCount = 6;

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

    const baseBuildings = 12; /* чуть больше сразу */

    for (let j = 0; j < baseBuildings; j++) {

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.02, 0.05, 0.02),

        new THREE.MeshStandardMaterial({
          color: 0xdcdcdc,
          emissive: 0x000000
        })

      );

      mesh.position.set(
        baseX + (Math.random() - 0.5) * 0.12,
        baseY + (Math.random() - 0.5) * 0.12,
        baseZ + (Math.random() - 0.5) * 0.12
      );

      mesh.userData.baseHeight = 0.05;

      cityGroup.add(mesh);
      city.buildings.push(mesh);

    }

    cityObjects.push(city);
  }
};

/* =========================
   FAST GROWTH
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      const scale = 1 + level * 0.25; /* ⚡ было 0.08 → теперь x3 */

      b.scale.y = scale;

      b.position.y =
        city.baseY +
        (b.userData.baseHeight * scale) / 2;

      if (level > 2) {
        b.material.emissive.setHex(0x222233);
        b.material.emissiveIntensity = 0.6;
      }

      if (level > 4 && Math.random() > 0.95) {
        b.scale.y *= 3; /* быстрые skyscrapers */
      }

    });

  });

};

/* RESET */
window.resetCities = function () {
  generateCities();
};

/* INIT */
generateCities();
