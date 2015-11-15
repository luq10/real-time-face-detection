var VideoStream = (function(){
  'use strict';

  var _private = {
    /**
     * @param {Object} elements
     */
    init: function(elements){
      _private.storeElements.call(this, elements);

      _private.createVideoStream.call(this);
      _private.createCanvas.call(this);

      setInterval(_private.drawFrameOnCanvas.bind(this), 1000 / 24);
      setInterval(this.onProcess.bind(this, this.elems, this.ctx), 200);
    },

    /**
     * @param {MediaStreamConstaints} constraints
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @returns {Function}
     */
    getUserMedia: function(constraints, successCallback, errorCallback){
      var n = navigator;

      if(n.getUserMedia){
        return n.getUserMedia.apply(n, arguments);
      }
      if(n.webkitGetUserMedia){
        return n.webkitGetUserMedia.apply(n, arguments);
      }
      if(n.mozGetUserMedia){
        return n.mozGetUserMedia.apply(n, arguments);
      }
      if(n.msGetUserMedia){
        return n.msGetUserMedia.apply(n, arguments);
      }

      return null;
    },

    /**
     *
     * @returns {Boolean}
     */
    hasUserMedia: function(){
      var n = navigator;

      return !!(n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    },

    /**
     * @param {Object} elements
     */
    storeElements: function(elements){
      this.elems = {
        video:  elements.video,
        canvas: elements.canvas
      };

      this.ctx = this.elems.canvas.getContext('2d');
    },

    /**
     *
     */
    createVideoStream: function(){
      if(false === _private.hasUserMedia.call(this)){
        console.log('Your browser has`t got navigator.getUserMedia. Try in Chrome');
        return;
      }

      _private.getUserMedia.call(
        this,
        {
          video: {
            mandatory: {
              maxWidth:   this.size.w,
              maxHeight:  this.size.h
            }
          }
        },
        _private.onVideoStream.bind(this),
        _private.onVideoStreamError.bind(this)
      );
    },

    /**
     * @param {MediaStream} stream
     */
    onVideoStream: function(stream){
      this.elems.video.src = window.URL.createObjectURL(stream);
    },

    /**
     *
     */
    onVideoStreamError: function(){
      console.warn('Video stream error');
    },

    /**
     *
     */
    createCanvas: function(){
      this.elems.canvas.setAttribute('width', this.size.w);
      this.elems.canvas.setAttribute('height', this.size.h);
    },

    /**
     *
     */
    drawFrameOnCanvas: function(){
      this.ctx.drawImage(this.elems.video, 0, 0);

      this.onDrawFrame.call(this, this.ctx);
    }
  };

  /**
   *
   * @param {Object} elements
   * @param {Object} size
   * @param {Function} onProcess
   * @param {Function} onDrawFrame
   * @constructor
   */
  return function(elements, size, onProcess, onDrawFrame){
      /**
       *
       * @type {Object}
       */
      this.elems  = {};

      /**
       *
       * @type {null}
       */
      this.ctx    = null;

      /**
       *
       * @type {Object}
       */
      this.size   = {
        w: size.w || 480,
        h: size.h || 320
      };

      /**
       *
       * @type {Function}
       */
      this.onDrawFrame = onDrawFrame || function(){};

      /**
       *
       * @type {Function}
       */
      this.onProcess = onProcess || function(){};

      _private.init.call(this, elements);
    };
}());
