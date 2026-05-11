window.cityObjects = [];

const RADIUS = 2.02;

/* =========================
   REAL CONTINENT SYSTEM (STABLE EARTH-LIKE BLOBS)
========================= */

/*
   Это НЕ шум.
   Это фиксированные "континентальные массы",
   которые дают стабильный результат всегда.
*/

const landBlobs = [

  new THREE.Vector3( 0.7,  0.3,  0.2).normalize(),
  new THREE.Vector3(-0.6, -0.2,  0.4).normalize(),
  new THREE.Vector3( 0.1,  0.8, -0.3).normalize(),
  new THREE.Vector3(-0.2, -0.7, -0.6).normalize()

];

function isLand(vec) {

  const n = vec.clone().normalize();

  for (let b of landBlobs) {

    const d = n.dot(b); // similarity on sphere

    if (d > 0.65) return true;

  }

  return false;

}

/* =========================
   SAFE CITY GENERATION
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const cityCount = 8;

  for (let i = 0; i < cityCount; i++) {

    let base = new THREE.Vector3();

    /* ищем только сушу */
    for (let tries = 0; tries < 100; tries++) {

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos((Math.random() * 2) - 1);

      base.set(
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

    const density = 45;

    for (let j = 0; j < density; j++) {

      const height =
        0.03 + Math.pow(Math.random(), 2) * 1.0;

      const isSkyscraper = Math.random() > 0.94;

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.02, height, 0.02),

        new THREE.MeshStandardMaterial({
          color: isSkyscraper ? 0xaadfff : 0xdcdcdc,
          emissive: 0x000000
        })

      );

      /* =========================
         SPHERE SURFACE POSITION
      ========================= */

      const tangent = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize().multiplyScalar(0.1);

      const pos = base.clone()
        .add(tangent)
        .normalize()
        .multiplyScalar(RADIUS);

      /* =========================
         FIX: PROPER VERTICAL ALIGNMENT
      ========================= */

      mesh.position.copy(
        pos.clone().add(
          normal.clone().multiplyScalar(height / 2)
        )
      );

      /*
        CRITICAL FIX:
        убираем lookAt (он ломал здания)
        используем quaternion alignment
      */

      const up = normal.clone();
      const axis = new THREE.Vector3(0, 1, 0);

      const quat = new THREE.Quaternion()
        .setFromUnitVectors(axis, up);

      mesh.quaternion.copy(quat);

      mesh.userData.normal = normal;

      cityGroup.add(mesh);
      city.buildings.push(mesh);

    }

    cityObjects.push(city);
  }
};

/* =========================
   GROW SYSTEM (CLEAN)
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      const scale = 1 + level * 0.22;

      b.scale.y = scale;

      if (level > 3) {
        b.material.emissive.setHex(0x111133);
        b.material.emissiveIntensity = 0.6;
      }

      if (level > 6 && Math.random() > 0.97) {
        b.scale.y *= 2.5;
      }

    });

  });

};

/* RESET */
window.resetCities = function () {
  generateCities();
};

/* INIT SAFE */
setTimeout(() => {
  generateCities();
}, 200);
