const db = require('../../models/index');

const getProductsData = async () => {
  try {
    const result = await db.products.findAll();
    return result;
  } catch (err) {
    throw new Error('Unable to get products');
  }
};

const insertProducts = async (products) => {
  try {
    const result = await db.products.bulkCreate(products);
    return result;
  } catch (err) {
    throw new Error('Unable to add products');
  }
};

module.exports = { getProductsData, insertProducts };
