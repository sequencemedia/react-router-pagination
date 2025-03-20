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
  Standard
} = require('./index.tsx')

module.exports.toInteger = toInteger
module.exports.calculateTotalPages = calculateTotalPages
module.exports.calculatePageNumber = calculatePageNumber
module.exports.Standard = Standard
