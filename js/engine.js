window.APP = {};

APP.scene = new THREE.Scene();

APP.scene.fog =
    new THREE.Fog(
        0x8ed8ff,
        8,
        20
    );

/* CAMERA */

APP.camera =
    new THREE.PerspectiveCamera(
        45,
        innerWidth/innerHeight,
        0.1,
        1000
    );

APP.camera.position.set(0,0,8);

/* RENDERER */

APP.renderer =
    new THREE.WebGLRenderer({
        antialias:true
    });

APP.renderer.setSize(
    innerWidth,
    innerHeight
);

APP.renderer.setPixelRatio(
    devicePixelRatio
);

document.body.appendChild(
    APP.renderer.domElement
);

/* LIGHT */

const light =
    new THREE.DirectionalLight(
        0xffffff,
        2.2
    );

light.position.set(5,5,5);

APP.scene.add(light);

APP.scene.add(
    new THREE.AmbientLight(
        0xffffff,
        1.8
    )
);

/* LOOP */

function animate(){

    requestAnimationFrame(animate);

    if(APP.planet){
        APP.planet.rotation.y += 0.0012;
    }

    if(APP.cityGroup){
        APP.cityGroup.rotation.y += 0.0012;
    }

    APP.renderer.render(
        APP.scene,
        APP.camera
    );

}

animate();

/* RESIZE */

addEventListener("resize",()=>{

    APP.camera.aspect =
        innerWidth/innerHeight;

    APP.camera.updateProjectionMatrix();

    APP.renderer.setSize(
        innerWidth,
        innerHeight
    );

});
