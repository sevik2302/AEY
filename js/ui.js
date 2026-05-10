window.updateUI =
  function(){

    document.getElementById(
      "planetText"
    ).innerText =
      "Planet: " +
      game.planets[
        game.currentPlanet
      ];

    document.getElementById(
      "cityText"
    ).innerText =
      "City Level: " +
      game.cityLevel;

    document.getElementById(
      "fragmentsText"
    ).innerText =
      "Fragments: " +
      game.fragments;

    document.getElementById(
      "completionText"
    ).innerText =
      "Completion: " +
      game.completion +
      "%";

    document.getElementById(
      "progressFill"
    ).style.width =
      game.completion + "%";
  };

updateUI();
