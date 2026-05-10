window.scene = null;
window.camera = null;
window.renderer = null;

window.startRenderer = function(){

scene = new THREE.Scene();

/* CAMERA */
camera = new THREE.PerspectiveCamera(
  60,
  innerWidth / innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 8);

/* RENDERER */
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

/* LIGHT (ОЧЕНЬ ВАЖНО) */
const light = new THREE.PointLight(0xffffff, 6);
light.position.set(10,10,10);
scene.add(light);

scene.add(new THREE.AmbientLight(0x666666));

/* STARS */
const geo = new THREE.BufferGeometry();
const pos = [];

for(let i=0;i<5000;i++){
  pos.push((Math.random()-0.5)*200);
  pos.push((Math.random()-0.5)*200);
  pos.push((Math.random()-0.5)*200);
}

geo.setAttribute("position", new THREE.Float32BufferAttribute(pos,3));

const stars = new THREE.Points(
  geo,
  new THREE.PointsMaterial({color:0xffffff,size:0.15})
);

scene.add(stars);

/* PLANET INIT */
if(window.createPlanet){
  createPlanet();
}

/* LOOP */
function animate(){
  requestAnimationFrame(animate);

  if(window.planet){
    planet.rotation.y += 0.0015;
  }

  renderer.render(scene,camera);
}

animate();

}
