// ==== ICONFONT ==== //

/*var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({camelize: true}),
    async = require('async'),
    config = require('../gulpconfig').iconfont;

gulp.task('iconfont', function(done){
    var iconStream = gulp.src(config.build.src)
        .pipe(plugins.iconfont({
            fontName: config.name
        }));

    async.parallel([
        function handleGlyphs (cb) {
            iconStream.on('glyphs', function(glyphs, options) {
                gulp.src(config.template)
                    .pipe(plugins.consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: config.name,
                        className: config.name,
                        fontPath: '../fonts/'
                    }))
                    .pipe(plugins.rename("_iconfont.scss"))
                    .pipe(gulp.dest(config.build.dest))
                    .on('finish', cb);
            });
        },
        function handleFonts (cb) {
            iconStream.pipe(gulp.dest(config.build.font))
                       .on('finish', cb);
        }
    ], done);
});*/