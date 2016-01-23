var opencv  = require('opencv');

module.exports = (function(){
  'use strict';

  // Add Promise Object to older Node.js
  require('es6-promise').polyfill();

  /**
   * Private scope
   *
   * @private
   */
  var _private = {
    /**
     *
     * @param {String} data
     * @param {Matrix} imageMatrix
     * @param {Object} options
     * @returns {Promise}
     */
    detectObjects: function(data, imageMatrix, options){
      return new Promise(function(resolve, reject){
        imageMatrix.detectObject(data, options, function(err, objects){
          if(err){
            return reject(err);
          }

          return resolve(objects);
        });
      });
    },

    /**
     *
     * @param {Matrix} imageMatrix
     * @param {Object} [options]
     * @returns {Promise}
     */
    detectFaces: function(imageMatrix, options){
      return _private.detectObjects(opencv.FACE_CASCADE, imageMatrix, options);
    },

    /**
     *
     * @param {Object} socket
     * @param {String} base64Image
     */
    onDetect: function(socket, base64Image){
      var decodedImage = new Buffer(base64Image.replace(/^data:image\/png;base64,/, ""), 'base64');

      opencv.readImage(decodedImage, function(err, imageMatrix){
        if(err){
          console.log('Can`t read image');
          return;
        }

        _private.detectFaces(imageMatrix, {})
          .then(function(faces){
            console.log('detected', faces);

            socket.emit('detected', faces);
          })
      });
    }
  };

  /**
   *
   * @param {Object} io
   */
  return function(io){
    io.on('connection', function(socket){
      console.log('connected', socket.id);

      socket.on('detect', _private.onDetect.bind(this, socket));
    }.bind(this));
  }
}());