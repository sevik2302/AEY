APP.planetGroup =
    new THREE.Group();

APP.scene.add(APP.planetGroup);

/* =========================
   GEOMETRY
========================= */

const geometry =
    new THREE.SphereGeometry(
        1.65,
        220,
        220
    );

const position =
    geometry.attributes.position;

const colors = [];

/* =========================
   EARTH-LIKE CONTINENTS
========================= */

const continents = [

    {
        x:-0.55,
        y:0.28,
        z:0.45,
        radius:0.42
    },

    {
        x:-0.42,
        y:-0.42,
        z:0.38,
        radius:0.28
    },

    {
        x:0.18,
        y:0.36,
        z:0.55,
        radius:0.18
    },

    {
        x:0.18,
        y:-0.08,
        z:0.52,
        radius:0.32
    },

    {
        x:0.62,
        y:0.16,
        z:0.12,
        radius:0.52
    },

    {
        x:0.62,
        y:-0.48,
        z:-0.12,
        radius:0.18
    }

];

/* =========================
   LAND STORAGE
========================= */

window.LAND_AREAS = [];

/* =========================
   SMOOTHSTEP
========================= */

function smoothstep(edge0,edge1,x){

    x = Math.max(
        0,
        Math.min(
            1,
            (x-edge0)/(edge1-edge0)
        )
    );

    return x*x*(3-2*x);

}

/* =========================
   MODIFY PLANET
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

    let landInfluence = 0;

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

        /*
        плавный falloff
        */

        const influence =
            1 -
            smoothstep(
                c.radius*0.45,
                c.radius,
                dist
            );

        landInfluence =
            Math.max(
                landInfluence,
                influence
            );

    }

    /* =====================
       LAND
    ===================== */

    if(landInfluence > 0.02){

        /*
        очень мягкий рельеф
        */

        const raise =
            1 +
            landInfluence * 0.03;

        x *= raise;
        y *= raise;
        z *= raise;

        position.setXYZ(
            i,
            x,
            y,
            z
        );

        /*
        smooth lime
        */

        colors.push(
            0.72,
            1.0,
            0.18
        );

        LAND_AREAS.push(
            normal.clone()
        );

    }

    /* =====================
       OCEAN
    ===================== */

    else{

        colors.push(
            0.0,
            0.30,
            0.95
        );

    }

}

/* =========================
   COLORS
========================= */

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

/* =========================
   PLANET
========================= */

APP.planet =
    new THREE.Mesh(
        geometry,
        material
    );

APP.planetGroup.add(
    APP.planet
);
