window.planet = null;
window.cityGroup = null;

window.createPlanet = function () {

  const loader = new THREE.TextureLoader();

  /* 🌍 ДНЕВНАЯ ТЕКСТУРА */
  const dayTex = loader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  /* =========================
     🌍 ПЛАНЕТА
  ========================= */
  planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.6, 128, 128),
    new THREE.MeshStandardMaterial({
      map: dayTex,
      roughness: 1,
      metalness: 0,
      emissive: new THREE.Color(0x111111),
      emissiveIntensity: 0.3
    })
  );

  scene.add(planet);

  /* =========================
     🌫 АТМОСФЕРА
  ========================= */
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.75, 128, 128),
    new THREE.MeshBasicMaterial({
      color: 0x4aa3ff,
      transparent: true,
      opacity: 0.18
    })
  );

  scene.add(atmosphere);

  /* =========================
     💡 ГЛОБАЛЬНЫЙ СВЕТ ГОРОДА
  ========================= */
  const cityLight = new THREE.PointLight(0x66ccff, 2);
  cityLight.position.set(0, 0, 0);
  scene.add(cityLight);

  /* =========================
     🏙 ГОРОДА
  ========================= */
  cityGroup = new THREE.Group();
  scene.add(cityGroup);

  buildCity(1);
};

/* =========================
   🏙 СТРОИТЕЛЬСТВО ГОРОДА
========================= */
window.buildCity = function (level) {

  if (!cityGroup) return;

  cityGroup.clear();

  const density = 60 + level * 70;

  for (let i = 0; i < density; i++) {

    const height = Math.random() * 0.7 + 0.05 + level * 0.03;

    const building = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, height, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0xb0b0b0
      })
    );

    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;

    const r = 2.58;

    building.position.set(
      r * Math.sin(theta) * Math.cos(phi),
      r * Math.cos(theta),
      r * Math.sin(theta) * Math.sin(phi)
    );

    cityGroup.add(building);
  }
};

/* =========================
   🔁 ОБНОВЛЕНИЕ ГОРОДА
========================= */
window.updateCity = function (level) {
  if (!cityGroup) return;
  buildCity(level);
};
