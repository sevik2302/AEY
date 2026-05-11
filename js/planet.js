APP.planetGroup = new THREE.Group();

APP.scene.add(APP.planetGroup);

/* =========================
   PLANET
========================= */

const geometry =
    new THREE.SphereGeometry(
        1.7,
        128,
        128
    );

const colors = [];

const landPoints = [];

/* =========================
   CARTOON CONTINENTS
========================= */

for(let i=0;i<18;i++){

    const phi =
        Math.random()*Math.PI*2;

    const theta =
        Math.random()*Math.PI;

    landPoints.push({

        x:
            Math.sin(theta)*Math.cos(phi),

        y:
            Math.cos(theta),

        z:
            Math.sin(theta)*Math.sin(phi),

        radius:
            0.45 + Math.random()*0.22

    });

}

/* =========================
   VERTEX COLORS
========================= */

const pos =
    geometry.attributes.position;

for(let i=0;i<pos.count;i++){

    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);

    const normal =
        new THREE.Vector3(
            vx,
            vy,
            vz
        ).normalize();

    let land = false;

    for(const p of landPoints){

        const dx = normal.x - p.x;
        const dy = normal.y - p.y;
        const dz = normal.z - p.z;

        const dist =
            Math.sqrt(
                dx*dx +
                dy*dy +
                dz*dz
            );

        if(dist < p.radius){

            land = true;
            break;

        }

    }

    if(land){

        colors.push(
            0.42,
            0.87,
            0.56
        );

    }else{

        colors.push(
            0.35,
            0.72,
            1.0
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

/* =========================
   PLANET MATERIAL
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

APP.planetGroup.add(APP.planet);

/* =========================
   ATMOSPHERE
========================= */

const atmosphere =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            1.8,
            64,
            64
        ),

        new THREE.MeshBasicMaterial({

            color:0xbfe9ff,

            transparent:true,

            opacity:0.12

        })

    );

APP.planetGroup.add(atmosphere);

/* SAVE LAND DATA */

window.LAND_POINTS = landPoints;
