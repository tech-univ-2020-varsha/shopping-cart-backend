const ping = require('./ping');
const products = require('./products');
const cart = require('./cart');
const checkout = require('./checkout');

module.exports = [...ping, ...products, ...cart, ...checkout];
