window.APP = window.APP || {};

// защита от отсутствия сцены
if (!APP.scene) {
    console.error("APP.scene not ready yet (engine.js issue)");
}

// группа создаётся безопасно
APP.planetGroup = new THREE.Group();

if (APP.scene) {
    APP.scene.add(APP.planetGroup);
}

window.LAND_AREAS = [];

/* =========================
   PLANET
========================= */

const geometry = new THREE.SphereGeometry(1.65, 180, 180);
const position = geometry.attributes.position;
const colors = [];

/* =========================
   SAFE CONTINENTS
========================= */

const continents = [/* твои данные без изменений */];

/* =========================
   SHAPE (safe)
========================= */

for (let i = 0; i < position.count; i++) {

    let x = position.getX(i);
    let y = position.getY(i);
    let z = position.getZ(i);

    const normal = new THREE.Vector3(x, y, z).normalize();

    let land = 0;

    for (const c of continents) {

        const dx = normal.x - c.x;
        const dy = normal.y - c.y;
        const dz = normal.z - c.z;

        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

        const influence =
            1 - Math.min(1, dist / c.radius);

        land = Math.max(land, influence);
    }

    if (land > 0.02) {
        const raise = 1 + land * 0.02;

        position.setXYZ(i, x * raise, y * raise, z * raise);

        colors.push(0.72, 1.0, 0.2);

        LAND_AREAS.push(normal.clone());

    } else {
        colors.push(0.0, 0.3, 0.95);
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
   SAFE VISUAL LAYERS
========================= */

const makeSphere = (r, o, c = 0xffffff) =>
    new THREE.Mesh(
        new THREE.SphereGeometry(r, 64, 64),
        new THREE.MeshBasicMaterial({
            color: c,
            transparent: true,
            opacity: o,
            side: THREE.DoubleSide
        })
    );

APP.planetGroup.add(makeSphere(1.71, 0.07, 0xffffff)); // clouds
APP.planetGroup.add(makeSphere(1.73, 0.05, 0xffffff)); // rim
