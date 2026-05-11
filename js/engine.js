window.APP = {};

APP.scene = new THREE.Scene();

/* =========================
   CAMERA
========================= */

APP.camera =
    new THREE.PerspectiveCamera(
        45,
        innerWidth / innerHeight,
        0.1,
        1000
    );

APP.camera.position.set(0,0,8.8);

/* =========================
   RENDERER
========================= */

APP.renderer =
    new THREE.WebGLRenderer({
        antialias:true,
        alpha:true
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

/* =========================
   LIGHTING
========================= */

/* ambient */

const ambient =
    new THREE.AmbientLight(
        0xffffff,
        1.2
    );

APP.scene.add(ambient);

/* sun */

APP.sun =
    new THREE.DirectionalLight(
        0xffffff,
        2.4
    );

APP.sun.position.set(
    5,
    3,
    5
);

APP.scene.add(APP.sun);

/* blue fill */

const fill =
    new THREE.DirectionalLight(
        0x6bc8ff,
        1.2
    );

fill.position.set(
    -5,
    -2,
    -5
);

APP.scene.add(fill);

/* =========================
   STARS
========================= */

const starsGeometry =
    new THREE.BufferGeometry();

const stars = [];

for(let i=0;i<2200;i++){

    stars.push(

        (Math.random()-0.5)*140,
        (Math.random()-0.5)*140,
        (Math.random()-0.5)*140

    );

}

starsGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        stars,
        3
    )

);

const starsMaterial =
    new THREE.PointsMaterial({

        color:0xffffff,
        size:0.12

    });

APP.stars =
    new THREE.Points(
        starsGeometry,
        starsMaterial
    );

APP.scene.add(APP.stars);

/* =========================
   CLOUDS
========================= */

APP.clouds =
    new THREE.Group();

APP.scene.add(APP.clouds);

function createCloud(x,y,s){

    const group =
        new THREE.Group();

    for(let i=0;i<5;i++){

        const cloud =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.24 + Math.random()*0.12,
                    18,
                    18
                ),

                new THREE.MeshToonMaterial({

                    color:0xffffff,
                    transparent:true,
                    opacity:0.95

                })

            );

        cloud.position.x =
            i * 0.18;

        group.add(cloud);

    }

    group.position.set(
        x,
        y,
        -4
    );

    group.scale.setScalar(s);

    APP.clouds.add(group);

}

createCloud(-5,3,1.2);
createCloud(4,2,0.9);
createCloud(-5,-3,1.3);
createCloud(5,-2,1.1);

/* =========================
   ANIMATE
========================= */

function animate(){

    requestAnimationFrame(
        animate
    );

    if(APP.planetGroup){

        APP.planetGroup.rotation.y += 0.0014;

    }

    if(APP.cloudLayer){

        APP.cloudLayer.rotation.y += 0.0018;

    }

    APP.stars.rotation.y += 0.00012;

    APP.renderer.render(
        APP.scene,
        APP.camera
    );

}

animate();

/* =========================
   RESIZE
========================= */

addEventListener(
    "resize",
    ()=>{

        APP.camera.aspect =
            innerWidth/innerHeight;

        APP.camera.updateProjectionMatrix();

        APP.renderer.setSize(
            innerWidth,
            innerHeight
        );

    }
);
