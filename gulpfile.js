var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass   = require('gulp-sass');
var watch  = require('gulp-watch');
var plumber = require('gulp-plumber');
var uglify_options;

if(process.env.NODE_ENV == 'production'){
  uglify_options = {
    mangle: false,
    compress: true
  };
} else {
  uglify_options = {
    mangle: false,
    compress: false,
    output: {
      beautify: true
    }
  };
}

gulp.task('app.js', function() {
  gulp.src(['assets/javascripts/app.js'])
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest('./assets/javascripts/'))
    .pipe(uglify(uglify_options))
    .pipe(gulp.dest('./assets/javascripts/'));
});

gulp.task('sass', function () {
  gulp.src(['assets/scss/**/*.scss'])
    .pipe(sass({includePaths: ['./scss'], errLogToConsole: true}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./assets/stylesheets'));
});

gulp.task('watch-javascript', function (){
  gulp.src('assets/javascripts/app.js')
    .pipe(watch(function(files) {
        return files.pipe(concat("app.min.js"))
      .pipe(gulp.dest('./assets/javascripts/'))
      .pipe(uglify(uglify_options))
      .pipe(gulp.dest('./assets/javascripts/'));
    }));
});

gulp.task('watch-scss', function (){
  gulp.src(['assets/scss/*.scss'])
    .pipe(watch(function(files) {
        return gulp.src('assets/scss/**/*.scss').pipe(sass({includePaths: ['./scss'], errLogToConsole: true}))
          .pipe(rename('style.min.css'))
          .pipe(gulp.dest('./assets/stylesheets'));
    }));
});
gulp.task('default', ['app.js', 'sass', 'watch-scss', 'watch-javascript' ]);