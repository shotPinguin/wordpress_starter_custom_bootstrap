// ==== SVG ==== //

var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')({ camelize: true }),
    config      = require('../gulpconfig').svg,
    svgSprite   = require('gulp-svg-sprite');

gulp.task('svg-sprite', function() {
    return gulp.src(config.build.srcSprites)
        .pipe(svgSprite(config.config.svgsprites))
        .on('error', function(error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(config.build.destSprites));
});

// All the theme tasks in one
gulp.task('svg-prod', function() {
    return gulp.src(config.build.src)
        .pipe(plugins.svgmin())
        .pipe(gulp.dest(config.build.dest));
});

// All the theme tasks in one
gulp.task('svg-dev', function() {
    return gulp.src(config.build.src)
        .pipe(plugins.svgmin(config.config.svgmin))
        .pipe(gulp.dest(config.build.dest));
});

// Easily configure the Sass compiler from `/gulpconfig.js`
gulp.task('svg', ['svg-sprite', 'svg-' + config.env]);