require('@babel/register')({
  ignore: [
    /node_modules/
  ]
})

const gulp = require('gulp')

const {
  default: preCommit
} = require('./build/gulp')

gulp
  .task('pre-commit', preCommit)

gulp
  .task('default', gulp.series('pre-commit'))
