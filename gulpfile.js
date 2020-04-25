var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
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

gulp.task('scss', function () {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sass({
    style: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer())
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

gulp.task('build', gulp.series('clean', 'html', 'fonts', 'scss', 'server', function(done) {
  done();
}));

gulp.task('default', gulp.series('build', function(done) {
  gulp.watch(['src/templates/**/*.html'], ['html', browser.reload]);
  gulp.watch(['src/scss/**/*.scss'], ['scss', browser.reload]);
  done();
}));
