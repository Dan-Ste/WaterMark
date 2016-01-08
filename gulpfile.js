var gulp = require("gulp"),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  spritesmith = require('gulp.spritesmith');

//-----------VarsPath------------//
var jadePath = './app/_jade/index.jade',
  scssPath = './app/_scss/main.scss',
  jadePathAll = './app/_jade/**/*.jade',
  scssPathAll = './app/_scss/**/*.scss',
  imgPathAll = './app/_img_dev/**/*.png',
  spritePathScss = './app/_scss/_layout/';

//-----------On Sprites------------//
gulp.task('sprite', function () {
  var spriteData = gulp.src(imgPathAll).pipe(spritesmith({
    imgName: 'spritesheet.png',
    cssName: '_sprite.scss',
    padding: 10,
    cssTemplate: './app/_img_dev/handlebarsInheritance.scss.handlebars'
  }));
  spriteData.img.pipe(gulp.dest('./app/img'));
  spriteData.css.pipe(gulp.dest(spritePathScss));
});

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
  gulp.watch(jadePathAll, ['jade']);
  gulp.watch(scssPathAll, ['sass']);
  gulp.watch(imgPathAll, ['sprite']);
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']);
