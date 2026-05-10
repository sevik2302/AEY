window.planet = null;
window.cityGroup = null;

window.createPlanet = function () {

  console.log("PLANET INIT OK");

  const tex = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  /* 🌍 ПЛАНЕТА */
  planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 64, 64),
    new THREE.MeshStandardMaterial({ map: tex })
  );

  scene.add(planet);

  /* 🔴 ТЕСТ-КУБ (ОЧЕНЬ ВАЖНО) */
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );

  cube.position.set(3, 0, 0);

  scene.add(cube);

  console.log("RED CUBE SHOULD BE VISIBLE");

  /* 🏙 ГОРОДА */
  cityGroup = new THREE.Group();
  scene.add(cityGroup);

  buildCity(1);
};

window.buildCity = function (level) {

  cityGroup.clear();

  console.log("BUILD CITY:", level);

  for (let i = 0; i < 50; i++) {

    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.4 + level, 0.4),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    b.position.set(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    );

    scene.add(b);
  }
};

window.updateCity = function (level) {
  buildCity(level);
};
