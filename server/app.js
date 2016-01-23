var express       = require('express');
var envCfg        = require('./src/config/env');
var expressCfg    = require('./src/config/express');
var faceDetection = require('./src/services/FaceDetection');

var app       = express();

expressCfg(app);

var server    = require('http').createServer(app);
var io        = require('socket.io')(server);

io.set('origins', '*:*');

faceDetection(io);

server.listen(envCfg.port);

console.log('server env:', envCfg.name);
console.log('server run on port:', envCfg.port);
