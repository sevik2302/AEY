APP.planetGroup = new THREE.Group();
APP.scene.add(APP.planetGroup);

/* WATER */
const water = new THREE.Mesh(
    new THREE.SphereGeometry(1.75, 96, 96),
    new THREE.MeshToonMaterial({ color: 0x1f6fff })
);
APP.planetGroup.add(water);

/* =========================
   FLAT CONTINENTS (FIXED)
========================= */

window.LAND_POINTS = [];

const landMaterial = new THREE.MeshToonMaterial({
    color: 0x35e06f
});

const CONTINENTS = [
    { dir: new THREE.Vector3( 0.9,  0.2,  0.3), size: 0.65 },
    { dir: new THREE.Vector3(-0.8,  0.1,  0.4), size: 0.7 },
    { dir: new THREE.Vector3( 0.2,  0.8, -0.3), size: 0.6 },
    { dir: new THREE.Vector3(-0.3, -0.7,  0.5), size: 0.75 },
    { dir: new THREE.Vector3( 0.4, -0.2, -0.9), size: 0.55 }
];

CONTINENTS.forEach(c => {

    const base = c.dir.clone().normalize();

    const continent = new THREE.Group();

    for (let i = 0; i < 10; i++) {

        const jitter = new THREE.Vector3(
            (Math.random() - 0.5) * 0.15,
            (Math.random() - 0.5) * 0.08,  // 🔥 сильно уменьшаем "высоту"
            (Math.random() - 0.5) * 0.15
        );

        const dir = base.clone().add(jitter).normalize();

        const island = new THREE.Mesh(
            new THREE.SphereGeometry(
                c.size * (0.22 + Math.random() * 0.18),
                24,
                24
            ),
            landMaterial
        );

        const radius = 1.73;

        island.position.copy(dir.multiplyScalar(radius));

        /* 🔥 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ — ПЛОСКОСТЬ */
        island.scale.set(
            1.6 + Math.random() * 0.8,  // шире
            0.25 + Math.random() * 0.15, // очень низко по высоте
            1.6 + Math.random() * 0.8
        );

        island.lookAt(0, 0, 0);

        continent.add(island);

        LAND_POINTS.push(island.position.clone().normalize());
    }

    APP.planetGroup.add(continent);
});
