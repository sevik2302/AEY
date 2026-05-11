window.fragments = 0;

window.level = 1;

window.population = 120000;

const stats =
    document.getElementById("stats");

/* INIT */

setTimeout(async ()=>{

    if(window.loadPlayer){

        await loadPlayer();

        fragments =
            player.fragments;

        level =
            player.level;

        population =
            player.population;

        spawnCities(level);

        updateUI();
    }

},600);

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

/* TAP */

document.getElementById(
    "tapBtn"
).onclick = (e)=>{

    fragments += 1;

    player.fragments =
        fragments;

    floatText(
        "+1",
        e.clientX,
        e.clientY
    );

    APP.camera.position.z = 7.8;

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
            25000 * level;

        player.fragments =
            fragments;

        player.level =
            level;

        player.population =
            population;

        spawnCities(level);

        savePlayer();

        pushEvent(
            "build",
            { level }
        );

        APP.camera.position.z = 7.2;

        setTimeout(()=>{
            APP.camera.position.z = 8;
        },180);

    }

    updateUI();

};

/* NEXT PLANET */

document.getElementById(
    "planetBtn"
).onclick = ()=>{

    APP.camera.position.z = 11;

    setTimeout(()=>{
        APP.camera.position.z = 8;
    },700);

};

updateUI();
