const dbOperations = require('../utils/dbOperations');

const updateCartDetails = async (request, h) => {
  try {
    let cartDetails = request.payload.products;
    cartDetails = cartDetails.filter((product) => product.quantity !== 0);
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
