APP.cityGroup =
    new THREE.Group();

/* прикрепляем к планете */

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
   CREATE BUILDING
========================= */

function createBuilding(height){

    const group =
        new THREE.Group();

    /* =====================
       MAIN BUILDING
    ===================== */

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.05,
                height,
                0.05
            ),

            new THREE.MeshToonMaterial({

                color:0xfff7ed

            })

        );

    group.add(body);

    /* =====================
       ROOF
    ===================== */

    const roof =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.045,
                0.04,
                4
            ),

            new THREE.MeshToonMaterial({

                color:0xff6b5e

            })

        );

    roof.position.y =
        height/2 + 0.02;

    roof.rotation.y =
        Math.PI * 0.25;

    group.add(roof);

    /* =====================
       WINDOWS
    ===================== */

    const windowMaterial =
        new THREE.MeshToonMaterial({

            color:0x8ed8ff

        });

    const rows =
        Math.max(
            2,
            Math.floor(height * 10)
        );

    for(let y=0;y<rows;y++){

        for(let side=0;side<4;side++){

            const win =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        0.012,
                        0.012,
                        0.002
                    ),

                    windowMaterial

                );

            const py =
                -height/2 +
                0.04 +
                y*0.03;

            /* FRONT */

            if(side === 0){

                win.position.set(
                    0,
                    py,
                    0.026
                );

            }

            /* BACK */

            if(side === 1){

                win.position.set(
                    0,
                    py,
                    -0.026
                );

            }

            /* LEFT */

            if(side === 2){

                win.position.set(
                    -0.026,
                    py,
                    0
                );

                win.rotation.y =
                    Math.PI/2;

            }

            /* RIGHT */

            if(side === 3){

                win.position.set(
                    0.026,
                    py,
                    0
                );

                win.rotation.y =
                    Math.PI/2;

            }

            group.add(win);

        }

    }

    return group;
}

/* =========================
   SPAWN CITIES
========================= */

window.spawnCities =
function(level=1){

    APP.cityGroup.clear();

    const count =
        30 + level*5;

    for(let i=0;i<count;i++){

        let normal;

        /* ищем сушу */

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
        высота здания
        */

        const height =
            0.10 +
            Math.random()*0.14 +
            level*0.006;

        const building =
            createBuilding(height);

        /*
        поверхность
        */

        const radius =
            1.67;

        building.position.copy(

            normal.clone().multiplyScalar(
                radius + height/2
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
