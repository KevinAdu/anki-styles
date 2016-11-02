var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var paths = {
  fonts: ['src/fonts/**/*']
};

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('server', function() {
  browserSync.init({
    port: 8888,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('default', function() {
  sequence('clean', 'fonts', 'server');
});