APP.cityGroup = new THREE.Group();

APP.scene.add(APP.cityGroup);

const RADIUS = 2.24;

window.spawnCities = function(level=1){

    APP.cityGroup.clear();

    const cityCount = 10 + level*2;

    for(let i=0;i<cityCount;i++){

        const phi = Math.random()*Math.PI*2;
        const theta = Math.random()*Math.PI;

        const base = new THREE.Vector3(
            Math.sin(theta)*Math.cos(phi),
            Math.cos(theta),
            Math.sin(theta)*Math.sin(phi)
        ).multiplyScalar(RADIUS);

        const normal = base.clone().normalize();

        const buildings = 15 + level*2;

        for(let j=0;j<buildings;j++){

            const height =
                0.03 +
                Math.random()*0.08 +
                level*0.005;

            const geo = new THREE.BoxGeometry(
                0.02,
                height,
                0.02
            );

            const mat = new THREE.MeshStandardMaterial({
                color:new THREE.Color().setHSL(
                    0.55 + Math.random()*0.15,
                    0.8,
                    0.65
                ),
                emissive:0x102040
            });

            const b = new THREE.Mesh(geo,mat);

            const spread = 0.08;

            const offset = new THREE.Vector3(
                (Math.random()-0.5)*spread,
                (Math.random()-0.5)*spread,
                (Math.random()-0.5)*spread
            );

            const pos = base.clone()
                .add(offset)
                .normalize()
                .multiplyScalar(RADIUS);

            b.position.copy(
                pos.clone().add(
                    normal.clone().multiplyScalar(height/2)
                )
            );

            b.quaternion.setFromUnitVectors(
                new THREE.Vector3(0,1,0),
                normal
            );

            APP.cityGroup.add(b);
        }
    }
}

spawnCities(1);
