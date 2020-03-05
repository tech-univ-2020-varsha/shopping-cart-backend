const dbOperations = require('../utils/dbOperations');

const checkoutCart = async (request, h) => {
  try {
    const cartDetails = await dbOperations.getCartData();
    await dbOperations.updateProductTable(cartDetails);
    return h.response('product quantity updated').code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

module.exports = { checkoutCart };
