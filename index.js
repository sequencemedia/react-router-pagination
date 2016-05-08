require('babel-register')({ ignore: /node_modules\/(?!(react-paginator)).*/ });
module.exports = require('./lib');