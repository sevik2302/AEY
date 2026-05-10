async function marketTick(){

  const { data } = await sb.from("players").select("*");

  let sum = 0;

  data.forEach(p=>{
    sum += p.fragments + p.build_level*10;
  });

  const price = 1 + sum * 0.0005;

  await sb.from("market").insert({
    price,
    volume: sum
  });
}

setInterval(marketTick, 8000);
