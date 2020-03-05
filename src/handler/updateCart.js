const dbOperations = require('../utils/dbOperations');

const updateCartDetails = async (request, h) => {
  try {
    const cartDetails = request.payload.products;
    const newCartDetails = cartDetails.map((product) => {
      const newProduct = product;
      newProduct.total = product.quantity * product.price;
      return product;
    });
    const result = await dbOperations.updateCart(newCartDetails);

    return h.response(result).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

module.exports = { updateCartDetails };
