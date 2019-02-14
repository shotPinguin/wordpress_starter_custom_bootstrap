// ==== MAIN ==== //

var gulp = require('gulp');

gulp.task('default', ['watch']);

gulp.task('build', ['plugins', 'images', 'svg', 'scripts', 'styles'/*, 'theme'*/]);