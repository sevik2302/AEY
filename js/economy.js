window.generateCities = function () {

  cityGroup.clear();
  cityObjects = [];

  const radius = 2.02;

  const cityCount = 6;

  for (let i = 0; i < cityCount; i++) {

    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos((Math.random() * 2) - 1);

    /* 🎯 точка на сфере */
    const base = new THREE.Vector3(
      Math.sin(theta) * Math.cos(phi),
      Math.cos(theta),
      Math.sin(theta) * Math.sin(phi)
    ).multiplyScalar(radius);

    const city = {
      base,
      buildings: []
    };

    const normal = base.clone().normalize();

    for (let j = 0; j < 18; j++) {

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.02, 0.05, 0.02),

        new THREE.MeshStandardMaterial({
          color: 0xdcdcdc
        })

      );

      /* 🎯 random offset по поверхности */
      const tangent = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5)
      ).normalize().multiplyScalar(0.1);

      /* 🎯 правильная позиция */
      const pos = base.clone()
        .add(tangent)
        .normalize()
        .multiplyScalar(radius);

      /* 🎯 ВЫТЯГИВАЕМ НАРУЖУ ПО НОРМАЛИ */
      const height = 0.05;

      mesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(height / 2)));

      /* 🎯 ОРИЕНТАЦИЯ ВНЕШУ */
      mesh.lookAt(pos.clone().add(normal));

      mesh.userData.normal = normal;
      mesh.userData.basePos = pos;
      mesh.userData.baseHeight = height;

      cityGroup.add(mesh);
      city.buildings.push(mesh);
    }

    cityObjects.push(city);
  }
};
