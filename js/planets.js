window.planet;

function createPlanet(){

const loader = new THREE.TextureLoader();

const tex = loader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

/* PLANET */
window.planet = new THREE.Mesh(
  new THREE.SphereGeometry(2.5,128,128),
  new THREE.MeshStandardMaterial({ map: tex })
);

scene.add(window.planet);

/* ATMOSPHERE */
const glow = new THREE.Mesh(
  new THREE.SphereGeometry(2.65,128,128),
  new THREE.MeshBasicMaterial({
    color:0x3399ff,
    transparent:true,
    opacity:0.12
  })
);

scene.add(glow);

/* CITIES */
for(let i=0;i<160;i++){

  const h = Math.random()*0.4+0.05;

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.02,h,0.02),
    new THREE.MeshStandardMaterial({color:0x888888})
  );

  const phi = Math.random()*Math.PI*2;
  const theta = Math.random()*Math.PI;

  const r = 2.52;

  box.position.set(
    r*Math.sin(theta)*Math.cos(phi),
    r*Math.cos(theta),
    r*Math.sin(theta)*Math.sin(phi)
  );

  box.userData.city = true; // 🔥 ВАЖНО ДЛЯ SYNC

  scene.add(box);
}

}
