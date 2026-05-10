window.planet = null;
window.cityGroup = null;

/* =========================
   CREATE PLANET (DAY + NIGHT)
========================= */
window.createPlanet = function(){

const loader = new THREE.TextureLoader();

/* 🌍 ДЕНЬ */
const dayTex = loader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

/* 🌃 НОЧЬ (ОГНИ ГОРОДОВ NASA STYLE) */
const nightTex = loader.load(
  "https://threejs.org/examples/textures/planets/earth_lights_2048.png"
);

/* MATERIAL WITH NIGHT LIGHT */
const material = new THREE.MeshStandardMaterial({
  map: dayTex,
  emissiveMap: nightTex,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 1.2,
  roughness: 1,
  metalness: 0
});

/* 🌍 PLANET */
planet = new THREE.Mesh(
  new THREE.SphereGeometry(2.6,128,128),
  material
);

scene.add(planet);

/* 🌫 ATMOSPHERE */
const glow = new THREE.Mesh(
  new THREE.SphereGeometry(2.75,128,128),
  new THREE.MeshBasicMaterial({
    color:0x4aa3ff,
    transparent:true,
    opacity:0.18
  })
);

scene.add(glow);

/* =========================
   CITY SYSTEM (MEGACITY)
========================= */
cityGroup = new THREE.Group();
scene.add(cityGroup);

buildCity(1);

}

/* =========================
   BUILD CITY (MEGAPOLIS SYSTEM)
========================= */
window.buildCity = function(level){

  if(!cityGroup) return;

  cityGroup.clear();

  /* 📊 чем выше build → тем плотнее города */
  const density = 80 + level * 60;

  for(let i=0;i<density;i++){

    const height = Math.random()*0.8 + 0.1 + level*0.03;

    const building = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, height, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        emissive: new THREE.Color(0x111111)
      })
    );

    /* 🌍 размещение по сфере */
    const phi = Math.random()*Math.PI*2;
    const theta = Math.random()*Math.PI;

    const r = 2.58;

    building.position.set(
      r*Math.sin(theta)*Math.cos(phi),
      r*Math.cos(theta),
      r*Math.sin(theta)*Math.sin(phi)
    );

    cityGroup.add(building);
  }

}

/* =========================
   UPDATE CITY (CALLED FROM GAME.JS)
========================= */
window.updateCity = function(level){

  if(!cityGroup) return;

  buildCity(level);

}
