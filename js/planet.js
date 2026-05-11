APP.planetGroup = new THREE.Group();

APP.scene.add(APP.planetGroup);

/* =========================
   OCEAN
========================= */

APP.planet =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            1.7,
            64,
            64
        ),

        new THREE.MeshToonMaterial({

            color:0x59b7ff

        })

    );

APP.planetGroup.add(APP.planet);

/* =========================
   CONTINENTS
========================= */

window.CONTINENTS = [];

const landColors = [
    0x6be38b,
    0x7ce596,
    0x63db84
];

for(let i=0;i<16;i++){

    const size =
        0.18 +
        Math.random()*0.22;

    const land =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                size,
                18,
                18
            ),

            new THREE.MeshToonMaterial({

                color:
                    landColors[
                        Math.floor(
                            Math.random()*landColors.length
                        )
                    ]

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

        ).multiplyScalar(1.63);

    land.position.copy(pos);

    /* orientation */
    land.lookAt(0,0,0);

    APP.planetGroup.add(land);

    CONTINENTS.push(land);

}

/* =========================
   ATMOSPHERE
========================= */

const atmosphere =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            1.82,
            48,
            48
        ),

        new THREE.MeshBasicMaterial({

            color:0xbfe9ff,

            transparent:true,

            opacity:0.12

        })

    );

APP.planetGroup.add(atmosphere);
