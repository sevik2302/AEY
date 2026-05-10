window.planet = null;
window.cityGroup = null;

window.createPlanet = function () {

  const scene = window.scene;

  if (!scene) {
    console.error("❌ NO SCENE FOUND");
    return;
  }

  console.log("✅ SCENE OK");

  const tex = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  /* 🌍 ПЛАНЕТА (УПРОЩЕННАЯ) */
  planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 64, 64),
    new THREE.MeshStandardMaterial({ map: tex })
  );

  scene.add(planet);

  /* 🔴 ТЕСТ-КУБ (ОЧЕНЬ ВАЖНО) */
  const test = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );

  test.position.set(4,0,0);
  scene.add(test);

  console.log("🔴 TEST CUBE ADDED");

  /* 🏙 ГОРОДА */
  cityGroup = new THREE.Group();
  scene.add(cityGroup);

  buildCity(1);
};

window.buildCity = function (level) {

  const scene = window.scene;

  if (!scene || !cityGroup) {
    console.log("❌ NO SCENE OR CITYGROUP");
    return;
  }

  cityGroup.clear();

  console.log("🏙 BUILD CITY LEVEL:", level);

  const count = 50; // МАЛО, НО ОЧЕНЬ ВИДИМО

  for (let i = 0; i < count; i++) {

    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.3 + level, 0.3),
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    );

    /* 💥 РАЗМЕЩАЕМ ПРЯМО ПЕРЕД КАМЕРОЙ (ВАЖНО ДЛЯ ТЕСТА) */
    b.position.set(
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3
    );

    cityGroup.add(b);
  }

  console.log("🏙 CITY COUNT:", count);
};

window.updateCity = function (level) {
  console.log("🔄 UPDATE CITY:", level);
  buildCity(level);
};
