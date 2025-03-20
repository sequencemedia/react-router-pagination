require('@babel/register')({
  ignore: [
    /node_modules\/(?!react-router-pagination)/
  ],
  extensions: [
    '.mts',
    '.cts',
    '.tsx'
  ]
})

const {
  default: Pagination
} = require('./index.tsx')

module.exports = Pagination
