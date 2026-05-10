setInterval(async ()=>{
  const { data } = await sb.from("players").select("*");

  let sum = 0;
  data.forEach(p=>{
    sum += p.fragments;
  });

  const price = 1 + sum * 0.0001;

  await sb.from("market").insert({
    price,
    volume: sum
  });

}, 8000);
