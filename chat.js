var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html')
});

var connections = [];

io.sockets.on('connection', function(socket){
    connections.push(socket);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);    
    })

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {mess: data.mess, name: data.name})
    })
});

