const loader = new THREE.TextureLoader();

/* TEXTURES */
const dayMap = loader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

const nightMap = loader.load(
  "https://threejs.org/examples/textures/planets/earth_lights_2048.png"
);

const cloudsMap = loader.load(
  "https://threejs.org/examples/textures/planets/earth_clouds_1024.png"
);

/* PLANET CORE */
window.planet = new THREE.Mesh(
  new THREE.SphereGeometry(2, 256, 256),
  new THREE.MeshStandardMaterial({
    map: dayMap,
    emissiveMap: nightMap,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.6,
    roughness: 1,
    metalness: 0
  })
);

scene.add(planet);

/* CLOUD LAYER */
window.clouds = new THREE.Mesh(
  new THREE.SphereGeometry(2.03, 256, 256),
  new THREE.MeshStandardMaterial({
    map: cloudsMap,
    transparent: true,
    opacity: 0.4
  })
);

scene.add(clouds);

/* ATMOSPHERE GLOW (fake bloom layer) */
window.atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(2.15, 256, 256),
  new THREE.MeshBasicMaterial({
    color: 0x4da6ff,
    transparent: true,
    opacity: 0.12
  })
);

scene.add(atmosphere);

/* STARFIELD ULTRA DENSITY */
const geo = new THREE.BufferGeometry();
const stars = [];

for (let i = 0; i < 20000; i++) {
  stars.push((Math.random() - 0.5) * 800);
  stars.push((Math.random() - 0.5) * 800);
  stars.push((Math.random() - 0.5) * 800);
}

geo.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(stars, 3)
);

scene.add(
  new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06
    })
  )
);

/* CITY ROOT */
window.cityGroup = new THREE.Group();
scene.add(cityGroup);
