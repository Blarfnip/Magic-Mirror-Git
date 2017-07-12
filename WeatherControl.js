//Ithaca: 14850
//Framingham: 01701

//WEATHER
  refreshWeather();
  var refresh = setInterval(refreshWeather, 360 * 1000);

var loc;
//jQuery(document).ready(function($)
function refreshWeather() {
  $.ajax({
  url : "https://api.wunderground.com/api/59033d88f0d2644c/geolookup/conditions/q/IA/14850.json",
  dataType : "jsonp",
  success : function(parsed_json) {
    console.log(parsed_json);
  var location = parsed_json['current_observation']['display_location']['full'];
  loc = location;
  var temp_f = parsed_json['current_observation']['temp_f'];
  var weather = parsed_json['current_observation']['weather'];
  var icon = parsed_json['current_observation']['icon'];

  var htmlText = weather + "<br>" + temp_f + "&#176 F";



  document.getElementById("weather_location").innerHTML = location;
  document.getElementById("weather_conditions").innerHTML = htmlText;
  document.getElementById("weather_icon").innerHTML = "<i class='wi wi-wu-" + icon + "'></i> ";
  //location + ": " + "<i class='wi wi-wu-" + icon + "'></i> " + weather + " " + temp_f + "&#176 F";
  //alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
}

function refreshCurrentForecast() {
  forecastOffset = 100;
  forecastYOff = 0;
  $.ajax({
  url : "https://api.wunderground.com/api/59033d88f0d2644c/geolookup/conditions/q/IA/14850.json",
  dataType : "jsonp",
  success : function(parsed_json) {
    console.log(parsed_json);
  var location = parsed_json['current_observation']['display_location']['full'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  var weather = parsed_json['current_observation']['weather'];
  var humidity = parsed_json['current_observation']['relative_humidity'];
  var icon = parsed_json['current_observation']['icon'];

  var htmlText = "<span style='font-size:60px;'>" + weather + " " + "<i class='wi wi-wu-" + icon + "'></i> </span>";
  htmlText += "<br>";
  htmlText += "<span style='font-size:32px;'>" + humidity + " Humidity <br></span>";
  htmlText += "<span style='font-size:55px;'>" + temp_f + "&#176 F</span>";



  document.getElementById("center-currentWeather-title").innerHTML = '<br><br><br><br><br><br>Weather in ' + location + "<hr>";
  document.getElementById("center-currentWeather-data").innerHTML = htmlText;
  //document.getElementById("weather_icon").innerHTML = "<i class='wi wi-wu-" + icon + "'></i> ";
  //location + ": " + "<i class='wi wi-wu-" + icon + "'></i> " + weather + " " + temp_f + "&#176 F";
  //alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
}

function refreshOneDayForecast(date) {
  //console.log(date);
  forecastOffset = 180;
  forecastYOff = -100;
  $.ajax({
  url : "https://api.wunderground.com/api/59033d88f0d2644c/geolookup/forecast10day/q/IA/14850.json",
  dataType : "jsonp",
  success : function(parsed_json) {
    console.log(parsed_json);

  var htmlText = "<br>";
  for(var i = 0; i < 10; i++)
  {
    var temp = parsed_json['forecast']['simpleforecast']['forecastday'][i];
    //console.log(date.getMonth() + " " + temp['month'] - 1 + " " +  date.getDate() + " " +  temp['day'])
    if(date.getMonth() == temp['date']['month'] - 1 && date.getDate() == temp['date']['day'])
    {
      console.log("FOUND IT " + temp['pretty']);

      var weather = temp['conditions'];
      var icon = temp['icon'];
      var humidity = temp['avehumidity'];
      var temp_fH = temp['high']['fahrenheit'];
      var temp_fL = temp['low']['fahrenheit'];
      var rain = temp['qpf_allday']['in'];
      var snow = temp['snow_allday']['in'];
      var textSummary = parsed_json['forecast']['txt_forecast']['forecastday'][i * 2]['fcttext'];

      htmlText += "<span style='font-size:45px;'>" + weather + " " + "<i class='wi wi-wu-" + icon + "'></i> </span><br>";
      htmlText += "<span style='font-size:38px;'>" + humidity + "% Humidity </span><br>";
      htmlText += "<span style='font-size:60px;'><i class='wi wi-direction-up'></i> " + temp_fH + "&#176 F &emsp;";
      htmlText += "<i class='wi wi-direction-down'></i> " + temp_fL + "&#176 F</span><br>";
      htmlText += "<span style='font-size:42px;'><i class='wi wi-raindrops'></i> " + rain + " &emsp;";
      htmlText += "<i class='wi wi-snowflake-cold'></i> " + snow + "</span><br>";
      htmlText += "<span style='font-size:30px;line-height:60%;'><hr>" + textSummary + "</span>";
      responsiveVoice.speak(textSummary);

      break;
    }
  }
  // var htmlText = "<span style='font-size:60px;'>" + weather + " " + "<i class='wi wi-wu-" + icon + "'></i> </span>";
  // htmlText += "<br>";
  // htmlText += "<span style='font-size:32px;'>" + humidity + " Humidity <br></span>";
  // htmlText += "<span style='font-size:55px;'>" + temp_f + "&#176 F</span>";

  document.getElementById("center-currentWeather-title").innerHTML = '<br><br><br><br><br><br>Weather in <span style="line-height:100%;">' + loc + "<br>" + date.toLocaleDateString([], {weekday:'long', month:'long', day:'numeric'}) + "</span><hr>";
  document.getElementById("center-currentWeather-data").innerHTML = htmlText;
  }
  });
}

function refreshForecastGeneral() {
  //console.log(date);
  forecastOffset = 330;
  forecastYOff = -300;
  $.ajax({
  url : "https://api.wunderground.com/api/59033d88f0d2644c/geolookup/forecast10day/q/IA/14850.json",
  dataType : "jsonp",
  success : function(parsed_json) {
    console.log(parsed_json);

  var htmlText = "";
  for(var i = 0; i < 7; i++)
  {
    var temp = parsed_json['forecast']['simpleforecast']['forecastday'][i];
    //console.log(date.getMonth() + " " + temp['month'] - 1 + " " +  date.getDate() + " " +  temp['day'])

      var weekday = temp['date']['weekday_short'];
      var weather = temp['conditions'];
      var icon = temp['icon'];
      var temp_fH = temp['high']['fahrenheit'];
      var temp_fL = temp['low']['fahrenheit'];

      htmlText += "<span style='font-size:45px;'>" + weekday + "&emsp;";
      htmlText +=  "<i class='wi wi-wu-" + icon + "'></i> " + weather + "<br>";
      htmlText += "<i class='wi wi-direction-up'></i> " + temp_fH + "&#176 F &emsp;";
      htmlText += "<i class='wi wi-direction-down'></i> " + temp_fL + "&#176 F</span><hr>";

  }
  // var htmlText = "<span style='font-size:60px;'>" + weather + " " + "<i class='wi wi-wu-" + icon + "'></i> </span>";
  // htmlText += "<br>";
  // htmlText += "<span style='font-size:32px;'>" + humidity + " Humidity <br></span>";
  // htmlText += "<span style='font-size:55px;'>" + temp_f + "&#176 F</span>";

  document.getElementById("center-currentWeather-title").innerHTML = '<br><br><br><br><br><br>Weather in <span style="line-height:100%;font-size:55px;">' + loc + "</span><hr>";
  document.getElementById("center-currentWeather-data").innerHTML = htmlText;
  }
  });
}

//FORECAST
jQuery(document).ready(function($) {
  $.ajax({
  url : "https://api.wunderground.com/api/59033d88f0d2644c/geolookup/forecast/q/IA/14850.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var text = "";
  //var days = parsed_json['forecastday'].length;
  //console.log(parsed_json);
  for(var i = 0; i < 7; i += 2)
  {
    var dayName = parsed_json['forecast']['txt_forecast']['forecastday'][i]['title'];
    var icon = parsed_json['forecast']['txt_forecast']['forecastday'][i]['icon'];
    var weather = parsed_json['forecast']['simpleforecast']['forecastday'][i/2]['conditions'];
    var low_temp_f = parsed_json['forecast']['simpleforecast']['forecastday'][i/2]['low']['fahrenheit'];
    var high_temp_f = parsed_json['forecast']['simpleforecast']['forecastday'][i/2]['high']['fahrenheit'];
    text += dayName + ": " + "<i class='wi wi-wu-" + icon + "'></i> " + weather + " " + low_temp_f + "&#176F " + "- " + high_temp_f + "&#176F " + "<br>";
  }

  //document.getElementById("forecast").innerHTML = text;
  //alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
});
