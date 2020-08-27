const {series} 		= require('gulp');
const {src, dest} = require('gulp');

const gulp = require('gulp');
const imagemin = require('gulp-imagemin')
// const minify = require('gulp-minify');
const postcss         	= require('gulp-postcss')
const autoprefixer    	= require('autoprefixer')
const cssnano         	= require('cssnano')
// const sass = require('gulp-sass');
// sass.compiler = require('node-sass');
// const concat = require('gulp-concat');
const inject = require('gulp-inject-string');



// function sassSomething() {
// 	return gulp.src('src/**/*.scss')
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(autoprefixer({
// 			cascade: false
// 		}))
// 		.pipe(gulp.dest('dist'))
// }




// function copyHtml() {
// 	return gulp
// 		.src("src/*.html")
// 		.pipe(gulp.dest('./dist/'));
// }



// function minifyJS() {
// 	return gulp
// 		.src('./dist/js/*.js')
// 		.pipe(minify({
// 			ext:{
// 				src:'.js',
// 				min:'-min.js'
// 			}
// 		}))
// 		.pipe(gulp.dest('./dist/js/'));
// }






// function copyImages() {
// 	return gulp
// 		.src('./src/images/*.*')
// 		.pipe(gulp.dest('./dist/assets/images/'))
// }



function compressImages() {
	return gulp
		.src('./dist/assets/images/*.*')
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 70, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
		]))
		.pipe(gulp.dest('./dist/assets/images/'))
}




function cssAutoprefixer() {
	var plugins = [
		autoprefixer({
			grid: true
		})
	];
	return gulp.src('./dist/assets/css/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./dist/assets/css/'));
}




function cssCompress() {
	var plugins = [
		autoprefixer({
			grid: true
		}),
		cssnano()
	];
	return gulp.src('./dist/assets/css/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./dist/assets/css/'));
}









// Default
exports.default			= series(compressImages);

// Scripts
exports.build			= series(compressImages, cssAutoprefixer, cssCompress);