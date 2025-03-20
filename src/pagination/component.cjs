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
  toInteger,
  calculateTotalPages,
  calculatePageNumber,
  Pagination
} = require('./component.tsx')

module.exports.toInteger = toInteger
module.exports.calculateTotalPages = calculateTotalPages
module.exports.calculatePageNumber = calculatePageNumber
module.exports.Pagination = Pagination
