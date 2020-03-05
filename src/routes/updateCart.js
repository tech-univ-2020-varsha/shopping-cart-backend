const { updateCartDetails } = require('../handler/updateCart');
const { updateCartSchema } = require('../schemas/updateCartSchema');

const updateCart = [{
  path: '/cart',
  method: 'PUT',
  config: {
    validate: {
      payload: updateCartSchema,
    },
    handler: updateCartDetails,
  },
},
];


module.exports = updateCart;
