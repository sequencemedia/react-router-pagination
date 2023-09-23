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

module.exports = require('./index.mts')
