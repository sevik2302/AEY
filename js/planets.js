const loader = new THREE.TextureLoader();

/* =========================
   REAL EARTH TEXTURE (VISIBLE CONTINENTS)
========================= */

const earthMap = loader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

const earthNight = loader.load(
  "https://threejs.org/examples/textures/planets/earth_lights_2048.png"
);

const clouds = loader.load(
  "https://threejs.org/examples/textures/planets/earth_clouds_1024.png"
);

/* =========================
   PLANET
========================= */

window.planet = new THREE.Mesh(

  new THREE.SphereGeometry(2, 128, 128),

  new THREE.MeshStandardMaterial({

    map: earthMap,

    emissiveMap: earthNight,

    emissive: new THREE.Color(0xffffff),

    emissiveIntensity: 0.6,

    roughness: 1,

    metalness: 0

  })

);

scene.add(planet);

/* =========================
   CLOUDS
========================= */

window.clouds = new THREE.Mesh(

  new THREE.SphereGeometry(2.03, 128, 128),

  new THREE.MeshStandardMaterial({

    map: clouds,

    transparent: true,

    opacity: 0.4

  })

);

scene.add(clouds);

/* =========================
   ATMOSPHERE (LIGHT)
========================= */

window.atmosphere = new THREE.Mesh(

  new THREE.SphereGeometry(2.08, 128, 128),

  new THREE.MeshBasicMaterial({

    color: 0x4da6ff,

    transparent: true,

    opacity: 0.08

  })

);

scene.add(atmosphere);

/* =========================
   CITY ROOT
========================= */

window.cityGroup = new THREE.Group();
scene.add(cityGroup);
