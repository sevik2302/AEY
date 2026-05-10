const loader = new THREE.TextureLoader();

const earth = loader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

const clouds = loader.load(
  "https://threejs.org/examples/textures/planets/earth_clouds_1024.png"
);

let planets = [];
let current = 0;

function createPlanet(x, locked){

  const g = new THREE.Group();

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(2,128,128),
    new THREE.MeshStandardMaterial({map:earth})
  );

  const cloud = new THREE.Mesh(
    new THREE.SphereGeometry(2.05,128,128),
    new THREE.MeshStandardMaterial({
      map:clouds,
      transparent:true,
      opacity:0.4
    })
  );

  const city = new THREE.Group();

  for(let i=0;i<60;i++){

    const h = Math.random()*1.2+0.1;

    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.05,h,0.05),
      new THREE.MeshStandardMaterial({color:0x888888})
    );

    b.position.set(
      (Math.random()-0.5)*2,
      2,
      (Math.random()-0.5)*2
    );

    city.add(b);
  }

  g.add(planet);
  g.add(cloud);
  g.add(city);

  g.position.x = x;
  g.userData.locked = locked;

  scene.add(g);
  planets.push(g);
}

createPlanet(0,false);
createPlanet(6,false);
createPlanet(12,true);
createPlanet(18,true);

function animate(){

  requestAnimationFrame(animate);

  planets.forEach(p=>{
    p.rotation.y += 0.002;
  });

  camera.position.x +=
    (planets[current].position.x - camera.position.x)*0.05;

  camera.lookAt(planets[current].position);

  renderer.render(scene,camera);
}

animate();

function nextPlanet(){
  current++;
  if(current >= planets.length) current = 0;
}
