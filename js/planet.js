APP.planetGroup = new THREE.Group();
APP.scene.add(APP.planetGroup);

/* =========================
   WATER PLANET
========================= */
const water = new THREE.Mesh(
    new THREE.SphereGeometry(1.75, 96, 96),
    new THREE.MeshToonMaterial({
        color: 0x1f6fff
    })
);
APP.planetGroup.add(water);

/* =========================
   CONTINENTS (BIG LANDMASSES)
========================= */

window.LAND_POINTS = [];

const landMaterial = new THREE.MeshToonMaterial({
    color: 0x35e06f
});

/* 🔥 упрощённые "континенты" */
const CONTINENTS = [
    { dir: new THREE.Vector3( 0.9,  0.2,  0.3), size: 0.55 },
    { dir: new THREE.Vector3(-0.8,  0.1,  0.4), size: 0.6 },
    { dir: new THREE.Vector3( 0.2,  0.8, -0.3), size: 0.5 },
    { dir: new THREE.Vector3(-0.3, -0.7,  0.5), size: 0.65 },
    { dir: new THREE.Vector3( 0.4, -0.2, -0.9), size: 0.45 },
    { dir: new THREE.Vector3(-0.6,  0.6, -0.2), size: 0.5 },
    { dir: new THREE.Vector3( 0.1, -0.9,  0.3), size: 0.55 }
];

CONTINENTS.forEach(c => {

    const group = new THREE.Group();

    const base = c.dir.clone().normalize();

    /* делаем "неровный материк" из нескольких пятен */
    for (let i = 0; i < 6; i++) {

        const jitter = new THREE.Vector3(
            (Math.random()-0.5)*0.3,
            (Math.random()-0.5)*0.3,
            (Math.random()-0.5)*0.3
        );

        const dir = base.clone().add(jitter).normalize();

        const island = new THREE.Mesh(
            new THREE.SphereGeometry(
                c.size * (0.25 + Math.random()*0.25),
                24,
                24
            ),
            landMaterial
        );

        const radius = 1.72;

        island.position.copy(dir.multiplyScalar(radius));

        island.scale.set(
            1.2 + Math.random()*0.6,
            0.6 + Math.random()*0.4,
            1.2 + Math.random()*0.6
        );

        island.lookAt(0,0,0);

        group.add(island);

        LAND_POINTS.push(island.position.clone().normalize());
    }

    APP.planetGroup.add(group);
});
