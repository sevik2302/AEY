window.cityObjects = [];

/* =========================
   SIMPLE LAND MASK (FAKE CONTINENTS)
========================= */

function isLand(x, z) {

  const noise =
    Math.sin(x * 3.2) +
    Math.cos(z * 2.7) +
    Math.sin((x + z) * 1.3);

  return noise > 0.2;

}

/* =========================
   CITY GENERATION (LAND ONLY)
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const radius = 2.02;

  const cityCount = 6;

  for (let i = 0; i < cityCount; i++) {

    let baseX, baseY, baseZ;

    let attempts = 0;

    /* ищем только сушу */
    do {

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos((Math.random() * 2) - 1);

      baseX = radius * Math.sin(theta) * Math.cos(phi);
      baseY = radius * Math.cos(theta);
      baseZ = radius * Math.sin(theta) * Math.sin(phi);

      attempts++;

    } while (!isLand(baseX, baseZ) && attempts < 10);

    const city = {
      baseX,
      baseY,
      baseZ,
      buildings: []
    };

    /* старт маленький город */
    const baseBuildings = 10;

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
   GROWTH SYSTEM (REAL EVOLUTION)
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      /* рост начинается с плотности, потом высота */

      const heightMultiplier =
        1 + (level * 0.08);

      const targetHeight =
        b.userData.baseHeight * heightMultiplier;

      b.scale.y = targetHeight / b.userData.baseHeight;

      /* позиция вверх */

      b.position.y =
        city.baseY +
        (targetHeight / 2);

      /* на высоких уровнях появляются светящиеся окна */

      if (level > 5) {

        b.material.emissive.setHex(0x222233);

        b.material.emissiveIntensity = 0.4;

      }

      /* skyscrapers только на поздней игре */

      if (level > 10 && Math.random() > 0.97) {

        b.scale.y *= 2.5;

      }

    });

  });

};

/* =========================
   RESET
========================= */

window.resetCities = function () {
  generateCities();
};

/* INIT */
generateCities();
