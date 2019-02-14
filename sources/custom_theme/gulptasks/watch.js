// ==== WATCH ==== //

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({camelize: true}),
    config = require('../gulpconfig').watch;

// Independant watcher

gulp.task('watch:styles', function () {
    gulp.watch(config.src.styles, ['styles']);
});

gulp.task('watch:scripts', function () {
    gulp.watch(config.src.scripts, ['scripts']);
});

// gulp.task('watch:copyJS', function () {
//     console.log("watch:copyJS");
//     console.log(config.src.copyJS);
//     gulp.watch(config.src.copyJS, ['copyJS']);
// });

gulp.task('watch:images', function () {
    gulp.watch(config.src.images, ['images']);
});

/*gulp.task('watch:theme', function () {
    gulp.watch(config.src.images, ['theme']);
});*/

gulp.task('watch:svg', function () {
    gulp.watch(config.src.svg, ['svg']);
});

// Master control switch for the watch task

gulp.task('watch', ['browsersync'], function () {
    gulp.watch(config.src.styles, ['styles']);
    gulp.watch(config.src.scripts, ['scripts']);
    //gulp.watch(config.src.copyJS, ['copyJS']);
    //gulp.watch(config.src.theme, ['theme']);
    gulp.watch(config.src.images, ['images']);
    gulp.watch(config.src.svg, ['svg']);
});