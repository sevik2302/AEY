window.game = {

  cityLevel: 1,
  fragments: 0,
  completion: 0,
  buildCost: 10,   /* ⚡ было 100 → теперь 10 */

  currentPlanet: 0,

  planets: [
    "Terra Prime",
    "Nova Lux",
    "Cryon",
    "Aether",
    "Vortex IX"
  ]

};

/* =========================
   TAP (x10 BOOST)
========================= */

window.tapFragments = function () {

  game.fragments += 10; /* ⚡ было 1 → теперь 10 */

  updateUI();

};

/* =========================
   BUILD (FAST PROGRESSION)
========================= */

window.buildCityUpgrade = function () {

  if (game.fragments < game.buildCost) return;

  game.fragments -= game.buildCost;

  game.cityLevel++;

  game.completion += 25; /* ⚡ было 10 → теперь 25% */

  if (game.completion > 100) game.completion = 100;

  game.buildCost = Math.floor(game.buildCost * 1.2); /* быстрее рост */

  growCities(game.cityLevel);

  updateUI();

};

/* =========================
   NEXT PLANET (TEST MODE)
========================= */

window.nextPlanet = function () {

  /* ⚡ убираем блок 100% для теста */
  game.currentPlanet++;

  if (game.currentPlanet >= game.planets.length) {
    game.currentPlanet = 0;
  }

  game.cityLevel = 1;
  game.fragments = 0;
  game.completion = 0;
  game.buildCost = 10;

  resetCities();

  updateUI();

};
