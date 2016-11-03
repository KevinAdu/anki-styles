var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');
var gulp = require('gulp');
var browser = require('browser-sync').create();

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

// gulp.task('fonts', function() {
//   return gulp.src(paths.fonts)
//   .pipe(gulp.dest('docs/fonts'));
// });

gulp.task('server', function() {
  browser.init({
    port: 8888,
    server: {
      baseDir: "./docs"
    }
  });
});

gulp.task('build', function() {
  sequence('clean', 'html', 'server');
});

gulp.task('default', ['build'], function() {
  gulp.watch(['src/templates/**/*.html'], ['html', browser.reload]);
});