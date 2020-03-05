const dbOperations = require('../utils/dbOperations');

const externalApiFetch = require('../utils/getProductsFromExternalApi');

const getProducts = async (request, h) => {
  try {
    let products = await dbOperations.getProductsData();
    if (products.length === 0) {
      products = await externalApiFetch.getProductsFromExternalApi();
      products = await dbOperations.insertProducts(products);
    }
    return h.response(products).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

module.exports = { getProducts };
