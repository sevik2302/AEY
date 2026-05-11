window.APP = {};

APP.scene = new THREE.Scene();

APP.camera = new THREE.PerspectiveCamera(
    45,
    innerWidth/innerHeight,
    0.1,
    1000
);

APP.camera.position.set(0,0,8);

APP.renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});

APP.renderer.setSize(innerWidth,innerHeight);
APP.renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(APP.renderer.domElement);

/* LIGHTING */

const ambient = new THREE.AmbientLight(0xffffff,1.3);
APP.scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff,2.2);
sun.position.set(5,4,5);

APP.scene.add(sun);

/* STARS */

const starsGeo = new THREE.BufferGeometry();

const stars = [];

for(let i=0;i<5000;i++){

    stars.push((Math.random()-0.5)*400);
    stars.push((Math.random()-0.5)*400);
    stars.push((Math.random()-0.5)*400);

}

starsGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(stars,3)
);

const starsMat = new THREE.PointsMaterial({
    color:0xffffff,
    size:0.03
});

const starField = new THREE.Points(starsGeo,starsMat);

APP.scene.add(starField);

/* ANIMATION */

function animate(){

    requestAnimationFrame(animate);

    if(APP.planet){
        APP.planet.rotation.y += 0.0012;
    }

    if(APP.clouds){
        APP.clouds.rotation.y += 0.0016;
    }

    if(APP.cityGroup){
        APP.cityGroup.rotation.y += 0.0004;
    }

    APP.renderer.render(APP.scene,APP.camera);
}

animate();

/* RESIZE */

addEventListener("resize",()=>{

    APP.camera.aspect = innerWidth/innerHeight;
    APP.camera.updateProjectionMatrix();

    APP.renderer.setSize(innerWidth,innerHeight);

});
