let userId;
let player;

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
      level: 0,
      build: 0,
      planet_level: 1,
      pvp: 0
    };

    await sb.from("players").insert(p);
  }

  player = p;

  updateHUD();
}

/* HUD UPDATE */
function updateHUD(){
  if(!player) return;

  document.getElementById("fragments").innerText = "Fragments: " + player.fragments;
  document.getElementById("level").innerText = "Level: " + player.level;
  document.getElementById("planet").innerText = "Planet: " + player.planet_level;
  document.getElementById("pvp").innerText = "PvP: " + player.pvp;
}

/* TAP */
let lastTap = 0;

async function tap(){
  if(!player) return;
  if(Date.now() - lastTap < 500) return;
  lastTap = Date.now();

  player.fragments += 1;
  player.pvp += 1;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      pvp: player.pvp
    })
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

/* UPGRADE PLANET */
async function upgradePlanet(){
  if(!player) return;

  const cost = 50 * player.planet_level;
  if(player.fragments < cost) return;

  player.fragments -= cost;
  player.planet_level++;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      planet_level: player.planet_level
    })
    .eq("id", userId);

  updateHUD();
}
