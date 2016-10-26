var gulp = require('gulp');

var paths = {
  fonts: ['src/fonts/**/*']
};

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('default', ['fonts']);