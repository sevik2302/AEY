let scene, camera, renderer;

function startRenderer(){

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  60, innerWidth/innerHeight, 0.1, 1000
);

camera.position.z = 14;

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 4);
light.position.set(10,10,10);
scene.add(light);

const geo = new THREE.BufferGeometry();
const pos = [];

for(let i=0;i<2000;i++){
  pos.push((Math.random()-0.5)*200);
  pos.push((Math.random()-0.5)*200);
  pos.push((Math.random()-0.5)*200);
}

geo.setAttribute("position", new THREE.Float32BufferAttribute(pos,3));

const stars = new THREE.Points(
  geo,
  new THREE.PointsMaterial({color:0xffffff,size:0.2})
);

scene.add(stars);

animate();

}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
