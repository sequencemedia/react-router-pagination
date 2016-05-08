require('babel-register')({ ignore: /node_modules\/(?!(react-pagination)).*/ });
module.exports = require('./lib');