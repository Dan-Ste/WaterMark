var gulp = require("gulp");
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tap = require('gulp-tap');
var colors = require('colors');
var del = require('del');
var reload = browserSync.reload;
var connectPHP = require('gulp-connect-php');

//-----------Paths------------//
var path = {
    app: {
      jade: './app/jade/index.jade',
      scss: './app/scss/main.scss',
      img: ['./app/img/**/*.+(png|jpg|jpeg|gif|svg)', '!./app/img/sprite/**/*.+(png|jpg|jpeg|gif|svg)'],
      sprite: './app/img/sprite/**/*.png',
      fonts: './app/fonts/**/*.*',
      spriteScss: './app/scss/_other/',
      js: './app/js/main.js'
    },
    dist: {
      html: './dist/',
      css: './dist/css/',
      img: './dist/img/',
      fonts: './dist/fonts/',
      php: './dist/php/',
      js: './dist/js/'
    },
    watch: {
      jade: './app/jade/**/*.jade',
      scss: './app/scss/**/*.scss',
      img: ['./app/img/**/*.+(png|jpg|jpeg|gif|svg)', '!./app/img/sprite/**/*.+(png|jpg|jpeg|gif|svg)'],
      sprite: './app/img/sprite/**/*.png',
      fonts: './app/fonts/**/*.*',
      php: './php/**/*',
      js: './app/js/**/*.js'
    }
  };
//-----------Logger------------//
function log(error) {
  console.log([
      '',
      "----------ERROR MESSAGE START----------".bold.red.underline,
      ("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
      error.message,
      "----------ERROR MESSAGE END----------".bold.red.underline,
      ''
  ].join('\n'));
  this.end();
}

//-----------Sprites------------//
gulp.task('sprite', function () {
  var spriteData = gulp.src(path.app.sprite).pipe(spritesmith({
    imgName: 'spritesheet.png',
    cssName: '_sprite.scss',
    padding: 10
  }));
  spriteData.img.pipe(gulp.dest(path.dist.img))
                .pipe(reload({stream: true}));
  spriteData.css.pipe(gulp.dest(path.app.spriteScss))
                .pipe(reload({stream: true}));
});

//-----------Img------------//
gulp.task('img', function () {
  gulp.src(path.app.img)
      .pipe(gulp.dest(path.dist.img))
      .pipe(reload({stream: true}));
});

//-----------Fonts------------//
gulp.task('fonts', function () {
  gulp.src(path.app.fonts)
      .pipe(gulp.dest(path.dist.fonts))
      .pipe(reload({stream: true}));
});

//-----------Jade------------//
gulp.task('jade', function () {
  var YOUR_LOCALS = {};

  gulp.src(path.app.jade)
    .pipe(plumber())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: '\t'
    })).on('error', log)
    .pipe(gulp.dest(path.dist.html))
    .pipe(reload({stream: true}));
});

//-----------Scss------------//
gulp.task('scss', function () {
  return gulp.src(path.app.scss)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      style: 'expanded',
      includePaths: [
        './dist/bower/normalize-scss/sass/',
        './dist/bower/support-for/sass/'],
      errLogToConsole: true
    })).on('error', log)
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({stream: true}));

});

function bundler(file) {
  var b = browserify(file.path);
  var stream = b.bundle();
  file.contents = stream;
}

//-----------Js------------//
gulp.task('js', function () {
  gulp.src(path.app.js)
        .pipe(plumber())
        .pipe(tap(bundler))
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true}));
});

//-----------Copy-PHP------------//
gulp.task('copy', function () {

    return gulp.src(path.watch.php)
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.php));
});
//-----------Load PHP------------//
gulp.task('php', function(){
    connectPHP.server({ base: './dist', keepalive:true, hostname: 'localhost', port:8080});
});

//-----------Load Server------------//
gulp.task('server',['php'] , function () {
  browserSync({
    port:8080,
    server: {
      baseDir: "dist"
    }
  });
});
//-----------watch files------------//
gulp.task('watch', function () {
  gulp.watch(path.watch.jade, ['jade']);
  gulp.watch(path.watch.scss, ['scss']);
  gulp.watch(path.watch.fonts, ['fonts']);
  gulp.watch(path.watch.img, ['img']);
  gulp.watch(path.watch.sprite, ['sprite']);
  gulp.watch(path.watch.js, ['js']);
  gulp.watch(path.watch.php, ['copy']);
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('build', [
  'jade',
  'scss',
  'fonts',
  'img',
  'sprite',
  'js'
]);


gulp.task('default', ['build', 'server', 'watch', 'php']);