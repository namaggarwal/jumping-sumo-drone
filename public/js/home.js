var home = (function(){

  var textElement = document.getElementById("result"),
      socket,
      recog,
      witEnabled,
      witToken;

  var onSpeechRecognitionResult = function(text){


    if(witEnabled){

      Wit(witToken,text,onTextRecognitionResult);

    }else{

      takeActionOnSpeech(text);
    }

  },
  takeActionOnSpeech = function(text){

    var data = {};
    switch(text.toUpperCase){

      case "MOVE FORWARD":
      case "MOVE":
        data["action"] = "MOVE";
        data["direction"] = "FORWARD";
        break;
      case "MOVE BACKWARD":
          data["action"] = "MOVE";
          data["direction"] = "BACKWARD";
          break;
      case "STOP":
          data["action"] = "STOP";
          break;
      case "TURN":
          data["action"] = "TURN";
          data["angle"] = "180";
          break;
      case "TURN RIGHT":
          data["action"] = "TURN";
          data["angle"] = "90";
          break;
      case "TURN LEFT":
          data["action"] = "TURN";
          data["angle"] = "-90";
          break;
      default:
      return;

    }

    sendRequestToDrone(data);

  },
  onTextRecognitionResult = function(data){

      var reqData = {};

      if(data.outcomes.constructor == Array && data.outcomes.length > 0){
          //Take the first intent
          reqData["action"] = data.outcomes[0].intent;
          if(data.outcomes[0].entities){

            for(var key in data.outcomes[0].entities){

              reqData[key] = data.outcomes[0].entities[key][0].value;


            }

          }


      }

      sendRequestToDrone(reqData);

  },

  sendRequestToDrone = function(data){
    Sumo(socket,data);
  },
  makeSocketConnection = function(){

    socket = io.connect();
    socket.on("connected",function(data){

      witToken = data.witToken;
      witEnabled = data.witEnabled;

    });

  };

  var init = function(){

    makeSocketConnection();
    recog = new Recognition(textElement,onSpeechRecognitionResult,"en-IN");

  };

  return {

    init : init
  }
})();

home.init();
