// ==== STYLES ==== //

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({camelize: true}),
    config = require('../gulpconfig').styles,
    autoprefixer = require('autoprefixer'),
    del = require('del'),
    gcmq = require('gulp-group-css-media-queries'),
    processors = [autoprefixer(config.autoprefixer)]; // Add additional PostCSS plugins to this array as needed

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with libsass
gulp.task('styles-sass-dev', function () {
    return gulp.src(config.build.src)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass(config.config).on('error', function(error) {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(plugins.postcss(processors))
        .pipe(gcmq())
        .pipe(plugins.sourcemaps.write('./')) // Writes an external sourcemap
        .pipe(gulp.dest(config.build.dest)); // Drops the unminified CSS file into the `build` folder
});

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with libsass
gulp.task('styles-sass-clean', function () {
    return del(config.clean, {
        force: true
    });
});

gulp.task('styles-sass-prod', ['styles-sass-clean'], function () {
    return gulp.src(config.build.src)
        .pipe(plugins.sass(config.config).on('error', function(error) {
            console.log(error);
            this.emit('end');
        }))
        .pipe(plugins.postcss(processors))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest(config.build.dest)); // Drops the unminified CSS file into the `build` folder
});

// Easily configure the Sass compiler from `/gulpconfig.js`
gulp.task('styles', ['styles-sass-' + config.env]);
