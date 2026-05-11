APP.planetGroup =
    new THREE.Group();

APP.scene.add(APP.planetGroup);

/* =========================
   PLANET GEOMETRY
========================= */

const geometry =
    new THREE.SphereGeometry(
        1.65,
        160,
        160
    );

const position =
    geometry.attributes.position;

const colors = [];

/* =========================
   EARTH-LIKE CONTINENTS
========================= */

/*
континенты задаются
как крупные зоны,
похожие на землю
*/

const continents = [

    /* north america */
    {
        x:-0.55,
        y:0.28,
        z:0.45,
        radius:0.42
    },

    /* south america */
    {
        x:-0.42,
        y:-0.42,
        z:0.38,
        radius:0.28
    },

    /* europe */
    {
        x:0.18,
        y:0.36,
        z:0.55,
        radius:0.18
    },

    /* africa */
    {
        x:0.18,
        y:-0.08,
        z:0.52,
        radius:0.32
    },

    /* asia */
    {
        x:0.62,
        y:0.16,
        z:0.12,
        radius:0.52
    },

    /* australia */
    {
        x:0.62,
        y:-0.48,
        z:-0.12,
        radius:0.18
    },

];

/* save land */

window.LAND_AREAS = [];

/* =========================
   VERTEX MODIFICATION
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

    let isLand = false;

    let landPower = 0;

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

        if(dist < c.radius){

            isLand = true;

            const influence =
                1 - (
                    dist / c.radius
                );

            landPower =
                Math.max(
                    landPower,
                    influence
                );

        }

    }

    /* ===== LAND ===== */

    if(isLand){

        /*
        минимальное выпирание,
        как на земле
        */

        const raise =
            1 +
            landPower * 0.045;

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
            0.55,
            0.95,
            0.28
        );

        LAND_AREAS.push(
            normal.clone()
        );

    }

    /* ===== OCEAN ===== */

    else{

        colors.push(
            0.08,
            0.58,
            1.0
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
