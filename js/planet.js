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
   FLAT CONTINENTS (CARTOON MAP STYLE)
========================= */

window.LAND_POINTS = [];

const landMaterial = new THREE.MeshToonMaterial({
    color: 0x35e06f
});

const CONTINENTS = [
    { dir: new THREE.Vector3( 0.9,  0.2,  0.3), size: 0.8 },
    { dir: new THREE.Vector3(-0.8,  0.1,  0.4), size: 0.85 },
    { dir: new THREE.Vector3( 0.2,  0.8, -0.3), size: 0.75 },
    { dir: new THREE.Vector3(-0.3, -0.7,  0.5), size: 0.9 },
    { dir: new THREE.Vector3( 0.4, -0.2, -0.9), size: 0.7 }
];

CONTINENTS.forEach(c => {

    const base = c.dir.clone().normalize();
    const continent = new THREE.Group();

    for (let i = 0; i < 12; i++) {

        const jitter = new THREE.Vector3(
            (Math.random() - 0.5) * 0.12,
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.12
        );

        const dir = base.clone().add(jitter).normalize();

        const land = new THREE.Mesh(
            new THREE.SphereGeometry(
                c.size * (0.18 + Math.random() * 0.15),
                22,
                22
            ),
            landMaterial
        );

        const radius = 1.73;

        land.position.copy(dir.multiplyScalar(radius));

        /* ПЛОСКИЕ МАТЕРИКИ */
        land.scale.set(
            2.0 + Math.random() * 1.2,
            0.10 + Math.random() * 0.06,
            2.0 + Math.random() * 1.2
        );

        land.lookAt(0, 0, 0);

        continent.add(land);

        LAND_POINTS.push(land.position.clone().normalize());
    }

    APP.planetGroup.add(continent);
});
