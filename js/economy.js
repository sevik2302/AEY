window.cityObjects = [];

const RADIUS = 2.02;

/* =========================
   CONTINENT MASK (IMPROVED)
========================= */

function landNoise(x, z) {

  return (
    Math.sin(x * 2.2) +
    Math.cos(z * 2.7) +
    Math.sin((x + z) * 1.4)
  );

}

function isLand(x, z) {
  return landNoise(x, z) > 0.15;
}

/* =========================
   CITY GENERATION (REAL SURFACE)
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const cityCount = 7;

  for (let i = 0; i < cityCount; i++) {

    let base;

    /* ищем только сушу */
    for (let tries = 0; tries < 20; tries++) {

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos((Math.random() * 2) - 1);

      base = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
      ).multiplyScalar(RADIUS);

      if (isLand(base.x, base.z)) break;
    }

    const normal = base.clone().normalize();

    const city = {
      base,
      buildings: []
    };

    /* =========================
       DENSE CITY CLUSTER
    ========================= */

    const density = 35;

    for (let j = 0; j < density; j++) {

      /* height progression */
      const height =
        0.03 +
        Math.pow(Math.random(), 2) * 0.8;

      const isSkyscraper = Math.random() > 0.92;

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.02, height, 0.02),

        new THREE.MeshStandardMaterial({
          color: isSkyscraper ? 0xaadfff : 0xdcdcdc,
          emissive: 0x000000
        })

      );

      /* =========================
         SPREAD ON SPHERE SURFACE
      ========================= */

      const tangent = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize().multiplyScalar(0.15);

      const pos = base.clone()
        .add(tangent)
        .normalize()
        .multiplyScalar(RADIUS);

      /* =========================
         NORMAL ALIGNMENT (KEY FIX)
      ========================= */

      const finalPos =
        pos.clone()
        .add(normal.clone().multiplyScalar(height / 2));

      mesh.position.copy(finalPos);

      mesh.lookAt(pos.clone().add(normal));

      mesh.userData.baseHeight = height;
      mesh.userData.normal = normal;

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

      const scale = 1 + level * 0.18;

      b.scale.y = scale;

      /* push outward along normal */
      const n = b.userData.normal;

      b.position.addScaledVector(n, 0);

      /* emissive night effect */
      if (level > 2) {
        b.material.emissive.setHex(0x111122);
        b.material.emissiveIntensity = 0.6;
      }

      /* skyscraper boost */
      if (level > 6 && Math.random() > 0.97) {
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
