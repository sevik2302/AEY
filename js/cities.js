APP.cityGroup =
    new THREE.Group();

APP.scene.add(APP.cityGroup);

const PLANET_RADIUS = 1.7;

/* =========================
   CHECK LAND
========================= */

function isLand(normal){

    for(const p of LAND_POINTS){

        const dx = normal.x - p.x;
        const dy = normal.y - p.y;
        const dz = normal.z - p.z;

        const dist =
            Math.sqrt(
                dx*dx +
                dy*dy +
                dz*dz
            );

        if(dist < p.radius*0.82){

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

    const cityCount =
        120 + level*12;

    for(let i=0;i<cityCount;i++){

        let normal;

        /* FIND LAND */

        for(let t=0;t<100;t++){

            const phi =
                Math.random()*Math.PI*2;

            const theta =
                Math.random()*Math.PI;

            normal =
                new THREE.Vector3(

                    Math.sin(theta)*Math.cos(phi),

                    Math.cos(theta),

                    Math.sin(theta)*Math.sin(phi)

                );

            if(isLand(normal)){
                break;
            }

        }

        const height =
            0.05 +
            Math.random()*0.14 +
            level*0.004;

        const building =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.03,
                    height,
                    0.03
                ),

                new THREE.MeshToonMaterial({

                    color:0xffffff

                })

            );

        /* POSITION */

        const pos =
            normal.clone()
            .multiplyScalar(
                PLANET_RADIUS +
                height/2
            );

        building.position.copy(pos);

        /* ROTATION */

        building.quaternion.setFromUnitVectors(

            new THREE.Vector3(0,1,0),

            normal

        );

        APP.cityGroup.add(building);

    }

}

spawnCities(1);
