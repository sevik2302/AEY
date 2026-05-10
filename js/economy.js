window.generateCities =
  function(){

    cityGroup.clear();

    const radius = 2.01;

    const megaCities =
      4 + game.cityLevel;

    for(let c=0;c<megaCities;c++){

      const cityPhi =
        Math.random() *
        Math.PI * 2;

      const cityTheta =
        Math.acos(
          (Math.random()*2)-1
        );

      const cityX =
        radius *
        Math.sin(cityTheta) *
        Math.cos(cityPhi);

      const cityY =
        radius *
        Math.cos(cityTheta);

      const cityZ =
        radius *
        Math.sin(cityTheta) *
        Math.sin(cityPhi);

      const buildings =
        10 + game.cityLevel;

      for(let i=0;i<buildings;i++){

        const height =
          0.03 +
          Math.random()*0.35;

        const building =
          new THREE.Mesh(

            new THREE.BoxGeometry(
              0.02,
              height,
              0.02
            ),

            new THREE.MeshStandardMaterial({

              color:0xdedede,

              emissive:new THREE.Color(
                0x222222
              )

            })

          );

        building.position.set(

          cityX +
          (Math.random()-0.5)*0.18,

          cityY +
          (Math.random()-0.5)*0.18,

          cityZ +
          (Math.random()-0.5)*0.18

        );

        building.lookAt(0,0,0);

        building.translateY(
          height/2
        );

        cityGroup.add(building);
      }
    }
  };

generateCities();
