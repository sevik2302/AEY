APP.cityGroup =
    new THREE.Group();

/*
ВАЖНО:
добавляем НЕ в scene,
а в planetGroup
*/

APP.planetGroup.add(
    APP.cityGroup
);

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
   SPAWN CITIES
========================= */

window.spawnCities =
function(level=1){

    APP.cityGroup.clear();

    const count =
        32 + level*5;

    for(let i=0;i<count;i++){

        let normal;

        /*
        ищем сушу
        */

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

        /*
        маленькие здания
        */

        const height =
            0.10 +
            Math.random()*0.16 +
            level*0.007;

        const building =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.045,
                    height,
                    0.045
                ),

                new THREE.MeshToonMaterial({

                    color:0xfff8ef

                })

            );

        /*
        ПРИКРЕПЛЯЕМ
        к поверхности
        */

        const surfaceRadius =
            1.67;

        building.position.copy(

            normal.clone().multiplyScalar(
                surfaceRadius + height/2
            )

        );

        /*
        направление наружу
        */

        building.quaternion.setFromUnitVectors(

            new THREE.Vector3(0,1,0),

            normal

        );

        APP.cityGroup.add(
            building
        );

    }

};

spawnCities(1);
