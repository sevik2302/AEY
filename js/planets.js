window.planet = null;

window.createPlanet = function(){

if(!window.scene){
  console.error("Scene not ready");
  return;
}

const tex = new THREE.TextureLoader().load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

/* PLANET */
planet = new THREE.Mesh(
  new THREE.SphereGeometry(2.5,128,128),
  new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.9,
    metalness: 0.1
  })
);

planet.position.set(0,0,0);
scene.add(planet);

/* ATMOSPHERE */
const glow = new THREE.Mesh(
  new THREE.SphereGeometry(2.65,128,128),
  new THREE.MeshBasicMaterial({
    color:0x66ccff,
    transparent:true,
    opacity:0.25
  })
);

scene.add(glow);

/* CITIES */
for(let i=0;i<200;i++){

  const h = Math.random()*0.5+0.05;

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.02,h,0.02),
    new THREE.MeshStandardMaterial({
      color:0xbfbfbf
    })
  );

  const phi = Math.random()*Math.PI*2;
  const theta = Math.random()*Math.PI;

  const r = 2.55;

  box.position.set(
    r*Math.sin(theta)*Math.cos(phi),
    r*Math.cos(theta),
    r*Math.sin(theta)*Math.sin(phi)
  );

  box.userData.city = true;

  scene.add(box);
}

}
