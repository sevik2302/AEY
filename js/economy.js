window.cityObjects = [];

/* =========================
   CITY GENERATION (ON SPHERE SURFACE)
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const radius = 2.02;

  const cityCount = 6;

  for (let i = 0; i < cityCount; i++) {

    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos((Math.random() * 2) - 1);

    const basePos = new THREE.Vector3(

      radius * Math.sin(theta) * Math.cos(phi),

      radius * Math.cos(theta),

      radius * Math.sin(theta) * Math.sin(phi)

    );

    const city = {
      base: basePos,
      buildings: []
    };

    const normal = basePos.clone().normalize();

    const baseBuildings = 14;

    for (let j = 0; j < baseBuildings; j++) {

      const height = 0.05;

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.02, height, 0.02),

        new THREE.MeshStandardMaterial({
          color: 0xdcdcdc,
          emissive: 0x000000
        })

      );

      /* =========================
         POSITION ON SPHERE (IMPORTANT FIX)
      ========================= */

      const offset = new THREE.Vector3(

        (Math.random() - 0.5) * 0.12,
        (Math.random() - 0.5) * 0.12,
        (Math.random() - 0.5) * 0.12

      );

      const pos = basePos.clone().add(offset);

      mesh.position.copy(pos);

      /* =========================
         ALIGN TO SURFACE NORMAL (KEY FIX)
      ========================= */

      mesh.lookAt(

        pos.clone().add(normal)

      );

      mesh.translateY(height / 2);

      mesh.userData.baseHeight = height;

      cityGroup.add(mesh);
      city.buildings.push(mesh);

    }

    cityObjects.push(city);
  }
};

/* =========================
   GROW SYSTEM (REALISTIC HEDGEHOG GROWTH)
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      const scale = 1 + level * 0.15;

      b.scale.y = scale;

      b.position.copy(
        b.position.clone().add(
          b.getWorldDirection(new THREE.Vector3()).multiplyScalar(0)
        )
      );

      /* skyscraper chance later */

      if (level > 5 && Math.random() > 0.96) {
        b.scale.y *= 3;
      }

      /* emissive night lights */

      if (level > 3) {
        b.material.emissive.setHex(0x111122);
        b.material.emissiveIntensity = 0.5;
      }

    });

  });

};

/* RESET */
window.resetCities = function () {
  generateCities();
};

/* INIT */
generateCities();
