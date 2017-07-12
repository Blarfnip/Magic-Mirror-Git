
//refreshTime();
var refresh = setInterval(refreshTime, 3000);
refreshTime();


function refreshTime()
{
  var d = new Date();
  //var options = { hour12:true, timeZoneName: 'short' };
  var text = "<span style='font-size:33px;'>";
  text += d.toLocaleDateString([], {weekday:'long', month:'long', day:'numeric'});
  text += "<br></span>";
  text += d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById('clock').innerHTML = text;
}

// var animTime = setInterval(animateTime, 15);
//
// var count = 0;
// function animateTime()
// {
//   count += 3;
//   document.getElementById('time').style.left = count % 200 + 'px';
//
// }
