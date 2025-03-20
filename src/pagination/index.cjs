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
  calculateTotalPages,
  calculatePageNumber,
  Pagination,
  Centered,
  Standard
} = require('./index.tsx')

module.exports.calculateTotalPages = calculateTotalPages
module.exports.calculatePageNumber = calculatePageNumber
module.exports.Pagination = Pagination
module.exports.Centered = Centered
module.exports.Standard = Standard
