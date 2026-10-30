(function(){
  var sched={0:null,1:[600,1200],2:[600,1200],3:[600,1200],4:[600,1200],5:[600,1200],6:[540,840]};
  var names={0:"domingo",1:"lunes",2:"martes",3:"miércoles",4:"jueves",5:"viernes",6:"sábado"};
  var map={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
  function fmt(m){var h=Math.floor(m/60),mm=m%60;return h+":"+(mm<10?"0":"")+mm;}
  try{
    var p=new Intl.DateTimeFormat("en-US",{timeZone:"Europe/Madrid",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date());
    var day=0,h=0,m=0;
    p.forEach(function(x){if(x.type==="weekday")day=map[x.value];if(x.type==="hour")h=parseInt(x.value,10);if(x.type==="minute")m=parseInt(x.value,10);});
    var now=h*60+m;
    var row=document.querySelector('#hours tr[data-d="'+day+'"]');
    if(row)row.className="today";
    var box=document.getElementById("status"),txt=document.getElementById("status-text");
    var s=sched[day];
    if(s&&now>=s[0]&&now<s[1]){
      box.className="status open";
      txt.textContent="Abierto ahora, hasta las "+fmt(s[1]);
    }else{
      box.className="status closed";
      var next="";
      if(s&&now<s[0]){next="Hoy abrimos a las "+fmt(s[0]);}
      else{
        for(var i=1;i<=7;i++){var d=(day+i)%7;if(sched[d]){next=(i===1?"Mañana":"El "+names[d])+" abrimos a las "+fmt(sched[d][0]);break;}}
      }
      txt.textContent="Cerrado ahora. "+next;
    }
  }catch(e){
    document.getElementById("status").style.display="none";
  }
})();