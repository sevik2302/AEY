window.scene = new THREE.Scene();

window.camera = new THREE.PerspectiveCamera(
  50,
  innerWidth / innerHeight,
  0.1,
  2000
);

camera.position.set(0, 0, 6);

window.renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

/* LIGHT */
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5,3,4);
scene.add(sun);

scene.add(new THREE.AmbientLight(0x223344, 0.7));

/* BLOOM */
window.composer = new THREE.EffectComposer(renderer);

composer.addPass(new THREE.RenderPass(scene, camera));

composer.addPass(new THREE.UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  1.0, 0.5, 0.2
));

/* STARFIELD */
const g = new THREE.BufferGeometry();
const p = [];

for(let i=0;i<10000;i++){
  p.push((Math.random()-0.5)*800);
  p.push((Math.random()-0.5)*800);
  p.push((Math.random()-0.5)*800);
}

g.setAttribute("position", new THREE.Float32BufferAttribute(p,3));

const stars = new THREE.Points(
  g,
  new THREE.PointsMaterial({color:0xffffff,size:0.03})
);

scene.add(stars);

/* RESIZE */
window.addEventListener("resize",()=>{

  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth,innerHeight);
  composer.setSize(innerWidth,innerHeight);

});

/* LOOP */
function animate(){

  requestAnimationFrame(animate);

  if(window.planet) planet.rotation.y += 0.001;

  if(window.clouds) clouds.rotation.y += 0.0015;

  composer.render();

}

animate();
