window.game = {

  cityLevel:1,

  fragments:0,

  completion:0,

  currentPlanet:0,

  planets:[
    "Terra Prime",
    "Nova Lux",
    "Cryon",
    "Aether",
    "Vortex IX"
  ]

};

/* BUILD CITY */

window.buildCityUpgrade =
  function(){

    game.cityLevel++;

    game.fragments += 150;

    game.completion += 4;

    if(game.completion > 100){

      game.completion = 100;

    }

    generateCities();

    updateUI();
  };

/* NEXT PLANET */

window.nextPlanet =
  function(){

    game.currentPlanet++;

    if(
      game.currentPlanet >=
      game.planets.length
    ){

      game.currentPlanet = 0;

    }

    updateUI();
  };
