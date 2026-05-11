const supabaseUrl = "https://qdvohbjzsuhxmexwfvxu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkdm9oYmp6c3VoeG1leHdmdnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyODUwMjIsImV4cCI6MjA5Mzg2MTAyMn0.SgipxGPpNkCL5zn6uJ3IBaI3xdlh9CT6cEb-ovJxc18";

window.sb = supabase.createClient(supabaseUrl,supabaseKey);

/* PLAYER STATE */
window.player = {
  fragments: 0,
  level: 1
};

/* LOAD */
window.loadPlayer = async function(){

  let { data } = await sb
    .from("players")
    .select("*")
    .limit(1)
    .single();

  if(data){
    player.fragments = data.fragments || 0;
    player.level = data.level || 1;
  }
};

/* SAVE */
window.savePlayer = async function(){

  await sb.from("players").upsert({
    id:1,
    fragments:player.fragments,
    level:player.level
  });

};

/* EVENTS */
window.pushEvent = async function(type,payload){

  await sb.from("events").insert({
    type,
    payload
  });

};
