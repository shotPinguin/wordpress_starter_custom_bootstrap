// ==== IMAGES ==== //

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({camelize: true}),
    del = require('del'),
    pngoptim  	= require('imagemin-optipng'),
    jpegrec   	= require('imagemin-jpeg-recompress'),
    sprites		= require('gulp.spritesmith'),
    merge 		= require('merge-stream'),
    config = require('../gulpconfig').images;

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with libsass
gulp.task('images-sprites', function () {
    var spriteData = gulp.src(config.build.srcSprites).pipe(sprites(config.config.sprites));

    var imgStream = spriteData.pipe(gulp.dest(config.build.destSprites));
    var cssStream = spriteData.css.pipe(gulp.dest(config.build.destScss));

    return merge(imgStream, cssStream);
});

gulp.task('images-clean', ['images-sprites'], function () {
    return del(config.clean, {
        force: true
    });
});

// Copy changed images from the source folder to `build` (fast)
gulp.task('images', ['images-clean'], function () {
    config.config.imagemin.use.push(pngoptim());
    config.config.imagemin.use.push(jpegrec());

    return gulp.src(config.build.src)
        .pipe(plugins.imagemin(config.config.imagemin))
        .pipe(gulp.dest(config.build.dest));
});
