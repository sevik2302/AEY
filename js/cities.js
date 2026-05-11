APP.cityGroup =
    new THREE.Group();

APP.scene.add(APP.cityGroup);

function isLand(normal){

    for(const p of LAND_AREAS){

        if(
            normal.distanceTo(p)
            < 0.38
        ){
            return true;
        }

    }

    return false;
}

window.spawnCities =
function(level=1){

    APP.cityGroup.clear();

    const count =
        40 + level*6;

    for(let i=0;i<count;i++){

        let normal;

        for(let t=0;t<80;t++){

            const phi =
                Math.random()*Math.PI*2;

            const theta =
                Math.random()*Math.PI;

            normal =
                new THREE.Vector3(

                    Math.sin(theta)*Math.cos(phi),

                    Math.cos(theta),

                    Math.sin(theta)*Math.sin(phi)

                ).normalize();

            if(isLand(normal)){
                break;
            }

        }

        const height =
            0.16 +
            Math.random()*0.35 +
            level*0.01;

        const building =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.08,
                    height,
                    0.08
                ),

                new THREE.MeshToonMaterial({

                    color:0xfff8ef

                })

            );

        building.position.copy(

            normal.clone().multiplyScalar(
                2 + height/2
            )

        );

        building.quaternion.setFromUnitVectors(

            new THREE.Vector3(0,1,0),

            normal

        );

        APP.cityGroup.add(building);

    }

};

spawnCities(1);
