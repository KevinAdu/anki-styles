var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var paths = {
  fonts: ['src/fonts/**/*'],
  templates: ['src/templates/**/*']
};

gulp.task('clean', function() {
  return del('docs');
});

gulp.task('html', function() {
  return gulp.src(paths.templates)
  .pipe(gulp.dest('docs'));
});

gulp.task('html', function() {
  return gulp.src(paths.templates)
  .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
  .pipe(gulp.dest('docs/fonts'));
});

gulp.task('server', function() {
  browserSync.init({
    port: 8888,
    server: {
      baseDir: "./docs"
    }
  });
});

gulp.task('default', function() {
  sequence('clean', 'fonts', 'html', 'server');
});