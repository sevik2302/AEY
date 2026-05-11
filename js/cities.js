APP.cityGroup =
    new THREE.Group();

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
   BUILDING
========================= */

function createBuilding(type,height){

    const group =
        new THREE.Group();

    let bodyColor =
        0xfff7ed;

    if(type === "tower"){

        bodyColor =
            0xdff4ff;

    }

    if(type === "factory"){

        bodyColor =
            0xffddb5;

    }

    /* BODY */

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.05,
                height,
                0.05
            ),

            new THREE.MeshToonMaterial({

                color:bodyColor

            })

        );

    group.add(body);

    /* ROOF */

    const roof =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.045,
                0.04,
                4
            ),

            new THREE.MeshToonMaterial({

                color:0xff725c

            })

        );

    roof.position.y =
        height/2 + 0.02;

    roof.rotation.y =
        Math.PI*0.25;

    group.add(roof);

    /* WINDOWS */

    const windowMaterial =
        new THREE.MeshToonMaterial({

            color:0x8ed8ff,
            emissive:0x4db8ff,
            emissiveIntensity:0.4

        });

    const rows =
        Math.max(
            2,
            Math.floor(height*10)
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

            if(side===0){

                win.position.set(
                    0,
                    py,
                    0.026
                );

            }

            if(side===1){

                win.position.set(
                    0,
                    py,
                    -0.026
                );

            }

            if(side===2){

                win.position.set(
                    -0.026,
                    py,
                    0
                );

                win.rotation.y =
                    Math.PI/2;

            }

            if(side===3){

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
   SPAWN
========================= */

window.spawnCities =
function(level=1){

    APP.cityGroup.clear();

    const count =
        36 + level*5;

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

        /* TYPES */

        let type = "house";

        const rand =
            Math.random();

        if(rand > 0.82){

            type = "tower";

        }

        if(rand > 0.94){

            type = "factory";

        }

        let height =
            0.10 +
            Math.random()*0.14 +
            level*0.006;

        if(type==="tower"){

            height *= 1.8;

        }

        if(type==="factory"){

            height *= 0.8;

        }

        const building =
            createBuilding(
                type,
                height
            );

        building.position.copy(

            normal.clone().multiplyScalar(
                1.68 + height/2
            )

        );

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
