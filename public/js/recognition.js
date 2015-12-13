var Recognition = function(textElement,onResult,lang){

  var recObj = new webkitSpeechRecognition();


  recObj.continuous = true;
  recObj.interimResults = true;

  recObj.onstart = function(){
    textElement.innerHTML = "Start Speaking.";
  };


  recObj.onresult = function(event){

      for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            textElement.innerHTML =  event.results[i][0].transcript;
            onResult(event.results[i][0].transcript);
          } else {
            textElement.innerHTML = event.results[i][0].transcript;
          }
    }

  };

  recObj.onerror = function(event){
      if (event.error == 'no-speech') {
          textElement.innerHTML = "Start Speaking.";
      }
      if (event.error == 'audio-capture') {
          textElement.innerHTML = "There seems to be a problem with your mic.";
      }
      if (event.error == 'not-allowed') {
        textElement.innerHTML = "It seems the access to mic is denied.";
      }
    };

    recObj.lang = lang?"en-IN":lang;

    recObj.start();

    return recObj;

};
