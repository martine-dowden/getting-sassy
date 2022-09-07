const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

const date = Date.now();

function handlePages() {
  return src('./index.html')
    .pipe(replace(/(href="(?!http).*?)\.css"/g, '$1-' + date + '.min.css"'))
    .pipe(htmlmin({
      minifyCSS: true,
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(dest('./public/'));
}

function handleCss() {
  return src('./styles.css')
    .pipe(cleanCSS())
    .pipe(rename({ extname: '-' + date +'.min.css' }))
    .pipe(dest('./public'));
}

exports.default = series(handleCss, handlePages);
