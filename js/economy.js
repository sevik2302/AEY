window.cityObjects = [];

/* =========================
   SAFETY CHECK (FIX CRASHES)
========================= */

function safeScene(){
  if(typeof scene === "undefined"){
    console.error("Scene not ready");
    return false;
  }
  return true;
}

/* =========================
   CITY GROUP INIT (CRITICAL FIX)
========================= */

if(typeof cityGroup === "undefined"){
  window.cityGroup = new THREE.Group();
  scene.add(cityGroup);
}

/* =========================
   BASIC CITY GENERATION (STABLE VERSION)
========================= */

window.generateCities = function () {

  if(!safeScene()) return;

  cityGroup.clear();
  cityObjects = [];

  const radius = 2.02;
  const cityCount = 5;

  for (let i = 0; i < cityCount; i++) {

    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos((Math.random() * 2) - 1);

    const base = new THREE.Vector3(
      Math.sin(theta) * Math.cos(phi),
      Math.cos(theta),
      Math.sin(theta) * Math.sin(phi)
    ).multiplyScalar(radius);

    const normal = base.clone().normalize();

    const city = {
      base,
      buildings: []
    };

    for (let j = 0; j < 20; j++) {

      const height = 0.05 + Math.random() * 0.1;

      const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(0.03, height, 0.03),

        new THREE.MeshStandardMaterial({
          color: 0xd9d9d9,
          emissive: 0x000000
        })

      );

      /* POSITION ON SPHERE */
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      );

      const pos = base.clone().add(offset).normalize().multiplyScalar(radius);

      mesh.position.copy(
        pos.clone().add(normal.clone().multiplyScalar(height / 2))
      );

      mesh.lookAt(pos.clone().add(normal));

      mesh.userData.baseHeight = height;

      cityGroup.add(mesh);
      city.buildings.push(mesh);

    }

    cityObjects.push(city);
  }
};

/* =========================
   SAFE GROW FUNCTION
========================= */

window.growCities = function (level) {

  if(!cityObjects.length) return;

  cityObjects.forEach(city => {

    city.buildings.forEach(b => {

      const scale = 1 + level * 0.12;

      b.scale.y = scale;

      if(level > 3){
        b.material.emissive.setHex(0x111122);
        b.material.emissiveIntensity = 0.5;
      }

    });

  });

};

/* =========================
   RESET SAFE
========================= */

window.resetCities = function () {
  generateCities();
};

/* =========================
   AUTO INIT (IMPORTANT FIX)
========================= */

setTimeout(() => {
  generateCities();
}, 300);
