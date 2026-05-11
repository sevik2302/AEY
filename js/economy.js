window.cityObjects = [];

const RADIUS = 2.02;

/* =========================
   LAND DETECTION FROM TEXTURE IDEA
========================= */

/*
  ВАЖНО:
  мы НЕ читаем пиксели (это сложно в real-time),
  а используем приближение:
  - города только в "умеренных широтах"
  - чтобы не спавнились в океанах
*/

function isLandLike(pos) {

  const n = pos.clone().normalize();

  const lat = n.y;

  /* исключаем полюса + океанические зоны */
  return Math.abs(lat) < 0.85;

}

/* =========================
   CITY GENERATION
========================= */

window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const cityCount = 10;

  for (let i = 0; i < cityCount; i++) {

    let base;

    for (let tries = 0; tries < 50; tries++) {

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos((Math.random() * 2) - 1);

      base = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
      ).multiplyScalar(RADIUS);

      if (isLandLike(base)) break;

    }

    const normal = base.clone().normalize();

    const city = {
      base,
      buildings: []
    };

    const density = 60;

    for (let j = 0; j < density; j++) {

      const height =
        0.02 + Math.pow(Math.random(), 2) * 1.2;

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.02, height, 0.02),

        new THREE.MeshStandardMaterial({
          color: 0xdcdcdc,
          emissive: 0x000000
        })

      );

      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.12,
        (Math.random() - 0.5) * 0.12,
        (Math.random() - 0.5) * 0.12
      );

      const pos = base.clone()
        .add(offset)
        .normalize()
        .multiplyScalar(RADIUS);

      mesh.position.copy(
        pos.clone().add(
          normal.clone().multiplyScalar(height / 2)
        )
      );

      /* правильная ориентация */
      mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0,1,0),
        normal
      );

      mesh.userData.normal = normal;

      cityGroup.add(mesh);
      city.buildings.push(mesh);

    }

    cityObjects.push(city);
  }
};

/* =========================
   GROW SYSTEM
========================= */

window.growCities = function (level) {

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      const scale = 1 + level * 0.25;

      b.scale.y = scale;

      if (level > 3) {
        b.material.emissive.setHex(0x111133);
        b.material.emissiveIntensity = 0.5;
      }

      if (level > 7 && Math.random() > 0.97) {
        b.scale.y *= 3;
      }

    });

  });

};

/* INIT */
setTimeout(() => generateCities(), 300);
