window.APP = {};

APP.scene =
    new THREE.Scene();

/* =========================
   CAMERA
========================= */

APP.camera =
    new THREE.PerspectiveCamera(
        42,
        innerWidth/innerHeight,
        0.1,
        1000
    );

APP.camera.position.set(
    0,
    0,
    8.4
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
    Math.min(
        devicePixelRatio,
        2
    )
);

document.body.appendChild(
    APP.renderer.domElement);

/* =========================
   FOG
========================= */

APP.scene.fog =
    new THREE.Fog(
        0x07111f,
        14,
        26
    );

/* =========================
   LIGHTS
========================= */

const ambient =
    new THREE.AmbientLight(
        0xffffff,
        0.65
    );

APP.scene.add(
    ambient
);

/* sun */

APP.sun =
    new THREE.DirectionalLight(
        0xfff2d6,
        3.8
    );

APP.sun.position.set(
    6,
    3,
    5
);

APP.scene.add(
    APP.sun
);

/* blue rim */

const blueLight =
    new THREE.DirectionalLight(
        0x4db8ff,
        1.4
    );

blueLight.position.set(
    -5,
    -2,
    -4
);

APP.scene.add(
    blueLight
);

/* =========================
   DEEP SPACE STARS
========================= */

APP.starLayers = [];

for(let l=0;l<4;l++){

    const geo =
        new THREE.BufferGeometry();

    const stars = [];

    for(let i=0;i<1800;i++){

        stars.push(

            (Math.random()-0.5)*220,
            (Math.random()-0.5)*220,
            (Math.random()-0.5)*220

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
            size:0.06 + l*0.035,
            transparent:true,
            opacity:0.8

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
   BIG SATELLITES
========================= */

APP.satellites = [];

for(let i=0;i<3;i++){

    const sat =
        new THREE.Group();

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.12,
                0.08,
                0.08
            ),

            new THREE.MeshToonMaterial({

                color:0f2f2f2

            })

        );

    sat.add(body);

    /* panels */

    const panel1 =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.22,
                0.012,
                0.08
            ),

            new THREE.MeshToonMaterial({

                color:0x49bfff

            })

        );

    panel1.position.x =
        -0.18;

    sat.add(panel1);

    const panel2 =
        panel1.clone();

    panel2.position.x =
        0.18;

    sat.add(panel2);

    sat.userData.angle =
        Math.random()*Math.PI*2;

    sat.userData.radius =
        3.1 + i*0.4;

    APP.scene.add(sat);

    APP.satellites.push(sat);

}

/* =========================
   PLANES
========================= */

APP.planes = [];

for(let i=0;i<4;i++){

    const plane =
        new THREE.Group();

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.16,
                0.04,
                0.04
            ),

            new THREE.MeshToonMaterial({

                color:0xffffff

            })

        );

    plane.add(body);

    const wing =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.04,
                0.01,
                0.20
            ),

            new THREE.MeshToonMaterial({

                color:0xff5d5d

            })

        );

    plane.add(wing);

    /* tail */

    const tail =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.02,
                0.05,
                0.02
            ),

            new THREE.MeshToonMaterial({

                color:0xff5d5d

            })

        );

    tail.position.x =
        -0.07;

    tail.position.y =
        0.03;

    plane.add(tail);

    plane.userData.angle =
        Math.random()*Math.PI*2;

    plane.userData.radius =
        2.4 + Math.random()*0.5;

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
            0.0014;

    }

    /* clouds */

    if(APP.cloudLayer){

        APP.cloudLayer.rotation.y +=
            0.0024;

        APP.cloudLayer.material.opacity =
            0.10 +
            Math.sin(
                performance.now()*0.0004
            ) * 0.02;

    }

    /* stars */

    APP.starLayers.forEach((s,i)=>{

        s.rotation.y +=
            0.00003 +
            i*0.00004;

    });

    /* cinematic sun */

    const t =
        performance.now()*0.00012;

    APP.sun.position.x =
        Math.sin(t)*6;

    APP.sun.position.z =
        Math.cos(t)*6;

    /* satellites */

    APP.satellites.forEach((s,i)=>{

        s.userData.angle +=
            0.002 +
            i*0.0007;

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
            ) * 0.5;

        s.lookAt(0,0,0);

    });

    /* planes */

    APP.planes.forEach((p,i)=>{

        p.userData.angle +=
            0.006 +
            i*0.001;

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
                p.userData.angle*3
            ) * 0.3;

        p.lookAt(0,0,0);

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
