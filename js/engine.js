window.APP = {};

APP.scene = new THREE.Scene();

/* CAMERA */

APP.camera =
    new THREE.PerspectiveCamera(
        45,
        innerWidth/innerHeight,
        0.1,
        1000
    );

/* дальше камера — чтобы планета влезала */

APP.camera.position.set(0,0,8.8);

/* RENDERER */

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

/* LIGHT */

const ambient =
    new THREE.AmbientLight(
        0xffffff,
        2.1
    );

APP.scene.add(ambient);

const sun =
    new THREE.DirectionalLight(
        0xffffff,
        2.7
    );

sun.position.set(5,6,5);

APP.scene.add(sun);

/* ===== CLOUDS ===== */

function makeCloud(x,y,s){

    const group =
        new THREE.Group();

    const material =
        new THREE.MeshToonMaterial({
            color:0xffffff
        });

    for(let i=0;i<4;i++){

        const cloud =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.32 + Math.random()*0.22,
                    18,
                    18
                ),

                material

            );

        cloud.position.x =
            i * 0.28;

        group.add(cloud);

    }

    group.position.set(x,y,-4);

    group.scale.setScalar(s);

    APP.scene.add(group);

}

makeCloud(-5,3,1.3);
makeCloud(4,2,1);
makeCloud(-5,-3,1.5);
makeCloud(5,-2,1.1);

/* LOOP */

function animate(){

    requestAnimationFrame(animate);

    if(APP.planetGroup){

        APP.planetGroup.rotation.y += 0.0012;

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
