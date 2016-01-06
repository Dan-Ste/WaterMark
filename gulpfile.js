var gulp = require("gulp"),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps');

//-----------VarsPath------------//
var jadePath = './app/_jade/index.jade',
  scssPath = './app/_scss/main.scss',
  jadePathAll = './app/_jade/**/*.jade',
  scssPathAll = './app/_scss/**/*.scss';

//-----------On Jade------------//
gulp.task('jade', function () {
  var YOUR_LOCALS = {};

  gulp.src(jadePath)
    .pipe(plumber())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: '\t'
    }))
    .pipe(gulp.dest('./app/'))
});
//-----------On Scss------------//
gulp.task('sass', function () {
  return gulp.src(scssPath)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      style: 'expanded',
      includePaths: [
        './app/bower/normalize-scss/sass/',
        './app/bower/support-for/sass/'],
      errLogToConsole: true
    }))

    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css/'));

});

//-----------Load Server------------//
gulp.task('server', function () {
  browserSync({
    port: 8000,
    server: {
      baseDir: "app"
    }
  });
});
//-----------watch files------------//
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('sass:watch', function () {
  gulp.watch(scssPathAll, ['sass']);
});

gulp.task('jade:watch', function () {
  gulp.watch(jadePathAll, ['jade']);
});

gulp.task('default', ['server', 'watch', 'sass:watch', 'jade:watch']);
