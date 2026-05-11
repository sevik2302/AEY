window.AEY = {};

/* SCENE */
AEY.scene = new THREE.Scene();

/* CAMERA */
AEY.camera = new THREE.PerspectiveCamera(
  50,
  innerWidth / innerHeight,
  0.1,
  2000
);

AEY.camera.position.set(0,2,7);

/* RENDERER */
AEY.renderer = new THREE.WebGLRenderer({antialias:true});
AEY.renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(AEY.renderer.domElement);

/* LIGHT */
const sun = new THREE.DirectionalLight(0xffffff,2);
sun.position.set(5,5,5);
AEY.scene.add(sun);

AEY.scene.add(new THREE.AmbientLight(0x223344,0.7));

/* STARFIELD */
const geo = new THREE.BufferGeometry();
const pos = [];

for(let i=0;i<9000;i++){
  pos.push((Math.random()-0.5)*700);
  pos.push((Math.random()-0.5)*700);
  pos.push((Math.random()-0.5)*700);
}

geo.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));

const stars = new THREE.Points(
  geo,
  new THREE.PointsMaterial({color:0xffffff,size:0.02})
);

AEY.scene.add(stars);

/* LOOP */
function animate(){

  requestAnimationFrame(animate);

  if(AEY.planet) AEY.planet.rotation.y += 0.001;
  if(AEY.clouds) AEY.clouds.rotation.y += 0.0013;
  if(AEY.cities) AEY.cities.rotation.y += 0.0004;

  AEY.renderer.render(AEY.scene,AEY.camera);
}

animate();

/* RESIZE */
window.addEventListener("resize",()=>{
  AEY.camera.aspect = innerWidth/innerHeight;
  AEY.camera.updateProjectionMatrix();
  AEY.renderer.setSize(innerWidth,innerHeight);
});
