let userId;
let player;

/* INIT */
async function init(){

  userId = localStorage.getItem("aey_id");

  if(!userId){
    userId = crypto.randomUUID();
    localStorage.setItem("aey_id", userId);
  }

  let { data: p } = await sb
    .from("players")
    .select("*")
    .eq("id", userId)
    .single();

  if(!p){
    p = {
      id: userId,
      fragments: 0,
      build: 0,
      planet: 0,
      level: 0
    };

    await sb.from("players").insert(p);
  }

  player = p;

  updateHUD();
}

/* HUD */
function updateHUD(){
  if(!player) return;

  document.getElementById("frag").innerText =
    "Fragments: " + player.fragments;

  document.getElementById("planet").innerText =
    "Planet: " + (player.planet + 1);

  document.getElementById("level").innerText =
    "Level: " + player.level;
}

/* TAP */
let lastTap = 0;

async function tap(){
  if(!player) return;
  if(Date.now() - lastTap < 400) return;

  lastTap = Date.now();

  player.fragments++;

  await sb.from("players")
    .update({ fragments: player.fragments })
    .eq("id", userId);

  updateHUD();
}

/* BUILD */
async function build(){
  if(!player) return;

  const cost = 10 * (player.build + 1);
  if(player.fragments < cost) return;

  player.fragments -= cost;
  player.build++;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      build: player.build
    })
    .eq("id", userId);

  updateHUD();
}

/* NEXT PLANET */
async function nextPlanet(){

  const unlocked = player.planet;

  if(unlocked >= galaxy.length - 1){
    alert("MAX PLANETS REACHED");
    return;
  }

  const cost = 50 * (player.planet + 1);
  if(player.fragments < cost) return;

  player.fragments -= cost;
  player.planet++;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      planet: player.planet
    })
    .eq("id", userId);

  updateHUD();

  switchPlanet(player.planet);
}
