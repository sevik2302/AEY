setInterval(async ()=>{

  if(!window.sb) return;

  try{

    await sb
      .from("events")
      .insert({

        event_type:"tick",

        value:game.fragments

      });

  }catch(e){

    console.log(e);

  }

},30000);
