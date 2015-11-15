var path      = require('path');
var rootPath  = path.normalize(__dirname + '/..');
var env       = process.env.NODE_ENV || 'dev';

var config = {
  dev: {
    port: 3010
  },

  test: {
    port: 3201
  },

  prod: {
    port: 3200
  }
};

config[env].name = env;

module.exports = config[env];
