const loader = new THREE.TextureLoader();

const earth = loader.load(
"https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

const clouds = loader.load(
"https://threejs.org/examples/textures/planets/earth_clouds_1024.png"
);

/* PLANET */

APP.planet = new THREE.Mesh(

    new THREE.SphereGeometry(2.2,128,128),

    new THREE.MeshStandardMaterial({
        map:earth,
        roughness:1,
        metalness:0
    })

);

APP.scene.add(APP.planet);

/* CLOUDS */

APP.clouds = new THREE.Mesh(

    new THREE.SphereGeometry(2.26,128,128),

    new THREE.MeshStandardMaterial({
        map:clouds,
        transparent:true,
        opacity:0.32
    })

);

APP.scene.add(APP.clouds);

/* ATMOSPHERE */

const atmosphere = new THREE.Mesh(

    new THREE.SphereGeometry(2.34,64,64),

    new THREE.MeshBasicMaterial({
        color:0x5ea3ff,
        transparent:true,
        opacity:0.12
    })

);

APP.scene.add(atmosphere);
