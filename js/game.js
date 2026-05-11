window.fragments = 0;
window.level = 1;
window.population = 120000;
window.income = 1;

window.player = {
    fragments:0,
    level:1,
    population:120000
};

/* =========================
   DISTRICTS
========================= */

window.CITY_STATE = {

    village:false,
    town:false,
    city:false,
    megacity:false,
    cyber:false

};

/* =========================
   PLANETS
========================= */

window.PLANETS = [

    {
        name:"Earth",
        ocean:"#0055ff",
        land:"#a7ff2f",
        glow:"#8ed8ff"
    },

    {
        name:"Mars",
        ocean:"#8f2d16",
        land:"#ff7b47",
        glow:"#ffb58c"
    },

    {
        name:"Ice",
        ocean:"#8ce7ff",
        land:"#ffffff",
        glow:"#dff8ff"
    },

    {
        name:"Cyber",
        ocean:"#091120",
        land:"#00ffc3",
        glow:"#00d0ff"
    },

    {
        name:"Lava",
        ocean:"#2a0000",
        land:"#ff4400",
        glow:"#ff9a44"
    }

];

window.currentPlanet = 0;

/* =========================
   UI
========================= */

const fragmentsEl =
    document.getElementById(
        "fragmentsValue"
    );

const levelEl =
    document.getElementById(
        "levelValue"
    );

const populationEl =
    document.getElementById(
        "populationValue"
    );

/* =========================
   UPDATE UI
========================= */

function updateUI(){

    fragmentsEl.innerText =
        Math.floor(
            fragments
        ).toLocaleString();

    levelEl.innerText =
        level;

    populationEl.innerText =
        Math.floor(
            population/1000
        ) + "K";

}

/* =========================
   FLOAT TEXT
========================= */

window.floatText =
function(text,x,y){

    const el =
        document.createElement("div");

    el.className =
        "floatText";

    el.innerText =
        text;

    el.style.left =
        x + "px";

    el.style.top =
        y + "px";

    document.body.appendChild(
        el
    );

    setTimeout(()=>{

        el.remove();

    },1000);

};

/* =========================
   HAPTIC
========================= */

function haptic(type="light"){

    if(
        window.Telegram &&
        Telegram.WebApp &&
        Telegram.WebApp.HapticFeedback
    ){

        Telegram.WebApp
        .HapticFeedback
        .impactOccurred(type);

    }

}

/* =========================
   SOUND
========================= */

function sound(freq=440,duration=0.05){

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
   PASSIVE INCOME
========================= */

setInterval(()=>{

    fragments += income;

    player.fragments =
        fragments;

    updateUI();

},1000);

/* =========================
   COLLECT
========================= */

document.getElementById(
    "collectBtn"
).onclick = (e)=>{

    fragments += 1 + level*0.3;

    updateUI();

    haptic("light");

    sound(700,0.04);

    floatText(
        "+FRAG",
        e.clientX,
        e.clientY
    );

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

        income += 0.4;

        player.level =
            level;

        player.fragments =
            fragments;

        player.population =
            population;

        unlockFeatures();

        spawnCities(level);

        updateUI();

        haptic("medium");

        sound(220,0.12);

        APP.camera.position.z =
            8.1;

        setTimeout(()=>{

            APP.camera.position.z =
                8.8;

        },140);

    }

};

/* =========================
   UNLOCKS
========================= */

function unlockFeatures(){

    if(level >= 3){

        CITY_STATE.village =
            true;

    }

    if(level >= 8){

        CITY_STATE.town =
            true;

    }

    if(level >= 15){

        CITY_STATE.city =
            true;

    }

    if(level >= 25){

        CITY_STATE.megacity =
            true;

    }

    if(level >= 40){

        CITY_STATE.cyber =
            true;

    }

    /* planet switch */

    if(level % 10 === 0){

        nextPlanet();

    }

}

/* =========================
   NEXT PLANET
========================= */

function nextPlanet(){

    currentPlanet++;

    if(
        currentPlanet >=
        PLANETS.length
    ){

        currentPlanet = 0;

    }

}

/* =========================
   EVENTS
========================= */

setInterval(()=>{

    const events = [

        {
            name:"crypto boom",
            bonus:5
        },

        {
            name:"solar storm",
            bonus:-2
        },

        {
            name:"meteor shower",
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

},25000);

/* =========================
   DAY/NIGHT
========================= */

window.DAY_TIME = 0;

setInterval(()=>{

    DAY_TIME += 0.003;

},16);

updateUI();
