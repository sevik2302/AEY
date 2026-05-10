window.cityObjects = [];

/* =========================
   CREATE CITY ONCE
========================= */

window.generateCities =
  function(){

    cityGroup.clear();
    cityObjects = [];

    const radius = 2.01;

    const cityCount = 6;

    for(let i=0;i<cityCount;i++){

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos((Math.random()*2)-1);

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);

      const city = {
        baseX:x,
        baseY:y,
        baseZ:z,
        buildings:[]
      };

      const buildingsCount = 25;

      for(let b=0;b<buildingsCount;b++){

        const height = 0.05 + Math.random()*0.2;

        const mesh = new THREE.Mesh(

          new THREE.BoxGeometry(0.02, height, 0.02),

          new THREE.MeshStandardMaterial({
            color:0xdedede
          })

        );

        mesh.position.set(x,y,z);

        mesh.translateX((Math.random()-0.5)*0.15);
        mesh.translateZ((Math.random()-0.5)*0.15);

        mesh.userData.baseHeight = height;

        cityGroup.add(mesh);

        city.buildings.push(mesh);
      }

      cityObjects.push(city);
    }
  };

/* =========================
   GROW CITIES (NO TELEPORT)
========================= */

window.growCities =
  function(level){

    cityObjects.forEach(city=>{

      city.buildings.forEach(b=>{

        const target =
          b.userData.baseHeight *
          (1 + level * 0.15);

        b.scale.y = target / b.userData.baseHeight;

        b.position.y =
          city.baseY +
          (target / 2);
      });

    });

  };

/* =========================
   RESET
========================= */

window.resetCities =
  function(){

    generateCities();

  };

/* INIT */

generateCities();
