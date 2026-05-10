setInterval(async ()=>{

const { data } = await sb.from("players").select("*");

let total = 0;
data.forEach(p=>{
  total += p.fragments;
});

const price = 1 + total * 0.00005;

await sb.from("market").insert({
  price,
  volume: total
});

}, 8000);
