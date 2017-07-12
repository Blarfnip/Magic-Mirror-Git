
var currentAnim = setInterval(openGreeting, 15);
var currentExitAnim;

var exitAnim = function begin() {clearInterval(currentExitAnim); };

var centerText;
var l;
var c = 0;
var goalText;
function setTextOutput(text)
{
  c = 0;
  goalText = text;
  centerText = setInterval(centerTextAnim, 60);
}

function centerTextAnim(){
  l = goalText.length;
  //console.log(l + " " + c + " " + goalText.substring(0, c));
  var t = goalText.substring(0, c) + "<span style='color:black;'>" + goalText.substring(c, l) + "</span>";
  document.getElementById('center').innerHTML = t;
  c = c+1;
  if(c > l)
    clearInterval(centerText);
}



var greetingProgress = 0;
var greetingDiv = document.getElementById('center');

function greetingInit()
{
  if(greetingProgress < 90){
    currentExitAnim = setInterval(exitAnim, 15);
    currentAnim = setInterval(openGreeting, 15);
    greetingProgress = 0;
  }
}

function openGreeting()
{
  exitAnim();
  if(greetingProgress >= 100)
  {
    clearInterval(currentAnim);
    exitAnim = window["closeGreeting"];
    //currentForecastInit();
  }
  else {
    var val = (greetingProgress / 100.0) * 255.0;
    //greetingDiv.style.color = 'rgb(' + val + ', ' + val + ', ' + val + ')';
    greetingDiv.style.opacity = greetingProgress / 100;
    greetingProgress = greetingProgress+2;
    //console.log("MOVING" + greetingProgress);
  }
  //exitAnim = window["closeGreeting"];
}

function closeGreeting()
{
  if(greetingProgress <= 0)
  {
    clearInterval(currentExitAnim);
    //greetingDiv.style.color = 'rgb(0,0,0)';
    greetingDiv.style.opacity = 0;
  }
  else {
    var val = (greetingProgress / 100.0) * 255.0;
    //greetingDiv.style.color = 'rgb(' + val + ', ' + val + ', ' + val + ')';
    greetingDiv.style.opacity = greetingProgress / 100;
    greetingProgress -= 2;
  }
}

var currentForecastProgress = 0;
var forecastOffset = 100;
var forecastYOff = 0;
var currentForecastTitleDiv = document.getElementById('center-currentWeather-title');
var currentForecastDataDiv = document.getElementById('center-currentWeather-data');

function currentForecastInit()
{
    currentExitAnim = setInterval(exitAnim, 15);

    currentForecastProgress = 0;
    currentAnim = setInterval(openCurrentForecast, 15);
}

function openCurrentForecast()
{

  if(currentForecastProgress >= 100)
  {
    clearInterval(currentAnim);
    exitAnim = window["closeCurrentForecast"];
  }
  else {
    var val = (currentForecastProgress / 100.0) * 255.0;
    //currentForecastTitleDiv.style.color = 'rgb(' + val + ', ' + val + ', ' + val + ')';
    //currentForecastDataDiv.style.color = 'rgb(' + val + ', ' + val + ', ' + val + ')';
    currentForecastTitleDiv.style.opacity = currentForecastProgress / 100;
    currentForecastDataDiv.style.opacity = currentForecastProgress / 100;
    //currentForecastTitleDiv.style.transform = 'translate(50%, 100%)';
    //currentForecastDataDiv.style.transform = 'translateX(100%)';
    currentForecastTitleDiv.style.top = 0 -((currentForecastProgress / 100) * forecastOffset) + forecastYOff + 'px';
    currentForecastDataDiv.style.top = 0 +((currentForecastProgress / 100) * forecastOffset) + forecastYOff + 'px';
    currentForecastProgress = currentForecastProgress+2;
  }

}

function closeCurrentForecast()
{
  if(currentForecastProgress <= 0)
  {
    clearInterval(currentExitAnim);
    //currentForecastTitleDiv.style.color = 'rgb(0,0,0)';
    //currentForecastDataDiv.style.color = 'rgb(0,0,0)';
    currentForecastTitleDiv.style.opacity = 0;
    currentForecastDataDiv.style.opacity = 0;
    currentForecastTitleDiv.innerHTML = "";
    currentForecastDataDiv.innerHTML = "";
    //exitAnim = window["closeCurrentForecast"];
  }
  else {
    var val = (currentForecastProgress / 100.0) * 255.0;
    //currentForecastTitleDiv.style.color = 'rgb(' + val + ', ' + val + ', ' + val + ')';
    //currentForecastDataDiv.style.color = 'rgb(' + val + ', ' + val + ', ' + val + ')';
    currentForecastTitleDiv.style.opacity = currentForecastProgress / 100;
    currentForecastDataDiv.style.opacity = currentForecastProgress / 100;
    currentForecastTitleDiv.style.top = 0 -((currentForecastProgress / 100) * forecastOffset) + forecastYOff +'px';
    currentForecastDataDiv.style.top = 0 +((currentForecastProgress / 100) * forecastOffset) + forecastYOff +'px';
    currentForecastProgress = currentForecastProgress-2;
  }
}
