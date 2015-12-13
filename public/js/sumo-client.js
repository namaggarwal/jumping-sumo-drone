var Sumo = function(socket,data){

  if(!data.action){return;}

    switch(data.action.toUpperCase()){

      case "MOVE":
        if(!data.direction){return;}
        break;
      case "TURN":
        if(!data.angle){return;}
        break;
      case "STOP":
        break;
      default:
        return;

  }
  socket.emit("command",data);
};
