app.planet = null;
app.cityGroup = null;

app.createPlanet = function () {

  console.log("CREATE PLANET OK");

  /* 🌍 ПРОСТАЯ ПЛАНЕТА (БЕЗ ТЕКСТУР) */
  app.planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x2266ff
    })
  );

  app.scene.add(app.planet);

  console.log("PLANET ADDED TO SCENE");

  /* 🏙 ГОРОДА */
  app.cityGroup = new THREE.Group();
  app.scene.add(app.cityGroup);

  app.buildCity(1);
};

/* =========================
   🏙 ГОРОДА (100% ВИДИМОСТЬ)
========================= */
app.buildCity = function (level) {

  app.cityGroup.clear();

  console.log("BUILD CITY:", level);

  const count = 100;

  for (let i = 0; i < count; i++) {

    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.3 + level, 0.3),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    b.position.set(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    );

    app.cityGroup.add(b);
  }

  console.log("CITY COUNT:", count);
};

app.updateCity = function (level) {
  app.buildCity(level);
};

/* 🚀 ГАРАНТИРОВАННЫЙ ЗАПУСК */
setTimeout(() => {
  app.createPlanet();
}, 100);
