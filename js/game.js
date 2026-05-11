window.fragments = 0;

window.level = 1;

window.population = 120000;

const stats =
    document.getElementById("stats");

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

/* UI */

function updateUI(){

    stats.innerHTML = `

    Fragments:
    ${fragments}

    <br>

    Level:
    ${level}

    <br>

    Population:
    ${(population/1000).toFixed(1)}K

    `;

}

/* COLLECT */

document.getElementById(
    "tapBtn"
).onclick = (e)=>{

    fragments++;

    player.fragments =
        fragments;

    floatText(
        "+1",
        e.clientX,
        e.clientY
    );

    APP.camera.position.z = 7.7;

    setTimeout(()=>{
        APP.camera.position.z = 8;
    },80);

    updateUI();

};

/* BUILD */

document.getElementById(
    "buildBtn"
).onclick = ()=>{

    if(fragments >= 10){

        fragments -= 10;

        level++;

        population +=
            15000 * level;

        player.fragments =
            fragments;

        player.level =
            level;

        player.population =
            population;

        spawnCities(level);

        savePlayer();

        APP.camera.position.z = 7.2;

        setTimeout(()=>{
            APP.camera.position.z = 8;
        },180);

    }

    updateUI();

};

/* PLANET BUTTON */

document.getElementById(
    "planetBtn"
).onclick = ()=>{

    APP.camera.position.z = 10;

    setTimeout(()=>{
        APP.camera.position.z = 8;
    },600);

};

updateUI();
