setInterval(async ()=>{
  const { data } = await sb.from("players").select("*");

  for(let p of data){
    await sb.from("players")
      .update({
        pvp_score: p.fragments + p.build_level*10
      })
      .eq("id", p.id);
  }

}, 10000);
