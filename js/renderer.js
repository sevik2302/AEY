const scene = new THREE.Scene();

/* =========================
   CINEMATIC CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  2000
);

camera.position.set(0, 0.15, 6.8);

/* =========================
   RENDERER (FILM QUALITY)
========================= */

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance"
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;

document.body.appendChild(renderer.domElement);

/* =========================
   LIGHTING (FINAL BALANCE)
========================= */

const sun = new THREE.DirectionalLight(0xffffff, 2.3);
sun.position.set(6, 3, 4);
scene.add(sun);

scene.add(new THREE.AmbientLight(0x1a2233, 0.75));

/* =========================
   BLOOM (CONTROLLED CINEMA LOOK)
========================= */

const composer = new THREE.EffectComposer(renderer);

composer.addPass(new THREE.RenderPass(scene, camera));

const bloom = new THREE.UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  1.0,   // strength
  0.45,  // radius
  0.18   // threshold
);

composer.addPass(bloom);

/* =========================
   STARS (DEPTH LAYERS)
========================= */

const geo = new THREE.BufferGeometry();
const pos = [];

for (let i = 0; i < 16000; i++) {

  pos.push((Math.random() - 0.5) * 1000);
  pos.push((Math.random() - 0.5) * 1000);
  pos.push((Math.random() - 0.5) * 1000);

}

geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));

const stars = new THREE.Points(
  geo,
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.025
  })
);

scene.add(stars);

/* =========================
   CAMERA DRIFT (CINEMATIC FINAL TOUCH)
========================= */

let t = 0;

/* =========================
   LOOP
========================= */

function animate() {

  requestAnimationFrame(animate);

  t += 0.001;

  if (window.planet) planet.rotation.y += 0.001;

  if (window.clouds) clouds.rotation.y += 0.0015;

  camera.position.x = Math.sin(t) * 0.2;
  camera.position.y = Math.cos(t * 0.6) * 0.08;
  camera.position.z = 6.8 + Math.sin(t * 0.3) * 0.15;

  camera.lookAt(0, 0, 0);

  composer.render();

}

animate();

/* resize */
window.addEventListener("resize", () => {

  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);

});
