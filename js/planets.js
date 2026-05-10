window.planet = null;
window.cityGroup = null;

window.createPlanet = function () {

  const loader = new THREE.TextureLoader();

  /* 🌍 ПЛАНЕТА */
  const tex = loader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.6, 128, 128),
    new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 1,
      metalness: 0,
      emissive: new THREE.Color(0x111111),
      emissiveIntensity: 0.4
    })
  );

  scene.add(planet);

  /* 🌫 АТМОСФЕРА */
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(2.75, 128, 128),
    new THREE.MeshBasicMaterial({
      color: 0x4aa3ff,
      transparent: true,
      opacity: 0.2
    })
  );

  scene.add(glow);

  /* 💡 ЦЕНТРАЛЬНЫЙ СВЕТ ГОРОДОВ */
  const cityLight = new THREE.PointLight(0x66ccff, 2.5);
  cityLight.position.set(0, 0, 0);
  scene.add(cityLight);

  /* 🏙 ГОРОДА */
  cityGroup = new THREE.Group();
  scene.add(cityGroup);

  buildCity(1);
};

/* =========================
   🏙 ГОРОДА (FIX ВИДИМОСТИ)
========================= */
window.buildCity = function (level) {

  if (!cityGroup) return;

  cityGroup.clear();

  const density = 80 + level * 120;

  for (let i = 0; i < density; i++) {

    /* 🔥 СДЕЛАЛИ ВЫШЕ И КРУПНЕЕ */
    const height = Math.random() * 1.2 + 0.2 + level * 0.08;

    const building = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, height, 0.05),
      new THREE.MeshStandardMaterial({
        color: 0xcfcfcf,
        emissive: new THREE.Color(0x222222)
      })
    );

    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;

    const r = 2.62; // 🔥 ЧУТЬ СНАРУЖИ ПОВЕРХНОСТИ

    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.cos(theta);
    const z = r * Math.sin(theta) * Math.sin(phi);

    building.position.set(x, y, z);

    /* 🔥 ВЫСТУПАЕМ НАРУЖУ (ВАЖНО!) */
    const normal = new THREE.Vector3(x, y, z).normalize();
    building.position.add(normal.multiplyScalar(0.03));

    cityGroup.add(building);
  }
};

/* =========================
   UPDATE
========================= */
window.updateCity = function (level) {
  if (!cityGroup) return;
  buildCity(level);
};
