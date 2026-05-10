let scene, camera, renderer;

function startRenderer(){

scene = new THREE.Scene();

/* CAMERA */
camera = new THREE.PerspectiveCamera(
  60, innerWidth/innerHeight, 0.1, 1000
);
camera.position.z = 10;

/* RENDER */
renderer = new THREE.WebGLRenderer({
  antialias:true,
  alpha:true
});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

/* SUN LIGHT */
const sun = new THREE.PointLight(0xffffff, 3);
sun.position.set(10,10,10);
scene.add(sun);

/* AMBIENT */
scene.add(new THREE.AmbientLight(0x222222));

/* STARS */
const geo = new THREE.BufferGeometry();
const pos = [];

for(let i=0;i<3000;i++){
  pos.push((Math.random()-0.5)*200);
  pos.push((Math.random()-0.5)*200);
  pos.push((Math.random()-0.5)*200);
}

geo.setAttribute("position", new THREE.Float32BufferAttribute(pos,3));

const stars = new THREE.Points(
  geo,
  new THREE.PointsMaterial({
    color:0xffffff,
    size:0.15
  })
);

scene.add(stars);

/* PLANET */
createPlanet();

animate();

}

function animate(){
  requestAnimationFrame(animate);
  if(window.planet) planet.rotation.y += 0.002;
  renderer.render(scene,camera);
}
