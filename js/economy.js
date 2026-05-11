window.cityObjects = [];

const RADIUS = 2.02;

/* =========================
   REALISTIC CONTINENT MASK (EARTH-LIKE SHAPES)
========================= */

/* фиксированные "континентальные пятна" */
const continents = [

  { lat: 0.2, lon: 0.5, size: 0.9 },   // “Евразия”
  { lat: -0.3, lon: -0.8, size: 0.8 },  // “Америка”
  { lat: 0.6, lon: -0.2, size: 0.6 },   // “Северная зона”
  { lat: -0.6, lon: 0.3, size: 0.5 }    // “Южные острова”

];

function toLatLon(vec) {

  const n = vec.clone().normalize();

  return {
    lat: Math.asin(n.y),
    lon: Math.atan2(n.z, n.x)
  };

}

/* =========================
   CONTINENT CHECK (REAL MASK)
========================= */

function isLand(vec) {

  const p = toLatLon(vec);

  for (let c of continents) {

    const d =
      Math.pow(p.lat - c.lat, 2) +
      Math.pow(p.lon - c.lon, 2);

    if (d < c.size) return true;

  }

  return false;

}

/* =========================
   CITY GENERATION (ONLY LAND)
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const cityCount = 8;

  for (let i = 0; i < cityCount; i++) {

    let base;

    /* ищем сушу */
    for (let tries = 0; tries < 50; tries++) {

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

    const density = 40;

    for (let j = 0; j < density; j++) {

      const height =
        0.02 + Math.pow(Math.random(), 2) * 0.9;

      const isSkyscraper = Math.random() > 0.93;

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.02, height, 0.02),

        new THREE.MeshStandardMaterial({
          color: isSkyscraper ? 0xaadfff : 0xd9d9d9,
          emissive: 0x000000
        })

      );

      /* =========================
         SPREAD ON SURFACE
      ========================= */

      const tangent = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize().multiplyScalar(0.12);

      const pos = base.clone()
        .add(tangent)
        .normalize()
        .multiplyScalar(RADIUS);

      /* =========================
         HEDGEHOG ALIGNMENT
      ========================= */

      const finalPos =
        pos.clone().add(
          normal.clone().multiplyScalar(height / 2)
        );

      mesh.position.copy(finalPos);

      mesh.lookAt(pos.clone().add(normal));

      mesh.userData.normal = normal;
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

      const scale = 1 + level * 0.2;

      b.scale.y = scale;

      if (level > 3) {
        b.material.emissive.setHex(0x111133);
        b.material.emissiveIntensity = 0.5;
      }

      if (level > 7 && Math.random() > 0.96) {
        b.scale.y *= 2.8;
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
