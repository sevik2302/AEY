window.cityGroup = null;
window.cityLevel = 0;

window.createPlanet = function(){

const tex = new THREE.TextureLoader().load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

planet = new THREE.Mesh(
  new THREE.SphereGeometry(2.5,128,128),
  new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.9,
    metalness: 0.05
  })
);

scene.add(planet);

/* 🌆 CITY GROUP */
cityGroup = new THREE.Group();
scene.add(cityGroup);

/* BASE CITY */
buildCity(0);

}

/* 🏙 BUILD CITY SYSTEM */
window.buildCity = function(level){

  // чем больше уровень — тем больше зданий
  const count = 20 + level * 25;

  for(let i=0;i<count;i++){

    const h = Math.random()*0.6 + 0.05 + level*0.05;

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, h, 0.03),
      new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        emissive: new THREE.Color(0x111111)
      })
    );

    const phi = Math.random()*Math.PI*2;
    const theta = Math.random()*Math.PI;

    const r = 2.55;

    box.position.set(
      r*Math.sin(theta)*Math.cos(phi),
      r*Math.cos(theta),
      r*Math.sin(theta)*Math.sin(phi)
    );

    cityGroup.add(box);
  }

  /* 🌙 NIGHT LIGHT GLOW (ВАЖНО ДЛЯ ВИЗУАЛА) */
  const glow = new THREE.PointLight(0x66ccff, level*0.4);
  glow.position.set(0,0,0);
  scene.add(glow);
}

/* 🔥 ОБНОВЛЕНИЕ ГОРОДА */
window.updateCity = function(level){

  if(!cityGroup) return;

  // очищаем старый город
  cityGroup.clear();

  // строим новый
  buildCity(level);

}
