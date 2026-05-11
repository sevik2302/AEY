APP.cityGroup = new THREE.Group();
APP.scene.add(APP.cityGroup);

const PLANET_RADIUS = 1.75;

/* проверка: попали ли на сушу */
function isLand(normal) {

    for (const p of LAND_POINTS) {

        const d = normal.distanceTo(p);

        if (d < 0.35) return true;
    }

    return false;
}

/* =========================
   SPAWN CITIES (ONLY LAND)
========================= */

window.spawnCities = function(level = 1) {

    APP.cityGroup.clear();

    const count = 160 + level * 15;

    for (let i = 0; i < count; i++) {

        let normal;

        /* ищем сушу */
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

        const height = 0.06 + Math.random() * 0.18 + level * 0.005;

        const building = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.03,
                height,
                0.03
            ),
            new THREE.MeshToonMaterial({
                color: 0xffffff
            })
        );

        /* позиция НА поверхности */
        building.position.copy(
            normal.clone().multiplyScalar(PLANET_RADIUS + height / 2)
        );

        /* ориентация вверх от планеты */
        building.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            normal
        );

        APP.cityGroup.add(building);
    }
};

spawnCities(1);
