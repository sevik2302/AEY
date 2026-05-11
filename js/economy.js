window.cityObjects = [];

const RADIUS = 2.02;

/* =========================
   EARTH TEXTURE SAMPLING (REAL LAND DETECTION)
========================= */

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.crossOrigin = "anonymous";
img.src = "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

let textureReady = false;

img.onload = () => {

  canvas.width = 1024;
  canvas.height = 512;

  ctx.drawImage(img, 0, 0, 1024, 512);

  textureReady = true;

  generateCities(); // пересоздаём после загрузки

};

/* =========================
   UV -> COLOR CHECK
========================= */

function isLandUV(vec) {

  if (!textureReady) return true;

  const n = vec.clone().normalize();

  const u = 0.5 + Math.atan2(n.z, n.x) / (2 * Math.PI);
  const v = 0.5 - Math.asin(n.y) / Math.PI;

  const x = Math.floor(u * 1024);
  const y = Math.floor(v * 512);

  const pixel = ctx.getImageData(x, y, 1, 1).data;

  const r = pixel[0];
  const g = pixel[1];
  const b = pixel[2];

  /* океан = синий */
  const isOcean = b > r && b > g;

  return !isOcean;
}

/* =========================
   CITY GENERATION (ONLY LAND)
========================= */

window.generateCities = function () {

  if (!textureReady) return;

  cityGroup.clear();
  cityObjects = [];

  const cityCount = 12;

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

      if (isLandUV(base)) break;

    }

    const normal = base.clone().normalize();

    const city = {
      base,
      buildings: []
    };

    /* =========================
       MORE BUILDINGS, SMALLER SIZE
    ========================= */

    const density = 70; // больше зданий

    for (let j = 0; j < density; j++) {

      const height =
        0.02 + Math.pow(Math.random(), 1.8) * 0.6; // меньше и мягче

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.015, height, 0.015),

        new THREE.MeshStandardMaterial({
          color: 0xdcdcdc,
          emissive: 0x000000
        })

      );

      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.08
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

      mesh.userData.baseHeight = height;

      cityGroup.add(mesh);
      city.buildings.push(mesh);

    }

    cityObjects.push(city);
  }
};

/* =========================
   GROW SYSTEM (CONTROLLED)
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      /* мягкий рост */
      const scale = 1 + level * 0.18;

      b.scale.y = Math.min(scale, 4); // ограничение высоты

      /* lights later */
      if (level > 4) {
        b.material.emissive.setHex(0x111122);
        b.material.emissiveIntensity = 0.5;
      }

      /* rare skyscrapers */
      if (level > 7 && Math.random() > 0.99) {
        b.scale.y *= 2;
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
