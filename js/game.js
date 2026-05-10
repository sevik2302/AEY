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
      build: 0,
      planet_level: 1,
      pvp: 0
    };

    await sb.from("players").insert(p);
  }

  player = p;

  updateHUD();
}

/* HUD */
function updateHUD(){
  if(!player) return;

  document.getElementById("frag").innerText = "Fragments: " + player.fragments;
  document.getElementById("lvl").innerText = "Planet lvl: " + player.planet_level;
  document.getElementById("build").innerText = "Build: " + player.build;
  document.getElementById("pvp").innerText = "PvP: " + player.pvp;
}

/* 🔥 ВАЖНО: СВЯЗЬ С 3D */
function syncVisuals(){

  if(!window.planet || !player) return;

  // 🌍 рост планеты
  const s = 1 + player.planet_level * 0.05;
  planet.scale.set(s,s,s);

  // 🏙 рост зданий
  scene.children.forEach(o=>{
    if(o.userData && o.userData.city){
      o.scale.y = 1 + player.build * 0.15;
    }
  });
}

/* TAP */
let lastTap = 0;

async function tap(){
  if(!player) return;
  if(Date.now() - lastTap < 500) return;

  lastTap = Date.now();

  player.fragments++;
  player.pvp++;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      pvp: player.pvp
    })
    .eq("id", userId);

  updateHUD();
  syncVisuals();
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
  syncVisuals();
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
  syncVisuals();
}
