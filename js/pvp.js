async function updatePvP(){

  const { data } = await sb.from("players").select("*");

  for(let p of data){

    const score =
      p.fragments +
      p.build_level * 20;

    await sb.from("players")
      .update({ pvp_score: score })
      .eq("id", p.id);
  }
}

setInterval(updatePvP, 10000);
