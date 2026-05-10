let userId;
let player;

async function init(){

  // LOCAL ID (ВАЖНО)
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
    await sb.from("players").insert({
      id: userId,
      fragments: 0,
      level: 0,
      planet: 0,
      build_level: 0,
      pvp_score: 0
    });

    p = {
      id: userId,
      fragments: 0,
      level: 0,
      planet: 0,
      build_level: 0,
      pvp_score: 0
    };
  }

  player = p;
}

/* TAP */
let lastTap = 0;
async function tap(){
  if(Date.now() - lastTap < 1000) return;
  lastTap = Date.now();

  player.fragments++;
  player.pvp_score++;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      pvp_score: player.pvp_score
    })
    .eq("id", userId);
}

/* BUILD */
async function build(){
  const cost = 10 * (player.build_level + 1);
  if(player.fragments < cost) return;

  player.fragments -= cost;
  player.build_level++;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      build_level: player.build_level
    })
    .eq("id", userId);
}

/* NEXT PLANET */
async function nextPlanet(){
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
}
