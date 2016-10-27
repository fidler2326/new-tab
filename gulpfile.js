var gulp = require('gulp');

// --------------------------------------------
// ENVIRONMENT VARS
// --------------------------------------------

// var localHost = 'love2race.dev';
var compiledFolder = 'public_html/assets';
var srcFolder = 'src';
var tmplFolder = 'craft/templates';

// --------------------------------------------
// PLUGINS
// --------------------------------------------

var
	// browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	svgSprite = require('gulp-svg-sprite');

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// --------------------------------------------
// BROWSER SYNC
// --------------------------------------------

// gulp.task('browser-sync', function() {
// 	browserSync({
// 		proxy: localHost,
// 		reloadOnRestart: false, // https://github.com/BrowserSync/browser-sync/issues/386
// 		open: false
// 	});
// });

// gulp.task('bs-reload', function () {
// 	browserSync.reload();
// });

// --------------------------------------------
// STYLES
// --------------------------------------------

gulp.task('styles', function(){
	gulp.src(srcFolder + '/sass/style.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.on('error', function(err) { gutil.log(err.message);gutil.beep(); })
		.pipe(autoprefixer(
			{browsers: ['last 3 versions']}
		))
		.pipe(gulp.dest(compiledFolder+'/css'));
		// .pipe(browserSync.reload({ stream: true }));
});

// --------------------------------------------
// SCRIPTS
// --------------------------------------------

// only lint our stuff
gulp.task('linter', function(){
	gulp.src(srcFolder + '/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// concat and minify everything, but run the linter first
gulp.task('scripts', ['linter'], function(){
	gulp.src([srcFolder + '/scripts/vendor/*.js',srcFolder + '/scripts/*.js'])
		.pipe(uglify())
		.on('error', function(err) { gutil.log(err.message);gutil.beep(); })
		.pipe(concat('js.min.js'))
		.pipe(gulp.dest(compiledFolder+'/scripts'));
		// .pipe(browserSync.reload({ stream: true }));
});

// --------------------------------------------
// SVG SPRITE GENERATOR (also minifies SVG)
// --------------------------------------------

gulp.task('icons', function(){
	return gulp.src(srcFolder + '/svg/*.svg')
		.pipe(svgSprite({
			'mode': {
				'defs': {
					'inline': true,
					'dest': 'svg-sprite',
					'example': {
						'dest': 'preview.html'
					},
					'sprite': 'svg-sprite.html',
				}
			}
		}))
		.pipe(gulp.dest(tmplFolder+'/inc'));
});

// --------------------------------------------
// WATCH
// --------------------------------------------

gulp.task('watch', function(){
	gulp.watch(srcFolder + '/sass/**/*.scss', ['styles']);
	gulp.watch(srcFolder + '/icons/*.svg', ['icons']);
	gulp.watch(tmplFolder + '/**/*', ['bs-reload']);
	gulp.watch(srcFolder + '/scripts/*', ['scripts']);
});

// --------------------------------------------
// DEFAULT TRIGGER (typing 'gulp' at command line triggers these tasks)
// --------------------------------------------

gulp.task('default', ['styles', 'scripts', 'watch']);
