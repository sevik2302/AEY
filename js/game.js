window.fragments = 0;
window.level = 1;
window.population = 120000;

/* UI */

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

/* INIT */

setTimeout(async ()=>{

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

/* UPDATE */

function updateUI(){

    fragmentsValue.innerText =
        fragments;

    levelValue.innerText =
        level;

    populationValue.innerText =
        Math.floor(
            population/1000
        ) + "K";

}

/* COLLECT */

document.getElementById(
    "collectBtn"
).onclick = (e)=>{

    fragments++;

    player.fragments =
        fragments;

    floatText(
        "+1",
        e.clientX,
        e.clientY
    );

    APP.camera.position.z = 8.5;

    setTimeout(()=>{
        APP.camera.position.z = 8.8;
    },80);

    updateUI();

};

/* UPGRADE */

document.getElementById(
    "upgradeBtn"
).onclick = ()=>{

    if(fragments >= 10){

        fragments -= 10;

        level++;

        population +=
            18000 * level;

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

        APP.camera.position.z = 8.2;

        setTimeout(()=>{
            APP.camera.position.z = 8.8;
        },150);

    }

    updateUI();

};

/* PLANET BUTTON */

document.getElementById(
    "planetBtn"
).onclick = ()=>{

    APP.camera.position.z = 10;

    setTimeout(()=>{
        APP.camera.position.z = 8.8;
    },700);

};
