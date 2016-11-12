const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const Promise = require('bluebird')
const rimrafAsync = Promise.promisify(require('rimraf'))
const execAsync = Promise.promisify(require('child_process').exec)
const log = require('gutil-color-log')


const paths = {
  src: path.resolve('src'),
  dist: path.resolve('dist')
}

const allJS = path.join(paths.src, '**')

gulp.task('clean', () => rimrafAsync(paths.dist))

gulp.task('transpile', ['clean'], () => gulp.src(allJS)
  .pipe(babel())
  .pipe(gulp.dest(paths.dist)))

gulp.task('bundle', ['clean'], () => execAsync('webpack')
  .then(res => /ERROR/.test(res) ? log('red', res) : log('green', res)))

gulp.task('build', ['transpile', 'bundle'])

gulp.task('watch', () => gulp.watch(allJS, ['build']))

