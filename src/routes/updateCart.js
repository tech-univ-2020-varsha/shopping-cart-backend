const { updateCartDetails } = require('../handler/updateCart');

const updateCart = [{
  path: '/cart',
  method: 'PUT',
  handler: updateCartDetails,
},
];


module.exports = updateCart;
