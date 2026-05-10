window.game = {

  cityLevel:1,
  fragments:0,
  completion:0,
  buildCost:100,

  currentPlanet:0,

  planets:[
    "Terra Prime",
    "Nova Lux",
    "Cryon",
    "Aether",
    "Vortex IX"
  ]

};

/* =========================
   TAP SYSTEM (ГЛАВНЫЙ ИСТОЧНИК FRAGMENTS)
========================= */

window.tapFragments =
  function(){

    game.fragments += 1;

    updateUI();

  };

/* =========================
   BUILD SYSTEM
========================= */

window.buildCityUpgrade =
  function(){

    if(game.fragments < game.buildCost){
      return;
    }

    game.fragments -= game.buildCost;

    game.cityLevel++;

    game.completion += 10;

    if(game.completion > 100){
      game.completion = 100;
    }

    game.buildCost =
      Math.floor(game.buildCost * 1.45);

    growCities(game.cityLevel);

    updateUI();
  };

/* =========================
   NEXT PLANET
========================= */

window.nextPlanet =
  function(){

    if(game.completion < 100){
      return;
    }

    game.currentPlanet++;

    if(game.currentPlanet >= game.planets.length){
      game.currentPlanet = 0;
    }

    game.cityLevel = 1;
    game.fragments = 0;
    game.completion = 0;
    game.buildCost = 100;

    resetCities();

    updateUI();
  };
