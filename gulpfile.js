const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const Promise = require('bluebird')
const rimrafAsync = Promise.promisify(require('rimraf'))


const paths = {
  src: path.resolve('src'),
  dist: path.resolve('dist')
}

const allJS = path.join(paths.src, '**')

gulp.task('clean', () => rimrafAsync(paths.dist))

gulp.task('build', ['clean'], () => gulp.src(allJS)
  .pipe(babel())
  .pipe(gulp.dest(paths.dist)))

gulp.task('watch', ['build'], () => gulp.watch(allJS, ['build']))
