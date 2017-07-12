# Another Smart Mirror Project
By: Saul

This project is a work in progress smart mirror webapp.

## Features
### Weather Underground:  
Custom displays for current weather, week-long forecast, and specific forecast. 

### Goals:  
-Google calendar integration  

## Commands
The smart mirror used Annyang, Chrome speech synthesis, and api.ai to provide a smart assistant within the mirror.
Start all commands with:   
``` Alexa, ... ```  
or  
``` Hey Alexa, ... ```  
Examples:
``` 
Hey Alexa, what's the weather like next teusday?  
Alexa, when's your birthday?  
Alexa, show me the forecast. 
```  

To return to the "home screen" just say, ``` Thanks Alexa ```

## Compatibility
Any device running chrome with access to the microphone. (Not iOS)
Currently testing on a Galaxy Tab 10.1, and desktop computer.

## Current issues  
On Android chrome requires the microphone to make a noise when beginning and ending a recording. This means that if the webapp is running on Android it is recommended to keep the volume all the way down.  
  
Weather Underground API rarely will not connect. 

## Install
Requires Python.  
Download the project, use ``cd`` in the command line to navigate to the project folder and run:  
``` python -m http.server 8000 ```  
Then go to ``localhost:8000/magicMirror.html`` in chrome
