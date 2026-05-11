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

    const colors = [
        0xffcc00,
        0xff5c5c,
        0x66ccff,
        0xff8bd1,
        0x7dff7a
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    const bodyMaterial = new THREE.MeshToonMaterial({
        color: color
    });

    /* =====================
       HOUSE BODY
    ===================== */
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.07, 0.06),
        bodyMaterial
    );

    body.position.y = 0.035;
    group.add(body);

    /* =====================
       ROOF
    ===================== */
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(0.055, 0.05, 4),
        new THREE.MeshToonMaterial({ color: 0xffffff })
    );

    roof.position.y = 0.085;
    roof.rotation.y = Math.PI / 4;

    group.add(roof);

    /* =====================
       WINDOWS (POCOYO STYLE)
    ===================== */
    const windowMaterial = new THREE.MeshToonMaterial({
        color: 0xffffff
    });

    const windowGeo = new THREE.PlaneGeometry(0.015, 0.015);

    const w1 = new THREE.Mesh(windowGeo, windowMaterial);
    w1.position.set(0.015, 0.04, 0.031);

    const w2 = new THREE.Mesh(windowGeo, windowMaterial);
    w2.position.set(-0.015, 0.04, 0.031);

    const w3 = new THREE.Mesh(windowGeo, windowMaterial);
    w3.position.set(0, 0.015, 0.031);

    group.add(w1, w2, w3);

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
            new THREE.Vector3(0, 1, 0),
            normal
        );

        APP.cityGroup.add(house);
    }
};

spawnCities(1);
