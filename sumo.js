
var sumo = (function(){

  var drone = require('node-sumo').createClient();;

  var executeCommand = function(data){

    if(!data.action){return;}

    switch(data.action.toUpperCase()){

      case "MOVE":
        if(!data.direction){return;}

        console.log("Moving "+data.direction);
        break;
      case "TURN":
        if(!data.angle){return;}
        console.log("Turning "+data.angle);
        break;
      case "STOP":
        console.log("Stopping ");
        break;
      default:
        return;

   }

 },
 connect = function(){

     drone.connect(function() {
       console.log("Drone Connected");
     });

  };


  return {
    executeCommand:executeCommand
  }


})();


module.exports = sumo
