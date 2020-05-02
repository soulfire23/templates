const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

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
