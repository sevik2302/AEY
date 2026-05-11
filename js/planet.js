/* PLANET */

APP.planet =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            2.3,
            64,
            64
        ),

        new THREE.MeshToonMaterial({

            color:0x4fa8ff

        })

    );

APP.scene.add(APP.planet);

/* LAND */

const landGeo =
    new THREE.SphereGeometry(
        2.31,
        64,
        64
    );

const landMat =
    new THREE.MeshToonMaterial({
        color:0x5edc8d
    });

const land =
    new THREE.Mesh(
        landGeo,
        landMat
    );

APP.scene.add(land);

/* CONTINENTS */

const continents = [];

for(let i=0;i<14;i++){

    const c =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.35 + Math.random()*0.25,
                18,
                18
            ),

            new THREE.MeshToonMaterial({
                color:0x5edc8d
            })

        );

    const phi =
        Math.random()*Math.PI*2;

    const theta =
        Math.random()*Math.PI;

    const pos =
        new THREE.Vector3(

            Math.sin(theta)*Math.cos(phi),

            Math.cos(theta),

            Math.sin(theta)*Math.sin(phi)

        ).multiplyScalar(2.18);

    c.position.copy(pos);

    APP.planet.add(c);

    continents.push(c);
}

window.CONTINENTS = continents;
