APP.planetGroup = new THREE.Group();
APP.scene.add(APP.planetGroup);

/* =========================
   WATER PLANET
========================= */
const water = new THREE.Mesh(
    new THREE.SphereGeometry(1.75, 128, 128),
    new THREE.MeshToonMaterial({
        color: 0x1f6fff
    })
);

APP.planetGroup.add(water);

/* =========================
   CONTINENT BASE SHAPE (REAL FIX)
========================= */

window.LAND_POINTS = [];

const landMaterial = new THREE.MeshToonMaterial({
    color: 0x35e06f
});

/* создаём "континенты" как группы мягких пятен, но БЕЗ lookAt */
const CONTINENTS = [
    new THREE.Vector3( 0.9,  0.2,  0.3),
    new THREE.Vector3(-0.8,  0.1,  0.4),
    new THREE.Vector3( 0.2,  0.8, -0.3),
    new THREE.Vector3(-0.3, -0.7,  0.5),
    new THREE.Vector3( 0.4, -0.2, -0.9)
];

CONTINENTS.forEach(center => {

    const baseDir = center.clone().normalize();

    const group = new THREE.Group();

    for (let i = 0; i < 18; i++) {

        const spread = new THREE.Vector3(
            (Math.random() - 0.5) * 0.25,
            (Math.random() - 0.5) * 0.25,
            (Math.random() - 0.5) * 0.25
        );

        const dir = baseDir.clone().add(spread).normalize();

        const radius = 1.73;

        const land = new THREE.Mesh(
            new THREE.SphereGeometry(
                0.18 + Math.random() * 0.12,
                24,
                24
            ),
            landMaterial
        );

        const pos = dir.multiplyScalar(radius);

        land.position.copy(pos);

        /* 🔥 ВАЖНО: НЕ lookAt — убираем вертикальные “диски” */
        land.quaternion.setFromUnitVectors(
            new THREE.Vector3(0,1,0),
            dir
        );

        /* 🔥 МЯГКАЯ ВЫПУКЛОСТЬ (НЕ ВЕРТИКАЛЬНЫЕ ПЛАСТЫ) */
        land.scale.set(
            1.4 + Math.random() * 0.6,
            0.2 + Math.random() * 0.1,
            1.4 + Math.random() * 0.6
        );

        group.add(land);

        LAND_POINTS.push(dir.clone());
    }

    APP.planetGroup.add(group);
});
