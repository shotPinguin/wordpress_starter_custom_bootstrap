// ==== SCRIPTS ==== //

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({camelize: true}),
    merge = require('merge-stream'),
    del = require('del'),
gutil = require('gulp-util'),
    uglify = require('gulp-uglify-es').default;
    config = require('../gulpconfig').scripts;

// Check core scripts for errors
gulp.task('scripts-lint', function () {
    return gulp.src(config.lint.src)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default')); // No need to pipe this anywhere
});

// Generate script bundles as defined in the configuration file
// Adapted from https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
gulp.task('scripts-bundle-dev', ['scripts-lint'], function () {
    return gulp.src(config.build.src)
        .pipe(plugins.sourcemaps.init())
        .pipe(uglify()).on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), 'GULP TASK : scripts-bundle-devs');
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(plugins.sourcemaps.write('./')) // Writes an external sourcemap
        .pipe(gulp.dest(config.build.dest));
});

gulp.task('scripts-bundle-prod', ['scripts-lint'], function () {
    return gulp.src(config.build.src)
        .pipe(uglify())
        .pipe(uglify()).on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), 'GULP TASK : scripts-bundle-prod');
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest(config.build.dest));
});

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with libsass
gulp.task('scripts-clean', function () {
    return del(config.clean, {
        force: true
    });
});

// Minify scripts in place
gulp.task('scripts-prod', ['scripts-clean', 'scripts-bundle-prod'], function () {
    return gulp.src(config.build.src)
     .pipe(uglify()).on('error', function (err) {
         gutil.log(gutil.colors.red('[Error]'), 'GULP TASK : scripts-prod');
         gutil.log(gutil.colors.red('[Error]'), err.toString());
     })
     .pipe(gulp.dest(config.build.dest));
});

// Minify scripts in place
gulp.task('scripts-dev', ['scripts-clean', 'scripts-bundle-dev'], function () {
    return gulp.src(config.build.src)
     .pipe(plugins.sourcemaps.init())
     .pipe(plugins.sourcemaps.write('./'))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
     .pipe(gulp.dest(config.build.dest));
});

// Master script task; lint -> bundle -> minify
gulp.task('scripts', ['scripts-'+ config.env]);