var VideoStream = (function(){
  'use strict';

  // @todo Miganie
  // @todo _private scope

  /**
   *
   * @param {Object} elements
   * @param {Object} size
   * @param {Function} onProcess
   * @param {Function} onDrawFrame
   * @constructor
   */
  var VideoStreamClass = function(elements, size, onProcess, onDrawFrame){
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

    this.init(elements);
  };

  /**
   * @param {Object} elements
   */
  VideoStreamClass.prototype.init = function(elements){
    this.storeElements(elements);

    this.createVideoStream();
    this.createCanvas();

    setInterval(this.drawFrameOnCanvas.bind(this), 1000 / 24);
    setInterval(this.onProcess.bind(this, this.elems, this.ctx), 200);
  };

  /**
   * @param {MediaStreamConstaints} constraints
   * @param {Function} successCallback
   * @param {Function} errorCallback
   * @returns {Function}
   */
  VideoStreamClass.prototype.getUserMedia = function(constraints, successCallback, errorCallback){
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
  };

  /**
   *
   * @returns {Boolean}
   */
  VideoStreamClass.prototype.hasUserMedia = function(){
    var n = navigator;

    return  !!(n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
  };

  /**
   * @param {Object} elements
   */
  VideoStreamClass.prototype.storeElements = function(elements){
    this.elems = {
      video:  elements.video,
      canvas: elements.canvas
    };

    this.ctx = this.elems.canvas.getContext('2d');
  };

  /**
   *
   */
  VideoStreamClass.prototype.createVideoStream = function(){
    if(false === this.hasUserMedia()){
      console.log('Your browser has`t got navigator.getUserMedia. Try in Chrome');
      return;
    }

    this.getUserMedia(
      {
        video: {
          mandatory: {
            maxWidth:   this.size.w,
            maxHeight:  this.size.h
          }
        }
      },
      this.onVideoStream.bind(this),
      this.onVideoStreamError.bind(this)
    );
  };

  /**
   * @param {MediaStream} stream
   */
  VideoStreamClass.prototype.onVideoStream = function(stream){
    this.elems.video.src = window.URL.createObjectURL(stream);
  };

  /**
   *
   */
  VideoStreamClass.prototype.onVideoStreamError = function(){
    console.warn('Video stream error');
  };

  /**
   *
   */
  VideoStreamClass.prototype.createCanvas = function(){
    this.elems.canvas.setAttribute('width', this.size.w);
    this.elems.canvas.setAttribute('height', this.size.h);
  };

  /**
   *
   */
  VideoStreamClass.prototype.drawFrameOnCanvas = function(){
    this.ctx.drawImage(this.elems.video, 0, 0);

    this.onDrawFrame.call(this, this.ctx);
  };

  return VideoStreamClass;
}());
