'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  /**
   * Watch changes in files
   */
  gulp.task('watch', ['build:tmp'], function (){
    gulp.watch(options.src + '/**/*.jade', function(event){
      runSequence(
        ['inject'],
        function(){
          browserSync.reload(event.path);
        }
      );
    });

    gulp.watch([
      options.src + '/styles/**/*.css'
    ], function(event){
      runSequence(
        ['styles'],
        function(){
          browserSync.reload(event.path);
        }
      );
    });

    gulp.watch(options.src + '/js/**/*.js', function(event){
      runSequence(
        ['scripts'],
        function(){
          browserSync.reload(event.path);
        }
      );
    });
  });
};
