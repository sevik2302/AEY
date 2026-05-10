window.scene = new THREE.Scene();
window.camera = null;
window.renderer = null;

function start() {

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 6;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  /* 💡 СВЕТ */
  scene.add(new THREE.AmbientLight(0x777777));

  const light = new THREE.PointLight(0xffffff, 5);
  light.position.set(5, 5, 5);
  scene.add(light);

  /* 🌍 ВАЖНО: планета создаётся ТОЛЬКО ПОСЛЕ сцены */
  if (window.createPlanet) {
    createPlanet();
  }

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  if (window.planet) {
    planet.rotation.y += 0.002;
  }

  renderer.render(scene, camera);
}

/* 🚀 СТАРТ */
start();
