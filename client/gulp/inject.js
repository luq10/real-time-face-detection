'use strict';

var gulp      = require('gulp');
var wiredep   = require('wiredep').stream;
var inject    = require('gulp-inject');
var replace   = require('gulp-replace');

module.exports = function(options){
  /**
   * Inject js files into html
   */
  gulp.task('inject', function(){
    var wiredepOptions = {
      directory: 'bower_components',
      overrides: {
        'socket.io-client': {
          main: ['./socket.io.js']
        }
      }
    };

    return gulp.src(options.tmp + '/*.html')
      // add bower dependencies
      .pipe(wiredep(wiredepOptions))
      .pipe(replace('/.tmp/js/', './js/'))
      .pipe(gulp.dest(options.tmp));
  });
};

