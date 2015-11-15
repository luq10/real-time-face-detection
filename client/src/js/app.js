(function(){
  'use strict';

  var i, ilen;
  var lastFaces = [];

  var socket  = io.connect('localhost:3010');
  var vs      = new VideoStream(
    {
      video:  document.querySelector('video'),
      canvas: document.querySelector('canvas')
    },
    {
      w: 640,
      h: 480
    },
    function(elements, ctx){
      socket.emit('detect', elements.canvas.toDataURL());
    },
    function(ctx){
      // Remove flashing effect of rectangles
      for(i = 0, ilen = lastFaces.length; i < ilen; i++){
        drawFace(ctx, lastFaces[i]);
      }
    }
  );

  socket.on('detected', function(faces){
    lastFaces = faces;

    vs.ctx.drawImage(vs.elems.video, 0, 0);

    for(i = 0, ilen = faces.length; i < ilen; i++){
      console.log(faces[i]);

      drawFace(vs.ctx, faces[i]);
    }
  });

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object[]} face
   */
  function drawFace(ctx, face){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(face.x, face.y, face.width, face.height);
    ctx.restore();
  }
}());
