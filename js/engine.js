window.APP = {};

APP.scene =
    new THREE.Scene();

/* =========================
   CAMERA
========================= */

APP.camera =
    new THREE.PerspectiveCamera(
        45,
        innerWidth/innerHeight,
        0.1,
        1000
    );

APP.camera.position.set(
    0,
    0,
    8.8
);

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
   LIGHTS
========================= */

APP.sun =
    new THREE.DirectionalLight(
        0xffffff,
        2.8
    );

APP.sun.position.set(
    5,
    2,
    5
);

APP.scene.add(
    APP.sun
);

const ambient =
    new THREE.AmbientLight(
        0xffffff,
        0.8
    );

APP.scene.add(
    ambient
);

/* =========================
   PARALLAX STARS
========================= */

APP.starLayers = [];

for(let l=0;l<3;l++){

    const geo =
        new THREE.BufferGeometry();

    const stars = [];

    for(let i=0;i<1200;i++){

        stars.push(

            (Math.random()-0.5)*140,
            (Math.random()-0.5)*140,
            (Math.random()-0.5)*140

        );

    }

    geo.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            stars,
            3
        )

    );

    const mat =
        new THREE.PointsMaterial({

            color:0xffffff,
            size:0.08 + l*0.04

        });

    const points =
        new THREE.Points(
            geo,
            mat
        );

    APP.scene.add(points);

    APP.starLayers.push(points);

}

/* =========================
   SATELLITES
========================= */

APP.satellites = [];

for(let i=0;i<2;i++){

    const sat =
        new THREE.Group();

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.06,
                0.04,
                0.04
            ),

            new THREE.MeshToonMaterial({

                color:0xffffff

            })

        );

    sat.add(body);

    const panel =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.12,
                0.01,
                0.05
            ),

            new THREE.MeshToonMaterial({

                color:0x4db8ff

            })

        );

    sat.add(panel);

    sat.userData.angle =
        Math.random()*Math.PI*2;

    sat.userData.radius =
        2.8 + i*0.4;

    APP.scene.add(sat);

    APP.satellites.push(sat);

}

/* =========================
   PLANES
========================= */

APP.planes = [];

for(let i=0;i<3;i++){

    const plane =
        new THREE.Group();

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.06,
                0.02,
                0.02
            ),

            new THREE.MeshToonMaterial({

                color:0xffffff

            })

        );

    plane.add(body);

    const wing =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.02,
                0.002,
                0.08
            ),

            new THREE.MeshToonMaterial({

                color:0xff5555

            })

        );

    plane.add(wing);

    plane.userData.angle =
        Math.random()*Math.PI*2;

    plane.userData.radius =
        2.3 + Math.random()*0.3;

    APP.scene.add(plane);

    APP.planes.push(plane);

}

/* =========================
   ANIMATE
========================= */

function animate(){

    requestAnimationFrame(
        animate
    );

    /* planet */

    if(APP.planetGroup){

        APP.planetGroup.rotation.y +=
            0.0015;

    }

    /* clouds */

    if(APP.cloudLayer){

        APP.cloudLayer.rotation.y +=
            0.0019;

    }

    /* stars */

    APP.starLayers.forEach((s,i)=>{

        s.rotation.y +=
            0.00005 + i*0.00005;

    });

    /* sun cycle */

    APP.sun.position.x =
        Math.sin(DAY_TIME)*5;

    APP.sun.position.z =
        Math.cos(DAY_TIME)*5;

    /* satellites */

    APP.satellites.forEach((s,i)=>{

        s.userData.angle +=
            0.004 + i*0.001;

        s.position.x =
            Math.cos(
                s.userData.angle
            ) * s.userData.radius;

        s.position.z =
            Math.sin(
                s.userData.angle
            ) * s.userData.radius;

        s.position.y =
            Math.sin(
                s.userData.angle*2
            ) * 0.6;

    });

    /* planes */

    APP.planes.forEach((p,i)=>{

        p.userData.angle +=
            0.01 + i*0.002;

        p.position.x =
            Math.cos(
                p.userData.angle
            ) * p.userData.radius;

        p.position.z =
            Math.sin(
                p.userData.angle
            ) * p.userData.radius;

        p.position.y =
            Math.sin(
                p.userData.angle*2
            ) * 0.2;

    });

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
