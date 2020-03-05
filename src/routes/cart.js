const { updateCartDetails } = require('../handler/updateCart');
const { updateCartSchema } = require('../schemas/updateCartSchema');
const { getCartDetails } = require('../handler/getCart');

const cart = [
  {
    path: '/cart',
    method: 'PUT',
    config: {
      validate: {
        payload: updateCartSchema,
      },
      handler: updateCartDetails,
    },
  },
  {
    path: '/cart',
    method: 'GET',
    config: {
      handler: getCartDetails,
    },
  },
];


module.exports = cart;
