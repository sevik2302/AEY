window.scene = new THREE.Scene();

window.camera = new THREE.PerspectiveCamera(

  60,

  window.innerWidth /
  window.innerHeight,

  0.1,

  1000

);

camera.position.z = 6;

window.renderer =
  new THREE.WebGLRenderer({

    antialias:true

  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  window.devicePixelRatio
);

document.body.appendChild(
  renderer.domElement
);

/* LIGHT */

scene.add(
  new THREE.AmbientLight(
    0x404040,
    2
  )
);

window.sun =
  new THREE.PointLight(
    0xffffff,
    7,
    100
  );

sun.position.set(10,6,8);

scene.add(sun);

/* LOOP */

function animate(){

  requestAnimationFrame(
    animate
  );

  if(window.planet){

    planet.rotation.y += 0.0011;

  }

  if(window.clouds){

    clouds.rotation.y += 0.0014;

  }

  if(window.atmosphere){

    atmosphere.rotation.y += 0.001;

  }

  if(window.cityGroup){

    cityGroup.rotation.y += 0.0011;

  }

  renderer.render(
    scene,
    camera
  );
}

animate();

/* RESIZE */

window.addEventListener(
  "resize",
  ()=>{

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);
