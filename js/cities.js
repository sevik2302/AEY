APP.cityGroup =
    new THREE.Group();

APP.scene.add(APP.cityGroup);

/* =========================
   LAND CHECK
========================= */

function isLand(normal){

    for(const p of LAND_AREAS){

        if(
            normal.distanceTo(p)
            < 0.09
        ){
            return true;
        }

    }

    return false;
}

/* =========================
   CITIES
========================= */

window.spawnCities =
function(level=1){

    APP.cityGroup.clear();

    const count =
        30 + level*5;

    for(let i=0;i<count;i++){

        let normal;

        for(let t=0;t<120;t++){

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
            0.12 +
            Math.random()*0.18 +
            level*0.008;

        const building =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.05,
                    height,
                    0.05
                ),

                new THREE.MeshToonMaterial({

                    color:0xfff7ec

                })

            );

        /* чуть выше суши */

        building.position.copy(

            normal.clone().multiplyScalar(
                1.68 + height/2
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
