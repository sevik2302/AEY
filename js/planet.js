APP.planetGroup =
    new THREE.Group();

APP.scene.add(APP.planetGroup);

/* =========================
   OCEAN
========================= */

const ocean =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            1.65,
            96,
            96
        ),

        new THREE.MeshToonMaterial({

            color:0x1497ff

        })

    );

APP.planetGroup.add(ocean);

/* =========================
   LAND
========================= */

window.LAND_AREAS = [];

const landMaterial =
    new THREE.MeshToonMaterial({

        color:0x8cf53f

    });

for(let i=0;i<9;i++){

    const island =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.42 + Math.random()*0.22,
                28,
                28
            ),

            landMaterial

        );

    const phi =
        Math.random()*Math.PI*2;

    const theta =
        Math.random()*Math.PI;

    const dir =
        new THREE.Vector3(

            Math.sin(theta)*Math.cos(phi),

            Math.cos(theta),

            Math.sin(theta)*Math.sin(phi)

        );

    island.position.copy(
        dir.multiplyScalar(1.58)
    );

    /* меньше выпирают */

    island.scale.y = 0.18;

    island.lookAt(0,0,0);

    APP.planetGroup.add(island);

    LAND_AREAS.push(
        island.position.clone().normalize()
    );

}
