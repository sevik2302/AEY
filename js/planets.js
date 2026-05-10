const loader =
  new THREE.TextureLoader();

/* TEXTURES */

const earthTexture =
  loader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

const earthNight =
  loader.load(
    "https://threejs.org/examples/textures/planets/earth_lights_2048.png"
  );

const cloudsTexture =
  loader.load(
    "https://threejs.org/examples/textures/planets/earth_clouds_1024.png"
  );

/* PLANET */

window.planet =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      2,
      128,
      128
    ),

    new THREE.MeshStandardMaterial({

      map:earthTexture,

      emissiveMap:earthNight,

      emissive:new THREE.Color(
        0xffffff
      ),

      emissiveIntensity:0.35,

      roughness:1

    })

  );

scene.add(planet);

/* CLOUDS */

window.clouds =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      2.03,
      128,
      128
    ),

    new THREE.MeshStandardMaterial({

      map:cloudsTexture,

      transparent:true,

      opacity:0.45

    })

  );

scene.add(clouds);

/* ATMOSPHERE */

window.atmosphere =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      2.08,
      128,
      128
    ),

    new THREE.MeshBasicMaterial({

      color:0x4da6ff,

      transparent:true,

      opacity:0.12

    })

  );

scene.add(atmosphere);

/* STARS */

const starsGeometry =
  new THREE.BufferGeometry();

const starsVertices = [];

for(let i=0;i<10000;i++){

  starsVertices.push(
    (Math.random()-0.5)*500
  );

  starsVertices.push(
    (Math.random()-0.5)*500
  );

  starsVertices.push(
    (Math.random()-0.5)*500
  );

}

starsGeometry.setAttribute(

  "position",

  new THREE.Float32BufferAttribute(
    starsVertices,
    3
  )

);

const stars =
  new THREE.Points(

    starsGeometry,

    new THREE.PointsMaterial({

      color:0xffffff,

      size:0.08

    })

  );

scene.add(stars);

/* CITY GROUP */

window.cityGroup =
  new THREE.Group();

scene.add(cityGroup);
