AEY.cities = new THREE.Group();
AEY.scene.add(AEY.cities);

const R = 2.02;

function isLand(v){
  const n = v.clone().normalize();
  return Math.abs(n.y) > 0.25 && Math.sin(n.x*3)+Math.cos(n.z*3) > -0.2;
}

window.spawnCities = function(){

  AEY.cities.clear();

  for(let i=0;i<12;i++){

    let base;

    for(let t=0;t<100;t++){

      const phi = Math.random()*Math.PI*2;
      const theta = Math.acos((Math.random()*2)-1);

      base = new THREE.Vector3(
        Math.sin(theta)*Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta)*Math.sin(phi)
      ).multiplyScalar(R);

      if(isLand(base)) break;
    }

    const normal = base.clone().normalize();

    for(let j=0;j<80;j++){

      const h = 0.03 + Math.random()*0.35;

      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.012,h,0.012),
        new THREE.MeshStandardMaterial({
          color:0xffffff,
          emissive:0x0b0f1f
        })
      );

      const offset = new THREE.Vector3(
        (Math.random()-0.5)*0.05,
        (Math.random()-0.5)*0.05,
        (Math.random()-0.5)*0.05
      );

      const pos = base.clone().add(offset)
        .normalize()
        .multiplyScalar(R);

      m.position.copy(
        pos.clone().add(normal.clone().multiplyScalar(h/2))
      );

      m.quaternion.setFromUnitVectors(
        new THREE.Vector3(0,1,0),
        normal
      );

      AEY.cities.add(m);
    }
  }
};

setTimeout(spawnCities,600);
