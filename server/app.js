var express       = require('express');
var envCfg        = require('./src/config/env');
var expressCfg    = require('./src/config/express');
var faceDetection = require('./src/services/FaceDetection');

var app       = express();

expressCfg(app);

var server    = require('http').createServer(app);
var io        = require('socket.io')(server);

io.set('origins', '*:*');

io.on('connection', function(socket){
  console.log('connected', socket.id);

  socket.on('detect', function(base64Image){
    faceDetection.detectFromBase64Image(base64Image)
      .then(function(faces){
        console.log('detected', faces);

        socket.emit('detected', faces);
      })
  });
}.bind(this));

server.listen(envCfg.port);

console.log('server env:', envCfg.name);
console.log('server run on port:', envCfg.port);
