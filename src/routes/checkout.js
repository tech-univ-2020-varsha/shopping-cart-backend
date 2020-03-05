const { checkoutCart } = require('../handler/checkOut');

const checkout = [{
  path: '/checkout',
  method: 'GET',
  handler: checkoutCart,
},
];


module.exports = checkout;
