const ping = require('./ping');
const products = require('./products');
const updateCart = require('./updateCart');

module.exports = [...ping, ...products, ...updateCart];
