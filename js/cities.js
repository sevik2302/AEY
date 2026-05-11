APP.cityGroup =
    new THREE.Group();

APP.scene.add(APP.cityGroup);

window.spawnCities =
function(level=1){

    APP.cityGroup.clear();

    /* одинаковый спавн */

    CONTINENTS.forEach(continent=>{

        const center =
            continent.position.clone();

        const normal =
            center.clone().normalize();

        const count =
            8 + level;

        for(let i=0;i<count;i++){

            const h =
                0.08 +
                level*0.01 +
                Math.random()*0.12;

            const b =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        0.05,
                        h,
                        0.05
                    ),

                    new THREE.MeshToonMaterial({
                        color:0xffffff
                    })

                );

            const offset =
                new THREE.Vector3(

                    (Math.random()-0.5)*0.18,

                    (Math.random()-0.5)*0.18,

                    (Math.random()-0.5)*0.18

                );

            const pos =
                center.clone()
                .add(offset)
                .normalize()
                .multiplyScalar(2.34);

            b.position.copy(
                pos.clone().add(
                    normal.clone().multiplyScalar(h/2)
                )
            );

            b.quaternion.setFromUnitVectors(
                new THREE.Vector3(0,1,0),
                normal
            );

            APP.cityGroup.add(b);
        }

    });

}

spawnCities(1);
