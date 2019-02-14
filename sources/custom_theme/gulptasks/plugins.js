// ==== PLUGINS ==== //

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({camelize: true}),
    merge = require('merge-stream'),
    pngoptim  	= require('imagemin-optipng'),
    jpegrec   	= require('imagemin-jpeg-recompress'),
    config = require('../gulpconfig').plugins,
    gutil = require('gulp-util'),
    configImages = require('../gulpconfig').images,
    uglify = require('gulp-uglify-es').default;

// CSS
gulp.task('plugins-dev-css', function () {
    var stream = null;

    if(config.css != undefined) {
        if(config.css.src.length) {
            stream = gulp.src(config.css.src)
                .pipe(plugins.concat(config.css.name))
                .pipe(gulp.dest(config.css.dest))
        }
    }

    return stream;
});

gulp.task('plugins-prod-css', function () {
    var stream = null;

    if(config.css != undefined) {
        if(config.css.src.length) {
            stream = gulp.src(config.css.src)
                .pipe(plugins.concat(config.css.name))
                .pipe(plugins.cssnano())
                .pipe(gulp.dest(config.css.dest))
        }
    }

    return stream;
});

// JS
gulp.task('plugins-dev-js', function () {
    var stream = null;

    if(config.js != undefined) {
        if(config.js.src.length) {
            stream = gulp.src(config.js.src)
                .pipe(plugins.concat(config.js.name))
                .pipe(gulp.dest(config.js.dest))
        }
    }

    return stream;
});

gulp.task('plugins-prod-js', function () {
    var stream = null;

    if(config.js != undefined) {
        if(config.js.src.length) {
            stream = gulp.src(config.js.src)
                .pipe(plugins.concat(config.js.name))
                .pipe(uglify()).on('error', function (err) {

                    gutil.log(gutil.colors.red('[Error]'), 'GULP TASK : plugins-prod-js');
                    gutil.log(gutil.colors.red('[Error]'), err.toString());
                })
                .pipe(gulp.dest(config.js.dest))
        }
    }

    return stream;
});

// IMAGES
gulp.task('plugins-images', function () {
    var stream = null;

    if(config.images != undefined) {
        var streamProcess;

        configImages.config.imagemin.use.push(pngoptim());
        configImages.config.imagemin.use.push(jpegrec());

        for (var image in config.images) {
            streamProcess = gulp.src(config.images[image].src)
                .pipe(plugins.imagemin(configImages.config.imagemin))
                .pipe(gulp.dest(config.images[image].dest));

            if(stream == null) {
                stream = streamProcess;
            }
            else {
                stream = merge(stream, streamProcess);
            }
        }
    }

    return stream;
});

gulp.task('plugins', ['plugins-'+config.env+'-css', 'plugins-'+config.env+'-js', 'plugins-images']);