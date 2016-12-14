var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browser = require('browser-sync').create();

var paths = {
  fonts: ['src/fonts/**/*'],
  templates: ['src/templates/**/*']
};

var browserVersions = ['last 2 versions', 'ie >= 9'];

gulp.task('clean', function() {
  return del('docs');
});

gulp.task('html', function() {
  return gulp.src(paths.templates)
  .pipe(gulp.dest('docs'));
});

gulp.task('scss', function () {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sass({
    style: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: browserVersions
  }))
  // .pipe(cleanCSS({compatibility: 'ie9'}))
  .pipe(gulp.dest('./docs/css'));
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
  .pipe(gulp.dest('docs/fonts'));
});

gulp.task('server', function() {
  browser.init({
    port: 8888,
    server: {
      baseDir: "./docs"
    }
  });
});

gulp.task('build', function() {
  sequence('clean', 'html', 'fonts', 'scss', 'server');
});

gulp.task('default', ['build'], function() {
  gulp.watch(['src/templates/**/*.html'], ['html', browser.reload]);
  gulp.watch(['src/scss/**/*.scss'], ['scss', browser.reload]);
});
