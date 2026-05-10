app.planet = null;
app.cityGroup = null;

app.createPlanet = function () {

  const tex = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  /* 🌍 ПЛАНЕТА */
  app.planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 64, 64),
    new THREE.MeshStandardMaterial({ map: tex })
  );

  app.scene.add(app.planet);

  /* 🔴 ТЕСТ (ЧТОБЫ ВСЕГДА ВИДЕТЬ) */
  const test = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );

  test.position.set(3, 0, 0);
  app.scene.add(test);

  /* 🏙 ГОРОДА */
  app.cityGroup = new THREE.Group();
  app.scene.add(app.cityGroup);

  app.buildCity(1);
};

/* 🏙 ГОРОДА */
app.buildCity = function (level) {

  app.cityGroup.clear();

  const count = 80;

  for (let i = 0; i < count; i++) {

    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2 + level, 0.2),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );

    b.position.set(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    );

    app.cityGroup.add(b);
  }
};

/* 🔁 UPDATE */
app.updateCity = function (level) {
  app.buildCity(level);
};

/* 🚀 АВТОЗАПУСК */
app.createPlanet();
