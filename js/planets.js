window.planet = null;
window.cityGroup = null;

/* =========================
   CREATE PLANET (HARD FIX)
========================= */
window.createPlanet = function () {

  const loader = new THREE.TextureLoader();

  const tex = loader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  /* 🔥 ВАЖНО: используем window.scene напрямую */
  const s = window.scene;

  if (!s) {
    console.error("❌ SCENE NOT FOUND — renderer not ready");
    return;
  }

  /* =========================
     🌍 PLANET
  ========================= */
  planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.6, 128, 128),
    new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 1,
      emissive: new THREE.Color(0x111111),
      emissiveIntensity: 0.5
    })
  );

  s.add(planet);

  /* =========================
     🌟 TEST OBJECT (ВАЖНО!)
     если его не видно → проблема не в городах
  ========================= */
  const test = new THREE.Mesh(
    new THREE.BoxGeometry(0.5,0.5,0.5),
    new THREE.MeshBasicMaterial({color:0xff0000})
  );

  test.position.set(3,0,0);
  s.add(test);

  /* =========================
     🏙 CITY GROUP
  ========================= */
  cityGroup = new THREE.Group();
  s.add(cityGroup);

  buildCity(1);
};

/* =========================
   🏙 BUILD CITY (VISIBLE FIX)
========================= */
window.buildCity = function (level) {

  const s = window.scene;
  if (!s || !cityGroup) return;

  cityGroup.clear();

  const count = 150 + level * 120;

  for (let i = 0; i < count; i++) {

    const h = Math.random() * 1.5 + 0.2;

    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, h, 0.06),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(0x444444)
      })
    );

    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;

    const r = 2.65;

    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.cos(theta);
    const z = r * Math.sin(theta) * Math.sin(phi);

    b.position.set(x,y,z);

    cityGroup.add(b);
  }

  console.log("🏙 CITY BUILT:", count);
};

/* =========================
   UPDATE CITY
========================= */
window.updateCity = function (level) {
  console.log("🔄 updateCity called:", level);
  buildCity(level);
};
