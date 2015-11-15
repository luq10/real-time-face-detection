'use strict';

var gulp          = require('gulp');
var runSequence   = require('run-sequence');

module.exports = function(options){
  /**
   *
   */
  gulp.task('styles', function(cb){
    runSequence(
      ['styles:copy'],
      cb
    );
  });

  /**
   * Compile main scss file (styles.scss) to css file
   *
   * src:   /src
   * dest:  /.tmp
   */
  gulp.task('styles:copy', function(){
    return gulp.src(options.src + '/styles/styles.css')
      .pipe(gulp.dest(options.tmp + '/styles'));
  });
};

