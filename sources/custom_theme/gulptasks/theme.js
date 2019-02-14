// ==== THEME ==== //

var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')({ camelize: true }),
    config      = require('../gulpconfig').theme;

// All the theme tasks in one
/*gulp.task('theme', function() {
  return gulp.src(config.build.src)
      .pipe(plugins.changed(config.build.dest).on('error', function(error) {
        console.log(error);
        this.emit('end');
      }))
      .pipe(gulp.dest(config.build.dest));
});*/
