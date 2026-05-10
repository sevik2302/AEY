window.planet = null;
window.cityGroup = null;

window.createPlanet = function () {

  const scene = window.scene;

  if (!scene) {
    console.error("NO SCENE");
    return;
  }

  /* 🌍 ПЛАНЕТА */
  planet = new THREE.Mesh(
    new THREE.SphereGeometry(2, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x2266ff
    })
  );

  scene.add(planet);

  /* 💡 СВЕТ */
  const light = new THREE.PointLight(0xffffff, 5);
  light.position.set(5, 5, 5);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0x666666));

  /* 🏙 ГОРОДА (СЕЙЧАС В ВОЗДУХЕ — ДЛЯ ПРОВЕРКИ) */
  cityGroup = new THREE.Group();
  scene.add(cityGroup);

  buildCity(1);
};

window.buildCity = function (level) {

  const scene = window.scene;

  cityGroup.clear();

  console.log("BUILD CITY LEVEL:", level);

  const count = 100;

  for (let i = 0; i < count; i++) {

    const h = 0.5 + Math.random() * 2;

    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, h, 0.3),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x333333
      })
    );

    /* 🔥 ВАЖНО: РАЗБРОС В ВОЗДУХЕ (НЕ НА СФЕРЕ!) */
    b.position.set(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6
    );

    cityGroup.add(b);
  }
};

window.updateCity = function (level) {
  buildCity(level);
};
