'use strict'

let gulp  = require('gulp'),
  browserify  = require('browserify'),
  babelify  = require('babelify'),
  source  = require('vinyl-source-stream'),
  watch = require('gulp-watch');

watch(['./frontend/*.js'], () => {
  console.log('Client-side code modified; re-compiling ES2016 -> ES5')
  gulp.start('precompile')
});

gulp.task('precompile', () => {
  return browserify('./frontend/app.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./assets/js/'))
});

gulp.task('default', ['precompile']);
