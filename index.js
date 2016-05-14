require('babel-register')({ ignore: /node_modules\/(?!(react-router-pagination)).*/ })
module.exports = require('./lib')
