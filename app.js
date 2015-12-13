var express = require('express'),
    app = express(),
    config = require("./config"),
    sumo = require('./sumo');

app.use(express.static('public'));

server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Sumo app listening at http://%s:%s', host, port);
});


var onDroneCommand = function(data){

  sumo.executeCommand(data)

};


//SocketIO Code
var io = require('socket.io')(server);


io.on("connection",function(socket){

  console.log("Socket Connected");

  var constants = {"witEnabled":config.witEnabled,"witToken":config.witToken};

  socket.emit("connected",constants);
  socket.on("command",onDroneCommand);

});
