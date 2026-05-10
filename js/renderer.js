const scene = new THREE.Scene();

/* FOG */
scene.fog = new THREE.FogExp2(0x000000, 0.03);

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  60, innerWidth/innerHeight, 0.1, 1000
);
camera.position.z = 14;

/* RENDER */
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

/* LIGHT */
const sun = new THREE.PointLight(0xffffff, 4);
sun.position.set(10,10,10);
scene.add(sun);

scene.add(new THREE.AmbientLight(0x222222));

/* STARS */
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
