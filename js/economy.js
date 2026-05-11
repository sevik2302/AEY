window.cityObjects = [];

const RADIUS = 2.02;

/* =========================
   BETTER LAND FILTER (NO MORE OCEAN CITIES)
========================= */

function isLandLike(pos) {

  const n = pos.clone().normalize();

  const lat = n.y;
  const lon = Math.atan2(n.z, n.x);

  /* ❌ океаны чаще в этих зонах */
  const oceanBands =
    Math.abs(lat) < 0.25 ||        // экваториальные океаны
    Math.abs(lat) > 0.85;          // полярные льды

  if (oceanBands) return false;

  /* псевдо-континентальная структура */
  const continentPattern =
    Math.sin(lon * 3.0) + Math.cos(lat * 5.0);

  return continentPattern > -0.2;

}

/* =========================
   CITY GENERATION
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const cityCount = 10;

  for (let i = 0; i < cityCount; i++) {

    let base;

    for (let tries = 0; tries < 80; tries++) {

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos((Math.random() * 2) - 1);

      base = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
      ).multiplyScalar(RADIUS);

      if (isLandLike(base)) break;

    }

    const normal = base.clone().normalize();

    const city = {
      base,
      buildings: [],
      level: 0
    };

    /* =========================
       INITIAL SMALL SETTLEMENT
    ========================= */

    const density = 25;

    for (let j = 0; j < density; j++) {

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.02, 0.03, 0.02),

        new THREE.MeshStandardMaterial({
          color: 0xdcdcdc,
          emissive: 0x000000
        })

      );

      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      );

      const pos = base.clone()
        .add(offset)
        .normalize()
        .multiplyScalar(RADIUS);

      mesh.position.copy(
        pos.clone().add(
          normal.clone().multiplyScalar(0.02)
        )
      );

      mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0,1,0),
        normal
      );

      mesh.userData.baseHeight = 0.03;

      cityGroup.add(mesh);
      city.buildings.push(mesh);

    }

    cityObjects.push(city);
  }
};

/* =========================
   PROPER GROWTH SYSTEM (3 STAGES)
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.level = level;

    city.buildings.forEach(b => {

      let scale;

      /* STAGE SYSTEM */

      if (level < 3) {
        scale = 1 + level * 0.1;       // деревня
      }
      else if (level < 7) {
        scale = 1 + level * 0.25;      // город
      }
      else {
        scale = 1 + level * 0.4;       // мегаполис
      }

      b.scale.y = scale;

      /* HEIGHT LIMIT (fix "too big from start") */
      b.scale.y = Math.min(b.scale.y, 6);

      /* LIGHTS ONLY LATE GAME */
      if (level > 4) {
        b.material.emissive.setHex(0x111133);
        b.material.emissiveIntensity = 0.5;
      }

      /* SKYLINES ONLY ENDGAME */
      if (level > 8 && Math.random() > 0.98) {
        b.scale.y *= 2.2;
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
setTimeout(() => generateCities(), 300);
