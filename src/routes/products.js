
const { getProducts } = require('../handler/products');

const products = [{
  path: '/products',
  method: 'GET',
  handler: getProducts,
},
];


module.exports = products;
