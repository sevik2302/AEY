// =========================
// SAFETY INIT
// =========================
window.APP = window.APP || {};
APP.planetGroup = APP.planetGroup || new THREE.Group();
APP.scene?.add(APP.planetGroup);

window.LAND_AREAS = [];

/* =========================
   PLANET
========================= */
const geometry = new THREE.SphereGeometry(1.65, 160, 160);
const position = geometry.attributes.position;
const colors = [];

/* =========================
   CONTINENTS
========================= */
const continents = [
    {x:-0.60,y:0.32,z:0.40,radius:0.52},
    {x:-0.42,y:-0.44,z:0.34,radius:0.34},
    {x:0.14,y:0.40,z:0.58,radius:0.24},
    {x:0.16,y:-0.04,z:0.54,radius:0.40},
    {x:0.66,y:0.18,z:0.08,radius:0.68},
    {x:0.62,y:-0.48,z:-0.12,radius:0.24},
    {x:-0.16,y:0.70,z:0.34,radius:0.16},
    {x:0.86,y:0.18,z:0.02,radius:0.12},
    {x:0.00,y:0.44,z:0.64,radius:0.10},
    {x:0.56,y:-0.16,z:0.20,radius:0.22},
    {x:0.30,y:-0.36,z:0.42,radius:0.10},
    {x:0.12,y:0.60,z:0.40,radius:0.14}
];

function smoothstep(a,b,x){
    x = Math.max(0, Math.min(1, (x-a)/(b-a)));
    return x*x*(3-2*x);
}

/* =========================
   PLANET SHAPE
========================= */
for(let i=0;i<position.count;i++){
    let x = position.getX(i);
    let y = position.getY(i);
    let z = position.getZ(i);

    const normal = new THREE.Vector3(x,y,z).normalize();

    let land = 0;

    for(const c of continents){
        const dx = normal.x - c.x;
        const dy = normal.y - c.y;
        const dz = normal.z - c.z;

        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

        const influence = 1 - smoothstep(c.radius*0.45, c.radius, dist);

        land = Math.max(land, influence);
    }

    if(land > 0.02){
        const raise = 1 + land * 0.03;

        position.setXYZ(
            i,
            x * raise,
            y * raise,
            z * raise
        );

        colors.push(0.65, 1.0, 0.25);
        window.LAND_AREAS.push(normal.clone());
    } else {
        colors.push(0.0, 0.22, 1.0);
    }
}

geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
);

geometry.computeVertexNormals();

/* =========================
   MATERIAL
========================= */
const material = new THREE.MeshToonMaterial({
    vertexColors: true
});

APP.planet = new THREE.Mesh(geometry, material);
APP.planetGroup.add(APP.planet);

/* =========================
   EFFECT LAYERS (SAFE)
========================= */
const makeSphere = (r, opacity, color=0xffffff) =>
    new THREE.Mesh(
        new THREE.SphereGeometry(r, 64, 64),
        new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity,
            side: THREE.DoubleSide
        })
    );

/* ocean glow */
APP.planetGroup.add(makeSphere(1.69, 0.05, 0x4db8ff));

/* clouds */
APP.cloudLayer = makeSphere(1.74, 0.12, 0xffffff);
APP.planetGroup.add(APP.cloudLayer);

/* rim light */
APP.planetGroup.add(makeSphere(1.82, 0.10, 0xffffff));
