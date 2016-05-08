require('babel-register')({ ignore: /node_modules\/(?!(react-pagifier)).*/ });
module.exports = require('./lib');