// var gulp = require('gulp'),
//     plugins = require('gulp-load-plugins')({camelize: true}),
//     config = require('../gulpconfig'),
//     gulpif = require('gulp-if'),
//     uglify = require('gulp-uglify');
//
// gulp.task('copyJS', function () {
//     return gulp.src([
//         config.copyJSsrc
//     ])
//         .pipe(gulpif(config.ftp.env === "prod", uglify()))
//         .pipe(uglify())
//         .pipe(gulp.dest(config.scripts.build.dest))
// });