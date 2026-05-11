const loader = new THREE.TextureLoader();

const earth = loader.load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg");
const cloud = loader.load("https://threejs.org/examples/textures/planets/earth_clouds_1024.png");

/* PLANET */
window.planet = new THREE.Mesh(
  new THREE.SphereGeometry(2,128,128),
  new THREE.MeshStandardMaterial({map:earth})
);

scene.add(planet);

/* CLOUDS */
window.clouds = new THREE.Mesh(
  new THREE.SphereGeometry(2.03,128,128),
  new THREE.MeshStandardMaterial({
    map:cloud,
    transparent:true,
    opacity:0.4
  })
);

scene.add(clouds);

/* CITY ROOT */
window.cityGroup = new THREE.Group();
scene.add(cityGroup);

/* SAFE INIT */
console.log("PLANETS OK");
