var gulp = require('gulp');


// Enviroment vars
// ---------------
var compiledFolder = 'src';
var srcFolder = 'src';


// Plugins
// -------
var
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer');


// Styles
// ------
gulp.task('styles', function(){
	gulp.src(srcFolder + '/sass/app.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.on('error', function(err) { gutil.log(err.message);gutil.beep(); })
		.pipe(autoprefixer(
			{browsers: ['last 3 versions']}
		))
		.pipe(gulp.dest(compiledFolder+'/css'));
});


// Watch
// -----
gulp.task('watch', function(){
	gulp.watch(srcFolder + '/sass/**/*.scss', ['styles']);
	gulp.watch(srcFolder + '/icons/*.svg', ['icons']);
	gulp.watch(srcFolder + '/scripts/*', ['scripts']);
});


// Default trigger (typing 'gulp' at command line triggers these tasks)
// --------------------------------------------------------------------
gulp.task('default', ['styles', 'watch']);
