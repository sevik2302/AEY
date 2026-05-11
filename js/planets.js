const loader = new THREE.TextureLoader();

/* =========================
   PLANET TYPES (VARIATION SYSTEM)
========================= */

const planetTypes = [

  {
    name: "Terra",
    color: 0x4da6ff,
    atmosphere: 0x4da6ff
  },

  {
    name: "Ice",
    color: 0xaadfff,
    atmosphere: 0x88ccff
  },

  {
    name: "Desert",
    color: 0xffcc88,
    atmosphere: 0xffaa55
  },

  {
    name: "Lava",
    color: 0xff5533,
    atmosphere: 0xff3300
  }

];

/* =========================
   CURRENT PLANET
========================= */

window.currentPlanetType =
  planetTypes[0];

/* =========================
   PLANET CORE
========================= */

window.planet =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      2,
      128,
      128
    ),

    new THREE.MeshStandardMaterial({

      color: currentPlanetType.color,

      roughness: 1,

      metalness: 0

    })

  );

scene.add(planet);

/* =========================
   ATMOSPHERE (VERY LIGHT)
========================= */

window.atmosphere =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      2.06,
      128,
      128
    ),

    new THREE.MeshBasicMaterial({

      color: currentPlanetType.atmosphere,

      transparent: true,

      opacity: 0.08 /* ⚠️ сильно уменьшили */

    })

  );

scene.add(atmosphere);

/* =========================
   CLOUDS (optional subtle)
========================= */

window.clouds =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      2.02,
      128,
      128
    ),

    new THREE.MeshStandardMaterial({

      color: 0xffffff,

      transparent: true,

      opacity: 0.12

    })

  );

scene.add(clouds);

/* =========================
   STARFIELD
========================= */

const geo = new THREE.BufferGeometry();
const stars = [];

for (let i = 0; i < 15000; i++) {

  stars.push((Math.random() - 0.5) * 600);
  stars.push((Math.random() - 0.5) * 600);
  stars.push((Math.random() - 0.5) * 600);

}

geo.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(stars, 3)
);

scene.add(
  new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05
    })
  )
);

/* =========================
   CITY ROOT
========================= */

window.cityGroup = new THREE.Group();
scene.add(cityGroup);

/* =========================
   SWITCH PLANET FUNCTION
========================= */

window.switchPlanetVisual = function (index) {

  currentPlanetType =
    planetTypes[index % planetTypes.length];

  planet.material.color.setHex(
    currentPlanetType.color
  );

  atmosphere.material.color.setHex(
    currentPlanetType.atmosphere
  );

};
