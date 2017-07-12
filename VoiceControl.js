
var accessToken = "fdc5c3eeb1584c17983ebe26a1c98d97 ";
//var subscriptionKey = "<your agent subscription key>";
var baseUrl = "https://api.api.ai/v1/";

var recognition;

function startRecognition() {
	recognition = new webkitSpeechRecognition();
	recognition.onstart = function(event) {
		//updateRec();
	};
	recognition.onresult = function(event) {
		var text = "";
	    for (var i = event.resultIndex; i < event.results.length; ++i) {
	    	text += event.results[i][0].transcript;
	    }
	    send2(text);
		stopRecognition();
	};
	recognition.onend = function() {
		stopRecognition();
	};
	recognition.lang = "en-US";
	recognition.start();
}

function stopRecognition() {
	if (recognition) {
		recognition.stop();
		recognition = null;
	}
	//updateRec();
}
function switchRecognition() {
	if (recognition) {
		stopRecognition();
	} else {
		startRecognition();
	}
}

function send2(text)
{
  const client = new ApiAi.ApiAiClient({accessToken: accessToken});
  const promise = client.textRequest(text);

  promise
      .then(handleResponse)
      .catch(handleError);

  function handleResponse(serverResponse) {
          console.log(serverResponse);
          responsiveVoice.speak(serverResponse.result.fulfillment.speech);
          //console.log("INTENT: " + serverResponse.result.intentName);
          if(serverResponse.result.metadata.intentName == "getWeather")
          {
            //console.log("GETWEATHER" + serverResponse.result.parameters.weatherType);
            if(serverResponse.result.parameters.weatherType == 'current')
            {
              //console.log("CURRENT WEATHER");
              currentForecastInit();
							refreshCurrentForecast();
            }
						else if(serverResponse.result.parameters.weatherType == 'generalF')
						{
							currentForecastInit();
							refreshForecastGeneral();
						}
						else if(serverResponse.result.parameters.date){
							currentForecastInit();
							var d = new Date(serverResponse.result.parameters.date);
							d.setDate(d.getDate() + 1);
							refreshOneDayForecast(d);
						}
          }
					else {
						console.log("GENERAL RESPONSE");
						greetingInit();
						setTextOutput(serverResponse.result.fulfillment.speech);
					}
          //annyang.resume();
          annyang.start({ autoRestart: true });
  }
  function handleError(serverError) {
          console.log(serverError);
  }
}

function setResponse(val) {
	responsiveVoice.speak(val);
}

var isAwake = false;

if(annyang)
{
  var commands = {
    '(hey) Alexa *query': function(query) {
      isAwake = true;
      annyang.abort();
      send2(query);
    },

    '(hey) Alexa': function() {
      isAwake = true;
      annyang.abort();
      switchRecognition();
      //$speechInput = $('#speech');
    },

    'thanks Alexa': function() {
      isAwake = false;
      greetingInit();
			setTextOutput("Hey, Pal!");
			annyang.abort();
      annyang.start({ autoRestart: true });
    }
  };


  annyang.addCommands(commands);
  annyang.start({ autoRestart: true });
  annyang.debug(true);
}
