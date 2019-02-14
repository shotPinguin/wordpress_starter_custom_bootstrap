var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({camelize: true}),
    ftp = require( 'vinyl-ftp' ),
    merge = require('merge-stream'),
    config = require('../gulpconfig').ftp;

gulp.task('ftp', function () {
    var stream = null,
        streamProcess = null;

    var conn = ftp.create( {
        host: config.login.host,
        user: config.login.user,
        password: config.login.password,
        port: config.login.port,
        parallel: 4,
        maxConnections: 5,
        log: plugins.util.log
    });

    config.files.forEach(function(files) {
        streamProcess = gulp.src(files.src, {
            base: '.',
            buffer: false
        })
        .pipe( conn.newerOrDifferentSize( files.dest ) )
        .pipe( conn.dest( files.dest ) );

        if(stream == null) {
            stream = streamProcess;
        }
        else {
            stream = merge(stream, streamProcess);
        }
    });

    return stream;
});