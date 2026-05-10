setInterval(async ()=>{

const { data } = await sb.from("players").select("*");

for(let p of data){
  await sb.from("players")
    .update({
      pvp: p.fragments + p.build * 5
    })
    .eq("id", p.id);
}

}, 10000);
