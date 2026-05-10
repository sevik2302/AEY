window.galaxy = [];
window.currentPlanet = 0;

/* CREATE GALAXY */
function createGalaxy(){

for(let i=0;i<4;i++){

  const g = new THREE.Group();

  const tex = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.5,64,64),
    new THREE.MeshStandardMaterial({map:tex})
  );

  const locked = i > 0;

  g.add(planet);

  g.position.x = i * 8;

  g.userData = {
    index: i,
    locked: locked
  };

  /* LOCK VISUAL */
  if(locked){
    const lock = new THREE.Mesh(
      new THREE.SphereGeometry(2.7,32,32),
      new THREE.MeshBasicMaterial({
        color:0xff0000,
        wireframe:true,
        transparent:true,
        opacity:0.2
      })
    );

    g.add(lock);
  }

  scene.add(g);
  galaxy.push(g);
}

}

/* SWITCH PLANET */
function switchPlanet(i){

  currentPlanet = i;

  cameraTargetX = galaxy[i].position.x;
}
