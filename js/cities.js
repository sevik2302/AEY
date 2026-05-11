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

    let color =
        0xfff7ed;

    if(type==="tower"){

        color = 0xdff4ff;

    }

    if(type==="factory"){

        color = 0xffddb5;

    }

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.05,
                height,
                0.05
            ),

            new THREE.MeshToonMaterial({

                color

            })

        );

    group.add(body);

    /* roof */

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

    /* windows */

    const rows =
        Math.max(
            2,
            Math.floor(height*10)
        );

    for(let y=0;y<rows;y++){

        const win =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.012,
                    0.012,
                    0.002
                ),

                new THREE.MeshToonMaterial({

                    color:0x9ae8ff,
                    emissive:0x4db8ff,
                    emissiveIntensity:0.5

                })

            );

        win.position.set(
            0,
            -height/2 + 0.05 + y*0.03,
            0.026
        );

        group.add(win);

    }

    return group;

}

/* =========================
   TREE
========================= */

function createTree(){

    const group =
        new THREE.Group();

    const trunk =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.006,
                0.008,
                0.04
            ),

            new THREE.MeshToonMaterial({

                color:0x8b5a2b

            })

        );

    group.add(trunk);

    const leaves =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.022,
                10,
                10
            ),

            new THREE.MeshToonMaterial({

                color:0x41c95c

            })

        );

    leaves.position.y =
        0.03;

    group.add(leaves);

    return group;

}

/* =========================
   ROAD
========================= */

function createRoad(){

    return new THREE.Mesh(

        new THREE.BoxGeometry(
            0.09,
            0.002,
            0.018
        ),

        new THREE.MeshToonMaterial({

            color:0x444444

        })

    );

}

/* =========================
   DRONE
========================= */

function createDrone(){

    const group =
        new THREE.Group();

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.04,
                0.015,
                0.04
            ),

            new THREE.MeshToonMaterial({

                color:0xffffff

            })

        );

    group.add(body);

    const light =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.008,
                6,
                6
            ),

            new THREE.MeshBasicMaterial({

                color:0x00d0ff

            })

        );

    light.position.y =
        0.012;

    group.add(light);

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

        if(rand > 0.8){

            type = "tower";

        }

        if(rand > 0.94){

            type = "factory";

        }

        let height =
            0.10 +
            Math.random()*0.12 +
            level*0.005;

        if(type==="tower"){

            height *= 2.0;

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

        /* ROAD */

        if(Math.random()>0.35){

            const road =
                createRoad();

            road.position.copy(

                normal.clone().multiplyScalar(
                    1.675
                )

            );

            road.quaternion.setFromUnitVectors(

                new THREE.Vector3(0,1,0),

                normal

            );

            road.rotation.z =
                Math.random()*Math.PI;

            APP.cityGroup.add(
                road
            );

        }

        /* TREE */

        if(Math.random()>0.5){

            const tree =
                createTree();

            tree.position.copy(

                normal.clone().multiplyScalar(
                    1.69
                )

            );

            tree.quaternion.setFromUnitVectors(

                new THREE.Vector3(0,1,0),

                normal

            );

            APP.cityGroup.add(
                tree
            );

        }

    }

    /* DRONES */

    for(let i=0;i<5;i++){

        const drone =
            createDrone();

        drone.userData.angle =
            Math.random()*Math.PI*2;

        drone.userData.radius =
            2.2 +
            Math.random()*0.4;

        APP.scene.add(drone);

        function animateDrone(){

            requestAnimationFrame(
                animateDrone
            );

            drone.userData.angle +=
                0.01;

            drone.position.x =
                Math.cos(
                    drone.userData.angle
                ) * drone.userData.radius;

            drone.position.z =
                Math.sin(
                    drone.userData.angle
                ) * drone.userData.radius;

            drone.position.y =
                Math.sin(
                    drone.userData.angle*2
                ) * 0.25;

        }

        animateDrone();

    }

};

spawnCities(1);
