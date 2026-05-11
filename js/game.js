window.fragments = 0;
window.level = 1;
window.population = 120000;
window.income = 1;
window.currentPlanet = 0;

/* =========================
   PLANETS
========================= */

const PLANETS = [

    {
        name:"Earth",
        ocean:0x0055ff,
        land:0xa7ff2f,
        sky:0x8ed8ff
    },

    {
        name:"Mars",
        ocean:0x8f2d16,
        land:0xff7b47,
        sky:0xffc19a
    },

    {
        name:"Ice",
        ocean:0x9ee6ff,
        land:0xffffff,
        sky:0xdff6ff
    },

    {
        name:"Cyber",
        ocean:0x111133,
        land:0x00ffcc,
        sky:0x001122
    },

    {
        name:"Lava",
        ocean:0x2b0000,
        land:0xff4400,
        sky:0xff9955
    }

];

/* =========================
   UI
========================= */

const fragmentsValue =
    document.getElementById(
        "fragmentsValue"
    );

const levelValue =
    document.getElementById(
        "levelValue"
    );

const populationValue =
    document.getElementById(
        "populationValue"
    );

/* =========================
   NUMBER ANIMATION
========================= */

function animateNumber(el,to){

    const start =
        Number(
            el.innerText.replace(/\D/g,"")
        ) || 0;

    const duration = 300;

    const startTime =
        performance.now();

    function frame(now){

        const p =
            Math.min(
                1,
                (now-startTime)/duration
            );

        const val =
            Math.floor(
                start +
                (to-start)*p
            );

        el.innerText =
            val.toLocaleString();

        if(p < 1){

            requestAnimationFrame(
                frame
            );

        }

    }

    requestAnimationFrame(frame);

}

/* =========================
   UPDATE UI
========================= */

function updateUI(){

    animateNumber(
        fragmentsValue,
        fragments
    );

    levelValue.innerText =
        level;

    populationValue.innerText =
        Math.floor(
            population/1000
        ) + "K";

}

/* =========================
   INIT
========================= */

setTimeout(async()=>{

    await loadPlayer();

    fragments =
        player.fragments;

    level =
        player.level;

    population =
        player.population;

    spawnCities(level);

    updateUI();

},500);

/* =========================
   PASSIVE INCOME
========================= */

setInterval(()=>{

    const gain =
        Math.floor(
            level * income
        );

    fragments += gain;

    player.fragments =
        fragments;

    updateUI();

},1000);

/* =========================
   HAPTIC
========================= */

function haptic(type="light"){

    if(
        window.Telegram &&
        Telegram.WebApp &&
        Telegram.WebApp.HapticFeedback
    ){

        if(type==="light"){

            Telegram.WebApp
            .HapticFeedback
            .impactOccurred("light");

        }

        if(type==="medium"){

            Telegram.WebApp
            .HapticFeedback
            .impactOccurred("medium");

        }

    }

}

/* =========================
   SOUND
========================= */

function sound(freq=440,duration=0.06){

    const ctx =
        new AudioContext();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    osc.frequency.value =
        freq;

    osc.connect(gain);

    gain.connect(
        ctx.destination
    );

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
    );

    osc.stop(
        ctx.currentTime + duration
    );

}

/* =========================
   COLLECT
========================= */

document.getElementById(
    "collectBtn"
).onclick = (e)=>{

    fragments += 1;

    player.fragments =
        fragments;

    updateUI();

    floatText(
        "+1",
        e.clientX,
        e.clientY
    );

    haptic("light");

    sound(700,0.04);

    APP.camera.position.z =
        8.5;

    setTimeout(()=>{

        APP.camera.position.z =
            8.8;

    },80);

};

/* =========================
   UPGRADE
========================= */

document.getElementById(
    "upgradeBtn"
).onclick = ()=>{

    const cost =
        level * 10;

    if(fragments >= cost){

        fragments -= cost;

        level++;

        population +=
            18000 * level;

        income += 0.2;

        player.fragments =
            fragments;

        player.level =
            level;

        player.population =
            population;

        spawnCities(level);

        savePlayer();

        pushEvent(
            "upgrade",
            { level }
        );

        updateUI();

        haptic("medium");

        sound(240,0.12);

        APP.camera.position.z =
            8.1;

        setTimeout(()=>{

            APP.camera.position.z =
                8.8;

        },160);

        /*
        new planet every 10 lvls
        */

        if(level % 10 === 0){

            nextPlanet();

        }

    }

};

/* =========================
   PLANET SWITCH
========================= */

function nextPlanet(){

    currentPlanet++;

    if(
        currentPlanet >=
        PLANETS.length
    ){

        currentPlanet = 0;

    }

    const p =
        PLANETS[currentPlanet];

    APP.planet.material.color =
        new THREE.Color(
            p.ocean
        );

    document.body.style.background =
        `linear-gradient(
            to bottom,
            #ffffff,
            #${p.sky.toString(16)}
        )`;

}

/* =========================
   EVENTS
========================= */

setInterval(()=>{

    const events = [

        {
            type:"crypto boom",
            bonus:5
        },

        {
            type:"solar storm",
            bonus:-2
        },

        {
            type:"meteor shower",
            bonus:3
        }

    ];

    const event =
        events[
            Math.floor(
                Math.random()*
                events.length
            )
        ];

    income +=
        event.bonus * 0.1;

    pushEvent(
        event.type,
        event
    );

},25000);

/* =========================
   DRONES
========================= */

APP.drones = [];

for(let i=0;i<4;i++){

    const drone =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.03,
                8,
                8
            ),

            new THREE.MeshBasicMaterial({

                color:0xffffff

            })

        );

    drone.angle =
        Math.random()*
        Math.PI*2;

    drone.radius =
        2.4 +
        Math.random()*0.4;

    APP.scene.add(drone);

    APP.drones.push(drone);

}

function animateDrones(){

    requestAnimationFrame(
        animateDrones
    );

    APP.drones.forEach((d,i)=>{

        d.angle +=
            0.01 +
            i*0.002;

        d.position.x =
            Math.cos(d.angle)*
            d.radius;

        d.position.z =
            Math.sin(d.angle)*
            d.radius;

        d.position.y =
            Math.sin(
                d.angle*2
            )*0.3;

    });

}

animateDrones();
