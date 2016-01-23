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
    }
  };

  return {
    /**
     *
     * @param {String} base64Image
     */
    detectFromBase64Image: function(base64Image){
      var decodedImage = new Buffer(base64Image.replace(/^data:image\/png;base64,/, ""), 'base64');

      return this.detectFromImage(decodedImage);
    },

    /**
     *
     * @param image
     */
    detectFromImage: function(image){
      return new Promise(function(resolve, reject){
        opencv.readImage(image, function(err, imageMatrix){
          if(err){
            return reject(new Error('Can`t read image'));
          }

          return _private.detectFaces(imageMatrix, {})
            .then(function(faces){
              return resolve(faces);
            })
        });
      });
    }
  }
}());