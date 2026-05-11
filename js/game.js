window.fragments = 0;
window.level = 1;
window.population = 120000;

const stats = document.getElementById("stats");

function updateUI(){

    stats.innerHTML = `
    Fragments: ${fragments}<br>
    Level: ${level}<br>
    Population: ${(population/1000).toFixed(1)}K
    `;
}

document.getElementById("tapBtn").onclick = (e)=>{

    fragments += 1;

    floatText(
        "+1",
        e.clientX,
        e.clientY
    );

    APP.camera.position.z = 7.9;

    setTimeout(()=>{
        APP.camera.position.z = 8;
    },80);

    updateUI();
};

document.getElementById("buildBtn").onclick = ()=>{

    if(fragments >= 10){

        fragments -= 10;

        level++;

        population += 25000 * level;

        spawnCities(level);

        APP.camera.position.z = 7.4;

        setTimeout(()=>{
            APP.camera.position.z = 8;
        },200);
    }

    updateUI();
};

document.getElementById("planetBtn").onclick = ()=>{

    APP.camera.position.z = 11;

    setTimeout(()=>{
        APP.camera.position.z = 8;
    },600);

};

updateUI();
