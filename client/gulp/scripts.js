'use strict';

var gulp          = require('gulp');
var runSequence   = require('run-sequence');

module.exports = function(options) {
  /**
   *
   */
  gulp.task('scripts', function(cb){
    runSequence(
      ['scripts:copy'],
      cb
    );
  });

  /**
   *
   */
  gulp.task('scripts:copy', function(){
    return gulp.src(options.src + '/js/**/*.js')
      .pipe(gulp.dest(options.tmp + '/js'));
  });
};
