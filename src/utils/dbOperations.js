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


const updateCart = async (cartDetails) => {
  try {
    const result = await db.cart.bulkCreate(cartDetails, {
      fields: ['id', 'name', 'price', 'quantity', 'imageLink', 'category', 'total'],
      updateOnDuplicate: ['id', 'quantity', 'total'],
    });
    return result;
  } catch (err) {
    throw new Error('Unable to update cart');
  }
};

module.exports = { getProductsData, insertProducts, updateCart };
