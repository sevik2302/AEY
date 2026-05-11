const loader = new THREE.TextureLoader();

const earth = loader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

const clouds = loader.load(
  "https://threejs.org/examples/textures/planets/earth_clouds_1024.png"
);

/* PLANET */
AEY.planet = new THREE.Mesh(
  new THREE.SphereGeometry(2,96,96),
  new THREE.MeshStandardMaterial({
    map:earth,
    roughness:1
  })
);

AEY.scene.add(AEY.planet);

/* CLOUDS */
AEY.clouds = new THREE.Mesh(
  new THREE.SphereGeometry(2.05,96,96),
  new THREE.MeshStandardMaterial({
    map:clouds,
    transparent:true,
    opacity:0.3
  })
);

AEY.scene.add(AEY.clouds);

/* ATMOSPHERE */
const atm = new THREE.Mesh(
  new THREE.SphereGeometry(2.1,64,64),
  new THREE.MeshBasicMaterial({
    color:0x66aaff,
    transparent:true,
    opacity:0.06
  })
);

AEY.scene.add(atm);
