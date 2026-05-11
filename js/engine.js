window.APP = {};

/* SCENE */

APP.scene = new THREE.Scene();

/* CAMERA */

APP.camera = new THREE.PerspectiveCamera(
    45,
    innerWidth/innerHeight,
    0.1,
    1000
);

APP.camera.position.set(0,0,8);

/* RENDERER */

APP.renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});

APP.renderer.setPixelRatio(devicePixelRatio);

APP.renderer.setSize(
    innerWidth,
    innerHeight
);

document.body.appendChild(
    APP.renderer.domElement
);

/* LIGHT */

const ambient =
    new THREE.AmbientLight(
        0xffffff,
        1.2
    );

APP.scene.add(ambient);

const sun =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

sun.position.set(5,5,5);

APP.scene.add(sun);

/* STARS */

const starsGeo =
    new THREE.BufferGeometry();

const starPos = [];

for(let i=0;i<5000;i++){

    starPos.push(
        (Math.random()-0.5)*400
    );

    starPos.push(
        (Math.random()-0.5)*400
    );

    starPos.push(
        (Math.random()-0.5)*400
    );

}

starsGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        starPos,
        3
    )
);

const stars =
    new THREE.Points(

        starsGeo,

        new THREE.PointsMaterial({
            color:0xffffff,
            size:0.03
        })

    );

APP.scene.add(stars);

/* LOOP */

function animate(){

    requestAnimationFrame(animate);

    if(APP.planet){
        APP.planet.rotation.y += 0.0012;
    }

    if(APP.clouds){
        APP.clouds.rotation.y += 0.0015;
    }

    if(APP.cityGroup){
        APP.cityGroup.rotation.y += 0.0004;
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
