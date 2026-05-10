window.app = {};

app.scene = new THREE.Scene();

app.camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

app.camera.position.z = 6;

app.renderer = new THREE.WebGLRenderer({ antialias: true });

app.renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.renderer.domElement);

/* 💡 СВЕТ */
app.scene.add(new THREE.AmbientLight(0x666666));

const light = new THREE.PointLight(0xffffff, 4);
light.position.set(5, 5, 5);
app.scene.add(light);

/* 🚀 START LOOP */
function loop() {
  requestAnimationFrame(loop);

  if (app.planet) {
    app.planet.rotation.y += 0.002;
  }

  app.renderer.render(app.scene, app.camera);
}

loop();

/* 🔥 ГЛОБАЛЬНЫЙ СТАРТ */
window.app = app;
