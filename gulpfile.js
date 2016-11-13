'use strict';

var port = 8080;
var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var ts = require('gulp-typescript')
var clean = require('gulp-clean')

gulp.task('server', function () {
	connect.server({
		port: port,
	    root: 'dist',
	    livereload: true
	  });
})

gulp.task('clean', function() {
	return gulp.src('dist', {read:false})
		.pipe(clean());
})

gulp.task('build:js', function(){
	gulp.src('src/script/**/*.ts')
		.pipe(ts({
            noImplicitAny: true,
            out: 'main.js'
        }))
        .pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());
})

gulp.task('build:css', function(){
	gulp.src('src/style/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
})

gulp.task('build:html', function(){
	gulp.src('src/view/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
})

gulp.task('build:extra', function(){
	gulp.src('public/**/*.*')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
})

gulp.task('build:vendor', function(){
	gulp.src('bower_components/**/*.*')
		.pipe(gulp.dest('dist/vendor'))
		.pipe(connect.reload());
})

gulp.task('watch', function() {
	gulp.watch('src/script/**/*.ts', ['build:js'])
	gulp.watch('src/style/**/*.scss', ['build:css'])
	gulp.watch('src/view/**/*.html', ['build:html'])
})

gulp.task('default', ['build:css', 'build:js', 'build:html', 'build:extra', 'build:vendor', 'server', 'watch']);