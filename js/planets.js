(function () {

  function waitForApp() {

    if (!window.app || !app.scene) {
      console.log("WAITING FOR SCENE...");
      return setTimeout(waitForApp, 100);
    }

    initPlanet();
  }

  function initPlanet() {

    console.log("PLANET INIT START");

    /* 🌍 ПЛАНЕТА (100% ВИДИМАЯ) */
    app.planet = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x1e90ff
      })
    );

    app.scene.add(app.planet);

    console.log("PLANET ADDED");

    /* 🏙 ГОРОДА */
    app.cityGroup = new THREE.Group();
    app.scene.add(app.cityGroup);

    buildCity(1);

    console.log("PLANET SYSTEM READY");
  }

  /* =========================
     🏙 ГОРОДА (ЖЁСТКИЙ ТЕСТ)
  ========================= */
  function buildCity(level) {

    if (!app.cityGroup) return;

    app.cityGroup.clear();

    const count = 120;

    for (let i = 0; i < count; i++) {

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25 + level, 0.25),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );

      cube.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );

      app.cityGroup.add(cube);
    }

    console.log("CITY BUILT:", count);
  }

  /* =========================
     EXPOSE API
  ========================= */
  window.app.buildCity = buildCity;
  window.app.updateCity = buildCity;

  /* 🚀 START */
  waitForApp();

})();
