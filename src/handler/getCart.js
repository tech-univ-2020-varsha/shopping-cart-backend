const dbOperations = require('../utils/dbOperations');

const getCartDetails = async (request, h) => {
  try {
    const result = await dbOperations.getCartData();
    return h.response(result).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

module.exports = { getCartDetails };
