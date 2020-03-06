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

const getCartData = async () => {
  try {
    const result = await db.cart.findAll({ raw: true });
    return result;
  } catch (err) {
    throw new Error('Unable to get cart details');
  }
};

const deleteProductFromCart = async (id) => {
  try {
    const result = await db.cart.destroy(
      {
        where: {
          id,
        },
      },
    );
    return result;
  } catch (err) {
    throw new Error('Unable to delete the cart item');
  }
};

const updateProductTable = async (cartDetails) => {
  try {
    await db.cart.destroy({ truncate: true });
    await Promise.all(cartDetails.map(async (prod) => {
      const cartProductQuantity = prod.quantity;
      await db.products.decrement(
        'quantity', {
          by: cartProductQuantity,
          where: {
            id: prod.id,
          },
          returning: true, // to get updated data back
        },
      );
    }));
  } catch (err) {
    throw new Error('Unable to update product details');
  }
};

module.exports = {
  getProductsData, insertProducts, updateCart, getCartData, updateProductTable, deleteProductFromCart,
};
