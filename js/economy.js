window.cityObjects = [];

const RADIUS = 2.02;

/* =========================
   FINAL LAND DETECTION (ROBUST)
========================= */

function isLand(vec) {

  const n = vec.clone().normalize();

  const lat = n.y;

  /* океаны */
  if (Math.abs(lat) < 0.24) return false;
  if (Math.abs(lat) > 0.86) return false;

  /* континентальная структура */
  const landPattern =
    Math.sin(n.x * 4.5) +
    Math.cos(n.z * 3.7);

  return landPattern > -0.05;

}

/* =========================
   CITY GENERATION
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const cityCount = 14;

  for (let i = 0; i < cityCount; i++) {

    let base;

    for (let tries = 0; tries < 200; tries++) {

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos((Math.random() * 2) - 1);

      base = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
      ).multiplyScalar(RADIUS);

      if (isLand(base)) break;

    }

    const normal = base.clone().normalize();

    const city = {
      base,
      buildings: []
    };

    /* =========================
       DENSITY (FINAL BALANCE)
    ========================= */

    const density = 110;

    for (let j = 0; j < density; j++) {

      const height =
        0.01 + Math.pow(Math.random(), 2.6) * 0.38;

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.009, height, 0.009),

        new THREE.MeshStandardMaterial({
          color: 0xd8d8d8,
          emissive: 0x000000
        })

      );

      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.065,
        (Math.random() - 0.5) * 0.065,
        (Math.random() - 0.5) * 0.065
      );

      const pos = base.clone()
        .add(offset)
        .normalize()
        .multiplyScalar(RADIUS);

      mesh.position.copy(
        pos.clone().add(
          normal.clone().multiplyScalar(height / 2)
        )
      );

      mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        normal
      );

      cityGroup.add(mesh);
      city.buildings.push(mesh);

    }

    cityObjects.push(city);
  }
};

/* =========================
   FINAL GROWTH SYSTEM
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      let scale = 1 + level * 0.13;

      scale = Math.min(scale, 3.0);

      b.scale.y = scale;

      if (level > 4) {
        b.material.emissive.setHex(0x101a33);
        b.material.emissiveIntensity = 0.35;
      }

      if (level > 8 && Math.random() > 0.99) {
        b.scale.y *= 1.8;
      }

    });

  });

};

/* INIT */
setTimeout(() => generateCities(), 500);
