var VideoStream = (function(){
  'use strict';

  /**
   *
   * @param {Object} elements
   * @param {Object} size
   * @param {Function} onProcess
   * @constructor
   */
  var VideoStreamClass = function(elements, size, onProcess){
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
    // @todo change 'webkit' prefix
    navigator.webkitGetUserMedia(
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
  };

  return VideoStreamClass;
}());
