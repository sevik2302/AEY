APP.planetGroup =
    new THREE.Group();

APP.scene.add(
    APP.planetGroup
);

/* =========================
   PLANET
========================= */

const geometry =
    new THREE.SphereGeometry(
        1.65,
        240,
        240
    );

const position =
    geometry.attributes.position;

const colors = [];

window.LAND_AREAS = [];

/* =========================
   CONTINENTS
========================= */

const continents = [

    /* north america */
    {
        x:-0.58,
        y:0.30,
        z:0.42,
        radius:0.42
    },

    /* south america */
    {
        x:-0.42,
        y:-0.42,
        z:0.34,
        radius:0.26
    },

    /* europe */
    {
        x:0.14,
        y:0.38,
        z:0.58,
        radius:0.18
    },

    /* africa */
    {
        x:0.16,
        y:-0.06,
        z:0.54,
        radius:0.30
    },

    /* asia */
    {
        x:0.64,
        y:0.16,
        z:0.10,
        radius:0.52
    },

    /* australia */
    {
        x:0.62,
        y:-0.48,
        z:-0.12,
        radius:0.18
    },

    /* greenland */
    {
        x:-0.18,
        y:0.66,
        z:0.36,
        radius:0.13
    },

    /* japan islands */
    {
        x:0.82,
        y:0.18,
        z:0.02,
        radius:0.08
    },

    /* uk */
    {
        x:0.02,
        y:0.42,
        z:0.62,
        radius:0.07
    },

    /* indonesia */
    {
        x:0.56,
        y:-0.14,
        z:0.18,
        radius:0.14
    },

    /* madagascar */
    {
        x:0.30,
        y:-0.34,
        z:0.42,
        radius:0.08
    },

    /* scandinavia */
    {
        x:0.10,
        y:0.58,
        z:0.42,
        radius:0.10
    }

];

/* =========================
   SMOOTHSTEP
========================= */

function smoothstep(a,b,x){

    x = Math.max(
        0,
        Math.min(
            1,
            (x-a)/(b-a)
        )
    );

    return x*x*(3-2*x);

}

/* =========================
   SHAPE
========================= */

for(let i=0;i<position.count;i++){

    let x = position.getX(i);
    let y = position.getY(i);
    let z = position.getZ(i);

    const normal =
        new THREE.Vector3(
            x,
            y,
            z
        ).normalize();

    let land = 0;

    for(const c of continents){

        const dx =
            normal.x - c.x;

        const dy =
            normal.y - c.y;

        const dz =
            normal.z - c.z;

        const dist =
            Math.sqrt(
                dx*dx +
                dy*dy +
                dz*dz
            );

        const influence =
            1 -
            smoothstep(
                c.radius*0.45,
                c.radius,
                dist
            );

        land =
            Math.max(
                land,
                influence
            );

    }

    if(land > 0.02){

        const raise =
            1 +
            land*0.028;

        x *= raise;
        y *= raise;
        z *= raise;

        position.setXYZ(
            i,
            x,
            y,
            z
        );

        colors.push(
            0.72,
            1.0,
            0.18
        );

        LAND_AREAS.push(
            normal.clone()
        );

    }else{

        colors.push(
            0.0,
            0.30,
            0.95
        );

    }

}

geometry.setAttribute(

    "color",

    new THREE.Float32BufferAttribute(
        colors,
        3

    )

);

geometry.computeVertexNormals();

/* =========================
   MATERIAL
========================= */

const material =
    new THREE.MeshToonMaterial({

        vertexColors:true

    });

APP.planet =
    new THREE.Mesh(
        geometry,
        material
    );

APP.planetGroup.add(
    APP.planet
);

/* =========================
   RIM LIGHT
========================= */

const rim =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            1.73,
            64,
            64
        ),

        new THREE.MeshBasicMaterial({

            color:0xffffff,
            transparent:true,
            opacity:0.06,
            side:THREE.BackSide

        })

    );

APP.planetGroup.add(
    rim
);

/* =========================
   CLOUDS
========================= */

APP.cloudLayer =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            1.71,
            64,
            64
        ),

        new THREE.MeshToonMaterial({

            color:0xffffff,
            transparent:true,
            opacity:0.08

        })

    );

APP.planetGroup.add(
    APP.cloudLayer
);
