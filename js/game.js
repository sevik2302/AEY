window.fragments = 0;
window.level = 1;

/* INIT */
setTimeout(async ()=>{

  if(window.loadPlayer){
    await loadPlayer();

    fragments = player.fragments;
    level = player.level;

    updateUI();
  }

},800);

window.tap = function(){

  fragments++;
  player.fragments = fragments;

  updateUI();
};

window.build = function(){

  if(fragments >= 10){

    fragments -= 10;
    level++;

    player.level = level;
    player.fragments = fragments;

    spawnCities();

    savePlayer();
    pushEvent("build",{level});
  }

  updateUI();
};

window.nextPlanet = function(){
  console.log("next planet");
};

function updateUI(){
  document.getElementById("info").innerHTML =
  `Fragments: ${fragments}<br>Level: ${level}`;
}

/* AUTO SAVE */
setInterval(()=>{
  savePlayer();
},5000);
