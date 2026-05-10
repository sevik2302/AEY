let scene, camera, renderer;

function startRenderer(){

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  60, innerWidth/innerHeight, 0.1, 1000
);

camera.position.z = 9;

renderer = new THREE.WebGLRenderer({
  antialias:true
});

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

/* 🌞 УСИЛЕННЫЙ СВЕТ (ВАЖНО!) */
const sun = new THREE.PointLight(0xffffff, 5);
sun.position.set(10,10,10);
scene.add(sun);

/* ambient brighter */
scene.add(new THREE.AmbientLight(0x555555));

/* STARS */
const geo = new THREE.BufferGeometry();
const pos = [];

for(let i=0;i<4000;i++){
  pos.push((Math.random()-0.5)*200);
  pos.push((Math.random()-0.5)*200);
  pos.push((Math.random()-0.5)*200);
}

geo.setAttribute("position", new THREE.Float32BufferAttribute(pos,3));

const stars = new THREE.Points(
  geo,
  new THREE.PointsMaterial({color:0xffffff,size:0.12})
);

scene.add(stars);

createPlanet();

animate();

}

function animate(){
  requestAnimationFrame(animate);

  if(window.planet)
    planet.rotation.y += 0.0015;

  renderer.render(scene,camera);
}
