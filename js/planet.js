APP.planetGroup = new THREE.Group();
APP.scene.add(APP.planetGroup);

/* =========================
   WATER PLANET
========================= */

const water = new THREE.Mesh(
    new THREE.SphereGeometry(1.75, 96, 96),
    new THREE.MeshToonMaterial({
        color: 0x1f6fff   // глубокий синий
    })
);

APP.planetGroup.add(water);

/* =========================
   CONTINENTS (VOLUMETRIC)
========================= */

window.LAND_POINTS = [];

const landMaterial = new THREE.MeshToonMaterial({
    color: 0x35e06f   // яркий зелёный
});

/* делаем "острова-объёмы" */
for (let i = 0; i < 22; i++) {

    const island = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.22 + Math.random() * 0.35,
            18,
            18
        ),
        landMaterial
    );

    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;

    const dir = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
    );

    const radius = 1.72 + Math.random() * 0.03;

    island.position.copy(dir.multiplyScalar(radius));

    /* чуть выпирает наружу (объём суши) */
    island.lookAt(0, 0, 0);
    island.scale.set(
        1,
        0.6 + Math.random() * 0.6,
        1
    );

    APP.planetGroup.add(island);

    LAND_POINTS.push(island.position.clone().normalize());
}

/* =========================
   NO ATMOSPHERE (ВАЖНО)
========================= */
// атмосфера УДАЛЕНА полностью
