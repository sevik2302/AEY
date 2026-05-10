window.scene = new THREE.Scene();
window.camera = null;
window.renderer = null;
window.planet = null;

window.startRenderer = function(){

/* CAMERA */
camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 6;

/* RENDERER */
renderer = new THREE.WebGLRenderer({
  antialias:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* LIGHT (СИЛЬНЫЙ) */
const light = new THREE.PointLight(0xffffff, 8);
light.position.set(5,5,5);
scene.add(light);

scene.add(new THREE.AmbientLight(0x777777));

/* BACKGROUND COLOR (ВАЖНО) */
scene.background = new THREE.Color(0x000000);

/* STARS (МИНИМАЛЬНО) */
const geo = new THREE.BufferGeometry();
const pos = [];

for(let i=0;i<2000;i++){
  pos.push((Math.random()-0.5)*100);
  pos.push((Math.random()-0.5)*100);
  pos.push((Math.random()-0.5)*100);
}

geo.setAttribute("position", new THREE.Float32BufferAttribute(pos,3));

const stars = new THREE.Points(
  geo,
  new THREE.PointsMaterial({color:0xffffff,size:0.2})
);

scene.add(stars);

/* 🔥 СЮДА ВСТАВЛЯЕМ ПЛАНЕТУ ПРЯМО ТУТ (НЕ В ДРУГОМ ФАЙЛЕ) */

const tex = new THREE.TextureLoader().load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

planet = new THREE.Mesh(
  new THREE.SphereGeometry(2,64,64),
  new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 1,
    metalness: 0
  })
);

planet.position.set(0,0,0);

scene.add(planet);

/* LOOP */
function animate(){
  requestAnimationFrame(animate);

  if(planet){
    planet.rotation.y += 0.002;
  }

  renderer.render(scene,camera);
}

animate();

}
