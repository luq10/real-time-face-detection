module.exports = (function(){
  'use strict';

  return function(app){
    app.use(function (err, req, res, next) {
      res.send(404);
    });
  }
}());
