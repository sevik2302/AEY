window.floatText = function(text,x,y){

    const el = document.createElement("div");

    el.className = "floatText";

    el.innerText = text;

    el.style.left = x+"px";
    el.style.top = y+"px";

    document.body.appendChild(el);

    setTimeout(()=>{
        el.remove();
    },1000);
}
