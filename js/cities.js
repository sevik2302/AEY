APP.cityGroup = new THREE.Group();
APP.scene.add(APP.cityGroup);

const PLANET_RADIUS = 1.75;

/* =========================
   LAND CHECK
========================= */
function isLand(normal) {
    for (const p of LAND_POINTS) {
        if (normal.distanceTo(p) < 0.4) return true;
    }
    return false;
}

/* =========================
   CARTOON HOUSE (POCOYO STYLE)
========================= */
function createHouse() {

    const group = new THREE.Group();

    const bodyColor = new THREE.Color(
        Math.random() > 0.5 ? 0xffcc00 :
        Math.random() > 0.5 ? 0xff4d4d :
        0x66ccff
    );

    /* дом */
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.08, 0.06),
        new THREE.MeshToonMaterial({ color: bodyColor })
    );

    body.position.y = 0.04;
    group.add(body);

    /* крыша (мультяшная) */
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(0.05, 0.05, 4),
        new THREE.MeshToonMaterial({ color: 0xffffff })
    );

    roof.position.y = 0.11;
    roof.rotation.y = Math.PI / 4;

    group.add(roof);

    return group;
}

/* =========================
   SPAWN CITIES
========================= */
window.spawnCities = function(level = 1) {

    APP.cityGroup.clear();

    const count = 180 + level * 20;

    for (let i = 0; i < count; i++) {

        let normal;

        for (let t = 0; t < 80; t++) {

            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;

            normal = new THREE.Vector3(
                Math.sin(theta) * Math.cos(phi),
                Math.cos(theta),
                Math.sin(theta) * Math.sin(phi)
            ).normalize();

            if (isLand(normal)) break;
        }

        const house = createHouse();

        const height = 0.02;

        house.position.copy(
            normal.clone().multiplyScalar(PLANET_RADIUS + height)
        );

        house.quaternion.setFromUnitVectors(
            new THREE.Vector3(0,1,0),
            normal
        );

        APP.cityGroup.add(house);
    }
};

spawnCities(1);
