const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
sass.compiler = require('node-sass');

// Imagemin
exports.imagemin = () => (
  gulp.src('src/images/**')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 60, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(gulp.dest('dist/images'))
);

// Sass
gulp.task('sass', () => {
  return gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    //  .pipe(concat('style.css'))
    .pipe(rename('style.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
});

// Babel
gulp.task('babel', (done) => {
  gulp.src('src/js/script.js')
    .pipe(webpack({
      // Any configuration options...
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/js/'));
  done();
});
