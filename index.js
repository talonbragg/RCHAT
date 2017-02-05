var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('connection', function(msg){
    io.emit('A user connected', msg)
  });
  socket.on('disconnect', function(msg){
    io.emit('user disconnected', msg);
  });
});

http.listen(process.env.PORT || 3000);
