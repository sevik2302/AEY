let userId;
let player;

/* =========================
   INIT
========================= */
async function init() {

  userId = localStorage.getItem("aey_id");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("aey_id", userId);
  }

  let { data: p } = await sb
    .from("players")
    .select("*")
    .eq("id", userId)
    .single();

  if (!p) {
    p = {
      id: userId,
      fragments: 0,
      build: 1,
      planet_level: 1
    };

    await sb.from("players").insert(p);
  }

  player = p;

  updateHUD();

  /* 🔥 СТАРТОВЫЙ ГОРОД (ВАЖНО) */
  setTimeout(() => {
    if (window.updateCity) {
      updateCity(player.build);
    }
  }, 800);
}

/* =========================
   HUD
========================= */
function updateHUD() {

  if (!player) return;

  document.getElementById("frag").innerText =
    "Fragments: " + player.fragments;

  document.getElementById("planet").innerText =
    "Planet: " + player.planet_level;

  const percent = Math.min(player.build * 10, 100);

  document.getElementById("buildText").innerText =
    "Build: " + percent + "%";

  const bar = document.getElementById("buildFill");
  if (bar) bar.style.width = percent + "%";
}

/* =========================
   TAP
========================= */
let lastTap = 0;

async function tap() {

  if (!player) return;
  if (Date.now() - lastTap < 400) return;

  lastTap = Date.now();

  player.fragments += 1;

  await sb.from("players")
    .update({ fragments: player.fragments })
    .eq("id", userId);

  updateHUD();
}

/* =========================
   BUILD (🔥 ГЛАВНАЯ СВЯЗЬ С ГОРОДОМ)
========================= */
async function build() {

  if (!player) return;

  const cost = 10 * player.build;

  if (player.fragments < cost) return;

  player.fragments -= cost;
  player.build += 1;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      build: player.build
    })
    .eq("id", userId);

  updateHUD();

  /* 🔥 ВАЖНЕЙШАЯ СТРОКА */
  if (window.updateCity) {
    updateCity(player.build);
  }
}

/* =========================
   PLANET UPGRADE (пока без визуала)
========================= */
async function upgradePlanet() {

  if (!player) return;

  const cost = 50 * player.planet_level;

  if (player.fragments < cost) return;

  player.fragments -= cost;
  player.planet_level += 1;

  await sb.from("players")
    .update({
      fragments: player.fragments,
      planet_level: player.planet_level
    })
    .eq("id", userId);

  updateHUD();
}
