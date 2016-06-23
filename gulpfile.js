"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var gls = require('gulp-live-server');

var config = {
	port: 3013,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/client/*.html',
		js: './src/client/**/*.js',
		clientMainJS: './src/client/main.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./src/client/css/app.css'
		],
		dist: './dist/static',
		fonts: 'node_modules/bootstrap/dist/fonts/*',
		serverJS: './dist/server/main.js'
	}
}

gulp.task('open', ['serve'], function () {
	gulp.src('dist/static/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});


gulp.task('html', function () {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function () {
	browserify(config.paths.clientMainJS)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function () {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('fonts', function () {
	gulp.src(config.paths.fonts)
		.pipe(gulp.dest(config.paths.dist + '/fonts'));
});

gulp.task('lint', function () {
	return gulp.src(config.paths.js)
		.pipe(lint({ config: 'eslint.config.json' }))
		.pipe(lint.format());
});

gulp.task('watch', function () {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
	gulp.watch(config.paths.css, ['css']);
	gulp.watch('./src/server/**/*.js', ['copyserver']);
});


gulp.task('copyserver', function () {
	gulp.src('./src/server/**/*.js')
		.pipe(gulp.dest('./dist/server/'));
});



gulp.task('serve', ['copyserver'], function () {
    //1. run your script as a server 
    var server = gls.new(config.paths.serverJS);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop) 
	console.log("is at - " + __dirname);
    gulp.watch(['./dist/**/*.css', './dist/**/*.js', './dist/**/*.html'], function (file) {
		server.notify.apply(server, [file]);
    });
    // gulp.watch(config.paths.serverJS, server.start.bind(server)); //restart my server 

    // Note: try wrapping in a function if getting an error like `TypeError: Bad argument at TypeError (native) at ChildProcess.spawn` 
    gulp.watch(config.paths.serverJS, function () {
		server.start.bind(server)()
    });
});

// gulp.task('default', ['html', 'js', 'css', 'fonts', 'lint', 'open', 'watch']);
gulp.task('default', ['html', 'js', 'css', 'fonts', 'lint', 'watch', 'serve', 'open']);
